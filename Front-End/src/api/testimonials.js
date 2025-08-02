import apiClient from './apiClient';

export const testimonialsApi = {
  // Get all testimonials (public)
  getTestimonials: async () => {
    try {
      const response = await apiClient.get('/testimonials');
      return response;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Get testimonial by ID (public)
  getTestimonial: async (id) => {
    try {
      const response = await apiClient.get(`/testimonials/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      throw error;
    }
  },

  // Admin: Get all testimonials
  getAdminTestimonials: async () => {
    try {
      const response = await apiClient.get('/admin/testimonials');
      return response;
    } catch (error) {
      console.error('Error fetching admin testimonials:', error);
      throw error;
    }
  },

  // Admin: Get testimonial by ID
  getAdminTestimonial: async (id) => {
    try {
      const response = await apiClient.get(`/admin/testimonials/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching admin testimonial:', error);
      throw error;
    }
  },

  // Admin: Create testimonial
  createTestimonial: async (data) => {
    try {
      const response = await apiClient.post('/admin/testimonials', data);
      return response;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },

  // Admin: Update testimonial
  updateTestimonial: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/testimonials/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  },

  // Admin: Delete testimonial
  deleteTestimonial: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/testimonials/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },

  // Admin: Toggle testimonial status
  toggleTestimonialStatus: async (id, isActive) => {
    try {
      const response = await apiClient.put(`/admin/testimonials/${id}`, {
        is_active: isActive
      });
      return response;
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      throw error;
    }
  },

  // Admin: Update testimonial order
  updateTestimonialOrder: async (id, sortOrder) => {
    try {
      const response = await apiClient.put(`/admin/testimonials/${id}`, {
        sort_order: sortOrder
      });
      return response;
    } catch (error) {
      console.error('Error updating testimonial order:', error);
      throw error;
    }
  }
};

// Legacy functions for backward compatibility
export const fetchTestimonials = async () => {
  try {
    const response = await apiClient.get('/testimonials');
    return response;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getTestimonials = async () => {
  try {
    const response = await apiClient.get('/testimonials');
    return response;
  } catch (error) {
    console.log('Using mock testimonials data');
    return getMockTestimonials();
  }
};

// Mock data for testimonials when API is not available
export const getMockTestimonials = () => {
  return [
    {
      id: 1,
      name: "Marie Dubois",
      location: "Lyon",
      content: "Excellent service ! L'équipe a été professionnelle du début à la fin. Notre nouvelle toiture est magnifique et l'installation s'est déroulée parfaitement.",
      rating: 5,
      image: null,
      is_active: true,
      sort_order: 1
    },
    {
      id: 2,
      name: "Pierre Martin",
      location: "Marseille",
      content: "Intervention rapide et efficace pour réparer une fuite urgente. Prix honnêtes et travail de qualité. Je recommande vivement !",
      rating: 5,
      image: null,
      is_active: true,
      sort_order: 2
    },
    {
      id: 3,
      name: "Sophie Bernard",
      location: "Toulouse",
      content: "Service d'entretien annuel impeccable. L'équipe est ponctuelle, professionnelle et donne de bons conseils pour maintenir notre toiture.",
      rating: 5,
      image: null,
      is_active: true,
      sort_order: 3
    }
  ];
};

export const fetchTestimonialById = async (id) => {
  try {
    const response = await apiClient.get(`/testimonials/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }
};

export const createTestimonial = async (data) => {
  try {
    const response = await apiClient.post('/admin/testimonials', data);
    return response;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};

export const updateTestimonial = async (id, data) => {
  try {
    const response = await apiClient.put(`/admin/testimonials/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/testimonials/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};
