repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\stores\crmStore.js'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# We will rewrite the store's incoming queue logic.
# First, remove the hardcoded incomingQueue initialization.
new_content = re.sub(
    r"const incomingQueue = ref\(\[\s*\{[^\}]+\},\s*\{[^\}]+\},\s*\{[^\}]+\},\s*\]\)",
    "const incomingQueue = ref([])",
    content
)

# Insert initializeQueue function and customer store import
import_customer_store = "import { useCustomerStore } from './customerStore'\nimport { fetchCustomerProfile } from '@/services/customerProfileApi'"

if "useCustomerStore" not in new_content:
    new_content = new_content.replace("import { ref, computed } from 'vue'", "import { ref, computed } from 'vue'\n" + import_customer_store)

init_queue_func = """
  async function initializeQueue() {
    if (incomingQueue.value.length > 0) return
    const customerStore = useCustomerStore()
    
    // Fallback if not loaded
    if (!customerStore.customers || customerStore.customers.length === 0) {
      await customerStore.fetchPortfolio()
    }
    
    // Pick first 3
    const seed = customerStore.customers.slice(0, 3)
    if (seed.length === 0) return // No customers available

    const channels = ['voice', 'whatsapp', 'facebook']
    const intents = ['Account Enquiry', 'Card Block', 'Complaint']
    const waitTimes = ['12s', '45s', '2m 10s']

    incomingQueue.value = seed.map((c, i) => {
      return {
        id: `I-992${i + 1}`,
        channel: channels[i % channels.length],
        customer: c.fullName, // Display real name
        customerId: c.customerId, 
        accountTier: c.marketSegment || 'Standard',
        waitTime: waitTimes[i % waitTimes.length],
        intent: intents[i % intents.length]
      }
    })
  }
"""

if "initializeQueue" not in new_content:
    new_content = new_content.replace("const activeCustomers = ref([])", "const activeCustomers = ref([])\n" + init_queue_func)

# Rewrite acceptInteraction to use the real profile
old_accept = """  async function acceptInteraction(interactionId) {
    const item = incomingQueue.value.find(i => i.id === interactionId)
    if (!item) return

    // Simulate API call to backend/Finesse
    // await api.post('/api/crm/interactions/accept', { id: interactionId })

    incomingQueue.value = incomingQueue.value.filter(i => i.id !== interactionId)
    activeCustomers.value.forEach(c => c.active = false)
    
    // FR-B-001: Bot context handoff for digital channels
    const botTranscript = ['whatsapp', 'facebook'].includes(item.channel)
      ? [
          { sender: 'bot', text: 'Hello! I am ABSA FAQ Bot. How can I help?' },
          { sender: 'user', text: `I have an issue with ${item.intent}` },
          { sender: 'bot', text: 'I understand. Let me transfer you to a human agent.' }
        ]
      : []

    activeCustomers.value.push({
      id: `CUST-${Math.floor(Math.random() * 1000)}`,
      name: item.customer,
      channel: item.channel,
      active: true,
      phone: item.channel === 'voice' ? item.customer : 'N/A',
      tier: item.accountTier,
      openTickets: Math.floor(Math.random() * 3),
      history: 'Screen-pop triggered from queue.',
      botTranscript
    })
  }"""

new_accept = """  async function acceptInteraction(interactionId) {
    const item = incomingQueue.value.find(i => i.id === interactionId)
    if (!item) return

    incomingQueue.value = incomingQueue.value.filter(i => i.id !== interactionId)
    activeCustomers.value.forEach(c => c.active = false)
    
    const botTranscript = ['whatsapp', 'facebook'].includes(item.channel)
      ? [
          { sender: 'bot', text: 'Hello! I am ABSA FAQ Bot. How can I help?' },
          { sender: 'user', text: `I have an issue with ${item.intent}` },
          { sender: 'bot', text: 'I understand. Let me transfer you to a human agent.' }
        ]
      : []

    // Fetch actual profile to get phone and other details
    let phone = 'N/A'
    try {
      if (item.customerId) {
        const profile = await fetchCustomerProfile(item.customerId)
        if (profile && profile.mobile_number) {
          phone = profile.mobile_number
        }
      }
    } catch(e) {
      console.warn('Failed to load profile for omnichannel:', e)
    }

    activeCustomers.value.push({
      id: item.customerId || `CUST-${Math.floor(Math.random() * 1000)}`,
      name: item.customer,
      channel: item.channel,
      active: true,
      phone: phone,
      tier: item.accountTier,
      openTickets: Math.floor(Math.random() * 3),
      history: 'Screen-pop triggered from queue.',
      botTranscript
    })
  }"""

new_content = new_content.replace(old_accept, new_accept)

# Expose initializeQueue
new_content = new_content.replace(
    "acceptInteraction,",
    "initializeQueue,\n    acceptInteraction,"
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("done modifying crmStore")
