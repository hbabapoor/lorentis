/* ============================================================
   LORENTIS — Main Site Script
   ============================================================ */

'use strict';

/* ── STATE ────────────────────────────────────────────── */
const state = {
  cart: JSON.parse(localStorage.getItem('lorentis_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('lorentis_wishlist') || '[]'),
  activeCategory: 'all',
  currentProduct: null,
  selectedVariants: {}
};

/* ── HELPERS ──────────────────────────────────────────── */
const fmt = (n) => `${SITE_SETTINGS.currencySymbol}${Number(n).toLocaleString('en-AU', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;

const badgeClass = { 'On Sale': 'tag-sale', 'New': 'tag-new', 'Popular': 'tag-pop', 'Premium': 'tag-prem', 'Bestseller': 'tag-best' };

function getStockLabel(stock) {
  if (stock === 0) return { text: 'Out of Stock', cls: '' };
  if (stock <= 5) return { text: `Only ${stock} left`, cls: 'low' };
  return null;
}

function saveCart() {
  localStorage.setItem('lorentis_cart', JSON.stringify(state.cart));
}
function saveWishlist() {
  localStorage.setItem('lorentis_wishlist', JSON.stringify(state.wishlist));
}

/* ── TOAST ────────────────────────────────────────────── */
function showToast(msg, icon = 'ti-check') {
  const t = document.getElementById('toast');
  t.innerHTML = `<i class="ti ${icon}"></i> ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── CART ─────────────────────────────────────────────── */
function addToCart(productId, qty = 1, variant = '') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock === 0) return;

  const key = `${productId}__${variant}`;
  const existing = state.cart.find(i => i.key === key);
  const price = product.salePrice || product.price;

  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ key, productId, qty, variant, price, name: product.name, subtitle: product.subtitle, image: product.images[0] || '' });
  }

  saveCart();
  renderCartCount();
  showToast(`${product.name} added to cart`, 'ti-shopping-cart');
}

function removeFromCart(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  saveCart();
  renderCartCount();
  renderCartItems();
}

