import { apiClient } from './apiClient';

// Get all services
export const getServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data || response;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Get service by slug
export const fetchServiceBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/services/${slug}`);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return null;
  }
};

// Create service (admin only)
export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post('/admin/services', serviceData);
    return response;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update service (admin only)
export const updateService = async (id, serviceData) => {
  try {
    const response = await apiClient.put(`/admin/services/${id}`, serviceData);
    return response;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete service (admin only)
export const deleteService = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/services/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

export const getServicesByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/services/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services by category:', error);
    return [];
  }
};

export const searchServices = async (query) => {
  try {
    const response = await apiClient.get(`/services/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search services');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching services:', error);
    return [];
  }
};

// Mock data for services when API is not available
export const getMockServices = () => {
  return [
    {
      id: 1,
      title: "Installation",
      description: "Installation complète de toitures neuves",
      long_description: "Installation complète de toitures pour constructions neuves. Nous prenons en charge l'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.",
      icon: "🔨",
      slug: "installation",
      category: "Construction",
      duration: "3-12 semaines",
      price_range: "À partir de 25 000€",
      features: [
        "Installation complète de charpente",
        "Pose de couverture",
        "Installation de zinguerie",
        "Isolation thermique",
        "Fenêtres de toit",
        "Finitions intérieures"
      ],
      sub_services: [
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
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      is_active: true,
      sort_order: 1
    },
    {
      id: 2,
      title: "Réparation",
      description: "Réparation et dépannage de toitures",
      long_description: "Service de réparation et dépannage pour tous types de problèmes de toiture. Intervention rapide pour résoudre les fuites, les dégâts et les problèmes d'étanchéité.",
      icon: "🔧",
      slug: "reparation",
      category: "Maintenance",
      duration: "1 jour - 1 semaine",
      price_range: "À partir de 500€",
      features: [
        "Réparation de fuites",
        "Remplacement de tuiles",
        "Réparation de gouttières",
        "Raccordements d'urgence",
        "Diagnostic de problèmes",
        "Intervention rapide"
      ],
      sub_services: [
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
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      is_active: true,
      sort_order: 2
    },
    {
      id: 3,
      title: "Entretien",
      description: "Entretien et maintenance préventive",
      long_description: "Service de maintenance préventive pour prolonger la durée de vie de votre toiture. Inspections régulières, nettoyage et entretien pour éviter les problèmes futurs.",
      icon: "🛠️",
      slug: "entretien",
      category: "Entretien",
      duration: "1-3 jours",
      price_range: "À partir de 300€",
      features: [
        "Inspection annuelle",
        "Nettoyage des gouttières",
        "Vérification de l'étanchéité",
        "Entretien des accessoires",
        "Rapport détaillé",
        "Conseils personnalisés"
      ],
      sub_services: [
        {
          name: "Entretien Annuel",
          description: "Inspection complète et nettoyage",
          price: "À partir de 300€",
          duration: "1 jour"
        },
        {
          name: "Entretien Bisannuel",
          description: "Entretien deux fois par an",
          price: "À partir de 500€",
          duration: "2 jours"
        }
      ],
      materials: ["Produits de nettoyage", "Accessoires de remplacement"],
      advantages: [
        "Prévention des problèmes",
        "Prolongation de la durée de vie",
        "Économies à long terme",
        "Tranquillité d'esprit",
        "Service personnalisé",
        "Garantie de satisfaction"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      is_active: true,
      sort_order: 3
    }
  ];
};
