import { g as _export_sfc, r as ref, D as computed, h as onMounted, E as onUnmounted, c as createElementBlock, b as createBaseVNode, q as createVNode, y as unref, m as createTextVNode, t as toDisplayString, j as normalizeClass, v as withDirectives, V as vShow, F as Fragment, e as renderList, a8 as X, x as vModelText, I as withKeys, s as withModifiers, l as createCommentVNode, o as openBlock } from './index-DmPoKdyt.js';
import { _ as _sfc_main$1 } from './BackButton-BtUCjkKd.js';
import { u as useCRMModule, a6 as getAcquisitionCosts, a7 as updateAcquisitionCost, a8 as saveAcquisitionCost, a9 as deleteAcquisitionCost } from './CRMModule-P26F_PG6.js';
import { C as CircleUser } from './circle-user-B0jOQ-nF.js';
import { D as DollarSign, T as TrendingUp } from './trending-up-DuLOLlMK.js';
import { P as Plus } from './plus-C9zsIaIf.js';
import { U as Users } from './users-hBNbWQmJ.js';
import { C as ChevronRight } from './chevron-right-B04lhJxd.js';
import { T as Target } from './target-XR-At1_K.js';
import { C as Calculator } from './calculator-B1Ufw3Kp.js';
import { P as Pencil } from './pencil-B72Fm4nH.js';
import { T as Trash2 } from './trash-2-DZYk5XH8.js';
import './useCurrency-C1yH5gH3.js';
import './FileSaver.min-CLGdtH5R.js';

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-indigo-50 border border-indigo-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 pb-40" };
const _hoisted_8 = { class: "px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative" };
const _hoisted_9 = { class: "flex items-center justify-between border-b border-gray-100 pb-4" };
const _hoisted_10 = { class: "flex items-center gap-2" };
const _hoisted_11 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_12 = { class: "bg-white border border-gray-200 rounded-sm overflow-hidden" };
const _hoisted_13 = { class: "p-6 transition-all duration-300" };
const _hoisted_14 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5" };
const _hoisted_15 = { class: "bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all" };
const _hoisted_16 = { class: "text-xl font-black text-gray-900 font-mono tracking-tighter" };
const _hoisted_17 = { class: "bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all" };
const _hoisted_18 = { class: "text-xl font-black text-gray-900 font-mono tracking-tighter" };
const _hoisted_19 = { class: "bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all" };
const _hoisted_20 = { class: "text-xl font-black text-gray-900 font-mono tracking-tighter" };
const _hoisted_21 = { class: "bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all" };
const _hoisted_22 = { class: "text-xl font-black text-emerald-600 font-mono tracking-tighter" };
const _hoisted_23 = { class: "bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all" };
const _hoisted_24 = { class: "text-xl font-black text-blue-600 font-mono tracking-tighter" };
const _hoisted_25 = { class: "bg-white border border-gray-200 rounded-sm overflow-hidden" };
const _hoisted_26 = { class: "px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50" };
const _hoisted_27 = { class: "text-[9px] font-mono font-bold text-gray-400" };
const _hoisted_28 = {
  key: 0,
  class: "p-12 text-center"
};
const _hoisted_29 = {
  key: 1,
  class: "p-12 text-center"
};
const _hoisted_30 = {
  key: 2,
  class: "w-full text-left"
};
const _hoisted_31 = { class: "divide-y divide-gray-50" };
const _hoisted_32 = { class: "px-4 py-3" };
const _hoisted_33 = { class: "text-xs font-bold text-gray-900" };
const _hoisted_34 = {
  key: 0,
  class: "text-[9px] font-mono text-gray-400 mt-0.5"
};
const _hoisted_35 = { class: "px-4 py-3" };
const _hoisted_36 = {
  key: 0,
  class: "text-[9px] font-mono font-bold text-[#2F2E8B] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase"
};
const _hoisted_37 = {
  key: 1,
  class: "text-[9px] font-mono text-gray-300"
};
const _hoisted_38 = { class: "px-4 py-3 text-right text-xs font-mono font-black text-gray-900" };
const _hoisted_39 = { class: "px-4 py-3 text-right text-xs font-mono font-bold text-emerald-600" };
const _hoisted_40 = { class: "px-4 py-3 text-right text-xs font-mono font-bold text-blue-600" };
const _hoisted_41 = { class: "px-4 py-3 text-right" };
const _hoisted_42 = { class: "flex flex-col items-end gap-0.5" };
const _hoisted_43 = { class: "px-4 py-3 text-[9px] font-mono text-gray-400" };
const _hoisted_44 = { class: "px-4 py-3" };
const _hoisted_45 = { class: "flex items-center gap-1" };
const _hoisted_46 = ["onClick"];
const _hoisted_47 = ["onClick"];
const _hoisted_48 = {
  key: 0,
  class: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
};
const _hoisted_49 = { class: "bg-white w-full max-w-xl shadow-2xl rounded-sm border border-gray-100 flex flex-col max-h-[90vh] relative overflow-hidden" };
const _hoisted_50 = { class: "p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10" };
const _hoisted_51 = { class: "flex items-center gap-3" };
const _hoisted_52 = { class: "text-lg font-black text-gray-900 uppercase tracking-tight" };
const _hoisted_53 = { class: "flex-1 overflow-y-auto p-6 space-y-8 relative z-10 bg-white/40" };
const _hoisted_54 = { class: "space-y-4" };
const _hoisted_55 = { class: "flex items-center gap-2 border-b border-gray-100 pb-2" };
const _hoisted_56 = { class: "space-y-1.5" };
const _hoisted_57 = ["placeholder"];
const _hoisted_58 = {
  key: 0,
  class: "absolute z-[70] w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm overflow-hidden"
};
const _hoisted_59 = { class: "max-h-52 overflow-y-auto" };
const _hoisted_60 = {
  key: 0,
  class: "px-3 py-3 text-[10px] font-mono text-gray-400 uppercase tracking-widest text-center"
};
const _hoisted_61 = ["onMousedown"];
const _hoisted_62 = { class: "truncate" };
const _hoisted_63 = { class: "text-[9px] text-gray-400 flex-shrink-0 font-mono uppercase" };
const _hoisted_64 = { class: "px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[8px] font-mono text-gray-300 uppercase tracking-widest" };
const _hoisted_65 = {
  key: 0,
  class: "flex items-center gap-2 mt-2 p-2.5 bg-indigo-50 border border-indigo-100 rounded-sm"
};
const _hoisted_66 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-wider" };
const _hoisted_67 = {
  key: 1,
  class: "flex items-center gap-2 mt-2 p-2.5 bg-gray-50 border border-gray-100 rounded-sm"
};
const _hoisted_68 = { class: "space-y-4" };
const _hoisted_69 = { class: "flex items-center gap-2 border-b border-gray-100 pb-2" };
const _hoisted_70 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_71 = { class: "space-y-1.5" };
const _hoisted_72 = { class: "space-y-1.5" };
const _hoisted_73 = { class: "space-y-1.5" };
const _hoisted_74 = { class: "space-y-1.5" };
const _hoisted_75 = { class: "space-y-4" };
const _hoisted_76 = { class: "flex items-center gap-2 border-b border-gray-100 pb-2" };
const _hoisted_77 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_78 = { class: "space-y-1.5" };
const _hoisted_79 = { class: "space-y-1.5" };
const _hoisted_80 = { class: "bg-gray-900 p-5 rounded-sm border border-gray-800 space-y-4" };
const _hoisted_81 = { class: "flex items-center justify-between" };
const _hoisted_82 = { class: "text-lg font-mono font-black text-white" };
const _hoisted_83 = {
  key: 0,
  class: "flex items-center justify-between border-t border-gray-800 pt-3"
};
const _hoisted_84 = { class: "text-lg font-mono font-black text-emerald-400" };
const _hoisted_85 = {
  key: 1,
  class: "flex items-center justify-between border-t border-gray-800 pt-3"
};
const _hoisted_86 = { class: "text-lg font-mono font-black text-blue-400" };
const _hoisted_87 = {
  key: 2,
  class: "flex items-center justify-between border-t border-gray-800 pt-3"
};
const _hoisted_88 = { class: "flex items-center gap-3" };
const _hoisted_89 = { class: "p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between relative z-10" };
const _hoisted_90 = ["disabled"];
const _hoisted_91 = {
  key: 0,
  class: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
};


