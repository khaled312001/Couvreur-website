import React from "react";

const Maintenance = () => {
  const services = [
    {
      title: "Nettoyage de toiture",
      description: "Nettoyage complet, démoussage et traitement hydrofuge",
      icon: "🧹",
     
    },
    {
      title: "Inspection annuelle",
      description: "Contrôle complet de l'état de votre toiture",
      icon: "🔍",
      
    },
    {
      title: "Entretien des gouttières",
      description: "Nettoyage et vérification des gouttières",
      icon: "🌊",
      
    },
    {
      title: "Traitement anti-mousse",
      description: "Traitement préventif contre la mousse",
      icon: "🌿",
      
    }
  ];

  const benefits = [
    "Prévention des fuites",
    "Prolongation de la durée de vie",
    "Économies à long terme",
    "Garantie de bon fonctionnement"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
  className="hero" 
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://th.bing.com/th/id/R.19780281439d7f8e6ff3586f4844ea0e?rik=umar%2fb7c5Sqw%2fw&riu=http%3a%2f%2fwww.renovationettravaux.fr%2fwp-content%2fuploads%2f2015%2f05%2fnettoyage-dune-toiture.jpg&ehk=QaX9iRVX84i8diBTw%2bhYEUpB4Evfv5XbfIovyNhKvfI%3d&risl=&pid=ImgRaw&r=0')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'relative'
  }}
>
  <div className="container">
    <div className="hero-content">
      <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
        Entretien de Toiture
      </h1>
      <p style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
        Maintenance préventive pour préserver votre toiture
      </p>
    </div>
  </div>
</section>


      {/* Description Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <h2 className="section-title">Entretien préventif</h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#6b7280' }}>
                L'entretien régulier de votre toiture est essentiel pour prévenir les problèmes 
                et prolonger sa durée de vie. Nous proposons des services d'entretien adaptés 
                à tous types de toitures.
              </p>
              <p style={{ lineHeight: '1.8', color: '#6b7280' }}>
                Un entretien annuel permet de détecter et corriger les petits problèmes avant 
                qu'ils ne deviennent critiques.
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Avantages de l'entretien</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
                    <span>{benefit}</span>
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
          <h2 className="section-title">Nos services d'entretien</h2>
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

      {/* Frequency Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Fréquence recommandée</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-content">
                <div className="card-icon">📅</div>
                <h3>Inspection annuelle</h3>
                <p>Contrôle complet de l'état de la toiture</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🧹</div>
                <h3>Nettoyage tous les 2-3 ans</h3>
                <p>Nettoyage et traitement anti-mousse</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <div className="card-icon">🌊</div>
                <h3>Gouttières 2 fois/an</h3>
                <p>Nettoyage des gouttières au printemps et automne</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un entretien ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour programmer un entretien
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

export default Maintenance;
