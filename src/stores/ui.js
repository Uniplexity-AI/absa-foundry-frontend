import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  function showSuccessToast(message) {
    console.log('[Toast] Success:', message)
  }

  function showErrorToast(message) {
    console.log('[Toast] Error:', message)
  }

  function showInfoToast(message) {
    console.log('[Toast] Info:', message)
  }

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast
  }
})
