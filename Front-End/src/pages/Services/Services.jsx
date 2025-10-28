import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServices } from '../../api/services';
import { getServiceImage } from '../../utils/imageUtils';
import { getIconComponent } from '../../utils/iconMapping';
import SEO from '../../components/SEO';
import '../../styles/services.css';


// Function to get the correct image URL for services
const getServiceImageUrl = (imagePath) => {
  if (!imagePath || imagePath === '' || imagePath === null) {
    return null;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, construct the full URL
  // Use the API route to serve images
  const baseUrl = 'https://api.bnbatiment.com/api';
  return `${baseUrl}${imagePath}`;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEO Data for Services Page
  const seoData = {
    title: "Installation Réparation Entretien Toiture - BN BÂTIMENT Expert Couvreur Paris",
    description: "BN BÂTIMENT, expert installation toiture, réparation fuites, entretien toiture, démoussage, nettoyage toiture à Paris. Devis gratuit. Intervention 24h/24. Expert toiture certifié.",
    keywords: "installation toiture, réparation fuites, entretien toiture, démoussage toiture, nettoyage toiture, couvreur Paris, expert toiture Paris, installation toiture Paris, réparation fuites toiture Paris, entretien toiture Paris, démoussage toiture Paris, nettoyage toiture Paris, pose toiture, remplacement toiture, réparation infiltration toiture, réparation fuite toiture, détection fuite toiture, réparation rapide fuite toiture, maintenance toiture, entretien régulier toiture, prolonger durée vie toiture, démoussage traitement hydrofuge, élimination mousses toiture, traitement protecteur toiture, nettoyage haute pression toiture, nettoyage doux toiture, toiture propre, toiture saine, installation couverture, réparation couverture, entretien couverture, démoussage couverture, nettoyage couverture, installation tuiles, réparation tuiles, entretien tuiles, démoussage tuiles, nettoyage tuiles, installation ardoises, réparation ardoises, entretien ardoises, démoussage ardoises, nettoyage ardoises, installation zinc, réparation zinc, entretien zinc, démoussage zinc, nettoyage zinc, installation cuivre, réparation cuivre, entretien cuivre, démoussage cuivre, nettoyage cuivre, installation PVC, réparation PVC, entretien PVC, démoussage PVC, nettoyage PVC, installation aluminium, réparation aluminium, entretien aluminium, démoussage aluminium, nettoyage aluminium, installation acier, réparation acier, entretien acier, démoussage acier, nettoyage acier, installation inox, réparation inox, entretien inox, démoussage inox, nettoyage inox, installation titane, réparation titane, entretien titane, démoussage titane, nettoyage titane, installation composite, réparation composite, entretien composite, démoussage composite, nettoyage composite, installation bitume, réparation bitume, entretien bitume, démoussage bitume, nettoyage bitume, installation membrane, réparation membrane, entretien membrane, démoussage membrane, nettoyage membrane, installation étanchéité, réparation étanchéité, entretien étanchéité, démoussage étanchéité, nettoyage étanchéité, installation ventilation, réparation ventilation, entretien ventilation, démoussage ventilation, nettoyage ventilation, installation écran sous-toiture, réparation écran sous-toiture, entretien écran sous-toiture, démoussage écran sous-toiture, nettoyage écran sous-toiture, installation pare-vapeur, réparation pare-vapeur, entretien pare-vapeur, démoussage pare-vapeur, nettoyage pare-vapeur, installation liteaux, réparation liteaux, entretien liteaux, démoussage liteaux, nettoyage liteaux, installation volige, réparation volige, entretien volige, démoussage volige, nettoyage volige, installation chevrons, réparation chevrons, entretien chevrons, démoussage chevrons, nettoyage chevrons, installation pannes, réparation pannes, entretien pannes, démoussage pannes, nettoyage pannes, installation fermes, réparation fermes, entretien fermes, démoussage fermes, nettoyage fermes, installation poutres, réparation poutres, entretien poutres, démoussage poutres, nettoyage poutres, installation solives, réparation solives, entretien solives, démoussage solives, nettoyage solives, installation plancher, réparation plancher, entretien plancher, démoussage plancher, nettoyage plancher, installation escalier, réparation escalier, entretien escalier, démoussage escalier, nettoyage escalier, installation terrasse, réparation terrasse, entretien terrasse, démoussage terrasse, nettoyage terrasse, installation pergola, réparation pergola, entretien pergola, démoussage pergola, nettoyage pergola, installation abri jardin, réparation abri jardin, entretien abri jardin, démoussage abri jardin, nettoyage abri jardin, installation cabane, réparation cabane, entretien cabane, démoussage cabane, nettoyage cabane, installation chalet, réparation chalet, entretien chalet, démoussage chalet, nettoyage chalet, installation maison ossature bois, réparation maison ossature bois, entretien maison ossature bois, démoussage maison ossature bois, nettoyage maison ossature bois, installation construction bois, réparation construction bois, entretien construction bois, démoussage construction bois, nettoyage construction bois, installation rénovation bois, réparation rénovation bois, entretien rénovation bois, démoussage rénovation bois, nettoyage rénovation bois, installation traitement bois, réparation traitement bois, entretien traitement bois, démoussage traitement bois, nettoyage traitement bois, installation lasure, réparation lasure, entretien lasure, démoussage lasure, nettoyage lasure, installation peinture bois, réparation peinture bois, entretien peinture bois, démoussage peinture bois, nettoyage peinture bois, installation protection bois, réparation protection bois, entretien protection bois, démoussage protection bois, nettoyage protection bois, installation anti-termites, réparation anti-termites, entretien anti-termites, démoussage anti-termites, nettoyage anti-termites, installation anti-fongique, réparation anti-fongique, entretien anti-fongique, démoussage anti-fongique, nettoyage anti-fongique, installation hydrofuge, réparation hydrofuge, entretien hydrofuge, démoussage hydrofuge, nettoyage hydrofuge, installation oléofuge, réparation oléofuge, entretien oléofuge, démoussage oléofuge, nettoyage oléofuge, installation saturateur, réparation saturateur, entretien saturateur, démoussage saturateur, nettoyage saturateur, installation vernis, réparation vernis, entretien vernis, démoussage vernis, nettoyage vernis, installation enduit, réparation enduit, entretien enduit, démoussage enduit, nettoyage enduit, installation crépis, réparation crépis, entretien crépis, démoussage crépis, nettoyage crépis, installation ravalement façade, réparation ravalement façade, entretien ravalement façade, démoussage ravalement façade, nettoyage ravalement façade, installation rénovation façade, réparation rénovation façade, entretien rénovation façade, démoussage rénovation façade, nettoyage rénovation façade, installation nettoyage façade, réparation nettoyage façade, entretien nettoyage façade, démoussage nettoyage façade, nettoyage façade, installation hydrogommage, réparation hydrogommage, entretien hydrogommage, démoussage hydrogommage, nettoyage hydrogommage, installation sablage, réparation sablage, entretien sablage, démoussage sablage, nettoyage sablage, installation gommage, réparation gommage, entretien gommage, démoussage gommage, nettoyage gommage, installation ponçage, réparation ponçage, entretien ponçage, démoussage ponçage, nettoyage ponçage, devis gratuit installation toiture, devis gratuit réparation fuites, devis gratuit entretien toiture, devis gratuit démoussage, devis gratuit nettoyage toiture, prix installation toiture, prix réparation fuites, prix entretien toiture, prix démoussage, prix nettoyage toiture, tarifs installation toiture, tarifs réparation fuites, tarifs entretien toiture, tarifs démoussage, tarifs nettoyage toiture, intervention d'urgence installation toiture, intervention d'urgence réparation fuites, intervention d'urgence entretien toiture, intervention d'urgence démoussage, intervention d'urgence nettoyage toiture, BN BÂTIMENT, entreprise construction, artisan bâtiment, professionnel construction, expert construction, spécialiste construction, intervention construction, réparation construction, rénovation construction, maintenance construction, installation construction, pose construction, montage construction, assemblage construction, fabrication construction, réalisation construction, exécution construction, mise en œuvre construction, application construction, traitement construction, finition construction, décoration construction, aménagement construction, équipement construction",
    url: "/services",
    image: "/logo.png"
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        padding: '2rem'
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '1.1rem' }}>
          Chargement des services...
        </p>
      </div>
    );
  }

  return (
    <div>
      <SEO {...seoData} />
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.guide-travaux-toiture.be/wp-content/uploads/sites/2/2024/05/couverture-toiture-tuile.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 1rem",
        textAlign: "center",
      }}>
        <div className="container">
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                color: "#ffffff",
                fontSize: "3.5rem",
                fontWeight: "700",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                marginBottom: "1rem"
              }}
            >
              {React.createElement(getIconComponent('🏠'))} Services de Toiture en France
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                color: "white",
                fontSize: "1.4rem",
                fontWeight: "500",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              <strong>Expertise française en couverture et toiture</strong><br/>
              Découvrez nos services premium pour protéger et embellir votre maison
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ marginTop: "2rem" }}
            >
              <Link to="/contact" className="btn-primary" style={{
                fontSize: "1.2rem",
                padding: "1rem 2rem",
                backgroundColor: "#3b82f6",
                color: "white",
                textDecoration: "none",
                borderRadius: "50px",
                display: "inline-block",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)"
              }}>
                🚀 Demander un devis gratuit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2 className="section-title" style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "1rem"
            }}>
              🎯 Nos Services Premium
            </h2>
            <p className="section-subtitle" style={{
              fontSize: "1.2rem",
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto"
            }}>
              <strong>Excellence française en couverture et toiture</strong><br/>
              <br/>
              Nous proposons de nombreux services répondant chacun aux besoins spécifiques de nos clients
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
              padding: "1rem 0"
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  y: -5
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Service Badge */}
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  zIndex: 10
                }}>
                  {service.category || 'Service'}
                </div>

                {/* Service Image */}
                <div className="service-image" style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                  position: "relative",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <img 
                    src={getServiceImageUrl(service.image) || getServiceImage(service.title)} 
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "transform 0.3s ease",
                      backgroundColor: "#f8fafc",
                      display: "block"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    onError={(e) => {
                      e.target.src = getServiceImage(service.title);
                    }}
                  />
                </div>
                
                {/* Service Content */}
                <div className="service-content">
                  <h3 className="service-title" style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1e293b",
                    marginBottom: "1rem"
                  }}>
                    {service.title}
                  </h3>
                  <p className="service-description" style={{
                    color: "#64748b",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem"
                  }}>
                    {service.description}
                  </p>
                  
                  {/* Service Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="service-features" style={{ marginBottom: "1.5rem" }}>
                      <h4 style={{ 
                        fontSize: "1.1rem", 
                        fontWeight: "600", 
                        color: "#1e293b",
                        marginBottom: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        ✨ Caractéristiques:
                      </h4>
                      <ul style={{ 
                        listStyle: "none", 
                        padding: 0,
                        margin: 0
                      }}>
                        {service.features.slice(0, 3).map((feature, index) => (
                          <motion.li 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                              padding: "0.3rem 0",
                              color: "#64748b",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <span style={{ 
                              color: "#3b82f6", 
                              marginRight: "0.5rem",
                              fontSize: "1.2rem"
                            }}>✓</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Service Actions */}
                  <div className="service-actions" style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "column"
                  }}>
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="btn-primary"
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        padding: "0.8rem 1.5rem",
                        borderRadius: "10px",
                        textDecoration: "none",
                        textAlign: "center",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        display: "block"
                      }}
                    >
                      🔍 Voir les détails
                    </Link>
                    <Link 
                      to="/contact" 
                      className="btn-secondary"
                      style={{
                        backgroundColor: "transparent",
                        color: "#3b82f6",
                        padding: "0.8rem 1.5rem",
                        borderRadius: "10px",
                        textDecoration: "none",
                        textAlign: "center",
                        fontWeight: "600",
                        border: "2px solid #3b82f6",
                        transition: "all 0.3s ease",
                        display: "block"
                      }}
                    >
                      📋 Demander un devis
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#64748b"
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1e293b" }}>
                Aucun service trouvé
              </h3>
              <p>Contactez-nous pour plus d'informations sur nos services.</p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            className="services-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textAlign: "center",
              marginTop: "4rem",
              padding: "3rem",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "1rem"
            }}>
              🚀 Besoin d'une consultation gratuite ?
            </h3>
            <p style={{
              fontSize: "1.1rem",
              color: "#64748b",
              marginBottom: "2rem"
            }}>
              Contactez-nous maintenant et obtenez un devis personnalisé pour votre projet de toiture
            </p>
            <div className="cta-buttons" style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <Link to="/contact" className="btn-primary" style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>📋</span>
                Demander un devis gratuit
              </Link>
              <a href="tel:33780326427" className="btn-secondary" style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>📞</span>
                Appelez maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
