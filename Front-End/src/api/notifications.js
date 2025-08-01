import { apiClient } from './apiClient';

export const notificationsApi = {
    // Get all notifications
    getNotifications: (params = {}) => {
        return apiClient.get('/admin/notifications', { params });
    },

    // Mark notification as read
    markAsRead: (id) => {
        return apiClient.put(`/admin/notifications/${id}/read`);
    },

    // Mark all notifications as read
    markAllAsRead: () => {
        return apiClient.put('/admin/notifications/read-all');
    },

    // Delete notification
    deleteNotification: (id) => {
        return apiClient.delete(`/admin/notifications/${id}`);
    },

    // Get unread count
    getUnreadCount: () => {
        return apiClient.get('/admin/notifications', { 
            params: { unread_only: true, limit: 1 } 
        });
    }
}; 