import api from './api';
import { TEMPLATE_OPTIONS } from '../utils/constants';

export const templateService = {
  async getActiveTemplates() {
    try {
      const response = await api.get('/templates');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return TEMPLATE_OPTIONS;
    } catch (err) {
      console.warn('Backend templates API unavailable, using built-in templates:', err.message);
      return TEMPLATE_OPTIONS;
    }
  },

  async submitTemplateRequest(payload) {
    const response = await api.post('/templates/request', payload);
    return response.data;
  },

  async getMyRequests() {
    try {
      const response = await api.get('/templates/my-requests');
      return response.data;
    } catch (err) {
      console.warn('Backend template requests unavailable:', err.message);
      return [];
    }
  },
};

export default templateService;
