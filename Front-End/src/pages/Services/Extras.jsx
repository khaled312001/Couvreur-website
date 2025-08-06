import React from "react";

const Extras = () => {
  const services = [
    {
      title: "Pose de velux",
      description: "Installation et remplacement de velux",
      icon: "🪟"
    },
    {
      title: "Isolation de toiture",
      description: "Isolation thermique et phonique",
      icon: "🏠"
    },
    {
      title: "Pose de gouttières",
      description: "Installation de gouttières neuves",
      icon: "🌊"
    },
    {
      title: "Cheminée",
      description: "Rénovation et entretien de cheminée",
      icon: "🏛️"
    },
    {
      title: "Échafaudage",
      description: "Location et installation d'échafaudage",
      icon: "🏗️"
    },
    {
      title: "Désamiantage",
      description: "Retrait d'amiante et matériaux dangereux",
      icon: "⚠️"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Services Supplémentaires</h1>
            <p>Services complémentaires pour vos travaux</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Services complémentaires</h2>
          <p className="section-subtitle">
            Nous proposons une gamme de services supplémentaires pour compléter vos travaux de couverture
          </p>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p style={{ marginBottom: '15px', color: '#6b7280' }}>
                    {service.description}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">👨‍🔧</div>
                <h3>Équipe qualifiée</h3>
                <p>Professionnels expérimentés et certifiés</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🛡️</div>
                <h3>Garantie</h3>
                <p>Tous nos travaux sont garantis</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">💰</div>
                <h3>Prix transparents</h3>
                <p>Devis détaillés sans surprise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un service spécifique ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis personnalisé
            </p>
            <div style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Extras;
