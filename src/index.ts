import { Hono } from 'hono';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { dicts, isLang, DEFAULT_LANG, type Lang } from './i18n';
import { layout, homePage, blogIndexPage, blogPostPage } from './views';

type Bindings = {
  DB: D1Database;
  ASSETS: Fetcher;
  DEFAULT_LANG?: string;
  ADMIN_TOKEN?: string;
  GEMINI_API_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const VALID_SERVICES = new Set([
  'agentic_solutions',
  'n8n_automation',
  'private_ai_server',
  'consulting_governance',
  'other',
]);

const N8N_WEBHOOK_URL = 'https://gideon-ironless-overderisively.ngrok-free.dev/webhook/c94df705-a521-44a9-b215-c4215e6d155e';

function langOrDefault(param: string | undefined, envLang?: string): Lang {
  if (param && isLang(param)) return param;
  if (envLang && isLang(envLang)) return envLang;
  return DEFAULT_LANG;
}

// Health
app.get('/api/health', (c) => c.json({ ok: true, service: 'watcher-ia', ts: new Date().toISOString() }));

// AI Sales Agent Chatbot SSE Endpoint (Powered by Gemini AI / Watcher Claw)
app.get('/api/chat/:lang', async (c) => {
  const raw = c.req.param('lang');
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
  const prompt = c.req.query('q') || '';
  const apiKey = c.env.GEMINI_API_KEY;

  return new Response(
    new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send = (data: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        send({ status: 'reasoning', message: lang === 'fr' ? 'Analyse de la requête par Watcher Claw (Gemini Pro)...' : lang === 'ar' ? 'جاري تحليل الاستعلام بواسطة Watcher Claw (Gemini)...' : 'Analyzing query through Watcher Claw kernel (Gemini AI)...' });

        let reply = '';
        if (apiKey) {
          try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const systemInstruction = `You are the professional Sales Agent for Watcher IA ("Watcher Claw"). 
Location headquarters: 01 Rue 13 Aout, Montfleury, Tunisia.
Core focus: Bespoke Agentic Solutions (Autonomous workforces for admin, accounting, dev), n8n Workflow Automation & Training, Secure Private AI Server Deployment (ODS/Osmantic stack, on-premise/sovereign), and Consulting & Digital Governance.
Tone: Precise, authoritative, helpful, and tech-forward. Respond in the user's language (${lang}).`;

            const model = genAI.getGenerativeModel({
              model: 'gemini-1.5-flash',
              systemInstruction,
            });

            const result = await model.generateContentStream(prompt);
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                reply += text;
              }
            }
          } catch (err) {
            console.error('Gemini API error:', err);
            reply = lang === 'fr'
              ? 'Erreur lors de la communication avec le noyau Gemini. Nos solutions agentiques restent pleinement opérationnelles.'
              : lang === 'ar'
                ? 'حدث خطأ في الاتصال بنواة Gemini. حلولنا الوكيلية لا تزال تعمل بكفاءة كاملة.'
                : 'Error communicating with Gemini kernel. Our autonomous workforces remain fully operational.';
          }
        } else {
          // Fallback simulation if GEMINI_API_KEY is not configured yet
          await new Promise((r) => setTimeout(r, 500));
          const q = prompt.toLowerCase();
          if (q.includes('price') || q.includes('cost') || q.includes('tarif') || q.includes('prix') || q.includes('سعر')) {
            reply = lang === 'fr'
              ? 'Nos solutions agentiques sont basées sur le ROI opérationnel. Chaque workforce (admin, compta, dev) est calibrée selon vos volumes.'
              : lang === 'ar'
                ? 'تعتمد حلولنا الوكيلية على العائد التشغيلي. يتم معايرة كل قوة عاملة بناءً على حجم عملياتك.'
                : 'Our agentic solutions are outcome-based, measured by operational ROI. Each autonomous workforce is customized to your volume.';
          } else {
            reply = lang === 'fr'
              ? `Watcher IA déploie des workforces autonomes (admin, compta, dev) orchestrées via n8n depuis notre siège au 01 Rue 13 Aout, Montfleury, Tunisie.`
              : lang === 'ar'
                ? `تقوم Watcher IA بنشر قوى عاملة ذاتية (إدارة، محاسبة، تطور) منسقة عبر n8n من مقرنا في 01 Rue 13 Aout, Montfleury, Tunisia.`
                : `Watcher IA deploys autonomous workforces (admin, accounting, dev) orchestrated via n8n from 01 Rue 13 Aout, Montfleury, Tunisia.`;
          }
        }

        send({ status: 'complete', reply });
        controller.close();
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    }
  );
});

// Root -> default lang
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
      'SELECT slug, title, excerpt, cover, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 6'
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
    'SELECT slug, title, excerpt, cover, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 30'
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
  const row = await c.env.DB.prepare('SELECT slug, title, excerpt, body, cover, published_at FROM posts WHERE lang = ? AND slug = ?')
    .bind(raw, slug)
    .first<any>();
  if (!row) return c.notFound();
  const dict = dicts[raw];
  return c.html(layout({ lang: raw, dict, title: row.title, description: row.excerpt, content: blogPostPage(raw, dict, row) }));
});

// Registration: POST /:lang/register (D1 + N8N Webhook)
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

  // 1. Insert into D1 database
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

  // 2. Synchronous POST to N8N webhook
  try {
    const n8nPayload = {
      event: 'client_registration',
      timestamp: new Date().toISOString(),
      lang,
      client: { name, company, email, service_request, message },
      headquarters: '01 Rue 13 Aout, Montfleury, Tunisia',
    };
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    });
  } catch (err) {
    console.error('N8N webhook sync failed (non-blocking for user)', err);
  }

  return c.json({ ok: true, message: dicts[lang].register.success }, 201);
});

// Admin JSON
app.get('/:lang/admin/registrations', async (c) => {
  const token = c.req.query('token') || c.req.header('x-admin-token');
  if (!token || token !== (c.env as any).ADMIN_TOKEN) return c.json({ ok: false }, 401);
  const { results } = await c.env.DB.prepare('SELECT id, name, company, email, service_request, lang, status, created_at FROM clients ORDER BY id DESC LIMIT 100').all();
  return c.json({ ok: true, results });
});

export default app;
