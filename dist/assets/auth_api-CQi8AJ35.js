import { Z as __vitePreload, Q as axios } from './index-Dxw7beKB.js';

const BASE_URL = "http://22.84.115.25:8080".trim() || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://22.84.115.25:8080" : "https://ub-app-backend-692487163735.europe-west1.run.app");
const API_URL = `${BASE_URL}/auth`;
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const authApi = {
  /**
   * POST /auth/login
   * Returns the raw token response; caller must call authStore.setSession(data).
   */
  async login(credentials) {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        username: credentials.username || credentials.email,
        password: credentials.password
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  },
  /**
   * POST /auth/refresh
   * Returns the raw token response; caller must call authStore.setSession(data).
   */
  async refreshToken(refreshTokenValue) {
    try {
      const { data } = await axios.post(`${API_URL}/refresh`, {
        refresh_token: refreshTokenValue
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || "Token refresh failed");
    }
  },
  getUserEmail() {
    return localStorage.getItem("email");
  },
  /** Delegate to authStore — kept for backward compat */
  async logout() {
    const { useAuthStore } = await __vitePreload(async () => { const { useAuthStore } = await import('./index-Dxw7beKB.js').then(n => n.ai);return { useAuthStore }},true              ?[]:void 0);
    const store = useAuthStore();
    await store.clearSession();
    window.location.href = "/login";
  },
  /**
   * GET /auth/me — current user profile from DB (includes roles, branch_code).
   */
  async fetchProfile() {
    try {
      const { data } = await apiClient.get("/me");
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || "Failed to fetch profile");
    }
  },
  // ── Admin user management (ADMIN role required) ────────────────────────────
  async listUsers(params = {}) {
    const { data } = await apiClient.get("/admin/users", { params });
    return data;
  },
  async createUser(payload) {
    const { data } = await apiClient.post("/admin/users", payload);
    return data;
  },
  async updateUser(userId, payload) {
    const { data } = await apiClient.patch(`/admin/users/${userId}`, payload);
    return data;
  },
  async deleteUser(userId) {
    const { data } = await apiClient.delete(`/admin/users/${userId}`);
    return data;
  },
  async listRoles() {
    const { data } = await apiClient.get("/admin/roles");
    return data;
  },
  async createRole(payload) {
    const { data } = await apiClient.post("/admin/roles", payload);
    return data;
  },
  async listBranches() {
    const { data } = await apiClient.get("/admin/branches");
    return data;
  },
  async createBranch(payload) {
    const { data } = await apiClient.post("/admin/branches", payload);
    return data;
  },
  async updateBranch(branchCode, payload) {
    const { data } = await apiClient.patch("/admin/branches/" + branchCode, payload);
    return data;
  },
  async deleteBranch(branchCode) {
    const { data } = await apiClient.delete("/admin/branches/" + branchCode);
    return data;
  }
};
async function requestPasswordReset(email) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to send reset email");
  }
  return res.json();
}
async function resetPassword(email, otp, password) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, new_password: password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to reset password");
  }
  return res.json();
}

export { resetPassword as a, authApi as b, requestPasswordReset as r };
