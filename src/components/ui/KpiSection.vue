<template>
  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xs font-mono font-bold tracking-[0.25em] text-gray-500 uppercase">
        {{ title }}
      </h2>
      <div class="flex items-center gap-2">
        <button
          v-if="showKpiToggle"
          @click="toggleKpis"
          class="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all"
        >
          <i class="fas fa-eye-slash mr-1.5 text-[9px]"></i>
          {{ showKpis ? 'Hide' : 'Show' }} KPIs
        </button>
        <button
          v-if="showGraphToggle"
          @click="$emit('toggle-graphs')"
          class="text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all"
        >
          <i class="fas fa-chart-line mr-1.5 text-[9px]"></i>
          {{ graphsVisible ? 'Hide' : 'Show' }} Graphs
        </button>
        <slot name="actions" />
      </div>
    </div>

    <transition name="kpi-fade">
      <div v-if="showKpis" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <slot name="kpis" />
      </div>
    </transition>

    <transition name="kpi-fade">
      <div v-if="graphsVisible">
        <slot name="graphs" />
      </div>
    </transition>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'KEY METRICS' },
  showKpis: { type: Boolean, default: true },
  graphsVisible: { type: Boolean, default: true },
  showKpiToggle: { type: Boolean, default: true },
  showGraphToggle: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-kpis', 'toggle-graphs'])

function toggleKpis() {
  emit('toggle-kpis')
}
</script>

<style scoped>
.kpi-fade-enter-active,
.kpi-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.kpi-fade-enter-from,
.kpi-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
