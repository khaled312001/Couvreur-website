import React, { useState } from "react";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="contact-form">
        <div className="success-message">
          <span>✅</span>
          <div>
            <h4>Message envoyé avec succès!</h4>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <h3>Demander un devis gratuit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Service souhaité</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Sélectionner un service</option>
              <option value="installation">Installation de toiture</option>
              <option value="repair">Réparation de toiture</option>
              <option value="maintenance">Entretien de toiture</option>
              <option value="isolation">Isolation de toiture</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Décrivez votre projet..."
            required
          />
        </div>

        {error && (
          <div style={{
            color: '#dc2626',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="form-button"
          disabled={isLoading}
        >
          {isLoading && <span className="loading-spinner"></span>}
          {isLoading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
