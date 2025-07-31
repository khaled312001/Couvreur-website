import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getServices } from '../api/services';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServices(getServices());
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const zonesData = {
    'Lyon (69)':[],
    'Saint-Étienne (42)': [],
    'Valence (26)': [],
    
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <div className="top-bar-item">
                <span className="icon">📞</span>
                <a href="tel:330603713994">07 80 32 64 27</a>
              </div>
              <div className="top-bar-item">
                <span className="icon">📧</span>
                <a href="mailto:bnbatimententreprise@gmail.com">bnbatimententreprise@gmail.com</a>
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

      {/* Main Navigation */}
      <div className="nav-main">
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <NavLink to="/" className="logo">
              <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/logo.png" 
                  alt="BN BÂTIMENT Logo" 
                  style={{ height: '60px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="nav-menu">
              <div className="nav-item">
                <NavLink to="/" className="nav-link">ACCUEIL</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/a-propos" className="nav-link">À PROPOS</NavLink>
              </div>
              <div 
                className="nav-item"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink to="/services" className="nav-link">
                  NOS SERVICES
                  <span className="dropdown-arrow">▼</span>
                </NavLink>
                {activeDropdown === 'services' && (
                  <div className="submenu visible" style={{
                    minWidth: '280px',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="submenu-header" style={{
                      borderBottom: '2px solid #e2e8f0',
                      paddingBottom: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: '0',
                        textAlign: 'center'
                      }}>NOS SERVICES</h4>
                    </div>
                    <div className="submenu-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {services.map((service) => (
                        <div key={service.id} className="submenu-item-container">
                          <NavLink 
                            to={service.link} 
                            className="submenu-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              color: '#475569',
                              transition: 'all 0.3s ease',
                              border: '1px solid transparent',
                              background: 'transparent'
                            }}
                          >
                            <div className="submenu-item-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                              <span className="submenu-icon" style={{ fontSize: '1.5rem', minWidth: '2rem', textAlign: 'center' }}>{service.icon}</span>
                              <div className="submenu-item-content">
                                <h5 style={{ fontSize: '0.95rem', fontWeight: '600', margin: '0', lineHeight: '1.2' }}>{service.title}</h5>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="nav-item"
                onMouseEnter={() => handleDropdownEnter('zones')}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink to="/zones" className="nav-link">
                  ZONES D'INTERVENTION
                  <span className="dropdown-arrow">▼</span>
                </NavLink>
                {activeDropdown === 'zones' && (
                  <div className="submenu zones-submenu visible">
                    <div className="submenu-header">
                      <h4>ZONES D'INTERVENTION</h4>
                    </div>
                    <div className="submenu-columns">
                      <div className="submenu-column">
                        {Object.keys(zonesData).map((zone) => (
                          <div key={zone} className="submenu-item-container">
                            <div className="submenu-item zone-item">
                              {zone}
                              <span className="submenu-arrow">▶</span>
                            </div>
                            <div className="submenu-sub">
                              {zonesData[zone].map((city, index) => (
                                <div key={index} className="submenu-sub-item">{city}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="nav-item">
                <NavLink to="/avis" className="nav-link">AVIS CLIENTS</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/blog" className="nav-link">BLOG</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/realisations" className="nav-link">RÉALISATIONS</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/contact" className="cta-button">
                  <span className="cta-icon">📧</span>
                  DEVIS GRATUIT
                </NavLink>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <div className="mobile-nav-item"><NavLink to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>ACCUEIL</NavLink></div>
            <div className="mobile-nav-item"><NavLink to="/a-propos" className="mobile-nav-link" onClick={toggleMobileMenu}>À PROPOS</NavLink></div>
            <div className="mobile-nav-item">
              <NavLink to="/services" className="mobile-nav-link" onClick={toggleMobileMenu}>NOS SERVICES</NavLink>
              <div className="mobile-submenu">
                {services.map((service) => (
                  <NavLink key={service.id} to={service.link} className="mobile-submenu-item" onClick={toggleMobileMenu}>
                    <div className="mobile-submenu-item-content">
                      <span className="mobile-submenu-icon">{service.icon}</span>
                      <div><h6>{service.title}</h6></div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="mobile-nav-item">
              <NavLink to="/zones" className="mobile-nav-link" onClick={toggleMobileMenu}>ZONES D'INTERVENTION</NavLink>
              <div className="mobile-submenu">
                {Object.keys(zonesData).map((zone) => (
                  <div key={zone} className="mobile-submenu-item">{zone}</div>
                ))}
              </div>
            </div>
            <div className="mobile-nav-item"><NavLink to="/avis" className="mobile-nav-link" onClick={toggleMobileMenu}>AVIS CLIENTS</NavLink></div>
            <div className="mobile-nav-item"><NavLink to="/blog" className="mobile-nav-link" onClick={toggleMobileMenu}>BLOG</NavLink></div>
            <div className="mobile-nav-item"><NavLink to="/realisations" className="mobile-nav-link" onClick={toggleMobileMenu}>RÉALISATIONS</NavLink></div>
            <div className="mobile-cta">
              <NavLink to="/contact" className="mobile-cta-button" onClick={toggleMobileMenu}>
                <span className="cta-icon">📧</span>
                DEVIS GRATUIT
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
