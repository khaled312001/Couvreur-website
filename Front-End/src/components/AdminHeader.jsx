import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, Settings, LogOut, ExternalLink, 
  ChevronDown, Search, Menu, X, Home, ArrowUpRight
} from 'lucide-react';
import '../styles/admin.css';

const AdminHeader = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Nouveau devis reçu',
      message: 'Un nouveau devis a été soumis par Jean Dupont',
      time: 'Il y a 5 minutes',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Commande terminée',
      message: 'La commande #1234 a été livrée avec succès',
      time: 'Il y a 1 heure',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Maintenance requise',
      message: 'Le service de maintenance est dû cette semaine',
      time: 'Il y a 2 heures',
      unread: false
    },
    {
      id: 4,
      type: 'info',
      title: 'Nouveau témoignage',
      message: 'Un nouveau témoignage client a été ajouté',
      time: 'Il y a 3 heures',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.admin-header-notifications') && !event.target.closest('.admin-header-user')) {
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
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

  const handleNotificationClick = (notification) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'info':
        if (notification.title.includes('devis')) {
          navigate('/admin/quotes');
        } else if (notification.title.includes('témoignage')) {
          navigate('/admin/testimonials');
        }
        break;
      case 'success':
        if (notification.title.includes('Commande')) {
          navigate('/admin/orders');
        }
        break;
      case 'warning':
        navigate('/admin/services');
        break;
      default:
        break;
    }
    setNotificationsOpen(false);
  };

  const markAllAsRead = () => {
    // Simulate marking all as read
    console.log('Marking all notifications as read');
    setNotificationsOpen(false);
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
        <div className="admin-header-search">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
          />
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
          <div className="admin-header-notifications">
            <button 
              className="notification-btn"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {notificationsOpen && (
              <div className="admin-header-notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button 
                    className="mark-all-read"
                    onClick={markAllAsRead}
                  >
                    Tout marquer comme lu
                  </button>
                </div>
                
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="notification-icon">
                        {notification.type === 'info' && <Bell size={16} />}
                        {notification.type === 'success' && <Bell size={16} />}
                        {notification.type === 'warning' && <Bell size={16} />}
                      </div>
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="notifications-footer">
                  <button 
                    className="view-all-notifications"
                    onClick={() => {
                      setNotificationsOpen(false);
                      // Navigate to notifications page if exists
                    }}
                  >
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="admin-header-user">
            <button 
              className="user-menu-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span className="user-name">Jean Dupont</span>
              <ChevronDown size={16} />
            </button>

            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar-large">
                    <User size={24} />
                  </div>
                  <div className="user-details">
                    <h4>Jean Dupont</h4>
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