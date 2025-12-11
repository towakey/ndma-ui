// ndma-ui Documentation JavaScript

// Theme switcher functionality
function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.ndma-theme-switcher__btn');
  const htmlElement = document.documentElement;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('ndma-ui-theme') || 'default';
  htmlElement.className = `ndma-theme-${savedTheme}`;
  
  // Update active button
  themeButtons.forEach(btn => {
    btn.classList.toggle('ndma-theme-switcher__btn--active', btn.dataset.theme === savedTheme);
  });
  
  // Add click handlers
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      htmlElement.className = `ndma-theme-${theme}`;
      localStorage.setItem('ndma-ui-theme', theme);
      
      // Update active button
      themeButtons.forEach(b => b.classList.remove('ndma-theme-switcher__btn--active'));
      btn.classList.add('ndma-theme-switcher__btn--active');
    });
  });
}

// Copy code functionality
function copyCode(button) {
  const codeBlock = button.parentElement.querySelector('pre');
  const text = codeBlock.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'コピーしました！';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('コピーに失敗しました:', err);
  });
}

// Mobile sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('docsSidebar');
  sidebar.classList.toggle('docs-sidebar--open');
}

// Close sidebar when clicking outside on mobile
function initMobileSidebar() {
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('docsSidebar');
    const menuBtn = document.querySelector('.docs-mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuBtn.contains(e.target) &&
        sidebar.classList.contains('docs-sidebar--open')) {
      sidebar.classList.remove('docs-sidebar--open');
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileSidebar();
  initSmoothScroll();
});

// Handle window resize
window.addEventListener('resize', () => {
  const sidebar = document.getElementById('docsSidebar');
  if (window.innerWidth > 768) {
    sidebar.classList.remove('docs-sidebar--open');
  }
});

// Table of contents generation (for component pages)
function generateTableOfContents() {
  const content = document.querySelector('.docs-content');
  const headings = content.querySelectorAll('h2, h3, h4');
  const tocContainer = document.getElementById('tableOfContents');
  
  if (!tocContainer || headings.length === 0) return;
  
  const toc = document.createElement('ul');
  toc.className = 'docs-nav__list';
  
  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't exist
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const li = document.createElement('li');
    li.className = 'docs-nav__item';
    
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.className = 'docs-nav__link';
    a.textContent = heading.textContent;
    
    // Add indentation based on heading level
    if (heading.tagName === 'H3') {
      a.style.paddingLeft = '2rem';
    } else if (heading.tagName === 'H4') {
      a.style.paddingLeft = '2.5rem';
    }
    
    li.appendChild(a);
    toc.appendChild(li);
  });
  
  tocContainer.appendChild(toc);
}

// Live demo functionality
function initLiveDemos() {
  const demoContainers = document.querySelectorAll('.docs-live-demo');
  
  demoContainers.forEach(container => {
    const codeInput = container.querySelector('.docs-code-input');
    const demoOutput = container.querySelector('.docs-demo-output');
    const updateBtn = container.querySelector('.docs-update-demo');
    
    if (codeInput && demoOutput && updateBtn) {
      updateBtn.addEventListener('click', () => {
        const code = codeInput.value;
        demoOutput.innerHTML = code;
      });
      
      // Auto-update on input (with debounce)
      let timeout;
      codeInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          demoOutput.innerHTML = codeInput.value;
        }, 500);
      });
    }
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for quick theme switch
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const themeButtons = document.querySelectorAll('.ndma-theme-switcher__btn');
    const activeBtn = document.querySelector('.ndma-theme-switcher__btn--active');
    const currentIndex = Array.from(themeButtons).indexOf(activeBtn);
    const nextIndex = (currentIndex + 1) % themeButtons.length;
    themeButtons[nextIndex].click();
  }
  
  // Escape to close mobile sidebar
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('docsSidebar');
    sidebar.classList.remove('docs-sidebar--open');
  }
});
