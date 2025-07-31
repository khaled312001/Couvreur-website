import React, { useEffect, useState } from "react";
import { getTestimonials } from "../api/testimonials";
import Testimonial from "../components/Testimonial";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://f.hellowork.com/blogdumoderateur/2022/06/avis-clients-5-etoiles-1200x628.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}>
        <div className="container">
          <div className="hero-content">
            <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Avis Clients</h1>
            <p style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>Ce que nos clients disent de nos services</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Témoignages clients</h2>
          <p className="section-subtitle">
            Découvrez les avis de nos clients satisfaits
          </p>
          <div className="grid grid-3">
            {Array.isArray(testimonials) && testimonials.map(t => (
              <Testimonial key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Nos chiffres</h2>
          <div className="grid grid-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e3a8a',
                marginBottom: '10px'
              }}>
                500+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>
                Clients satisfaits
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e3a8a',
                marginBottom: '10px'
              }}>
                15+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>
                Années d'expérience
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e3a8a',
                marginBottom: '10px'
              }}>
                1000+
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>
                Projets réalisés
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e3a8a',
                marginBottom: '10px'
              }}>
                4.9/5
              </div>
              <div style={{ color: '#6b7280', fontSize: '18px' }}>
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Besoin d'un devis ?</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div style={{ marginTop: '40px' }}>
              <a href="/contact" className="btn btn-primary">
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
