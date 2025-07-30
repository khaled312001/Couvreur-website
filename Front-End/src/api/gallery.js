// Mock data for testing
const mockGallery = [
  {
    id: 1,
    title: "Rénovation Toiture Tuiles",
    image: "https://www.toiture-pro.com/wp-content/uploads/sites/6/2020/10/r%C3%A9novation-toiture.jpg",
    description: "Rénovation complète d'une toiture en tuiles",
    category: "Charpente"
  },
  {
    id: 2,
    title: "Installation Zinc",
    image: "https://tse4.mm.bing.net/th/id/OIP.5Vnetpo-iWM3dpVmKszntAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Installation de zinguerie en zinc",
    category: "Zinguerie"
  },
  {
    id: 3,
    title: "Réparation Gouttières",
    image: "https://scaffold-tower-hire.com/wp-content/uploads/2023/04/gutter-1024x684.jpg",
    description: "Réparation et remplacement de gouttières",
    category: "Couverture"
  },
  {
    id: 4,
    title: "Isolation Thermique",
    image: "https://www.actifconfort.fr/wp-content/uploads/2022/04/isolation-thermique-de-la-toiture-utilite-1024x576.jpg",
    description: "Isolation thermique de toiture",
    category: "Charpente"
  },
  {
    id: 5,
    title: "Charpente Traditionnelle",
    image: "https://tse4.mm.bing.net/th/id/OIP.1CMUrijybUGCE7-WKjVlwAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Construction de charpente traditionnelle",
    category: "Charpente"
  },
  {
    id: 6,
    title: "Couverture Ardoise",
    image: "https://i.pinimg.com/736x/b8/a2/01/b8a2013572848aed5545c0017731ce7d.jpg",
    description: "Installation de couverture en ardoise",
    category: "Couverture"
  },
  {
    id: 7,
    title: "Zinguerie Étanchéité",
    image: "https://tse1.mm.bing.net/th/id/OIP.4GrVPXHBFp8fOWdNTTShkQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Travaux d'étanchéité et zinguerie",
    category: "Zinguerie"
  },
  {
    id: 8,
    title: "Rénovation Complète",
    image: "https://tse2.mm.bing.net/th/id/OIP.Od06bP_Tl1-YTkEgldD6kQHaFd?rs=1&pid=ImgDetMain&o=7&rm=3",
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
