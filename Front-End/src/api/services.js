// Données enrichies des services
const servicesData = [
  {
    id: 1,
    title: "Charpente",
    description: "Construction et rénovation de charpentes traditionnelles et modernes",
    longDescription: "Expertise complète en charpente pour tous types de bâtiments. De la conception à la réalisation, nous maîtrisons les techniques traditionnelles et modernes pour vous offrir des solutions durables et esthétiques.",
    icon: "🏗️",
    link: "/services/charpente",
    category: "Construction",
    duration: "2-8 semaines",
    priceRange: "À partir de 15 000€",
    features: [
      "Charpente traditionnelle en bois massif",
      "Charpente moderne avec fermettes",
      "Charpente métallique",
      "Rénovation et renforcement",
      "Traitement contre les insectes",
      "Calcul de résistance aux charges"
    ],
    subServices: [
      {
        name: "Charpente Traditionnelle",
        description: "Construction selon les techniques ancestrales",
        price: "À partir de 25 000€",
        duration: "4-8 semaines"
      },
      {
        name: "Charpente Moderne",
        description: "Fermettes préfabriquées et techniques contemporaines",
        price: "À partir de 15 000€",
        duration: "2-4 semaines"
      },
      {
        name: "Rénovation",
        description: "Réparation et renforcement de charpentes existantes",
        price: "À partir de 8 000€",
        duration: "1-3 semaines"
      }
    ],
    materials: ["Bois de chêne", "Bois de châtaignier", "Bois lamellé-collé", "Acier galvanisé"],
    advantages: [
      "Plus de 10 ans d'expérience",
      "Devis gratuit et détaillé",
      "Travaux garantis 10 ans",
      "Respect des normes DTU",
      "Intervention rapide",
      "Prix compétitifs"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Couverture",
    description: "Installation et réparation de tous types de couvertures",
    longDescription: "Spécialiste en couverture pour garantir l'étanchéité et la durabilité de votre toiture. Nous maîtrisons tous les matériaux et techniques pour vous offrir des solutions adaptées à vos besoins et à votre budget.",
    icon: "🏠",
    link: "/services/couverture",
    category: "Toiture",
    duration: "1-6 semaines",
    priceRange: "À partir de 8 000€",
    features: [
      "Tuiles traditionnelles en terre cuite",
      "Ardoises naturelles et synthétiques",
      "Couverture en zinc",
      "Tôles métalliques",
      "Pose sur volige ou liteaux",
      "Raccordements étanches"
    ],
    subServices: [
      {
        name: "Tuiles Traditionnelles",
        description: "Pose de tuiles canal et plates",
        price: "À partir de 12 000€",
        duration: "3-6 semaines"
      },
      {
        name: "Ardoises",
        description: "Installation d'ardoises naturelles",
        price: "À partir de 18 000€",
        duration: "4-8 semaines"
      },
      {
        name: "Zinc et Métal",
        description: "Couverture métallique moderne",
        price: "À partir de 8 000€",
        duration: "1-3 semaines"
      }
    ],
    materials: ["Tuiles terre cuite", "Ardoises naturelles", "Zinc", "Tôles galvanisées", "PVC"],
    advantages: [
      "Équipe de couvreurs qualifiés",
      "Devis gratuit et détaillé",
      "Garantie décennale",
      "Respect des normes",
      "Intervention d'urgence",
      "Finitions impeccables"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Zinguerie",
    description: "Travaux de zinguerie et d'étanchéité pour votre toiture",
    longDescription: "Expert en zinguerie pour assurer l'étanchéité parfaite de votre toiture. De l'installation de gouttières à la réalisation de chéneaux, nous garantissons des raccordements durables et professionnels.",
    icon: "⚡",
    link: "/services/zinguerie",
    category: "Étanchéité",
    duration: "1-3 jours",
    priceRange: "À partir de 1 500€",
    features: [
      "Installation de gouttières",
      "Réalisation de chéneaux",
      "Raccordements de cheminées",
      "Membranes d'étanchéité",
      "Protection contre les infiltrations",
      "Maintenance préventive"
    ],
    subServices: [
      {
        name: "Gouttières",
        description: "Installation et réparation de gouttières",
        price: "À partir de 1 500€",
        duration: "1-2 jours"
      },
      {
        name: "Chéneaux",
        description: "Raccordements de toitures",
        price: "À partir de 2 500€",
        duration: "2-3 jours"
      },
      {
        name: "Étanchéité",
        description: "Solutions d'étanchéité complètes",
        price: "À partir de 3 000€",
        duration: "2-5 jours"
      }
    ],
    materials: ["Zinc", "PVC", "Aluminium", "Membranes bitumées", "Accessoires"],
    advantages: [
      "Zingueurs qualifiés",
      "Devis gratuit",
      "Garantie 5 ans",
      "Intervention rapide",
      "Matériaux de qualité",
      "Service d'urgence"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "Installation",
    description: "Installation complète de toitures neuves",
    longDescription: "Installation complète de toitures pour constructions neuves. Nous prenons en charge l'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.",
    icon: "🔨",
    link: "/services/installation",
    category: "Construction",
    duration: "3-12 semaines",
    priceRange: "À partir de 25 000€",
    features: [
      "Installation complète de charpente",
      "Pose de couverture",
      "Installation de zinguerie",
      "Isolation thermique",
      "Fenêtres de toit",
      "Finitions intérieures"
    ],
    subServices: [
      {
        name: "Installation Complète",
        description: "Charpente + Couverture + Zinguerie",
        price: "À partir de 25 000€",
        duration: "6-12 semaines"
      },
      {
        name: "Installation Partielle",
        description: "Couverture + Zinguerie",
        price: "À partir de 15 000€",
        duration: "3-6 semaines"
      }
    ],
    materials: ["Bois", "Tuiles", "Zinc", "Isolants", "Accessoires"],
    advantages: [
      "Installation complète",
      "Coordination des corps d'état",
      "Respect des délais",
      "Garantie décennale",
      "Suivi de chantier",
      "Réception des travaux"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    title: "Réparation",
    description: "Réparation et dépannage de toitures",
    longDescription: "Service de réparation et dépannage pour tous types de problèmes de toiture. Intervention rapide pour résoudre les fuites, les dégâts et les problèmes d'étanchéité.",
    icon: "🔧",
    link: "/services/repair",
    category: "Maintenance",
    duration: "1 jour - 1 semaine",
    priceRange: "À partir de 500€",
    features: [
      "Réparation de fuites",
      "Remplacement de tuiles",
      "Réparation de gouttières",
      "Raccordements d'urgence",
      "Diagnostic de problèmes",
      "Intervention rapide"
    ],
    subServices: [
      {
        name: "Réparation d'Urgence",
        description: "Intervention rapide pour fuites",
        price: "À partir de 500€",
        duration: "1 jour"
      },
      {
        name: "Réparation Standard",
        description: "Réparations programmées",
        price: "À partir de 1 000€",
        duration: "2-5 jours"
      }
    ],
    materials: ["Tuiles de remplacement", "Zinc", "Mastics", "Accessoires"],
    advantages: [
      "Intervention d'urgence",
      "Diagnostic gratuit",
      "Réparation garantie",
      "Prix transparents",
      "Équipe disponible",
      "Service 7j/7"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    title: "Maintenance",
    description: "Entretien et maintenance préventive",
    longDescription: "Service de maintenance préventive pour prolonger la durée de vie de votre toiture. Inspections régulières, nettoyage et entretien pour éviter les problèmes futurs.",
    icon: "🛠️",
    link: "/services/maintenance",
    category: "Entretien",
    duration: "1-3 jours",
    priceRange: "À partir de 300€",
    features: [
      "Inspection annuelle",
      "Nettoyage de gouttières",
      "Vérification d'étanchéité",
      "Traitement préventif",
      "Rapport d'inspection",
      "Conseils d'entretien"
    ],
    subServices: [
      {
        name: "Inspection Annuelle",
        description: "Contrôle complet de la toiture",
        price: "À partir de 300€",
        duration: "1 jour"
      },
      {
        name: "Maintenance Complète",
        description: "Inspection + Nettoyage + Entretien",
        price: "À partir de 800€",
        duration: "2-3 jours"
      }
    ],
    materials: ["Produits de nettoyage", "Traitements préventifs", "Accessoires"],
    advantages: [
      "Maintenance préventive",
      "Évite les gros travaux",
      "Prolonge la durée de vie",
      "Rapport détaillé",
      "Conseils personnalisés",
      "Tarifs avantageux"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export const fetchServices = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData;
};

export const getServices = () => {
  return servicesData;
};

export const fetchServiceById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData.find(service => service.id === parseInt(id));
};

export const fetchServiceBySlug = async (slug) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData.find(service => service.link === `/services/${slug}`);
};

export const createService = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id: Date.now() };
};

export const updateService = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id };
};

export const deleteService = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};

export const getServicesByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData.filter(service => service.category === category);
};

export const searchServices = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const lowercaseQuery = query.toLowerCase();
  return servicesData.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.longDescription.toLowerCase().includes(lowercaseQuery)
  );
};
