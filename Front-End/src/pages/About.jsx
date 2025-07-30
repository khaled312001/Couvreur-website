import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: "🏗️",
      title: "Charpente",
      description: "Construction et rénovation de charpentes traditionnelles et modernes"
    },
    {
      icon: "🏠",
      title: "Couverture",
      description: "Installation et réparation de tous types de couvertures"
    },
    {
      icon: "⚡",
      title: "Zinguerie",
      description: "Travaux de zinguerie et d'étanchéité pour votre toiture"
    }
  ];

  const team = [
    {
      role: "Charpentier",
      description: "Expert en construction de charpentes"
    },
    {
      role: "Couvreur",
      description: "Spécialiste en couverture de toitures"
    },
    {
      role: "Zingueur",
      description: "Professionnel en zinguerie et étanchéité"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <h1>BN BÂTIMENT</h1>
            
            <div className="hero-subtitle animate-slideInLeft">Spécialiste en charpente, couverture et zinguerie</div>
            <p className="animate-slideInRight">Plus de 10 ans d'expérience dans le bâtiment</p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="fade-in-on-scroll">
              <h2 className="section-title">Notre Histoire</h2>
              <p>
                BN BÂTIMENT est une entreprise spécialisée dans les travaux de charpente, 
                couverture et zinguerie. Depuis notre création, nous nous engageons à 
                fournir des services de qualité pour tous types de projets : construction 
                neuve, rénovation et entretien.
              </p>
              <p>
                Notre équipe d'artisans qualifiés intervient dans toute la région pour 
                réaliser vos projets avec professionnalisme et savoir-faire. Nous mettons 
                un point d'honneur à respecter les délais et à vous proposer des solutions 
                adaptées à vos besoins et à votre budget.
              </p>
            </div>
            <div className="fade-in-on-scroll">
              <div className="card hover-lift">
                <div className="card-content">
                  <h3>Nos Engagements</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#1e3a8a', fontSize: '20px' }}>✓</span>
                      Devis gratuit et personnalisé
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#1e3a8a', fontSize: '20px' }}>✓</span>
                      Travaux garantis
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#1e3a8a', fontSize: '20px' }}>✓</span>
                      Respect des délais
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#1e3a8a', fontSize: '20px' }}>✓</span>
                      Prix compétitifs
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-title fade-in-on-scroll">Nos Valeurs</div>
          <div className="section-subtitle fade-in-on-scroll">
            Qualité, professionnalisme et satisfaction client
          </div>
          <div className="grid grid-3">
            {values.map((value, index) => (
              <div key={index} className="fade-in-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
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
        <div className="container">
          <div className="section-title fade-in-on-scroll">Notre Équipe</div>
          <div className="section-subtitle fade-in-on-scroll">
            Des artisans qualifiés et expérimentés
          </div>
          <div className="grid grid-3">
            {team.map((member, index) => (
              <div key={index} className="fade-in-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
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
        <div className="container">
          <div className="text-center fade-in-on-scroll">
            <h2 className="section-title">Prêt à commencer votre projet ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <Link to="/contact" className="btn btn-primary hover-glow">
              DEVIS GRATUIT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};




export default About;
