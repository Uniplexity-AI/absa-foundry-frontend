<template>
  <div class="notes-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-sm relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // STRATEGIC_NOTES</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">Strategic Notes</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">CORE INTELLIGENCE // DOCUMENTATION_ACTIVE</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <button 
              @click="openAddNoteModal"
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-plus"></i>
              <span>NEW_NOTE</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="notes" />

      <!-- Notes Grid -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_OUTPUT // NOTES_REGISTRY</div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-amber-500"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Saved Notes</h2>
            </div>
            <div class="relative w-full md:w-64">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="SEARCH_NOTES..." 
                class="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none"
              >
            </div>
          </div>
          
          <div v-if="notes.length === 0" class="text-center py-12 text-gray-400">
            <i class="fas fa-sticky-note text-4xl mb-4 text-gray-300"></i>
            <p class="text-[10px] font-mono uppercase tracking-widest">No notes available. Click New Note to add one.</p>
          </div>

          <div v-else class="relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div 
                v-for="note in paginatedNotes" 
                :key="note.id"
                @click="viewNote(note)"
                class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-l-4 cursor-pointer"
                :class="note.color || 'border-l-[#2F2E8B]'"
              >
                <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">
                      {{ formatDate(note.updatedAt || note.createdAt) }}
                    </span>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click.stop="editNote(note)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
                      <button @click.stop="deleteNote(note.id)" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    </div>
                  </div>
                  <h4 class="font-black text-gray-900 text-sm mb-2 uppercase tracking-tight font-outfit truncate text-center">{{ note.title }}</h4>
                  <div class="w-8 h-0.5 bg-gray-100 mb-3 group-hover:w-full transition-all duration-500 mx-auto"></div>
                  <p class="text-xs text-gray-600 font-medium leading-relaxed min-h-[4.5rem] line-clamp-4 text-center">{{ note.content }}</p>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 border-t border-gray-100 pt-6">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest bg-gray-50 border border-gray-200 text-gray-600 hover:bg-[#2F2E8B] hover:text-white hover:border-[#2F2E8B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <i class="fas fa-chevron-left mr-1"></i> PREV
              </button>
              
              <span class="text-[10px] font-mono font-black uppercase tracking-widest text-[#2F2E8B]">
                PAGE {{ currentPage }} / {{ totalPages }}
              </span>

              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest bg-gray-50 border border-gray-200 text-gray-600 hover:bg-[#2F2E8B] hover:text-white hover:border-[#2F2E8B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                NEXT <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Note Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white p-6 w-full max-w-3xl shadow-xl relative border-l-4" :class="currentNote.color">
        <div class="absolute top-0 right-0 p-4">
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
        </div>
        <h3 class="text-lg font-black font-outfit text-gray-900 uppercase mb-4">
          {{ isViewing ? 'VIEW_NOTE' : (isEditing ? 'EDIT_NOTE' : 'NEW_NOTE') }}
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">Title</label>
            <div v-if="isViewing" class="w-full p-2 text-sm font-bold text-gray-800 bg-gray-50 border border-transparent">{{ currentNote.title }}</div>
            <input v-else v-model="currentNote.title" type="text" class="w-full border border-gray-200 p-2 text-sm focus:border-[#2F2E8B] outline-none" placeholder="NOTE_TITLE">
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">Content</label>
            <div v-if="isViewing" class="w-full p-2 text-sm text-gray-700 bg-gray-50 border border-transparent whitespace-pre-wrap min-h-[150px] max-h-[60vh] overflow-y-auto">{{ currentNote.content }}</div>
            <textarea v-else v-model="currentNote.content" rows="6" class="w-full border border-gray-200 p-2 text-sm focus:border-[#2F2E8B] outline-none" placeholder="Enter note content..."></textarea>
          </div>
          <div v-if="!isViewing">
             <label class="block text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">Color Tag</label>
             <div class="flex gap-2">
               <button @click="currentNote.color = 'border-l-[#2F2E8B]'" class="w-6 h-6 bg-[#2F2E8B] rounded-full ring-2 ring-offset-2" :class="currentNote.color === 'border-l-[#2F2E8B]' ? 'ring-gray-300' : 'ring-transparent'"></button>
               <button @click="currentNote.color = 'border-l-emerald-500'" class="w-6 h-6 bg-emerald-500 rounded-full ring-2 ring-offset-2" :class="currentNote.color === 'border-l-emerald-500' ? 'ring-gray-300' : 'ring-transparent'"></button>
               <button @click="currentNote.color = 'border-l-red-500'" class="w-6 h-6 bg-red-500 rounded-full ring-2 ring-offset-2" :class="currentNote.color === 'border-l-red-500' ? 'ring-gray-300' : 'ring-transparent'"></button>
               <button @click="currentNote.color = 'border-l-amber-500'" class="w-6 h-6 bg-amber-500 rounded-full ring-2 ring-offset-2" :class="currentNote.color === 'border-l-amber-500' ? 'ring-gray-300' : 'ring-transparent'"></button>
             </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 text-xs font-bold uppercase text-gray-500 hover:bg-gray-100">
            {{ isViewing ? 'Close' : 'Cancel' }}
          </button>
          
          <button v-if="isViewing" @click="switchToEditMode" class="px-4 py-2 text-xs font-bold uppercase bg-[#2F2E8B] text-white hover:bg-[#1D226B]">
            <i class="fas fa-edit mr-1"></i> Edit Note
          </button>
          <button v-else @click="saveNote" class="px-4 py-2 text-xs font-bold uppercase bg-[#2F2E8B] text-white hover:bg-[#1D226B]">
            Save Note
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'

const notes = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const isViewing = ref(false)
const isLoading = ref(false)
const currentNote = ref({
  id: null,
  title: '',
  content: '',
  color: 'border-l-[#2F2E8B]'
})

// Search & Pagination Logic
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

const filteredNotes = computed(() => {
  if (!searchQuery.value) return notes.value
  const query = searchQuery.value.toLowerCase()
  return notes.value.filter(note => 
    (note.title && note.title.toLowerCase().includes(query)) || 
    (note.content && note.content.toLowerCase().includes(query))
  )
})

const totalPages = computed(() => Math.ceil(filteredNotes.value.length / itemsPerPage))

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNotes.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

const jwtHelper = decodeJWT()
const tenantId = ref(jwtHelper.getTenantId())

const openAddNoteModal = () => {
  isEditing.value = false
  isViewing.value = false
  currentNote.value = { id: null, title: '', content: '', color: 'border-l-[#2F2E8B]' }
  showModal.value = true
}

const editNote = (note) => {
  isEditing.value = true
  isViewing.value = false
  currentNote.value = { ...note } // Clone to avoid direct mutation
  showModal.value = true
}

const viewNote = (note) => {
  isViewing.value = true
  isEditing.value = false
  currentNote.value = { ...note }
  showModal.value = true
}

const switchToEditMode = () => {
  isViewing.value = false
  isEditing.value = true
}

const closeModal = () => {
  showModal.value = false
}

const fetchNotes = async () => {
  if (!tenantId.value) return
  isLoading.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}/strategy/analysis/notes`, {
      params: { tenant_id: tenantId.value }
    })
    notes.value = response.data
  } catch (error) {
    console.error('Error fetching notes:', error)
  } finally {
    isLoading.value = false
  }
}

const saveNote = async () => {
  if (!currentNote.value.title || !currentNote.value.content) {
    alert('Please enter a title and content.')
    return
  }

  const payload = {
    tenant_id: tenantId.value,
    title: currentNote.value.title,
    content: currentNote.value.content,
    color: currentNote.value.color
  }

  try {
    if (isEditing.value && currentNote.value.id) {
       // Update existing note
      await axios.put(`${API_BASE_URL}/strategy/analysis/notes/${currentNote.value.id}`, payload)
    } else {
      // Create new note
      await axios.post(`${API_BASE_URL}/strategy/analysis/notes`, payload)
    }
    
    await fetchNotes() // Refresh list
    closeModal()
  } catch (error) {
    console.error('Error saving note:', error)
    alert('Failed to save note.')
  }
}

const deleteNote = async (id) => {
  if (confirm('Are you sure you want to delete this note?')) {
    try {
      await axios.delete(`${API_BASE_URL}/strategy/analysis/notes/${id}`, {
        params: { tenant_id: tenantId.value }
      })
      await fetchNotes() // Refresh list
    } catch (error) {
       console.error('Error deleting note:', error)
       alert('Failed to delete note.')
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

onMounted(() => {
  fetchNotes()
})
</script>

<style scoped>
.font-outfit {
  font-family: 'Outfit', sans-serif;
}

.mesh-background {
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(47, 46, 139, 0.03) 0%, transparent 50%),
    linear-gradient(rgba(245, 245, 245, 0.8), rgba(245, 245, 245, 0.8)),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.dotted-pattern {
  background-image: radial-gradient(circle, #2F2E8B 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