const _sfc_main = {
  __name: 'CRMAcquisitionPage',
  setup(__props) {

const {
  getUserEmail, getTenantId, showToast, leads, loadLeads, formatCurrency
} = useCRMModule();

const showCOAModal = ref(false);
const savingCOA = ref(false);
const costRecords = ref([]);
const loadingCosts = ref(false);
const editingCostId = ref(null);
const isKpiSectionVisible = ref(true);

// Searchable lead dropdown state
const leadQuery = ref('');
const showLeadDropdown = ref(false);
const leadDropdownRef = ref(null);
const leadSearchInputRef = ref(null);

const selectedLeadDisplayName = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead ? `${lead.name} (${lead.company || 'Private'})` : '';
});

const filteredLeads = computed(() => {
  const q = leadQuery.value.trim().toLowerCase();
  if (!q) return leads.value;
  return leads.value.filter(l =>
    (l.name || '').toLowerCase().includes(q) ||
    (l.company || '').toLowerCase().includes(q) ||
    (l.email || '').toLowerCase().includes(q)
  );
});

function openLeadDropdown() {
  showLeadDropdown.value = true;
  leadSearchInputRef.value?.focus();
}

function closeLeadDropdown() {
  showLeadDropdown.value = false;
  leadQuery.value = '';
}

