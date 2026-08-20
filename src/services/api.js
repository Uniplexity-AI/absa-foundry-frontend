import axios from 'axios';
import router from '@/router';

// Backend base URL resolution:
//   1. VITE_API_BASE_URL (committed in .env → Tailscale host) is used verbatim,
//      so remote devs on the tailnet connect straight to the shared backend.
//   2. Fallback (no env var): localhost in local dev, hosted backend otherwise.
const _configured = (import.meta.env.VITE_API_BASE_URL || '').trim();

const BASE_URL = _configured || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080'
    : 'https://ub-app-backend-692487163735.europe-west1.run.app'
);

// Ensure consistent export
export const API_BASE_URL = BASE_URL;
export default BASE_URL;

export function getAuthHeaders(existingHeaders = {}) {
  const headers = new Headers(existingHeaders || {});
  const token = localStorage.getItem('token') || localStorage.getItem('access_token');

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

export function authFetch(input, init = {}) {
  const headers = getAuthHeaders(init.headers);
  console.log('[authFetch]', init.method || 'GET', typeof input === 'string' ? input.substring(0, 80) : input, 'hasAuth=' + headers.has('Authorization'));
  return fetch(input, {
    ...init,
    headers: headers
  });
}

export async function postRequest(endpoint, body) {
  try {
    // Legacy support: postRequest was assuming BASE_URL ended in /auth
    // We construct the URL carefully.
    const url = `${BASE_URL}/auth/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || data.message || "Request failed");

    return data;
  } catch (err) {
    throw err;
  }
}

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — auto-refresh on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry login/refresh endpoints themselves
    if (originalRequest._retry || originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        processQueue(null, data.access_token);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export async function Signup(email, password, phone_number, role) {
  const payload = {
    email,
    password,
    phone_number,
    role
  };

  const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload);
  return response.data;
}

/**
 * Authenticate with username/password per API Gateway spec.
 * POST /auth/login → { username, password }
 * Response: { access_token, refresh_token, token_type, expires_in }
 */
export async function login(username, password) {
  const payload = { username, password };
  const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
  const data = response.data;

  // Store tokens from the spec-compliant response
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
}

/**
 * Exchange a refresh token for a new token pair.
 * POST /auth/refresh → { refresh_token }
 * Response: { access_token, refresh_token, token_type, expires_in }
 */
export async function refreshToken(refreshTokenValue) {
  const payload = { refresh_token: refreshTokenValue };
  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, payload);
  const data = response.data;

  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  return data;
}

export async function logout() {
  await axios.get(`${API_BASE_URL}/auth/logout`).catch((error) => {
    console.log('Error during logout:', error);
  });
  localStorage.clear();
  window.location.href = '/';
}
