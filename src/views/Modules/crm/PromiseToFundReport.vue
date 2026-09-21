<script setup>
import { ref, onMounted } from 'vue'
import { fetchPromiseToFundReport } from '@/services/crmApi'

const records = ref([])
const loading = ref(true)

onMounted(async () => {
  records.value = await fetchPromiseToFundReport()
  loading.value = false
})
</script>

<template>
  <div class="w-full pt-6 px-6 pb-8">
    <div class="mb-6 pb-4 border-b border-gray-300">
      <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Promise to Fund Report</h1>
      <p class="text-xs text-gray-500 mt-1">Overview of all tracked funding promises from CRM engagements.</p>
    </div>

    <div class="bg-white border border-gray-300 rounded-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Customer ID</th>
              <th scope="col" class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Name</th>
              <th scope="col" class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Amount</th>
              <th scope="col" class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Expected Date</th>
              <th scope="col" class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-if="loading">
              <td colspan="5" class="px-4 py-8 text-center text-xs text-gray-500">Loading records...</td>
            </tr>
            <tr v-else-if="!records.length">
              <td colspan="5" class="px-4 py-8 text-center text-xs text-gray-500">No Promise to Fund records found.</td>
            </tr>
            <tr v-else v-for="r in records" :key="r.id" class="hover:bg-gray-50">
              <td class="px-4 py-3 text-xs font-mono text-gray-600">{{ r.customerId }}</td>
              <td class="px-4 py-3 text-xs font-bold text-absa-enrich">{{ r.customerName }}</td>
              <td class="px-4 py-3 text-xs font-mono text-absa-enrich">{{ r.amount.toLocaleString() }}</td>
              <td class="px-4 py-3 text-xs text-gray-600">{{ r.date }}</td>
              <td class="px-4 py-3">
                <span :class="r.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'" class="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide">
                  {{ r.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
