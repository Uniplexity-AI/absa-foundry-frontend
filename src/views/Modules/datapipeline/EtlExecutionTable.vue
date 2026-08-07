<template>
  <div class="absa-etl-table-section">
    <div class="absa-etl-table-section__header">
      <h3 class="absa-etl-table-section__title">Execution History</h3>
      <div class="absa-etl-table-section__filter">
        <span class="absa-etl-table-section__filter-label">Filter by:</span>
        <div class="absa-etl-table-section__dropdown">
          <span>All Statuses</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="var(--absa-enrich, #131010)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
    <div class="absa-etl-table-wrap">
      <table class="absa-etl-table">
        <thead>
          <tr>
            <th>RUN ID</th>
            <th>BATCH ID</th>
            <th>DURATION</th>
            <th>ROWS (RCV/VAL/LD/REJ)</th>
            <th>QUALITY<br/>SCORE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="run in rows" :key="run.id">
            <td class="absa-etl-table__run-id">
              <div class="absa-etl-table__run-divider" :class="'absa-etl-table__run-divider--' + run.statusClass"></div>
              <span class="absa-etl-table__run-text">#RUN-{{ run.runId }}</span>
            </td>
            <td class="absa-etl-table__batch">{{ run.batchId }}</td>
            <td class="absa-etl-table__duration">{{ run.duration }}</td>
            <td>
              <div class="absa-etl-table__rows">
                <span>{{ run.rowsReceived }}</span>
                <span class="absa-etl-table__sep">/</span>
                <span class="absa-etl-table__valid">{{ run.rowsValid }}</span>
                <span class="absa-etl-table__sep">/</span>
                <span>{{ run.rowsLoaded }}</span>
                <span class="absa-etl-table__sep">/</span>
                <span class="absa-etl-table__rejected" :class="{ 'absa-etl-table__rejected--warn': run.rowsRejected > 0 }">{{ run.rowsRejected }}</span>
              </div>
            </td>
            <td>
              <div class="absa-etl-table__quality">
                <div class="absa-etl-table__quality-bar">
                  <div class="absa-etl-table__quality-fill" :class="'absa-etl-table__quality-fill--' + run.qualityClass" :style="{ width: run.qualityScore + '%' }"></div>
                </div>
                <span class="absa-etl-table__quality-val" :class="'absa-etl-table__quality-val--' + run.qualityClass">{{ run.qualityScore }}%</span>
              </div>
            </td>
            <td>
              <span class="absa-etl-table__status" :class="'absa-etl-table__status--' + run.statusClass">
                <span class="absa-etl-table__status-dot" :class="'absa-etl-table__status-dot--' + run.statusClass"></span>
                {{ run.status }}
              </span>
            </td>
            <td class="absa-etl-table__action-cell">
              <div class="absa-etl-table__action-wrap">
                <button class="absa-etl-table__action-btn" @click.stop="$emit('toggleMenu', run.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
                <div class="absa-etl-table__dropdown" v-if="openMenuId === run.id" @click.stop>
                  <button class="absa-etl-table__dropdown-item" @click="$emit('viewRun', run)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                  </button>
                  <button class="absa-etl-table__dropdown-item" v-if="run.statusClass === 'failed'" @click="$emit('retryRun', run)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                    Retry
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="absa-etl-table-section__pagination">
      <span>Showing 1-4 of 8842 executions</span>
      <div class="absa-etl-table-section__page-btns">
        <button disabled class="absa-etl-table-section__page-nav">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="absa-etl-table-section__page-btn absa-etl-table-section__page-btn--active">1</button>
        <button class="absa-etl-table-section__page-btn">2</button>
        <button class="absa-etl-table-section__page-btn">3</button>
        <button class="absa-etl-table-section__page-btn">...</button>
        <button class="absa-etl-table-section__page-btn">2211</button>
        <button class="absa-etl-table-section__page-nav">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rows: { type: Array, required: true },
  openMenuId: { type: [Number, null], default: null }
})

defineEmits(['toggleMenu', 'viewRun', 'retryRun'])
</script>

<style scoped>
.absa-etl-table-section {
  background: #fff;
  border: 1px solid #E8E8EC;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.absa-etl-table-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 17px;
  background: #F9FAFB;
  border-bottom: 1px solid #E8E8EC;
}

.absa-etl-table-section__title {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 18px; font-weight: 700;
  color: var(--absa-enrich, #131010);
  line-height: 28px; margin: 0;
}

.absa-etl-table-section__filter { display: flex; align-items: center; gap: 8px; }

.absa-etl-table-section__filter-label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 600;
  color: #6B7280; letter-spacing: 0.6px; line-height: 16px;
}

