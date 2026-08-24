<script setup>
import { computed } from 'vue'
import { stateTier, tierColor } from '@/composables/useSeverityTier'

defineOptions({ name: 'StateBadge' })

const props = defineProps({
  state: { type: String, required: true },
  label: { type: String, default: '' },
})

const normalized = computed(() =>
  String(props.state).toUpperCase().replace(/_/g, ' ')
)
const tier = computed(() => stateTier(props.state))
const color = computed(() => tierColor(tier.value))
const display = computed(() => props.label || normalized.value)
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 text-xs font-label uppercase tracking-wide font-semibold"
    :style="{ color: color }"
  >
    <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: color }"></span>
    {{ display }}
  </span>
</template>
