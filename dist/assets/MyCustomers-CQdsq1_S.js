import { r as ref, D as computed, M as watch, o as openBlock, c as createElementBlock, b as createBaseVNode, m as createTextVNode, t as toDisplayString, l as createCommentVNode, j as normalizeClass, F as Fragment, e as renderList, s as withModifiers, v as withDirectives, K as vModelSelect, x as vModelText, N as vModelCheckbox, O as vShow, P as vModelDynamic, y as unref, h as onMounted, q as createVNode, w as withCtx, a as createStaticVNode, J as useRoute, A as resolveComponent, u as useRouter, H as decodeJWT, n as normalizeStyle, I as withKeys } from './index-BDk32LgJ.js';
import { u as useCustomerStore, M as MARKET_SEGMENT_OPTIONS } from './customerStore-BRoLvcJZ.js';
import { u as usePredictionStore } from './predictionStore-DE3XL_zG.js';
import { useSnapshotStore } from './snapshotStore-CBvUDR3G.js';
import { f as fetchIngestSchema, r as remapCsv, l as loadCsv, a as runCoreBanking, p as previewCsv, b as addCustomer, c as computeCustomerStates } from './ingestApi-CcuRyNsa.js';
import { n as notify, d as downloadCsv, r as reportFilename } from './absaExport-DS4NsexK.js';
import { _ as _sfc_main$4, t as tierColor, s as stateTier, h as healthTier } from './CustomerStatePill-I0KLJfXr.js';
import { M as MAX_BULK_DELETE, _ as _sfc_main$3, f as fetchDeletedCount, a as fetchDeletedCustomers, r as restoreCustomers, d as deleteCustomer, b as bulkDeleteCustomers } from './customerAdminApi-Cge2nYL7.js';

