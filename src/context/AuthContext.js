import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const userData = await authService.verifyToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, logout]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.data);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.data);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authService.resetPassword(token, newPassword);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      isAuthenticated: !!user
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);