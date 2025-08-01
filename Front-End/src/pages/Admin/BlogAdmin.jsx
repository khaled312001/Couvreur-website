import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  BookOpen, Settings, CheckCircle, AlertCircle, Clock, Calendar,
  X, Save, Upload, User, Tag, Eye as EyeIcon, Clock as ClockIcon
} from 'lucide-react';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../api/blog';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(null);
  
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
    is_published: false,
    image: null,
    readTime: '5 min'
  });

  // Load blog posts from API
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setError('Erreur lors du chargement des articles');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlogPosts();
  }, []);

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.is_published === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      true: '#10B981',
      false: '#F59E0B',
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      true: 'Publié',
      false: 'Brouillon',
    };
    return texts[status] || status;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'is_published' ? value === 'true' : value
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
  const handleAddPost = async () => {
    try {
      const newPost = await createBlogPost(formData);
      setBlogPosts(prev => [newPost, ...prev]);
      setShowAddModal(false);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: 'Conseils',
        is_published: false,
        image: null,
        readTime: '5 min'
      });
    } catch (error) {
      console.error('Error adding blog post:', error);
      setError('Erreur lors de la création de l\'article');
    }
  };

  // Edit blog post
  const handleEditPost = async () => {
    try {
      const updatedPost = await updateBlogPost(selectedPost.id, formData);
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === selectedPost.id 
            ? updatedPost
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
        is_published: false,
        image: null,
        readTime: '5 min'
      });
    } catch (error) {
      console.error('Error editing blog post:', error);
      setError('Erreur lors de la modification de l\'article');
    }
  };

  // Delete blog post
  const handleDeletePost = async () => {
    try {
      await deleteBlogPost(selectedPost.id);
      setBlogPosts(prev => prev.filter(post => post.id !== selectedPost.id));
      setShowDeleteConfirm(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setError('Erreur lors de la suppression de l\'article');
    }
  };

  // Toggle post status
  const handleToggleStatus = async (postId, newStatus) => {
    try {
      const updatedPost = await updateBlogPost(postId, { is_published: newStatus });
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? updatedPost
            : post
        )
      );
    } catch (error) {
      console.error('Error toggling post status:', error);
      setError('Erreur lors du changement de statut de l\'article');
    }
  };

  // Open edit modal
  const openEditModal = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      is_published: post.is_published,
      image: post.image,
      readTime: post.readTime || '5 min'
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
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(50px, -50px)'
            }} />
            
            <div className="dashboard-header-content" style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Gestion du Blog
                </h1>
                <p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.1rem',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                  Gérez vos articles et conseils avec facilité
                </p>
              </div>
              <div className="dashboard-actions" style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Plus size={16} />
                  Nouvel article
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <div className="stat-card" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            >
              <div className="stat-icon" style={{ 
                backgroundColor: '#3B82F6' + '20', 
                color: '#3B82F6',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <BookOpen size={28} />
              </div>
              <div className="stat-content">
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Total Articles</h3>
                <div className="stat-value" style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{blogPosts.length}</div>
                <div className="stat-trend trend-up" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.875rem',
                  color: '#10B981',
                  fontWeight: '500'
                }}>
                  <CheckCircle size={14} />
                  +2 ce mois
                </div>
              </div>
            </div>

            <div className="stat-card" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            >
              <div className="stat-icon" style={{ 
                backgroundColor: '#10B981' + '20', 
                color: '#10B981',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <CheckCircle size={28} />
              </div>
              <div className="stat-content">
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Publiés</h3>
                <div className="stat-value" style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{blogPosts.filter(p => p.is_published).length}</div>
                <div className="stat-trend trend-up" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.875rem',
                  color: '#10B981',
                  fontWeight: '500'
                }}>
                  <CheckCircle size={14} />
                  {blogPosts.length > 0 ? Math.round((blogPosts.filter(p => p.is_published).length / blogPosts.length) * 100) : 0}% publiés
                </div>
              </div>
            </div>

            <div className="stat-card" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            >
              <div className="stat-icon" style={{ 
                backgroundColor: '#F59E0B' + '20', 
                color: '#F59E0B',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Clock size={28} />
              </div>
              <div className="stat-content">
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Brouillons</h3>
                <div className="stat-value" style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{blogPosts.filter(p => !p.is_published).length}</div>
                <div className="stat-trend trend-down" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.875rem',
                  color: '#F59E0B',
                  fontWeight: '500'
                }}>
                  <AlertCircle size={14} />
                  À publier
                </div>
              </div>
            </div>

            <div className="stat-card" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            >
              <div className="stat-icon" style={{ 
                backgroundColor: '#8B5CF6' + '20', 
                color: '#8B5CF6',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Tag size={28} />
              </div>
              <div className="stat-content">
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Catégories</h3>
                <div className="stat-value" style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>{new Set(blogPosts.map(p => p.category)).size}</div>
                <div className="stat-trend trend-up" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.875rem',
                  color: '#8B5CF6',
                  fontWeight: '500'
                }}>
                  <CheckCircle size={14} />
                  Variées
                </div>
              </div>
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={20} />
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="error-close"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}

          {/* Filters and Search */}
          <motion.div 
            className="filters-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div className="filters-content" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div className="search-box" style={{
                position: 'relative',
                maxWidth: '400px'
              }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div className="filter-buttons" style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <button 
                  className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('all')}
                  style={{
                    padding: '8px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '20px',
                    backgroundColor: filterStatus === 'all' ? '#3b82f6' : 'transparent',
                    color: filterStatus === 'all' ? 'white' : '#374151',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'all') {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.backgroundColor = '#eff6ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'all') {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  Tous ({blogPosts.length})
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'true' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('true')}
                  style={{
                    padding: '8px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '20px',
                    backgroundColor: filterStatus === 'true' ? '#10b981' : 'transparent',
                    color: filterStatus === 'true' ? 'white' : '#374151',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'true') {
                      e.target.style.borderColor = '#10b981';
                      e.target.style.backgroundColor = '#ecfdf5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'true') {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  Publiés ({blogPosts.filter(p => p.is_published).length})
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'false' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('false')}
                  style={{
                    padding: '8px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '20px',
                    backgroundColor: filterStatus === 'false' ? '#f59e0b' : 'transparent',
                    color: filterStatus === 'false' ? 'white' : '#374151',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'false') {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.backgroundColor = '#fffbeb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'false') {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  Brouillons ({blogPosts.filter(p => !p.is_published).length})
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="blog-image" style={{
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={post.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'} 
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {post.category}
                  </div>
                </div>

                <div className="blog-content" style={{ padding: '1.5rem' }}>
                  <div className="blog-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    gap: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: 0,
                      lineHeight: '1.4',
                      flex: 1
                    }}>{post.title}</h3>
                    <div className="blog-actions" style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexShrink: 0
                    }}>
                      <button
                        className="status-badge"
                        style={{ 
                          backgroundColor: getStatusColor(post.is_published) + '20', 
                          color: getStatusColor(post.is_published),
                          cursor: 'pointer',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => handleToggleStatus(post.id, !post.is_published)}
                        title="Cliquer pour changer le statut"
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        {getStatusText(post.is_published)}
                      </button>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={12} />
                      <span>{post.author || 'Admin'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <div className="action-buttons" style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'flex-end'
                  }}>
                    <button 
                      className="action-btn view-btn" 
                      title="Voir"
                      onClick={() => openViewModal(post)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#374151'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#e5e7eb';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-btn edit-btn" 
                      title="Modifier"
                      onClick={() => openEditModal(post)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#eff6ff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#3b82f6'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#dbeafe';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#eff6ff';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      title="Supprimer"
                      onClick={() => openDeleteConfirm(post)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fef2f2',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#ef4444'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fee2e2';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#fef2f2';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
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
                        name="is_published"
                        value={formData.is_published ? 'true' : 'false'}
                        onChange={handleInputChange}
                      >
                        <option value="false">Brouillon</option>
                        <option value="true">Publié</option>
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
                        name="is_published"
                        value={formData.is_published ? 'true' : 'false'}
                        onChange={handleInputChange}
                      >
                        <option value="false">Brouillon</option>
                        <option value="true">Publié</option>
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
                        <img 
                          src={selectedPost.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'} 
                          alt={selectedPost.title} 
                        />
                      </div>
                      
                      <div className="blog-detail-info">
                        <h3>{selectedPost.title}</h3>
                        <p className="blog-detail-excerpt">{selectedPost.excerpt}</p>
                        
                        <div className="blog-detail-meta">
                          <div className="meta-item">
                            <User size={16} />
                            <span>{selectedPost.author || 'BN BUILDING'}</span>
                          </div>
                          <div className="meta-item">
                            <Calendar size={16} />
                            <span>{new Date(selectedPost.published_at || selectedPost.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="meta-item">
                            <Tag size={16} />
                            <span>{selectedPost.category}</span>
                          </div>
                          <div className="meta-item">
                            <ClockIcon size={16} />
                            <span>{selectedPost.readTime || '5 min'}</span>
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
