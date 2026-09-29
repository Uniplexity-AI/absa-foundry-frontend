import { _ as _export_sfc, r as ref, i as computed, f as onMounted, c as createElementBlock, q as createVNode, b as createBaseVNode, F as Fragment, e as renderList, t as toDisplayString, s as unref, A as createTextVNode, h as normalizeClass, j as createCommentVNode, n as normalizeStyle, u as useRouter, E as useRoute, o as openBlock } from './index-BCpxTSoZ.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-CTLPUikb.js';
import { b as fetchETLRunDetail } from './etlApi-DSM4IIiq.js';

const _hoisted_1 = { class: "dashboard-root w-full min-h-screen p-4 md:p-6 lg:p-8" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-screen flex flex-col space-y-8"
};
const _hoisted_3 = { class: "grid grid-cols-4 gap-4" };
const _hoisted_4 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-300 p-8 text-center"
};
const _hoisted_5 = { class: "text-body-md text-red-600 mb-2" };
const _hoisted_6 = { class: "flex items-center justify-between mb-6" };
const _hoisted_7 = { class: "flex items-center gap-4" };
const _hoisted_8 = { class: "font-mono text-sm text-on-surface font-bold" };
const _hoisted_9 = {
  key: 0,
  class: "w-1.5 h-1.5 rounded-full animate-pulse bg-amber-500"
};
const _hoisted_10 = {
  key: 1,
  class: "material-symbols-outlined text-[14px]"
};
const _hoisted_11 = {
  key: 2,
  class: "material-symbols-outlined text-[14px]"
};
const _hoisted_12 = { class: "text-sm text-on-surface-variant text-right" };
const _hoisted_13 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" };
const _hoisted_14 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_15 = { class: "pp-track mt-3" };
const _hoisted_16 = { class: "text-xs text-on-surface-variant mt-2" };
const _hoisted_17 = {
  key: 0,
  class: "text-[#4CAF50] font-semibold ml-1"
};
const _hoisted_18 = {
  key: 1,
  class: "text-[#DC0037] font-semibold ml-1"
};
const _hoisted_19 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_20 = { class: "text-metric-lg font-metric-lg text-on-surface" };
const _hoisted_21 = { class: "text-xs text-on-surface-variant mt-2" };
const _hoisted_22 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_23 = { class: "space-y-1" };
const _hoisted_24 = { class: "flex justify-between text-sm" };
const _hoisted_25 = { class: "text-on-surface font-semibold" };
const _hoisted_26 = { class: "flex justify-between text-sm" };
const _hoisted_27 = { class: "text-on-surface font-semibold" };
const _hoisted_28 = { class: "flex justify-between text-sm" };
const _hoisted_29 = { class: "text-on-surface font-semibold" };
const _hoisted_30 = { class: "flex justify-between text-sm" };
const _hoisted_31 = { class: "text-[#FF780F] font-semibold" };
const _hoisted_32 = { class: "bg-white rounded-sm border border-gray-300 p-5 shadow-none" };
const _hoisted_33 = { class: "space-y-1" };
const _hoisted_34 = { class: "flex justify-between text-sm" };
const _hoisted_35 = { class: "text-on-surface font-semibold" };
const _hoisted_36 = { class: "flex justify-between text-sm" };
const _hoisted_37 = { class: "text-on-surface font-semibold" };
const _hoisted_38 = { class: "flex justify-between text-sm" };
const _hoisted_39 = { class: "text-on-surface font-semibold" };
const _hoisted_40 = { class: "flex justify-between text-sm" };
const _hoisted_41 = { class: "text-on-surface font-semibold" };
const _hoisted_42 = { class: "mb-8" };
const _hoisted_43 = { class: "bg-white rounded-sm border border-gray-300 p-6 shadow-none" };
const _hoisted_44 = { class: "space-y-0" };
const _hoisted_45 = { class: "flex items-start gap-4" };
const _hoisted_46 = { class: "flex flex-col items-center" };
const _hoisted_47 = {
  key: 0,
  class: "w-px h-full min-h-[20px] bg-outline-variant mt-1"
};
const _hoisted_48 = { class: "pb-5 flex-1" };
const _hoisted_49 = { class: "flex justify-between items-start" };
const _hoisted_50 = { class: "font-semibold text-on-surface text-sm" };
const _hoisted_51 = { class: "text-xs text-on-surface-variant" };
const _hoisted_52 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" };
const _hoisted_53 = { class: "bg-white rounded-sm shadow-none overflow-hidden" };
const _hoisted_54 = { class: "overflow-x-auto" };
const _hoisted_55 = { class: "w-full text-left border-collapse" };
const _hoisted_56 = { class: "text-sm" };
const _hoisted_57 = { key: 0 };
const _hoisted_58 = { class: "p-4 text-on-surface font-semibold" };
const _hoisted_59 = { class: "p-4 text-on-surface-variant text-right" };
const _hoisted_60 = { class: "p-4 text-on-surface-variant text-right" };
const _hoisted_61 = {
  key: 1,
  class: "bg-white-container-low font-semibold"
};
const _hoisted_62 = { class: "p-4 text-on-surface text-right" };
const _hoisted_63 = { class: "bg-white rounded-sm shadow-none overflow-hidden" };
const _hoisted_64 = { class: "overflow-x-auto" };
const _hoisted_65 = { class: "w-full text-left border-collapse" };
const _hoisted_66 = { class: "text-sm" };
const _hoisted_67 = { key: 0 };
const _hoisted_68 = { class: "p-4 font-mono text-xs text-on-surface font-semibold" };
const _hoisted_69 = { class: "p-4 text-on-surface-variant text-right" };
const _hoisted_70 = { class: "mb-8" };
const _hoisted_71 = { class: "bg-white rounded-sm shadow-none overflow-hidden" };
const _hoisted_72 = { class: "p-5 bg-white" };
const _hoisted_73 = { class: "flex border-b border-gray-300 mb-0" };
const _hoisted_74 = {
  key: 0,
  class: "overflow-x-auto"
};
const _hoisted_75 = { class: "w-full text-left border-collapse" };
const _hoisted_76 = { class: "text-sm" };
const _hoisted_77 = { key: 0 };
const _hoisted_78 = { class: "p-4 font-mono text-xs text-on-surface" };
const _hoisted_79 = { class: "p-4 font-mono text-xs text-on-surface-variant" };
const _hoisted_80 = { class: "p-4 text-on-surface-variant" };
const _hoisted_81 = { class: "p-4 text-on-surface-variant" };
const _hoisted_82 = { class: "p-4 font-mono text-xs text-on-surface-variant" };
const _hoisted_83 = { class: "p-4" };
const _hoisted_84 = {
  key: 1,
  class: "overflow-x-auto"
};
const _hoisted_85 = { class: "w-full text-left border-collapse" };
const _hoisted_86 = { class: "text-sm" };
const _hoisted_87 = { key: 0 };
const _hoisted_88 = { class: "p-4 font-mono text-xs text-on-surface-variant" };
const _hoisted_89 = { class: "p-4" };
const _hoisted_90 = { class: "p-4 font-mono text-xs text-on-surface-variant" };
const _hoisted_91 = { class: "p-4 text-on-surface" };
const _hoisted_92 = {
  key: 2,
  class: "overflow-x-auto"
};
const _hoisted_93 = { class: "w-full text-left border-collapse" };
const _hoisted_94 = { class: "text-sm" };
const _hoisted_95 = { key: 0 };
const _hoisted_96 = { class: "p-4 font-mono text-xs text-on-surface-variant" };
const _hoisted_97 = { class: "p-4 text-on-surface-variant" };
const _hoisted_98 = { class: "p-4 font-semibold text-on-surface" };
const _hoisted_99 = { class: "p-4 text-on-surface-variant" };
const _hoisted_100 = { class: "mb-8" };
const _hoisted_101 = { class: "bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden" };
const _hoisted_102 = { class: "flex items-center gap-3" };
const _hoisted_103 = { class: "material-symbols-outlined text-on-surface-variant text-[20px]" };
const _hoisted_104 = { class: "text-left" };
const _hoisted_105 = { class: "text-sm text-on-surface-variant" };
const _hoisted_106 = {
  key: 0,
  class: "border-t border-gray-300 flex font-mono text-[13px] leading-[1.6]"
};
const _hoisted_107 = { class: "w-12 flex-shrink-0 text-right pr-4 text-on-surface-variant bg-white-container-low select-none py-4 border-r border-gray-300" };
const _hoisted_108 = { class: "p-4 whitespace-pre text-on-surface overflow-x-auto font-medium" };
const _hoisted_109 = { class: "text-primary font-bold" };


