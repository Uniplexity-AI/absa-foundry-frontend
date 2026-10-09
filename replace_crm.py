import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the CRM features block
old_crm = '''{ id: 'workspace', name: 'WORKSPACE', desc: 'Omnichannel workspace & communication', icon: 'fas fa-headset' },
      { id: 'calendar', name: 'CALENDAR', desc: 'Manage meetings and activities', icon: 'fas fa-calendar-alt' },
      { id: 'analytics', name: 'CRM ANALYTICS', desc: 'Sales and performance dashboards', icon: 'fas fa-chart-line' },
      { id: 'tickets', name: 'TICKETS', desc: 'Customer support ticketing', icon: 'fas fa-ticket-alt' },
      { id: 'leads', name: 'LEADS', desc: 'Lead generation and tracking', icon: 'fas fa-magnet' },
      { id: 'pipeline', name: 'PIPELINE', desc: 'Sales pipeline management', icon: 'fas fa-funnel-dollar' },
      { id: 'contacts', name: 'CONTACTS', desc: 'Customer contact directory', icon: 'fas fa-address-card' },
      { id: 'accounts', name: 'ACCOUNTS', desc: 'Corporate and retail accounts', icon: 'fas fa-building' },
      { id: 'deals', name: 'DEALS', desc: 'Active deal tracking', icon: 'fas fa-handshake' },
      { id: 'documents', name: 'DOCUMENTS', desc: 'Customer documents and files', icon: 'fas fa-folder-open' },
      { id: 'meetings', name: 'MEETINGS', desc: 'Meeting scheduling', icon: 'fas fa-users' },
      { id: 'emails', name: 'EMAILS', desc: 'Email campaigns and tracking', icon: 'fas fa-envelope' },
      { id: 'calls', name: 'CALLS', desc: 'Call logging and dialer', icon: 'fas fa-phone' },
      { id: 'visits', name: 'VISITS', desc: 'Field visits and check-ins', icon: 'fas fa-map-marker-alt' },
      { id: 'whatsapp', name: 'WHATSAPP', desc: 'WhatsApp messaging integration', icon: 'fab fa-whatsapp' },
      { id: 'acquisition', name: 'ACQUISITION', desc: 'Customer acquisition channels', icon: 'fas fa-bullseye' },
      { id: 'promise', name: 'PROMISE TO FUND', desc: 'Funding commitment tracking', icon: 'fas fa-money-check-alt' }'''

new_crm = '''{ id: 'workspace', name: 'WORKSPACE', desc: 'Omnichannel workspace & communication', icon: 'fas fa-headset' },
      { id: 'customers', name: 'MY CUSTOMERS', desc: 'Assigned customer list and profiles', icon: 'fas fa-users' },
      { id: 'tickets', name: 'TICKETS & CASES', desc: 'Customer support ticketing', icon: 'fas fa-ticket-alt' },
      { id: 'analytics', name: 'CRM ANALYTICS', desc: 'Sales and performance dashboards', icon: 'fas fa-chart-pie' },
      { id: 'calendar', name: 'CALENDAR & ACTIVITIES', desc: 'Manage meetings and activities', icon: 'fas fa-calendar-alt' }'''

if old_crm in content:
    content = content.replace(old_crm, new_crm)
    with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced CRM features successfully.")
else:
    print("Could not find the old CRM block to replace.")
