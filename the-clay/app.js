/* ============================================================
   doss.me — the-clay edition v3
   SPATIAL. LAYERED. BOLD. PRODUCT-FEEL.
   ============================================================ */

(function () {
  'use strict';

  // ---- Theme Management (dark default) ----
  const THEME_KEY = 'doss-theme';
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return 'dark';
  }
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply immediately
  const initialTheme = getPreferredTheme();
  if (initialTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', () => {
    initPageEntrance();
    initThemeToggle();
    initMobileNav();
    initScrollAnimations();
    initScrollProgress();
    initNavScroll();
    initCursorGlow();
    initMagneticButtons();
    initCardTilt();
    initCounterAnimation();
    initPageTransitions();
    initHeroQuotes();
    initEasterEggs();
  });

  // ---- Page Entrance ----
  function initPageEntrance() {
    document.body.classList.add('page-enter');
    setTimeout(() => document.body.classList.remove('page-enter'), 1500);
  }

  // ---- Theme Toggle ----
  function initThemeToggle() {
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        setTheme(next);
        toggle.style.transform = 'rotate(180deg) scale(0.8)';
        setTimeout(() => { toggle.style.transform = ''; }, 300);
      });
    });
  }

  // ---- Mobile Nav ----
  function initMobileNav() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const menu = document.querySelector('.nav-mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('active');
      toggle.classList.toggle('active');
      if (isOpen) {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        menu.style.display = 'flex';
        requestAnimationFrame(() => menu.classList.add('open'));
        document.body.style.overflow = 'hidden';
      }
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Animations with stagger ----
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  // ---- Scroll Progress ----
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Nav Show/Hide ----
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let lastY = 0, ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > 120 && y > lastY + 5) nav.classList.add('nav-hidden');
          else if (y < lastY - 5 || y < 120) nav.classList.remove('nav-hidden');
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Cursor Glow ----
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let timer;
    document.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-active');
      document.body.style.setProperty('--cursor-x', e.clientX + 'px');
      document.body.style.setProperty('--cursor-y', e.clientY + 'px');
      clearTimeout(timer);
      timer = setTimeout(() => document.body.classList.remove('cursor-active'), 3000);
    });
  }

  // ---- Magnetic Buttons ----
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.btn').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // ---- Card Tilt ----
  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.card-tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(800px) rotateX(${(y-0.5)*-8}deg) rotateY(${(x-0.5)*8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  // ---- Counter Animation ----
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const dur = target > 100 ? 2000 : 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(eased * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- Page Transitions ----
  function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
      if (link.hostname !== window.location.hostname) return;
      if ((link.getAttribute('href') || '').startsWith('#')) return;
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === window.location.pathname) return;
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => { window.location.href = href; }, 250);
      });
    });
  }

  // ---- Hero Quote Rotation ----
  function initHeroQuotes() {
    const el = document.querySelector('[data-hero-quote]');
    if (!el) return;

    const quotes = [
      "I'm the artist, AI is the clay.",
      "GREAT. Not fine. Never fine.",
      "47 open tabs is not chaos. It's cartography.",
      "Systems thinking is my native language.",
      "If you can automate it, you should.",
      "Building in public means you see the messy parts.",
      "The vision is mine. The execution is a collaboration.",
      "Cynicism is easy. Optimism takes effort. I choose the effort."
    ];

    let current = 0;
    let interval;

    function cycle() {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        current = (current + 1) % quotes.length;
        el.textContent = quotes[current];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 350);
    }

    interval = setInterval(cycle, 5500);

    el.addEventListener('click', () => {
      clearInterval(interval);
      cycle();
      interval = setInterval(cycle, 5500);
    });
  }

  // ---- Easter Eggs ----
  function initEasterEggs() {
    // Konami code
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    document.addEventListener('keydown', (e) => {
      if (e.key === code[idx]) {
        idx++;
        if (idx === code.length) {
          idx = 0;
          showRetroOverlay();
        }
      } else { idx = 0; }
    });

    // Logo 5-click
    let clicks = 0, clickTimer;
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        clicks++;
        clearTimeout(clickTimer);
        if (clicks >= 5) {
          e.preventDefault();
          clicks = 0;
          showToast();
        }
        clickTimer = setTimeout(() => { clicks = 0; }, 1500);
      });
    }
  }

  function showRetroOverlay() {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#000;color:#0f0;font-family:"JetBrains Mono","Courier New",monospace;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:1.1rem;cursor:pointer;animation:fadeIn .5s ease-out;';
    d.innerHTML = '<pre style="color:#0f0;text-align:center;line-height:1.6">\n  ╔═══════════════════════════════════╗\n  ║   KONAMI CODE ACCEPTED           ║\n  ║                                  ║\n  ║   > 80s kid detected             ║\n  ║   > Loading Atari 2600...        ║\n  ║   > Just kidding.                ║\n  ║   > But you knew the code.       ║\n  ║   > That makes us friends.       ║\n  ║                                  ║\n  ║   [CLICK TO RETURN]              ║\n  ╚═══════════════════════════════════╝\n</pre>';
    d.addEventListener('click', () => d.remove());
    document.body.appendChild(d);
  }

  function showToast() {
    const msgs = [
      "You found the secret. There is no secret. Just curiosity.",
      "5 clicks on a logo? You're either testing or bored. Either way, respect.",
      "Fun fact: This folder is called 'the-clay.' I'm the artist. Get it?",
      "GREAT. (Not fine. GREAT.)",
      "This site was built by AI, directed by a human. You're reading the evidence."
    ];
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);background:var(--color-surface);color:var(--color-text);padding:1rem 1.5rem;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.3);border:1px solid var(--color-accent);font-size:.9rem;max-width:400px;text-align:center;z-index:99999;opacity:0;transition:opacity .3s ease,transform .3s cubic-bezier(.34,1.56,.64,1);';
    t.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => t.remove(), 300);
    }, 4000);
  }

})();
