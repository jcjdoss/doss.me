/* ============================================================
   doss.me — the-clay edition
   Interactive magic. Premium feel. Every pixel earns its place.
   ============================================================ */

(function () {
  'use strict';

  // ---- Theme Management ----
  const THEME_KEY = 'doss-theme';
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }
  setTheme(getPreferredTheme());

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
    initMarquee();
    initGreeting();
    initEasterEggs();
  });

  // ---- Page Entrance Animation ----
  function initPageEntrance() {
    document.body.classList.add('page-enter');
    setTimeout(() => {
      document.body.classList.remove('page-enter');
    }, 1500);
  }

  // ---- Theme Toggle ----
  function initThemeToggle() {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        // Add a little rotation animation
        toggle.style.transform = 'rotate(180deg) scale(0.8)';
        setTimeout(() => {
          toggle.style.transform = '';
        }, 300);
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
        requestAnimationFrame(() => {
          menu.classList.add('open');
        });
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll-Triggered Animations ----
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children if they have delay classes
          const children = entry.target.querySelectorAll('.stagger-child');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80 + 100}ms`;
            child.classList.add('visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ---- Scroll Progress Bar ----
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const progress = height > 0 ? (scrolled / height) * 100 : 0;
          bar.style.width = progress + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Nav Show/Hide on Scroll ----
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 120 && currentScrollY > lastScrollY + 5) {
            nav.classList.add('nav-hidden');
          } else if (currentScrollY < lastScrollY - 5 || currentScrollY < 120) {
            nav.classList.remove('nav-hidden');
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Cursor Glow Effect ----
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices
    let mouseTimer;
    document.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-active');
      document.body.style.setProperty('--cursor-x', e.clientX + 'px');
      document.body.style.setProperty('--cursor-y', e.clientY + 'px');
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        document.body.classList.remove('cursor-active');
      }, 3000);
    });
  }

  // ---- Magnetic Button Effect ----
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.btn, .card-interactive').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ---- Card Tilt Effect ----
  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.card-tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -8;
        const tiltY = (x - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
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
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ---- Page Transitions ----
  function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
      if (link.hostname !== window.location.hostname) return;
      if (link.getAttribute('href').startsWith('#')) return;
      if (link.hasAttribute('data-no-transition')) return;

      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => {
          window.location.href = href;
        }, 280);
      });
    });
  }

  // ---- Marquee Duplication ----
  function initMarquee() {
    document.querySelectorAll('.marquee').forEach(marquee => {
      // Clone content for seamless loop
      const content = marquee.innerHTML;
      marquee.innerHTML = content + content;
    });
  }

  // ---- Time-Based Greeting ----
  function initGreeting() {
    const el = document.querySelector('[data-greeting]');
    if (!el) return;
    const hour = new Date().getHours();
    let greeting;
    if (hour < 5) greeting = "You're up late. I like that.";
    else if (hour < 12) greeting = "Good morning. Coffee first, then scroll.";
    else if (hour < 17) greeting = "Good afternoon. Let's skip the small talk.";
    else if (hour < 21) greeting = "Good evening. Grab a seat.";
    else greeting = "Night owl? Same.";
    el.textContent = greeting;
  }

  // ---- Easter Eggs ----
  function initEasterEggs() {
    // Konami code
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;
          activateRetroMode();
        }
      } else {
        konamiIndex = 0;
      }
    });

    // Click the logo 5 times
    let logoClicks = 0;
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        logoClicks++;
        if (logoClicks >= 5) {
          e.preventDefault();
          logoClicks = 0;
          showEasterEggMessage();
        }
      });
    }
  }

  function activateRetroMode() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: #000; color: #0f0;
      font-family: 'Courier New', monospace;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; font-size: 1.2rem;
      animation: fadeIn 0.5s ease-out;
      cursor: pointer;
    `;
    overlay.innerHTML = `
      <pre style="color: #0f0; text-align: center; line-height: 1.5;">
  ╔══════════════════════════════════╗
  ║   KONAMI CODE ACCEPTED          ║
  ║                                 ║
  ║   > 80s kid detected            ║
  ║   > Loading Atari 2600...       ║
  ║   > Just kidding.               ║
  ║   > But you knew the code.      ║
  ║   > That makes us friends.      ║
  ║                                 ║
  ║   [CLICK TO RETURN]             ║
  ╚══════════════════════════════════╝
      </pre>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }

  function showEasterEggMessage() {
    const messages = [
      "You found the secret. There is no secret. Just curiosity.",
      "5 clicks on a logo? You're either testing something or bored. Either way, respect.",
      "This site was built with Claude. You're reading JavaScript written by AI, reviewed by a human. Wild times.",
      "Fun fact: The folder this lives in is called 'the-clay.' Because J is the artist. Get it?",
      "GREAT. (Not fine. GREAT.)"
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      background: var(--color-surface); color: var(--color-text);
      padding: 1rem 1.5rem; border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      border: 1px solid var(--color-border-strong);
      font-size: 0.9rem; max-width: 400px; text-align: center;
      z-index: 99999; opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

})();
