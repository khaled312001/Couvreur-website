import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Trash2, Settings } from 'lucide-react';
import { notificationsApi } from '../api/notifications';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPulse, setShowPulse] = useState(false);
    const [previousUnreadCount, setPreviousUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        // Only fetch notifications if user is authenticated and is admin
        console.log('useEffect triggered:', { isAuthenticated, userRole: user?.role });
        if (isAuthenticated && user && user.role === 'admin') {
            console.log('Starting notification polling');
            fetchNotifications();
            // Poll for new notifications every 10 seconds for better responsiveness
            const interval = setInterval(fetchNotifications, 10000);
            
            // Listen for custom notification update events
            const handleNotificationUpdate = () => {
                console.log('Received notification update event');
                fetchNotifications();
            };
            
            window.addEventListener('notifications-update', handleNotificationUpdate);
            
            // Request notification permission
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
            
            return () => {
                console.log('Cleaning up notification polling');
                clearInterval(interval);
                window.removeEventListener('notifications-update', handleNotificationUpdate);
            };
        } else {
            console.log('Not starting notification polling - conditions not met');
        }
    }, [user, isAuthenticated]);

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
        // Check if user is authenticated and is admin before making API call
        if (!isAuthenticated || !user || user.role !== 'admin') {
            console.log('Not fetching notifications - not authenticated or not admin');
            return;
        }

        try {
            setLoading(true);
            console.log('Fetching notifications...');
            const response = await notificationsApi.getNotifications({ limit: 10 });
            console.log('Notifications response:', response);
            
            if (response && response.success) {
                const newUnreadCount = response.data.unread_count;
                const newNotifications = response.data.notifications;
                console.log('Setting notifications:', newNotifications);
                console.log('Unread count:', newUnreadCount);
                
                setNotifications(newNotifications);
                setUnreadCount(newUnreadCount);
                
                // Check if there are new unread notifications
                if (newUnreadCount > previousUnreadCount && previousUnreadCount >= 0) {
                    setShowPulse(true);
                    setTimeout(() => setShowPulse(false), 5000); // Stop pulse after 5 seconds
                    
                    // Show browser notification if supported
                    if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('Nouveau message', {
                            body: 'Vous avez reçu un nouveau message de contact',
                            icon: '/logo.png'
                        });
                    }
                }
                setPreviousUnreadCount(newUnreadCount);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // If we get an unauthorized error, clear the user data
            if (error.message === 'Unauthorized') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        if (!isAuthenticated || !user || user.role !== 'admin') {
            return;
        }

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
        if (!isAuthenticated || !user || user.role !== 'admin') {
            return;
        }

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
        if (!isAuthenticated || !user || user.role !== 'admin') {
            return;
        }

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

    // Don't render the component if user is not authenticated or not admin
    if (!isAuthenticated || !user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="admin-header-notifications" ref={dropdownRef}>
            {/* Notification Bell */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`admin-header-icon-btn ${showPulse ? 'notification-pulse' : ''}`}
                title="Notifications"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Bell size={20} />
                
                {/* Unread Badge */}
                <AnimatePresence>
                    {unreadCount > 0 && (
                        <motion.span 
                            className="admin-header-notif-badge"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="admin-header-notifications-dropdown"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                    {/* Header */}
                    <div className="notifications-header">
                        <h4>Notifications</h4>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="mark-all-read"
                            >
                                Tout marquer comme lu
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="notifications-list">
                        {loading ? (
                            <div className="notification-loading">
                                <div className="notification-loading-spinner"></div>
                                <p>Chargement...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="notification-empty">
                                <Bell size={48} />
                                <p className="notification-empty-title">Aucune notification</p>
                                <p className="notification-empty-subtitle">Vous serez notifié ici des nouvelles activités</p>
                                {/* Debug info */}
                                <div style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                                    Debug: isAuthenticated={isAuthenticated.toString()}, 
                                    userRole={user?.role}, 
                                    notificationsCount={notifications.length}
                                </div>
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
                                                <Check size={12} />
                                                Lu
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteNotification(notification.id)}
                                            className="notification-action-btn delete"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={12} />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="notifications-footer">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="view-all-notifications"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationsDropdown; 