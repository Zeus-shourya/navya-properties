/* ==========================================================================
   Navya Properties — property.js
   One template renders every listing: property.html?id=np-201 looks the id up
   in data.js and fills the page. Adding a property never means adding a page.

   Optional fields are all rendered conditionally, so a listing with nothing
   but the basics still produces a clean page.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const root = document.querySelector('.js-pdp');
  if (!root) return;

  const { $, fmtINR, fmtSize, fmtDate, typeName, cityName, propCard, ICON, ux, waLink } = window.NP;
  const CFG = window.NAVYA;

  const id = new URLSearchParams(location.search).get('id');
  const p  = (typeof PROPERTIES !== 'undefined') && PROPERTIES.find(x => x.id === id);

  /* ── Unknown id ──────────────────────────────────────────────────────── */
  if (!p) {
    root.innerHTML = `
      <div class="wrap notfound">
        <h1 class="h2">That listing is no longer here.</h1>
        <p class="lede mt-m" style="margin-inline:auto">It may have sold, or the link may be mistyped.
           Everything currently available is on the listings page.</p>
        <div class="flex-btns mt-m" style="justify-content:center">
          <a class="btn btn--brand" href="properties.html">Browse all listings</a>
          <a class="btn btn--ghost" href="contact.html">Tell us what you need</a>
        </div>
      </div>`;
    document.title = 'Listing not found — Navya Properties';
    return;
  }

  /* ── Head ────────────────────────────────────────────────────────────── */
  document.title = p.title + ' — Navya Properties';
  const desc = `${fmtSize(p)} ${typeName(p.type).toLowerCase()} at ${cityName(p.city)}. ${p.note || ''}`.trim();
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', desc.slice(0, 300));
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute('href', 'https://www.navyaproperty.com/property.html?id=' + p.id);

  /* ── Pieces ──────────────────────────────────────────────────────────── */
  const priced = p.price != null;
  const basis = !priced               ? 'Speak to us'
              : p.basis === 'monthly'  ? 'Per month'
              : p.basis === 'per acre' ? 'Per acre'
              : p.basis === 'per sq yd'? 'Per sq yd'
              : 'Total';

  const badges = [
    p.verified ? `<span class="chip chip--verified">${ICON.check} Verified</span>` : '',
    p.status === 'sold'   ? '<span class="chip chip--sold">Sold</span>' : '',
    p.status === 'rented' ? '<span class="chip chip--sold">Leased</span>' : '',
    (p.featured && p.status === 'available') ? '<span class="chip chip--gold">Featured</span>' : ''
  ].join('');

  const priceEl = priced
    ? `<b>${fmtINR(p.price)}</b>`
    : `<b class="ask">On request</b>`;

  const msg = `Hello ${CFG.brand.name}, I am interested in ${p.id.toUpperCase()} — ${p.title}.`;

  /* Revenue-record rows, only the ones this listing actually has. */
  const recRows = [
    ['Village',    p.village],
    ['Hadbast no', p.hadbast],
    ['Tehsil',     p.tehsil],
    ['District',   p.district],
    ['Landmark',   p.landmark],
    ['Frontage',   p.frontage],
    ['Listing ref', p.id.toUpperCase()]
  ].filter(r => r[1]);

  const recPanel = recRows.length ? `
    <div class="rec">
      <div class="rec__h"><span style="color:var(--brand)">${ICON.pin}</span>
        <h3 class="h4">Revenue record</h3></div>
      <dl>${recRows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    </div>` : '';

  /* Google map embed needs no API key in this form. */
  const mapSec = (p.lat && p.lng) ? `
    <section class="pdp__sec">
      <h2 class="h2">Where it <em>is.</em></h2>
      <div class="mapbox">
        <iframe title="Map showing ${p.title}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=${p.lat},${p.lng}&z=15&output=embed"></iframe>
        <div class="mapbox__foot">
          <span class="mapbox__coords">${p.lat}, ${p.lng}</span>
          <a class="btn btn--ghost btn--sm" target="_blank" rel="noopener"
             href="${p.mapUrl || 'https://maps.google.com/?q=' + p.lat + ',' + p.lng}">
             Open in Google Maps ${ICON.arw}</a>
        </div>
      </div>
    </section>` : '';

  const shajraSec = p.shajra ? `
    <section class="pdp__sec">
      <h2 class="h2">The <em>paper</em> version.</h2>
      <p class="lede mt-s" style="margin-bottom:18px">The revenue field map for this estate, as held at the
         tehsil. Killa numbers and boundary lengths are marked on it; we walk each boundary against this
         copy before a listing goes up.</p>
      <div class="shajra">
        <a class="shajra__img" href="${p.shajra.src}" target="_blank" rel="noopener">
          <img src="${p.shajra.src}" alt="Revenue field map for ${p.village || p.title}" loading="lazy">
        </a>
        <p class="shajra__cap"><b>${p.shajra.caption}</b>
           Shown for orientation only — take your own certified copy from the tehsil before you commit,
           and read it with us on site rather than on a screen.</p>
      </div>
    </section>` : '';

  /* ── Render ──────────────────────────────────────────────────────────── */
  root.innerHTML = `
    <div class="wrap">
      <p class="phead__crumb"><a href="index.html">Home</a> &nbsp;/&nbsp;
        <a href="properties.html">Properties</a> &nbsp;/&nbsp;
        <a href="properties.html?city=${p.city}">${cityName(p.city)}</a></p>

      <div class="pdp__hero">
        <img src="${ux(p.img, 1600)}" alt="${p.title}" width="1600" height="700">
        <div class="pcard__badges">${badges}</div>
      </div>

      <div class="pdp__grid">
        <div>
          <span class="eyebrow">${typeName(p.type)}</span>
          <h1 class="h2 mt-s">${p.title}</h1>

          <div class="pdp__key mt-m">
            <div><span>Size</span><b>${fmtSize(p)}</b></div>
            <div><span>${basis}</span>${priceEl.replace('<b', '<b')}</div>
            <div><span>Location</span><b>${cityName(p.city)}</b></div>
            <div><span>Listed</span><b>${fmtDate(p.added)}</b></div>
          </div>

          ${p.note ? `<div class="pdp__body mt-l"><p>${p.note}</p></div>` : ''}

          ${mapSec}
          ${shajraSec}
        </div>

        <aside class="enq">
          <div class="enq__card">
            <div class="enq__price">${priceEl}<span>${basis}</span></div>
            <a class="btn btn--brand btn--block" target="_blank" rel="noopener"
               href="${waLink(CFG.phones[0].tel, msg)}">${ICON.wa} Enquire on WhatsApp</a>
            <a class="btn btn--ghost btn--block" href="contact.html?ref=${p.id}">Send an enquiry ${ICON.arw}</a>
            <p class="enq__note">Or call either number below. We will tell you the brokerage before the
               first site visit, and drive you out to walk the boundary yourself.</p>
          </div>
          <div class="callcard js-tel-list"></div>
          ${recPanel}
        </aside>
      </div>

      <section class="pdp__sec js-more-wrap" hidden>
        <h2 class="h2">More in <em>${cityName(p.city)}</em> and nearby.</h2>
        <div class="pgrid mt-m js-more"></div>
      </section>
    </div>`;

  /* Related listings: same city first, then same type. */
  const more = PROPERTIES
    .filter(x => x.id !== p.id && x.status === 'available')
    .sort((a, b) => (b.city === p.city) - (a.city === p.city) || (b.type === p.type) - (a.type === p.type))
    .slice(0, 3);
  if (more.length) {
    $('.js-more').innerHTML = more.map(propCard).join('');
    $('.js-more-wrap').hidden = false;
  }

  /* The phone list is stamped by site.js, which has already run — fill the
     one this page just created. */
  const list = $('.js-tel-list', root);
  if (list) list.innerHTML = CFG.phones.map(ph =>
    `<a href="tel:${ph.tel}">
       <span class="tel__ico">${ICON.phone}</span>
       <span class="tel__txt"><b>${ph.label}</b><small>${ph.who}</small></span>
     </a>`).join('');
});
