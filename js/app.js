// VOLTURA Marketplace App

const CART_KEY = 'voltura_mp_cart';

// Init business profile
document.getElementById('coverImg').style.backgroundImage = `url('${BUSINESS.coverImage}')`;
document.getElementById('bizDesc').textContent = BUSINESS.description;

// Cart helpers
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}
function addToCart(id) {
  let cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}
function updateQty(id, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}
function cartTotal() {
  return getCart().reduce((sum, i) => {
    const p = getProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}
function updateCartUI() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.style.display = count > 0 ? 'flex' : 'none';

  const body = document.getElementById('cartBody');
  if (cart.length === 0) {
    body.innerHTML = '<p style="color:var(--secondary);text-align:center;padding:40px 0">Your basket is empty</p>';
  } else {
    body.innerHTML = cart.map(i => {
      const p = getProduct(i.id);
      if (!p) return '';
      return `<div class="cart-item">
        <img src="${p.images[0]}" alt="">
        <div style="flex:1">
          <div style="font-weight:500;font-size:0.9rem">${p.name}</div>
          <div style="color:var(--secondary);font-size:0.85rem">${formatPrice(p.price)}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
            <button onclick="updateQty('${i.id}',${i.qty-1})" style="width:28px;height:28px;border:1px solid var(--border);border-radius:4px">−</button>
            <span>${i.qty}</span>
            <button onclick="updateQty('${i.id}',${i.qty+1})" style="width:28px;height:28px;border:1px solid var(--border);border-radius:4px">+</button>
            <button onclick="removeFromCart('${i.id}')" style="margin-left:auto;color:#e74c3c;font-size:0.8rem">Remove</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  document.getElementById('cartTotal').textContent = formatPrice(cartTotal());
  const btn = document.getElementById('whatsappCartBtn');
  if (cart.length > 0) {
    btn.href = whatsappCartLink(cart);
    btn.style.opacity = '1';
  } else {
    btn.href = '#';
    btn.style.opacity = '0.5';
  }
}

// Filters & render
let currentCat = 'all';
let currentSort = 'featured';
let searchQuery = '';

function renderProducts() {
  let list = [...products];

  if (currentCat !== 'all') list = list.filter(p => p.category === currentCat);
  if (document.getElementById('availOnly').checked) list = list.filter(p => p.available);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (currentSort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (currentSort === 'featured') list.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));

  document.getElementById('resultCount').textContent = list.length + ' listing' + (list.length !== 1 ? 's' : '');

  document.getElementById('productGrid').innerHTML = list.map(p => `
    <article class="product-card">
      <a href="product.html?id=${p.id}">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-card-body">
        <div class="price">${formatPrice(p.price)}</div>
        <div class="name"><a href="product.html?id=${p.id}">${p.name}</a></div>
        <div class="meta">${p.category} · ${p.condition} · ${p.available ? 'In stock' : 'Sold out'}</div>
        <div class="actions">
          <a href="${whatsappLink(p)}" class="btn btn-whatsapp btn-sm" target="_blank" style="width:100%">Order on WhatsApp</a>
          <button class="btn btn-outline btn-sm" style="width:100%" onclick="addToCart('${p.id}')">Add to Basket</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Event listeners
document.querySelectorAll('input[name="cat"]').forEach(r => {
  r.addEventListener('change', () => { currentCat = r.value; renderProducts(); });
});
document.getElementById('sortSelect').addEventListener('change', e => {
  currentSort = e.target.value; renderProducts();
});
document.getElementById('availOnly').addEventListener('change', renderProducts);
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value; renderProducts();
});

// Cart drawer
document.getElementById('openCart').addEventListener('click', () => {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
});
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

// Init
renderProducts();
updateCartUI();
