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

    // Simulate API call
    setTimeout(() => {
      if (formData.email === 'admin@bnbuilding.fr' && formData.password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-token-123');
        localStorage.setItem('adminUser', JSON.stringify({
          id: 1,
          name: 'Admin',
          email: formData.email,
          role: 'admin'
        }));
        navigate('/admin/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 1500);
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
              <Building2 size={32} />
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

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Adresse email
            </label>
            <div className={`input-wrapper ${isFocused.email ? 'focused' : ''}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                required
                className="form-input"
                placeholder="admin@bnbuilding.fr"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">
              <Lock size={16} />
              Mot de passe
            </label>
            <div className={`input-wrapper ${isFocused.password ? 'focused' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
                className="form-input"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {isLoading ? (
              <motion.div 
                className="loading-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 size={18} className="spin" />
                Connexion en cours...
              </motion.div>
            ) : (
              <motion.div 
                className="button-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Shield size={18} />
                Se connecter
              </motion.div>
            )}
          </motion.button>
        </motion.form>

        {/* Demo Credentials */}
        <motion.div 
          className="demo-credentials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="demo-header">
            <CheckCircle size={16} />
            <span>Démonstration</span>
          </div>
          <div className="demo-content">
            <div className="demo-item">
              <strong>Email:</strong> admin@bnbuilding.fr
            </div>
            <div className="demo-item">
              <strong>Mot de passe:</strong> admin123
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>© 2025 BN BÂTIMENT. Tous droits réservés.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 