import React, { useState, useEffect } from "react";
import { contactApi } from "../api/contact";
import { getServices } from "../api/services";

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
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        // Fallback to default services if API fails
        setServices([
          { id: 1, title: "Installation", slug: "installation" },
          { id: 2, title: "Réparation", slug: "reparation" },
          { id: 3, title: "Entretien", slug: "entretien" },
          { id: 4, title: "Isolation", slug: "isolation" },
          { id: 5, title: "Charpente", slug: "charpente" },
          { id: 6, title: "Zinguerie", slug: "zinguerie" }
        ]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

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
      // Create contact message
      const response = await contactApi.createMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.service ? `Demande de devis - ${formData.service}` : 'Demande de devis',
        message: formData.message
      });

      console.log('Form submitted successfully, response:', response);
      
      // Consider any response as success since the API call completed
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
      setError(err.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
      console.log('Form submission completed, loading state reset');
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
              <div className="feature">
                <span className="feature-icon">📞</span>
                <span>Appel sous 2h</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setError("");
              }}
              className="form-button"
              style={{ marginTop: '20px' }}
            >
              Envoyer un autre message
            </button>
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
              disabled={loadingServices}
            >
              <option value="">
                {loadingServices ? "Chargement des services..." : "Sélectionner un service"}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.slug || service.id}>
                  {service.title}
                </option>
              ))}
              <option value="other">Autre service</option>
            </select>
            {loadingServices && (
              <div className="loading-indicator">
                <span className="loading-spinner-small"></span>
                <span>Chargement des services...</span>
              </div>
            )}
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
            <button 
              onClick={() => setError("")}
              className="error-close"
              style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="submit"
          className="form-button enhanced-button"
          disabled={isLoading}
          style={{ 
            opacity: isLoading ? 0.7 : 1, 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            position: 'relative'
          }}
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
