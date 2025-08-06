import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "../styles/about.css";

const About = () => {
  // SEO Data for About Page
  const seoData = {
    title: "À Propos BN BÂTIMENT - Expert Charpente Couverture Zinguerie Paris",
    description: "Découvrez BN BÂTIMENT, expert en charpente, couverture et zinguerie à Paris. Plus de 10 ans d'expérience. Intervention 24h/24. Devis gratuit. Expert toiture certifié.",
    keywords: "à propos BN BÂTIMENT, histoire BN BÂTIMENT, équipe BN BÂTIMENT, expert charpente Paris, expert couverture Paris, expert zinguerie Paris, spécialiste toiture Paris, professionnel toiture Paris, artisan toiture Paris, entreprise toiture Paris, couvreur Paris, charpentier Paris, zingueur Paris, expert construction Paris, spécialiste construction Paris, professionnel construction Paris, artisan construction Paris, entreprise construction Paris, expert rénovation Paris, spécialiste rénovation Paris, professionnel rénovation Paris, artisan rénovation Paris, entreprise rénovation Paris, expert réparation Paris, spécialiste réparation Paris, professionnel réparation Paris, artisan réparation Paris, entreprise réparation Paris, expert installation Paris, spécialiste installation Paris, professionnel installation Paris, artisan installation Paris, entreprise installation Paris, expert entretien Paris, spécialiste entretien Paris, professionnel entretien Paris, artisan entretien Paris, entreprise entretien Paris, expert maintenance Paris, spécialiste maintenance Paris, professionnel maintenance Paris, artisan maintenance Paris, entreprise maintenance Paris, expert isolation Paris, spécialiste isolation Paris, professionnel isolation Paris, artisan isolation Paris, entreprise isolation Paris, expert étanchéité Paris, spécialiste étanchéité Paris, professionnel étanchéité Paris, artisan étanchéité Paris, entreprise étanchéité Paris, expert ventilation Paris, spécialiste ventilation Paris, professionnel ventilation Paris, artisan ventilation Paris, entreprise ventilation Paris, expert écran sous-toiture Paris, spécialiste écran sous-toiture Paris, professionnel écran sous-toiture Paris, artisan écran sous-toiture Paris, entreprise écran sous-toiture Paris, expert pare-vapeur Paris, spécialiste pare-vapeur Paris, professionnel pare-vapeur Paris, artisan pare-vapeur Paris, entreprise pare-vapeur Paris, expert liteaux Paris, spécialiste liteaux Paris, professionnel liteaux Paris, artisan liteaux Paris, entreprise liteaux Paris, expert volige Paris, spécialiste volige Paris, professionnel volige Paris, artisan volige Paris, entreprise volige Paris, expert chevrons Paris, spécialiste chevrons Paris, professionnel chevrons Paris, artisan chevrons Paris, entreprise chevrons Paris, expert pannes Paris, spécialiste pannes Paris, professionnel pannes Paris, artisan pannes Paris, entreprise pannes Paris, expert fermes Paris, spécialiste fermes Paris, professionnel fermes Paris, artisan fermes Paris, entreprise fermes Paris, expert poutres Paris, spécialiste poutres Paris, professionnel poutres Paris, artisan poutres Paris, entreprise poutres Paris, expert solives Paris, spécialiste solives Paris, professionnel solives Paris, artisan solives Paris, entreprise solives Paris, expert plancher Paris, spécialiste plancher Paris, professionnel plancher Paris, artisan plancher Paris, entreprise plancher Paris, expert escalier Paris, spécialiste escalier Paris, professionnel escalier Paris, artisan escalier Paris, entreprise escalier Paris, expert terrasse Paris, spécialiste terrasse Paris, professionnel terrasse Paris, artisan terrasse Paris, entreprise terrasse Paris, expert pergola Paris, spécialiste pergola Paris, professionnel pergola Paris, artisan pergola Paris, entreprise pergola Paris, expert abri jardin Paris, spécialiste abri jardin Paris, professionnel abri jardin Paris, artisan abri jardin Paris, entreprise abri jardin Paris, expert cabane Paris, spécialiste cabane Paris, professionnel cabane Paris, artisan cabane Paris, entreprise cabane Paris, expert chalet Paris, spécialiste chalet Paris, professionnel chalet Paris, artisan chalet Paris, entreprise chalet Paris, expert maison ossature bois Paris, spécialiste maison ossature bois Paris, professionnel maison ossature bois Paris, artisan maison ossature bois Paris, entreprise maison ossature bois Paris, expert construction bois Paris, spécialiste construction bois Paris, professionnel construction bois Paris, artisan construction bois Paris, entreprise construction bois Paris, expert rénovation bois Paris, spécialiste rénovation bois Paris, professionnel rénovation bois Paris, artisan rénovation bois Paris, entreprise rénovation bois Paris, expert traitement bois Paris, spécialiste traitement bois Paris, professionnel traitement bois Paris, artisan traitement bois Paris, entreprise traitement bois Paris, expert lasure Paris, spécialiste lasure Paris, professionnel lasure Paris, artisan lasure Paris, entreprise lasure Paris, expert peinture bois Paris, spécialiste peinture bois Paris, professionnel peinture bois Paris, artisan peinture bois Paris, entreprise peinture bois Paris, expert protection bois Paris, spécialiste protection bois Paris, professionnel protection bois Paris, artisan protection bois Paris, entreprise protection bois Paris, expert anti-termites Paris, spécialiste anti-termites Paris, professionnel anti-termites Paris, artisan anti-termites Paris, entreprise anti-termites Paris, expert anti-fongique Paris, spécialiste anti-fongique Paris, professionnel anti-fongique Paris, artisan anti-fongique Paris, entreprise anti-fongique Paris, expert hydrofuge Paris, spécialiste hydrofuge Paris, professionnel hydrofuge Paris, artisan hydrofuge Paris, entreprise hydrofuge Paris, expert oléofuge Paris, spécialiste oléofuge Paris, professionnel oléofuge Paris, artisan oléofuge Paris, entreprise oléofuge Paris, expert saturateur Paris, spécialiste saturateur Paris, professionnel saturateur Paris, artisan saturateur Paris, entreprise saturateur Paris, expert vernis Paris, spécialiste vernis Paris, professionnel vernis Paris, artisan vernis Paris, entreprise vernis Paris, expert enduit Paris, spécialiste enduit Paris, professionnel enduit Paris, artisan enduit Paris, entreprise enduit Paris, expert crépis Paris, spécialiste crépis Paris, professionnel crépis Paris, artisan crépis Paris, entreprise crépis Paris, expert ravalement façade Paris, spécialiste ravalement façade Paris, professionnel ravalement façade Paris, artisan ravalement façade Paris, entreprise ravalement façade Paris, expert rénovation façade Paris, spécialiste rénovation façade Paris, professionnel rénovation façade Paris, artisan rénovation façade Paris, entreprise rénovation façade Paris, expert nettoyage façade Paris, spécialiste nettoyage façade Paris, professionnel nettoyage façade Paris, artisan nettoyage façade Paris, entreprise nettoyage façade Paris, expert hydrogommage Paris, spécialiste hydrogommage Paris, professionnel hydrogommage Paris, artisan hydrogommage Paris, entreprise hydrogommage Paris, expert sablage Paris, spécialiste sablage Paris, professionnel sablage Paris, artisan sablage Paris, entreprise sablage Paris, expert gommage Paris, spécialiste gommage Paris, professionnel gommage Paris, artisan gommage Paris, entreprise gommage Paris, expert ponçage Paris, spécialiste ponçage Paris, professionnel ponçage Paris, artisan ponçage Paris, entreprise ponçage Paris, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/a-propos",
    image: "/logo.png"
  };

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
      <SEO {...seoData} />
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
                de projets : construction neuve, Recherche et réparation des fuiteset entretien.
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
