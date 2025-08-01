import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug } from '../../api/services';

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

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
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${service.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div
          className="container text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="animate-fadeInUp">{service.title}</h1>
          <p className="animate-slideInLeft">{service.description}</p>
          <Link to="/contact" className="btn btn-primary hover-glow">
            DEVIS GRATUIT
          </Link>
        </div>
      </section>

      {/* Description du service */}
      <section className="section">
        <div className="container">
          <div className="service-detail-content">
            <div className="service-header">
              <div className="service-icon-large">
                <span>{service.icon}</span>
              </div>
              <div className="service-info">
                <h2>{service.title}</h2>
                <p className="service-description">{service.long_description}</p>
                
                <div className="service-meta">
                  <div className="meta-item">
                    <strong>Catégorie:</strong> {service.category}
                  </div>
                  <div className="meta-item">
                    <strong>Durée:</strong> {service.duration}
                  </div>
                  <div className="meta-item">
                    <strong>Prix:</strong> {service.price_range}
                  </div>
                </div>
              </div>
            </div>

            {/* Caractéristiques */}
            {service.features && service.features.length > 0 && (
              <div className="service-section">
                <h3>Caractéristiques</h3>
                <div className="features-grid">
                  {service.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sous-services */}
            {service.sub_services && service.sub_services.length > 0 && (
              <div className="service-section">
                <h3>Nos Prestations</h3>
                <div className="sub-services-grid">
                  {service.sub_services.map((subService, index) => (
                    <div key={index} className="sub-service-card">
                      <h4>{subService.name}</h4>
                      <p>{subService.description}</p>
                      {subService.price && (
                        <div className="sub-service-price">
                          <strong>Prix:</strong> {subService.price}
                        </div>
                      )}
                      {subService.duration && (
                        <div className="sub-service-duration">
                          <strong>Durée:</strong> {subService.duration}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matériaux */}
            {service.materials && service.materials.length > 0 && (
              <div className="service-section">
                <h3>Matériaux Utilisés</h3>
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

            {/* Avantages */}
            {service.advantages && service.advantages.length > 0 && (
              <div className="service-section">
                <h3>Nos Avantages</h3>
                <div className="advantages-grid">
                  {service.advantages.map((advantage, index) => (
                    <div key={index} className="advantage-item">
                      <span className="advantage-icon">⭐</span>
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="service-cta">
              <h3>Prêt à commencer votre projet ?</h3>
              <p>Contactez-nous pour un devis gratuit et personnalisé</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-primary">
                  Demander un devis
                </Link>
                <a href="tel:33780326427" className="btn-secondary">
                  📞 Appelez maintenant
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 