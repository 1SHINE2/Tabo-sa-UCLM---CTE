/**
 * router.js — Hash-Based Client-Side Router (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles URL hash changes to show/hide view sections without a page reload.
 *
 * Supported routes:
 *   ""  / "#home"    → Homepage (Gallery & Culture)
 *   "#quest"         → Interactive Personality Quiz
 *   "#menu"          → Online Shopping (Grid & Search)
 *   "#prod-{id}"     → Standalone Product Detail view
 *   "#cashier"       → Cashier POS mode (PIN protected)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Router = (() => {

  // All top-level view section IDs
  const ALL_VIEWS = ['view-home', 'view-quest', 'view-menu', 'view-product', 'view-cashier', 'view-receipt', 'view-gallery'];

  /**
   * Hide all view sections, then reveal the requested one.
   * @param {string} viewId - The ID of the section to show (without #)
   */
  function showView(viewId) {
    ALL_VIEWS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('active');
        el.classList.add('hidden');
      }
    });

    const target = document.getElementById(viewId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
      // Scroll to top of new view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.warn(`[Router] View not found: #${viewId} — falling back to home`);
      showView('view-home');
    }

    // Always close sidebar on navigation
    if (typeof window.closeSidebar === 'function') {
      window.closeSidebar();
    }

    // Toggle Cart Bar visibility (only show on Online Menu)
    const cartBar = document.getElementById('cart-bar');
    if (cartBar) {
      if (viewId === 'view-menu') {
        cartBar.classList.remove('route-hidden');
      } else {
        cartBar.classList.add('route-hidden');
      }
    }
  }

  /**
   * Parse the current URL hash and route accordingly.
   */
  function route() {
    const hash = window.location.hash || '';

    if (!hash || hash === '#home') {
      showView('view-home');
      return;
    }

    if (hash === '#quest') {
      showView('view-quest');
      // Reset quiz to screen 1 on entry
      if (typeof window.initQuiz === 'function') window.initQuiz();
      return;
    }

    if (hash === '#menu') {
      showView('view-menu');
      return;
    }

    if (hash === '#gallery') {
      showView('view-gallery');
      return;
    }

    if (hash.startsWith('#gallery-')) {
      showView('view-gallery');
      const titleMap = {
        '#gallery-highlands': 'The Highlands',
        '#gallery-traditions': 'Panubok Traditions',
        '#gallery-tabo': 'Tabo sa UCLM'
      };
      const imgMap = {
        '#gallery-highlands': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
        '#gallery-traditions': 'https://images.unsplash.com/photo-1605814522430-e3496c1410f9?w=800&q=80',
        '#gallery-tabo': 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80'
      };
      const titleEl = document.getElementById('gallery-title');
      const imgEl = document.getElementById('gallery-image');
      if (titleEl) titleEl.innerText = titleMap[hash] || 'Cultural Heritage';
      if (imgEl) imgEl.src = imgMap[hash] || '';
      return;
    }

    if (hash.startsWith('#prod-')) {
      const productId = hash.slice(1); // e.g. "prod-101"
      showView('view-product');
      // Delegate rendering to app.js
      if (typeof window.renderProductView === 'function') {
        window.renderProductView(productId);
      }
      return;
    }

    if (hash === '#cashier') {
      showView('view-cashier');
      // Delegate PIN gate to cashier.js
      if (typeof window.initCashierGate === 'function') {
        window.initCashierGate();
      }
      return;
    }

    // Unknown hash — go home
    console.warn(`[Router] Unknown route: ${hash}`);
    showView('view-home');
  }

  /**
   * Navigate programmatically to a hash route.
   * @param {string} hash - e.g. "#menu", "#prod-101", "#cashier"
   */
  function navigate(hash) {
    window.location.hash = hash;
  }

  /**
   * Initialize the router. Call once on DOMContentLoaded.
   */
  function init() {
    // Route on first load
    route();
    // Re-route on every hash change (browser back/forward, QR links, manual navigation)
    window.addEventListener('hashchange', route);
  }

  // Public API
  return { init, navigate, route, showView };
})();

window.Router = Router;
