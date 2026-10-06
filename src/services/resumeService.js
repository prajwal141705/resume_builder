import api from './api';
import { STORAGE_KEYS, INITIAL_RESUME_STATE } from '../utils/constants';

// Local storage helper for offline / demo fallback
const getLocalResumes = () => {
  try {
    const saved = localStorage.getItem('resumai_local_resumes');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading local resumes', e);
  }
  return [
    {
      id: 'demo-resume-1',
      ...INITIAL_RESUME_STATE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const saveLocalResumes = (resumes) => {
  try {
    localStorage.setItem('resumai_local_resumes', JSON.stringify(resumes));
  } catch (e) {
    console.error('Error saving local resumes', e);
  }
};

export const resumeService = {
  /**
   * Create a new resume
   */
  async createResume(resumeData) {
    try {
      const response = await api.post('/resumes', resumeData);
      return response.data;
    } catch (err) {
      // If backend is not available, provide local storage fallback with proper schema
      console.warn('Backend unavailable, saving resume locally:', err.message);
      const localList = getLocalResumes();
      const newResume = {
        ...resumeData,
        id: `res-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localList.unshift(newResume);
      saveLocalResumes(localList);
      return newResume;
    }
  },

  /**
   * Get all resumes for current user
   */
  async getUserResumes() {
    try {
      const response = await api.get('/resumes');
      return response.data;
    } catch (err) {
      console.warn('Backend unavailable, loading local resumes:', err.message);
      return getLocalResumes();
    }
  },

  /**
   * Get a resume by ID
   */
  async getResumeById(id) {
    try {
      const response = await api.get(`/resumes/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable, loading local resume ${id}:`, err.message);
      const localList = getLocalResumes();
      const found = localList.find((r) => r.id === id || r._id === id);
      if (found) return found;
      return { ...INITIAL_RESUME_STATE, id };
    }
  },

  /**
   * Update an existing resume
   */
  async updateResume(id, resumeData) {
    try {
      const response = await api.put(`/resumes/${id}`, resumeData);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable, updating local resume ${id}:`, err.message);
      const localList = getLocalResumes();
      const index = localList.findIndex((r) => r.id === id || r._id === id);
      const updated = {
        ...resumeData,
        id,
        updatedAt: new Date().toISOString(),
      };
      if (index !== -1) {
        localList[index] = updated;
      } else {
        localList.unshift(updated);
      }
      saveLocalResumes(localList);
      return updated;
    }
  },

  /**
   * Delete a resume by ID
   */
  async deleteResume(id) {
    try {
      const response = await api.delete(`/resumes/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable, deleting local resume ${id}:`, err.message);
      const localList = getLocalResumes();
      const filtered = localList.filter((r) => r.id !== id && r._id !== id);
      saveLocalResumes(filtered);
      return { success: true, message: 'Deleted successfully' };
    }
  },
};

export default resumeService;
