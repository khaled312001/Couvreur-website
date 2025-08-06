import React from 'react';
import { useNavigate } from 'react-router-dom';

const Charpente = () => {
  const navigate = useNavigate();

  const service = {
    id: 4,
    title: "Charpente traditionnelle et moderne",
    description: "Construction et rénovation de charpentes traditionnelles et modernes",
    price: 35000,
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
    ]
  };

  const handlePayment = () => {
    navigate('/payment', { 
      state: { 
        service: service,
        amount: service.price
      }
    });
  };

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
              {service.title}
            </h1>
            <p style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            }}>
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section">
        <div className="container">
          <div className="service-details">
            <div className="service-info">
              <h2>Détails du service</h2>
              <p>Nous proposons un service de charpente complet avec expertise en construction traditionnelle et moderne.</p>
              
              <div className="service-features">
                <h3>Caractéristiques:</h3>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="service-advantages">
                <h3>Avantages:</h3>
                <ul>
                  {service.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div className="cta-content">
            <h2>Besoin d'une consultation gratuite ?</h2>
            <p>Contactez-nous maintenant et obtenez un devis personnalisé pour votre projet</p>
            <div className="cta-buttons">
              <button 
                onClick={handlePayment}
                className="btn-primary"
              >
                <span>📋</span>
                Demander un devis
              </button>
              <a href="tel:33780326427" className="btn-secondary">
                <span>📞</span>
                Appelez maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Charpente; 