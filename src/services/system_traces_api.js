
import axios from 'axios';
import { API_BASE_URL } from './api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const systemTracesApi = {
  // Fetch recent system traces
  getRecentTraces: async (limit = 100) => {
    try {
      const response = await api.get(`/traces?limit=${limit}`);
      return response.data.traces || [];
    } catch (error) {
      console.error('Error fetching system traces:', error);
      throw error;
    }
  },

  // Fetch detailed timing breakdown for a specific trace
  getTraceBreakdown: async (traceId) => {
    try {
      const response = await api.get(`/traces/${traceId}/breakdown`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trace breakdown:', error);
      throw error;
    }
  }
};
