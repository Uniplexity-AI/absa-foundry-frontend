<template>
  <div class="milestones-kpis-panel bg-white rounded-lg shadow-none border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Milestones & KPIs</h2>
      <div class="flex space-x-3">
        <button
          @click="$emit('open-kpi-modal')"
          class="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Add KPI</span>
        </button>
        <button
          @click="showMilestoneModal = true"
          class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Milestone</span>
        </button>
      </div>
    </div>

    <!-- Tabs for Milestones and KPIs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'milestones'"
          :class="activeTab === 'milestones' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          Milestones ({{ milestones.length }})
        </button>
        <button
          @click="activeTab = 'kpis'"
          :class="activeTab === 'kpis' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          KPIs ({{ Object.keys(flatKPIs).length }})
        </button>
        <button
          @click="activeTab = 'alerts'"
          :class="activeTab === 'alerts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          Alerts ({{ performanceAlerts.length }})
        </button>
      </nav>
    </div>

    <!-- Milestones Tab -->
    <div v-if="activeTab === 'milestones'" class="milestones-tab">
      <!-- Milestones Filter -->
      <div class="flex items-center space-x-3 mb-6">
        <select
          v-model="milestoneFilter"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Milestones</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
          <option value="this-month">This Month</option>
        </select>
        
        <select
          v-model="milestoneTimeframe"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Timeframes</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <!-- Empty State for Milestones -->
      <div v-if="filteredMilestones.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No milestones found</h3>
        <p class="text-gray-500 mb-6">
          {{ milestoneFilter === 'all' 
            ? 'Create milestones to track important achievements and deadlines in your strategic plans.' 
            : `No milestones match the "${milestoneFilter}" filter.`
          }}
        </p>
        <button
          @click="showMilestoneModal = true"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create Your First Milestone
        </button>
      </div>

      <!-- Milestones Timeline -->
      <div v-else class="milestones-timeline">
        <div class="space-y-6">
          <div
            v-for="(milestoneGroup, monthKey) in milestonesByMonth"
            :key="monthKey"
            class="timeline-month"
          >
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatMonthLabel(monthKey) }}
            </h3>
            
            <div class="relative">
              <!-- Timeline Line -->
              <div class="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>
              
              <div class="space-y-4">
                <div
                  v-for="milestone in milestoneGroup"
                  :key="milestone.id"
                  class="milestone-item relative pl-16"
                >
                  <!-- Timeline Dot -->
                  <div 
                    class="absolute left-4 w-4 h-4 rounded-full border-2 border-white shadow"
                    :class="getMilestoneStatusColor(milestone)"
                  ></div>
                  
                  <!-- Milestone Card -->
                  <div 
                    class="milestone-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    @click="openMilestoneDetails(milestone)"
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1">
                        <h4 class="font-medium text-gray-900">{{ milestone.title }}</h4>
                        <p v-if="milestone.description" class="text-sm text-gray-600 mt-1">
                          {{ milestone.description }}
                        </p>
                      </div>
                      <div class="flex items-center space-x-2 ml-4">
                        <span 
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          :class="getMilestoneStatusClasses(milestone)"
                        >
                          {{ getMilestoneStatus(milestone) }}
                        </span>
                        <button
                          @click.stop="toggleMilestoneMenu(milestone.id)"
                          class="text-gray-400 hover:text-gray-600"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <div class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ formatMilestoneDate(milestone.targetDate) }}</span>
                      </div>
                      <div v-if="milestone.linkedGoals && milestone.linkedGoals.length > 0" class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span>{{ milestone.linkedGoals.length }} linked goal{{ milestone.linkedGoals.length !== 1 ? 's' : '' }}</span>
                      </div>
                    </div>

                    <!-- Milestone Menu Dropdown -->
                    <div 
                      v-if="activeMilestoneMenu === milestone.id"
                      class="absolute right-0 top-12 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                    >
                      <button
                        @click.stop="editMilestone(milestone)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Edit Milestone
                      </button>
                      <button
                        @click.stop="completeMilestone(milestone)"
                        v-if="!milestone.completed"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Mark as Complete
                      </button>
                      <button
                        @click.stop="duplicateMilestone(milestone)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Duplicate
                      </button>
                      <div class="border-t border-gray-100 my-1"></div>
                      <button
                        @click.stop="deleteMilestone(milestone)"
                        class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPIs Tab -->
    <div v-else-if="activeTab === 'kpis'" class="kpis-tab">
      <!-- KPI Categories -->
      <div class="flex items-center space-x-3 mb-6">
        <select
          v-model="selectedKPICategory"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="financial">Financial</option>
          <option value="operational">Operational</option>
          <option value="customer">Customer</option>
          <option value="hr">Human Resources</option>
        </select>
        
        <select
          v-model="kpiTimeframe"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Timeframes</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>

        <button
          @click="refreshKPIs"
          class="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(kpiData, kpiKey) in filteredKPIs"
          :key="kpiKey"
          class="kpi-card bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{{ kpiData.name }}</h3>
              <p class="text-sm text-gray-500 capitalize mt-1">{{ kpiData.category }}</p>
            </div>
            <div class="relative">
              <button
                @click="toggleKPIMenu(kpiKey)"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <!-- KPI Menu Dropdown -->
              <div 
                v-if="activeKPIMenu === kpiKey"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
              >
                <button
                  @click.stop="editKPI(kpiKey, kpiData)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit KPI
                </button>
                <button
                  @click.stop="updateKPIValue(kpiKey, kpiData)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Update Value
                </button>
                <button
                  @click.stop="viewKPIHistory(kpiKey, kpiData)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  View History
                </button>
                <div class="border-t border-gray-100 my-1"></div>
                <button
                  @click.stop="deleteKPI(kpiKey)"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete KPI
                </button>
              </div>
            </div>
          </div>

          <!-- KPI Value Display -->
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-900 mb-1">
              {{ formatKPIValue(kpiData) }}
            </div>
            <div class="text-sm text-gray-500">
              Target: {{ formatKPITarget(kpiData) }}
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-700">Performance</span>
              <span 
                class="text-xs font-medium"
                :class="getKPIPerformanceColor(kpiData)"
              >
                {{ getKPIPerformancePercentage(kpiData).toFixed(0) }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getKPIProgressBarColor(kpiData)"
                :style="{ width: `${Math.min(getKPIPerformancePercentage(kpiData), 100)}%` }"
              ></div>
            </div>
          </div>

          <!-- KPI Trend -->
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Trend</span>
            <span 
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="getKPITrendClasses(kpiData.trend)"
            >
              <svg 
                class="w-3 h-3 mr-1"
                :class="kpiData.trend >= 0 ? 'transform rotate-180' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {{ Math.abs(kpiData.trend || 0) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts Tab -->
    <div v-else-if="activeTab === 'alerts'" class="alerts-tab">
      <!-- Empty State for Alerts -->
      <div v-if="performanceAlerts.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">All clear!</h3>
        <p class="text-gray-500">No performance alerts at the moment. Your KPIs are tracking well.</p>
      </div>

      <!-- Alerts List -->
      <div v-else class="space-y-4">
        <div
          v-for="alert in performanceAlerts"
          :key="alert.id"
          class="alert-item p-4 rounded-lg border"
          :class="getAlertClasses(alert.type)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3 flex-1">
              <div 
                class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                :class="getAlertIconBg(alert.type)"
              >
                <svg 
                  class="w-4 h-4"
                  :class="getAlertIconColor(alert.type)"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    v-if="alert.type === 'critical'"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                  <path 
                    v-else
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ alert.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ alert.message }}</p>
                <p class="text-xs text-gray-500 mt-2">
                  {{ formatAlertTime(alert.createdAt) }}
                </p>
              </div>
            </div>
            <button
              @click="dismissAlert(alert.id)"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 ml-4"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Milestone Creation Modal -->
    <div 
      v-if="showMilestoneModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeMilestoneModal"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Milestone</h3>
          <button
            @click="closeMilestoneModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="createMilestone">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="newMilestone.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter milestone title..."
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="newMilestone.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe this milestone..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
              <input
                v-model="newMilestone.targetDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                v-model="newMilestone.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeMilestoneModal"
              class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  milestones: {
    type: Array,
    default: () => []
  },
  kpis: {
    type: Object,
    default: () => ({})
  },
  performanceAlerts: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'open-kpi-modal',
  'milestone-update',
  'milestone-delete',
  'kpi-update',
  'kpi-delete',
  'dismiss-alert',
  'refresh-kpis'
])

