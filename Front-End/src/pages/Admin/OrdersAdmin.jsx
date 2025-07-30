import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Package, Truck, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, DollarSign, User, MapPin,
  Phone, Mail, FileText, Star, Award, Target
} from 'lucide-react';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    description: '',
    priority: 'normal',
    status: 'en_attente',
    budget: '',
    deadline: '',
    address: ''
  });

  // Mock orders data
  const mockOrders = [
    {
      id: 1,
      clientName: 'Jean Dupont',
      clientEmail: 'jean.dupont@email.com',
      clientPhone: '+33 1 23 45 67 89',
      service: 'Installation de Toiture',
      description: 'Installation complète d\'une toiture en tuiles pour maison de 120m²',
      priority: 'urgent',
      status: 'en_cours',
      budget: 8500,
      deadline: '2025-02-15',
      address: '123 Rue de la Paix, 75001 Paris',
      createdAt: '2025-01-15',
      estimatedDuration: '2-3 semaines'
    },
    {
      id: 2,
      clientName: 'Marie Martin',
      clientEmail: 'marie.martin@email.com',
      clientPhone: '+33 1 23 45 67 90',
      service: 'Réparation de Charpente',
      description: 'Réparation urgente de la charpente après tempête',
      priority: 'urgent',
      status: 'en_attente',
      budget: 3200,
      deadline: '2025-01-25',
      address: '456 Avenue des Champs, 75008 Paris',
      createdAt: '2025-01-14',
      estimatedDuration: '1 semaine'
    },
    {
      id: 3,
      clientName: 'Pierre Durand',
      clientEmail: 'pierre.durand@email.com',
      clientPhone: '+33 1 23 45 67 91',
      service: 'Maintenance Annuelle',
      description: 'Maintenance préventive de la toiture et nettoyage des gouttières',
      priority: 'normal',
      status: 'planifié',
      budget: 1200,
      deadline: '2025-02-01',
      address: '789 Boulevard Saint-Germain, 75006 Paris',
      createdAt: '2025-01-13',
      estimatedDuration: '3-4 jours'
    },
    {
      id: 4,
      clientName: 'Sophie Bernard',
      clientEmail: 'sophie.bernard@email.com',
      clientPhone: '+33 1 23 45 67 92',
      service: 'Installation Étanchéité',
      description: 'Installation d\'une membrane d\'étanchéité pour terrasse',
      priority: 'normal',
      status: 'terminé',
      budget: 4500,
      deadline: '2025-01-20',
      address: '321 Rue de Rivoli, 75001 Paris',
      createdAt: '2025-01-12',
      estimatedDuration: '1-2 semaines'
    },
    {
      id: 5,
      clientName: 'Lucas Moreau',
      clientEmail: 'lucas.moreau@email.com',
      clientPhone: '+33 1 23 45 67 93',
      service: 'Zinguerie',
      description: 'Remplacement complet de la zinguerie et descentes d\'eau',
      priority: 'normal',
      status: 'en_attente',
      budget: 2800,
      deadline: '2025-02-10',
      address: '654 Rue du Commerce, 75015 Paris',
      createdAt: '2025-01-11',
      estimatedDuration: '1 semaine'
    },
    {
      id: 6,
      clientName: 'Emma Petit',
      clientEmail: 'emma.petit@email.com',
      clientPhone: '+33 1 23 45 67 94',
      service: 'Démoussage',
      description: 'Nettoyage professionnel de la toiture et traitement anti-mousse',
      priority: 'faible',
      status: 'planifié',
      budget: 800,
      deadline: '2025-02-05',
      address: '987 Avenue de la République, 75011 Paris',
      createdAt: '2025-01-10',
      estimatedDuration: '1 jour'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    const colors = {
      en_attente: '#F59E0B',
      en_cours: '#3B82F6',
      planifié: '#8B5CF6',
      terminé: '#10B981',
      annulé: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      en_attente: 'En attente',
      en_cours: 'En cours',
      planifié: 'Planifié',
      terminé: 'Terminé',
      annulé: 'Annulé'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#EF4444',
      normal: '#3B82F6',
      faible: '#10B981'
    };
    return colors[priority] || '#6B7280';
  };

  const getPriorityText = (priority) => {
    const texts = {
      urgent: 'Urgent',
      normal: 'Normal',
      faible: 'Faible'
    };
    return texts[priority] || priority;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new order
  const handleAddOrder = () => {
    const newOrder = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDuration: 'À déterminer'
    };
    setOrders(prev => [newOrder, ...prev]);
    setShowAddModal(false);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      description: '',
      priority: 'normal',
      status: 'en_attente',
      budget: '',
      deadline: '',
      address: ''
    });
  };

  // Edit order
  const handleEditOrder = () => {
    setOrders(prev => 
      prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, ...formData }
          : order
      )
    );
    setShowEditModal(false);
    setSelectedOrder(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      description: '',
      priority: 'normal',
      status: 'en_attente',
      budget: '',
      deadline: '',
      address: ''
    });
  };

  // Delete order
  const handleDeleteOrder = () => {
    setOrders(prev => prev.filter(order => order.id !== selectedOrder.id));
    setShowDeleteConfirm(false);
    setSelectedOrder(null);
  };

  // Toggle order status
  const handleToggleStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Open edit modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setFormData({
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      clientPhone: order.clientPhone,
      service: order.service,
      description: order.description,
      priority: order.priority,
      status: order.status,
      budget: order.budget.toString(),
      deadline: order.deadline,
      address: order.address
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (order) => {
    setSelectedOrder(order);
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
              <p>Chargement des commandes...</p>
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
                <h1>Gestion des Commandes</h1>
                <p>Gérez vos commandes et projets de construction</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Nouvelle commande
                </button>
                <button className="btn-secondary">
                  <Package size={16} />
                  Rapports
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
                <Package size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Commandes</h3>
                <div className="stat-value">{orders.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +3 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>En Attente</h3>
                <div className="stat-value">{orders.filter(o => o.status === 'en_attente').length}</div>
                <div className="stat-trend trend-down">
                  <AlertCircle size={14} />
                  À traiter
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <Truck size={24} />
              </div>
              <div className="stat-content">
                <h3>En Cours</h3>
                <div className="stat-value">{orders.filter(o => o.status === 'en_cours').length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  Actifs
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <h3>Chiffre d'Affaires</h3>
                <div className="stat-value">€{orders.reduce((sum, order) => sum + order.budget, 0).toLocaleString()}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +15% ce mois
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
                  placeholder="Rechercher une commande..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  Tous
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'en_attente' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('en_attente')}
                >
                  En attente
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'en_cours' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('en_cours')}
                >
                  En cours
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'terminé' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('terminé')}
                >
                  Terminés
                </button>
              </div>

              <div className="priority-filters">
                <button 
                  className={`filter-btn ${filterPriority === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterPriority('all')}
                >
                  Toutes priorités
                </button>
                <button 
                  className={`filter-btn ${filterPriority === 'urgent' ? 'active' : ''}`}
                  onClick={() => setFilterPriority('urgent')}
                >
                  Urgents
                </button>
                <button 
                  className={`filter-btn ${filterPriority === 'normal' ? 'active' : ''}`}
                  onClick={() => setFilterPriority('normal')}
                >
                  Normales
                </button>
              </div>
            </div>
          </motion.div>

          {/* Orders Grid */}
          <motion.div 
            className="orders-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="order-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="order-header">
                  <div className="order-info">
                    <h3>{order.service}</h3>
                    <p>{order.description}</p>
                  </div>
                  <div className="order-status">
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(order.status) + '20', 
                        color: getStatusColor(order.status),
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(order.id, order.status === 'en_attente' ? 'en_cours' : 'en_attente')}
                      title="Cliquer pour changer le statut"
                    >
                      {getStatusText(order.status)}
                    </button>
                    <span 
                      className="priority-badge"
                      style={{ 
                        backgroundColor: getPriorityColor(order.priority) + '20', 
                        color: getPriorityColor(order.priority) 
                      }}
                    >
                      {getPriorityText(order.priority)}
                    </span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Client:</span>
                    <span className="detail-value">{order.clientName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Budget:</span>
                    <span className="detail-value">€{order.budget.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Échéance:</span>
                    <span className="detail-value">{new Date(order.deadline).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Durée estimée:</span>
                    <span className="detail-value">{order.estimatedDuration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Créé le:</span>
                    <span className="detail-value">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="order-actions">
                  <button 
                    className="action-btn" 
                    title="Voir les détails"
                    onClick={() => openViewModal(order)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Modifier"
                    onClick={() => openEditModal(order)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn danger" 
                    title="Supprimer"
                    onClick={() => openDeleteConfirm(order)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Package size={48} />
              <h3>Aucune commande trouvée</h3>
              <p>Aucune commande ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Ajouter une commande
              </button>
            </motion.div>
          )}

          {/* Add Order Modal */}
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
                    <h2>Ajouter une nouvelle commande</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Nom du client</label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="clientEmail"
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          name="clientPhone"
                          value={formData.clientPhone}
                          onChange={handleInputChange}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Service</label>
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        placeholder="Ex: Installation de Toiture"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du projet..."
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Priorité</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                        >
                          <option value="faible">Faible</option>
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Statut</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="en_attente">En attente</option>
                          <option value="planifié">Planifié</option>
                          <option value="en_cours">En cours</option>
                          <option value="terminé">Terminé</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Budget (€)</label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="Ex: 5000"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Échéance</label>
                        <input
                          type="date"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Adresse complète du projet"
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
                      onClick={handleAddOrder}
                      disabled={!formData.clientName || !formData.service}
                    >
                      <Save size={16} />
                      Ajouter la commande
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Order Modal */}
          <AnimatePresence>
            {showEditModal && selectedOrder && (
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
                    <h2>Modifier la commande</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Nom du client</label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="clientEmail"
                          value={formData.clientEmail}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          name="clientPhone"
                          value={formData.clientPhone}
                          onChange={handleInputChange}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Service</label>
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        placeholder="Ex: Installation de Toiture"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du projet..."
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Priorité</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                        >
                          <option value="faible">Faible</option>
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Statut</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="en_attente">En attente</option>
                          <option value="planifié">Planifié</option>
                          <option value="en_cours">En cours</option>
                          <option value="terminé">Terminé</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Budget (€)</label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="Ex: 5000"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Échéance</label>
                        <input
                          type="date"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Adresse complète du projet"
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
                      onClick={handleEditOrder}
                      disabled={!formData.clientName || !formData.service}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Order Modal */}
          <AnimatePresence>
            {showViewModal && selectedOrder && (
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
                    <h2>Détails de la commande</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="order-detail-view">
                      <div className="order-detail-header">
                        <div className="order-detail-icon">
                          <Package size={32} />
                        </div>
                        <div className="order-detail-info">
                          <h3>{selectedOrder.service}</h3>
                          <div className="order-detail-badges">
                            <span 
                              className="status-badge"
                              style={{ 
                                backgroundColor: getStatusColor(selectedOrder.status) + '20', 
                                color: getStatusColor(selectedOrder.status) 
                              }}
                            >
                              {getStatusText(selectedOrder.status)}
                            </span>
                            <span 
                              className="priority-badge"
                              style={{ 
                                backgroundColor: getPriorityColor(selectedOrder.priority) + '20', 
                                color: getPriorityColor(selectedOrder.priority) 
                              }}
                            >
                              {getPriorityText(selectedOrder.priority)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="order-detail-description">
                        <h4>Description</h4>
                        <p>{selectedOrder.description}</p>
                      </div>
                      
                      <div className="order-detail-grid">
                        <div className="detail-grid-item">
                          <User size={16} />
                          <div>
                            <label>Client</label>
                            <span>{selectedOrder.clientName}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Mail size={16} />
                          <div>
                            <label>Email</label>
                            <span>{selectedOrder.clientEmail}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Phone size={16} />
                          <div>
                            <label>Téléphone</label>
                            <span>{selectedOrder.clientPhone}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <MapPin size={16} />
                          <div>
                            <label>Adresse</label>
                            <span>{selectedOrder.address}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <DollarSign size={16} />
                          <div>
                            <label>Budget</label>
                            <span>€{selectedOrder.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Échéance</label>
                            <span>{new Date(selectedOrder.deadline).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Clock size={16} />
                          <div>
                            <label>Durée estimée</label>
                            <span>{selectedOrder.estimatedDuration}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Créé le</label>
                            <span>{new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR')}</span>
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
                        openEditModal(selectedOrder);
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
            {showDeleteConfirm && selectedOrder && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer cette commande ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement la commande "{selectedOrder.service}" pour {selectedOrder.clientName}.</p>
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
                      onClick={handleDeleteOrder}
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

export default OrdersAdmin; 