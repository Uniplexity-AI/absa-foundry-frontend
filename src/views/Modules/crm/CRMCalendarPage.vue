<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, CalendarDays, Clock, CheckCircle, List, LayoutGrid, Columns, Check, X, ExternalLink, Trash2, Pencil } from 'lucide-vue-next'

const currentDate = ref(new Date())
const events = ref([])
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
})

// Generate calendar days
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  
  // Padding previous month
  const firstDayOfWeek = firstDay.getDay()
  for (let i = 0; i < firstDayOfWeek; i++) {
    const d = new Date(year, month, -firstDayOfWeek + i + 1)
    days.push({ date: d, isCurrentMonth: false, isToday: false, events: getEventsForDate(d) })
  }
  
  // Current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    days.push({ date: d, isCurrentMonth: true, isToday: isSameDay(d, new Date()), events: getEventsForDate(d) })
  }
  
  // Padding next month
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const d = new Date(year, month + 1, i)
    days.push({ date: d, isCurrentMonth: false, isToday: false, events: getEventsForDate(d) })
  }
  
  return days
})

const monthYearString = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' })
})

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const isSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getDate() === d2.getDate()
}

const getEventsForDate = (date) => {
  return filteredEvents.value.filter(e => isSameDay(new Date(e.date), date))
}


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


const onDragStart = (e, evt) => {
  e.dataTransfer.setData('text/plain', evt.id)
}
const onDrop = (e, status) => {
  const evtId = e.dataTransfer.getData('text/plain')
  const evt = events.value.find(ev => ev.id.toString() === evtId.toString())
  if (evt) {
    evt.status = status
    saveEvents()
  }
}

const fetchEvents = () => {


  try {
    const stored = localStorage.getItem('crm_calendar_events')
    if (stored) {
      events.value = JSON.parse(stored)
    } else {
      events.value = [
        { id: 1, title: 'Follow up: C00004', date: new Date().toISOString(), type: 'followup' }
      ]
    }
  } catch(e) {
    console.error(e)
  }
}

const upcomingEvents = computed(() => {
  const now = new Date()
  return events.value.filter(e => new Date(e.date) >= new Date(now.setHours(0,0,0,0))).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 5)
})

onMounted(() => {
  fetchEvents()
  window.addEventListener('engagement-logged', fetchEvents)
})
</script>

