import { r as ref, D as computed, h as onMounted, c as createElementBlock, b as createBaseVNode, t as toDisplayString, m as createTextVNode, q as createVNode, F as Fragment, e as renderList, y as unref, a as createStaticVNode, l as createCommentVNode, j as normalizeClass, n as normalizeStyle, z as createBlock, a1 as __vitePreload, o as openBlock } from './index-BDk32LgJ.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-DQ0zKghI.js';
import { A as AiCampaignModal } from './AiCampaignModal-0gTvnorx.js';
import { u as useIntelligenceStore } from './intelligenceStore-CnjvlMAj.js';
import { u as usePredictionStore } from './predictionStore-DE3XL_zG.js';
import { u as useCustomerStore } from './customerStore-BRoLvcJZ.js';
import { _ as _sfc_main$2 } from './CustomerStatePill-I0KLJfXr.js';
import { n as notify, d as downloadCsv, r as reportFilename } from './absaExport-DS4NsexK.js';
import { c as computeCustomerStates } from './ingestApi-CcuRyNsa.js';
import { L as Line, B as Bar } from './index-CUafEuIa.js';
import { C as Chart, c as plugin_title, p as plugin_tooltip, b as plugin_legend, B as BarElement, d as LineElement, P as PointElement, a as CategoryScale, L as LinearScale } from './chart-D1QGMS6v.js';
import './absaActions-C1zoYsMw.js';
import './snapshotStore-CBvUDR3G.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_3 = { class: "flex items-center gap-3" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_6 = {
  key: 0,
  class: "mt-6"
};
const _hoisted_7 = { class: "flex border-b border-gray-300 mb-6 mt-4" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_10 = { key: 0 };
const _hoisted_11 = { class: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6" };
const _hoisted_12 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_13 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_14 = { class: "text-[10px] mt-1 flex items-center gap-0.5" };
const _hoisted_15 = {
  key: 0,
  class: "text-absa-inspire font-bold"
};
const _hoisted_16 = {
  key: 1,
  class: "text-absa-passion font-bold"
};
const _hoisted_17 = {
  key: 2,
  class: "text-gray-400"
};
const _hoisted_18 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_19 = { class: "p-5 space-y-4" };
const _hoisted_20 = { class: "w-28 flex-shrink-0" };
const _hoisted_21 = { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_22 = { class: "w-20 flex-shrink-0 text-right" };
const _hoisted_23 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_24 = { class: "flex-1" };
const _hoisted_25 = { class: "w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_26 = { class: "w-12 flex-shrink-0 text-right" };
const _hoisted_27 = { class: "text-xs font-mono text-gray-500" };
const _hoisted_28 = { class: "w-24 flex-shrink-0 text-right" };
const _hoisted_29 = {
  key: 0,
  class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-100 text-absa-inspire"
};
const _hoisted_30 = {
  key: 1,
  class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion"
};
const _hoisted_31 = {
  key: 2,
  class: "text-[10px] text-gray-400"
};
const _hoisted_32 = { key: 1 };
const _hoisted_33 = { class: "flex items-center justify-between mb-4" };
const _hoisted_34 = ["disabled"];
const _hoisted_35 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_36 = { class: "material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5" };
const _hoisted_37 = { class: "font-semibold" };
const _hoisted_38 = { class: "mt-0.5 text-[11px] opacity-80" };
const _hoisted_39 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_40 = {
  key: 0,
  class: "px-4 pb-3 pt-0 border-t border-gray-100"
};
const _hoisted_41 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_42 = { class: "overflow-x-auto" };
const _hoisted_43 = { class: "w-full text-left border-collapse" };
const _hoisted_44 = { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" };
const _hoisted_45 = { class: "divide-y divide-gray-100" };
const _hoisted_46 = { class: "px-3 py-1.5" };
const _hoisted_47 = { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_48 = { key: 2 };
const _hoisted_49 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_50 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_51 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_52 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_53 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_54 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_55 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_56 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_57 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_58 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_59 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_60 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_61 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_62 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_63 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_64 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_65 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_66 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_67 = { class: "p-5 space-y-5" };
const _hoisted_68 = { class: "flex justify-between items-center mb-1" };
const _hoisted_69 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_70 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_71 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_72 = { class: "flex justify-between items-center mb-1" };
const _hoisted_73 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_74 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_75 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_76 = { class: "flex justify-between items-center mb-1" };
const _hoisted_77 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_78 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_79 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_80 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_81 = {
  class: "p-5 flex flex-col items-center justify-center text-center",
  style: {"min-height":"200px"}
};
const _hoisted_82 = { class: "text-6xl font-bold font-mono text-absa-enrich mb-2" };
const _hoisted_83 = { class: "w-32 mt-6" };
const _hoisted_84 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_85 = { class: "text-[10px] text-gray-400 mt-2" };
const _hoisted_86 = { key: 3 };
const _hoisted_87 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_88 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_89 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_90 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_91 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_92 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_93 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_94 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_95 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_96 = {
  key: 0,
  class: "flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3"
};
const _hoisted_97 = { class: "text-sm font-semibold" };
const _hoisted_98 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_99 = { class: "overflow-x-auto" };
const _hoisted_100 = { class: "w-full text-left border-collapse" };
const _hoisted_101 = { class: "border-b border-gray-200 bg-gray-50" };
const _hoisted_102 = { class: "px-3 py-2 w-8" };
const _hoisted_103 = ["checked"];
const _hoisted_104 = { class: "divide-y divide-gray-100" };
const _hoisted_105 = { class: "px-3 py-1.5 w-8" };
const _hoisted_106 = ["checked", "disabled", "onChange"];
const _hoisted_107 = { class: "px-3 py-1.5 text-xs font-mono text-gray-500" };
const _hoisted_108 = { class: "px-3 py-1.5 text-xs font-semibold text-absa-enrich" };
const _hoisted_109 = { class: "px-3 py-1.5 text-xs text-gray-500" };
const _hoisted_110 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_111 = { class: "px-3 py-1.5" };
const _hoisted_112 = { class: "flex flex-col gap-1" };
const _hoisted_113 = { class: "text-xs font-bold font-mono text-absa-enrich" };
const _hoisted_114 = { class: "w-16 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_115 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_116 = { class: "px-3 py-1.5" };
const _hoisted_117 = { class: "px-3 py-1.5" };
const _hoisted_118 = ["onClick"];
const _hoisted_119 = ["onClick"];
const _hoisted_120 = {
  key: 2,
  class: "text-xs text-gray-400"
};
const _hoisted_121 = { key: 4 };
const _hoisted_122 = {
  key: 0,
  class: "bg-red-50 border border-red-200 rounded-sm p-4 mb-6"
};
const _hoisted_123 = { class: "text-xs text-red-800" };
const _hoisted_124 = { class: "bg-white border border-gray-300 rounded-sm p-4 mb-6" };
const _hoisted_125 = { class: "flex items-center gap-4 mb-4" };
const _hoisted_126 = { class: "flex bg-gray-100 rounded-sm p-0.5" };
const _hoisted_127 = { class: "flex items-center gap-2 ml-auto" };
const _hoisted_128 = ["title"];
const _hoisted_129 = { class: "h-[400px]" };
const _hoisted_130 = { class: "bg-white border border-gray-300 rounded-sm" };
const _hoisted_131 = { class: "overflow-x-auto" };
const _hoisted_132 = { class: "min-w-full divide-y divide-gray-100" };
const _hoisted_133 = { class: "divide-y divide-gray-100" };
const _hoisted_134 = { key: 0 };
const _hoisted_135 = { class: "px-3 py-1.5 text-xs font-mono text-gray-500" };
const _hoisted_136 = { class: "px-3 py-1.5" };
const _hoisted_137 = { class: "px-3 py-1.5" };
const _hoisted_138 = { class: "text-[10px] text-gray-500 ml-1" };
const _hoisted_139 = { class: "px-3 py-1.5 text-[10px] font-mono text-gray-500" };


const _sfc_main = {
  __name: 'LifecyclePrediction',
  setup(__props) {

Chart.register(plugin_title, plugin_tooltip, plugin_legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale);

const store = useIntelligenceStore();
const loading = ref(true);
const showCampaignModal = ref(false);
const campaignCustomers = ref([]);
const activeTab = ref('distribution');
const tabs = [
  { id: 'distribution', label: 'Stage Distribution', icon: 'waterfall_chart' },
  { id: 'transitions',  label: 'Stage Transitions',  icon: 'compare_arrows'  },
  { id: 'onboarding',   label: 'Onboarding Health',  icon: 'new_releases'    },
  { id: 'winback',      label: 'Win-Back Pipeline',  icon: 'redo'            },
  { id: 'forecast',     label: 'Stage Forecast',     icon: 'online_prediction' },
];

// ─── Compute States ──────────────────────────────────────────────────────────
const computeStatesRunning = ref(false);
const computeStatesResult = ref(null);

async function runComputeStates() {
  computeStatesRunning.value = true;
  computeStatesResult.value = null;
  try {
    const snapshotStore = (await __vitePreload(async () => { const {useSnapshotStore} = await import('./snapshotStore-CBvUDR3G.js');return { useSnapshotStore }},true              ?[]:void 0)).useSnapshotStore();
    const result = await computeCustomerStates(snapshotStore.asOfDate);
    computeStatesResult.value = result;
    if (result.transitions_detected > 0) {
      notify(
        `Compute States complete: ${result.transitions_detected} transition${result.transitions_detected !== 1 ? 's' : ''} detected · ${result.states_upserted} states upserted`,
        'success', { autoClose: 6000 }
      );
      // Refresh the lifecycle data so the heatmap updates
      await store.fetchLifecycle();
    } else {
      notify(
        `Compute States complete: ${result.customers_processed} customers processed · 0 transitions detected (no stage changes since last run)`,
        'info', { autoClose: 7000 }
      );
    }
  } catch (e) {
    computeStatesResult.value = { status: 'ERROR', customers_processed: 0, states_upserted: 0, transitions_detected: 0, duration_seconds: 0 };
    notify(e?.message || 'Compute States failed', 'error', { autoClose: 6000 });
  } finally {
    computeStatesRunning.value = false;
  }
}

// ─── Forward stage forecast (14/30/90d models) ──────────────────────────
// The four tabs above are all *observed*; this one is the model's forward view.
// StateEngine still owns the current stage, so nothing here is labelled "now".
const predictionStore = usePredictionStore();
const customerStore = useCustomerStore();

const FORECAST_HORIZONS = ['14', '30', '90'];
const forecastRunning = ref(false);
const forecastViewType = ref('line');

// Lifecycle severity order: a stage further right is a later (worse) stage.
const STAGE_SEQUENCE = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED'];
const STAGE_LABEL = {
  NEW: 'Onboarding', ACTIVE: 'Active', GROWING: 'Growing',
  AT_RISK: 'At Risk', DORMANT: 'Dormant', CHURNED: 'Churned',
};

function horizonLoaded(horizon) {
  return predictionStore.lifecycleHorizons?.[horizon]?.loaded === true
}

function horizonVersion(horizon) {
  const version = predictionStore.lifecycleHorizons?.[horizon]?.version;
  return version && version !== 'not_loaded' ? version : null
}

/** Predicted stage mix for one horizon — counts plus share, in lifecycle order. */
function predictedDistribution(horizon) {
  const counts = {};
  for (const entry of Object.values(predictionStore.lifecycleForecast ?? {})) {
    const stage = entry?.[horizon]?.stage;
    if (stage) counts[stage] = (counts[stage] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .sort((a, b) => STAGE_SEQUENCE.indexOf(a[0]) - STAGE_SEQUENCE.indexOf(b[0]))
    .map(([stage, count]) => ({
      stage,
      label: STAGE_LABEL[stage] ?? stage,
      count,
      pct: total ? Math.round((count / total) * 1000) / 10 : 0,
    }))
}

const forecastChartData = computed(() => {
  const d14 = predictedDistribution('14');
  const d30 = predictedDistribution('30');
  const d90 = predictedDistribution('90');

  const labels = STAGE_SEQUENCE.map(s => STAGE_LABEL[s] ?? s);
  
  const getData = (dist) => {
    return STAGE_SEQUENCE.map(stage => {
      const found = dist.find(item => item.stage === stage);
      return found ? found.count : 0
    })
  };

  return {
    labels,
    datasets: [
      {
        label: '14-Day',
        data: getData(d14),
        backgroundColor: '#f1f5f9', // slate-100 to show short term
        borderColor: '#94a3b8',
        borderWidth: 1,
        borderRadius: 2,
      },
      {
        label: '30-Day',
        data: getData(d30),
        backgroundColor: '#e11d48', // absa-passion
        borderRadius: 2,
      },
      {
        label: '90-Day',
        data: getData(d90),
        backgroundColor: '#0f172a', // absa-enrich
        borderRadius: 2,
      }
    ]
  }
});

const forecastChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        font: { family: 'Inter', size: 11 }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      titleFont: { family: 'Inter' },
      bodyFont: { family: 'Inter' }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: 'Inter', size: 11 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6' },
      ticks: { font: { family: 'Inter', size: 11 } }
    }
  }
};

const forecastLineChartData = computed(() => {
  const currentDist = store.lifecycleData?.distribution ?? [];
  const d14 = predictedDistribution('14');
  const d30 = predictedDistribution('30');
  const d90 = predictedDistribution('90');

  const labels = ['Current', '14-Day', '30-Day', '90-Day'];
  
  const colors = [
    '#94a3b8', // Onboarding (slate-400)
    '#1e293b', // Active (slate-800)
    '#e11d48', // Growing (absa-passion/red-600)
    '#ea580c', // At Risk (orange-600)
    '#b91c1c', // Dormant (red-700)
    '#7f1d1d', // Churned (red-900)
  ];

  const datasets = STAGE_SEQUENCE.map((stage, idx) => {
    const cVal = currentDist.find(s => s.stage === stage)?.count || 0;
    const val14 = d14.find(s => s.stage === stage)?.count || 0;
    const val30 = d30.find(s => s.stage === stage)?.count || 0;
    const val90 = d90.find(s => s.stage === stage)?.count || 0;

    return {
      label: STAGE_LABEL[stage] ?? stage,
      data: [cVal, val14, val30, val90],
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length],
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5
    }
  });

  return { labels, datasets }
});

const forecastLineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        font: { family: 'Inter', size: 11 }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      titleFont: { family: 'Inter' },
      bodyFont: { family: 'Inter' }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: 'Inter', size: 11 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6' },
      ticks: { font: { family: 'Inter', size: 11 } }
    }
  }
};

/** Customers whose 30-day forecast sits later in the lifecycle than they are now. */
const deteriorating = computed(() => {
  const forecast = predictionStore.lifecycleForecast ?? {};
  const out = [];
  for (const customer of customerStore.customers ?? []) {
    const entry = forecast[customer.customerId];
    const predicted = entry?.['30']?.stage;
    if (!predicted) continue
    const from = STAGE_SEQUENCE.indexOf(String(customer.state || '').toUpperCase());
    const to = STAGE_SEQUENCE.indexOf(predicted);
    if (from < 0 || to <= from) continue
    out.push({
      customer_id: customer.customerId,
      current: customer.state,
      predicted,
      confidence: entry['30'].confidence ?? 0,
      h14: entry['14']?.stage ?? null,
      h90: entry['90']?.stage ?? null,
    });
  }
  return out.sort((a, b) => b.confidence - a.confidence).slice(0, 25)
});

async function runForecast() {
  forecastRunning.value = true;
  try {
    await predictionStore.fetchLifecycleForecast();
    // Current stages come from the ledger, for the deterioration comparison.
    if (!customerStore.customers?.length) await customerStore.fetchPortfolio();
    const loaded = FORECAST_HORIZONS.filter(horizonLoaded);
    const missing = FORECAST_HORIZONS.filter((h) => !horizonLoaded(h));
    if (!loaded.length) {
      notify('No lifecycle horizon model is available — check the prediction service logs', 'error', { autoClose: 6000 });
    } else if (!predictionStore.lifecycleForecastCount) {
      // Loaded but empty: a missing feature snapshot, not a model problem.
      notify(
        `No customers to forecast — status ${predictionStore.lifecycleForecastStatus ?? 'unknown'} for `
          + `${predictionStore.lifecycleForecastDate ?? 'the selected date'}. Pick a snapshot date that has features.`,
        'error',
        { autoClose: 8000 },
      );
    } else {
      notify(
        `Lifecycle forecast complete: ${loaded.map((h) => `${h}d`).join(', ')} · `
          + `${predictionStore.lifecycleForecastCount} customers`
          + (missing.length ? ` · unavailable: ${missing.map((h) => `${h}d`).join(', ')}` : ''),
        missing.length ? 'info' : 'success',
        { autoClose: 6000 },
      );
    }
    activeTab.value = 'forecast';
  } catch (e) {
    notify(e?.message || 'Lifecycle forecast failed', 'error', { autoClose: 6000 });
  } finally {
    forecastRunning.value = false;
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const stageBarClass = (stage) => {
  const map = {
    ONBOARDING: 'bg-gray-400',
    GROWING:    'bg-absa-passion',
    MATURE:     'bg-absa-enrich',
    AT_RISK:    'bg-absa-energy',
    CHURNING:   'bg-absa-inspire',
    CHURNED:    'bg-red-900',
    WIN_BACK:   'bg-amber-500',
  };
  return map[stage] || 'bg-gray-300'
};

function formatEstValue(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (val >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (val >= 1e3) return 'K ' + (val / 1e3).toFixed(0) + 'K'
  return 'K ' + val.toLocaleString()
}

function winBackStatusClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-red-50 text-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-500'
}

function winBackDotClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-500'
  return 'bg-gray-400'
}

// ─── Computed ────────────────────────────────────────────────────────────────

const transitionStageLabels = computed(() => {
  const dist = store.lifecycleData?.distribution ?? [];
  if (dist.length) return dist.map(s => s.label)
  const matrix = store.lifecycleData?.transitions?.matrix ?? [];
  return matrix.map((_, i) => 'Stage ' + (i + 1))
});

// Onboarding activation percentages
const activation30Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_30d) return 0
  return ((ob.activated_30d / ob.total_new) * 100).toFixed(1)
});

const activation60Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_60d) return 0
  return ((ob.activated_60d / ob.total_new) * 100).toFixed(1)
});