const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
};
const _hoisted_2$2 = { class: "relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl my-6" };
const _hoisted_3$2 = { class: "px-6 py-4 border-b border-gray-200 flex items-start justify-between" };
const _hoisted_4$2 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_5$2 = { class: "font-mono text-absa-enrich" };
const _hoisted_6$2 = { key: 0 };
const _hoisted_7$2 = { class: "px-6 pt-3 flex items-center gap-2 border-b border-gray-200" };
const _hoisted_8$2 = { class: "p-6" };
const _hoisted_9$2 = {
  key: 0,
  class: "mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700"
};
const _hoisted_10$2 = { class: "mb-4" };
const _hoisted_11$2 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" };
const _hoisted_12$2 = ["disabled", "onClick"];
const _hoisted_13$2 = { class: "flex items-center justify-between gap-2" };
const _hoisted_14$2 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_15$2 = {
  key: 0,
  class: "text-[10px] font-bold uppercase tracking-wide text-absa-passion"
};
const _hoisted_16$2 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_17$2 = { class: "text-[10px] font-mono text-gray-400 mt-1" };
const _hoisted_18$2 = {
  key: 0,
  class: "text-[11px] text-gray-500 mt-2"
};
const _hoisted_19$2 = {
  key: 1,
  class: "text-[11px] text-amber-800 mt-2"
};
const _hoisted_20$2 = { key: 0 };
const _hoisted_21$2 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_22$2 = { class: "font-bold" };
const _hoisted_23$2 = {
  key: 0,
  class: "text-xs text-gray-500 mt-3"
};
const _hoisted_24$2 = { class: "flex flex-wrap items-center justify-between gap-3 mb-3" };
const _hoisted_25$2 = { class: "text-xs text-gray-600" };
const _hoisted_26$2 = { class: "font-bold text-absa-enrich" };
const _hoisted_27$2 = { key: 0 };
const _hoisted_28$2 = { class: "flex items-center gap-2" };
const _hoisted_29$2 = { class: "text-[11px] text-gray-500" };
const _hoisted_30$2 = { class: "font-mono text-absa-enrich" };
const _hoisted_31$2 = { class: "border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_32$2 = { class: "overflow-x-auto max-h-[45vh]" };
const _hoisted_33$2 = { class: "min-w-full divide-y divide-gray-200" };
const _hoisted_34$2 = { class: "divide-y divide-gray-100 bg-white" };
const _hoisted_35$2 = { class: "px-3 py-2 align-top" };
const _hoisted_36$2 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_37$2 = {
  key: 0,
  class: "text-[10px] text-red-600 mt-0.5"
};
const _hoisted_38$2 = { class: "px-3 py-2 align-top" };
const _hoisted_39$2 = { class: "text-[11px] font-mono text-gray-500" };
const _hoisted_40$2 = { class: "px-3 py-2 align-top" };
const _hoisted_41$2 = ["onUpdate:modelValue"];
const _hoisted_42$2 = ["value"];
const _hoisted_43$2 = { class: "px-3 py-2 align-top" };
const _hoisted_44$2 = {
  key: 0,
  class: "text-[11px] text-gray-600"
};
const _hoisted_45$2 = {
  key: 1,
  class: "text-[11px] text-gray-400"
};
const _hoisted_46$2 = {
  key: 0,
  class: "mt-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-sm text-[11px] text-amber-800"
};
const _hoisted_47$2 = {
  key: 1,
  class: "mt-4 border border-gray-300 rounded-sm"
};
const _hoisted_48$2 = { class: "px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between" };
const _hoisted_49$2 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_50$2 = { class: "text-[11px] font-mono text-gray-500" };
const _hoisted_51$2 = { class: "grid grid-cols-2 sm:grid-cols-5 divide-x divide-gray-200" };
const _hoisted_52$2 = { class: "px-4 py-3" };
const _hoisted_53$2 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_54$2 = { class: "px-4 py-3" };
const _hoisted_55$2 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_56$2 = { class: "px-4 py-3" };
const _hoisted_57$2 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_58$1 = { class: "px-4 py-3" };
const _hoisted_59$1 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_60$1 = { class: "px-4 py-3" };
const _hoisted_61$1 = { class: "px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600" };
const _hoisted_62$1 = { class: "font-mono text-absa-enrich" };
const _hoisted_63$1 = { class: "font-mono" };
const _hoisted_64$1 = { class: "font-bold text-absa-enrich" };
const _hoisted_65$1 = { key: 0 };
const _hoisted_66$1 = {
  key: 0,
  class: "border-t border-gray-200 max-h-40 overflow-y-auto"
};
const _hoisted_67$1 = { class: "min-w-full text-[11px]" };
const _hoisted_68$1 = { class: "divide-y divide-gray-100" };
const _hoisted_69$1 = { class: "px-4 py-1.5 font-mono text-gray-500 w-16" };
const _hoisted_70$1 = { class: "px-4 py-1.5 text-red-700" };
const _hoisted_71$1 = { class: "mt-4 flex items-center justify-between gap-2" };
const _hoisted_72 = { class: "text-[11px] text-gray-500 max-w-2xl" };
const _hoisted_73 = { key: 0 };
const _hoisted_74 = { class: "font-mono font-bold" };
const _hoisted_75 = { class: "flex items-center gap-2" };
const _hoisted_76 = ["disabled"];
const _hoisted_77 = ["disabled"];
const _hoisted_78 = {
  key: 2,
  class: "mt-3 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700"
};
const _hoisted_79 = { class: "text-xs text-gray-600 mb-4 max-w-3xl" };
const _hoisted_80 = { class: "font-mono text-absa-enrich" };
const _hoisted_81 = { class: "grid grid-cols-1 lg:grid-cols-3 gap-4" };
const _hoisted_82 = { class: "lg:col-span-2" };
const _hoisted_83 = ["value"];
const _hoisted_84 = {
  key: 0,
  class: "text-[11px] text-gray-500 mt-2"
};
const _hoisted_85 = {
  key: 1,
  class: "text-[11px] text-amber-800 mt-1"
};
const _hoisted_86 = {
  key: 2,
  class: "mt-3 border border-gray-300 rounded-sm"
};
const _hoisted_87 = { class: "grid grid-cols-2 gap-x-4 gap-y-1 px-3 py-2 text-[11px]" };
const _hoisted_88 = { class: "font-mono text-gray-600" };
const _hoisted_89 = { class: "font-semibold text-absa-enrich" };
const _hoisted_90 = { class: "space-y-4" };
const _hoisted_91 = { class: "flex items-center gap-2 text-xs text-gray-700" };
const _hoisted_92 = ["disabled"];
const _hoisted_93 = {
  key: 0,
  class: "mt-3 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700"
};
const _hoisted_94 = {
  key: 1,
  class: "mt-4 border border-gray-300 rounded-sm"
};
const _hoisted_95 = { class: "px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between" };
const _hoisted_96 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_97 = { class: "text-[11px] font-mono text-gray-500" };
const _hoisted_98 = { class: "grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200" };
const _hoisted_99 = { class: "px-4 py-3" };
const _hoisted_100 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_101 = { class: "px-4 py-3" };
const _hoisted_102 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_103 = { class: "px-4 py-3" };
const _hoisted_104 = { class: "px-4 py-3" };
const _hoisted_105 = { class: "text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_106 = { class: "px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600" };
const _hoisted_107 = { class: "font-mono text-absa-enrich" };
const _hoisted_108 = { class: "font-semibold text-absa-enrich" };
const _hoisted_109 = { key: 0 };
const _hoisted_110 = { key: 1 };
const _hoisted_111 = {
  key: 0,
  class: "border-t border-gray-200 max-h-40 overflow-y-auto"
};
const _hoisted_112 = { class: "min-w-full text-[11px]" };
const _hoisted_113 = { class: "divide-y divide-gray-100" };
const _hoisted_114 = { class: "px-4 py-1.5 font-mono text-gray-500 w-16" };
const _hoisted_115 = { class: "px-4 py-1.5 text-red-700" };


const _sfc_main$2 = {
  __name: 'LoadCustomerDataModal',
  props: {
  open: { type: Boolean, default: false },
},
  emits: ['close', 'loaded'],
  setup(__props, { emit: __emit }) {

/**
 * Load customer data into Postgres — two paths, one contract.
 *
 *  • CSV upload   — pick the target dataset, drop a file, review the
 *                   auto-detected column → field mapping (with the expected
 *                   format of every target field), then validate or load.
 *  • Core banking — pull customer data straight from the core Absa system via
 *                   the ETL Engine.
 *
 * A file can land in either loadable dataset:
 *   Customer Master   → public.customers_clean   (one row per customer)
 *   Customer Features → public.customer_features (one row per customer per
 *                                                 as_of_date snapshot)
 *
 * The dataset list, field catalogue and format rules all come from the backend
 * (`GET /api/v1/ingest/schema`), so the UI can never drift from what the loader
 * actually enforces. Switching dataset re-maps the already-staged file, so a
 * file can be tried against both targets without a second upload.
 */
const props = __props;
const emit = __emit;

const tab = ref('csv');

// ── Schema (the format contract) ────────────────────────────────
const schema = ref(null);
const schemaError = ref('');
const schemaLoading = ref(false);

const datasets = computed(() => schema.value?.datasets || []);
const datasetKey = ref('');

const activeDataset = computed(
  () => datasets.value.find((d) => d.key === datasetKey.value) || datasets.value[0] || null
);
const fields = computed(() => activeDataset.value?.fields || schema.value?.fields || []);
const fieldByName = computed(() =>
  Object.fromEntries(fields.value.map((f) => [f.name, f]))
);
const coreDatasets = computed(() => schema.value?.core_datasets || []);
const targetTable = computed(
  () => activeDataset.value?.table || schema.value?.target_table || 'public.customers_clean'
);
const targetRowCount = computed(() => {
  const counts = schema.value?.target_row_counts;
  if (counts && datasetKey.value in counts) return counts[datasetKey.value]
  return schema.value?.target_row_count
});
const keyColumns = computed(() => activeDataset.value?.key_columns || ['customer_id']);
const keyColumnText = computed(() => keyColumns.value.join(' + '));
const requiredFields = computed(() => fields.value.filter((f) => f.required));

async function ensureSchema() {
  if (schema.value || schemaLoading.value) return
  schemaLoading.value = true;
  schemaError.value = '';
  try {
    schema.value = await fetchIngestSchema();
  } catch (e) {
    schemaError.value = e.message || 'Could not load the ingest schema';
  } finally {
    schemaLoading.value = false;
  }
}

// ── CSV flow ────────────────────────────────────────────────────
const step = ref(1);
const file = ref(null);
const preview = ref(null);
const mapping = ref({});
const csvBusy = ref(false);
const csvError = ref('');
const loadResult = ref(null);
const switchBusy = ref(false);

const sampleByColumn = computed(() => {
  const row = preview.value?.sample_rows?.[0] || {};
  return row
});
const checkByColumn = computed(() =>
  Object.fromEntries((preview.value?.column_checks || []).map((c) => [c.source_column, c]))
);

const liveMappingErrors = computed(() => {
  const errors = [];
  const targets = Object.values(mapping.value).filter(Boolean);
  const duplicates = [...new Set(targets.filter((t, i) => targets.indexOf(t) !== i))];
  if (duplicates.length) {
    errors.push(`More than one column maps to: ${duplicates.join(', ')}`);
  }
  for (const f of fields.value) {
    if (f.required && !targets.includes(f.name)) {
      errors.push(`${f.label} (${f.name}) is required but no column is mapped to it`);
    }
  }
  return errors
});

const mappedCount = computed(() => Object.values(mapping.value).filter(Boolean).length);
const unmappedColumns = computed(() =>
  Object.entries(mapping.value).filter(([, t]) => !t).map(([c]) => c)
);

function resetCsv() {
  step.value = 1;
  file.value = null;
  preview.value = null;
  mapping.value = {};
  csvError.value = '';
  loadResult.value = null;
}

async function onFilePicked(event) {
  const picked = event.target.files?.[0];
  if (picked) await stageFile(picked);
  event.target.value = '';
}

async function onDrop(event) {
  const picked = event.dataTransfer?.files?.[0];
  if (picked) await stageFile(picked);
}

async function stageFile(picked) {
  file.value = picked;
  csvBusy.value = true;
  csvError.value = '';
  loadResult.value = null;
  try {
    const data = await previewCsv(picked, datasetKey.value);
    if (!datasetKey.value) datasetKey.value = data.dataset || '';
    preview.value = data;
    mapping.value = { ...data.mapping };
    step.value = 2;
  } catch (e) {
    csvError.value = e.message || 'Could not read that file';
    preview.value = null;
  } finally {
    csvBusy.value = false;
  }
}

/**
 * Switching the target dataset re-runs the whole mapping for the same staged
 * file: a feature-store export and a customer master may share nothing but a
 * customer_id column, so the previous mapping is meaningless on the other
 * target and must not be carried over.
 */
async function changeDataset(next) {
  datasetKey.value = next;
  if (!preview.value) return

  switchBusy.value = true;
  csvError.value = '';
  loadResult.value = null;
  try {
    preview.value = await remapCsv(preview.value.upload_id, next);
    mapping.value = { ...preview.value.mapping };
  } catch (e) {
    csvError.value = e.message || 'Could not re-map that file for the selected target';
  } finally {
    switchBusy.value = false;
  }
}

async function runLoad(dryRun) {
  if (!preview.value) return
  csvBusy.value = true;
  csvError.value = '';
  try {
    loadResult.value = await loadCsv({
      upload_id: preview.value.upload_id,
      mapping: mapping.value,
      dataset: preview.value.dataset || datasetKey.value,
      filename: preview.value.filename,
      dry_run: dryRun,
    });
    if (dryRun) {
      notify(`Validated ${loadResult.value.rows_valid} of ${loadResult.value.rows_received} rows`, 'info', { autoClose: 3000 });
    } else {
      const r = loadResult.value;
      notify(`Loaded ${r.rows_loaded} rows into ${r.target_table} (${r.rows_inserted} new, ${r.rows_updated} updated)`, 'success', { autoClose: 4000 });
      emit('loaded');
    }
  } catch (e) {
    csvError.value = e.message || 'Load failed';
  } finally {
    csvBusy.value = false;
  }
}

// ── Core banking flow ───────────────────────────────────────────
const coreDataset = ref('');
const coreLimit = ref(null);
const coreDryRun = ref(false);
const coreBusy = ref(false);
const coreError = ref('');
const coreResult = ref(null);

const selectedCoreDataset = computed(() =>
  coreDatasets.value.find((d) => d.key === coreDataset.value) || null
);

async function runCore() {
  coreBusy.value = true;
  coreError.value = '';
  coreResult.value = null;
  try {
    coreResult.value = await runCoreBanking({
      dataset: coreDataset.value || undefined,
      limit: coreLimit.value ? Number(coreLimit.value) : null,
      dry_run: coreDryRun.value,
    });
    const r = coreResult.value;
    if (coreDryRun.value) {
      notify(`Read ${r.rows_extracted} rows from ${r.source_table} — ${r.rows_valid} valid`, 'info', { autoClose: 3500 });
    } else {
      notify(`Core sync loaded ${r.rows_loaded} customer rows`, 'success', { autoClose: 4000 });
      emit('loaded');
    }
  } catch (e) {
    coreError.value = e.message || 'Core banking pull failed';
  } finally {
    coreBusy.value = false;
  }
}

// ── Lifecycle ───────────────────────────────────────────────────
watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    ensureSchema();
    if (!coreDataset.value && coreDatasets.value.length) {
      coreDataset.value = coreDatasets.value[0].key;
    }
  }
);
watch(
  coreDatasets,
  (list) => {
    if (!coreDataset.value && list.length) coreDataset.value = list[0].key;
  },
  { immediate: true }
);

// Default the CSV target to whatever the backend declares as the default.
watch(
  [datasets, () => props.open],
  () => {
    if (datasetKey.value || !datasets.value.length) return
    datasetKey.value = schema.value?.default_dataset || datasets.value[0].key;
  },
  { immediate: true }
);
function close() {
  emit('close');
}

return (_ctx, _cache) => {
  return (__props.open)
    ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: "absolute inset-0 bg-black/40",
          onClick: close
        }),
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", null, [
              _cache[9] || (_cache[9] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Load Customer Data", -1)),
              createBaseVNode("p", _hoisted_4$2, [
                _cache[8] || (_cache[8] = createTextVNode(" Target table ", -1)),
                createBaseVNode("span", _hoisted_5$2, toDisplayString(targetTable.value), 1),
                (targetRowCount.value != null)
                  ? (openBlock(), createElementBlock("span", _hoisted_6$2, " · " + toDisplayString(targetRowCount.value.toLocaleString()) + " rows currently loaded", 1))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("button", {
              class: "text-gray-400 hover:text-gray-600",
              onClick: close
            }, [...(_cache[10] || (_cache[10] = [
              createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_7$2, [
            createBaseVNode("button", {
              class: normalizeClass(["px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors", tab.value === 'csv' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich']),
              onClick: _cache[0] || (_cache[0] = $event => (tab.value = 'csv'))
            }, "Upload CSV", 2),
            createBaseVNode("button", {
              class: normalizeClass(["px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors", tab.value === 'core' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich']),
              onClick: _cache[1] || (_cache[1] = $event => (tab.value = 'core'))
            }, "Core Banking Sync", 2)
          ]),
          createBaseVNode("div", _hoisted_8$2, [
            (schemaError.value)
              ? (openBlock(), createElementBlock("div", _hoisted_9$2, toDisplayString(schemaError.value), 1))
              : createCommentVNode("", true),
            (tab.value === 'csv')
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_10$2, [
                    _cache[11] || (_cache[11] = createBaseVNode("label", { class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5" }, " Load into ", -1)),
                    createBaseVNode("div", _hoisted_11$2, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(datasets.value, (d) => {
                        return (openBlock(), createElementBlock("button", {
                          key: d.key,
                          type: "button",
                          disabled: switchBusy.value || csvBusy.value,
                          class: normalizeClass(["text-left px-3 py-2.5 border rounded-sm transition-colors disabled:opacity-60", (preview.value?.dataset || datasetKey.value) === d.key
                  ? 'border-absa-passion bg-absa-passion/5'
                  : 'border-gray-300 hover:border-absa-enrich bg-white']),
                          onClick: $event => (changeDataset(d.key))
                        }, [
                          createBaseVNode("div", _hoisted_13$2, [
                            createBaseVNode("span", _hoisted_14$2, toDisplayString(d.label), 1),
                            ((preview.value?.dataset || datasetKey.value) === d.key)
                              ? (openBlock(), createElementBlock("span", _hoisted_15$2, "Selected"))
                              : createCommentVNode("", true)
                          ]),
                          createBaseVNode("p", _hoisted_16$2, toDisplayString(d.description), 1),
                          createBaseVNode("p", _hoisted_17$2, toDisplayString(d.table) + " · " + toDisplayString(d.field_count) + " fields · key " + toDisplayString((d.key_columns || []).join(' + ')), 1)
                        ], 10, _hoisted_12$2))
                      }), 128))
                    ]),
                    (switchBusy.value)
                      ? (openBlock(), createElementBlock("p", _hoisted_18$2, " Re-mapping " + toDisplayString(preview.value?.filename) + " against " + toDisplayString(activeDataset.value?.label) + "… ", 1))
                      : (preview.value && preview.value.dataset !== datasetKey.value)
                        ? (openBlock(), createElementBlock("p", _hoisted_19$2, " The mapping below is still for " + toDisplayString(preview.value.dataset) + " — pick a target above to re-map. ", 1))
                        : createCommentVNode("", true)
                  ]),
                  (step.value === 1)
                    ? (openBlock(), createElementBlock("div", _hoisted_20$2, [
                        createBaseVNode("label", {
                          class: "block border-2 border-dashed border-gray-300 rounded-sm p-10 text-center cursor-pointer hover:border-absa-passion transition-colors",
                          onDragover: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
                          onDrop: withModifiers(onDrop, ["prevent"])
                        }, [
                          _cache[14] || (_cache[14] = createBaseVNode("span", { class: "material-symbols-outlined text-[32px] text-gray-400" }, "upload_file", -1)),
                          _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-sm font-bold text-absa-enrich mt-2" }, "Choose a CSV file or drop it here", -1)),
                          createBaseVNode("p", _hoisted_21$2, [
                            _cache[12] || (_cache[12] = createTextVNode(" The first row must be a header. Columns are matched to ", -1)),
                            createBaseVNode("span", _hoisted_22$2, toDisplayString(activeDataset.value?.label || 'the target'), 1),
                            _cache[13] || (_cache[13] = createTextVNode(" fields, and every column is mapped before anything is written. ", -1))
                          ]),
                          createBaseVNode("input", {
                            type: "file",
                            accept: ".csv,text/csv",
                            class: "hidden",
                            onChange: onFilePicked
                          }, null, 32)
                        ], 32),
                        (csvBusy.value)
                          ? (openBlock(), createElementBlock("p", _hoisted_23$2, "Reading file…"))
                          : createCommentVNode("", true)
                      ]))
                    : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createBaseVNode("div", _hoisted_24$2, [
                          createBaseVNode("div", _hoisted_25$2, [
                            createBaseVNode("span", _hoisted_26$2, toDisplayString(preview.value.filename), 1),
                            createTextVNode(" · " + toDisplayString(preview.value.row_count.toLocaleString()) + " rows · " + toDisplayString(preview.value.columns.length) + " columns · " + toDisplayString(mappedCount.value) + " mapped ", 1),
                            (unmappedColumns.value.length)
                              ? (openBlock(), createElementBlock("span", _hoisted_27$2, " · " + toDisplayString(unmappedColumns.value.length) + " skipped", 1))
                              : createCommentVNode("", true)
                          ]),
                          createBaseVNode("div", _hoisted_28$2, [
                            createBaseVNode("span", _hoisted_29$2, [
                              _cache[16] || (_cache[16] = createTextVNode(" Target ", -1)),
                              createBaseVNode("span", _hoisted_30$2, toDisplayString(preview.value.target_table || targetTable.value), 1)
                            ]),
                            createBaseVNode("button", {
                              class: "text-[11px] font-bold text-absa-passion underline",
                              onClick: resetCsv
                            }, "Choose another file")
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_31$2, [
                          createBaseVNode("div", _hoisted_32$2, [
                            createBaseVNode("table", _hoisted_33$2, [
                              _cache[18] || (_cache[18] = createBaseVNode("thead", { class: "bg-gray-50 sticky top-0" }, [
                                createBaseVNode("tr", null, [
                                  createBaseVNode("th", { class: "px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500" }, "CSV column"),
                                  createBaseVNode("th", { class: "px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500" }, "Sample"),
                                  createBaseVNode("th", { class: "px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500" }, "Maps to field"),
                                  createBaseVNode("th", { class: "px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500" }, "Expected format")
                                ])
                              ], -1)),
                              createBaseVNode("tbody", _hoisted_34$2, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(preview.value.columns, (col) => {
                                  return (openBlock(), createElementBlock("tr", { key: col }, [
                                    createBaseVNode("td", _hoisted_35$2, [
                                      createBaseVNode("div", _hoisted_36$2, toDisplayString(col), 1),
                                      (checkByColumn.value[col]?.issues?.length)
                                        ? (openBlock(), createElementBlock("div", _hoisted_37$2, toDisplayString(checkByColumn.value[col].issues[0]), 1))
                                        : createCommentVNode("", true)
                                    ]),
                                    createBaseVNode("td", _hoisted_38$2, [
                                      createBaseVNode("span", _hoisted_39$2, toDisplayString(sampleByColumn.value[col] === '' || sampleByColumn.value[col] == null ? '—' : sampleByColumn.value[col]), 1)
                                    ]),
                                    createBaseVNode("td", _hoisted_40$2, [
                                      withDirectives(createBaseVNode("select", {
                                        "onUpdate:modelValue": $event => ((mapping.value[col]) = $event),
                                        class: "w-56 border border-gray-300 rounded-sm px-2 py-1 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                                      }, [
                                        _cache[17] || (_cache[17] = createBaseVNode("option", { value: "" }, "— Skip this column —", -1)),
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(fields.value, (f) => {
                                          return (openBlock(), createElementBlock("option", {
                                            key: f.name,
                                            value: f.name
                                          }, toDisplayString(f.label) + " (" + toDisplayString(f.name) + ")" + toDisplayString(f.required ? ' *' : ''), 9, _hoisted_42$2))
                                        }), 128))
                                      ], 8, _hoisted_41$2), [
                                        [vModelSelect, mapping.value[col]]
                                      ])
                                    ]),
                                    createBaseVNode("td", _hoisted_43$2, [
                                      (mapping.value[col])
                                        ? (openBlock(), createElementBlock("span", _hoisted_44$2, toDisplayString(fieldByName.value[mapping.value[col]]?.format || '—'), 1))
                                        : (openBlock(), createElementBlock("span", _hoisted_45$2, "not loaded"))
                                    ])
                                  ]))
                                }), 128))
                              ])
                            ])
                          ])
                        ]),
                        (liveMappingErrors.value.length)
                          ? (openBlock(), createElementBlock("div", _hoisted_46$2, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(liveMappingErrors.value, (e, i) => {
                                return (openBlock(), createElementBlock("p", { key: i }, toDisplayString(e), 1))
                              }), 128))
                            ]))
                          : createCommentVNode("", true),
                        (loadResult.value)
                          ? (openBlock(), createElementBlock("div", _hoisted_47$2, [
                              createBaseVNode("div", _hoisted_48$2, [
                                createBaseVNode("span", _hoisted_49$2, toDisplayString(loadResult.value.dry_run ? 'Validation only — nothing was written' : 'Load complete'), 1),
                                createBaseVNode("span", _hoisted_50$2, "batch " + toDisplayString(loadResult.value.batch_id), 1)
                              ]),
                              createBaseVNode("div", _hoisted_51$2, [
                                createBaseVNode("div", _hoisted_52$2, [
                                  _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Received", -1)),
                                  createBaseVNode("p", _hoisted_53$2, toDisplayString(loadResult.value.rows_received), 1)
                                ]),
                                createBaseVNode("div", _hoisted_54$2, [
                                  _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Valid", -1)),
                                  createBaseVNode("p", _hoisted_55$2, toDisplayString(loadResult.value.rows_valid), 1)
                                ]),
                                createBaseVNode("div", _hoisted_56$2, [
                                  _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Inserted", -1)),
                                  createBaseVNode("p", _hoisted_57$2, toDisplayString(loadResult.value.rows_inserted), 1)
                                ]),
                                createBaseVNode("div", _hoisted_58$1, [
                                  _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Updated", -1)),
                                  createBaseVNode("p", _hoisted_59$1, toDisplayString(loadResult.value.rows_updated), 1)
                                ]),
                                createBaseVNode("div", _hoisted_60$1, [
                                  _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Rejected", -1)),
                                  createBaseVNode("p", {
                                    class: normalizeClass(["text-sm font-bold font-mono", loadResult.value.rows_rejected ? 'text-red-700' : 'text-absa-enrich'])
                                  }, toDisplayString(loadResult.value.rows_rejected), 3)
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_61$1, [
                                createBaseVNode("span", _hoisted_62$1, toDisplayString(loadResult.value.target_table || targetTable.value), 1),
                                _cache[24] || (_cache[24] = createTextVNode(" · key ", -1)),
                                createBaseVNode("span", _hoisted_63$1, toDisplayString((loadResult.value.key_columns || keyColumns.value).join(' + ')), 1),
                                _cache[25] || (_cache[25] = createTextVNode(" · data quality ", -1)),
                                createBaseVNode("span", _hoisted_64$1, toDisplayString(loadResult.value.quality_score) + "%", 1),
                                createTextVNode(" · " + toDisplayString(loadResult.value.duration_seconds) + "s ", 1),
                                (loadResult.value.duplicates_detected)
                                  ? (openBlock(), createElementBlock("span", _hoisted_65$1, " · " + toDisplayString(loadResult.value.duplicates_detected) + " duplicate key row(s) collapsed (last row wins)", 1))
                                  : createCommentVNode("", true)
                              ]),
                              (loadResult.value.rejected_samples?.length)
                                ? (openBlock(), createElementBlock("div", _hoisted_66$1, [
                                    createBaseVNode("table", _hoisted_67$1, [
                                      createBaseVNode("tbody", _hoisted_68$1, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(loadResult.value.rejected_samples, (r) => {
                                          return (openBlock(), createElementBlock("tr", {
                                            key: r.row_number
                                          }, [
                                            createBaseVNode("td", _hoisted_69$1, "#" + toDisplayString(r.row_number), 1),
                                            createBaseVNode("td", _hoisted_70$1, toDisplayString(r.errors.join('; ')), 1)
                                          ]))
                                        }), 128))
                                      ])
                                    ])
                                  ]))
                                : createCommentVNode("", true)
                            ]))
                          : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_71$1, [
                          createBaseVNode("p", _hoisted_72, [
                            (requiredFields.value.length)
                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                  _cache[26] || (_cache[26] = createTextVNode(" Required fields: ", -1)),
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(requiredFields.value, (f, i) => {
                                    return (openBlock(), createElementBlock("span", {
                                      key: f.name,
                                      class: "font-bold"
                                    }, [
                                      createTextVNode(toDisplayString(f.name), 1),
                                      (i < requiredFields.value.length - 1)
                                        ? (openBlock(), createElementBlock("span", _hoisted_73, ", "))
                                        : createCommentVNode("", true)
                                    ]))
                                  }), 128)),
                                  _cache[27] || (_cache[27] = createTextVNode(". ", -1))
                                ], 64))
                              : createCommentVNode("", true),
                            _cache[28] || (_cache[28] = createTextVNode(" Rows are matched on ", -1)),
                            createBaseVNode("span", _hoisted_74, toDisplayString(keyColumnText.value), 1),
                            _cache[29] || (_cache[29] = createTextVNode(" — an existing match is updated in place, anything else is inserted. ", -1))
                          ]),
                          createBaseVNode("div", _hoisted_75, [
                            createBaseVNode("button", {
                              disabled: csvBusy.value || switchBusy.value || liveMappingErrors.value.length > 0,
                              class: "px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-40",
                              onClick: _cache[3] || (_cache[3] = $event => (runLoad(true)))
                            }, "Validate only", 8, _hoisted_76),
                            createBaseVNode("button", {
                              disabled: csvBusy.value || switchBusy.value || liveMappingErrors.value.length > 0,
                              class: "px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-40",
                              onClick: _cache[4] || (_cache[4] = $event => (runLoad(false)))
                            }, toDisplayString(csvBusy.value ? 'Working…' : 'Load into Postgres'), 9, _hoisted_77)
                          ])
                        ])
                      ], 64)),
                  (csvError.value)
                    ? (openBlock(), createElementBlock("p", _hoisted_78, toDisplayString(csvError.value), 1))
                    : createCommentVNode("", true)
                ], 64))
              : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createBaseVNode("p", _hoisted_79, [
                    _cache[30] || (_cache[30] = createTextVNode(" The ETL Engine reads the selected core-system extract through the ", -1)),
                    _cache[31] || (_cache[31] = createBaseVNode("span", { class: "font-mono text-absa-enrich" }, "CoreBankingConnector", -1)),
                    _cache[32] || (_cache[32] = createTextVNode(", normalises every value against the ingest contract, then loads it into ", -1)),
                    createBaseVNode("span", _hoisted_80, toDisplayString(targetTable.value), 1),
                    _cache[33] || (_cache[33] = createTextVNode(". ", -1))
                  ]),
                  createBaseVNode("div", _hoisted_81, [
                    createBaseVNode("div", _hoisted_82, [
                      _cache[36] || (_cache[36] = createBaseVNode("label", { class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5" }, "Core system extract", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((coreDataset).value = $event)),
                        class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(coreDatasets.value, (d) => {
                          return (openBlock(), createElementBlock("option", {
                            key: d.key,
                            value: d.key
                          }, toDisplayString(d.label), 9, _hoisted_83))
                        }), 128))
                      ], 512), [
                        [vModelSelect, coreDataset.value]
                      ]),
                      (selectedCoreDataset.value)
                        ? (openBlock(), createElementBlock("p", _hoisted_84, toDisplayString(selectedCoreDataset.value.description), 1))
                        : createCommentVNode("", true),
                      (selectedCoreDataset.value?.notes)
                        ? (openBlock(), createElementBlock("p", _hoisted_85, toDisplayString(selectedCoreDataset.value.notes), 1))
                        : createCommentVNode("", true),
                      (selectedCoreDataset.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_86, [
                            _cache[35] || (_cache[35] = createBaseVNode("div", { class: "px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500" }, " Field mapping ", -1)),
                            createBaseVNode("div", _hoisted_87, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(selectedCoreDataset.value.mapped_fields, (m) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: m.source_column,
                                  class: "flex items-center gap-2"
                                }, [
                                  createBaseVNode("span", _hoisted_88, toDisplayString(m.source_column), 1),
                                  _cache[34] || (_cache[34] = createBaseVNode("span", { class: "text-gray-400" }, "→", -1)),
                                  createBaseVNode("span", _hoisted_89, toDisplayString(m.target_field), 1)
                                ]))
                              }), 128))
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_90, [
                      createBaseVNode("div", null, [
                        _cache[37] || (_cache[37] = createBaseVNode("label", { class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5" }, "Row limit", -1)),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((coreLimit).value = $event)),
                          type: "number",
                          min: "1",
                          placeholder: "All rows",
                          class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-absa-passion outline-none"
                        }, null, 512), [
                          [vModelText, coreLimit.value]
                        ]),
                        _cache[38] || (_cache[38] = createBaseVNode("p", { class: "text-[10px] text-gray-500 mt-1" }, "Leave empty to pull the full extract.", -1))
                      ]),
                      createBaseVNode("label", _hoisted_91, [
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((coreDryRun).value = $event)),
                          type: "checkbox",
                          class: "rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion"
                        }, null, 512), [
                          [vModelCheckbox, coreDryRun.value]
                        ]),
                        _cache[39] || (_cache[39] = createTextVNode(" Validate only (no writes) ", -1))
                      ]),
                      createBaseVNode("button", {
                        disabled: coreBusy.value || !coreDataset.value,
                        class: "w-full px-4 py-2.5 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-40",
                        onClick: runCore
                      }, toDisplayString(coreBusy.value ? 'Extracting…' : (coreDryRun.value ? 'Test pull' : 'Pull from core system')), 9, _hoisted_92)
                    ])
                  ]),
                  (coreError.value)
                    ? (openBlock(), createElementBlock("p", _hoisted_93, toDisplayString(coreError.value), 1))
                    : createCommentVNode("", true),
                  (coreResult.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_94, [
                        createBaseVNode("div", _hoisted_95, [
                          createBaseVNode("span", _hoisted_96, toDisplayString(coreResult.value.dry_run ? 'Test pull — nothing was written' : 'Core sync complete'), 1),
                          createBaseVNode("span", _hoisted_97, "batch " + toDisplayString(coreResult.value.batch_id), 1)
                        ]),
                        createBaseVNode("div", _hoisted_98, [
                          createBaseVNode("div", _hoisted_99, [
                            _cache[40] || (_cache[40] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Extracted", -1)),
                            createBaseVNode("p", _hoisted_100, toDisplayString(coreResult.value.rows_extracted), 1)
                          ]),
                          createBaseVNode("div", _hoisted_101, [
                            _cache[41] || (_cache[41] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Loaded", -1)),
                            createBaseVNode("p", _hoisted_102, toDisplayString(coreResult.value.rows_loaded), 1)
                          ]),
                          createBaseVNode("div", _hoisted_103, [
                            _cache[42] || (_cache[42] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Rejected", -1)),
                            createBaseVNode("p", {
                              class: normalizeClass(["text-sm font-bold font-mono", coreResult.value.rows_rejected ? 'text-red-700' : 'text-absa-enrich'])
                            }, toDisplayString(coreResult.value.rows_rejected), 3)
                          ]),
                          createBaseVNode("div", _hoisted_104, [
                            _cache[43] || (_cache[43] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase tracking-wide text-gray-400" }, "Quality", -1)),
                            createBaseVNode("p", _hoisted_105, toDisplayString(coreResult.value.quality_score) + "%", 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_106, [
                          _cache[44] || (_cache[44] = createTextVNode(" Source ", -1)),
                          createBaseVNode("span", _hoisted_107, toDisplayString(coreResult.value.source_table), 1),
                          _cache[45] || (_cache[45] = createTextVNode(" · extracted via ", -1)),
                          createBaseVNode("span", _hoisted_108, toDisplayString(coreResult.value.extraction_mode), 1),
                          (coreResult.value.rows_inserted != null)
                            ? (openBlock(), createElementBlock("span", _hoisted_109, " · " + toDisplayString(coreResult.value.rows_inserted) + " new, " + toDisplayString(coreResult.value.rows_updated) + " updated", 1))
                            : createCommentVNode("", true),
                          (coreResult.value.duplicates_detected)
                            ? (openBlock(), createElementBlock("span", _hoisted_110, " · " + toDisplayString(coreResult.value.duplicates_detected) + " duplicate ID(s) collapsed (last row wins)", 1))
                            : createCommentVNode("", true),
                          createTextVNode(" · " + toDisplayString(coreResult.value.duration_seconds) + "s ", 1)
                        ]),
                        (coreResult.value.rejected_samples?.length)
                          ? (openBlock(), createElementBlock("div", _hoisted_111, [
                              createBaseVNode("table", _hoisted_112, [
                                createBaseVNode("tbody", _hoisted_113, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(coreResult.value.rejected_samples, (r) => {
                                    return (openBlock(), createElementBlock("tr", {
                                      key: r.row_number
                                    }, [
                                      createBaseVNode("td", _hoisted_114, "#" + toDisplayString(r.row_number), 1),
                                      createBaseVNode("td", _hoisted_115, toDisplayString(r.errors.join('; ')), 1)
                                    ]))
                                  }), 128))
                                ])
                              ])
                            ]))
                          : createCommentVNode("", true)
                      ]))
                    : createCommentVNode("", true)
                ], 64))
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};

