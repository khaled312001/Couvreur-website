import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Save, Globe, Bell, Shield, Database, Palette, 
  Mail, Phone, MapPin, Building, User, Lock, Eye, EyeOff,
  CheckCircle, AlertCircle, Clock, Download, Upload
} from 'lucide-react';

const SettingsAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  
  // Settings states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'BN BÂTIMENT',
    siteDescription: 'Entreprise de charpente, couverture et zinguerie',
    contactEmail: 'contact@bnbuilding.fr',
    contactPhone: '+33 1 23 45 67 89',
    address: '123 Rue de la Construction, 75001 Paris',
    workingHours: 'Lun-Ven: 8h-18h, Sam: 9h-17h'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    quoteAlerts: true,
    testimonialAlerts: true,
    blogAlerts: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#3B82F6',
    language: 'fr',
    timezone: 'Europe/Paris'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = (section) => {
    // Simulate saving settings
    console.log(`Saving ${section} settings...`);
    // In real app, this would call an API
  };

  const handleExportSettings = () => {
    const settings = {
      general: generalSettings,
      notifications: notificationSettings,
      security: securitySettings,
      appearance: appearanceSettings
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                        value={generalSettings.siteName}
                        onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description du site</label>
                      <textarea
                        value={generalSettings.siteDescription}
                        onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                        placeholder="Description de votre entreprise"
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email de contact</label>
                        <input
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={(e) => handleGeneralChange('contactEmail', e.target.value)}
                          placeholder="contact@example.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          value={generalSettings.contactPhone}
                          onChange={(e) => handleGeneralChange('contactPhone', e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <input
                        type="text"
                        value={generalSettings.address}
                        onChange={(e) => handleGeneralChange('address', e.target.value)}
                        placeholder="Adresse complète"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Heures d'ouverture</label>
                      <input
                        type="text"
                        value={generalSettings.workingHours}
                        onChange={(e) => handleGeneralChange('workingHours', e.target.value)}
                        placeholder="Lun-Ven: 8h-18h, Sam: 9h-17h"
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('general')}
                      >
                        <Save size={16} />
                        Sauvegarder
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
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Notifications par email
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Notifications par SMS
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={notificationSettings.quoteAlerts}
                          onChange={(e) => handleNotificationChange('quoteAlerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux devis
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={notificationSettings.testimonialAlerts}
                          onChange={(e) => handleNotificationChange('testimonialAlerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux témoignages
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={notificationSettings.blogAlerts}
                          onChange={(e) => handleNotificationChange('blogAlerts', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Alertes pour nouveaux articles
                      </label>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleSaveSettings('notifications')}
                      >
                        <Save size={16} />
                        Sauvegarder
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
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Authentification à deux facteurs
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label>Délai d'expiration de session (minutes)</label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
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
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
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
                        value={securitySettings.loginAttempts}
                        onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value))}
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
                      >
                        <Save size={16} />
                        Sauvegarder
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
                        value={appearanceSettings.theme}
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
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                        />
                        <span>{appearanceSettings.primaryColor}</span>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Langue</label>
                        <select
                          value={appearanceSettings.language}
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
                          value={appearanceSettings.timezone}
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
                      >
                        <Save size={16} />
                        Sauvegarder
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