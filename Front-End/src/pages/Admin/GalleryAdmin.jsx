import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Image, Settings, CheckCircle, AlertCircle, Clock, Upload,
  X, Save, Camera, Download, Share, Star, Heart, Calendar, Tag
} from 'lucide-react';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
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
    status: 'draft',
    image: null
  });

  // Mock gallery data
  const mockGallery = [
    {
      id: 1,
      title: "Rénovation Toiture Tuiles",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Rénovation complète d'une toiture en tuiles",
      category: "Charpente",
      status: "published",
      createdAt: "2025-01-15",
      views: 245
    },
    {
      id: 2,
      title: "Installation Zinc",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Installation de zinguerie en zinc",
      category: "Zinguerie",
      status: "published",
      createdAt: "2025-01-14",
      views: 189
    },
    {
      id: 3,
      title: "Réparation Gouttières",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Réparation et remplacement de gouttières",
      category: "Couverture",
      status: "published",
      createdAt: "2025-01-13",
      views: 156
    },
    {
      id: 4,
      title: "Isolation Thermique",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Isolation thermique de toiture",
      category: "Charpente",
      status: "draft",
      createdAt: "2025-01-12",
      views: 0
    },
    {
      id: 5,
      title: "Charpente Traditionnelle",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Construction de charpente traditionnelle",
      category: "Charpente",
      status: "published",
      createdAt: "2025-01-11",
      views: 312
    },
    {
      id: 6,
      title: "Couverture Ardoise",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Installation de couverture en ardoise",
      category: "Couverture",
      status: "published",
      createdAt: "2025-01-10",
      views: 278
    },
    {
      id: 7,
      title: "Zinguerie Étanchéité",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Travaux d'étanchéité et zinguerie",
      category: "Zinguerie",
      status: "published",
      createdAt: "2025-01-09",
      views: 203
    },
    {
      id: 8,
      title: "Rénovation Complète",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      description: "Rénovation complète de toiture",
      category: "Couverture",
      status: "published",
      createdAt: "2025-01-08",
      views: 189
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGallery(mockGallery);
      setIsLoading(false);
    }, 1000);
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
      [name]: value
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
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0
    };
    setGallery(prev => [newItem, ...prev]);
    setShowAddModal(false);
    setFormData({
      title: '',
      description: '',
      category: 'Charpente',
      status: 'draft',
      image: null
    });
  };

  // Edit gallery item
  const handleEditItem = () => {
    setGallery(prev => 
      prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, ...formData }
          : item
      )
    );
    setShowEditModal(false);
    setSelectedItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'Charpente',
      status: 'draft',
      image: null
    });
  };

  // Delete gallery item
  const handleDeleteItem = () => {
    setGallery(prev => prev.filter(item => item.id !== selectedItem.id));
    setShowDeleteConfirm(false);
    setSelectedItem(null);
  };

  // Toggle item status
  const handleToggleStatus = (itemId, newStatus) => {
    setGallery(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  // Open edit modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      status: item.status,
      image: item.image
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
                <div className="stat-value">{gallery.filter(g => g.status === 'published').length}</div>
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
                <div className="stat-value">{gallery.filter(g => g.status === 'draft').length}</div>
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
                <h3>Vues Totales</h3>
                <div className="stat-value">{gallery.reduce((sum, item) => sum + item.views, 0)}</div>
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
                        backgroundColor: getStatusColor(item.status) + '20', 
                        color: getStatusColor(item.status),
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(item.id, item.status === 'published' ? 'draft' : 'published')}
                      title="Cliquer pour changer le statut"
                    >
                      {getStatusText(item.status)}
                    </button>
                  </div>
                  
                  <p className="gallery-description">{item.description}</p>
                  
                  <div className="gallery-details">
                    <div className="detail-item">
                      <span className="detail-label">Catégorie:</span>
                      <span className="detail-value">{item.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Vues:</span>
                      <span className="detail-value">{item.views}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ajouté le:</span>
                      <span className="detail-value">{new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
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
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
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
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
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
                            <Eye size={16} />
                            <span>{selectedItem.views} vues</span>
                          </div>
                          <div className="stat-item">
                            <Calendar size={16} />
                            <span>Ajouté le {new Date(selectedItem.createdAt).toLocaleDateString('fr-FR')}</span>
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