const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
};
const _hoisted_2$1 = { class: "relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl my-6" };
const _hoisted_3$1 = { class: "px-6 py-4 border-b border-gray-200 flex items-start justify-between" };
const _hoisted_4$1 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_5$1 = { class: "font-mono text-absa-enrich" };
const _hoisted_6$1 = { key: 0 };
const _hoisted_7$1 = { class: "font-mono text-absa-enrich" };
const _hoisted_8$1 = { key: 1 };
const _hoisted_9$1 = { class: "px-6 pt-3 flex items-center gap-2 border-b border-gray-200" };
const _hoisted_10$1 = {
  key: 0,
  class: "px-1.5 py-0.5 bg-absa-passion text-white text-[10px] rounded-sm"
};
const _hoisted_11$1 = { class: "p-6" };
const _hoisted_12$1 = {
  key: 0,
  class: "mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700"
};
const _hoisted_13$1 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_14$1 = {
  key: 2,
  class: "mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900"
};
const _hoisted_15$1 = {
  key: 3,
  class: "mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-sm"
};
const _hoisted_16$1 = { class: "text-xs text-red-700 space-y-0.5" };
const _hoisted_17$1 = { class: "space-y-6" };
const _hoisted_18$1 = { class: "flex items-start gap-2 text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm" };
const _hoisted_19$1 = ["disabled"];
const _hoisted_20$1 = { class: "text-[11px] font-bold uppercase tracking-wider text-absa-enrich mb-3" };
const _hoisted_21$1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_22$1 = ["for"];
const _hoisted_23$1 = {
  key: 0,
  class: "text-absa-passion",
  title: "Required"
};
const _hoisted_24$1 = ["id", "onUpdate:modelValue", "onChange"];
const _hoisted_25$1 = ["value"];
const _hoisted_26$1 = ["id", "onUpdate:modelValue", "type", "maxlength", "placeholder", "onBlur"];
const _hoisted_27$1 = {
  key: 2,
  class: "text-[10px] text-red-600 mt-1"
};
const _hoisted_28$1 = {
  key: 3,
  class: "text-[10px] text-gray-400 mt-1"
};
const _hoisted_29$1 = { class: "space-y-4" };
const _hoisted_30$1 = { class: "text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm" };
const _hoisted_31$1 = {
  key: 0,
  class: "block mt-1"
};
const _hoisted_32$1 = { class: "font-mono font-bold text-absa-enrich" };
const _hoisted_33$1 = {
  key: 1,
  class: "block mt-1 text-amber-700"
};
const _hoisted_34$1 = {
  key: 0,
  class: "text-[11px] text-amber-900 border border-amber-200 bg-amber-50 px-3 py-2 rounded-sm"
};
const _hoisted_35$1 = { class: "font-bold" };
const _hoisted_36$1 = { class: "font-bold" };
const _hoisted_37$1 = { class: "flex items-start gap-2 text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm" };
const _hoisted_38$1 = { class: "font-mono font-bold" };
const _hoisted_39$1 = { class: "flex flex-wrap items-center gap-3" };
const _hoisted_40$1 = { class: "relative flex-1 min-w-[220px]" };
const _hoisted_41$1 = { class: "text-[11px] text-gray-500" };
const _hoisted_42$1 = { key: 0 };
const _hoisted_43$1 = ["disabled"];
const _hoisted_44$1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" };
const _hoisted_45$1 = ["for", "title"];
const _hoisted_46$1 = {
  key: 0,
  class: "text-absa-passion",
  title: "Required"
};
const _hoisted_47$1 = ["id", "onUpdate:modelValue", "onChange"];
const _hoisted_48$1 = ["value"];
const _hoisted_49$1 = ["id", "onUpdate:modelValue", "type", "placeholder", "onBlur"];
const _hoisted_50$1 = {
  key: 2,
  class: "text-[10px] text-red-600"
};
const _hoisted_51$1 = {
  key: 0,
  class: "text-xs text-gray-500 py-4"
};
const _hoisted_52$1 = { class: "flex items-center justify-end gap-3" };
const _hoisted_53$1 = {
  key: 0,
  class: "mr-auto text-[11px] text-gray-600"
};
const _hoisted_54$1 = { class: "font-bold" };
const _hoisted_55$1 = ["disabled"];
const _hoisted_56$1 = ["disabled"];
const _hoisted_57$1 = { class: "material-symbols-outlined text-[16px]" };

