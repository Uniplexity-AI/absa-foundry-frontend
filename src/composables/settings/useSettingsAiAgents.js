import { ref } from 'vue'
import axios from 'axios'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsAiAgents() {
  const { API_BASE_URL, getTenantId } = useSettingsBase()

  const aiAgents = ref([
    {
      id: 'temwani', displayName: 'Temwani AI Agent (Reports)',
      settings: { schedule: '0 20 * * *', delivery_method: 'email' }, success: false, error: ''
    },
    {
      id: 'mwila', displayName: 'Mwila AI Agent (Notifications)',
      settings: { schedule: '0 8 * * 1', delivery_method: 'sms' }, success: false, error: ''
    },
    {
      id: 'mulenga', displayName: 'Mulenga CT (Custom Tasks)',
      settings: { schedule: '30 9 * * 5', delivery_method: 'both' }, success: false, error: ''
    }
  ])

  async function saveAgentSettings(agent) {
    agent.success = false
    agent.error = ''
    try {
      const response = await axios.post(`${API_BASE_URL}/ai-agents/set-settings`, {
        tenant_id: getTenantId(), agent_id: agent.id,
        schedule: agent.settings.schedule, delivery_method: agent.settings.delivery_method
      })
      agent.success = true
      setTimeout(() => { agent.success = false }, 2000)
    } catch (error) {
      agent.error = 'Error saving settings'
      setTimeout(() => { agent.error = '' }, 3000)
      console.error('Error:', error)
    }
  }

  return { aiAgents, saveAgentSettings }
}
