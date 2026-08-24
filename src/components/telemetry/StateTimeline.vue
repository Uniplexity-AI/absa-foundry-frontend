<script setup>
import { computed } from 'vue'
import { stateTier, tierColor } from '@/composables/useSeverityTier'

defineOptions({ name: 'StateTimeline' })

const props = defineProps({
  // [{ state, timestamp, label? }]
  transitions: { type: Array, default: () => [] },
})

const items = computed(() => props.transitions || [])

function colorFor(state) {
  return tierColor(stateTier(state))
}
</script>

<template>
  <div
    class="bg-surface rounded border border-outline-variant p-4 global-dotted-bg shadow-sm"
  >
    <div v-if="items.length === 0" class="p-6 text-center text-body-md text-secondary">
      No state transitions recorded
    </div>
    <ol v-else class="relative border-l border-outline-variant ml-2 space-y-5">
      <li v-for="(t, i) in items" :key="i" class="ml-4">
        <span
          class="absolute -left-[5px] w-2.5 h-2.5 rounded-full ring-2 ring-surface"
          :style="{ backgroundColor: colorFor(t.state) }"
        ></span>
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-label uppercase tracking-wide font-bold"
            :style="{ color: colorFor(t.state) }"
            >{{ String(t.state).toUpperCase().replace(/_/g, ' ') }}</span
          >
          <span v-if="t.timestamp" class="text-xs text-on-surface-variant">{{ t.timestamp }}</span>
        </div>
        <p v-if="t.label" class="text-sm text-on-surface-variant mt-0.5">{{ t.label }}</p>
      </li>
    </ol>
  </div>
</template>
