import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contactApi } from "../../api/contact";
import { getServices } from "../../api/services";
import { motion } from 'framer-motion';
import { 
  Phone, Clock, ArrowRight, MapPin, CheckCircle, 
  Wrench, Shield, Target, Building
} from 'lucide-react';
import '../../styles/service-details.css';


const Couverture = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Couverture traditionnelle',
    message: ''
  });
  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);
  const [contactFormError, setContactFormError] = useState('');
  const [contactFormServices, setContactFormServices] = useState([]);
  const [loadingContactServices, setLoadingContactServices] = useState(true);

  // Load services for contact form
  useEffect(() => {
    const loadContactServices = async () => {
      try {
        setLoadingContactServices(true);
        const servicesData = await getServices();
        setContactFormServices(servicesData);
      } catch (err) {
        console.error('Error fetching contact services:', err);
        // Fallback to default services if API fails
        setContactFormServices([
          { id: 1, title: "Installation", slug: "installation" },
          { id: 2, title: "Réparation", slug: "reparation" },
          { id: 3, title: "Entretien", slug: "entretien" },
          { id: 4, title: "Isolation", slug: "isolation" },
          { id: 5, title: "Charpente", slug: "charpente" },
          { id: 6, title: "Zinguerie", slug: "zinguerie" }
        ]);
      } finally {
        setLoadingContactServices(false);
      }
    };

    loadContactServices();
  }, []);

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

  // Contact form handlers
  const handleContactFormChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setContactFormLoading(true);
    setContactFormError('');

    try {
      await contactApi.createMessage({
        name: contactFormData.name,
        email: contactFormData.email,
        phone: contactFormData.phone,
        subject: contactFormData.service ? `Demande de devis - ${contactFormData.service}` : 'Demande de devis',
        message: contactFormData.message
      });
      setContactFormSuccess(true);
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Couverture traditionnelle',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setContactFormError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setContactFormLoading(false);
    }
  };

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
              <h2>Notre processus de couverture</h2>
              <p>Une approche professionnelle pour votre projet de couverture</p>
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
                  <p>Appel ou formulaire pour comprendre vos besoins en couverture</p>
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
                  <p>Inspection de votre toiture et analyse des matériaux nécessaires</p>
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
                  <p>Signature du devis et planification des travaux de couverture</p>
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
                  <p>Exécution des travaux de couverture avec suivi qualité</p>
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
                  <p>Tous nos travaux de couverture bénéficient d'une garantie décennale et d'un suivi post-réalisation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container fade-in-on-scroll">
              <h2 className="section-title">Demander un devis pour couverture</h2>
              {contactFormSuccess ? (
                <div className="success-message">
                  <span>✅</span>
                  <div>
                    <h4>Message envoyé avec succès!</h4>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nom complet</label>
                      <input 
                        type="text" 
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactFormChange}
                        className="form-input" 
                        placeholder="Votre nom" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactFormChange}
                        className="form-input" 
                        placeholder="votre@email.com" 
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactFormChange}
                      className="form-input" 
                      placeholder="+33 780326427" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service souhaité</label>
                    <select 
                      name="service"
                      value={contactFormData.service}
                      onChange={handleContactFormChange}
                      className="form-select"
                      disabled={loadingContactServices}
                    >
                      <option value="">
                        {loadingContactServices ? "Chargement des services..." : "Sélectionner un service"}
                      </option>
                      {contactFormServices.map((service) => (
                        <option key={service.id} value={service.slug || service.id}>
                          {service.title}
                        </option>
                      ))}
                      <option value="other">Autre service</option>
                    </select>
                    {loadingContactServices && (
                      <div className="loading-indicator">
                        <span className="loading-spinner-small"></span>
                        <span>Chargement des services...</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea 
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactFormChange}
                      className="form-textarea" 
                      placeholder="Décrivez votre projet de couverture..." 
                      required
                    ></textarea>
                  </div>
                  {contactFormError && (
                    <div style={{
                      color: '#dc2626',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      {contactFormError}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    className="form-button"
                    disabled={contactFormLoading}
                  >
                    {contactFormLoading ? 'ENVOI EN COURS...' : 'DEMANDER UN DEVIS'}
                  </button>
                </form>
              )}
            </div>
            <div className="contact-image fade-in-on-scroll">
              <img 
                src="https://th.bing.com/th/id/R.591d0109c6706ff76e40d17adec6d22a?rik=A1h35rJ6%2fVHVRw&pid=ImgRaw&r=0" 
                alt="Contact" 
                className="contact-visual-small"
                style={{
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transform: 'rotate(-5deg)',
                  margin: '20px auto',
                  display: 'block'
                }}
              />
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