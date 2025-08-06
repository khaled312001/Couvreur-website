import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, User, MapPin, Calendar, Search, Filter } from "lucide-react";
import { testimonialsApi } from "../api/testimonials";
import AnimatedSection from "../components/AnimatedSection";
import "../styles/testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, ratingFilter]);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await testimonialsApi.getTestimonials();
      const testimonialsData = response.data || response;
      setTestimonials(testimonialsData);
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = testimonials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter(testimonial => testimonial.rating === rating);
    }

    setFilteredTestimonials(filtered);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAverageRating = () => {
    if (testimonials.length === 0) return 0;
    const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return (totalRating / testimonials.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="testimonials-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des témoignages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials-page">
        <div className="container">
          <div className="error-container">
            <p>{error}</p>
            <button onClick={loadTestimonials} className="retry-button">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials-page">
      <div className="container">
        {/* Header Section */}
        <AnimatedSection animationType="fade-in" className="testimonials-header">
          <div className="header-content">
            <h1 className="page-title">Témoignages de nos clients</h1>
            <p className="page-subtitle">
              Découvrez ce que nos clients disent de nos services de toiture
            </p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">{testimonials.length}</span>
                <span className="stat-label">Témoignages</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{getAverageRating()}</span>
                <span className="stat-label">Note moyenne</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filters Section */}
        <AnimatedSection animationType="fade-in" className="filters-section">
          <div className="filters-container">
            <div className="search-filter">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher dans les témoignages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="rating-filter">
              <Filter className="filter-icon" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="rating-select"
              >
                <option value="all">Tous les avis</option>
                <option value="5">5 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="2">2 étoiles</option>
                <option value="1">1 étoile</option>
              </select>
            </div>
          </div>
          {searchTerm || ratingFilter !== 'all' ? (
            <div className="filter-results">
              <p>{filteredTestimonials.length} témoignage(s) trouvé(s)</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setRatingFilter('all');
                }}
                className="clear-filters"
              >
                Effacer les filtres
              </button>
            </div>
          ) : null}
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {filteredTestimonials.length === 0 ? (
            <AnimatedSection animationType="fade-in" className="empty-state">
              <div className="empty-content">
                <Quote className="empty-icon" />
                <h3>
                  {testimonials.length === 0 
                    ? "Aucun témoignage disponible" 
                    : "Aucun témoignage ne correspond à vos critères"
                  }
                </h3>
                <p>
                  {testimonials.length === 0 
                    ? "Les témoignages de nos clients apparaîtront ici bientôt."
                    : "Essayez de modifier vos filtres de recherche."
                  }
                </p>
              </div>
            </AnimatedSection>
          ) : (
            filteredTestimonials.map((testimonial, index) => (
              <AnimatedSection 
                key={testimonial.id} 
                animationType="slide-up" 
                className="testimonial-card"
                delay={index * 0.1}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Quote />
                  </div>
                  
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <blockquote className="testimonial-text">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <User />
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <div className="author-details">
                        {testimonial.location && (
                          <span className="author-location">
                            <MapPin size={14} />
                            {testimonial.location}
                          </span>
                        )}
                        {testimonial.created_at && (
                          <span className="author-date">
                            <Calendar size={14} />
                            {formatDate(testimonial.created_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>

        {/* Call to Action */}
        <AnimatedSection animationType="fade-in" className="cta-section">
          <div className="cta-content">
            <h2>Vous aussi, partagez votre expérience</h2>
            <p>Votre avis nous aide à améliorer nos services</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                Nous contacter
              </a>
              <a href="/services" className="btn btn-secondary">
                Nos services
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Testimonials;
