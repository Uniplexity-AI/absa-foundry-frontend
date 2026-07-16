<template>
  <Transition name="fade">
    <div v-if="visible && report.answer" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <!-- Add max-height and overflow to the popup container -->
      <div class="bg-white rounded-lg shadow-lg w-full max-w-[900px] m-4 transform transition-all flex flex-col max-h-[90vh]">
        <!-- Header - Fixed -->
        <div class="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 class="text-xl font-semibold">Report from Lexi Ai</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Loading State -->
          <div v-if="loading" class="py-8 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p class="mt-2 text-gray-600">Loading report...</p>
          </div>

          <!-- Content with improved formatting -->
          <div v-else class="space-y-6">
            <!-- AI Answer with HTML formatting -->
            <div v-if="report.answer" class="space-y-2">
              <strong class="block text-gray-700 text-lg mb-4">KPI Report</strong>
              <div 
                class="markdown-content prose prose-blue max-w-none overflow-x-auto"
                v-html="formatContent(report.answer)"
              >
              </div>
            </div>

            <!-- Insights with HTML formatting -->
            <div v-if="report.popup_insights && Object.keys(report.popup_insights).length" class="space-y-2">
              <strong class="block text-gray-700">Insights:</strong>
              <ul class="list-disc ml-6 space-y-2">
                <li 
                  v-for="(val, key) in report.popup_insights" 
                  :key="key" 
                  class="text-gray-600"
                >
                  <span class="font-medium" v-html="formatContent(key)"></span>:
                  <span v-html="formatContent(val)"></span>
                </li>
              </ul>
            </div>

            <!-- Conversation with improved styling -->
            <div v-if="report.messages?.length" class="space-y-2">
              <strong class="block text-gray-700">Conversation:</strong>
              <div class="max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                <div 
                  v-for="(msg, idx) in report.messages" 
                  :key="idx" 
                  class="mb-3 last:mb-0"
                >
                  <span 
                    class="font-bold" 
                    :class="msg.type === 'ai' ? 'text-blue-700' : 'text-gray-700'"
                  >
                    {{ msg.type === 'ai' ? 'Temwani AI' : 'You' }}:
                  </span>
                  <div 
                    class="ml-2 mt-1 prose prose-sm max-w-none"
                    v-html="formatContent(msg.content)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer - Fixed -->
        <div class="p-6 border-t flex justify-between items-center flex-shrink-0 bg-white">
          <router-link 
            to="/dashboard/ai"
            class="inline-flex items-center px-4 py-2 rounded-lg bg-[#2F2E8B] text-white hover:bg-[#252579] transition-colors"
          >
            <i class="fas fa-comment-dots mr-2"></i>
            Continue Chat with AI Assistant
          </router-link>
          
          <button 
            @click="close"
            class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import axios from 'axios';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
const { getTenantId, getUserRole, getUserName ,getUserEmail} = decodeJWT();

