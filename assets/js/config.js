/* ==========================================================================
   Navya Properties — config.js
   EDIT THIS FILE FIRST. Everything the business owns — numbers, address,
   headline figures, social links, office hours — lives here and is stamped
   into every page at load. No other file needs touching to change a number.
   ========================================================================== */

window.NAVYA = {

  /* ── Brand ───────────────────────────────────────────────────────────── */
  brand: {
    name:     'Navya Properties',
    founder:  'Ashok Dixit',
    since:    1999,                     // drives the "27 yr" figure
    tagline:  'Land you can stand on.',
    base:     'Rohtak, HR',             // shown in the hero corner
    region:   'Haryana & North Rajasthan'
  },

  /* ── Founder ─────────────────────────────────────────────────────────────
     This number is deliberately kept OFF the header, footer, contact cards
     and floating buttons. It appears in exactly one place: the founder block
     on about.html. Day-to-day calls go to the two managers below.         */
  founder: {
    name:  'Ashok Dixit',
    role:  'Founder',
    tel:   '+919138384138',
    label: '+91 91383 84138',
    photo: 'assets/img/founder-ashok-dixit.jpg'
  },

  /* ── Managers — the numbers shown everywhere on the site ─────────────── */
  /* `tel` is the dialable form; `label` is what people read.               */
  phones: [
    { tel: '+919588193144', label: '+91 95881 93144', who: 'Shourya Kadian — Manager' },
    { tel: '+917206273919', label: '+91 72062 73919', who: 'Sajag Siwach — Manager'  }
  ],

  /* ── Headline figures ────────────────────────────────────────────────────
     Rendered into the stats strip on both index.html and about.html.      */
  stats: [
    { n: '5000', suffix: '+',  label: 'Acres transacted' },
    { n: '2000', suffix: '+',  label: 'Families & firms served' },
    { n: '30',   suffix: '+',  label: 'Cities on the ground' },
    { n: '27',   suffix: 'yr', label: 'Walking every property' }
  ],

  /* ── Prices ──────────────────────────────────────────────────────────────
     false = no rate is shown anywhere on the site. Listing cards and detail
     pages read "On request", the budget filter and the price sort options
     disappear, and any `price` left in data.js is simply never rendered.
     Flip to true only if you decide to publish rates.                     */
  showPrices: false,

  /* ── Reach ───────────────────────────────────────────────────────────── */
  email: 'hello@navyaproperties.in',       // TODO: replace with the real inbox
  office: {
    lines: ['Navya Properties', 'Delhi Road, Near Bus Stand', 'Rohtak, Haryana 124001'],
    hours: 'Mon – Sat · 9:00 am – 8:00 pm',
    sunday: 'Sunday · site visits by appointment',
    short: 'Delhi Road, Rohtak',
    mapQuery: 'Delhi Road, Rohtak, Haryana'
  },

  /* ── Social (leave a value empty to hide the icon) ───────────────────── */
  social: {
    facebook:  '',
    instagram: '',
    youtube:   '',
    linkedin:  ''
  },

  /* ── Defaults used by the enquiry + wanted forms ─────────────────────── */
  /* Both forms hand off to WhatsApp on the first manager number — no
     backend, no server, nothing to maintain. Switch `handoff` to 'email'
     to open the visitor's mail client against `email` instead.            */
  handoff: 'whatsapp'
};
