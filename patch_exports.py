repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Add imports to script setup
imports_old = """import { computed } from 'vue'

const props = defineProps({"""
imports_new = """import { computed } from 'vue'
import { downloadCsv, notify } from '@/utils/absaExport'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const props = defineProps({"""
content = content.replace(imports_old, imports_new)

# 2. Add Export functions
export_funcs = """
const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const buildExportRows = () => {
  return props.engagements.map(h => ({
    'Date': fmtDate(h.at),
    'Customer ID': h.customerId || '',
    'Customer Name': h.customerName || h.customerId || 'Unknown',
    'RM': h.actor || 'RM',
    'Outcome': h.meta?.outcome || h.type || '',
    'Exp. Amount': h.meta?.expectedAmount ? 'ZMW ' + h.meta.expectedAmount : '',
    'Exp. Date': h.meta?.expectedDate || '',
    'Reason': h.meta?.dormancy_reason || '',
    'Cross Sell': h.meta?.cross_sell_details || '',
    'Experience': h.meta?.customer_experience || '',
    'Recommendation': h.meta?.recommendation || '',
    'Branch': h.meta?.branch_to_visit || '',
    'Feedback': h.meta?.customer_feedback || '',
    'Notes': h.detail || h.meta?.notes || ''
  }))
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

const exportPdf = () => {
  if (!props.engagements || !props.engagements.length) {
    notify('No data to export', 'error')
    return
  }
  const doc = new jsPDF('landscape')
  const rows = buildExportRows()
  const columns = Object.keys(rows[0])
  
  doc.setFontSize(16)
  doc.setTextColor(220, 0, 55) // Absa passion
  doc.text('Absa Promise to Fund Report', 14, 20)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)

  const tableData = rows.map(r => columns.map(c => r[c]))

  doc.autoTable({
    startY: 35,
    head: [columns],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [220, 0, 55], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 30 }
    }
  })
  
  doc.save('absa-ptf-report.pdf')
  notify('PDF downloaded', 'success')
}
"""
content = content.replace("""const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}""", export_funcs)

# 3. Add Export Buttons to footer
footer_old = """        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 relative z-10 flex justify-end shrink-0">
          <button @click="$emit('close')" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-gray-100 transition-colors">
            Close
          </button>
        </div>"""

footer_new = """        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 relative z-10 flex justify-between shrink-0 items-center">
          <div class="flex gap-3">
            <button @click="exportCsv" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest hover:bg-gray-100 hover:text-absa-passion transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[14px]">grid_on</span>
              Export Excel
            </button>
            <button @click="exportPdf" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest hover:bg-gray-100 hover:text-absa-passion transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[14px]">picture_as_pdf</span>
              Export PDF
            </button>
          </div>
          <button @click="$emit('close')" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-gray-100 transition-colors">
            Close
          </button>
        </div>"""
content = content.replace(footer_old, footer_new)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done export features")
