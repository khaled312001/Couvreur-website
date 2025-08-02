import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Package, Truck, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, DollarSign, User, MapPin,
  Phone, Mail, FileText, Star, Award, Target, Printer
} from 'lucide-react';
import Invoice from '../../components/Invoice';
import { ordersApi } from '../../api/orders';

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
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service: '',
    description: '',
    priority: 'normal',
    status: 'en_attente',
    budget: '',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow by default
    address: ''
  });



  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await ordersApi.getAll();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    console.log('Input change:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new order
  const handleAddOrder = async () => {
    console.log('handleAddOrder called');
    console.log('formData:', formData);
    
    try {
      // Basic client-side validation
      if (!formData.client_name || !formData.client_email || !formData.client_phone || 
          !formData.service || !formData.description || !formData.budget || !formData.deadline || !formData.address) {
        console.log('Validation failed - missing fields');
        console.log('client_name:', formData.client_name);
        console.log('client_email:', formData.client_email);
        console.log('client_phone:', formData.client_phone);
        console.log('service:', formData.service);
        console.log('description:', formData.description);
        console.log('budget:', formData.budget);
        console.log('deadline:', formData.deadline);
        console.log('address:', formData.address);
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Ensure budget is a number
      const budget = parseFloat(formData.budget);
      if (isNaN(budget) || budget < 0) {
        alert('Le budget doit être un nombre positif.');
        return;
      }

      // Ensure deadline is in the future
      const deadline = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline <= today) {
        alert('La date d\'échéance doit être dans le futur.');
        return;
      }

      // Prepare data with proper types
      const orderData = {
        ...formData,
        budget: budget
      };

      console.log('Sending order data to server:', orderData);
      const response = await ordersApi.create(orderData);
      if (response.success) {
        setOrders(prev => [response.data, ...prev]);
        setShowAddModal(false);
        setFormData({
          client_name: '',
          client_email: '',
          client_phone: '',
          service: '',
          description: '',
          priority: 'normal',
          status: 'en_attente',
          budget: '',
          deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow by default
          address: ''
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert('Erreur lors de la création de la commande: ' + error.message);
    }
  };

  // Edit order
  const handleEditOrder = async () => {
    try {
      // Basic client-side validation
      if (!formData.client_name || !formData.client_email || !formData.client_phone || 
          !formData.service || !formData.description || !formData.budget || !formData.deadline || !formData.address) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Ensure budget is a number
      const budget = parseFloat(formData.budget);
      if (isNaN(budget) || budget < 0) {
        alert('Le budget doit être un nombre positif.');
        return;
      }

      // Ensure deadline is in the future
      const deadline = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline <= today) {
        alert('La date d\'échéance doit être dans le futur.');
        return;
      }

      // Prepare data with proper types
      const orderData = {
        ...formData,
        budget: budget
      };

      const response = await ordersApi.update(selectedOrder.id, orderData);
      if (response.success) {
        setOrders(prev => 
          prev.map(order => 
            order.id === selectedOrder.id 
              ? response.data
              : order
          )
        );
        setShowEditModal(false);
        setSelectedOrder(null);
        setFormData({
          client_name: '',
          client_email: '',
          client_phone: '',
          service: '',
          description: '',
          priority: 'normal',
          status: 'en_attente',
          budget: '',
          deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow by default
          address: ''
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
      alert('Erreur lors de la mise à jour de la commande: ' + error.message);
    }
  };

  // Delete order
  const handleDeleteOrder = async () => {
    try {
      const response = await ordersApi.delete(selectedOrder.id);
      if (response.success) {
        setOrders(prev => prev.filter(order => order.id !== selectedOrder.id));
        setShowDeleteConfirm(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
    }
  };

  // Toggle order status
  const handleToggleStatus = async (orderId, newStatus) => {
    try {
      const response = await ordersApi.updateStatus(orderId, newStatus);
      if (response.success) {
        setOrders(prev => 
          prev.map(order => 
            order.id === orderId 
              ? response.data
              : order
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  // Open edit modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setFormData({
      client_name: order.client_name,
      client_email: order.client_email,
      client_phone: order.client_phone,
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

  // Reset form data
  const resetFormData = () => {
    setFormData({
      client_name: '',
      client_email: '',
      client_phone: '',
      service: '',
      description: '',
      priority: 'normal',
      status: 'en_attente',
      budget: '',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow by default
      address: ''
    });
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
                                            <span className="detail-value">{order.client_name}</span>
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
                    className="action-btn" 
                    title="Imprimer la facture"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowInvoiceModal(true);
                    }}
                  >
                    <Printer size={16} />
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
                onClick={() => {
                  resetFormData();
                  setShowAddModal(true);
                }}
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
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="client_email"
                          value={formData.client_email}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          name="client_phone"
                          value={formData.client_phone}
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
                      disabled={!formData.client_name || !formData.service}
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
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleInputChange}
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="client_email"
                          value={formData.client_email}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input
                          type="tel"
                          name="client_phone"
                          value={formData.client_phone}
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
                      disabled={!formData.client_name || !formData.service}
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
                                color: getStatusColor(selectedOrder.status) 
                              }}
                            >
                              {getStatusText(selectedOrder.status)}
                            </span>
                            <span 
                              className="priority-badge"
                              style={{ 
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
                            <span>{selectedOrder.client_name}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Mail size={16} />
                          <div>
                            <label>Email</label>
                            <span>{selectedOrder.client_email}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Phone size={16} />
                          <div>
                            <label>Téléphone</label>
                            <span>{selectedOrder.client_phone}</span>
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
                        setShowInvoiceModal(true);
                      }}
                    >
                      <Printer size={16} />
                      Imprimer Facture
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
                      <p>Cette action est irréversible et supprimera définitivement la commande "{selectedOrder.service}" pour {selectedOrder.client_name}.</p>
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

          {/* Invoice Modal */}
          <AnimatePresence>
            {showInvoiceModal && selectedOrder && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInvoiceModal(false)}
              >
                <Invoice 
                  order={selectedOrder} 
                  onClose={() => setShowInvoiceModal(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin; 