import api from './api';

export const therapyService = {
  getAllTherapists: async () => {
    const response = await api.get('/therapists');
    return response.data;
  },

  getTherapistById: async (id) => {
    const response = await api.get(`/therapists/${id}`);
    return response.data;
  },

  bookSession: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  getAvailableSlots: async (therapistId, date) => {
    const response = await api.get(`/therapists/${therapistId}/available-slots?date=${date}`);
    return response.data;
  }
};