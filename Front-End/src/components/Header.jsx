import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Clock, Home, Info, Wrench, MapPin, 
  Star, FileText, Building, MessageSquare, Menu, X,
  ChevronDown
} from 'lucide-react';
import { getServices } from '../api/services';
import { fetchBlogPosts } from '../api/blog';
import { getTestimonials } from '../api/testimonials';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Charger les données au montage du composant
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Loading header data...');
        const [servicesData, blogData, testimonialsData] = await Promise.all([
          getServices(),
          fetchBlogPosts(),
          getTestimonials()
        ]);
        console.log('Header data loaded:', { servicesData, blogData, testimonialsData });
        setServices(servicesData);
        setBlogPosts(blogData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading header data:', error);
        setServices([]);
        setBlogPosts([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

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

  const handleNavigationClick = () => {
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    closeMobileMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${loading ? 'header-loading' : ''}`}>
      {/* Top Bar - Enhanced with animated gradient */}
      <motion.div 
        className="top-bar animated"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="animated-background">
          <div className="gradient-layer layer-1"></div>
          <div className="gradient-layer layer-2"></div>
          <div className="gradient-layer layer-3"></div>
          <div className="floating-particles">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <motion.div 
                className="top-bar-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="icon-wrapper"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Phone size={16} className="icon" />
                </motion.div>
                <a href="tel:33780326427" className="top-bar-link">
                  <span className="link-text">07 80 32 64 27</span>
                  <div className="link-glow"></div>
                </a>
              </motion.div>
              
              <motion.div 
                className="top-bar-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="icon-wrapper"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Mail size={16} className="icon" />
                </motion.div>
                <a href="mailto:bnbatimententreprise@gmail.com" className="top-bar-link">
                  <span className="link-text">bnbatimententreprise@gmail.com</span>
                  <div className="link-glow"></div>
                </a>
              </motion.div>
            </div>
            
            <div className="top-bar-right">
              <motion.div 
                className="top-bar-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="icon-wrapper"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <Clock size={16} className="icon" />
                </motion.div>
                <span className="schedule-text">
                  <span className="schedule-part">Lun-Ven: 8h-18h</span>
                  <span className="schedule-separator">|</span>
                  <span className="schedule-part">Sam: 8h-12h</span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

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
                  <Home size={18} className="nav-icon" />
                  <span className="nav-text">ACCUEIL</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/a-propos" className="nav-link" onClick={handleNavigationClick}>
                  <Info size={18} className="nav-icon" />
                  <span className="nav-text">À PROPOS</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/services" className="nav-link" onClick={handleNavigationClick}>
                  <Wrench size={18} className="nav-icon" />
                  <span className="nav-text">NOS SERVICES</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/zones" className="nav-link" onClick={handleNavigationClick}>
                  <MapPin size={18} className="nav-icon" />
                  <span className="nav-text">ZONES D'INTERVENTION</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/testimonials" className="nav-link" onClick={handleNavigationClick}>
                  <Star size={18} className="nav-icon" />
                  <span className="nav-text">AVIS CLIENTS</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/blog" className="nav-link" onClick={handleNavigationClick}>
                  <FileText size={18} className="nav-icon" />
                  <span className="nav-text">BLOG</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/realisations" className="nav-link" onClick={handleNavigationClick}>
                  <Building size={18} className="nav-icon" />
                  <span className="nav-text">RÉALISATIONS</span>
                  <div className="nav-underline"></div>
                </NavLink>
              </div>
              
              <div className="nav-item">
                <NavLink to="/contact" className="cta-button" onClick={handleNavigationClick}>
                  <MessageSquare size={18} className="cta-icon" />
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
              {isMobileMenuOpen ? (
                <X size={24} className="mobile-menu-icon" />
              ) : (
                <Menu size={24} className="mobile-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu with better UX */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-container" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-menu-title">
                <div className="mobile-logo">
                  <img src="/logo.png" alt="BN Bâtiment" />
                </div>
                <h3>Menu Principal</h3>
              </div>
              <button 
                onClick={closeMobileMenu}
                className="mobile-close-btn"
                aria-label="Fermer le menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mobile-menu-body">
              <nav className="mobile-nav">
                <div className="mobile-nav-item">
                  <NavLink to="/" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <Home size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Accueil</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>
                
                <div className="mobile-nav-item">
                  <NavLink to="/a-propos" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <Info size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">À Propos</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>

                <div className="mobile-nav-item">
                  <NavLink to="/services" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <Wrench size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Nos Services</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>

                <div className="mobile-nav-item">
                  <NavLink to="/zones" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <MapPin size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Zones d'Intervention</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>

                <div className="mobile-nav-item">
                  <NavLink to="/avis" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <Star size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Avis Clients</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>

                <div className="mobile-nav-item">
                  <NavLink to="/blog" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <FileText size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Blog</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>

                <div className="mobile-nav-item">
                  <NavLink to="/realisations" className="mobile-nav-link" onClick={handleNavigationClick}>
                    <div className="mobile-nav-icon-wrapper">
                      <Building size={22} className="mobile-nav-icon" />
                    </div>
                    <span className="mobile-nav-text">Réalisations</span>
                    <div className="mobile-nav-arrow">→</div>
                  </NavLink>
                </div>
              </nav>

              <div className="mobile-cta-section">
                <NavLink to="/contact" className="mobile-cta-button" onClick={handleNavigationClick}>
                  <MessageSquare size={20} className="mobile-cta-icon" />
                  <span className="mobile-cta-text">Devis Gratuit</span>
                  <div className="mobile-cta-glow"></div>
                </NavLink>
              </div>

              <div className="mobile-contact-section">
                <h4 className="mobile-contact-title">Contact Rapide</h4>
                <div className="mobile-contact-grid">
                  <div className="mobile-contact-item">
                    <div className="mobile-contact-icon-wrapper">
                      <Phone size={18} className="mobile-contact-icon" />
                    </div>
                    <a href="tel:33780326427" className="mobile-contact-link">
                      07 80 32 64 27
                    </a>
                  </div>
                  <div className="mobile-contact-item">
                    <div className="mobile-contact-icon-wrapper">
                      <Mail size={18} className="mobile-contact-icon" />
                    </div>
                    <a href="mailto:bnbatimententreprise@gmail.com" className="mobile-contact-link">
                      bnbatimententreprise@gmail.com
                    </a>
                  </div>
                  <div className="mobile-contact-item">
                    <div className="mobile-contact-icon-wrapper">
                      <Clock size={18} className="mobile-contact-icon" />
                    </div>
                    <span className="mobile-contact-text">Lun-Ven: 8h-18h | Sam: 8h-12h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
