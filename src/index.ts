import { Hono } from 'hono';
import { dicts, isLang, DEFAULT_LANG, type Lang } from './i18n';
import { layout, homePage, blogIndexPage, blogPostPage } from './views';

type Bindings = {
  DB: D1Database;
  ASSETS: Fetcher;
  DEFAULT_LANG?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const VALID_SERVICES = new Set([
  'agentic_solutions',
  'n8n_automation',
  'private_ai_server',
  'consulting_governance',
  'other',
]);

function langOrDefault(param: string | undefined, envLang?: string): Lang {
  if (param && isLang(param)) return param;
  if (envLang && isLang(envLang)) return envLang;
  return DEFAULT_LANG;
}

// Health
app.get('/api/health', (c) => c.json({ ok: true, service: 'watcher-ia', ts: new Date().toISOString() }));

// Root -> default lang (respect env)
app.get('/', (c) => {
  const lang = langOrDefault(undefined, c.env.DEFAULT_LANG);
  return c.redirect(`/${lang}`, 302);
});

// Home: /:lang
app.get('/:lang', async (c) => {
  const raw = c.req.param('lang');
  if (!isLang(raw)) return c.redirect(`/${langOrDefault(undefined, c.env.DEFAULT_LANG)}`, 302);
  const lang = raw;
  const dict = dicts[lang];
  let posts: any[] = [];
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT slug, title, excerpt, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 6'
    )
      .bind(lang)
      .all();
    posts = results ?? [];
  } catch {
    posts = [];
  }
  const html = layout({
    lang,
    dict,
    title: lang === 'ar' ? 'واتشر IA — وكلاء ذكاء يعملون' : lang === 'fr' ? 'Watcher IA — des agents IA qui travaillent' : 'Watcher IA — AI agents that work',
    description: dict.hero.subtitle,
    content: homePage(lang, dict, posts),
  });
  return c.html(html);
});

// Blog index
app.get('/:lang/blog', async (c) => {
  const raw = c.req.param('lang');
  if (!isLang(raw)) return c.redirect('/en/blog', 302);
  const dict = dicts[raw];
  const { results } = await c.env.DB.prepare(
    'SELECT slug, title, excerpt, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 30'
  )
    .bind(raw)
    .all();
  return c.html(
    layout({ lang: raw, dict, title: 'Research', description: dict.research.subtitle, content: blogIndexPage(raw, dict, (results as any[]) ?? []) })
  );
});

// Blog post
app.get('/:lang/blog/:slug', async (c) => {
  const raw = c.req.param('lang');
  if (!isLang(raw)) return c.redirect('/en/blog', 302);
  const slug = c.req.param('slug');
  const row = await c.env.DB.prepare('SELECT slug, title, excerpt, body, published_at FROM posts WHERE lang = ? AND slug = ?')
    .bind(raw, slug)
    .first<any>();
  if (!row) return c.notFound();
  const dict = dicts[raw];
  return c.html(layout({ lang: raw, dict, title: row.title, description: row.excerpt, content: blogPostPage(raw, dict, row) }));
});

// Registration: POST /:lang/register (form + JSON)
app.post('/:lang/register', async (c) => {
  const raw = c.req.param('lang');
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
  let data: Record<string, string> = {};
  try {
    const ct = c.req.header('content-type') ?? '';
    if (ct.includes('application/json')) data = await c.req.json();
    else {
      const form = await c.req.parseBody();
      for (const [k, v] of Object.entries(form)) data[k] = String(v ?? '');
    }
  } catch {
    return c.json({ ok: false, error: 'bad_request' }, 400);
  }

  const name = (data.name || '').trim();
  const company = (data.company || '').trim();
  const email = (data.email || '').trim().toLowerCase();
  const service_request = (data.service_request || '').trim();
  const message = (data.message || '').trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (name.length < 2 || !emailOk || !VALID_SERVICES.has(service_request)) {
    return c.json({ ok: false, error: 'validation', fields: { name: name.length >= 2, email: emailOk, service: VALID_SERVICES.has(service_request) } }, 422);
  }

  try {
    await c.env.DB.prepare(
      'INSERT INTO clients (name, company, email, service_request, message, lang) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind(name, company || null, email, service_request, message || null, lang)
      .run();
  } catch (e) {
    console.error('D1 insert failed', e);
    return c.json({ ok: false, error: 'db_error' }, 500);
  }
  return c.json({ ok: true, message: dicts[lang].register.success }, 201);
});

// Admin JSON (protect in production with Access / token — simple guard here)
app.get('/:lang/admin/registrations', async (c) => {
  const token = c.req.query('token') || c.req.header('x-admin-token');
  if (!token || token !== (c.env as any).ADMIN_TOKEN) return c.json({ ok: false }, 401);
  const { results } = await c.env.DB.prepare('SELECT id, name, company, email, service_request, lang, status, created_at FROM clients ORDER BY id DESC LIMIT 100').all();
  return c.json({ ok: true, results });
});

export default app;
