<template>
  <div class="flex items-center gap-2">
    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div class="h-full rounded-full transition-all"
        :class="score >= 80 ? 'bg-green-600' : score >= 65 ? 'bg-amber-500' : 'bg-absa-passion'"
        :style="{ width: score + '%' }"></div>
    </div>
    <span class="text-[11px] font-bold font-mono"
      :class="score >= 80 ? 'text-green-600' : score >= 65 ? 'text-amber-700' : 'text-absa-passion'">
      {{ score }}%
    </span>
    <span v-if="label" class="text-[10px] text-gray-400">{{ label }}</span>
  </div>
</template>

<script setup>
defineOptions({ name: 'AiConfidenceBadge' })
defineProps({
  score: { type: Number, required: true },
  label: { type: String, default: '' },
})
</script>
