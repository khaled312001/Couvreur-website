import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const heroData = {
    image:
      "https://tse2.mm.bing.net/th/id/OIP.XncALc9JsIb4YsyvttrlAQHaDO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "BN BÂTIMENT : Charpente • Couverture • Zinguerie",
    subtitle: "Drôme (26) et Ardèche (07)",
    description:
      "Plus de 10 ans d'expérience dans la construction, la rénovation et l'entretien de toitures.",
    cta: "DEMANDER UN DEVIS"
  };

  const values = [
    { icon: "🏗️", title: "Charpente", description: "Construction et rénovation de charpentes traditionnelles et modernes" },
    { icon: "🏠", title: "Couverture", description: "Installation et réparation de tous types de couvertures" },
    { icon: "⚡", title: "Zinguerie", description: "Travaux de zinguerie et d'étanchéité pour votre toiture" }
  ];

  const team = [
    { role: "Charpentier", description: "Expert en construction de charpentes" },
    { role: "Couvreur", description: "Spécialiste en couverture de toitures" },
    { role: "Zingueur", description: "Professionnel en zinguerie et étanchéité" }
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
            {heroData.cta}
          </Link>
        </div>
      </section>

      {/* Company History */}
      <section className="section">
        <div className="container grid grid-2">
          <div className="fade-in-on-scroll">
            <h2 className="section-title">Notre Histoire</h2>
            <p>
              BN BÂTIMENT est une entreprise spécialisée dans les travaux de
              charpente, couverture et zinguerie. Depuis notre création, nous
              nous engageons à fournir des services de qualité pour tous types
              de projets : construction neuve, rénovation et entretien.
            </p>
            <p>
              Notre équipe d'artisans qualifiés intervient dans toute la région
              pour réaliser vos projets avec professionnalisme et savoir-faire.
              Nous mettons un point d'honneur à respecter les délais et à vous
              proposer des solutions adaptées à vos besoins et à votre budget.
            </p>
          </div>
          <div className="fade-in-on-scroll">
            <div className="card hover-lift">
              <div className="card-content">
                <h3>Nos Engagements</h3>
                <ul className="list-none p-0">
                  {[
                    "Devis gratuit et personnalisé",
                    "Travaux garantis",
                    "Respect des délais",
                    "Prix compétitifs"
                  ].map((item, index) => (
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section section-gray">
        <div className="container text-center">
          <div className="section-title fade-in-on-scroll">Nos Valeurs</div>
          <div className="section-subtitle fade-in-on-scroll">
            Qualité, professionnalisme et satisfaction client
          </div>
          <div className="grid grid-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card hover-lift">
                  <div className="card-content">
                    <div className="card-icon animate-float">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container text-center">
          <div className="section-title fade-in-on-scroll">Notre Équipe</div>
          <div className="section-subtitle fade-in-on-scroll">
            Des artisans qualifiés et expérimentés
          </div>
          <div className="grid grid-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card hover-lift">
                  <div className="card-content">
                    <h3>{member.role}</h3>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container text-center fade-in-on-scroll">
          <h2 className="section-title">Prêt à commencer votre projet ?</h2>
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

export default About;
