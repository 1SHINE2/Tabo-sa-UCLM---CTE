/**
 * data.js — Tabo sa UCLM Product Data (V3.1)
 * ─────────────────────────────────────────────────────────────────────────────
 * Added: sugar, fiber to nutrition; highlightDescription; ingredientDescriptions
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
    ingredientDescriptions: {
      "Native free-range chicken": "Raised in open highland farms — leaner, more flavorful, and richer in Omega-3 than commercial breeds.",
      "Fresh lemongrass": "Aromatic highland stalk prized for its citrusy fragrance and natural antibacterial properties.",
      "Wild ginger": "Foraged ginger (Luya-luya) with a sharper, more pungent flavor than cultivated varieties.",
      "Onion leeks": "Mild, sweet allium used in highland cooking for depth of flavor without overpowering the chicken.",
      "Banana leaf wrapper": "The natural cooking vessel — seals in steam and imparts a light herbal, earthy aroma to the meat.",
      "Highland salt & peppercorns": "Unrefined mineral-rich salt paired with native cracked peppercorns for authentic seasoning."
    },
    ingredientTheme: "Utilizing banana leaves as a natural steaming vessel preserves eco-friendly ancestral practices.",
    nutrition: {
      calories: 280,
      carbs: "8g",
      protein: "32g",
      fat: "12g",
      sugar: "1g",
      fiber: "0g",
      highlight: "High Protein Core",
      highlightDescription: "Exceptional lean protein from native free-range chicken makes this dish an ideal post-activity recovery meal, supporting muscle repair and sustained energy."
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
    ingredientDescriptions: {
      "Fresh river fish": "Caught from the Jalaur River — firm, clean flesh with a naturally mild, sweet flavor.",
      "Wild ginger (Luya-luya)": "Smaller and more pungent than commercial ginger; neutralizes fishy odors and aids digestion.",
      "Calamansi": "Philippine lime — squeezed for citric acid brightness that cuts through the richness of grilled fish.",
      "Highland sea salt": "Mineral-rich, unprocessed salt that enhances without masking the fish's natural sweetness.",
      "Banana leaf wrap": "Used as a grilling barrier to prevent the fish from sticking while adding a subtle herbal aroma."
    },
    ingredientTheme: "Wild Luya-luya neutralizes any muddy taste while providing potent anti-inflammatory benefits.",
    nutrition: {
      calories: 210,
      carbs: "2g",
      protein: "28g",
      fat: "9g",
      sugar: "0g",
      fiber: "0g",
      highlight: "Lean & Heart-Healthy",
      highlightDescription: "Low in saturated fat and rich in Omega-3 fatty acids from river fish, this dish actively supports cardiovascular health and keeps cholesterol levels balanced."
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
    ingredientDescriptions: {
      "Heirloom highland red rice": "An ancient, unmodified rice variety with a nutty flavor, deep red bran, and a lower glycemic index than white rice.",
      "Katmon leaves": "Indigenous leaves with natural antimicrobial properties, used to wrap and preserve rice during long highland journeys.",
      "Spring water": "Pure mountain spring water, free of lowland chemicals, allowing the rice's natural sweetness to come through."
    },
    ingredientTheme: "Katmon leaves are renowned in indigenous medicine for their antibacterial properties, extending the rice's shelf life naturally.",
    nutrition: {
      calories: 220,
      carbs: "45g",
      protein: "4g",
      fat: "1g",
      sugar: "0g",
      fiber: "3g",
      highlight: "Rich in Complex Carbs",
      highlightDescription: "Heirloom red rice provides slow-digesting complex carbohydrates that sustain energy for hours, making it the perfect fuel for highland farmers and active lifestyles."
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
    ingredientDescriptions: {
      "Kadios (Pigeon peas)": "Drought-resistant highland legume packed with plant protein and fiber; the cornerstone of Ilonggo cuisine.",
      "Smoked pork knuckle": "Slow-smoked over wood chips for hours, infusing the meat with a deep, savory-smoky richness.",
      "Batwan fruit": "An endemic Visayan souring agent with a clean, refreshing tartness that defines the stew's character.",
      "Sweet potato tops": "Tender highland leafy greens added at the end, providing iron, vitamins A and C."
    },
    ingredientTheme: "Kadios represents agricultural resilience, surviving and yielding pods even during severe dry spells.",
    nutrition: {
      calories: 340,
      carbs: "24g",
      protein: "26g",
      fat: "16g",
      sugar: "3g",
      fiber: "8g",
      highlight: "High Fiber & Protein",
      highlightDescription: "Pigeon peas are among the richest plant-based protein and dietary fiber sources in Visayan cuisine, promoting healthy digestion and long-lasting satiety."
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
    ingredientDescriptions: {
      "Highland taro (Gabi)": "Cool mountain taro yields an exceptionally creamy, starchy flesh — far silkier than lowland varieties.",
      "Fresh coconut cream": "First-press coconut cream, thick and intensely rich, adding tropical fat and natural sweetness.",
      "Muscovado sugar": "Unrefined, minimally processed cane sugar retaining molasses; earthy, complex, and less sweet than white sugar.",
      "Condensed milk": "Added for a smooth, caramel-like creaminess that binds the taro and coconut together."
    },
    ingredientTheme: "Coconut shells used for baking infuses a subtle woody, toasted aroma into the sweet taro.",
    nutrition: {
      calories: 310,
      carbs: "52g",
      protein: "3g",
      fat: "11g",
      sugar: "28g",
      fiber: "2g",
      highlight: "Energy Dense Sweet",
      highlightDescription: "A concentrated source of natural carbohydrates and fats from taro and coconut cream, making this a beloved high-energy post-harvest celebration treat."
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
    ingredientDescriptions: {
      "Glutinous rice flour": "Ground sticky rice that forms the chewy, satisfying bilo-bilo dumplings at the heart of this soup.",
      "Coconut milk": "Light, sweet coconut milk forms the fragrant broth base, distinctly gentler than coconut cream.",
      "Ripe jackfruit (Langka)": "Naturally honey-sweet mountain jackfruit chunks that dissolve into the broth for fruity depth.",
      "Purple yam (Ube)": "Vibrant purple highland yam — mildly sweet with an earthy, vanilla-like note and stunning color.",
      "Tapioca pearls": "Translucent starchy pearls that add a bouncy, bubble-tea-like texture to the soup."
    },
    ingredientTheme: "Purple yam (Ube) gives the soup its vibrant, royal hue, turning a simple dish into a celebratory visual feast.",
    nutrition: {
      calories: 290,
      carbs: "48g",
      protein: "3g",
      fat: "10g",
      sugar: "22g",
      fiber: "2g",
      highlight: "Rich Comfort Bowl",
      highlightDescription: "A warm, nourishing blend of complex carbohydrates and natural fruit sugars that provides both immediate comfort and sustained warmth — perfect for cool highland afternoons."
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
    ingredientDescriptions: {
      "Pork belly": "Skin-on pork belly sliced and skewered — the fat renders into the meat over charcoal for a crisp, juicy bite.",
      "Annatto seed oil (Asuete)": "Vibrant orange-red oil extracted from annatto seeds; used for both color and a subtle earthy, peppery flavor.",
      "Native vinegar": "Fermented sugarcane or coconut vinegar — the tenderizing marinade acid that balances the rich fatty pork.",
      "Garlic & lemongrass": "Aromatics that perfume the meat during marination, leaving a fragrant, smoky undertone after grilling."
    },
    ingredientTheme: "Asuete (Annatto) is deeply tied to Panay Bukidnon culture, used historically for both culinary flavor and vibrant textile dyeing.",
    nutrition: {
      calories: 410,
      carbs: "4g",
      protein: "22g",
      fat: "34g",
      sugar: "2g",
      fiber: "0g",
      highlight: "High Fat Keto",
      highlightDescription: "Pork belly's high natural fat content makes this dish perfect for low-carb and ketogenic diets — the body burns this fat efficiently as fuel during festival activities."
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
        "Green, freshly cut bamboo is essential — dry bamboo would simply burn instead of steaming the food.",
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
    ingredientDescriptions: {
      "Pork belly cubes": "Thick-cut heritage pork belly marbled with fat — tenderizes beautifully inside the sealed bamboo chamber.",
      "Fresh bamboo tube": "Freshly harvested green bamboo — the cooking vessel that slowly releases sweet, woody steam to flavor the pork.",
      "Ginger & lemongrass": "Highland aromatics that neutralize gamey notes and infuse the sealed chamber with bright, warming fragrance.",
      "Wild garlic": "Smaller, more intensely flavored than commercial garlic; foraged from shaded forest clearings.",
      "Chili peppers": "Native highland chilies — mild enough to add warmth without overwhelming the bamboo-infused pork flavor."
    },
    ingredientTheme: "Fresh bamboo not only acts as a pot but dynamically flavors the meat as its internal moisture turns to steam.",
    nutrition: {
      calories: 380,
      carbs: "3g",
      protein: "28g",
      fat: "29g",
      sugar: "1g",
      fiber: "0g",
      highlight: "Rich Ancestral Protein",
      highlightDescription: "A powerful combination of dense protein and natural fats cooked without additives or processed ingredients — exactly as highland ancestors intended for sustained physical endurance."
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
    ingredientDescriptions: {
      "Squash": "Highland-grown kalabasa with dense, sweet orange flesh; a rich source of beta-carotene and vitamin A.",
      "Taro leaves": "Tender young leaves harvested from taro plants — must be fully cooked to neutralize naturally occurring calcium oxalate.",
      "Okra": "Pods that release a natural starch into the broth, giving it a slightly silky, thickened body.",
      "Eggplant": "Locally grown talong that absorbs the ginger broth beautifully, becoming buttery soft when simmered.",
      "Ginger broth": "The aromatic, warming base made by simmering fresh knobs of highland ginger in mountain spring water."
    },
    ingredientTheme: "Taro leaves and roots demonstrate the indigenous philosophy of full-plant utilization.",
    nutrition: {
      calories: 140,
      carbs: "22g",
      protein: "4g",
      fat: "2g",
      sugar: "6g",
      fiber: "5g",
      highlight: "Low Calorie Vegan",
      highlightDescription: "A guilt-free, plant-based powerhouse rich in dietary fiber and vitamins from a diverse mix of highland vegetables — ideal for mindful, sustainable eating."
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
    ingredientDescriptions: {
      "Wild lemongrass": "Foraged from highland clearings — more intensely fragrant and citrusy than farmed varieties; calms anxiety and aids digestion.",
      "Fresh pandan leaves": "Knotted before boiling to release concentrated aromatic oils that give the tea its signature vanilla-green scent.",
      "Wild forest honey": "Unprocessed raw honey gathered by indigenous honey-hunters from mountain hives; rich in enzymes and antioxidants.",
      "Mountain spring water": "Pure, mineral-rich water sourced from highland springs — the clean base that lets the herbal flavors shine."
    },
    ingredientTheme: "Wild forest honey embodies the untamed richness of the mountains, gathered sustainably by indigenous honey-hunters.",
    nutrition: {
      calories: 60,
      carbs: "15g",
      protein: "0g",
      fat: "0g",
      sugar: "14g",
      fiber: "0g",
      highlight: "Light Hydration",
      highlightDescription: "A natural, zero-fat herbal infusion with just a touch of wild honey for gentle energy. The lemongrass and pandan are clinically recognized for reducing stress and aiding sleep."
    },
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["hyped", "savory", "mist"]
  }
];

// Make available globally for all modules
if (typeof window !== "undefined") window.PRODUCTS = PRODUCTS;

const GALLERY_DATA = [
  {
    id: "gallery-tradition",
    title: "Tradition",
    subtitle: "Panubok Embroidery & the Sugidanon Epic",
    image: "50a19d46-e237-4b5c-958a-8454f060f70d.jpg",
    photoCredit: "Photo via community documentation, UCLM CTE",
    description: "The Panay Bukidnon are renowned for their intricate embroidery called 'Panubok', characterized by geometric and mythological motifs stitched by hand onto fabric. The 'Bagsang' — a serpentine spirit — is among the most revered motifs, symbolizing protection and connection to the ancestral world.",
    impact: "These traditions form the cultural backbone of the community, serving as oral and visual history that binds the highland tribes across generations. Every pattern tells a story that words alone cannot fully express.",
    significance: "Preserving these art forms is critical for the Philippines to maintain a living connection to its pre-colonial identity. Supporting indigenous crafts empowers local artisans economically while safeguarding irreplaceable cultural memory."
  },
  {
    id: "gallery-history",
    title: "History",
    subtitle: "Ancestral Domain & Mountain Resilience",
    image: "c3749917-6e05-4b82-86a6-79ee251240ae.jpg",
    photoCredit: "Photo via Panay Bukidnon IP documentation",
    description: "The Panay Bukidnon have inhabited the central highlands of Panay Island for centuries. When Spanish colonization reached the lowlands, they retreated deeper into the mountains — not out of defeat, but to fiercely protect their language, rituals, and way of life.",
    impact: "Their geographical isolation preserved an animistic worldview and indigenous governance structures that give extraordinary insight into early Philippine society before colonial contact.",
    significance: "Understanding their history teaches modern Filipinos about resilience and the unyielding roots of our national ancestry. Their story is not one of primitivity, but of deliberate, dignified preservation."
  },
  {
    id: "gallery-culture",
    title: "Culture",
    subtitle: "Binanog Dance & the Tultugan",
    image: "7fc84c48-b93b-4a9f-9141-d2c70ebdaadb.jpg",
    photoCredit: "Photo via UCLM CTE Buwan ng Wika 2026",
    description: "Music and movement are central to Panay Bukidnon culture. The 'Binanog' dance — which mimics the graceful flight of the hawk — is performed in full traditional regalia adorned with beads, coins, and Panubok patterns. The 'Tultugan', a rhythmic bamboo instrument, provides the heartbeat of their ceremonies.",
    impact: "These performances are sacred rituals for courtship, community bonding, and paying reverence to the spirits of nature. The costume itself is a wearable archive of the community's identity.",
    significance: "Patronizing these cultural expressions on a national level promotes diversity and enriches the Philippine tapestry of performing arts, reminding us of our profound connection to the natural world."
  },
  {
    id: "gallery-people",
    title: "People",
    subtitle: "Elders, Weavers & the Living Heritage",
    image: "c3749917-6e05-4b82-86a6-79ee251240ae.jpg",
    photoCredit: "Photo via Panay Bukidnon IP documentation",
    description: "The Panay Bukidnon community is anchored by the wisdom of its elders — the culture bearers — who carry the songs, stories, and techniques that define who they are. Their smiles carry generations of shared memory.",
    impact: "The warmth and strength in these portraits reflect a community that has survived centuries of change while maintaining their spirit intact. Seeing them is a reminder that culture lives in people, not just artifacts.",
    significance: "By recognizing and supporting the people themselves — not just their products — we advocate for indigenous rights, ancestral land recognition, and inclusive national progress."
  },
  {
    id: "gallery-cuisine",
    title: "Cuisine",
    subtitle: "Highland Delicacies & Zero-Waste Cooking",
    image: "be12f643-361f-4ad9-9cbc-c89416a5dba5.jpg",
    photoCredit: "Photo via Tabo sa UCLM, CTE",
    description: "Dishes like Tinuom na Manok (steamed native chicken in banana leaves) and golden Tamales represent the community's resourcefulness. They relied on foraging, root crops, and ancient preservation techniques — bamboo steaming, natural fermentation — long before modern kitchens existed.",
    impact: "This culinary tradition reflects a zero-waste, sustainable lifestyle that respects the finite bounty of the mountain, ensuring food security for the tribe across seasons and generations.",
    significance: "Indigenous cuisine offers sustainable, culturally rich alternatives. Promoting it helps local agriculture, introduces unique flavor profiles globally, and teaches the world that some of the finest cooking needs no industrial kitchen."
  },
  {
    id: "gallery-impact",
    title: "Impact to Society",
    subtitle: "Community Exchange & Educational Integration",
    image: "3a6ead90-5e66-42be-ac14-186f14b470aa.jpg",
    photoCredit: "College of Teacher Education, UCLM",
    description: "Through community markets, cultural exchanges, and educational events like Tabo sa UCLM, the Panay Bukidnon are stepping into the national consciousness — sharing their wisdom with lowlanders and students who may never have set foot in the highlands.",
    impact: "This exchange breaks down prejudices, fosters mutual respect, and provides the indigenous community with alternative livelihoods and a platform for visibility that does not require abandoning their homeland.",
    significance: "A nation that embraces its indigenous communities is stronger, more compassionate, and culturally wealthy. Tabo sa UCLM is a small but powerful act of that embrace."
  },
  {
    id: "gallery-conservation",
    title: "Conservation",
    subtitle: "Passing Down the Heritage",
    image: "fc075faf-172b-4ce9-8559-143ca84f5c26.jpg",
    photoCredit: "Photo via community documentation, UCLM CTE",
    description: "This elder weaver represents thousands of hours of mastery — patterns memorized not from books, but from watching hands move across fabric since childhood. Schools of Living Traditions (SLT) have been established to pass this knowledge to the next generation.",
    impact: "Conservation efforts ensure that the youth feel pride in their heritage, empowering them to become future leaders who navigate the modern world without losing their soul or their name.",
    significance: "Cultural conservation is as vital as environmental conservation. Every pattern saved, every song remembered, every recipe passed down is an act of resistance against cultural erasure — and a gift to all of humanity."
  }
];

window.GALLERY_DATA = GALLERY_DATA;

