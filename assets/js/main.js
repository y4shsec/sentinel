/**
 * SENTINEL PORTFOLIO — main.js
<<<<<<< HEAD
 * Cyberpunk Hacker Dashboard
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     1. PRELOADER
  ═══════════════════════════════════════════ */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var bootMsgs = [
      'INITIALIZING SECURE ENVIRONMENT...',
      'LOADING KERNEL MODULES...',
      'MOUNTING ENCRYPTED FILESYSTEM...',
      'ESTABLISHING SECURE CONNECTION...',
      'CALIBRATING THREAT DETECTION...',
      'SYSTEM READY. WELCOME, SENTINEL.'
    ];
    var msgEl = document.getElementById('boot-msg');
    var mi = 0;
    var bootInterval = setInterval(function () {
      mi++;
      if (msgEl && mi < bootMsgs.length) msgEl.textContent = bootMsgs[mi];
      if (mi >= bootMsgs.length - 1) clearInterval(bootInterval);
    }, 450);

    function hidePreloader() {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(function () { preloader.style.display = 'none'; }, 600);
    }
    // Hard timeout — never stays stuck
    setTimeout(hidePreloader, 3000);
    window.addEventListener('load', function () { setTimeout(hidePreloader, 200); });
  }

  /* ═══════════════════════════════════════════
     2. MATRIX RAIN
  ═══════════════════════════════════════════ */
  var canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var chars = '01アイウエオカキクケABCDEF!@#$%^&*<>/|{}[]?+=~01';
    var fSize = 13;
    var drops = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var cols = Math.floor(canvas.width / fSize);
      drops = [];
      for (var i = 0; i < cols; i++) {
        drops[i] = Math.random() * -100;
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    setInterval(function () {
      ctx.fillStyle = 'rgba(2,4,8,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fSize + 'px "Share Tech Mono", monospace';
      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        var alpha = 0.1 + Math.random() * 0.45;
        ctx.fillStyle = 'rgba(0,255,65,' + alpha + ')';
        ctx.fillText(ch, i * fSize, drops[i] * fSize);
        if (drops[i] * fSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    }, 50);
  }

  /* ═══════════════════════════════════════════
     3. LIVE CLOCK
  ═══════════════════════════════════════════ */
  var clockEl = document.getElementById('nav-clock');
  if (clockEl) {
    function updateClock() {
      clockEl.textContent = new Date().toTimeString().substring(0, 8);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ═══════════════════════════════════════════
     4. HEADER SCROLL EFFECT
  ═══════════════════════════════════════════ */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════
     5. MOBILE NAV
  ═══════════════════════════════════════════ */
  var mobileBtn = document.getElementById('mobileBtn');
  var mobileOverlay = document.getElementById('mobile-nav-overlay');
  var mobClose = document.getElementById('mobClose');

  function openMob() {
    if (mobileOverlay) mobileOverlay.classList.add('open');
  }
  function closeMob() {
    if (mobileOverlay) mobileOverlay.classList.remove('open');
  }

  // Expose closeMob globally for onclick attributes
  window.closeMob = closeMob;

  if (mobileBtn) mobileBtn.addEventListener('click', openMob);
  if (mobClose) mobClose.addEventListener('click', closeMob);

  // Close on overlay link clicks
  if (mobileOverlay) {
    mobileOverlay.querySelectorAll('.mob-link').forEach(function (a) {
      a.addEventListener('click', closeMob);
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileOverlay.classList.contains('open') &&
        mobileBtn && !mobileBtn.contains(e.target) &&
        !mobileOverlay.contains(e.target)) {
        closeMob();
      }
    });
  }

  /* ═══════════════════════════════════════════
     6. SMOOTH SCROLL (safe)
  ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      try {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          closeMob();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (_) { }
    });
  });

  /* ═══════════════════════════════════════════
     7. ACTIVE NAV SCROLLSPY
  ═══════════════════════════════════════════ */
  function scrollspy() {
    var scrollY = window.scrollY + 120;
    var current = '';
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (scrollY >= s.offsetTop) current = s.id;
    });
    document.querySelectorAll('.navmenu a, .mob-link').forEach(function (a) {
      a.classList.remove('active');
      var href = a.getAttribute('href');
      if (href && href === '#' + current) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', scrollspy, { passive: true });
  window.addEventListener('load', scrollspy);

  /* ═══════════════════════════════════════════
     8. SCROLL TO TOP
  ═══════════════════════════════════════════ */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('active', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function (e) {
=======
 * Clean rebuild — no external dependencies assumed
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. PRELOADER ── */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var msgs = ['LOADING KERNEL MODULES...','MOUNTING ENCRYPTED FILESYSTEM...','ESTABLISHING SECURE CONNECTION...','INITIALIZING THREAT DATABASE...','CALIBRATING SENSORS...','SYSTEM READY.'];
    var bootMsg = document.getElementById('boot-msg');
    var i = 0;
    var iv = setInterval(function () {
      i++;
      if (bootMsg && i < msgs.length) bootMsg.textContent = msgs[i];
      if (i >= msgs.length - 1) clearInterval(iv);
    }, 380);

    function hideLoader() {
      preloader.style.transition = 'opacity 0.6s ease';
      preloader.style.opacity = '0';
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 650);
    }

    // Hide after 3s no matter what
    setTimeout(hideLoader, 3000);
    window.addEventListener('load', function () { setTimeout(hideLoader, 2200); });
  }

  /* ── 2. MATRIX RAIN ── */
  var canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var chars = '01アイウエオカキクABCDEF!@#$%^&*<>/\\|{}[]?';
    var fontSize = 12;
    var drops = [];

    function resizeMatrix() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      var cols = Math.floor(canvas.width / fontSize);
      drops = [];
      for (var c = 0; c < cols; c++) drops.push(1);
    }
    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);

    setInterval(function () {
      ctx.fillStyle = 'rgba(2,4,8,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px "Share Tech Mono", monospace';
      for (var i = 0; i < drops.length; i++) {
        var char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = 'rgba(0,255,65,' + (0.2 + Math.random() * 0.35) + ')';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
  }

  /* ── 3. LIVE CLOCK ── */
  var clockEl = document.getElementById('nav-clock');
  if (clockEl) {
    function tick() { clockEl.textContent = new Date().toTimeString().substring(0, 8); }
    tick();
    setInterval(tick, 1000);
  }

  /* ── 4. MOBILE NAV TOGGLE ── */
  var mBtn    = document.getElementById('mobile-menu-btn');
  var mOverlay= document.getElementById('mobile-nav-overlay');

  var openIcon  = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  function closeMobileNav() {
    if (mOverlay) mOverlay.style.display = 'none';
    if (mBtn) mBtn.innerHTML = openIcon;
  }

  if (mBtn && mOverlay) {
    mBtn.innerHTML = openIcon;

    mBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mOverlay.style.display === 'block';
      mOverlay.style.display = isOpen ? 'none' : 'block';
      mBtn.innerHTML = isOpen ? openIcon : closeIcon;
    });

    // Close when any link clicked
    mOverlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileNav);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mBtn.contains(e.target) && !mOverlay.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  /* ── 5. ACTIVE NAV ON SCROLL ── */
  function updateNav() {
    var scrollY = window.scrollY + 80;
    var current = '';
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (scrollY >= s.offsetTop) current = s.id;
    });
    document.querySelectorAll('.navmenu a').forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ── 6. SCROLL TO TOP ── */
  var scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', function () {
      scrollTop.classList.toggle('active', window.scrollY > 400);
    }, { passive: true });
    scrollTop.addEventListener('click', function (e) {
>>>>>>> 6411371ca64bcf19b3212b48f953644ff09f8cfb
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

<<<<<<< HEAD
  /* ═══════════════════════════════════════════
     9. TYPED.JS
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    var typedEl = document.querySelector('.typed');
    if (typedEl && typeof Typed !== 'undefined') {
      var items = typedEl.getAttribute('data-typed-items');
      if (items) {
        new Typed('.typed', {
          strings: items.split(',').map(function (s) { return s.trim(); }),
          loop: true,
          typeSpeed: 80,
          backSpeed: 45,
          backDelay: 2200
        });
      }
    }
  });

  /* ═══════════════════════════════════════════
     10. SKILL BARS (IntersectionObserver)
  ═══════════════════════════════════════════ */
  function animateSkills() {
    document.querySelectorAll('.sk-bar').forEach(function (bar) {
      var pct = bar.getAttribute('aria-valuenow');
      if (pct) bar.style.width = pct + '%';
    });
  }

  var skillPanel = document.querySelector('.skills-animation');
  if (skillPanel) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) {
          animateSkills();
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      observer.observe(skillPanel);
    } else {
      animateSkills();
    }
  }

  /* ═══════════════════════════════════════════
     11. AOS INIT
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 650, easing: 'ease-in-out', once: true, offset: 60 });
    }
    // Fallback: force visibility after 1.8s
    setTimeout(function () {
      document.querySelectorAll('[data-aos]').forEach(function (el) {
        el.classList.add('aos-animate');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 1800);
  });

  /* ═══════════════════════════════════════════
     12. ISOTOPE PORTFOLIO FILTER
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    document.querySelectorAll('.isotope-layout').forEach(function (layout) {
      var container = layout.querySelector('.isotope-container');
      if (!container) return;

      var defaultFilter = layout.getAttribute('data-default-filter') || '*';
      var iso;

      function initIso() {
        if (typeof Isotope !== 'undefined') {
          iso = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout.getAttribute('data-layout') || 'masonry',
            filter: defaultFilter,
            sortBy: layout.getAttribute('data-sort') || 'original-order'
          });
        }
      }

      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(container, initIso);
      } else {
        initIso();
      }

      layout.querySelectorAll('.isotope-filters li').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var active = layout.querySelector('.isotope-filters .filter-active');
          if (active) active.classList.remove('filter-active');
          btn.classList.add('filter-active');
          var filter = btn.getAttribute('data-filter');
          if (iso) {
            iso.arrange({ filter: filter === '*' ? '*' : filter });
          } else {
            // Fallback without isotope
            container.querySelectorAll('.isotope-item').forEach(function (item) {
              if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            });
          }
        });
      });
    });
  });

  /* ═══════════════════════════════════════════
     13. GLIGHTBOX
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }
  });

  /* ═══════════════════════════════════════════
     14. SWIPER
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    document.querySelectorAll('.init-swiper').forEach(function (el) {
      if (typeof Swiper === 'undefined') return;
      var cfgEl = el.querySelector('.swiper-config');
      var cfg = {};
      if (cfgEl) { try { cfg = JSON.parse(cfgEl.textContent.trim()); } catch (_) { } }
      new Swiper(el, cfg);
    });
  });

  /* ═══════════════════════════════════════════
     15. PURECOUNTER
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    if (typeof PureCounter !== 'undefined') new PureCounter();
  });

  /* ═══════════════════════════════════════════
     16. HASH SCROLL ON LOAD
  ═══════════════════════════════════════════ */
  window.addEventListener('load', function () {
    if (window.location.hash) {
      try {
        var target = document.querySelector(window.location.hash);
        if (target) {
          setTimeout(function () {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      } catch (_) { }
    }
  });

  /* ═══════════════════════════════════════════
     17. GLITCH HOVER EFFECT on project cards
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.proj-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      var title = card.querySelector('.proj-title');
      if (title) title.style.textShadow = '0 0 16px rgba(0,255,65,0.6), 2px 0 rgba(0,245,255,0.4)';
    });
    card.addEventListener('mouseleave', function () {
      var title = card.querySelector('.proj-title');
      if (title) title.style.textShadow = '';
    });
  });

  /* ═══════════════════════════════════════════
     18. DECRYPTION TEXT EFFECT on section titles
  ═══════════════════════════════════════════ */
  var cryptoChars = '!<>-_\\/[]{}—=+*^?#';

  function decryptText(el) {
    var original = el.dataset.value || el.textContent;
    el.dataset.value = original;
    var iter = 0;
    var interval = setInterval(function () {
      el.textContent = original.split('').map(function (ch, i) {
        if (i < iter) return original[i];
        return cryptoChars[Math.floor(Math.random() * cryptoChars.length)];
      }).join('');
      if (iter >= original.length) clearInterval(interval);
      iter += 0.4;
    }, 30);
  }

  // Apply on section titles when they come into view
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('.section-title h2').forEach(function (h2) {
      var obs = new IntersectionObserver(function (entries, o) {
        if (entries[0].isIntersecting) {
          decryptText(h2);
          o.disconnect();
        }
      }, { threshold: 0.5 });
      obs.observe(h2);
    });
  }

})();
=======
  /* ── 7. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return; // skip bare # links
      try {
        var target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      } catch(err) {} // ignore invalid selectors
    });
  });

  /* ── 8. TYPING ANIMATION ── */
  var typedEl = document.getElementById('typed-hero');
  if (typedEl) {
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-hero', {
        strings: ['Cybersecurity Analyst','VAPT Analyst','Bug Bounty Learner','CTF Player','SOC Analyst'],
        typeSpeed: 70, backSpeed: 40, backDelay: 2000, loop: true
      });
    } else {
      var roles = ['Cybersecurity Analyst','VAPT Analyst','Bug Bounty Learner','CTF Player','SOC Analyst'];
      var ri = 0, ci = 0, del = false;
      function typeStep() {
        var cur = roles[ri];
        typedEl.textContent = del ? cur.substring(0, ci--) : cur.substring(0, ci++);
        if (!del && ci > cur.length) { setTimeout(function(){del=true;typeStep();},2000); return; }
        if (del && ci < 0) { del=false; ci=0; ri=(ri+1)%roles.length; }
        setTimeout(typeStep, del ? 38 : 75);
      }
      setTimeout(typeStep, 2600);
    }
  }

  /* ── 9. SKILL BARS ── */
  var bars = document.querySelectorAll('.progress-bar');
  if (bars.length && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var val = e.target.getAttribute('aria-valuenow');
          if (val) e.target.style.width = val + '%';
        }
      });
    }, { threshold: 0.2 }).observe(document.querySelector('.skills-animation') || bars[0]);
  } else {
    bars.forEach(function (b) {
      var v = b.getAttribute('aria-valuenow');
      if (v) b.style.width = v + '%';
    });
  }

  /* ── 10. FADE-IN / AOS ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true, offset: 60 });
  }
  // Fallback — make everything visible after 1s regardless
  setTimeout(function () {
    document.querySelectorAll('[data-aos], .fade-in').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }, 1000);

  /* ── 11. PORTFOLIO FILTER ── */
  var filters = document.querySelector('.portfolio-filters');
  var grid    = document.querySelector('.isotope-container');
  if (filters && grid) {
    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      imagesLoaded(grid, function () {
        var iso = new Isotope(grid, { itemSelector: '.isotope-item', layoutMode: 'masonry' });
        filters.querySelectorAll('li').forEach(function (btn) {
          btn.addEventListener('click', function () {
            filters.querySelector('.filter-active').classList.remove('filter-active');
            btn.classList.add('filter-active');
            iso.arrange({ filter: btn.dataset.filter === '*' ? '*' : '.' + btn.dataset.filter });
          });
        });
      });
    } else {
      filters.querySelectorAll('li').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.querySelector('.filter-active').classList.remove('filter-active');
          btn.classList.add('filter-active');
          var f = btn.dataset.filter;
          grid.querySelectorAll('.isotope-item').forEach(function (item) {
            item.style.display = (f === '*' || item.classList.contains(f.replace('.', ''))) ? '' : 'none';
          });
        });
      });
    }
  }

  /* ── 12. GLIGHTBOX ── */
  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });

  /* ── 13. SWIPER ── */
  if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.init-swiper').forEach(function (el) {
      var cfg = {};
      try { cfg = JSON.parse((el.querySelector('.swiper-config') || {}).textContent || '{}'); } catch(e){}
      new Swiper(el, cfg);
    });
  }

  /* ── 14. PURECOUNTER ── */
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /* ── 15. CUSTOM SELECT ── */
  document.querySelectorAll('.custom-select').forEach(function (sel) {
    var selected = sel.querySelector('.select-selected');
    var items    = sel.querySelector('.select-items');
    if (!selected || !items) return;
    selected.addEventListener('click', function () {
      items.classList.toggle('select-hide');
    });
    items.querySelectorAll('div').forEach(function (opt) {
      opt.addEventListener('click', function () {
        selected.textContent = opt.textContent;
        items.classList.add('select-hide');
      });
    });
    document.addEventListener('click', function (e) {
      if (!sel.contains(e.target)) items.classList.add('select-hide');
    });
  });

  /* ── 16. HEADER SHADOW ON SCROLL ── */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,255,65,0.08)' : 'none';
    }, { passive: true });
  }

}); // end DOMContentLoaded
>>>>>>> 6411371ca64bcf19b3212b48f953644ff09f8cfb
