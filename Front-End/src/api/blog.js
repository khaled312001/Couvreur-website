// Mock data for testing
const mockBlogPosts = [
  {
    id: 1,
    title: "Comment choisir le bon type de toiture",
    content: "Guide complet pour choisir le type de toiture adapté à votre maison et votre budget...",
    excerpt: "Découvrez les différents types de toitures et leurs avantages respectifs.",
    author: "BN BUILDING",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    category: "Conseils"
  },
  {
    id: 2,
    title: "L'importance de l'isolation thermique",
    content: "L'isolation thermique de votre toiture peut réduire significativement vos factures d'énergie...",
    excerpt: "Pourquoi l'isolation thermique est essentielle pour votre confort et vos économies.",
    author: "BN BUILDING",
    date: "2025-01-10",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    category: "Isolation"
  },
  {
    id: 3,
    title: "Entretien préventif de votre toiture",
    content: "Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses...",
    excerpt: "Les bonnes pratiques pour maintenir votre toiture en excellent état.",
    author: "BN BUILDING",
    date: "2025-01-05",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    category: "Entretien"
  }
];

export const fetchBlogPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockBlogPosts;
};

export const fetchBlogPostById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockBlogPosts.find(post => post.id === parseInt(id));
};

export const createBlogPost = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newPost = {
    ...data,
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    author: "BN BUILDING"
  };
  mockBlogPosts.push(newPost);
  return newPost;
};

export const updateBlogPost = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id };
};

export const deleteBlogPost = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const index = mockBlogPosts.findIndex(post => post.id === id);
  if (index > -1) {
    mockBlogPosts.splice(index, 1);
  }
  return { success: true };
};
