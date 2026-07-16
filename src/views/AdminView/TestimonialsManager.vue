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
                 <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // CMS</span>
              </div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Testimonials</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
           <button 
             @click="fetchTestimonials" 
             :disabled="loading"
             class="border border-gray-300 hover:border-gray-400 text-gray-600 px-3 py-1.5 rounded-sm text-xs font-bold font-mono uppercase transition-all flex items-center gap-2 bg-white"
           >
             <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
           </button>

           <button 
             @click="openAddModal" 
             class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-1.5 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2"
           >
             <i class="fas fa-plus"></i>
             ADD_TESTIMONIAL
           </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      <!-- Loading State -->
      <div v-if="loading && testimonials.length === 0" class="flex flex-col items-center justify-center py-20">
         <div class="w-12 h-12 border-4 border-[#2F2E8B] border-t-transparent rounded-full animate-spin mb-4"></div>
         <span class="text-xs font-mono text-gray-400 uppercase tracking-widest">LOADING_DATA...</span>
      </div>

      <!-- Grid -->
      <div v-else-if="testimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="bg-white border border-gray-200 shadow-sm rounded-sm p-6 hover:border-[#2F2E8B] hover:shadow-md transition-all group flex flex-col h-full relative"
          :class="{ 'opacity-60 grayscale': !testimonial.is_active }"
        >
          <!-- Active Status Badge -->
          <div class="absolute top-4 right-4">
             <span 
               :class="[
                 'px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-sm border',
                 testimonial.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
               ]"
             >
               {{ testimonial.is_active ? 'Active' : 'Hidden' }}
             </span>
          </div>

          <!-- Header -->
          <div class="flex items-start gap-4 mb-4">
            <div class="h-12 w-12 rounded-sm bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
              <img v-if="testimonial.avatar_url" :src="testimonial.avatar_url" alt="avatar" class="h-full w-full object-cover" @error="onAvatarError" />
              <i v-else class="fas fa-user text-gray-300"></i>
            </div>
            <div class="pr-12">
              <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight truncate">{{ testimonial.name }}</h4>
              <p class="text-[10px] font-mono text-gray-500 uppercase truncate">{{ testimonial.role }}</p>
              <div class="flex items-center gap-1 mt-1 text-[10px] font-mono text-gray-400 uppercase">
                 <i class="fas fa-building text-[#2F2E8B]"></i> {{ testimonial.company }}
              </div>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-1 mb-4 bg-gray-50 p-2 rounded-sm border border-gray-100 w-fit">
            <template v-for="i in 5" :key="i">
               <i class="fas fa-star text-[10px]" :class="i <= Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'"></i>
            </template>
            <span class="text-[10px] font-bold font-mono text-gray-600 ml-2">{{ testimonial.rating }}/5</span>
          </div>

          <!-- Message -->
          <div class="flex-1 mb-6 relative">
             <i class="fas fa-quote-left text-gray-100 absolute -top-2 -left-2 text-4xl -z-10"></i>
             <p class="text-xs text-gray-600 leading-relaxed font-medium italic line-clamp-4 relative z-10">"{{ testimonial.message }}"</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
            <button
              @click="toggleActive(testimonial)"
              class="flex-1 py-1.5 border border-gray-200 text-gray-500 rounded-sm text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors"
            >
              {{ testimonial.is_active ? 'Deactivate' : 'Activate' }}
            </button>
            <button
              @click="editTestimonial(testimonial)"
              class="w-8 h-8 flex items-center justify-center border border-gray-200 text-[#2F2E8B] rounded-sm hover:border-[#2F2E8B] hover:bg-blue-50 transition-colors"
              title="Edit"
            >
              <i class="fas fa-pencil-alt text-xs"></i>
            </button>
            <button
              @click="confirmDelete(testimonial)"
              class="w-8 h-8 flex items-center justify-center border border-gray-200 text-red-400 rounded-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <i class="fas fa-trash-alt text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 border-2 border-dashed border-gray-200 rounded-sm bg-gray-50/50">
         <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <i class="fas fa-quote-right text-2xl"></i>
         </div>
         <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">No Testimonials Found</h3>
         <p class="text-xs text-gray-500 font-mono mb-6 max-w-xs mx-auto">Add your first customer success story.</p>
         <button 
           @click="openAddModal" 
           class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-5 py-2 rounded-sm text-xs font-bold font-mono uppercase shadow-md transition-all"
         >
           Create Testimonial
         </button>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="absolute inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
        
        <!-- Content -->
        <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] rounded-sm relative z-10 animate-scale-in">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <div class="flex items-center gap-3">
                <div class="w-1 h-6 bg-[#2F2E8B]"></div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ editingId ? 'Edit Testimonial' : 'New Testimonial' }}</h3>
             </div>
             <button @click="closeModal" class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-sm transition-colors"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="p-6 overflow-y-auto custom-scrollbar">
            <form @submit.prevent="saveTestimonial" class="space-y-5">
              <!-- Name & Role -->
              <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Name *</label>
                    <input v-model="form.name" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="e.g. John Doe" />
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Role *</label>
                    <input v-model="form.role" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="e.g. CEO" />
                 </div>
              </div>

              <!-- Company & Rating -->
              <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Company *</label>
                    <input v-model="form.company" type="text" required class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="e.g. ACME Corp" />
                 </div>
                 <div>
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Rating *</label>
                    <select v-model="form.rating" class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-mono font-bold text-gray-900 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]">
                       <option v-for="i in 5" :key="i" :value="i">{{ i }} Stars</option>
                    </select>
                 </div>
              </div>

              <!-- Message -->
              <div>
                 <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">Message *</label>
                 <textarea v-model="form.message" required rows="4" class="w-full border-gray-300 rounded-sm px-3 py-2 text-sm font-medium text-gray-700 focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" placeholder="Testimonial content..."></textarea>
              </div>

              <!-- Avatar -->
              <div class="space-y-2">
                 <div class="flex justify-between items-center">
                    <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase">Profile Picture</label>
                    <button type="button" @click="uploadMode = uploadMode === 'url' ? 'file' : 'url'" class="text-[9px] font-bold text-[#2F2E8B] uppercase hover:underline">
                      {{ uploadMode === 'url' ? 'Switch to Upload' : 'Switch to URL' }}
                    </button>
                 </div>

                 <!-- URL Mode -->
                 <div v-if="uploadMode === 'url'">
                    <input v-model="form.avatar_url" type="url" placeholder="https://example.com/avatar.jpg" class="w-full border-gray-300 rounded-sm px-3 py-2 text-xs font-mono focus:ring-[#2F2E8B] focus:border-[#2F2E8B]" />
                 </div>

                 <!-- File Upload Mode -->
                 <div v-else class="border-2 border-dashed border-gray-200 bg-gray-50 rounded-sm p-4 text-center hover:bg-gray-100 transition-colors relative cursor-pointer" @click="$refs.fileInput.click()">
                     <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />
                     <div v-if="uploadingImage" class="text-xs font-mono text-gray-500"><i class="fas fa-spinner animate-spin"></i> Uploading...</div>
                     <div v-else class="text-xs font-mono text-gray-400 uppercase"><i class="fas fa-cloud-upload-alt mr-2"></i> Click to Upload Image</div>
                 </div>

                 <!-- Preview -->
                 <div v-if="form.avatar_url" class="flex items-center gap-3 mt-2 bg-gray-50 p-2 rounded-sm border border-gray-100">
                    <img :src="form.avatar_url" class="w-8 h-8 rounded-sm object-cover border border-gray-200" />
                    <span class="text-[10px] font-mono text-gray-500 truncate flex-1">{{ form.avatar_url }}</span>
                    <button type="button" @click="form.avatar_url = ''" class="text-red-400 hover:text-red-600"><i class="fas fa-times"></i></button>
                 </div>
              </div>

              <!-- Active Toggle -->
              <div class="flex items-center space-x-3 cursor-pointer group bg-gray-50 p-3 rounded-sm border border-gray-100">
                 <input type="checkbox" v-model="form.is_active" class="rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 h-4 w-4">
                 <span class="text-[10px] font-bold text-gray-600 uppercase group-hover:text-[#2F2E8B] transition-colors">Show on Landing Page</span>
              </div>

              <!-- Error -->
              <div v-if="error" class="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase rounded-sm flex items-center gap-2">
                 <i class="fas fa-exclamation-triangle"></i> {{ error }}
              </div>

              <!-- Footer -->
              <div class="pt-4 border-t border-gray-100 flex gap-3">
                 <button type="button" @click="closeModal" class="flex-1 py-2 border border-gray-300 text-gray-600 rounded-sm text-xs font-bold uppercase hover:bg-gray-50 transition-colors">Cancel</button>
                 <button 
                   type="submit" 
                   :disabled="saving || uploadingImage" 
                   class="flex-1 py-2 bg-[#2F2E8B] text-white rounded-sm text-xs font-bold uppercase hover:bg-[#1D226B] shadow-md transition-all disabled:opacity-50"
                 >
                    <span v-if="saving"><i class="fas fa-spinner animate-spin"></i> Saving...</span>
                    <span v-else>{{ editingId ? 'Update' : 'Create' }}</span>
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Modal -->
    <Teleport to="body">
       <div v-if="showDeleteModal" class="absolute inset-0 z-[110] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false"></div>
          <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-sm rounded-sm relative z-10 p-6 text-center animate-scale-in">
             <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 border border-red-100">
                <i class="fas fa-exclamation-triangle"></i>
             </div>
             <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Delete Testimonial?</h3>
             <p class="text-xs text-gray-500 font-mono mb-6">This action cannot be undone.</p>
             <div class="flex gap-3">
                <button @click="showDeleteModal = false" class="flex-1 py-2 border border-gray-300 text-gray-600 rounded-sm text-xs font-bold uppercase hover:bg-gray-50">Cancel</button>
                <button 
                  @click="deleteTestimonial" 
                  :disabled="deleting"
                  class="flex-1 py-2 bg-red-600 text-white rounded-sm text-xs font-bold uppercase hover:bg-red-700 shadow-md transition-all disabled:opacity-50"
                >
                   {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
             </div>
          </div>
       </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/api_services/api'

// State
const testimonials = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const uploadingImage = ref(false)
const error = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)
const uploadMode = ref('url') // 'url' or 'file'

