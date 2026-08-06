/**
 * cashier.js — Cashier POS Mode
 * ─────────────────────────────────────────────────────────────────────────────
 * Updated for Tabo sa UCLM V2
 */

const CASHIER_PIN = "129845";

const CashierPOS = (() => {

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, match => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[match]));
  }

  let pinBuffer    = '';
  let pinUnlocked  = false;
  let pollingIntervalId = null;

  const bill = new Map();
  let orderFeed = [];
  
  // New State
  let currentQueueFilter = 'Online Pickup - Cash';
  let currentActiveOrder = null;
  let currentVoucherCode = null;
  let currentDiscountAmt = 0;
  let walkinPaymentMode = 'cash'; // 'cash' | 'gcash'
  let gcashValidated = false;

  const QUEUE_CATEGORIES = [
    'Online Pickup - Cash', 'Online Pickup - GCash', 
    'Online Delivery - Cash', 'Online Delivery - GCash'
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // PIN GATE
  // ═══════════════════════════════════════════════════════════════════════════

  function initCashierGate() {
    if (pinUnlocked) {
      _renderPOS();
      startQueuePolling();
      return;
    }
    _renderPINGate();
  }

  function _renderPINGate() {
    const container = document.getElementById('view-cashier');
    if (!container) return;

    container.innerHTML = `
      <div id="pin-gate" class="panubok-header min-h-screen flex flex-col items-center justify-center gap-6">
        <div class="text-center">
          <div class="text-5xl mb-3">🔐</div>
          <h2 class="font-display text-white text-2xl mb-1">Cashier Mode</h2>
          <p class="text-white/70 text-sm mb-6">Enter PIN to access POS</p>

          <div class="pin-dots justify-center mb-6 flex gap-4" id="pin-dots">
            ${[0,1,2,3,4,5].map(i => `<div class="pin-dot w-4 h-4 rounded-full border-2 border-white/50" id="dot-${i}"></div>`).join('')}
          </div>

          <div id="pin-error" class="hidden text-red-300 text-sm mb-3">❌ Incorrect PIN. Try again.</div>

          <div class="pin-keypad mx-auto grid grid-cols-3 gap-3 w-[280px]">
            ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
              <button class="pin-key aspect-square rounded-md bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors" ${k === '' ? 'disabled style="opacity:0;"' : ''} onclick="CashierPOS.pinPress('${k}')">${k}</button>
            `).join('')}
          </div>

          <button class="mt-6 text-white/50 text-sm underline hover:text-white" onclick="Router.navigate('#home')">← Back to menu</button>
        </div>
      </div>
    `;
    pinBuffer = '';
  }

  function pinPress(key) {
    const errorEl = document.getElementById('pin-error');
    if (errorEl) errorEl.classList.add('hidden');

    if (key === '⌫') pinBuffer = pinBuffer.slice(0, -1);
    else if (pinBuffer.length < 6) pinBuffer += key;

    for (let i = 0; i < 6; i++) {
      const dot = document.getElementById(`dot-${i}`);
      if (dot) {
        if (i < pinBuffer.length) {
          dot.classList.add('bg-[#D4A017]', 'border-[#D4A017]');
          dot.classList.remove('border-white/50');
        } else {
          dot.classList.remove('bg-[#D4A017]', 'border-[#D4A017]');
          dot.classList.add('border-white/50');
        }
      }
    }

    if (pinBuffer.length === 6) setTimeout(_checkPIN, 200);
  }

  function _checkPIN() {
    if (pinBuffer === CASHIER_PIN) {
      pinUnlocked = true;
      window.showToast('🔓 Bukas na ang Cashier Mode!', 'success');
      _renderPOS();
      startQueuePolling();
    } else {
      const errorEl = document.getElementById('pin-error');
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => { errorEl.style.animation = ''; }, 400);
      }
      for (let i = 0; i < 6; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
          dot.classList.remove('bg-[#D4A017]', 'border-[#D4A017]');
          dot.classList.add('border-white/50');
        }
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
      <div id="cashier-pos" class="min-h-screen text-white flex flex-col" style="background:#1a1008;">
        
        <div class="pos-header flex justify-between items-center p-4 bg-black/40 border-b border-white/10">
          <div>
            <h1 class="font-display text-xl text-gold">🍽️ Tabo sa UCLM POS</h1>
            <p class="text-xs opacity-80" id="pos-timestamp"></p>
          </div>
          <div class="flex gap-4 sm:gap-8 items-center mr-4 hidden md:flex">
            <div class="text-center">
              <div class="text-[10px] text-white/50 uppercase tracking-widest">Total Revenue</div>
              <div class="text-gold font-bold" id="rev-total">₱0.00</div>
            </div>
            <div class="text-center">
              <div class="text-[10px] text-white/50 uppercase tracking-widest">Cash</div>
              <div class="text-green-400 font-bold" id="rev-cash">₱0.00</div>
            </div>
            <div class="text-center">
              <div class="text-[10px] text-white/50 uppercase tracking-widest">GCash</div>
              <div class="text-blue-400 font-bold" id="rev-gcash">₱0.00</div>
            </div>
            <div class="text-center">
              <div class="text-[10px] text-white/50 uppercase tracking-widest">Completed</div>
              <div class="text-white font-bold" id="rev-count">0</div>
            </div>
          </div>
          <button class="btn btn-sm bg-white/10 hover:bg-white/20 text-white" onclick="CashierPOS.lockPOS()">🔒 Lock</button>
        </div>

        <div class="pos-tabs flex bg-gray-900 border-b border-white/10">
          <button class="pos-tab-btn flex-1 py-4 text-center font-display text-lg text-gray-400 hover:text-white transition-colors active border-b-4 border-transparent" onclick="CashierPOS.switchPosTab('walkin')" id="tab-btn-walkin">💻 Cashier POS</button>
          <button class="pos-tab-btn flex-1 py-4 text-center font-display text-lg text-gray-400 hover:text-white transition-colors border-b-4 border-transparent" onclick="CashierPOS.switchPosTab('online')" id="tab-btn-online">📲 Orders Queue</button>
        </div>

        <!-- ── TAB A: CASHIER POS WORKSPACE ── -->
        <div class="pos-panel flex flex-col lg:flex-row flex-1 overflow-hidden" id="tab-walkin" style="display:flex;">
          
          <!-- LEFT: Quick Entry & Bill -->
          <div class="flex flex-col flex-1 overflow-hidden border-r border-white/10" style="min-height:50vh">
            <div class="p-4 border-b border-white/10 bg-black/20">
              <div class="flex justify-between items-center mb-2">
                <label class="text-xs text-white/70 uppercase tracking-wide">Quick Item Entry (Type 3-digit ID)</label>
                <button class="btn btn-outline text-xs border-gold text-gold hover:bg-gold/10 whitespace-nowrap" onclick="CashierPOS.startNewWalkin()">🔄 New Walk-In Sale</button>
              </div>
              <div class="flex gap-2 mb-3">
                <input id="quick-entry-input" type="number" min="101" placeholder="e.g. 101" class="form-input flex-1 text-white border-white/20 bg-black/30 placeholder-white/30" onkeydown="if(event.key==='Enter') CashierPOS.quickEntry()" autocomplete="off">
                <button class="btn btn-gold px-5" onclick="CashierPOS.quickEntry()">+ Add</button>
              </div>
              <div class="flex flex-wrap gap-2" id="quick-pills">
                ${(window.PRODUCTS || []).filter(p => p.id.startsWith('prod-')).map(p => {
                  const num = p.id.replace('prod-','');
                  const shortName = p.name.split(' ').slice(0,2).join(' ');
                  return `<button class="px-3 py-1 rounded-full border border-white/30 text-xs text-white/80 hover:bg-white/10 hover:border-gold transition-all" onclick="document.getElementById('quick-entry-input').value='${num}'; CashierPOS.quickEntry()">${num} ${shortName}</button>`;
                }).join('')}
              </div>
            </div>

            
            <div id="pos-active-order-banner" class="bg-blue-900/40 border-b border-blue-500/30 p-2 text-center text-sm text-blue-200 font-semibold hidden">
              <!-- Filled by JS when picking up an order -->
            </div>

            <div class="flex-1 overflow-y-auto p-4" id="pos-bill-list">
              <!-- Bill items -->
            </div>
          </div>

          <!-- RIGHT: Payment & Complete -->
          <div class="lg:w-96 flex flex-col bg-gray-800 shrink-0">
            <div class="p-6 border-b border-white/10 bg-black/40 text-center">
              <div class="text-white/70 text-sm uppercase tracking-wider mb-1">Total Due</div>
              <div id="pos-bill-total" class="text-yellow-400 text-5xl font-bold">₱0</div>
              <div id="pos-bill-discount" class="text-green-400 text-sm font-semibold mt-1 hidden"></div>
            </div>

            <div class="p-4 border-b border-white/10 bg-black/20">
              <div class="text-xs text-white/70 uppercase tracking-widest mb-2">Payment Method</div>
              <div class="flex gap-2">
                <button id="walkin-pay-cash" class="flex-1 py-2 rounded-lg text-sm font-bold border-2 border-gold bg-gold/15 text-gold" onclick="CashierPOS.setWalkinPayment('cash')">💵 Cash</button>
                <button id="walkin-pay-gcash" class="flex-1 py-2 rounded-lg text-sm font-bold border-2 border-white/20 text-white/50 bg-transparent" onclick="CashierPOS.setWalkinPayment('gcash')">📱 GCash</button>
              </div>
            </div>

            <!-- Cash Panel -->
            <div id="payment-panel-cash" class="p-6 border-b border-white/10 flex-1 flex flex-col bg-black/20">
              <label class="form-label text-white/70 text-xs">Amount Tendered (₱)</label>
              <input id="calc-tendered" type="number" class="form-input text-2xl py-3 text-white border-white/20 bg-black/30 placeholder-white/30 text-center" placeholder="0" oninput="CashierPOS.calcChange()">
              <div id="calc-change-display" class="mt-4 rounded-lg p-4 text-center font-bold text-3xl bg-white/5">
                <div class="text-xs text-white/50 mb-1 font-normal uppercase tracking-wide">Change Due</div>
                <div id="calc-change-value" class="text-white/40">—</div>
              </div>
            </div>

            <!-- GCash Panel -->
            <div id="payment-panel-gcash" class="hidden p-6 border-b border-white/10 flex-1 flex flex-col bg-black/20">
              <label class="form-label text-white/70 text-xs">GCash Reference No.</label>
              <input id="calc-gcash-ref" type="text" maxlength="13" class="form-input text-2xl py-3 font-mono text-center text-gold border-white/20 bg-black/30 placeholder-white/30" placeholder="13-digit ref" oninput="CashierPOS.validateGCash()">
              <div id="gcash-validation-msg" class="text-sm text-center mt-3 text-white/40">Enter 13-digit reference number</div>
            </div>

            <div class="p-5 bg-black/30">
              <button id="btn-complete-sale" class="w-full py-4 rounded-lg font-bold text-lg text-white bg-green-600 hover:bg-green-500 transition-colors shadow-[0_4px_14px_rgba(22,163,74,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none" onclick="CashierPOS.completeSale()">✅ COMPLETE SALE</button>
            </div>
          </div>
        </div>

        <!-- ── TAB B: ORDERS QUEUE ── -->
        <div class="pos-panel flex-1 overflow-hidden flex-col bg-black/15" id="tab-online" style="display:none;">
          
          <!-- Category Tabs -->
          <div class="p-4 border-b border-white/10 flex gap-3 overflow-x-auto hide-scrollbar whitespace-nowrap bg-black/40">
            ${QUEUE_CATEGORIES.map(cat => `
              <button id="qfilter-${cat.replace(/\s/g,'').replace('-','')}" class="queue-filter-btn px-6 py-3 rounded-full border-2 border-white/20 text-base font-bold transition-all ${currentQueueFilter === cat ? 'bg-[#D4A017] text-black border-[#D4A017] shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'text-white/70 hover:bg-white/10'}" onclick="CashierPOS.setQueueFilter('${cat}')">${cat}</button>
            `).join('')}
          </div>
          
          <div class="p-4 flex justify-between items-center">
            <h3 class="font-display text-xl text-gold" id="queue-title-label">${currentQueueFilter} Queue</h3>
            <button class="btn btn-outline btn-sm border-white/30 text-white/80" onclick="CashierPOS.refreshFeed()">↻ Refresh</button>
          </div>

          <div id="order-feed-container" class="flex-1 overflow-y-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-start">
            <!-- Feed cards injected here -->
          </div>
        </div>

      </div>
    `;

    _updateTimestamp();
    setInterval(_updateTimestamp, 60000);
    _renderBill();
    // Instead of local refreshFeed(), we use polling
    // refreshFeed() is now handled by the polling interval

    // Re-apply active tab styling manually
    document.getElementById('tab-btn-walkin').style.borderBottomColor = '#D4A017';
    document.getElementById('tab-btn-walkin').style.color = 'white';
  }

  function switchPosTab(tabId) {
    document.querySelectorAll('.pos-tab-btn').forEach(btn => {
      btn.style.borderBottomColor = 'transparent';
      btn.style.color = '#9CA3AF'; // text-gray-400
    });
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    if(activeBtn) {
      activeBtn.style.borderBottomColor = '#D4A017';
      activeBtn.style.color = 'white';
    }

    document.querySelectorAll('.pos-panel').forEach(panel => panel.style.display = 'none');
    const activePanel = document.getElementById(`tab-${tabId}`);
    if(activePanel) activePanel.style.display = 'flex';
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
  // QUEUE MANAGEMENT & FILTERING
  // ═══════════════════════════════════════════════════════════════════════════

  function setQueueFilter(cat) {
    currentQueueFilter = cat;
    document.querySelectorAll('.queue-filter-btn').forEach(btn => {
      btn.className = 'queue-filter-btn px-6 py-3 rounded-full border-2 border-white/20 text-base font-bold transition-all text-white/70 hover:bg-white/10';
    });
    const activeId = `qfilter-${cat.replace(/\s/g,'').replace('-','')}`;
    const activeBtn = document.getElementById(activeId);
    if(activeBtn) {
      activeBtn.className = 'queue-filter-btn px-6 py-3 rounded-full border-2 border-[#D4A017] text-base font-bold transition-all bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]';
    }
    const label = document.getElementById('queue-title-label');
    if(label) label.textContent = `${cat} Queue`;

    _renderOrderFeed();
  }

  function getOrderCategory(order) {
    const oType = (order.OrderType || order.orderType || 'Online').trim();
    const fill  = (order.Fulfillment || order.fulfillment || '').trim().toLowerCase();
    const pay   = (order.PaymentMethod || order.paymentMethod || order.payment || 'Cash').trim();
    
    if (oType === 'Walk-in') {
      return `Walk-in - ${pay}`;
    } else {
      if (fill.includes('delivery')) {
        return `Online Delivery - ${pay}`;
      } else {
        return `Online Pickup - ${pay}`;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WEBHOOK & POLLING
  // ═══════════════════════════════════════════════════════════════════════════
  const WEBHOOK = "https://script.google.com/macros/s/AKfycbwaibLoaT7AfjGgoL2L8PUwBAkKj6GC1XAkePLIFTOyd9DgDjaz-b1XipUIgkTySCNZ/exec";

  function startQueuePolling() {
    if (pollingIntervalId) clearInterval(pollingIntervalId);
    
    // Initial fetch
    _fetchServerData();
    
    // Poll every 5 seconds
    pollingIntervalId = setInterval(_fetchServerData, 5000);
  }

  function stopQueuePolling() {
    if (pollingIntervalId) clearInterval(pollingIntervalId);
  }

  async function _fetchServerData() {
    try {
      // 1. Fetch Pending Orders
      const orderRes = await fetch(WEBHOOK, {
        method: 'POST',
        body: JSON.stringify({ action: "GET_PENDING_ORDERS" })
      });
      const orderData = await orderRes.json();
      if (orderData && orderData.orders) {
        orderFeed = orderData.orders.map(o => ({
          transactionId: o.TransactionID || o.transactionId,
          timestamp: o.Timestamp || o.timestamp,
          orderType: o.OrderType || o.orderType,
          fulfillment: o.Fulfillment || o.fulfillment,
          paymentMethod: o.PaymentMethod || o.paymentMethod,
          customerName: o.CustomerName || o.customerName,
          contactInfo: o.ContactInfo || o.contactInfo,
          itemsSummary: o.ItemsSummary || o.itemsSummary,
          subtotal: o.Subtotal || o.subtotal,
          voucherApplied: o.VoucherApplied || o.voucherApplied,
          discountAmount: o.DiscountAmount || o.discountAmount,
          grandTotal: o.GrandTotal || o.grandTotal,
          amountTendered: o.AmountTendered || o.amountTendered,
          changeGiven: o.ChangeGiven || o.changeGiven,
          gcashRef: o.GCashRef || o.gcashRef,
          status: o.Status || o.status
        })).reverse();
        _renderOrderFeed();
      }

      // 2. Fetch Revenue Metrics
      const revRes = await fetch(WEBHOOK, {
        method: 'POST',
        body: JSON.stringify({ action: "GET_REVENUE_METRICS" })
      });
      const revData = await revRes.json();
      if (revData && revData.metrics) {
        const m = revData.metrics;
        const revTotalEl = document.getElementById('rev-total');
        const revCashEl = document.getElementById('rev-cash');
        const revGCashEl = document.getElementById('rev-gcash');
        const revCountEl = document.getElementById('rev-count');
        
        if (revTotalEl) revTotalEl.textContent = `₱${Number(m.totalRevenue).toFixed(2)}`;
        if (revCashEl) revCashEl.textContent = `₱${Number(m.cashTotal).toFixed(2)}`;
        if (revGCashEl) revGCashEl.textContent = `₱${Number(m.gcashTotal).toFixed(2)}`;
        if (revCountEl) revCountEl.textContent = m.completedCount;
      }
    } catch (e) {
      console.warn("Polling error:", e);
    }
  }

  function refreshFeed() {
    // Manual refresh button triggers an immediate fetch
    _fetchServerData();
  }

  function _renderOrderFeed() {
    const container = document.getElementById('order-feed-container');
    if (!container) return;

    // Filter pending and category
    const visibleOrders = orderFeed.filter(o => o.status === 'Pending' && getOrderCategory(o) === currentQueueFilter);

    if (visibleOrders.length === 0) {
      container.innerHTML = `<p class="text-white/40 text-sm text-center py-12 col-span-full">No pending orders for ${currentQueueFilter}.</p>`;
      return;
    }

    container.innerHTML = visibleOrders.map(order => {
      const orderId = escapeHTML(order.transactionId || order.timestamp);
      const time    = new Date(order.timestamp).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
      const dest    = escapeHTML(order.destination || order.contactInfo || '');
      
      const isDelivery = currentQueueFilter.includes('Delivery');
      const isGCash    = currentQueueFilter.includes('GCash');

      return `
        <div class="rounded-xl p-4 flex flex-col gap-3 bg-black/40 border ${isGCash ? 'border-green-500/40' : 'border-yellow-500/50'}">
          <div class="flex justify-between items-start">
            <div>
              <div class="font-bold text-white text-lg">${escapeHTML(order.customerName)}</div>
              <div class="text-xs text-white/50">${time} · ID: ${orderId.slice(-6)}</div>
            </div>
            <div class="font-bold text-gold text-2xl">₱${Number(order.grandTotal || order.total || 0).toFixed(2)}</div>
          </div>
          
          ${isDelivery ? `
            <div class="bg-blue-900/30 border border-blue-500/30 p-2 rounded text-sm text-blue-200">
              <strong class="uppercase text-[10px] tracking-wider block text-blue-300">Deliver To:</strong>
              ${dest}
            </div>
          ` : ''}

          <div class="text-xs text-white/60 line-clamp-2 italic">
             ${order.itemsSummary ? escapeHTML(order.itemsSummary) : (order.items || []).map(i=>`${escapeHTML(i.name)} x${i.qty}`).join(', ')}
          </div>

          <button class="w-full mt-auto bg-[#D4A017] hover:bg-yellow-400 text-black shadow-lg py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-transform active:scale-95 border-none" onclick="CashierPOS.loadOrderToPOS('${orderId}')" style="color: #000 !important;">
            Pick Up Order ➔
          </button>
        </div>
      `;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WORKSPACE MANAGEMENT (Pick Up & New Walk-in)
  // ═══════════════════════════════════════════════════════════════════════════

  function startNewWalkin() {
    currentActiveOrder = null;
    bill.clear();
    currentVoucherCode = null;
    currentDiscountAmt = 0;
    
    const banner = document.getElementById('pos-active-order-banner');
    if(banner) {
      banner.style.display = 'none';
      banner.innerHTML = '';
    }

    _renderBill();
    setWalkinPayment('cash');
    const refInput = document.getElementById('calc-gcash-ref');
    if (refInput) refInput.value = '';
    validateGCash();

    window.showToast('Nalinis na ang workspace para sa bagong walk-in sale.', 'success');
  }

  function loadOrderToPOS(orderId) {
    const order = orderFeed.find(o => o.transactionId === orderId || String(o.timestamp) === String(orderId));
    if (!order) return;

    currentActiveOrder = order;
    bill.clear();

    // Handle structured items array (from localStorage/direct)
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(i => {
        const p = (window.PRODUCTS || []).find(pr => pr.id === i.id || pr.name === i.name);
        if (p) bill.set(p.id, Number(i.qty));
      });
    }
    // Handle itemsSummary string from Google Sheets (e.g. "Tinuom na Manok x2, Tamales x1")
    else if (order.itemsSummary && typeof order.itemsSummary === 'string') {
      const parts = order.itemsSummary.split(',').map(s => s.trim());
      parts.forEach(part => {
        const match = part.match(/^(.+?)\s+x\s*(\d+)$/i);
        if (match) {
          const name = match[1].trim();
          const qty  = parseInt(match[2], 10);
          const p = (window.PRODUCTS || []).find(pr => pr.name.toLowerCase() === name.toLowerCase());
          if (p) bill.set(p.id, qty);
        }
      });
    }

    currentVoucherCode = order.voucherApplied && order.voucherApplied !== 'NONE' ? order.voucherApplied : null;
    currentDiscountAmt = order.discountAmount || 0;

    switchPosTab('walkin');

    const banner = document.getElementById('pos-active-order-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.innerHTML = `Pinoproseso ang Order: <strong>${escapeHTML(order.customerName || 'Customer')}</strong> (${getOrderCategory(order)})`;
    }

    _renderBill();

    const pay = (order.paymentMethod || order.payment || 'Cash').trim().toLowerCase();
    setWalkinPayment(pay === 'gcash' ? 'gcash' : 'cash');

    const refInput = document.getElementById('calc-gcash-ref');
    if (refInput) {
      refInput.value = order.gcashRef && order.gcashRef !== 'N/A' ? order.gcashRef : '';
      validateGCash();
    }
    
    const tender = document.getElementById('calc-tendered');
    if(tender) {
      tender.value = '';
      calcChange();
    }
    window.showToast('✅ Na-load na ang order sa POS!', 'success');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // QUICK ENTRY & BILL CALCULATION
  // ═══════════════════════════════════════════════════════════════════════════

  function quickEntry() {
    const input = document.getElementById('quick-entry-input');
    if (!input || !input.value.trim()) return;

    const rawVal = input.value.trim();
    const numericPart = rawVal.replace(/^prod-?/i, '').padStart(3, '0');
    const targetId    = `prod-${numericPart}`;

    const matchedProduct = (window.PRODUCTS || []).find(
      p => p.id === targetId || p.id === rawVal || p.id.endsWith(numericPart)
    );

    if (!matchedProduct) {
      window.showToast(`❌ Hindi natagpuan ang produkto`, 'error');
      input.value = '';
      return;
    }

    addToBill(matchedProduct.id);
    input.value = '';
    input.focus();
  }

  function addToBill(productId) {
    const current = bill.get(productId) || 0;
    bill.set(productId, current + 1);
    _renderBill();
  }

  function setBillQty(productId, qty) {
    if (qty <= 0) bill.delete(productId);
    else bill.set(productId, qty);
    _renderBill();
  }

  function _getBillSubtotal() {
    let subtotal = 0;
    bill.forEach((qty, id) => {
      const p = (window.PRODUCTS || []).find(pr => pr.id === id);
      if (p) subtotal += p.price * qty;
    });
    return subtotal;
  }

  function _renderBill() {
    const container = document.getElementById('pos-bill-list');
    const totalEl   = document.getElementById('pos-bill-total');
    const discEl    = document.getElementById('pos-bill-discount');
    
    if (!container) return;

    if (bill.size === 0) {
      container.innerHTML = `<p class="text-white/30 text-center py-8 text-sm">No items. Workspace empty.</p>`;
      if (totalEl) totalEl.textContent = '₱0';
      if (discEl) discEl.classList.add('hidden');
      calcChange();
      return;
    }

    let html = '';
    let subtotal = 0;

    bill.forEach((qty, id) => {
      const p = (window.PRODUCTS || []).find(pr => pr.id === id);
      if (!p) return;
      const lineTotal = p.price * qty;
      subtotal += lineTotal;
      html += `
        <div class="flex items-center justify-between py-2 border-b border-white/5">
          <div class="flex-1">
            <div class="font-semibold text-sm text-white">${p.name}</div>
            <div class="text-[11px] text-white/50">₱${p.price} ea</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center bg-black/40 rounded border border-white/10">
              <button onclick="CashierPOS.setBillQty('${p.id}', ${qty - 1})" class="w-8 h-8 text-gold hover:bg-white/10">−</button>
              <span class="w-6 text-center text-sm font-bold">${qty}</span>
              <button onclick="CashierPOS.setBillQty('${p.id}', ${qty + 1})" class="w-8 h-8 text-gold hover:bg-white/10">+</button>
            </div>
            <span class="text-gold font-bold text-sm w-12 text-right">₱${lineTotal}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    const grandTotal = Math.max(0, subtotal - currentDiscountAmt);

    if (totalEl) totalEl.textContent = `₱${grandTotal.toFixed(2)}`;
    
    if (discEl && currentVoucherCode) {
      discEl.classList.remove('hidden');
      discEl.innerHTML = `Voucher: ${currentVoucherCode} (-₱${currentDiscountAmt})`;
    } else if (discEl) {
      discEl.classList.add('hidden');
    }

    calcChange();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAYMENT LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  function setWalkinPayment(mode) {
    walkinPaymentMode = mode;
    const cashBtn   = document.getElementById('walkin-pay-cash');
    const gcashBtn  = document.getElementById('walkin-pay-gcash');
    const pnlCash   = document.getElementById('payment-panel-cash');
    const pnlGcash  = document.getElementById('payment-panel-gcash');

    const completeBtn = document.getElementById('btn-complete-sale');

    if (mode === 'cash') {
      if(cashBtn) cashBtn.className = 'flex-1 py-2 rounded-lg text-sm font-bold transition-all border-2 border-gold bg-gold/15 text-gold';
      if(gcashBtn) gcashBtn.className = 'flex-1 py-2 rounded-lg text-sm font-bold transition-all border-2 border-white/20 text-white/50 bg-transparent';
      if(pnlCash) pnlCash.classList.remove('hidden');
      if(pnlGcash) pnlGcash.classList.add('hidden');
      if(completeBtn) completeBtn.innerHTML = '✅ COMPLETE SALE';
    } else {
      if(gcashBtn) gcashBtn.className = 'flex-1 py-2 rounded-lg text-sm font-bold transition-all border-2 border-gold bg-gold/15 text-gold';
      if(cashBtn) cashBtn.className = 'flex-1 py-2 rounded-lg text-sm font-bold transition-all border-2 border-white/20 text-white/50 bg-transparent';
      if(pnlCash) pnlCash.classList.add('hidden');
      if(pnlGcash) pnlGcash.classList.remove('hidden');
      if(completeBtn) completeBtn.innerHTML = '✅ Reference Match / Valid';
    }
    validateGCash();
  }

  function calcChange() {
    const tenderedInput = document.getElementById('calc-tendered');
    const display       = document.getElementById('calc-change-display');
    const valueEl       = document.getElementById('calc-change-value');
    const btn           = document.getElementById('btn-complete-sale');
    
    if (walkinPaymentMode !== 'cash') return;
    if (!tenderedInput || !valueEl) return;

    const subtotal = _getBillSubtotal();
    const grandTotal = Math.max(0, subtotal - currentDiscountAmt);
    const tendered = parseFloat(tenderedInput.value) || 0;

    if (grandTotal === 0 || tendered === 0) {
      valueEl.textContent = '—';
      valueEl.className   = 'text-white/40';
      display.style.background = 'rgba(255,255,255,0.05)';
      if(btn) btn.disabled = true;
      return;
    }

    const change = tendered - grandTotal;

    if (change < 0) {
      valueEl.textContent = `−₱${Math.abs(change).toFixed(2)}`;
      valueEl.className   = 'text-red-400';
      display.style.background = 'rgba(239,68,68,0.15)';
      if(btn) btn.disabled = true;
    } else {
      valueEl.textContent = `₱${change.toFixed(2)}`;
      valueEl.className   = 'text-green-400 text-4xl';
      display.style.background = 'rgba(22,163,74,0.15)';
      if(btn && bill.size > 0) btn.disabled = false;
    }
  }

  function validateGCash() {
    const btn = document.getElementById('btn-complete-sale');
    if (walkinPaymentMode !== 'gcash') return;

    const refInput = document.getElementById('calc-gcash-ref');
    const msg = document.getElementById('gcash-validation-msg');
    
    if (!refInput) return;
    const ref = refInput.value.trim();
    
    if (ref.length === 13 && !isNaN(Number(ref))) {
      msg.textContent = '✅ Valid Reference Format';
      msg.className = 'text-sm text-center mt-3 text-green-400 font-bold';
      gcashValidated = true;
      if (btn && bill.size > 0) btn.disabled = false;
    } else {
      msg.textContent = '❌ Must be exactly 13 digits';
      msg.className = 'text-sm text-center mt-3 text-red-400';
      gcashValidated = false;
      if (btn) btn.disabled = true;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPLETE SALE / WEBHOOK
  // ═══════════════════════════════════════════════════════════════════════════

  async function completeSale() {
    if (bill.size === 0) return window.showToast("Walang laman ang bill!", "error");

    const btn = document.getElementById('btn-complete-sale');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Processing...'; }

    
    const subtotal = _getBillSubtotal();
    const grandTotal = Math.max(0, subtotal - currentDiscountAmt);
    let amountTendered = 0;
    let changeGiven = 0;
    let gcashRef = '';

    if (walkinPaymentMode === 'cash') {
      amountTendered = parseFloat(document.getElementById('calc-tendered')?.value) || 0;
      changeGiven = Math.max(0, amountTendered - grandTotal);
    } else {
      amountTendered = grandTotal;
      gcashRef = document.getElementById('calc-gcash-ref')?.value || '';
    }

    if (currentActiveOrder) {
      // ── COMPLETE A PICKED-UP QUEUE ORDER (UPDATE_TRANSACTION) ──
      const orderId = currentActiveOrder.transactionId || currentActiveOrder.timestamp;
      
      const updatePayload = {
        action:          "UPDATE_TRANSACTION",
        transactionId:   orderId,
        status:          "Completed",
        amountTendered:  amountTendered,
        changeGiven:     changeGiven,
        gcashRef:        walkinPaymentMode === 'gcash' ? gcashRef : "N/A"
      };

      try {
        // Optimistic UI update: instantly remove from feed
        orderFeed = orderFeed.filter(o => o.transactionId !== orderId && o.timestamp !== orderId);
        _renderOrderFeed();
        
        await fetch(WEBHOOK, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatePayload) });
      } catch(e) {}

      window.showToast('✅ Matagumpay na natapos ang Order!', 'success');
      startNewWalkin();

    } else {
      // ── COMPLETE A FRESH MANUAL WALK-IN (CREATE_TRANSACTION) ──
      const items = [];
      bill.forEach((qty, id) => {
        const p = (window.PRODUCTS || []).find(pr => pr.id === id);
        if (p) items.push(`${p.name} x${qty}`);
      });

      const payload = {
        action:        "CREATE_TRANSACTION",
        timestamp:     new Date().toISOString(),
        transactionId: `WLK-${Date.now().toString().slice(-6)}`,
        orderType:     "Walk-in",
        fulfillment:   "Over-the-Counter",
        paymentMethod: walkinPaymentMode === 'cash' ? "Cash" : "GCash",
        customerName:  "Walk-in Customer",
        contactInfo:   "N/A",
        itemsSummary:  items.join(', '),
        subtotal:      subtotal,
        voucherApplied:"NONE",
        discountAmount:0,
        grandTotal:    grandTotal,
        amountTendered:amountTendered,
        changeGiven:   changeGiven,
        gcashRef:      walkinPaymentMode === 'gcash' ? gcashRef : "N/A",
        status:        "Completed"
      };

      try {
        await fetch(WEBHOOK, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch(e) {}

      window.showToast('✅ Matagumpay na natapos ang Walk-In Sale!', 'success');
      startNewWalkin();
    }

    if (btn) { btn.disabled = false; btn.textContent = '✅ COMPLETE SALE'; }
  }

  function lockPOS() {
    pinUnlocked = false;
    _renderPINGate();
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  return {
    initCashierGate, pinPress, switchPosTab, setQueueFilter, refreshFeed,
    quickEntry, addToBill, setBillQty, startNewWalkin, loadOrderToPOS,
    setWalkinPayment, calcChange, validateGCash, completeSale, lockPOS
  };
})();

window.CashierPOS     = CashierPOS;
window.initCashierGate = CashierPOS.initCashierGate;
