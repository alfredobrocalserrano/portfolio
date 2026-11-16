/* Alfredo Brocal Serrano · portfolio
   Content is complete without JS; this file adds the language switch,
   the scrubbable hero chart, the plotter wipe and the section highlight. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var LANG_KEY = 'abs-lang';

  /* ---------------- Language ---------------- */
  var META = {
    es: {
      title: 'Alfredo Brocal Serrano · Data Science',
      desc: 'Estudiante del Máster en Data Science (UCM) que busca prácticas. Elche (Alicante) · Madrid · remoto. Cuatro proyectos con datos reales: CO₂, un asistente RAG, Google Play y sentimiento en X.'
    },
    en: {
      title: 'Alfredo Brocal Serrano · Data Science',
      desc: 'MSc Data Science student at UCM looking for an internship. Elche (Alicante) · Madrid · remote. Four projects with real data: CO₂, a RAG assistant, Google Play and sentiment on X.'
    }
  };
  var lang = 'es';

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* private mode */ } }
  function recall(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'es' || q === 'en') return q;
    var saved = recall(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  // Each translatable node keeps its Spanish original the first time it is switched.
  function swap(el, attr, enVal, toHTML) {
    var key = 'es' + attr.replace(/-/g, '');
    if (!(key in el.dataset)) {
      el.dataset[key] = attr === 'Text' ? (toHTML ? el.innerHTML : el.textContent)
        : (el.getAttribute(attr) || '');
    }
    var val = lang === 'en' ? enVal : el.dataset[key];
    if (attr === 'Text') {
      if (toHTML) el.innerHTML = val; else el.textContent = val;
    } else {
      el.setAttribute(attr, val);
    }
  }

  function applyLang() {
    document.querySelectorAll('[data-en]').forEach(function (el) { swap(el, 'Text', el.getAttribute('data-en'), false); });
    document.querySelectorAll('[data-en-html]').forEach(function (el) { swap(el, 'Text', el.getAttribute('data-en-html'), true); });
    document.querySelectorAll('[data-en-alt]').forEach(function (el) { swap(el, 'alt', el.getAttribute('data-en-alt')); });
    document.querySelectorAll('[data-en-aria-label]').forEach(function (el) { swap(el, 'aria-label', el.getAttribute('data-en-aria-label')); });
    root.lang = lang;
    document.title = META[lang].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', META[lang].desc);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    if (chart) chart.render(chart.idx);
    window.dispatchEvent(new Event('resize'));
  }

  function initLang() {
    lang = initialLang();
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.lang === lang) return;
        lang = b.dataset.lang;
        store(LANG_KEY, lang);
        applyLang();
      });
    });
    if (lang !== 'es') applyLang();
  }

  /* ---------------- Hero chart scrub ---------------- */
  var chart = null;
  var NAMES = {
    es: ['Carbón', 'Petróleo', 'Gas', 'Cemento', 'Gas quemado'],
    en: ['Coal', 'Oil', 'Gas', 'Cement', 'Flaring']
  };

  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'es' ? '.' : ','); }

  function initChart() {
    var svg = document.querySelector('.hero .scrub');
    var dataEl = document.getElementById('fig1-data');
    var out = document.getElementById('readout');
    if (!svg || !dataEl || !out) return;
    var data = JSON.parse(dataEl.textContent);
    var n = data.y.length;
    var mark = svg.querySelector('.scrub__mark');
    var line = mark.querySelector('line');
    var g = data.geo;

    chart = {
      idx: n - 1,
      render: function (i) {
        this.idx = i;
        var v = data.v[i];
        var total = data.t[i];
        var html = '<span class="yr">' + data.y[i] + '</span>' +
          '<span><b>' + fmt(total) + ' Mt</b> ' + (lang === 'es' ? 'en total' : 'total') + '</span>';
        for (var k = 0; k < v.length; k++) {
          html += '<span>' + NAMES[lang][k] + ' ' + fmt(v[k]) + '</span>';
        }
        out.innerHTML = html;
        var x = g.L + i * g.pw / (n - 1);
        line.setAttribute('x1', x); line.setAttribute('x2', x);
      }
    };

    function show(i) {
      chart.render(Math.max(0, Math.min(n - 1, i)));
      mark.setAttribute('visibility', 'visible');
    }

    function fromPointer(e) {
      var r = svg.getBoundingClientRect();
      var scale = r.width / g.W;
      var x = (e.clientX - r.left) / scale;
      show(Math.round((x - g.L) / g.pw * (n - 1)));
    }

    svg.addEventListener('pointermove', fromPointer);
    svg.addEventListener('pointerdown', fromPointer);
    svg.addEventListener('pointerleave', function () {
      if (document.activeElement !== svg) { mark.setAttribute('visibility', 'hidden'); chart.render(n - 1); }
    });
    svg.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 1;
      if (e.key === 'ArrowRight') { show(chart.idx + step); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { show(chart.idx - step); e.preventDefault(); }
      else if (e.key === 'Home') { show(0); e.preventDefault(); }
      else if (e.key === 'End') { show(n - 1); e.preventDefault(); }
    });
    svg.addEventListener('focus', function () { show(chart.idx); });
    svg.addEventListener('blur', function () { mark.setAttribute('visibility', 'hidden'); });

    chart.render(n - 1);
  }

  /* ---------------- Plotter wipe ---------------- */
  function initWipe() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-wipe]'));
    var vh = window.innerHeight;
    els.forEach(function (el) {
      // only hide what is below the fold, so nothing visible ever blinks out
      if (el.getBoundingClientRect().top > vh * 0.9) el.classList.add('is-pending');
    });
    var heroWipe = document.querySelector('.hero [data-wipe]');
    if (heroWipe && !heroWipe.classList.contains('is-pending')) {
      heroWipe.classList.add('is-pending');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { heroWipe.classList.add('is-drawn'); heroWipe.classList.remove('is-pending'); });
      });
    }
    // A clipped <g> has zero visible area, so IntersectionObserver never reports it;
    // watch its <svg> instead and draw the group when that comes into view.
    var watched = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = watched.get(en.target);
          el.classList.add('is-drawn');
          el.classList.remove('is-pending');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(function (el) {
      if (!el.classList.contains('is-pending')) return;
      var target = el.ownerSVGElement || el;
      watched.set(target, el);
      io.observe(target);
    });
  }

  /* ---------------- Current section in nav ---------------- */
  function initSpy() {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.nav__links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var ids = Object.keys(links);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          ids.forEach(function (id) { links[id].removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        } else if (a.getAttribute('aria-current')) {
          a.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------------- Plates hold as one sheet ---------------- */
  // On wide screens the shorter column of each plate stays pinned while the longer one scrolls.
  function initPlates() {
    var wide = window.matchMedia('(min-width: 1101px)');
    function layout() {
      var nav = document.querySelector('.nav');
      var room = window.innerHeight - (nav ? nav.offsetHeight : 56) - 24;
      document.querySelectorAll('.plate').forEach(function (p) {
        var a = p.querySelector('.plate__body'), b = p.querySelector('.plate__figs');
        if (!a || !b) return;
        p.querySelectorAll('.is-sticky').forEach(function (el) { el.classList.remove('is-sticky'); });
        if (!wide.matches || Math.abs(a.offsetHeight - b.offsetHeight) < 120) return;
        var short = a.offsetHeight < b.offsetHeight ? a : b;
        if (short.offsetHeight <= room) short.classList.add('is-sticky');
      });
    }
    layout();
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);
  }

  function boot() {
    [initChart, initLang, initWipe, initSpy, initPlates].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn('[portfolio]', fn.name, err); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
