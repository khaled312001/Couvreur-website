import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Search, Filter, Plus, Eye, Edit, Trash2, Reply, 
  CheckCircle, Clock, AlertCircle, Archive, RefreshCw,
  ChevronUp, ChevronDown, Calendar, User, Phone, MessageSquare,
  ExternalLink, Download, MoreVertical, Star, Flag, MailOpen,
  Send, ReplyAll, Archive as ArchiveIcon, Trash, EyeOff, X
} from 'lucide-react';
import { contactApi } from '../../api/contact';
import { notificationsApi } from '../../api/notifications';

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
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);

  // Load messages
  useEffect(() => {
    loadMessages();
  }, [currentPage, statusFilter, sortBy, sortOrder]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading messages with params:', { currentPage, statusFilter, sortBy, sortOrder });
      
      let endpoint = '/admin/contact';
      const params = {
        page: currentPage,
        sort_by: sortBy,
        sort_order: sortOrder
      };

      if (statusFilter !== 'all') {
        endpoint = `/admin/contact/status/${statusFilter}`;
      }

      console.log('Making API call to:', endpoint, 'with params:', params);
      const response = await contactApi.getMessages(params);
      console.log('API response:', response);
      
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
      
      // Trigger notification update when new messages are loaded
      triggerNotificationUpdate();
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Erreur lors du chargement des messages: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to trigger notification update
  const triggerNotificationUpdate = async () => {
    try {
      // Dispatch a custom event to notify the NotificationsDropdown
      window.dispatchEvent(new CustomEvent('notifications-update'));
    } catch (error) {
      console.error('Error triggering notification update:', error);
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
      console.log('Updating status for message:', messageId, 'to:', newStatus);
      const response = await contactApi.updateMessage(messageId, { status: newStatus });
      console.log('Update response:', response);
      await loadMessages();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Erreur lors de la mise à jour du statut: ' + err.message);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        console.log('Deleting message:', messageId);
        const response = await contactApi.deleteMessage(messageId);
        console.log('Delete response:', response);
        await loadMessages();
      } catch (err) {
        console.error('Error deleting message:', err);
        alert('Erreur lors de la suppression: ' + err.message);
      }
    }
  };

  const handleReply = async (messageId, response) => {
    try {
      console.log('Replying to message:', messageId, 'with:', response);
      const result = await contactApi.replyToMessage(messageId, response);
      console.log('Reply response:', result);
      await loadMessages();
      setIsReplyModalOpen(false);
    } catch (err) {
      console.error('Error replying to message:', err);
      alert('Erreur lors de la réponse: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return '#EF4444';
      case 'read': return '#3B82F6';
      case 'replied': return '#10B981';
      case 'archived': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread': return AlertCircle;
      case 'read': return MailOpen;
      case 'replied': return Reply;
      case 'archived': return ArchiveIcon;
      default: return Mail;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(m => m.id));
    }
  };

  const handleBulkAction = async (action) => {
    try {
      for (const messageId of selectedMessages) {
        switch (action) {
          case 'mark-read':
            await contactApi.updateMessage(messageId, { status: 'read' });
            break;
          case 'mark-replied':
            await contactApi.updateMessage(messageId, { status: 'replied' });
            break;
          case 'archive':
            await contactApi.updateMessage(messageId, { status: 'archived' });
            break;
          case 'delete':
            await contactApi.deleteMessage(messageId);
            break;
        }
      }
      setSelectedMessages([]);
      await loadMessages();
    } catch (err) {
      console.error('Error performing bulk action:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-container">
          <AlertCircle size={48} color="#EF4444" />
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button 
            className="btn-primary"
            onClick={loadMessages}
          >
            <RefreshCw size={16} />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-main">
        <div className="admin-content">
          {/* Enhanced Header */}
          <motion.div 
            className="page-header enhanced"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-content">
              <div className="header-left">
                <div className="header-icon">
                  <Mail size={32} />
                </div>
                <div>
                  <h1>Messages de Contact</h1>
                  <p>Gérez et répondez aux messages de vos clients</p>
                </div>
              </div>
              <div className="header-actions">
                <button 
                  className="btn-secondary"
                  onClick={loadMessages}
                >
                  <RefreshCw size={16} />
                  Actualiser
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
                >
                  <MoreVertical size={16} />
                  Actions
                </button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <motion.div 
            className="stats-grid enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="stat-card enhanced"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#3B82F6' + '20', color: '#3B82F6' }}>
                <Mail size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Messages</h3>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-change">+12% ce mois</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-card enhanced"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#EF4444' + '20', color: '#EF4444' }}>
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Non lus</h3>
                <div className="stat-value">{stats.unread}</div>
                <div className="stat-change urgent">Nécessite attention</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-card enhanced"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#3B82F6' + '20', color: '#3B82F6' }}>
                <MailOpen size={24} />
              </div>
              <div className="stat-content">
                <h3>Lus</h3>
                <div className="stat-value">{stats.read}</div>
                <div className="stat-change">En attente</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-card enhanced"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#10B981' + '20', color: '#10B981' }}>
                <Reply size={24} />
              </div>
              <div className="stat-content">
                <h3>Répondu</h3>
                <div className="stat-value">{stats.replied}</div>
                <div className="stat-change success">Terminé</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bulk Actions */}
          <AnimatePresence>
            {isBulkActionsOpen && (
              <motion.div 
                className="bulk-actions"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bulk-actions-content">
                  <div className="bulk-info">
                    <span>{selectedMessages.length} message(s) sélectionné(s)</span>
                  </div>
                  <div className="bulk-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={() => handleBulkAction('mark-read')}
                      disabled={selectedMessages.length === 0}
                    >
                      <MailOpen size={16} />
                      Marquer comme lu
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleBulkAction('mark-replied')}
                      disabled={selectedMessages.length === 0}
                    >
                      <Reply size={16} />
                      Marquer comme répondu
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleBulkAction('archive')}
                      disabled={selectedMessages.length === 0}
                    >
                      <ArchiveIcon size={16} />
                      Archiver
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleBulkAction('delete')}
                      disabled={selectedMessages.length === 0}
                    >
                      <Trash size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Filters and Search */}
          <motion.div 
            className="filters-section enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="filters-header">
              <h3>Filtres et Recherche</h3>
              <div className="filters-stats">
                <span className="results-count">{filteredMessages.length} message(s) trouvé(s)</span>
              </div>
            </div>
            
            <div className="filters-content">
              <div className="search-section">
                <div className="search-box enhanced">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Rechercher par nom, email, sujet..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchTerm('')}
                      title="Effacer la recherche"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="filter-controls enhanced">
                <div className="filter-group">
                  <label>
                    <Filter size={14} />
                    Statut
                  </label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select enhanced"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="unread">Non lus</option>
                    <option value="read">Lus</option>
                    <option value="replied">Répondu</option>
                    <option value="archived">Archivé</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>
                    <Calendar size={14} />
                    Trier par
                  </label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select enhanced"
                  >
                    <option value="created_at">Date</option>
                    <option value="name">Nom</option>
                    <option value="email">Email</option>
                    <option value="status">Statut</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="sort-btn enhanced"
                  title={sortOrder === 'asc' ? 'Ordre croissant' : 'Ordre décroissant'}
                >
                  {sortOrder === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Messages Table */}
          <motion.div 
            className="messages-table-container enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="table-header enhanced">
              <div className="table-cell checkbox-cell">
                <input 
                  type="checkbox"
                  checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="table-cell">Client</div>
              <div className="table-cell">Sujet</div>
              <div className="table-cell">Message</div>
              <div className="table-cell">Statut</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Actions</div>
            </div>
            
            <div className="table-body enhanced">
              {filteredMessages.length === 0 ? (
                <motion.div 
                  className="empty-state enhanced"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail size={64} />
                  <h3>Aucun message trouvé</h3>
                  <p>Aucun message ne correspond à vos critères de recherche.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                  >
                    Réinitialiser les filtres
                  </button>
                </motion.div>
              ) : (
                filteredMessages.map((message, index) => {
                  const StatusIcon = getStatusIcon(message.status);
                  const isSelected = selectedMessages.includes(message.id);
                  return (
                    <motion.div
                      key={message.id}
                      className={`table-row enhanced ${isSelected ? 'selected' : ''} ${message.status === 'unread' ? 'unread' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ backgroundColor: '#F9FAFB', transform: 'translateY(-2px)' }}
                    >
                      <div className="table-cell checkbox-cell">
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectMessage(message.id)}
                        />
                      </div>
                      
                      <div className="table-cell">
                        <div className="client-info enhanced">
                          <div className="client-avatar enhanced">
                            {message.name?.charAt(0) || 'C'}
                          </div>
                          <div className="client-details">
                            <span className="client-name">{message.name}</span>
                            <span className="client-email">{message.email}</span>
                            {message.phone && (
                              <span className="client-phone">
                                <Phone size={12} />
                                {message.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="subject-content enhanced">
                          <span className="subject-text">{message.subject}</span>
                          {message.status === 'unread' && (
                            <span className="unread-indicator"></span>
                          )}
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="message-preview enhanced">
                          {message.message?.length > 100 
                            ? `${message.message.substring(0, 100)}...` 
                            : message.message}
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div 
                          className="status-badge enhanced"
                          style={{ backgroundColor: getStatusColor(message.status) + '20', color: getStatusColor(message.status) }}
                        >
                          <StatusIcon size={14} />
                          <span>{message.statusText || message.status}</span>
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="date-content">
                          <Calendar size={14} />
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="table-cell">
                        <div className="actions-cell">
                          <button 
                            className="action-btn view"
                            onClick={() => handleViewMessage(message)}
                            title="Voir le message"
                          >
                            <Eye size={18} />
                          </button>
                          
                          <button 
                            className="action-btn reply"
                            onClick={() => handleReplyMessage(message)}
                            title="Répondre"
                          >
                            <Reply size={18} />
                          </button>
                          
                          {message.status === 'unread' && (
                            <button 
                              className="action-btn mark-read"
                              onClick={() => handleUpdateStatus(message.id, 'read')}
                              title="Marquer comme lu"
                            >
                              <MailOpen size={18} />
                            </button>
                          )}
                          
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteMessage(message.id)}
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* View Message Modal */}
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
                <h2>Détails du message</h2>
                <button 
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="message-details">
                  <div className="detail-row">
                    <strong>De:</strong>
                    <span>{selectedMessage.name} ({selectedMessage.email})</span>
                  </div>
                  {selectedMessage.phone && (
                    <div className="detail-row">
                      <strong>Téléphone:</strong>
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Sujet:</strong>
                    <span>{selectedMessage.subject}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Date:</strong>
                    <span>{formatDate(selectedMessage.created_at)}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Statut:</strong>
                    <span className={`status-badge ${selectedMessage.status}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Message:</strong>
                    <div className="message-content">
                      {selectedMessage.message}
                    </div>
                  </div>
                  {selectedMessage.admin_response && (
                    <div className="detail-row">
                      <strong>Réponse admin:</strong>
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
                <h2>Répondre au message</h2>
                <button 
                  className="modal-close-btn"
                  onClick={() => setIsReplyModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="original-message">
                  <h4>Message original:</h4>
                  <div className="message-preview">
                    <p><strong>De:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                    <p><strong>Sujet:</strong> {selectedMessage.subject}</p>
                    <p><strong>Message:</strong></p>
                    <div className="message-text">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
                
                <div className="reply-form">
                  <h4>Votre réponse:</h4>
                  <textarea
                    className="reply-textarea"
                    placeholder="Tapez votre réponse ici..."
                    rows="6"
                    id="replyText"
                  />
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
                    const replyText = document.getElementById('replyText').value;
                    if (replyText.trim()) {
                      handleReply(selectedMessage.id, replyText);
                    } else {
                      alert('Veuillez saisir une réponse.');
                    }
                  }}
                >
                  <Send size={16} />
                  Envoyer la réponse
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px;
        }

        .admin-main {
          max-width: 1400px;
          margin: 0;
          margin-left: 10px;
        }

        .admin-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .page-header.enhanced {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          margin: 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .stats-grid.enhanced {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 30px;
          background: #f8fafc;
        }

        .stat-card.enhanced {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content h3 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .stat-change {
          font-size: 12px;
          color: #64748b;
        }

        .stat-change.urgent {
          color: #ef4444;
        }

        .stat-change.success {
          color: #10b981;
        }

        .bulk-actions {
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .bulk-actions-content {
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bulk-info {
          font-weight: 500;
          color: #374151;
        }

        .bulk-buttons {
          display: flex;
          gap: 10px;
        }

        .filters-section.enhanced {
          padding: 25px 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          position: relative;
        }

        .filters-section.enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filters-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filters-stats {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .results-count {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .filters-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-section {
          flex: 1;
        }

        .search-box.enhanced {
          position: relative;
          flex: 1;
          max-width: 500px;
        }

        .search-box.enhanced input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .search-box.enhanced input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .search-box.enhanced svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .clear-search {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(239, 68, 68, 0.1);
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 4px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .clear-search:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.1);
        }

        .filter-controls.enhanced {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 150px;
        }

        .filter-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-select.enhanced {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          background: white;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }

        .filter-select.enhanced:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .filter-select.enhanced:hover {
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        .sort-btn.enhanced {
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          height: 48px;
        }

        .sort-btn.enhanced:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .messages-table-container.enhanced {
          overflow: hidden;
        }

        .table-header.enhanced {
          display: grid;
          grid-template-columns: 50px 2fr 2fr 3fr 1fr 1fr 200px;
          gap: 20px;
          padding: 20px 30px;
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .table-body.enhanced {
          max-height: 600px;
          overflow-y: auto;
        }

        .table-row.enhanced {
          display: grid;
          grid-template-columns: 50px 2fr 2fr 3fr 1fr 1fr 200px;
          gap: 20px;
          padding: 20px 30px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.3s;
          align-items: center;
        }

        .table-row.enhanced:hover {
          background: #f8fafc;
        }

        .table-row.enhanced.selected {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
        }

        .table-row.enhanced.unread {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
        }

        .checkbox-cell {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-cell input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #667eea;
        }

        .client-info.enhanced {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .client-avatar.enhanced {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
        }

        .client-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .client-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .client-email {
          color: #64748b;
          font-size: 12px;
        }

        .client-phone {
          color: #64748b;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .subject-content.enhanced {
          position: relative;
        }

        .subject-text {
          font-weight: 500;
          color: #1e293b;
          font-size: 14px;
        }

        .unread-indicator {
          position: absolute;
          top: -2px;
          right: -8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
        }

        .message-preview.enhanced {
          color: #64748b;
          font-size: 13px;
          line-height: 1.4;
        }

        .status-badge.enhanced {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .date-content {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 12px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
          justify-content: flex-start;
          min-width: 180px;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .action-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .action-btn.view:hover {
          background: #dbeafe;
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .action-btn.reply:hover {
          background: #dcfce7;
          color: #10b981;
          border-color: #10b981;
        }

        .action-btn.mark-read:hover {
          background: #fef3c7;
          color: #f59e0b;
          border-color: #f59e0b;
        }

        .action-btn.delete:hover {
          background: #fee2e2;
          color: #ef4444;
          border-color: #ef4444;
        }

        .empty-state.enhanced {
          padding: 60px 30px;
          text-align: center;
          color: #64748b;
        }

        .empty-state.enhanced h3 {
          margin: 20px 0 10px 0;
          color: #374151;
        }

        .empty-state.enhanced p {
          margin: 0 0 20px 0;
          color: #64748b;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          color: #64748b;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          color: #64748b;
          text-align: center;
        }

        .error-container h3 {
          margin: 20px 0 10px 0;
          color: #374151;
        }

        .error-container p {
          margin: 0 0 20px 0;
          color: #64748b;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #374151;
          border: 2px solid #e2e8f0;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-danger:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h2 {
          margin: 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 600;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.2s;
        }

        .modal-close-btn:hover {
          background: #f1f5f9;
          color: #374151;
        }

        .modal-body {
          padding: 25px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          padding: 20px 25px;
          border-top: 1px solid #e2e8f0;
        }

        .message-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .detail-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .detail-row strong {
          min-width: 80px;
          color: #374151;
          font-weight: 600;
        }

        .detail-row span {
          color: #1e293b;
          flex: 1;
        }

        .message-content {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          margin-top: 5px;
          white-space: pre-wrap;
        }

        .admin-response {
          background: #f0f9ff;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #0ea5e9;
          margin-top: 5px;
          white-space: pre-wrap;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.unread {
          background: #fef2f2;
          color: #dc2626;
        }

        .status-badge.read {
          background: #eff6ff;
          color: #2563eb;
        }

        .status-badge.replied {
          background: #f0fdf4;
          color: #16a34a;
        }

        .status-badge.archived {
          background: #f1f5f9;
          color: #64748b;
        }

        .original-message {
          margin-bottom: 25px;
        }

        .original-message h4 {
          margin: 0 0 15px 0;
          color: #374151;
          font-size: 16px;
        }

        .message-preview {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .message-preview p {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .message-text {
          background: white;
          padding: 10px;
          border-radius: 5px;
          margin-top: 8px;
          white-space: pre-wrap;
          border: 1px solid #e2e8f0;
        }

        .reply-form h4 {
          margin: 0 0 15px 0;
          color: #374151;
          font-size: 16px;
        }

        .reply-textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          resize: vertical;
          transition: border-color 0.2s;
        }

        .reply-textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 8px;
          }

          .admin-main {
            margin-left: 5px;
          }

          .header-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .stats-grid.enhanced {
            grid-template-columns: 1fr;
            padding: 20px;
          }

          .filters-content {
            flex-direction: column;
            gap: 15px;
          }

          .filters-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }

          .search-box.enhanced {
            max-width: 100%;
          }

          .filter-controls.enhanced {
            gap: 15px;
          }

          .filter-group {
            min-width: 120px;
          }

          .table-header.enhanced,
          .table-row.enhanced {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .checkbox-cell {
            order: -1;
          }

          .actions-cell {
            justify-content: center;
            min-width: auto;
            flex-wrap: wrap;
            gap: 6px;
          }

          .action-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 1200px) {
          .admin-main {
            margin-left: 10px;
          }

          .filters-content {
            flex-direction: row;
            align-items: flex-end;
          }

          .search-section {
            flex: 1;
          }

          .filter-controls.enhanced {
            flex-shrink: 0;
          }

          .table-header.enhanced,
          .table-row.enhanced {
            grid-template-columns: 50px 2fr 2fr 2fr 1fr 1fr 180px;
          }
        }

        @media (max-width: 1400px) {
          .admin-main {
            margin-left: 12px;
          }

          .filters-content {
            flex-direction: row;
            align-items: flex-end;
          }

          .search-section {
            flex: 1;
          }

          .filter-controls.enhanced {
            flex-shrink: 0;
          }

          .table-header.enhanced,
          .table-row.enhanced {
            grid-template-columns: 50px 2fr 2fr 2fr 1fr 1fr 160px;
          }
        }

        @media (max-width: 1600px) {
          .admin-main {
            margin-left: 15px;
          }

          .filters-content {
            flex-direction: row;
            align-items: flex-end;
          }

          .search-section {
            flex: 1;
          }

          .filter-controls.enhanced {
            flex-shrink: 0;
          }

          .table-header.enhanced,
          .table-row.enhanced {
            grid-template-columns: 50px 2fr 2fr 2fr 1fr 1fr 180px;
          }
        }

        @media (min-width: 1601px) {
          .admin-main {
            margin-left: 18px;
          }

          .filters-content {
            flex-direction: row;
            align-items: flex-end;
          }

          .search-section {
            flex: 1;
          }

          .filter-controls.enhanced {
            flex-shrink: 0;
          }

          .table-header.enhanced,
          .table-row.enhanced {
            grid-template-columns: 50px 2fr 2fr 3fr 1fr 1fr 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactAdmin; 