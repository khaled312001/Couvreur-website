import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Data for zones dropdown
  const zonesData = {
    'Drôme (26)': [
      'Artisan Couvreur Montelimar (26200)',
      'Artisan Couvreur Crest (26400)',
      'Artisan Couvreur Bourg-lès-Valence (26500)',
      'Artisan Couvreur Portes-lès-Valence (26800)',
      'Artisan Couvreur Romans-sur-Isère (26100)',
      'Artisan Couvreur Chabeuil (26120)',
      'Artisan Couvreur Pierrelatte (26700)',
      'Artisan Couvreur Loriol-sur-Drôme (26270)',
      'Artisan Couvreur Nyons (26110)',
      'Artisan Couvreur Tain-l\'Hermitage (26600)',
      'Artisan Couvreur Bourg-de-Péage (26300)',
      'Artisan Couvreur Saint-Paul-Trois-Châteaux (26130)',
      'Artisan Couvreur Valence (26000)',
      'Artisan Couvreur Livron-sur-Drôme (26250)'
    ],
    'Ardèche (07)': [
      'Artisan Couvreur Aubenas (07200)',
      'Artisan Couvreur Privas (07000)',
      'Artisan Couvreur Guilherand-Granges (07500)',
      'Artisan Couvreur La Voulte-sur-Rhône (07800)',
      'Artisan Couvreur Annonay (07100)',
      'Artisan Couvreur Le Teil (07400)',
      'Artisan Couvreur Tournon-sur-Rhône (07300)',
      'Artisan Couvreur Bourg-Saint-Andéol (07700)',
      'Artisan Couvreur Saint-Péray (07130)'
    ],
    'Gard (30)': [
      'Artisan Couvreur Rochefort-du-Gard (30650)',
      'Artisan Couvreur Bagnols-sur-Cèze (30200)',
      'Artisan Couvreur Alès (30100)',
      'Artisan Couvreur La Grand-Combe (30110)',
      'Artisan Couvreur Pont-Saint-Esprit (30130)',
      'Artisan Couvreur Laudun-l\'Ardoise (30290)',
      'Artisan Couvreur Uzès (30700)',
      'Artisan Couvreur Les Angles (30133)',
      'Artisan Couvreur Saint-Christol-lès-Alès (30380)',
      'Artisan Couvreur Roquemaure (30150)',
      'Artisan Couvreur Villeneuve-lès-Avignon (30400)'
    ],
    'Vaucluse (84)': [
      'Artisan Couvreur Pernes-les-Fontaines (84210)',
      'Artisan Couvreur Avignon (84000)',
      'Artisan Couvreur Mazan (84380)',
      'Artisan Couvreur Monteux (84170)',
      'Artisan Couvreur Bédarrides (84370)',
      'Artisan Couvreur Sorgues (84700)',
      'Artisan Couvreur Courthézon (84350)',
      'Artisan Couvreur Vedène (84270)',
      'Artisan Couvreur Sarrians (84260)',
      'Artisan Couvreur Morières-lès-Avignon (84310)',
      'Artisan Couvreur Valréas (84600)',
      'Artisan Couvreur Vaison-la-Romaine (84110)',
      'Artisan Couvreur Bollène (84500)',
      'Artisan Couvreur Orange (84100)',
      'Artisan Couvreur Carpentras (84200)',
      'Artisan Couvreur Le Pontet (84130)',
      'Artisan Couvreur Entraigues-sur-la-Sorgue (84320)'
    ]
  };

  // Data for services dropdown
  const servicesData = {
    'Installation de Toiture': [
      'Toiture en tuiles',
      'Toiture en zinc',
      'Toiture métallique'
    ],
    'Réparation de Toiture': [
      'Remplacement de tuiles endommagées',
      'Renforcement de la charpente existante',
      'Réparation cheminée',
      'Réparation de fuites et infiltrations d\'eau sur une toiture',
      'Réparation de toiture métallique'
    ],
    'Entretien de Toiture': [
      'Inspection de toiture',
      'Nettoyage de toiture',
      'Traitement de toiture'
    ],
    'Services supplémentaires': [
      'Isolation de toiture',
      'Habillage de bandeau en aluminium laqué',
      'Remplacement materiaux de toiture à l\'identique',
      'Gouttières',
      'Étanchéité',
      'Installation et Pose de velux',
      'Zinguerie',
      'Peinture extérieure'
    ]
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
                <a href="tel:330603713994">06 03 71 39 94</a>
              </div>
              <div className="top-bar-item">
                <span className="icon">📧</span>
                <a href="mailto:contact@couvreur-rhone-alpes.fr">contact@couvreur-rhone-alpes.fr</a>
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
                  style={{ 
                    height: '60px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }} 
                />
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="nav-menu">
              <div className="nav-item">
                <NavLink to="/" className="nav-link">
                  ACCUEIL
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/a-propos" className="nav-link">
                  À PROPOS
                </NavLink>
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
                  <div className="submenu visible">
                    <div className="submenu-column">
                      {Object.entries(servicesData).map(([service, subServices]) => (
                        <div key={service} className="submenu-item-container">
                          <NavLink to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} className="submenu-item">
                            {service}
                            <span className="submenu-arrow">▶</span>
                          </NavLink>
                          <div className="submenu-sub">
                            {subServices.map((subService, index) => (
                              <NavLink 
                                key={index} 
                                to={`/services/${subService.toLowerCase().replace(/\s+/g, '-')}`} 
                                className="submenu-sub-item"
                              >
                                {subService}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="nav-item">
                <NavLink to="/tarifs" className="nav-link">
                  TARIFS
                </NavLink>
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
                                <div key={index} className="submenu-sub-item">
                                  {city}
                                </div>
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
                <NavLink to="/avis" className="nav-link">
                  AVIS CLIENTS
                </NavLink>
              </div>

              <div className="nav-item">
                <NavLink to="/blog" className="nav-link">
                  BLOG
                </NavLink>
              </div>

              <div className="nav-item">
                <NavLink to="/realisations" className="nav-link">
                  RÉALISATIONS
                </NavLink>
              </div>

              <div className="nav-item">
                <NavLink to="/contact" className="cta-button">
                  <span className="cta-icon">📧</span>
                  DEVIS GRATUIT
                </NavLink>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
            >
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
            <div className="mobile-nav-item">
              <NavLink to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
                ACCUEIL
              </NavLink>
            </div>
            
            <div className="mobile-nav-item">
              <NavLink to="/a-propos" className="mobile-nav-link" onClick={toggleMobileMenu}>
                À PROPOS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/services" className="mobile-nav-link" onClick={toggleMobileMenu}>
                NOS SERVICES
              </NavLink>
              <div className="mobile-submenu">
                {Object.keys(servicesData).map((service) => (
                  <NavLink 
                    key={service} 
                    to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="mobile-submenu-item"
                    onClick={toggleMobileMenu}
                  >
                    {service}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/tarifs" className="mobile-nav-link" onClick={toggleMobileMenu}>
                TARIFS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/zones" className="mobile-nav-link" onClick={toggleMobileMenu}>
                ZONES D'INTERVENTION
              </NavLink>
              <div className="mobile-submenu">
                {Object.keys(zonesData).map((zone) => (
                  <div key={zone} className="mobile-submenu-item">
                    {zone}
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/avis" className="mobile-nav-link" onClick={toggleMobileMenu}>
                AVIS CLIENTS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/blog" className="mobile-nav-link" onClick={toggleMobileMenu}>
                BLOG
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/realisations" className="mobile-nav-link" onClick={toggleMobileMenu}>
                RÉALISATIONS
              </NavLink>
            </div>

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
