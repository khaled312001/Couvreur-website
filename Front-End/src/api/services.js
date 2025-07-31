// Données enrichies des services
const servicesData = [
  {
    id: 1,
    title: "Installation",
    description: "Installation complète de toitures neuves",
    longDescription: "Installation complète de toitures pour constructions neuves. Nous prenons en charge l'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.",
    icon: "🔨",
    link: "/services/installation",
    
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
       
      },
      {
        name: "Installation Partielle",
        description: "Couverture + Zinguerie",
        
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
    id: 2,
    title: "Réparation",
    description: "Réparation et dépannage de toitures",
    longDescription: "Service de réparation et dépannage pour tous types de problèmes de toiture. Intervention rapide pour résoudre les fuites, les dégâts et les problèmes d'étanchéité.",
    icon: "🔧",
    link: "/services/repair",
   
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
       
      },
      {
        name: "Réparation Standard",
        description: "Réparations programmées",
        
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
    id: 3,
    title: "Entretien",
    description: "Entretien et maintenance préventive",
    longDescription: "Service de maintenance préventive pour prolonger la durée de vie de votre toiture. Inspections régulières, nettoyage et entretien pour éviter les problèmes futurs.",
    icon: "🛠️",
    link: "/services/maintenance",
    
   
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
       
      },
      {
        name: "Maintenance Complète",
        description: "Inspection + Nettoyage + Entretien",
       
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
