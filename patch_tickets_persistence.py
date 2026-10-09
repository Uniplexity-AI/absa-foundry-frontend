with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

# 1. Update import
content = content.replace("import { ref } from 'vue'", "import { ref, watch } from 'vue'")

# 2. Update mockTickets to use localStorage
old_mock_tickets = """const mockTickets = ref([
  { id: 'CASE-4892', subject: 'App not working', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', subject: 'Loan requirements', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', subject: 'Card stolen, block immediately', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', subject: 'Where is my new debit card?', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
])"""

new_mock_tickets = """const defaultTickets = [
  { id: 'CASE-4892', subject: 'App not working', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', subject: 'Loan requirements', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', subject: 'Card stolen, block immediately', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', subject: 'Where is my new debit card?', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
]

const savedTickets = localStorage.getItem('absa_crm_tickets')
const mockTickets = ref(savedTickets ? JSON.parse(savedTickets) : defaultTickets)

// Watch for any changes to tickets (creating, editing, deleting) and auto-save
watch(mockTickets, (newVal) => {
  localStorage.setItem('absa_crm_tickets', JSON.stringify(newVal))
}, { deep: true })"""

if old_mock_tickets in content:
    content = content.replace(old_mock_tickets, new_mock_tickets)
    with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
        f.write(content)
    print("Patch successful!")
else:
    print("Could not find mockTickets exact string. Printing first 500 chars surrounding it:")
    match = re.search(r"const mockTickets = ref\(\[.*?\]\)", content, re.DOTALL)
    if match:
        print(match.group(0))
