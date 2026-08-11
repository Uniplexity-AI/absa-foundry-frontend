<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { fetchETLRunDetail } from '@/services/etlApi'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref(null)

const runId = computed(() => route.params.runId || '—')

// ── Data from API ──
const batch = ref(null)
const validation = ref(null)

// ── Derived data ──
const rejectionCategories = computed(() => {
  if (!validation.value?.errorByCategory) return []
  return Object.entries(validation.value.errorByCategory).map(([category, rejected]) => ({
    category,
    rejected,
    pct: validation.value.totalErrors ? Math.round((rejected / validation.value.totalErrors) * 1000) / 10 : 0,
  }))
})

const failingRules = computed(() => {
  if (!validation.value?.errorByRule) return []
  return Object.entries(validation.value.errorByRule)
    .map(([ruleId, failures]) => ({ ruleId, failures }))
    .sort((a, b) => b.failures - a.failures)
})

// ── Mock timeline / rejection records (backend doesn't expose these yet) ──
const timeline = ref([
  { step: 'Extract Data', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Validate Schema', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Transform', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Validate Quality', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Load to Warehouse', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Complete', status: 'COMPLETED', duration: null, timestamp: '—', detail: null },
])

const rejectedRecords = ref([])
const showConfig = ref(false)
const activeTab = ref('rejected')

// ── Derived: logs & audit from batch data ──
const logs = computed(() => {
  if (!batch.value) return []
  const entries = []
  if (batch.value.startedAt) {
    entries.push({ timestamp: batch.value.startedAt, level: 'INFO', component: 'pipeline', message: `Pipeline started — triggered by ${batch.value.triggeredBy || 'unknown'}` })
  }
  if (batch.value.sourceName) {
    entries.push({ timestamp: batch.value.startedAt || '—', level: 'INFO', component: 'extractor', message: `Source: ${batch.value.sourceName} (${batch.value.sourceType || 'unknown'})` })
  }
  entries.push({ timestamp: '—', level: 'INFO', component: 'processor', message: `Rows received: ${formatNum(batch.value.rowsReceived)}, valid: ${formatNum(batch.value.rowsValid)}, loaded: ${formatNum(batch.value.rowsLoaded)}` })
  if (batch.value.rowsRejected > 0) {
    entries.push({ timestamp: '—', level: 'WARN', component: 'quality', message: `${formatNum(batch.value.rowsRejected)} rows rejected — quality ${batch.value.qualityScore != null ? batch.value.qualityScore + '%' : '—'}` })
  }
  if (batch.value.duplicatesDetected > 0) {
    entries.push({ timestamp: '—', level: 'WARN', component: 'dedup', message: `${formatNum(batch.value.duplicatesDetected)} duplicates detected` })
  }
  if (batch.value.completedAt) {
    const statusLevel = batch.value.status === 'FAILED' || batch.value.status === 'ERROR' ? 'ERROR' : 'INFO'
    entries.push({ timestamp: batch.value.completedAt, level: statusLevel, component: 'pipeline', message: `Run ${batch.value.status || 'COMPLETED'} — duration ${batch.value.duration || '—'}` })
  }
  return entries
})

const auditTrail = computed(() => {
  if (!batch.value) return []
  const entries = []
  entries.push({ timestamp: batch.value.startedAt ? batch.value.startedAt.slice(11, 19) : '—', user: batch.value.triggeredBy || 'system', action: 'TRIGGER', description: `Pipeline triggered — ${batch.value.pipelineName || 'etl_full_pipeline'}` })
  entries.push({ timestamp: batch.value.startedAt ? batch.value.startedAt.slice(11, 19) : '—', user: 'system', action: 'EXTRACT', description: `Extraction started — source: ${batch.value.sourceName || 'unknown'}` })
  if (batch.value.completedAt) {
    entries.push({ timestamp: batch.value.completedAt.slice(11, 19), user: 'system', action: batch.value.status || 'COMPLETE', description: `Run ${batch.value.status || 'COMPLETED'} — ${formatNum(batch.value.rowsLoaded)} rows loaded, ${formatNum(batch.value.rowsRejected)} rejected, quality ${batch.value.qualityScore != null ? batch.value.qualityScore + '%' : '—'}` })
  }
  return entries
})

const configName = ref('—')
const configContent = ref('')
const configLines = computed(() => configContent.value.split('\n'))

// ── Status helpers ──
function statusClass(status) {
  if (!status) return 'text-on-surface-variant'
  const s = status.toUpperCase()
  return s === 'COMPLETED' ? 'text-green-600' : s === 'FAILED' || s === 'ERROR' ? 'text-red-600' : 'text-amber-600'
}
function logBadgeClass(level) {
  if (!level) return 'text-on-surface-variant'
  return level === 'ERROR' ? 'text-red-600' : level === 'WARN' ? 'text-amber-600' : 'text-green-600'
}
function formatNum(n) {
  if (n == null) return '—'
  return Number(n).toLocaleString()
}

onMounted(async () => {
  try {
    const data = await fetchETLRunDetail(runId.value)
    batch.value = data.run
    validation.value = data.validation || null

    // Update timeline statuses based on run status
    if (data.run.status === 'FAILED' || data.run.status === 'ERROR') {
      timeline.value[4].status = 'FAILED'
      timeline.value[4].detail = data.run.errorMessage || 'Batch failed'
      timeline.value[5].status = 'FAILED'
    }
    if (data.run.startedAt) {
      timeline.value[0].timestamp = data.run.startedAt
    }
    if (data.run.completedAt) {
      timeline.value[5].timestamp = data.run.completedAt
    }
    if (data.run.duration) {
      timeline.value[0].duration = data.run.duration
    }
    if (data.run.pipelineName) {
      timeline.value.forEach(t => { t.pipeline = data.run.pipelineName })
    }
    if (data.run.sourceName) {
      timeline.value[0].detail = `Source: ${data.run.sourceName}`
    }

    // Config name
    if (data.run.sourceName) {
      configName.value = data.run.sourceName
    }
  } catch (e) {
    error.value = e.message || 'Failed to load batch detail'
    console.error('[BatchDetail] fetch failed:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-8">
        <LoadingSkeleton type="kpi" />
        <div class="grid grid-cols-4 gap-4"><LoadingSkeleton v-for="i in 4" :key="i" type="kpi" /></div>
        <LoadingSkeleton type="block" />
        <LoadingSkeleton type="table" :count="5" />
      </div>
    </template>

    <template v-else>
      <!-- Error State -->
      <div v-if="error" class="bg-surface rounded border border-outline-variant p-8 text-center">
        <p class="text-body-md text-red-600 mb-2">{{ error }}</p>
        <button @click="router.push('/dashboard/etl-run-history')" class="text-sm text-primary font-semibold hover:underline">← Back to Run History</button>
      </div>

      <template v-else-if="batch">
      <!-- ═══ SECTION 1: Header ═══ -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <button @click="router.push('/dashboard/etl-run-history')" class="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-semibold">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            Run History
          </button>
          <span class="text-on-surface-variant">/</span>
          <span class="font-mono text-sm text-on-surface font-bold">{{ batch.runId || runId }}</span>
          <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', statusClass(batch.status)]">
            <span v-if="batch.status === 'RUNNING'" class="w-1.5 h-1.5 rounded-full animate-pulse bg-amber-500"></span>
            <span v-if="batch.status === 'COMPLETED'" class="material-symbols-outlined text-[14px]">check</span>
            <span v-if="batch.status === 'FAILED' || batch.status === 'ERROR'" class="material-symbols-outlined text-[14px]">close</span>
            {{ batch.status || 'UNKNOWN' }}
          </span>
        </div>
        <div class="text-sm text-on-surface-variant text-right">
          <div>{{ batch.pipelineName || '—' }}</div>
          <div>triggered by {{ batch.triggeredBy || '—' }} · {{ batch.startedAt ? batch.startedAt.slice(0, 10) : '—' }}</div>
        </div>
      </div>

      <!-- ═══ SECTION 2: Run Snapshot ═══ -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Quality Score -->
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Quality Score</p>
          <span class="text-3xl font-headline font-bold text-on-surface">{{ batch.qualityScore != null ? batch.qualityScore + '%' : '—' }}</span>
          <p class="text-xs text-on-surface-variant mt-2">SLA: {{ batch.slaThreshold }}%
            <span v-if="batch.qualityScore != null && batch.qualityScore >= batch.slaThreshold" class="text-green-600 font-semibold ml-1">✓</span>
            <span v-else-if="batch.qualityScore != null" class="text-red-600 font-semibold ml-1">✗</span>
          </p>
        </div>

        <!-- Duration -->
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Duration</p>
          <span class="text-3xl font-headline font-bold text-on-surface">{{ batch.duration || '—' }}</span>
          <p class="text-xs text-on-surface-variant mt-2">Started {{ batch.startedAt ? batch.startedAt.slice(11, 19) : '—' }} · Ended {{ batch.completedAt ? batch.completedAt.slice(11, 19) : '—' }}</p>
        </div>

        <!-- Rows Processed -->
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Rows Processed</p>
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Received</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.rowsReceived) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Valid</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.rowsValid) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Loaded</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.rowsLoaded) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[#FF780F]">Rejected</span>
              <span class="text-[#FF780F] font-semibold">{{ formatNum(batch.rowsRejected) }}</span>
            </div>
          </div>
        </div>

        <!-- Data Quality -->
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Data Quality</p>
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Duplicates</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.duplicatesDetected) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Warnings</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.warningsCount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Errors</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.errorsCount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">Skipped</span>
              <span class="text-on-surface font-semibold">{{ formatNum(batch.rowsSkipped) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 3: Execution Timeline ═══ -->
      <section class="mb-8">
        <div class="bg-surface rounded border border-outline-variant p-6 global-dotted-bg shadow-sm">
          <h3 class="text-headline-md font-headline font-semibold text-on-surface mb-6">Execution Timeline</h3>
          <div class="space-y-0">
            <div v-for="(step, i) in timeline" :key="i">
              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center">
                  <span :class="['w-3 h-3 rounded-full mt-1 flex-shrink-0',
                    step.status === 'COMPLETED' ? 'bg-green-500' : step.status === 'FAILED' ? 'bg-red-500' : 'bg-gray-300']"></span>
                  <div v-if="i < timeline.length - 1" class="w-px h-full min-h-[20px] bg-outline-variant mt-1"></div>
                </div>
                <div class="pb-5 flex-1">
                  <div class="flex justify-between items-start">
                    <span class="font-semibold text-on-surface text-sm">{{ step.step }}</span>
                    <span class="text-xs text-on-surface-variant">{{ step.duration ? step.duration + ' · ' : '' }}{{ step.timestamp }}</span>
                  </div>
                  <p v-if="step.detail" :class="['text-xs mt-1', step.status === 'FAILED' ? 'text-red-600' : 'text-on-surface-variant']">{{ step.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 4: Rejection Analysis ═══ -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Rejection by Category -->
        <div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
          <div class="p-5 bg-surface">
            <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Rejection by Category</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Category</th>
                  <th class="p-4 font-semibold text-right">Rejected</th>
                  <th class="p-4 font-semibold text-right">% of Total</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="rejectionCategories.length === 0">
                  <td colspan="3" class="p-12 text-center text-body-md text-secondary">No rejection data available</td>
                </tr>
                <tr v-for="cat in rejectionCategories" :key="cat.category" class="hover:bg-surface-container-low transition-colors">
                  <td class="p-4 text-on-surface font-semibold">{{ cat.category }}</td>
                  <td class="p-4 text-on-surface-variant text-right">{{ formatNum(cat.rejected) }}</td>
                  <td class="p-4 text-on-surface-variant text-right">{{ cat.pct }}%</td>
                </tr>
                <tr v-if="rejectionCategories.length > 0" class="bg-surface-container-low font-semibold">
                  <td class="p-4 text-on-surface">Total</td>
                  <td class="p-4 text-on-surface text-right">{{ formatNum(batch.rowsRejected) }}</td>
                  <td class="p-4 text-on-surface text-right">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top Failing Rules -->
        <div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
          <div class="p-5 bg-surface">
            <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Top Failing Rules</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Rule ID</th>
                  <th class="p-4 font-semibold text-right">Failures</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="failingRules.length === 0">
                  <td colspan="2" class="p-12 text-center text-body-md text-secondary">No failing rules</td>
                </tr>
                <tr v-for="rule in failingRules" :key="rule.ruleId" class="hover:bg-surface-container-low transition-colors">
                  <td class="p-4 font-mono text-xs text-on-surface font-semibold">{{ rule.ruleId }}</td>
                  <td class="p-4 text-on-surface-variant text-right">{{ formatNum(rule.failures) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 5: Investigation Tabs ═══ -->
      <section class="mb-8">
        <div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
          <div class="p-5 bg-surface">
            <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold mb-4">Investigation</h3>
            <div class="flex border-b border-outline-variant mb-0">
              <button @click="activeTab = 'rejected'" :class="['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab === 'rejected' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface']">
                Rejected Records ({{ rejectedRecords.length }})
              </button>
              <button @click="activeTab = 'logs'" :class="['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab === 'logs' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface']">
                Execution Logs ({{ logs.length }})
              </button>
              <button @click="activeTab = 'audit'" :class="['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab === 'audit' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface']">
                Audit Trail ({{ auditTrail.length }})
              </button>
            </div>
          </div>

          <!-- Rejected Records -->
          <div v-if="activeTab === 'rejected'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Record ID</th>
                  <th class="p-4 font-semibold">Field</th>
                  <th class="p-4 font-semibold">Actual Value</th>
                  <th class="p-4 font-semibold">Expected</th>
                  <th class="p-4 font-semibold">Rule</th>
                  <th class="p-4 font-semibold">Severity</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="rejectedRecords.length === 0">
                  <td colspan="6" class="p-12 text-center text-body-md text-secondary">No rejected records</td>
                </tr>
                <tr v-for="rec in rejectedRecords" :key="rec.recordId" class="hover:bg-surface-container-low transition-colors">
                  <td class="p-4 font-mono text-xs text-on-surface">{{ rec.recordId }}</td>
                  <td class="p-4 font-mono text-xs text-on-surface-variant">{{ rec.field }}</td>
                  <td class="p-4 text-on-surface-variant">{{ rec.actualValue }}</td>
                  <td class="p-4 text-on-surface-variant">{{ rec.expected }}</td>
                  <td class="p-4 font-mono text-xs text-on-surface-variant">{{ rec.rule }}</td>
                  <td class="p-4">
                    <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', rec.severity === 'ERROR' ? 'text-red-600' : 'text-amber-600']">
                      <span :class="['w-1.5 h-1.5 rounded-full', rec.severity === 'ERROR' ? 'bg-red-500' : 'bg-amber-500']"></span>
                      {{ rec.severity }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Execution Logs -->
          <div v-if="activeTab === 'logs'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Timestamp</th>
                  <th class="p-4 font-semibold">Level</th>
                  <th class="p-4 font-semibold">Component</th>
                  <th class="p-4 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="logs.length === 0">
                  <td colspan="4" class="p-12 text-center text-body-md text-secondary">No logs recorded</td>
                </tr>
                <tr v-for="l in logs" :key="l.timestamp" class="hover:bg-surface-container-low transition-colors">
                  <td class="p-4 font-mono text-xs text-on-surface-variant">{{ l.timestamp }}</td>
                  <td class="p-4">
                    <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', logBadgeClass(l.level)]">
                      <span :class="['w-1.5 h-1.5 rounded-full', l.level === 'ERROR' ? 'bg-red-500' : l.level === 'WARN' ? 'bg-amber-500' : 'bg-green-500']"></span>
                      {{ l.level }}
                    </span>
                  </td>
                  <td class="p-4 font-mono text-xs text-on-surface-variant">{{ l.component }}</td>
                  <td class="p-4 text-on-surface">{{ l.message }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Audit Trail -->
          <div v-if="activeTab === 'audit'" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Timestamp</th>
                  <th class="p-4 font-semibold">User / System</th>
                  <th class="p-4 font-semibold">Action</th>
                  <th class="p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="auditTrail.length === 0">
                  <td colspan="4" class="p-12 text-center text-body-md text-secondary">No audit entries</td>
                </tr>
                <tr v-for="a in auditTrail" :key="a.timestamp" class="hover:bg-surface-container-low transition-colors">
                  <td class="p-4 font-mono text-xs text-on-surface-variant">{{ a.timestamp }}</td>
                  <td class="p-4 text-on-surface-variant">{{ a.user }}</td>
                  <td class="p-4 font-semibold text-on-surface">{{ a.action }}</td>
                  <td class="p-4 text-on-surface-variant">{{ a.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ═══ SECTION 6: Config Snapshot ═══ -->
      <section class="mb-8">
        <div class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm overflow-hidden">
          <button @click="showConfig = !showConfig" class="w-full p-5 flex items-center justify-between bg-surface hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-on-surface-variant text-[20px]">{{ showConfig ? 'expand_less' : 'expand_more' }}</span>
              <div class="text-left">
                <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Config Used</h3>
                <p class="text-sm text-on-surface-variant">{{ configName }}</p>
              </div>
            </div>
          </button>
          <div v-if="showConfig" class="border-t border-outline-variant flex font-mono text-[13px] leading-[1.6]">
            <div class="w-12 flex-shrink-0 text-right pr-4 text-on-surface-variant bg-surface-container-low select-none py-4 border-r border-outline-variant">
              <template v-for="(_, i) in configLines" :key="i">{{ i + 1 }}<br /></template>
            </div>
            <div class="p-4 whitespace-pre text-on-surface overflow-x-auto font-medium">
              <template v-for="(line, i) in configLines" :key="i">
                <span class="text-primary font-bold">{{ line.match(/^\s*\w+/) ? line.match(/^\s*\w+/)[0] : '' }}</span><span>{{ line.replace(/^\s*\w+/, '') }}</span><br />
              </template>
            </div>
          </div>
        </div>
      </section>
      </template>
    </template>
  </div>
</template>