const MASTER = 'customers';
const SNAPSHOT = 'customer_features';

/**
 * The snapshot date the portfolio views read. Defaulting the form to it here is
 * what makes an added customer actually show up in the portfolio.
 */

/** Presentation-only grouping for the master tab. Unlisted fields still render. */

const _sfc_main$1 = {
  __name: 'AddCustomerModal',
  props: {
  open: { type: Boolean, default: false },
},
  emits: ['close', 'added'],
  setup(__props, { emit: __emit }) {

/**
 * Add Customer — one customer, with either or both of the loadable datasets.
 *
 *   Customer details  → public.customers_clean     (12 identity fields)
 *   Feature snapshot  → public.customer_features   (85 feature columns, keyed
 *                                                    on customer_id + as_of_date)
 *
 * The feature column set is the same one the CSV export carries, and both tabs
 * are rendered from `GET /api/v1/ingest/schema` — labels, required flags,
 * formats, allowed values and examples all come from the loader's own contract,
 * so the form cannot drift from what the backend accepts.
 *
 * The master row is written first (create-only: see the endpoint's
 * `allow_update`), then the snapshot, so adding a customer and their features is
 * one action. Ticking "only add the snapshot" skips the master write for a
 * customer that already exists.
 */
const props = __props;
const emit = __emit;

const snapshotStore = useSnapshotStore();

const MASTER_GROUPS = [
  { title: 'Identity', fields: ['customer_id', 'full_name', 'national_id', 'date_of_birth', 'gender'] },
  { title: 'Account & relationship', fields: ['status', 'account_number', 'branch_code', 'customer_since_date', 'kyc_tier'] },
  { title: 'Segmentation', fields: ['market_segment_code', 'nationality'] },
];

const schema = ref(null);
const schemaLoading = ref(false);
const schemaError = ref('');

const tab = ref(MASTER);
const master = ref({});
const snapshot = ref({});
const snapshotFilter = ref('');
const skipMaster = ref(false);
const computeSnapshot = ref(true);

const touched = ref({});
const attempted = ref(false);
const submitting = ref(false);
const serverErrors = ref([]);
const partialWarning = ref('');

// ── Schema ──────────────────────────────────────────────────────
const byKey = computed(() =>
  Object.fromEntries((schema.value?.datasets || []).map((d) => [d.key, d])),
);
const masterDataset = computed(() => byKey.value[MASTER] || null);
const snapshotDataset = computed(() => byKey.value[SNAPSHOT] || null);
const masterFields = computed(() => masterDataset.value?.fields || []);
const snapshotFields = computed(() => snapshotDataset.value?.fields || []);
/** customer_id is shared between the two tables, so it is entered once. */
const snapshotInputFields = computed(() => snapshotFields.value.filter((f) => f.name !== 'customer_id'));

const rowCountFor = (key) => schema.value?.target_row_counts?.[key];

const masterGroups = computed(() => {
  const byName = Object.fromEntries(masterFields.value.map((f) => [f.name, f]));
  const placed = new Set();
  const groups = MASTER_GROUPS.map((g) => {
    const items = g.fields.map((n) => byName[n]).filter(Boolean);
    items.forEach((f) => placed.add(f.name));
    return { title: g.title, items }
  }).filter((g) => g.items.length);
  const rest = masterFields.value.filter((f) => !placed.has(f.name));
  if (rest.length) groups.push({ title: 'Other details', items: rest });
  return groups
});

const visibleSnapshotFields = computed(() => {
  const q = snapshotFilter.value.trim().toLowerCase();
  if (!q) return snapshotInputFields.value
  return snapshotInputFields.value.filter(
    (f) => f.name.toLowerCase().includes(q) || (f.label || '').toLowerCase().includes(q),
  )
});

async function ensureSchema() {
  if (schema.value || schemaLoading.value) return
  schemaLoading.value = true;
  schemaError.value = '';
  try {
    schema.value = await fetchIngestSchema();
  } catch (e) {
    schemaError.value = e.message || 'Could not load the ingest schema';
  } finally {
    schemaLoading.value = false;
  }
}

// ── Form state ──────────────────────────────────────────────────
function resetForm() {
  master.value = Object.fromEntries(masterFields.value.map((f) => [f.name, '']));
  snapshot.value = Object.fromEntries(snapshotInputFields.value.map((f) => [f.name, '']));
  // Prefill the snapshot date the views actually read, so the customer lands in
  // a snapshot the portfolio can see.
  if ('as_of_date' in snapshot.value) snapshot.value.as_of_date = snapshotStore.asOfDate;
  touched.value = {};
  attempted.value = false;
  serverErrors.value = [];
  partialWarning.value = '';
  snapshotFilter.value = '';
  skipMaster.value = false;
  computeSnapshot.value = true;
  tab.value = MASTER;
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    await ensureSchema();
    resetForm();
  },
  { immediate: true },
);

const customerId = computed(() => String(master.value.customer_id ?? '').trim());
/** The snapshot row is written whenever any of its own columns were filled. */
const filledSnapshotCount = computed(
  () => snapshotInputFields.value.filter((f) => String(snapshot.value[f.name] ?? '').trim()).length,
);
const withSnapshot = computed(() => filledSnapshotCount.value > 0);
const snapshotValues = computed(() => ({ customer_id: customerId.value, ...snapshot.value }));
const snapshotDate = computed(() => String(snapshotValues.value.as_of_date ?? '').trim());
/** True when the snapshot would not be visible to the app's own views. */
const offPilotDate = computed(() => !!snapshotDate.value && snapshotDate.value !== snapshotStore.asOfDate);

// ── Validation (mirrors the rules the loader applies) ───────────
function validateField(field, values) {
  const raw = String(values[field.name] ?? '').trim();
  if (!raw) return field.required ? `${field.label} is required` : ''
  if (field.max_length && raw.length > field.max_length) return `Max ${field.max_length} characters`
  if (field.type === 'enum' && field.allowed_values?.length && !field.allowed_values.includes(raw)) {
    return `Must be one of: ${field.allowed_values.join(', ')}`
  }
  if (field.regex) {
    try {
      if (!new RegExp(field.regex).test(raw)) return field.format || 'Invalid format'
    } catch {
      /* an unparsable rule is the backend's to enforce, not the form's */
    }
  }
  if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return 'Use YYYY-MM-DD'
  return ''
}

const masterErrors = computed(() => {
  if (skipMaster.value) {
    return { customer_id: customerId.value ? '' : 'Customer ID is required' }
  }
  return Object.fromEntries(masterFields.value.map((f) => [f.name, validateField(f, master.value)]))
});
const snapshotErrors = computed(() =>
  Object.fromEntries(snapshotFields.value.map((f) => [f.name, validateField(f, snapshotValues.value)])),
);

const hasErrors = computed(() => {
  const badMaster = Object.values(masterErrors.value).some(Boolean);
  const badSnapshot = withSnapshot.value && Object.values(snapshotErrors.value).some(Boolean);
  return badMaster || badSnapshot
});

const showMasterError = (field) => {
  if (skipMaster.value && field.name === 'customer_id') return attempted.value && masterErrors.value.customer_id
  if (skipMaster.value) return ''
  return (attempted.value || touched.value[field.name]) && masterErrors.value[field.name]
};
const showSnapshotError = (field) =>
  withSnapshot.value && (attempted.value || touched.value[field.name]) && snapshotErrors.value[field.name];

/** Only non-empty values are submitted; blanks stay NULL rather than "". */
function nonEmpty(values, fields) {
  const row = {};
  for (const field of fields) {
    const raw = String(values[field.name] ?? '').trim();
    if (raw) row[field.name] = raw;
  }
  return row
}

async function submit() {
  attempted.value = true;
  if (submitting.value) return
  if (hasErrors.value) {
    notify('Fix the highlighted fields before adding the customer', 'error', { autoClose: 4000 });
    return
  }

  submitting.value = true;
  serverErrors.value = [];
  partialWarning.value = '';
  try {
    let addedMaster = false;
    if (!skipMaster.value) {
      const result = await addCustomer(nonEmpty(master.value, masterFields.value), { dataset: MASTER });
      addedMaster = result.rows_inserted === 1;
    }

    let addedSnapshot = false;
    if (withSnapshot.value) {
      try {
        const result = await addCustomer(nonEmpty(snapshotValues.value, snapshotFields.value), {
          dataset: SNAPSHOT,
        });
        addedSnapshot = result.rows_loaded > 0;
      } catch (e) {
        // The master row is already committed, so say so instead of implying
        // the whole action failed.
        partialWarning.value = addedMaster || skipMaster.value
          ? `Customer saved, but the feature snapshot failed: ${e.message}`
          : '';
        throw e
      }
    }

    // Portfolio lists and counts read customer_states, which is derived from
    // customer_features — so without this the new snapshot is invisible.
    let statesUpserted = null;
    if (addedSnapshot && computeSnapshot.value && snapshotDate.value) {
      try {
        const computed = await computeCustomerStates(snapshotDate.value);
        statesUpserted = computed?.states_upserted ?? 0;
      } catch (e) {
        partialWarning.value =
          `Snapshot saved for ${snapshotDate.value}, but the lifecycle update failed: ${e.message}. ` +
          'The customer will not appear in the portfolio until it succeeds.';
      }
    }

    const parts = [
      addedMaster ? 'customer' : null,
      addedSnapshot ? 'feature snapshot' : null,
    ].filter(Boolean);
    notify(
      statesUpserted != null
        ? `Added ${parts.join(' + ')} for ${customerId.value} — lifecycle snapshot refreshed (${statesUpserted} row${statesUpserted === 1 ? '' : 's'})`
        : `Added ${parts.join(' + ') || 'record'} for ${customerId.value}`,
      'success',
      { autoClose: 6000 },
    );
    emit('added', { customerId: customerId.value, master: addedMaster, snapshot: addedSnapshot });
    emit('close');
  } catch (e) {
    const detail = e.data?.detail;
    serverErrors.value = Array.isArray(detail)
      ? detail
      : [partialWarning.value || e.message || 'Could not add the customer'];
    notify(e.message || 'Could not add the customer', 'error', { autoClose: 6000 });
  } finally {
    submitting.value = false;
  }
}

return (_ctx, _cache) => {
  return (__props.open)
    ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", {
          class: "absolute inset-0 bg-black/40",
          onClick: _cache[0] || (_cache[0] = $event => (emit('close')))
        }),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", null, [
              _cache[10] || (_cache[10] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Add Customer", -1)),
              createBaseVNode("p", _hoisted_4$1, [
                createBaseVNode("span", _hoisted_5$1, toDisplayString(masterDataset.value?.table || 'public.customers_clean'), 1),
                (rowCountFor(MASTER) != null)
                  ? (openBlock(), createElementBlock("span", _hoisted_6$1, " · " + toDisplayString(rowCountFor(MASTER).toLocaleString()) + " rows", 1))
                  : createCommentVNode("", true),
                _cache[9] || (_cache[9] = createBaseVNode("span", { class: "mx-1" }, "+", -1)),
                createBaseVNode("span", _hoisted_7$1, toDisplayString(snapshotDataset.value?.table || 'public.customer_features'), 1),
                (rowCountFor(SNAPSHOT) != null)
                  ? (openBlock(), createElementBlock("span", _hoisted_8$1, " · " + toDisplayString(rowCountFor(SNAPSHOT).toLocaleString()) + " rows", 1))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("button", {
              class: "text-gray-400 hover:text-gray-600",
              onClick: _cache[1] || (_cache[1] = $event => (emit('close')))
            }, [...(_cache[11] || (_cache[11] = [
              createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_9$1, [
            createBaseVNode("button", {
              class: normalizeClass(["px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors", tab.value === MASTER ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich']),
              onClick: _cache[2] || (_cache[2] = $event => (tab.value = MASTER))
            }, "Customer details (" + toDisplayString(masterFields.value.length) + ")", 3),
            createBaseVNode("button", {
              class: normalizeClass(["px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2", tab.value === SNAPSHOT ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich']),
              onClick: _cache[3] || (_cache[3] = $event => (tab.value = SNAPSHOT))
            }, [
              createTextVNode(" Feature snapshot (" + toDisplayString(snapshotInputFields.value.length) + ") ", 1),
              (withSnapshot.value)
                ? (openBlock(), createElementBlock("span", _hoisted_10$1, toDisplayString(filledSnapshotCount.value), 1))
                : createCommentVNode("", true)
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_11$1, [
            (schemaError.value)
              ? (openBlock(), createElementBlock("div", _hoisted_12$1, toDisplayString(schemaError.value), 1))
              : (schemaLoading.value)
                ? (openBlock(), createElementBlock("p", _hoisted_13$1, "Loading the field contract…"))
                : createCommentVNode("", true),
            (partialWarning.value)
              ? (openBlock(), createElementBlock("div", _hoisted_14$1, toDisplayString(partialWarning.value), 1))
              : createCommentVNode("", true),
            (serverErrors.value.length)
              ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                  _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[11px] font-bold uppercase tracking-wider text-red-700 mb-1" }, "Not added", -1)),
                  createBaseVNode("ul", _hoisted_16$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(serverErrors.value, (msg, i) => {
                      return (openBlock(), createElementBlock("li", { key: i }, toDisplayString(msg), 1))
                    }), 128))
                  ])
                ]))
              : createCommentVNode("", true),
            createBaseVNode("form", {
              class: "space-y-6",
              onSubmit: withModifiers(submit, ["prevent"])
            }, [
              withDirectives(createBaseVNode("div", _hoisted_17$1, [
                createBaseVNode("label", _hoisted_18$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((skipMaster).value = $event)),
                    type: "checkbox",
                    class: "mt-0.5 rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion"
                  }, null, 512), [
                    [vModelCheckbox, skipMaster.value]
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("span", null, " Customer already exists — skip the identity record and only add the feature snapshot. Leave unticked to create the customer. ", -1))
                ]),
                (openBlock(true), createElementBlock(Fragment, null, renderList(masterGroups.value, (group) => {
                  return (openBlock(), createElementBlock("fieldset", {
                    key: group.title,
                    disabled: submitting.value
                  }, [
                    createBaseVNode("legend", _hoisted_20$1, toDisplayString(group.title), 1),
                    createBaseVNode("div", _hoisted_21$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (f) => {
                        return (openBlock(), createElementBlock("div", {
                          key: f.name
                        }, [
                          createBaseVNode("label", {
                            for: `add-master-${f.name}`,
                            class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5"
                          }, [
                            createTextVNode(toDisplayString(f.label) + " ", 1),
                            (f.required && !skipMaster.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_23$1, "*"))
                              : createCommentVNode("", true)
                          ], 8, _hoisted_22$1),
                          (f.type === 'enum' && f.allowed_values?.length)
                            ? withDirectives((openBlock(), createElementBlock("select", {
                                key: 0,
                                id: `add-master-${f.name}`,
                                "onUpdate:modelValue": $event => ((master.value[f.name]) = $event),
                                class: normalizeClass(["w-full border rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none", showMasterError(f) ? 'border-red-400' : 'border-gray-300']),
                                onChange: $event => (touched.value[f.name] = true)
                              }, [
                                _cache[14] || (_cache[14] = createBaseVNode("option", { value: "" }, "— select —", -1)),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(f.allowed_values, (value) => {
                                  return (openBlock(), createElementBlock("option", {
                                    key: value,
                                    value: value
                                  }, toDisplayString(value), 9, _hoisted_25$1))
                                }), 128))
                              ], 42, _hoisted_24$1)), [
                                [vModelSelect, master.value[f.name]]
                              ])
                            : withDirectives((openBlock(), createElementBlock("input", {
                                key: 1,
                                id: `add-master-${f.name}`,
                                "onUpdate:modelValue": $event => ((master.value[f.name]) = $event),
                                type: f.type === 'date' ? 'date' : 'text',
                                maxlength: f.max_length || undefined,
                                placeholder: f.example || '',
                                class: normalizeClass(["w-full border rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none", showMasterError(f) ? 'border-red-400' : 'border-gray-300']),
                                onBlur: $event => (touched.value[f.name] = true)
                              }, null, 42, _hoisted_26$1)), [
                                [vModelDynamic, master.value[f.name]]
                              ]),
                          (showMasterError(f))
                            ? (openBlock(), createElementBlock("p", _hoisted_27$1, toDisplayString(masterErrors.value[f.name]), 1))
                            : (f.format)
                              ? (openBlock(), createElementBlock("p", _hoisted_28$1, toDisplayString(f.format), 1))
                              : createCommentVNode("", true)
                        ]))
                      }), 128))
                    ])
                  ], 8, _hoisted_19$1))
                }), 128))
              ], 512), [
                [vShow, tab.value === MASTER]
              ]),
              withDirectives(createBaseVNode("div", _hoisted_29$1, [
                createBaseVNode("p", _hoisted_30$1, [
                  _cache[17] || (_cache[17] = createTextVNode(" Every column of the ", -1)),
                  _cache[18] || (_cache[18] = createBaseVNode("span", { class: "font-mono text-absa-enrich" }, "customer_features", -1)),
                  _cache[19] || (_cache[19] = createTextVNode(" export, keyed on ", -1)),
                  _cache[20] || (_cache[20] = createBaseVNode("span", { class: "font-semibold" }, "Customer ID + Snapshot date", -1)),
                  _cache[21] || (_cache[21] = createTextVNode(". ", -1)),
                  (customerId.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_31$1, [
                        _cache[15] || (_cache[15] = createTextVNode(" Customer ID ", -1)),
                        createBaseVNode("span", _hoisted_32$1, toDisplayString(customerId.value), 1),
                        _cache[16] || (_cache[16] = createTextVNode(" (from the Customer details tab). ", -1))
                      ]))
                    : (openBlock(), createElementBlock("span", _hoisted_33$1, " Enter the Customer ID on the Customer details tab first. ")),
                  _cache[22] || (_cache[22] = createTextVNode(" Fill any subset — only non-empty columns are written; the rest stay NULL. ", -1))
                ]),
                (offPilotDate.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_34$1, [
                      _cache[23] || (_cache[23] = createTextVNode(" The portfolio views read the ", -1)),
                      createBaseVNode("span", _hoisted_35$1, toDisplayString(unref(snapshotStore).asOfDate), 1),
                      _cache[24] || (_cache[24] = createTextVNode(" snapshot. A snapshot dated ", -1)),
                      createBaseVNode("span", _hoisted_36$1, toDisplayString(snapshotDate.value), 1),
                      _cache[25] || (_cache[25] = createTextVNode(" will be stored, but the customer will only appear on the portfolio once the app is pointed at that date. ", -1))
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("label", _hoisted_37$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((computeSnapshot).value = $event)),
                    type: "checkbox",
                    class: "mt-0.5 rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion"
                  }, null, 512), [
                    [vModelCheckbox, computeSnapshot.value]
                  ]),
                  createBaseVNode("span", null, [
                    _cache[26] || (_cache[26] = createTextVNode(" Refresh the lifecycle snapshot for ", -1)),
                    createBaseVNode("span", _hoisted_38$1, toDisplayString(snapshotDate.value || unref(snapshotStore).asOfDate), 1),
                    _cache[27] || (_cache[27] = createTextVNode(" after saving. The portfolio list and counts read that derived table, so a snapshot that is not recomputed stays invisible even though the data is stored. ", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_39$1, [
                  createBaseVNode("div", _hoisted_40$1, [
                    _cache[28] || (_cache[28] = createBaseVNode("span", { class: "material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" }, "search", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((snapshotFilter).value = $event)),
                      type: "text",
                      placeholder: "Filter columns (e.g. txn, risk_, chan_)",
                      class: "w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                    }, null, 512), [
                      [vModelText, snapshotFilter.value]
                    ])
                  ]),
                  createBaseVNode("span", _hoisted_41$1, [
                    createTextVNode(" showing " + toDisplayString(visibleSnapshotFields.value.length) + " of " + toDisplayString(snapshotInputFields.value.length) + " ", 1),
                    (filledSnapshotCount.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_42$1, " · " + toDisplayString(filledSnapshotCount.value) + " filled", 1))
                      : createCommentVNode("", true)
                  ]),
                  (filledSnapshotCount.value)
                    ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "text-[11px] font-bold text-absa-passion underline",
                        onClick: _cache[7] || (_cache[7] = $event => (snapshot.value = Object.fromEntries(snapshotInputFields.value.map((f) => [f.name, '']))))
                      }, "Clear snapshot"))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("fieldset", { disabled: submitting.value }, [
                  createBaseVNode("div", _hoisted_44$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(visibleSnapshotFields.value, (f) => {
                      return (openBlock(), createElementBlock("div", {
                        key: f.name
                      }, [
                        createBaseVNode("label", {
                          for: `add-snap-${f.name}`,
                          class: "block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1",
                          title: f.label
                        }, [
                          createTextVNode(toDisplayString(f.name) + " ", 1),
                          (f.required)
                            ? (openBlock(), createElementBlock("span", _hoisted_46$1, "*"))
                            : createCommentVNode("", true)
                        ], 8, _hoisted_45$1),
                        (f.type === 'enum' && f.allowed_values?.length)
                          ? withDirectives((openBlock(), createElementBlock("select", {
                              key: 0,
                              id: `add-snap-${f.name}`,
                              "onUpdate:modelValue": $event => ((snapshot.value[f.name]) = $event),
                              class: normalizeClass(["w-full border rounded-sm px-2 py-1.5 text-[11px] text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none", showSnapshotError(f) ? 'border-red-400' : 'border-gray-300']),
                              onChange: $event => (touched.value[f.name] = true)
                            }, [
                              _cache[29] || (_cache[29] = createBaseVNode("option", { value: "" }, "—", -1)),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(f.allowed_values, (value) => {
                                return (openBlock(), createElementBlock("option", {
                                  key: value,
                                  value: value
                                }, toDisplayString(value), 9, _hoisted_48$1))
                              }), 128))
                            ], 42, _hoisted_47$1)), [
                              [vModelSelect, snapshot.value[f.name]]
                            ])
                          : withDirectives((openBlock(), createElementBlock("input", {
                              key: 1,
                              id: `add-snap-${f.name}`,
                              "onUpdate:modelValue": $event => ((snapshot.value[f.name]) = $event),
                              type: f.type === 'date' ? 'date' : 'text',
                              placeholder: f.example || f.type || '',
                              class: normalizeClass(["w-full border rounded-sm px-2 py-1.5 text-[11px] text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none", showSnapshotError(f) ? 'border-red-400' : 'border-gray-300']),
                              onBlur: $event => (touched.value[f.name] = true)
                            }, null, 42, _hoisted_49$1)), [
                              [vModelDynamic, snapshot.value[f.name]]
                            ]),
                        (showSnapshotError(f))
                          ? (openBlock(), createElementBlock("p", _hoisted_50$1, toDisplayString(snapshotErrors.value[f.name]), 1))
                          : createCommentVNode("", true)
                      ]))
                    }), 128))
                  ]),
                  (!visibleSnapshotFields.value.length)
                    ? (openBlock(), createElementBlock("p", _hoisted_51$1, " No columns match “" + toDisplayString(snapshotFilter.value) + "”. ", 1))
                    : createCommentVNode("", true)
                ], 8, _hoisted_43$1)
              ], 512), [
                [vShow, tab.value === SNAPSHOT]
              ]),
              _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-[11px] text-gray-500 border-t border-gray-200 pt-3" }, [
                createBaseVNode("span", { class: "text-absa-passion" }, "*"),
                createTextVNode(" required. The customer id is the key: an existing customer is refused rather than overwritten, so use the profile page to edit one. A feature snapshot is always keyed on customer id + snapshot date, so re-submitting the same snapshot updates it. "),
                createBaseVNode("span", { class: "block mt-1" }, " The customer's profile is available immediately. Portfolio lists and counts read the lifecycle snapshot, so a snapshot becomes visible once the lifecycle state is computed for its date. ")
              ], -1)),
              createBaseVNode("div", _hoisted_52$1, [
                (withSnapshot.value)
                  ? (openBlock(), createElementBlock("span", _hoisted_53$1, [
                      _cache[30] || (_cache[30] = createTextVNode(" Will write: ", -1)),
                      createBaseVNode("span", _hoisted_54$1, toDisplayString(skipMaster.value ? 'feature snapshot only' : 'customer + feature snapshot'), 1)
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("button", {
                  type: "button",
                  disabled: submitting.value,
                  class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50",
                  onClick: _cache[8] || (_cache[8] = $event => (emit('close')))
                }, "Cancel", 8, _hoisted_55$1),
                createBaseVNode("button", {
                  type: "submit",
                  disabled: submitting.value || schemaLoading.value || !!schemaError.value,
                  class: "px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50 flex items-center gap-2"
                }, [
                  createBaseVNode("span", _hoisted_57$1, toDisplayString(submitting.value ? 'hourglass_top' : 'person_add'), 1),
                  createTextVNode(" " + toDisplayString(submitting.value ? 'Adding…' : (withSnapshot.value ? 'Add customer + snapshot' : 'Add customer')), 1)
                ], 8, _hoisted_56$1)
              ])
            ], 32)
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-8" };
const _hoisted_2 = { class: "mb-6 pb-4 border-b border-gray-300 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4" };
const _hoisted_3 = { class: "flex items-center gap-2 text-[11px] text-gray-500 mb-1" };
const _hoisted_4 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = {
  key: 0,
  class: "mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex justify-between items-center"
};
const _hoisted_10 = { class: "bg-white border border-gray-300 rounded-sm p-4 mb-4" };
const _hoisted_11 = { class: "flex flex-col lg:flex-row gap-3 lg:items-center" };
const _hoisted_12 = { class: "relative flex-1 min-w-[220px]" };
const _hoisted_13 = ["value"];
const _hoisted_14 = ["value"];
const _hoisted_15 = { class: "flex items-center gap-2 flex-wrap mt-3" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  key: 1,
  class: "mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-sm flex flex-wrap items-center justify-between gap-3"
};
const _hoisted_18 = { class: "flex items-center gap-2 text-xs text-amber-900" };
const _hoisted_19 = { class: "font-bold" };
const _hoisted_20 = ["disabled"];
const _hoisted_21 = {
  key: 2,
  class: "mb-4 px-4 py-2.5 bg-absa-enrich text-white rounded-sm flex flex-wrap items-center justify-between gap-3"
};
const _hoisted_22 = { class: "flex items-center gap-3 text-xs" };
const _hoisted_23 = { class: "font-bold" };
const _hoisted_24 = {
  key: 0,
  class: "text-red-200"
};
const _hoisted_25 = { class: "flex items-center gap-2" };
const _hoisted_26 = ["disabled"];
const _hoisted_27 = { class: "bg-white border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_28 = { class: "overflow-x-auto" };
const _hoisted_29 = { class: "min-w-full divide-y divide-gray-200" };
const _hoisted_30 = { class: "bg-gray-50" };
const _hoisted_31 = {
  key: 0,
  scope: "col",
  class: "pl-4 pr-2 py-3 w-10"
};
const _hoisted_32 = ["checked", ".indeterminate", "aria-label"];
const _hoisted_33 = { class: "divide-y divide-gray-100 bg-white" };
const _hoisted_34 = { key: 0 };
const _hoisted_35 = ["colspan"];
const _hoisted_36 = { key: 1 };
const _hoisted_37 = ["colspan"];
const _hoisted_38 = ["onClick"];
const _hoisted_39 = ["checked", "aria-label", "onClick"];
const _hoisted_40 = { class: "px-4 py-3" };
const _hoisted_41 = { class: "flex items-center gap-3" };
const _hoisted_42 = { class: "min-w-0" };
const _hoisted_43 = { class: "text-xs font-bold text-absa-enrich truncate" };
const _hoisted_44 = { class: "text-[11px] text-gray-500" };
const _hoisted_45 = { class: "px-4 py-3 whitespace-nowrap" };
const _hoisted_46 = ["title"];
const _hoisted_47 = {
  key: 0,
  title: "Predicted to deteriorate within 30 days"
};
const _hoisted_48 = {
  key: 1,
  title: "Predicted to improve within 30 days"
};
const _hoisted_49 = { class: "px-4 py-3" };
const _hoisted_50 = { class: "flex items-center gap-2" };
const _hoisted_51 = { class: "w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_52 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_53 = { class: "px-4 py-3 whitespace-nowrap text-xs font-mono" };
const _hoisted_54 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_55 = { class: "px-4 py-3 whitespace-nowrap text-xs font-mono text-absa-enrich" };
const _hoisted_56 = { class: "px-4 py-3 whitespace-nowrap" };
const _hoisted_57 = { class: "text-[11px] font-semibold text-gray-600" };
const _hoisted_58 = { class: "px-4 py-3 whitespace-nowrap text-xs text-gray-600" };
const _hoisted_59 = { class: "px-4 py-3 whitespace-nowrap" };
const _hoisted_60 = { class: "text-[11px] font-semibold text-absa-enrich" };
const _hoisted_61 = { class: "px-4 py-3 whitespace-nowrap text-right" };
const _hoisted_62 = { class: "flex items-center justify-end gap-3" };
const _hoisted_63 = ["title", "aria-label", "onClick"];
const _hoisted_64 = ["onClick"];
const _hoisted_65 = {
  key: 0,
  class: "flex items-center justify-between px-4 py-3 border-t border-gray-200"
};
const _hoisted_66 = { class: "text-[11px] text-gray-500" };
const _hoisted_67 = { class: "flex items-center gap-1" };
const _hoisted_68 = ["disabled"];
const _hoisted_69 = { class: "px-3 text-[11px] font-bold text-absa-enrich" };
const _hoisted_70 = ["disabled"];
const _hoisted_71 = ["onKeydown"];

const PAGE_SIZE = 25;


const _sfc_main = /*@__PURE__*/Object.assign({ name: 'MyCustomers' }, {
  __name: 'MyCustomers',
  setup(__props) {

/**
 * My Customers — portfolio-wide customer list for the RM workspace.
 *
 * Shows every customer in the pilot portfolio with lifecycle state, health,
 * churn risk, CLV, segment, branch and the recommended next action. Clicking a
 * row (or "View profile") opens the single-customer CustomerProfile page.
 */


const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore = useSnapshotStore();

// Data loading is limited to the roles the gateway's ingest matrix allows.
const LOAD_ROLES = ['ADMIN', 'RELATIONSHIP_MANAGER', 'OPERATIONS'];
const showLoadData = ref(false);
const showAddCustomer = ref(false);
const canLoadData = computed(() => {
  try {
    const jwt = decodeJWT();
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean);
    return roles.map((r) => String(r).toUpperCase()).some((r) => LOAD_ROLES.includes(r))
  } catch {
    return false
  }
});

// Deleting customers is an OPERATIONS action on the backend (ADMIN bypasses).
// The server is the authority — this only decides whether to render the
// controls, so a user who tampers with it still gets a 403.
const DELETE_ROLES = ['ADMIN', 'OPERATIONS'];
const canDelete = computed(() => {
  try {
    const jwt = decodeJWT();
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean);
    return roles.map((r) => String(r).toUpperCase()).some((r) => DELETE_ROLES.includes(r))
  } catch {
    return false
  }
});
const deleting = ref(false);
const hiddenCount = ref(0);

const COLUMNS = [
  { key: 'name', label: 'Customer' },
  { key: 'state', label: 'State' },
  { key: 'health', label: 'Health Score' },
  { key: 'churn', label: 'Churn Risk' },
  { key: 'clv', label: 'CLV' },
  { key: 'segment', label: 'Segment' },
  { key: 'branch', label: 'Branch' },
  { key: 'action', label: 'Recommended Action' },
  { key: 'go', label: '' },
];

// ── Filter state ────────────────────────────────────────────────
const search = ref(String(route.query.q || ''));
const state = ref(String(route.query.state || ''));
const segment = ref('');
const branch = ref('');
const sortKey = ref('health-asc');
const page = ref(1);

const rows = computed(() => customerStore.customers);

const stateChips = computed(() => {
  const counts = {};
  for (const c of rows.value) counts[c.state] = (counts[c.state] || 0) + 1;
  return [
    { value: '', label: 'All', count: rows.value.length },
    { value: 'ACTIVE', label: 'Active', count: counts.ACTIVE || 0 },
    { value: 'AT_RISK', label: 'At Risk', count: counts.AT_RISK || 0 },
    { value: 'DORMANT', label: 'Dormant', count: counts.DORMANT || 0 },
    { value: 'CHURNED', label: 'Churned', count: counts.CHURNED || 0 },
  ]
});

const branchOptions = computed(() =>
  [...new Set(rows.value.map((c) => c.branch).filter(Boolean))].sort()
);

const activeFilterCount = computed(() =>
  [search.value, state.value, segment.value, branch.value].filter(Boolean).length
);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = rows.value.filter((c) => {
    if (state.value && c.state !== state.value) return false
    if (segment.value && String(c.marketSegment) !== String(segment.value)) return false
    if (branch.value && c.branch !== branch.value) return false
    if (q) {
      const haystack = [c.customerId, c.fullName, c._raw?.account_number, c.segmentLabel]
        .filter(Boolean).join(' ').toLowerCase();
      if (!haystack.includes(q)) return false
    }
    return true
  });

  const STATE_ORDER = ['CHURNED', 'DORMANT', 'AT_RISK', 'ACTIVE', 'GROWING', 'NEW'];
  const sorters = {
    'health-asc': (a, b) => (a.healthScore ?? Infinity) - (b.healthScore ?? Infinity),
    'health-desc': (a, b) => (b.healthScore ?? -Infinity) - (a.healthScore ?? -Infinity),
    'churn-desc': (a, b) => (churnOf(b) ?? -1) - (churnOf(a) ?? -1),
    'name-asc': (a, b) => String(a.fullName || a.customerId).localeCompare(String(b.fullName || b.customerId)),
    state: (a, b) => STATE_ORDER.indexOf(a.state) - STATE_ORDER.indexOf(b.state),
  };
  list = [...list].sort(sorters[sortKey.value] || sorters['health-asc']);
  return list
});

const totalFiltered = computed(() => filteredRows.value.length);
// The list API caps `limit` at 500, so `rows` is a window, not the portfolio.
const portfolioTotal = computed(() => customerStore.pagination.total || rows.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalFiltered.value / PAGE_SIZE)));
const pageStart = computed(() => (page.value - 1) * PAGE_SIZE);
const pageRows = computed(() => filteredRows.value.slice(pageStart.value, pageStart.value + PAGE_SIZE));

