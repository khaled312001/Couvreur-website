import React, { useState, useEffect } from 'react';
import { getServices } from '../api/services';
import { getGallery } from '../api/gallery';
import { getTestimonials } from '../api/testimonials';
import ServiceCard from '../components/ServiceCard';
import GalleryItem from '../components/GalleryItem';
import Testimonial from '../components/Testimonial';

const Home = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, galleryData, testimonialsData] = await Promise.all([
          getServices(),
          getGallery(),
          getTestimonials()
        ]);
        setServices(servicesData);
        setGallery(galleryData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  // Hero slides data with different images
  const heroSlides = [     
    {
      id: 1,
      image: 'https://th.bing.com/th/id/OIP.D2pE_dpnerxSFd8p46aA_wHaEM?w=251&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
      title: 'BN BÂTIMENT : Charpente Couverture Zinguerie',
      subtitle: 'Lyon (69) - Saint-Étienne (42) - Valence (26)',
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
                  BN BÂTIMENT vous accompagne dans tous vos projets de toiture dans la région de Lyon. 
                  Nous vous proposons un accompagnement personnalisé pour vos projets de couverture, avec des devis gratuits 
                  et détaillés, des conseils d'experts, des facilités de paiement et une équipe réactive pour vos besoins 
                  de rénovation, désamiantage, nettoyage et étanchéité dans un rayon de 100km autour de Lyon.
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
              Nous proposons de nombreux services répondant chacun aux besoins spécifiques de nos clients en Lyon (69) - Saint-Étienne (42) - Valence (26)
            </p>
          </div>
          <div className="services-grid grid grid-3">
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="service-image">
                <img src="https://th.bing.com/th/id/OIP.byinHvCNLGPMajojSqKM-QHaE8?w=241&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="Rénovation de toiture" />
              </div>
              <div className="card-content">
                <h3>Installation de toiture</h3>
                <p>Nous rénovons et prenons soin de tout type de toiture en Drôme (26) et Ardèche (07)</p>
                <a href="/services/renovation" className="card-button">Voir le détail</a>
              </div>
            </div>
            
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="service-image">
                <img src="https://th.bing.com/th/id/R.3ded85b1ec4807586d07c65ce4b6d743?rik=zl4%2fPqN1ZLKL4w&pid=ImgRaw&r=0" alt="Réparation de toiture" />
              </div>
              <div className="card-content">
                <h3>Réparation des fuites</h3>
                <p>Nous inspectons et réparons tout type de toiture.</p>
                <a href="/services/reparation" className="card-button">Voir le détail</a>
              </div>
            </div>
            
            <div className="service-card card fade-in-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="service-image">
                <img src="https://tse2.mm.bing.net/th/id/OIP.4v_TRfVxL_mOwlGPbXIQNQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" />
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
            {Array.isArray(gallery) && gallery.slice(0, 8).map((item, index) => (
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
                  <input type="tel" className="form-input" placeholder="07 80 32 64 27" />
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
