export type Lang = 'en' | 'fr' | 'ar';
export const SUPPORTED_LANGS: Lang[] = ['en', 'fr', 'ar'];
export const DEFAULT_LANG: Lang = 'en';

export function isLang(v: string | null | undefined): v is Lang {
  return v === 'en' || v === 'fr' || v === 'ar';
}

export const LANG_META: Record<Lang, { label: string; dir: 'ltr' | 'rtl'; name: string }> = {
  en: { label: 'EN', dir: 'ltr', name: 'English' },
  fr: { label: 'FR', dir: 'ltr', name: 'Français' },
  ar: { label: 'عربي', dir: 'rtl', name: 'العربية' },
};

export interface Dict {
  nav: { services: string; sovereign: string; claw: string; research: string; contact: string; register: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badges: string[];
  };
  strip: string[];
  claw: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: { label: string; value: string }[];
    cta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { key: string; title: string; desc: string; tag: string }[];
  };
  sovereign: { eyebrow: string; title: string; desc: string; bullets: string[]; cta: string };
  governance: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  research: { eyebrow: string; title: string; subtitle: string; readMore: string };
  register: {
    title: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    service: string;
    message: string;
    services: { value: string; label: string }[];
    submit: string;
    success: string;
    error: string;
    optional: string;
  };
  footer: { tagline: string; rights: string; contact: string };
}

