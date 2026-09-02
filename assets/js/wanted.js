/* ==========================================================================
   Navya Properties — wanted.js
   The Wanted board: filter the open requests, and drop the ones that have
   passed their 45-day life so the page never shows a stale ask.
   ========================================================================== */
(function () {
  'use strict';
  if (!document.querySelector('.js-wresults')) return;

  const { $, $$, wantedCard, daysSince } = window.NP;
  const state = { type: '', city: '' };

  const pill = (v, label, on) =>
    `<button type="button" class="fpill" data-v="${v}" aria-pressed="${on}">${label}</button>`;

  /* Only offer a filter for something that is actually on the board. */
  const live = WANTED.filter(w => daysSince(w.posted) < 45);
  const usedTypes  = TYPES.filter(t => live.some(w => w.type === t.slug));
  const usedCities = CITIES.filter(c => live.some(w => w.city === c.slug));

  $('.js-w-type').innerHTML = pill('', 'All types', true) +
    usedTypes.map(t => pill(t.slug, t.name, false)).join('');
  $('.js-w-city').innerHTML = pill('', 'Anywhere', true) +
    usedCities.map(c => pill(c.slug, c.name, false)).join('');

  const qs = new URLSearchParams(location.search);
  if (qs.get('type')) state.type = qs.get('type');
  if (qs.get('city')) state.city = qs.get('city');

  const groups = { type: '.js-w-type', city: '.js-w-city' };
  Object.entries(groups).forEach(([key, sel]) => {
    $(sel).addEventListener('click', e => {
      const b = e.target.closest('.fpill');
      if (!b) return;
      state[key] = b.dataset.v;
      sync(); render();
    });
  });

  $$('.js-wreset').forEach(b => b.addEventListener('click', () => {
    state.type = ''; state.city = '';
    sync(); render();
  }));

  function sync() {
    Object.entries(groups).forEach(([key, sel]) => {
      $$('.fpill', $(sel)).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === state[key])));
    });
  }

  function render() {
    let list = live.slice().sort((a, b) => b.posted.localeCompare(a.posted));
    if (state.type) list = list.filter(w => w.type === state.type);
    if (state.city) list = list.filter(w => w.city === state.city);

    $('.js-wresults').innerHTML = list.map(wantedCard).join('');
    $('.js-wcount').textContent = list.length;
    $('.js-wcount-word').textContent = list.length === 1 ? 'active request' : 'active requests';
    $('.js-wempty').hidden = list.length > 0;

    const q = new URLSearchParams();
    if (state.type) q.set('type', state.type);
    if (state.city) q.set('city', state.city);
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash);
  }

  sync();
  render();
})();
