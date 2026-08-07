<template>
  <div class="etl-page">
    <div class="etl-page__content">
      <!-- 1. Page Header -->
      <AbsaSectionHeader
        title="Data Pipeline Health"
        color="passion"
        size="lg"
      >
        <template #overline>Home &nbsp;›&nbsp; Operations &nbsp;›&nbsp; ETL Execution Logs</template>
        <template #actions>
          <AbsaButton variant="outline" size="md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Logs
          </AbsaButton>
          <AbsaButton variant="hope" size="md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Trigger Manual Run
          </AbsaButton>
        </template>
      </AbsaSectionHeader>

      <!-- 2. Primary Operational KPIs -->
      <div class="etl-page__section">
        <div class="etl-page__kpi-grid">
        <EtlStatCard label="TODAY'S RUNS" :value="store.kpis?.todays_runs ?? '--'" :sub-label="`${store.kpis?.success_rate ?? 0}% success rate`" variant="plain" />
        <EtlStatCard label="SUCCESSFUL" :value="store.kpis?.successful_runs ?? '--'" sub-label="Completed without errors" variant="plain" />
        <EtlStatCard label="FAILED" :value="String(store.kpis?.failed_runs ?? '--').padStart(2,'0')" sub-label="Needs investigation" variant="plain" />
        <EtlStatCard label="RUNNING" :value="String(store.kpis?.running_runs ?? 0).padStart(2,'0')" sub-label="In progress" variant="plain" />
        <EtlStatCard label="AVG QUALITY" :value="store.kpis?.avg_quality ?? '--'" sub-label="Today's average" variant="plain" />
        <EtlStatCard label="AVG DURATION" :value="store.kpis?.avg_duration ?? '--'" sub-label="Today's average" variant="plain" />
        </div>
      </div>

      <!-- 3. Quality Trend — full width -->
      <EtlQualityTrend
        :points="store.qualityTrend"
        :sla="store.statusPanel?.sla_threshold ?? 95"
        :last-scan="store.statusPanel?.current_status_since ? `Since ${store.statusPanel.current_status_since}` : 'No data'"
      />

      <!-- 4. Current ETL Status -->
      <div class="etl-page__section">
        <div class="etl-page__status-panel">
          <div class="etl-page__status-item">
            <span class="etl-page__status-label">Current Status</span>
            <span class="etl-page__status-dot" :class="statusDotClass"></span>
            <span class="etl-page__status-value">{{ store.statusPanel?.current_status ?? 'Unknown' }}</span>
            <span class="etl-page__status-meta">
              <template v-if="store.statusPanel?.current_status_since">Since {{ store.statusPanel.current_status_since }}</template>
              <template v-if="store.statusPanel?.current_pipeline"> · Pipeline: {{ store.statusPanel.current_pipeline }}</template>
            </span>
          </div>
          <div class="etl-page__status-divider"></div>
          <div class="etl-page__status-item">
            <span class="etl-page__status-label">Last Successful Run</span>
            <span class="etl-page__status-value etl-page__status-value--em">{{ store.statusPanel?.last_successful_run ? '#' + store.statusPanel.last_successful_run : '--' }}</span>
            <span class="etl-page__status-meta">{{ store.statusPanel?.last_successful_duration ?? '--' }} · {{ store.statusPanel?.last_successful_rows ?? '--' }} · {{ store.statusPanel?.last_successful_quality ?? '--' }}% quality</span>
          </div>
          <div class="etl-page__status-divider"></div>
          <div class="etl-page__status-item">
            <span class="etl-page__status-label">Latest Quality</span>
            <span class="etl-page__status-value etl-page__status-value--em">{{ store.statusPanel?.latest_quality ?? '--' }}%</span>
            <span class="etl-page__status-meta">
              <template v-if="store.statusPanel">Above SLA ({{ store.statusPanel.sla_threshold }}%) · {{ store.statusPanel.latest_quality_rows ?? '--' }} processed</template>
            </span>
          </div>
          <div class="etl-page__status-divider"></div>
          <div class="etl-page__status-item">
            <span class="etl-page__status-label">Last Failure</span>
            <span class="etl-page__status-value">{{ store.statusPanel?.last_failure_run ? '#' + store.statusPanel.last_failure_run : 'None' }}</span>
            <span class="etl-page__status-meta" :class="{ 'etl-page__status-meta--warn': store.statusPanel?.last_failure_run }">
              {{ store.statusPanel?.last_failure_detail ?? 'No recent failures' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 5. Execution History -->
      <div v-if="store.loading" class="etl-page__loading">Loading pipeline history…</div>
      <div v-else-if="store.isEmpty" class="etl-page__empty">No pipeline runs found.</div>
      <div v-else-if="store.error" class="etl-page__error">Failed to load: {{ store.error }}</div>
      <EtlExecutionTable
        v-else
        :rows="store.runs"
        :open-menu-id="openMenuId"
        @toggle-menu="toggleMenu"
        @view-run="viewRun"
        @retry-run="retryRun"
      />

      <!-- Pagination -->
      <div v-if="store.totalPages > 1" class="etl-page__pagination">
        <button :disabled="store.page <= 1" @click="store.setPage(store.page - 1)">← Prev</button>
        <span>Page {{ store.page }} of {{ store.totalPages }}</span>
        <button :disabled="store.page >= store.totalPages" @click="store.setPage(store.page + 1)">Next →</button>
      </div>

      <!-- 6. Infrastructure Health -->
      <div class="etl-page__section">
        <h3 class="etl-page__section-title">Infrastructure Health</h3>
        <div class="etl-page__infra-grid">
          <EtlHealthCard
            v-for="card in healthCards"
            :key="card.label"
            :label="card.label"
            :value="card.value"
            :icon="card.icon"
            :status-color="card.statusColor"
            :stat="card.stat"
          />
        </div>
      </div>

      <!-- 7. System Metrics -->
      <div class="etl-page__section">
        <h3 class="etl-page__section-title">System Metrics</h3>
        <div class="etl-page__metrics-grid">
          <EtlStatCard label="STORAGE GROWTH" value="+14.2 GB" sub-label="6.2TB of 10TB Allocated" :trend="2.4" trend-label="2.4%" variant="progress" :progress-pct="65" />
          <EtlStatCard label="AVERAGE QUALITY" value="99.1%" sub-label="Based on last 50 batches" :trend="0.3" trend-label="0.3%" variant="chart" :chart-bars="qualityChartBars" />
          <EtlStatCard label="FAILED RETRIES" value="02" sub-label="Requires manual intervention" :trend="-1" trend-label="Active" variant="badges">
            <template #badges>
              <div class="absa-etl-bottom-card__badges">
                <span class="absa-etl-bottom-card__badge absa-etl-bottom-card__badge--dark">BT</span>
                <span class="absa-etl-bottom-card__badge absa-etl-bottom-card__badge--red">ETL</span>
              </div>
            </template>
          </EtlStatCard>
          <EtlStatCard label="GATEWAY LATENCY" value="118ms" sub-label="Peak load during batch processing" :trend="0" trend-label="High" variant="bar" :progress-pct="78" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { AbsaButton, AbsaSectionHeader } from '@/components/ui'
import EtlHealthCard from './EtlHealthCard.vue'
import EtlQualityTrend from './EtlQualityTrend.vue'
import EtlStatCard from './EtlStatCard.vue'
import EtlExecutionTable from './EtlExecutionTable.vue'
import { useETLStore } from '@/stores/etlStore'

const router = useRouter()
const store = useETLStore()

// ── Status dot colour ──
const statusDotClass = computed(() => {
  const s = (store.statusPanel?.current_status ?? '').toLowerCase()
  if (s === 'operational') return 'etl-page__status-dot--ok'
  if (s === 'processing') return 'etl-page__status-dot--warn'
  return 'etl-page__status-dot--err'
})

// ── Execution table menu ──
const openMenuId = ref(null)

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function viewRun(run) {
  openMenuId.value = null
  router.push(`/dashboard/etl-run-history/batch/${run.runId}`)
}

function retryRun(run) {
  openMenuId.value = null
}

function handleClickOutside() {
  openMenuId.value = null
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  store.loadDashboard()
})

onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// ── System metrics (local — no backend endpoint yet) ──
const qualityChartBars = ref([30, 55, 40, 65, 80])

// ── Infrastructure (local — no backend endpoint yet) ──
const healthCards = ref([
  {
    label: 'PostgreSQL Cluster',
    value: 'Healthy',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    statusColor: 'good',
    stat: '99.98% uptime · 18 ms'
  },
  {
    label: 'Redis Cache',
    value: 'Healthy',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    statusColor: 'good',
    stat: '0.4ms latency · 512 MB'
  },
  {
    label: 'API Gateway',
    value: 'Stable',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    statusColor: 'warn',
    stat: 'Load 72% · 118ms'
  }
])
</script>

<style scoped>
.etl-page { min-height: 100vh; background: #F8F8FA; display: flex; flex-direction: column; }
.etl-page__content { max-width: 1600px; margin: 0 auto; padding: 28px 32px; display: flex; flex-direction: column; gap: 20px; width: 100%; flex: 1; }
.etl-page__section { display: flex; flex-direction: column; gap: 12px; }
.etl-page__section-title { font-family: 'Public Sans',system-ui,sans-serif; font-size: 16px; font-weight: 700; color: var(--absa-enrich, #131010); line-height: 22px; margin: 0; }

.etl-page__kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }

.etl-page__status-panel { display: flex; align-items: center; gap: 0; background: #fff; border: 1px solid #E8E8EC; border-radius: 4px; padding: 16px 24px; }
.etl-page__status-item { display: flex; flex-direction: column; gap: 2px; padding: 0 24px; flex: 1; }
.etl-page__status-divider { width: 1px; height: 40px; background: #E8E8EC; flex-shrink: 0; }
.etl-page__status-label { font-family: 'Inter',system-ui,sans-serif; font-size: 10px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; }
.etl-page__status-value { font-family: 'Public Sans',system-ui,sans-serif; font-size: 14px; font-weight: 600; color: var(--absa-enrich, #131010); display: flex; align-items: center; gap: 6px; }
.etl-page__status-value--em { font-size: 16px; font-weight: 700; color: var(--absa-passion, #DC0037); }
.etl-page__status-meta { font-family: 'Public Sans',system-ui,sans-serif; font-size: 11px; color: #9CA3AF; }
.etl-page__status-meta--warn { color: var(--absa-inspire, #77021E); }
.etl-page__status-dot { width: 8px; height: 8px; border-radius: 50%; }
.etl-page__status-dot--ok { background: var(--absa-passion, #DC0037); }
.etl-page__status-dot--warn { background: var(--absa-energy, #FF780F); }
.etl-page__status-dot--err { background: var(--absa-inspire, #77021E); }

/* ── Loading / Empty / Error ── */
.etl-page__loading,
.etl-page__empty,
.etl-page__error {
  text-align: center;
  padding: 40px 16px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px;
  color: #9CA3AF;
  background: #fff;
  border: 1px solid #E8E8EC;
  border-radius: 4px;
}
.etl-page__error { color: var(--absa-inspire, #77021E); border-color: rgba(119,2,30,0.2); }

/* ── Pagination ── */
.etl-page__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 0;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--absa-enrich, #131010);
}
.etl-page__pagination button {
  padding: 6px 16px;
  border: 1px solid #E8E8EC;
  border-radius: 4px;
  background: #fff;
  color: var(--absa-enrich, #131010);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.etl-page__pagination button:hover:not(:disabled) { border-color: var(--absa-passion, #DC0037); }
.etl-page__pagination button:disabled { opacity: 0.4; cursor: default; }

.etl-page__infra-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.etl-page__metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

.absa-etl-bottom-card__badges { display: flex; gap: 0; margin: 4px 0; }
.absa-etl-bottom-card__badge { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; font-family: 'Public Sans',system-ui,sans-serif; font-size: 10px; font-weight: 700; color: #fff; line-height: 15px; }
.absa-etl-bottom-card__badge:last-child { margin-left: -8px; }
.absa-etl-bottom-card__badge--dark { background: var(--absa-enrich, #131010); }
.absa-etl-bottom-card__badge--red  { background: var(--absa-passion, #DC0037); }

@media (max-width: 1400px) { .etl-page__kpi-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 1024px) { .etl-page__content { padding: 16px; gap: 16px; } .etl-page__kpi-grid { grid-template-columns: repeat(2, 1fr); } .etl-page__infra-grid { grid-template-columns: 1fr; } .etl-page__metrics-grid { grid-template-columns: repeat(2, 1fr); } .etl-page__status-panel { flex-wrap: wrap; gap: 12px; } .etl-page__status-divider { display: none; } }
@media (max-width: 768px) { .etl-page__kpi-grid { grid-template-columns: 1fr; } .etl-page__metrics-grid { grid-template-columns: 1fr; } }
</style>
