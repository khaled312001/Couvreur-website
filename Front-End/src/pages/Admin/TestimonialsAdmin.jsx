import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  MessageSquare, Settings, CheckCircle, AlertCircle, Clock, Upload,
  X, Save, Star, User, Calendar, ThumbsUp, ThumbsDown
} from 'lucide-react';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    rating: 5,
    content: '',
    status: 'pending',
    service: '',
    projectType: ''
  });

  // Mock testimonials data
  const mockTestimonials = [
    {
      id: 1,
      authorName: 'Jean Dupont',
      authorEmail: 'jean.dupont@email.com',
      authorPhone: '+33 1 23 45 67 89',
      rating: 5,
      content: 'Excellent travail de rénovation de notre toiture. L\'équipe a été professionnelle et le résultat est parfait. Je recommande vivement !',
      status: 'approved',
      service: 'Rénovation Toiture',
      projectType: 'Résidentiel',
      createdAt: '2025-01-15',
      approvedAt: '2025-01-16'
    },
    {
      id: 2,
      authorName: 'Marie Martin',
      authorEmail: 'marie.martin@email.com',
      authorPhone: '+33 1 23 45 67 90',
      rating: 4,
      content: 'Service de qualité pour l\'installation de notre zinguerie. Travail soigné et respect des délais.',
      status: 'approved',
      service: 'Installation Zinguerie',
      projectType: 'Résidentiel',
      createdAt: '2025-01-14',
      approvedAt: '2025-01-15'
    },
    {
      id: 3,
      authorName: 'Pierre Durand',
      authorEmail: 'pierre.durand@email.com',
      authorPhone: '+33 1 23 45 67 91',
      rating: 5,
      content: 'Intervention rapide et efficace pour réparer notre toiture après la tempête. Équipe réactive et compétente.',
      status: 'pending',
      service: 'Réparation Urgente',
      projectType: 'Résidentiel',
      createdAt: '2025-01-13'
    },
    {
      id: 4,
      authorName: 'Sophie Bernard',
      authorEmail: 'sophie.bernard@email.com',
      authorPhone: '+33 1 23 45 67 92',
      rating: 3,
      content: 'Travail correct mais quelques retards dans les délais. Le résultat final est satisfaisant.',
      status: 'approved',
      service: 'Maintenance Annuelle',
      projectType: 'Commercial',
      createdAt: '2025-01-12',
      approvedAt: '2025-01-13'
    },
    {
      id: 5,
      authorName: 'Lucas Moreau',
      authorEmail: 'lucas.moreau@email.com',
      authorPhone: '+33 1 23 45 67 93',
      rating: 5,
      content: 'Construction complète de notre charpente traditionnelle. Un travail d\'artisan exceptionnel !',
      status: 'approved',
      service: 'Construction Charpente',
      projectType: 'Résidentiel',
      createdAt: '2025-01-11',
      approvedAt: '2025-01-12'
    },
    {
      id: 6,
      authorName: 'Emma Petit',
      authorEmail: 'emma.petit@email.com',
      authorPhone: '+33 1 23 45 67 94',
      rating: 4,
      content: 'Installation de couverture en ardoise. Beau travail et respect de l\'environnement.',
      status: 'pending',
      service: 'Installation Couverture',
      projectType: 'Résidentiel',
      createdAt: '2025-01-10'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTestimonials(mockTestimonials);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || testimonial.status === filterStatus;
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

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? '#F59E0B' : '#E5E7EB'}
        color={index < rating ? '#F59E0B' : '#E5E7EB'}
      />
    ));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  // Add new testimonial
  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    setShowAddModal(false);
    setFormData({
      authorName: '',
      authorEmail: '',
      authorPhone: '',
      rating: 5,
      content: '',
      status: 'pending',
      service: '',
      projectType: ''
    });
  };

  // Edit testimonial
  const handleEditTestimonial = () => {
    setTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === selectedTestimonial.id 
          ? { ...testimonial, ...formData }
          : testimonial
      )
    );
    setShowEditModal(false);
    setSelectedTestimonial(null);
    setFormData({
      authorName: '',
      authorEmail: '',
      authorPhone: '',
      rating: 5,
      content: '',
      status: 'pending',
      service: '',
      projectType: ''
    });
  };

  // Delete testimonial
  const handleDeleteTestimonial = () => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== selectedTestimonial.id));
    setShowDeleteConfirm(false);
    setSelectedTestimonial(null);
  };

  // Toggle testimonial status
  const handleToggleStatus = (testimonialId, newStatus) => {
    setTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === testimonialId 
          ? { 
              ...testimonial, 
              status: newStatus,
              approvedAt: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : null
            }
          : testimonial
      )
    );
  };

  // Open edit modal
  const openEditModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      authorName: testimonial.authorName,
      authorEmail: testimonial.authorEmail,
      authorPhone: testimonial.authorPhone,
      rating: testimonial.rating,
      content: testimonial.content,
      status: testimonial.status,
      service: testimonial.service,
      projectType: testimonial.projectType
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowDeleteConfirm(true);
  };

  // Handle settings
  const handleSettings = () => {
    // Simulate settings functionality
    console.log('Opening testimonials settings');
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
              <p>Chargement des témoignages...</p>
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
                <h1>Gestion des Témoignages</h1>
                <p>Gérez les avis et recommandations clients</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Ajouter témoignage
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
                <MessageSquare size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Témoignages</h3>
                <div className="stat-value">{testimonials.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +5 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Approuvés</h3>
                <div className="stat-value">{testimonials.filter(t => t.status === 'approved').length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  67% approuvés
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>En attente</h3>
                <div className="stat-value">{testimonials.filter(t => t.status === 'pending').length}</div>
                <div className="stat-trend trend-down">
                  <AlertCircle size={14} />
                  À examiner
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <Star size={24} />
              </div>
              <div className="stat-content">
                <h3>Note Moyenne</h3>
                <div className="stat-value">4.3/5</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +0.2 ce mois
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
                  placeholder="Rechercher un témoignage..." 
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

          {/* Testimonials Grid */}
          <motion.div 
            className="testimonials-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.authorName.charAt(0)}
                    </div>
                    <div className="author-info">
                      <h3>{testimonial.authorName}</h3>
                      <p>{testimonial.service}</p>
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <div className="testimonial-content">
                  <p>{testimonial.content}</p>
                </div>

                <div className="testimonial-details">
                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{testimonial.projectType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ajouté le:</span>
                    <span className="detail-value">{new Date(testimonial.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {testimonial.approvedAt && (
                    <div className="detail-item">
                      <span className="detail-label">Approuvé le:</span>
                      <span className="detail-value">{new Date(testimonial.approvedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                <div className="testimonial-actions">
                  <button
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(testimonial.status) + '20', 
                      color: getStatusColor(testimonial.status),
                      cursor: 'pointer',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    onClick={() => handleToggleStatus(testimonial.id, testimonial.status === 'approved' ? 'pending' : 'approved')}
                    title="Cliquer pour changer le statut"
                  >
                    {getStatusText(testimonial.status)}
                  </button>
                  
                  <div className="action-buttons">
                    <button 
                      className="action-btn" 
                      title="Voir"
                      onClick={() => openViewModal(testimonial)}
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      className="action-btn" 
                      title="Modifier"
                      onClick={() => openEditModal(testimonial)}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="action-btn danger" 
                      title="Supprimer"
                      onClick={() => openDeleteConfirm(testimonial)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTestimonials.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <MessageSquare size={48} />
              <h3>Aucun témoignage trouvé</h3>
              <p>Aucun témoignage ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Ajouter un témoignage
              </button>
            </motion.div>
          )}

          {/* Add Testimonial Modal */}
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
                    <h2>Ajouter un nouveau témoignage</h2>
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
                        <label>Nom de l'auteur</label>
                        <input
                          type="text"
                          name="authorName"
                          value={formData.authorName}
                          onChange={handleInputChange}
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="authorEmail"
                          value={formData.authorEmail}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="authorPhone"
                        value={formData.authorPhone}
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
                        <label>Type de projet</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                        >
                          <option value="">Sélectionner</option>
                          <option value="Résidentiel">Résidentiel</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industriel">Industriel</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Note</label>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                            onClick={() => handleRatingChange(star)}
                          >
                            <Star size={20} />
                          </button>
                        ))}
                        <span className="rating-text">{formData.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Témoignage</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Rédigez le témoignage..."
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
                      onClick={handleAddTestimonial}
                      disabled={!formData.authorName || !formData.content}
                    >
                      <Save size={16} />
                      Ajouter le témoignage
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Testimonial Modal */}
          <AnimatePresence>
            {showEditModal && selectedTestimonial && (
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
                    <h2>Modifier le témoignage</h2>
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
                        <label>Nom de l'auteur</label>
                        <input
                          type="text"
                          name="authorName"
                          value={formData.authorName}
                          onChange={handleInputChange}
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="authorEmail"
                          value={formData.authorEmail}
                          onChange={handleInputChange}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="authorPhone"
                        value={formData.authorPhone}
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
                        <label>Type de projet</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                        >
                          <option value="">Sélectionner</option>
                          <option value="Résidentiel">Résidentiel</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industriel">Industriel</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Note</label>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                            onClick={() => handleRatingChange(star)}
                          >
                            <Star size={20} />
                          </button>
                        ))}
                        <span className="rating-text">{formData.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Témoignage</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Rédigez le témoignage..."
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
                      onClick={handleEditTestimonial}
                      disabled={!formData.authorName || !formData.content}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Testimonial Modal */}
          <AnimatePresence>
            {showViewModal && selectedTestimonial && (
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
                    <h2>Détails du témoignage</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="testimonial-detail-view">
                      <div className="testimonial-detail-header">
                        <div className="author-detail">
                          <div className="author-avatar-large">
                            {selectedTestimonial.authorName.charAt(0)}
                          </div>
                          <div className="author-info-detail">
                            <h3>{selectedTestimonial.authorName}</h3>
                            <p>{selectedTestimonial.authorEmail}</p>
                            <p>{selectedTestimonial.authorPhone}</p>
                          </div>
                        </div>
                        
                        <div className="testimonial-rating-detail">
                          {renderStars(selectedTestimonial.rating)}
                          <span className="rating-text">{selectedTestimonial.rating}/5</span>
                        </div>
                      </div>
                      
                      <div className="testimonial-content-detail">
                        <h4>Témoignage</h4>
                        <p>{selectedTestimonial.content}</p>
                      </div>
                      
                      <div className="testimonial-details-grid">
                        <div className="detail-grid-item">
                          <User size={16} />
                          <div>
                            <label>Service</label>
                            <span>{selectedTestimonial.service}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Type de projet</label>
                            <span>{selectedTestimonial.projectType}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Ajouté le</label>
                            <span>{new Date(selectedTestimonial.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        {selectedTestimonial.approvedAt && (
                          <div className="detail-grid-item">
                            <CheckCircle size={16} />
                            <div>
                              <label>Approuvé le</label>
                              <span>{new Date(selectedTestimonial.approvedAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="testimonial-detail-actions">
                        <button className="btn-secondary">
                          <ThumbsUp size={16} />
                          Approuver
                        </button>
                        <button className="btn-secondary">
                          <ThumbsDown size={16} />
                          Rejeter
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
                        openEditModal(selectedTestimonial);
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
            {showDeleteConfirm && selectedTestimonial && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer ce témoignage ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement le témoignage de {selectedTestimonial.authorName}.</p>
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
                      onClick={handleDeleteTestimonial}
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

export default TestimonialsAdmin;
