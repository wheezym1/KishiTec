/* KISHI TEC · utilidades compartidas */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => 'S/ ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- Catálogo (viene de js/data.js) ---------- */
const Store = {
  all() { return PRODUCTS.filter(p => p.active !== 0); },
  get(id) { return Store.all().find(p => p.id === Number(id)); },
  categories() { return [...new Set(Store.all().map(p => p.category))]; },
  list({ category = '', q = '', sort = '', featured = false } = {}) {
    let r = Store.all();
    if (featured) r = r.filter(p => p.featured);
    if (category) r = r.filter(p => p.category === category);
    if (q) { const t = q.toLowerCase(); r = r.filter(p => (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().includes(t)); }
    const by = {
      precio_asc: (x, y) => x.price - y.price, precio_desc: (x, y) => y.price - x.price,
      populares: (x, y) => y.reviews - x.reviews, nuevos: (x, y) => y.id - x.id
    }[sort];
    return by ? r.sort(by) : r.sort((x, y) => (y.featured - x.featured) || (y.reviews - x.reviews));
  }
};
const shippingFor = subtotal => subtotal >= CONFIG.envioGratisDesde ? 0 : CONFIG.costoEnvio;
const waLink = text => 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);

/* ---------- Carrito (guardado en el navegador) ---------- */
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('kishitec_cart')) || []; } catch { return []; } },
  save(c) { localStorage.setItem('kishitec_cart', JSON.stringify(c)); Cart.updateBadge(); },
  count() { return Cart.get().reduce((a, i) => a + i.qty, 0); },
  add(id, qty = 1, max = 20) {
    const c = Cart.get(); const it = c.find(i => i.id === id);
    if (it) it.qty = Math.min(max, it.qty + qty); else c.push({ id, qty: Math.min(max, qty) });
    Cart.save(c);
  },
  set(id, qty) { let c = Cart.get(); c = qty <= 0 ? c.filter(i => i.id !== id) : c.map(i => i.id === id ? { ...i, qty } : i); Cart.save(c); },
  clear() { Cart.save([]); },
  updateBadge() { const b = $('#cartCount'); if (b) { const n = Cart.count(); b.textContent = n; b.hidden = n === 0; } }
};

function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2400);
}

function stars(r, n) {
  const full = Math.round(r);
  return `<div class="stars" aria-label="${r} de 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= full ? 'on' : ''}">★</i>`).join('')}<small>(${n})</small></div>`;
}
const CART_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 10.5h9.6L20 7H6.3"/><circle cx="9" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/></svg>';

function productCard(p) {
  const out = p.stock <= 0;
  return `<article class="card">
    <a class="ph" href="producto.html?id=${p.id}">${p.badge ? `<span class="tag">${esc(p.badge)}</span>` : ''}${out ? '<span class="tag out">Agotado</span>' : ''}<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></a>
    <h3><a href="producto.html?id=${p.id}">${esc(p.name)}</a></h3>
    <div class="row"><div><div class="price">${money(p.price)}</div>${stars(p.rating, p.reviews)}</div>
    <button class="add" data-add="${p.id}" data-stock="${p.stock}" aria-label="Agregar ${esc(p.name)} al carrito" ${out ? 'disabled' : ''}>${CART_SVG}</button></div>
  </article>`;
}
// Delegación: cualquier botón .add funciona en toda la web
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (!b || b.disabled) return;
  Cart.add(Number(b.dataset.add), 1, Number(b.dataset.stock) || 20);
  b.classList.add('done'); setTimeout(() => b.classList.remove('done'), 700);
  toast('Producto agregado al carrito');
});

/* ---------- Cabecera y pie ---------- */
const WING = '<svg viewBox="0 0 48 48" fill="none"><g fill="#d9b483"><path d="M4 30c8-2 18-8 30-22-3 12-10 20-18 24 7-1 14-6 20-14-2 11-10 19-20 21-5 1-9-2-12-9z"/><path d="M8 36c6 0 14-2 24-9-4 8-12 14-20 14-3 0-4-2-4-5z" opacity=".75"/></g></svg>';

function renderChrome() {
  const page = '/' + (location.pathname.split('/').pop().replace('.html', '') || 'index');
  const act = (...p) => p.includes(page) ? 'active' : '';
  $('#site-header').innerHTML = `
  <div class="topbar"><div class="wrap"><span>Envíos a todo el Perú</span><span>Compra segura</span><span>Envío gratis desde S/ 150</span></div></div>
  <header class="site"><div class="wrap">
    <a href="index.html" class="logo" aria-label="KISHI TEC inicio">${WING}<b>KISHI TEC</b></a>
    <nav class="main" id="nav">
      <a href="index.html" class="${act('/index')}">Inicio</a>
      <a href="tienda.html" class="${act('/tienda', '/producto')}">Tienda</a>
      <a href="nosotros.html" class="${act('/nosotros')}">Nosotros</a>
      <a href="contacto.html" class="${act('/contacto')}">Contacto</a>
    </nav>
    <div class="tools">
      <form class="search" action="tienda.html" role="search">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <input type="search" name="q" placeholder="Buscar productos..." aria-label="Buscar productos">
      </form>
      <a class="icon-btn" href="carrito.html" aria-label="Carrito"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 10.5h9.6L20 7H6.3"/><circle cx="9" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/></svg><span class="badge" id="cartCount">0</span></a>
      <button class="icon-btn burger" id="burger" aria-label="Menú"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div></div></header>`;

  $('#site-footer').innerHTML = `
  <footer class="site"><div class="wrap">
    <div class="foot">
      <div><a href="index.html" class="logo">${WING}<b>KISHI TEC</b></a><p class="lema">Eleva tu día.</p>
        <div class="social">
          <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg></a>
          <a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5"/><path d="M14 3c.4 2.6 2 4.2 5 4.5"/></svg></a>
          <a href="#" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 001.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/></svg></a>
        </div></div>
      <div><h4>Enlaces rápidos</h4><ul><li><a href="index.html">Inicio</a></li><li><a href="tienda.html">Tienda</a></li><li><a href="nosotros.html">Nosotros</a></li><li><a href="contacto.html">Contacto</a></li></ul></div>
      <div><h4>Categorías</h4><ul>${['Setup', 'Tecnología', 'Estudio', 'Trabajo', 'Finanzas', 'Accesorios'].map(c => `<li><a href="tienda.html?cat=${encodeURIComponent(c)}">${c}</a></li>`).join('')}</ul></div>
      <div class="news"><h4>Compra por WhatsApp</h4><p>Arma tu carrito en la web y envíanos tu pedido. Atención de lunes a sábado, de 9:00 a. m. a 7:00 p. m.</p>
        <a class="btn btn-gold sm" id="footWa" href="#" target="_blank" rel="noopener">Escribir por WhatsApp</a></div>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} KISHI TEC. Todos los derechos reservados.</span><span>Términos y condiciones · Política de privacidad</span></div>
  </div></footer>`;

  $('#burger').addEventListener('click', () => $('#nav').classList.toggle('open'));
  $('#footWa').href = waLink('Hola Kishi Tec, quisiera más información.');
  Cart.updateBadge();
}

/* Dibuja cabecera y pie al cargar */
document.addEventListener('DOMContentLoaded', renderChrome);
