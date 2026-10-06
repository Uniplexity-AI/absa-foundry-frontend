import re

filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add currentView and currentFilter to script
script_addition = """const events = ref([])
const currentView = ref('calendar')
const currentFilter = ref('all')"""
content = content.replace("const events = ref([])", script_addition)

# Add LayoutGrid and Columns icon imports
import_old = "import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CalendarDays, Clock, CheckCircle } from 'lucide-vue-next'"
import_new = "import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CalendarDays, Clock, CheckCircle, List, LayoutGrid, Columns } from 'lucide-vue-next'"
content = content.replace(import_old, import_new)


# 2. Add the View Toggle + Filter Tabs HTML
tabs_html = """
      <!-- Page Title Row -->
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <div class="flex items-center gap-2">
          <div class="w-1 h-4 bg-absa-passion"></div>
          <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon :size="14" class="text-gray-400" /> Calendar_Overview
          </h3>
        </div>
        <button class="px-4 py-2 rounded-sm bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-absa-power transition flex items-center gap-2">
          <Plus :size="14" /> Add_Activity
        </button>
      </div>

      <!-- View Toggle + Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
        <div class="flex items-center gap-1.5 mr-2">
          <button @click="currentView = 'list'"
            :class="currentView === 'list' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <List :size="11" /> LIST
          </button>
          <button @click="currentView = 'card'"
            :class="currentView === 'card' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <LayoutGrid :size="11" /> CARD
          </button>
          <button @click="currentView = 'kanban'"
            :class="currentView === 'kanban' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <Columns :size="11" /> KANBAN
          </button>
          <button @click="currentView = 'calendar'"
            :class="currentView === 'calendar' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <CalendarIcon :size="11" /> CALENDAR
          </button>
        </div>
        <div class="w-px h-5 bg-gray-200"></div>
        <div class="flex items-center gap-1.5 overflow-x-auto ml-2">
          <button v-for="f in ['all_meetings', 'scheduled_only', 'completed_only', 'cancelled_only', 'follow_ups']" :key="f"
            @click="currentFilter = f"
            :class="currentFilter === f ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition">
            {{ f.toUpperCase() }}
          </button>
        </div>
      </div>
"""

old_title_row = """      <!-- Page Title Row -->
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <div class="flex items-center gap-2">
          <div class="w-1 h-4 bg-absa-passion"></div>
          <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon :size="14" class="text-gray-400" /> Calendar_Overview
          </h3>
        </div>
        <button class="px-4 py-2 rounded-sm bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-absa-power transition flex items-center gap-2">
          <Plus :size="14" /> Add_Activity
        </button>
      </div>"""

content = content.replace(old_title_row, tabs_html.strip())

# Make the calendar view conditional based on currentView
content = content.replace('<!-- Calendar View -->\n      <div class="bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden">', 
                          '<!-- Calendar View -->\n      <div v-if="currentView === \'calendar\'" class="bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden">')


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Toggle Buttons")
