import React from "react";
import { Link } from "react-router-dom";

const Couverture = () => {
  const heroData = {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Couverture",
    subtitle: "Installation et réparation de toitures",
    description: "Expertise en tous types de couvertures"
  };

  const services = [
    {
      title: "Tuiles Traditionnelles",
      description: "Pose et réparation de tuiles en terre cuite",
      details: [
        "Tuiles canal et tuiles plates",
        "Tuiles romanes et tuiles mécaniques",
        "Pose sur volige ou liteaux",
        "Raccordements et finitions"
      ]
    },
    {
      title: "Ardoises",
      description: "Installation et entretien de toitures en ardoise",
      details: [
        "Ardoises naturelles",
        "Ardoises synthétiques",
        "Pose sur volige",
        "Crochets et clous spéciaux"
      ]
    },
    {
      title: "Métal et Zinc",
      description: "Couvertures métalliques et en zinc",
      details: [
        "Tôles ondulées",
        "Zinc en feuilles",
        "Pose sur chevrons",
        "Raccordements étanches"
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
              <h2 className="section-title">Notre expertise en couverture</h2>
              <p>
                BN BÂTIMENT maîtrise tous les types de couvertures pour garantir 
                l'étanchéité et la durabilité de votre toiture. Notre équipe de 
                couvreurs qualifiés intervient pour l'installation, la réparation 
                et l'entretien de tous types de matériaux.
              </p>
              <p>
                Que vous optiez pour des tuiles traditionnelles, des ardoises ou 
                des matériaux modernes, nous vous assurons une pose professionnelle 
                et des finitions impeccables.
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
                  <div className="card-icon animate-float">🏺</div>
                  <h3>Tuiles</h3>
                  <p>Terre cuite traditionnelle</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🪨</div>
                  <h3>Ardoises</h3>
                  <p>Naturelles et synthétiques</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">⚙️</div>
                  <h3>Métal</h3>
                  <p>Tôles et zinc</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🔧</div>
                  <h3>Accessoires</h3>
                  <p>Crochets, clous, liteaux</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container text-center fade-in-on-scroll">
          <h2 className="section-title">Besoin d'un devis pour votre couverture ?</h2>
          <p className="section-subtitle">
            Contactez-nous pour un devis gratuit et personnalisé
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary hover-glow">
              <span>📋</span>
              DEVIS GRATUIT
            </Link>
            <a href="tel:33780326427" className="btn btn-secondary">
              <span>📞</span>
              Appelez maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Couverture; 