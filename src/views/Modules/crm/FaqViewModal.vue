<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { X, Search, FileText, Database, Edit2, Trash2, Plus, Save } from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: true }
})
const emit = defineEmits(['close'])

const faqs = ref([])
const isLoading = ref(true)
const isSaving = ref(false)
const error = ref('')

const editingId = ref(null)
const editDraft = ref('')

const fetchFaqs = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/crm/faqs')
    faqs.value = response.data.faqs || []
  } catch (err) {
    console.error('Error fetching FAQs:', err)
    error.value = 'Failed to load FAQs. Ensure the backend server is running.'
  } finally {
    isLoading.value = false
  }
}

const formatFaq = (text) => {
  if (!text) return ''
  let formatted = text.replace(/^Q:\s*/i, '<strong class="text-absa-passion font-black">Q: </strong>')
  formatted = formatted.replace(/A:\s*/i, '<br><br><strong class="text-absa-enrich font-black">A: </strong>')
  return formatted
}

const startEdit = (faq) => {
  editingId.value = faq.id
  editDraft.value = faq.text
}

const cancelEdit = (faq, index) => {
  if (faq.isNew) {
    faqs.value.splice(index, 1)
  }
  editingId.value = null
  editDraft.value = ''
}

const saveFaq = async (faq, index) => {
  if (!editDraft.value.trim()) return
  
  isSaving.value = true
  try {
    if (faq.isNew) {
      const res = await axios.post('http://localhost:8080/api/v1/crm/faqs', { text: editDraft.value })
      faqs.value[index] = res.data.faq
    } else {
      await axios.put(`http://localhost:8080/api/v1/crm/faqs/${faq.id}`, { text: editDraft.value })
      faqs.value[index].text = editDraft.value
    }
    editingId.value = null
    editDraft.value = ''
  } catch (err) {
    console.error('Error saving FAQ:', err)
    alert('Failed to save FAQ. See console for details.')
  } finally {
    isSaving.value = false
  }
}

const deleteFaq = async (id, index) => {
  if (!confirm('Are you sure you want to delete this FAQ from the knowledge base?')) return
  try {
    await axios.delete(`http://localhost:8080/api/v1/crm/faqs/${id}`)
    faqs.value.splice(index, 1)
  } catch (err) {
    console.error('Error deleting FAQ:', err)
    alert('Failed to delete FAQ.')
  }
}

const addNewFaq = () => {
  if (editingId.value) return // finish editing current first
  const newFaq = {
    id: `temp_${Date.now()}`,
    text: 'Q: \nA: ',
    document_id: 'manual',
    isNew: true
  }
  faqs.value.unshift(newFaq)
  startEdit(newFaq)
}

onMounted(() => {
  fetchFaqs()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div class="bg-white rounded-none w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl relative border border-gray-200 flex flex-col">
                
        <!-- Header -->
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">Bot Knowledge Base - Embedded FAQs</h3>
          </div>
          <div class="flex items-center gap-4">
            <button @click="addNewFaq" class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion hover:text-absa-passion/80 transition-colors">
              <Plus :size="14" /> Add FAQ
            </button>
            <div class="w-px h-4 bg-gray-200"></div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="p-5 overflow-y-auto flex-1 bg-transparent relative z-10">
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
            <div class="w-8 h-8 border-4 border-absa-passion/20 border-t-absa-passion rounded-full animate-spin mb-4"></div>
            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Fetching from ChromaDB...</p>
          </div>

          <div v-else-if="error" class="bg-red-50 text-absa-passion p-4 border border-absa-passion flex items-start gap-3 rounded-none">
            <span class="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
            <p class="font-mono text-xs">{{ error }}</p>
          </div>

          <div v-else-if="faqs.length === 0" class="text-center py-12 border border-dashed border-gray-300 bg-gray-50/50">
            <Database :size="32" class="mx-auto mb-4 text-gray-400" />
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900 mb-1">Empty Knowledge Base</h3>
            <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">There are no FAQs embedded yet.</p>
          </div>

          <div v-else class="space-y-4">
            <div class="bg-white border border-gray-200 p-5 shadow-sm hover:border-absa-passion transition-colors rounded-none relative group" v-for="(faq, index) in faqs" :key="faq.id">
              
              <!-- EDIT MODE -->
              <div v-if="editingId === faq.id" class="flex flex-col gap-3">
                <textarea 
                  v-model="editDraft" 
                  rows="4" 
                  class="w-full border border-absa-passion focus:ring-1 focus:ring-absa-passion outline-none p-3 text-sm text-gray-800 rounded-none bg-white font-mono"
                  placeholder="Q: Your question here...&#10;A: Your answer here..."
                ></textarea>
                <div class="flex justify-end gap-2 mt-2">
                  <button @click="cancelEdit(faq, index)" class="px-4 py-1.5 border border-gray-300 text-gray-600 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors disabled:opacity-50" :disabled="isSaving">
                    Cancel
                  </button>
                  <button @click="saveFaq(faq, index)" class="px-4 py-1.5 bg-absa-passion text-white hover:bg-absa-passion/90 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50" :disabled="isSaving">
                    <div v-if="isSaving" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <Save v-else :size="12" />
                    {{ isSaving ? 'Embedding...' : 'Save' }}
                  </button>
                </div>
              </div>

              <!-- VIEW MODE -->
              <div v-else class="flex gap-4">
                <div class="shrink-0 mt-1">
                  <div class="w-6 h-6 bg-gray-50 text-gray-700 text-[9px] font-mono font-bold flex items-center justify-center rounded-none border border-gray-200">
                    {{ String(index + 1).padStart(2, '0') }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed font-medium pr-16" v-html="formatFaq(faq.text)"></div>
                  
                  <!-- Hover Actions -->
                  <div class="absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="startEdit(faq)" class="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-absa-passion hover:text-white text-gray-500 border border-gray-200 transition-colors" title="Edit FAQ">
                      <Edit2 :size="14" />
                    </button>
                    <button @click="deleteFaq(faq.id, index)" class="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-red-600 hover:text-white text-gray-500 border border-gray-200 transition-colors" title="Delete FAQ">
                      <Trash2 :size="14" />
                    </button>
                  </div>

                  <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div class="flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                      <FileText :size="12" />
                      Doc ID: <span class="text-gray-600">{{ faq.document_id }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                      <Database :size="12" />
                      Vector: <span class="text-gray-600 truncate max-w-[150px] inline-block align-bottom" :title="faq.id">{{ faq.id }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
