// Локальные комментарии к блокам сайта. Подключается только через dev/server.py.
// Кнопка слева внизу: «+» — режим комментирования (клик по блоку → заметка),
// счётчик — список всех заметок. Esc выходит из режима.
(() => {
  if (window.__dcm) return;
  window.__dcm = true;

  const API = '/dev/comments.json';
  let items = [];
  let mode = false;
  let showDone = false;
  let hoverEl = null;

  const css = `
  #dcm, #dcm * { box-sizing: border-box; font-family: Rooftop, system-ui, sans-serif; }
  #dcm-bar { position: fixed; left: 16px; bottom: 16px; z-index: 2147483000; display: flex; gap: 6px; }
  #dcm-bar button { border: 0; cursor: pointer; height: 40px; min-width: 40px; padding: 0 14px; border-radius: 999px;
    background: #2a2a2a; color: #fff; font-size: 14px; font-weight: 600; }
  #dcm-bar button.on { background: #18FF64; }
  #dcm-hl { position: fixed; z-index: 2147482990; pointer-events: none; display: none;
    background: rgba(24, 255, 100,.10); outline: 2px dashed #18FF64; outline-offset: -1px; border-radius: 4px; }
  #dcm-tag { position: fixed; z-index: 2147482991; pointer-events: none; display: none; padding: 2px 6px; border-radius: 4px;
    background: #18FF64; color: #fff; font-size: 11px; white-space: nowrap; max-width: 60vw; overflow: hidden; text-overflow: ellipsis; }
  #dcm-pins { position: absolute; left: 0; top: 0; width: 0; height: 0; z-index: 2147482980; }
  .dcm-pin { position: absolute; width: 26px; height: 26px; border-radius: 999px 999px 999px 4px; border: 0; cursor: pointer;
    background: #18FF64; color: #fff; font-size: 12px; font-weight: 700; padding: 0; }
  .dcm-pin.done { background: #555; }
  #dcm-pop { position: fixed; z-index: 2147483001; width: min(340px, calc(100vw - 32px)); padding: 12px; border-radius: 12px;
    background: #1c1c1c; color: #eee; display: none; }
  #dcm-pop .meta { font-size: 11px; color: #999; margin-bottom: 8px; line-height: 1.4; word-break: break-word; }
  #dcm-pop textarea { width: 100%; min-height: 90px; resize: vertical; border: 0; border-radius: 8px; padding: 8px;
    background: #2a2a2a; color: #fff; font-size: 14px; line-height: 1.4; }
  #dcm-pop .row { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
  #dcm-pop button, #dcm-panel button { border: 0; cursor: pointer; border-radius: 8px; padding: 7px 12px; font-size: 13px;
    background: #2f2f2f; color: #fff; }
  #dcm-pop button.primary { background: #18FF64; }
  #dcm-pop .sp { flex: 1; }
  #dcm-panel { position: fixed; left: 16px; bottom: 64px; z-index: 2147483000; width: min(380px, calc(100vw - 32px));
    max-height: 70vh; overflow: auto; border-radius: 12px; background: #1c1c1c; color: #eee; padding: 12px; display: none; }
  #dcm-panel .head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #aaa; }
  #dcm-panel .head label { margin-left: auto; display: flex; gap: 4px; align-items: center; cursor: pointer; }
  #dcm-panel .it { padding: 8px; border-radius: 8px; background: #252525; margin-bottom: 6px; cursor: pointer; font-size: 13px; line-height: 1.4; }
  #dcm-panel .it.done { opacity: .5; }
  #dcm-panel .it b { color: #18FF64; margin-right: 6px; }
  #dcm-panel .it small { display: block; color: #888; margin-top: 2px; }
  #dcm-panel .empty { font-size: 13px; color: #888; padding: 8px 0; }
  .dcm-flash { animation: dcmflash 1.2s ease 2; }
  @keyframes dcmflash { 50% { outline: 3px solid #18FF64; outline-offset: 2px; } }
  body.dcm-mode, body.dcm-mode * { cursor: crosshair !important; }
  body.dcm-mode #dcm, body.dcm-mode #dcm * { cursor: auto !important; }
  body.dcm-mode #dcm button { cursor: pointer !important; }
  `;

  const root = document.createElement('div');
  root.id = 'dcm';
  root.innerHTML = `
    <style>${css}</style>
    <div id="dcm-hl"></div><div id="dcm-tag"></div>
    <div id="dcm-bar">
      <button id="dcm-toggle" title="Режим комментирования (Esc — выйти)">+ Комментарий</button>
      <button id="dcm-list" title="Все комментарии">0</button>
    </div>
    <div id="dcm-pop">
      <div class="meta"></div>
      <textarea placeholder="Что поправить? ⌘/Ctrl+Enter — сохранить"></textarea>
      <div class="row">
        <button class="primary" data-a="save">Сохранить</button>
        <button data-a="done">Решено</button>
        <span class="sp"></span>
        <button data-a="del">Удалить</button>
        <button data-a="cancel">Отмена</button>
      </div>
    </div>
    <div id="dcm-panel"></div>`;
  document.body.appendChild(root);
  const pins = document.createElement('div');
  pins.id = 'dcm-pins';
  root.appendChild(pins);

  const $ = (s) => root.querySelector(s);
  const hl = $('#dcm-hl'), tag = $('#dcm-tag'), pop = $('#dcm-pop'), panel = $('#dcm-panel');
  const ta = pop.querySelector('textarea'), meta = pop.querySelector('.meta');

  // ---------- хранение ----------
  async function load() {
    try { items = await (await fetch(API, { cache: 'no-store' })).json(); } catch { items = []; }
    renderAll();
  }
  async function save() {
    renderAll();
    try {
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
      if (!r.ok) throw new Error(r.status);
    } catch (e) { alert('Комментарий не сохранился: сервер dev/server.py не отвечает'); }
  }

  // ---------- адрес элемента ----------
  const sections = () => [...document.querySelectorAll('.board')];
  function describe(el) {
    const board = el.closest('.board');
    const u = el.closest('.u');
    const base = u || document.body;
    const path = [];
    for (let n = el; n && n !== base; n = n.parentElement) {
      const p = n.parentElement;
      if (!p) break;
      path.unshift([...p.children].indexOf(n));
    }
    const heading = (u || board)?.querySelector('h1,h2,h3');
    return {
      section: board ? board.id : null,
      sectionNo: board ? sections().indexOf(board) + 1 : null,
      unit: u ? { board: u.dataset.board, unit: u.dataset.unit } : null,
      heading: heading ? heading.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) : '',
      path,
      tag: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''),
      snippet: (el.innerText || el.getAttribute('alt') || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 120),
    };
  }
  function resolve(c) {
    let base = document.body;
    if (c.unit) base = document.querySelector(`.u[data-board="${c.unit.board}"][data-unit="${c.unit.unit}"]`) || document.body;
    let n = base;
    for (const i of c.path || []) {
      const next = n.children[i];
      if (!next) break;
      n = next;
    }
    return n;
  }
  function rectOf(el) {
    // display: contents даёт пустой прямоугольник — берём первого видимого потомка или родителя
    let r = el.getBoundingClientRect();
    if (r.width || r.height) return r;
    for (const ch of el.querySelectorAll('*')) { r = ch.getBoundingClientRect(); if (r.width || r.height) return r; }
    return el.parentElement ? rectOf(el.parentElement) : r;
  }
  const isOurs = (el) => el && el.closest && el.closest('#dcm');
  const label = (d) => [d.sectionNo ? String(d.sectionNo).padStart(2, '0') : '', d.section, d.heading].filter(Boolean).join(' · ');

  // ---------- рендер ----------
  function renderAll() {
    const open = items.filter((c) => c.status !== 'done').length;
    $('#dcm-list').textContent = open + (items.length > open ? ` / ${items.length}` : '');
    placePins();
    if (panel.style.display === 'block') renderPanel();
  }
  function placePins() {
    pins.innerHTML = '';
    for (const c of items) {
      if (c.status === 'done' && !showDone) continue;
      const r = rectOf(resolve(c));
      const b = document.createElement('button');
      b.className = 'dcm-pin' + (c.status === 'done' ? ' done' : '');
      b.textContent = c.n;
      b.title = c.text;
      b.style.left = Math.max(0, Math.min(r.left + scrollX - 8, document.documentElement.clientWidth - 30)) + 'px';
      b.style.top = Math.max(0, r.top + scrollY - 10) + 'px';
      b.onclick = (e) => { e.stopPropagation(); openPop(c, b.getBoundingClientRect()); };
      pins.appendChild(b);
    }
  }
  function renderPanel() {
    const list = items.filter((c) => showDone || c.status !== 'done');
    panel.innerHTML = `<div class="head">Комментарии<label><input type="checkbox" ${showDone ? 'checked' : ''}> решённые</label></div>` +
      (list.length ? '' : '<div class="empty">Пока пусто. Нажмите «+ Комментарий» и кликните по блоку.</div>');
    panel.querySelector('input').onchange = (e) => { showDone = e.target.checked; renderAll(); renderPanel(); };
    for (const c of list) {
      const d = document.createElement('div');
      d.className = 'it' + (c.status === 'done' ? ' done' : '');
      d.innerHTML = `<b>${c.n}</b><span></span><small></small>`;
      d.querySelector('span').textContent = c.text;
      d.querySelector('small').textContent = label(c) + (c.snippet ? ` — «${c.snippet.slice(0, 60)}»` : '');
      d.onclick = () => {
        const el = resolve(c);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const t = el.getBoundingClientRect().width ? el : el.parentElement;
        t.classList.remove('dcm-flash'); void t.offsetWidth; t.classList.add('dcm-flash');
        setTimeout(() => t.classList.remove('dcm-flash'), 2600);
      };
      panel.appendChild(d);
    }
  }

  // ---------- форма ----------
  let editing = null; // { comment } или { draft }
  function openPop(c, at, draft) {
    editing = c ? { comment: c } : { draft };
    const d = c || draft;
    meta.textContent = (c ? `#${c.n} · ` : 'Новый · ') + label(d) + (d.snippet ? ` — «${d.snippet.slice(0, 80)}»` : '');
    ta.value = c ? c.text : '';
    pop.querySelector('[data-a="done"]').style.display = c ? '' : 'none';
    pop.querySelector('[data-a="del"]').style.display = c ? '' : 'none';
    pop.querySelector('[data-a="done"]').textContent = c && c.status === 'done' ? 'Открыть снова' : 'Решено';
    pop.style.display = 'block';
    const w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(16, Math.min(at.left, innerWidth - w - 16)) + 'px';
    pop.style.top = (at.bottom + 8 + h < innerHeight ? at.bottom + 8 : Math.max(16, at.top - h - 8)) + 'px';
    ta.focus();
  }
  function closePop() { pop.style.display = 'none'; editing = null; }
  pop.addEventListener('click', (e) => {
    const a = e.target.dataset.a;
    if (!a || !editing) return;
    if (a === 'cancel') return closePop();
    if (a === 'save') {
      const text = ta.value.trim();
      if (!text) return ta.focus();
      if (editing.comment) {
        editing.comment.text = text;
        editing.comment.updated = new Date().toISOString();
      } else {
        const n = items.reduce((m, c) => Math.max(m, c.n || 0), 0) + 1;
        items.push({ id: Date.now().toString(36), n, status: 'open', text, created: new Date().toISOString(), viewport: innerWidth, ...editing.draft });
      }
    }
    if (a === 'done') editing.comment.status = editing.comment.status === 'done' ? 'open' : 'done';
    if (a === 'del') {
      if (!confirm(`Удалить комментарий #${editing.comment.n}?`)) return;
      items = items.filter((c) => c !== editing.comment);
    }
    closePop();
    save();
  });
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) pop.querySelector('[data-a="save"]').click();
    if (e.key === 'Escape') closePop();
    e.stopPropagation();
  });

  // ---------- режим выбора ----------
  function setMode(on) {
    mode = on;
    document.body.classList.toggle('dcm-mode', on);
    $('#dcm-toggle').classList.toggle('on', on);
    $('#dcm-toggle').textContent = on ? 'Выберите блок · Esc' : '+ Комментарий';
    if (!on) { hl.style.display = tag.style.display = 'none'; hoverEl = null; }
  }
  $('#dcm-toggle').onclick = () => { closePop(); setMode(!mode); };
  $('#dcm-list').onclick = () => {
    const on = panel.style.display !== 'block';
    panel.style.display = on ? 'block' : 'none';
    if (on) renderPanel();
  };

  window.addEventListener('mousemove', (e) => {
    if (!mode) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || isOurs(el)) { hl.style.display = tag.style.display = 'none'; hoverEl = null; return; }
    hoverEl = el;
    const r = el.getBoundingClientRect();
    Object.assign(hl.style, { display: 'block', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    const d = describe(el);
    tag.textContent = (d.sectionNo ? String(d.sectionNo).padStart(2, '0') + ' · ' : '') + d.tag;
    Object.assign(tag.style, { display: 'block', left: Math.max(0, r.left) + 'px', top: Math.max(0, r.top - 20) + 'px' });
  }, true);

  // Колесо мыши с Alt — выбрать родительский блок вместо самого мелкого
  window.addEventListener('wheel', (e) => {
    if (!mode || !e.altKey || !hoverEl) return;
    e.preventDefault();
    const next = e.deltaY < 0 ? hoverEl.parentElement : hoverEl.firstElementChild;
    if (!next || next === document.documentElement) return;
    hoverEl = next;
    const r = hoverEl.getBoundingClientRect();
    Object.assign(hl.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    tag.textContent = describe(hoverEl).tag;
  }, { capture: true, passive: false });

  const block = (e) => {
    if (!mode || isOurs(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  };
  ['pointerdown', 'mousedown', 'mouseup', 'pointerup', 'keydown'].forEach((t) =>
    window.addEventListener(t, (e) => { if (t === 'keydown') return; block(e); }, true));
  window.addEventListener('click', (e) => {
    if (!mode || isOurs(e.target)) return;
    block(e);
    const el = hoverEl || e.target;
    const r = el.getBoundingClientRect();
    setMode(false);
    openPop(null, r.height > innerHeight / 2 ? { left: e.clientX, top: e.clientY, bottom: e.clientY } : r, describe(el));
  }, true);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (mode) setMode(false); else if (pop.style.display === 'block') closePop(); }
  });

  // Пины следуют за вёрсткой: перерисовка разделов, ресайз, подгрузка картинок
  let t;
  const later = () => { clearTimeout(t); t = setTimeout(placePins, 120); };
  addEventListener('resize', later);
  addEventListener('load', later);
  new MutationObserver((ms) => { if (ms.some((m) => !isOurs(m.target))) later(); })
    .observe(document.body, { childList: true, subtree: true });
  setInterval(placePins, 2000);

  load();
})();
