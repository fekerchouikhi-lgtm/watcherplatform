-- Watcher IA · D1 schema · client portal registration + research/blog archive
-- Apply with: wrangler d1 migrations apply watcher_ia_db --local|--remote

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK (length(trim(name)) >= 2),
  company TEXT,
  email TEXT NOT NULL CHECK (email LIKE '%@%.%'),
  service_request TEXT NOT NULL CHECK (service_request IN (
    'agentic_solutions',
    'n8n_automation',
    'private_ai_server',
    'consulting_governance',
    'other'
  )),
  message TEXT,
  lang TEXT NOT NULL DEFAULT 'en' CHECK (lang IN ('ar','en','fr')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','archived')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients (email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients (status);
CREATE INDEX IF NOT EXISTS idx_clients_created ON clients (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_service ON clients (service_request);

CREATE TRIGGER IF NOT EXISTS trg_clients_updated
AFTER UPDATE ON clients FOR EACH ROW BEGIN
  UPDATE clients SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = NEW.id;
END;

-- Research / Blog archive (multi-lingual, path-based: /ar/blog/:slug etc.)
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  lang TEXT NOT NULL CHECK (lang IN ('ar','en','fr')),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  cover TEXT,
  published_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE (slug, lang)
);
CREATE INDEX IF NOT EXISTS idx_posts_lang_date ON posts (lang, published_at DESC);

-- Seed: 3 flagship research notes x 3 languages (EN, FR, AR)
INSERT OR IGNORE INTO posts (slug, lang, title, excerpt, body, cover) VALUES
('shift-to-agentic-ai','en','The Shift to Agentic AI: Why Tools Are No Longer Enough','Why autonomous execution is the next evolution in business automation, moving beyond simple task triggering.','The transition from "Tool-use" (n8n/Zapier) to "Agentic-autonomy" represents a fundamental paradigm shift in enterprise software. Simple triggers and static API calls require constant human oversight and fail when edge cases arise. Autonomous agentic workforces reason, plan, adapt, and execute multi-step business logic autonomously — delivering true operational ROI rather than mere click-saving automation.',NULL),
('sovereign-ai-perimeter','en','Sovereign AI: Keeping Your Data Inside Your Perimeter','A deep dive into ODS/Osmantic stacks and why local/private deployment is non-negotiable for enterprise accounting and dev teams.','Enterprise accounting, administrative, and development data cannot tolerate third-party cloud leakage. Our secure private AI server deployments, powered by the ODS/Osmantic stack, guarantee complete data sovereignty. Your models run on-premise or in your dedicated sovereign cloud, with end-to-end auditability and rigorous RBAC guardrails.',NULL),
('n8n-agentic-workflows','en','n8n and Agentic Workflows: Building the Digital Workforce','How we use n8n as the "nervous system" for our AI agents to orchestrate complex corporate pipelines.','n8n serves as the enterprise-grade nervous system connecting our autonomous AI agents to your existing ERP, CRM, and databases. We build, harden, and train your internal teams to orchestrate these resilient pipelines, transforming rigid cron jobs into dynamic, self-healing digital workforces.',NULL),

('shift-to-agentic-ai','fr','Le virage vers l’IA agentique : pourquoi les outils ne suffisent plus','Pourquoi l’exécution autonome est la prochaine évolution de l’automatisation, bien au-delà du simple déclenchement de tâches.','La transition du simple outil (n8n/Zapier) vers l’autonomie agentique marque un tournant majeur. Les déclencheurs statiques nécessitent une supervision constante. Les workforces agentiques autonomes raisonnent, planifient et exécutent une logique complexe avec un retour sur investissement mesurable.',NULL),
('sovereign-ai-perimeter','fr','IA souveraine : garder vos données dans votre périmètre','Une plongée dans les stacks ODS/Osmantic et pourquoi le déploiement sur site est indispensable pour la compta et le dev.','Les données comptables et administratives exigent une confidentialité absolue. Nos déploiements de serveurs IA privés (stack ODS/Osmantic) garantissent que vos données ne quittent jamais votre infrastructure, avec des pistes d’audit rigoureuses.',NULL),
('n8n-agentic-workflows','fr','n8n et workflows agentiques : bâtir la workforce digitale','Comment nous utilisons n8n comme "système nerveux" pour orchestrer des pipelines d’entreprise complexes.','n8n connecte nos agents IA à votre ERP et CRM. Nous concevons, renforçons et formons vos équipes pour piloter ces flottes autonomes et résilientes.',NULL),

('shift-to-agentic-ai','ar','التحول إلى الذكاء الوكيلي: لماذا لم تعد الأدوات كافية','لماذا يُعد التنفيذ الذاتي التطوير القادم في أتمتة الأعمال، متجاوزاً التشغيل البسيط لل المهام.','التحول من الاستخدام الستاتيكي للأدوات إلى الاستقلالية الوكيلية يمثل ثورة حقيقية. الوكلاء الذاتيون يفكرون، يخططون، ويتكيفون لتنفيذ منطق الأعمال المعقد وتحقيق عائد حقيقي.',NULL),
('sovereign-ai-perimeter','ar','الذكاء السيادي: الحفاظ على بياناتك داخل محيطك الأمني','نظرة معمقة على حزم ODS/Osmantic ولماذا يعد النشر المحلي أمراً حتمياً للفرق المالية والتقنية.','بيانات المحاسبة والإدارة لا تحتمل التسريب السحابي. خوادمنا الخاصة المدعومة بحزمة ODS/Osmantic تضمن سيادة كاملة لبياناتك داخل بنيتك وتحت سيطرتك المطلقة.',NULL),
('n8n-agentic-workflows','ar','n8n وسير العمل الوكيلي: بناء القوى العاملة الرقمية','كيف نستخدم n8n كـ "جهاز عصبي" لوكلائنا الذكيين لتنسيق خطوط الأنابيب المؤسسية المعقدة.','يعمل n8n كعمود فقري مؤسسي يربط وكلاءنا بـ ERP و CRM الخاص بك. نبني ونحصّن وندرّب فريقك لإدارة أسطولك الرقمي المستقل.',NULL);
