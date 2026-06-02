export type FloorLevel = "RDC" | "1er étage" | "2ème étage" | "3ème étage";
export type ApartmentType = "F1" | "F2" | "F3" | "Salle de réunion";

export interface Apartment {
  id: string;
  name: string;
  floor: FloorLevel;
  type: ApartmentType;
  collection: "The Crown Jewels" | "The Modern Classics" | "The Grand Suites" | "Executive Space";
  /** Number of bedrooms */
  bedrooms: number;
  /** Has a living room / salon */
  hasSalon: boolean;
  /** Total number of rooms */
  totalRooms: number;
  /** Price per night in FCFA — set to 0 if TBD */
  price: number;
  sqm: number;
  capacity: number;
  image: string;
  features: string[]; // ['wifi', 'tv', 'ac', 'coffee', 'safe', 'parking']
  desc: string;
  history: string;
  story: string;
  advantages: string[];
  composition: {
    sleeping: string[];
    wellness: string[];
    living: string[];
    tech: string[];
  };
}

// ---------------------------------------------------------------------------
// Collection helpers
// ---------------------------------------------------------------------------

/** F1 = Chambre Premium (0 salon, 1 chambre) */
const F1_COLLECTION = "The Crown Jewels" as const;
/** F2 = Une chambre + salon */
const F2_COLLECTION = "The Modern Classics" as const;
/** F3 = Deux chambres + salon */
const F3_COLLECTION = "The Grand Suites" as const;
/** Salle de réunion */
const MEETING_COLLECTION = "Executive Space" as const;

