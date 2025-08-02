import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit, Trash2, Eye, 
  MessageSquare, CheckCircle, AlertCircle, Clock, Star, User, Calendar,
  X, Save, ThumbsUp, ThumbsDown, Filter
} from 'lucide-react';
import { testimonialsApi } from '../../api/testimonials';
import '../../styles/testimonials-admin.css';

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

  // Load testimonials from backend
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : 'empty'}`}
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
      <div className="testimonials-admin-container">
        <div className="testimonials-admin-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des témoignages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials-admin-container">
        <div className="testimonials-admin-content">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Erreur de chargement</h3>
            <p className="error-message">{error}</p>
            <button 
              onClick={loadTestimonials}
              className="btn btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials-admin-container">
      <div className="testimonials-admin-content">
        {/* Header */}
        <div className="testimonials-header">
          <div className="flex justify-between items-center">
            <div>
              <h1>Gestion des Témoignages</h1>
              <p>Gérez les avis et recommandations clients</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="add-testimonial-btn"
            >
              <Plus size={20} />
              Ajouter témoignage
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">
              <MessageSquare size={24} />
            </div>
            <div className="stat-value">{testimonials.length}</div>
            <div className="stat-label">Total Témoignages</div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-value">{testimonials.filter(t => t.is_active).length}</div>
            <div className="stat-label">Approuvés</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-icon">
              <AlertCircle size={24} />
            </div>
            <div className="stat-value">{testimonials.filter(t => !t.is_active).length}</div>
            <div className="stat-label">En attente</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">
              <Star size={24} />
            </div>
            <div className="stat-value">
              {testimonials.length > 0 
                ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                : '0.0'
              }/5
            </div>
            <div className="stat-label">Note Moyenne</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher un témoignage..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
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

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                {/* Header */}
                <div className="testimonial-header">
                  <div className="author-info">
                    <div className="author-avatar">
                      {testimonial.name?.charAt(0)}
                    </div>
                    <div className="author-details">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="rating-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Content */}
                <div className="testimonial-text">{testimonial.content}</div>

                {/* Details */}
                <div className="testimonial-details">
                  <div className="detail-item">
                    <span className="detail-label">Statut:</span>
                    <span className={`status-badge ${testimonial.is_active ? 'active' : 'inactive'}`}>
                      {getStatusText(testimonial.is_active)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ajouté le:</span>
                    <span className="detail-value">
                      {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="action-buttons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleToggleStatus(testimonial.id, testimonial.is_active)}
                    className={`status-badge ${testimonial.is_active ? 'active' : 'inactive'}`}
                  >
                    {getStatusText(testimonial.is_active)}
                  </button>
                  <button 
                    onClick={() => openViewModal(testimonial)}
                    className="action-btn view"
                    title="Voir les détails"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => openEditModal(testimonial)}
                    className="action-btn edit"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => openDeleteConfirm(testimonial)}
                    className="action-btn delete"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <div className="empty-state">
            <MessageSquare className="empty-icon" size={48} />
            <h3 className="empty-title">Aucun témoignage trouvé</h3>
            <p className="empty-message">Aucun témoignage ne correspond à vos critères de recherche.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              <Plus size={20} className="inline mr-2" />
              Ajouter un témoignage
            </button>
          </div>
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
                  <h2>Ajouter un témoignage</h2>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="modal-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Nom de l'auteur</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Dupont"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Localisation</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: Paris, France"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Témoignage</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Rédigez le témoignage..."
                      rows="4"
                      className="form-input form-textarea"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Note</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`star-btn ${star <= formData.rating ? 'active' : 'inactive'}`}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{formData.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <label className="form-label">Actif</label>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleAddTestimonial}
                    disabled={!formData.name || !formData.content}
                    className="btn btn-primary"
                  >
                    Ajouter
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
                    onClick={() => setShowEditModal(false)}
                    className="modal-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Nom de l'auteur</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Dupont"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Localisation</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: Paris, France"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Témoignage</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Rédigez le témoignage..."
                      rows="4"
                      className="form-input form-textarea"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Note</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`star-btn ${star <= formData.rating ? 'active' : 'inactive'}`}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{formData.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <label className="form-label">Actif</label>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleEditTestimonial}
                    disabled={!formData.name || !formData.content}
                    className="btn btn-primary"
                  >
                    Enregistrer
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
                    onClick={() => setShowViewModal(false)}
                    className="modal-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="author-avatar" style={{width: '64px', height: '64px', fontSize: '1.5rem'}}>
                      {selectedTestimonial.name?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedTestimonial.name}</h3>
                      <p className="text-gray-600 mb-2">{selectedTestimonial.location}</p>
                      <div className="rating-stars">
                        {renderStars(selectedTestimonial.rating)}
                        <span className="text-sm text-gray-600 ml-2">{selectedTestimonial.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Témoignage</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedTestimonial.content}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Statut</label>
                      <span className={`status-badge ${selectedTestimonial.is_active ? 'active' : 'inactive'}`}>
                        {getStatusText(selectedTestimonial.is_active)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Ajouté le</label>
                      <span className="text-gray-700">
                        {new Date(selectedTestimonial.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    {selectedTestimonial.updated_at && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Modifié le</label>
                        <span className="text-gray-700">
                          {new Date(selectedTestimonial.updated_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="btn btn-secondary"
                  >
                    Fermer
                  </button>
                  <button 
                    onClick={() => {
                      setShowViewModal(false);
                      openEditModal(selectedTestimonial);
                    }}
                    className="btn btn-primary"
                  >
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
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>Confirmer la suppression</h2>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="modal-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="modal-body text-center">
                  <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Êtes-vous sûr de vouloir supprimer ce témoignage ?
                  </h3>
                  <p className="text-gray-600">
                    Cette action est irréversible et supprimera définitivement le témoignage de {selectedTestimonial.name}.
                  </p>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleDeleteTestimonial}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;
