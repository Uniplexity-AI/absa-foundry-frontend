import { r as ref, f as onMounted, H as onUnmounted, o as openBlock, c as createElementBlock, k as renderSlot, b as createBaseVNode, v as withModifiers, q as createVNode, w as withCtx, h as normalizeClass, t as toDisplayString, j as createCommentVNode, F as Fragment, e as renderList, n as normalizeStyle, A as createTextVNode, W as Transition, i as computed, s as unref, a as createStaticVNode, x as withDirectives, X as vModelRadio, Y as isRef, y as vModelText } from './index-DJl1D5pd.js';
import { _ as _sfc_main$2 } from './LoadingSkeleton-mE7Hou2B.js';
import { u as useIntelligenceStore, a as useClvBands } from './intelligenceStore-C6n_S60n.js';
import { useSnapshotStore } from './snapshotStore-DgtrZJFu.js';
import { u as useModelsStore } from './modelsStore-CGDnWD9a.js';
import { n as notify, d as downloadCsv, r as reportFilename } from './absaExport-C5nNZeBD.js';
import { l as getActionState, c as hydrateStateFromServer, m as enrolCustomer, n as assignRm, r as recordAction } from './absaActions-BJQlSYgT.js';

const _hoisted_1$1 = ["aria-label"];
const _hoisted_2$1 = { class: "px-3 py-2 border-b border-gray-200 flex items-center justify-between" };
const _hoisted_3$1 = {
  key: 0,
  class: "text-[11px] text-absa-enrich font-semibold mt-0.5 truncate max-w-[200px]"
};
const _hoisted_4$1 = { class: "px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between" };
const _hoisted_5$1 = { class: "text-[10px] text-gray-500 font-semibold uppercase tracking-wider" };
const _hoisted_6$1 = {
  key: 0,
  class: "text-right"
};
const _hoisted_7$1 = { class: "text-[11px] font-mono text-gray-600" };
const _hoisted_8$1 = {
  key: 1,
  class: "text-right"
};
const _hoisted_9$1 = { class: "text-[11px] font-mono text-gray-600" };
const _hoisted_10$1 = { class: "px-3 py-2" };
const _hoisted_11$1 = { class: "flex items-center justify-between mb-0.5" };
const _hoisted_12$1 = { class: "text-[11px] text-absa-enrich font-semibold truncate max-w-[160px]" };
const _hoisted_13$1 = { class: "h-1 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_14$1 = {
  key: 0,
  class: "text-[11px] text-gray-400 italic"
};
const _hoisted_15$1 = { class: "px-3 py-1.5 border-t border-gray-200 bg-gray-50" };
const _hoisted_16$1 = { class: "text-[10px] text-gray-400" };
const _hoisted_17$1 = { class: "text-absa-enrich font-semibold" };


