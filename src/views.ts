import type { Dict, Lang } from './i18n';
import { LANG_META } from './i18n';

export const CONTACT = {
  email: 'CEO@WATCHERIA.CLOUD',
  phone: '+21621304255',
  address: '01 Rue 13 Aout, Montfleury, Tunisia',
  domain: 'watcheria.ai',
};

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function logoSVG(size = 40): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="30" ry="19" stroke="#1DA9E4" stroke-width="2.5" fill="#0A0A40"/>
    <ellipse cx="32" cy="32" rx="30" ry="19" stroke="#0A0A40" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
    <circle cx="32" cy="32" r="13" fill="#1DA9E4"/>
    <circle cx="32" cy="32" r="8" fill="#0A0A40"/>
    <text x="32" y="37.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="13" fill="#fff">W</text>
    <g fill="none" stroke="#38E1FF" stroke-width="1.4">
      <circle cx="8" cy="14" r="1.6"/><circle cx="56" cy="14" r="1.6"/>
      <circle cx="5" cy="32" r="1.6"/><circle cx="59" cy="32" r="1.6"/>
      <circle cx="8" cy="50" r="1.6"/><circle cx="56" cy="50" r="1.6"/>
    </g></svg>`;
}

function langSwitcher(current: Lang): string {
  const langs: Lang[] = ['en', 'fr', 'ar'];
  return `<nav aria-label="Language" class="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 text-xs font-bold dark:border-white/15 dark:bg-white/5">
    ${langs
      .map(
        (l) =>
          `<a href="/${l}" hreflang="${l}" aria-current="${l === current ? 'true' : 'false'}"
            class="rounded-full px-3 py-1.5 transition ${l === current ? 'bg-watcher-navy text-white dark:bg-watcher-cyan dark:text-watcher-deep' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'}">${LANG_META[l].label}</a>`
      )
      .join('')}
  </nav>`;
}

export interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
}

export function layout(opts: {
  lang: Lang;
  dict: Dict;
  title: string;
  description: string;
  content: string;
}): string {
  const { lang, dict, title, description, content } = opts;
  const dir = LANG_META[lang].dir;
  const otherLangs: Lang[] = (['en', 'fr', 'ar'] as Lang[]).filter((l) => l !== lang);

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" class="scroll-smooth">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${esc(title)} — Watcher IA</title>
<meta name="description" content="${esc(description)}"/>
${otherLangs.map((l) => `<link rel="alternate" hreflang="${l}" href="/${l}"/>`).join('\n')}
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = { darkMode: 'class', theme: { extend: {
  colors: { watcher: { navy:'#0A0A40', deep:'#060624', blue:'#1DA9E4', cyan:'#38E1FF', red:'#FF1E2D' } },
  fontFamily: { sans: ['Inter','Noto Kufi Arabic','system-ui','sans-serif'] }
}}};
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/static/styles.css"/>
<script>try{const t=localStorage.getItem('watcher-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}</script>
</head>
<body class="bg-white font-sans text-slate-900 antialiased dark:bg-watcher-deep dark:text-slate-100">
<a href="#main" class="sr-only">Skip</a>

<header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-watcher-deep/80">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
    <a href="/${lang}" class="flex items-center gap-3">
      ${logoSVG(40)}
      <span class="leading-tight"><span class="block text-lg font-extrabold tracking-tight">Watcher <span class="text-watcher-blue">IA</span></span>
      <span class="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">AI agents that work</span></span>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-semibold lg:flex">
      <a class="hover:text-watcher-blue" href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#chat">${esc(dict.nav.chat)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#contact">${esc(dict.nav.contact)}</a>
    </nav>
    <div class="flex items-center gap-2">
      ${langSwitcher(lang)}
      <button id="themeToggle" aria-label="Toggle theme" class="rounded-full border border-slate-200 p-2 text-sm dark:border-white/15">🌙</button>
      <a href="/${lang}#register" class="hidden rounded-full bg-watcher-red px-4 py-2 text-sm font-bold text-white hover:opacity-90 sm:inline-block">${esc(dict.nav.register)}</a>
      <button id="menuBtn" class="rounded-lg border border-slate-200 p-2 lg:hidden dark:border-white/15">☰</button>
    </div>
  </div>
  <div id="mobileMenu" class="hidden border-t border-slate-200 px-4 py-3 dark:border-white/10 lg:hidden">
    <div class="flex flex-col gap-3 text-sm font-semibold">
      <a href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a href="/${lang}#chat">${esc(dict.nav.chat)}</a>
      <a href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a href="/${lang}#contact">${esc(dict.nav.contact)}</a>
      <a href="/${lang}#register" class="rounded-full bg-watcher-red px-4 py-2 text-center font-bold text-white">${esc(dict.nav.register)}</a>
    </div>
  </div>
</header>

<main id="main">${content}</main>

<footer id="contact" class="bg-watcher-navy text-slate-200 dark:bg-black">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
    <div class="md:col-span-2">
      <div class="flex items-center gap-3">${logoSVG(44)}
        <div><p class="text-xl font-extrabold text-white">Watcher <span class="text-watcher-cyan">IA</span></p>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">${esc(CONTACT.domain)}</p></div>
      </div>
      <p class="mt-4 max-w-md text-sm text-slate-300">${esc(dict.footer.tagline)}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span class="rounded-full bg-white/10 px-3 py-1">AUTOMATE EVERYTHING</span>
        <span class="rounded-full bg-white/10 px-3 py-1">SCALE WITHOUT LIMITS</span>
        <span class="rounded-full bg-watcher-red px-3 py-1 text-white">DEPLOY AI AGENTS</span>
      </div>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">${esc(dict.footer.contact)}</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.emailLabel)}</span><a class="hover:text-watcher-cyan" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.phoneLabel)}</span><a class="hover:text-watcher-cyan" href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.addressLabel)}</span><span class="text-slate-300">${esc(CONTACT.address)}</span></li>
      </ul>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">Langues / Languages</p>
      <div class="mt-3 flex gap-2">
        <a href="/en" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">EN</a>
        <a href="/fr" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">FR</a>
        <a href="/ar" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">عربي</a>
      </div>
      <p class="mt-4 text-xs text-slate-500">© ${new Date().getFullYear()} Watcher IA. ${esc(dict.footer.rights)}</p>
    </div>
  </div>
</footer>
<script src="/static/app.js" defer></script>
</body></html>`;
}

