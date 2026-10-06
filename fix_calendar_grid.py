import re

filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the grid gap and day cells
old_grid_start = """          <div class="grid grid-cols-7 gap-1 mb-1">
            <div v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day" class="text-center text-[9px] font-mono font-black text-gray-400 py-2 uppercase tracking-widest">{{ day }}</div>
          </div>
          <div class="grid grid-cols-7 gap-1">"""

new_grid_start = """          <div class="grid grid-cols-7 gap-2 mb-2">
            <div v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day" class="text-center text-[10px] font-bold text-gray-600 py-2">{{ day }}</div>
          </div>
          <div class="grid grid-cols-7 gap-2">"""
content = content.replace(old_grid_start, new_grid_start)

# Replace the day cell
# We need to find the day cell block. It starts at `<div v-for="(day, index) in calendarDays"` and ends at the closing div for the day cell.

old_cell = """<div v-for="(day, index) in calendarDays" :key="index"
              :class="{
                'bg-gray-50/50': !day.isCurrentMonth,
                'border-2 border-absa-passion bg-red-50/30': day.isToday,
                'hover:bg-gray-50 cursor-pointer': day.events && day.events.length > 0,
              }"
              class="min-h-[80px] border border-gray-100 rounded-sm p-1.5 transition">
              <div class="text-[9px] font-mono font-bold mb-1" :class="day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'">{{ day.date.getDate() }}</div>
              <div class="space-y-0.5">
                <div v-for="evt in (day.events || []).slice(0, 2)" :key="evt.id"
                  :class="{
                    'bg-absa-passion': evt.type === 'promise',
                    'bg-absa-enrich': evt.type === 'followup'
                  }"
                  class="text-white text-[8px] font-mono rounded-sm px-1 py-0.5 truncate" :title="evt.title">
                  {{ evt.title }}
                </div>
                <div v-if="(day.events || []).length > 2" class="text-[8px] font-mono text-gray-400 text-center">+{{ day.events.length - 2 }} more</div>
              </div>
            </div>"""

new_cell = """<div v-for="(day, index) in calendarDays" :key="index"
              :class="{
                'bg-gray-50/30': !day.isCurrentMonth,
                'border-2 border-absa-passion': day.isToday,
                'border border-gray-200': !day.isToday,
                'hover:border-absa-passion/50 cursor-pointer': day.events && day.events.length > 0,
              }"
              class="h-[140px] bg-white rounded-sm p-2 transition flex flex-col">
              
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold" :class="day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'">
                  {{ day.date.getDate() }}
                </span>
                <span v-if="day.isToday" class="text-[9px] font-bold text-absa-passion uppercase tracking-widest">
                  TODAY
                </span>
              </div>

              <div class="flex-1 overflow-hidden space-y-1">
                <div v-for="evt in (day.events || []).slice(0, 3)" :key="evt.id"
                  :class="{
                    'bg-absa-passion': evt.type === 'promise',
                    'bg-absa-enrich': evt.type === 'followup'
                  }"
                  class="text-white text-[9px] font-mono rounded-sm px-1.5 py-0.5 truncate shadow-sm" :title="evt.title">
                  {{ evt.title }}
                </div>
                <div v-if="(day.events || []).length > 3" class="text-[8px] font-mono text-gray-500 text-left pl-1">
                  +{{ day.events.length - 3 }} more
                </div>
              </div>

              <div v-if="!day.events || day.events.length === 0" class="mt-auto w-full text-center pb-1">
                <span class="text-[9px] font-mono text-gray-400">No meetings</span>
              </div>
            </div>"""

content = content.replace(old_cell, new_cell)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Calendar Grid")
