// Mock data for testing
const mockTestimonials = [
  {
    id: 1,
    author: "Marie Dubois",
    rating: 5,
    text: "Excellent travail de rénovation de notre toiture. Équipe professionnelle et ponctuelle. Je recommande vivement !",
    date: "15 décembre 2024",
    location: "Lyon"
  },
  {
    id: 2,
    author: "Pierre Martin",
    rating: 5,
    text: "Installation de gouttières parfaite. Prix compétitif et travail soigné. Merci pour votre professionnalisme.",
    date: "20 novembre 2024",
    location: "Grenoble"
  },
  {
    id: 3,
    author: "Sophie Bernard",
    rating: 4,
    text: "Réparation rapide et efficace de notre toiture après la tempête. Équipe réactive et compétente.",
    date: "10 octobre 2024",
    location: "Saint-Étienne"
  }
];

export const fetchTestimonials = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTestimonials;
};

export const getTestimonials = () => {
  return mockTestimonials;
};

export const fetchTestimonialById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTestimonials.find(testimonial => testimonial.id === parseInt(id));
};

export const createTestimonial = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id: Date.now() };
};

export const updateTestimonial = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id };
};

export const deleteTestimonial = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};
