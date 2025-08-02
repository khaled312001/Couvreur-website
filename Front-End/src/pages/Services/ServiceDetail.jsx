import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/imageUtils';
import { Phone, Clock, ArrowRight, MapPin, CheckCircle, Wrench, Shield, Target, Building, Users, Zap } from 'lucide-react';
import '../../styles/service-details.css';

// قاعدة بيانات الخدمات
const servicesData = {
  'charpente': {
    id: 1,
    title: "Charpente traditionnelle et moderne",
    subtitle: "Construction et rénovation de charpentes",
    description: "Expertise en construction et rénovation de charpentes traditionnelles et modernes",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Charpente traditionnelle en bois",
      "Charpente moderne en métal",
      "Rénovation de charpente existante",
      "Renforcement de structure",
      "Installation de poutres",
      "Finitions intérieures"
    ],
    advantages: [
      "Expertise en charpente",
      "Matériaux de qualité",
      "Garantie décennale",
      "Respect des normes",
      "Suivi des travaux",
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
  'couverture': {
    id: 2,
    title: "Couverture traditionnelle",
    subtitle: "Installation et réparation de toitures",
    description: "Expertise en tous types de couvertures traditionnelles et modernes",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Tuiles traditionnelles",
      "Ardoises naturelles",
      "Couvertures métalliques",
      "Raccordements étanches",
      "Finitions professionnelles",
      "Maintenance préventive"
    ],
    advantages: [
      "Plus de 10 ans d'expérience",
      "Devis gratuit et détaillé",
      "Travaux garantis",
      "Respect des normes en vigueur",
      "Intervention rapide",
      "Prix compétitifs"
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description: "Appel ou formulaire pour comprendre vos besoins en couverture",
        icon: <Phone size={24} />
      },
      {
        step: 2,
        title: "Visite technique",
        description: "Inspection de votre toiture et analyse des matériaux nécessaires",
        icon: <MapPin size={24} />
      },
      {
        step: 3,
        title: "Validation du projet",
        description: "Signature du devis et planification des travaux de couverture",
        icon: <CheckCircle size={24} />
      },
      {
        step: 4,
        title: "Réalisation",
        description: "Exécution des travaux de couverture avec suivi qualité",
        icon: <Wrench size={24} />
      }
    ]
  },
  'zinguerie': {
    id: 3,
    title: "Zinguerie et étanchéité",
    subtitle: "Travaux de zinguerie et d'étanchéité",
    description: "Expertise en raccordements et étanchéité complète",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Gouttières en zinc et PVC",
      "Chéneaux et raccordements",
      "Membranes d'étanchéité",
      "Protection contre les infiltrations",
      "Raccordements de cheminées",
      "Maintenance préventive"
    ],
    advantages: [
      "Plus de 10 ans d'expérience",
      "Devis gratuit et détaillé",
      "Travaux garantis",
      "Respect des normes en vigueur",
      "Intervention rapide",
      "Prix compétitifs"
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description: "Appel ou formulaire pour comprendre vos besoins en zinguerie",
        icon: <Phone size={24} />
      },
      {
        step: 2,
        title: "Visite technique",
        description: "Inspection de votre toiture et analyse des raccordements nécessaires",
        icon: <MapPin size={24} />
      },
      {
        step: 3,
        title: "Validation du projet",
        description: "Signature du devis et planification des travaux de zinguerie",
        icon: <CheckCircle size={24} />
      },
      {
        step: 4,
        title: "Réalisation",
        description: "Exécution des travaux de zinguerie avec suivi qualité",
        icon: <Wrench size={24} />
      }
    ]
  },
  'installation': {
    id: 4,
    title: "Installation de toiture neuve",
    subtitle: "Installation complète d'une nouvelle toiture",
    description: "Installation complète d'une nouvelle toiture avec tous les composants",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Installation de la charpente",
      "Pose de l'isolation thermique",
      "Installation des tuiles ou ardoises",
      "Pose du système d'évacuation",
      "Installation des lucarnes",
      "Finitions intérieures"
    ],
    advantages: [
      "Installation complète et intégrée",
      "Coordination de toutes les étapes",
      "Respect des délais",
      "Garantie décennale",
      "Suivi des travaux",
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
  'repair': {
    id: 5,
    title: "Réparation de toiture",
    subtitle: "Réparation et maintenance de toitures",
    description: "Services de réparation et maintenance pour tous types de toitures",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "À partir de 500€",
    features: [
      "Réparation de fuites",
      "Remplacement de tuiles",
      "Réparation de gouttières",
      "Renforcement de structure",
      "Traitement anti-mousse",
      "Maintenance préventive"
    ],
    advantages: [
      "Intervention rapide",
      "Diagnostic gratuit",
      "Garantie sur les réparations",
      "Matériaux de qualité",
      "Équipe qualifiée",
      "Prix transparents"
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description: "Appel ou formulaire pour décrire le problème",
        icon: <Phone size={24} />
      },
      {
        step: 2,
        title: "Diagnostic",
        description: "Inspection sur site et identification du problème",
        icon: <MapPin size={24} />
      },
      {
        step: 3,
        title: "Devis et validation",
        description: "Établissement du devis et validation des travaux",
        icon: <CheckCircle size={24} />
      },
      {
        step: 4,
        title: "Réparation",
        description: "Exécution des réparations avec garantie",
        icon: <Wrench size={24} />
      }
    ]
  },
  'maintenance': {
    id: 6,
    title: "Maintenance de toiture",
    subtitle: "Entretien et maintenance préventive",
    description: "Services d'entretien et maintenance préventive pour prolonger la durée de vie de votre toiture",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "À partir de 300€",
    features: [
      "Nettoyage de toiture",
      "Traitement anti-mousse",
      "Vérification d'étanchéité",
      "Entretien des gouttières",
      "Inspection générale",
      "Rapport de maintenance"
    ],
    advantages: [
      "Prévention des problèmes",
      "Prolongation de la durée de vie",
      "Économies à long terme",
      "Intervention préventive",
      "Rapport détaillé",
      "Suivi personnalisé"
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description: "Prise de contact pour planifier l'intervention",
        icon: <Phone size={24} />
      },
      {
        step: 2,
        title: "Inspection",
        description: "Visite d'inspection et évaluation des besoins",
        icon: <MapPin size={24} />
      },
      {
        step: 3,
        title: "Planification",
        description: "Établissement du plan de maintenance",
        icon: <CheckCircle size={24} />
      },
      {
        step: 4,
        title: "Exécution",
        description: "Réalisation des travaux de maintenance",
        icon: <Wrench size={24} />
      }
    ]
  },
  'extras': {
    id: 7,
    title: "Services complémentaires",
    subtitle: "Services additionnels et finitions",
    description: "Services complémentaires pour compléter vos travaux de toiture",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: "Sur devis",
    features: [
      "Installation de lucarnes",
      "Pose de velux",
      "Isolation thermique",
      "Étanchéité de terrasses",
      "Bardage extérieur",
      "Finitions intérieures"
    ],
    advantages: [
      "Services sur mesure",
      "Expertise spécialisée",
      "Coordination des travaux",
      "Garantie décennale",
      "Suivi qualité",
      "Finitions soignées"
    ],
    process: [
      {
        step: 1,
        title: "Contact initial",
        description: "Discussion de vos besoins spécifiques",
        icon: <Phone size={24} />
      },
      {
        step: 2,
        title: "Étude technique",
        description: "Analyse technique et proposition de solutions",
        icon: <MapPin size={24} />
      },
      {
        step: 3,
        title: "Validation",
        description: "Validation du projet et planification",
        icon: <CheckCircle size={24} />
      },
      {
        step: 4,
        title: "Réalisation",
        description: "Exécution des travaux avec finitions soignées",
        icon: <Wrench size={24} />
      }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && servicesData[slug]) {
      setService(servicesData[slug]);
    } else {
      // محاولة إصلاح الخدمة إذا كانت موجودة بأسماء مختلفة
      const serviceKeys = Object.keys(servicesData);
      const foundService = serviceKeys.find(key => 
        key.toLowerCase() === slug?.toLowerCase() ||
        key.includes(slug) ||
        slug?.includes(key)
      );
      
      if (foundService) {
        setService(servicesData[foundService]);
      } else {
        // إذا لم يتم العثور على الخدمة، انتقل إلى صفحة 404
        navigate('/404');
      }
    }
    setLoading(false);
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
              <img 
                src={service.image || service.heroImage} 
                alt={service.title}
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
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
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
                  {service.features.map((feature, index) => (
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
                  {service.advantages.map((advantage, index) => (
                    <div key={index} className="feature-card">
                      <div className="advantage-star">⭐</div>
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="service-pricing">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>Devis personnalisé</h3>
                  <p>Obtenez un devis gratuit et personnalisé pour votre projet</p>
                </div>
                
                <div className="pricing-features">
                  <h4>Inclus dans notre devis :</h4>
                  <ul>
                    <li>✓ Étude technique complète</li>
                    <li>✓ Devis détaillé et transparent</li>
                    <li>✓ Planning de réalisation</li>
                    <li>✓ Garantie décennale</li>
                    <li>✓ Suivi des travaux</li>
                  </ul>
                </div>

                <button 
                  onClick={handleContact}
                  className="contact-btn"
                >
                  <Phone size={20} />
                  Demander un devis gratuit
                </button>
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
              {service.process.map((step, index) => (
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
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
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
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
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
                  <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
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
                <div className="feature-icon">✅</div>
                <span>Devis gratuit et personnalisé</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <span>Réponse sous 24h</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <span>Garantie décennale</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📞</div>
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
                  <span className="contact-value">07 80 32 64 27</span>
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