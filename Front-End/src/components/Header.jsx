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
        if (process.env.NODE_ENV === 'development') {
          console.log('Loading header data...');
        }
        const [servicesData, blogData, testimonialsData] = await Promise.all([
          getServices(),
          fetchBlogPosts(),
          getTestimonials()
        ]);
        if (process.env.NODE_ENV === 'development') {
          console.log('Header data loaded:', { servicesData, blogData, testimonialsData });
        }
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
      if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.mobile-menu-btn')) {
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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigationClick = () => {
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // Close mobile menu after navigation
    closeMobileMenu();
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
                    fetchPriority="high"
                    loading="eager"
                    width="142"
                    height="61"
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
      </header>

      {/* New Mobile Sidebar - Connected to the site, not popup */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <div className="mobile-sidebar-logo">
              <img src="/logo.png" alt="BN Bâtiment" width="142" height="61" />
              <span>BN BÂTIMENT</span>
            </div>
            <button 
              onClick={closeMobileMenu}
              className="mobile-sidebar-close"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-sidebar-nav">
            <div className="mobile-sidebar-item">
              <NavLink to="/" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <Home size={20} />
                </div>
                <span className="mobile-sidebar-text">Accueil</span>
              </NavLink>
            </div>
            
            <div className="mobile-sidebar-item">
              <NavLink to="/a-propos" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <Info size={20} />
                </div>
                <span className="mobile-sidebar-text">À Propos</span>
              </NavLink>
            </div>

            <div className="mobile-sidebar-item">
              <NavLink to="/services" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <Wrench size={20} />
                </div>
                <span className="mobile-sidebar-text">Nos Services</span>
              </NavLink>
            </div>

            <div className="mobile-sidebar-item">
              <NavLink to="/zones" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <MapPin size={20} />
                </div>
                <span className="mobile-sidebar-text">Zones d'Intervention</span>
              </NavLink>
            </div>

            <div className="mobile-sidebar-item">
              <NavLink to="/testimonials" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <Star size={20} />
                </div>
                <span className="mobile-sidebar-text">Avis Clients</span>
              </NavLink>
            </div>

            <div className="mobile-sidebar-item">
              <NavLink to="/blog" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <FileText size={20} />
                </div>
                <span className="mobile-sidebar-text">Blog</span>
              </NavLink>
            </div>

            <div className="mobile-sidebar-item">
              <NavLink to="/realisations" className="mobile-sidebar-link" onClick={handleNavigationClick}>
                <div className="mobile-sidebar-icon">
                  <Building size={20} />
                </div>
                <span className="mobile-sidebar-text">Réalisations</span>
              </NavLink>
            </div>
          </nav>

          <div className="mobile-sidebar-cta">
            <NavLink to="/contact" className="mobile-sidebar-cta-button" onClick={handleNavigationClick}>
              <MessageSquare size={18} />
              <span>Devis Gratuit</span>
            </NavLink>
          </div>

          <div className="mobile-sidebar-contact">
            <h4>Contact Rapide</h4>
            <div className="mobile-sidebar-contact-grid">
              <div className="mobile-sidebar-contact-item">
                <Phone size={16} />
                <a href="tel:33780326427">+33 780326427</a>
              </div>
              <div className="mobile-sidebar-contact-item">
                <Mail size={16} />
                <a href="mailto:support@bnbatiment.com">support@bnbatiment.com</a>
              </div>
              <div className="mobile-sidebar-contact-item">
                <Clock size={16} />
                <span>24h/24 | 7j/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="mobile-sidebar-backdrop" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Header;
