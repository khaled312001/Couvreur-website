import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                <span style={{ fontWeight: 'bold', fontSize: 28, color: '#ffffff', letterSpacing: '2px' }}>BN</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#93c5fd', letterSpacing: '1px', marginTop: '-2px' }}>BÂTIMENT</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                <svg width="18" height="24" viewBox="0 0 18 24" style={{ marginRight: 2 }}>
                  <text x="0" y="20" fontSize="20" fontWeight="bold" fill="#ffffff">"</text>
                </svg>
                <svg width="30" height="24" viewBox="0 0 30 24" style={{ margin: '0 2px' }}>
                  <polygon points="15,2 28,12 25,12 25,18 19,18 19,12 11,12 11,18 5,18 5,12 2,12" fill="#ffffff" />
                </svg>
                <svg width="18" height="24" viewBox="0 0 18 24" style={{ marginLeft: 2 }}>
                  <text x="0" y="20" fontSize="20" fontWeight="bold" fill="#ffffff">"</text>
                </svg>
              </div>
            </div>
            <div style={{
              height: '30px',
              width: '1px',
              backgroundColor: '#3b82f6',
              margin: '0 15px'
            }}></div>
            <div>
              <div style={{ fontSize: '14px', color: '#93c5fd', marginBottom: '2px' }}>
                Administration
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                Tableau de bord
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="admin-nav">
            <a href="/admin/dashboard" className="admin-nav-link">
              📊 Dashboard
            </a>
            <a href="/admin/quotes" className="admin-nav-link">
              📋 Devis
            </a>
            <a href="/admin/testimonials" className="admin-nav-link">
              ⭐ Avis
            </a>
            <a href="/admin/gallery" className="admin-nav-link">
              📸 Galerie
            </a>
            <a href="/admin/blog" className="admin-nav-link">
              📝 Blog
            </a>
          </nav>

          {/* User Menu */}
          <div className="admin-user-menu">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="admin-user-button"
            >
              <div className="admin-user-avatar">
                {adminUser.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {adminUser.name || 'Admin'}
                </div>
                <div style={{ fontSize: '12px', color: '#93c5fd' }}>
                  {adminUser.email || 'admin@bnbuilding.fr'}
                </div>
              </div>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12"
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="admin-dropdown">
                <div className="admin-dropdown-header">
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {adminUser.name || 'Admin'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {adminUser.email || 'admin@bnbuilding.fr'}
                  </div>
                </div>
                
                <div className="admin-dropdown-content">
                  <button
                    onClick={() => window.open('/', '_blank')}
                    className="admin-dropdown-item"
                  >
                    🌐 Voir le site
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="admin-dropdown-item logout"
                  >
                    🚪 Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default AdminHeader; 