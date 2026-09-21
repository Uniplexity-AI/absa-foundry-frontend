import re

with open('src/components/intelligence/AiCampaignModal.vue', 'r', encoding='cp1252') as f:
    content = f.read()

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

# Regex substitute from `const selectedCampaign = ref(null)` to just before `function close()`
new_content = re.sub(
    r'const selectedCampaign = ref\(null\).*?(?=function close\(\))',
    replacement_js,
    content,
    flags=re.DOTALL
)

with open('src/components/intelligence/AiCampaignModal.vue', 'w', encoding='cp1252') as f:
    f.write(new_content)

print("Regex patched AiCampaignModal.vue")
