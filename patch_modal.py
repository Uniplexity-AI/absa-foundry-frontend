import re

with open('src/components/intelligence/AiCampaignModal.vue', 'r', encoding='cp1252') as f:
    content = f.read()

# Replace hardcoded arrays with reactive refs and the fetch logic
target_js = """const selectedCampaign = ref(null)

const cohortDrivers = [
  { icon: 'signal_cellular_nodata', label: 'Digital Inactivity', contribution: 38, desc: '0 app/web logins in 45+ days  strongest predictor of 90-day churn' },
  { icon: 'account_balance_wallet', label: 'Balance Decline', contribution: 27, desc: 'AUM dropped >25% in the last 60 days across this cohort' },
  { icon: 'cancel_schedule_send', label: 'Direct Debit Failure', contribution: 19, desc: '1+ failed recurring payment detected in the last 30 days' },
]

const aiCampaigns = [
  {
    id: 'digital-reactivation', rank: 1,
    tag: 'RECOMMENDED', tagClass: 'bg-green-100 text-green-700',
    title: 'Digital Reactivation Campaign',
    channel: 'SMS + Push Notification', channelIcon: 'smartphone',
    description: 'Re-engage customers showing digital inactivity. Drive app login within 7 days via personalised incentive.',
    upliftScore: 64, successRate: '61%', aumProtected: 'K 18.5M', confidence: 87, duration: '14 days', cost: 'Low',
  },
  {
    id: 'relationship-retention', rank: 2,
    tag: 'HIGH VALUE', tagClass: 'bg-amber-100 text-amber-700',
    title: 'Relationship Retention  RM Outreach',
    channel: 'Phone Call (RM-initiated)', channelIcon: 'call',
    description: 'Assign a senior RM for a personalised check-in call. Offer a fee-waiver or rate review based on customer tenure.',
    upliftScore: 51, successRate: '74%', aumProtected: 'K 31.2M', confidence: 79, duration: '7 days', cost: 'Medium',
  },
  {
    id: 'balance-protection', rank: 3,
    tag: 'EXPERIMENTAL', tagClass: 'bg-gray-100 text-gray-600',
    title: 'Balance Protection Alert',
    channel: 'Email + In-App Banner', channelIcon: 'mark_email_unread',
    description: 'Proactively notify customers of their balance trend and offer a product switch to a higher-interest savings tier.',
    upliftScore: 43, successRate: '48%', aumProtected: 'K 12.8M', confidence: 63, duration: '21 days', cost: 'Low',
  },
]"""

replacement_js = """import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { watch } from 'vue'

const selectedCampaign = ref(null)
const cohortDrivers = ref([])
const aiCampaigns = ref([])
const loading = ref(true)

const api = axios.create({ baseURL: API_BASE_URL, timeout: 300000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

async function fetchCohortInsights() {
  if (!props.modelValue || props.customers.length === 0) return;
  
  loading.value = true;
  cohortDrivers.value = [];
  aiCampaigns.value = [];
  selectedCampaign.value = null;

  try {
    const payload = {
      customers: props.customers.map(c => ({
        customer_id: c.customerId || c.customer_id,
        churn_probability: c.churnProbability || c.churn_probability || 0,
        clv: c.clv || 0,
        segment: c.segmentCode || c.segment || 'MASS_MARKET'
      }))
    };
    
    // Call the new cohort-campaigns proxy route
    const { data } = await api.post('/api/v1/decisions/cohort-campaigns', payload);
    
    cohortDrivers.value = data.cohort_drivers || [];
    aiCampaigns.value = data.campaigns || [];
  } catch (error) {
    console.error("Failed to fetch AI Cohort Campaigns", error);
  } finally {
    loading.value = false;
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    fetchCohortInsights();
  }
});
"""

# Modify the template to show loading state
# Find `<div class="px-6 py-4 overflow-y-auto max-h-[70vh]">` and inject the loading check.
# We will use regex for this part since it's easier to match.

new_content = content.replace(target_js, replacement_js)

# Insert Loading UI
template_insert = """
      <!-- Scrollable Body -->
      <div class="px-6 py-4 overflow-y-auto max-h-[70vh]">
        <div v-if="loading" class="flex flex-col items-center justify-center py-12 text-gray-500">
          <span class="material-symbols-outlined animate-spin text-4xl mb-4 text-absa-energy">sync</span>
          <p class="font-bold">Generating AI Campaign Strategies...</p>
          <p class="text-xs">Analyzing {{ customers.length }} customer profiles. This may take up to a minute.</p>
        </div>
        
        <div v-else>
"""
new_content = new_content.replace('<!-- Scrollable Body -->\n      <div class="px-6 py-4 overflow-y-auto max-h-[70vh]">', template_insert)

# Close the v-else block before the footer
new_content = new_content.replace('<!-- Launch Panel Footer -->', '</div>\n      <!-- Launch Panel Footer -->')

with open('src/components/intelligence/AiCampaignModal.vue', 'w', encoding='cp1252') as f:
    f.write(new_content)

if content != new_content:
    print("Patched AiCampaignModal.vue")
else:
    print("FAILED TO MATCH JAVASCRIPT BLOCK")
