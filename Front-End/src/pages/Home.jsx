import React, { useState, useEffect } from 'react';
import { getServices } from '../api/services';
import { getGallery } from '../api/gallery';
import { getTestimonials } from '../api/testimonials';
import { fetchBlogPosts } from '../api/blog';
import { chatApi } from '../api/chat';
import ServiceCard from '../components/ServiceCard';
import GalleryItem from '../components/GalleryItem';
import Testimonial from '../components/Testimonial';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [contactFormLoading, setContactFormLoading] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);
  const [contactFormError, setContactFormError] = useState('');
  const [contactFormServices, setContactFormServices] = useState([]);
  const [loadingContactServices, setLoadingContactServices] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [servicesData, galleryData, testimonialsData, blogData] = await Promise.all([
          getServices(),
          getGallery(),
          getTestimonials(),
          fetchBlogPosts()
        ]);
        setServices(servicesData);
        setGallery(galleryData);
        setTestimonials(testimonialsData);
        setBlogPosts(blogData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Load services for contact form
  useEffect(() => {
    const loadContactServices = async () => {
      try {
        setLoadingContactServices(true);
        const servicesData = await getServices();
        setContactFormServices(servicesData);
      } catch (err) {
        console.error('Error fetching contact services:', err);
        // Fallback to default services if API fails
        setContactFormServices([
          { id: 1, title: "Installation", slug: "installation" },
          { id: 2, title: "Réparation", slug: "reparation" },
          { id: 3, title: "Entretien", slug: "entretien" },
          { id: 4, title: "Isolation", slug: "isolation" },
          { id: 5, title: "Charpente", slug: "charpente" },
          { id: 6, title: "Zinguerie", slug: "zinguerie" }
        ]);
      } finally {
        setLoadingContactServices(false);
      }
    };

    loadContactServices();
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

  // Contact form handlers
  const handleContactFormChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setContactFormLoading(true);
    setContactFormError('');

    try {
      await chatApi.createSession(contactFormData);
      setContactFormSuccess(true);
      setContactFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setContactFormError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setContactFormLoading(false);
    }
  };

  // Carousel functions
  const scrollCarouselLeft = () => {
    const carousel = document.getElementById('blogCarousel');
    if (carousel) {
      carousel.scrollBy({
        left: -carousel.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollCarouselRight = () => {
    const carousel = document.getElementById('blogCarousel');
    if (carousel) {
      carousel.scrollBy({
        left: carousel.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

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
                    <AnimatedSection animationType="fade-in-left" className="slide-title">
                      {slide.title}
                    </AnimatedSection>
                    <AnimatedSection animationType="fade-in-right" className="slide-subtitle" delay={0.2}>
                      {slide.subtitle}
                    </AnimatedSection>
                    <AnimatedSection animationType="slide-up-bounce" className="slide-description" delay={0.4}>
                      {slide.description}
                    </AnimatedSection>
                    <AnimatedSection animationType="scale-in" className="slide-buttons" delay={0.6}>
                      <a href="/contact" className="hero-btn primary">{slide.cta}</a>
                      <a href="/services" className="hero-btn secondary">NOS SERVICES</a>
                    </AnimatedSection>
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
            <AnimatedSection animationType="fade-in-left" className="about-content">
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
            </AnimatedSection>
            <AnimatedSection animationType="fade-in-right" className="about-visual" delay={0.2}>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Online Presence Section */}
      <section className="online-presence-section">
        <div className="container">
          <div className="presence-content">
            <AnimatedSection animationType="slide-up-bounce" className="presence-header">
              <h2 className="presence-title">Trouvez-nous sur :</h2>
            </AnimatedSection>
            <div className="presence-cards">
              <AnimatedSection animationType="scale-in" className="presence-card" delay={0.1}>
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
              </AnimatedSection>
              
              <AnimatedSection animationType="scale-in" className="presence-card" delay={0.2}>
                <div className="card-logo">
                  <div className="figaro-logo">
                    <span className="figaro-text">LE FIGARO</span>
                    <span className="figaro-emploi">emploi</span>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Figaro Entreprise</div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animationType="scale-in" className="presence-card" delay={0.3}>
                <div className="card-logo">
                  <div className="societe-logo">
                    <span className="societe-text">Societe</span>
                    <div className="societe-dot">i</div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Société.com</div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animationType="scale-in" className="presence-card" delay={0.4}>
                <div className="card-logo">
                  <div className="mappy-logo">
                    <span className="mappy-text">mappy</span>
                    <div className="mappy-dot"></div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="card-subtitle">Mappy</div>
                </div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animationType="slide-up-bounce" className="reviews-widget" delay={0.5}>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-grid">
            <AnimatedSection animationType="fade-in-left" className="about-content">
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
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.1}>
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
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.2}>
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
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.3}>
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
                </AnimatedSection>
                
                <AnimatedSection animationType="scale-in" className="about-feature" delay={0.4}>
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
                </AnimatedSection>
              </div>
              
              <a href="/about" className="about-cta">PLUS À PROPOS DE NOUS</a>
            </AnimatedSection>
            
            <AnimatedSection animationType="fade-in-right" className="about-visual" delay={0.2}>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quality and Reliability Section */}
      <section className="quality-section section">
        <div className="container">
          <div className="quality-grid">
            <AnimatedSection animationType="fade-in-left" className="quality-content">
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
            </AnimatedSection>
            <AnimatedSection animationType="fade-in-right" className="quality-image" delay={0.2}>
              <img 
                src="https://th.bing.com/th/id/OIP.D2pE_dpnerxSFd8p46aA_wHaEM?w=251&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
                alt="Travailleur sur toiture" 
                className="worker-image"
              />
              <div className="image-badge">
                <span>10+</span>
                <span>Années d'expérience</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section with Different Images */}
      <section className="services-section section section-gray">
        <div className="container">
          <AnimatedSection animationType="slide-up-bounce" className="section-header">
            <div className="section-badge">
              <div className="badge-square"></div>
              <span>NOS SERVICES</span>
            </div>
            <h2 className="section-title">Découvrez l'ensemble de nos prestations dans le Rhône-Alpes</h2>
            <p className="section-subtitle">
              Nous proposons de nombreux services répondant chacun aux besoins spécifiques de nos clients en Lyon (69) - Saint-Étienne (42) - Valence (26)
            </p>
          </AnimatedSection>
          <div className="services-grid grid grid-3">
            <AnimatedSection animationType="scale-in" className="service-card card" delay={0.1}>
              <div className="service-image">
                <img src="https://th.bing.com/th/id/OIP.byinHvCNLGPMajojSqKM-QHaE8?w=241&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="Rénovation de toiture" />
              </div>
              <div className="card-content">
                <h3>Installation de toiture</h3>
                <p>Nous rénovons et prenons soin de tout type de toiture en Drôme (26) et Ardèche (07)</p>
                <a href="/services/renovation" className="card-button">Voir le détail</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationType="scale-in" className="service-card card" delay={0.2}>
              <div className="service-image">
                <img src="https://th.bing.com/th/id/R.3ded85b1ec4807586d07c65ce4b6d743?rik=zl4%2fPqN1ZLKL4w&pid=ImgRaw&r=0" alt="Réparation de toiture" />
              </div>
              <div className="card-content">
                <h3>Réparation des fuites</h3>
                <p>Nous inspectons et réparons tout type de toiture.</p>
                <a href="/services/reparation" className="card-button">Voir le détail</a>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationType="scale-in" className="service-card card" delay={0.3}>
              <div className="service-image">
                <img src="https://tse2.mm.bing.net/th/id/OIP.4v_TRfVxL_mOwlGPbXIQNQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" />
              </div>
              <div className="card-content">
                <h3>Entretien de toiture</h3>
                <p>Nous entretenons, traitons et nettoyons vos toitures.</p>
                <a href="/services/entretien" className="card-button">Voir le détail</a>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animationType="slide-up-bounce" className="services-footer">
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
          </AnimatedSection>
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
            {loading ? (
              <p>Chargement des avis...</p>
            ) : testimonials.length === 0 ? (
              <p>Aucun avis disponible pour le moment.</p>
            ) : (
              testimonials.map((testimonial, index) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
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
                <div className="stat-number">10+</div>
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
            {loading ? (
              <p>Chargement des galeries...</p>
            ) : gallery.length === 0 ? (
              <p>Aucune galerie disponible pour le moment.</p>
            ) : (
              gallery.slice(0, 8).map((item, index) => (
                <GalleryItem key={item.id} item={item} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container fade-in-on-scroll">
              <h2 className="section-title">Contactez-nous</h2>
              {contactFormSuccess ? (
                <div className="success-message">
                  <span>✅</span>
                  <div>
                    <h4>Message envoyé avec succès!</h4>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nom complet</label>
                      <input 
                        type="text" 
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactFormChange}
                        className="form-input" 
                        placeholder="Votre nom" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactFormChange}
                        className="form-input" 
                        placeholder="votre@email.com" 
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactFormChange}
                      className="form-input" 
                      placeholder="07 80 32 64 27" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service souhaité</label>
                    <select 
                      name="service"
                      value={contactFormData.service}
                      onChange={handleContactFormChange}
                      className="form-select"
                      disabled={loadingContactServices}
                    >
                      <option value="">
                        {loadingContactServices ? "Chargement des services..." : "Sélectionner un service"}
                      </option>
                      {contactFormServices.map((service) => (
                        <option key={service.id} value={service.slug || service.id}>
                          {service.title}
                        </option>
                      ))}
                      <option value="other">Autre service</option>
                    </select>
                    {loadingContactServices && (
                      <div className="loading-indicator">
                        <span className="loading-spinner-small"></span>
                        <span>Chargement des services...</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea 
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactFormChange}
                      className="form-textarea" 
                      placeholder="Décrivez votre message..." 
                      required
                    ></textarea>
                  </div>
                  {contactFormError && (
                    <div style={{
                      color: '#dc2626',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      {contactFormError}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    className="form-button"
                    disabled={contactFormLoading}
                  >
                    {contactFormLoading ? 'ENVOI EN COURS...' : 'ENVOYER'}
                  </button>
                </form>
              )}
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

      {/* Blog Section - Horizontal Scrolling Carousel */}
      <section className="blog-carousel-section section section-gray">
        <div className="container">
          <div className="section-header fade-in-on-scroll">
            <h2 className="section-title">Nos réalisations</h2>
            <p className="section-subtitle">Découvrez nos derniers projets et réalisations</p>
          </div>
          
          <div className="blog-carousel-container">
            <div className="blog-carousel-track" id="blogCarousel">
              {loading ? (
                <div className="carousel-loading">
                  <div className="loading-spinner"></div>
                  <p>Chargement des réalisations...</p>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="carousel-empty">
                  <p>Aucune réalisation disponible pour le moment.</p>
                </div>
              ) : (
                <>
                  {/* Duplicate items for seamless loop */}
                  {[...blogPosts, ...blogPosts].map((post, index) => (
                    <div key={`${post.id}-${index}`} className="blog-carousel-item">
                      <div className="blog-card card">
                        <div className="blog-image">
                          <img 
                            src={post.imageUrl || `https://images.unsplash.com/photo-${1581578731548 + (index % blogPosts.length)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                            alt={post.title} 
                          />
                          <div className="blog-overlay">
                            <div className="blog-overlay-content">
                              <h3>{post.title}</h3>
                              <p>{post.excerpt}</p>
                              <a href={`/blog/${post.id}`} className="blog-overlay-button">
                                Voir plus
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-content">
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <a href={`/blog/${post.id}`} className="card-button">Lire la suite</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            
            {/* Navigation arrows */}
            <button className="carousel-nav carousel-prev" onClick={scrollCarouselLeft}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="carousel-nav carousel-next" onClick={scrollCarouselRight}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
     
    </div>
  );
};

export default Home;