export const dicts: Record<Lang, Dict> = {
  en: {
    nav: { services: 'Services', sovereign: 'Sovereign AI', claw: 'Watcher Claw', research: 'Research', contact: 'Contact', register: 'Get started' },
    hero: {
      eyebrow: 'Watcher IA · AI agents that work',
      titleA: 'BUILD YOUR BUSINESS WITH',
      titleB: 'AGENTIC AI',
      subtitle: 'Automation · AI Agents · Digital Workforce. Autonomous workforces for admin, accounting & dev — deployed on your sovereign infrastructure.',
      ctaPrimary: 'Deploy AI agents',
      ctaSecondary: 'Explore services',
      badges: ['Enterprise Automation', 'Multi-Agent Systems', 'AI Workflows', 'RAG Architecture', 'MCP Integration', 'AI Assistants', 'Business Automation', 'Custom AI Solutions'],
    },
    strip: ['Automate everything', 'Scale without limits', 'Deploy AI agents. Grow faster.'],
    claw: {
      eyebrow: 'Watcher Claw Platform',
      title: 'An AI Agent That Learns & Executes',
      subtitle: 'Watcher Claw transitions manual execution into autonomous mastery for operational ROI. Deploy agents that observe your workflows, learn SOPs, and execute with precision guardrails.',
      stats: [
        { label: 'Agent Efficiency', value: '99.8%' },
        { label: 'Tasks Automated', value: '1,245,000+' },
        { label: 'Connectivity Status', value: 'Secure (12 Nodes)' },
      ],
      cta: 'Experience Mastery',
    },
    services: {
      eyebrow: 'What we do',
      title: 'Bespoke agentic solutions, wired into your operations',
      subtitle: 'Outcome-based automation — measured by ROI, not demos.',
      items: [
        { key: 'agentic_solutions', title: 'Bespoke Agentic Solutions', desc: 'Autonomous workforces for administrative, accounting & dev teams. Agents that learn your SOPs and execute.', tag: 'Admin · Accounting · Dev' },
        { key: 'n8n_automation', title: 'n8n Workflow Automation & Training', desc: 'Enterprise-grade pipeline orchestration with n8n. We build, harden, and train your team to own it.', tag: 'n8n · Pipelines · Training' },
        { key: 'private_ai_server', title: 'Secure Private AI Server Deployment', desc: 'On-premise / sovereign deployment powered by ODS / Osmantic stack. Your data never leaves your perimeter.', tag: 'On-premise · Sovereign · ODS' },
        { key: 'consulting_governance', title: 'Consulting & Digital Governance', desc: 'Strategic AI advisory, governance frameworks, and AGI-readiness roadmaps for executives.', tag: 'Strategy · Governance' },
      ],
    },
    sovereign: {
      eyebrow: 'Sovereign by design',
      title: 'Stop managing tools. Deploy agents that learn.',
      desc: 'Watcher Claw transitions manual execution into autonomous mastery for operational ROI — inside your private cloud.',
      bullets: ['ODS / Osmantic private stack', 'RAG over your internal knowledge', 'MCP integrations to your ERP / CRM', 'Audit trails & human-in-the-loop guardrails'],
      cta: 'Talk to an architect',
    },
    governance: {
      eyebrow: 'Digital Sovereignty & Ethics',
      title: 'Artificial Intelligence at the Service of Humanity',
      subtitle: 'Building a trustworthy future with clear rules and absolute transparency.',
      items: [
        { title: 'Governance', desc: 'Clear rules and assumed responsibilities across all autonomous workflows.' },
        { title: 'Transparency', desc: 'A system that explains every decision, never guessing.' },
        { title: 'Responsibility', desc: 'Humans remain at the core of all strategic decisions.' },
        { title: 'Responsible Design', desc: 'Technology dedicated to human dignity and operational excellence.' },
      ],
    },
    research: { eyebrow: 'Research & notes', title: 'From the lab', subtitle: 'Operational playbooks on agentic automation.', readMore: 'Read note' },
    register: {
      title: 'Client registration',
      subtitle: 'Tell us about your use case. We reply within 1 business day.',
      name: 'Full name', company: 'Company', email: 'Work email', service: 'Service request',
      message: 'Briefly describe your need',
      services: [
        { value: 'agentic_solutions', label: 'Bespoke Agentic Solutions' },
        { value: 'n8n_automation', label: 'n8n Workflow Automation & Training' },
        { value: 'private_ai_server', label: 'Secure Private AI Server (ODS/Osmantic)' },
        { value: 'consulting_governance', label: 'Consulting & Digital Governance' },
        { value: 'other', label: 'Other' },
      ],
      submit: 'Submit request', success: 'Request received. Our team will contact you shortly.', error: 'Submission failed. Check fields and retry.', optional: 'optional',
    },
    footer: { tagline: 'AI agents that work. Automate everything. Scale without limits.', rights: 'All rights reserved.', contact: 'Contact' },
  },
  fr: {
    nav: { services: 'Services', sovereign: 'IA souveraine', claw: 'Watcher Claw', research: 'Recherche', contact: 'Contact', register: 'Démarrer' },
    hero: {
      eyebrow: 'Watcher IA · des agents IA qui travaillent',
      titleA: 'DÉVELOPPEZ VOTRE ENTREPRISE AVEC',
      titleB: "L'IA AGENTIQUE",
      subtitle: 'Automatisation · Agents IA · Workforce digitale. Des workforces autonomes pour l’admin, la compta & le dev — déployées sur votre infra souveraine.',
      ctaPrimary: 'Déployer des agents IA',
      ctaSecondary: 'Explorer les services',
      badges: ['Automatisation entreprise', 'Systèmes multi-agents', 'Workflows IA', 'Architecture RAG', 'Intégration MCP', 'Assistants IA', 'Automatisation business', 'Solutions IA sur mesure'],
    },
    strip: ['Automatisez tout', 'Scalez sans limites', 'Déployez des agents IA. Grandissez plus vite.'],
    claw: {
      eyebrow: 'Plateforme Watcher Claw',
      title: "Un agent IA qui apprend et s'exécute",
      subtitle: "Watcher Claw fait passer l'exécution manuelle à la maîtrise autonome pour un ROI opérationnel. Déployez des agents qui observent vos flux, apprennent vos SOP et exécutent avec précision.",
      stats: [
        { label: "Efficacité de l'agent", value: '99.8%' },
        { label: 'Tâches automatisées', value: '1 245 000+' },
        { label: 'Statut de connectivité', value: 'Sécurisé (12 nœuds)' },
      ],
      cta: 'Expérimenter la maîtrise',
    },
    services: {
      eyebrow: 'Ce que nous faisons',
      title: 'Des solutions agentiques sur mesure, câblées à vos opérations',
      subtitle: 'Une automatisation orientée résultats — mesurée au ROI, pas aux démos.',
      items: [
        { key: 'agentic_solutions', title: 'Solutions agentiques sur mesure', desc: 'Workforces autonomes pour équipes administratives, comptables & dev. Des agents qui apprennent vos SOP et exécutent.', tag: 'Admin · Compta · Dev' },
        { key: 'n8n_automation', title: 'Automatisation n8n & formation', desc: 'Orchestration de pipelines robuste avec n8n. Nous construisons, durcissons et formons vos équipes.', tag: 'n8n · Pipelines · Formation' },
        { key: 'private_ai_server', title: 'Serveur IA privé sécurisé', desc: 'Déploiement on-premise / souverain propulsé par la stack ODS / Osmantic. Vos données restent chez vous.', tag: 'On-premise · Souverain · ODS' },
        { key: 'consulting_governance', title: 'Conseil & gouvernance digitale', desc: 'Conseil stratégique IA, cadres de gouvernance et feuilles de route AGI pour dirigeants.', tag: 'Stratégie · Gouvernance' },
      ],
    },
    sovereign: {
      eyebrow: 'Souverain par design',
      title: 'Cessez de gérer des outils. Déployez des agents qui apprennent.',
      desc: 'Watcher Claw fait passer l’exécution manuelle à la maîtrise autonome pour un ROI opérationnel — dans votre cloud privé.',
      bullets: ['Stack privée ODS / Osmantic', 'RAG sur votre connaissance interne', 'Intégrations MCP à votre ERP / CRM', 'Pistes d’audit & garde-fous humains'],
      cta: 'Parler à un architecte',
    },
    governance: {
      eyebrow: 'Souveraineté Numérique & IA',
      title: "L'Intelligence Artificielle au Service de l'Humain",
      subtitle: 'Construisons un avenir de confiance, ensemble, avec des règles claires et une transparence absolue.',
      items: [
        { title: 'Gouvernance', desc: 'Des règles claires, des responsabilités assumées à chaque étape.' },
        { title: 'Transparence', desc: 'Un système qui explique, pas qui devine.' },
        { title: 'Responsabilité', desc: 'L’humain reste au cœur de toutes les décisions stratégiques.' },
        { title: 'Conception Responsable', desc: 'La technologie au service de la dignité humaine.' },
      ],
    },
    research: { eyebrow: 'Recherche & notes', title: 'Depuis le labo', subtitle: 'Playbooks opérationnels sur l’automatisation agentique.', readMore: 'Lire la note' },
    register: {
      title: 'Inscription client',
      subtitle: 'Décrivez votre besoin. Réponse sous 1 jour ouvré.',
      name: 'Nom complet', company: 'Société', email: 'Email pro', service: 'Service demandé',
      message: 'Décrivez brièvement votre besoin',
      services: [
        { value: 'agentic_solutions', label: 'Solutions agentiques sur mesure' },
        { value: 'n8n_automation', label: 'Automatisation n8n & formation' },
        { value: 'private_ai_server', label: 'Serveur IA privé (ODS/Osmantic)' },
        { value: 'consulting_governance', label: 'Conseil & gouvernance digitale' },
        { value: 'other', label: 'Autre' },
      ],
      submit: 'Envoyer la demande', success: 'Demande reçue. Notre équipe vous contactera rapidement.', error: 'Échec d’envoi. Vérifiez les champs et réessayez.', optional: 'optionnel',
    },
    footer: { tagline: 'Des agents IA qui travaillent. Automatisez tout. Scalez sans limites.', rights: 'Tous droits réservés.', contact: 'Contact' },
  },
  ar: {
    nav: { services: 'الخدمات', sovereign: 'ذكاء سيادي', claw: 'واتشر كلو', research: 'الأبحاث', contact: 'اتصل بنا', register: 'ابدأ الآن' },
    hero: {
      eyebrow: 'واتشر IA · وكلاء ذكاء يعملون فعلاً',
      titleA: 'طوّر أعمالك مع',
      titleB: 'الذكاء الوكيلي',
      subtitle: 'أتمتة · وكلاء ذكاء · قوى عاملة رقمية. قوى عاملة ذاتية للإدارة والمحاسبة والتطوير — منشورة على بنيتك السيادية.',
      ctaPrimary: 'انشر وكلاء الذكاء',
      ctaSecondary: 'استكشف الخدمات',
      badges: ['أتمتة المؤسسات', 'أنظمة متعددة الوكلاء', 'سير عمل ذكي', 'بنية RAG', 'تكامل MCP', 'مساعدات ذكية', 'أتمتة الأعمال', 'حلول ذكاء مخصصة'],
    },
    strip: ['أتمت كل شيء', 'توسّع بلا حدود', 'انشر وكلاء الذكاء. انمُ أسرع.'],
    claw: {
      eyebrow: 'منصة Watcher Claw',
      title: 'وكيل ذكاء اصطناعي يتعلم وينفذ',
      subtitle: 'يحوّل Watcher Claw التنفيذ اليدوي إلى إتقان ذاتي من أجل عائد تشغيلي. انشر وكلاء يراقبون تدفقات عملك، يتعلمون الإجراءات، وينفذون بدقة عالية.',
      stats: [
        { label: 'كفاءة الوكيل', value: '99.8%' },
        { label: 'المهام المؤتمتة', value: '+1,245,000' },
        { label: 'حالة الاتصال', value: 'آمن (12 عقدة)' },
      ],
      cta: 'اختبر الإتقان الذاتي',
    },
    services: {
      eyebrow: 'ماذا نقدم',
      title: 'حلول وكيلية مصممة خصيصاً، مدمجة في عملياتك',
      subtitle: 'أتمتة قائمة على النتائج — تُقاس بالعائد لا بالعروض.',
      items: [
        { key: 'agentic_solutions', title: 'حلول وكيلية مخصصة', desc: 'قوى عاملة ذاتية لفرق الإدارة والمحاسبة والتطوير. وكلاء يتعلمون إجراءاتك وينفذون.', tag: 'إدارة · محاسبة · تطوير' },
        { key: 'n8n_automation', title: 'أتمتة n8n والتدريب', desc: 'تنسيق خطوط أنابيب بمستوى المؤسسات عبر n8n. نبني ونحصّن وندرّب فريقك على التملك.', tag: 'n8n · خطوط · تدريب' },
        { key: 'private_ai_server', title: 'نشر خادم ذكاء خاص وآمن', desc: 'نشر محلي / سيادي مدعوم بحزمة ODS / Osmantic. بياناتك لا تغادر محيطك.', tag: 'محلي · سيادي · ODS' },
        { key: 'consulting_governance', title: 'الاستشارات والحوكمة الرقمية', desc: 'استشارات استراتيجية في الذكاء وأطر حوكمة وخارطة طريق للجاهزية لعصر AGI.', tag: 'استراتيجية · حوكمة' },
      ],
    },
    sovereign: {
      eyebrow: 'سيادي بالتصميم',
      title: 'توقف عن إدارة الأدوات. انشر وكلاء يتعلمون.',
      desc: 'ينقل Watcher Claw التنفيذ اليدوي إلى إتقان ذاتي من أجل عائد تشغيلي — داخل سحابتك الخاصة.',
      bullets: ['حزمة ODS / Osmantic الخاصة', 'بحث RAG فوق معرفتك الداخلية', 'تكاملات MCP مع ERP / CRM', 'سجلات تدقيق وضوابط بشرية'],
      cta: 'تحدث مع مهندس',
    },
    governance: {
      eyebrow: 'السيادة الرقمية والاخلاقيات',
      title: 'الذكاء الاصطناعي في خدمة الإنسانية',
      subtitle: 'نبني مستقبلاً موثوقاً مع قواعد واضحة وشفافية مطلقـة.',
      items: [
        { title: 'الحوكمة', desc: 'قواعد واضحة ومسؤوليات محددة في كافة العمليات.' },
        { title: 'الشفافية', desc: 'نظام يشرح كل قرار، ولا يخمن أبداً.' },
        { title: 'المسؤولية', desc: 'يبقى الإنسان في قلب كافة القرارات الاستراتيجية.' },
        { title: 'التصميم المسؤول', desc: 'تكنولوجيا مسخرة لكرامة الإنسان والتميز التشغيلي.' },
      ],
    },
    research: { eyebrow: 'أبحاث ومدونات', title: 'من المختبر', subtitle: 'أدلة تشغيلية حول الأتمتة الوكيلية.', readMore: 'اقرأ المقال' },
    register: {
      title: 'تسجيل العملاء',
      subtitle: 'أخبرنا عن حالتك. نرد خلال يوم عمل واحد.',
      name: 'الاسم الكامل', company: 'الشركة', email: 'البريد المهني', service: 'الخدمة المطلوبة',
      message: 'صف باختصار احتياجك',
      services: [
        { value: 'agentic_solutions', label: 'حلول وكيلية مخصصة' },
        { value: 'n8n_automation', label: 'أتمتة n8n والتدريب' },
        { value: 'private_ai_server', label: 'خادم ذكاء خاص (ODS/Osmantic)' },
        { value: 'consulting_governance', label: 'استشارات وحوكمة رقمية' },
        { value: 'other', label: 'أخرى' },
      ],
      submit: 'إرسال الطلب', success: 'تم استلاستلام الطلب. سيتواصل معك فريقنا قريباً.', error: 'فشل الإرسال. تحقق من الحقول وحاول مجدداً.', optional: 'اختياري',
    },
    footer: { tagline: 'وكلاء ذكاء يعملون. أتمت كل شيء. توسّع بلا حدود.', rights: 'جميع الحقوق محفوظة.', contact: 'اتصل بنا' },
  },
};
