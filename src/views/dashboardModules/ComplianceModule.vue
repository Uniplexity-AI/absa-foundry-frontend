<template>
  <div class="min-h-screen bg-[#F5F5F5] p-4">
    <div class="max-w-7xl mx-auto">
      <div class="compliance-theme rounded-2xl shadow-lg w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 bg-white">
        <!-- Header -->
        <div class="flex items-center justify-center gap-4 accent-color mb-2 sm:mb-4">
          <i class="fas fa-shield-alt text-2xl sm:text-3xl text-blue-600"></i>
          <h2 class="text-xl sm:text-2xl font-bold text-navy-900 text-center">Compliance Center</h2>
        </div>

        <!-- Compliance Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="summary-card bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="summary-title text-blue-600 font-semibold">Active Obligations</div>
            <div class="summary-value text-2xl font-bold text-navy-900">{{ dashboardStats.activeObligations }}</div>
            <div class="summary-sub text-gray-500 text-sm">Current</div>
          </div>
          <div class="summary-card bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="summary-title text-amber-600 font-semibold">Pending Actions</div>
            <div class="summary-value text-2xl font-bold text-navy-900">{{ dashboardStats.pendingActions }}</div>
            <div class="summary-sub text-gray-500 text-sm">This Month</div>
          </div>
          <div class="summary-card bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="summary-title text-red-600 font-semibold">High Risk Items</div>
            <div class="summary-value text-2xl font-bold text-navy-900">{{ dashboardStats.highRiskItems }}</div>
            <div class="summary-sub text-gray-500 text-sm">Requires Attention</div>
          </div>
          <div class="summary-card bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div class="summary-title text-green-600 font-semibold">Compliance Score</div>
            <div class="summary-value text-2xl font-bold text-navy-900">{{ dashboardStats.complianceScore }}%</div>
            <div class="summary-sub text-gray-500 text-sm">Overall Rating</div>
          </div>
        </div>

        <!-- Sub-modules Navigation -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Regulation Watcher -->
          <div class="module-card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('regulation-watcher')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-eye text-2xl text-blue-600"></i>
              <h3 class="text-lg font-bold text-navy-900">Regulation Watcher</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">Monitor regulatory changes from Government Gazette, Ministry of Mines, ZEMA, ZRA, BOZ</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">{{ moduleStats.newRegulations }} New Updates</span>
              <i class="fas fa-arrow-right text-blue-600"></i>
            </div>
          </div>

          <!-- Obligation Tracker -->
          <div class="module-card bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('obligation-tracker')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-calendar-check text-2xl text-amber-600"></i>
              <h3 class="text-lg font-bold text-navy-900">Obligation Tracker</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">Track compliance deadlines, generate reminders, and auto-create compliance calendars</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">{{ moduleStats.upcomingDeadlines }} Due Soon</span>
              <i class="fas fa-arrow-right text-amber-600"></i>
            </div>
          </div>

          <!-- Document Intelligence -->
          <div class="module-card bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('document-intelligence')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-file-alt text-2xl text-green-600"></i>
              <h3 class="text-lg font-bold text-navy-900">Document Intelligence</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">AI analysis of licenses, permits, contracts. Track expiry dates and conditions</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-green-600 text-white px-2 py-1 rounded-full">{{ moduleStats.documentsExpiring }} Expiring</span>
              <i class="fas fa-arrow-right text-green-600"></i>
            </div>
          </div>

          <!-- Risk Scoring Engine -->
          <div class="module-card bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('risk-scoring')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
              <h3 class="text-lg font-bold text-navy-900">Risk Scoring Engine</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">AI-powered risk assessment with executive dashboards and regulatory reporting</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-red-600 text-white px-2 py-1 rounded-full">{{ moduleStats.highRiskAlerts }} High Risk</span>
              <i class="fas fa-arrow-right text-red-600"></i>
            </div>
          </div>

          <!-- AI Legal Assistant -->
          <div class="module-card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('legal-assistant')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-robot text-2xl text-purple-600"></i>
              <h3 class="text-lg font-bold text-navy-900">AI Legal Assistant</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">Natural language Q&A for compliance rules, statutes, and regulatory guidance</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">AI Powered</span>
              <i class="fas fa-arrow-right text-purple-600"></i>
            </div>
          </div>

          <!-- Audit & Reporting -->
          <div class="module-card bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="openModule('audit-reporting')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-chart-line text-2xl text-indigo-600"></i>
              <h3 class="text-lg font-bold text-navy-900">Audit & Reporting</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">Generate compliance reports for ZRA, Ministry of Mines, and investors with audit trails</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">{{ moduleStats.reportsGenerated }} Reports</span>
              <i class="fas fa-arrow-right text-indigo-600"></i>
            </div>
          </div>

          <!-- VSDC / ZRA Smart Invoice -->
          <div class="module-card bg-gradient-to-br from-[#2F2E8B]/5 to-[#2F2E8B]/10 border border-[#2F2E8B]/20 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer" @click="$router.push('/dashboard/compliance/vsdc-settings')">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-cloud-upload-alt text-2xl text-[#2F2E8B]"></i>
              <h3 class="text-lg font-bold text-navy-900">VSDC / ZRA Smart Invoice</h3>
            </div>
            <p class="text-sm text-gray-600 mb-4">Manage ZRA Smart Invoice integration — TPIN, device config, sync controls, and connection testing</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-[#2F2E8B] text-white px-2 py-1 rounded-full">{{ vsdcSyncStats.connected ? 'Connected' : 'Configure' }}</span>
              <i class="fas fa-arrow-right text-[#2F2E8B]"></i>
            </div>
          </div>
        </div>

        <!-- Recent Alerts -->
        <div class="mt-6">
          <h3 class="text-lg font-bold text-navy-900 mb-4">Recent Risk Alerts</h3>
          <div class="space-y-3">
            <div v-for="alert in recentAlerts" :key="alert.id" :class="[
              'p-4 rounded-lg border-l-4 flex items-center justify-between',
              alert.severity === 'high' ? 'bg-red-50 border-red-500' : 
              alert.severity === 'medium' ? 'bg-amber-50 border-amber-500' : 
              'bg-blue-50 border-blue-500'
            ]">
              <div class="flex items-center gap-3">
                <i :class="[
                  'fas',
                  alert.severity === 'high' ? 'fa-exclamation-circle text-red-600' :
                  alert.severity === 'medium' ? 'fa-exclamation-triangle text-amber-600' :
                  'fa-info-circle text-blue-600'
                ]"></i>
                <div>
                  <p class="font-semibold text-navy-900">{{ alert.title }}</p>
                  <p class="text-sm text-gray-600">{{ alert.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">{{ formatDate(alert.created_at) }}</span>
                <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sub-module Modals -->
    <RegulationWatcherModal 
      v-if="activeModal === 'regulation-watcher'" 
      @close="closeModal" 
    />
    <ObligationTrackerModal 
      v-if="activeModal === 'obligation-tracker'" 
      @close="closeModal" 
    />
    <DocumentIntelligenceModal 
      v-if="activeModal === 'document-intelligence'" 
      @close="closeModal" 
    />
    <RiskScoringModal 
      v-if="activeModal === 'risk-scoring'" 
      @close="closeModal" 
    />
    <LegalAssistantModal 
      v-if="activeModal === 'legal-assistant'" 
      @close="closeModal" 
    />
    <AuditReportingModal 
      v-if="activeModal === 'audit-reporting'" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { useCompliance } from './functions/useCompliance';
import RegulationWatcherModal from '@/components/compliance/RegulationWatcherModal.vue';
import ObligationTrackerModal from '@/components/compliance/ObligationTrackerModal.vue';
import DocumentIntelligenceModal from '@/components/compliance/DocumentIntelligenceModal.vue';
import RiskScoringModal from '@/components/compliance/RiskScoringModal.vue';
import LegalAssistantModal from '@/components/compliance/LegalAssistantModal.vue';
import AuditReportingModal from '@/components/compliance/AuditReportingModal.vue';

const {
  dashboardStats,
  moduleStats,
  recentAlerts,
  activeModal,
  openModule,
  closeModal,
  formatDate,
  vsdcSyncStats
} = useCompliance();
</script>

<style src="./css/ComplianceModule.css" scoped></style>