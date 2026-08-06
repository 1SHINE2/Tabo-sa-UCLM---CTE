/**
 * cart.js — Cart State & UI Manager (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages adding/removing items, discounts, and rendering the cart UI.
 * Upgraded voucher logic for V2: checks against localStorage lock.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Cart = (() => {

  let items = {}; // { "prod-101": 2, "prod-102": 1 }
  let activeVoucher = null;
  const DISCOUNT_AMOUNT = 10; // ₱10 off

  // Easter Egg States
  let egg1Unlocked = false;
  let egg2Unlocked = false;
  let egg3Unlocked = false;

  function init() {
    _render();
  }

  function changeQty(productId, delta) {
    if (!items[productId]) items[productId] = 0;
    items[productId] += delta;
    if (items[productId] <= 0) delete items[productId];
    
    // If TABO10 is active, check if subtotal dropped below 50
    if (activeVoucher === 'TABO10') {
      let subtotal = 0;
      for (const [id, qty] of Object.entries(items)) {
        const p = window.PRODUCTS.find(x => x.id === id);
        if (p) subtotal += p.price * qty;
      }
      if (subtotal < 50) {
        activeVoucher = null;
        window.showToast('Tinanggal ang TABO10 (Kinakailangan ng ₱50 minimum spend)', 'warning');
      }
    }

    _checkEasterEggs();
    _render();
  }

  function _checkEasterEggs() {
    const hasBudbud = !!items['prod-003'];
    const hasBudbudLatik = !!items['prod-001'] || !!items['prod-002'];
    
    const cartKeys = Object.keys(items);
    const hasOnlyBinaki = cartKeys.length === 1 && cartKeys[0] === 'prod-010';

    if (hasBudbud && !egg1Unlocked) {
      egg1Unlocked = true;
      _showEasterEggIcon('egg1-video.mp4', 'OMG! 😍 Isang epic na love story ni Budbud Guy at Budbud Girl na mas matamis pa sa asukal! Panoorin ang kanilang mainit na pag-iibigan! ✨ (Maghanap ka pa ng ibang easter egg!)', '15%', '25%');
    }

    if (hasBudbudLatik && egg1Unlocked && !egg2Unlocked) {
      egg2Unlocked = true;
      _showEasterEggIcon('egg2-video.mp4', 'SHOCKING REVELATION! 😱 Dumating si Latik Girl at tuluyang nagtaksil si Budbud Guy! Ang kapal ng mukha! Iiyak ka sa tindi ng dramang ito! 💔 (Maghanap ka pa ng ibang easter egg!)', '75%', '40%');
    }

    if (hasOnlyBinaki && !egg3Unlocked) {
      egg3Unlocked = true;
      _showEasterEggIcon('egg3-video.mp4', 'THE GRAND FINALE! 🎉 Sa wakas, naka-move on si Budbud Girl at natagpuan ang tunay na pag-ibig kay Binaki Guy! 🌽❤️ (Ito na ang LAST easter egg! You just found a love story that no one asked for HAHAHAH.)', '45%', '70%');
    }
  }

  function _showEasterEggIcon(vidSrc, caption, top, left) {
    const egg = document.createElement('div');
    egg.innerHTML = '🥚';
    egg.className = 'fixed text-5xl cursor-pointer animate-bounce z-50 drop-shadow-2xl';
    egg.style.top = top;
    egg.style.left = left;
    egg.onclick = () => {
      if (window.playVideoModal) {
        window.playVideoModal(vidSrc, caption);
        egg.remove();
      }
    };
    document.body.appendChild(egg);
  }

  function getQty(productId) {
    return items[productId] || 0;
  }

  function getCount() {
    return Object.values(items).reduce((a, b) => a + b, 0);
  }

  function applyDiscount(codeOverride) {
    const input = document.getElementById('voucher-input');
    const rawCode = codeOverride || (input ? input.value : '');
    const code = String(rawCode).trim().toUpperCase();

    // Reset current discount first
    activeVoucher = null;

    if (!code) {
      _render();
      return { success: false, message: 'Please enter a voucher code.' };
    }
    
    // 10% General Voucher Logic (TABO10)
    if (code === 'TABO10') {
      if (localStorage.getItem('tabo10_used') === 'true') {
        window.showToast('Nagamit na ang voucher na ito.', 'error');
        if (input) input.value = '';
        _render();
        return { success: false, message: 'Voucher already used.' };
      }
      
      let subtotal = 0;
      for (const [id, qty] of Object.entries(items)) {
        const p = window.PRODUCTS.find(x => x.id === id);
        if (p) subtotal += p.price * qty;
      }
      
      if (subtotal < 50) {
        window.showToast('Kailangan ng hindi bababa sa ₱50 na kabuuang halaga.', 'error');
        _render();
        return { success: false, message: 'Minimum spend of ₱50 required.' };
      }
      
      activeVoucher = code;
      window.showToast('Nailapat na ang TABO10! 10% diskwento.', 'success');
      _render();
      return { success: true, code, message: '10% discount applied!' };
    }

    window.showToast('Imbalido ang voucher code.', 'error');
    _render();
    return { success: false, message: 'Invalid voucher code.' };
  }

  function getOrderPayload() {
    const lines = [];
    let subtotal = 0;

    for (const [id, qty] of Object.entries(items)) {
      const p = window.PRODUCTS.find(x => x.id === id);
      if (p) {
        const lineTotal = p.price * qty;
        subtotal += lineTotal;
        lines.push({ id, name: p.name, qty, price: p.price, lineTotal, image: p.image });
      }
    }

    let dynamicDiscount = 0;
    if (activeVoucher === 'TABO10') {
      if (subtotal >= 50) {
        dynamicDiscount = Math.floor(subtotal * 0.1);
      } else {
        activeVoucher = null;
      }
    }

    const total = Math.max(0, subtotal - dynamicDiscount);

    return {
      items: lines,
      subtotal,
      discount: dynamicDiscount,
      voucherUsed: activeVoucher || 'NONE',
      total
    };
  }

  function clearCart() {
    items = {};
    activeVoucher = null;
    const input = document.getElementById('voucher-input');
    if (input) input.value = '';
    _render();
  }

  // ── UI Rendering ────────────────────────────────────────────────────────────
  function _render() {
    const payload = getOrderPayload();
    const totalItems = Object.values(items).reduce((a,b) => a+b, 0);

    // 1. Update Floating Cart Bar
    const bar = document.getElementById('cart-bar');
    const badge = document.getElementById('cart-count-badge');
    const barTotal = document.getElementById('cart-bar-total');

    if (bar && badge && barTotal) {
      if (totalItems > 0) {
        bar.classList.remove('hidden');
        bar.classList.add('animate-slide-up');
        // Small pulse animation on badge change
        if (badge.innerText !== totalItems.toString()) {
          badge.classList.remove('animate-pulse-cart');
          void badge.offsetWidth; // trigger reflow
          badge.classList.add('animate-pulse-cart');
        }
        badge.innerText = totalItems;
        barTotal.innerText = `₱${payload.total}`;
      } else {
        bar.classList.add('hidden');
      }
    }

    // 2. Update Checkout Sheet Items
    const container = document.getElementById('checkout-items-container');
    const grandTotal = document.getElementById('checkout-grand-total');

    if (container) {
      if (payload.items.length === 0) {
        container.innerHTML = `<p class="text-smoke text-center py-6">Your cart is empty.</p>`;
      } else {
        container.innerHTML = payload.items.map(item => `
          <div class="flex items-center mb-3 p-2 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden relative">
            <div class="w-16 h-16 rounded-md overflow-hidden relative flex-shrink-0 mr-3">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover relative z-0">
            </div>
            <div class="flex-1 z-10">
              <div class="font-bold text-sm text-earth">${item.name}</div>
              <div class="text-xs text-smoke">₱${item.price} each</div>
            </div>
            <div class="flex items-center gap-3 z-10 ml-2">
              <div class="font-bold text-earth">₱${item.lineTotal}</div>
              <div class="qty-stepper scale-90 origin-right">
                <button type="button" onclick="Cart.changeQty('${item.id}', -1)">−</button>
                <span>${item.qty}</span>
                <button type="button" onclick="Cart.changeQty('${item.id}', 1)">+</button>
              </div>
            </div>
          </div>
        `).join('');

        if (payload.discount > 0) {
          container.innerHTML += `
            <div class="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg text-leaf">
              <div class="font-bold text-sm">Voucher Applied (${payload.voucherUsed})</div>
              <div class="font-bold">−₱${payload.discount}</div>
            </div>
          `;
        }
      }
    }

    if (grandTotal) {
      grandTotal.innerText = `₱${payload.total}`;
    }
  }

  // Public API
  return { 
    init, 
    changeQty, 
    getQty, 
    getOrderPayload, 
    applyDiscount, 
    clearCart,
    getCount,
    renderCheckoutItemsList: _render,
    getSnapshot: getOrderPayload
  };
})();

window.Cart = Cart;
