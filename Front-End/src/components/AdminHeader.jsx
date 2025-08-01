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
      if (!event.target.closest('.admin-header-user')) {
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
        await fetch('http://localhost:8000/api/auth/logout', {
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
    <header className="admin-header">
      <div className="admin-header-content">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Search Bar */}
        <div className="">
         
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

          {/* Notifications - Using the new component */}
          <NotificationsDropdown />

          {/* User Menu */}
          <div className="admin-header-user">
            <button 
              className="user-menu-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span className="user-name">{user?.name || 'Admin'}</span>
              <ChevronDown size={16} />
            </button>

            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar-large">
                    <User size={24} />
                  </div>
                  <div className="user-details">
                    <h4>{user?.name || 'Admin'}</h4>
                    <p>Administrateur Principal</p>
                  </div>
                </div>
                
                <div className="user-menu-items">
                  <button 
                    className="user-menu-item"
                    onClick={handleNavigateToProfile}
                  >
                    <User size={16} />
                    Mon compte
                  </button>
                  <button 
                    className="user-menu-item"
                    onClick={handleNavigateToSettings}
                  >
                    <Settings size={16} />
                    Paramètres
                  </button>
                  <div className="user-menu-divider"></div>
                  <button 
                    className="user-menu-item danger"
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