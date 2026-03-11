/**
 * SENTINEL PORTFOLIO — main.js
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
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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