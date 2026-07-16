import axios from 'axios'
import store from '@/store/store'  // ✅ Import Vuex store

import { API_BASE_URL as BASE_URL } from './api'

const API_URL = `${BASE_URL}/auth`;
// ✅ Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true

})

// ✅ Automatically attach token to requests
// Automatically add token from store
apiClient.interceptors.request.use(config => {
  const token = store.getters.getToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true })

      if (response.data && response.data.access_token) {
        const email = response.data.email
        const access_token = response.data.access_token
        store.dispatch('saveUserEmail', email)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('access_token', access_token)

        // Call the endpoint to set the cookie
        await axios.post(
          `${API_URL}/set-cookie-token`,
          { token: access_token },
          { withCredentials: true }
        )
      }

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed')
    }
  },

  async signup(userData) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true })

      if (response.data.success) {
        const email = userData.email
        store.dispatch('saveUserEmail', email)   // ✅ Store in Vuex
        localStorage.setItem('userEmail', email) // ✅ Store in localStorage
      }

      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Signup failed')
    }
  },

  getUserEmail() {
    return localStorage.getItem('userEmail'); // Get email from storage
  },

  logout() {

    localStorage.removeItem('userEmail'); // Clear email on logout
    localStorage.removeItem('access_token')

    // Optional: Clear Vuex store too
    store.dispatch('clearUser')
    window.location.href = '/home'; // Redirect to home page
  },


  async updateUserRole(role) {
    try {
      const token = localStorage.getItem('token') // Assuming token is stored
      const response = await axios.put(
        `${API_URL}/update-role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update role')
    }
  },


  // ✅ Example: Fetch User Profile (Protected Endpoint)
  async fetchProfile() {
    try {
      const response = await apiClient.get('/profile')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch profile')
    }
  }
}
