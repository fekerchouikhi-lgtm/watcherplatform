// Watcher IA — theme toggle, mobile nav, service pre-select, registration form
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
        msg.textContent = '…';
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
