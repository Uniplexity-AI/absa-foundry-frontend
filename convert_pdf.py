repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add imports
if "import html2pdf" not in content:
    content = content.replace("import autoTable from 'jspdf-autotable'", "import html2pdf from 'html2pdf.js'\nimport { nextTick } from 'vue'")

# Add refs
if "const isExportingPdf = ref(false)" not in content:
    content = content.replace("const loading = ref(false)", "const loading = ref(false)\nconst isExportingPdf = ref(false)\nconst reportContainer = ref(null)")

# Replace exportPdf function entirely
old_export = """const exportPdf = () => {
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

  autoTable(doc, {
    startY: 35,
    head: [columns],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 6, cellPadding: 1.5 },
    headStyles: { fillColor: [220, 0, 55], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 15 },
      2: { cellWidth: 20 },
      8: { cellWidth: 20 }
    }
  })
  
  doc.save('absa-ptf-report.pdf')
  notify('PDF downloaded', 'success')
}"""

new_export = """const exportPdf = async () => {
  if (!props.engagements || !props.engagements.length) {
    notify('No data to export', 'error')
    return
  }
  
  isExportingPdf.value = true
  await nextTick()
  
  // Brief delay to ensure DOM is fully repainted without scrollbars/max-h
  setTimeout(async () => {
    const element = reportContainer.value
    const opt = {
      margin:       0.3,
      filename:     'absa-ptf-report.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
    }
    
    try {
      await html2pdf().set(opt).from(element).save()
      notify('PDF downloaded', 'success')
    } catch (e) {
      console.error(e)
      notify('Failed to generate PDF', 'error')
    } finally {
      isExportingPdf.value = false
    }
  }, 100)
}"""
content = content.replace(old_export, new_export)

# Fix the template Container
# <div class="bg-white rounded-none w-full max-w-[95vw] overflow-hidden shadow-2xl relative border border-gray-300 flex flex-col max-h-[95vh]">
old_container = '<div class="bg-white rounded-none w-full max-w-[95vw] overflow-hidden shadow-2xl relative border border-gray-300 flex flex-col max-h-[95vh]">'
new_container = '<div ref="reportContainer" class="bg-white rounded-none w-full max-w-[95vw] shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? \'\' : \'max-h-[95vh] overflow-hidden\'">'
content = content.replace(old_container, new_container)

# Fix the body/table wrapper
# <div class="overflow-auto relative z-10 flex-1 bg-white/95 backdrop-blur-md">
old_body = '<div class="overflow-auto relative z-10 flex-1 bg-white/95 backdrop-blur-md">'
new_body = '<div class="relative z-10 flex-1 bg-white/95 backdrop-blur-md" :class="isExportingPdf ? \'\' : \'overflow-auto\'">'
content = content.replace(old_body, new_body)

# Fix the footer to hide during export
# <div class="px-8 py-5 border-t border-gray-200 bg-white/90 backdrop-blur-md relative z-10 flex justify-between shrink-0 items-center">
old_footer = '<div class="px-8 py-5 border-t border-gray-200 bg-white/90 backdrop-blur-md relative z-10 flex justify-between shrink-0 items-center">'
new_footer = '<div v-if="!isExportingPdf" class="px-8 py-5 border-t border-gray-200 bg-white/90 backdrop-blur-md relative z-10 flex justify-between shrink-0 items-center">'
content = content.replace(old_footer, new_footer)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done converting to html2pdf")