const _sfc_main = {
  __name: 'BatchExecutionDetail',
  setup(__props) {

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);

const runId = computed(() => route.params.runId || '—');

// ── Data from API ──
const batch = ref(null);
const validation = ref(null);

// ── Derived data ──
const rejectionCategories = computed(() => {
  if (!validation.value?.errorByCategory) return []
  return Object.entries(validation.value.errorByCategory).map(([category, rejected]) => ({
    category,
    rejected,
    pct: validation.value.totalErrors ? Math.round((rejected / validation.value.totalErrors) * 1000) / 10 : 0,
  }))
});

const failingRules = computed(() => {
  if (!validation.value?.errorByRule) return []
  return Object.entries(validation.value.errorByRule)
    .map(([ruleId, failures]) => ({ ruleId, failures }))
    .sort((a, b) => b.failures - a.failures)
});

// ── Mock timeline / rejection records (backend doesn't expose these yet) ──
const timeline = ref([
  { step: 'Extract Data', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Validate Schema', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Transform', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Validate Quality', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Load to Warehouse', status: 'COMPLETED', duration: '—', timestamp: '—', detail: null },
  { step: 'Complete', status: 'COMPLETED', duration: null, timestamp: '—', detail: null },
]);

const rejectedRecords = ref([]);
const showConfig = ref(false);
const activeTab = ref('rejected');

// ── Derived: logs & audit from batch data ──
const logs = computed(() => {
  if (!batch.value) return []
  const entries = [];
  if (batch.value.startedAt) {
    entries.push({ timestamp: batch.value.startedAt, level: 'INFO', component: 'pipeline', message: `Pipeline started — triggered by ${batch.value.triggeredBy || 'unknown'}` });
  }
  if (batch.value.sourceName) {
    entries.push({ timestamp: batch.value.startedAt || '—', level: 'INFO', component: 'extractor', message: `Source: ${batch.value.sourceName} (${batch.value.sourceType || 'unknown'})` });
  }
  entries.push({ timestamp: '—', level: 'INFO', component: 'processor', message: `Rows received: ${formatNum(batch.value.rowsReceived)}, valid: ${formatNum(batch.value.rowsValid)}, loaded: ${formatNum(batch.value.rowsLoaded)}` });
  if (batch.value.rowsRejected > 0) {
    entries.push({ timestamp: '—', level: 'WARN', component: 'quality', message: `${formatNum(batch.value.rowsRejected)} rows rejected — quality ${batch.value.qualityScore != null ? batch.value.qualityScore + '%' : '—'}` });
  }
  if (batch.value.duplicatesDetected > 0) {
    entries.push({ timestamp: '—', level: 'WARN', component: 'dedup', message: `${formatNum(batch.value.duplicatesDetected)} duplicates detected` });
  }
  if (batch.value.completedAt) {
    const statusLevel = batch.value.status === 'FAILED' || batch.value.status === 'ERROR' ? 'ERROR' : 'INFO';
    entries.push({ timestamp: batch.value.completedAt, level: statusLevel, component: 'pipeline', message: `Run ${batch.value.status || 'COMPLETED'} — duration ${batch.value.duration || '—'}` });
  }
  return entries
});

const auditTrail = computed(() => {
  if (!batch.value) return []
  const entries = [];
  entries.push({ timestamp: batch.value.startedAt ? batch.value.startedAt.slice(11, 19) : '—', user: batch.value.triggeredBy || 'system', action: 'TRIGGER', description: `Pipeline triggered — ${batch.value.pipelineName || 'etl_full_pipeline'}` });
  entries.push({ timestamp: batch.value.startedAt ? batch.value.startedAt.slice(11, 19) : '—', user: 'system', action: 'EXTRACT', description: `Extraction started — source: ${batch.value.sourceName || 'unknown'}` });
  if (batch.value.completedAt) {
    entries.push({ timestamp: batch.value.completedAt.slice(11, 19), user: 'system', action: batch.value.status || 'COMPLETE', description: `Run ${batch.value.status || 'COMPLETED'} — ${formatNum(batch.value.rowsLoaded)} rows loaded, ${formatNum(batch.value.rowsRejected)} rejected, quality ${batch.value.qualityScore != null ? batch.value.qualityScore + '%' : '—'}` });
  }
  return entries
});

const configName = ref('—');
const configContent = ref('');
const configLines = computed(() => configContent.value.split('\n'));

// ── Status helpers ──
function statusClass(status) {
  if (!status) return 'text-on-surface-variant'
  const s = status.toUpperCase();
  return s === 'COMPLETED' ? 'text-[#4CAF50]' : s === 'FAILED' || s === 'ERROR' ? 'text-[#DC0037]' : 'text-[#FF780F]'
}
function logBadgeClass(level) {
  if (!level) return 'text-on-surface-variant'
  return level === 'ERROR' ? 'text-[#DC0037]' : level === 'WARN' ? 'text-[#FF780F]' : 'text-[#4CAF50]'
}
function formatNum(n) {
  if (n == null) return '—'
  return Number(n).toLocaleString()
}

// Quality score colour — aligned with the ABSA palette
const qualityColor = computed(() => {
  const q = batch.value?.qualityScore;
  if (q == null) return '#857371'
  const sla = batch.value?.slaThreshold;
  if (sla != null && q >= sla) return '#4CAF50'
  if (sla != null && q >= sla * 0.8) return '#FF780F'
  return '#DC0037'
});

onMounted(async () => {
  try {
    const data = await fetchETLRunDetail(runId.value);
    batch.value = data.run;
    validation.value = data.validation || null;

    // Update timeline statuses based on run status
    if (data.run.status === 'FAILED' || data.run.status === 'ERROR') {
      timeline.value[4].status = 'FAILED';
      timeline.value[4].detail = data.run.errorMessage || 'Batch failed';
      timeline.value[5].status = 'FAILED';
    }
    if (data.run.startedAt) {
      timeline.value[0].timestamp = data.run.startedAt;
    }
    if (data.run.completedAt) {
      timeline.value[5].timestamp = data.run.completedAt;
    }
    if (data.run.duration) {
      timeline.value[0].duration = data.run.duration;
    }
    if (data.run.pipelineName) {
      timeline.value.forEach(t => { t.pipeline = data.run.pipelineName; });
    }
    if (data.run.sourceName) {
      timeline.value[0].detail = `Source: ${data.run.sourceName}`;
    }

    // Config name
    if (data.run.sourceName) {
      configName.value = data.run.sourceName;
    }
  } catch (e) {
    error.value = e.message || 'Failed to load batch detail';
    console.error('[BatchDetail] fetch failed:', e);
  } finally {
    loading.value = false;
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$1, { type: "kpi" }),
          createBaseVNode("div", _hoisted_3, [
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
          (error.value)
            ? (openBlock(), createElementBlock("div", _hoisted_4, [
                createBaseVNode("p", _hoisted_5, toDisplayString(error.value), 1),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (unref(router).push('/dashboard/etl-run-history'))),
                  class: "text-sm text-primary font-semibold hover:underline"
                }, "← Back to Run History")
              ]))
            : (batch.value)
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (unref(router).push('/dashboard/etl-run-history'))),
                        class: "flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-semibold"
                      }, [...(_cache[6] || (_cache[6] = [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "arrow_back", -1),
                        createTextVNode(" Run History ", -1)
                      ]))]),
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-on-surface-variant" }, "/", -1)),
                      createBaseVNode("span", _hoisted_8, toDisplayString(batch.value.runId || runId.value), 1),
                      createBaseVNode("span", {
                        class: normalizeClass(['inline-flex items-center gap-1.5 text-xs font-bold', statusClass(batch.value.status)])
                      }, [
                        (batch.value.status === 'RUNNING')
                          ? (openBlock(), createElementBlock("span", _hoisted_9))
                          : createCommentVNode("", true),
                        (batch.value.status === 'COMPLETED')
                          ? (openBlock(), createElementBlock("span", _hoisted_10, "check"))
                          : createCommentVNode("", true),
                        (batch.value.status === 'FAILED' || batch.value.status === 'ERROR')
                          ? (openBlock(), createElementBlock("span", _hoisted_11, "close"))
                          : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(batch.value.status || 'UNKNOWN'), 1)
                      ], 2)
                    ]),
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", null, toDisplayString(batch.value.pipelineName || '—'), 1),
                      createBaseVNode("div", null, "triggered by " + toDisplayString(batch.value.triggeredBy || '—') + " · " + toDisplayString(batch.value.startedAt ? batch.value.startedAt.slice(0, 10) : '—'), 1)
                    ])
                  ]),
                  createBaseVNode("section", _hoisted_13, [
                    createBaseVNode("div", _hoisted_14, [
                      _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-3" }, "Quality Score", -1)),
                      createBaseVNode("span", {
                        class: "text-metric-lg font-metric-lg",
                        style: normalizeStyle({ color: qualityColor.value })
                      }, toDisplayString(batch.value.qualityScore != null ? batch.value.qualityScore + '%' : '—'), 5),
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", {
                          class: "pp-fill",
                          style: normalizeStyle({ width: (batch.value.qualityScore || 0) + '%', background: qualityColor.value })
                        }, null, 4)
                      ]),
                      createBaseVNode("p", _hoisted_16, [
                        createTextVNode("SLA: " + toDisplayString(batch.value.slaThreshold != null ? batch.value.slaThreshold + '%' : '—') + " ", 1),
                        (batch.value.qualityScore != null && batch.value.slaThreshold != null && batch.value.qualityScore >= batch.value.slaThreshold)
                          ? (openBlock(), createElementBlock("span", _hoisted_17, "✓ Met"))
                          : (batch.value.qualityScore != null)
                            ? (openBlock(), createElementBlock("span", _hoisted_18, "✗ Below"))
                            : createCommentVNode("", true)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_19, [
                      _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Duration", -1)),
                      createBaseVNode("span", _hoisted_20, toDisplayString(batch.value.duration || '—'), 1),
                      createBaseVNode("p", _hoisted_21, "Started " + toDisplayString(batch.value.startedAt ? batch.value.startedAt.slice(11, 19) : '—') + " · Ended " + toDisplayString(batch.value.completedAt ? batch.value.completedAt.slice(11, 19) : '—'), 1)
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Rows Processed", -1)),
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("div", _hoisted_24, [
                          _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Received", -1)),
                          createBaseVNode("span", _hoisted_25, toDisplayString(formatNum(batch.value.rowsReceived)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_26, [
                          _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Valid", -1)),
                          createBaseVNode("span", _hoisted_27, toDisplayString(formatNum(batch.value.rowsValid)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Loaded", -1)),
                          createBaseVNode("span", _hoisted_29, toDisplayString(formatNum(batch.value.rowsLoaded)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_30, [
                          _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-[#FF780F]" }, "Rejected", -1)),
                          createBaseVNode("span", _hoisted_31, toDisplayString(formatNum(batch.value.rowsRejected)), 1)
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2" }, "Data Quality", -1)),
                      createBaseVNode("div", _hoisted_33, [
                        createBaseVNode("div", _hoisted_34, [
                          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Duplicates", -1)),
                          createBaseVNode("span", _hoisted_35, toDisplayString(formatNum(batch.value.duplicatesDetected)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_36, [
                          _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Warnings", -1)),
                          createBaseVNode("span", _hoisted_37, toDisplayString(formatNum(batch.value.warningsCount)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_38, [
                          _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Errors", -1)),
                          createBaseVNode("span", _hoisted_39, toDisplayString(formatNum(batch.value.errorsCount)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_40, [
                          _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-on-surface-variant" }, "Skipped", -1)),
                          createBaseVNode("span", _hoisted_41, toDisplayString(formatNum(batch.value.rowsSkipped)), 1)
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("section", _hoisted_42, [
                    createBaseVNode("div", _hoisted_43, [
                      _cache[20] || (_cache[20] = createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface mb-6" }, "Execution Timeline", -1)),
                      createBaseVNode("div", _hoisted_44, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(timeline.value, (step, i) => {
                          return (openBlock(), createElementBlock("div", { key: i }, [
                            createBaseVNode("div", _hoisted_45, [
                              createBaseVNode("div", _hoisted_46, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['w-3 h-3 rounded-full mt-1 flex-shrink-0',
                    step.status === 'COMPLETED' ? 'bg-[#4CAF50]' : step.status === 'FAILED' ? 'bg-[#DC0037]' : 'bg-outline-variant'])
                                }, null, 2),
                                (i < timeline.value.length - 1)
                                  ? (openBlock(), createElementBlock("div", _hoisted_47))
                                  : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", _hoisted_48, [
                                createBaseVNode("div", _hoisted_49, [
                                  createBaseVNode("span", _hoisted_50, toDisplayString(step.step), 1),
                                  createBaseVNode("span", _hoisted_51, toDisplayString(step.duration ? step.duration + ' · ' : '') + toDisplayString(step.timestamp), 1)
                                ]),
                                (step.detail)
                                  ? (openBlock(), createElementBlock("p", {
                                      key: 0,
                                      class: normalizeClass(['text-xs mt-1', step.status === 'FAILED' ? 'text-red-600' : 'text-on-surface-variant'])
                                    }, toDisplayString(step.detail), 3))
                                  : createCommentVNode("", true)
                              ])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ]),
                  createBaseVNode("section", _hoisted_52, [
                    createBaseVNode("div", _hoisted_53, [
                      _cache[25] || (_cache[25] = createBaseVNode("div", { class: "p-5 bg-white" }, [
                        createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface font-bold" }, "Rejection by Category")
                      ], -1)),
                      createBaseVNode("div", _hoisted_54, [
                        createBaseVNode("table", _hoisted_55, [
                          _cache[24] || (_cache[24] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "p-4 font-semibold" }, "Category"),
                              createBaseVNode("th", { class: "p-4 font-semibold text-right" }, "Rejected"),
                              createBaseVNode("th", { class: "p-4 font-semibold text-right" }, "% of Total")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_56, [
                            (rejectionCategories.value.length === 0)
                              ? (openBlock(), createElementBlock("tr", _hoisted_57, [...(_cache[21] || (_cache[21] = [
                                  createBaseVNode("td", {
                                    colspan: "3",
                                    class: "p-12 text-center text-body-md text-secondary"
                                  }, "No rejection data available", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(rejectionCategories.value, (cat) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: cat.category,
                                class: "hover:bg-white-container-low transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_58, toDisplayString(cat.category), 1),
                                createBaseVNode("td", _hoisted_59, toDisplayString(formatNum(cat.rejected)), 1),
                                createBaseVNode("td", _hoisted_60, toDisplayString(cat.pct) + "%", 1)
                              ]))
                            }), 128)),
                            (rejectionCategories.value.length > 0)
                              ? (openBlock(), createElementBlock("tr", _hoisted_61, [
                                  _cache[22] || (_cache[22] = createBaseVNode("td", { class: "p-4 text-on-surface" }, "Total", -1)),
                                  createBaseVNode("td", _hoisted_62, toDisplayString(formatNum(batch.value.rowsRejected)), 1),
                                  _cache[23] || (_cache[23] = createBaseVNode("td", { class: "p-4 text-on-surface text-right" }, "100%", -1))
                                ]))
                              : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_63, [
                      _cache[28] || (_cache[28] = createBaseVNode("div", { class: "p-5 bg-white" }, [
                        createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface font-bold" }, "Top Failing Rules")
                      ], -1)),
                      createBaseVNode("div", _hoisted_64, [
                        createBaseVNode("table", _hoisted_65, [
                          _cache[27] || (_cache[27] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "p-4 font-semibold" }, "Rule ID"),
                              createBaseVNode("th", { class: "p-4 font-semibold text-right" }, "Failures")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_66, [
                            (failingRules.value.length === 0)
                              ? (openBlock(), createElementBlock("tr", _hoisted_67, [...(_cache[26] || (_cache[26] = [
                                  createBaseVNode("td", {
                                    colspan: "2",
                                    class: "p-12 text-center text-body-md text-secondary"
                                  }, "No failing rules", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(failingRules.value, (rule) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: rule.ruleId,
                                class: "hover:bg-white-container-low transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_68, toDisplayString(rule.ruleId), 1),
                                createBaseVNode("td", _hoisted_69, toDisplayString(formatNum(rule.failures)), 1)
                              ]))
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("section", _hoisted_70, [
                    createBaseVNode("div", _hoisted_71, [
                      createBaseVNode("div", _hoisted_72, [
                        _cache[29] || (_cache[29] = createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface font-bold mb-4" }, "Investigation", -1)),
                        createBaseVNode("div", _hoisted_73, [
                          createBaseVNode("button", {
                            onClick: _cache[2] || (_cache[2] = $event => (activeTab.value = 'rejected')),
                            class: normalizeClass(['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab.value === 'rejected' ? 'text-[#DC0037] border-[#DC0037]' : 'text-on-surface-variant border-transparent hover:text-on-surface'])
                          }, " Rejected Records (" + toDisplayString(rejectedRecords.value.length) + ") ", 3),
                          createBaseVNode("button", {
                            onClick: _cache[3] || (_cache[3] = $event => (activeTab.value = 'logs')),
                            class: normalizeClass(['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab.value === 'logs' ? 'text-[#DC0037] border-[#DC0037]' : 'text-on-surface-variant border-transparent hover:text-on-surface'])
                          }, " Execution Logs (" + toDisplayString(logs.value.length) + ") ", 3),
                          createBaseVNode("button", {
                            onClick: _cache[4] || (_cache[4] = $event => (activeTab.value = 'audit')),
                            class: normalizeClass(['px-4 py-2 text-sm font-semibold transition-colors border-b-2', activeTab.value === 'audit' ? 'text-[#DC0037] border-[#DC0037]' : 'text-on-surface-variant border-transparent hover:text-on-surface'])
                          }, " Audit Trail (" + toDisplayString(auditTrail.value.length) + ") ", 3)
                        ])
                      ]),
                      (activeTab.value === 'rejected')
                        ? (openBlock(), createElementBlock("div", _hoisted_74, [
                            createBaseVNode("table", _hoisted_75, [
                              _cache[31] || (_cache[31] = createBaseVNode("thead", null, [
                                createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Record ID"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Field"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Actual Value"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Expected"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Rule"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Severity")
                                ])
                              ], -1)),
                              createBaseVNode("tbody", _hoisted_76, [
                                (rejectedRecords.value.length === 0)
                                  ? (openBlock(), createElementBlock("tr", _hoisted_77, [...(_cache[30] || (_cache[30] = [
                                      createBaseVNode("td", {
                                        colspan: "6",
                                        class: "p-12 text-center text-body-md text-secondary"
                                      }, "No rejected records", -1)
                                    ]))]))
                                  : createCommentVNode("", true),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(rejectedRecords.value, (rec) => {
                                  return (openBlock(), createElementBlock("tr", {
                                    key: rec.recordId,
                                    class: "hover:bg-white-container-low transition-colors"
                                  }, [
                                    createBaseVNode("td", _hoisted_78, toDisplayString(rec.recordId), 1),
                                    createBaseVNode("td", _hoisted_79, toDisplayString(rec.field), 1),
                                    createBaseVNode("td", _hoisted_80, toDisplayString(rec.actualValue), 1),
                                    createBaseVNode("td", _hoisted_81, toDisplayString(rec.expected), 1),
                                    createBaseVNode("td", _hoisted_82, toDisplayString(rec.rule), 1),
                                    createBaseVNode("td", _hoisted_83, [
                                      createBaseVNode("span", {
                                        class: normalizeClass(['inline-flex items-center gap-1.5 text-xs font-bold', rec.severity === 'ERROR' ? 'text-[#DC0037]' : 'text-[#FF780F]'])
                                      }, [
                                        createBaseVNode("span", {
                                          class: normalizeClass(['w-1.5 h-1.5 rounded-full', rec.severity === 'ERROR' ? 'bg-[#DC0037]' : 'bg-[#FF780F]'])
                                        }, null, 2),
                                        createTextVNode(" " + toDisplayString(rec.severity), 1)
                                      ], 2)
                                    ])
                                  ]))
                                }), 128))
                              ])
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (activeTab.value === 'logs')
                        ? (openBlock(), createElementBlock("div", _hoisted_84, [
                            createBaseVNode("table", _hoisted_85, [
                              _cache[33] || (_cache[33] = createBaseVNode("thead", null, [
                                createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Timestamp"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Level"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Component"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Message")
                                ])
                              ], -1)),
                              createBaseVNode("tbody", _hoisted_86, [
                                (logs.value.length === 0)
                                  ? (openBlock(), createElementBlock("tr", _hoisted_87, [...(_cache[32] || (_cache[32] = [
                                      createBaseVNode("td", {
                                        colspan: "4",
                                        class: "p-12 text-center text-body-md text-secondary"
                                      }, "No logs recorded", -1)
                                    ]))]))
                                  : createCommentVNode("", true),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(logs.value, (l) => {
                                  return (openBlock(), createElementBlock("tr", {
                                    key: l.timestamp,
                                    class: "hover:bg-white-container-low transition-colors"
                                  }, [
                                    createBaseVNode("td", _hoisted_88, toDisplayString(l.timestamp), 1),
                                    createBaseVNode("td", _hoisted_89, [
                                      createBaseVNode("span", {
                                        class: normalizeClass(['inline-flex items-center gap-1.5 text-xs font-bold', logBadgeClass(l.level)])
                                      }, [
                                        createBaseVNode("span", {
                                          class: normalizeClass(['w-1.5 h-1.5 rounded-full', l.level === 'ERROR' ? 'bg-[#DC0037]' : l.level === 'WARN' ? 'bg-[#FF780F]' : 'bg-[#4CAF50]'])
                                        }, null, 2),
                                        createTextVNode(" " + toDisplayString(l.level), 1)
                                      ], 2)
                                    ]),
                                    createBaseVNode("td", _hoisted_90, toDisplayString(l.component), 1),
                                    createBaseVNode("td", _hoisted_91, toDisplayString(l.message), 1)
                                  ]))
                                }), 128))
                              ])
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (activeTab.value === 'audit')
                        ? (openBlock(), createElementBlock("div", _hoisted_92, [
                            createBaseVNode("table", _hoisted_93, [
                              _cache[35] || (_cache[35] = createBaseVNode("thead", null, [
                                createBaseVNode("tr", { class: "bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider" }, [
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Timestamp"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "User / System"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Action"),
                                  createBaseVNode("th", { class: "p-4 font-semibold" }, "Description")
                                ])
                              ], -1)),
                              createBaseVNode("tbody", _hoisted_94, [
                                (auditTrail.value.length === 0)
                                  ? (openBlock(), createElementBlock("tr", _hoisted_95, [...(_cache[34] || (_cache[34] = [
                                      createBaseVNode("td", {
                                        colspan: "4",
                                        class: "p-12 text-center text-body-md text-secondary"
                                      }, "No audit entries", -1)
                                    ]))]))
                                  : createCommentVNode("", true),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(auditTrail.value, (a) => {
                                  return (openBlock(), createElementBlock("tr", {
                                    key: a.timestamp,
                                    class: "hover:bg-white-container-low transition-colors"
                                  }, [
                                    createBaseVNode("td", _hoisted_96, toDisplayString(a.timestamp), 1),
                                    createBaseVNode("td", _hoisted_97, toDisplayString(a.user), 1),
                                    createBaseVNode("td", _hoisted_98, toDisplayString(a.action), 1),
                                    createBaseVNode("td", _hoisted_99, toDisplayString(a.description), 1)
                                  ]))
                                }), 128))
                              ])
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("section", _hoisted_100, [
                    createBaseVNode("div", _hoisted_101, [
                      createBaseVNode("button", {
                        onClick: _cache[5] || (_cache[5] = $event => (showConfig.value = !showConfig.value)),
                        class: "w-full p-5 flex items-center justify-between bg-white hover:bg-white-container-low transition-colors"
                      }, [
                        createBaseVNode("div", _hoisted_102, [
                          createBaseVNode("span", _hoisted_103, toDisplayString(showConfig.value ? 'expand_less' : 'expand_more'), 1),
                          createBaseVNode("div", _hoisted_104, [
                            _cache[36] || (_cache[36] = createBaseVNode("h3", { class: "text-headline-md font-headline font-semibold text-on-surface font-bold" }, "Config Used", -1)),
                            createBaseVNode("p", _hoisted_105, toDisplayString(configName.value), 1)
                          ])
                        ])
                      ]),
                      (showConfig.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_106, [
                            createBaseVNode("div", _hoisted_107, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(configLines.value, (_, i) => {
                                return (openBlock(), createElementBlock(Fragment, { key: i }, [
                                  createTextVNode(toDisplayString(i + 1), 1),
                                  _cache[37] || (_cache[37] = createBaseVNode("br", null, null, -1))
                                ], 64))
                              }), 128))
                            ]),
                            createBaseVNode("div", _hoisted_108, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(configLines.value, (line, i) => {
                                return (openBlock(), createElementBlock(Fragment, { key: i }, [
                                  createBaseVNode("span", _hoisted_109, toDisplayString(line.match(/^\s*\w+/) ? line.match(/^\s*\w+/)[0] : ''), 1),
                                  createBaseVNode("span", null, toDisplayString(line.replace(/^\s*\w+/, '')), 1),
                                  _cache[38] || (_cache[38] = createBaseVNode("br", null, null, -1))
                                ], 64))
                              }), 128))
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ], 64))
              : createCommentVNode("", true)
        ], 64))
  ]))
}
}

};
const BatchExecutionDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-3ae78c66"]]);

export { BatchExecutionDetail as default };