// Local state
const activeTab = ref('milestones')
const milestoneFilter = ref('all')
const milestoneTimeframe = ref('all')
const selectedKPICategory = ref('all')
const kpiTimeframe = ref('all')
const activeMilestoneMenu = ref(null)
const activeKPIMenu = ref(null)
const showMilestoneModal = ref(false)

// New milestone form
const newMilestone = ref({
  title: '',
  description: '',
  targetDate: '',
  priority: 'medium'
})

// Computed properties
const flatKPIs = computed(() => {
  const flat = {}
  Object.entries(props.kpis).forEach(([category, categoryKPIs]) => {
    Object.entries(categoryKPIs).forEach(([kpiName, kpiData]) => {
      flat[`${category}.${kpiName}`] = {
        ...kpiData,
        category,
        key: kpiName
      }
    })
  })
  return flat
})

const filteredMilestones = computed(() => {
  let filtered = [...props.milestones]

  // Apply status filter
  if (milestoneFilter.value !== 'all') {
    const now = new Date()
    filtered = filtered.filter(milestone => {
      const targetDate = new Date(milestone.targetDate)
      const daysDiff = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24))

      switch (milestoneFilter.value) {
        case 'upcoming':
          return !milestone.completed && daysDiff >= 0
        case 'completed':
          return milestone.completed
        case 'overdue':
          return !milestone.completed && daysDiff < 0
        case 'this-month':
          return targetDate.getMonth() === now.getMonth() && targetDate.getFullYear() === now.getFullYear()
        default:
          return true
      }
    })
  }

  // Apply timeframe filter
  if (milestoneTimeframe.value !== 'all') {
    filtered = filtered.filter(milestone => milestone.timeframe === milestoneTimeframe.value)
  }

  return filtered.sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
})