.absa-etl-table-section__dropdown {
  display: flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid #E8E8EC; border-radius: 2px;
  padding: 5px 9px; cursor: pointer;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 600;
  color: var(--absa-enrich, #131010);
  letter-spacing: 0.6px; line-height: 16px;
}

.absa-etl-table-wrap { overflow-x: auto; }

.absa-etl-table { width: 100%; border-collapse: collapse; font-size: 0.825rem; }

.absa-etl-table thead th {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 700; color: #6B7280;
  letter-spacing: 0.6px; text-transform: uppercase; text-align: left;
  padding: 24px 24px 24.5px; border-bottom: 1px solid #E8E8EC;
  white-space: nowrap;
}

.absa-etl-table tbody tr { border-bottom: 1px solid #E8E8EC; }
.absa-etl-table tbody tr:hover { background: #F9FAFB; }
.absa-etl-table tbody tr:last-child { border-bottom: none; }
.absa-etl-table tbody td { padding: 16px 24px; vertical-align: middle; }

.absa-etl-table__run-id {
  display: flex; align-items: center; gap: 16px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px; font-weight: 400;
  color: var(--absa-passion, #DC0037); line-height: 24px;
}

.absa-etl-table__run-divider { width: 1.39px; height: 32px; border-radius: 0; flex-shrink: 0; }
.absa-etl-table__run-divider--completed { background: var(--absa-passion, #DC0037); }
.absa-etl-table__run-divider--failed    { background: var(--absa-inspire, #77021E); }
.absa-etl-table__run-divider--running   { background: var(--absa-power, #B50232); }
.absa-etl-table__run-text { white-space: nowrap; }

.absa-etl-table__batch {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px; font-weight: 400;
  color: var(--absa-enrich, #131010); line-height: 20px; white-space: nowrap;
}

.absa-etl-table__duration {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 14px; font-style: italic; font-weight: 400;
  color: #6B7280; line-height: 20px; white-space: nowrap;
}

.absa-etl-table__rows {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 600;
  color: var(--absa-enrich, #131010);
  letter-spacing: 0.6px; line-height: 16px; white-space: nowrap;
}

.absa-etl-table__sep { color: #6B7280; }
.absa-etl-table__valid { color: var(--absa-enrich, #131010); }
.absa-etl-table__rejected { font-weight: 700; }
.absa-etl-table__rejected--warn { color: var(--absa-inspire, #77021E); }

.absa-etl-table__quality { display: flex; align-items: center; gap: 8px; }
.absa-etl-table__quality-bar { width: 60px; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.absa-etl-table__quality-fill { height: 100%; border-radius: 3px; }
.absa-etl-table__quality-fill--good    { background: var(--absa-passion, #DC0037); }
.absa-etl-table__quality-fill--warning { background: var(--absa-energy, #FF780F); }
.absa-etl-table__quality-val { font-size: 14px; font-weight: 700; white-space: nowrap; }
.absa-etl-table__quality-val--good    { color: var(--absa-passion, #DC0037); }
.absa-etl-table__quality-val--warning { color: var(--absa-energy, #FF780F); }

/* Status Badges */
.absa-etl-table__status {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.6px;
  padding: 6px 12px; border-radius: 4px; white-space: nowrap;
}

.absa-etl-table__status--completed {
  background: rgba(220, 0, 55, 0.08); color: var(--absa-passion, #DC0037);
}
.absa-etl-table__status--running {
  background: rgba(181, 2, 50, 0.08); color: var(--absa-power, #B50232);
}
.absa-etl-table__status--failed {
  background: rgba(119, 2, 30, 0.08); color: var(--absa-inspire, #77021E);
}

.absa-etl-table__status-dot { width: 6px; height: 6px; border-radius: 50%; }
.absa-etl-table__status-dot--completed { background: var(--absa-passion, #DC0037); }
.absa-etl-table__status-dot--running   { background: var(--absa-power, #B50232); animation: absaPulse 1.5s ease-in-out infinite; }
.absa-etl-table__status-dot--failed    { background: var(--absa-inspire, #77021E); }

@keyframes absaPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Action */
.absa-etl-table__action-btn {
  background: none; border: none; cursor: pointer;
  color: #6B7280; padding: 4px;
  display: flex; align-items: center; justify-content: center;
}
.absa-etl-table__action-btn:hover { color: var(--absa-passion, #DC0037); }
.absa-etl-table__action-cell { position: relative; }
.absa-etl-table__action-wrap { position: relative; display: inline-block; }

.absa-etl-table__dropdown {
  position: absolute; right: 0; top: 100%; z-index: 20;
  background: #fff; border: 1px solid #E8E8EC; border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px; padding: 4px 0; margin-top: 4px;
}

.absa-etl-table__dropdown-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; padding: 8px 16px;
  border: none; background: none;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 13px; font-weight: 500;
  color: var(--absa-enrich, #131010);
  cursor: pointer; text-align: left;
  transition: background 0.1s ease;
}
.absa-etl-table__dropdown-item:hover { background: #F8F8FA; color: var(--absa-passion, #DC0037); }

/* Pagination */
.absa-etl-table-section__pagination {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 24px; border-top: 1px solid #E8E8EC;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; color: #6B7280; line-height: 16px;
}

.absa-etl-table-section__page-btns { display: flex; gap: 4px; }

.absa-etl-table-section__page-btn,
.absa-etl-table-section__page-nav {
  min-width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #E8E8EC; border-radius: 2px;
  background: #fff; color: #6B7280;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 150ms ease;
}

.absa-etl-table-section__page-btn:hover,
.absa-etl-table-section__page-nav:hover {
  border-color: var(--absa-passion, #DC0037); color: var(--absa-passion, #DC0037);
}

.absa-etl-table-section__page-btn:disabled,
.absa-etl-table-section__page-nav:disabled { opacity: 0.35; cursor: not-allowed; }

.absa-etl-table-section__page-btn--active {
  background: var(--absa-passion, #DC0037) !important;
  color: #fff !important;
  border-color: var(--absa-passion, #DC0037) !important;
}

.absa-etl-table-section__page-nav { border: none; background: none; }
</style>
