import api from './api';

export const communityService = {
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  getReplies: async (postId) => {
    const response = await api.get(`/posts/${postId}/replies`);
    return response.data;
  },

  createReply: async (postId, replyData) => {
    const response = await api.post(`/posts/${postId}/replies`, replyData);
    return response.data;
  },

  deleteReply: async (replyId) => {
    const response = await api.delete(`/replies/${replyId}`);
    return response.data;
  }
};