import apiClient from './apiClient';

export const settingsApi = {
  // Get all settings
  getSettings: async () => {
    try {
      const response = await apiClient.get('/admin/settings');
      return response;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  // Update settings section
  updateSettings: async (section, data) => {
    try {
      const response = await apiClient.put(`/admin/settings/${section}`, data);
      return response;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Export settings
  exportSettings: async () => {
    try {
      const response = await apiClient.get('/admin/settings/export');
      return response;
    } catch (error) {
      console.error('Error exporting settings:', error);
      throw error;
    }
  },

  // Import settings
  importSettings: async (settings) => {
    try {
      const response = await apiClient.post('/admin/settings/import', { settings });
      return response;
    } catch (error) {
      console.error('Error importing settings:', error);
      throw error;
    }
  },

  // Update general settings
  updateGeneralSettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/general', data);
      return response;
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  },

  // Update notification settings
  updateNotificationSettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/notifications', data);
      return response;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  },

  // Update security settings
  updateSecuritySettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/security', data);
      return response;
    } catch (error) {
      console.error('Error updating security settings:', error);
      throw error;
    }
  },

  // Update appearance settings
  updateAppearanceSettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/appearance', data);
      return response;
    } catch (error) {
      console.error('Error updating appearance settings:', error);
      throw error;
    }
  },

  // Update company settings
  updateCompanySettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/company', data);
      return response;
    } catch (error) {
      console.error('Error updating company settings:', error);
      throw error;
    }
  },

  // Update email settings
  updateEmailSettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/email', data);
      return response;
    } catch (error) {
      console.error('Error updating email settings:', error);
      throw error;
    }
  },

  // Update social settings
  updateSocialSettings: async (data) => {
    try {
      const response = await apiClient.put('/admin/settings/social', data);
      return response;
    } catch (error) {
      console.error('Error updating social settings:', error);
      throw error;
    }
  }
}; 