<template>
  <div class="w-full pt-6 px-6 pb-8 absa-mesh min-h-screen relative">
    <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30 z-0"></div>
    <div class="relative z-10 w-full max-w-7xl mx-auto space-y-6">
      
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
      <div class="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3 mb-4">
        <div class="flex items-center gap-1.5 mr-2">
          <button @click="currentView = 'list'"
            :class="currentView === 'list' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <List :size="11" /> LIST
          </button>
          <button @click="currentView = 'card'"
            :class="currentView === 'card' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <LayoutGrid :size="11" /> CARD
          </button>
          <button @click="currentView = 'kanban'"
            :class="currentView === 'kanban' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <Columns :size="11" /> KANBAN
          </button>
          <button @click="currentView = 'calendar'"
            :class="currentView === 'calendar' ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
            <CalendarIcon :size="11" /> CALENDAR
          </button>
        </div>
        <div class="w-px h-5 bg-gray-200"></div>
        <div class="flex items-center gap-1.5 overflow-x-auto ml-2">
          <button v-for="f in ['all_meetings', 'scheduled_only', 'completed_only', 'cancelled_only', 'follow_ups']" :key="f"
            @click="currentFilter = f"
            :class="currentFilter === f ? 'bg-absa-passion text-white border-absa-passion' : 'bg-white text-gray-600 border-gray-200 hover:border-absa-passion hover:text-absa-passion'"
            class="px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition flex items-center justify-center">
            {{ f.toUpperCase() }}
          </button>
        </div>
      </div>

      
      <!-- List View -->
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
                    <button v-if="(evt.status || 'scheduled').toLowerCase() !== 'completed' && (evt.status || 'scheduled').toLowerCase() !== 'cancelled'" @click.stop="markComplete(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="12" /></button>
                    <button v-if="(evt.status || 'scheduled').toLowerCase() !== 'completed' && (evt.status || 'scheduled').toLowerCase() !== 'cancelled'" @click.stop="cancelEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="12" /></button>
                    <button @click.stop="editEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition-colors rounded-sm" title="Edit"><Pencil :size="12" /></button>
                    <button @click.stop="deleteEvent(evt)" class="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="12" /></button>
                  </div>
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
                <button v-if="(evt.status || 'scheduled').toLowerCase() !== 'completed' && (evt.status || 'scheduled').toLowerCase() !== 'cancelled'" @click.stop="markComplete(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-green-500 transition-colors rounded-sm" title="Mark Complete"><Check :size="10" /></button>
                <button v-if="(evt.status || 'scheduled').toLowerCase() !== 'completed' && (evt.status || 'scheduled').toLowerCase() !== 'cancelled'" @click.stop="cancelEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-amber-500 transition-colors rounded-sm" title="Cancel"><X :size="10" /></button>
                <button @click.stop="openEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-absa-passion transition-colors rounded-sm" title="Open"><ExternalLink :size="10" /></button>
                <button @click.stop="deleteEvent(evt)" class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-red-500 transition-colors rounded-sm" title="Delete"><Trash2 :size="10" /></button>
              </div>
              <div class="flex items-center gap-1">
                <button @click.stop="editEvent(evt)" class="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:border-absa-passion hover:text-absa-passion transition-colors flex items-center gap-1">
                  <Pencil :size="9" /> EDIT
                </button>
                <button @click.stop="openEvent(evt)" class="px-2 py-1 bg-absa-enrich text-white text-[8px] font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors">
                  REVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban View -->
      <div v-if="currentView === 'kanban'" class="flex gap-4 overflow-x-auto pb-4 items-start" style="scrollbar-width: thin;">
        <div v-for="col in kanbanColumns" :key="col.id" @drop="onDrop($event, col.id)" @dragenter.prevent @dragover.prevent class="flex-1 min-w-[280px] bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]">
          <div class="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
            <h4 class="font-black text-[10px] text-gray-900 uppercase tracking-widest font-mono">{{ col.title }}</h4>
            <span class="bg-absa-passion text-white px-1.5 py-0.5 text-[8px] font-mono font-bold rounded-sm">{{ col.items.length }}</span>
          </div>
          <div class="p-2 flex-1 overflow-y-auto space-y-2">
            <div v-if="col.items.length === 0" class="p-4 text-center text-[10px] font-mono text-gray-400 border-2 border-dashed border-gray-200 rounded-sm">
              No items
            </div>
            <div v-for="evt in col.items" :key="evt.id" draggable="true" @dragstart="onDragStart($event, evt)" class="bg-white border border-gray-200 rounded-sm p-3 hover:shadow-sm cursor-grab active:cursor-grabbing border-l-2" :class="evt.type === 'promise' ? 'border-l-absa-passion' : 'border-l-absa-passion'">
              <h5 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-tight mb-1">{{ evt.title }}</h5>
              <div class="flex justify-between items-end mt-2">
                <span class="text-[9px] text-gray-500 font-mono">{{ new Date(evt.date).toLocaleDateString() }}</span>
                <span class="text-[8px] px-1 py-0.5 bg-gray-100 text-gray-600 uppercase font-mono rounded-sm">{{ evt.type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div v-if="currentView === 'calendar'" class="bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="p-4 md:p-6 relative z-10">
          <div class="flex items-center justify-between mb-4">
            <button @click="previousMonth" class="px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1">
              <ChevronLeft :size="12" /> PREV
            </button>
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-mono">{{ monthYearString }}</h3>
            <button @click="nextMonth" class="px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1">
              NEXT <ChevronRight :size="12" />
            </button>
          </div>
          <div class="grid grid-cols-7 gap-2 mb-2">
            <div v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day" class="text-center text-[10px] font-bold text-gray-600 py-2">{{ day }}</div>
          </div>
          <div class="grid grid-cols-7 gap-2">
            <div v-for="(day, index) in calendarDays" :key="index"
              :class="{
                'bg-gray-50/30': !day.isCurrentMonth,
                'border-2 border-absa-passion': day.isToday,
                'border border-gray-200': !day.isToday,
                'hover:border-absa-passion/50 cursor-pointer': day.events && day.events.length > 0,
              }"
              class="h-[180px] bg-white rounded-none p-2 transition flex flex-col">
              
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold" :class="day.isToday ? 'text-absa-passion' : (day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400')">
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
                    'bg-absa-passion': evt.type === 'followup'
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
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Activities -->
      <div v-if="upcomingEvents.length > 0" class="bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
        <div class="p-4 md:p-6 relative z-10">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-4 bg-absa-passion"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <CalendarDays :size="14" class="text-gray-400" /> Upcoming_Activities
            </h4>
          </div>
          <div class="space-y-2">
            <div v-for="event in upcomingEvents" :key="event.id"
              class="border border-gray-100 rounded-sm p-3 flex items-center justify-between hover:border-absa-passion/40 hover:bg-gray-50/50 transition cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="shrink-0" :class="event.type === 'promise' ? 'text-absa-passion' : 'text-absa-enrich'">
                  <CheckCircle :size="16" v-if="event.type === 'promise'" />
                  <Clock :size="16" v-else />
                </div>
                <div>
                  <h5 class="text-xs font-mono font-bold text-gray-900 uppercase tracking-tight">{{ event.title }}</h5>
                  <p class="text-[10px] font-mono text-gray-500 mt-0.5">{{ new Date(event.date).toLocaleDateString() }} // <span :class="event.type === 'promise' ? 'text-absa-passion' : 'text-absa-enrich'">{{ event.type === 'promise' ? 'Promise to Fund' : 'Follow Up' }}</span></p>
                </div>
              </div>
              <ChevronRight :size="14" class="text-gray-300" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#DC0037 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.04;
}
</style>