// ── Helpers ────────────────────────────────────────────────────
function churnOf(c) {
  const p = predictionStore.predictions[c.customerId];
  const value = p?.churn_probability ?? c.churnProbability;
  return value == null ? null : Number(value)
}

/** Absolute CLV in ZMW — this is the CLV column. Never a rank. */
function clvOf(c) {
  const p = predictionStore.predictions[c.customerId];
  const value = p?.clv ?? c.clv;
  return value == null ? null : Number(value)
}

function clvLabel(c) {
  const v = clvOf(c);
  return v == null ? '—' : v.toLocaleString()
}

/** Rank of that CLV within the snapshot cohort, for percentile-labelled cells. */
function clvPercentileLabel(c) {
  const pct = predictionStore.predictions[c.customerId]?.clv_percentile;
  if (pct == null) return '—'
  const n = Math.round(pct * 100);
  const mod100 = n % 100;
  const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th');
  return `${n}${suffix}`
}

// ── Forward stage forecast (14/30/90d) ──────────────────────────
// Lifecycle severity order: a predicted stage further right is a deterioration.
const LIFECYCLE_ORDER = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED'];

/** 14/30/90-day stage forecast for a row, or null when unavailable. */
function forecastOf(c) {
  return predictionStore.getLifecycleForecast(c.customerId)
}

