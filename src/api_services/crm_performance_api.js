import axios from 'axios';
import { API_BASE_URL } from './api';

/**
 * Fetch performance details for a given user: activities and sales (leads, contacts, accounts, deals).
 * @param {Object} params - { tenant_id, userEmail?, userId?, start?, end?, limit? }
 */
export async function getUserPerformance(params) {
  if (!params || !params.tenant_id) {
    throw new Error('tenant_id is required');
  }
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.append(k, v);
  });
  const { data } = await axios.get(`${API_BASE_URL}/crm/performance/user?${query.toString()}`);
  return data;
}
