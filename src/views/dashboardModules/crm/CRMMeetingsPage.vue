<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">CRM // Calendar</span>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Calendar</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pb-40">
      <div v-show="!moduleLoading" class="px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative">
        <!-- Skeleton Loading -->
        <div v-if="moduleLoading" class="space-y-6 w-full animate-pulse">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div class="h-5 w-44 bg-gray-200 rounded-sm"></div>
            <div class="flex gap-2">
              <div class="h-8 w-36 bg-gray-200 rounded-sm"></div>
              <div class="h-8 w-36 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="h-28 bg-gray-100 border border-gray-200 rounded-sm"></div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="h-28 bg-gray-100 border border-gray-200 rounded-sm"></div>
          </div>
          <div class="flex items-center gap-2 border-b border-gray-100 pb-3">
            <div class="h-8 w-24 bg-gray-200 rounded-sm"></div>
            <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
            <div class="w-px h-5 bg-gray-200"></div>
            <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
            <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
            <div class="h-8 w-28 bg-gray-200 rounded-sm"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div v-for="i in 4" :key="i" class="h-44 bg-gray-100 border border-gray-200 rounded-sm"></div>
          </div>
        </div>

        <!-- Page Title Row -->
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <CalendarIcon :size="14" class="text-gray-400" /> Calendar_Overview
            </h3>
            <button @click="showKPIs = !showKPIs" class="ml-2 p-1 border border-gray-200 rounded-sm text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition" :title="showKPIs ? 'Hide KPIs' : 'Show KPIs'">
              <Eye v-if="showKPIs" :size="12" />
              <EyeOff v-else :size="12" />
            </button>
          </div>
          <button @click="openNewMeeting" v-if="!showMeetingModal" class="px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2">
            <Plus :size="14" /> Schedule_Meeting
          </button>
          <button @click="openGCalModal" class="px-4 py-2 rounded-sm bg-white border border-gray-200 text-gray-700 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition flex items-center gap-2">
            <ExternalLink :size="14" /> Sync_Google_Cal
          </button>
          <button @click="openExcelEditor" class="px-4 py-2 rounded-sm bg-white border border-gray-200 text-gray-700 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition flex items-center gap-2">
            <FileSpreadsheet :size="14" /> Excel Edit
          </button>
          <input ref="excelImportRef" type="file" accept=".xlsx,.xls" class="hidden" @change="onExcelImport" />
        </div>

        <!-- Stats Grid -->
        <div v-if="showKPIs" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-blue-50 p-2 border border-blue-100">
                  <Clock :size="18" class="text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <span class="text-[9px] text-blue-600 font-mono font-bold uppercase">Count</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Scheduled</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ meetingStats.scheduled || 0 }}</p>
            </div>
          </div>
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-green-50 p-2 border border-green-100">
                  <CalendarDays :size="18" class="text-green-500 group-hover:text-green-600 transition-colors" />
                </div>
                <span class="text-[9px] text-green-600 font-mono font-bold uppercase">Today</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Today</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ meetingStats.today || 0 }}</p>
            </div>
          </div>
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-emerald-50 p-2 border border-emerald-100">
                  <CheckCircle2 :size="18" class="text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                </div>
                <span class="text-[9px] text-emerald-600 font-mono font-bold uppercase">Week</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Completed_Week</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ meetingStats.completedThisWeek || 0 }}</p>
            </div>
          </div>
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-orange-50 p-2 border border-orange-100">
                  <CalendarCheck :size="18" class="text-orange-500 group-hover:text-orange-600 transition-colors" />
                </div>
                <span class="text-[9px] text-orange-600 font-mono font-bold uppercase">Total</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ meetingStats.totalMeetings || 0 }}</p>
            </div>
          </div>
        </div>

        <!-- Financial KPI Row -->
        <div v-if="showKPIs" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-blue-50 p-2 border border-blue-100">
                  <TrendingUp :size="18" class="text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <span class="text-[9px] text-blue-600 font-mono font-bold uppercase">Pipeline</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Deal_Values</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ fmtMoney(kpiPipelineValue) }}</p>
            </div>
          </div>
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-green-50 p-2 border border-green-100">
                  <DollarSign :size="18" class="text-green-500 group-hover:text-green-600 transition-colors" />
                </div>
                <span class="text-[9px] text-green-600 font-mono font-bold uppercase">Won</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Won_Revenue</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ fmtMoney(kpiWonRevenue) }}</p>
            </div>
          </div>
          <div class="bg-white border border-gray-200 shadow-sm hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-purple-50 p-2 border border-purple-100">
                  <Target :size="18" class="text-purple-500 group-hover:text-purple-600 transition-colors" />
                </div>
                <span class="text-[9px] text-purple-600 font-mono font-bold uppercase">Avg</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">CAC</h5>
              <p class="text-2xl font-black text-[#2F2E8B] tracking-tight">{{ fmtMoney(kpiCAC) }}</p>
            </div>
          </div>
          <div class="bg-[#2F2E8B] border border-[#2F2E8B] shadow-sm hover:bg-[#1D226B] transition cursor-pointer group relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-10"></div>
            <div class="p-4 relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="bg-white/15 p-2 border border-white/20">
                  <AlertTriangle :size="18" class="text-white" />
                </div>
                <span class="text-[9px] text-red-200 font-mono font-bold uppercase">No-Shows</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-1">Maintenance</h5>
              <p class="text-sm font-black text-white tracking-tight">{{ kpiMaintenance }}</p>
            </div>
          </div>
        </div>

        <!-- View Toggle + Filter Tabs -->
        <div v-if="showKPIs" class="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
          <div class="flex items-center gap-1.5 mr-2">
            <button @click="meetingView = 'list'"
              :class="meetingView === 'list' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
              <List :size="11" /> List_View
            </button>
            <button @click="meetingView = 'calendar'"
              :class="meetingView === 'calendar' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5">
              <CalendarIcon :size="11" /> Calendar_View
            </button>
          </div>
          <div class="w-px h-5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 overflow-x-auto">
            <button v-for="f in ['all', 'scheduled', 'completed', 'cancelled']" :key="f"
              @click="meetingFilter = f"
              :class="meetingFilter === f ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition">
              {{ f === 'all' ? 'All_Meetings' : f.charAt(0).toUpperCase() + f.slice(1) + '_Only' }}
            </button>
          </div>
        </div>

        <!-- List View (Card Grid) -->
        <div v-if="meetingView === 'list'">
          <!-- Empty State -->
          <div v-if="filteredMeetings.length === 0" class="bg-white border border-gray-100 text-center py-20 rounded-sm relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-4">
                <CalendarX :size="32" class="text-gray-200" />
              </div>
              <h4 class="text-[12px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">No_Meetings_Found</h4>
              <p class="text-[10px] font-mono text-gray-300 mt-2 uppercase tracking-widest max-w-xs leading-relaxed">Adjust filters or schedule a new meeting to populate this log.</p>
              <button @click="openNewMeeting" class="mt-6 px-4 py-2 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all rounded-sm flex items-center gap-2">
                <Plus :size="10" /> Schedule_First_Meeting
              </button>
            </div>
          </div>

          <!-- Card Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div v-for="meeting in filteredMeetings" :key="meeting.id"
              class="bg-white border rounded-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col group"
              :class="{
                'border-l-[3px] border-l-blue-500 border-gray-200': meeting.status === 'scheduled',
                'border-l-[3px] border-l-green-500 border-gray-200': meeting.status === 'completed',
                'border-l-[3px] border-l-red-500 border-gray-200': meeting.status === 'cancelled',
              }"
              @click="openMeetingDetail(meeting)">
              <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>

              <!-- Card Header -->
              <div class="px-3 py-2 border-b border-gray-50 bg-gray-50/30">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="text-[7px] font-mono font-black text-gray-300 uppercase tracking-[0.15em] mb-0.5">Meeting_Log</div>
                    <h4 class="text-[10px] font-mono font-black text-gray-900 truncate uppercase tracking-tight group-hover:text-[#2F2E8B]">
                      {{ meeting.title || 'UNTITLED_MEETING' }}
                    </h4>
                  </div>
                  <span class="px-1 py-0.5 rounded-sm text-[7px] font-mono font-black uppercase tracking-widest border shrink-0"
                    :class="{
                      'bg-blue-50 text-blue-700 border-blue-200': meeting.status === 'scheduled',
                      'bg-green-50 text-green-700 border-green-200': meeting.status === 'completed',
                      'bg-red-50 text-red-700 border-red-200': meeting.status === 'cancelled',
                    }">
                    {{ meeting.status }}
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="px-3 py-2 space-y-1.5 flex-1">
                <div class="flex items-center justify-between border-b border-dashed border-gray-100 pb-1.5">
                  <span class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date</span>
                  <span class="text-[10px] font-mono font-black text-[#2F2E8B] tracking-tighter">{{ crmFormatDate(meeting.start_datetime) }}</span>
                </div>

                <div class="space-y-1">
                  <div class="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight">
                    <Clock :size="8" class="text-gray-300" />
                    <span>{{ formatTime(meeting.start_datetime) }} — {{ formatTime(meeting.end_datetime) }}</span>
                  </div>
                  <div v-if="meeting.location" class="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight">
                    <MapPin :size="8" class="text-gray-300" />
                    <span class="truncate">{{ meeting.location }}</span>
                  </div>
                  <div v-if="meeting.meeting_link" class="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight">
                    <ExternalLink :size="8" class="text-gray-300" />
                    <a :href="meeting.meeting_link" target="_blank" @click.stop class="truncate text-[#2F2E8B] hover:underline normal-case text-[8px]">Join_Link</a>
                  </div>
                  <div v-if="meeting.description" class="text-[8px] font-mono text-gray-400 line-clamp-1 pt-0.5 normal-case leading-relaxed">
                    {{ meeting.description }}
                  </div>
                </div>
              </div>

              <!-- Card Footer Actions -->
              <div class="px-2 py-1.5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-1" @click.stop>
                <div class="flex items-center gap-0.5">
                  <button v-if="meeting.status === 'scheduled'" @click.stop="completeMeetingAction(meeting.id)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all" title="Mark Complete">
                    <Check :size="10" />
                  </button>
                  <button v-if="meeting.status === 'scheduled'" @click.stop="openCancelModal(meeting.id)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 rounded-sm transition-all" title="Cancel">
                    <X :size="10" />
                  </button>
                  <button @click.stop="addMeetingToGoogleCalendar(meeting)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 rounded-sm transition-all" title="Add to Google Calendar">
                    <ExternalLink :size="10" />
                  </button>
                  <button @click.stop="deleteMeeting(meeting.id)"
                    class="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all" title="Delete">
                    <Trash2 :size="10" />
                  </button>
                </div>
                <div class="flex items-center gap-0.5">
                  <button @click.stop="editMeeting(meeting)" class="px-1.5 py-0.5 bg-white border border-gray-200 text-gray-600 text-[7px] font-mono font-black uppercase tracking-widest rounded-sm hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all flex items-center gap-0.5">
                    <Pencil :size="8" /> Edit
                  </button>
                  <button @click.stop="openMeetingDetail(meeting)" class="px-1.5 py-0.5 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition-all">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar View -->
        <div v-if="meetingView === 'calendar'" class="bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="p-4 md:p-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <button @click="previousMonth" class="px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1">
                <ChevronLeft :size="12" /> PREV
              </button>
              <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-mono">{{ currentMonthYear }}</h3>
              <button @click="nextMonth" class="px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1">
                NEXT <ChevronRight :size="12" />
              </button>
            </div>
            <div class="grid grid-cols-7 gap-1 mb-1">
              <div v-for="day in weekDays" :key="day" class="text-center text-[9px] font-mono font-black text-gray-400 py-2 uppercase tracking-widest">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1">
              <div v-for="(day, index) in calendarDays" :key="index"
                :class="{
                  'bg-gray-50/50': !day.isCurrentMonth,
                  'border-2 border-[#2F2E8B] bg-blue-50/30': day.isToday,
                  'hover:bg-gray-50 cursor-pointer': day.meetings && day.meetings.length > 0,
                }"
                class="min-h-[80px] border border-gray-100 rounded-sm p-1.5 transition"
                @click="day.meetings && day.meetings.length > 0 && openDayMeetings(day)">
                <div class="text-[9px] font-mono font-bold mb-1" :class="day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'">{{ day.date }}</div>
                <div class="space-y-0.5">
                  <div v-for="meeting in (day.meetings || []).slice(0, 2)" :key="meeting.id"
                    :class="{
                      'bg-blue-500': meeting.status === 'scheduled',
                      'bg-green-500': meeting.status === 'completed',
                      'bg-red-500': meeting.status === 'cancelled'
                    }"
                    class="text-white text-[8px] font-mono rounded-sm px-1 py-0.5 truncate">
                    {{ formatTime(meeting.start_datetime) }} {{ meeting.title }}
                  </div>
                  <div v-if="(day.meetings || []).length > 2" class="text-[8px] font-mono text-gray-400 text-center">+{{ day.meetings.length - 2 }} more</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Meetings -->
        <div v-if="meetingStats.upcoming && meetingStats.upcoming.length > 0" class="bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="p-4 md:p-6 relative z-10">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <CalendarDays :size="14" class="text-gray-400" /> Upcoming_Meetings
              </h4>
            </div>
            <div class="space-y-2">
              <div v-for="meeting in meetingStats.upcoming" :key="meeting.id"
                class="border border-gray-100 rounded-sm p-3 flex items-center justify-between hover:border-[#2F2E8B]/40 hover:bg-gray-50/50 transition cursor-pointer"
                @click="openMeetingDetail(meeting)">
                <div>
                  <h5 class="text-xs font-mono font-bold text-gray-900 uppercase tracking-tight">{{ meeting.title }}</h5>
                  <p class="text-[10px] font-mono text-gray-500 mt-0.5">{{ crmFormatDate(meeting.start_datetime) }} // {{ formatTime(meeting.start_datetime) }}</p>
                </div>
                <ChevronRight :size="14" class="text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <!-- Meeting Modal -->
      </div>
    </div>

    <!-- Meeting Modal (rendered at root level for proper fixed positioning) -->
    <CRMMeetingModal v-if="showMeetingModal" />

    <!-- Google Calendar Send Modal -->
    <Teleport to="body">
    <div v-if="showGCalModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div class="bg-white w-full max-w-2xl rounded-sm border border-gray-200 shadow-2xl flex flex-col max-h-[90vh]">

        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Google Calendar</span>
              <h2 class="text-sm font-black text-gray-900 uppercase tracking-tight">Send_Meetings</h2>
            </div>
          </div>
          <button @click="showGCalModal = false" class="text-gray-400 hover:text-gray-700 transition p-1">
            <X :size="18" />
          </button>
        </div>

        <!-- Scrollable body -->
        <div class="overflow-y-auto px-6 py-5 space-y-5">

          <!-- ── Section 1: Filter & Select ── -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">Select Meetings</span>
              <span class="text-[10px] text-[#2F2E8B] font-mono">{{ gcalSelectedIds.length }} selected</span>
            </div>

            <!-- Filter type tabs -->
            <div class="flex items-center gap-1 bg-gray-100 rounded-sm p-1">
              <button v-for="[key, label] in [['all','All'],['month','By Month'],['range','Date Range']]" :key="key"
                @click="gcalFilterType = key"
                :class="['flex-1 py-1 text-[10px] font-mono font-bold uppercase rounded-sm transition',
                  gcalFilterType === key ? 'bg-white text-[#2F2E8B] shadow-sm' : 'text-gray-500 hover:text-gray-700']">
                {{ label }}
              </button>
            </div>

            <!-- Month picker -->
            <div v-if="gcalFilterType === 'month'" class="flex items-center gap-2">
              <select v-model.number="gcalFilterMonth" class="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none">
                <option v-for="(name, idx) in ['January','February','March','April','May','June','July','August','September','October','November','December']" :key="idx" :value="idx + 1">{{ name }}</option>
              </select>
              <select v-model.number="gcalFilterYear" class="w-28 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none">
                <option v-for="y in [2024,2025,2026,2027,2028]" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>

            <!-- Date range picker -->
            <div v-if="gcalFilterType === 'range'" class="flex items-center gap-2">
              <input type="date" v-model="gcalDateFrom" class="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none" />
              <span class="text-gray-400 text-xs shrink-0">to</span>
              <input type="date" v-model="gcalDateTo" class="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none" />
            </div>

            <!-- Meeting list with checkboxes -->
            <div class="border border-gray-200 rounded-sm overflow-hidden">
              <!-- Select all row -->
              <label class="flex items-center gap-3 px-3 py-2 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition">
                <input type="checkbox" :checked="gcalAllSelected" :indeterminate.prop="gcalSomeSelected && !gcalAllSelected" @change="gcalToggleSelectAll" class="rounded accent-[#2F2E8B]" />
                <span class="text-[10px] font-mono font-bold text-gray-500 uppercase">Select All ({{ gcalFilteredMeetings.length }})</span>
              </label>
              <!-- Rows -->
              <div class="max-h-52 overflow-y-auto divide-y divide-gray-50">
                <div v-if="gcalFilteredMeetings.length === 0" class="px-3 py-5 text-xs text-gray-400 text-center">
                  No meetings for this filter.
                </div>
                <label v-for="m in gcalFilteredMeetings" :key="m._id || m.id"
                  class="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition">
                  <input type="checkbox"
                    :checked="gcalSelectedIds.includes(String(m._id || m.id))"
                    @change="gcalToggleMeeting(m)"
                    class="rounded accent-[#2F2E8B] shrink-0" />
                  <div class="min-w-0">
                    <p class="text-xs font-semibold text-gray-800 truncate">{{ m.title || 'Untitled Meeting' }}</p>
                    <p class="text-[10px] text-gray-400">{{ crmFormatDate(m.start_datetime) }}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-100"></div>

          <!-- ── Section 2: Recipients ── -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">Recipients</span>

            <!-- Added recipient chips -->
            <div v-if="gcalRecipients.length > 0" class="flex flex-wrap gap-1.5">
              <span v-for="em in gcalRecipients" :key="em"
                class="inline-flex items-center gap-1.5 bg-[#2F2E8B]/10 text-[#2F2E8B] text-[11px] font-medium px-2.5 py-1 rounded-full">
                {{ em }}
                <button @click="removeGCalRecipient(em)" class="hover:text-red-500 transition leading-none">
                  <X :size="10" />
                </button>
              </span>
            </div>
            <p v-else class="text-[10px] text-gray-400">No recipients added yet.</p>

            <!-- Add email input -->
            <div class="flex items-center gap-2">
              <input
                v-model="gcalEmailInput"
                type="email"
                placeholder="Add email address…"
                @keydown.enter.prevent="addGCalRecipient"
                class="flex-1 border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm px-3 py-2 text-sm"
              />
              <button @click="addGCalRecipient"
                class="shrink-0 px-3 py-2 border border-[#2F2E8B] text-[#2F2E8B] text-[10px] font-mono font-bold uppercase rounded-sm hover:bg-[#2F2E8B] hover:text-white transition">
                Add
              </button>
            </div>

            <!-- Save toggle -->
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" v-model="gcalSaveEmail" class="rounded accent-[#2F2E8B]" />
              <span class="text-[10px] text-gray-500">Save added emails for next time</span>
            </label>

            <!-- Saved emails quick-add -->
            <div v-if="gcalSavedEmails.length > 0" class="space-y-1.5">
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Saved Emails</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="em in gcalSavedEmails" :key="em"
                  class="group inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                  <button @click="addSavedEmail(em)" class="hover:text-[#2F2E8B] transition font-medium">{{ em }}</button>
                  <button @click="removeSavedEmail(em)" class="text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100 leading-none">
                    <X :size="10" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Feedback -->
          <p v-if="calEmailSent" class="text-[11px] text-green-600 font-medium">
            ✓ Sent {{ calEmailSuccessCount }} meeting{{ calEmailSuccessCount !== 1 ? 's' : '' }} to {{ gcalRecipients.length }} recipient{{ gcalRecipients.length !== 1 ? 's' : '' }}!
          </p>
          <p v-if="calEmailError" class="text-[11px] text-red-500">{{ calEmailError }}</p>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 shrink-0">
          <button @click="showGCalModal = false" class="text-[10px] font-mono font-bold uppercase text-gray-500 hover:text-gray-700 transition">
            Cancel
          </button>
          <button
            @click="sendCalendarByEmail"
            :disabled="sendingCalEmail || gcalRecipients.length === 0 || gcalSelectedIds.length === 0"
            class="px-5 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm hover:bg-[#3D2F88] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="sendingCalEmail">Sending…</span>
            <span v-else>Send {{ gcalSelectedIds.length }} Meeting{{ gcalSelectedIds.length !== 1 ? 's' : '' }} → {{ gcalRecipients.length }} Recipient{{ gcalRecipients.length !== 1 ? 's' : '' }}</span>
          </button>
        </div>
      </div>
    </div>
    </Teleport>

    <!-- Cancel Meeting Modal -->
    <Teleport to="body">
      <div v-if="showCancelModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeCancelModal">
        <div class="bg-white w-full max-w-md mx-4 border border-amber-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-amber-500"></div>
          <div class="p-6">
            <div class="flex items-start gap-4 mb-5">
              <div class="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle :size="18" class="text-amber-500" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Cancel Meeting</p>
                <p class="text-sm font-semibold text-gray-800">Are you sure you want to cancel this meeting?</p>
                <p class="text-[10px] text-gray-400 mt-1.5 font-mono leading-relaxed">Provide a reason for cancellation (optional).</p>
              </div>
            </div>
            <textarea
              v-model="cancelReason"
              rows="3"
              placeholder="Enter cancellation reason (optional)..."
              class="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-[11px] font-mono text-gray-700 outline-none focus:border-amber-500 focus:bg-amber-50/30 resize-none rounded-sm transition-colors"
            ></textarea>
            <div class="flex justify-end gap-2 mt-5">
              <button @click="closeCancelModal" class="px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-sm">Cancel</button>
              <button @click="confirmCancelMeeting" :disabled="cancelling" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm">
                <Loader2 v-if="cancelling" :size="12" class="animate-spin" />
                <X v-else :size="12" /> {{ cancelling ? 'Cancelling...' : 'Confirm Cancellation' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { onMounted, ref, computed, watch } from 'vue';
import { useCRMModule } from './functions/CRMModule.js';
import CRMMeetingModal from './components/CRMMeetingModal.vue';
import API_BASE_URL from '@/api_services/api.js';
import * as meetingsApi from '@/api_services/crm_meetings_api.js';
import { useCurrency } from '@/composables/useCurrency';
import {
  UserCircle, CalendarDays, CalendarCheck, Clock, CheckCircle2,
  Plus, List, Check, X, Trash2, Pencil, ChevronLeft, ChevronRight,
  CalendarX, Calendar as CalendarIcon, ExternalLink, MapPin,
  TrendingUp, DollarSign, Target, AlertTriangle, Loader2, Eye, EyeOff, FileSpreadsheet
} from 'lucide-vue-next';

const {
  getUserEmail, getTenantId, activeTab, moduleLoading, meetingStats, meetingView, meetingFilter,
  showMeetingModal, filteredMeetings, openNewMeeting, openMeetingDetail, editMeeting,
  completeMeetingAction, deleteMeeting, crmFormatDate, formatTime,
  currentMonthYear, calendarDays, weekDays, previousMonth, nextMonth, openDayMeetings,
  loadMeetings, loadMeetingStats, pipelineDeals, fetchPipelineData
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'meetings';
  loadMeetings();
  loadMeetingStats();
  fetchPipelineData().catch(() => {});
});

// ── Cancel Meeting Modal ──
const showKPIs = ref(false);
const showCancelModal = ref(false);
const cancelMeetingId = ref(null);
const cancelReason = ref('');
const cancelling = ref(false);

function openCancelModal(meetingId) {
  cancelMeetingId.value = meetingId;
  cancelReason.value = '';
  showCancelModal.value = true;
}

function closeCancelModal() {
  showCancelModal.value = false;
  cancelMeetingId.value = null;
  cancelReason.value = '';
}

async function confirmCancelMeeting() {
  if (!cancelMeetingId.value) return;
  cancelling.value = true;
  try {
    const reason = cancelReason.value?.trim() || '';
    const result = await meetingsApi.cancelMeeting(cancelMeetingId.value, reason);
    if (result.success) {
      closeCancelModal();
      await loadMeetings();
      await loadMeetingStats();
    }
  } catch (error) {
    console.error('Error cancelling meeting:', error);
  } finally {
    cancelling.value = false;
  }
}

// ── Financial KPIs ──
const { formatCurrencyCompact } = useCurrency();
function fmtMoney(val) {
  if (!val || isNaN(val)) return formatCurrencyCompact(0);
  return formatCurrencyCompact(val);
}
const kpiPipelineValue = computed(() =>
  (pipelineDeals.value || []).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiWonRevenue = computed(() =>
  (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won')).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiCAC = computed(() => {
  const won = (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won'));
  return won.length ? kpiWonRevenue.value / won.length : 0;
});
const kpiMaintenance = computed(() =>
  (filteredMeetings.value || []).filter(m => m.status === 'cancelled' || m.status === 'no_show').length
);

// ── Google Calendar Send Modal ──
const SAVED_EMAILS_KEY = 'crm_gcal_saved_emails';
const showGCalModal = ref(false);
const sendingCalEmail = ref(false);
const calEmailSent = ref(false);
const calEmailError = ref('');
const calEmailSuccessCount = ref(0);
const urlCopied = ref(false); // kept so existing template refs don't break

// Recipients
const gcalEmailInput = ref('');
const gcalRecipients = ref([]);
const gcalSavedEmails = ref(JSON.parse(localStorage.getItem(SAVED_EMAILS_KEY) || '[]'));
const gcalSaveEmail = ref(false);

// Meeting filter
const gcalFilterType = ref('all');   // 'all' | 'month' | 'range'
const gcalFilterMonth = ref(new Date().getMonth() + 1);
const gcalFilterYear = ref(new Date().getFullYear());
const gcalDateFrom = ref('');
const gcalDateTo = ref('');

// Selected meeting IDs (array for proper Vue reactivity)
const gcalSelectedIds = ref([]);

const gcalFilteredMeetings = computed(() => {
  const all = (filteredMeetings.value || []).filter(m => m.status !== 'cancelled');
  if (gcalFilterType.value === 'month') {
    return all.filter(m => {
      if (!m.start_datetime) return false;
      const dt = new Date(m.start_datetime);
      return dt.getMonth() + 1 === gcalFilterMonth.value && dt.getFullYear() === gcalFilterYear.value;
    });
  }
  if (gcalFilterType.value === 'range') {
    const from = gcalDateFrom.value ? new Date(gcalDateFrom.value) : null;
    const to = gcalDateTo.value ? new Date(gcalDateTo.value + 'T23:59:59') : null;
    return all.filter(m => {
      if (!m.start_datetime) return false;
      const dt = new Date(m.start_datetime);
      if (from && dt < from) return false;
      if (to && dt > to) return false;
      return true;
    });
  }
  return all;
});

const gcalAllSelected = computed(() =>
  gcalFilteredMeetings.value.length > 0 &&
  gcalFilteredMeetings.value.every(m => gcalSelectedIds.value.includes(String(m._id || m.id)))
);
const gcalSomeSelected = computed(() =>
  gcalFilteredMeetings.value.some(m => gcalSelectedIds.value.includes(String(m._id || m.id)))
);

// Auto-select all when filter changes
watch([gcalFilterType, gcalFilterMonth, gcalFilterYear, gcalDateFrom, gcalDateTo], () => {
  gcalSelectedIds.value = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
});

function openGCalModal() {
  gcalSelectedIds.value = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
  calEmailSent.value = false;
  calEmailError.value = '';
  showGCalModal.value = true;
}

function gcalToggleSelectAll() {
  const ids = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
  gcalSelectedIds.value = gcalAllSelected.value ? [] : ids;
}

function gcalToggleMeeting(m) {
  const id = String(m._id || m.id);
  const idx = gcalSelectedIds.value.indexOf(id);
  if (idx >= 0) gcalSelectedIds.value.splice(idx, 1);
  else gcalSelectedIds.value.push(id);
}

function addGCalRecipient() {
  const em = gcalEmailInput.value.trim();
  if (!em || !em.includes('@')) return;
  if (!gcalRecipients.value.includes(em)) {
    gcalRecipients.value.push(em);
    if (gcalSaveEmail.value) {
      const updated = [...new Set([...gcalSavedEmails.value, em])];
      gcalSavedEmails.value = updated;
      localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(updated));
    }
  }
  gcalEmailInput.value = '';
}

function removeGCalRecipient(em) {
  gcalRecipients.value = gcalRecipients.value.filter(e => e !== em);
}

function addSavedEmail(em) {
  if (!gcalRecipients.value.includes(em)) gcalRecipients.value.push(em);
}

function removeSavedEmail(em) {
  gcalSavedEmails.value = gcalSavedEmails.value.filter(e => e !== em);
  localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(gcalSavedEmails.value));
}

async function sendCalendarByEmail() {
  if (gcalRecipients.value.length === 0) {
    calEmailError.value = 'Add at least one recipient email.';
    return;
  }
  if (gcalSelectedIds.value.length === 0) {
    calEmailError.value = 'Select at least one meeting to send.';
    return;
  }
  sendingCalEmail.value = true;
  calEmailError.value = '';
  calEmailSent.value = false;
  try {
    const tenantId = getTenantId ? getTenantId() : '';
    const userEmail = getUserEmail ? getUserEmail() : (gcalRecipients.value[0] || '');
    const params = new URLSearchParams({ tenant_id: tenantId, email: userEmail });
    const res = await fetch(`${API_BASE_URL}/crm/meetings/send-ical?${params}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: gcalRecipients.value,
        meeting_ids: gcalSelectedIds.value,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || `Server error ${res.status}`);
    }
    const data = await res.json();
    calEmailSuccessCount.value = data.meeting_count || gcalSelectedIds.value.length;
    calEmailSent.value = true;
    setTimeout(() => { calEmailSent.value = false; }, 6000);
  } catch (err) {
    calEmailError.value = err.message || 'Failed to send. Please try again.';
  } finally {
    sendingCalEmail.value = false;
  }
}

// Legacy helpers (kept for addMeetingToGoogleCalendar below)
const gCalEmail = ref('');
const gCalFeedUrl = computed(() => {
  const tenantId = getTenantId ? getTenantId() : '';
  return `${API_BASE_URL}/crm/meetings/ical-feed?tenant_id=${encodeURIComponent(tenantId)}`;
});
function copyFeedUrl() {
  navigator.clipboard.writeText(gCalFeedUrl.value).catch(() => {});
  urlCopied.value = true;
  setTimeout(() => { urlCopied.value = false; }, 2000);
}
function openGoogleCalendarSubscribe() {
  window.open(`https://calendar.google.com/calendar/r/settings/addbyurl?url=${encodeURIComponent(gCalFeedUrl.value)}`, '_blank', 'noopener,noreferrer');
}

/**
 * Build a Google Calendar event URL for a single meeting and open it.
 * Uses the "Add to Calendar" URL format — no OAuth required.
 */
function addMeetingToGoogleCalendar(meeting) {
  const start = toGCalDate(meeting.start_datetime);
  const end = toGCalDate(meeting.end_datetime || meeting.start_datetime);
  const title = encodeURIComponent(meeting.title || 'Meeting');
  const details = encodeURIComponent([
    meeting.description || '',
    meeting.virtual_meeting_url ? `Join: ${meeting.virtual_meeting_url}` : '',
    meeting.location || ''
  ].filter(Boolean).join('\n'));
  const location = encodeURIComponent(meeting.location || '');
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Export all scheduled meetings to Google Calendar (opens each in a new tab).
 * For a real integration, you'd use the Google Calendar API with OAuth.
 */
function exportAllToGoogleCalendar() {
  const scheduledMeetings = (filteredMeetings.value || []).filter(m => m.status === 'scheduled').slice(0, 10);
  if (!scheduledMeetings.length) {
    alert('No scheduled meetings to export.');
    return;
  }
  if (scheduledMeetings.length > 1) {
    const confirmed = window.confirm(`Export ${scheduledMeetings.length} scheduled meetings to Google Calendar? Each will open in a new tab.`);
    if (!confirmed) return;
  }
  scheduledMeetings.forEach((m, i) => {
    setTimeout(() => addMeetingToGoogleCalendar(m), i * 300);
  });
}

function toGCalDate(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// ── Excel Export/Edit ──
const excelImportRef = ref(null);

async function openExcelEditor() {
  try {
    const tenantId = getTenantId ? getTenantId() : '';
    if (!tenantId) { alert('Could not determine tenant.'); return; }
    const result = await meetingsApi.getMeetings({ tenant_id: tenantId, limit: 10000 });
    const data = result?.data || result?.items || (Array.isArray(result) ? result : []);
    if (!data || !data.length) { alert('No meetings to export.'); return; }
    const XLSX = await import('xlsx');
    const rows = data.map(m => ({
      ID: m.id || m._id || '',
      Title: m.title || '',
      Type: m.meeting_type || '',
      Status: m.status || '',
      Location: m.location || '',
      Start_DateTime: m.start_datetime || '',
      End_DateTime: m.end_datetime || '',
      Description: m.description || ''
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Meetings');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `meetings_edit_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click(); URL.revokeObjectURL(url);
    setTimeout(() => { excelImportRef.value?.click(); }, 500);
  } catch (err) { console.error('[CRMMeetingsPage] Excel export failed:', err); }
}

async function onExcelImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const XLSX = await import('xlsx');
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);
    if (!rows.length) { alert('No data found.'); return; }
    let updated = 0;
    for (const row of rows) {
      const id = String(row.ID || '').trim();
      if (!id) continue;
      const payload = {};
      if (row.Title !== undefined) payload.title = String(row.Title).trim();
      if (row.Type !== undefined) payload.meeting_type = String(row.Type).trim();
      if (row.Status !== undefined) payload.status = String(row.Status).trim();
      if (row.Location !== undefined) payload.location = String(row.Location).trim();
      if (row.Description !== undefined) payload.description = String(row.Description).trim();
      try {
        await meetingsApi.updateMeeting(id, payload);
        updated++;
      } catch (e) { console.warn(`[CRMMeetingsPage] Failed to update meeting ${id}:`, e); }
    }
    alert(`Excel import complete! ${updated} of ${rows.length} meetings updated.`);
    await loadMeetings();
    await loadMeetingStats();
  } catch (err) {
    console.error('[CRMMeetingsPage] Excel import failed:', err);
    alert('Failed to import Excel file.');
  } finally { event.target.value = ''; }
}
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  opacity: 0.04;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #2F2E8B; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #3D2F88; }
</style>
