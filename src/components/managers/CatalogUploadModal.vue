<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 class="text-lg font-bold text-gray-800 font-headline">{{ editItem ? 'Edit' : 'Upload' }} {{ type === 'campaign' ? 'Campaign' : 'Product' }} Catalog</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto">
        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-6">
          <button @click="uploadMode = 'form'" :class="['pb-3 px-4 text-sm font-semibold border-b-2 transition-colors', uploadMode === 'form' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-700']">Manual Entry</button>
          <button @click="uploadMode = 'file'" :class="['pb-3 px-4 text-sm font-semibold border-b-2 transition-colors', uploadMode === 'file' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-700']">Upload Document</button>
        </div>

        <!-- Form Mode -->
        <div v-if="uploadMode === 'form'" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Title</label>
            <input v-model="formData.title" type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm" placeholder="e.g., Q4 Wealth Savings Booster">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Target Segment</label>
            <select v-model="formData.target_segment" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm">
              <option value="MASS_MARKET">Mass Market</option>
              <option value="WEALTH">Wealth</option>
              <option value="YOUTH">Youth / Student</option>
              <option value="SME">SME</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Channel (Optional)</label>
            <input v-model="formData.channel" type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm" placeholder="e.g., SMS, Email, Branch">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
            <input v-model="formData.expires" type="date" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea v-model="formData.description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm" placeholder="Provide detailed conditions, incentives, and requirements..."></textarea>
          </div>
        </div>

        <!-- File Mode -->
        <div v-else class="space-y-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors"
               @dragover.prevent="isDragging = true"
               @dragleave.prevent="isDragging = false"
               @drop.prevent="handleDrop"
               :class="{'bg-absa-serene border-absa-passion': isDragging}">
            
            <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" accept=".csv,.pdf,.docx,.txt">
            
            <span class="material-symbols-outlined text-4xl text-gray-400 mb-3">cloud_upload</span>
            <p class="text-sm text-gray-700 font-semibold mb-1">Drag and drop your file here</p>
            <p class="text-xs text-gray-500 mb-4">Supports PDF, DOCX, CSV, TXT (Max 10MB)</p>
            
            <button @click="$refs.fileInput.click()" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
              Browse Files
            </button>
          </div>
          
          <!-- Selected File Preview -->
          <div v-if="selectedFile" class="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-absa-passion">description</span>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ selectedFile.name }}</p>
                <p class="text-xs text-gray-500">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
              </div>
            </div>
            <button @click="selectedFile = null" class="text-gray-400 hover:text-red-500">
              <span class="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
          
          <div class="bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start gap-2 mt-4">
            <span class="material-symbols-outlined text-blue-500 text-[18px] mt-0.5">info</span>
            <p class="text-xs text-blue-800 leading-relaxed">
              <strong>AI Document Processing:</strong> When uploading unstructured documents (like PDF or Word brochures), the Absa AI engine will automatically read and extract the relevant {{ type }} metadata into the vector database.
            </p>
          </div>
        </div>
        
        <!-- Error / Success Messages -->
        <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">error</span> {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="mt-4 p-3 bg-green-50 text-green-700 text-xs rounded border border-green-200 flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">check_circle</span> {{ successMsg }}
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
        <button @click="close" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors" :disabled="isSubmitting">Cancel</button>
        <button @click="submit" class="px-6 py-2 bg-absa-passion text-white text-sm font-bold rounded hover:bg-absa-power transition-colors flex items-center gap-2" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
          {{ isSubmitting ? 'Processing...' : (editItem ? 'Save Changes' : 'Upload & Process') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

const api = axios.create({ baseURL: API_BASE_URL })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'campaign' // 'campaign' or 'product'
  },
  editItem: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'uploaded'])

const uploadMode = ref('form')
const isDragging = ref(false)
const selectedFile = ref(null)
const isSubmitting = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const formData = reactive({
  title: '',
  target_segment: 'MASS_MARKET',
  channel: '',
  description: ''
})

watch(() => props.editItem, (newVal) => {
  if (newVal) {
    uploadMode.value = 'form'
    formData.title = newVal.name || newVal.title || ''
    formData.description = newVal.description || ''
    formData.channel = newVal.channel || ''
    formData.expires = newVal.expires || ''
    formData.target_segment = newVal.segment || newVal.target_segment || 'MASS_MARKET'
  } else {
    formData.title = ''
    formData.description = ''
    formData.channel = ''
    formData.expires = ''
    formData.target_segment = 'MASS_MARKET'
  }
}, { immediate: true })

const close = () => {
  errorMsg.value = ''
  successMsg.value = ''
  selectedFile.value = null
  emit('close')
}

const handleFileSelect = (e) => {
  if (e.target.files.length > 0) {
    selectedFile.value = e.target.files[0]
    errorMsg.value = ''
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer.files.length > 0) {
    selectedFile.value = e.dataTransfer.files[0]
    errorMsg.value = ''
  }
}

const submit = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  
  if (uploadMode.value === 'form' && (!formData.title || !formData.description)) {
    errorMsg.value = 'Please provide at least a title and description.'
    return
  }
  if (uploadMode.value === 'file' && !selectedFile.value) {
    errorMsg.value = 'Please select a file to upload.'
    return
  }

  isSubmitting.value = true
  try {
    const endpoint = props.type === 'campaign' ? '/api/v1/decisions/catalog/campaigns' : '/api/v1/decisions/catalog/products'
    
    if (uploadMode.value === 'form') {
      if (props.editItem) {
        await api.put(`${endpoint}/${props.editItem.id}`, formData)
        successMsg.value = `Successfully updated ${props.type}.`
      } else {
        await api.post(endpoint, formData)
        successMsg.value = `Successfully added new ${props.type}.`
      }
    } else {
      const fd = new FormData()
      fd.append('file', selectedFile.value)
      const res = await api.post(`${endpoint}/upload`, fd)
      successMsg.value = `Successfully processed file and extracted ${res.data.extracted_count || 1} ${props.type}(s).`
    }
    
    // Clear form after 1.5s and close
    setTimeout(() => {
      formData.title = ''
      formData.description = ''
      formData.channel = ''
      selectedFile.value = null
      close()
      emit('uploaded')
    }, 1500)
    
  } catch (err) {
    console.error(err)
    errorMsg.value = err.response?.data?.detail || 'An error occurred during upload. Check backend connection.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
