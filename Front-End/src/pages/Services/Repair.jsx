import React from "react";

const Repair = () => {
  const services = [
    {
      title: "Réparation de fuites",
      description: "Diagnostic et réparation des fuites de toiture",
      icon: "🔧",
      price: "À partir de 150€"
    },
    {
      title: "Remplacement de tuiles",
      description: "Remplacement des tuiles cassées ou manquantes",
      icon: "🏠",
      price: "À partir de 50€/m²"
    },
    {
      title: "Réparation de zinguerie",
      description: "Réparation et remplacement des gouttières",
      icon: "🔨",
      price: "À partir de 80€/m"
    },
    {
      title: "Réparation de velux",
      description: "Réparation et remplacement de velux",
      icon: "🪟",
      price: "Sur devis"
    }
  ];

  const emergencyServices = [
    "Intervention d'urgence sous 24h",
    "Réparation temporaire en cas d'urgence",
    "Protection contre les intempéries",
    "Diagnostic gratuit"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Réparation de Toiture</h1>
            <p>Réparation rapide et efficace</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <h2 className="section-title">Réparation de toiture</h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#6b7280' }}>
                Nous intervenons rapidement pour réparer tous types de problèmes de toiture : 
                fuites, tuiles cassées, zinguerie endommagée, etc. Notre équipe expérimentée 
                diagnostique et répare efficacement.
              </p>
              <p style={{ lineHeight: '1.8', color: '#6b7280' }}>
                Nous proposons également un service d'urgence pour les réparations critiques 
                nécessitant une intervention immédiate.
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Service d'urgence</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {emergencyServices.map((service, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#f97316', fontSize: '20px' }}>⚡</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Nos services de réparation</h2>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p style={{ marginBottom: '15px', color: '#6b7280' }}>
                    {service.description}
                  </p>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1e3a8a'
                  }}>
                    {service.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Notre processus de réparation</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🔍</div>
                <h3>Diagnostic</h3>
                <p>Inspection complète pour identifier le problème</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📋</div>
                <h3>Devis</h3>
                <p>Devis détaillé et gratuit pour la réparation</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🔧</div>
                <h3>Réparation</h3>
                <p>Intervention rapide et professionnelle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'une réparation ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un diagnostic gratuit
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

export default Repair;
