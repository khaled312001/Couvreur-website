import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, LogOut, ExternalLink, 
  ChevronDown, Search, Menu, X, Home, ArrowUpRight
} from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';
import '../styles/admin.css';

const AdminHeader = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.admin-header-user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('https://api.bnbatiment.com/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/admin/login');
    }
  };

  const handleViewSite = () => {
    window.open('/', '_blank');
  };

  const handleNavigateToSettings = () => {
    navigate('/admin/settings');
    setUserMenuOpen(false);
  };

  const handleNavigateToProfile = () => {
    navigate('/admin/profile');
    setUserMenuOpen(false);
  };

  return (
    <header className="admin-header-bar">
      <div className="admin-header-content">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Header Title */}
        <div className="admin-header-title">
          <span className="admin-header-page">Administration</span>
        </div>

        {/* Header Actions */}
        <div className="admin-header-actions">
          {/* View Site Button */}
          <button 
            className="view-site-btn"
            onClick={handleViewSite}
            title="Voir le site principal"
          >
            <Home size={16} />
            <span className="view-site-text">Voir le site</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User Menu */}
          <div className="admin-header-user-menu">
            <button 
              className="admin-header-user-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="admin-header-avatar">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="admin-header-username">{user?.name || 'Admin'}</span>
              <ChevronDown size={16} />
            </button>

            {userMenuOpen && (
              <div className="admin-header-dropdown">
                <div className="admin-dropdown-header">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">
                      {user?.name?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="dropdown-name">{user?.name || 'Admin'}</div>
                      <div className="dropdown-email">admin@example.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="admin-dropdown-content">
                  
                  <div className="admin-header-dropdown-divider"></div>
                  <button 
                    className="admin-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 