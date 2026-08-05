/**
 * quiz.js — Interactive Personality Quest (V3 - Journey Map)
 * ─────────────────────────────────────────────────────────────────────────────
 * 5-question journey map. Saves result to localStorage.
 * Prevents farming by locking out after completion.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Quiz = (() => {

  const QUIZ_MATRIX = {
    "chill": ["prod-101", "prod-103", "prod-105", "prod-106"],
    "hyped": ["prod-102", "prod-107", "prod-110"],
    "hardcore": ["prod-104", "prod-108", "prod-109"],
    "sweet": ["prod-105", "prod-106", "prod-107"],
    "savory": ["prod-101", "prod-103", "prod-104", "prod-109", "prod-110"],
    "smoky": ["prod-102", "prod-108"],
    "peak": ["prod-103", "prod-104", "prod-107"],
    "river": ["prod-102", "prod-106", "prod-108", "prod-109"],
    "mist": ["prod-101", "prod-105", "prod-110"],
    "weave": ["prod-101", "prod-103", "prod-106"],
    "hunt": ["prod-102", "prod-108", "prod-110"]
  };

  const QUESTIONS = [
    {
      title: "The Basecamp",
      nodeClass: "node-forest",
      bg: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
      text: "You arrive at the edge of the Panay forest. How do you prepare?",
      options: [
        { label: "Observe the wildlife silently.", tags: ["chill", "mist"] },
        { label: "Charge ahead to clear the trail.", tags: ["hyped", "hardcore"] },
        { label: "Forage for sweet berries.", tags: ["sweet"] }
      ]
    },
    {
      title: "The River Crossing",
      nodeClass: "node-river",
      bg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      text: "A cold mountain river blocks your path. What's your move?",
      options: [
        { label: "Find a calm, shallow spot to wade.", tags: ["river", "chill"] },
        { label: "Dive in and swim against the current.", tags: ["hardcore", "hunt"] },
        { label: "Rest by the bank and cook a savory meal.", tags: ["savory", "river"] }
      ]
    },
    {
      title: "The Weaver's Hut",
      nodeClass: "node-mountain",
      bg: "https://images.unsplash.com/photo-1605814522430-e3496c1410f9?w=800&q=80",
      text: "You meet an elder weaving Panubok. She offers you a gift.",
      options: [
        { label: "A brightly colored, sweet-smelling cloth.", tags: ["sweet", "weave"] },
        { label: "A sturdy, earthy-toned hunting sash.", tags: ["savory", "hunt"] },
        { label: "A soft, misty-grey blanket for the cold.", tags: ["mist", "chill"] }
      ]
    },
    {
      title: "The Evening Fire",
      nodeClass: "node-fire",
      bg: "https://images.unsplash.com/photo-1505934333218-8fe21ff88f0c?w=800&q=80",
      text: "Night falls. What do you throw into the communal fire?",
      options: [
        { label: "Dry bamboo for a massive, roaring blaze.", tags: ["hyped", "smoky"] },
        { label: "Slow-burning mahogany for a long, smoky heat.", tags: ["smoky", "chill"] },
        { label: "Sugarcane husks for a sweet, crackling aroma.", tags: ["sweet", "savory"] }
      ]
    },
    {
      title: "The Summit",
      nodeClass: "node-mountain",
      bg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
      text: "You reach the peak at dawn. What calls to your spirit?",
      options: [
        { label: "The roaring wind and endless sky.", tags: ["peak", "hardcore"] },
        { label: "The quiet mist settling in the valleys.", tags: ["mist", "chill"] },
        { label: "The promise of a grand feast upon returning.", tags: ["savory", "hunt"] }
      ]
    }
  ];

  let currentStep = 0; // 0 = Intro, 1-5 = Qs, 6 = Result
  let userTags = [];

  function init() {
    // Anti-Farm Check: if already completed, skip straight to result
    if (localStorage.getItem('quiz_completed_dish')) {
      currentStep = 6;
      userTags = [];
      _renderStep();
      return;
    }

    currentStep = 0;
    userTags = [];
    _renderStep();
  }
  window.initQuiz = init;

  function _renderStep() {
    const wrapper = document.getElementById('quiz-content-wrapper');
    const screen = document.getElementById('quiz-screen');
    if (!wrapper || !screen) return;

    if (currentStep === 0) {
      screen.style.backgroundImage = "url('https://images.unsplash.com/photo-1605814522430-e3496c1410f9?w=1200&q=80')";
      wrapper.innerHTML = `
        <div class="quest-node node-forest">
          <h2 class="drop-shadow-lg">The Spirit Quest</h2>
          <p class="text-lg opacity-90 mb-8 text-shadow-sm">Do you want to know which Panay Bukidnon spirit dwells within your appetite? Embark on this 5-stop journey to discover your soul dish and unlock a special blessing.</p>
          <button class="btn btn-gold btn-lg shadow-lg w-full" onclick="Quiz.nextStep()">Begin the Journey</button>
        </div>
      `;
    } 
    else if (currentStep > 0 && currentStep <= QUESTIONS.length) {
      const q = QUESTIONS[currentStep - 1];
      screen.style.backgroundImage = `url('${q.bg}')`;
      
      const optionsHtml = q.options.map((opt, idx) => `
        <button class="quest-option" onclick="Quiz.answer(${idx})">
          ${opt.label}
        </button>
      `).join('');

      wrapper.innerHTML = `
        <div class="quest-map-container" style="background: transparent; min-height: auto;">
          <div class="quest-path"></div>
          <div class="quest-node ${q.nodeClass}">
            <div class="text-gold text-sm font-bold tracking-widest uppercase mb-2">Waypoint ${currentStep} / ${QUESTIONS.length}</div>
            <h2>${q.title}</h2>
            <p class="text-md opacity-90 mb-6">${q.text}</p>
            <div class="flex flex-col gap-3 relative z-10">
              ${optionsHtml}
            </div>
          </div>
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
    
    let matchedDishId = localStorage.getItem('quiz_completed_dish');
    let isAlreadyTaken = true;
    
    if (!matchedDishId) {
      isAlreadyTaken = false;
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

      matchedDishId = topIds[Math.floor(Math.random() * topIds.length)];
      localStorage.setItem('quiz_completed_dish', matchedDishId);
    }

    const dish = window.PRODUCTS.find(p => p.id === matchedDishId);
    if (!dish) return;

    const voucherCode = `SPIRIT-${matchedDishId.replace('prod-', '')}`;
    localStorage.setItem('active_voucher', voucherCode); // Save for auto-apply

    screen.style.backgroundImage = `url('${dish.image}')`;
    
    let takenBanner = '';
    if (isAlreadyTaken) {
      takenBanner = `<div class="bg-earth/80 text-white p-2 rounded text-xs text-center mb-3 font-bold uppercase tracking-wider border border-white/20">You have already completed the quest!</div>`;
    }

    wrapper.innerHTML = `
      <div class="quest-node node-fire" style="background: rgba(0,0,0,0.8);">
        ${takenBanner}
        <p class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Your Spirit Dish Is</p>
        <h2 class="text-3xl font-display font-bold text-white mb-3">${dish.name}</h2>
        
        <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:160px; object-fit:cover; border-radius:12px; margin-bottom:12px; border: 2px solid var(--color-gold);" />
        
        <p class="text-sm text-gray-300 mb-3 italic font-display">"${dish.quote || dish.description || ''}"</p>

        <div class="text-left bg-white/10 p-3 rounded-lg mb-4 border-l-4 border-gold">
          <p class="text-xs font-bold text-gold uppercase tracking-wide mb-1">Why this dish?</p>
          <p class="text-xs text-gray-200 leading-relaxed">${dish.culturalTie?.themeConnection || dish.culturalNote || ''}</p>
        </div>

        <div class="bg-black/50 border border-gold/30 p-4 rounded-lg mb-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-gold text-dark text-[10px] px-2 py-1 font-bold rounded-bl-lg">AUTO-APPLIED</div>
          <p class="text-xs text-gold uppercase font-bold mb-2">Your Unique Blessing</p>
          <div class="text-xl font-bold tracking-widest text-white mb-1 border-b border-dashed border-gray-600 pb-2">${voucherCode}</div>
          <p class="text-xs text-gray-300 mt-2">This ₱10 discount has been securely saved to your browser and will be automatically applied at checkout!</p>
        </div>

        <button class="btn btn-gold w-full mb-3 shadow-lg" onclick="Router.navigate('#menu')">
          View Online Menu
        </button>
        <button class="btn btn-outline border-gray-500 text-gray-300 w-full hover:bg-gray-800" onclick="Router.navigate('#home')">
          Return Home
        </button>
      </div>
    `;
  }

  function resetQuest() {
    if (confirm('Reset the Spirit Quest? This clears YOUR saved result so you can retake it. Share this option with others so they can reset on their own device before Friday.')) {
      localStorage.removeItem('quiz_completed_dish');
      localStorage.removeItem('active_voucher');
      currentStep = 0;
      userTags = [];
      window.showToast && window.showToast('Quest reset! You can now retake the journey.', 'success');
      // Close sidebar and navigate to quest
      document.getElementById('sidebar-drawer')?.classList.remove('open');
      document.getElementById('sidebar-overlay')?.classList.remove('open');
      window.Router.navigate('#quest');
    }
  }

  return { init, nextStep, answer, resetQuest };
})();

window.Quiz = Quiz;
