import { apiClient } from './apiClient';

export const dashboardApi = {
  // Get dashboard data
  getDashboardData: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
      return response.data;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  },

  // Get quick stats
  getQuickStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.quick_stats;
    } catch (error) {
      console.error('Error fetching quick stats:', error);
      throw error;
    }
  },

  // Get monthly revenue data
  getMonthlyRevenue: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.monthly_revenue;
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      throw error;
    }
  },

  // Get service distribution
  getServiceDistribution: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.service_distribution;
    } catch (error) {
      console.error('Error fetching service distribution:', error);
      throw error;
    }
  },

  // Get recent quotes
  getRecentQuotes: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.recent_quotes;
    } catch (error) {
      console.error('Error fetching recent quotes:', error);
      throw error;
    }
  },

  // Get recent messages
  getRecentMessages: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.recent_messages;
    } catch (error) {
      console.error('Error fetching recent messages:', error);
      throw error;
    }
  },

  // Get status distribution
  getStatusDistribution: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.status_distribution;
    } catch (error) {
      console.error('Error fetching status distribution:', error);
      throw error;
    }
  },

  // Get performance metrics
  getPerformanceMetrics: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data.performance_metrics;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error;
    }
  }
}; 