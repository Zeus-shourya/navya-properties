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
  { slug:'jhajjar',      name:'Jhajjar',      state:'Haryana',   tag:'District town',     img:PIC.cropAerial,   feat:true, sold:186 },
  { slug:'rohtak',       name:'Rohtak',       state:'Haryana',   tag:'Home base',         img:PIC.heroField,    lead:true, sold:312 },
  { slug:'hisar',        name:'Hisar',        state:'Haryana',   tag:'Western belt',      img:PIC.wheat,       feat:true, sold:204 },
  { slug:'hansi',        name:'Hansi',        state:'Haryana',   tag:'Grain belt',        img:PIC.wheatEars,   sold:97 },
  { slug:'meham',        name:'Meham',        state:'Haryana',   tag:'Canal side',        img:PIC.cropRows,    sold:88 },
  { slug:'bhiwani',      name:'Bhiwani',      state:'Haryana',   tag:'Southern belt',     img:PIC.fieldEdge,   sold:143 },
  { slug:'sonipat',      name:'Sonipat',      state:'Haryana',   tag:'NH-44 corridor',    img:PIC.aerialPlots, sold:159 },
  { slug:'dadri',        name:'Charkhi Dadri',state:'Haryana',   tag:'Aravalli edge',     img:PIC.cattle,       sold:71 },
  { slug:'tosham',       name:'Tosham',       state:'Haryana',   tag:'Hill tehsil',       img:PIC.bigTree,     sold:44 },
  { slug:'sirsa',        name:'Sirsa',        state:'Haryana',   tag:'Cotton belt',       img:PIC.cropAerial,  sold:112 },
  { slug:'fatehabad',    name:'Fatehabad',    state:'Haryana',   tag:'Canal command',     img:PIC.seedlings,   sold:83 },
  { slug:'jind',         name:'Jind',         state:'Haryana',   tag:'Central Haryana',   img:PIC.farmer,      sold:126 },
  { slug:'kaithal',      name:'Kaithal',      state:'Haryana',   tag:'Paddy belt',        img:PIC.farmerWork,  sold:79 },
  { slug:'karnal',       name:'Karnal',       state:'Haryana',   tag:'Rice bowl',         img:PIC.heroField,   sold:118 },
  { slug:'panipat',      name:'Panipat',      state:'Haryana',   tag:'Industrial town',   img:PIC.racks,       sold:104 },
  { slug:'bahadurgarh',  name:'Bahadurgarh',  state:'Haryana',   tag:'Industrial edge',   img:PIC.shed,        feat:true, sold:167 },
  { slug:'bikaner',      name:'Bikaner',      state:'Rajasthan', tag:'Rajasthan desk',    img:PIC.arid,        feat:true, sold:96 },
  { slug:'sardarshahar', name:'Sardarshahar', state:'Rajasthan', tag:'Churu district',    img:PIC.grain,       sold:64 },
  { slug:'dungargarh',   name:'Dungargarh',   state:'Rajasthan', tag:'Bikaner district',  img:PIC.solar,       sold:52 },
  { slug:'kharkhoda',    name:'Kharkhoda',    state:'Haryana',   tag:'Sonipat tehsil',    img:PIC.suburb,      sold:74 },
  { slug:'sampla',       name:'Sampla',       state:'Haryana',   tag:'Rohtak tehsil',     img:PIC.bigTree,     sold:91 },
  { slug:'kalanaur',     name:'Kalanaur',     state:'Haryana',   tag:'Rohtak tehsil',     img:PIC.soilHands,   sold:68 },
  { slug:'bonad',        name:'Bonad',        state:'Haryana',   tag:'Tehsil',            img:PIC.grain,       sold:31 },
  { slug:'gohana',       name:'Gohana',       state:'Haryana',   tag:'Sonipat district',  img:PIC.cattle,      sold:87 },
  { slug:'kanor',        name:'Kanor',        state:'Haryana',   tag:'Tehsil',            img:PIC.soilHands,   sold:26 },
  { slug:'safidon',      name:'Safidon',      state:'Haryana',   tag:'Jind district',     img:PIC.cropRows,    sold:49 },
  { slug:'assandh',      name:'Assandh',      state:'Haryana',   tag:'Karnal district',   img:PIC.wheat,       sold:57 },
  { slug:'julana',       name:'Julana',       state:'Haryana',   tag:'Jind district',     img:PIC.fieldEdge,   sold:43 },
  { slug:'narwana',      name:'Narwana',      state:'Haryana',   tag:'Jind district',     img:PIC.highway,     sold:61 },
  { slug:'uchana',       name:'Uchana',       state:'Haryana',   tag:'Jind district',     img:PIC.farmerWork,    sold:38 },
  { slug:'bawani-khera', name:'Bawani Khera', state:'Haryana',   tag:'Bhiwani district',  img:PIC.wheatEars,   sold:35 }
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

  /* ── Sample listings ───────────────────────────────────────────────────
     Everything below carries `sample:true` and is invented placeholder
     inventory. Delete these objects — or filter on the flag — once the
     real listings are in.
     ──────────────────────────────────────────────────────────────────── */
  { id:'np-101', sample:true, title:'12 Acre Agriculture Land on the Rohtak–Meham Road',
    type:'agriculture-land', city:'rohtak', price:4200000, basis:'per acre', size:12, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-08-28', img:PIC.wheat,
    note:'Single khasra, tar-road frontage of 220 ft, tubewell in place. Mutation chain verified to 1984.' },

  { id:'np-102', sample:true, title:'300 Sq Yd Residential Plot, Sector 6 Rohtak',
    type:'residential-plot', city:'rohtak', price:6800000, basis:'total', size:300, unit:'sq yd',
    status:'available', verified:true, featured:true, added:'2026-08-25', img:PIC.aerialPlots,
    note:'HSVP sector, corner plot, park-facing. Registry possible immediately.' },

  { id:'np-103', sample:true, title:'3 Acre Industrial Land on the Bahadurgarh–Jhajjar Road',
    type:'industrial-land', city:'bahadurgarh', price:13500000, basis:'per acre', size:3, unit:'acre',
    status:'available', verified:true, featured:true, added:'2026-08-21', img:PIC.shed,
    note:'CLU granted, 40 ft approach, three-phase power and water line at the boundary.' },

  { id:'np-104', sample:true, title:'Farmhouse on 2 Acre near Sampla',
    type:'farmhouse', city:'sampla', price:21000000, basis:'total', size:2, unit:'acre',
    status:'available', verified:true, added:'2026-08-16', img:PIC.villaPool,
    note:'Four bedrooms, borewell, guava orchard and staff quarter. Registry ready.' },

  { id:'np-105', sample:true, title:'Commercial Plot on the NH-9 Hisar Bypass',
    type:'commercial-land', city:'hisar', price:32000000, basis:'total', size:900, unit:'sq yd',
    status:'available', verified:true, added:'2026-08-11', img:PIC.highway,
    note:'Highway frontage of 75 ft. Suitable for a showroom, dhaba-hotel or fuel station.' },

  { id:'np-106', sample:true, title:'25 Acre Agriculture Land on the Sardarshahar Belt',
    type:'agriculture-land', city:'sardarshahar', price:650000, basis:'per acre', size:25, unit:'acre',
    status:'available', verified:true, added:'2026-08-05', img:PIC.arid,
    note:'Continuous holding, patta clean, kaccha approach from the Churu road. Good for a solar lease.' },

  { id:'np-107', sample:true, title:'200 Sq Yd Plot in a Registered Colony, Bhiwani',
    type:'residential-plot', city:'bhiwani', price:2400000, basis:'total', size:200, unit:'sq yd',
    status:'available', verified:true, added:'2026-07-29', img:PIC.suburb,
    note:'Internal development complete, sewer and water connected, registry on the spot.' },

  { id:'np-108', sample:true, title:'2 Acre Warehouse Plot, Jhajjar Industrial Belt',
    type:'industrial-land', city:'jhajjar', price:16000000, basis:'total', size:2, unit:'acre',
    status:'available', verified:true, added:'2026-07-22', img:PIC.warehouse,
    note:'Boundary walled, 30 ft internal road, 6 km from the KMP interchange.' },

  { id:'np-109', sample:true, title:'8 Acre Agriculture Land near Julana',
    type:'agriculture-land', city:'julana', price:2800000, basis:'per acre', size:8, unit:'acre',
    status:'available', verified:true, added:'2026-07-14', img:PIC.cropAerial,
    note:'Canal irrigation, level land, no acquisition notice on the revenue estate.' },

  { id:'np-110', sample:true, title:'6 Acre Agriculture Land Available on Lease, Gohana',
    type:'agriculture-land', city:'gohana', price:95000, basis:'monthly', size:6, unit:'acre',
    status:'available', verified:true, added:'2026-07-06', img:PIC.cattle,
    note:'Eleven-month renewable agreement. Borewell and three-phase connection included.' },

  { id:'np-111', sample:true, title:'15 Acre Agriculture Land near Tosham',
    type:'agriculture-land', city:'tosham', price:2200000, basis:'per acre', size:15, unit:'acre',
    status:'sold', verified:true, added:'2026-06-18', img:PIC.bigTree,
    note:'Sold in 38 days to a repeat buyer. Closed at the Tosham tehsil.' },

  { id:'np-112', sample:true, title:'Farmhouse on 1.5 Acre, Kalanaur',
    type:'farmhouse', city:'kalanaur', price:11500000, basis:'total', size:1.5, unit:'acre',
    status:'sold', verified:true, added:'2026-05-30', img:PIC.houseDusk,
    note:'Sold to a Rohtak family in June. Boundary re-marked with the seller before handover.' }
];