const filteredKPIs = computed(() => {
  let filtered = { ...flatKPIs.value }

  // Apply category filter
  if (selectedKPICategory.value !== 'all') {
    filtered = Object.fromEntries(
      Object.entries(filtered).filter(([key, kpi]) => kpi.category === selectedKPICategory.value)
    )
  }

  // Apply timeframe filter
  if (kpiTimeframe.value !== 'all') {
    filtered = Object.fromEntries(
      Object.entries(filtered).filter(([key, kpi]) => kpi.timeframe === kpiTimeframe.value)
    )
  }

  return filtered
})

const milestonesByMonth = computed(() => {
  const byMonth = {}
  
  filteredMilestones.value.forEach(milestone => {
    const date = new Date(milestone.targetDate)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!byMonth[monthKey]) {
      byMonth[monthKey] = []
    }
    byMonth[monthKey].push(milestone)
  })
  
  // Sort months
  const sortedMonths = Object.keys(byMonth).sort()
  const result = {}
  sortedMonths.forEach(month => {
    result[month] = byMonth[month].sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
  })
  
  return result
})

// Methods
const getMilestoneStatus = (milestone) => {
  if (milestone.completed) return 'Completed'
  
  const now = new Date()
  const targetDate = new Date(milestone.targetDate)
  const daysDiff = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24))
  
  if (daysDiff < 0) return 'Overdue'
  if (daysDiff <= 7) return 'Due Soon'
  return 'Upcoming'
}