const _sfc_main$1 = {
  __name: 'MlExplainPopover',
  props: {
  /** Customer/entity name for the header label */
  label: { type: String, default: '' },
  /** The raw numeric score (e.g. 0.82 for churn, or 1240000 for CLV) */
  score: { type: [Number, String], default: null },
  /** Displayed score string (pre-formatted, e.g. "0.82" or "K 1.24M") */
  displayScore: { type: String, default: '—' },
  /** Label for the score row (e.g. "Churn Probability" or "Customer Lifetime Value") */
  scoreLabel: { type: String, default: 'Score' },
  /** Tailwind class for the score value color */
  scoreClass: { type: String, default: 'text-absa-enrich' },
  /** ± confidence figure as a string (e.g. "0.06") */
  confidence: { type: String, default: null },
  /** P10 lower bound string */
  confidenceLow: { type: String, default: null },
  /** P90 upper bound string */
  confidenceHigh: { type: String, default: null },
  /**
   * Feature driver objects:
   * [{ label: String, impact: Number (-1 to +1), direction: 'negative' | 'positive' }]
   */
  drivers: { type: Array, default: () => [] },
  /** Date score was generated */
  scoreDate: { type: String, default: null },
  /** Model version string */
  modelVersion: { type: String, default: '2.1' },
  /** Align popover to the right edge instead of left (for table columns near right margin) */
  alignRight: { type: Boolean, default: false },
},
  setup(__props) {

const open = ref(false);
const containerRef = ref(null);

function toggle() {
  open.value = !open.value;
}

function handleOutsideClick(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("span", {
    class: "relative inline-flex items-center gap-1",
    ref_key: "containerRef",
    ref: containerRef
  }, [
    renderSlot(_ctx.$slots, "default"),
    createBaseVNode("button", {
      onClick: withModifiers(toggle, ["stop"]),
      class: "inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:text-absa-passion hover:bg-gray-100 transition-colors focus:outline-none",
      "aria-label": `Explain score for ${__props.label}`,
      title: "Explain score"
    }, [...(_cache[1] || (_cache[1] = [
      createBaseVNode("span", {
        class: "material-symbols-outlined",
        style: {"font-size":"13px","line-height":"1"}
      }, "info", -1)
    ]))], 8, _hoisted_1$1),
    createVNode(Transition, {
      "enter-active-class": "transition duration-150 ease-out",
      "enter-from-class": "opacity-0 scale-95 translate-y-1",
      "enter-to-class": "opacity-100 scale-100 translate-y-0",
      "leave-active-class": "transition duration-100 ease-in",
      "leave-from-class": "opacity-100 scale-100 translate-y-0",
      "leave-to-class": "opacity-0 scale-95 translate-y-1"
    }, {
      default: withCtx(() => [
        (open.value)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["absolute z-50 bg-white border border-gray-300 rounded-sm shadow-lg w-72", __props.alignRight ? 'right-0 top-6' : 'left-0 top-6'])
            }, [
              createBaseVNode("div", _hoisted_2$1, [
                createBaseVNode("div", null, [
                  _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "ML Score Explanation", -1)),
                  (__props.label)
                    ? (openBlock(), createElementBlock("p", _hoisted_3$1, toDisplayString(__props.label), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (open.value = false)),
                  class: "text-gray-400 hover:text-gray-700 focus:outline-none ml-2"
                }, [...(_cache[3] || (_cache[3] = [
                  createBaseVNode("span", {
                    class: "material-symbols-outlined",
                    style: {"font-size":"14px"}
                  }, "close", -1)
                ]))])
              ]),
              createBaseVNode("div", _hoisted_4$1, [
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_5$1, toDisplayString(__props.scoreLabel), 1),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-lg font-bold font-mono", __props.scoreClass])
                  }, toDisplayString(__props.displayScore), 3)
                ]),
                (__props.confidenceLow !== null && __props.confidenceHigh !== null)
                  ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
                      _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-[10px] text-gray-500 font-semibold uppercase tracking-wider" }, "80% CI", -1)),
                      createBaseVNode("p", _hoisted_7$1, toDisplayString(__props.confidenceLow) + " – " + toDisplayString(__props.confidenceHigh), 1)
                    ]))
                  : (openBlock(), createElementBlock("div", _hoisted_8$1, [
                      _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-[10px] text-gray-400" }, "Confidence", -1)),
                      createBaseVNode("p", _hoisted_9$1, "± " + toDisplayString(__props.confidence ?? '—'), 1)
                    ]))
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Top Feature Drivers", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.drivers, (driver, i) => {
                  return (openBlock(), createElementBlock("div", {
                    key: i,
                    class: "mb-2 last:mb-0"
                  }, [
                    createBaseVNode("div", _hoisted_11$1, [
                      createBaseVNode("span", _hoisted_12$1, toDisplayString(driver.label), 1),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-[11px] font-mono font-bold ml-2 shrink-0", driver.direction === 'negative' ? 'text-absa-inspire' : 'text-absa-passion'])
                      }, toDisplayString(driver.direction === 'negative' ? '▲' : '▼') + " " + toDisplayString(Math.abs(driver.impact * 100).toFixed(0)) + "pp ", 3)
                    ]),
                    createBaseVNode("div", _hoisted_13$1, [
                      createBaseVNode("div", {
                        class: normalizeClass(["h-full rounded-full transition-all", driver.direction === 'negative' ? 'bg-absa-inspire' : 'bg-absa-passion']),
                        style: normalizeStyle({ width: Math.min(Math.abs(driver.impact) * 3 * 100, 100) + '%' })
                      }, null, 6)
                    ])
                  ]))
                }), 128)),
                (!__props.drivers || __props.drivers.length === 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_14$1, " No feature data available. "))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                createBaseVNode("p", _hoisted_16$1, [
                  createTextVNode(" Score generated: " + toDisplayString(__props.scoreDate ?? 'Last model run') + " · ", 1),
                  createBaseVNode("span", _hoisted_17$1, "Model v" + toDisplayString(__props.modelVersion ?? '2.1'), 1)
                ])
              ])
            ], 2))
          : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 512))
}
}

};

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_3 = { class: "mt-2.5 flex items-center gap-2" };
const _hoisted_4 = {
  key: 0,
  class: "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded-sm text-[11px] font-semibold text-emerald-800"
};
const _hoisted_5 = {
  key: 1,
  class: "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-50 border border-gray-200 rounded-sm text-[11px] font-semibold text-gray-500"
};
const _hoisted_6 = {
  key: 2,
  class: "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-200 rounded-sm text-[11px] font-semibold text-amber-800"
};
const _hoisted_7 = { class: "flex items-center gap-3" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_10 = {
  key: 0,
  class: "mt-6"
};
const _hoisted_11 = {
  key: 1,
  class: "mt-6"
};
const _hoisted_12 = { class: "bg-white border border-gray-300 rounded-sm p-8 text-center max-w-2xl mx-auto shadow-sm" };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { class: "text-[12px] text-emerald-700 font-medium mt-0.5" };
const _hoisted_15 = { class: "mt-5 p-4 bg-amber-50 border border-amber-200 rounded-sm text-left" };
const _hoisted_16 = { class: "flex items-start gap-2.5" };
const _hoisted_17 = { class: "text-xs font-bold text-amber-900" };
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "flex border-b border-gray-300 mb-6 mt-4" };
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_22 = { key: 0 };
const _hoisted_23 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_24 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_25 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_26 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_27 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_28 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_29 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_30 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_31 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_32 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_33 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_34 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_35 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_36 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_37 = { class: "p-5" };
const _hoisted_38 = { class: "space-y-5" };
const _hoisted_39 = { class: "w-36 flex-shrink-0" };
const _hoisted_40 = { class: "text-[10px] text-gray-400 mt-0.5" };
const _hoisted_41 = { class: "w-20 flex-shrink-0 text-right" };
const _hoisted_42 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_43 = { class: "flex-1" };
const _hoisted_44 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_45 = { class: "w-24 flex-shrink-0 text-right" };
const _hoisted_46 = { class: "text-xs font-mono text-absa-enrich" };
const _hoisted_47 = { class: "w-20 flex-shrink-0 text-right" };
const _hoisted_48 = { key: 1 };
const _hoisted_49 = { class: "bg-white border border-gray-300 rounded-sm p-4 mb-6" };
const _hoisted_50 = { class: "flex items-start justify-between mb-3" };
const _hoisted_51 = { class: "flex items-center gap-3" };
const _hoisted_52 = { class: "text-[10px] text-gray-500 flex items-center gap-1" };
const _hoisted_53 = { class: "text-[10px] text-gray-500 flex items-center gap-1" };
const _hoisted_54 = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 gap-3"
};
const _hoisted_55 = ["onUpdate:modelValue"];
const _hoisted_56 = ["onUpdate:modelValue"];
const _hoisted_57 = {
  key: 1,
  class: "text-[11px] text-red-600 mt-2"
};
const _hoisted_58 = { class: "flex items-center gap-2 mt-3" };
const _hoisted_59 = ["disabled"];
const _hoisted_60 = ["disabled"];
const _hoisted_61 = {
  key: 0,
  class: "text-[10px] text-gray-400 font-mono truncate"
};
const _hoisted_62 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" };
const _hoisted_63 = { class: "flex items-center justify-between mb-3" };
const _hoisted_64 = { class: "text-[10px] text-gray-400 mt-0.5" };
const _hoisted_65 = { class: "text-[10px] text-gray-400" };
const _hoisted_66 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_67 = { class: "text-base font-mono font-bold text-absa-enrich" };
const _hoisted_68 = { class: "text-base font-mono font-bold text-absa-enrich" };
const _hoisted_69 = { class: "text-base font-mono font-bold text-absa-enrich" };
const _hoisted_70 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_71 = { class: "overflow-x-auto" };
const _hoisted_72 = { class: "w-full text-left border-collapse" };
const _hoisted_73 = { class: "divide-y divide-gray-100" };
const _hoisted_74 = { class: "px-3 py-1.5" };
const _hoisted_75 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_76 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_77 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_78 = { class: "px-3 py-1.5" };
const _hoisted_79 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_80 = { class: "px-3 py-1.5 text-xs font-mono text-absa-passion font-bold" };
const _hoisted_81 = { key: 2 };
const _hoisted_82 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_83 = {
  key: 0,
  class: "px-4 pb-3 pt-0 border-t border-gray-100"
};
const _hoisted_84 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" };
const _hoisted_85 = { class: "rounded-sm border border-gray-300 overflow-hidden bg-red-50" };
const _hoisted_86 = { class: "p-5" };
const _hoisted_87 = { class: "flex items-end gap-2" };
const _hoisted_88 = { class: "text-3xl font-bold font-mono text-absa-passion" };
const _hoisted_89 = { class: "rounded-sm border border-gray-300 overflow-hidden bg-red-50" };
const _hoisted_90 = { class: "p-5" };
const _hoisted_91 = { class: "flex items-end gap-2" };
const _hoisted_92 = { class: "text-3xl font-bold font-mono text-absa-passion" };
const _hoisted_93 = { class: "rounded-sm border border-gray-300 overflow-hidden bg-amber-50" };
const _hoisted_94 = { class: "p-5" };
const _hoisted_95 = { class: "flex items-end gap-2" };
const _hoisted_96 = { class: "text-3xl font-bold font-mono text-amber-700" };
const _hoisted_97 = { class: "rounded-sm border border-gray-300 overflow-hidden bg-gray-50" };
const _hoisted_98 = { class: "p-5" };
const _hoisted_99 = { class: "flex items-end gap-2" };
const _hoisted_100 = { class: "text-3xl font-bold font-mono text-gray-600" };
const _hoisted_101 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_102 = { class: "overflow-x-auto" };
const _hoisted_103 = { class: "w-full text-left border-collapse" };
const _hoisted_104 = { class: "divide-y divide-gray-100" };
const _hoisted_105 = { class: "px-3 py-1.5 text-xs font-mono text-gray-500" };
const _hoisted_106 = { class: "px-3 py-1.5 text-xs font-semibold text-absa-enrich" };
const _hoisted_107 = { class: "px-3 py-1.5 text-xs text-gray-500" };
const _hoisted_108 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_109 = { class: "px-3 py-1.5" };
const _hoisted_110 = { class: "px-3 py-1.5" };
const _hoisted_111 = { class: "px-3 py-1.5" };
const _hoisted_112 = ["onClick"];
const _hoisted_113 = ["onClick"];
const _hoisted_114 = ["onClick"];
const _hoisted_115 = {
  key: 3,
  class: "text-xs text-gray-400"
};
const _hoisted_116 = { key: 3 };
const _hoisted_117 = {
  key: 0,
  class: "flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3"
};
const _hoisted_118 = { class: "text-sm font-semibold" };
const _hoisted_119 = { class: "flex items-center gap-2 ml-auto" };
const _hoisted_120 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_121 = { class: "overflow-x-auto" };
const _hoisted_122 = { class: "w-full text-left border-collapse" };
const _hoisted_123 = { class: "border-b border-gray-200 bg-gray-50" };
const _hoisted_124 = { class: "px-3 py-2 w-8" };
const _hoisted_125 = ["checked"];
const _hoisted_126 = { class: "divide-y divide-gray-100" };
const _hoisted_127 = { class: "px-3 py-1.5 w-8" };
const _hoisted_128 = ["checked", "onChange"];
const _hoisted_129 = { class: "px-3 py-1.5" };
const _hoisted_130 = { class: "text-xs font-semibold text-absa-enrich" };
const _hoisted_131 = { class: "text-[10px] font-mono text-gray-400" };
const _hoisted_132 = { class: "px-3 py-1.5 text-xs text-gray-500" };
const _hoisted_133 = { class: "px-3 py-1.5" };
const _hoisted_134 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_135 = { class: "px-3 py-1.5" };
const _hoisted_136 = { class: "flex flex-col gap-1" };
const _hoisted_137 = { class: "w-16 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_138 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_139 = { class: "px-3 py-1.5 text-xs text-gray-500" };
const _hoisted_140 = { key: 0 };
const _hoisted_141 = {
  key: 1,
  class: "text-gray-300 italic text-[11px]"
};
const _hoisted_142 = { class: "px-3 py-1.5" };
const _hoisted_143 = {
  key: 0,
  class: "text-xs font-bold font-mono text-absa-passion"
};
const _hoisted_144 = {
  key: 1,
  class: "text-xs font-bold font-mono text-amber-700"
};
const _hoisted_145 = {
  key: 2,
  class: "text-xs font-mono text-gray-500"
};
const _hoisted_146 = { class: "px-3 py-1.5" };
const _hoisted_147 = ["onClick"];
const _hoisted_148 = ["onClick"];


const _sfc_main = {
  __name: 'CustomerValueIntelligence',
  setup(__props) {

const store = useIntelligenceStore();
const snapshotStore = useSnapshotStore();
const modelsStore = useModelsStore();

const clvModel = computed(() => {
  return (
    modelsStore.models.find(
      (m) => m.type === 'clv' || m.id?.includes('clv') || m.model_id?.includes('clv')
    ) || modelsStore.championCLV
  )
});

const isClvModelLoaded = computed(() => {
  return !!clvModel.value || modelsStore.models.length > 0
});

// Value-band boundaries (absolute ZMW). Persisted per browser; the store reads
// the saved spec when it fetches, so no call site has to thread it through.
const {
  mode: bandMode, rows: bandRows, error: bandError,
  isCustom: bandsCustom, preview: bandPreview,
  apply: applyBandConfig, reset: resetBandConfig,
} = useClvBands();

async function applyBands() {
  if (!applyBandConfig()) return        // invalid configuration; message already shown
  await store.fetchClv();
}

async function resetBands() {
  resetBandConfig();
  await store.fetchClv();
}
const loading = ref(true);
const activeTab = ref('overview');

const tabs = [
  { id: 'overview',   label: 'Overview',            icon: 'insights'    },
  { id: 'segments',   label: 'Value Segments',      icon: 'donut_large' },
  { id: 'matrix',     label: 'Priority Matrix',     icon: 'grid_on'     },
  { id: 'customers',  label: 'Top Value Customers', icon: 'star'        },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (val >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (val >= 1e3) return 'K ' + (val / 1e3).toFixed(0) + 'K'
  return 'K ' + val.toLocaleString()
}

function getQuadrant(clvPercentile, prob) {
  // Option A: the quadrant is decided by CLV *percentile* (>0.5 = high value),
  // not an absolute money threshold. The trained CLV model returns 12-month net
  // revenue (ZMW) — a very different scale from the old AUM proxy — so a fixed
  // K100K cutoff would push every customer into MONITOR/OBSERVE.
  const highValue = (clvPercentile ?? 0) > 0.5;
  if (highValue && prob > 0.5) return 'PROTECT'
  if (highValue && prob <= 0.5) return 'MAINTAIN'
  if (!highValue && prob > 0.5) return 'MONITOR'
  return 'OBSERVE'
}

function quadrantClass(q) {
  if (q === 'PROTECT')  return 'bg-red-100 text-absa-inspire'
  if (q === 'MAINTAIN') return 'bg-red-50 text-absa-passion'
  if (q === 'MONITOR')  return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-600'
}

function churnProbColor(prob) {
  if (prob > 0.4)  return 'text-absa-inspire'
  if (prob > 0.25) return 'text-absa-power'
  return 'text-absa-passion'
}

function bandBadgeClass(band) {
  const b = (band || '').toUpperCase();
  if (b === 'PLATINUM') return 'bg-gray-200 text-gray-700'
  if (b === 'GOLD')     return 'bg-amber-100 text-amber-700'
  if (b === 'SILVER')   return 'bg-gray-100 text-gray-500'
  return 'bg-gray-50 text-gray-400'
}

// ─── Computed ────────────────────────────────────────────────────────────────

const platinumGoldCount = computed(() => {
  const bands = store.clvData?.bands ?? [];
  return bands
    .filter(b => { const n = (b.band || '').toUpperCase(); return n === 'PLATINUM' || n === 'GOLD' })
    .reduce((acc, b) => acc + (b.count ?? 0), 0)
});

const totalCustomers = computed(() =>
  (store.clvData?.bands ?? []).reduce((acc, b) => acc + (b.count ?? 0), 0)
);

const bandsWithPct = computed(() => {
  const total = totalCustomers.value || 1;
  return (store.clvData?.bands ?? []).map(b => ({
    ...b,
    pct: Math.round((b.count / total) * 100),
  }))
});

function bandPct(count) {
  const total = totalCustomers.value || 1;
  return ((count / total) * 100).toFixed(1)
}

const top10ByCLV = computed(() =>
  [...(store.clvData?.top_customers ?? [])]
    .sort((a, b) => (b.clv ?? 0) - (a.clv ?? 0))
    .slice(0, 10)
);

const protectCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'PROTECT').length
);
const maintainCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'MAINTAIN').length
);
const monitorCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'MONITOR').length
);
const observeCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'OBSERVE').length
);

