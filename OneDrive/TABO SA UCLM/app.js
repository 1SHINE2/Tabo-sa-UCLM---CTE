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
      grid.innerHTML = `<div class="col-span-full text-center py-10 text-smoke">No dishes found matching your search.</div>`;
      return;
    }

    grid.innerHTML = productsToRender.map(product => {
      // Small preview of ingredients
      const ingPreview = product.ingredients ? product.ingredients.slice(0, 2).join(', ') : '';
      
      return `
        <a href="#${product.id}" class="shopee-card animate-slide-up">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="shopee-card-body">
            <h3 class="shopee-title">${product.name}</h3>
            <p class="text-xs text-smoke mb-2 line-clamp-1">${ingPreview}...</p>
            <div class="shopee-price">₱${product.price}</div>
            <button type="button" class="shopee-add-btn" onclick="event.preventDefault(); event.stopPropagation(); Cart.changeQty('${product.id}', 1); window.showToast('Added to cart!', 'success');">
              + Add
            </button>
          </div>
        </a>
      `;
    }).join('');
  }

  // ── Detailed Product View Renderer ──────────────────────────────────────────
  function renderProductView(productId) {
    const container = document.getElementById('view-product');
    const product = window.PRODUCTS.find(p => p.id === productId);
    
    if (!container) return;
    if (!product) {
      container.innerHTML = `<div class="p-8 text-center text-red-500">Product not found. <a href="#menu" class="underline">Back to Menu</a></div>`;
      return;
    }

    const currentQty = window.Cart.getQty(productId);
    
    // Build ingredient chips
    const ingChips = (product.ingredients || []).map(i => `<span class="ingredient-chip">${i}</span>`).join('');
    
    // Fun facts
    const funFactsHtml = (product.history?.funFacts || []).map(fact => `<li>${fact}</li>`).join('');

    container.innerHTML = `
      <!-- 1. Header & Quote Hero -->
      <div class="product-hero" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
        <div class="product-hero-overlay"></div>
        <a href="#menu" class="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-full font-bold text-sm z-10 no-underline hover:bg-white/40 transition">
          ← Back to Menu
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
      <div class="p-5 max-w-3xl mx-auto pb-6 overflow-hidden">

        <!-- 2. History & Origin (CENTERED) -->
        <div class="text-center mb-10 mt-4">
          <h3 class="text-3xl font-display font-bold text-earth mb-3 inline-block border-b-2 border-gold pb-1">History & Origin</h3>
          <p class="text-sm text-leaf font-bold uppercase tracking-widest mb-4 mt-2">${product.history?.origin || ''}</p>
          <p class="text-smoke text-lg leading-relaxed mb-4 font-display italic px-2 max-w-xl mx-auto">
            ${product.history?.summary || ''}
          </p>
        </div>
        
        <!-- FUN FACTS (UP-RIGHT STAGGER) -->
        <div class="w-11/12 md:w-4/5 ml-auto mb-10 p-5 bg-leaf/5 rounded-l-2xl border-r-4 border-leaf shadow-sm relative">
          <div class="absolute -top-4 -right-2 text-leaf/20 text-6xl font-display">”</div>
          <h4 class="text-xl font-bold text-earth mb-3 font-display text-right">Fascinating Details</h4>
          <ul class="fun-fact-list mb-0">
            ${funFactsHtml}
          </ul>
        </div>
        
        <!-- SOCIO-CULTURAL IMPACT (UP-LEFT STAGGER) -->
        <div class="w-11/12 md:w-4/5 mr-auto mb-12 p-5 bg-earth/5 rounded-r-2xl border-l-4 border-earth shadow-sm relative">
          <div class="absolute -top-4 -left-2 text-earth/20 text-6xl font-display">“</div>
          <h4 class="text-xl font-bold text-earth mb-3 font-display text-left">Socio-Cultural Impact</h4>
          <p class="text-smoke text-sm leading-relaxed text-left">${product.history?.impact || ''}</p>
        </div>

        <!-- 3. Cultural Tie & Booth Relevance (CENTERED) -->
        <div class="text-center mb-12">
          <h3 class="text-3xl font-display font-bold text-earth mb-6 inline-block border-b-2 border-gold pb-1">Tabo sa UCLM Relevance</h3>
          <div class="bg-white p-6 rounded-2xl shadow-card border border-gray-100 text-left max-w-2xl mx-auto">
            <p class="text-smoke text-sm leading-relaxed mb-4">
              <strong class="text-earth font-display text-lg block mb-1">Why this dish?</strong> 
              ${product.culturalTie?.boothRelevance || ''}
            </p>
            <hr class="border-gray-100 mb-4">
            <p class="text-smoke text-sm leading-relaxed">
              <strong class="text-earth font-display text-lg block mb-1">Theme Connection:</strong> 
              ${product.culturalTie?.themeConnection || ''}
            </p>
          </div>
        </div>

        <!-- 4. Media & Ingredients (Two-Column) -->
        <div class="media-ingredients-grid mb-12">
          <div class="text-center">
            <h3 class="text-2xl font-display font-bold text-earth mb-4 inline-block border-b-2 border-gold pb-1">Preparation</h3>
            <div class="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-md">
              <iframe width="100%" height="100%" src="${product.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-2xl font-display font-bold text-earth mb-4 inline-block border-b-2 border-gold pb-1">Highland Ingredients</h3>
            <div class="mb-5 flex flex-wrap justify-center gap-2">${ingChips}</div>
            <p class="text-sm text-smoke font-display italic bg-cream-dark p-4 rounded-xl border border-gray-100 shadow-sm">
              "${product.ingredientTheme || ''}"
            </p>
          </div>
        </div>

        <!-- 5. Nutrition Highlights (CENTERED) -->
        <div class="text-center mb-8">
          <h3 class="text-3xl font-display font-bold text-earth mb-4 inline-block border-b-2 border-gold pb-1">Nutrition Facts</h3>
          <div class="mb-4">
            ${product.nutrition?.highlight ? `<div class="nutrition-highlight scale-110 shadow-sm">${product.nutrition.highlight}</div>` : ''}
          </div>
          <div class="nutrition-grid text-left max-w-lg mx-auto">
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.calories || '-'}</div><div class="label">Calories</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.protein || '-'}</div><div class="label">Protein</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.carbs || '-'}</div><div class="label">Carbs</div></div>
            <div class="nutrition-cell shadow-sm"><div class="value">${product.nutrition?.fat || '-'}</div><div class="label">Fat</div></div>
          </div>
        </div>
      </div>

      <!-- 6. Bottom Order CTA -->
      <div class="bottom-order-cta">
        <div class="qty-stepper scale-110 mr-4 shadow-sm">
          <button type="button" onclick="Cart.changeQty('${product.id}', -1); window.renderProductView('${product.id}')">−</button>
          <span>${currentQty}</span>
          <button type="button" onclick="Cart.changeQty('${product.id}', 1); window.renderProductView('${product.id}')">+</button>
        </div>
        <button class="btn btn-primary flex-grow text-lg shadow-md" onclick="if(${currentQty} === 0) Cart.changeQty('${product.id}', 1); window.showToast('Added to cart!', 'success'); window.location.hash = '#menu';">
          ${currentQty === 0 ? `Add to Cart ₱${product.price}` : `Added ₱${product.price * currentQty} - View Menu`}
        </button>
      </div>
    `;
  }
  // Expose globally
  window.renderProductView = renderProductView;

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

  return { init };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', App.init);
