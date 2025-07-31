const API_BASE_URL = 'http://localhost:8000/api';

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const fetchBlogPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`);
    if (!response.ok) {
      throw new Error('Blog post not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/slug/${slug}`);
    if (!response.ok) {
      throw new Error('Blog post not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const createBlogPost = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const getBlogPostsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts by category');
    }
    return await response.json();
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
