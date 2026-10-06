import re

filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add filteredEvents and Kanban computed properties
script_addition = """const events = ref([])
const currentView = ref('calendar')
const currentFilter = ref('all_meetings')

const filteredEvents = computed(() => {
  let list = events.value
  if (currentFilter.value === 'follow_ups') {
    list = list.filter(e => e.type === 'followup')
  } else if (currentFilter.value === 'scheduled_only') {
    list = list.filter(e => (e.status || 'scheduled') === 'scheduled')
  } else if (currentFilter.value === 'completed_only') {
    list = list.filter(e => e.status === 'completed')
  } else if (currentFilter.value === 'cancelled_only') {
    list = list.filter(e => e.status === 'cancelled')
  }
  return list
})

const kanbanColumns = computed(() => {
  return [
    { id: 'scheduled', title: 'Scheduled', items: filteredEvents.value.filter(e => (e.status || 'scheduled') === 'scheduled') },
    { id: 'completed', title: 'Completed', items: filteredEvents.value.filter(e => e.status === 'completed') },
    { id: 'cancelled', title: 'Cancelled', items: filteredEvents.value.filter(e => e.status === 'cancelled') }
  ]
})"""

content = content.replace("const events = ref([])\nconst currentView = ref('calendar')\nconst currentFilter = ref('all')", script_addition)


views_html = """
      <!-- List View -->
      <div v-if="currentView === 'list'" class="bg-white border border-gray-200 rounded-sm shadow-none overflow-hidden relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="overflow-x-auto relative z-10">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Title</th>
                <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th class="px-4 py-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="filteredEvents.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-xs text-gray-400 font-mono">No activities found.</td>
              </tr>
              <tr v-for="evt in filteredEvents" :key="evt.id" class="hover:bg-gray-50/50 transition">
                <td class="px-4 py-3 text-xs text-gray-900">{{ new Date(evt.date).toLocaleDateString() }}</td>
                <td class="px-4 py-3 text-xs font-bold text-gray-900">{{ evt.title }}</td>
                <td class="px-4 py-3">
                  <span class="px-2 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm" :class="evt.type === 'promise' ? 'bg-red-50 text-absa-passion border border-red-100' : 'bg-blue-50 text-absa-enrich border border-blue-100'">
                    {{ evt.type === 'promise' ? 'Promise' : 'Follow Up' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm bg-gray-100 text-gray-600 border border-gray-200">
                    {{ evt.status || 'Scheduled' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <button class="text-gray-400 hover:text-absa-passion transition"><i class="fas fa-ellipsis-v"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Card View -->
      <div v-if="currentView === 'card'">
        <div v-if="filteredEvents.length === 0" class="bg-white border border-gray-200 rounded-sm py-12 text-center text-xs text-gray-400 font-mono">
          No activities found.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div v-for="evt in filteredEvents" :key="evt.id" class="bg-white border border-gray-200 rounded-sm hover:shadow-md transition cursor-pointer relative overflow-hidden group flex flex-col">
            <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
            <div class="px-3 py-2 border-b border-gray-50 bg-gray-50/30 flex justify-between items-start">
              <div>
                <div class="text-[7px] font-mono font-black text-gray-300 uppercase tracking-[0.15em] mb-0.5">Activity</div>
                <h4 class="text-[10px] font-mono font-black text-gray-900 truncate uppercase tracking-tight group-hover:text-absa-passion">{{ evt.title }}</h4>
              </div>
              <span class="px-1 py-0.5 rounded-sm text-[7px] font-mono font-black uppercase tracking-widest border shrink-0 bg-gray-50 text-gray-500 border-gray-200">
                {{ evt.status || 'Scheduled' }}
              </span>
            </div>
            <div class="px-3 py-3 flex-1 flex flex-col justify-center">
              <div class="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <CalendarIcon :size="12" class="text-gray-400" /> {{ new Date(evt.date).toLocaleDateString() }}
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle :size="12" class="text-gray-400" /> Type: {{ evt.type === 'promise' ? 'Promise to Fund' : 'Follow Up' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban View -->
      <div v-if="currentView === 'kanban'" class="flex gap-4 overflow-x-auto pb-4 items-start" style="scrollbar-width: thin;">
        <div v-for="col in kanbanColumns" :key="col.id" class="min-w-[280px] w-72 bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]">
          <div class="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
            <h4 class="font-black text-[10px] text-gray-900 uppercase tracking-widest font-mono">{{ col.title }}</h4>
            <span class="bg-absa-passion text-white px-1.5 py-0.5 text-[8px] font-mono font-bold rounded-sm">{{ col.items.length }}</span>
          </div>
          <div class="p-2 flex-1 overflow-y-auto space-y-2">
            <div v-if="col.items.length === 0" class="p-4 text-center text-[10px] font-mono text-gray-400 border-2 border-dashed border-gray-200 rounded-sm">
              No items
            </div>
            <div v-for="evt in col.items" :key="evt.id" class="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-grab active:cursor-grabbing border-l-2" :class="evt.type === 'promise' ? 'border-l-absa-passion' : 'border-l-absa-enrich'">
              <h5 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-tight mb-1">{{ evt.title }}</h5>
              <div class="flex justify-between items-end mt-2">
                <span class="text-[9px] text-gray-500 font-mono">{{ new Date(evt.date).toLocaleDateString() }}</span>
                <span class="text-[8px] px-1 py-0.5 bg-gray-100 text-gray-600 uppercase font-mono rounded-sm">{{ evt.type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
"""

content = content.replace("<!-- Calendar View -->", views_html + "\n      <!-- Calendar View -->")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added List, Card, Kanban Views")