function selectLead(lead) {
  coaForm.value.leadId = lead.id || lead._id;
  leadQuery.value = '';
  showLeadDropdown.value = false;
}

function clearLead() {
  coaForm.value.leadId = '';
  leadQuery.value = '';
  showLeadDropdown.value = false;
}

function _handleLeadClickOutside(e) {
  if (leadDropdownRef.value && !leadDropdownRef.value.contains(e.target)) {
    closeLeadDropdown();
  }
}

const coaForm = ref({
  leadId: '',
  campaignName: '',
  marketingSpend: 0,
  salesCommission: 0,
  softwareCosts: 0,
  otherCosts: 0,
  isClosed: false,
  revenueGenerated: 0,
  lifetimeValue: 0,
  revenueMade: 0
});

// Get the selected lead's source attribute from CRM main page
const selectedLeadSource = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead?.source || '';
});

const selectedLeadName = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead?.name || '';
});

const calculatedCOA = computed(() => {
  return (coaForm.value.marketingSpend || 0) + (coaForm.value.salesCommission || 0) + (coaForm.value.softwareCosts || 0) + (coaForm.value.otherCosts || 0);
});

const roi = computed(() => {
  if (calculatedCOA.value === 0) return 0;
  const revenue = coaForm.value.revenueMade || 0;
  return ((revenue - calculatedCOA.value) / calculatedCOA.value) * 100;
});

const profitLoss = computed(() => (coaForm.value.revenueMade || 0) - calculatedCOA.value);

// Aggregate KPIs from saved records
const totalMarketingSpend = computed(() => costRecords.value.reduce((sum, r) => sum + (r.marketing_spend || 0), 0));
const totalCosts = computed(() => costRecords.value.reduce((sum, r) => sum + (r.total_cost || 0), 0));
const avgAcquisitionCost = computed(() => costRecords.value.length > 0 ? totalCosts.value / costRecords.value.length : 0);
const totalLifetimeValue = computed(() => costRecords.value.reduce((sum, r) => sum + (r.lifetime_value || 0), 0));
const totalRevenueMade = computed(() => costRecords.value.reduce((sum, r) => sum + (r.revenue_made || 0), 0));

const defaultForm = () => ({ leadId: '', campaignName: '', marketingSpend: 0, salesCommission: 0, softwareCosts: 0, otherCosts: 0, isClosed: false, revenueGenerated: 0, lifetimeValue: 0, revenueMade: 0 });

function openCOAModal() {
  editingCostId.value = null;
  coaForm.value = defaultForm();
  showCOAModal.value = true;
}

function editCost(record) {
  editingCostId.value = record.id;
  coaForm.value = {
    leadId: record.lead_id || '',
    campaignName: record.campaign_name || '',
    marketingSpend: record.marketing_spend || 0,
    salesCommission: record.sales_commission || 0,
    softwareCosts: record.software_costs || 0,
    otherCosts: record.other_costs || 0,
    isClosed: record.is_closed || false,
    revenueGenerated: record.revenue_generated || 0,
    lifetimeValue: record.lifetime_value || 0,
    revenueMade: record.revenue_made || 0
  };
  showCOAModal.value = true;
}

async function loadCostRecords() {
  loadingCosts.value = true;
  try {
    const data = await getAcquisitionCosts(getTenantId());
    costRecords.value = data || [];
  } catch (err) {
    console.error('Failed to load acquisition costs:', err);
  } finally {
    loadingCosts.value = false;
  }
}