export function homePage(lang: Lang, dict: Dict, posts: PostRow[]): string {
  const heroBadges = dict.hero.badges
    .map(
      (b) => `<span class="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-200">
        <span class="mr-2 inline-block h-2 w-2 rounded-full bg-watcher-red"></span>${esc(b)}</span>`
    )
    .join('');

  const serviceCards = dict.services.items
    .map(
      (s, i) => `<article class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
      <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-watcher-blue">${esc(s.tag)}</p>
      <h3 class="mt-2 text-xl font-extrabold">${esc(s.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(s.desc)}</p>
      <a href="/${lang}#register" data-service="${s.key}" class="svc-cta mt-4 inline-flex items-center gap-2 text-sm font-bold text-watcher-red">${esc(dict.nav.register)} <span class="font-mono text-xs opacity-60">0${i + 1}</span></a>
    </article>`
    )
    .join('');

  const clawStats = dict.claw.stats
    .map(
      (st) => `<div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
      <p class="text-3xl font-black text-watcher-cyan">${esc(st.value)}</p>
      <p class="mt-1 text-xs font-bold uppercase tracking-widest text-slate-300">${esc(st.label)}</p>
    </div>`
    )
    .join('');

  const governanceItems = dict.governance.items
    .map(
      (g) => `<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 class="text-lg font-extrabold text-watcher-cyan">${esc(g.title)}</h3>
      <p class="mt-2 text-sm text-slate-300">${esc(g.desc)}</p>
    </div>`
    )
    .join('');

  const postCards =
    posts.length === 0
      ? `<p class="text-sm opacity-70">—</p>`
      : posts
          .map(
            (p) => `<article class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <p class="text-xs font-semibold text-slate-500">${esc((p.published_at || '').slice(0, 10))} · ${esc(p.slug)}</p>
        <h3 class="mt-2 text-lg font-extrabold leading-snug">${esc(p.title)}</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
        <a href="/${lang}/blog/${esc(p.slug)}" class="mt-3 inline-block text-sm font-bold text-watcher-blue">${esc(dict.research.readMore)}</a>
      </article>`
          )
          .join('');

  const serviceOptions = dict.register.services
    .map((o) => `<option value="${o.value}">${esc(o.label)}</option>`)
    .join('');

  return `
<!-- HERO (dark with executive visual aesthetic) -->
<section class="relative overflow-hidden bg-watcher-deep text-white">
  <div class="hero-grid absolute inset-0"></div>
  <div class="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24 items-center">
    <div>
      <p class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-watcher-cyan">${esc(dict.hero.eyebrow)}</p>
      <h1 class="mt-5 text-5xl font-black leading-[0.95] sm:text-6xl">${esc(dict.hero.titleA)}<br/><span class="text-watcher-red">${esc(dict.hero.titleB)}</span></h1>
      <p class="mt-5 max-w-xl text-slate-300">${esc(dict.hero.subtitle)}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/${lang}#register" class="rounded-full bg-watcher-red px-7 py-3.5 font-bold text-white shadow-lg shadow-red-900/40 hover:opacity-90">${esc(dict.hero.ctaPrimary)}</a>
        <a href="/${lang}#services" class="rounded-full border border-white/20 px-7 py-3.5 font-bold hover:bg-white/10">${esc(dict.hero.ctaSecondary)}</a>
      </div>
      <div class="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold">
        ${dict.strip.map((s) => `<span><span class="text-watcher-red">●</span> ${esc(s)}</span>`).join('')}
      </div>
    </div>
    <div class="relative">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-2">${heroBadges}</div>
    </div>
  </div>
</section>

<!-- WATCHER CLAW PLATFORM SHOWCASE -->
<section id="claw" class="relative overflow-hidden bg-watcher-navy py-20 text-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.claw.eyebrow)}</p>
        <h2 class="mt-2 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.claw.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.claw.subtitle)}</p>
        <div class="mt-8 grid grid-cols-3 gap-4">${clawStats}</div>
        <div class="mt-8">
          <a href="/${lang}#register" class="rounded-full bg-watcher-cyan px-7 py-3.5 font-bold text-watcher-deep hover:bg-white">${esc(dict.claw.cta)}</a>
        </div>
      </div>
      <div class="relative rounded-3xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur">
        <div class="absolute inset-0 bg-gradient-to-tr from-watcher-blue/20 to-transparent rounded-3xl pointer-events-none"></div>
        <div class="rounded-2xl bg-watcher-deep/90 p-6 font-mono text-xs text-watcher-cyan border border-white/10">
          <p class="text-slate-400">// WATCHER CLAW KERNEL V4.2</p>
          <p class="mt-2 text-white font-bold">&gt; Initializing multi-agent supervisor...</p>
          <p class="mt-1 text-emerald-400">&gt; SOP loaded: Accounting &amp; Admin Workforces [OK]</p>
          <p class="mt-1 text-watcher-cyan">&gt; RAG pipeline connected to private vector DB [SECURE]</p>
          <p class="mt-1 text-watcher-blue">&gt; n8n webhook listener active on port 5678 [LISTENING]</p>
          <div class="mt-4 rounded-xl bg-black/40 p-4 border border-white/10 text-slate-300">
            <p class="text-xs uppercase tracking-widest text-watcher-red font-bold">Autonomous Loop</p>
            <p class="mt-1">“Watcher Claw transitions manual execution into autonomous mastery for operational ROI.”</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES (light / dark hybrid) -->
<section id="services" class="bg-slate-50 dark:bg-watcher-navy/40 py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.services.eyebrow)}</p>
    <h2 class="mt-2 max-w-2xl text-3xl font-black sm:text-4xl">${esc(dict.services.title)}</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.services.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">${serviceCards}</div>
  </div>
</section>

<!-- AI SALES AGENT (TEXT-ONLY CHAT INTERFACE WITH SSE) -->
<section id="chat" class="bg-white dark:bg-watcher-deep py-20 border-y border-slate-200 dark:border-white/10">
  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    <div class="text-center">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.chatSection.eyebrow)}</p>
      <h2 class="mt-2 text-3xl font-black sm:text-4xl">${esc(dict.chatSection.title)}</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.chatSection.subtitle)}</p>
    </div>
    <div class="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-2xl dark:border-white/10 dark:bg-watcher-navy/50">
      <div id="chatHistory" class="space-y-4 max-h-[380px] overflow-y-auto p-4 font-mono text-xs">
        <div class="rounded-2xl bg-white p-4 border border-slate-200 dark:bg-white/5 dark:border-white/10">
          <p class="text-[10px] uppercase font-bold tracking-widest text-watcher-cyan">Watcher AI Sales Agent</p>
          <p class="mt-1 text-slate-800 dark:text-slate-200">${esc(dict.chatSection.initial)}</p>
        </div>
      </div>
      <form id="chatForm" data-lang="${lang}" class="mt-6 flex gap-3">
        <input id="chatInput" required class="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="${esc(dict.chatSection.placeholder)}"/>
        <button type="submit" class="rounded-xl bg-watcher-blue px-6 py-3 text-sm font-bold text-white hover:opacity-90">${esc(dict.chatSection.send)}</button>
      </form>
    </div>
  </div>
</section>

<!-- SOVEREIGN AI & GOVERNANCE -->
<section id="sovereign" class="relative overflow-hidden bg-watcher-deep text-white py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.governance.eyebrow)}</p>
        <h2 class="mt-2 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.governance.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.governance.subtitle)}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">${governanceItems}</div>
      </div>
      <div class="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur">
        <h3 class="text-xl font-extrabold text-white">${esc(dict.sovereign.title)}</h3>
        <p class="mt-3 text-slate-300 text-sm leading-relaxed">${esc(dict.sovereign.desc)}</p>
        <ul class="mt-6 space-y-3">
          ${dict.sovereign.bullets.map((b) => `<li class="flex items-start gap-3"><span class="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-watcher-cyan"></span><span class="font-semibold text-sm">${esc(b)}</span></li>`).join('')}
        </ul>
        <div class="mt-8">
          <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-6 py-3 font-bold text-white shadow-lg hover:opacity-90">${esc(dict.sovereign.cta)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RESEARCH (hybrid light) -->
<section id="research" class="bg-white dark:bg-watcher-deep py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.research.eyebrow)}</p>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2 class="text-3xl font-black sm:text-4xl">${esc(dict.research.title)}</h2>
      <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue">/ ${esc(dict.nav.research)}</a>
    </div>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">${postCards}</div>
  </div>
</section>

<!-- REGISTER (light card on slate) -->
<section id="register" class="bg-slate-50 dark:bg-black/40 py-20">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <h2 class="text-3xl font-black sm:text-4xl">${esc(dict.register.title)}</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.register.subtitle)}</p>
      <div class="mt-8 space-y-3 text-sm">
        <div><span class="text-xs font-bold uppercase tracking-widest text-slate-400 block">${esc(dict.footer.emailLabel)}</span><a class="font-bold text-watcher-blue" href="mailto:${CONTACT.email}">${CONTACT.email}</a></div>
        <div class="mt-3"><span class="text-xs font-bold uppercase tracking-widest text-slate-400 block">${esc(dict.footer.phoneLabel)}</span><a class="font-bold" href="tel:${CONTACT.phone}">${CONTACT.phone}</a></div>
        <div class="mt-3"><span class="text-xs font-bold uppercase tracking-widest text-slate-400 block">${esc(dict.footer.addressLabel)}</span><span class="font-semibold">${esc(CONTACT.address)}</span></div>
      </div>
    </div>
    <form id="regForm" data-lang="${lang}" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-white/5">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.name)} *</span>
          <input name="name" required minlength="2" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="John Doe"/></label>
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.company)} <span class="font-normal opacity-60">(${esc(dict.register.optional)})</span></span>
          <input name="company" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="Acme SARL"/></label>
      </div>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.email)} *</span>
        <input name="email" type="email" required class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="you@company.com"/></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.service)} *</span>
        <select name="service_request" required class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-watcher-deep dark:text-white">${serviceOptions}</select></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.message)}</span>
        <textarea name="message" rows="4" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15"></textarea></label>
      <button class="mt-6 w-full rounded-full bg-watcher-navy px-6 py-4 font-bold text-white hover:opacity-90 dark:bg-watcher-blue">${esc(dict.register.submit)}</button>
      <p id="regMsg" role="status" class="mt-4 hidden rounded-xl p-3 text-sm font-semibold"></p>
    </form>
  </div>
</section>`;
}

