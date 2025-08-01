import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  MessageSquare, CheckCircle, AlertCircle, Clock, Upload,
  X, Save, Star, User, Calendar, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { testimonialsApi } from '../../api/testimonials';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    name: '',
    location: '',
    content: '',
    rating: 5,
    is_active: true,
    sort_order: 0
  });

  // Load testimonials
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await testimonialsApi.getAdminTestimonials();
      const testimonialsData = response.data || response;
      setTestimonials(testimonialsData);
      setFilteredTestimonials(testimonialsData);
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter testimonials
  useEffect(() => {
    let filtered = testimonials;
    
    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(testimonial => 
        filterStatus === 'active' ? testimonial.is_active : !testimonial.is_active
      );
    }
    
    setFilteredTestimonials(filtered);
  }, [testimonials, searchTerm, filterStatus]);

  const getStatusColor = (isActive) => {
    return isActive ? '#10B981' : '#6B7280';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Actif' : 'Inactif';
  };

  const getStatusIcon = (isActive) => {
    return isActive ? CheckCircle : AlertCircle;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : 'empty'}`}
        style={{ color: index < rating ? '#F59E0B' : '#D1D5DB' }}
      >
        ★
      </span>
    ));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  // Add new testimonial
  const handleAddTestimonial = async () => {
    try {
      await testimonialsApi.createTestimonial(formData);
      await loadTestimonials();
      setShowAddModal(false);
      setFormData({
        name: '',
        location: '',
        content: '',
        rating: 5,
        is_active: true,
        sort_order: 0
      });
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('Erreur lors de l\'ajout du témoignage');
    }
  };

  // Edit testimonial
  const handleEditTestimonial = async () => {
    try {
      await testimonialsApi.updateTestimonial(selectedTestimonial.id, formData);
      await loadTestimonials();
      setShowEditModal(false);
      setSelectedTestimonial(null);
      setFormData({
        name: '',
        location: '',
        content: '',
        rating: 5,
        is_active: true,
        sort_order: 0
      });
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Erreur lors de la modification du témoignage');
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async () => {
    try {
      await testimonialsApi.deleteTestimonial(selectedTestimonial.id);
      await loadTestimonials();
      setShowDeleteConfirm(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Erreur lors de la suppression du témoignage');
    }
  };

  // Toggle testimonial status
  const handleToggleStatus = async (testimonialId, isActive) => {
    try {
      await testimonialsApi.toggleTestimonialStatus(testimonialId, !isActive);
      await loadTestimonials();
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  // Open edit modal
  const openEditModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      content: testimonial.content,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
      sort_order: testimonial.sort_order
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
                onClick={loadTestimonials}
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
                <div className="stat-value">{testimonials.filter(t => t.is_active).length}</div>
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
                <div className="stat-value">{testimonials.filter(t => !t.is_active).length}</div>
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
                <div className="stat-value">
                  {testimonials.length > 0 
                    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                    : '0.0'
                  }/5
                </div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  {testimonials.length > 0 
                    ? `${Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)}% excellents`
                    : '0% excellents'
                  }
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
                  className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Actifs
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'inactive' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('inactive')}
                >
                  Inactifs
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
                      {testimonial.name?.charAt(0)}
                    </div>
                    <div className="author-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.location}</p>
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
                    <span className="detail-label">Statut:</span>
                    <span className="detail-value">
                      <CheckCircle size={14} color={getStatusColor(testimonial.is_active)} />
                      {getStatusText(testimonial.is_active)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ajouté le:</span>
                    <span className="detail-value">{new Date(testimonial.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {testimonial.updated_at && (
                    <div className="detail-item">
                      <span className="detail-label">Modifié le:</span>
                      <span className="detail-value">{new Date(testimonial.updated_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                <div className="testimonial-actions">
                  <button
                    className="status-badge"
                    style={{ 
                      backgroundColor: getStatusColor(testimonial.is_active) + '20', 
                      color: getStatusColor(testimonial.is_active),
                      cursor: 'pointer',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleStatus(testimonial.id, testimonial.is_active);
                    }}
                    title="Cliquer pour changer le statut"
                  >
                    {getStatusText(testimonial.is_active)}
                  </button>
                  
                  <div className="action-buttons">
                    <button 
                      className="action-btn" 
                      title="Voir"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openViewModal(testimonial);
                      }}
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      className="action-btn" 
                      title="Modifier"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEditModal(testimonial);
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="action-btn danger" 
                      title="Supprimer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openDeleteConfirm(testimonial);
                      }}
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
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Localisation</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Ex: Paris, France"
                        />
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
                      <label>Actif</label>
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
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
                      onClick={handleAddTestimonial}
                      disabled={!formData.name || !formData.content}
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
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Localisation</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Ex: Paris, France"
                        />
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
                      <label>Actif</label>
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
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
                      onClick={handleEditTestimonial}
                      disabled={!formData.name || !formData.content}
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
                            {selectedTestimonial.name?.charAt(0)}
                          </div>
                          <div className="author-info-detail">
                            <h3>{selectedTestimonial.name}</h3>
                            <p>{selectedTestimonial.location}</p>
                            <p>{selectedTestimonial.content}</p>
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
                            <label>Nom de l'auteur</label>
                            <span>{selectedTestimonial.name}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Localisation</label>
                            <span>{selectedTestimonial.location}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Ajouté le</label>
                            <span>{new Date(selectedTestimonial.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        
                        {selectedTestimonial.updated_at && (
                          <div className="detail-grid-item">
                            <Clock size={16} />
                            <div>
                              <label>Modifié le</label>
                              <span>{new Date(selectedTestimonial.updated_at).toLocaleDateString('fr-FR')}</span>
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
                      <p>Cette action est irréversible et supprimera définitivement le témoignage de {selectedTestimonial.name}.</p>
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