function renderCartCount() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  el.textContent = total;
  el.classList.toggle('visible', total > 0);
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (state.cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="ti ti-shopping-cart"></i><p>Your cart is empty</p></div>`;
    updateCartTotals();
    return;
  }
  container.innerHTML = state.cart.map(item => {
    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--c-snow);"><i class="ti ti-photo" style="color:var(--c-silver)"></i></div>`;
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgHtml}</div>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-sub">${item.variant || item.subtitle} · Qty ${item.qty}</div>
          <span class="cart-item-remove" onclick="removeFromCart('${item.key}')">Remove</span>
        </div>
        <div>
          <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
        </div>
      </div>`;
  }).join('');
  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SITE_SETTINGS.freeShippingThreshold || subtotal === 0 ? 0 : SITE_SETTINGS.standardShippingRate;
  const gst = subtotal * SITE_SETTINGS.gst;
  const total = subtotal + shipping;

  const shippingNote = document.getElementById('shipping-note');
  if (subtotal > 0 && subtotal < SITE_SETTINGS.freeShippingThreshold) {
    const diff = SITE_SETTINGS.freeShippingThreshold - subtotal;
    shippingNote.textContent = `Add ${fmt(diff)} more for free shipping!`;
    shippingNote.style.display = 'block';
  } else if (subtotal >= SITE_SETTINGS.freeShippingThreshold) {
    shippingNote.textContent = '🎉 You qualify for free shipping!';
    shippingNote.style.display = 'block';
  } else {
    shippingNote.style.display = 'none';
  }

  document.getElementById('cart-subtotal').textContent = fmt(subtotal);
  document.getElementById('cart-shipping').textContent = shipping === 0 ? (subtotal === 0 ? fmt(0) : 'FREE') : fmt(shipping);
  document.getElementById('cart-gst').textContent = fmt(gst);
  document.getElementById('cart-total').textContent = fmt(total);
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-backdrop').classList.add('visible');
  renderCartItems();
}
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-backdrop').classList.remove('visible');
}

/* ── WISHLIST ─────────────────────────────────────────── */
function toggleWishlist(productId) {
  if (state.wishlist.includes(productId)) {
    state.wishlist = state.wishlist.filter(id => id !== productId);
    showToast('Removed from wishlist', 'ti-heart');
  } else {
    state.wishlist.push(productId);
    showToast('Added to wishlist', 'ti-heart-filled');
  }
  saveWishlist();
  document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(b => {
    b.classList.toggle('active', state.wishlist.includes(productId));
    b.querySelector('i').className = `ti ${state.wishlist.includes(productId) ? 'ti-heart-filled' : 'ti-heart'}`;
  });
}

/* ── PRODUCT GRID ─────────────────────────────────────── */
function renderProducts(category = 'all') {
  const grid = document.getElementById('product-grid');
  const filtered = PRODUCTS.filter(p => p.active && (category === 'all' || p.category === category));

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--c-mist);text-align:center;grid-column:1/-1;padding:3rem">No products found.</p>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => {
    const price = p.salePrice || p.price;
    const stock = getStockLabel(p.stock);
    const wishlisted = state.wishlist.includes(p.id);
    const cat = CATEGORIES[p.category];

    const imgHtml = p.images && p.images.length
      ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'product-img-placeholder\\'><i class=\\'ti ti-photo\\'></i><span>Image coming soon</span></div>'">`
      : `<div class="product-img-placeholder"><i class="ti ${cat?.icon || 'ti-photo'}"></i><span>Image coming soon</span></div>`;

    return `
      <article class="product-card animate-in delay-${Math.min(i % 4, 3)}" onclick="openModal('${p.id}')">
        <div class="product-img-wrap">
          ${imgHtml}
          ${p.badge ? `<div class="product-badge"><span class="tag ${badgeClass[p.badge] || 'tag-pop'}">${p.badge}</span></div>` : ''}
          ${stock?.cls === 'low' ? `<div class="product-stock-low">${stock.text}</div>` : ''}
          <button class="product-wishlist wishlist-btn ${wishlisted ? 'active' : ''}" data-id="${p.id}" onclick="event.stopPropagation();toggleWishlist('${p.id}')" aria-label="Wishlist">
            <i class="ti ${wishlisted ? 'ti-heart-filled' : 'ti-heart'}"></i>
          </button>
        </div>
        <div class="product-info">
          <div class="product-category">${cat?.label || p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-subtitle">${p.subtitle}</div>
          <div class="product-pricing">
            <span class="price-current ${p.salePrice ? 'price-sale' : ''}">${fmt(price)}</span>
            ${p.salePrice ? `<span class="price-was">${fmt(p.price)}</span>` : ''}
            <span class="price-unit">${p.unit}</span>
          </div>
          <small class="price-gst">Inc. GST · ${SITE_SETTINGS.deliveryNote}</small>
          <div class="product-actions">
            <button class="btn-cart" onclick="event.stopPropagation();addToCart('${p.id}')" ${p.stock === 0 ? 'disabled' : ''}>
              <i class="ti ti-shopping-cart"></i>
              ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button class="btn-view" onclick="event.stopPropagation();openModal('${p.id}')">
              <i class="ti ti-eye"></i>
            </button>
          </div>
        </div>
      </article>`;
  }).join('');
}

