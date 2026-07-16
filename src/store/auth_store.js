import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';
import { logAuditEvent } from '@/api_services/audit_log';
import { API_BASE_URL } from '@/api_services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, // Should include role and shop_id
    shop_id: null,
    isAuthenticated: false,
  }),
  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || null,
    shopId: (state) => state.user?.shop_id || state.shop_id,
  },
  actions: {
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
        this.shop_id = response.data.shop_id;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      }
    },
    async login(username, password) {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          username,
          password,
        });
        this.token = response.data.access_token;
        localStorage.setItem('token', this.token);
        await this.fetchUser();
        // Audit log for login
        logAuditEvent('login', { username });
        router.push('/');
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    setUser(user) {
      this.user = user;
      this.shop_id = user.shop_id;
      this.isAuthenticated = !!user;
    },
    setShopId(shop_id) {
      this.shop_id = shop_id;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.shop_id = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      // Audit log for logout
      logAuditEvent('logout', { user: this.user });
      router.push('/login');
    },
  },
});