const activation90Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_90d) return 0
  return ((ob.activated_90d / ob.total_new) * 100).toFixed(1)
});

// Win-back KPIs
const winBackEligibleCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'ELIGIBLE').length
);

const winBackInCampaignCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'IN CAMPAIGN').length
);

const avgWinBackProb = computed(() => {
  const wb = store.lifecycleData?.win_back ?? [];
  if (!wb.length) return '—'
  const avg = wb.reduce((acc, w) => acc + (w.prob ?? 0), 0) / wb.length;
  return (avg * 100).toFixed(1)
});

const estTotalWinBackValue = computed(() => {
  const wb = store.lifecycleData?.win_back ?? [];
  const total = wb.reduce((acc, w) => acc + (w.est_value ?? 0), 0);
  return formatEstValue(total)
});

// ─── Lifecycle ───────────────────────────────────────────────────────────────

// Remediation 6: Collapsible scope note
const transitionScopeExpanded = ref(true);

// Remediation 5: Bulk selection for Win-Back Pipeline
const selectedWinback = ref(new Set());

const allWinbackSelected = computed(() => {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE');
  return eligible.length > 0 && eligible.every(r => selectedWinback.value.has(r.customer_id))
});

function toggleWinbackAll() {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE');
  if (allWinbackSelected.value) {
    selectedWinback.value = new Set();
  } else {
    selectedWinback.value = new Set(eligible.map(r => r.customer_id));
  }
}

