<template>
  <div class="vision-mission-panel bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Vision & Mission</h2>
      <button
        v-if="!isEditing"
        @click="startEditing"
        class="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Edit</span>
      </button>
    </div>

    <!-- Vision Section -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Our Vision</h3>
      </div>
      
      <div v-if="!isEditing" class="ml-13">
        <p
          v-if="visionMission.vision"
          class="text-gray-700 leading-relaxed"
        >
          {{ visionMission.vision }}
        </p>
        <div v-else class="text-gray-400 italic">
          <p>No vision statement defined yet.</p>
          <p class="text-sm mt-1">Click "Edit" to add your organization's vision for the future.</p>
        </div>
      </div>

      <div v-else class="ml-13">
        <textarea
          v-model="editingVision"
          placeholder="Describe your organization's long-term vision and aspirations..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          rows="4"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">
          Describe where you see your organization in 5-10 years. What impact do you want to make?
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="mb-6">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Our Mission</h3>
      </div>
      
      <div v-if="!isEditing" class="ml-13">
        <p
          v-if="visionMission.mission"
          class="text-gray-700 leading-relaxed"
        >
          {{ visionMission.mission }}
        </p>
        <div v-else class="text-gray-400 italic">
          <p>No mission statement defined yet.</p>
          <p class="text-sm mt-1">Click "Edit" to add your organization's mission and core purpose.</p>
        </div>
      </div>

      <div v-else class="ml-13">
        <textarea
          v-model="editingMission"
          placeholder="Describe your organization's mission and core purpose..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          rows="4"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">
          Define what your organization does, who you serve, and how you create value.
        </p>
      </div>
    </div>

    <!-- Edit Controls -->
    <div v-if="isEditing" class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
      <button
        @click="cancelEditing"
        class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
      <button
        @click="saveChanges"
        :disabled="saving"
        class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ saving ? 'Saving...' : 'Save Changes' }}</span>
      </button>
    </div>

    <!-- Last Updated Info -->
    <div v-if="visionMission.lastUpdated && !isEditing" class="mt-6 pt-4 border-t border-gray-200">
      <p class="text-xs text-gray-500">
        Last updated: {{ formatDate(visionMission.lastUpdated) }}
      </p>
    </div>

    <!-- Vision/Mission Guidelines -->
    <div v-if="showGuidelines" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex items-start justify-between mb-2">
        <h4 class="text-sm font-medium text-gray-900">Guidelines for Writing Vision & Mission</h4>
        <button
          @click="showGuidelines = false"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-3 text-sm text-gray-600">
        <div>
          <p class="font-medium text-gray-700 mb-1">Vision Statement:</p>
          <ul class="list-disc list-inside space-y-1 text-xs">
            <li>Future-oriented and inspirational</li>
            <li>Describes what you want to achieve long-term</li>
            <li>Should be memorable and motivating</li>
            <li>Typically 1-2 sentences</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium text-gray-700 mb-1">Mission Statement:</p>
          <ul class="list-disc list-inside space-y-1 text-xs">
            <li>Present-focused and actionable</li>
            <li>Explains what you do and for whom</li>
            <li>Should be clear and specific</li>
            <li>Guides daily decision-making</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Show Guidelines Button -->
    <div v-if="!showGuidelines && isEditing" class="mt-4">
      <button
        @click="showGuidelines = true"
        class="text-sm text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Show writing guidelines</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  visionMission: {
    type: Object,
    default: () => ({
      vision: '',
      mission: '',
      lastUpdated: null
    })
  }
})

// Emits
const emit = defineEmits([
  'vision-update',
  'mission-update'
])

// Local state
const isEditing = ref(false)
const saving = ref(false)
const showGuidelines = ref(false)
const editingVision = ref('')
const editingMission = ref('')

// Methods
const startEditing = () => {
  isEditing.value = true
  editingVision.value = props.visionMission.vision || ''
  editingMission.value = props.visionMission.mission || ''
  showGuidelines.value = (!props.visionMission.vision && !props.visionMission.mission)
}

const cancelEditing = () => {
  isEditing.value = false
  showGuidelines.value = false
  editingVision.value = ''
  editingMission.value = ''
}

const saveChanges = async () => {
  saving.value = true

  try {
    // Emit updates if values have changed
    if (editingVision.value !== props.visionMission.vision) {
      emit('vision-update', editingVision.value)
    }
    
    if (editingMission.value !== props.visionMission.mission) {
      emit('mission-update', editingMission.value)
    }

    // Wait a moment for the updates to process
    await new Promise(resolve => setTimeout(resolve, 500))
    
    isEditing.value = false
    showGuidelines.value = false
  } catch (error) {
    console.error('Error saving vision/mission:', error)
  } finally {
    saving.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

// Watch for prop changes
watch(() => props.visionMission, (newValue) => {
  if (!isEditing.value) {
    editingVision.value = newValue.vision || ''
    editingMission.value = newValue.mission || ''
  }
}, { deep: true })
</script>

<style scoped>
.ml-13 {
  margin-left: 3.25rem;
}

textarea:focus {
  outline: none;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>