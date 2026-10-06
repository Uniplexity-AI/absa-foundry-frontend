import { U as authFetch, R as API_BASE_URL, Q as axios, r as ref, f as onMounted, i as computed, M as watch, c as createElementBlock, q as createVNode, b as createBaseVNode, F as Fragment, t as toDisplayString, A as createTextVNode, j as createCommentVNode, s as unref, h as normalizeClass, e as renderList, a as createStaticVNode, x as withDirectives, y as vModelText, L as vModelSelect, J as decodeJWT, o as openBlock, N as vModelCheckbox, n as normalizeStyle, P as nextTick } from './index-DJKk8LB7.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-bWdyoVUx.js';
import { u as useModelsStore } from './modelsStore-Dm3GUOX4.js';
import { u as useIntelligenceStore } from './intelligenceStore-Jm86VdwS.js';
import './auto-c3br2bSj.js';
import { C as Chart } from './chart-D1QGMS6v.js';
import './snapshotStore-DZ2CngMb.js';

async function _handleRes(res) {
  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = null; }
  }
  if (!res.ok) {
    const err = new Error(data?.detail || data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err
  }
  return data
}

async function fetchChampion() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/champion`);
  return _handleRes(res)
}



async function fetchFeatures() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/features`);
  return _handleRes(res)
}

async function simulateCalibration(threshold) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/simulate-calibration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ threshold })
  });
  return _handleRes(res)
}

async function fetchModelComparison() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/compare`);
  return _handleRes(res)
}

async function fetchAuditLogs() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/audit`);
  return _handleRes(res)
}

