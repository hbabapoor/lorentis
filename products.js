/**
 * LORENTIS PRODUCT CATALOGUE
 * ============================================================
 * HOW TO UPDATE:
 *   - Prices: change the "price" field (AUD, no $ sign)
 *   - Sale price: set "salePrice" (leave null if no sale)
 *   - Stock: change "stock" to current quantity (0 = out of stock)
 *   - Photos: place images in /images/{category}/ folder
 *              then update the "images" array with filenames
 *   - Add a product: copy an existing object, paste below it,
 *              give it a unique "id", update all fields
 *   - Hide a product: set "active": false
 *   - Add a category: add a new key to CATEGORIES and add products
 * ============================================================
 */

const CATEGORIES = {
  "pvc-cladding": {
    label: "PVC Cladding",
    icon: "ti-building",
    description: "Premium weatherboard & interior cladding systems built for Australian conditions"
  },
  "vanity": {
    label: "Vanity Units",
    icon: "ti-droplet",
    description: "Designer bathroom vanities crafted for style and lasting durability"
  },
  "led-mirror": {
    label: "LED Mirrors",
    icon: "ti-brightness",
    description: "Smart illuminated mirrors with anti-fog, touch control & colour temperature"
  },
  "smart-toilets": {
    label: "Smart Toilets",
    icon: "ti-refresh",
    description: "Intelligent toilet systems with integrated bidet, heated seat & auto flush"
  }
};

