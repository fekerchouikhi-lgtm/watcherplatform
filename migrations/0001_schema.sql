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

-- Seed: 3 flagship research notes x 3 languages
INSERT OR IGNORE INTO posts (slug, lang, title, excerpt, body, cover) VALUES
('watcher-claw-autonomous-mastery','en','Watcher Claw: From Manual Execution to Autonomous Mastery','How a learning AI agent turns manual execution into operational ROI.','Watcher Claw transitions manual execution into autonomous mastery for operational ROI. Deploy agents that observe, learn your workflows, and execute with guardrails — measured by outcome, not clicks.',NULL),
('stop-managing-tools','en','Stop Managing Tools: Reduce Friction with True AI Agency','Why hire more staff when your software can learn?','Why hire more staff when your software can learn? Reduce friction with true AI agency: multi-agent systems, MCP integration, and RAG architecture wired into your SOPs.',NULL),
('autonomous-workforce-agi-ready','en','The Autonomous Workforce: AGI-Ready Operations','Transition to outcome-based automation and lead the region.','Transition to AGI-ready operations and lead the region with outcome-based automation. Start with one administrative, accounting, or dev pipeline — scale without overhead.',NULL),

('watcher-claw-autonomous-mastery','fr','Watcher Claw : De l''exécution manuelle à la maîtrise autonome','Comment un agent IA apprenant transforme l''exécution manuelle en ROI opérationnel.','Watcher Claw fait passer l''exécution manuelle à la maîtrise autonome pour un ROI opérationnel. Déployez des agents qui observent, apprennent vos processus et exécutent avec des garde-fous — mesurés au résultat, pas au clic.',NULL),
('stop-managing-tools','fr','Cessez de gérer des outils : réduisez la friction avec une vraie agence IA','Pourquoi embaucher quand votre logiciel peut apprendre ?','Pourquoi embaucher quand votre logiciel peut apprendre ? Réduisez la friction avec une vraie agence IA : systèmes multi-agents, intégration MCP et architecture RAG connectés à vos SOP.',NULL),
('autonomous-workforce-agi-ready','fr','Workforce autonome : des opérations prêtes pour l''AGI','Passez à l''automatisation orientée résultats et menez la région.','Passez à des opérations prêtes pour l''AGI et menez la région grâce à l''automatisation orientée résultats. Commencez par un pipeline administratif, comptable ou dev — scalez sans overhead.',NULL),

('watcher-claw-autonomous-mastery','ar','واتشر كلو: من التنفيذ اليدوي إلى الإتقان الذاتي','كيف يحوّل وكيل ذكاء اصطناعي متعلّم التنفيذ اليدوي إلى عائد تشغيلي.','يحوّل Watcher Claw التنفيذ اليدوي إلى إتقان ذاتي من أجل عائد تشغيلي. انشر وكلاء يراقبون عملياتك ويتعلمونها وينفذونها بضوابط — ويُقاسون بالنتيجة لا بالنقرات.',NULL),
('stop-managing-tools','ar','توقف عن إدارة الأدوات: قلّل الاحتكاك بوكالة ذكاء حقيقية','لماذا توظف المزيد بينما يمكن لبرمجياتك أن تتعلم؟','لماذا توظف المزيد من الموظفين بينما يمكن لبرمجياتك أن تتعلم؟ قلّل الاحتكاك بوكالة ذكاء اصطناعي حقيقية: أنظمة متعددة الوكلاء وتكامل MCP وبنية RAG مرتبطة بإجراءاتك.',NULL),
('autonomous-workforce-agi-ready','ar','القوى العاملة الذاتية: عمليات جاهزة لعصر AGI','انتقل إلى أتمتة قائمة على النتائج وقُد المنطقة.','انتقل إلى عمليات جاهزة لعصر AGI وقُد المنطقة بأتمتة قائمة على النتائج. ابدأ بخط إداري أو محاسبي أو تطويري واحد — وتوسّع دون أعباء إضافية.',NULL);
