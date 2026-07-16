import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { getEmailConfigurations, saveEmailConfiguration, testEmailConfiguration, deleteEmailConfiguration } from '@/api_services/crm_email_api.js'
import { useSettingsBase } from './useSettingsBase'

// ── Notification types with default labels/icons ───────────────
const NOTIFICATION_TYPES = [
  { key: 'invoice_reminder', label: 'Invoice Reminders', icon: 'fas fa-file-invoice' },
  { key: 'payment_receipt', label: 'Payment Receipts', icon: 'fas fa-receipt' },
  { key: 'stock_alert', label: 'Stock Alerts', icon: 'fas fa-boxes' },
  { key: 'password_reset', label: 'Password Reset', icon: 'fas fa-key' },
  { key: 'auth_notification', label: 'Login Alerts', icon: 'fas fa-shield-alt' },
  { key: 'update_notification', label: 'System Updates', icon: 'fas fa-sync-alt' },
  { key: 'general_reminder', label: 'General Reminders', icon: 'fas fa-bell' },
]

// ── Default frequency map (all real-time, all enabled) ─────────
function defaultFrequencies() {
  const freq = {}
  const enabled = {}
  NOTIFICATION_TYPES.forEach(nt => {
    freq[nt.key] = 'realtime'
    enabled[nt.key] = true
  })
  return { notif_frequencies: freq, notif_enabled: enabled }
}

