<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>
      <div class="relative bg-white border border-gray-200 shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Export Preview</h3>
            <p class="text-[10px] font-mono text-gray-400 tracking-wider mt-0.5">{{ title }}</p>
          </div>
          <button @click="close" class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Preview Table -->
        <div class="flex-1 overflow-auto px-6 py-4">
          <table v-if="columns.length > 0 && rows.length > 0" class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200">
                <th v-for="col in columns" :key="col.key" class="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase py-2 pr-4 whitespace-nowrap">
                  {{ col.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in previewRows" :key="i" class="border-b border-gray-100 last:border-0">
                <td v-for="col in columns" :key="col.key" class="py-2 pr-4 text-sm text-gray-700 truncate max-w-[200px]">
                  {{ row[col.key] ?? '—' }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="flex flex-col items-center justify-center py-16 text-gray-400">
            <i class="fas fa-file-export text-3xl mb-3"></i>
            <p class="text-sm font-mono">No data to preview</p>
          </div>
          <p v-if="rows.length > previewCount" class="mt-2 text-[10px] font-mono text-gray-400">
            Showing {{ previewCount }} of {{ rows.length }} rows
          </p>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button @click="close" class="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-500 hover:text-gray-800 transition-colors px-4 py-2">
            Cancel
          </button>
          <div class="flex items-center gap-2">
            <button
              @click="exportFormat('pdf')"
              class="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-red-700 transition-all"
            >
              <i class="fas fa-file-pdf"></i>
              Export PDF
            </button>
            <button
              @click="exportFormat('excel')"
              class="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-emerald-700 transition-all"
            >
              <i class="fas fa-file-excel"></i>
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  previewCount: { type: Number, default: 10 }
})

const emit = defineEmits(['close', 'export'])

const previewRows = computed(() => props.rows.slice(0, props.previewCount))

function close() {
  emit('close')
}

function exportFormat(format) {
  emit('export', format)
}
</script>
