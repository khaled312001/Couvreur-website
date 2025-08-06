import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  FileText, Settings, CheckCircle, AlertCircle, Clock, Calendar,
  X, Save, User, DollarSign, Package, Eye as EyeIcon, Clock as ClockIcon
} from 'lucide-react';

const QuotesAdmin = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    description: '',
    montant: '',
    status: 'pending',
    priority: 'normal',
    deadline: ''
  });

  // Mock quotes data
  const mockQuotes = [
    {
      id: 1,
      clientName: 'Jean Dupont',
      clientEmail: 'jean.dupont@email.com',
      clientPhone: '+33 1 23 45 67 89',
      service: 'Rénovation Toiture',
      description: 'Rénovation complète d\'une toiture en tuiles avec isolation thermique',
      montant: '8500',
      status: 'approved',
      priority: 'urgent',
      deadline: '2024-02-15',
      createdAt: '2024-01-15',
      approvedAt: '2024-01-16'
    },
    {
      id: 2,
      clientName: 'Marie Martin',
      clientEmail: 'marie.martin@email.com',
      clientPhone: '+33 1 23 45 67 90',
      service: 'Installation Zinguerie',
      description: 'Installation de zinguerie en zinc pour maison individuelle',
      montant: '3200',
      status: 'pending',
      priority: 'normal',
      deadline: '2024-02-20',
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      clientName: 'Pierre Durand',
      clientEmail: 'pierre.durand@email.com',
      clientPhone: '+33 1 23 45 67 91',
      service: 'Réparation Urgente',
      description: 'Réparation d\'urgence suite à une fuite de toiture',
      montant: '1800',
      status: 'approved',
      priority: 'urgent',
      deadline: '2024-01-25',
      createdAt: '2024-01-13',
      approvedAt: '2024-01-14'
    },
    {
      id: 4,
      clientName: 'Sophie Bernard',
      clientEmail: 'sophie.bernard@email.com',
      clientPhone: '+33 1 23 45 67 92',
      service: 'Maintenance Annuelle',
      description: 'Entretien préventif et maintenance annuelle de toiture',
      montant: '450',
      status: 'pending',
      priority: 'faible',
      deadline: '2024-03-01',
      createdAt: '2024-01-12'
    },
    {
      id: 5,
      clientName: 'Lucas Moreau',
      clientEmail: 'lucas.moreau@email.com',
      clientPhone: '+33 1 23 45 67 93',
      service: 'Construction Charpente',
      description: 'Construction complète de charpente traditionnelle',
      montant: '12500',
      status: 'approved',
      priority: 'normal',
      deadline: '2024-03-15',
      createdAt: '2024-01-11',
      approvedAt: '2024-01-12'
    },
    {
      id: 6,
      clientName: 'Emma Petit',
      clientEmail: 'emma.petit@email.com',
      clientPhone: '+33 1 23 45 67 94',
      service: 'Installation Couverture',
      description: 'Installation de couverture en ardoise avec isolation',
      montant: '6800',
      status: 'rejected',
      priority: 'normal',
      deadline: '2024-02-10',
      createdAt: '2024-01-10'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setQuotes(mockQuotes);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      approved: '#10B981',
      pending: '#F59E0B',
      rejected: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      approved: 'Approuvé',
      pending: 'En attente',
      rejected: 'Rejeté'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#EF4444',
      normal: '#F59E0B',
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

  // Add new quote
  const handleAddQuote = () => {
    const newQuote = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuotes(prev => [newQuote, ...prev]);
    setShowAddModal(false);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      description: '',
      montant: '',
      status: 'pending',
      priority: 'normal',
      deadline: ''
    });
  };

  // Edit quote
  const handleEditQuote = () => {
    setQuotes(prev => 
      prev.map(quote => 
        quote.id === selectedQuote.id 
          ? { ...quote, ...formData }
          : quote
      )
    );
    setShowEditModal(false);
    setSelectedQuote(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      description: '',
      montant: '',
      status: 'pending',
      priority: 'normal',
      deadline: ''
    });
  };

  // Delete quote
  const handleDeleteQuote = () => {
    setQuotes(prev => prev.filter(quote => quote.id !== selectedQuote.id));
    setShowDeleteConfirm(false);
    setSelectedQuote(null);
  };

  // Toggle quote status
  const handleToggleStatus = (quoteId, newStatus) => {
    setQuotes(prev => 
      prev.map(quote => 
        quote.id === quoteId 
          ? { 
              ...quote, 
              status: newStatus,
              approvedAt: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : null
            }
          : quote
      )
    );
  };

  // Open edit modal
  const openEditModal = (quote) => {
    setSelectedQuote(quote);
    setFormData({
      clientName: quote.clientName,
      clientEmail: quote.clientEmail,
      clientPhone: quote.clientPhone,
      service: quote.service,
      description: quote.description,
      montant: quote.montant,
      status: quote.status,
      priority: quote.priority,
      deadline: quote.deadline
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (quote) => {
    setSelectedQuote(quote);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (quote) => {
    setSelectedQuote(quote);
    setShowDeleteConfirm(true);
  };

  // Handle settings
  const handleSettings = () => {
    // Simulate settings functionality
    console.log('Opening quotes settings');
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
              <p>Chargement des devis...</p>
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
                <h1>Gestion des Devis</h1>
                <p>Gérez vos devis et estimations clients</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Nouveau devis
                </button>
                <button 
                  className="btn-secondary"
                  onClick={handleSettings}
                >
                  <Settings size={16} />
                  Paramètres
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
                <FileText size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Devis</h3>
                <div className="stat-value">{quotes.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +8 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Approuvés</h3>
                <div className="stat-value">{quotes.filter(q => q.status === 'approved').length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  50% approuvés
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>En attente</h3>
                <div className="stat-value">{quotes.filter(q => q.status === 'pending').length}</div>
                <div className="stat-trend trend-down">
                  <AlertCircle size={14} />
                  À traiter
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <h3>Valeur Totale</h3>
                <div className="stat-value">{quotes.reduce((sum, quote) => sum + parseFloat(quote.montant), 0).toLocaleString('fr-FR')}€</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +12% ce mois
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
                  placeholder="Rechercher un devis..." 
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
                  className={`filter-btn ${filterStatus === 'approved' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('approved')}
                >
                  Approuvés
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('pending')}
                >
                  En attente
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('rejected')}
                >
                  Rejetés
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quotes Grid */}
          <motion.div 
            className="quotes-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                className="quote-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="quote-header">
                  <div className="quote-client">
                    <div className="client-avatar">
                      {quote.clientName.charAt(0)}
                    </div>
                    <div className="client-info">
                      <h3>{quote.clientName}</h3>
                      <p>{quote.service}</p>
                    </div>
                  </div>
                  <div className="quote-amount">
                    <span className="amount">{quote.montant}€</span>
                  </div>
                </div>

                <div className="quote-content">
                  <p>{quote.description}</p>
                </div>

                <div className="quote-details">
                  <div className="detail-item">
                    <span className="detail-label">Priorité:</span>
                    <span 
                      className="priority-badge"
                      style={{
                        backgroundColor: getPriorityColor(quote.priority) + '20',
                        color: getPriorityColor(quote.priority)
                      }}
                    >
                      {getPriorityText(quote.priority)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Échéance:</span>
                    <span className="detail-value">{new Date(quote.deadline).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Créé le:</span>
                    <span className="detail-value">{new Date(quote.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {quote.approvedAt && (
                    <div className="detail-item">
                      <span className="detail-label">Approuvé le:</span>
                      <span className="detail-value">{new Date(quote.approvedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                <div className="quote-actions">
                  <button
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(quote.status) + '20', 
                      color: getStatusColor(quote.status),
                      cursor: 'pointer',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    onClick={() => handleToggleStatus(quote.id, quote.status === 'approved' ? 'pending' : 'approved')}
                    title="Cliquer pour changer le statut"
                  >
                    {getStatusText(quote.status)}
                  </button>
                  
                  <div className="action-buttons">
                    <button 
                      className="action-btn" 
                      title="Voir"
                      onClick={() => openViewModal(quote)}
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      className="action-btn" 
                      title="Modifier"
                      onClick={() => openEditModal(quote)}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="action-btn danger" 
                      title="Supprimer"
                      onClick={() => openDeleteConfirm(quote)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredQuotes.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FileText size={48} />
              <h3>Aucun devis trouvé</h3>
              <p>Aucun devis ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Nouveau devis
              </button>
            </motion.div>
          )}

          {/* Add Quote Modal */}
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
                    <h2>Nouveau devis</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-row">
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
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service</label>
                        <input
                          type="text"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          placeholder="Ex: Rénovation Toiture"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Montant (€)</label>
                        <input
                          type="number"
                          name="montant"
                          value={formData.montant}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
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
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du projet..."
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="pending">En attente</option>
                        <option value="approved">Approuvé</option>
                        <option value="rejected">Rejeté</option>
                      </select>
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
                      onClick={handleAddQuote}
                      disabled={!formData.clientName || !formData.service || !formData.montant}
                    >
                      <Save size={16} />
                      Créer le devis
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Quote Modal */}
          <AnimatePresence>
            {showEditModal && selectedQuote && (
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
                    <h2>Modifier le devis</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-row">
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
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service</label>
                        <input
                          type="text"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          placeholder="Ex: Rénovation Toiture"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Montant (€)</label>
                        <input
                          type="number"
                          name="montant"
                          value={formData.montant}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
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
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du projet..."
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="pending">En attente</option>
                        <option value="approved">Approuvé</option>
                        <option value="rejected">Rejeté</option>
                      </select>
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
                      onClick={handleEditQuote}
                      disabled={!formData.clientName || !formData.service || !formData.montant}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Quote Modal */}
          <AnimatePresence>
            {showViewModal && selectedQuote && (
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
                    <h2>Détails du devis</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="quote-detail-view">
                      <div className="quote-detail-header">
                        <div className="client-detail">
                          <div className="client-avatar-large">
                            {selectedQuote.clientName.charAt(0)}
                          </div>
                          <div className="client-info-detail">
                            <h3>{selectedQuote.clientName}</h3>
                            <p>{selectedQuote.clientEmail}</p>
                            <p>{selectedQuote.clientPhone}</p>
                          </div>
                        </div>
                        
                        <div className="quote-amount-detail">
                          <span className="amount-large">{selectedQuote.montant}€</span>
                        </div>
                      </div>
                      
                      <div className="quote-content-detail">
                        <h4>Service</h4>
                        <p>{selectedQuote.service}</p>
                        
                        <h4>Description</h4>
                        <p>{selectedQuote.description}</p>
                      </div>
                      
                      <div className="quote-details-grid">
                        <div className="detail-grid-item">
                          <Package size={16} />
                          <div>
                            <label>Service</label>
                            <span>{selectedQuote.service}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Échéance</label>
                            <span>{new Date(selectedQuote.deadline).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Créé le</label>
                            <span>{new Date(selectedQuote.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        {selectedQuote.approvedAt && (
                          <div className="detail-grid-item">
                            <CheckCircle size={16} />
                            <div>
                              <label>Approuvé le</label>
                              <span>{new Date(selectedQuote.approvedAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="quote-detail-actions">
                        <button className="btn-secondary">
                          <FileText size={16} />
                          Télécharger PDF
                        </button>
                        <button className="btn-secondary">
                          <Package size={16} />
                          Convertir en commande
                        </button>
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
                        openEditModal(selectedQuote);
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
            {showDeleteConfirm && selectedQuote && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer ce devis ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement le devis de {selectedQuote.clientName}.</p>
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
                      onClick={handleDeleteQuote}
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

export default QuotesAdmin;
