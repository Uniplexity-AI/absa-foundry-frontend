import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export function useExport() {
  const showExportPreview = ref(false)
  const exportData = ref({ columns: [], rows: [], title: '' })

  function openExportPreview({ columns, rows, title }) {
    exportData.value = { columns, rows, title: title || 'Export' }
    showExportPreview.value = true
  }

  function closeExportPreview() {
    showExportPreview.value = false
  }

  function handleExport(fn) {
    return (format) => {
      closeExportPreview()
      try {
        fn(format)
      } catch (err) {
        toast.error(`Export failed: ${err.message}`)
      }
    }
  }

  return {
    showExportPreview,
    exportData,
    openExportPreview,
    closeExportPreview,
    handleExport
  }
}