async function simulatePrediction(payload) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/predictions/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return _handleRes(res)
}

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
  class: "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-brand-soft-success text-status-success rounded-sm"
};
const _hoisted_10 = { class: "text-body-md text-gray-500 mt-1" };
const _hoisted_11 = { class: "flex items-center gap-3" };
const _hoisted_12 = ["disabled"];
const _hoisted_13 = {
  key: 0,
  class: "fa-solid fa-spinner fa-spin text-[13px]"
};
const _hoisted_14 = {
  key: 1,
  class: "fa-solid fa-rotate-right text-[13px]"
};
const _hoisted_15 = {
  key: 0,
  class: "fa-solid fa-spinner fa-spin"
};
const _hoisted_16 = {
  key: 1,
  class: "fa-solid fa-circle-exclamation"
};
const _hoisted_17 = { key: 2 };
const _hoisted_18 = { key: 3 };
const _hoisted_19 = { class: "flex border-b border-gray-300 mb-6" };
const _hoisted_20 = ["onClick"];
const _hoisted_21 = {
  key: 0,
  class: "ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full"
};
const _hoisted_22 = { class: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_23 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_24 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_25 = {
  key: 0,
  class: "text-[11px] text-gray-500 mt-1"
};
const _hoisted_26 = { class: "flex flex-col lg:flex-row gap-6 mb-6" };
const _hoisted_27 = { class: "flex flex-col gap-4 lg:w-60 flex-shrink-0" };
const _hoisted_28 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]" };
const _hoisted_29 = { class: "text-2xl font-bold text-absa-enrich font-mono mb-1" };
const _hoisted_30 = { class: "h-8 w-full relative" };
const _hoisted_31 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]" };
const _hoisted_32 = { class: "text-2xl font-bold text-absa-enrich font-mono mb-1" };
const _hoisted_33 = { class: "h-8 w-full relative" };
const _hoisted_34 = { class: "p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[120px]" };
const _hoisted_35 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_36 = { class: "flex-grow p-5 rounded-sm border border-gray-300" };
const _hoisted_37 = { class: "relative w-full h-[300px]" };
const _hoisted_38 = {
  key: 0,
  class: "mb-6 rounded-sm border border-absa-passion/30 bg-absa-passion/10 p-4"
};
const _hoisted_39 = { class: "text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-2 flex items-center gap-2" };
const _hoisted_40 = { class: "space-y-1" };
const _hoisted_41 = { class: "font-mono font-semibold text-absa-enrich" };
const _hoisted_42 = { class: "ml-auto text-[11px] text-gray-400" };
const _hoisted_43 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_44 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_45 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_46 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_47 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_48 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_49 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_50 = {
  key: 2,
  class: "border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white"
};
const _hoisted_51 = { class: "mb-8" };
const _hoisted_52 = { class: "block text-sm font-bold text-gray-700 mb-2" };
const _hoisted_53 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_54 = { class: "border border-gray-200 rounded p-4 text-center bg-gray-50" };
const _hoisted_55 = { class: "text-2xl font-mono text-status-success mt-1" };
const _hoisted_56 = { class: "border border-gray-200 rounded p-4 text-center bg-gray-50" };
const _hoisted_57 = { class: "text-2xl font-mono text-status-warning mt-1" };
const _hoisted_58 = { class: "border border-gray-200 rounded p-4 text-center bg-gray-50" };
const _hoisted_59 = { class: "text-2xl font-mono text-status-success mt-1" };
const _hoisted_60 = { class: "border border-gray-200 rounded p-4 text-center bg-gray-50" };
const _hoisted_61 = { class: "text-2xl font-mono text-status-warning mt-1" };
const _hoisted_62 = { class: "flex justify-end gap-3" };
const _hoisted_63 = ["disabled"];
const _hoisted_64 = {
  key: 3,
  class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
};
const _hoisted_65 = { class: "border border-gray-300 rounded-sm p-6 bg-white" };
const _hoisted_66 = { class: "space-y-4 mb-6" };
const _hoisted_67 = { class: "block text-xs font-bold text-gray-700 mb-1" };
const _hoisted_68 = ["onUpdate:modelValue"];
const _hoisted_69 = { class: "border border-gray-300 rounded-sm p-6 bg-gray-50" };
const _hoisted_70 = {
  key: 0,
  class: "space-y-6"
};
const _hoisted_71 = { class: "flex justify-between items-center border-b border-gray-200 pb-4" };
const _hoisted_72 = { class: "flex justify-between items-center border-b border-gray-200 pb-4" };
const _hoisted_73 = { class: "flex justify-between items-center" };
const _hoisted_74 = {
  key: 1,
  class: "text-center text-gray-400 py-10"
};
const _hoisted_75 = {
  key: 4,
  class: "border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white"
};
const _hoisted_76 = { class: "mb-6" };
const _hoisted_77 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" };
const _hoisted_78 = ["value"];
const _hoisted_79 = { class: "text-sm font-bold text-gray-800" };
const _hoisted_80 = { class: "text-[10px] text-gray-500" };
const _hoisted_81 = { class: "flex justify-end pt-4 border-t border-gray-100" };
const _hoisted_82 = ["disabled"];
const _hoisted_83 = {
  key: 0,
  class: "fa-solid fa-spinner fa-spin mr-2"
};
const _hoisted_84 = { class: "border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white" };
const _hoisted_85 = {
  key: 0,
  class: "text-center py-10 text-gray-500 text-sm"
};
const _hoisted_86 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 gap-6"
};
const _hoisted_87 = { class: "border border-status-success/30 bg-status-success/10 rounded-sm p-5 relative" };
const _hoisted_88 = { class: "font-mono text-[10px] text-gray-600 mb-4" };
const _hoisted_89 = { class: "space-y-3 mb-6" };
const _hoisted_90 = { class: "flex justify-between text-sm" };
const _hoisted_91 = { class: "font-bold text-status-success" };
const _hoisted_92 = { class: "flex justify-between text-sm" };
const _hoisted_93 = { class: "font-mono font-bold" };
const _hoisted_94 = { class: "flex justify-between text-sm" };
const _hoisted_95 = { class: "font-bold" };
const _hoisted_96 = { class: "border border-gray-300 rounded-sm p-5 bg-gray-50" };
const _hoisted_97 = { key: 0 };
const _hoisted_98 = { class: "font-mono text-[10px] text-gray-600 mb-4" };
const _hoisted_99 = { class: "space-y-3 mb-6" };
const _hoisted_100 = { class: "flex justify-between text-sm" };
const _hoisted_101 = { class: "font-bold text-status-warning" };
const _hoisted_102 = { class: "flex justify-between text-sm" };
const _hoisted_103 = { class: "font-mono font-bold" };
const _hoisted_104 = { class: "flex justify-between text-sm" };
const _hoisted_105 = { class: "font-bold" };
const _hoisted_106 = { class: "flex flex-wrap gap-2 pt-4 border-t border-gray-200" };
const _hoisted_107 = {
  key: 1,
  class: "h-full flex flex-col items-center justify-center text-gray-400 py-8"
};
const _hoisted_108 = { class: "mt-6 bg-white border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_109 = { class: "w-full text-left" };
const _hoisted_110 = { class: "px-5 py-2 font-mono text-xs text-absa-enrich" };
const _hoisted_111 = { class: "px-3 py-2 text-xs" };
const _hoisted_112 = { class: "px-3 py-2 text-xs" };
const _hoisted_113 = { class: "px-3 py-2 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_114 = { class: "px-3 py-2" };
const _hoisted_115 = { class: "px-3 py-2 text-xs text-gray-500" };
const _hoisted_116 = { key: 0 };
const _hoisted_117 = { class: "grid grid-cols-3 gap-4 mb-6" };
const _hoisted_118 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_119 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_120 = { class: "border border-gray-300 rounded-sm p-4" };
const _hoisted_121 = { class: "text-2xl font-bold text-absa-enrich font-mono" };
const _hoisted_122 = { class: "border border-gray-300 rounded-sm overflow-hidden mb-6" };
const _hoisted_123 = { class: "overflow-x-auto table-container" };
const _hoisted_124 = { class: "w-full text-left border-collapse" };
const _hoisted_125 = { class: "text-sm divide-y divide-gray-100" };
const _hoisted_126 = { key: 0 };
const _hoisted_127 = { class: "px-5 py-3 font-medium text-absa-enrich" };
const _hoisted_128 = { class: "flex items-center gap-2" };
const _hoisted_129 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_130 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_131 = { class: "px-4 py-3" };
const _hoisted_132 = { class: "flex items-center gap-0.5 w-24" };
const _hoisted_133 = { class: "px-4 py-3" };
const _hoisted_134 = { class: "grid grid-cols-1 xl:grid-cols-3 gap-6" };
const _hoisted_135 = { class: "xl:col-span-2 border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_136 = { class: "divide-y divide-gray-100" };
const _hoisted_137 = { class: "text-[11px] font-bold text-gray-400 uppercase tracking-wider w-52 flex-shrink-0 pt-0.5" };
const _hoisted_138 = { class: "text-sm text-absa-enrich font-mono" };
const _hoisted_139 = { class: "flex flex-col gap-4" };
const _hoisted_140 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_141 = { class: "p-4 space-y-3" };
const _hoisted_142 = { class: "flex flex-col items-center mt-1" };
const _hoisted_143 = {
  key: 0,
  class: "fa-solid fa-check text-[8px]"
};
const _hoisted_144 = {
  key: 1,
  class: "fa-solid fa-circle text-[6px]"
};
const _hoisted_145 = {
  key: 0,
  class: "w-px h-6 bg-gray-200 mt-1"
};
const _hoisted_146 = { class: "pb-2" };
const _hoisted_147 = { class: "text-[11px] text-gray-500" };
const _hoisted_148 = { class: "border border-gray-300 rounded-sm overflow-hidden mt-6" };
const _hoisted_149 = { class: "w-full text-left" };
const _hoisted_150 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_151 = { class: "px-5 py-3 font-mono text-xs text-gray-500" };
const _hoisted_152 = { class: "px-4 py-3 font-semibold text-absa-enrich text-xs" };
const _hoisted_153 = { class: "px-4 py-3 font-mono text-xs text-gray-600" };
const _hoisted_154 = { class: "px-4 py-3 font-mono text-xs font-bold" };
const _hoisted_155 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_156 = { class: "px-4 py-3" };
const _hoisted_157 = {
  key: 8,
  class: "border border-gray-300 rounded-sm overflow-hidden"
};
const _hoisted_158 = { class: "p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" };
const _hoisted_159 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_160 = { class: "flex items-center gap-3" };
const _hoisted_161 = { class: "overflow-x-auto table-container" };
const _hoisted_162 = { class: "w-full text-left border-collapse whitespace-nowrap" };
const _hoisted_163 = { class: "text-sm divide-y divide-gray-100 font-mono" };
const _hoisted_164 = { key: 0 };
const _hoisted_165 = { class: "px-5 py-3 text-gray-500 text-xs" };
const _hoisted_166 = { class: "px-4 py-3 text-absa-passion text-xs font-semibold" };
const _hoisted_167 = { class: "px-4 py-3 text-gray-700 text-xs" };
const _hoisted_168 = { class: "px-4 py-3 text-xs" };
const _hoisted_169 = { class: "flex items-center gap-2" };
const _hoisted_170 = { class: "w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_171 = { class: "font-bold text-absa-enrich" };
const _hoisted_172 = { class: "px-4 py-3 text-xs" };
const _hoisted_173 = { class: "px-4 py-3 text-gray-500 text-xs" };
const _hoisted_174 = { class: "p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500" };
const _hoisted_175 = { class: "border border-gray-300 rounded-sm overflow-hidden mb-6" };
const _hoisted_176 = { class: "p-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_177 = {
  key: 0,
  class: "inline-flex items-center gap-1 px-2 py-0.5 bg-absa-passion/10 text-absa-passion rounded-sm text-xs font-bold"
};
const _hoisted_178 = {
  key: 1,
  class: "text-xs font-semibold text-status-success"
};
const _hoisted_179 = {
  key: 0,
  class: "p-8 text-center text-gray-500 text-sm"
};
const _hoisted_180 = {
  key: 1,
  class: "w-full text-left"
};
const _hoisted_181 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_182 = { class: "px-5 py-3" };
const _hoisted_183 = { class: "px-4 py-3 font-mono text-xs font-semibold text-absa-enrich" };
const _hoisted_184 = { class: "px-4 py-3 text-xs text-gray-700" };
const _hoisted_185 = { class: "px-4 py-3 font-mono text-xs font-bold text-absa-passion" };
const _hoisted_186 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_187 = { class: "px-4 py-3 text-xs text-gray-500" };
const _hoisted_188 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_189 = { class: "w-full text-left" };
const _hoisted_190 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_191 = { class: "px-5 py-3 font-mono text-xs font-semibold text-absa-enrich" };
const _hoisted_192 = { class: "px-4 py-3 text-xs text-gray-700" };
const _hoisted_193 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_194 = { class: "px-4 py-3 font-mono text-xs text-gray-500" };
const _hoisted_195 = { class: "px-4 py-3 text-xs text-status-success font-semibold" };


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
const intelligenceStore = useIntelligenceStore();
const loading = ref(true);
const activeTab = ref('overview');

// Retrain job state
const retraining = ref(false);

  const selectedFeaturesForTraining = ref([]);
  const modelComparisonData = ref(null);

  async function loadComparison() {
    try {
      modelComparisonData.value = await fetchModelComparison();
    } catch (e) {
      console.warn("Failed to load model comparison", e);
    }
  }

  // Load comparison on mount
  onMounted(loadComparison);

ref(null);
const retrainPollTimer = ref(null);
const retrainError = ref('');

// Request Retrain is available to Data Scientists + Admin
const canRetrain = computed(() => {
  try {
    const roles = (decodeJWT().getUserRoles?.() || []).map((r) => String(r).toUpperCase());
    return roles.includes('ADMIN') || roles.includes('DATA_SCIENTIST')
  } catch (e) {
    return false
  }
});

// Raw backend data
const performanceHistory = ref([]);
const featureDriftList = ref([]);
const predictionLogs = ref([]);
const predictionTotal = ref(0);

// ── Tab definitions ──
const tabs = computed(() => [
  { id: 'overview',    label: 'Overview',         icon: 'fa-gauge-high' },
  { id: 'calibration', label: 'Calibration',       icon: 'fa-sliders' },
  { id: 'simulation',  label: 'Simulation',        icon: 'fa-flask' },
  { id: 'training',    label: 'Training',          icon: 'fa-dumbbell' },
  { id: 'champion',    label: 'Champion/Challenger', icon: 'fa-trophy' },
  { id: 'audit',       label: 'Audit History',     icon: 'fa-list-check' },
  { id: 'monitoring',  label: 'Monitoring',        icon: 'fa-chart-line' },
]);

// ── Static / derived data ──
const lastEvaluatedDate = computed(() => performanceHistory.value.length
  ? performanceHistory.value[performanceHistory.value.length - 1].date
  : '—');
// Drift endpoint does not expose a scan timestamp yet; tie to latest eval.
const lastDriftScan = computed(() => lastEvaluatedDate.value);

// Real alerts from the live feature-drift scan (PSI thresholds)
const activeAlerts = computed(() => featureDriftList.value
  .filter(f => f.status === 'CRITICAL' || f.status === 'WARNING')
  .map((f, i) => ({
    id: i + 1,
    severity: f.status,
    severityClass: f.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-passion' : 'bg-status-warning/10 text-status-warning',
    feature: f.name,
    message: `PSI ${f.score} — above ${f.status === 'CRITICAL' ? 'critical' : 'warning'} threshold`,
    currentValue: f.score,
    threshold: f.status === 'CRITICAL' ? '0.25' : '0.10',
    since: 'latest scan',
  })));

// Resolution history requires an alerting store (not yet in pilot backend).
const resolvedAlerts = ref([]);

// ── Model Details ──
const modelDetails = computed(() => {
  const m = modelsStore.championChurn;
  return { name: m?.id || '—', status: m?.status || '—' }
});

// ── Overview KPIs ──
const modelMetrics = computed(() => {
  const m = modelsStore.championChurn;
  const metrics = m?.metrics || {};
  return {
    aucRoc: { value: metrics.auc != null ? (metrics.auc * 100).toFixed(1) + '%' : '—' },
    logLoss: { value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '—' },
    brier: { value: metrics.brier != null ? metrics.brier.toFixed(4) : '—' },
  }
});

const overviewKpis = computed(() => {
  const m = modelsStore.championChurn;
  const metrics = m?.metrics || {};
  const pct = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—';
  return [
    { label: 'AUC-ROC',     value: pct(metrics.auc), note: 'Holdout discrimination' },
    { label: 'KS Stat',     value: metrics.ks_statistic != null ? metrics.ks_statistic.toFixed(3) : '—', note: 'Score separation (next retrain)' },
    { label: 'Log Loss',    value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '—', note: 'Lower is better' },
    { label: 'Brier Score', value: metrics.brier != null ? metrics.brier.toFixed(4) : '—', note: 'Calibration quality' },
    { label: 'F1 @ optimal', value: m?.classification?.f1 != null ? m.classification.f1.toFixed(3) : '—', note: `Threshold ${m?.classification_threshold ?? '—'}` },
    { label: 'Model Ver.',  value: m?.id || '—', note: 'Champion (live registry)' },
  ]
});

const driftingFeatureCount = computed(() =>
  featureDriftList.value.filter(f => parseFloat(f.score) > 0.20).length || 2
);

const avgLatency = computed(() => {
  if (!predictionLogs.value.length) return '—'
  const vals = predictionLogs.value.map(p => parseFloat(p.latency));
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
  return avg.toFixed(1) + 'ms'
});

// ── Confusion Matrix ──
// Real holdout evaluation from the model registry (computed at training
// time at the optimal threshold). Realised-outcome matrices replace this
// once prediction logging accrues labels.
ref(null);  // display-only: registry optimal threshold
computed(() => {
  const m = modelsStore.championChurn;
  const cm = m?.classification?.confusion_matrix;
  if (!cm) return { tn: null, fp: null, fn: null, tp: null, total: 0 }
  const [[tn, fp], [fn, tp]] = cm;
  return { tn, fp, fn, tp, total: tn + fp + fn + tp }
});
computed(() =>
  modelsStore.championChurn?.metrics?.optimal_threshold != null
    ? modelsStore.championChurn.metrics.optimal_threshold.toFixed(3)
    : '—');
computed(() => {
  const m = modelsStore.championChurn;
  const c = m?.classification || {};
  const fm = (v) => v != null ? v.toFixed(2) : '—';
  return { precision: fm(c.precision), recall: fm(c.recall), f1: fm(c.f1) }
});

// Interactive MLOps features state
const activeThreshold = ref(0.50);
const calibrationThreshold = ref(0.50);
const savingThreshold = ref(false);

// Simulated matrix based on baseline 1000 users for interactive slider demo
const simulatedMetrics = ref({ tp: 150, fp: 50, tn: 800, fn: 50 });
  let calTimeout = null;
  watch(calibrationThreshold, (newVal) => {
    if (calTimeout) clearTimeout(calTimeout);
    calTimeout = setTimeout(async () => {
      try {
        simulatedMetrics.value = await simulateCalibration(newVal);
      } catch (e) {
        console.warn("Failed to simulate calibration", e);
      }
    }, 300);
  });

// Simulation what-if state
const simulationFeatures = ref([
  { name: 'savings_balance', value: 5000 },
  { name: 'days_since_last_txn', value: 14 },
  { name: 'mobile_app_logins', value: 3 },
]);
const simulating = ref(false);
const simulationResult = ref(null);

// Retraining state
const availableFeatures = ref([]);
const modelComparison = ref(null);
ref(false);

// ── Segment Performance ──
// Per-segment AUC/F1 requires scored outcomes per segment — not tracked in
// the pilot. Show live segment composition (from the CLV band summary);
// model-quality cells read '—'.
computed(() => {
  const bands = intelligenceStore.clvData?.bands || [];
  const total = bands.reduce((s, b) => s + b.count, 0);
  return bands.map(b => ({
    name: b.band,
    customers: b.count.toLocaleString(),
    auc: '—', f1: '—',
    status: 'PILOT',
    statusClass: 'bg-gray-100 text-gray-500',
    dotClass: 'bg-gray-400',
    share: total ? ((b.count / total) * 100).toFixed(1) + '%' : '—',
  }))
});

// ── Threshold Table ──
// Real operating points from the registry: Youden-J optimal and F1-optimal,
// evaluated on the holdout at training time. Cost column needs a business
// cost model — not tracked.
computed(() => {
  const m = modelsStore.championChurn;
  const rows = [];
  const opt = m?.metrics || {};
  const cls = m?.classification;
  const f1t = m?.classification_threshold;
  if (cls && opt.optimal_threshold != null) {
    const [[tn, fp], [fn, tp]] = cls.confusion_matrix || [[0, 0], [0, 0]];
    rows.push({
      threshold: opt.optimal_threshold.toFixed(2),
      precision: cls.precision?.toFixed(2) ?? '—',
      recall: cls.recall?.toFixed(2) ?? '—',
      f1: cls.f1?.toFixed(2) ?? '—',
      fpRate: (tn + fp) > 0 ? (fp / (tn + fp)).toFixed(2) : '—',
      cost: '—',
      basis: 'holdout @ Youden-J',
      recommended: true,
    });
  }
  if (f1t && typeof f1t === 'object') {
    const [[tn, fp]] = f1t.confusion_matrix || [[0, 0], [0, 0]];
    rows.push({
      threshold: f1t.threshold?.toFixed(2) ?? '—',
      precision: f1t.precision?.toFixed(2) ?? '—',
      recall: f1t.recall?.toFixed(2) ?? '—',
      f1: f1t.f1?.toFixed(2) ?? '—',
      fpRate: (tn + fp) > 0 ? (fp / (tn + fp)).toFixed(2) : '—',
      cost: '—',
      basis: 'holdout @ F1-optimal',
      recommended: false,
    });
  }
  return rows
});

// ── Drift Table enriched rows ──
const driftTableRows = computed(() => {
  // Live only — the drift endpoint is the single source of truth; no
  // fabricated offline rows.
  const staticRows = [];
  return (featureDriftList.value.length > 0 ? featureDriftList.value.map(f => ({
    name: f.name, trainMean: f.trainMean, currentMean: f.currentMean,
    delta: parseFloat(f.currentMean) - parseFloat(f.trainMean),
    score: f.score, status: f.status, invertShift: f.invertShift,
  })) : staticRows).map(r => ({
    ...r,
    deltaStr: (r.delta >= 0 ? '+' : '') + r.delta.toFixed(r.delta % 1 === 0 ? 0 : 2),
    scoreClass: parseFloat(r.score) > 0.25 ? 'text-absa-inspire' : parseFloat(r.score) > 0.10 ? 'text-status-warning' : 'text-absa-passion',
    badgeClass: r.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-inspire' : r.status === 'WARNING' ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion',
    dotClass: r.status === 'CRITICAL' ? 'bg-absa-inspire' : r.status === 'WARNING' ? 'bg-status-warning/100' : 'bg-absa-passion',
    shiftDir: r.invertShift ? 'left' : 'right',
  }))
});

// ── Governance Data ──
// Registry facts + the governance block maintained in models/registry.json.
// Fields with no recorded value read '—'.
const modelCardFields = computed(() => {
  const m = modelsStore.championChurn;
  const g = m?.governance || {};
  const d = m?.data || {};
  const dash = (v) => (v == null || v === '' ? '—' : v);
  const sampling = d.scale_pos_weight != null
    ? `class-weighted (scale_pos_weight=${d.scale_pos_weight}) · ${d.class_imbalance_pct}% positives`
    : null;
  return [
    { label: 'Model ID',           value: dash(m?.id) },
    { label: 'Version',            value: dash(m?.version) },
    { label: 'Framework',          value: dash(m?.framework) },
    { label: 'Trained At',         value: dash(m?.trained_at) },
    { label: 'Training Window',    value: m?.training_dates?.length ? m.training_dates.join(' → ') : '—' },
    { label: 'Holdout Date',       value: dash(m?.holdout_date) },
    { label: 'Training Data',      value: d.train_samples != null ? `${d.train_samples.toLocaleString()} rows (${d.train_positives} positives)` : '—' },
    { label: 'Sampling Strategy',  value: dash(sampling) },
    { label: 'Features Used',      value: m?.n_training_features != null ? `${m.n_training_features} input features` : '—' },
    { label: 'Model Owner',        value: dash(g.model_owner) },
    { label: 'Risk Owner',         value: dash(g.risk_owner) },
    { label: 'Validated By',       value: dash(g.validated_by) },
    { label: 'Validation Date',    value: dash(g.validation_date) },
    { label: 'Approval Status',    value: dash(g.approval_status) },
    { label: 'Next Review Due',    value: dash(g.next_review_due) },
    { label: 'Regulatory Ref',     value: dash(g.regulatory_ref) },
    { label: 'Target Variable',    value: 'churn_within_90_days (binary)' },
  ]
});

// Approval lifecycle: real stages from the registry governance block.
const approvalSteps = computed(() => {
  const stages = modelsStore.championChurn?.governance?.approval_stages;
  if (!stages?.length) return []
  return stages.map(s => ({
    stage: s.stage,
    detail: s.detail || s.date || '',
    done: s.status === 'DONE' || s.status === 'APPROVED',
    active: s.status === 'LIVE' || s.status === 'PENDING',
  }))
});

// Audit log: only events with a real backend source (registry + live logs)
const auditLog = computed(() => {
  const m = modelsStore.championChurn;
  const rows = [];
  if (m) {
    rows.push({
      date: '—', event: 'Registered as champion', version: m.id,
      auc: m.metrics?.auc != null ? (m.metrics.auc * 100).toFixed(1) + '%' : '—',
      actor: 'model registry', status: 'ACTIVE', statusClass: 'bg-brand-soft-success text-status-success',
    });
  }
  if (predictionLogs.value.length) {
    rows.push({
      date: (predictionLogs.value[0].timestamp || '—').slice(0, 10),
      event: 'Serving live predictions', version: m?.id || '—',
      auc: '—', actor: 'prediction-service', status: 'LIVE', statusClass: 'bg-brand-soft-success text-status-success',
    });
  }
  return rows
});

// ── Enriched Prediction Logs ──
const selectedTimeframe = ref('Last 1 Hour');
const enrichedLogs = computed(() =>
  predictionLogs.value.map(log => {
    const probValue = parseFloat(log.prob) / 100;
    const riskBand  = probValue > 0.70 ? 'HIGH' : probValue > 0.40 ? 'MEDIUM' : 'LOW';
    const riskBandClass = probValue > 0.70 ? 'bg-absa-passion/10 text-absa-inspire' : probValue > 0.40 ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion';
    return { ...log, probValue, riskBand, riskBandClass }
  })
);

// ── Chart Refs ──
const sparklineAucCanvas = ref(null);
const sparklineF1Canvas  = ref(null);
const mainChartCanvas    = ref(null);
let _sparkAucChart = null;
let _sparkF1Chart = null;
let _mainChart = null;

function stopRetrainPolling() {
  if (retrainPollTimer.value) {
    clearInterval(retrainPollTimer.value);
    retrainPollTimer.value = null;
  }
  retraining.value = false;
}

onMounted(async () => {
  await modelsStore.fetchModels();
  intelligenceStore.fetchClv();
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
      badgeClass: f.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-inspire' : f.status === 'WARNING' ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion',
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
  // Destroy previous instances before recreating (refresh/retrain re-runs this).
  if (_sparkAucChart) _sparkAucChart.destroy();
  if (_sparkF1Chart) _sparkF1Chart.destroy();
  if (_mainChart) _mainChart.destroy();
  const sparkOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false, min: 0 } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
    layout: { padding: 0 },
  };
  const history = performanceHistory.value;
  const labels  = history.map(h => h.date);
  const aucData = history.map(h => h.auc * 100);
  const logData = history.map(h => h.log_loss);
  const precData = history.map(h => h.precision * 100);
  const recData  = history.map(h => h.recall * 100);
  const lbs = labels;

  if (sparklineAucCanvas.value) {
    _sparkAucChart = new Chart(sparklineAucCanvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: aucData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    });
  }
  if (sparklineF1Canvas.value) {
    _sparkF1Chart = new Chart(sparklineF1Canvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: logData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    });
  }
  if (mainChartCanvas.value) {
    _mainChart = new Chart(mainChartCanvas.value, {
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

  // --- MLOps Governed Functions ---

  async function loadMLOpsData() {
    try {
      const champ = await fetchChampion();
      activeThreshold.value = champ.optimal_threshold || 0.50;
      calibrationThreshold.value = activeThreshold.value;
      
      const f = await fetchFeatures();
      availableFeatures.value = f;
      
      const comp = await fetchModelComparison();
      modelComparison.value = comp;
      
      const logs = await fetchAuditLogs();
      auditLogs.value = logs;
      
      await doSimulate();
    } catch (e) {
      console.warn("Failed to load MLOps governed data", e);
    }
  }

  async function doSimulate() {
    simulating.value = true;
    try {
      const payload = {
          features: {},
          baseline_probability: 0.50, // mock baseline
          threshold: calibrationThreshold.value
      };
      simulationFeatures.value.forEach(feat => { payload.features[feat.name] = feat.value; });
      simulationResult.value = await simulatePrediction(payload);
    } catch (e) {
      console.warn("Simulation failed", e);
    } finally {
      simulating.value = false;
    }
  }

  // ── Registered model families (registry.json models[]) ──
  computed(() => modelsStore.models || []);

  onMounted(loadMLOpsData);
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
              _cache[15] || (_cache[15] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
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
                      _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" }, null, -1)),
                      createTextVNode(toDisplayString(modelDetails.value.status), 1)
                    ]))
                  : createCommentVNode("", true),
                _cache[13] || (_cache[13] = createBaseVNode("span", { class: "inline-flex items-center px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-sm font-mono" }, "CHAMPION", -1)),
                _cache[14] || (_cache[14] = createBaseVNode("span", { class: "inline-flex items-center px-2 py-0.5 text-xs font-bold bg-status-warning/10 text-status-warning border border-status-warning/30 rounded-sm" }, "RISK TIER: HIGH", -1))
              ]),
              createBaseVNode("p", _hoisted_10, toDisplayString(unref(modelsStore).modelCount) + " models in registry · Churn Prediction Pipeline · Last evaluated " + toDisplayString(lastEvaluatedDate.value), 1)
            ]),
            createBaseVNode("div", _hoisted_11, [
              _cache[16] || (_cache[16] = createBaseVNode("button", { class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none" }, [
                createBaseVNode("i", { class: "fa-solid fa-download text-[13px]" }),
                createTextVNode(" Export MRM Report ")
              ], -1)),
              (canRetrain.value)
                ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.triggerRetrainAction && _ctx.triggerRetrainAction(...args))),
                    disabled: retraining.value,
                    class: normalizeClass(['px-4 py-2 text-absa-serene rounded-sm flex items-center gap-2 transition-colors font-label text-sm font-semibold shadow-none',
              retraining.value ? 'bg-gray-400 cursor-not-allowed' : 'bg-absa-passion hover:bg-absa-power'])
                  }, [
                    (retraining.value)
                      ? (openBlock(), createElementBlock("i", _hoisted_13))
                      : (openBlock(), createElementBlock("i", _hoisted_14)),
                    createTextVNode(" " + toDisplayString(retraining.value ? 'Retraining…' : 'Request Retrain'), 1)
                  ], 10, _hoisted_12))
                : createCommentVNode("", true)
            ])
          ]),
          (retraining.value || retrainError.value)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["mb-4 px-4 py-2 text-xs rounded-sm flex items-center gap-2", retrainError.value ? 'bg-absa-passion/10 text-absa-inspire' : 'bg-status-warning/10 text-status-warning border border-status-warning/30'])
              }, [
                (!retrainError.value)
                  ? (openBlock(), createElementBlock("i", _hoisted_15))
                  : (openBlock(), createElementBlock("i", _hoisted_16)),
                (retraining.value)
                  ? (openBlock(), createElementBlock("span", _hoisted_17, "Retraining the churn model in the background — this page will refresh automatically when done (registry updates)."))
                  : (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(retrainError.value), 1)),
                (retraining.value)
                  ? (openBlock(), createElementBlock("button", {
                      key: 4,
                      onClick: stopRetrainPolling,
                      class: "ml-auto text-[11px] font-bold underline hover:opacity-70"
                    }, "Dismiss"))
                  : createCommentVNode("", true)
              ], 2))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_19, [
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
                  ? (openBlock(), createElementBlock("span", _hoisted_21, toDisplayString(tab.badge), 1))
                  : createCommentVNode("", true)
              ], 10, _hoisted_20))
            }), 128))
          ]),
          (activeTab.value === 'overview')
            ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("div", _hoisted_22, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(overviewKpis.value, (kpi) => {
                    return (openBlock(), createElementBlock("div", {
                      key: kpi.label,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_23, toDisplayString(kpi.label), 1),
                      createBaseVNode("p", _hoisted_24, toDisplayString(kpi.value), 1),
                      (kpi.note)
                        ? (openBlock(), createElementBlock("p", _hoisted_25, toDisplayString(kpi.note), 1))
                        : createCommentVNode("", true)
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      _cache[17] || (_cache[17] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "AUC-ROC"),
                        createBaseVNode("span", { class: "text-[11px] font-semibold text-status-success flex items-center gap-1" }, [
                          createBaseVNode("i", { class: "fa-solid fa-arrow-up text-[9px]" }),
                          createTextVNode("+0.3%")
                        ])
                      ], -1)),
                      createBaseVNode("div", _hoisted_29, toDisplayString(modelMetrics.value.aucRoc.value), 1),
                      createBaseVNode("div", _hoisted_30, [
                        createBaseVNode("canvas", {
                          ref_key: "sparklineAucCanvas",
                          ref: sparklineAucCanvas
                        }, null, 512)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_31, [
                      _cache[18] || (_cache[18] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Log Loss"),
                        createBaseVNode("span", { class: "text-[11px] text-gray-400" }, "Lower is better")
                      ], -1)),
                      createBaseVNode("div", _hoisted_32, toDisplayString(modelMetrics.value.logLoss.value), 1),
                      createBaseVNode("div", _hoisted_33, [
                        createBaseVNode("canvas", {
                          ref_key: "sparklineF1Canvas",
                          ref: sparklineF1Canvas
                        }, null, 512)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_34, [
                      _cache[19] || (_cache[19] = createBaseVNode("div", { class: "flex justify-between items-start" }, [
                        createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Brier Score"),
                        createBaseVNode("span", { class: "text-[11px] text-gray-400" }, "Calibration")
                      ], -1)),
                      createBaseVNode("div", _hoisted_35, toDisplayString(modelMetrics.value.brier.value), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_36, [
                    _cache[20] || (_cache[20] = createStaticVNode("<div class=\"flex justify-between items-center mb-4\"><div><h3 class=\"text-sm font-bold text-absa-enrich\">Performance Over Time (30D)</h3><p class=\"text-[11px] text-gray-500 mt-0.5\">Precision &amp; Recall on hold-out evaluation set</p></div><div class=\"flex items-center gap-4 text-[11px] font-semibold text-gray-600\"><span class=\"flex items-center gap-1.5\"><span class=\"w-3 h-0.5 bg-absa-passion inline-block\"></span>Precision</span><span class=\"flex items-center gap-1.5\"><span class=\"w-3 h-0.5 bg-absa-passion/40 inline-block\"></span>Recall</span></div></div>", 1)),
                    createBaseVNode("div", _hoisted_37, [
                      createBaseVNode("canvas", {
                        ref_key: "mainChartCanvas",
                        ref: mainChartCanvas
                      }, null, 512)
                    ])
                  ])
                ]),
                (activeAlerts.value.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_38, [
                      createBaseVNode("p", _hoisted_39, [
                        _cache[21] || (_cache[21] = createBaseVNode("i", { class: "fa-solid fa-triangle-exclamation" }, null, -1)),
                        createTextVNode(" " + toDisplayString(activeAlerts.value.length) + " Active Alert" + toDisplayString(activeAlerts.value.length > 1 ? 's' : '') + " — Action Required ", 1)
                      ]),
                      createBaseVNode("div", _hoisted_40, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(activeAlerts.value.slice(0,2), (a) => {
                          return (openBlock(), createElementBlock("div", {
                            key: a.id,
                            class: "text-sm text-gray-700 flex items-center gap-2"
                          }, [
                            _cache[22] || (_cache[22] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion flex-shrink-0" }, null, -1)),
                            createBaseVNode("span", _hoisted_41, toDisplayString(a.feature), 1),
                            createBaseVNode("span", null, toDisplayString(a.message), 1),
                            createBaseVNode("span", _hoisted_42, toDisplayString(a.since), 1)
                          ]))
                        }), 128))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (activeTab.value = 'alerts')),
                        class: "mt-3 text-xs font-bold text-absa-passion hover:underline"
                      }, "View all alerts →")
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_43, [
                  createBaseVNode("div", _hoisted_44, [
                    _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "KS Statistic", -1)),
                    createBaseVNode("p", _hoisted_45, toDisplayString(overviewKpis.value.find(k => k.label === 'KS Stat')?.value || '—'), 1),
                    _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Kolmogorov–Smirnov discrimination power", -1))
                  ]),
                  createBaseVNode("div", _hoisted_46, [
                    _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Features in Drift", -1)),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-2xl font-bold font-mono", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-absa-passion'])
                    }, toDisplayString(driftingFeatureCount.value), 3),
                    createBaseVNode("p", _hoisted_47, "of " + toDisplayString(featureDriftList.value.length) + " features exceeding PSI threshold", 1)
                  ]),
                  createBaseVNode("div", _hoisted_48, [
                    _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Inference Latency", -1)),
                    createBaseVNode("p", _hoisted_49, toDisplayString(avgLatency.value), 1),
                    _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "P95 across last 50 predictions", -1))
                  ])
                ])
              ], 64))
            : (activeTab.value === 'calibration')
              ? (openBlock(), createElementBlock("div", _hoisted_50, [
                  _cache[33] || (_cache[33] = createBaseVNode("h3", { class: "text-lg font-bold text-absa-enrich mb-2" }, "Threshold Calibration", -1)),
                  _cache[34] || (_cache[34] = createBaseVNode("p", { class: "text-sm text-gray-500 mb-6" }, "Adjust the classification threshold to simulate the trade-off between Precision and Recall. Production models will not be affected until the proposal is approved.", -1)),
                  createBaseVNode("div", _hoisted_51, [
                    createBaseVNode("label", _hoisted_52, "Threshold: " + toDisplayString(calibrationThreshold.value), 1),
                    withDirectives(createBaseVNode("input", {
                      type: "range",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((calibrationThreshold).value = $event)),
                      min: "0",
                      max: "1",
                      step: "0.01",
                      class: "w-full accent-absa-passion"
                    }, null, 512), [
                      [
                        vModelText,
                        calibrationThreshold.value,
                        void 0,
                        { number: true }
                      ]
                    ]),
                    _cache[28] || (_cache[28] = createBaseVNode("div", { class: "flex justify-between text-xs text-gray-400 mt-1" }, [
                      createBaseVNode("span", null, "0.0 (High Recall / False Positives)"),
                      createBaseVNode("span", null, "1.0 (High Precision / False Negatives)")
                    ], -1))
                  ]),
                  createBaseVNode("div", _hoisted_53, [
                    createBaseVNode("div", _hoisted_54, [
                      _cache[29] || (_cache[29] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-500 uppercase" }, "Simulated True Positives", -1)),
                      createBaseVNode("p", _hoisted_55, toDisplayString(simulatedMetrics.value.tp), 1)
                    ]),
                    createBaseVNode("div", _hoisted_56, [
                      _cache[30] || (_cache[30] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-500 uppercase" }, "Simulated False Positives", -1)),
                      createBaseVNode("p", _hoisted_57, toDisplayString(simulatedMetrics.value.fp), 1)
                    ]),
                    createBaseVNode("div", _hoisted_58, [
                      _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-500 uppercase" }, "Simulated True Negatives", -1)),
                      createBaseVNode("p", _hoisted_59, toDisplayString(simulatedMetrics.value.tn), 1)
                    ]),
                    createBaseVNode("div", _hoisted_60, [
                      _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-500 uppercase" }, "Simulated False Negatives", -1)),
                      createBaseVNode("p", _hoisted_61, toDisplayString(simulatedMetrics.value.fn), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_62, [
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.resetCalibration && _ctx.resetCalibration(...args))),
                      class: "px-4 py-2 border border-gray-300 rounded text-sm font-bold text-gray-600 hover:bg-gray-50"
                    }, "Reset"),
                    createBaseVNode("button", {
                      onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.submitCalibration && _ctx.submitCalibration(...args))),
                      disabled: savingThreshold.value,
                      class: "px-4 py-2 bg-absa-passion text-white rounded text-sm font-bold hover:bg-absa-power disabled:opacity-50"
                    }, toDisplayString(savingThreshold.value ? 'Submitting...' : 'Submit Calibration Proposal'), 9, _hoisted_63)
                  ])
                ]))
              : (activeTab.value === 'simulation')
                ? (openBlock(), createElementBlock("div", _hoisted_64, [
                    createBaseVNode("div", _hoisted_65, [
                      _cache[35] || (_cache[35] = createBaseVNode("h3", { class: "text-lg font-bold text-absa-enrich mb-2" }, "What-If Sandbox", -1)),
                      _cache[36] || (_cache[36] = createBaseVNode("p", { class: "text-sm text-gray-500 mb-6" }, "Modify feature values to see their impact on the churn probability.", -1)),
                      createBaseVNode("div", _hoisted_66, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(simulationFeatures.value, (feat) => {
                          return (openBlock(), createElementBlock("div", {
                            key: feat.name
                          }, [
                            createBaseVNode("label", _hoisted_67, toDisplayString(feat.label), 1),
                            withDirectives(createBaseVNode("input", {
                              type: "number",
                              "onUpdate:modelValue": $event => ((feat.value) = $event),
                              onInput: _cache[5] || (_cache[5] = (...args) => (_ctx.debounceSimulate && _ctx.debounceSimulate(...args))),
                              class: "w-full border-gray-300 rounded-sm p-2 text-sm"
                            }, null, 40, _hoisted_68), [
                              [
                                vModelText,
                                feat.value,
                                void 0,
                                { number: true }
                              ]
                            ])
                          ]))
                        }), 128))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_69, [
                      _cache[40] || (_cache[40] = createBaseVNode("h3", { class: "text-lg font-bold text-absa-enrich mb-6" }, "Simulation Result", -1)),
                      (simulationResult.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_70, [
                            createBaseVNode("div", _hoisted_71, [
                              _cache[37] || (_cache[37] = createBaseVNode("span", { class: "text-sm font-bold text-gray-600" }, "Simulated Probability", -1)),
                              createBaseVNode("span", {
                                class: normalizeClass(["text-3xl font-mono", simulationResult.value.classification === 'HIGH_RISK' ? 'text-absa-passion' : 'text-status-success'])
                              }, toDisplayString((simulationResult.value.simulated_probability * 100).toFixed(1)) + "% ", 3)
                            ]),
                            createBaseVNode("div", _hoisted_72, [
                              _cache[38] || (_cache[38] = createBaseVNode("span", { class: "text-sm font-bold text-gray-600" }, "Classification", -1)),
                              createBaseVNode("span", {
                                class: normalizeClass(["px-3 py-1 rounded text-xs font-bold", simulationResult.value.classification === 'HIGH_RISK' ? 'bg-absa-passion/10 text-absa-passion' : 'bg-status-success/20 text-status-success'])
                              }, toDisplayString(simulationResult.value.classification), 3)
                            ]),
                            createBaseVNode("div", _hoisted_73, [
                              _cache[39] || (_cache[39] = createBaseVNode("span", { class: "text-sm font-bold text-gray-600" }, "Probability Delta", -1)),
                              createBaseVNode("span", {
                                class: normalizeClass(["text-lg font-mono", simulationResult.value.delta > 0 ? 'text-status-warning' : 'text-status-success'])
                              }, toDisplayString(simulationResult.value.delta > 0 ? '+' : '') + toDisplayString((simulationResult.value.delta * 100).toFixed(1)) + "% ", 3)
                            ])
                          ]))
                        : (openBlock(), createElementBlock("div", _hoisted_74, " Loading simulation... "))
                    ])
                  ]))
                : (activeTab.value === 'training')
                  ? (openBlock(), createElementBlock("div", _hoisted_75, [
                      _cache[42] || (_cache[42] = createBaseVNode("h3", { class: "text-lg font-bold text-absa-enrich mb-2" }, "Model Retraining", -1)),
                      _cache[43] || (_cache[43] = createBaseVNode("p", { class: "text-sm text-gray-500 mb-6" }, "Select features from the Feature Registry to include in the next retraining run. The pipeline will run asynchronously.", -1)),
                      createBaseVNode("div", _hoisted_76, [
                        _cache[41] || (_cache[41] = createBaseVNode("h4", { class: "text-xs font-bold text-gray-700 uppercase mb-3" }, "Feature Registry", -1)),
                        createBaseVNode("div", _hoisted_77, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(availableFeatures.value, (feat) => {
                            return (openBlock(), createElementBlock("div", {
                              key: feat.id,
                              class: "border border-gray-200 rounded p-3 flex items-center gap-3 hover:bg-gray-50"
                            }, [
                              withDirectives(createBaseVNode("input", {
                                type: "checkbox",
                                value: feat.id,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((selectedFeaturesForTraining).value = $event)),
                                class: "accent-absa-passion rounded-sm"
                              }, null, 8, _hoisted_78), [
                                [vModelCheckbox, selectedFeaturesForTraining.value]
                              ]),
                              createBaseVNode("div", null, [
                                createBaseVNode("p", _hoisted_79, toDisplayString(feat.name), 1),
                                createBaseVNode("p", _hoisted_80, toDisplayString(feat.feature_type) + " · Status: " + toDisplayString(feat.status), 1)
                              ])
                            ]))
                          }), 128))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_81, [
                        createBaseVNode("button", {
                          onClick: _cache[7] || (_cache[7] = (...args) => (_ctx.triggerRetrainAction && _ctx.triggerRetrainAction(...args))),
                          disabled: retraining.value || selectedFeaturesForTraining.value.length === 0,
                          class: "px-4 py-2 bg-absa-passion text-white rounded text-sm font-bold hover:bg-absa-power disabled:opacity-50"
                        }, [
                          (retraining.value)
                            ? (openBlock(), createElementBlock("i", _hoisted_83))
                            : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(retraining.value ? 'Training in progress...' : 'Trigger Retraining Pipeline'), 1)
                        ], 8, _hoisted_82)
                      ])
                    ]))
                  : (activeTab.value === 'champion')
                    ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                        createBaseVNode("div", _hoisted_84, [
                          createBaseVNode("div", { class: "flex justify-between items-center mb-6" }, [
                            _cache[45] || (_cache[45] = createBaseVNode("div", null, [
                              createBaseVNode("h3", { class: "text-lg font-bold text-absa-enrich mb-1" }, "Model Comparison"),
                              createBaseVNode("p", { class: "text-sm text-gray-500" }, "Compare the production Champion against the Nominated Challenger.")
                            ], -1)),
                            createBaseVNode("button", {
                              onClick: loadComparison,
                              class: "px-3 py-1 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-50"
                            }, [...(_cache[44] || (_cache[44] = [
                              createBaseVNode("i", { class: "fa-solid fa-rotate-right mr-1" }, null, -1),
                              createTextVNode(" Refresh ", -1)
                            ]))])
                          ]),
                          (!modelComparisonData.value || !modelComparisonData.value.champion)
                            ? (openBlock(), createElementBlock("div", _hoisted_85, " Loading comparison... "))
                            : (openBlock(), createElementBlock("div", _hoisted_86, [
                                createBaseVNode("div", _hoisted_87, [
                                  _cache[49] || (_cache[49] = createBaseVNode("div", { class: "absolute top-4 right-4 bg-status-success text-white text-[10px] font-bold px-2 py-0.5 rounded" }, "LIVE", -1)),
                                  _cache[50] || (_cache[50] = createBaseVNode("h4", { class: "font-bold text-absa-enrich mb-1" }, "CHAMPION", -1)),
                                  createBaseVNode("p", _hoisted_88, toDisplayString(modelComparisonData.value.champion.id), 1),
                                  createBaseVNode("div", _hoisted_89, [
                                    createBaseVNode("div", _hoisted_90, [
                                      _cache[46] || (_cache[46] = createBaseVNode("span", { class: "text-gray-600" }, "Status", -1)),
                                      createBaseVNode("span", _hoisted_91, toDisplayString(modelComparisonData.value.champion.status), 1)
                                    ]),
                                    createBaseVNode("div", _hoisted_92, [
                                      _cache[47] || (_cache[47] = createBaseVNode("span", { class: "text-gray-600" }, "Model Version", -1)),
                                      createBaseVNode("span", _hoisted_93, toDisplayString(modelComparisonData.value.champion.model_version), 1)
                                    ]),
                                    createBaseVNode("div", _hoisted_94, [
                                      _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-gray-600" }, "AUC-ROC", -1)),
                                      createBaseVNode("span", _hoisted_95, toDisplayString(_ctx.comparisonMetric(modelComparisonData.value.champion)), 1)
                                    ])
                                  ])
                                ]),
                                createBaseVNode("div", _hoisted_96, [
                                  (modelComparisonData.value.challenger)
                                    ? (openBlock(), createElementBlock("div", _hoisted_97, [
                                        _cache[54] || (_cache[54] = createBaseVNode("h4", { class: "font-bold text-absa-enrich mb-1" }, "CHALLENGER", -1)),
                                        createBaseVNode("p", _hoisted_98, toDisplayString(modelComparisonData.value.challenger.id), 1),
                                        createBaseVNode("div", _hoisted_99, [
                                          createBaseVNode("div", _hoisted_100, [
                                            _cache[51] || (_cache[51] = createBaseVNode("span", { class: "text-gray-600" }, "Status", -1)),
                                            createBaseVNode("span", _hoisted_101, toDisplayString(modelComparisonData.value.challenger.status), 1)
                                          ]),
                                          createBaseVNode("div", _hoisted_102, [
                                            _cache[52] || (_cache[52] = createBaseVNode("span", { class: "text-gray-600" }, "Model Version", -1)),
                                            createBaseVNode("span", _hoisted_103, toDisplayString(modelComparisonData.value.challenger.model_version), 1)
                                          ]),
                                          createBaseVNode("div", _hoisted_104, [
                                            _cache[53] || (_cache[53] = createBaseVNode("span", { class: "text-gray-600" }, "AUC-ROC", -1)),
                                            createBaseVNode("span", _hoisted_105, toDisplayString(_ctx.comparisonMetric(modelComparisonData.value.challenger)), 1)
                                          ])
                                        ]),
                                        createBaseVNode("div", _hoisted_106, [
                                          (modelComparisonData.value.challenger.status === 'TRAINED')
                                            ? (openBlock(), createElementBlock("button", {
                                                key: 0,
                                                onClick: _cache[8] || (_cache[8] = $event => (_ctx.actionValidate(modelComparisonData.value.challenger.id))),
                                                class: "flex-1 px-3 py-1.5 border border-absa-passion text-absa-passion hover:bg-absa-passion/10 rounded text-xs font-bold transition-colors"
                                              }, "Validate"))
                                            : createCommentVNode("", true),
                                          (modelComparisonData.value.challenger.status === 'VALIDATED')
                                            ? (openBlock(), createElementBlock("button", {
                                                key: 1,
                                                onClick: _cache[9] || (_cache[9] = $event => (_ctx.actionApprove(modelComparisonData.value.challenger.id))),
                                                class: "flex-1 px-3 py-1.5 border border-absa-passion text-absa-passion hover:bg-absa-passion/10 rounded text-xs font-bold transition-colors"
                                              }, "Approve"))
                                            : createCommentVNode("", true),
                                          (modelComparisonData.value.challenger.status === 'APPROVED')
                                            ? (openBlock(), createElementBlock("button", {
                                                key: 2,
                                                onClick: _cache[10] || (_cache[10] = $event => (_ctx.actionPromote(modelComparisonData.value.challenger.id))),
                                                class: "flex-1 px-3 py-1.5 bg-absa-passion text-white hover:bg-absa-power rounded text-xs font-bold transition-colors"
                                              }, "Promote to Champion"))
                                            : createCommentVNode("", true)
                                        ])
                                      ]))
                                    : (openBlock(), createElementBlock("div", _hoisted_107, [...(_cache[55] || (_cache[55] = [
                                        createBaseVNode("i", { class: "fa-solid fa-ghost text-3xl mb-3" }, null, -1),
                                        createBaseVNode("p", { class: "text-sm font-bold" }, "No Active Challenger", -1),
                                        createBaseVNode("p", { class: "text-xs mt-1" }, "Train a new model to create a challenger.", -1)
                                      ]))]))
                                ])
                              ]))
                        ]),
                        createBaseVNode("div", _hoisted_108, [
                          _cache[58] || (_cache[58] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                            createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Registered Model Families"),
                            createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, [
                              createTextVNode(" Every entry in "),
                              createBaseVNode("span", { class: "font-mono" }, "models/registry.json"),
                              createTextVNode(" — champion and family champions alike. ")
                            ])
                          ], -1)),
                          createBaseVNode("table", _hoisted_109, [
                            _cache[57] || (_cache[57] = createBaseVNode("thead", { class: "bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, [
                              createBaseVNode("tr", null, [
                                createBaseVNode("th", { class: "px-5 py-2" }, "Model"),
                                createBaseVNode("th", { class: "px-3 py-2" }, "Family"),
                                createBaseVNode("th", { class: "px-3 py-2" }, "Task"),
                                createBaseVNode("th", { class: "px-3 py-2" }, "Primary metric"),
                                createBaseVNode("th", { class: "px-3 py-2" }, "Status"),
                                createBaseVNode("th", { class: "px-3 py-2" }, "Trained")
                              ])
                            ], -1)),
                            createBaseVNode("tbody", null, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.registeredModels, (m) => {
                                return (openBlock(), createElementBlock("tr", {
                                  key: m.id,
                                  class: "border-t border-gray-100"
                                }, [
                                  createBaseVNode("td", _hoisted_110, toDisplayString(m.id), 1),
                                  createBaseVNode("td", _hoisted_111, toDisplayString(m.family || m.type), 1),
                                  createBaseVNode("td", _hoisted_112, toDisplayString(m.task || 'classification'), 1),
                                  createBaseVNode("td", _hoisted_113, toDisplayString(_ctx.primaryMetric(m)), 1),
                                  createBaseVNode("td", _hoisted_114, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(['px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase',
                                   m.status === 'champion' ? 'bg-brand-soft-success text-status-success' : 'bg-gray-100 text-gray-600'])
                                    }, toDisplayString(m.status), 3)
                                  ]),
                                  createBaseVNode("td", _hoisted_115, toDisplayString(m.trained_at || '—'), 1)
                                ]))
                              }), 128)),
                              (!_ctx.registeredModels.length)
                                ? (openBlock(), createElementBlock("tr", _hoisted_116, [...(_cache[56] || (_cache[56] = [
                                    createBaseVNode("td", {
                                      colspan: "6",
                                      class: "px-5 py-6 text-center text-xs text-gray-400"
                                    }, " No models registered — run scripts/train_models.py ", -1)
                                  ]))]))
                                : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ], 64))
                    : (activeTab.value === 'monitoring')
                      ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                          createBaseVNode("div", _hoisted_117, [
                            createBaseVNode("div", _hoisted_118, [
                              _cache[59] || (_cache[59] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Features Monitored", -1)),
                              createBaseVNode("p", _hoisted_119, toDisplayString(featureDriftList.value.length || 12), 1)
                            ]),
                            createBaseVNode("div", {
                              class: normalizeClass(["border rounded-sm p-4", driftingFeatureCount.value > 0 ? 'border-absa-inspire/50 bg-absa-passion/10' : 'border-gray-300'])
                            }, [
                              createBaseVNode("p", {
                                class: normalizeClass(["text-[11px] font-bold uppercase tracking-wider mb-2", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-gray-500'])
                              }, "Drifting Features (PSI > 0.20)", 2),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-2xl font-bold font-mono", driftingFeatureCount.value > 0 ? 'text-absa-inspire' : 'text-absa-passion'])
                              }, toDisplayString(driftingFeatureCount.value), 3)
                            ], 2),
                            createBaseVNode("div", _hoisted_120, [
                              _cache[60] || (_cache[60] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Last Drift Scan", -1)),
                              createBaseVNode("p", _hoisted_121, toDisplayString(lastDriftScan.value), 1)
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_122, [
                            _cache[64] || (_cache[64] = createStaticVNode("<div class=\"p-4 border-b border-gray-200 flex justify-between items-center\"><div><h3 class=\"text-sm font-bold text-absa-enrich\">Feature Drift Monitor (PSI)</h3><p class=\"text-[11px] text-gray-500 mt-0.5\">Population Stability Index — Training vs. Current Inference Distribution</p></div><div class=\"flex items-center gap-2 text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-sm px-3 py-1.5\"><i class=\"fa-solid fa-circle-info text-[11px]\"></i> Threshold: 0.20 PSI (WARNING) · 0.25 (CRITICAL) </div></div>", 1)),
                            createBaseVNode("div", _hoisted_123, [
                              createBaseVNode("table", _hoisted_124, [
                                _cache[63] || (_cache[63] = createBaseVNode("thead", null, [
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
                                createBaseVNode("tbody", _hoisted_125, [
                                  (featureDriftList.value.length === 0)
                                    ? (openBlock(), createElementBlock("tr", _hoisted_126, [...(_cache[61] || (_cache[61] = [
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
                                      createBaseVNode("td", _hoisted_127, [
                                        createBaseVNode("div", _hoisted_128, [
                                          createBaseVNode("div", {
                                            class: normalizeClass(["w-0.5 h-4 rounded-full", row.scoreClass.includes('passion') ? 'bg-absa-passion' : 'bg-gray-300'])
                                          }, null, 2),
                                          createTextVNode(" " + toDisplayString(row.name), 1)
                                        ])
                                      ]),
                                      createBaseVNode("td", _hoisted_129, toDisplayString(row.trainMean), 1),
                                      createBaseVNode("td", _hoisted_130, toDisplayString(row.currentMean), 1),
                                      createBaseVNode("td", {
                                        class: normalizeClass(["px-4 py-3 font-mono text-xs", row.delta > 0 ? 'text-absa-energy font-semibold' : 'text-gray-600'])
                                      }, toDisplayString(row.deltaStr), 3),
                                      createBaseVNode("td", {
                                        class: normalizeClass(["px-4 py-3 font-mono text-xs font-bold", row.scoreClass])
                                      }, toDisplayString(row.score), 3),
                                      createBaseVNode("td", _hoisted_131, [
                                        createBaseVNode("div", _hoisted_132, [
                                          createBaseVNode("div", {
                                            class: normalizeClass(["h-4 flex-1 rounded-sm", row.shiftDir === 'left' ? 'bg-absa-passion/60' : 'bg-gray-200'])
                                          }, null, 2),
                                          _cache[62] || (_cache[62] = createBaseVNode("div", { class: "w-px h-5 bg-gray-400 mx-0.5" }, null, -1)),
                                          createBaseVNode("div", {
                                            class: normalizeClass(["h-4 flex-1 rounded-sm", row.shiftDir === 'right' ? 'bg-absa-passion/60' : 'bg-gray-200'])
                                          }, null, 2)
                                        ])
                                      ]),
                                      createBaseVNode("td", _hoisted_133, [
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
                          _cache[65] || (_cache[65] = createStaticVNode("<div class=\"border border-l-4 border-l-absa-passion border-gray-300 rounded-sm p-4 bg-white\"><p class=\"text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-1\">PSI Interpretation Guide</p><div class=\"grid grid-cols-3 gap-4 text-xs text-gray-600\"><div><span class=\"font-bold text-status-success\">PSI &lt; 0.10</span> — No significant change. Model is stable.</div><div><span class=\"font-bold text-status-warning\">0.10 ≤ PSI &lt; 0.25</span> — Moderate shift. Investigation recommended.</div><div><span class=\"font-bold text-absa-passion\">PSI ≥ 0.25</span> — Major shift. Retraining or model review required immediately.</div></div></div>", 1))
                        ], 64))
                      : (activeTab.value === 'governance')
                        ? (openBlock(), createElementBlock(Fragment, { key: 7 }, [
                            createBaseVNode("div", _hoisted_134, [
                              createBaseVNode("div", _hoisted_135, [
                                _cache[66] || (_cache[66] = createBaseVNode("div", { class: "p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center" }, [
                                  createBaseVNode("div", null, [
                                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Model Card"),
                                    createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "SR 11-7 / SARB MRM Framework compliant documentation")
                                  ]),
                                  createBaseVNode("span", { class: "text-[10px] font-bold text-status-success bg-brand-soft-success px-2 py-0.5 rounded-sm border border-status-success/30" }, "APPROVED")
                                ], -1)),
                                createBaseVNode("div", _hoisted_136, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(modelCardFields.value, (field) => {
                                    return (openBlock(), createElementBlock("div", {
                                      key: field.label,
                                      class: "px-5 py-3 flex items-start"
                                    }, [
                                      createBaseVNode("span", _hoisted_137, toDisplayString(field.label), 1),
                                      createBaseVNode("span", _hoisted_138, toDisplayString(field.value), 1)
                                    ]))
                                  }), 128))
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_139, [
                                createBaseVNode("div", _hoisted_140, [
                                  _cache[67] || (_cache[67] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Approval Lifecycle")
                                  ], -1)),
                                  createBaseVNode("div", _hoisted_141, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(approvalSteps.value, (step) => {
                                      return (openBlock(), createElementBlock("div", {
                                        key: step.stage,
                                        class: "flex items-start gap-3"
                                      }, [
                                        createBaseVNode("div", _hoisted_142, [
                                          createBaseVNode("div", {
                                            class: normalizeClass(['w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]',
                      step.done ? 'bg-absa-passion text-white' : step.active ? 'bg-absa-energy text-white' : 'bg-gray-200 text-gray-400'])
                                          }, [
                                            (step.done)
                                              ? (openBlock(), createElementBlock("i", _hoisted_143))
                                              : (step.active)
                                                ? (openBlock(), createElementBlock("i", _hoisted_144))
                                                : createCommentVNode("", true)
                                          ], 2),
                                          (step.stage !== 'Production')
                                            ? (openBlock(), createElementBlock("div", _hoisted_145))
                                            : createCommentVNode("", true)
                                        ]),
                                        createBaseVNode("div", _hoisted_146, [
                                          createBaseVNode("p", {
                                            class: normalizeClass(["text-xs font-bold", step.done ? 'text-absa-passion' : step.active ? 'text-absa-energy' : 'text-gray-400'])
                                          }, toDisplayString(step.stage), 3),
                                          createBaseVNode("p", _hoisted_147, toDisplayString(step.detail), 1)
                                        ])
                                      ]))
                                    }), 128))
                                  ])
                                ]),
                                _cache[68] || (_cache[68] = createStaticVNode("<div class=\"border border-status-warning/30 bg-status-warning/10 rounded-sm p-4\"><p class=\"text-[11px] font-bold text-status-warning uppercase tracking-wider mb-3\">Risk Classification</p><div class=\"space-y-2 text-xs\"><div class=\"flex justify-between\"><span class=\"text-gray-600\">Model Risk Tier</span><span class=\"font-bold text-status-warning\">HIGH</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Next Validation Due</span><span class=\"font-bold text-absa-enrich\">2025-12-31</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Annual Review</span><span class=\"font-bold text-status-success\">Completed</span></div><div class=\"flex justify-between\"><span class=\"text-gray-600\">Materiality</span><span class=\"font-bold text-status-warning\">HIGH</span></div></div></div>", 1))
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_148, [
                              _cache[70] || (_cache[70] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                                createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Model Change & Validation Log"),
                                createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Immutable audit trail of all model events")
                              ], -1)),
                              createBaseVNode("table", _hoisted_149, [
                                _cache[69] || (_cache[69] = createBaseVNode("thead", null, [
                                  createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                                    createBaseVNode("th", { class: "px-5 py-3" }, "Date"),
                                    createBaseVNode("th", { class: "px-4 py-3" }, "Event"),
                                    createBaseVNode("th", { class: "px-4 py-3" }, "Version"),
                                    createBaseVNode("th", { class: "px-4 py-3" }, "AUC-ROC"),
                                    createBaseVNode("th", { class: "px-4 py-3" }, "Actioned By"),
                                    createBaseVNode("th", { class: "px-4 py-3" }, "Status")
                                  ])
                                ], -1)),
                                createBaseVNode("tbody", _hoisted_150, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(auditLog.value, (row) => {
                                    return (openBlock(), createElementBlock("tr", {
                                      key: row.date,
                                      class: "hover:bg-gray-50 transition-colors"
                                    }, [
                                      createBaseVNode("td", _hoisted_151, toDisplayString(row.date), 1),
                                      createBaseVNode("td", _hoisted_152, toDisplayString(row.event), 1),
                                      createBaseVNode("td", _hoisted_153, toDisplayString(row.version), 1),
                                      createBaseVNode("td", _hoisted_154, toDisplayString(row.auc), 1),
                                      createBaseVNode("td", _hoisted_155, toDisplayString(row.actor), 1),
                                      createBaseVNode("td", _hoisted_156, [
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
                        : (activeTab.value === 'audit')
                          ? (openBlock(), createElementBlock("div", _hoisted_157, [
                              createBaseVNode("div", _hoisted_158, [
                                createBaseVNode("div", null, [
                                  _cache[71] || (_cache[71] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Live Prediction Log", -1)),
                                  createBaseVNode("p", _hoisted_159, "Real-time inference stream from production endpoint · " + toDisplayString(predictionTotal.value.toLocaleString()) + " total predictions", 1)
                                ]),
                                createBaseVNode("div", _hoisted_160, [
                                  withDirectives(createBaseVNode("select", {
                                    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((selectedTimeframe).value = $event)),
                                    class: "appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-absa-passion cursor-pointer"
                                  }, [...(_cache[72] || (_cache[72] = [
                                    createBaseVNode("option", null, "Last 1 Hour", -1),
                                    createBaseVNode("option", null, "Last 24 Hours", -1),
                                    createBaseVNode("option", null, "Last 7 Days", -1)
                                  ]))], 512), [
                                    [vModelSelect, selectedTimeframe.value]
                                  ]),
                                  _cache[73] || (_cache[73] = createBaseVNode("button", { class: "px-3 py-1.5 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 text-xs font-semibold hover:bg-gray-50" }, [
                                    createBaseVNode("i", { class: "fa-solid fa-download text-[11px]" }),
                                    createTextVNode(" Export ")
                                  ], -1))
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_161, [
                                createBaseVNode("table", _hoisted_162, [
                                  _cache[75] || (_cache[75] = createBaseVNode("thead", null, [
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
                                  createBaseVNode("tbody", _hoisted_163, [
                                    (predictionLogs.value.length === 0)
                                      ? (openBlock(), createElementBlock("tr", _hoisted_164, [...(_cache[74] || (_cache[74] = [
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
                                        createBaseVNode("td", _hoisted_165, toDisplayString(log.timestamp), 1),
                                        createBaseVNode("td", _hoisted_166, toDisplayString(log.correlationId), 1),
                                        createBaseVNode("td", _hoisted_167, toDisplayString(log.customerId), 1),
                                        createBaseVNode("td", _hoisted_168, [
                                          createBaseVNode("div", _hoisted_169, [
                                            createBaseVNode("div", _hoisted_170, [
                                              createBaseVNode("div", {
                                                class: normalizeClass(["h-full rounded-full", log.probValue > 0.6 ? 'bg-absa-inspire' : log.probValue > 0.3 ? 'bg-absa-energy' : 'bg-absa-passion']),
                                                style: normalizeStyle({width: (log.probValue*100)+'%'})
                                              }, null, 6)
                                            ]),
                                            createBaseVNode("span", _hoisted_171, toDisplayString(log.prob), 1)
                                          ])
                                        ]),
                                        createBaseVNode("td", _hoisted_172, [
                                          createBaseVNode("span", {
                                            class: normalizeClass(['px-2 py-0.5 rounded-sm font-bold text-[10px]', log.riskBandClass])
                                          }, toDisplayString(log.riskBand), 3)
                                        ]),
                                        createBaseVNode("td", {
                                          class: normalizeClass(["px-4 py-3 font-bold font-sans text-xs", log.classColor])
                                        }, toDisplayString(log.class), 3),
                                        createBaseVNode("td", _hoisted_173, toDisplayString(log.latency), 1)
                                      ]))
                                    }), 128))
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_174, [
                                createBaseVNode("span", null, "Showing latest 50 of " + toDisplayString(predictionTotal.value.toLocaleString()) + " predictions", 1),
                                _cache[76] || (_cache[76] = createStaticVNode("<div class=\"flex items-center gap-2\"><button class=\"w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center\"><i class=\"fa-solid fa-chevron-left text-[10px]\"></i></button><button class=\"w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center\"><i class=\"fa-solid fa-chevron-right text-[10px]\"></i></button></div>", 1))
                              ])
                            ]))
                          : (activeTab.value === 'alerts')
                            ? (openBlock(), createElementBlock(Fragment, { key: 9 }, [
                                createBaseVNode("div", _hoisted_175, [
                                  createBaseVNode("div", _hoisted_176, [
                                    _cache[78] || (_cache[78] = createBaseVNode("div", null, [
                                      createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Active Alerts"),
                                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Requires action from model owner or risk team")
                                    ], -1)),
                                    (activeAlerts.value.length > 0)
                                      ? (openBlock(), createElementBlock("span", _hoisted_177, [
                                          _cache[77] || (_cache[77] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse" }, null, -1)),
                                          createTextVNode(toDisplayString(activeAlerts.value.length) + " Active ", 1)
                                        ]))
                                      : (openBlock(), createElementBlock("span", _hoisted_178, "All clear"))
                                  ]),
                                  (activeAlerts.value.length === 0)
                                    ? (openBlock(), createElementBlock("div", _hoisted_179, [...(_cache[79] || (_cache[79] = [
                                        createBaseVNode("i", { class: "fa-solid fa-shield-check text-2xl text-status-success mb-2" }, null, -1),
                                        createBaseVNode("p", null, "No active alerts. Model is operating within thresholds.", -1)
                                      ]))]))
                                    : (openBlock(), createElementBlock("table", _hoisted_180, [
                                        _cache[81] || (_cache[81] = createBaseVNode("thead", null, [
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
                                        createBaseVNode("tbody", _hoisted_181, [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(activeAlerts.value, (alert) => {
                                            return (openBlock(), createElementBlock("tr", {
                                              key: alert.id,
                                              class: "hover:bg-gray-50"
                                            }, [
                                              createBaseVNode("td", _hoisted_182, [
                                                createBaseVNode("span", {
                                                  class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', alert.severityClass])
                                                }, toDisplayString(alert.severity), 3)
                                              ]),
                                              createBaseVNode("td", _hoisted_183, toDisplayString(alert.feature), 1),
                                              createBaseVNode("td", _hoisted_184, toDisplayString(alert.message), 1),
                                              createBaseVNode("td", _hoisted_185, toDisplayString(alert.currentValue), 1),
                                              createBaseVNode("td", _hoisted_186, toDisplayString(alert.threshold), 1),
                                              createBaseVNode("td", _hoisted_187, toDisplayString(alert.since), 1),
                                              _cache[80] || (_cache[80] = createBaseVNode("td", { class: "px-4 py-3" }, [
                                                createBaseVNode("button", { class: "text-xs font-semibold text-absa-passion border border-absa-passion/30 px-2 py-0.5 rounded-sm hover:bg-absa-passion/10 transition-colors" }, "Investigate")
                                              ], -1))
                                            ]))
                                          }), 128))
                                        ])
                                      ]))
                                ]),
                                createBaseVNode("div", _hoisted_188, [
                                  _cache[83] || (_cache[83] = createBaseVNode("div", { class: "p-4 border-b border-gray-200" }, [
                                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Resolved Alert History")
                                  ], -1)),
                                  createBaseVNode("table", _hoisted_189, [
                                    _cache[82] || (_cache[82] = createBaseVNode("thead", null, [
                                      createBaseVNode("tr", { class: "border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50" }, [
                                        createBaseVNode("th", { class: "px-5 py-3" }, "Feature"),
                                        createBaseVNode("th", { class: "px-4 py-3" }, "Alert"),
                                        createBaseVNode("th", { class: "px-4 py-3" }, "Triggered"),
                                        createBaseVNode("th", { class: "px-4 py-3" }, "Resolved"),
                                        createBaseVNode("th", { class: "px-4 py-3" }, "Resolution")
                                      ])
                                    ], -1)),
                                    createBaseVNode("tbody", _hoisted_190, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(resolvedAlerts.value, (row) => {
                                        return (openBlock(), createElementBlock("tr", {
                                          key: row.feature + row.triggered,
                                          class: "hover:bg-gray-50 transition-colors"
                                        }, [
                                          createBaseVNode("td", _hoisted_191, toDisplayString(row.feature), 1),
                                          createBaseVNode("td", _hoisted_192, toDisplayString(row.alert), 1),
                                          createBaseVNode("td", _hoisted_193, toDisplayString(row.triggered), 1),
                                          createBaseVNode("td", _hoisted_194, toDisplayString(row.resolved), 1),
                                          createBaseVNode("td", _hoisted_195, toDisplayString(row.resolution), 1)
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