const getMilestoneStatusClasses = (milestone) => {
  const status = getMilestoneStatus(milestone)
  
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Overdue':
      return 'bg-red-100 text-red-800'
    case 'Due Soon':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

const getMilestoneStatusColor = (milestone) => {
  const status = getMilestoneStatus(milestone)
  
  switch (status) {
    case 'Completed':
      return 'bg-green-500'
    case 'Overdue':
      return 'bg-red-500'
    case 'Due Soon':
      return 'bg-yellow-500'
    default:
      return 'bg-blue-500'
  }
}

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const formatMilestoneDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const formatAlertTime = (dateString) => {
  if (!dateString) return 'Just now'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatKPIValue = (kpiData) => {
  if (kpiData.unit === 'currency') {
    return formatCurrency(kpiData.currentValue)
  } else if (kpiData.unit === 'percentage') {
    return `${(kpiData.currentValue || 0).toFixed(1)}%`
  } else if (kpiData.unit === 'count') {
    return formatNumber(kpiData.currentValue)
  } else if (kpiData.unit === 'ratio') {
    return `${(kpiData.currentValue || 0).toFixed(2)}x`
  }
  return formatNumber(kpiData.currentValue)
}

const formatKPITarget = (kpiData) => {
  if (kpiData.unit === 'currency') {
    return formatCurrency(kpiData.targetValue)
  } else if (kpiData.unit === 'percentage') {
    return `${(kpiData.targetValue || 0).toFixed(1)}%`
  } else if (kpiData.unit === 'count') {
    return formatNumber(kpiData.targetValue)
  } else if (kpiData.unit === 'ratio') {
    return `${(kpiData.targetValue || 0).toFixed(2)}x`
  }
  return formatNumber(kpiData.targetValue)
}

const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const formatCurrency = (num) => {
  if (num === null || num === undefined) return 'K 0.00'
  const number = Number(num)
  if (isNaN(number)) return 'K 0.00'
  return `K ${number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

const getKPIPerformancePercentage = (kpiData) => {
  if (!kpiData.targetValue || kpiData.targetValue === 0) return 0
  return (kpiData.currentValue / kpiData.targetValue) * 100
}

const getKPIPerformanceColor = (kpiData) => {
  const percentage = getKPIPerformancePercentage(kpiData)
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

const getKPIProgressBarColor = (kpiData) => {
  const percentage = getKPIPerformancePercentage(kpiData)
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getKPITrendClasses = (trend) => {
  if (trend > 0) {
    return 'bg-green-100 text-green-800'
  } else if (trend < 0) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-gray-100 text-gray-800'
}

const getAlertClasses = (type) => {
  switch (type) {
    case 'critical':
      return 'bg-red-50 border-red-200'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200'
    case 'info':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

const getAlertIconBg = (type) => {
  switch (type) {
    case 'critical':
      return 'bg-red-100'
    case 'warning':
      return 'bg-yellow-100'
    case 'info':
      return 'bg-blue-100'
    default:
      return 'bg-gray-100'
  }
}

const getAlertIconColor = (type) => {
  switch (type) {
    case 'critical':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
}

const toggleMilestoneMenu = (milestoneId) => {
  activeMilestoneMenu.value = activeMilestoneMenu.value === milestoneId ? null : milestoneId
}

const toggleKPIMenu = (kpiKey) => {
  activeKPIMenu.value = activeKPIMenu.value === kpiKey ? null : kpiKey
}

const closeAllMenus = () => {
  activeMilestoneMenu.value = null
  activeKPIMenu.value = null
}

const openMilestoneDetails = (milestone) => {
  console.log('Open milestone details:', milestone)
}

const editMilestone = (milestone) => {
  console.log('Edit milestone:', milestone)
  closeAllMenus()
}

const completeMilestone = (milestone) => {
  emit('milestone-update', {
    ...milestone,
    completed: true,
    completedDate: new Date().toISOString()
  })
  closeAllMenus()
}

const duplicateMilestone = (milestone) => {
  const duplicated = {
    ...milestone,
    id: `milestone_${Date.now()}`,
    title: `${milestone.title} (Copy)`,
    completed: false,
    createdAt: new Date().toISOString()
  }
  emit('milestone-update', duplicated)
  closeAllMenus()
}

const deleteMilestone = (milestone) => {
  if (confirm(`Are you sure you want to delete the milestone "${milestone.title}"?`)) {
    emit('milestone-delete', milestone.id)
  }
  closeAllMenus()
}

const editKPI = (kpiKey, kpiData) => {
  console.log('Edit KPI:', kpiKey, kpiData)
  closeAllMenus()
}

const updateKPIValue = (kpiKey, kpiData) => {
  const newValue = prompt(`Enter new value for ${kpiData.name}:`, kpiData.currentValue)
  if (newValue !== null && !isNaN(Number(newValue))) {
    emit('kpi-update', kpiKey, Number(newValue))
  }
  closeAllMenus()
}

const viewKPIHistory = (kpiKey, kpiData) => {
  console.log('View KPI history:', kpiKey, kpiData)
  closeAllMenus()
}

const deleteKPI = (kpiKey) => {
  if (confirm('Are you sure you want to delete this KPI?')) {
    emit('kpi-delete', kpiKey)
  }
  closeAllMenus()
}

const dismissAlert = (alertId) => {
  emit('dismiss-alert', alertId)
}

const refreshKPIs = () => {
  emit('refresh-kpis')
}

const closeMilestoneModal = () => {
  showMilestoneModal.value = false
  newMilestone.value = {
    title: '',
    description: '',
    targetDate: '',
    priority: 'medium'
  }
}

const createMilestone = () => {
  const milestone = {
    id: `milestone_${Date.now()}`,
    ...newMilestone.value,
    completed: false,
    createdAt: new Date().toISOString()
  }
  
  emit('milestone-update', milestone)
  closeMilestoneModal()
}

// Event listeners
onMounted(() => {
  document.addEventListener('click', closeAllMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', closeAllMenus)
})
</script>

<style scoped>
.milestone-card:hover,
.kpi-card:hover,
.alert-item:hover {
  transform: translateY(-1px);
}

.milestone-card,
.kpi-card,
.alert-item {
  transition: all 0.2s ease;
}
</style>
