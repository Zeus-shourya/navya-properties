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

  /* ── <head> helpers ─────────────────────────────────────────────────────
     Search engines render this page, so the title, description, canonical,
     social tags and structured data are all written from the listing.     */
  const BASE = (CFG && CFG.siteUrl) || 'https://www.navyaproperty.com/';
  const abs  = u => /^https?:/.test(u) ? u : BASE + String(u).replace(/^\.?\//, '');
  function headTag(tag, attr, key) {
    let el = document.head.querySelector(`${tag}[${attr}="${key}"]`);
    if (!el) { el = document.createElement(tag); el.setAttribute(attr, key); document.head.appendChild(el); }
    return el;
  }
  const setMeta = (attr, key, val) => headTag('meta', attr, key).setAttribute('content', val);

  /* ── Unknown id ──────────────────────────────────────────────────────── */
  if (!p) {
    setMeta('name', 'robots', 'noindex, follow');
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

  /* ── Head ──────────────────────────────────────────────────────────────
     Title: "30 Acre Agricultural Land in Pehrawar, Rohtak | Navya" — the
     longest form that still fits in 60 characters.                       */
  const KIND = {
    'agriculture-land': 'Agricultural Land', 'residential-plot': 'Residential Land',
    'farmhouse': 'Farmhouse', 'commercial-land': 'Commercial Land', 'industrial-land': 'Industrial Land'
  };
  const kind    = KIND[p.type] || typeName(p.type);
  const town    = CITIES.find(c => c.slug === p.city);
  const state   = town ? town.state : 'Haryana';
  const where   = p.village ? p.village + ', ' + cityName(p.city) : cityName(p.city);
  const sizeTxt = p.size != null ? fmtSize(p) : '';
  const forSale = p.status === 'available' ? ' for Sale' : '';
  const stem    = (sizeTxt ? sizeTxt.replace(/\bacre\b/, 'Acre') + ' ' : '') + kind;
  const titles  = [
    `${stem}${forSale} in ${where} | ${CFG.brand.name}`,
    `${stem} in ${where} | ${CFG.brand.name}`,
    `${stem} in ${where} | Navya`,
    `${stem} in ${where}`
  ];
  const seoTitle = titles.find(t => t.length <= 60) || titles[titles.length - 1];
  document.title = seoTitle;

  const clip = (s, n) => s.length <= n ? s
    : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[\s,;:.—–-]+$/, '') + '…';
  const opener = (sizeTxt ? sizeTxt + ' ' : '') + kind.toLowerCase() + forSale.toLowerCase() + ' at ' + where + ', ' + state + '.';
  const desc = clip((opener.charAt(0).toUpperCase() + opener.slice(1) + ' ' + (p.note || '')).trim(), 158);
  setMeta('name', 'description', desc);

  const url = BASE + 'property.html?id=' + encodeURIComponent(p.id);
  const img = abs(ux(p.img, 1200));
  headTag('link', 'rel', 'canonical').setAttribute('href', url);
  setMeta('property', 'og:title', seoTitle);
  setMeta('property', 'og:description', desc);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', img);
  setMeta('property', 'og:image:alt', p.title);
  setMeta('name', 'twitter:title', seoTitle);
  setMeta('name', 'twitter:description', desc);
  setMeta('name', 'twitter:image', img);

  /* Structured data from the same object that renders the page. No Offer:
     rates are not published, and markup must not claim what the page does
     not show. */
  const place = {
    '@type': 'Place',
    name: where,
    address: { '@type': 'PostalAddress', addressLocality: cityName(p.city), addressRegion: state, addressCountry: 'IN' }
  };
  if (p.lat && p.lng) place.geo = { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng };
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': url + '#listing',
        url: url,
        name: p.title,
        description: desc,
        inLanguage: 'en-IN',
        datePosted: p.added,
        image: img,
        contentLocation: place,
        isPartOf: { '@id': BASE + '#website' },
        publisher: { '@id': BASE + '#business' },
        breadcrumb: { '@id': url + '#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Properties', item: BASE + 'properties.html' },
          { '@type': 'ListItem', position: 3, name: cityName(p.city), item: BASE + 'properties.html?city=' + encodeURIComponent(p.city) },
          { '@type': 'ListItem', position: 4, name: p.title, item: url }
        ]
      }
    ]
  };
  const ldTag = document.createElement('script');
  ldTag.type = 'application/ld+json';
  ldTag.textContent = JSON.stringify(ld);
  document.head.appendChild(ldTag);

  /* ── Pieces ──────────────────────────────────────────────────────────── */
  const priced = window.NP.showPrices() && p.price != null;
  const basis = !priced               ? 'Speak to us'
              : p.basis === 'monthly'  ? 'Per month'
              : p.basis === 'per acre' ? 'Per acre'
              : p.basis === 'per sq yd'? 'Per sq yd'
              : 'Total';

  const badges = [
    p.verified ? `<span class="chip chip--verified">${ICON.check} Verified</span>` : '',
    p.status === 'sold'   ? '<span class="chip chip--sold">Sold</span>' : '',
    p.status === 'rented' ? '<span class="chip chip--sold">Leased</span>' : '',
    p.zone ? '<span class="chip chip--gold">' + p.zone + '</span>' : '',
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
    ['Zone',       p.zone],
    ['Terms',      p.terms],
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

  /* A listing may carry one document or several — a revenue field map, or an
     architect's layout plan, which needs different framing. Normalise to an
     array so the markup below never has to care which it was given. */
  const docs = !p.shajra ? [] : (Array.isArray(p.shajra) ? p.shajra : [p.shajra]);
  const isLayout = docs.length && docs[0].kind === 'layout';

  const shajraSec = docs.length ? `
    <section class="pdp__sec">
      <h2 class="h2">${isLayout ? 'The <em>layout</em> plan.' : 'The <em>paper</em> version.'}</h2>
      <p class="lede mt-s" style="margin-bottom:18px">${isLayout
         ? 'The site and layout plan drawn up for this land — plot sizes, road widths, the approach roads and the drain are all marked on it.'
         : 'The revenue field ' + (docs.length > 1 ? 'maps' : 'map') + ' for this estate, as held at the tehsil. Killa numbers and boundary lengths are marked on ' + (docs.length > 1 ? 'them' : 'it') + '; we walk each boundary against ' + (docs.length > 1 ? 'these copies' : 'this copy') + ' before a listing goes up.'}</p>
      <div class="docgrid">
        ${docs.map((d, i) => `
        <div class="shajra">
          <a class="shajra__img" href="${d.src}" target="_blank" rel="noopener">
            <img src="${d.src}" alt="${isLayout ? 'Layout plan' : 'Revenue field map'} for ${p.village || p.title}${docs.length > 1 ? ' (sheet ' + (i + 1) + ')' : ''}" loading="lazy" decoding="async">
          </a>
          <p class="shajra__cap"><b>${d.caption}</b>
             ${i === docs.length - 1 ? 'Shown for orientation only — take your own certified copy from the tehsil before you commit, and read it with us on site rather than on a screen.' : ''}</p>
        </div>`).join('')}
      </div>
    </section>` : '';

  /* ── Render ──────────────────────────────────────────────────────────── */
  root.innerHTML = `
    <div class="wrap">
      <p class="phead__crumb"><a href="index.html">Home</a> &nbsp;/&nbsp;
        <a href="properties.html">Properties</a> &nbsp;/&nbsp;
        <a href="properties.html?city=${p.city}">${cityName(p.city)}</a></p>

      <div class="pdp__hero">
        <img src="${ux(p.img, 1600)}" alt="${p.title}" width="1600" height="700" fetchpriority="high">
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
