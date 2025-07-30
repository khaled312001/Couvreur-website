import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  BookOpen, Settings, CheckCircle, AlertCircle, Clock, Calendar,
  X, Save, Upload, User, Tag, Eye as EyeIcon, Clock as ClockIcon
} from 'lucide-react';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Conseils',
    status: 'draft',
    image: null,
    readTime: '5 min'
  });

  // Mock blog data
  const mockBlogPosts = [
    {
      id: 1,
      title: "Comment choisir le bon type de toiture",
      content: "Guide complet pour choisir le type de toiture adapté à votre maison et votre budget. Nous vous expliquons les différents matériaux disponibles, leurs avantages et inconvénients, ainsi que les critères à prendre en compte pour faire le bon choix.",
      excerpt: "Découvrez les différents types de toitures et leurs avantages respectifs.",
      author: "BN BUILDING",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Conseils",
      status: "published",
      views: 1250,
      readTime: "5 min"
    },
    {
      id: 2,
      title: "L'importance de l'isolation thermique",
      content: "L'isolation thermique de votre toiture peut réduire significativement vos factures d'énergie. Découvrez les techniques d'isolation modernes et les matériaux les plus efficaces pour optimiser votre confort et vos économies.",
      excerpt: "Pourquoi l'isolation thermique est essentielle pour votre confort et vos économies.",
      author: "BN BUILDING",
      date: "2025-01-10",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Isolation",
      status: "published",
      views: 890,
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Entretien préventif de votre toiture",
      content: "Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses. Nous vous donnons tous les conseils pratiques pour maintenir votre toiture en excellent état tout au long de l'année.",
      excerpt: "Les bonnes pratiques pour maintenir votre toiture en excellent état.",
      author: "BN BUILDING",
      date: "2025-01-05",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Entretien",
      status: "published",
      views: 756,
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Les avantages du zinc en couverture",
      content: "Le zinc est un matériau de couverture très apprécié pour sa durabilité et son esthétique. Découvrez pourquoi le zinc est un excellent choix pour votre toiture et comment il s'intègre parfaitement dans tous les styles architecturaux.",
      excerpt: "Découvrez pourquoi le zinc est un excellent choix pour votre toiture.",
      author: "BN BUILDING",
      date: "2025-01-02",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Matériaux",
      status: "draft",
      views: 0,
      readTime: "7 min"
    },
    {
      id: 5,
      title: "Réparation d'urgence : que faire en cas de fuite",
      content: "En cas de fuite de toiture, il est important d'agir rapidement pour limiter les dégâts. Nous vous expliquons les étapes à suivre en urgence et comment procéder pour une réparation efficace et durable.",
      excerpt: "Les étapes à suivre en cas d'urgence pour réparer une fuite de toiture.",
      author: "BN BUILDING",
      date: "2024-12-28",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Réparation",
      status: "published",
      views: 1120,
      readTime: "8 min"
    },
    {
      id: 6,
      title: "Choisir ses fenêtres de toit",
      content: "Les fenêtres de toit apportent lumière et ventilation à vos combles. Nous vous guidons dans le choix des bonnes fenêtres selon vos besoins, votre budget et les contraintes techniques de votre toiture.",
      excerpt: "Guide pour choisir les bonnes fenêtres de toit selon vos besoins.",
      author: "BN BUILDING",
      date: "2024-12-25",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      category: "Installation",
      status: "published",
      views: 634,
      readTime: "5 min"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogPosts(mockBlogPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
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

  // Add new blog post
  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      ...formData,
      author: "BN BUILDING",
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setBlogPosts(prev => [newPost, ...prev]);
    setShowAddModal(false);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'Conseils',
      status: 'draft',
      image: null,
      readTime: '5 min'
    });
  };

  // Edit blog post
  const handleEditPost = () => {
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, ...formData }
          : post
      )
    );
    setShowEditModal(false);
    setSelectedPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'Conseils',
      status: 'draft',
      image: null,
      readTime: '5 min'
    });
  };

  // Delete blog post
  const handleDeletePost = () => {
    setBlogPosts(prev => prev.filter(post => post.id !== selectedPost.id));
    setShowDeleteConfirm(false);
    setSelectedPost(null);
  };

  // Toggle post status
  const handleToggleStatus = (postId, newStatus) => {
    setBlogPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, status: newStatus }
          : post
      )
    );
  };

  // Open edit modal
  const openEditModal = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      image: post.image,
      readTime: post.readTime
    });
    setShowEditModal(true);
  };

  // Open view modal
  const openViewModal = (post) => {
    setSelectedPost(post);
    setShowViewModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (post) => {
    setSelectedPost(post);
    setShowDeleteConfirm(true);
  };

  // Handle settings
  const handleSettings = () => {
    // Simulate settings functionality
    console.log('Opening blog settings');
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
              <p>Chargement du blog...</p>
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
                <h1>Gestion du Blog</h1>
                <p>Gérez vos articles et conseils</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus size={16} />
                  Nouvel article
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
                <BookOpen size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Articles</h3>
                <div className="stat-value">{blogPosts.length}</div>
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
                <h3>Publiés</h3>
                <div className="stat-value">{blogPosts.filter(p => p.status === 'published').length}</div>
                <div className="stat-trend trend-up">
                  <CheckCircle size={14} />
                  83% publiés
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#F59E0B' + '20', color: '#F59E0B' }}>
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>Brouillons</h3>
                <div className="stat-value">{blogPosts.filter(p => p.status === 'draft').length}</div>
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
                <div className="stat-value">{blogPosts.reduce((sum, post) => sum + post.views, 0)}</div>
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
                  placeholder="Rechercher un article..." 
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
                  className={`filter-btn ${filterStatus === 'published' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('published')}
                >
                  Publiés
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('draft')}
                >
                  Brouillons
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'archived' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('archived')}
                >
                  Archivés
                </button>
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div 
            className="blog-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="image-overlay">
                    <div className="overlay-actions">
                      <button 
                        className="overlay-btn" 
                        title="Voir"
                        onClick={() => openViewModal(post)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="overlay-btn" 
                        title="Modifier"
                        onClick={() => openEditModal(post)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="overlay-btn danger" 
                        title="Supprimer"
                        onClick={() => openDeleteConfirm(post)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="blog-content">
                  <div className="blog-header">
                    <h3>{post.title}</h3>
                    <button
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(post.status) + '20', 
                        color: getStatusColor(post.status),
                        cursor: 'pointer',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                      onClick={() => handleToggleStatus(post.id, post.status === 'published' ? 'draft' : 'published')}
                      title="Cliquer pour changer le statut"
                    >
                      {getStatusText(post.status)}
                    </button>
                  </div>
                  
                  <p className="blog-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-meta">
                    <div className="meta-item">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="meta-item">
                      <Tag size={14} />
                      <span>{post.category}</span>
                    </div>
                    <div className="meta-item">
                      <EyeIcon size={14} />
                      <span>{post.views} vues</span>
                    </div>
                    <div className="meta-item">
                      <ClockIcon size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredBlogPosts.length === 0 && (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <BookOpen size={48} />
              <h3>Aucun article trouvé</h3>
              <p>Aucun article ne correspond à vos critères de recherche.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={16} />
                Nouvel article
              </button>
            </motion.div>
          )}

          {/* Add Blog Post Modal */}
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
                    <h2>Nouvel article</h2>
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
                        placeholder="Titre de l'article..."
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Extrait</label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        placeholder="Résumé court de l'article..."
                        rows="2"
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
                          <option value="Conseils">Conseils</option>
                          <option value="Isolation">Isolation</option>
                          <option value="Entretien">Entretien</option>
                          <option value="Matériaux">Matériaux</option>
                          <option value="Réparation">Réparation</option>
                          <option value="Installation">Installation</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Temps de lecture</label>
                        <input
                          type="text"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleInputChange}
                          placeholder="Ex: 5 min"
                        />
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
                            <Upload size={20} />
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
                    
                    <div className="form-group">
                      <label>Contenu</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Contenu de l'article..."
                        rows="8"
                      />
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
                        <option value="archived">Archivé</option>
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
                      onClick={handleAddPost}
                      disabled={!formData.title || !formData.content}
                    >
                      <Save size={16} />
                      Publier l'article
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Blog Post Modal */}
          <AnimatePresence>
            {showEditModal && selectedPost && (
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
                    <h2>Modifier l'article</h2>
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
                        placeholder="Titre de l'article..."
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Extrait</label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        placeholder="Résumé court de l'article..."
                        rows="2"
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
                          <option value="Conseils">Conseils</option>
                          <option value="Isolation">Isolation</option>
                          <option value="Entretien">Entretien</option>
                          <option value="Matériaux">Matériaux</option>
                          <option value="Réparation">Réparation</option>
                          <option value="Installation">Installation</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Temps de lecture</label>
                        <input
                          type="text"
                          name="readTime"
                          value={formData.readTime}
                          onChange={handleInputChange}
                          placeholder="Ex: 5 min"
                        />
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
                            <Upload size={20} />
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
                    
                    <div className="form-group">
                      <label>Contenu</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Contenu de l'article..."
                        rows="8"
                      />
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
                        <option value="archived">Archivé</option>
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
                      onClick={handleEditPost}
                      disabled={!formData.title || !formData.content}
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Blog Post Modal */}
          <AnimatePresence>
            {showViewModal && selectedPost && (
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
                    <h2>Détails de l'article</h2>
                    <button 
                      className="modal-close"
                      onClick={() => setShowViewModal(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="blog-detail-view">
                      <div className="blog-detail-image">
                        <img src={selectedPost.image} alt={selectedPost.title} />
                      </div>
                      
                      <div className="blog-detail-info">
                        <h3>{selectedPost.title}</h3>
                        <p className="blog-detail-excerpt">{selectedPost.excerpt}</p>
                        
                        <div className="blog-detail-meta">
                          <div className="meta-item">
                            <User size={16} />
                            <span>{selectedPost.author}</span>
                          </div>
                          <div className="meta-item">
                            <Calendar size={16} />
                            <span>{new Date(selectedPost.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="meta-item">
                            <Tag size={16} />
                            <span>{selectedPost.category}</span>
                          </div>
                          <div className="meta-item">
                            <EyeIcon size={16} />
                            <span>{selectedPost.views} vues</span>
                          </div>
                          <div className="meta-item">
                            <ClockIcon size={16} />
                            <span>{selectedPost.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="blog-detail-content">
                          <h4>Contenu</h4>
                          <p>{selectedPost.content}</p>
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
                        openEditModal(selectedPost);
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
            {showDeleteConfirm && selectedPost && (
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
                      <h3>Êtes-vous sûr de vouloir supprimer cet article ?</h3>
                      <p>Cette action est irréversible et supprimera définitivement l'article "{selectedPost.title}".</p>
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
                      onClick={handleDeletePost}
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

export default BlogAdmin;
