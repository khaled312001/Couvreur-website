import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../api/services';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des services...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 1rem",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="hero-content">
            <h1 style={{
              color: "white",
              fontSize: "3rem",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            }}>
              Nos Services
            </h1>
            <p style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            }}>
              Nous proposons une gamme complète de services de construction et de rénovation
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Services Spécialisés</h2>
            <p className="section-subtitle">
              Nous proposons des services de haute qualité à des prix compétitifs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
                
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="service-features">
                      <h4>Caractéristiques:</h4>
                      <ul>
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

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

                  <div className="service-actions">
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="btn-primary"
                    >
                      Voir les détails
                    </Link>
                    <Link 
                      to="/contact" 
                      className="btn-secondary"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <h3>Besoin d'une consultation gratuite ?</h3>
            <p>Contactez-nous maintenant et obtenez un devis personnalisé</p>
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
      </section>
    </div>
  );
};

export default Services;
