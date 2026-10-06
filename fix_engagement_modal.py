import re

filepath = 'src/components/crm/EngagementModal.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add followUpDate to script
content = content.replace("const expectedDate = ref('')", "const expectedDate = ref('')\nconst followUpDate = ref('')")

# In the watch block
watch_old = """    isPromise.value = !!e.meta?.isPromise
      expectedAmount.value = e.meta?.expectedAmount || ''
      expectedDate.value = e.meta?.expectedDate || ''"""
watch_new = """    isPromise.value = !!e.meta?.isPromise
      expectedAmount.value = e.meta?.expectedAmount || ''
      expectedDate.value = e.meta?.expectedDate || ''
      followUpDate.value = e.meta?.followUpDate || ''"""
content = content.replace(watch_old, watch_new)

watch_else_old = """    isPromise.value = false
      expectedAmount.value = ''
      expectedDate.value = ''"""
watch_else_new = """    isPromise.value = false
      expectedAmount.value = ''
      expectedDate.value = ''
      followUpDate.value = ''"""
content = content.replace(watch_else_old, watch_else_new)

# In submit payload
payload_old = """        isPromise: isPromise.value,
        expectedAmount: expectedAmount.value,
        expectedDate: expectedDate.value
      }"""
payload_new = """        isPromise: isPromise.value,
        expectedAmount: expectedAmount.value,
        expectedDate: expectedDate.value,
        followUpDate: followUpDate.value
      }"""
content = content.replace(payload_old, payload_new)

# In submit function add local storage logic
submit_logic = """
      await logEngagement(props.customerId, payload)
      
      // Update Calendar Activities
      try {
        let events = []
        const stored = localStorage.getItem('crm_calendar_events')
        if (stored) events = JSON.parse(stored)
        
        if (isPromise.value && expectedDate.value) {
          events.push({
            id: Date.now() + Math.random(),
            title: `Promise to Fund: ${props.customerId}`,
            date: expectedDate.value,
            type: 'promise'
          })
        }
        
        if (recommendation.value === 'Schedule Follow Up' && followUpDate.value) {
          events.push({
            id: Date.now() + Math.random(),
            title: `Follow up: ${props.customerId}`,
            date: followUpDate.value,
            type: 'followup'
          })
        }
        
        localStorage.setItem('crm_calendar_events', JSON.stringify(events))
        window.dispatchEvent(new Event('engagement-logged'))
      } catch(err) {
        console.error("Calendar update failed", err)
      }
      
      emit('logged', payload)"""
content = content.replace("await logEngagement(props.customerId, payload)\n      emit('logged', payload)", submit_logic.strip())

# Replace recommendation HTML
html_rec_old = """<div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Recommendation</label>
            <input v-model="recommendation" :disabled="readonly" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="e.g. Follow up in 2 weeks">
          </div>"""

html_rec_new = """<div class="col-span-1">
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Recommendation</label>
            <div class="flex gap-2">
              <select v-model="recommendation" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
                <option value="">-- Select --</option>
                <option>Schedule Follow Up</option>
                <option>Send Product Details</option>
                <option>Escalate to RM</option>
                <option>No Action Required</option>
              </select>
              <input v-if="recommendation === 'Schedule Follow Up'" v-model="followUpDate" :disabled="readonly" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" title="Follow Up Date">
            </div>
          </div>"""
content = content.replace(html_rec_old, html_rec_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated EngagementModal.vue")
