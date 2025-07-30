import React from "react";
import { Link } from "react-router-dom";

const Charpente = () => {
  const heroData = {
    image: "https://tse1.mm.bing.net/th/id/OIP.N9BeEMrCNgaYcOHg0uXcKwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Charpente",
    subtitle: "Construction et rénovation de charpentes",
    description: "Expertise en charpente traditionnelle et moderne"
  };

  const services = [
    {
      title: "Charpente Traditionnelle",
      description: "Construction de charpentes en bois massif selon les techniques ancestrales",
      details: [
        "Charpente à fermettes traditionnelles",
        "Assemblage à tenons et mortaises",
        "Bois de chêne, châtaignier ou sapin",
        "Calcul de résistance aux charges"
      ]
    },
    {
      title: "Charpente Moderne",
      description: "Charpentes industrielles et techniques contemporaines",
      details: [
        "Fermettes préfabriquées",
        "Charpente métallique",
        "Bois lamellé-collé",
        "Solutions sur mesure"
      ]
    },
    {
      title: "Rénovation de Charpente",
      description: "Réparation et renforcement de charpentes existantes",
      details: [
        "Diagnostic de l'état de la charpente",
        "Traitement contre les insectes xylophages",
        "Renforcement des éléments fragilisés",
        "Remplacement partiel ou total"
      ]
    }
  ];

  const avantages = [
    "Plus de 10 ans d'expérience",
    "Devis gratuit et détaillé",
    "Travaux garantis",
    "Respect des normes en vigueur",
    "Intervention rapide",
    "Prix compétitifs"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundImage: `url(${heroData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* Overlay sombre */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        />
        <div
          className="container text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1 className="animate-fadeInUp">{heroData.title}</h1>
          <p className="animate-slideInLeft">{heroData.subtitle}</p>
          <p className="animate-slideInRight">{heroData.description}</p>
          <Link to="/contact" className="btn btn-primary hover-glow">
            DEVIS GRATUIT
          </Link>
        </div>
      </section>

      {/* Description du service */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="fade-in-on-scroll">
              <h2 className="section-title">Notre expertise en charpente</h2>
              <p>
                BN BÂTIMENT est spécialisé dans la construction et la rénovation de charpentes 
                pour tous types de bâtiments. Notre équipe d'artisans qualifiés maîtrise 
                les techniques traditionnelles et modernes pour vous offrir des solutions 
                adaptées à vos besoins.
              </p>
              <p>
                Que ce soit pour une construction neuve, une rénovation ou un renforcement, 
                nous vous accompagnons dans tous vos projets de charpente avec professionnalisme 
                et savoir-faire.
              </p>
            </div>
            <div className="fade-in-on-scroll">
              <div className="card hover-lift">
                <div className="card-content">
                  <h3>Nos engagements</h3>
                  <ul className="list-none p-0">
                    {avantages.map((avantage, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >
                        <span style={{ color: "#1e3a8a", fontSize: "20px" }}>✓</span>
                        {avantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title text-center fade-in-on-scroll">Nos prestations</h2>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card hover-lift">
                  <div className="card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#6b7280' }}>
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matériaux utilisés */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center fade-in-on-scroll">Nos matériaux</h2>
          <div className="grid grid-4">
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.1s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🌳</div>
                  <h3>Bois massif</h3>
                  <p>Chêne, châtaignier, sapin</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🔧</div>
                  <h3>Bois lamellé</h3>
                  <p>Résistance et stabilité</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">⚙️</div>
                  <h3>Métal</h3>
                  <p>Acier galvanisé</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🛡️</div>
                  <h3>Traitements</h3>
                  <p>Protection contre les insectes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container text-center fade-in-on-scroll">
          <h2 className="section-title">Besoin d'un devis pour votre charpente ?</h2>
          <p className="section-subtitle">
            Contactez-nous pour un devis gratuit et personnalisé
          </p>
          <Link to="/contact" className="btn btn-primary hover-glow">
            DEVIS GRATUIT
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Charpente; 