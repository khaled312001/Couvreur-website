import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Search, Send, User, Clock, AlertCircle, 
  CheckCircle, Eye, RefreshCw, ChevronLeft, ChevronRight,
  Phone, Mail, Calendar, MoreVertical, Star, Flag
} from 'lucide-react';
import { chatApi } from '../../api/chat';

const ChatAdmin = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState([]);
  const messagesEndRef = useRef(null);

  // Load sessions
  useEffect(() => {
    loadSessions();
  }, []);

  // Filter sessions
  useEffect(() => {
    let filtered = sessions;
    
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.last_message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSessions(filtered);
  }, [sessions, searchTerm]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await chatApi.getSessions();
      setSessions(response.data || response);
    } catch (err) {
      console.error('Error loading sessions:', err);
      setError('Erreur lors du chargement des sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (sessionId) => {
    try {
      const response = await chatApi.getMessages(sessionId);
      setMessages(response.data || response);
      
      // Mark messages as read
      await chatApi.markAsRead(sessionId);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const handleSessionSelect = async (session) => {
    setSelectedSession(session);
    await loadMessages(session.session_id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedSession) return;

    try {
      const messageData = {
        session_id: selectedSession.session_id,
        sender_type: 'admin',
        sender_name: 'Admin',
        sender_email: 'admin@bnbatiment.com',
        message: newMessage
      };

      await chatApi.sendMessage(messageData);
      setNewMessage('');
      
      // Reload messages
      await loadMessages(selectedSession.session_id);
    } catch (err) {
      console.error('Error sending message:', err);
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

  const getUnreadCount = (session) => {
    return session.unread_count || 0;
  };

  return (
    <div className="chat-admin">
      <div className="chat-container">
        {/* Sessions List */}
        <div className="sessions-panel">
          <div className="sessions-header">
            <h2 className="panel-title">
              <MessageSquare size={20} />
              Conversations
            </h2>
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="sessions-list">
            {isLoading ? (
              <div className="loading">Chargement...</div>
            ) : filteredSessions.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={48} />
                <p>Aucune conversation</p>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <motion.div
                  key={session.session_id}
                  className={`session-item ${selectedSession?.session_id === session.session_id ? 'active' : ''}`}
                  onClick={() => handleSessionSelect(session)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="session-avatar">
                    <User size={20} />
                  </div>
                  <div className="session-content">
                    <div className="session-header">
                      <h4 className="session-name">{session.sender_name}</h4>
                      <span className="session-time">
                        {formatDate(session.last_message_at)}
                      </span>
                    </div>
                    <p className="session-message">{session.last_message}</p>
                    <div className="session-meta">
                      <span className="message-count">
                        {session.message_count} message(s)
                      </span>
                      {getUnreadCount(session) > 0 && (
                        <span className="unread-badge">
                          {getUnreadCount(session)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="chat-panel">
          {selectedSession ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                  <div className="user-details">
                    <h3 className="user-name">{selectedSession.sender_name}</h3>
                    <p className="user-meta">
                      Session: {selectedSession.session_id}
                    </p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn" onClick={loadSessions}>
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div className="messages-container">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${message.sender_type === 'admin' ? 'admin' : 'user'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="message-content">
                      <div className="message-header">
                        <span className="sender-name">
                          {message.sender_type === 'admin' ? 'Admin' : message.sender_name}
                        </span>
                        <span className="message-time">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="message-text">{message.message}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <div className="message-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <MessageSquare size={64} />
              <h3>Sélectionnez une conversation</h3>
              <p>Choisissez une conversation dans la liste pour commencer à discuter</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .chat-admin {
          height: 100vh;
          background: #f8fafc;
        }

        .chat-container {
          display: flex;
          height: 100%;
          max-width: 1400px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .sessions-panel {
          width: 350px;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .sessions-header {
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .panel-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .search-box {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .sessions-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .session-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .session-item:hover {
          background-color: #f1f5f9;
        }

        .session-item.active {
          background-color: #dbeafe;
        }

        .session-avatar {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .session-content {
          flex: 1;
          min-width: 0;
        }

        .session-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .session-name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }

        .session-time {
          font-size: 12px;
          color: #6b7280;
        }

        .session-message {
          margin: 0 0 8px 0;
          font-size: 13px;
          color: #4b5563;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .session-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .message-count {
          font-size: 12px;
          color: #6b7280;
        }

        .unread-badge {
          background: #ef4444;
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        .chat-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .chat-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-name {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .user-meta {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #6b7280;
          transition: background-color 0.2s;
        }

        .action-btn:hover {
          background-color: #f1f5f9;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          display: flex;
          flex-direction: column;
        }

        .message.user {
          align-items: flex-start;
        }

        .message.admin {
          align-items: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 12px;
          position: relative;
        }

        .message.user .message-content {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        .message.admin .message-content {
          background-color: #3b82f6;
          color: white;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          font-size: 12px;
          opacity: 0.8;
        }

        .message-text {
          margin: 0;
          line-height: 1.4;
        }

        .message-form {
          padding: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .message-input-container {
          display: flex;
          gap: 12px;
        }

        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .message-input:focus {
          border-color: #3b82f6;
        }

        .send-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .send-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .send-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .no-chat-selected {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          text-align: center;
        }

        .no-chat-selected h3 {
          margin: 16px 0 8px 0;
          color: #374151;
        }

        .no-chat-selected p {
          margin: 0;
          font-size: 14px;
        }

        .loading, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #6b7280;
          text-align: center;
        }

        .empty-state p {
          margin: 8px 0 0 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default ChatAdmin; 