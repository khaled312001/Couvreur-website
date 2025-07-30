// Mock data for testing
const mockGallery = [
  {
    id: 1,
    title: "Rénovation Toiture Tuiles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Rénovation complète d'une toiture en tuiles",
    category: "Charpente"
  },
  {
    id: 2,
    title: "Installation Zinc",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Installation de zinguerie en zinc",
    category: "Zinguerie"
  },
  {
    id: 3,
    title: "Réparation Gouttières",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Réparation et remplacement de gouttières",
    category: "Couverture"
  },
  {
    id: 4,
    title: "Isolation Thermique",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Isolation thermique de toiture",
    category: "Charpente"
  },
  {
    id: 5,
    title: "Charpente Traditionnelle",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Construction de charpente traditionnelle",
    category: "Charpente"
  },
  {
    id: 6,
    title: "Couverture Ardoise",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Installation de couverture en ardoise",
    category: "Couverture"
  },
  {
    id: 7,
    title: "Zinguerie Étanchéité",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Travaux d'étanchéité et zinguerie",
    category: "Zinguerie"
  },
  {
    id: 8,
    title: "Rénovation Complète",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    description: "Rénovation complète de toiture",
    category: "Couverture"
  }
];

export const fetchGallery = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockGallery;
};

export const getGallery = () => {
  return mockGallery;
};

export const fetchGalleryItem = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockGallery.find(item => item.id === parseInt(id));
};

export const createGalleryItem = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id: Date.now() };
};

export const updateGalleryItem = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id };
};

export const deleteGalleryItem = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};
