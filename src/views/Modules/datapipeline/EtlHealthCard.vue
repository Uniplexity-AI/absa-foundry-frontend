<template>
  <div class="absa-etl-health-card">
    <div class="absa-etl-health-card__body">
      <div class="absa-etl-health-card__icon">
        <div v-html="icon"></div>
      </div>
      <div>
        <div class="absa-etl-health-card__label">{{ label }}</div>
        <div class="absa-etl-health-card__value">{{ value }}</div>
      </div>
    </div>
    <div class="absa-etl-health-card__status">
      <div class="absa-etl-health-card__dot" :class="'absa-etl-health-card__dot--' + statusColor"></div>
      <div class="absa-etl-health-card__stat" :class="'absa-etl-health-card__stat--' + statusColor">{{ stat }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
  statusColor: { type: String, default: 'good' },
  stat: { type: String, default: '' }
})
</script>

<style scoped>
.absa-etl-health-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #E8E8EC;
  border-radius: 4px;
  padding: 29.83px 21px;
}

.absa-etl-health-card__body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.absa-etl-health-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
}

.absa-etl-health-card__label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  letter-spacing: 0.6px;
  line-height: 16px;
}

.absa-etl-health-card__value {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--absa-enrich, #131010);
  line-height: 32px;
}

.absa-etl-health-card__status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.absa-etl-health-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.absa-etl-health-card__dot--good { background: var(--absa-passion, #DC0037); }
.absa-etl-health-card__dot--warn  { background: var(--absa-energy, #FF780F); }

.absa-etl-health-card__stat {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
}

.absa-etl-health-card__stat--good { color: var(--absa-passion, #DC0037); }
.absa-etl-health-card__stat--warn { color: var(--absa-energy, #FF780F); }
</style>
