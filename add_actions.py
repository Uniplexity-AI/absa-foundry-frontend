import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

script_additions = """
const saveEvents = () => {
  localStorage.setItem('crm_calendar_events', JSON.stringify(events.value))
}

const markComplete = (evt) => {
  const index = events.value.findIndex(e => e.id === evt.id)
  if (index !== -1) {
    events.value[index].status = 'completed'
    saveEvents()
  }
}

const cancelEvent = (evt) => {
  if (!confirm('Are you sure you want to cancel this activity?')) return
  const index = events.value.findIndex(e => e.id === evt.id)
  if (index !== -1) {
    events.value[index].status = 'cancelled'
    saveEvents()
  }
}

const deleteEvent = (evt) => {
  if (!confirm('Are you sure you want to delete this activity?')) return
  events.value = events.value.filter(e => e.id !== evt.id)
  saveEvents()
}

const editEvent = (evt) => {
  alert('Edit Activity: ' + evt.title)
}

const openEvent = (evt) => {
  alert('Opening Activity Details: ' + evt.title)
}

const fetchEvents = () => {
"""

content = content.replace("const fetchEvents = () => {", script_additions)

# Bind actions in List View
content = content.replace(
  '<button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>',
  '<button @click.stop="markComplete(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>'
)
content = content.replace(
  '<button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>',
  '<button @click.stop="cancelEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>'
)
content = content.replace(
  '<button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition-colors rounded-sm" title="Edit"><Pencil :size="12" /></button>',
  '<button @click.stop="editEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition-colors rounded-sm" title="Edit"><Pencil :size="12" /></button>'
)
content = content.replace(
  '<button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="12" /></button>',
  '<button @click.stop="deleteEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="12" /></button>'
)

# Bind actions in Card View
content = content.replace(
  '<button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>',
  '<button @click.stop="markComplete(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>'
)
content = content.replace(
  '<button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>',
  '<button @click.stop="cancelEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>'
)
content = content.replace(
  '<button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-absa-passion transition-colors rounded-sm" title="Open"><ExternalLink :size="10" /></button>',
  '<button @click.stop="openEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-absa-passion transition-colors rounded-sm" title="Open"><ExternalLink :size="10" /></button>'
)
content = content.replace(
  '<button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="10" /></button>',
  '<button @click.stop="deleteEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="10" /></button>'
)
content = content.replace(
  '<button class="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:border-absa-passion hover:text-absa-passion transition-colors flex items-center gap-1">',
  '<button @click.stop="editEvent(evt)" class="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:border-absa-passion hover:text-absa-passion transition-colors flex items-center gap-1">'
)
content = content.replace(
  '<button class="px-2 py-1 bg-absa-enrich text-white text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors">',
  '<button @click.stop="openEvent(evt)" class="px-2 py-1 bg-absa-enrich text-white text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors">'
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Calendar actions added.")