/** +1 deteriorating, -1 improving, 0 stable/unknown — judged on the 30-day horizon. */
function driftOf(c) {
  const predicted = forecastOf(c)?.['30']?.stage;
  if (!predicted) return 0
  const from = LIFECYCLE_ORDER.indexOf(String(c.state || '').toUpperCase());
  const to = LIFECYCLE_ORDER.indexOf(predicted);
  if (from < 0 || to < 0 || from === to) return 0
  return to > from ? 1 : -1
}

function healthPct(c) {
  const h = Number(c.healthScore);
  return Number.isFinite(h) ? Math.min(100, Math.max(0, h)) : 0
}

function healthColor(c) {
  return tierColor(healthTier(c.healthScore))
}

function churnColor(c) {
  const p = churnOf(c);
  if (p == null) return '#9ca3af'
  if (p < 0.2) return tierColor('passion')
  if (p < 0.5) return tierColor('power')
  if (p < 0.8) return tierColor('hope')
  return tierColor('inspire')
}

function stateColor(s) {
  return tierColor(stateTier(s))
}

function initialsOf(c) {
  const name = c.fullName || c.customerId || '';
  return name.replace(/^Customer\s+/i, '').slice(0, 2).toUpperCase() || 'CU'
}

const ACTION_BY_STATE = {
  CHURNED: 'Win-back outreach',
  DORMANT: 'Re-engagement call',
  AT_RISK: 'Retention call',
  ACTIVE: 'Relationship review',
  GROWING: 'Cross-sell review',
  NEW: 'Onboarding check-in',
};

