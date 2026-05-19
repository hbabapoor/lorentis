# LORENTIS Website — Management Guide

## Folder Structure

```
lorentis/
├── index.html              ← Main website (don't edit unless needed)
├── css/
│   └── style.css           ← All styling
├── js/
│   ├── products.js         ← ⭐ UPDATE THIS for prices, stock, products
│   └── main.js             ← Site logic (don't edit unless needed)
└── images/
    ├── hero/
    │   └── hero-bathroom.jpg       ← Main hero background (1920×1080px ideal)
    ├── brand/
    │   ├── showroom.jpg            ← Showroom section image (800×600px ideal)
    │   └── favicon.svg             ← Browser tab icon
    ├── pvc-cladding/               ← Product images for PVC cladding
    ├── vanity/                     ← Product images for vanities
    ├── led-mirror/                 ← Product images for LED mirrors
    └── smart-toilets/              ← Product images for smart toilets
```

---

## ⭐ How to Update Prices

Open `js/products.js` and find the product. Change the `price` field:

```js
price: 189,      // ← Change this number (AUD, no $ sign)
salePrice: null, // ← Set a sale price here, or null for no sale
```

**Example — put a product on sale:**
```js
price: 1290,
salePrice: 990,   // ← Shows A$990 with A$1290 crossed out
```

**Example — remove a sale:**
```js
price: 1290,
salePrice: null,  // ← Back to normal pricing
```

---

## 📦 How to Update Stock / Inventory

Open `js/products.js`, find the product, change `stock`:

```js
stock: 148,   // ← Current quantity on hand
```

- `stock: 0` → shows "Out of Stock" button (disabled)
- `stock: 1–5` → shows "Only X left" warning badge
- `stock: 6+` → shows normally

---

## 🖼️ How to Update Product Photos

1. **Prepare your image:** JPG or WebP, ideally 800×600px (4:3 ratio), under 300KB per image.
2. **Place it** in the correct folder under `images/`:
   - PVC Cladding → `images/pvc-cladding/your-photo.jpg`
   - Vanity → `images/vanity/your-photo.jpg`
   - LED Mirror → `images/led-mirror/your-photo.jpg`
   - Smart Toilets → `images/smart-toilets/your-photo.jpg`
3. **Update `js/products.js`** — find the product and update the `images` array:

```js
images: [
  "images/vanity/aria-600-front.jpg",    // ← First image shown on card
  "images/vanity/aria-600-angle.jpg",    // ← Shown as thumbnail in modal
  "images/vanity/aria-600-detail.jpg",   // ← Shown as thumbnail in modal
],
```

The **first image** is used as the main product card photo.

---

## ➕ How to Add a New Product

1. Open `js/products.js`
2. Copy an existing product block (from `{` to `},`)
3. Paste it in the correct category section
4. Update ALL fields, especially:
   - `id` — must be **unique** (e.g. `"van-004"`)
   - `name`, `subtitle`, `description`
   - `price`, `salePrice`, `stock`, `sku`
   - `images` array
   - `features`, `colours`, `sizes`, `warranty`
5. Set `active: true` to show it, `active: false` to hide it

---

## 🗂️ How to Add a New Product Category

1. Open `js/products.js`
2. In the `CATEGORIES` object, add your new category:

```js
"tapware": {
  label: "Tapware",
  icon: "ti-droplet-half",
  description: "Premium tapware and mixers for bathrooms and kitchens"
},
```

3. Add products with `category: "tapware"`
4. In `index.html`, add a new tab button in the `.cat-tabs` section:

```html
<button class="cat-tab" data-cat="tapware" role="tab" aria-selected="false" onclick="filterCategory('tapware')">
  <i class="ti ti-droplet-half" aria-hidden="true"></i> Tapware
</button>
```

---

## 🏷️ Product Badges

Set the `badge` field to one of these values:

| Badge value   | Appearance     | Use for                    |
|---------------|----------------|----------------------------|
| `"On Sale"`   | Red pill       | Discounted products        |
| `"New"`       | Blue pill      | Recently added products    |
| `"Popular"`   | Gold pill      | Top sellers                |
| `"Bestseller"`| Green pill     | #1 in category             |
| `"Premium"`   | Dark pill      | Luxury / flagship products |
| `null`        | No badge       | Default — no badge shown   |

---

## ⚙️ Site Settings

At the bottom of `js/products.js`:

```js
const SITE_SETTINGS = {
  currency: "AUD",
  currencySymbol: "A$",
  freeShippingThreshold: 500,    // ← Minimum order for free shipping
  standardShippingRate: 149,     // ← Flat rate below threshold
  gst: 0.10,                     // ← 10% GST (don't change unless law changes)
  contactEmail: "sales@lorentis.com.au",
  contactPhone: "1800 567 890",
  abn: "12 345 678 901",
  showroomAddress: "...",
  deliveryNote: "Delivering Australia-wide..."
};
```

---

## 🚀 Going Live — Checklist

- [ ] Replace `images/hero/hero-bathroom.jpg` with your hero photo
- [ ] Replace `images/brand/showroom.jpg` with your showroom photo
- [ ] Add all product photos to the correct `images/` subfolders
- [ ] Update all product prices and stock levels
- [ ] Update ABN, phone, email, address in `js/products.js` SITE_SETTINGS
- [ ] Update social media links in `index.html` footer
- [ ] Connect a payment gateway (Stripe, Square, PayPal) — see note below
- [ ] Set up a domain and hosting (Netlify, Cloudflare Pages, or your own server)
- [ ] Add Google Analytics tracking code

## 💳 Adding Real Payments

The cart currently collects orders but doesn't process payments. To add real checkout:

**Option A — Shopify Buy Button:** Embed Shopify's buy button into each product card. Keep this site as the storefront, Shopify handles inventory + payments.

**Option B — Stripe:** Integrate Stripe Checkout. When user clicks "Secure Checkout", redirect to a Stripe-hosted payment page. Requires a small backend (Node.js/PHP).

**Option C — Square Online:** Migrate products to Square Online which provides a full hosted solution.

Contact your developer with this codebase — the product data structure in `products.js` makes migration straightforward.

---

*Last updated: 2025 · LORENTIS Pty Ltd*
