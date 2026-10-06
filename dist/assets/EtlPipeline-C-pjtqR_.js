import { _ as _export_sfc, r as ref, f as onMounted, i as computed, Q as axios, R as API_BASE_URL, c as createElementBlock, b as createBaseVNode, h as normalizeClass, A as createTextVNode, t as toDisplayString, j as createCommentVNode, n as normalizeStyle, C as createBlock, a as createStaticVNode, F as Fragment, e as renderList, v as withModifiers, x as withDirectives, y as vModelText, s as unref, T as Teleport, o as openBlock } from './index-_vIa0xlU.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-ufHhXLkC.js';
import { u as useETLStore } from './etlStore-X-lq8yWQ.js';
import { useSnapshotStore } from './snapshotStore-Bol18Xlu.js';
import './etlApi-DwnxMriz.js';

const _hoisted_1 = { class: "min-h-screen bg-gray-50 flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 shrink-0 relative z-0" };
const _hoisted_3 = { class: "max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-6" };
const _hoisted_4 = { class: "flex flex-col md:flex-row justify-between md:items-center gap-4" };
const _hoisted_5 = { class: "flex flex-wrap items-center gap-3" };
const _hoisted_6 = ["disabled"];
const _hoisted_7 = { class: "flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20" };
const _hoisted_8 = {
  key: 0,
  class: "bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern"
};
const _hoisted_9 = { class: "relative z-10 flex flex-col gap-4" };
const _hoisted_10 = { class: "flex justify-between items-center" };
const _hoisted_11 = { class: "text-[10px] font-black uppercase tracking-widest text-gray-900" };
const _hoisted_12 = {
  key: 0,
  class: "text-gray-400 ml-2"
};
const _hoisted_13 = { class: "text-[10px] font-black text-gray-500 uppercase tracking-widest" };
const _hoisted_14 = { class: "w-full h-2 bg-gray-100 overflow-hidden relative" };
const _hoisted_15 = {
  key: 0,
  class: "text-[10px] font-black text-green-600 uppercase tracking-widest"
};
const _hoisted_16 = {
  key: 2,
  class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
};
const _hoisted_17 = { class: "bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]" };
const _hoisted_18 = { class: "relative z-10 mt-auto" };
const _hoisted_19 = { class: "flex items-end gap-3 mt-1" };
const _hoisted_20 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2" };
const _hoisted_21 = { class: "bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]" };
const _hoisted_22 = { class: "relative z-10 mt-auto" };
const _hoisted_23 = { class: "flex items-end gap-3 mt-1" };
const _hoisted_24 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2" };
const _hoisted_25 = { class: "bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]" };
const _hoisted_26 = { class: "flex justify-between items-start mb-6 relative z-10" };
const _hoisted_27 = { class: "relative z-10 mt-auto" };
const _hoisted_28 = { class: "flex items-end gap-3 mt-1" };
const _hoisted_29 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2" };
const _hoisted_30 = { class: "bg-white p-3 border border-gray-200 flex flex-col relative z-0" };
const _hoisted_31 = { class: "flex justify-between items-center p-3 border-b border-gray-100" };
const _hoisted_32 = { class: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" };
const _hoisted_33 = { class: "text-gray-900" };
const _hoisted_34 = { class: "h-[160px] w-full pt-4 px-2" };
const _hoisted_35 = {
  viewBox: "0 0 800 160",
  preserveAspectRatio: "none",
  class: "w-full h-full"
};
const _hoisted_36 = ["y1", "y2"];
const _hoisted_37 = ["points"];
const _hoisted_38 = ["points"];
const _hoisted_39 = { class: "relative z-0 bg-white border border-gray-200 overflow-hidden" };
const _hoisted_40 = { class: "overflow-x-auto" };
const _hoisted_41 = { class: "w-full text-left border-collapse" };
const _hoisted_42 = { class: "divide-y divide-gray-200" };
const _hoisted_43 = { class: "px-4 py-3" };
const _hoisted_44 = { class: "text-[11px] font-black text-absa-passion uppercase" };
const _hoisted_45 = { class: "px-4 py-3" };
const _hoisted_46 = { class: "text-[11px] font-black text-gray-900 uppercase" };
const _hoisted_47 = { class: "px-4 py-3" };
const _hoisted_48 = { class: "text-[10px] font-black text-gray-900 uppercase" };
const _hoisted_49 = { class: "px-4 py-3" };
const _hoisted_50 = { class: "flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase" };
const _hoisted_51 = { class: "text-gray-900" };
const _hoisted_52 = { class: "text-green-600" };
const _hoisted_53 = { class: "text-blue-600" };
const _hoisted_54 = { class: "text-red-600" };
const _hoisted_55 = { class: "px-4 py-3" };
const _hoisted_56 = { class: "px-4 py-3 text-right" };
const _hoisted_57 = { class: "bg-white rounded-none w-full max-w-xl overflow-hidden shadow-2xl relative border border-gray-200" };
const _hoisted_58 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10" };
const _hoisted_59 = ["disabled"];
const _hoisted_60 = { class: "p-5 space-y-5 relative z-10 bg-white/50" };
const _hoisted_61 = { class: "flex items-center gap-3" };
const _hoisted_62 = ["disabled", "max"];
const _hoisted_63 = { class: "space-y-2" };
const _hoisted_64 = { class: "flex items-center gap-3 px-4 py-3" };
const _hoisted_65 = {
  key: 0,
  class: "text-[10px] font-bold"
};
const _hoisted_66 = {
  key: 1,
  class: "fas fa-circle-notch fa-spin text-[10px]"
};
const _hoisted_67 = {
  key: 2,
  class: "fas fa-check text-[10px]"
};
const _hoisted_68 = {
  key: 3,
  class: "fas fa-times text-[10px]"
};
const _hoisted_69 = { class: "flex-1 min-w-0" };
const _hoisted_70 = {
  key: 0,
  class: "text-[9px] text-gray-400 mt-0.5 truncate"
};
const _hoisted_71 = {
  key: 0,
  class: "fas fa-clock mr-1"
};
const _hoisted_72 = {
  key: 0,
  class: "border-t border-gray-100 px-4 pb-3 pt-2 bg-gray-50 space-y-2"
};
const _hoisted_73 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_74 = {
  key: 0,
  class: "fas fa-check"
};
const _hoisted_75 = {
  key: 1,
  class: "fas fa-circle-notch fa-spin"
};
const _hoisted_76 = {
  key: 2,
  class: "fas fa-circle",
  style: {"font-size":"4px"}
};
const _hoisted_77 = {
  key: 3,
  class: "text-gray-200 mx-0.5"
};
const _hoisted_78 = { class: "w-full h-1.5 bg-gray-200 overflow-hidden" };
const _hoisted_79 = {
  key: 0,
  class: "text-[9px] font-black text-gray-500 uppercase tracking-widest"
};
const _hoisted_80 = { class: "px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3" };
const _hoisted_81 = ["disabled"];
const _hoisted_82 = ["disabled"];
const _hoisted_83 = {
  key: 0,
  class: "fas fa-play text-[9px]"
};
const _hoisted_84 = {
  key: 1,
  class: "fas fa-circle-notch fa-spin text-[9px]"
};


const _sfc_main = {
  __name: 'EtlPipeline',
  setup(__props) {

const store = useETLStore();

const isExtracting = ref(false);
const extractionProgress = ref(null);
let progressInterval = null;

const fetchExtractionProgress = async () => {
  try {
    const { data } = await api.get('/features/extract-historical/status');
    if (data && data.status !== 'idle') {
      extractionProgress.value = data;
      isExtracting.value = data.status === 'running' || data.status === 'started';
      if (!isExtracting.value && progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }
  } catch (err) {
    console.error('Failed to fetch extraction progress', err);
  }
};

onMounted(() => {
  fetchExtractionProgress();
  progressInterval = setInterval(fetchExtractionProgress, 2000);
});

const triggerHistoricalExtraction = async () => {
  if (isExtracting.value) return;
  isExtracting.value = true;
  extractionProgress.value = { status: 'started', current: 0, total: 24, current_date: '' };
  try {
    await api.post('/features/extract-historical');
    if (!progressInterval) {
      progressInterval = setInterval(fetchExtractionProgress, 2000);
    }
  } catch (err) {
    console.error('Failed to start historical extraction', err);
    alert('Failed to start extraction.');
    isExtracting.value = false;
  }
};

const snapshotStore = useSnapshotStore();
const loading = computed(() => store.loading);

const api = axios.create({ baseURL: API_BASE_URL, timeout: 300000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

// ── System Health from KPIs ──
const pgStatus = computed(() => store.statusPanel?.current_status || '--');
const redisStatus = computed(() => store.statusPanel?.current_status || '--');
const gatewayStatus = computed(() => store.statusPanel?.current_status || '--');
const pgLatency = computed(() => {
  const v = store.kpis?.avg_duration;
  return v || '--'
});
const redisMemory = computed(() => '--');
const gatewayUptime = computed(() => {
  const v = store.statusPanel?.current_status_since;
  return v ? new Date(v).toLocaleDateString() : '--'
});

// ── Quality Trend ──
const qualityTrend = computed(() => store.qualityTrend || []);
const qualityPoints = computed(() => qualityTrend.value.map(r => r.value ?? 0));

const qualityLine = computed(() => {
  const w = 800; const h = 160; const min = 90;
  const pts = qualityPoints.value;
  if (pts.length < 2) return '0,0 800,0'
  return pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((Math.max(v, min) - min) / (100 - min)) * h}`).join(' ')
});

const qualityArea = computed(() => {
  const w = 800; const h = 160; const min = 90;
  const pts = qualityPoints.value;
  if (pts.length < 2) return `0,${h} 800,${h}`
  const line = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((Math.max(v, min) - min) / (100 - min)) * h}`);
  return `0,${h} ${line.join(' ')} ${w},${h}`
});

const avgQuality = computed(() => {
  const pts = qualityPoints.value;
  if (pts.length === 0) return '--'
  return (pts.reduce((a, b) => a + b, 0) / pts.length).toFixed(1) + '%'
});

// ── Execution History ──
const executionHistory = computed(() =>
  store.runs.map(r => ({
    id: r.id || r.runId,
    runId: (r.runId || '').slice(0, 12) || '--',
    batchId: (r.batchId || '').slice(0, 12) || '--',
    duration: r.duration || '--',
    rowsReceived: r.rowsReceived ?? '--',
    rowsValid: r.rowsValid ?? '--',
    rowsLoaded: r.rowsLoaded ?? '--',
    rowsRejected: r.rowsRejected ?? 0,
    qualityScore: r.qualityScore ?? 0,
    qualityClass: (r.qualityScore ?? 0) >= 95 ? 'green' : (r.qualityScore ?? 0) >= 80 ? 'amber' : 'red',
    status: r.status || 'UNKNOWN',
    statusClass: r.status === 'COMPLETED' ? 'green' : r.status === 'FAILED' ? 'red' : 'amber',
  }))
);

// ── Bottom Stats ──
computed(() => store.totalRuns || '--');
computed(() => store.kpis?.failed_runs || 0);

// ────────────────────────────────────────────────────────────────
// Pipeline Runner
// ────────────────────────────────────────────────────────────────
const todayStr = new Date().toISOString().slice(0, 10);
const showRunModal = ref(false);
const isRunning = ref(false);
const runDate = ref(todayStr);
const runResult = ref(null);

// ── Per-step elapsed timers ──
const stepTimers = ref({});
const stepIntervals = {};

function startStepTimer(stepId) {
  stepTimers.value[stepId] = 0;
  stepIntervals[stepId] = setInterval(() => {
    stepTimers.value[stepId] = (stepTimers.value[stepId] || 0) + 1;
  }, 1000);
}

function stopStepTimer(stepId) {
  if (stepIntervals[stepId]) {
    clearInterval(stepIntervals[stepId]);
    delete stepIntervals[stepId];
  }
}

function formatElapsed(seconds) {
  if (seconds === undefined || seconds === null) return ''
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// ── Extraction sub-step progress bar ──
const EXTRACTION_SUB_STEPS = [
  { key: 'connecting',  label: 'Connecting to Denodo / Hadoop' },
  { key: 'streaming',   label: 'Streaming rows from source'    },
  { key: 'validating',  label: 'Validating & transforming'     },
  { key: 'loading',     label: 'Loading into PostgreSQL'       },
  { key: 'ml_features', label: 'Building ML feature tables'    },
];
const extractionSubStep = ref(0);
const liveRowsLoaded = ref(null);
let extractionPollInterval = null;

function startExtractionPoll() {
  extractionSubStep.value = 0;
  liveRowsLoaded.value = null;
  let tick = 0;

  extractionPollInterval = setInterval(async () => {
    tick++;
    // Auto-advance sub-step every ~10s through first phases
    if (extractionSubStep.value < 3 && tick % 5 === 0) {
      extractionSubStep.value = Math.min(extractionSubStep.value + 1, 3);
    }
    // Poll live row counts from the audit table
    try {
      const { data } = await api.get('/api/etl/runs?limit=1');
      const latest = data?.runs?.[0] || data?.[0];
      if (latest) {
        const loaded = latest.rowsLoaded ?? latest.rows_loaded ?? null;
        if (loaded !== null && loaded > 0) {
          liveRowsLoaded.value = loaded;
          extractionSubStep.value = Math.max(extractionSubStep.value, 2);
        }
      }
    } catch (_) { /* silently ignore */ }
  }, 2000);
}

function stopExtractionPoll(success) {
  if (extractionPollInterval) {
    clearInterval(extractionPollInterval);
    extractionPollInterval = null;
  }
  if (success) extractionSubStep.value = EXTRACTION_SUB_STEPS.length - 1;
}

const pipelineSteps = ref([
  { id: 'extraction',  label: '1 — Data Extraction',  detail: '', status: 'idle' },
  { id: 'features',    label: '2 — Feature Engine',   detail: '', status: 'idle' },
  { id: 'states',      label: '3 — State Engine',     detail: '', status: 'idle' },
  { id: 'predictions', label: '4 — Prediction Batch', detail: '', status: 'idle' },
]);

function resetSteps() {
  pipelineSteps.value.forEach(s => { s.status = 'idle'; s.detail = ''; });
  runResult.value = null;
  stepTimers.value = {};
  Object.keys(stepIntervals).forEach(k => { clearInterval(stepIntervals[k]); delete stepIntervals[k]; });
  stopExtractionPoll(false);
  extractionSubStep.value = 0;
  liveRowsLoaded.value = null;
}

function openPipelineRunner() {
  resetSteps();
  showRunModal.value = true;
}

function closeRunModal() {
  if (isRunning.value) return
  showRunModal.value = false;
}

async function startPipeline() {
  if (isRunning.value) return
  isRunning.value = true;
  resetSteps();
  const date = runDate.value;

  const stepConfigs = [
    {
      id: 'extraction',
      label: 'Data Extraction',
      call: () => api.post('/api/etl/trigger', {
        config_name: 'customer_360.yaml',
        sync: true,
        source_type: 'denodo',
        snapshot: date,
        force: true,
        run_models: 'shared,churn,clv,lifecycle,balance',
      }),
      summary: (d) => `Extraction complete — ${liveRowsLoaded.value !== null ? liveRowsLoaded.value.toLocaleString() + ' rows loaded' : 'Config: ' + (d?.config_name ?? 'customer_360.yaml')}`,
    },
    {
      id: 'features',
      label: 'Feature Engine',
      call: () => api.post('/features/compute-batch', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_processed ?? d?.rows_processed ?? '?'} customers processed`,
    },
    {
      id: 'states',
      label: 'State Engine',
      call: () => api.post('/api/v1/customers/compute-states', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_processed ?? '?'} classified, ${d?.states_upserted ?? '?'} upserted`,
    },
    {
      id: 'predictions',
      label: 'Prediction Batch',
      call: () => api.post('/api/v1/predictions/batch', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_scored ?? '?'} customers scored`,
    },
  ];

  let allOk = true;
  for (const cfg of stepConfigs) {
    const step = pipelineSteps.value.find(s => s.id === cfg.id);
    step.status = 'running';
    step.detail = 'In progress…';
    startStepTimer(cfg.id);
    if (cfg.id === 'extraction') startExtractionPoll();

    try {
      const { data } = await cfg.call();
      stopStepTimer(cfg.id);
      if (cfg.id === 'extraction') stopExtractionPoll(true);
      step.status = 'done';
      step.detail = cfg.summary(data);
    } catch (e) {
      stopStepTimer(cfg.id);
      if (cfg.id === 'extraction') stopExtractionPoll(false);
      step.status = 'error';
      step.detail = e?.response?.data?.detail || e.message || 'Request failed';
      allOk = false;
      break
    }
  }

  isRunning.value = false;

  if (allOk) {
    runResult.value = { ok: true, message: `Pipeline complete for ${date}. Snapshot selector updated.` };
    await snapshotStore.fetchAvailable();
    snapshotStore.setDate(date);
    store.loadDashboard();
  } else {
    runResult.value = { ok: false, message: 'Pipeline stopped at error above. Fix the issue and re-run.' };
  }
}

onMounted(() => {
  store.loadDashboard();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[33] || (_cache[33] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _cache[3] || (_cache[3] = createBaseVNode("div", null, [
            createBaseVNode("h1", { class: "text-2xl font-black text-gray-900 uppercase tracking-tight" }, "Data Pipeline Health"),
            createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1" }, "Monitoring ingestion, transformation, and quality across all data sources")
          ], -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("button", {
              onClick: triggerHistoricalExtraction,
              disabled: isExtracting.value,
              class: "h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion disabled:opacity-50"
            }, [
              createBaseVNode("i", {
                class: normalizeClass(["fas", isExtracting.value ? 'fa-circle-notch fa-spin' : 'fa-history'])
              }, null, 2),
              createTextVNode(" " + toDisplayString(isExtracting.value ? 'Extracting...' : 'Extract Historical Data'), 1)
            ], 8, _hoisted_6),
            _cache[2] || (_cache[2] = createBaseVNode("button", { class: "h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion" }, [
              createBaseVNode("i", { class: "fas fa-file-export" }),
              createTextVNode(" Export Logs ")
            ], -1)),
            createBaseVNode("button", {
              onClick: openPipelineRunner,
              class: "h-9 px-5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-absa-power cursor-pointer"
            }, [...(_cache[1] || (_cache[1] = [
              createBaseVNode("i", { class: "fas fa-play" }, null, -1),
              createTextVNode(" Trigger Manual Run ", -1)
            ]))])
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_7, [
      (extractionProgress.value && extractionProgress.value.status !== 'idle')
        ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  _cache[4] || (_cache[4] = createTextVNode(" Historical Extraction ", -1)),
                  (extractionProgress.value.status === 'running')
                    ? (openBlock(), createElementBlock("span", _hoisted_12, "- Processing " + toDisplayString(extractionProgress.value.current_date), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_13, toDisplayString(Math.round((extractionProgress.value.current / extractionProgress.value.total) * 100) || 0) + "% (" + toDisplayString(extractionProgress.value.current) + " / " + toDisplayString(extractionProgress.value.total) + " Months) ", 1)
              ]),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", {
                  class: "absolute inset-y-0 left-0 bg-absa-passion transition-all duration-300",
                  style: normalizeStyle({ width: ((extractionProgress.value.current / extractionProgress.value.total) * 100) + '%' })
                }, null, 4)
              ]),
              (extractionProgress.value.status === 'completed')
                ? (openBlock(), createElementBlock("div", _hoisted_15, " Historical Extraction Completed Successfully! "))
                : createCommentVNode("", true)
            ])
          ]))
        : createCommentVNode("", true),
      (loading.value)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 1,
            type: "stats"
          }))
        : (openBlock(), createElementBlock("div", _hoisted_16, [
            createBaseVNode("div", _hoisted_17, [
              _cache[6] || (_cache[6] = createStaticVNode("<div class=\"absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity\" data-v-74e196c3></div><div class=\"absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20\" data-v-74e196c3>PostgreSQL</div><div class=\"flex justify-between items-start mb-6 relative z-10\" data-v-74e196c3><div class=\"text-gray-400\" data-v-74e196c3><i class=\"fas fa-database text-lg\" data-v-74e196c3></i></div><span class=\"w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]\" data-v-74e196c3></span></div>", 3)),
              createBaseVNode("div", _hoisted_18, [
                _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest" }, "Cluster Status", -1)),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-3xl font-black tracking-tighter", pgStatus.value === 'Operational' ? 'text-green-600' : 'text-amber-600'])
                  }, toDisplayString(pgStatus.value), 3)
                ]),
                createBaseVNode("p", _hoisted_20, "Avg Duration: " + toDisplayString(pgLatency.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              _cache[8] || (_cache[8] = createStaticVNode("<div class=\"absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity\" data-v-74e196c3></div><div class=\"absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20\" data-v-74e196c3>Redis Cache</div><div class=\"flex justify-between items-start mb-6 relative z-10\" data-v-74e196c3><div class=\"text-gray-400\" data-v-74e196c3><i class=\"fas fa-bolt text-lg\" data-v-74e196c3></i></div><span class=\"w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]\" data-v-74e196c3></span></div>", 3)),
              createBaseVNode("div", _hoisted_22, [
                _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest" }, "Cache Status", -1)),
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-3xl font-black tracking-tighter", redisStatus.value === 'Operational' ? 'text-green-600' : 'text-amber-600'])
                  }, toDisplayString(redisStatus.value), 3)
                ]),
                createBaseVNode("p", _hoisted_24, "Memory: " + toDisplayString(redisMemory.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_25, [
              _cache[11] || (_cache[11] = createBaseVNode("div", { class: "absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity" }, null, -1)),
              _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20" }, "API Gateway", -1)),
              createBaseVNode("div", _hoisted_26, [
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-gray-400" }, [
                  createBaseVNode("i", { class: "fas fa-network-wired text-lg" })
                ], -1)),
                createBaseVNode("span", {
                  class: normalizeClass(["w-2.5 h-2.5 rounded-full", gatewayStatus.value === 'Operational' ? 'bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]' : 'bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.2)]'])
                }, null, 2)
              ]),
              createBaseVNode("div", _hoisted_27, [
                _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest" }, "Gateway Status", -1)),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-3xl font-black tracking-tighter", gatewayStatus.value === 'Operational' ? 'text-green-600' : 'text-amber-600'])
                  }, toDisplayString(gatewayStatus.value), 3)
                ]),
                createBaseVNode("p", _hoisted_29, "Uptime: " + toDisplayString(gatewayUptime.value), 1)
              ])
            ])
          ])),
      createBaseVNode("div", _hoisted_30, [
        createBaseVNode("div", _hoisted_31, [
          createBaseVNode("div", null, [
            _cache[14] || (_cache[14] = createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "Quality Score Trend", -1)),
            createBaseVNode("p", _hoisted_32, [
              _cache[13] || (_cache[13] = createTextVNode("Data Integrity Score: ", -1)),
              createBaseVNode("strong", _hoisted_33, toDisplayString(avgQuality.value), 1),
              createTextVNode(" • " + toDisplayString(qualityTrend.value.length) + " data points", 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_34, [
          (openBlock(), createElementBlock("svg", _hoisted_35, [
            _cache[15] || (_cache[15] = createBaseVNode("defs", null, [
              createBaseVNode("linearGradient", {
                id: "qualityGrad",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1"
              }, [
                createBaseVNode("stop", {
                  offset: "0%",
                  "stop-color": "rgba(220,0,55,0.25)"
                }),
                createBaseVNode("stop", {
                  offset: "100%",
                  "stop-color": "rgba(220,0,55,0.02)"
                })
              ])
            ], -1)),
            (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
              return createBaseVNode("line", {
                key: 'g'+i,
                x1: "0",
                y1: i*40,
                x2: "800",
                y2: i*40,
                stroke: "#F3F4F6",
                "stroke-width": "1"
              }, null, 8, _hoisted_36)
            }), 64)),
            createBaseVNode("polygon", {
              points: qualityArea.value,
              fill: "url(#qualityGrad)"
            }, null, 8, _hoisted_37),
            createBaseVNode("polyline", {
              points: qualityLine.value,
              fill: "none",
              stroke: "#DC0037",
              "stroke-width": "2.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_38),
            _cache[16] || (_cache[16] = createBaseVNode("line", {
              x1: "0",
              y1: "30",
              x2: "800",
              y2: "30",
              stroke: "#F59E0B",
              "stroke-width": "1.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            _cache[17] || (_cache[17] = createBaseVNode("text", {
              x: "805",
              y: "34",
              fill: "#F59E0B",
              "font-size": "10",
              "font-family": "monospace"
            }, "90%", -1))
          ]))
        ])
      ]),
      createBaseVNode("div", null, [
        _cache[25] || (_cache[25] = createBaseVNode("div", { class: "bg-white p-3 border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between relative z-0 transition-colors hover:border-absa-passion border-b-0" }, [
          createBaseVNode("div", { class: "flex items-center gap-3" }, [
            createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight ml-2" }, "Execution History"),
            createBaseVNode("span", { class: "px-2 py-0.5 bg-red-50 text-absa-passion border border-red-100 text-[9px] font-black uppercase tracking-widest" }, "Today")
          ])
        ], -1)),
        createBaseVNode("div", _hoisted_39, [
          createBaseVNode("div", _hoisted_40, [
            createBaseVNode("table", _hoisted_41, [
              _cache[24] || (_cache[24] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-200" }, [
                createBaseVNode("tr", null, [
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Run ID"),
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Batch ID"),
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Duration"),
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Rows R/V/L/R"),
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Quality"),
                  createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right" }, "Status")
                ])
              ], -1)),
              createBaseVNode("tbody", _hoisted_42, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(executionHistory.value, (run) => {
                  return (openBlock(), createElementBlock("tr", {
                    key: run.id,
                    class: "hover:bg-gray-50 transition-colors group"
                  }, [
                    createBaseVNode("td", _hoisted_43, [
                      createBaseVNode("div", _hoisted_44, toDisplayString(run.id), 1)
                    ]),
                    createBaseVNode("td", _hoisted_45, [
                      createBaseVNode("div", _hoisted_46, toDisplayString(run.batchId), 1)
                    ]),
                    createBaseVNode("td", _hoisted_47, [
                      createBaseVNode("div", _hoisted_48, toDisplayString(run.duration), 1)
                    ]),
                    createBaseVNode("td", _hoisted_49, [
                      createBaseVNode("div", _hoisted_50, [
                        createBaseVNode("span", _hoisted_51, toDisplayString(run.rowsReceived), 1),
                        _cache[18] || (_cache[18] = createTextVNode()),
                        _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-gray-300" }, "/", -1)),
                        createBaseVNode("span", _hoisted_52, toDisplayString(run.rowsValid), 1),
                        _cache[20] || (_cache[20] = createTextVNode()),
                        _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-gray-300" }, "/", -1)),
                        createBaseVNode("span", _hoisted_53, toDisplayString(run.rowsLoaded), 1),
                        _cache[22] || (_cache[22] = createTextVNode()),
                        _cache[23] || (_cache[23] = createBaseVNode("span", { class: "text-gray-300" }, "/", -1)),
                        createBaseVNode("span", _hoisted_54, toDisplayString(run.rowsRejected), 1)
                      ])
                    ]),
                    createBaseVNode("td", _hoisted_55, [
                      createBaseVNode("div", {
                        class: normalizeClass(["text-[11px] font-black uppercase", run.qualityScore >= 90 ? 'text-green-600' : 'text-amber-600'])
                      }, toDisplayString(run.qualityScore) + "% ", 3)
                    ]),
                    createBaseVNode("td", _hoisted_56, [
                      createBaseVNode("span", {
                        class: normalizeClass(["inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-widest", run.status === 'SUCCESS' ? 'text-green-600 bg-green-50 border-green-200' : run.status === 'FAILED' ? 'text-red-600 bg-red-50 border-red-200' : 'text-amber-600 bg-amber-50 border-amber-200'])
                      }, toDisplayString(run.status), 3)
                    ])
                  ]))
                }), 128))
              ])
            ])
          ])
        ])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showRunModal.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md",
            onClick: withModifiers(closeRunModal, ["self"])
          }, [
            createBaseVNode("div", _hoisted_57, [
              _cache[32] || (_cache[32] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-30" }, null, -1)),
              createBaseVNode("div", _hoisted_58, [
                _cache[27] || (_cache[27] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                  createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion shrink-0" }),
                  createBaseVNode("h3", { class: "text-xs font-bold uppercase tracking-widest text-gray-900" }, "Run AI Pipeline")
                ], -1)),
                createBaseVNode("button", {
                  onClick: closeRunModal,
                  disabled: isRunning.value,
                  class: "text-gray-400 hover:text-absa-passion transition-colors disabled:opacity-50"
                }, [...(_cache[26] || (_cache[26] = [
                  createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                ]))], 8, _hoisted_59)
              ]),
              createBaseVNode("div", _hoisted_60, [
                _cache[31] || (_cache[31] = createBaseVNode("div", { class: "text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed" }, " Runs Feature Engine → State Engine → Predictions in sequence for the selected date. ", -1)),
                createBaseVNode("div", null, [
                  _cache[29] || (_cache[29] = createBaseVNode("label", { class: "block text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "As-of Date", -1)),
                  createBaseVNode("div", _hoisted_61, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((runDate).value = $event)),
                      type: "date",
                      class: "border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10 font-bold text-gray-700",
                      disabled: isRunning.value,
                      max: unref(todayStr)
                    }, null, 8, _hoisted_62), [
                      [vModelText, runDate.value]
                    ]),
                    _cache[28] || (_cache[28] = createBaseVNode("span", { class: "text-[9px] text-gray-400 uppercase tracking-widest hidden sm:inline" }, "Defaults to today. Predictions are keyed by this date.", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_63, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(pipelineSteps.value, (step, index) => {
                    return (openBlock(), createElementBlock("div", {
                      key: step.id,
                      class: normalizeClass(["border border-gray-200 bg-white relative z-10 transition-colors overflow-hidden", {
              'border-absa-passion shadow-[0_0_0_1px_rgba(220,0,55,1)]': step.status === 'running',
              'border-green-500': step.status === 'done',
              'border-red-500': step.status === 'error',
              'opacity-60': step.status === 'idle'
            }])
                    }, [
                      createBaseVNode("div", _hoisted_64, [
                        createBaseVNode("div", {
                          class: normalizeClass(["flex-shrink-0 w-6 h-6 rounded-none flex items-center justify-center border", {
                  'border-gray-300 text-gray-400': step.status === 'idle',
                  'border-absa-passion text-absa-passion bg-red-50': step.status === 'running',
                  'border-green-500 text-green-500 bg-green-50': step.status === 'done',
                  'border-red-500 text-red-500 bg-red-50': step.status === 'error',
                }])
                        }, [
                          (step.status === 'idle')
                            ? (openBlock(), createElementBlock("span", _hoisted_65, toDisplayString(index + 1), 1))
                            : (step.status === 'running')
                              ? (openBlock(), createElementBlock("i", _hoisted_66))
                              : (step.status === 'done')
                                ? (openBlock(), createElementBlock("i", _hoisted_67))
                                : (step.status === 'error')
                                  ? (openBlock(), createElementBlock("i", _hoisted_68))
                                  : createCommentVNode("", true)
                        ], 2),
                        createBaseVNode("div", _hoisted_69, [
                          createBaseVNode("div", {
                            class: normalizeClass(["text-[10px] font-bold uppercase tracking-widest", {
                    'text-gray-900': step.status !== 'idle' && step.status !== 'error',
                    'text-gray-500': step.status === 'idle',
                    'text-red-600': step.status === 'error'
                  }])
                          }, toDisplayString(step.label), 3),
                          (step.detail)
                            ? (openBlock(), createElementBlock("div", _hoisted_70, toDisplayString(step.detail), 1))
                            : createCommentVNode("", true)
                        ]),
                        (step.status === 'running' || (step.status === 'done' && stepTimers.value[step.id] !== undefined))
                          ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: normalizeClass(["flex-shrink-0 text-[9px] font-black uppercase tracking-widest tabular-nums", step.status === 'running' ? 'text-absa-passion' : 'text-gray-400'])
                            }, [
                              (step.status === 'running')
                                ? (openBlock(), createElementBlock("i", _hoisted_71))
                                : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(formatElapsed(stepTimers.value[step.id])), 1)
                            ], 2))
                          : createCommentVNode("", true)
                      ]),
                      (step.id === 'extraction' && step.status === 'running')
                        ? (openBlock(), createElementBlock("div", _hoisted_72, [
                            createBaseVNode("div", _hoisted_73, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(EXTRACTION_SUB_STEPS, (sub, si) => {
                                return createBaseVNode("div", {
                                  key: sub.key,
                                  class: normalizeClass(["flex items-center gap-1 text-[8px] font-black uppercase tracking-widest", {
                    'text-absa-passion': si === extractionSubStep.value,
                    'text-green-600': si < extractionSubStep.value,
                    'text-gray-300': si > extractionSubStep.value,
                  }])
                                }, [
                                  (si < extractionSubStep.value)
                                    ? (openBlock(), createElementBlock("i", _hoisted_74))
                                    : (si === extractionSubStep.value)
                                      ? (openBlock(), createElementBlock("i", _hoisted_75))
                                      : (openBlock(), createElementBlock("i", _hoisted_76)),
                                  createTextVNode(" " + toDisplayString(sub.label) + " ", 1),
                                  (si < EXTRACTION_SUB_STEPS.length - 1)
                                    ? (openBlock(), createElementBlock("span", _hoisted_77, "›"))
                                    : createCommentVNode("", true)
                                ], 2)
                              }), 64))
                            ]),
                            createBaseVNode("div", _hoisted_78, [
                              createBaseVNode("div", {
                                class: "h-full bg-absa-passion transition-all duration-700",
                                style: normalizeStyle({ width: ((extractionSubStep.value / (EXTRACTION_SUB_STEPS.length - 1)) * 100) + '%' })
                              }, null, 4)
                            ]),
                            (liveRowsLoaded.value !== null)
                              ? (openBlock(), createElementBlock("div", _hoisted_79, [
                                  _cache[30] || (_cache[30] = createBaseVNode("i", { class: "fas fa-database mr-1" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(liveRowsLoaded.value.toLocaleString()) + " rows loaded so far… ", 1)
                                ]))
                              : createCommentVNode("", true)
                          ]))
                        : createCommentVNode("", true)
                    ], 2))
                  }), 128))
                ]),
                (runResult.value)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["flex items-center gap-2 px-4 py-3 border text-[10px] font-bold uppercase tracking-widest", runResult.value.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'])
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["fas", runResult.value.ok ? 'fa-check-circle' : 'fa-exclamation-circle'])
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(runResult.value.message), 1)
                    ], 2))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_80, [
                createBaseVNode("button", {
                  onClick: closeRunModal,
                  disabled: isRunning.value,
                  class: "px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                }, " Cancel ", 8, _hoisted_81),
                createBaseVNode("button", {
                  onClick: startPipeline,
                  disabled: isRunning.value || !!runResult.value?.ok,
                  class: "flex items-center gap-2 px-6 py-2.5 bg-absa-passion text-white text-[10px] font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors disabled:opacity-50"
                }, [
                  (!isRunning.value)
                    ? (openBlock(), createElementBlock("i", _hoisted_83))
                    : (openBlock(), createElementBlock("i", _hoisted_84)),
                  createTextVNode(" " + toDisplayString(isRunning.value ? 'Running...' : 'Run Pipeline'), 1)
                ], 8, _hoisted_82)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ]))
}
}

};
const EtlPipeline = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-74e196c3"]]);

export { EtlPipeline as default };
