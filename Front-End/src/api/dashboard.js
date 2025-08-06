// Dashboard API - Updated
import apiClient from './apiClient';

export const dashboardApi = {
  // Get dashboard data
  getDashboardData: async () => {
    try {
      console.log('Fetching dashboard data from:', `https://api.bnbatiment.com/api/admin/dashboard`);
      
      // Use direct fetch for testing
      const response = await fetch('https://api.bnbatiment.com/api/admin/dashboard', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Dashboard API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dashboard API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      throw error;
    }
  },

  // Export data
  exportData: async (type = 'quotes', format = 'json') => {
    try {
      const response = await apiClient.get('/admin/dashboard/export', {
        params: { type, format },
        responseType: format === 'csv' ? 'blob' : 'json'
      });
      return response;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  },

  // Get quick stats
  getQuickStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.quick_stats;
    } catch (error) {
      console.error('Error fetching quick stats:', error);
      throw error;
    }
  },

  // Get monthly revenue data
  getMonthlyRevenue: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.monthly_revenue;
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      throw error;
    }
  },

  // Get service distribution
  getServiceDistribution: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.service_distribution;
    } catch (error) {
      console.error('Error fetching service distribution:', error);
      throw error;
    }
  },

  // Get recent quotes
  getRecentQuotes: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.recent_quotes;
    } catch (error) {
      console.error('Error fetching recent quotes:', error);
      throw error;
    }
  },

  // Get recent messages
  getRecentMessages: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.recent_messages;
    } catch (error) {
      console.error('Error fetching recent messages:', error);
      throw error;
    }
  },

  // Get recent blog posts
  getRecentBlogPosts: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.recent_blog_posts;
    } catch (error) {
      console.error('Error fetching recent blog posts:', error);
      throw error;
    }
  },

  // Get recent testimonials
  getRecentTestimonials: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.recent_testimonials;
    } catch (error) {
      console.error('Error fetching recent testimonials:', error);
      throw error;
    }
  },

  // Get status distribution
  getStatusDistribution: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.status_distribution;
    } catch (error) {
      console.error('Error fetching status distribution:', error);
      throw error;
    }
  },

  // Get performance metrics
  getPerformanceMetrics: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.performance_metrics;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error;
    }
  },

  // Get notifications
  getNotifications: async (limit = 20, unreadOnly = false) => {
    try {
      const response = await apiClient.get('/admin/notifications', {
        params: { limit, unread_only: unreadOnly }
      });
      return response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (id) => {
    try {
      const response = await apiClient.put(`/admin/notifications/${id}/read`);
      return response;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    try {
      const response = await apiClient.put('/admin/notifications/read-all');
      return response;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/notifications/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
}; 