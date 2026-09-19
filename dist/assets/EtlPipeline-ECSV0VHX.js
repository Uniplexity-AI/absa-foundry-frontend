import { _ as _sfc_main$1 } from './LoadingSkeleton-BKzrOxU7.js';
import { u as useETLStore } from './etlStore-Bxz1T1lw.js';
import { _ as _export_sfc, i as computed, f as onMounted, c as createElementBlock, b as createBaseVNode, a as createStaticVNode, C as createBlock, j as createCommentVNode, F as Fragment, t as toDisplayString, A as createTextVNode, e as renderList, o as openBlock, n as normalizeStyle, h as normalizeClass } from './index-DX7cgo_Y.js';
import './etlApi-DFxDgtba.js';

const _hoisted_1 = { class: "absa-etl" };
const _hoisted_2 = { class: "absa-etl__content" };
const _hoisted_3 = { class: "absa-etl__health-grid" };
const _hoisted_4 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_5 = { class: "absa-etl__health-value absa-etl__health-value--green" };
const _hoisted_6 = { class: "absa-etl__health-stat" };
const _hoisted_7 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_8 = { class: "absa-etl__health-value absa-etl__health-value--green" };
const _hoisted_9 = { class: "absa-etl__health-stat" };
const _hoisted_10 = { class: "absa-metric-bg absa-etl__health-card" };
const _hoisted_11 = { class: "absa-etl__health-value absa-etl__health-value--amber" };
const _hoisted_12 = { class: "absa-etl__health-stat" };
const _hoisted_13 = { class: "absa-chart-container absa-etl__quality" };
const _hoisted_14 = { class: "absa-etl__quality-header" };
const _hoisted_15 = { class: "absa-etl__quality-sub" };
const _hoisted_16 = { class: "absa-etl__quality-chart" };
const _hoisted_17 = {
  viewBox: "0 0 800 160",
  preserveAspectRatio: "none",
  class: "absa-etl__quality-svg"
};
const _hoisted_18 = ["y1", "y2"];
const _hoisted_19 = ["points"];
const _hoisted_20 = ["points"];
const _hoisted_21 = { class: "absa-etl__section" };
const _hoisted_22 = { class: "absa-etl__table-wrap" };
const _hoisted_23 = { class: "absa-etl__table" };
const _hoisted_24 = { class: "absa-etl__run-id" };
const _hoisted_25 = { class: "absa-etl__table-mono" };
const _hoisted_26 = { class: "absa-etl__table-val" };
const _hoisted_27 = { class: "absa-etl__rows" };
const _hoisted_28 = { class: "absa-etl__row-stat" };
const _hoisted_29 = { class: "absa-etl__row-stat absa-etl__row-stat--green" };
const _hoisted_30 = { class: "absa-etl__row-stat" };
const _hoisted_31 = {
  key: 0,
  class: "absa-etl__row-stat absa-etl__row-stat--red"
};
const _hoisted_32 = {
  key: 1,
  class: "absa-etl__row-stat"
};
const _hoisted_33 = { class: "absa-etl__quality-cell" };
const _hoisted_34 = { class: "absa-etl__quality-bar" };
const _hoisted_35 = { class: "absa-etl__pagination" };
const _hoisted_36 = { class: "absa-etl__stats-grid" };
const _hoisted_37 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_38 = { class: "absa-etl__stat-value" };
const _hoisted_39 = { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" };
const _hoisted_40 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_41 = { class: "absa-etl__stat-value" };
const _hoisted_42 = { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" };
const _hoisted_43 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_44 = { class: "absa-etl__stat-value" };
const _hoisted_45 = { class: "absa-metric-bg absa-etl__stat-card" };
const _hoisted_46 = { class: "absa-etl__stat-value" };


const _sfc_main = {
  __name: 'EtlPipeline',
  setup(__props) {

const store = useETLStore();
const loading = computed(() => store.loading);

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

onMounted(() => {
  store.loadDashboard();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[25] || (_cache[25] = createStaticVNode("<div class=\"absa-etl__breadcrumb\" data-v-32802617><span data-v-32802617>Home</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><polyline points=\"9 18 15 12 9 6\" data-v-32802617></polyline></svg><span data-v-32802617>Operations</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><polyline points=\"9 18 15 12 9 6\" data-v-32802617></polyline></svg><span class=\"absa-etl__breadcrumb-current\" data-v-32802617>ETL Execution Logs</span></div><div class=\"absa-etl__header\" data-v-32802617><div data-v-32802617><h1 class=\"absa-etl__title\" data-v-32802617>Data Pipeline Health</h1><p class=\"absa-etl__subtitle\" data-v-32802617>Monitoring ingestion, transformation, and quality across all data sources</p></div><div class=\"absa-etl__header-right\" data-v-32802617><button class=\"absa-etl__btn absa-etl__btn--outline\" data-v-32802617><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" data-v-32802617></path><polyline points=\"7 10 12 15 17 10\" data-v-32802617></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\" data-v-32802617></line></svg> Export Logs </button><button class=\"absa-etl__btn absa-etl__btn--primary\" data-v-32802617><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><polygon points=\"5 3 19 12 5 21 5 3\" data-v-32802617></polygon></svg> Trigger Manual Run </button></div></div>", 2)),
      (loading.value)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            type: "stats"
          }))
        : createCommentVNode("", true),
      (loading.value)
        ? (openBlock(), createBlock(_sfc_main$1, {
            key: 1,
            type: "table",
            count: 4
          }))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                _cache[0] || (_cache[0] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-32802617><div class=\"absa-etl__health-icon absa-etl__health-icon--green\" data-v-32802617><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-32802617><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" data-v-32802617></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\" data-v-32802617></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\" data-v-32802617></path></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--green\" data-v-32802617></span></div><div class=\"absa-etl__health-label\" data-v-32802617>PostgreSQL Cluster</div>", 2)),
                createBaseVNode("div", _hoisted_5, toDisplayString(pgStatus.value), 1),
                createBaseVNode("div", _hoisted_6, "Avg Duration: " + toDisplayString(pgLatency.value), 1)
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[1] || (_cache[1] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-32802617><div class=\"absa-etl__health-icon absa-etl__health-icon--blue\" data-v-32802617><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-32802617><circle cx=\"12\" cy=\"12\" r=\"10\" data-v-32802617></circle><polyline points=\"12 6 12 12 16 14\" data-v-32802617></polyline></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--green\" data-v-32802617></span></div><div class=\"absa-etl__health-label\" data-v-32802617>Redis Cache</div>", 2)),
                createBaseVNode("div", _hoisted_8, toDisplayString(redisStatus.value), 1),
                createBaseVNode("div", _hoisted_9, "Memory: " + toDisplayString(redisMemory.value), 1)
              ]),
              createBaseVNode("div", _hoisted_10, [
                _cache[2] || (_cache[2] = createStaticVNode("<div class=\"absa-etl__health-top\" data-v-32802617><div class=\"absa-etl__health-icon absa-etl__health-icon--amber\" data-v-32802617><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-32802617><circle cx=\"12\" cy=\"12\" r=\"3\" data-v-32802617></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\" data-v-32802617></path></svg></div><span class=\"absa-etl__health-dot absa-etl__health-dot--amber\" data-v-32802617></span></div><div class=\"absa-etl__health-label\" data-v-32802617>API Gateway</div>", 2)),
                createBaseVNode("div", _hoisted_11, toDisplayString(gatewayStatus.value), 1),
                createBaseVNode("div", _hoisted_12, "Uptime: " + toDisplayString(gatewayUptime.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", null, [
                  _cache[4] || (_cache[4] = createBaseVNode("h3", { class: "absa-etl__quality-title" }, "Quality Score Trend", -1)),
                  createBaseVNode("p", _hoisted_15, [
                    _cache[3] || (_cache[3] = createTextVNode("Data Integrity Score: ", -1)),
                    createBaseVNode("strong", null, toDisplayString(avgQuality.value), 1),
                    createTextVNode(" • " + toDisplayString(qualityTrend.value.length) + " data points", 1)
                  ])
                ]),
                _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absa-etl__quality-legend" }, [
                  createBaseVNode("span", { class: "absa-etl__legend-label" }, [
                    createBaseVNode("span", { class: "absa-etl__legend-dot absa-etl__legend-dot--maroon" }),
                    createTextVNode(" Quality Score ")
                  ])
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_16, [
                (openBlock(), createElementBlock("svg", _hoisted_17, [
                  _cache[6] || (_cache[6] = createBaseVNode("defs", null, [
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
                    }, null, 8, _hoisted_18)
                  }), 64)),
                  createBaseVNode("polygon", {
                    points: qualityArea.value,
                    fill: "url(#qualityGrad)"
                  }, null, 8, _hoisted_19),
                  createBaseVNode("polyline", {
                    points: qualityLine.value,
                    fill: "none",
                    stroke: "#BE0F2C",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, null, 8, _hoisted_20),
                  _cache[7] || (_cache[7] = createBaseVNode("line", {
                    x1: "0",
                    y1: "30",
                    x2: "800",
                    y2: "30",
                    stroke: "#F59E0B",
                    "stroke-width": "1.5",
                    "stroke-dasharray": "6,4"
                  }, null, -1)),
                  _cache[8] || (_cache[8] = createBaseVNode("text", {
                    x: "805",
                    y: "34",
                    fill: "#F59E0B",
                    "font-size": "10",
                    "font-family": "monospace"
                  }, "90%", -1))
                ]))
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "absa-etl__section-header" }, [
                createBaseVNode("h3", { class: "absa-etl__section-title" }, "Execution History"),
                createBaseVNode("span", { class: "absa-etl__section-period" }, "Today")
              ], -1)),
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("table", _hoisted_23, [
                  _cache[12] || (_cache[12] = createBaseVNode("thead", { class: "absa-table-header" }, [
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
                        createBaseVNode("td", _hoisted_24, toDisplayString(run.runId), 1),
                        createBaseVNode("td", _hoisted_25, toDisplayString(run.batchId), 1),
                        createBaseVNode("td", _hoisted_26, toDisplayString(run.duration), 1),
                        createBaseVNode("td", null, [
                          createBaseVNode("div", _hoisted_27, [
                            createBaseVNode("span", _hoisted_28, toDisplayString(run.rowsReceived), 1),
                            _cache[9] || (_cache[9] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            createBaseVNode("span", _hoisted_29, toDisplayString(run.rowsValid), 1),
                            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            createBaseVNode("span", _hoisted_30, toDisplayString(run.rowsLoaded), 1),
                            _cache[11] || (_cache[11] = createBaseVNode("span", { class: "absa-etl__row-sep" }, "/", -1)),
                            (run.rowsRejected > 0)
                              ? (openBlock(), createElementBlock("span", _hoisted_31, toDisplayString(run.rowsRejected), 1))
                              : (openBlock(), createElementBlock("span", _hoisted_32, "0"))
                          ])
                        ]),
                        createBaseVNode("td", null, [
                          createBaseVNode("div", _hoisted_33, [
                            createBaseVNode("div", _hoisted_34, [
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
              createBaseVNode("div", _hoisted_35, [
                createBaseVNode("span", null, "Showing " + toDisplayString(executionHistory.value.length) + " executions", 1),
                _cache[13] || (_cache[13] = createStaticVNode("<div class=\"absa-etl__page-btns\" data-v-32802617><button disabled data-v-32802617><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><polyline points=\"15 18 9 12 15 6\" data-v-32802617></polyline></svg></button><button class=\"absa-etl__page-btn--active\" data-v-32802617>1</button><button data-v-32802617>2</button><button data-v-32802617>3</button><button data-v-32802617>...</button><button data-v-32802617>2211</button><button data-v-32802617><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-32802617><polyline points=\"9 18 15 12 9 6\" data-v-32802617></polyline></svg></button></div>", 1))
              ])
            ]),
            createBaseVNode("div", _hoisted_36, [
              createBaseVNode("div", _hoisted_37, [
                _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--blue" }, [
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
                createBaseVNode("div", _hoisted_38, toDisplayString(totalRuns.value), 1),
                _cache[16] || (_cache[16] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Total Runs", -1)),
                createBaseVNode("div", _hoisted_39, toDisplayString(executionHistory.value.length) + " shown", 1)
              ]),
              createBaseVNode("div", _hoisted_40, [
                _cache[17] || (_cache[17] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--green" }, [
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
                createBaseVNode("div", _hoisted_41, toDisplayString(avgQuality.value), 1),
                _cache[18] || (_cache[18] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Average Quality", -1)),
                createBaseVNode("div", _hoisted_42, toDisplayString(qualityTrend.value.length) + " runs tracked", 1)
              ]),
              createBaseVNode("div", _hoisted_43, [
                _cache[19] || (_cache[19] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--amber" }, [
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
                createBaseVNode("div", _hoisted_44, toDisplayString(failedRetries.value), 1),
                _cache[20] || (_cache[20] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Failed Retries", -1)),
                _cache[21] || (_cache[21] = createBaseVNode("div", { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" }, "Last 24h", -1))
              ]),
              createBaseVNode("div", _hoisted_45, [
                _cache[22] || (_cache[22] = createBaseVNode("div", { class: "absa-etl__stat-icon absa-etl__stat-icon--red" }, [
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
                createBaseVNode("div", _hoisted_46, toDisplayString(pgLatency.value), 1),
                _cache[23] || (_cache[23] = createBaseVNode("div", { class: "absa-etl__stat-label" }, "Avg Query Latency", -1)),
                _cache[24] || (_cache[24] = createBaseVNode("div", { class: "absa-etl__stat-trend absa-etl__stat-trend--neutral" }, "PostgreSQL", -1))
              ])
            ])
          ], 64))
    ])
  ]))
}
}

};
const EtlPipeline = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-32802617"]]);

export { EtlPipeline as default };
