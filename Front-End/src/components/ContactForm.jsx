import React, { useState } from "react";
import { chatApi } from "../api/chat";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Create chat session and send initial message
      const response = await chatApi.createSession({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      });

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="contact-form success-form">
        <div className="success-message animate-bounceIn">
          <div className="success-icon">
          <span>✅</span>
          </div>
          <div className="success-content">
            <h4>Message envoyé avec succès!</h4>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
            <div className="success-features">
              <div className="feature">
                <span className="feature-icon">📧</span>
                <span>Email de confirmation envoyé</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⏰</span>
                <span>Réponse sous 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form enhanced-form">
      <div className="form-header">
        <h3 className="form-title">Demander un devis gratuit</h3>
        <p className="form-subtitle">
          Remplissez ce formulaire et nous vous recontacterons rapidement
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="enhanced-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👤</span>
              Nom complet *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Votre nom complet"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📧</span>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📞</span>
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="07 80 32 64 27"
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🏗️</span>
              Service souhaité
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Sélectionner un service</option>
              <option value="installation">Installation de toiture</option>
              <option value="repair">Réparation des fuites</option>
              <option value="maintenance">Entretien de toiture</option>
              <option value="isolation">Isolation de toiture</option>
              <option value="charpente">Charpente</option>
              <option value="zinguerie">Zinguerie</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">💬</span>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Décrivez votre projet, vos besoins et vos questions..."
            required
          />
        </div>

        {error && (
          <div className="error-message animate-bounceIn">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="form-button enhanced-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <span className="button-icon">📤</span>
              <span>Envoyer le message</span>
            </>
          )}
        </button>
        
        <div className="form-footer">
          <p className="form-note">
            <span className="note-icon">🔒</span>
            Vos données sont protégées et ne seront utilisées que pour vous recontacter
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
