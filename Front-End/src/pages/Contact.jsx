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
                      <p>07 80 32 64 27</p>
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

<iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99945010852!2d2.292292615674682!3d48.85837307928752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fddf8a5d77b%3A0x8c0e1c64af0f3e6!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1620383430835!5m2!1sfr!2sfr"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>


          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