export const APARTMENTS: Apartment[] = [
  // =========================================================================
  // RDC — Rez-de-chaussée
  // =========================================================================
  {
    id: "cotonou",
    name: "Cotonou",
    floor: "RDC",
    type: "F1",
    collection: F1_COLLECTION,
    bedrooms: 1,
    hasSalon: false,
    totalRooms: 1,
    price: 0, // À définir
    sqm: 30,
    capacity: 2,
    image: "/R+3 Int (2).pdf_52.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Chambre premium au cœur de la résidence.",
    history: "Le point de départ élégant de votre séjour à La Croisière.",
    story:
      "Baptisée en hommage à la capitale économique du Bénin, Cotonou incarne l'âme profonde de La Croisière. Chambre premium au rez-de-chaussée, elle conjugue sobriété raffinée et confort hôtelier de haut niveau — une invitation au repos immédiat dès votre arrivée.",
    advantages: [
      "Chambre premium avec literie haut de gamme",
      "Accès direct depuis le hall d'entrée",
      "Ambiance cosy et intimiste",
      "Idéale pour les courts séjours d'affaires",
    ],
    composition: {
      sleeping: ["Lit King Size Premium", "Linge de lit en coton d'Égypte", "Blackout total"],
      wellness: ["Douche effet pluie", "Produits d'accueil organiques"],
      living: ["Espace de travail intégré", "Mini-réfrigérateur"],
      tech: ["Wifi 6 ultra-rapide", "Smart TV 4K", "Climatisation intelligente"],
    },
  },
  {
    id: "marrakech",
    name: "Marrakech",
    floor: "RDC",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 42,
    capacity: 2,
    image: "/R+3 Int (2).pdf_37.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Une chambre et un salon inspirés de la Médina.",
    history: "Les couleurs chaudes du Maroc au cœur de Cotonou.",
    story:
      "Marrakech évoque les ruelles parfumées de la Médina et la chaleur dorée du désert. Avec son salon généreux et sa chambre lumineuse, cet appartement du rez-de-chaussée transporte ses hôtes dans une atmosphère orientale de raffinement.",
    advantages: [
      "Salon privé pour recevoir ou se détendre",
      "Décoration inspirée de l'art marocain",
      "Chambre isolée du salon pour un sommeil serein",
      "Parfait pour les séjours prolongés",
    ],
    composition: {
      sleeping: ["Lit King Size", "Linge de lit haut de gamme"],
      wellness: ["Douche à l'italienne", "Salle de bain carrelée"],
      living: ["Salon avec canapé design", "Coin repas", "Kitchenette équipée"],
      tech: ["Wifi 6", "Smart TV 4K", "Climatisation multi-zones"],
    },
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    floor: "RDC",
    type: "F3",
    collection: F3_COLLECTION,
    bedrooms: 2,
    hasSalon: true,
    totalRooms: 3,
    price: 0, // À définir
    sqm: 58,
    capacity: 4,
    image: "/R+3 Int (2).pdf_27.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Deux chambres et un salon aux accents insulaires.",
    history: "L'île aux épices s'invite à La Croisière.",
    story:
      "Zanzibar porte en elle l'essence des îles de l'Océan Indien — leurs couleurs turquoise, leurs épices envoûtantes et leur art de vivre. Le plus grand appartement du rez-de-chaussée avec deux chambres séparées et un vaste salon, idéal pour les familles ou les voyageurs exigeants.",
    advantages: [
      "Deux chambres indépendantes avec fermeture séparée",
      "Grand salon de réception",
      "Capacité 4 personnes en tout confort",
      "Idéal pour familles ou collègues en déplacement",
    ],
    composition: {
      sleeping: ["2 Chambres King Size", "Literie premium dans chaque chambre"],
      wellness: ["Douche sensorielle", "Double vasque"],
      living: ["Salon de réception 4 places", "Salle à manger", "Kitchenette complète"],
      tech: ["Wifi 6 Fibre", "2 Smart TV 4K", "Climatisation multi-zones"],
    },
  },

  // =========================================================================
  // 1er étage
  // =========================================================================
  {
    id: "abidjan",
    name: "Abidjan",
    floor: "1er étage",
    type: "F1",
    collection: F1_COLLECTION,
    bedrooms: 1,
    hasSalon: false,
    totalRooms: 1,
    price: 0, // À définir
    sqm: 30,
    capacity: 2,
    image: "/R+3 Int (2).pdf_54 (1).jpg",
    features: ["wifi", "tv", "ac", "safe"],
    desc: "Chambre premium avec vue sur la résidence.",
    history: "L'énergie de la capitale ivoirienne en plein cœur de Cotonou.",
    story:
      "Abidjan incarne le dynamisme et la modernité de la métropole ivoirienne. Au premier étage, cette chambre premium offre une élévation qui filtre le bruit extérieur, pour un confort absolu dans un cadre soigné.",
    advantages: [
      "Hauteur parfaite pour la quiétude et la lumière",
      "Chambre premium avec finitions soignées",
      "Idéale pour voyageur solo ou couple",
      "Rapport qualité-confort exceptionnel",
    ],
    composition: {
      sleeping: ["Lit King Size", "Oreiller à mémoire de forme", "Blackout automatisé"],
      wellness: ["Douche design", "Produits d'accueil haut de gamme"],
      living: ["Espace bureau", "Minibar"],
      tech: ["Wifi 6", "Smart TV", "Climatisation"],
    },
  },
  {
    id: "dubai",
    name: "Dubaï",
    floor: "1er étage",
    type: "F3",
    collection: F3_COLLECTION,
    bedrooms: 2,
    hasSalon: true,
    totalRooms: 3,
    price: 0, // À définir
    sqm: 60,
    capacity: 4,
    image: "/R+3 Int (2).pdf_57.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe", "parking"],
    desc: "Grandeur dubaïote — deux chambres et grand salon.",
    history: "L'opulence du Golfe Persique à Cotonou.",
    story:
      "Dubaï, la cité des records et du faste. Cet appartement 3 pièces du premier étage honore cette réputation : deux chambres somptueuses et un salon de réception qui impressionne. Pour ceux qui refusent les compromis.",
    advantages: [
      "Le plus grand F3 du 1er étage",
      "Salon de réception digne d'un penthouse",
      "Deux chambres entièrement indépendantes",
      "Finitions ultra-premium",
    ],
    composition: {
      sleeping: ["2 Suites parentales King Size", "Literie cinq étoiles"],
      wellness: ["2 Salles de bain complètes", "Baignoire balnéo"],
      living: ["Grand salon 6 places", "Salle à manger de prestige", "Cuisine équipée"],
      tech: ["Wifi 6 Fibre dédiée", "2 Smart TV 4K", "iPad domotique"],
    },
  },
  {
    id: "paris",
    name: "Paris",
    floor: "1er étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 44,
    capacity: 2,
    image: "/R+3 Int (2).pdf_67 (1).jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "L'élégance parisienne dans chaque détail.",
    history: "La Ville Lumière s'installe à La Croisière.",
    story:
      "Paris n'est pas qu'une ville, c'est un art de vivre. Cet appartement du premier étage célèbre le raffinement à la française — lignes épurées, matériaux nobles, atmosphère romantique qui fait de chaque nuit un moment d'exception.",
    advantages: [
      "Décoration française chic et épurée",
      "Salon cosy avec vue dégagée",
      "Ambiance romantique parfaite pour les couples",
      "Cuisine kitchenette tout équipée",
    ],
    composition: {
      sleeping: ["Lit King Size Prestige", "Linge de lit coton peigné"],
      wellness: ["Douche à l'italienne", "Miroir lumineux Hollywood"],
      living: ["Salon design parisien", "Coin repas intime"],
      tech: ["Wifi 6", "Smart TV OLED", "Enceinte Bluetooth"],
    },
  },
  {
    id: "cape-town",
    name: "Cape Town",
    floor: "1er étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 44,
    capacity: 2,
    image: "/R+3 Int (2).pdf_67 (2).jpg",
    features: ["wifi", "tv", "ac", "coffee"],
    desc: "La fraîcheur de l'Atlantique dans un cadre moderne.",
    history: "La perle du Cap s'invite chez vous.",
    story:
      "Inspiré par la magnificence des paysages du Cap en Afrique du Sud, Cape Town conjugue nature, modernité et raffinement. Son salon lumineux et sa chambre cocooning en font l'appartement idéal pour une escapade ressourçante.",
    advantages: [
      "Ambiance nature et modernité",
      "Salon baigné de lumière",
      "Décoration organique apaisante",
      "Idéal pour séjour détente",
    ],
    composition: {
      sleeping: ["Lit King Size Confort", "Oreiller ergonomique"],
      wellness: ["Douche effet pluie", "Produits naturels"],
      living: ["Salon lumineux", "Espace détente"], 
      tech: ["Wifi 6", "Smart TV", "Climatisation"],
    },
  },

  // =========================================================================
  // 2ème étage
  // =========================================================================
  {
    id: "dakar",
    name: "Dakar",
    floor: "2ème étage",
    type: "F1",
    collection: F1_COLLECTION,
    bedrooms: 1,
    hasSalon: false,
    totalRooms: 1,
    price: 0, // À définir
    sqm: 30,
    capacity: 2,
    image: "/R+3 Int (2).pdf_54.jpg",
    features: ["wifi", "tv", "ac", "safe"],
    desc: "Chambre premium avec l'esprit teranga sénégalais.",
    history: "La capitale de l'hospitalité africaine.",
    story:
      "Dakar, ville du Teranga — l'hospitalité en langue wolof. Cette chambre premium au deuxième étage incarne cet esprit d'accueil chaleureux. Compacte mais parfaitement équipée, elle offre tout le nécessaire pour un séjour réussi.",
    advantages: [
      "Chambre premium vue en hauteur",
      "Environnement calme au 2ème étage",
      "Parfait rapport confort/prix",
      "Idéale pour voyageur professionnel",
    ],
    composition: {
      sleeping: ["Lit King Size", "Blackout total"],
      wellness: ["Salle d'eau design", "Produits de toilette premium"],
      living: ["Bureau compact", "Minibar"],
      tech: ["Wifi 6 Haut Débit", "Smart TV", "Climatisation silencieuse"],
    },
  },
  {
    id: "istanbul",
    name: "Istanbul",
    floor: "2ème étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 44,
    capacity: 2,
    image: "/R+3 Int (2).pdf_67 (3).jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Deux continents, un appartement d'exception.",
    history: "Le carrefour Orient-Occident.",
    story:
      "Istanbul, ville-pont entre Orient et Occident, inspire cet appartement au caractère unique. Son salon chaleureux et sa chambre raffinée évoquent les grands palais ottomans, avec tout le confort du XXIe siècle.",
    advantages: [
      "Décoration aux touches ottomanes",
      "Salon avec ambiance feutrée",
      "Vue depuis le 2ème étage",
      "Atmosphère unique entre luxe et tradition",
    ],
    composition: {
      sleeping: ["Lit King Size Prestige", "Linge de lit brodé"],
      wellness: ["Douche hammam sensorielle", "Produits orientaux"],
      living: ["Salon confort 3 places", "Coin repas"],
      tech: ["Wifi 6", "Smart TV", "Système domotique"],
    },
  },
  {
    id: "london",
    name: "London",
    floor: "2ème étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 44,
    capacity: 2,
    image: "/R+3 Int (2).pdf_67 (4).jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "British elegance — sobriété et raffinement.",
    history: "Le style londonien intemporel.",
    story:
      "London emprunte au style londonien sa sobriété élégante, ses matières nobles et son sens du détail. Au deuxième étage, cet appartement offre une atmosphère de club britannique où règnent le bon goût et le confort absolu.",
    advantages: [
      "Style british intemporel et sobre",
      "Salon avec canapé haut de gamme",
      "Chambre feutrée et silencieuse",
      "Idéal pour longs séjours",
    ],
    composition: {
      sleeping: ["Lit King Size", "Couette en duvet"],
      wellness: ["Douche à l'italienne", "Serviettes moelleuses"],
      living: ["Salon british chic", "Bureau de travail"],
      tech: ["Wifi 6 Fibre", "Smart TV OLED", "Enceinte multiroom"],
    },
  },
  {
    id: "new-york",
    name: "New York",
    floor: "2ème étage",
    type: "F3",
    collection: F3_COLLECTION,
    bedrooms: 2,
    hasSalon: true,
    totalRooms: 3,
    price: 0, // À définir
    sqm: 65,
    capacity: 4,
    image: "/R+3 Int (2).pdf_67.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "L'esprit Manhattan — grand format, grande vie.",
    history: "La ville qui ne dort jamais.",
    story:
      "New York, la ville où les rêves deviennent reality. Cet appartement 3 pièces au deuxième étage incarne l'ambition et l'énergie de Manhattan : deux chambres spacieuses, un salon de réception impressionnant, et des finitions qui respirent le succès.",
    advantages: [
      "Plus grand appartement du 2ème étage",
      "Deux chambres séparées pour 4 personnes",
      "Salon de réception style loft new-yorkais",
      "Idéal pour familles ou délégations",
    ],
    composition: {
      sleeping: ["2 Chambres King Size", "Literie premium orthopédique"],
      wellness: ["Salle de bain complète", "Douche à l'américaine"],
      living: ["Salon loft ouvert", "Cuisine américaine", "Salle à manger"],
      tech: ["Wifi 6 Fibre", "2 Smart TV 4K", "Barre de son"],
    },
  },

  // =========================================================================
  // 3ème étage
  // =========================================================================
  {
    id: "shanghai",
    name: "Shanghai",
    floor: "3ème étage",
    type: "F3",
    collection: F3_COLLECTION,
    bedrooms: 2,
    hasSalon: true,
    totalRooms: 3,
    price: 0, // À définir
    sqm: 68,
    capacity: 4,
    image: "/Rooftop Jour.pdf_9 (8).jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe", "parking"],
    desc: "Modernité asiatique au sommet de la résidence.",
    history: "La mégapole du futur à La Croisière.",
    story:
      "Shanghai symbolise l'Asie du XXIe siècle — high-tech, démesurée, éblouissante. Au 3ème étage, cet appartement 3 pièces offre le meilleur panorama de la résidence. Deux chambres lumineuses et un salon ultra-moderne pour une expérience d'exception.",
    advantages: [
      "Vue panoramique depuis le 3ème étage",
      "Finitions ultra-modernes",
      "Deux chambres avec vue",
      "Grand salon design contemporain",
    ],
    composition: {
      sleeping: ["2 Suites King Size panoramiques", "Blackout motorisé"],
      wellness: ["Douche à effet pluie tropicale", "Baignoire balnéo"],
      living: ["Salon panoramique 6 places", "Salle à manger ouverte"],
      tech: ["Wifi 6 Fibre dédiée", "2 Smart TV OLED", "iPad domotique", "Cinéma maison"],
    },
  },
  {
    id: "bangkok",
    name: "Bangkok",
    floor: "3ème étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 46,
    capacity: 2,
    image: "/Rooftop Jour.pdf_9.jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Exotisme thaï et confort en hauteur.",
    history: "La capitale des mille sourires.",
    story:
      "Bangkok allie ferveur culturelle et modernité flamboyante. Cet appartement du 3ème étage capture cet équilibre unique entre l'exotisme des temples dorés et le confort d'un appartement haut de gamme contemporain.",
    advantages: [
      "Vue dégagée depuis le 3ème étage",
      "Ambiance exotique et chaleureuse",
      "Salon confort avec vue",
      "Décoration inspirée de l'Asie du Sud-Est",
    ],
    composition: {
      sleeping: ["Lit King Size Prestige", "Linge de lit bambou"],
      wellness: ["Douche pluie tropicale", "Savons artisanaux"],
      living: ["Salon avec vue dégagée", "Espace repas"],
      tech: ["Wifi 6", "Smart TV 4K", "Système audio Bluetooth"],
    },
  },
  {
    id: "milan",
    name: "Milan",
    floor: "3ème étage",
    type: "F2",
    collection: F2_COLLECTION,
    bedrooms: 1,
    hasSalon: true,
    totalRooms: 2,
    price: 0, // À définir
    sqm: 46,
    capacity: 2,
    image: "/Rooftop Jour.pdf_9 (1).jpg",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "La capitale de la mode et du design.",
    history: "L'esthétique italienne à son sommet.",
    story:
      "Milan, capitale mondiale du design et de la mode. Cet appartement du 3ème étage respire l'esthétique italienne dans chaque détail : mobilier designer, matériaux nobles, lignes pures. Pour ceux qui considèrent le cadre de vie comme un art de vivre.",
    advantages: [
      "Design et mobilier signature",
      "Matériaux et finitions haut de gamme",
      "Vue depuis le 3ème étage",
      "Atmosphère mode et élégante",
    ],
    composition: {
      sleeping: ["Lit King Size Design", "Linge de lit sateen"],
      wellness: ["Douche design italienne", "Produits Armani Guest"],
      living: ["Salon design contemporain", "Coin repas chic"],
      tech: ["Wifi 6 Fibre", "Smart TV OLED", "Enceinte Sonos"],
    },
  },
  {
    id: "silicon-valley",
    name: "Silicon Valley",
    floor: "3ème étage",
    type: "Salle de réunion",
    collection: MEETING_COLLECTION,
    bedrooms: 0,
    hasSalon: false,
    totalRooms: 1,
    price: 0, // À définir
    sqm: 35,
    capacity: 10,
    image: "/Rooftop Jour.pdf_9 (2).jpg",
    features: ["wifi", "tv", "ac", "coffee"],
    desc: "Salle de réunion high-tech au sommet de la résidence.",
    history: "L'innovation au cœur de La Croisière.",
    story:
      "Baptisée Silicon Valley en hommage à la capitale mondiale de l'innovation, cette salle de réunion du 3ème étage est l'espace idéal pour vos réunions d'affaires, présentations et brainstormings. Technologie de pointe et vue dégagée pour des échanges qui font avancer le monde.",
    advantages: [
      "Équipement audiovisuel professionnel",
      "Vue depuis le 3ème étage",
      "Connexion Wifi fibre ultra-rapide",
      "Capacité jusqu'à 10 participants",
    ],
    composition: {
      sleeping: [],
      wellness: [],
      living: ["Grande table de conférence 10 places", "Espace café/accueil"],
      tech: ["Écran interactif 85\"", "Wifi 6 Fibre dédiée", "Visioconférence 4K", "Système audio conférence"],
    },
  },
];

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

export const FLOORS: FloorLevel[] = ["RDC", "1er étage", "2ème étage", "3ème étage"];

export function getApartmentsByFloor(floor: FloorLevel): Apartment[] {
  return APARTMENTS.filter((a) => a.floor === floor);
}

export function getApartmentById(id: string): Apartment | undefined {
  return APARTMENTS.find((a) => a.id === id);
}

export function getApartmentsByType(type: ApartmentType): Apartment[] {
  return APARTMENTS.filter((a) => a.type === type);
}

export const APARTMENT_TYPE_LABELS: Record<ApartmentType, string> = {
  F1: "Chambre Premium",
  F2: "Chambre & Salon",
  F3: "2 Chambres & Salon",
  "Salle de réunion": "Salle de Réunion",
};

export const FLOOR_LABELS: Record<FloorLevel, string> = {
  "RDC": "Rez-de-chaussée",
  "1er étage": "1er Étage",
  "2ème étage": "2ème Étage",
  "3ème étage": "3ème Étage",
};
