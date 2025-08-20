import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get('/admin/activity');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  getSystemHealth: async () => {
    const response = await api.get('/admin/health');
    return response.data;
  },

  getAnalytics: async (period = '30d') => {
    const response = await api.get(`/admin/analytics?period=${period}`);
    return response.data;
  },

  exportData: async (type) => {
    const response = await api.get(`/admin/export/${type}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};