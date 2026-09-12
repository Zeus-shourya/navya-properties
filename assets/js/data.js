/* ==========================================================================
   Navya Properties — data.js
   The whole catalogue in one place: cities, property types, listings, wanted
   requests, reviews, journal entries and FAQs. Pages read from here, so a
   listing is added by adding an object — never by editing HTML.

   Photography is pulled from Unsplash by photo id. Swap `img` for a local
   path (e.g. 'assets/img/cities/rohtak.jpg') the moment you have real
   photographs — the ux() helper passes local paths straight through. Stock
   imagery is a placeholder for the look of the page, not a representation
   of any particular town or plot.
   ========================================================================== */

/* Image helper. A bare Unsplash photo id becomes a sized Unsplash URL; a local
   path or a full URL is passed straight through untouched. That means swapping
   stock for real photography is a one-word edit on the listing:
       img: PIC.cropAerial          →  img: 'assets/img/plot-sector-6.jpg'   */
function ux(id, w){
  if (!id) return '';
  if (/^(assets\/|https?:|\/|\.)/.test(id)) return id;
  return 'https://images.unsplash.com/' + id + '?w=' + (w || 1200) + '&q=72&auto=format&fit=crop';
}

/* Named photo ids so the same field never gets two different pictures. */
const PIC = {
  /* Land & crop */
  heroField:   'photo-1500382017468-9049fed747ef',
  seedlings:   'photo-1466692476868-aef1dfb1e735',
  cropRows:    'photo-1625246333195-78d9c38ad449',
  cropAerial:  'photo-1560493676-04071c5f467b',
  fieldEdge:   'photo-1592982537447-7440770cbfc9',
  farmer:      'photo-1574943320219-553eb213f72d',
  farmerWork:  'photo-1605000797499-95a51c5269ae',
  soilHands:   'photo-1611843467160-25afb8df1074',
  wheat:       'photo-1499529112087-3cb3b73cec95',
  wheatEars:   'photo-1543257580-7269da773bf5',
  grain:       'photo-1416879595882-3373a0480b5b',
  cattle:      'photo-1500595046743-cd271d694d30',
  bigTree:     'photo-1518495973542-4542c06a5843',
  solar:       'photo-1509391366360-2e959784a276',

  /* Road & arid — the Bikaner side of Rajasthan */
  highway:     'photo-1592805144716-feeccccef5ac',
  arid:        'photo-1509316785289-025f5b846b35',

  /* Built */
  aerialPlots: 'photo-1524813686514-a57563d77965',
  suburb:      'photo-1605276374104-dee2a0ed3cd6',
  houseDusk:   'photo-1568605114967-8130f3a36994',
  villaPool:   'photo-1512917774080-9991f1c4c750',
  houseTree:   'photo-1600585154340-be6161a56a0c',
  housePool:   'photo-1613490493576-7fde63acd811',

  /* Industrial */
  shed:        'photo-1565610222536-ef125c59da2e',
  warehouse:   'photo-1553413077-190dd305871c',
  racks:       'photo-1586528116311-ad8dd3c8310d',

  /* Paperwork */
  keys:        'photo-1560518883-ce09059eeffa',
  records:     'photo-1590247813693-5541d1c609fd',
  papers:      'photo-1554224155-6726b3ff858f',
  signing:     'photo-1454165804606-c3d57bc86b40',
  handshake:   'photo-1521791136064-7986c2920216'
};

/* ── Property types ──────────────────────────────────────────────────────
   `slug` is what appears in ?type= on properties.html.                    */
