import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contactez-nous</h1>
            <p>DEVIS GRATUIT</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-section">
            <h2 className="section-title">Demander un devis</h2>
            <p className="section-subtitle">
              Contactez-nous pour un devis gratuit et personnalisé
            </p>
            <div className="contact-grid">
              <div>
                <h3>Informations de contact</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div className="contact-text">
                      <h4>Téléphone</h4>
                      <p>06 03 71 39 94</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">✉️</div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <p>bnbatimententreprise@gmail.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">🕒</div>
                    <div className="contact-text">
                      <h4>Horaires</h4>
                      <p>Lundi - Samedi : 7h00 - 20h</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">🏗️</div>
                    <div className="contact-text">
                      <h4>Services</h4>
                      <p>Charpente - Couverture - Zinguerie</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">📋</div>
                    <div className="contact-text">
                      <h4>Types de projets</h4>
                      <p>Neuf - Rénovation - Entretien - Répartition des fuites</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Notre zone d'intervention</h2>
          <p className="section-subtitle">
            Nous intervenons dans votre région
          </p>
          <div style={{
            backgroundColor: '#e5e7eb',
            height: '400px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Carte interactive - Zone d'intervention
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
