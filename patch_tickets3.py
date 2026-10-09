import re

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add newCaseForm and saveNewCase function
script_injection = """const mockTickets = ref([
  { id: 'CASE-4892', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
])

const newCaseForm = ref({
  subject: '',
  customer: '',
  type: 'Complaint',
  priority: 'Low',
  channel: 'In-Branch',
  assignedTo: 'Unassigned',
  description: ''
})

const saveNewCase = () => {
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

content = re.sub(r"const mockTickets = ref\(\[.*?\]\)", script_injection, content, flags=re.DOTALL)

# 2. Update the HTML bindings for the modal
content = content.replace(
    """<input type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Brief summary of issue" />""",
    """<input type="text" v-model="newCaseForm.subject" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Brief summary of issue" />"""
)

content = content.replace(
    """<input type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="e.g. +260 96 111..." />""",
    """<input type="text" v-model="newCaseForm.customer" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="e.g. +260 96 111..." />"""
)

content = content.replace(
    """<select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Complaint</option>""",
    """<select v-model="newCaseForm.type" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Complaint</option>"""
)

content = content.replace(
    """<select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Low</option>""",
    """<select v-model="newCaseForm.priority" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Low</option>"""
)

content = content.replace(
    """<select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>In-Branch</option>""",
    """<select v-model="newCaseForm.channel" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>In-Branch</option>"""
)

content = content.replace(
    """<select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Unassigned</option>""",
    """<select v-model="newCaseForm.assignedTo" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">\n                  <option>Unassigned</option>"""
)

content = content.replace(
    """<textarea rows="4" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Detailed description of the case..."></textarea>""",
    """<textarea v-model="newCaseForm.description" rows="4" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Detailed description of the case..."></textarea>"""
)

content = content.replace(
    """<button @click="showNewCaseModal = false" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">\n              Create Ticket\n            </button>""",
    """<button @click="saveNewCase" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">\n              Create Ticket\n            </button>"""
)

with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
    f.write(content)

print("Patch complete")
