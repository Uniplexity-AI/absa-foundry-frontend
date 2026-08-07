<script setup>
import { computed } from 'vue'

const props = defineProps({
  probability: { type: Number, default: null },
  showLabel: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  error: { type: [String, Boolean], default: false },
})

const emit = defineEmits(['retry'])

const pct = computed(() => {
  if (props.probability == null) return null
  return Math.round(props.probability * 100)
})

const color = computed(() => {
  if (props.probability == null) return '#E5E7EB'
  if (props.probability < 0.30) return 'var(--absa-success, #16A34A)'
  if (props.probability <= 0.60) return 'var(--absa-warning, #F59E0B)'
  return 'var(--absa-critical, #DC2626)'
})

const label = computed(() => {
  if (props.probability == null) return 'No data'
  if (props.probability < 0.30) return 'Low Risk'
  if (props.probability <= 0.60) return 'Moderate Risk'
  return 'High Risk'
})
</script>

<template>
  <div class="churn-bar">
    <!-- LOADING -->
    <div v-if="loading" class="flex flex-col gap-2">
      <div class="w-72 h-6 rounded-full bg-gray-100 animate-pulse" />
      <div v-if="showLabel" class="w-32 h-4 rounded bg-gray-100 animate-pulse" />
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="flex flex-col gap-2">
      <div class="w-72 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <span class="text-xs text-red-500">Failed to load</span>
      </div>
      <button
        class="text-xs text-gray-500 underline hover:text-gray-700 self-start"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>

    <!-- EMPTY / NULL -->
    <div v-else-if="probability == null" class="flex flex-col gap-2">
      <div class="w-72 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <span class="text-xs text-gray-400">Not computed</span>
      </div>
    </div>

    <!-- LOADED -->
    <div v-else class="flex flex-col gap-1.5">
      <div v-if="showLabel" class="flex items-center justify-between text-sm">
        <span class="font-medium text-gray-700">Churn Risk</span>
        <span :style="{ color }" class="font-semibold">{{ pct }}%</span>
      </div>
      <div class="w-72 h-6 rounded-full bg-gray-100 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          :style="{ width: pct + '%', backgroundColor: color }"
        />
      </div>
      <div v-if="showLabel" class="flex justify-between text-xs text-gray-400">
        <span>{{ label }}</span>
        <span>{{ pct }}% probability</span>
      </div>
    </div>
  </div>
</template>