export function blogIndexPage(lang: Lang, dict: Dict, posts: PostRow[]): string {
  const cards = posts
    .map(
      (p) => `<a href="/${lang}/blog/${esc(p.slug)}" class="block rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
      <p class="text-xs text-slate-500">${esc((p.published_at || '').slice(0, 10))}</p>
      <h3 class="mt-2 text-xl font-extrabold">${esc(p.title)}</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
      <span class="mt-3 inline-block text-sm font-bold text-watcher-blue">${esc(dict.research.readMore)}</span></a>`
    )
    .join('');
  return `<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <h1 class="text-4xl font-black">${esc(dict.research.title)}</h1>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">${cards || '<p>—</p>'}</div>
  </section>`;
}

export function blogPostPage(lang: Lang, dict: Dict, post: PostRow & { body: string }): string {
  return `<article class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue">← /${lang}/blog</a>
    <p class="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">${esc((post.published_at || '').slice(0, 10))}</p>
    <h1 class="mt-2 text-4xl font-black leading-tight">${esc(post.title)}</h1>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(post.excerpt)}</p>
    <div class="prose mt-8 dark:prose-invert"><p>${esc(post.body)}</p></div>
    <a href="/${lang}#register" class="mt-10 inline-block rounded-full bg-watcher-red px-7 py-3.5 font-bold text-white">${esc(dict.nav.register)}</a>
  </article>`;
}
