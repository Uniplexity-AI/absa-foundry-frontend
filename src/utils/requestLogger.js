// Simple fetch wrapper that logs request endpoint, method, payload (body) and response body/status.
// Avoid logging Authorization headers or other secrets.
export async function loggedFetch(url, options = {}) {
  const method = (options && options.method) ? options.method.toUpperCase() : 'GET';
  try {
    console.groupCollapsed(`HTTP ${method} ${url}`);
    try {
      const payload = options && options.body ? JSON.parse(options.body) : options && options.body ? options.body : null;
      console.log('Request payload:', payload);
    } catch (e) {
      // body may not be JSON
      console.log('Request payload (raw):', options && options.body ? options.body : null);
    }

    const res = await fetch(url, options);

    // attempt to read response body safely
    let body = null;
    try {
      body = await res.clone().json();
    } catch (e) {
      try { body = await res.clone().text(); } catch (e2) { body = '<unreadable>'; }
    }
    console.log('Response status:', res.status, 'body:', body);
    console.groupEnd();
    return res;
  } catch (err) {
    console.groupCollapsed(`HTTP ${method} ${url}`);
    console.error('Request error:', err);
    console.groupEnd();
    throw err;
  }
}