// ─── Remediation 6: Collapsible scope note ───────────────────────────────────
const matrixScopeExpanded = ref(true);

// ─── Remediation 5: Bulk selection ───────────────────────────────────────────
const selectedCustomers = ref(new Set());

const allSelected = computed(() => {
  const customers = store.clvData?.top_customers ?? [];
  return customers.length > 0 && customers.every(c => selectedCustomers.value.has(c.customer_id))
});

function toggleSelectAll() {
  const customers = store.clvData?.top_customers ?? [];
  if (allSelected.value) {
    selectedCustomers.value = new Set();
  } else {
    selectedCustomers.value = new Set(customers.map(c => c.customer_id));
  }
}

function toggleCustomer(id) {
  const s = new Set(selectedCustomers.value);
  if (s.has(id)) s.delete(id);
  else s.add(id);
  selectedCustomers.value = s;
}

function bulkAction(action) {
  const ids = Array.from(selectedCustomers.value);
  if (!ids.length) return
  if (action === 'Enrol in Campaign') {
    ids.forEach((id) => enrolCustomer(id, 'Value Retention Cohort'));
    notify(`Enrolled ${ids.length} customer${ids.length === 1 ? '' : 's'} in Value Retention Cohort`, 'success');
  } else if (action === 'Assign RM') {
    ids.forEach((id, i) => assignRm(id, poolRm(i), false));
    notify(`Assigned RM to ${ids.length} customer${ids.length === 1 ? '' : 's'}`, 'success');
  } else {
    recordAction({ type: 'BULK_ACTION', detail: `${action} for ${ids.length} customers` });
    notify(`Bulk action "${action}" completed for ${ids.length} customers`, 'success');
  }
  selectedCustomers.value = new Set();
}

