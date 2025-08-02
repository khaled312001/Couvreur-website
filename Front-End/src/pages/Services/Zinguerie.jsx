import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { 
  Phone, Clock, ArrowRight, MapPin, CheckCircle, 
  Wrench, Shield, Target, Building
} from 'lucide-react';
import '../../styles/service-details.css';

const Zinguerie = () => {
  const heroData = {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Zinguerie",
    subtitle: "Travaux de zinguerie et d'étanchéité",
    description: "Expertise en raccordements et étanchéité"
  };

  const services = [
    {
      title: "Gouttières",
      description: "Installation et réparation de gouttières",
      details: [
        "Gouttières en zinc",
        "Gouttières en PVC",
        "Gouttières en aluminium",
        "Pose et raccordements"
      ]
    },
    {
      title: "Chéneaux",
      description: "Raccordements de toitures et chéneaux",
      details: [
        "Chéneaux en zinc",
        "Raccordements étanches",
        "Joints de dilatation",
        "Finitions professionnelles"
      ]
    },
    {
      title: "Étanchéité",
      description: "Solutions d'étanchéité complètes",
      details: [
        "Membranes d'étanchéité",
        "Raccordements de cheminées",
        "Protection contre les infiltrations",
        "Maintenance préventive"
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
              <h2 className="section-title">Notre expertise en zinguerie</h2>
              <p>
                BN BÂTIMENT est spécialisé dans tous les travaux de zinguerie et 
                d'étanchéité pour garantir la protection de votre toiture. Notre 
                équipe de zingueurs qualifiés maîtrise les techniques de raccordement 
                et d'étanchéité.
              </p>
              <p>
                De l'installation de gouttières à la réalisation de chéneaux en passant 
                par les solutions d'étanchéité, nous vous assurons des travaux durables 
                et professionnels.
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
                  <div className="card-icon animate-float">⚙️</div>
                  <h3>Zinc</h3>
                  <p>Feuilles et accessoires</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🔧</div>
                  <h3>PVC</h3>
                  <p>Gouttières et raccordements</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.3s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🛡️</div>
                  <h3>Membranes</h3>
                  <p>Étanchéité et protection</p>
                </div>
              </div>
            </div>
            <div className="fade-in-on-scroll" style={{ animationDelay: "0.4s" }}>
              <div className="card hover-lift">
                <div className="card-content text-center">
                  <div className="card-icon animate-float">🔨</div>
                  <h3>Accessoires</h3>
                  <p>Crochets, vis, joints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="process-section">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="process-header"
            >
              <div className="section-badge">
                <div className="badge-square"></div>
                <span>NOTRE PROCESSUS</span>
              </div>
              <h2>Notre processus de zinguerie</h2>
              <p>Une approche technique pour vos travaux de zinguerie</p>
            </motion.div>
            
            <div className="process-steps">
              <motion.div 
                className="process-step"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="step-number">1</div>
                <div className="step-icon">
                  <Phone size={32} />
                </div>
                <div className="step-content">
                  <h4>Contact initial</h4>
                  <p>Appel ou formulaire pour comprendre vos besoins en zinguerie</p>
                  <div className="step-duration">
                    <Clock size={16} />
                    <span>15-30 min</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <ArrowRight size={24} />
                </div>
              </motion.div>
              
              <motion.div 
                className="process-step"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="step-number">2</div>
                <div className="step-icon">
                  <MapPin size={32} />
                </div>
                <div className="step-content">
                  <h4>Visite technique</h4>
                  <p>Inspection de votre toiture et analyse des raccordements nécessaires</p>
                  <div className="step-duration">
                    <Clock size={16} />
                    <span>1-2 heures</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <ArrowRight size={24} />
                </div>
              </motion.div>
              
              <motion.div 
                className="process-step"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="step-number">3</div>
                <div className="step-icon">
                  <CheckCircle size={32} />
                </div>
                <div className="step-content">
                  <h4>Validation du projet</h4>
                  <p>Signature du devis et planification des travaux de zinguerie</p>
                  <div className="step-duration">
                    <Clock size={16} />
                    <span>1-3 jours</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <ArrowRight size={24} />
                </div>
              </motion.div>
              
              <motion.div 
                className="process-step"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="step-number">4</div>
                <div className="step-icon">
                  <Wrench size={32} />
                </div>
                <div className="step-content">
                  <h4>Réalisation</h4>
                  <p>Exécution des travaux de zinguerie avec suivi qualité</p>
                  <div className="step-duration">
                    <Clock size={16} />
                    <span>Selon projet</span>
                  </div>
                </div>
                <div className="step-completion">
                  <CheckCircle size={20} />
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="process-summary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <div className="summary-card">
                <div className="summary-icon">
                  <Shield size={32} />
                </div>
                <div className="summary-content">
                  <h4>Garantie et expertise</h4>
                  <p>Tous nos travaux de zinguerie bénéficient d'une garantie décennale et d'un suivi post-réalisation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container text-center fade-in-on-scroll">
          <h2 className="section-title">Besoin d'un devis pour votre zinguerie ?</h2>
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

export default Zinguerie; 