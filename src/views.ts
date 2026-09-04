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

function langSwitcher(current: Lang): string {
  const langs: Lang[] = ['en', 'fr', 'ar'];
  return `<nav aria-label="Language" class="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 text-xs font-bold transition-colors duration-500 dark:border-white/10 dark:bg-white/5">
    ${langs
      .map(
        (l) =>
          `<a href="/${l}" hreflang="${l}" aria-current="${l === current ? 'true' : 'false'}"
            class="rounded-full px-3 py-1.5 transition-all duration-300 ${l === current ? 'bg-watcher-navy text-white dark:bg-watcher-cyan dark:text-watcher-deep font-black shadow-md' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'}">${LANG_META[l].label}</a>`
      )
      .join('')}
  </nav>`;
}

export interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
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
<body class="bg-white font-sans text-slate-900 antialiased transition-colors duration-500 dark:bg-watcher-deep dark:text-slate-100">
<a href="#main" class="sr-only">Skip</a>

<header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-colors duration-500 dark:border-white/10 dark:bg-watcher-deep/80">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
    <a href="/${lang}" class="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
      <img src="/static/logo.png" alt="Watcher IA Logo" class="h-10 sm:h-12 w-auto object-contain rounded-xl"/>
      <span class="leading-tight"><span class="block text-lg font-extrabold tracking-tight">Watcher <span class="text-watcher-blue">IA</span></span>
      <span class="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">AI agents that work</span></span>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-semibold lg:flex">
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#chat">${esc(dict.nav.chat)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#contact">${esc(dict.nav.contact)}</a>
    </nav>
    <div class="flex items-center gap-2">
      ${langSwitcher(lang)}
      <button id="themeToggle" aria-label="Toggle theme" class="glass-panel rounded-full p-2 text-sm transition-all duration-300 hover:scale-105">🌙</button>
      <a href="/${lang}#register" class="hidden rounded-full bg-watcher-red px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 sm:inline-block">${esc(dict.nav.register)}</a>
      <button id="menuBtn" class="glass-panel rounded-lg p-2 lg:hidden">☰</button>
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

