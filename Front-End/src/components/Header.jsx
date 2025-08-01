import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
      {/* Top Bar - Enhanced with animations */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <div className="top-bar-item">
                <Phone size={16} className="icon" />
                <a href="tel:33780326427" className="top-bar-link">07 80 32 64 27</a>
              </div>
              <div className="top-bar-item">
                <Mail size={16} className="icon" />
                <a href="mailto:bnbatimententreprise@gmail.com" className="top-bar-link">bnbatimententreprise@gmail.com</a>
              </div>
            </div>
            <div className="top-bar-right">
              <div className="top-bar-item">
                <Clock size={16} className="icon" />
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
                <X size={20} />
              </button>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/" className="mobile-nav-link" onClick={handleNavigationClick}>
                <Home size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">ACCUEIL</span>
              </NavLink>
            </div>
            
            <div className="mobile-nav-item">
              <NavLink to="/a-propos" className="mobile-nav-link" onClick={handleNavigationClick}>
                <Info size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">À PROPOS</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/services" className="mobile-nav-link" onClick={handleNavigationClick}>
                <Wrench size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">NOS SERVICES</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/zones" className="mobile-nav-link" onClick={handleNavigationClick}>
                <MapPin size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">ZONES D'INTERVENTION</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/avis" className="mobile-nav-link" onClick={handleNavigationClick}>
                <Star size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">AVIS CLIENTS</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/blog" className="mobile-nav-link" onClick={handleNavigationClick}>
                <FileText size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">BLOG</span>
              </NavLink>
            </div>

            <div className="mobile-nav-item">
              <NavLink to="/realisations" className="mobile-nav-link" onClick={handleNavigationClick}>
                <Building size={20} className="mobile-nav-icon" />
                <span className="mobile-nav-text">RÉALISATIONS</span>
              </NavLink>
            </div>

            <div className="mobile-cta">
              <NavLink to="/contact" className="mobile-cta-button" onClick={handleNavigationClick}>
                <MessageSquare size={20} className="cta-icon" />
                <span className="cta-text">DEVIS GRATUIT</span>
              </NavLink>
            </div>

            {/* Mobile Contact Info */}
            <div className="mobile-contact-info">
              <div className="mobile-contact-item">
                <Phone size={18} className="contact-icon" />
                <a href="tel:33780326427" className="contact-link">
                  07 80 32 64 27
                </a>
              </div>
              <div className="mobile-contact-item">
                <Mail size={18} className="contact-icon" />
                <a href="mailto:bnbatimententreprise@gmail.com" className="contact-link">
                  bnbatimententreprise@gmail.com
                </a>
              </div>
              <div className="mobile-contact-item">
                <Clock size={18} className="contact-icon" />
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