const PRODUCTS = [

  /* ── PVC CLADDING ─────────────────────────────────────── */
  {
    id: "clad-001",
    active: true,
    category: "pvc-cladding",
    name: "Coastal Weatherboard Classic",
    subtitle: "180mm Chamfer Profile",
    description: "UV-stabilised, bushfire-resistant PVC weatherboard perfect for coastal and inland builds. Lightweight, termite-proof and maintenance-free. Available in 6m lengths.",
    features: ["Bushfire BAL-29 rated", "UV-stabilised coating", "Termite & rot proof", "Easy clip-lock install", "6m board lengths"],
    price: 189,
    salePrice: null,
    unit: "per board",
    stock: 148,
    sku: "LOR-CLAD-001",
    badge: null,
    images: [
      "images/pvc-cladding/coastal-classic-1.jpg",
      "images/pvc-cladding/coastal-classic-2.jpg",
      "images/pvc-cladding/coastal-classic-3.jpg"
    ],
    colours: ["Arctic White", "Sandstone", "Ironbark Grey", "Charcoal"],
    warranty: "25 years"
  },
  {
    id: "clad-002",
    active: true,
    category: "pvc-cladding",
    name: "Shiplap Shadow Line",
    subtitle: "130mm Horizontal Profile",
    description: "Contemporary shiplap profile delivering clean shadow lines and a modern architectural finish. Ideal for feature walls, extensions and new builds.",
    features: ["Deep shadow line profile", "Zero formaldehyde", "Fire retardant", "Pre-primed surface", "Paintable any colour"],
    price: 215,
    salePrice: 179,
    unit: "per board",
    stock: 72,
    sku: "LOR-CLAD-002",
    badge: "On Sale",
    images: [
      "images/pvc-cladding/shiplap-1.jpg",
      "images/pvc-cladding/shiplap-2.jpg"
    ],
    colours: ["Primed White", "Ash Grey", "Night Sky"],
    warranty: "25 years"
  },
  {
    id: "clad-003",
    active: true,
    category: "pvc-cladding",
    name: "Timber Look V-Groove Panel",
    subtitle: "Woodgrain Embossed",
    description: "Authentic timber look without the upkeep. Embossed woodgrain texture in popular Australian species tones. Perfect for interior feature walls and exterior facades.",
    features: ["Realistic woodgrain emboss", "No painting required", "Insect & moisture proof", "12mm panel thickness", "V-groove jointing"],
    price: 249,
    salePrice: null,
    unit: "per panel (2.4m²)",
    stock: 34,
    sku: "LOR-CLAD-003",
    badge: "Popular",
    images: [
      "images/pvc-cladding/timber-look-1.jpg",
      "images/pvc-cladding/timber-look-2.jpg"
    ],
    colours: ["Blackbutt", "Spotted Gum", "Merbau", "Brushbox"],
    warranty: "20 years"
  },

  /* ── VANITY UNITS ─────────────────────────────────────── */
  {
    id: "van-001",
    active: true,
    category: "vanity",
    name: "Aria Wall-Hung Vanity",
    subtitle: "600mm — Matte White",
    description: "Floating wall-hung vanity with push-to-open soft-close drawers and an integrated ceramic basin. A contemporary centrepiece for the modern Australian bathroom.",
    features: ["Push-to-open soft-close", "Integrated ceramic basin", "Wall-hung (concealed fixings)", "Moisture-resistant carcass", "Under-basin cable management"],
    price: 1290,
    salePrice: null,
    unit: "each",
    stock: 18,
    sku: "LOR-VAN-001",
    badge: "Bestseller",
    images: [
      "images/vanity/aria-600-1.jpg",
      "images/vanity/aria-600-2.jpg",
      "images/vanity/aria-600-3.jpg"
    ],
    colours: ["Matte White", "Concrete Grey", "Navy"],
    sizes: ["600mm", "750mm", "900mm", "1200mm"],
    warranty: "10 years"
  },
  {
    id: "van-002",
    active: true,
    category: "vanity",
    name: "Nova Freestanding Vanity",
    subtitle: "900mm — Gunmetal & Oak",
    description: "Striking two-tone freestanding vanity with a gunmetal frame and warm Australian oak drawer fronts. Pairs beautifully with our LED mirror range.",
    features: ["Powder-coated steel frame", "Solid oak drawer fronts", "Undermount stone basin", "Soft-close Blum hardware", "Plinth feet (adjustable)"],
    price: 2190,
    salePrice: 1890,
    unit: "each (basin included)",
    stock: 7,
    sku: "LOR-VAN-002",
    badge: "On Sale",
    images: [
      "images/vanity/nova-900-1.jpg",
      "images/vanity/nova-900-2.jpg"
    ],
    colours: ["Gunmetal + Oak", "Matte Black + Walnut"],
    sizes: ["750mm", "900mm", "1200mm"],
    warranty: "10 years"
  },
  {
    id: "van-003",
    active: true,
    category: "vanity",
    name: "Cove Shaker Vanity",
    subtitle: "750mm — Satin White",
    description: "Timeless shaker-style vanity with a traditional inset frame and Carrara-look stone top. Blends beautifully with classic and Hamptons-style interiors.",
    features: ["Inset shaker door & drawer", "Carrara stone benchtop", "Undermount basin", "Soft-close hinges", "Adjustable shelf inside"],
    price: 1590,
    salePrice: null,
    unit: "each",
    stock: 12,
    sku: "LOR-VAN-003",
    badge: null,
    images: [
      "images/vanity/cove-750-1.jpg",
      "images/vanity/cove-750-2.jpg"
    ],
    colours: ["Satin White", "Sage Green", "Duck Egg Blue"],
    sizes: ["600mm", "750mm", "900mm"],
    warranty: "10 years"
  },

  /* ── LED MIRRORS ─────────────────────────────────────── */
  {
    id: "mir-001",
    active: true,
    category: "led-mirror",
    name: "Lux Pro Backlit Mirror",
    subtitle: "900 × 700mm — Touch Dimmer",
    description: "Hotel-grade backlit LED mirror with warm-to-cool colour temperature adjustment (2700K–6500K), built-in demister pad and 1-touch dimmer.",
    features: ["2700K–6500K colour temp", "Touch-sensitive dimmer", "Anti-fog demister pad", "IP44 water resistant", "Memory function (last setting)"],
    price: 649,
    salePrice: null,
    unit: "each",
    stock: 31,
    sku: "LOR-MIR-001",
    badge: "Bestseller",
    images: [
      "images/led-mirror/lux-pro-1.jpg",
      "images/led-mirror/lux-pro-2.jpg",
      "images/led-mirror/lux-pro-3.jpg"
    ],
    sizes: ["600×700", "750×700", "900×700", "1200×700"],
    warranty: "5 years"
  },
  {
    id: "mir-002",
    active: true,
    category: "led-mirror",
    name: "Arch Illuminated Mirror",
    subtitle: "500 × 900mm — Arched Frame",
    description: "Architectural arched mirror with a warm-white LED halo. Makes a bold design statement in any bathroom or dressing room. Available in round and arch profiles.",
    features: ["Warm-white 3000K halo", "Solid aluminium frame", "Hardwired or plug-in", "Anti-reflective glass", "Landscape or portrait mount"],
    price: 895,
    salePrice: 749,
    unit: "each",
    stock: 15,
    sku: "LOR-MIR-002",
    badge: "On Sale",
    images: [
      "images/led-mirror/arch-1.jpg",
      "images/led-mirror/arch-2.jpg"
    ],
    sizes: ["500×900 Arch", "700×700 Round", "600×800 Rect"],
    warranty: "5 years"
  },
  {
    id: "mir-003",
    active: true,
    category: "led-mirror",
    name: "Smart Mirror with Display",
    subtitle: "900 × 700mm — Bluetooth + Clock",
    description: "Next-generation smart mirror featuring a built-in LCD time/date display, Bluetooth speaker, touch controls and integrated USB charging port.",
    features: ["Bluetooth 5.0 speaker", "LCD time & date display", "USB-A charging port", "Voice-control compatible", "Smart home integration"],
    price: 1249,
    salePrice: null,
    unit: "each",
    stock: 9,
    sku: "LOR-MIR-003",
    badge: "New",
    images: [
      "images/led-mirror/smart-1.jpg",
      "images/led-mirror/smart-2.jpg"
    ],
    sizes: ["900×700", "1200×700"],
    warranty: "5 years"
  },

  /* ── SMART TOILETS ────────────────────────────────────── */
  {
    id: "tlt-001",
    active: true,
    category: "smart-toilets",
    name: "AquaComfort S1",
    subtitle: "Integrated Bidet Toilet Suite",
    description: "Entry-level smart toilet with integrated rear cleanse, front feminine wash, heated seat and warm-air dryer. Quick-release seat for easy cleaning.",
    features: ["Rear & front wash", "Heated seat (3 levels)", "Warm-air dryer", "Soft-close lid", "Quick-release seat"],
    price: 1890,
    salePrice: null,
    unit: "each",
    stock: 14,
    sku: "LOR-TLT-001",
    badge: null,
    images: [
      "images/smart-toilets/aqua-s1-1.jpg",
      "images/smart-toilets/aqua-s1-2.jpg",
      "images/smart-toilets/aqua-s1-3.jpg"
    ],
    colours: ["Gloss White"],
    warranty: "5 years"
  },
  {
    id: "tlt-002",
    active: true,
    category: "smart-toilets",
    name: "AquaComfort S3 Pro",
    subtitle: "Wall-Faced Smart Suite",
    description: "Mid-range wall-faced smart toilet with remote control, auto-flush sensor, adjustable spray pressure & temperature, night light and self-cleaning nozzle.",
    features: ["Auto-flush sensor", "Remote control + app", "Self-cleaning nozzle", "Adjustable pressure/temp", "Ambient night light"],
    price: 2990,
    salePrice: 2490,
    unit: "each",
    stock: 8,
    sku: "LOR-TLT-002",
    badge: "On Sale",
    images: [
      "images/smart-toilets/aqua-s3-1.jpg",
      "images/smart-toilets/aqua-s3-2.jpg"
    ],
    colours: ["Gloss White", "Matte White"],
    warranty: "7 years"
  },
  {
    id: "tlt-003",
    active: true,
    category: "smart-toilets",
    name: "AquaComfort S5 Elite",
    subtitle: "In-Wall Cistern Smart Toilet",
    description: "Our flagship smart toilet featuring a concealed in-wall cistern, dual-function shower spray, voice-activated lid, UV self-sterilisation and premium rimless design.",
    features: ["Concealed in-wall cistern", "UV self-sterilisation", "Voice-activated lid", "Rimless flush design", "App + remote control"],
    price: 4990,
    salePrice: null,
    unit: "each",
    stock: 4,
    sku: "LOR-TLT-003",
    badge: "Premium",
    images: [
      "images/smart-toilets/aqua-s5-1.jpg",
      "images/smart-toilets/aqua-s5-2.jpg"
    ],
    colours: ["Gloss White", "Matte Black"],
    warranty: "10 years"
  }

];

/* ── SITE SETTINGS ─────────────────────────────────────────
   Update these global settings without touching the HTML
   ──────────────────────────────────────────────────────── */
const SITE_SETTINGS = {
  currency: "AUD",
  currencySymbol: "A$",
  freeShippingThreshold: 500,         // A$ — above this, shipping is free
  standardShippingRate: 149,          // A$ flat rate below threshold
  gst: 0.10,                          // 10% GST included in all prices
  contactEmail: "sales@lorentis.com.au",
  contactPhone: "1800 567 890",
  abn: "12 345 678 901",
  showroomAddress: "Unit 4 / 28 Commerce Drive, Dandenong South VIC 3175",
  deliveryNote: "Delivering Australia-wide · 3–7 business days metro · 7–14 regional"
};
