<template>
  <div
    v-bind="$attrs"
    @click="handleClick"
    role="button"
    :tabindex="navigateTo ? 0 : undefined"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
    :class="[
      'relative bg-white border border-gray-200 p-5 transition-all duration-200 overflow-hidden group',
      navigateTo ? 'cursor-pointer hover:border-[var(--brand-primary)]/40 hover:shadow-sm' : 'cursor-default',
      accentColor ? 'border-t-4' : '',
      loading ? 'pointer-events-none' : ''
    ]"
    :style="accentColor ? { borderTopColor: accentColor } : {}"
  >
    <div class="absolute inset-0 dotted-pattern pointer-events-none" aria-hidden="true"></div>

    <div class="relative z-10">
      <div class="flex items-start justify-between mb-3">
        <span class="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase truncate">
          {{ label }}
        </span>
        <span
          v-if="trend !== undefined && trend !== null"
          :class="[
            'text-[10px] font-mono font-bold tracking-wider flex items-center gap-1 shrink-0 ml-2',
            trend >= 0 ? 'text-green-600' : 'text-red-500'
          ]"
        >
          <i v-if="trend > 0" class="fas fa-arrow-up text-[8px]"></i>
          <i v-else-if="trend < 0" class="fas fa-arrow-down text-[8px]"></i>
          {{ trend >= 0 ? '+' : '' }}{{ trend }}%
        </span>
      </div>

      <div class="flex items-end justify-between gap-3">
        <div v-if="!loading" class="text-2xl font-bold tracking-tight text-gray-900 truncate">
          {{ formattedValue }}
        </div>
        <div v-else class="h-8 w-2/3 bg-gray-200 animate-pulse rounded-none"></div>

        <div v-if="navigateTo" class="flex items-center gap-1 text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors shrink-0">
          <i class="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
        </div>
      </div>

      <div v-if="subLabel" class="mt-2">
        <span class="text-[10px] font-mono text-gray-400 tracking-wider">{{ subLabel }}</span>
      </div>

      <div v-if="actions.length > 0" class="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
        <button
          v-for="(action, i) in actions"
          :key="i"
          @click.stop="handleAction(action)"
          :class="[
            'inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded transition-all',
            action.variant === 'primary'
              ? 'bg-[var(--brand-primary)] text-white hover:brightness-110'
              : action.variant === 'ghost'
                ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                : 'border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 hover:bg-gray-50'
          ]"
        >
          <i v-if="action.icon" :class="[action.icon, 'text-[9px]']"></i>
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], default: null },
  format: { type: String, default: 'number' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  currency: { type: String, default: '' },
  trend: { type: Number, default: null },
  subLabel: { type: String, default: '' },
  navigateTo: { type: [String, Object], default: null },
  loading: { type: Boolean, default: false },
  decimals: { type: Number, default: 2 },
  accentColor: { type: String, default: '' },
  actions: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined) return '—'
  if (props.format === 'currency') {
    const sym = props.currency || 'K'
    const n = Number(props.value)
    return `${props.prefix}${sym} ${n.toLocaleString(undefined, { minimumFractionDigits: props.decimals, maximumFractionDigits: props.decimals })}${props.suffix}`
  }
  if (props.format === 'number') {
    const n = Number(props.value)
    return `${props.prefix}${n.toLocaleString()}${props.suffix}`
  }
  if (props.format === 'percentage') {
    return `${props.prefix}${Number(props.value).toFixed(props.decimals)}%${props.suffix}`
  }
  return `${props.prefix}${props.value}${props.suffix}`
})

function handleClick() {
  if (props.navigateTo && router) {
    router.push(props.navigateTo)
  }
}

function handleAction(action) {
  if (action.to && router) {
    router.push(action.to)
  } else if (action.fn) {
    action.fn()
  }
}
</script>
