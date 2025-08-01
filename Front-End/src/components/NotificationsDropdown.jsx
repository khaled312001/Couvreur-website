import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Trash2, Settings } from 'lucide-react';
import { notificationsApi } from '../api/notifications';
import { useAuth } from '../context/AuthContext';

const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchNotifications();
            // Poll for new notifications every 30 seconds
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationsApi.getNotifications({ limit: 10 });
            if (response.data.success) {
                setNotifications(response.data.data.notifications);
                setUnreadCount(response.data.data.unread_count);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationsApi.markAsRead(id);
            setNotifications(prev => 
                prev.map(notification => 
                    notification.id === id 
                        ? { ...notification, is_read: true, read_at: new Date().toISOString() }
                        : notification
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationsApi.markAllAsRead();
            setNotifications(prev => 
                prev.map(notification => ({ ...notification, is_read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await notificationsApi.deleteNotification(id);
            setNotifications(prev => prev.filter(notification => notification.id !== id));
            if (!notifications.find(n => n.id === id)?.is_read) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return '✅';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            default:
                return 'ℹ️';
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'success':
                return 'border-green-200 bg-green-50';
            case 'warning':
                return 'border-yellow-200 bg-yellow-50';
            case 'error':
                return 'border-red-200 bg-red-50';
            default:
                return 'border-blue-200 bg-blue-50';
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            {/* Notification Bell */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="notification-bell"
                title="Notifications"
            >
                <Bell className="w-6 h-6" />
                
                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="notification-dropdown-menu">
                    {/* Header */}
                    <div className="notification-header">
                        <div className="notification-header-title">
                            <Bell className="w-5 h-5" />
                            <span>Notifications</span>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="mark-all-read-btn"
                            >
                                <Check className="w-4 h-4" />
                                Tout marquer comme lu
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="notification-list">
                        {loading ? (
                            <div className="notification-loading">
                                <div className="notification-loading-spinner"></div>
                                <p>Chargement...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="notification-empty">
                                <Bell className="w-12 h-12" />
                                <p className="notification-empty-title">Aucune notification</p>
                                <p className="notification-empty-subtitle">Vous serez notifié ici des nouvelles activités</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                                >
                                    <div className="notification-content">
                                        <div className="notification-icon">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="notification-details">
                                            <p className="notification-title">
                                                {notification.title}
                                            </p>
                                            <p className="notification-message">
                                                {notification.message}
                                            </p>
                                            <p className="notification-time">
                                                {notification.time_ago}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="notification-actions">
                                        {!notification.is_read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="notification-action-btn read"
                                                title="Marquer comme lu"
                                            >
                                                <Check className="w-3 h-3" />
                                                Lu
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteNotification(notification.id)}
                                            className="notification-action-btn delete"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="notification-footer">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="notification-close-btn"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown; 