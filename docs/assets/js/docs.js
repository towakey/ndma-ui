(function () {
  function getCurrentTheme() {
    return document.documentElement.dataset.theme || 'default';
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('ndma-ui-theme', theme);
    } catch (e) {
    }

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'nightvision' ? 'true' : 'false');
      toggle.textContent = theme === 'nightvision' ? 'Default' : 'Nightvision';
    }
  }

  function initThemeToggle() {
    var saved = null;
    try {
      saved = localStorage.getItem('ndma-ui-theme');
    } catch (e) {
    }

    if (saved === 'default' || saved === 'nightvision') {
      setTheme(saved);
    } else {
      if (!document.documentElement.dataset.theme) {
        setTheme('default');
      } else {
        setTheme(getCurrentTheme());
      }
    }

    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var next = getCurrentTheme() === 'default' ? 'nightvision' : 'default';
      setTheme(next);
    });
  }

  function initSidebarToggle() {
    var sidebar = document.getElementById('docsSidebar');
    var btn = document.getElementById('sidebarToggle');

    if (!sidebar || !btn) return;

    btn.addEventListener('click', function () {
      sidebar.classList.toggle('docs-sidebar--open');
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth > 768) return;
      if (!sidebar.classList.contains('docs-sidebar--open')) return;
      if (sidebar.contains(e.target) || btn.contains(e.target)) return;
      sidebar.classList.remove('docs-sidebar--open');
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('docs-sidebar--open');
      }
    });
  }

  function initActiveNav() {
    var links = document.querySelectorAll('.docs-nav__link');
    if (!links.length) return;

    var currentPath = window.location.pathname;
    if (currentPath && currentPath.charAt(currentPath.length - 1) === '/') {
      currentPath = currentPath + 'index.html';
    }

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (!href) continue;
      if (href.indexOf('#') === 0) continue;

      var url = null;
      try {
        url = new URL(href, window.location.href);
      } catch (e) {
        continue;
      }

      var linkPath = url.pathname;
      if (linkPath && linkPath.charAt(linkPath.length - 1) === '/') {
        linkPath = linkPath + 'index.html';
      }

      if (linkPath === currentPath) {
        links[i].classList.add('active');
        continue;
      }

      if (currentPath.indexOf('/components/') !== -1 && linkPath.slice(-14) === 'components.html') {
        links[i].classList.add('active');
        continue;
      }

      if (currentPath.indexOf('/themes/') !== -1 && linkPath.slice(-10) === 'themes.html') {
        links[i].classList.add('active');
        continue;
      }

      if (currentPath.indexOf('/examples/') !== -1 && linkPath.slice(-12) === 'examples.html') {
        links[i].classList.add('active');
        continue;
      }
    }
  }

  function initCopyButtons() {
    var buttons = document.querySelectorAll('[data-copy-target]');
    if (!buttons.length) return;

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var selector = this.getAttribute('data-copy-target');
        if (!selector) return;
        var el = document.querySelector(selector);
        if (!el) return;

        var text = el.textContent;
        if (!navigator.clipboard || !navigator.clipboard.writeText) return;

        navigator.clipboard.writeText(text).then(function () {
        }).catch(function () {
        });
      });
    }
  }

  window.copyCode = function (button) {
    if (!button || !button.parentElement) return;
    var codeBlock = button.parentElement.querySelector('pre');
    if (!codeBlock) return;
    var text = codeBlock.textContent;

    if (!navigator.clipboard || !navigator.clipboard.writeText) return;

    navigator.clipboard.writeText(text).then(function () {
      var originalText = button.textContent;
      button.textContent = 'コピーしました！';
      button.classList.add('copied');

      window.setTimeout(function () {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(function () {
    });
  };

  window.toggleSidebar = function () {
    var sidebar = document.getElementById('docsSidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('docs-sidebar--open');
  };

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initSidebarToggle();
    initActiveNav();
    initCopyButtons();
  });
})();