function clearSelection() {
  selectedCustomers.value = new Set();
}

// ─── Action handlers (row + bulk) ────────────────────────────────────────────

// Deterministic "pool" of RM names so assignments look plausible in the PoC.
const RM_POOL = ['N. Khumalo', 'B. Zulu', 'A. Nkosi', 'P. Dlamini', 'T. Nkuna', 'L. van Wyk'];
function poolRm(seed) {
  const s = typeof seed === 'number' ? seed : String(seed).length;
  return RM_POOL[s % RM_POOL.length]
}

// Local override map so the UI reflects assignments made this session.
const rmOverrides = ref({});

function hasRm(c) {
  return (c.rm || rmOverrides.value[c.customer_id]) || null
}

function assignRmToCustomer(c) {
  const rm = poolRm(c.customer_id);
  assignRm(c.customer_id, rm, false);
  rmOverrides.value = { ...rmOverrides.value, [c.customer_id]: rm };
  notify(`RM ${rm} assigned to ${c.name}`, 'success');
}

function contactRmForCustomer(c) {
  const rm = hasRm(c) || poolRm(c.customer_id);
  if (!c.rm && !rmOverrides.value[c.customer_id]) {
    rmOverrides.value = { ...rmOverrides.value, [c.customer_id]: rm };
  }
  assignRm(c.customer_id, rm, true);
  notify(`Contact logged with ${rm} for ${c.name}`, 'success');
}

function enrolCampaignForCustomer(c) {
  enrolCustomer(c.customer_id, 'Value Retention Cohort');
  notify(`${c.name} enrolled in Value Retention Cohort`, 'success');
}

// ─── Run CLV Predictions (explicit) ───────────────────────────────────────────

const runningClv = ref(false);

async function runClvPredictions() {
  if (runningClv.value) return
  runningClv.value = true;
  try {
    const summary = await store.runClvPredictions();
    if (summary?.status === 'CLV_MODEL_NOT_LOADED') {
      notify('CLV model is not loaded — no predictions were produced', 'error', { autoClose: 6000 });
      return
    }
    if (summary?.status === 'NO_DATA') {
      notify(`No feature data for ${snapshotStore.asOfDate}`, 'error', { autoClose: 6000 });
      return
    }
    notify(
      `CLV predicted for ${summary?.customers_scored ?? 0} customers (${summary?.clv_model ?? 'model'}) · `
        + `mean K${(summary?.mean_clv ?? 0).toLocaleString()}`,
      'success',
      { autoClose: 5000 },
    );
    await store.fetchClv();
  } catch (e) {
    notify(e?.message || 'CLV prediction run failed', 'error', { autoClose: 6000 });
  } finally {
    runningClv.value = false;
  }
}

