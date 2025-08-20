import api from './api';

export const meditationService = {
  getAllMeditations: async () => {
    const response = await api.get('/meditations');
    return response.data;
  },

  getMeditationById: async (id) => {
    const response = await api.get(`/meditations/${id}`);
    return response.data;
  },

  createMeditation: async (meditationData) => {
    const response = await api.post('/meditations', meditationData);
    return response.data;
  },

  updateMeditation: async (id, meditationData) => {
    const response = await api.put(`/meditations/${id}`, meditationData);
    return response.data;
  },

  deleteMeditation: async (id) => {
    const response = await api.delete(`/meditations/${id}`);
    return response.data;
  },

  searchMeditations: async (query) => {
    const response = await api.get(`/meditations/search?q=${query}`);
    return response.data;
  }
};