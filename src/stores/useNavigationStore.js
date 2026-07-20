import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const currentModule = ref(null)
  const breadcrumbs = ref([])

  function setCurrentModule(module) {
    currentModule.value = module
  }

  function setBreadcrumbs(crumbs) {
    breadcrumbs.value = crumbs
  }

  return {
    currentModule,
    breadcrumbs,
    setCurrentModule,
    setBreadcrumbs
  }
})
