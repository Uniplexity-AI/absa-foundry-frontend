import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount, onErrorCaptured } from 'vue';
import { useCurrency } from '@/composables/useCurrency';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import * as crmApi from '@/api_services/crm_api.js';
import * as emailApi from '@/api_services/crm_email_api.js';
import { useCRMQuickAccessStore } from '@/stores/useCRMQuickAccessStore';
import { useNavigationStore } from '@/stores/useNavigationStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { usePreferences } from '@/config/usePreferences';
import { XLSXCompat as XLSX } from '@/utils/excel.js';
import _ from 'lodash';
import { on as onCrmEvent, emit as emitCrmEvent } from '@/events/crmEvents.js';
import * as meetingsApi from '@/api_services/crm_meetings_api.js';
import { getUserPerformance as apiGetUserPerformance } from '@/api_services/crm_performance_api.js';
import { useAudit } from '@/config/useAudit.js';
import { useRBAC } from '@/composables/useRBAC';
import * as documentsApi from '@/api_services/documents_api';

// ── Singleton state (shared across all useCRMModule() callers) ──
const showMeetingModal = ref(false);
const meetings = ref([]);
const meetingView = ref('list');
const meetingFilter = ref('all');
const meetingStats = ref({ scheduled: 0, today: 0, completedThisWeek: 0, totalMeetings: 0, upcoming: [] });
const editingMeeting = ref(null);
const savingMeeting = ref(false);
const meetingForm = ref({ title: '', meeting_type: 'call', description: '', start_datetime: '', end_datetime: '', location_type: 'virtual', location: '', virtual_meeting_url: '', participants: [], linkedRecordType: '', linkedRecordId: '', reminder15min: false, reminder1hour: false, reminder1day: false, lat: null, lng: null, distance_km: null });
const newParticipant = ref({ name: '', email: '', type: 'contact' });
const currentCalendarDate = ref(new Date());
// ── Shared CRM data (promoted so meeting modal and all other instances see loaded data) ──
const leads = ref([]);
const pipelineLeads = ref([]);
const pipelineContacts = ref([]);
const pipelineAccounts = ref([]);
const pipelineDeals = ref([]);

