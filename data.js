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
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Chicken_Binakol.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Inihaw_na_bangus.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Suman_sa_Ibos.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kadyos_Baboy_Langka_%28KBL%29.jpg",
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
      calories: 290,
      carbs: "52g",
      protein: "3g",
      fat: "8g",
      sugar: "18g",
      fiber: "5g",
      highlight: "High Energy & Fiber",
      highlightDescription: "Taro root is an excellent source of dietary fiber and complex carbohydrates, providing a sustained energy boost while supporting healthy digestion."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Binagol.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quizTags: ["chill", "sweet", "river"]
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
  // 1 — Tinuom na Manok
  {
    id: "gallery-01",
    image: "be12f643-361f-4ad9-9cbc-c89416a5dba5.jpg",
    title: "Tinuom na Manok",
    subtitle: "Ang Banal na Putahe ng mga Kabundukan",
    culture: "Ang Tinuom na Manok ay hindi lamang pagkain — ito ay isang ritwal. Sa mga Panay Bukidnon, ang pagluluto ng manok sa loob ng dahon ng saging ay simbolo ng pagmamahal sa likas na mundo. Ang buong proseso — mula sa pagpili ng dahon hanggang sa pagsisinop ng apoy — ay isinasagawa nang may buong pagrespeto sa kalikasan.",
    tradition: "Kaugalian ng mga matatanda na ang Tinuom ay inihahain lamang sa mga espesyal na okasyon: sa mga seremonya ng ani, sa pagdiriwang ng kasalan, at sa mga ritwal na pangkapayapaan. Ang bawat hakbang sa pagluluto ay may kasamang panalangin at papuri sa mga ninuno.",
    history: "Naniniwala ang mga Panay Bukidnon na ang recipe na ito ay ibinigay ng mga ninuno nila sa pamamagitan ng mga panaginip at bisyon. Bago pa man dumating ang mga Kastila, ito na ang pangunahing pagkain sa mga dakilang pagtitipon ng tribo sa Gitnang Panay.",
    impact: "Ang pagpapanatili ng recipe na ito ay nagbibigay ng kabuhayan sa mga lokal na magsasaka na nagpapalaki ng native na manok at naglilinang ng mga dahon ng saging. Bukod dito, pinagsasama-sama nito ang buong pamilya sa proseso ng pagluluto — isang gawi na nagpapatibay ng ugnayan.",
    significance: "Ang Tinuom ay patunay na ang zero-waste na pagluluto ay hindi bago sa Pilipinas — ito ay matagal nang isinasabuhay ng ating mga katutubo. Ituturo nito sa ating mga kabataan na ang tradisyunal ay makabago din.",
    funFacts: [
      "Ang salitang 'tinuom' ay nagmula sa Kinaray-a na salita na nangangahulugang 'pinagsama-sama' — isang sanggunian sa paraan ng pagtitiklop ng dahon ng saging.",
      "Ang native na manok na ginagamit dito ay mas maliit ngunit mas mataba at masustansya kaysa sa commercial na manok.",
      "Ang usok mula sa dahon ng saging habang niluluto ay pinaniniwalaan na nagtatataboy ng masasamang espiritu."
    ],
    photoCredit: "Larawan mula sa Tabo sa UCLM, CTE"
  },
  // 2 — Tamales
  {
    id: "gallery-02",
    image: "e1e5a388-ace2-4e6a-a6db-2db4181c5450.jpg",
    title: "Tamales ng Kabundukan",
    subtitle: "Ang Balikatan na Nakabalot sa Mais",
    culture: "Ang Tamales ng Panay Bukidnon ay iba sa ibang Tamales sa Pilipinas. Nakabalot ito sa mais na dahon at puno ng mga lokal na sangkap tulad ng grated na mais, coconut milk, at tinimplahan ng asin mula sa mga highland springs. Ito ay isang simbolo ng pagkakaisa — sapagkat ang bawat Tamales ay gawa ng maraming kamay.",
    tradition: "Sa tradisyon ng Panay Bukidnon, ang paggawa ng Tamales ay isang 'bayanihan' na aktibidad. Nagtitipon ang mga kababaihan ng tribo at sama-samang niluluto ang daan-daang piraso para sa mga darating na pagdiriwang. Ang proseso ng paggawa ay sinasamahan ng awit at mga kuwento ng mga ninuno.",
    history: "Naniniwala ang mga iskolar na ang Tamales ng Panay Bukidnon ay nagmula sa pre-colonial na pag-aaral ng pagpapanatili ng pagkain. Ang pagtatapon ng pagkain ay itinuturing na kalapastanganan sa kanilang kultura, kaya ginawa nila ang Tamales bilang paraan ng pag-iingat ng pagkain nang maraming araw.",
    impact: "Ang kabuhayan ng daan-daang pamilya ay nakasalalay sa pagbebenta ng Tamales sa mga palengke at sa mga pagdiriwang. Para sa maraming kababaihan ng tribo, ito ang kanilang pangunahing pinagkakakitaan.",
    significance: "Ang Tamales ay halimbawa ng pagiging matipid at maparaan ng ating mga katutubo — isang aralin na kailangan ng modernong panahon.",
    funFacts: [
      "Ang isang bihasang manggagawa ay kayang gumawa ng 50 Tamales sa loob ng isang oras.",
      "Sa loob ng tatlong araw, maaari pa ring kainin ang Tamales nang hindi nasisira — natural na pag-iingat ng pagkain.",
      "May ilang pamilya na may sariling lihim na recipe na ipinapasa lamang sa mga inapo."
    ],
    photoCredit: "Larawan mula sa Tabo sa UCLM, CTE"
  },
  // 3 — Elders / Attire
  {
    id: "gallery-03",
    image: "c3749917-6e05-4b82-86a6-79ee251240ae.jpg",
    title: "Mga Matatanda ng Tribo",
    subtitle: "Ang mga Tagapag-ingat ng Kaalaman at Pagmamahal",
    culture: "Sa kultura ng Panay Bukidnon, ang mga matatanda ay tinatawag na 'Baganihan' — ang mga tagapag-ingat ng karunungan. Sila ang may hawak ng mga lihim ng harbal na medisina, ng mga awit na ritwal, at ng mga desisyon sa pamamahala ng tribo. Ang kanilang suot — may buo at kumplikadong Panubok — ay repleksyon ng kanilang katayuan.",
    tradition: "Ang bawat motif sa damit ng isang matanda ay may kahulugan: ang bilang ng mga kalat, ang kulay ng sinulid, ang hugis ng mga pattern — lahat ito ay kwento ng kanilang buhay at linya ng angkan. Hindi ito basta disenyo lamang — ito ay kanilang awtobiograpiya na nakatahi sa tela.",
    history: "Sa loob ng mahabang panahon ng pananakop, ang mga matatanda ang naging tagapagligtas ng kultura ng Panay Bukidnon. Kahit ipinagbabawal ng mga kolonyal na kapangyarihan ang ilang kaugalian, patago nilang itinuro sa susunod na henerasyon.",
    impact: "Ang mga matatanda ang nagbibigay inspirasyon sa kabataan na huwag mahiyang maging katutubo. Ang kanilang presensya sa mga pampublikong kaganapan ay napakahalaga para sa pagpapalakas ng pagpapahalaga sa sariling kultura.",
    significance: "Ang pagbibigay pugay sa mga matatanda ng tribo ay pagkilala sa katotohanan na ang tunay na kaalaman ay hindi lamang matatagpuan sa mga aklat — ito ay nandoon din sa mga ulunan ng mga taong nabuhay at naranasan ang buhay.",
    funFacts: [
      "Ang pinaka-matandang kilalang Baganihan ng Panay Bukidnon ay namatay sa edad na halos 110 taon at nakaalaala pa ng mahigit 300 epikong kanta.",
      "Ang isang buong damit ng Baganihan ay maaaring tumagal ng isang taon upang matapos ang pagtatabing.",
      "Sa ilang bahagi ng kabundukan, ang mga matatanda ay ginagawang tagahatol sa mga hindi pagkakaunawaan ng komunidad."
    ],
    photoCredit: "Larawan mula sa Panay Bukidnon IP documentation"
  },
  // 4 — Mount Madja-as
  {
    id: "gallery-04",
    image: "Madjaas.jpg",
    title: "Bundok Madja-as",
    subtitle: "Ang Sagradong Tuktok ng Panay",
    culture: "Para sa Panay Bukidnon, ang Bundok Madja-as ay hindi lamang isang bundok — ito ay tahanan ng kanilang pinakamataas na diyos, si Makaptan. Ang bawat nagbabagyo, bawat kidlat, bawat ulan ay kanilang tinutumbasan ng pasasalamat at panalangin sa bundok na ito. Ang Madja-as ay ang sentro ng kanilang kosmolohiya.",
    tradition: "Bawat taon, ang mga pinuno ng tribo ay nagsasagawa ng 'Sugidanon sa Madja-as' — isang pagtawid sa bundok kasama ang buong komunidad upang maghandog ng pagkain, bulaklak, at awit sa mga espiritu ng kalikasan. Ito ay ang pinaka-sagradong ritwal ng Panay Bukidnon.",
    history: "Ayon sa mga Sugidanon (epikong tula), ang Panay Bukidnon ay mga inapo ng mga Bathala na nanirahan sa Madja-as bago pa man nalikha ang mundo sa kasalukuyang anyo nito. Ang bundok ang nagsisilbing physical na koneksyon sa kanilang mitolohikal na kasaysayan.",
    impact: "Dahil sa relihiyosong kahalagahan ng Madja-as, matagal na itong protektado ng komunidad mula sa pag-ubos ng kagubatan at iligal na pagmimina — isang natatanging halimbawa ng indigenous na pangangalaga sa kalikasan.",
    significance: "Ang Madja-as ay isa sa mga pinaka-biodiversity-rich na lugar sa Pilipinas. Ang katutubong paniniwala ng Panay Bukidnon ay nagsilbing proteksyon ng ekolohiya nang maraming siglo bago pa man dumating ang modernong environmental laws.",
    funFacts: [
      "Ang Madja-as ay may taas na 2,117 metro at isa sa mga pinakamataas na bundok sa Visayas.",
      "Naniniwala ang ilang mananaliksik na ang 'Madja-as' ay nagmula sa salitang nangangahulugang 'lugar ng hangin at liwanag'.",
      "Ang bundok ay tahanan ng mahigit 50 species ng ibon na endemic sa Panay, marami sa kanila ay nanganganib na mawala."
    ],
    photoCredit: "Larawan mula sa Panay Bukidnon IP documentation"
  },
  // 5 — Panubok weaving (weaving.jpg)
  {
    id: "gallery-05",
    image: "weaving.jpg",
    title: "Sining ng Panubok",
    subtitle: "Ang Pagtatahi ng Kasaysayan sa Tela",
    culture: "Ang Panubok ay ang pinaka-ikoniko at pinaka-kumplikadong anyo ng sining ng Panay Bukidnon. Ginagawa ito nang walang pattern o template — lahat ay galing sa memorya at sa puso ng manghahabi. Bawat stitch ay desisyon, bawat kulay ay kahulugan, bawat pattern ay kwento.",
    tradition: "Ayon sa kaugalian, ang isang batang babae ay nagsisimulang matuto ng Panubok sa edad na pitong taon. Sa ika-15 taon, dapat siyang makalikha ng sariling disenyo. Ang kakayahang lumikha ng Panubok ay isa sa mga pamantayan ng pagiging handa para sa pag-aasawa sa kanilang kultura.",
    history: "Ang Panubok ay pinaniniwalaan na libu-libong taon nang ginagawa ng Panay Bukidnon. Ang mga pinaka-sinaunang natuklasang piraso ay may mga disenyo na katulad ng mga nakikita sa mga ancient pottery ng pre-colonial Philippines, nagpapakita ng malalim na koneksyon sa nakaraan.",
    impact: "Sa kasalukuyan, ang mga Panubok na damit ay ibinebenta sa mataas na presyo sa mga cultural fair at international exhibitions, nagbibigay ng malaking kita sa mga artisano. Ang ilang piraso ay ibinebenta ng hanggang sampung libong piso.",
    significance: "Ang Panubok ay kinikilala ng UNESCO bilang isang mahalagang intangible cultural heritage. Ito ang isa sa mga pinaka-sopistikadong anyo ng indigenous textile art sa Southeast Asia.",
    funFacts: [
      "Ang isang buong damit na may Panubok ay maaaring tumagal ng anim hanggang labindalawang buwan upang matapos.",
      "Mahigit 30 natatanging pattern ang kilala — bawat isa ay may sariling pangalan at kahulugan sa Kinaray-a.",
      "Ang pinaka-eksklusibong pattern, ang 'Bagsang', ay para lamang sa mga pinuno at mga espesyal na seremonya."
    ],
    photoCredit: "Larawan mula sa community documentation, UCLM CTE"
  },
  // 6 — Manghahabi (fc075faf)
  {
    id: "gallery-06",
    image: "fc075faf-172b-4ce9-8559-143ca84f5c26.jpg",
    title: "Ang Manghahabi",
    subtitle: "Tagapagpanatili ng Isang Namamatay na Sining",
    culture: "Ang mga manghahabi ng Panay Bukidnon ay hindi lamang mga artisano — sila ay mga 'tagapagpanatili ng kaluluwa' ng kanilang kultura. Sa kanilang mga kamay ay nakatago ang lahat ng visual na kasaysayan ng tribo: ang mga digmaan, ang mga pag-ibig, ang mga pananalig, ang mga pangarap.",
    tradition: "Bago magsimulang manahi, ang isang bihasang manghahabi ay nagdarasal muna sa kanilang mga ninuno upang humingi ng gabay at inspirasyon. Naniniwala sila na ang magandang disenyo ay hindi galing sa kanila — ito ay regalong galing sa espiritual na mundo.",
    history: "Sa panahon ng pananakop, maraming manghahabi ang nagtago ng kanilang mga sinulid at kagamitan sa mga kweba upang hindi masira ng mga kolonisador. Ang ilan ay namatay nang hindi naikukuwento ang kanilang kaalaman — isang trahedya na nararamdaman pa rin ng komunidad hanggang ngayon.",
    impact: "Sa pamamagitan ng Tabo sa UCLM at iba pang cultural events, ang mga manghahabi ay nagkakaroon ng mas malawak na merkado para sa kanilang mga obra. Nagbibigay ito ng dignidad at kasiguraduhan sa kanilang kabuhayan.",
    significance: "Ang bawat manghahabi na patuloy na nagtitrabaho ay isang tagagawa ng resistensya laban sa cultural erasure. Ang kanilang pananatili ay pangako sa mga susunod na henerasyon na ang sining ng Panubok ay hindi mamamatay.",
    funFacts: [
      "Ang mga natural na tina na ginagamit ng Panay Bukidnon — mula sa mga ugat, dahon, at minerals — ay kayang tumagal nang higit sa limampung taon nang hindi kumukupas.",
      "Ang ilang manghahabi ay may espesyal na 'singing voice' para sa bawat sinulid — kanta na tumutulong sa kanila na mapanatili ang tamang tensyon habang nagtitahi.",
      "Ang mga manghahabi ay karaniwang nagtatatrabaho sa umaga lamang, kapag ang kanilang mga mata ay pinaka-malinaw."
    ],
    photoCredit: "College of Teacher Education, UCLM"
  },
  // 7 — Traditional Dress (7fc84c48)
  {
    id: "gallery-07",
    image: "7fc84c48-b93b-4a9f-9141-d2c70ebdaadb.jpg",
    title: "Tradisyunal na Damit",
    subtitle: "Ang Kasuotan na Nagkukuwento",
    culture: "Ang tradisyunal na damit ng Panay Bukidnon ay isang kompletong sistema ng komunikasyon. Hindi ka lamang nagsusuot ng tela — nagpapahayag ka ng iyong angkan, ng iyong katayuan, ng iyong mga nagawa, at ng iyong koneksyon sa mga ninuno. Bawat piraso ng alahas, bawat kulay ng tela, ay may malinaw na kahulugan sa komunidad.",
    tradition: "Sa mga pangunahing seremonya, ang buong kasuotan ay isinusuot: ang buong Panubok na tunika, ang mga gintong kuwintas at pulseras, ang mga singsing, at ang tiara na gawa sa mga beads at coins. Ang pagsuot ng buong kasuotan ay isang sagradong gawa.",
    history: "Ayon sa mga mananaliksik, ang estilo ng kasuotan ng Panay Bukidnon ay hindi nagbago nang malaki sa nakalipas na limang daang taon. Ito ay patunay ng lakas ng kanilang kultural na pagkakaisa at resistensya sa panlabas na impluwensya.",
    impact: "Ang pagsuot ng tradisyunal na damit sa mga pampublikong pagtitipon ay isang makapangyarihang pahayag ng pagkakakilanlan. Nagbibigay ito ng pagmamalaki sa kabataan at nagpapaalala sa publiko na ang Panay Bukidnon ay buhay at makulay.",
    significance: "Sa mundo ng fast fashion at globalisasyon, ang tradisyunal na kasuotan ng Panay Bukidnon ay nagpapakita ng alternatibong landas — isa na may dignidad, kagandahan, at kahulugan na hindi mabibili sa kahit anong mall.",
    funFacts: [
      "Ang kulay pula sa kasuotan ay sagrado at ginagamit lamang ng mga pinuno at mananayaw sa ritwal.",
      "Ang mga beads na ginagamit sa mga alahas ay kadalasang mga mana na pinagsalhan ng maraming henerasyon.",
      "Ang isang buong hanay ng alahas at kasuotan ay maaaring magkahalaga ng katumbas ng ilang buwang sahod."
    ],
    photoCredit: "Larawan mula sa UCLM CTE Buwan ng Wika 2026"
  },
  // 8 — Sugidanon Song
  {
    id: "gallery-08",
    image: "Sugidanon - Song.jpg",
    title: "Ang Sugidanon",
    subtitle: "Epikong Awit ng mga Kabundukan",
    culture: "Ang Sugidanon ay ang pinaka-mahalaga at pinaka-sagradong anyo ng oral literature ng Panay Bukidnon. Ito ay isang epikong tula na inaawit nang walang pahinga, maaaring tumagal ng maraming araw. Ang mga Sugidanon ay naglalaman ng mga kwento ng mga bayani, ng mga diyos, at ng simula ng mundo.",
    tradition: "Ang isang mang-aawit ng Sugidanon, tinatawag na 'Binukot', ay isang espesyal na miyembro ng komunidad. Sila ay pinalaki nang may proteksyon at edukasyon, itinangi sa isang espesyal na paraan ng pamumuhay upang mapangalagaan ang kanilang boses at memorya para sa mga epikong awit.",
    history: "Naniniwala ang mga antropolohista na ang tradisyon ng Sugidanon ay higit sa isang libong taon ang gulang. Ito ang isa sa mga pinaka-kumplikadong oral epic traditions sa buong Asya, na may libu-libong berso na nakaimbak sa puso ng mga Binukot.",
    impact: "Ang Sugidanon ay nagsisilbing 'encyclopedia' ng Panay Bukidnon — naglalaman ng kaalaman tungkol sa halamang gamot, sa mga bituin, sa panahon, at sa moral na pamantayan ng komunidad. Ito ang kanilang pinaka-mahalaga na 'libro'.",
    significance: "Ang Sugidanon ay kinikilala ng UNESCO bilang isang Intangible Cultural Heritage of Humanity. Ito ang tanging oral epic tradition sa Pilipinas na patuloy na isinasagawa sa orihinal nitong anyo.",
    funFacts: [
      "Ang isang buong pagtatanghal ng Sugidanon ay maaaring tumagal ng tatlo hanggang limang gabi nang walang pahinga.",
      "Ang mga Binukot ay nagsasaulo ng mahigit 10,000 berso — katumbas ng ilang buong nobela.",
      "Bago sa isang Binukot umawit, siya ay nagdarasal at nag-aayuno ng tatlong araw."
    ],
    photoCredit: "Larawan mula sa Panay Bukidnon IP documentation"
  },
  // 9 — Binanog Dance
  {
    id: "gallery-09",
    image: "Binanog - dance.jpg",
    title: "Ang Binanog",
    subtitle: "Sayaw ng Agila ng Kabundukan",
    culture: "Ang Binanog ay ang pinaka-kilala at pinaka-kapwa-nagmamahal na sayaw ng Panay Bukidnon. Ginagaya nito ang iba't ibang galaw ng banog (Philippine hawk-eagle) — ang pag-ikot, ang paglapad ng pakpak, ang mabilis na pagbaba. Para sa Panay Bukidnon, ang banog ay sagrado at simbolo ng kalayaan at lakas ng espiritu.",
    tradition: "Sa tradisyon, ang Binanog ay isinasayaw sa dalawa: isang lalaki at isang babae, na kumakatawan sa lalaki at babaeng banog. Ito ay isang sayaw ng korteho — isang makulay na paraan ng pagpapahayag ng pagmamahal sa harap ng buong komunidad.",
    history: "Naniniwala ang mga matatanda na ang unang Binanog ay isinayaw ng isang espiritu ng kabundukan na nagpakita sa isang mandirigma. Itinuro nito ang sayaw bilang regalo sa komunidad — isang paraan ng pakikipag-ugnayan sa espiritual na mundo.",
    impact: "Ang Binanog ay nagsilbing cultural ambassador ng Panay Bukidnon sa maraming international cultural festival. Sa pamamagitan nito, ang mga Pilipino sa buong mundo ay natutunan ang tungkol sa kagandahan ng indigenous Filipino culture.",
    significance: "Ang Binanog ay patunay na ang sining ng ating mga katutubo ay may kapantay ang anumang sining sa mundo. Ito ay hamon sa lahat ng Pilipino na ipagtanggol at ipagdiwang ang ating natatanging cultural heritage.",
    funFacts: [
      "Ang mga costume na ginagamit sa Binanog ay kadalasang may kasamang tunay na pakpak ng ibon na naibigay ng komunidad.",
      "Ang ritmo ng musika ng Binanog ay ginagaya ang tunog ng puso ng banog habang lumilipad — mabilis na tumitibok.",
      "Ang isang bihasa at kilalang mananayaw ng Binanog ay tinatawag na 'Hari ng Banog' ng kanilang komunidad."
    ],
    photoCredit: "Larawan mula sa UCLM CTE Buwan ng Wika 2026"
  },
  // 10 — Bagsang motif (50a19d46)
  {
    id: "gallery-10",
    image: "50a19d46-e237-4b5c-958a-8454f060f70d.jpg",
    title: "Ang Bagsang",
    subtitle: "Espiritu ng Serpyente at Tagapagtanggol ng Tribo",
    culture: "Ang Bagsang ay ang pinaka-sagrado at pinaka-makapangyarihang motif sa sining ng Panubok. Ito ay kumakatawan sa isang serpyenteng espiritu — ang tagapagtanggol ng angkan at ng lupa ng mga Panay Bukidnon. Ang paglalagay ng Bagsang sa isang damit ay isang pahayag ng proteksyon at koneksyon sa ancestral na kapangyarihan.",
    tradition: "Ang Bagsang ay ginagamit lamang ng mga pinuno at sa mga espesyal na ritwal. Ang isang manghahabi ay hindi maaaring gumawa ng Bagsang nang walang pahintulot ng mga matatanda ng komunidad. Ito ay isang sagradong kilos na may kaukulang responsibilidad.",
    history: "Ayon sa Sugidanon, ang Bagsang ay isang espiritu na nagprotekta sa Panay Bukidnon noong unang malalaking digmaan ng tribo. Ang motif ay lumitaw una sa mga ritualistic na gamit bago nailapat sa Panubok — nagpapakita ng malalim na koneksyon ng sining sa espirituwalidad.",
    impact: "Ang Bagsang motif ay naging simbolo ng kilusang pagpapanatili ng kultura ng Panay Bukidnon. Makikita ito ngayon sa mga logo ng mga organisasyong nagtataguyod ng indigenous rights at sa mga produktong ibinebenta para suportahan ang komunidad.",
    significance: "Ang Bagsang ay nagpapaalala sa atin na ang tunay na kapangyarihan ay hindi galing sa mga armas o kayamanan — ito ay galing sa kaalaman, sa kultura, at sa koneksyon sa ating mga pinagmulan.",
    funFacts: [
      "Ang Bagsang motif ay may mahigit tatlumpung variation — bawat isa ay may bahagyang kaibang kahulugan at gamit.",
      "Sa ilang interpretasyon, ang Bagsang ay hindi isang serpyente kundi isang mythical na nilalang na may katangian ng parehong ibon at ahas.",
      "Ang kumplikadong Bagsang pattern ay kayang gawin lamang ng mga pinaka-bihasang manghahabi — ito ang ultimate na pagsubok ng kanilang kahusayan."
    ],
    photoCredit: "Larawan mula sa community documentation, UCLM CTE"
  }
];

window.GALLERY_DATA = GALLERY_DATA;