/* ── MODAL ────────────────────────────────────────────── */
function openModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  state.currentProduct = p;
  state.selectedVariants[productId] = state.selectedVariants[productId] || {};

  const modal = document.getElementById('product-modal');
  const cat = CATEGORIES[p.category];
  const price = p.salePrice || p.price;

  // Gallery
  const mainImg = p.images[0]
    ? `<img src="${p.images[0]}" id="modal-main-img" alt="${p.name}" onerror="this.src=''">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--c-snow)"><i class="ti ${cat?.icon || 'ti-photo'}" style="font-size:4rem;color:var(--c-silver)"></i></div>`;

  const thumbs = p.images.length > 1 ? p.images.map((img, i) => `
    <div class="modal-thumb ${i===0?'active':''}" onclick="switchImage('${img}',this)">
      <img src="${img}" alt="thumb ${i+1}" onerror="this.style.display='none'">
    </div>`).join('') : '';

  // Variants
  const colorOptions = p.colours?.length ? `
    <div class="modal-variant-group">
      <label>Colour</label>
      <div class="variant-options">
        ${p.colours.map((c,i) => `<button class="variant-btn ${i===0?'active':''}" onclick="selectVariant(this,'colour','${c}')">${c}</button>`).join('')}
      </div>
    </div>` : '';

  const sizeOptions = p.sizes?.length ? `
    <div class="modal-variant-group">
      <label>Size</label>
      <div class="variant-options">
        ${p.sizes.map((s,i) => `<button class="variant-btn ${i===0?'active':''}" onclick="selectVariant(this,'size','${s}')">${s}</button>`).join('')}
      </div>
    </div>` : '';

  modal.innerHTML = `
    <div class="modal-gallery">
      <div class="modal-gallery-main">${mainImg}</div>
      ${thumbs ? `<div class="modal-gallery-thumbs">${thumbs}</div>` : ''}
    </div>
    <div class="modal-details">
      <div class="modal-cat"><i class="ti ${cat?.icon || 'ti-tag'}"></i> ${cat?.label}</div>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-sub">${p.subtitle}</p>
      <div class="modal-price-block">
        <div>
          <span class="modal-price ${p.salePrice ? 'price-sale' : ''}">${fmt(price)}</span>
          ${p.salePrice ? `<span class="modal-price-was">${fmt(p.price)}</span>` : ''}
        </div>
        <div class="modal-price-info">${p.unit} · Inc. GST · SKU: ${p.sku}</div>
      </div>
      <p class="modal-desc">${p.description}</p>

      ${colorOptions}${sizeOptions}

      <div class="qty-row">
        <span class="qty-label">Qty</span>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(-1)"><i class="ti ti-minus"></i></button>
          <input class="qty-input" id="modal-qty" type="number" value="1" min="1" max="${p.stock}">
          <button class="qty-btn" onclick="changeQty(1)"><i class="ti ti-plus"></i></button>
        </div>
      </div>

      <div class="modal-features">
        <h4>Key Features</h4>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>

      <div class="modal-meta">
        <div class="modal-meta-item"><span>Warranty</span><span>${p.warranty}</span></div>
        <div class="modal-meta-item"><span>Stock</span><span>${p.stock > 0 ? `${p.stock} available` : 'Out of stock'}</span></div>
      </div>

      <button class="btn-add-to-cart" id="modal-add-btn" onclick="modalAddToCart()" ${p.stock===0?'disabled':''}>
        <i class="ti ti-shopping-cart"></i>
        ${p.stock===0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <div class="modal-warranty"><i class="ti ti-shield-check"></i> ${p.warranty} warranty · Australian stock · GST included</div>
    </div>`;

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchImage(src, thumbEl) {
  const main = document.getElementById('modal-main-img');
  if (main) main.src = src;
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function selectVariant(btn, type, value) {
  btn.closest('.variant-options').querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (state.currentProduct) {
    state.selectedVariants[state.currentProduct.id] = state.selectedVariants[state.currentProduct.id] || {};
    state.selectedVariants[state.currentProduct.id][type] = value;
  }
}

function changeQty(delta) {
  const input = document.getElementById('modal-qty');
  const max = state.currentProduct?.stock || 1;
  const newVal = Math.max(1, Math.min(max, parseInt(input.value) + delta));
  input.value = newVal;
}

function modalAddToCart() {
  const p = state.currentProduct;
  if (!p) return;
  const qty = parseInt(document.getElementById('modal-qty').value) || 1;
  const variants = state.selectedVariants[p.id] || {};
  const variantStr = Object.values(variants).join(' · ');
  addToCart(p.id, qty, variantStr);
}

/* ── CATEGORY FILTER ──────────────────────────────────── */
function filterCategory(cat) {
  state.activeCategory = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  renderProducts(cat);
}

/* ── HEADER SCROLL ────────────────────────────────────── */
function initScrollBehavior() {
  window.addEventListener('scroll', () => {
    document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── INTERSECTION OBSERVER (fade-in on scroll) ────────── */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.why-card, .testimonial-card, .showroom-inner').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── NEWSLETTER ───────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('nl-email');
  if (!input.value.includes('@')) return;
  showToast('Thank you! You\'re now subscribed.', 'ti-mail');
  input.value = '';
}

/* ── CHECKOUT STUB ────────────────────────────────────── */
function goToCheckout() {
  if (state.cart.length === 0) { showToast('Your cart is empty', 'ti-alert-circle'); return; }
  showToast('Checkout coming soon — contact us to place your order!', 'ti-info-circle');
}

/* ── INIT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderCartCount();
  initScrollBehavior();
  setTimeout(initAnimations, 100);

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Newsletter
  const nlForm = document.getElementById('nl-form');
  if (nlForm) nlForm.addEventListener('submit', handleNewsletter);

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeCart(); }
  });
});
