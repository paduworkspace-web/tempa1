import api from './api';

export const contactService = {
  submitContact: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  getAllContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/contact/${id}/read`);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  }
};