const form = ref({
  name: '',
  role: '',
  company: '',
  message: '',
  rating: 5,
  avatar_url: '',
  is_active: true
})

// Fetch testimonials
const fetchTestimonials = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_BASE_URL}/testimonials`)
    testimonials.value = response.data
  } catch (err) {
    console.error('Error fetching testimonials:', err)
  } finally {
    loading.value = false
  }
}

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploadingImage.value = true
  error.value = ''

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(`${API_BASE_URL}/testimonials/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.success) {
      form.value.avatar_url = response.data.avatar_url
    }
  } catch (err) {
    error.value = 'Failed to upload image'
    console.error(err)
  } finally {
    uploadingImage.value = false
    // Reset file input
    event.target.value = ''
  }
}

// Open add modal
const openAddModal = () => {
  editingId.value = null
  uploadMode.value = 'url'
  form.value = {
    name: '',
    role: '',
    company: '',
    message: '',
    rating: 5,
    avatar_url: '',
    is_active: true
  }
  error.value = ''
  showModal.value = true
}

// Edit testimonial
const editTestimonial = (testimonial) => {
  editingId.value = testimonial.id
  uploadMode.value = testimonial.avatar_url && testimonial.avatar_url.startsWith('data:') ? 'file' : 'url'
  form.value = {
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    message: testimonial.message,
    rating: testimonial.rating,
    avatar_url: testimonial.avatar_url || '',
    is_active: testimonial.is_active
  }
  error.value = ''
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingId.value = null
}

