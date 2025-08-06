import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Login = () => {
  // SEO Data for Login Page
  const seoData = {
    title: "Connexion - BN BÂTIMENT Charpente Couverture Zinguerie Paris",
    description: "Connectez-vous à votre compte BN BÂTIMENT pour gérer vos projets de charpente, couverture et zinguerie à Paris. Expert toiture certifié.",
    keywords: "connexion, login, se connecter, compte utilisateur, espace client, tableau de bord, gestion projet, suivi commande, charpente, couverture, zinguerie, toiture, Paris, expert toiture, devis gratuit",
    url: "/connexion",
    image: "/logo.png"
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
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
      await login(formData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la connexion');
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
            <h1 className="auth-title">Connexion</h1>
            <p className="auth-subtitle">Connectez-vous à votre compte</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Votre mot de passe"
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

            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Pas encore de compte ?{' '}
              <Link to="/register" className="auth-link">
                Créer un compte
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

export default Login; 