const TYPES = [
  { slug:'agriculture-land', name:'Agriculture Land',
    desc:'Khasra-verified holdings with the mutation chain walked back to the source deed.' },
  { slug:'residential-plot', name:'Residential Plots',
    desc:'HSVP sectors and licensed colony plots with clean allotment papers and possession on the ground.' },
  { slug:'farmhouse', name:'Farmhouses',
    desc:'Built farmhouses on titled land — weekend places and full-time homes across the Rohtak and Jhajjar belt.' },
  { slug:'commercial-land', name:'Commercial Land',
    desc:'Highway-facing and bypass-road commercial land on NH-9, NH-44 and the Rohtak–Hisar corridors.' },
  { slug:'industrial-land', name:'Industrial & Warehouse Land',
    desc:'Shed-ready industrial land on the Bahadurgarh, Jhajjar and KMP belts, with CLU status stated up front.' }
];

/* ── Where we actually work ──────────────────────────────────────────────
   Order matters: it drives the marquee on the home page. `lead: true`
   marks the head-office city, which gets the large card.
   Photography here is regional stock — replace with real town photographs
   at assets/img/cities/<slug>.jpg when you have them.                    */
const CITIES = [
  { slug:'jhajjar',      name:'Jhajjar',      state:'Haryana',   tag:'District town',     img:PIC.cropAerial,   feat:true },
  { slug:'rohtak',       name:'Rohtak',       state:'Haryana',   tag:'Home base',         img:PIC.heroField,    lead:true },
  { slug:'hisar',        name:'Hisar',        state:'Haryana',   tag:'Western belt',      img:PIC.wheat,       feat:true },
  { slug:'hansi',        name:'Hansi',        state:'Haryana',   tag:'Grain belt',        img:PIC.wheatEars },
  { slug:'meham',        name:'Meham',        state:'Haryana',   tag:'Canal side',        img:PIC.cropRows },
  { slug:'bhiwani',      name:'Bhiwani',      state:'Haryana',   tag:'Southern belt',     img:PIC.fieldEdge },
  { slug:'sonipat',      name:'Sonipat',      state:'Haryana',   tag:'NH-44 corridor',    img:PIC.aerialPlots },
  { slug:'dadri',        name:'Charkhi Dadri',state:'Haryana',   tag:'Aravalli edge',     img:PIC.cattle },
  { slug:'tosham',       name:'Tosham',       state:'Haryana',   tag:'Hill tehsil',       img:PIC.bigTree },
  { slug:'sirsa',        name:'Sirsa',        state:'Haryana',   tag:'Cotton belt',       img:PIC.cropAerial },
  { slug:'fatehabad',    name:'Fatehabad',    state:'Haryana',   tag:'Canal command',     img:PIC.seedlings },
  { slug:'jind',         name:'Jind',         state:'Haryana',   tag:'Central Haryana',   img:PIC.farmer },
  { slug:'kaithal',      name:'Kaithal',      state:'Haryana',   tag:'Paddy belt',        img:PIC.farmerWork },
  { slug:'karnal',       name:'Karnal',       state:'Haryana',   tag:'Rice bowl',         img:PIC.heroField },
  { slug:'panipat',      name:'Panipat',      state:'Haryana',   tag:'Industrial town',   img:PIC.racks },
  { slug:'bahadurgarh',  name:'Bahadurgarh',  state:'Haryana',   tag:'Industrial edge',   img:PIC.shed,        feat:true },
  { slug:'bikaner',      name:'Bikaner',      state:'Rajasthan', tag:'Rajasthan desk',    img:PIC.arid,        feat:true },
  { slug:'sardarshahar', name:'Sardarshahar', state:'Rajasthan', tag:'Churu district',    img:PIC.grain },
  { slug:'dungargarh',   name:'Dungargarh',   state:'Rajasthan', tag:'Bikaner district',  img:PIC.solar },
  { slug:'kharkhoda',    name:'Kharkhoda',    state:'Haryana',   tag:'Sonipat tehsil',    img:PIC.suburb },
  { slug:'sampla',       name:'Sampla',       state:'Haryana',   tag:'Rohtak tehsil',     img:PIC.bigTree },
  { slug:'kalanaur',     name:'Kalanaur',     state:'Haryana',   tag:'Rohtak tehsil',     img:PIC.soilHands },
  { slug:'bonad',        name:'Bonad',        state:'Haryana',   tag:'Tehsil',            img:PIC.grain },
  { slug:'gohana',       name:'Gohana',       state:'Haryana',   tag:'Sonipat district',  img:PIC.cattle },
  { slug:'kanor',        name:'Kanor',        state:'Haryana',   tag:'Tehsil',            img:PIC.soilHands },
  { slug:'safidon',      name:'Safidon',      state:'Haryana',   tag:'Jind district',     img:PIC.cropRows },
  { slug:'assandh',      name:'Assandh',      state:'Haryana',   tag:'Karnal district',   img:PIC.wheat },
  { slug:'julana',       name:'Julana',       state:'Haryana',   tag:'Jind district',     img:PIC.fieldEdge },
  { slug:'narwana',      name:'Narwana',      state:'Haryana',   tag:'Jind district',     img:PIC.highway },
  { slug:'uchana',       name:'Uchana',       state:'Haryana',   tag:'Jind district',     img:PIC.farmerWork },
  { slug:'bawani-khera', name:'Bawani Khera', state:'Haryana',   tag:'Bhiwani district',  img:PIC.wheatEars }
];

