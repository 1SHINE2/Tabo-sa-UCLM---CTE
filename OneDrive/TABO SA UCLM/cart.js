/**
 * cart.js — Cart State & UI Manager (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages adding/removing items, discounts, and rendering the cart UI.
 * Upgraded voucher logic for V2: checks against localStorage lock.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Cart = (() => {

  let items = {}; // { "prod-101": 2, "prod-102": 1 }
  let currentDiscount = 0;
  let activeVoucher = null;
  const DISCOUNT_AMOUNT = 10; // ₱10 off

  function init() {
    _render();
  }

  function changeQty(productId, delta) {
    if (!items[productId]) items[productId] = 0;
    items[productId] += delta;
    if (items[productId] <= 0) delete items[productId];
    
    // If they remove the item that the voucher applies to, remove the voucher
    if (activeVoucher && activeVoucher.startsWith('SPIRIT-')) {
      const requiredId = `prod-${activeVoucher.split('-')[1]}`;
      if (!items[requiredId]) {
        currentDiscount = 0;
        activeVoucher = null;
        window.showToast('Voucher removed (Spirit dish not in cart)', 'warning');
      }
    }

    _render();
  }

  function getQty(productId) {
    return items[productId] || 0;
  }

  function getCount() {
    return Object.values(items).reduce((a, b) => a + b, 0);
  }

  function applyDiscount() {
    const input = document.getElementById('voucher-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    // Reset current discount first
    currentDiscount = 0;
    activeVoucher = null;

    if (!code) {
      _render();
      return;
    }

    // Check if it's a SPIRIT-xxx code
    if (code.startsWith('SPIRIT-')) {
      const requiredId = `prod-${code.split('-')[1]}`;
      const lockedDish = localStorage.getItem('quiz_completed_dish');

      if (lockedDish !== requiredId) {
        window.showToast('Invalid voucher for this device.', 'error');
        input.value = '';
        _render();
        return;
      }

      if (!items[requiredId]) {
        window.showToast('Your Spirit Dish must be in the cart to use this!', 'error');
        _render();
        return;
      }

      // Valid!
      currentDiscount = DISCOUNT_AMOUNT;
      activeVoucher = code;
      window.showToast('Blessing applied! ₱10 off.', 'success');
    } else {
      window.showToast('Invalid voucher code.', 'error');
    }

    _render();
  }

  function getOrderPayload() {
    const lines = [];
    let subtotal = 0;

    for (const [id, qty] of Object.entries(items)) {
      const p = window.PRODUCTS.find(x => x.id === id);
      if (p) {
        const lineTotal = p.price * qty;
        subtotal += lineTotal;
        lines.push({ id, name: p.name, qty, price: p.price, lineTotal });
      }
    }

    const total = Math.max(0, subtotal - currentDiscount);

    return {
      items: lines,
      subtotal,
      discount: currentDiscount,
      voucherUsed: activeVoucher || 'NONE',
      total
    };
  }

  function clearCart() {
    items = {};
    currentDiscount = 0;
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
          <div class="flex justify-between items-center mb-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div class="flex-1">
              <div class="font-bold text-sm text-earth">${item.name}</div>
              <div class="text-xs text-smoke">₱${item.price} each</div>
            </div>
            <div class="flex items-center gap-3">
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
