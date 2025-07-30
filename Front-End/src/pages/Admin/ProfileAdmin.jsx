import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Key, 
  Camera, Edit, Save, X, Eye, EyeOff, Bell, Lock,
  CheckCircle, AlertCircle, Clock, Activity, Award,
  Settings, LogOut, Download, Upload, Trash2, Plus,
  Star, Trophy, Target, Zap, Heart, Briefcase
} from 'lucide-react';

const ProfileAdmin = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@bn-batiment.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, 75001 Paris',
    position: 'Administrateur Principal',
    department: 'Gestion Générale',
    joinDate: '2023-01-15',
    avatar: null,
    bio: 'Administrateur principal avec plus de 8 ans d\'expérience dans la gestion de projets de construction. Spécialisé dans la coordination des équipes et l\'optimisation des processus.',
    timezone: 'Europe/Paris',
    language: 'Français'
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  // Activity data
  const [activities] = useState([
    {
      id: 1,
      type: 'login',
      description: 'Connexion réussie',
      timestamp: '2025-01-15T10:30:00',
      ip: '192.168.1.100',
      location: 'Paris, France',
      device: 'Chrome sur Windows'
    },
    {
      id: 2,
      type: 'update',
      description: 'Modification du profil',
      timestamp: '2025-01-14T15:45:00',
      ip: '192.168.1.100',
      location: 'Paris, France',
      device: 'Chrome sur Windows'
    },
    {
      id: 3,
      type: 'security',
      description: 'Changement de mot de passe',
      timestamp: '2025-01-13T09:20:00',
      ip: '192.168.1.100',
      location: 'Paris, France',
      device: 'Chrome sur Windows'
    },
    {
      id: 4,
      type: 'login',
      description: 'Connexion réussie',
      timestamp: '2025-01-12T14:15:00',
      ip: '192.168.1.100',
      location: 'Paris, France',
      device: 'Chrome sur Windows'
    },
    {
      id: 5,
      type: 'update',
      description: 'Ajout d\'un nouveau service',
      timestamp: '2025-01-11T11:30:00',
      ip: '192.168.1.100',
      location: 'Paris, France',
      device: 'Chrome sur Windows'
    }
  ]);

  // Stats data
  const [stats] = useState({
    totalLogins: 156,
    lastLogin: '2025-01-15T10:30:00',
    sessionsThisMonth: 23,
    totalActions: 1247,
    profileCompleteness: 95,
    securityScore: 92
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSecurityData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    setIsLoading(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingAvatar(true);
      // Simulate upload
      setTimeout(() => {
        setProfileData(prev => ({
          ...prev,
          avatar: URL.createObjectURL(file)
        }));
        setUploadingAvatar(false);
      }, 1500);
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      login: <CheckCircle size={16} />,
      update: <Edit size={16} />,
      security: <Shield size={16} />,
      logout: <LogOut size={16} />
    };
    return icons[type] || <Activity size={16} />;
  };

  const getActivityColor = (type) => {
    const colors = {
      login: '#10B981',
      update: '#3B82F6',
      security: '#F59E0B',
      logout: '#EF4444'
    };
    return colors[type] || '#6B7280';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <p>Chargement du profil...</p>
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
                <h1>Mon Profil</h1>
                <p>Gérez vos informations personnelles et paramètres de sécurité</p>
              </div>
              <div className="dashboard-actions">
                {isEditing ? (
                  <>
                    <button 
                      className="btn-secondary"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      <X size={16} />
                      Annuler
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                    >
                      <Save size={16} />
                      {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} />
                    Modifier le profil
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Profile Navigation */}
          <motion.div 
            className="profile-navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button 
              className={`profile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} />
              Informations
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={16} />
              Sécurité
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={16} />
              Activité
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={16} />
              Paramètres
            </button>
          </motion.div>

          {/* Profile Content */}
          <motion.div 
            className="profile-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  className="profile-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-grid">
                    {/* Avatar Section */}
                    <div className="avatar-section">
                      <div className="avatar-container">
                        <div className="avatar">
                          {profileData.avatar ? (
                            <img src={profileData.avatar} alt="Avatar" />
                          ) : (
                            <div className="avatar-placeholder">
                              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                            </div>
                          )}
                          {uploadingAvatar && (
                            <div className="avatar-loading">
                              <div className="loading-spinner"></div>
                            </div>
                          )}
                        </div>
                        <div className="avatar-actions">
                          <label className="avatar-upload-btn">
                            <Camera size={16} />
                            Changer
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="profile-stats">
                        <div className="stat-item">
                          <div className="stat-value">{stats.profileCompleteness}%</div>
                          <div className="stat-label">Profil complet</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">{stats.securityScore}%</div>
                          <div className="stat-label">Score sécurité</div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="profile-form">
                      <div className="form-section">
                        <h3>Informations personnelles</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Prénom</label>
                            <input
                              type="text"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="form-group">
                            <label>Nom</label>
                            <input
                              type="text"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Téléphone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Adresse</label>
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <h3>Informations professionnelles</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Poste</label>
                            <input
                              type="text"
                              name="position"
                              value={profileData.position}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="form-group">
                            <label>Département</label>
                            <input
                              type="text"
                              name="department"
                              value={profileData.department}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label>Date d'embauche</label>
                          <input
                            type="date"
                            name="joinDate"
                            value={profileData.joinDate}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <h3>Biographie</h3>
                        <div className="form-group">
                          <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            rows="4"
                            placeholder="Parlez-nous de vous..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  className="security-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="security-grid">
                    <div className="security-form">
                      <h3>Changer le mot de passe</h3>
                      <div className="form-group">
                        <label>Mot de passe actuel</label>
                        <div className="password-input">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                            placeholder="Entrez votre mot de passe actuel"
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
                      
                      <div className="form-group">
                        <label>Nouveau mot de passe</label>
                        <div className="password-input">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            placeholder="Entrez le nouveau mot de passe"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Confirmer le nouveau mot de passe</label>
                        <div className="password-input">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleSecurityChange}
                            placeholder="Confirmez le nouveau mot de passe"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="btn-primary"
                        onClick={handleChangePassword}
                        disabled={isLoading || !securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword}
                      >
                        <Key size={16} />
                        {isLoading ? 'Changement...' : 'Changer le mot de passe'}
                      </button>
                    </div>

                    <div className="security-settings">
                      <h3>Paramètres de sécurité</h3>
                      
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon">
                            <Shield size={20} />
                          </div>
                          <div>
                            <h4>Authentification à deux facteurs</h4>
                            <p>Sécurisez votre compte avec un code supplémentaire</p>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="twoFactorEnabled"
                            checked={securityData.twoFactorEnabled}
                            onChange={handleSecurityChange}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon">
                            <Bell size={20} />
                          </div>
                          <div>
                            <h4>Notifications par email</h4>
                            <p>Recevez des alertes par email</p>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={securityData.emailNotifications}
                            onChange={handleSecurityChange}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon">
                            <Phone size={20} />
                          </div>
                          <div>
                            <h4>Notifications SMS</h4>
                            <p>Recevez des alertes par SMS</p>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="smsNotifications"
                            checked={securityData.smsNotifications}
                            onChange={handleSecurityChange}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon">
                            <AlertCircle size={20} />
                          </div>
                          <div>
                            <h4>Alertes de connexion</h4>
                            <p>Être notifié des nouvelles connexions</p>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            name="loginAlerts"
                            checked={securityData.loginAlerts}
                            onChange={handleSecurityChange}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon">
                            <Clock size={20} />
                          </div>
                          <div>
                            <h4>Délai de session</h4>
                            <p>Déconnexion automatique après inactivité</p>
                          </div>
                        </div>
                        <select
                          name="sessionTimeout"
                          value={securityData.sessionTimeout}
                          onChange={handleSecurityChange}
                          className="session-timeout-select"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 heure</option>
                          <option value={120}>2 heures</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  className="activity-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="activity-grid">
                    <div className="activity-stats">
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Activity size={24} />
                        </div>
                        <div className="stat-content">
                          <h3>Connexions totales</h3>
                          <div className="stat-value">{stats.totalLogins}</div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Clock size={24} />
                        </div>
                        <div className="stat-content">
                          <h3>Sessions ce mois</h3>
                          <div className="stat-value">{stats.sessionsThisMonth}</div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Target size={24} />
                        </div>
                        <div className="stat-content">
                          <h3>Actions totales</h3>
                          <div className="stat-value">{stats.totalActions}</div>
                        </div>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Award size={24} />
                        </div>
                        <div className="stat-content">
                          <h3>Dernière connexion</h3>
                          <div className="stat-value">{formatDate(stats.lastLogin)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="activity-list">
                      <h3>Activité récente</h3>
                      <div className="activity-items">
                        {activities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            className="activity-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div 
                              className="activity-icon"
                              style={{ color: getActivityColor(activity.type) }}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="activity-content">
                              <div className="activity-header">
                                <h4>{activity.description}</h4>
                                <span className="activity-time">{formatDate(activity.timestamp)}</span>
                              </div>
                              <div className="activity-details">
                                <span className="activity-location">{activity.location}</span>
                                <span className="activity-device">{activity.device}</span>
                                <span className="activity-ip">IP: {activity.ip}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  className="settings-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="settings-grid">
                    <div className="settings-form">
                      <h3>Préférences générales</h3>
                      
                      <div className="form-group">
                        <label>Langue</label>
                        <select
                          name="language"
                          value={profileData.language}
                          onChange={handleInputChange}
                        >
                          <option value="Français">Français</option>
                          <option value="English">English</option>
                          <option value="Español">Español</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Fuseau horaire</label>
                        <select
                          name="timezone"
                          value={profileData.timezone}
                          onChange={handleInputChange}
                        >
                          <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                          <option value="Europe/London">Europe/London (UTC+0)</option>
                          <option value="America/New_York">America/New_York (UTC-5)</option>
                        </select>
                      </div>
                    </div>

                    <div className="settings-actions">
                      <h3>Actions du compte</h3>
                      
                      <div className="action-item">
                        <div className="action-info">
                          <div className="action-icon">
                            <Download size={20} />
                          </div>
                          <div>
                            <h4>Exporter mes données</h4>
                            <p>Télécharger toutes vos données personnelles</p>
                          </div>
                        </div>
                        <button className="btn-secondary">
                          Exporter
                        </button>
                      </div>

                      <div className="action-item">
                        <div className="action-info">
                          <div className="action-icon">
                            <Trash2 size={20} />
                          </div>
                          <div>
                            <h4>Supprimer le compte</h4>
                            <p>Supprimer définitivement votre compte</p>
                          </div>
                        </div>
                        <button className="btn-danger">
                          Supprimer
                        </button>
                      </div>
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

export default ProfileAdmin; 