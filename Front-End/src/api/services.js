// Mock data for testing
const mockServices = [
  {
    id: 1,
    title: "Charpente",
    description: "Construction et rénovation de charpentes traditionnelles et modernes",
    icon: "🏗️",
    link: "/services/charpente"
  },
  {
    id: 2,
    title: "Couverture",
    description: "Installation et réparation de tous types de couvertures",
    icon: "🏠",
    link: "/services/couverture"
  },
  {
    id: 3,
    title: "Zinguerie",
    description: "Travaux de zinguerie et d'étanchéité pour votre toiture",
    icon: "⚡",
    link: "/services/zinguerie"
  }
];

export const fetchServices = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockServices;
};

export const getServices = () => {
  return mockServices;
};

export const fetchServiceById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockServices.find(service => service.id === parseInt(id));
};

export const createService = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id: Date.now() };
};

export const updateService = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { ...data, id };
};

export const deleteService = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};
