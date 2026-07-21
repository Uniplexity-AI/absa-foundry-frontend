<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    
    <!-- Mesh Background -->
    <!-- Mesh Background (Fixed to viewport to prevent cutoff on scroll) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
              <div class="flex items-center gap-2">
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // RAG</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Knowledge Base</h1>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <!-- Notifications -->
      <div v-if="message" class="mb-6 p-4 border border-green-200 bg-green-50 text-green-800 rounded-sm text-xs font-bold uppercase flex items-center gap-2 shadow-sm animate-fade-in">
         <i class="fas fa-check-circle"></i> {{ message }}
      </div>
      <div v-if="error" class="mb-6 p-4 border border-red-200 bg-red-50 text-red-800 rounded-sm text-xs font-bold uppercase flex items-center gap-2 shadow-sm animate-fade-in">
         <i class="fas fa-exclamation-circle"></i> {{ error }}
      </div>

      <!-- Database Selector & Config -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <!-- Database Selection -->
         <div class="lg:col-span-1 space-y-6">
            <div class="bg-white border border-gray-200 shadow-sm rounded-sm p-6 relative">
               <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <i class="fas fa-database text-[#2F2E8B]"></i> Active Database
               </h3>
               <div class="relative">
                 <select 
                   v-model="selectedDatabase"
                   class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono font-bold text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] bg-gray-50 uppercase appearance-none"
                 >
                   <option 
                     v-for="option in databaseOptions" 
                     :key="option.value" 
                     :value="option.value"
                   >
                     {{ option.label }}
                   </option>
                 </select>
                 <i class="fas fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none"></i>
               </div>
            </div>

            <!-- Prompt Config -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-sm p-6 relative h-fit">
               <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <i class="fas fa-robot text-[#2F2E8B]"></i> Agent Persona
               </h3>
               
               <div class="space-y-4">
                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Base Template</label>
                    <select v-model="selectedTemplate" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                      <option v-for="template in promptTemplates" :key="template.id" :value="template.id">{{ template.label }}</option>
                    </select>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Tone</label>
                        <select v-model="selectedTone" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                          <option v-for="tone in toneOptions" :key="tone.value" :value="tone.value">{{ tone.label }}</option>
                        </select>
                     </div>
                     <div>
                        <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Behavior</label>
                        <select v-model="selectedBehavior" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                          <option v-for="behavior in behaviorOptions" :key="behavior.value" :value="behavior.value">{{ behavior.label }}</option>
                        </select>
                     </div>
                  </div>

                  <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Instructions</label>
                    <textarea v-model="customInstructions" rows="3" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-medium text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Additional system prompts..."></textarea>
                  </div>

                  <button 
                    @click="updatePromptTemplate"
                    class="w-full bg-[#2F2E8B] hover:bg-[#1D226B] text-white py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center justify-center gap-2"
                    :disabled="isLoading.template"
                  >
                    <i class="fas" :class="isLoading.template ? 'fa-spinner animate-spin' : 'fa-save'"></i>
                    {{ isLoading.template ? 'Updating...' : 'Update Config' }}
                  </button>
               </div>
            </div>
         </div>

         <!-- Upload Zone -->
         <div class="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-sm p-6">
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
               <i class="fas fa-cloud-upload-alt text-[#2F2E8B]"></i> Ingestion Pipeline
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <!-- File Upload -->
               <div class="p-4 bg-gray-50 border border-gray-100 rounded-sm">
                  <h4 class="text-[10px] font-black text-gray-400 uppercase mb-3"><i class="fas fa-file-pdf"></i> PDF / DOCX</h4>
                  <form @submit.prevent="uploadFile('file')" class="space-y-3">
                     <div class="relative group cursor-pointer">
                        <input 
                           type="file" 
                           ref="fileInput" 
                           accept=".pdf,.docx,.txt" 
                           class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-[#2F2E8B] file:text-white hover:file:bg-[#1D226B] cursor-pointer"
                        />
                     </div>
                     <button 
                       type="submit" 
                       class="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-sm text-[10px] font-bold uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                       :disabled="isLoading.file"
                     >
                       <i class="fas" :class="isLoading.file ? 'fa-spinner animate-spin' : 'fa-arrow-up'"></i>
                       Upload Document
                     </button>
                  </form>
               </div>

               <!-- Image Upload -->
               <div class="p-4 bg-gray-50 border border-gray-100 rounded-sm">
                  <h4 class="text-[10px] font-black text-gray-400 uppercase mb-3"><i class="fas fa-image"></i> OCR Image</h4>
                  <form @submit.prevent="uploadFile('image')" class="space-y-3">
                     <div class="relative group cursor-pointer">
                        <input 
                           type="file" 
                           ref="imageInput" 
                           accept="image/*" 
                           class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-[#2F2E8B] file:text-white hover:file:bg-[#1D226B] cursor-pointer"
                        />
                     </div>
                     <button 
                       type="submit" 
                       class="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-sm text-[10px] font-bold uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                       :disabled="isLoading.image"
                     >
                       <i class="fas" :class="isLoading.image ? 'fa-spinner animate-spin' : 'fa-camera'"></i>
                       Process Image
                     </button>
                  </form>
               </div>
               
               <!-- Text Upload -->
               <div class="md:col-span-2 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                  <h4 class="text-[10px] font-black text-gray-400 uppercase mb-3"><i class="fas fa-keyboard"></i> Raw Text Input</h4>
                  <form @submit.prevent="uploadText" class="space-y-3">
                     <div class="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                        <span>COLLECTION ID: {{ generateCollectionId() }}</span>
                     </div>
                     <textarea v-model="plainText" rows="3" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Paste content here..."></textarea>
                     <button 
                       type="submit" 
                       class="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-sm text-[10px] font-bold uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                       :disabled="isLoading.text || !plainText.trim()"
                     >
                       <i class="fas" :class="isLoading.text ? 'fa-spinner animate-spin' : 'fa-plus'"></i>
                       Ingest Text
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>

      <!-- Upload History -->
      <div class="bg-white border border-gray-200 shadow-sm rounded-sm">
         <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
               <i class="fas fa-history text-[#2F2E8B]"></i> Ingestion History
            </h3>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">{{ history.length }} ITEMS</span>
         </div>
         
         <div v-if="isLoading.history" class="p-12 flex justify-center">
            <div class="w-8 h-8 border-2 border-[#2F2E8B] border-t-transparent rounded-full animate-spin"></div>
         </div>

         <div v-else-if="!history || history.length === 0" class="p-12 text-center">
            <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
               <i class="fas fa-folder-open"></i>
            </div>
            <p class="text-xs font-bold text-gray-500 uppercase">No documents found</p>
            <p class="text-[10px] text-gray-400 font-mono mt-1">Select a database or upload new files.</p>
         </div>

         <div v-else class="overflow-x-auto">
            <table class="w-full">
               <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                     <th class="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">File Name</th>
                     <th class="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                     <th class="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-gray-100">
                  <tr v-for="item in history" :key="item._id || item.id" class="hover:bg-gray-50/50 transition-colors">
                     <td class="px-6 py-4 text-xs font-medium text-gray-900">
                        <div class="flex items-center gap-3">
                           <i class="fas fa-file-alt text-gray-300"></i>
                           <span class="truncate max-w-xs">{{ item.name }}</span>
                        </div>
                     </td>
                     <td class="px-6 py-4 text-xs font-mono text-gray-500 uppercase">{{ item.type || 'Document' }}</td>
                     <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                           <button 
                             @click="viewItem(item)"
                             class="p-1.5 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                             title="View"
                           >
                             <i class="fas fa-eye text-xs"></i>
                           </button>
                           <button 
                             @click="deleteItem(item)"
                             :disabled="isLoading.delete"
                             class="p-1.5 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                             title="Delete"
                           >
                             <i class="fas" :class="isLoading.delete ? 'fa-spinner animate-spin' : 'fa-trash-alt text-xs'"></i>
                           </button>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

    </main>
  </div>
</template>

<script setup>

import { ref, watch, onMounted } from 'vue'
import API_BASE_URL, { authFetch } from '@/api_services/api';

// Add loading states
const isLoading = ref({
  file: false,
  image: false,
  text: false,
  template: false,
  delete: false,
  history: false
})

// Database options with default
const databaseOptions = [
  { value: 'landing-page-kb', label: 'Landing Page Knowledge Base' },
  { value: 'mwilalawyer', label: 'Lexi Lawyer Documents' },
  { value: 'chipocourts', label: 'Chipo Courts Data' },
  { value: 'kondwani-mining', label: 'Kondwani Mining Resources' }
]

// General database selector with default value
const selectedDatabase = ref('mwilalawyer')

// Other refs
const message = ref('')
const error = ref('')
const fileInput = ref(null)
const imageInput = ref(null)
const collectionNameText = ref('')
const plainText = ref('')
const history = ref([])
const selectedTemplate = ref('')
const selectedTone = ref('professional')
const selectedBehavior = ref('expert')
const customInstructions = ref('')
const promptTemplates = [
  { id: 'legal', label: 'Legal Assistant', template: 'You are a legal assistant. Answer questions based on the provided context:' },
  { id: 'court', label: 'Court Proceedings', template: 'You are a court proceedings expert. Analyze the following context:' },
  { id: 'mining', label: 'Mining Regulations', template: 'You are a mining regulations expert. Review the following context:' },
  { id: 'landing', label: 'Landing Page Sales Agent', template: 'You are the official AI assistant for the UB App landing page. Your goal is to convert visitors into users by explaining features and benefits clearly. Answer based on the provided context:' }
]

// Initialize selectedTemplate with first template
selectedTemplate.value = promptTemplates[0].id

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'academic', label: 'Academic' },
  { value: 'technical', label: 'Technical' },
  { value: 'enthusiastic', label: 'Enthusiastic' }
]
const behaviorOptions = [
  { value: 'expert', label: 'Expert Advisor' },
  { value: 'assistant', label: 'Helpful Assistant' },
  { value: 'educator', label: 'Educational Guide' },
  { value: 'analyst', label: 'Analytical Reviewer' },
  { value: 'sales', label: 'Sales Representative' }
]

