import { T as axios, U as API_BASE_URL, r as ref, D as computed, h as onMounted, o as openBlock, c as createElementBlock, q as createVNode, F as Fragment, b as createBaseVNode, t as toDisplayString, y as unref, m as createTextVNode, e as renderList, a as createStaticVNode, l as createCommentVNode, j as normalizeClass, n as normalizeStyle } from './index-F0Jaczum.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-qKyxdt4w.js';
import { A as AiCampaignModal } from './AiCampaignModal-BXqMdgHE.js';
import { u as useCustomerStore } from './customerStore-CYbEJoNT.js';
import { u as usePredictionStore } from './predictionStore-YU93sQRm.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-screen flex flex-col space-y-6"
};
const _hoisted_3 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_4 = { class: "text-body-md text-gray-500 mt-1" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "flex border-b border-gray-300 mb-6" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_9 = {
  key: 0,
  class: "ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full"
};
const _hoisted_10 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_11 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_12 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_13 = { class: "grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" };
const _hoisted_14 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_15 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_16 = { class: "inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider" };
const _hoisted_17 = { class: "p-5" };
const _hoisted_18 = { class: "grid grid-cols-4 gap-3" };
const _hoisted_19 = {
  key: 0,
  class: "absolute -left-2.5 top-4 text-gray-300"
};
const _hoisted_20 = { class: "bg-white border border-gray-300 rounded-sm p-3" };
const _hoisted_21 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2" };
const _hoisted_22 = { class: "w-full h-0.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_23 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_24 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_25 = { class: "inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider" };
const _hoisted_26 = { class: "p-5" };
const _hoisted_27 = { class: "grid grid-cols-4 gap-3" };
const _hoisted_28 = {
  key: 0,
  class: "absolute -left-2.5 top-4 text-gray-300"
};
const _hoisted_29 = { class: "bg-white border border-gray-300 rounded-sm p-3" };
const _hoisted_30 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2" };
const _hoisted_31 = { class: "w-full h-0.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_32 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_33 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_34 = { class: "flex text-[11px] font-bold border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_35 = ["onClick"];
const _hoisted_36 = { class: "p-5" };
const _hoisted_37 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_38 = { class: "flex flex-col gap-3" };
const _hoisted_39 = { class: "flex items-center gap-2 w-44 flex-shrink-0" };
const _hoisted_40 = { class: "text-xs text-gray-600 font-medium truncate" };
const _hoisted_41 = { class: "flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden relative" };
const _hoisted_42 = { class: "absolute right-2 top-0 h-full flex items-center text-[11px] font-bold text-absa-enrich font-mono" };
const _hoisted_43 = { class: "flex flex-col gap-4" };
const _hoisted_44 = { class: "border border-gray-300 rounded-sm p-4 flex justify-between items-center" };
const _hoisted_45 = { class: "text-2xl font-bold text-absa-passion font-mono mt-1" };
const _hoisted_46 = { class: "border border-gray-300 rounded-sm p-4 flex justify-between items-center" };
const _hoisted_47 = { class: "text-2xl font-bold text-absa-enrich font-mono mt-1" };
const _hoisted_48 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_49 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_50 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_51 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_52 = { class: "overflow-x-auto" };
const _hoisted_53 = { class: "w-full min-w-[860px] text-left border-collapse" };
const _hoisted_54 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_55 = { key: 0 };
const _hoisted_56 = { class: "px-5 py-3" };
const _hoisted_57 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_58 = { class: "text-[11px] text-gray-400 mt-0.5" };
const _hoisted_59 = { class: "px-4 py-3 text-right font-mono text-xs text-gray-700" };
const _hoisted_60 = { class: "px-4 py-3" };
const _hoisted_61 = { class: "flex items-center gap-3" };
const _hoisted_62 = { class: "w-20 h-1 bg-gray-200 rounded-full overflow-hidden flex-shrink-0" };
const _hoisted_63 = { class: "font-mono text-xs text-absa-enrich whitespace-nowrap" };
const _hoisted_64 = { class: "text-gray-400 font-normal" };
const _hoisted_65 = { class: "px-4 py-3 text-center" };
const _hoisted_66 = { class: "px-5 py-3 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400" };
const _hoisted_67 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_68 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_69 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_70 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_71 = { class: "overflow-x-auto" };
const _hoisted_72 = { class: "w-full text-left border-collapse" };
const _hoisted_73 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_74 = { class: "px-5 py-3" };
const _hoisted_75 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_76 = { class: "text-[11px] text-gray-400 mt-0.5" };
const _hoisted_77 = { class: "px-4 py-3" };
const _hoisted_78 = { class: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600" };
const _hoisted_79 = { class: "material-symbols-outlined text-[14px]" };
const _hoisted_80 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_81 = { class: "px-4 py-3 text-right font-mono text-xs font-bold text-absa-enrich" };
const _hoisted_82 = { class: "px-4 py-3 text-right font-mono text-xs text-gray-600" };
const _hoisted_83 = { class: "px-4 py-3 text-right font-mono text-xs font-bold text-absa-passion" };
const _hoisted_84 = { class: "px-4 py-3" };
const _hoisted_85 = { class: "flex items-center gap-2" };
const _hoisted_86 = { class: "w-16 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_87 = { class: "text-[11px] font-bold font-mono text-absa-enrich" };
const _hoisted_88 = { class: "px-4 py-3 text-center" };
const _hoisted_89 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_90 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_91 = { class: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-absa-passion border border-absa-passion/30 rounded-sm text-xs font-bold" };
const _hoisted_92 = { class: "w-full text-left" };
const _hoisted_93 = { class: "divide-y divide-gray-100" };
const _hoisted_94 = { class: "px-5 py-3" };
const _hoisted_95 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_96 = { class: "text-[11px] text-gray-400 font-mono" };
const _hoisted_97 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_98 = { class: "px-4 py-3" };
const _hoisted_99 = { class: "flex items-center gap-2" };
const _hoisted_100 = { class: "w-14 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_101 = { class: "font-bold font-mono text-xs text-absa-passion" };
const _hoisted_102 = { class: "px-4 py-3 font-mono text-xs font-bold text-absa-passion" };
const _hoisted_103 = {
  key: 3,
  class: "grid grid-cols-1 xl:grid-cols-12 gap-6"
};
const _hoisted_104 = { class: "xl:col-span-8 rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_105 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_106 = { class: "flex gap-1.5" };
const _hoisted_107 = ["onClick"];
const _hoisted_108 = { class: "w-full text-left" };
const _hoisted_109 = { class: "divide-y divide-gray-100" };
const _hoisted_110 = { class: "px-5 py-3" };
const _hoisted_111 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_112 = { class: "text-[11px] text-gray-400 font-mono" };
const _hoisted_113 = { class: "px-4 py-3" };
const _hoisted_114 = { class: "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_115 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_116 = { class: "px-4 py-3" };
const _hoisted_117 = { class: "flex items-center gap-2" };
const _hoisted_118 = { class: "w-12 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_119 = { class: "px-4 py-3 font-mono text-xs text-gray-700" };
const _hoisted_120 = { class: "px-4 py-3 text-right" };
const _hoisted_121 = {
  key: 0,
  class: "text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors"
};
const _hoisted_122 = {
  key: 1,
  class: "text-[11px] font-bold text-gray-600 border border-gray-300 px-2.5 py-1 rounded-sm hover:bg-gray-50 transition-colors"
};
const _hoisted_123 = { class: "xl:col-span-4 flex flex-col gap-4" };
const _hoisted_124 = { class: "rounded-sm border border-gray-300 border-l-4 border-l-absa-passion overflow-hidden" };
const _hoisted_125 = { class: "p-4 flex flex-col gap-3" };
const _hoisted_126 = { class: "flex items-start gap-2 mb-2" };
const _hoisted_127 = { class: "text-xs font-semibold text-absa-enrich leading-snug" };
const _hoisted_128 = { class: "text-[11px] text-gray-600 leading-relaxed mb-2" };
const _hoisted_129 = { class: "flex items-center justify-between" };
const _hoisted_130 = { class: "text-[10px] text-gray-400 font-mono" };
const _hoisted_131 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_132 = { class: "p-4 flex flex-col gap-4" };
const _hoisted_133 = { class: "flex justify-between text-[11px] mb-1.5" };
const _hoisted_134 = { class: "flex items-center gap-1.5" };
const _hoisted_135 = { class: "inline-flex px-1 py-0.5 rounded-sm text-[9px] font-bold bg-gray-100 text-gray-500" };
const _hoisted_136 = { class: "text-gray-600 font-medium" };
const _hoisted_137 = { class: "font-bold font-mono text-absa-enrich" };
const _hoisted_138 = { class: "w-full h-1 rounded-full overflow-hidden bg-gray-200" };

const DEFAULT_AS_OF_DATE = '2026-07-27';

const _sfc_main = {
  __name: 'BranchManagerDashboard',
  setup(__props) {

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const customerStore   = useCustomerStore();
const predictionStore = usePredictionStore();

const loading         = ref(true);
const activeTab       = ref('overview');
const forecastHorizon = ref(30);
const caseFilter      = ref('all');
const branchData      = ref([]);
const segmentData     = ref([]);
const forecastData    = ref(null);

const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

// ── Portfolio tracks ──
const rmTrack = computed(() => ({ total: 20630, atRisk: 186, openCases: 42 }));
const branchTrack = computed(() => {
  const total  = (customerStore.portfolio.total || 204050) - rmTrack.value.total;
  const atRisk = Math.round(total * 0.078);
  return { total, atRisk, inCampaign: Math.round(atRisk * 0.58) }
});

// ── Tabs ──
const tabs = computed(() => [
  { id: 'overview',     label: 'Overview',        icon: 'gauge'            },
  { id: 'rm_portfolio', label: 'RM Portfolio',    icon: 'manage_accounts'  },
  { id: 'campaigns',    label: 'Branch Campaigns',icon: 'campaign'         },
  { id: 'cases',        label: 'All Cases',        icon: 'assignment_late', badge: kpis.value.newFlagsToday || null },
]);

// ── KPIs ──
const kpis = computed(() => {
  const avgChurn      = forecastData.value?.churn_rate_pct || customerStore.portfolio.churnedPct || 5.8;
  const totalBranches = branchData.value.length || 13;
  return {
    totalBranches,
    newFlagsToday:       49,
    retentionRate:       72,
    churnTarget:         6.0,
    monthlyChurnValue:   avgChurn,
    churnRateAboveTarget: avgChurn > 6.0,
  }
});

const overviewKpis = computed(() => [
  { label: 'New High-Risk (Today)', value: kpis.value.newFlagsToday,          valueClass: 'text-absa-passion', note: 'Flagged since yesterday' },
  { label: 'RM Pending AI Interventions',        value: rmTrack.value.openCases,            valueClass: 'text-absa-enrich',  note: 'Premium · uncontacted' },
  { label: 'Not in Campaign',      value: (branchTrack.value.atRisk - branchTrack.value.inCampaign).toLocaleString(), valueClass: 'text-absa-passion', note: 'Mass-market · no outreach' },
  { label: 'Campaign Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), valueClass: 'text-absa-enrich', note: `of ${branchTrack.value.atRisk.toLocaleString()} at-risk` },
  { label: 'Retention Rate MTD',   value: kpis.value.retentionRate + '%',     valueClass: 'text-absa-passion',    note: 'All channels combined' },
  { label: 'Churn vs Target',      value: kpis.value.monthlyChurnValue + '%', valueClass: kpis.value.churnRateAboveTarget ? 'text-absa-inspire' : 'text-absa-passion', note: `Target: ${kpis.value.churnTarget}%` },
]);

// ── RM Pipeline ──
const rmPipeline = computed(() => {
  const f = rmTrack.value.atRisk;
  const a = Math.round(f * 0.77), c = Math.round(f * 0.61), r = Math.round(c * 0.82);
  return [
    { label: 'Flagged',   value: f, valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Assigned',  value: a, valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Contacted', value: c, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r, valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
});

// ── Branch Pipeline ──
const branchPipeline = computed(() => {
  const f = branchTrack.value.atRisk, e = branchTrack.value.inCampaign;
  const res = Math.round(e * 0.34), r = Math.round(res * 0.68);
  return [
    { label: 'Flagged',   value: f,   valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Enrolled',  value: e,   valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Responded', value: res, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r,   valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
});

// ── Forecast ──
const forecastWeeks = computed(() => {
  const segs = [
    { label: 'Youth (18–25)',    value: 445, track: 'branch' },
    { label: 'Retail Savings',   value: 312, track: 'branch' },
    { label: 'Business Current', value: 198, track: 'branch' },
    { label: 'Premier Banking',  value: 54,  track: 'rm'     },
    { label: 'Wealth Mgmt',      value: 30,  track: 'rm'     },
  ];
  const max = Math.max(...segs.map(s => s.value));
  return segs.map(s => ({ ...s, pct: Math.round(s.value / max * 100) }))
});
const totalForecast = computed(() => forecastWeeks.value.reduce((s, w) => s + w.value, 0));
const estimatedAUM  = computed(() => {
  const v = totalForecast.value * 42000;
  return v >= 1e6 ? 'K' + (v / 1e6).toFixed(1) + 'M' : 'K' + v.toLocaleString()
});

// ── RM Table ──
const relationshipManagers = computed(() => [
  { name: 'Naledi Khumalo', segment: 'Wealth Management', portfolio: 84,  avgRiskScore: 38, openCases: 8,  actioned: 19, target: 20, retentionRate: 88, daysSinceActivity: 0 },
  { name: 'Ayanda Nkosi',   segment: 'Premier Banking',   portfolio: 127, avgRiskScore: 48, openCases: 18, actioned: 24, target: 28, retentionRate: 71, daysSinceActivity: 2 },
  { name: 'Dineo Molefe',   segment: 'Premier Banking',   portfolio: 98,  avgRiskScore: 61, openCases: 16, actioned: 18, target: 25, retentionRate: 65, daysSinceActivity: 1 },
].map(rm => {
  const pct = (rm.actioned / rm.target) * 100;
  const s   = pct >= 80 && rm.retentionRate >= 65 ? 'ON TRACK' : rm.daysSinceActivity > 3 || rm.retentionRate < 50 ? 'AT RISK' : 'MONITOR';
  return { ...rm, status: s,
    statusClass: s === 'ON TRACK' ? 'bg-red-50 text-absa-passion' : s === 'AT RISK' ? 'bg-red-100 text-absa-inspire' : 'bg-amber-100 text-amber-700',
    dotClass: s === 'ON TRACK' ? 'bg-absa-passion' : s === 'AT RISK' ? 'bg-absa-inspire' : 'bg-amber-500'
  }
}));

const rmStatusCounts = computed(() =>
  relationshipManagers.value.reduce((a, r) => { a[r.status] = (a[r.status] || 0) + 1; return a }, {})
);

const rmSummaryKpis = computed(() => [
  { label: 'Active RMs',      value: relationshipManagers.value.length, note: 'Premium segment only' },
  { label: 'On Track',        value: rmStatusCounts.value['ON TRACK'] || 0, valueClass: 'text-absa-passion', note: 'Meeting targets' },
  { label: 'Monitoring',      value: rmStatusCounts.value['MONITOR']  || 0, valueClass: 'text-absa-energy', note: 'Needs attention' },
  { label: 'Needs Attention', value: rmStatusCounts.value['AT RISK']  || 0, valueClass: 'text-absa-passion', note: 'Idle or low retention' },
]);

// ── Campaigns ──
const activeCampaigns = ref([
  { name: 'SMS Retention Offer — Q3 Savings', channel: 'SMS',         channelIcon: 'sms',           segment: 'Retail Savings',    expires: '2026-08-31', enrolled: 412, responded: 148, retained: 101, conversionPct: 25, status: 'ACTIVE',  statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Youth Re-engagement Drive',         channel: 'Digital',     channelIcon: 'phone_iphone',  segment: 'Youth (18–25)',     expires: '2026-09-15', enrolled: 319, responded: 87,  retained: 54,  conversionPct: 17, status: 'ACTIVE',  statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Call Centre — Business Win-Back',   channel: 'Call Centre', channelIcon: 'support_agent', segment: 'Standard Business', expires: '2026-08-28', enrolled: 88,  responded: 41,  retained: 33,  conversionPct: 38, status: 'ACTIVE',  statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Email — Savings Rate Offer',        channel: 'Email',       channelIcon: 'mail',          segment: 'Retail Savings',    expires: '2026-07-31', enrolled: 204, responded: 55,  retained: 38,  conversionPct: 19, status: 'EXPIRED', statusClass: 'bg-gray-100 text-gray-500',   dotClass: 'bg-gray-400'  },
]);

const campaignKpis = computed(() => [
  { label: 'Active Campaigns',    value: activeCampaigns.value.filter(c => c.status === 'ACTIVE').length, note: 'Running this month' },
  { label: 'At-Risk Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), note: `of ${branchTrack.value.atRisk.toLocaleString()} flagged` },
  { label: 'Avg Response Rate',   value: '34%', valueClass: 'text-absa-energy', note: 'Responded to outreach' },
  { label: 'Retained via Campaign', value: Math.round(branchTrack.value.inCampaign * 0.34 * 0.68).toLocaleString(), valueClass: 'text-green-600', note: 'Confirmed no churn MTD' },
]);

const unenrolledCustomers = ref([
  { id: 'CU-02341', name: 'Palesa Dlamini',    segment: 'Retail Savings', prob: 82, daysFlagged: 9  },
  { id: 'CU-03812', name: 'Thabo Khumalo',     segment: 'Youth (18–25)', prob: 79, daysFlagged: 6  },
  { id: 'CU-01998', name: 'Nomsa Sithole',     segment: 'Retail Savings', prob: 74, daysFlagged: 11 },
  { id: 'CU-04201', name: 'Lebogang Mahlangu', segment: 'Youth (18–25)', prob: 71, daysFlagged: 4  },
]);

// ── Cases ──
const caseFilters = [
  { id: 'all',    label: 'All'     },
  { id: 'rm',     label: 'RM'      },
  { id: 'branch', label: 'Branch'  },
];

const allCases = ref([
  { id: 'CU-00421', name: 'Mpho Radebe',     track: 'rm',     segment: 'Premier Banking',   prob: 91, aum: 'K 2.1M', daysFlagged: 12 },
  { id: 'CU-00887', name: 'Zanele Motsepe',  track: 'rm',     segment: 'Wealth Management', prob: 88, aum: 'K 1.8M', daysFlagged: 9  },
  { id: 'CU-02341', name: 'Palesa Dlamini',  track: 'branch', segment: 'Retail Savings',    prob: 82, aum: 'K 38K',  daysFlagged: 9  },
  { id: 'CU-01142', name: 'Tebogo Mahlangu', track: 'rm',     segment: 'Premier Banking',   prob: 79, aum: 'K 840K', daysFlagged: 7  },
  { id: 'CU-03812', name: 'Thabo Khumalo',   track: 'branch', segment: 'Youth (18–25)',     prob: 79, aum: 'K 12K',  daysFlagged: 6  },
  { id: 'CU-00334', name: 'Kefilwe Sithole', track: 'branch', segment: 'Retail Savings',    prob: 74, aum: 'K 52K',  daysFlagged: 14 },
  { id: 'CU-00756', name: 'Kagiso Nkosi',    track: 'branch', segment: 'Youth (18–25)',     prob: 71, aum: 'K 9K',   daysFlagged: 5  },
  { id: 'CU-00198', name: 'Dineo Molefe',    track: 'rm',     segment: 'Premier Banking',   prob: 74, aum: 'K 1.2M', daysFlagged: 11 },
]);

const filteredCases = computed(() =>
  caseFilter.value === 'all' ? allCases.value : allCases.value.filter(c => c.track === caseFilter.value)
);

const churnSegments = [
  { name: 'Youth (18–25)',     pct: 38, track: 'branch' },
  { name: 'Retail Savings',    pct: 22, track: 'branch' },
  { name: 'Business Current',  pct: 18, track: 'branch' },
  { name: 'Premier Banking',   pct: 9,  track: 'rm'     },
  { name: 'Wealth Management', pct: 5,  track: 'rm'     },
];

const aiPriorityActions = ref([
  { urgency: 'URGENT', urgencyClass: 'bg-red-100 text-absa-passion', title: '2 Premier clients uncontacted for 10+ days', detail: 'High AUM accounts at critical churn risk. Assign to available RM immediately.', meta: '2 RM-managed · K 3.9M' },
  { urgency: 'HIGH',   urgencyClass: 'bg-amber-100 text-amber-700',  title: '276 Youth customers with no campaign enrolment', detail: 'Youth churn accelerating. Enrol in the Youth Re-engagement Drive campaign.', meta: '276 branch-managed' },
]);

// ── Fetch ──
onMounted(async () => {
  try {
    await customerStore.fetchPortfolio();
    predictionStore.fetchChurnDrivers();
    const [bRes, sRes, fRes] = await Promise.all([
      api.get('/api/v1/churn-intel/branches', { params: { as_of_date: DEFAULT_AS_OF_DATE } }),
      api.get('/api/v1/churn-intel/segments', { params: { as_of_date: DEFAULT_AS_OF_DATE } }),
      api.get('/api/v1/forecasts/churn',      { params: { as_of_date: DEFAULT_AS_OF_DATE } }),
    ]);
    branchData.value   = bRes.data.branches || [];
    segmentData.value  = sRes.data.segments || [];
    forecastData.value = fRes.data;
  } catch (e) {
    console.warn('BranchManagerDashboard: API error', e.message);
  } finally {
    loading.value = false;
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$1, { type: "stats" }),
          createVNode(_sfc_main$1, { type: "block" }),
          createVNode(_sfc_main$1, {
            type: "table",
            count: 5
          })
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Home"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Branch Manager")
              ], -1)),
              _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Branch Manager Dashboard", -1)),
              createBaseVNode("p", _hoisted_4, toDisplayString(kpis.value.totalBranches) + " branches · " + toDisplayString(unref(customerStore).portfolio.total.toLocaleString()) + " total customers · " + toDisplayString(unref(currentMonth)), 1)
            ]),
            createBaseVNode("div", _hoisted_5, [
              _cache[5] || (_cache[5] = createBaseVNode("button", { class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none" }, [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download"),
                createTextVNode("Export Report ")
              ], -1)),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.showCampaignModal = true)),
                class: "px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-bold shadow-none"
              }, [...(_cache[4] || (_cache[4] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "auto_awesome", -1),
                createTextVNode("AI Campaign Generator ", -1)
              ]))])
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab) => {
              return (openBlock(), createElementBlock("button", {
                key: tab.id,
                onClick: $event => (activeTab.value = tab.id),
                class: normalizeClass(['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
              }, [
                createBaseVNode("span", _hoisted_8, toDisplayString(tab.icon), 1),
                createTextVNode(" " + toDisplayString(tab.label) + " ", 1),
                (tab.badge)
                  ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(tab.badge), 1))
                  : createCommentVNode("", true)
              ], 10, _hoisted_7))
            }), 128))
          ]),
          (activeTab.value === 'overview')
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_10, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(overviewKpis.value, (kpi) => {
                    return (openBlock(), createElementBlock("div", {
                      key: kpi.label,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_11, toDisplayString(kpi.label), 1),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-2xl font-bold font-mono", kpi.valueClass || 'text-absa-enrich'])
                      }, toDisplayString(kpi.value), 3),
                      createBaseVNode("p", _hoisted_12, toDisplayString(kpi.note), 1)
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("div", _hoisted_15, [
                      _cache[6] || (_cache[6] = createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "RM-Managed Pipeline"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Premier Banking & Wealth Management · Dedicated RM per customer")
                      ], -1)),
                      createBaseVNode("span", _hoisted_16, toDisplayString(rmTrack.value.total.toLocaleString()) + " customers", 1)
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(rmPipeline.value, (stage, i) => {
                          return (openBlock(), createElementBlock("div", {
                            key: stage.label,
                            class: "relative"
                          }, [
                            (i > 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_19, [...(_cache[7] || (_cache[7] = [
                                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "arrow_right", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            createBaseVNode("div", _hoisted_20, [
                              createBaseVNode("p", _hoisted_21, toDisplayString(stage.label), 1),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-xl font-bold font-mono mb-2", stage.valueClass])
                              }, toDisplayString(stage.value), 3),
                              createBaseVNode("div", _hoisted_22, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["h-full rounded-full", stage.barClass]),
                                  style: normalizeStyle({ width: (stage.value / rmPipeline.value[0].value * 100) + '%' })
                                }, null, 6)
                              ])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, [
                      _cache[8] || (_cache[8] = createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Branch Campaign Pipeline"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Retail Savings, Youth, Business · No dedicated RM · Campaign-based retention")
                      ], -1)),
                      createBaseVNode("span", _hoisted_25, toDisplayString(branchTrack.value.total.toLocaleString()) + " customers", 1)
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      createBaseVNode("div", _hoisted_27, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(branchPipeline.value, (stage, i) => {
                          return (openBlock(), createElementBlock("div", {
                            key: stage.label,
                            class: "relative"
                          }, [
                            (i > 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_28, [...(_cache[9] || (_cache[9] = [
                                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "arrow_right", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            createBaseVNode("div", _hoisted_29, [
                              createBaseVNode("p", _hoisted_30, toDisplayString(stage.label), 1),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-xl font-bold font-mono mb-2", stage.valueClass])
                              }, toDisplayString(stage.value.toLocaleString()), 3),
                              createBaseVNode("div", _hoisted_31, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["h-full rounded-full", stage.barClass]),
                                  style: normalizeStyle({ width: (stage.value / branchPipeline.value[0].value * 100) + '%' })
                                }, null, 6)
                              ])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, [
                    _cache[10] || (_cache[10] = createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Churn Forecast — Projected Exits by Segment"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "AI-projected customer exits · Powered by LightGBM v1.4.2")
                    ], -1)),
                    createBaseVNode("div", _hoisted_34, [
                      (openBlock(), createElementBlock(Fragment, null, renderList([30, 60, 90], (d) => {
                        return createBaseVNode("button", {
                          key: d,
                          onClick: $event => (forecastHorizon.value = d),
                          class: normalizeClass(['px-3 py-1.5', forecastHorizon.value === d ? 'bg-absa-passion text-white' : 'text-gray-500 hover:bg-gray-50'])
                        }, toDisplayString(d) + "D ", 11, _hoisted_35)
                      }), 64))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_36, [
                    createBaseVNode("div", _hoisted_37, [
                      createBaseVNode("div", _hoisted_38, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(forecastWeeks.value, (seg) => {
                          return (openBlock(), createElementBlock("div", {
                            key: seg.label,
                            class: "flex items-center gap-3"
                          }, [
                            createBaseVNode("div", _hoisted_39, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded-sm", seg.track === 'rm' ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'])
                              }, toDisplayString(seg.track === 'rm' ? 'RM' : 'BRANCH'), 3),
                              createBaseVNode("span", _hoisted_40, toDisplayString(seg.label), 1)
                            ]),
                            createBaseVNode("div", _hoisted_41, [
                              createBaseVNode("div", {
                                class: "h-full bg-absa-passion/70 rounded-sm transition-all duration-500",
                                style: normalizeStyle({ width: seg.pct + '%' })
                              }, null, 4),
                              createBaseVNode("span", _hoisted_42, toDisplayString(seg.value.toLocaleString()), 1)
                            ])
                          ]))
                        }), 128))
                      ]),
                      createBaseVNode("div", _hoisted_43, [
                        createBaseVNode("div", _hoisted_44, [
                          createBaseVNode("div", null, [
                            _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-[11px] text-gray-500 uppercase font-bold tracking-wider" }, "Total Projected Exits", -1)),
                            createBaseVNode("p", _hoisted_45, toDisplayString(totalForecast.value.toLocaleString()), 1)
                          ]),
                          _cache[12] || (_cache[12] = createBaseVNode("span", { class: "material-symbols-outlined text-[30px] text-gray-200" }, "group_remove", -1))
                        ]),
                        createBaseVNode("div", _hoisted_46, [
                          createBaseVNode("div", null, [
                            _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-[11px] text-gray-500 uppercase font-bold tracking-wider" }, "Estimated AUM at Risk", -1)),
                            createBaseVNode("p", _hoisted_47, toDisplayString(estimatedAUM.value), 1)
                          ]),
                          _cache[14] || (_cache[14] = createBaseVNode("span", { class: "material-symbols-outlined text-[30px] text-gray-200" }, "account_balance", -1))
                        ])
                      ])
                    ])
                  ])
                ])
              ], 64))
            : (activeTab.value === 'rm_portfolio')
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  _cache[21] || (_cache[21] = createStaticVNode("<div class=\"mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3\"><span class=\"material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0\">info</span><p class=\"text-xs text-gray-600\"><span class=\"font-bold text-absa-enrich\">Scope:</span> This view covers only <span class=\"font-semibold\">Premier Banking</span> and <span class=\"font-semibold\">Wealth Management</span> customers assigned to a dedicated Relationship Manager. For mass-market retention, see the <span class=\"font-semibold\">Branch Campaigns</span> tab. </p></div>", 1)),
                  createBaseVNode("div", _hoisted_48, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(rmSummaryKpis.value, (kpi) => {
                      return (openBlock(), createElementBlock("div", {
                        key: kpi.label,
                        class: "bg-white border border-gray-300 rounded-sm p-4"
                      }, [
                        createBaseVNode("p", _hoisted_49, toDisplayString(kpi.label), 1),
                        createBaseVNode("p", {
                          class: normalizeClass(["text-2xl font-bold font-mono", kpi.valueClass || 'text-absa-enrich'])
                        }, toDisplayString(kpi.value), 3),
                        createBaseVNode("p", _hoisted_50, toDisplayString(kpi.note), 1)
                      ]))
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_51, [
                    _cache[20] || (_cache[20] = createStaticVNode("<div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center\"><div><h2 class=\"text-sm font-bold text-absa-enrich\">Relationship Manager Workload</h2><p class=\"text-[11px] text-gray-500 mt-0.5\">Individual RM operational metrics · Premium segment only · Sourced from Nightly Inference Batch</p></div><div class=\"flex gap-2\"><button class=\"px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none\"><span class=\"material-symbols-outlined text-[14px]\">filter_list</span>Filter </button><button class=\"px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none\"><span class=\"material-symbols-outlined text-[14px]\">download</span>Export </button></div></div>", 1)),
                    createBaseVNode("div", _hoisted_52, [
                      createBaseVNode("table", _hoisted_53, [
                        _cache[16] || (_cache[16] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-5 py-3" }, "Relationship Manager"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Portfolio"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Avg Risk Score"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Pending AI Interventions"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Cases Actioned MTD"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Retention Rate"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Last Activity"),
                            createBaseVNode("th", { class: "px-4 py-3 text-center" }, "Status")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_54, [
                          (relationshipManagers.value.length === 0)
                            ? (openBlock(), createElementBlock("tr", _hoisted_55, [...(_cache[15] || (_cache[15] = [
                                createBaseVNode("td", {
                                  colspan: "8",
                                  class: "p-12 text-center text-gray-400 text-sm"
                                }, "No RM data available", -1)
                              ]))]))
                            : createCommentVNode("", true),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(relationshipManagers.value, (rm) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: rm.name,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_56, [
                                createBaseVNode("p", _hoisted_57, toDisplayString(rm.name), 1),
                                createBaseVNode("p", _hoisted_58, toDisplayString(rm.segment), 1)
                              ]),
                              createBaseVNode("td", _hoisted_59, toDisplayString(rm.portfolio.toLocaleString()), 1),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.avgRiskScore > 65 ? 'text-absa-inspire' : rm.avgRiskScore > 45 ? 'text-absa-power' : 'text-absa-passion'])
                              }, toDisplayString(rm.avgRiskScore), 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.openCases > 15 ? 'text-absa-inspire' : rm.openCases > 8 ? 'text-absa-energy' : 'text-absa-passion'])
                              }, toDisplayString(rm.openCases), 3),
                              createBaseVNode("td", _hoisted_60, [
                                createBaseVNode("div", _hoisted_61, [
                                  createBaseVNode("div", _hoisted_62, [
                                    createBaseVNode("div", {
                                      class: "h-full bg-absa-passion rounded-full",
                                      style: normalizeStyle({ width: Math.min((rm.actioned / rm.target) * 100, 100) + '%' })
                                    }, null, 4)
                                  ]),
                                  createBaseVNode("span", _hoisted_63, [
                                    createTextVNode(toDisplayString(rm.actioned), 1),
                                    createBaseVNode("span", _hoisted_64, " / " + toDisplayString(rm.target), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.retentionRate >= 70 ? 'text-absa-passion' : rm.retentionRate >= 50 ? 'text-absa-energy' : 'text-absa-inspire'])
                              }, toDisplayString(rm.retentionRate) + "% ", 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right text-xs", rm.daysSinceActivity > 3 ? 'text-absa-passion font-bold' : 'text-gray-500'])
                              }, toDisplayString(rm.daysSinceActivity === 0 ? 'Today' : rm.daysSinceActivity + 'd ago'), 3),
                              createBaseVNode("td", _hoisted_65, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', rm.statusClass])
                                }, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(["w-1 h-1 rounded-full", rm.dotClass])
                                  }, null, 2),
                                  createTextVNode(toDisplayString(rm.status), 1)
                                ], 2)
                              ])
                            ]))
                          }), 128))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_66, [
                      _cache[17] || (_cache[17] = createBaseVNode("span", { class: "font-bold text-absa-passion" }, "ON TRACK", -1)),
                      _cache[18] || (_cache[18] = createTextVNode(" = actioned >80% of target & retention ≥65% · ", -1)),
                      _cache[19] || (_cache[19] = createBaseVNode("span", { class: "font-bold text-absa-inspire" }, "AT RISK", -1)),
                      createTextVNode(" = idle >3 days or retention <50% · " + toDisplayString(unref(currentMonth)), 1)
                    ])
                  ])
                ], 64))
              : (activeTab.value === 'campaigns')
                ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    _cache[28] || (_cache[28] = createStaticVNode("<div class=\"mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3\"><span class=\"material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0\">info</span><p class=\"text-xs text-gray-600\"><span class=\"font-bold text-absa-enrich\">Scope:</span> Mass-market customers — <span class=\"font-semibold\">Retail Savings</span>, <span class=\"font-semibold\">Youth (18–25)</span>, <span class=\"font-semibold\">Standard Business</span> — have no dedicated RM. Retention is managed through outreach campaigns and call centre referrals. </p></div>", 1)),
                    createBaseVNode("div", _hoisted_67, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(campaignKpis.value, (kpi) => {
                        return (openBlock(), createElementBlock("div", {
                          key: kpi.label,
                          class: "bg-white border border-gray-300 rounded-sm p-4"
                        }, [
                          createBaseVNode("p", _hoisted_68, toDisplayString(kpi.label), 1),
                          createBaseVNode("p", {
                            class: normalizeClass(["text-2xl font-bold font-mono", kpi.valueClass || 'text-absa-enrich'])
                          }, toDisplayString(kpi.value), 3),
                          createBaseVNode("p", _hoisted_69, toDisplayString(kpi.note), 1)
                        ]))
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_70, [
                      _cache[23] || (_cache[23] = createStaticVNode("<div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center\"><div><h2 class=\"text-sm font-bold text-absa-enrich\">Active Retention Campaigns</h2><p class=\"text-[11px] text-gray-500 mt-0.5\">Branch-level outreach targeting mass-market at-risk customers</p></div><button class=\"px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none\"><span class=\"material-symbols-outlined text-[16px]\">add</span>New Campaign </button></div>", 1)),
                      createBaseVNode("div", _hoisted_71, [
                        createBaseVNode("table", _hoisted_72, [
                          _cache[22] || (_cache[22] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "px-5 py-3" }, "Campaign"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Channel"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Enrolled"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Responded"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Retained"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Conversion"),
                              createBaseVNode("th", { class: "px-4 py-3 text-center" }, "Status")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_73, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(activeCampaigns.value, (c) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: c.name,
                                class: "hover:bg-gray-50 transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_74, [
                                  createBaseVNode("p", _hoisted_75, toDisplayString(c.name), 1),
                                  createBaseVNode("p", _hoisted_76, "Expires " + toDisplayString(c.expires), 1)
                                ]),
                                createBaseVNode("td", _hoisted_77, [
                                  createBaseVNode("span", _hoisted_78, [
                                    createBaseVNode("span", _hoisted_79, toDisplayString(c.channelIcon), 1),
                                    createTextVNode(toDisplayString(c.channel), 1)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_80, toDisplayString(c.segment), 1),
                                createBaseVNode("td", _hoisted_81, toDisplayString(c.enrolled.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_82, toDisplayString(c.responded.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_83, toDisplayString(c.retained.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_84, [
                                  createBaseVNode("div", _hoisted_85, [
                                    createBaseVNode("div", _hoisted_86, [
                                      createBaseVNode("div", {
                                        class: "h-full bg-absa-passion rounded-full",
                                        style: normalizeStyle({ width: c.conversionPct + '%' })
                                      }, null, 4)
                                    ]),
                                    createBaseVNode("span", _hoisted_87, toDisplayString(c.conversionPct) + "%", 1)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_88, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', c.statusClass])
                                  }, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["w-1 h-1 rounded-full", c.dotClass])
                                    }, null, 2),
                                    createTextVNode(toDisplayString(c.status), 1)
                                  ], 2)
                                ])
                              ]))
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_89, [
                      createBaseVNode("div", _hoisted_90, [
                        _cache[25] || (_cache[25] = createBaseVNode("div", null, [
                          createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "At-Risk · Not Enrolled in Any Campaign"),
                          createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Flagged high-risk with no outreach · Immediate action recommended")
                        ], -1)),
                        createBaseVNode("span", _hoisted_91, [
                          _cache[24] || (_cache[24] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse" }, null, -1)),
                          createTextVNode(" " + toDisplayString((branchTrack.value.atRisk - branchTrack.value.inCampaign).toLocaleString()) + " customers ", 1)
                        ])
                      ]),
                      createBaseVNode("table", _hoisted_92, [
                        _cache[27] || (_cache[27] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-5 py-3" }, "Customer"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Churn Prob."),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Days Flagged"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Action")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_93, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unenrolledCustomers.value, (cust) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: cust.id,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_94, [
                                createBaseVNode("p", _hoisted_95, toDisplayString(cust.name), 1),
                                createBaseVNode("p", _hoisted_96, toDisplayString(cust.id), 1)
                              ]),
                              createBaseVNode("td", _hoisted_97, toDisplayString(cust.segment), 1),
                              createBaseVNode("td", _hoisted_98, [
                                createBaseVNode("div", _hoisted_99, [
                                  createBaseVNode("div", _hoisted_100, [
                                    createBaseVNode("div", {
                                      class: "h-full bg-absa-passion rounded-full",
                                      style: normalizeStyle({ width: cust.prob + '%' })
                                    }, null, 4)
                                  ]),
                                  createBaseVNode("span", _hoisted_101, toDisplayString(cust.prob) + "%", 1)
                                ])
                              ]),
                              createBaseVNode("td", _hoisted_102, toDisplayString(cust.daysFlagged) + "d", 1),
                              _cache[26] || (_cache[26] = createBaseVNode("td", { class: "px-4 py-3 text-right" }, [
                                createBaseVNode("button", { class: "text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors" }, " Enrol in Campaign ")
                              ], -1))
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ], 64))
                : (activeTab.value === 'cases')
                  ? (openBlock(), createElementBlock("div", _hoisted_103, [
                      createBaseVNode("div", _hoisted_104, [
                        createBaseVNode("div", _hoisted_105, [
                          _cache[29] || (_cache[29] = createBaseVNode("div", null, [
                            createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "All High-Risk Cases"),
                            createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Ranked by churn probability · Action differs by retention track")
                          ], -1)),
                          createBaseVNode("div", _hoisted_106, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(caseFilters, (f) => {
                              return createBaseVNode("button", {
                                key: f.id,
                                onClick: $event => (caseFilter.value = f.id),
                                class: normalizeClass(['px-2.5 py-1 text-[11px] font-bold rounded-sm border', caseFilter.value === f.id ? 'bg-absa-passion text-white border-absa-passion' : 'border-gray-300 text-gray-500 hover:bg-gray-50'])
                              }, toDisplayString(f.label), 11, _hoisted_107)
                            }), 64))
                          ])
                        ]),
                        createBaseVNode("table", _hoisted_108, [
                          _cache[30] || (_cache[30] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "px-5 py-3" }, "Customer"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Track"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Churn Prob."),
                              createBaseVNode("th", { class: "px-4 py-3" }, "AUM"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Days Flagged"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Action")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_109, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCases.value, (cust) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: cust.id,
                                class: "hover:bg-gray-50 transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_110, [
                                  createBaseVNode("p", _hoisted_111, toDisplayString(cust.name), 1),
                                  createBaseVNode("p", _hoisted_112, toDisplayString(cust.id), 1)
                                ]),
                                createBaseVNode("td", _hoisted_113, [
                                  createBaseVNode("span", _hoisted_114, toDisplayString(cust.track === 'rm' ? 'RM' : 'BRANCH'), 1)
                                ]),
                                createBaseVNode("td", _hoisted_115, toDisplayString(cust.segment), 1),
                                createBaseVNode("td", _hoisted_116, [
                                  createBaseVNode("div", _hoisted_117, [
                                    createBaseVNode("div", _hoisted_118, [
                                      createBaseVNode("div", {
                                        class: normalizeClass(["h-full rounded-full", cust.prob >= 75 ? 'bg-absa-inspire' : cust.prob >= 50 ? 'bg-absa-energy' : 'bg-absa-passion']),
                                        style: normalizeStyle({ width: cust.prob + '%' })
                                      }, null, 6)
                                    ]),
                                    createBaseVNode("span", {
                                      class: normalizeClass(["font-bold font-mono text-xs", cust.prob >= 75 ? 'text-absa-inspire' : cust.prob >= 50 ? 'text-absa-energy' : 'text-absa-passion'])
                                    }, toDisplayString(cust.prob) + "% ", 3)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_119, toDisplayString(cust.aum), 1),
                                createBaseVNode("td", {
                                  class: normalizeClass(["px-4 py-3 font-mono text-xs font-bold", cust.daysFlagged > 7 ? 'text-absa-passion' : 'text-absa-energy'])
                                }, toDisplayString(cust.daysFlagged) + "d ", 3),
                                createBaseVNode("td", _hoisted_120, [
                                  (cust.track === 'rm')
                                    ? (openBlock(), createElementBlock("button", _hoisted_121, " Assign RM "))
                                    : (openBlock(), createElementBlock("button", _hoisted_122, " Enrol Campaign "))
                                ])
                              ]))
                            }), 128))
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_123, [
                        createBaseVNode("div", _hoisted_124, [
                          _cache[32] || (_cache[32] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                            createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich flex items-center gap-2" }, [
                              createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion" }, "auto_awesome"),
                              createTextVNode(" AI Priority Actions ")
                            ]),
                            createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Recommended by churn intelligence engine")
                          ], -1)),
                          createBaseVNode("div", _hoisted_125, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(aiPriorityActions.value, (action, i) => {
                              return (openBlock(), createElementBlock("div", {
                                key: i,
                                class: "border border-gray-200 rounded-sm p-3 bg-white hover:border-absa-passion/40 transition-colors"
                              }, [
                                createBaseVNode("div", _hoisted_126, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(['inline-flex px-1.5 py-0.5 rounded-sm text-[10px] font-bold flex-shrink-0 mt-0.5', action.urgencyClass])
                                  }, toDisplayString(action.urgency), 3),
                                  createBaseVNode("p", _hoisted_127, toDisplayString(action.title), 1)
                                ]),
                                createBaseVNode("p", _hoisted_128, toDisplayString(action.detail), 1),
                                createBaseVNode("div", _hoisted_129, [
                                  createBaseVNode("span", _hoisted_130, toDisplayString(action.meta), 1),
                                  _cache[31] || (_cache[31] = createBaseVNode("button", { class: "text-[11px] font-bold text-absa-passion hover:underline" }, "Act →", -1))
                                ])
                              ]))
                            }), 128))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_131, [
                          _cache[33] || (_cache[33] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                            createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Churn Risk by Segment")
                          ], -1)),
                          createBaseVNode("div", _hoisted_132, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(churnSegments, (seg) => {
                              return createBaseVNode("div", {
                                key: seg.name
                              }, [
                                createBaseVNode("div", _hoisted_133, [
                                  createBaseVNode("div", _hoisted_134, [
                                    createBaseVNode("span", _hoisted_135, toDisplayString(seg.track === 'rm' ? 'RM' : 'BRANCH'), 1),
                                    createBaseVNode("span", _hoisted_136, toDisplayString(seg.name), 1)
                                  ]),
                                  createBaseVNode("span", _hoisted_137, toDisplayString(seg.pct) + "%", 1)
                                ]),
                                createBaseVNode("div", _hoisted_138, [
                                  createBaseVNode("div", {
                                    class: "h-full bg-absa-passion rounded-full",
                                    style: normalizeStyle({ width: seg.pct + '%' })
                                  }, null, 4)
                                ])
                              ])
                            }), 64))
                          ])
                        ])
                      ])
                    ]))
                  : createCommentVNode("", true)
        ], 64)),
    createVNode(AiCampaignModal, {
      modelValue: _ctx.showCampaignModal,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.showCampaignModal) = $event)),
      customers: unenrolledCustomers.value,
      "source-context": "branch-manager"
    }, null, 8, ["modelValue", "customers"])
  ]))
}
}

};

export { _sfc_main as default };
