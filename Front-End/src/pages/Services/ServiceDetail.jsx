import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/imageUtils';
import { fetchServiceBySlug } from '../../api/services';

// Function to get the correct image URL for services
const getServiceImageUrl = (imagePath) => {
  if (!imagePath || imagePath === '' || imagePath === null) {
    return null;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, construct the full URL
  // Use the API route to serve images
  const baseUrl = 'https://api.bnbatiment.com/api';
  return `${baseUrl}${imagePath}`;
};
import { Phone, Clock, ArrowRight, MapPin, CheckCircle, Wrench, Shield, Target, Building, Users, Zap } from 'lucide-react';
import { getIconComponent } from '../../utils/iconMapping';
import SEO from '../../components/SEO';
import '../../styles/service-details.css';
import OptimizedImage from '../../components/OptimizedImage';

const servicesData = {
  charpente: {
    id: 1,
    title: "Charpente traditionnelle et moderne",
    subtitle: "Construction et rénovation de charpentes",
    description:
      "Expertise en construction et rénovation de charpentes traditionnelles et modernes",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Charpente traditionnelle en bois",
      "Charpente moderne en métal",
      "Rénovation de charpente existante",
      "Renforcement de structure",
      "Installation de poutres",
      "Finitions intérieures",
    ],
    advantages: [
      "Expertise en charpente",
      "Matériaux de qualité",
      "Garantie décennale",
      "Respect des normes",
      "Suivi des travaux",
      "Réception des travaux",
    ],
    process: [
      {
        step: 1,
        title: "Étude et Devis",
        description:
          "Analyse de votre projet et établissement d'un devis détaillé",
        icon: <Target size={24} />,
      },
      {
        step: 2,
        title: "Planification",
        description: "Organisation du chantier et coordination des équipes",
        icon: <Clock size={24} />,
      },
      {
        step: 3,
        title: "Exécution",
        description: "Réalisation des travaux selon les normes en vigueur",
        icon: <Wrench size={24} />,
      },
      {
        step: 4,
        title: "Réception",
        description: "Contrôle qualité et réception des travaux",
        icon: <CheckCircle size={24} />,
      },
    ],
  },

  couverture: {
    id: 2,
    title: "Couverture traditionnelle",
    subtitle: "Installation et réparation de toitures",
    description:
      "Expertise en tous types de couvertures traditionnelles et modernes",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Tuiles traditionnelles",
      "Ardoises naturelles",
      "Couvertures métalliques",
      "Raccordements étanches",
      "Finitions professionnelles",
      "Maintenance préventive",
    ],
    advantages: [
      "Plus de 10 ans d'expérience",
      "Devis gratuit et détaillé",
      "Travaux garantis",
      "Respect des normes en vigueur",
      "Intervention rapide",
      "Prix compétitifs",
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description:
          "Appel ou formulaire pour comprendre vos besoins en couverture",
        icon: <Phone size={24} />,
      },
      {
        step: 2,
        title: "Visite technique",
        description:
          "Inspection de votre toiture et analyse des matériaux nécessaires",
        icon: <MapPin size={24} />,
      },
      {
        step: 3,
        title: "Validation du projet",
        description:
          "Signature du devis et planification des travaux de couverture",
        icon: <CheckCircle size={24} />,
      },
      {
        step: 4,
        title: "Réalisation",
        description:
          "Exécution des travaux de couverture avec suivi qualité",
        icon: <Wrench size={24} />,
      },
    ],
  },

  // 🔹 Ajoute ici zinguerie, installation, repair, maintenance, extras
  // (ils suivent le même modèle que charpente et couverture)

  'reparation-des-fuites': {
    id: 8,
    title: "Réparation des fuites",
    subtitle: "Recherche et Recherche et réparation des fuitesurgent.",
    description: "Nous intervenons rapidement pour détecter et réparer toute fuite sur votre toiture, garantissant l’étanchéité et la durabilité de votre habitation.",
    heroImage: "https://www.toiture-sos.com/wp-content/uploads/sites/6/2021/08/Un-pare-feuilles-pour-les-goutti%C3%A8res.jpg",
    image: "https://www.toiture-sos.com/wp-content/uploads/sites/6/2021/08/Un-pare-feuilles-pour-les-goutti%C3%A8res.jpg",
    price: "100-200",
    features: [
      "Détection de fuite",
      "Réparation immédiate",
      "Garantie sur l’intervention"
    ],
    advantages: [
      "Intervention rapide",
      "Techniciens expérimentés",
      "Matériel professionnel"
    ],
    process: [
      {
        step: 1,
        title: "Diagnostic",
        description: "Inspection de la toiture et localisation précise de la fuite",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Réparation",
        description: "Mise en œuvre de la réparation adaptée à la nature de la fuite",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Contrôle",
        description: "Vérification de l’étanchéité après intervention",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'demoussage': {
    id: 9,
    title: "Démoussage de toiture",
    subtitle: "Nettoyage professionnel de votre toiture",
    description: "Élimination des mousses, lichens et saletés pour prolonger la durée de vie de votre toiture.",
    heroImage: "https://www.toiture-ravalement-fortin.fr/skins/default/images/img/banner-nettoyage-demoussage.jpg",
    image: "https://www.toiture-ravalement-fortin.fr/skins/default/images/img/banner-nettoyage-demoussage.jpg",
    price: "Sur devis",
    features: [
      "Nettoyage haute pression",
      "Traitement anti-mousse",
      "Protection hydrofuge"
    ],
    advantages: [
      "Toiture saine",
      "Prévention des infiltrations",
      "Équipe expérimentée"
    ],
    process: [
      {
        step: 1,
        title: "Inspection",
        description: "Évaluation de l’état de la toiture",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Nettoyage",
        description: "Élimination des mousses et saletés",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Traitement",
        description: "Application d’un traitement protecteur",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'nettoyage': {
    id: 10,
    title: "Nettoyage de toiture",
    subtitle: "Service complet de nettoyage et entretien",
    description: "Nettoyage en profondeur de votre toiture pour garantir sa longévité et son esthétique.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Nettoyage manuel ou mécanique",
      "Désincrustation des saletés",
      "Contrôle de l’étanchéité"
    ],
    advantages: [
      "Toiture propre",
      "Prévention des dégâts",
      "Intervention rapide"
    ],
    process: [
      {
        step: 1,
        title: "Préparation",
        description: "Mise en sécurité du chantier",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Nettoyage",
        description: "Nettoyage complet de la toiture",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Contrôle final",
        description: "Vérification de la propreté et de l’étanchéité",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'gouttieres': {
    id: 11,
    title: "Installation de gouttières",
    subtitle: "Pose et réparation de gouttières en zinc et PVC",
    description: "Installation, réparation et entretien de gouttières pour une évacuation optimale des eaux pluviales.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Pose de gouttières",
      "Réparation de fuites",
      "Nettoyage des conduits"
    ],
    advantages: [
      "Évacuation efficace",
      "Matériaux de qualité",
      "Garantie sur la pose"
    ],
    process: [
      {
        step: 1,
        title: "Étude du besoin",
        description: "Analyse de la toiture et des descentes",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Installation ou réparation",
        description: "Pose ou réparation des gouttières",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Vérification",
        description: "Test d’étanchéité et nettoyage final",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'isolation': {
    id: 12,
    title: "Isolation de combles",
    subtitle: "Isolation thermique et phonique de vos combles",
    description: "Améliorez le confort de votre maison et réalisez des économies d’énergie grâce à une isolation performante.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Isolation thermique",
      "Isolation phonique",
      "Matériaux écologiques"
    ],
    advantages: [
      "Confort accru",
      "Économies d’énergie",
      "Valorisation du bien"
    ],
    process: [
      {
        step: 1,
        title: "Diagnostic",
        description: "Évaluation des besoins d’isolation",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Mise en œuvre",
        description: "Pose des matériaux isolants",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Contrôle qualité",
        description: "Vérification de la performance de l’isolation",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'fenetres': {
    id: 13,
    title: "Fenêtres de toit",
    subtitle: "Installation et remplacement de velux et fenêtres de toit",
    description: "Pose de fenêtres de toit pour plus de lumière naturelle et une meilleure aération.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Pose de velux",
      "Remplacement de fenêtres",
      "Étanchéité garantie"
    ],
    advantages: [
      "Plus de lumière",
      "Aération optimale",
      "Finitions soignées"
    ],
    process: [
      {
        step: 1,
        title: "Étude du projet",
        description: "Analyse de la toiture et des besoins",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Installation",
        description: "Pose ou remplacement des fenêtres de toit",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Finitions",
        description: "Contrôle de l’étanchéité et finitions",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'installation': {
    id: 14,
    title: "Installation de toiture",
    subtitle: "Installation complète de toitures neuves",
    description: "Installation complète de toitures pour constructions neuves. Nous prenons en charge l'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Installation complète de charpente",
      "Pose de couverture",
      "Installation de zinguerie",
      "Isolation thermique",
      "Fenêtres de toit",
      "Finitions intérieures"
    ],
    advantages: [
      "Installation complète",
      "Coordination des corps d'état",
      "Respect des délais",
      "Garantie décennale",
      "Suivi de chantier",
      "Réception des travaux"
    ],
    process: [
      {
        step: 1,
        title: "Étude et Devis",
        description: "Analyse de votre projet et établissement d'un devis détaillé",
        icon: <Target size={24} />
      },
      {
        step: 2,
        title: "Planification",
        description: "Organisation du chantier et coordination des équipes",
        icon: <Clock size={24} />
      },
      {
        step: 3,
        title: "Exécution",
        description: "Réalisation des travaux selon les normes en vigueur",
        icon: <Wrench size={24} />
      },
      {
        step: 4,
        title: "Réception",
        description: "Contrôle qualité et réception des travaux",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'zinguerie': {
    id: 15,
    title: "Zinguerie",
    subtitle: "Installation et réparation de zinguerie",
    description: "Installation et réparation de tous types de zinguerie pour assurer l'étanchéité de votre toiture.",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695b5c3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1581578731548-c64695b5c3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Pose de zinguerie",
      "Réparation de fuites",
      "Raccordements étanches",
      "Finitions professionnelles",
      "Maintenance préventive",
      "Garantie décennale"
    ],
    advantages: [
      "Expertise en zinguerie",
      "Matériaux de qualité",
      "Intervention rapide",
      "Prix compétitifs",
      "Garantie sur les travaux",
      "Service personnalisé"
    ],
    process: [
      {
        step: 1,
        title: "Diagnostic",
        description: "Inspection de la zinguerie existante et identification des besoins",
        icon: <MapPin size={24} />
      },
      {
        step: 2,
        title: "Installation/Réparation",
        description: "Pose ou réparation de la zinguerie selon les normes",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Contrôle",
        description: "Vérification de l'étanchéité et finitions",
        icon: <CheckCircle size={24} />
      }
    ]
  },
  'test-updated-service': {
    id: 16,
    title: "Test Updated Service",
    subtitle: "Service de test pour vérifier les mises à jour",
    description: "Ce service est utilisé pour tester les mises à jour et les nouvelles fonctionnalités du site.",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Test de fonctionnalités",
      "Vérification des mises à jour",
      "Contrôle qualité",
      "Optimisation des performances",
      "Tests de compatibilité",
      "Validation des nouvelles fonctionnalités"
    ],
    advantages: [
      "Service de test",
      "Validation des mises à jour",
      "Contrôle qualité",
      "Tests complets",
      "Documentation",
      "Support technique"
    ],
    process: [
      {
        step: 1,
        title: "Analyse",
        description: "Analyse des besoins de test et des fonctionnalités à vérifier",
        icon: <Target size={24} />
      },
      {
        step: 2,
        title: "Test",
        description: "Exécution des tests et validation des fonctionnalités",
        icon: <Wrench size={24} />
      },
      {
        step: 3,
        title: "Validation",
        description: "Contrôle qualité et validation des résultats",
        icon: <CheckCircle size={24} />
      }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get service image based on title with professional French roofing images
  const getServiceImage = (serviceTitle) => {
    const title = serviceTitle.toLowerCase();
    
    // Use local service images from API
    if (title.includes('installation') || title.includes('pose')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754239886_installation%20toiture.jpg';
    } else if (title.includes('réparation') || title.includes('reparation') || title.includes('fuite')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240415_r%C3%A9paration%20de%20fuite.jpg';
    } else if (title.includes('entretien')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240526_entretien.webp';
    } else if (title.includes('démoussage') || title.includes('demoussage')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240626_d%C3%A9mousage.jpg';
    } else if (title.includes('nettoyage')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754240785_nettoyage.webp';
    } else if (title.includes('charpente') || title.includes('structure')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg';
    } else if (title.includes('zinguerie') || title.includes('zinc')) {
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg';
    } else {
      // Default professional French roofing image
      return 'https://api.bnbatiment.com/Back-End/public/uploads/services/1754237525_images.jpg';
    }
  };

  // SEO Data for Service Detail Page
  const getSeoData = (service) => {
    if (!service) return {
      title: "Service BN BÂTIMENT - Charpente Couverture Zinguerie Paris",
      description: "Découvrez nos services de charpente, couverture et zinguerie à Paris. Expert toiture certifié. Devis gratuit. Intervention 24h/24.",
      keywords: "service charpente, service couverture, service zinguerie, expert toiture Paris, devis gratuit, intervention 24h",
      url: `/services/${slug}`,
      image: "/logo.png"
    };

    const serviceKeywords = {
      installation: `installation toiture, pose toiture, remplacement toiture, installation couverture, installation tuiles, installation ardoises, installation zinc, installation cuivre, installation PVC, installation aluminium, installation acier, installation inox, installation titane, installation composite, installation bitume, installation membrane, installation étanchéité, installation ventilation, installation écran sous-toiture, installation pare-vapeur, installation liteaux, installation volige, installation chevrons, installation pannes, installation fermes, installation poutres, installation solives, installation plancher, installation escalier, installation terrasse, installation pergola, installation abri jardin, installation cabane, installation chalet, installation maison ossature bois, installation construction bois, installation rénovation bois, installation traitement bois, installation lasure, installation peinture bois, installation protection bois, installation anti-termites, installation anti-fongique, installation hydrofuge, installation oléofuge, installation saturateur, installation vernis, installation enduit, installation crépis, installation ravalement façade, installation rénovation façade, installation nettoyage façade, installation hydrogommage, installation sablage, installation gommage, installation ponçage, devis gratuit, prix installation, tarifs installation, intervention urgence, couvreur Lyon, expert toiture Lyon, charpente Lyon, zinguerie Lyon, gouttières Lyon, isolation toiture, étanchéité toiture, ventilation toiture, Rhône-Alpes, département Rhône, zone intervention Lyon, proximité Lyon, artisan local Lyon, entreprise locale Lyon,
installation toiture Montpellier, installation toiture Nîmes, installation toiture Avignon, installation toiture Orange, installation toiture Carpentras, installation toiture Uzès, installation toiture Alès, installation toiture Béziers, installation toiture Perpignan, installation toiture Carcassonne, installation toiture Toulouse, installation toiture Bordeaux, installation toiture Agen, installation toiture Périgueux, installation toiture Brive-la-Gaillarde, installation toiture Limoges, installation toiture Guéret, installation toiture Moulins, installation toiture Nevers, installation toiture Bourges, installation toiture Châteauroux, installation toiture Orléans, installation toiture Tours, installation toiture Blois, installation toiture Chartres, installation toiture Évreux, installation toiture Rouen, installation toiture Caen, installation toiture Cherbourg, installation toiture Saint-Lô, installation toiture Rennes, installation toiture Brest, installation toiture Quimper, installation toiture Lorient, installation toiture Vannes, installation toiture Angers, installation toiture Le Mans, installation toiture Laval, installation toiture Nantes, installation toiture La Rochelle, installation toiture Poitiers, installation toiture Angoulême, installation toiture Niort, installation toiture Rochefort, installation toiture Cognac, installation toiture Saintes, installation toiture Barbezieux, installation toiture Jonzac, installation toiture Royan, installation toiture Marennes, installation toiture Oléron, installation toiture Ré, installation toiture Île de Ré,
toiture traditionnelle, toiture moderne, toiture contemporaine, toiture plate, toiture inclinée, toiture pentue, toiture en pente, toiture mansardée, toiture à quatre pans, toiture monopente, toiture métallique, toiture en tôle, toiture en bac acier, toiture en tuiles mécaniques, toiture en tuiles canal, toiture en tuiles plates, toiture en ardoise naturelle, toiture en ardoise fibre-ciment, toiture en chaume, toiture végétalisée, toiture en shingle, toiture en PVC, toiture en membrane EPDM, toiture synthétique, toiture composite, toiture ventilée, isolation thermique toiture, rénovation énergétique toiture, étanchéité toiture plate, étanchéité toiture terrasse, étanchéité toiture accessible, étanchéité toiture inaccessible, accessibilité toiture, sécurité toiture, protection toiture, préservation toiture, beauté toiture, esthétique toiture, harmonie toiture, intégration toiture, design toiture, architecture toiture, style toiture, modernisation toiture`,
      reparation: `réparation fuites, réparation infiltration toiture, réparation fuite toiture, détection fuite toiture, réparation rapide fuite toiture, réparation couverture, réparation tuiles, réparation ardoises, réparation zinc, réparation cuivre, réparation PVC, réparation aluminium, réparation acier, réparation inox, réparation titane, réparation composite, réparation bitume, réparation membrane, réparation étanchéité, réparation ventilation, réparation écran sous-toiture, réparation pare-vapeur, réparation liteaux, réparation volige, réparation chevrons, réparation pannes, réparation fermes, réparation poutres, réparation solives, réparation plancher, réparation escalier, réparation terrasse, réparation pergola, réparation abri jardin, réparation cabane, réparation chalet, réparation maison ossature bois, réparation construction bois, réparation rénovation bois, réparation traitement bois, réparation lasure, réparation peinture bois, réparation protection bois, réparation anti-termites, réparation anti-fongique, réparation hydrofuge, réparation oléofuge, réparation saturateur, réparation vernis, réparation enduit, réparation crépis, réparation ravalement façade, réparation rénovation façade, réparation nettoyage façade, réparation hydrogommage, réparation sablage, réparation gommage, réparation ponçage, devis gratuit, prix réparation, tarifs réparation, intervention urgence, couvreur Lyon, expert toiture Lyon,
réparation fuites Nîmes, réparation fuites Montpellier, réparation fuites Avignon, réparation fuites Orange, réparation fuites Carpentras, réparation fuites Toulouse, réparation fuites Bordeaux, réparation fuites Agen, réparation fuites Strasbourg, réparation fuites Mulhouse, réparation fuites Colmar, réparation fuites Metz, réparation fuites Nancy, réparation fuites Épinal, réparation fuites Besançon, réparation fuites Belfort, réparation fuites Chalon-sur-Saône, réparation fuites Mâcon, réparation fuites Bourg-en-Bresse, réparation fuites Annecy, réparation fuites Chambéry, réparation fuites Albertville, réparation fuites Aix-les-Bains, réparation fuites Voiron, réparation fuites Bourgoin-Jallieu, réparation fuites Vienne, réparation fuites Roussillon, réparation fuites Beaurepaire, réparation fuites Beaumont-Monteux, réparation fuites Montélimar, réparation fuites Bollène, réparation fuites Pierrelatte, réparation fuites Tricastin, réparation fuites Donzère, réparation fuites Mondragon, réparation fuites Lapalud, réparation fuites Lamastre, réparation fuites Saint-Péray, réparation fuites Aubenas, réparation fuites Vals-les-Bains, réparation fuites Largentière, réparation fuites Joyeuse, réparation fuites Vallon-Pont-d'Arc, réparation fuites Les Vans,
urgence toiture, dépannage toiture, intervention express, réparation d'urgence, fuite eau urgence, infiltration urgence, dégât des eaux, dégâts des eaux, trace humidité, trace infiltration, trace fuite, tache eau plafond, tache humidité mur, décollement papier peint, gondolement parquet, pourriture charpente, détérioration charpente, moisissure charpente, champignon bois, mérule, pourriture sèche, pourriture humide, termites, capricornes, vrillettes, insectes xylophages, parasites bois, traitement bois, traitement charpente, injection charpente, curetage charpente, remplacement pièces charpente, renforcement charpente, consolidation charpente, renfort charpente, surélévation charpente, modification charpente, aménagement charpente, isolation charpente, ventilation charpente, étanchéité charpente, protection charpente, préservation charpente, conservation charpente, rénovation charpente, restauration charpente`,
      entretien: `entretien toiture, maintenance toiture, entretien régulier toiture, prolonger durée vie toiture, entretien couverture, entretien tuiles, entretien ardoises, entretien zinc, entretien cuivre, entretien PVC, entretien aluminium, entretien acier, entretien inox, entretien titane, entretien composite, entretien bitume, entretien membrane, entretien étanchéité, entretien ventilation, entretien écran sous-toiture, entretien pare-vapeur, entretien liteaux, entretien volige, entretien chevrons, entretien pannes, entretien fermes, entretien poutres, entretien solives, entretien plancher, entretien escalier, entretien terrasse, entretien pergola, entretien abri jardin, entretien cabane, entretien chalet, entretien maison ossature bois, entretien construction bois, entretien rénovation bois, entretien traitement bois, entretien lasure, entretien peinture bois, entretien protection bois, entretien anti-termites, entretien anti-fongique, entretien hydrofuge, entretien oléofuge, entretien saturateur, entretien vernis, entretien enduit, entretien crépis, entretien ravalement façade, entretien rénovation façade, entretien nettoyage façade, entretien hydrogommage, entretien sablage, entretien gommage, entretien ponçage, devis gratuit, prix entretien, tarifs entretien, couvreur Lyon, expert toiture Lyon,
inspection toiture, contrôle toiture, audit toiture, diagnostic toiture, expertise toiture, contrôle état toiture, évaluation état toiture, rapport état toiture, constat état toiture, relevé état toiture, contrôle étanchéité, vérification étanchéité, contrôle ventilation, vérification ventilation, contrôle accessoires, vérification accessoires, contrôle éléments toiture, vérification éléments toiture, contrôle joints, vérification joints, contrôle raccordements, vérification raccordements, contrôle point d'infiltration, vérification point infiltration, contrôle ventillation, vérification ventillation, contrôle température, vérification température, contrôle humidité, vérification humidité, contrôle condensation, vérification condensation, contrôle énergie, vérification énergie, contrôle performance, vérification performance, contrôle conformité, vérification conformité, contrôle normes, vérification normes, contrôle réglementation, vérification réglementation, contrôle certification, vérification certification, contrôle assurance, vérification assurance, contrôle garantie, vérification garantie`,
      demoussage: `démoussage toiture, démoussage traitement hydrofuge, élimination mousses toiture, traitement protecteur toiture, démoussage couverture, démoussage tuiles, démoussage ardoises, démoussage zinc, démoussage cuivre, démoussage PVC, démoussage aluminium, démoussage acier, démoussage inox, démoussage titane, démoussage composite, démoussage bitume, démoussage membrane, démoussage étanchéité, démoussage ventilation, démoussage écran sous-toiture, démoussage pare-vapeur, démoussage liteaux, démoussage volige, démoussage chevrons, démoussage pannes, démoussage fermes, démoussage poutres, démoussage solives, démoussage plancher, démoussage escalier, démoussage terrasse, démoussage pergola, démoussage abri jardin, démoussage cabane, démoussage chalet, démoussage maison ossature bois, démoussage construction bois, démoussage rénovation bois, démoussage traitement bois, démoussage lasure, démoussage peinture bois, démoussage protection bois, démoussage anti-termites, démoussage anti-fongique, démoussage hydrofuge, démoussage oléofuge, démoussage saturateur, démoussage vernis, démoussage enduit, démoussage crépis, démoussage ravalement façade, démoussage rénovation façade, démoussage nettoyage façade, démoussage hydrogommage, démoussage sablage, démoussage gommage, démoussage ponçage, devis gratuit, prix démoussage, tarifs démoussage, couvreur Lyon, expert toiture Lyon,
traitement anti-mousse, traitement anti-algues, traitement anti-lichens, traitement anti-végétaux, élimination mousses, élimination algues, élimination lichens, élimination végétaux, nettoyage mousses, nettoyage algues, nettoyage lichens, nettoyage végétaux, suppression mousses, suppression algues, suppression lichens, suppression végétaux, destruction mousses, destruction algues, destruction lichens, destruction végétaux, retrait mousses, retrait algues, retrait lichens, retrait végétaux, éradication mousses, éradication algues, éradication lichens, éradication végétaux, traitement préventif mousses, traitement préventif algues, traitement préventif lichens, traitement préventif végétaux, protection contre mousses, protection contre algues, protection contre lichens, protection contre végétaux, traitement hydrofuge, traitement imperméabilisant, traitement étanche, traitement waterproofing, protection hydrofuge, protection imperméabilisante, protection étanche, protection waterproofing, finition hydrofuge, finition imperméabilisante, finition étanche, finition waterproofing, application hydrofuge, application imperméabilisante, application étanche, application waterproofing, couche hydrofuge, couche imperméabilisante, couche étanche, couche waterproofing, film hydrofuge, film imperméabilisant, film étanche, film waterproofing, membrane hydrofuge, membrane imperméabilisante, membrane étanche, membrane waterproofing, revêtement hydrofuge, revêtement imperméabilisant, revêtement étanche, revêtement waterproofing`,
      nettoyage: `nettoyage toiture, nettoyage haute pression toiture, nettoyage doux toiture, toiture propre, toiture saine, nettoyage couverture, nettoyage tuiles, nettoyage ardoises, nettoyage zinc, nettoyage cuivre, nettoyage PVC, nettoyage aluminium, nettoyage acier, nettoyage inox, nettoyage titane, nettoyage composite, nettoyage bitume, nettoyage membrane, nettoyage étanchéité, nettoyage ventilation, nettoyage écran sous-toiture, nettoyage pare-vapeur, nettoyage liteaux, nettoyage volige, nettoyage chevrons, nettoyage pannes, nettoyage fermes, nettoyage poutres, nettoyage solives, nettoyage plancher, nettoyage escalier, nettoyage terrasse, nettoyage pergola, nettoyage abri jardin, nettoyage cabane, nettoyage chalet, nettoyage maison ossature bois, nettoyage construction bois, nettoyage rénovation bois, nettoyage traitement bois, nettoyage lasure, nettoyage peinture bois, nettoyage protection bois, nettoyage anti-termites, nettoyage anti-fongique, nettoyage hydrofuge, nettoyage oléofuge, nettoyage saturateur, nettoyage vernis, nettoyage enduit, nettoyage crépis, nettoyage ravalement façade, nettoyage rénovation façade, nettoyage façade, nettoyage hydrogommage, nettoyage sablage, nettoyage gommage, nettoyage ponçage, devis gratuit, prix nettoyage, tarifs nettoyage, couvreur Lyon, expert toiture Lyon,
lavage toiture, lavage couverture, lavage tuiles, lavage ardoises, lavage zinc, lavage cuivre, lavage façade, désencrassage toiture, désencrassage couverture, désencrassage tuiles, désencrassage ardoises, désencrassage zinc, désencrassage cuivre, désencrassage façade, décapage toiture, décapage couverture, décapage tuiles, décapage ardoises, décapage zinc, décapage cuivre, décapage façade, débarrassage toiture, débarrassage couverture, débarrassage tuiles, débarrassage ardoises, débarrassage zinc, débarrassage cuivre, débarrassage façade, enlèvement toiture, enlèvement couverture, enlèvement tuiles, enlèvement ardoises, enlèvement zinc, enlèvement cuivre, enlèvement façade, aspiration toiture, aspiration couverture, aspiration tuiles, aspiration ardoises, aspiration façade, brossage toiture, brossage couverture, brossage tuiles, brossage ardoises, brossage zinc, brossage façade, épongeage toiture, épongeage couverture, épongeage façade, séchage toiture, séchage couverture, séchage façade, essuyage toiture, essuyage couverture, essuyage façade, polissage toiture, polissage couverture, polissage façade, lustrage toiture, lustrage couverture, lustrage façade, brillance toiture, brillance couverture, brillance façade, éclat toiture, éclat couverture, éclat façade`
    };

    return {
      title: `${service.title} - BN BÂTIMENT Expert ${service.title} Paris`,
      description: `${service.description} Expert ${service.title} à Paris. Devis gratuit. Intervention 24h/24. Plus de 10 ans d'expérience.`,
      keywords: serviceKeywords[slug] || `service ${service.title}, expert ${service.title} Paris, devis ${service.title} gratuit, intervention ${service.title} 24h`,
      url: `/services/${slug}`,
      image: service.image || "/logo.png"
    };
  };

  useEffect(() => {
    const loadService = async () => {
      console.log('ServiceDetail: slug received:', slug);
      
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        // Try to fetch the service from the API first
        const apiService = await fetchServiceBySlug(slug);
        
        if (apiService) {
          console.log('ServiceDetail: Found service from API:', apiService);
          setService(apiService);
        } else {
          // Fallback to hardcoded data if API doesn't have the service
          console.log('ServiceDetail: Service not found in API, using fallback data');
          
          if (servicesData[slug]) {
            console.log('ServiceDetail: Found exact match in fallback data:', slug);
            setService(servicesData[slug]);
          } else {
            // Try to find a matching service in fallback data
            const serviceKeys = Object.keys(servicesData);
            console.log('ServiceDetail: Available fallback services:', serviceKeys);
            
            const foundService = serviceKeys.find(key => {
              const normalizedKey = key.toLowerCase()
                .replace(/[éèê]/g, 'e')
                .replace(/[àâ]/g, 'a')
                .replace(/[ùû]/g, 'u')
                .replace(/[ôö]/g, 'o')
                .replace(/[îï]/g, 'i')
                .replace(/[ç]/g, 'c')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              
              const normalizedSlug = slug?.toLowerCase()
                .replace(/[éèê]/g, 'e')
                .replace(/[àâ]/g, 'a')
                .replace(/[ùû]/g, 'u')
                .replace(/[ôö]/g, 'o')
                .replace(/[îï]/g, 'i')
                .replace(/[ç]/g, 'c')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              
              const matches = normalizedKey === normalizedSlug || 
                key.toLowerCase() === slug?.toLowerCase() ||
                key.includes(slug) ||
                slug?.includes(key) ||
                normalizedKey.includes(normalizedSlug) ||
                normalizedSlug.includes(normalizedKey) ||
                (slug?.includes('couverture') && key === 'couverture') ||
                (slug?.includes('charpente') && key === 'charpente') ||
                (slug?.includes('reparation') && key === 'reparation-des-fuites') ||
                (slug?.includes('demoussage') && key === 'demoussage') ||
                (slug?.includes('nettoyage') && key === 'nettoyage') ||
                (slug?.includes('gouttieres') && key === 'gouttieres') ||
                (slug?.includes('isolation') && key === 'isolation') ||
                (slug?.includes('installation') && key === 'installation') ||
                (slug?.includes('zinguerie') && key === 'zinguerie') ||
                (slug?.includes('fenetres') && key === 'fenetres') ||
                (slug === 'couverturtraditionnelle' && key === 'couverture') ||
                (slug === 'test-updated-service' && key === 'test-updated-service');
              
              if (matches) {
                console.log('ServiceDetail: Found match for key:', key, 'with slug:', slug);
              }
              
              return matches;
            });
            
            if (foundService) {
              console.log('ServiceDetail: Using fallback service:', foundService);
              setService(servicesData[foundService]);
            } else {
              console.log('ServiceDetail: No service found for slug:', slug);
              // Use default service
              const defaultService = servicesData['couverture'];
              setService(defaultService);
            }
          }
        }
      } catch (error) {
        console.error('ServiceDetail: Error loading service:', error);
        // Use fallback data on error
        const defaultService = servicesData['couverture'];
        setService(defaultService);
      }
      
      setLoading(false);
    };

    loadService();
  }, [slug, navigate]);

  const handleContact = () => {
    navigate('/contact');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du service...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-container">
        <h2>Service non trouvé</h2>
        <p>Le service demandé n'existe pas.</p>
        <button onClick={() => navigate('/services')} className="btn-primary">
          Retour aux services
        </button>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <SEO {...getSeoData(service)} />
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-shapes">
          <motion.div 
            className="shape shape-1"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="shape shape-2"
            animate={{ 
              y: [0, 30, 0],
              rotate: [360, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="shape shape-3"
            animate={{ 
              x: [0, 50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          <motion.div 
            className="shape shape-4"
            animate={{ 
              y: [0, -40, 0],
              x: [0, 30, 0],
              rotate: [360, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="shape shape-5"
            animate={{ 
              x: [0, -30, 0],
              y: [0, 20, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>
        
        <div className="gradient-overlay">
          <motion.div 
            className="gradient-layer gradient-1"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="gradient-layer gradient-2"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="gradient-layer gradient-3"
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>
        
        <div className="particle-system">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`element-${i}`}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Additional animated lines */}
        <div className="animated-lines">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="animated-line"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: '1px',
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${service.heroImage})` }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge">
                <div className="badge-square"></div>
                <span>SERVICE</span>
              </div>
              <h1 className="hero-title">{service.title}</h1>
              <p className="hero-description">{service.subtitle}</p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Années d'expérience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Projets réalisés</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Satisfaction client</span>
                </div>
              </div>
              
              <div className="hero-actions">
                <button onClick={handleContact} className="hero-btn btn-primary">
                  <Phone size={20} />
                  Demander un devis gratuit
                </button>
                <a href="tel:33780326427" className="hero-btn btn-secondary">
                  <Phone size={20} />
                  Appelez maintenant
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="section">
        <div className="container">
          <div className="service-overview">
            <motion.div 
              className="overview-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2>Notre expertise en {service.title.toLowerCase()}</h2>
              <p>{service.description}</p>
              
              <div className="overview-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Building size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Expertise spécialisée</h4>
                    <p>Plus de 10 ans d'expérience dans le domaine</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Zap size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Équipe qualifiée</h4>
                    <p>Artisans expérimentés et certifiés</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Users size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Service client</h4>
                    <p>Accompagnement personnalisé tout au long du projet</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="overview-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OptimizedImage
                src={getServiceImageUrl(service.image) || getServiceImage(service.title)} 
                alt={`${service.title} - BN BÂTIMENT`}
                className="service-image service-image-large"
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  maxWidth: "600px", 
                  maxHeight: "400px", 
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section section-gray">
        <div className="container">
          <div className="service-details">
            <div className="service-info">
              <h2>Détails du service</h2>
              <p>{service.description}</p>
              
              <div className="service-features">
                <h3>Caractéristiques:</h3>
                <div className="features-grid">
                  {service.features && Array.isArray(service.features) && service.features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-check">✓</div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-advantages">
                <h3>Avantages:</h3>
                <div className="features-grid">
                  {service.advantages && Array.isArray(service.advantages) && service.advantages.map((advantage, index) => (
                    <div key={index} className="feature-card">
                      <div className="advantage-star">{React.createElement(getIconComponent('⭐'))}</div>
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="process-section">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="process-header"
            >
              <div className="section-badge">
                <div className="badge-square"></div>
                <span>NOTRE PROCESSUS</span>
              </div>
              <h2>Notre processus en 4 étapes</h2>
              <p>Une approche simple et efficace pour votre projet</p>
            </motion.div>
            
            <div className="process-steps">
              {service.process && Array.isArray(service.process) && service.process.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="process-step"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">
                    {step.icon}
                  </div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    <div className="step-duration">
                      <Clock size={16} />
                      <span>Selon projet</span>
                    </div>
                  </div>
                  {index < service.process.length - 1 && (
                    <div className="step-arrow">
                      <ArrowRight size={24} />
                    </div>
                  )}
                  {index === service.process.length - 1 && (
                    <div className="step-completion">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Fallback process steps when no process data is available */}
              {(!service.process || !Array.isArray(service.process) || service.process.length === 0) && (
                <>
                  <motion.div 
                    className="process-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="step-number">1</div>
                    <div className="step-icon">
                      <Target size={24} />
                    </div>
                    <div className="step-content">
                      <h4>Étude et Devis</h4>
                      <p>Analyse de votre projet et établissement d'un devis détaillé</p>
                      <div className="step-duration">
                        <Clock size={16} />
                        <span>Gratuit</span>
                      </div>
                    </div>
                    <div className="step-arrow">
                      <ArrowRight size={24} />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="process-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="step-number">2</div>
                    <div className="step-icon">
                      <Clock size={24} />
                    </div>
                    <div className="step-content">
                      <h4>Planification</h4>
                      <p>Organisation du chantier et coordination des équipes</p>
                      <div className="step-duration">
                        <Clock size={16} />
                        <span>Rapide</span>
                      </div>
                    </div>
                    <div className="step-arrow">
                      <ArrowRight size={24} />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="process-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="step-number">3</div>
                    <div className="step-icon">
                      <Wrench size={24} />
                    </div>
                    <div className="step-content">
                      <h4>Exécution</h4>
                      <p>Réalisation des travaux selon les normes en vigueur</p>
                      <div className="step-duration">
                        <Clock size={16} />
                        <span>Selon projet</span>
                      </div>
                    </div>
                    <div className="step-arrow">
                      <ArrowRight size={24} />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="process-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="step-number">4</div>
                    <div className="step-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div className="step-content">
                      <h4>Réception</h4>
                      <p>Contrôle qualité et réception des travaux</p>
                      <div className="step-duration">
                        <Clock size={16} />
                        <span>Final</span>
                      </div>
                    </div>
                    <div className="step-completion">
                      <CheckCircle size={20} />
                    </div>
                  </motion.div>
                </>
              )}
            </div>
            
            <motion.div 
              className="process-summary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <div className="summary-card">
                <div className="summary-icon">
                  <Shield size={32} />
                </div>
                <div className="summary-content">
                  <h4>Garantie et expertise</h4>
                  <p>Tous nos travaux bénéficient d'une garantie décennale et d'un suivi post-réalisation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="testimonials-section">
              <h2>Avis de nos clients</h2>
              <p>Découvrez ce que disent nos clients satisfaits</p>
              
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="testimonial-rating">{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}</div>
                  <p>"Service exceptionnel ! L'équipe a été professionnelle du début à la fin. Travaux réalisés dans les délais et avec un excellent rapport qualité-prix."</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">👤</div>
                    <div className="author-info">
                      <h4>Marie Dubois</h4>
                      <span>Paris, 75</span>
                    </div>
                  </div>
                </div>
                
                <div className="testimonial-card">
                  <div className="testimonial-rating">{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}</div>
                  <p>"Très satisfait du travail réalisé. L'équipe est compétente et respectueuse. Je recommande vivement leurs services."</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">👤</div>
                    <div className="author-info">
                      <h4>Jean Martin</h4>
                      <span>Lyon, 69</span>
                    </div>
                  </div>
                </div>
                
                <div className="testimonial-card">
                  <div className="testimonial-rating">{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}{React.createElement(getIconComponent('⭐'))}</div>
                  <p>"Devis transparent, travaux de qualité et respect des délais. Une entreprise sérieuse que je recommande sans hésitation."</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">👤</div>
                    <div className="author-info">
                      <h4>Sophie Bernard</h4>
                      <span>Marseille, 13</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gradient">
        <div className="container">
          <motion.div 
            className="cta-content enhanced"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="cta-background">
              <div className="cta-pattern"></div>
              <div className="cta-glow"></div>
            </div>
            
            <div className="cta-header">
              <motion.div 
                className="cta-badge"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="badge-icon">🚀</div>
                <span>COMMENCER MAINTENANT</span>
              </motion.div>
              
              <motion.h2 
                className="cta-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Prêt à commencer votre projet ?
              </motion.h2>
              
              <motion.p 
                className="cta-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Contactez-nous dès maintenant pour obtenir un devis personnalisé 
                et gratuit pour votre projet. Notre équipe d'experts est prête à vous accompagner.
              </motion.p>
            </div>
            
            <motion.div 
              className="cta-features"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="feature-item">
                <div className="feature-icon">{React.createElement(getIconComponent('✅'))}</div>
                <span>Devis gratuit et personnalisé</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{React.createElement(getIconComponent('⚡'))}</div>
                <span>Réponse sous 24h</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{React.createElement(getIconComponent('🛡️'))}</div>
                <span>Garantie décennale</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{React.createElement(getIconComponent('📞'))}</div>
                <span>Support 7j/7</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="cta-buttons enhanced"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button 
                onClick={handleContact}
                className="btn-primary enhanced"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="btn-glow"></div>
                <Phone size={20} />
                <span>Demander un devis gratuit</span>
                <div className="btn-arrow">→</div>
              </motion.button>
              
              <motion.a 
                href="tel:33780326427" 
                className="btn-secondary enhanced"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span>Appelez maintenant</span>
                <div className="btn-pulse"></div>
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="contact-info enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Téléphone</span>
                  <span className="contact-value">+33 780326427</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Zone d'intervention</span>
                  <span className="contact-value">Toute la région</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Disponibilité</span>
                  <span className="contact-value">7j/7 - 24h/24</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="cta-stats"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projets réalisés</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Années d'expérience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction client</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 
