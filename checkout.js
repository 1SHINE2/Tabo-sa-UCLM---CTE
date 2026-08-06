/**
 * checkout.js — GCash Checkout, Order Submission & Digital Receipt
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPORTANT PLACEHOLDERS — Replace before go-live:
 *
 *   const GCASH_NUMBER            → Change "09123456789" to your actual GCash number
 *   const GOOGLE_SHEETS_WEBHOOK_URL → Replace "YOUR_WEBHOOK_URL_HERE" with your
 *                                     Google Apps Script Web App URL
 *
 * GCash Deep-Link note:
 *   The gcash:// link is bound directly to <a href="gcash://..."> elements
 *   (NOT inside async/fetch chains) to avoid mobile pop-up blockers.
 *
 * Offline Fallback:
 *   If the webhook fetch() fails due to bad signal, the order is NOT blocked.
 *   A Digital Receipt Screen is shown instead so the buyer can show it to
 *   the cashier at the booth.
 *
 * Security:
 *   All buyer-supplied strings rendered into HTML are passed through escapeHTML()
 *   to prevent Cross-Site Scripting (XSS) attacks.
 *
 * Clipboard note:
 *   navigator.clipboard requires a Secure Context (https:// or localhost).
 *   _fallbackCopy() via document.execCommand handles plain HTTP / local network.
 *   Deploy to HTTPS (Vercel, GitHub Pages) for full mobile compatibility.
 *
 * PIN Security note:
 *   CASHIER_PIN is client-side only — it's a UX guard, not cryptographic security.
 *   Any user who opens DevTools can read it. Remind staff to tap 🔒 Lock when
 *   stepping away from the POS screen.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── ⚠️ PLACEHOLDERS — CHANGE BEFORE GO-LIVE ──────────────────────────────────
const GCASH_NUMBER              = "09123456789";           // TODO: Replace with your real GCash number
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyEmFzccV7FfE7mozo-BK4p7MiGhSJ3itHZVstMIhIf65yNtVJMoP6_yG3wC5jpiHa/exec";
// ─────────────────────────────────────────────────────────────────────────────

// ── XSS Guard — escapeHTML ────────────────────────────────────────────────────
// All user-supplied strings (name, gcashName, building, etc.) MUST be passed
// through this function before being injected into innerHTML.
/**
 * Escape HTML special characters to prevent XSS attacks.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[match]));
}
// ─────────────────────────────────────────────────────────────────────────────

const Checkout = (() => {

  let currentOrderData = null;

  // ── Open / Close Checkout Sheet ─────────────────────────────────────────────

  function open() {
    if (Cart.getCount() === 0) {
      window.showToast('Your cart is empty!', 'warning');
      return;
    }

    const overlay = document.getElementById('checkout-overlay');
    if (overlay) overlay.classList.remove('hidden');

    // Initialize toggles synchronously since DOM is already loaded when this opens
    _initToggles();

    Cart.renderCheckoutItemsList();
    _renderGCashPanel();

    // ── Auto-apply Spirit Quest voucher from localStorage ──
    const savedVoucher = localStorage.getItem('active_voucher');
    const alreadyApplied = Cart.getSnapshot().voucherUsed !== 'NONE';
    if (savedVoucher && !alreadyApplied) {
      const input = document.getElementById('voucher-input');
      if (input) input.value = savedVoucher;
      // Slight delay so the DOM is ready
      setTimeout(() => Checkout.applyVoucher(), 50);
    }
  }

  function close() {
    const overlay = document.getElementById('checkout-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  // ── GCash Panel ─────────────────────────────────────────────────────────────

  function _renderGCashPanel() {
    const numberEl = document.getElementById('gcash-display-number');
    if (numberEl) numberEl.textContent = GCASH_NUMBER;

    // Wire the deep-link anchor (bound to element, NOT async — avoids pop-up blockers)
    _updateGCashLink();
  }

  function _updateGCashLink() {
    const total = Cart.getOrderPayload().total;
    const link  = document.getElementById('gcash-pay-link');
    if (link) {
      // gcash://pay?amount=XXX — direct anchor binding, safe from pop-up blockers
      link.href = `gcash://pay?amount=${total}`;
    }
    const payLabel = document.getElementById('gcash-pay-label');
    if (payLabel) payLabel.textContent = `Pay ₱${total} via GCash`;
  }

  // ── Voucher Code ─────────────────────────────────────────────────────────────

  function applyVoucher() {
    const input = document.getElementById('voucher-input');
    if (!input) return;

    const result = Cart.applyDiscount(input.value);

    if (result.success) {
      input.value = '';
      input.disabled = true;
      document.getElementById('apply-voucher-btn').disabled = true;

      // Show applied badge
      const appliedEl = document.getElementById('voucher-applied-badge');
      if (appliedEl) {
        appliedEl.innerHTML = `
          <div class="voucher-applied animate-slide-down">
            ✅ <span>${result.code}</span>
            <span class="ml-auto text-leaf font-bold">−₱${result.amount}</span>
          </div>
        `;
        appliedEl.classList.remove('hidden');
      }

      window.showToast(result.message, 'success');
      _updateGCashLink();
    } else {
      window.showToast(result.message, 'error');
      input.classList.add('border-red-400');
      setTimeout(() => input.classList.remove('border-red-400'), 1500);
    }
  }

  // ── Form Toggles ──────────────────────────────────────────────────────

  function _initToggles() {
    // Fulfillment
    const fPills = document.querySelectorAll('.radio-pill[data-fulfillment]');
    fPills.forEach(pill => {
      pill.addEventListener('click', () => {
        fPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        pill.querySelector('input').checked = true;

        const deliveryFields = document.getElementById('delivery-fields');
        if (deliveryFields) {
          const isDelivery = pill.dataset.fulfillment === 'delivery';
          deliveryFields.classList.toggle('hidden', !isDelivery);
        }
      });
    });

    // Payment Method
    const pPills = document.querySelectorAll('.radio-pill[data-payment]');
    pPills.forEach(pill => {
      pill.addEventListener('click', () => {
        pPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        pill.querySelector('input').checked = true;

        const isGcash = pill.dataset.payment === 'gcash';
        const gcashFields = document.getElementById('payment-gcash-fields');
        const cashFields = document.getElementById('payment-cash-fields');
        
        if (gcashFields) gcashFields.classList.toggle('hidden', !isGcash);
        if (cashFields) cashFields.classList.toggle('hidden', isGcash);
      });
    });

    // Set defaults
    const defaultFPill = document.querySelector('.radio-pill[data-fulfillment="pickup"]');
    if (defaultFPill) defaultFPill.click();
    
    const defaultPPill = document.querySelector('.radio-pill[data-payment="gcash"]');
    if (defaultPPill) defaultPPill.click();
  }

  // ── Copy GCash Number to Clipboard ─────────────────────────────────────────

  function copyGCashNumber() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(GCASH_NUMBER).then(() => {
        _showCopyFeedback();
      }).catch(() => {
        _fallbackCopy();
      });
    } else {
      _fallbackCopy();
    }
  }

  function _fallbackCopy() {
    const el = document.createElement('textarea');
    el.value = GCASH_NUMBER;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    _showCopyFeedback();
  }

  function _showCopyFeedback() {
    const btn = document.getElementById('copy-gcash-btn');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2500);
    }
  }

  // ── Form Validation ─────────────────────────────────────────────────────────

  function _validateForm() {
    const name        = document.getElementById('f-name')?.value?.trim();
    const fulfillment = document.querySelector('input[name="fulfillment"]:checked')?.value;
    const payment     = document.querySelector('input[name="payment_method"]:checked')?.value;
    const building    = document.getElementById('f-destination')?.value?.trim();
    const gcashName   = payment === 'gcash' ? document.getElementById('f-gcash-name')?.value?.trim() : 'CASH';
    const gcashRef    = payment === 'gcash' ? document.getElementById('f-gcash-ref')?.value?.trim() : 'N/A';

    if (!name)        { window.showToast('Please enter your name.', 'error');              return null; }
    if (payment === 'gcash') {
      if (!gcashName) { window.showToast('Please enter your GCash account name.', 'error'); return null; }
      if (!gcashRef || gcashRef.length !== 13 || isNaN(Number(gcashRef))) {
        window.showToast('Please enter a valid 13-digit GCash Reference Number.', 'error'); return null; 
      }
    }
    if (!fulfillment) { window.showToast('Please choose pickup or delivery.', 'error'); return null; }
    if (fulfillment === 'delivery' && !building) {
      window.showToast('Please enter your delivery building & room.', 'error');
      return null;
    }

    return { name, mobile: 'N/A', gcashName, gcashRef, payment, fulfillment, building: building || '' };
  }

  // ── Complete Order ──────────────────────────────────────────────────────────

  async function completeOrder() {
    const formData = _validateForm();
    if (!formData) return;

    const snapshot = Cart.getSnapshot();
    if (snapshot.count === 0) {
      window.showToast('Your cart is empty!', 'warning');
      return;
    }

    const itemsSummaryStr = snapshot.items.map(l => `${l.name} x${l.qty}`).join(', ');
    const transactionId = `ONL-${Date.now().toString().slice(-6)}`;
    const contactLoc = formData.mobile + (formData.building ? ` / ${formData.building}` : '');

    const payload = {
      // 1. Google Sheets Webhook Schema (16 fields)
      action:       "CREATE_TRANSACTION",
      timestamp:    new Date().toISOString(),
      transactionId: transactionId,
      orderType:    "Online",
      fulfillment:  formData.fulfillment === 'delivery' ? 'Campus Delivery' : 'Booth Pickup',
      paymentMethod: formData.payment === 'cash' ? 'Cash' : 'GCash',
      customerName: formData.name,
      contactInfo:  contactLoc,
      itemsSummary: itemsSummaryStr,
      subtotal:     snapshot.subtotal,
      voucherApplied: snapshot.discountCode || 'NONE',
      discountAmount: snapshot.discount,
      grandTotal:   snapshot.total,
      amountTendered: formData.payment === 'cash' ? 0 : "N/A", // Updated later by Cashier for Cash
      changeGiven:  0,
      gcashRef:     formData.gcashRef,
      status:       "Pending",
      
      // 2. Receipt Rendering Fields (Preserved for UI)
      mobile:       formData.mobile,
      gcashName:    formData.gcashName,
      payment:      formData.payment,
      destination:  formData.building,
      items: snapshot.items.map(l => ({
        id:        l.id,
        name:      l.name,
        price:     l.price,
        qty:       l.qty,
        lineTotal: l.lineTotal,
      })),
      discount:    snapshot.discount,
      voucherUsed: snapshot.discountCode || 'none',
      total:       snapshot.total,
    };

    currentOrderData = { ...payload, formData };

    // ── Persist order to localStorage (array) ──────────────────────────────
    // Uses an ARRAY so all orders accumulate and the cashier feed shows them all.
    // Was previously a single key (tabo_last_order) that overwrote each time.
    try {
      const existing = JSON.parse(localStorage.getItem('tabo_orders') || '[]');
      existing.push(payload);
      localStorage.setItem('tabo_orders', JSON.stringify(existing));
    } catch (e) {
      console.warn('[Checkout] Could not persist order to localStorage:', e);
    }

    // ── Close checkout sheet first ────────────────────────────────────────────
    close();

    // ── Attempt webhook submission ────────────────────────────────────────────
    // Note: Uses 'no-cors' so response body is opaque — we assume success if no network error.
    // The Google Apps Script must return JSON with MIME type application/json (not text/html).
    if (GOOGLE_SHEETS_WEBHOOK_URL !== "YOUR_WEBHOOK_URL_HERE" && GOOGLE_SHEETS_WEBHOOK_URL !== "") {
      try {
        const controller = new AbortController();
        const timeoutId  = setTimeout(() => controller.abort(), 8000); // 8s timeout

        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method:  'POST',
          mode:    'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
          signal:  controller.signal,
        });

        clearTimeout(timeoutId);

        // ✅ Webhook succeeded — show online confirmation
        _showOnlineConfirmation(payload);

      } catch (err) {
        console.warn('[Checkout] Webhook failed (offline/timeout):', err.message);
        // 💡 Offline fallback — show digital receipt instead of blocking order
        _showDigitalReceipt(payload);
      }

    } else {
      // Webhook URL not configured — go straight to receipt
      console.log('[Checkout] Webhook not configured. Payload:', payload);
      _showDigitalReceipt(payload);
    }

    // Clear cart after submission
    Cart.clearCart();
  }

  // ── Online Confirmation Screen ──────────────────────────────────────────────

  function _showSuccessReceipt(payload) {
    Router.showView('view-receipt');
    const screen = document.getElementById('receipt-screen');
    if (!screen) return;

    screen.innerHTML = `
      <div class="bg-earth p-6 text-center rounded-t-xl relative overflow-hidden" style="background-color: var(--color-earth);">
        <div class="absolute -top-4 -right-4 text-7xl opacity-10 font-display">🛒</div>
        <div class="text-5xl mb-3 relative z-10">🎉</div>
        <h2 class="font-display text-white text-3xl font-bold leading-tight relative z-10">Order Received!</h2>
        <p class="text-white/90 text-sm mt-1 relative z-10">Thank you, ${escapeHTML(payload.customerName)}!</p>
      </div>
      <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-2 shadow-sm text-left">
        <p class="font-bold text-red-700 text-sm mb-1">📸 Important: Screenshot Required!</p>
        <p class="text-red-600 text-xs leading-relaxed">Please take a screenshot of this digital receipt now! Once you navigate away from this screen, the receipt cannot be reopened.</p>
      </div>
      ${_buildReceiptBody(payload, false)}
      <button class="btn btn-primary btn-full mt-4 shadow-lg text-lg py-3" onclick="Router.navigate('#home')">
        🏠 Back to Menu
      </button>
    `;
  }

  // ── Digital Receipt Screen (Offline Fallback) ──────────────────────────────
  // 💡 OFFLINE FALLBACK — appears when Google Sheets webhook fails.
  //    Buyer shows their phone screen to the cashier for manual order entry.

  function _showDigitalReceipt(payload) {
    Router.showView('view-receipt');
    const screen = document.getElementById('receipt-screen');
    if (!screen) return;

    screen.innerHTML = `
      <div class="bg-earth p-6 text-center rounded-t-xl" style="background-color: var(--color-earth);">
        <div class="text-4xl mb-2">📱</div>
        <h2 class="font-display text-white text-2xl font-bold">Digital Receipt</h2>
        <p class="text-white/80 text-sm mt-1">Show this screen to the cashier at the booth</p>
      </div>
      
      <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-2 shadow-sm text-left">
        <p class="font-bold text-red-700 text-sm mb-1">📸 Important: Screenshot Required!</p>
        <p class="text-red-600 text-xs leading-relaxed">Please take a screenshot of this digital receipt now! Once you navigate away from this screen, the receipt cannot be reopened.</p>
      </div>

      <div class="bg-yellow-50 border-x border-t border-yellow-300 p-4 text-sm text-yellow-800 flex gap-3 items-start">
        <span class="text-lg">⚠️</span>
        <span class="leading-relaxed">Couldn't connect to our system right now. Please <strong>show this receipt</strong> to our cashier — your order is safe!</span>
      </div>

      ${_buildReceiptBody(payload, true)}

      <div class="text-center text-xs text-smoke mt-4 mb-2 font-medium">
        📍 Proceed to the Tabo sa UCLM booth and show this screen.
      </div>

      <button class="btn btn-outline btn-full mt-2" onclick="Router.navigate('#home')">
        🏠 Back to Menu
      </button>
    `;
  }

  function _buildReceiptBody(payload, isOffline) {
    // ⚠️ All payload fields derived from user input MUST use escapeHTML().
    const safeName        = escapeHTML(payload.customerName);
    const safeGcashName   = escapeHTML(payload.gcashName);
    const safeDestination = escapeHTML(payload.destination);
    const safeVoucher     = escapeHTML(payload.voucherUsed);

    const fulfillmentLabel = payload.fulfillment === 'delivery'
      ? `🚚 Campus Delivery — ${safeDestination}`
      : '🏪 Booth Pickup';

    const itemRows = payload.items.map(item => `
      <div class="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
        <span class="text-smoke pr-4">${escapeHTML(item.name)} <span class="text-xs text-gray-400 ml-1">× ${Number(item.qty)}</span></span>
        <span class="font-semibold text-earth">₱${Number(item.lineTotal)}</span>
      </div>
    `).join('');

    const discountRow = payload.discount > 0 ? `
      <div class="flex justify-between items-center py-2 text-leaf border-b border-gray-100">
        <span>🎟️ Voucher (${safeVoucher})</span>
        <span class="font-bold">−₱${Number(payload.discount)}</span>
      </div>
    ` : '';

    return `
      <div class="bg-white p-6 rounded-b-xl shadow-lg border border-gray-100">
        <div class="space-y-3 mb-5">
          <div class="flex justify-between items-center">
            <span class="text-smoke text-[10px] font-bold uppercase tracking-widest">Customer</span>
            <span class="font-semibold text-sm text-earth">${safeName}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-smoke text-[10px] font-bold uppercase tracking-widest">Payment</span>
            <span class="font-semibold text-sm text-earth">${payload.payment === 'cash' ? '💵 Cash' : '📱 GCash (' + safeGcashName + ')'}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-smoke text-[10px] font-bold uppercase tracking-widest">Fulfillment</span>
            <span class="font-semibold text-sm text-earth text-right max-w-[60%] leading-tight">${fulfillmentLabel}</span>
          </div>
          ${payload.payment === 'gcash' ? `
          <div class="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
            <span class="text-smoke text-[10px] font-bold uppercase tracking-widest">GCash Ref No.</span>
            <span class="font-mono font-bold text-sm text-earth tracking-widest">${escapeHTML(payload.gcashRef)}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="divider border-t-2 border-dashed border-gray-200 my-4"></div>
        
        <div class="mb-4 text-sm">
          ${itemRows}
          ${discountRow}
        </div>
        
        <div class="flex justify-between items-end pt-3 border-t-2 border-earth">
          <span class="text-sm font-bold text-smoke tracking-wider uppercase">Total</span>
          <span class="font-display font-bold text-3xl text-earth">₱${Number(payload.total)}</span>
        </div>
        
        <div class="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest">
          Order Time: ${new Date(escapeHTML(payload.timestamp)).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    `;
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  return { open, close, applyVoucher, copyGCashNumber, completeOrder, submitOrder: completeOrder };
})();

window.Checkout = Checkout;
window.GCASH_NUMBER = GCASH_NUMBER; // Expose for index.html inline references