// Watch for database changes
watch(selectedDatabase, () => {
  fetchHistory()
  selectedTemplate.value = promptTemplates[0].id
})

// Fetch history specific to selected database
const fetchHistory = async () => {
  isLoading.value.history = true
  error.value = ''
  
  try {
    const res = await authFetch(`${API_BASE_URL}/rag/history?db_name=${selectedDatabase.value}`)
    const data = await res.json()
    
    if (res.ok) {
      // Ensure history data is properly formatted
      history.value = Array.isArray(data.items) ? data.items : []
      console.log('Fetched history:', history.value) // Debug log
    } else {
      throw new Error(data.error || 'Failed to fetch history')
    }
  } catch (e) {
    console.error('History fetch error:', e)
    error.value = 'Failed to fetch history'
    history.value = [] // Reset history on error
  } finally {
    isLoading.value.history = false
  }
}

// Add this after your ref declarations
onMounted(() => {
  fetchHistory()
})

// Modified upload functions to use selected database
const uploadFile = async (type) => {
  error.value = ''
  message.value = ''
  
  let formData = new FormData()
  let url = ''
  
  if (type === 'file') {
    const file = fileInput.value.files[0]
    if (!file) {
      error.value = 'Please select a file'
      return
    }
    isLoading.value.file = true
    formData.append('db_name', selectedDatabase.value)
    formData.append('file', file)
    url = `${API_BASE_URL}/rag/upload`
  } else if (type === 'image') {
    const image = imageInput.value.files[0]
    if (!image) {
      error.value = 'Please select an image'
      return
    }
    isLoading.value.image = true
    formData.append('db_name', selectedDatabase.value)
    formData.append('collection_name', image.name)
    formData.append('image', image)
    url = `${API_BASE_URL}/rag/image-to-text`
  }

  try {
    const res = await authFetch(url, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (res.ok) {
      message.value = data.message
      // Clear file inputs
      if (type === 'file' && fileInput.value) fileInput.value.value = ''
      if (type === 'image' && imageInput.value) imageInput.value.value = ''
      fetchHistory()
    } else {
      error.value = data.error || 'Upload failed'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    if (type === 'file') isLoading.value.file = false
    if (type === 'image') isLoading.value.image = false
  }
}

// Add to your script setup section
const generateCollectionId = () => {
  const prefix = 'txt'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${timestamp}${random}`
}

// Modify uploadText function to use generated ID
const uploadText = async () => {
  error.value = ''
  message.value = ''
  if (!plainText.value) {
    error.value = 'Please enter some text.'
    return
  }
  
  const collectionId = generateCollectionId()
  isLoading.value.text = true
  
  try {
    const res = await authFetch(`${API_BASE_URL}/rag/plain-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        db_name: selectedDatabase.value,
        collection_name: collectionId,
        text: plainText.value
      })
    })
    const data = await res.json()
    if (res.ok) {
      message.value = data.message
      plainText.value = '' // Clear text area
      fetchHistory()
    } else {
      error.value = data.error || 'Upload failed.'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value.text = false
  }
}

