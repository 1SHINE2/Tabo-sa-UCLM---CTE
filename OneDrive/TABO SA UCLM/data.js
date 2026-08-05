/**
 * data.js — Tabo sa UCLM Product Data (V3)
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete layout structure overhaul (V3 Schema) for Panay Bukidnon booth.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PRODUCTS = [
  {
    id: "prod-101",
    name: "Tinuom na Manok",
    price: 85,
    quote: "Tender native chicken steamed inside banana leaves with fresh herbs — a fragrant highland embrace in every bite.",
    history: {
      origin: "Cabatuan, Iloilo & Central Panay Highlands",
      summary: "Historically created by highland hunters using native chicken wrapped in banana leaves and slow-steamed over embers without metal pots.",
      funFacts: [
        "The banana leaf seal traps 100% of the natural chicken juices, acting like an ancient pressure cooker.",
        "Traditional cooks test doneness purely by smelling the aroma released through the steamed leaves."
      ],
      impact: "Serves as a staple for Sunday family gatherings and community celebrations, symbolizing warmth and hospitality."
    },
    culturalTie: {
      boothRelevance: "Featured in our Tabo sa UCLM booth as the flagship protein dish representing indigenous Visayan steam-cooking techniques.",
      themeConnection: "Reflects the Panay Bukidnon value of living in harmony with the environment by utilizing biodegradable banana leaves as natural cooking vessels."
    },
    ingredients: [
      "Native free-range chicken",
      "Fresh lemongrass",
      "Wild ginger",
      "Onion leeks",
      "Banana leaf wrapper",
      "Highland salt & peppercorns"
    ],
    ingredientTheme: "Utilizing banana leaves as a natural steaming vessel preserves eco-friendly ancestral practices.",
    nutrition: {
      calories: 280,
      carbs: "8g",
      protein: "32g",
      fat: "12g",
      highlight: "High Protein Core"
    },
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["chill", "savory", "mist"]
  },
  {
    id: "prod-102",
    name: "Kinalan na Isda",
    price: 75,
    quote: "Fresh mountain river fish roasted over open coals, infused with wild ginger and calamansi zest.",
    history: {
      origin: "Jalaur River systems, Central Panay",
      summary: "Before commercial markets reached Central Panay, river fishing was a primary protein source for inland settlement communities. Kinalan focuses on preserving the fish's natural freshwater flavor.",
      funFacts: [
        "Calamansi was traditionally squeezed directly onto the coals to create an aromatic, citrus-infused smoke.",
        "The fish is rarely scaled before grilling; the scales act as a protective barrier against the intense heat."
      ],
      impact: "Strengthens community bonds as roasting is often done collectively by the riverbanks after a successful day's catch."
    },
    culturalTie: {
      boothRelevance: "Demonstrates the simplicity and purity of indigenous Panay cooking, relying on fire and wild citrus.",
      themeConnection: "River fish harvested from clean mountain streams symbolizes purity and respect for nature's water spirits (Murokpok)."
    },
    ingredients: [
      "Fresh river fish",
      "Wild ginger (Luya-luya)",
      "Calamansi",
      "Highland sea salt",
      "Banana leaf wrap"
    ],
    ingredientTheme: "Wild Luya-luya neutralizes any muddy taste while providing potent anti-inflammatory benefits.",
    nutrition: {
      calories: 210,
      carbs: "2g",
      protein: "28g",
      fat: "9g",
      highlight: "Lean & Heart-Healthy"
    },
    image: "https://images.unsplash.com/photo-1594041680534-e8c8cde561cb?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hyped", "smoky", "river"]
  },
  {
    id: "prod-103",
    name: "Linapot na Kan-on",
    price: 30,
    quote: "Fragrant heirloom mountain rice wrapped in fresh katmon leaves, giving off a subtle herbal aroma.",
    history: {
      origin: "Bukidnon Mountain Terraces",
      summary: "Wrapping rice in Katmon leaves preserved it against spoilage during long mountain treks across Panay. It is the ultimate portable food for highland farmers.",
      funFacts: [
        "Katmon leaves impart a slightly sour, citrusy aroma that acts as a natural appetite stimulant.",
        "Heirloom red rice takes nearly twice as long to mature, but offers double the fiber of lowland white rice."
      ],
      impact: "Serves as the vital energy source for arduous labor and travel, connecting the farmer directly to the soil."
    },
    culturalTie: {
      boothRelevance: "Acts as the foundation of our booth's meals, elevating standard rice into a culturally rich experience.",
      themeConnection: "Heirloom rice varieties are preserved through generations using ancestral seeds cultivated without chemical additives, reflecting ancestral wisdom."
    },
    ingredients: [
      "Heirloom highland red rice",
      "Katmon leaves",
      "Spring water"
    ],
    ingredientTheme: "Katmon leaves are renowned in indigenous medicine for their antibacterial properties, extending the rice's shelf life naturally.",
    nutrition: {
      calories: 220,
      carbs: "45g",
      protein: "4g",
      fat: "1g",
      highlight: "Rich in Complex Carbs"
    },
    image: "https://images.unsplash.com/photo-1621245842817-21a41ff77f3f?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["chill", "savory", "peak"]
  },
  {
    id: "prod-104",
    name: "Kanto Kadios",
    price: 90,
    quote: "Hearty black bean stew slow-simmered with smoked pork knuckle and sour batwan fruit.",
    history: {
      origin: "Iloilo-Bukidnon Trading Routes",
      summary: "A staple in Western Visayas culture, this combination has fed highland families for generations. Kadios (pigeon peas) thrive even during tough highland dry seasons.",
      funFacts: [
        "Batwan fruit gives the stew a clean, non-astringent sourness that tamarind simply cannot replicate.",
        "The deep purple hue of the broth comes naturally from the skins of the kadios beans."
      ],
      impact: "The dish is a classic centerpiece at large family reunions, famously tasting even better the day after it is cooked."
    },
    culturalTie: {
      boothRelevance: "Showcases the iconic 'Ilonggo Trinity' of ingredients (Kadios, Baboy, Langka/Batwan) in an authentic, uncompromised form.",
      themeConnection: "Batwan, a native souring fruit endemic to Western Visayas, gives this dish its distinct indigenous acidity and geographical identity."
    },
    ingredients: [
      "Kadios (Pigeon peas)",
      "Smoked pork knuckle",
      "Batwan fruit",
      "Sweet potato tops"
    ],
    ingredientTheme: "Kadios represents agricultural resilience, surviving and yielding pods even during severe dry spells.",
    nutrition: {
      calories: 340,
      carbs: "24g",
      protein: "26g",
      fat: "16g",
      highlight: "High Fiber & Protein"
    },
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hardcore", "savory", "peak"]
  },
  {
    id: "prod-105",
    name: "Binagol sa Puraw",
    price: 50,
    quote: "Sweetened taro root mash infused with coconut cream and brown sugar, baked inside a coconut shell.",
    history: {
      origin: "Eastern & Central Visayas",
      summary: "Taro root cultivated in cool mountain soil yields a velvety texture unmatched by lowland varieties. Binagol is served during thanksgiving rituals celebrating rich root-crop harvests.",
      funFacts: [
        "The dish is traditionally buried in hot ashes to bake evenly from all sides.",
        "The 'bagol' (coconut shell) acts as a natural, biodegradable ramekin."
      ],
      impact: "A festive delicacy that rewards the community's hard labor during the intense planting season."
    },
    culturalTie: {
      boothRelevance: "Brings a traditional, visually striking dessert to the menu, honoring the root-crop agriculture of the highlands.",
      themeConnection: "Muscovado sugar reflects the traditional zero-waste sugarcane processing methods of Visayan farmers."
    },
    ingredients: [
      "Highland taro (Gabi)",
      "Fresh coconut cream",
      "Muscovado sugar",
      "Condensed milk"
    ],
    ingredientTheme: "Coconut shells used for baking infuses a subtle woody, toasted aroma into the sweet taro.",
    nutrition: {
      calories: 310,
      carbs: "52g",
      protein: "3g",
      fat: "11g",
      highlight: "Energy Dense Sweet"
    },
    image: "https://images.unsplash.com/photo-1605333555298-500e57201389?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["chill", "sweet", "mist"]
  },
  {
    id: "prod-106",
    name: "Bayaboy Sweet Soup",
    price: 45,
    quote: "Comforting sweet coconut soup filled with soft sticky rice balls, jackfruit, and purple yam.",
    history: {
      origin: "Panay Bukidnon Highlands",
      summary: "A highland variant of Ginataan enjoyed during cool misty afternoons in Central Panay. It is shared in communal bowls during gatherings to strengthen ties among neighbors.",
      funFacts: [
        "The sticky rice balls (bilo-bilo) symbolize families sticking together through hardship.",
        "Traditionally eaten on Friday afternoons as a communal end-of-week reward."
      ],
      impact: "Fosters community harmony and unity through the act of sharing a massive, communal pot."
    },
    culturalTie: {
      boothRelevance: "Offers a warm, nostalgic comfort food that directly contrasts the savory, heavy smoked meats.",
      themeConnection: "Wild jackfruit gathered from mountain fringes adds natural sweetness without relying entirely on refined colonial sugar."
    },
    ingredients: [
      "Glutinous rice flour",
      "Coconut milk",
      "Ripe jackfruit (Langka)",
      "Purple yam (Ube)",
      "Tapioca pearls"
    ],
    ingredientTheme: "Purple yam (Ube) gives the soup its vibrant, royal hue, turning a simple dish into a celebratory visual feast.",
    nutrition: {
      calories: 290,
      carbs: "48g",
      protein: "3g",
      fat: "10g",
      highlight: "Rich Comfort Bowl"
    },
    image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["chill", "sweet", "river"]
  },
  {
    id: "prod-107",
    name: "Inasor sa Sugba",
    price: 95,
    quote: "Skewered marinated pork belly grilled over glowing wood charcoal with local annatto oil glaze.",
    history: {
      origin: "Visayan Coast to Highland Trails",
      summary: "Open-fire skewers were traditionally cooked during Panaad festivals and gathering ceremonies. Grilling over open wood coals brings out festive flavors essential for Panay celebrations.",
      funFacts: [
        "The marinade uses absolutely no soy sauce; the deep color comes entirely from the annatto seeds.",
        "Bamboo skewers were historically whittled on the spot by hunters while waiting for the fire to mature."
      ],
      impact: "The smoke signals the start of a festival, drawing villagers together from miles around."
    },
    culturalTie: {
      boothRelevance: "Provides an instantly recognizable, highly aromatic street-food element that draws attendees to the booth.",
      themeConnection: "Natural annatto oil provides a vibrant red hue directly inspired by traditional Panubok embroidery dyes."
    },
    ingredients: [
      "Pork belly",
      "Annatto seed oil (Asuete)",
      "Native vinegar",
      "Garlic & lemongrass"
    ],
    ingredientTheme: "Asuete (Annatto) is deeply tied to Panay Bukidnon culture, used historically for both culinary flavor and vibrant textile dyeing.",
    nutrition: {
      calories: 410,
      carbs: "4g",
      protein: "22g",
      fat: "34g",
      highlight: "High Fat Keto"
    },
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hyped", "sweet", "peak"]
  },
  {
    id: "prod-108",
    name: "Lutlot na Bamboo Pork",
    price: 110,
    quote: "Pork belly slow-cooked inside bamboo tubes over open flames, locking in woodsy steam and rich fat.",
    history: {
      origin: "Deep Panay Jungles",
      summary: "Mastered by indigenous peoples across Panay, bamboo cooking preserved moisture during long jungle expeditions. Lutlot is an ancient indigenous cooking method requiring no pots, relying solely on natural forest materials.",
      funFacts: [
        "Green, freshly cut bamboo is essential—dry bamboo would simply burn instead of steaming the food.",
        "The bamboo internode imparts a distinct, sweet, earthy flavor into the pork fat."
      ],
      impact: "Showcases the supreme resourcefulness of the Bukidnon, demonstrating culinary mastery over wild environments."
    },
    culturalTie: {
      boothRelevance: "Serves as the pinnacle of indigenous cooking demonstrations for our grading criteria.",
      themeConnection: "Cooking inside fresh green bamboo stems (Lutlot) represents a flawless symbiosis between the hunter and the forest."
    },
    ingredients: [
      "Pork belly cubes",
      "Fresh bamboo tube",
      "Ginger & lemongrass",
      "Wild garlic",
      "Chili peppers"
    ],
    ingredientTheme: "Fresh bamboo not only acts as a pot but dynamically flavors the meat as its internal moisture turns to steam.",
    nutrition: {
      calories: 380,
      carbs: "3g",
      protein: "28g",
      fat: "29g",
      highlight: "Rich Ancestral Protein"
    },
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hardcore", "smoky", "river"]
  },
  {
    id: "prod-109",
    name: "Pinagba na Utan",
    price: 60,
    quote: "A medley of highland root vegetables and indigenous leafy greens stewed in light ginger broth.",
    history: {
      origin: "Bukidnon Backyard Farms",
      summary: "Daily nourishment for highland families, highlighting the natural flavors of freshly picked produce. Embodying zero-waste sustainability, every part of the harvested vegetable is utilized.",
      funFacts: [
        "Taro leaves must be cooked perfectly; undercooked leaves contain calcium oxalate crystals that cause an itchy throat.",
        "The broth is never boiled vigorously, only gently simmered to keep the vegetables intact."
      ],
      impact: "The backbone of daily sustenance, reflecting the quiet, enduring lifestyle of the highland farmer."
    },
    culturalTie: {
      boothRelevance: "Provides a strictly vegetarian option that stays 100% true to the indigenous dietary staples.",
      themeConnection: "Freshly harvested mountain greens supply vital nutrients harvested straight from backyard highland gardens, reinforcing sustainable living."
    },
    ingredients: [
      "Squash",
      "Taro leaves",
      "Okra",
      "Eggplant",
      "Ginger broth"
    ],
    ingredientTheme: "Taro leaves and roots demonstrate the indigenous philosophy of full-plant utilization.",
    nutrition: {
      calories: 140,
      carbs: "22g",
      protein: "4g",
      fat: "2g",
      highlight: "Low Calorie Vegan"
    },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hardcore", "savory", "river"]
  },
  {
    id: "prod-110",
    name: "Buntog Tea & Herbs",
    price: 35,
    quote: "Invigorating hot herbal tea steeped from wild mountain lemongrass, pandan leaves, and honey.",
    history: {
      origin: "Panay Bukidnon Highlands",
      summary: "Traditional herbal infusions have been used by Panay Bukidnon elders to warm the body in chilly mountain altitudes. Offered to guests upon arriving at highland homes as a gesture of hospitality.",
      funFacts: [
        "Pandan leaves are tied into neat knots before boiling to release maximum aromatic oils.",
        "Wild honey hunters in Panay track bees by observing flight paths near watering holes."
      ],
      impact: "Acts as a social unifier and natural medicine, cementing the bond between host and visitor."
    },
    culturalTie: {
      boothRelevance: "The perfect authentic beverage to wash down our rich, smoky meat dishes.",
      themeConnection: "Wild mountain lemongrass and raw honey serve as natural restorative remedies in highland culture, showcasing indigenous medicinal knowledge."
    },
    ingredients: [
      "Wild lemongrass",
      "Fresh pandan leaves",
      "Wild forest honey",
      "Mountain spring water"
    ],
    ingredientTheme: "Wild forest honey embodies the untamed richness of the mountains, gathered sustainably by indigenous honey-hunters.",
    nutrition: {
      calories: 60,
      carbs: "15g",
      protein: "0g",
      fat: "0g",
      highlight: "Light Hydration"
    },
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hyped", "savory", "mist"]
  }
];

// Make available globally for all modules
if (typeof window !== "undefined") window.PRODUCTS = PRODUCTS;