export function useSettingsEmail() {
  const { getTenantId, API_BASE_URL, openSettingsConfirm } = useSettingsBase()

  const emailConfigurations = ref([])
  const showEmailConfigForm = ref(false)
  const editingEmailConfig = ref(null)
  const savingEmailConfig = ref(false)
  const showEmailPassword = ref(false)
  const showTestEmailPrompt = ref(false)
  const testEmailRecipient = ref('')
  const pendingTestEmailConfigId = ref(null)
  const testEmailSending = ref(false)

  const isValidTestEmailRecipient = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmailRecipient.value.trim())
  )

  const emailConfigForm = ref({
    name: '', smtp_host: '', smtp_port: 587, smtp_username: '', smtp_password: '',
    from_name: '', from_email: '', use_tls: true, use_ssl: false, is_active: true, tenant_id: '',
    ...defaultFrequencies(),
  })

  function openNewEmailConfig() {
    editingEmailConfig.value = null
    showEmailConfigForm.value = true
    emailConfigForm.value = {
      name: '', smtp_host: '', smtp_port: 587, smtp_username: '', smtp_password: '',
      from_name: '', from_email: '', use_tls: true, use_ssl: false, is_active: true, tenant_id: getTenantId(),
      ...defaultFrequencies(),
    }
  }

  function cancelEmailConfig() {
    showEmailConfigForm.value = false
    editingEmailConfig.value = null
    showEmailPassword.value = false
  }

  async function saveEmailConfig() {
    if (!emailConfigForm.value.name || !emailConfigForm.value.smtp_host ||
        !emailConfigForm.value.smtp_username || !emailConfigForm.value.smtp_password ||
        !emailConfigForm.value.from_email) {
      return toast.warning('Please fill in all required fields')
    }
    savingEmailConfig.value = true
    try {
      if (!emailConfigForm.value.tenant_id) emailConfigForm.value.tenant_id = getTenantId()

      // Build payload mapped to backend EmailConfigurationCreate / EmailConfigurationUpdate schema
      const payload = {
        template_name: emailConfigForm.value.name,
        template_type: 'smtp_config',
        sender_email: emailConfigForm.value.from_email,
        sender_name: emailConfigForm.value.from_name,
        subject: 'Message from {{business_name}}',
        html_template: '<p>Hello {{user_name}},</p><p>{{message_body}}</p>',
        text_template: 'Hello {{user_name}},\n\n{{message_body}}',
        smtp_host: emailConfigForm.value.smtp_host,
        smtp_port: Number(emailConfigForm.value.smtp_port) || 587,
        smtp_use_tls: emailConfigForm.value.use_tls === true,
        smtp_username: emailConfigForm.value.smtp_username,
        smtp_password: emailConfigForm.value.smtp_password,
        available_variables: ['user_name', 'user_email', 'business_name', 'message_body'],
        is_active: emailConfigForm.value.is_active === true,
        tenant_id: emailConfigForm.value.tenant_id,
        // Notification frequency config stored as metadata
        notif_frequencies: emailConfigForm.value.notif_frequencies,
        notif_enabled: emailConfigForm.value.notif_enabled,
      }

      // If editing, attach the ID so the API uses PUT instead of POST
      const existingId = editingEmailConfig.value?._id || editingEmailConfig.value?.id
      if (existingId) {
        payload.id = existingId
      }

      await saveEmailConfiguration(payload)
      toast.success(existingId ? 'Email configuration updated!' : 'Email configuration created!')
      showEmailConfigForm.value = false
      editingEmailConfig.value = null
      showEmailPassword.value = false
      // Force a fresh load from the backend
      await loadEmailConfigurations()
    } catch (error) {
      console.error('Error saving email configuration:', error)
      toast.error(`Failed to save: ${error.message}`)
    } finally {
      savingEmailConfig.value = false
    }
  }

  function editEmailConfig(config) {
    editingEmailConfig.value = config
    const savedFreq = config.notif_frequencies || {}
    const savedEnabled = config.notif_enabled || {}
    showEmailConfigForm.value = true
    emailConfigForm.value = {
      name: config.template_name || config.name || '',
      smtp_host: config.smtp_host || '',
      smtp_port: config.smtp_port || 587,
      smtp_username: config.smtp_username || '',
      smtp_password: config.smtp_password || '',
      from_name: config.sender_name || config.from_name || '',
      from_email: config.sender_email || config.from_email || '',
      use_tls: config.smtp_use_tls !== undefined ? config.smtp_use_tls : true,
      use_ssl: config.smtp_port === 465,
      is_active: config.is_active !== undefined ? config.is_active : true,
      tenant_id: config.tenant_id || getTenantId(),
      notif_frequencies: { ...defaultFrequencies().notif_frequencies, ...savedFreq },
      notif_enabled: { ...defaultFrequencies().notif_enabled, ...savedEnabled },
    }
  }

  async function deleteEmailConfig(id) {
    if (!window.confirm('Are you sure you want to delete this email configuration?')) return
    try {
      await deleteEmailConfiguration(id)
      toast.success('Email configuration deleted successfully!')
      await loadEmailConfigurations()
    } catch (error) {
      console.error('Error deleting email configuration:', error)
      toast.error(`Failed to delete configuration: ${error.message}`)
    }
  }

  async function testEmailConfig() {
    if (!emailConfigForm.value.smtp_host || !emailConfigForm.value.smtp_username || !emailConfigForm.value.smtp_password) {
      return toast.warning('Please fill in SMTP host, username, and password to test')
    }
    const configId = editingEmailConfig.value?._id
    if (!configId) return toast.warning('Please save the configuration first before testing')
    pendingTestEmailConfigId.value = configId
    testEmailRecipient.value = ''
    showTestEmailPrompt.value = true
  }

  function closeTestEmailPrompt() {
    showTestEmailPrompt.value = false
    testEmailRecipient.value = ''
    pendingTestEmailConfigId.value = null
    testEmailSending.value = false
  }

  function testSavedEmailConfig(config) {
    const configId = config.id || config._id
    if (!configId) return toast.warning('Configuration ID not found')
    // Pre-fill a default test recipient from the sender email
    testEmailRecipient.value = config.from_email || config.sender_email || ''
    pendingTestEmailConfigId.value = configId
    showTestEmailPrompt.value = true
  }

  async function confirmTestEmailPrompt() {
    const recipient = testEmailRecipient.value.trim()
    if (!recipient) return toast.warning('Enter the email address that should receive the test message.')
    if (!isValidTestEmailRecipient.value) return toast.warning('Enter a valid email address, like name@example.com.')
    if (!pendingTestEmailConfigId.value) return toast.warning('Please save the configuration first before testing')
    testEmailSending.value = true
    try {
      const result = await testEmailConfiguration(pendingTestEmailConfigId.value, recipient)
      if (result.success) {
        toast.success(`Test email sent to ${recipient}. Check that inbox.`)
        closeTestEmailPrompt()
      } else {
        toast.error(`Failed to send test email: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error testing email configuration:', error)
      toast.error(`Failed to test configuration: ${error.message}`)
    } finally { testEmailSending.value = false }
  }

  async function loadEmailConfigurations() {
    try {
      const result = await getEmailConfigurations(getTenantId())
      const rawList = Array.isArray(result) ? result : (result.data || [])
      // Normalise backend field names → frontend template field names
      emailConfigurations.value = rawList.map(c => ({
        ...c,
        name: c.template_name || c.name || '',
        from_name: c.sender_name || c.from_name || '',
        from_email: c.sender_email || c.from_email || '',
      }))
    } catch (error) {
      console.error('Error loading email configurations:', error)
      emailConfigurations.value = []
    }
  }

  function toggleNotifType(key) {
    const current = emailConfigForm.value.notif_enabled
    emailConfigForm.value = {
      ...emailConfigForm.value,
      notif_enabled: { ...current, [key]: current[key] === false },
    }
  }

  return {
    emailConfigurations, showEmailConfigForm, editingEmailConfig,
    savingEmailConfig, showEmailPassword, emailConfigForm,
    showTestEmailPrompt, testEmailRecipient, pendingTestEmailConfigId,
    testEmailSending, isValidTestEmailRecipient,
    openNewEmailConfig, cancelEmailConfig, saveEmailConfig,
    editEmailConfig, deleteEmailConfig, testEmailConfig,
    testSavedEmailConfig,
    closeTestEmailPrompt, confirmTestEmailPrompt, loadEmailConfigurations,
    toggleNotifType,
  }
}

export { NOTIFICATION_TYPES }