/* ── Listings ────────────────────────────────────────────────────────────
   price      — number, in rupees
   basis      — 'total' | 'per acre' | 'per sq yd' | 'monthly'
   size/unit  — 'acre' | 'sq yd' | 'sq ft'
   status     — 'available' | 'sold' | 'rented'
   added      — ISO date, drives "newest first" and the Fresh drops rail
   ────────────────────────────────────────────────────────────────────── */
const PROPERTIES = [

  /* ── Real inventory ────────────────────────────────────────────────────
     Optional fields a listing may carry beyond the basics:
       price:null  → the card and detail page read "Price on request"
       lat/lng     → drives the embedded map on the detail page
       mapUrl      → the "Open in Google Maps" button
       shajra      → scanned revenue map (aks shajra), shown on the detail page
       village / hadbast / tehsil / district / landmark / frontage
                   → shown in the Revenue record panel
     ──────────────────────────────────────────────────────────────────── */
  { id:'np-201', title:'30 Acre Agriculture Land at Pehrawar, on the Sector Plan Road',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:30, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-09-13',
    img:PIC.cropAerial,
    note:'A single 30-acre block at Pehrawar on the southern edge of Rohtak, adjoining Sector 25C and fronting the sector plan road. A drain runs along the western boundary; the eastern side abuts the sector alignment.',
    lat:28.8617714, lng:76.6208105,
    mapUrl:'https://maps.app.goo.gl/GeuURUzQSjFA1S35A',
    village:'Pehrawar', hadbast:'69', tehsil:'Rohtak', district:'Rohtak',
    landmark:'Adjoining Sector 25C', frontage:'Sector plan road',
    shajra:{ src:'assets/img/properties/np-201-pehrawar-shajra.jpg',
             caption:'Aks shajra (revenue field map) for Pehrawar, Hadbast No. 69 — patwari-attested copy dated 27 June 2023.' } },

  { id:'np-202', title:'23 Acre on the Pehrawar–Kanheli Road, R Zone',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:23, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-09-13',
    img:PIC.fieldEdge,
    note:'Twenty-three acres at Pehrawar fronting the Pehrawar–Kanheli road, adjoining Sector 25C. Falls in the R zone, so the intended use under the development plan is residential rather than agricultural.',
    zone:'R zone (residential)',
    lat:28.8546219, lng:76.6258625,
    mapUrl:'https://maps.app.goo.gl/X9bJMWvSA1yseEqs7',
    village:'Pehrawar', hadbast:'69', tehsil:'Rohtak', district:'Rohtak',
    landmark:'Adjoining Sector 25C', frontage:'Pehrawar–Kanheli road',
    shajra:{ src:'assets/img/properties/np-202-pehrawar-kanheli-shajra.jpg',
             caption:'Aks shajra for Pehrawar, Hadbast No. 69 — patwari-attested copy dated 27 January 2023.' } },

  { id:'np-203', title:'35 Acre at Sunaria, Sector 22C',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:35, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-09-13',
    img:PIC.wheat,
    note:'A thirty-five acre holding at Sunaria on the western side of Rohtak, at Sector 22C.',
    lat:28.8639683, lng:76.5818860,
    mapUrl:'https://maps.app.goo.gl/a3Bsp7cRqJ2uLV8j6',
    village:'Sunaria', tehsil:'Rohtak', district:'Rohtak',
    landmark:'Sector 22C',
    shajra:{ src:'assets/img/properties/np-203-sunaria-shajra.jpg',
             caption:'Aks shajra for Sunaria — patwari-attested copy dated 10 July 2024.' } },

  { id:'np-204', title:'60 Acre at Sunaria, Sector 21C',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:60, unit:'acre',
    status:'available', verified:true, added:'2026-09-13',
    img:PIC.cropRows,
    note:'Sixty contiguous acres at Sunaria, at Sector 21C. The killas forming the block are marked on the revenue map below.',
    terms:'Payment against post-dated cheques, registry approximately 18 months out.',
    lat:28.8740348, lng:76.5594302,
    mapUrl:'https://maps.app.goo.gl/ywUS7eQq5sJwnYPFA',
    village:'Sunaria', tehsil:'Rohtak', district:'Rohtak',
    landmark:'Sector 21C',
    shajra:{ src:'assets/img/properties/np-204-sunaria-shajra.jpg',
             caption:'Revenue map for Sunaria with the block in question highlighted.' } },

  { id:'np-205', title:'25 Acre on the Rohtak–Bhiwani Road, Sector 20B',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:25, unit:'acre',
    status:'available', verified:true, added:'2026-09-13',
    img:PIC.seedlings,
    note:'Twenty-five acres at Sector 20B, fronting the Rohtak–Bhiwani road on the western approach to the city.',
    lat:28.8754801, lng:76.5238731,
    mapUrl:'https://maps.app.goo.gl/m9zr82FpwrwraBLGA',
    tehsil:'Rohtak', district:'Rohtak',
    landmark:'Sector 20B', frontage:'Rohtak–Bhiwani road',
    shajra:{ src:'assets/img/properties/np-205-sector20b-shajra.jpg',
             caption:'Revenue field map covering the block, showing killa numbers and boundary lengths.' } },

  { id:'np-206', title:'15 Acre at Dobh, Sector 21E on the Jail Bypass',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:15, unit:'acre',
    status:'available', verified:true, added:'2026-09-13',
    img:PIC.farmerWork,
    note:'Fifteen acres at Dobh, at Sector 21E on the Rohtak jail bypass. A road runs along the western edge of the block and a watercourse along the south-west, both marked on the revenue map below.',
    lat:28.8626696, lng:76.5312442,
    mapUrl:'https://maps.app.goo.gl/47tT8EaddbxwTMpx7',
    village:'Dobh', tehsil:'Rohtak', district:'Rohtak',
    landmark:'Sector 21E', frontage:'Rohtak jail bypass',
    shajra:{ src:'assets/img/properties/np-206-dobh-shajra.jpg',
             caption:'Aks shajra for Dobh — patwari-attested copy, with the block outlined in red.' } },

  { id:'np-207', title:'55 Acre at Lahali, on the Bahu Akbarpur Road',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:55, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-09-13',
    img:PIC.aerialPlots,
    note:'Fifty-five acres at Lahali on the road running towards Bahu Akbarpur, off the New Delhi–Hisar bypass. A site and layout plan has been drawn up for the land, with plots, internal roads and the drain set out — it is reproduced below.',
    lat:28.8708507, lng:76.4618668,
    mapUrl:'https://maps.app.goo.gl/TT36jaDpjW8iBUSM6',
    village:'Lahali', tehsil:'Rohtak', district:'Rohtak',
    landmark:'New Delhi–Hisar bypass', frontage:'Bahu Akbarpur road',
    shajra:{ kind:'layout', src:'assets/img/properties/np-207-lahali-layout.jpg',
             caption:'Site and layout plan prepared for the land, showing plot sizes in square yards, road widths and the drain along the southern edge.' } },

  { id:'np-208', title:'35 Acre at Shimli, on the Rohtak–Jhajjar Road',
    type:'agriculture-land', city:'rohtak', price:null, basis:'total', size:35, unit:'acre',
    status:'available', verified:true, added:'2026-09-13',
    img:PIC.cropAerial,
    note:'Thirty-five acres at Shimli on the Rohtak–Jhajjar road, south of the city. The road runs along the eastern edge of the block, marked in red on both sheets of the revenue map.',
    lat:28.8232570, lng:76.6033912,
    mapUrl:'https://maps.app.goo.gl/oDnwKgorrooDMJWF8',
    village:'Shimli', tehsil:'Rohtak', district:'Rohtak',
    frontage:'Rohtak–Jhajjar road',
    shajra:[
      { src:'assets/img/properties/np-208-shimli-shajra-1.jpg',
        caption:'Aks shajra for Shimli, sheet 1 — patwari-attested copy dated 5 August 2026.' },
      { src:'assets/img/properties/np-208-shimli-shajra-2.jpg',
        caption:'Aks shajra for Shimli, sheet 2 — the adjoining killas, same attested copy.' }
    ] },

  /* Sonipat is held as inventory rather than as single named parcels — these
     two entries stand in for several pieces each. Give them a `size` and a
     map when you want to split any one of them out into its own listing. */
  { id:'np-209', title:'Agriculture Land at Sonipat — Several Parcels',
    type:'agriculture-land', city:'sonipat', price:null, basis:'total',
    sizeText:'Various', status:'available', verified:true, added:'2026-09-13',
    img:PIC.wheatEars,
    note:'We hold several agricultural parcels around Sonipat, on the NH-44 side and along the KMP belt, in a range of sizes. Tell us the acreage, the budget and what you intend to do with it, and we will send the two or three that actually fit rather than the whole list.',
    district:'Sonipat' },

  { id:'np-210', title:'Residential Land at Sonipat — Several Parcels',
    type:'residential-plot', city:'sonipat', price:null, basis:'total',
    sizeText:'Various', status:'available', verified:true, added:'2026-09-13',
    img:PIC.aerialPlots,
    note:'Residential land at Sonipat across several locations and sizes, from sector plots to larger blocks suited to a colony. Registry position and approach differ piece by piece, so tell us what you need and we will tell you which ones clear on paper.',
    district:'Sonipat' },
];

