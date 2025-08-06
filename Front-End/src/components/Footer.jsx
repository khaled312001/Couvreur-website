import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api/services";
import { subscribeToNewsletter } from "../api/newsletter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Wrench, 
  FileText, 
  Star,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  ExternalLink,
  ArrowUp,
  Shield,
  Award,
  Users,
  CheckCircle
} from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load services from backend
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        // Fallback to default services if API fails
        setServices([
          { id: 1, title: "Charpente", slug: "charpente" },
          { id: 2, title: "Couverture", slug: "couverture" },
          { id: 3, title: "Zinguerie", slug: "zinguerie" },
          { id: 4, title: "Démoussage", slug: "demoussage" },
          { id: 5, title: "Isolation", slug: "isolation" },
          { id: 6, title: "Réparation", slug: "reparation" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubscription = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterMessage('Veuillez entrer votre adresse email');
      setNewsletterSuccess(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterMessage('Veuillez entrer une adresse email valide');
      setNewsletterSuccess(false);
      return;
    }

    setNewsletterLoading(true);
    setNewsletterMessage('');

    try {
      const result = await subscribeToNewsletter(newsletterEmail);
      setNewsletterMessage(result.message);
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setNewsletterMessage('');
        setNewsletterSuccess(false);
      }, 5000);
    } catch (error) {
      setNewsletterMessage(error.message || 'Une erreur est survenue');
      setNewsletterSuccess(false);
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Helper function to get service icon
  const getServiceIcon = (serviceTitle) => {
    const title = serviceTitle.toLowerCase();
    
    if (title.includes('charpente')) return '🏗️';
    if (title.includes('couverture')) return '🏠';
    if (title.includes('zinguerie')) return '🔧';
    if (title.includes('démoussage') || title.includes('demoussage')) return '🧹';
    if (title.includes('isolation')) return '🏠';
    if (title.includes('réparation') || title.includes('reparation')) return '🔧';
    if (title.includes('installation')) return '⚙️';
    if (title.includes('nettoyage')) return '💧';
    if (title.includes('gouttières') || title.includes('gouttieres')) return '🌧️';
    if (title.includes('fenêtres') || title.includes('fenetres')) return '🪟';
    
    return '🛠️'; // Default icon
  };

  return (
    <footer className="footer-enhanced">
      {/* Animated Background */}
      <div className="footer-background">
        <div className="footer-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section company-info animate-fadeInUp">
              <div className="footer-logo">
                <div className="logo-container">
                  <img 
                    src="/logo.png" 
                    alt="BN BÂTIMENT Logo" 
                    className="footer-logo-image"
                  />
                  <div className="logo-glow"></div>
                </div>
                <div className="footer-logo-text">
                  <h3>BN BÂTIMENT</h3>
                  <p>Charpente - Couverture - Zinguerie</p>
                </div>
              </div>
              <div className="footer-description">
                Spécialiste en charpente, couverture et zinguerie. Nous intervenons pour tous types de projets : neuf, rénovation et entretien.
              </div>
              
              {/* Enhanced Contact Info */}
              <div className="footer-contact">
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Phone size={18} />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="footer-contact-text">
                    <a href="tel:0780326427">07 80 32 64 27</a>
                  </div>
                </div>
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Mail size={18} />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="footer-contact-text">
                    <a href="mailto:support@bnbatiment.com">support@bnbatiment.com</a>
                  </div>
                </div>
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Clock size={18} />
                    <div className="icon-glow"></div>
                  </div>
                  <div className="footer-contact-text">
                    <div className="schedule-info schedule-24-7">
                      <div className="schedule-line">
                        <span className="schedule-days">24h/24</span>
                        <span className="schedule-hours">7j/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="footer-trust">
                <div className="trust-item">
                  <Award size={16} />
                  <span>Expert certifié</span>
                </div>
                <div className="trust-item">
                  <Shield size={16} />
                  <span>Garantie décennale</span>
                </div>
                <div className="trust-item">
                  <Users size={16} />
                  <span>200+ clients satisfaits</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section animate-fadeInUp">
              <h4>Liens Rapides</h4>
              <div className="footer-links">
                <Link to="/" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">🏠</span>
                  <span>Accueil</span>
                </Link>
                <Link to="/a-propos" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">ℹ️</span>
                  <span>À Propos</span>
                </Link>
                <Link to="/services" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">🛠️</span>
                  <span>Nos Services</span>
                </Link>
                <Link to="/zones" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">🗺️</span>
                  <span>Zones d'intervention</span>
                </Link>
                <Link to="/contact" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">📞</span>
                  <span>Contact</span>
                </Link>
                <Link to="/realisations" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">⭐</span>
                  <span>Réalisations</span>
                </Link>
                <Link to="/avis" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">💬</span>
                  <span>Avis Clients</span>
                </Link>
                <Link to="/blog" onClick={handleNavigationClick} className="footer-link">
                  <span className="link-icon">📝</span>
                  <span>Blog</span>
                </Link>
              </div>
            </div>

            {/* Services from Backend */}
            <div className="footer-section animate-fadeInUp">
              <h4>Nos Services</h4>
              <div className="footer-links">
                {loading ? (
                  <div className="footer-link loading">
                    <span className="link-icon">⏳</span>
                    <span>Chargement des services...</span>
                  </div>
                ) : (
                  services.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.slug || service.id}`} 
                      onClick={handleNavigationClick} 
                      className="footer-link"
                    >
                      <span className="link-icon">{getServiceIcon(service.title)}</span>
                      <span>{service.title}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>

           
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="footer-social">
        <div className="container">
          <div className="footer-social-content">
            <div className="social-links">
              <span className="social-text">Suivez-nous sur les réseaux sociaux :</span>
              <div className="social-icons">
                <a href="#" className="social-icon hover-scale" title="Facebook" aria-label="Facebook">
                  <Facebook size={20} />
                  <div className="social-glow"></div>
                </a>
                <a href="#" className="social-icon hover-scale" title="Instagram" aria-label="Instagram">
                  <Instagram size={20} />
                  <div className="social-glow"></div>
                </a>
                <a href="#" className="social-icon hover-scale" title="Twitter" aria-label="Twitter">
                  <Twitter size={20} />
                  <div className="social-glow"></div>
                </a>
                <a href="https://wa.me/330603713994" className="social-icon hover-scale" title="WhatsApp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle size={20} />
                  <div className="social-glow"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-content">
            <div className="copyright-text">
              © {currentYear} BN BÂTIMENT - Charpente - Couverture - Zinguerie. Tous droits réservés.
            </div>
           
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
