import React from "react";

const Pricing = () => {
  const services = [
    {
      name: "Charpente",
      price: "Sur devis",
      description: "Construction et rénovation de charpentes",
      features: [
        "Charpente traditionnelle",
        "Charpente moderne",
        "Rénovation de charpente",
        "Renforcement de structure",
        "Devis gratuit"
      ]
    },
    {
      name: "Couverture",
      price: "Sur devis",
      description: "Installation et réparation de couvertures",
      features: [
        "Tuiles traditionnelles",
        "Ardoises",
        "Zinc",
        "Métal",
        "Devis gratuit"
      ]
    },
    {
      name: "Zinguerie",
      price: "Sur devis",
      description: "Travaux de zinguerie et raccordements",
      features: [
        "Gouttières",
        "Chéneaux",
        "Raccordements",
        "Étanchéité",
        "Devis gratuit"
      ]
    },
    {
      name: "Entretien",
      price: "À partir de 15€/m²",
      description: "Entretien préventif et réparations",
      features: [
        "Inspection complète",
        "Nettoyage des gouttières",
        "Vérification de l'étanchéité",
        "Petites réparations",
        "Rapport d'intervention"
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Nos Tarifs</h1>
            <p>Transparence et prix compétitifs</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Tarifs de nos services</h2>
          <p className="section-subtitle">
            Des prix transparents et compétitifs pour tous vos travaux
          </p>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <h3>{service.name}</h3>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e3a8a',
                    marginBottom: '15px'
                  }}>
                    {service.price}
                  </div>
                  <p style={{ marginBottom: '20px', color: '#6b7280' }}>
                    {service.description}
                  </p>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>
                      Inclus dans le service :
                    </strong>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} style={{
                          padding: '5px 0',
                          color: '#374151',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <a href="/contact" className="btn btn-primary">
                      Demander un devis
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Informations importantes</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📋</div>
                <h3>Devis gratuit</h3>
                <p>Tous nos devis sont gratuits et détaillés, sans engagement.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🛡️</div>
                <h3>Garantie</h3>
                <p>Tous nos travaux sont garantis et assurés.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">💰</div>
                <h3>Paiement</h3>
                <p>Paiement échelonné possible selon les travaux.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis personnalisé ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et détaillé
            </p>
            <div className="cta-buttons" style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                <span>📋</span>
                DEVIS GRATUIT
              </a>
              <a href="tel:33780326427" className="btn btn-secondary">
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

export default Pricing;
