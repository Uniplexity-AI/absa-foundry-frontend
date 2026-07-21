import axios from 'axios';
import router from '@/router';

// Use Vite environment variable if set, otherwise fallback based on hostname
// Ensure HTTPS for production to avoid mixed content issues
const RAW_API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000'
    : 'https://ub-app-backend-692487163735.europe-west1.run.app');

export const MAIN_APP_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://app.uniplexityai.com';

export const MICRO_FINANCE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3005'
  : 'https://ub-mfe-microfinance-692487163735.europe-west1.run.app';

// Force HTTPS if not localhost
const enforcedBaseUrl = window.location.hostname === 'localhost'
  ? RAW_API_URL
  : (RAW_API_URL.startsWith('http:') ? RAW_API_URL.replace(/^http:/, 'https:') : (RAW_API_URL.startsWith('https:') ? RAW_API_URL : `https://${RAW_API_URL}`));

// Ensure consistent export
export const API_BASE_URL = enforcedBaseUrl;
export default enforcedBaseUrl;

// Re-assign for internal usage to avoid breaking existing references in this file
const BASE_URL = enforcedBaseUrl;

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

// Response interceptor (optional - for handling token expiry)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // alert("Token expired, redirecting to login page")
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);


export async function Signup(email, password, phone_number, role, tenant_id) {
  const payload = {
    email,
    password,
    phone_number,
    role
  };

  const response = await axios.post(`${API_BASE_URL}/auth/signup?tenant_id=${tenant_id}`, payload);
  return response.data;
}

export async function login(email, password) {
  const payload = { email, password };
  const response = await axios.post(`${API_BASE_URL}/auth/login`, payload)
    .then((newResponse) => {
      if (newResponse.data.station_id) {
        localStorage.setItem("stationId", newResponse.data.station_id);
        localStorage.setItem("name", newResponse.data.name);
      }
      return newResponse;
    });
  return response.data;
}
export async function logout() {
  const response = await axios.get(`${API_BASE_URL}/auth/logout`).catch((error) => {
    console.log("Error during logout: ", error)
  }).finally(() => {
    localStorage.clear();
    // router.push('/');
    window.location.href = '/';
  });
  console.log("Logout: ", response);
}
