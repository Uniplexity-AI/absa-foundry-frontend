<template>
  <div class="advanced-search bg-white rounded-lg shadow-lg">
    <!-- Search Header -->
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
        <i class="fas fa-search mr-2 text-[#2F2E8B]"></i>
        Advanced Search
      </h3>
    </div>
    
    <!-- Main Search Bar -->
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <input 
          v-model="searchQuery"
          @input="performSearch"
          @keyup.enter="performAdvancedSearch"
          placeholder="Search documents, notes, conversations..."
          class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
        />
        <i class="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
        <button 
          @click="performAdvancedSearch"
          class="absolute right-2 top-1.5 px-3 py-1.5 bg-[#2F2E8B] text-white rounded text-sm hover:bg-[#252579] transition-colors"
        >
          Search
        </button>
      </div>
    </div>
    
    <!-- Search Filters -->
    <div class="p-4 border-b border-gray-200" v-if="showFilters">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Content Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <div class="space-y-1">
            <label v-for="type in contentTypes" :key="type.value" class="flex items-center">
              <input 
                type="checkbox" 
                v-model="activeFilters.contentTypes" 
                :value="type.value"
                class="mr-2 text-[#2F2E8B] focus:ring-[#2F2E8B]"
              />
              <span class="text-sm text-gray-700">{{ type.label }}</span>
              <span class="ml-auto text-xs text-gray-500">({{ type.count }})</span>
            </label>
          </div>
        </div>
        
        <!-- Date Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select 
            v-model="activeFilters.dateRange"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
          >
            <option value="">Any time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>
        </div>
        
        <!-- Source Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <div class="space-y-1 max-h-24 overflow-y-auto">
            <label v-for="source in sources" :key="source.value" class="flex items-center">
              <input 
                type="checkbox" 
                v-model="activeFilters.sources" 
                :value="source.value"
                class="mr-2 text-[#2F2E8B] focus:ring-[#2F2E8B]"
              />
              <span class="text-sm text-gray-700 truncate">{{ source.label }}</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Search Options -->
      <div class="mt-4 flex flex-wrap gap-4">
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="searchOptions.exactMatch"
            class="mr-2 text-[#2F2E8B] focus:ring-[#2F2E8B]"
          />
          <span class="text-sm text-gray-700">Exact match</span>
        </label>
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="searchOptions.semanticSearch"
            class="mr-2 text-[#2F2E8B] focus:ring-[#2F2E8B]"
          />
          <span class="text-sm text-gray-700">Semantic search</span>
        </label>
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="searchOptions.includeSimilar"
            class="mr-2 text-[#2F2E8B] focus:ring-[#2F2E8B]"
          />
          <span class="text-sm text-gray-700">Include similar results</span>
        </label>
      </div>
    </div>
    
    <!-- Filter Toggle -->
    <div class="px-4 py-2 border-b border-gray-200">
      <button 
        @click="showFilters = !showFilters"
        class="text-sm text-[#2F2E8B] hover:text-[#252579] flex items-center"
      >
        <i :class="['fas mr-1', showFilters ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        {{ showFilters ? 'Hide' : 'Show' }} Filters
      </button>
    </div>
    
    <!-- Search Results -->
    <div class="p-4">
      <div v-if="searching" class="text-center py-8">
        <i class="fas fa-spinner fa-spin text-2xl text-[#2F2E8B] mb-2"></i>
        <p class="text-gray-500">Searching...</p>
      </div>
      
      <div v-else-if="searchResults.length > 0">
        <!-- Results Header -->
        <div class="flex justify-between items-center mb-4">
          <h4 class="font-medium text-gray-900">
            {{ searchResults.length }} results found
            <span v-if="searchQuery" class="text-gray-500">for "{{ searchQuery }}"</span>
          </h4>
          <div class="flex gap-2">
            <button 
              v-for="sort in sortOptions" 
              :key="sort.value"
              @click="sortBy = sort.value"
              :class="[
                'px-3 py-1 text-xs rounded',
                sortBy === sort.value ? 'bg-[#2F2E8B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ sort.label }}
            </button>
          </div>
        </div>
        
        <!-- Results List -->
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div 
            v-for="result in sortedResults" 
            :key="result.id"
            class="search-result p-4 border border-gray-200 rounded-lg hover:border-[#2F2E8B] cursor-pointer transition-colors"
            @click="selectResult(result)"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-2">
                <i :class="[
                  'fas text-sm',
                  result.type === 'document' ? 'fa-file-alt text-blue-500' :
                  result.type === 'note' ? 'fa-sticky-note text-yellow-500' :
                  result.type === 'conversation' ? 'fa-comments text-green-500' :
                  'fa-file text-gray-500'
                ]"></i>
                <span class="font-medium text-gray-900">{{ result.title }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">{{ result.relevance }}% match</span>
                <span :class="[
                  'text-xs px-2 py-1 rounded-full',
                  result.type === 'document' ? 'bg-blue-100 text-blue-800' :
                  result.type === 'note' ? 'bg-yellow-100 text-yellow-800' :
                  result.type === 'conversation' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                ]">{{ result.type }}</span>
              </div>
            </div>
            
            <p class="text-sm text-gray-600 mb-2" v-html="highlightMatch(result.excerpt)"></p>
            
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ result.source }}</span>
              <span>{{ formatDate(result.date) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="searchQuery && !searching" class="text-center py-8 text-gray-500">
        <i class="fas fa-search text-4xl mb-2 opacity-30"></i>
        <p class="text-lg font-medium mb-2">No results found</p>
        <p class="text-sm">Try adjusting your search terms or filters</p>
      </div>
      
      <div v-else class="text-center py-8 text-gray-500">
        <i class="fas fa-search text-4xl mb-2 opacity-30"></i>
        <p class="text-lg font-medium mb-2">Start searching</p>
        <p class="text-sm">Enter keywords to find documents, notes, and conversations</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['result-selected', 'search-performed'])

const searchQuery = ref('')
const searching = ref(false)
const showFilters = ref(false)
const sortBy = ref('relevance')
const searchResults = ref([])

const activeFilters = ref({
  contentTypes: [],
  dateRange: '',
  sources: []
})

const searchOptions = ref({
  exactMatch: false,
  semanticSearch: true,
  includeSimilar: true
})

const contentTypes = ref([
  { value: 'document', label: 'Documents', count: 45 },
  { value: 'note', label: 'Notes', count: 23 },
  { value: 'conversation', label: 'Conversations', count: 18 },
  { value: 'annotation', label: 'Annotations', count: 12 }
])

const sources = ref([
  { value: 'pdf1', label: 'Legal Framework 2024.pdf' },
  { value: 'pdf2', label: 'Compliance Guidelines.pdf' },
  { value: 'pdf3', label: 'Risk Assessment Manual.pdf' },
  { value: 'notes', label: 'Personal Notes' },
  { value: 'chat', label: 'AI Conversations' }
])

const sortOptions = ref([
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date' },
  { value: 'type', label: 'Type' },
  { value: 'source', label: 'Source' }
])

const sortedResults = computed(() => {
  const results = [...searchResults.value]
  
  return results.sort((a, b) => {
    switch (sortBy.value) {
      case 'relevance':
        return b.relevance - a.relevance
      case 'date':
        return new Date(b.date) - new Date(a.date)
      case 'type':
        return a.type.localeCompare(b.type)
      case 'source':
        return a.source.localeCompare(b.source)
      default:
        return 0
    }
  })
})

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  
  // Debounce search
  clearTimeout(performSearch.timeout)
  performSearch.timeout = setTimeout(performAdvancedSearch, 300)
}

const performAdvancedSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  searching.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock search results
    searchResults.value = [
      {
        id: 1,
        title: 'Legal Compliance Framework',
        type: 'document',
        excerpt: 'This document outlines the comprehensive legal compliance framework for organizations...',
        source: 'Legal Framework 2024.pdf',
        date: '2024-09-15',
        relevance: 95
      },
      {
        id: 2,
        title: 'Risk Assessment Notes',
        type: 'note',
        excerpt: 'Key points about risk assessment methodology and implementation strategies...',
        source: 'Personal Notes',
        date: '2024-09-20',
        relevance: 87
      },
      {
        id: 3,
        title: 'AI Legal Consultation',
        type: 'conversation',
        excerpt: 'Discussion about compliance requirements and regulatory updates for Q4 2024...',
        source: 'AI Conversations',
        date: '2024-09-25',
        relevance: 78
      }
    ]
    
    emit('search-performed', {
      query: searchQuery.value,
      filters: activeFilters.value,
      options: searchOptions.value,
      resultCount: searchResults.value.length
    })
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    searching.value = false
  }
}

const selectResult = (result) => {
  emit('result-selected', result)
}

const highlightMatch = (text) => {
  if (!searchQuery.value) return text
  
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Watch for filter changes
watch([activeFilters, searchOptions], () => {
  if (searchQuery.value.trim()) {
    performAdvancedSearch()
  }
}, { deep: true })
</script>