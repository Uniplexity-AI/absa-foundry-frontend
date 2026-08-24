<template>
  <div class="governance-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-none relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // GOVERNANCE_SHIELD</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">Strategic Governance</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">PROTOCOLS // COMPLIANCE_FRAMEWORK</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <button 
              @click="openPolicyModal"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-plus"></i>
              <span>NEW_POLICY</span>
            </button>

            <button 
              @click="openComplianceModal"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-plus"></i>
              <span>NEW_COMPLIANCE</span>
            </button>

            <button 
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-robot"></i>
              <span>AI_AUDIT_EXECUTE</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="governance" />

      <!-- Company Structure Section -->
      <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors mb-6">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_ORG // HIERARCHY_MAP</div>
        
        <div class="flex items-center justify-between mb-8 relative z-10">
          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-blue-600"></div>
            Company Structure & Profiles
          </h2>
          <div class="flex gap-2 bg-gray-100 p-1">
            <button 
              @click="structureViewMode = 'hierarchy'"
              :class="['px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest transition-all', structureViewMode === 'hierarchy' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600']"
            >
              HIERARCHY
            </button>
            <button 
              @click="structureViewMode = 'profiles'"
              :class="['px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest transition-all', structureViewMode === 'profiles' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600']"
            >
              PROFILES
            </button>
          </div>
        </div>

        <div v-if="structureViewMode === 'hierarchy'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          <div v-for="(employees, dept) in companyStructure" :key="dept" class="p-6 bg-gray-50 border border-gray-100 hover:bg-white hover:border-[#2F2E8B]/20 transition-all group/dept">
            <h3 class="text-[12px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight mb-4 border-b border-gray-200 pb-2 flex justify-between items-center">
              {{ dept }}
              <span class="text-[9px] bg-[#2F2E8B]/10 px-2 py-0.5 rounded-full">{{ employees.length }}</span>
            </h3>
            <div class="space-y-4">
              <div v-for="emp in employees" :key="emp.empNo" class="flex flex-col gap-1">
                <p class="text-[10px] font-mono font-black text-gray-900 uppercase">{{ emp.name }}</p>
                <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ emp.designation || 'Staff' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <div v-for="emp in employeeProfiles" :key="emp.empNo" class="p-6 border border-gray-100 bg-white hover:border-[#2F2E8B]/30 transition-all group/profile relative">
            <div class="absolute top-4 right-4 text-[10px] font-mono text-gray-300 font-black">#{{ emp.empNo ? emp.empNo.slice(-4) : '...' }}</div>
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight">{{ emp.name }}</p>
                <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ emp.designation }}</p>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase">DEPT //</span>
                  <span class="text-[9px] font-mono font-bold text-gray-700 uppercase tracking-tight">{{ emp.department }}</span>
                </div>
                <!-- Mini Stats / Badges -->
                <div class="flex gap-4 border-t border-gray-50 pt-3">
                  <div v-if="emp.skills && emp.skills.length" class="flex-1">
                    <p class="text-[7px] font-mono font-black text-gray-300 uppercase mb-1">SKILLS</p>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="skill in emp.skills.slice(0, 2)" :key="skill" class="bg-blue-50 text-blue-600 px-1 py-0.5 text-[7px] font-mono font-black uppercase">{{ skill }}</span>
                    </div>
                  </div>
                  <div v-if="emp.appointmentDate" class="flex-1">
                    <p class="text-[7px] font-mono font-black text-gray-300 uppercase mb-1">SINCE</p>
                    <p class="text-[8px] font-mono font-black text-gray-600 uppercase">{{ emp.appointmentDate }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Action Overlay -->
            <div class="absolute inset-0 bg-[#2F2E8B]/95 opacity-0 group-hover/profile:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center">
              <p class="text-white text-[10px] font-mono font-black uppercase mb-4 tracking-widest">Employee Profile Details</p>
              <div class="flex flex-col gap-2 w-full">
                <button class="w-full bg-white text-[#2F2E8B] py-2 text-[9px] font-mono font-black uppercase hover:bg-white/90">View Full Profile</button>
                <button class="w-full border border-white/30 text-white py-2 text-[9px] font-mono font-black uppercase hover:bg-white/10">Strategic Review</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="employeeProfiles.length === 0" class="col-span-full py-12 text-center bg-gray-50 border border-dashed border-gray-200">
          <i class="fas fa-users text-gray-300 text-3xl mb-4"></i>
          <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">No staff data available. Add employees in HR module.</p>
        </div>
      </div>

      <!-- Governance Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        
        <!-- Company Policies Section -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_DOCS // POLICY_REPOSITORY</div>
          
          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Company Policies
          </h2>

          <div class="space-y-4 relative z-10">
            <div v-for="policy in policies" :key="policy.id" class="p-6 bg-gray-50 border border-gray-100 hover:bg-white hover:border-[#2F2E8B]/20 transition-all group/card overflow-hidden relative">
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-center justify-between mb-4 relative z-10">
                <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ policy.name }}</h3>
                <span :class="['px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border', policy.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200']">
                  {{ policy.status }}
                </span>
              </div>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-tight leading-relaxed mb-6 relative z-10">{{ policy.description }}</p>
              <div class="flex items-center justify-between relative z-10 pt-4 border-t border-gray-100">
                <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">LAST_REVIEW // {{ policy.lastReviewed }}</span>
                <div class="flex gap-4">
                  <button @click="editPolicy(policy)" class="text-[9px] font-mono font-black text-blue-600 uppercase tracking-widest hover:underline">EDIT</button>
                  <button @click="deletePolicy(policy.id)" class="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest hover:underline">DELETE</button>
                  <button class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:underline">DOC _></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Compliance & Legal (ZRA) Section -->
        <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_LEGAL // TAX_COMPLIANCE</div>
          
          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-8 relative z-10 flex items-center gap-3">
            <div class="w-1.5 h-6 bg-emerald-500"></div>
            Compliance & Legal (ZRA)
          </h2>

          <div class="bg-gray-50 border border-gray-100 p-6 mb-8 relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <div class="flex items-center justify-between mb-6 relative z-10">
              <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">ZRA Submission Status</span>
              <span class="px-3 py-1 bg-emerald-500 text-white text-[9px] font-mono font-black uppercase tracking-widest">SYNC_OPTIMAL</span>
            </div>
            <div class="grid grid-cols-2 gap-4 relative z-10">
              <div class="bg-white border border-gray-100 p-4">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase block mb-1">NEXT_VAT_WINDOW</p>
                <p class="text-xs font-black font-outfit text-gray-900 uppercase tracking-tight">20th Feb 2026</p>
              </div>
              <div class="bg-white border border-gray-100 p-4">
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase block mb-1">PAYE_STATUS</p>
                <p class="text-xs font-black font-outfit text-emerald-600 uppercase tracking-tight">CLEARED_CORE</p>
              </div>
            </div>
          </div>
          
          <h3 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Legal Obligations Tracker</h3>
          <div class="space-y-3 relative z-10">
            <div v-for="task in complianceTasks" :key="task.id" class="flex items-center gap-6 p-4 border border-gray-100 hover:bg-gray-50 transition-all group/row">
              <div :class="['w-1.5 h-6', task.priority === 'High' ? 'bg-red-500' : 'bg-blue-500']"></div>
              <div class="flex-1">
                <p class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ task.title }}</p>
                <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mt-1">DUE_DATE // {{ task.dueDate }}</p>
              </div>
              <div class="flex gap-4 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <button @click="editCompliance(task)" class="text-[9px] font-mono font-black text-blue-600 uppercase tracking-widest hover:underline">EDIT</button>
                <button @click="deleteCompliance(task.id)" class="text-[9px] font-mono font-black text-red-500 uppercase tracking-widest hover:underline">DELETE</button>
                <button class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:underline">EXECUTE</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customizable Governance Fields Section -->
      <div class="bg-white border border-gray-200 p-8 shadow-none relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_SCHEMA // CUSTOM_ATTRIBUTES</div>
        
        <div class="flex items-center justify-between mb-8 relative z-10">
          <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            Customizable Governance Fields
          </h2>
          <button class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:underline">MANAGE_STRUCTURE</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <div v-for="field in customFields" :key="field.id" class="p-6 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#2F2E8B]/20 transition-all group/field">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ field.label }}</span>
              <div class="w-1 h-4 bg-[#2F2E8B]/20"></div>
            </div>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">{{ field.description }}</p>
            <input 
              v-model="field.value"
              class="w-full h-12 bg-white border border-gray-50 flex items-center px-4 text-[10px] font-mono font-bold text-gray-900 uppercase tracking-tight focus:outline-none focus:border-[#2F2E8B]/30"
              :placeholder="field.placeholder || 'Enter value...'"
            >
          </div>

          <button class="p-6 border border-dashed border-gray-200 bg-gray-50/20 flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-[#2F2E8B]/30 transition-all group/add">
            <div class="w-10 h-10 border border-dashed border-gray-300 flex items-center justify-center group-hover/add:border-[#2F2E8B]/30 group-hover/add:bg-[#2F2E8B]/5 transition-all">
              <i class="fas fa-plus text-gray-300 group-hover/add:text-[#2F2E8B]"></i>
            </div>
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">ADD_CUSTOM_FIELD</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Policy Modal -->
    <div v-if="showPolicyModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showPolicyModal = false"></div>
      <div class="bg-white border border-gray-200 w-full max-w-lg relative z-10 shadow-2xl p-8">
        <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-6">
          {{ currentPolicy.id ? 'Edit Policy' : 'New Policy' }}
        </h2>
        <div class="space-y-6">
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Policy Name</label>
            <input v-model="currentPolicy.name" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. Data Protection">
          </div>
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
            <textarea v-model="currentPolicy.description" rows="4" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="Describe the policy..."></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Status</label>
              <select v-model="currentPolicy.status" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Category</label>
              <input v-model="currentPolicy.category" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. Finance">
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-3">
          <button @click="showPolicyModal = false" class="px-6 py-2 text-[10px] font-mono font-black text-gray-400 uppercase hover:text-gray-600">Cancel</button>
          <button v-if="!currentPolicy.id" @click="savePolicy(true)" class="bg-gray-100 text-gray-700 px-6 py-2 text-[10px] font-mono font-black uppercase hover:bg-gray-200 transition-all border border-gray-200">
            SAVE & ADD ANOTHER
          </button>
          <button @click="savePolicy(false)" class="bg-[#2F2E8B] text-white px-8 py-2 text-[10px] font-mono font-black uppercase shadow-lg hover:bg-[#1D226B] transition-all">
            {{ currentPolicy.id ? 'UPDATE_DOC' : 'CREATE_DOC' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Compliance Modal -->
    <div v-if="showComplianceModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showComplianceModal = false"></div>
      <div class="bg-white border border-gray-200 w-full max-w-lg relative z-10 shadow-2xl p-8">
        <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight mb-6">
          {{ currentCompliance.id ? 'Edit Obligation' : 'New Obligation' }}
        </h2>
        <div class="space-y-6">
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Obligation Title</label>
            <input v-model="currentCompliance.title" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. Annual Tax Return">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Due Date</label>
              <input v-model="currentCompliance.dueDate" type="text" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30" placeholder="e.g. 31st March 2026">
            </div>
            <div>
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Priority</label>
              <select v-model="currentCompliance.priority" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">Status</label>
            <select v-model="currentCompliance.status" class="w-full bg-gray-50 border border-gray-100 p-3 text-[12px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B]/30">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div class="mt-8 flex justify-end gap-3">
          <button @click="showComplianceModal = false" class="px-6 py-2 text-[10px] font-mono font-black text-gray-400 uppercase hover:text-gray-600">Cancel</button>
          <button v-if="!currentCompliance.id" @click="saveCompliance(true)" class="bg-gray-100 text-gray-700 px-6 py-2 text-[10px] font-mono font-black uppercase hover:bg-gray-200 transition-all border border-gray-200">
            SAVE & ADD ANOTHER
          </button>
          <button @click="saveCompliance(false)" class="bg-blue-600 text-white px-8 py-2 text-[10px] font-mono font-black uppercase shadow-lg hover:bg-blue-700 transition-all">
            {{ currentCompliance.id ? 'UPDATE_TASK' : 'SCHEDULE_TASK' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_BASE_URL from '@/services/api.js'
import { decodeJWT } from '@/services/decodeJWT.js'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const tenantId = 'default'
const isLoading = ref(false)

const activeTab = ref('governance')

const policies = ref([])
const complianceTasks = ref([])
const customFields = ref([
  { id: 1, label: 'Secondary Tax ID', description: 'Optional tax registration number for branch operations.', placeholder: 'e.g. branch-9988' },
  { id: 2, label: 'Legal Representative', description: 'Designated legal contact person for regulatory queries.', placeholder: 'Enter name...' }
])

const companyStructure = ref({})
const employeeProfiles = ref([])
const structureViewMode = ref('hierarchy') // 'hierarchy' or 'profiles'

const showPolicyModal = ref(false)
const showComplianceModal = ref(false)
const currentPolicy = ref({ name: '', description: '', status: 'Active', category: 'General' })
const currentCompliance = ref({ title: '', dueDate: '', priority: 'Medium', status: 'Pending', category: 'Legal' })

const openPolicyModal = () => {
  currentPolicy.value = { name: '', description: '', status: 'Active', category: 'General' }
  showPolicyModal.value = true
}

const openComplianceModal = () => {
  currentCompliance.value = { title: '', dueDate: '', priority: 'Medium', status: 'Pending', category: 'Legal' }
  showComplianceModal.value = true
}

// Normalize structure: merge any numeric/ID-like department keys into "General Operations"
const normalizeStructure = (rawStructure) => {
  const normalized = {}
  for (const [dept, employees] of Object.entries(rawStructure)) {
    const trimmed = String(dept).trim()
    // Check if it's a number, ObjectId-like hex, or blank
    const isNumeric = /^\d+$/.test(trimmed)
    const isObjectId = /^[a-f0-9]{24}$/i.test(trimmed)
    const isBlank = !trimmed || trimmed === 'null' || trimmed === 'undefined'
    
    const resolvedDept = (isNumeric || isObjectId || isBlank) ? 'General Operations' : trimmed
    
    if (!normalized[resolvedDept]) {
      normalized[resolvedDept] = []
    }
    normalized[resolvedDept].push(...employees)
  }
  return normalized
}

// Normalize individual profiles - fix department labels
const normalizeProfiles = (profiles) => {
  return profiles.map(emp => {
    const dept = String(emp.department || '').trim()
    const isNumeric = /^\d+$/.test(dept)
    const isObjectId = /^[a-f0-9]{24}$/i.test(dept)
    const isBlank = !dept || dept === 'null' || dept === 'undefined'
    return {
      ...emp,
      department: (isNumeric || isObjectId || isBlank) ? 'General Operations' : dept
    }
  })
}

const fetchGovernanceData = async () => {
  isLoading.value = true
  try {
    // Fetch policies & compliance from governance endpoints
    const [policiesRes, complianceRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/strategy/governance/policies?tenant_id=${tenantId}`),
      axios.get(`${API_BASE_URL}/strategy/governance/compliance?tenant_id=${tenantId}`)
    ])
    
    policies.value = policiesRes.data
    complianceTasks.value = complianceRes.data
    
    // Fetch employee data from the same payroll endpoint that HR Staff page uses
    try {
      const empRes = await fetch(`${API_BASE_URL}/payroll/employees?tenant_id=${tenantId}&limit=1000`)
      if (empRes.ok) {
        const rawEmployees = await empRes.json()
        // Build structure grouped by department + flat profiles
        const grouped = {}
        const allProfiles = []
        
        for (const emp of rawEmployees) {
          const deptRaw = emp.department || ''
          const deptStr = String(deptRaw).trim()
          const isNumeric = /^\d+$/.test(deptStr)
          const isObjectId = /^[a-f0-9]{24}$/i.test(deptStr)
          const isBlank = !deptStr || deptStr === 'null' || deptStr === 'undefined'
          const dept = (isNumeric || isObjectId || isBlank) ? 'General Operations' : deptStr
          
          const profile = {
            id: emp.id || emp._id,
            name: emp.name || 'Unnamed',
            designation: emp.designation || (emp.roles && emp.roles.length ? emp.roles[0] : 'Staff'),
            empNo: emp.empNo || emp.id || '',
            department: dept,
            skills: emp.skills || [],
            qualifications: emp.qualifications || [],
            email: emp.email || '',
            appointmentDate: emp.appointmentDate ? String(emp.appointmentDate).slice(0, 10) : ''
          }
          
          if (!grouped[dept]) grouped[dept] = []
          grouped[dept].push(profile)
          allProfiles.push(profile)
        }
        
        companyStructure.value = grouped
        employeeProfiles.value = allProfiles
      }
    } catch (structErr) {
      console.error('Error fetching staff structure:', structErr)
    }
  } catch (error) {
    console.error('Error fetching governance data:', error)
  } finally {
    isLoading.value = false
  }
}

const savePolicy = async (addAnother = false) => {
  try {
    if (currentPolicy.value.id) {
      await axios.put(`${API_BASE_URL}/strategy/governance/policies/${currentPolicy.value.id}`, {
        ...currentPolicy.value,
        tenant_id: tenantId
      })
    } else {
      await axios.post(`${API_BASE_URL}/strategy/governance/policies`, {
        ...currentPolicy.value,
        tenant_id: tenantId
      })
    }
    
    if (addAnother) {
      currentPolicy.value = { name: '', description: '', status: 'Active', category: 'General' }
    } else {
      showPolicyModal.value = false
      currentPolicy.value = { name: '', description: '', status: 'Active', category: 'General' }
    }
    fetchGovernanceData()
  } catch (error) {
    console.error('Error saving policy:', error)
  }
}

const saveCompliance = async (addAnother = false) => {
  try {
    if (currentCompliance.value.id) {
      await axios.put(`${API_BASE_URL}/strategy/governance/compliance/${currentCompliance.value.id}`, {
        ...currentCompliance.value,
        tenant_id: tenantId
      })
    } else {
      await axios.post(`${API_BASE_URL}/strategy/governance/compliance`, {
        ...currentCompliance.value,
        tenant_id: tenantId
      })
    }
    
    if (addAnother) {
      currentCompliance.value = { title: '', dueDate: '', priority: 'Medium', status: 'Pending', category: 'Legal' }
    } else {
      showComplianceModal.value = false
      currentCompliance.value = { title: '', dueDate: '', priority: 'Medium', status: 'Pending', category: 'Legal' }
    }
    fetchGovernanceData()
  } catch (error) {
    console.error('Error saving compliance task:', error)
  }
}

const deletePolicy = async (id) => {
  if (!confirm('Are you sure you want to delete this policy?')) return
  try {
    await axios.delete(`${API_BASE_URL}/strategy/governance/policies/${id}?tenant_id=${tenantId}`)
    fetchGovernanceData()
  } catch (error) {
    console.error('Error deleting policy:', error)
  }
}

const deleteCompliance = async (id) => {
  if (!confirm('Are you sure you want to delete this obligation?')) return
  try {
    await axios.delete(`${API_BASE_URL}/strategy/governance/compliance/${id}?tenant_id=${tenantId}`)
    fetchGovernanceData()
  } catch (error) {
    console.error('Error deleting compliance task:', error)
  }
}

const editPolicy = (policy) => {
  currentPolicy.value = { ...policy }
  showPolicyModal.value = true
}

const editCompliance = (task) => {
  currentCompliance.value = { ...task }
  showComplianceModal.value = true
}

onMounted(() => {
  fetchGovernanceData()
})
</script>

<style scoped>
/* Custom Scrollbar for better UX */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
