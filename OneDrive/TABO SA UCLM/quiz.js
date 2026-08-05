/**
 * quiz.js — Interactive Personality Quest (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-screen flow (Intro -> Q1 -> Q2 -> Q3 -> Result).
 * Saves result to localStorage to prevent abuse.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Quiz = (() => {

  // Scoring matrix: which tags point to which dishes
  const QUIZ_MATRIX = {
    "chill": ["prod-101", "prod-103", "prod-105", "prod-106"],
    "hyped": ["prod-102", "prod-107", "prod-110"],
    "hardcore": ["prod-104", "prod-108", "prod-109"],
    "sweet": ["prod-105", "prod-106", "prod-107"],
    "savory": ["prod-101", "prod-103", "prod-104", "prod-109", "prod-110"],
    "smoky": ["prod-102", "prod-108"],
    "peak": ["prod-103", "prod-104", "prod-107"],
    "river": ["prod-102", "prod-106", "prod-108", "prod-109"],
    "mist": ["prod-101", "prod-105", "prod-110"]
  };

  const QUESTIONS = [
    {
      title: "The Mountain's Call",
      bg: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
      text: "How do you approach a steep, misty trail?",
      options: [
        { label: "Take it slow, absorb the calm.", tags: ["chill"] },
        { label: "Run up! I thrive on the energy.", tags: ["hyped"] },
        { label: "I take the hardest, unpaved path.", tags: ["hardcore"] }
      ]
    },
    {
      title: "The Bountiful Harvest",
      bg: "https://images.unsplash.com/photo-1505934333218-8fe21ff88f0c?w=800&q=80",
      text: "After a long day in the rice terraces, what do you crave?",
      options: [
        { label: "Something sugary to reward myself.", tags: ["sweet"] },
        { label: "A heavy, meaty, comforting meal.", tags: ["savory"] },
        { label: "Fire-roasted flavors, bold and sharp.", tags: ["smoky"] }
      ]
    },
    {
      title: "The Ancestral Domain",
      bg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      text: "Where does your spirit feel most at peace?",
      options: [
        { label: "At the very peak, touching the sky.", tags: ["peak"] },
        { label: "By the rushing, cold river waters.", tags: ["river"] },
        { label: "Wrapped in the thick morning mist.", tags: ["mist"] }
      ]
    }
  ];

  let currentStep = 0; // 0 = Intro, 1-3 = Qs, 4 = Result
  let userTags = [];

  function init() {
    currentStep = 0;
    userTags = [];
    _renderStep();
  }
  // Expose globally for router
  window.initQuiz = init;

  function _renderStep() {
    const wrapper = document.getElementById('quiz-content-wrapper');
    const screen = document.getElementById('quiz-screen');
    if (!wrapper || !screen) return;

    if (currentStep === 0) {
      screen.style.backgroundImage = "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80')";
      wrapper.innerHTML = `
        <h2 class="text-4xl font-display font-bold mb-4 drop-shadow-lg">The Spirit Quest</h2>
        <p class="text-lg opacity-90 mb-8 px-4 text-shadow-sm">Do you want to know which Panay Bukidnon spirit dwells within your appetite? Take the quest to discover your soul dish and unlock a special blessing.</p>
        <button class="btn btn-gold btn-lg shadow-lg" onclick="Quiz.nextStep()">Begin the Quest</button>
      `;
    } 
    else if (currentStep > 0 && currentStep <= QUESTIONS.length) {
      const q = QUESTIONS[currentStep - 1];
      screen.style.backgroundImage = `url('${q.bg}')`;
      
      const optionsHtml = q.options.map((opt, idx) => `
        <button class="quiz-option" onclick="Quiz.answer(${idx})">
          <span class="text-xl opacity-70">✦</span>
          <span>${opt.label}</span>
        </button>
      `).join('');

      wrapper.innerHTML = `
        <div class="text-gold text-sm font-bold tracking-widest uppercase mb-2">Question ${currentStep} of ${QUESTIONS.length}</div>
        <h2 class="text-3xl font-display font-bold mb-2 text-white drop-shadow-xl" style="text-shadow: 0 2px 12px rgba(0,0,0,0.8)">${q.title}</h2>
        <p class="text-md opacity-90 mb-8 px-4" style="text-shadow: 0 1px 6px rgba(0,0,0,0.7)">${q.text}</p>
        <div class="flex flex-col gap-3">
          ${optionsHtml}
        </div>
      `;
    }
    else {
      _calculateAndRenderResult();
    }
  }

  function nextStep() {
    currentStep++;
    _renderStep();
  }

  function answer(optionIdx) {
    const q = QUESTIONS[currentStep - 1];
    userTags.push(...q.options[optionIdx].tags);
    nextStep();
  }

  function _calculateAndRenderResult() {
    const wrapper = document.getElementById('quiz-content-wrapper');
    const screen = document.getElementById('quiz-screen');
    
    // Lock logic: Check if user already completed the quiz before
    let matchedDishId = localStorage.getItem('quiz_completed_dish');
    
    if (!matchedDishId) {
      // Calculate scores
      const scores = {};
      window.PRODUCTS.forEach(p => scores[p.id] = 0);

      userTags.forEach(tag => {
        if (QUIZ_MATRIX[tag]) {
          QUIZ_MATRIX[tag].forEach(pid => scores[pid]++);
        }
      });

      let topScore = -1;
      let topIds = [];
      for (const [pid, score] of Object.entries(scores)) {
        if (score > topScore) { topScore = score; topIds = [pid]; }
        else if (score === topScore) { topIds.push(pid); }
      }

      // Tie breaker
      matchedDishId = topIds[Math.floor(Math.random() * topIds.length)];
      
      // Save lock
      localStorage.setItem('quiz_completed_dish', matchedDishId);
    }

    const dish = window.PRODUCTS.find(p => p.id === matchedDishId);
    if (!dish) return; // safety

    const voucherCode = `SPIRIT-${matchedDishId.replace('prod-', '')}`;

    screen.style.backgroundImage = `url('${dish.image}')`;
    wrapper.innerHTML = `
      <div class="result-card animate-slide-up">
        <p class="text-earth text-xs font-bold uppercase tracking-widest mb-1">Your Spirit Dish Is</p>
        <h2 class="text-3xl font-display font-bold text-earth mb-3">${dish.name}</h2>
        
        <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:160px; object-fit:cover; border-radius:12px; margin-bottom:12px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);" />
        
        <p class="text-sm text-smoke mb-3 italic font-display">"${dish.quote || dish.description || ''}"
        </p>

        <div class="text-left bg-earth/5 p-3 rounded-lg mb-4 border-l-3 border-earth" style="border-left: 3px solid var(--color-earth);">
          <p class="text-xs font-bold text-earth uppercase tracking-wide mb-1">Why this dish?</p>
          <p class="text-xs text-smoke leading-relaxed">${dish.culturalTie?.themeConnection || dish.culturalNote || ''}</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
          <p class="text-xs text-smoke uppercase font-bold mb-2">Your Unique Blessing</p>
          <div class="badge-voucher mb-2">${voucherCode}</div>
          <p class="text-xs text-smoke">Use this code at checkout to get ₱10 off <b>${dish.name}</b>!</p>
          <p class="text-[10px] text-gray-400 mt-1">* Bound to your device. Cannot be transferred.</p>
        </div>

        <button class="btn btn-primary btn-full mb-3" onclick="Cart.changeQty('${dish.id}', 1); Router.navigate('#menu'); showToast('Added to cart!', 'success');">
          Claim &amp; View Menu
        </button>
        <button class="btn btn-outline btn-full" onclick="Router.navigate('#home')">
          Return Home
        </button>
      </div>
    `;
  }

  return { init, nextStep, answer };
})();

window.Quiz = Quiz;
