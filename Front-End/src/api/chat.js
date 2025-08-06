import apiClient from './apiClient';

export const chatApi = {
  // Create a new chat session
  createSession: async (data) => {
    try {
      const response = await apiClient.post('/chat/session', data);
      console.log('Chat session response:', response);
      
      // Return a success response even if the server response is empty
      return {
        success: true,
        data: response,
        message: 'Message sent successfully'
      };
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  },

  // Get all chat sessions
  getSessions: async () => {
    try {
      const response = await apiClient.get('/chat/sessions');
      return response;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      throw error;
    }
  },

  // Get messages for a specific session
  getMessages: async (sessionId) => {
    try {
      const response = await apiClient.get(`/chat/messages/${sessionId}`);
      return response;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (data) => {
    try {
      const response = await apiClient.post('/chat/message', data);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Mark messages as read
  markAsRead: async (sessionId) => {
    try {
      const response = await apiClient.put(`/chat/mark-read/${sessionId}`);
      return response;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }
}; 