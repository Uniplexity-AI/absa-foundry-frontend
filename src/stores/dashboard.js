import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE_URL from '@/services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const modules = ref([])
  const loading = ref(false)

  async function fetchModules() {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        modules.value = Array.isArray(data.modules) ? data.modules : (data.subscribed_modules || [])
      }
    } catch (e) {
      console.warn('Failed to fetch modules:', e)
    } finally {
      loading.value = false
    }
  }

  return { modules, loading, fetchModules }
})
