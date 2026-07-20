<template>
  <header class="bg-white border-b sticky top-0 z-30 relative" style="border-color:#E8E8EC">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-1 h-8 rounded-full shrink-0 absa-gradient-maroon-vertical"></div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase truncate" style="font-family:'Space Mono',monospace">
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
          <h1 v-if="title" class="text-lg font-extrabold text-gray-900 truncate" style="letter-spacing:-0.02em">
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
