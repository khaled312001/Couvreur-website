import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/services.css';

const Services = () => {
  // قاعدة بيانات الخدمات الثابتة
  const services = [
    {
      id: 1,
      title: "Charpente traditionnelle et moderne",
      description: "Construction et rénovation de charpentes traditionnelles et modernes",
      category: "Construction",
      duration: "2-4 semaines",
      price_range: "Sur devis",
      slug: "charpente",
      features: [
        "Charpente traditionnelle en bois",
        "Charpente moderne en métal",
        "Rénovation de charpente existante"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Couverture traditionnelle",
      description: "Installation et réparation de toitures traditionnelles",
      category: "Couverture",
      duration: "1-3 semaines",
      price_range: "Sur devis",
      slug: "couverture",
      features: [
        "Tuiles traditionnelles",
        "Ardoises naturelles",
        "Couvertures métalliques"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Zinguerie et étanchéité",
      description: "Travaux de zinguerie et d'étanchéité complète",
      category: "Zinguerie",
      duration: "3-7 jours",
      price_range: "Sur devis",
      slug: "zinguerie",
      features: [
        "Gouttières en zinc et PVC",
        "Chéneaux et raccordements",
        "Membranes d'étanchéité"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Installation de toiture neuve",
      description: "Installation complète d'une nouvelle toiture",
      category: "Installation",
      duration: "3-6 semaines",
      price_range: "Sur devis",
      slug: "installation",
      features: [
        "Installation de la charpente",
        "Pose de l'isolation thermique",
        "Installation des tuiles"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Réparation de toiture",
      description: "Réparation et maintenance de toitures",
      category: "Réparation",
      duration: "1-5 jours",
      price_range: "À partir de 500€",
      slug: "repair",
      features: [
        "Réparation de fuites",
        "Remplacement de tuiles",
        "Réparation de gouttières"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Maintenance de toiture",
      description: "Entretien et maintenance préventive",
      category: "Maintenance",
      duration: "1-3 jours",
      price_range: "À partir de 300€",
      slug: "maintenance",
      features: [
        "Nettoyage de toiture",
        "Traitement anti-mousse",
        "Vérification d'étanchéité"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 7,
      title: "Services complémentaires",
      description: "Services additionnels et finitions",
      category: "Extras",
      duration: "Selon projet",
      price_range: "Sur devis",
      slug: "extras",
      features: [
        "Installation de lucarnes",
        "Pose de velux",
        "Isolation thermique"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 1rem",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="hero-content">
            <h1 style={{
              color: "#ffffff",
              fontSize: "3rem",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            }}>
              Nos Services
            </h1>
            <p style={{
              color: "white",
              fontSize: "1.25rem",
              fontWeight: "500",
              textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            }}>
              Nous proposons une gamme complète de services de construction et de rénovation
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Services Spécialisés</h2>
            <p className="section-subtitle">
              Nous proposons des services de haute qualité à des prix compétitifs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="service-features">
                      <h4>Caractéristiques:</h4>
                      <ul>
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="service-meta">
                    <div className="meta-item">
                      <strong>Catégorie:</strong> {service.category}
                    </div>
                    <div className="meta-item">
                      <strong>Durée:</strong> {service.duration}
                    </div>
                    <div className="meta-item">
                      <strong>Prix:</strong> {service.price_range}
                    </div>
                  </div>

                  <div className="service-actions">
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="btn-primary"
                    >
                      Voir les détails
                    </Link>
                    <Link 
                      to="/contact" 
                      className="btn-secondary"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="services-cta">
            <h3>Besoin d'une consultation gratuite ?</h3>
            <p>Contactez-nous maintenant et obtenez un devis personnalisé</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                <span>📋</span>
                Demander un devis
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

export default Services;
