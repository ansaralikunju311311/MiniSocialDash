// src/Services/authService.js
import axiosInstance from '../utils/axiosConfig';

export const verifyToken = async () => {
  try {
    const response = await axiosInstance.get('/verify-token');
    return response.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw error;
  }
};