/* ── Wanted: buyers publishing what they are looking for ─────────────────
   posted — ISO date. Requests expire 45 days after posting.               */
const WANTED = [
];

/* ── What buyers said ──────────────────────────────────────────────────
   Empty until real, attributable reviews are collected. The testimonial
   section on the home and about pages hides itself while this is empty. */
const REVIEWS = [
];

/* ── Journal ─────────────────────────────────────────────────────────── */
const JOURNAL = [
  { date:'2026-08-14', title:'Reading a jamabandi without taking anyone’s word for it',
    img:PIC.records, slug:'#',
    text:'The single document that decides whether a piece of agricultural land is worth visiting. What each column means, which entries are red flags, and how to pull a copy yourself from the Haryana land records portal in under ten minutes.' },
  { date:'2026-07-22', title:'CLU in Haryana: what conversion actually costs in 2026',
    img:PIC.shed, slug:'#',
    text:'Change of land use is quoted casually and budgeted badly. A line-by-line walk through external development charges, licence fees and the realistic timeline for an industrial conversion on the Bahadurgarh–Jhajjar belt.' },
  { date:'2026-06-30', title:'Why rates on the Rohtak–Meham line stopped moving in a straight line',
    img:PIC.cropAerial, slug:'#',
    text:'Five years of transaction data from our own closings, plotted against the road and canal work. The corridor did not appreciate evenly, and the villages that lagged are not the ones most buyers assume.' },
  { date:'2026-05-19', title:'The eight checks we run before a property goes on this site',
    img:PIC.papers, slug:'#',
    text:'Title chain, mutation, encumbrance, boundary, access, acquisition notices, family consent and possession. What each one catches, and the deals we have refused because of them.' }
];

