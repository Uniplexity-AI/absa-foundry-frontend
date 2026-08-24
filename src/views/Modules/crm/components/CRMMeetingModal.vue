<template>
  <Teleport to="body">
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeMeetingModal"></div>

    <!-- Modal Content -->
    <div class="relative bg-white w-full max-w-2xl shadow-2xl rounded-sm border border-gray-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
      <!-- Decoration patterns -->
      <div class="absolute top-0 right-0 w-32 h-32 dotted-pattern opacity-10 pointer-events-none"></div>
      
      <!-- Header -->
      <header class="relative px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-1 h-8 bg-[#2F2E8B] rounded-full"></div>
          <div>
            <span class="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Meeting Scheduler</span>
            <h2 class="text-xl font-bold text-gray-900 tracking-tight">
              {{ editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting' }}
            </h2>
          </div>
        </div>
        <button @click="closeMeetingModal" class="p-2 text-gray-400 hover:text-gray-900 transition hover:bg-gray-100 rounded-full">
          <X :size="20" />
        </button>
      </header>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-8 space-y-10">
        <!-- Basic Info Section -->
        <section class="space-y-6">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 1: Primary Information</h3>
          </div>
          
          <div class="space-y-5">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-gray-500">Meeting Title *</label>
              <input 
                v-model="meetingForm.title" 
                type="text" 
                placeholder="Enter a descriptive title for this meeting..." 
                class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-gray-500">Meeting Type</label>
                <div class="relative">
                  <select 
                    v-model="meetingForm.meeting_type" 
                    class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                  >
                    <option value="call">Phone Call</option>
                    <option value="virtual">Virtual Meeting</option>
                    <option value="physical">Physical Meeting</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="16" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-gray-500">Location Type</label>
                <div class="relative">
                  <select 
                    v-model="meetingForm.location_type" 
                    class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                  >
                    <option value="virtual">Virtual (Zoom/Google Meet)</option>
                    <option value="physical">Physical Address</option>
                    <option value="phone">Phone Call</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="16" />
                </div>
              </div>
            </div>

            <div class="space-y-1.5" v-if="meetingForm.location_type === 'virtual'">
              <label class="text-xs font-semibold text-gray-500">Meeting Link (Optional)</label>
              <input 
                v-model="meetingForm.virtual_meeting_url" 
                type="url" 
                placeholder="https://meet.google.com/abc-defg-hij" 
                class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
              />
            </div>

            <!-- Physical Location with Distance -->
            <div v-if="meetingForm.location_type === 'physical'" class="border border-green-200 bg-green-50/30 rounded-sm p-4 space-y-3">
              <div class="flex items-center gap-2">
                <MapPin :size="14" class="text-green-600" />
                <span class="text-xs font-bold text-green-700 uppercase tracking-wider">Location & Distance</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- LEFT: Your Location (Meeting Point) -->
                <div class="bg-white border border-[#2F2E8B]/20 rounded-sm p-3 space-y-2">
                  <div class="flex items-center gap-1.5 pb-1 border-b border-gray-100">
                    <Navigation :size="11" class="text-[#2F2E8B]" />
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Your Location</span>
                    <span v-if="meetingForm.lat" class="ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200">SET</span>
                  </div>

                  <!-- Search your location -->
                  <div class="relative">
                    <input v-model="locationSearchQuery" @keyup.enter="searchLocation" type="text" placeholder="Search address or place..." class="w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[9px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                    <button @click="searchLocation" type="button" class="absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:bg-gray-100">GO</button>
                  </div>
                  <div v-if="locationResults.length > 0" class="border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1">
                    <button v-for="r in locationResults" :key="r.label" @click="selectLocation(r)" type="button" class="w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] border-b border-gray-50 truncate">
                      {{ r.label }}
                    </button>
                  </div>

                  <div class="flex gap-1.5">
                    <button @click="useCurrentLocationForMeeting" :disabled="isLocatingDevice" type="button" class="flex-1 px-2 py-1.5 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-[7px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1">
                      <Loader2 v-if="isLocatingDevice" :size="9" class="animate-spin" />
                      <Navigation v-else :size="9" />
                      {{ isLocatingDevice ? '...' : 'CURRENT' }}
                    </button>
                    <button @click="showManualLocation = !showManualLocation" type="button" class="px-2 py-1.5 border border-gray-300 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[7px] font-mono font-black uppercase tracking-widest transition-all">MANUAL</button>
                  </div>

                  <!-- Manual input -->
                  <div v-if="showManualLocation" class="space-y-1.5">
                    <div class="grid grid-cols-2 gap-1.5">
                      <input v-model="meetingManualLat" type="number" step="any" placeholder="Lat" class="border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                      <input v-model="meetingManualLng" type="number" step="any" placeholder="Lng" class="border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                    </div>
                    <button @click="applyManualLocation" type="button" class="w-full px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all">APPLY</button>
                  </div>

                  <!-- Selected location display -->
                  <div v-if="meetingForm.lat" class="bg-green-50 border border-green-200 px-2 py-1.5 rounded-sm">
                    <p class="text-[7px] font-mono font-bold text-green-800 truncate">{{ meetingForm.location || `${meetingForm.lat.toFixed(4)}, ${meetingForm.lng.toFixed(4)}` }}</p>
                    <p class="text-[6px] font-mono text-green-600">{{ meetingForm.lat.toFixed(6) }}, {{ meetingForm.lng.toFixed(6) }}</p>
                  </div>
                  <div v-else class="bg-gray-50 border border-dashed border-gray-200 px-2 py-3 text-center rounded-sm">
                    <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">No location set</p>
                  </div>
                </div>

                <!-- RIGHT: Linked Record's Location -->
                <div class="bg-white border border-amber-200/60 rounded-sm p-3 space-y-2">
                  <div class="flex items-center gap-1.5 pb-1 border-b border-gray-100">
                    <MapPin :size="11" class="text-amber-600" />
                    <span class="text-[9px] font-mono font-black text-amber-700 uppercase tracking-widest">
                      {{ meetingForm.linkedRecordType ? (meetingForm.linkedRecordType.charAt(0).toUpperCase() + meetingForm.linkedRecordType.slice(1) + "'s Location") : 'Linked Record' }}
                    </span>
                    <span v-if="linkedRecordLocation" class="ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200">KNOWN</span>
                    <span v-else class="ml-auto text-[7px] font-mono font-bold text-amber-600 bg-amber-50 px-1 py-0.5 border border-amber-200">UNSET</span>
                  </div>

                  <!-- Linked record location display -->
                  <div v-if="linkedRecordLocation" class="flex items-start gap-2">
                    <MapPin :size="10" class="text-amber-500 mt-0.5 shrink-0" />
                    <div class="flex-1 min-w-0">
                      <p class="text-[8px] font-mono font-bold text-gray-800 uppercase truncate">{{ linkedRecordLocation.label || '' }}</p>
                      <p class="text-[6px] font-mono text-gray-500">{{ linkedRecordLocation.lat.toFixed(6) }}, {{ linkedRecordLocation.lng.toFixed(6) }}</p>
                    </div>
                  </div>
                  <div v-else class="bg-amber-50 border border-dashed border-amber-200 px-2 py-2 text-center rounded-sm">
                    <p class="text-[7px] font-mono font-bold text-amber-600 uppercase tracking-widest">
                      {{ meetingForm.linkedRecordType ? 'No location for linked record' : 'Link a record to see location' }}
                    </p>
                  </div>

                  <!-- Search to set/update linked record's location -->
                  <div class="relative">
                    <input v-model="linkedLocationSearch" @keyup.enter="searchLinkedLocation" type="text" placeholder="Search address for linked record..." class="w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[8px] font-mono focus:outline-none focus:border-amber-500" />
                    <button @click="searchLinkedLocation" type="button" class="absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-amber-600 uppercase tracking-widest hover:bg-gray-100">GO</button>
                  </div>
                  <div v-if="linkedLocationResults.length > 0" class="border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1">
                    <button v-for="r in linkedLocationResults" :key="r.label" @click="selectLinkedLocation(r)" type="button" class="w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-b border-gray-50 truncate">
                      {{ r.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Distance between the two locations -->
              <div v-if="meetingForm.lat && linkedRecordLocation" class="bg-white border border-gray-200 rounded-sm px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Navigation :size="14" class="text-[#2F2E8B]" />
                  <span class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">Distance</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-[#2F2E8B]">{{ meetingDistance !== null ? (meetingDistance < 1 ? (meetingDistance * 1000).toFixed(0) + ' m' : meetingDistance.toFixed(2) + ' km') : '—' }}</span>
                </div>
              </div>
              <div v-else class="bg-gray-50 border border-dashed border-gray-200 rounded-sm px-4 py-2 text-center">
                <p class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest">Set both locations to calculate distance</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Time Section -->
        <section class="space-y-6">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 2: Date & Time</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-gray-500">Starts At *</label>
              <input 
                v-model="meetingForm.start_datetime" 
                type="datetime-local" 
                class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-gray-500">Ends At *</label>
              <input 
                v-model="meetingForm.end_datetime" 
                type="datetime-local" 
                class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm"
              />
            </div>
          </div>
        </section>

        <!-- Participants Section -->
        <section class="space-y-6">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 3: Participants</h3>
          </div>
          
          <div class="space-y-5">
            <div class="flex gap-2">
              <div class="flex-1 space-y-1.5">
                <input 
                  v-model="newParticipant.name" 
                  type="text" 
                  placeholder="Full Name" 
                  class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm"
                />
              </div>
              <div class="flex-[1.5] space-y-1.5">
                <input 
                  v-model="newParticipant.email" 
                  type="email" 
                  placeholder="Email Address" 
                  class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm"
                />
              </div>
              <button 
                @click="addParticipant" 
                type="button"
                class="bg-[#2F2E8B] text-white px-5 rounded-sm hover:bg-[#3D2F88] transition flex items-center justify-center self-stretch mb-0.5"
              >
                <Plus :size="20" />
              </button>
            </div>

            <!-- Participant List -->
            <div v-if="meetingForm.participants.length > 0" class="bg-gray-50 border border-gray-200 rounded-sm divide-y divide-gray-200">
              <div v-for="(p, idx) in meetingForm.participants" :key="idx" class="flex items-center justify-between p-3.5 group hover:bg-white transition-colors">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-900">{{ p.name }}</span>
                  <span class="text-xs text-gray-500">{{ p.email || 'No email provided' }} · {{ p.type }}</span>
                </div>
                <button @click="removeParticipant(idx)" class="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-all">
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
            <div v-else class="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-sm">
              <Users :size="32" class="text-gray-300 mx-auto mb-2" />
              <p class="text-xs font-medium text-gray-400">No participants added yet</p>
            </div>
          </div>
        </section>

        <!-- Relational Section -->
        <section class="space-y-6">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 4: Linked Records</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-gray-500">Record Type</label>
              <div class="relative">
                <select 
                  v-model="meetingForm.linkedRecordType" 
                  class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                >
                  <option value="">No Link</option>
                  <option value="lead">Lead</option>
                  <option value="contact">Contact</option>
                  <option value="account">Account</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="16" />
              </div>
            </div>
            <div class="space-y-1.5" v-if="meetingForm.linkedRecordType">
              <SearchableSelect
                label="Select Record"
                :options="getRecordsForType(meetingForm.linkedRecordType).map(r => r.name)"
                v-model="selectedRecordName"
                placeholder="Search by name..."
              />
            </div>
          </div>
        </section>

        <!-- Description -->
        <section class="space-y-6">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 5: Documentation</h3>
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500">Meeting Notes / Agenda</label>
            <textarea 
              v-model="meetingForm.description" 
              rows="4" 
              placeholder="Outline the goals and agenda for this meeting..." 
              class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
            ></textarea>
          </div>
        </section>

        <!-- Reminders -->
        <section class="space-y-6 pb-4">
          <div class="border-b border-gray-100 pb-2">
            <h3 class="text-xs font-bold text-[#2F2E8B] uppercase tracking-wider">Step 6: Notification Triggers</h3>
          </div>
          <div class="flex flex-wrap gap-8">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="meetingForm.reminder15min" class="w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]" />
              <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">15 Minutes Before</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="meetingForm.reminder1hour" class="w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]" />
              <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">1 Hour Before</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="meetingForm.reminder1day" class="w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]" />
              <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">24 Hours Before</span>
            </label>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <footer class="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <button 
          type="button"
          @click="closeMeetingModal" 
          class="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition shadow-none"
        >
          Cancel
        </button>
        <button 
          type="button"
          @click="submitMeeting" 
          :disabled="savingMeeting"
          class="px-10 py-3 bg-[#2F2E8B] text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition shadow-lg disabled:opacity-50 flex items-center gap-2"
        >
          <template v-if="savingMeeting">
            <span class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             Processing...
          </template>
          <template v-else>
            {{ editingMeeting ? 'Update Meeting' : 'Schedule Meeting' }}
          </template>
        </button>
      </footer>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCRMModule } from '../composables/CRMModule.js';
import SearchableSelect from './SearchableSelect.vue';
import { 
  X, ChevronDown, Plus, Trash2, Users, MapPin, Navigation, Loader2
} from 'lucide-vue-next';

const {
  showMeetingModal, editingMeeting, meetingForm, newParticipant, savingMeeting,
  closeMeetingModal, submitMeeting, addParticipant, removeParticipant,
  getRecordsForType
} = useCRMModule();

// ── Location Search ──
const locationSearchQuery = ref('');
const locationResults = ref([]);
const searchingLocation = ref(false);
const meetingDistance = ref(null);
const isLocatingDevice = ref(false);
const showManualLocation = ref(false);
const meetingManualLat = ref(null);
const meetingManualLng = ref(null);

// Linked record location
const linkedRecordLocation = ref(null);
const linkedLocationSearch = ref('');
const linkedLocationResults = ref([]);
const updatingLinkedLocation = ref(false);

function updateLinkedRecordLocation() {
  const linkedId = meetingForm.value.linkedRecordId;
  const linkedType = meetingForm.value.linkedRecordType;
  if (!linkedId || !linkedType) {
    linkedRecordLocation.value = null;
    return;
  }
  const records = getRecordsForType(linkedType);
  const record = records.find(r => (r.id || r._id) === linkedId);
  if (!record) { linkedRecordLocation.value = null; return; }
  const loc = record.location || record;
  const lat = loc.lat || loc.latitude;
  const lng = loc.lng || loc.longitude || loc.lng;
  if (lat && lng) {
    linkedRecordLocation.value = {
      lat, lng,
      label: record.city ? `${record.city}, ${record.country || ''}` : (record.name || '')
    };
  } else {
    linkedRecordLocation.value = null;
  }
}

// ── Linked Record Location Search ──
async function searchLinkedLocation() {
  const q = linkedLocationSearch.value.trim();
  if (!q) return;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
    const data = await res.json();
    linkedLocationResults.value = data.map(d => ({
      label: d.display_name,
      lat: parseFloat(d.lat),
      lng: parseFloat(d.lon)
    }));
  } catch {
    linkedLocationResults.value = [];
  }
}

function selectLinkedLocation(result) {
  linkedLocationResults.value = [];
  linkedLocationSearch.value = '';
  // Update the linked record's location in the form metadata
  const linkedId = meetingForm.value.linkedRecordId;
  const linkedType = meetingForm.value.linkedRecordType;
  if (!linkedId || !linkedType) return;
  // Update local linkedRecordLocation for distance calculation
  linkedRecordLocation.value = {
    lat: result.lat,
    lng: result.lng,
    label: result.label
  };
  calcMeetingDistance();
}

async function searchLocation() {
  const q = locationSearchQuery.value.trim();
  if (!q) return;
  searchingLocation.value = true;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
    const data = await res.json();
    locationResults.value = data.map(d => ({
      label: d.display_name,
      lat: parseFloat(d.lat),
      lng: parseFloat(d.lon)
    }));
  } catch {
    locationResults.value = [];
  } finally {
    searchingLocation.value = false;
  }
}

