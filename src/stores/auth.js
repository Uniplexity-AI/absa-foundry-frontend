import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('role') || null,
    userEmail: localStorage.getItem('email') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    logout() {
      ['token','refresh_token','user_id','email','role','userName']
        .forEach(k => localStorage.removeItem(k))
      this.token = null
      this.userRole = null
      this.userEmail = null
    }
  }
})
