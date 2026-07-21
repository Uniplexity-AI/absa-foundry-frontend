<template>
  <AdminPageWrapper
    title="System Traces"
    subtitle="Monitor system performance and distributed tracing"
    icon="fas fa-network-wired"
  >
    <template #actions>
      <button 
        @click="fetchTraces" 
        class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 active:scale-95"
      >
        <i class="fas fa-sync-alt" :class="{'animate-spin': loading}"></i>
        REFRESH_DATA
      </button>
    </template>

    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
      <!-- Total Traces -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-none overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 text-[#2F2E8B] rounded-none">
            <i class="fas fa-list text-lg"></i>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-black text-gray-900 tracking-tight font-display mb-1">{{ filteredTraces.length }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Filtered Traces</p>
        </div>
      </div>

      <!-- Avg Duration -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-none overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
         <div class="flex justify-between items-start mb-4">
          <div class="p-2 text-[#2F2E8B] rounded-none">
            <i class="fas fa-clock text-lg"></i>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-black text-gray-900 tracking-tight font-display mb-1">{{ avgDuration }}ms</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Avg Latency</p>
        </div>
      </div>

      <!-- Slow Traces -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-none overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
         <div class="flex justify-between items-start mb-4">
          <div class="p-2 text-amber-600 rounded-none">
            <i class="fas fa-exclamation-triangle text-lg"></i>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-black text-gray-900 tracking-tight font-display mb-1">{{ slowTracesCount }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Slow Requests (>1s)</p>
        </div>
      </div>

      <!-- DB Operations -->
      <div class="bg-white p-6 border border-gray-200 shadow-sm relative group hover:border-[#2F2E8B] transition-colors rounded-none overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
         <div class="flex justify-between items-start mb-4">
          <div class="p-2 text-green-600 rounded-none">
            <i class="fas fa-database text-lg"></i>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-black text-gray-900 tracking-tight font-display mb-1">{{ dbOpsCount }}</h3>
          <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">DB Operations</p>
        </div>
      </div>
    </div>

    <!-- Traces List -->
    <div class="bg-white border border-gray-200 shadow-sm mb-8 relative z-10 rounded-none">
        <div class="p-4 border-b border-gray-200 bg-gray-50">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-sm font-bold font-mono uppercase tracking-widest text-gray-600">
                    <i class="fas fa-terminal mr-2"></i> Recent Activity Log
                </h3>
                <div class="flex gap-2">
                    <input 
                      type="text" 
                      v-model="searchQuery" 
                      placeholder="SEARCH_TRACE_ID..." 
                      class="bg-white border border-gray-300 text-xs font-mono p-2 w-64 rounded-none focus:outline-none focus:border-[#2F2E8B]"
                    >
                </div>
            </div>

            <!-- Advanced Filters -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 border border-gray-200 rounded-none">
                <!-- Service Filter -->
                <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Service</label>
                    <select v-model="filters.service" class="w-full bg-white border border-gray-300 text-xs font-mono p-2 rounded-none focus:outline-none focus:border-[#2F2E8B]">
                        <option value="">ALL_SERVICES</option>
                        <option v-for="svc in uniqueServices" :key="svc" :value="svc">{{ svc }}</option>
                    </select>
                </div>

                <!-- Latency Filter -->
                <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Latency</label>
                    <select v-model="filters.latency" class="w-full bg-white border border-gray-300 text-xs font-mono p-2 rounded-none focus:outline-none focus:border-[#2F2E8B]">
                        <option value="">ALL_LATENCY</option>
                        <option value="fast">&lt; 100ms (Fast)</option>
                        <option value="normal">100-500ms (Normal)</option>
                        <option value="slow">500-1000ms (Slow)</option>
                        <option value="critical">&gt; 1000ms (Critical)</option>
                    </select>
                </div>

                <!-- HTTP Method Filter -->
                <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Method</label>
                    <select v-model="filters.method" class="w-full bg-white border border-gray-300 text-xs font-mono p-2 rounded-none focus:outline-none focus:border-[#2F2E8B]">
                        <option value="">ALL_METHODS</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                </div>

                <!-- Time Range Filter -->
                <div>
                    <label class="block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Time Range</label>
                    <select v-model="filters.timeRange" class="w-full bg-white border border-gray-300 text-xs font-mono p-2 rounded-none focus:outline-none focus:border-[#2F2E8B]">
                        <option value="all">ALL_TIME</option>
                        <option value="5m">Last 5 Min</option>
                        <option value="15m">Last 15 Min</option>
                        <option value="1h">Last 1 Hour</option>
                        <option value="24h">Last 24 Hours</option>
                    </select>
                </div>
            </div>

            <!-- Filter Summary -->
            <div v-if="activeFiltersCount > 0" class="mt-3 flex items-center gap-2">
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Filters:</span>
                <span class="px-2 py-1 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold rounded-none">{{ activeFiltersCount }}</span>
                <button @click="clearFilters" class="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[9px] font-mono font-bold rounded-none uppercase tracking-wider">
                    <i class="fas fa-times mr-1"></i> Clear
                </button>
            </div>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        <th class="p-4 border-r border-gray-100 w-48">Timestamp</th>
                        <th class="p-4 border-r border-gray-100">Service / Operation</th>
                        <th class="p-4 border-r border-gray-100 w-32">Method</th>
                         <th class="p-4 border-r border-gray-100 w-32">Status</th>
                        <th class="p-4 w-32 text-right">Duration</th>
                         <th class="p-4 w-24 text-center">Action</th>
                    </tr>
                </thead>
                <tbody class="font-mono text-xs">
                    <tr v-if="loading" class="animate-pulse">
                         <td colspan="6" class="p-4 text-center text-gray-400">LOADING_DATA_STREAM...</td>
                    </tr>
                    <tr v-else-if="filteredTraces.length === 0">
                        <td colspan="6" class="p-8 text-center text-gray-400">NO_TRACES_FOUND</td>
                    </tr>
                    <template v-for="trace in filteredTraces" :key="trace.trace_id">
                         <tr 
                            class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                            @click="toggleExpand(trace.trace_id)"
                        >
                            <td class="p-4 border-r border-gray-100 text-gray-600 group-hover:text-[#2F2E8B]">
                                {{ formatDate(trace.timestamp) }}
                            </td>
                            <td class="p-4 border-r border-gray-100 font-bold text-gray-800">
                                <div class="flex flex-col">
                                    <span class="text-[#2F2E8B]">{{ trace.service }}</span>
                                    <span class="text-gray-500 font-normal text-[10px]">{{ trace.operation }}</span>
                                </div>
                            </td>
                             <td class="p-4 border-r border-gray-100">
                                <span v-if="trace.metadata && trace.metadata.method" class="px-2 py-1 bg-gray-100 border border-gray-200 rounded-none text-[10px]">
                                    {{ trace.metadata.method }}
                                </span>
                                <span v-else class="text-gray-300">-</span>
                            </td>
                             <td class="p-4 border-r border-gray-100">
                                 <span 
                                    class="px-2 py-1 rounded-none text-[10px] font-bold border"
                                    :class="getStatusClass(trace)"
                                 >
                                    {{ getStatusLabel(trace) }}
                                 </span>
                            </td>
                            <td class="p-4 text-right font-bold" :class="getDurationClass(trace.duration_ms)">
                                {{ trace.duration_ms ? trace.duration_ms.toFixed(2) : '0.00' }}ms
                            </td>
                             <td class="p-4 text-center">
                                <i class="fas" :class="expandedTraceId === trace.trace_id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                            </td>
                        </tr>
                        <!-- Expanded Details -->
                        <tr v-if="expandedTraceId === trace.trace_id" class="bg-gray-50 border-b border-gray-200">
                            <td colspan="6" class="p-4">
                                <div class="grid grid-cols-2 gap-4 text-xs mb-4">
                                    <div>
                                        <h4 class="font-bold text-gray-900 mb-2 uppercase tracking-wide">Trace Details</h4>
                                        <div class="space-y-1 text-gray-600">
                                            <div class="flex gap-2">
                                                <span class="w-24 text-gray-400">TRACE_ID:</span>
                                                <span class="font-mono">{{ trace.trace_id }}</span>
                                            </div>
                                             <div class="flex gap-2">
                                                <span class="w-24 text-gray-400">SPAN_ID:</span>
                                                <span class="font-mono">{{ trace.span_id }}</span>
                                            </div>
                                             <div class="flex gap-2">
                                                <span class="w-24 text-gray-400">PARENT_ID:</span>
                                                <span class="font-mono">{{ trace.parent_span_id || 'ROOT' }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                         <h4 class="font-bold text-gray-900 mb-2 uppercase tracking-wide">Tags & Metadata</h4>
                                         <pre class="bg-gray-100 p-2 border border-gray-200 overflow-x-auto text-[10px] text-gray-700 font-mono">{{ JSON.stringify(trace.metadata, null, 2) }}</pre>
                                    </div>
                                </div>

                                <!-- Performance Breakdown Section (for slow traces) -->
                                <div v-if="trace.duration_ms > 500" class="mt-4 border-t border-gray-300 pt-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <h4 class="font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                            <i class="fas fa-chart-bar text-amber-600"></i>
                                            Performance Breakdown
                                        </h4>
                                        <button 
                                            v-if="!traceBreakdowns[trace.trace_id]"
                                            @click="loadBreakdown(trace.trace_id)"
                                            :disabled="loadingBreakdown === trace.trace_id"
                                            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-3 py-1 rounded-none text-[10px] font-bold font-mono uppercase shadow-sm transition-all flex items-center gap-2"
                                        >
                                            <i class="fas" :class="loadingBreakdown === trace.trace_id ? 'fa-spinner fa-spin' : 'fa-search'"></i>
                                            {{ loadingBreakdown === trace.trace_id ? 'ANALYZING...' : 'ANALYZE_LATENCY' }}
                                        </button>
                                    </div>

                                    <!-- Breakdown Results -->
                                    <div v-if="traceBreakdowns[trace.trace_id]" class="bg-white border border-gray-200 rounded-none">
                                        <div v-if="traceBreakdowns[trace.trace_id].children && traceBreakdowns[trace.trace_id].children.length > 0">
                                            <div class="bg-gray-100 px-3 py-2 border-b border-gray-200 font-mono text-[10px] text-gray-500 uppercase tracking-wide">
                                                Time Distribution
                                            </div>
                                            <div class="divide-y divide-gray-100">
                                                <div 
                                                    v-for="child in traceBreakdowns[trace.trace_id].children" 
                                                    :key="child.span_id"
                                                    class="p-3 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div class="flex justify-between items-center mb-2">
                                                        <div class="flex items-center gap-2">
                                                            <span class="text-[10px] font-bold px-2 py-1 rounded-none" :class="getServiceBadgeClass(child.service)">
                                                                {{ child.service }}
                                                            </span>
                                                            <span class="text-xs font-mono text-gray-700">{{ child.operation }}</span>
                                                        </div>
                                                        <div class="flex items-center gap-3">
                                                            <span class="text-xs font-bold" :class="getDurationClass(child.duration_ms)">
                                                                {{ child.duration_ms.toFixed(2) }}ms
                                                            </span>
                                                            <span class="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-none">
                                                                {{ child.percentage }}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <!-- Progress bar showing percentage -->
                                                    <div class="w-full h-1.5 bg-gray-100 rounded-none overflow-hidden">
                                                        <div 
                                                            class="h-full transition-all" 
                                                            :class="getLatencyBarColor(child.duration_ms)"
                                                            :style="{ width: child.percentage + '%' }"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="p-4 text-center text-xs text-gray-400 font-mono">
                                            No detailed breakdown available. This may be a simple request with no child operations.
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

  </AdminPageWrapper>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import AdminPageWrapper from './components/AdminPageWrapper.vue';
import { systemTracesApi } from '@/api_services/system_traces_api';

const loading = ref(false);
const traces = ref([]);
const searchQuery = ref('');
const expandedTraceId = ref(null);
const loadingBreakdown = ref(null);
const traceBreakdowns = reactive({});

// Filter states - using reactive for better reactivity with object properties
const filters = reactive({
    service: '',
    latency: '',
    method: '',
    timeRange: 'all'
});

// Compute unique services for filter dropdown
const uniqueServices = computed(() => {
    const services = new Set(traces.value.map(t => t.service));
    return Array.from(services).sort();
});

const avgDuration = computed(() => {
    if (filteredTraces.value.length === 0) return 0;
    const total = filteredTraces.value.reduce((acc, t) => acc + (t.duration_ms || 0), 0);
    return (total / filteredTraces.value.length).toFixed(2);
});

const slowTracesCount = computed(() => {
    return filteredTraces.value.filter(t => (t.duration_ms || 0) > 1000).length;
});

const dbOpsCount = computed(() => {
    return filteredTraces.value.filter(t => t.service === 'MongoDB').length;
});

const activeFiltersCount = computed(() => {
    let count = 0;
    if (filters.service) count++;
    if (filters.latency) count++;
    if (filters.method) count++;
    if (filters.timeRange !== 'all') count++;
    return count;
});

const filteredTraces = computed(() => {
    let result = traces.value;

    // Text search
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(t => 
            t.trace_id?.toLowerCase().includes(query) || 
            t.operation?.toLowerCase().includes(query) ||
            t.service?.toLowerCase().includes(query)
        );
    }

    // Service filter
    if (filters.service) {
        result = result.filter(t => t.service === filters.service);
    }

    // Latency filter
    if (filters.latency) {
        result = result.filter(t => {
            const duration = t.duration_ms || 0;
            switch(filters.latency) {
                case 'fast': return duration < 100;
                case 'normal': return duration >= 100 && duration < 500;
                case 'slow': return duration >= 500 && duration < 1000;
                case 'critical': return duration >= 1000;
                default: return true;
            }
        });
    }

    // HTTP Method filter
    if (filters.method) {
        result = result.filter(t => t.metadata?.method === filters.method);
    }

    // Time range filter
    if (filters.timeRange !== 'all') {
        const now = new Date();
        const cutoff = new Date();
        
        switch(filters.timeRange) {
            case '5m':
                cutoff.setMinutes(now.getMinutes() - 5);
                break;
            case '15m':
                cutoff.setMinutes(now.getMinutes() - 15);
                break;
            case '1h':
                cutoff.setHours(now.getHours() - 1);
                break;
            case '24h':
                cutoff.setHours(now.getHours() - 24);
                break;
        }
        
        result = result.filter(t => {
            if (!t.timestamp) return false;
            const traceTime = new Date(t.timestamp);
            return traceTime >= cutoff;
        });
    }

    return result;
});

const clearFilters = () => {
    filters.service = '';
    filters.latency = '';
    filters.method = '';
    filters.timeRange = 'all';
    searchQuery.value = '';
};

const fetchTraces = async () => {
    loading.value = true;
    try {
        const data = await systemTracesApi.getRecentTraces(100);
        traces.value = data;
    } catch (err) {
        console.error("Failed to load traces", err);
    } finally {
        loading.value = false;
    }
};

const toggleExpand = (traceId) => {
    expandedTraceId.value = expandedTraceId.value === traceId ? null : traceId;
};

const loadBreakdown = async (traceId) => {
    loadingBreakdown.value = traceId;
    try {
        const breakdown = await systemTracesApi.getTraceBreakdown(traceId);
        traceBreakdowns[traceId] = breakdown;
    } catch (err) {
        console.error(`Failed to load breakdown for trace ${traceId}`, err);
        traceBreakdowns[traceId] = { error: true };
    } finally {
        loadingBreakdown.value = null;
    }
};

const formatDate = (isoString) => {
    if (!isoString) return '-';
    // Format: YYYY-MM-DD HH:MM:SS
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');
};

const getStatusLabel = (trace) => {
    if (trace.metadata && trace.metadata.status_code) {
        return `HTTP ${trace.metadata.status_code}`;
    }
    return trace.status || 'OK';
};

const getStatusClass = (trace) => {
    const status = trace.metadata && trace.metadata.status_code;
    if (status >= 500) return 'bg-red-50 text-red-600 border-red-200';
    if (status >= 400) return 'bg-amber-50 text-amber-600 border-amber-200';
    return 'bg-green-50 text-green-600 border-green-200';
};

const getDurationClass = (duration) => {
    if (duration > 1000) return 'text-red-600';
    if (duration > 500) return 'text-amber-600';
    return 'text-gray-800';
};

const getLatencyBarColor = (duration) => {
    if (duration > 1000) return 'bg-red-500';
    if (duration > 500) return 'bg-amber-500';
    if (duration > 100) return 'bg-blue-400';
    return 'bg-green-500';
};

const getServiceBadgeClass = (service) => {
    const serviceClasses = {
        'MongoDB': 'bg-green-100 text-green-700 border border-green-300',
        'Logic': 'bg-blue-100 text-blue-700 border border-blue-300',
        'POS Service': 'bg-purple-100 text-purple-700 border border-purple-300',
        'Inventory Service': 'bg-indigo-100 text-indigo-700 border border-indigo-300',
        'Auth Service': 'bg-pink-100 text-pink-700 border border-pink-300',
        'API Gateway': 'bg-gray-100 text-gray-700 border border-gray-300'
    };
    return serviceClasses[service] || 'bg-gray-100 text-gray-700 border border-gray-300';
};

onMounted(() => {
    fetchTraces();
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
      linear-gradient(rgba(47, 46, 139, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(47, 46, 139, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dotted-pattern {
  background-image: radial-gradient(#000 1px, transparent 0);
  background-size: 8px 8px;
}
</style>
