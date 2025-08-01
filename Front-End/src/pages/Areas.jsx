import React from "react";
import "../styles/areas.css";

const Areas = () => {
  const areas = [
    {
      name: "Ardèche",
      cities: ["Annonay", "Aubenas", "Privas", "Tournon-sur-Rhône", "Valence", "Viviers", "Largentière"],
      description: "Intervention dans tout le département de l'Ardèche pour tous vos travaux de couverture",
      icon: "🏔️",
      population: "330,000+",
      coverage: "5,529 km²"
    },
    {
      name: "Drôme",
      cities: ["Valence", "Romans-sur-Isère", "Montélimar", "Die", "Nyons", "Crest", "Pierrelatte"],
      description: "Couverture et rénovation dans la Drôme avec expertise locale",
      icon: "🌿",
      population: "510,000+",
      coverage: "6,530 km²"
    },
    {
      name: "Isère",
      cities: ["Grenoble", "Vienne", "Voiron", "Saint-Marcellin", "La Tour-du-Pin", "Bourgoin-Jallieu"],
      description: "Services de couverture en Isère avec intervention rapide",
      icon: "⛰️",
      population: "1,250,000+",
      coverage: "7,431 km²"
    },
    {
      name: "Loire",
      cities: ["Saint-Étienne", "Roanne", "Montbrison", "Feurs", "Saint-Chamond", "Firminy"],
      description: "Intervention dans la Loire pour tous types de toitures",
      icon: "🏭",
      population: "760,000+",
      coverage: "4,781 km²"
    },
    {
      name: "Rhône",
      cities: ["Lyon", "Villefranche-sur-Saône", "Tarare", "Belleville", "Givors", "Caluire-et-Cuire"],
      description: "Couverture dans le Rhône avec expertise métropolitaine",
      icon: "🏙️",
      population: "1,850,000+",
      coverage: "3,249 km²"
    },
    {
      name: "Ain",
      cities: ["Bourg-en-Bresse", "Oyonnax", "Belley", "Ambérieu-en-Bugey", "Gex", "Ferney-Voltaire"],
      description: "Services dans l'Ain avec intervention sur mesure",
      icon: "🌲",
      population: "650,000+",
      coverage: "5,762 km²"
    }
  ];

  const stats = [
    { number: "6", label: "Départements couverts" },
    { number: "50+", label: "Villes principales" },
    { number: "24h", label: "Intervention d'urgence" },
    { number: "100%", label: "Zone couverte" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Zones d'intervention</h1>
            <p>Nous intervenons dans toute la région Rhône-Alpes</p>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Nos zones d'intervention</h2>
          <p className="section-subtitle">
            Nous intervenons dans toute la région Rhône-Alpes pour vos travaux de couverture
          </p>
          <div className="grid grid-3">
            {areas.map((area, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-icon">📍</div>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <div style={{ marginTop: '15px' }}>
                    <strong>Villes principales :</strong>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px',
                      marginTop: '8px'
                    }}>
                      {area.cities.map((city, cityIndex) => (
                        <span key={cityIndex} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Carte de nos interventions</h2>
          <p className="section-subtitle">
            Découvrez notre zone d'intervention
          </p>
          <div style={{
            backgroundColor: '#e5e7eb',
            height: '400px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Carte interactive - Région Rhône-Alpes
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="cta-buttons" style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                <span>📋</span>
                Demander un devis gratuit
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

export default Areas;
