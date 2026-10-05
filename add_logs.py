repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_export = """const exportPdf = async () => {
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
      html2canvas:  { scale: 3, useCORS: true, logging: false, windowWidth: 1600 },
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

new_export = """const exportPdf = async () => {
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
}"""

content = content.replace(old_export, new_export)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done adding console logs")
