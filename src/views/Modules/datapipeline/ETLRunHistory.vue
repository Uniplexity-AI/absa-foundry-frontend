<template>
  <div class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-8">
        <div class="flex justify-end">
          <LoadingSkeleton type="kpi" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <LoadingSkeleton v-for="i in 4" :key="i" type="kpi" />
        </div>
        <LoadingSkeleton type="block" />
        <LoadingSkeleton type="table" :count="5" />
      </div>
    </template>
    <template v-else>
    <!-- Action Buttons -->
    <div class="flex items-center justify-end gap-3 mb-8">
          <button class="px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded flex items-center gap-2 hover:bg-surface-container-low transition-colors font-label text-sm font-semibold shadow-sm">
            <span class="material-symbols-outlined text-[18px]" data-icon="download">download</span>
            Export Logs
          </button>
          <button class="px-4 py-2 bg-primary text-on-primary rounded flex items-center gap-2 hover:bg-primary-container transition-colors font-label text-sm font-semibold shadow-sm">
            <span class="material-symbols-outlined text-[18px]" data-icon="play_arrow">play_arrow</span>
            Trigger Manual Run
          </button>
        </div>

      <!-- Data Pipeline Health Section -->
      <h2 class="text-headline-lg font-headline font-bold mb-4 text-on-surface">Data Pipeline Health</h2>
      <div id="health-trend-container" class="relative w-full grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 h-auto min-h-fit block md:grid">
        <div id="health-column" class="relative lg:col-span-1 flex flex-col gap-4 w-full h-auto min-h-[220px]">
          <div class="flex flex-col gap-4 w-full">
            <div v-if="pipelineHealth.length === 0" class="bg-surface rounded border border-outline-variant p-5 text-center text-body-md text-secondary">No health data available</div>
            <div v-for="svc in pipelineHealth" :key="svc.name" class="bg-surface rounded border border-outline-variant p-5 global-dotted-bg shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">{{ svc.icon }}</span>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-1">{{ svc.name }}</p>
                  <p class="text-lg font-headline font-bold text-on-surface">{{ svc.status }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="w-3 h-3 rounded-full bg-[#FF780F] mb-1"></span>
                <span class="text-xs text-[#FF780F] font-semibold">{{ svc.metric }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="trend-column" class="relative lg:col-span-3 flex flex-col w-full h-auto min-h-[220px]">
          <div class="bg-surface rounded border border-outline-variant p-6 global-dotted-bg shadow-sm w-full h-auto min-h-[220px] flex flex-col justify-between">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-headline-md font-headline font-semibold text-on-surface">Quality Score Trend</h3>
              <div class="flex gap-2 bg-surface-container-low p-1 rounded border border-outline-variant">
                <button class="px-3 py-1 text-xs font-semibold rounded bg-surface shadow-sm">24 HOURS</button>
                <button class="px-3 py-1 text-xs font-semibold rounded text-on-surface-variant">7 DAYS</button>
              </div>
            </div>
            <div class="h-48 w-full relative mb-4">
              <div v-if="qualityTrendData.length === 0" class="flex items-center justify-center h-full text-body-md text-secondary">No trend data available</div>
              <div v-else class="absolute inset-0 flex items-end gap-1">
                <div v-for="(val, i) in qualityTrendData" :key="i" class="w-full bg-primary rounded-t" :style="{ height: val + '%' }"></div>
              </div>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-outline-variant text-sm text-on-surface-variant">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-primary rounded-sm block"></span>
                <span class="font-semibold text-on-surface">Data Integrity Score: {{ dataIntegrityScore != null ? dataIntegrityScore : '—' }}</span>
              </div>
              <span>{{ lastScanTime ? 'Last scan: ' + lastScanTime : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <section class="mb-8">
        <div class="bg-surface rounded shadow-sm overflow-hidden global-dotted-bg">
          <div class="p-5 flex justify-between items-center bg-surface">
            <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Execution History</h3>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-on-surface-variant">Filter by:</span>
              <select class="border border-outline-variant rounded text-sm py-1 pl-2 pr-8 bg-surface">
                <option>All Statuses</option>
                <option>Running</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Run ID</th>
                  <th class="p-4 font-semibold">Batch ID</th>
                  <th class="p-4 font-semibold">Duration</th>
                  <th class="p-4 font-semibold">Rows (RCV/VAL/LD/REJ)</th>
                  <th class="p-4 font-semibold">Quality Score</th>
                  <th class="p-4 font-semibold">Status</th>
                  <th class="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="executionRuns.length === 0">
                  <td colspan="7" class="p-12 text-center text-body-md text-secondary">No execution runs recorded</td>
                </tr>
                <tr v-for="run in executionRuns" :key="run.id" class="hover:bg-surface-container-low transition-colors" :class="{ 'cursor-pointer': run.batchId }" @click="run.batchId && $router.push('/dashboard/etl-runhistory/batch/' + run.batchId)">
                  <td class="p-4 font-semibold" :class="run.status === 'FAILED' ? 'text-primary' : 'text-on-surface'">{{ run.runId }}</td>
                  <td class="p-4 text-on-surface-variant">{{ run.batchId }}</td>
                  <td class="p-4">{{ run.duration }}</td>
                  <td class="p-4">{{ run.rows }}</td>
                  <td class="p-4">
                    <div class="w-16 h-2 bg-surface-variant rounded-full overflow-hidden">
                      <div class="h-full" :class="run.qualityColor" :style="{ width: run.quality + '%' }"></div>
                    </div>
                  </td>
                  <td class="p-4">
                    <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', run.statusColor]">
                      <span v-if="run.status === 'RUNNING'" class="w-1.5 h-1.5 rounded-full animate-pulse" :class="run.statusDot"></span>
                      <span v-if="run.status === 'COMPLETED'" class="material-symbols-outlined text-[14px]">check</span>
                      <span v-if="run.status === 'FAILED'" class="material-symbols-outlined text-[14px]">close</span>
                      {{ run.status }}
                    </span>
                  </td>
                  <td class="p-4 text-on-surface-variant">
                    <button class="p-1 rounded hover:bg-surface-variant" @click.stop>
                      <span class="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div class="p-4 flex items-center justify-between bg-surface text-sm text-on-surface-variant">
            <span>{{ pagination.total ? `Showing ${pagination.from} to ${pagination.to} of ${pagination.total} results` : 'No results' }}</span>
            <div class="flex items-center gap-1">
              <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant">
                <span class="material-symbols-outlined text-[16px]" data-icon="chevron_left">chevron_left</span>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-semibold">1</button>
              <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant">2</button>
              <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant">3</button>
              <span class="px-2">...</span>
              <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant">32</button>
              <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant">
                <span class="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Metrics Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Storage Growth</p>
          <div class="flex items-end gap-3 mb-2">
            <span class="text-3xl font-headline font-bold text-on-surface">{{ footerMetrics.storageGrowth.value != null ? '+' + footerMetrics.storageGrowth.value : '—' }}</span>
            <span v-if="footerMetrics.storageGrowth.change != null" class="text-sm font-semibold text-[#FF780F] flex items-center">
              <span class="material-symbols-outlined text-[16px]">trending_up</span> {{ footerMetrics.storageGrowth.change }}%
            </span>
          </div>
          <div class="w-full bg-surface-variant h-1 rounded-full overflow-hidden mt-4">
            <div class="w-[75%] h-full bg-primary"></div>
          </div>
          <p class="text-[10px] text-on-surface-variant mt-2">{{ footerMetrics.storageGrowth.used ? footerMetrics.storageGrowth.used + ' of ' + footerMetrics.storageGrowth.total + ' Allocated' : '—' }}</p>
        </div>
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm flex flex-col justify-between global-dotted-bg">
          <div>
            <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Average Quality</p>
            <div class="flex items-end gap-3">
              <span class="text-3xl font-headline font-bold text-on-surface">{{ footerMetrics.averageQuality.value != null ? footerMetrics.averageQuality.value + '%' : '—' }}</span>
              <span v-if="footerMetrics.averageQuality.change != null" class="text-sm font-semibold text-[#FF780F] flex items-center">
                <span class="material-symbols-outlined text-[16px]">arrow_upward</span> {{ footerMetrics.averageQuality.change }}%
              </span>
            </div>
          </div>
        </div>
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm flex flex-col justify-between global-dotted-bg">
          <div>
            <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Failed Retries</p>
            <div class="flex items-end justify-between">
              <span class="text-3xl font-headline font-bold text-on-surface">{{ footerMetrics.failedRetries.count != null ? String(footerMetrics.failedRetries.count).padStart(2, '0') : '—' }}</span>
              <span v-if="footerMetrics.failedRetries.status" class="text-xs font-semibold text-primary flex items-center gap-1 border border-primary-fixed px-2 py-0.5 rounded">
                <span class="material-symbols-outlined text-[14px]">error</span> {{ footerMetrics.failedRetries.status }}
              </span>
            </div>
          </div>
        </div>
        <div class="bg-surface rounded border border-outline-variant p-5 shadow-sm global-dotted-bg">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Gateway Latency</p>
          <div class="flex items-end justify-between mb-2">
            <span class="text-3xl font-headline font-bold text-on-surface">{{ footerMetrics.gatewayLatency.value != null ? footerMetrics.gatewayLatency.value : '—' }}</span>
            <span v-if="footerMetrics.gatewayLatency.level" class="text-sm font-semibold text-primary flex items-center">
              <span class="material-symbols-outlined text-[16px]">warning</span> {{ footerMetrics.gatewayLatency.level }}
            </span>
          </div>
          <p class="text-[10px] text-on-surface-variant mt-2">{{ footerMetrics.gatewayLatency.note || '—' }}</p>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const loading = ref(true)
onMounted(async () => {
  await nextTick()
  setTimeout(() => loading.value = false, 800)
})

// Data loaded from API — all start empty
const pipelineHealth = ref([])
const qualityTrendData = ref([])
const dataIntegrityScore = ref(null)
const lastScanTime = ref(null)
const executionRuns = ref([])
const pagination = ref({ page: 1, total: 0, from: 0, to: 0 })
const footerMetrics = ref({
  storageGrowth: { value: null, change: null, used: null, total: null },
  averageQuality: { value: null, change: null, sparkline: [] },
  failedRetries: { count: null, status: null },
  gatewayLatency: { value: null, level: null, note: null },
})

onMounted(async () => {
  await nextTick()

  console.group('🔍 [ETLRunHistory — Full DOM Diagnostic]')

  // ── 1. ROOT ──
  const root = document.querySelector('.dashboard-root')
  if (root) {
    const rs = getComputedStyle(root)
    console.log('1. .dashboard-root:', {
      display: rs.display, flexDirection: rs.flexDirection,
      height: rs.height, position: rs.position,
      color: rs.color, backgroundColor: rs.backgroundColor,
    })
  } else { console.warn('❌ .dashboard-root NOT FOUND') }

  // ── 2. MAIN ──
  const main = document.querySelector('main')
  if (main) {
    const ms = getComputedStyle(main)
    console.log('2. <main>:', { display: ms.display, height: ms.height, position: ms.position })
  }

  // ── 3. SECTIONS ──
  const allSections = document.querySelectorAll('section')
  console.log(`3. <section> tags: ${allSections.length}`)
  allSections.forEach((s, i) => {
    const ss = getComputedStyle(s)
    console.log(`   [${i}]:`, { height: ss.height, display: ss.display, position: ss.position, text: s.textContent?.substring(0, 40) })
  })

  // ── 4. HEALTH CONTAINER ──
  const hc = document.getElementById('health-trend-container')
  if (hc) {
    const hcs = getComputedStyle(hc)
    console.log('4. #health-trend-container:', {
      display: hcs.display, height: hcs.height, position: hcs.position,
      offsetHeight: hc.offsetHeight, children: hc.children.length,
    })
  } else { console.warn('❌ #health-trend-container NOT FOUND') }

  // ── 5-6. COLUMNS ──
  ;['health-column', 'trend-column'].forEach(id => {
    const el = document.getElementById(id)
    if (el) {
      const cs = getComputedStyle(el)
      console.log(`${id}:`, { display: cs.display, height: cs.height, offsetHeight: el.offsetHeight })
    }
  })

  // ── 7. TABLE ──
  const table = document.querySelector('table')
  console.log('7. <table>:', table ? `found, ${table.rows.length} rows, ${table.offsetHeight}px` : 'NOT FOUND')

  // ── 8. CSS VAR TEST ──
  const test = document.createElement('div')
  test.className = 'bg-surface text-on-surface'
  test.style.cssText = 'position:absolute;left:-9999px'
  document.body.appendChild(test)
  const ts = getComputedStyle(test)
  console.log('8. CSS var test:', { bg: ts.backgroundColor, color: ts.color })
  document.body.removeChild(test)

  // ── 9. PARENT CHAIN ──
  const absa = document.querySelector('.absa-content')
  if (absa) {
    const as = getComputedStyle(absa)
    console.log('9. .absa-content:', { display: as.display, height: as.height, position: as.position, overflow: as.overflow })
  }

  // ── 10. FIRST H2 ──
  const h2 = document.querySelector('h2')
  if (h2) console.log('10. First <h2>:', { text: h2.textContent, color: getComputedStyle(h2).color, opacity: getComputedStyle(h2).opacity })

  console.groupEnd()

  // Force canvas/SVG re-measurement after layout is fixed
  window.dispatchEvent(new Event('resize'))
})
</script>

<style scoped>
/* 1. RESET ALL CHILD POSITIONS TO NORMAL DOCUMENT FLOW */
.dashboard-root,
.dashboard-root main,
.dashboard-root section,
.dashboard-root div,
.dashboard-root header,
.dashboard-root table,
.dashboard-root tr,
.dashboard-root td,
.dashboard-root th,
.dashboard-root h1,
.dashboard-root h2,
.dashboard-root h3,
.dashboard-root p,
.dashboard-root span {
  position: relative !important;
  float: none !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  transform: none !important;
  clear: both !important;
}

/* 1b. Restore absolute positioning for chart histogram bars */
#trend-column .absolute {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}
#trend-column .absolute > div {
  position: static !important;
}

/* 2. RE-ESTABLISH ROOT & MAIN FLEX DIRECTION */
.dashboard-root {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  min-height: 100vh !important;
  background-color: #ffffff !important;
}

.dashboard-root main {
  display: flex !important;
  flex-direction: column !important;
  gap: 2rem !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
}

/* 3. Side-by-side grid: health cards left, trend chart right */
#health-trend-container {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.5rem !important;
}

#health-column {
  grid-column: span 1 / span 1 !important;
}

#trend-column {
  grid-column: span 3 / span 3 !important;
}

