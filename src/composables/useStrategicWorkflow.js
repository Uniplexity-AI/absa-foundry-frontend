
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/api_services/api'
export const workflowResult = ref(null)
export const workflowLoading = ref(false)
export const workflowError = ref(null)

// Restore workflowResult from localStorage on app load
const persisted = localStorage.getItem('workflowResult')
if (persisted) {
  try {
    workflowResult.value = JSON.parse(persisted)
  } catch (e) {
    workflowResult.value = null
  }
}

/**
 * Fetch the latest saved overview from the database.
 * This is called on page load so the dashboard shows data
 * even if localStorage is empty (new browser, cleared cache, etc.).
 */
export async function fetchSavedOverview(tenantId) {
  if (!tenantId) return null
  try {
    const response = await axios.get(`${API_BASE_URL}/strategic/strategic/get-overview`, {
      params: { tenant_id: tenantId }
    })
    const data = response.data
    // Only use if it has real data (not a "no_data" response)
    if (data && data.status !== 'no_data' && data.status !== 'error') {
      workflowResult.value = data
      localStorage.setItem('workflowResult', JSON.stringify(data))
      return data
    }
    return null
  } catch (err) {
    console.warn('[useStrategicWorkflow] Could not fetch saved overview:', err.message)
    return null
  }
}

export async function runStrategicWorkflow(tenantId, uploadedData = null) {
  workflowLoading.value = true
  workflowError.value = null
  try {
    const response = await axios.post(`${API_BASE_URL}/strategic/strategic/run-workflow`, {
      tenant_id: tenantId,
      uploaded_data: uploadedData
    })
    workflowResult.value = response.data
    // Persist result in localStorage
    localStorage.setItem('workflowResult', JSON.stringify(response.data))
  } catch (err) {
    workflowError.value = err
  } finally {
    workflowLoading.value = false
  }
}
