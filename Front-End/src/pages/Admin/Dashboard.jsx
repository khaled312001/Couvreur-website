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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', devis: 45, services: 12, revenus: 12500, commandes: 8 },
    { name: 'Fév', devis: 52, services: 18, revenus: 15800, commandes: 12 },
    { name: 'Mar', devis: 38, services: 15, revenus: 14200, commandes: 10 },
    { name: 'Avr', devis: 65, services: 22, revenus: 18900, commandes: 15 },
    { name: 'Mai', devis: 58, services: 19, revenus: 16500, commandes: 13 },
    { name: 'Juin', devis: 72, services: 25, revenus: 22100, commandes: 18 },
  ];

  const serviceData = [
    { name: 'Charpente', value: 35, color: '#3B82F6' },
    { name: 'Couverture', value: 25, color: '#10B981' },
    { name: 'Zinguerie', value: 20, color: '#F59E0B' },
    { name: 'Entretien', value: 20, color: '#EF4444' },
  ];

  const performanceData = [
    { name: 'Efficacité', value: 85, fill: '#3B82F6' },
    { name: 'Qualité', value: 92, fill: '#10B981' },
    { name: 'Rapidité', value: 78, fill: '#F59E0B' },
    { name: 'Satisfaction', value: 95, fill: '#8B5CF6' },
  ];

  const recentQuotes = [
    { id: 1, client: 'Jean Dupont', service: 'Installation de Toiture', montant: 8500, statut: 'en_attente', date: '2025-01-15' },
    { id: 2, client: 'Marie Martin', service: 'Maintenance Annuelle', montant: 1200, statut: 'approuvé', date: '2025-01-14' },
    { id: 3, client: 'Pierre Durand', service: 'Réparation Urgente', montant: 3200, statut: 'terminé', date: '2025-01-13' },
    { id: 4, client: 'Sophie Bernard', service: 'Installation Étanchéité', montant: 6500, statut: 'en_cours', date: '2025-01-12' },
  ];

  const quickStats = [
    { title: 'Devis en attente', value: 12, icon: FileText, color: '#F59E0B', trend: '+5%', trendUp: true },
    { title: 'Commandes actives', value: 8, icon: Package, color: '#3B82F6', trend: '+12%', trendUp: true },
    { title: 'Services actifs', value: 6, icon: Target, color: '#10B981', trend: '+8%', trendUp: true },
    { title: 'Revenus mensuels', value: '€22,100', icon: DollarSign, color: '#8B5CF6', trend: '+15%', trendUp: true },
  ];

  const managementModules = [
    {
      title: 'Gestion des Services',
      description: 'Gérer les services de charpente, couverture et zinguerie',
      icon: Target,
      color: '#3B82F6',
      count: 6,
      link: '/admin/services',
      stats: { total: 6, actifs: 5, en_attente: 1 }
    },
    {
      title: 'Gestion des Commandes',
      description: 'Gérer les commandes et projets de construction',
      icon: Package,
      color: '#EF4444',
      count: 18,
      link: '/admin/orders',
      stats: { total: 18, en_cours: 8, en_attente: 6, terminés: 4 }
    },
    {
      title: 'Gestion de la Galerie',
      description: 'Gérer les photos et projets de travaux',
      icon: Image,
      color: '#10B981',
      count: 8,
      link: '/admin/gallery',
      stats: { total: 8, publiés: 7, brouillons: 1 }
    },
    {
      title: 'Gestion des Témoignages',
      description: 'Gérer les avis et recommandations clients',
      icon: MessageSquare,
      color: '#F59E0B',
      count: 12,
      link: '/admin/testimonials',
      stats: { total: 12, approuvés: 10, en_attente: 2 }
    },
    {
      title: 'Gestion du Blog',
      description: 'Gérer les articles et conseils',
      icon: BookOpen,
      color: '#8B5CF6',
      count: 15,
      link: '/admin/blog',
      stats: { total: 15, publiés: 12, brouillons: 3 }
    },
    {
      title: 'Gestion des Devis',
      description: 'Gérer les demandes de devis clients',
      icon: FileText,
      color: '#06B6D4',
      count: 25,
      link: '/admin/quotes',
      stats: { total: 25, nouveaux: 8, en_cours: 12, terminés: 5 }
    },
    {
      title: 'Gestion des Utilisateurs',
      description: 'Gérer les comptes utilisateurs et permissions',
      icon: UserPlus,
      color: '#8B5CF6',
      count: 3,
      link: '/admin/users',
      stats: { total: 3, actifs: 2, inactifs: 1 }
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      en_attente: '#F59E0B',
      approuvé: '#10B981',
      terminé: '#3B82F6',
      en_cours: '#8B5CF6'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      en_attente: 'En attente',
      approuvé: 'Approuvé',
      terminé: 'Terminé',
      en_cours: 'En cours'
    };
    return texts[status] || status;
  };

  // Navigation functions
  const navigateToModule = (link) => {
    navigate(link);
  };

  const handleExportData = () => {
    // Simulate export functionality
    const data = {
      monthlyData,
      serviceData,
      performanceData,
      recentQuotes,
      quickStats
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.service.toLowerCase().includes(searchTerm.toLowerCase())
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
                        dataKey="services" 
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
                        <span>{item.name}</span>
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

          {/* Recent Quotes Table */}
          <motion.div 
            className="recent-quotes-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="section-header">
              <h3>Devis récents</h3>
              <div className="section-actions">
                <div className="search-box">
                  <Search size={16} />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate('/admin/quotes')}
                >
                  <ExternalLink size={16} />
                  Voir tous
                </button>
              </div>
            </div>
            
            <div className="quotes-table">
              <div className="table-header">
                <div className="table-cell">Client</div>
                <div className="table-cell">Service</div>
                <div className="table-cell">Montant</div>
                <div className="table-cell">Statut</div>
                <div className="table-cell">Date</div>
                <div className="table-cell">Actions</div>
              </div>
              
              <div className="table-body">
                {filteredQuotes.map((quote, index) => (
                  <motion.div
                    key={quote.id}
                    className="table-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                  >
                    <div className="table-cell">
                      <div className="client-info">
                        <div className="client-avatar">
                          {quote.client.charAt(0)}
                        </div>
                        <span>{quote.client}</span>
                      </div>
                    </div>
                    <div className="table-cell">{quote.service}</div>
                    <div className="table-cell">€{quote.montant.toLocaleString()}</div>
                    <div className="table-cell">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(quote.statut) + '20', color: getStatusColor(quote.statut) }}
                      >
                        {getStatusText(quote.statut)}
                      </span>
                    </div>
                    <div className="table-cell">{new Date(quote.date).toLocaleDateString('fr-FR')}</div>
                    <div className="table-cell">
                      <div className="action-buttons">
                        <button 
                          className="action-btn" 
                          title="Voir"
                          onClick={() => handleViewQuote(quote.id)}
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="action-btn" 
                          title="Modifier"
                          onClick={() => handleEditQuote(quote.id)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="action-btn danger" 
                          title="Supprimer"
                          onClick={() => handleDeleteQuote(quote.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
