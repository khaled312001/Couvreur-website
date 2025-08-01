import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getServices } from '../api/services';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Charger les services au montage du composant
    const loadServices = async () => {
      try {
        console.log('Loading services...');
        const servicesData = await getServices();
        console.log('Services loaded:', servicesData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        setServices([]);
      }
    };
    
    loadServices();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Handle click outside mobile menu and dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-content') && !event.target.closest('.mobile-menu-btn')) {
        closeMobileMenu();
      }
      
      // Close dropdowns when clicking outside
      if (activeDropdown && !event.target.closest('.nav-item')) {
        setActiveDropdown(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (isMobileMenuOpen && event.key === 'Escape') {
        closeMobileMenu();
      }
      
      if (activeDropdown && event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    if (isMobileMenuOpen || activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen, activeDropdown]);

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    console.log('Closing mobile menu');
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleNavigationClick = () => {
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    closeMobileMenu();
    setActiveDropdown(null);
  };

  const handleDropdownLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    
    // Set a new timeout to close the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    
    setDropdownTimeout(timeout);
  };

  const handleDropdownEnter = (dropdown) => {
    // Clear any existing timeout when entering
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownClick = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const zonesData = {
    'Lyon (69)': {
      description: 'Couvreur professionnel à Lyon',
      services: ['Couverture', 'Zinguerie', 'Isolation']
    },
    'Saint-Étienne (42)': {
      description: 'Couvreur professionnel à Saint-Étienne',
      services: ['Couverture', 'Zinguerie', 'Isolation']
    },
    'Valence (26)': {
      description: 'Couvreur professionnel à Valence',
      services: ['Couverture', 'Zinguerie', 'Isolation']
    },
    'Grenoble (38)': {
      description: 'Couvreur professionnel à Grenoble',
      services: ['Couverture', 'Zinguerie', 'Isolation']
    },
    'Chambéry (73)': {
      description: 'Couvreur professionnel à Chambéry',
      services: ['Couverture', 'Zinguerie', 'Isolation']
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar - Enhanced with animations */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <div className="top-bar-item">
                <span className="icon">📞</span>
                <a href="tel:33780326427" className="top-bar-link">07 80 32 64 27</a>
              </div>
              <div className="top-bar-item">
                <span className="icon">📧</span>
                <a href="mailto:bnbatimententreprise@gmail.com" className="top-bar-link">bnbatimententreprise@gmail.com</a>
              </div>
            </div>
            <div className="top-bar-right">
              <div className="top-bar-item">
                <span className="icon">🕒</span>
                <span>Lun-Ven: 8h-18h | Sam: 8h-12h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Enhanced with modern design */}
      <div className="nav-main">
        <div className="container">
          <div className="nav-content">
            {/* Logo with enhanced animations */}
            <NavLink to="/" className="logo" onClick={handleNavigationClick}>
              <div className="logo-container">
                <img 
                  src="/logo.png" 
                  alt="BN BÂTIMENT Logo" 
                  className="logo-image"
                />
                <div className="logo-glow"></div>
              </div>
            </NavLink>

            {/* Desktop Navigation - Enhanced with consistent styling */}
            <nav className="nav-menu">
              <div className="nav-item">
                <NavLink to="/" className="nav-link" onClick={handleNavigationClick}>
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">ACCUEIL</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/a-propos" className="nav-link" onClick={handleNavigationClick}>
                  <span className="nav-icon">ℹ️</span>
                  <span className="nav-text">À PROPOS</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div 
                className="nav-item dropdown-item"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="nav-link dropdown-trigger">
                  <span className="nav-icon">🔧</span>
                  <span className="nav-text">NOS SERVICES</span>
                  <span className="dropdown-arrow">▼</span>
                  <div className="nav-underline"></div>
                </div>
                {activeDropdown === 'services' && (
                  <div className="submenu visible">
                    <div className="submenu-header">
                      <h4>🔧 NOS SERVICES</h4>
                      <p>Découvrez notre expertise</p>
                    </div>
                    <div className="submenu-list">
                      {Array.isArray(services) && services.map((service) => (
                        <div key={service.id} className="submenu-item-container">
                          <NavLink 
                            to={`/services/${service.slug}`} 
                            className="submenu-item"
                            onClick={handleNavigationClick}
                          >
                            <div className="submenu-item-header">
                              <span className="submenu-icon">{service.icon}</span>
                              <div className="submenu-item-content">
                                <h5>{service.title}</h5>
                              </div>
                            </div>
                            <div className="submenu-hover-effect"></div>
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="nav-item dropdown-item"
                onMouseEnter={() => handleDropdownEnter('zones')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="nav-link dropdown-trigger">
                  <span className="nav-icon">📍</span>
                  <span className="nav-text">ZONES D'INTERVENTION</span>
                  <span className="dropdown-arrow">▼</span>
                  <div className="nav-underline"></div>
                </div>
                {activeDropdown === 'zones' && (
                  <div className="submenu visible zones-submenu">
                    <div className="submenu-header zones-header">
                      <h4>📍 ZONES D'INTERVENTION</h4>
                      <p>Nos zones de couverture</p>
                    </div>
                    <div className="submenu-list">
                      {Object.keys(zonesData).map((zone, index) => (
                        <div key={zone} className="submenu-item-container">
                          <div className="submenu-item zone-item">
                            <div className="submenu-item-header">
                              <div className="zone-icon">📍</div>
                              <div className="submenu-item-content">
                                <h5>{zone}</h5>
                                <p>{zonesData[zone].description}</p>
                                <div className="zone-services">
                                  {zonesData[zone].services.slice(0, 2).map((service, idx) => (
                                    <span key={idx} className="service-tag">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="arrow-icon">→</div>
                            </div>
                            <div className="submenu-hover-effect"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="nav-item dropdown-item"
                onMouseEnter={() => handleDropdownEnter('avis')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="nav-link dropdown-trigger">
                  <span className="nav-icon">⭐</span>
                  <span className="nav-text">AVIS CLIENTS</span>
                  <span className="dropdown-arrow">▼</span>
                  <div className="nav-underline"></div>
                </div>
                {activeDropdown === 'avis' && (
                  <div className="submenu visible avis-submenu">
                    <div className="submenu-header avis-header">
                      <h4>⭐ AVIS CLIENTS</h4>
                      <p>Témoignages de nos clients</p>
                    </div>
                    <div className="submenu-list">
                      {[
                        { name: 'Marie L.', rating: 5, text: 'Excellent travail, très professionnel!' },
                        { name: 'Pierre D.', rating: 5, text: 'Rapide et de qualité, je recommande!' },
                        { name: 'Sophie M.', rating: 5, text: 'Service impeccable, prix raisonnables.' }
                      ].map((avis, index) => (
                        <div key={index} className="submenu-item-container">
                          <div className="submenu-item avis-item">
                            <div className="submenu-item-header">
                              <div className="avis-icon">⭐</div>
                              <div className="submenu-item-content">
                                <h5>{avis.name}</h5>
                                <div className="rating-stars">
                                  {[...Array(avis.rating)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                  ))}
                                </div>
                                <p className="avis-text">"{avis.text}"</p>
                              </div>
                              <div className="arrow-icon">→</div>
                            </div>
                            <div className="submenu-hover-effect"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="nav-item dropdown-item"
                onMouseEnter={() => handleDropdownEnter('blog')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="nav-link dropdown-trigger">
                  <span className="nav-icon">📝</span>
                  <span className="nav-text">BLOG</span>
                  <span className="dropdown-arrow">▼</span>
                  <div className="nav-underline"></div>
                </div>
                {activeDropdown === 'blog' && (
                  <div className="submenu visible blog-submenu">
                    <div className="submenu-header blog-header">
                      <h4>📝 BLOG</h4>
                      <p>Conseils et actualités</p>
                    </div>
                    <div className="submenu-list">
                      {[
                        { title: 'Guide Couverture', category: 'Conseils', date: '2024' },
                        { title: 'Isolation Toiture', category: 'Techniques', date: '2024' },
                        { title: 'Entretien Zinguerie', category: 'Maintenance', date: '2024' }
                      ].map((article, index) => (
                        <div key={index} className="submenu-item-container">
                          <div className="submenu-item blog-item">
                            <div className="submenu-item-header">
                              <div className="blog-icon">📝</div>
                              <div className="submenu-item-content">
                                <h5>{article.title}</h5>
                                <div className="article-meta">
                                  <span className="category-tag">{article.category}</span>
                                  <span className="date-tag">{article.date}</span>
                                </div>
                              </div>
                              <div className="arrow-icon">→</div>
                            </div>
                            <div className="submenu-hover-effect"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="nav-item dropdown-item"
                onMouseEnter={() => handleDropdownEnter('realisations')}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="nav-link dropdown-trigger">
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">RÉALISATIONS</span>
                  <span className="dropdown-arrow">▼</span>
                  <div className="nav-underline"></div>
                </div>
                {activeDropdown === 'realisations' && (
                  <div className="submenu visible realisations-submenu">
                    <div className="submenu-header realisations-header">
                      <h4>🏠 RÉALISATIONS</h4>
                      <p>Nos projets réalisés</p>
                    </div>
                    <div className="submenu-list">
                      {[
                        { title: 'Couverture Maison Lyon', type: 'Couverture', location: 'Lyon' },
                        { title: 'Isolation Toiture', type: 'Isolation', location: 'Saint-Étienne' },
                        { title: 'Zinguerie Villa', type: 'Zinguerie', location: 'Valence' }
                      ].map((projet, index) => (
                        <div key={index} className="submenu-item-container">
                          <div className="submenu-item realisations-item">
                            <div className="submenu-item-header">
                              <div className="realisations-icon">🏠</div>
                              <div className="submenu-item-content">
                                <h5>{projet.title}</h5>
                                <div className="projet-meta">
                                  <span className="type-tag">{projet.type}</span>
                                  <span className="location-tag">📍 {projet.location}</span>
                                </div>
                              </div>
                              <div className="arrow-icon">→</div>
                            </div>
                            <div className="submenu-hover-effect"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="nav-item">
                <NavLink to="/contact" className="cta-button" onClick={handleNavigationClick}>
                  <span className="cta-icon">📧</span>
                  <span className="cta-text">DEVIS GRATUIT</span>
                  <div className="cta-glow"></div>
                </NavLink>
              </div>
            </nav>

            {/* Mobile Menu Button - Enhanced */}
            <button 
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="hamburger-container">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with animations */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button 
                onClick={closeMobileMenu}
                className="mobile-close-btn"
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">🏠</span>
                <span className="mobile-nav-text">ACCUEIL</span>
              </NavLink>
            </div>
            
            <div className="mobile-nav-item">
              <NavLink to="/a-propos" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">ℹ️</span>
                <span className="mobile-nav-text">À PROPOS</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/services" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">🔧</span>
                <span className="mobile-nav-text">NOS SERVICES</span>
              </NavLink>
              <div className="mobile-submenu">
                {Array.isArray(services) && services.map((service) => (
                  <NavLink 
                    key={service.id} 
                    to={`/services/${service.slug}`} 
                    className="mobile-submenu-item"
                    onClick={handleNavigationClick}
                  >
                    <div className="mobile-submenu-item-content">
                      <span className="mobile-submenu-icon">{service.icon}</span>
                      <div>
                        <h6>{service.title}</h6>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/zones" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">📍</span>
                <span className="mobile-nav-text">ZONES D'INTERVENTION</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/tarifs" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">💰</span>
                <span className="mobile-nav-text">TARIFS</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/avis" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">⭐</span>
                <span className="mobile-nav-text">AVIS CLIENTS</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/blog" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">📝</span>
                <span className="mobile-nav-text">BLOG</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/realisations" className="mobile-nav-link" onClick={handleNavigationClick}>
                <span className="mobile-nav-icon">🏗️</span>
                <span className="mobile-nav-text">RÉALISATIONS</span>
              </NavLink>
            </div>

            <div className="mobile-cta">
              <NavLink to="/contact" className="mobile-cta-button" onClick={handleNavigationClick}>
                <span className="cta-icon">📧</span>
                <span className="cta-text">DEVIS GRATUIT</span>
              </NavLink>
            </div>

            {/* Mobile Contact Info */}
            <div className="mobile-contact-info">
              <div className="mobile-contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:33780326427" className="contact-link">
                  07 80 32 64 27
                </a>
              </div>
              <div className="mobile-contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:bnbatimententreprise@gmail.com" className="contact-link">
                  bnbatimententreprise@gmail.com
                </a>
              </div>
              <div className="mobile-contact-item">
                <span className="contact-icon">🕒</span>
                <span className="contact-text">Lun-Ven: 8h-18h | Sam: 8h-12h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