function selectLocation(result) {
  meetingForm.value.location = result.label;
  meetingForm.value.lat = result.lat;
  meetingForm.value.lng = result.lng;
  locationResults.value = [];
  locationSearchQuery.value = '';
  calcMeetingDistance();
}

function useCurrentLocationForMeeting() {
  if (!navigator.geolocation) { alert('Geolocation is not supported.'); return; }
  isLocatingDevice.value = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      meetingForm.value.lat = lat;
      meetingForm.value.lng = lng;
      // Reverse geocode to get a place name
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
        const data = await res.json();
        meetingForm.value.location = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      } catch {
        meetingForm.value.location = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
      isLocatingDevice.value = false;
      calcMeetingDistance();
    },
    () => { isLocatingDevice.value = false; alert('Could not get current location.'); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function applyManualLocation() {
  const lat = parseFloat(meetingManualLat.value);
  const lng = parseFloat(meetingManualLng.value);
  if (isNaN(lat) || isNaN(lng)) { alert('Enter valid coordinates.'); return; }
  meetingForm.value.lat = lat;
  meetingForm.value.lng = lng;
  meetingForm.value.location = `MANUAL: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  showManualLocation.value = false;
  calcMeetingDistance();
}

function calcMeetingDistance() {
  const mLat = meetingForm.value.lat;
  const mLng = meetingForm.value.lng;
  const rLoc = linkedRecordLocation.value;
  if (!mLat || !mLng || !rLoc?.lat || !rLoc?.lng) {
    meetingDistance.value = null;
    return;
  }
  const R = 6371;
  const dLat = (rLoc.lat - mLat) * Math.PI / 180;
  const dLng = (rLoc.lng - mLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(rLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  meetingDistance.value = R * c;
  // Save distance to form
  meetingForm.value.distance_km = R * c;
}

// Helper to sync record name from searchable select to id in form
const selectedRecordName = ref('');

// Watch for manual name selection and find the ID
watch(selectedRecordName, (newName) => {
  if (!newName) {
    meetingForm.value.linkedRecordId = '';
    return;
  }
  const records = getRecordsForType(meetingForm.value.linkedRecordType);
  const found = records.find(r => r.name === newName);
  if (found) {
    meetingForm.value.linkedRecordId = found.id || found._id;
  }
});

// Watch for external ID changes (e.g. when editing) to sync name
watch(() => meetingForm.value.linkedRecordId, (newId) => {
  if (!newId) {
    selectedRecordName.value = '';
    return;
  }
  const records = getRecordsForType(meetingForm.value.linkedRecordType);
  const found = records.find(r => (r.id || r._id) === newId);
  if (found) {
    selectedRecordName.value = found.name;
  }
  updateLinkedRecordLocation();
  calcMeetingDistance();
}, { immediate: true });

// Recalculate distance when linked record type changes
watch(() => meetingForm.value.linkedRecordType, () => {
  updateLinkedRecordLocation();
  calcMeetingDistance();
});

// Watch for distance_km reset on form clear
watch(() => meetingForm.value.location, () => {
  if (!meetingForm.value.location) {
    meetingForm.value.lat = null;
    meetingForm.value.lng = null;
  }
});
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 1.5px, transparent 1.5px);
  background-size: 15px 15px;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #2F2E8B; border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: #3D2F88; }
</style>
