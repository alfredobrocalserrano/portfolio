/* ============================================================
   Alfredo Brocal — Portfolio editorial v2.1
   Vanilla JS + GSAP/ScrollTrigger (local, no CDN at runtime)
   Pattern: IIFE + safe() wrappers. If anything fails, content
   stays fully visible — JS only enriches.
   ============================================================ */
(function () {
  'use strict';

  function safe(fn, name) {
    try { fn(); } catch (err) {
      if (window.console) console.warn('[portfolio] init failed:', name, err);
    }
  }

  var hasGSAP = typeof window.gsap !== 'undefined';
  var hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ==========================================================
     i18n
     ========================================================== */
  var i18n = {
    es: {
      'nav.about': 'Sobre', 'nav.projects': 'Proyectos', 'nav.skills': 'Habilidades', 'nav.contact': 'Contacto',
      'hero.avail': 'Disponible para colaborar',
      'hero.role': 'Data Scientist &amp; Analyst — Madrid',
      'hero.scroll': 'Scroll',
      'hero.lede': 'Transformando datos crudos en <em>decisiones</em> con Python, SQL y la mirada estratégica del Máster en Data Science por la UCM.',
      'hero.s1l': 'Proyectos', 'hero.s2l': 'Registros', 'hero.s3l': 'Con RAG', 'hero.s3u': 'págs',
      'hero.cta1': 'Ver proyectos', 'hero.cta2': 'Contacto',
      'marq': 'Python <span class="star">✦</span> SQL <span class="star">✦</span> Pandas <span class="star">✦</span> Machine Learning <span class="star">✦</span> RAG <span class="star">✦</span> Visualización de datos <span class="star">✦</span>',
      'marq2': '<span class="ghost">Power BI</span> <span class="star">✧</span> <span class="ghost">Tableau</span> <span class="star">✧</span> <span class="ghost">LangChain</span> <span class="star">✧</span> <span class="ghost">ChromaDB</span> <span class="star">✧</span> <span class="ghost">NumPy</span> <span class="star">✧</span> <span class="ghost">DBeaver</span> <span class="star">✧</span>',
      'about.tag': 'Sobre mí', 'about.h2a': 'Una mente', 'about.h2b': 'analítica', 'about.h2c': 'con visión estratégica.',
      'about.cap': 'Madrid, 2026. UCM, Máster en Data Science.',
      'about.p1': '<strong>Graduado</strong> en el Grado en Gestión de Información y Contenidos Digitales — una formación que me ha dado la base para entender cómo se organiza y fluye la información en el entorno digital.',
      'about.p2': 'Para llevar estas habilidades al siguiente nivel, completé el certificado de <em>Google Data Analytics</em> y actualmente curso el <strong>Máster en Data Science en la UCM</strong>. Esta combinación me permite unir gestión estratégica con analítica avanzada.',
      'about.p3': 'Mi objetivo: usar Python y SQL para transformar datos en bruto en <em>conocimiento accionable</em> y visualizaciones de alto impacto.',
      'curr.label': 'Actualmente', 'curr.body': 'Cursando MSc Data Science (UCM), explorando RAG / LLMs y abierto a colaborar en proyectos de <em>analítica estratégica</em>.',
      'about.cv': 'Descargar CV (PDF)', 'about.contact': 'Hablemos',
      'phil.1h': 'Claridad antes que complejidad', 'phil.1p': 'Un modelo que nadie entiende no cambia ninguna decisión. Priorizo el camino más simple entre el dato y el insight.',
      'phil.2h': 'Trazabilidad, no cajas negras', 'phil.2p': 'Cada conclusión debe poder rastrearse hasta la fila que la sostiene: consulta SQL, celda o citación con fuente.',
      'phil.3h': 'De datos a decisiones', 'phil.3p': 'Un análisis solo importa si mueve una acción. Diseño cada dashboard pensando en quién lo va a usar y para qué.',
      'tl.tag': 'Formación',
      'tl.1y': 'Grado universitario', 'tl.1t': 'Gestión de Información y Contenidos Digitales', 'tl.1d': 'Base en cómo se organiza, gestiona y fluye la información en entornos digitales.', 'tl.1s': 'Graduado',
      'tl.2y': 'Certificación profesional', 'tl.2t': 'Google Data Analytics', 'tl.2d': 'Limpieza, análisis y visualización de datos orientados a la toma de decisiones.', 'tl.2s': 'Completado',
      'tl.3y': 'Máster · UCM', 'tl.3t': 'Máster en Data Science', 'tl.3d': 'Analítica avanzada, machine learning y sistemas de IA generativa (RAG / LLMs).', 'tl.3s': 'En curso',
      'statement.eyebrow': 'Manifiesto',
      'statement.q': 'Los datos no cuentan historias por sí solos — <em>alguien tiene que hacer las preguntas correctas.</em>',
      'statement.c': 'Alfredo Brocal · sobre analítica con propósito',
      'projects.tag': 'Trabajos seleccionados', 'projects.h2a': 'Proyectos', 'projects.h2b': 'recientes.',
      'pj1.title': 'Análisis end-to-end: <em>emisiones globales de CO₂</em>',
      'pj1.desc': 'Pipeline de datos profesional sobre 121 años de emisiones, con insights críticos sobre descarbonización real.',
      'pj2.title': 'Sistema de consultas <em>inteligentes (RAG)</em>',
      'pj2.desc': 'IA generativa para gestión de conocimiento mediante lenguaje natural, con citaciones trazables.',
      'pj3.title': 'Análisis de mercado: <em>Google Play Store</em>',
      'pj3.desc': 'Estudio integral de las métricas que definen el éxito y la valoración de apps móviles.',
      'pj4.title': 'Sentiment analysis: <em>limpieza masiva (X)</em>',
      'pj4.desc': 'NLP y limpieza profunda de datasets masivos provenientes de redes sociales.',
      'num.tag': 'En números',
      'num.1': 'años de emisiones de CO₂ analizados', 'num.2': 'apps estudiadas en Google Play', 'num.3': 'tweets procesados con NLP', 'num.4': 'empresas del IBEX en el sistema RAG',
      'skills.tag': 'Stack técnico', 'skills.h2a': 'Herramientas que', 'skills.h2b': 'domino.',
      'contact.tag': 'Hablemos', 'contact.h2a': 'Construyamos algo', 'contact.h2b': 'juntos.',
      'contact.text': 'Finalizando mi formación en la UCM y abierto a colaborar en proyectos de <em>Data Science, Análisis de Datos e IA</em>.',
      'contact.megaLabel': '¿Un proyecto en mente? Escríbeme —',
      'footer.r': 'Diseño editorial · Madrid',
      'cursor.view': 'Ver →',
      'modal.h.context': 'Contexto', 'modal.h.results': 'Resultados', 'modal.h.tools': 'Herramientas', 'modal.h.process': 'Proceso', 'modal.cta': 'Ver en GitHub'
    },
    en: {
      'nav.about': 'About', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.contact': 'Contact',
      'hero.avail': 'Available for collaboration',
      'hero.role': 'Data Scientist &amp; Analyst — Madrid',
      'hero.scroll': 'Scroll',
      'hero.lede': 'Turning raw data into <em>decisions</em> with Python, SQL and the strategic lens of UCM\'s Data Science Master\'s.',
      'hero.s1l': 'Projects', 'hero.s2l': 'Records', 'hero.s3l': 'With RAG', 'hero.s3u': 'pages',
      'hero.cta1': 'See projects', 'hero.cta2': 'Contact',
      'marq': 'Python <span class="star">✦</span> SQL <span class="star">✦</span> Pandas <span class="star">✦</span> Machine Learning <span class="star">✦</span> RAG <span class="star">✦</span> Data Visualization <span class="star">✦</span>',
      'marq2': '<span class="ghost">Power BI</span> <span class="star">✧</span> <span class="ghost">Tableau</span> <span class="star">✧</span> <span class="ghost">LangChain</span> <span class="star">✧</span> <span class="ghost">ChromaDB</span> <span class="star">✧</span> <span class="ghost">NumPy</span> <span class="star">✧</span> <span class="ghost">DBeaver</span> <span class="star">✧</span>',
      'about.tag': 'About me', 'about.h2a': 'An analytical', 'about.h2b': 'mind', 'about.h2c': 'with strategic vision.',
      'about.cap': 'Madrid, 2026. UCM, MSc Data Science.',
      'about.p1': '<strong>Graduated</strong> in Information &amp; Digital Content Management — a foundation in how information is organized and flows through digital environments.',
      'about.p2': 'To level up, I earned the <em>Google Data Analytics</em> certificate and I\'m now pursuing a <strong>Data Science Master\'s at UCM</strong>. This combination lets me bridge strategic management with advanced analytics.',
      'about.p3': 'My goal: use Python and SQL to turn raw data into <em>actionable insight</em> and high-impact visualizations.',
      'curr.label': 'Currently', 'curr.body': 'Pursuing MSc Data Science (UCM), exploring RAG / LLMs and open to collaborate on <em>strategic analytics</em> projects.',
      'about.cv': 'Download CV (PDF)', 'about.contact': 'Let\'s talk',
      'phil.1h': 'Clarity before complexity', 'phil.1p': 'A model nobody understands changes no decision. I prioritize the simplest path between data and insight.',
      'phil.2h': 'Traceability, not black boxes', 'phil.2p': 'Every conclusion should trace back to the row that supports it: a SQL query, a cell, a cited source.',
      'phil.3h': 'From data to decisions', 'phil.3p': 'Analysis only matters if it moves an action. I design every dashboard with its user and purpose in mind.',
      'tl.tag': 'Education',
      'tl.1y': 'Bachelor\'s degree', 'tl.1t': 'Information & Digital Content Management', 'tl.1d': 'Foundation in how information is organized, managed and flows through digital environments.', 'tl.1s': 'Graduated',
      'tl.2y': 'Professional certificate', 'tl.2t': 'Google Data Analytics', 'tl.2d': 'Data cleaning, analysis and visualization for decision-making.', 'tl.2s': 'Completed',
      'tl.3y': 'Master\'s · UCM', 'tl.3t': 'MSc in Data Science', 'tl.3d': 'Advanced analytics, machine learning and generative-AI systems (RAG / LLMs).', 'tl.3s': 'In progress',
      'statement.eyebrow': 'Manifesto',
      'statement.q': 'Data doesn\'t tell stories on its own — <em>someone has to ask the right questions.</em>',
      'statement.c': 'Alfredo Brocal · on purposeful analytics',
      'projects.tag': 'Selected work', 'projects.h2a': 'Recent', 'projects.h2b': 'projects.',
      'pj1.title': 'End-to-end analysis: <em>global CO₂ emissions</em>',
      'pj1.desc': 'Professional data pipeline over 121 years of emissions, with critical insights on real decarbonization.',
      'pj2.title': 'Intelligent <em>query system (RAG)</em>',
      'pj2.desc': 'Generative AI for knowledge management via natural language, with traceable citations.',
      'pj3.title': 'Market analysis: <em>Google Play Store</em>',
      'pj3.desc': 'Comprehensive study of the metrics that define mobile app success and ratings.',
      'pj4.title': 'Sentiment analysis: <em>massive cleanup (X)</em>',
      'pj4.desc': 'NLP and deep cleaning of massive social media datasets.',
      'num.tag': 'By the numbers',
      'num.1': 'years of CO₂ emissions analyzed', 'num.2': 'apps studied on Google Play', 'num.3': 'tweets processed with NLP', 'num.4': 'IBEX companies in the RAG system',
      'skills.tag': 'Tech stack', 'skills.h2a': 'Tools I', 'skills.h2b': 'master.',
      'contact.tag': 'Let\'s talk', 'contact.h2a': 'Let\'s build something', 'contact.h2b': 'together.',
      'contact.text': 'Finishing my studies at UCM and open to collaborate on <em>Data Science, Analytics and AI</em> projects.',
      'contact.megaLabel': 'Got a project in mind? Write me —',
      'footer.r': 'Editorial design · Madrid',
      'cursor.view': 'View →',
      'modal.h.context': 'Context', 'modal.h.results': 'Results', 'modal.h.tools': 'Tools', 'modal.h.process': 'Process', 'modal.cta': 'View on GitHub'
    }
  };

  var metaDescs = {
    es: 'Alfredo Brocal Serrano — Data Scientist & Analyst. Portfolio editorial con proyectos de análisis de datos, Python, SQL e IA.',
    en: 'Alfredo Brocal Serrano — Data Scientist & Analyst. Editorial portfolio featuring data analysis projects: CO₂, RAG, Google Play, X.'
  };

  var lang = 'es';

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.dataset.i18n;
      if (i18n[lang][k]) el.innerHTML = i18n[lang][k];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    var md = document.getElementById('metaDesc');
    if (md) md.setAttribute('content', metaDescs[lang]);
  }

  /* ==========================================================
     Projects data
     ========================================================== */
  var projects = {
    co2: {
      num: 'PJ.01 · 2026',
      github: 'https://github.com/alfredobrocalserrano/global-co2-analysis-dashboard',
      image: './assets/project-co2.jpg',
      title: { es: 'Análisis end-to-end: <em>emisiones globales de CO₂</em>', en: 'End-to-end analysis: <em>global CO₂ emissions</em>' },
      meta: { es: ['1900–2021', '121 años', 'Global Carbon Budget 2022'], en: ['1900–2021', '121 years', 'Global Carbon Budget 2022'] },
      ctx: { es: 'Transformar un dataset masivo de emisiones de CO₂ en un pipeline de datos profesional, extrayendo insights críticos que los datos brutos ocultaban.', en: 'Turn a massive CO₂ emissions dataset into a professional data pipeline, extracting critical insights hidden in the raw data.' },
      res: {
        es: ['El carbón domina el mix energético global; el gas creció exponencialmente desde 1950', 'Top 10 histórico: Alemania y UK superan a India y China por industrialización temprana, no por población', 'Europa lidera la descarbonización 2011–2021: UK -26%, Italia -22%, España -18%', 'Venezuela: -54,68% de reducción atípica por colapso económico, no por política climática'],
        en: ['Coal dominates the global energy mix; gas grew exponentially from 1950', 'Historical top 10: Germany and UK outrank India and China due to early industrialization, not population', 'Europe leads 2011–2021 decarbonization: UK -26%, Italy -22%, Spain -18%', 'Venezuela: -54.68% atypical reduction driven by economic collapse, not climate policy']
      },
      tools: { es: 'Python (Pandas), SQL (DBeaver), Google Sheets.', en: 'Python (Pandas), SQL (DBeaver), Google Sheets.' },
      proc: {
        es: ['Limpieza y exclusión de filas agregadas con Pandas', 'Consultas SQL complejas en DBeaver: evolución por fuente, ranking y tendencias', 'Dashboard interactivo en Google Sheets con KPIs y gráficos de área'],
        en: ['Cleanup and removal of aggregated rows with Pandas', 'Complex SQL queries in DBeaver: source evolution, ranking and trends', 'Interactive Google Sheets dashboard with KPIs and area charts']
      }
    },
    rag: {
      num: 'PJ.02 · 2026',
      github: 'https://github.com/alfredobrocalserrano/rag-analisis-corporativo',
      image: './assets/project-rag.jpg',
      title: { es: 'Asistente RAG: <em>análisis documental corporativo</em>', en: 'RAG assistant: <em>corporate document analysis</em>' },
      meta: { es: ['Informes corporativos', 'ChromaDB', 'LangChain'], en: ['Corporate reports', 'ChromaDB', 'LangChain'] },
      ctx: { es: 'Sistema RAG para consultar en lenguaje natural ~2.199 páginas de informes anuales de Iberdrola, BBVA, Santander e Inditex, con recuperación semántica MMR y respuestas con citas trazables.', en: 'RAG system for querying ~2,199 pages of annual reports from Iberdrola, BBVA, Santander and Inditex in natural language, with MMR semantic retrieval and source-traceable answers.' },
      res: {
        es: ['~2.199 páginas de informes procesados: Iberdrola, BBVA, Santander e Inditex', 'Búsqueda MMR sobre ChromaDB con embeddings de HuggingFace', 'Generación con Llama 3.3 70B vía Groq API con citas trazables a la fuente', 'Outputs: análisis de sentimiento, KPIs exportados en CSV y visualizaciones EDA'],
        en: ['~2,199 report pages processed: Iberdrola, BBVA, Santander and Inditex', 'MMR search over ChromaDB with HuggingFace embeddings', 'Generation with Llama 3.3 70B via Groq API with source-traceable citations', 'Outputs: sentiment analysis, KPIs exported to CSV and EDA visualizations']
      },
      tools: { es: 'Python, LangChain, ChromaDB, HuggingFace, Groq (Llama 3.3 70B), Gradio, Pandas, Matplotlib.', en: 'Python, LangChain, ChromaDB, HuggingFace, Groq (Llama 3.3 70B), Gradio, Pandas, Matplotlib.' },
      proc: {
        es: ['Ingesta y chunking de PDFs con PyPDF + LangChain', 'Indexación en ChromaDB con embeddings de HuggingFace', 'Recuperación MMR + generación con Llama 3.3 70B e interfaz en Gradio'],
        en: ['PDF ingestion and chunking with PyPDF + LangChain', 'Indexing in ChromaDB with HuggingFace embeddings', 'MMR retrieval + generation with Llama 3.3 70B and Gradio UI']
      }
    },
    play: {
      num: 'PJ.03 · 2025',
      github: 'https://github.com/alfredobrocalserrano/google-play-store-analysis',
      image: './assets/project-play.jpg',
      title: { es: 'Análisis de mercado: <em>Google Play Store</em>', en: 'Market analysis: <em>Google Play Store</em>' },
      meta: { es: ['EDA', '+10.000 apps', 'Power BI'], en: ['EDA', '+10,000 apps', 'Power BI'] },
      ctx: { es: 'Análisis estratégico de más de 10.000 apps de Google Play para identificar los factores que determinan el éxito en ratings e instalaciones.', en: 'Strategic analysis of more than 10,000 Google Play apps to identify the factors that determine success in ratings and installs.' },
      res: {
        es: ['Las apps de pago tienen un rating medio 0,49 puntos superior a las gratuitas', 'Barrera psicológica de descarga a partir de los 100 MB', '"Punto dulce" de éxito masivo: app gratuita de menos de 100 MB', 'Dashboard de 4 páginas: mercado general, precios, tamaño y perfil de éxito'],
        en: ['Paid apps have an average rating 0.49 points higher than free apps', 'Psychological download barrier at 100 MB', '"Sweet spot" for mass success: free app under 100 MB', '4-page dashboard: general market, pricing, size and success profile']
      },
      tools: { es: 'Python (Colab), Power BI, DAX.', en: 'Python (Colab), Power BI, DAX.' },
      proc: {
        es: ['Limpieza con Python: nulos, normalización de unidades (MB/KB)', 'Creación de medidas DAX y segmentos de tamaño en Power BI', 'Dashboard de 4 páginas con recomendaciones accionables'],
        en: ['Python cleanup: nulls, unit normalization (MB/KB)', 'DAX measures and size segments in Power BI', '4-page dashboard with actionable recommendations']
      }
    },
    x: {
      num: 'PJ.04 · 2025',
      github: 'https://github.com/alfredobrocalserrano/twitter-sentiment-cleaning',
      image: './assets/project-x.jpg',
      title: { es: 'Sentiment analysis: <em>limpieza masiva (X)</em>', en: 'Sentiment analysis: <em>massive cleanup (X)</em>' },
      meta: { es: ['NLP', 'X (Twitter)', 'Pandas'], en: ['NLP', 'X (Twitter)', 'Pandas'] },
      ctx: { es: 'Limpieza y transformación de 68.432 tweets en español para análisis de sentimiento, reduciendo el dataset a 63.639 registros de calidad mediante deduplicación y normalización.', en: 'Cleaning and transformation of 68,432 Spanish tweets for sentiment analysis, reducing the dataset to 63,639 quality records through deduplication and normalization.' },
      res: {
        es: ['68.432 tweets originales → 63.639 tras eliminar 4.125 duplicados y 602 nulos', 'Distribución final: Negativo 19.569 · Positivo 17.148 · Neutral 15.140 · Irrelevante 11.782', 'Pipeline de normalización: minúsculas, puntuación, URLs, menciones y hashtags eliminados', 'Métricas derivadas por registro: longitud del tweet y número de palabras'],
        en: ['68,432 original tweets → 63,639 after removing 4,125 duplicates and 602 nulls', 'Final distribution: Negative 19,569 · Positive 17,148 · Neutral 15,140 · Irrelevant 11,782', 'Normalization pipeline: lowercase, punctuation, URLs, mentions and hashtags removed', 'Derived metrics per record: tweet length and word count']
      },
      tools: { es: 'Python (Pandas 2.x), Google Colab.', en: 'Python (Pandas 2.x), Google Colab.' },
      proc: {
        es: ['Carga y auditoría del dataset (68.432 tweets en español)', 'Normalización y deduplicación: eliminación de URLs, menciones, hashtags y duplicados', 'Cálculo de métricas derivadas y exportación del dataset limpio'],
        en: ['Dataset loading and audit (68,432 Spanish tweets)', 'Normalization and deduplication: remove URLs, mentions, hashtags and duplicates', 'Derived metrics calculation and clean dataset export']
      }
    }
  };

  /* ==========================================================
     Preloader
     ========================================================== */
  function initPreloader() {
    var pre = document.getElementById('preloader');
    var counter = document.getElementById('preloaderCounter');
    var barFill = document.getElementById('preloaderBarFill');
    if (!pre || !counter) { startHero(); return; }

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      if (hasGSAP) {
        gsap.to(pre, {
          yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.15,
          onComplete: function () { pre.classList.add('done'); }
        });
        startHero(0.45);
      } else {
        pre.style.transition = 'opacity 0.5s'; pre.style.opacity = '0';
        setTimeout(function () { pre.classList.add('done'); }, 550);
        startHero(0);
      }
    }

    var start = null;
    var DUR = 1500;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = Math.round(eased * 100);
      counter.textContent = (v < 10 ? '00' : v < 100 ? '0' : '') + v;
      if (barFill) barFill.style.transform = 'scaleX(' + eased + ')';
      if (p < 1) requestAnimationFrame(tick);
      else finish();
    }
    requestAnimationFrame(tick);
    setTimeout(finish, 4000);
  }

  /* ==========================================================
     Hero entrance
     ========================================================== */
  var heroStarted = false;
  function startHero(delay) {
    if (heroStarted) return;
    heroStarted = true;
    if (!hasGSAP) return;

    var rows = document.querySelectorAll('[data-hero-row]');
    var meta = document.querySelector('.hero-meta');
    var strip = document.querySelector('.hero-role-strip');
    var subItems = document.querySelectorAll('.hero-sub > *, .hero-cta-row');

    var tl = gsap.timeline({ delay: delay || 0 });
    if (rows.length) {
      gsap.set(rows, { yPercent: 110 });
      tl.to(rows, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0);
    }
    if (meta) tl.from(meta, { autoAlpha: 0, y: -12, duration: 0.7, ease: 'power2.out' }, 0.35);
    if (strip) tl.from(strip, { autoAlpha: 0, x: -24, duration: 0.7, ease: 'power2.out' }, 0.7);
    if (subItems.length) tl.from(subItems, { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.75);
  }

  /* ==========================================================
     Chart line draw
     ========================================================== */
  function initChart() {
    var line = document.getElementById('hero-line');
    if (!line || !line.getTotalLength) return;
    var length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.transition = 'stroke-dashoffset 2.6s ease 1.6s';
    requestAnimationFrame(function () { line.style.strokeDashoffset = '0'; });
  }

  /* ==========================================================
     Scroll reveals
     ========================================================== */
  function initReveals() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (hasST) {
      els.forEach(function (el) {
        if (el.closest('.hero')) return;
        gsap.from(el, {
          autoAlpha: 0, y: 28, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      setTimeout(function () {
        els.forEach(function (el) {
          if (parseFloat(getComputedStyle(el).opacity) < 0.99) {
            gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' });
          }
        });
      }, 6000);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.05 });
      els.forEach(function (el) {
        if (el.closest('.hero')) return;
        el.classList.add('pre-reveal');
        io.observe(el);
      });
      setTimeout(function () {
        els.forEach(function (el) { el.classList.add('in'); });
      }, 6000);
    }
  }

  /* ==========================================================
     Portrait clip reveal
     ========================================================== */
  function initPhotoReveal() {
    var photo = document.querySelector('[data-photo-reveal]');
    if (!photo || !hasST) return;
    gsap.from(photo, {
      clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'power4.inOut',
      scrollTrigger: { trigger: photo, start: 'top 82%', once: true }
    });
    var img = photo.querySelector('img');
    if (img) {
      gsap.from(img, {
        scale: 1.18, duration: 1.6, ease: 'power3.out',
        scrollTrigger: { trigger: photo, start: 'top 82%', once: true }
      });
    }
  }

  /* ==========================================================
     Stat counters (supports data-pad + data-sep thousands)
     ========================================================== */
  function fmt(v, pad, sep) {
    var s = String(v);
    while (s.length < pad) s = '0' + s;
    if (sep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return s;
  }
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function run(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      var target = parseInt(el.dataset.count, 10) || 0;
      var pad = parseInt(el.dataset.pad, 10) || 0;
      var sep = el.dataset.sep === '1';
      var t0 = null;
      var DUR = 1500;
      function frame(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / DUR, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(eased * target), pad, sep);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    setTimeout(function () {
      counters.forEach(function (el) { if (el.closest('.hero')) run(el); });
    }, 2100);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    counters.forEach(function (el) { if (!el.closest('.hero')) io.observe(el); });
  }

  /* ==========================================================
     Statement scrub
     ========================================================== */
  function initStatementScrub() {
    var quote = document.getElementById('statementQuote');
    if (!quote || !hasST) return;
    quote.classList.add('scrub-armed');
    gsap.fromTo(quote,
      { backgroundPosition: '100% 0' },
      {
        backgroundPosition: '0% 0', ease: 'none',
        scrollTrigger: { trigger: quote.closest('.statement'), start: 'top 75%', end: 'center 45%', scrub: 0.6 }
      }
    );
  }

  /* ==========================================================
     Nav progress hairline
     ========================================================== */
  function initNavProgress() {
    var bar = document.getElementById('navProgress');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ==========================================================
     Nav scroll-spy (active section)
     ========================================================== */
  function initScrollSpy() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.charAt(0) === '#') map[href.slice(1)] = a;
    });
    var ids = ['about', 'projects', 'skills', 'contact'];
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[e.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ==========================================================
     Custom cursor — editorial arrow
     ========================================================== */
  var cursorEl = null;
  function initCursor() {
    var c = document.getElementById('cursor');
    if (!finePointer || !c) return;
    cursorEl = c;
    document.body.classList.add('custom-cursor');

    var qx, qy;
    if (hasGSAP) {
      gsap.set(c, { xPercent: -50, yPercent: -50 });
      qx = gsap.quickTo(c, 'x', { duration: 0.14, ease: 'power2.out' });
      qy = gsap.quickTo(c, 'y', { duration: 0.14, ease: 'power2.out' });
    }
    window.addEventListener('mousemove', function (e) {
      document.body.classList.add('cursor-active');
      if (hasGSAP) { qx(e.clientX); qy(e.clientY); }
      else { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }
    }, { passive: true });

    document.querySelectorAll('a, button, .skill, .tool-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { c.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { c.classList.remove('hover'); });
    });
  }

  /* ==========================================================
     Cursor-following project preview (with "VER" label)
     ========================================================== */
  function initCursorPreview() {
    var cp = document.getElementById('cursorPreview');
    var cpImg = document.getElementById('cursorPreviewImg');
    var cpLabel = document.getElementById('cursorPreviewLabel');
    if (!cp || !cpImg || !finePointer) return;

    var useGsap = hasGSAP;
    var qx, qy;
    if (useGsap) {
      qx = gsap.quickTo(cp, 'x', { duration: 0.35, ease: 'power3.out' });
      qy = gsap.quickTo(cp, 'y', { duration: 0.35, ease: 'power3.out' });
    }

    document.querySelectorAll('.project').forEach(function (p) {
      var pj = projects[p.dataset.pj];
      if (!pj || !pj.image) return;
      p.addEventListener('mouseenter', function (e) {
        cpImg.src = pj.image;
        if (cpLabel) cpLabel.textContent = i18n[lang]['cursor.view'];
        if (cursorEl) cursorEl.classList.add('dim');
        if (useGsap) {
          gsap.set(cp, { x: e.clientX, y: e.clientY });
          gsap.to(cp, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.35, ease: 'power3.out' });
        } else {
          cp.style.left = e.clientX + 'px'; cp.style.top = e.clientY + 'px';
          cp.style.opacity = '1';
        }
      });
      p.addEventListener('mousemove', function (e) {
        if (useGsap) { qx(e.clientX); qy(e.clientY); }
        else { cp.style.left = e.clientX + 'px'; cp.style.top = e.clientY + 'px'; }
      });
      p.addEventListener('mouseleave', function () {
        if (cursorEl) cursorEl.classList.remove('dim');
        if (useGsap) gsap.to(cp, { autoAlpha: 0, scale: 0.9, rotate: -2, duration: 0.3, ease: 'power2.in' });
        else cp.style.opacity = '0';
      });
    });
  }

  /* ==========================================================
     Project sparklines
     ========================================================== */
  function initSparklines() {
    document.querySelectorAll('.pj-spark path').forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 200;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
  }

  /* ==========================================================
     Modal
     ========================================================== */
  var currentPj = null;

  function renderModal() {
    if (!currentPj) return;
    var p = projects[currentPj];
    document.getElementById('modalNum').textContent = p.num;
    document.getElementById('modalTitle').innerHTML = p.title[lang];
    document.getElementById('modalMeta').innerHTML = p.meta[lang].map(function (m) { return '<span>' + m + '</span>'; }).join('');
    document.getElementById('modalCtx').textContent = p.ctx[lang];
    document.getElementById('modalRes').innerHTML = p.res[lang].map(function (r) { return '<li>' + r + '</li>'; }).join('');
    document.getElementById('modalTools').textContent = p.tools[lang];
    document.getElementById('modalProc').innerHTML = p.proc[lang].map(function (s) { return '<li>' + s + '</li>'; }).join('');
    document.getElementById('modalGH').href = p.github;
    var imgWrap = document.getElementById('modalImgWrap');
    var fallback = '<span style="position:relative;z-index:1;">dashboard preview</span>';
    if (p.image) {
      var alt = p.title[lang].replace(/<[^>]*>/g, '');
      imgWrap.innerHTML = '<img src="' + p.image + '" alt="' + alt + '" />';
      var img = imgWrap.querySelector('img');
      img.addEventListener('error', function () { imgWrap.innerHTML = fallback; });
    } else {
      imgWrap.innerHTML = fallback;
    }
  }

  function openModal(key) {
    currentPj = key;
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderModal();
  }
  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function initModal() {
    document.querySelectorAll('.project').forEach(function (p) {
      p.addEventListener('click', function (e) { e.preventDefault(); openModal(p.dataset.pj); });
    });
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', function (e) {
      if (e.target.id === 'modal') closeModal();
    });
  }

  /* ==========================================================
     Mobile overlay
     ========================================================== */
  function initOverlay() {
    var hamburger = document.getElementById('hamburger');
    var mobileOverlay = document.getElementById('mobileOverlay');
    var overlayClose = document.getElementById('overlayClose');
    if (!hamburger || !mobileOverlay) return;

    function openOverlay() {
      mobileOverlay.classList.add('open');
      mobileOverlay.removeAttribute('aria-hidden');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeOverlay() {
      mobileOverlay.classList.remove('open');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', openOverlay);
    overlayClose.addEventListener('click', closeOverlay);
    mobileOverlay.querySelectorAll('.overlay-link').forEach(function (link) {
      link.addEventListener('click', closeOverlay);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); closeOverlay(); }
    });
  }

  /* ==========================================================
     Language toggle
     ========================================================== */
  function initLang() {
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.dataset.lang;
        applyLang();
        renderModal();
      });
    });
    applyLang();
  }

  /* ==========================================================
     Boot
     ========================================================== */
  function boot() {
    safe(initLang, 'lang');
    safe(initPreloader, 'preloader');
    safe(initChart, 'chart');
    safe(initReveals, 'reveals');
    safe(initPhotoReveal, 'photoReveal');
    safe(initCounters, 'counters');
    safe(initStatementScrub, 'statementScrub');
    safe(initNavProgress, 'navProgress');
    safe(initScrollSpy, 'scrollSpy');
    safe(initCursor, 'cursor');
    safe(initCursorPreview, 'cursorPreview');
    safe(initSparklines, 'sparklines');
    safe(initModal, 'modal');
    safe(initOverlay, 'overlay');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
