import { Q as axios, I as BASE_URL, af as getAuthHeaders } from './index-rR_eRHdu.js';

function fetchPromiseToFundReport() {
  return Promise.resolve([
    { id: 1, customerId: 'CUST-1001', customerName: 'John Doe', amount: 5000, date: '2026-09-20', status: 'Pending' },
    { id: 2, customerId: 'CUST-1042', customerName: 'Mary Smith', amount: 12000, date: '2026-09-21', status: 'Pending' },
    { id: 3, customerId: 'CUST-1099', customerName: 'Peter Jones', amount: 750, date: '2026-09-18', status: 'Fulfilled' },
  ])
}

function logEngagement(customerId, payload) {
  console.log(`[CRM API] Logged engagement for ${customerId}:`, payload);
  return Promise.resolve({ success: true, timestamp: new Date().toISOString() })
}

async function fetchTickets() {
  const response = await axios.get(`${BASE_URL}/api/v1/crm/tickets`, { headers: getAuthHeaders() });
  return response.data;
}

async function createTicket(payload) {
  const response = await axios.post(`${BASE_URL}/api/v1/crm/tickets`, payload, { headers: getAuthHeaders() });
  return response.data;
}

async function deleteTicket(ticketId) {
  const response = await axios.delete(`${BASE_URL}/api/v1/crm/tickets/${ticketId}`, { headers: getAuthHeaders() });
  return response.data;
}

async function updateTicket(ticketId, payload) {
  const response = await axios.put(`${BASE_URL}/api/v1/crm/tickets/${ticketId}`, payload, { headers: getAuthHeaders() });
  return response.data;
}

export { fetchPromiseToFundReport as a, createTicket as c, deleteTicket as d, fetchTickets as f, logEngagement as l, updateTicket as u };
