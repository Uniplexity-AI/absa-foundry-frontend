import axios from 'axios';

import { API_BASE_URL } from './api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * List all bank accounts for a tenant.
 */
export async function listBankAccounts(tenantId, params = {}) {
  const res = await apiClient.get('/bank-accounts', {
    params: { tenant_id: tenantId, ...params },
  });
  return res.data;
}

/**
 * Get a single bank account by id.
 */
export async function getBankAccount(tenantId, id) {
  const res = await apiClient.get(`/bank-accounts/${id}`, {
    params: { tenant_id: tenantId },
  });
  return res.data;
}

/**
 * Create a new bank account.
 */
export async function createBankAccount(tenantId, payload) {
  const res = await apiClient.post('/bank-accounts', {
    ...payload,
    tenant_id: tenantId,
  });
  return res.data;
}

/**
 * Update an existing bank account.
 */
export async function updateBankAccount(tenantId, id, payload) {
  const res = await apiClient.put(`/bank-accounts/${id}`, {
    ...payload,
    tenant_id: tenantId,
  });
  return res.data;
}

/**
 * Set a bank account as the default.
 */
export async function setDefaultBankAccount(tenantId, id) {
  const res = await apiClient.post(`/bank-accounts/${id}/set-default`, null, {
    params: { tenant_id: tenantId },
  });
  return res.data;
}

/**
 * Delete a bank account.
 */
export async function deleteBankAccount(tenantId, id) {
  const res = await apiClient.delete(`/bank-accounts/${id}`, {
    params: { tenant_id: tenantId },
  });
  return res.data;
}

export default {
  listBankAccounts,
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  setDefaultBankAccount,
  deleteBankAccount,
};
