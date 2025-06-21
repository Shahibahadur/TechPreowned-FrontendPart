import config from '../config.js';

const API_URL = config.API_URL;

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || `Request failed with status ${response.status}`;
    throw new Error(error);
  }

  return data;
};

const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Network error during login');
    }
  },

  async register(userData) {
    try {
      let response;
      
      // Check if userData is FormData (has file) or regular object
      if (userData instanceof FormData) {
        // Send to multipart endpoint for file uploads
        response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          body: userData, // Don't set Content-Type header for FormData
          credentials: 'include'
        });
      } else {
        // Send to JSON endpoint for regular registration
        const userDataObj = {};
        Object.assign(userDataObj, userData);
        
        response = await fetch(`${API_URL}/register/json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataObj),
          credentials: 'include'
        });
      }
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Network error during registration');
    }
  },

  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error(error.message || 'Network error during password reset request');
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Network error during password reset');
    }
  },

  async verifyToken(token) {
    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await handleResponse(response);
      return result.data; // Return the user data
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error('Failed to verify token');
    }
  },
};

export default authService;