import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCrmStore = defineStore('crm', () => {
  // Phase 4: Mock Backend Integration Prep

  const incomingQueue = ref([
    { id: 'I-9921', channel: 'voice', customer: '0977 123 456', accountTier: 'Gold / High Value', waitTime: '12s', intent: 'Account Enquiry' },
    { id: 'I-9922', channel: 'whatsapp', customer: '+260 96 111222', accountTier: 'Standard', waitTime: '45s', intent: 'Card Block' },
    { id: 'I-9923', channel: 'facebook', customer: 'John Banda', accountTier: 'Unknown', waitTime: '2m 10s', intent: 'Complaint' },
  ])

  const activeCustomers = ref([])

  // FR-D-005, FR-O-004: Business Hours Enforcement
  const isAfterHours = computed(() => {
    const hour = new Date().getHours()
    return hour >= 17 || hour < 8 // After 5 PM or before 8 AM
  })

  async function acceptInteraction(interactionId) {
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
    acceptInteraction,
    dispatchSms,
    createTicket
  }
})

// cache bust
