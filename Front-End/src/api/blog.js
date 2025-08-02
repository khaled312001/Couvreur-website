import apiClient from './apiClient';

export const blogApi = {
  // Get all blog posts (public)
  getBlogPosts: async () => {
    try {
      const response = await apiClient.get('/blog');
      return response;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get blog post by ID (public)
  getBlogPost: async (id) => {
    try {
      const response = await apiClient.get(`/blog/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  },

  // Get blog post by slug (public)
  getBlogPostBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/blog/slug/${slug}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      throw error;
    }
  },

  // Admin: Get all blog posts
  getAdminBlogPosts: async () => {
    try {
      const response = await apiClient.get('/admin/blog');
      return response;
    } catch (error) {
      console.error('Error fetching admin blog posts:', error);
      throw error;
    }
  },

  // Admin: Get blog post by ID
  getAdminBlogPost: async (id) => {
    try {
      const response = await apiClient.get(`/admin/blog/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching admin blog post:', error);
      throw error;
    }
  },

  // Admin: Create blog post
  createBlogPost: async (data) => {
    try {
      const response = await apiClient.post('/admin/blog', data);
      return response;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Admin: Update blog post
  updateBlogPost: async (id, data) => {
    try {
      const response = await apiClient.put(`/admin/blog/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  // Admin: Delete blog post
  deleteBlogPost: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/blog/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  },

  // Admin: Get blog posts by category
  getBlogPostsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/admin/blog/category/${category}`);
      return response;
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      throw error;
    }
  }
};

// Legacy functions for backward compatibility
export const fetchBlogPosts = async () => {
  try {
    const response = await blogApi.getBlogPosts();
    return response;
  } catch (error) {
    console.log('Using mock blog posts data');
    return getMockBlogPosts();
  }
};

export const fetchBlogPostById = async (id) => {
  try {
    const response = await blogApi.getBlogPost(id);
    return response;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const response = await blogApi.getBlogPostBySlug(slug);
    return response;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
};

export const createBlogPost = async (data) => {
  try {
    const response = await blogApi.createBlogPost(data);
    return response;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id, data) => {
  try {
    const response = await blogApi.updateBlogPost(id, data);
    return response;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const response = await blogApi.deleteBlogPost(id);
    return response;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const getBlogPostsByCategory = async (category) => {
  try {
    const response = await blogApi.getBlogPostsByCategory(category);
    return response;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

// Mock data for blog posts when API is not available
export const getMockBlogPosts = () => {
  return [
    {
      id: 1,
      title: "Comment choisir le bon type de toiture",
      content: "Guide complet pour choisir le type de toiture adapté à votre maison et votre budget. Découvrez les différents matériaux disponibles et leurs avantages respectifs.",
      excerpt: "Découvrez les différents types de toitures et leurs avantages respectifs.",
      author: "BN BUILDING",
      category: "Conseils",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      slug: "comment-choisir-le-bon-type-de-toiture",
      is_published: true,
      published_at: "2025-01-15"
    },
    {
      id: 2,
      title: "L'importance de l'isolation thermique",
      content: "L'isolation thermique de votre toiture peut réduire significativement vos factures d'énergie. Découvrez pourquoi c'est essentiel pour votre confort et vos économies.",
      excerpt: "Pourquoi l'isolation thermique est essentielle pour votre confort et vos économies.",
      author: "BN BUILDING",
      category: "Isolation",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      slug: "importance-isolation-thermique",
      is_published: true,
      published_at: "2025-01-10"
    },
    {
      id: 3,
      title: "Entretien préventif de votre toiture",
      content: "Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses. Les bonnes pratiques pour maintenir votre toiture en excellent état.",
      excerpt: "Les bonnes pratiques pour maintenir votre toiture en excellent état.",
      author: "BN BUILDING",
      category: "Entretien",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      slug: "entretien-preventif-toiture",
      is_published: true,
      published_at: "2025-01-05"
    }
  ];
};
