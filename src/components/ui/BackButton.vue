<template>
  <button
    v-if="route || useHistory"
    @click="handleBack"
    :class="[
      variant === 'icon-only'
        ? 'text-gray-400 hover:text-[var(--brand-primary)] transition-colors'
        : variant === 'pill'
          ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all bg-white'
          : 'inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-gray-500 hover:text-[var(--brand-primary)] transition-colors'
    ]"
    :aria-label="ariaLabel"
  >
    <i class="fas fa-arrow-left" :class="variant === 'icon-only' ? 'text-lg' : 'text-[10px]'"></i>
    <span v-if="variant !== 'icon-only'">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  route: { type: [String, Object], default: null },
  label: { type: String, default: 'Back' },
  variant: { type: String, default: 'default' },
  useHistory: { type: Boolean, default: false }
})

const router = useRouter()

const ariaLabel = computed(() => props.label ? `Back to ${props.label}` : 'Go back')

function handleBack() {
  if (props.route) {
    router.push(props.route)
  } else {
    router.back()
  }
}
</script>
