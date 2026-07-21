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
      ['token','user_id','email','role','userName','company_name','tenant_id']
        .forEach(k => localStorage.removeItem(k))
      this.token = null
      this.userRole = null
      this.userEmail = null
    }
  }
})