<footer id="contact" class="bg-watcher-navy text-slate-200 transition-colors duration-500 dark:bg-black">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
    <div class="md:col-span-2">
      <div class="flex items-center gap-3">
        <img src="/static/logo.png" alt="Watcher IA Logo" class="h-11 w-auto object-contain rounded-xl"/>
        <div><p class="text-xl font-extrabold text-white">Watcher <span class="text-watcher-cyan">IA</span></p>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">${esc(CONTACT.domain)}</p></div>
      </div>
      <p class="mt-4 max-w-md text-sm text-slate-300">${esc(dict.footer.tagline)}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span class="glass-panel rounded-2xl px-3 py-1 text-watcher-cyan border-white/10">AUTOMATE EVERYTHING</span>
        <span class="glass-panel rounded-2xl px-3 py-1 text-watcher-blue border-white/10">SCALE WITHOUT LIMITS</span>
        <span class="rounded-2xl bg-watcher-red px-3 py-1 text-white">DEPLOY AI AGENTS</span>
      </div>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">${esc(dict.footer.contact)}</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.emailLabel)}</span><a class="transition-colors hover:text-watcher-cyan" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.phoneLabel)}</span><a class="transition-colors hover:text-watcher-cyan" href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.addressLabel)}</span><span class="text-slate-300">${esc(CONTACT.address)}</span></li>
      </ul>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">Langues / Languages</p>
      <div class="mt-3 flex gap-2">
        <a href="/en" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">EN</a>
        <a href="/fr" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">FR</a>
        <a href="/ar" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">عربي</a>
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
      (b, idx) => `<div class="glass-panel rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border-white/10">
        <div class="flex items-center gap-3">
          <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-watcher-blue/10 font-mono text-xs font-black text-watcher-cyan">0${idx + 1}</span>
          <span class="text-xs font-extrabold uppercase tracking-wide text-slate-200">${esc(b)}</span>
        </div>
      </div>`
    )
    .join('');

  const serviceImages = ['/static/service-1.jpg', '/static/service-2.jpg', '/static/service-3.jpg', '/static/service-4.jpg'];
  const serviceCards = dict.services.items
    .map(
      (s, i) => `<article class="glass-panel group rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10 flex flex-col justify-between">
      <div>
        <div class="h-36 w-full mb-4 overflow-hidden rounded-2xl border border-white/10 bg-watcher-navy/50 relative">
          <img src="${serviceImages[i % serviceImages.length]}" alt="${esc(s.title)}" class="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"/>
          <div class="absolute inset-0 bg-gradient-to-t from-watcher-deep/80 to-transparent"></div>
          <span class="absolute bottom-2 left-3 font-mono text-[10px] font-black uppercase text-watcher-cyan tracking-wider">MODULE 0${i + 1}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-watcher-cyan/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-watcher-cyan">${esc(s.tag)}</span>
        </div>
        <h3 class="mt-3 text-xl font-black tracking-tight">${esc(s.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(s.desc)}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
        <a href="/${lang}#register" data-service="${s.key}" class="svc-cta inline-flex items-center gap-2 text-sm font-extrabold text-watcher-red transition-all hover:translate-x-1">${esc(dict.nav.register)}</a>
        <span class="font-mono text-xs font-bold text-slate-400">EXECUTE</span>
      </div>
    </article>`
    )
    .join('');

  const clawStats = dict.claw.stats
    .map(
      (st) => `<div class="glass-panel rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.02] border-white/10">
      <p class="text-3xl font-black text-watcher-cyan">${esc(st.value)}</p>
      <p class="mt-1 text-xs font-bold uppercase tracking-widest text-slate-300">${esc(st.label)}</p>
    </div>`
    )
    .join('');

  const governanceItems = dict.governance.items
    .map(
      (g, idx) => `<div class="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] border-white/10">
      <span class="font-mono text-xs font-black text-watcher-cyan">PRINCIPLE 0${idx + 1}</span>
      <h3 class="mt-2 text-lg font-extrabold text-white">${esc(g.title)}</h3>
      <p class="mt-2 text-sm text-slate-300 leading-relaxed">${esc(g.desc)}</p>
    </div>`
    )
    .join('');

  const postCards =
    posts.length === 0
      ? `<p class="text-sm opacity-70">—</p>`
      : posts
          .map(
            (p) => `<article class="glass-panel rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10">
        ${p.cover ? `<div class="h-40 w-full mb-4 overflow-hidden rounded-2xl border border-white/10"><img src="${esc(p.cover)}" alt="${esc(p.title)}" class="h-full w-full object-cover opacity-90"/></div>` : ''}
        <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>${esc((p.published_at || '').slice(0, 10))}</span>
          <span class="font-mono text-watcher-blue">${esc(p.slug)}</span>
        </div>
        <h3 class="mt-3 text-lg font-black leading-snug tracking-tight">${esc(p.title)}</h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
        <div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10">
          <a href="/${lang}/blog/${esc(p.slug)}" class="inline-flex items-center text-sm font-bold text-watcher-blue transition-all hover:translate-x-1">${esc(dict.research.readMore)} →</a>
        </div>
      </article>`
          )
          .join('');

  const serviceOptions = dict.register.services
    .map((o) => `<option value="${o.value}">${esc(o.label)}</option>`)
    .join('');

  return `
<!-- HERO SECTION (Atmospheric full-width background image + breathing blobs + glassmorphism) -->
<section class="relative overflow-hidden bg-watcher-deep text-white py-28 lg:py-36">
  <div class="absolute inset-0 z-0">
    <img src="/static/hero-bg.jpg" alt="Agentic Data Flows" class="h-full w-full object-cover opacity-30"/>
    <div class="absolute inset-0 bg-gradient-to-r from-watcher-deep via-watcher-deep/90 to-watcher-deep/70"></div>
  </div>
  <div class="hero-grid absolute inset-0 pointer-events-none opacity-45 z-10"></div>
  <div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-watcher-blue/20 blur-3xl animate-breathe pointer-events-none z-10"></div>
  <div class="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-watcher-red/15 blur-3xl animate-breathe-delayed pointer-events-none z-10"></div>

  <div class="relative z-20 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-watcher-cyan/30 bg-watcher-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-watcher-cyan backdrop-blur-md">
        <span class="h-2 w-2 rounded-full bg-watcher-cyan animate-ping"></span>
        ${esc(dict.hero.eyebrow)}
      </div>
      <h1 class="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
        ${esc(dict.hero.titleA)}<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-watcher-red via-watcher-magenta to-watcher-cyan">${esc(dict.hero.titleB)}</span>
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">${esc(dict.hero.subtitle)}</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="/${lang}#register" class="rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.hero.ctaPrimary)}</a>
        <a href="/${lang}#services" class="glass-panel rounded-full px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 border-white/10">${esc(dict.hero.ctaSecondary)}</a>
      </div>
      <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        ${dict.strip.map((s) => `<div class="font-mono text-xs font-bold uppercase tracking-wider text-watcher-cyan"><span class="text-watcher-red mr-1.5">/</span>${esc(s)}</div>`).join('')}
      </div>
    </div>
    <div class="relative">
      <div class="grid gap-4 sm:grid-cols-2">${heroBadges}</div>
    </div>
  </div>
</section>

<!-- WATCHER CLAW PLATFORM SHOWCASE -->
<section id="claw" class="relative overflow-hidden bg-watcher-navy py-24 text-white">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-watcher-blue/10 via-transparent to-transparent pointer-events-none"></div>
  <div class="relative mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.claw.eyebrow)}</p>
        <h2 class="mt-3 font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl">${esc(dict.claw.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.claw.subtitle)}</p>
        <div class="mt-8 grid grid-cols-3 gap-4">${clawStats}</div>
        <div class="mt-10">
          <a href="/${lang}#register" class="inline-flex items-center rounded-full bg-watcher-cyan px-8 py-4 font-black text-watcher-deep transition-all duration-300 hover:scale-105 hover:bg-white shadow-lg shadow-cyan-900/30">${esc(dict.claw.cta)} →</a>
        </div>
      </div>
      <div class="glass-panel relative rounded-3xl p-6 shadow-2xl backdrop-blur-md border-white/10">
        <div class="rounded-2xl bg-watcher-deep/90 p-6 font-mono text-xs text-watcher-cyan border border-white/10">
          <p class="text-slate-400">// WATCHER CLAW KERNEL V4.2 (GEMINI AI ENGINE)</p>
          <p class="mt-3 text-white font-bold">&gt; Initializing multi-agent supervisor...</p>
          <p class="mt-1.5 text-emerald-400">&gt; SOP loaded: Accounting &amp; Admin Workforces [OK]</p>
          <p class="mt-1.5 text-watcher-cyan">&gt; RAG pipeline connected to private vector DB [SECURE]</p>
          <p class="mt-1.5 text-watcher-blue">&gt; n8n webhook listener active on port 5678 [LISTENING]</p>
          <div class="mt-6 rounded-2xl bg-black/50 p-5 border border-white/10 text-slate-300">
            <p class="text-[11px] uppercase tracking-widest text-watcher-red font-extrabold">Autonomous Loop</p>
            <p class="mt-2 text-sm leading-relaxed text-white">“Watcher Claw transitions manual execution into autonomous mastery for operational ROI.”</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES GRID (Refactored with Glassmorphism & Unique Abstract Images) -->
<section id="services" class="bg-slate-50 dark:bg-watcher-navy/40 py-24 transition-colors duration-500">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="max-w-3xl">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.services.eyebrow)}</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.services.title)}</h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(dict.services.subtitle)}</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">${serviceCards}</div>
  </div>
</section>

<!-- GEMINI AI SALES AGENT (WATCHER CLAW CHAT) -->
<section id="chat" class="bg-white dark:bg-watcher-deep py-24 transition-colors duration-500 border-y border-slate-200 dark:border-white/10">
  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    <div class="text-center">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.chatSection.eyebrow)}</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">${esc(dict.chatSection.title)}</h2>
      <p class="mt-3 text-slate-600 dark:text-slate-300">${esc(dict.chatSection.subtitle)}</p>
    </div>
    <div class="glass-panel mt-10 rounded-3xl p-6 shadow-2xl backdrop-blur-md border-white/10">
      <div id="chatHistory" class="space-y-4 max-h-[380px] overflow-y-auto p-4 font-mono text-xs">
        <div class="glass-panel rounded-2xl p-4 border-white/10">
          <p class="text-[10px] uppercase font-extrabold tracking-widest text-watcher-cyan">Watcher AI Sales Agent (Gemini Pro)</p>
          <p class="mt-1.5 text-slate-800 dark:text-slate-200">${esc(dict.chatSection.initial)}</p>
        </div>
      </div>
      <form id="chatForm" data-lang="${lang}" class="mt-6 flex gap-3">
        <input id="chatInput" required class="flex-1 rounded-2xl border border-slate-300 bg-white/50 px-5 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="${esc(dict.chatSection.placeholder)}"/>
        <button type="submit" class="rounded-2xl bg-watcher-blue px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-sky-500 shadow-lg">${esc(dict.chatSection.send)}</button>
      </form>
    </div>
  </div>
</section>

<!-- SOVEREIGN AI & GOVERNANCE -->
<section id="sovereign" class="relative overflow-hidden bg-watcher-deep text-white py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.governance.eyebrow)}</p>
        <h2 class="mt-3 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.governance.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.governance.subtitle)}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">${governanceItems}</div>
      </div>
      <div class="glass-panel rounded-3xl p-8 shadow-2xl backdrop-blur-md border-white/10">
        <h3 class="text-2xl font-black text-white">${esc(dict.sovereign.title)}</h3>
        <p class="mt-4 text-slate-300 text-sm leading-relaxed">${esc(dict.sovereign.desc)}</p>
        <ul class="mt-6 space-y-4">
          ${dict.sovereign.bullets.map((b, idx) => `<li class="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border-white/10"><span class="font-mono text-xs font-black text-watcher-cyan">0${idx + 1}</span><span class="font-bold text-sm text-white">${esc(b)}</span></li>`).join('')}
        </ul>
        <div class="mt-8">
          <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.sovereign.cta)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RESEARCH & BLOG ARCHIVE -->
<section id="research" class="bg-white dark:bg-watcher-deep py-24 transition-colors duration-500">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.research.eyebrow)}</p>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2 class="text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.research.title)}</h2>
      <a href="/${lang}/blog" class="text-sm font-extrabold text-watcher-blue transition-colors hover:text-watcher-cyan">/ ${esc(dict.nav.research)}</a>
    </div>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">${postCards}</div>
  </div>
</section>

<!-- REGISTER (light card on slate) -->
<section id="register" class="bg-slate-50 dark:bg-black/40 py-24 transition-colors duration-500">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <h2 class="text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.register.title)}</h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(dict.register.subtitle)}</p>
      <div class="glass-panel mt-8 rounded-3xl p-8 space-y-4 text-sm border-white/10">
        <div><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.emailLabel)}</span><a class="font-bold text-slate-900 dark:text-white" href="mailto:${CONTACT.email}">${CONTACT.email}</a></div>
        <div class="pt-3 border-t border-slate-200/60 dark:border-white/15"><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.phoneLabel)}</span><a class="font-bold text-slate-900 dark:text-white" href="tel:${CONTACT.phone}">${CONTACT.phone}</a></div>
        <div class="pt-3 border-t border-slate-200/60 dark:border-white/15"><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.addressLabel)}</span><span class="font-bold text-slate-900 dark:text-white">${esc(CONTACT.address)}</span></div>
      </div>
    </div>
    <form id="regForm" data-lang="${lang}" class="glass-panel rounded-3xl p-8 shadow-2xl border-white/10">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.name)} *</span>
          <input name="name" required minlength="2" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="John Doe"/></label>
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.company)} <span class="font-normal opacity-60">(${esc(dict.register.optional)})</span></span>
          <input name="company" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="Acme SARL"/></label>
      </div>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.email)} *</span>
        <input name="email" type="email" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="you@company.com"/></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.service)} *</span>
        <select name="service_request" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white">${serviceOptions}</select></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.message)}</span>
        <textarea name="message" rows="4" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white"></textarea></label>
      <button class="mt-8 w-full rounded-full bg-watcher-navy px-6 py-4 font-extrabold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 dark:bg-watcher-blue dark:hover:bg-sky-500 shadow-xl">${esc(dict.register.submit)}</button>
      <p id="regMsg" role="status" class="mt-4 hidden rounded-2xl p-4 text-sm font-bold"></p>
    </form>
  </div>
</section>`;
}

