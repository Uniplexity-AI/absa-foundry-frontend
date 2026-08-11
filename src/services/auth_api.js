import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8080'
    : 'https://ub-app-backend-692487163735.europe-west1.run.app')

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
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default {
  /**
   * POST /auth/login — API Gateway spec
   * Body: { username, password }
   * Response: { access_token, refresh_token, token_type, expires_in }
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: credentials.username || credentials.email,
        password: credentials.password,
      }, { withCredentials: true });

      const data = response.data;

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token', data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  },

  /**
   * POST /auth/refresh — API Gateway spec
   * Body: { refresh_token }
   * Response: { access_token, refresh_token, token_type, expires_in }
   */
  async refreshToken(refreshTokenValue) {
    try {
      const response = await axios.post(`${API_URL}/refresh`, {
        refresh_token: refreshTokenValue,
      }, { withCredentials: true });

      const data = response.data;

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token', data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return data;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      throw new Error(error.response?.data?.detail || 'Token refresh failed');
    }
  },

  async signup(userData) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true })

      if (response.data.success) {
        const email = userData.email
        localStorage.setItem('email', email)
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

export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send reset email');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email, otp, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email,
        otp: otp,
        new_password: password 
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to reset password');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
