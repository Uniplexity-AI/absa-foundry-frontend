import { ref } from 'vue'
import axios from 'axios'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsIntegrations() {
  const { API_BASE_URL, getTenantId, telegramLoading } = useSettingsBase()

  const telegramConfig = ref({ bot_token: '', bot_name: '', enabled: false, is_running: false })
  const telegramSuccess = ref(false)
  const telegramError = ref('')
  const telegramConversations = ref([])
  const telegramConversationsLoading = ref(false)
  const showTokenField = ref(false)

  async function loadTelegramConfig() {
    try {
      const res = await axios.get(`${API_BASE_URL}/telegram-bot/config`)
      if (res.data) {
        telegramConfig.value = {
          bot_token: res.data.bot_token || '', bot_name: res.data.bot_name || '',
          enabled: res.data.enabled || false, is_running: res.data.is_running || false
        }
      }
    } catch (err) { console.error('Failed to load Telegram config:', err) }
  }

  async function saveTelegramConfig() {
    telegramLoading.value = true
    telegramSuccess.value = false
    telegramError.value = ''
    try {
      const res = await axios.post(`${API_BASE_URL}/telegram-bot/config`, {
        bot_token: telegramConfig.value.bot_token, bot_name: telegramConfig.value.bot_name,
        enabled: telegramConfig.value.enabled
      })
      telegramConfig.value.is_running = res.data.is_running
      telegramSuccess.value = true
      showTokenField.value = false
      setTimeout(() => { telegramSuccess.value = false }, 3000)
    } catch (err) {
      telegramError.value = err.response?.data?.detail || 'Failed to save Telegram bot configuration'
      setTimeout(() => { telegramError.value = '' }, 5000)
      console.error('Error saving Telegram config:', err)
    } finally { telegramLoading.value = false }
  }

  async function disableTelegramBot() {
    telegramLoading.value = true
    try {
      await axios.post(`${API_BASE_URL}/telegram-bot/disable`)
      telegramConfig.value.enabled = false
      telegramConfig.value.is_running = false
    } catch (err) { console.error('Error disabling Telegram bot:', err) }
    finally { telegramLoading.value = false }
  }

  async function loadTelegramConversations() {
    telegramConversationsLoading.value = true
    try {
      const res = await axios.get(`${API_BASE_URL}/telegram-bot/conversations`)
      telegramConversations.value = res.data.conversations || []
    } catch (err) { console.error('Failed to load Telegram conversations:', err) }
    finally { telegramConversationsLoading.value = false }
  }

  return {
    telegramConfig, telegramSuccess, telegramError,
    telegramConversations, telegramConversationsLoading, showTokenField,
    loadTelegramConfig, saveTelegramConfig, disableTelegramBot, loadTelegramConversations
  }
}
