import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  async login(credentials) {
    try {
      // Handles standard Spring Boot auth endpoint
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      // Fallback in case endpoint is /login directly
      if (err.status === 404) {
        const fallbackRes = await api.post('/login', credentials);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      if (err.status === 404) {
        const fallbackRes = await api.post('/register', userData);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },
};

export default authService;
