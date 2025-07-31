const API_BASE_URL = 'http://localhost:8000/api';

export const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getTestimonials = async () => {
  try {
    const testimonials = await fetchTestimonials();
    return testimonials;
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
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`);
    if (!response.ok) {
      throw new Error('Testimonial not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }
};

export const createTestimonial = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create testimonial');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};

export const updateTestimonial = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update testimonial');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};
