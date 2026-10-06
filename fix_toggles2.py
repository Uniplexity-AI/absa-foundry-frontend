import re

filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

tabs_html = """
      <!-- View Toggle + Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3 mb-4">
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

content = content.replace("<!-- Calendar View -->", tabs_html + "\n      <!-- Calendar View -->")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Toggle Buttons successfully")
