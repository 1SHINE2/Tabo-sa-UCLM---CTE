/**
 * app.js — Main Application Logic (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Initializes the app, manages sidebar, renders the Shopee-like menu grid,
 * handles product search, and renders the detailed standalone product view.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const App = (() => {

  // ── Initialization ──────────────────────────────────────────────────────────
  function init() {
    // Render initial product grid
    _renderMenuGrid(window.PRODUCTS);
    
    // Render the new Homepage Gallery
    if (window.GALLERY_DATA) {
      _renderHomepageGallery();
    }

    // Initialize Sidebar toggle
    const menuBtn = document.getElementById('menu-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    if (menuBtn) {
      menuBtn.addEventListener('click', toggleSidebar);
    }
    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Initialize Menu Search
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = window.PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(term) || 
          (p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(term)))
        );
        _renderMenuGrid(filtered);
      });
    }

    // Init Router (which triggers initial view)
    if (window.Router) window.Router.init();
    
    // Init Cart (re-hydrate state)
    if (window.Cart) window.Cart.init();
  }

  // ── Sidebar Logic ───────────────────────────────────────────────────────────
  function toggleSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('sidebar-overlay');
    if (drawer.classList.contains('open')) {
      closeSidebar();
    } else {
      drawer.classList.add('open');
      overlay.classList.add('open');
    }
  }

  function closeSidebar() {
    const drawer = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('sidebar-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }
  // Expose globally for Router
  window.closeSidebar = closeSidebar;

  // ── Shopee-like Menu Grid Renderer ──────────────────────────────────────────
  function _renderMenuGrid(productsToRender) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    if (productsToRender.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-10 text-smoke">Walang nahanap na putahe. Subukan muli.</div>`;
      return;
    }

    grid.innerHTML = productsToRender.map(product => {
      // Small preview of ingredients
      const ingPreview = product.ingredients ? product.ingredients.slice(0, 2).join(', ') : '';
      
      const isPromo = product.name.includes('3 piraso');

      return `
        <a href="#${product.id}" class="shopee-card animate-slide-up relative block">
          <div class="relative">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            ${isPromo ? `<div class="promo-badge">🎁 3 Piraso · Mas Sulit!</div>` : ''}
            <div class="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full border border-white/20 flex items-center gap-1 backdrop-blur-sm">
              <span class="animate-pulse">👆</span> Pindutin para sa detalye
            </div>
          </div>
          <div class="shopee-card-body">
            <h3 class="shopee-title">${product.name}</h3>
            <p class="text-xs text-smoke mb-2 line-clamp-1">${ingPreview}...</p>
            <div class="shopee-price">₱${product.price}</div>
            <button type="button" class="shopee-add-btn" onclick="event.preventDefault(); event.stopPropagation(); Cart.changeQty('${product.id}', 1); window.showToast('Naidagdag sa cart!', 'success');">
              + Idagdag
            </button>
          </div>
        </a>
      `;
    }).join('');
  }

  // ── Render counter to prevent ID collisions on re-renders ──────────────────
  let _renderCount = 0;

  // ── Detailed Product View Renderer ──────────────────────────────────────────
  function renderProductView(productId) {
    const container = document.getElementById('view-product');
    const product = window.PRODUCTS.find(p => p.id === productId);
    
    if (!container) return;
    // Always clear stale DOM first — prevents duplicate IDs
    container.innerHTML = '';

    if (!product) {
      container.innerHTML = `<div class="p-8 text-center text-red-500">Product not found. <a href="#menu" class="underline">Bumalik sa Menu</a></div>`;
      return;
    }

    // Increment render counter for unique IDs this render cycle
    _renderCount++;
    const rc = _renderCount;

    const currentQty = window.Cart.getQty(productId);
    
    // Build tappable ingredient chips — IDs prefixed with render counter to guarantee uniqueness
    const ingChips = (product.ingredients || []).map((ing, idx) => {
      const desc = product.ingredientDescriptions?.[ing] || '';
      const chipId = `ing-chip-${rc}-${productId}-${idx}`;
      const descId = `ing-desc-${rc}-${productId}-${idx}`;
      return `
        <span class="ingredient-chip tappable-chip" onclick="toggleChipDesc('${descId}', this)" id="${chipId}">
          ${ing} <span class="chip-arrow">▾</span>
        </span>
        <span class="ingredient-chip-desc" id="${descId}" style="display:none;">${desc}</span>
      `;
    }).join('');
    
    // Fun facts — each as a styled card
    const funFactsHtml = (product.history?.funFacts || []).map((fact, i) => `
      <div class="fun-fact-card" style="background: rgba(74,124,89,0.06); border-left: 3px solid var(--color-leaf); border-radius: 0 12px 12px 0; padding: 0.85rem 1rem; margin-bottom: 0.6rem;">
        <span style="font-size:0.7rem; font-weight:800; color:var(--color-leaf); letter-spacing:0.1em; display:block; margin-bottom:0.25rem;">DETALYE ${String(i+1).padStart(2,'0')}</span>
        <p style="margin:0; font-size:0.875rem; color:var(--color-smoke); line-height:1.6;">${fact}</p>
      </div>
    `).join('');

    container.innerHTML = `
      <!-- 1. Header & Quote Hero -->
      <div class="product-hero" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
        <div class="product-hero-overlay"></div>
        <a href="#menu" class="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-full font-bold text-sm z-10 no-underline hover:bg-white/40 transition">
          ← Bumalik sa Menu
        </a>
        <div class="product-hero-content text-center">
          <h1 class="text-white text-4xl md:text-5xl font-display mb-2 drop-shadow-lg">${product.name}</h1>
          <div class="text-gold text-2xl font-bold drop-shadow-md mb-4">₱${product.price}</div>
          <p class="text-white/90 text-base md:text-lg leading-relaxed italic drop-shadow-md max-w-lg mx-auto font-display">
            "${product.quote || ''}"
          </p>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-3xl mx-auto pb-6 overflow-hidden">

        <!-- 2. Kasaysayan — CENTERED with pull quote style -->
        <div class="text-center px-6 pt-8 pb-6 mb-2">
          <span style="display:inline-block; font-size:0.7rem; font-weight:800; letter-spacing:0.15em; color:var(--color-leaf); margin-bottom:0.5rem; text-transform:uppercase;">${product.history?.origin || ''}</span>
          <h3 class="text-3xl font-display font-bold text-earth mb-4" style="border-bottom: 2px solid var(--color-gold); display:inline-block; padding-bottom:4px;">Kasaysayan at Pinagmulan</h3>
          <p class="text-smoke text-lg leading-relaxed font-display italic max-w-xl mx-auto mt-3" style="font-size:1.05rem;">
            "${product.history?.summary || ''}"
          </p>
        </div>

        <!-- 3. Fun Facts — CENTERED -->
        <div class="text-center px-6 mb-10 mt-6">
          <h4 class="text-xl font-bold text-earth mb-4 font-display">Mga Nakaka-intrigang Detalye</h4>
          <div class="inline-block text-left">
            ${funFactsHtml}
          </div>
        </div>

        <!-- 4. Cultural Impact — CENTERED -->
        <div class="text-center px-6 mb-12">
          <h4 class="text-xl font-bold text-earth mb-4 font-display">Sosyo-Kultural na Epekto</h4>
          <p class="text-smoke text-base leading-relaxed max-w-xl mx-auto">${product.history?.impact || ''}</p>
        </div>

        <!-- 5. Kaugnayan sa Tabo sa UCLM — CENTERED card -->
        <div class="text-center px-5 mb-10">
          <h3 class="text-3xl font-display font-bold text-earth mb-5 inline-block pb-1" style="border-bottom:2px solid var(--color-gold);">Kaugnayan sa Tabo sa UCLM</h3>
          <div style="background:#fff; border-radius:1rem; box-shadow:0 2px 16px rgba(0,0,0,0.06); border:1px solid #f0e8d8; padding:1.5rem; max-width:36rem; margin:0 auto; text-align:left;">
            <p style="font-size:0.875rem; color:var(--color-smoke); line-height:1.7; margin-bottom:1rem;">
              <strong style="font-family:var(--font-display,inherit); font-size:1.05rem; color:var(--color-earth); display:block; margin-bottom:0.25rem;">Bakit ang putaheng ito?</strong>
              ${product.culturalTie?.boothRelevance || ''}
            </p>
            <hr style="border:none; border-top:1px solid #f0e0c8; margin-bottom:1rem;">
            <p style="font-size:0.875rem; color:var(--color-smoke); line-height:1.7; margin:0;">
              <strong style="font-family:var(--font-display,inherit); font-size:1.05rem; color:var(--color-earth); display:block; margin-bottom:0.25rem;">Kaugnayan sa Tema:</strong>
              ${product.culturalTie?.themeConnection || ''}
            </p>
          </div>
        </div>

        <!-- 6. Mga Sangkap — CENTERED -->
        <div class="text-center mb-12">
          <h3 class="text-2xl font-display font-bold text-earth mb-4 inline-block border-b-2 border-gold pb-1">Mga Sangkap ng Kabundukan</h3>
          <div class="mb-5 flex flex-wrap justify-center gap-2">${ingChips}</div>
          <p class="text-sm text-smoke font-display italic bg-cream-dark p-4 rounded-xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            "${product.ingredientTheme || ''}"
          </p>
        </div>

        <!-- 7. Nutrisyon — CENTERED -->
        <div class="text-center px-5 mb-8">
          <h3 class="text-3xl font-display font-bold text-earth mb-4 inline-block pb-1" style="border-bottom:2px solid var(--color-gold);">Impormasyon sa Nutrisyon</h3>
          <div class="mb-5">
            ${product.nutrition?.highlight ? `
              <button class="nutrition-highlight scale-110 shadow-sm tappable-badge" onclick="toggleNutritionDesc('nutr-desc-${rc}-${product.id}', this)" style="cursor:pointer; border:none;">
                ${product.nutrition.highlight} <span style="font-size:0.65rem; opacity:0.8;">▾ tap for info</span>
              </button>
              <div id="nutr-desc-${rc}-${product.id}" class="nutrition-desc-box" style="display:none; max-width:480px; margin: 0.75rem auto 0; background: rgba(74,124,89,0.08); border-left: 3px solid var(--color-leaf); border-radius: 0 12px 12px 0; padding: 0.85rem 1rem; text-align: left; font-size: 0.82rem; color: var(--color-smoke); line-height: 1.6; font-style: italic;">
                ${product.nutrition.highlightDescription || ''}
              </div>
            ` : ''}
          </div>
          <div class="nutrition-grid text-left max-w-lg mx-auto">
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.calories || '-'}</div><div class="label">Calories</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.protein || '-'}</div><div class="label">Protein</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.carbs || '-'}</div><div class="label">Carbs</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.fat || '-'}</div><div class="label">Fat</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.sugar || '-'}</div><div class="label">Sugar</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.fiber || '-'}</div><div class="label">Fiber</div></div>
          </div>
        </div>
      </div>

      <!-- 8. Bottom Order CTA -->
      <div class="bottom-order-cta">
        <div class="qty-stepper scale-110 mr-4 shadow-sm">
          <button type="button" onclick="Cart.changeQty('${product.id}', -1); window.renderProductView('${product.id}')">−</button>
          <span>${currentQty}</span>
          <button type="button" onclick="Cart.changeQty('${product.id}', 1); window.renderProductView('${product.id}')">+</button>
        </div>
        <button class="btn btn-primary flex-grow text-lg shadow-md" onclick="if(${currentQty} === 0) Cart.changeQty('${product.id}', 1); window.showToast('Pumunta sa menu...', 'success'); window.location.hash = '#menu';">
          ${currentQty === 0 ? `Idagdag sa Cart ₱${product.price}` : `Naidagdag ₱${product.price * currentQty} — Tingnan ang Menu`}
        </button>
      </div>
    `;
  }
  // Expose globally
  window.renderProductView = renderProductView;

  // ── Ingredient chip & nutrition badge toggle ─────────────────────────────
  window.toggleChipDesc = function(descId, chipEl) {
    const desc = document.getElementById(descId);
    if (!desc) return;
    const open = desc.style.display !== 'none';
    // Close all other open chip descs in this view
    document.querySelectorAll('.ingredient-chip-desc').forEach(d => {
      d.style.display = 'none';
    });
    document.querySelectorAll('.tappable-chip').forEach(c => c.classList.remove('chip-active'));
    if (!open) {
      desc.style.display = 'block'; // FIXED: Changed from inline to block
      chipEl.classList.add('chip-active');
    }
  };

  window.toggleNutritionDesc = function(descId, badgeEl) {
    const desc = document.getElementById(descId);
    if (!desc) return;
    const open = desc.style.display !== 'none';
    desc.style.display = open ? 'none' : 'block';
    const arrow = badgeEl.querySelector('span');
    if (arrow) arrow.textContent = open ? '▾ tap for info' : '▴ close';
  };

  // ── Global Toast System ─────────────────────────────────────────────────────
  let toastCount = 0;
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = `toast-${++toastCount}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
  }
  // Expose globally
  window.showToast = showToast;

  // ── Homepage Gallery & Detail Logic ─────────────────────────────────────────
  function _renderHomepageGallery() {
    const leftCol = document.getElementById('home-gallery-left');
    const rightCol = document.getElementById('home-gallery-right');
    if (!leftCol || !rightCol) return;

    // Left column (5 images)
    const leftItems = [
      { img: 'be12f643-361f-4ad9-9cbc-c89416a5dba5.jpg', caption: 'Tinuom na Manok, isang espesyal na pagkain', galleryId: 'gallery-01' },
      { img: 'e1e5a388-ace2-4e6a-a6db-2db4181c5450.jpg', caption: 'Tamales, nakabalot sa dahon ng mais', galleryId: 'gallery-02' },
      { img: 'gallery-03-kultura.jpg', caption: 'Mga matatanda sa tradisyunal na gamit', galleryId: 'gallery-03' },
      { img: 'Madjaas.jpg', caption: 'Bundok Madja-as, ang sagradong tuktok ng Panay', galleryId: 'gallery-04' },
      { img: 'gallery-05-kultura.jpg', caption: 'Ang mapanlikhang sining ng Panubok', galleryId: 'gallery-05' },
    ];

    // Right column (5 images)
    const rightItems = [
      { img: 'gallery-06-kasaysayan.jpg', caption: 'Isang manghahabi ng Panubok, tagapagpanatili ng sining', galleryId: 'gallery-06' },
      { img: 'gallery-07-kultura.jpg', caption: 'Tradisyunal na damit ng Panay Bukidnon', galleryId: 'gallery-07' },
      { img: 'gallery-08-kasaysayan.jpg', caption: 'Sugidanon — ang epikong awit ng kabundukan', galleryId: 'gallery-08' },
      { img: 'gallery-09-kultura.jpg', caption: 'Binanog — sayaw ng agila', galleryId: 'gallery-09' },
      { img: 'gallery-10-kasaysayan.jpg', caption: 'Bagsang — espiritu ng proteksyon', galleryId: 'gallery-10' },
    ];

    // Duplicate arrays for infinite marquee scrolling
    const loopLeft = [...leftItems, ...leftItems, ...leftItems];
    const loopRight = [...rightItems, ...rightItems, ...rightItems];

    function makeTile(item) {
      return `
        <div class="gallery-tile" onclick="viewGalleryDetail('${item.galleryId}')" style="flex-shrink: 0; margin-bottom: 1rem; position: relative; cursor: pointer;">
          <img src="${item.img}" alt="${item.caption}" loading="lazy" style="width: 100%; border-radius: 0.5rem; object-fit: cover;" />
          <div class="gallery-tile-caption" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.85)); color: white; padding: 1rem 1rem 1.5rem 1rem; font-size: 0.9rem;">
            ${item.caption}
            <div style="font-size: 0.7rem; color: #D4A017; font-weight: bold; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
              <span style="animation: pulse 2s infinite;">👆</span> Pindutin para sa detalye
            </div>
          </div>
        </div>
      `;
    }

    leftCol.innerHTML = loopLeft.map(makeTile).join('');
    rightCol.innerHTML = loopRight.map(makeTile).join('');
  }

  window.viewGalleryDetail = function(id) {
    const item = window.GALLERY_DATA.find(i => i.id === id);
    if (!item) return;

    const galleryView = document.getElementById('view-gallery');
    if (!galleryView) return;

    const funFactsHtml = (item.funFacts || []).map(f => `<li class="mb-2">${f}</li>`).join('');

    galleryView.innerHTML = `
      <!-- Back Button (sticky top) -->
      <div class="sticky top-0 z-20 px-4 py-3" style="background: rgba(10,5,2,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(212,160,23,0.2);">
        <button onclick="Router.navigate('#home')" class="flex items-center gap-2 text-yellow-400 font-bold text-sm hover:text-yellow-300 transition-colors" style="color: #FBBF24; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
          <span style="font-size:1.2rem;">&larr;</span> Bumalik sa Simula
        </button>
      </div>

      <!-- Hero Image -->
      <div class="relative w-full overflow-hidden" style="height: 65vh; min-height: 300px;">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" style="filter: brightness(0.6);" />
        <div class="absolute inset-0" style="background: linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.95) 100%); pointer-events: none;"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <p class="text-xs md:text-sm uppercase tracking-widest font-bold mb-2" style="color: #FBBF24; text-shadow: 0 2px 8px rgba(0,0,0,0.9);">Buwan ng Wika 2026 &mdash; Panay Bukidnon</p>
          <h1 class="font-display text-white text-4xl md:text-6xl font-bold leading-tight mb-2" style="text-shadow: 0 4px 32px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.8);">${item.title}</h1>
          <p class="text-white/90 text-lg md:text-xl italic font-display" style="text-shadow: 0 2px 8px rgba(0,0,0,0.9);">${item.subtitle}</p>
        </div>
      </div>

      <!-- Editorial Content -->
      <div style="background: #0f0906; min-height: 100vh; color: #f5f0e8;">
        <div class="max-w-3xl mx-auto px-5 py-12">

          <!-- Section: Kultura (LEFT STAGGER) -->
          <div class="mb-16" style="width:90%; margin-right:auto; padding:1.5rem 1.75rem 1.5rem 1.5rem; background:rgba(212,160,23,0.05); border-radius:0 1.5rem 1.5rem 0; border-left:4px solid #D4A017;">
            <div class="flex items-center gap-3 mb-4">
              <h2 class="font-display text-3xl font-bold" style="color:#D4A017;">Kultura</h2>
            </div>
            <p class="text-lg leading-relaxed" style="color:#d4c9b5; font-family: Georgia, serif;">${item.culture}</p>
          </div>

          <!-- Photo 1: Kultura -->
          <div class="mb-16 rounded-2xl overflow-hidden" style="border: 2px solid rgba(212,160,23,0.3);">
            ${item.kulturaPhoto ? `<img src="${item.kulturaPhoto}" alt="Larawan ng kultura" style="width:100%; max-height:360px; object-fit:cover; display:block;">` : ''}
          </div>

          <!-- Section: Tradisyon (RIGHT STAGGER) -->
          <div class="mb-16" style="width:90%; margin-left:auto; padding:1.5rem 1.5rem 1.5rem 1.75rem; background:rgba(139,26,26,0.05); border-radius:1.5rem 0 0 1.5rem; border-right:4px solid #8B1A1A; text-align:right;">
            <div class="flex items-center justify-end gap-3 mb-4">
              <h2 class="font-display text-3xl font-bold" style="color:#c0392b;">Tradisyon</h2>
            </div>
            <p class="text-lg leading-relaxed text-right" style="color:#d4c9b5; font-family: Georgia, serif;">${item.tradition}</p>
          </div>

          <!-- Section: Kasaysayan (CENTERED) -->
          <div class="mb-16 p-8 rounded-2xl text-center" style="background: rgba(212,160,23,0.07); border-top: 2px solid #D4A017;">
            <h2 class="font-display text-3xl font-bold mb-4" style="color:#D4A017;">Kasaysayan</h2>
            <p class="text-lg leading-relaxed inline-block" style="color:#d4c9b5; font-family: Georgia, serif;">${item.history}</p>
          </div>

          <!-- Photo 2: Kasaysayan -->
          <div class="mb-16 rounded-2xl overflow-hidden" style="border: 2px solid rgba(139,26,26,0.3);">
            ${item.kasaysayanPhoto ? `<img src="${item.kasaysayanPhoto}" alt="Larawan ng kasaysayan" style="width:100%; max-height:360px; object-fit:cover; display:block;">` : ''}
          </div>

          <!-- Section: Epekto sa Buhay ng Tao (LEFT STAGGER) -->
          <div class="mb-16" style="width:90%; margin-right:auto; padding:1.5rem 1.75rem 1.5rem 1.5rem; background:rgba(212,160,23,0.05); border-radius:0 1.5rem 1.5rem 0; border-left:4px solid #D4A017;">
            <div class="flex items-center gap-3 mb-4">
              <h2 class="font-display text-3xl font-bold" style="color:#D4A017;">Epekto sa Buhay ng Tao</h2>
            </div>
            <p class="text-lg leading-relaxed" style="color:#d4c9b5; font-family: Georgia, serif;">${item.impact}</p>
          </div>

          <!-- Section: Kahalagahan (CENTERED) -->
          <div class="mb-16 p-8 rounded-2xl text-center" style="background: rgba(139,26,26,0.1); border-top: 2px solid #8B1A1A;">
            <h2 class="font-display text-3xl font-bold mb-4" style="color:#c0392b;">Kahalagahan sa Bansa, Kultura, at Etika</h2>
            <p class="text-lg leading-relaxed inline-block" style="color:#d4c9b5; font-family: Georgia, serif;">${item.significance}</p>
          </div>

          <!-- Section: Mga Kawili-Wiling Katotohanan (RIGHT STAGGER) -->
          <div class="mb-16" style="width:90%; margin-left:auto; padding:1.5rem 1.5rem 1.5rem 1.75rem; background:rgba(212,160,23,0.05); border-radius:1.5rem 0 0 1.5rem; border-right:4px solid #D4A017; text-align:right;">
            <div class="flex items-center justify-end gap-3 mb-6">
              <h2 class="font-display text-3xl font-bold" style="color:#D4A017;">Mga Kawili-Wiling Katotohanan</h2>
            </div>
            <div class="space-y-4 text-left">
              ${(item.funFacts || []).map((fact, i) => `
                <div class="flex gap-4 p-5 rounded-xl" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(212,160,23,0.15);">
                  <span class="font-display font-bold text-2xl shrink-0" style="color: rgba(212,160,23,0.5);">${String(i+1).padStart(2,'0')}</span>
                  <p style="color:#d4c9b5; font-family: Georgia, serif; line-height: 1.7;">${fact}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Photo Credit -->
          <p class="text-xs text-right italic mt-8 pb-12" style="color: rgba(212,160,23,0.4); border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem;">
            ${item.photoCredit || ''}
          </p>

        </div>
      </div>
    `;

    // Navigate to gallery view
    window.Router.navigate('#gallery');
  };

  return { init };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', App.init);
