<template>
  <div class="etl-timeline">
    <div v-for="(stage, i) in stages" :key="i" class="etl-timeline__row">
      <!-- Dot + line -->
      <div class="etl-timeline__track">
        <div class="etl-timeline__dot" :class="'etl-timeline__dot--' + stage.status"></div>
        <div v-if="i < stages.length - 1" class="etl-timeline__line" :class="'etl-timeline__line--' + stage.status"></div>
      </div>

      <!-- Content -->
      <div class="etl-timeline__body" :class="{ 'etl-timeline__body--failed': stage.status === 'failed' }">
        <div class="etl-timeline__header">
          <span class="etl-timeline__time">{{ stage.timestamp }}</span>
          <span class="etl-timeline__label">{{ stage.label }}</span>
          <span v-if="stage.duration" class="etl-timeline__duration">{{ stage.duration }}</span>
          <AbsaBadge
            :state="stage.status === 'completed' ? 'completed' : stage.status === 'failed' ? 'failed' : stage.status === 'running' ? 'running' : 'info'"
            size="sm"
            :no-dot="false"
          >{{ stage.status.toUpperCase() }}</AbsaBadge>
        </div>

        <!-- Failure details -->
        <div v-if="stage.status === 'failed' && stage.failure" class="etl-timeline__failure">
          <div class="etl-timeline__failure-reason">{{ stage.failure.reason }}</div>
          <div v-if="stage.failure.rejected" class="etl-timeline__failure-meta">Rejected: {{ stage.failure.rejected }}</div>
          <div v-if="stage.failure.retry" class="etl-timeline__failure-meta">Retry: {{ stage.failure.retry }}</div>
        </div>

        <!-- Optional message -->
        <p v-if="stage.message" class="etl-timeline__msg">{{ stage.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AbsaBadge } from '@/components/ui'

defineProps({
  stages: { type: Array, required: true }
  // Each: { label, timestamp, duration, status, message, failure }
})
</script>

<style scoped>
.etl-timeline { display: flex; flex-direction: column; }

.etl-timeline__row { display: flex; gap: 16px; }

.etl-timeline__track {
  display: flex; flex-direction: column; align-items: center;
  width: 24px; flex-shrink: 0;
}

.etl-timeline__dot {
  width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
  margin-top: 4px;
}

.etl-timeline__dot--completed { background: var(--absa-passion, #DC0037); }
.etl-timeline__dot--failed    { background: var(--absa-inspire, #77021E); }
.etl-timeline__dot--running   { background: var(--absa-power, #B50232); animation: tlPulse 1.5s ease-in-out infinite; }

.etl-timeline__line {
  width: 2px; flex: 1; min-height: 24px; margin: 4px 0;
}

.etl-timeline__line--completed { background: var(--absa-passion, #DC0037); opacity: 0.3; }
.etl-timeline__line--failed    { background: var(--absa-inspire, #77021E); opacity: 0.3; }
.etl-timeline__line--running   { background: var(--absa-power, #B50232); opacity: 0.3; }

@keyframes tlPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

.etl-timeline__body {
  flex: 1; padding-bottom: 20px;
}

.etl-timeline__body--failed {
  background: rgba(119,2,30,0.04); border: 1px solid rgba(119,2,30,0.1); border-radius: 4px;
  padding: 12px 16px; margin-bottom: 4px;
}

.etl-timeline__header {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}

.etl-timeline__time {
  font-family: 'Space Mono', monospace;
  font-size: 11px; color: #9CA3AF; font-weight: 600;
}

.etl-timeline__label {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 13px; font-weight: 600; color: var(--absa-enrich, #131010);
}

.etl-timeline__duration {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: #9CA3AF; margin-left: auto;
}

.etl-timeline__msg {
  margin: 4px 0 0; font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; color: #6B7280;
}

.etl-timeline__failure { margin-top: 8px; }

.etl-timeline__failure-reason {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 12px; font-weight: 600; color: var(--absa-inspire, #77021E);
}

.etl-timeline__failure-meta {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 11px; color: #6B7280; margin-top: 2px;
}
</style>
