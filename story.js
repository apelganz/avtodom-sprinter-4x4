/* story.html: пиннинг-сцены (CSS sticky + прогресс скролла), появление разворотов, плейсхолдеры картинок.
   Без зависимостей. Основной сайт этот файл не использует. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ── Тема: тёмная (ночь) или светлая (день) ──
     Светлая тема берёт дневные версии картинок: scene1-turn-030.webp → scene1-turn-030-day.webp.
     Нет дневной — остаётся ночная. Выбор запоминается в браузере. */
  var root = document.documentElement;
  var theme = function () { return root.dataset.theme === 'light' ? 'day' : 'night'; };
  var dayName = function (src) { return src.replace(/(-day)?\.webp$/, '-day.webp'); };
  var nightName = function (src) { return src.replace(/-day\.webp$/, '.webp'); };

  /* ── Плейсхолдеры ── */
  function markMissing(img) { var f = img.closest('.story-img'); if (f) f.classList.add('missing'); }
  var plain = [].filter.call(document.querySelectorAll('.story-img > img'), function (img) { return !img.closest('.story-seq'); });
  plain.forEach(function (img) {
    img.addEventListener('error', function () {
      // дневной версии нет — откатываемся на ночную, это не «пропавшая картинка»
      if (/-day\.webp$/.test(img.getAttribute('src'))) { img.src = nightName(img.getAttribute('src')); return; }
      markMissing(img);
    });
    img.addEventListener('load', function () { var f = img.closest('.story-img'); if (f) f.classList.remove('missing', 'swapping'); });
    if (img.complete && !img.naturalWidth) markMissing(img);
  });
  function applyImages() {
    plain.forEach(function (img) {
      var src = img.getAttribute('src'); if (!src) return;
      var next = theme() === 'day' ? dayName(src) : nightName(src);
      if (next === src) return;
      var f = img.closest('.story-img');
      // уже загруженную картинку меняем через короткое затухание
      if (f && img.complete && img.naturalWidth) { f.classList.add('swapping'); setTimeout(function () { img.src = next; }, 200); }
      else img.src = next;
    });
    seqs.forEach(function (s) { s.refresh(); });
  }
  // подписи плейсхолдеров — из story-assets.json (если открыть файл без сервера, останется только ID)
  fetch('story-assets.json').then(function (r) { return r.json(); }).then(function (data) {
    var byId = {};
    data.assets.forEach(function (a) { byId[a.id] = a; });
    document.querySelectorAll('.story-img[data-id]').forEach(function (f) {
      var a = byId[f.dataset.id], cap = f.querySelector('.story-fallback');
      if (!a || !cap) return;
      cap.innerHTML = '';
      var b = document.createElement('b'); b.textContent = a.id; cap.appendChild(b);
      var m = document.createElement('em'); m.textContent = a.aspect_ratio + ' · ' + a.width + '×' + a.height + ' · ' + (a.background === 'transparent' ? 'прозрачный фон' : 'фон в кадре'); cap.appendChild(m);
      if (f.offsetWidth > 260) { var s = document.createElement('span'); s.textContent = a.where; cap.appendChild(s); }
    });
  }).catch(function () {});

  /* ── Вращение: серия кадров, которая листается скроллом ──
     <figure class="story-seq" data-seq="scene1-turn" data-deg-step="20" data-deg-offset="10"> → assets/story/scene1-turn-010.webp, 030 … 350.
     Кадры грузятся заранее; если какого-то нет — показывается ближайший готовый, если нет ни одного — плейсхолдер с углом. */
  function makeSeq(fig) {
    var name = fig.dataset.seq, stepDeg = +fig.dataset.degStep || 10, off = +fig.dataset.degOffset || 0, n = Math.round(360 / stepDeg);
    var img = fig.querySelector('img'), cap = fig.querySelector('.story-fallback');
    var ok = { night: {}, day: {} }, started = {}, cur = null, want = 0;
    var file = function (deg, t) { return 'assets/story/' + name + '-' + String(deg).padStart(3, '0') + (t === 'day' ? '-day' : '') + '.webp'; };
    var dist = function (a, b) { var d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };
    var nearest = function (set) { var best = null; for (var d in set) if (set[d] && (best === null || dist(+d, want) < dist(best, want))) best = +d; return best; };
    function load(t) {
      if (started[t]) return; started[t] = true;
      for (var i = 0; i < n; i++) (function (deg) {
        var im = new Image();
        im.onload = function () { ok[t][deg] = true; show(want, true); };
        im.onerror = function () { ok[t][deg] = false; };
        im.src = file(deg, t);
      })(off + i * stepDeg);
    }
    function show(angle, keep) {
      if (!keep) want = ((off + Math.round((angle - off) / stepDeg) * stepDeg) % 360 + 360) % 360;
      var t = theme(), best = nearest(ok[t]);
      if (best === null && t === 'day') { t = 'night'; best = nearest(ok.night); }   // дневных кадров нет — ночные
      if (best === null) {
        fig.classList.add('missing');
        cap.innerHTML = '<b>' + name + '-' + String(want).padStart(3, '0') + '</b><em>кадр ' + ((want - off) / stepDeg + 1) + ' из ' + n + ' · ' + want + '° · 16:9</em>' +
          (fig.offsetWidth > 260 ? '<span>Серия вращения: ' + n + ' кадров с шагом ' + stepDeg + '°. Как сделать — story-assets.md</span>' : '');
        return;
      }
      fig.classList.remove('missing');
      var key = t + best;
      if (key !== cur) { cur = key; img.src = file(best, t); }
    }
    load('night'); load('day');
    return { show: show, refresh: function () { show(want, true); } };
  }
  var seqs = [].map.call(document.querySelectorAll('.story-seq'), makeSeq);
  var ease = function (t) { return t * t * (3 - 2 * t); };

  /* ── Сцены ── */
  var scenes = [].map.call(document.querySelectorAll('.story-scene'), function (el, i) {
    var seqFig = el.querySelector('.story-seq');
    var angles = [].map.call(el.querySelectorAll('.story-layer'), function (l) { return +l.dataset.angle || 0; });
    return {
      el: el, first: i === 0,
      seq: seqFig ? seqs[[].indexOf.call(document.querySelectorAll('.story-seq'), seqFig)] : null, angles: angles,
      a0: +el.dataset.angleStart || 0, a1: +el.dataset.angleEnd || 0,
      deg: el.querySelector('.story-deg'),
      steps: +el.dataset.steps || 1,
      drive: el.querySelector('.story-drive'),
      stage: el.querySelector('.story-stage'),
      states: el.querySelectorAll('.story-state, .story-node'),
      layers: el.querySelectorAll('.story-layer'),
      hud: el.querySelector('.story-hud'),
      step: -1, x: 0, tx: 0
    };
  });

  function setStep(s, k) {
    if (s.step === k) return;
    s.step = k;
    s.states.forEach(function (n) { n.classList.toggle('is-on', +n.dataset.step === k); });
    var zoom = '1 0% 0%';
    s.layers.forEach(function (l) {
      var on = +l.dataset.step === k;
      l.classList.toggle('is-on', on);
      if (on && l.dataset.zoom) zoom = l.dataset.zoom;
    });
    var z = zoom.split(' ');
    s.stage.style.transform = 'scale(' + z[0] + ') translate(' + (z[1] || '0%') + ', ' + (z[2] || '0%') + ')';
  }

  var ticking = false;
  function update() {
    ticking = false;
    var vh = innerHeight, moving = false;
    scenes.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      var run = Math.max(1, r.height - vh);
      var p = clamp(-r.top / run, 0, 1);
      // шаги занимают середину сцены; по краям — въезд и отъезд машины
      var k = Math.min(s.steps - 1, Math.floor(clamp((p - 0.04) / 0.8, 0, 0.9999) * s.steps));
      setStep(s, k);
      if (s.hud) s.hud.style.setProperty('--p', p.toFixed(4));
      if (s.seq) {
        // опорные точки: начало сцены, середина каждого шага (ракурс шага), конец сцены;
        // между ними — плавный доворот, у опорных точек машина почти замирает
        var pts = [[0, s.a0]];
        for (var j = 0; j < s.steps; j++) pts.push([0.04 + 0.8 * (j + 0.5) / s.steps, s.angles[j]]);
        pts.push([1, s.a1]);
        var angle = s.a1;
        for (var q = 1; q < pts.length; q++) if (p <= pts[q][0]) {
          var t = (p - pts[q - 1][0]) / (pts[q][0] - pts[q - 1][0]);
          angle = pts[q - 1][1] + (pts[q][1] - pts[q - 1][1]) * ease(clamp(t, 0, 1));
          break;
        }
        s.seq.show(angle);
        if (s.deg) s.deg.textContent = Math.round(((angle % 360) + 360) % 360) + '°';
      }
      // въезд справа (кроме первой сцены) и отъезд влево — в процентах ширины окна
      var enter = s.first ? 0 : 1 - clamp(p / 0.08, 0, 1);
      var exit = clamp((p - 0.88) / 0.12, 0, 1);
      s.tx = reduce ? 0 : (enter * enter * 105 - exit * exit * 120);
      // лёгкое следование вместо прыжка, чтобы не было рывков от колеса
      s.x += (s.tx - s.x) * (reduce ? 1 : 0.18);
      if (Math.abs(s.tx - s.x) < 0.05) s.x = s.tx; else moving = true;
      s.drive.style.transform = 'translate3d(' + s.x.toFixed(3) + 'vw, 0, 0)';
      s.drive.style.opacity = reduce ? 1 - exit : 1;
    });
    if (moving) request();
  }
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  update();

  /* ── Кнопка темы ── */
  var btn = document.querySelector('.story-theme');
  function setTheme(light) {
    if (light) root.dataset.theme = 'light'; else delete root.dataset.theme;
    if (btn) btn.setAttribute('aria-label', light ? 'Переключить на тёмную тему' : 'Переключить на светлую тему');
    try { localStorage.setItem('story-theme', light ? 'light' : 'dark'); } catch (e) {}
    applyImages();
  }
  if (btn) btn.addEventListener('click', function () { setTheme(root.dataset.theme !== 'light'); });
  if (root.dataset.theme === 'light') applyImages();

  /* ── Развороты: появление при входе в кадр ── */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
