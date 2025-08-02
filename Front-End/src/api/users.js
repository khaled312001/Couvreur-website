import apiClient from './apiClient';

export const usersApi = {
  // Get all users (admin)
  getUsers: async () => {
    try {
      const response = await apiClient.get('/admin/users');
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID (admin)
  getUser: async (id) => {
    try {
      const response = await apiClient.get(`/admin/users/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create user (admin)
  createUser: async (data) => {
    try {
      const response = await apiClient.post('/admin/users', data);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user (admin)
  updateUser: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user (admin)
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/users/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Get users by role (admin)
  getUsersByRole: async (role) => {
    try {
      const response = await apiClient.get(`/admin/users/role/${role}`);
      return response;
    } catch (error) {
      console.error('Error fetching users by role:', error);
      throw error;
    }
  },

  // Toggle user status (admin)
  toggleUserStatus: async (id) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}/toggle-status`);
      return response;
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/user');
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update current user profile
  updateProfile: async (data) => {
    try {
      const response = await apiClient.put('/auth/profile', data);
      return response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (data) => {
    try {
      const response = await apiClient.put('/auth/password', data);
      return response;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}; 