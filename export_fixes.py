repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update exportPdf options to handle the window width
old_opt = """    const opt = {
      margin:       0.3,
      filename:     'absa-ptf-report.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
    }"""
new_opt = """    const opt = {
      margin:       0.3,
      filename:     'absa-ptf-report.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, logging: false, windowWidth: 1600 },
      jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
    }"""
content = content.replace(old_opt, new_opt)

# 2. Fix the container classes during export (remove max-w-[95vw] and set a fixed width for perfect render)
old_container = '<div ref="reportContainer" class="bg-white rounded-none w-full max-w-[95vw] shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? \'\' : \'max-h-[95vh] overflow-hidden\'">'
new_container = '<div ref="reportContainer" class="bg-white rounded-none shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? \'w-[1600px] max-w-none\' : \'w-full max-w-[95vw] max-h-[95vh] overflow-hidden\'">'
content = content.replace(old_container, new_container)

# 3. Fix the Main Header (remove backdrop blur and mix-blend during export)
old_main_header = '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/90 backdrop-blur-md relative z-10 shrink-0 border-b border-gray-200">'
new_main_header = '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shrink-0 border-b border-gray-200" :class="isExportingPdf ? \'bg-white\' : \'bg-white/90 backdrop-blur-md\'">'
content = content.replace(old_main_header, new_main_header)

old_logo = '<img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1 mix-blend-multiply">'
new_logo = '<img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1" :class="isExportingPdf ? \'\' : \'mix-blend-multiply\'">'
content = content.replace(old_logo, new_logo)

# 4. Fix KPI section (remove backdrop blur during export)
old_kpi_section = '<div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto">'
new_kpi_section = '<div class="px-8 py-5 border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto" :class="isExportingPdf ? \'bg-gray-50\' : \'bg-gray-50/90 backdrop-blur-sm\'">'
content = content.replace(old_kpi_section, new_kpi_section)

# 5. Fix Table wrapper (remove backdrop blur during export)
old_table_wrapper = '<div class="relative z-10 flex-1 bg-white/95 backdrop-blur-md" :class="isExportingPdf ? \'\' : \'overflow-auto\'">'
new_table_wrapper = '<div class="relative z-10 flex-1" :class="isExportingPdf ? \'bg-white\' : \'bg-white/95 backdrop-blur-md overflow-auto\'">'
content = content.replace(old_table_wrapper, new_table_wrapper)

# 6. Increase the font weight of very light text (gray-400 to gray-500) so it doesn't fade in canvas
content = content.replace('text-gray-400', 'text-gray-500')

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done patching export fixes")
