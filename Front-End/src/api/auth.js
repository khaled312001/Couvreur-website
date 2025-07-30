// Mock authentication data for testing
const mockUser = {
  id: 1,
  name: "Admin",
  email: "admin@bnbuilding.com",
  role: "admin"
};

export const login = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (credentials.email === "admin@bnbuilding.com" && credentials.password === "password") {
    return { user: mockUser, token: "mock-jwt-token" };
  }
  throw new Error("Invalid credentials");
};

export const logout = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};

export const getCurrentUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockUser;
};
