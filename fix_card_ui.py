import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add missing icons
import_old = "import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CalendarDays, Clock, CheckCircle, List, LayoutGrid, Columns } from 'lucide-vue-next'"
import_new = "import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CalendarDays, Clock, CheckCircle, List, LayoutGrid, Columns, Check, X, ExternalLink, Trash2, Pencil } from 'lucide-vue-next'"
content = content.replace(import_old, import_new)

old_card_view = """      <!-- Card View -->
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
      </div>"""

new_card_view = """      <!-- Card View -->
      <div v-if="currentView === 'card'">
        <div v-if="filteredEvents.length === 0" class="bg-white border border-gray-200 rounded-sm py-12 text-center text-xs text-gray-400 font-mono">
          No activities found.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div v-for="evt in filteredEvents" :key="evt.id" class="bg-white border border-gray-200 rounded-sm hover:shadow-md transition cursor-pointer relative overflow-hidden group flex flex-col">
            <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
            
            <!-- Card Header -->
            <div class="px-3 py-2 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start relative z-10">
              <div class="flex-1 pr-2">
                <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">ACTIVITY_LOG</div>
                <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-absa-passion transition-colors">{{ evt.title }}</h4>
              </div>
              <span class="px-2 py-1 rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest border shrink-0"
                :class="evt.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : (evt.status === 'cancelled' ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-red-50 text-absa-passion border-red-200')">
                {{ evt.status || 'SCHEDULED' }}
              </span>
            </div>

            <!-- Card Body -->
            <div class="px-3 py-3 flex-1 bg-white flex flex-col relative z-10">
              <div class="flex justify-between items-center mb-2">
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">DATE</span>
                <span class="text-[11px] font-bold text-absa-enrich">{{ new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
              </div>
              <hr class="border-t border-dashed border-gray-200 mb-2" />
              <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-700 mb-2">
                <Clock :size="12" class="text-gray-400" /> {{ new Date(evt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} - {{ new Date(new Date(evt.date).getTime() + 60*60*1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </div>
              <p class="text-[9px] font-mono text-gray-500 leading-relaxed">{{ evt.type === 'promise' ? 'Promise to Fund verification required' : 'Follow up activity scheduled' }}</p>
            </div>

            <!-- Card Footer -->
            <div class="px-2 py-1.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-1 relative z-10" @click.stop>
              <div class="flex items-center gap-1">
                <button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>
                <button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>
                <button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-absa-passion transition-colors rounded-sm" title="Open"><ExternalLink :size="10" /></button>
                <button class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="10" /></button>
              </div>
              <div class="flex items-center gap-1">
                <button class="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:border-absa-passion hover:text-absa-passion transition-colors flex items-center gap-1">
                  <Pencil :size="9" /> EDIT
                </button>
                <button class="px-2 py-1 bg-absa-enrich text-white text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors">
                  REVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>"""

content = content.replace(old_card_view, new_card_view)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Card view updated successfully.")
