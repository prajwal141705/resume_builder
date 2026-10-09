import api from './api';
import { STORAGE_KEYS, INITIAL_RESUME_STATE } from '../utils/constants';

// Local storage helper for offline fallback
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
   * Duplicate a resume by ID
   */
  async duplicateResume(id) {
    try {
      const response = await api.post(`/resumes/${id}/duplicate`);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable, duplicating local resume ${id}:`, err.message);
      const localList = getLocalResumes();
      const original = localList.find((r) => r.id === id || r._id === id);
      if (original) {
        const duplicated = {
          ...original,
          id: `res-${Date.now()}`,
          title: `${original.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localList.unshift(duplicated);
        saveLocalResumes(localList);
        return duplicated;
      }
      throw new Error('Resume not found to duplicate');
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

  /**
   * Get version history for a resume
   */
  async getVersions(resumeId) {
    try {
      const response = await api.get(`/resumes/${resumeId}/versions`);
      return response.data;
    } catch (err) {
      console.warn('Backend unavailable for version history:', err.message);
      return [];
    }
  },

  /**
   * Create a manual version snapshot
   */
  async createVersion(resumeId, versionName, notes) {
    try {
      const response = await api.post(`/resumes/${resumeId}/versions`, {
        versionName,
        notes,
      });
      return response.data;
    } catch (err) {
      console.warn('Backend unavailable, version created locally:', err.message);
      return {
        id: `ver-${Date.now()}`,
        versionNumber: 1,
        versionName: versionName || 'Manual Snapshot',
        changeNotes: notes,
        createdAt: new Date().toISOString(),
      };
    }
  },

  /**
   * Restore a previous resume version
   */
  async restoreVersion(resumeId, versionId) {
    try {
      const response = await api.post(`/resumes/${resumeId}/versions/${versionId}/restore`);
      return response.data;
    } catch (err) {
      console.warn('Failed to restore version on backend:', err.message);
      throw err;
    }
  },
};

export default resumeService;
