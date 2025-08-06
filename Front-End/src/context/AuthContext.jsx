import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getCurrentUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in on app start
    const checkAuth = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('AuthContext: Checking authentication...');
        }
        const userData = await getCurrentUser();
        if (process.env.NODE_ENV === 'development') {
          console.log('AuthContext: getCurrentUser result:', userData);
        }
        if (userData) {
          setUser(userData);
          if (process.env.NODE_ENV === 'development') {
            console.log('AuthContext: User authenticated:', userData);
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log('AuthContext: No user data found');
          }
        }
      } catch (error) {
        console.error('AuthContext: Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await loginApi(credentials);
      setUser(data.user);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setUser(null);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await fetch('https://api.bnbatiment.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      setUser(data.user);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