const props = defineProps({
  tenantId: { type: String, required: true },
  show: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);
const loading = ref(false);
const report = ref({});
const visible = ref(false);

// Watch for show prop changes and handle popup visibility
watch(() => props.show, async (newVal) => {
  if (newVal) {
    await fetchReport();
  }
}, { immediate: true }); // Add immediate to trigger on mount if show is true
// Manage thread ID
function manageThreadId() {
  let threadId = localStorage.getItem('thread_id');
  if (!threadId) {
    threadId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('thread_id', threadId);
  }
  return threadId;
}
async function fetchReport() {
  if (!props.tenantId) {
    console.error('Tenant ID is required');
    return;
  }

  loading.value = true;
  // Remove setting visible.value = true here
  
  try {
    const timestamp = new Date().toLocaleTimeString('en-ZM', { hour12: true });
    const currentDate = new Date().toLocaleDateString('en-ZM');
    const threadId = manageThreadId();

    // Construct a more structured query
    const query = `
      Date: ${currentDate}
      Time: ${timestamp}
      Request: Generate KPI Report
      Context: Company Performance Analysis
      User: ${getUserName()} (${getUserEmail()})
      Tenant ID: ${props.tenantId}
      
      Please provide:
      1. Financial metrics and KPIs
      3. Performance trends
      4. Key insights and recommendations
      5. Sales and Inventory data the things remaining etc 
      6. Internet search trends
      7. Any other relevant data points\
      8. ZRA and compliance status
      Explain the points for all users from different education levels to understand what you will give the use above
    `.trim();

    const response = await axios.post(`${API_BASE_URL}/ai-agents/query-yyyyyyyyyyyyyy`, { //non workin for now
      query,
      tenant_id: props.tenantId,
      thread_id: threadId,
      metadata: {
        user_email: getUserEmail(),
        user_name: getUserName(),
        timestamp: `${currentDate} ${timestamp}`
      }
    });

    if (response?.data) {
      report.value = response.data;
      // Only show popup after data is received
      visible.value = true;
      
      // Scroll to top of content after loading
      nextTick(() => {
        const contentDiv = document.querySelector('.markdown-content');
        if (contentDiv) contentDiv.scrollTop = 0;
      });
    } else {
      throw new Error('No data received from API');
    }
  } catch (error) {
    console.error('Failed to fetch report:', error);
    report.value = {
      answer: `
        **⚠️ Report Generation Error**
        
        We encountered an issue while generating your report. This might be due to:
        - Connection issues
        - Server unavailability
        - Data access restrictions
        
        Please try again in a few moments or contact support if the issue persists.
      `.trim(),
      popup_insights: {
        "Error Details": error.message || 'Unknown error occurred',
        "Time": new Date().toLocaleTimeString('en-ZM') // Added missing closing parenthesis
      },
      messages: []
    };
    // Show popup even with error message
    visible.value = true;
  } finally {
    loading.value = false;
  }
}

function close() {
  visible.value = false;
  report.value = {};
  emit('close');
}

// Update the formatContent function
function formatContent(text) {
  // Add type checking and conversion
  if (!text) return '';
  
  // Ensure text is a string
  const content = String(text);
  
  try {
    // Pre-process tables
    const processedText = content.split('\n').map(line => {
      if (!line || !line.startsWith('|')) return line;
      
      try {
        // Table row processing
        const cells = line.split('|').filter(cell => cell.trim());
        const isHeader = cells.some(cell => cell.includes('---'));
        
        if (isHeader) {
          return '<tr class="bg-gray-50 border-b-2 border-gray-200">' + 
            cells.map(cell => `<th class="px-4 py-2 text-left">${cell.trim().replace(/---/g, '')}</th>`).join('') + 
            '</tr>';
        }
        
        return '<tr class="border-b border-gray-100">' + 
          cells.map(cell => `<td class="px-4 py-2">${cell.trim()}</td>`).join('') + 
          '</tr>';
      } catch (e) {
        console.warn('Error processing table row:', e);
        return line;
      }
    }).join('\n');

    return processedText
      // Fix the header regex to include the capture group content
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-6 mb-2 text-gray-800">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-3 text-gray-900">$1</h2>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      
      // Lists
      .replace(/^\* (.*$)/gm, '<li class="flex items-start mb-2"><span class="mr-2">•</span>$1</li>')
      .replace(/^(\d+\. )(.*$)/gm, '<li class="flex items-start mb-2"><span class="mr-2 font-medium">$1</span>$2</li>')
      
      // Tables (wrap in table tags if not already wrapped)
      .replace(/(<tr.*?<\/tr>)/gs, (match) => 
        match.includes('<table') ? match : `<table class="min-w-full border-collapse">${match}</table>`
      )
      
      // Status indicators
      .replace(/✅/g, '<span class="text-green-600 font-bold">✅</span>')
      .replace(/⚠️/g, '<span class="text-yellow-600 font-bold">⚠️</span>')
      .replace(/🔴/g, '<span class="text-red-600 font-bold">🔴</span>')
      
      // Sections
      .replace(/^---$/gm, '<hr class="my-6 border-gray-200">')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  } catch (error) {
    console.error('Error formatting content:', error);
    // Return sanitized original text if formatting fails
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 2px;
}

/* Add Tailwind Typography styles */
:deep(.prose) {
  @apply text-gray-700;
}

:deep(.prose strong) {
  @apply text-gray-900 font-semibold;
}

:deep(.prose table) {
  @apply border-collapse my-4;
}

:deep(.prose td, .prose th) {
  @apply border px-3 py-2 text-sm;
}

:deep(.prose th) {
  @apply bg-gray-50 font-semibold;
}

/* Increased height for better readability */
.max-h-[400px] {
  max-height: 400px;
}

.markdown-content {
  @apply bg-white rounded-lg p-6 shadow-sm;
}

:deep(.markdown-content) {
  /* Tables */
  table {
    @apply min-w-full border border-gray-200 my-4 bg-white rounded-lg overflow-hidden;
  }
  
  /* Headers */
  h2 {
    @apply text-xl font-bold text-gray-900 border-b pb-2 mb-4;
  }
  
  h3 {
    @apply text-lg font-semibold text-gray-800 mb-3;
  }
  
  /* Lists */
  ul, ol {
    @apply pl-5 space-y-2 my-4;
  }
  
  /* Paragraphs */
  p {
    @apply text-gray-700 leading-relaxed mb-4;
  }
  
  /* Status badges */
  .status-badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  
  /* Horizontal rules */
  hr {
    @apply my-8 border-t border-gray-200;
  }
}

/* Responsive table container */
.overflow-x-auto {
  @apply -mx-6 px-6;
  scrollbar-width: thin;
}

/* Add these new styles */
.max-h-[90vh] {
  max-height: 90vh;
}

/* Improve scrollbar styling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Ensure table stays within bounds */
:deep(.markdown-content table) {
  @apply w-full table-fixed;
}

:deep(.markdown-content td) {
  @apply break-words;
}
</style>