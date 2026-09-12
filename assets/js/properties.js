/* ==========================================================================
   Navya Properties — properties.js
   Client-side filtering and sorting for the listing page. Filter state is
   mirrored into the query string, so a filtered view can be sent to someone
   in a WhatsApp message and it opens the same way.
   ========================================================================== */
(function () {
  'use strict';
  if (!document.querySelector('.js-results')) return;

  const { $, $$, propCard } = window.NP;

  const state = { type: '', city: '', status: '', pmin: '', pmax: '', verified: true, sort: 'new' };

  /* ── Build the pill rows from data, so a new type needs no HTML edit ── */
  const anyPill = (v, label, on) =>
    `<button type="button" class="fpill" data-v="${v}" aria-pressed="${on}">${label}</button>`;

  $('.js-f-type').innerHTML = anyPill('', 'All types', true) +
    TYPES.map(t => anyPill(t.slug, t.name, false)).join('');
  $('.js-f-city').innerHTML = anyPill('', 'Anywhere', true) +
    CITIES.map(c => anyPill(c.slug, c.name, false)).join('');

  /* ── Read the incoming query string ──────────────────────────────────── */
  const qs = new URLSearchParams(location.search);
  ['type', 'city', 'status', 'pmin', 'pmax', 'sort'].forEach(k => {
    if (qs.get(k)) state[k] = qs.get(k);
  });
  if (qs.get('verified') === '0') state.verified = false;

  /* ── Wire the controls ───────────────────────────────────────────────── */
  const groups = { type: '.js-f-type', city: '.js-f-city', status: '.js-f-status' };
  Object.entries(groups).forEach(([key, sel]) => {
    const row = $(sel);
    row.addEventListener('click', e => {
      const b = e.target.closest('.fpill');
      if (!b) return;
      state[key] = b.dataset.v;
      syncPills();
      render();
    });
  });

  $('#pmin').addEventListener('input', e => { state.pmin = e.target.value; render(); });
  $('#pmax').addEventListener('input', e => { state.pmax = e.target.value; render(); });
  $('.js-f-verified').addEventListener('change', e => { state.verified = e.target.checked; render(); });
  $('.js-sort').addEventListener('change', e => { state.sort = e.target.value; render(); });

  $$('.js-reset').forEach(b => b.addEventListener('click', () => {
    Object.assign(state, { type: '', city: '', status: '', pmin: '', pmax: '', verified: true, sort: 'new' });
    $('#pmin').value = ''; $('#pmax').value = '';
    $('.js-f-verified').checked = true;
    $('.js-sort').value = 'new';
    syncPills();
    render();
  }));

  function syncPills() {
    Object.entries(groups).forEach(([key, sel]) => {
      $$('.fpill', $(sel)).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state[key])));
    });
  }

  /* ── Compare on a single scale, so a per-acre quote is not treated as
        cheaper than the same land quoted as a total. ──────────────────── */
  function total(p) {
    if (p.basis === 'per acre')  return p.price * p.size;
    if (p.basis === 'per sq yd') return p.price * p.size;
    if (p.basis === 'monthly')   return p.price * 12;
    return p.price;
  }
  /* Everything in square yards, so 2 acre sorts above 500 sq yd. */
  function sqyd(p) {
    if (p.size == null) return 0;
    if (p.unit === 'acre')  return p.size * 4840;
    if (p.unit === 'sq ft') return p.size / 9;
    return p.size;
  }

  function render() {
    let list = PROPERTIES.slice();

    if (state.type)   list = list.filter(p => p.type === state.type);
    if (state.city)   list = list.filter(p => p.city === state.city);
    if (state.status) list = list.filter(p => p.status === state.status);
    if (state.verified) list = list.filter(p => p.verified);
    /* A listing with no price set is "on request" — keep it in the results
       rather than silently hiding it the moment someone sets a budget. */
    if (state.pmin)   list = list.filter(p => p.price == null || total(p) >= Number(state.pmin));
    if (state.pmax)   list = list.filter(p => p.price == null || total(p) <= Number(state.pmax));

    const sorters = {
      new:    (a, b) => b.added.localeCompare(a.added),
      plow:   (a, b) => (total(a) || Infinity) - (total(b) || Infinity),
      phigh:  (a, b) => (total(b) || 0) - (total(a) || 0),
      slarge: (a, b) => sqyd(b) - sqyd(a),
      ssmall: (a, b) => sqyd(a) - sqyd(b)
    };
    list.sort(sorters[state.sort] || sorters.new);

    $('.js-results').innerHTML = list.map(propCard).join('');
    $('.js-count').textContent = list.length;
    $('.js-count-word').textContent = list.length === 1 ? 'property' : 'properties';
    $('.js-empty').hidden = list.length > 0;

    /* Keep the URL shareable. */
    const q = new URLSearchParams();
    ['type', 'city', 'status', 'pmin', 'pmax'].forEach(k => { if (state[k]) q.set(k, state[k]); });
    if (state.sort !== 'new') q.set('sort', state.sort);
    if (!state.verified) q.set('verified', '0');
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
  }

  /* ── First paint ─────────────────────────────────────────────────────── */
  $('#pmin').value = state.pmin;
  $('#pmax').value = state.pmax;
  $('.js-f-verified').checked = state.verified;
  $('.js-sort').value = state.sort;
  syncPills();
  render();
})();

/* ──────────────────────────────────────────────────────────────────────────
   Rates are suppressed site-wide (config.showPrices). A budget box and a
   "sort by price" option are meaningless when no price is ever shown, so
   remove them rather than leave dead controls on the page.
   ────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (window.NP && window.NP.showPrices()) return;
  const grp = document.querySelector('#pmin');
  if (grp) { const g = grp.closest('.fgroup'); if (g) g.remove(); }
  document.querySelectorAll('.js-sort option').forEach(o => {
    if (o.value === 'plow' || o.value === 'phigh') o.remove();
  });
})();
