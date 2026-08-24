<template>
  <div class="flex items-center gap-2">
    <div class="w-2 h-2 rounded-full flex-shrink-0"
      :class="direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600'"></div>
    <div class="flex-1">
      <div class="flex justify-between items-center mb-0.5">
        <span class="text-xs font-semibold text-absa-enrich">{{ feature }}</span>
        <span class="text-[11px] font-bold font-mono"
          :class="direction === 'risk' ? 'text-absa-passion' : 'text-green-600'">
          {{ direction === 'risk' ? '+' : '' }}{{ contribution }}%
        </span>
      </div>
      <div class="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full rounded-full transition-all"
          :class="direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600'"
          :style="{ width: Math.abs(contribution) + '%' }"></div>
      </div>
      <p v-if="desc" class="text-[10px] text-gray-400 mt-0.5">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'AiShapDriverBar' })
defineProps({
  feature:      { type: String,  required: true },
  contribution: { type: Number,  required: true },
  direction:    { type: String,  default: 'risk' },
  desc:         { type: String,  default: '' },
})
</script>
