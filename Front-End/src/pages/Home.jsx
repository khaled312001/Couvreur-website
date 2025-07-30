import React, { useState, useEffect } from 'react';
import { getServices } from '../api/services';
import { getGallery } from '../api/gallery';
import { getTestimonials } from '../api/testimonials';
import ServiceCard from '../components/ServiceCard';
import GalleryItem from '../components/GalleryItem';
import Testimonial from '../components/Testimonial';

const Home = () => {
  const [services] = useState(getServices());
  const [gallery] = useState(getGallery());
  const [testimonials] = useState(getTestimonials());
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data with different images
  const heroSlides = [     
    {
      id: 1,
      image: 'https://th.bing.com/th/id/OIP.D2pE_dpnerxSFd8p46aA_wHaEM?w=251&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
      title: 'BN BÂTIMENT : Charpente Couverture Zinguerie',
      subtitle: 'Drôme (26) et Ardèche (07)',
      description: 'Artisan couvreur professionnel spécialisé dans la couverture, la zinguerie et la charpente. Plus de 10 ans d\'expérience au service de votre toiture.',
      cta: 'DEMANDER UN DEVIS'
    },
    {     
      id: 2,
      image: 'https://tse1.mm.bing.net/th/id/OIP.EzWJbg6lPbBOyp3h79H31QHaEC?pid=ImgDet&w=178&h=97&c=7&dpr=1.5&o=7&rm=3',
      title: 'Installation de Toiture',
      subtitle: 'Professionnel et Qualité',
      description: 'Installation complète de toitures en tuiles, zinc et métal. Respect des normes et garantie décennale.',
      cta: 'NOS SERVICES'
    },
    {
      id: 3,
      image: 'https://tse3.mm.bing.net/th/id/OIP.CH3B93q27BWuIaYNdd-bxAHaE7?pid=ImgDet&w=178&h=118&c=7&dpr=1.5&o=7&rm=3',
      title: 'Réparation et Entretien',
      subtitle: 'Intervention Rapide',
      description: 'Réparation de fuites, remplacement de tuiles, entretien préventif. Intervention sous 24h en urgence.',
      cta: 'DEVIS GRATUIT'
    }
  ];

  // Services with different images
  const servicesWithImages = [
    {
      id: 1,
      title: 'Démoussage de toiture',
      description: 'Nettoyage professionnel de votre toiture pour éliminer mousses et lichens',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '🧹',
      link: '/services/demoussage'
    },
    {
      id: 2,
      title: 'Nettoyage de toiture',
      description: 'Service complet de nettoyage et entretien de votre toiture',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '💧',
      link: '/services/nettoyage'
    },
    {
      id: 3,
      title: 'Réparation de toiture',
      description: 'Réparation de fuites et remplacement de tuiles endommagées',
      image: 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '🔧',
      link: '/services/reparation'
    },
    {
      id: 4,
      title: 'Installation de gouttières',
      description: 'Pose et réparation de gouttières en zinc et PVC',
      image: 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '🌧️',
      link: '/services/gouttieres'
    },
    {
      id: 5,
      title: 'Isolation de combles',
      description: 'Isolation thermique et phonique de vos combles',
      image: 'https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '🏠',
      link: '/services/isolation'
    },
    {
      id: 6,
      title: 'Fenêtres de toit',
      description: 'Installation et remplacement de velux et fenêtres de toit',
      image: 'https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      icon: '🪟',
      link: '/services/fenetres'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Hero Section with Slider */}
      <section className="hero-slider">
        <div className="slider-container">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay">
                <div className="container">
                  <div className="slide-content">
                    <h1 className="slide-title animate-fadeInUp">{slide.title}</h1>
                    <h2 className="slide-subtitle animate-slideInLeft">{slide.subtitle}</h2>
                    <p className="slide-description animate-slideInRight">{slide.description}</p>
                    <div className="slide-buttons animate-bounceIn">
                      <a href="/contact" className="hero-btn primary">{slide.cta}</a>
                      <a href="/services" className="hero-btn secondary">NOS SERVICES</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slider Navigation */}
          <button className="slider-nav prev" onClick={prevSlide}>
            <span>‹</span>
          </button>
          <button className="slider-nav next" onClick={nextSlide}>
            <span>›</span>
          </button>
          
          {/* Slider Dots */}
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section section-gray">
        <div className="container">
          <div className="about-grid">
            <div className="about-content fade-in-on-scroll">
              <div className="about-header">
                <div className="about-badge">
                  <div className="badge-square"></div>
                  <span>À PROPOS</span>
                </div>
                <h2 className="about-title">
                  BN BÂTIMENT : Votre artisan couvreur de confiance
                </h2>
                <p className="about-subtitle">
                  Plus de 10 ans d'expérience au service de votre toiture
                </p>
              </div>
              <div className="about-text">
                <p>
                  BN BÂTIMENT est votre artisan couvreur professionnel spécialisé dans la couverture, 
                  la zinguerie et la charpente. Nous intervenons dans toute la région Rhône-Alpes 
                  pour vous garantir des travaux de qualité et une satisfaction totale.
                </p>
                <p>
                  Notre équipe d'experts qualifiés met son savoir-faire à votre service pour tous vos 
                  projets de toiture : installation, réparation, entretien et rénovation. 
                  Nous respectons les normes en vigueur et vous offrons une garantie décennale.
                </p>
              </div>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">🏗️</span>
                  <div className="feature-content">
                    <h4>Expertise</h4>
                    <p>Plus de 10 ans d'expérience</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⭐</span>
                  <div className="feature-content">
                    <h4>Qualité</h4>
                    <p>Matériaux premium et garantie</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div className="feature-content">
                    <h4>Réactivité</h4>
                    <p>Intervention rapide et devis gratuit</p>
                  </div>
                </div>
              </div>
              <div className="about-cta">
                <a href="/a-propos" className="btn btn-primary">En savoir plus</a>
                <a href="/contact" className="btn btn-secondary">Devis gratuit</a>
              </div>
            </div>
            <div className="about-visual fade-in-on-scroll">
              <img 
                src="https://img.freepik.com/premium-vector/flat-design-construction-company-logo_1002026-152.jpg" 
                alt="Artisan couvreur au travail" 
                className="about-image"
                style={{
                  borderRadius: '15px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  width: '100%',
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Online Presence Section */}
      <section className="online-presence-section">
        <div className="container">
          <div className="presence-content">
            <div className="presence-header fade-in-on-scroll">
              <h2 className="presence-title">Trouvez-nous sur :</h2>
            </div>
            <div className="presence-cards">
              <div className="presence-card fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
                <div className="card-logo">
                  <div className="google-logo">
                    <div className="google-building"></div>
                    <div className="google-g">G</div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-title">Google My Business</div>
                  <div className="card-subtitle">Google</div>
                </div>
              </div>
              
              <div className="presence-card fade-in-on-scroll" style={{animationDelay: '0.2s'}}>
                <div className="card-logo">
                  <div className="figaro-logo">
                    <span className="figaro-text">LE FIGARO</span>
                    <span className="figaro-emploi">emploi</span>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Figaro Entreprise</div>
                </div>
              </div>
              
              <div className="presence-card fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
                <div className="card-logo">
                  <div className="societe-logo">
                    <span className="societe-text">Societe</span>
                    <div className="societe-dot">i</div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Société.com</div>
                </div>
              </div>
              
              <div className="presence-card fade-in-on-scroll" style={{animationDelay: '0.4s'}}>
                <div className="card-logo">
                  <div className="mappy-logo">
                    <span className="mappy-text">mappy</span>
                    <div className="mappy-dot"></div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Mappy</div>
                </div>
              </div>
            </div>
            
            <div className="reviews-widget fade-in-on-scroll" style={{animationDelay: '0.5s'}}>
              <div className="google-reviews">
                <div className="reviews-logo">
                  <div className="google-g-colorful">G</div>
                </div>
                <div className="reviews-content">
                  <h3 className="reviews-title">Avis Clients</h3>
                  <div className="reviews-rating">
                    <span className="rating-score">5.0</span>
                    <div className="rating-stars">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                    </div>
                  </div>
                  <a href="/testimonials" className="reviews-link">Lire nos 34 avis</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content fade-in-on-scroll">
              <div className="about-header">
                <div className="about-badge">
                  <div className="badge-square"></div>
                  <span>A PROPOS</span>
                </div>
                <h2 className="about-title">
                  Qualité et fiabilité : votre couvreur à Rhône-Alpes pour une satisfaction garantie !
                </h2>
              </div>
              
              <div className="about-description">
                <p>
                  BN BÂTIMENT vous accompagne dans tous vos projets de toiture dans la région de Rochemaure. 
                  Nous vous proposons un accompagnement personnalisé pour vos projets de couverture, avec des devis gratuits 
                  et détaillés, des conseils d'experts, des facilités de paiement et une équipe réactive pour vos besoins 
                  de rénovation, désamiantage, nettoyage et étanchéité dans un rayon de 100km autour de Rochemaure.
                </p>
              </div>
              
              <div className="about-features">
                <div className="about-feature fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
                  <div className="feature-icon">
                    <div className="team-icon">👥</div>
                  </div>
                  <div className="feature-content">
                    <h3>Équipe Expérimentée</h3>
                    <p>
                      Fort de 10 ans d'expérience, BN BÂTIMENT dispose de toute l'expertise professionnelle 
                      nécessaire pour vos futurs projets de toiture.
                    </p>
                  </div>
                </div>
                
                <div className="about-feature fade-in-on-scroll" style={{animationDelay: '0.2s'}}>
                  <div className="feature-icon">
                    <div className="tools-icon">🔧</div>
                  </div>
                  <div className="feature-content">
                    <h3>Les meilleurs outils</h3>
                    <p>
                      Nous sélectionnons exclusivement des matériaux de haute qualité pour des toitures 
                      qui allient performance et respect de l'environnement.
                    </p>
                  </div>
                </div>
                
                <div className="about-feature fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
                  <div className="feature-icon">
                    <div className="price-icon">💰</div>
                  </div>
                  <div className="feature-content">
                    <h3>Prix abordable</h3>
                    <p>
                      Nous veillons à pratiquer des prix justes et compétitifs pour l'ensemble 
                      de nos interventions de toiture.
                    </p>
                  </div>
                </div>
                
                <div className="about-feature fade-in-on-scroll" style={{animationDelay: '0.4s'}}>
                  <div className="feature-icon">
                    <div className="warranty-icon">🛡️</div>
                  </div>
                  <div className="feature-content">
                    <h3>Garantie Décennale</h3>
                    <p>
                      BN BÂTIMENT votre entreprise de couverture à Rhône-Alpes, est pleinement 
                      assurée et certifiée pour votre tranquillité d'esprit.
                    </p>
                  </div>
                </div>
              </div>
              
              <a href="/about" className="about-cta">PLUS À PROPOS DE NOUS</a>
            </div>
            
            <div className="about-visual fade-in-on-scroll">
              <div className="worker-illustration">
                <div className="roof-scene">
                  <div className="roof"></div>
                  <div className="worker">
                    <div className="worker-body"></div>
                    <div className="worker-head"></div>
                    <div className="worker-tool"></div>
                  </div>
                  <div className="ladder"></div>
                </div>
                <div className="experience-badge">
                  <div className="badge-number">10</div>
                  <div className="badge-text">ans d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality and Reliability Section */}
      <section className="quality-section section">
        <div className="container">
          <div className="quality-grid">
            <div className="quality-content fade-in-on-scroll">
              <h2 className="section-title">Qualité et Fiabilité</h2>
              <p className="section-description">
                Notre engagement envers l'excellence se traduit par des prestations de qualité, 
                le respect des délais et une fiabilité reconnue par nos clients.
              </p>
              <div className="quality-features">
                <div className="quality-feature">
                  <div className="feature-icon">🏆</div>
                  <div className="feature-text">
                    <h3>Qualité des Prestations</h3>
                    <p>Matériaux premium et techniques professionnelles</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">⏰</div>
                  <div className="feature-text">
                    <h3>Respect des Délais</h3>
                    <p>Planification rigoureuse et respect des échéances</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">🔧</div>
                  <div className="feature-text">
                    <h3>Fiabilité</h3>
                    <p>Plus de 10 ans d'expérience dans le secteur</p>
                  </div>
                </div>
                <div className="quality-feature">
                  <div className="feature-icon">🛠️</div>
                  <div className="feature-text">
                    <h3>Service Après-Vente</h3>
                    <p>Accompagnement et garantie décennale</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="cta-button">DEMANDER UN DEVIS</a>
            </div>
            <div className="quality-image fade-in-on-scroll">
              <img 
                src="https://th.bing.com/th/id/OIP.D2pE_dpnerxSFd8p46aA_wHaEM?w=251&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
                alt="Travailleur sur toiture" 
                className="worker-image"
              />
              <div className="image-badge">
                <span>10+</span>
                <span>Années d'expérience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Different Images */}
      <section className="services-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <div className="section-badge">
              <div className="badge-square"></div>
              <span>NOS SERVICES</span>
            </div>
            <h2 className="section-title">Découvrez l'ensemble de nos prestations dans le Rhône-Alpes</h2>
            <p className="section-subtitle">
              Nous proposons de nombreux services répondant chacun aux besoins spécifiques de nos clients en Drôme (26) et Ardèche (07)
            </p>
          </div>
          <div className="services-grid grid grid-3">
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="service-image">
                <img src="https://th.bing.com/th/id/OIP.byinHvCNLGPMajojSqKM-QHaE8?w=241&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="Rénovation de toiture" />
              </div>
              <div className="card-content">
                <h3>Rénovation de toiture</h3>
                <p>Nous rénovons et prenons soin de tout type de toiture en Drôme (26) et Ardèche (07)</p>
                <a href="/services/renovation" className="card-button">Voir le détail</a>
              </div>
            </div>
            
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="service-image">
                <img src="data:image/webp;base64,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" alt="Réparation de toiture" />
              </div>
              <div className="card-content">
                <h3>Réparation de toiture</h3>
                <p>Nous inspectons et réparons tout type de toiture.</p>
                <a href="/services/reparation" className="card-button">Voir le détail</a>
              </div>
            </div>
            
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="service-image">
                <img src="data:image/webp;base64,UklGRsxGAABXRUJQVlA4IMBGAACQQgGdASqzASABPp1AmkglpCKhMFPsMLATiWcIw4xXvEyrltDYZDM8XujNj+K4+aqlPR/6D/c+HP559s/q/777jH6jlL+N/wf2l9Sf5/+avTXto/ye+/5BfSnsC/kP82/XX2BobfaegT9I/v/pLzwvs3UE/cD1u74v+t6hX+g9IXwFfsXqGEG1/HLrWVaTbtHzXmF2qCswMIy9JB85gkQtt2L80ZNPocA730rK5/v2eOKf6KUBNuwRPcyH9fUuRmOF5gr29Ze0iC/HElEUQoStxVswdOCaWT5xkjEBy++7mND4pOYCoQYb+sCswEPu/+maVaHgZ2ZJvA4CfmgDULWFbVz9dnJsnkfVYUAP17QJ0MHL8bv34Rk/6SZtDT+jRx2vOntPaJHVItx/HXrs4AsNJSnN0RJ7z7HtuthIaeCgabql1ZMV8OvNv+emVtF0SQrimGlFYLqcbKKhNnOzmLD/h6RoIRou4IJHeWvnwA39ktE8a+VXpUelBfQVZ9HNWh2OcEMNd8fIjRNIxBuTmQw+2/HsjyJbdL0WDziVpoXIwSkFCI9aswi+Zn96wItejO8Y7AKr6Bo+kwjXPJisx+iEAwj7xXbY7igbMNzYIXbkVM1qzOoJKBFwXTBUH3036Z52NObPnsstXDlL0KJQ7a8D8zD1RHFNXyhJW9Aj6Cq8cOjaqKJpq60+s7sUFDqOdn4B4vGeXRdyb7juu2FNT//u/BKsrQZNrEaugT9xm295w5CQWEqp1bbaqzUb5pAoMR/Rmk65HxbAzk5/UPyNKQLRjOYVgil+5VKM3N2zad/y9T3BDm6HXSd8GHxIzyy6Tx3QFN9XWnzB06wyMX0S+qMkJMUu35pmLRN1I275KjmWvaPGq4Gu9KTi7bWqy06ubXubvW6sf0n1+UabrcZhnNlx19qbWxDQOE2sp7ePG2Aj6H6lJyve7nBPUqeSXP3RJoP0J9A8m+V2jZdih/7U/2yaCXZZMSsLOrrssvoScbLcZos6/4tyVd42FV1vQLoEsxdmwdwMxlk8RwzGUayH3xtM/RA0sdaWKMqGTYY58gOrMKQEktfqGdXgOQ0VdX5wPATCeSmR1rmqcOabXSV5iD5PduViUhHUtTwrJroZoH66lQT1LQ/FMvQWLFov5EIrhCtz45De8xr1okbU3lOxosirnR45aT/n32dHL9Ka5zEwCp5vf5ekHI4Yy4ydHGF3Ck6DUnPAKTPLGFWiyqgfrvmZVeGnwC0IleLMT5B/pmKcWfwyWaMQ8LwCvP/99GOA54rnQUCpihfUuN4WpnBP+OuURcYs33FrG+ZDHKSyvhox0ki1M6RVBSyoqOfV3B9NhSfk0rsX49Y/Sp66Nh3PFeNXyTPLBNrEVNXF2tobjrNNjAXPISJ8+od6NKbmsHUJXkgLVi0iL74e4OweqiaXODaw0C1yj4sv741V0tMgLJpQdZo43/zTzgkn/gqKgkVm7ZW4Nr0OYD0Kfvjmh/rh1JBfH99qBro5+QqUj9+ZSWFYWn/xyoOJ7jOokuKFhduSinU91kVe7xt1R2OzP3tNwWWyQwwcAbGJ8zEsmBFNQspARI4lW5T0dWJUb0i2ln03NaPbf+mETtyhxqnbJH66f97v3kvsxiEk/XpIzIxGKlPyEecuhtQwZoruBd3ULFTyjEfIKGWdUvaz4evo2aS/PCkr6ckmX4i7UUgcEei8MOb1hX9FEDc1I2XnMsuDNl6LYHMwqpwsQhEE8gZ32LDc+8HQ5RqKgU8bZRy5gsob5Y5cMUgh1/ULiQg6qzox5k/EyZ0zdh/f3SDOAz28KlVftCalUfvzrU902hyirjErnNXhHxN3GFe4WJ9iqItFlfoHotxhVj0pIqTO7Rub1LLA8ISjajwFHr4KhW/JWLvYadZMNsV3bQjS6B0tCa36m0gJ6DYcg7fH5Evfb8iJsFa8SrfbDDMVY6+rW+8b22WdP3Y1e8VjTGY2dxuNWQpx3KVxgyN8bMcfXcQ46Pvm1uVh1n21hcoNkyXEUbYr7YMi6pb4ueBspNwLBYcHQsrRci/mLMuO/gc8xGutZDwOxLlUuH255jmnanDXzcinTsuWTwOMj7qglfx1O3ve6oAL+qn1M1zXrzOCA6rYlzum1YT3PWwkRxsqNPMFQqDn8w3/G7nYazR/h7wB4HPXQZlh/gnn13luWlEl/SmFWMqqZKcmzQ2S9Q3K165Agq8kgyY1FtyI1yPaEEiZTfyZaxCBIQS9wUCxXcl0eLNX8JtAUBIpcmHIP87TstxOwsyjGfAA9cidUKhwm9zJr4jGNdKL6hqiNeNSmJU+8BxRyAYPN/IkILjdomm+c2szfi9PxvnRdipoZVeadWnjSGM7i3e+rk0Z6dgnI1r4hnxBqXNfHLcdiYzyMSLmurdM1KtY1Xo25O3Wet2qPb8VElzLEZvo+t+Hw9h/S1s/1DCd8JqV2pA8Gs7LVtKNn5pDW1WobLZMJVX6jqH8mr03pXEfqUYXsbzw3mr9AQrqY683MH7Ez3U+8/qATflbxxXsAvG3V2dno5W5xW+m3rMJXvu7Y7/RIKyhNNF55cdBXVJQp0T11bFiiGnJ/7KoJksNsi8LLbsHBCccIgVCF8YevS5nyqwWIle/4ufmhjbXvnqXeGfRHWdJWprG9P3iJaf9dl4YtxCODJgIOli/e4+s7TN4Pv7Szr4jfJLFMb0x+dl1LbijRl+bwADBurBBplowET1iXY6JpebligIGHS+m5Lwb+PIAWPvqDPiRNZQIMkSDjcZiMYZw0UqEChHMhFCpTtr04/v4yYM/azVVVg/OFN+kCBYXi3wuI6NcO3JJYDq4QH1KuIrAVR/xP5AnlwRR3pwMBQiRUjEwPfTu0+8v1O1xnhhW0tYiQP32Vz1JyLg0YCOlE4pfYsDUt8QE9XlFzPT1DQahDCVxqJr7+EkUsiX6C58JHxi3SjA9sYuIMqKd/f8gou4/WO3aRnpQFwUY83olKIxAsauQDH+vHDLfS60zDjEi1ritjYKlZ7vHZQJrRflv1RM8FMsOrVnrWjtiy4OJgcyPj9S4qxOuwnSVLzunEWZ2WHXYOYOr0kNovWrWH+fPiBKDflSGU5yApj1Wxeb/razPBXBT+dKUfGKVBeG3mobS/8zlB/caYOXtXIy3tlov+Z/X/ZLja2stMeqJHzVpzC02R3Z/ZxbczovsKFIG+ZElDFC3qeHaJOB07gSPdOF8X+p/9Ap6vt4bE8kOdw1TuEXezzxa21D6hQjTtiBpq4nJ8lpK/z7E5H3mE4/5V6hvCRAlLWPZuuZMqwgOy5ADz+9awuYcI4SxjQmck7dKIvOYRD9oik4XkJXdM5AA+1oVek6QQVE29wUp3+6n9Y+2GRiovdnMt8X6EDwztRtPOjxP4WcBC8XqQsgOwl6qPJr+mjDSjRhZDPVLL/1eo2myWWBRvFP6oRZcfpdDUalhHAlfRAAA/jIFAr49QP6bG/wAktJH7Eq9E5R4rv71aqQa7MQWXh94dJvO7ewv8GoWqImqRWM/D5ByRUm7soSVYd0UYNSmvktKkHbxlq+tq4qHwAfPeEtwV9qtehxnr3430hvEusaHJVMbd5woygfZR/Q/8dDOZ+86byQfXPsnH1nTNwCx+DhQd+mRnH9fSEjqBmleirPhgn374rxrcj6aKR1uedQw8MN8vYfPbrpYFyNj52/WSl1lxiE8xcPeWl65UIsOm25qQigRx4fXgSHSAYSjmt896zjA0yVPEnorGjyM43bScs+AHg3tnJVJd6tgBTSFZ6VxBx95bHJoeMkG5YGM8vA2/XjmpNqR9c+Eh87WpphkjkbNeE2FXa04dVKZYBa2GZmeqkqH+9TdeDFv+wzm8UktzrHVAJp5cYcLyQUxOFxjmRy/ZPe62xsuKQN62n7KPz1MqVsQnv8Ax2Go/7VoSKSQixs4AvpdVt6oNE4NLrga1equmo8PZ5kt0Mj3Jpc+HkUh66yYxRW32o4nqijazNQy80ZfBzt84JRk0lA2egUCOcxjkehXcttG3xRomEJhjVG6PB7b2qVW6PVlay7FIbPvLNlFevc3gbYfXdv7fwxM4BCKaz0mkATIvr8ld9/HqBN227vtfSIbkeq1VXimSvl783k0IIJa6ZIN2HCJ3pBN2BJcdMOkIjtAD9wBv4gkioL2UkarWZ5xsqlg7jX+vgROv98/7y0rfrhnwHs3VCb+ryVY4zaWYwlqRGwEBJFaD6bhbRUxKYf1Fbv214e1BLDOXLL4OR44EDnS7dBsNAIlwc/IOZV8pTqG01g7VpmhQBl/0ZWTyfcdmSp9SwOfStThVAHmVsDEREYR0dDsHYVXns1mCIYvdeE2Y0Tft9WtZqjVGpiNwQUe6y02Ss6jXwnY2Ga3h05FiXuDsPcPmQX61Shdegw/zqH1jrUbOuhcHvi0FIZBHe2Nzl4EaBPa3OGg5nkw0SjTVyd5RTtOwFRHsFtFICTH9Kj8K3EM6mOM1YkE5SfhqrqdWkMkWmT1mFoQQ8EpAiT3yTviZCnBS++m/81rLcObOp4PeI59exejayRZZtmPcFVmsDAVr1waXRlGRGR2LPazQvH7EYfEYbiurK5A2ruu0X6upyh2gfNh/vMGgSDwd0Q9CWh2KEnhNNz24PA+/EYNgAnfVRzTzY9bgPpaZuDe/cElepT0sO6q+cgVhCRRMHlqsmpeXpCsxmsVZwzTy1StS5POJOhCZ/SbKDGatONGriU/T9JfKHFC2quTqiaQ2dU/MKV+wfC0sokXgtvyHFZzpdwKhpPCIbdGErPq9Y0D4uBh9S77Sdp8l7153+b3q0VR/CE4sCAg/NROeA1gnOVqUICLTdpOXdTo/5Vg6gmfZlBz1zoO43cbJWVTNRbjaCav4DRzVmsUr5oyziUp0EiGuUR5UiG8bz+CoHXGZkZhBckubl7eGbxmNaJBFaSgQMReLSNVWd/fzBoYGEZhYtq0Oi8gmtLePaSbGaGa7ecmZfuwWvZeqK9yDkHaOdOe9Jtp9kGORvfZRnK+HNwACx9tiII/5Yjp2EFfe8Ze1NoNjMvZl/3mrZsn2U50W64ZKMusq2o6XHtCqY7UEmQ1KclHhzp+ogiJsDzxlLRfsYxwV2r9z7+azu+J9hMQcfrtFeojiAnbFHI0a2IeDBon6Uecn2AwYAGITAeUvNACgeC0e7h8CXiFWJhs7xe+EtQ5GLsVKKr7OiiOiU7IMLfMtMHx4upOkrhDX+wos/2kV9uBBf9J1YiX/Cyr4hzro4ssakexhTLiNO+/ExZ/Gn5nc6d37rhe1L6qz1TyrN/MWb9+sgCavlS9PZk4pUVAk0d1RyBqTA7OHEErWONsKYNW/+lZ/cHBxxggggHGygcywFrEn0pNck8sKCOtLYZYZvAmKSsM/7BDrwQnLE+zS8PCnB6yetYfY1ZeOzWjVhLVKocHNj6hKLwE1jrfHYcpjju9HMdpFb40LtC5GW4BHmZhC4yRrQaaXU0HG6VLiEeI/bD+57ZVDs5qqkFHx1MaX4mR3+CtvVBVfPnCq+XyVg/RNXI9+bYW8cU18f5ymyZAS4XmRuzTe11tvQuyj7UIfBOMdZQzsnwWyyyqGBjEijmSVXskNdk+HtYu3xLRj6o8zLvp+M5CDu4i+jc0ZbbhpWYVMeG+eF02n8KFoQ/0ZM5T09H4MxlBJn6rE3Z8USw+gRIU3lzLDg1VtaLuJxhKRphNooDY0PbOd7dZntxjysuODa08hWTaiZhQ97+t45omDiJfvUVnEwFn/YeoAA+tH4jH5mjx6+snX7zptmSXQyHk7+Dea4YDhmEi0rDUHSmhOHSRkWvio9dhlBzixO2+rbXtC/+SdAfQqVS94ekmqTBSbVWVgqUwxcPxyBZiLn3ew2mCUw5sv3Po3TOtyjqTHjnTsYHUHDTwvyUZSk5GPeQa+JIhNQmRIHTXuLDhto87xt8x3CptMSKFXg5ZvUY/opuDF29xTz7MpCUts2bo2Vos21p4t1eZM8gnLz11t1lzvh9n+lYKV8eZFs1UsySxNWb1T5rLz3Da7yIavUQMXn3IUnWXlsNBxvMu2U1jmN7q+oeKbGqB7zZkMXMCOJVsvkp3KXjcu7ToGd4IKkXpXQHkjOjw9AcoUAVQJjFvTrxx6Fs8E6SzK4FLFfmOQPg1r+mIfb0l/sgIpgoQaKVSEFKNZWJfEmednSigNgO6yIyekezord1n5op88uqxusDPnSPJ9Kk0oIFdQfquAC604bFd3mU8JdTWF6xCp3NZLnhfAhg/qCh8i6iGds0MzEkBDF0BezmRoKQnESeGrVl9cpHby6dNZJ+jZI34165n2DyvpS34ImMvtnQj/dgrhVLjBfpKmsVCknDZwTi2exywXX9CJFMS0IwbMgItPZuG7lN8kKDv1GtJ7jjvptwvApr9sjow0U0pcdwxuOv3KTrGI9ioQTKppMvY5UAk8LrM4hg8abN2iqIRa6OY0fji46tMr3HQFKc4qgjVvF+EhKxWe7KRBC60iQXCdbwaoZRGTD5tBSliQOVZzMpMxhUxDctz+4D4fDj0EJSeXn1iZ1D6xwo3ecW6CGU+Woo12E7c98rHC9KALiw5Y26Q4MbdNLCdYOKkSSOVSECIXethF8HF9iFCGpgXZ7PPq43EWJTQgy/P4iBTBTTLajvtZ1TAcWMM0ShII2PC3f+Mgprf1wBvpZL9kVREJtkJ1lv/qYdGXnog+7q/eh1jCWROxjCo+M8nOWwLuq97vNJFgjj4OJUYVzVGt1R0ilFQyCS/xiGvUz8JbuvzByB7jMLcOpYyePJr3MsMn+1ih8p30wmUPVjIVXuDClnbnkp54daXJCqNXC+q+Vk95LRCZk6RK4K0Xme04yrBXKNNRYrx97t7vfA3lACbe9nn+Ozc7AGs6VK/+PAgeoc4rfMozxFB2UqQTgS2jzpSpuPNk8u4PV3QDPliXmZBfLmxsYzQlOOg3f1L3xlNGjT9Q7DFrZw+YIsXeM2QeYt8TYHPcS7fCpxIOuiIoQacT9m0azPvBRF7Jo3K9oNvy02R66rl4Jfg6O/RbjRU5lITVeCcMDTxAUYTeEmecY002SZtNW62JcJOmIaNFMv6GBqzf3RaHk7RbiPe2pOwI8OpVNPfJkdgxypTkG0KT76ENJq3+O8rwmLDTCwVf8TKar4RXOnP6Qto5f/Ggces7Ku/7HXWws0chIGk+Xe8lNj4ERlvUqS/iT320SRzsYk3XM3xIGDjXTjBf1BnacLciuwRajm50OBIMb07hsstdUqKnm5ihi2XRf0HYwwSSHMKLo/k2tg/hkRqUAyYCHzjWyofVyk7dqXNiSL/UxpzLOugQ0PoTMXPcIAa2iUfCrMbU69tngabScL+zZIaIp/63EZ1Ak7AnqlpoNyahZC5K4fgR03Q13Cxhtlil/d1S6jQw/0PBQaBgrbb0gR7m0jb2DaY2O/MNZFVSHJDYP/tv4O5z26lMXCLAlS3ywCROgkeayZ0o2z5RBTVBpX1zRWebo0iwu1OZKNhGz49TR98CH9h0Rh0YtCEThNrVSvSibzV/k3WgIFtjcVQgve3BusNOQGDA7j9ap6LCMBWadmBGMJ8roU3L94oR4gOcTp+N1qKn66qG3lBpkJOKWuDiYgFhB302OZvqp7gY1F0sPK3K0LhqlAmL4Dl3iEpsU+UGtToJu+Dca5n96tu/YoE+UJHdcPAL6k6C0OhYNJUYW6jbXG9ebimrTTgV3hw/EX23SgpGigplUCEMvW6EI+MsJsJGN4t1x9mlyVbn4CtmJbAInPdAbC7sL68sgRpd+/rda/70d7EkJo9U0Um1l2fZc3tAerGLKOOeU8MZD6wPmvOtD+89R8lNb2QdKtwwpLv4uEI18ZQOHsAP057xIx0LxlXTZx1VHb3Ul8QRN7qRyIN+if0J6sYuAon4I+ZJrfwlMJUHPT0d91G7uS5SVolFR9QDiCr6046ly+zfUyQoZs3QAp2slFwPSA3iKHIS85Og7em91j5/Oc1K+DZp6LCOvKMSH6AcFXZS0u9pGnRRKUyRd8dnFrO07NI8k0TYnv5pQNRRQ8No16gNDSzzjLNEWW+eVy5idM9eJ52yK/zD8T++poOwcwlJQjntGJtOIHbVlGFB7Ste17G52Mq49+hop0lWQHIC/lhHzsZ+3+mpiQTluC3Go4f4FMvoplXwsfFBrSOqxkj3rwJocMRj8gJROH7zOWB2Qd1z5ZWPPN9CQ4Jf51blKRHhiiFhpq5NPuGIDQsDVIaciLbvHRmVMLMI82kRphWqj36RII/q+qEjgpTI5fFjnGJOtYK7nC565lBoVKSCvlUdLtf3EP11D4dPLOMgtDn/3a3NxyUE8TkHFE+3KbDED9oMm1tuO68aa9wSj55xt8eLWq8nQyXBX9ccKjP/xbjsfTIdGsMBMyakEU5aqM3ceGh3TPS0iKoIF6zfo7kWDyF9Go+p01hBzIIeU40DH7NM4Q8pP8yMHndQw5NdpqThwT0YGekavsq+qKIVJzshKEz4LzdisqEcb7TIuz46P3HF8I2tgNXbOeV7JdA3gG62E20uGIyQgnU78hdsHUVlR3d6l6QAoOwYu+AJtr9c+nNatJH/5vsn3Ja7JDvdZIdltATt8PhWkOECxlmC4ymNXqsgSr5gHIc3El5qQqwqawZt8080OWjOXEE1W0Abmh9niYvv6xuFXqohrZsrOAnOgOoifSdM42mu9SV4vuGAFouX6u78flFMKW+aELwFpnUAjVv/5kAQYov4FLLdiYIGUz56HFBkIPS//6a0tiXhLpIur9+k5OFM2IYPQTWRuU3t1l5D7g6F7x6nEszNFlsB6/NRiZM1d8GLUBuj5+wsNUIMM6BAhDR4x1liQbLlOmuqLk4r02InLviLiyZqEa5xW25N5LFQzj4XvOFr1Nwfm7SoTejlM5gjy2mMoUf9uJMzmJ1fZhSFTXozWNsqG1gBDdAovY37Tzuy+QNmwZpMYt0Ov9K3j54KW06kXuHKnF0cxQQLZZqE9OzIHbXitrfhx8ZwV8YiEyJdMcUV8DdUillOPIx/yMjVi5/l5bK75T60sGFV987KBdIlu+Ar89VRLzyeEvBLaM6goKlNvi2oQ06x4z+k5MX6sUYvxxu3pjC9P3Z25oHH4mOGC/U/Al3SwjCY470z6zUh0vMIo4VRTDzD0zrXh5ZW/sFlQKvoKdaUcNEHTdh8CYeA3Z60oH0ea+qiyrzzDwVhQ8wyLloZ2vCyiHalsDACEcisMVQPrygffu9K/8srTQ+0yxWQUCbJPDNWbieT1QbNCtufE+XbugLxd8CEhc0s5OfJJFXOh0TqLiRSXJI6b/XMCWkKgzDuWK47537uyKkWVPOU0riuA9ma4ayvUsWwGBeyxaPowgudeujc4TAved7um78015dW92+83VOw1gM1+t1VHMFmXlF0BMVx2m0h0rT9Grfu1vKbqSSMhnKr+7fmKcaI5Tp+fAUvY1SpQiPq0VmF1meBPAgBCENOKrdRc1L7cdIkKggygtE3FPudkypWTx6ixJq0zTBIScNfM2lY7fuKYhBBabDKOFqRqmXridnOsxI3YbqCYzP2KWX1OpqCUy4+CPM1e4shuNIfvly9l3ejsjwsisjDRNqaAgVkkASd9bqTBDsW5epJFkIHX+67OvYej7pAh95romouirs1b6w6+8p2Ez78vpMkPI3aHd88cTjCW1XfiBEVGseXEIm9h7FB5VzQVBPNqHBr0jTkZH7clq97uMOIE2JI+0x2wx/53XAaCDZPkvYKUmYJM0A+LLva6tLpsaFonAR9S10viLxf+UOhwbaEmjmSSTfjCekAszJKz/SA3RBvnNmM8gZmV4jPbOW9RWztOCPspuDqHO02dZd5ZV4UaNyi3dv9vgBZuPi8fWkFsDs3rcW0L8buH9tvfmLGpHCq8o2eFcRb5BlblKuydLdpfj7nglZnrQ/wuvb882QXUgIiEB9haNrt3Ug/4Zrd5aalaGcY8Yk+sEHaCDxoBrdHukPwlH84oAltlJmFjHkn9y1vZFGdznxDELLJ4Uv/0/rPSubrg0PGNyLeDY/M5QtMIupDe0olek39hfLu6xgzua3/jVhszwqOQo2bNsCmhVcDyQ9hmwImt6VFVBVpVS5SfwzlFI/3d68OpjthfZkRJbeRxCfFs1DittNrlTFhOklzgePEeXLBN8w42JaSJcEzAYqUhZCrAqaD2FzgZ0l2MZu1aIP1ZdHmsfpbo+6Frr0n3fibn+UYm/ZzE1Tsk+l0/KtVTMNWclM7/WevuY0vIkEIiZSjeetmqLZqA+E26oJOEeeZexSyF/o4vTV5iAyOQMZNbKj1SCnv0snP4P41AeCFdF8dF+qtfYo1zZFDxUX1+Q4znorMPjSjbaRvdTSWhrj+Mp8laRk8zt3Uiq++eopdrco8nYdlh1waI7imwEA3Ik3N44gbE/Zh24byfFm838N14Q2w6j8LAz0h7p0+FQCrB+fYdAwZrj/SuJydDwurnfCls3ivwltl6TbSGrXxqot1UOa1EaH9ltlr48LYqulmbVkj8A3ukFwfkA6mkVsBIxc7SZwljHW2+JafaMJZTckrQz0VI+jQUP6kTntNX0+2pPTsV2BS8twbiCNRyS0Xm5itCJDF+TFL5/H03NXVmx1uFdYk/gcfjVvvSJeiKejsxKZ0rlrXcEL6aXnOe8GeAXzvO/We/JhErGJMAxnYmrAKRQ4r84tqPJPNRi1s/AT8tUWO82VEi3uYXzCbgE6z43MyjzMw+arK6I2m/C6q1UrKMzxFV2gdDVgzOvo1TGsG6hsUuYfSSuaPT6V4uVlc76Fz1ZBmgTst2UyatRyvRTkIP0p2uOEBKb0jx99DZhHip3jjg2wLn+IeFIInWH0H/1rPUk8xPKGLD2ddQZf9wkWiT1Ns0Q3n5+HAzb6PR3TZEWJU3F7wx35QebPirRXL4JNlUkslCGLTqVpDY0aD/x9vTv5oKq+0Pjjcdz+pIfVG2F/sFiky4uwmcSIpm6hYf9RjeimQ78YLYfEeFMGjGXn/f6+d/gt7K+Dgj/Lqq++4qNbAlg5TdN2Igk6W4JjVfK8HJGVlNBKweY3+2u40SBgJppBncgRFiPS9Ni1V7eqBPYszOhKULQjFk3v4F3hsBXV5H0gxX6qLJx+1jmRlxGWnG0y/gSTNKMy5fYqzwoRfx8P9vwfE5Jzz/Lohv1FhrRVjYAMmtR7/JKNEZhcuBNZ2h+JhQpNpGZCjEHTX2ZXSxbDrLBE5IpdXVeL+QMI1EkeiWaAMkxgfovNFBn+Y8sFws9ZKIl41YdjCrPPoKxipIdFLugBlL9+nxhPLvobE69Q49blcLHEkQ4q6e6lsWjec9/1q1NAyiPv623l4X7CPevxnFAtZHpRa63LnuIYBw4EP0CwcFWPHkfVFJMp34jGXmPdwHPuPWapeBWCnMCeCn4y6w4yGKo6R2nt95MtZRwfHw8bE5hi3EYtEyfeLvkXEN6w/PuOg+VKOC7sOgnVDkF9w/1pe55uhG2P8PXsnH+xeUfgQEvnSnU62Wptv835Co7xA7kO1bQ09DyecMKuR6zQ3NLAe9uFoo+uraASf7P83V34ECiNUBK3l9f11qFBW+8B6pgH3t4Nwzo9CVHyF64+V/njHi3lNhnUYkCjTSxnNxEvFQeMPEpj8Xa7KQ/za4D9T9ISlomfxBSB9jw+Sju2Z54/+FYcCSAJkcCwFjKlseH/7HXrlUW1ZX3WFQ/HxRxk+64u60xbABstqwwy0Z+Ht6I42JQ7KWQWOGwoVDNQuRYkH7nd7I7klByGLZ3v7W4NuK8TaxVWj4TH9CTzdmeYLG52oioj2QhQ17DSSf9CVlU6yFCcgksvQiAi9EsgxJBQdlYrxtiBvv6sMEpzrjrpw+3icAOURDa8+LdKh2rBwO8QdG8Eq5UjTmSVh55R274Q/akWSvyQqaZa5C4jSCN4EEghlmSx6nksBO8ZN7CeK9vpaq4caFXKHnkt5q5oajpHLzlwOffbeJemMXBgxlOiglrcl79mDtNU7QGpbjBRRLjFulK6EkZmgeyUNUZm0o+6eUqQbBEboA/tN/vwHxgzAmlWt0zTh2hEr2hssPuZXJmHMcdGnlxwvUFy+TGdt5VR1o3BEwK94m0idXKhdWeyni5LP3sN3rdhiBotQ0YoaNKFHnaofy5XmVrDiNrLWBfPWSdxuSOQJsnAsmL0kXe02hNMEOGp6gsXtoGA4ErG98i4L0OLZC58t61QzDh/uXoc0zh1bWh5Aq4ro6TzqsrSH5zUabv0Dp3Z4jbmh7/DRBmagX2bHrBWd9uQeyamZ4BpP63n9IqUZv2t1CE97bqJC6yu53ZW9eRGI/5arYYbrHtxJD5VrV4i29UzOuoWR+P3RnhggSwV21q3GXqZeHWztl6rJ3eVSeJoNSul3N3UqsZ9on047G0UWYu9f1h0GoRnn5z2sVEhXrcfoL01bfaiQywFj7uDiwEJZJlzAlnIV0eu43fF5IVX1MZrwT9hs3f7PqqM6pYZd7l5vwxhQlGb7ZmYJxaL4omSg/0Lqw5swhB9GIai39iwZYavMugnvPtCW2d83+MwanRMxUCPqMBRCBx7Y99nsKU/PFzYy0Dd45cs5HkCkC8g+uERdRLj83LdBawr9g+QYiv6kmUr9BmrtX/RICvRpU9F1GIkKMGFP8O1q9Cn9UZu3k9sb8tmmZuy/UBlF0x/s98F2FfcgZa6RRK6qL4EONqc9xUPSiccqEfRJaHDrNtmGh8LkC2Pvz86yGYi00OtWM9fYA9ttrXQKzMDDQanJJWYF7A6R3LQnhjrEK1e+QtBiHJCOBwEbRN8EMA8Zr9/p9FykSHRBD0SCohB4VPwBk3nRc9f1V/YoIFfedXYY8wKdA952+5pJApJ1UPCN7Qmn5J5TtI+Dejw4+R3U9SFvhUu3Df6QXyxZFpoV23gSjRbV0+GQe7wwEL68B8cCP6PSSKymOOJMPY7A3e4hx2/UwShnfyRdGoBk4TMLSTfp6lr+3NN3yhsxYsC14SlOjo8TP/eOM060c0zZyLcZYdQlnJQMdAMD/j8+o6Ao303OUyxgvtXVgsAj87HXx++Ov4X4BI95gEoo90kUhb/UmKXzvYVAUYYcHOTvmdm6GRYyR5i/ES1SXA9deSZcoBJkPX9y4GIk7AlqHkHfx4TQDb8pVUA6VqXLP+0rcElKIwBO9YYzG8g9yWbe+QULzV1a/6xqZseaUl5Kx3lUu3aGLn91IE+yU/x7T5WZEJXWHKTjwiPjTqEJyZewcN7Tdo0bMdXJvCKMsRZd6xPKk4rqlf/F8IlUC1XtiFXVIJiVU/cCrm9VvDyash2+ptzSwg9hHn0kKShfE+0cPzvBM0RZdMivu0FfRIRU0/7lTdWMbl+ZkcA2+KfIIZMYt3M8knC9anYF7FWHZg2ftclSKFI8XepuqM4lBTj34iNUKfPoIF1mBQ8If8DfFe0kL/Py7O1F+7UxohpjZUXuUxbn1OivENN2qXOS9pxUi66YVFrcP9NbmuRvuS/N/gKlFbfB1sdZygT8osv7fXnWJenFLLL4GgpgKX03aavVnQ9Ud89KB6wTfDUXiuhbc5sy3df+KprV6uY5H9oRx1ll4hQdgMJ0hsbl5bWBjwQNmskKNlUEWDTz+mtkqg7Cx5az09HZMorzSyjeE/fMqaWLxte4/9Y9uNWZRTExTfnL4p7BMzyia8pdaLKFxgmE1rkw0wj4PMLWudovjIepFcMBA0uxdC5/U6f5w8kpvG32VQcVUPDITq0zssgx2/fw7b93B0890WNSvlpPAZcN5qmhuGc8L5mqDdy+S6UG4MzbBwONMYPdIn8hkzV/bc2GRK6nmdgmtVmAM5AUkCJeMTGns2rnEkIdDTiMcvM/Ih+UneN2ak8jvxjxf9hHTg9ssSIYVzfDUyXyqwwj7jl3k23GjJwr+UNlHfTht3lROBiwTHQ0Fve6snYawfMyYP8eexm5MvNUS7qCOpiqdT+G4zXG+oSvUxX88T/B9iRsCvSi6rbJbdyKnM6Nct0ES+IjvKDVDz7QxGyUOm8b4d8J8dXww4Bc0VAYY6Y0cf2xuU33hyH4BBj/EHpUd2m0EeSobRYhwEV9uXf3NXF33jB2YFyC9sCQRZ85M7g8n3Z5/+yHex9bSMC4HkYhbYv7/m8gcaraQAyEhoMdRCY0sCznhcUkITmPdCQGRwmmemTgqrP968TIk2afagW0YpR2s+yUgJvId+bO3HMu4EcURPvRFXtXI3FqWqZXviOxm3WxkLOybOOjIt4RUO2X+YnXJeBOGCamodmrQ086mpNkSSpm3a0UfOGemE2uZhaQfn+R3tD/VyuJ4V/9J9BjdDtqpm5SzC6hqhjR5ydaWGNkvslmkCirr/uBo6Ap6RvO/dwgXaFpnG6RPoxfyADM0DFGdyXIl/euh46ZGDD9c2rsbz93Ye4GAOvh+3gJUydPVHC/luwpHs3jAR6ihPlmSDbmuAF12GZs1eOJ2jfCJoQE++2hB31CfxVe/jVDczW+3GLJBez1m4FEXYmo22LoPXG9OEipj0CbvzZs58m7ClnqrmwWDcmlkQvZhZFTGfqK8SVFYKFMfa5CGpaDI6y6YXNFsgnnEzFha1apxfUEU5QJz5CbewQNYn73hng26Fh0iYZI5nbxeB6somWnpbRD0cpmcvL0uAamaNJ51v+k+dEnySoChQEw7SL3kJMKWhWd2UvUpRCwhbcyqp5PXvdHa+Dh8b0f/d7PeteixpzU5lE6+IBAKyHczhkZEzWdU7Nlh6tKT8Yn5+VUHQfJoTCPWm/6DJChpuxn+5A0B5UDweDTh34IUOvmPNwAUCZwxCItOF/1Bf75hFon7E257NAeu5n4dmI/nVH/yVWQ1FTDGF1KXPWQTsruaGSX+dIS3W61GB2b7KgQRN2/ayMi8YHe0kjj94Y1XHKuIhcrN8PSGoYvs7BDzdY9TUBcpNKmUYH3uQZ9NEMRqp4BhYZRWa45cb2ZLLABLpGh+19HoEWHWhDJIGBNlmuwwOZ+EfReKyCxLOXc2+H8cUXZR6TJKIYC9oKxkqkAgAtTzsU2K4wN7/pxAwAR5reJQ1GFnLhK8wdQs2nYWIL5w1dXKLtHNTazPlXMyO6L7SPTCUAB/g/kE75mCPJ8HDCt0i7zeaUhOhNN0mumOV1qT4jK+arFChQvIoCr8vfIeXKC0WcS2E3xUsBd1VXmh3gn5CVjO6LXmr+risP6NAu9WnULbKSkTFmmAYGHzSuQJGjut6EyL6yk9q6rtv9s+01X1ltKryyNIAqnw/TeDvCaeG63dsUzVX+Rgq0vRrZcle5JedTjXBuw/O0PxsPEh8Lz10fNzeRReb7GHRigGJ2Ox7akt+7qqG3dVLJluJBfYBwA6lnz/F3mV5qX/YeH1BpgxDuYpsojrDyz2wm6aYMoN5VFqmPM7zKtut3EV9voxUfWSozkakAh6w4cfkJUF1hC1M90kga0Z55pmAv6Z2cjn7Ug4fYhY3DdqWmJqhU/bw6rDgyzf83qHTfK14NOD+06qwY6TrNeSDrVi1z1Er80mFXWWFqQDuguTYXqCEL7n1iYxE/3vwiv8iWo7Cg/XTmGg5nJsGh3G9dErmZiiz+Bkt7YF1W2TaIC1Ug5LLdbK5YU0dqQsWXcwalVIswPJ5OA0oNvacDbWg0EZttRN4++u2VBg5uNY6MWBcHo0qb5lfhcVEmPGIK9hx2Yqww170cdS5ETOcadnddKKYkazhjSLvCWdQPqE/IfeunjCuiuUj6ecw+0SZr48WVw+YJsG0nTWzcjY3fhz3kPpQVK7jf6eBNNsNxkW9tZmo9uFkTR2sI6cKdQJMYSbMaznSzl80oTQnpX4se9WHJk363Bdgg8LlVn5DgIUNWVrHq+JSv9B207sG2MyhQpjwo6g2xgh3PUO2/vwFz20wsufM3VFL/9gc3tDDD8ad0H6E7SRPIt3cjKOXEzL6CnJFgs7OQGV8s6oCFCpjtakgNcxZ+8N2monqTwW8E4NvSqTU4eFagA/P948W74bCuVpf0F0y5tX+gj6ej/ydb4q+1ccQBmZfPajsKU04pVYgBKAxkPrLDxy9CR/kkkx5qHbg7uxibI8LD/zaqUlgL6BxFEqB8DsMkQRkKNPMZ0iNZAYd67KVAP8XwgGHdsFpOcaUq7BoZqnIzNTRzhjjOHAYze7xQ2yC6vgg0NwBEcJ6eGuu8FxITkw8u9cduJWfITndZap4F+fMF+B00dUpvtuYOLKURc381O7ZI+4y/tzZpD4sno4xCmksJcWThc4C80BRh/UwVFitPbW8Fgy/RrLfjerp6vIoio0pZc/KY+U9WKeH1P1WI0raignXcNHPkAEowTilru0E3jHygjVcp4B7pmUTSgiaZcC3n3apKINWwsUn/e4+DLWZfZ4lVfufdhKsnTCwZjQA7AMnG5hAmZ67eUBvt1cAmW7Quu2Mg49p/gZkZqrnQ3rzau7/PTBJKbZ1EN2L3WANLC92ZjCTWfNgpZSNRXWVQCMLSl/1LnQyFdua0ob2ecpGNQgkJbbbgjci+WKYkBt4uo1BM/OAnGBkyEN4ayLq6URrNvW8yqvBIMApRupstmsmOQfZDiDdKJaaXKiJA8THDaNIU0jjdYs8Wov1gqiPDofL9MeXKlNr/j4zUNuklBpac4TRUk8RxiGMWf+J0tZwROPEZPS8+M1BGsO8S3BSYeZcbtAQM31YxRuWBs94/Q/PZH3Fixi2nfYDwp57JMNmtNSJFJAhsys8MJY40InMWAvhxDuBAHqn3Pr3h+UhNn9oNYERtnaMXOPe5GrmdBXAeSZadXsdN3/fNIeahbTSGvR4xE7+oXdB24xEu1NykN2iih/Hphe3B47Ekda9F9kOZee6WhS/dTLhJhkEFoUehS99atTDdFhBSOd2UJcJhQvnsMc+8pq9MSbQMuHb8xHlUA5T3MQBuD4hBDC6ttSin7qosq81hX82h0ITcxL9sYKVbOM1/ZWICvxpBCdTSCEmsxi0L4KZsm5ULqHeu4X1rCVakxgwt8gw+zTObmsgkVNLrlKkfdAMUDwDHyXh2uw/vJCg+n4TTVlpyBbNNrFUJ+ssZzb3OVFhyW5j2g8YBBv4beJasXCBzull0ORKYgnSPVEBqqh4QVndoJegh+rrKzrdng5zm+xG21aRysMUum5mucZPh7JLpo2wYdyx5nurOeV5AoGUJo9T/5fRuonxmudPlyrH9SXJsV5xwQFMMv6fO2KGi21B4M4Zo0ZtBfrSqI+Old0EabPNBGGbe/0ReE+127o0SRc/jCAl60bFdvdBqQscjAeUG59KdgDmxJQF1u8E3TjipAk2l/dz42SttP4xB8RC9/cBNoyxRNshSvpsQnQK7on2ZkAXswY9mjojiEIipr4P3TREASG1MxR1fwXUXY/km9O/QzlHz0CbbvLFFsbRWyK9XiqhcugPHs4+J16R3k5H4vvqFYn32PyHhKC8F1BAA1OHCYbMrzRx48fLROkQjaKcL1bEswijq+kOHty3h6O0OXH1Act2FffMhJNpryHhtWniaBWY/RfCmcf1ZLArN56KodvmpI8n19BpxasDwy0r6ybdYtLTn74VQmlF4hA8/lPyux5G508j5JRE8J4feQfK9zFAFi28nDMJoJsxNDHSG6QXcjHYvt11CiwTAgKq8xfYfqA59HMWELAlIghr7Mqp+y7JN8aldoF0nQ2Sf++fWtTZT20WP+yqBnzC9LRyKcdwjR5cfbOWcoyCX2240T5RsHGD8OBRliDquQgEJT3LNZO4V1AI3jwA5OR4gi1cCVgYh8fypVGUA1LoCJ9OPaftWZUL0f9PedhtiW/N6fBog/WzrIxnPd1xqul6A+tyj6i8XTIJxY0uoBPn8NejzXf6q9WJUsctk08pWX4X/dJ4VV5q0R9yoeHrPSaPz4Tgn+5Zlclz54L3CwyDvYAvGEZCIIyvyKDy9PPPgDYtwu7HS4D8Sd/H2x8kPVdu7AD169C0/VFDBY/a02QBbGXNpGcIWV7mtj73UXjOdl21kFvzBuDpm3aWg1Si22HZtnPGPRa6TxkwvmOcR7C8tDu0OjJF2QZe/47rBQhUJaBKUEpTjGfVs9yWlszq60zI9gbP5YSP7bA5T72cJAaqPb/McfLc4koSC3yXVwrRuMsJPYvW1ReNiQaaS4XDsHTazlfS61DXeRIYTAFQeuADvlqrFxbFHxBlhS0ewAq1fhzJbp7X48OhK0qwCsUTLyfREaTFsQiky7mGN4/lQ66wz+ca/UwETp8LJQTaKIKbvKM21HV4bJPU0DeOgy0tpKSeGmMnfmsVGyG05n9dbEqHRV6BovpkTIV/XxdH0ZxdqqYcVXr764+l+VjWKANJZTENhMNY3ZclqAoxsH6RWGeXno3xvt77oMmkUFtdQcaU86MjihKfOqgTdf6Z5CNU7/a5zxZqPXh6wYxYbvTDimeNk987+uZdQiq7D2UQHDJDEuXuzV/9G7J8y5BVSsWUTXzV1rK1fUJF51C5Az4vikUHxyPq2fai/nfI0LrksfRUUtL/4kXZ7jR5Yn9pGzVCoOWiPguF65f1DTlF1jbMRAW+OZmN6pPeR4NZePhPlVEdK4kZFzkfuNfPgiCFJubKJvEuISZFPBlNxaXeZnEBqq3Rqlcxj6EyS9dJ29TqKTbYR4jzRDewvi25xkhxiGpo1fvQWqDgJmMBzI0EL9iF2SFqXJrrDOIsFJx4HXa8ayPZlo3vpbohGKomBnNKyefD9a0hUQMl6T9IpQUwU6fms93QHL3iR5VLISaHM8I1FHfFwXkTJo0XL/CKNIkWUra1kVj7pGB9+KbKUFynwLegf4l8egaTNCE0y46j0w/ZqJF46zcecy79kN8GNdQtMLCOloXi3rJ4TnsyJUierKFUz0Lce17T72Xct73K2bBE5j95H6cp0ofMfmJA6BJbgA0NAyme+PANlkPlZQRrEPf2QLxZ6LDvAZgK41u5RpU3/DiH9/oMOtYHi602R8RdZAR4ggbDBKB4wZxxjHC3/G2laucuwWKS/cDHVl6zBEK0Ilq7VO5kGmnCb5EqMUXV0eZUN9KNgetDtVQRTSXIW0AfD72VjzoFEmsxQdY0ExB1KDg1Bv2+7olQP0fBgMBLHVGrHbse26HoqhVtdEO2D8RSYP78JanPjMhcxb7GZB7g8M9RQc5I4w/NrLDMGjosdjPRQuW/KhXKfoTWttHuCjo1qfEVBqFl9JuZhru2wn6ikaIA5bMt0p5QPP3HpwUupdeGkAMzRiNvJSPu+IZLZzO6jYzn9aES1yBf87EWfVFK0eJFEfhtyVIBwyxJee5TXkbwL8hegygdyfXs5NOx64Q18s9qkeEhO+pWi3xqIE9frQe649d2w3Gh0jGg6rhVBj3TvFZmjaUP6exUTycXS74+FipKrANUZbYbwoDiuWLndxPWIZKdZOL8gaPMfIQcvI7S6JRz+JMF3ix4HS/0srlWLu9vz0yUvp8k5Cmn0np8Kqq+/FLFkqTxtw62t5a19EjaA9KFT0n7wH5+0ZkHvTe+95dCyV4gxrQuzoPdh31uGjFkE6IYjeelJ55xGuH6jO+T5erhi7UsyMeyi37qbv6eKY3VAKwILjyShoOkK7MIZBFsQLq5umaCpRVmDQf6d7WR6D0WmSYRB+wSavpbP3CF5mpl9QB/S3feebhwvGtU4ucBQhopGOzxQDMWYoXR+oqpsbdN6B3UI1+OoGnM/+FfrF93nRrGeetbN3RRPtB5LKvS/BiJ21uMV0CK2D6yLyPvrweRjnmwpiaYn5DPFCHG39+Fz3dcn1Rr0ag2l/b4JR3nE1el3UbmwN8O4iVjSlCvAzPGaClFwnnjXWmmm9Sr5ALAjBz2LYVbcWbPlMAbKUtNY+MhcYJ7rgqyJDoZi0J4j14RaZnkO+JIgkKPqvZT4ntaQR8bMPCeH51h+UnhclKgAhiXytud8xbvfEReIr9mBz6v4K2itd3thgBHhhcek0yUKvBgxfNaTHuaenFnNG9FTvBAu5Vez3wJaG4ov7zV3ePTaovwCZOkVCzqcf9tTVA+CUNYngw/2pcnpi75HyiUksIQjHgvPH29dq8+mRnZjZgzPHINt6+T1BClPqdri6UtVe4hNcg6rnpy/vs8PGpuIKyegdYOKGSlkwojlmerazZRin7NRMUxlsMh+wZUsKO7WUlRhjDJI15GV4YptxSDhdPXrvmR77BHOCNvfr3t6gWGtBNu3PdsqfdXBehcRb7zBNcafbkKZ7ytNT2YDQ2dCkr+3HEgpq+OL+l8TgELZJ3A7k4OhU4ozHBjcDpyx0ZGNXFF+bU3hzrM+RCDruB2s2CeQ4uxhVpDBNV61sfHTMwaed8/5RnwIqMxnWpQ5EJkyMW1xrwAvoyLS7QxGQyZ9IxbElqKjv+hKkSE7bmIPlMfp7fqrxLqfxcXYbizsQhJuRKre/F6LGiulSO4Xq3sRmm2WeYRG/U/2BxFXbSw8NgtbDnYgqZen9Fmh/MFnkiDK8QM0Eg0Yjw6a5EPV+00hTDf/6YKZr08XkbhbtDMtzKjBfOU8Y/EWZG4Yen/RXM+085FjJaLR2LOqe+tUzV2RuVPViIMdMJCZ0KlCkykZNPtx66/KaaVYZv96vyZbGMDpZYerwtIub9nLNaISOt6uXRFGCud/0f2zmBcqnE2JgkeSqG9RK8IugAfhVy3Rg8sNPKo7ORjQrroM7vpl2MQMrGsC+9aXuFuAM3Q6vRp2oqML7KHBT8EbC1JLJ+PfwE9Luf5vASUZx4NpbfLMkTZZ6eyVkjXbplN7SGldcF/C+0e8XjZHv/KL5Pa3e/Y+2DkhKZVRVErcZDMbXG13w109k4r67/uShNJj2s4hxz+UnLnxtZj4hM5NqF3Gx/jqmSgeX/+ZDpXmTNwlTdkuEXw7iG3lEPOw19KDJPlJZD2gMihz4C5v9NdUoXoNuIh+Hf4gK2K39hj/eL349G+yXtgsNAq+c4iuABJjjHes1ou4WpbrT/5vJunL3pySaOV+bnag7kJEQiGPO1jdZ2ehmbYtyuKFrRurfYRB7Vy9izsDyt8+2UxpXtcPPi00LZz22FUjds81B89FICz6qJ0YyTdPNZ+wEdRhEJAAD9ZkVDHe8VW0mtDu3vWQ8Ush+eIOi1O9a4r5F4/GdZov0hlVM/PbyTWmoVgWWCwg6bhW1DRHS8ie35dUnuBFEz+nIKxKvZrpgqlx+3obzRUCktzpUxznJTC1E6U6igAywGlBQXvWqphEOzSC8NaKOvGStddZI2CD9GVTEB4MxyYvMN4czZRyzfgNut8eK90ZxBC9Whbbq5kj8MdhNdQ4/DVHGxNKQp3W8dVc/359lKvEvSAFDsyCiZJIBccLUGHRRzhAeceRTAiKzvzfA/NoH64z9ppyohFwlnTFRJTVvBZZwhrbZOsFIVtDoum8SWQ7bbGuTpqOUki4IayYMeBhP9JESky+6qOXZJ3krcw/JD8rWx2plZNX+sb+VMotwsD5fpLxLe2m3+A5gIJnL5xyVnYDUmqObs7wqrn98ukjjzkVR1NfbdAscmxm41gm78/qBIRRBWeegGfc358GKqfJAxjgkBmiQoupf/+Sv/iFNBaRVoLxdPyoK6fQTm8k8xqTuiJmV3/vP0zAlj+Blx8YFJul1TfZheOruB775AoKc8A7Zmsrv3mKruqskiQx0G1nwGoSZ2p4+28oVx4+ZQQcl4x7sfojzPc3xWb7futpQsDadVdbzUrJYdgY6cYnrO0pH2e9hdOqsx03eOHk1b9P774P9HiWy+qSgXY6WgBFUejQ9oJDCEK4DVhWt4DFweK4G2fFnV/2LExVytEr56nox4p4vgZKDtOoCu6U2DNuqI5673UBUpVmhuxNEwmfp0aZzTJ2ZPp9A49bSopP8nU79KkD7UzFN4f+hw1VZNnm2dwpb63I7jl/JRayh8xKS/yW51ExGGlPlbgMWpzcHbwKW/sUFN5C1PjN5cFejq3zU2sTw8A3ptwbyWZqGUPh/mptNDleTEeB5p4xsI8lyKM1l8QqkRarQe1NaOv1toBuwwHwIOLLdgb+hFzlYKarEsACyg1nk2LUjWyMXmgZ2yap7A9ChFPd1tCt/+gz7PNK260A5nda5nljEYwiL/q7gJ3eQFrMvghD4DiNhZom8n5S7Xw6ujRKv/6fuKyxVvhvtKd2kUQGC2uOxM5flI3IYNBNfUZVci9kVOxSWoX3TmPfC1pHuin8+Q4LWRZ9DWbsYH0uSiPngdnl4oVM08iwXn89hTZCfgg60p25Bl0bSSYetPAXWJnpfKhwTupBAdZX6PdP/s+vlneUwU/d714uEQ+EkS6kklqWwZNMU/VXwhOlEZDgVMlXM4IIIwAGizRX5XZoEf3M18twkLsEpFRNEYo7esVF3rq4zon4stNv0Tq3fhnBl+CpV8JoMU2pRMK5Ehq6zH4jglU56oikJStiy9dYyQJ8zT5X6iNhYhlM/Vjkans4nMAvYmUMa1SYYqzK5SZuKqsfTd8xIEV9BcgLgs1P3+qlxlM8bX+YLkmFfZUVNXEOWmy1IyGIne0GUcBVtd2bzeDIzcDAiG+HEUT/FX0nLddkhKbq3Y4bfBsOjAiL97b8tjIA2S9ILwWdVAt3J321YGSUzpYnW6OXW9rs3IcxaIcReV9utXNsNYJOQmNXfNhVWQZLtmmTHiuGmuGKOFXQPNx19x0iEBr7GDD2jEtdFn8XFBuaFWfAhWYD2fPRj39ugmX1dI7LomtiBlj+vumP9XLNiBTu7Lj1Z54rqUVb0i+6Kf1PfyAiDVevIMbbigu/fut89ZfACi3jPOvxdpXsAnnFRfbORDJoNB3sR62jsVxIiR0yqRa9OdAohO35vHkQfoqvFlMB7Ii3mUaDIZuneyGrn/vmL4DcUDPYulGc9SvSEVj8cL1jzRx3aRPOAon02i0x61yculnBBmQs/3wROjZ2CqUSDbJSjKcKXb1jTfev1Q2add34UZ1M+tG8jlRUh+W8t1LRfw2TX/I0pZcs8wJmd665SaQeWnF8fII/ZtTeqipa+Db8/UXbVUwwrSBe/mwXUhfJ8m9L5T4H/RpXs45aHQFg9Vx0M2gV02J6nlYyLJpLdM+dhLLucmzHMx5t5qvAEJo/dRmwPwJAu8wWCCnpX2+o3rk03EI47hY1BbdFFzMU9lfIW2mCc8ZKK6umkXMBfQvPdO9XV5OUlnYnXh/seAzIx5uge/5XxpQRzFaKo4FbH/gWrvK2gkhx/Or5x96+6SU7Hs0KYs8pD3OeC0ikmDks2hdFSlpc7qJm3NnAyIzHYEOxk9+zMgLiFFN1foobfgJr5cP7HoW894FtGgP1Yxu2k7fbPSmDZ/mayycWwS8Bq08Cy+0zdhg6BGowMU+gACdreOgAHGbI6Wr60sL70iP0Vdc371gPxB4M2+sD2Du4iPM84xBmsgCOXA0HGcxSNda/OBuWZ3JhcydNvmQvPrAngb9CxXwvC+Ld7ZhXUx1RDfqFHhU/fi44HR5mDo72JDwUAcYhlh5uCR/9Vhr1Unfrzda+t++84uUcgnT19kt0zdZjAhm9tVS9YRUYo6t4jbKbkRZi/zvrfTd1ix7BPz5p7WO8XG4P7ByA1Knuu0uYGY7Zwe83X7elNZw/t20fTR1VUGu6IAUeZ3JlrHxq5ukiq4drM7BYOmoVRbAQScieTff78WyOLzO5XKJ65IiyjuEC3jmv0bF7RxiOi7mWbsxuTHr8aIRC+bRCzX6wZHPpA3mGoRQpkVJW9fAz1cBq1Q3kh2YLNfGld27U0uRRX8C8fylTFRet85QANPT0pxjuo6kIoK3PwZO3eIATaCrmCVqiKpVpEdCkz99ph7XeGrVnxNpumYQnql+dxJwkEe/vsmzx2nlKBnlAQ/BcS3l7yT93u0+LVDWOaGTaDAzyRAcOEniFExcJ3aMHpwHIH9zSvTMULq5qghS53oLG9cwgumRTj8chiBdNN1vkzfpCKB0lJ6SdjyxjZpEsTAGr4+PfBj+KwNl7bRlhoIgcXfP2vo4XLVgkVTwCvJRq5BMA1IPNIpLcMrm97BRmtiM1qmE+GHgc9qC8jOTjRSdQPi3fa5rT9VyQpZOPZ3xvU5INpZf8NCiO4+ClCLR1fAUhn11HCUsYYSmi5oFyCqELQqD4tiVFzOJI4QTt7xY+huAA" alt="Entretien de toiture" />
              </div>
              <div className="card-content">
                <h3>Entretien de toiture</h3>
                <p>Nous entretenons, traitons et nettoyons vos toitures.</p>
                <a href="/services/entretien" className="card-button">Voir le détail</a>
              </div>
            </div>
          </div>
          
          <div className="services-footer fade-in-on-scroll">
            <div className="footer-cta">
              <a href="/contact" className="cta-button">
                <span className="calendar-icon">📅</span>
                PREVOIR UN RDV
              </a>
            </div>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="phone-icon">📞</span>
                <span>04 20 98 39 17</span>
              </div>
              <div className="contact-item">
                <span className="clock-icon">🕐</span>
                <span>Lundi - Samedi | 7h00 - 20h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Les étapes pour la réparation ou rénovation</h2>
          </div>
          <div className="process-grid">
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="step-number">01</div>
              <h3>Prise de contact & Devis</h3>
              <p>
                Contactez-nous pour un rendez-vous. Nous établissons un devis détaillé 
                et gratuit selon vos besoins et votre budget.
              </p>
            </div>
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="step-number">02</div>
              <h3>Planification & Préparation</h3>
              <p>
                Planification minutieuse du chantier, commande des matériaux 
                et préparation de l'intervention dans les meilleures conditions.
              </p>
            </div>
            <div className="process-step fade-in-on-scroll" style={{animationDelay: '0.5s'}}>
              <div className="step-number">03</div>
              <h3>Réalisation & Suivi</h3>
              <p>
                Exécution des travaux avec professionnalisme, suivi régulier 
                et validation finale avec le client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos clients témoignent</h2>
            <p className="section-subtitle">Découvrez ce que nos clients disent de nos services</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
              
              
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Excellent travail de rénovation de notre toiture. L'équipe a été professionnelle 
                  et le résultat est parfait. Je recommande vivement !"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>M</span>
                  </div>
                  <div className="author-info">
                    <h4>Marie Dubois</h4>
                    <span>Valence, Drôme</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.2s'}}>
             
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Installation de gouttières impeccable. Prix compétitifs et travail soigné. 
                  L'équipe respecte les délais et la propreté du chantier."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>P</span>
                  </div>
                  <div className="author-info">
                    <h4>Pierre Martin</h4>
                    <span>Annonay, Ardèche</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
              
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Intervention rapide pour une fuite de toiture. L'équipe est venue 
                  le jour même et a résolu le problème efficacement. Très satisfait !"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>S</span>
                  </div>
                  <div className="author-info">
                    <h4>Sophie Bernard</h4>
                    <span>Romans-sur-Isère, Drôme</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.4s'}}>
              
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Isolation de nos combles parfaite. Économies d'énergie visibles 
                  dès le premier hiver. Devis respecté et travail de qualité."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>L</span>
                  </div>
                  <div className="author-info">
                    <h4>Laurent Moreau</h4>
                    <span>Privas, Ardèche</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.5s'}}>
              
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Nettoyage professionnel de notre toiture. Élimination complète 
                  des mousses et lichens. Résultat impeccable et durable."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>C</span>
                  </div>
                  <div className="author-info">
                    <h4>Claire Durand</h4>
                    <span>Bourg-lès-Valence, Drôme</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in-on-scroll" style={{animationDelay: '0.6s'}}>
             
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <p className="testimonial-text">
                  "Installation de velux dans nos combles. Travail soigné et 
                  finitions parfaites. Notre espace est maintenant lumineux !"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>J</span>
                  </div>
                  <div className="author-info">
                    <h4>Jean Petit</h4>
                    <span>Tournon-sur-Rhône, Ardèche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonials-stats fade-in-on-scroll" style={{animationDelay: '0.7s'}}>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Clients Satisfaits</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Note Moyenne</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Années d'Expérience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Garantie Décennale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionalism Section */}
      <section className="professionalism-section section">
        <div className="container">
          <div className="professionalism-grid">
            <div className="professionalism-content fade-in-on-scroll">
              <h2 className="section-title">Nous apportons du professionnalisme</h2>
              <p className="section-description">
                Notre expertise et notre engagement envers la qualité font de nous 
                votre partenaire de confiance pour tous vos projets de toiture.
              </p>
              <div className="professionalism-features">
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-text">
                    <h4>Réactivité</h4>
                    <p>Intervention rapide sous 24h</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📋</div>
                  <div className="feature-text">
                    <h4>Devis Gratuit</h4>
                    <p>Estimation détaillée sans engagement</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏗️</div>
                  <div className="feature-text">
                    <h4>Qualité des Matériaux</h4>
                    <p>Matériaux premium garantis</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">👨‍🔧</div>
                  <div className="feature-text">
                    <h4>Expertise</h4>
                    <p>Plus de 15 ans d'expérience</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📏</div>
                  <div className="feature-text">
                    <h4>Respect des Normes</h4>
                    <p>Conformité aux standards</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">😊</div>
                  <div className="feature-text">
                    <h4>Satisfaction Client</h4>
                    <p>Garantie de satisfaction</p>
                  </div>
                </div>
              </div>
              <a href="/contact" className="cta-button">DEMANDER UN DEVIS</a>
            </div>
            <div className="professionalism-visual fade-in-on-scroll">
              <div className="house-graphic">
                <div className="house-icon">🏠</div>
                <div className="house-features">
                  {['Réactivité', 'Devis Gratuit', 'Qualité', 'Expertise', 'Normes', 'Satisfaction'].map((feature, index) => (
                    <div key={index} className="house-feature" style={{animationDelay: `${index * 0.1}s`}}>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Travailleur professionnel" 
                className="worker-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos réalisations</h2>
            <p className="section-subtitle">Découvrez nos derniers projets de couverture et zinguerie</p>
          </div>
          <div className="gallery-grid grid grid-4">
            {gallery.slice(0, 8).map((item, index) => (
              <GalleryItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container fade-in-on-scroll">
              <h2 className="section-title">Contactez-nous</h2>
              <form className="contact-form">
                <div className="form-row">

              
                  <div className="form-group">
                    <label className="form-label">Nom complet</label>
                    <input type="text" className="form-input" placeholder="Votre nom" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input type="tel" className="form-input" placeholder="06 03 71 39 94" />
                </div>
                <div className="form-group">
                  <label className="form-label">Sujet</label>
                  <select className="form-select">
                    <option>Devis gratuit</option>
                    <option>Réparation</option>
                    <option>Installation</option>
                    <option>Entretien</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Décrivez votre message..."></textarea>
                </div>
                <button type="submit" className="form-button">
                  ENVOYER
                </button>
              </form>
            </div>
            <div className="contact-image fade-in-on-scroll">
              <img 
                src="https://th.bing.com/th/id/R.591d0109c6706ff76e40d17adec6d22a?rik=A1h35rJ6%2fVHVRw&pid=ImgRaw&r=0" 
                alt="Contact" 
                className="contact-visual-small"
                style={{
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transform: 'rotate(-5deg)',
                  margin: '20px auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos dernières publications</h2>
            <p className="section-subtitle">Conseils et actualités du secteur de la couverture</p>
          </div>
          <div className="blog-grid grid grid-3">
            {[1, 2, 3].map((post, index) => (
              <div key={post} className="blog-card card fade-in-on-scroll" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="blog-image">
                  <img 
                    src={`https://images.unsplash.com/photo-${1581578731548 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                    alt={`Article ${post}`} 
                  />
                </div>
                <div className="card-content">
                  <h3>Conseils pour l'entretien de votre toiture</h3>
                  <p>Découvrez les bonnes pratiques pour maintenir votre toiture en parfait état...</p>
                  <a href="/blog" className="card-button">Lire la suite</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="cta-bar">
        <div className="container">
          <div className="cta-content">
            <h2>Votre couvreur dans le Rhône</h2>
            <a href="/contact" className="cta-button">DEMANDER UN DEVIS</a>
            <p>Devis gratuit et intervention rapide</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
