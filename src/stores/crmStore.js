import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCustomerStore } from './customerStore'
import { fetchCustomerProfile } from '@/services/customerProfileApi'

export const useCrmStore = defineStore('crm', () => {
  // Phase 4: Mock Backend Integration Prep

  const incomingQueue = ref([])

  const activeCustomers = ref([])

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


  // FR-D-005, FR-O-004: Business Hours Enforcement
  const isAfterHours = computed(() => {
    const hour = new Date().getHours()
    return hour >= 17 || hour < 8 // After 5 PM or before 8 AM
  })

  async function acceptInteraction(interactionId) {
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
  }

  // FR-S-001: SMS Gateway Integration
  async function dispatchSms(phone, message, templateId = null) {
    console.log(`[SMS Gateway] Sending to ${phone}: ${message}`)
    // Mock API Call to SMS Gateway
    // await api.post('/api/crm/sms/send', { phone, message, templateId })
    return { success: true, timestamp: new Date().toISOString() }
  }

  // FR-T-001: Case Creation
  async function createTicket(payload) {
    console.log('[Ticketing] Creating Case:', payload)
    // await api.post('/api/crm/tickets', payload)
    return { ticketId: `CASE-${Math.floor(Math.random() * 10000)}` }
  }

  return {
    incomingQueue,
    activeCustomers,
    isAfterHours,
    initializeQueue,
    acceptInteraction,
    dispatchSms,
    createTicket
  }
})

// cache bust
