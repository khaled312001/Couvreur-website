import React, { useEffect, useState } from "react";
import { getTestimonials, getMockTestimonials } from "../api/testimonials";
import Testimonial from "../components/Testimonial";
import "../styles/testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          // Fallback to mock data if API returns empty
          setTestimonials(getMockTestimonials());
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        // Use mock data as fallback
        setTestimonials(getMockTestimonials());
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="testimonials-hero-content">
          <h1>Avis Clients</h1>
          <p>Ce que nos clients disent de nos services</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title fade-in-on-scroll">Témoignages clients</h2>
          <p className="section-subtitle fade-in-on-scroll">
            Découvrez les avis de nos clients satisfaits
          </p>
          
          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 0',
              color: '#6b7280'
            }}>
              <div className="loading-spinner"></div>
              <p>Chargement des témoignages...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <Testimonial key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 0',
              color: '#6b7280'
            }}>
              <p>Aucun témoignage disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="testimonials-stats">
        <div className="container">
          <h2 className="section-title fade-in-on-scroll" style={{ color: 'white' }}>Nos chiffres</h2>
          <div className="testimonials-stats-grid">
            <div className="testimonials-stat-item fade-in-on-scroll">
              <span className="testimonials-stat-number">500+</span>
              <span className="testimonials-stat-label">Clients satisfaits</span>
            </div>
            <div className="testimonials-stat-item fade-in-on-scroll">
              <span className="testimonials-stat-number">15+</span>
              <span className="testimonials-stat-label">Années d'expérience</span>
            </div>
            <div className="testimonials-stat-item fade-in-on-scroll">
              <span className="testimonials-stat-number">1000+</span>
              <span className="testimonials-stat-label">Projets réalisés</span>
            </div>
            <div className="testimonials-stat-item fade-in-on-scroll">
              <span className="testimonials-stat-number">4.9/5</span>
              <span className="testimonials-stat-label">Note moyenne</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="testimonials-contact">
        <div className="container">
          <div className="testimonials-contact-content fade-in-on-scroll">
            <h2>Besoin d'un devis ?</h2>
            <p>
              Contactez-nous pour un devis gratuit et personnalisé. Notre équipe 
              d'experts est prête à vous accompagner dans tous vos projets de 
              construction et rénovation.
            </p>
            <div className="testimonials-contact-buttons">
              <a href="/contact" className="btn-primary">
                <span>📋</span>
                Demander un devis gratuit
              </a>
              <a href="tel:33780326427" className="btn-secondary">
                <span>📞</span>
                Appelez maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
