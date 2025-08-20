import api from './api';

export const chatbotService = {
  sendMessage: async (message) => {
    const response = await api.post('/chatbot/message', { message });
    return response.data;
  },

  getChatHistory: async () => {
    const response = await api.get('/chatbot/history');
    return response.data;
  },

  clearChatHistory: async () => {
    const response = await api.delete('/chatbot/history');
    return response.data;
  }
};