import React from "react";
import { Link } from "react-router-dom";
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
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const handleNavigationClick = () => {
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section company-info fade-in-on-scroll">
              <div className="footer-logo">
                <img 
                  src="/logo.png" 
                  alt="BN BÂTIMENT Logo" 
                  style={{ 
                    height: '50px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }} 
                />
                <div className="footer-logo-text">
                  <h3>BN BÂTIMENT</h3>
                  <p>Charpente - Couverture - Zinguerie</p>
                </div>
              </div>
              <div className="footer-description">
                Spécialiste en charpente, couverture et zinguerie. Nous intervenons pour tous types de projets : neuf, rénovation et entretien.
              </div>
              <div className="footer-contact">
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="footer-contact-text">
                    <a href="tel:0780326427">07 80 32 64 27</a>
                  </div>
                </div>
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div className="footer-contact-text">
                    <a href="mailto:bnbatimententreprise@gmail.com">bnbatimententreprise@gmail.com</a>
                  </div>
                </div>
                <div className="footer-contact-item hover-lift">
                  <div className="footer-contact-icon">
                    <Clock size={18} />
                  </div>
                  <div className="footer-contact-text">
                    Neuf - Rénovation - Entretien
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section fade-in-on-scroll">
              <h4>Liens Rapides</h4>
              <div className="footer-links">
                <Link to="/" onClick={handleNavigationClick} className="footer-link">
                  <span>Accueil</span>
                </Link>
                <Link to="/a-propos" onClick={handleNavigationClick} className="footer-link">
                  <span>À Propos</span>
                </Link>
                <Link to="/services" onClick={handleNavigationClick} className="footer-link">
                  <span>Nos Services</span>
                </Link>
                <Link to="/zones" onClick={handleNavigationClick} className="footer-link">
                  <span>Zones d'intervention</span>
                </Link>
                <Link to="/contact" onClick={handleNavigationClick} className="footer-link">
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section fade-in-on-scroll">
              <h4>Nos Services</h4>
              <div className="footer-links">
                <Link to="/services/charpente" onClick={handleNavigationClick} className="footer-link">
                  <Wrench size={16} />
                  <span>Charpente</span>
                </Link>
                <Link to="/services/couverture" onClick={handleNavigationClick} className="footer-link">
                  <Building2 size={16} />
                  <span>Couverture</span>
                </Link>
                <Link to="/services/zinguerie" onClick={handleNavigationClick} className="footer-link">
                  <FileText size={16} />
                  <span>Zinguerie</span>
                </Link>
                <Link to="/realisations" onClick={handleNavigationClick} className="footer-link">
                  <Star size={16} />
                  <span>Réalisations</span>
                </Link>
                <Link to="/avis" onClick={handleNavigationClick} className="footer-link">
                  <Star size={16} />
                  <span>Avis Clients</span>
                </Link>
                <Link to="/blog" onClick={handleNavigationClick} className="footer-link">
                  <FileText size={16} />
                  <span>Blog</span>
                </Link>
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
                </a>
                <a href="#" className="social-icon hover-scale" title="Instagram" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-icon hover-scale" title="Twitter" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://wa.me/330603713994" className="social-icon hover-scale" title="WhatsApp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            <div className="footer-cta">
              <Link to="/contact" className="footer-cta-button">
                <span>Demander un devis</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-content">
            <div className="copyright-text">
              © 2025 BN BÂTIMENT - Charpente - Couverture - Zinguerie. Tous droits réservés.
            </div>
            <div className="copyright-links">
              <Link to="/mentions-legales" className="copyright-link">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="copyright-link">Politique de confidentialité</Link>
              <Link to="/cgv" className="copyright-link">CGV</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