function toggleWinback(id) {
  const s = new Set(selectedWinback.value);
  if (s.has(id)) s.delete(id);
  else s.add(id);
  selectedWinback.value = s;
}

function bulkAddToCampaign() {
  campaignCustomers.value = store.lifecycleData?.win_back.filter(c => selectedWinback.value.has(c.customer_id)) || [];
  showCampaignModal.value = true;
}

function clearWinbackSelection() {
  selectedWinback.value = new Set();
}

// ─── Export / Row actions ────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value;
  const distribution = (store.lifecycleData?.distribution ?? []).map(s => ({
    stage: s.stage, label: s.label, count: s.count, pct: s.pct, mom_delta: s.mom_delta,
  }));
  if (which === 'distribution') {
    downloadCsv(reportFilename('lifecycle-distribution'), distribution, ['stage', 'label', 'count', 'pct', 'mom_delta']);
  } else if (which === 'transitions') {
    const matrix = store.lifecycleData?.transitions?.matrix ?? [];
    const labels = transitionStageLabels.value;
    const rows = matrix.map((row, i) => {
      const obj = { from: labels[i] ?? `Stage ${i + 1}` };
      row.forEach((cell, j) => { obj[labels[j] ?? `Stage ${j + 1}`] = cell; });
      return obj
    });
    downloadCsv(reportFilename('lifecycle-transitions'), rows);
  } else if (which === 'onboarding') {
    const ob = store.lifecycleData?.onboarding ?? {};
    downloadCsv(reportFilename('onboarding-health'), [{
      total_new: ob.total_new, activated_30d: ob.activated_30d, activated_60d: ob.activated_60d,
      activated_90d: ob.activated_90d, early_at_risk: ob.early_at_risk, avg_products: ob.avg_products,
      digital_enrolled: ob.digital_enrolled, activation_30_pct: activation30Pct.value,
      activation_60_pct: activation60Pct.value, activation_90_pct: activation90Pct.value,
    }]);
  } else {
    const wb = store.lifecycleData?.win_back ?? [];
    downloadCsv(reportFilename('winback-pipeline'), wb, ['customer_id', 'name', 'last_product', 'months_since_churn', 'prob', 'est_value', 'status']);
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 });
}

