import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Image, Settings, CheckCircle, AlertCircle, Clock, Upload,
  X, Save, Camera, Download, Share, Star, Heart, Calendar, Tag
} from 'lucide-react';
import { fetchGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../../api/gallery';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [error, setError] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Charpente',
    is_active: true,
    image: null,
    sort_order: 0
  });

  // Load gallery items from API
  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const items = await fetchGalleryItems();
        setGallery(items);
      } catch (error) {
        console.error('Error loading gallery items:', error);
        setError('Erreur lors du chargement de la galerie');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGalleryItems();
  }, []);

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      published: '#10B981',
      draft: '#F59E0B',
      archived: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      published: 'Publié',
      draft: 'Brouillon',
      archived: 'Archivé'
    };
    return texts[status] || status;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'is_active' ? value === 'published' : value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new gallery item
  const handleAddItem = async () => {
    try {
      const newItem = await createGalleryItem(formData);
      setGallery(prev => [newItem, ...prev]);
      setShowAddModal(false);
      setFormData({
        title: '',
        description: '',
        category: 'Charpente',
        is_active: true,
        image: null,
        sort_order: 0
      });
    } catch (error) {
      console.error('Error adding gallery item:', error);
      setError('Erreur lors de l\'ajout de la photo');
    }
  };

  // Edit gallery item
  const handleEditItem = async () => {
    if (!selectedItem) return;
    try {
      const updatedItem = await updateGalleryItem(selectedItem.id, formData);
      setGallery(prev => 
        prev.map(item => 
          item.id === selectedItem.id 
            ? updatedItem
            : item
        )
      );
      setShowEditModal(false);
      setSelectedItem(null);
      setFormData({
        title: '',
        description: '',
        category: 'Charpente',
        is_active: true,
        image: null,
        sort_order: 0
      });
    } catch (error) {
      console.error('Error editing gallery item:', error);
      setError('Erreur lors de la modification de la photo');
    }
  };

  // Delete gallery item
  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    try {
      await deleteGalleryItem(selectedItem.id);
      setGallery(prev => prev.filter(item => item.id !== selectedItem.id));
      setShowDeleteConfirm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      setError('Erreur lors de la suppression de la photo');
    }
  };

  // Toggle item status
  const handleToggleStatus = async (itemId, newStatus) => {
    const itemToUpdate = gallery.find(item => item.id === itemId);
    if (!itemToUpdate) return;

    try {
      const updatedItem = await updateGalleryItem(itemId, { ...itemToUpdate, is_active: newStatus });
      setGallery(prev => 
        prev.map(item => 
          item.id === itemId 
            ? updatedItem
            : item
        )
      );
    } catch (error) {
      console.error('Error toggling status:', error);
      setError('Erreur lors du changement de statut');
    }
  };

  // Open edit modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      is_active: item.is_active,
      image: item.image,
      sort_order: item.sort_order
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (item) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  // Handle settings
  const handleSettings = () => {
    // Simulate settings functionality
    console.log('Opening gallery settings');
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
              <p>Chargement de la galerie...</p>
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
                <h1>Gestion de la Galerie</h1>
                <p>Gérez vos photos et projets de travaux</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Upload size={16} />
                  Ajouter photo
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
                <Image size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Photos</h3>
                <div className="stat-value">{gallery.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +3 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Publiées</h3>
                <div className="stat-value">{gallery.filter(g => g.is_active).length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  87% publiées
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>Brouillons</h3>
                <div className="stat-value">{gallery.filter(g => !g.is_active).length}</div>
                <div className="stat-trend trend-down">
                  <AlertCircle size={14} />
                  À publier
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <Eye size={24} />
              </div>
              <div className="stat-content">
                <h3>Catégories</h3>
                <div className="stat-value">{new Set(gallery.map(item => item.category)).size}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  {gallery.length} photos
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
                  placeholder="Rechercher une photo..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('all')}
                >
                  Toutes
                </button>
                <button 
                  className={`filter-btn ${filterCategory === 'Charpente' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('Charpente')}
                >
                  Charpente
                </button>
                <button 
                  className={`filter-btn ${filterCategory === 'Couverture' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('Couverture')}
                >
                  Couverture
                </button>
                <button 
                  className={`filter-btn ${filterCategory === 'Zinguerie' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('Zinguerie')}
                >
                  Zinguerie
                </button>
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="gallery-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="gallery-image">
                  <img src={item.image} alt={item.title} />
                  <div className="image-overlay">
                    <div className="overlay-actions">
                      <button 
                        className="overlay-btn" 
                        title="Voir"
                        onClick={() => openViewModal(item)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="overlay-btn" 
                        title="Modifier"
                        onClick={() => openEditModal(item)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="overlay-btn danger" 
                        title="Supprimer"
                        onClick={() => openDeleteConfirm(item)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="gallery-content">
                  <div className="gallery-header">
                    <h3>{item.title}</h3>
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: item.is_active ? '#10B981' + '20' : '#F59E0B' + '20', 
                        color: item.is_active ? '#10B981' : '#F59E0B',
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(item.id, !item.is_active)}
                      title="Cliquer pour changer le statut"
                    >
                      {item.is_active ? 'Publié' : 'Brouillon'}
                    </button>
                  </div>
                  
                  <p className="gallery-description">{item.description}</p>
                  
                  <div className="gallery-details">
                    <div className="detail-item">
                      <span className="detail-label">Catégorie:</span>
                      <span className="detail-value">{item.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Statut:</span>
                      <span className="detail-value">{item.is_active ? 'Publié' : 'Brouillon'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ajouté le:</span>
                      <span className="detail-value">{new Date(item.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  {/* Additional Action Buttons */}
                  <div className="gallery-actions">
                    <button
                      className="action-btn"
                      onClick={() => openViewModal(item)}
                      title="Voir les détails"
                    >
                      <Eye size={14} />
                      Voir
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => openEditModal(item)}
                      title="Modifier"
                    >
                      <Edit size={14} />
                      Modifier
                    </button>
                    <button
                      className="action-btn danger"
                      onClick={() => openDeleteConfirm(item)}
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredGallery.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Image size={48} />
              <h3>Aucune photo trouvée</h3>
              <p>Aucune photo ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Upload size={16} />
                Ajouter une photo
              </button>
            </motion.div>
          )}

          {/* Add Gallery Item Modal */}
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
                    <h2>Ajouter une nouvelle photo</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Titre</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Rénovation Toiture Tuiles"
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
                        <label>Catégorie</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="Charpente">Charpente</option>
                          <option value="Couverture">Couverture</option>
                          <option value="Zinguerie">Zinguerie</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Statut</label>
                        <select
                          name="is_active"
                          value={formData.is_active ? 'published' : 'draft'}
                          onChange={handleInputChange}
                        >
                          <option value="published">Publié</option>
                          <option value="draft">Brouillon</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Image</label>
                      <div className="image-upload-container">
                        {formData.image ? (
                          <div className="image-preview">
                            <img src={formData.image} alt="Preview" />
                            <button 
                              type="button"
                              className="remove-image-btn"
                              onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-btn">
                            <Camera size={20} />
                            <span>Choisir une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
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
                      onClick={handleAddItem}
                      disabled={!formData.title || !formData.image}
                    >
                      <Save size={16} />
                      Ajouter la photo
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Gallery Item Modal */}
          <AnimatePresence>
            {showEditModal && selectedItem && (
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
                    <h2>Modifier la photo</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Titre</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Rénovation Toiture Tuiles"
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
                        <label>Catégorie</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="Charpente">Charpente</option>
                          <option value="Couverture">Couverture</option>
                          <option value="Zinguerie">Zinguerie</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Statut</label>
                        <select
                          name="is_active"
                          value={formData.is_active ? 'published' : 'draft'}
                          onChange={handleInputChange}
                        >
                          <option value="published">Publié</option>
                          <option value="draft">Brouillon</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Image</label>
                      <div className="image-upload-container">
                        {formData.image ? (
                          <div className="image-preview">
                            <img src={formData.image} alt="Preview" />
                            <button 
                              type="button"
                              className="remove-image-btn"
                              onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-btn">
                            <Camera size={20} />
                            <span>Choisir une image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
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
                      onClick={handleEditItem}
                      disabled={!formData.title || !formData.image}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Gallery Item Modal */}
          <AnimatePresence>
            {showViewModal && selectedItem && (
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
                    <h2>Détails de la photo</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="gallery-detail-view">
                      <div className="gallery-detail-image">
                        <img src={selectedItem.image} alt={selectedItem.title} />
                      </div>
                      
                      <div className="gallery-detail-info">
                        <h3>{selectedItem.title}</h3>
                        <p>{selectedItem.description}</p>
                        
                        <div className="gallery-detail-stats">
                          <div className="stat-item">
                            <CheckCircle size={16} />
                            <span>{selectedItem.is_active ? 'Publié' : 'Brouillon'}</span>
                          </div>
                          <div className="stat-item">
                            <Calendar size={16} />
                            <span>Ajouté le {new Date(selectedItem.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="stat-item">
                            <Tag size={16} />
                            <span>{selectedItem.category}</span>
                          </div>
                        </div>
                        
                        <div className="gallery-detail-actions">
                          <button className="btn-secondary">
                            <Download size={16} />
                            Télécharger
                          </button>
                          <button className="btn-secondary">
                            <Share size={16} />
                            Partager
                          </button>
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
                        openEditModal(selectedItem);
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
            {showDeleteConfirm && selectedItem && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer cette photo ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement la photo "{selectedItem.title}".</p>
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
                      onClick={handleDeleteItem}
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

export default GalleryAdmin;
