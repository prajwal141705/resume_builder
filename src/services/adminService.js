import api from './api';

export const adminService = {
  // --- Dashboard Stats ---
  async getStats() {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (err) {
      console.warn('Backend admin stats unavailable, returning demo metrics:', err.message);
      return {
        totalUsers: 28,
        activeUsers: 25,
        totalResumes: 46,
        totalUploadedResumes: 18,
        totalTemplates: 10,
        totalJobs: 8,
        pendingTemplateRequests: 2,
        recentUsers: [
          { id: 'u1', name: 'Alex Morgan', email: 'alex@example.com', status: 'ACTIVE', resumeCount: 3, createdAt: new Date().toISOString() },
          { id: 'u2', name: 'Sara Chen', email: 'sara.chen@tech.io', status: 'ACTIVE', resumeCount: 2, createdAt: new Date().toISOString() },
          { id: 'u3', name: 'Marcus Brody', email: 'marcus@cloud.dev', status: 'ACTIVE', resumeCount: 1, createdAt: new Date().toISOString() },
        ],
        recentUploads: [
          { id: 'up1', originalFileName: 'alex_software_resume.pdf', fileSizeBytes: 184320, userEmail: 'alex@example.com', status: 'PARSED', createdAt: new Date().toISOString() },
          { id: 'up2', originalFileName: 'sara_lead_eng_2026.pdf', fileSizeBytes: 245100, userEmail: 'sara.chen@tech.io', status: 'PARSED', createdAt: new Date().toISOString() },
        ],
      };
    }
  },

  // --- Users Management ---
  async getUsers(search = '', status = '') {
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      const response = await api.get('/admin/users', { params });
      return response.data;
    } catch (err) {
      console.warn('Backend admin users unavailable:', err.message);
      return [
        { id: 'u1', name: 'Alex Morgan', email: 'user@resumebuilder.com', phone: '+1 555-019-2834', status: 'ACTIVE', roles: ['ROLE_USER'], resumeCount: 3, createdAt: '2026-09-15T10:00:00Z' },
        { id: 'u2', name: 'System Administrator', email: 'admin@resumebuilder.com', phone: '+1 555-010-9999', status: 'ACTIVE', roles: ['ROLE_ADMIN', 'ROLE_USER'], resumeCount: 5, createdAt: '2026-09-01T08:00:00Z' },
        { id: 'u3', name: 'Elena Rostova', email: 'elena@frontend.dev', phone: '+1 555-442-1200', status: 'ACTIVE', roles: ['ROLE_USER'], resumeCount: 2, createdAt: '2026-09-20T14:30:00Z' },
        { id: 'u4', name: 'Devon Vance', email: 'devon@infra.io', phone: '+1 555-778-9911', status: 'INACTIVE', roles: ['ROLE_USER'], resumeCount: 1, createdAt: '2026-09-25T11:20:00Z' },
      ];
    }
  },

  async updateUserStatus(id, status) {
    const response = await api.put(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // --- Jobs Management ---
  async getJobs() {
    try {
      const response = await api.get('/admin/jobs');
      return response.data;
    } catch (err) {
      console.warn('Backend admin jobs unavailable:', err.message);
      return [
        { id: 'j1', title: 'Senior Full Stack Software Engineer', company: 'TechCorp Global', location: 'San Francisco, CA', jobType: 'Full-time', salaryRange: '$140k - $175k', enabled: true, requiredSkills: ['Java', 'Spring Boot', 'React', 'MongoDB'] },
        { id: 'j2', title: 'Frontend Developer (React / Next.js)', company: 'PixelCraft Digital', location: 'Remote', jobType: 'Full-time', salaryRange: '$95k - $125k', enabled: true, requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'] },
        { id: 'j3', title: 'DevOps & Cloud Infrastructure Engineer', company: 'CloudScale Systems', location: 'Austin, TX', jobType: 'Full-time', salaryRange: '$110k - $145k', enabled: true, requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
      ];
    }
  },

  async createJob(payload) {
    const response = await api.post('/admin/jobs', payload);
    return response.data;
  },

  async updateJob(id, payload) {
    const response = await api.put(`/admin/jobs/${id}`, payload);
    return response.data;
  },

  async toggleJobStatus(id) {
    const response = await api.put(`/admin/jobs/${id}/toggle-status`);
    return response.data;
  },

  async deleteJob(id) {
    const response = await api.delete(`/admin/jobs/${id}`);
    return response.data;
  },

  // --- Templates Management ---
  async getTemplates() {
    try {
      const response = await api.get('/admin/templates');
      return response.data;
    } catch (err) {
      console.warn('Backend admin templates unavailable:', err.message);
      return [];
    }
  },

  async createTemplate(payload) {
    const response = await api.post('/admin/templates', payload);
    return response.data;
  },

  async updateTemplate(id, payload) {
    const response = await api.put(`/admin/templates/${id}`, payload);
    return response.data;
  },

  async toggleTemplateStatus(id) {
    const response = await api.put(`/admin/templates/${id}/toggle-status`);
    return response.data;
  },

  async deleteTemplate(id) {
    const response = await api.delete(`/admin/templates/${id}`);
    return response.data;
  },

  // --- Template Requests Review ---
  async getTemplateRequests(status = '') {
    try {
      const params = status ? { status } : {};
      const response = await api.get('/admin/template-requests', { params });
      return response.data;
    } catch (err) {
      console.warn('Backend admin template requests unavailable:', err.message);
      return [
        { id: 'tr1', userName: 'Sara Chen', userEmail: 'sara.chen@tech.io', templateName: 'Nordic Clean Dark', description: 'Dark-themed sleek developer layout with neon accents', status: 'PENDING', createdAt: '2026-10-01T10:00:00Z' },
        { id: 'tr2', userName: 'David Kim', userEmail: 'david@ai.io', templateName: 'Research & Academia CV', description: 'Two column publication-heavy layout for researchers', status: 'PENDING', createdAt: '2026-10-02T12:00:00Z' },
      ];
    }
  },

  async reviewTemplateRequest(id, status, feedback = '') {
    const response = await api.put(`/admin/template-requests/${id}/status`, {
      status,
      adminFeedback: feedback,
    });
    return response.data;
  },

  // --- Uploaded Resumes ---
  async getUploadedResumes() {
    try {
      const response = await api.get('/admin/uploaded-resumes');
      return response.data;
    } catch (err) {
      console.warn('Backend admin uploaded resumes unavailable:', err.message);
      return [];
    }
  },
};

export default adminService;
