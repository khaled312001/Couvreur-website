import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Target, Settings, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, DollarSign, Tag, FileText
} from 'lucide-react';
import { createService, updateService, deleteService } from '../../api/services';

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    icon: '🏗️',
    category: '',
    duration: '',
    price_range: '',
    features: [],
    sub_services: [],
    materials: [],
    advantages: [],
    image: '',
    is_active: true,
    sort_order: 0
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load services from API
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/admin/services', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setServices(data.data || data);
      } else {
        console.error('Failed to load services');
        // Fallback to mock data if API fails
        setServices(getMockServices());
      }
    } catch (error) {
      console.error('Error loading services:', error);
      // Fallback to mock data
      setServices(getMockServices());
    } finally {
      setIsLoading(false);
    }
  };

  // Mock services data for fallback
  const getMockServices = () => [
    {
      id: 1,
      title: "Charpente",
      description: "Construction et rénovation de charpentes traditionnelles et modernes",
      icon: "🏗️",
      status: "active",
      category: "Charpente",
      price_range: "Sur devis",
      duration: "2-4 semaines",
      created_at: "2025-01-15"
    },
    {
      id: 2,
      title: "Couverture",
      description: "Installation et réparation de tous types de couvertures",
      icon: "🏠",
      status: "active",
      category: "Couverture",
      price_range: "Sur devis",
      duration: "1-3 semaines",
      created_at: "2025-01-14"
    },
    {
      id: 3,
      title: "Zinguerie",
      description: "Travaux de zinguerie et d'étanchéité pour votre toiture",
      icon: "⚡",
      status: "active",
      category: "Zinguerie",
      price_range: "Sur devis",
      duration: "1-2 semaines",
      created_at: "2025-01-13"
    },
    {
      id: 4,
      title: "Démoussage",
      description: "Nettoyage professionnel de votre toiture",
      icon: "🧹",
      status: "draft",
      category: "Entretien",
      price_range: "À partir de 500€",
      duration: "1 jour",
      created_at: "2025-01-12"
    },
    {
      id: 5,
      title: "Isolation",
      description: "Isolation thermique et phonique de vos combles",
      icon: "🏠",
      status: "active",
      category: "Isolation",
      price_range: "Sur devis",
      duration: "3-5 jours",
      created_at: "2025-01-11"
    },
    {
      id: 6,
      title: "Fenêtres de toit",
      description: "Installation et remplacement de velux",
      icon: "🪟",
      status: "active",
      category: "Installation",
      price_range: "Sur devis",
      duration: "1-2 jours",
      created_at: "2025-01-10"
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && service.is_active) ||
                         (filterStatus === 'inactive' && !service.is_active);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: '#10B981',
      draft: '#F59E0B',
      inactive: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'Actif',
      draft: 'Brouillon',
      inactive: 'Inactif'
    };
    return texts[status] || status;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : 
              name === 'is_active' ? value === 'active' : 
              value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear image
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: '' }));
  };

  // Add new service
  const handleAddService = async () => {
    try {
      const response = await createService(formData);
      if (response.ok) {
        const newService = await response.json();
        setServices(prev => [newService.data, ...prev]);
        setShowAddModal(false);
        setFormData({
          title: '',
          description: '',
          long_description: '',
          icon: '🏗️',
          category: '',
          duration: '',
          price_range: '',
          features: [],
          sub_services: [],
          materials: [],
          advantages: [],
          image: '',
          is_active: true,
          sort_order: 0
        });
      } else {
        console.error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Edit service
  const handleEditService = async () => {
    try {
      const response = await updateService(selectedService.id, formData);
      if (response.ok) {
        const updatedService = await response.json();
        setServices(prev => 
          prev.map(service => 
            service.id === selectedService.id 
              ? updatedService.data
              : service
          )
        );
        setShowEditModal(false);
        setSelectedService(null);
        setFormData({
          title: '',
          description: '',
          long_description: '',
          icon: '🏗️',
          category: '',
          duration: '',
          price_range: '',
          features: [],
          sub_services: [],
          materials: [],
          advantages: [],
          image: '',
          is_active: true,
          sort_order: 0
        });
      } else {
        console.error('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Delete service
  const handleDeleteService = async () => {
    try {
      const response = await deleteService(selectedService.id);
      if (response.ok) {
        setServices(prev => prev.filter(service => service.id !== selectedService.id));
        setShowDeleteConfirm(false);
        setSelectedService(null);
      } else {
        console.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Toggle service status
  const handleToggleStatus = async (serviceId) => {
    const currentService = services.find(s => s.id === serviceId);
    if (currentService) {
      try {
        const response = await updateService(serviceId, { is_active: !currentService.is_active });
        if (response.ok) {
          const updatedService = await response.json();
          setServices(prev => 
            prev.map(service => 
              service.id === serviceId 
                ? updatedService.data
                : service
            )
          );
        } else {
          console.error('Failed to toggle status');
        }
      } catch (error) {
        console.error('Error toggling status:', error);
      }
    }
  };

  // Open edit modal
  const openEditModal = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      long_description: service.long_description,
      icon: service.icon,
      category: service.category,
      duration: service.duration,
      price_range: service.price_range,
      features: service.features || [],
      sub_services: service.sub_services || [],
      materials: service.materials || [],
      advantages: service.advantages || [],
      image: service.image,
      is_active: service.is_active,
      sort_order: service.sort_order
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (service) => {
    setSelectedService(service);
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
              <p>Chargement des services...</p>
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
                <h1>Gestion des Services</h1>
                <p>Gérez vos services de charpente, couverture et zinguerie</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Nouveau service
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
                <Target size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Services</h3>
                <div className="stat-value">{services.length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  +2 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Services Actifs</h3>
                <div className="stat-value">{services.filter(s => s.is_active).length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  100% actifs
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>En Brouillon</h3>
                <div className="stat-value">{services.filter(s => !s.is_active).length}</div>
                <div className="stat-trend trend-down">
                  <AlertCircle size={14} />
                  À publier
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                <Settings size={24} />
              </div>
              <div className="stat-content">
                <h3>Catégories</h3>
                <div className="stat-value">{new Set(services.map(s => s.category)).size}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  Variées
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
                  placeholder="Rechercher un service..." 
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
                  className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('draft')}
                >
                  Brouillons
                </button>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            className="services-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="service-header">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <div className="service-info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-status">
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(service.is_active ? 'active' : 'inactive') + '20', 
                        color: getStatusColor(service.is_active ? 'active' : 'inactive'),
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(service.id)}
                      title="Cliquer pour changer le statut"
                    >
                      {getStatusText(service.is_active ? 'active' : 'inactive')}
                    </button>
                  </div>
                </div>

                <div className="service-details">
                  <div className="detail-item">
                    <span className="detail-label">Catégorie:</span>
                    <span className="detail-value">{service.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Prix:</span>
                    <span className="detail-value">{service.price_range}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Durée:</span>
                    <span className="detail-value">{service.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Créé le:</span>
                    <span className="detail-value">{new Date(service.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="service-actions">
                  <button 
                    className="action-btn" 
                    title="Voir les détails"
                    onClick={() => openViewModal(service)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Modifier"
                    onClick={() => openEditModal(service)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn danger" 
                    title="Supprimer"
                    onClick={() => openDeleteConfirm(service)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Target size={48} />
              <h3>Aucun service trouvé</h3>
              <p>Aucun service ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Ajouter un service
              </button>
            </motion.div>
          )}

          {/* Add Service Modal */}
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
                    <h2>Ajouter un nouveau service</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Titre du service</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Charpente traditionnelle"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du service..."
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description longue</label>
                      <textarea
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée et détaillée du service..."
                        rows="5"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Icône</label>
                        <input
                          type="text"
                          name="icon"
                          value={formData.icon}
                          onChange={handleInputChange}
                          placeholder="🏗️"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Catégorie</label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="Ex: Charpente"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Durée</label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="Ex: 2-4 semaines"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Prix</label>
                        <input
                          type="text"
                          name="price_range"
                          value={formData.price_range}
                          onChange={handleInputChange}
                          placeholder="Ex: Sur devis"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        name="is_active"
                        value={formData.is_active ? 'active' : 'inactive'}
                        onChange={handleInputChange}
                      >
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
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
                      onClick={handleAddService}
                      disabled={!formData.title || !formData.description}
                    >
                      <Save size={16} />
                      Ajouter le service
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Service Modal */}
          <AnimatePresence>
            {showEditModal && selectedService && (
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
                    <h2>Modifier le service</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Titre du service</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Charpente traditionnelle"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée du service..."
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Description longue</label>
                      <textarea
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleInputChange}
                        placeholder="Description détaillée et détaillée du service..."
                        rows="5"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Icône</label>
                        <input
                          type="text"
                          name="icon"
                          value={formData.icon}
                          onChange={handleInputChange}
                          placeholder="🏗️"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Catégorie</label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="Ex: Charpente"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Durée</label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="Ex: 2-4 semaines"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Prix</label>
                        <input
                          type="text"
                          name="price_range"
                          value={formData.price_range}
                          onChange={handleInputChange}
                          placeholder="Ex: Sur devis"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        name="is_active"
                        value={formData.is_active ? 'active' : 'inactive'}
                        onChange={handleInputChange}
                      >
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
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
                      onClick={handleEditService}
                      disabled={!formData.title || !formData.description}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Service Modal */}
          <AnimatePresence>
            {showViewModal && selectedService && (
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
                    <h2>Détails du service</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="service-detail-view">
                      <div className="service-detail-header">
                        <div className="service-detail-icon">
                          {selectedService.icon}
                        </div>
                        <div className="service-detail-info">
                          <h3>{selectedService.title}</h3>
                          <span 
                            className="status-badge"
                            style={{ 
                              backgroundColor: getStatusColor(selectedService.is_active ? 'active' : 'inactive') + '20', 
                              color: getStatusColor(selectedService.is_active ? 'active' : 'inactive') 
                            }}
                          >
                            {getStatusText(selectedService.is_active ? 'active' : 'inactive')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="service-detail-description">
                        <h4>Description</h4>
                        <p>{selectedService.description}</p>
                      </div>

                      <div className="service-detail-description">
                        <h4>Description Longue</h4>
                        <p>{selectedService.long_description}</p>
                      </div>
                      
                      <div className="service-detail-grid">
                        <div className="detail-grid-item">
                          <Tag size={16} />
                          <div>
                            <label>Catégorie</label>
                            <span>{selectedService.category}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <DollarSign size={16} />
                          <div>
                            <label>Prix</label>
                            <span>{selectedService.price_range}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Clock size={16} />
                          <div>
                            <label>Durée</label>
                            <span>{selectedService.duration}</span>
                          </div>
                        </div>
                        
                        <div className="detail-grid-item">
                          <Calendar size={16} />
                          <div>
                            <label>Créé le</label>
                            <span>{new Date(selectedService.created_at).toLocaleDateString('fr-FR')}</span>
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
                        openEditModal(selectedService);
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
            {showDeleteConfirm && selectedService && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer ce service ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement le service "{selectedService.title}".</p>
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
                      onClick={handleDeleteService}
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

export default ServicesAdmin;