function recommendedAction(c) {
  return ACTION_BY_STATE[c.state] || 'Monitor'
}

// ── Actions ────────────────────────────────────────────────────
function openProfile(c) {
  router.push({
    name: 'CustomerProfile',
    params: { id: c.customerId },
    query: { from: 'my-customers', page: String(page.value) },
  });
}

function clearFilters() {
  search.value = '';
  state.value = '';
  segment.value = '';
  branch.value = '';
  page.value = 1;
}

function exportList() {
  const data = filteredRows.value.map((c) => ({
    customerId: c.customerId,
    fullName: c.fullName,
    state: c.state,
    healthScore: c.healthScore,
    churnProbability: churnOf(c),
    clv: clvOf(c) ?? '',
    clvPercentile: clvPercentileLabel(c),
    segment: c.segmentLabel,
    branch: c.branch,
    recommendedAction: recommendedAction(c),
  }));
  downloadCsv(
    reportFilename('my-customers'),
    data,
    ['customerId', 'fullName', 'state', 'healthScore', 'churnProbability', 'clv', 'clvPercentile', 'segment', 'branch', 'recommendedAction'],
  );
  notify(`Exported ${data.length} customers`, 'success', { autoClose: 2500 });
}

async function reload() {
  await customerStore.fetchPortfolio();
}

const computing = ref(false);

/** Recompute lifecycle states for the currently selected snapshot date. */
async function computeStates() {
  computing.value = true;
  try {
    const result = await computeCustomerStates(snapshotStore.asOfDate);
    if (result?.status === 'NO_DATA') {
      notify(
        `No feature data for ${snapshotStore.asOfDate} — load a snapshot for that date first`,
        'error',
        { autoClose: 6000 },
      );
      return
    }
    const n = result?.states_upserted ?? 0;
    notify(
      `Computed ${n} customer state${n === 1 ? '' : 's'} for ${snapshotStore.asOfDate}`,
      'success',
      { autoClose: 4000 },
    );
    await onDataLoaded();
  } catch (e) {
    notify(e.message || 'Compute failed', 'error', { autoClose: 6000 });
  } finally {
    computing.value = false;
  }
}

// ── Delete / restore ──────────────────────────────────
// Selection is keyed by customer id so it survives paging and re-sorting.
const selectedIds = ref(new Set());
const selectedCount = computed(() => selectedIds.value.size);
const selectedRows = computed(() => rows.value.filter((c) => selectedIds.value.has(c.customerId)));

// Confirm dialog state. `mode` decides single vs bulk copy and the handler.
const confirmState = ref(null);
const deleteReason = ref('');

const pageIds = computed(() => pageRows.value.map((c) => c.customerId));
const allPageSelected = computed(
  () => pageIds.value.length > 0 && pageIds.value.every((id) => selectedIds.value.has(id))
);
const somePageSelected = computed(
  () => !allPageSelected.value && pageIds.value.some((id) => selectedIds.value.has(id))
);
const overBulkLimit = computed(() => selectedCount.value > MAX_BULK_DELETE);

function toggleRow(customerId) {
  const next = new Set(selectedIds.value);
  if (next.has(customerId)) next.delete(customerId);
  else next.add(customerId);
  selectedIds.value = next;
}

function togglePage() {
  const next = new Set(selectedIds.value);
  if (allPageSelected.value) pageIds.value.forEach((id) => next.delete(id));
  else pageIds.value.forEach((id) => next.add(id));
  selectedIds.value = next;
}

function clearSelection() {
  selectedIds.value = new Set();
}

/** Ask for confirmation before removing anything — never delete on a bare click. */
function askDeleteOne(customer) {
  confirmState.value = {
    mode: 'single',
    rows: [customer],
    title: 'Delete customer',
    message:
      `Remove ${customer.fullName || customer.customerId} from the portfolio?\n\n` +
      'The record is hidden from every list, score and report, and this is recorded ' +
      'in the audit trail. You can restore it afterwards.',
    confirmLabel: 'Delete customer',
  };
  deleteReason.value = '';
}

function askDeleteSelected() {
  if (!selectedCount.value) return
  const names = selectedRows.value.slice(0, 5).map((c) => c.customerId);
  const extra = selectedCount.value - names.length;
  confirmState.value = {
    mode: 'bulk',
    rows: selectedRows.value,
    title: `Delete ${selectedCount.value} customers`,
    message:
      'Remove the selected customers from the portfolio?\n\n' +
      'They are hidden from every list, score and report, and each removal is ' +
      'recorded in the audit trail. You can restore them afterwards.\n\n' +
      (names.join(', ') + (extra > 0 ? ` and ${extra} more` : '')),
    confirmLabel: `Delete ${selectedCount.value} customers`,
  };
  deleteReason.value = '';
}

function cancelDelete() {
  confirmState.value = null;
  deleteReason.value = '';
}

async function confirmDelete() {
  const state = confirmState.value;
  if (!state) return
  deleting.value = true;
  try {
    const ids = state.rows.map((c) => c.customerId);
    const reason = deleteReason.value.trim() || undefined;
    const result = ids.length === 1
      ? await deleteCustomer(ids[0], reason)
      : await bulkDeleteCustomers(ids, reason);

    const removed = result.deleted ?? 0;
    const skipped = (result.already_deleted?.length || 0) + (result.not_found?.length || 0);
    confirmState.value = null;
    deleteReason.value = '';
    clearSelection();

    if (removed === 0) {
      notify(
        result.not_found?.length
          ? `No matching customer found (${result.not_found.join(', ')})`
          : 'Nothing deleted — those customers were already removed',
        'error',
        { autoClose: 4000 },
      );
    } else {
      notify(
        `Deleted ${removed} customer${removed === 1 ? '' : 's'}` +
        (skipped ? ` · ${skipped} already removed or unknown` : '') +
        ' — hidden from the portfolio, restorable below',
        'success',
        { autoClose: 5000 },
      );
    }
    await refreshAfterDelete();
  } catch (e) {
    notify(e.message || 'Delete failed', 'error', { autoClose: 6000 });
  } finally {
    deleting.value = false;
  }
}

async function restoreAll() {
  if (!hiddenCount.value) return
  deleting.value = true;
  try {
    const { customers } = await fetchDeletedCustomers(MAX_BULK_DELETE);
    const ids = (customers || []).map((c) => c.customer_id);
    if (!ids.length) {
      hiddenCount.value = 0;
      return
    }
    const result = await restoreCustomers(ids);
    notify(
      `Restored ${result.restored} customer${result.restored === 1 ? '' : 's'}`,
      'success',
      { autoClose: 4000 },
    );
    await refreshAfterDelete();
  } catch (e) {
    notify(e.message || 'Restore failed', 'error', { autoClose: 6000 });
  } finally {
    deleting.value = false;
  }
}

/** Reload the portfolio and re-sync the hidden-count banner. */
async function refreshAfterDelete() {
  await customerStore.fetchPortfolio();
  await syncHiddenCount();
  const ids = pageRows.value.map((c) => c.customerId);
  if (ids.length) predictionStore.fetchBatchPredictions(ids);
}

async function syncHiddenCount() {
  if (!canDelete.value) return
  try {
    hiddenCount.value = (await fetchDeletedCount()).total || 0;
  } catch {
    // The banner is informational — a failure here must not break the page.
    hiddenCount.value = 0;
  }
}

/** Refresh the table (and the visible rows' predictions) after an ingest. */
async function onDataLoaded() {
  await customerStore.fetchPortfolio();
  const ids = pageRows.value.map((c) => c.customerId);
  if (ids.length) predictionStore.fetchBatchPredictions(ids);
}

// ── Effects ────────────────────────────────────────────────────
watch([search, state, segment, branch, sortKey], () => { page.value = 1; });
watch(totalPages, (max) => { if (page.value > max) page.value = max; });

// Header search targets this route by name, so react to query changes too.
watch(() => route.query.q, (q) => {
  if (q == null) return
  search.value = String(q);
  page.value = 1;
});
watch(() => route.query.state, (s) => {
  if (s == null) return
  state.value = String(s);
  page.value = 1;
});

