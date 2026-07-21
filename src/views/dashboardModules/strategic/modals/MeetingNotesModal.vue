<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-[#2F2E8B] rounded-t-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-calendar-alt text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">Strategic Meeting</h2>
              <p class="text-blue-100 text-sm">Schedule and document strategic planning meetings</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:bg-blue-600 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-gray-50 border-b border-[#F1F1F1]">
        <div class="flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id 
                ? 'bg-white text-[#2F2E8B] border-b-2 border-[#2F2E8B]' 
                : 'text-[#6B7280] hover:text-[#1F2937]'
            ]"
          >
            <i :class="tab.icon + ' mr-2'"></i>
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <!-- Meeting Details Tab -->
        <div v-if="activeTab === 'details'" class="space-y-6">
          <form @submit.prevent="saveMeeting">
            <!-- Basic Meeting Information -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Meeting Title *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="e.g., Q1 Strategic Planning Session"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Meeting Type
                </label>
                <select
                  v-model="form.type"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                >
                  <option value="strategic-planning">Strategic Planning</option>
                  <option value="performance-review">Performance Review</option>
                  <option value="goal-setting">Goal Setting</option>
                  <option value="quarterly-review">Quarterly Review</option>
                  <option value="annual-planning">Annual Planning</option>
                  <option value="board-meeting">Board Meeting</option>
                  <option value="stakeholder-review">Stakeholder Review</option>
                </select>
              </div>
            </div>

            <!-- Date and Time -->
            <div class="grid md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Meeting Date
                </label>
                <input
                  v-model="form.date"
                  type="date"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Start Time
                </label>
                <input
                  v-model="form.startTime"
                  type="time"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Duration (hours)
                </label>
                <input
                  v-model="form.duration"
                  type="number"
                  step="0.5"
                  placeholder="2"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Location/Platform
                </label>
                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Conference Room A / Zoom"
                  class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
            </div>

            <!-- Participants -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <label class="block text-sm font-medium text-[#1F2937]">
                  Meeting Participants
                </label>
                <button
                  type="button"
                  @click="addParticipant"
                  class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
                >
                  <i class="fas fa-plus"></i>
                  Add Participant
                </button>
              </div>

              <div v-for="(participant, index) in form.participants" :key="index" class="bg-gray-50 rounded-lg p-3 mb-2 flex items-center justify-between">
                <div class="flex items-center gap-3 flex-1">
                  <select
                    v-model="participant.role"
                    class="px-3 py-2 border border-gray-200 rounded-md text-sm"
                  >
                    <option value="facilitator">Facilitator</option>
                    <option value="participant">Participant</option>
                    <option value="observer">Observer</option>
                    <option value="presenter">Presenter</option>
                  </select>
                  <input
                    v-model="participant.name"
                    type="text"
                    placeholder="Participant name"
                    class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                  />
                  <input
                    v-model="participant.email"
                    type="email"
                    placeholder="email@company.com"
                    class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                  />
                </div>
                <button
                  type="button"
                  @click="removeParticipant(index)"
                  class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors ml-2"
                >
                  <i class="fas fa-trash text-sm"></i>
                </button>
              </div>

              <div v-if="form.participants.length === 0" class="text-center py-4 text-[#6B7280]">
                <i class="fas fa-users text-xl mb-2"></i>
                <p>No participants added yet. Click "Add Participant" to invite attendees.</p>
              </div>
            </div>

            <!-- Meeting Description -->
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Meeting Description & Context
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Describe the meeting purpose, context, and expected outcomes..."
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Agenda Tab -->
        <div v-if="activeTab === 'agenda'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-[#1F2937]">Meeting Agenda</h3>
            <button
              @click="addAgendaItem"
              class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
            >
              <i class="fas fa-plus"></i>
              Add Item
            </button>
          </div>

          <div v-for="(item, index) in form.agenda" :key="index" class="bg-gray-50 rounded-lg p-4 mb-3">
            <div class="grid md:grid-cols-4 gap-4 mb-3">
              <div class="md:col-span-2">
                <label class="block text-xs text-[#6B7280] mb-1">Agenda Item</label>
                <input
                  v-model="item.title"
                  type="text"
                  placeholder="e.g., Review Q4 Performance"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Duration (mins)</label>
                <input
                  v-model="item.duration"
                  type="number"
                  placeholder="30"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
              <div class="flex items-end">
                <button
                  type="button"
                  @click="removeAgendaItem(index)"
                  class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors w-full"
                >
                  <i class="fas fa-trash text-sm"></i>
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Presenter/Owner</label>
                <input
                  v-model="item.presenter"
                  type="text"
                  placeholder="Who will lead this item?"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Expected Outcome</label>
                <select
                  v-model="item.outcome"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                >
                  <option value="discussion">Discussion</option>
                  <option value="decision">Decision Required</option>
                  <option value="information">Information Sharing</option>
                  <option value="action-items">Generate Action Items</option>
                  <option value="approval">Approval Needed</option>
                </select>
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-xs text-[#6B7280] mb-1">Description & Notes</label>
              <textarea
                v-model="item.description"
                rows="2"
                placeholder="Additional details about this agenda item..."
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
              ></textarea>
            </div>
          </div>

          <div v-if="form.agenda.length === 0" class="text-center py-8 text-[#6B7280]">
            <i class="fas fa-list text-2xl mb-2"></i>
            <p>No agenda items yet. Click "Add Item" to structure your meeting.</p>
          </div>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-[#1F2937] mb-4">Meeting Notes & Minutes</h3>
            
            <!-- Notes Editor -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <label class="block text-sm font-medium text-[#1F2937]">
                  Meeting Notes
                </label>
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="addTimestamp"
                    class="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                  >
                    <i class="fas fa-clock mr-1"></i>Timestamp
                  </button>
                  <button
                    type="button"
                    @click="addActionItem"
                    class="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
                  >
                    <i class="fas fa-tasks mr-1"></i>Action Item
                  </button>
                </div>
              </div>
              
              <textarea
                v-model="form.notes"
                rows="12"
                placeholder="Meeting notes, key discussions, decisions made...

Use [ACTION] to mark action items
Use [DECISION] to mark key decisions
Use [FOLLOW-UP] to mark follow-up items"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none font-mono text-sm"
              ></textarea>
            </div>

            <!-- Quick Actions -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-[#1F2937] mb-2">Action Items</h4>
                <div class="bg-yellow-50 rounded-lg p-3 min-h-[120px]">
                  <div v-for="actionItem in extractedActionItems" :key="actionItem" class="text-sm mb-2 flex items-start gap-2">
                    <i class="fas fa-arrow-right text-yellow-600 mt-1"></i>
                    <span>{{ actionItem }}</span>
                  </div>
                  <p v-if="extractedActionItems.length === 0" class="text-[#6B7280] text-sm">
                    Action items will appear here when you add [ACTION] tags in your notes.
                  </p>
                </div>
              </div>

              <div>
                <h4 class="font-medium text-[#1F2937] mb-2">Key Decisions</h4>
                <div class="bg-green-50 rounded-lg p-3 min-h-[120px]">
                  <div v-for="decision in extractedDecisions" :key="decision" class="text-sm mb-2 flex items-start gap-2">
                    <i class="fas fa-check text-green-600 mt-1"></i>
                    <span>{{ decision }}</span>
                  </div>
                  <p v-if="extractedDecisions.length === 0" class="text-[#6B7280] text-sm">
                    Key decisions will appear here when you add [DECISION] tags in your notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Follow-up Tab -->
        <div v-if="activeTab === 'followup'" class="space-y-6">
          <h3 class="text-lg font-semibold text-[#1F2937]">Follow-up Actions</h3>

          <div class="flex items-center justify-between mb-4">
            <p class="text-[#6B7280]">Assign follow-up tasks and track completion</p>
            <button
              @click="addFollowUpTask"
              class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
            >
              <i class="fas fa-plus"></i>
              Add Task
            </button>
          </div>

          <div v-for="(task, index) in form.followUpTasks" :key="index" class="bg-gray-50 rounded-lg p-4 mb-3">
            <div class="grid md:grid-cols-3 gap-4 mb-3">
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Task Description</label>
                <input
                  v-model="task.description"
                  type="text"
                  placeholder="Follow-up task description"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Assigned To</label>
                <input
                  v-model="task.assignee"
                  type="text"
                  placeholder="Person responsible"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Due Date</label>
                <input
                  v-model="task.dueDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 text-sm">
                  <input
                    v-model="task.completed"
                    type="checkbox"
                    class="rounded border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]"
                  />
                  Mark as completed
                </label>
                <select
                  v-model="task.priority"
                  class="px-2 py-1 border border-gray-200 rounded text-xs"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <button
                type="button"
                @click="removeFollowUpTask(index)"
                class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
              >
                <i class="fas fa-trash text-xs"></i>
              </button>
            </div>
          </div>

          <div v-if="form.followUpTasks.length === 0" class="text-center py-8 text-[#6B7280]">
            <i class="fas fa-clipboard-check text-2xl mb-2"></i>
            <p>No follow-up tasks yet. Click "Add Task" to track post-meeting actions.</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-4 pt-6 border-t border-[#F1F1F1] mt-8">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
          >
            Cancel
          </button>
          <button
            v-if="activeTab !== 'notes'"
            type="button"
            @click="saveDraft"
            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button
            type="button"
            @click="saveMeeting"
            class="bg-[#2F2E8B] hover:bg-[#252470] text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <i class="fas fa-save"></i>
            {{ activeTab === 'notes' ? 'Save Meeting Notes' : 'Schedule Meeting' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['close', 'meeting-saved'])

const activeTab = ref('details')

const tabs = [
  { id: 'details', name: 'Meeting Details', icon: 'fas fa-info-circle' },
  { id: 'agenda', name: 'Agenda', icon: 'fas fa-list' },
  { id: 'notes', name: 'Notes', icon: 'fas fa-sticky-note' },
  { id: 'followup', name: 'Follow-up', icon: 'fas fa-tasks' }
]

const form = reactive({
  title: '',
  type: 'strategic-planning',
  date: '',
  startTime: '',
  duration: 2,
  location: '',
  description: '',
  participants: [],
  agenda: [],
  notes: '',
  followUpTasks: []
})

// Computed properties for extracting tagged items from notes
const extractedActionItems = computed(() => {
  const actionRegex = /\[ACTION\]\s*([^\n]+)/gi
  const matches = []
  let match
  while ((match = actionRegex.exec(form.notes)) !== null) {
    matches.push(match[1].trim())
  }
  return matches
})

const extractedDecisions = computed(() => {
  const decisionRegex = /\[DECISION\]\s*([^\n]+)/gi
  const matches = []
  let match
  while ((match = decisionRegex.exec(form.notes)) !== null) {
    matches.push(match[1].trim())
  }
  return matches
})

// Methods
const addParticipant = () => {
  form.participants.push({
    name: '',
    email: '',
    role: 'participant'
  })
}

const removeParticipant = (index) => {
  form.participants.splice(index, 1)
}

const addAgendaItem = () => {
  form.agenda.push({
    title: '',
    duration: 30,
    presenter: '',
    outcome: 'discussion',
    description: ''
  })
}

const removeAgendaItem = (index) => {
  form.agenda.splice(index, 1)
}

const addFollowUpTask = () => {
  form.followUpTasks.push({
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  })
}

const removeFollowUpTask = (index) => {
  form.followUpTasks.splice(index, 1)
}

const addTimestamp = () => {
  const now = new Date()
  const timestamp = `[${now.toLocaleTimeString()}] `
  form.notes += form.notes ? '\n' + timestamp : timestamp
}

const addActionItem = () => {
  const actionItem = '\n[ACTION] '
  form.notes += actionItem
}

const saveDraft = () => {
  const meetingData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft'
  }

  // Save to localStorage
  const existingMeetings = JSON.parse(localStorage.getItem('strategic_meetings') || '[]')
  existingMeetings.push(meetingData)
  localStorage.setItem('strategic_meetings', JSON.stringify(existingMeetings))

  emit('meeting-saved', meetingData)
  emit('close')
}

const saveMeeting = () => {
  if (!form.title) {
    alert('Please enter a meeting title')
    return
  }

  const meetingData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: form.date ? 'scheduled' : 'draft'
  }

  // Save to localStorage
  const existingMeetings = JSON.parse(localStorage.getItem('strategic_meetings') || '[]')
  existingMeetings.push(meetingData)
  localStorage.setItem('strategic_meetings', JSON.stringify(existingMeetings))

  emit('meeting-saved', meetingData)
  emit('close')
}
</script>

<style scoped>
/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>