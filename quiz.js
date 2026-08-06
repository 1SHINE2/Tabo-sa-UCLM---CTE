/**
 * quiz.js — Interactive Personality Quest (V3 - Journey Map)
 * ─────────────────────────────────────────────────────────────────────────────
 * 5-question journey map. Saves result to localStorage.
 * Prevents farming by locking out after completion.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Quiz = (() => {

  const QUIZ_MATRIX = {
    "chill": ["prod-003", "prod-004", "prod-011"],
    "hyped": ["prod-005", "prod-007", "prod-011"],
    "hardcore": ["prod-008", "prod-009"],
    "sweet": ["prod-001", "prod-002", "prod-003", "prod-006", "prod-007", "prod-010"],
    "savory": ["prod-001", "prod-004", "prod-005"],
    "smoky": ["prod-008", "prod-009"],
    "peak": ["prod-004", "prod-008", "prod-011"],
    "river": ["prod-002", "prod-006"],
    "mist": ["prod-003", "prod-010", "prod-011"],
    "weave": ["prod-001", "prod-006"],
    "hunt": ["prod-009", "prod-010"]
  };

  const QUESTIONS = [
    {
      title: "Ang Kampo",
      nodeClass: "node-forest",
      bg: "Madjaas.jpg",
      text: "Nakarating ka sa gilid ng gubat ng Panay. Paano ka maghahanda?",
      options: [
        { label: "Tahimik na pagmasdan ang mga hayop.", tags: ["chill", "mist"] },
        { label: "Diretsong maglakad upang linisin ang daan.", tags: ["hyped", "hardcore"] },
        { label: "Maghanap ng matatamis na prutas.", tags: ["sweet"] }
      ]
    },
    {
      title: "Ang Pagtawid sa Ilog",
      nodeClass: "node-river",
      bg: "Binanog - dance.jpg",
      text: "Isang malamig na ilog mula sa bundok ang humarang sa iyong daan. Ano ang gagawin mo?",
      options: [
        { label: "Maghanap ng mababaw at kalmadong bahagi upang maglakad.", tags: ["river", "chill"] },
        { label: "Tumalon at lumangoy salungat sa agos.", tags: ["hardcore", "hunt"] },
        { label: "Magpahinga sa pampang at magluto ng masarap na pagkain.", tags: ["savory", "river"] }
      ]
    },
    {
      title: "Kubo ng Manghahabi",
      nodeClass: "node-mountain",
      bg: "weaving.jpg",
      text: "Nakatagpo mo ang isang matanda na naghahabi ng Panubok. Inalok ka niya ng regalo.",
      options: [
        { label: "Isang makulay at mabangong tela.", tags: ["sweet", "weave"] },
        { label: "Isang matibay na sinturon para sa pangangaso.", tags: ["savory", "hunt"] },
        { label: "Isang malambot na kumot para sa lamig.", tags: ["mist", "chill"] }
      ]
    },
    {
      title: "Ang Apoy sa Gabi",
      nodeClass: "node-fire",
      bg: "the evening fire.jpg",
      text: "Sumapit na ang gabi. Ano ang ihuhulog mo sa apoy ng komunidad?",
      options: [
        { label: "Tuyong kawayan para sa malaking apoy.", tags: ["hyped", "smoky"] },
        { label: "Matigas na kahoy para sa matagal at mausok na init.", tags: ["smoky", "chill"] },
        { label: "Tubo (sugarcane) para sa matamis na amoy.", tags: ["sweet", "savory"] }
      ]
    },
    {
      title: "Ang Tuktok",
      nodeClass: "node-mountain",
      bg: "Madjaas.jpg",
      text: "Nakarating ka sa tuktok bago mag-umaga. Ano ang tumatawag sa iyong espiritu?",
      options: [
        { label: "Ang malakas na hangin at walang hanggang langit.", tags: ["peak", "hardcore"] },
        { label: "Ang tahimik na hamog na bumababa sa lambak.", tags: ["mist", "chill"] },
        { label: "Ang pangako ng isang malaking piging pag-uwi.", tags: ["savory", "hunt"] }
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
      screen.style.backgroundImage = "url('Madjaas.jpg')";
      wrapper.innerHTML = `
        <div class="quest-node node-forest">
          <h2 class="drop-shadow-lg">Ang Pagsasaliksik ng Espiritu</h2>
          <p class="text-lg opacity-90 mb-8 text-shadow-sm">Gusto mo bang malaman kung aling espiritu ng Panay Bukidnon ang nananahan sa iyong panlasa? Simulan ang paglalakbay na ito upang tuklasin ang iyong 'soul dish' at makakuha ng espesyal na biyaya.</p>
          <button class="btn btn-gold btn-lg shadow-lg w-full" onclick="Quiz.nextStep()">Simulan ang Paglalakbay</button>
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
            <div class="text-gold text-sm font-bold tracking-widest uppercase mb-2">Hakbang ${currentStep} / ${QUESTIONS.length}</div>
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

    // Use the global TABO10 voucher instead of a dynamic SPIRIT one
    const voucherCode = 'TABO10';
    localStorage.setItem('active_voucher', voucherCode); // Save for auto-apply

    screen.style.backgroundImage = `url('${dish.image}')`;
    
    let takenBanner = '';
    if (isAlreadyTaken) {
      takenBanner = `<div class="bg-earth/80 text-white p-2 rounded text-xs text-center mb-3 font-bold uppercase tracking-wider border border-white/20">Tapos mo na ang pagsasaliksik!</div>`;
    }

    wrapper.innerHTML = `
      <div class="quest-node node-fire" style="background: rgba(0,0,0,0.8);">
        ${takenBanner}
        <p class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Ang Iyong Espirituwal na Putahe ay</p>
        <h2 class="text-3xl font-display font-bold text-white mb-3">${dish.name}</h2>
        
        <img src="${dish.image}" alt="${dish.name}" style="width:100%; height:160px; object-fit:cover; border-radius:12px; margin-bottom:12px; border: 2px solid var(--color-gold);" />
        
        <p class="text-sm text-gray-300 mb-3 italic font-display">"${dish.quote || dish.description || ''}"</p>

        <div class="text-left bg-white/10 p-3 rounded-lg mb-4 border-l-4 border-gold">
          <p class="text-xs font-bold text-gold uppercase tracking-wide mb-1">Bakit ito ang iyong putahe?</p>
          <p class="text-xs text-gray-200 leading-relaxed">${dish.culturalTie?.themeConnection || dish.culturalNote || ''}</p>
        </div>

        <div class="bg-black/50 border border-gold/30 p-4 rounded-lg mb-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-gold text-dark text-[10px] px-2 py-1 font-bold rounded-bl-lg">AWTO-APLIKADO</div>
          <p class="text-xs text-gold uppercase font-bold mb-2">Ang Iyong Natatanging Biyaya</p>
          <div class="text-xl font-bold tracking-widest text-white mb-1 border-b border-dashed border-gray-600 pb-2">${voucherCode}</div>
          <p class="text-xs text-gray-300 mt-2">Ang 10% diskwento na ito ay awtomatikong ilalapat kapag umabot ng ₱50 ang iyong order!</p>
        </div>

        <button class="btn btn-gold w-full mb-3 shadow-lg" onclick="Router.navigate('#menu')">
          Tingnan ang Online Menu
        </button>
        <button class="btn btn-outline border-gray-500 text-gray-300 w-full hover:bg-gray-800" onclick="Router.navigate('#home')">
          Bumalik sa Simula
        </button>
      </div>
    `;
  }

  function resetQuest() {
    if (confirm('I-reset ang Pagsasaliksik? Mabubura nito ang iyong nakaraang resulta. Gusto mo bang magpatuloy?')) {
      localStorage.removeItem('quiz_completed_dish');
      localStorage.removeItem('active_voucher');
      currentStep = 0;
      userTags = [];
      window.showToast && window.showToast('Na-reset na! Maaari ka nang magsimula muli.', 'success');
      // Close sidebar and navigate to quest
      document.getElementById('sidebar-drawer')?.classList.remove('open');
      document.getElementById('sidebar-overlay')?.classList.remove('open');
      window.Router.navigate('#quest');
    }
  }

  return { init, nextStep, answer, resetQuest };
})();

window.Quiz = Quiz;