async function saveCOA() {
  if (!coaForm.value.leadId) {
    showToast('error', 'Missing Data', 'Please select a lead to attach costs to.');
    return;
  }
  savingCOA.value = true;
  try {
    const payload = {
      lead_id: coaForm.value.leadId,
      lead_name: selectedLeadName.value,
      lead_source: selectedLeadSource.value,
      campaign_name: coaForm.value.campaignName,
      marketing_spend: coaForm.value.marketingSpend || 0,
      sales_commission: coaForm.value.salesCommission || 0,
      software_costs: coaForm.value.softwareCosts || 0,
      other_costs: coaForm.value.otherCosts || 0,
      total_cost: calculatedCOA.value,
      is_closed: coaForm.value.isClosed,
      revenue_generated: coaForm.value.revenueGenerated || 0,
      roi: roi.value,
      lifetime_value: coaForm.value.lifetimeValue || 0,
      revenue_made: coaForm.value.revenueMade || 0,
      tenant_id: getTenantId()
    };

    if (editingCostId.value) {
      await updateAcquisitionCost(editingCostId.value, payload);
      showToast('success', 'Updated', 'Acquisition cost record has been updated.');
    } else {
      await saveAcquisitionCost(payload);
      showToast('success', 'Cost Recorded', 'Acquisition cost has been saved and linked to the lead.');
    }
    showCOAModal.value = false;
    editingCostId.value = null;
    await loadCostRecords();
  } catch (err) {
    showToast('error', 'Save Failed', err.message || 'Could not save acquisition costs.');
  } finally {
    savingCOA.value = false;
  }
}