function viewCampaign(row) {
  if (!row) return
  notify(`Customer ${row.customer_id} is in an active win-back campaign. Open Customer Detail for the full journey.`, 'info', { autoClose: 4000 });
}

onMounted(async () => {
  await store.fetchLifecycle();
  // Pre-load the forecast so the Stage Forecast tab is not empty on first open;
  // the header button re-runs it for the selected snapshot date.
  predictionStore.fetchLifecycleForecast();
  loading.value = false;
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[6] || (_cache[6] = createBaseVNode("div", null, [
        createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Home"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Intelligence"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Lifecycle")
        ]),
        createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Customer Lifecycle Prediction"),
        createBaseVNode("p", { class: "text-body-md text-gray-500 mt-1" }, "Stage distribution, transition analysis, onboarding health, and win-back intelligence")
      ], -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("button", {
          onClick: runForecast,
          disabled: forecastRunning.value,
          class: "px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none disabled:opacity-50"
        }, [
          createBaseVNode("span", _hoisted_5, toDisplayString(forecastRunning.value ? 'hourglass_top' : 'online_prediction'), 1),
          createTextVNode(" " + toDisplayString(forecastRunning.value ? 'Running…' : 'Run Lifecycle Forecast'), 1)
        ], 8, _hoisted_4),
        createBaseVNode("button", {
          onClick: exportReport,
          class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[5] || (_cache[5] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download", -1),
          createTextVNode(" Export Report ", -1)
        ]))])
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createVNode(_sfc_main$1)
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_7, [
            (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
              return createBaseVNode("button", {
                key: tab.id,
                onClick: $event => (activeTab.value = tab.id),
                class: normalizeClass(['px-3 py-1.5 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
              }, [
                createBaseVNode("span", _hoisted_9, toDisplayString(tab.icon), 1),
                createTextVNode(" " + toDisplayString(tab.label), 1)
              ], 10, _hoisted_8)
            }), 64))
          ]),
          (activeTab.value === 'distribution')
            ? (openBlock(), createElementBlock("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.distribution, (stage) => {
                    return (openBlock(), createElementBlock("div", {
                      key: stage.stage,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_12, toDisplayString(stage.label), 1),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-2xl font-bold font-mono", stage.color ?? 'text-absa-enrich'])
                      }, toDisplayString(stage.count?.toLocaleString()), 3),
                      createBaseVNode("p", _hoisted_13, toDisplayString(stage.pct) + "% of portfolio", 1),
                      createBaseVNode("p", _hoisted_14, [
                        (stage.mom_delta > 0)
                          ? (openBlock(), createElementBlock("span", _hoisted_15, "▲ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                          : (stage.mom_delta < 0)
                            ? (openBlock(), createElementBlock("span", _hoisted_16, "▼ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                            : (openBlock(), createElementBlock("span", _hoisted_17, "—")),
                        _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-gray-400 ml-0.5" }, "MoM", -1))
                      ])
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_18, [
                  _cache[9] || (_cache[9] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Portfolio Lifecycle Flow"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Customer counts by lifecycle stage — proportional distribution")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_19, [
                    _cache[8] || (_cache[8] = createStaticVNode("<div class=\"flex items-center gap-4 border-b border-gray-100 pb-3\"><div class=\"w-28 flex-shrink-0 text-[10px] text-gray-400 font-bold uppercase\">Stage</div><div class=\"w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Count</div><div class=\"flex-1 text-[10px] text-gray-400 font-bold uppercase pl-1\">Distribution</div><div class=\"w-12 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Pct</div><div class=\"w-24 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">MoM Delta</div></div>", 1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.distribution, (stage) => {
                      return (openBlock(), createElementBlock("div", {
                        key: stage.stage,
                        class: "flex items-center gap-4"
                      }, [
                        createBaseVNode("div", _hoisted_20, [
                          createBaseVNode("span", _hoisted_21, toDisplayString(stage.label), 1)
                        ]),
                        createBaseVNode("div", _hoisted_22, [
                          createBaseVNode("span", _hoisted_23, toDisplayString(stage.count?.toLocaleString()), 1)
                        ]),
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("div", _hoisted_25, [
                            createBaseVNode("div", {
                              class: normalizeClass(['h-full rounded-full', stageBarClass(stage.stage)]),
                              style: normalizeStyle({ width: stage.pct + '%' })
                            }, null, 6)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_26, [
                          createBaseVNode("span", _hoisted_27, toDisplayString(stage.pct) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          (stage.mom_delta > 0)
                            ? (openBlock(), createElementBlock("span", _hoisted_29, "▲ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                            : (stage.mom_delta < 0)
                              ? (openBlock(), createElementBlock("span", _hoisted_30, "▼ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                              : (openBlock(), createElementBlock("span", _hoisted_31, "—"))
                        ])
                      ]))
                    }), 128))
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'transitions')
            ? (openBlock(), createElementBlock("div", _hoisted_32, [
                createBaseVNode("div", _hoisted_33, [
                  _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-xs text-gray-500" }, [
                    createTextVNode(" Transitions are written when the State Engine detects a stage change between two snapshot dates. Run "),
                    createBaseVNode("strong", { class: "text-absa-enrich" }, "Compute States"),
                    createTextVNode(" to detect and log all transitions for the selected date. ")
                  ], -1)),
                  createBaseVNode("button", {
                    onClick: runComputeStates,
                    disabled: computeStatesRunning.value,
                    class: "ml-4 flex-shrink-0 px-4 py-2 bg-absa-enrich text-white rounded-sm flex items-center gap-2 hover:opacity-90 transition-opacity text-sm font-semibold shadow-none disabled:opacity-50"
                  }, [
                    createBaseVNode("span", _hoisted_35, toDisplayString(computeStatesRunning.value ? 'hourglass_top' : 'sync_alt'), 1),
                    createTextVNode(" " + toDisplayString(computeStatesRunning.value ? 'Computing…' : 'Compute States'), 1)
                  ], 8, _hoisted_34)
                ]),
                (computeStatesResult.value)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(['rounded-sm border px-4 py-3 mb-5 text-xs flex items-start gap-3', computeStatesResult.value.status === 'COMPLETED' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'])
                    }, [
                      createBaseVNode("span", _hoisted_36, toDisplayString(computeStatesResult.value.status === 'COMPLETED' ? 'check_circle' : 'error'), 1),
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_37, toDisplayString(computeStatesResult.value.status), 1),
                        createBaseVNode("p", _hoisted_38, toDisplayString(computeStatesResult.value.customers_processed) + " customers processed · " + toDisplayString(computeStatesResult.value.states_upserted) + " states upserted · " + toDisplayString(computeStatesResult.value.transitions_detected) + " transitions detected · " + toDisplayString(computeStatesResult.value.duration_seconds) + "s ", 1)
                      ])
                    ], 2))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_39, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = $event => (transitionScopeExpanded.value = !transitionScopeExpanded.value)),
                    class: "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  }, [
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-gray-400 flex-shrink-0" }, "info", -1)),
                    _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-xs font-semibold text-gray-600 flex-1" }, "How to read this heatmap", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(["material-symbols-outlined text-[18px] text-gray-400 transition-transform", transitionScopeExpanded.value ? 'rotate-180' : ''])
                    }, "expand_more", 2)
                  ]),
                  (transitionScopeExpanded.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_40, [...(_cache[13] || (_cache[13] = [
                        createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed" }, [
                          createTextVNode(" This heatmap shows how many customers moved between lifecycle stages in the last 30 days. "),
                          createBaseVNode("strong", { class: "text-absa-enrich" }, "Diagonal cells"),
                          createTextVNode(" represent customers who remained in the same stage. "),
                          createBaseVNode("strong", { class: "text-absa-enrich" }, "Off-diagonal cells"),
                          createTextVNode(" represent transitions — the larger the number, the more significant the movement. ")
                        ], -1)
                      ]))]))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_41, [
                  _cache[15] || (_cache[15] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Stage Transition Heatmap"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Last 30 days — rows = From stage, columns = To stage")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_42, [
                    createBaseVNode("table", _hoisted_43, [
                      createBaseVNode("thead", null, [
                        createBaseVNode("tr", _hoisted_44, [
                          _cache[14] || (_cache[14] = createBaseVNode("th", { class: "px-3 py-1.5 min-w-[120px]" }, "FROM \\ TO", -1)),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(transitionStageLabels.value, (stage, colIdx) => {
                            return (openBlock(), createElementBlock("th", {
                              key: colIdx,
                              class: "px-3 py-3 text-center min-w-[80px]"
                            }, toDisplayString(stage), 1))
                          }), 128))
                        ])
                      ]),
                      createBaseVNode("tbody", _hoisted_45, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.transitions?.matrix, (row, rowIdx) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: rowIdx,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createBaseVNode("td", _hoisted_46, [
                              createBaseVNode("span", _hoisted_47, toDisplayString(transitionStageLabels.value[rowIdx] ?? 'Stage ' + rowIdx), 1)
                            ]),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(row, (cell, colIdx) => {
                              return (openBlock(), createElementBlock("td", {
                                key: colIdx,
                                class: normalizeClass([
                      'px-3 py-3 text-center text-xs',
                      rowIdx === colIdx
                        ? 'bg-gray-50 text-gray-400 italic'
                        : cell > 1000
                          ? 'bg-red-50 font-bold text-absa-passion'
                          : 'text-absa-enrich'
                    ])
                              }, toDisplayString(cell > 0 ? cell.toLocaleString() : '—'), 3))
                            }), 128))
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'onboarding')
            ? (openBlock(), createElementBlock("div", _hoisted_48, [
                createBaseVNode("div", _hoisted_49, [
                  createBaseVNode("div", _hoisted_50, [
                    _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "New Customers (MTD)", -1)),
                    createBaseVNode("p", _hoisted_51, toDisplayString(unref(store).lifecycleData?.onboarding?.total_new?.toLocaleString() ?? '—'), 1),
                    _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "This month", -1))
                  ]),
                  createBaseVNode("div", _hoisted_52, [
                    _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (30D)", -1)),
                    createBaseVNode("p", _hoisted_53, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_30d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_54, toDisplayString(activation30Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_55, [
                    _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (60D)", -1)),
                    createBaseVNode("p", _hoisted_56, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_60d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_57, toDisplayString(activation60Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_58, [
                    _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (90D)", -1)),
                    createBaseVNode("p", _hoisted_59, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_90d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_60, toDisplayString(activation90Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_61, [
                    _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Early At-Risk", -1)),
                    createBaseVNode("p", _hoisted_62, toDisplayString(unref(store).lifecycleData?.onboarding?.early_at_risk?.toLocaleString() ?? '—'), 1),
                    _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Flagged within 90D", -1))
                  ]),
                  createBaseVNode("div", _hoisted_63, [
                    _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Products Held", -1)),
                    createBaseVNode("p", _hoisted_64, toDisplayString(unref(store).lifecycleData?.onboarding?.avg_products?.toFixed(1) ?? '—'), 1),
                    _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Per new customer", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_65, [
                  createBaseVNode("div", _hoisted_66, [
                    _cache[28] || (_cache[28] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Activation Funnel"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "30D / 60D / 90D activation rates for new customers")
                    ], -1)),
                    createBaseVNode("div", _hoisted_67, [
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_68, [
                          _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "30-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_69, toDisplayString(activation30Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_70, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation30Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_71, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_30d?.toLocaleString()) + " customers activated within 30 days", 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_72, [
                          _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "60-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_73, toDisplayString(activation60Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_74, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation60Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_75, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_60d?.toLocaleString()) + " customers activated within 60 days", 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_76, [
                          _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "90-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_77, toDisplayString(activation90Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_78, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation90Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_79, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_90d?.toLocaleString()) + " customers activated within 90 days", 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_80, [
                    _cache[31] || (_cache[31] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Digital Enrolment"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Online & mobile banking uptake among new customers")
                    ], -1)),
                    createBaseVNode("div", _hoisted_81, [
                      createBaseVNode("p", _hoisted_82, toDisplayString(unref(store).lifecycleData?.onboarding?.digital_enrolled ?? '—') + "% ", 1),
                      _cache[30] || (_cache[30] = createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed max-w-[240px]" }, " of new customers enrolled in digital banking within 30 days ", -1)),
                      createBaseVNode("div", _hoisted_83, [
                        createBaseVNode("div", _hoisted_84, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: (unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) + '%' })
                          }, null, 4)
                        ])
                      ]),
                      createBaseVNode("p", _hoisted_85, [
                        _cache[29] || (_cache[29] = createTextVNode(" Target: 80%  ·  ", -1)),
                        createBaseVNode("span", {
                          class: normalizeClass((unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80
                    ? 'text-absa-passion font-bold'
                    : 'text-absa-inspire font-bold')
                        }, toDisplayString((unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80 ? 'ON TRACK' : 'BELOW TARGET'), 3)
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'winback')
            ? (openBlock(), createElementBlock("div", _hoisted_86, [
                createBaseVNode("div", _hoisted_87, [
                  createBaseVNode("div", _hoisted_88, [
                    _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Win-Back Eligible", -1)),
                    createBaseVNode("p", _hoisted_89, toDisplayString(winBackEligibleCount.value.toLocaleString()), 1),
                    _cache[33] || (_cache[33] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Eligible for campaign", -1))
                  ]),
                  createBaseVNode("div", _hoisted_90, [
                    _cache[34] || (_cache[34] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "In Campaign", -1)),
                    createBaseVNode("p", _hoisted_91, toDisplayString(winBackInCampaignCount.value.toLocaleString()), 1),
                    _cache[35] || (_cache[35] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Active win-back campaigns", -1))
                  ]),
                  createBaseVNode("div", _hoisted_92, [
                    _cache[36] || (_cache[36] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Win-Back Prob", -1)),
                    createBaseVNode("p", _hoisted_93, toDisplayString(avgWinBackProb.value) + "%", 1),
                    _cache[37] || (_cache[37] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Predicted success rate", -1))
                  ]),
                  createBaseVNode("div", _hoisted_94, [
                    _cache[38] || (_cache[38] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Est. Total Win-Back Value", -1)),
                    createBaseVNode("p", _hoisted_95, toDisplayString(estTotalWinBackValue.value), 1),
                    _cache[39] || (_cache[39] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Projected revenue recovery", -1))
                  ])
                ]),
                (selectedWinback.value.size > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_96, [
                      _cache[41] || (_cache[41] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "check_box", -1)),
                      createBaseVNode("span", _hoisted_97, toDisplayString(selectedWinback.value.size) + " customer" + toDisplayString(selectedWinback.value.size > 1 ? 's' : '') + " selected", 1),
                      createBaseVNode("div", { class: "flex items-center gap-2 ml-auto" }, [
                        createBaseVNode("button", {
                          onClick: bulkAddToCampaign,
                          class: "px-3 py-1 bg-amber-400 text-absa-enrich rounded-sm text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none flex items-center gap-1"
                        }, [...(_cache[40] || (_cache[40] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "auto_awesome", -1),
                          createTextVNode("AI Campaign Generator ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: clearWinbackSelection,
                          class: "px-2 py-1 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                        }, "Clear")
                      ])
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_98, [
                  _cache[51] || (_cache[51] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Win-Back Pipeline"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Churned customers ranked by win-back probability and estimated value")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_99, [
                    createBaseVNode("table", _hoisted_100, [
                      createBaseVNode("thead", null, [
                        createBaseVNode("tr", _hoisted_101, [
                          createBaseVNode("th", _hoisted_102, [
                            createBaseVNode("input", {
                              type: "checkbox",
                              checked: allWinbackSelected.value,
                              onChange: toggleWinbackAll,
                              class: "rounded-sm cursor-pointer",
                              title: "Select all eligible"
                            }, null, 40, _hoisted_103)
                          ]),
                          _cache[42] || (_cache[42] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customer ID", -1)),
                          _cache[43] || (_cache[43] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Name", -1)),
                          _cache[44] || (_cache[44] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Last Product", -1)),
                          _cache[45] || (_cache[45] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Months Since Churn", -1)),
                          _cache[46] || (_cache[46] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Win-Back Prob", -1)),
                          _cache[47] || (_cache[47] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Est. Value", -1)),
                          _cache[48] || (_cache[48] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Status", -1)),
                          _cache[49] || (_cache[49] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Action", -1))
                        ])
                      ]),
                      createBaseVNode("tbody", _hoisted_104, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.win_back, (w) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: w.customer_id,
                            class: normalizeClass(['transition-colors', selectedWinback.value.has(w.customer_id) ? 'bg-amber-50' : 'hover:bg-gray-50'])
                          }, [
                            createBaseVNode("td", _hoisted_105, [
                              createBaseVNode("input", {
                                type: "checkbox",
                                checked: selectedWinback.value.has(w.customer_id),
                                disabled: w.status !== 'ELIGIBLE',
                                onChange: $event => (toggleWinback(w.customer_id)),
                                class: "rounded-sm cursor-pointer disabled:opacity-30"
                              }, null, 40, _hoisted_106)
                            ]),
                            createBaseVNode("td", _hoisted_107, toDisplayString(w.customer_id), 1),
                            createBaseVNode("td", _hoisted_108, toDisplayString(w.name), 1),
                            createBaseVNode("td", _hoisted_109, toDisplayString(w.last_product), 1),
                            createBaseVNode("td", _hoisted_110, toDisplayString(w.months_churned ?? w.months_since_churn) + "mo", 1),
                            createBaseVNode("td", _hoisted_111, [
                              createBaseVNode("div", _hoisted_112, [
                                createBaseVNode("span", _hoisted_113, toDisplayString((w.prob * 100).toFixed(1)) + "%", 1),
                                createBaseVNode("div", _hoisted_114, [
                                  createBaseVNode("div", {
                                    class: "h-full bg-absa-passion rounded-full",
                                    style: normalizeStyle({ width: (w.prob * 100) + '%' })
                                  }, null, 4)
                                ])
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_115, toDisplayString(w.est_value ?? formatEstValue(w.est_value_num)), 1),
                            createBaseVNode("td", _hoisted_116, [
                              createBaseVNode("span", {
                                class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', winBackStatusClass(w.status)])
                              }, [
                                createBaseVNode("span", {
                                  class: normalizeClass(["w-1 h-1 rounded-full", winBackDotClass(w.status)])
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(w.status), 1)
                              ], 2)
                            ]),
                            createBaseVNode("td", _hoisted_117, [
                              (w.status === 'ELIGIBLE')
                                ? (openBlock(), createElementBlock("button", {
                                    key: 0,
                                    onClick: $event => {campaignCustomers.value = [w]; showCampaignModal.value = true;},
                                    class: "px-3 py-1 bg-absa-passion text-white rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none flex items-center gap-1"
                                  }, [...(_cache[50] || (_cache[50] = [
                                    createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "auto_awesome", -1),
                                    createTextVNode("AI Campaign", -1)
                                  ]))], 8, _hoisted_118))
                                : (w.status === 'IN CAMPAIGN')
                                  ? (openBlock(), createElementBlock("button", {
                                      key: 1,
                                      onClick: $event => (viewCampaign(w)),
                                      class: "px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                                    }, "View Campaign", 8, _hoisted_119))
                                  : (openBlock(), createElementBlock("span", _hoisted_120, "—"))
                            ])
                          ], 2))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'forecast')
            ? (openBlock(), createElementBlock("div", _hoisted_121, [
                _cache[68] || (_cache[68] = createBaseVNode("div", { class: "bg-absa-serene border border-gray-300 rounded-sm p-4 mb-6" }, [
                  createBaseVNode("p", { class: "text-xs text-gray-600" }, [
                    createTextVNode(" Model forecasts of the stage at 14, 30 and 90 days — these are "),
                    createBaseVNode("strong", { class: "text-absa-enrich" }, "predictions"),
                    createTextVNode(". The Stage Distribution tab is what the rule engine says "),
                    createBaseVNode("em", null, "now"),
                    createTextVNode(", so the two are deliberately kept apart. A horizon whose model is unavailable is reported as unavailable rather than estimated. ")
                  ])
                ], -1)),
                (unref(predictionStore).lifecycleForecastStatus && !unref(predictionStore).lifecycleForecastCount)
                  ? (openBlock(), createElementBlock("div", _hoisted_122, [
                      createBaseVNode("p", _hoisted_123, [
                        _cache[59] || (_cache[59] = createTextVNode(" The forecast came back ", -1)),
                        _cache[60] || (_cache[60] = createBaseVNode("strong", null, "empty", -1)),
                        _cache[61] || (_cache[61] = createTextVNode(" for ", -1)),
                        createBaseVNode("strong", null, toDisplayString(unref(predictionStore).lifecycleForecastDate || 'the selected date'), 1),
                        _cache[62] || (_cache[62] = createTextVNode(" (status: ", -1)),
                        createBaseVNode("strong", null, toDisplayString(unref(predictionStore).lifecycleForecastStatus), 1),
                        _cache[63] || (_cache[63] = createTextVNode(", 0 customers). ", -1)),
                        (unref(predictionStore).lifecycleForecastStatus === 'NO_DATA')
                          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              _cache[52] || (_cache[52] = createTextVNode(" That date has no rows in ", -1)),
                              _cache[53] || (_cache[53] = createBaseVNode("code", { class: "font-mono" }, "customer_features", -1)),
                              _cache[54] || (_cache[54] = createTextVNode(" — the models are loaded, but there is nothing to score. Pick a snapshot date that has features using the header selector; ", -1)),
                              _cache[55] || (_cache[55] = createBaseVNode("code", { class: "font-mono" }, "/states/snapshots", -1)),
                              _cache[56] || (_cache[56] = createTextVNode(" lists the dates that have ", -1)),
                              _cache[57] || (_cache[57] = createBaseVNode("em", null, "states", -1)),
                              _cache[58] || (_cache[58] = createTextVNode(", which is not always the same set. ", -1))
                            ], 64))
                          : createCommentVNode("", true)
                      ])
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_124, [
                  createBaseVNode("div", _hoisted_125, [
                    _cache[64] || (_cache[64] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Predicted Stage Mix", -1)),
                    createBaseVNode("div", _hoisted_126, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (forecastViewType.value = 'line')),
                        class: normalizeClass(['px-3 py-1 text-[11px] font-bold rounded-sm transition-colors shadow-none', forecastViewType.value === 'line' ? 'bg-white shadow-sm text-absa-enrich' : 'text-gray-500 hover:text-gray-700'])
                      }, "Trend", 2),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = $event => (forecastViewType.value = 'bar')),
                        class: normalizeClass(['px-3 py-1 text-[11px] font-bold rounded-sm transition-colors shadow-none', forecastViewType.value === 'bar' ? 'bg-white shadow-sm text-absa-enrich' : 'text-gray-500 hover:text-gray-700'])
                      }, "Distribution", 2)
                    ]),
                    createBaseVNode("div", _hoisted_127, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(FORECAST_HORIZONS, (h) => {
                        return createBaseVNode("span", {
                          key: h,
                          class: normalizeClass(['text-[10px] font-bold px-2 py-0.5 rounded-sm',
                             horizonLoaded(h) ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-700']),
                          title: horizonVersion(h) || ''
                        }, toDisplayString(h) + "d: " + toDisplayString(horizonLoaded(h) ? (horizonVersion(h) || 'model') : 'UNAVAILABLE'), 11, _hoisted_128)
                      }), 64))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_129, [
                    (forecastViewType.value === 'line')
                      ? (openBlock(), createBlock(unref(Line), {
                          key: 0,
                          data: forecastLineChartData.value,
                          options: forecastLineChartOptions
                        }, null, 8, ["data"]))
                      : (openBlock(), createBlock(unref(Bar), {
                          key: 1,
                          data: forecastChartData.value,
                          options: forecastChartOptions
                        }, null, 8, ["data"]))
                  ])
                ]),
                createBaseVNode("div", _hoisted_130, [
                  _cache[67] || (_cache[67] = createBaseVNode("div", { class: "px-4 py-3 border-b border-gray-300 flex items-center justify-between" }, [
                    createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Predicted to deteriorate within 30 days"),
                    createBaseVNode("span", { class: "text-[10px] text-gray-400" }, "30-day prediction later in the lifecycle than the current stage")
                  ], -1)),
                  createBaseVNode("div", _hoisted_131, [
                    createBaseVNode("table", _hoisted_132, [
                      _cache[66] || (_cache[66] = createBaseVNode("thead", { class: "bg-gray-50" }, [
                        createBaseVNode("tr", null, [
                          createBaseVNode("th", { class: "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customer"),
                          createBaseVNode("th", { class: "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Current"),
                          createBaseVNode("th", { class: "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Predicted (30d)"),
                          createBaseVNode("th", { class: "px-3 py-2 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "14d / 90d")
                        ])
                      ], -1)),
                      createBaseVNode("tbody", _hoisted_133, [
                        (!deteriorating.value.length)
                          ? (openBlock(), createElementBlock("tr", _hoisted_134, [...(_cache[65] || (_cache[65] = [
                              createBaseVNode("td", {
                                colspan: "4",
                                class: "p-8 text-center text-xs text-gray-500"
                              }, " No customer is predicted to move to a later stage within 30 days. ", -1)
                            ]))]))
                          : createCommentVNode("", true),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(deteriorating.value, (row) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: row.customer_id
                          }, [
                            createBaseVNode("td", _hoisted_135, toDisplayString(row.customer_id), 1),
                            createBaseVNode("td", _hoisted_136, [
                              createVNode(_sfc_main$2, {
                                state: row.current
                              }, null, 8, ["state"])
                            ]),
                            createBaseVNode("td", _hoisted_137, [
                              createVNode(_sfc_main$2, {
                                state: row.predicted
                              }, null, 8, ["state"]),
                              createBaseVNode("span", _hoisted_138, toDisplayString(Math.round(row.confidence * 100)) + "%", 1)
                            ]),
                            createBaseVNode("td", _hoisted_139, toDisplayString(row.h14 || '—') + " / " + toDisplayString(row.h90 || '—'), 1)
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true)
        ], 64)),
    createVNode(AiCampaignModal, {
      modelValue: showCampaignModal.value,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((showCampaignModal).value = $event)),
      customers: campaignCustomers.value,
      "source-context": "win-back",
      onCampaignLaunched: _cache[4] || (_cache[4] = $event => (selectedWinback.value = new Set()))
    }, null, 8, ["modelValue", "customers"])
  ]))
}
}

};

export { _sfc_main as default };
