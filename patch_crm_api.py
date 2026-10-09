with open("src/services/crmApi.js", "r", encoding="utf-8") as f:
    content = f.read()

injection = """
import axios from 'axios';
import BASE_URL, { getAuthHeaders } from './api';

export async function fetchTickets() {
  const response = await axios.get(`${BASE_URL}/crm/tickets`, { headers: getAuthHeaders() });
  return response.data;
}

export async function createTicket(payload) {
  const response = await axios.post(`${BASE_URL}/crm/tickets`, payload, { headers: getAuthHeaders() });
  return response.data;
}
"""

if "fetchTickets" not in content:
    content = content + "\n" + injection
    with open("src/services/crmApi.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected fetchTickets/createTicket to crmApi.js")
else:
    print("Tickets API already mapped in crmApi.js")
