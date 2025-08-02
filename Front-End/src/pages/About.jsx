import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

const About = () => {
  const heroData = {
    image: "https://media.istockphoto.com/id/2221899261/fr/photo/ext%C3%A9rieur-de-maison-de-banlieue-en-%C3%A9t%C3%A9.webp?a=1&b=1&s=612x612&w=0&k=20&c=ENqOLJ61a-sGCI0_NZh9DUVeohL_3__6hZZ0OTEtjdc=",
    title: "BN BÂTIMENT : Charpente • Couverture • Zinguerie",
    subtitle: "Lyon - Saint-Étienne - Valence - Clermont-Ferrand - Francheville - Givors - Vienne et Annonay",
    description: "Plus de 10 ans d'expérience dans la construction, la rénovation et l'entretien de toitures.",
    cta: "DEMANDER UN DEVIS"
  };

  const values = [
    { 
      icon: "🏗️", 
      title: "Charpente", 
      description: "Construction et rénovation de charpentes traditionnelles et modernes",
      image: "https://images.pexels.com/photos/31763541/pexels-photo-31763541.jpeg"
    },
    { 
      icon: "🏠", 
      title: "Couverture", 
      description: "Installation et réparation de tous types de couvertures",
      image: "https://media.istockphoto.com/id/1491980224/fr/photo/un-beau-b%C3%A2timent-patrimonial-%C3%A0-motifs.webp?a=1&s=612x612&w=0&k=20&c=zjh_uND1ufJSsqZInO0sV0Vxaw0LCWIes42w9KI6q8Q="
    },
    { 
      icon: "⚡", 
      title: "Zinguerie", 
      description: "Travaux de zinguerie et d'étanchéité pour votre toiture",
      image: "https://media.istockphoto.com/id/838261782/photo/metal-roof.jpg?s=612x612&w=0&k=20&c=cNo3rPek8HiRcLV1v5ih_KkiuHKn00fX-t2BAT_YCZo="
    }
  ];

  const team = [
    { 
      role: "Charpentier", 
      description: "Expert en construction de charpentes traditionnelles et modernes",
      avatar: "👷‍♂️",
      experience: "10+ ans d'expérience"
    },
    { 
      role: "Couvreur", 
      description: "Spécialiste en couverture de toitures et réparations",
      avatar: "👷‍♂️",
      experience: "12+ ans d'expérience"
    },
    { 
      role: "Zingueur", 
      description: "Professionnel en zinguerie et étanchéité de toitures",
      avatar: "👷‍♂️",
      experience: "10+ ans d'expérience"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets réalisés" },
    { number: "10+", label: "Années d'expérience" },
    { number: "100%", label: "Clients satisfaits" },
    { number: "24/7", label: "Support disponible" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="about-hero"
        style={{
          backgroundImage: `url(${heroData.image})`,
        }}
      >
        <div className="about-hero-content">
          <h1>{heroData.title}</h1>
          <p>{heroData.subtitle}</p>
          <p>{heroData.description}</p>
          <Link to="/contact" className="btn btn-primary">
            <span>📋</span>
            {heroData.cta}
          </Link>
        </div>
      </section>

      {/* Company History */}
      <section className="about-history">
        <div className="container">
          <div className="about-history-content">
            <div className="about-history-text fade-in-on-scroll">
              <h2>Notre Histoire</h2>
              <p>
                BN BÂTIMENT est une entreprise spécialisée dans les travaux de
                charpente, couverture et zinguerie. Depuis notre création, nous
                nous engageons à fournir des services de qualité pour tous types
                de projets : construction neuve, réparation des fuites et entretien.
              </p>
              <p>
                Notre équipe d'artisans qualifiés intervient dans toute la région
                pour réaliser vos projets avec professionnalisme et savoir-faire.
                Nous mettons un point d'honneur à respecter les délais et à vous
                proposer des solutions adaptées à vos besoins et à votre budget.
              </p>
            </div>
            <div className="fade-in-on-scroll">
              <div className="about-commitments">
                <h3>Nos Engagements</h3>
                <ul>
                  {[
                    "Devis gratuit et personnalisé",
                    "Travaux garantis",
                    "Respect des délais",
                    "Prix compétitifs",
                    "Intervention rapide",
                    "Satisfaction client garantie"
                  ].map((item, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-item fade-in-on-scroll">
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container text-center">
          <h2 className="section-title fade-in-on-scroll">Nos Valeurs</h2>
          <p className="section-subtitle fade-in-on-scroll">
            Qualité, professionnalisme et satisfaction client
          </p>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="about-value-card fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="about-value-icon animate-float">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div 
                  className="value-image"
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${value.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    marginTop: '1.5rem',
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container text-center">
          <h2 className="section-title fade-in-on-scroll">Notre Équipe</h2>
          <p className="section-subtitle fade-in-on-scroll">
            Des artisans qualifiés et expérimentés
          </p>
          <div className="about-team-grid">
            {team.map((member, index) => (
              <div
                key={index}
                className="about-team-card fade-in-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="about-team-avatar">{member.avatar}</div>
                <h3>{member.role}</h3>
                <p>{member.description}</p>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  display: 'inline-block',
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content fade-in-on-scroll">
            <h2>Prêt à commencer votre projet ?</h2>
            <p>
              Contactez-nous pour un devis gratuit et personnalisé. Notre équipe 
              d'experts est prête à vous accompagner dans tous vos projets de 
              construction et rénovation.
            </p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="btn-primary">
                <span>📋</span>
                DEVIS GRATUIT
              </Link>
              <a href="tel:33780326427" className="btn-secondary">
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

export default About;
