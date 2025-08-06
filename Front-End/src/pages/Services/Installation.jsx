import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, Shield, Clock, CheckCircle, Star, 
  Phone, Mail, MapPin, ArrowRight, Award,
  Building, Users, Zap, Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const Installation = () => {
  const navigate = useNavigate();

  const service = {
    id: 1,
    title: "Installation de toiture neuve",
    description: "Installation complète d'une nouvelle toiture avec tous les composants",
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
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div className="installation-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Wrench size={20} />
              <span>Service Premium</span>
            </div>
            <h1 className="hero-title">
              Installation de toiture neuve
            </h1>
            <p className="hero-description">
              Installation complète d'une nouvelle toiture avec tous les composants. 
              Notre expertise garantit une qualité irréprochable et une durabilité exceptionnelle.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <Shield size={24} />
                <div>
                  <span className="stat-number">10</span>
                  <span className="stat-label">ans de garantie</span>
                </div>
              </div>
              <div className="stat-item">
                <Users size={24} />
                <div>
                  <span className="stat-number">500+</span>
                  <span className="stat-label">projets réalisés</span>
                </div>
              </div>
              <div className="stat-item">
                <Star size={24} />
                <div>
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">note moyenne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="section">
        <div className="container">
          <div className="service-overview">
            <div className="overview-content">
              <h2>Notre expertise en installation de toiture</h2>
              <p>
                Spécialisés dans l'installation de toitures neuves, nous maîtrisons 
                toutes les techniques modernes pour vous garantir une toiture 
                parfaitement étanche, isolée et durable.
              </p>
              
              <div className="overview-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Building size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Installation complète</h4>
                    <p>De la charpente aux finitions, nous gérons tout le processus</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Zap size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Équipe qualifiée</h4>
                    <p>Artisans expérimentés et certifiés pour un travail irréprochable</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Award size={24} />
                  </div>
                  <div className="feature-content">
                    <h4>Garantie décennale</h4>
                    <p>Protection complète de votre investissement sur 10 ans</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overview-image">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Installation de toiture"
                className="service-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section section-gray">
        <div className="container">
          <div className="service-details">
            <div className="service-info">
              <h2>Détails du service</h2>
              <p>
                Notre service d'installation de toiture neuve comprend tous les éléments 
                nécessaires pour une toiture parfaitement fonctionnelle et esthétique.
              </p>
              
              <div className="service-features">
                <h3>Caractéristiques du service</h3>
                <div className="features-grid">
                  {service.features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <CheckCircle size={20} className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-advantages">
                <h3>Avantages de notre service</h3>
                <div className="advantages-grid">
                  {service.advantages.map((advantage, index) => (
                    <div key={index} className="advantage-card">
                      <Star size={20} className="advantage-star" />
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
              <h2>Notre processus d'installation</h2>
              <p>Une méthodologie éprouvée pour garantir la réussite de votre projet</p>
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
                  <h4>Garantie décennale</h4>
                  <p>Tous nos travaux d'installation bénéficient d'une garantie décennale et d'un suivi post-réalisation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gradient">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à commencer votre projet ?</h2>
            <p>
              Contactez-nous dès maintenant pour obtenir un devis personnalisé 
              et gratuit pour votre installation de toiture.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={handleContact}
                className="btn-primary"
              >
                <Phone size={20} />
                Demander un devis gratuit
              </button>
              <a href="tel:33780326427" className="btn-secondary">
                <Phone size={20} />
                Appelez maintenant
              </a>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>support@bnbatiment.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>Intervention dans toute la région</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Installation;