// Save testimonial
const saveTestimonial = async () => {
  saving.value = true
  error.value = ''
  
  try {
    const payload = {
      ...form.value,
      avatar_url: form.value.avatar_url || null
    }
    
    if (editingId.value) {
      await axios.put(`${API_BASE_URL}/testimonials/${editingId.value}`, payload)
    } else {
      await axios.post(`${API_BASE_URL}/testimonials`, payload)
    }
    
    await fetchTestimonials()
    closeModal()
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to save testimonial'
  } finally {
    saving.value = false
  }
}

// Toggle active status
const toggleActive = async (testimonial) => {
  try {
    await axios.post(`${API_BASE_URL}/testimonials/${testimonial.id}/toggle-active`)
    await fetchTestimonials()
  } catch (err) {
    console.error('Error toggling status:', err)
  }
}

// Confirm delete
const confirmDelete = (testimonial) => {
  deleteTarget.value = testimonial
  showDeleteModal.value = true
}

// Delete testimonial
const deleteTestimonial = async () => {
  if (!deleteTarget.value) return
  
  deleting.value = true
  try {
    await axios.delete(`${API_BASE_URL}/testimonials/${deleteTarget.value.id}`)
    await fetchTestimonials()
    showDeleteModal.value = false
    deleteTarget.value = null
  } catch (err) {
    console.error('Error deleting testimonial:', err)
  } finally {
    deleting.value = false
  }
}

// Avatar error handler
const onAvatarError = (e) => {
  e.target.style.display = 'none'
}

// Initialize
onMounted(fetchTestimonials)
</script>

<style scoped>
/* Mesh Background Pattern */
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8; 
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
</style>