async function removeCost(record) {
  if (!confirm('Delete this acquisition cost record?')) return;
  try {
    await deleteAcquisitionCost(record.id, getTenantId());
    showToast('success', 'Deleted', 'Acquisition cost record removed.');
    await loadCostRecords();
  } catch (err) {
    showToast('error', 'Delete Failed', err.message || 'Could not delete record.');
  }
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

onMounted(async () => {
  await Promise.all([loadLeads(), loadCostRecords()]);
  document.addEventListener('click', _handleLeadClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', _handleLeadClickOutside);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[56] || (_cache[56] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$1), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
          _cache[13] || (_cache[13] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Financials // CRM // Analytics"),
            createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Acquisition_Costs")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("span", _hoisted_6, [
            createVNode(unref(CircleUser), { size: 14 }),
            createTextVNode(" " + toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_7, [
      createBaseVNode("div", _hoisted_8, [
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            _cache[15] || (_cache[15] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
            createBaseVNode("h3", _hoisted_11, [
              createVNode(unref(DollarSign), {
                size: 14,
                class: "text-gray-400"
              }),
              _cache[14] || (_cache[14] = createTextVNode(" Lead_Acquisition_Analytics ", -1))
            ])
          ]),
          createBaseVNode("button", {
            onClick: openCOAModal,
            class: "px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#252475] transition flex items-center gap-2 shadow-lg shadow-indigo-900/10"
          }, [
            createVNode(unref(Plus), { size: 14 }),
            _cache[16] || (_cache[16] = createTextVNode(" Log_New_Cost ", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", {
            class: "px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 cursor-pointer select-none",
            onClick: _cache[0] || (_cache[0] = $event => (isKpiSectionVisible.value = !isKpiSectionVisible.value))
          }, [
            _cache[18] || (_cache[18] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
              createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider" }, "Key_Performance_Indicators")
            ], -1)),
            createBaseVNode("button", {
              class: normalizeClass(["flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest transition border hover:bg-gray-100", isKpiSectionVisible.value ? 'text-gray-500 border-gray-200' : 'text-[#2F2E8B] border-indigo-200 bg-indigo-50/50'])
            }, [
              (openBlock(), createElementBlock("svg", {
                class: normalizeClass(["w-3.5 h-3.5 transition-transform duration-300", isKpiSectionVisible.value ? 'rotate-0' : '-rotate-90']),
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [...(_cache[17] || (_cache[17] = [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2.5",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ]))], 2)),
              createTextVNode(" " + toDisplayString(isKpiSectionVisible.value ? 'Hide_KPIs' : 'Show_KPIs'), 1)
            ], 2)
          ]),
          withDirectives(createBaseVNode("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                _cache[19] || (_cache[19] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                _cache[20] || (_cache[20] = createBaseVNode("h4", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider" }, "Total_Marketing_Spend", -1)),
                createBaseVNode("p", _hoisted_16, toDisplayString(unref(formatCurrency)(totalMarketingSpend.value)), 1)
              ]),
              createBaseVNode("div", _hoisted_17, [
                _cache[21] || (_cache[21] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                _cache[22] || (_cache[22] = createBaseVNode("h4", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider" }, "Avg_Acquisition_Cost", -1)),
                createBaseVNode("p", _hoisted_18, toDisplayString(unref(formatCurrency)(avgAcquisitionCost.value)), 1)
              ]),
              createBaseVNode("div", _hoisted_19, [
                _cache[23] || (_cache[23] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                _cache[24] || (_cache[24] = createBaseVNode("h4", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider" }, "Total_Investment", -1)),
                createBaseVNode("p", _hoisted_20, toDisplayString(unref(formatCurrency)(totalCosts.value)), 1)
              ]),
              createBaseVNode("div", _hoisted_21, [
                _cache[25] || (_cache[25] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                _cache[26] || (_cache[26] = createBaseVNode("h4", { class: "text-[9px] font-mono font-bold text-emerald-500 uppercase mb-3 tracking-wider" }, "Lifetime_Value", -1)),
                createBaseVNode("p", _hoisted_22, toDisplayString(unref(formatCurrency)(totalLifetimeValue.value)), 1)
              ]),
              createBaseVNode("div", _hoisted_23, [
                _cache[27] || (_cache[27] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                _cache[28] || (_cache[28] = createBaseVNode("h4", { class: "text-[9px] font-mono font-bold text-blue-500 uppercase mb-3 tracking-wider" }, "Revenue_Made", -1)),
                createBaseVNode("p", _hoisted_24, toDisplayString(unref(formatCurrency)(totalRevenueMade.value)), 1)
              ]),
              createBaseVNode("div", {
                class: normalizeClass([totalRevenueMade.value - totalCosts.value >= 0 ? 'border-green-200 bg-green-50/30 hover:border-green-300' : 'border-red-200 bg-red-50/30 hover:border-red-300', "border rounded-sm p-5 relative overflow-hidden hover:shadow-md transition-all"])
              }, [
                _cache[29] || (_cache[29] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("h4", {
                  class: normalizeClass([totalRevenueMade.value - totalCosts.value >= 0 ? 'text-green-500' : 'text-red-500', "text-[9px] font-mono font-bold uppercase mb-3 tracking-wider"])
                }, toDisplayString(totalRevenueMade.value - totalCosts.value >= 0 ? 'Net_Profit' : 'Net_Loss'), 3),
                createBaseVNode("p", {
                  class: normalizeClass([totalRevenueMade.value - totalCosts.value >= 0 ? 'text-green-600' : 'text-red-600', "text-xl font-black font-mono tracking-tighter"])
                }, toDisplayString(totalRevenueMade.value - totalCosts.value >= 0 ? '+' : '') + toDisplayString(unref(formatCurrency)(totalRevenueMade.value - totalCosts.value)), 3)
              ], 2)
            ])
          ], 512), [
            [vShow, isKpiSectionVisible.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_25, [
          createBaseVNode("div", _hoisted_26, [
            _cache[30] || (_cache[30] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
              createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider" }, "Cost_Records_History")
            ], -1)),
            createBaseVNode("span", _hoisted_27, toDisplayString(costRecords.value.length) + " RECORDS", 1)
          ]),
          (loadingCosts.value)
            ? (openBlock(), createElementBlock("div", _hoisted_28, [...(_cache[31] || (_cache[31] = [
                createBaseVNode("div", { class: "w-6 h-6 border-2 border-gray-200 border-t-[#2F2E8B] rounded-full animate-spin mx-auto mb-3" }, null, -1),
                createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase" }, "Loading records...", -1)
              ]))]))
            : (costRecords.value.length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_29, [
                  createVNode(unref(DollarSign), {
                    size: 32,
                    class: "text-gray-200 mx-auto mb-3"
                  }),
                  _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase" }, "No acquisition costs logged yet", -1)),
                  _cache[33] || (_cache[33] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 mt-1" }, "Click \"Log_New_Cost\" to add your first record", -1))
                ]))
              : (openBlock(), createElementBlock("table", _hoisted_30, [
                  _cache[34] || (_cache[34] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-100" }, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Lead"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Source"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right" }, "Total Cost"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right" }, "LTV"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right" }, "Revenue Made"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right" }, "Profit / Loss"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Date"),
                      createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" })
                    ])
                  ], -1)),
                  createBaseVNode("tbody", _hoisted_31, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(costRecords.value, (record) => {
                      return (openBlock(), createElementBlock("tr", {
                        key: record.id,
                        class: "hover:bg-indigo-50/30 transition-colors"
                      }, [
                        createBaseVNode("td", _hoisted_32, [
                          createBaseVNode("div", _hoisted_33, toDisplayString(record.lead_name || '—'), 1),
                          (record.campaign_name)
                            ? (openBlock(), createElementBlock("div", _hoisted_34, toDisplayString(record.campaign_name), 1))
                            : createCommentVNode("", true)
                        ]),
                        createBaseVNode("td", _hoisted_35, [
                          (record.lead_source)
                            ? (openBlock(), createElementBlock("span", _hoisted_36, toDisplayString(record.lead_source), 1))
                            : (openBlock(), createElementBlock("span", _hoisted_37, "—"))
                        ]),
                        createBaseVNode("td", _hoisted_38, toDisplayString(unref(formatCurrency)(record.total_cost)), 1),
                        createBaseVNode("td", _hoisted_39, toDisplayString(unref(formatCurrency)(record.lifetime_value || 0)), 1),
                        createBaseVNode("td", _hoisted_40, toDisplayString(unref(formatCurrency)(record.revenue_made || 0)), 1),
                        createBaseVNode("td", _hoisted_41, [
                          createBaseVNode("div", _hoisted_42, [
                            createBaseVNode("span", {
                              class: normalizeClass([(record.revenue_made || 0) - (record.total_cost || 0) >= 0 ? 'text-green-600' : 'text-red-600', "text-xs font-mono font-black"])
                            }, toDisplayString((record.revenue_made || 0) - (record.total_cost || 0) >= 0 ? '+' : '') + toDisplayString(unref(formatCurrency)((record.revenue_made || 0) - (record.total_cost || 0))), 3),
                            createBaseVNode("span", {
                              class: normalizeClass([(record.roi || 0) >= 0 ? 'text-green-500 bg-green-50 border-green-100' : 'text-red-500 bg-red-50 border-red-100', "text-[8px] font-mono font-bold border px-1.5 py-0.5 rounded-sm"])
                            }, toDisplayString((record.roi || 0) >= 0 ? '▲' : '▼') + " " + toDisplayString(Math.abs(record.roi || 0).toFixed(1)) + "% ROI ", 3)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_43, toDisplayString(formatDate(record.created_at)), 1),
                        createBaseVNode("td", _hoisted_44, [
                          createBaseVNode("div", _hoisted_45, [
                            createBaseVNode("button", {
                              onClick: $event => (editCost(record)),
                              class: "text-gray-300 hover:text-[#2F2E8B] transition-colors p-1",
                              title: "Edit"
                            }, [
                              createVNode(unref(Pencil), { size: 12 })
                            ], 8, _hoisted_46),
                            createBaseVNode("button", {
                              onClick: $event => (removeCost(record)),
                              class: "text-gray-300 hover:text-red-500 transition-colors p-1",
                              title: "Delete"
                            }, [
                              createVNode(unref(Trash2), { size: 12 })
                            ], 8, _hoisted_47)
                          ])
                        ])
                      ]))
                    }), 128))
                  ])
                ]))
        ])
      ])
    ]),
    (showCOAModal.value)
      ? (openBlock(), createElementBlock("div", _hoisted_48, [
          createBaseVNode("div", _hoisted_49, [
            _cache[55] || (_cache[55] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
            createBaseVNode("header", _hoisted_50, [
              createBaseVNode("div", _hoisted_51, [
                _cache[36] || (_cache[36] = createBaseVNode("div", { class: "w-1.5 h-8 bg-[#2F2E8B]" }, null, -1)),
                createBaseVNode("div", null, [
                  _cache[35] || (_cache[35] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Financials // CRM", -1)),
                  createBaseVNode("h2", _hoisted_52, toDisplayString(editingCostId.value ? 'Edit_Cost_Record' : 'Acquisition_Cost_Log'), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = $event => (showCOAModal.value = false)),
                class: "text-gray-400 hover:text-gray-900 transition p-2 hover:bg-gray-50 rounded-full"
              }, [
                createVNode(unref(X), { size: 20 })
              ])
            ]),
            createBaseVNode("div", _hoisted_53, [
              createBaseVNode("section", _hoisted_54, [
                createBaseVNode("div", _hoisted_55, [
                  createVNode(unref(Users), {
                    size: 14,
                    class: "text-[#2F2E8B]"
                  }),
                  _cache[37] || (_cache[37] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider" }, "Lead_Association", -1))
                ]),
                createBaseVNode("div", _hoisted_56, [
                  _cache[40] || (_cache[40] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Select Target Lead *", -1)),
                  createBaseVNode("div", {
                    class: "relative",
                    ref_key: "leadDropdownRef",
                    ref: leadDropdownRef
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["w-full bg-white border rounded-sm px-3 py-3 flex items-center gap-2 cursor-text transition", showLeadDropdown.value ? 'border-[#2F2E8B] ring-4 ring-[#2F2E8B]/10' : 'border-gray-200 hover:border-gray-300']),
                      onClick: openLeadDropdown
                    }, [
                      withDirectives(createBaseVNode("input", {
                        ref_key: "leadSearchInputRef",
                        ref: leadSearchInputRef,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((leadQuery).value = $event)),
                        onFocus: openLeadDropdown,
                        onInput: _cache[3] || (_cache[3] = $event => (showLeadDropdown.value = true)),
                        onKeydown: [
                          withKeys(closeLeadDropdown, ["escape"]),
                          _cache[4] || (_cache[4] = withKeys(withModifiers($event => (filteredLeads.value.length === 1 && selectLead(filteredLeads.value[0])), ["prevent"]), ["enter"]))
                        ],
                        placeholder: selectedLeadDisplayName.value || '-- CHOOSE_LEAD --',
                        class: "flex-1 outline-none bg-transparent font-mono text-xs tracking-tight placeholder-gray-400 min-w-0"
                      }, null, 40, _hoisted_57), [
                        [vModelText, leadQuery.value]
                      ]),
                      (coaForm.value.leadId)
                        ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            onClick: withModifiers(clearLead, ["stop"]),
                            class: "text-gray-300 hover:text-red-400 transition flex-shrink-0",
                            title: "Clear"
                          }, [
                            createVNode(unref(X), { size: 12 })
                          ]))
                        : createCommentVNode("", true),
                      createVNode(unref(ChevronRight), {
                        class: normalizeClass(["text-gray-400 flex-shrink-0 pointer-events-none transition-transform", showLeadDropdown.value ? '-rotate-90' : 'rotate-90']),
                        size: 14
                      }, null, 8, ["class"])
                    ], 2),
                    (showLeadDropdown.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_58, [
                          createBaseVNode("div", _hoisted_59, [
                            (filteredLeads.value.length === 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_60, " No leads match \"" + toDisplayString(leadQuery.value) + "\" ", 1))
                              : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLeads.value, (lead) => {
                              return (openBlock(), createElementBlock("button", {
                                key: lead.id || lead._id,
                                onMousedown: withModifiers($event => (selectLead(lead)), ["prevent"]),
                                class: normalizeClass(["w-full text-left px-3 py-2.5 text-xs font-mono hover:bg-indigo-50 transition-colors flex items-center justify-between gap-3 border-b border-gray-50 last:border-0", coaForm.value.leadId === (lead.id || lead._id) ? 'bg-indigo-50 text-[#2F2E8B] font-bold' : 'text-gray-700'])
                              }, [
                                createBaseVNode("span", _hoisted_62, toDisplayString(lead.name), 1),
                                createBaseVNode("span", _hoisted_63, toDisplayString(lead.company || 'Private'), 1)
                              ], 42, _hoisted_61))
                            }), 128))
                          ]),
                          createBaseVNode("div", _hoisted_64, toDisplayString(filteredLeads.value.length) + " of " + toDisplayString(unref(leads).length) + " leads ", 1)
                        ]))
                      : createCommentVNode("", true)
                  ], 512),
                  (coaForm.value.leadId && selectedLeadSource.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_65, [
                        createVNode(unref(Target), {
                          size: 12,
                          class: "text-[#2F2E8B] flex-shrink-0"
                        }),
                        _cache[38] || (_cache[38] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase" }, "Source:", -1)),
                        createBaseVNode("span", _hoisted_66, toDisplayString(selectedLeadSource.value), 1)
                      ]))
                    : (coaForm.value.leadId && !selectedLeadSource.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_67, [
                          createVNode(unref(Target), {
                            size: 12,
                            class: "text-gray-300 flex-shrink-0"
                          }),
                          _cache[39] || (_cache[39] = createBaseVNode("span", { class: "text-[9px] font-mono text-gray-400 uppercase" }, "No source attribution set for this lead", -1))
                        ]))
                      : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("section", _hoisted_68, [
                createBaseVNode("div", _hoisted_69, [
                  createVNode(unref(Calculator), {
                    size: 14,
                    class: "text-[#2F2E8B]"
                  }),
                  _cache[41] || (_cache[41] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider" }, "Expense_Breakdown", -1))
                ]),
                createBaseVNode("div", _hoisted_70, [
                  createBaseVNode("div", _hoisted_71, [
                    _cache[42] || (_cache[42] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Marketing Spend (AdWords/Meta)", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((coaForm.value.marketingSpend) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.marketingSpend,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_72, [
                    _cache[43] || (_cache[43] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Sales Commissions", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((coaForm.value.salesCommission) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.salesCommission,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_73, [
                    _cache[44] || (_cache[44] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Sales Tools / Subscriptions", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((coaForm.value.softwareCosts) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.softwareCosts,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_74, [
                    _cache[45] || (_cache[45] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Other Misc Costs", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((coaForm.value.otherCosts) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.otherCosts,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ])
              ]),
              createBaseVNode("section", _hoisted_75, [
                createBaseVNode("div", _hoisted_76, [
                  createVNode(unref(TrendingUp), {
                    size: 14,
                    class: "text-[#2F2E8B]"
                  }),
                  _cache[46] || (_cache[46] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider" }, "Revenue_&_Client_Value", -1))
                ]),
                createBaseVNode("div", _hoisted_77, [
                  createBaseVNode("div", _hoisted_78, [
                    _cache[47] || (_cache[47] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Lifetime Value (LTV)", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((coaForm.value.lifetimeValue) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono",
                      placeholder: "0"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.lifetimeValue,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-[8px] font-mono text-gray-400" }, "Expected total revenue over client relationship", -1))
                  ]),
                  createBaseVNode("div", _hoisted_79, [
                    _cache[49] || (_cache[49] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Revenue Made / Will Make", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((coaForm.value.revenueMade) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono",
                      placeholder: "0"
                    }, null, 512), [
                      [
                        vModelText,
                        coaForm.value.revenueMade,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[50] || (_cache[50] = createBaseVNode("span", { class: "text-[8px] font-mono text-gray-400" }, "Actual or projected revenue from this client", -1))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_80, [
                createBaseVNode("div", _hoisted_81, [
                  _cache[51] || (_cache[51] = createBaseVNode("span", { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest" }, "Total_Investment", -1)),
                  createBaseVNode("span", _hoisted_82, "$" + toDisplayString(calculatedCOA.value.toFixed(2)), 1)
                ]),
                (coaForm.value.lifetimeValue)
                  ? (openBlock(), createElementBlock("div", _hoisted_83, [
                      _cache[52] || (_cache[52] = createBaseVNode("span", { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest" }, "Lifetime_Value", -1)),
                      createBaseVNode("span", _hoisted_84, "$" + toDisplayString((coaForm.value.lifetimeValue || 0).toFixed(2)), 1)
                    ]))
                  : createCommentVNode("", true),
                (coaForm.value.revenueMade)
                  ? (openBlock(), createElementBlock("div", _hoisted_85, [
                      _cache[53] || (_cache[53] = createBaseVNode("span", { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest" }, "Revenue_Made", -1)),
                      createBaseVNode("span", _hoisted_86, "$" + toDisplayString((coaForm.value.revenueMade || 0).toFixed(2)), 1)
                    ]))
                  : createCommentVNode("", true),
                (coaForm.value.revenueMade || calculatedCOA.value > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_87, [
                      _cache[54] || (_cache[54] = createBaseVNode("span", { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest" }, "Profit / Loss", -1)),
                      createBaseVNode("div", _hoisted_88, [
                        createBaseVNode("span", {
                          class: normalizeClass([profitLoss.value >= 0 ? 'text-green-400' : 'text-red-400', "text-lg font-mono font-black"])
                        }, toDisplayString(profitLoss.value >= 0 ? '+' : '') + "$" + toDisplayString(profitLoss.value.toFixed(2)), 3),
                        createBaseVNode("span", {
                          class: normalizeClass([roi.value >= 0 ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20', "text-[9px] font-mono font-bold border px-2 py-0.5 rounded-sm"])
                        }, toDisplayString(roi.value >= 0 ? '▲' : '▼') + " " + toDisplayString(Math.abs(roi.value).toFixed(1)) + "% ROI ", 3)
                      ])
                    ]))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("footer", _hoisted_89, [
              createBaseVNode("button", {
                onClick: _cache[11] || (_cache[11] = $event => (showCOAModal.value = false)),
                class: "px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition"
              }, "Cancel_Entry"),
              createBaseVNode("button", {
                onClick: saveCOA,
                disabled: savingCOA.value,
                class: "px-8 py-2.5 bg-[#2F2E8B] text-white rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#252475] transition flex items-center gap-2 shadow-lg shadow-indigo-900/10 disabled:opacity-50"
              }, [
                (savingCOA.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_91))
                  : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(editingCostId.value ? 'Update_Record' : 'Save_COA_Analytics'), 1)
              ], 8, _hoisted_90)
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const CRMAcquisitionPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-bd4ac2c6"]]);

export { CRMAcquisitionPage as default };
