import api from './api';

const LOCAL_NOTIFS_KEY = 'resumai_local_notifications';

const getLocalNotifs = () => {
  try {
    const saved = localStorage.getItem(LOCAL_NOTIFS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading local notifications', e);
  }
  return [
    {
      id: 'notif-1',
      title: 'Welcome to AI Resume Builder',
      message: 'Create your first resume or upload an existing PDF to test your ATS score.',
      type: 'SYSTEM',
      link: '/resume-builder',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'notif-2',
      title: '10 Matching Jobs Found',
      message: 'New software engineering and developer jobs match your profile skills.',
      type: 'JOB_MATCH',
      link: '/jobs',
      read: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];
};

const saveLocalNotifs = (notifs) => {
  try {
    localStorage.setItem(LOCAL_NOTIFS_KEY, JSON.stringify(notifs));
  } catch (e) {
    console.error('Error saving local notifications', e);
  }
};

export const notificationService = {
  async getNotifications() {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (err) {
      console.warn('Backend notifications unavailable, using local notifs:', err.message);
      return getLocalNotifs();
    }
  },

  async markAsRead(id) {
    try {
      const response = await api.put(`/notifications/${id}/read`);
      return response.data;
    } catch (err) {
      const local = getLocalNotifs();
      const updated = local.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveLocalNotifs(updated);
      return updated.find((n) => n.id === id);
    }
  },

  async markAllAsRead() {
    try {
      await api.put('/notifications/read-all');
    } catch (err) {
      const local = getLocalNotifs();
      const updated = local.map((n) => ({ ...n, read: true }));
      saveLocalNotifs(updated);
    }
  },
};

export default notificationService;
