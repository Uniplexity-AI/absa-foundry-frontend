<template>
  <div class="bd">
    <div class="bd__content">
      <!-- ═══ ACT 1: HEADER + OVERVIEW ═══ -->
      <AbsaSectionHeader title="Batch Execution: #RUN-8842" color="passion" size="lg">
        <template #overline>Operations › Data Pipeline Health › Execution History › RUN-8842</template>
        <template #actions>
          <AbsaButton variant="outline" size="md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Export Report
          </AbsaButton>
          <AbsaButton variant="outline" size="md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Logs
          </AbsaButton>
          <AbsaButton variant="ghost" size="md" @click="$router.back()">← Back</AbsaButton>
        </template>
      </AbsaSectionHeader>

      <!-- Compact KPI strip -->
      <div class="bd__kpi-strip">
        <div class="bd__kpi">
          <span class="bd__kpi-label">Status</span>
          <AbsaBadge state="completed" size="sm">COMPLETED</AbsaBadge>
        </div>
        <div class="bd__kpi">
          <span class="bd__kpi-label">Quality</span>
          <span class="bd__kpi-val">99.2%</span>
        </div>
        <div class="bd__kpi">
          <span class="bd__kpi-label">Duration</span>
          <span class="bd__kpi-val">04m 12s</span>
        </div>
        <div class="bd__kpi">
          <span class="bd__kpi-label">Rows</span>
          <span class="bd__kpi-val">840K</span>
          <span class="bd__kpi-sub">890K valid · 90K rejected</span>
        </div>
        <div class="bd__kpi">
          <span class="bd__kpi-label">Run</span>
          <span class="bd__kpi-val bd__kpi-val--mono">#8842</span>
          <span class="bd__kpi-sub">BT-2023-Q4-M11 · Prod · v2.1.0</span>
        </div>
        <div class="bd__kpi bd__kpi--right">
          <span class="bd__kpi-label">Triggered</span>
          <span class="bd__kpi-val">09:32:15</span>
          <span class="bd__kpi-sub">Scheduled · etl-prod-03</span>
        </div>
      </div>

      <!-- ═══ ACT 2: EXECUTION JOURNEY (HERO) ═══ -->
      <div class="bd__hero">
        <div class="bd__hero-head">
          <h2 class="bd__hero-title">Execution Journey</h2>
          <span class="bd__hero-meta">Pipeline: Customer Lifecycle ETL v2.1.0 · Total: 04m 12s</span>
        </div>
        <EtlTimeline :stages="timelineStages" />
      </div>

      <!-- ═══ ACT 3: EXECUTION ANALYTICS (2-COLUMN) ═══ -->
      <div class="bd__analytics">
        <!-- Left: Quality Trend -->
        <div class="bd__analytics-left">
          <h3 class="bd__section-title">Quality Analysis</h3>
          <EtlQualityTrend :points="qualityRunPoints" :sla="95" last-scan="Run completed 09:36" />
          <div class="bd__rules">
            <h4 class="bd__subsection-title">Validation Rules</h4>
            <div class="bd__rule"><span class="bd__rule-dot bd__rule-dot--pass"></span>Schema Check — Passed</div>
            <div class="bd__rule"><span class="bd__rule-dot bd__rule-dot--pass"></span>Null Check — Passed</div>
            <div class="bd__rule"><span class="bd__rule-dot bd__rule-dot--warn"></span>Format Check — 18% warnings</div>
            <div class="bd__rule"><span class="bd__rule-dot bd__rule-dot--fail"></span>Business Rules — 68% failed</div>
          </div>
        </div>

        <!-- Right: Processing + Rejection -->
        <div class="bd__analytics-right">
          <h3 class="bd__section-title">Processing Summary</h3>
          <div class="bd__processing-grid">
            <div class="bd__proc">
              <span class="bd__proc-label">Received</span>
              <span class="bd__proc-val">980K</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Validated</span>
              <span class="bd__proc-val">890K</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Loaded</span>
              <span class="bd__proc-val">890K</span>
            </div>
            <div class="bd__proc bd__proc--warn">
              <span class="bd__proc-label">Rejected</span>
              <span class="bd__proc-val">90,000</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Success Rate</span>
              <span class="bd__proc-val">91.2%</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Speed</span>
              <span class="bd__proc-val">52K r/s</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Retries</span>
              <span class="bd__proc-val">01</span>
            </div>
            <div class="bd__proc">
              <span class="bd__proc-label">Duplicates</span>
              <span class="bd__proc-val">2,400</span>
            </div>
          </div>

          <h4 class="bd__subsection-title" style="margin-top:20px">Rejection Breakdown</h4>
          <div class="bd__rej-bars">
            <div class="bd__rej-row">
              <span class="bd__rej-label">Business Rules</span>
              <div class="bd__rej-bar"><div class="bd__rej-fill bd__rej-fill--biz" style="width:68%"></div></div>
              <span class="bd__rej-pct">68%</span>
            </div>
            <div class="bd__rej-row">
              <span class="bd__rej-label">Invalid Format</span>
              <div class="bd__rej-bar"><div class="bd__rej-fill bd__rej-fill--fmt" style="width:18%"></div></div>
              <span class="bd__rej-pct">18%</span>
            </div>
            <div class="bd__rej-row">
              <span class="bd__rej-label">Missing Values</span>
              <div class="bd__rej-bar"><div class="bd__rej-fill bd__rej-fill--mis" style="width:10%"></div></div>
              <span class="bd__rej-pct">10%</span>
            </div>
            <div class="bd__rej-row">
              <span class="bd__rej-label">Duplicates</span>
              <div class="bd__rej-bar"><div class="bd__rej-fill bd__rej-fill--dup" style="width:4%"></div></div>
              <span class="bd__rej-pct">4%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ ACT 4: INVESTIGATION WORKSPACE (TABBED) ═══ -->
      <div class="bd__investigation">
        <h3 class="bd__section-title">Investigation Workspace</h3>
        <div class="bd__tabs">
          <span class="bd__tab bd__tab--active" @click="activeTab = 'rejected'">Rejected Records (450)</span>
          <span class="bd__tab" :class="{ 'bd__tab--active': activeTab === 'logs' }" @click="activeTab = 'logs'">Execution Logs (156)</span>
          <span class="bd__tab" :class="{ 'bd__tab--active': activeTab === 'audit' }" @click="activeTab = 'audit'">Audit Trail (12)</span>
        </div>

        <div class="bd__tab-content">
          <!-- Rejected Records -->
          <div v-if="activeTab === 'rejected'">
            <div class="bd__table-toolbar">
              <input class="bd__search" type="text" placeholder="Search records..." />
              <span class="bd__filter">Severity: All ▾</span>
              <AbsaButton variant="outline" size="sm">Export CSV</AbsaButton>
            </div>
            <div class="bd__table-wrap">
              <table class="bd__table">
                <thead><tr><th>Record ID</th><th>Customer</th><th>Field</th><th>Invalid</th><th>Expected</th><th>Rule</th><th>Severity</th></tr></thead>
                <tbody>
                  <tr v-for="r in rejectedRecords" :key="r.id">
                    <td class="bd__mono">{{ r.recordId }}</td>
                    <td>{{ r.customerId }}</td>
                    <td class="bd__mono">{{ r.field }}</td>
                    <td class="bd__warn">{{ r.invalidValue }}</td>
                    <td class="bd__mono">{{ r.expected }}</td>
                    <td>{{ r.rule }}</td>
                    <td><AbsaBadge :state="r.severity === 'ERROR' ? 'failed' : 'warning'" size="sm">{{ r.severity }}</AbsaBadge></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bd__pagination"><span>1–5 of 450</span><div class="bd__pages"><button class="bd__pg--on">1</button><button>2</button><button>3</button></div></div>
          </div>

          <!-- Logs -->
          <div v-if="activeTab === 'logs'">
            <div class="bd__table-toolbar">
              <input class="bd__search" type="text" placeholder="Search logs..." />
              <span class="bd__log-flts">
                <span class="bd__log-flt bd__log-flt--on">All</span>
                <span class="bd__log-flt">INFO</span>
                <span class="bd__log-flt">WARN</span>
                <span class="bd__log-flt">ERROR</span>
              </span>
              <AbsaButton variant="outline" size="sm">Download</AbsaButton>
            </div>
            <div class="bd__table-wrap">
              <table class="bd__table">
                <thead><tr><th>Timestamp</th><th>Level</th><th>Component</th><th>Message</th></tr></thead>
                <tbody>
                  <tr v-for="l in logs" :key="l.id">
                    <td class="bd__mono">{{ l.timestamp }}</td>
                    <td><AbsaBadge :state="l.level === 'ERROR' ? 'failed' : l.level === 'WARN' ? 'warning' : 'completed'" size="sm">{{ l.level }}</AbsaBadge></td>
                    <td class="bd__mono">{{ l.component }}</td>
                    <td>{{ l.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Audit -->
          <div v-if="activeTab === 'audit'">
            <div class="bd__table-wrap">
              <table class="bd__table">
                <thead><tr><th>Timestamp</th><th>User / System</th><th>Action</th><th>Description</th></tr></thead>
                <tbody>
                  <tr v-for="a in auditTrail" :key="a.id">
                    <td class="bd__mono">{{ a.timestamp }}</td>
                    <td>{{ a.user }}</td>
                    <td>{{ a.action }}</td>
                    <td>{{ a.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ ACT 5: INFRASTRUCTURE ═══ -->
      <div class="bd__infra">
        <h3 class="bd__section-title">Infrastructure During Execution</h3>
        <div class="bd__infra-grid">
          <EtlHealthCard v-for="c in infraCards" :key="c.label" :label="c.label" :value="c.value" :icon="c.icon" :status-color="c.statusColor" :stat="c.stat" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AbsaButton, AbsaBadge, AbsaSectionHeader } from '@/components/ui'
import EtlHealthCard from './EtlHealthCard.vue'
import EtlQualityTrend from './EtlQualityTrend.vue'
import EtlTimeline from './EtlTimeline.vue'

const activeTab = ref('rejected')

const timelineStages = ref([
  { label: 'Batch Received', timestamp: '09:32:15', duration: '0.2s', status: 'completed' },
  { label: 'Schema Validation', timestamp: '09:32:18', duration: '0.8s', status: 'completed', message: 'All schemas validated' },
  { label: 'Data Validation', timestamp: '09:32:21', duration: '2.1s', status: 'completed' },
  { label: 'Data Cleansing', timestamp: '09:32:25', duration: '3.5s', status: 'completed', message: '2,400 duplicates removed' },
  { label: 'Feature Engineering', timestamp: '09:33:01', duration: '35.8s', status: 'completed', message: '15 features computed for 5,000 customers' },
  { label: 'Quality Validation', timestamp: '09:35:12', duration: '0.4s', status: 'failed',
    failure: { reason: 'Quality 91.2% below 95% threshold', rejected: '90,000 records', retry: '#8840-R1 auto-retry triggered' } },
  { label: 'Database Load', timestamp: '09:36:27', duration: '12.3s', status: 'completed', message: '890,000 rows written' },
  { label: 'Completion', timestamp: '09:36:27', duration: '', status: 'completed', message: 'Batch finished with warnings' }
])

const qualityRunPoints = ref([
  { label: 'T-4h', value: 99.1, rows: '—', rejected: '—', failed: false },
  { label: 'T-3h', value: 98.9, rows: '—', rejected: '—', failed: false },
  { label: 'T-2h', value: 97.2, rows: '1.0M', rejected: '90K', failed: true },
  { label: 'T-1h', value: 98.5, rows: '—', rejected: '—', failed: false },
  { label: 'This Run', value: 91.2, rows: '980K', rejected: '90K', failed: false }
])

const rejectedRecords = ref([
  { id: 1, recordId: 'REC-1201', customerId: 'C0000123', field: 'amount', invalidValue: '-500', expected: '> 0', rule: 'BR-04', severity: 'ERROR' },
  { id: 2, recordId: 'REC-1245', customerId: 'C0000456', field: 'email', invalidValue: 'bad@x', expected: 'valid@domain', rule: 'FMT-02', severity: 'ERROR' },
  { id: 3, recordId: 'REC-1302', customerId: 'C0000789', field: 'tenure', invalidValue: '-12', expected: '>= 0', rule: 'BR-07', severity: 'ERROR' },
  { id: 4, recordId: 'REC-1450', customerId: 'C0000234', field: 'phone', invalidValue: '00', expected: '10 digits', rule: 'FMT-05', severity: 'WARN' },
  { id: 5, recordId: 'REC-1523', customerId: 'C0000678', field: 'balance', invalidValue: 'NULL', expected: 'numeric', rule: 'NUL-01', severity: 'ERROR' }
])

const logs = ref([
  { id: 1, timestamp: '09:32:15', level: 'INFO', component: 'orchestrator', message: 'Batch BT-2023-Q4-M11 started' },
  { id: 2, timestamp: '09:32:18', level: 'INFO', component: 'validator', message: 'Schema validation passed — 22 columns verified' },
  { id: 3, timestamp: '09:32:21', level: 'DEBUG', component: 'validator', message: 'Checking 980,000 records against 14 rules' },
  { id: 4, timestamp: '09:35:12', level: 'ERROR', component: 'quality', message: 'Quality score 91.2% below SLA threshold 95%' },
  { id: 5, timestamp: '09:35:12', level: 'WARN', component: 'quality', message: '90,000 records failed business rule validation' },
  { id: 6, timestamp: '09:36:27', level: 'INFO', component: 'loader', message: '890K records loaded to etl_clean' }
])

const infraCards = ref([
  { label: 'PostgreSQL', value: 'Healthy', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>', statusColor: 'good', stat: '12ms · 42 conn · CPU 34%' },
  { label: 'Redis Cache', value: 'Healthy', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', statusColor: 'good', stat: '0.3ms · 512 MB' },
  { label: 'API Gateway', value: 'Stable', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>', statusColor: 'good', stat: '118ms · 72% load' },
  { label: 'Feature Svc', value: 'Healthy', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--absa-passion, #DC0037)" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', statusColor: 'good', stat: '45ms response' }
])

const auditTrail = ref([
  { id: 1, timestamp: '09:32:15', user: 'System', action: 'Batch Submitted', description: 'Scheduler auto-trigger' },
  { id: 2, timestamp: '09:35:12', user: 'System', action: 'Quality Warning', description: '91.2% below SLA — auto-retry' },
  { id: 3, timestamp: '09:36:27', user: 'System', action: 'Batch Completed', description: '890K rows loaded with warnings' },
  { id: 4, timestamp: '09:45:10', user: 'C. Analyst', action: 'Report Exported', description: 'CSV download' },
  { id: 5, timestamp: '09:48:22', user: 'C. Analyst', action: 'Batch Viewed', description: 'Opened details' }
])
</script>

<style scoped>
/* ═══ Brand colours (per ops spec Section 9) ═══ */
.bd { min-height: 100vh; background: #F8F8FA; }
.bd__content { max-width: 1600px; margin: 0 auto; padding: 28px 32px 40px; display: flex; flex-direction: column; gap: 28px; }
.bd__section-title { font-family: 'Public Sans',system-ui,sans-serif; font-size: 16px; font-weight: 700; color: var(--absa-enrich, #131010); margin: 0 0 12px; }
.bd__subsection-title { font-family: 'Public Sans',system-ui,sans-serif; font-size: 13px; font-weight: 600; color: var(--absa-enrich, #131010); margin: 0 0 10px; }

/* ── KPI strip ── */
.bd__kpi-strip {
  display: flex; align-items: flex-start; gap: 0;
  background: #fff; border: 1px solid #E8E8EC; border-radius: 4px; padding: 14px 0;
}
.bd__kpi { flex: 1; display: flex; flex-direction: column; gap: 2px; padding: 0 20px; border-right: 1px solid #F3F4F6; }
.bd__kpi:last-child { border-right: none; }
.bd__kpi--right { align-items: flex-end; text-align: right; }
.bd__kpi-label { font-family: 'Inter',system-ui,sans-serif; font-size: 9px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.08em; text-transform: uppercase; }
.bd__kpi-val { font-family: 'Public Sans',system-ui,sans-serif; font-size: 18px; font-weight: 700; color: var(--absa-enrich, #131010); }
.bd__kpi-val--mono { font-family: 'Space Mono',monospace; font-size: 16px; }
.bd__kpi-sub { font-family: 'Public Sans',system-ui,sans-serif; font-size: 11px; color: #9CA3AF; }

/* ── HERO: Execution Journey ── */
.bd__hero {
  background: #fff; border: 1px solid #E8E8EC; border-radius: 4px; padding: 24px 28px;
  border-left: 4px solid var(--absa-passion, #DC0037);
}
.bd__hero-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; }
.bd__hero-title { font-family: 'Public Sans',system-ui,sans-serif; font-size: 20px; font-weight: 700; color: var(--absa-enrich, #131010); margin: 0; }
.bd__hero-meta { font-family: 'Public Sans',system-ui,sans-serif; font-size: 12px; color: #9CA3AF; }

/* ── ANALYTICS: 2-column ── */
.bd__analytics { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.bd__analytics-left, .bd__analytics-right {
  background: #fff; border: 1px solid #E8E8EC; border-radius: 4px; padding: 20px 24px;
}

/* Processing grid */
.bd__processing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bd__proc { display: flex; flex-direction: column; gap: 1px; padding: 10px 12px; background: #F9FAFB; border-radius: 4px; }
.bd__proc--warn { background: rgba(119,2,30,0.04); }
.bd__proc-label { font-family: 'Inter',system-ui,sans-serif; font-size: 9px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.06em; text-transform: uppercase; }
.bd__proc-val { font-family: 'Public Sans',system-ui,sans-serif; font-size: 18px; font-weight: 700; color: var(--absa-enrich, #131010); }
.bd__proc--warn .bd__proc-val { color: var(--absa-inspire, #77021E); }

/* Rules */
.bd__rules { margin-top: 16px; }
.bd__rule { font-size: 12px; color: #6B7280; display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.bd__rule-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.bd__rule-dot--pass { background: var(--absa-passion, #DC0037); }
.bd__rule-dot--warn { background: var(--absa-energy, #FF780F); }
.bd__rule-dot--fail { background: var(--absa-inspire, #77021E); }

/* Rejection bars */
.bd__rej-bars { display: flex; flex-direction: column; gap: 10px; }
.bd__rej-row { display: flex; align-items: center; gap: 10px; }
.bd__rej-label { width: 100px; font-size: 11px; color: #6B7280; text-align: right; flex-shrink: 0; }
.bd__rej-bar { flex: 1; height: 8px; background: #E8E8EC; border-radius: 4px; overflow: hidden; }
.bd__rej-fill { height: 100%; border-radius: 4px; }
.bd__rej-fill--biz { background: var(--absa-passion, #DC0037); }
.bd__rej-fill--fmt { background: var(--absa-power, #B50232); }
.bd__rej-fill--mis { background: var(--absa-hope, #95052A); }
.bd__rej-fill--dup { background: var(--absa-inspire, #77021E); }
.bd__rej-pct { width: 32px; font-size: 11px; font-weight: 700; color: var(--absa-enrich, #131010); text-align: right; }

/* ── INVESTIGATION: Tabs ── */
.bd__investigation { background: #fff; border: 1px solid #E8E8EC; border-radius: 4px; padding: 20px 24px; }
.bd__tabs { display: flex; gap: 0; border-bottom: 2px solid #E8E8EC; margin-bottom: 16px; }
.bd__tab {
  font-family: 'Public Sans',system-ui,sans-serif; font-size: 13px; font-weight: 600;
  color: #6B7280; padding: 8px 16px; cursor: pointer; border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: all 0.15s ease;
}
.bd__tab:hover { color: var(--absa-enrich, #131010); }
.bd__tab--active { color: var(--absa-passion, #DC0037); border-bottom-color: var(--absa-passion, #DC0037); }

/* Tables */
.bd__table-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.bd__search { height: 32px; padding: 0 10px; border: 1px solid #E8E8EC; border-radius: 4px; font-size: 12px; color: var(--absa-enrich, #131010); outline: none; flex: 1; max-width: 260px; }
.bd__search:focus { border-color: var(--absa-passion, #DC0037); }
.bd__filter { font-size: 12px; color: #6B7280; cursor: pointer; }
.bd__log-flts { display: flex; gap: 2px; }
.bd__log-flt { font-size: 10px; font-weight: 700; color: #6B7280; padding: 3px 8px; border-radius: 2px; cursor: pointer; }
.bd__log-flt--on { background: rgba(220,0,55,0.08); color: var(--absa-passion, #DC0037); }

.bd__table-wrap { overflow-x: auto; }
.bd__table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.bd__table thead th { font-size: 10px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.05em; text-transform: uppercase; text-align: left; padding: 10px 10px; border-bottom: 1px solid #E8E8EC; white-space: nowrap; }
.bd__table tbody td { padding: 9px 10px; border-bottom: 1px solid #F3F4F6; font-size: 12px; color: var(--absa-enrich, #131010); }
.bd__table tbody tr:hover { background: #F9FAFB; }
.bd__mono { font-family: 'Space Mono',monospace; font-size: 11px !important; color: #6B7280 !important; }
.bd__warn { color: var(--absa-inspire, #77021E) !important; font-weight: 600; }

.bd__pagination { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #E8E8EC; margin-top: 12px; font-size: 12px; color: #6B7280; }
.bd__pages { display: flex; gap: 4px; }
.bd__pages button { min-width: 26px; height: 26px; border: 1px solid #E8E8EC; border-radius: 2px; background: #fff; color: #6B7280; font-size: 11px; font-weight: 600; cursor: pointer; }
.bd__pages button:hover { border-color: var(--absa-passion, #DC0037); color: var(--absa-passion, #DC0037); }
.bd__pg--on { background: var(--absa-passion, #DC0037) !important; color: #fff !important; border-color: var(--absa-passion, #DC0037) !important; }

/* ── INFRA ── */
.bd__infra-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

@media (max-width: 1200px) {
  .bd__analytics { grid-template-columns: 1fr; }
  .bd__infra-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .bd__content { padding: 16px; gap: 20px; }
  .bd__kpi-strip { flex-wrap: wrap; }
  .bd__kpi { flex: 0 0 50%; border-right: none; border-bottom: 1px solid #F3F4F6; padding: 10px 16px; }
}
</style>
