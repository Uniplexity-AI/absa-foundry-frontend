import { f as onMounted, i as computed, r as ref, c as createElementBlock, s as unref, b as createBaseVNode, q as createVNode, F as Fragment, x as withDirectives, y as vModelText, t as toDisplayString, A as createTextVNode, j as createCommentVNode, e as renderList, L as vModelSelect, h as normalizeClass, E as useRoute, D as resolveComponent, o as openBlock, n as normalizeStyle, w as withCtx, C as createBlock } from './index-DX7cgo_Y.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-BKzrOxU7.js';
import { D as Doughnut, B as Bar } from './index-EHiwbMyN.js';
import { C as Chart, A as ArcElement, B as BarElement, a as CategoryScale, L as LinearScale, p as plugin_tooltip, b as plugin_legend } from './chart-D1QGMS6v.js';
import { u as useCustomerStore, M as MARKET_SEGMENT_OPTIONS } from './customerStore-BxtMBWJw.js';
import { u as usePredictionStore } from './predictionStore-CHYo4Pwm.js';
import { useSnapshotStore } from './snapshotStore-CF8KuLqG.js';
import { n as notify, d as downloadCsv, r as reportFilename } from './absaExport-ChLVHz80.js';
import { h as hydrateLogFromServer, g as getActionLog, i as isAlertAcked, a as acknowledgeAlert } from './absaActions-OBfkr89E.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-[calc(100vh-6rem)] flex flex-col"
};
const _hoisted_3 = { class: "mb-8" };
const _hoisted_4 = { class: "grid grid-cols-12 gap-4 md:gap-4 flex-1 mb-8 min-h-0" };
const _hoisted_5 = { class: "col-span-12 lg:col-span-4" };
const _hoisted_6 = { class: "h-full" };
const _hoisted_7 = { class: "col-span-12 lg:col-span-8" };
const _hoisted_8 = { class: "h-full" };
const _hoisted_9 = { class: "grid grid-cols-2 gap-4 md:gap-4" };
const _hoisted_10 = { class: "mb-6 pb-4 border-b border-gray-200 flex justify-between items-end" };
const _hoisted_11 = { class: "flex items-center gap-3" };
const _hoisted_12 = { class: "grid grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_13 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_14 = { class: "flex items-baseline gap-2 mb-4" };
const _hoisted_15 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_16 = { class: "text-xs font-bold text-amber-700 font-semibold flex items-center" };
const _hoisted_17 = { class: "flex items-end gap-1.5 h-12 mt-auto" };
const _hoisted_18 = {
  key: 0,
  class: "w-full h-full flex items-center justify-center text-[11px] text-gray-500 font-mono mt-0.5"
};
const _hoisted_19 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_20 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_21 = { class: "text-2xl font-bold font-mono text-amber-700" };
const _hoisted_22 = { class: "text-xs text-gray-500" };
const _hoisted_23 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_24 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_25 = { class: "text-2xl font-bold font-mono text-red-900" };
const _hoisted_26 = { class: "text-xs text-gray-500" };
const _hoisted_27 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_28 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_29 = { class: "text-2xl font-bold font-mono text-red-900" };
const _hoisted_30 = { class: "text-xs text-gray-500" };
const _hoisted_31 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-8" };
const _hoisted_32 = { class: "col-span-12 lg:col-span-5 bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_33 = { class: "h-64" };
const _hoisted_34 = { class: "col-span-12 lg:col-span-7 bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_35 = { class: "h-64" };
const _hoisted_36 = { class: "grid grid-cols-12 gap-4 md:gap-4" };
const _hoisted_37 = { class: "col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-4 overflow-y-auto" };
const _hoisted_38 = { class: "bg-white rounded-sm border border-gray-300 shadow-none flex flex-col h-[500px]" };
const _hoisted_39 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white z-10" };
const _hoisted_40 = { class: "text-label-sm font-label-sm text-absa-passion" };
const _hoisted_41 = { class: "card-content flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4" };
const _hoisted_42 = {
  key: 0,
  class: "text-xs text-gray-500 text-center py-8"
};
const _hoisted_43 = { class: "flex justify-between items-start mb-1" };
const _hoisted_44 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_45 = { class: "text-[11px] text-gray-500 font-mono mt-0.5" };
const _hoisted_46 = { class: "text-xs text-gray-500 mb-3" };
const _hoisted_47 = ["onClick"];
const _hoisted_48 = { class: "col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-y-auto" };
const _hoisted_49 = { class: "bg-white rounded-sm shadow-none overflow-hidden h-[500px]" };
const _hoisted_50 = { class: "h-full flex flex-col" };
const _hoisted_51 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white" };
const _hoisted_52 = { class: "flex gap-2" };
const _hoisted_53 = ["value"];
const _hoisted_54 = { class: "overflow-x-auto flex-1" };
const _hoisted_55 = { class: "min-w-full divide-y divide-gray-100" };
const _hoisted_56 = { class: "bg-white divide-y divide-gray-100" };
const _hoisted_57 = { key: 0 };
const _hoisted_58 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_59 = { class: "text-[11px] text-gray-500 font-mono mt-0.5" };
const _hoisted_60 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_61 = { class: "text-xs" };
const _hoisted_62 = { class: "px-3 py-1.5 text-xs text-gray-600" };
const _hoisted_63 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_64 = { class: "text-xs font-bold font-mono text-absa-enrich mb-1" };
const _hoisted_65 = { class: "progress-bar-container" };
const _hoisted_66 = { class: "px-3 py-1.5 whitespace-nowrap text-xs font-bold" };
const _hoisted_67 = { class: "px-3 py-1.5 whitespace-nowrap text-xs font-mono" };
const _hoisted_68 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_69 = { class: "p-4 border-t border-gray-200 bg-white flex items-center justify-between mt-auto" };
const _hoisted_70 = { class: "text-xs text-gray-500" };
const _hoisted_71 = {
  key: 0,
  class: "text-gray-400"
};
const _hoisted_72 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_73 = { class: "flex gap-2" };
const _hoisted_74 = ["disabled"];
const _hoisted_75 = ["disabled"];
const _hoisted_76 = { class: "grid grid-cols-2 gap-4 md:gap-4 mt-8" };
const _hoisted_77 = { class: "bg-white rounded-sm border border-gray-300 border-l-4 border-l-absa-passion p-5 mb-6 flex flex-col relative overflow-hidden shadow-none min-h-[200px]" };
const _hoisted_78 = { class: "relative z-10" };
const _hoisted_79 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_80 = { class: "text-body-sm text-gray-600 truncate mr-2" };
const _hoisted_81 = { class: "text-body-sm font-bold text-absa-enrich whitespace-nowrap" };
const _hoisted_82 = { class: "text-gray-400 font-normal" };
const _hoisted_83 = {
  key: 1,
  class: "text-xs text-gray-500 leading-relaxed"
};
const _hoisted_84 = { class: "bg-white rounded-sm border border-gray-300 p-6 shadow-none flex items-center min-h-[200px]" };
const _hoisted_85 = { class: "card-content flex gap-4 items-start w-full" };
const _hoisted_86 = { class: "text-xs text-gray-500 leading-relaxed" };
const _hoisted_87 = { class: "text-absa-enrich font-bold" };
const _hoisted_88 = {
  key: 0,
  class: "text-absa-passion"
};
const _hoisted_89 = {
  key: 1,
  class: "text-red-900"
};
const _hoisted_90 = {
  key: 2,
  class: "text-absa-enrich"
};
const _hoisted_91 = { class: "bg-white rounded-sm border border-gray-300 shadow-none mt-8 overflow-hidden" };
const _hoisted_92 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_93 = { class: "flex items-center gap-3" };
const _hoisted_94 = { class: "text-label-sm text-gray-500" };
const _hoisted_95 = { class: "overflow-x-auto" };
const _hoisted_96 = { class: "w-full text-left border-collapse" };
const _hoisted_97 = { class: "divide-y divide-gray-100" };
const _hoisted_98 = { key: 0 };
const _hoisted_99 = { class: "px-3 py-2" };
const _hoisted_100 = { class: "material-symbols-outlined text-[12px]" };
const _hoisted_101 = { class: "px-3 py-2" };
const _hoisted_102 = {
  key: 1,
  class: "text-xs text-gray-400"
};
const _hoisted_103 = { class: "px-3 py-2 text-xs text-gray-600 max-w-[360px] truncate" };
const _hoisted_104 = { class: "px-3 py-2 text-xs text-gray-500" };
const _hoisted_105 = { class: "px-3 py-2 text-xs text-gray-500 whitespace-nowrap" };

const ledgerPageSize = 5;

const _sfc_main = {
  __name: 'PortfolioOverview',
  setup(__props) {

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, plugin_tooltip, plugin_legend);

const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore = useSnapshotStore();
const route = useRoute();

onMounted(async () => {
  await customerStore.fetchPortfolio();
  ledgerPage.value = parseInt(route.query.page) || 1;
  // Header search may arrive as ?q= — prefill + enable filter
  if (route.query.q) {
    searchText.value = String(route.query.q);
    ledgerAtRiskOnly.value = false;
  }
  // Batch-fetch predictions for visible customers
  const ids = customerStore.customers.slice(0, 50).map(c => c.customerId);
  predictionStore.fetchBatchPredictions(ids, snapshotStore.asOfDate);
  // Fetch churn drivers for AI engine
  predictionStore.fetchChurnDrivers();
  snapshotStore.fetchAvailable();
});

/** Absolute CLV (ZMW) for the "CLV (ZMW)" column — never the percentile. */
function clvCell(customerId) {
  const v = predictionStore.predictions[customerId]?.clv;
  return v == null ? '--' : Number(v).toLocaleString()
}

async function onSnapshotChange() {
  snapshotStore.setDate(snapshotStore.selectedDate);
  await customerStore.fetchPortfolio({ as_of_date: snapshotStore.asOfDate });
  ledgerPage.value = 1;
}

// Donut chart: State Distribution (6-state)
const donutChartData = computed(() => ({
  labels: ['New', 'Active', 'Growing', 'At Risk', 'Dormant', 'Churned'],
  datasets: [{
    data: [
      customerStore.portfolio.active,  // NOTE: backend may not return all states yet
      0,  // NEW — pending backend enrichment
      0,  // GROWING — pending backend enrichment
      customerStore.portfolio.atRisk,
      customerStore.portfolio.dormant,
      customerStore.portfolio.churned,
    ],
    backgroundColor: ['#16a34a', '#16a34a', '#16a34a', '#b45309', '#7f1d1d', '#7f1d1d'],
    borderWidth: 0,
  }]
}));

const donutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
};

// Bar chart: Health Score Distribution (computed from customer data)
const healthScoreHistogram = computed(() => {
  const bins = [0, 0, 0, 0, 0];  // 0-20, 21-40, 41-60, 61-80, 81-100
  customerStore.customers.forEach(c => {
    const h = c.healthScore;
    if (h == null) return
    if (h <= 20) bins[0]++;
    else if (h <= 40) bins[1]++;
    else if (h <= 60) bins[2]++;
    else if (h <= 80) bins[3]++;
    else bins[4]++;
  });
  return bins
});

const histogramChartData = computed(() => ({
  labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
  datasets: [{
    label: 'Customers',
    data: healthScoreHistogram.value,
    backgroundColor: '#7f1d1d',
    borderRadius: 4,
  }]
}));

const histogramChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const totalCustomersSparkline = ref([]);

// Ledger pagination + filter
const ledgerPage = ref(1);
const ledgerAtRiskOnly = ref(false);
const ledgerMarketSegment = ref('');
const searchText = ref('');
const marketSegmentOptions = MARKET_SEGMENT_OPTIONS;

// Filterable, pageable ledger rows (churn risk only when filter active)
const ledgerFiltered = computed(() => {
  let rows = customerStore.customers || [];
  if (ledgerAtRiskOnly.value) {
    rows = rows.filter(c => {
      const p = predictionStore.getChurnProbability(c.customerId);
      return p != null && p > 0.5
    });
  }
  if (ledgerMarketSegment.value) {
    rows = rows.filter((customer) => (
      ledgerMarketSegment.value === 'other'
        ? customer.marketSegment === null
        : customer.marketSegment === Number(ledgerMarketSegment.value)
    ));
  }
  const q = (searchText.value || '').trim().toLowerCase();
  if (q) {
    rows = rows.filter(c =>
      (c.fullName || '').toLowerCase().includes(q) ||
      (c.customerId || '').toLowerCase().includes(q) ||
      (c.state || '').toLowerCase().includes(q)
    );
  }
  return rows
});

// A ledger filter (risk / segment / search) narrows the rows we hold, so once one
// is active the honest denominator is the filtered count. With no filter the
// denominator is the real portfolio size from the server — never the size of the
// fetched page, which is capped at 500 rows and previously masqueraded as the
// portfolio total.
const ledgerHasFilter = computed(() =>
  ledgerAtRiskOnly.value || !!ledgerMarketSegment.value || !!(searchText.value || '').trim()
);
const ledgerHeld = computed(() => ledgerFiltered.value.length);
const ledgerTotal = computed(() =>
  ledgerHasFilter.value ? ledgerHeld.value : (customerStore.pagination.total || ledgerHeld.value)
);
// Paging is over the rows we actually hold, so "Next" can never land on an empty page.
const ledgerTotalPages = computed(() => Math.max(1, Math.ceil(ledgerHeld.value / ledgerPageSize)));
const ledgerRows = computed(() => ledgerFiltered.value.slice((ledgerPage.value - 1) * ledgerPageSize, ledgerPage.value * ledgerPageSize));
const ledgerStart = computed(() => ledgerHeld.value === 0 ? 0 : (ledgerPage.value - 1) * ledgerPageSize + 1);
const ledgerEnd = computed(() => Math.min(ledgerPage.value * ledgerPageSize, ledgerHeld.value));
// True when the portfolio is larger than what this session loaded.
const ledgerWindowed = computed(() => !ledgerHasFilter.value && ledgerHeld.value < ledgerTotal.value);

function toggleLedgerFilter() {
  ledgerAtRiskOnly.value = !ledgerAtRiskOnly.value;
  ledgerPage.value = 1;
  notify(ledgerAtRiskOnly.value ? 'Filter: showing at-risk customers only' : 'Filter cleared — showing all customers', 'info', { autoClose: 2000 });
}

function exportLedgerCsv() {
  const rows = ledgerFiltered.value.map(c => ({
    customerId: c.customerId,
    fullName: c.fullName,
      state: c.state,
      marketSegment: c.marketSegment ?? '',
      segmentCode: c.segmentCode,
      segmentLabel: c.segmentLabel,
    healthScore: c.healthScore ?? '',
    churnProbabilityPct: predictionStore.getChurnProbability(c.customerId) != null
      ? Math.round(predictionStore.getChurnProbability(c.customerId) * 100) + '%'
      : '',
    clv: predictionStore.predictions[c.customerId]?.clv ?? '',
    clvPercentile: predictionStore.predictions[c.customerId]?.clv_percentile != null
      ? Math.round(predictionStore.predictions[c.customerId].clv_percentile * 100)
      : '',
  }));
  if (!rows.length) {
    notify('Nothing to export — no customers in the ledger', 'error', { autoClose: 3000 });
    return
  }
  downloadCsv(reportFilename(`portfolio-ledger${ledgerAtRiskOnly.value ? '-at-risk' : ''}`), rows, ['customerId', 'fullName', 'state', 'marketSegment', 'segmentCode', 'segmentLabel', 'healthScore', 'churnProbabilityPct', 'clv', 'clvPercentile']);
  notify(`Exported ${rows.length} customers to CSV`, 'success', { autoClose: 2500 });
}

// Critical Alerts — derived from live prediction + portfolio data
const alerts = computed(() => {
  const list = [];
  const unseen = (alert) => {
    if (!alert.id) return true
    return !isAlertAcked(alert.customerId || 'portfolio', alert.id)
  };

  // 1. High churn risk customers (churn_probability > 60%)
  const highRisk = Object.entries(predictionStore.predictions)
    .filter(([, p]) => p.churn_probability > 0.6)
    .map(([id, p]) => ({
      id: `churn-${id}`,
      customerId: id,
      name: id,
      time: `${Math.round(p.churn_probability * 100)}% risk`,
      title: 'High Churn Probability',
      titleColorClass: 'text-absa-passion',
      description: `Customer ${id.replace('CUST', '')} has a ${Math.round(p.churn_probability * 100)}% likelihood of churning within 90 days.`,
      actionable: true,
      buttonClass: 'bg-absa-passion text-white hover:bg-red-900',
    }));
  list.push(...highRisk.slice(0, 3));

  // 2. Portfolio-level: Dormancy is the dominant state
  if (customerStore.portfolio.dormantPct > 40) {
    list.push({
      id: 'dormancy',
      customerId: 'portfolio',
      name: 'Portfolio Dormancy',
      time: `${customerStore.portfolio.dormantPct}%`,
      title: 'Dormancy Dominant',
      titleColorClass: 'text-red-900',
      description: `${customerStore.portfolio.dormant.toLocaleString()} customers (${customerStore.portfolio.dormantPct}%) are dormant — proactive outreach recommended.`,
      actionable: false,
      buttonClass: '',
    });
  }

  // 3. Top churn driver alert
  const topDriver = predictionStore.churnDrivers[0];
  if (topDriver && topDriver.contribution_pct > 30) {
    list.push({
      id: 'top-driver',
      customerId: 'portfolio',
      name: 'Top Churn Driver',
      time: `${topDriver.contribution_pct}%`,
      title: topDriver.driver_name,
      titleColorClass: 'text-amber-700',
      description: `Affects ${topDriver.affected_customer_count.toLocaleString()} customers — ${topDriver.contribution_pct}% contribution to churn.`,
      actionable: true,
      buttonClass: 'bg-[#FF780F] text-white hover:bg-[#E06A00]',
    });
  }

  return list.filter(unseen)
});

const acknowledgeAlert$1 = (alertIndex) => {
  const alert = alerts.value[alertIndex];
  if (!alert) return
  acknowledgeAlert(alert.customerId || 'portfolio', alert.id);
  notify(`Alert acknowledged — ${alert.title || alert.name}`, 'success', { autoClose: 2500 });
};

// ── Recent RM Activity ───────────────────────────────────────────────────────
const activityRows = ref([]);

const recentActivity = computed(() => activityRows.value.slice(0, 8));

const ACTION_META = {
  RM_ASSIGNED:         { label: 'RM Assigned',         icon: 'person_add',      cls: 'bg-absa-passion/10 text-absa-passion' },
  RM_CONTACTED:        { label: 'RM Contacted',        icon: 'call',            cls: 'bg-absa-passion/10 text-absa-passion' },
  CAMPAIGN_ENROLLED:   { label: 'Campaign Enrolled',   icon: 'campaign',        cls: 'bg-amber-100 text-amber-700' },
  CAMPAIGN_LAUNCHED:   { label: 'Campaign Launched',   icon: 'rocket_launch',   cls: 'bg-absa-passion/10 text-absa-passion' },
  ALERT_ACKNOWLEDGED:  { label: 'Alert Acknowledged', icon: 'notifications_off', cls: 'bg-gray-100 text-gray-600' },
  NBA_OVERRIDE:        { label: 'NBA Override',        icon: 'edit',            cls: 'bg-red-100 text-absa-inspire' },
  ACTION_PLAN_CREATED: { label: 'Action Plan Created', icon: 'checklist',       cls: 'bg-absa-passion/10 text-absa-passion' },
  ACTION_RECORDED:     { label: 'Action Recorded',     icon: 'task_alt',        cls: 'bg-green-100 text-green-700' },
  BULK_ACTION:         { label: 'Bulk Action',         icon: 'select_all',      cls: 'bg-gray-100 text-gray-600' },
};

function actionLabel(type) {
  return ACTION_META[type]?.label || String(type || 'ACTION').replace(/_/g, ' ')
}
function actionIcon(type) {
  return ACTION_META[type]?.icon || 'check'
}
function actionBadgeClass(type) {
  return ACTION_META[type]?.cls || 'bg-gray-100 text-gray-600'
}

function fmtActivityTime(t) {
  if (!t) return '—'
  try { return new Date(t).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return t }
}

async function refreshActivity() {
  await hydrateLogFromServer(50);
  activityRows.value = getActionLog().map((a) => ({ ...a, key: a.serverId || a.id }));
}

onMounted(async () => {
  // Fetch the shared action log (local + server) for Recent RM Activity.
  // Portfolio + predictions are fetched by the primary onMounted above.
  refreshActivity();
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (unref(customerStore).loading)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$1, { type: "stats" })
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createVNode(_sfc_main$1, { type: "block" })
              ])
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                createVNode(_sfc_main$1, { type: "block" })
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createVNode(_sfc_main$1, { type: "card" }),
            createVNode(_sfc_main$1, { type: "card" })
          ])
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_10, [
            _cache[6] || (_cache[6] = createBaseVNode("div", null, [
              createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Dashboard"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Portfolio")
              ]),
              createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Portfolio Overview")
            ], -1)),
            createBaseVNode("div", _hoisted_11, [
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-sm font-bold text-gray-600" }, "Data Snapshot:", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(snapshotStore).selectedDate) = $event)),
                type: "date",
                onChange: onSnapshotChange,
                class: "block w-48 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-absa-passion focus:border-absa-passion sm:text-sm rounded-sm bg-white font-mono text-absa-enrich border"
              }, null, 544), [
                [vModelText, unref(snapshotStore).selectedDate]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              _cache[8] || (_cache[8] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Total Customers", -1)),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("span", _hoisted_15, toDisplayString(unref(customerStore).portfolio.total.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_16, [
                  _cache[7] || (_cache[7] = createBaseVNode("svg", {
                    class: "w-3 h-3 mr-1",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      d: "M5 10l7-7m0 0l7 7m-7-7v18",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2"
                    })
                  ], -1)),
                  createTextVNode(" " + toDisplayString(unref(customerStore).portfolio.activePct) + "% active ", 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_17, [
                (totalCustomersSparkline.value.length === 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_18, "—"))
                  : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(totalCustomersSparkline.value, (h, i) => {
                  return (openBlock(), createElementBlock("div", {
                    key: i,
                    class: "w-1/6 bg-primary rounded-t",
                    style: normalizeStyle({ height: h + '%' })
                  }, null, 4))
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_19, [
              _cache[9] || (_cache[9] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "At Risk", -1)),
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("span", _hoisted_21, toDisplayString(unref(customerStore).portfolio.atRisk.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_22, "| " + toDisplayString(unref(customerStore).portfolio.atRiskPct) + "%", 1)
              ]),
              _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "+4 since last snapshot", -1))
            ]),
            createBaseVNode("div", _hoisted_23, [
              _cache[11] || (_cache[11] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Dormant", -1)),
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("span", _hoisted_25, toDisplayString(unref(customerStore).portfolio.dormant.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_26, "| " + toDisplayString(unref(customerStore).portfolio.dormantPct) + "%", 1)
              ]),
              _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "Stable across 3 periods", -1))
            ]),
            createBaseVNode("div", _hoisted_27, [
              _cache[13] || (_cache[13] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Churned", -1)),
              createBaseVNode("div", _hoisted_28, [
                createBaseVNode("span", _hoisted_29, toDisplayString(unref(customerStore).portfolio.churned.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_30, "| " + toDisplayString(unref(customerStore).portfolio.churnedPct) + "%", 1)
              ]),
              _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "Last 90 days", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_31, [
            createBaseVNode("div", _hoisted_32, [
              _cache[15] || (_cache[15] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4" }, "State Distribution", -1)),
              createBaseVNode("div", _hoisted_33, [
                createVNode(unref(Doughnut), {
                  data: donutChartData.value,
                  options: donutChartOptions
                }, null, 8, ["data"])
              ])
            ]),
            createBaseVNode("div", _hoisted_34, [
              _cache[16] || (_cache[16] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4" }, "Health Score Distribution", -1)),
              createBaseVNode("div", _hoisted_35, [
                createVNode(unref(Bar), {
                  data: histogramChartData.value,
                  options: histogramChartOptions
                }, null, 8, ["data"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_36, [
            createBaseVNode("div", _hoisted_37, [
              createBaseVNode("div", _hoisted_38, [
                createBaseVNode("div", _hoisted_39, [
                  _cache[17] || (_cache[17] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                    createBaseVNode("span", { class: "material-symbols-outlined text-absa-passion text-[20px]" }, "campaign"),
                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Critical Alerts")
                  ], -1)),
                  createBaseVNode("span", _hoisted_40, toDisplayString(alerts.value.length) + " NEW ", 1)
                ]),
                createBaseVNode("div", _hoisted_41, [
                  (alerts.value.length === 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_42, "No critical alerts"))
                    : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(alerts.value, (alert, index) => {
                    return (openBlock(), createElementBlock("div", {
                      key: index,
                      class: "py-1"
                    }, [
                      createBaseVNode("div", _hoisted_43, [
                        createBaseVNode("h4", _hoisted_44, toDisplayString(alert.name), 1),
                        createBaseVNode("span", _hoisted_45, toDisplayString(alert.time), 1)
                      ]),
                      createBaseVNode("p", {
                        class: normalizeClass(['text-xs font-bold font-mono text-absa-enrich mb-1', alert.titleColorClass])
                      }, toDisplayString(alert.title), 3),
                      createBaseVNode("p", _hoisted_46, toDisplayString(alert.description), 1),
                      (alert.actionable)
                        ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            class: normalizeClass([
                    'w-full text-xs font-bold py-2 px-4 rounded-sm shadow-none transition-colors',
                    alert.buttonClass
                  ]),
                            onClick: $event => (acknowledgeAlert$1(index))
                          }, " Acknowledge ", 10, _hoisted_47))
                        : createCommentVNode("", true)
                    ]))
                  }), 128))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("div", _hoisted_49, [
                createBaseVNode("div", _hoisted_50, [
                  createBaseVNode("div", _hoisted_51, [
                    _cache[21] || (_cache[21] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Predictive Lifecycle Ledger", -1)),
                    createBaseVNode("div", _hoisted_52, [
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((ledgerMarketSegment).value = $event)),
                        "aria-label": "Filter ledger by market segment",
                        class: "rounded-sm border border-gray-300 bg-white px-2 py-1.5 text-xs text-absa-enrich focus:border-absa-passion focus:outline-none focus:ring-1 focus:ring-absa-passion",
                        onChange: _cache[2] || (_cache[2] = $event => (ledgerPage.value = 1))
                      }, [
                        _cache[18] || (_cache[18] = createBaseVNode("option", { value: "" }, "All segments", -1)),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(marketSegmentOptions), (segment) => {
                          return (openBlock(), createElementBlock("option", {
                            key: segment.code,
                            value: segment.marketSegment === null ? 'other' : String(segment.marketSegment)
                          }, toDisplayString(segment.code) + " — " + toDisplayString(segment.label), 9, _hoisted_53))
                        }), 128))
                      ], 544), [
                        [vModelSelect, ledgerMarketSegment.value]
                      ]),
                      createBaseVNode("button", {
                        onClick: toggleLedgerFilter,
                        title: "Filter: show at-risk only",
                        class: normalizeClass(['p-1.5 border rounded-sm transition-colors', ledgerAtRiskOnly.value ? 'border-absa-passion text-absa-passion bg-red-50' : 'border-gray-300 text-gray-500 hover:bg-gray-50'])
                      }, [...(_cache[19] || (_cache[19] = [
                        createBaseVNode("svg", {
                          class: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createBaseVNode("path", {
                            d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2"
                          })
                        ], -1)
                      ]))], 2),
                      createBaseVNode("button", {
                        onClick: exportLedgerCsv,
                        title: "Export ledger as CSV",
                        class: "p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50"
                      }, [...(_cache[20] || (_cache[20] = [
                        createBaseVNode("svg", {
                          class: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createBaseVNode("path", {
                            d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2"
                          })
                        ], -1)
                      ]))])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_54, [
                    createBaseVNode("table", _hoisted_55, [
                      _cache[24] || (_cache[24] = createBaseVNode("thead", null, [
                        createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50" }, [
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Name"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "State"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Segment"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Health ↑"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Churn Prob"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "CLV (ZMW)"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Action")
                        ])
                      ], -1)),
                      createBaseVNode("tbody", _hoisted_56, [
                        (ledgerRows.value.length === 0)
                          ? (openBlock(), createElementBlock("tr", _hoisted_57, [...(_cache[22] || (_cache[22] = [
                              createBaseVNode("td", {
                                colspan: "7",
                                class: "p-12 text-center text-xs text-gray-500"
                              }, "No customers match the current ledger filters", -1)
                            ]))]))
                          : createCommentVNode("", true),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(ledgerRows.value, (customer) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: customer.customerId
                          }, [
                            createBaseVNode("td", _hoisted_58, [
                              createBaseVNode("div", null, [
                                createVNode(_component_router_link, {
                                  to: `/dashboard/customer/${encodeURIComponent(customer.customerId)}`,
                                  class: "text-xs font-bold text-absa-enrich hover:text-absa-passion transition-colors"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(customer.fullName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createBaseVNode("div", _hoisted_59, "ID: " + toDisplayString(customer.customerId), 1)
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_60, [
                              createBaseVNode("span", _hoisted_61, toDisplayString(customer.state), 1)
                            ]),
                            createBaseVNode("td", _hoisted_62, toDisplayString(customer.segment), 1),
                            createBaseVNode("td", _hoisted_63, [
                              createBaseVNode("div", _hoisted_64, toDisplayString(customer.healthScore ?? '--'), 1),
                              createBaseVNode("div", _hoisted_65, [
                                createBaseVNode("div", {
                                  class: "progress-bar-fill bg-red-900",
                                  style: normalizeStyle({ width: (customer.healthScore ?? 0) + '%' })
                                }, null, 4)
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_66, toDisplayString(unref(predictionStore).getChurnProbability(customer.customerId) != null ? Math.round(unref(predictionStore).getChurnProbability(customer.customerId) * 100) + '%' : '--'), 1),
                            createBaseVNode("td", _hoisted_67, toDisplayString(clvCell(customer.customerId)), 1),
                            createBaseVNode("td", _hoisted_68, [
                              createVNode(_component_router_link, {
                                to: `/dashboard/customer/${encodeURIComponent(customer.customerId)}?from=ledger&page=${ledgerPage.value}`,
                                class: "text-xs font-bold py-1.5 px-3 rounded-sm shadow-none transition-colors w-full bg-absa-passion text-white hover:bg-red-900 inline-block text-center"
                              }, {
                                default: withCtx(() => [...(_cache[23] || (_cache[23] = [
                                  createTextVNode(" REVIEW ", -1)
                                ]))]),
                                _: 1
                              }, 8, ["to"])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_69, [
                    createBaseVNode("span", _hoisted_70, [
                      createTextVNode(" Showing " + toDisplayString(ledgerStart.value) + "-" + toDisplayString(ledgerEnd.value) + " of " + toDisplayString(ledgerTotal.value.toLocaleString()) + " customers ", 1),
                      (ledgerWindowed.value)
                        ? (openBlock(), createElementBlock("span", _hoisted_71, "· paging the first " + toDisplayString(ledgerHeld.value.toLocaleString()) + " loaded", 1))
                        : (ledgerHasFilter.value)
                          ? (openBlock(), createElementBlock("span", _hoisted_72, "matching"))
                          : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_73, [
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = $event => (ledgerPage.value--)),
                        disabled: ledgerPage.value <= 1,
                        class: normalizeClass(['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage.value <= 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'])
                      }, "Previous", 10, _hoisted_74),
                      createBaseVNode("button", {
                        onClick: _cache[4] || (_cache[4] = $event => (ledgerPage.value++)),
                        disabled: ledgerPage.value >= ledgerTotalPages.value,
                        class: normalizeClass(['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage.value >= ledgerTotalPages.value ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-absa-enrich hover:bg-gray-50'])
                      }, "Next", 10, _hoisted_75)
                    ])
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_76, [
            createBaseVNode("div", _hoisted_77, [
              createBaseVNode("div", _hoisted_78, [
                _cache[25] || (_cache[25] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4 flex items-center gap-2" }, [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion" }, "auto_awesome"),
                  createTextVNode(" AI Churn Intelligence ")
                ], -1)),
                (unref(predictionStore).churnDrivers.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_79, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(predictionStore).churnDrivers.slice(0, 3), (d) => {
                        return (openBlock(), createElementBlock("div", {
                          key: d.rank,
                          class: "flex justify-between items-center pb-2 border-b border-gray-100 last:border-0"
                        }, [
                          createBaseVNode("span", _hoisted_80, toDisplayString(d.driver_name), 1),
                          createBaseVNode("span", _hoisted_81, [
                            createTextVNode(toDisplayString(d.contribution_pct) + "% ", 1),
                            createBaseVNode("span", _hoisted_82, "(" + toDisplayString(d.affected_customer_count.toLocaleString()) + ")", 1)
                          ])
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_83, "Churn intelligence data will appear here once computed."))
              ])
            ]),
            createBaseVNode("div", _hoisted_84, [
              createBaseVNode("div", _hoisted_85, [
                _cache[30] || (_cache[30] = createBaseVNode("div", { class: "flex-shrink-0 w-12 h-16 bg-[#FF780F]/10 rounded-md flex items-center justify-center" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-amber-700",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2"
                    })
                  ])
                ], -1)),
                createBaseVNode("div", null, [
                  _cache[29] || (_cache[29] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-2" }, "Portfolio Health Trend", -1)),
                  createBaseVNode("p", _hoisted_86, [
                    createBaseVNode("strong", _hoisted_87, toDisplayString(unref(customerStore).portfolio.total.toLocaleString()), 1),
                    _cache[26] || (_cache[26] = createTextVNode(" customers tracked. ", -1)),
                    (unref(customerStore).portfolio.atRiskPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_88, toDisplayString(unref(customerStore).portfolio.atRiskPct) + "% at risk", 1))
                      : createCommentVNode("", true),
                    _cache[27] || (_cache[27] = createTextVNode(", ", -1)),
                    (unref(customerStore).portfolio.dormantPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_89, toDisplayString(unref(customerStore).portfolio.dormantPct) + "% dormant", 1))
                      : createCommentVNode("", true),
                    _cache[28] || (_cache[28] = createTextVNode(", ", -1)),
                    (unref(customerStore).portfolio.churnedPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_90, toDisplayString(unref(customerStore).portfolio.churnedPct) + "% churned", 1))
                      : createCommentVNode("", true),
                    createTextVNode(". " + toDisplayString(unref(customerStore).portfolio.actionsDue.toLocaleString()) + " actions due. ", 1)
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_91, [
            createBaseVNode("div", _hoisted_92, [
              _cache[32] || (_cache[32] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                createBaseVNode("span", { class: "material-symbols-outlined text-[20px] text-absa-passion" }, "history"),
                createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Recent RM Activity")
              ], -1)),
              createBaseVNode("div", _hoisted_93, [
                createBaseVNode("span", _hoisted_94, toDisplayString(recentActivity.value.length) + " recent", 1),
                createBaseVNode("button", {
                  onClick: refreshActivity,
                  class: "text-xs font-bold text-absa-passion hover:text-absa-power flex items-center gap-1"
                }, [...(_cache[31] || (_cache[31] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "refresh", -1),
                  createTextVNode(" Refresh ", -1)
                ]))])
              ])
            ]),
            createBaseVNode("div", _hoisted_95, [
              createBaseVNode("table", _hoisted_96, [
                _cache[34] || (_cache[34] = createBaseVNode("thead", null, [
                  createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                    createBaseVNode("th", { class: "px-3 py-2" }, "Action"),
                    createBaseVNode("th", { class: "px-3 py-2" }, "Customer"),
                    createBaseVNode("th", { class: "px-3 py-2" }, "Detail"),
                    createBaseVNode("th", { class: "px-3 py-2" }, "Performed By"),
                    createBaseVNode("th", { class: "px-3 py-2" }, "When")
                  ])
                ], -1)),
                createBaseVNode("tbody", _hoisted_97, [
                  (recentActivity.value.length === 0)
                    ? (openBlock(), createElementBlock("tr", _hoisted_98, [...(_cache[33] || (_cache[33] = [
                        createBaseVNode("td", {
                          colspan: "5",
                          class: "px-3 py-8 text-center text-xs text-gray-500"
                        }, " No RM actions yet — assign an RM, enrol a campaign or launch an intervention to see activity here. ", -1)
                      ]))]))
                    : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(recentActivity.value, (a) => {
                    return (openBlock(), createElementBlock("tr", {
                      key: a.key,
                      class: "hover:bg-gray-50 transition-colors"
                    }, [
                      createBaseVNode("td", _hoisted_99, [
                        createBaseVNode("span", {
                          class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', actionBadgeClass(a.type)])
                        }, [
                          createBaseVNode("span", _hoisted_100, toDisplayString(actionIcon(a.type)), 1),
                          createTextVNode(" " + toDisplayString(actionLabel(a.type)), 1)
                        ], 2)
                      ]),
                      createBaseVNode("td", _hoisted_101, [
                        (a.customerId)
                          ? (openBlock(), createBlock(_component_router_link, {
                              key: 0,
                              to: `/dashboard/customer/${encodeURIComponent(a.customerId)}`,
                              class: "text-xs font-bold text-absa-enrich hover:text-absa-passion font-mono"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(a.customerId), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]))
                          : (openBlock(), createElementBlock("span", _hoisted_102, "—"))
                      ]),
                      createBaseVNode("td", _hoisted_103, toDisplayString(a.detail), 1),
                      createBaseVNode("td", _hoisted_104, toDisplayString(a.actor), 1),
                      createBaseVNode("td", _hoisted_105, toDisplayString(fmtActivityTime(a.at)), 1)
                    ]))
                  }), 128))
                ])
              ])
            ])
          ])
        ], 64))
  ]))
}
}

};

export { _sfc_main as default };
