import { defineStore } from 'pinia'
import { ref } from 'vue'
import API_BASE_URL from '@/api_services/api'

export const usePricingStore = defineStore('pricing', () => {
  const config = ref(null)
  const loading = ref(false)

  async function fetchConfig() {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/pricing/config`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) config.value = await res.json()
    } catch (e) {
      console.warn('Failed to fetch pricing config:', e)
    } finally {
      loading.value = false
    }
  }

  return { config, loading, fetchConfig }
})
