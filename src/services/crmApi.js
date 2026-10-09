export function fetchPromiseToFundReport() {
  return Promise.resolve([
    { id: 1, customerId: 'CUST-1001', customerName: 'John Doe', amount: 5000, date: '2026-09-20', status: 'Pending' },
    { id: 2, customerId: 'CUST-1042', customerName: 'Mary Smith', amount: 12000, date: '2026-09-21', status: 'Pending' },
    { id: 3, customerId: 'CUST-1099', customerName: 'Peter Jones', amount: 750, date: '2026-09-18', status: 'Fulfilled' },
  ])
}

export function logEngagement(customerId, payload) {
  console.log(`[CRM API] Logged engagement for ${customerId}:`, payload)
  return Promise.resolve({ success: true, timestamp: new Date().toISOString() })
}

export function getNextOfKin(customerId) {
  // Dummy data
  return Promise.resolve({
    name: 'Jane Doe',
    relation: 'Spouse',
    phone: '+260******123'
  })
}


import axios from 'axios';
import BASE_URL, { getAuthHeaders } from './api';

export async function fetchTickets() {
  const response = await axios.get(`${BASE_URL}/api/v1/crm/tickets`, { headers: getAuthHeaders() });
  return response.data;
}

export async function createTicket(payload) {
  const response = await axios.post(`${BASE_URL}/api/v1/crm/tickets`, payload, { headers: getAuthHeaders() });
  return response.data;
}

export async function deleteTicket(ticketId) {
  const response = await axios.delete(`${BASE_URL}/api/v1/crm/tickets/${ticketId}`, { headers: getAuthHeaders() });
  return response.data;
}

export async function updateTicket(ticketId, payload) {
  const response = await axios.put(`${BASE_URL}/api/v1/crm/tickets/${ticketId}`, payload, { headers: getAuthHeaders() });
  return response.data;
}
