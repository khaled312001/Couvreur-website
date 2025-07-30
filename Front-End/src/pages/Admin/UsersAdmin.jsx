import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Users, UserPlus, Shield, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, Mail, Phone, User, Lock, Unlock
} from 'lucide-react';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    role: 'user',
    status: 'active',
    phone: '',
    avatar: ''
  });

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: 'Admin Principal',
      email: 'admin@bnbuilding.fr',
      role: 'admin',
      status: 'active',
      phone: '+33 1 23 45 67 89',
      avatar: 'A',
      lastLogin: '2025-01-15T10:30:00',
      createdAt: '2025-01-01'
    },
    {
      id: 2,
      name: 'Jean Dupont',
      email: 'jean.dupont@bnbuilding.fr',
      role: 'manager',
      status: 'active',
      phone: '+33 1 23 45 67 90',
      avatar: 'J',
      lastLogin: '2025-01-14T15:45:00',
      createdAt: '2025-01-05'
    },
    {
      id: 3,
      name: 'Marie Martin',
      email: 'marie.martin@bnbuilding.fr',
      role: 'user',
      status: 'active',
      phone: '+33 1 23 45 67 91',
      avatar: 'M',
      lastLogin: '2025-01-13T09:15:00',
      createdAt: '2025-01-10'
    },
    {
      id: 4,
      name: 'Pierre Durand',
      email: 'pierre.durand@bnbuilding.fr',
      role: 'user',
      status: 'inactive',
      phone: '+33 1 23 45 67 92',
      avatar: 'P',
      lastLogin: '2025-01-10T14:20:00',
      createdAt: '2025-01-08'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

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

  const getStatusColor = (status) => {
    const colors = {
      active: '#10B981',
      inactive: '#EF4444',
      pending: '#F59E0B'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente'
    };
    return texts[status] || status;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new user
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      ...formData,
      avatar: formData.name.charAt(0).toUpperCase(),
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      phone: '',
      avatar: ''
    });
  };

  // Edit user
  const handleEditUser = () => {
    setUsers(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData }
          : user
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
      phone: '',
      avatar: ''
    });
  };

  // Delete user
  const handleDeleteUser = () => {
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  // Toggle user status
  const handleToggleStatus = (userId) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone,
      avatar: user.avatar
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
                <button className="btn-secondary">
                  <Shield size={16} />
                  Permissions
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
                <div className="stat-value">{users.filter(u => u.status === 'active').length}</div>
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
                    {user.avatar}
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-status">
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(user.status) + '20', 
                        color: getStatusColor(user.status),
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
                      {getStatusText(user.status)}
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
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Créé le:</span>
                    <span className="detail-value">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
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
                    
                    <div className="form-row">
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
                        <label>Statut</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Actif</option>
                          <option value="inactive">Inactif</option>
                          <option value="pending">En attente</option>
                        </select>
                      </div>
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
                    
                    <div className="form-row">
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
                        <label>Statut</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Actif</option>
                          <option value="inactive">Inactif</option>
                          <option value="pending">En attente</option>
                        </select>
                      </div>
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
                          {selectedUser.avatar}
                        </div>
                        <div className="user-detail-info">
                          <h3>{selectedUser.name}</h3>
                          <span 
                            className="status-badge"
                            style={{ 
                              backgroundColor: getStatusColor(selectedUser.status) + '20', 
                              color: getStatusColor(selectedUser.status) 
                            }}
                          >
                            {getStatusText(selectedUser.status)}
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
                            <span>{new Date(selectedUser.lastLogin).toLocaleDateString('fr-FR')}</span>
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