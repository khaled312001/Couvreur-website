import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getIconComponent } from '../utils/iconMapping';
import SEO from '../components/SEO';

const NotFound = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // SEO Data for 404 Page
  const seoData = {
    title: "Page Non Trouvée - BN BÂTIMENT Charpente Couverture Zinguerie Paris",
    description: "Page non trouvée. Retournez à l'accueil pour découvrir nos services de charpente, couverture et zinguerie à Paris. Expert toiture certifié.",
    keywords: "page non trouvée, erreur 404, BN BÂTIMENT, charpente, couverture, zinguerie, toiture, Paris, expert toiture, devis gratuit",
    url: "/404",
    image: "/logo.png"
  };

  return (
    <div className="not-found-page">
      <SEO {...seoData} />
      <div className="not-found-container">
        <div className="not-found-content">
          {/* Animated 404 Number */}
          <div className="error-number">
            <span className="error-digit">4</span>
            <div className="error-zero">
              <div className="zero-circle"></div>
            </div>
            <span className="error-digit">4</span>
          </div>

          {/* Main Message */}
          <div className="error-message">
            <h1 className="error-title">Page Non Trouvée</h1>
            <p className="error-description">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          {/* Illustration */}
          <div className="error-illustration">
            <div className="construction-worker">
              <div className="worker-body"></div>
              <div className="worker-head"></div>
              <div className="worker-arms"></div>
              <div className="worker-tool"></div>
            </div>
            <div className="construction-elements">
              <div className="element element-1"></div>
              <div className="element element-2"></div>
              <div className="element element-3"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn-primary">
                              <span className="btn-icon">{React.createElement(getIconComponent('🏠'))}</span>
              Retour à l'Accueil
            </Link>
            <Link to="/contact" className="btn-secondary">
                              <span className="btn-icon">{React.createElement(getIconComponent('📞'))}</span>
              Nous Contacter
            </Link>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            <h3>Pages Populaires</h3>
            <div className="links-grid">
              <Link to="/services" className="quick-link">
                <span className="link-icon">{React.createElement(getIconComponent('🔨'))}</span>
                Nos Services
              </Link>
              <Link to="/realisations" className="quick-link">
                <span className="link-icon">{React.createElement(getIconComponent('🏗️'))}</span>
                Réalisations
              </Link>
              <Link to="/services" className="quick-link">
                <span className="link-icon">{React.createElement(getIconComponent('⭐'))}</span>
                Avis Clients
              </Link>
              <Link to="/blog" className="quick-link">
                <span className="link-icon">{React.createElement(getIconComponent('📝'))}</span>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 