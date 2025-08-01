import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Search, Filter, Plus, Eye, Edit, Trash2, Reply, 
  CheckCircle, Clock, AlertCircle, Archive, RefreshCw,
  ChevronUp, ChevronDown, Calendar, User, Phone, MessageSquare,
  ExternalLink, Download, MoreVertical, Star, Flag
} from 'lucide-react';
import { contactApi } from '../../api/contact';

const ContactAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0
  });

  // Load messages
  useEffect(() => {
    loadMessages();
  }, [currentPage, statusFilter, sortBy, sortOrder]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let endpoint = '/admin/contact';
      const params = {
        page: currentPage,
        sort_by: sortBy,
        sort_order: sortOrder
      };

      if (statusFilter !== 'all') {
        endpoint = `/admin/contact/status/${statusFilter}`;
      }

      const response = await contactApi.getMessages(params);
      setMessages(response.data || response);
      setFilteredMessages(response.data || response);
      
      // Calculate stats
      const total = response.data?.length || response.length || 0;
      const unread = response.data?.filter(m => m.status === 'unread').length || 
                     response.filter(m => m.status === 'unread').length || 0;
      const read = response.data?.filter(m => m.status === 'read').length || 
                   response.filter(m => m.status === 'read').length || 0;
      const replied = response.data?.filter(m => m.status === 'replied').length || 
                      response.filter(m => m.status === 'replied').length || 0;
      
      setStats({ total, unread, read, replied });
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Erreur lors du chargement des messages');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter messages
  useEffect(() => {
    let filtered = messages;
    
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMessages(filtered);
  }, [messages, searchTerm]);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleReplyMessage = (message) => {
    setSelectedMessage(message);
    setIsReplyModalOpen(true);
  };

  const handleUpdateStatus = async (messageId, newStatus) => {
    try {
      await contactApi.updateMessage(messageId, { status: newStatus });
      loadMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await contactApi.deleteMessage(messageId);
        loadMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleReply = async (messageId, response) => {
    try {
      await contactApi.updateMessage(messageId, {
        status: 'replied',
        admin_response: response
      });
      setIsReplyModalOpen(false);
      setSelectedMessage(null);
      loadMessages();
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      unread: '#EF4444',
      read: '#3B82F6',
      replied: '#10B981',
      archived: '#6B7280'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      unread: AlertCircle,
      read: CheckCircle,
      replied: Reply,
      archived: Archive
    };
    return icons[status] || Clock;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <p>Chargement des messages...</p>
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
                onClick={loadMessages}
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
            className="page-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-content">
              <div>
                <h1>Gestion des Messages</h1>
                <p>Gérez les messages de contact de vos clients</p>
              </div>
              <div className="header-actions">
                <button 
                  className="btn-secondary"
                  onClick={loadMessages}
                >
                  <RefreshCw size={16} />
                  Actualiser
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#3B82F6' + '20', color: '#3B82F6' }}>
                <Mail size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Messages</h3>
                <div className="stat-value">{stats.total}</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#EF4444' + '20', color: '#EF4444' }}>
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Non lus</h3>
                <div className="stat-value">{stats.unread}</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#3B82F6' + '20', color: '#3B82F6' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Lus</h3>
                <div className="stat-value">{stats.read}</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <Reply size={24} />
              </div>
              <div className="stat-content">
                <h3>Répondu</h3>
                <div className="stat-value">{stats.replied}</div>
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
                  placeholder="Rechercher un message..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-controls">
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="unread">Non lus</option>
                  <option value="read">Lus</option>
                  <option value="replied">Répondu</option>
                </select>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="created_at">Date</option>
                  <option value="name">Nom</option>
                  <option value="email">Email</option>
                  <option value="status">Statut</option>
                </select>
                
                <button 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="sort-btn"
                >
                  {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Messages Table */}
          <motion.div 
            className="messages-table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="table-header">
              <div className="table-cell">Client</div>
              <div className="table-cell">Sujet</div>
              <div className="table-cell">Message</div>
              <div className="table-cell">Statut</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Actions</div>
            </div>
            
            <div className="table-body">
              {filteredMessages.length === 0 ? (
                <div className="empty-state">
                  <Mail size={48} />
                  <h3>Aucun message trouvé</h3>
                  <p>Aucun message ne correspond à vos critères de recherche.</p>
                </div>
              ) : (
                filteredMessages.map((message, index) => {
                  const StatusIcon = getStatusIcon(message.status);
                  return (
                    <motion.div
                      key={message.id}
                      className="table-row"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ backgroundColor: '#F9FAFB' }}
                    >
                      <div className="table-cell">
                        <div className="client-info">
                          <div className="client-avatar">
                            {message.name?.charAt(0) || 'C'}
                          </div>
                          <div className="client-details">
                            <span className="client-name">{message.name}</span>
                            <span className="client-email">{message.email}</span>
                            {message.phone && (
                              <span className="client-phone">{message.phone}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="subject-content">
                          <span className="subject-text">{message.subject}</span>
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="message-preview">
                          {message.message?.length > 100 
                            ? `${message.message.substring(0, 100)}...` 
                            : message.message}
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: getStatusColor(message.status) + '20', 
                            color: getStatusColor(message.status) 
                          }}
                        >
                          <StatusIcon size={14} />
                          {message.status === 'unread' ? 'Non lu' :
                           message.status === 'read' ? 'Lu' :
                           message.status === 'replied' ? 'Répondu' : message.status}
                        </span>
                      </div>
                      
                      <div className="table-cell">
                        <span className="date-text">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      
                      <div className="table-cell">
                        <div className="action-buttons">
                          <button 
                            className="action-btn" 
                            title="Voir"
                            onClick={() => handleViewMessage(message)}
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            className="action-btn" 
                            title="Répondre"
                            onClick={() => handleReplyMessage(message)}
                          >
                            <Reply size={14} />
                          </button>
                          <button 
                            className="action-btn danger" 
                            title="Supprimer"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Message Detail Modal */}
          <AnimatePresence>
            {isModalOpen && selectedMessage && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h3>Détails du Message</h3>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="close-btn"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="message-details">
                      <div className="detail-row">
                        <span className="detail-label">Nom:</span>
                        <span className="detail-value">{selectedMessage.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{selectedMessage.email}</span>
                      </div>
                      {selectedMessage.phone && (
                        <div className="detail-row">
                          <span className="detail-label">Téléphone:</span>
                          <span className="detail-value">{selectedMessage.phone}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="detail-label">Sujet:</span>
                        <span className="detail-value">{selectedMessage.subject}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{formatDate(selectedMessage.created_at)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Statut:</span>
                        <span className="detail-value">
                          <span 
                            className="status-badge"
                            style={{ 
                              backgroundColor: getStatusColor(selectedMessage.status) + '20', 
                              color: getStatusColor(selectedMessage.status) 
                            }}
                          >
                            {selectedMessage.status === 'unread' ? 'Non lu' :
                             selectedMessage.status === 'read' ? 'Lu' :
                             selectedMessage.status === 'replied' ? 'Répondu' : selectedMessage.status}
                          </span>
                        </span>
                      </div>
                      <div className="detail-row full-width">
                        <span className="detail-label">Message:</span>
                        <div className="message-content">
                          {selectedMessage.message}
                        </div>
                      </div>
                      {selectedMessage.admin_response && (
                        <div className="detail-row full-width">
                          <span className="detail-label">Réponse:</span>
                          <div className="admin-response">
                            {selectedMessage.admin_response}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Fermer
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setIsModalOpen(false);
                        handleReplyMessage(selectedMessage);
                      }}
                    >
                      <Reply size={16} />
                      Répondre
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply Modal */}
          <AnimatePresence>
            {isReplyModalOpen && selectedMessage && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsReplyModalOpen(false)}
              >
                <motion.div 
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h3>Répondre au Message</h3>
                    <button 
                      onClick={() => setIsReplyModalOpen(false)}
                      className="close-btn"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="reply-form">
                      <div className="form-group">
                        <label>De:</label>
                        <input 
                          type="text" 
                          value="admin@bnbatiment.fr" 
                          disabled 
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>À:</label>
                        <input 
                          type="email" 
                          value={selectedMessage.email} 
                          disabled 
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Réponse:</label>
                        <textarea 
                          placeholder="Tapez votre réponse..."
                          className="form-textarea"
                          rows={6}
                          id="reply-text"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      className="btn-secondary"
                      onClick={() => setIsReplyModalOpen(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        const response = document.getElementById('reply-text').value;
                        if (response.trim()) {
                          handleReply(selectedMessage.id, response);
                        }
                      }}
                    >
                      <Reply size={16} />
                      Envoyer la réponse
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

export default ContactAdmin; 