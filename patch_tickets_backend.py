import re

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

# Add onMounted to imports if missing
if "onMounted" not in content:
    content = content.replace("import { ref, watch } from 'vue'", "import { ref, watch, onMounted } from 'vue'")

# Add api imports
if "fetchTickets" not in content:
    import_statement = "import { fetchTickets, createTicket } from '@/services/crmApi'\n"
    content = content.replace("import FaqUploadModal from './FaqUploadModal.vue'", import_statement + "import FaqUploadModal from './FaqUploadModal.vue'")

# Replace mockTickets initialization
old_mock_tickets = """const defaultTickets = [
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

new_mock_tickets = """const mockTickets = ref([])

const loadTickets = async () => {
  try {
    mockTickets.value = await fetchTickets()
  } catch (error) {
    console.error("Failed to load tickets from database", error)
  }
}

onMounted(() => {
  loadTickets()
})"""

if old_mock_tickets in content:
    content = content.replace(old_mock_tickets, new_mock_tickets)
else:
    print("Could not find the localStorage mockTickets logic to replace.")

# Replace saveNewCase
old_save_new_case = """const saveNewCase = () => {
  if (!newCaseForm.value.subject || !newCaseForm.value.customer) {
    alert("Subject and Customer are required!")
    return
  }
  
  // Generate a random ID higher than the current ones
  const idNum = Math.floor(Math.random() * 1000) + 5000
  
  const today = new Date().toISOString().split('T')[0]
  
  mockTickets.value.unshift({
    id: `CASE-${idNum}`,
    type: newCaseForm.value.type,
    customer: newCaseForm.value.customer,
    status: 'Open',
    priority: newCaseForm.value.priority,
    channel: newCaseForm.value.channel,
    sla: 'On Track',
    created: today,
    subject: newCaseForm.value.subject,
    description: newCaseForm.value.description,
    assignedTo: newCaseForm.value.assignedTo
  })
  
  // Reset form
  newCaseForm.value = {
    subject: '',
    customer: '',
    type: 'Complaint',
    priority: 'Low',
    channel: 'In-Branch',
    assignedTo: 'Unassigned',
    description: ''
  }
  
  showNewCaseModal.value = false
}"""

new_save_new_case = """const saveNewCase = async () => {
  if (!newCaseForm.value.subject || !newCaseForm.value.customer) {
    alert("Subject and Customer are required!")
    return
  }
  
  try {
    const res = await createTicket(newCaseForm.value)
    mockTickets.value.unshift(res.ticket)
    
    // Reset form
    newCaseForm.value = {
      subject: '',
      customer: '',
      type: 'Complaint',
      priority: 'Low',
      channel: 'In-Branch',
      assignedTo: 'Unassigned',
      description: ''
    }
    showNewCaseModal.value = false
  } catch (error) {
    console.error("Failed to save ticket", error)
    alert("Error creating ticket.")
  }
}"""

if old_save_new_case in content:
    content = content.replace(old_save_new_case, new_save_new_case)
else:
    print("Could not find the old saveNewCase logic to replace.")

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
    f.write(content)

print("Tickets Page updated to use backend.")
