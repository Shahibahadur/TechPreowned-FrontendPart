import axios from 'axios';
import config from '../config';

const API_URL = 'http://localhost:8080/api/images';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const imageService = {
  // Get all images
  getAllImages: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  },

  // Get images by category
  getImagesByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching images for category ${category}:`, error);
      throw error;
    }
  },

  // Save new image
  saveImage: async (imageData) => {
    try {
      const response = await axios.post(API_URL, imageData);
      return response.data;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  },

  // Delete image
  deleteImage: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting image ${id}:`, error);
      throw error;
    }
  },

  async uploadImage(file, category, productId = null) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    if (productId) {
      formData.append('productId', productId);
    }

    const response = await fetch(`${config.API_URL}/api/images/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    return handleResponse(response);
  },

  async getImagesByProductId(productId) {
    const response = await fetch(`${config.API_URL}/api/images/product/${productId}`, {
      credentials: 'include'
    });
    return handleResponse(response);
  },

  getImageUrl(category, filename) {
    return `${config.API_URL}/api/images/${category}/${filename}`;
  }
};

export default imageService; 