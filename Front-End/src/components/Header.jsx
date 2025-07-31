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

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-content') && !event.target.closest('.mobile-menu-btn')) {
        closeMobileMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (isMobileMenuOpen && event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

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

  const handleDropdownLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    
    // Set a new timeout to close the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    
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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar - Visible on all devices */}
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
              
              {/* Auth Buttons in Top Bar */}
              <div className="top-bar-auth">
                {user ? (
                  <div className="user-menu" style={{ position: 'relative' }}>
                    <button 
                      className="user-menu-btn"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>👤</span>
                      <span>{user.name}</span>
                      <span style={{ fontSize: '0.8rem' }}>▼</span>
                    </button>
                    <div className="user-dropdown" style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      minWidth: '200px',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      marginTop: '8px',
                      overflow: 'hidden'
                    }}>
                      <NavLink 
                        to="/profile" 
                        className="dropdown-item"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: '#374151',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f8fafc';
                          e.target.style.color = '#1f2937';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>⚙️</span>
                        Mon Profil
                      </NavLink>
                      <NavLink 
                        to="/quotes" 
                        className="dropdown-item"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: '#374151',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f8fafc';
                          e.target.style.color = '#1f2937';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>📋</span>
                        Mes Devis
                      </NavLink>
                      <NavLink 
                        to="/messages" 
                        className="dropdown-item"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: '#374151',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f3f4f6',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f8fafc';
                          e.target.style.color = '#1f2937';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>💬</span>
                        Mes Messages
                      </NavLink>
                      <button
                        onClick={logout}
                        className="dropdown-item"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          border: 'none',
                          background: 'transparent',
                          color: '#dc2626',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#fef2f2';
                          e.target.style.color = '#b91c1c';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#dc2626';
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>🚪</span>
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="auth-buttons" style={{ display: 'flex', gap: '8px' }}>
                    <NavLink
                      to="/login"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>🔐</span>
                      Se connecter
                    </NavLink>
                    <NavLink
                      to="/register"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>➕</span>
                      S'inscrire
                    </NavLink>
                  </div>
                )}
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
            <NavLink to="/" className="logo" onClick={closeMobileMenu}>
              <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/logo.png" 
                  alt="BN BÂTIMENT Logo" 
                  style={{ 
                    height: '60px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }} 
                  className="md:h-15 h-10"
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
                style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink to="/services" className="nav-link">
                  NOS SERVICES
                  <span className="dropdown-arrow">▼</span>
                </NavLink>
                                 {activeDropdown === 'services' && (
                   <div 
                     className="submenu visible" 
                     style={{
                       position: 'absolute',
                       top: '100%',
                       left: '0',
                       minWidth: '280px',
                       padding: '1.5rem',
                       borderRadius: '12px',
                       boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                       border: '1px solid rgba(255,255,255,0.1)',
                       background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                       backdropFilter: 'blur(10px)',
                       zIndex: 1000,
                       marginTop: '0.5rem'
                     }}
                     onMouseEnter={() => setActiveDropdown('services')}
                     onMouseLeave={handleDropdownLeave}
                   >
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
                     <div className="submenu-list" style={{
                       display: 'flex',
                       flexDirection: 'column',
                       gap: '0.5rem'
                     }}>
                       {Array.isArray(services) && services.map((service) => (
                         <div key={service.id} className="submenu-item-container">
                           <NavLink 
                             to={`/services/${service.slug}`} 
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
                             onMouseEnter={(e) => {
                               e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
                               e.target.style.color = 'white';
                               e.target.style.transform = 'translateX(5px)';
                               e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                             }}
                             onMouseLeave={(e) => {
                               e.target.style.background = 'transparent';
                               e.target.style.color = '#475569';
                               e.target.style.transform = 'translateX(0)';
                               e.target.style.boxShadow = 'none';
                             }}
                           >
                             <div className="submenu-item-header" style={{
                               display: 'flex',
                               alignItems: 'center',
                               gap: '0.75rem',
                               width: '100%'
                             }}>
                               <span className="submenu-icon" style={{
                                 fontSize: '1.5rem',
                                 minWidth: '2rem',
                                 textAlign: 'center'
                               }}>{service.icon}</span>
                               <div className="submenu-item-content">
                                 <h5 style={{
                                   fontSize: '0.95rem',
                                   fontWeight: '600',
                                   margin: '0',
                                   lineHeight: '1.2'
                                 }}>{service.title}</h5>
                               </div>
                             </div>
                           </NavLink>
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
                style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter('zones')}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink to="/zones" className="nav-link">
                  ZONES D'INTERVENTION
                  <span className="dropdown-arrow">▼</span>
                </NavLink>
                {activeDropdown === 'zones' && (
                  <div 
                    className="submenu visible" 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      minWidth: '280px',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      backdropFilter: 'blur(10px)',
                      zIndex: 1000,
                      marginTop: '0.5rem'
                    }}
                    onMouseEnter={() => setActiveDropdown('zones')}
                    onMouseLeave={handleDropdownLeave}
                  >
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
                      }}>ZONES D'INTERVENTION</h4>
                    </div>
                    <div className="submenu-list" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {Object.keys(zonesData).map((zone) => (
                        <div key={zone} className="submenu-item-container">
                          <div 
                            className="submenu-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              color: '#475569',
                              transition: 'all 0.3s ease',
                              border: '1px solid transparent',
                              background: 'transparent',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
                              e.target.style.color = 'white';
                              e.target.style.transform = 'translateX(5px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.color = '#475569';
                              e.target.style.transform = 'translateX(0)';
                              e.target.style.boxShadow = 'none';
                            }}
                            onClick={() => window.location.href = '/zones'}
                          >
                            <div className="submenu-item-header" style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              width: '100%'
                            }}>
                              <span className="submenu-icon" style={{
                                fontSize: '1.5rem',
                                minWidth: '2rem',
                                textAlign: 'center'
                              }}>📍</span>
                              <div className="submenu-item-content">
                                <h5 style={{
                                  fontSize: '0.95rem',
                                  fontWeight: '600',
                                  margin: '0',
                                  lineHeight: '1.2'
                                }}>{zone}</h5>
                              </div>
                            </div>
                            <span className="submenu-arrow" style={{
                              fontSize: '0.8rem',
                              color: 'inherit'
                            }}>▶</span>
                          </div>
                        </div>
                      ))}
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
              className={`mobile-menu-btn md:hidden ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                zIndex: 1000,
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '24px',
                height: '24px'
              }}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <div className="mobile-menu-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0'
              }}>Menu</h3>
              <button 
                onClick={closeMobileMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.5rem'
                }}
                aria-label="Close mobile menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                🏠 ACCUEIL
              </NavLink>
            </div>
            
            <div className="mobile-nav-item">
              <NavLink to="/a-propos" className="mobile-nav-link" onClick={closeMobileMenu}>
                ℹ️ À PROPOS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>
                🔧 NOS SERVICES
              </NavLink>
              <div className="mobile-submenu">
                {Array.isArray(services) && services.map((service) => (
                  <NavLink 
                    key={service.id} 
                    to={`/services/${service.slug}`} 
                    className="mobile-submenu-item"
                    onClick={closeMobileMenu}
                  >
                    <div className="mobile-submenu-item-content">
                      <span className="mobile-submenu-icon">{service.icon}</span>
                      <div>
                        <h6 style={{ margin: '0', fontSize: '0.9rem' }}>{service.title}</h6>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/tarifs" className="mobile-nav-link" onClick={closeMobileMenu}>
                💰 TARIFS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/zones" className="mobile-nav-link" onClick={closeMobileMenu}>
                📍 ZONES D'INTERVENTION
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
              <NavLink to="/avis" className="mobile-nav-link" onClick={closeMobileMenu}>
                ⭐ AVIS CLIENTS
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>
                📝 BLOG
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/realisations" className="mobile-nav-link" onClick={closeMobileMenu}>
                🏗️ RÉALISATIONS
              </NavLink>
            </div>

            <div className="mobile-cta">
              <NavLink to="/contact" className="mobile-cta-button" onClick={closeMobileMenu}>
                <span className="cta-icon">📧</span>
                DEVIS GRATUIT
              </NavLink>
            </div>

            {/* Mobile Contact Info */}
            <div className="mobile-contact-info" style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>
                <span>📞</span>
                <a href="tel:330603713994" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  07 80 32 64 27
                </a>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>
                <span>📧</span>
                <a href="mailto:bnbatimententreprise@gmail.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  bnbatimententreprise@gmail.com
                </a>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>
                <span>🕒</span>
                <span>Lun-Ven: 8h-18h | Sam: 8h-12h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
