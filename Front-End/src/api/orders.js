import apiClient from './apiClient';

export const ordersApi = {
  // Obtenir toutes les commandes
  getAll: () => apiClient.get('/admin/orders'),
  
  // Obtenir une commande spécifique
  getById: (id) => apiClient.get(`/admin/orders/${id}`),
  
  // Créer une nouvelle commande
  create: (orderData) => apiClient.post('/admin/orders', orderData),
  
  // Mettre à jour une commande
  update: (id, orderData) => apiClient.put(`/admin/orders/${id}`, orderData),
  
  // Supprimer une commande
  delete: (id) => apiClient.delete(`/admin/orders/${id}`),
  
  // Mettre à jour le statut d'une commande
  updateStatus: (id, status) => apiClient.put(`/admin/orders/${id}/status`, { status }),
  
  // Obtenir les statistiques des commandes
  getStatistics: () => apiClient.get('/admin/orders/statistics'),
  
  // Filtrer les commandes par statut
  getByStatus: (status) => apiClient.get(`/admin/orders?status=${status}`),
  
  // Filtrer les commandes par priorité
  getByPriority: (priority) => apiClient.get(`/admin/orders?priority=${priority}`),
  
  // Rechercher des commandes
  search: (query) => apiClient.get(`/admin/orders?search=${query}`)
}; 