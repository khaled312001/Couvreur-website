import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Target, Settings, CheckCircle, AlertCircle, Clock,
  X, Save, Calendar, DollarSign, Tag, FileText, Upload
} from 'lucide-react';
import { createService, updateService, deleteService, getAdminServices, toggleServiceStatus } from '../../api/services';
import { getServiceImage } from '../../utils/imageUtils';

// Function to get the correct image URL for services
const getServiceImageUrl = (imagePath) => {
  if (!imagePath || imagePath === '' || imagePath === null) {
    return null;
  }
  
  // If it's already a full URL, return as is (including Cloudinary URLs)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, construct the full URL
  // Use the API route to serve images
  const baseUrl = 'https://api.bnbatiment.com/api';
  return `${baseUrl}${imagePath}`;
};

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

  const [imagePreview, setImagePreview] = useState(null);





  // Load services from API
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await getAdminServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
      // Fallback to mock data if API fails
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
                         (filterStatus === 'draft' && !service.is_active);
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

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setFormData(prev => ({ ...prev, image: imageUrl }));
    setImagePreview(imageUrl);
  };

  // Handle file upload from device
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://api.bnbatiment.com/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        alert('Upload failed: Server returned invalid response. The Cloudinary package may not be installed on the server. Please contact the administrator or upload images via URL instead.');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
        console.log('Upload successful:', data.url);
      } else {
        alert('Upload failed: ' + (data.message || data.error || 'Unknown error'));
        console.error('Upload error:', data);
      }
    } catch (error) {
      // Handle JSON parse errors
      if (error.message.includes('Unexpected token')) {
        alert('Upload failed: The server returned an error page. Please check that:\n1. Cloudinary package is installed on the server\n2. CLOUDINARY_URL is set in .env\n3. Or use URL input instead');
      } else {
        alert('Failed to upload image: ' + error.message);
      }
      console.error('Upload error:', error);
    }
  };

  // Add new service
  const handleAddService = async () => {
    try {
      const serviceData = {
        ...formData
      };
      
      // Only include image if it has a valid value
      if (!formData.image || formData.image === '' || formData.image === null) {
        // Remove image field if it's empty
        delete serviceData.image;
      }
      
      // Ensure array fields are properly formatted
      if (serviceData.features && Array.isArray(serviceData.features)) {
        serviceData.features = serviceData.features.filter(f => f && f.trim() !== '');
      }
      if (serviceData.sub_services && Array.isArray(serviceData.sub_services)) {
        serviceData.sub_services = serviceData.sub_services.filter(s => {
          if (typeof s === 'string') {
            return s && s.trim() !== '';
          } else if (typeof s === 'object' && s !== null) {
            return s.name && s.name.trim() !== '';
          }
          return false;
        });
      }
      if (serviceData.materials && Array.isArray(serviceData.materials)) {
        serviceData.materials = serviceData.materials.filter(m => m && m.trim() !== '');
      }
      if (serviceData.advantages && Array.isArray(serviceData.advantages)) {
        serviceData.advantages = serviceData.advantages.filter(a => a && a.trim() !== '');
      }
      
      console.log('Sending service data for creation:', serviceData);
      console.log('Features:', serviceData.features);
      console.log('Sub services:', serviceData.sub_services);
      console.log('Materials:', serviceData.materials);
      console.log('Advantages:', serviceData.advantages);
      console.log('Image being sent:', serviceData.image);
      console.log('Image type:', typeof serviceData.image);
      
      const newService = await createService(serviceData);
      
      // Force reload of services to ensure all data is fresh
      await loadServices();
      
      setShowAddModal(false);
      setImagePreview(null);
      setFormData({
        title: '',
        description: '',
        long_description: '',
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
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Edit service
  const handleEditService = async () => {
    try {
      const serviceData = {
        ...formData
      };
      
      // Only include image if it has a valid value
      if (!formData.image || formData.image === '' || formData.image === null) {
        // Remove image field if it's empty
        delete serviceData.image;
      }
      
      // Ensure array fields are properly formatted
      if (serviceData.features && Array.isArray(serviceData.features)) {
        serviceData.features = serviceData.features.filter(f => f && f.trim() !== '');
      }
      if (serviceData.sub_services && Array.isArray(serviceData.sub_services)) {
        serviceData.sub_services = serviceData.sub_services.filter(s => {
          if (typeof s === 'string') {
            return s && s.trim() !== '';
          } else if (typeof s === 'object' && s !== null) {
            return s.name && s.name.trim() !== '';
          }
          return false;
        });
      }
      if (serviceData.materials && Array.isArray(serviceData.materials)) {
        serviceData.materials = serviceData.materials.filter(m => m && m.trim() !== '');
      }
      if (serviceData.advantages && Array.isArray(serviceData.advantages)) {
        serviceData.advantages = serviceData.advantages.filter(a => a && a.trim() !== '');
      }
      
      console.log('Sending service data:', serviceData);
      console.log('Selected service ID:', selectedService.id);
      console.log('Features:', serviceData.features);
      console.log('Sub services:', serviceData.sub_services);
      console.log('Materials:', serviceData.materials);
      console.log('Advantages:', serviceData.advantages);
      console.log('Image being sent:', serviceData.image);
      console.log('Image type:', typeof serviceData.image);
      
      const updatedService = await updateService(selectedService.id, serviceData);
      
      // Force reload of services to ensure all data is fresh
      await loadServices();
      
      setShowEditModal(false);
      setSelectedService(null);
      setImagePreview(null);
      setFormData({
        title: '',
        description: '',
        long_description: '',
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
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Delete service
  const handleDeleteService = async () => {
    try {
      await deleteService(selectedService.id);
      
      // Force reload of services to ensure all data is fresh
      await loadServices();
      
      setShowDeleteConfirm(false);
      setSelectedService(null);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Toggle service status
  const handleToggleStatus = async (serviceId) => {
    const currentService = services.find(s => s.id === serviceId);
    if (currentService) {
      try {
        const result = await toggleServiceStatus(serviceId);
        
        // Force reload of services to ensure all data is fresh
        await loadServices();
      } catch (error) {
        console.error('Error toggling status:', error);
      }
    }
  };

  // Open edit modal
  const openEditModal = (service) => {
    setSelectedService(service);
    const formDataToSet = {
      title: service.title,
      description: service.description,
      long_description: service.long_description,
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
    };
    setFormData(formDataToSet);
    setImagePreview(service.image || null);
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
                key={`${service.id}-${service.updated_at || service.created_at}`}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="service-header">
                  <div className="service-image">
                    <img 
                      src={getServiceImageUrl(service.image) || getServiceImage(service.title)} 
                      alt={service.title}
                      onError={(e) => {
                        e.target.src = getServiceImage(service.title);
                      }}
                    />
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
                      <label>Image du service</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <label style={{ flex: 1, cursor: 'pointer', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
                          <Upload size={16} style={{ display: 'inline-block', marginRight: '8px' }} />
                          Upload from device
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleImageUrlChange}
                        placeholder="Or paste image URL here..."
                        style={{ marginTop: '10px' }}
                      />
                      {formData.image && (
                        <div className="mt-3">
                          <img
                            src={formData.image}
                            alt="Aperçu"
                            className="w-full h-48 object-cover rounded-lg border"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Fonctionnalités (une par ligne)</label>
                      <textarea
                        name="features"
                        value={Array.isArray(formData.features) ? formData.features.join('\n') : ''}
                        onChange={(e) => {
                          const features = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, features }));
                        }}
                        placeholder="Fonctionnalité 1&#10;Fonctionnalité 2&#10;Fonctionnalité 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Sous-services (un par ligne)</label>
                      <textarea
                        name="sub_services"
                        value={Array.isArray(formData.sub_services) ? formData.sub_services.join('\n') : ''}
                        onChange={(e) => {
                          const sub_services = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, sub_services }));
                        }}
                        placeholder="Sous-service 1&#10;Sous-service 2&#10;Sous-service 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Matériaux (un par ligne)</label>
                      <textarea
                        name="materials"
                        value={Array.isArray(formData.materials) ? formData.materials.join('\n') : ''}
                        onChange={(e) => {
                          const materials = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, materials }));
                        }}
                        placeholder="Matériau 1&#10;Matériau 2&#10;Matériau 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Avantages (un par ligne)</label>
                      <textarea
                        name="advantages"
                        value={Array.isArray(formData.advantages) ? formData.advantages.join('\n') : ''}
                        onChange={(e) => {
                          const advantages = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, advantages }));
                        }}
                        placeholder="Avantage 1&#10;Avantage 2&#10;Avantage 3"
                        rows="4"
                      />
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
                      <label>Image du service</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <label style={{ flex: 1, cursor: 'pointer', padding: '10px', border: '2px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
                          <Upload size={16} style={{ display: 'inline-block', marginRight: '8px' }} />
                          Upload from device
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleImageUrlChange}
                        placeholder="Or paste image URL here..."
                        style={{ marginTop: '10px' }}
                      />
                      {formData.image && (
                        <div className="mt-3">
                          <img
                            src={formData.image}
                            alt="Aperçu"
                            className="w-full h-48 object-cover rounded-lg border"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Fonctionnalités (une par ligne)</label>
                      <textarea
                        name="features"
                        value={Array.isArray(formData.features) ? formData.features.join('\n') : ''}
                        onChange={(e) => {
                          const features = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, features }));
                        }}
                        placeholder="Fonctionnalité 1&#10;Fonctionnalité 2&#10;Fonctionnalité 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Sous-services (un par ligne)</label>
                      <textarea
                        name="sub_services"
                        value={Array.isArray(formData.sub_services) ? formData.sub_services.join('\n') : ''}
                        onChange={(e) => {
                          const sub_services = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, sub_services }));
                        }}
                        placeholder="Sous-service 1&#10;Sous-service 2&#10;Sous-service 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Matériaux (un par ligne)</label>
                      <textarea
                        name="materials"
                        value={Array.isArray(formData.materials) ? formData.materials.join('\n') : ''}
                        onChange={(e) => {
                          const materials = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, materials }));
                        }}
                        placeholder="Matériau 1&#10;Matériau 2&#10;Matériau 3"
                        rows="4"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Avantages (un par ligne)</label>
                      <textarea
                        name="advantages"
                        value={Array.isArray(formData.advantages) ? formData.advantages.join('\n') : ''}
                        onChange={(e) => {
                          const advantages = e.target.value.split('\n').filter(item => item.trim() !== '');
                          setFormData(prev => ({ ...prev, advantages }));
                        }}
                        placeholder="Avantage 1&#10;Avantage 2&#10;Avantage 3"
                        rows="4"
                      />
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
                                        <div className="service-detail-image">
                          {selectedService.image ? (
                            <img 
                  src={getServiceImageUrl(selectedService.image) || getServiceImage(selectedService.title)} 
                  alt={selectedService.title}
                  onError={(e) => {
                    e.target.src = getServiceImage(selectedService.title);
                  }}
                />
                          ) : (
                            <div className="service-placeholder">
                              <span>📷</span>
                            </div>
                          )}
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
