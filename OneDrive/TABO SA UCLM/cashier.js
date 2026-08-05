/**
 * cashier.js — Cashier POS Mode
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ CHANGE CASHIER PIN BEFORE GO-LIVE:
 *    Edit the CASHIER_PIN constant below to a 4-digit code your team will remember.
 *
 * Features:
 *   - PIN gate (prevents customers accessing POS)
 *   - Quick 3-digit item entry (type "101" → adds Prod-101 to bill)
 *   - POS Bill with qty buttons, line totals, grand total
 *   - Cash calculator (Tendered Amount → Change Due)
 *   - Incoming Order Feed (shows orders submitted from buyer phones)
 *
 * Security:
 *   - All user-supplied strings are passed through escapeHTML() before being
 *     injected into innerHTML to prevent XSS.
 *   - CASHIER_PIN is a client-side UX guard only — it is visible to anyone
 *     who opens DevTools. Remind staff to tap 🔒 Lock when stepping away.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ⚠️ CHANGE THIS BEFORE FRIDAY — Use a 4-digit code your team can remember
const CASHIER_PIN = "1234";

const CashierPOS = (() => {

  // ── XSS Guard — escapeHTML ──────────────────────────────────────────────────
  // Defined locally inside the IIFE so it's available everywhere in this module.
  /**
   * Escape HTML special characters to prevent XSS.
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

  // ── PIN Gate State ──────────────────────────────────────────────────────────
  let pinBuffer    = '';
  let pinUnlocked  = false;

  // ── POS Bill State ──────────────────────────────────────────────────────────
  /** @type {Map<string, number>} productId → qty */
  const bill = new Map();

  // ── Order Feed State ────────────────────────────────────────────────────────
  /** @type {Array} Received orders (from sessionStorage / future webhook polling) */
  let orderFeed = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // PIN GATE
  // ═══════════════════════════════════════════════════════════════════════════

  function initCashierGate() {
    if (pinUnlocked) {
      _renderPOS();
      return;
    }
    _renderPINGate();
  }

  function _renderPINGate() {
    const container = document.getElementById('view-cashier');
    if (!container) return;

    container.innerHTML = `
      <div id="pin-gate" class="panubok-header">
        <div class="text-center">
          <div class="text-5xl mb-3">🔐</div>
          <h2 class="font-display text-white text-2xl mb-1">Cashier Mode</h2>
          <p class="text-white opacity-70 text-sm mb-6">Enter PIN to access POS</p>

          <!-- PIN dots indicator -->
          <div class="pin-dots justify-center mb-6" id="pin-dots">
            <div class="pin-dot" id="dot-0"></div>
            <div class="pin-dot" id="dot-1"></div>
            <div class="pin-dot" id="dot-2"></div>
            <div class="pin-dot" id="dot-3"></div>
          </div>

          <!-- Error message -->
          <div id="pin-error" class="hidden text-red-300 text-sm mb-3">❌ Incorrect PIN. Try again.</div>

          <!-- Keypad -->
          <div class="pin-keypad mx-auto">
            ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
              <button
                class="pin-key"
                ${k === '' ? 'disabled style="opacity:0;pointer-events:none"' : ''}
                onclick="CashierPOS.pinPress('${k}')"
                aria-label="${k === '⌫' ? 'Delete' : k}"
              >${k}</button>
            `).join('')}
          </div>

          <button
            class="mt-6 text-white opacity-50 text-sm underline"
            onclick="Router.navigate('#home')"
          >← Back to menu</button>
        </div>
      </div>
    `;

    pinBuffer = '';
  }

  function pinPress(key) {
    const errorEl = document.getElementById('pin-error');
    if (errorEl) errorEl.classList.add('hidden');

    if (key === '⌫') {
      pinBuffer = pinBuffer.slice(0, -1);
    } else if (pinBuffer.length < 4) {
      pinBuffer += key;
    }

    // Update dot indicators
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`dot-${i}`);
      if (dot) dot.classList.toggle('filled', i < pinBuffer.length);
    }

    // Auto-check when 4 digits entered
    if (pinBuffer.length === 4) {
      setTimeout(_checkPIN, 200);
    }
  }

  function _checkPIN() {
    if (pinBuffer === CASHIER_PIN) {
      pinUnlocked = true;
      window.showToast('🔓 Cashier Mode Unlocked!', 'success');
      _renderPOS();
    } else {
      const errorEl = document.getElementById('pin-error');
      if (errorEl) errorEl.classList.remove('hidden');

      // Shake dots
      const dotsEl = document.getElementById('pin-dots');
      if (dotsEl) {
        dotsEl.style.animation = 'none';
        void dotsEl.offsetWidth;
        dotsEl.style.animation = 'slideDown 0.15s ease 3';
      }

      // Reset dots
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) dot.classList.remove('filled');
      }
      pinBuffer = '';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // POS INTERFACE
  // ═══════════════════════════════════════════════════════════════════════════

  function _renderPOS() {
    const container = document.getElementById('view-cashier');
    if (!container) return;

    container.innerHTML = `
      <div id="cashier-pos" class="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">

        <!-- LEFT PANEL: Bill & Entry -->
        <div class="flex flex-col flex-1 overflow-hidden" style="min-height:100vh">

          <!-- Header -->
          <div class="pos-header">
            <div>
              <h1 class="font-display text-xl text-white">🍽️ Tabo sa UCLM POS</h1>
              <p class="text-xs opacity-60" id="pos-timestamp"></p>
            </div>
            <button
              class="btn btn-sm"
              style="background:rgba(255,255,255,0.15); color:white"
              onclick="CashierPOS.lockPOS()"
            >🔒 Lock</button>
          </div>

          <!-- Quick Entry Bar -->
          <div class="p-4 border-b border-white/10 bg-gray-800">
            <label class="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Quick Item Entry (type 3-digit ID)</label>
            <div class="flex gap-2">
              <input
                id="quick-entry-input"
                type="number"
                min="101" max="110"
                placeholder="e.g. 101 = Tinuom na Manok"
                class="form-input flex-1 bg-gray-700 text-white border-gray-600 placeholder-gray-500"
                style="background:#374151; color:white; border-color:#4B5563"
                onkeydown="if(event.key==='Enter') CashierPOS.quickEntry()"
                autocomplete="off"
              >
              <button
                class="btn btn-gold"
                onclick="CashierPOS.quickEntry()"
              >+ Add</button>
            </div>

            <!-- Product quick-select chips -->
            <div class="flex flex-wrap gap-1 mt-2">
              ${(window.PRODUCTS || []).map(p => `
                <button
                  class="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-600 transition-colors"
                  onclick="CashierPOS.addToBill('${p.id}')"
                  title="${p.name} — ₱${p.price}"
                >${p.id.slice(-3)} ${p.name.split(' ')[0]}</button>
              `).join('')}
            </div>
          </div>

          <!-- Bill -->
          <div class="flex-1 overflow-y-auto p-4" id="pos-bill-list">
            <p class="text-gray-500 text-center py-8 text-sm" id="pos-bill-empty">
              No items yet. Use the entry bar above to add items.
            </p>
          </div>

          <!-- Bill Total -->
          <div class="p-4 border-t border-white/10 bg-gray-800">
            <div class="flex justify-between text-lg font-bold mb-4">
              <span>TOTAL</span>
              <span id="pos-bill-total" class="text-yellow-400">₱0</span>
            </div>
            <button class="btn btn-sm btn-outline text-gray-400 border-gray-600" onclick="CashierPOS.clearBill()">
              🗑️ Clear Bill
            </button>
          </div>
        </div>

        <!-- RIGHT PANEL: Cash Calculator + Order Feed -->
        <div class="lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">

          <!-- Cash Calculator -->
          <div class="p-4 border-b border-white/10">
            <h3 class="font-display text-lg text-yellow-400 mb-3">💵 Cash Calculator</h3>

            <div class="mb-3">
              <label class="form-label text-gray-400 text-xs">Total Amount (₱)</label>
              <input
                id="calc-total"
                type="number"
                class="form-input"
                style="background:#374151; color:white; border-color:#4B5563"
                placeholder="0"
                oninput="CashierPOS.calcChange()"
              >
            </div>

            <div class="mb-3">
              <label class="form-label text-gray-400 text-xs">Amount Tendered (₱)</label>
              <input
                id="calc-tendered"
                type="number"
                class="form-input"
                style="background:#374151; color:white; border-color:#4B5563"
                placeholder="0"
                oninput="CashierPOS.calcChange()"
              >
            </div>

            <div
              id="calc-change-display"
              class="rounded-lg p-3 text-center font-bold text-2xl"
              style="background: rgba(255,255,255,0.05)"
            >
              <div class="text-xs text-gray-400 mb-1 font-normal uppercase tracking-wide">Change Due</div>
              <div id="calc-change-value" class="text-gray-400">—</div>
            </div>
          </div>

          <!-- Incoming Order Feed -->
          <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-display text-lg text-green-400">📲 Order Feed</h3>
              <button
                class="text-xs text-gray-500 hover:text-gray-300"
                onclick="CashierPOS.refreshFeed()"
              >↻ Refresh</button>
            </div>
            <div id="order-feed-container">
              <p class="text-gray-500 text-sm text-center py-4">
                No incoming orders yet.<br>
                <span class="text-xs">Orders from buyers will appear here.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Set live timestamp
    _updateTimestamp();
    setInterval(_updateTimestamp, 60000);

    // Restore bill if any
    _renderBill();

    // Load order feed
    refreshFeed();
  }

  function _updateTimestamp() {
    const el = document.getElementById('pos-timestamp');
    if (el) {
      el.textContent = new Date().toLocaleString('en-PH', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // QUICK ENTRY & BILL MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  function quickEntry() {
    const input = document.getElementById('quick-entry-input');
    if (!input || !input.value.toString().trim()) return;

    const val     = input.value.toString().trim();
    // Pad to 3 digits (e.g. "1" → "001") then build the product ID
    const digits   = val.padStart(3, '0');
    const productId = `prod-${digits}`;

    // 🟡 Validate that this ID actually matches a product before proceeding.
    // Silently padding to prod-001 for a short entry that doesn't exist would
    // cause a confusing "not found" error — this makes the failure explicit.
    const matchedProduct = (window.PRODUCTS || []).find(p => p.id === productId);
    if (!matchedProduct) {
      window.showToast(`❌ No product found for ID: ${escapeHTML(productId)}`, 'error');
      input.value = '';
      input.focus();
      return;
    }

    addToBill(productId);
    input.value = '';
    input.focus();
  }

  function addToBill(productId) {
    const product = (window.PRODUCTS || []).find(p => p.id === productId);

    if (!product) {
      window.showToast(`❌ Product ID not found: ${productId}`, 'error');
      return;
    }

    const current = bill.get(productId) || 0;
    bill.set(productId, current + 1);
    window.showToast(`✅ +1 ${product.name}`, 'success');
    _renderBill();

    // Auto-fill cash calculator total
    const calcTotal = document.getElementById('calc-total');
    if (calcTotal) {
      calcTotal.value = _getBillTotal();
      calcChange();
    }
  }

  function setBillQty(productId, qty) {
    if (qty <= 0) {
      bill.delete(productId);
    } else {
      bill.set(productId, qty);
    }
    _renderBill();
    // Update calculator
    const calcTotal = document.getElementById('calc-total');
    if (calcTotal) {
      calcTotal.value = _getBillTotal();
      calcChange();
    }
  }

  function clearBill() {
    bill.clear();
    _renderBill();
    const calcTotal = document.getElementById('calc-total');
    if (calcTotal) calcTotal.value = '';
    calcChange();
  }

  function _getBillTotal() {
    let total = 0;
    bill.forEach((qty, id) => {
      const p = (window.PRODUCTS || []).find(pr => pr.id === id);
      if (p) total += p.price * qty;
    });
    return total;
  }

  function _renderBill() {
    const container = document.getElementById('pos-bill-list');
    const emptyEl   = document.getElementById('pos-bill-empty');
    const totalEl   = document.getElementById('pos-bill-total');

    if (!container) return;

    if (bill.size === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      container.innerHTML = `<p class="text-gray-500 text-center py-8 text-sm">No items yet. Use the entry bar above to add items.</p>`;
      if (totalEl) totalEl.textContent = '₱0';
      return;
    }

    let html = '';
    let grandTotal = 0;

    bill.forEach((qty, id) => {
      const p = (window.PRODUCTS || []).find(pr => pr.id === id);
      if (!p) return;
      const lineTotal = p.price * qty;
      grandTotal += lineTotal;
      html += `
        <div class="pos-bill-item">
          <div class="flex-1">
            <div class="font-semibold text-sm text-white">${p.name}</div>
            <div class="text-xs text-gray-400">₱${p.price} each · ID: ${p.id}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="qty-stepper" style="background:transparent; border-color:#4B5563">
              <button
                onclick="CashierPOS.setBillQty('${p.id}', ${qty - 1})"
                style="background:#374151; color:#D4A017"
              >−</button>
              <span style="background:#1F2937; color:white">${qty}</span>
              <button
                onclick="CashierPOS.setBillQty('${p.id}', ${qty + 1})"
                style="background:#374151; color:#D4A017"
              >+</button>
            </div>
            <span class="text-yellow-400 font-bold text-sm w-14 text-right">₱${lineTotal}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (totalEl) totalEl.textContent = `₱${grandTotal}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CASH CALCULATOR
  // ═══════════════════════════════════════════════════════════════════════════

  function calcChange() {
    const totalInput    = document.getElementById('calc-total');
    const tenderedInput = document.getElementById('calc-tendered');
    const display       = document.getElementById('calc-change-display');
    const valueEl       = document.getElementById('calc-change-value');

    if (!totalInput || !tenderedInput || !valueEl) return;

    const total    = parseFloat(totalInput.value)    || 0;
    const tendered = parseFloat(tenderedInput.value) || 0;

    if (total === 0) {
      valueEl.textContent = '—';
      valueEl.className   = 'text-gray-400';
      return;
    }

    const change = tendered - total;

    if (tendered === 0) {
      valueEl.textContent = '—';
      valueEl.className   = 'text-gray-400';
    } else if (change < 0) {
      valueEl.textContent = `−₱${Math.abs(change).toFixed(2)}`;
      valueEl.className   = 'text-red-400';
      if (display) display.style.background = 'rgba(239,68,68,0.12)';
    } else {
      valueEl.textContent = `₱${change.toFixed(2)}`;
      valueEl.className   = 'text-green-400 text-3xl';
      if (display) display.style.background = 'rgba(74,124,89,0.15)';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INCOMING ORDER FEED
  // ═══════════════════════════════════════════════════════════════════════════

  function refreshFeed() {
    // 🟢 Fixed: reads from the localStorage ARRAY (tabo_orders) instead of the
    // old single-key sessionStorage (tabo_last_order) that was overwritten on each order.
    try {
      const raw = localStorage.getItem('tabo_orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Show newest first; avoid duplicates by rebuilding from storage
          orderFeed = [...parsed].reverse();
        }
      }
    } catch (e) {
      console.warn('[CashierPOS] Could not read orders from localStorage:', e);
    }

    _renderOrderFeed();
  }

  function markFulfilled(timestamp) {
    const card = document.querySelector(`[data-order-ts="${timestamp}"]`);
    if (card) {
      card.classList.add('fulfilled');
      const btn = card.querySelector('.fulfill-btn');
      if (btn) { btn.textContent = '✅ Fulfilled'; btn.disabled = true; }
    }
  }

  function _renderOrderFeed() {
    const container = document.getElementById('order-feed-container');
    if (!container) return;

    if (orderFeed.length === 0) {
      container.innerHTML = `
        <p class="text-gray-500 text-sm text-center py-4">
          No incoming orders yet.<br>
          <span class="text-xs">Orders from buyers will appear here.</span>
        </p>
      `;
      return;
    }

    // ⚠️ XSS: all buyer-supplied strings are escaped before innerHTML injection.
    container.innerHTML = orderFeed.map(order => {
      const time  = new Date(order.timestamp).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
      const safeCustomerName = escapeHTML(order.customerName);
      const safeGcashName    = escapeHTML(order.gcashName);
      const safeDestination  = escapeHTML(order.destination);
      const safeTimestamp    = escapeHTML(order.timestamp);

      const fulfillLabel = order.fulfillment === 'delivery'
        ? `🚚 ${safeDestination}`
        : '🏪 Pickup';

      // Item names come from PRODUCTS data (not user input), but we still escape
      // them for defense-in-depth.
      const itemsSummary = (order.items || []).map(i => `${escapeHTML(i.name)} ×${Number(i.qty)}`).join(', ');

      return `
        <div class="order-card" data-order-ts="${safeTimestamp}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-bold text-sm">${safeCustomerName}</div>
              <div class="text-xs text-gray-400">GCash: ${safeGcashName} · ${escapeHTML(time)}</div>
            </div>
            <div class="text-yellow-400 font-bold">₱${Number(order.total)}</div>
          </div>
          <div class="text-xs text-gray-300 mb-2">${itemsSummary}</div>
          <div class="text-xs text-gray-400 mb-3">${fulfillLabel}</div>
          <button
            class="fulfill-btn btn btn-sm btn-primary"
            onclick="CashierPOS.markFulfilled('${safeTimestamp}')"
          >Mark Fulfilled</button>
        </div>
      `;
    }).join('');
  }

  // ── Lock POS ────────────────────────────────────────────────────────────────

  function lockPOS() {
    pinUnlocked = false;
    _renderPINGate();
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  return {
    initCashierGate,
    pinPress,
    quickEntry,
    addToBill,
    setBillQty,
    clearBill,
    calcChange,
    refreshFeed,
    markFulfilled,
    lockPOS,
  };
})();

window.CashierPOS     = CashierPOS;
window.initCashierGate = CashierPOS.initCashierGate; // Alias for router.js
