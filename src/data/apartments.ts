export interface Apartment {
  id: string;
  name: string;
  collection: "The Crown Jewels" | "The Modern Classics" | "The Studios";
  type: "Luxury" | "Premium" | "Standard";
  price: number;
  sqm: number;
  capacity: number;
  image: string;
  features: string[]; // New: ['wifi', 'tv', 'ac', 'coffee', 'safe']
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

export const APARTMENTS: Apartment[] = [
  {
    id: "suite-royale",
    name: "Suite Royale",
    collection: "The Crown Jewels",
    type: "Luxury",
    price: 180000,
    sqm: 65,
    capacity: 4,
    image: "/hero.png",
    features: ["wifi", "tv", "ac", "coffee", "safe", "parking"],
    desc: "Le sommet du raffinement hôtelier à Cotonou.",
    history: "L'apogée du prestige à La Croisière.",
    story: "Franchir le seuil de la Suite Royale, c'est entrer dans une autre dimension du luxe à Cotonou. Pensée comme une demeure de maître, elle déploie des volumes majestueux où chaque détail, des moulures artisanales aux œuvres d'art soigneusement sélectionnées, respire l'excellence.",
    advantages: [
      "Accès exclusif et prioritaire à tous les services",
      "Vaste terrasse privée avec mobilier de designer",
      "Baignoire balnéo pour des moments de détente royale",
      "Majordome digital pour toutes vos requêtes"
    ],
    composition: {
      sleeping: ["Lit King Size Impérial", "Sur-matelas à mémoire de forme", "Blackout automatisé"],
      wellness: ["Baignoire balnéo duo", "Douche sensorielle", "Sels de bain artisanaux"],
      living: ["Vaste salon de réception", "Salle à manger privée", "Cuisine de chef"],
      tech: ["Home Cinéma intégré", "iPad domotique", "Wifi 6 ultra-rapide"]
    }
  },
  {
    id: "suite-ambre",
    name: "Suite Ambre",
    collection: "The Modern Classics",
    type: "Premium",
    price: 120000,
    sqm: 45,
    capacity: 2,
    image: "/living.png",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Une atmosphère chaleureuse inspirée par la pierre d'Ambre.",
    history: "Une signature de pureté et de sérénité.",
    story: "La Suite Ambre n'est pas seulement un lieu de séjour, c'est une expérience sensorielle. Chaque matin, la lumière naturelle traverse les voilages délicats pour révéler les nuances dorées du mobilier, créant une atmosphère qui rappelle la pierre précieuse dont elle porte le nom.",
    advantages: [
      "Calme absolu garanti (insonorisation de pointe)",
      "Vue privilégiée sur les jardins intérieurs",
      "Espace de travail ergonomique",
      "Literie d'exception pour une récupération totale"
    ],
    composition: {
      sleeping: ["Lit King Size Premium", "Linge de lit en coton d'Égypte"],
      wellness: ["Douche effet pluie", "Produits d'accueil organiques"],
      living: ["Salon avec canapé velours", "Espace repas pour 2"],
      tech: ["Wifi 6 Très Haut Débit", "Smart TV 4K", "Enceinte Bluetooth"]
    }
  },
  {
    id: "suite-ivoire",
    name: "Suite Ivoire",
    collection: "The Crown Jewels",
    type: "Luxury",
    price: 175000,
    sqm: 60,
    capacity: 2,
    image: "/hero.png",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Pureté chromatique et douceur de vivre.",
    history: "Un hommage à la pureté hôtelière.",
    story: "La Suite Ivoire célèbre la clarté. Tout ici a été pensé pour apaiser l'esprit par des nuances de blanc et de crème, créant un espace de respiration rare en milieu urbain.",
    advantages: ["Luminosité exceptionnelle", "Salle de bain en marbre blanc", "Silence absolu"],
    composition: {
      sleeping: ["Vaste lit King Size"], wellness: ["Baignoire majestueuse"], living: ["Séjour baigné de lumière"], tech: ["Wifi 6 Fibre"]
    }
  },
  {
    id: "suite-ebene",
    name: "Suite Ébène",
    collection: "The Modern Classics",
    type: "Premium",
    price: 140000,
    sqm: 48,
    capacity: 2,
    image: "/living.png",
    features: ["wifi", "tv", "ac", "safe"],
    desc: "Élégance sombre et matériaux nobles.",
    history: "Une célébration de l'élégance nocturne.",
    story: "Inspirée par le bois précieux, la Suite Ébène offre un contraste saisissant avec la lumière de Cotonou. C'est un espace de caractère pour les esthètes.",
    advantages: ["Matériaux nobles (bois d'ébène)", "Éclairage d'ambiance tamisé", "Confort acoustique"],
    composition: {
      sleeping: ["Lit Queen Size Premium"], wellness: ["Douche à l'italienne"], living: ["Espace salon design"], tech: ["Wifi 6 Haut Débit"]
    }
  },
  {
    id: "suite-lagon",
    name: "Suite Lagon",
    collection: "The Modern Classics",
    type: "Premium",
    price: 130000,
    sqm: 45,
    capacity: 2,
    image: "/exterior.png",
    features: ["wifi", "tv", "ac", "coffee"],
    desc: "Une escale rafraîchissante aux tons bleutés.",
    history: "L'évocation de l'océan à chaque instant.",
    story: "La Suite Lagon invite au voyage maritime. Ses nuances de bleu et de turquoise créent un univers rafraîchissant unique.",
    advantages: ["Décoration thématique apaisante", "Proximité avec le Rooftop", "Espace optimisé"],
    composition: {
      sleeping: ["Lit confort"], wellness: ["Douche effet pluie"], living: ["Salon cosy"], tech: ["Smart TV"]
    }
  },
  {
    id: "suite-horizon",
    name: "Suite Horizon",
    collection: "The Crown Jewels",
    type: "Luxury",
    price: 195000,
    sqm: 70,
    capacity: 4,
    image: "/room.png",
    features: ["wifi", "tv", "ac", "safe", "parking"],
    desc: "Une perspective unique sur l'horizon de Cotonou.",
    history: "La ville à vos pieds.",
    story: "Dominant la résidence, la Suite Horizon offre des vues spectaculaires. C'est l'appartement idéal pour contempler la ville en mouvement.",
    advantages: ["Vue panoramique", "Grande terrasse privée", "Deux chambres séparées"],
    composition: {
      sleeping: ["2 Chambres de Maître"], wellness: ["2 Salles de bain"], living: ["Vaste salon"], tech: ["Wifi 6 Fibre"]
    }
  },
  {
    id: "suite-saphir",
    name: "Suite Saphir",
    collection: "The Modern Classics",
    type: "Premium",
    price: 125000,
    sqm: 45,
    capacity: 2,
    image: "/living.png",
    features: ["wifi", "tv", "ac", "coffee"],
    desc: "Le raffinement du bleu profond.",
    history: "Un cocon de velours.",
    story: "La Suite Saphir est un refuge de tranquillité, où le bleu saphir invite à la méditation et au repos profond.",
    advantages: ["Ambiance feutrée", "Literie premium", "Calme absolu"],
    composition: {
      sleeping: ["Lit Queen Size"], wellness: ["Douche design"], living: ["Salon élégant"], tech: ["Wifi 6"]
    }
  },
  {
    id: "suite-emeraude",
    name: "Suite Émeraude",
    collection: "The Modern Classics",
    type: "Premium",
    price: 130000,
    sqm: 45,
    capacity: 2,
    image: "/room.png",
    features: ["wifi", "tv", "ac", "safe"],
    desc: "Un écrin de verdure urbaine.",
    history: "La nature au cœur du béton.",
    story: "Avec sa décoration organique, la Suite Émeraude est une respiration végétale indispensable.",
    advantages: ["Plantes naturelles", "Décoration organique", "Fraîcheur naturelle"],
    composition: {
      sleeping: ["Lit Queen Size"], wellness: ["Douche sensorielle"], living: ["Espace ouvert"], tech: ["Wifi 6"]
    }
  },
  {
    id: "suite-rubis",
    name: "Suite Rubis",
    collection: "The Modern Classics",
    type: "Premium",
    price: 145000,
    sqm: 50,
    capacity: 2,
    image: "/living.png",
    features: ["wifi", "tv", "ac", "coffee", "safe"],
    desc: "Passion et confort ardent.",
    history: "Le caractère du rouge rubis.",
    story: "Audacieuse et chaleureuse, la Suite Rubis est destinée à ceux qui aiment les ambiances fortes et le confort sans compromis.",
    advantages: ["Design audacieux", "Espace généreux", "Éclairage modulable"],
    composition: {
      sleeping: ["Lit King Size"], wellness: ["Grande douche"], living: ["Salon de réception"], tech: ["Wifi 6"]
    }
  },
  {
    id: "suite-topaze",
    name: "Suite Topaze",
    collection: "The Studios",
    type: "Standard",
    price: 95000,
    sqm: 38,
    capacity: 2,
    image: "/exterior.png",
    features: ["wifi", "tv", "ac"],
    desc: "Éclatante et fonctionnelle.",
    history: "L'efficacité sans sacrifier le luxe.",
    story: "Idéale pour les courts séjours, la Suite Topaze offre tout le nécessaire dans un format brillant et optimisé.",
    advantages: ["Prix compétitif", "Format compact efficace", "Mobilier intelligent"],
    composition: {
      sleeping: ["Lit double hôtelier"], wellness: ["Salle d'eau moderne"], living: ["Kitchenette"], tech: ["Wifi 6"]
    }
  },
  {
    id: "studio-zen",
    name: "Studio Zen",
    collection: "The Studios",
    type: "Standard",
    price: 85000,
    sqm: 35,
    capacity: 2,
    image: "/room.png",
    features: ["wifi", "tv", "ac", "safe"],
    desc: "Cocon de sérénité pour affaires.",
    history: "Le calme pour se concentrer.",
    story: "Pensé pour le voyageur d'affaires, le Studio Zen élimine le superflu pour se concentrer sur l'essentiel : le repos et l'efficacité.",
    advantages: ["Bureau ergonomique", "Insonorisation totale", "Prix studio"],
    composition: {
      sleeping: ["Lit grand confort"], wellness: ["Douche moderne"], living: ["Studio optimisé"], tech: ["Wifi 6"]
    }
  },
  {
    id: "suite-perle",
    name: "Suite Perle",
    collection: "The Crown Jewels",
    type: "Luxury",
    price: 210000,
    sqm: 75,
    capacity: 4,
    image: "/hero.png",
    features: ["wifi", "tv", "ac", "coffee", "safe", "parking"],
    desc: "Une rareté absolue et design organique.",
    history: "La perle de La Croisière.",
    story: "Suite d'exception aux lignes courbes, la Suite Perle offre une expérience architecturale unique et un service de conciergerie dédié.",
    advantages: ["Service de conciergerie", "Volumes uniques", "Prestige maximum"],
    composition: {
      sleeping: ["2 Master Bedrooms"], wellness: ["Baignoire SPA"], living: ["Salon incurvé"], tech: ["Cinéma privé"]
    }
  },
  {
    id: "suite-cristal",
    name: "Suite Cristal",
    collection: "The Crown Jewels",
    type: "Luxury",
    price: 200000,
    sqm: 72,
    capacity: 4,
    image: "/room.png",
    features: ["wifi", "tv", "ac", "coffee", "safe", "parking"],
    desc: "Transparence et luxe cristallin.",
    history: "La clarté absolue.",
    story: "Un appartement baigné de reflets, où le verre et les matériaux nobles créent une atmosphère d'une pureté rare.",
    advantages: ["Luminosité maximale", "2 Suites parentales", "Design high-tech"],
    composition: {
      sleeping: ["2 Suites parentales"], wellness: ["Douches XXL"], living: ["Séjour ouvert"], tech: ["Fibre dédiée"]
    }
  },
  {
    id: "suite-marina",
    name: "Suite Marina",
    collection: "The Modern Classics",
    type: "Premium",
    price: 135000,
    sqm: 50,
    capacity: 2,
    image: "/exterior.png",
    features: ["wifi", "tv", "ac", "coffee"],
    desc: "Inspirée par la mer et la lumière.",
    history: "Le port d'attache parfait.",
    story: "Avec sa décoration boisée et ses touches marines, la Suite Marina est une invitation permanente à la détente.",
    advantages: ["Ambiance portuaire de luxe", "Espace aéré", "Mobilier bois noble"],
    composition: {
      sleeping: ["Chambre Queen Size"], wellness: ["Salle de bain élégante"], living: ["Salon ouvert"], tech: ["Wifi 6"]
    }
  }
];
