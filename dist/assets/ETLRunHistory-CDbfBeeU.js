import { g as _export_sfc, r as ref, D as computed, h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, F as Fragment, e as renderList, m as createTextVNode, w as withCtx, t as toDisplayString, l as createCommentVNode, a as createStaticVNode, y as unref, z as createBlock, s as withModifiers, v as withDirectives, S as vModelSelect, W as Teleport, A as resolveComponent, u as useRouter, n as normalizeStyle, j as normalizeClass } from './index-DySaQUSt.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-DsXOmfbs.js';
import { u as useETLStore } from './etlStore-DzFQrVtr.js';
import { f as fetchETLConfigs, t as triggerETLPipeline } from './etlApi-C94VsQrz.js';

const _hoisted_1 = { class: "dashboard-root w-full min-h-screen p-4 md:p-6 lg:p-8" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-screen flex flex-col space-y-8"
};
const _hoisted_3 = { class: "flex justify-end" };
const _hoisted_4 = { class: "grid grid-cols-4 gap-4" };
const _hoisted_5 = { class: "mb-6 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_6 = { class: "flex items-center gap-3" };
const _hoisted_7 = {
  key: 0,
  class: "mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-sm text-sm text-green-700 flex justify-between items-center"
};
const _hoisted_8 = {
  key: 1,
  class: "mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700 flex justify-between items-center"
};
const _hoisted_9 = {
  id: "health-trend-container",
  class: "relative w-full grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 h-auto min-h-fit block md:grid"
};
const _hoisted_10 = {
  id: "health-column",
  class: "relative lg:col-span-1 flex flex-col gap-4 w-full h-auto min-h-[220px]"
};
const _hoisted_11 = { class: "flex flex-col gap-4 w-full" };
const _hoisted_12 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-300 p-5 text-center text-body-md text-secondary"
};
const _hoisted_13 = { class: "flex items-center gap-4" };
const _hoisted_14 = { class: "w-10 h-10 flex items-center justify-center text-primary" };
const _hoisted_15 = { class: "material-symbols-outlined" };
const _hoisted_16 = { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-1" };
const _hoisted_17 = { class: "text-lg font-headline font-bold text-on-surface" };
const _hoisted_18 = { class: "flex flex-col items-end" };
const _hoisted_19 = { class: "text-xs text-[#FF780F] font-semibold" };
const _hoisted_20 = {
  id: "trend-column",
  class: "relative lg:col-span-3 flex flex-col w-full h-auto min-h-[220px]"
};
const _hoisted_21 = { class: "bg-white rounded-sm border border-gray-300 p-6 shadow-none w-full h-auto min-h-[220px] flex flex-col justify-between" };
const _hoisted_22 = { class: "h-48 w-full relative mb-4" };
const _hoisted_23 = {
  key: 0,
  class: "flex items-center justify-center h-full text-body-md text-secondary"
};
const _hoisted_24 = {
  key: 1,
  class: "absolute inset-0 flex items-end gap-1"
};
const _hoisted_25 = { class: "flex justify-between items-center pt-4 border-t border-gray-300 text-sm text-on-surface-variant" };
const _hoisted_26 = { class: "flex items-center gap-2" };
const _hoisted_27 = { class: "font-semibold text-on-surface" };
const _hoisted_28 = { class: "mb-8" };
const _hoisted_29 = { class: "bg-white rounded-sm shadow-none overflow-hidden" };
const _hoisted_30 = { class: "overflow-x-auto" };
const _hoisted_31 = { class: "w-full text-left border-collapse" };
const _hoisted_32 = { class: "text-sm" };
const _hoisted_33 = { key: 0 };
const _hoisted_34 = ["onClick"];
const _hoisted_35 = { class: "p-4 text-on-surface-variant" };
const _hoisted_36 = { class: "p-4" };
const _hoisted_37 = { class: "p-4" };
const _hoisted_38 = { class: "p-4" };
const _hoisted_39 = { class: "w-16 h-2 bg-white-variant rounded-full overflow-hidden" };
const _hoisted_40 = { class: "p-4" };
const _hoisted_41 = {
  key: 1,
  class: "material-symbols-outlined text-[14px]"
};
const _hoisted_42 = {
  key: 2,
  class: "material-symbols-outlined text-[14px]"
};
const _hoisted_43 = { class: "p-4 text-on-surface-variant" };
const _hoisted_44 = ["onClick"];
const _hoisted_45 = { class: "p-4 flex items-center justify-between bg-white text-sm text-on-surface-variant" };
const _hoisted_46 = { class: "flex items-center gap-1" };
const _hoisted_47 = ["disabled"];
const _hoisted_48 = ["onClick"];
const _hoisted_49 = ["disabled"];
const _hoisted_50 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" };
const _hoisted_51 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_52 = { class: "flex items-end gap-3 mb-2" };
const _hoisted_53 = { class: "text-3xl font-headline font-bold text-on-surface" };
const _hoisted_54 = {
  key: 0,
  class: "text-sm font-semibold text-[#FF780F] flex items-center"
};
const _hoisted_55 = { class: "text-[10px] text-on-surface-variant mt-2" };
const _hoisted_56 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none flex flex-col justify-between" };
const _hoisted_57 = { class: "flex items-end gap-3" };
const _hoisted_58 = { class: "text-3xl font-headline font-bold text-on-surface" };
const _hoisted_59 = {
  key: 0,
  class: "text-sm font-semibold text-[#FF780F] flex items-center"
};
const _hoisted_60 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none flex flex-col justify-between" };
const _hoisted_61 = { class: "flex items-end justify-between" };
const _hoisted_62 = { class: "text-3xl font-headline font-bold text-on-surface" };
const _hoisted_63 = {
  key: 0,
  class: "text-xs font-semibold text-primary flex items-center gap-1 border border-primary-fixed px-2 py-0.5 rounded"
};
const _hoisted_64 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_65 = { class: "flex items-end justify-between mb-2" };
const _hoisted_66 = { class: "text-3xl font-headline font-bold text-on-surface" };
const _hoisted_67 = {
  key: 0,
  class: "text-sm font-semibold text-primary flex items-center"
};
const _hoisted_68 = { class: "text-[10px] text-on-surface-variant mt-2" };
const _hoisted_69 = { class: "relative bg-white rounded-sm border border-gray-300 shadow-lg p-6 w-full max-w-md mx-4" };
const _hoisted_70 = {
  key: 0,
  class: "flex items-center justify-center py-8"
};
const _hoisted_71 = {
  key: 1,
  class: "text-sm text-red-600 mb-4"
};
const _hoisted_72 = {
  key: 2,
  class: "text-sm text-on-surface-variant py-4"
};
const _hoisted_73 = ["value"];
const _hoisted_74 = { class: "flex justify-end gap-3" };
const _hoisted_75 = ["disabled"];
const _hoisted_76 = ["disabled"];
const _hoisted_77 = {
  key: 0,
  class: "w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
};


const _sfc_main = {
  __name: 'ETLRunHistory',
  setup(__props) {

const router = useRouter();
const etlStore = useETLStore();
const loading = ref(true);

// ── Pipeline health cards ──
const pipelineHealth = computed(() => {
  const s = etlStore.statusPanel;
  if (!s) return []
  return [
    { name: 'PostgreSQL Cluster', icon: 'storage', status: s.current_status || '—', metric: s.current_pipeline || '—' },
    { name: 'Redis Cache', icon: 'memory', status: s.current_status || '—', metric: s.last_successful_duration || '—' },
    { name: 'API Gateway', icon: 'cloud', status: s.current_status || '—', metric: s.last_successful_rows || '—' },
  ]
});

// ── Quality trend chart ──
const qualityTrendData = computed(() =>
  (etlStore.qualityTrend || []).map(t => t.value)
);

// ── Data integrity score ──
const dataIntegrityScore = computed(() =>
  etlStore.kpis?.avg_quality != null ? etlStore.kpis.avg_quality + '%' : null
);

// ── Last scan time ──
const lastScanTime = computed(() =>
  etlStore.statusPanel?.current_status_since?.slice(0, 10) || null
);

// ── Execution runs table ──
const executionRuns = computed(() =>
  (etlStore.runs || []).map(r => ({
    id: r.id,
    auditId: r.runId,
    runId: r.runId?.slice(0, 12) || '—',
    batchId: r.batchId?.slice(0, 12) || '—',
    duration: r.duration || '—',
    rows: `${r.rowsReceived || '—'}/${r.rowsValid || '—'}/${r.rowsLoaded || '—'}/${r.rowsRejected || 0}`,
    quality: r.qualityScore || 0,
    qualityColor: r.qualityScore >= 95 ? 'bg-absa-passion' : r.qualityScore >= 80 ? 'bg-absa-energy' : 'bg-absa-inspire',
    status: r.status,
    statusColor: r.status === 'COMPLETED' ? 'text-absa-passion' : r.status === 'FAILED' ? 'text-absa-inspire' : 'text-absa-energy',
    statusDot: r.status === 'RUNNING' ? 'bg-absa-energy' : '',
  }))
);

// ── Pagination ──
const pagination = computed(() => ({
  page: etlStore.page,
  total: etlStore.totalRuns,
  from: (etlStore.page - 1) * etlStore.limit + 1,
  to: Math.min(etlStore.page * etlStore.limit, etlStore.totalRuns),
}));

// ── Footer metrics ──
const footerMetrics = computed(() => ({
  storageGrowth: { value: etlStore.totalRuns, change: null, used: null, total: null },
  averageQuality: { value: etlStore.kpis?.avg_quality != null ? etlStore.kpis.avg_quality + '%' : null, change: null },
  failedRetries: { count: etlStore.kpis?.failed_runs || 0, status: etlStore.kpis?.failed_runs > 0 ? 'warning' : null },
  gatewayLatency: { value: etlStore.kpis?.avg_duration || null, level: null, note: null },
}));

// ── Pagination actions ──
function goToPage(p) { etlStore.setPage(p); }
function nextPage() { if (etlStore.page < etlStore.totalPages) etlStore.setPage(etlStore.page + 1); }
function prevPage() { if (etlStore.page > 1) etlStore.setPage(etlStore.page - 1); }

// ── Trigger Pipeline Modal ──
const showTrigger = ref(false);
const triggerConfigs = ref([]);
const triggerConfigsLoading = ref(false);
const triggerConfigsError = ref(null);
const selectedConfig = ref(null);
const triggerRunning = ref(false);
const triggerSuccess = ref(null);
const triggerError = ref(null);

async function openTriggerModal() {
  showTrigger.value = true;
  selectedConfig.value = null;
  triggerSuccess.value = null;
  triggerError.value = null;
  if (triggerConfigs.value.length === 0 && !triggerConfigsLoading.value) {
    triggerConfigsLoading.value = true;
    triggerConfigsError.value = null;
    try {
      triggerConfigs.value = await fetchETLConfigs();
    } catch (e) {
      triggerConfigsError.value = e.message || 'Failed to load configs';
    } finally {
      triggerConfigsLoading.value = false;
    }
  }
}

function closeTriggerModal() {
  showTrigger.value = false;
  selectedConfig.value = null;
}

async function confirmTrigger() {
  if (!selectedConfig.value) return
  triggerRunning.value = true;
  triggerError.value = null;
  try {
    const res = await triggerETLPipeline(selectedConfig.value);
    triggerSuccess.value = res.message || `Pipeline triggered — ${selectedConfig.value}`;
    closeTriggerModal();
    setTimeout(() => { triggerSuccess.value = null; }, 5000);
    await etlStore.refresh();
  } catch (e) {
    triggerError.value = e.message || 'Failed to trigger pipeline';
    setTimeout(() => { triggerError.value = null; }, 8000);
  } finally {
    triggerRunning.value = false;
  }
}

// ── Init ──
onMounted(async () => {
  await etlStore.loadDashboard();
  loading.value = false;
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$1, { type: "kpi" })
          ]),
          createBaseVNode("div", _hoisted_4, [
            (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
              return createVNode(_sfc_main$1, {
                key: i,
                type: "kpi"
              })
            }), 64))
          ]),
          createVNode(_sfc_main$1, { type: "block" }),
          createVNode(_sfc_main$1, {
            type: "table",
            count: 5
          })
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_5, [
            _cache[6] || (_cache[6] = createBaseVNode("div", null, [
              createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Dashboard"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", null, "Data Pipeline"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Run History")
              ]),
              createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Data Pipeline Health")
            ], -1)),
            createBaseVNode("div", _hoisted_6, [
              _cache[5] || (_cache[5] = createBaseVNode("button", { class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none" }, [
                createBaseVNode("span", {
                  class: "material-symbols-outlined text-[18px]",
                  "data-icon": "download"
                }, "download"),
                createTextVNode(" Export Logs ")
              ], -1)),
              createBaseVNode("button", {
                onClick: openTriggerModal,
                class: "px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors font-label text-sm font-semibold shadow-none"
              }, [...(_cache[3] || (_cache[3] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "play_arrow", -1),
                createTextVNode(" Trigger Manual Run ", -1)
              ]))]),
              createVNode(_component_router_link, {
                to: "/dashboard/etl-config-manager",
                class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none"
              }, {
                default: withCtx(() => [...(_cache[4] || (_cache[4] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "settings", -1),
                  createTextVNode(" Config Manager ", -1)
                ]))]),
                _: 1
              })
            ])
          ]),
          (triggerSuccess.value)
            ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("span", null, "✓ " + toDisplayString(triggerSuccess.value), 1),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (triggerSuccess.value = null)),
                  class: "text-green-500 hover:text-green-700"
                }, "×")
              ]))
            : createCommentVNode("", true),
          (triggerError.value)
            ? (openBlock(), createElementBlock("div", _hoisted_8, [
                createBaseVNode("span", null, toDisplayString(triggerError.value), 1),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = $event => (triggerError.value = null)),
                  class: "text-red-500 hover:text-red-700"
                }, "×")
              ]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                (pipelineHealth.value.length === 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_12, "No health data available"))
                  : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(pipelineHealth.value, (svc) => {
                  return (openBlock(), createElementBlock("div", {
                    key: svc.name,
                    class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none flex items-center justify-between"
                  }, [
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("span", _hoisted_15, toDisplayString(svc.icon), 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_16, toDisplayString(svc.name), 1),
                        createBaseVNode("p", _hoisted_17, toDisplayString(svc.status), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_18, [
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-3 h-3 rounded-full bg-[#FF780F] mb-1" }, null, -1)),
                      createBaseVNode("span", _hoisted_19, toDisplayString(svc.metric), 1)
                    ])
                  ]))
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                _cache[9] || (_cache[9] = createStaticVNode("<div class=\"flex justify-between items-center mb-6\" data-v-82593247><h3 class=\"text-headline-md font-headline font-semibold text-on-surface\" data-v-82593247>Quality Score Trend</h3><div class=\"flex gap-2 bg-white-container-low p-1 rounded-sm border border-gray-300\" data-v-82593247><button class=\"px-3 py-1 text-xs font-semibold rounded-sm bg-white shadow-none\" data-v-82593247>24 HOURS</button><button class=\"px-3 py-1 text-xs font-semibold rounded-sm text-on-surface-variant\" data-v-82593247>7 DAYS</button></div></div>", 1)),
                createBaseVNode("div", _hoisted_22, [
                  (qualityTrendData.value.length === 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_23, "No trend data available"))
                    : (openBlock(), createElementBlock("div", _hoisted_24, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(qualityTrendData.value, (val, i) => {
                          return (openBlock(), createElementBlock("div", {
                            key: i,
                            class: "w-full bg-primary rounded-t",
                            style: normalizeStyle({ height: val + '%' })
                          }, null, 4))
                        }), 128))
                      ]))
                ]),
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-3 h-3 bg-primary rounded-sm block" }, null, -1)),
                    createBaseVNode("span", _hoisted_27, "Data Integrity Score: " + toDisplayString(dataIntegrityScore.value != null ? dataIntegrityScore.value : '—'), 1)
                  ]),
                  createBaseVNode("span", null, toDisplayString(lastScanTime.value ? 'Last scan: ' + lastScanTime.value : ''), 1)
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_28, [
            createBaseVNode("div", _hoisted_29, [
              _cache[15] || (_cache[15] = createStaticVNode("<div class=\"p-5 flex justify-between items-center bg-white\" data-v-82593247><h3 class=\"text-headline-md font-headline font-semibold text-on-surface font-bold\" data-v-82593247>Execution History</h3><div class=\"flex items-center gap-2 text-sm\" data-v-82593247><span class=\"text-on-surface-variant\" data-v-82593247>Filter by:</span><select class=\"border border-gray-300 rounded-sm text-sm py-1 pl-2 pr-8 bg-white\" data-v-82593247><option data-v-82593247>All Statuses</option><option data-v-82593247>Running</option><option data-v-82593247>Completed</option><option data-v-82593247>Failed</option></select></div></div>", 1)),
              createBaseVNode("div", _hoisted_30, [
                createBaseVNode("table", _hoisted_31, [
                  _cache[12] || (_cache[12] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Run ID"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Batch ID"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Duration"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Rows (RCV/VAL/LD/REJ)"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Quality Score"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Status"),
                      createBaseVNode("th", { class: "p-4 font-semibold" }, "Action")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", _hoisted_32, [
                    (executionRuns.value.length === 0)
                      ? (openBlock(), createElementBlock("tr", _hoisted_33, [...(_cache[10] || (_cache[10] = [
                          createBaseVNode("td", {
                            colspan: "7",
                            class: "p-12 text-center text-body-md text-secondary"
                          }, "No execution runs recorded", -1)
                        ]))]))
                      : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(executionRuns.value, (run) => {
                      return (openBlock(), createElementBlock("tr", {
                        key: run.id,
                        class: "hover:bg-white-container-low transition-colors cursor-pointer",
                        onClick: $event => (unref(router).push('/dashboard/etl-run-history/batch/' + run.auditId))
                      }, [
                        createBaseVNode("td", {
                          class: normalizeClass(["p-4 font-semibold", run.status === 'FAILED' ? 'text-primary' : 'text-on-surface'])
                        }, toDisplayString(run.runId), 3),
                        createBaseVNode("td", _hoisted_35, toDisplayString(run.batchId), 1),
                        createBaseVNode("td", _hoisted_36, toDisplayString(run.duration), 1),
                        createBaseVNode("td", _hoisted_37, toDisplayString(run.rows), 1),
                        createBaseVNode("td", _hoisted_38, [
                          createBaseVNode("div", _hoisted_39, [
                            createBaseVNode("div", {
                              class: normalizeClass(["h-full", run.qualityColor]),
                              style: normalizeStyle({ width: run.quality + '%' })
                            }, null, 6)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_40, [
                          createBaseVNode("span", {
                            class: normalizeClass(['inline-flex items-center gap-1.5 text-xs font-bold', run.statusColor])
                          }, [
                            (run.status === 'RUNNING')
                              ? (openBlock(), createElementBlock("span", {
                                  key: 0,
                                  class: normalizeClass(["w-1.5 h-1.5 rounded-full animate-pulse", run.statusDot])
                                }, null, 2))
                              : createCommentVNode("", true),
                            (run.status === 'COMPLETED')
                              ? (openBlock(), createElementBlock("span", _hoisted_41, "check"))
                              : createCommentVNode("", true),
                            (run.status === 'FAILED')
                              ? (openBlock(), createElementBlock("span", _hoisted_42, "close"))
                              : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(run.status), 1)
                          ], 2)
                        ]),
                        createBaseVNode("td", _hoisted_43, [
                          createBaseVNode("button", {
                            onClick: withModifiers($event => (unref(router).push('/dashboard/etl-run-history/batch/' + run.auditId)), ["stop"]),
                            class: "p-1 rounded-sm hover:bg-white-variant",
                            title: "View batch details"
                          }, [...(_cache[11] || (_cache[11] = [
                            createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "open_in_new", -1)
                          ]))], 8, _hoisted_44)
                        ])
                      ], 8, _hoisted_34))
                    }), 128))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_45, [
                createBaseVNode("span", null, toDisplayString(pagination.value.total ? `Showing ${pagination.value.from} to ${pagination.value.to} of ${pagination.value.total} results` : 'No results'), 1),
                createBaseVNode("div", _hoisted_46, [
                  createBaseVNode("button", {
                    onClick: prevPage,
                    disabled: pagination.value.page <= 1,
                    class: "w-8 h-8 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-white-variant disabled:opacity-30"
                  }, [...(_cache[13] || (_cache[13] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "chevron_left", -1)
                  ]))], 8, _hoisted_47),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(etlStore).totalPages, (p) => {
                    return (openBlock(), createElementBlock("button", {
                      key: p,
                      onClick: $event => (goToPage(p)),
                      class: normalizeClass(['w-8 h-8 flex items-center justify-center rounded-sm border font-semibold', p === pagination.value.page ? 'bg-primary text-on-primary border-primary' : 'border-gray-300 hover:bg-white-variant'])
                    }, toDisplayString(p), 11, _hoisted_48))
                  }), 128)),
                  createBaseVNode("button", {
                    onClick: nextPage,
                    disabled: pagination.value.page >= unref(etlStore).totalPages,
                    class: "w-8 h-8 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-white-variant disabled:opacity-30"
                  }, [...(_cache[14] || (_cache[14] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "chevron_right", -1)
                  ]))], 8, _hoisted_49)
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_50, [
            createBaseVNode("div", _hoisted_51, [
              _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Storage Growth", -1)),
              createBaseVNode("div", _hoisted_52, [
                createBaseVNode("span", _hoisted_53, toDisplayString(footerMetrics.value.storageGrowth.value != null ? '+' + footerMetrics.value.storageGrowth.value : '—'), 1),
                (footerMetrics.value.storageGrowth.change != null)
                  ? (openBlock(), createElementBlock("span", _hoisted_54, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "trending_up", -1)),
                      createTextVNode(" " + toDisplayString(footerMetrics.value.storageGrowth.change) + "% ", 1)
                    ]))
                  : createCommentVNode("", true)
              ]),
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "w-full bg-white-variant h-1 rounded-full overflow-hidden mt-4" }, [
                createBaseVNode("div", { class: "w-[75%] h-full bg-primary" })
              ], -1)),
              createBaseVNode("p", _hoisted_55, toDisplayString(footerMetrics.value.storageGrowth.used ? footerMetrics.value.storageGrowth.used + ' of ' + footerMetrics.value.storageGrowth.total + ' Allocated' : '—'), 1)
            ]),
            createBaseVNode("div", _hoisted_56, [
              createBaseVNode("div", null, [
                _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Average Quality", -1)),
                createBaseVNode("div", _hoisted_57, [
                  createBaseVNode("span", _hoisted_58, toDisplayString(footerMetrics.value.averageQuality.value != null ? footerMetrics.value.averageQuality.value + '%' : '—'), 1),
                  (footerMetrics.value.averageQuality.change != null)
                    ? (openBlock(), createElementBlock("span", _hoisted_59, [
                        _cache[19] || (_cache[19] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "arrow_upward", -1)),
                        createTextVNode(" " + toDisplayString(footerMetrics.value.averageQuality.change) + "% ", 1)
                      ]))
                    : createCommentVNode("", true)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_60, [
              createBaseVNode("div", null, [
                _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Failed Retries", -1)),
                createBaseVNode("div", _hoisted_61, [
                  createBaseVNode("span", _hoisted_62, toDisplayString(footerMetrics.value.failedRetries.count != null ? String(footerMetrics.value.failedRetries.count).padStart(2, '0') : '—'), 1),
                  (footerMetrics.value.failedRetries.status)
                    ? (openBlock(), createElementBlock("span", _hoisted_63, [
                        _cache[21] || (_cache[21] = createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "error", -1)),
                        createTextVNode(" " + toDisplayString(footerMetrics.value.failedRetries.status), 1)
                      ]))
                    : createCommentVNode("", true)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_64, [
              _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Gateway Latency", -1)),
              createBaseVNode("div", _hoisted_65, [
                createBaseVNode("span", _hoisted_66, toDisplayString(footerMetrics.value.gatewayLatency.value != null ? footerMetrics.value.gatewayLatency.value : '—'), 1),
                (footerMetrics.value.gatewayLatency.level)
                  ? (openBlock(), createElementBlock("span", _hoisted_67, [
                      _cache[23] || (_cache[23] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "warning", -1)),
                      createTextVNode(" " + toDisplayString(footerMetrics.value.gatewayLatency.level), 1)
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("p", _hoisted_68, toDisplayString(footerMetrics.value.gatewayLatency.note || '—'), 1)
            ])
          ])
        ], 64)),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showTrigger.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-50 flex items-center justify-center",
            onClick: withModifiers(closeTriggerModal, ["self"])
          }, [
            _cache[30] || (_cache[30] = createBaseVNode("div", { class: "absolute inset-0 bg-black/40 backdrop-blur-sm" }, null, -1)),
            createBaseVNode("div", _hoisted_69, [
              _cache[29] || (_cache[29] = createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface mb-4" }, "Trigger Pipeline Run", -1)),
              (triggerConfigsLoading.value)
                ? (openBlock(), createElementBlock("div", _hoisted_70, [...(_cache[25] || (_cache[25] = [
                    createBaseVNode("div", { class: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }, null, -1)
                  ]))]))
                : (triggerConfigsError.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_71, [
                      createBaseVNode("p", null, toDisplayString(triggerConfigsError.value), 1),
                      createBaseVNode("button", {
                        onClick: openTriggerModal,
                        class: "text-primary font-semibold hover:underline mt-1"
                      }, "Retry")
                    ]))
                  : (triggerConfigs.value.length === 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_72, " No extraction specs found in etl/config/extraction_specs/ "))
                    : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                        _cache[28] || (_cache[28] = createBaseVNode("label", { class: "block text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Select extraction spec", -1)),
                        withDirectives(createBaseVNode("select", {
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((selectedConfig).value = $event)),
                          class: "w-full border border-gray-300 rounded-sm bg-white text-on-surface text-sm py-2 pl-3 pr-8 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        }, [
                          _cache[26] || (_cache[26] = createBaseVNode("option", {
                            value: null,
                            disabled: ""
                          }, "— Choose a config —", -1)),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(triggerConfigs.value, (cfg) => {
                            return (openBlock(), createElementBlock("option", {
                              key: cfg.name,
                              value: cfg.name
                            }, toDisplayString(cfg.name) + " — " + toDisplayString(cfg.description || 'No description'), 9, _hoisted_73))
                          }), 128))
                        ], 512), [
                          [vModelSelect, selectedConfig.value]
                        ]),
                        createBaseVNode("div", _hoisted_74, [
                          createBaseVNode("button", {
                            onClick: closeTriggerModal,
                            disabled: triggerRunning.value,
                            class: "px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-white-variant transition-colors disabled:opacity-50"
                          }, "Cancel", 8, _hoisted_75),
                          createBaseVNode("button", {
                            onClick: confirmTrigger,
                            disabled: !selectedConfig.value || triggerRunning.value,
                            class: "px-4 py-2 text-sm bg-primary text-on-primary rounded-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2"
                          }, [
                            (triggerRunning.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_77))
                              : createCommentVNode("", true),
                            _cache[27] || (_cache[27] = createTextVNode(" Run Pipeline ", -1))
                          ], 8, _hoisted_76)
                        ])
                      ], 64))
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ]))
}
}

};
const ETLRunHistory = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-82593247"]]);

export { ETLRunHistory as default };
