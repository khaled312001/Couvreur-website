import React from "react";

const Installation = () => {
  const steps = [
    {
      title: "Diagnostic et devis",
      description: "Inspection complète de votre toiture et devis détaillé",
      icon: "🔍"
    },
    {
      title: "Préparation du chantier",
      description: "Protection des zones sensibles et mise en place du matériel",
      icon: "🛠️"
    },
    {
      title: "Dépose de l'ancienne couverture",
      description: "Retrait soigneux de l'ancienne toiture",
      icon: "🏗️"
    },
    {
      title: "Pose de l'écran de sous-toiture",
      description: "Installation de l'écran de protection",
      icon: "🛡️"
    },
    {
      title: "Pose des tuiles ou ardoises",
      description: "Installation de la nouvelle couverture",
      icon: "🏠"
    },
    {
      title: "Zinguerie et raccordements",
      description: "Pose des gouttières et finitions",
      icon: "🔧"
    }
  ];

  const materials = [
    {
      name: "Tuiles",
      description: "Tuiles en terre cuite ou béton",
      price: "À partir de 25€/m²"
    },
    {
      name: "Ardoises",
      description: "Ardoises naturelles ou synthétiques",
      price: "À partir de 45€/m²"
    },
    {
      name: "Zinc",
      description: "Couverture en zinc traditionnel",
      price: "À partir de 35€/m²"
    },
    {
      name: "Métal",
      description: "Tôles d'acier ou aluminium",
      price: "À partir de 30€/m²"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Installation de Toiture</h1>
            <p>Installation complète de toiture neuve</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <h2 className="section-title">Installation de toiture neuve</h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.8', color: '#6b7280' }}>
                Nous réalisons l'installation complète de toitures neuves pour particuliers 
                et professionnels. Notre équipe expérimentée garantit un travail de qualité 
                dans le respect des normes en vigueur.
              </p>
              <p style={{ lineHeight: '1.8', color: '#6b7280' }}>
                Nous intervenons sur tous types de toitures : tuiles, ardoises, zinc, métal. 
                Chaque projet est unique et fait l'objet d'un devis personnalisé.
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Nos garanties</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
                  <span>Garantie décennale</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
                  <span>Assurance tous risques</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
                  <span>Respect des délais</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
                  <span>Devis gratuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Notre processus d'installation</h2>
          <div className="grid grid-3">
            {steps.map((step, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-icon">{step.icon}</div>
                  <div style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                  }}>
                    {index + 1}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Matériaux disponibles</h2>
          <p className="section-subtitle">
            Nous proposons une large gamme de matériaux de couverture
          </p>
          <div className="grid grid-2">
            {materials.map((material, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <h3>{material.name}</h3>
                  <p style={{ marginBottom: '15px', color: '#6b7280' }}>
                    {material.description}
                  </p>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1e3a8a'
                  }}>
                    {material.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
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

export default Installation;
