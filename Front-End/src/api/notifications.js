import apiClient from './apiClient';

export const notificationsApi = {
    // Get all notifications
    getNotifications: async (params = {}) => {
        try {
            console.log('getNotifications: Calling with params:', params);
            const response = await apiClient.get('/admin/notifications', params);
            console.log('getNotifications: response:', response);
            return response;
        } catch (error) {
            console.error('getNotifications error:', error);
            throw error;
        }
    },

    // Mark notification as read
    markAsRead: async (id) => {
        try {
            console.log('markAsRead: Calling for id:', id);
            const response = await apiClient.put(`/admin/notifications/${id}/read`);
            console.log('markAsRead: response:', response);
            return response;
        } catch (error) {
            console.error('markAsRead error:', error);
            throw error;
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            console.log('markAllAsRead: Calling');
            const response = await apiClient.put('/admin/notifications/read-all');
            console.log('markAllAsRead: response:', response);
            return response;
        } catch (error) {
            console.error('markAllAsRead error:', error);
            throw error;
        }
    },

    // Delete notification
    deleteNotification: async (id) => {
        try {
            console.log('deleteNotification: Calling for id:', id);
            const response = await apiClient.delete(`/admin/notifications/${id}`);
            console.log('deleteNotification: response:', response);
            return response;
        } catch (error) {
            console.error('deleteNotification error:', error);
            throw error;
        }
    },

    // Get unread count
    getUnreadCount: async () => {
        try {
            console.log('getUnreadCount: Calling');
            const response = await apiClient.get('/admin/notifications', { 
                unread_only: true, limit: 1 
            });
            console.log('getUnreadCount: response:', response);
            return response;
        } catch (error) {
            console.error('getUnreadCount error:', error);
            throw error;
        }
    }
}; 