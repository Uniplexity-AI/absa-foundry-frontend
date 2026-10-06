import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_list_view = """      <!-- List View -->
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
                  <span class="px-2 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm" :class="evt.type === 'promise' ? 'bg-red-50 text-absa-passion border border-red-100' : 'bg-red-50 text-absa-passion border border-red-100'">
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
      </div>"""

new_list_view = """      <!-- List View -->
      <div v-if="currentView === 'list'" class="bg-white border border-gray-200 rounded-sm shadow-none overflow-hidden relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
        <div class="overflow-x-auto relative z-10">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Title</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Time</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Location</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="filteredEvents.length === 0">
                <td colspan="6" class="px-4 py-8 text-center text-xs text-gray-400 font-mono">No activities found.</td>
              </tr>
              <tr v-for="evt in filteredEvents" :key="evt.id" class="hover:bg-gray-50/50 transition">
                <td class="px-4 py-3.5 text-[10px] font-bold text-gray-900 uppercase">{{ evt.title }}</td>
                <td class="px-4 py-3.5 text-[10px] font-mono text-gray-700 uppercase whitespace-nowrap">{{ new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</td>
                <td class="px-4 py-3.5 text-[10px] font-mono text-gray-700 whitespace-nowrap">{{ new Date(evt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <span class="px-2 py-1 rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest border"
                    :class="evt.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : (evt.status === 'cancelled' ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-red-50 text-absa-passion border-red-200')">
                    {{ evt.status || 'SCHEDULED' }}
                  </span>
                </td>
                <td class="px-4 py-3.5 text-[10px] font-mono text-gray-400">-</td>
                <td class="px-4 py-3.5 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>
                    <button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>
                    <button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition-colors rounded-sm" title="Edit"><Pencil :size="12" /></button>
                    <button class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="12" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>"""

content = content.replace(old_list_view, new_list_view)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("List view updated successfully.")
