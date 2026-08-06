/**
 * data.js — Tabo sa UCLM Product Data (V3.1)
 * ─────────────────────────────────────────────────────────────────────────────
 * Added: sugar, fiber to nutrition; highlightDescription; ingredientDescriptions
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PRODUCTS = [
  {
    id: "prod-001",
    name: "Budbud na may latik",
    price: 20,
    quote: "Malagkit na kanin na binalot sa dahon ng saging, pinasarap ng matamis at siksik na latik.",
    history: {
      origin: "Kabisayaan",
      summary: "Ang budbud ay isa sa pinakamatandang kakanin sa Visayas, madalas ihain tuwing may pagdiriwang gaya ng kasal, binyag, at pista opisyal. Sa mga komunidad ng Panay Bukidnon, ang paggawa ng budbud ay isang sama-samang gawain — nagtitipon ang mga babae sa komunidad upang tulungan ang isa't isa sa pagbalot at pagpapasingaw. Ang proseso mismo ay isang ritwal ng pagkakabuklod.",
      funFacts: [
        "Ang pagbalot sa dahon ng saging ay nagbibigay ng kakaibang aroma habang ito ay pinapasingawan — isang likas na 'packaging' na libu-libong taon nang ginagamit ng ating mga ninuno.",
        "Ang latik ay nagmula sa pinakuluang gata ng niyog na naging langis at latak — isang proseso ng pagkuha na walang basura dahil pareho ang langis at latak ay may silbi sa kusina.",
        "Sa mga pista ng Panay Bukidnon, ang dami ng budbud na naihanda ay minsan sukatan ng kayamanan at kasaganaan ng pamilya."
      ],
      impact: "Simbolo ng mainit na pagtanggap at pagkakabuklod-buklod ng pamilyang Pilipino. Ang bawat piraso ay naglalaman hindi lamang ng sangkap kundi ng pagmamahal at pagsisikap ng mga kamay na gumawa nito. Ang pagbabahagi ng budbud ay isang paraan ng pagpapalakas ng ugnayan sa pagitan ng mga tao."
    },
    culturalTie: {
      boothRelevance: "Ito ang pambato naming kakanin na tiyak na magbabalik sa inyo sa mga alaala ng pista sa probinsya. Sa bawat kagat, muling mararamdaman ang init ng tahanan at ang amoy ng pinasingawang dahon ng saging.",
      themeConnection: "Ipinapakita nito ang mayamang kultura ng Pilipinas sa paggamit ng niyog at malagkit bilang pangunahing sangkap — mga produktong bunga ng pagtutulungan ng tao at kalikasan sa ating mga taniman at niyugan."
    },
    ingredients: [
      "Malagkit na bigas",
      "Gata ng niyog",
      "Asukal na pula",
      "Asin",
      "Dahon ng saging"
    ],
    ingredientDescriptions: {
      "Malagkit na bigas": "Espesyal na uri ng bigas na nagbibigay ng perpektong kunat at lambot.",
      "Gata ng niyog": "Sariwang katas ng niyog para sa malinamnam na lasa at paggawa ng latik.",
      "Asukal na pula": "Nagbibigay ng katamtamang tamis at kulay sa kakanin at latik.",
      "Asin": "Pampa-balanse ng tamis ng latik.",
      "Dahon ng saging": "Ginagamit bilang pambalot na nag-iiwan ng mabangong amoy pagkatapos pasingawan."
    },
    ingredientTheme: "Likas na kayamanan ng niyog at bigas mula sa malalawak na sakahan ng bansa.",
    nutrition: {
      calories: 220,
      carbs: "45g",
      protein: "3g",
      fat: "5g",
      sugar: "15g",
      fiber: "2g",
      highlight: "Mataas sa Enerhiya",
      highlightDescription: "Ang carbohydrates mula sa malagkit ay nagbibigay ng mahabang lakas na kailangan sa maghapon."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Suman_Latik.jpg",
    quizTags: ["sweet", "traditional"]
  },
  {
    id: "prod-002",
    name: "Budbud na may latik (3 piraso)",
    price: 50,
    quote: "Tatlong piraso ng paboritong malagkit na may latik, perpekto para sa barkada o pamilya.",
    history: {
      origin: "Kabisayaan",
      summary: "Kagaya ng solong budbud, ito ay bahagi ng masaganang tradisyon ng pagbabahagi ng biyaya.",
      funFacts: [
        "Mas makakatipid ka kapag bumili ng maramihan!",
        "Ang pag-aalok ng pagkain sa kapwa ay likas na kaugaliang Pilipino."
      ],
      impact: "Nagtataguyod ng samahan sa pamamagitan ng pagbabahagi ng kakanin sa hapag-kainan."
    },
    culturalTie: {
      boothRelevance: "Maganda para sa mga magkakaibigang bumibisita sa aming booth.",
      themeConnection: "Sinasalamin ang diwa ng bayanihan at pagbibigayan sa bawat kagat."
    },
    ingredients: [
      "Malagkit na bigas",
      "Gata ng niyog",
      "Asukal na pula",
      "Asin",
      "Dahon ng saging"
    ],
    ingredientDescriptions: {
      "Malagkit na bigas": "Piniling malagkit para sa pinakamasarap na tekstura.",
      "Gata ng niyog": "Unang piga ng niyog para sa siksik na linamnam.",
      "Asukal na pula": "Nagpapatamis at nagbibigay kulay sa kakanin.",
      "Asin": "Kaunting asin upang mas lumabas ang lasa ng gata.",
      "Dahon ng saging": "Pambalot na pinadaan sa apoy para mas madaling tiklupin at magbigay ng aroma."
    },
    ingredientTheme: "Ang paggamit ng mga lokal na sangkap ay nagpapakita ng ating pagpapahalaga sa agrikultura.",
    nutrition: {
      calories: 660,
      carbs: "135g",
      protein: "9g",
      fat: "15g",
      sugar: "45g",
      fiber: "6g",
      highlight: "Pang-Maramihan",
      highlightDescription: "Siksik sa carbohydrates, kaya magandang meryenda bago gumawa ng pisikal na gawain o aktibidad."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Suman_Latik.jpg",
    quizTags: ["sweet", "traditional", "sharing"]
  },
  {
    id: "prod-003",
    name: "Budbud",
    price: 15,
    quote: "Simpleng suman o malagkit na binalot sa dahon ng saging, mainam kapartner ng kape o tsokolate.",
    history: {
      origin: "Pilipinas",
      summary: "Isang pang-araw-araw na kakanin sa Pilipinas, madalas kinakain sa agahan o meryenda kasabay ng mainit na kape o tsokolate. Ang budbud na walang latik ay nagbibigay ng purong lasa ng malagkit at gata — isang simpleng kasiyahan na hindi nangangailangan ng karagdagang pampatamis para mapahalagahan.",
      funFacts: [
        "May iba't ibang bersyon ang suman sa bawat rehiyon ng Pilipinas — may katugma itong tinatawag na 'ibos' sa Ilocos, 'moron' sa Zamboanga, at 'suman sa lihiya' sa Batangas.",
        "Maaaring isawsaw sa asukal, tsokolate, o mangga ang klasikong budbud — ang bawat pamilya ay may sariling paboritong paraan ng pagkain nito.",
        "Ayon sa mga matatanda, ang tamang paraan ng pagkain ng budbud ay dahan-dahang alisan ng balot ang dahon at ubusin habang mainit pa."
      ],
      impact: "Isang hindi nawawalang bahagi ng kulturang Pilipino na nag-uugnay sa mga henerasyon. Ang lasa ng budbud ay madalas na unang alaala ng maraming Pilipinong lumaki sa probinsya — isang pagkain ng nostalgia na nagdadala ng init ng tahanan kahit malayo ka na."
    },
    culturalTie: {
      boothRelevance: "Ang pinakapayak at klasikong handog sa aming menu, swak sa panlasa ng lahat.",
      themeConnection: "Sinasalamin ang pagiging payak at mapagkumbaba ng kulturang Pilipino."
    },
    ingredients: [
      "Malagkit na bigas",
      "Gata ng niyog",
      "Asin",
      "Dahon ng saging"
    ],
    ingredientDescriptions: {
      "Malagkit na bigas": "Ang pundasyon ng kakanin, malambot at madikit kapag naluto.",
      "Gata ng niyog": "Pampalambot at pampalasa sa bigas habang hinahalo bago pasingawan.",
      "Asin": "Nagbibigay ng malinamnam na balanse sa natural na tamis ng gata.",
      "Dahon ng saging": "Likas at environment-friendly na pambalot na nag-aambag din sa lasa."
    },
    ingredientTheme: "Ang kasimplehan ng sangkap ay nagbibigay-daan sa natural na lasa ng niyog at bigas.",
    nutrition: {
      calories: 180,
      carbs: "38g",
      protein: "3g",
      fat: "3g",
      sugar: "2g",
      fiber: "1g",
      highlight: "Mababang Asukal",
      highlightDescription: "Dahil walang latik, ito ay may mas mababang asukal na angkop sa mga umiiwas sa sobrang tamis."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Suman_sa_Ibos.jpg",
    quizTags: ["savory", "traditional", "chill"]
  },
  {
    id: "prod-004",
    name: "Putong may keso",
    price: 7,
    quote: "Malambot at malinamnam na puto, pinatungan ng hiniwang keso para sa perpektong tamis at alat.",
    history: {
      origin: "Pilipinas",
      summary: "Ang puto ay paboritong kapareha ng dinuguan, pancit, o kinakain ng mag-isa bilang meryenda.",
      funFacts: [
        "Ang salitang 'puto' ay maaaring nagmula sa salitang Malay na 'puttu' na ibig sabihin ay pinasingawang pagkain.",
        "Sa mga pista, hindi nawawala ang puto sa hapag dahil sa madali itong kainin at ihanda."
      ],
      impact: "Isang pangunahing meryenda na nagbibigay ng saya at nakakabusog na karanasan sa bawat bata o matanda."
    },
    culturalTie: {
      boothRelevance: "Isang mabilis at murang meryenda na patok sa mga estudyante at dumadaan.",
      themeConnection: "Ang puto ay kumakatawan sa kasaganahan ng bigas sa ating bansa at ang impluwensyang dayuhan sa pagdagdag ng keso."
    },
    ingredients: [
      "Galapong o Harina",
      "Gata o Gatas",
      "Asukal",
      "Baking powder",
      "Keso"
    ],
    ingredientDescriptions: {
      "Galapong o Harina": "Ang pangunahing sangkap na nagbibigay ng esponghang tekstura ng puto.",
      "Gata o Gatas": "Nagsisilbing pampalambot at nagdaragdag ng linamnam.",
      "Asukal": "Nagbibigay ng katamtamang tamis.",
      "Baking powder": "Upang umalsa nang maayos at maging malambot ang puto.",
      "Keso": "Ang maalat-alat na topping na perpektong bumabalanse sa tamis ng puto."
    },
    ingredientTheme: "Ang tamis ng masa at alat ng keso ay nagpapakita ng mahusay na balanse ng lasa.",
    nutrition: {
      calories: 90,
      carbs: "18g",
      protein: "2g",
      fat: "1g",
      sugar: "6g",
      fiber: "0g",
      highlight: "Banayad na Meryenda",
      highlightDescription: "Ang isang piraso ng puto ay naglalaman ng sapat na carbohydrates bilang panawid-gutom sa kalagitnaan ng araw."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Puto_cheese.jpg",
    quizTags: ["sweet", "savory", "bite-sized"]
  },
  {
    id: "prod-005",
    name: "Putong may keso (3 piraso)",
    price: 20,
    quote: "Tatlong piraso ng paboritong esponghang puto na may keso. Mas marami, mas masaya!",
    history: {
      origin: "Pilipinas",
      summary: "Ito ang karaniwang benta ng puto sa mga kanto at pamilihan, mas masarap kapag pinagsaluhan.",
      funFacts: [
        "Kapag tatlo ang binili, madalas ay sakto ito bilang pamalit sa isang mabigat na meryenda.",
        "Ang bilog na hugis ng puto ay sumisimbolo din minsan sa pagkabuo at pagkakaisa."
      ],
      impact: "Mura at nakakabusog, ito ang go-to meryenda ng mga Pilipino on the go."
    },
    culturalTie: {
      boothRelevance: "Promo naming alok para sa mga gustong magbahagi sa kaibigan o ubusin nang mag-isa.",
      themeConnection: "Sinasalamin nito ang abot-kayang pagkain sa mga kalsada at palengke ng Pilipinas."
    },
    ingredients: [
      "Galapong o Harina",
      "Gatas",
      "Asukal",
      "Baking powder",
      "Keso"
    ],
    ingredientDescriptions: {
      "Galapong o Harina": "Pinong harina para sa mala-ulap na lambot.",
      "Gatas": "Nagpapasarap sa masa at nagdadagdag ng kaunting protina.",
      "Asukal": "Matamis na pampalasa.",
      "Baking powder": "Ang lihim sa pag-alsa at pagiging fluffy ng kakanin.",
      "Keso": "Klasikong paborito bilang topping na nagpapalinamnam."
    },
    ingredientTheme: "Sulit na meryenda na hindi nagtitipid sa lasa at kalidad.",
    nutrition: {
      calories: 270,
      carbs: "54g",
      protein: "6g",
      fat: "3g",
      sugar: "18g",
      fiber: "0g",
      highlight: "Siksik at Sulit",
      highlightDescription: "Ang tatlong pirasong puto ay nagbibigay ng sapat na enerhiya para maipagpatuloy ang trabaho at pag-aaral nang hindi nabibigatan."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Puto_cheese.jpg",
    quizTags: ["sweet", "savory", "sharing"]
  },
  {
    id: "prod-006",
    name: "Puto kutsinta",
    price: 7,
    quote: "Makunat, matamis, at malinamnam na kutsinta, siksik sa sarap lalo na kung may niyog.",
    history: {
      origin: "Pilipinas",
      summary: "Isang tradisyonal na kakanin na laging kasama ng puto tuwing meryenda, gawa sa lye water at asukal na pula.",
      funFacts: [
        "Ang kulay nito ay dahil sa asukal na pula o minsan ay katas ng annatto (atsuete).",
        "Ang lihiya o lye water ang nagbibigay ng katangi-tanging kunat ng kutsinta."
      ],
      impact: "Nagpapakita ng husay sa paggawa ng iba't ibang uri ng kakanin gamit ang parehong pangunahing sangkap."
    },
    culturalTie: {
      boothRelevance: "Hindi kumpleto ang karanasan ng kakanin kung walang kutsinta na paborito ng marami.",
      themeConnection: "Sumisimbolo sa kulay at sigla ng pagkaing Pilipino."
    },
    ingredients: [
      "Harina at Tapioca",
      "Asukal na pula",
      "Lihiya (Lye water)",
      "Kinayod na niyog"
    ],
    ingredientDescriptions: {
      "Harina at Tapioca": "Ang pinaghalong ginagamit upang makuha ang malambot ngunit makunat na tekstura.",
      "Asukal na pula": "Nagbibigay ng malalim at mala-karamel na tamis at kayumangging kulay.",
      "Lihiya (Lye water)": "Pangunahing sangkap para maging 'jelly-like' at makunat ang kakanin.",
      "Kinayod na niyog": "Inilalagay sa ibabaw upang pandagdag-lasa at balanse sa tamis."
    },
    ingredientTheme: "Tekstura at tradisyon—ang lihiya at tapioca ay nagbibigay ng kakaibang karanasan sa pag-nguya.",
    nutrition: {
      calories: 80,
      carbs: "19g",
      protein: "1g",
      fat: "0g",
      sugar: "8g",
      fiber: "0g",
      highlight: "Fat-Free Sweetness",
      highlightDescription: "Dahil wala itong mantika o gata (maliban sa niyog sa ibabaw), ang kutsinta ay isang light na meryenda na hindi nakakaumay."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Kutsinta.jpg",
    quizTags: ["sweet", "traditional", "bite-sized"]
  },
  {
    id: "prod-007",
    name: "Puto kutsinta (3 piraso)",
    price: 20,
    quote: "Bakit ka pa kukuha ng isa kung kaya mo namang ubusin ang tatlo? Kutsintang may niyog na nagpapalaway.",
    history: {
      origin: "Pilipinas",
      summary: "Ito ang sulit na pormat para sa mga gustong mapadami ang kain o magbahagi sa iba.",
      funFacts: [
        "Madalas itong tinitinda ng mga nag-iikot na magkakanin kasama ng puto at sapin-sapin.",
        "Sa kulturang Pinoy, ang kakanin ay madalas ipasaubong sa pamilya pagkagaling sa trabaho."
      ],
      impact: "Nagsisilbing pampasaya ng hapag-kainan, perpekto sa mainit na kape tuwing hapon."
    },
    culturalTie: {
      boothRelevance: "Ang tatlong piraso ay siguradong magpapasaya ng isang nagugutom na kustomer.",
      themeConnection: "Sinasalamin nito ang kaugaliang pag-uwi ng pasalubong para sa pamilya."
    },
    ingredients: [
      "Harina at Tapioca",
      "Asukal na pula",
      "Lihiya (Lye water)",
      "Kinayod na niyog"
    ],
    ingredientDescriptions: {
      "Harina at Tapioca": "Pundasyon ng malambot at makunat na hugis ng kutsinta.",
      "Asukal na pula": "Katamisan na nagpapakilig sa panlasa.",
      "Lihiya (Lye water)": "Pampabuo at pampakunat.",
      "Kinayod na niyog": "Nagdadagdag ng texture na nakaka-adik kainin kasabay ng kutsinta."
    },
    ingredientTheme: "Ang pag-ibig sa matatamis at makukunat na pagkain ay naka-ukit na sa panlasang Pilipino.",
    nutrition: {
      calories: 240,
      carbs: "57g",
      protein: "3g",
      fat: "1g",
      sugar: "24g",
      fiber: "1g",
      highlight: "Quick Energy Boost",
      highlightDescription: "Ang simpleng carbohydrates nito ay madaling natutunaw upang bigyan ka ng agarang lakas at sigla."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Kutsinta.jpg",
    quizTags: ["sweet", "traditional", "sharing"]
  },
  {
    id: "prod-008",
    name: "Nilupak na saging",
    price: 25,
    quote: "Nilamas at pinaghalong saba, gata, at asukal — simpleng kakaning puno ng tradisyon at sarap.",
    history: {
      origin: "Luzon at Visayas",
      summary: "Ang paglulupak ay isang sinaunang proseso ng pagbayo o pagdurog ng saging, kamoteng kahoy, o kamote gamit ang lusong at halo. Ang nilupak na saging ay sikat sa mga probinsya bilang meryenda at minsan ay pampalakas pagkatapos ng mabuong trabaho sa bukid. Ito ay isa sa mga kakaning may malalim na ugat sa pang-araw-araw na buhay ng mga manggagawa sa lupa.",
      funFacts: [
        "Tradisyonal na ginagamit ang malaking lusong at halo upang bayuhin ang saging hanggang maging makinis ang tekstura — isang gawain na nangangailangan ng lakas at ritmo, kaya madalas ito ay ginagawa nang mayroon pang awit o salitaan.",
        "Maaari ring dagdagan ng margarina para mas bumango at mas maging malinamnam — isang modernong halo sa tradisyonal na resipe.",
        "Sa ilang lugar sa Visayas, ang nilupak ay inihahain bilang pagkain ng paghaharap sa mga bisita bilang tanda ng mataas na pagtangkilik."
      ],
      impact: "Isang paraan noon ng mga kabataan at pamilya na magtulungan sa pamamagitan ng salitan sa pagbayo sa lusong — ang gawaing ito ay hindi lamang pagluluto kundi isang okasyon ng pagtitipon at pagbabahagi ng mga kwento."
    },
    culturalTie: {
      boothRelevance: "Isang nakakabusog na meryenda na nagpapakita ng pagka-maparaan gamit ang saging na saba.",
      themeConnection: "Sinasalamin nito ang bayanihan at pagsisikap sa pamamagitan ng paggawa nito nang mano-mano."
    },
    ingredients: [
      "Saging na saba",
      "Kinayod na niyog",
      "Asukal",
      "Margarina o Butter"
    ],
    ingredientDescriptions: {
      "Saging na saba": "Hilaw o manibalang na saging na pinakuluan bago bayuhin.",
      "Kinayod na niyog": "Pampalapot at nagbibigay ng natural na linamnam at texture.",
      "Asukal": "Nagdadagdag ng saktong tamis upang bumagay sa lasa ng saging.",
      "Margarina o Butter": "Inilalagay habang mainit pa para matunaw at magbigay ng aroma at asim-alat na linamnam."
    },
    ingredientTheme: "Pag-asa sa lokal na agrikultura — ang saging at niyog ay karaniwang tumutubo sa bawat bakuran sa probinsya.",
    nutrition: {
      calories: 210,
      carbs: "42g",
      protein: "2g",
      fat: "6g",
      sugar: "18g",
      fiber: "4g",
      highlight: "Mataas sa Potasyum",
      highlightDescription: "Ang saging na saba ay likas na mayaman sa potasyum at hibla na mabuti sa pag-iwas sa pulikat at pagpapabuti ng tiyan."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Nilupak.jpg",
    quizTags: ["sweet", "traditional", "comfort"]
  },
  {
    id: "prod-009",
    name: "Pritong kamote",
    price: 25,
    quote: "Matamis, mainit, at malutong na pritong kamote, nababalot ng karamelisadong asukal.",
    history: {
      origin: "Kalsada ng Pilipinas",
      summary: "Tinatawag ding kamote cue kung nakatuhog, ito ay isang sikat na street food at meryenda na piniprito sa asukal na pula.",
      funFacts: [
        "Ang kamote ay naging pangunahing alternatibo sa bigas noong panahon ng digmaan dahil madali itong itanim.",
        "Ang pagprito nang may asukal ay nakakatulong magbigay ng makintab at malutong na coating."
      ],
      impact: "Simbolo ng kasipagan at pagiging maparaan ng mga Pilipino pagdating sa abot-kayang pagkain."
    },
    culturalTie: {
      boothRelevance: "Isa sa mga pinakamabentang paborito na agad nakakabuo ng enerhiya para sa mga estudyante at guro. Ang masarap na amoy ng mainit na kamoteng may karamel ay natural na nakakaakit ng pansin mula sa malayo.",
      themeConnection: "Sinasalamin ang masiglang street food culture at agrikultura ng mga halamang-ugat sa bansa — ang kamote ay hindi lamang pagkain kundi simbolo ng katatagan at kakayahang mabuhay sa kahit anong pagkakataon."
    },
    ingredients: [
      "Kamote (Sweet potato)",
      "Asukal na pula",
      "Mantika"
    ],
    ingredientDescriptions: {
      "Kamote (Sweet potato)": "Nagbibigay ng malambot na loob at mayaman sa fiber at bitamina.",
      "Asukal na pula": "Natutunaw sa mantika upang maging karamel na bumabalot sa bawat hiwa ng kamote.",
      "Mantika": "Ginagamit sa deep-frying para maluto ng pantay at malutong."
    },
    ingredientTheme: "Ang karamelisasyon ng asukal ay nag-aangat sa simpleng kamote patungo sa isang nakakaadik na matamis na meryenda.",
    nutrition: {
      calories: 250,
      carbs: "45g",
      protein: "2g",
      fat: "8g",
      sugar: "20g",
      fiber: "5g",
      highlight: "Bitamina A at Hibla",
      highlightDescription: "Nagtataglay ng beta-carotene mula sa kamote, nakakatulong sa kalusugan ng mata at nagbibigay ng fiber para sa tiyan."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Camotecue.jpg",
    quizTags: ["sweet", "crunchy", "street-food"]
  },
  {
    id: "prod-010",
    name: "Binaki",
    price: 25,
    quote: "Pinasingawang kakaning gawa sa giniling na mais at binalot sa balat nito, tamis at sarap mula sa Bukidnon.",
    history: {
      origin: "Bukidnon, Hilagang Mindanao",
      summary: "Ang Binaki, o pintos sa ilang bahagi ng Cebu, ay isang matamis na tamales na gawa sa sariwang mais.",
      funFacts: [
        "Ang pangalan ay sinasabing hango sa salitang 'baki' o palaka, dahil sa hugis ng balot nitong parang nakatiklop na palaka.",
        "Karaniwan itong binebenta sa mga bus terminal at palengke bilang pasalubong."
      ],
      impact: "Ipinagmamalaki ang masaganang ani ng mais sa Mindanao at Visayas."
    },
    culturalTie: {
      boothRelevance: "Isang kakaibang kakanin na hindi madalas makita, na nagdadala ng lasa ng mais mula sa probinsya sa aming booth.",
      themeConnection: "Pagbibigay-pugay sa mga magsasaka ng mais at pagpapakita ng zero-waste dahil sa paggamit ng balat ng mais (corn husk) bilang pambalot."
    },
    ingredients: [
      "Sariwang butil ng mais",
      "Gatas na kondensada",
      "Butter o Margarina",
      "Balat ng mais (Corn husk)"
    ],
    ingredientDescriptions: {
      "Sariwang butil ng mais": "Ang puso ng kakanin; ginigiling habang sariwa pa para makuha ang natural na gatas nito.",
      "Gatas na kondensada": "Nagbibigay ng tamis at nagpapakinis sa tekstura.",
      "Butter o Margarina": "Nagdadagdag ng linamnam at nagpapabango lalo habang pinapasingawan.",
      "Balat ng mais (Corn husk)": "Nagsisilbing lalagyan at pambalot na nag-iiwan ng amoy ng mais sa mismong kakanin."
    },
    ingredientTheme: "Ang paggamit ng buong halaman ng mais mula sa butil hanggang balat ay kahanga-hangang pamamaraan ng mga ninuno.",
    nutrition: {
      calories: 190,
      carbs: "35g",
      protein: "4g",
      fat: "5g",
      sugar: "12g",
      fiber: "3g",
      highlight: "Likas na Tamis ng Mais",
      highlightDescription: "May taglay itong magandang carbohydrates at bitamina B mula sa sariwang mais na tumutulong sa metabolismo."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Binaki.jpg",
    quizTags: ["sweet", "traditional", "corn"]
  },
  {
    id: "prod-011",
    name: "Katas ng pinya",
    price: 10,
    quote: "Pampalamig na inumin, matamis, at may asim na siguradong pamatid-uhaw.",
    history: {
      origin: "Bukidnon at iba pang plantasyon sa Pilipinas",
      summary: "Ang Pilipinas ay isa sa pinakamalaking producer ng pinya sa buong mundo, kaya ang katas ng pinya ay karaniwang pampalamig sa kahit anong handaan.",
      funFacts: [
        "Ang pinya ay naglalaman ng bromelain, isang enzyme na tumutulong matunaw ang mga kinain lalo na ang mga karne.",
        "Sikat ito bilang kapareha ng mga mamantikang pagkain o meryenda."
      ],
      impact: "Naging pangunahing inuming nagrerepresenta sa kasaganahan ng mga tropikal na prutas sa bansa."
    },
    culturalTie: {
      boothRelevance: "Ang aming pamatid-uhaw na perpektong panghugas pagkatapos kumain ng aming mga matatamis na kakanin.",
      themeConnection: "Sinasalamin nito ang init ng panahon sa Pilipinas at ang malikhaing solusyon gamit ang tropikal na prutas upang magpalamig."
    },
    ingredients: [
      "Sariwang pinya",
      "Tubig",
      "Asukal",
      "Yelo"
    ],
    ingredientDescriptions: {
      "Sariwang pinya": "Piniga upang makuha ang matamis at maasim nitong katas na sagana sa bitamina.",
      "Tubig": "Upang balansehin at timplahin ang katas.",
      "Asukal": "Upang i-adjust ang tamis base sa asim ng pinya.",
      "Yelo": "Upang magbigay ng napakalamig at nakaka-refresh na pakiramdam."
    },
    ingredientTheme: "Ang asim at tamis ng pinya ay nag-aalis ng umay mula sa anumang mabibigat o matatamis na kinain.",
    nutrition: {
      calories: 50,
      carbs: "13g",
      protein: "0g",
      fat: "0g",
      sugar: "10g",
      fiber: "0g",
      highlight: "Bitamina C at Hydration",
      highlightDescription: "Mayaman sa Bitamina C na nagpapalakas ng resistensya at bromelain na tumutulong sa panunaw."
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Pineapple_juice.jpg",
    quizTags: ["refreshing", "sweet", "chill"]
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

