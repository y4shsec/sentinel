/**
 * =====================================================
 *  SENTINEL PORTFOLIO — MAIN JAVASCRIPT
 *  assets/js/main.js
 *  Author: Yashdeep Sankhla (Sentinel)
 * =====================================================
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
   *  1. PRELOADER BOOT SEQUENCE
   * ───────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');

  if (preloader) {
    // Boot message cycling (visual only — CSS handles actual hide)
    const bootMessages = [
      'LOADING KERNEL MODULES...',
      'MOUNTING ENCRYPTED FILESYSTEM...',
      'ESTABLISHING SECURE CONNECTION...',
      'INITIALIZING THREAT DATABASE...',
      'CALIBRATING SENSORS...',
      'SYSTEM READY.'
    ];
    const bootMsg = document.getElementById('boot-msg');
    let bIdx = 0;
    const bootInterval = setInterval(() => {
      bIdx++;
      if (bootMsg && bIdx < bootMessages.length) bootMsg.textContent = bootMessages[bIdx];
      if (bIdx >= bootMessages.length - 1) clearInterval(bootInterval);
    }, 380);

    // JS-side hide as extra safety on top of CSS animation
    // CSS animation already hides at 3.2s — this is just a backup
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      preloader.style.display = 'none';
    }, 3400);
  }

  /* ─────────────────────────────────────────────────
   *  2. MATRIX RAIN CANVAS
   * ───────────────────────────────────────────────── */
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソABCDEF!@#$%^&*<>/\\|{}[]?';
    const fontSize = 12;
    let cols, drops;

    function resizeMatrix() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    }

    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(2,4,8,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = drops[i] * fontSize > canvas.height * 0.75
          ? 0.2 + Math.random() * 0.15
          : 0.25 + Math.random() * 0.45;
        ctx.fillStyle = `rgba(0,255,65,${alpha})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 55);
  }

  /* ─────────────────────────────────────────────────
   *  3. LIVE NAV CLOCK
   * ───────────────────────────────────────────────── */
  const clockEl = document.getElementById('nav-clock');
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      clockEl.textContent = now.toTimeString().substring(0, 8);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ─────────────────────────────────────────────────
   *  4. MOBILE NAV TOGGLE
   * ───────────────────────────────────────────────── */
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navUl = document.querySelector('.navmenu ul');

  if (mobileToggle && navUl) {
    mobileToggle.addEventListener('click', () => {
      navUl.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('bi-x');
      mobileToggle.classList.toggle('bi-list');
    });

    // Close on nav link click
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('mobile-open');
        mobileToggle.classList.remove('bi-x');
        mobileToggle.classList.add('bi-list');
      });
    });
  }

  /* ─────────────────────────────────────────────────
   *  5. ACTIVE NAV ON SCROLL
   * ───────────────────────────────────────────────── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 80;
    let currentId = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    });

    document.querySelectorAll('.navmenu a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + currentId) a.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ─────────────────────────────────────────────────
   *  6. SCROLL-TO-TOP BUTTON
   * ───────────────────────────────────────────────── */
  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('active', window.scrollY > 400);
    }, { passive: true });

    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────────
   *  7. SMOOTH SCROLL FOR ANCHOR LINKS
   * ───────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────────────────────
   *  8. HERO TYPING ANIMATION
   * ───────────────────────────────────────────────── */
  const typedEl = document.getElementById('typed-hero');
  if (typedEl) {
    // Use Typed.js if available, else custom implementation
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-hero', {
        strings: [
          'Cybersecurity Analyst',
          'VAPT Analyst',
          'Bug Bounty Learner',
          'CTF Player',
          'SOC Analyst'
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '█'
      });
    } else {
      // Fallback custom typist
      const roles = ['Cybersecurity Analyst', 'VAPT Analyst', 'Bug Bounty Learner', 'CTF Player', 'SOC Analyst'];
      let rIdx = 0, cIdx = 0, deleting = false;

      function typeStep() {
        const cur = roles[rIdx];
        const text = deleting ? cur.substring(0, cIdx--) : cur.substring(0, cIdx++);
        typedEl.textContent = text;

        if (!deleting && cIdx > cur.length) {
          setTimeout(() => { deleting = true; typeStep(); }, 2000);
          return;
        }
        if (deleting && cIdx < 0) {
          deleting = false; cIdx = 0;
          rIdx = (rIdx + 1) % roles.length;
        }
        setTimeout(typeStep, deleting ? 38 : 75);
      }

      setTimeout(typeStep, 2600);
    }
  }

  /* ─────────────────────────────────────────────────
   *  9. SKILL BAR ANIMATION (IntersectionObserver)
   * ───────────────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.progress-bar');
  if (skillBars.length) {
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const val = bar.getAttribute('aria-valuenow');
          if (val) bar.style.width = val + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.25 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  /* ─────────────────────────────────────────────────
   *  10. FADE-IN ON SCROLL (IntersectionObserver)
   * ───────────────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in, [data-aos]');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('aos-animate');
        }
      });
    }, { threshold: 0.08 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* ─────────────────────────────────────────────────
   *  11. PORTFOLIO ISOTOPE FILTER (with isotope.js or fallback)
   * ───────────────────────────────────────────────── */
  function initPortfolioFilter() {
    const filtersContainer = document.querySelector('.portfolio-filters');
    const grid = document.querySelector('.isotope-container');

    if (!filtersContainer || !grid) return;

    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      imagesLoaded(grid, () => {
        const iso = new Isotope(grid, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry'
        });

        filtersContainer.querySelectorAll('li').forEach(btn => {
          btn.addEventListener('click', () => {
            filtersContainer.querySelector('.filter-active')?.classList.remove('filter-active');
            btn.classList.add('filter-active');
            iso.arrange({ filter: btn.dataset.filter === '*' ? '*' : '.' + btn.dataset.filter });
          });
        });
      });
    } else {
      // Fallback JS filter
      filtersContainer.querySelectorAll('li').forEach(btn => {
        btn.addEventListener('click', () => {
          filtersContainer.querySelector('.filter-active')?.classList.remove('filter-active');
          btn.classList.add('filter-active');

          const filter = btn.dataset.filter;
          grid.querySelectorAll('.isotope-item').forEach(item => {
            if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }

  initPortfolioFilter();

  /* ─────────────────────────────────────────────────
   *  12. GLIGHTBOX INIT
   * ───────────────────────────────────────────────── */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /* ─────────────────────────────────────────────────
   *  13. SWIPER INIT (portfolio detail sliders)
   * ───────────────────────────────────────────────── */
  function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.init-swiper').forEach(el => {
      const configEl = el.querySelector('.swiper-config');
      let config = {};
      try {
        if (configEl) config = JSON.parse(configEl.textContent.trim());
      } catch (e) {
        console.warn('Swiper config parse error', e);
      }
      new Swiper(el, config);
    });
  }

  initSwipers();

  /* ─────────────────────────────────────────────────
   *  14. AOS INIT (if AOS loaded)
   * ───────────────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 80
    });
  }

  /* ─────────────────────────────────────────────────
   *  15. PURECOUNTER (stats counter)
   * ───────────────────────────────────────────────── */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /* ─────────────────────────────────────────────────
   *  16. WAYPOINTS (skill bar trigger fallback)
   * ───────────────────────────────────────────────── */
  const skillsSection = document.querySelector('.skills-animation');
  if (skillsSection && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skillsSection,
      handler: function () {
        document.querySelectorAll('.progress-bar').forEach(bar => {
          const val = bar.getAttribute('aria-valuenow');
          if (val) bar.style.width = val + '%';
        });
      },
      offset: '80%'
    });
  }

  /* ─────────────────────────────────────────────────
   *  17. CUSTOM SELECT DROPDOWN
   * ───────────────────────────────────────────────── */
  document.querySelectorAll('.custom-select').forEach(select => {
    const selected = select.querySelector('.select-selected');
    const items = select.querySelector('.select-items');

    if (!selected || !items) return;

    selected.addEventListener('click', () => {
      items.classList.toggle('select-hide');
      selected.classList.toggle('active');
    });

    items.querySelectorAll('div').forEach(option => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        items.classList.add('select-hide');
        selected.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!select.contains(e.target)) {
        items.classList.add('select-hide');
        selected.classList.remove('active');
      }
    });
  });

  /* ─────────────────────────────────────────────────
   *  18. GLITCH TEXT EFFECT (title decoration)
   *      Clones text into ::before / ::after via data-text
   * ───────────────────────────────────────────────── */
  document.querySelectorAll('.glitch-title').forEach(el => {
    el.setAttribute('data-text', el.textContent);
  });

  /* ─────────────────────────────────────────────────
   *  19. DECRYPT TEXT EFFECT on hover (opt-in via .decrypt-hover)
   * ───────────────────────────────────────────────── */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

  document.querySelectorAll('.decrypt-hover').forEach(el => {
    const original = el.textContent;
    let interval;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        el.textContent = original.split('').map((char, idx) => {
          if (idx < iteration) return original[idx];
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        if (iteration >= original.length) clearInterval(interval);
        iteration += 0.5;
      }, 30);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.textContent = original;
    });
  });

  /* ─────────────────────────────────────────────────
   *  20. HEADER SCROLL EFFECT
   * ───────────────────────────────────────────────── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,255,65,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────
   *  21. CONTACT FORM VALIDATION (web3forms)
   *      The form posts to web3forms API natively.
   *      This just adds UX feedback.
   * ───────────────────────────────────────────────── */
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    // Already handled by web3forms + redirect to thankyou.html
    // Optional: add loading state
    contactForm.addEventListener('submit', () => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'TRANSMITTING...';
        btn.disabled = true;
      }
    });
  }

  /* ─────────────────────────────────────────────────
   *  22. RADAR BLIP POSITIONS (random spawn on radar)
   * ───────────────────────────────────────────────── */
  // Handled via SVG in HTML with CSS animations

  /* ─────────────────────────────────────────────────
   *  23. TOOL IMAGES — zoom on hover fallback
   * ───────────────────────────────────────────────── */
  document.querySelectorAll('.portfolio-item.isotope-item img').forEach(img => {
    img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.5)'; });
    img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
  });

})();