/* ── Wanted: buyers publishing what they are looking for ─────────────────
   posted — ISO date. Requests expire 45 days after posting.               */
const WANTED = [
  { id:'w-31', title:'Agriculture land, 10–20 acres, road touching',
    type:'agriculture-land', city:'rohtak', budgetMin:30000000, budgetMax:80000000,
    sizeText:'10 – 20 acre', by:'Buyer · Delhi', posted:'2026-08-27',
    note:'Looking for a single khasra with tar-road frontage anywhere on the Rohtak–Meham–Bhiwani line. Own funds, can close in 60 days.' },

  { id:'w-30', title:'Warehouse plot on the Bahadurgarh or KMP belt',
    type:'industrial-land', city:'bahadurgarh', budgetMin:12000000, budgetMax:30000000,
    sizeText:'1 – 2 acre', by:'Logistics firm · Delhi', posted:'2026-08-23',
    note:'CLU-cleared preferred but will consider agricultural if the conversion path is clean. Need 30 ft plus approach and three-phase power.' },

  { id:'w-29', title:'Residential plot, 200–350 sq yd, HSVP sector',
    type:'residential-plot', city:'hisar', budgetMin:2000000, budgetMax:5000000,
    sizeText:'200 – 350 sq yd', by:'Buyer · Hisar', posted:'2026-08-20',
    note:'Building for self-use next year. Registry must be possible immediately, not a GPA transfer.' },

  { id:'w-28', title:'Large agriculture holding for a solar lease',
    type:'agriculture-land', city:'bikaner', budgetMin:15000000, budgetMax:60000000,
    sizeText:'40 – 120 acre', by:'Renewables developer', posted:'2026-08-12',
    note:'Contiguous parcel, within 8 km of a 33 kV line. Bikaner, Dungargarh or Sardarshahar all workable. Will lease or buy.' },

  { id:'w-27', title:'Agriculture land on lease for a plant nursery',
    type:'agriculture-land', city:'sonipat', budgetMin:60000, budgetMax:150000,
    sizeText:'3 – 6 acre', by:'Nursery owner · Sonipat', posted:'2026-08-06',
    note:'Monthly budget shown. Need borewell water and three-phase power. Minimum three-year lease.' },

  { id:'w-26', title:'Commercial land, highway facing, Jind or Narwana side',
    type:'commercial-land', city:'jind', budgetMin:8000000, budgetMax:25000000,
    sizeText:'500 – 1500 sq yd', by:'Hospitality group', posted:'2026-07-31',
    note:'For a budget hotel and dhaba. Frontage matters more than depth. Narwana, Uchana and Safidon all considered.' }
];

/* ── What buyers said ────────────────────────────────────────────────── */
const REVIEWS = [
  { stars:5, lang:'EN', name:'Rakesh Yadav', role:'Buyer · Jhajjar',
    text:'I had been shown the same six acres by three different dealers, each with a different story about the mutation. Ashok ji pulled the record himself, showed me where the chain broke, and told me not to buy it. Two months later he found me a cleaner piece. That first "no" is why I came back.' },
  { stars:5, lang:'HI', name:'Sunita Devi', role:'Seller · Gohana',
    text:'मेरी ज़मीन दो साल से बिक नहीं रही थी। नव्या प्रॉपर्टीज़ ने पहले पूरे कागज़ ठीक करवाए, फिर सही पार्टी लाई। रजिस्ट्री तक हर बार वही लोग साथ थे, कोई नया आदमी नहीं आया। कीमत भी उम्मीद से बेहतर मिली।' },
  { stars:5, lang:'EN', name:'Prakash Menon', role:'Director · Logistics company',
    text:'We needed a shed-ready acre in Bahadurgarh and had a board deadline. The team gave us the CLU status and the power-load position in writing before the first visit, which no other broker did. Registration closed nine days ahead of our date.' }
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
