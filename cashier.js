/**
 * cashier.js — Cashier POS Mode
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ CHANGE CASHIER PIN BEFORE GO-LIVE:
 *    Edit the CASHIER_PIN constant below to a 6-digit code your team will remember.
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

// ⚠️ CHANGE THIS BEFORE FRIDAY — Use a 6-digit code your team can remember
const CASHIER_PIN = "129845";

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
            <div class="pin-dot" id="dot-4"></div>
            <div class="pin-dot" id="dot-5"></div>
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
    } else if (pinBuffer.length < 6) {
      pinBuffer += key;
    }

    // Update dot indicators
    for (let i = 0; i < 6; i++) {
      const dot = document.getElementById(`dot-${i}`);
      if (dot) dot.classList.toggle('filled', i < pinBuffer.length);
    }

    // Auto-check when 6 digits entered
    if (pinBuffer.length === 6) {
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
      for (let i = 0; i < 6; i++) {
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
      <div id="cashier-pos" class="min-h-screen panubok-bg text-white flex flex-col">

        <!-- Header & Tabs -->
        <div class="pos-header flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-black/40 border-b border-white/10">
          <div>
            <h1 class="font-display text-xl text-gold">🍽️ Tabo sa UCLM POS</h1>
            <p class="text-xs opacity-80" id="pos-timestamp"></p>
          </div>
          <button
            class="btn btn-sm mt-2 sm:mt-0"
            style="background:rgba(255,255,255,0.15); color:white"
            onclick="CashierPOS.lockPOS()"
          >🔒 Lock</button>
        </div>

        <div class="pos-tabs">
          <button class="pos-tab-btn active" onclick="CashierPOS.switchPosTab('walkin')" id="tab-btn-walkin">🍽️ Walk-in / Cash</button>
          <button class="pos-tab-btn" onclick="CashierPOS.switchPosTab('online')" id="tab-btn-online">📲 Online Orders Feed</button>
        </div>

        <!-- ── TAB A: WALK-IN / CASH ── -->
        <div class="pos-panel active flex flex-col lg:flex-row flex-1 overflow-hidden" id="tab-walkin">
          
          <!-- LEFT PANEL: Bill & Entry -->
          <div class="flex flex-col flex-1 overflow-hidden border-r border-white/10" style="min-height:50vh">
            <!-- Quick Entry Bar -->
            <div class="p-4 border-b border-white/10 bg-black/20">
              <label class="text-xs text-white/70 mb-2 block uppercase tracking-wide">Quick Item Entry (type 3-digit ID)</label>
              <div class="flex gap-2">
                <input
                  id="quick-entry-input"
                  type="number"
                  min="101" max="110"
                  placeholder="e.g. 101 = Tinuom na Manok"
                  class="form-input flex-1 text-white border-white/20 placeholder-white/40"
                  style="background:rgba(0,0,0,0.3);"
                  onkeydown="if(event.key==='Enter') CashierPOS.quickEntry()"
                  autocomplete="off"
                >
                <button class="btn btn-gold" onclick="CashierPOS.quickEntry()">+ Add</button>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                ${(window.PRODUCTS || []).map(p => `
                  <button
                    class="text-xs px-2 py-1 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors"
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
          </div>

          <!-- RIGHT PANEL: Calculator & Complete Sale -->
          <div class="lg:w-96 flex flex-col bg-gray-800">
            <!-- Bill Total -->
            <div class="p-6 border-b border-white/10 bg-black/40 text-center">
              <div class="text-white/70 text-sm uppercase tracking-wider mb-1">Total Due</div>
              <div id="pos-bill-total" class="text-yellow-400 text-5xl font-bold">₱0</div>
              <button class="text-xs text-gray-500 mt-3 hover:text-gray-300 underline" onclick="CashierPOS.clearBill()">Clear Bill</button>
            </div>

            <!-- Walk-in Payment Toggle -->
            <div class="p-4 border-b border-white/10 bg-black/20">
              <div class="text-xs text-white/70 uppercase tracking-widest mb-2">Walk-in Payment Method</div>
              <div class="flex gap-2">
                <button id="walkin-pay-cash" class="flex-1 py-2 rounded-lg text-sm font-bold border-2 border-gold bg-gold/10 text-gold" onclick="CashierPOS.setWalkinPayment('cash')">💵 Cash</button>
                <button id="walkin-pay-gcash" class="flex-1 py-2 rounded-lg text-sm font-bold border-2 border-white/20 text-white/60" onclick="CashierPOS.setWalkinPayment('gcash')">📱 GCash</button>
              </div>
              <!-- GCash Ref field for walk-in GCash -->
              <div id="walkin-gcash-ref-row" class="hidden mt-3">
                <label class="text-xs text-white/70 block mb-1 uppercase tracking-wide">GCash Reference No.</label>
                <input id="walkin-gcash-ref" type="text" maxlength="13" class="form-input font-mono tracking-widest text-white border-white/20 w-full" style="background:rgba(0,0,0,0.3);" placeholder="13 digits" />
              </div>
            </div>

            <!-- Cash Calculator (hidden for GCash walk-in) -->
            <div class="p-6 border-b border-white/10 flex-1 bg-black/20" id="walkin-cash-calc">
              <h3 class="font-display text-lg text-white mb-4">💵 Cash Calculator</h3>
              <input id="calc-total" type="hidden">
              <div class="mb-4">
                <label class="form-label text-white/70 text-xs">Amount Tendered (₱)</label>
                <input
                  id="calc-tendered"
                  type="number"
                  class="form-input text-xl py-3 text-white border-white/20"
                  style="background:rgba(0,0,0,0.3);"
                  placeholder="0"
                  oninput="CashierPOS.calcChange()"
                >
              </div>
              <div
                id="calc-change-display"
                class="rounded-lg p-4 text-center font-bold text-3xl"
                style="background: rgba(255,255,255,0.05)"
              >
                <div class="text-xs text-gray-400 mb-1 font-normal uppercase tracking-wide">Change Due</div>
                <div id="calc-change-value" class="text-gray-400">—</div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="p-6">
              <button class="btn-complete-sale" id="btn-complete-sale" onclick="CashierPOS.completeCashSale()">
                ✅ COMPLETE CASH SALE
              </button>
            </div>
          </div>
        </div>

        <!-- ── TAB B: ONLINE ORDERS FEED ── -->
        <div class="pos-panel flex-1 overflow-y-auto bg-black/20 p-6" id="tab-online">
          <div class="flex items-center justify-between mb-6 max-w-4xl mx-auto">
            <div>
              <h3 class="font-display text-2xl text-gold">📲 Online Orders Queue</h3>
              <p class="text-sm text-white/70 mt-1">Orders paid via GCash or Booth Pickup</p>
            </div>
            <button class="btn btn-outline border-white/30 text-white/90 hover:bg-white/10" onclick="CashierPOS.refreshFeed()">
              ↻ Refresh Queue
            </button>
          </div>
          <div id="order-feed-container" class="max-w-4xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">
            <p class="text-gray-500 text-sm text-center py-8 col-span-full">
              No incoming orders yet.
            </p>
          </div>
        </div>

      </div>
    `;

    _updateTimestamp();
    setInterval(_updateTimestamp, 60000);
    _renderBill();
    refreshFeed();
  }

  function switchPosTab(tabId) {
    document.querySelectorAll('.pos-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.pos-panel').forEach(panel => panel.classList.remove('active'));
    
    document.getElementById(`tab-btn-${tabId}`).classList.add('active');
    document.getElementById(`tab-${tabId}`).classList.add('active');
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

    const rawVal = input.value.toString().trim();

    // Strip any leading "prod-" prefix in case user pastes a full ID,
    // then zero-pad to 3 digits so "1" → "001", "101" → "101"
    const numericPart = rawVal.replace(/^prod-?/i, '').padStart(3, '0');
    const targetId    = `prod-${numericPart}`;

    // Flexible lookup: match exact constructed ID, exact raw input, or ID ending with the numeric part
    const matchedProduct = (window.PRODUCTS || []).find(
      p => p.id === targetId || p.id === rawVal || p.id.endsWith(numericPart)
    );

    if (!matchedProduct) {
      window.showToast(`❌ No product found for: ${escapeHTML(rawVal)}`, 'error');
      input.value = '';
      input.focus();
      return;
    }

    addToBill(matchedProduct.id);
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

  // ── Walk-in Payment Toggle ─────────────────────────────────────────────────

  let walkinPaymentMode = 'cash'; // 'cash' | 'gcash'

  function setWalkinPayment(mode) {
    walkinPaymentMode = mode;
    const cashBtn      = document.getElementById('walkin-pay-cash');
    const gcashBtn     = document.getElementById('walkin-pay-gcash');
    const cashCalc     = document.getElementById('walkin-cash-calc');
    const gcashRefRow  = document.getElementById('walkin-gcash-ref-row');

    if (mode === 'cash') {
      if (cashBtn)  { cashBtn.classList.add('border-gold','bg-gold/10','text-gold');     cashBtn.classList.remove('border-white/20','text-white/60'); }
      if (gcashBtn) { gcashBtn.classList.remove('border-gold','bg-gold/10','text-gold'); gcashBtn.classList.add('border-white/20','text-white/60'); }
      if (cashCalc)    cashCalc.classList.remove('hidden');
      if (gcashRefRow) gcashRefRow.classList.add('hidden');
    } else {
      if (gcashBtn) { gcashBtn.classList.add('border-gold','bg-gold/10','text-gold');    gcashBtn.classList.remove('border-white/20','text-white/60'); }
      if (cashBtn)  { cashBtn.classList.remove('border-gold','bg-gold/10','text-gold');  cashBtn.classList.add('border-white/20','text-white/60'); }
      if (cashCalc)    cashCalc.classList.add('hidden');
      if (gcashRefRow) gcashRefRow.classList.remove('hidden');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CASH SALE LOGIC (Walk-in)
  // ═══════════════════════════════════════════════════════════════════════════

  async function completeCashSale() {
    if (bill.size === 0) {
      window.showToast("Bill is empty!", "error");
      return;
    }

    // Walk-in GCash validation
    let walkinGcashRef = 'N/A';
    if (walkinPaymentMode === 'gcash') {
      const refInput = document.getElementById('walkin-gcash-ref');
      walkinGcashRef = refInput?.value?.trim() || '';
      if (!walkinGcashRef || walkinGcashRef.length !== 13 || isNaN(Number(walkinGcashRef))) {
        window.showToast('Please enter a valid 13-digit GCash Reference Number.', 'error');
        return;
      }
    }

    const btn = document.getElementById('btn-complete-sale');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "⏳ Processing...";
    }

    // Build items summary
    const items = [];
    let subtotal = 0;
    bill.forEach((qty, id) => {
      const p = (window.PRODUCTS || []).find(pr => pr.id === id);
      if (p) {
        items.push(`${p.name} x${qty}`);
        subtotal += p.price * qty;
      }
    });
    const itemsSummary = items.join(', ');

    // Read tendered amount for cash
    const tenderedInput = document.getElementById('calc-tendered');
    const amountTendered = walkinPaymentMode === 'cash' ? (parseFloat(tenderedInput?.value) || 0) : 'N/A';
    const changeGiven    = walkinPaymentMode === 'cash' ? Math.max(0, (parseFloat(tenderedInput?.value) || 0) - subtotal) : 0;

    // Generate transaction ID
    const txnId  = `WLK-${Date.now().toString().slice(-6)}`;
    const timeStr = new Date().toISOString();

    const WEBHOOK = "https://script.google.com/macros/s/AKfycbwR2c9jCTCmU-qMVrSlnKi4DzDgIumQLqi_En1doE5rYG1QaUWgCyJZSq0djnPWGjKg/exec";

    const payload = {
      action:          "CREATE_TRANSACTION",
      timestamp:       timeStr,
      transactionId:   txnId,
      orderType:       "Walk-in",
      fulfillment:     "Over-the-Counter",
      paymentMethod:   walkinPaymentMode === 'cash' ? "Cash" : "GCash",
      customerName:    "Walk-in Customer",
      contactInfo:     "N/A",
      itemsSummary:    itemsSummary,
      subtotal:        subtotal,
      voucherApplied:  "NONE",
      discountAmount:  0,
      grandTotal:      subtotal,
      amountTendered:  amountTendered,
      changeGiven:     changeGiven,
      gcashRef:        walkinGcashRef,
      status:          "Completed"
    };

    let success = false;
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      success = true;
    } catch (err) {
      console.error("Walk-in POST failed:", err);
    }

    // Offline fallback
    if (!success) {
      let pending = [];
      try { pending = JSON.parse(localStorage.getItem('pending_walkin_sales')) || []; } catch(e){}
      pending.push(payload);
      localStorage.setItem('pending_walkin_sales', JSON.stringify(pending));
    }

    // Get change display before clearing
    const valueEl  = document.getElementById('calc-change-value');
    const changeStr = walkinPaymentMode === 'cash'
      ? (valueEl && valueEl.textContent !== '—' ? valueEl.textContent : '₱0.00')
      : 'GCash – No change needed';

    // Clear UI
    clearBill();
    if (tenderedInput) tenderedInput.value = '';
    const gcashRefInput = document.getElementById('walkin-gcash-ref');
    if (gcashRefInput) gcashRefInput.value = '';
    calcChange();

    if (btn) {
      btn.disabled = false;
      btn.textContent = "✅ COMPLETE SALE";
    }

    window.showToast(`Sale complete! ${walkinPaymentMode === 'cash' ? 'Change: ' + changeStr : 'GCash payment recorded.'}`, 'success');
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

  function markDoneAndDispatch(orderId) {
    const card = document.getElementById(`feed-card-${CSS.escape(orderId)}`);
    if (card) {
      card.classList.add('fulfilled');
      const btn = card.querySelector('.fulfill-btn');
      if (btn) { btn.textContent = '✅ Done'; btn.disabled = true; }
    }

    // Read cashier-entered tendered amount (for Cash online orders)
    const tenderedEl = document.getElementById(`cash-collect-${CSS.escape(orderId)}`);
    const amountTendered = tenderedEl ? (parseFloat(tenderedEl.value) || 0) : 'N/A';

    // Update in localStorage and compute change
    let changeGiven = 0;
    try {
      const raw = localStorage.getItem('tabo_orders');
      if (raw) {
        let parsed = JSON.parse(raw);
        const idx = parsed.findIndex(o => o.transactionId === orderId || String(o.timestamp) === String(orderId));
        if (idx !== -1) {
          parsed[idx].status = "Completed";
          if (amountTendered !== 'N/A') {
            changeGiven = Math.max(0, amountTendered - (parsed[idx].grandTotal || 0));
            parsed[idx].amountTendered = amountTendered;
            parsed[idx].changeGiven    = changeGiven;
          }
          localStorage.setItem('tabo_orders', JSON.stringify(parsed));
          if (changeGiven > 0) window.showToast(`Change due: ₱${changeGiven.toFixed(2)}`, 'success');
        }
      }
    } catch (e) {
      console.warn("Failed to update status in localStorage:", e);
    }

    // Send UPDATE_TRANSACTION to Google Sheets
    const WEBHOOK = "https://script.google.com/macros/s/AKfycbwR2c9jCTCmU-qMVrSlnKi4DzDgIumQLqi_En1doE5rYG1QaUWgCyJZSq0djnPWGjKg/exec";
    const updatePayload = {
      action:          "UPDATE_TRANSACTION",
      transactionId:   orderId,
      status:          "Completed",
      amountTendered:  amountTendered,
      changeGiven:     changeGiven,
    };
    fetch(WEBHOOK, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(updatePayload)
    }).catch(err => console.error("Update transaction failed:", err));

    window.showToast('Order marked as done!', 'success');
  }

  function _renderOrderFeed() {
    const container = document.getElementById('order-feed-container');
    if (!container) return;

    if (orderFeed.length === 0) {
      container.innerHTML = `
        <p class="text-white/50 text-sm text-center py-8">
          No incoming orders yet.<br>
          <span class="text-xs">Orders from buyers will appear here.</span>
        </p>
      `;
      return;
    }

    container.innerHTML = orderFeed.map(order => {
      const orderId         = escapeHTML(order.transactionId || order.timestamp);
      const time            = new Date(order.timestamp).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
      const safeCustomer    = escapeHTML(order.customerName);
      const safePayment     = escapeHTML(order.paymentMethod || (order.payment === 'cash' ? 'Cash' : 'GCash'));
      const safeGcashRef    = escapeHTML(order.gcashRef || 'N/A');
      const safeDestination = escapeHTML(order.destination || order.contactInfo || '');

      const isCash      = (order.payment === 'cash' || order.paymentMethod === 'Cash');
      const isGcash     = !isCash;
      const isDelivery  = order.fulfillment === 'delivery' || order.fulfillment === 'Campus Delivery';
      const isCompleted = order.status === 'Completed';

      const fulfillLabel = isDelivery
        ? `🚚 Campus Delivery — ${safeDestination}`
        : '🏪 Booth Pickup';

      const itemsSummary = (order.items || []).length > 0
        ? (order.items || []).map(i => `${escapeHTML(i.name)} ×${Number(i.qty)}`).join(', ')
        : escapeHTML(order.itemsSummary || '');

      const displayTotal = Number(order.grandTotal || order.total || 0);

      // For Cash online orders: show a tendered-amount input the cashier fills in
      const cashCollectRow = isCash && !isCompleted ? `
        <div class="mt-3 p-3 bg-black/30 rounded-lg border border-white/10">
          <div class="text-xs text-white/60 uppercase tracking-widest mb-2">💵 Collect Cash</div>
          <div class="flex gap-2 items-center">
            <input
              id="cash-collect-${orderId}"
              type="number"
              placeholder="Amount Tendered"
              class="form-input text-white text-sm border-white/20 flex-1"
              style="background:rgba(0,0,0,0.3);"
            />
            <span class="text-white/50 text-xs">Total: ₱${displayTotal}</span>
          </div>
        </div>
      ` : '';

      // For GCash orders: show the ref number prominently
      const gcashRefRow = isGcash ? `
        <div class="flex justify-between items-center mt-2 pt-2 border-t border-white/10 text-xs">
          <span class="text-white/60 uppercase tracking-widest">GCash Ref No.</span>
          <span class="font-mono font-bold text-gold tracking-widest">${safeGcashRef}</span>
        </div>
      ` : '';

      const cardBorder = isCompleted ? 'border-white/5 opacity-60' : (isCash ? 'border-gold/40' : 'border-green-400/40');
      const btnState   = isCompleted ? 'disabled' : '';
      const btnText    = isCompleted ? '✅ Done' : 'Mark as Done / Dispatch';

      return `
        <div class="bg-black/40 border ${cardBorder} p-4 rounded-xl shadow flex flex-col gap-2" id="feed-card-${orderId}">
          <div class="flex justify-between items-start">
            <div>
              <div class="font-bold text-white text-base">${safeCustomer}</div>
              <div class="text-xs text-white/60">${isCash ? '💵' : '📱'} ${safePayment} · ${escapeHTML(time)}</div>
            </div>
            <div class="font-bold text-gold text-xl">₱${displayTotal}</div>
          </div>
          <div class="text-xs text-white/70 leading-relaxed">${itemsSummary}</div>
          <div class="text-xs text-white/50">${fulfillLabel}</div>
          ${gcashRefRow}
          ${cashCollectRow}
          <button
            class="fulfill-btn btn btn-sm btn-primary mt-1 w-full"
            onclick="CashierPOS.markDoneAndDispatch('${orderId}')"
            ${btnState}
          >${btnText}</button>
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
    markDoneAndDispatch,
    completeCashSale,
    switchPosTab,
    lockPOS,
    setWalkinPayment,
  };
})();

window.CashierPOS     = CashierPOS;
window.initCashierGate = CashierPOS.initCashierGate; // Alias for router.js
