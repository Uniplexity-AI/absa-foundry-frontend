<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-30 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-2 h-8 bg-[var(--brand-primary)] shrink-0"></div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-gray-400 uppercase truncate">
            <button
              v-if="backRoute"
              @click="handleBack"
              class="hover:text-gray-700 transition-colors shrink-0"
              :aria-label="`Back to ${backLabel}`"
            >
              &larr; {{ backLabel }}
            </button>
            <template v-else>
              <span class="hidden sm:inline">&larr; MODULE</span>
            </template>
            <span class="text-gray-300 hidden sm:inline">//</span>
            <span class="hidden sm:inline text-gray-500 truncate">{{ parentModule }}</span>
            <span class="text-gray-300 hidden sm:inline">//</span>
            <span class="text-gray-900 truncate">{{ currentView }}</span>
          </div>
          <h1 v-if="title" class="text-xl font-bold text-gray-900 tracking-tight truncate">
            {{ title }}
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  parentModule: {
    type: String,
    default: 'DASHBOARD'
  },
  currentView: {
    type: String,
    default: 'HOME'
  },
  title: {
    type: String,
    default: ''
  },
  backRoute: {
    type: [String, Object],
    default: null
  },
  backLabel: {
    type: String,
    default: 'MODULE'
  }
})

const router = useRouter()

function handleBack() {
  if (props.backRoute) {
    router.push(props.backRoute)
  }
}
</script>