// ─── Export Report ───────────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value;
  const bands = (store.clvData?.bands ?? []).map(b => ({
    ...b,
    avg_clv: b.avg_clv,
    avg_churn_prob: b.avg_churn_prob,
    total_aum: b.total_aum,
  }));
  const top = store.clvData?.top_customers ?? [];
  if (which === 'segments' || which === 'overview') {
    downloadCsv(reportFilename('clv-bands'), bands, ['band', 'threshold', 'count', 'avg_clv', 'avg_churn_prob', 'total_aum']);
  } else {
    const rows = top.map(c => ({
      customer_id: c.customer_id, name: c.name, segment: c.segment, band: c.band,
      clv: c.clv, churn_prob: c.churn_prob, aum: c.aum, rm: hasRm(c) || '', days_since_contact: c.days_since_contact,
      quadrant: getQuadrant(c.clv_percentile, c.churn_prob),
    }));
    downloadCsv(reportFilename('priority-customers'), rows, ['customer_id', 'name', 'segment', 'band', 'clv', 'churn_prob', 'aum', 'rm', 'days_since_contact', 'quadrant']);
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 });
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(async () => {
  // 1. Check model status first so user sees models are loaded
  await modelsStore.fetchModels();

  // 2. Rehydrate RM assignments made in previous sessions so UI stays truthful.
  const overrides = {};
  const st = getActionState();
  Object.keys(st).forEach((id) => { if (st[id].rm) overrides[id] = st[id].rm; });
  // Pull server-side per-customer state too (other pilot viewers / browsers).
  const topIds = (store.clvData?.top_customers ?? []).map((c) => c.customer_id);
  await Promise.allSettled(topIds.map((id) => hydrateStateFromServer(id)));
  const st2 = getActionState();
  Object.keys(st2).forEach((id) => { if (st2[id].rm) overrides[id] = st2[id].rm; });
  if (Object.keys(overrides).length) rmOverrides.value = overrides;

  // 3. Retrieve CLV customer data from DB
  await store.fetchClv();
  loading.value = false;
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", null, [
        _cache[9] || (_cache[9] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Home"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Intelligence"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Customer Value")
        ], -1)),
        _cache[10] || (_cache[10] = createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Customer Value Intelligence", -1)),
        _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-body-md text-gray-500 mt-1" }, "CLV scoring, value segmentation, and churn-adjusted priority analysis", -1)),
        createBaseVNode("div", _hoisted_3, [
          (isClvModelLoaded.value)
            ? (openBlock(), createElementBlock("div", _hoisted_4, [
                _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }, null, -1)),
                createBaseVNode("span", null, "CLV Model: Loaded & Active (" + toDisplayString(clvModel.value?.version ? `v${clvModel.value.version}` : 'LightGBM') + ")", 1)
              ]))
            : (unref(modelsStore).loading)
              ? (openBlock(), createElementBlock("div", _hoisted_5, [...(_cache[7] || (_cache[7] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[12px] animate-spin" }, "refresh", -1),
                  createBaseVNode("span", null, "Checking model readiness…", -1)
                ]))]))
              : (openBlock(), createElementBlock("div", _hoisted_6, [...(_cache[8] || (_cache[8] = [
                  createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-amber-500" }, null, -1),
                  createBaseVNode("span", null, "CLV Model: Offline / Not Registered", -1)
                ]))]))
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("button", {
          onClick: runClvPredictions,
          disabled: runningClv.value,
          class: "px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none disabled:opacity-50"
        }, [
          createBaseVNode("span", _hoisted_9, toDisplayString(runningClv.value ? 'hourglass_top' : 'model_training'), 1),
          createTextVNode(" " + toDisplayString(runningClv.value ? 'Running…' : 'Run CLV Predictions'), 1)
        ], 8, _hoisted_8),
        createBaseVNode("button", {
          onClick: exportReport,
          class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[12] || (_cache[12] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download", -1),
          createTextVNode(" Export Report ", -1)
        ]))]),
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = $event => (activeTab.value = 'matrix')),
          class: "px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[13] || (_cache[13] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "grid_on", -1),
          createTextVNode(" View Priority Matrix ", -1)
        ]))])
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_10, [
          createVNode(_sfc_main$2)
        ]))
      : (!unref(store).clvData || unref(store).clvData.status === 'CLV_MODEL_UNAVAILABLE')
        ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              (isClvModelLoaded.value)
                ? (openBlock(), createElementBlock("div", _hoisted_13, [
                    _cache[17] || (_cache[17] = createBaseVNode("div", { class: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mb-2" }, [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[26px]" }, "verified")
                    ], -1)),
                    _cache[18] || (_cache[18] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "CLV LightGBM Model is Loaded & Active", -1)),
                    createBaseVNode("p", _hoisted_14, " Status: Ready for Inference · Artifact: " + toDisplayString(clvModel.value?.version ? `v${clvModel.value.version}` : '1.0.0') + " · Prediction Service (:8004) ", 1),
                    createBaseVNode("div", _hoisted_15, [
                      createBaseVNode("div", _hoisted_16, [
                        _cache[16] || (_cache[16] = createBaseVNode("span", { class: "material-symbols-outlined text-[20px] text-amber-600 mt-0.5" }, "database", -1)),
                        createBaseVNode("div", null, [
                          createBaseVNode("p", _hoisted_17, "No Customer Feature Data for " + toDisplayString(unref(snapshotStore).asOfDate), 1),
                          _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-xs text-amber-800 mt-1" }, [
                            createTextVNode(" The machine learning model is loaded in memory, but no customer feature records exist in PostgreSQL ("),
                            createBaseVNode("code", { class: "font-mono bg-amber-100 px-1 py-0.5 rounded" }, "customer_features"),
                            createTextVNode(") for this snapshot date. ")
                          ], -1)),
                          _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[11px] text-amber-700 mt-2" }, [
                            createTextVNode(" Once customer features are populated in the database, click "),
                            createBaseVNode("strong", null, "\"Run CLV Predictions\""),
                            createTextVNode(" above to score the portfolio. ")
                          ], -1))
                        ])
                      ])
                    ])
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_18, [...(_cache[19] || (_cache[19] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[36px] text-gray-300" }, "cloud_off", -1),
                    createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mt-3" }, "CLV Model Offline or Unregistered", -1),
                    createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Prediction Service (:8004) or Model Registry could not be reached. Ensure backend services are running. ", -1)
                  ]))]))
            ])
          ]))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_19, [
              (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                return createBaseVNode("button", {
                  key: tab.id,
                  onClick: $event => (activeTab.value = tab.id),
                  class: normalizeClass(['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
                }, [
                  createBaseVNode("span", _hoisted_21, toDisplayString(tab.icon), 1),
                  createTextVNode(" " + toDisplayString(tab.label), 1)
                ], 10, _hoisted_20)
              }), 64))
            ]),
            (activeTab.value === 'overview')
              ? (openBlock(), createElementBlock("div", _hoisted_22, [
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, [
                      _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Total Portfolio CLV", -1)),
                      createBaseVNode("p", _hoisted_25, toDisplayString(formatCurrency(unref(store).clvData?.summary?.total_clv)), 1),
                      _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Churn-adjusted", -1))
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Customer CLV", -1)),
                      createBaseVNode("p", _hoisted_27, toDisplayString(formatCurrency(unref(store).clvData?.summary?.avg_clv)), 1),
                      _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Per customer", -1))
                    ]),
                    createBaseVNode("div", _hoisted_28, [
                      _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Platinum + Gold Count", -1)),
                      createBaseVNode("p", _hoisted_29, toDisplayString(platinumGoldCount.value.toLocaleString()), 1),
                      _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "High-value customers", -1))
                    ]),
                    createBaseVNode("div", _hoisted_30, [
                      _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "CLV at Risk", -1)),
                      createBaseVNode("p", _hoisted_31, toDisplayString(formatCurrency(unref(store).clvData?.summary?.clv_at_risk)), 1),
                      _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "High-value + high-churn", -1))
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      _cache[28] || (_cache[28] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Value Protected MTD", -1)),
                      createBaseVNode("p", _hoisted_33, toDisplayString(formatCurrency(unref(store).clvData?.summary?.value_protected_mtd)), 1),
                      _cache[29] || (_cache[29] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Interventions this month", -1))
                    ]),
                    createBaseVNode("div", _hoisted_34, [
                      _cache[30] || (_cache[30] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Churn-Adj. CLV", -1)),
                      createBaseVNode("p", _hoisted_35, toDisplayString(formatCurrency(unref(store).clvData?.summary?.churn_adjusted_clv)), 1),
                      _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Expected realised value", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_36, [
                    _cache[33] || (_cache[33] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "CLV Distribution by Value Band"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Horizontal distribution of customers across Platinum, Gold, Silver, and Bronze tiers")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_37, [
                      _cache[32] || (_cache[32] = createStaticVNode("<div class=\"flex items-center gap-4 border-b border-gray-100 pb-3 mb-4\"><div class=\"w-36 flex-shrink-0 text-[10px] text-gray-400 font-bold uppercase\">Band</div><div class=\"w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Customers</div><div class=\"flex-1 text-[10px] text-gray-400 font-bold uppercase pl-1\">Distribution</div><div class=\"w-24 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Avg CLV</div><div class=\"w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Avg Churn</div></div>", 1)),
                      createBaseVNode("div", _hoisted_38, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(bandsWithPct.value, (band) => {
                          return (openBlock(), createElementBlock("div", {
                            key: band.band,
                            class: "flex items-center gap-4"
                          }, [
                            createBaseVNode("div", _hoisted_39, [
                              createBaseVNode("span", {
                                class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)])
                              }, toDisplayString(band.band), 3),
                              createBaseVNode("p", _hoisted_40, toDisplayString(band.threshold), 1)
                            ]),
                            createBaseVNode("div", _hoisted_41, [
                              createBaseVNode("span", _hoisted_42, toDisplayString(band.count.toLocaleString()), 1)
                            ]),
                            createBaseVNode("div", _hoisted_43, [
                              createBaseVNode("div", _hoisted_44, [
                                createBaseVNode("div", {
                                  class: "h-full bg-absa-passion rounded-full",
                                  style: normalizeStyle({ width: band.pct + '%' })
                                }, null, 4)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_45, [
                              createBaseVNode("span", _hoisted_46, toDisplayString(formatCurrency(band.avg_clv)), 1)
                            ]),
                            createBaseVNode("div", _hoisted_47, [
                              createBaseVNode("span", {
                                class: normalizeClass(['text-xs font-bold font-mono', churnProbColor(band.avg_churn_prob)])
                              }, toDisplayString((band.avg_churn_prob * 100).toFixed(1)) + "% ", 3)
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (activeTab.value === 'segments')
              ? (openBlock(), createElementBlock("div", _hoisted_48, [
                  createBaseVNode("div", _hoisted_49, [
                    createBaseVNode("div", _hoisted_50, [
                      _cache[36] || (_cache[36] = createBaseVNode("div", null, [
                        createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "Value band configuration"),
                        createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-0.5" }, " Boundaries are 12-month predicted CLV in ZMW. The four ranges must be contiguous and cover every customer. ")
                      ], -1)),
                      createBaseVNode("div", _hoisted_51, [
                        createBaseVNode("label", _hoisted_52, [
                          withDirectives(createBaseVNode("input", {
                            type: "radio",
                            value: "percentile",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(bandMode) ? (bandMode).value = $event : null))
                          }, null, 512), [
                            [vModelRadio, unref(bandMode)]
                          ]),
                          _cache[34] || (_cache[34] = createTextVNode(" Percentile ", -1))
                        ]),
                        createBaseVNode("label", _hoisted_53, [
                          withDirectives(createBaseVNode("input", {
                            type: "radio",
                            value: "custom",
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (isRef(bandMode) ? (bandMode).value = $event : null))
                          }, null, 512), [
                            [vModelRadio, unref(bandMode)]
                          ]),
                          _cache[35] || (_cache[35] = createTextVNode(" Custom ZMW ", -1))
                        ])
                      ])
                    ]),
                    (unref(bandsCustom))
                      ? (openBlock(), createElementBlock("div", _hoisted_54, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(bandRows), (row) => {
                            return (openBlock(), createElementBlock("div", {
                              key: row.band,
                              class: "flex items-center gap-2"
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold w-20', bandBadgeClass(row.band)])
                              }, toDisplayString(row.band), 3),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": $event => ((row.min) = $event),
                                type: "text",
                                inputmode: "numeric",
                                placeholder: "no minimum",
                                class: "w-28 border border-gray-300 rounded-sm px-2 py-1 text-xs font-mono"
                              }, null, 8, _hoisted_55), [
                                [vModelText, row.min]
                              ]),
                              _cache[37] || (_cache[37] = createBaseVNode("span", { class: "text-xs text-gray-400" }, "to", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": $event => ((row.max) = $event),
                                type: "text",
                                inputmode: "numeric",
                                placeholder: "no maximum",
                                class: "w-28 border border-gray-300 rounded-sm px-2 py-1 text-xs font-mono"
                              }, null, 8, _hoisted_56), [
                                [vModelText, row.max]
                              ])
                            ]))
                          }), 128))
                        ]))
                      : createCommentVNode("", true),
                    (unref(bandError))
                      ? (openBlock(), createElementBlock("p", _hoisted_57, toDisplayString(unref(bandError)), 1))
                      : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_58, [
                      createBaseVNode("button", {
                        onClick: applyBands,
                        disabled: unref(store).loading.clv,
                        class: "px-3 py-1 rounded-sm bg-absa-enrich text-white text-xs font-bold disabled:opacity-50"
                      }, " Apply ", 8, _hoisted_59),
                      createBaseVNode("button", {
                        onClick: resetBands,
                        disabled: unref(store).loading.clv,
                        class: "px-3 py-1 rounded-sm border border-gray-300 text-xs font-bold text-gray-600"
                      }, " Reset to percentile ", 8, _hoisted_60),
                      (unref(bandsCustom) && unref(bandPreview))
                        ? (openBlock(), createElementBlock("span", _hoisted_61, toDisplayString(unref(bandPreview)), 1))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_62, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).clvData?.bands, (band) => {
                      return (openBlock(), createElementBlock("div", {
                        key: band.band,
                        class: "bg-white border border-gray-300 rounded-sm p-4"
                      }, [
                        createBaseVNode("div", _hoisted_63, [
                          createBaseVNode("div", null, [
                            createBaseVNode("span", {
                              class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)])
                            }, toDisplayString(band.band), 3),
                            createBaseVNode("p", _hoisted_64, toDisplayString(band.threshold), 1)
                          ]),
                          createBaseVNode("span", _hoisted_65, toDisplayString(band.action_count ?? 0) + " actions pending", 1)
                        ]),
                        createBaseVNode("div", _hoisted_66, [
                          createBaseVNode("div", null, [
                            _cache[38] || (_cache[38] = createBaseVNode("p", { class: "text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5" }, "Customers", -1)),
                            createBaseVNode("p", _hoisted_67, toDisplayString(band.count.toLocaleString()), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[39] || (_cache[39] = createBaseVNode("p", { class: "text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5" }, "Avg CLV", -1)),
                            createBaseVNode("p", _hoisted_68, toDisplayString(formatCurrency(band.avg_clv)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[40] || (_cache[40] = createBaseVNode("p", { class: "text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5" }, "Avg Churn Prob", -1)),
                            createBaseVNode("p", {
                              class: normalizeClass(['text-base font-mono font-bold', churnProbColor(band.avg_churn_prob)])
                            }, toDisplayString((band.avg_churn_prob * 100).toFixed(1)) + "% ", 3)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[41] || (_cache[41] = createBaseVNode("p", { class: "text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5" }, "Total AUM", -1)),
                            createBaseVNode("p", _hoisted_69, toDisplayString(formatCurrency(band.total_aum)), 1)
                          ])
                        ])
                      ]))
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_70, [
                    _cache[43] || (_cache[43] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Value Band Summary"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Aggregated metrics per value tier")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_71, [
                      createBaseVNode("table", _hoisted_72, [
                        _cache[42] || (_cache[42] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50" }, [
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Band"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customers"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "% of Portfolio"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Avg CLV"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Avg Churn Prob"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Total AUM"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "At Risk Count")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_73, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).clvData?.bands, (band) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: band.band,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_74, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)])
                                }, toDisplayString(band.band), 3)
                              ]),
                              createBaseVNode("td", _hoisted_75, toDisplayString(band.count.toLocaleString()), 1),
                              createBaseVNode("td", _hoisted_76, toDisplayString(bandPct(band.count)) + "%", 1),
                              createBaseVNode("td", _hoisted_77, toDisplayString(formatCurrency(band.avg_clv)), 1),
                              createBaseVNode("td", _hoisted_78, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['text-xs font-bold font-mono', churnProbColor(band.avg_churn_prob)])
                                }, toDisplayString((band.avg_churn_prob * 100).toFixed(1)) + "% ", 3)
                              ]),
                              createBaseVNode("td", _hoisted_79, toDisplayString(formatCurrency(band.total_aum)), 1),
                              createBaseVNode("td", _hoisted_80, toDisplayString(band.at_risk_count?.toLocaleString() ?? '—'), 1)
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (activeTab.value === 'matrix')
              ? (openBlock(), createElementBlock("div", _hoisted_81, [
                  createBaseVNode("div", _hoisted_82, [
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = $event => (matrixScopeExpanded.value = !matrixScopeExpanded.value)),
                      class: "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                    }, [
                      _cache[44] || (_cache[44] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-gray-400 flex-shrink-0" }, "info", -1)),
                      _cache[45] || (_cache[45] = createBaseVNode("span", { class: "text-xs font-semibold text-gray-600 flex-1" }, "How to read this matrix", -1)),
                      createBaseVNode("span", {
                        class: normalizeClass(["material-symbols-outlined text-[18px] text-gray-400 transition-transform", matrixScopeExpanded.value ? 'rotate-180' : ''])
                      }, "expand_more", 2)
                    ]),
                    (matrixScopeExpanded.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_83, [...(_cache[46] || (_cache[46] = [
                          createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed" }, [
                            createTextVNode(" The Priority Matrix plots every customer by their "),
                            createBaseVNode("strong", { class: "text-absa-enrich" }, "Customer Lifetime Value (Y-axis)"),
                            createTextVNode(" vs "),
                            createBaseVNode("strong", { class: "text-absa-enrich" }, "Churn Probability (X-axis)"),
                            createTextVNode(". Four quadrants determine the action required. Use this view to prioritise Relationship Manager assignments, campaign enrolments, and BAU monitoring schedules. ")
                          ], -1)
                        ]))]))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_84, [
                    createBaseVNode("div", _hoisted_85, [
                      _cache[50] || (_cache[50] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex items-center gap-3" }, [
                        createBaseVNode("span", { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-100 text-absa-passion" }, [
                          createBaseVNode("span", { class: "w-1 h-1 rounded-full bg-absa-passion" }),
                          createTextVNode("PROTECT ")
                        ]),
                        createBaseVNode("span", { class: "text-[11px] text-gray-500" }, "High Value · High Risk")
                      ], -1)),
                      createBaseVNode("div", _hoisted_86, [
                        _cache[48] || (_cache[48] = createBaseVNode("p", { class: "text-xs text-gray-600 mb-3" }, "Immediate RM assignment or senior intervention required", -1)),
                        createBaseVNode("div", _hoisted_87, [
                          createBaseVNode("p", _hoisted_88, toDisplayString(protectCount.value), 1),
                          _cache[47] || (_cache[47] = createBaseVNode("p", { class: "text-xs text-gray-400 mb-1" }, "customers", -1))
                        ]),
                        _cache[49] || (_cache[49] = createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-1" }, "CLV top 50% & Churn Prob > 50%", -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_89, [
                      _cache[54] || (_cache[54] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex items-center gap-3" }, [
                        createBaseVNode("span", { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion" }, [
                          createBaseVNode("span", { class: "w-1 h-1 rounded-full bg-absa-passion" }),
                          createTextVNode("MAINTAIN ")
                        ]),
                        createBaseVNode("span", { class: "text-[11px] text-gray-500" }, "High Value · Low Risk")
                      ], -1)),
                      createBaseVNode("div", _hoisted_90, [
                        _cache[52] || (_cache[52] = createBaseVNode("p", { class: "text-xs text-gray-600 mb-3" }, "Preserve relationship — proactive check-ins", -1)),
                        createBaseVNode("div", _hoisted_91, [
                          createBaseVNode("p", _hoisted_92, toDisplayString(maintainCount.value), 1),
                          _cache[51] || (_cache[51] = createBaseVNode("p", { class: "text-xs text-gray-400 mb-1" }, "customers", -1))
                        ]),
                        _cache[53] || (_cache[53] = createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-1" }, "CLV top 50% & Churn Prob ≤ 50%", -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_93, [
                      _cache[58] || (_cache[58] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex items-center gap-3" }, [
                        createBaseVNode("span", { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-amber-100 text-amber-700" }, [
                          createBaseVNode("span", { class: "w-1 h-1 rounded-full bg-amber-500" }),
                          createTextVNode("MONITOR ")
                        ]),
                        createBaseVNode("span", { class: "text-[11px] text-gray-500" }, "Low Value · High Risk")
                      ], -1)),
                      createBaseVNode("div", _hoisted_94, [
                        _cache[56] || (_cache[56] = createBaseVNode("p", { class: "text-xs text-gray-600 mb-3" }, "Campaign enrolment — cost-effective intervention", -1)),
                        createBaseVNode("div", _hoisted_95, [
                          createBaseVNode("p", _hoisted_96, toDisplayString(monitorCount.value), 1),
                          _cache[55] || (_cache[55] = createBaseVNode("p", { class: "text-xs text-gray-400 mb-1" }, "customers", -1))
                        ]),
                        _cache[57] || (_cache[57] = createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-1" }, "CLV bottom 50% & Churn Prob > 50%", -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_97, [
                      _cache[62] || (_cache[62] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex items-center gap-3" }, [
                        createBaseVNode("span", { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-200 text-gray-600" }, [
                          createBaseVNode("span", { class: "w-1 h-1 rounded-full bg-gray-500" }),
                          createTextVNode("OBSERVE ")
                        ]),
                        createBaseVNode("span", { class: "text-[11px] text-gray-500" }, "Low Value · Low Risk")
                      ], -1)),
                      createBaseVNode("div", _hoisted_98, [
                        _cache[60] || (_cache[60] = createBaseVNode("p", { class: "text-xs text-gray-600 mb-3" }, "Standard BAU — no intervention needed", -1)),
                        createBaseVNode("div", _hoisted_99, [
                          createBaseVNode("p", _hoisted_100, toDisplayString(observeCount.value), 1),
                          _cache[59] || (_cache[59] = createBaseVNode("p", { class: "text-xs text-gray-400 mb-1" }, "customers", -1))
                        ]),
                        _cache[61] || (_cache[61] = createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-1" }, "CLV bottom 50% & Churn Prob ≤ 50%", -1))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_101, [
                    _cache[64] || (_cache[64] = createStaticVNode("<div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center\"><div><h2 class=\"text-sm font-bold text-absa-enrich\">Priority Matrix — Scatter View</h2><p class=\"text-[11px] text-gray-500 mt-0.5\">CLV vs Churn Probability per customer — top 10 customers shown below</p></div></div><div class=\"p-5 pb-0\"><div class=\"w-full h-12 bg-gray-50 border border-dashed border-gray-300 rounded-sm flex items-center justify-center mb-5\"><p class=\"text-xs text-gray-400 flex items-center gap-2\"><span class=\"material-symbols-outlined text-[16px]\">scatter_plot</span> Interactive scatter plot rendered by chart.js — awaiting canvas implementation </p></div></div>", 2)),
                    createBaseVNode("div", _hoisted_102, [
                      createBaseVNode("table", _hoisted_103, [
                        _cache[63] || (_cache[63] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50" }, [
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customer ID"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Name"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Segment"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "CLV"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Churn Prob"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Quadrant"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Action")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_104, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(top10ByCLV.value, (c) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: c.customer_id,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_105, toDisplayString(c.customer_id), 1),
                              createBaseVNode("td", _hoisted_106, toDisplayString(c.name), 1),
                              createBaseVNode("td", _hoisted_107, toDisplayString(c.segment), 1),
                              createBaseVNode("td", _hoisted_108, toDisplayString(formatCurrency(c.clv)), 1),
                              createBaseVNode("td", _hoisted_109, [
                                createVNode(_sfc_main$1, {
                                  label: c.name,
                                  "display-score": (c.churn_prob * 100).toFixed(1) + '%',
                                  "score-label": "Churn Probability",
                                  "score-class": churnProbColor(c.churn_prob),
                                  confidence: c.churn_confidence ?? '± 0.05',
                                  drivers: c.churn_drivers ?? [],
                                  "score-date": unref(snapshotStore).asOfDate,
                                  "align-right": true
                                }, {
                                  default: withCtx(() => [
                                    createBaseVNode("span", {
                                      class: normalizeClass(['text-xs font-bold font-mono', churnProbColor(c.churn_prob)])
                                    }, toDisplayString((c.churn_prob * 100).toFixed(1)) + "% ", 3)
                                  ]),
                                  _: 2
                                }, 1032, ["label", "display-score", "score-class", "confidence", "drivers", "score-date"])
                              ]),
                              createBaseVNode("td", _hoisted_110, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', quadrantClass(getQuadrant(c.clv_percentile, c.churn_prob))])
                                }, toDisplayString(getQuadrant(c.clv_percentile, c.churn_prob)), 3)
                              ]),
                              createBaseVNode("td", _hoisted_111, [
                                (getQuadrant(c.clv_percentile, c.churn_prob) === 'PROTECT')
                                  ? (openBlock(), createElementBlock("button", {
                                      key: 0,
                                      onClick: $event => (assignRmToCustomer(c)),
                                      class: "px-3 py-1 bg-absa-passion text-absa-serene rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none"
                                    }, "Assign RM", 8, _hoisted_112))
                                  : (getQuadrant(c.clv_percentile, c.churn_prob) === 'MAINTAIN')
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 1,
                                        onClick: $event => (contactRmForCustomer(c)),
                                        class: "px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                                      }, "Contact RM", 8, _hoisted_113))
                                    : (getQuadrant(c.clv_percentile, c.churn_prob) === 'MONITOR')
                                      ? (openBlock(), createElementBlock("button", {
                                          key: 2,
                                          onClick: $event => (enrolCampaignForCustomer(c)),
                                          class: "px-3 py-1 bg-amber-100 text-amber-700 rounded-sm text-[10px] font-bold hover:bg-amber-200 transition-colors shadow-none"
                                        }, "Enrol Campaign", 8, _hoisted_114))
                                      : (openBlock(), createElementBlock("span", _hoisted_115, "—"))
                              ])
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (activeTab.value === 'customers')
              ? (openBlock(), createElementBlock("div", _hoisted_116, [
                  (selectedCustomers.value.size > 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_117, [
                        _cache[67] || (_cache[67] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "check_box", -1)),
                        createBaseVNode("span", _hoisted_118, toDisplayString(selectedCustomers.value.size) + " customer" + toDisplayString(selectedCustomers.value.size > 1 ? 's' : '') + " selected", 1),
                        createBaseVNode("div", _hoisted_119, [
                          createBaseVNode("button", {
                            onClick: _cache[4] || (_cache[4] = $event => (bulkAction('Enrol in Campaign'))),
                            class: "px-3 py-1 bg-amber-400 text-absa-enrich rounded-sm text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none flex items-center gap-1"
                          }, [...(_cache[65] || (_cache[65] = [
                            createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "campaign", -1),
                            createTextVNode(" Enrol in Campaign ", -1)
                          ]))]),
                          createBaseVNode("button", {
                            onClick: _cache[5] || (_cache[5] = $event => (bulkAction('Assign RM'))),
                            class: "px-3 py-1 bg-absa-passion text-white rounded-sm text-[11px] font-bold hover:bg-absa-power transition-colors shadow-none flex items-center gap-1"
                          }, [...(_cache[66] || (_cache[66] = [
                            createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "person_add", -1),
                            createTextVNode(" Assign RM ", -1)
                          ]))]),
                          createBaseVNode("button", {
                            onClick: clearSelection,
                            class: "px-2 py-1 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                          }, "Clear")
                        ])
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_120, [
                    _cache[77] || (_cache[77] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Top Value Customers"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Ranked by CLV — includes churn risk, AUM, RM assignment, and action priority")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_121, [
                      createBaseVNode("table", _hoisted_122, [
                        createBaseVNode("thead", null, [
                          createBaseVNode("tr", _hoisted_123, [
                            createBaseVNode("th", _hoisted_124, [
                              createBaseVNode("input", {
                                type: "checkbox",
                                checked: allSelected.value,
                                onChange: toggleSelectAll,
                                class: "rounded-sm cursor-pointer",
                                title: "Select all"
                              }, null, 40, _hoisted_125)
                            ]),
                            _cache[68] || (_cache[68] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customer", -1)),
                            _cache[69] || (_cache[69] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Segment", -1)),
                            _cache[70] || (_cache[70] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Value Band", -1)),
                            _cache[71] || (_cache[71] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "CLV", -1)),
                            _cache[72] || (_cache[72] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Churn Prob", -1)),
                            _cache[73] || (_cache[73] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "AUM", -1)),
                            _cache[74] || (_cache[74] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Assigned RM", -1)),
                            _cache[75] || (_cache[75] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Days Since Contact", -1)),
                            _cache[76] || (_cache[76] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Action", -1))
                          ])
                        ]),
                        createBaseVNode("tbody", _hoisted_126, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).clvData?.top_customers, (c) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: c.customer_id,
                              class: normalizeClass(['transition-colors', selectedCustomers.value.has(c.customer_id) ? 'bg-red-50' : 'hover:bg-gray-50'])
                            }, [
                              createBaseVNode("td", _hoisted_127, [
                                createBaseVNode("input", {
                                  type: "checkbox",
                                  checked: selectedCustomers.value.has(c.customer_id),
                                  onChange: $event => (toggleCustomer(c.customer_id)),
                                  class: "rounded-sm cursor-pointer"
                                }, null, 40, _hoisted_128)
                              ]),
                              createBaseVNode("td", _hoisted_129, [
                                createBaseVNode("p", _hoisted_130, toDisplayString(c.name), 1),
                                createBaseVNode("p", _hoisted_131, toDisplayString(c.customer_id), 1)
                              ]),
                              createBaseVNode("td", _hoisted_132, toDisplayString(c.segment), 1),
                              createBaseVNode("td", _hoisted_133, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(c.band)])
                                }, toDisplayString(c.band), 3)
                              ]),
                              createBaseVNode("td", _hoisted_134, toDisplayString(formatCurrency(c.clv)), 1),
                              createBaseVNode("td", _hoisted_135, [
                                createVNode(_sfc_main$1, {
                                  label: c.name,
                                  "display-score": (c.churn_prob * 100).toFixed(1) + '%',
                                  "score-label": "Churn Probability",
                                  "score-class": churnProbColor(c.churn_prob),
                                  confidence: c.churn_confidence ?? '± 0.05',
                                  drivers: c.churn_drivers ?? [],
                                  "score-date": unref(snapshotStore).asOfDate,
                                  "align-right": true
                                }, {
                                  default: withCtx(() => [
                                    createBaseVNode("div", _hoisted_136, [
                                      createBaseVNode("span", {
                                        class: normalizeClass(['text-xs font-bold font-mono', churnProbColor(c.churn_prob)])
                                      }, toDisplayString((c.churn_prob * 100).toFixed(1)) + "% ", 3),
                                      createBaseVNode("div", _hoisted_137, [
                                        createBaseVNode("div", {
                                          class: "h-full bg-absa-passion rounded-full",
                                          style: normalizeStyle({ width: (c.churn_prob * 100) + '%' })
                                        }, null, 4)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["label", "display-score", "score-class", "confidence", "drivers", "score-date"])
                              ]),
                              createBaseVNode("td", _hoisted_138, toDisplayString(c.aum), 1),
                              createBaseVNode("td", _hoisted_139, [
                                (hasRm(c))
                                  ? (openBlock(), createElementBlock("span", _hoisted_140, toDisplayString(hasRm(c)), 1))
                                  : (openBlock(), createElementBlock("span", _hoisted_141, "Unassigned"))
                              ]),
                              createBaseVNode("td", _hoisted_142, [
                                (c.days_since_contact > 7)
                                  ? (openBlock(), createElementBlock("span", _hoisted_143, toDisplayString(c.days_since_contact) + "d", 1))
                                  : (c.days_since_contact > 3)
                                    ? (openBlock(), createElementBlock("span", _hoisted_144, toDisplayString(c.days_since_contact) + "d", 1))
                                    : (openBlock(), createElementBlock("span", _hoisted_145, toDisplayString(c.days_since_contact) + "d", 1))
                              ]),
                              createBaseVNode("td", _hoisted_146, [
                                (!hasRm(c))
                                  ? (openBlock(), createElementBlock("button", {
                                      key: 0,
                                      onClick: $event => (assignRmToCustomer(c)),
                                      class: "px-3 py-1 bg-absa-passion text-absa-serene rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none"
                                    }, "Assign RM", 8, _hoisted_147))
                                  : (openBlock(), createElementBlock("button", {
                                      key: 1,
                                      onClick: $event => (contactRmForCustomer(c)),
                                      class: "px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                                    }, "Contact RM", 8, _hoisted_148))
                              ])
                            ], 2))
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ], 64))
  ]))
}
}

};

export { _sfc_main as default };