section.grid {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1rem !important;
}

/* 4. HARDCODE VISIBILITY & CONTRAST (SOLVES FAINT TEXT) */
.dashboard-root,
.dashboard-root h1,
.dashboard-root h2,
.dashboard-root h3,
.dashboard-root p,
.dashboard-root span,
.dashboard-root td,
.dashboard-root th {
  color: #131010 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.text-on-surface-variant {
  color: #B50232 !important;
}

.text-primary {
  color: #DC0037 !important;
}

.bg-surface {
  background-color: #ffffff !important;
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}

/* 6. Force chart canvas/SVG to recalculate dimensions */
#trend-column canvas,
#trend-column svg {
  width: 100% !important;
  height: 100% !important;
  min-height: 220px !important;
}

/* Apply consistent border to Execution History table section */
section.mb-8 .bg-surface {
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}
</style>

<style>
/* 1. Force main container into vertical flex column layout */
#app main,
main {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: auto !important;
  gap: 1.5rem !important;
}

/* 2. Prevent card surfaces from being transparent or washed out */
.bg-surface,
.dashboard-root .bg-surface {
  background-color: #ffffff !important;
  opacity: 1 !important;
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}

/* 3. Ensure table rows stack normally inside the main column */
section {
  width: 100% !important;
  display: block !important;
}

/* 4. Side-by-side grid: health cards left, trend chart right */
#health-trend-container {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.5rem !important;
  align-items: start !important;
}

#health-column {
  grid-column: span 1 / span 1 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 1rem !important;
}

#trend-column {
  grid-column: span 3 / span 3 !important;
  width: 100% !important;
}

/* 4b. Enforce canvas/SVG height so chart libraries initialize correctly */
#trend-column canvas,
#trend-column svg,
#trend-column .chart-wrapper {
  display: block !important;
  width: 100% !important;
  min-height: 250px !important;
  height: 250px !important;
}

/* 5. Fallback CSS variables for offline backend */
:root {
  --brand-primary: #DC0037;
  --on-surface: #131010;
  --on-surface-variant: #B50232;
  --surface: #ffffff;
  --outline-variant: #e5e7eb;
}

/* 6. Text contrast fallbacks */
.text-on-surface,
[class*="text-on-surface"] {
  color: #131010 !important;
  opacity: 1 !important;
}

.text-on-surface-variant,
[class*="text-on-surface-variant"] {
  color: #B50232 !important;
  opacity: 1 !important;
}

.text-primary,
[class*="text-primary"] {
  color: #DC0037 !important;
  opacity: 1 !important;
}
</style>