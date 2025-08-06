// Contact API - Updated
import apiClient from './apiClient';

export const contactApi = {
  // Get all messages
  getMessages: async (params = {}) => {
    try {
      const response = await apiClient.get('/admin/contact', params);
      return response;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
  
  // Get message by ID
  getMessage: async (id) => {
    try {
      const response = await apiClient.get(`/admin/contact/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  },

  // Create new message
  createMessage: async (data) => {
    try {
      const response = await apiClient.post('/contact', data);
      return response;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  },

  // Update message
  updateMessage: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/contact/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/contact/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  // Get messages by status
  getMessagesByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/admin/contact/status/${status}`);
      return response;
    } catch (error) {
      console.error('Error fetching messages by status:', error);
      throw error;
    }
  },

  // Get unread messages
  getUnreadMessages: async () => {
    try {
      const response = await apiClient.get('/admin/contact/unread');
      return response;
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (id) => {
    try {
      const response = await apiClient.put(`/admin/contact/${id}`, { status: 'read' });
      return response;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  // Reply to message
  replyToMessage: async (id, response) => {
    try {
      const data = {
        status: 'replied',
        admin_response: response
      };
      const result = await apiClient.put(`/admin/contact/${id}`, data);
      return result;
    } catch (error) {
      console.error('Error replying to message:', error);
      throw error;
    }
  },

  // Get user messages (for authenticated users)
  getUserMessages: async () => {
    try {
      const response = await apiClient.get('/user/messages');
      return response;
    } catch (error) {
      console.error('Error fetching user messages:', error);
      throw error;
    }
  },

  // Get user message by ID
  getUserMessage: async (id) => {
    try {
      const response = await apiClient.get(`/user/messages/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching user message:', error);
      throw error;
    }
  },

  // Create message with user (for authenticated users)
  createMessageWithUser: async (data) => {
    try {
      const response = await apiClient.post('/user/messages', data);
      return response;
    } catch (error) {
      console.error('Error creating message with user:', error);
      throw error;
    }
  }
}; 