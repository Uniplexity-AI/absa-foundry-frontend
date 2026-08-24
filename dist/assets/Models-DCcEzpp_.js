import { V as defineStore, T as axios, U as API_BASE_URL, r as ref, D as computed, h as onMounted, O as watch, o as openBlock, c as createElementBlock, q as createVNode, b as createBaseVNode, F as Fragment, t as toDisplayString, m as createTextVNode, l as createCommentVNode, y as unref, a as createStaticVNode, e as renderList, j as normalizeClass, v as withDirectives, x as vModelText, S as vModelSelect, n as normalizeStyle, R as nextTick } from './index-F0Jaczum.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-qKyxdt4w.js';
import './auto-C5PXEwbF.js';
import { C as Chart } from './chart-zgLQ0LEq.js';

const api = axios.create({ baseURL: API_BASE_URL, timeout: 5000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// ── Store ───────────────────────────────────────────────────────
const useModelsStore = defineStore('models', () => {
  // ── State ──
  const models = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // ── Computed ──
  const championChurn = computed(() =>
    models.value.find((m) => m.type === 'churn' && m.status === 'champion'),
  );
  const championCLV = computed(() =>
    models.value.find((m) => m.type === 'clv' && m.status === 'champion'),
  );
  const modelCount = computed(() => models.value.length);

  // ── Actions ──
  async function fetchModels() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/api/v1/models');
      models.value = (data.models || []).map((m) => ({
        id: m.model_id,
        type: m.type,
        status: m.status,
        metrics: m.metrics || {},
        method: m.method,
      }));
    } catch (e) {
      console.warn('fetchModels failed:', e.message);
      error.value = e.response?.data?.detail || e.message || 'Failed to load models';
      models.value = [];
    } finally {
      loading.value = false;
    }
  }

  return { models, loading, error, championChurn, championCLV, modelCount, fetchModels }
});

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-screen flex flex-col space-y-6"
};
const _hoisted_3 = { class: "grid grid-cols-1 lg:grid-cols-4 gap-4" };
const _hoisted_4 = { class: "space-y-4" };
const _hoisted_5 = { class: "lg:col-span-3" };
const _hoisted_6 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_7 = { class: "flex items-center gap-3 mt-1" };
const _hoisted_8 = { class: "text-headline-md font-headline font-semibold text-absa-enrich" };
const _hoisted_9 = {
  key: 0,
  class: "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded-sm"
};
const _hoisted_10 = { class: "text-body-md text-gray-500 mt-1" };
const _hoisted_11 = { class: "flex border-b border-gray-300 mb-6" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = {
  key: 0,
  class: "ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full"
};
const _hoisted_14 = { class: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_15 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_16 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_17 = {
  key: 0,
  class: "text-[11px] text-gray-500 mt-1"
};
const _hoisted_18 = { class: "flex flex-col lg:flex-row gap-6 mb-6" };
const _hoisted_19 = { class: "flex flex-col gap-4 lg:w-60 flex-shrink-0" };
const _hoisted_20 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]" };
const _hoisted_21 = { class: "text-2xl font-bold text-absa-enrich font-mono mb-1" };
const _hoisted_22 = { class: "h-8 w-full relative" };
const _hoisted_23 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]" };
const _hoisted_24 = { class: "text-2xl font-bold text-absa-enrich font-mono mb-1" };
const _hoisted_25 = { class: "h-8 w-full relative" };
const _hoisted_26 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[120px]" };
const _hoisted_27 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_28 = { class: "flex-grow p-5 rounded-sm border border-gray-300" };
const _hoisted_29 = { class: "relative w-full h-[300px]" };
const _hoisted_30 = {
  key: 0,
  class: "mb-6 rounded-sm border border-absa-passion/30 bg-red-50 p-4"
};
const _hoisted_31 = { class: "text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-2 flex items-center gap-2" };
const _hoisted_32 = { class: "space-y-1" };
const _hoisted_33 = { class: "font-mono font-semibold text-absa-enrich" };
const _hoisted_34 = { class: "ml-auto text-[11px] text-gray-400" };
const _hoisted_35 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_36 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_37 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_38 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_39 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_40 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_41 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_42 = { class: "grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6" };
const _hoisted_43 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_44 = { class: "p-4 border-b border-gray-200" };
const _hoisted_45 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_46 = { class: "p-6" };
const _hoisted_47 = { class: "flex items-center gap-4 mb-6" };
const _hoisted_48 = { class: "font-mono text-sm font-bold text-absa-enrich w-12 text-right" };
const _hoisted_49 = { class: "grid grid-cols-2 gap-2 max-w-xs mx-auto" };
const _hoisted_50 = { class: "rounded-sm p-4 text-center bg-green-50 border border-green-200" };
const _hoisted_51 = { class: "text-3xl font-bold text-absa-enrich font-mono" };
const _hoisted_52 = { class: "rounded-sm p-4 text-center bg-red-50 border border-absa-passion/30" };
const _hoisted_53 = { class: "text-3xl font-bold text-absa-inspire font-mono" };
const _hoisted_54 = { class: "rounded-sm p-4 text-center bg-amber-50 border border-amber-200" };
const _hoisted_55 = { class: "text-3xl font-bold text-amber-700 font-mono" };
const _hoisted_56 = { class: "rounded-sm p-4 text-center bg-green-50 border border-green-200" };
const _hoisted_57 = { class: "text-3xl font-bold text-green-700 font-mono" };
const _hoisted_58 = { class: "grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-200" };
const _hoisted_59 = { class: "text-center" };
const _hoisted_60 = { class: "text-lg font-bold text-absa-enrich font-mono mt-1" };
const _hoisted_61 = { class: "text-center" };
const _hoisted_62 = { class: "text-lg font-bold text-absa-enrich font-mono mt-1" };
const _hoisted_63 = { class: "text-center" };
const _hoisted_64 = { class: "text-lg font-bold text-absa-enrich font-mono mt-1" };
const _hoisted_65 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_66 = { class: "w-full text-left" };
const _hoisted_67 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_68 = { class: "px-4 py-3 font-semibold text-absa-enrich" };
const _hoisted_69 = { class: "px-4 py-3 text-gray-600 font-mono text-xs" };
const _hoisted_70 = { class: "px-4 py-3 font-mono text-xs font-bold" };
const _hoisted_71 = { class: "px-4 py-3 font-mono text-xs" };
const _hoisted_72 = { class: "px-4 py-3" };
const _hoisted_73 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_74 = { class: "p-5" };
const _hoisted_75 = { class: "overflow-x-auto" };
const _hoisted_76 = { class: "w-full text-left" };
const _hoisted_77 = { class: "divide-y divide-gray-100 text-sm font-mono" };
const _hoisted_78 = { class: "px-3 py-3 text-gray-700" };
const _hoisted_79 = { class: "px-3 py-3 text-gray-700" };
const _hoisted_80 = { class: "px-3 py-3 font-bold text-absa-enrich" };
const _hoisted_81 = { class: "px-3 py-3 text-gray-600" };
const _hoisted_82 = { class: "px-3 py-3" };
const _hoisted_83 = {
  key: 0,
  class: "inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-sm"
};
const _hoisted_84 = { class: "grid grid-cols-3 gap-4 mb-6" };
const _hoisted_85 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_86 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_87 = { class: "border border-gray-300 rounded-sm overflow-hidden mb-6" };
const _hoisted_88 = { class: "overflow-x-auto table-container" };
const _hoisted_89 = { class: "w-full text-left border-collapse" };
const _hoisted_90 = { class: "text-sm divide-y divide-gray-100" };
const _hoisted_91 = { key: 0 };
const _hoisted_92 = { class: "px-5 py-3 font-medium text-absa-enrich" };
const _hoisted_93 = { class: "flex items-center gap-2" };
const _hoisted_94 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_95 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_96 = { class: "px-4 py-3" };
const _hoisted_97 = { class: "flex items-center gap-0.5 w-24" };
const _hoisted_98 = { class: "px-4 py-3" };
const _hoisted_99 = { class: "grid grid-cols-1 xl:grid-cols-3 gap-6" };
const _hoisted_100 = { class: "xl:col-span-2 border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_101 = { class: "divide-y divide-gray-100" };
const _hoisted_102 = { class: "text-[11px] font-bold text-gray-400 uppercase tracking-wider w-52 flex-shrink-0 pt-0.5" };
const _hoisted_103 = { class: "text-sm text-absa-enrich font-mono" };
const _hoisted_104 = { class: "flex flex-col gap-4" };
const _hoisted_105 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_106 = { class: "p-4 space-y-3" };
const _hoisted_107 = { class: "flex flex-col items-center mt-1" };
const _hoisted_108 = {
  key: 0,
  class: "fa-solid fa-check text-[8px]"
};
const _hoisted_109 = {
  key: 1,
  class: "fa-solid fa-circle text-[6px]"
};
const _hoisted_110 = {
  key: 0,
  class: "w-px h-6 bg-gray-200 mt-1"
};
const _hoisted_111 = { class: "pb-2" };
const _hoisted_112 = { class: "text-[11px] text-gray-500" };
const _hoisted_113 = { class: "border border-gray-300 rounded-sm overflow-hidden mt-6" };
const _hoisted_114 = { class: "w-full text-left" };
const _hoisted_115 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_116 = { class: "px-5 py-3 font-mono text-xs text-gray-500" };
const _hoisted_117 = { class: "px-4 py-3 font-semibold text-absa-enrich text-xs" };
const _hoisted_118 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_119 = { class: "px-4 py-3 font-mono text-xs font-bold" };
const _hoisted_120 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_121 = { class: "px-4 py-3" };
const _hoisted_122 = {
  key: 4,
  class: "border border-gray-300 rounded-sm overflow-hidden"
};
const _hoisted_123 = { class: "p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" };
const _hoisted_124 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_125 = { class: "flex items-center gap-3" };
const _hoisted_126 = { class: "overflow-x-auto table-container" };
const _hoisted_127 = { class: "w-full text-left border-collapse whitespace-nowrap" };
const _hoisted_128 = { class: "text-sm divide-y divide-gray-100 font-mono" };
const _hoisted_129 = { key: 0 };
const _hoisted_130 = { class: "px-5 py-3 text-gray-500 text-xs" };
const _hoisted_131 = { class: "px-4 py-3 text-absa-passion text-xs font-semibold" };
const _hoisted_132 = { class: "px-4 py-3 text-gray-700 text-xs" };
const _hoisted_133 = { class: "px-4 py-3 text-xs" };
const _hoisted_134 = { class: "flex items-center gap-2" };
const _hoisted_135 = { class: "w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_136 = { class: "font-bold text-absa-enrich" };
const _hoisted_137 = { class: "px-4 py-3 text-xs" };
const _hoisted_138 = { class: "px-4 py-3 text-gray-500 text-xs" };
const _hoisted_139 = { class: "p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500" };
const _hoisted_140 = { class: "border border-gray-300 rounded-sm overflow-hidden mb-6" };
const _hoisted_141 = { class: "p-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_142 = {
  key: 0,
  class: "inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-absa-passion rounded-sm text-xs font-bold"
};
const _hoisted_143 = {
  key: 1,
  class: "text-xs font-semibold text-green-600"
};
const _hoisted_144 = {
  key: 0,
  class: "p-8 text-center text-gray-500 text-sm"
};
const _hoisted_145 = {
  key: 1,
  class: "w-full text-left"
};
const _hoisted_146 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_147 = { class: "px-5 py-3" };
const _hoisted_148 = { class: "px-4 py-3 font-mono text-xs font-semibold text-absa-enrich" };
const _hoisted_149 = { class: "px-4 py-3 text-xs text-gray-700" };
const _hoisted_150 = { class: "px-4 py-3 font-mono text-xs font-bold text-absa-passion" };
const _hoisted_151 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_152 = { class: "px-4 py-3 text-xs text-gray-500" };
const _hoisted_153 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_154 = { class: "w-full text-left" };
const _hoisted_155 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_156 = { class: "px-5 py-3 font-mono text-xs font-semibold text-absa-enrich" };
const _hoisted_157 = { class: "px-4 py-3 text-xs text-gray-700" };
const _hoisted_158 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_159 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_160 = { class: "px-4 py-3 text-xs text-green-600 font-semibold" };

const lastEvaluatedDate = '2025-10-24';
const lastDriftScan = '2025-10-24';


const _sfc_main = {
  __name: 'Models',
  setup(__props) {

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const modelsStore = useModelsStore();
const loading = ref(true);
const activeTab = ref('overview');

// Raw backend data
const performanceHistory = ref([]);
const featureDriftList = ref([]);
const predictionLogs = ref([]);
const predictionTotal = ref(0);

// ── Tab definitions ──
const tabs = computed(() => [
  { id: 'overview',    label: 'Overview',         icon: 'fa-gauge-high' },
  { id: 'performance', label: 'Performance',       icon: 'fa-chart-line' },
  { id: 'drift',       label: 'Drift & Stability', icon: 'fa-arrows-left-right' },
  { id: 'governance',  label: 'Governance',        icon: 'fa-file-shield' },
  { id: 'logs',        label: 'Prediction Logs',   icon: 'fa-list-ul' },
  { id: 'alerts',      label: 'Alerts',            icon: 'fa-bell', badge: activeAlerts.value.length || null },
]);

// ── Static / derived data ──
const activeAlerts = ref([
  {
    id: 1, severity: 'CRITICAL', severityClass: 'bg-red-100 text-absa-passion',
    feature: 'tenure_months', message: 'PSI exceeded CRITICAL threshold (0.25)',
    currentValue: '0.31', threshold: '0.25', since: '3 days ago',
  },
  {
    id: 2, severity: 'WARNING', severityClass: 'bg-amber-100 text-amber-700',
    feature: 'avg_monthly_balance', message: 'PSI exceeded WARNING threshold (0.10)',
    currentValue: '0.18', threshold: '0.10', since: '1 day ago',
  },
]);

const resolvedAlerts = ref([
  { feature: 'credit_utilization', alert: 'PSI exceeded 0.10 WARNING', triggered: '2025-09-14', resolved: '2025-09-21', resolution: 'Feature distribution normalized post quarter-end' },
  { feature: 'num_products', alert: 'AUC-ROC drop below 0.80 threshold', triggered: '2025-08-02', resolved: '2025-08-10', resolution: 'Model retrained on extended dataset — v1.3.0 deployed' },
]);

// ── Model Details ──
const modelDetails = computed(() => {
  const m = modelsStore.championChurn;
  return { name: m?.id || 'churn_lgbm_v1.4.2', status: m?.status || 'ACTIVE' }
});

// ── Overview KPIs ──
const modelMetrics = computed(() => {
  const m = modelsStore.championChurn;
  const metrics = m?.metrics || {};
  return {
    aucRoc: { value: metrics.auc != null ? (metrics.auc * 100).toFixed(1) + '%' : '87.4%' },
    logLoss: { value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '0.2841' },
    brier: { value: metrics.brier != null ? metrics.brier.toFixed(4) : '0.1193' },
  }
});

const overviewKpis = computed(() => [
  { label: 'AUC-ROC',     value: modelMetrics.value.aucRoc.value, note: 'Discrimination power' },
  { label: 'Log Loss',    value: modelMetrics.value.logLoss.value, note: 'Lower is better' },
  { label: 'Brier Score', value: modelMetrics.value.brier.value, note: 'Calibration quality' },
  { label: 'KS Stat',     value: '0.412', note: 'Separation strength' },
  { label: 'F1 Score',    value: '0.741', note: 'At threshold 0.45' },
  { label: 'Model Ver.',  value: 'v1.4.2', note: 'Champion · LightGBM' },
]);

const driftingFeatureCount = computed(() =>
  featureDriftList.value.filter(f => parseFloat(f.score) > 0.20).length || 2
);

const avgLatency = computed(() => {
  if (!predictionLogs.value.length) return '—'
  const vals = predictionLogs.value.map(p => parseFloat(p.latency));
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
  return avg.toFixed(1) + 'ms'
});

// ── Confusion Matrix with threshold slider ──
const threshold = ref(0.45);
const confusionMatrix = computed(() => {
  const t = threshold.value;
  return {
    tn: Math.round(3200 + (t - 0.45) * 2000),
    fp: Math.round(800  - (t - 0.45) * 2000),
    fn: Math.round(420  + (t - 0.45) * 800),
    tp: Math.round(1180 - (t - 0.45) * 800),
  }
});
const derivedMetrics = computed(() => {
  const { tp, fp, fn } = confusionMatrix.value;
  const p = tp + fp > 0 ? (tp / (tp + fp)).toFixed(2) : '—';
  const r = tp + fn > 0 ? (tp / (tp + fn)).toFixed(2) : '—';
  const pf = parseFloat(p), rf = parseFloat(r);
  const f1 = (pf + rf > 0) ? ((2 * pf * rf) / (pf + rf)).toFixed(2) : '—';
  return { precision: p, recall: r, f1 }
});

// ── Segment Performance ──
const segmentPerformance = ref([
  { name: 'Retail Savings',      customers: '124,440', auc: '0.891', f1: '0.762', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
  { name: 'Business Current',    customers: '38,210',  auc: '0.854', f1: '0.701', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
  { name: 'Wealth Management',   customers: '12,090',  auc: '0.821', f1: '0.680', status: 'MONITOR', statusClass: 'bg-amber-100 text-amber-700',  dotClass: 'bg-amber-500' },
  { name: 'Youth (18–25)',       customers: '29,770',  auc: '0.799', f1: '0.634', status: 'REVIEW',  statusClass: 'bg-red-100 text-absa-passion',  dotClass: 'bg-absa-passion' },
  { name: 'Premier Banking',     customers: '8,540',   auc: '0.876', f1: '0.731', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
]);

// ── Threshold Table ──
const thresholdTable = ref([
  { threshold: '0.30', precision: '0.61', recall: '0.94', f1: '0.74', fpRate: '0.28', cost: 'R 4.2M / month', recommended: false },
  { threshold: '0.40', precision: '0.71', recall: '0.87', f1: '0.78', fpRate: '0.18', cost: 'R 2.9M / month', recommended: false },
  { threshold: '0.45', precision: '0.76', recall: '0.81', f1: '0.78', fpRate: '0.14', cost: 'R 2.4M / month', recommended: true  },
  { threshold: '0.50', precision: '0.82', recall: '0.74', f1: '0.78', fpRate: '0.10', cost: 'R 1.8M / month', recommended: false },
  { threshold: '0.60', precision: '0.89', recall: '0.61', f1: '0.72', fpRate: '0.06', cost: 'R 1.1M / month', recommended: false },
]);

// ── Drift Table enriched rows ──
const driftTableRows = computed(() => {
  const staticRows = [
    { name: 'tenure_months',        trainMean: '42.3', currentMean: '38.1', delta: -4.2, score: '0.31', status: 'CRITICAL', invertShift: false },
    { name: 'avg_monthly_balance',  trainMean: '8240', currentMean: '7910', delta: -330, score: '0.18', status: 'WARNING',  invertShift: false },
    { name: 'num_products',         trainMean: '2.4',  currentMean: '2.5',  delta: 0.1,  score: '0.07', status: 'STABLE',   invertShift: false },
    { name: 'credit_utilization',   trainMean: '0.42', currentMean: '0.44', delta: 0.02, score: '0.05', status: 'STABLE',   invertShift: true  },
    { name: 'last_contact_days',    trainMean: '18.2', currentMean: '21.0', delta: 2.8,  score: '0.12', status: 'WARNING',  invertShift: false },
    { name: 'transaction_count_90d',trainMean: '34.1', currentMean: '33.8', delta: -0.3, score: '0.03', status: 'STABLE',   invertShift: false },
  ];
  return (featureDriftList.value.length > 0 ? featureDriftList.value.map(f => ({
    name: f.name, trainMean: f.trainMean, currentMean: f.currentMean,
    delta: parseFloat(f.currentMean) - parseFloat(f.trainMean),
    score: f.score, status: f.status, invertShift: f.invertShift,
  })) : staticRows).map(r => ({
    ...r,
    deltaStr: (r.delta >= 0 ? '+' : '') + r.delta.toFixed(r.delta % 1 === 0 ? 0 : 2),
    scoreClass: parseFloat(r.score) > 0.25 ? 'text-absa-inspire' : parseFloat(r.score) > 0.10 ? 'text-amber-600' : 'text-absa-passion',
    badgeClass: r.status === 'CRITICAL' ? 'bg-red-100 text-absa-inspire' : r.status === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion',
    dotClass: r.status === 'CRITICAL' ? 'bg-absa-inspire' : r.status === 'WARNING' ? 'bg-amber-500' : 'bg-absa-passion',
    shiftDir: r.invertShift ? 'left' : 'right',
  }))
});

// ── Governance Data ──
const modelCardFields = ref([
  { label: 'Model ID',           value: 'churn_lgbm_v1.4.2' },
  { label: 'Algorithm',          value: 'LightGBM (Gradient Boosted Trees)' },
  { label: 'Training Cutoff',    value: '2024-06-30' },
  { label: 'Production Date',    value: '2024-09-01' },
  { label: 'Model Owner',        value: 'Data Science – Retail Analytics' },
  { label: 'Risk Owner',         value: 'Chief Risk Officer' },
  { label: 'Validated By',       value: 'Model Risk Management Team' },
  { label: 'Validation Date',    value: '2024-08-15' },
  { label: 'Approval Status',    value: 'APPROVED — In Production' },
  { label: 'Next Review Due',    value: '2025-12-31' },
  { label: 'Regulatory Ref',     value: 'SARB MRM Framework 2023 · SR 11-7' },
  { label: 'Target Variable',    value: 'churn_within_90_days (binary)' },
  { label: 'Features Used',      value: '42 input features (v1.4.x schema)' },
  { label: 'Sampling Strategy',  value: 'Stratified K-fold (k=5) · SMOTE oversampling' },
]);

const approvalSteps = ref([
  { stage: 'Conceptual Approval',   detail: 'Business & Architecture sign-off · Jul 2024', done: true,  active: false },
  { stage: 'Development',           detail: 'churn_lgbm_v1.4.2 built & unit-tested · Aug 2024', done: true,  active: false },
  { stage: 'Independent Validation', detail: 'MRM review completed · Aug 15, 2024', done: true,  active: false },
  { stage: 'Production',            detail: 'Deployed to prod endpoint · Sep 01, 2024', done: false, active: true  },
]);

const auditLog = ref([
  { date: '2024-09-01', event: 'Production Deployment',    version: 'v1.4.2', auc: '87.4%', actor: 'MLOps Team',      status: 'DEPLOYED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-08-15', event: 'MRM Validation Completed', version: 'v1.4.2', auc: '87.4%', actor: 'Risk & MRM',       status: 'APPROVED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-08-10', event: 'Retraining — Feature fix', version: 'v1.4.0', auc: '86.1%', actor: 'DS Retail Analytics', status: 'SUPERSEDED', statusClass: 'bg-gray-100 text-gray-500' },
  { date: '2024-07-20', event: 'Conceptual Approval',      version: 'v1.3.x', auc: '84.9%', actor: 'Architecture Board', status: 'APPROVED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-05-12', event: 'Initial Development',      version: 'v1.0.0', auc: '81.2%', actor: 'Data Science Team', status: 'ARCHIVED',  statusClass: 'bg-gray-100 text-gray-500' },
]);

// ── Enriched Prediction Logs ──
const selectedTimeframe = ref('Last 1 Hour');
const enrichedLogs = computed(() =>
  predictionLogs.value.map(log => {
    const probValue = parseFloat(log.prob) / 100;
    const riskBand  = probValue > 0.70 ? 'HIGH' : probValue > 0.40 ? 'MEDIUM' : 'LOW';
    const riskBandClass = probValue > 0.70 ? 'bg-red-100 text-absa-inspire' : probValue > 0.40 ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion';
    return { ...log, probValue, riskBand, riskBandClass }
  })
);

// ── Chart Refs ──
const sparklineAucCanvas = ref(null);
const sparklineF1Canvas  = ref(null);
const mainChartCanvas    = ref(null);

onMounted(async () => {
  await modelsStore.fetchModels();
  try {
    const [perfRes, driftRes, logRes] = await Promise.all([
      api.get('/api/v1/monitoring/performance-history', { params: { horizon_days: 30 } }),
      api.get('/api/v1/monitoring/feature-drift'),
      api.get('/api/v1/monitoring/prediction-log', { params: { limit: 50 } }),
    ]);
    performanceHistory.value = perfRes.data.history || [];
    featureDriftList.value = (driftRes.data.features || []).map(f => ({
      name: f.name,
      trainMean: f.training_mean.toFixed(1),
      currentMean: f.current_mean.toFixed(1),
      score: f.drift_score.toFixed(2),
      scoreColor: f.drift_score > 0.20 ? 'text-absa-passion font-bold' : 'text-gray-900',
      status: f.status,
      badgeClass: f.status === 'CRITICAL' ? 'bg-red-100 text-absa-inspire' : f.status === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion',
      invertShift: f.invert_shift,
    }));
    predictionLogs.value = (logRes.data.predictions || []).map(p => ({
      timestamp: p.timestamp,
      correlationId: p.correlation_id,
      customerId: p.customer_id,
      prob: (p.churn_probability * 100).toFixed(1) + '%',
      class: p.predicted_class,
      classColor: p.predicted_class === 'CHURN' ? 'text-absa-inspire' : 'text-absa-passion',
      latency: p.latency_ms.toFixed(1),
    }));
    predictionTotal.value = logRes.data.total_predictions || 0;
  } catch (e) {
    console.warn('Models: monitoring fetch failed', e.message);
  }
  loading.value = false;
});

watch(loading, async (val) => {
  if (!val) { await nextTick(); initCharts(); }
});

function initCharts() {
  const sparkOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false, min: 0 } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
    layout: { padding: 0 },
  };
  const history = performanceHistory.value;
  const labels  = history.map(h => h.date);
  const aucData = history.length ? history.map(h => h.auc * 100)
    : [82, 83, 84, 85, 84, 86, 87, 86, 87, 87];
  const logData = history.length ? history.map(h => h.log_loss)
    : [0.31, 0.30, 0.29, 0.29, 0.28, 0.28, 0.28, 0.29, 0.28, 0.28];
  const precData = history.length ? history.map(h => h.precision * 100)
    : [72, 73, 74, 75, 74, 76, 76, 77, 76, 76];
  const recData  = history.length ? history.map(h => h.recall * 100)
    : [80, 81, 82, 82, 83, 82, 83, 83, 82, 81];
  const lbs = labels.length ? labels : Array.from({length:10}, (_,i)=>`D-${10-i}`);

  if (sparklineAucCanvas.value) {
    new Chart(sparklineAucCanvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: aucData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    });
  }
  if (sparklineF1Canvas.value) {
    new Chart(sparklineF1Canvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: logData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    });
  }
  if (mainChartCanvas.value) {
    new Chart(mainChartCanvas.value, {
      type: 'line',
      data: {
        labels: lbs,
        datasets: [
          { label: 'Precision', data: precData, borderColor: '#DC0037', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
          { label: 'Recall',    data: recData,  borderColor: 'rgba(220,0,55,0.35)', borderWidth: 2, borderDash: [4, 4], tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true, grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { display: true, min: 60, max: 100, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 10 }, callback: v => v + '%' } },
        },
        layout: { padding: { top: 10, bottom: 10 } },
      },
    });
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$1, { type: "block" }),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(_sfc_main$1, { type: "kpi" }),
              createVNode(_sfc_main$1, { type: "kpi" }),
              createVNode(_sfc_main$1, { type: "kpi" })
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_sfc_main$1, { type: "block" })
            ])
          ]),
          createVNode(_sfc_main$1, {
            type: "table",
            count: 4
          })
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", null, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Dashboard"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", null, "AI Agents"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Models")
              ], -1)),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("h1", _hoisted_8, toDisplayString(modelDetails.value.name || 'Churn Model'), 1),
                (modelDetails.value.status)
                  ? (openBlock(), createElementBlock("span", _hoisted_9, [
                      _cache[3] || (_cache[3] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" }, null, -1)),
                      createTextVNode(toDisplayString(modelDetails.value.status), 1)
                    ]))
                  : createCommentVNode("", true),
                _cache[4] || (_cache[4] = createBaseVNode("span", { class: "inline-flex items-center px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-sm font-mono" }, "CHAMPION", -1)),
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "inline-flex items-center px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-sm" }, "RISK TIER: HIGH", -1))
              ]),
              createBaseVNode("p", _hoisted_10, toDisplayString(unref(modelsStore).modelCount) + " models in registry · Churn Prediction Pipeline · Last evaluated " + toDisplayString(lastEvaluatedDate), 1)
            ]),
            _cache[7] || (_cache[7] = createStaticVNode("<div class=\"flex items-center gap-3\"><button class=\"px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none\"><i class=\"fa-solid fa-download text-[13px]\"></i> Export MRM Report </button><button class=\"px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors font-label text-sm font-semibold shadow-none\"><i class=\"fa-solid fa-rotate-right text-[13px]\"></i> Request Retrain </button></div>", 1))
          ]),
          createBaseVNode("div", _hoisted_11, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab) => {
              return (openBlock(), createElementBlock("button", {
                key: tab.id,
                onClick: $event => (activeTab.value = tab.id),
                class: normalizeClass(['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold relative',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
              }, [
                createBaseVNode("i", {
                  class: normalizeClass(['fa-solid text-[13px]', tab.icon])
                }, null, 2),
                createTextVNode(" " + toDisplayString(tab.label) + " ", 1),
                (tab.badge)
                  ? (openBlock(), createElementBlock("span", _hoisted_13, toDisplayString(tab.badge), 1))
                  : createCommentVNode("", true)
              ], 10, _hoisted_12))
            }), 128))
          ]),
          (activeTab.value === 'overview')
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(overviewKpis.value, (kpi) => {
                    return (openBlock(), createElementBlock("div", {
                      key: kpi.label,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_15, toDisplayString(kpi.label), 1),
                      createBaseVNode("p", _hoisted_16, toDisplayString(kpi.value), 1),
                      (kpi.note)
                        ? (openBlock(), createElementBlock("p", _hoisted_17, toDisplayString(kpi.note), 1))
                        : createCommentVNode("", true)
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      _cache[8] || (_cache[8] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "AUC-ROC"),
                        createBaseVNode("span", { class: "text-[11px] font-semibold text-green-600 flex items-center gap-1" }, [
                          createBaseVNode("i", { class: "fa-solid fa-arrow-up text-[9px]" }),
                          createTextVNode("+0.3%")
                        ])
                      ], -1)),
                      createBaseVNode("div", _hoisted_21, toDisplayString(modelMetrics.value.aucRoc.value), 1),
                      createBaseVNode("div", _hoisted_22, [
                        createBaseVNode("canvas", {
                          ref_key: "sparklineAucCanvas",
                          ref: sparklineAucCanvas
                        }, null, 512)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_23, [
                      _cache[9] || (_cache[9] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Log Loss"),
                        createBaseVNode("span", { class: "text-[11px] text-gray-400" }, "Lower is better")
                      ], -1)),
                      createBaseVNode("div", _hoisted_24, toDisplayString(modelMetrics.value.logLoss.value), 1),
                      createBaseVNode("div", _hoisted_25, [
                        createBaseVNode("canvas", {
                          ref_key: "sparklineF1Canvas",
                          ref: sparklineF1Canvas
                        }, null, 512)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      _cache[10] || (_cache[10] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Brier Score"),
                        createBaseVNode("span", { class: "text-[11px] text-gray-400" }, "Calibration")
                      ], -1)),
                      createBaseVNode("div", _hoisted_27, toDisplayString(modelMetrics.value.brier.value), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_28, [
                    _cache[11] || (_cache[11] = createStaticVNode("<div class=\"flex justify-between items-center mb-4\"><div><h3 class=\"text-sm font-bold text-absa-enrich\">Performance Over Time (30D)</h3><p class=\"text-[11px] text-gray-500 mt-0.5\">Precision &amp; Recall on hold-out evaluation set</p></div><div class=\"flex items-center gap-4 text-[11px] font-semibold text-gray-600\"><span class=\"flex items-center gap-1.5\"><span class=\"w-3 h-0.5 bg-absa-passion inline-block\"></span>Precision</span><span class=\"flex items-center gap-1.5\"><span class=\"w-3 h-0.5 bg-absa-passion/40 inline-block\"></span>Recall</span></div></div>", 1)),
                    createBaseVNode("div", _hoisted_29, [
                      createBaseVNode("canvas", {
                        ref_key: "mainChartCanvas",
                        ref: mainChartCanvas
                      }, null, 512)
                    ])
                  ])
                ]),
                (activeAlerts.value.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_30, [
                      createBaseVNode("p", _hoisted_31, [
                        _cache[12] || (_cache[12] = createBaseVNode("i", { class: "fa-solid fa-triangle-exclamation" }, null, -1)),
                        createTextVNode(" " + toDisplayString(activeAlerts.value.length) + " Active Alert" + toDisplayString(activeAlerts.value.length > 1 ? 's' : '') + " — Action Required ", 1)
                      ]),
                      createBaseVNode("div", _hoisted_32, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(activeAlerts.value.slice(0,2), (a) => {
                          return (openBlock(), createElementBlock("div", {
                            key: a.id,
                            class: "text-sm text-gray-700 flex items-center gap-2"
                          }, [
                            _cache[13] || (_cache[13] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion flex-shrink-0" }, null, -1)),
                            createBaseVNode("span", _hoisted_33, toDisplayString(a.feature), 1),
                            createBaseVNode("span", null, toDisplayString(a.message), 1),
                            createBaseVNode("span", _hoisted_34, toDisplayString(a.since), 1)
                          ]))
                        }), 128))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = $event => (activeTab.value = 'alerts')),
                        class: "mt-3 text-xs font-bold text-absa-passion hover:underline"
                      }, "View all alerts →")
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_35, [
                  createBaseVNode("div", _hoisted_36, [
                    _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "KS Statistic", -1)),
                    createBaseVNode("p", _hoisted_37, toDisplayString(overviewKpis.value.find(k => k.label === 'KS Stat')?.value || '—'), 1),
                    _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Kolmogorov–Smirnov discrimination power", -1))
                  ]),
                  createBaseVNode("div", _hoisted_38, [
                    _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Features in Drift", -1)),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-2xl font-bold font-mono", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-absa-passion'])
                    }, toDisplayString(driftingFeatureCount.value), 3),
                    createBaseVNode("p", _hoisted_39, "of " + toDisplayString(featureDriftList.value.length) + " features exceeding PSI threshold", 1)
                  ]),
                  createBaseVNode("div", _hoisted_40, [
                    _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Inference Latency", -1)),
                    createBaseVNode("p", _hoisted_41, toDisplayString(avgLatency.value), 1),
                    _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "P95 across last 50 predictions", -1))
                  ])
                ])
              ], 64))
            : (activeTab.value === 'performance')
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_42, [
                    createBaseVNode("div", _hoisted_43, [
                      createBaseVNode("div", _hoisted_44, [
                        _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Confusion Matrix", -1)),
                        createBaseVNode("p", _hoisted_45, "At decision threshold: " + toDisplayString(threshold.value.toFixed(2)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_46, [
                        createBaseVNode("div", _hoisted_47, [
                          _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-24" }, "Threshold", -1)),
                          withDirectives(createBaseVNode("input", {
                            type: "range",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((threshold).value = $event)),
                            min: "0.1",
                            max: "0.9",
                            step: "0.05",
                            class: "flex-grow accent-absa-passion h-1.5 cursor-pointer"
                          }, null, 512), [
                            [vModelText, threshold.value]
                          ]),
                          createBaseVNode("span", _hoisted_48, toDisplayString(threshold.value.toFixed(2)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_49, [
                          createBaseVNode("div", _hoisted_50, [
                            _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1" }, "True Negative", -1)),
                            createBaseVNode("p", _hoisted_51, toDisplayString(confusionMatrix.value.tn), 1),
                            _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-[10px] text-gray-500 mt-1" }, "Correctly predicted \"Retain\"", -1))
                          ]),
                          createBaseVNode("div", _hoisted_52, [
                            _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[10px] font-bold text-absa-inspire uppercase tracking-wider mb-1" }, "False Positive", -1)),
                            createBaseVNode("p", _hoisted_53, toDisplayString(confusionMatrix.value.fp), 1),
                            _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-[10px] text-gray-500 mt-1" }, "Wrongly flagged \"Churn\"", -1))
                          ]),
                          createBaseVNode("div", _hoisted_54, [
                            _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1" }, "False Negative", -1)),
                            createBaseVNode("p", _hoisted_55, toDisplayString(confusionMatrix.value.fn), 1),
                            _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-[10px] text-gray-500 mt-1" }, "Missed churners (risk)", -1))
                          ]),
                          createBaseVNode("div", _hoisted_56, [
                            _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1" }, "True Positive", -1)),
                            createBaseVNode("p", _hoisted_57, toDisplayString(confusionMatrix.value.tp), 1),
                            _cache[28] || (_cache[28] = createBaseVNode("p", { class: "text-[10px] text-gray-500 mt-1" }, "Correctly caught churners", -1))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_58, [
                          createBaseVNode("div", _hoisted_59, [
                            _cache[29] || (_cache[29] = createBaseVNode("p", { class: "text-[10px] text-gray-500 uppercase tracking-wider font-bold" }, "Precision", -1)),
                            createBaseVNode("p", _hoisted_60, toDisplayString(derivedMetrics.value.precision), 1)
                          ]),
                          createBaseVNode("div", _hoisted_61, [
                            _cache[30] || (_cache[30] = createBaseVNode("p", { class: "text-[10px] text-gray-500 uppercase tracking-wider font-bold" }, "Recall", -1)),
                            createBaseVNode("p", _hoisted_62, toDisplayString(derivedMetrics.value.recall), 1)
                          ]),
                          createBaseVNode("div", _hoisted_63, [
                            _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-[10px] text-gray-500 uppercase tracking-wider font-bold" }, "F1 Score", -1)),
                            createBaseVNode("p", _hoisted_64, toDisplayString(derivedMetrics.value.f1), 1)
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_65, [
                      _cache[33] || (_cache[33] = createBaseVNode("div", { class: "p-4 border-b border-gray-200 flex justify-between items-center" }, [
                        createBaseVNode("div", null, [
                          createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Performance by Segment"),
                          createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "AUC-ROC disaggregated by customer segment")
                        ]),
                        createBaseVNode("span", { class: "text-[10px] text-gray-400 font-mono" }, "SARB Fairness Monitoring")
                      ], -1)),
                      createBaseVNode("table", _hoisted_66, [
                        _cache[32] || (_cache[32] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                            createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Customers"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "AUC-ROC"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "F1"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Status")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_67, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(segmentPerformance.value, (seg) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: seg.name,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_68, toDisplayString(seg.name), 1),
                              createBaseVNode("td", _hoisted_69, toDisplayString(seg.customers), 1),
                              createBaseVNode("td", _hoisted_70, toDisplayString(seg.auc), 1),
                              createBaseVNode("td", _hoisted_71, toDisplayString(seg.f1), 1),
                              createBaseVNode("td", _hoisted_72, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', seg.statusClass])
                                }, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(["w-1 h-1 rounded-full", seg.dotClass])
                                  }, null, 2),
                                  createTextVNode(toDisplayString(seg.status), 1)
                                ], 2)
                              ])
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_73, [
                    _cache[36] || (_cache[36] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                      createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Threshold Sensitivity Analysis"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "How Precision, Recall and F1 respond across decision thresholds")
                    ], -1)),
                    createBaseVNode("div", _hoisted_74, [
                      createBaseVNode("div", _hoisted_75, [
                        createBaseVNode("table", _hoisted_76, [
                          _cache[35] || (_cache[35] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "px-3 py-3" }, "Threshold"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "Precision"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "Recall"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "F1 Score"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "FP Rate"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "Estimated Cost (Interventions)"),
                              createBaseVNode("th", { class: "px-3 py-3" }, "Recommended")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_77, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(thresholdTable.value, (row) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: row.threshold,
                                class: normalizeClass(['hover:bg-gray-50 transition-colors', row.recommended ? 'bg-amber-50' : ''])
                              }, [
                                createBaseVNode("td", {
                                  class: normalizeClass(["px-3 py-3 font-bold", row.recommended ? 'text-absa-passion' : 'text-absa-enrich'])
                                }, toDisplayString(row.threshold), 3),
                                createBaseVNode("td", _hoisted_78, toDisplayString(row.precision), 1),
                                createBaseVNode("td", _hoisted_79, toDisplayString(row.recall), 1),
                                createBaseVNode("td", _hoisted_80, toDisplayString(row.f1), 1),
                                createBaseVNode("td", {
                                  class: normalizeClass(["px-3 py-3", parseFloat(row.fpRate) > 0.15 ? 'text-absa-passion font-bold' : 'text-gray-700'])
                                }, toDisplayString(row.fpRate), 3),
                                createBaseVNode("td", _hoisted_81, toDisplayString(row.cost), 1),
                                createBaseVNode("td", _hoisted_82, [
                                  (row.recommended)
                                    ? (openBlock(), createElementBlock("span", _hoisted_83, [...(_cache[34] || (_cache[34] = [
                                        createBaseVNode("i", { class: "fa-solid fa-star text-[9px]" }, null, -1),
                                        createTextVNode(" OPTIMAL ", -1)
                                      ]))]))
                                    : createCommentVNode("", true)
                                ])
                              ], 2))
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
                ], 64))
              : (activeTab.value === 'drift')
                ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    createBaseVNode("div", _hoisted_84, [
                      createBaseVNode("div", _hoisted_85, [
                        _cache[37] || (_cache[37] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Features Monitored", -1)),
                        createBaseVNode("p", _hoisted_86, toDisplayString(featureDriftList.value.length || 12), 1)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["border rounded-sm p-4", driftingFeatureCount.value > 0 ? 'border-absa-inspire/50 bg-red-50' : 'border-gray-300'])
                      }, [
                        createBaseVNode("p", {
                          class: normalizeClass(["text-[11px] font-bold uppercase tracking-wider mb-2", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-gray-500'])
                        }, "Drifting Features (PSI > 0.20)", 2),
                        createBaseVNode("p", {
                          class: normalizeClass(["text-2xl font-bold font-mono", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-absa-passion'])
                        }, toDisplayString(driftingFeatureCount.value), 3)
                      ], 2),
                      createBaseVNode("div", { class: "border border-gray-300 rounded-sm p-4" }, [
                        _cache[38] || (_cache[38] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Last Drift Scan", -1)),
                        createBaseVNode("p", { class: "text-2xl font-bold text-absa-enrich font-mono" }, toDisplayString(lastDriftScan))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_87, [
                      _cache[42] || (_cache[42] = createStaticVNode("<div class=\"p-4 border-b border-gray-200 flex justify-between items-center\"><div><h3 class=\"text-sm font-bold text-absa-enrich\">Feature Drift Monitor (PSI)</h3><p class=\"text-[11px] text-gray-500 mt-0.5\">Population Stability Index — Training vs. Current Inference Distribution</p></div><div class=\"flex items-center gap-2 text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-sm px-3 py-1.5\"><i class=\"fa-solid fa-circle-info text-[11px]\"></i> Threshold: 0.20 PSI (WARNING) · 0.25 (CRITICAL) </div></div>", 1)),
                      createBaseVNode("div", _hoisted_88, [
                        createBaseVNode("table", _hoisted_89, [
                          _cache[41] || (_cache[41] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                              createBaseVNode("th", { class: "px-5 py-3" }, "Feature Name"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Training Mean"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Current Mean"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Δ Mean"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "PSI Score"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Distribution Shift"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Status")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_90, [
                            (featureDriftList.value.length === 0)
                              ? (openBlock(), createElementBlock("tr", _hoisted_91, [...(_cache[39] || (_cache[39] = [
                                  createBaseVNode("td", {
                                    colspan: "7",
                                    class: "p-12 text-center text-gray-500"
                                  }, "No feature drift data available from backend", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(driftTableRows.value, (row, idx) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: idx,
                                class: "hover:bg-gray-50 transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_92, [
                                  createBaseVNode("div", _hoisted_93, [
                                    createBaseVNode("div", {
                                      class: normalizeClass(["w-0.5 h-4 rounded-full", row.scoreClass.includes('passion') ? 'bg-absa-passion' : 'bg-gray-300'])
                                    }, null, 2),
                                    createTextVNode(" " + toDisplayString(row.name), 1)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_94, toDisplayString(row.trainMean), 1),
                                createBaseVNode("td", _hoisted_95, toDisplayString(row.currentMean), 1),
                                createBaseVNode("td", {
                                  class: normalizeClass(["px-4 py-3 font-mono text-xs", row.delta > 0 ? 'text-absa-energy font-semibold' : 'text-gray-600'])
                                }, toDisplayString(row.deltaStr), 3),
                                createBaseVNode("td", {
                                  class: normalizeClass(["px-4 py-3 font-mono text-xs font-bold", row.scoreClass])
                                }, toDisplayString(row.score), 3),
                                createBaseVNode("td", _hoisted_96, [
                                  createBaseVNode("div", _hoisted_97, [
                                    createBaseVNode("div", {
                                      class: normalizeClass(["h-4 flex-1 rounded-sm", row.shiftDir === 'left' ? 'bg-absa-passion/60' : 'bg-gray-200'])
                                    }, null, 2),
                                    _cache[40] || (_cache[40] = createBaseVNode("div", { class: "w-px h-5 bg-gray-400 mx-0.5" }, null, -1)),
                                    createBaseVNode("div", {
                                      class: normalizeClass(["h-4 flex-1 rounded-sm", row.shiftDir === 'right' ? 'bg-absa-passion/60' : 'bg-gray-200'])
                                    }, null, 2)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_98, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', row.badgeClass])
                                  }, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["w-1 h-1 rounded-full", row.dotClass])
                                    }, null, 2),
                                    createTextVNode(toDisplayString(row.status), 1)
                                  ], 2)
                                ])
                              ]))
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    _cache[43] || (_cache[43] = createStaticVNode("<div class=\"border border-l-4 border-l-absa-passion border-gray-300 rounded-sm p-4 bg-white\"><p class=\"text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-1\">PSI Interpretation Guide</p><div class=\"grid grid-cols-3 gap-4 text-xs text-gray-600\"><div><span class=\"font-bold text-green-600\">PSI &lt; 0.10</span> — No significant change. Model is stable.</div><div><span class=\"font-bold text-amber-600\">0.10 ≤ PSI &lt; 0.25</span> — Moderate shift. Investigation recommended.</div><div><span class=\"font-bold text-absa-passion\">PSI ≥ 0.25</span> — Major shift. Retraining or model review required immediately.</div></div></div>", 1))
                  ], 64))
                : (activeTab.value === 'governance')
                  ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                      createBaseVNode("div", _hoisted_99, [
                        createBaseVNode("div", _hoisted_100, [
                          _cache[44] || (_cache[44] = createBaseVNode("div", { class: "p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center" }, [
                            createBaseVNode("div", null, [
                              createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Model Card"),
                              createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "SR 11-7 / SARB MRM Framework compliant documentation")
                            ]),
                            createBaseVNode("span", { class: "text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-sm border border-green-200" }, "APPROVED")
                          ], -1)),
                          createBaseVNode("div", _hoisted_101, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(modelCardFields.value, (field) => {
                              return (openBlock(), createElementBlock("div", {
                                key: field.label,
                                class: "px-5 py-3 flex items-start"
                              }, [
                                createBaseVNode("span", _hoisted_102, toDisplayString(field.label), 1),
                                createBaseVNode("span", _hoisted_103, toDisplayString(field.value), 1)
                              ]))
                            }), 128))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_104, [
                          createBaseVNode("div", _hoisted_105, [
                            _cache[45] || (_cache[45] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                              createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Approval Lifecycle")
                            ], -1)),
                            createBaseVNode("div", _hoisted_106, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(approvalSteps.value, (step) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: step.stage,
                                  class: "flex items-start gap-3"
                                }, [
                                  createBaseVNode("div", _hoisted_107, [
                                    createBaseVNode("div", {
                                      class: normalizeClass(['w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]',
                      step.done ? 'bg-absa-passion text-white' : step.active ? 'bg-absa-energy text-white' : 'bg-gray-200 text-gray-400'])
                                    }, [
                                      (step.done)
                                        ? (openBlock(), createElementBlock("i", _hoisted_108))
                                        : (step.active)
                                          ? (openBlock(), createElementBlock("i", _hoisted_109))
                                          : createCommentVNode("", true)
                                    ], 2),
                                    (step.stage !== 'Production')
                                      ? (openBlock(), createElementBlock("div", _hoisted_110))
                                      : createCommentVNode("", true)
                                  ]),
                                  createBaseVNode("div", _hoisted_111, [
                                    createBaseVNode("p", {
                                      class: normalizeClass(["text-xs font-bold", step.done ? 'text-absa-passion' : step.active ? 'text-absa-energy' : 'text-gray-400'])
                                    }, toDisplayString(step.stage), 3),
                                    createBaseVNode("p", _hoisted_112, toDisplayString(step.detail), 1)
                                  ])
                                ]))
                              }), 128))
                            ])
                          ]),
                          _cache[46] || (_cache[46] = createStaticVNode("<div class=\"border border-amber-200 bg-amber-50 rounded-sm p-4\"><p class=\"text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-3\">Risk Classification</p><div class=\"space-y-2 text-xs\"><div class=\"flex justify-between\"><span class=\"text-gray-600\">Model Risk Tier</span><span class=\"font-bold text-amber-700\">HIGH</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Next Validation Due</span><span class=\"font-bold text-absa-enrich\">2025-12-31</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Annual Review</span><span class=\"font-bold text-green-600\">Completed</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Materiality</span><span class=\"font-bold text-amber-700\">HIGH</span></div></div></div>", 1))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_113, [
                        _cache[48] || (_cache[48] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                          createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Model Change & Validation Log"),
                          createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Immutable audit trail of all model events")
                        ], -1)),
                        createBaseVNode("table", _hoisted_114, [
                          _cache[47] || (_cache[47] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                              createBaseVNode("th", { class: "px-5 py-3" }, "Date"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Event"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Version"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "AUC-ROC"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Actioned By"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Status")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_115, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(auditLog.value, (row) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: row.date,
                                class: "hover:bg-gray-50 transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_116, toDisplayString(row.date), 1),
                                createBaseVNode("td", _hoisted_117, toDisplayString(row.event), 1),
                                createBaseVNode("td", _hoisted_118, toDisplayString(row.version), 1),
                                createBaseVNode("td", _hoisted_119, toDisplayString(row.auc), 1),
                                createBaseVNode("td", _hoisted_120, toDisplayString(row.actor), 1),
                                createBaseVNode("td", _hoisted_121, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', row.statusClass])
                                  }, toDisplayString(row.status), 3)
                                ])
                              ]))
                            }), 128))
                          ])
                        ])
                      ])
                    ], 64))
                  : (activeTab.value === 'logs')
                    ? (openBlock(), createElementBlock("div", _hoisted_122, [
                        createBaseVNode("div", _hoisted_123, [
                          createBaseVNode("div", null, [
                            _cache[49] || (_cache[49] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Live Prediction Log", -1)),
                            createBaseVNode("p", _hoisted_124, "Real-time inference stream from production endpoint · " + toDisplayString(predictionTotal.value.toLocaleString()) + " total predictions", 1)
                          ]),
                          createBaseVNode("div", _hoisted_125, [
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((selectedTimeframe).value = $event)),
                              class: "appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-absa-passion cursor-pointer"
                            }, [...(_cache[50] || (_cache[50] = [
                              createBaseVNode("option", null, "Last 1 Hour", -1),
                              createBaseVNode("option", null, "Last 24 Hours", -1),
                              createBaseVNode("option", null, "Last 7 Days", -1)
                            ]))], 512), [
                              [vModelSelect, selectedTimeframe.value]
                            ]),
                            _cache[51] || (_cache[51] = createBaseVNode("button", { class: "px-3 py-1.5 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 text-xs font-semibold hover:bg-gray-50" }, [
                              createBaseVNode("i", { class: "fa-solid fa-download text-[11px]" }),
                              createTextVNode(" Export ")
                            ], -1))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_126, [
                          createBaseVNode("table", _hoisted_127, [
                            _cache[53] || (_cache[53] = createBaseVNode("thead", null, [
                              createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                                createBaseVNode("th", { class: "px-5 py-3" }, "Timestamp"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Correlation ID"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Customer ID"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Churn Prob"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Risk Band"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Classification"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Latency")
                              ])
                            ], -1)),
                            createBaseVNode("tbody", _hoisted_128, [
                              (predictionLogs.value.length === 0)
                                ? (openBlock(), createElementBlock("tr", _hoisted_129, [...(_cache[52] || (_cache[52] = [
                                    createBaseVNode("td", {
                                      colspan: "7",
                                      class: "p-12 text-center text-gray-500 font-sans"
                                    }, "No prediction logs available", -1)
                                  ]))]))
                                : createCommentVNode("", true),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(enrichedLogs.value, (log, idx) => {
                                return (openBlock(), createElementBlock("tr", {
                                  key: idx,
                                  class: "hover:bg-gray-50 transition-colors"
                                }, [
                                  createBaseVNode("td", _hoisted_130, toDisplayString(log.timestamp), 1),
                                  createBaseVNode("td", _hoisted_131, toDisplayString(log.correlationId), 1),
                                  createBaseVNode("td", _hoisted_132, toDisplayString(log.customerId), 1),
                                  createBaseVNode("td", _hoisted_133, [
                                    createBaseVNode("div", _hoisted_134, [
                                      createBaseVNode("div", _hoisted_135, [
                                        createBaseVNode("div", {
                                          class: normalizeClass(["h-full rounded-full", log.probValue > 0.6 ? 'bg-absa-inspire' : log.probValue > 0.3 ? 'bg-absa-energy' : 'bg-absa-passion']),
                                          style: normalizeStyle({width: (log.probValue*100)+'%'})
                                        }, null, 6)
                                      ]),
                                      createBaseVNode("span", _hoisted_136, toDisplayString(log.prob), 1)
                                    ])
                                  ]),
                                  createBaseVNode("td", _hoisted_137, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(['px-2 py-0.5 rounded-sm font-bold text-[10px]', log.riskBandClass])
                                    }, toDisplayString(log.riskBand), 3)
                                  ]),
                                  createBaseVNode("td", {
                                    class: normalizeClass(["px-4 py-3 font-bold font-sans text-xs", log.classColor])
                                  }, toDisplayString(log.class), 3),
                                  createBaseVNode("td", _hoisted_138, toDisplayString(log.latency), 1)
                                ]))
                              }), 128))
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_139, [
                          createBaseVNode("span", null, "Showing latest 50 of " + toDisplayString(predictionTotal.value.toLocaleString()) + " predictions", 1),
                          _cache[54] || (_cache[54] = createStaticVNode("<div class=\"flex items-center gap-2\"><button class=\"w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center\"><i class=\"fa-solid fa-chevron-left text-[10px]\"></i></button><button class=\"w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center\"><i class=\"fa-solid fa-chevron-right text-[10px]\"></i></button></div>", 1))
                        ])
                      ]))
                    : (activeTab.value === 'alerts')
                      ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                          createBaseVNode("div", _hoisted_140, [
                            createBaseVNode("div", _hoisted_141, [
                              _cache[56] || (_cache[56] = createBaseVNode("div", null, [
                                createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Active Alerts"),
                                createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Requires action from model owner or risk team")
                              ], -1)),
                              (activeAlerts.value.length > 0)
                                ? (openBlock(), createElementBlock("span", _hoisted_142, [
                                    _cache[55] || (_cache[55] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse" }, null, -1)),
                                    createTextVNode(toDisplayString(activeAlerts.value.length) + " Active ", 1)
                                  ]))
                                : (openBlock(), createElementBlock("span", _hoisted_143, "All clear"))
                            ]),
                            (activeAlerts.value.length === 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_144, [...(_cache[57] || (_cache[57] = [
                                  createBaseVNode("i", { class: "fa-solid fa-shield-check text-2xl text-green-500 mb-2" }, null, -1),
                                  createBaseVNode("p", null, "No active alerts. Model is operating within thresholds.", -1)
                                ]))]))
                              : (openBlock(), createElementBlock("table", _hoisted_145, [
                                  _cache[59] || (_cache[59] = createBaseVNode("thead", null, [
                                    createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                                      createBaseVNode("th", { class: "px-5 py-3" }, "Severity"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Feature / Metric"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Alert"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Value"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Threshold"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Since"),
                                      createBaseVNode("th", { class: "px-4 py-3" }, "Action")
                                    ])
                                  ], -1)),
                                  createBaseVNode("tbody", _hoisted_146, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(activeAlerts.value, (alert) => {
                                      return (openBlock(), createElementBlock("tr", {
                                        key: alert.id,
                                        class: "hover:bg-gray-50"
                                      }, [
                                        createBaseVNode("td", _hoisted_147, [
                                          createBaseVNode("span", {
                                            class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', alert.severityClass])
                                          }, toDisplayString(alert.severity), 3)
                                        ]),
                                        createBaseVNode("td", _hoisted_148, toDisplayString(alert.feature), 1),
                                        createBaseVNode("td", _hoisted_149, toDisplayString(alert.message), 1),
                                        createBaseVNode("td", _hoisted_150, toDisplayString(alert.currentValue), 1),
                                        createBaseVNode("td", _hoisted_151, toDisplayString(alert.threshold), 1),
                                        createBaseVNode("td", _hoisted_152, toDisplayString(alert.since), 1),
                                        _cache[58] || (_cache[58] = createBaseVNode("td", { class: "px-4 py-3" }, [
                                          createBaseVNode("button", { class: "text-xs font-semibold text-absa-passion border border-absa-passion/30 px-2 py-0.5 rounded-sm hover:bg-red-50 transition-colors" }, "Investigate")
                                        ], -1))
                                      ]))
                                    }), 128))
                                  ])
                                ]))
                          ]),
                          createBaseVNode("div", _hoisted_153, [
                            _cache[61] || (_cache[61] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                              createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Resolved Alert History")
                            ], -1)),
                            createBaseVNode("table", _hoisted_154, [
                              _cache[60] || (_cache[60] = createBaseVNode("thead", null, [
                                createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                                  createBaseVNode("th", { class: "px-5 py-3" }, "Feature"),
                                  createBaseVNode("th", { class: "px-4 py-3" }, "Alert"),
                                  createBaseVNode("th", { class: "px-4 py-3" }, "Triggered"),
                                  createBaseVNode("th", { class: "px-4 py-3" }, "Resolved"),
                                  createBaseVNode("th", { class: "px-4 py-3" }, "Resolution")
                                ])
                              ], -1)),
                              createBaseVNode("tbody", _hoisted_155, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(resolvedAlerts.value, (row) => {
                                  return (openBlock(), createElementBlock("tr", {
                                    key: row.feature + row.triggered,
                                    class: "hover:bg-gray-50 transition-colors"
                                  }, [
                                    createBaseVNode("td", _hoisted_156, toDisplayString(row.feature), 1),
                                    createBaseVNode("td", _hoisted_157, toDisplayString(row.alert), 1),
                                    createBaseVNode("td", _hoisted_158, toDisplayString(row.triggered), 1),
                                    createBaseVNode("td", _hoisted_159, toDisplayString(row.resolved), 1),
                                    createBaseVNode("td", _hoisted_160, toDisplayString(row.resolution), 1)
                                  ]))
                                }), 128))
                              ])
                            ])
                          ])
                        ], 64))
                      : createCommentVNode("", true)
        ], 64))
  ]))
}
}

};

export { _sfc_main as default };
