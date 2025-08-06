import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Register = () => {
  // SEO Data for Register Page
  const seoData = {
    title: "Inscription - BN BÂTIMENT Charpente Couverture Zinguerie Paris",
    description: "Créez votre compte BN BÂTIMENT pour gérer vos projets de charpente, couverture et zinguerie à Paris. Expert toiture certifié.",
    keywords: "inscription, s'inscrire, créer compte, nouveau compte, compte utilisateur, espace client, tableau de bord, gestion projet, suivi commande, charpente, couverture, zinguerie, toiture, Paris, expert toiture, devis gratuit",
    url: "/inscription",
    image: "/logo.png"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="auth-container">
        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Créer un compte</h1>
            <p className="auth-subtitle">Rejoignez-nous pour accéder à nos services</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Votre nom complet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Téléphone (optionnel)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Adresse (optionnel)
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Minimum 8 caractères"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation" className="form-label">
                Confirmer le mot de passe
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirmez votre mot de passe"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Déjà un compte ?{' '}
              <Link to="/login" className="auth-link">
                Se connecter
              </Link>
            </p>
          </div>

          <div className="back-home">
            <Link to="/" className="back-home-link">
              <span>←</span>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register; 