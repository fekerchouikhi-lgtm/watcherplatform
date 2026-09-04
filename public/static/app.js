// Watcher IA — theme toggle, mobile nav, service pre-select, registration form, AI chat SSE
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  function syncIcon() {
    if (!btn) return;
    btn.textContent = root.classList.contains('dark') ? '🌙' : '☀️';
  }
  syncIcon();
  if (btn) {
    btn.addEventListener('click', function () {
      root.classList.toggle('dark');
      try {
        localStorage.setItem('watcher-theme', root.classList.contains('dark') ? 'dark' : 'light');
      } catch (e) {}
      syncIcon();
    });
  }

  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Pre-select service when clicking a service card CTA
  document.querySelectorAll('.svc-cta').forEach(function (a) {
    a.addEventListener('click', function () {
      var key = a.getAttribute('data-service');
      var sel = document.querySelector('select[name="service_request"]');
      if (key && sel) sel.value = key;
    });
  });

  // AI Sales Agent Chat (SSE stream simulation)
  var chatForm = document.getElementById('chatForm');
  var chatHistory = document.getElementById('chatHistory');
  var chatInput = document.getElementById('chatInput');
  if (chatForm && chatHistory && chatInput) {
    chatForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var q = chatInput.value.trim();
      if (!q) return;
      var lang = chatForm.getAttribute('data-lang') || 'en';

      // Append user message
      var userDiv = document.createElement('div');
      userDiv.className = 'rounded-2xl bg-watcher-navy p-4 text-white ml-auto max-w-[80%]';
      userDiv.innerHTML = '<p class="text-[10px] uppercase font-bold tracking-widest text-watcher-cyan">User</p><p class="mt-1">' + q.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';
      chatHistory.appendChild(userDiv);
      chatInput.value = '';
      chatHistory.scrollTop = chatHistory.scrollHeight;

      // Append bot thinking bubble
      var botDiv = document.createElement('div');
      botDiv.className = 'rounded-2xl bg-white p-4 border border-slate-200 dark:bg-white/5 dark:border-white/10 max-w-[80%]';
      botDiv.innerHTML = '<p class="text-[10px] uppercase font-bold tracking-widest text-watcher-cyan">Watcher AI Sales Agent</p><p class="mt-1 text-slate-400 italic">Thinking...</p>';
      chatHistory.appendChild(botDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;

      // Fetch SSE endpoint
      fetch('/api/chat/' + lang + '?q=' + encodeURIComponent(q))
        .then(function (res) {
          if (!res.body) throw new Error('No body');
          var reader = res.body.getReader();
          var decoder = new TextDecoder();
          var buffer = '';

          function readStream() {
            reader.read().then(function (result) {
              if (result.done) return;
              buffer += decoder.decode(result.value, { stream: true });
              var lines = buffer.split('\n\n');
              buffer = lines.pop() || '';

              lines.forEach(function (line) {
                if (line.startsWith('data: ')) {
                  try {
                    var data = JSON.parse(line.slice(6));
                    if (data.status === 'reasoning' || data.status === 'retrieving') {
                      botDiv.querySelector('p.italic').textContent = data.message;
                    } else if (data.status === 'complete') {
                      botDiv.querySelector('p.italic').className = 'mt-1 text-slate-800 dark:text-slate-200';
                      botDiv.querySelector('p').textContent = data.reply;
                    }
                  } catch (e) {}
                }
              });
              readStream();
            });
          }
          readStream();
        })
        .catch(function () {
          botDiv.querySelector('p.italic').textContent = 'Error connecting to Watcher AI kernel.';
        });
    });
  }

  // Registration form -> POST /:lang/register
  var form = document.getElementById('regForm');
  if (form) {
    var msg = document.getElementById('regMsg');
    form.addEventListener('submit', async function (ev) {
      ev.preventDefault();
      if (msg) {
        msg.classList.remove('hidden');
        msg.style.background = '#eef2ff';
        msg.style.color = '#0A0A40';
        msg.textContent = 'Transmitting registration and syncing orchestration pipeline...';
      }
      var lang = form.getAttribute('data-lang') || 'en';
      var fd = new FormData(form);
      var payload = Object.fromEntries(fd.entries());
      try {
        var res = await fetch('/' + lang + '/register', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        var json = await res.json();
        if (json.ok) {
          if (msg) {
            msg.style.background = '#dcfce7';
            msg.style.color = '#14532d';
            msg.textContent = json.message || 'OK';
          }
          form.reset();
        } else {
          if (msg) {
            msg.style.background = '#fee2e2';
            msg.style.color = '#7f1d1d';
            msg.textContent = 'Error: ' + (json.error || res.status);
          }
        }
      } catch (e) {
        if (msg) {
          msg.style.background = '#fee2e2';
          msg.style.color = '#7f1d1d';
          msg.textContent = 'Network error. Retry.';
        }
      }
    });
  }
})();
