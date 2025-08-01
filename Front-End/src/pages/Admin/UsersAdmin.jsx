import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Users, UserPlus, Shield, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, Mail, Phone, User, Lock, Unlock
} from 'lucide-react';
import { usersApi } from '../../api/users';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    address: ''
  });

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersApi.getUsers();
      setUsers(response.data || response);
      setFilteredUsers(response.data || response);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users
  useEffect(() => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => 
        filterStatus === 'active' ? user.is_active : !user.is_active
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const getRoleColor = (role) => {
    const colors = {
      admin: '#EF4444',
      manager: '#F59E0B',
      user: '#3B82F6'
    };
    return colors[role] || '#6B7280';
  };

  const getRoleText = (role) => {
    const texts = {
      admin: 'Administrateur',
      manager: 'Gestionnaire',
      user: 'Utilisateur'
    };
    return texts[role] || role;
  };

  const getStatusColor = (isActive) => {
    return isActive ? '#10B981' : '#6B7280';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Actif' : 'Inactif';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? CheckCircle : AlertCircle;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      await usersApi.createUser(formData);
      await loadUsers();
      setShowAddModal(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  // Edit user
  const handleEditUser = async () => {
    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      await usersApi.updateUser(selectedUser.id, updateData);
      await loadUsers();
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Erreur lors de la modification de l\'utilisateur');
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    try {
      await usersApi.deleteUser(selectedUser.id);
      await loadUsers();
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  // Toggle user status
  const handleToggleStatus = async (userId) => {
    try {
      await usersApi.toggleUserStatus(userId);
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Don't show current password
      role: user.role,
      phone: user.phone || '',
      address: user.address || ''
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
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
              <p>Chargement des utilisateurs...</p>
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
                onClick={loadUsers}
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
                <h1>Gestion des Utilisateurs</h1>
                <p>Gérez les comptes utilisateurs et permissions</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Nouvel utilisateur
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="quick-stats-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#3B82F6' + '20', color: '#3B82F6' }}>
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Utilisateurs</h3>
                <div className="stat-value">{users.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +1 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Utilisateurs Actifs</h3>
                <div className="stat-value">{users.filter(u => u.is_active).length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  75% actifs
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Shield size={24} />
              </div>
              <div className="stat-content">
                <h3>Administrateurs</h3>
                <div className="stat-value">{users.filter(u => u.role === 'admin').length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  Accès complet
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>Dernière Connexion</h3>
                <div className="stat-value">Aujourd'hui</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  En ligne
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            className="filters-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="filters-content">
              <div className="search-box">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Rechercher un utilisateur..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterRole === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterRole('all')}
                >
                  Tous les rôles
                </button>
                <button 
                  className={`filter-btn ${filterRole === 'admin' ? 'active' : ''}`}
                  onClick={() => setFilterRole('admin')}
                >
                  Administrateurs
                </button>
                <button 
                  className={`filter-btn ${filterRole === 'manager' ? 'active' : ''}`}
                  onClick={() => setFilterRole('manager')}
                >
                  Gestionnaires
                </button>
                <button 
                  className={`filter-btn ${filterRole === 'user' ? 'active' : ''}`}
                  onClick={() => setFilterRole('user')}
                >
                  Utilisateurs
                </button>
              </div>
            </div>
          </motion.div>

          {/* Users Grid */}
          <motion.div 
            className="users-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="user-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="user-header">
                  <div className="user-avatar">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-status">
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(user.is_active) + '20', 
                        color: getStatusColor(user.is_active),
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(user.id)}
                      title="Cliquer pour changer le statut"
                    >
                      {getStatusText(user.is_active)}
                    </button>
                  </div>
                </div>

                <div className="user-details">
                  <div className="detail-item">
                    <span className="detail-label">Rôle:</span>
                    <span 
                      className="detail-value"
                      style={{ color: getRoleColor(user.role) }}
                    >
                      {getRoleText(user.role)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Téléphone:</span>
                    <span className="detail-value">{user.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dernière connexion:</span>
                    <span className="detail-value">
                      {user.last_login ? new Date(user.last_login).toLocaleDateString('fr-FR') : 'Aucune'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Créé le:</span>
                    <span className="detail-value">
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="user-actions">
                  <button 
                    className="action-btn" 
                    title="Voir les détails"
                    onClick={() => openViewModal(user)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Modifier"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn danger" 
                    title="Supprimer"
                    onClick={() => openDeleteConfirm(user)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Users size={48} />
              <h3>Aucun utilisateur trouvé</h3>
              <p>Aucun utilisateur ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Ajouter un utilisateur
              </button>
            </motion.div>
          )}

          {/* Add User Modal */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h2>Ajouter un nouvel utilisateur</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: jean.dupont@bnbuilding.fr"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Mot de passe</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Mot de passe"
                      />
                    </div>

                    <div className="form-group">
                      <label>Rôle</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="user">Utilisateur</option>
                        <option value="manager">Gestionnaire</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: +33 1 23 45 67 89"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Ex: 123 Rue de la Construction, 75001 Paris, France"
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={handleAddUser}
                      disabled={!formData.name || !formData.email}
                    >
                      <Save size={16} />
                      Ajouter l'utilisateur
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit User Modal */}
          <AnimatePresence>
            {showEditModal && selectedUser && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEditModal(false)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h2>Modifier l'utilisateur</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: jean.dupont@bnbuilding.fr"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Mot de passe</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Mot de passe (laisser vide pour ne pas changer)"
                      />
                    </div>

                    <div className="form-group">
                      <label>Rôle</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="user">Utilisateur</option>
                        <option value="manager">Gestionnaire</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: +33 1 23 45 67 89"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Ex: 123 Rue de la Construction, 75001 Paris, France"
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={handleEditUser}
                      disabled={!formData.name || !formData.email}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View User Modal */}
          <AnimatePresence>
            {showViewModal && selectedUser && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowViewModal(false)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h2>Détails de l'utilisateur</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="user-detail-view">
                      <div className="user-detail-header">
                        <div className="user-detail-avatar">
                          {selectedUser.name?.charAt(0)}
                        </div>
                        <div className="user-detail-info">
                          <h3>{selectedUser.name}</h3>
                          <span 
                            className="status-badge"
                            style={{ 
                              backgroundColor: getStatusColor(selectedUser.is_active) + '20', 
                              color: getStatusColor(selectedUser.is_active) 
                            }}
                          >
                            {getStatusText(selectedUser.is_active)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="user-detail-grid">
                        <div className="detail-grid-item">
                          <Mail size={16} />
                          <div>
                            <label>Email</label>
                            <span>{selectedUser.email}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Shield size={16} />
                          <div>
                            <label>Rôle</label>
                            <span style={{ color: getRoleColor(selectedUser.role) }}>
                              {getRoleText(selectedUser.role)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Phone size={16} />
                          <div>
                            <label>Téléphone</label>
                            <span>{selectedUser.phone}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Dernière connexion</label>
                            <span>{selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleDateString('fr-FR') : 'Aucune'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowViewModal(false)}
                    >
                      Fermer
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setShowViewModal(false);
                        openEditModal(selectedUser);
                      }}
                    >
                      <Edit size={16} />
                      Modifier
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && selectedUser && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                <motion.div 
                  className="modal-content delete-confirm"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h2>Confirmer la suppression</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="delete-confirm-content">
                      <AlertCircle size={48} color="#EF4444" />
                      <h3>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement l'utilisateur "{selectedUser.name}".</p>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={handleDeleteUser}
                    >
                      <Trash2 size={16} />
                      Supprimer définitivement
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin; 