/* ── Guides offered on the Resources page ────────────────────────────── */
const GUIDES = [
  { tag:'Free · Buyer', img:PIC.papers,
    title:'The land buyer’s checklist for Haryana',
    text:'Twenty-two checks between the first site visit and the registry, in the order we actually run them — with the office to visit and the fee to expect at each step.' },
  { tag:'Free · Seller', img:PIC.handshake,
    title:'Pricing your land so it sells inside a season',
    text:'How collector rate, market rate and the rate a buyer will finance differ, why the gap widens on larger holdings, and what to fix on paper before listing.' },
  { tag:'Free · Investor', img:PIC.arid,
    title:'Rajasthan land for solar: buy, lease or partner',
    text:'What a developer actually looks for on the Bikaner–Sardarshahar belt — grid distance, contiguity, patta status — and the three ways a landowner can be paid for it.' }
];

/* ── FAQ ─────────────────────────────────────────────────────────────── */
const FAQS = [
  { q:'Do you charge buyers a fee?',
    a:'We charge the standard brokerage, and we tell you the number before the first site visit, not after the deal is agreed. There are no listing fees, no "file charges", and nothing added at the registry counter. If a figure was not discussed up front, it is not payable.' },
  { q:'What does "verified" mean on your listings?',
    a:'It means someone from our team has physically walked the property, pulled the current jamabandi and mutation entries, traced the chain of title back through the previous transfers, checked the encumbrance position, and confirmed access and possession on the ground. If any of those fail, the property does not go up on this site.' },
  { q:'Can you help if the paperwork on my land is incomplete?',
    a:'Usually, yes. Broken mutation chains, missing family consent, unrecorded partitions and old GPA transfers are the four problems we see most. We will tell you honestly whether it is fixable, roughly what it costs, and how long it takes — before you commit to listing with us.' },
  { q:'You work across Haryana and Rajasthan. Does one team cover all of it?',
    a:'One firm, but people who live in their own belt. The Rohtak office runs the Jhajjar, Meham, Sampla, Kalanaur and Bahadurgarh side; separate desks cover the Hisar–Bhiwani–Sirsa line, the Jind–Kaithal–Karnal–Panipat side, and the Bikaner, Sardarshahar and Dungargarh belt in Rajasthan. Whoever shows you the land is the person who walked it.' },
  { q:'Do you work with NRI buyers and sellers?',
    a:'Regularly. We do video walk-throughs of the boundary, share the record extracts by email before anyone commits, and coordinate with your power-of-attorney holder here. An NRI cannot buy agricultural land in India, so for that category we will tell you at the first call rather than after the visit.' },
  { q:'Is agricultural land a sensible investment right now?',
    a:'It depends entirely on the belt and your horizon. Land near committed road, canal or grid infrastructure has done well; land bought on a rumoured alignment has not. We will show you what comparable pieces actually transacted at, including the ones that did not appreciate, and let you decide.' },
  { q:'How long does a purchase take from first call to registry?',
    a:'For a clean HSVP or colony plot, two to four weeks. For agricultural land where we are verifying the mutation chain, four to eight. Industrial land with a CLU dependency runs longer and we will say so at the start rather than let the date slip quietly.' },
  { q:'Do you list properties you have not visited?',
    a:'No. Every property on this site has been walked by our own team. It is the reason our listing count is smaller than the portals, and it is not a policy we intend to relax.' },
  { q:'What happens after the registry?',
    a:'We follow the mutation through to the entry appearing in your name, mark the boundary with the seller present, and hand over the complete file — deed, record extracts, receipts and the site photographs. That follow-up is not a separate service and it is not billed.' }
];
