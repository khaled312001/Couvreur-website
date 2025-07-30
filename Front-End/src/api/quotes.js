// Mock data for testing
const mockQuotes = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean@example.com",
    phone: "06 12 34 56 78",
    service: "Installation de Toiture",
    message: "Bonjour, je souhaite un devis pour l'installation d'une toiture neuve.",
    status: "new",
    date: "2025-01-15"
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie@example.com",
    phone: "06 98 76 54 32",
    service: "Réparation de Toiture",
    message: "J'ai besoin de réparer ma toiture après la tempête.",
    status: "pending",
    date: "2025-01-14"
  }
];

export const fetchQuotes = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockQuotes;
};

export const createQuote = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newQuote = {
    ...data,
    id: Date.now(),
    status: "new",
    date: new Date().toISOString().split('T')[0]
  };
  mockQuotes.push(newQuote);
  return newQuote;
};

export const deleteQuote = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const index = mockQuotes.findIndex(quote => quote.id === id);
  if (index > -1) {
    mockQuotes.splice(index, 1);
  }
  return { success: true };
};
