<script setup>
import { computed, ref, watch } from 'vue'
import { downloadCsv, notify } from '@/utils/absaExport'
import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'
import { nextTick } from 'vue'
import { fetchCustomerProfile } from '@/services/customerProfileApi'

const props = defineProps({
  open: Boolean,
  engagements: Array
})

defineEmits(['close'])

const loading = ref(false)
const isExportingPdf = ref(false)
const reportContainer = ref(null)
const profiles = ref({})

// Fetch extended profile data when modal opens
watch(() => props.open, async (isOpen) => {
  if (isOpen && props.engagements && props.engagements.length) {
    loading.value = true
    const uniqueIds = [...new Set(props.engagements.map(e => e.customerId))]
    
    // Batch fetch missing profiles
    const promises = uniqueIds.map(async (id) => {
      if (!profiles.value[id]) {
        try {
          const profile = await fetchCustomerProfile(id)
          profiles.value[id] = profile || {}
        } catch (e) {
          console.warn('Failed to fetch profile for', id)
          profiles.value[id] = {}
        }
      }
    })
    await Promise.allSettled(promises)
    loading.value = false
  }
})

// Format Currency natively to avoid missing composable issues
const formatCurrency = (val) => {
  if (val == null || val === '') return '-'
  const num = parseFloat(val)
  if (isNaN(num)) return val
  return 'ZMW ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

// KPIs
const totalPromises = computed(() => props.engagements?.length || 0)
const uniqueCustomers = computed(() => {
  return new Set((props.engagements || []).map(h => h.customerId)).size
})
const totalExpectedValue = computed(() => {
  const sum = (props.engagements || []).reduce((acc, h) => {
    const amt = parseFloat(h.meta?.expectedAmount)
    return acc + (isNaN(amt) ? 0 : amt)
  }, 0)
  return formatCurrency(sum)
})

const buildExportRows = () => {
  return props.engagements.map(h => {
    const p = profiles.value[h.customerId] || {}
    return {
      'Date': fmtDate(h.at),
      'Customer ID': h.customerId || '',
      'Customer Name': h.customerName || h.customerId || 'Unknown',
      'Account Number': p.account_number || 'N/A',
      'Account Type': p.account_type || 'N/A',
      'Segment': p.market_segment || 'N/A',
      'Mobile': p.mobile_number || 'N/A',
      'Email': p.email || 'N/A',
      'Next of Kin': p.next_of_kin_name ? `${p.next_of_kin_name} (${p.next_of_kin_phone || ''})` : 'N/A',
      'Branch': p.branch_code || h.meta?.branch_to_visit || 'N/A',
      'RM': h.actor || 'RM',
      'Outcome': h.meta?.outcome || h.type || '',
      'Exp. Amount': h.meta?.expectedAmount ? 'ZMW ' + h.meta.expectedAmount : '',
      'Exp. Date': h.meta?.expectedDate || '',
      'Reason': h.meta?.dormancy_reason || '',
      'Cross Sell': h.meta?.cross_sell_details || '',
      'Experience': h.meta?.customer_experience || '',
      'Recommendation': h.meta?.recommendation || '',
      'Feedback': h.meta?.customer_feedback || '',
      'Notes': h.detail || h.meta?.notes || ''
    }
  })
}

const exportCsv = () => {
  if (!props.engagements || !props.engagements.length) {
    notify('No data to export', 'error')
    return
  }
  const rows = buildExportRows()
  const columns = Object.keys(rows[0])
  downloadCsv('absa-ptf-report.csv', rows, columns)
  notify('Excel/CSV downloaded', 'success')
}

const exportPdf = async () => {
  if (!props.engagements || !props.engagements.length) {
    notify('No data to export', 'error')
    return
  }
  
  isExportingPdf.value = true
  await nextTick()
  
  setTimeout(async () => {
    const element = reportContainer.value
    
    console.log('--- PDF EXPORT DEBUG LOGS ---')
    console.log('1. Main report element found:', !!element)
    
    // Attempt to locate KPI wrapper and cards
    const kpiWrapper = element.querySelector('.bg-gray-50.flex.flex-wrap')
    console.log('2. KPI Wrapper found:', !!kpiWrapper)
    
    if (kpiWrapper) {
      const kpiCards = kpiWrapper.children
      console.log(`3. Found ${kpiCards.length} child elements in KPI wrapper`)
      
      if (kpiCards.length > 0) {
        const firstCard = kpiCards[0]
        const rect = firstCard.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(firstCard)
        console.log('4. First KPI Card dimensions:', JSON.parse(JSON.stringify(rect)))
        console.log('5. First KPI Card styling -> display:', computedStyle.display, 'visibility:', computedStyle.visibility, 'opacity:', computedStyle.opacity, 'width:', computedStyle.width)
        console.log('6. First KPI Card HTML snippet:', firstCard.innerHTML.substring(0, 150) + '...')
      }
    }
    
    const opt = {
      margin:       0.3,
      filename:     'absa-ptf-report.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3, useCORS: true, logging: true, windowWidth: 1600 },
      jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
    }
    
    try {
      console.log('7. Starting html2pdf capture... Check html2canvas logs below.')
      await html2pdf().set(opt).from(element).save()
      console.log('8. PDF generation successful.')
      notify('PDF downloaded', 'success')
    } catch (e) {
      console.error('PDF Generation Error:', e)
      notify('Failed to generate PDF', 'error')
    } finally {
      isExportingPdf.value = false
    }
  }, 100)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <!-- Modal Container: Sharp corners, mesh background underlay -->
      <div ref="reportContainer" class="bg-white rounded-none shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? 'w-max min-w-full overflow-hidden' : 'w-full max-w-[95vw] max-h-[95vh] overflow-hidden'">
        <!-- Global Mesh Pattern inside Modal -->
        <div class="absolute inset-0 mesh-background pointer-events-none"></div>
        
        <!-- Header: Sticky, Blurred -->
        <div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shrink-0 border-b border-gray-200 bg-white">
          <div class="flex items-start gap-5">
            <img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1" :class="isExportingPdf ? '' : 'mix-blend-multiply'">
            <div class="w-1.5 h-12 bg-absa-passion shrink-0 mt-0.5"></div>
            <div>
               <!-- Font Black + Uppercase + Tracking Tight for Data/Headings -->
               <h3 class="text-xl font-black uppercase tracking-tight text-absa-enrich mb-2 font-display">
                 Promise to Fund Report
               </h3>
               <!-- Font Mono for Technical/Description text -->
               <p class="text-[10px] text-gray-500 max-w-3xl font-mono tracking-wide leading-relaxed">
                 CONSOLIDATED LEDGER OF ALL RECORDED "PROMISE TO FUND" ENGAGEMENTS. OUTLINES SPECIFIC CUSTOMER ACCOUNTS TARGETED, EXPECTED FUNDING AMOUNTS, EXPECTED COMMITMENT DATES, AND CONTACT INFORMATION FOR FOLLOW-UPS.
               </p>
            </div>
          </div>
          <button v-if="!isExportingPdf" @click="$emit('close')" class="text-gray-500 hover:text-absa-passion transition-colors self-start border border-transparent hover:border-absa-passion/30 bg-gray-50 hover:bg-absa-passion/5 p-1 rounded-none">
            <span class="material-symbols-outlined text-[24px] block">close</span>
          </button>
        </div>

        <!-- KPI Section: Left Border Accents, Mono Labels, Dotted Overlays -->
        <div class="px-8 py-5 border-b border-gray-200 flex flex-row justify-center gap-4 relative z-10 shrink-0 bg-gray-50 py-8">
          <!-- KPI 1 -->
          <div class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative z-10">
             <div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>
             <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">COUNT</div>
             <div class="relative z-10">
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Total Promises</p>
               <p class="text-2xl font-black text-gray-900 uppercase tracking-tight mt-1 font-display">{{ totalPromises }}</p>
             </div>
          </div>
          <!-- KPI 2 -->
          <div class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative z-10">
             <div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>
             <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">VALUE</div>
             <div class="relative z-10">
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Expected Value</p>
               <p class="text-2xl font-black text-gray-900 uppercase tracking-tight mt-1 font-display">{{ totalExpectedValue }}</p>
             </div>
          </div>
          <!-- KPI 3 -->
          <div class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative z-10">
             <div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>
             <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">UNIQUE</div>
             <div class="relative z-10">
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Customers</p>
               <p class="text-2xl font-black text-gray-900 uppercase tracking-tight mt-1 font-display">{{ uniqueCustomers }}</p>
             </div>
          </div>
        </div>

        <!-- Body / Table -->
        <div class="relative z-10 flex-1" :class="isExportingPdf ? 'bg-white w-full' : 'bg-white overflow-auto w-full'">
          <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <span class="material-symbols-outlined animate-spin text-4xl text-absa-passion mb-3">memory</span>
            <p class="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Compiling Ledger Data...</p>
          </div>
          <div v-else-if="engagements && engagements.length" class="w-full">
            <table class="w-full text-left border-collapse">
              <thead>
                <!-- Table Headers: Mono, Uppercase, Tracking Widest -->
                <tr class="bg-absa-passion shadow-sm">
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[120px]">Date</th>
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[220px]">Customer Info</th>
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[200px]">Account Details</th>
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[250px]">Contact Info</th>
                  <!-- Highlighted Column Header -->
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[220px]">Promise Details</th>
                  <th class="sticky top-0 bg-absa-passion z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-white/95 border-b border-absa-passion px-5 py-3 w-[300px]">Outcome & Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in engagements" :key="h.id" class="hover:bg-gray-50 transition-colors border-b border-gray-100 group">
                  
                  <!-- Date: font-mono -->
                  <td class="px-5 py-4 text-[10px] font-mono text-gray-600 align-top whitespace-nowrap">{{ fmtDate(h.at) }}</td>
                  
                  <!-- Customer Info -->
                  <td class="px-5 py-4 align-top whitespace-nowrap">
                    <div class="text-[11px] font-black font-display text-absa-enrich uppercase tracking-tight">{{ h.customerName || h.customerId || 'Unknown' }}</div>
                    <div class="text-[10px] font-mono text-gray-500 mt-1 mb-1.5 uppercase">ID: {{ h.customerId }}</div>
                    <!-- Tag: sharp corners -->
                    <span class="inline-block px-1.5 py-0.5 bg-gray-100 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-600 border border-gray-200 rounded-none">
                      {{ profiles[h.customerId]?.market_segment || 'Unknown Segment' }}
                    </span>
                  </td>
                  
                  <!-- Account Details: Mono labels -->
                  <td class="px-5 py-4 align-top whitespace-nowrap">
                    <div class="text-[11px] text-gray-800 font-mono"><span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Account: </span> {{ profiles[h.customerId]?.account_number || 'N/A' }}</div>
                    <div class="text-[11px] text-gray-600 font-mono mt-1"><span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Type: </span> {{ profiles[h.customerId]?.account_type || 'N/A' }}</div>
                    <div class="text-[11px] text-gray-600 font-mono mt-1"><span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Branch: </span> {{ profiles[h.customerId]?.branch_code || h.meta?.branch_to_visit || 'N/A' }}</div>
                  </td>
                  
                  <!-- Contact Info: Mono labels -->
                  <td class="px-5 py-4 align-top whitespace-nowrap">
                    <div class="text-[11px] text-gray-800 font-mono"><span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Mobile: </span> {{ profiles[h.customerId]?.mobile_number || 'Not on file' }}</div>
                    <div class="text-[11px] text-gray-600 font-mono mt-1"><span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Email: </span> {{ profiles[h.customerId]?.email || 'Not on file' }}</div>
                    <div class="text-[11px] text-gray-600 font-mono mt-1" :title="profiles[h.customerId]?.next_of_kin_name">
                      <span class="font-bold text-gray-500 uppercase tracking-widest text-[9px]">Next of Kin: </span> 
                      {{ profiles[h.customerId]?.next_of_kin_name || 'N/A' }} 
                      {{ profiles[h.customerId]?.next_of_kin_phone ? `(${profiles[h.customerId].next_of_kin_phone})` : '' }}
                    </div>
                  </td>
                  
                  <!-- Promise Details: Dotted pattern background, sharp borders -->
                  <td class="px-5 py-4 align-top whitespace-nowrap relative">
                    <div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 pointer-events-none"></div>
                    <div class="relative z-10">
                      <div class="text-[12px] font-black text-gray-900 font-display uppercase tracking-tight"><span class="text-gray-500 font-mono text-[9px] tracking-widest mr-1">Amount:</span> {{ formatCurrency(h.meta?.expectedAmount) }}</div>
                      <div class="text-[11px] font-bold text-gray-900 font-mono mt-1"><span class="text-gray-500 text-[9px] tracking-widest mr-1">Date:</span> {{ h.meta?.expectedDate || 'Not specified' }}</div>
                      <div class="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-2"><span class="font-bold text-gray-500 mr-1">Logged By:</span> RM {{ h.actor || '' }}</div>
                    </div>
                  </td>
                  
                  <!-- Outcome & Notes -->
                  <td class="px-5 py-4 align-top border-l border-gray-100">
                    <div class="text-[11px] font-black font-display text-absa-enrich uppercase tracking-tight mb-1.5">{{ h.meta?.outcome || h.type || 'Engagement' }}</div>
                    <div v-if="h.meta?.dormancy_reason" class="text-[10px] text-gray-600 font-mono mt-1"><span class="font-bold text-gray-500 uppercase tracking-widest">Reason:</span> {{ h.meta.dormancy_reason }}</div>
                    <div v-if="h.meta?.customer_feedback" class="text-[10px] text-gray-600 font-mono mt-1"><span class="font-bold text-gray-500 uppercase tracking-widest">Feedback:</span> {{ h.meta.customer_feedback }}</div>
                    <div v-if="h.detail || h.meta?.notes" class="text-[10px] text-gray-500 font-mono bg-gray-50 border border-gray-200 p-2 mt-2 whitespace-pre-wrap leading-relaxed">{{ h.detail || h.meta?.notes }}</div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-20 flex flex-col items-center">
            <span class="material-symbols-outlined text-[48px] text-gray-200 mb-3">inbox</span>
            <p class="text-[10px] text-gray-500 font-mono font-bold tracking-widest uppercase">No Promise to Fund records found.</p>
          </div>
        </div>
        
        <!-- Footer: Sharp Ghost Buttons -->
        <div v-if="!isExportingPdf" class="px-8 py-5 border-t border-gray-200 bg-white relative z-10 flex justify-between shrink-0 items-center">
          <div class="flex gap-4">
            <button @click="exportCsv" class="px-6 py-2 bg-white border border-gray-200 text-gray-600 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest hover:border-absa-passion hover:text-absa-passion hover:bg-absa-passion/5 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">grid_on</span>
              Export Excel
            </button>
            <button @click="exportPdf" class="px-6 py-2 bg-white border border-gray-200 text-gray-600 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest hover:border-absa-passion hover:text-absa-passion hover:bg-absa-passion/5 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              Export PDF
            </button>
          </div>
          <button @click="$emit('close')" class="px-8 py-2 bg-absa-passion text-white border border-absa-passion text-[10px] font-mono font-bold rounded-none uppercase tracking-widest hover:bg-[#1D226B] transition-colors shadow-none">
            Close Report
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
      linear-gradient(rgba(220, 0, 55, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220, 0, 55, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}
.dotted-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
}
/* Keyframe for fade-in up used in KPI Cards */

/* Brutalist/Industrial scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border: 2px solid #f8fafc;
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
