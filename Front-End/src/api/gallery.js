import apiClient from './apiClient';

export const galleryApi = {
  // Get all gallery items (public)
  getGalleryItems: async () => {
    try {
      const response = await apiClient.get('/gallery');
      return response;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },

  // Get gallery item by ID (public)
  getGalleryItem: async (id) => {
    try {
      const response = await apiClient.get(`/gallery/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      throw error;
    }
  },

  // Admin: Get all gallery items
  getAdminGalleryItems: async () => {
    try {
      const response = await apiClient.get('/admin/gallery');
      return response;
    } catch (error) {
      console.error('Error fetching admin gallery items:', error);
      throw error;
    }
  },

  // Admin: Get gallery item by ID
  getAdminGalleryItem: async (id) => {
    try {
      const response = await apiClient.get(`/admin/gallery/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching admin gallery item:', error);
      throw error;
    }
  },

  // Admin: Create gallery item
  createGalleryItem: async (data) => {
    try {
      const response = await apiClient.post('/admin/gallery', data);
      return response;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },

  // Admin: Update gallery item
  updateGalleryItem: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/gallery/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  // Admin: Delete gallery item
  deleteGalleryItem: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/gallery/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  // Admin: Get gallery items by category
  getGalleryItemsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/admin/gallery/category/${category}`);
      return response;
    } catch (error) {
      console.error('Error fetching gallery items by category:', error);
      throw error;
    }
  }
};

// Legacy functions for backward compatibility
export const fetchGalleryItems = async () => {
  try {
    const response = await galleryApi.getGalleryItems();
    return response;
  } catch (error) {
    console.log('Using mock gallery data');
    return getMockGallery();
  }
};

export const fetchGalleryItemById = async (id) => {
  try {
    const response = await galleryApi.getGalleryItem(id);
    return response;
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return null;
  }
};

export const createGalleryItem = async (data) => {
  try {
    const response = await galleryApi.createGalleryItem(data);
    return response;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const updateGalleryItem = async (id, data) => {
  try {
    const response = await galleryApi.updateGalleryItem(id, data);
    return response;
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const response = await galleryApi.deleteGalleryItem(id);
    return response;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};

export const getGalleryItemsByCategory = async (category) => {
  try {
    const response = await galleryApi.getGalleryItemsByCategory(category);
    return response;
  } catch (error) {
    console.error('Error fetching gallery items by category:', error);
    return [];
  }
};

export const getGallery = async () => {
  try {
    const gallery = await fetchGalleryItems();
    return gallery;
  } catch (error) {
    console.log('Using mock gallery data');
    return getMockGallery();
  }
};

export const fetchGallery = () => {
  return fetchGalleryItems();
};

// Mock data for gallery when API is not available
export const getMockGallery = () => {
  return [
    {
      id: 1,
      title: 'Installation de Toiture',
      description: 'Installation complète de toiture en tuiles',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'installation',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Réparation de Fuite',
      description: 'Réparation urgente de fuite de toiture',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'reparation',
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Nettoyage de Toiture',
      description: 'Nettoyage professionnel de toiture',
      image: 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'entretien',
      date: '2024-01-13'
    },
    {
      id: 4,
      title: 'Installation de Zinguerie',
      description: 'Pose de zinguerie et gouttières',
      image: 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'zinguerie',
      date: '2024-01-12'
    },
    {
      id: 5,
      title: 'Charpente Traditionnelle',
      description: 'Construction de charpente en bois',
      image: 'https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'charpente',
      date: '2024-01-11'
    },
    {
      id: 6,
      title: 'Isolation de Combles',
      description: 'Isolation thermique des combles',
      image: 'https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'isolation',
      date: '2024-01-10'
    }
  ];
};
