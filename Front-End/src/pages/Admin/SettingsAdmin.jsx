import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Save, Globe, Bell, Shield, Database, Palette, 
  Mail, Phone, MapPin, Building, User, Lock, Eye, EyeOff,
  CheckCircle, AlertCircle, Clock, Download, Upload
} from 'lucide-react';
import { settingsApi } from '../../api/settings';

const SettingsAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Settings states
  const [settings, setSettings] = useState({
    general: {},
    notifications: {},
    security: {},
    appearance: {},
    company: {},
    email: {},
    social: {}
  });

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await settingsApi.getSettings();
      setSettings(response.data || response);
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Erreur lors du chargement des paramètres');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneralChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleAppearanceChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  const handleCompanyChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  const handleEmailChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async (section) => {
    try {
      setSaving(true);
      await settingsApi.updateSettings(section, settings[section]);
      alert(`${section} settings saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error);
      alert(`Error saving ${section} settings`);
    } finally {
      setSaving(false);
    }
  };

  const handleExportSettings = async () => {
    try {
      const response = await settingsApi.exportSettings();
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = response.filename || 'settings.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting settings:', error);
      alert('Error exporting settings');
    }
  };

  const handleImportSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        await settingsApi.importSettings(importedSettings);
        await loadSettings(); // Reload settings
        alert('Settings imported successfully!');
      } catch (error) {
        console.error('Error importing settings:', error);
        alert('Error importing settings');
      }
    };
    reader.readAsText(file);
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="admin-main">
          <div className="admin-content">
            <motion.div 
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="loading-spinner"></div>
              <p>Chargement des paramètres...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="admin-main">
          <div className="admin-content">
            <motion.div 
              className="error-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="error-icon">⚠️</div>
              <h3>Erreur de chargement</h3>
              <p>{error}</p>
              <button 
                onClick={loadSettings}
                className="retry-button"
              >
                Réessayer
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-main">
        <div className="admin-content">
          {/* Header */}
          <motion.div 
            className="dashboard-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="dashboard-header-content">
              <div>
                <h1>Paramètres</h1>
                <p>Configurez votre site et vos préférences</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-secondary"
                  onClick={handleExportSettings}
                >
                  <Download size={16} />
                  Exporter
                </button>
                <button className="btn-primary">
                  <Save size={16} />
                  Sauvegarder tout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Settings Navigation */}
          <motion.div 
            className="settings-navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button 
              className={`settings-nav-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Globe size={16} />
              Général
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} />
              Notifications
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={16} />
              Sécurité
            </button>
            <button 
              className={`settings-nav-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Palette size={16} />
              Apparence
            </button>
          </motion.div>

          {/* Settings Content */}
          <motion.div 
            className="settings-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  className="settings-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>Paramètres généraux</h3>
                    <p>Configurez les informations de base de votre site</p>
                  </div>
                  
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Nom du site</label>
                                              <input
                          type="text"
                          value={settings.general.site_name || ''}
                          onChange={(e) => handleGeneralChange('site_name', e.target.value)}
                          placeholder="Nom de votre entreprise"
                        />
                    </div>
                    
                    <div className="form-group">
                      <label>Description du site</label>
                                              <textarea
                          value={settings.general.site_description || ''}
                          onChange={(e) => handleGeneralChange('site_description', e.target.value)}
                          placeholder="Description de votre entreprise"
                          rows="3"
                        />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email de contact</label>
                                                  <input
                            type="email"
                            value={settings.general.contact_email || ''}
                            onChange={(e) => handleGeneralChange('contact_email', e.target.value)}
                            placeholder="contact@example.com"
                          />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                                                  <input
                            type="tel"
                            value={settings.general.contact_phone || ''}
                            onChange={(e) => handleGeneralChange('contact_phone', e.target.value)}
                            placeholder="+33 1 23 45 67 89"
                          />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <input
                        type="text"
                        value={settings.general.address || ''}
                        onChange={(e) => handleGeneralChange('address', e.target.value)}
                        placeholder="Adresse complète"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Heures d'ouverture</label>
                                              <input
                          type="text"
                          value={settings.general.working_hours || ''}
                          onChange={(e) => handleGeneralChange('working_hours', e.target.value)}
                          placeholder="24h/24, 7j/7"
                        />
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('general')}
                        disabled={saving}
                      >
                        <Save size={16} />
                        {saving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  className="settings-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>Paramètres de notifications</h3>
                    <p>Configurez vos préférences de notifications</p>
                  </div>
                  
                  <div className="settings-form">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email_notifications || false}
                          onChange={(e) => handleNotificationChange('email_notifications', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Notifications par email
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.notifications.sms_notifications || false}
                          onChange={(e) => handleNotificationChange('sms_notifications', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Notifications par SMS
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.notifications.quote_alerts || false}
                          onChange={(e) => handleNotificationChange('quote_alerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux devis
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.notifications.testimonial_alerts || false}
                          onChange={(e) => handleNotificationChange('testimonial_alerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux témoignages
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.notifications.blog_alerts || false}
                          onChange={(e) => handleNotificationChange('blog_alerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux articles
                      </label>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('notifications')}
                        disabled={saving}
                      >
                        <Save size={16} />
                        {saving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  className="settings-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>Paramètres de sécurité</h3>
                    <p>Configurez la sécurité de votre compte</p>
                  </div>
                  
                  <div className="settings-form">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={settings.security.two_factor_auth || false}
                          onChange={(e) => handleSecurityChange('two_factor_auth', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Authentification à deux facteurs
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label>Délai d'expiration de session (minutes)</label>
                                              <select
                          value={settings.security.session_timeout || 30}
                          onChange={(e) => handleSecurityChange('session_timeout', parseInt(e.target.value))}
                        >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 heure</option>
                        <option value={120}>2 heures</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Expiration du mot de passe (jours)</label>
                                              <select
                          value={settings.security.password_expiry || 90}
                          onChange={(e) => handleSecurityChange('password_expiry', parseInt(e.target.value))}
                        >
                        <option value={30}>30 jours</option>
                        <option value={60}>60 jours</option>
                        <option value={90}>90 jours</option>
                        <option value={180}>180 jours</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Nombre maximum de tentatives de connexion</label>
                                              <select
                          value={settings.security.login_attempts || 5}
                          onChange={(e) => handleSecurityChange('login_attempts', parseInt(e.target.value))}
                        >
                        <option value={3}>3 tentatives</option>
                        <option value={5}>5 tentatives</option>
                        <option value={10}>10 tentatives</option>
                      </select>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('security')}
                        disabled={saving}
                      >
                        <Save size={16} />
                        {saving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  className="settings-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>Paramètres d'apparence</h3>
                    <p>Personnalisez l'apparence de votre interface</p>
                  </div>
                  
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Thème</label>
                      <select
                        value={settings.appearance.theme || 'light'}
                        onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                      >
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                        <option value="auto">Automatique</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Couleur principale</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.appearance.primary_color || '#3B82F6'}
                          onChange={(e) => handleAppearanceChange('primary_color', e.target.value)}
                        />
                        <span>{settings.appearance.primary_color || '#3B82F6'}</span>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Langue</label>
                        <select
                          value={settings.appearance.language || 'fr'}
                          onChange={(e) => handleAppearanceChange('language', e.target.value)}
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Fuseau horaire</label>
                        <select
                          value={settings.appearance.timezone || 'Europe/Paris'}
                          onChange={(e) => handleAppearanceChange('timezone', e.target.value)}
                        >
                          <option value="Europe/Paris">Paris (UTC+1)</option>
                          <option value="Europe/London">Londres (UTC+0)</option>
                          <option value="America/New_York">New York (UTC-5)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('appearance')}
                        disabled={saving}
                      >
                        <Save size={16} />
                        {saving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin; 