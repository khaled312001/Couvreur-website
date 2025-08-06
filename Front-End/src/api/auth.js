const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.bnbatiment.com/api';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (process.env.NODE_ENV === 'development') {
      console.log('getCurrentUser: token exists:', !!token);
    }
    if (!token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('getCurrentUser: No token found, returning null');
      }
      return null;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('getCurrentUser: Making request to /auth/user');
    }
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('getCurrentUser: response status:', response.status);
    }
    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log('getCurrentUser: response not ok, throwing error');
      }
      throw new Error('Unauthorized');
    }

    const userData = await response.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('getCurrentUser: userData:', userData);
    }
    return userData;
  } catch (error) {
    console.error('getCurrentUser error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};