onMounted(async () => {
  await customerStore.fetchPortfolio();
  // Enrich the visible page with churn + CLV percentile (batched, non-blocking).
  const ids = pageRows.value.map((c) => c.customerId);
  if (ids.length) predictionStore.fetchBatchPredictions(ids);
  syncHiddenCount();
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", null, [
        createBaseVNode("div", _hoisted_3, [
          createVNode(_component_router_link, {
            to: "/dashboard/portfolio",
            class: "hover:text-absa-passion"
          }, {
            default: withCtx(() => [...(_cache[12] || (_cache[12] = [
              createTextVNode("Home", -1)
            ]))]),
            _: 1
          }),
          _cache[13] || (_cache[13] = createBaseVNode("span", null, "/", -1)),
          _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "My Customers", -1))
        ]),
        _cache[15] || (_cache[15] = createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "My Customers", -1)),
        createBaseVNode("p", _hoisted_4, [
          createTextVNode(" Showing " + toDisplayString(totalFiltered.value.toLocaleString()) + " of " + toDisplayString(rows.value.length.toLocaleString()) + " loaded ", 1),
          (portfolioTotal.value > rows.value.length)
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(" · " + toDisplayString(portfolioTotal.value.toLocaleString()) + " in the portfolio ", 1)
              ], 64))
            : createCommentVNode("", true),
          (activeFilterCount.value)
            ? (openBlock(), createElementBlock("span", _hoisted_5, " · " + toDisplayString(activeFilterCount.value) + " filter" + toDisplayString(activeFilterCount.value > 1 ? 's' : '') + " applied", 1))
            : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", _hoisted_6, [
        (canLoadData.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-xs font-semibold",
              onClick: _cache[0] || (_cache[0] = $event => (showAddCustomer.value = true))
            }, [...(_cache[16] || (_cache[16] = [
              createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "person_add", -1),
              createTextVNode(" Add Customer ", -1)
            ]))]))
          : createCommentVNode("", true),
        (canLoadData.value)
          ? (openBlock(), createElementBlock("button", {
              key: 1,
              class: "px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold",
              onClick: _cache[1] || (_cache[1] = $event => (showLoadData.value = true))
            }, [...(_cache[17] || (_cache[17] = [
              createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "upload_file", -1),
              createTextVNode(" Load Data ", -1)
            ]))]))
          : createCommentVNode("", true),
        (canLoadData.value)
          ? (openBlock(), createElementBlock("button", {
              key: 2,
              disabled: computing.value,
              class: "px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold disabled:opacity-40",
              onClick: computeStates
            }, [
              _cache[18] || (_cache[18] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "calculate", -1)),
              createTextVNode(" " + toDisplayString(computing.value ? 'Computing…' : 'Compute States'), 1)
            ], 8, _hoisted_7))
          : createCommentVNode("", true),
        createBaseVNode("button", {
          disabled: !rows.value.length,
          class: "px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold disabled:opacity-40",
          onClick: exportList
        }, [...(_cache[19] || (_cache[19] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download", -1),
          createTextVNode(" Export CSV ", -1)
        ]))], 8, _hoisted_8),
        createVNode(_component_router_link, {
          to: "/dashboard/portfolio",
          class: "px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold"
        }, {
          default: withCtx(() => [...(_cache[20] || (_cache[20] = [
            createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "insights", -1),
            createTextVNode(" Predictive Ledger ", -1)
          ]))]),
          _: 1
        })
      ])
    ]),
    (unref(customerStore).error)
      ? (openBlock(), createElementBlock("div", _hoisted_9, [
          createBaseVNode("span", null, toDisplayString(unref(customerStore).error), 1),
          createBaseVNode("button", {
            class: "font-bold underline",
            onClick: reload
          }, "Retry")
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_10, [
      createBaseVNode("div", _hoisted_11, [
        createBaseVNode("div", _hoisted_12, [
          _cache[21] || (_cache[21] = createBaseVNode("span", { class: "material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" }, "search", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((search).value = $event)),
            type: "text",
            placeholder: "Search customer, account or ID...",
            class: "w-full border border-gray-300 rounded-sm pl-10 pr-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none"
          }, null, 512), [
            [vModelText, search.value]
          ])
        ]),
        withDirectives(createBaseVNode("select", {
          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((segment).value = $event)),
          class: "border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
        }, [
          _cache[22] || (_cache[22] = createBaseVNode("option", { value: "" }, "All segments", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(MARKET_SEGMENT_OPTIONS), (opt) => {
            return (openBlock(), createElementBlock("option", {
              key: String(opt.marketSegment),
              value: String(opt.marketSegment)
            }, toDisplayString(opt.code) + " — " + toDisplayString(opt.label), 9, _hoisted_13))
          }), 128))
        ], 512), [
          [vModelSelect, segment.value]
        ]),
        withDirectives(createBaseVNode("select", {
          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((branch).value = $event)),
          class: "border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
        }, [
          _cache[23] || (_cache[23] = createBaseVNode("option", { value: "" }, "All branches", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(branchOptions.value, (b) => {
            return (openBlock(), createElementBlock("option", {
              key: b,
              value: b
            }, toDisplayString(b), 9, _hoisted_14))
          }), 128))
        ], 512), [
          [vModelSelect, branch.value]
        ]),
        withDirectives(createBaseVNode("select", {
          "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((sortKey).value = $event)),
          class: "border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
        }, [...(_cache[24] || (_cache[24] = [
          createStaticVNode("<option value=\"health-asc\">Health: worst first</option><option value=\"health-desc\">Health: best first</option><option value=\"churn-desc\">Churn risk: highest</option><option value=\"name-asc\">Name: A → Z</option><option value=\"state\">Lifecycle state</option>", 5)
        ]))], 512), [
          [vModelSelect, sortKey.value]
        ])
      ]),
      createBaseVNode("div", _hoisted_15, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(stateChips.value, (chip) => {
          return (openBlock(), createElementBlock("button", {
            key: chip.value,
            class: normalizeClass(["px-3 py-1 rounded-sm border text-[11px] font-bold uppercase tracking-wide transition-colors", state.value === chip.value
            ? 'bg-absa-passion border-absa-passion text-white'
            : 'bg-white border-gray-300 text-gray-600 hover:border-absa-passion hover:text-absa-passion']),
            onClick: $event => (state.value = chip.value)
          }, toDisplayString(chip.label) + " (" + toDisplayString(chip.count) + ") ", 11, _hoisted_16))
        }), 128)),
        (activeFilterCount.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "ml-auto text-[11px] font-bold text-absa-passion underline",
              onClick: clearFilters
            }, " Clear filters "))
          : createCommentVNode("", true)
      ])
    ]),
    (canDelete.value && hiddenCount.value > 0)
      ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createBaseVNode("div", _hoisted_18, [
            _cache[26] || (_cache[26] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "visibility_off", -1)),
            createBaseVNode("span", null, [
              createBaseVNode("span", _hoisted_19, toDisplayString(hiddenCount.value.toLocaleString()), 1),
              createTextVNode(" customer" + toDisplayString(hiddenCount.value === 1 ? '' : 's') + " hidden from the portfolio. ", 1),
              _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-amber-700" }, "Their records are retained — only the listing is filtered.", -1))
            ])
          ]),
          createBaseVNode("button", {
            disabled: deleting.value,
            class: "px-3 py-1.5 border border-amber-300 bg-white rounded-sm text-[11px] font-bold text-amber-900 hover:bg-amber-100 disabled:opacity-50",
            onClick: restoreAll
          }, toDisplayString(deleting.value ? 'Working…' : 'Restore all'), 9, _hoisted_20)
        ]))
      : createCommentVNode("", true),
    (canDelete.value && selectedCount.value > 0)
      ? (openBlock(), createElementBlock("div", _hoisted_21, [
          createBaseVNode("div", _hoisted_22, [
            createBaseVNode("span", _hoisted_23, toDisplayString(selectedCount.value.toLocaleString()) + " selected", 1),
            (overBulkLimit.value)
              ? (openBlock(), createElementBlock("span", _hoisted_24, " Limit is " + toDisplayString(unref(MAX_BULK_DELETE)) + " per operation — trim the selection. ", 1))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_25, [
            createBaseVNode("button", {
              class: "px-3 py-1.5 border border-white/40 rounded-sm text-[11px] font-bold text-white hover:bg-white/10",
              onClick: clearSelection
            }, "Clear selection"),
            createBaseVNode("button", {
              disabled: deleting.value || overBulkLimit.value,
              class: "px-3 py-1.5 bg-absa-passion rounded-sm text-[11px] font-bold text-white hover:bg-absa-power disabled:opacity-40 flex items-center gap-1.5",
              onClick: askDeleteSelected
            }, [...(_cache[27] || (_cache[27] = [
              createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "delete", -1),
              createTextVNode(" Delete selected ", -1)
            ]))], 8, _hoisted_26)
          ])
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_27, [
      createBaseVNode("div", _hoisted_28, [
        createBaseVNode("table", _hoisted_29, [
          createBaseVNode("thead", _hoisted_30, [
            createBaseVNode("tr", null, [
              (canDelete.value)
                ? (openBlock(), createElementBlock("th", _hoisted_31, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      class: "rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion cursor-pointer",
                      checked: allPageSelected.value,
                      ".indeterminate": somePageSelected.value,
                      "aria-label": allPageSelected.value ? 'Deselect all on this page' : 'Select all on this page',
                      onClick: withModifiers(togglePage, ["stop"])
                    }, null, 40, _hoisted_32)
                  ]))
                : createCommentVNode("", true),
              (openBlock(), createElementBlock(Fragment, null, renderList(COLUMNS, (col) => {
                return createBaseVNode("th", {
                  key: col.key,
                  scope: "col",
                  class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap"
                }, toDisplayString(col.label), 1)
              }), 64))
            ])
          ]),
          createBaseVNode("tbody", _hoisted_33, [
            (unref(customerStore).loading && !rows.value.length)
              ? (openBlock(), createElementBlock("tr", _hoisted_34, [
                  createBaseVNode("td", {
                    colspan: COLUMNS.length + (canDelete.value ? 1 : 0),
                    class: "px-4 py-10 text-center text-xs text-gray-500"
                  }, "Loading customers…", 8, _hoisted_35)
                ]))
              : (!pageRows.value.length)
                ? (openBlock(), createElementBlock("tr", _hoisted_36, [
                    createBaseVNode("td", {
                      colspan: COLUMNS.length + (canDelete.value ? 1 : 0),
                      class: "px-4 py-10 text-center text-xs text-gray-500"
                    }, " No customers match the current filters. ", 8, _hoisted_37)
                  ]))
                : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(pageRows.value, (c) => {
              return (openBlock(), createElementBlock("tr", {
                key: c.customerId,
                class: normalizeClass(["hover:bg-gray-50 cursor-pointer transition-colors", selectedIds.value.has(c.customerId) ? 'bg-red-50/60' : '']),
                onClick: $event => (openProfile(c))
              }, [
                (canDelete.value)
                  ? (openBlock(), createElementBlock("td", {
                      key: 0,
                      class: "pl-4 pr-2 py-3",
                      onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
                    }, [
                      createBaseVNode("input", {
                        type: "checkbox",
                        class: "rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion cursor-pointer",
                        checked: selectedIds.value.has(c.customerId),
                        "aria-label": `Select ${c.customerId}`,
                        onClick: withModifiers($event => (toggleRow(c.customerId)), ["stop"])
                      }, null, 8, _hoisted_39)
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("td", _hoisted_40, [
                  createBaseVNode("div", _hoisted_41, [
                    createBaseVNode("div", {
                      class: "w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0",
                      style: normalizeStyle({ background: stateColor(c.state) })
                    }, toDisplayString(initialsOf(c)), 5),
                    createBaseVNode("div", _hoisted_42, [
                      createBaseVNode("div", _hoisted_43, toDisplayString(c.fullName || c.customerId), 1),
                      createBaseVNode("div", _hoisted_44, toDisplayString(c.customerId), 1)
                    ])
                  ])
                ]),
                createBaseVNode("td", _hoisted_45, [
                  createVNode(_sfc_main$4, {
                    state: c.state
                  }, null, 8, ["state"]),
                  (c.isTransition)
                    ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: "ml-1 text-[10px] text-gray-400",
                        title: `Moved from ${c.previousState}`
                      }, "↑", 8, _hoisted_46))
                    : createCommentVNode("", true),
                  (forecastOf(c))
                    ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: normalizeClass(["mt-1 text-[10px] font-mono", driftOf(c) > 0 ? 'text-red-900 font-bold' : driftOf(c) < 0 ? 'text-absa-enrich' : 'text-gray-500'])
                      }, [
                        createTextVNode(toDisplayString(['14', '30', '90'].map(h => `${h}d ${forecastOf(c)[h]?.stage || '—'}`).join(' · ')) + " ", 1),
                        (driftOf(c) > 0)
                          ? (openBlock(), createElementBlock("span", _hoisted_47, "▼"))
                          : (driftOf(c) < 0)
                            ? (openBlock(), createElementBlock("span", _hoisted_48, "▲"))
                            : createCommentVNode("", true)
                      ], 2))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("td", _hoisted_49, [
                  createBaseVNode("div", _hoisted_50, [
                    createBaseVNode("div", _hoisted_51, [
                      createBaseVNode("div", {
                        class: "h-full rounded-full",
                        style: normalizeStyle({ width: healthPct(c) + '%', background: healthColor(c) })
                      }, null, 4)
                    ]),
                    createBaseVNode("span", _hoisted_52, toDisplayString(c.healthScore != null ? Math.round(c.healthScore) : '—'), 1)
                  ])
                ]),
                createBaseVNode("td", _hoisted_53, [
                  (churnOf(c) != null)
                    ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: "font-bold",
                        style: normalizeStyle({ color: churnColor(c) })
                      }, toDisplayString((churnOf(c) * 100).toFixed(1)) + "% ", 5))
                    : (openBlock(), createElementBlock("span", _hoisted_54, "—"))
                ]),
                createBaseVNode("td", _hoisted_55, toDisplayString(clvLabel(c)), 1),
                createBaseVNode("td", _hoisted_56, [
                  createBaseVNode("span", _hoisted_57, toDisplayString(c.segmentLabel || '—'), 1)
                ]),
                createBaseVNode("td", _hoisted_58, toDisplayString(c.branch || '—'), 1),
                createBaseVNode("td", _hoisted_59, [
                  createBaseVNode("span", _hoisted_60, toDisplayString(recommendedAction(c)), 1)
                ]),
                createBaseVNode("td", _hoisted_61, [
                  createBaseVNode("div", _hoisted_62, [
                    (canDelete.value)
                      ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          class: "text-gray-400 hover:text-absa-passion",
                          title: `Delete ${c.customerId}`,
                          "aria-label": `Delete ${c.customerId}`,
                          onClick: withModifiers($event => (askDeleteOne(c)), ["stop"])
                        }, [...(_cache[28] || (_cache[28] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "delete", -1)
                        ]))], 8, _hoisted_63))
                      : createCommentVNode("", true),
                    createBaseVNode("button", {
                      class: "text-[11px] font-bold text-absa-passion hover:text-absa-power underline",
                      onClick: withModifiers($event => (openProfile(c)), ["stop"])
                    }, "View profile", 8, _hoisted_64)
                  ])
                ])
              ], 10, _hoisted_38))
            }), 128))
          ])
        ])
      ]),
      (totalPages.value > 1)
        ? (openBlock(), createElementBlock("div", _hoisted_65, [
            createBaseVNode("span", _hoisted_66, " Showing " + toDisplayString(pageStart.value + 1) + "–" + toDisplayString(Math.min(pageStart.value + PAGE_SIZE, totalFiltered.value)) + " of " + toDisplayString(totalFiltered.value.toLocaleString()), 1),
            createBaseVNode("div", _hoisted_67, [
              createBaseVNode("button", {
                disabled: page.value === 1,
                class: "px-3 py-1.5 border border-gray-300 rounded-sm text-[11px] font-bold text-absa-enrich hover:bg-gray-50 disabled:opacity-40",
                onClick: _cache[7] || (_cache[7] = $event => (page.value = Math.max(1, page.value - 1)))
              }, "Prev", 8, _hoisted_68),
              createBaseVNode("span", _hoisted_69, toDisplayString(page.value) + " / " + toDisplayString(totalPages.value), 1),
              createBaseVNode("button", {
                disabled: page.value >= totalPages.value,
                class: "px-3 py-1.5 border border-gray-300 rounded-sm text-[11px] font-bold text-absa-enrich hover:bg-gray-50 disabled:opacity-40",
                onClick: _cache[8] || (_cache[8] = $event => (page.value = Math.min(totalPages.value, page.value + 1)))
              }, "Next", 8, _hoisted_70)
            ])
          ]))
        : createCommentVNode("", true)
    ]),
    createVNode(_sfc_main$2, {
      open: showLoadData.value,
      onClose: _cache[9] || (_cache[9] = $event => (showLoadData.value = false)),
      onLoaded: onDataLoaded
    }, null, 8, ["open"]),
    createVNode(_sfc_main$1, {
      open: showAddCustomer.value,
      onClose: _cache[10] || (_cache[10] = $event => (showAddCustomer.value = false)),
      onAdded: onDataLoaded
    }, null, 8, ["open"]),
    createVNode(_sfc_main$3, {
      open: !!confirmState.value,
      title: confirmState.value?.title || 'Delete customer',
      message: confirmState.value?.message || '',
      eyebrow: "Soft delete — reversible",
      "confirm-label": confirmState.value?.confirmLabel || 'Delete',
      "busy-label": "Deleting…",
      busy: deleting.value,
      variant: "danger",
      onConfirm: confirmDelete,
      onCancel: cancelDelete,
      onClose: cancelDelete
    }, {
      body: withCtx(() => [
        createBaseVNode("div", null, [
          _cache[29] || (_cache[29] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1.5" }, " Reason (optional — stored in the audit trail) ", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((deleteReason).value = $event)),
            type: "text",
            maxlength: "255",
            placeholder: "e.g. duplicate record, customer request, test data",
            class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none",
            onKeydown: withKeys(withModifiers(confirmDelete, ["prevent"]), ["enter"])
          }, null, 40, _hoisted_71), [
            [vModelText, deleteReason.value]
          ])
        ])
      ]),
      _: 1
    }, 8, ["open", "title", "message", "confirm-label", "busy"])
  ]))
}
}

});

export { _sfc_main as default };
