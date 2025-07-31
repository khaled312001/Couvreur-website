import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
  className="hero"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://leanagility.com/web/default/files/public/Images/Contact%20Us.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    position: "relative",
    padding: "5rem 1rem",
    textAlign: "center",
  }}
>
  <div className="container">
    <div className="hero-content">
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        Contactez-nous
      </h1>
      <p
        style={{
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "500",
          textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
        }}
      >
        DEVIS GRATUIT
      </p>
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
                      <p>  Installation - Entretien - Répartition des fuites</p>
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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27723.65451093035!2d4.81907325!3d45.758010049999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea51674a90b5%3A0x408ab2ae4baef90!2sLyon!5e0!3m2!1sfr!2sfr!4v1699362975224!5m2!1sfr!2sfr"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="Carte de Lyon"
/>



          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
