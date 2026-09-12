/* ==========================================================================
   Navya Properties — site.js
   Shared behaviour for every page: header, config stamping, formatting,
   card templates, scroll reveal, FAQ, and the home page's rendered rails.
   Page-specific logic lives in properties.js / wanted.js / tools.js.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.NAVYA;
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ══ 1. Formatting ═══════════════════════════════════════════════════ */

  /* ₹ in the way Indian buyers read it: crore above a crore, lakh below. */
  function fmtINR(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1e7) return '₹' + trim(n / 1e7) + ' Cr';
    if (n >= 1e5) return '₹' + trim(n / 1e5) + ' L';
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }
  function trim(v) {
    const s = v.toFixed(2);
    return s.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
  }
  function fmtSize(p) {
    const n = p.size % 1 === 0 ? p.size : p.size.toFixed(1);
    return n + ' ' + p.unit;
  }
  function fmtDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  }
  function daysSince(iso) {
    return Math.floor((Date.now() - new Date(iso + 'T00:00:00')) / 86400000);
  }
  function typeName(slug) { const t = TYPES.find(t => t.slug === slug); return t ? t.name : slug; }
  function cityName(slug) { const c = CITIES.find(c => c.slug === slug); return c ? c.name : slug; }

  /* ══ 2. Icons ════════════════════════════════════════════════════════ */
  const ICON = {
    arw:   '<svg class="arw" width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true"><path d="M9.2 1l4.3 4.5L9.2 10M13 5.5H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    phone: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M14.5 11.3v2a1.3 1.3 0 0 1-1.5 1.3 13.2 13.2 0 0 1-5.7-2 13 13 0 0 1-4-4A13.2 13.2 0 0 1 1.3 2.9 1.3 1.3 0 0 1 2.6 1.5h2a1.3 1.3 0 0 1 1.3 1.1c.1.7.2 1.3.5 1.9a1.3 1.3 0 0 1-.3 1.4l-.8.8a10.7 10.7 0 0 0 4 4l.8-.8a1.3 1.3 0 0 1 1.4-.3c.6.2 1.2.4 1.9.5a1.3 1.3 0 0 1 1.1 1.2z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wa:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7 0a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.6a2.3 2.3 0 0 0 .3-.5.6.6 0 0 0 0-.6L9 6.4c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4A3.4 3.4 0 0 0 5.8 8.9a5.9 5.9 0 0 0 1.3 3.1 13.5 13.5 0 0 0 5.1 4.5c.7.3 1.3.5 1.7.6a4.1 4.1 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.5-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.8z"/></svg>',
    pin:   '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M12 6c0 3.5-5 8-5 8s-5-4.5-5-8a5 5 0 0 1 10 0z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="7" cy="6" r="1.7" stroke="currentColor" stroke-width="1.4"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8.4l4 4L14 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev:  '<svg width="10" height="6" viewBox="0 0 11 7" fill="none" aria-hidden="true"><path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    plus:  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };

  /* ══ 3. Config stamping ══════════════════════════════════════════════
     Contact details are written once in config.js and injected here so a
     changed number never has to be chased across six HTML files.        */

  function waLink(tel, msg) {
    return 'https://wa.me/' + tel.replace(/[^0-9]/g, '') +
           (msg ? '?text=' + encodeURIComponent(msg) : '');
  }

  function stampConfig() {
    if (!CFG) return;
    const p = CFG.phones;

    /* Header pill shows the first number, panel lists both. */
    const btn = $('.js-tel-label');
    if (btn) btn.textContent = p[0].label;

    const telRow = ph =>
      `<span class="tel__ico">${ICON.phone}</span>
       <span class="tel__txt"><b>${ph.label}</b><small>${ph.who}</small></span>`;

    const panel = $('.js-tel-panel');
    if (panel) panel.innerHTML = p.map(ph =>
      `<a class="tel__row" href="tel:${ph.tel}">${telRow(ph)}</a>`).join('');

    $$('.js-tel-list').forEach(el => {
      el.innerHTML = p.map(ph => `<a href="tel:${ph.tel}">${telRow(ph)}</a>`).join('');
    });

    /* Floating call + WhatsApp buttons. */
    const fab = $('.js-fab');
    if (fab) fab.innerHTML =
      `<a class="fab__btn" href="${waLink(p[0].tel, 'Hello ' + CFG.brand.name + ', I saw your website and wanted to ask about a property.')}"
          target="_blank" rel="noopener">${ICON.wa}<span>WhatsApp</span></a>
       <a class="fab__btn fab__btn--call" href="tel:${p[0].tel}">${ICON.phone}<span>Call now</span></a>`;

    /* Founder details appear in exactly one place — the About page block.
       His number is deliberately absent from the header, footer, contact
       cards and floating buttons; those all carry the manager numbers. */
    const f = CFG.founder || {};
    $$('.js-founder-tel').forEach(el => {
      el.innerHTML =
        `<a href="tel:${f.tel}">
           <span class="tel__ico">${ICON.phone}</span>
           <span class="tel__txt"><b>${f.label}</b><small>${f.name} — ${f.role}</small></span>
         </a>`;
    });
    $$('.js-founder-photo').forEach(el => {
      el.src = f.photo;
      el.alt = f.name + ', founder of ' + CFG.brand.name;
    });

    /* Headline figures, so index and about can never drift apart. */
    $$('.js-stats').forEach(el => {
      el.innerHTML = (CFG.stats || []).map(s =>
        `<div class="stat"><b>${s.n}<i>${s.suffix || ''}</i></b><span>${s.label}</span></div>`).join('');
    });

    $$('.js-year').forEach(el => el.textContent = new Date().getFullYear());
    $$('.js-email').forEach(el => { el.textContent = CFG.email; el.href = 'mailto:' + CFG.email; });
    $$('.js-founder').forEach(el => el.textContent = CFG.brand.founder);
    $$('.js-since').forEach(el => el.textContent = CFG.brand.since);
    $$('.js-years').forEach(el => el.textContent = new Date().getFullYear() - CFG.brand.since);
    $$('.js-base').forEach(el => el.textContent = CFG.brand.base);
    $$('.js-region').forEach(el => el.textContent = CFG.brand.region);
    $$('.js-office').forEach(el => el.innerHTML = CFG.office.lines.join('<br>'));
    $$('.js-hours').forEach(el => el.innerHTML = CFG.office.hours + '<br>' + CFG.office.sunday);
    $$('.js-wa').forEach(el => {
      el.href = waLink(p[0].tel, el.dataset.msg || 'Hello ' + CFG.brand.name + ', I have an enquiry.');
      el.target = '_blank'; el.rel = 'noopener';
    });
    $$('.js-map').forEach(el => {
      el.href = 'https://maps.google.com/?q=' + encodeURIComponent(CFG.office.mapQuery);
      el.target = '_blank'; el.rel = 'noopener';
    });

    /* Social icons hide themselves when the config leaves the URL blank. */
    $$('[data-social]').forEach(el => {
      const url = CFG.social[el.dataset.social];
      if (url) el.href = url; else el.remove();
    });
  }

  /* ══ 4. Header ═══════════════════════════════════════════════════════ */
  function header() {
    const head = $('.header');
    if (head) {
      const onScroll = () => head.classList.toggle('is-stuck', window.scrollY > 12);
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
    }

    /* Dropdown + phone popover share one open/close contract. */
    $$('[data-pop]').forEach(pop => {
      const trigger = $('[data-pop-btn]', pop);
      if (!trigger) return;
      const close = () => { pop.dataset.open = 'false'; trigger.setAttribute('aria-expanded', 'false'); };
      const open  = () => { pop.dataset.open = 'true';  trigger.setAttribute('aria-expanded', 'true');  };

      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = pop.dataset.open === 'true';
        $$('[data-pop]').forEach(o => { o.dataset.open = 'false'; $('[data-pop-btn]', o).setAttribute('aria-expanded', 'false'); });
        if (!isOpen) open();
      });
      pop.addEventListener('mouseleave', close);
      pop.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); trigger.focus(); } });
    });
    document.addEventListener('click', () => {
      $$('[data-pop]').forEach(o => { o.dataset.open = 'false'; $('[data-pop-btn]', o).setAttribute('aria-expanded', 'false'); });
    });

    /* Mobile sheet. */
    const burger = $('.burger'), sheet = $('.msheet');
    if (burger && sheet) {
      burger.addEventListener('click', () => {
        const open = sheet.dataset.open !== 'true';
        sheet.dataset.open = String(open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
      $$('a', sheet).forEach(a => a.addEventListener('click', () => {
        sheet.dataset.open = 'false';
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }));
    }
  }

  /* ══ 5. Scroll reveal ════════════════════════════════════════════════ */
  function reveal() {
    const items = $$('[data-reveal]');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const delay = Number(en.target.dataset.reveal) || 0;
        setTimeout(() => en.target.classList.add('is-in'), delay);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(el => io.observe(el));
  }

  /* ══ 6. FAQ accordion ════════════════════════════════════════════════ */
  function faq() {
    $$('.faq__q').forEach(q => q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const open = item.dataset.open === 'true';
      item.dataset.open = String(!open);
      q.setAttribute('aria-expanded', String(!open));
    }));
  }

  /* ══ 7. Card templates ═══════════════════════════════════════════════ */
  function propCard(p) {
    const badges = [];
    if (p.verified) badges.push(`<span class="chip chip--verified">${ICON.check} Verified</span>`);
    if (p.status === 'sold')   badges.push('<span class="chip chip--sold">Sold</span>');
    if (p.status === 'rented') badges.push('<span class="chip chip--sold">Leased</span>');
    if (p.featured && p.status === 'available') badges.push('<span class="chip chip--gold">Featured</span>');

    /* A listing with no price set reads "On request" rather than a dash —
       normal for larger land parcels where the number is negotiated. */
    const priced = p.price != null;
    const basis = !priced             ? 'Ask us'
                : p.basis === 'monthly' ? 'Per month'
                : p.basis === 'total'   ? 'Total'
                : p.basis === 'per acre'? 'Per acre'
                : 'Per sq yd';

    return `<a class="pcard" href="${propUrl(p)}">
      <div class="pcard__media">
        <img src="${ux(p.img, 720)}" alt="${p.title}" loading="lazy" width="720" height="495">
        <div class="pcard__badges">${badges.join('')}</div>
        <span class="pcard__type">${typeName(p.type)}</span>
      </div>
      <div class="pcard__b">
        <h3 class="pcard__title">${p.title}</h3>
        <div class="pcard__price">
          <b${priced ? '' : ' class="pcard__ask"'}>${priced ? fmtINR(p.price) : 'On request'}</b>
          <span>${basis}</span>
        </div>
        <div class="pcard__foot">
          <b>${fmtSize(p)}</b>
          <span class="loc">${ICON.pin} ${cityName(p.city)}</span>
        </div>
      </div>
    </a>`;
  }

  /* Every listing has a detail page; the id is the whole route. */
  function propUrl(p) { return 'property.html?id=' + encodeURIComponent(p.id); }

  function wantedCard(w) {
    const left = 45 - daysSince(w.posted);
    const budget = w.budgetMax >= 1e5
      ? fmtINR(w.budgetMin) + ' – ' + fmtINR(w.budgetMax)
      : '₹' + w.budgetMin.toLocaleString('en-IN') + ' – ₹' + w.budgetMax.toLocaleString('en-IN');
    const msg = `Hello ${CFG.brand.name}, I have a property matching the wanted request ${w.id} — "${w.title}".`;

    return `<article class="wcard">
      <div class="wcard__top">
        <span class="chip">${typeName(w.type)}</span>
        <span class="wcard__exp">${left > 0 ? left + ' days left' : 'Expired'}</span>
      </div>
      <h3 class="h3">${w.title}</h3>
      <div class="wcard__specs">
        <div><span>Budget</span><b>${budget}</b></div>
        <div><span>Size</span><b>${w.sizeText}</b></div>
        <div><span>Area</span><b>${cityName(w.city)}</b></div>
      </div>
      <p class="wcard__note">${w.note}</p>
      <div class="wcard__foot">
        <span class="wcard__exp">${w.by} · ${fmtDate(w.posted)}</span>
        <a class="btn btn--brand btn--sm" href="${waLink(CFG.phones[0].tel, msg)}" target="_blank" rel="noopener">
          ${ICON.wa} I have this</a>
      </div>
    </article>`;
  }

  /* ══ 8. Home page rails ══════════════════════════════════════════════ */
  function home() {
    const live = PROPERTIES.filter(p => p.status === 'available');

    /* Live counter in the hero corner. */
    const liveEl = $('.js-live-count');
    if (liveEl) liveEl.textContent = live.length;

    /* Hero + properties-page finder dropdowns. */
    $$('.js-type-options').forEach(sel => {
      sel.insertAdjacentHTML('beforeend',
        TYPES.map(t => `<option value="${t.slug}">${t.name}</option>`).join(''));
    });
    $$('.js-city-options').forEach(sel => {
      sel.insertAdjacentHTML('beforeend',
        CITIES.map(c => `<option value="${c.slug}">${c.name}</option>`).join(''));
    });

    const finder = $('.js-finder');
    if (finder) finder.addEventListener('submit', e => {
      e.preventDefault();
      const t = $('[name=type]', finder).value, c = $('[name=city]', finder).value;
      const q = [];
      if (t) q.push('type=' + t);
      if (c) q.push('city=' + c);
      location.href = 'properties.html' + (q.length ? '?' + q.join('&') : '');
    });

    /* Cities. */
    const lead = $('.js-city-lead');
    if (lead) {
      const c = CITIES.find(c => c.lead) || CITIES[0];
      const n = live.filter(p => p.city === c.slug).length;
      lead.innerHTML =
        `<img src="${ux(c.img, 900)}" alt="${c.name}" loading="lazy">
         <span class="citycard__tag">${c.tag}</span>
         <div>
           <h3 class="citycard__name">${c.name}.</h3>
           <div class="citycard__meta">
             <div><span>Live listings</span><b>${n}</b></div>
             <div><span>Closed to date</span><b>${c.sold}</b></div>
             <div><span>Head office</span><b>${CFG.office.short}</b></div>
           </div>
           <div class="citycard__cta">
             <span class="link-arw">Explore ${c.name} ${ICON.arw}</span>
           </div>
         </div>`;
      lead.href = 'properties.html?city=' + c.slug;
    }

    const minor = $('.js-city-minor');
    if (minor) {
      const picks = CITIES.filter(c => c.feat && !c.lead);
      const four = (picks.length ? picks : CITIES.filter(c => !c.lead)).slice(0, 4);
      minor.innerHTML = four.map(c => {
        const n = live.filter(p => p.city === c.slug).length;
        return `<a class="citycard citycard--min" href="properties.html?city=${c.slug}">
          <img src="${ux(c.img, 560)}" alt="${c.name}" loading="lazy">
          <span class="citycard__tag">${c.tag}</span>
          <div>
            <h3 class="citycard__name">${c.name}</h3>
            <p class="citycard__sub">${n} live · ${c.sold} closed</p>
          </div>
        </a>`;
      }).join('');
    }

    /* Purpose rows. */
    const purpose = $('.js-purpose');
    if (purpose) purpose.innerHTML = TYPES.map((t, i) => {
      const n = live.filter(p => p.type === t.slug).length;
      return `<a class="purpose__row" href="properties.html?type=${t.slug}">
        <span class="purpose__n">0${i + 1}</span>
        <h3 class="purpose__t">${t.name}</h3>
        <p class="purpose__d">${t.desc}</p>
        <span class="purpose__c">
          <span><b>${String(n).padStart(2, '0')}</b><span>${n === 1 ? 'Listing' : 'Listings'}</span></span>
          <span class="purpose__arw">${ICON.arw}</span>
        </span>
      </a>`;
    }).join('');

    /* Featured. */
    const feat = $('.js-featured');
    if (feat) {
      const picks = PROPERTIES.filter(p => p.featured).concat(live).filter((v, i, a) => a.indexOf(v) === i);
      feat.innerHTML = picks.slice(0, 6).map(propCard).join('');
    }

    /* Fresh drops, with type tabs. */
    const fresh = $('.js-fresh'), tabs = $('.js-fresh-tabs');
    if (fresh && tabs) {
      const recent = PROPERTIES.slice().sort((a, b) => b.added.localeCompare(a.added));
      const counts = t => t === 'all' ? recent.length : recent.filter(p => p.type === t).length;
      const shown = TYPES.filter(t => counts(t.slug) > 0).slice(0, 4);

      tabs.innerHTML =
        `<button class="tab" role="tab" aria-selected="true" data-t="all">All new <i>${counts('all')}</i></button>` +
        shown.map(t => `<button class="tab" role="tab" aria-selected="false" data-t="${t.slug}">${t.name} <i>${counts(t.slug)}</i></button>`).join('');

      const draw = t => {
        fresh.innerHTML = (t === 'all' ? recent : recent.filter(p => p.type === t)).slice(0, 6).map(propCard).join('');
      };
      draw('all');
      tabs.addEventListener('click', e => {
        const b = e.target.closest('.tab');
        if (!b) return;
        $$('.tab', tabs).forEach(x => x.setAttribute('aria-selected', String(x === b)));
        draw(b.dataset.t);
      });
    }

    /* Reviews. */
    const rev = $('.js-reviews');
    if (rev) rev.innerHTML = REVIEWS.map(r => {
      const initials = r.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      return `<article class="tcard">
        <div class="tcard__top">
          <span class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
          <span class="chip">${r.lang}</span>
        </div>
        <blockquote>“${r.text}”</blockquote>
        <div class="tcard__who">
          <span class="tcard__av" style="display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);font:500 .8rem/1 var(--sans)">${initials}</span>
          <span><b>${r.name}</b><span>${r.role}</span></span>
        </div>
      </article>`;
    }).join('');

    /* Journal. */
    const jr = $('.js-journal');
    if (jr) jr.innerHTML = JOURNAL.slice(0, 3).map(j =>
      `<a class="jcard" href="${j.slug}">
        <div class="jcard__img"><img src="${ux(j.img, 640)}" alt="" loading="lazy"></div>
        <time>${fmtDate(j.date)}</time>
        <h3 class="h3">${j.title}</h3>
        <p>${j.text}</p>
      </a>`).join('');

    /* Every city we work in, in the order they are listed in data.js. */
    const all = $('.js-city-all');
    if (all) all.innerHTML = CITIES.map(c =>
      `<a class="citypill" href="properties.html?city=${c.slug}">
         ${c.name}<i>${c.state === 'Rajasthan' ? 'RJ' : 'HR'}</i></a>`).join('');

    /* Marquee — doubled so the -50% translate loops seamlessly. */
    const mq = $('.js-marquee');
    if (mq) {
      const run = CITIES.map(c => `<span class="marquee__item">${c.name}</span>`).join('');
      mq.innerHTML = run + run;
    }
  }

  /* ══ 9. Enquiry forms ════════════════════════════════════════════════
     No backend. The form composes a message and hands it to WhatsApp (or
     the mail client), so the enquiry lands somewhere a person reads.     */
  function forms() {
    $$('.js-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const d = new FormData(form);
        const lines = [];
        for (const [k, v] of d.entries()) {
          if (String(v).trim()) lines.push(labelFor(form, k) + ': ' + v);
        }
        const body = (form.dataset.intro || 'New enquiry from the website') + '\n\n' + lines.join('\n');

        if (CFG.handoff === 'email') {
          location.href = 'mailto:' + CFG.email +
            '?subject=' + encodeURIComponent(form.dataset.subject || 'Website enquiry') +
            '&body=' + encodeURIComponent(body);
        } else {
          window.open(waLink(CFG.phones[0].tel, body), '_blank', 'noopener');
        }

        const ok = $('.form__ok', form);
        if (ok) { ok.classList.add('is-on'); ok.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      });
    });
  }
  function labelFor(form, name) {
    const el = form.elements[name];
    const lab = el && el.closest('.field') && $('label', el.closest('.field'));
    return lab ? lab.textContent.trim() : name;
  }

  /* ══ 10. Boot ════════════════════════════════════════════════════════ */
  function init() {
    stampConfig();
    header();
    /* data.js declares its globals with `const`, so they live in the global
       lexical scope rather than on `window` — test the binding, not window. */
    if (typeof TYPES !== 'undefined') home();
    faq();
    forms();
    reveal();

    /* Mark the current page in the nav without hardcoding it per file. */
    const here = location.pathname.split('/').pop() || 'index.html';
    $$('.nav__link, .msheet__link').forEach(a => {
      const href = (a.getAttribute('href') || '').split('?')[0];
      if (href === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* Shared helpers other page scripts lean on. */
  window.NP = { $, $$, fmtINR, fmtSize, fmtDate, daysSince, typeName, cityName, propCard, propUrl, wantedCard, ICON, ux, waLink };

  /* Wait for DOMContentLoaded rather than running at script-eval time: the
     per-page scripts (properties/wanted/tools) are deferred too and render
     their markup during eval, so init has to come after them or it would
     bind handlers and stamp config onto elements that do not exist yet. */
  document.readyState === 'complete'
    ? init()
    : document.addEventListener('DOMContentLoaded', init);
})();
