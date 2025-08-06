import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, FileText, Clock, CheckCircle,
  AlertCircle, DollarSign, Calendar, MapPin, Phone, Mail,
  Plus, Search, Filter, Download, Eye, Edit, Trash2,
  ChevronUp, ChevronDown, Star, Award, Target, Zap,
  Settings, Image, MessageSquare, BookOpen, UserPlus, Shield,
  ExternalLink, Package
} from 'lucide-react';
// Dashboard Component - Updated
import { dashboardApi } from '../../api/dashboard';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Loading dashboard data...');
        
        const response = await dashboardApi.getDashboardData();
        console.log('Dashboard response:', response);
        
        if (response.success && response.data) {
          setDashboardData(response.data);
          console.log('Dashboard data set successfully');
        } else {
          console.error('Invalid response structure:', response);
          setError('Structure de réponse invalide');
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Erreur lors du chargement des données du tableau de bord: ' + (err.message || 'Erreur inconnue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Process data for charts
  const monthlyData = dashboardData?.monthly_revenue?.map(item => ({
    name: item.month,
    revenus: item.revenue,
    devis: item.quotes,
    commandes: item.accepted_quotes || 0
  })) || [];

  const serviceData = dashboardData?.service_distribution?.map(item => ({
    name: item.service,
    value: item.count,
    amount: item.amount,
    percentage: item.percentage,
    color: '#3B82F6'
  })) || [];

  const performanceData = dashboardData?.performance_metrics ? [
    { name: 'Taux de conversion', value: dashboardData.performance_metrics.conversion_rate, fill: '#3B82F6' },
    { name: 'Satisfaction client', value: dashboardData.performance_metrics.customer_satisfaction, fill: '#10B981' },
    { name: 'Temps de réponse', value: 100 - (dashboardData.performance_metrics.average_response_time || 24), fill: '#F59E0B' },
    { name: 'Croissance mensuelle', value: dashboardData.performance_metrics.monthly_growth, fill: '#8B5CF6' },
  ] : [];

  const recentQuotes = dashboardData?.recent_quotes || [];
  const recentBlogPosts = dashboardData?.recent_blog_posts || [];
  const recentTestimonials = dashboardData?.recent_testimonials || [];

  const quickStats = dashboardData?.quick_stats ? [
    { title: 'Devis en attente', value: dashboardData.quick_stats.pending_quotes, icon: FileText, color: '#F59E0B', trend: '+5%', trendUp: true },
    { title: 'Commandes actives', value: dashboardData.quick_stats.approved_quotes, icon: Package, color: '#3B82F6', trend: '+12%', trendUp: true },
    { title: 'Services actifs', value: dashboardData.quick_stats.active_services, icon: Target, color: '#10B981', trend: '+8%', trendUp: true },
    { title: 'Articles publiés', value: dashboardData.quick_stats.published_blog_posts, icon: BookOpen, color: '#8B5CF6', trend: '+3%', trendUp: true },
    { title: 'Témoignages actifs', value: dashboardData.quick_stats.approved_testimonials, icon: MessageSquare, color: '#F59E0B', trend: '+2%', trendUp: true },
    { title: 'Revenus totaux', value: `€${dashboardData.quick_stats.total_revenue?.toLocaleString() || '0'}`, icon: DollarSign, color: '#8B5CF6', trend: '+15%', trendUp: true },
  ] : [];

  const managementModules = [
    {
      title: 'Gestion des Services',
      description: 'Gérer les services de charpente, couverture et zinguerie',
      icon: Target,
      color: '#3B82F6',
      count: dashboardData?.quick_stats?.total_services || 0,
      link: '/admin/services',
      stats: { 
        total: dashboardData?.quick_stats?.total_services || 0, 
        actifs: dashboardData?.quick_stats?.active_services || 0, 
        en_attente: 0 
      }
    },
    {
      title: 'Gestion des Devis',
      description: 'Gérer les devis et demandes clients',
      icon: Package,
      color: '#EF4444',
      count: dashboardData?.quick_stats?.total_quotes || 0,
      link: '/admin/quotes',
      stats: { 
        total: dashboardData?.quick_stats?.total_quotes || 0, 
        en_cours: dashboardData?.quick_stats?.approved_quotes || 0, 
        en_attente: dashboardData?.quick_stats?.pending_quotes || 0
      }
    },
    {
      title: 'Gestion de la Galerie',
      description: 'Gérer les photos et projets de travaux',
      icon: Image,
      color: '#10B981',
      count: dashboardData?.quick_stats?.total_gallery_items || 0,
      link: '/admin/gallery',
      stats: { 
        total: dashboardData?.quick_stats?.total_gallery_items || 0, 
        publiés: dashboardData?.quick_stats?.total_gallery_items || 0, 
        brouillons: 0 
      }
    },
    {
      title: 'Gestion des Témoignages',
      description: 'Gérer les avis et recommandations clients',
      icon: MessageSquare,
      color: '#F59E0B',
      count: dashboardData?.quick_stats?.total_testimonials || 0,
      link: '/admin/testimonials',
      stats: { 
        total: dashboardData?.quick_stats?.total_testimonials || 0, 
        approuvés: dashboardData?.quick_stats?.approved_testimonials || 0, 
        en_attente: 0 
      }
    },
    {
      title: 'Gestion du Blog',
      description: 'Gérer les articles et conseils',
      icon: BookOpen,
      color: '#8B5CF6',
      count: dashboardData?.quick_stats?.total_blog_posts || 0,
      link: '/admin/blog',
      stats: { 
        total: dashboardData?.quick_stats?.total_blog_posts || 0, 
        publiés: dashboardData?.quick_stats?.published_blog_posts || 0, 
        brouillons: 0 
      }
    },
    {
      title: 'Gestion des Messages',
      description: 'Gérer les messages de contact',
      icon: MessageSquare,
      color: '#06B6D4',
      count: dashboardData?.quick_stats?.total_contact_messages || 0,
      link: '/admin/contact',
      stats: { 
        total: dashboardData?.quick_stats?.total_contact_messages || 0, 
        lus: dashboardData?.quick_stats?.total_contact_messages - (dashboardData?.quick_stats?.unread_messages || 0), 
        non_lus: dashboardData?.quick_stats?.unread_messages || 0 
      }
    },
    {
      title: 'Gestion des Utilisateurs',
      description: 'Gérer les comptes utilisateurs et permissions',
      icon: UserPlus,
      color: '#8B5CF6',
      count: dashboardData?.quick_stats?.total_users || 0,
      link: '/admin/users',
      stats: { 
        total: dashboardData?.quick_stats?.total_users || 0, 
        actifs: dashboardData?.quick_stats?.total_users || 0, 
        inactifs: 0 
      }
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      accepted: '#10B981',
      quoted: '#3B82F6',
      contacted: '#8B5CF6',
      rejected: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'En attente',
      accepted: 'Approuvé',
      quoted: 'Devisé',
      contacted: 'Contacté',
      rejected: 'Rejeté'
    };
    return texts[status] || status;
  };

  // Navigation functions
  const navigateToModule = (link) => {
    navigate(link);
  };

  const handleExportData = async () => {
    try {
      const response = await dashboardApi.exportData('quotes', 'json');
      
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dashboard-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Erreur lors de l\'exportation des données');
    }
  };

  const handleViewQuote = (quoteId) => {
    navigate(`/admin/quotes?view=${quoteId}`);
  };

  const handleEditQuote = (quoteId) => {
    navigate(`/admin/quotes?edit=${quoteId}`);
  };

  const handleDeleteQuote = (quoteId) => {
    // Simulate delete functionality
    console.log(`Deleting quote ${quoteId}`);
    // In real app, this would call an API
  };

  const filteredQuotes = recentQuotes.filter(quote =>
    quote.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.service_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <p>Chargement du tableau de bord...</p>
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
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <p>Détails techniques:</p>
                <ul style={{ textAlign: 'left', marginLeft: '2rem' }}>
                  <li>Frontend: https://bnbatiment.com</li>
                  <li>Backend: https://api.bnbatiment.com</li>
                  <li>API Endpoint: https://api.bnbatiment.com/api/admin/dashboard</li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.reload()}
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
                <h1>Tableau de bord</h1>
                <p>Gestion complète de votre site BN BÂTIMENT</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="quick-stats-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                    {stat.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {stat.trend}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Management Modules */}
          <motion.div 
            className="management-modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h3>Modules de Gestion</h3>
              <p>Gérez tous les aspects de votre site</p>
            </div>
            
            <div className="modules-grid">
              {managementModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  className="module-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="module-header">
                    <div className="module-icon" style={{ backgroundColor: module.color + '20', color: module.color }}>
                      <module.icon size={24} />
                    </div>
                    <div className="module-info">
                      <h4>{module.title}</h4>
                      <p>{module.description}</p>
                    </div>
                    <div className="module-count">
                      {module.count}
                    </div>
                  </div>
                  
                  <div className="module-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">{module.stats.total}</span>
                    </div>
                    {Object.entries(module.stats).slice(1).map(([key, value]) => (
                      <div key={key} className="stat-item">
                        <span className="stat-label">{key.replace('_', ' ')}:</span>
                        <span className="stat-value">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="module-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => navigateToModule(module.link)}
                    >
                      <ExternalLink size={16} />
                      Accéder
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Charts Section */}
            <motion.div 
              className="charts-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Monthly Overview Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Aperçu mensuel</h3>
                  <div className="chart-actions">
                    <button 
                      className={`chart-btn ${activeTab === 'month' ? 'active' : ''}`}
                      onClick={() => setActiveTab('month')}
                    >
                      Mois
                    </button>
                    <button 
                      className={`chart-btn ${activeTab === 'quarter' ? 'active' : ''}`}
                      onClick={() => setActiveTab('quarter')}
                    >
                      Trimestre
                    </button>
                    <button 
                      className={`chart-btn ${activeTab === 'year' ? 'active' : ''}`}
                      onClick={() => setActiveTab('year')}
                    >
                      Année
                    </button>
                  </div>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorCommandes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenus" 
                        stroke="#3B82F6" 
                        fill="url(#colorRevenus)"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="devis" 
                        stroke="#10B981" 
                        fill="url(#colorServices)"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="commandes" 
                        stroke="#EF4444" 
                        fill="url(#colorCommandes)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Distribution */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Répartition des services</h3>
                </div>
                <div className="chart-content">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-legend">
                    {serviceData.map((item, index) => (
                      <div key={index} className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name} ({item.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="dashboard-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Performance Metrics */}
              <div className="sidebar-card">
                <div className="card-header">
                  <h3>Métriques de performance</h3>
                </div>
                <div className="card-content">
                  <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" data={performanceData}>
                      <RadialBar minAngle={15} background clockWise={true} dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="sidebar-card">
                <div className="card-header">
                  <h3>Activité récente</h3>
                </div>
                <div className="card-content">
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success">
                        <CheckCircle size={16} />
                      </div>
                      <div className="activity-content">
                        <p>Nouvelle commande ajoutée</p>
                        <span>Il y a 2 heures</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon info">
                        <FileText size={16} />
                      </div>
                      <div className="activity-content">
                        <p>Devis #1234 approuvé</p>
                        <span>Il y a 4 heures</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon warning">
                        <AlertCircle size={16} />
                      </div>
                      <div className="activity-content">
                        <p>Nouveau témoignage en attente</p>
                        <span>Il y a 6 heures</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="sidebar-card">
                <div className="card-header">
                  <h3>Actions rapides</h3>
                </div>
                <div className="card-content">
                  <div className="quick-actions">
                    <button 
                      className="quick-action-btn"
                      onClick={() => navigate('/admin/services')}
                    >
                      <Plus size={16} />
                      Nouveau service
                    </button>
                    <button 
                      className="quick-action-btn"
                      onClick={() => navigate('/admin/orders')}
                    >
                      <Package size={16} />
                      Nouvelle commande
                    </button>
                    <button 
                      className="quick-action-btn"
                      onClick={() => navigate('/admin/gallery')}
                    >
                      <Image size={16} />
                      Ajouter photo
                    </button>
                    <button 
                      className="quick-action-btn"
                      onClick={() => navigate('/admin/testimonials')}
                    >
                      <MessageSquare size={16} />
                      Nouveau témoignage
                    </button>
                    <button 
                      className="quick-action-btn"
                      onClick={() => navigate('/admin/blog')}
                    >
                      <BookOpen size={16} />
                      Nouvel article
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>



          {/* Recent Blog Posts Section */}
          


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
   