export function blogIndexPage(lang: Lang, dict: Dict, posts: PostRow[]): string {
  const cards = posts
    .map(
      (p) => `<a href="/${lang}/blog/${esc(p.slug)}" class="glass-panel block rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10">
      ${p.cover ? `<div class="h-40 w-full mb-4 overflow-hidden rounded-2xl border border-white/10"><img src="${esc(p.cover)}" alt="${esc(p.title)}" class="h-full w-full object-cover"/></div>` : ''}
      <p class="text-xs font-mono text-watcher-blue">${esc((p.published_at || '').slice(0, 10))}</p>
      <h3 class="mt-3 text-xl font-black tracking-tight">${esc(p.title)}</h3>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
      <span class="mt-6 inline-block text-sm font-extrabold text-watcher-blue transition-transform hover:translate-x-1">${esc(dict.research.readMore)} →</span></a>`
    )
    .join('');
  return `<section class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
    <h1 class="text-4xl font-black tracking-tight sm:text-5xl">${esc(dict.research.title)}</h1>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">${cards || '<p>—</p>'}</div>
  </section>`;
}

export function blogPostPage(lang: Lang, dict: Dict, post: PostRow & { body: string }): string {
  return `<article class="mx-auto max-w-3xl px-4 py-24 sm:px-6">
    <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue transition-colors hover:text-watcher-cyan">← /${lang}/blog</a>
    ${post.cover ? `<div class="h-64 w-full my-6 overflow-hidden rounded-3xl border border-white/10 shadow-2xl"><img src="${esc(post.cover)}" alt="${esc(post.title)}" class="h-full w-full object-cover"/></div>` : ''}
    <p class="mt-6 text-xs font-mono font-bold text-watcher-blue uppercase tracking-widest">${esc((post.published_at || '').slice(0, 10))}</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight leading-tight sm:text-5xl">${esc(post.title)}</h1>
    <p class="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-semibold">${esc(post.excerpt)}</p>
    <div class="glass-panel mt-10 rounded-3xl p-8 leading-relaxed text-slate-700 dark:text-slate-200 border-white/10">${esc(post.body)}</div>
    <div class="mt-12">
      <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.nav.register)}</a>
    </div>
  </article>`;
}