export function useCRMModule() {
  const { formatCurrency } = useCurrency();
  const { getUserName, getUserRole, getUserEmail, getSelectedBranch, getBranches, setSelectedBranch, getTenantId } = decodeJWT();
  const { logAudit } = useAudit();
  const { canAssign, initializeRBAC } = useRBAC();
  const canAssignCrm = computed(() => canAssign('crm'));

  // Branch Management
  const branches = ref(getBranches() || []);
  const rawBranch = getSelectedBranch();
  const initialBranchVal = (rawBranch && typeof rawBranch === 'object') ? (rawBranch._id || rawBranch.id) : (rawBranch || '');
  const selectedBranch = ref(initialBranchVal);

  const safeBranchId = computed(() => {
    const val = selectedBranch.value;
    if (!val || val === 'undefined') return undefined;
    if (typeof val === 'object') return val._id || val.id;
    return val;
  });

  async function onBranchChange() {
    setSelectedBranch(selectedBranch.value);
    emitCrmEvent('crm:leads:changed');
    await fetchPipelineData();
    await fetchStats();
    await fetchTeamPerformance();
    if (activeTab.value === 'visits') await loadVisits();
    if (activeTab.value === 'meetings') await loadMeetings();
  }

  const currentUserEmail = ref('');
  const currentUserRole = ref('');
  const crmEventUnsubs = ref([]);

  const stats = ref({
    leads: { total: 0, newThisMonth: 0, byStage: {} },
    contacts: { total: 0 },
    accounts: { total: 0 },
    deals: { total: 0, open: 0, pipelineValue: 0, weightedPipelineValue: 0, won: 0, conversionRate: 0 },
    pipeline: {}
  });
  const performanceList = ref([]);

  async function fetchStats() {
    const tenantId = getTenantId();
    if (!tenantId) return;
    try {
      const res = await crmApi.getStats(tenantId, { branch_id: safeBranchId.value });
      if (res) stats.value = res;
    } catch (err) {
      console.error('Failed to fetch CRM stats:', err);
    }
  }

  async function fetchTeamPerformance() {
    const tenantId = getTenantId();
    if (!tenantId) return;
    try {
      const res = await crmApi.getTeamPerformance(tenantId, { branch_id: safeBranchId.value });
      if (res) performanceList.value = res;
    } catch (err) {
      console.error('Failed to fetch team performance:', err);
    }
  }

  const crmQuickAccessStore = useCRMQuickAccessStore();
  const navigationStore = useNavigationStore();

  function getInitials(nameOrEmail) {
    if (!nameOrEmail) return '';
    if (nameOrEmail.includes('@')) return nameOrEmail.substring(0, 2).toUpperCase();
    const parts = nameOrEmail.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return nameOrEmail.substring(0, 2).toUpperCase();
  }

  function getSourceIcon(source) {
    if (!source) return 'fas fa-question-circle';
    const s = source.toLowerCase();
    if (s.includes('web')) return 'fas fa-globe';
    if (s.includes('phone') || s.includes('call')) return 'fas fa-phone';
    if (s.includes('email')) return 'fas fa-envelope';
    if (s.includes('chat') || s.includes('whatsapp')) return 'fab fa-whatsapp';
    if (s.includes('referral')) return 'fas fa-user-friends';
    if (s.includes('social')) return 'fas fa-share-alt';
    if (s.includes('ad') || s.includes('campaign')) return 'fas fa-ad';
    return 'fas fa-tag';
  }

  const isOwner = computed(() => currentUserRole.value === 'owner' || currentUserRole.value === 'admin');

  const activeTab = ref('home');
  const pipelineMobileView = ref(false);
  const pipelineSearchQuery = ref('');
  const pipelineAssignedFilter = ref('');
  const accountConversionStages = ref(['closed-won']);
  const showFilters = ref(false);

  const toast = ref({
    show: false,
    type: 'success',
    title: '',
    message: '',
    timeout: null
  });

  function showToast(type, title, message, duration = 3000) {
    if (toast.value.timeout) clearTimeout(toast.value.timeout);
    toast.value = { show: true, type, title, message, timeout: null };
    toast.value.timeout = setTimeout(() => { hideToast(); }, duration);
  }

  function hideToast() {
    if (toast.value.timeout) clearTimeout(toast.value.timeout);
    toast.value.show = false;
  }

  const modulesList = ref([
    { id: 'home', name: 'Home', icon: 'fas fa-home' },
    { id: 'sales', name: 'Sales', icon: 'fas fa-dollar-sign' },
    { id: 'pipeline', name: 'Pipeline', icon: 'fas fa-tasks' },
    { id: 'leads', name: 'Leads', icon: 'fas fa-user-plus' },
    { id: 'contacts', name: 'Contacts', icon: 'fas fa-address-book' },
    { id: 'accounts', name: 'Accounts', icon: 'fas fa-building' },
    { id: 'deals', name: 'Deals', icon: 'fas fa-handshake' },
    { id: 'documents', name: 'Documents', icon: 'fas fa-file' },
    { id: 'campaigns', name: 'Campaigns', icon: 'fas fa-bullhorn' },
    { id: 'activities', name: 'Activities', icon: 'fas fa-list' },
    { id: 'meetings', name: 'Meetings', icon: 'fas fa-calendar-alt' },
    { id: 'calls', name: 'Calls', icon: 'fas fa-phone' },
    { id: 'emails', name: 'Emails', icon: 'fas fa-envelope' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fab fa-whatsapp' },
    { id: 'integrations', name: 'Integrations', icon: 'fas fa-plug' },
    { id: 'acquisition', name: 'Acquisition', icon: 'fas fa-funnel-dollar' },
    { id: 'social', name: 'Social', icon: 'fas fa-hashtag' },
    { id: 'visits', name: 'Visits', icon: 'fas fa-map-marker-alt' },
    { id: 'messages', name: 'Messages', icon: 'fas fa-comments' },
    { id: 'projects', name: 'Projects', icon: 'fas fa-project-diagram' }
  ]);

  function getModuleInfo(id) {
    const found = modulesList.value.find(m => m.id === id);
    if (found) return { name: found.name, icon: found.icon };
    const pretty = (id || '').toString().replace(/[-_]/g, ' ');
    return { name: pretty.charAt(0).toUpperCase() + pretty.slice(1), icon: 'fas fa-circle' };
  }

  let leadMap = null;
  let leadMarker = null;
  const { preferences: brandPrefs } = usePreferences();

  function createLogoIcon() {
    const logo = brandPrefs.companyLogo;
    if (logo) {
      return L.divIcon({
        className: 'crm-logo-marker',
        html: `<div style="width:40px;height:40px;border-radius:50%;border:3px solid #2F2E8B;background:#fff;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><img src=\"${logo}\" style=\"width:100%;height:100%;object-fit:cover;border-radius:50%;\" onerror=\"this.style.display='none'\"/></div><div style=\"width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid #2F2E8B;margin:-2px auto 0;\"></div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52]
      });
    }
    return null;
  }

  const participantSearch = ref('');
  const participantSearchResults = ref([]);
  const showManualParticipant = ref(false);

  const showContactModal = ref(false);
  const showAccountModal = ref(false);
  const showDealModal = ref(false);
  const selectedContact = ref(null);
  const selectedAccount = ref(null);
  const selectedDeal = ref(null);

  function recordQuickAccessClick(moduleId) {
    crmQuickAccessStore.recordQuickAccessClick(moduleId);
    crmQuickAccessStore.setActiveQuickAccessModule(moduleId);
    goToModule(moduleId);
  }

  const searchParticipants = _.debounce(async () => {
    if (!participantSearch.value || participantSearch.value.length < 2) {
      participantSearchResults.value = [];
      return;
    }
    try {
      const query = participantSearch.value.toLowerCase();
      const matches = [
        ...contacts.value.filter(c => (c.name?.toLowerCase().includes(query) || c.email?.toLowerCase().includes(query))),
        ...leads.value.filter(l => (l.name?.toLowerCase().includes(query) || l.email?.toLowerCase().includes(query)))
      ].slice(0, 10);
      const unique = [];
      const seen = new Set();
      for (const m of matches) {
        if (m.email && !seen.has(m.email)) {
          seen.add(m.email);
          unique.push(m);
        }
      }
      participantSearchResults.value = unique;
    } catch (err) {
      console.error('Search participants error', err);
    }
  }, 300);

  function addParticipantResult(p) {
    if (!meetingForm.value.participants.find(existing => existing.email === p.email)) {
      meetingForm.value.participants.push({ name: p.name, email: p.email, id: p.id });
    }
    participantSearch.value = '';
    participantSearchResults.value = [];
  }

  function addParticipantManual() {
    if (newParticipant.value.email) {
      meetingForm.value.participants.push({ ...newParticipant.value });
      newParticipant.value = { name: '', email: '' };
      showManualParticipant.value = false;
    }
  }

  function goBackToPrevious() {
    const previousBreadcrumb = navigationStore.goBack();
    if (previousBreadcrumb) {
      activeTab.value = previousBreadcrumb.moduleId;
      moduleLoading.value = false;
    }
  }

  async function goToModule(moduleId) {
    try { crmQuickAccessStore.setActiveQuickAccessModule(moduleId); } catch { }
    if (moduleId === 'subaccounts' && !isOwner.value) {
      showToast('warning', 'Access denied', 'Only tenant owners/admins can manage sub-accounts.');
      return;
    }
    const moduleInfo = modulesList.value.find(m => m.id === moduleId);
    if (moduleInfo) navigationStore.pushBreadcrumb(moduleId, moduleInfo.name, moduleInfo.icon);
    activeTab.value = moduleId;
    moduleLoading.value = true;
    try {
      if (moduleId === 'leads') { await loadLeads(); }
      else if (moduleId === 'pipeline' || moduleId === 'contacts' || moduleId === 'accounts' || moduleId === 'deals') { await fetchPipelineData(); }
      else if (moduleId === 'calls') {
        const tenantId = getTenantId();
        const calls = await crmApi.getCommunications(tenantId, { type: 'call' });
        communications.value = Array.isArray(calls) ? calls : communications.value;
        communicationFilter.value = 'call';
      } else if (moduleId === 'whatsapp') {
        const tenantId = getTenantId();
        communicationFilter.value = 'whatsapp';
        const params = { type: 'whatsapp' };
        if (whatsappSubtypeFilter.value) params.subtype = whatsappSubtypeFilter.value;
        const list = await crmApi.getCommunications(tenantId, params);
        communications.value = Array.isArray(list) ? list : communications.value;
      } else if (moduleId === 'visits') { await loadVisits(); }
      else if (moduleId === 'emails') { await loadEmails(); await loadEmailStats(); }
      else if (moduleId === 'meetings') { await loadMeetings(); await loadMeetingStats(); }
    } catch (err) {
      console.error(`[Quick Access] Failed to preload module ${moduleId}:`, err);
    } finally {
      moduleLoading.value = false;
    }
    await nextTick();
    await nextTick();
    const target = document.getElementById(`module-${moduleId}`);
    if (target) {
      try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch { }
    }
  }

  const contactActivities = ref([]);
  const accountActivities = ref([]);
  const dealActivities = ref([]);
  const leadActivities = ref([]);
  const leadNotes = ref([]);
  const leadEmails = ref([]);
  const leadNotifications = ref([]);
  const leadAttachments = ref([]);
  const leadCampaigns = ref([]);

  const showCallOutcomeModal = ref(false);
  const callOutcome = ref('connected');
  const callSummary = ref('');
  let callTimerInterval = null;
  const callTimerSeconds = ref(0);
  let callContext = { related_type: null, related_id: null };

  function startCallTimer(context) {
    callContext = context || { related_type: null, related_id: null };
    callTimerSeconds.value = 0;
    showCallOutcomeModal.value = true;
    if (callTimerInterval) clearInterval(callTimerInterval);
    callTimerInterval = setInterval(() => { callTimerSeconds.value += 1; }, 1000);
  }

  function stopCallTimer() { if (callTimerInterval) clearInterval(callTimerInterval); callTimerInterval = null; }
  function cancelCallOutcome() { stopCallTimer(); showCallOutcomeModal.value = false; callSummary.value = ''; }
  function formatDuration(sec) {
    const s = Number(sec) || 0;
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  async function saveCallOutcome() {
    try {
      const tenantId = getTenantId();
      if (!tenantId) {
        console.warn('[saveCallOutcome] No tenant ID available, cannot save');
        showToast('error', 'Save Failed', 'Unable to identify your account. Please refresh and try again.');
        return;
      }
      const list = await crmApi.getCommunications(tenantId, { type: 'call', related_type: callContext.related_type, related_id: callContext.related_id });
      const latest = Array.isArray(list) && list.length ? list[0] : null;
      if (latest && latest.id) {
        await crmApi.patchCommunication(latest.id, tenantId, { outcome: callOutcome.value, duration: callTimerSeconds.value, status: 'completed', message: callSummary.value || undefined });
        if ((callSummary.value || '').trim()) {
          try { await crmApi.addCommunicationNote(latest.id, tenantId, callSummary.value.trim()); } catch { }
        }
        communications.value = await crmApi.getCommunications(tenantId);
        // Reload lead activities so the saved call appears in the Activity tab
        if (callContext.related_type === 'lead' && callContext.related_id) {
          try {
            await crmApi.logLeadActivity(callContext.related_id, {
              tenant_id: tenantId,
              action: 'Phone Call',
              notes: `Call ${callOutcome.value} (${formatDuration(callTimerSeconds.value)}) — ${callSummary.value ? callSummary.value.substring(0, 300) : 'No notes'}`,
              timestamp: new Date().toISOString()
            });
            leadActivities.value = (await crmApi.getLeadActivities(callContext.related_id, tenantId)) || [];
          } catch {}
        }
      } else {
        console.warn('[saveCallOutcome] No communication found to update for', callContext);
        showToast('error', 'Save Failed', 'Call log not found. The call may not have been initiated properly.');
        return;
      }
    } catch (e) {
      console.warn('[saveCallOutcome] Failed to save call outcome', e);
      showToast('error', 'Failed to Save', e.message || 'Could not save call log');
    }
    finally { stopCallTimer(); showCallOutcomeModal.value = false; callSummary.value = ''; }
  }

  async function viewContact(contact) {
    selectedContact.value = contact;
    showContactModal.value = true;
    const tenantId = getTenantId();
    try { contactActivities.value = await crmApi.getActivities(tenantId, { related_type: 'contact', related_id: contact.id }); }
    catch (e) { contactActivities.value = []; }
  }

  async function viewAccount(account) {
    selectedAccount.value = account;
    showAccountModal.value = true;
    const tenantId = getTenantId();
    try { accountActivities.value = await crmApi.getActivities(tenantId, { related_type: 'account', related_id: account.id }); }
    catch (e) { accountActivities.value = []; }
  }

  async function viewDeal(deal) {
    selectedDeal.value = deal;
    showDealModal.value = true;
    const tenantId = getTenantId();
    try { dealActivities.value = await crmApi.getActivities(tenantId, { related_type: 'deal', related_id: deal.id }); }
    catch (e) { dealActivities.value = []; }
  }

  const locationSearchQuery = ref('');
  const locationSearchResults = ref([]);
  const isSearchingLocation = ref(false);
  const forwardGeoCache = new Map();
  let forwardSearchTimer = null;
  const reverseGeoCache = new Map();

  const leadDetailTab = ref('overview');
  const activeRelatedList = ref('notes');

  const currentModuleMetadata = ref(null);
  const currentModuleRecords = ref([]);
  const moduleLoading = ref(false);

  async function loadModule(moduleId) {
    const tenantId = getTenantId();
    moduleLoading.value = true;
    try {
      currentModuleMetadata.value = (await crmApi.getModuleMetadata(tenantId)) || null;
      let moduleMeta = null;
      if (Array.isArray(currentModuleMetadata.value)) {
        moduleMeta = currentModuleMetadata.value.find(x => x.id === moduleId) || null;
      } else if (currentModuleMetadata.value && currentModuleMetadata.value[moduleId]) {
        moduleMeta = currentModuleMetadata.value[moduleId];
      }
      if (moduleMeta) {
        currentModuleMetadata.value = moduleMeta;
        const recs = await crmApi.getModuleRecords(moduleId, tenantId, { limit: perPage.value, skip: (page.value - 1) * perPage.value, branch_id: safeBranchId.value });
        currentModuleRecords.value = Array.isArray(recs) ? recs : (recs?.items || recs?.records || []);
      } else {
        currentModuleMetadata.value = null;
        currentModuleRecords.value = [];
      }
    } catch (err) {
      console.warn('Failed to load module metadata/records', err);
      currentModuleMetadata.value = null;
      currentModuleRecords.value = [];
    } finally {
      moduleLoading.value = false;
    }
  }

  const showLeadModal = ref(false);
  const showCommunicationModal = ref(false);
  const showDetailModal = ref(false);
  const showConversionModal = ref(false);
  const showBulkUploadModal = ref(false);
  const selectedLeadForConversion = ref(null);
  const isSubmitting = ref(false);
  const isSending = ref(false);
  const leadModalTitle = ref('Add Lead');

  const showContactFormModal = ref(false);
  const showAccountFormModal = ref(false);
  const showDealFormModal = ref(false);
  const editingContact = ref(null);
  const editingAccount = ref(null);
  const editingDeal = ref(null);

  const showDocumentUploadModal = ref(false);
  const documentUploadLinkedEntity = ref(null);

  const showImportModal = ref(false);
  const importStep = ref(1);
  const selectedFile = ref(null);
  const fileInput = ref(null);
  const isProcessing = ref(false);
  const isImporting = ref(false);
  const validRecords = ref([]);
  const invalidRecords = ref([]);
  const importResults = ref({ success: 0, failed: 0, errors: [] });

  const leadForm = ref({
    name: '', email: '', phone: '', company: '', position: '', priority: '', stage: 'new', value: 0, source: '', assignedTo: '', notes: '', city: '', country: '', address: '', areaName: '', website: '', linkedin: '', twitter: '', facebook: '', instagram: '', tpin: '', created_at: null
  });
  const leadOriginalSnapshot = ref({});

  const communicationForm = ref({ contactId: '', type: 'email', subject: '', message: '' });

  function onSendCommunication(formData) {
    communicationForm.value = { ...communicationForm.value, ...(formData || {}) };
    sendCommunication();
  }

  const customerFilter = ref('');
  const communicationFilter = ref('');
  const whatsappSubtypeFilter = ref('');
  const selectedLead = ref(null);

  // Leads state
  const totalLeads = ref(0);
  const selectedLeads = ref([]);
  const sortField = ref('name');
  const sortDirection = ref('asc');
  const leadQuickFilter = ref('');
  const touchFilter = ref('');
  const stageFilter = ref('');
  const sourceFilter = ref('');
  const showAdvancedFilters = ref(false);
  const advancedFilters = ref({
    city: '',
    area: '',
    country: '',
    industry: '',
    status: '',
    min_revenue: '',
    max_revenue: ''
  });

  const priorityOptions = [
    { value: '', label: 'All Priorities', icon: null },
    { value: 'hot', label: 'Hot', icon: 'Flame', color: 'text-red-500' },
    { value: 'warm', label: 'Warm', icon: 'Sun', color: 'text-orange-500' },
    { value: 'cold', label: 'Cold', icon: 'Snowflake', color: 'text-blue-500' }
  ];

  const perPage = ref(10000);
  const page = ref(1);
  const pipelineStages = [
    { id: 'new', name: 'New', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-blue-200', textClass: 'text-blue-800', dotClass: 'bg-blue-500', description: 'New leads', order: 1000 },
    { id: 'contacted', name: 'Contacted', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-indigo-200', textClass: 'text-indigo-800', dotClass: 'bg-indigo-500', description: 'Leads that have been contacted', order: 2000 },
    { id: 'qualified', name: 'Qualified', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-purple-200', textClass: 'text-purple-800', dotClass: 'bg-purple-500', description: 'Qualified leads', order: 2500 },
    { id: 'proposal', name: 'Proposal Sent', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-yellow-200', textClass: 'text-yellow-800', dotClass: 'bg-yellow-500', description: 'Proposals sent', order: 3000 },
    { id: 'negotiation', name: 'Negotiation', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-orange-200', textClass: 'text-orange-800', dotClass: 'bg-orange-500', description: 'In negotiation', order: 4000 },
    { id: 'closed-won', name: 'Closed Won', entity: 'accounts', bgClass: 'bg-white', borderClass: 'border-green-200', textClass: 'text-green-800', dotClass: 'bg-green-500', description: 'Deals won (converted to accounts)', order: 5000 },
    { id: 'closed-lost', name: 'Closed Lost', entity: 'leads', bgClass: 'bg-white', borderClass: 'border-red-200', textClass: 'text-red-800', dotClass: 'bg-red-500', description: 'Deals lost', order: 6000 }
  ];

  const customPipelineStages = ref([]);
  const deletedDefaultStageIds = ref([]); // default stages the user has chosen to delete
  async function fetchMetadata() {
    const tenantId = getTenantId();
    try {
      const meta = await crmApi.getCRMMetadata(tenantId);
      if (meta && meta.pipeline_stages) customPipelineStages.value = meta.pipeline_stages;
      if (meta && meta.deleted_default_stages) deletedDefaultStageIds.value = meta.deleted_default_stages;
    } catch (err) { console.error('Failed to load CRM metadata:', err); }
  }

  const allPipelineStages = computed(() => {
    const customIds = new Set(customPipelineStages.value.map(s => s.id));
    const defaults = pipelineStages.filter(s => !deletedDefaultStageIds.value.includes(s.id) && !customIds.has(s.id));
    return [...defaults, ...customPipelineStages.value].sort((a, b) => a.order - b.order);
  });

  // Visible stages (filtered by hidden set)
  const hiddenStageIds = ref([]);
  const showStageAmounts = ref(true);
  const visiblePipelineStages = computed(() => allPipelineStages.value.filter(s => !hiddenStageIds.value.includes(s.id)));

  const showAddStageModal = ref(false);
  const newStageForm = ref({ name: '', entity: 'leads', insertAfter: 'end' });

  const stageColorPalette = [
    { bgClass: 'bg-white', borderClass: 'border-purple-200', textClass: 'text-purple-800', dotClass: 'bg-purple-500' },
    { bgClass: 'bg-white', borderClass: 'border-pink-200', textClass: 'text-pink-800', dotClass: 'bg-pink-500' },
    { bgClass: 'bg-white', borderClass: 'border-teal-200', textClass: 'text-teal-800', dotClass: 'bg-teal-500' },
    { bgClass: 'bg-white', borderClass: 'border-cyan-200', textClass: 'text-cyan-800', dotClass: 'bg-cyan-500' },
    { bgClass: 'bg-white', borderClass: 'border-lime-200', textClass: 'text-lime-800', dotClass: 'bg-lime-500' },
    { bgClass: 'bg-white', borderClass: 'border-amber-200', textClass: 'text-amber-800', dotClass: 'bg-amber-500' }
  ];

  const draggingLead = ref(null);
  const dragOverStage = ref(null);
  
  // Enhanced drag state management
  const dragState = ref({
    status: 'idle', // 'idle' | 'dragging' | 'updating' | 'success' | 'error'
    record: null, // The record being dragged
    originalStage: null, // Original stage for rollback
    targetStage: null, // Target stage for drop
    error: null // Error message if any
  });

  // Pipeline confirmation dialog (replaces native confirm/alert)
  const pipelineConfirm = ref({
    show: false, title: '', message: '', type: 'info', showCancel: false, onConfirm: null, onCancel: null
  });

  function showPipelineConfirm(title, message, type = 'info', showCancel = false) {
    return new Promise((resolve) => {
      pipelineConfirm.value = {
        show: true, title, message, type, showCancel,
        onConfirm: () => { pipelineConfirm.value = { ...pipelineConfirm.value, show: false }; resolve(true); },
        onCancel: () => { pipelineConfirm.value = { ...pipelineConfirm.value, show: false }; resolve(false); }
      };
    });
  }

  function showPipelineAlert(title, message, type = 'info') {
    return showPipelineConfirm(title, message, type, false);
  }

  const selectedRecords = ref([]);
  const selectAll = ref(false);
  const viewMode = ref('table');

  const priorityDropdownOpen = ref(false);

  const tenantUsers = ref([]);
  const userSearchQuery = ref('');
  const showAssignDropdown = ref(false);
  const assignDropdownRef = ref(null);
  const assignToSearch = ref('');
  const showAssignToDropdown = ref(false);
  // leads, pipelineLeads, pipelineContacts, pipelineAccounts, pipelineDeals are module-level singletons
  const customers = ref([]);
  const communications = ref([]);

  const showEmailModal = ref(false);
  const emailListFilter = ref('inbox');
  const emails = ref([]);
  const emailStats = ref({ sentToday: 0, openRate: 0, clickRate: 0, scheduled: 0 });
  const emailForm = ref({ from: '', recipients: [], cc: '', bcc: '', subject: '', body: '', attachments: [], linkedRecord: null, usePersonalEmail: false, scheduledTime: null });
  const recipientSearch = ref('');
  const showRecipientDropdown = ref(false);
  const filteredRecipients = ref([]);
  const showCc = ref(false);
  const showBcc = ref(false);
  const showLinkRecord = ref(false);
  const linkRecordType = ref('');
  const showTemplates = ref(false);
  const emailTemplates = ref([
    { id: 1, name: 'Introduction', description: 'Introduce your company to new leads', body: `Hi \${Lead.FirstName},\n\nThank you for your interest in our services. We'd love to help you achieve your goals.\n\nBest regards,\n\${User.Name}` },
    { id: 2, name: 'Follow-up', description: 'Follow up on previous conversation', body: `Hi \${Lead.FirstName},\n\nI wanted to follow up on our previous conversation about \${Product.Name}. Do you have any questions?\n\nLooking forward to hearing from you.\n\nBest regards,\n\${User.Name}` },
    { id: 3, name: 'Quotation', description: 'Send a quote to prospects', body: `Hi \${Lead.FirstName},\n\nThank you for requesting a quote. Please find attached our proposal for \${Product.Name}.\n\nThe total cost is \${Quote.Amount}. This offer is valid for 30 days.\n\nPlease let me know if you have any questions.\n\nBest regards,\n\${User.Name}` },
    { id: 4, name: 'Meeting Request', description: 'Request a meeting with client', body: `Hi \${Lead.FirstName},\n\nI'd like to schedule a meeting to discuss how we can help with \${Topic}.\n\nAre you available this week for a 30-minute call?\n\nBest regards,\n\${User.Name}` }
  ]);

  const filteredLeadsCount = ref(0);

  // Meeting refs are declared at module level (singleton) above useCRMModule()

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  async function searchLocation() {
    if (!locationSearchQuery.value.trim()) { alert('Please enter a location to search'); return; }
    const raw = locationSearchQuery.value.trim();
    const norm = raw.toLowerCase();
    if (forwardSearchTimer) clearTimeout(forwardSearchTimer);
    forwardSearchTimer = setTimeout(async () => {
      if (forwardGeoCache.has(norm)) { locationSearchResults.value = forwardGeoCache.get(norm); return; }
      isSearchingLocation.value = true;
      locationSearchResults.value = [];
      try {
        const query = encodeURIComponent(raw);
        // Bias results around the current marker / map center if available so place-name / road searches
        // are more accurate to the user's region (e.g. "Cairo Road" returns the Zambian one if the
        // map is centered on Lusaka). viewbox is a soft bias unless bounded=1.
        const lat = parseFloat(leadForm.value?.location?.lat || 0);
        const lng = parseFloat(leadForm.value?.location?.lng || 0);
        let viewboxParam = '';
        if (isFinite(lat) && isFinite(lng) && (lat || lng)) {
          const delta = 1.5; // ~165 km box around current focus — soft bias only
          const left = lng - delta, right = lng + delta, top = lat + delta, bottom = lat - delta;
          viewboxParam = `&viewbox=${left},${top},${right},${bottom}`;
        }
        // Country bias from browser locale (best effort) — Nominatim accepts ISO 3166-1 alpha2 codes.
        let countryParam = '';
        try {
          const locale = (navigator.language || 'en-US').split('-')[1];
          if (locale && locale.length === 2) countryParam = `&countrycodes=${locale.toLowerCase()}`;
        } catch { /* ignore */ }

        // Run two parallel queries: a structured "free-text" query and a fuzzy "loose" one,
        // then merge & dedupe by osm_id. This noticeably improves recall for partial names,
        // road names, suburbs, landmarks, and POIs.
        const baseUrl = (q, extra = '') => `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=15&addressdetails=1&dedupe=1&namedetails=1&extratags=1${extra}${viewboxParam}`;
        const fetchOpts = { headers: { 'Accept-Language': navigator.language || 'en-US' } };

        const requests = [
          fetch(baseUrl(query, countryParam), fetchOpts).then(r => r.ok ? r.json() : []),
          // Worldwide fallback without country bias — useful for international leads
          countryParam ? fetch(baseUrl(query), fetchOpts).then(r => r.ok ? r.json() : []) : Promise.resolve([])
        ];

        const [primary, fallback] = await Promise.all(requests);
        const merged = [...(primary || []), ...(fallback || [])];

        // Dedupe by osm_id (or place_id) and rank by importance + type
        const seen = new Set();
        const TYPE_RANK = { city: 5, town: 5, village: 4, suburb: 4, neighbourhood: 4, road: 3, residential: 3, house: 2, building: 2, amenity: 3, shop: 3, tourism: 3, office: 3 };
        const ranked = merged.filter(r => {
          const key = r.osm_id ? `${r.osm_type}/${r.osm_id}` : r.place_id;
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        }).map(r => {
          const t = (r.type || '').toLowerCase();
          const cls = (r.class || '').toLowerCase();
          const typeScore = TYPE_RANK[t] || TYPE_RANK[cls] || 1;
          const importance = parseFloat(r.importance || 0);
          return { ...r, _score: typeScore + importance * 2 };
        }).sort((a, b) => b._score - a._score).slice(0, 12);

        forwardGeoCache.set(norm, ranked);
        if (!ranked || ranked.length === 0) alert('No locations found. Try a different search term (e.g. include a city or country).');
        locationSearchResults.value = ranked;
      } catch (error) { console.error('Location search error:', error); alert('Failed to search location. Please try again.'); }
      finally { isSearchingLocation.value = false; }
    }, 350);
  }

  const isLocatingDevice = ref(false);
  async function useCurrentLocation() {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by this browser.');
      return;
    }
    isLocatingDevice.value = true;
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        });
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      if (!leadForm.value.location) leadForm.value.location = { lat: 0, lng: 0 };
      await snapAndUpdateLocation(lat, lng);
      locationSearchResults.value = [];
    } catch (err) {
      console.error('Geolocation error', err);
      const msg = err && err.code === 1
        ? 'Location permission denied. Please allow location access in your browser settings.'
        : (err && err.code === 3
            ? 'Timed out while getting your location. Please try again.'
            : 'Unable to retrieve your current location.');
      alert(msg);
    } finally {
      isLocatingDevice.value = false;
    }
  }

  const callNotes = ref({});
  const newCallNote = ref({});
  async function ensureCallNotesLoaded(comm) {
    const tenantId = getTenantId();
    if (!comm?.id) return;
    // Always re-fetch when explicitly called (panel open), so stale/missing notes are refreshed
    try { callNotes.value[comm.id] = await crmApi.getCommunicationNotes(comm.id, tenantId); } catch (e) { callNotes.value[comm.id] = []; }
  }
  async function submitCallNote(comm) {
    const tenantId = getTenantId();
    const text = (newCallNote.value[comm.id] || '').trim();
    if (!text) return;
    try {
      const note = await crmApi.addCommunicationNote(comm.id, tenantId, text);
      callNotes.value[comm.id] = [...(callNotes.value[comm.id] || []), note];
      newCallNote.value[comm.id] = '';
    } catch (e) { console.warn('Failed to add call note', e); }
  }

  const visits = ref([]);
  const visitNotes = ref({});
  const newVisitNote = ref({});
  const showVisitModal = ref(false);
  const editingVisit = ref(null);
  const visitForm = ref({ leadId: '', title: '', scheduled_at: '', description: '', current_location: null, location: null, address: '', route_data: null, distance: null, estimated_duration: null });
  const gettingLocation = ref(false);
  const showManualLocation = ref(false);
  const manualLocation = ref({ lat: null, lng: null, address: '' });
  const calculatingRoute = ref(false);
  const routeInfo = ref(null);

  function _toDateTimeInput(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  function openVisitModal(visit = null) {
    editingVisit.value = visit && visit.id ? visit : null;
    if (editingVisit.value) {
      visitForm.value = {
        leadId: visit.leadId || '',
        title: visit.title || '',
        scheduled_at: _toDateTimeInput(visit.scheduled_at),
        description: visit.description || '',
        current_location: visit.current_location || null,
        location: visit.location || null,
        address: visit.address || '',
        route_data: visit.route_data || null,
        distance: visit.distance || null,
        estimated_duration: visit.estimated_duration || null
      };
      routeInfo.value = visit.route_data || null;
    } else {
      visitForm.value = { leadId: '', title: '', scheduled_at: '', description: '', current_location: null, location: null, address: '', route_data: null, distance: null, estimated_duration: null };
      routeInfo.value = null;
    }
    showManualLocation.value = false;
    manualLocation.value = { lat: null, lng: null, address: '' };
    showVisitModal.value = true;
  }
  function closeVisitModal() { showVisitModal.value = false; routeInfo.value = null; editingVisit.value = null; }

  async function getCurrentLocation() {
    if (!navigator.geolocation) { alert('Geolocation is not supported by your browser'); return; }
    gettingLocation.value = true;
    try {
      const position = await new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }); });
      const lat = position.coords.latitude; const lng = position.coords.longitude;
      let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        if (response.ok) { const data = await response.json(); address = data.display_name || address; }
      } catch (e) { console.warn('Failed to reverse geocode', e); }
      visitForm.value.current_location = { lat, lng, address };
    } catch (error) { console.error('Error getting location:', error); alert('Failed to get your location. Please enable location services or enter manually.'); }
    finally { gettingLocation.value = false; }
  }

  function clearCurrentLocation() { visitForm.value.current_location = null; routeInfo.value = null; }
  function setManualLocation() {
    if (!manualLocation.value.lat || !manualLocation.value.lng) { alert('Please enter valid coordinates'); return; }
    visitForm.value.current_location = { lat: manualLocation.value.lat, lng: manualLocation.value.lng, address: manualLocation.value.address || `${manualLocation.value.lat}, ${manualLocation.value.lng}` };
    showManualLocation.value = false;
  }
  function onLeadSelect() { const ld = pipelineLeads.value.find(l => l.id === visitForm.value.leadId || l._id === visitForm.value.leadId); if (ld && ld.location) { visitForm.value.location = ld.location; visitForm.value.address = ld.address || ld.city || ''; } }

  async function optimizeRoute() {
    if (!visitForm.value.current_location || !visitForm.value.location) { alert('Both starting location and destination are required'); return; }
    calculatingRoute.value = true; routeInfo.value = null;
    try {
      const tenantId = getTenantId();
      const branchIdParam = safeBranchId.value ? `&branch_id=${encodeURIComponent(safeBranchId.value)}` : '';
      const response = await fetch(`${API_BASE_URL}/crm/visits/route-optimization?tenant_id=${tenantId}${branchIdParam}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ origin: { lat: visitForm.value.current_location.lat, lng: visitForm.value.current_location.lng }, destination: { lat: visitForm.value.location.lat, lng: visitForm.value.location.lng }, mode: 'driving' }) });
      if (!response.ok) throw new Error('Failed to calculate route');
      const data = await response.json(); routeInfo.value = data; visitForm.value.route_data = data.route_data || data; visitForm.value.distance = data.distance; visitForm.value.estimated_duration = data.estimated_duration;
    } catch (error) { console.error('Route optimization error:', error); alert('Failed to calculate route. You can still create the visit without route optimization.'); }
    finally { calculatingRoute.value = false; }
  }

  function formatVisitDuration(seconds) { if (!seconds) return 'N/A'; const hours = Math.floor(seconds / 3600); const minutes = Math.floor((seconds % 3600) / 60); return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`; }
  function getLeadNameById(id) { const ld = (pipelineLeads.value || []).find(l => l.id === id || l._id === id); return ld ? ld.name : id; }
  function getMapsLink(location) { const lat = location?.lat; const lng = location?.lng; if (lat == null || lng == null) return 'https://maps.google.com'; return `https://www.google.com/maps?q=${encodeURIComponent(lat)},${encodeURIComponent(lng)}`; }
  async function loadVisits() { const tenantId = getTenantId(); try { visits.value = (await crmApi.getVisits(tenantId, { branch_id: selectedBranch.value || undefined })) || []; } catch (e) { visits.value = []; } }
  async function ensureVisitNotesLoaded(visit) { const tenantId = getTenantId(); if (!visit?.id || visitNotes.value[visit.id]) return; try { visitNotes.value[visit.id] = await crmApi.getVisitNotes(visit.id, tenantId); } catch (e) { visitNotes.value[visit.id] = []; } }

  async function createVisit() {
    const tenantId = getTenantId();
    if (!visitForm.value.leadId) { alert('Select a lead'); return; }
    if (!visitForm.value.title) { alert('Enter a title'); return; }
    try {
      if (editingVisit.value?.id) {
        const patchData = { ...visitForm.value };
        await crmApi.patchVisit(editingVisit.value.id, tenantId, patchData);
        await loadVisits();
        closeVisitModal();
        showToast('success', 'Visit Updated', 'Visit details have been updated.');
      } else {
        const visitData = { ...visitForm.value, tenant_id: tenantId, branch_id: selectedBranch.value || null };
        await crmApi.createVisit(visitData);
        await loadVisits();
        closeVisitModal();
        showToast('success', 'Visit Created', 'Visit created successfully.');
      }
    } catch (e) { console.error('Failed to create visit:', e); alert('Failed to create visit'); }
  }

  async function markVisitCompleted(v) { const tenantId = getTenantId(); try { await crmApi.patchVisit(v.id, tenantId, { status: 'completed', ended_at: new Date().toISOString() }); await loadVisits(); } catch (e) { console.warn('Failed to complete visit', e); } }
  async function submitVisitNote(v) {
    const tenantId = getTenantId();
    const text = (newVisitNote.value[v.id] || '').trim();
    if (!text) return;
    try {
      const note = await crmApi.addVisitNote(v.id, tenantId, text);
      visitNotes.value[v.id] = [...(visitNotes.value[v.id] || []), note];
      newVisitNote.value[v.id] = '';
    } catch (e) { console.warn('Failed to add visit note', e); }
  }

  const showCheckOutModalFlag = ref(false);
  const currentVisitForCheckOut = ref(null);
  const checkOutForm = ref({ visit_outcome: '', outcome_notes: '', follow_up_required: false, follow_up_date: '' });
  const checkingOut = ref(false);

  async function checkInVisit(visit) {
    if (!navigator.geolocation) { alert('Geolocation is not supported by your browser'); return; }
    try {
      const position = await new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }); });
      const lat = position.coords.latitude; const lng = position.coords.longitude;
      let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        if (response.ok) { const data = await response.json(); address = data.display_name || address; }
      } catch (e) { console.warn('Failed to reverse geocode', e); }
      const tenantId = getTenantId();
      const response = await fetch(`${API_BASE_URL}/crm/visits/${visit.id}/check-in?tenant_id=${tenantId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ location: { lat, lng, address }, notes: 'Checked in via mobile' }) });
      if (!response.ok) throw new Error('Failed to check in');
      await loadVisits(); alert('Checked in successfully!');
    } catch (error) { console.error('Check-in error:', error); alert('Failed to check in. Please try again or check your location settings.'); }
  }

  function showCheckOutModal(visit) { currentVisitForCheckOut.value = visit; checkOutForm.value = { visit_outcome: '', outcome_notes: '', follow_up_required: false, follow_up_date: '' }; showCheckOutModalFlag.value = true; }
  function closeCheckOutModal() { showCheckOutModalFlag.value = false; currentVisitForCheckOut.value = null; }

  async function confirmCheckOut() {
    if (!checkOutForm.value.visit_outcome) { alert('Please select a visit outcome'); return; }
    if (!navigator.geolocation) { alert('Geolocation is not supported by your browser'); return; }
    checkingOut.value = true;
    try {
      const position = await new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }); });
      const lat = position.coords.latitude; const lng = position.coords.longitude;
      let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        if (response.ok) { const data = await response.json(); address = data.display_name || address; }
      } catch (e) { console.warn('Failed to reverse geocode', e); }
      const tenantId = getTenantId();
      const response = await fetch(`${API_BASE_URL}/crm/visits/${currentVisitForCheckOut.value.id}/check-out?tenant_id=${tenantId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ location: { lat, lng, address }, visit_outcome: checkOutForm.value.visit_outcome, outcome_notes: checkOutForm.value.outcome_notes, follow_up_required: checkOutForm.value.follow_up_required, follow_up_date: checkOutForm.value.follow_up_date || null }) });
      if (!response.ok) throw new Error('Failed to check out');
      await loadVisits(); closeCheckOutModal(); alert('Checked out successfully!');
    } catch (error) { console.error('Check-out error:', error); alert('Failed to check out. Please try again.'); }
    finally { checkingOut.value = false; }
  }

  const totalPages = computed(() => Math.max(1, Math.ceil((totalLeads.value || 0) / perPage.value)));
  const pagedLeads = computed(() => leads.value || []);
  const filteredTenantUsers = computed(() => { if (!userSearchQuery.value) return tenantUsers.value; const query = userSearchQuery.value.toLowerCase(); return tenantUsers.value.filter(user => user.email.toLowerCase().includes(query) || (user.role && user.role.toLowerCase().includes(query))); });
  const filteredAssignToUsers = computed(() => { if (!assignToSearch.value) return tenantUsers.value; const query = assignToSearch.value.toLowerCase(); return tenantUsers.value.filter(user => user.email.toLowerCase().includes(query) || (user.role && user.role.toLowerCase().includes(query))); });
  const filteredLeadsForKPI = computed(() => ({ length: stats.value?.leads?.total || 0 }));
  const filteredContactsForKPI = computed(() => ({ length: stats.value?.contacts?.total || 0 }));
  const filteredAccountsForKPI = computed(() => ({ length: stats.value?.accounts?.total || 0 }));
  const filteredDealsForKPI = computed(() => ({ length: stats.value?.deals?.total || 0 }));
  const kpiNewLeadsThisMonth = () => stats.value?.leads?.newThisMonth || 0;
  const getOpenDeals = () => stats.value?.deals?.open || 0;
  const kpiTotalPipelineValue = computed(() => stats.value?.deals?.pipelineValue || 0);
  const getWeightedPipelineValue = () => stats.value?.deals?.weightedPipelineValue || 0;
  const getConversionRate = () => Number(stats.value?.deals?.conversionRate || 0).toFixed(2);

  function kpiLeadsByStage(stageId) {
    if (!stageId) return [];
    const idString = stageId.toString().toLowerCase();
    const stage = allPipelineStages.value.find(s => s.id.toString().toLowerCase() === idString);
    if (!stage) return [];
    const entity = stage.entity?.toLowerCase() || 'deals';
    if (entity === 'leads') return pipelineLeads.value.filter(l => (l.stage || '').toString().toLowerCase() === idString);
    if (entity === 'contacts') return pipelineContacts.value.filter(c => (c.stage || '').toString().toLowerCase() === idString);
    if (entity === 'accounts') return pipelineAccounts.value.filter(a => (a.stage || '').toString().toLowerCase() === idString);
    return pipelineDeals.value.filter(d => (d.stage || '').toString().toLowerCase() === idString);
  }

  function kpiStageValue(stageId) {
    const items = kpiLeadsByStage(stageId);
    return items.reduce((sum, item) => {
      const val = parseFloat(item.value || item.amount || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  async function handleAddNote(lead) {
    if (!lead) return;
    const content = window.prompt('Enter your note:');
    if (!content) return;
    const tenantId = getTenantId();
    try {
      await crmApi.createLeadNote(lead.id, tenantId, { note: content });
      const res = await crmApi.getLeadNotes(lead.id, tenantId);
      leadNotes.value = res || [];
    } catch (err) { console.error('Failed to add note:', err); alert('Failed to add note: ' + err.message); }
  }

  async function handleAddActivity(lead) {
    if (!lead) return;
    const action = window.prompt('Enter activity action (e.g., Call, Email, Meeting):');
    if (!action) return;
    const notes = window.prompt('Enter activity notes (optional):');
    const tenantId = getTenantId();
    try {
      await crmApi.logLeadActivity(lead.id, { tenant_id: tenantId, action: action, notes: notes || '', timestamp: new Date().toISOString() });
      const res = await crmApi.getLeadActivities(lead.id, tenantId);
      leadActivities.value = res || [];
    } catch (err) { console.error('Failed to log activity:', err); alert('Failed to log activity: ' + err.message); }
  }

  const pageStart = computed(() => { if (!totalLeads.value) return 0; return (page.value - 1) * perPage.value + 1; });
  const pageEnd = computed(() => Math.min(totalLeads.value, page.value * perPage.value));
  function prevPage() { if (page.value > 1) { page.value -= 1; loadLeads(); } }
  function nextPage() { if (page.value < totalPages.value) { page.value += 1; loadLeads(); } }

  function openAdvancedFilters() {
    advancedFilters.value = { city: advancedFilters.value.city || '', area: advancedFilters.value.area || '', country: advancedFilters.value.country || '', industry: advancedFilters.value.industry || '', status: advancedFilters.value.status || '', min_revenue: advancedFilters.value.min_revenue || '', max_revenue: advancedFilters.value.max_revenue || '' };
    showAdvancedFilters.value = true;
  }

  function applyAdvancedFilters(filters) {
    const norm = { ...filters };
    if (norm.min_revenue === '') delete norm.min_revenue;
    if (norm.max_revenue === '') delete norm.max_revenue;
    advancedFilters.value = norm; showAdvancedFilters.value = false; page.value = 1; loadLeads();
  }

  function applyQuickFilter(filter) { leadQuickFilter.value = filter; priorityDropdownOpen.value = false; page.value = 1; loadLeads(); }
  function togglePriorityDropdown() { priorityDropdownOpen.value = !priorityDropdownOpen.value; }
  function selectPriority(value) { applyQuickFilter(value); }
  function getPriorityLabel() { const selected = priorityOptions.find(opt => opt.value === leadQuickFilter.value); return selected ? selected.label : 'All Priorities'; }
  function applyTouchFilter(val) { touchFilter.value = val; page.value = 1; loadLeads(); }
  function applyStageFilter(stage) { stageFilter.value = stage; page.value = 1; loadLeads(); }

  async function deleteMeetingRecord() {
    if (!selectedMeeting.value) return;
    if (!confirm('Are you sure you want to delete this meeting? This action cannot be undone.')) return;
    try {
      const tenantId = getTenantId();
      await crmApi.deleteMeeting(selectedMeeting.value.id, tenantId); showToast('success', 'Deleted', 'Meeting deleted successfully'); showMeetingModal.value = false; selectedMeeting.value = null; loadMeetings();
    } catch (err) { console.error('Failed to delete meeting:', err); showToast('error', 'Error', 'Failed to delete meeting'); }
  }

  function applySourceFilter(source) { sourceFilter.value = source; page.value = 1; loadLeads(); }

  function openAddStageModal() { newStageForm.value = { name: '', entity: 'leads', insertAfter: 'end' }; showAddStageModal.value = true; }
  function closeAddStageModal() { showAddStageModal.value = false; newStageForm.value = { name: '', entity: 'leads', insertAfter: 'end' }; }

  function addCustomStage() {
    const name = newStageForm.value.name.trim();
    if (!name) { alert('Please enter a stage name'); return; }
    let order = 0;
    const sortedStages = [...allPipelineStages.value];
    if (newStageForm.value.insertAfter === 'start') { order = sortedStages.length > 0 ? sortedStages[0].order - 500 : 1000; }
    else if (newStageForm.value.insertAfter === 'end') { order = sortedStages.length > 0 ? sortedStages[sortedStages.length - 1].order + 1000 : 1000; }
    else {
      const afterIndex = sortedStages.findIndex(s => s.id === newStageForm.value.insertAfter);
      if (afterIndex !== -1) {
        const afterStage = sortedStages[afterIndex];
        const nextStage = sortedStages[afterIndex + 1];
        order = nextStage ? (afterStage.order + nextStage.order) / 2 : afterStage.order + 1000;
      } else { order = sortedStages.length > 0 ? sortedStages[sortedStages.length - 1].order + 1000 : 1000; }
    }
    const colorIndex = customPipelineStages.value.length % stageColorPalette.length;
    const colors = stageColorPalette[colorIndex];
    const id = `custom-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const newStage = { id, name, entity: newStageForm.value.entity, ...colors, description: `Custom ${name} stage`, isCustom: true, order };
    customPipelineStages.value.push(newStage);
    const tenantId = getTenantId();
    try { crmApi.updateCRMMetadata({ tenant_id: tenantId, pipeline_stages: customPipelineStages.value }); } catch (e) { console.error("Failed to save pipeline stage", e); showToast('error', 'Error', 'Failed to save stage to server'); }
    showToast('success', 'Stage Added', `${name} stage has been added to the pipeline`); closeAddStageModal();
  }

  async function removeCustomStage(stageId) {
    // Handle default stage deletion
    const isDefault = pipelineStages.some(s => s.id === stageId);
    if (isDefault) {
      if (!deletedDefaultStageIds.value.includes(stageId)) {
        deletedDefaultStageIds.value.push(stageId);
      }
      const tenantId = getTenantId();
      if (tenantId) {
        crmApi.updateCRMMetadata({ tenant_id: tenantId, deleted_default_stages: deletedDefaultStageIds.value, pipeline_stages: customPipelineStages.value }).catch(() => {});
      }
      return;
    }
    // Custom stage removal
    const stage = customPipelineStages.value.find(s => s.id === stageId);
    if (!stage) return;
    const recordsInStage = kpiLeadsByStage(stageId);
    if (recordsInStage.length > 0) {
      const ok = await showPipelineConfirm('Delete Stage', `This stage contains ${recordsInStage.length} record(s). Are you sure you want to delete it? These records will no longer be visible in the pipeline until moved.`, 'danger', true);
      if (!ok) return;
    } else {
      const ok = await showPipelineConfirm('Delete Stage', `Are you sure you want to delete the "${stage.name}" stage?`, 'danger', true);
      if (!ok) return;
    }
    const updatedStages = customPipelineStages.value.filter(s => s.id !== stageId);
    customPipelineStages.value = updatedStages;
    const tenantId = getTenantId();
    try { crmApi.updateCRMMetadata({ tenant_id: tenantId, pipeline_stages: updatedStages, deleted_default_stages: deletedDefaultStageIds.value }); } catch (e) { console.error("Failed to save pipeline removal", e); }
    showToast('success', 'Stage Removed', `Custom stage "${stage.name}" has been removed.`);
  }

  watch(selectAll, (newVal) => { if (newVal) { selectedRecords.value = pagedLeads.value.map(l => l.id); } else { selectedRecords.value = []; } });

  async function fetchTenantUsers() {
    const tenantId = getTenantId();
    if (!tenantId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/crm/assignable-users?tenant_id=${tenantId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      if (response.ok) {
        const users = await response.json();
        tenantUsers.value = users || [];
        const hasOwner = users.some(u => u.role === 'owner' || u.role === 'admin');
        if (!hasOwner) {
          try {
            const tenantResponse = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
            if (tenantResponse.ok) {
              const data = await tenantResponse.json();
              const tenantData = data.tenant || data;
              if (tenantData.owner_email && !tenantUsers.value.some(u => u.email === tenantData.owner_email)) {
                tenantUsers.value.unshift({ email: tenantData.owner_email, role: 'owner', name: tenantData.owner_name || 'Owner', tenant_id: tenantId });
              }
            }
          } catch (err) { console.warn('Could not fetch tenant owner info:', err); }
        }
      }
    } catch (err) { console.error('Error fetching tenant users:', err); }
  }

  function getUserInitials(email) { if (!email) return '?'; const parts = email.split('@')[0].split('.'); return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : email.substring(0, 2).toUpperCase(); }
  function getAssignedUserRole(email) { if (!email) return ''; const user = tenantUsers.value.find(u => u.email === email); return user?.role || 'user'; }
  function selectAssignTo(user) {
    if (!canAssignCrm.value) { alert('You do not have permission to assign CRM records.'); return; }
    leadForm.value.assignedTo = user.email; assignToSearch.value = user.email; showAssignToDropdown.value = false;
  }

  function handleClickOutside(event) {
    if (assignDropdownRef.value && !assignDropdownRef.value.contains(event.target)) showAssignDropdown.value = false;
    if (!event.target.closest('.relative')) priorityDropdownOpen.value = false;
  }

  async function bulkAssign() {
    if (selectedRecords.value.length === 0) { alert('Please select leads first'); return; }
    if (!canAssignCrm.value) { alert('You do not have permission to assign CRM records.'); return; }
    const assignTo = prompt('Enter user email to assign:');
    if (!assignTo) return;
    const tenantId = getTenantId();
    try {
      for (const leadId of selectedRecords.value) { await crmApi.updateLead(leadId, { assignedTo: assignTo }, tenantId); }
      selectedRecords.value = []; selectAll.value = false; await loadLeads(); alert(`Successfully assigned ${selectedRecords.value.length} leads`);
    } catch (err) { console.error('Bulk assign error:', err); alert('Failed to assign some leads'); }
  }

  async function bulkChangeStage() {
    if (selectedRecords.value.length === 0) { showToast('warning', 'No Selection', 'Please select leads first'); return; }
    const stage = prompt('Enter stage (new, contacted):');
    if (!stage) return;
    const normStage = stage.toLowerCase();
    const allowedLeadStages = ['new', 'contacted'];
    if (!allowedLeadStages.includes(normStage)) { showToast('warning', 'Invalid Stage', 'Allowed stages for leads: new, contacted. Use Pipeline to progress Contacts/Accounts/Deals.'); return; }
    const tenantId = getTenantId();
    const count = selectedRecords.value.length;
    const isConverting = normStage === 'contacted';
    if (isConverting) {
      const ok = await showPipelineConfirm('Convert to Contacts', `Changing ${count} lead${count > 1 ? 's' : ''} to "contacted" will convert them to Contacts. Continue?`, 'warning', true);
      if (!ok) return;
    }
    try {
      for (const leadId of selectedRecords.value) {
        if (isConverting) { await crmApi.convertLead(leadId, tenantId, { createAccount: false, createDeal: false }); }
        else { await crmApi.updateLead(leadId, { stage: normStage }, tenantId); }
      }
      selectedRecords.value = []; selectAll.value = false; await loadLeads();
      if (isConverting) { emitCrmEvent('crm:contacts:changed'); await fetchPipelineData(); }
      showToast('success', 'Bulk Update Complete', `Successfully ${isConverting ? 'converted to Contacts' : `updated to ${normStage}`} ${count} lead${count > 1 ? 's' : ''}`);
    } catch (err) { console.error('Bulk stage change error:', err); showToast('error', 'Bulk Update Failed', 'Failed to update some leads. Please try again.'); }
  }

  async function bulkExport(providedData) {
    let selectionData = [];
    if (providedData && Array.isArray(providedData) && providedData.length > 0) {
      // If it's a list of objects (not IDs), use it directly
      if (typeof providedData[0] === 'object') {
        selectionData = providedData;
      } else {
        // It's a list of IDs
        const allSourceLeads = [...leads.value, ...pagedLeads.value, ...pipelineLeads.value];
        selectionData = allSourceLeads.filter(l => providedData.includes(l.id || l._id));
      }
    } else if (selectedRecords.value.length > 0) {
      const allSourceLeads = [...leads.value, ...pagedLeads.value, ...pipelineLeads.value];
      selectionData = allSourceLeads.filter(l => selectedRecords.value.includes(l.id || l._id));
    }

    if (selectionData.length === 0) { showToast('warning', 'No Selection', 'Please select leads to export'); return; }
    const count = selectionData.length;
    try {
      const worksheet = XLSX.utils.json_to_sheet(selectionData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Leads');
      XLSX.writeFile(workbook, `selected_leads_${new Date().toISOString().split('T')[0]}.xlsx`);
      showToast('success', 'Export Complete', `Exported ${count} lead${count > 1 ? 's' : ''} successfully`);
    } catch (err) { console.error('Bulk export error:', err); showToast('error', 'Export Failed', 'Failed to export selected leads'); }
  }

  async function bulkDelete() {
    if (selectedRecords.value.length === 0) { showToast('warning', 'No Selection', 'Please select leads first'); return; }
    const count = selectedRecords.value.length;
    if (!confirm(`Delete ${count} leads? This cannot be undone.`)) return;
    const tenantId = getTenantId();
    try {
      for (const leadId of selectedRecords.value) { await crmApi.deleteLead(leadId, tenantId); }
      selectedRecords.value = []; selectAll.value = false; await loadLeads();
      showToast('success', 'Bulk Delete Complete', `Successfully deleted ${count} lead${count > 1 ? 's' : ''}`);
    } catch (err) { console.error('Bulk delete error:', err); showToast('error', 'Bulk Delete Failed', 'Failed to delete some leads. Please try again.'); }
  }

  function sortBy(field) {
    if (sortField.value === field) { sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'; }
    else { sortField.value = field; sortDirection.value = 'asc'; }
    loadLeads();
  }
  async function convertLead(lead) { selectedLeadForConversion.value = lead; showDetailModal.value = false; showConversionModal.value = true; }
  async function handleLeadConverted(result) {
    showConversionModal.value = false; selectedLeadForConversion.value = null;
    const tenantId = getTenantId();
    const parts = [];

    // If backend created an account but missed contact/deal, create them here
    if (result?.accountId && !result?.contactId) {
      try {
        // Fetch the converted lead to get its data
        const leadData = selectedLeadForConversion?.value || {};
        await crmApi.createContact({
          name: leadData.name || 'Converted Contact',
          firstName: (leadData.name || '').split(' ')[0] || '',
          lastName: (leadData.name || '').split(' ').slice(1).join(' ') || '',
          email: leadData.email || '',
          phone: leadData.phone || '',
          accountId: result.accountId,
          convertedFromLeadId: leadData.id,
          tenant_id: tenantId
        });
        parts.push('Contact');
      } catch (e) { console.warn('[CRMModule] Fallback contact creation failed:', e); }
    }
    if (result?.accountId && !result?.dealId) {
      try {
        const leadData = selectedLeadForConversion?.value || {};
        await crmApi.createDeal({
          name: `${leadData.name || 'Converted'} Deal`,
          value: Number(leadData.value || 0),
          stage: 'closed-won',
          probability: 100,
          accountId: result.accountId,
          convertedFromLeadId: leadData.id,
          tenant_id: tenantId
        });
        parts.push('Deal');
      } catch (e) { console.warn('[CRMModule] Fallback deal creation failed:', e); }
    }

    emitCrmEvent('crm:leads:changed'); await fetchPipelineData(); emitCrmEvent('crm:contacts:changed'); emitCrmEvent('crm:deals:changed');
    if (result.contactId) parts.push('Contact');
    if (result.accountId) parts.push('Account');
    if (result.dealId) parts.push('Deal');
    showToast('success', 'Lead Converted', `Successfully created: ${parts.join(', ')}`);
  }

  async function handleBulkImportComplete(result) {
    showBulkUploadModal.value = false; emitCrmEvent('crm:leads:changed');
    const message = `${result.success} imported` + (result.skipped > 0 ? `, ${result.skipped} duplicates skipped` : '') + (result.failed > 0 ? `, ${result.failed} failed` : '');
    showToast(result.failed > 0 ? 'warning' : 'success', 'Bulk Import Complete', message);
  }

  const filteredCustomers = computed(() => { if (!customerFilter.value) return customers.value; return customers.value.filter(c => c.tag === customerFilter.value); });
  const filteredCommunications = computed(() => { if (!communicationFilter.value) return communications.value; let list = communications.value.filter(c => c.type === communicationFilter.value); if (communicationFilter.value === 'whatsapp' && whatsappSubtypeFilter.value) list = list.filter(c => (c.subtype || '') === whatsappSubtypeFilter.value); return list; });
  const leadCommunications = computed(() => { if (!selectedLead.value) return []; return communications.value.filter(c => c.contactId === selectedLead.value.id); });

  function tabClass(tab) { return ['px-4 py-2 rounded-lg font-semibold transition', activeTab.value === tab ? 'bg-white text-[#2F2E8B] border border-[#2F2E8B] shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent']; }

  function getVisibleLeadsByStage(stageId) {
    const stage = allPipelineStages.value.find(s => s.id === stageId);
    if (!stage) return [];
    const allEntities = [...pipelineLeads.value.map(l => ({ ...l, entityType: 'lead' })), ...pipelineContacts.value.map(c => ({ ...c, entityType: 'contact' })), ...pipelineAccounts.value.map(a => ({ ...a, entityType: 'account' })), ...pipelineDeals.value.map(d => ({ ...d, entityType: 'deal' }))];
    const entityMap = { leads: 'lead', contacts: 'contact', accounts: 'account', deals: 'deal' };
    const requiredEntityType = entityMap[stage.entity] || null;
    
    let filtered = allEntities.filter(entity => {
      if (entity.stage !== stageId) return false;
      if (stageId === 'contacted') return entity.entityType === 'contact' || entity.entityType === 'lead';
      if (requiredEntityType && !stage.isCustom) return entity.entityType === requiredEntityType;
      return true;
    });

    if (pipelineSearchQuery.value) {
      const q = pipelineSearchQuery.value.toLowerCase();
      filtered = filtered.filter(entity => {
        const title = (getRecordTitle(entity, entity.entityType + 's') || '').toLowerCase();
        const subtitle = (getRecordSubtitle(entity, entity.entityType + 's') || '').toLowerCase();
        return title.includes(q) || subtitle.includes(q);
      });
    }

    if (pipelineAssignedFilter.value) {
      const af = pipelineAssignedFilter.value.toLowerCase();
      filtered = filtered.filter(entity => {
        const assigned = (entity.assignedTo || entity.assignedto || entity.assigned_to || '').toLowerCase();
        return assigned === af;
      });
    }

    return filtered;
  }

  function getRecordValue(record, entity) { if (!record) return 0; if (entity === 'deals' || record.entityType === 'deal') return record.value || record.amount || 0; if (entity === 'leads' || record.entityType === 'lead') return record.value || 0; return 0; }
  function formatNumber(val) { return Number(val).toLocaleString(); }
  function capitalize(str) { if (!str) return ''; const s = String(str); return s.charAt(0).toUpperCase() + s.slice(1); }

  function getPriorityBadgeClass(priority) {
    const p = (priority || '').toLowerCase();
    if (p === 'hot') return 'bg-white text-red-700 border border-red-200 font-bold';
    if (p === 'warm') return 'bg-white text-orange-700 border border-orange-200 font-bold';
    if (p === 'cold') return 'bg-white text-blue-700 border border-blue-200 font-bold';
    return 'bg-white text-gray-700 border border-gray-200 font-medium';
  }

  function formatLocation(lead) {
    if (!lead) return '-';
    const area = lead.areaName || lead.locationName || '';
    const city = lead.city || '';
    const country = lead.country || '';
    if (area) return area;
    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    if (country) return country;
    if (lead.location && lead.location.lat && lead.location.lng) return `${Number(lead.location.lat).toFixed(5)}, ${Number(lead.location.lng).toFixed(5)}`;
    return '-';
  }

  function getLeadPriorityClass(priority) {
    const p = (priority || '').toLowerCase();
    if (p === 'hot') return 'border-red-400 bg-red-50/30';
    if (p === 'warm') return 'border-orange-400 bg-orange-50/30';
    if (p === 'cold') return 'border-blue-400 bg-blue-50/30';
    return 'border-gray-300';
  }

  function getStageBadgeClass(stage) {
    const stages = { 'new': 'bg-white text-purple-700 border border-purple-200', 'contacted': 'bg-white text-blue-700 border border-blue-200', 'proposal': 'bg-white text-yellow-700 border border-yellow-200', 'negotiation': 'bg-white text-orange-700 border border-orange-200', 'closed-won': 'bg-white text-green-700 border border-green-200 font-bold', 'closed-lost': 'bg-white text-red-700 border border-red-200 font-bold' };
    return stages[stage] || 'bg-white text-gray-700 border border-gray-200';
  }

  function getStageName(stageId) { if (!stageId) return 'Unknown'; const found = allPipelineStages.value.find(s => s.id === stageId); return found ? found.name : stageId; }
  function getEntityBadgeClass(entityType) { const classes = { 'leads': 'bg-blue-100 text-blue-800', 'contacts': 'bg-purple-100 text-purple-800', 'accounts': 'bg-indigo-100 text-indigo-800', 'deals': 'bg-green-100 text-green-800' }; return classes[entityType] || 'bg-gray-100 text-gray-800'; }
  function getRecordBorderClass(record, entityType) { if (entityType === 'leads' && record.priority) { const p = record.priority.toLowerCase(); if (p === 'hot') return 'border-red-400 bg-red-50/30'; if (p === 'warm') return 'border-orange-400 bg-orange-50/30'; if (p === 'cold') return 'border-blue-400 bg-blue-50/30'; } return 'border-gray-200'; }
  function getRecordTitle(record, entityType) { if (entityType === 'leads') return record.name || ''; if (entityType === 'contacts') return `${record.firstName || ''} ${record.lastName || ''}`.trim() || record.email || ''; if (entityType === 'accounts') return record.name || record.company || ''; if (entityType === 'deals') return record.name || ''; return 'Unknown'; }
  function getRecordSubtitle(record, entityType) { if (entityType === 'leads') return record.company || record.email; if (entityType === 'contacts') return record.title || record.company || record.email; if (entityType === 'accounts') return record.industry || record.city || record.website; if (entityType === 'deals') return record.stage || 'Deal'; }

  function viewRecord(record, entityType) { activeTab.value = entityType; }
  function whatsappTextRecord(record) { const tenantId = getTenantId(); const phone = record.phone || record.mobile; const name = record.name || record.title || 'Contact'; if (phone) { const cleanPhone = phone.replace(/[^0-9+]/g, ''); crmApi.startWhatsAppText({ tenantId, related_type: 'contact', related_id: record.id, name, phone: cleanPhone, text: `Hi ${name}` }); } else { alert('No phone number available'); } }
  function callRecord(record) { const tenantId = getTenantId(); const phone = record.phone || record.mobile; const name = record.name || record.title || 'Contact'; if (phone) { const payload = { related_type: 'contact', related_id: record.id, contactName: name, type: 'call', subject: null, message: `Call initiated to ${name}`, phone, direction: 'outbound', status: 'initiated', tenant_id: tenantId }; crmApi.createCommunication(payload).catch(err => console.warn('Failed to log call', err)); window.location.href = `tel:${phone}`; startCallTimer({ related_type: 'contact', related_id: record.id }); } else { alert('No phone number available'); } }
  function emailRecord(record) { if (!record.email) { alert('No email address available'); return; } window.location.href = `mailto:${record.email}`; }
  function editRecord(record, entityType) { activeTab.value = entityType; setTimeout(() => emitCrmEvent(`crm:edit${capitalize(entityType.slice(0, -1))}`, record), 100); }
  function convertRecord(record) { console.log('Convert lead:', record); }

  function getUserPerformanceMetrics(userEmail) {
    const userLeads = pipelineLeads.value.filter(lead => lead.assignedTo === userEmail || lead.owner === userEmail);
    const userDeals = pipelineDeals.value.filter(deal => deal.assignedTo === userEmail || deal.owner === userEmail);
    const totalLeads = userLeads.length;
    const wonLeads = userLeads.filter(lead => (lead.stage && lead.stage.toLowerCase() === 'closed-won') || lead.isConverted === true || lead.converted === true).length;
    const closedDeals = userDeals.filter(deal => { const s = (deal.stage || '').toLowerCase(); return s === 'closed-won' || s === 'closed-lost' || s === 'closed'; }).length;
    const totalValue = userDeals.reduce((sum, deal) => { let val = deal.amount !== undefined ? deal.amount : deal.value; if (typeof val === 'string') { val = parseFloat(val.replace(/[^0-9.-]+/g, '')); } return sum + (Number(val) || 0); }, 0);
    const winRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;
    return { totalLeads, closedDeals, winRate, totalValue, userEmail };
  }

  const userPerformanceList = computed(() => performanceList.value || []);

  const showPerformanceModal = ref(false);
  const selectedPerformanceUser = ref(null);
  const performanceData = ref(null);

  async function openPerformanceModal(user) {
    selectedPerformanceUser.value = user; showPerformanceModal.value = true; moduleLoading.value = true;
    try {
      const data = await apiGetUserPerformance({ tenant_id: getTenantId(), userEmail: user.email, userId: user.id || user._id, limit: 100 });
      const activities = data.activities || [];
      const callsCount = activities.filter(a => (a.action || '').toLowerCase().includes('call')).length;
      const emailsCount = activities.filter(a => (a.action || '').toLowerCase().includes('email')).length;
      const whatsappCount = activities.filter(a => (a.action || '').toLowerCase().includes('whatsapp')).length;
      const meetingsCount = activities.filter(a => (a.action || '').toLowerCase().includes('meeting') || (a.action || '').toLowerCase().includes('met')).length;
      performanceData.value = { ...data, communications: { calls: callsCount, emails: emailsCount, whatsapp: whatsappCount, meetings: meetingsCount } };
      const userDeals = data.sales?.deals || []; const closedWon = userDeals.filter(d => d.stage === 'closed-won').length; const closedLost = userDeals.filter(d => d.stage === 'closed-lost').length; const totalClosed = closedWon + closedLost; const winRate = totalClosed > 0 ? Math.round((closedWon / totalClosed) * 100) : 0; const totalPipelineValue = userDeals.reduce((sum, d) => sum + (Number(d.amount) || Number(d.value) || 0), 0); const totalLeads = data.sales?.leads?.length || 0;
      if (selectedPerformanceUser.value) { selectedPerformanceUser.value = { ...selectedPerformanceUser.value, totalLeads, closedDeals: closedWon, winRate, totalValue: totalPipelineValue }; }
    } catch (error) { console.error('Failed to fetch user performance:', error); } finally { moduleLoading.value = false; }
  }

  function closePerformanceModal() { showPerformanceModal.value = false; performanceData.value = null; }

  function exportPerformanceReport() {
    if (!selectedPerformanceUser.value || !performanceData.value) return;
    const user = selectedPerformanceUser.value; const data = performanceData.value;
    const rows = [['Performance Report'], ['Generated on', new Date().toLocaleString()], ['User', user.name || user.email], ['Role', user.role || 'N/A'], [], ['Key Metrics'], ['Total Leads', user.totalLeads || 0], ['Closed Deals (Won)', user.closedDeals || 0], ['Win Rate', (user.winRate || 0) + '%'], ['Total Pipeline Value', user.totalValue || 0], [], ['Activity Stats'], ['Total Activities', data.summary?.activities || 0], ['Leads Created', data.summary?.leads || 0], ['Contacts Created', data.summary?.contacts || 0], ['Accounts Managed', data.summary?.accounts || 0], ['Deals Managed', data.summary?.deals || 0]];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent); const link = document.createElement("a"); link.setAttribute("href", encodedUri); link.setAttribute("download", `performance_graph_${(user.name || 'user').replace(/\s+/g, '_')}.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }

  function onDragStart(event, lead) {
    // Prevent dragging if another operation is in progress
    if (dragState.value.status === 'updating') {
      event.preventDefault();
      return;
    }
    
    draggingLead.value = lead;
    dragState.value = {
      status: 'dragging',
      record: lead,
      originalStage: lead.stage,
      targetStage: null,
      error: null
    };
    
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.innerHTML);
    event.target.style.opacity = '0.5';
  }
  
  function onDragEnd(event) {
    event.target.style.opacity = '1';
    
    // Only reset if not currently updating
    if (dragState.value.status !== 'updating') {
      draggingLead.value = null;
      dragOverStage.value = null;
      dragState.value = {
        status: 'idle',
        record: null,
        originalStage: null,
        targetStage: null,
        error: null
      };
    }
  }

  let touchStartY = 0; let touchStartX = 0; let touchedElement = null;
  
  function onTouchStart(event, record) {
    // Prevent touch drag if another operation is in progress
    if (dragState.value.status === 'updating') {
      event.preventDefault();
      return;
    }
    
    touchStartY = event.touches[0].clientY;
    touchStartX = event.touches[0].clientX;
    touchedElement = event.currentTarget;
    draggingLead.value = record;
    
    dragState.value = {
      status: 'dragging',
      record: record,
      originalStage: record.stage,
      targetStage: null,
      error: null
    };
    
    touchedElement.style.opacity = '0.5';
    touchedElement.style.transform = 'scale(0.95)';
  }
  function onTouchMove(event) { if (!draggingLead.value) return; event.preventDefault(); const touch = event.touches[0]; const deltaY = touch.clientY - touchStartY; const deltaX = touch.clientX - touchStartX; if (touchedElement) touchedElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.95)`; const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY); const stageElement = elementAtPoint?.closest('[data-stage-id]'); if (stageElement) dragOverStage.value = stageElement.dataset.stageId; }
  async function onTouchEnd(event, targetStageId) {
    if (!draggingLead.value) return;
    
    const touch = event.changedTouches[0];
    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
    const stageElement = elementAtPoint?.closest('[data-stage-id]');
    
    if (touchedElement) {
      touchedElement.style.opacity = '1';
      touchedElement.style.transform = '';
    }
    
    if (stageElement) {
      await handleDrop(stageElement.dataset.stageId);
    } else {
      // Cancelled drag - reset state
      dragState.value = {
        status: 'idle',
        record: null,
        originalStage: null,
        targetStage: null,
        error: null
      };
    }
    
    draggingLead.value = null;
    dragOverStage.value = null;
    touchedElement = null;
  }

  function onDragEnter(event, stageId) { dragOverStage.value = stageId; }
  function onDragLeave(event, stageId) { if (event.target.classList.contains('space-y-3')) dragOverStage.value = null; }
  async function onDrop(event, newStageId) { event.preventDefault(); dragOverStage.value = null; if (!draggingLead.value) return; await handleDrop(newStageId); }

  async function handleDrop(newStageId) {
    if (!draggingLead.value) return;
    
    // Prevent concurrent drops
    if (dragState.value.status === 'updating') {
      console.warn('Drop already in progress');
      return;
    }
    
    const record = draggingLead.value;
    const newStage = allPipelineStages.value.find(s => s.id === newStageId);
    const oldStageId = record.stage;
    const oldStage = allPipelineStages.value.find(s => s.id === oldStageId);
    
    // Validate drop
    if (!newStage || oldStageId === newStageId) {
      draggingLead.value = null;
      dragState.value = {
        status: 'idle',
        record: null,
        originalStage: null,
        targetStage: null,
        error: null
      };
      return;
    }
    
    // Update drag state to 'updating'
    dragState.value = {
      status: 'updating',
      record: record,
      originalStage: oldStageId,
      targetStage: newStageId,
      error: null
    };
    
    const needsConversion = oldStage && oldStage.entity !== newStage.entity;
    
    // Validate stage transition (skip for custom stages)
    if (!needsConversion && !newStage.isCustom && !oldStage?.isCustom) {
      const currentEntity = oldStage?.entity;
      const allowedStages = allPipelineStages.value.filter(s => s.entity === currentEntity).map(s => s.id);
      
      if (!allowedStages.includes(newStageId)) {
        dragState.value = {
          status: 'error',
          record: record,
          originalStage: oldStageId,
          targetStage: newStageId,
          error: `Invalid stage transition for ${currentEntity?.slice(0, -1) || 'record'}`
        };
        
        await showPipelineAlert('Invalid Move', `That drop isn't allowed. ${capitalize(currentEntity?.slice(0, -1) || 'record')} belongs in ${allPipelineStages.value.filter(s => s.entity === currentEntity).map(s => `"${s.name}"`).join(' or ')}. Use conversion to progress.`, 'warning');
        
        // Reset state after error
        setTimeout(() => {
          dragState.value = {
            status: 'idle',
            record: null,
            originalStage: null,
            targetStage: null,
            error: null
          };
        }, 2000);
        
        draggingLead.value = null;
        return;
      }
    }
    
    // Handle conversions
    if (needsConversion) {
      if (!confirm(`This will convert the ${oldStage.entity.slice(0, -1)} to ${newStage.entity.slice(0, -1)}. Continue?`)) {
        draggingLead.value = null;
        dragState.value = {
          status: 'idle',
          record: null,
          originalStage: null,
          targetStage: null,
          error: null
        };
        return;
      }
      
      try {
        if (newStage.entity === 'contacts' && oldStage.entity === 'leads') {
          // Auto-convert lead to contact
          const newContact = await crmApi.createContact({
            firstName: record.name?.split(' ')[0] || record.name || 'Unknown',
            lastName: record.name?.split(' ').slice(1).join(' ') || '',
            name: record.name,
            email: record.email,
            phone: record.phone,
            company: record.company,
            position: record.position,
            stage: newStageId,
            source: record.source,
            notes: record.notes,
            city: record.city,
            country: record.country,
            value: record.value,
            tenant_id: getTenantId()
          }, getTenantId());
          
          // Delete the old lead after successful conversion
          try {
            await crmApi.deleteLead(record.id, getTenantId());
          } catch (e) {
            // Silently ignore if deletion fails - contact is already created
          }
          
          await Promise.all([loadLeads(), fetchPipelineData()]);
          
          dragState.value.status = 'success';
          showToast('success', 'Converted', `Successfully converted ${record.name} to contact`);
        }
        else if (newStage.entity === 'accounts' && oldStage.entity === 'leads') {
          // Direct lead → account conversion (e.g. dragging lead to closed-won)
          const newAccount = await crmApi.createAccount({
            name: record.company || record.name || 'Unknown Account',
            phone: record.phone,
            email: record.email,
            city: record.city,
            country: record.country,
            stage: newStageId,
            source: record.source,
            notes: record.notes,
            tenant_id: getTenantId()
          }, getTenantId());

          try {
            await crmApi.deleteLead(record.id, getTenantId());
          } catch (e) {
            // Silently ignore if deletion fails - account is already created
          }

          await Promise.all([loadLeads(), fetchPipelineData()]);

          dragState.value.status = 'success';
          showToast('success', 'Converted', `Successfully converted ${record.name} to account: ${newAccount.name}`);
        }
        else if (newStage.entity === 'accounts' && oldStage.entity === 'contacts') {
          const newAccount = await crmApi.createAccount({
            name: record.company || `${record.firstName || record.name}'s Company`,
            phone: record.phone,
            email: record.email,
            tenant_id: getTenantId()
          }, getTenantId());
          
          await crmApi.updateContact(record.id, {
            ...record,
            accountId: newAccount.id,
            accountName: newAccount.name,
            tenant_id: getTenantId()
          }, getTenantId());
          
          await Promise.all([loadLeads(), fetchPipelineData()]);
          
          dragState.value.status = 'success';
          alert(`Successfully converted to account: ${newAccount.name}`);
        }
        else if (newStage.entity === 'deals' && (oldStage.entity === 'accounts' || oldStage.entity === 'contacts')) {
          const newDeal = await crmApi.createDeal({
            name: `Deal with ${record.name || record.company}`,
            amount: record.value || 0,
            stage: newStageId,
            probability: newStageId === 'negotiation' ? 50 : (newStageId === 'closed-won' ? 100 : 0),
            accountId: record.accountId || record.id,
            contactId: record.accountId ? record.id : null,
            tenant_id: getTenantId()
          });
          
          await Promise.all([loadLeads(), fetchPipelineData()]);
          
          dragState.value.status = 'success';
          alert(`Successfully created deal: ${newDeal.name}`);
        }
        else if (newStage.entity === 'leads' && oldStage.entity === 'accounts') {
          // Reverse conversion: account → lead (undo mistake)
          const newLead = await crmApi.createLead({
            name: record.name || 'Unknown',
            email: record.email || '',
            phone: record.phone || '',
            company: record.name || '',
            city: record.city || record.billingCity || '',
            country: record.country || record.billingCountry || '',
            stage: newStageId,
            source: record.source || '',
            notes: record.notes || '',
            tenant_id: getTenantId()
          });

          try {
            await crmApi.deleteAccount(record.id, getTenantId());
          } catch (e) {
            // Silently ignore if deletion fails - lead is already created
          }

          await Promise.all([loadLeads(), fetchPipelineData()]);

          dragState.value.status = 'success';
          showToast('success', 'Reverted', `Converted account "${record.name}" back to lead at stage "${newStage.name}"`);
        }
        else if (newStage.entity === 'leads' && oldStage.entity === 'contacts') {
          // Reverse conversion: contact → lead (undo mistake)
          const newLead = await crmApi.createLead({
            name: record.name || `${record.firstName || ''} ${record.lastName || ''}`.trim() || 'Unknown',
            email: record.email || '',
            phone: record.phone || '',
            company: record.company || '',
            position: record.position || '',
            city: record.city || '',
            country: record.country || '',
            stage: newStageId,
            source: record.source || '',
            notes: record.notes || '',
            tenant_id: getTenantId()
          });

          try {
            await crmApi.deleteContact(record.id, getTenantId());
          } catch (e) {
            // Silently ignore if deletion fails - lead is already created
          }

          await Promise.all([loadLeads(), fetchPipelineData()]);

          dragState.value.status = 'success';
          showToast('success', 'Reverted', `Converted contact "${record.name}" back to lead at stage "${newStage.name}"`);
        }
        else {
          dragState.value = {
            status: 'error',
            record: record,
            originalStage: oldStageId,
            targetStage: newStageId,
            error: 'Invalid conversion'
          };
          alert(`Invalid conversion. Use appropriate flow.`);
        }
      } catch (error) {
        console.error('Error converting record:', error);
        
        dragState.value = {
          status: 'error',
          record: record,
          originalStage: oldStageId,
          targetStage: newStageId,
          error: error.message || 'Failed to convert record'
        };
        
        alert('Failed to convert record.');
        
        // Rollback - refresh data to restore original state
        await fetchPipelineData();
      }
    } else {
      // Standard stage update with optimistic UI
      const entityType = oldStage.entity;
      const tenantId = getTenantId();
      
      // Optimistic update - update UI immediately
      const updateRecordStage = (recordId, newStage) => {
        if (entityType === 'leads') {
          const lead = pipelineLeads.value.find(l => l.id === recordId);
          if (lead) lead.stage = newStage;
        } else if (entityType === 'contacts') {
          const contact = pipelineContacts.value.find(c => c.id === recordId);
          if (contact) contact.stage = newStage;
        } else if (entityType === 'accounts') {
          const account = pipelineAccounts.value.find(a => a.id === recordId);
          if (account) account.stage = newStage;
        } else if (entityType === 'deals') {
          const deal = pipelineDeals.value.find(d => d.id === recordId);
          if (deal) deal.stage = newStage;
        }
      };
      
      // Apply optimistic update
      updateRecordStage(record.id, newStageId);
      
      // Check if this is an account conversion stage for leads
      const isAutoConvertStage = entityType === 'leads' && accountConversionStages.value.includes(newStageId);

      try {
        // Build a minimal, schema-safe payload (avoid roundtripping mongo-internal fields)
        const cleanRecord = { ...record };
        ['_id', 'last_modified_at', 'last_modified_by', 'created_by', 'stage_history'].forEach(k => { delete cleanRecord[k]; });
        if (cleanRecord.value != null) cleanRecord.value = Number(cleanRecord.value) || 0;
        if (cleanRecord.notes != null && typeof cleanRecord.notes !== 'string') cleanRecord.notes = String(cleanRecord.notes || '');
        // Make API call
        if (entityType === 'leads') {
          await crmApi.updateLead(record.id, { ...cleanRecord, stage: newStageId, tenant_id: tenantId }, tenantId);
        }
        else if (entityType === 'contacts') {
          await crmApi.updateContact(record.id, { ...cleanRecord, stage: newStageId, tenant_id: tenantId }, tenantId);
        }
        else if (entityType === 'accounts') {
          await crmApi.updateAccount(record.id, { ...cleanRecord, stage: newStageId, tenant_id: tenantId }, tenantId);
        }
        else if (entityType === 'deals') {
          await crmApi.updateDeal(record.id, { ...cleanRecord, stage: newStageId, tenant_id: tenantId }, tenantId);
        }
        
        // Log activity for leads
        if (entityType === 'leads') {
          try {
            await crmApi.logLeadActivity(record.id, {
              tenant_id: getTenantId(),
              action: 'stage_changed',
              notes: `Stage changed to "${getStageName(newStageId)}"`
            });
          } catch { }
        }

        // Auto-convert lead to account if dropped on a conversion stage
        if (isAutoConvertStage) {
          try {
            const accountName = record.company || record.name || 'New Account';
            const newAccount = await crmApi.createAccount({
              name: accountName,
              phone: record.phone,
              email: record.email,
              industry: record.industry,
              city: record.city,
              country: record.country,
              notes: record.notes,
              source: record.source,
              stage: newStageId,
              convertedFromLeadId: record.id,
              convertedDate: new Date().toISOString(),
              tenant_id: tenantId,
              branch_id: record.branch_id || null
            }, tenantId);
            const newAccountId = newAccount?.id || newAccount?._id;
            
            // Also create a contact linked to this account
            if (newAccountId) {
              try {
                const nameParts = (record.name || '').split(' ');
                await crmApi.createContact({
                  name: record.name || 'Converted Contact',
                  firstName: nameParts[0] || '',
                  lastName: nameParts.slice(1).join(' ') || '',
                  email: record.email || '',
                  phone: record.phone || '',
                  accountId: newAccountId,
                  convertedFromLeadId: record.id,
                  tenant_id: tenantId
                }, tenantId);
              } catch (ce) { console.warn('Auto-contact creation failed:', ce); }
              
              // Also create a deal linked to this account
              try {
                await crmApi.createDeal({
                  name: `${record.name || 'Converted'} Deal`,
                  value: Number(record.value || 0),
                  stage: 'closed-won',
                  probability: 100,
                  accountId: newAccountId,
                  convertedFromLeadId: record.id,
                  tenant_id: tenantId
                });
              } catch (de) { console.warn('Auto-deal creation failed:', de); }
            }
            
            // Link the lead to the account so it shows as a contact (don't delete)
            try {
              const currentAccount = await crmApi.getAccount(newAccountId, tenantId);
              const existingLeadIds = Array.isArray(currentAccount?.associatedLeadIds) ? currentAccount.associatedLeadIds : [];
              if (!existingLeadIds.includes(record.id)) {
                await crmApi.updateAccount(newAccountId, {
                  ...currentAccount,
                  associatedLeadIds: [...existingLeadIds, record.id],
                  tenant_id: tenantId
                }, tenantId);
              }
            } catch (linkErr) { console.warn('Link lead to account failed:', linkErr); }
            
            // Mark the lead as converted (keep it visible under accounts as contact)
            try {
              await crmApi.updateLead(record.id, { 
                archived: true, 
                stage: newStageId, 
                isConverted: true,
                convertedAt: new Date().toISOString(),
                convertedAccountId: newAccountId,
                tenant_id: tenantId 
              }, tenantId);
              pipelineLeads.value = pipelineLeads.value.filter(l => l.id !== record.id);
              leads.value = (leads.value || []).filter(l => l.id !== record.id);
            } catch (updateErr) {
              console.warn('Lead update after conversion failed:', updateErr);
            }
            showToast('success', 'Account Created', `"${record.name}" was automatically converted to account "${accountName}"`);
          } catch (convErr) {
            console.error('Auto-convert to account failed:', convErr);
            showToast('error', 'Conversion Failed', `Lead moved to ${getStageName(newStageId)} but account creation failed`);
          }
        }
        
        // Mark as success
        dragState.value.status = 'success';
        
        // Refresh data to sync with server
        await fetchPipelineData();
      } catch (error) {
        console.error('Error updating stage:', error);
        
        // Rollback optimistic update
        updateRecordStage(record.id, oldStageId);
        
        dragState.value = {
          status: 'error',
          record: record,
          originalStage: oldStageId,
          targetStage: newStageId,
          error: error.message || 'Failed to update stage'
        };
        
        alert('Failed to update stage.');
        
        // Refresh to ensure UI is in sync
        await fetchPipelineData();
      }
    }
    
    // Reset drag state after a short delay
    setTimeout(() => {
      draggingLead.value = null;
      dragState.value = {
        status: 'idle',
        record: null,
        originalStage: null,
        targetStage: null,
        error: null
      };
    }, 1000);
  }

  function getCustomerTagClass(tag) { if (tag === 'VIP') return 'bg-yellow-100 text-yellow-700'; if (tag === 'Active') return 'bg-green-100 text-green-700'; if (tag === 'Dormant') return 'bg-gray-100 text-gray-700'; return 'bg-gray-100 text-gray-700'; }
  function getCommunicationBorderClass(type) { if (type === 'email' || type === 'call') return 'border-[#2F2E8B]'; if (type === 'whatsapp') return 'border-gray-400'; if (type === 'meeting') return 'border-yellow-500'; return 'border-gray-300'; }
  function getCommunicationIcon(type) { if (type === 'email') return 'fas fa-envelope text-[#2F2E8B]'; if (type === 'call') return 'fas fa-phone text-[#2F2E8B]'; if (type === 'whatsapp') return 'fab fa-whatsapp text-gray-600'; if (type === 'meeting') return 'fas fa-handshake text-yellow-600'; return 'fas fa-comment text-gray-600'; }

  // Pending documents staged during Add-Lead before the lead exists.
  // Each entry: { id, file: File, name, category, description }
  const pendingLeadDocuments = ref([]);

  function addPendingLeadDocument(file, meta = {}) {
    if (!file) return;
    pendingLeadDocuments.value.push({
      id: `pend-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      name: meta.name || file.name,
      category: meta.category || 'other',
      description: meta.description || ''
    });
  }

  function removePendingLeadDocument(id) {
    const idx = pendingLeadDocuments.value.findIndex(d => d.id === id);
    if (idx > -1) pendingLeadDocuments.value.splice(idx, 1);
  }

  function clearPendingLeadDocuments() {
    pendingLeadDocuments.value = [];
  }

  async function uploadPendingLeadDocuments(recordType, recordId) {
    if (!recordId || !pendingLeadDocuments.value.length) return;
    const tenantId = getTenantId();
    const items = [...pendingLeadDocuments.value];
    for (const item of items) {
      try {
        const fd = new FormData();
        fd.append('file', item.file);
        fd.append('name', item.name || item.file.name);
        fd.append('category', item.category || 'other');
        fd.append('linked_to_type', recordType);
        fd.append('linked_to_id', recordId);
        if (item.description) fd.append('description', item.description);
        await documentsApi.uploadDocument(fd, tenantId);
        // Log activity for each uploaded document
        try {
          await crmApi.logLeadActivity(recordId, {
            tenant_id: tenantId,
            action: 'document:upload',
            notes: `Document "${item.name || item.file.name}" uploaded (${item.category || 'other'})`,
            timestamp: new Date().toISOString()
          });
        } catch (actErr) { console.warn('Failed to log document activity', actErr); }
      } catch (e) {
        console.error('Failed to upload pending document', item.name, e);
      }
    }
    clearPendingLeadDocuments();
  }

  async function submitLead() {
    isSubmitting.value = true; const tenantId = getTenantId();
    try {
      if (!canAssignCrm.value) {
        // User can't reassign — force ownership to themselves (or preserve original on edit)
        const selfEmail = getUserEmail() || '';
        if (leadModalTitle.value === 'Edit Lead' && leadForm.value.id) {
          // Preserve existing assignedTo on edit; do not allow changes
          // (rely on backend to enforce as defense-in-depth)
          leadForm.value.assignedTo = leadForm.value.assignedTo || selfEmail;
        } else {
          leadForm.value.assignedTo = selfEmail;
        }
      } else if (!leadForm.value.assignedTo) {
        // Default: assign to the current user who's creating the lead
        const selfEmail = getUserEmail() || '';
        if (selfEmail) {
          leadForm.value.assignedTo = selfEmail;
        } else {
          const owner = tenantUsers.value.find(u => u.role === 'owner');
          if (owner) leadForm.value.assignedTo = owner.email;
        }
      }
      const cleanedLocation = { ...leadForm.value.location }; if (!cleanedLocation.lat || !cleanedLocation.lng) { cleanedLocation.lat = null; cleanedLocation.lng = null; } else { cleanedLocation.lat = Number(cleanedLocation.lat); cleanedLocation.lng = Number(cleanedLocation.lng); }
      let createdAtISO = null; if (leadForm.value.created_at) { try { createdAtISO = new Date(leadForm.value.created_at).toISOString(); } catch { } }
      const payload = { ...leadForm.value, location: cleanedLocation, created_at: createdAtISO, tenant_id: tenantId, branch_id: selectedBranch.value || null };
      // Strip server-managed / MongoDB-internal fields that should never be roundtripped
      ['_id', 'last_modified_at', 'last_modified_by', 'created_by', 'lead_activities', 'stage_history'].forEach(k => { delete payload[k]; });
      // Ensure numeric fields are numbers (Pydantic strict mode rejects strings)
      payload.value = payload.value === '' || payload.value == null ? 0 : Number(payload.value) || 0;
      if (payload.cac != null && payload.cac !== '') payload.cac = Number(payload.cac) || 0;
      // Ensure string fields aren't accidentally objects/arrays
      if (payload.notes != null && typeof payload.notes !== 'string') payload.notes = String(payload.notes || '');
      // Detect auto-convert-to-account stage selection (e.g. closed-won)
      const targetStage = (payload.stage || '').toString().toLowerCase();
      const shouldAutoConvert = accountConversionStages.value.includes(targetStage);
      let savedLead = null; let isCreate = false;
      const trackedFields = ['name','email','phone','company','position','priority','stage','value','source','assignedTo','city','country','address','areaName','website','linkedin','twitter','facebook','instagram','tpin','cac'];
      if (leadModalTitle.value === 'Edit Lead' && leadForm.value.id) { await crmApi.updateLead(leadForm.value.id, payload, tenantId); showToast('success', 'Lead Updated', `Successfully updated ${leadForm.value.name}`); savedLead = { ...leadForm.value, ...payload }; await logAudit('update', 'crm', { resource_type: 'lead', resource_id: leadForm.value.id, name: leadForm.value.name }); 
        // Log detailed field changes
        const changes = [];    
        trackedFields.forEach(f => {
          const oldVal = leadOriginalSnapshot.value[f];
          const newVal = payload[f];
          const oldStr = oldVal != null ? String(oldVal) : '';
          const newStr = newVal != null ? String(newVal) : '';
          if (oldStr !== newStr) {
            changes.push(`${f.toUpperCase()}: "${oldStr || '(empty)'}" → "${newStr || '(empty)'}"`);
          }
        });
        if (changes.length) {
          try {
            const tenantIdInner = getTenantId();
            crmApi.logLeadActivity(leadForm.value.id, {
              tenant_id: tenantIdInner,
              action: 'updated',
              notes: 'Changes: ' + changes.join('; '),
              timestamp: new Date().toISOString()
            }).catch(() => {});
          } catch (e) { /* non-fatal */ }
        }
      }
      else { const newLead = await crmApi.createLead(payload); showToast('success', 'Lead Created', `Successfully created ${leadForm.value.name}`); savedLead = newLead; isCreate = true; await logAudit('create', 'crm', { resource_type: 'lead', name: leadForm.value.name, stage: payload.stage }); 
        // Log creation activity with field details
        if (newLead && newLead.id) {
          try {
            const createdFields = [];
            trackedFields.forEach(f => {
              const val = payload[f];
              if (val != null && val !== '') {
                createdFields.push(`${f.toUpperCase()}: "${val}"`);
              }
            });
            crmApi.logLeadActivity(newLead.id, {
              tenant_id: tenantId,
              action: 'created',
              notes: 'Lead created — ' + createdFields.join('; '),
              timestamp: new Date().toISOString()
            }).catch(() => {});
          } catch (e) { /* non-fatal */ }
        }
      }
      // Upload any pending documents staged before the lead existed
      if (isCreate && savedLead && savedLead.id && pendingLeadDocuments.value.length) {
        try {
          await uploadPendingLeadDocuments('lead', savedLead.id);
          showToast('success', 'Documents Attached', `Uploaded ${pendingLeadDocuments.value.length || ''} document(s) to ${savedLead.name}`.trim());
        } catch (e) { console.error('Failed to upload pending lead documents', e); }
      }
      // Auto-convert lead to account when the user picked a conversion stage (e.g. Closed Won)
      if (shouldAutoConvert && savedLead && savedLead.id) {
        try {
          const accountName = payload.company || payload.name || savedLead.name || 'New Account';
          await crmApi.createAccount({
            name: accountName,
            phone: payload.phone,
            email: payload.email,
            industry: payload.industry,
            city: payload.city,
            country: payload.country,
            notes: payload.notes,
            source: payload.source,
            stage: targetStage,
            convertedFromLeadId: savedLead.id,
            convertedDate: new Date().toISOString(),
            tenant_id: tenantId,
            branch_id: payload.branch_id || null
          }, tenantId);
          // Delete the original lead now that the account exists
          try { await crmApi.deleteLead(savedLead.id, tenantId); } catch (archErr) { console.warn('Lead cleanup after conversion failed:', archErr); }
          showToast('success', 'Lead Converted', `"${savedLead.name || payload.name}" was automatically converted to account "${accountName}"`);
          await fetchPipelineData();
        } catch (convErr) {
          console.error('Auto-convert to account failed:', convErr);
          showToast('error', 'Conversion Failed', 'Lead saved but account creation failed.');
        }
      }
      emitCrmEvent('crm:leads:changed');
      await loadLeads(); closeLeadModal();
    } catch (err) { console.error('Error saving lead:', err); showToast('error', 'Failed to Save Lead', err.message); }
    finally { isSubmitting.value = false; }
  }

  async function deleteLead(lead) { if (!confirm(`Delete lead ${lead.name}?`)) return; showDetailModal.value = false; const tenantId = getTenantId(); try { await crmApi.deleteLead(lead.id, tenantId); await logAudit('delete', 'crm', { resource_type: 'lead', resource_id: lead.id, name: lead.name }); await loadLeads(); showToast('success', 'Lead Deleted', `Successfully deleted ${lead.name}`); } catch (err) { console.error('Error deleting lead:', err); showToast('error', 'Failed to Delete Lead', err.message); } }

  async function submitCustomer() {
    isSubmitting.value = true; const tenantId = getTenantId();
    try {
      const cleanedLocation = { ...leadForm.value.location }; if (!cleanedLocation.lat || !cleanedLocation.lng) { cleanedLocation.lat = null; cleanedLocation.lng = null; } else { cleanedLocation.lat = Number(cleanedLocation.lat); cleanedLocation.lng = Number(cleanedLocation.lng); }
      let createdAtISO = null; if (leadForm.value.created_at) { try { createdAtISO = new Date(leadForm.value.created_at).toISOString(); } catch { } }
      const payload = { ...leadForm.value, location: cleanedLocation, created_at: createdAtISO, tenant_id: tenantId, branch_id: selectedBranch.value || null };
      if (leadModalTitle.value === 'Edit Customer' && leadForm.value.id) { await crmApi.updateCustomer(leadForm.value.id, payload, tenantId); await logAudit('update', 'crm', { resource_type: 'customer', resource_id: leadForm.value.id, name: leadForm.value.name }); }
      else { await crmApi.createCustomer(payload); await logAudit('create', 'crm', { resource_type: 'customer', name: leadForm.value.name }); }
      customers.value = (await crmApi.getCustomers(tenantId)) || []; closeLeadModal();
    } catch (err) { alert('Error saving customer'); console.error(err); }
    finally { isSubmitting.value = false; }
  }

  async function deleteCustomer(customer) { if (!confirm(`Delete customer ${customer.name}?`)) return; const tenantId = getTenantId(); try { const res = await fetch(`${API_BASE_URL}/crm/customers/${customer.id}?tenant_id=${tenantId}`, { method: 'DELETE' }); if (!res.ok) throw new Error('Failed to delete customer'); await logAudit('delete', 'crm', { resource_type: 'customer', resource_id: customer.id, name: customer.name }); const customersRes = await fetch(`${API_BASE_URL}/crm/customers?tenant_id=${tenantId}`); customers.value = await customersRes.json(); } catch (err) { alert('Error deleting customer'); console.error(err); } }
  async function sendCommunication() { isSending.value = true; const tenantId = getTenantId(); try { const payload = { ...communicationForm.value, tenant_id: tenantId, branch_id: selectedBranch.value || null }; await crmApi.createCommunication(payload); communications.value = (await crmApi.getCommunications(tenantId)) || []; closeCommunicationModal(); } catch (err) { alert('Error sending communication'); console.error(err); } finally { isSending.value = false; } }
  async function deleteCommunication(comm) { if (!confirm(`Delete communication with ${comm.contactName}?`)) return; const tenantId = getTenantId(); try { await crmApi.deleteCommunication(comm.id, tenantId); communications.value = (await crmApi.getCommunications(tenantId)) || []; } catch (err) { alert('Error deleting communication'); console.error(err); } }
  async function sendReminder() { if (!selectedLead.value) return; const tenantId = getTenantId(); const token = localStorage.getItem('token') || ''; try { const res = await fetch(`${API_BASE_URL}/crm/_admin/trigger-stale-reminder?tenant_id=${tenantId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' } }); if (!res.ok) throw new Error('Failed to trigger reminder'); leadActivities.value = (await crmApi.getLeadActivities(selectedLead.value.id, tenantId)) || []; alert('Reminder triggered'); } catch (e) { console.error('Failed to send reminder', e); alert('Failed to send reminder'); } }

  function openLeadModal() { console.log('[CRMModule.js] openLeadModal() called'); leadModalTitle.value = 'Add Lead'; showLeadModal.value = true; const now = new Date(); const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16); leadForm.value = { name: '', email: '', phone: '', company: '', position: '', priority: '', stage: 'new', value: 0, source: '', assignedTo: '', notes: '', created_at: localDateTime, city: '', country: '', address: '', areaName: '', website: '', linkedin: '', twitter: '', facebook: '', instagram: '', tpin: '', location: { lat: null, lng: null } }; console.log('[CRMModule.js] showLeadModal set to:', showLeadModal.value); nextTick(() => { initLeadMap(); }); }
  function openCustomerModal() { leadModalTitle.value = 'Add Customer'; showLeadModal.value = true; const now = new Date(); const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16); leadForm.value = { name: '', email: '', phone: '', company: '', position: '', priority: '', stage: '', value: 0, source: '', assignedTo: '', notes: '', created_at: localDateTime, city: '', country: '', address: '', areaName: '', website: '', linkedin: '', twitter: '', facebook: '', instagram: '', tpin: '', location: { lat: null, lng: null } }; nextTick(() => { initLeadMap(); }); }
  function openCommunicationModal() { showCommunicationModal.value = true; communicationForm.value = { contactId: '', type: 'email', subject: '', message: '' }; }
  function openBulkUpload() {
    console.log('[CRMModule.js] openBulkUpload() called');
    showBulkUploadModal.value = true;
    console.log('[CRMModule.js] showBulkUploadModal set to:', showBulkUploadModal.value);
  }

  function openImportModal() {
    console.log('[CRMModule.js] openImportModal() called');
    showImportModal.value = true;
    importStep.value = 1;
    selectedFile.value = null;
    console.log('[CRMModule.js] showImportModal set to:', showImportModal.value);
  }

  function closeLeadModal() { showLeadModal.value = false; isSubmitting.value = false; clearPendingLeadDocuments(); }

  function openNewEmail() { emailForm.value = { from: getUserEmail(), recipients: [], cc: '', bcc: '', subject: '', body: '', attachments: [], linkedRecord: null, usePersonalEmail: false, scheduledTime: null }; showEmailModal.value = true; showCc.value = false; showBcc.value = false; showLinkRecord.value = false; showTemplates.value = false; }
  function closeEmailModal() { showEmailModal.value = false; }
  function minimizeEmail() { console.log('Minimize email'); }
  function maximizeEmail() { console.log('Maximize email'); }
  function toggleEmailSource() { emailForm.value.usePersonalEmail = !emailForm.value.usePersonalEmail; emailForm.value.from = emailForm.value.usePersonalEmail ? getUserEmail() : `${getUserEmail().split('@')[0]}@crm.uniplexity.ai`; }

  function searchRecipients() {
    if (recipientSearch.value.trim().length < 2) { filteredRecipients.value = []; return; }
    const query = recipientSearch.value.toLowerCase();
    const allContacts = [...leads.value.map(l => ({ id: l.id, name: l.name, email: l.email, type: 'lead' }))];
    filteredRecipients.value = allContacts.filter(c => c.name?.toLowerCase().includes(query) || c.email?.toLowerCase().includes(query)).slice(0, 10);
  }

  function addRecipient(contact) {
    if (!emailForm.value.recipients.find(r => r.email === contact.email)) {
      emailForm.value.recipients.push(contact);
      if (emailForm.value.recipients.length === 1) { emailForm.value.linkedRecord = { id: contact.id, name: contact.name, type: contact.type }; }
    }
    recipientSearch.value = ''; showRecipientDropdown.value = false;
  }

  function removeRecipient(index) { emailForm.value.recipients.splice(index, 1); }
  function getRecordsByType(type) { switch (type) { case 'lead': case 'contact': return leads.value; case 'account': return pipelineAccounts.value; case 'deal': return pipelineDeals.value; default: return []; } }
  function getRecordIcon(type) { const icons = { lead: 'fas fa-user-plus', contact: 'fas fa-address-book', account: 'fas fa-building', deal: 'fas fa-handshake' }; return icons[type] || 'fas fa-file'; }
  function insertTemplate(template) { emailForm.value.body = template.body; emailForm.value.subject = template.name; showTemplates.value = false; }

  async function sendEmail() {
    if (!canSendEmail.value) return;
    try {
      const emailData = { tenant_id: getTenantId(), from_email: emailForm.value.from || getUserEmail(), recipients: emailForm.value.recipients, cc: emailForm.value.cc || null, bcc: emailForm.value.bcc || null, subject: emailForm.value.subject, body: emailForm.value.body, linked_record: emailForm.value.linkedRecord, sent_by: getUserEmail(), use_authenticated_domain: !emailForm.value.usePersonalEmail };
      const response = await emailApi.sendCRMEmail(emailData);
      if (response.status === 'sent') {
        emails.value.unshift({ id: response.id, from: emailData.from_email, to: emailData.recipients.map(r => r.email).join(', '), subject: emailData.subject, body: emailData.body, sent_by: getUserEmail(), timestamp: new Date().toISOString(), folder: 'sent', opens: 0, clicks: 0, hasAttachment: emailForm.value.attachments.length > 0, linkedTo: emailData.linked_record, preview: emailData.body.substring(0, 100) + '...' });
        emailStats.value.sentToday++; showToast('success', 'Email Sent', 'Your email has been sent successfully!'); closeEmailModal(); await loadEmails();
      } else { throw new Error(response.message || 'Failed to send email'); }
    } catch (error) { console.error('Failed to send email:', error); showToast('error', 'Failed to Send Email', error.message); }
  }

  async function scheduleEmail() {
    if (!canSendEmail.value) return;
    try {
      const scheduledTime = prompt('Enter scheduled time (format: YYYY-MM-DD HH:MM):'); if (!scheduledTime) return;
      const emailData = { tenant_id: getTenantId(), from_email: emailForm.value.from || getUserEmail(), recipients: emailForm.value.recipients, cc: emailForm.value.cc || null, bcc: emailForm.value.bcc || null, subject: emailForm.value.subject, body: emailForm.value.body, linked_record: emailForm.value.linkedRecord, sent_by: getUserEmail(), use_authenticated_domain: !emailForm.value.usePersonalEmail, scheduled_time: new Date(scheduledTime).toISOString() };
      const response = await emailApi.scheduleEmail(emailData);
      if (response.status === 'scheduled') { emailStats.value.scheduled++; alert(`✅ Email scheduled for ${scheduledTime}`); closeEmailModal(); await loadEmails(); }
    } catch (error) { console.error('Failed to schedule email:', error); alert(`❌ Failed to schedule email: ${error.message}`); }
  }

  async function loadEmails() { try { const response = await emailApi.getCRMEmails(getTenantId(), emailListFilter.value); emails.value = response.emails || []; } catch (error) { console.error('Failed to load emails:', error); } }
  async function loadEmailStats() { try { const statsRes = await emailApi.getEmailStats(getTenantId(), getUserEmail()); emailStats.value = statsRes; } catch (error) { console.error('Failed to load email stats:', error); } }
  function openEmailDetail(email) { console.log('Opening email:', email); }
  function formatEmailDate(timestamp) { const date = new Date(timestamp); const now = new Date(); const diffMs = now - date; const diffMins = Math.floor(diffMs / 60000); const diffHours = Math.floor(diffMs / 3600000); const diffDays = Math.floor(diffMs / 86400000); if (diffMins < 1) return 'Just now'; if (diffMins < 60) return `${diffMins}m ago`; if (diffHours < 24) return `${diffHours}h ago`; if (diffDays < 7) return `${diffDays}d ago`; return date.toLocaleDateString(); }

  const filteredEmails = computed(() => emails.value.filter(e => e.folder === emailListFilter.value));
  const canSendEmail = computed(() => emailForm.value.recipients.length > 0 && emailForm.value.subject.trim() !== '' && emailForm.value.body.trim() !== '');

  const filteredMeetings = computed(() => meetingFilter.value === 'all' ? meetings.value : meetings.value.filter(m => m.status === meetingFilter.value));
  const currentMonthYear = computed(() => currentCalendarDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  const calendarDays = computed(() => {
    const date = new Date(currentCalendarDate.value); const year = date.getFullYear(); const month = date.getMonth();
    const firstDay = new Date(year, month, 1); const lastDay = new Date(year, month + 1, 0); const daysInMonth = lastDay.getDate(); const startingDayOfWeek = firstDay.getDay();
    const days = []; const today = new Date(); today.setHours(0, 0, 0, 0);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) { const dayDate = new Date(year, month - 1, prevMonthLastDay - i); days.push({ date: prevMonthLastDay - i, isCurrentMonth: false, isToday: false, fullDate: dayDate, meetings: getMeetingsForDate(dayDate) }); }
    for (let i = 1; i <= daysInMonth; i++) { const dayDate = new Date(year, month, i); const isToday = dayDate.getTime() === today.getTime(); days.push({ date: i, isCurrentMonth: true, isToday, fullDate: dayDate, meetings: getMeetingsForDate(dayDate) }); }
    const remainingDays = 42 - days.length; for (let i = 1; i <= remainingDays; i++) { const dayDate = new Date(year, month + 1, i); days.push({ date: i, isCurrentMonth: false, isToday: false, fullDate: dayDate, meetings: getMeetingsForDate(dayDate) }); }
    return days;
  });

  function getMeetingsForDate(date) { const dateStr = date.toDateString(); return meetings.value.filter(meeting => { const dt = meeting.start_datetime; const ts = (typeof dt === 'string' && (dt.endsWith('Z') || dt.includes('+') || dt.length === 10)) ? dt : (typeof dt === 'string' ? `${dt}Z` : dt); return new Date(ts).toDateString() === dateStr; }); }
  function previousMonth() { const date = new Date(currentCalendarDate.value); date.setMonth(date.getMonth() - 1); currentCalendarDate.value = date; }
  function nextMonth() { const date = new Date(currentCalendarDate.value); date.setMonth(date.getMonth() + 1); currentCalendarDate.value = date; }
  function openDayMeetings(day) { meetingView.value = 'list'; meetingFilter.value = 'all'; }
  function openNewMeeting() { editingMeeting.value = null; meetingForm.value = { title: '', meeting_type: 'call', description: '', start_datetime: '', end_datetime: '', location_type: 'virtual', location: '', virtual_meeting_url: '', participants: [], linkedRecordType: '', linkedRecordId: '', reminder15min: true, reminder1hour: false, reminder1day: false, lat: null, lng: null, distance_km: null }; newParticipant.value = { name: '', email: '', type: 'contact' }; showMeetingModal.value = true; fetchPipelineData().catch(err => console.warn('[CRMModule] Failed to load pipeline data for meeting modal', err)); if (!leads.value.length) loadLeads().catch(err => console.warn('[CRMModule] Failed to load leads for meeting modal', err)); }
  function closeMeetingModal() {
    console.log('[CRMModule] Closing Meeting Modal');
    showMeetingModal.value = false;
    editingMeeting.value = null;
    // Reset form to ensure clean state for next open
    meetingForm.value = {
      title: '', meeting_type: 'call', description: '', start_datetime: '', end_datetime: '',
      location_type: 'virtual', location: '', virtual_meeting_url: '',
      participants: [], linkedRecordType: '', linkedRecordId: '',
      reminder15min: true, reminder1hour: false, reminder1day: false,
      lat: null, lng: null, distance_km: null
    };
  }

  function editMeeting(meeting) {
    editingMeeting.value = meeting;
    const has15min = meeting.reminders?.some(r => r.minutes_before === 15); const has1hour = meeting.reminders?.some(r => r.minutes_before === 60); const has1day = meeting.reminders?.some(r => r.minutes_before === 1440);
    const linkedRecord = meeting.related_records?.[0];
    meetingForm.value = { title: meeting.title, meeting_type: meeting.meeting_type, description: meeting.description || '', start_datetime: formatDateTimeForInput(meeting.start_datetime), end_datetime: formatDateTimeForInput(meeting.end_datetime), location_type: meeting.location_type, location: meeting.location || '', virtual_meeting_url: meeting.virtual_meeting_url || '', participants: meeting.participants || [], linkedRecordType: linkedRecord?.record_type || '', linkedRecordId: linkedRecord?.record_id || '', reminder15min: has15min, reminder1hour: has1hour, reminder1day: has1day, lat: meeting.lat || null, lng: meeting.lng || null, distance_km: meeting.distance_km || null };
    showMeetingModal.value = true;
    fetchPipelineData().catch(err => console.warn('[CRMModule] Failed to load pipeline data for meeting modal', err)); if (!leads.value.length) loadLeads().catch(err => console.warn('[CRMModule] Failed to load leads for meeting modal', err));
  }

  function formatDateTimeForInput(dateString) { 
    if (!dateString) return '';
    const ts = (typeof dateString === 'string' && (dateString.endsWith('Z') || dateString.includes('+') || dateString.length === 10)) ? dateString : (typeof dateString === 'string' ? `${dateString}Z` : dateString);
    const date = new Date(ts); 
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    return `${year}-${month}-${day}T${hours}:${minutes}`; 
  }

  async function submitMeeting() {
    try {
      savingMeeting.value = true; 
      const reminders = []; 
      if (meetingForm.value.reminder15min) reminders.push({ type: 'email', minutes_before: 15, sent: false }); 
      if (meetingForm.value.reminder1hour) reminders.push({ type: 'email', minutes_before: 60, sent: false }); 
      if (meetingForm.value.reminder1day) reminders.push({ type: 'email', minutes_before: 1440, sent: false });
      
      if (!meetingForm.value.start_datetime || !meetingForm.value.end_datetime) throw new Error("Start and End times are required");
      
      const related_records = []; 
      if (meetingForm.value.linkedRecordType && meetingForm.value.linkedRecordId) { 
        related_records.push({ 
          record_type: meetingForm.value.linkedRecordType, 
          record_id: meetingForm.value.linkedRecordId, 
          record_name: getRecordNameById(meetingForm.value.linkedRecordType, meetingForm.value.linkedRecordId) || 'Unknown Record' 
        }); 
      }
      
      const cleanParticipants = (meetingForm.value.participants || [])
        .filter(p => p.name && p.name.trim() !== '')
        .map(p => ({ 
          name: p.name, 
          email: p.email || null, 
          type: p.type || 'contact', 
          user_id: p.user_id || null, 
          contact_id: p.contact_id || null 
        }));

      // Convert local datetime-local input to ISO string while preserving the local time selected by user
      const startDateTime = new Date(meetingForm.value.start_datetime).toISOString();
      const endDateTime = new Date(meetingForm.value.end_datetime).toISOString();

      const meetingData = { 
        tenant_id: getTenantId(), 
        title: meetingForm.value.title, 
        meeting_type: meetingForm.value.meeting_type, 
        description: meetingForm.value.description || null, 
        start_datetime: startDateTime, 
        end_datetime: endDateTime, 
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
        location_type: meetingForm.value.location_type, 
        location: meetingForm.value.location || null, 
        lat: meetingForm.value.lat || null,
        lng: meetingForm.value.lng || null,
        distance_km: meetingForm.value.distance_km || null,
        virtual_meeting_url: meetingForm.value.virtual_meeting_url || null, 
        organizer_id: getUserEmail(), 
        organizer_name: getUserName() || 'Unknown Organizer', 
        participants: cleanParticipants, 
        related_records, 
        reminders, 
        created_by: getUserEmail(), 
        branch_id: selectedBranch.value || null,
        status: editingMeeting.value ? editingMeeting.value.status : 'scheduled'
      };

      let result = editingMeeting.value 
        ? await meetingsApi.updateMeeting(editingMeeting.value.id, meetingData) 
        : await meetingsApi.createMeeting(meetingData);

      if (result.success) { 
        showToast('success', editingMeeting.value ? 'Meeting Updated' : 'Meeting Scheduled', editingMeeting.value ? 'Meeting has been updated successfully!' : 'Meeting has been scheduled successfully!'); 
        closeMeetingModal(); 
        await loadMeetings(); 
        await loadMeetingStats(); 
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) { 
      console.error('Error saving meeting:', error); 
      showToast('error', 'Failed to Save Meeting', error.message); 
    } finally { 
      savingMeeting.value = false; 
    }
  }

  function addParticipant() { if (!newParticipant.value.name.trim()) { showToast('warning', 'Missing Information', 'Please enter participant name'); return; } meetingForm.value.participants.push({ name: newParticipant.value.name, email: newParticipant.value.email, type: newParticipant.value.type }); showToast('info', 'Participant Added', `${newParticipant.value.name} has been added to the meeting`, 2000); newParticipant.value = { name: '', email: '', type: 'contact' }; }
  function removeParticipant(index) { meetingForm.value.participants.splice(index, 1); }
  async function deleteCommunicationRecord(comm) { if (!confirm('Are you sure you want to delete this log?')) return; try { const tenantId = getTenantId(); await crmApi.deleteCommunication(comm.id, tenantId); communications.value = communications.value.filter(c => c.id !== comm.id); showToast('success', 'Deleted', 'Log deleted successfully'); } catch (e) { console.error('Failed to delete communication', e); showToast('error', 'Error', 'Failed to delete log'); } }
  function getRecordsForType(type) {
    if (type === 'lead') return leads.value;
    if (type === 'account') return pipelineAccounts.value;
    if (type === 'contact') return pipelineContacts.value.map(c => ({
      ...c,
      name: c.name || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.email || 'Unknown'
    }));
    if (type === 'deal') return pipelineDeals.value;
    return [];
  }
  function getRecordNameById(type, id) { const records = getRecordsForType(type); const record = records.find(r => r.id === id); return record?.name || record?.title || 'Unknown'; }
  async function completeMeetingAction(meetingId) { const outcome = prompt('Enter meeting outcome (optional):'); try { const result = await meetingsApi.completeMeeting(meetingId, outcome); if (result.success) { alert('Meeting marked as completed!'); await loadMeetings(); await loadMeetingStats(); } } catch (error) { console.error('Error completing meeting:', error); alert('Failed to complete meeting: ' + error.message); } }
  async function cancelMeetingAction(meetingId) { const reason = prompt('Enter cancellation reason (optional):'); if (reason === null) return; try { const result = await meetingsApi.cancelMeeting(meetingId, reason); if (result.success) { showToast('info', 'Meeting Cancelled', 'The meeting has been cancelled.'); await loadMeetings(); await loadMeetingStats(); } } catch (error) { console.error('Error cancelling meeting:', error); showToast('error', 'Cancellation Failed', error.message); } }

  async function deleteMeeting(meetingId) {
    if (!confirm('Are you sure you want to delete this meeting? This action cannot be undone.')) return;
    try {
      const tenantId = getTenantId();
      const result = await meetingsApi.deleteMeeting(meetingId, tenantId);
      if (result.success) { showToast('success', 'Meeting Deleted', 'The meeting has been permanently deleted.'); await loadMeetings(); await loadMeetingStats(); if (editingMeeting.value && editingMeeting.value.id === meetingId) closeMeetingModal(); }
    } catch (error) { console.error('Error deleting meeting:', error); showToast('error', 'Deletion Failed', error.message); }
  }

  async function deleteVisit(visitId) { if (!confirm('Are you sure you want to delete this visit?')) return; try { const tenantId = getTenantId(); await crmApi.deleteVisit(visitId, tenantId); showToast('success', 'Visit Deleted', 'Visit has been removed.'); await loadVisits(); } catch (err) { console.error('Failed to delete visit:', err); showToast('error', 'Error', 'Failed to delete visit'); } }
  function openMeetingDetail(meeting) { editMeeting(meeting); }

  async function loadMeetings() { try { const tenantId = getTenantId(); const filters = { tenant_id: tenantId, limit: 100, branch_id: safeBranchId.value }; if (meetingFilter.value !== 'all') filters.status = meetingFilter.value; const result = await meetingsApi.getMeetings(filters); if (result.success) meetings.value = result.data || []; } catch (error) { console.error('Failed to load meetings:', error); } }
  async function loadMeetingStats() { try { const tenantId = getTenantId(); const result = await meetingsApi.getMeetingStats(tenantId); if (result.success) meetingStats.value = result.data; } catch (error) { console.error('Failed to load meeting stats:', error); } }
  function formatTime(dateString) { if (!dateString) return '-'; const ts = (typeof dateString === 'string' && (dateString.endsWith('Z') || dateString.includes('+') || dateString.length === 10)) ? dateString : (typeof dateString === 'string' ? `${dateString}Z` : dateString); const date = new Date(ts); return isNaN(date.getTime()) ? '-' : date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); }
  function generateZoomLink() { alert('Zoom integration coming soon! Please paste your Zoom link manually.'); }
  function generateGoogleMeetLink() { alert('Google Meet integration coming soon! Please paste your Meet link manually.'); }
  function closeCommunicationModal() { showCommunicationModal.value = false; isSending.value = false; }

  function editLead(lead) {
    showDetailModal.value = false;
    leadModalTitle.value = 'Edit Lead';
    const resolvedId = lead?.id || lead?._id || lead?.lead_id || null;
    leadForm.value = { name: '', email: '', phone: '', company: '', position: '', priority: '', stage: 'new', value: 0, source: '', assignedTo: '', notes: '', city: '', country: '', address: '', areaName: '', website: '', linkedin: '', twitter: '', facebook: '', instagram: '', tpin: '', location: { lat: null, lng: null }, created_at: null, ...(lead || {}), id: resolvedId };
    // Snapshot original values for change tracking
    const trackedFields = ['name','email','phone','company','position','priority','stage','value','source','assignedTo','city','country','address','areaName','website','linkedin','twitter','facebook','instagram','tpin','cac'];
    leadOriginalSnapshot.value = {};
    trackedFields.forEach(f => { leadOriginalSnapshot.value[f] = leadForm.value[f]; });
    if (leadForm.value.created_at) { try { const date = new Date(leadForm.value.created_at); leadForm.value.created_at = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16); } catch (e) { console.warn('Failed to parse created_at date', e); } }
    showLeadModal.value = true; nextTick(() => { initLeadMap(); });
  }

  function viewLead(lead) {
    selectedLead.value = lead; showDetailModal.value = true; const tenantId = getTenantId();
    if (!tenantId) { console.warn('[viewLead] No tenantId, skipping activity load'); return; }
    leadActivities.value = [];
    crmApi.getLeadActivities(lead.id, tenantId).then(acts => { leadActivities.value = Array.isArray(acts) ? acts : []; }).catch(err => { console.warn('Failed to load lead activities', err); leadActivities.value = []; });
    crmApi.getLeadNotifications(lead.id, tenantId).then(n => { leadNotifications.value = n || []; }).catch(err => { console.warn('Failed to load lead notifications', err); leadNotifications.value = []; });
    crmApi.getLeadNotes(lead.id, tenantId).then(n => { leadNotes.value = n || []; }).catch(e => { console.warn('Failed to load notes', e); leadNotes.value = []; });
    crmApi.getLeadEmails(lead.id, tenantId).then(e => { leadEmails.value = e || []; }).catch(e => { console.warn('Failed to load emails', e); leadEmails.value = []; });
    crmApi.getLeadAttachments(lead.id, tenantId).then(a => { leadAttachments.value = a || []; }).catch(e => { console.warn('Failed to load attachments', e); leadAttachments.value = []; });
    crmApi.getLeadCampaigns(lead.id, tenantId).then(c => { leadCampaigns.value = c || []; }).catch(e => { console.warn('Failed to load campaigns', e); leadCampaigns.value = []; });
  }

  async function callLead(lead) {
    const tenantId = getTenantId(); const phone = (lead && lead.phone) ? String(lead.phone).trim() : ''; const name = (lead && lead.name) ? lead.name : 'Contact';
    if (!tenantId) { alert('Unable to identify your account. Please refresh and try again.'); return; }
    const payload = { contactId: lead?.id, contactName: name, related_type: 'lead', related_id: lead?.id, type: 'call', subject: null, message: `Call initiated to ${name}`, phone, direction: 'outbound', status: 'initiated', tenant_id: tenantId };
    try {
      await crmApi.createCommunication(payload);
    } catch (commErr) { console.warn('[callLead] createCommunication failed, continuing', commErr); }
    // Always log lead activity directly to ensure it appears in the Activity tab
    try {
      await crmApi.logLeadActivity(lead.id, {
        tenant_id: tenantId,
        action: 'Phone Call',
        notes: `Outbound call to ${name}${phone ? ' (' + phone + ')' : ''}`,
        timestamp: new Date().toISOString()
      });
      leadActivities.value = (await crmApi.getLeadActivities(lead.id, tenantId)) || [];
    } catch (actErr) { console.warn('[callLead] Failed to log lead activity', actErr); }
    if (!phone) { alert(`No phone number available for ${name}`); return; }
    window.open(`tel:${encodeURIComponent(phone)}`, '_self');
    communications.value = (await crmApi.getCommunications(tenantId).catch(() => communications.value)) || communications.value;
    startCallTimer({ related_type: 'lead', related_id: lead?.id });
  }

  function emailLead(lead) {
    const email = (lead && lead.email) ? String(lead.email).trim() : ''; const name = (lead && lead.name) ? lead.name : 'Contact';
    if (!email) { alert(`No email address available for ${name}`); return; }
    showDetailModal.value = false; activeTab.value = 'emails';
    nextTick(() => { sessionStorage.setItem('emailRecipient', JSON.stringify({ id: lead?.id, name, email, type: 'lead' })); });
  }

  function openDocumentUploadForLead() { if (!selectedLead.value) { alert('No lead selected'); return; } documentUploadLinkedEntity.value = { type: 'lead', id: selectedLead.value.id, name: selectedLead.value.name }; showDocumentUploadModal.value = true; }
  function handleDocumentUploaded() { if (selectedLead.value) { const tenantId = getTenantId(); crmApi.getLeadAttachments(selectedLead.value.id, tenantId).then(a => { leadAttachments.value = a || []; showToast('success', 'Document Uploaded', 'Document has been uploaded successfully'); }).catch(e => { console.warn('Failed to reload attachments', e); showToast('error', 'Upload Error', 'Failed to refresh list'); }); } showDocumentUploadModal.value = false; }
  function whatsappLead(lead) { const tenantId = getTenantId(); const name = (lead && lead.name) ? lead.name : 'Contact'; const phone = (lead && lead.phone) ? String(lead.phone).trim() : ''; const cleaned = phone.replace(/[^+0-9]/g, ''); crmApi.startWhatsAppText({ tenantId, related_type: 'lead', related_id: lead?.id, name, phone: cleaned, text: `Hi ${name}` }); }
  function viewCustomer(customer) { alert(`Viewing customer: ${customer.name}`); }
  async function callCustomer(customer) {
    const tenantId = getTenantId(); const name = customer?.name || 'Customer'; const phone = String(customer?.phone || '').trim();
    try { await crmApi.createCommunication({ related_type: 'customer', related_id: customer?.id, contactName: name, type: 'call', message: `Call initiated to ${name}`, phone, direction: 'outbound', status: 'initiated', tenant_id: tenantId }); } catch (err) { console.warn('Failed to log call for customer', err); }
    if (!phone) { alert(`No phone number available for ${name}`); return; } window.open(`tel:${encodeURIComponent(phone)}`, '_self'); startCallTimer({ related_type: 'account', related_id: customer?.id });
  }
  function emailCustomer(customer) { alert(`Emailing ${customer.name} at ${customer.email}`); }

  function replyToCommunication(comm) {
    const contact = leads.value.find(l => l.id === comm.contactId) || null; const name = comm.contactName || contact?.name || 'Contact'; const email = contact?.email || comm.email || ''; const phoneRaw = contact?.phone || comm.phone || ''; const phone = String(phoneRaw).replace(/[^+0-9]/g, ''); const tenantId = getTenantId();
    crmApi.createCommunication({ contactId: comm.contactId || null, contactName: name, type: comm.type || 'email', subject: `Re: ${comm.subject || ''}`, message: `Replying to ${name} via ${comm.type}`, tenant_id: tenantId }).catch(() => { });
    if ((comm.type === 'email' || comm.type === 'Email') && email) { window.open(`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${comm.subject || ''}`)}`, '_blank'); return; }
    if ((comm.type === 'whatsapp' || comm.type === 'WhatsApp') && phone) { window.open(`https://wa.me/${encodeURIComponent(phone.replace(/^\+/, ''))}?text=${encodeURIComponent('Hi ' + name)}`, '_blank'); return; }
    if ((comm.type === 'call' || comm.type === 'Call') && phone) { window.open(`tel:${encodeURIComponent(phone)}`, '_self'); return; }
    alert(`Replying to ${name} via ${comm.type || 'communication'}`);
  }

  async function processNotificationsForTenant() { const tenantId = getTenantId(); const token = localStorage.getItem('token') || ''; try { const res = await fetch(`${API_BASE_URL}/notifications/process-scheduled?tenant_id=${tenantId}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' } }); if (!res.ok) throw new Error('Failed to process notifications'); if (selectedLead.value) leadNotifications.value = (await crmApi.getLeadNotifications(selectedLead.value.id, tenantId)) || []; alert('Notification processing triggered'); } catch (err) { console.error('Failed to process notifications', err); alert('Failed to process notifications'); } }

  function initLeadMap() {
    const mapEl = document.getElementById('lead-map'); if (!mapEl) return;
    if (!leadForm.value.location) leadForm.value.location = { lat: 0, lng: 0 };
    const lat = leadForm.value.location?.lat || 0; const lng = leadForm.value.location?.lng || 0;
    if (leadMap) { leadMap.remove(); leadMap = null; leadMarker = null; }
    leadMap = L.map(mapEl).setView([lat, lng], lat && lng ? 15 : 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(leadMap);
    const logoIcon = createLogoIcon();
    leadMarker = L.marker([lat, lng], { draggable: true, ...(logoIcon ? { icon: logoIcon } : {}) }).addTo(leadMap);
    leadMarker.on('dragend', async () => { const pos = leadMarker.getLatLng(); await snapAndUpdateLocation(pos.lat, pos.lng); });
    leadMap.on('click', async (e) => { await snapAndUpdateLocation(e.latlng.lat, e.latlng.lng); });
  }

  watch(() => leadForm.value.location, (loc) => { if (!leadMap || !leadMarker || !loc) return; if (loc.lat && loc.lng) { leadMarker.setLatLng([loc.lat, loc.lng]); leadMap.setView([loc.lat, loc.lng], 15); } }, { deep: true });

  async function selectSearchResult(result) { const lat = parseFloat(result.lat); const lng = parseFloat(result.lon); await snapAndUpdateLocation(lat, lng, result.display_name); locationSearchResults.value = []; locationSearchQuery.value = ''; }

  async function reverseGeocode(lat, lng) {
    try {
      const cacheKey = `${lat.toFixed(5)},${lng.toFixed(5)}`; if (reverseGeoCache.has(cacheKey)) return reverseGeoCache.get(cacheKey);
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=16&addressdetails=1`, { headers: { 'Accept-Language': navigator.language || 'en-US' } });
      if (!res.ok) throw new Error('reverse geocode failed');
      const data = await res.json(); const address = data.address || {};
      const parts = []; const area = address.neighbourhood || address.suburb || address.city_district || address.quarter || ''; if (area) parts.push(area);
      const city = address.city || address.town || address.village || address.municipality || ''; if (city) parts.push(city);
      const state = address.state || ''; const country = address.country || '';
      let display = parts.join(', '); if (!display && (state || country)) display = [state, country].filter(Boolean).join(', ');
      const payload = { displayName: display || data.display_name || '', city: city || '', country: country || '', canonicalLat: data.lat ? parseFloat(data.lat) : lat, canonicalLng: data.lon ? parseFloat(data.lon) : lng, raw: data };
      reverseGeoCache.set(cacheKey, payload); return payload;
    } catch (e) { console.warn('reverseGeocode error', e); return null; }
  }

  function roundCoordinate(value) { return Math.round(value * 100000) / 100000; }
  function roundLocationCoordinates() { if (leadForm.value.location) { if (leadForm.value.location.lat) leadForm.value.location.lat = roundCoordinate(leadForm.value.location.lat); if (leadForm.value.location.lng) leadForm.value.location.lng = roundCoordinate(leadForm.value.location.lng); if (leadMap && leadMarker && leadForm.value.location.lat && leadForm.value.location.lng) { leadMarker.setLatLng([leadForm.value.location.lat, leadForm.value.location.lng]); leadMap.setView([leadForm.value.location.lat, leadForm.value.location.lng], 15); } } }

  async function snapAndUpdateLocation(lat, lng, hintDisplayName = '') {
    const roundedLat = roundCoordinate(lat); const roundedLng = roundCoordinate(lng);
    if (leadMap && leadMarker) { leadMarker.setLatLng([roundedLat, roundedLng]); leadMap.setView([roundedLat, roundedLng], 15); }
    const rg = await reverseGeocode(roundedLat, roundedLng);
    if (rg) {
      const snappedLat = isFinite(rg.canonicalLat) ? roundCoordinate(rg.canonicalLat) : roundedLat; const snappedLng = isFinite(rg.canonicalLng) ? roundCoordinate(rg.canonicalLng) : roundedLng;
      leadForm.value.location = { lat: snappedLat, lng: snappedLng }; leadForm.value.city = leadForm.value.city || rg.city; leadForm.value.country = leadForm.value.country || rg.country; leadForm.value.areaName = hintDisplayName || rg.displayName || leadForm.value.areaName || '';
      if (leadMap && leadMarker && (Math.abs(snappedLat - roundedLat) > 1e-6 || Math.abs(snappedLng - roundedLng) > 1e-6)) { leadMarker.setLatLng([snappedLat, snappedLng]); leadMap.setView([snappedLat, snappedLng], 16); }
    } else { leadForm.value.location = { lat: roundedLat, lng: roundedLng }; }
  }

  function downloadTemplate() { try { const ws = XLSX.utils.json_to_sheet([{ name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', company: 'Example Corp', position: 'CEO', priority: 'hot', stage: 'new', value: 50000, area: 'Manhattan', city: 'New York', country: 'USA', website: 'https://example.com', source: 'website', industry: 'Technology', notes: 'Sample lead notes' }]); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Leads Template'); XLSX.writeFile(wb, 'leads_import_template.xlsx'); } catch (error) { console.error('Error downloading template:', error); alert('Failed to download template.'); } }
  function openImportModal() { showImportModal.value = true; importStep.value = 1; selectedFile.value = null; validRecords.value = []; invalidRecords.value = []; importResults.value = { success: 0, failed: 0, errors: [] }; }
  function closeImportModal() { showImportModal.value = false; importStep.value = 1; selectedFile.value = null; validRecords.value = []; invalidRecords.value = []; importResults.value = { success: 0, failed: 0, errors: [] }; loadLeads(); }
  function handleFileSelect(event) { const file = event.target.files[0]; if (!file) return; const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv']; if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) { alert('Invalid file type.'); return; } if (file.size > 10 * 1024 * 1024) { alert('File is too large.'); return; } selectedFile.value = file; }
  function removeFile() { selectedFile.value = null; if (fileInput.value) fileInput.value.value = ''; }
  function formatFileSize(bytes) { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]; }

  function getDocumentIcon(fileType) { if (!fileType) return 'fas fa-file'; const ext = fileType.toLowerCase().split('.').pop(); const icons = { pdf: 'fas fa-file-pdf', doc: 'fas fa-file-word', docx: 'fas fa-file-word', xls: 'fas fa-file-excel', xlsx: 'fas fa-file-excel', ppt: 'fas fa-file-powerpoint', pptx: 'fas fa-file-powerpoint', jpg: 'fas fa-file-image', jpeg: 'fas fa-file-image', png: 'fas fa-file-image', gif: 'fas fa-file-image', svg: 'fas fa-file-image', zip: 'fas fa-file-archive', rar: 'fas fa-file-archive', '7z': 'fas fa-file-archive', txt: 'fas fa-file-alt', csv: 'fas fa-file-csv', json: 'fas fa-file-code', xml: 'fas fa-file-code', html: 'fas fa-file-code', css: 'fas fa-file-code', js: 'fas fa-file-code', mp4: 'fas fa-file-video', avi: 'fas fa-file-video', mov: 'fas fa-file-video', mp3: 'fas fa-file-audio', wav: 'fas fa-file-audio' }; return icons[ext] || 'fas fa-file'; }
  function getActivityIcon(action) { if (!action) return 'fas fa-circle'; const a = action.toLowerCase(); const icons = { call: 'fas fa-phone', called: 'fas fa-phone', email: 'fas fa-envelope', emailed: 'fas fa-envelope', meeting: 'fas fa-calendar', met: 'fas fa-calendar', note: 'fas fa-sticky-note', noted: 'fas fa-sticky-note', task: 'fas fa-tasks', completed: 'fas fa-check-circle', created: 'fas fa-plus-circle', updated: 'fas fa-edit', deleted: 'fas fa-trash', converted: 'fas fa-exchange-alt', assigned: 'fas fa-user-tag', whatsapp: 'fab fa-whatsapp', message: 'fas fa-comment', messaged: 'fas fa-comment', document: 'fas fa-file-alt', uploaded: 'fas fa-upload', downloaded: 'fas fa-download' }; for (const [k, v] of Object.entries(icons)) { if (a.includes(k)) return v; } return 'fas fa-circle'; }

  function getCommunicationCount(type) { if (!performanceData.value || !performanceData.value.activities) return 0; const t = type.toLowerCase(); return performanceData.value.activities.filter(a => { const al = (a.action || '').toLowerCase(); if (t === 'call') return al.includes('call') || al.includes('phone'); if (t === 'email') return al.includes('email') || al.includes('mail'); if (t === 'whatsapp') return al.includes('whatsapp') || al.includes('wa'); if (t === 'meeting') return al.includes('meeting') || al.includes('meet') || al.includes('calendar'); return false; }).length; }

  async function processFile() {
    if (!selectedFile.value) return; isProcessing.value = true; validRecords.value = []; invalidRecords.value = [];
    try { const data = await readFileData(selectedFile.value); validateData(data); importStep.value = 2; } catch (error) { console.error('Error processing file:', error); alert('Failed to process file: ' + error.message); }
    finally { isProcessing.value = false; }
  }

  function readFileData(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = async (e) => { try { const workbook = await XLSX.read(new Uint8Array(e.target.result), { type: 'array' }); const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: false }); if (jsonData.length === 0) reject(new Error('File is empty.')); else resolve(jsonData); } catch (error) { reject(new Error('Failed to parse file: ' + error.message)); } }; reader.onerror = () => reject(new Error('Failed to read file.')); reader.readAsArrayBuffer(file); }); }

  function validateData(data) {
    validRecords.value = []; invalidRecords.value = [];
    data.forEach((row, index) => {
      const rowNumber = index + 2; const errors = [];
      if (!row.name || String(row.name).trim() === '') errors.push('Name is required');
      if (!row.email || String(row.email).trim() === '') errors.push('Email is required'); else if (!isValidEmail(String(row.email).trim())) errors.push('Invalid email format');
      if (row.priority && !['hot', 'warm', 'cold'].includes(String(row.priority).toLowerCase())) errors.push('Priority must be: hot, warm, or cold');
      if (row.stage && !['new', 'contacted', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].includes(String(row.stage).toLowerCase())) errors.push('Invalid stage value');
      if (row.value && isNaN(Number(row.value))) errors.push('Value must be a number');
      if (row.website && !isValidURL(String(row.website).trim())) errors.push('Invalid website URL format');
      const record = { name: String(row.name || '').trim(), email: String(row.email || '').trim().toLowerCase(), phone: String(row.phone || '').trim(), company: String(row.company || '').trim(), priority: row.priority ? String(row.priority).toLowerCase() : 'cold', stage: row.stage ? String(row.stage).toLowerCase() : 'new', value: row.value ? Number(row.value) : 0, areaName: String(row.area || row.Area || '').trim(), city: String(row.city || '').trim(), country: String(row.country || '').trim(), website: String(row.website || '').trim(), source: row.source ? String(row.source).toLowerCase() : 'website', industry: String(row.industry || '').trim(), notes: String(row.notes || '').trim(), assignedTo: getUserName() };
      if (errors.length > 0) invalidRecords.value.push({ rowNumber, record, errors }); else validRecords.value.push(record);
    });
  }

  function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function isValidURL(url) { try { new URL(url); return true; } catch (e) { return false; } }

  async function importLeads() {
    if (validRecords.value.length === 0) { showToast('info', 'No Valid Records', 'No valid records to import.'); return; }
    isImporting.value = true; importResults.value = { success: 0, failed: 0, errors: [] };
    try {
      const result = await crmApi.bulkImportLeads(validRecords.value.map(r => ({ ...r, tenant_id: getTenantId() })), getTenantId());
      importResults.value = { success: result.success || 0, failed: result.failed || 0, errors: result.errors || [] }; importStep.value = 3;
      if (importResults.value.success > 0) showToast('success', 'Import Complete', `Successfully imported ${importResults.value.success} lead${importResults.value.success > 1 ? 's' : ''}`);
    } catch (error) { console.error('Import error:', error); showToast('error', 'Import Failed', error.message); }
    finally { isImporting.value = false; }
  }

  function handleBulkImportComplete(result) {
    console.log('[CRMModule.js] handleBulkImportComplete() called with result:', result);
    showBulkUploadModal.value = false;
    showToast('success', 'Import Complete', `Successfully imported ${result.success || 0} leads.`);
    loadLeads();
    fetchStats();
  }

  async function exportLeads(filters = null) {
    console.log('[CRMModule.js] exportLeads() called', filters ? 'with filters' : 'without filters');
    try {
      let allLeads = [];
      if (filters && Object.keys(filters).length > 0) {
        // Fetch leads with the same filters applied in the UI
        const tenantId = getTenantId();
        const params = {
          tenant_id: tenantId,
          branch_id: safeBranchId.value,
          per_page: 10000,
          page: 1,
          ...filters
        };
        const resp = await crmApi.getLeads(tenantId, params);
        allLeads = Array.isArray(resp) ? resp : (resp?.items || resp?.records || []);
      } else {
        const resp = await crmApi.exportLeads(getTenantId(), 10000);
        allLeads = resp.leads || [];
      }
      console.log('[CRMModule.js] Fetched leads for export:', allLeads.length);
      if (allLeads.length === 0) { showToast('info', 'No Data', 'No leads available to export'); return; }

      // Excel cell character limit is 32,767 - truncate to 32,000 for safety
      const MAX_CELL_LENGTH = 32000;
      function safeStr(val, maxLen = MAX_CELL_LENGTH) {
        const s = String(val || '');
        return s.length > maxLen ? s.substring(0, maxLen) + '…[TRUNCATED]' : s;
      }

      const exportData = allLeads.map(l => ({
        'Lead Name': safeStr(l.name),
        'Email': safeStr(l.email),
        'Phone': safeStr(l.phone),
        'Company': safeStr(l.company),
        'Position': safeStr(l.position),
        'Priority': safeStr(l.priority),
        'Stage': safeStr(l.stage),
        'Value': l.value || 0,
        'Area': safeStr(l.areaName),
        'City': safeStr(l.city),
        'Country': safeStr(l.country),
        'Website': safeStr(l.website),
        'Source': safeStr(l.source),
        'Industry': safeStr(l.industry),
        'Lead Owner': safeStr(l.assignedTo || l.owner),
        'Created At': l.created_at ? new Date(l.created_at).toLocaleString() : '',
        'Notes': safeStr(l.notes)
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads');
      XLSX.writeFile(wb, `leads_export_${new Date().toISOString().slice(0, 10)}.xlsx`);
      console.log('[CRMModule.js] Export file created successfully');
      showToast('success', 'Export Complete', `Exported ${allLeads.length} leads`);
    } catch (error) {
      console.error('[CRMModule.js] Export error:', error);
      showToast('error', 'Export Failed', error.message);
    }
  }

  function crmFormatDate(dateValue) {
    if (!dateValue) return '-';
    const ts = (typeof dateValue === 'string' && (dateValue.endsWith('Z') || dateValue.includes('+') || dateValue.length === 10)) ? dateValue : (typeof dateValue === 'string' ? `${dateValue}Z` : dateValue);
    const date = new Date(ts); return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function crmFormatDateTime(dateValue) {
    if (!dateValue) return '-';
    const ts = (typeof dateValue === 'string' && (dateValue.endsWith('Z') || dateValue.includes('+') || dateValue.length === 10)) ? dateValue : (typeof dateValue === 'string' ? `${dateValue}Z` : dateValue);
    const date = new Date(ts); return isNaN(date.getTime()) ? '-' : date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  async function loadLeads() {
    const tenantId = getTenantId(); if (!tenantId) return; moduleLoading.value = true;
    try { const res = await crmApi.getLeads(tenantId, { tenant_id: tenantId, branch_id: safeBranchId.value, per_page: 10000 }); leads.value = Array.isArray(res) ? res : (res?.items || res?.records || []); }
    catch (err) { console.error('[CRMModule] Failed to load leads:', err); showToast('error', 'Error', 'Failed to load leads'); }
    finally { moduleLoading.value = false; }
  }

  async function fetchPipelineData() {
    const tenantId = getTenantId(); if (!tenantId) return;
    try {
      await Promise.all([fetchStats(), fetchTeamPerformance()]);
      const leadsResp = await crmApi.getLeads(tenantId, { per_page: 10000, page: 1, branch_id: safeBranchId.value }); pipelineLeads.value = (Array.isArray(leadsResp) ? leadsResp : (leadsResp?.items || [])).map(l => ({ ...l, stage: (l.stage || 'new').toString().toLowerCase(), entityType: 'lead' }));
      const contactsResp = await crmApi.getContacts(tenantId, { per_page: 10000, branch_id: safeBranchId.value }); pipelineContacts.value = (contactsResp?.items || contactsResp || []).map(c => ({ ...c, stage: (c.stage || 'contacted').toString().toLowerCase(), entityType: 'contact' }));
      const accountsResp = await crmApi.getAccounts(tenantId, { per_page: 10000, branch_id: safeBranchId.value }); pipelineAccounts.value = (accountsResp?.items || accountsResp || []).map(a => ({ ...a, stage: (a.stage || 'closed-won').toString().toLowerCase(), entityType: 'account' }));
      const dealsResp = await crmApi.getDeals(tenantId, { per_page: 10000, branch_id: safeBranchId.value }); pipelineDeals.value = (dealsResp?.items || dealsResp || []).map(d => { let s = (d.stage || '').toString().toLowerCase(); let allowed = allPipelineStages.value.filter(st => st.entity === 'deals').map(st => st.id); if (allowed.length === 0) allowed = ['negotiation', 'closed-won', 'closed-lost']; if (!allowed.includes(s)) s = 'negotiation'; return { ...d, stage: s, entityType: 'deal', value: d.amount || d.value }; });
    } catch (err) { console.error('Error fetching pipeline data:', err); }
  }

  onMounted(async () => {
    try { await initializeRBAC(); } catch { }
    try { crmQuickAccessStore.loadQuickAccessData(); } catch { }
    navigationStore.initializeHome();
    currentUserEmail.value = getUserEmail(); currentUserRole.value = getUserRole();
    await fetchMetadata(); await loadLeads(); await fetchPipelineData(); await fetchTenantUsers(); await loadMeetings(); await loadEmails();
    const tenantId = getTenantId(); customers.value = (await crmApi.getCustomers(tenantId)) || []; communications.value = (await crmApi.getCommunications(tenantId)) || [];
    document.addEventListener('click', handleClickOutside);
    const refreshAll = async () => { await loadLeads(); await fetchPipelineData(); };
    crmEventUnsubs.value = [
      onCrmEvent('crm:leads:changed', refreshAll),
      onCrmEvent('crm:contacts:changed', fetchPipelineData),
      onCrmEvent('crm:accounts:changed', fetchPipelineData),
      onCrmEvent('crm:deals:changed', fetchPipelineData),
      onCrmEvent('crm:viewAccount', (e) => { if (e.accountId) activeTab.value = 'accounts'; })
    ];
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    (crmEventUnsubs.value || []).forEach(unsub => typeof unsub === 'function' && unsub());
  });

  watch(activeTab, async (val) => {
    const tenantId = getTenantId();
    if (val === 'emails') { await loadEmails(); await loadEmailStats(); }
    if (val === 'meetings') { await loadMeetings(); await loadMeetingStats(); }
    if (val === 'visits') await loadVisits();
    if (val === 'calls') { try { const calls = await crmApi.getCommunications(tenantId, { type: 'call' }); communications.value = Array.isArray(calls) ? calls : communications.value; communicationFilter.value = 'call'; } catch { } }
    if (val === 'whatsapp') { try { communicationFilter.value = 'whatsapp'; const params = { type: 'whatsapp' }; if (whatsappSubtypeFilter.value) params.subtype = whatsappSubtypeFilter.value; const list = await crmApi.getCommunications(tenantId, params); communications.value = Array.isArray(list) ? list : communications.value; } catch { } }
  });

  watch(communicationFilter, async (val) => {
    const tenantId = getTenantId();
    try {
      const params = val ? { type: val } : {};
      if (val === 'whatsapp' && whatsappSubtypeFilter.value) params.subtype = whatsappSubtypeFilter.value;
      communications.value = (await crmApi.getCommunications(tenantId, params)) || [];
    } catch { }
  });

  watch(whatsappSubtypeFilter, async (subtype) => {
    if (communicationFilter.value !== 'whatsapp') return;
    const tenantId = getTenantId();
    try { const params = { type: 'whatsapp' }; if (subtype) params.subtype = subtype; communications.value = (await crmApi.getCommunications(tenantId, params)) || []; } catch { }
  });

  onErrorCaptured((err) => { console.error('[CRMModule] Captured error:', err); showToast('error', 'Error', 'An error occurred.'); return false; });

  // ─── Auto-Assign Leads ─────────────────────────────────────────
  const STALE_THRESHOLD_DAYS = 14;
  const AUTO_ESCALATION_DAYS = 21;

  const staleLeadsCount = computed(() => {
    const cutoff = new Date(Date.now() - STALE_THRESHOLD_DAYS * 86400000);
    return (pipelineLeads.value || []).filter(l => {
      if (['closed-won', 'closed-lost'].includes(l.stage)) return false;
      const lastActivity = new Date(l.last_activity_at || l.updated_at || l.created_at);
      return lastActivity < cutoff;
    }).length;
  });

  const avgConversionDays = computed(() => {
    const converted = (pipelineLeads.value || []).filter(l => l.converted_at && l.created_at);
    if (!converted.length) return 0;
    const totalDays = converted.reduce((sum, l) => {
      return sum + (new Date(l.converted_at) - new Date(l.created_at)) / 86400000;
    }, 0);
    return Math.round(totalDays / converted.length);
  });

  async function autoAssignLeads() {
    const tenantId = getTenantId();
    if (!tenantId) return;
    if (!canAssignCrm.value) {
      showToast('error', 'Permission Denied', 'You do not have permission to assign CRM records.');
      return;
    }

    // Get users who can receive leads (non-admin staff)
    const assignableUsers = (tenantUsers.value || []).filter(u =>
      u.email && ['staff', 'manager', 'sales'].includes((u.role || '').toLowerCase())
    );
    if (!assignableUsers.length) {
      showToast('warning', 'No Assignable Staff', 'Add staff members before auto-assigning leads.');
      return;
    }

    // Get unassigned leads
    const unassigned = (pipelineLeads.value || []).filter(l =>
      !l.assigned_to && !l.assignedTo &&
      !['closed-won', 'closed-lost'].includes(l.stage)
    );

    // Get stale leads for escalation
    const escalationCutoff = new Date(Date.now() - AUTO_ESCALATION_DAYS * 86400000);
    const staleForEscalation = (pipelineLeads.value || []).filter(l => {
      if (['closed-won', 'closed-lost'].includes(l.stage)) return false;
      if (l.escalated_to_manager) return false;
      const lastActivity = new Date(l.last_activity_at || l.updated_at || l.created_at);
      return lastActivity < escalationCutoff;
    });

    let assigned = 0;
    let escalated = 0;

    // Round-robin assign unassigned leads
    for (let i = 0; i < unassigned.length; i++) {
      const lead = unassigned[i];
      const user = assignableUsers[i % assignableUsers.length];
      try {
        await crmApi.updateLead(lead.id || lead._id, { assignedTo: user.email, tenant_id: tenantId }, tenantId);
        assigned++;
      } catch (e) { console.warn('Failed to auto-assign lead', e); }
    }

    // Escalate stale leads to managers
    const managers = (tenantUsers.value || []).filter(u => ['manager', 'admin', 'owner'].includes((u.role || '').toLowerCase()));
    if (managers.length) {
      for (const lead of staleForEscalation) {
        const manager = managers[0]; // escalate to first manager
        try {
          await crmApi.updateLead(lead.id || lead._id, {
            escalated_to_manager: true,
            escalated_at: new Date().toISOString(),
            assigned_to: manager.email,
            tenant_id: tenantId
          }, tenantId);
          escalated++;
        } catch (e) { console.warn('Failed to escalate lead', e); }
      }
    }

    await fetchPipelineData();
    showToast('success', 'Auto-Assign Complete',
      `Assigned ${assigned} lead${assigned !== 1 ? 's' : ''}, escalated ${escalated} stale lead${escalated !== 1 ? 's' : ''} to managers.`
    );
  }

  return {
    canAssignCrm,
    openBulkUpload, openImportModal,
    formatCurrency, getUserName, getUserRole, getUserEmail, getSelectedBranch, getBranches, setSelectedBranch, getTenantId,
    branches, selectedBranch, safeBranchId, onBranchChange, currentUserEmail, currentUserRole, stats, performanceList,
    fetchStats, fetchTeamPerformance, crmQuickAccessStore, navigationStore, getInitials, getSourceIcon, isOwner, activeTab,
    pipelineMobileView, pipelineSearchQuery, pipelineAssignedFilter, accountConversionStages, showFilters, toast, showToast, hideToast, modulesList, getModuleInfo, participantSearch,
    participantSearchResults, showManualParticipant, showContactModal, showAccountModal, showDealModal, selectedContact,
    selectedAccount, selectedDeal, recordQuickAccessClick, searchParticipants, addParticipantResult, addParticipantManual,
    goBackToPrevious, goToModule, contactActivities, accountActivities, dealActivities, showCallOutcomeModal, callOutcome,
    callSummary, callTimerSeconds, startCallTimer, stopCallTimer, cancelCallOutcome, formatDuration, saveCallOutcome,
    viewContact, viewAccount, viewDeal, locationSearchQuery, locationSearchResults, isSearchingLocation, leadDetailTab,
    activeRelatedList, currentModuleMetadata, currentModuleRecords, moduleLoading, loadModule, showLeadModal,
    showCommunicationModal, showDetailModal, showConversionModal, showBulkUploadModal, selectedLeadForConversion,
    isSubmitting, isSending, leadModalTitle, showContactFormModal, showAccountFormModal, showDealFormModal,
    editingContact, editingAccount, editingDeal, showDocumentUploadModal, documentUploadLinkedEntity, showImportModal,
    importStep, selectedFile, fileInput, isProcessing, isImporting, validRecords, invalidRecords, importResults,
    leadForm, communicationForm, onSendCommunication, customerFilter, communicationFilter, whatsappSubtypeFilter,
    selectedLead, priorityOptions, perPage, page, pipelineStages, customPipelineStages, allPipelineStages,
    visiblePipelineStages, hiddenStageIds, showStageAmounts, deletedDefaultStageIds,
    totalLeads, selectedLeads, sortField, sortDirection, advancedFilters, showAdvancedFilters,
    leadQuickFilter, touchFilter, stageFilter, sourceFilter,
    showAddStageModal, newStageForm, stageColorPalette, draggingLead, dragOverStage, dragState, pipelineConfirm, showPipelineConfirm, showPipelineAlert, selectedRecords, selectAll,
    viewMode, leads, priorityDropdownOpen, tenantUsers, userSearchQuery, showAssignDropdown, assignDropdownRef,
    assignToSearch, showAssignToDropdown, pipelineLeads, pipelineContacts, pipelineAccounts, pipelineDeals,
    customers, communications, showEmailModal, emailListFilter, emails, emailStats, emailForm, recipientSearch,
    showRecipientDropdown, filteredRecipients, showCc, showBcc, showLinkRecord, linkRecordType, showTemplates,
    emailTemplates, filteredLeadsCount, showMeetingModal, meetingView, meetingFilter, meetingStats, editingMeeting,
    savingMeeting, meetingForm, newParticipant, currentCalendarDate, weekDays, searchLocation, callNotes,
    newCallNote, ensureCallNotesLoaded, submitCallNote, visits, visitNotes, newVisitNote, showVisitModal,
    editingVisit, visitForm, gettingLocation, showManualLocation, manualLocation, calculatingRoute, routeInfo, openVisitModal,
    closeVisitModal, getCurrentLocation, clearCurrentLocation, setManualLocation, onLeadSelect, optimizeRoute,
    formatVisitDuration, getLeadNameById, getMapsLink, loadVisits, ensureVisitNotesLoaded, createVisit,
    markVisitCompleted, submitVisitNote, showCheckOutModalFlag, currentVisitForCheckOut, checkOutForm, checkingOut,
    checkInVisit, showCheckOutModal, closeCheckOutModal, confirmCheckOut, totalPages, pagedLeads, filteredTenantUsers,
    filteredAssignToUsers, filteredLeadsForKPI, filteredContactsForKPI, filteredAccountsForKPI, filteredDealsForKPI,
    kpiNewLeadsThisMonth, getOpenDeals, kpiTotalPipelineValue, getWeightedPipelineValue, getConversionRate,
    kpiLeadsByStage, kpiStageValue, handleAddNote, handleAddActivity, pageStart, pageEnd, prevPage, nextPage,
    openAdvancedFilters, applyAdvancedFilters, applyQuickFilter, togglePriorityDropdown, selectPriority,
    getPriorityLabel, applyTouchFilter, applyStageFilter, deleteMeetingRecord, applySourceFilter, openAddStageModal,
    closeAddStageModal, addCustomStage, removeCustomStage, fetchTenantUsers, getUserInitials, getAssignedUserRole,
    selectAssignTo, handleClickOutside, bulkAssign, bulkChangeStage, bulkExport, bulkDelete, sortBy, convertLead,
    handleLeadConverted, handleBulkImportComplete, filteredCustomers, filteredCommunications, leadCommunications,
    tabClass, getVisibleLeadsByStage, getRecordValue, formatNumber, capitalize, getPriorityBadgeClass, formatLocation,
    getLeadPriorityClass, getStageBadgeClass, getStageName, getEntityBadgeClass, getRecordBorderClass, getRecordTitle,
    getRecordSubtitle, viewRecord, whatsappTextRecord, callRecord, emailRecord, editRecord, convertRecord,
    getUserPerformanceMetrics, userPerformanceList, showPerformanceModal, selectedPerformanceUser, performanceData,
    openPerformanceModal, closePerformanceModal, exportPerformanceReport, onDragStart, onDragEnd, onTouchStart,
    onTouchMove, onTouchEnd, onDragEnter, onDragLeave, onDrop, handleDrop, getCustomerTagClass,
    getCommunicationBorderClass, getCommunicationIcon, submitLead, deleteLead, submitCustomer, deleteCustomer,
    sendCommunication, deleteCommunication, sendReminder, openLeadModal, openCustomerModal, openCommunicationModal,
    closeLeadModal, openNewEmail, closeEmailModal, minimizeEmail, maximizeEmail, toggleEmailSource, searchRecipients,
    addRecipient, removeRecipient, getRecordsByType, getRecordIcon, insertTemplate, sendEmail, scheduleEmail,
    loadEmails, loadEmailStats, openEmailDetail, formatEmailDate, filteredEmails, canSendEmail, filteredMeetings,
    currentMonthYear, calendarDays, getMeetingsForDate, previousMonth, nextMonth, openDayMeetings, openNewMeeting,
    closeMeetingModal, editMeeting, formatDateTimeForInput, submitMeeting, addParticipant, removeParticipant,
    deleteCommunicationRecord, getRecordsForType, getRecordNameById, completeMeetingAction, cancelMeetingAction,
    deleteMeeting, deleteVisit, openMeetingDetail, loadMeetings, loadMeetingStats, formatTime, generateZoomLink,
    generateGoogleMeetLink, editLead, viewLead, callLead, emailLead, openDocumentUploadForLead, handleDocumentUploaded,
    whatsappLead, viewCustomer, callCustomer, emailCustomer, replyToCommunication, processNotificationsForTenant,
    initLeadMap, selectSearchResult, reverseGeocode, roundCoordinate, roundLocationCoordinates, snapAndUpdateLocation,
    useCurrentLocation, isLocatingDevice,
    pendingLeadDocuments, addPendingLeadDocument, removePendingLeadDocument, clearPendingLeadDocuments,
    downloadTemplate, openImportModal, openBulkUpload, closeImportModal, handleFileSelect, removeFile, formatFileSize,
    getDocumentIcon, getActivityIcon, getCommunicationCount, processFile, readFileData, validateData, isValidEmail,
    isValidURL, importLeads, exportLeads, crmFormatDate, crmFormatDateTime, loadLeads, fetchPipelineData,
    handleBulkImportComplete, showLeadModal, showBulkUploadModal, showImportModal,
    // New analytics & automation
    staleLeadsCount, avgConversionDays, autoAssignLeads
  };
}