const viewItem = (item) => {
  // Implement view logic, e.g. open modal or navigate to detail page
  alert(`Viewing: ${item.name}`)
}

const deleteItem = async (item) => {
  if (!item?.name) {
    error.value = 'Invalid file information'
    return
  }

  if (!confirm(`Are you sure you want to delete ${item.name}?`)) return
  
  error.value = ''
  message.value = ''
  isLoading.value.delete = true
  
  try {
    const res = await authFetch(`${API_BASE_URL}/rag/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        db_name: selectedDatabase.value, // Use selected database instead of item.db_name
        file_name: item.name, // Ensure this matches the backend's expected field name
        collection_name: item.collection || '' // Add collection name if needed
      })
    })

    if (!res.ok) {
      // Handle different error status codes
      if (res.status === 422) {
        const errorData = await res.json()
        throw new Error(`Validation error: ${errorData.detail?.[0]?.msg || 'Invalid request data'}`)
      }
      throw new Error(`Failed to delete: ${res.statusText}`)
    }

    const data = await res.json()
    message.value = data.message || 'File deleted successfully'
    await fetchHistory() // Refresh the list after successful deletion
  } catch (e) {
    console.error('Delete error:', e)
    error.value = e.message
  } finally {
    isLoading.value.delete = false
  }
}

const updatePromptTemplate = async () => {
  error.value = ''
  message.value = ''
  isLoading.value.template = true
  
  try {
    const baseTemplate = promptTemplates.find(t => t.id === selectedTemplate.value)
    const tone = toneOptions.find(t => t.value === selectedTone.value)
    const behavior = behaviorOptions.find(b => b.value === selectedBehavior.value) // Fixed typo here
    
    // Combine all prompt elements
    const fullPrompt = `
${baseTemplate.template}

Tone: Maintain a ${tone.label.toLowerCase()} tone.
Behavior: Act as a ${behavior.label.toLowerCase()}.
${customInstructions.value ? `Additional Instructions: ${customInstructions.value}` : ''}

When responding to questions:
1. Use the provided context as your primary source of information
2. Maintain consistency with the selected tone and behavior
3. Be clear, concise, and accurate in your responses
4. If unsure, acknowledge limitations in the provided context
`

    const res = await authFetch(`${API_BASE_URL}/rag/update-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        db_name: selectedDatabase.value,
        prompt: fullPrompt.trim()
      })
    })
    
    const data = await res.json()
    if (res.ok) {
      message.value = 'Prompt configuration updated successfully'
    } else {
      throw new Error(data.error || 'Failed to update prompt configuration')
    }
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value.template = false
  }
}
</script>

<style scoped>
.rag-upload-view {
  width: 100%;
}

.admin-content {
  width: 100%;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Prevent text overflow in table cells */
td {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Better mobile handling */
@media (max-width: 640px) {
  td {
    max-width: 120px;
  }
  
  .hidden-mobile {
    display: none;
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Better scrollbar for main content */
main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 3px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}
</style>
