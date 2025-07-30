import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          opacity: 0.1
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #764ba2, #667eea)',
          opacity: 0.1
        }}></div>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
              <span style={{ fontWeight: 'bold', fontSize: 32, color: '#667eea', letterSpacing: '2px' }}>BN</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#6c757d', letterSpacing: '1px', marginTop: '-2px' }}>BÂTIMENT</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
              <svg width="20" height="28" viewBox="0 0 20 28" style={{ marginRight: 2 }}>
                <text x="0" y="24" fontSize="28" fontWeight="bold" fill="#667eea">"</text>
              </svg>
              <svg width="34" height="28" viewBox="0 0 34 28" style={{ margin: '0 2px' }}>
                <polygon points="17,3 32,16 28,16 28,24 21,24 21,17 12,17 12,24 5,24 5,16 1,16" fill="#667eea" />
              </svg>
              <svg width="20" height="28" viewBox="0 0 20 28" style={{ marginLeft: 2 }}>
                <text x="0" y="24" fontSize="28" fontWeight="bold" fill="#667eea">"</text>
              </svg>
            </div>
          </div>
          <h2 style={{ 
            margin: 0, 
            color: '#1f2937', 
            fontSize: '24px', 
            fontWeight: '600',
            marginBottom: '5px'
          }}>
            Administration
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#6b7280', 
            fontSize: '14px'
          }}>
            Connectez-vous à votre espace d'administration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="admin@bnbuilding.fr"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spin" style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%'
                }}></div>
                Connexion...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          <strong>Démonstration:</strong><br />
          Email: admin@bnbuilding.fr<br />
          Mot de passe: admin123
        </div>
      </div>
    </div>
  );
};

export default Login; 