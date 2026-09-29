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

export { fetchPromiseToFundReport as f, logEngagement as l };
