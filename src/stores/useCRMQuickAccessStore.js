import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCRMQuickAccessStore = defineStore('crmQuickAccess', () => {
  const activeModule = ref(null)
  const quickAccessData = ref([])

  function recordQuickAccessClick(moduleId) {
    console.log('Quick access click:', moduleId)
  }

  function setActiveQuickAccessModule(moduleId) {
    activeModule.value = moduleId
  }

  function loadQuickAccessData() {
    // Placeholder - loads from API when available
    quickAccessData.value = []
  }

  return {
    activeModule,
    quickAccessData,
    recordQuickAccessClick,
    setActiveQuickAccessModule,
    loadQuickAccessData
  }
})
