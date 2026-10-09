import re

with open("src/services/currencyService.js", "r", encoding="utf-8") as f:
    content = f.read()

# Fix initialize function
new_fetch = """        const token = localStorage.getItem('token');
        const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });"""

content = content.replace("const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings`);", new_fetch)

# Fix saveSettings function
old_put = """      const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });"""

new_put = """      const token = localStorage.getItem('token');
      const response = await fetch(`${this.API_BASE_URL}/currency/currency-settings?tenant_id=${tenantId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(settings)
      });"""

content = content.replace(old_put, new_put)

with open("src/services/currencyService.js", "w", encoding="utf-8") as f:
    f.write(content)
