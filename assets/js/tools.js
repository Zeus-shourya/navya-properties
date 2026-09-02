/* ==========================================================================
   Navya Properties — tools.js
   The Resources page: four calculators, a land-unit converter, and the
   guide / FAQ / journal lists rendered from data.js.

   Every calculator recomputes on input, so there is no "Calculate" button
   to press and no state to get out of sync.
   ========================================================================== */
(function () {
  'use strict';
  if (!document.querySelector('#tools, #converter, #faq, #journal, #guides')) return;

  const { $, $$, fmtINR, fmtDate, ux, ICON } = window.NP;

  const num = sel => Number($(sel).value) || 0;
  const pct = n => (isFinite(n) ? n.toFixed(2) : '0.00') + '%';

  /* Recompute whenever anything inside the given root changes. */
  function live(rootSel, fn) {
    const root = $(rootSel);
    if (!root) return;
    root.addEventListener('input', fn);
    fn();
  }

  /* ══ 1. Appreciation ════════════════════════════════════════════════ */
  live('#tools', function appreciation() {
    if (!$('#ap-amt')) return;
    const amt  = num('#ap-amt');
    const yrs  = Math.max(1, num('#ap-yrs'));
    const rate = num('#ap-rate') / 100;
    const cost = num('#ap-cost') / 100;

    const allIn = amt * (1 + cost);
    const final = amt * Math.pow(1 + rate, yrs);
    const gain  = final - allIn;

    $('.js-ap-yrs').textContent  = yrs + (yrs === 1 ? ' year' : ' years');
    $('.js-ap-final').textContent = fmtINR(final);
    $('.js-ap-cost').textContent  = fmtINR(allIn);
    $('.js-ap-gain').textContent  = (gain < 0 ? '−' : '') + fmtINR(Math.abs(gain));
    $('.js-ap-gain').classList.toggle('pos', gain >= 0);
    $('.js-ap-mult').textContent  = allIn ? (final / allIn).toFixed(2) + '×' : '—';
  });

  /* ══ 2. Rental yield ════════════════════════════════════════════════ */
  live('#tools', function yield_() {
    if (!$('#ry-amt')) return;
    const val  = num('#ry-amt');
    const rent = num('#ry-rent');
    const exp  = num('#ry-exp');
    const vac  = num('#ry-vac') / 100;

    const collected = rent * 12 * (1 - vac);
    const gross = val ? (rent * 12) / val * 100 : 0;
    const net   = val ? (collected - exp) / val * 100 : 0;
    const years = (collected - exp) > 0 ? val / (collected - exp) : 0;

    $('.js-ry-gross').textContent = pct(gross);
    $('.js-ry-net').textContent   = pct(net);
    $('.js-ry-net').classList.toggle('pos', net >= 0);
    $('.js-ry-year').textContent  = fmtINR(collected);
    $('.js-ry-pay').textContent   = years ? years.toFixed(1) + ' yrs' : '—';
  });

  /* ══ 3. Capital gains ═══════════════════════════════════════════════ */
  live('#tools', function ltcg() {
    if (!$('#cg-buy')) return;
    const buy  = num('#cg-buy');
    const sell = num('#cg-sell');
    const idx  = Math.max(1, num('#cg-idx'));
    const imp  = num('#cg-imp');

    /* New route: flat 12.5%, cost taken at what you actually paid. */
    const gainNew = Math.max(0, sell - buy - imp);
    const taxNew  = gainNew * 0.125;

    /* Old route: 20%, cost lifted by the CII ratio. */
    const gainOld = Math.max(0, sell - (buy * idx) - imp);
    const taxOld  = gainOld * 0.20;

    const best = Math.min(taxNew, taxOld);

    $('.js-cg-new').textContent  = fmtINR(taxNew);
    $('.js-cg-old').textContent  = fmtINR(taxOld);
    $('.js-cg-best').textContent = fmtINR(best);
    $('.js-cg-net').textContent  = fmtINR(sell - best);

    /* Flag whichever route is cheaper. */
    $('.js-cg-new').classList.toggle('pos', taxNew <= taxOld);
    $('.js-cg-old').classList.toggle('pos', taxOld < taxNew);
  });

  /* ══ 4. Land vs the alternatives ════════════════════════════════════ */
  live('#tools', function compare() {
    const box = $('.js-compare');
    if (!box || !$('#cp-amt')) return;
    const amt = num('#cp-amt');
    const yrs = Math.max(1, num('#cp-yrs'));

    const rows = [
      { name: 'Land',       r: num('#cp-land') },
      { name: 'Index fund', r: num('#cp-eq') },
      { name: 'Gold',       r: num('#cp-gold') },
      { name: 'Bank FD',    r: num('#cp-fd') }
    ].map(x => Object.assign(x, { v: amt * Math.pow(1 + x.r / 100, yrs) }));

    const top = Math.max.apply(null, rows.map(x => x.v)) || 1;

    box.innerHTML = rows.map(x =>
      `<div class="bar">
         <div class="bar__t"><span>${x.name} &middot; ${x.r}%</span><b>${fmtINR(x.v)}</b></div>
         <div class="bar__track"><span class="bar__fill" style="width:${Math.max(4, x.v / top * 100)}%"></span></div>
       </div>`).join('');
  });

  /* ══ 5. Land-unit converter ═════════════════════════════════════════
     Everything is held in square yards, the unit a patwari record and a
     colony brochure actually agree on. The bigha here is the pucca bigha
     used in Haryana and western UP — other states differ, which is why
     it is spelled out on the page rather than assumed.                  */
  const UNITS = [
    { key: 'sq yd',   name: 'Square yard (gaj)', sqyd: 1 },
    { key: 'sq ft',   name: 'Square foot',       sqyd: 1 / 9 },
    { key: 'sq m',    name: 'Square metre',      sqyd: 1.19599 },
    { key: 'marla',   name: 'Marla',             sqyd: 30.25 },
    { key: 'kanal',   name: 'Kanal',             sqyd: 605 },
    { key: 'biswa',   name: 'Biswa (pucca)',     sqyd: 151.25 },
    { key: 'bigha',   name: 'Bigha (pucca)',     sqyd: 3025 },
    { key: 'acre',    name: 'Acre / killa',      sqyd: 4840 },
    { key: 'hectare', name: 'Hectare',           sqyd: 11959.9 }
  ];

  (function converter() {
    const sel = $('#uc-unit'), val = $('#uc-val'), out = $('.js-conv');
    if (!sel || !out) return;

    sel.innerHTML = UNITS.map(u => `<option value="${u.key}">${u.name}</option>`).join('');
    sel.value = 'acre';

    function draw() {
      const from = UNITS.find(u => u.key === sel.value) || UNITS[0];
      const base = (Number(val.value) || 0) * from.sqyd;

      out.innerHTML = UNITS.map(u => {
        const n = base / u.sqyd;
        const shown = n === 0 ? '0'
                    : n >= 1000 ? Math.round(n).toLocaleString('en-IN')
                    : n >= 1    ? n.toFixed(2).replace(/\.?0+$/, '')
                    : n.toFixed(4).replace(/\.?0+$/, '');
        const isSelf = u.key === from.key;
        return `<div class="conv__cell"${isSelf ? ' style="background:var(--brand-soft)"' : ''}>
                  <span>${u.name}</span><b>${shown}</b>
                </div>`;
      }).join('');
    }

    sel.addEventListener('change', draw);
    val.addEventListener('input', draw);
    draw();
  })();

  /* ══ 6. Guides, FAQ and journal from data.js ════════════════════════ */
  const guides = $('.js-guides');
  if (guides) guides.innerHTML = GUIDES.map(g =>
    `<article class="rcard">
       <div class="guide__img" style="aspect-ratio:16/10;border-radius:var(--r);overflow:hidden">
         <img src="${ux(g.img, 560)}" alt="" loading="lazy">
       </div>
       <span class="eyebrow eyebrow--bare eyebrow--muted">${g.tag}</span>
       <h3 class="h3">${g.title}</h3>
       <p>${g.text}</p>
       <a class="link-arw js-wa" href="#" data-msg="Hello Navya Properties, please send me the guide: ${g.title}">
         Ask for the PDF ${ICON.arw}</a>
     </article>`).join('');

  const faq = $('.js-faq');
  if (faq) faq.innerHTML = FAQS.map((f, i) =>
    `<div class="faq__item" data-open="false">
       <button class="faq__q" aria-expanded="false" aria-controls="faq-a-${i}">
         ${f.q}
         <span class="faq__ico">${ICON.plus}</span>
       </button>
       <div class="faq__a" id="faq-a-${i}"><div><p>${f.a}</p></div></div>
     </div>`).join('');

  const jr = $('.js-journal-all');
  if (jr) jr.innerHTML = JOURNAL.map(j =>
    `<a class="jcard" href="${j.slug}">
       <div class="jcard__img"><img src="${ux(j.img, 640)}" alt="" loading="lazy"></div>
       <time>${fmtDate(j.date)}</time>
       <h3 class="h3">${j.title}</h3>
       <p>${j.text}</p>
     </a>`).join('');
})();
