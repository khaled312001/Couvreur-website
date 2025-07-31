const API_BASE_URL = 'http://localhost:8000/api';

export const fetchGalleryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
};

export const fetchGalleryItemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`);
    if (!response.ok) {
      throw new Error('Gallery item not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return null;
  }
};

export const createGalleryItem = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create gallery item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const updateGalleryItem = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update gallery item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete gallery item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};

export const getGalleryItemsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch gallery items by category');
    }
    return await response.json();
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
