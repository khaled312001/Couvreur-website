import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Mail, Eye, EyeOff, Shield, Building2, 
  CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.bnbatiment.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user is admin
        if (data.user.role === 'admin') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/admin/dashboard');
        } else {
          setError('Accès refusé. Seuls les administrateurs peuvent accéder à cette section.');
        }
      } else {
        setError(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <motion.div 
        className="login-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </motion.div>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <motion.div 
          className="login-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="logo-container">
            <div className="logo-icon">
              <img 
                src="/logo.png" 
                alt="BN BÂTIMENT Logo" 
                style={{ height: 40, width: 'auto', objectFit: 'contain' }} 
              />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">BN BÂTIMENT</h1>
              <p className="logo-subtitle">Administration</p>
            </div>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div 
          className="login-welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2>Bienvenue</h2>
          <p>Connectez-vous à votre espace d'administration</p>
        </motion.div>

        {/* Enhanced Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="login-form enhanced-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {error && (
              <motion.div 
                className="error-message enhanced-error"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={18} style={{ marginRight: 8, color: '#ef4444' }} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <div className={`form-group enhanced-form-group ${isFocused.email ? 'focused' : ''}`}>
            <label className="form-label enhanced-label" htmlFor="email">
              <Mail size={18} style={{ marginRight: 8, color: isFocused.email ? '#2563eb' : '#9ca3af' }} />
              Adresse email
            </label>
            <div className={`input-wrapper enhanced-input-wrapper ${isFocused.email ? 'focused' : ''}`}>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                required
                className="form-input enhanced-input"
                placeholder="admin@bnbuilding.fr"
                autoComplete="username"
                style={{
                  border: isFocused.email ? '2px solid #2563eb' : '1.5px solid #e5e7eb',
                  boxShadow: isFocused.email ? '0 0 0 2px #dbeafe' : 'none',
                  transition: 'all 0.2s',
                  background: '#f9fafb',
                  paddingLeft: 14,
                  fontSize: '1rem',
                  borderRadius: 8,
                  height: 44,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={`form-group enhanced-form-group ${isFocused.password ? 'focused' : ''}`}>
            <label className="form-label enhanced-label" htmlFor="password">
              <Lock size={18} style={{ marginRight: 8, color: isFocused.password ? '#2563eb' : '#9ca3af' }} />
              Mot de passe
            </label>
            <div className={`input-wrapper enhanced-input-wrapper ${isFocused.password ? 'focused' : ''}`} style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
                className="form-input enhanced-input"
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  border: isFocused.password ? '2px solid #2563eb' : '1.5px solid #e5e7eb',
                  boxShadow: isFocused.password ? '0 0 0 2px #dbeafe' : 'none',
                  transition: 'all 0.2s',
                  background: '#f9fafb',
                  paddingLeft: 14,
                  fontSize: '1rem',
                  borderRadius: 8,
                  height: 44,
                  outline: 'none',
                  paddingRight: 44
                }}
              />
              <button
                type="button"
                className="password-toggle enhanced-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="enhanced-password-hint" style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 4 }}>
              <span>Le mot de passe est sensible à la casse.</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="submit-button enhanced-submit"
            whileHover={{ scale: isLoading ? 1 : 1.04 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.08rem',
              border: 'none',
              borderRadius: 8,
              padding: '0.95rem 0',
              marginTop: 18,
              boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
              letterSpacing: '0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? (
              <motion.div 
                className="loading-content enhanced-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Loader2 size={20} className="spin" style={{ color: '#fff' }} />
                Connexion en cours...
              </motion.div>
            ) : (
              <motion.div 
                className="button-content enhanced-button-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Shield size={20} style={{ color: '#fff' }} />
                Se connecter
              </motion.div>
            )}
          </motion.button>
        </motion.form>

        {/* Demo Credentials */}
        <motion.div 
          className="demo-credentials enhanced-demo-credentials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 28,
            background: 'linear-gradient(90deg, #f1f5f9 0%, #e0e7ef 100%)',
            borderRadius: 10,
            padding: '1.1rem 1.2rem',
            boxShadow: '0 2px 8px rgba(37,99,235,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            minHeight: 48
          }}
        >
         
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 32 }}>
            © 2025 BN BÂTIMENT. Tous droits réservés.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 