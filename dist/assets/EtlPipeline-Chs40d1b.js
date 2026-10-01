import { _ as _export_sfc, r as ref, f as onMounted, i as computed, Q as axios, P as API_BASE_URL, c as createElementBlock, b as createBaseVNode, a as createStaticVNode, A as createTextVNode, t as toDisplayString, C as createBlock, v as withModifiers, x as withDirectives, y as vModelText, s as unref, F as Fragment, e as renderList, h as normalizeClass, j as createCommentVNode, T as Teleport, n as normalizeStyle, o as openBlock } from './index-D7z0QEXH.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-VRjV--zM.js';
import { u as useETLStore } from './etlStore-C3x9jEKR.js';
import { useSnapshotStore } from './snapshotStore-CCIEAf0O.js';
import './etlApi-D_iZ1Vgj.js';

const _hoisted_1 = { class: "absa-etl" };
const _hoisted_2 = { class: "absa-etl__content" };
const _hoisted_3 = { class: "absa-etl__header" };
const _hoisted_4 = { class: "absa-etl__header-right" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "pr-modal" };
const _hoisted_7 = { class: "pr-modal__header" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "pr-modal__date-row" };
const _hoisted_10 = ["disabled", "max"];
const _hoisted_11 = { class: "pr-modal__steps" };
const _hoisted_12 = { class: "pr-step__icon" };
const _hoisted_13 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_14 = {
  key: 1,
  class: "pr-spin",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_15 = {
  key: 2,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_16 = {
  key: 3,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_17 = { class: "pr-step__body" };
const _hoisted_18 = { class: "pr-step__name" };
const _hoisted_19 = {
  key: 0,
  class: "pr-step__detail"
};
const _hoisted_20 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_21 = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
};
const _hoisted_22 = { class: "pr-modal__actions" };
const _hoisted_23 = ["disabled"];
const _hoisted_24 = ["disabled"];
const _hoisted_25 = {
  key: 0,
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_26 = {
  key: 1,
  class: "pr-spin",
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_27 = {
  key: 0,
  class: "absa-etl__progress-container"
};
const _hoisted_28 = { class: "absa-etl__progress-header" };
const _hoisted_29 = { key: 0 };
const _hoisted_30 = { class: "absa-etl__progress-track" };
const _hoisted_31 = {
  key: 0,
  class: "absa-etl__progress-complete"
};
const _hoisted_32 = { class: "absa-etl__health-grid" };
const _hoisted_33 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_34 = { class: "absa-etl__health-value absa-etl__health-value--green" };
const _hoisted_35 = { class: "absa-etl__health-stat" };
const _hoisted_36 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_37 = { class: "absa-etl__health-value absa-etl__health-value--green" };
const _hoisted_38 = { class: "absa-etl__health-stat" };
const _hoisted_39 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_40 = { class: "absa-etl__health-value absa-etl__health-value--amber" };
const _hoisted_41 = { class: "absa-etl__health-stat" };
const _hoisted_42 = { class: "absa-chart-container absa-etl__quality" };
const _hoisted_43 = { class: "absa-etl__quality-header" };
const _hoisted_44 = { class: "absa-etl__quality-sub" };
const _hoisted_45 = { class: "absa-etl__quality-chart" };
const _hoisted_46 = {
  viewBox: "0 0 800 160",
  preserveAspectRatio: "none",
  class: "absa-etl__quality-svg"
};
const _hoisted_47 = ["y1", "y2"];
const _hoisted_48 = ["points"];
const _hoisted_49 = ["points"];
const _hoisted_50 = { class: "absa-etl__section" };
const _hoisted_51 = { class: "absa-etl__table-wrap" };
const _hoisted_52 = { class: "absa-etl__table" };
const _hoisted_53 = { class: "absa-etl__run-id" };
const _hoisted_54 = { class: "absa-etl__table-mono" };
const _hoisted_55 = { class: "absa-etl__table-val" };
const _hoisted_56 = { class: "absa-etl__rows" };
const _hoisted_57 = { class: "absa-etl__row-stat" };
const _hoisted_58 = { class: "absa-etl__row-stat absa-etl__row-stat--green" };
const _hoisted_59 = { class: "absa-etl__row-stat" };
const _hoisted_60 = {
  key: 0,
  class: "absa-etl__row-stat absa-etl__row-stat--red"
};
const _hoisted_61 = {
  key: 1,
  class: "absa-etl__row-stat"
};
const _hoisted_62 = { class: "absa-etl__quality-cell" };
const _hoisted_63 = { class: "absa-etl__quality-bar" };
const _hoisted_64 = { class: "absa-etl__pagination" };
const _hoisted_65 = { class: "absa-etl__stats-grid" };
const _hoisted_66 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_67 = { class: "absa-etl__stat-value" };
const _hoisted_68 = { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" };
const _hoisted_69 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_70 = { class: "absa-etl__stat-value" };
const _hoisted_71 = { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" };
const _hoisted_72 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_73 = { class: "absa-etl__stat-value" };
const _hoisted_74 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_75 = { class: "absa-etl__stat-value" };


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
const totalRuns = computed(() => store.totalRuns || '--');
const failedRetries = computed(() => store.kpis?.failed_runs || 0);

// ────────────────────────────────────────────────────────────────
// Pipeline Runner
// ────────────────────────────────────────────────────────────────
const todayStr = new Date().toISOString().slice(0, 10);
const showRunModal = ref(false);
const isRunning = ref(false);
const runDate = ref(todayStr);
const runResult = ref(null);

const pipelineSteps = ref([
    { id: 'extraction',  label: '1 A Data Extraction', detail: '', status: 'idle' },
    { id: 'features',    label: '2 A Feature Engine',  detail: '', status: 'idle' },
    { id: 'states',      label: '3 A State Engine',    detail: '', status: 'idle' },
    { id: 'predictions', label: '4 A Prediction Batch', detail: '', status: 'idle' },
  ]);

function resetSteps() {
  pipelineSteps.value.forEach(s => { s.status = 'idle'; s.detail = ''; });
  runResult.value = null;
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
      call: () => api.post('/api/etl/trigger', { config_name: 'customer_360.yaml', sync: true }),
      summary: (d) => `Extraction triggered (Config: ${d?.config_name ?? 'customer_360.yaml'})`,
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
    try {
      const { data } = await cfg.call();
      step.status = 'done';
      step.detail = cfg.summary(data);
    } catch (e) {
      step.status = 'error';
      step.detail = e?.response?.data?.detail || e.message || 'Request failed';
      allOk = false;
      break
    }
  }

  isRunning.value = false;

  if (allOk) {
    runResult.value = { ok: true, message: `Pipeline complete for ${date}. Snapshot selector updated.` };
    // Refresh snapshot dates so the new date appears in the selector immediately
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
    createBaseVNode("div", _hoisted_2, [
      _cache[44] || (_cache[44] = createStaticVNode("<div class=\"absa-etl__breadcrumb\" data-v-452fcc27><span data-v-452fcc27>Home</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-452fcc27><polyline points=\"9 18 15 12 9 6\" data-v-452fcc27></polyline></svg><span data-v-452fcc27>Operations</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-452fcc27><polyline points=\"9 18 15 12 9 6\" data-v-452fcc27></polyline></svg><span class=\"absa-etl__breadcrumb-current\" data-v-452fcc27>ETL Execution Logs</span></div>", 1)),
      createBaseVNode("div", _hoisted_3, [
        _cache[4] || (_cache[4] = createBaseVNode("div", null, [
          createBaseVNode("h1", { class: "absa-etl__title" }, "Data Pipeline Health"),
          createBaseVNode("p", { class: "absa-etl__subtitle" }, "Monitoring ingestion, transformation, and quality across all data sources")
        ], -1)),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            class: "absa-etl__btn absa-etl__btn--outline",
            onClick: triggerHistoricalExtraction,
            disabled: isExtracting.value
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5"
            }, [
              createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              createBaseVNode("polyline", { points: "7 10 12 15 17 10" }),
              createBaseVNode("line", {
                x1: "12",
                y1: "15",
                x2: "12",
                y2: "3"
              })
            ], -1)),
            createTextVNode(" " + toDisplayString(isExtracting.value ? 'Extracting...' : 'Extract Historical Training Data'), 1)
          ], 8, _hoisted_5),
          _cache[3] || (_cache[3] = createStaticVNode("<button class=\"absa-etl__btn absa-etl__btn--outline\" data-v-452fcc27><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-452fcc27><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" data-v-452fcc27></path><polyline points=\"7 10 12 15 17 10\" data-v-452fcc27></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\" data-v-452fcc27></line></svg> Export Logs </button>", 1)),
          createBaseVNode("button", {
            class: "absa-etl__btn absa-etl__btn--primary",
            onClick: openPipelineRunner
          }, [...(_cache[2] || (_cache[2] = [
            createBaseVNode("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5"
            }, [
              createBaseVNode("polygon", { points: "5 3 19 12 5 21 5 3" })
            ], -1),
            createTextVNode(" Trigger Manual Run ", -1)
          ]))])
        ])
      ]),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (showRunModal.value)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "pr-overlay",
              onClick: withModifiers(closeRunModal, ["self"])
            }, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  _cache[6] || (_cache[6] = createBaseVNode("div", null, [
                    createBaseVNode("h2", { class: "pr-modal__title" }, "Run AI Pipeline"),
                    createBaseVNode("p", { class: "pr-modal__sub" }, "Runs Feature Engine → State Engine → Predictions in sequence for the selected date.")
                  ], -1)),
                  createBaseVNode("button", {
                    class: "pr-modal__close",
                    onClick: closeRunModal,
                    disabled: isRunning.value
                  }, [...(_cache[5] || (_cache[5] = [
                    createBaseVNode("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.5"
                    }, [
                      createBaseVNode("line", {
                        x1: "18",
                        y1: "6",
                        x2: "6",
                        y2: "18"
                      }),
                      createBaseVNode("line", {
                        x1: "6",
                        y1: "6",
                        x2: "18",
                        y2: "18"
                      })
                    ], -1)
                  ]))], 8, _hoisted_8)
                ]),
                createBaseVNode("div", _hoisted_9, [
                  _cache[7] || (_cache[7] = createBaseVNode("label", { class: "pr-modal__label" }, "As-of Date", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((runDate).value = $event)),
                    type: "date",
                    class: "pr-modal__date-input",
                    disabled: isRunning.value,
                    max: unref(todayStr)
                  }, null, 8, _hoisted_10), [
                    [vModelText, runDate.value]
                  ]),
                  _cache[8] || (_cache[8] = createBaseVNode("span", { class: "pr-modal__date-hint" }, "Defaults to today. Predictions are keyed by this date.", -1))
                ]),
                createBaseVNode("div", _hoisted_11, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(pipelineSteps.value, (step) => {
                    return (openBlock(), createElementBlock("div", {
                      key: step.id,
                      class: normalizeClass(["pr-step", `pr-step--${step.status}`])
                    }, [
                      createBaseVNode("div", _hoisted_12, [
                        (step.status === 'idle')
                          ? (openBlock(), createElementBlock("svg", _hoisted_13, [...(_cache[9] || (_cache[9] = [
                              createBaseVNode("circle", {
                                cx: "12",
                                cy: "12",
                                r: "10"
                              }, null, -1)
                            ]))]))
                          : (step.status === 'running')
                            ? (openBlock(), createElementBlock("svg", _hoisted_14, [...(_cache[10] || (_cache[10] = [
                                createBaseVNode("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }, null, -1)
                              ]))]))
                            : (step.status === 'done')
                              ? (openBlock(), createElementBlock("svg", _hoisted_15, [...(_cache[11] || (_cache[11] = [
                                  createBaseVNode("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }, null, -1),
                                  createBaseVNode("polyline", { points: "22 4 12 14.01 9 11.01" }, null, -1)
                                ]))]))
                              : (step.status === 'error')
                                ? (openBlock(), createElementBlock("svg", _hoisted_16, [...(_cache[12] || (_cache[12] = [
                                    createBaseVNode("circle", {
                                      cx: "12",
                                      cy: "12",
                                      r: "10"
                                    }, null, -1),
                                    createBaseVNode("line", {
                                      x1: "12",
                                      y1: "8",
                                      x2: "12",
                                      y2: "12"
                                    }, null, -1),
                                    createBaseVNode("line", {
                                      x1: "12",
                                      y1: "16",
                                      x2: "12.01",
                                      y2: "16"
                                    }, null, -1)
                                  ]))]))
                                : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("div", _hoisted_18, toDisplayString(step.label), 1),
                        (step.detail)
                          ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(step.detail), 1))
                          : createCommentVNode("", true)
                      ])
                    ], 2))
                  }), 128))
                ]),
                (runResult.value)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["pr-modal__result", runResult.value.ok ? 'pr-modal__result--ok' : 'pr-modal__result--err'])
                    }, [
                      (runResult.value.ok)
                        ? (openBlock(), createElementBlock("svg", _hoisted_20, [...(_cache[13] || (_cache[13] = [
                            createBaseVNode("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }, null, -1),
                            createBaseVNode("polyline", { points: "22 4 12 14.01 9 11.01" }, null, -1)
                          ]))]))
                        : (openBlock(), createElementBlock("svg", _hoisted_21, [...(_cache[14] || (_cache[14] = [
                            createBaseVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "10"
                            }, null, -1),
                            createBaseVNode("line", {
                              x1: "12",
                              y1: "8",
                              x2: "12",
                              y2: "12"
                            }, null, -1),
                            createBaseVNode("line", {
                              x1: "12",
                              y1: "16",
                              x2: "12.01",
                              y2: "16"
                            }, null, -1)
                          ]))])),
                      createTextVNode(" " + toDisplayString(runResult.value.message), 1)
                    ], 2))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_22, [
                  createBaseVNode("button", {
                    class: "absa-etl__btn absa-etl__btn--outline",
                    onClick: closeRunModal,
                    disabled: isRunning.value
                  }, "Cancel", 8, _hoisted_23),
                  createBaseVNode("button", {
                    class: "absa-etl__btn absa-etl__btn--primary",
                    onClick: startPipeline,
                    disabled: isRunning.value || !!runResult.value?.ok
                  }, [
                    (!isRunning.value)
                      ? (openBlock(), createElementBlock("svg", _hoisted_25, [...(_cache[15] || (_cache[15] = [
                          createBaseVNode("polygon", { points: "5 3 19 12 5 21 5 3" }, null, -1)
                        ]))]))
                      : (openBlock(), createElementBlock("svg", _hoisted_26, [...(_cache[16] || (_cache[16] = [
                          createBaseVNode("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }, null, -1)
                        ]))])),
                    createTextVNode(" " + toDisplayString(isRunning.value ? 'Running…' : runResult.value?.ok ? 'Done' : 'Run Pipeline'), 1)
                  ], 8, _hoisted_24)
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ])),
      (extractionProgress.value && extractionProgress.value.status !== 'idle')
        ? (openBlock(), createElementBlock("div", _hoisted_27, [
            createBaseVNode("div", _hoisted_28, [
              createBaseVNode("span", null, [
                _cache[17] || (_cache[17] = createBaseVNode("strong", null, "Historical Extraction", -1)),
                _cache[18] || (_cache[18] = createTextVNode()),
                (extractionProgress.value.status === 'running')
                  ? (openBlock(), createElementBlock("span", _hoisted_29, "- Processing " + toDisplayString(extractionProgress.value.current_date), 1))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("span", null, toDisplayString(Math.round((extractionProgress.value.current / extractionProgress.value.total) * 100) || 0) + "% (" + toDisplayString(extractionProgress.value.current) + " / " + toDisplayString(extractionProgress.value.total) + " Months)", 1)
            ]),
            createBaseVNode("div", _hoisted_30, [
              createBaseVNode("div", {
                class: "absa-etl__progress-fill",
                style: normalizeStyle({ width: ((extractionProgress.value.current / extractionProgress.value.total) * 100) + '%' })
              }, null, 4)
            ]),
            (extractionProgress.value.status === 'completed')
              ? (openBlock(), createElementBlock("div", _hoisted_31, " Historical Extraction Completed Successfully! "))
              : createCommentVNode("", true)
          ]))
        : createCommentVNode("", true),
      (loading.value)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 1,
            type: "stats"
          }))
        : createCommentVNode("", true),
      (loading.value)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 2,
            type: "table",
            count: 4
          }))
        : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createBaseVNode("div", _hoisted_32, [
              createBaseVNode("div", _hoisted_33, [
                _cache[19] || (_cache[19] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-452fcc27><div class=\"absa-etl__health-icon absa-etl__health-icon--green\" data-v-452fcc27><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-452fcc27><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" data-v-452fcc27></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\" data-v-452fcc27></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\" data-v-452fcc27></path></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--green\" data-v-452fcc27></span></div><div class=\"absa-etl__health-label\" data-v-452fcc27>PostgreSQL Cluster</div>", 2)),
                createBaseVNode("div", _hoisted_34, toDisplayString(pgStatus.value), 1),
                createBaseVNode("div", _hoisted_35, "Avg Duration: " + toDisplayString(pgLatency.value), 1)
              ]),
              createBaseVNode("div", _hoisted_36, [
                _cache[20] || (_cache[20] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-452fcc27><div class=\"absa-etl__health-icon absa-etl__health-icon--blue\" data-v-452fcc27><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-452fcc27><circle cx=\"12\" cy=\"12\" r=\"10\" data-v-452fcc27></circle><polyline points=\"12 6 12 12 16 14\" data-v-452fcc27></polyline></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--green\" data-v-452fcc27></span></div><div class=\"absa-etl__health-label\" data-v-452fcc27>Redis Cache</div>", 2)),
                createBaseVNode("div", _hoisted_37, toDisplayString(redisStatus.value), 1),
                createBaseVNode("div", _hoisted_38, "Memory: " + toDisplayString(redisMemory.value), 1)
              ]),
              createBaseVNode("div", _hoisted_39, [
                _cache[21] || (_cache[21] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-452fcc27><div class=\"absa-etl__health-icon absa-etl__health-icon--amber\" data-v-452fcc27><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-452fcc27><circle cx=\"12\" cy=\"12\" r=\"3\" data-v-452fcc27></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\" data-v-452fcc27></path></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--amber\" data-v-452fcc27></span></div><div class=\"absa-etl__health-label\" data-v-452fcc27>API Gateway</div>", 2)),
                createBaseVNode("div", _hoisted_40, toDisplayString(gatewayStatus.value), 1),
                createBaseVNode("div", _hoisted_41, "Uptime: " + toDisplayString(gatewayUptime.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_42, [
              createBaseVNode("div", _hoisted_43, [
                createBaseVNode("div", null, [
                  _cache[23] || (_cache[23] = createBaseVNode("h3", { class: "absa-etl__quality-title" }, "Quality Score Trend", -1)),
                  createBaseVNode("p", _hoisted_44, [
                    _cache[22] || (_cache[22] = createTextVNode("Data Integrity Score: ", -1)),
                    createBaseVNode("strong", null, toDisplayString(avgQuality.value), 1),
                    createTextVNode(" • " + toDisplayString(qualityTrend.value.length) + " data points", 1)
                  ])
                ]),
                _cache[24] || (_cache[24] = createBaseVNode("div", { class: "absa-etl__quality-legend" }, [
                  createBaseVNode("span", { class: "absa-etl__legend-label" }, [
                    createBaseVNode("span", { class: "absa-etl__legend-dot absa-etl__legend-dot--maroon" }),
                    createTextVNode(" Quality Score ")
                  ])
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_45, [
                (openBlock(), createElementBlock("svg", _hoisted_46, [
                  _cache[25] || (_cache[25] = createBaseVNode("defs", null, [
                    createBaseVNode("linearGradient", {
                      id: "qualityGrad",
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1"
                    }, [
                      createBaseVNode("stop", {
                        offset: "0%",
                        "stop-color": "rgba(190,15,44,0.25)"
                      }),
                      createBaseVNode("stop", {
                        offset: "100%",
                        "stop-color": "rgba(190,15,44,0.02)"
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
                    }, null, 8, _hoisted_47)
                  }), 64)),
                  createBaseVNode("polygon", {
                    points: qualityArea.value,
                    fill: "url(#qualityGrad)"
                  }, null, 8, _hoisted_48),
                  createBaseVNode("polyline", {
                    points: qualityLine.value,
                    fill: "none",
                    stroke: "#BE0F2C",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, null, 8, _hoisted_49),
                  _cache[26] || (_cache[26] = createBaseVNode("line", {
                    x1: "0",
                    y1: "30",
                    x2: "800",
                    y2: "30",
                    stroke: "#F59E0B",
                    "stroke-width": "1.5",
                    "stroke-dasharray": "6,4"
                  }, null, -1)),
                  _cache[27] || (_cache[27] = createBaseVNode("text", {
                    x: "805",
                    y: "34",
                    fill: "#F59E0B",
                    "font-size": "10",
                    "font-family": "monospace"
                  }, "90%", -1))
                ]))
              ])
            ]),
            createBaseVNode("div", _hoisted_50, [
              _cache[33] || (_cache[33] = createBaseVNode("div", { class: "absa-etl__section-header" }, [
                createBaseVNode("h3", { class: "absa-etl__section-title" }, "Execution History"),
                createBaseVNode("span", { class: "absa-etl__section-period" }, "Today")
              ], -1)),
              createBaseVNode("div", _hoisted_51, [
                createBaseVNode("table", _hoisted_52, [
                  _cache[31] || (_cache[31] = createBaseVNode("thead", { class: "absa-table-header" }, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", null, "Run ID"),
                      createBaseVNode("th", null, "Batch ID"),
                      createBaseVNode("th", null, "Duration"),
                      createBaseVNode("th", null, "Rows Recv / Valid / Loaded / Rejected"),
                      createBaseVNode("th", null, "Quality Score"),
                      createBaseVNode("th", null, "Status")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(executionHistory.value, (run) => {
                      return (openBlock(), createElementBlock("tr", {
                        key: run.id
                      }, [
                        createBaseVNode("td", _hoisted_53, toDisplayString(run.runId), 1),
                        createBaseVNode("td", _hoisted_54, toDisplayString(run.batchId), 1),
                        createBaseVNode("td", _hoisted_55, toDisplayString(run.duration), 1),
                        createBaseVNode("td", null, [
                          createBaseVNode("div", _hoisted_56, [
                            createBaseVNode("span", _hoisted_57, toDisplayString(run.rowsReceived), 1),
                            _cache[28] || (_cache[28] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            createBaseVNode("span", _hoisted_58, toDisplayString(run.rowsValid), 1),
                            _cache[29] || (_cache[29] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            createBaseVNode("span", _hoisted_59, toDisplayString(run.rowsLoaded), 1),
                            _cache[30] || (_cache[30] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            (run.rowsRejected > 0)
                              ? (openBlock(), createElementBlock("span", _hoisted_60, toDisplayString(run.rowsRejected), 1))
                              : (openBlock(), createElementBlock("span", _hoisted_61, "0"))
                          ])
                        ]),
                        createBaseVNode("td", null, [
                          createBaseVNode("div", _hoisted_62, [
                            createBaseVNode("div", _hoisted_63, [
                              createBaseVNode("div", {
                                class: normalizeClass(["absa-etl__quality-fill", 'absa-etl__quality-fill--' + run.qualityClass]),
                                style: normalizeStyle({ width: run.qualityScore + '%' })
                              }, null, 6)
                            ]),
                            createBaseVNode("span", {
                              class: normalizeClass(["absa-etl__quality-val", 'absa-etl__quality-val--' + run.qualityClass])
                            }, toDisplayString(run.qualityScore) + "%", 3)
                          ])
                        ]),
                        createBaseVNode("td", null, [
                          createBaseVNode("span", {
                            class: normalizeClass(["absa-etl__status", 'absa-etl__status--' + run.statusClass])
                          }, [
                            createBaseVNode("span", {
                              class: normalizeClass(["absa-etl__status-dot", 'absa-etl__status-dot--' + run.statusClass])
                            }, null, 2),
                            createTextVNode(" " + toDisplayString(run.status), 1)
                          ], 2)
                        ])
                      ]))
                    }), 128))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("span", null, "Showing " + toDisplayString(executionHistory.value.length) + " executions", 1),
                _cache[32] || (_cache[32] = createStaticVNode("<div class=\"absa-etl__page-btns\" data-v-452fcc27><button disabled data-v-452fcc27><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-452fcc27><polyline points=\"15 18 9 12 15 6\" data-v-452fcc27></polyline></svg></button><button class=\"absa-etl__page-btn--active\" data-v-452fcc27>1</button><button data-v-452fcc27>2</button><button data-v-452fcc27>3</button><button data-v-452fcc27>...</button><button data-v-452fcc27>2211</button><button data-v-452fcc27><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-452fcc27><polyline points=\"9 18 15 12 9 6\" data-v-452fcc27></polyline></svg></button></div>", 1))
              ])
            ]),
            createBaseVNode("div", _hoisted_65, [
              createBaseVNode("div", _hoisted_66, [
                _cache[34] || (_cache[34] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--blue" }, [
                  createBaseVNode("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createBaseVNode("path", { d: "M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_67, toDisplayString(totalRuns.value), 1),
                _cache[35] || (_cache[35] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Total Runs", -1)),
                createBaseVNode("div", _hoisted_68, toDisplayString(executionHistory.value.length) + " shown", 1)
              ]),
              createBaseVNode("div", _hoisted_69, [
                _cache[36] || (_cache[36] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--green" }, [
                  createBaseVNode("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createBaseVNode("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
                    createBaseVNode("polyline", { points: "22 4 12 14.01 9 11.01" })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_70, toDisplayString(avgQuality.value), 1),
                _cache[37] || (_cache[37] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Average Quality", -1)),
                createBaseVNode("div", _hoisted_71, toDisplayString(qualityTrend.value.length) + " runs tracked", 1)
              ]),
              createBaseVNode("div", _hoisted_72, [
                _cache[38] || (_cache[38] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--amber" }, [
                  createBaseVNode("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createBaseVNode("polyline", { points: "23 4 23 10 17 10" }),
                    createBaseVNode("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_73, toDisplayString(failedRetries.value), 1),
                _cache[39] || (_cache[39] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Failed Retries", -1)),
                _cache[40] || (_cache[40] = createBaseVNode("div", { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" }, "Last 24h", -1))
              ]),
              createBaseVNode("div", _hoisted_74, [
                _cache[41] || (_cache[41] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--red" }, [
                  createBaseVNode("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createBaseVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    createBaseVNode("polyline", { points: "12 6 12 12 16 14" })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_75, toDisplayString(pgLatency.value), 1),
                _cache[42] || (_cache[42] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Avg Query Latency", -1)),
                _cache[43] || (_cache[43] = createBaseVNode("div", { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" }, "PostgreSQL", -1))
              ])
            ])
          ], 64))
    ])
  ]))
}
}

};
const EtlPipeline = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-452fcc27"]]);

export { EtlPipeline as default };
