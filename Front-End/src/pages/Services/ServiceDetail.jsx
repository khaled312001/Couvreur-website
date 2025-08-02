import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchServiceBySlug } from '../../api/services';
import { getImageUrl } from '../../utils/imageUtils';
import '../../styles/service-details.css';

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleContact = () => {
    navigate('/contact');
  };

  useEffect(() => {
    loadService();
  }, [slug]);

  const loadService = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchServiceBySlug(slug);
      if (data) {
        setService(data);
      } else {
        setError('Service non trouvé');
      }
    } catch (error) {
      console.error('Error loading service:', error);
      setError('Erreur lors du chargement du service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du service...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="error-container">
        <h2>Service non trouvé</h2>
        <p>Le service que vous recherchez n'existe pas.</p>
        <Link to="/services" className="btn-primary">
          Retour aux services
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${service.image ? getImageUrl(service.image) : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'})`
        }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <span>🏆</span>
              Service Premium
            </div>
            <h1 className="hero-title">{service.title}</h1>
            <p className="hero-description">{service.description}</p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span>⏱️</span>
                <div>
                  <span className="stat-number">{service.duration}</span>
                  <span className="stat-label">Durée moyenne</span>
                </div>
              </div>
              <div className="stat-item">
                <span>💰</span>
                <div>
                  <span className="stat-number">{service.price_range}</span>
                  <span className="stat-label">Prix indicatif</span>
                </div>
              </div>
              <div className="stat-item">
                <span>⭐</span>
                <div>
                  <span className="stat-number">4.9/5</span>
                  <span className="stat-label">Satisfaction client</span>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/contact" className="btn-primary hero-btn">
                📋 Devis Gratuit
              </Link>
              <a href="tel:33780326427" className="btn-secondary hero-btn">
                📞 Appelez maintenant
              </a>
            </div>
          </motion.div>
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
              <h2>À propos de ce service</h2>
              <p>{service.long_description}</p>
              
              <div className="overview-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <span>🏗️</span>
                  </div>
                  <div className="feature-content">
                    <h4>Expertise Professionnelle</h4>
                    <p>Équipe qualifiée avec plus de 15 ans d'expérience</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <span>🛡️</span>
                  </div>
                  <div className="feature-content">
                    <h4>Garantie Décennale</h4>
                    <p>Protection complète de vos travaux pendant 10 ans</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <span>⚡</span>
                  </div>
                  <div className="feature-content">
                    <h4>Intervention Rapide</h4>
                    <p>Réponse sous 24h et planification flexible</p>
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
                src={service.image ? getImageUrl(service.image) : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
                alt={service.title}
                className="service-image service-image-large"
                style={{ width: "100%", height: "auto", maxWidth: "600px", maxHeight: "400px", objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section">
        <div className="container">
          <div className="service-details">
            <motion.div 
              className="service-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2>Détails du service</h2>
              <p>{service.long_description}</p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="service-features">
                  <h3>Caractéristiques principales</h3>
                  <div className="features-grid">
                    {service.features.map((feature, index) => (
                      <div key={index} className="feature-card">
                        <span className="feature-check">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-services */}
              {service.sub_services && service.sub_services.length > 0 && (
                <div className="service-sub-services">
                  <h3>Nos prestations incluses</h3>
                  <div className="sub-services-grid">
                    {service.sub_services.map((subService, index) => (
                      <div key={index} className="sub-service-card">
                        <div className="sub-service-header">
                          <h4>{subService.name}</h4>
                          <span className="sub-service-price">{subService.price}</span>
                        </div>
                        <p>{subService.description}</p>
                        {subService.duration && (
                          <div className="sub-service-duration">
                            <span>⏱️ {subService.duration}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials */}
              {service.materials && service.materials.length > 0 && (
                <div className="service-materials">
                  <h3>Matériaux utilisés</h3>
                  <div className="materials-grid">
                    {service.materials.map((material, index) => (
                      <div key={index} className="material-item">
                        <span className="material-icon">🔧</span>
                        <span>{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advantages */}
              {service.advantages && service.advantages.length > 0 && (
                <div className="service-advantages">
                  <h3>Nos avantages</h3>
                  <div className="advantages-grid">
                    {service.advantages.map((advantage, index) => (
                      <div key={index} className="advantage-card">
                        <span className="advantage-star">⭐</span>
                        <span>{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Pricing Card */}
            <motion.div 
              className="service-pricing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>Devis Gratuit</h3>
                  <p>Estimation personnalisée sous 24h</p>
                </div>
                
                <div className="pricing-features">
                  <h4>Inclus dans votre devis :</h4>
                  <ul>
                    <li>✓ Visite technique gratuite</li>
                    <li>✓ Estimation détaillée</li>
                    <li>✓ Planning d'intervention</li>
                    <li>✓ Garantie décennale</li>
                    <li>✓ Suivi de chantier</li>
                  </ul>
                </div>

                <button className="contact-btn" onClick={handleContact}>
                  📋 Demander un devis gratuit
                </button>

                <div className="pricing-contact">
                  <p>Ou appelez directement :</p>
                  <a href="tel:33780326427" className="phone-number">
                    📞 07 80 32 64 27
                  </a>
                </div>
              </div>
            </motion.div>
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
            >
              <h2>Notre processus en 4 étapes</h2>
              <p>Une approche simple et efficace pour votre projet</p>
              
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-icon">📞</div>
                  <div className="step-content">
                    <h4>Contact initial</h4>
                    <p>Appel ou formulaire de contact pour comprendre vos besoins</p>
                  </div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-icon">🏠</div>
                  <div className="step-content">
                    <h4>Visite technique</h4>
                    <p>Inspection sur site et devis détaillé gratuit</p>
                  </div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-icon">📋</div>
                  <div className="step-content">
                    <h4>Validation du projet</h4>
                    <p>Signature du devis et planification des travaux</p>
                  </div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-icon">✅</div>
                  <div className="step-content">
                    <h4>Réalisation</h4>
                    <p>Exécution des travaux avec suivi qualité</p>
                  </div>
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

      {/* Enhanced CTA Section */}
      <section className="section section-gradient">
        <div className="container">
          <div className="cta-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <h2>Prêt à commencer votre projet ?</h2>
              <p>Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé</p>
              
              <div className="cta-buttons">
                <Link to="/contact" className="btn-primary">
                  📋 Demander un devis gratuit
                </Link>
                <a href="tel:33780326427" className="btn-secondary">
                  📞 Appelez maintenant
                </a>
              </div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <span>📧</span>
                  <span>contact@couvreur.fr</span>
                </div>
                <div className="contact-item">
                  <span>📱</span>
                  <span>07 80 32 64 27</span>
                </div>
                <div className="contact-item">
                  <span>🕒</span>
                  <span>Lun-Ven: 8h-18h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 