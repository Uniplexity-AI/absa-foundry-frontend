import { H as decodeJWT, r as ref, o as openBlock, z as createBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, y as unref, aa as X, m as createTextVNode, j as normalizeClass, s as withModifiers, t as toDisplayString, L as LoaderCircle, l as createCommentVNode, F as Fragment, e as renderList, v as withDirectives, K as vModelSelect, U as Teleport, g as _export_sfc, D as computed, h as onMounted, i as onBeforeUnmount, a as createStaticVNode, ag as Eye, al as EyeOff, O as vShow, x as vModelText, ad as Calendar, N as vModelCheckbox, a0 as isRef, w as withCtx, A as resolveComponent } from './index-BDk32LgJ.js';
import { _ as _sfc_main$3 } from './BackButton-BIaMsZqM.js';
import { X as XLSXCompat, Q as createAccount, B as getAccounts, u as useCRMModule, o as on, W as deleteAccount, D as emit, I as updateAccount, O as logAccountActivity } from './CRMModule-KiiHFXsy.js';
import { W as WandSparkles, C as CircleCheckBig, u as useUIStore } from './ui-D16ZZ0T0.js';
import { u as useCurrency } from './useCurrency-1IHr4jgt.js';
import { A as AccountDetailModal, a as AccountFormModal } from './AccountFormModal-B1SDHY3t.js';
import { D as Download, U as Upload } from './LinkedDocumentsWidget-BoHONl71.js';
import { F as FileSpreadsheet } from './file-spreadsheet-DyuylI_5.js';
import { I as Info } from './info-Cc8UMSm3.js';
import { P as Plus } from './plus-DCDMg8FU.js';
import { B as Building } from './building-9D5j-c6j.js';
import { U as Users } from './users-lNmpdK0a.js';
import { A as ArrowRightLeft } from './arrow-right-left-BjIc_EAI.js';
import { c as CalendarPlus } from './video-kiAbn1bw.js';
import { T as TrendingUp, D as DollarSign } from './trending-up-BD2G0VxC.js';
import { T as Target } from './target-DNUBTdBW.js';
import { T as TriangleAlert } from './triangle-alert-DWhGIiGt.js';
import { S as Search, C as ChevronLeft } from './search-BhFkYswD.js';
import { L as LayoutGrid } from './layout-grid-DJNT2tJB.js';
import { L as List } from './list-ukAgqaIx.js';
import { T as Trash2 } from './trash-2-_wqFSg9j.js';
import { U as UserPlus } from './user-plus-C9yLNyiw.js';
import { P as Phone } from './phone-eOVEsDAF.js';
import { M as Mail } from './mail-Bicvzj9O.js';
import { M as MapPin } from './map-pin-BG7dq2Gd.js';
import { P as Pencil } from './pencil-BtgFo6VO.js';
import { C as ChevronRight } from './chevron-right-CqBVd4zk.js';
import { C as CircleUser } from './circle-user-C9QeD63q.js';
import './FileSaver.min-CLGdtH5R.js';
import './refresh-cw-DqoAGUNg.js';
import './calendar-check-dsQ6y7OJ.js';
import './circle-check-BCqsaiQo.js';
import './chevron-down-D6Vc9VaD.js';
import './check-DPtS7Jam.js';
import './clock-Ds5SVF0d.js';
import './paperclip-yeYQHeyr.js';
import './UserSearchSelect-BW--CAtQ.js';
import './building-2-C5p4B-rj.js';
import './user-check-CBhiFR9M.js';

const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100000] p-4"
};
const _hoisted_2$2 = { class: "bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200 relative" };
const _hoisted_3$2 = { class: "flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 z-10 bg-white" };
const _hoisted_4$2 = { class: "flex-1 overflow-y-auto p-6 space-y-5" };
const _hoisted_5$2 = {
  key: 0,
  class: "space-y-5"
};
const _hoisted_6$2 = { class: "flex items-center justify-between" };
const _hoisted_7$2 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_8$2 = { class: "text-[10px] font-mono font-bold text-gray-600 uppercase" };
const _hoisted_9$2 = {
  key: 1,
  class: "space-y-3"
};
const _hoisted_10$2 = { class: "text-[10px] font-mono font-bold text-gray-800" };
const _hoisted_11$2 = { class: "flex gap-3 justify-center" };
const _hoisted_12$2 = ["disabled"];
const _hoisted_13$2 = {
  key: 1,
  class: "space-y-5"
};
const _hoisted_14$2 = { class: "flex items-center justify-between" };
const _hoisted_15$2 = { class: "border border-gray-200 overflow-hidden" };
const _hoisted_16$2 = { class: "w-full text-[8px] font-mono" };
const _hoisted_17$1 = { class: "px-3 py-2 font-bold text-gray-800" };
const _hoisted_18$1 = { class: "px-3 py-2 text-gray-500 truncate max-w-[200px]" };
const _hoisted_19$1 = { class: "px-3 py-2" };
const _hoisted_20$1 = ["onUpdate:modelValue"];
const _hoisted_21$1 = ["value"];
const _hoisted_22$1 = { class: "bg-blue-50 border border-blue-100 p-3 flex items-center gap-2" };
const _hoisted_23$1 = {
  key: 2,
  class: "space-y-5"
};
const _hoisted_24$1 = { class: "flex items-center justify-between" };
const _hoisted_25$1 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest" };
const _hoisted_26$1 = { class: "flex items-center gap-2" };
const _hoisted_27$1 = { class: "text-[8px] font-mono font-bold text-green-600" };
const _hoisted_28$1 = { class: "text-[8px] font-mono font-bold text-amber-600" };
const _hoisted_29$1 = { class: "text-[8px] font-mono font-bold text-red-600" };
const _hoisted_30$1 = { class: "border border-gray-200 overflow-x-auto max-h-60 overflow-y-auto" };
const _hoisted_31$1 = { class: "w-full text-[8px] font-mono" };
const _hoisted_32$1 = { class: "bg-gray-50 border-b border-gray-200 sticky top-0" };
const _hoisted_33$1 = {
  key: 3,
  class: "text-center py-12 space-y-4"
};
const _hoisted_34$1 = { class: "flex justify-center gap-8" };
const _hoisted_35$1 = { class: "text-2xl font-black text-green-600" };
const _hoisted_36$1 = { class: "text-2xl font-black text-amber-600" };
const _hoisted_37$1 = { class: "text-2xl font-black text-red-600" };
const _hoisted_38$1 = { class: "px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between sticky bottom-0 z-10" };
const _hoisted_39$1 = {
  key: 0,
  class: "text-[8px] font-mono text-gray-400"
};
const _hoisted_40$1 = {
  key: 1,
  class: "text-[8px] font-mono text-gray-400"
};
const _hoisted_41$1 = {
  key: 2,
  class: "text-[8px] font-mono text-gray-400"
};
const _hoisted_42$1 = {
  key: 3,
  class: "text-[8px] font-mono text-gray-400"
};
const _hoisted_43$1 = { class: "flex items-center gap-2" };
const _hoisted_44$1 = ["disabled"];


const _sfc_main$2 = {
  __name: 'BulkUploadAccountsModal',
  props: { modelValue: Boolean, branchId: { type: String, default: '' } },
  emits: ['update:modelValue', 'imported'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();

const props = __props;
const emit = __emit;

const currentStep = ref(1);
const selectedFile = ref(null);
const dragOver = ref(false);
const processing = ref(false);
const importing = ref(false);
const fileInput = ref(null);
const parsedColumns = ref([]);
const rawRows = ref([]);
const previewData = ref([]);
const previewHeaders = ref([]);
const importStats = ref({ new: 0, skip: 0, errors: 0 });

const accountFields = [
  { value: 'name', label: 'Account Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'industry', label: 'Industry' },
  { value: 'website', label: 'Website' },
  { value: 'billing_city', label: 'City' },
  { value: 'billing_country', label: 'Country' },
  { value: 'billing_address', label: 'Address' },
  { value: 'tpin', label: 'TPIN' },
  { value: 'description', label: 'Description' },
  { value: 'assigned_to', label: 'Assigned To' },
  { value: 'status', label: 'Status' }
];

function close() { emit('update:modelValue', false); setTimeout(() => { currentStep.value = 1; selectedFile.value = null; parsedColumns.value = []; rawRows.value = []; previewData.value = []; importStats.value = { new: 0, skip: 0, errors: 0 }; }, 300); }

function downloadTemplate() {
  const ws = XLSXCompat.utils.json_to_sheet([
    { Name: 'Example Pharmacy', Email: 'pharmacy@example.com', Phone: '260971234567', Industry: 'Healthcare', City: 'Lusaka', Country: 'Zambia', Address: '123 Main St', TPIN: '1234567890', Description: 'Retail pharmacy', Status: 'active' }
  ]);
  const wb = XLSXCompat.utils.book_new();
  XLSXCompat.utils.book_append_sheet(wb, ws, 'Accounts');
  XLSXCompat.writeFile(wb, 'accounts_import_template.xlsx');
}

function handleFileDrop(e) { dragOver.value = false; const f = e.dataTransfer.files[0]; if (f) selectedFile.value = f; }
function handleFileSelect(e) { const f = e.target.files[0]; if (f) selectedFile.value = f; }

async function processFile() {
  if (!selectedFile.value) return;
  processing.value = true;
  try {
    const buf = await selectedFile.value.arrayBuffer();
    const wb = await XLSXCompat.read(buf, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSXCompat.utils.sheet_to_json(ws, { defval: '' });
    rawRows.value = json;
    if (json.length === 0) { alert('No data found in file.'); processing.value = false; return; }
    
    const cols = Object.keys(json[0]);
    parsedColumns.value = cols.map((c, i) => {
      const lower = c.toLowerCase();
      const match = accountFields.find(f => lower.includes(f.value.replace(/_/g, '')) || lower.includes(f.label.toLowerCase().replace(/ /g, '')));
      return { name: c, sample: String(json[0][c] || '').substring(0, 50), field: match ? match.value : '' };
    });
    currentStep.value = 2;
  } catch (e) { console.error(e); alert('Failed to parse file. Ensure it is a valid .xlsx or .csv.'); }
  finally { processing.value = false; }
}

function autoMapColumns() {
  parsedColumns.value.forEach(col => {
    if (col.field) return;
    const lower = col.name.toLowerCase();
    const match = accountFields.find(f => lower.includes(f.value.replace(/_/g, '')) || lower.includes(f.label.toLowerCase().replace(/ /g, '')));
    if (match) col.field = match.value;
  });
}

async function checkDuplicates(field, value, tenantId) {
  if (!value) return false;
  try {
    const existing = await getAccounts(tenantId, { [field]: value, per_page: 1 });
    const items = existing?.items || existing?.data || existing || [];
    return Array.isArray(items) ? items.length > 0 : !!items;
  } catch { return false; }
}

function buildPreview() {
  const mapped = parsedColumns.value.filter(c => c.field).map(c => c.field);
  const headers = [...new Set(mapped)];
  previewHeaders.value = ['_status', ...headers];
  
  const data = rawRows.value.map(row => {
    const obj = { _status: 'NEW', _dup: false, _err: false };
    parsedColumns.value.forEach(col => {
      if (col.field) obj[col.field] = String(row[col.name] || '').trim();
    });
    return obj;
  });
  previewData.value = data;
}

async function executeImport() {
  importing.value = true;
  const tenantId = getTenantId();
  let newCount = 0, skipCount = 0, errCount = 0;
  
  for (const row of previewData.value) {
    try {
      const name = row.name || '';
      const email = row.email || '';
      
      // Duplicate check by email or name
      if (email) {
        const dup = await checkDuplicates('email', email, tenantId);
        if (dup) { row._status = 'SKIP (Duplicate Email)'; row._dup = true; skipCount++; continue; }
      }
      if (name) {
        const dup = await checkDuplicates('name', name, tenantId);
        if (dup) { row._status = 'SKIP (Duplicate Name)'; row._dup = true; skipCount++; continue; }
      }
      
      const payload = {
        tenant_id: tenantId,
        name, email: row.email || '',
        phone: row.phone || '', industry: row.industry || '',
        billing_city: row.billing_city || '', billing_country: row.billing_country || '',
        billing_address: row.billing_address || '', website: row.website || '',
        tpin: row.tpin || '', description: row.description || '',
        status: row.status || 'active', branch_id: props.branchId || undefined
      };
      await createAccount(payload);
      row._status = 'IMPORTED';
      newCount++;
    } catch (e) {
      row._status = 'ERROR: ' + (e?.response?.data?.detail || e.message || 'Unknown');
      row._err = true;
      errCount++;
    }
  }
  
  importStats.value = { new: newCount, skip: skipCount, errors: errCount };
  currentStep.value = 4;
  importing.value = false;
  emit('imported');
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            _cache[20] || (_cache[20] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]" }, null, -1)),
            createBaseVNode("div", _hoisted_3$2, [
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
                createBaseVNode("div", { class: "w-1 h-5 bg-[#2F2E8B]" }),
                createBaseVNode("div", null, [
                  createBaseVNode("p", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Bulk Import // Accounts"),
                  createBaseVNode("h3", { class: "text-base font-black text-gray-900 uppercase tracking-tight" }, "Bulk Upload Accounts")
                ])
              ], -1)),
              createBaseVNode("button", {
                onClick: close,
                class: "w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"
              }, [
                createVNode(unref(X), { size: 16 })
              ])
            ]),
            createBaseVNode("div", _hoisted_4$2, [
              (currentStep.value === 1)
                ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
                    createBaseVNode("div", _hoisted_6$2, [
                      _cache[7] || (_cache[7] = createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Step 1: Upload File", -1)),
                      createBaseVNode("button", {
                        onClick: downloadTemplate,
                        class: "px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] text-[8px] font-mono font-black uppercase tracking-widest transition flex items-center gap-1.5"
                      }, [
                        createVNode(unref(Download), { size: 11 }),
                        _cache[6] || (_cache[6] = createTextVNode(" Template ", -1))
                      ])
                    ]),
                    createBaseVNode("div", {
                      onDrop: withModifiers(handleFileDrop, ["prevent"]),
                      onDragover: _cache[2] || (_cache[2] = withModifiers($event => (dragOver.value = true), ["prevent"])),
                      onDragleave: _cache[3] || (_cache[3] = withModifiers($event => (dragOver.value = false), ["prevent"])),
                      class: normalizeClass([dragOver.value ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 bg-gray-50/30', "border border-dashed p-10 text-center transition relative"])
                    }, [
                      createBaseVNode("input", {
                        ref_key: "fileInput",
                        ref: fileInput,
                        type: "file",
                        onChange: handleFileSelect,
                        accept: ".xlsx,.xls,.csv",
                        class: "hidden"
                      }, null, 544),
                      (!selectedFile.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
                            createVNode(unref(Upload), {
                              size: 28,
                              class: "mx-auto text-gray-300"
                            }),
                            createBaseVNode("p", _hoisted_8$2, [
                              _cache[8] || (_cache[8] = createTextVNode("Drop file or ", -1)),
                              createBaseVNode("button", {
                                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$refs.fileInput.click())),
                                class: "text-[#2F2E8B] underline"
                              }, "browse")
                            ]),
                            _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[8px] font-mono text-gray-400" }, ".XLSX, .XLS, .CSV", -1))
                          ]))
                        : (openBlock(), createElementBlock("div", _hoisted_9$2, [
                            createVNode(unref(FileSpreadsheet), {
                              size: 32,
                              class: "mx-auto text-emerald-600"
                            }),
                            createBaseVNode("p", _hoisted_10$2, toDisplayString(selectedFile.value.name), 1),
                            createBaseVNode("div", _hoisted_11$2, [
                              createBaseVNode("button", {
                                onClick: processFile,
                                disabled: processing.value,
                                class: "px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5"
                              }, [
                                (processing.value)
                                  ? (openBlock(), createBlock(unref(LoaderCircle), {
                                      key: 0,
                                      size: 11,
                                      class: "animate-spin"
                                    }))
                                  : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(processing.value ? 'Processing...' : 'Process File'), 1)
                              ], 8, _hoisted_12$2),
                              createBaseVNode("button", {
                                onClick: _cache[1] || (_cache[1] = $event => (selectedFile.value = null)),
                                class: "px-4 py-2 border border-gray-200 text-gray-400 text-[8px] font-mono font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition"
                              }, "Remove")
                            ])
                          ]))
                    ], 34),
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "bg-gray-50 border border-gray-100 p-4 space-y-1.5" }, [
                      createBaseVNode("p", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Tips"),
                      createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "• Download template for correct format"),
                      createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "• Required: Name, Email (for dedup)"),
                      createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "• Duplicates are skipped automatically")
                    ], -1))
                  ]))
                : createCommentVNode("", true),
              (currentStep.value === 2)
                ? (openBlock(), createElementBlock("div", _hoisted_13$2, [
                    createBaseVNode("div", _hoisted_14$2, [
                      _cache[12] || (_cache[12] = createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Step 2: Column Mapping", -1)),
                      createBaseVNode("button", {
                        onClick: autoMapColumns,
                        class: "px-3 py-1.5 bg-gray-900 text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-black transition flex items-center gap-1.5"
                      }, [
                        createVNode(unref(WandSparkles), { size: 11 }),
                        _cache[11] || (_cache[11] = createTextVNode(" Auto Map ", -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_15$2, [
                      createBaseVNode("table", _hoisted_16$2, [
                        _cache[14] || (_cache[14] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                            createBaseVNode("th", { class: "px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest" }, "Source Column"),
                            createBaseVNode("th", { class: "px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest" }, "Sample Data"),
                            createBaseVNode("th", { class: "px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest" }, "Map To Field")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(parsedColumns.value, (col, i) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: i,
                              class: "border-b border-gray-100 hover:bg-gray-50/50"
                            }, [
                              createBaseVNode("td", _hoisted_17$1, toDisplayString(col.name), 1),
                              createBaseVNode("td", _hoisted_18$1, toDisplayString(col.sample), 1),
                              createBaseVNode("td", _hoisted_19$1, [
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": $event => ((col.field) = $event),
                                  class: "w-full border border-gray-200 px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] bg-white"
                                }, [
                                  _cache[13] || (_cache[13] = createBaseVNode("option", { value: "" }, "— Skip —", -1)),
                                  (openBlock(), createElementBlock(Fragment, null, renderList(accountFields, (f) => {
                                    return createBaseVNode("option", {
                                      key: f.value,
                                      value: f.value
                                    }, toDisplayString(f.label), 9, _hoisted_21$1)
                                  }), 64))
                                ], 8, _hoisted_20$1), [
                                  [vModelSelect, col.field]
                                ])
                              ])
                            ]))
                          }), 128))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_22$1, [
                      createVNode(unref(Info), {
                        size: 12,
                        class: "text-blue-500 shrink-0"
                      }),
                      _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[8px] font-mono text-blue-700" }, "Name and Email fields are used for duplicate detection.", -1))
                    ])
                  ]))
                : createCommentVNode("", true),
              (currentStep.value === 3)
                ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
                    createBaseVNode("div", _hoisted_24$1, [
                      createBaseVNode("h4", _hoisted_25$1, "Step 3: Preview (" + toDisplayString(previewData.value.length) + " records)", 1),
                      createBaseVNode("div", _hoisted_26$1, [
                        createBaseVNode("span", _hoisted_27$1, toDisplayString(importStats.value.new) + " New", 1),
                        createBaseVNode("span", _hoisted_28$1, toDisplayString(importStats.value.skip) + " Duplicates", 1),
                        createBaseVNode("span", _hoisted_29$1, toDisplayString(importStats.value.errors) + " Errors", 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_30$1, [
                      createBaseVNode("table", _hoisted_31$1, [
                        createBaseVNode("thead", null, [
                          createBaseVNode("tr", _hoisted_32$1, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(previewHeaders.value, (h) => {
                              return (openBlock(), createElementBlock("th", {
                                class: "px-2 py-1.5 text-left font-black text-gray-500 uppercase",
                                key: h
                              }, toDisplayString(h), 1))
                            }), 128))
                          ])
                        ]),
                        createBaseVNode("tbody", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(previewData.value, (row, i) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: i,
                              class: normalizeClass(["border-b border-gray-100", row._dup ? 'bg-amber-50' : row._err ? 'bg-red-50' : ''])
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(previewHeaders.value, (h) => {
                                return (openBlock(), createElementBlock("td", {
                                  class: "px-2 py-1 text-gray-700",
                                  key: h
                                }, toDisplayString(row[h] || '—'), 1))
                              }), 128))
                            ], 2))
                          }), 128))
                        ])
                      ])
                    ])
                  ]))
                : createCommentVNode("", true),
              (currentStep.value === 4)
                ? (openBlock(), createElementBlock("div", _hoisted_33$1, [
                    createVNode(unref(CircleCheckBig), {
                      size: 48,
                      class: "mx-auto text-emerald-500"
                    }),
                    _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Import Complete", -1)),
                    createBaseVNode("div", _hoisted_34$1, [
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_35$1, toDisplayString(importStats.value.new), 1),
                        _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "Imported", -1))
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_36$1, toDisplayString(importStats.value.skip), 1),
                        _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "Duplicates Skipped", -1))
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_37$1, toDisplayString(importStats.value.errors), 1),
                        _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[8px] font-mono text-gray-500" }, "Errors", -1))
                      ])
                    ])
                  ]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_38$1, [
              createBaseVNode("div", null, [
                (currentStep.value === 1)
                  ? (openBlock(), createElementBlock("span", _hoisted_39$1, "Upload a spreadsheet to begin"))
                  : (currentStep.value === 2)
                    ? (openBlock(), createElementBlock("span", _hoisted_40$1, "Map columns to account fields"))
                    : (currentStep.value === 3)
                      ? (openBlock(), createElementBlock("span", _hoisted_41$1, "Review and confirm import"))
                      : (openBlock(), createElementBlock("span", _hoisted_42$1, "Import completed"))
              ]),
              createBaseVNode("div", _hoisted_43$1, [
                (currentStep.value < 4)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: close,
                      class: "px-4 py-2 border border-gray-200 text-gray-500 hover:text-gray-700 text-[8px] font-mono font-black uppercase tracking-widest transition"
                    }, "Cancel"))
                  : createCommentVNode("", true),
                (currentStep.value === 2)
                  ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      onClick: _cache[4] || (_cache[4] = $event => {currentStep.value = 3; buildPreview();}),
                      class: "px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition"
                    }, "Preview"))
                  : createCommentVNode("", true),
                (currentStep.value === 3)
                  ? (openBlock(), createElementBlock("button", {
                      key: 2,
                      onClick: executeImport,
                      disabled: importing.value,
                      class: "px-5 py-2 bg-green-600 text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition flex items-center gap-1.5"
                    }, [
                      (importing.value)
                        ? (openBlock(), createBlock(unref(LoaderCircle), {
                            key: 0,
                            size: 11,
                            class: "animate-spin"
                          }))
                        : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(importing.value ? 'Importing...' : 'Import All'), 1)
                    ], 8, _hoisted_44$1))
                  : createCommentVNode("", true),
                (currentStep.value === 4)
                  ? (openBlock(), createElementBlock("button", {
                      key: 3,
                      onClick: close,
                      class: "px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition"
                    }, "Done"))
                  : createCommentVNode("", true)
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};

const _hoisted_1$1 = { class: "w-full space-y-4" };
const _hoisted_2$1 = {
  key: 0,
  class: "space-y-4 w-full animate-pulse"
};
const _hoisted_3$1 = { class: "flex gap-3" };
const _hoisted_4$1 = { class: "flex-1 grid grid-cols-2 md:grid-cols-4 gap-3" };
const _hoisted_5$1 = { class: "flex gap-3" };
const _hoisted_6$1 = { class: "bg-white border border-gray-200 rounded-sm overflow-hidden" };
const _hoisted_7$1 = { class: "flex items-center gap-2" };
const _hoisted_8$1 = ["disabled"];
const _hoisted_9$1 = { class: "flex flex-col gap-3 p-3 sm:p-4 transition-all duration-300" };
const _hoisted_10$1 = { class: "flex flex-col lg:flex-row gap-3" };
const _hoisted_11$1 = { class: "lg:w-1/2 xl:w-2/5 space-y-2" };
const _hoisted_12$1 = { class: "flex items-center gap-1" };
const _hoisted_13$1 = { class: "text-[8px] font-mono font-bold text-gray-700 uppercase tracking-widest" };
const _hoisted_14$1 = { class: "font-black text-[#2F2E8B]" };
const _hoisted_15$1 = { key: 0 };
const _hoisted_16$1 = { class: "grid grid-cols-2 gap-1.5" };
const _hoisted_17 = { class: "relative overflow-hidden bg-gradient-to-br from-[#2F2E8B] to-[#1f1e6b] text-white rounded-sm shadow-none" };
const _hoisted_18 = { class: "px-2.5 py-1.5" };
const _hoisted_19 = { class: "flex items-center justify-between" };
const _hoisted_20 = { class: "text-base font-black tracking-tight mt-0.5" };
const _hoisted_21 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_22 = { class: "px-2.5 py-1.5" };
const _hoisted_23 = { class: "flex items-center justify-between" };
const _hoisted_24 = { class: "text-base font-black text-purple-700 tracking-tight mt-0.5" };
const _hoisted_25 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_26 = { class: "px-2.5 py-1.5" };
const _hoisted_27 = { class: "flex items-center justify-between" };
const _hoisted_28 = { class: "text-base font-black text-emerald-700 tracking-tight mt-0.5" };
const _hoisted_29 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_30 = { class: "px-2.5 py-1.5" };
const _hoisted_31 = { class: "flex items-center justify-between" };
const _hoisted_32 = { class: "text-base font-black text-orange-700 tracking-tight mt-0.5" };
const _hoisted_33 = { class: "grid grid-cols-2 gap-1.5" };
const _hoisted_34 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_35 = { class: "px-2.5 py-1.5" };
const _hoisted_36 = { class: "flex items-center justify-between" };
const _hoisted_37 = { class: "text-base font-black text-gray-900 tracking-tight mt-0.5" };
const _hoisted_38 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_39 = { class: "px-2.5 py-1.5" };
const _hoisted_40 = { class: "flex items-center justify-between" };
const _hoisted_41 = { class: "text-base font-black text-gray-900 tracking-tight mt-0.5" };
const _hoisted_42 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_43 = { class: "px-2.5 py-1.5" };
const _hoisted_44 = { class: "flex items-center justify-between" };
const _hoisted_45 = { class: "text-base font-black text-gray-900 tracking-tight mt-0.5" };
const _hoisted_46 = { class: "relative overflow-hidden bg-white border border-gray-200 rounded-sm shadow-none" };
const _hoisted_47 = { class: "px-2.5 py-1.5" };
const _hoisted_48 = { class: "flex items-center justify-between" };
const _hoisted_49 = { class: "text-base font-black text-gray-900 tracking-tight mt-0.5" };
const _hoisted_50 = { class: "lg:w-1/2 xl:w-3/5" };
const _hoisted_51 = { class: "bg-white border border-gray-200 rounded-sm p-2.5 space-y-2" };
const _hoisted_52 = { class: "flex items-center gap-1.5" };
const _hoisted_53 = { class: "relative flex-1 min-w-0" };
const _hoisted_54 = { class: "flex items-center gap-0.5 shrink-0" };
const _hoisted_55 = { class: "flex items-center gap-1.5" };
const _hoisted_56 = ["value"];
const _hoisted_57 = { class: "flex items-center justify-between gap-2 pt-1.5 border-t border-gray-100" };
const _hoisted_58 = { class: "flex items-center gap-1" };
const _hoisted_59 = {
  key: 0,
  class: "flex items-center gap-1.5"
};
const _hoisted_60 = { class: "text-[7px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest" };
const _hoisted_61 = ["disabled"];
const _hoisted_62 = ["disabled"];
const _hoisted_63 = { class: "bg-white w-full max-w-sm mx-4 border border-gray-200 shadow-2xl overflow-hidden" };
const _hoisted_64 = { class: "p-6" };
const _hoisted_65 = { class: "flex items-start gap-4" };
const _hoisted_66 = { class: "flex-shrink-0 w-10 h-10 bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center" };
const _hoisted_67 = { class: "flex-1" };
const _hoisted_68 = { class: "text-sm font-semibold text-gray-900 mb-1" };
const _hoisted_69 = ["value"];
const _hoisted_70 = { class: "px-6 pb-5 flex justify-end gap-3" };
const _hoisted_71 = ["disabled"];
const _hoisted_72 = {
  key: 1,
  class: "bg-white border border-gray-200 rounded-sm p-12 text-center relative overflow-hidden"
};
const _hoisted_73 = { class: "relative z-10" };
const _hoisted_74 = { class: "text-xs text-gray-400 mt-2 mb-6" };
const _hoisted_75 = {
  key: 2,
  class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
};
const _hoisted_76 = ["onClick"];
const _hoisted_77 = { class: "p-2 border-b border-gray-100 flex items-center justify-between" };
const _hoisted_78 = { class: "flex items-center gap-2 min-w-0" };
const _hoisted_79 = { class: "w-6 h-6 flex-shrink-0 rounded-sm bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-[8px] font-mono" };
const _hoisted_80 = { class: "min-w-0" };
const _hoisted_81 = { class: "font-bold text-[10px] text-gray-900 uppercase tracking-tight truncate" };
const _hoisted_82 = {
  key: 0,
  class: "text-[7px] font-mono font-bold text-gray-600 uppercase"
};
const _hoisted_83 = {
  key: 0,
  class: "px-1 py-0.5 bg-yellow-50 text-yellow-700 text-[7px] font-mono font-bold border border-yellow-200 uppercase shrink-0"
};
const _hoisted_84 = { class: "p-2 space-y-0.5" };
const _hoisted_85 = {
  key: 0,
  class: "flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-800"
};
const _hoisted_86 = {
  key: 1,
  class: "flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-700"
};
const _hoisted_87 = { class: "truncate" };
const _hoisted_88 = {
  key: 2,
  class: "flex items-center gap-1.5 truncate text-[8px] font-mono font-bold text-gray-700"
};
const _hoisted_89 = { class: "truncate" };
const _hoisted_90 = { class: "px-2 py-1 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between" };
const _hoisted_91 = { class: "flex items-center gap-1 text-[7px] font-mono font-bold text-gray-600" };
const _hoisted_92 = ["onClick"];
const _hoisted_93 = ["onClick"];
const _hoisted_94 = ["onClick"];
const _hoisted_95 = {
  key: 3,
  class: "bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col"
};
const _hoisted_96 = {
  key: 0,
  class: "bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 px-3 py-2 flex items-center justify-between gap-2"
};
const _hoisted_97 = { class: "flex items-center gap-2 text-[10px] font-mono font-bold text-orange-700 uppercase tracking-widest" };
const _hoisted_98 = { class: "text-orange-500" };
const _hoisted_99 = { class: "flex items-center gap-1.5" };
const _hoisted_100 = { class: "overflow-x-auto" };
const _hoisted_101 = { class: "min-w-full divide-y divide-gray-100 border-collapse" };
const _hoisted_102 = { class: "bg-gray-50/50" };
const _hoisted_103 = { class: "pl-3 pr-1 py-2 text-left w-9" };
const _hoisted_104 = { class: "flex items-center justify-center" };
const _hoisted_105 = { class: "bg-white divide-y divide-gray-100" };
const _hoisted_106 = ["onClick"];
const _hoisted_107 = { class: "pl-3 pr-1 py-2 whitespace-nowrap" };
const _hoisted_108 = { class: "flex items-center justify-center" };
const _hoisted_109 = ["checked", "onClick"];
const _hoisted_110 = { class: "flex items-center gap-2" };
const _hoisted_111 = { class: "flex-shrink-0 h-7 w-7" };
const _hoisted_112 = { class: "h-7 w-7 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] font-mono font-black text-[11px]" };
const _hoisted_113 = ["value", "onInput"];
const _hoisted_114 = {
  key: 1,
  class: "text-[11px] font-mono font-bold text-gray-900 uppercase tracking-tight cursor-pointer hover:text-[#2F2E8B]"
};
const _hoisted_115 = {
  key: 2,
  class: "text-[7px] font-mono font-bold text-yellow-700 uppercase"
};
const _hoisted_116 = ["value", "onInput"];
const _hoisted_117 = {
  key: 1,
  class: "text-[11px] font-mono font-bold text-gray-700 capitalize"
};
const _hoisted_118 = ["value", "onInput"];
const _hoisted_119 = {
  key: 1,
  class: "text-[11px] font-mono font-bold text-gray-800"
};
const _hoisted_120 = { class: "px-2.5 py-2 whitespace-nowrap text-[11px] font-mono font-bold text-gray-700 truncate max-w-[140px]" };
const _hoisted_121 = { class: "px-2.5 py-2 whitespace-nowrap text-[11px] font-mono font-bold text-gray-700" };
const _hoisted_122 = { class: "flex items-center gap-1" };
const _hoisted_123 = ["value", "onInput"];
const _hoisted_124 = { class: "w-5 h-5 rounded-sm bg-gray-50 flex items-center justify-center text-[8px] font-mono font-black border border-gray-100 text-gray-400 shrink-0" };
const _hoisted_125 = { class: "text-[10px] font-mono font-bold text-gray-600 uppercase tracking-tight truncate max-w-[80px] block" };
const _hoisted_126 = { class: "px-2.5 py-2 whitespace-nowrap text-[10px] font-mono font-bold text-gray-400 uppercase" };
const _hoisted_127 = { class: "px-2.5 py-2 whitespace-nowrap text-right" };
const _hoisted_128 = ["onClick"];
const _hoisted_129 = ["onClick"];
const _hoisted_130 = ["onClick"];
const _hoisted_131 = {
  key: 4,
  class: "flex items-center justify-between bg-white border border-gray-200 px-4 py-3"
};
const _hoisted_132 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_133 = { class: "flex items-center gap-1" };
const _hoisted_134 = ["disabled"];
const _hoisted_135 = ["disabled"];
const _hoisted_136 = {
  key: 0,
  class: "px-1 text-[9px] font-mono text-gray-300"
};
const _hoisted_137 = ["onClick"];
const _hoisted_138 = ["disabled"];
const _hoisted_139 = ["disabled"];
const _hoisted_140 = { class: "bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden" };
const _hoisted_141 = { class: "p-6" };
const _hoisted_142 = { class: "flex items-start gap-4" };
const _hoisted_143 = { class: "flex-shrink-0 w-10 h-10 bg-red-50 border border-red-200 flex items-center justify-center" };
const _hoisted_144 = { class: "text-sm font-semibold text-gray-800" };
const _hoisted_145 = { class: "px-6 pb-5 flex justify-end gap-3" };
const _hoisted_146 = ["disabled"];
const _hoisted_147 = ["disabled"];
const _hoisted_148 = {
  key: 0,
  class: "fas fa-spinner fa-spin text-xs"
};
const _hoisted_149 = { class: "bg-white w-full max-w-2xl mx-4 border border-blue-200 shadow-2xl overflow-hidden" };
const _hoisted_150 = { class: "p-5" };
const _hoisted_151 = { class: "flex items-center gap-3 mb-4" };
const _hoisted_152 = { class: "w-10 h-10 bg-blue-50 border border-blue-200 flex items-center justify-center" };
const _hoisted_153 = { class: "flex justify-end gap-2 mt-4" };
const _hoisted_154 = ["disabled"];


const _sfc_main$1 = {
  __name: 'AccountsView',
  props: { users: { type: Array, default: () => [] } },
  setup(__props) {

const uiStore = useUIStore();
const { getTenantId, getUserEmail } = decodeJWT();
const { pipelineDeals, filteredMeetings } = useCRMModule();
const { formatCurrencyCompact, currencySymbol } = useCurrency();

// ── Financial KPIs ──
const formatMoney = (val) => {
  const amount = Number(val) || 0;
  if (!amount) return formatCurrencyCompact(0);
  return formatCurrencyCompact(amount) || `${currencySymbol.value || ''} ${amount.toLocaleString()}`.trim();
};
const kpiPipelineValue = computed(() =>
  (pipelineDeals.value || []).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiWonRevenue = computed(() =>
  (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won')).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiCAC = computed(() => {
  const won = (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won'));
  return won.length ? kpiWonRevenue.value / won.length : 0;
});
const kpiMaintenance = computed(() =>
  (filteredMeetings.value || []).filter(m => m.status === 'cancelled' || m.status === 'no_show').length
);

// State
const accounts = ref([]);
const loading = ref(false);
const isAccountsSectionVisible = ref(false);
const searchQuery = ref('');
const industryFilter = ref('');
const statusFilter = ref('');
const assigneeFilter = ref('');
const dateFromFilter = ref('');
const dateToFilter = ref('');
const viewMode = ref('list');
const currentPage = ref(1);
const perPage = ref(24);
const totalAccounts = ref(0);
const showDetailModal = ref(false);
const showFormModal = ref(false);
const showBulkUploadModal = ref(false);
const safeBranchId = computed(() => '');

// Selection & Bulk Actions
const selectedAccountIds = ref([]);
const showBulkAssignModal = ref(false);
const bulkAssignTarget = ref('');
const bulkProcessing = ref(false);

const allSelected = computed({
  get: () => accounts.value.length > 0 && selectedAccountIds.value.length === accounts.value.length,
  set: (val) => { selectedAccountIds.value = val ? accounts.value.map(a => a.id) : []; }
});

function toggleAccountSelection(id) {
  const idx = selectedAccountIds.value.indexOf(id);
  if (idx > -1) selectedAccountIds.value.splice(idx, 1);
  else selectedAccountIds.value.push(id);
}

function clearSelection() { selectedAccountIds.value = []; }

async function bulkDeleteAccounts() {
  if (selectedAccountIds.value.length === 0) return;
  if (!confirm(`Delete ${selectedAccountIds.value.length} account(s)? This cannot be undone.`)) return;
  bulkProcessing.value = true;
  const tenantId = getTenantId();
  let success = 0, failed = 0;
  for (const id of selectedAccountIds.value) {
    try { await deleteAccount(id, tenantId); success++; }
    catch { failed++; }
  }
  clearSelection();
  bulkProcessing.value = false;
  await loadAccounts();
  emit('crm:accounts:changed');
  alert(`${success} account(s) deleted.${failed ? ' ' + failed + ' failed.' : ''}`);
}

function openBulkAssign() { showBulkAssignModal.value = true; }
async function confirmBulkAssign() {
  if (!bulkAssignTarget.value || selectedAccountIds.value.length === 0) return;
  bulkProcessing.value = true;
  const tenantId = getTenantId();
  if (!tenantId) { alert('Tenant ID not found. Please log out and log back in.'); bulkProcessing.value = false; return; }
  let success = 0, failed = 0;
  for (const id of selectedAccountIds.value) {
    try {
      const res = await updateAccount(id, { assignedTo: bulkAssignTarget.value }, tenantId);
      if (res) success++;
      else failed++;
    } catch (e) {
      console.error(`[BulkAssign] Failed for account ${id}:`, e);
      failed++;
    }
  }
  showBulkAssignModal.value = false;
  bulkAssignTarget.value = '';
  clearSelection();
  bulkProcessing.value = false;
  await loadAccounts();
  emit('crm:accounts:changed');
  if (failed > 0) {
    alert(`${success} account(s) assigned successfully. ${failed} account(s) failed. Check permissions or try again.`);
  } else {
    alert(`Successfully assigned ${success} account(s).`);
  }
}
const showDeleteConfirm = ref(false);
const deleteLoading = ref(false);
const selectedAccount = ref(null);
const accountToEdit = ref(null);
const accountToDelete = ref(null);

// Computed
const totalPages = computed(() => Math.max(1, Math.ceil(totalAccounts.value / perPage.value)));
const pageStart = computed(() => {
  if (!totalAccounts.value) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});
const pageEnd = computed(() => Math.min(totalAccounts.value, currentPage.value * perPage.value));
computed(() => [searchQuery.value, industryFilter.value].filter(Boolean).length);

const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (cur > 3) pages.push('...');
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p);
  if (cur < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});

// Contacts under an account = its associated leads (regardless of stage)
function getAccountContactCount(a) {
  if (!a) return 0;
  if (Array.isArray(a.associatedLeadIds)) return a.associatedLeadIds.length;
  if (Array.isArray(a.associated_lead_ids)) return a.associated_lead_ids.length;
  return Number(a.contactCount || 0);
}

const stats = computed(() => {
  const total = totalAccounts.value;
  const accountLeadCount = getAccountContactCount;
  // WITH_CONTACTS: accounts that have at least one linked lead (= contact)
  const withContacts = accounts.value.filter(a => accountLeadCount(a) > 0).length;
  // FROM_LEADS: accounts that originated from a lead conversion
  const converted = accounts.value.filter(a => a.isConverted || a.convertedFromLeadId || a.converted_from_lead_id || a.sourceLeadId || a.source_lead_id).length;
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const thisMonth = accounts.value.filter(a => {
    const ts = a.createdAt || a.created_at || a.createdOn || a.created_on;
    return ts && new Date(ts) >= startOfMonth;
  }).length;
  return { total, withContacts, converted, thisMonth };
});

// Methods
async function loadAccounts() {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      q: searchQuery.value || undefined,
      industry: industryFilter.value || undefined,
      status: statusFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined
    };
    const response = await getAccounts(getTenantId(), params);
    accounts.value = response.items || response || [];
    totalAccounts.value = response.total || accounts.value.length;
  } catch (error) {
    console.error('Failed to load accounts:', error);
    accounts.value = [];
    totalAccounts.value = 0;
  } finally {
    loading.value = false;
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { currentPage.value = 1; loadAccounts(); }, 500);
}

function openCreateModal() { accountToEdit.value = null; showFormModal.value = true; }
function openBulkUpload() { showBulkUploadModal.value = true; }
function handleBulkImportComplete() { showBulkUploadModal.value = false; loadAccounts(); emit('crm:accounts:changed'); }
function viewAccount(account) { selectedAccount.value = account; showDetailModal.value = true; }
function editAccount(account) { accountToEdit.value = account; showFormModal.value = true; }
function deleteAccount$1(account) { accountToDelete.value = account; showDeleteConfirm.value = true; }
async function archiveAccount(account) {
  try {
    const tenantId = getTenantId();
    await updateAccount(account.id, { ...account, archived: true }, tenantId);
    await loadAccounts();
    emit('crm:accounts:changed');
  } catch (err) {
    console.error('[AccountsView] Failed to archive account:', err);
  }
}
async function handleExportAccounts() {
  try {
    const params = {
      q: searchQuery.value || undefined,
      industry: industryFilter.value || undefined,
      status: statusFilter.value || undefined,
      assignedTo: assigneeFilter.value || undefined,
      created_from: dateFromFilter.value || undefined,
      created_to: dateToFilter.value || undefined,
      export: true
    };
    const response = await getAccounts(getTenantId(), params);
    const data = response.items || response || [];
    if (!data.length) return;
    const csv = [
      ['Name', 'Industry', 'Phone', 'Email', 'Website', 'Location', 'Contacts', 'Assigned To', 'Created'],
      ...data.map(a => [
        a.name || '', a.industry || '', a.phone || '', a.email || '', a.website || '',
        [a.billingCity, a.billingCountry].filter(Boolean).join(', '),
        getAccountContactCount(a), a.assignedTo || '', a.createdAt || ''
      ])
    ].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `accounts_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  } catch (err) { console.error('Export failed:', err); }
}

function resetFilters() {
  searchQuery.value = '';
  industryFilter.value = '';
  statusFilter.value = '';
  assigneeFilter.value = '';
  dateFromFilter.value = '';
  dateToFilter.value = '';
  currentPage.value = 1;
  loadAccounts();
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false;
  accountToDelete.value = null;
}

async function confirmDelete() {
  const name = accountToDelete.value?.name || '';
  deleteLoading.value = true;
  try {
    await deleteAccount(accountToDelete.value.id, getTenantId());
    closeDeleteConfirm();
    uiStore.showSuccessToast(`Account "${name}" deleted.`);
    await loadAccounts();
    emit('crm:accounts:changed');
  } catch (error) {
    console.error('Failed to delete account:', error);
    uiStore.showErrorToast(error.message || 'Failed to delete account.');
    closeDeleteConfirm();
  } finally {
    deleteLoading.value = false;
  }
}

function handleEdit(account) { showDetailModal.value = false; setTimeout(() => { accountToEdit.value = account; showFormModal.value = true; }, 100); }
function handleDelete(account) { showDetailModal.value = false; setTimeout(() => deleteAccount$1(account), 100); }
function handleArchive(account) { showDetailModal.value = false; setTimeout(() => archiveAccount(account), 100); }
async function handleSaved() { showFormModal.value = false; accountToEdit.value = null; await loadAccounts(); emit('crm:accounts:changed'); }
function nextPage() { if (currentPage.value < totalPages.value) { currentPage.value++; loadAccounts(); } }
function previousPage() { if (currentPage.value > 1) { currentPage.value--; loadAccounts(); } }
function goToPage(p) { if (typeof p === 'number' && p !== currentPage.value) { currentPage.value = p; loadAccounts(); } }

function getInitials(name) {
  if (!name) return '?';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function formatLocation(account) {
  const parts = [account.billingCity, account.billingCountry].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
}

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

let _unsubAccounts = null;
onMounted(() => {
  loadAccounts();
  _unsubAccounts = on('crm:accounts:changed', () => { currentPage.value = 1; loadAccounts(); });
});
onBeforeUnmount(() => { if (typeof _unsubAccounts === 'function') _unsubAccounts(); });

// ── Inline Excel Editing ──
const excelImportRef = ref(null);
const isExcelEditing = ref(false);
const excelChanges = ref({});
const savingExcel = ref(false);
const showExtractDialog = ref(false);
const extractText = ref('');

const extractRowCount = computed(() => {
  if (!extractText.value.trim()) return 0;
  return extractText.value.trim().split('\n').filter(l => l.trim()).length;
});

function getExcelValue(account, field) {
  const key = account.id || account._id;
  return excelChanges.value[key]?.[field] ?? '';
}

function setExcelValue(account, field, value) {
  const key = account.id || account._id;
  if (!excelChanges.value[key]) {
    excelChanges.value[key] = {};
  }
  excelChanges.value[key][field] = value;
}

function toggleExcelEdit() {
  if (savingExcel.value) return;
  if (isExcelEditing.value) {
    saveExcelChanges();
  } else {
    enterExcelEditMode();
  }
}

function enterExcelEditMode() {
  // Switch to table view so editable cells are visible
  if (viewMode.value !== 'list') viewMode.value = 'list';
  const changes = {};
  for (const acct of accounts.value) {
    const id = acct.id || acct._id;
    if (!id) continue;
    changes[id] = {
      name: acct.name || '',
      industry: acct.industry || '',
      phone: acct.phone || '',
      assignedTo: acct.assignedTo || ''
    };
  }
  excelChanges.value = changes;
  isExcelEditing.value = true;
}

function deleteSelectedExcelRows() {
  if (!selectedAccountIds.value.length) { alert('Select accounts to delete first using checkboxes.'); return; }
  if (!confirm(`Delete ${selectedAccountIds.value.length} selected account(s)?`)) return;
  const ids = [...selectedAccountIds.value];
  ids.forEach(id => { delete excelChanges.value[id]; });
  // Also remove from the accounts list locally
  accounts.value = accounts.value.filter(a => !ids.includes(a.id) && !ids.includes(a._id));
  selectedAccountIds.value = [];
}

function processExtractRows() {
  const text = extractText.value.trim();
  if (!text) return;
  const lines = text.split('\n').filter(l => l.trim());
  for (const line of lines) {
    const parts = line.split('\t');
    const name = (parts[0] || '').trim();
    if (!name) continue;
    const tempId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newAccount = {
      id: tempId,
      name,
      industry: (parts[1] || '').trim(),
      phone: (parts[2] || '').trim(),
      email: (parts[3] || '').trim(),
      assignedTo: (parts[4] || '').trim()
    };
    accounts.value.unshift(newAccount);
    excelChanges.value[tempId] = {
      name: newAccount.name,
      industry: newAccount.industry,
      phone: newAccount.phone,
      assignedTo: newAccount.assignedTo
    };
  }
  extractText.value = '';
  showExtractDialog.value = false;
}

async function saveExcelChanges() {
  savingExcel.value = true;
  const tenantId = getTenantId();
  let updated = 0;
  let failed = 0;
  const entries = Object.entries(excelChanges.value);
  if (!entries.length) { savingExcel.value = false; isExcelEditing.value = false; return; }
  for (const [id, changes] of entries) {
    try {
      const payload = {};
      if (changes.name !== undefined) payload.name = changes.name;
      if (changes.industry !== undefined) payload.industry = changes.industry;
      if (changes.phone !== undefined) payload.phone = changes.phone;
      if (changes.assignedTo !== undefined) payload.assignedTo = changes.assignedTo;
      if (id.startsWith('new-')) {
        const created = await createAccount({ ...payload, tenant_id: tenantId }, tenantId);
        const newId = created?.id || created?._id;
        if (newId) {
          const fieldStr = Object.entries(changes).filter(([,v]) => v !== '').map(([k,v]) => `${k.toUpperCase()}: "${v}"`).join('; ');
          const createChanges = Object.entries(changes).filter(([,v]) => v !== '').map(([k,v]) => ({ field: k.toUpperCase(), oldValue: '', newValue: String(v) }));
          logAccountActivity(newId, { tenant_id: tenantId, type: 'account:create', notes: 'Excel bulk create — ' + fieldStr, description: `Account created via Excel (${createChanges.length} field(s))`, metadata: { changes: createChanges }, performed_by: getUserEmail() || 'system' }).catch(() => {});
        }
      } else {
        await updateAccount(id, payload, tenantId);
        // Log changes
        const original = accounts.value.find(a => (a.id || a._id) === id);
        const diffs = [];
        const structChanges = [];
        if (original) {
          if (changes.name !== (original.name || '')) { diffs.push(`NAME: "${original.name || ''}" → "${changes.name}"`); structChanges.push({ field: 'Name', oldValue: original.name || '', newValue: changes.name }); }
          if (changes.industry !== (original.industry || '')) { diffs.push(`INDUSTRY: "${original.industry || ''}" → "${changes.industry}"`); structChanges.push({ field: 'Industry', oldValue: original.industry || '', newValue: changes.industry }); }
          if (changes.phone !== (original.phone || '')) { diffs.push(`PHONE: "${original.phone || ''}" → "${changes.phone}"`); structChanges.push({ field: 'Phone', oldValue: original.phone || '', newValue: changes.phone }); }
          if (changes.assignedTo !== (original.assignedTo || '')) { diffs.push(`ASSIGNED_TO: "${original.assignedTo || ''}" → "${changes.assignedTo}"`); structChanges.push({ field: 'Assigned To', oldValue: original.assignedTo || '', newValue: changes.assignedTo }); }
        }
        if (diffs.length) {
          logAccountActivity(id, { tenant_id: tenantId, type: 'account:update', notes: 'Excel bulk edit — ' + diffs.join('; '), description: `Excel edit — ${diffs.length} field(s) updated`, metadata: { changes: structChanges }, performed_by: getUserEmail() || 'system' }).catch(() => {});
        }
      }
      updated++;
    } catch (e) {
      console.warn(`[AccountsView] Failed to save account ${id}:`, e);
      failed++;
    }
  }
  isExcelEditing.value = false;
  excelChanges.value = {};
  savingExcel.value = false;
  if (failed > 0) alert(`Saved ${updated} of ${entries.length} accounts. ${failed} failed.`);
  if (updated > 0) {
    await loadAccounts();
    emit('crm:accounts:changed');
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          _cache[34] || (_cache[34] = createStaticVNode("<div class=\"flex items-center justify-between\" data-v-af2e0463><div class=\"flex items-center gap-2\" data-v-af2e0463><div class=\"h-4 w-40 bg-gray-200 rounded-sm\" data-v-af2e0463></div><div class=\"h-3 w-36 bg-gray-100 rounded-sm\" data-v-af2e0463></div></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\" data-v-af2e0463></div></div>", 1)),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                return createBaseVNode("div", {
                  key: i,
                  class: "h-24 bg-gray-100 rounded-sm"
                })
              }), 64))
            ]),
            _cache[32] || (_cache[32] = createBaseVNode("div", { class: "w-72 space-y-2" }, [
              createBaseVNode("div", { class: "h-10 bg-gray-100 rounded-sm" }),
              createBaseVNode("div", { class: "h-8 bg-gray-100 rounded-sm" })
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            (openBlock(), createElementBlock(Fragment, null, renderList(3, (col) => {
              return createBaseVNode("div", {
                key: col,
                class: "flex-1 space-y-2"
              }, [
                _cache[33] || (_cache[33] = createBaseVNode("div", { class: "h-6 bg-gray-200 rounded-sm" }, null, -1)),
                (openBlock(), createElementBlock(Fragment, null, renderList(3, (r) => {
                  return createBaseVNode("div", {
                    key: r,
                    class: "h-16 bg-gray-100 rounded-sm"
                  })
                }), 64))
              ])
            }), 64))
          ])
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_6$1, [
      createBaseVNode("div", {
        class: "px-3 sm:px-4 py-2 flex items-center justify-between bg-gray-50/50 cursor-pointer select-none",
        onClick: _cache[2] || (_cache[2] = $event => (isAccountsSectionVisible.value = !isAccountsSectionVisible.value))
      }, [
        _cache[40] || (_cache[40] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
          createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
          createBaseVNode("h3", { class: "text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono" }, "Account_Registry")
        ], -1)),
        createBaseVNode("div", _hoisted_7$1, [
          createBaseVNode("button", {
            onClick: withModifiers(openBulkUpload, ["stop"]),
            class: "px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm"
          }, [
            createVNode(unref(Download), { size: 10 }),
            _cache[35] || (_cache[35] = createTextVNode(" Bulk Import ", -1))
          ]),
          _cache[38] || (_cache[38] = createTextVNode()),
          createBaseVNode("button", {
            onClick: withModifiers(handleExportAccounts, ["stop"]),
            class: "px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-500 transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm"
          }, [
            createVNode(unref(Download), { size: 10 }),
            _cache[36] || (_cache[36] = createTextVNode(" Export ", -1))
          ]),
          createBaseVNode("button", {
            onClick: withModifiers(toggleExcelEdit, ["stop"]),
            disabled: savingExcel.value,
            class: normalizeClass(["px-3 py-1.5 border transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] tracking-widest rounded-sm", isExcelEditing.value ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 disabled:opacity-50' : 'border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-500'])
          }, [
            (savingExcel.value)
              ? (openBlock(), createBlock(unref(LoaderCircle), {
                  key: 0,
                  size: 10,
                  class: "animate-spin"
                }))
              : (openBlock(), createBlock(unref(FileSpreadsheet), {
                  key: 1,
                  size: 10
                })),
            createTextVNode(" " + toDisplayString(savingExcel.value ? 'Saving...' : (isExcelEditing.value ? 'Save All' : 'Excel Edit')), 1)
          ], 10, _hoisted_8$1),
          createBaseVNode("input", {
            ref_key: "excelImportRef",
            ref: excelImportRef,
            type: "file",
            accept: ".xlsx,.xls",
            class: "hidden",
            onChange: _cache[0] || (_cache[0] = (...args) => (_ctx.onExcelImport && _ctx.onExcelImport(...args)))
          }, null, 544),
          _cache[39] || (_cache[39] = createTextVNode()),
          createBaseVNode("button", {
            onClick: withModifiers(openCreateModal, ["stop"]),
            class: "px-3 py-1.5 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-1.5 font-mono font-bold uppercase text-[8px] rounded-sm tracking-widest"
          }, [
            createVNode(unref(Plus), { size: 10 }),
            _cache[37] || (_cache[37] = createTextVNode(" Add_Account ", -1))
          ]),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers($event => (isAccountsSectionVisible.value = !isAccountsSectionVisible.value), ["stop"])),
            class: normalizeClass(["flex items-center gap-1.5 px-2 py-1 rounded-sm text-[8px] font-mono font-bold uppercase tracking-widest transition border hover:bg-gray-100", isAccountsSectionVisible.value ? 'text-gray-500 border-gray-200' : 'text-[#2F2E8B] border-indigo-200 bg-indigo-50/50'])
          }, [
            (isAccountsSectionVisible.value)
              ? (openBlock(), createBlock(unref(Eye), {
                  key: 0,
                  size: 12
                }))
              : (openBlock(), createBlock(unref(EyeOff), {
                  key: 1,
                  size: 12
                })),
            createTextVNode(" " + toDisplayString(isAccountsSectionVisible.value ? 'Hide' : 'Show'), 1)
          ], 2)
        ])
      ]),
      withDirectives(createBaseVNode("div", _hoisted_9$1, [
        createBaseVNode("div", _hoisted_10$1, [
          createBaseVNode("div", _hoisted_11$1, [
            createBaseVNode("div", _hoisted_12$1, [
              createBaseVNode("p", _hoisted_13$1, [
                _cache[41] || (_cache[41] = createTextVNode(" Total: ", -1)),
                createBaseVNode("span", _hoisted_14$1, toDisplayString(totalAccounts.value), 1),
                (totalAccounts.value > 0)
                  ? (openBlock(), createElementBlock("span", _hoisted_15$1, " // " + toDisplayString(pageStart.value) + "-" + toDisplayString(pageEnd.value), 1))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_16$1, [
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    _cache[42] || (_cache[42] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-white/60 uppercase tracking-[0.15em]" }, "Total", -1)),
                    createVNode(unref(Building), {
                      size: 9,
                      class: "text-white/40"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_20, toDisplayString(stats.value.total), 1),
                  _cache[43] || (_cache[43] = createBaseVNode("div", { class: "text-[6px] font-mono text-white/50 uppercase tracking-widest" }, "Active", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("div", _hoisted_22, [
                  createBaseVNode("div", _hoisted_23, [
                    _cache[44] || (_cache[44] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "Contacts", -1)),
                    createVNode(unref(Users), {
                      size: 9,
                      class: "text-purple-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_24, toDisplayString(stats.value.withContacts), 1),
                  _cache[45] || (_cache[45] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Linked", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("div", _hoisted_27, [
                    _cache[46] || (_cache[46] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "From Leads", -1)),
                    createVNode(unref(ArrowRightLeft), {
                      size: 9,
                      class: "text-emerald-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_28, toDisplayString(stats.value.converted), 1),
                  _cache[47] || (_cache[47] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Converted", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_29, [
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("div", _hoisted_31, [
                    _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "This Month", -1)),
                    createVNode(unref(CalendarPlus), {
                      size: 9,
                      class: "text-orange-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_32, toDisplayString(stats.value.thisMonth), 1),
                  _cache[49] || (_cache[49] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Recent", -1))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_33, [
              createBaseVNode("div", _hoisted_34, [
                createBaseVNode("div", _hoisted_35, [
                  createBaseVNode("div", _hoisted_36, [
                    _cache[50] || (_cache[50] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "Deal Values", -1)),
                    createVNode(unref(TrendingUp), {
                      size: 9,
                      class: "text-blue-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_37, toDisplayString(formatMoney(kpiPipelineValue.value)), 1),
                  _cache[51] || (_cache[51] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Pipeline", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_38, [
                createBaseVNode("div", _hoisted_39, [
                  createBaseVNode("div", _hoisted_40, [
                    _cache[52] || (_cache[52] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "Won Revenue", -1)),
                    createVNode(unref(DollarSign), {
                      size: 9,
                      class: "text-emerald-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_41, toDisplayString(formatMoney(kpiWonRevenue.value)), 1),
                  _cache[53] || (_cache[53] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Closed-Won", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_42, [
                createBaseVNode("div", _hoisted_43, [
                  createBaseVNode("div", _hoisted_44, [
                    _cache[54] || (_cache[54] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "CAC", -1)),
                    createVNode(unref(Target), {
                      size: 9,
                      class: "text-purple-400"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_45, toDisplayString(formatMoney(kpiCAC.value)), 1),
                  _cache[55] || (_cache[55] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Avg/Won", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_46, [
                createBaseVNode("div", _hoisted_47, [
                  createBaseVNode("div", _hoisted_48, [
                    _cache[56] || (_cache[56] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-700 uppercase tracking-[0.15em]" }, "Maintenance", -1)),
                    createVNode(unref(TriangleAlert), {
                      size: 9,
                      class: "text-red-300"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_49, toDisplayString(kpiMaintenance.value), 1),
                  _cache[57] || (_cache[57] = createBaseVNode("div", { class: "text-[6px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Cancelled", -1))
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_50, [
            createBaseVNode("div", _hoisted_51, [
              createBaseVNode("div", _hoisted_52, [
                createBaseVNode("div", _hoisted_53, [
                  createVNode(unref(Search), {
                    size: 10,
                    class: "absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  }),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((searchQuery).value = $event)),
                    onInput: debouncedSearch,
                    type: "text",
                    placeholder: "SEARCH...",
                    class: "w-full border border-gray-200 pl-7 pr-2 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none transition-all"
                  }, null, 544), [
                    [vModelText, searchQuery.value]
                  ])
                ]),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((industryFilter).value = $event)),
                  onChange: loadAccounts,
                  class: "border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
                }, [...(_cache[58] || (_cache[58] = [
                  createStaticVNode("<option value=\"\" data-v-af2e0463>Industry</option><option value=\"technology\" data-v-af2e0463>TECH</option><option value=\"healthcare\" data-v-af2e0463>HEALTH</option><option value=\"finance\" data-v-af2e0463>FINANCE</option><option value=\"retail\" data-v-af2e0463>RETAIL</option><option value=\"manufacturing\" data-v-af2e0463>MFG</option><option value=\"education\" data-v-af2e0463>EDU</option><option value=\"other\" data-v-af2e0463>OTHER</option>", 8)
                ]))], 544), [
                  [vModelSelect, industryFilter.value]
                ]),
                createBaseVNode("div", _hoisted_54, [
                  createBaseVNode("button", {
                    onClick: _cache[5] || (_cache[5] = $event => (viewMode.value = 'grid')),
                    class: normalizeClass([viewMode.value === 'grid' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]', "w-6 h-6 border rounded-sm flex items-center justify-center transition"])
                  }, [
                    createVNode(unref(LayoutGrid), { size: 8 })
                  ], 2),
                  createBaseVNode("button", {
                    onClick: _cache[6] || (_cache[6] = $event => (viewMode.value = 'list')),
                    class: normalizeClass([viewMode.value === 'list' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]', "w-6 h-6 border rounded-sm flex items-center justify-center transition"])
                  }, [
                    createVNode(unref(List), { size: 8 })
                  ], 2)
                ])
              ]),
              createBaseVNode("div", _hoisted_55, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((statusFilter).value = $event)),
                  onChange: loadAccounts,
                  class: "border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all"
                }, [...(_cache[59] || (_cache[59] = [
                  createBaseVNode("option", { value: "" }, "Status", -1),
                  createBaseVNode("option", { value: "active" }, "ACTIVE", -1),
                  createBaseVNode("option", { value: "inactive" }, "INACTIVE", -1),
                  createBaseVNode("option", { value: "lead" }, "FROM LEAD", -1)
                ]))], 544), [
                  [vModelSelect, statusFilter.value]
                ]),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((assigneeFilter).value = $event)),
                  onChange: loadAccounts,
                  class: "border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white hover:bg-gray-50 transition-all max-w-[90px]"
                }, [
                  _cache[60] || (_cache[60] = createBaseVNode("option", { value: "" }, "Assignee", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.users, (user) => {
                    return (openBlock(), createElementBlock("option", {
                      key: user.email,
                      value: user.email.toLowerCase()
                    }, toDisplayString((user.name || user.email.split('@')[0]).toUpperCase()), 9, _hoisted_56))
                  }), 128))
                ], 544), [
                  [vModelSelect, assigneeFilter.value]
                ]),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((dateFromFilter).value = $event)),
                  type: "date",
                  onChange: loadAccounts,
                  class: "border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white w-[100px]"
                }, null, 544), [
                  [vModelText, dateFromFilter.value]
                ]),
                _cache[62] || (_cache[62] = createBaseVNode("span", { class: "text-[7px] font-mono text-gray-400" }, "→", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((dateToFilter).value = $event)),
                  type: "date",
                  onChange: loadAccounts,
                  class: "border border-gray-200 px-2 py-1.5 text-[7px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B]/30 outline-none bg-white w-[100px]"
                }, null, 544), [
                  [vModelText, dateToFilter.value]
                ]),
                (searchQuery.value || industryFilter.value || statusFilter.value || assigneeFilter.value || dateFromFilter.value || dateToFilter.value)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: resetFilters,
                      class: "px-2 py-1.5 border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-[#2F2E8B] hover:border-indigo-200 text-[7px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1 rounded-sm"
                    }, [
                      createVNode(unref(Trash2), { size: 8 }),
                      _cache[61] || (_cache[61] = createTextVNode(" Clear ", -1))
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_57, [
                createBaseVNode("div", _hoisted_58, [
                  _cache[64] || (_cache[64] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase" }, "Rows:", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((perPage).value = $event)),
                    onChange: _cache[12] || (_cache[12] = $event => {currentPage.value = 1; loadAccounts();}),
                    class: "border border-gray-200 px-1 py-0.5 text-[7px] font-mono font-bold focus:outline-none focus:border-[#2F2E8B] bg-white"
                  }, [...(_cache[63] || (_cache[63] = [
                    createBaseVNode("option", { value: 10 }, "10", -1),
                    createBaseVNode("option", { value: 25 }, "25", -1),
                    createBaseVNode("option", { value: 50 }, "50", -1),
                    createBaseVNode("option", { value: 100 }, "100", -1),
                    createBaseVNode("option", { value: 10000 }, "All", -1)
                  ]))], 544), [
                    [
                      vModelSelect,
                      perPage.value,
                      void 0,
                      { number: true }
                    ]
                  ])
                ]),
                (selectedAccountIds.value.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_59, [
                      createBaseVNode("span", _hoisted_60, toDisplayString(selectedAccountIds.value.length) + " sel", 1),
                      createBaseVNode("button", {
                        onClick: openBulkAssign,
                        disabled: bulkProcessing.value,
                        class: "px-2 py-1 border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white transition flex items-center gap-1 font-mono font-bold uppercase text-[6px] tracking-widest rounded-sm"
                      }, [
                        createVNode(unref(Users), { size: 8 }),
                        _cache[65] || (_cache[65] = createTextVNode(" Assign ", -1))
                      ], 8, _hoisted_61),
                      createBaseVNode("button", {
                        onClick: bulkDeleteAccounts,
                        disabled: bulkProcessing.value,
                        class: "px-2 py-1 border border-red-400 text-red-500 hover:bg-red-600 hover:text-white transition flex items-center gap-1 font-mono font-bold uppercase text-[6px] tracking-widest rounded-sm"
                      }, [
                        createVNode(unref(Trash2), { size: 8 }),
                        _cache[66] || (_cache[66] = createTextVNode(" Delete ", -1))
                      ], 8, _hoisted_62),
                      createBaseVNode("button", {
                        onClick: clearSelection,
                        class: "text-[6px] font-mono font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest underline"
                      }, "Clear")
                    ]))
                  : createCommentVNode("", true)
              ])
            ])
          ])
        ])
      ], 512), [
        [vShow, isAccountsSectionVisible.value]
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showBulkAssignModal.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm",
            onClick: _cache[15] || (_cache[15] = withModifiers($event => (showBulkAssignModal.value = false), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_63, [
              _cache[70] || (_cache[70] = createBaseVNode("div", { class: "h-1.5 w-full bg-gradient-to-r from-[#2F2E8B] to-blue-500" }, null, -1)),
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("div", _hoisted_65, [
                  createBaseVNode("div", _hoisted_66, [
                    createVNode(unref(Users), {
                      size: 16,
                      class: "text-[#2F2E8B]"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_67, [
                    _cache[68] || (_cache[68] = createBaseVNode("p", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5" }, "Bulk Assignment", -1)),
                    createBaseVNode("h3", _hoisted_68, "Assign " + toDisplayString(selectedAccountIds.value.length) + " Account" + toDisplayString(selectedAccountIds.value.length !== 1 ? 's' : ''), 1),
                    _cache[69] || (_cache[69] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-500 mb-3" }, "Select a team member to assign all selected accounts to.", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((bulkAssignTarget).value = $event)),
                      class: "w-full border border-gray-200 px-3 py-2.5 text-[10px] font-mono font-bold uppercase focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 bg-white transition-all"
                    }, [
                      _cache[67] || (_cache[67] = createBaseVNode("option", { value: "" }, "Choose assignee...", -1)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.users, (user) => {
                        return (openBlock(), createElementBlock("option", {
                          key: user.email,
                          value: user.email
                        }, toDisplayString((user.name || user.email).toUpperCase()), 9, _hoisted_69))
                      }), 128))
                    ], 512), [
                      [vModelSelect, bulkAssignTarget.value]
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_70, [
                createBaseVNode("button", {
                  onClick: _cache[14] || (_cache[14] = $event => (showBulkAssignModal.value = false)),
                  class: "px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition rounded-sm"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: confirmBulkAssign,
                  disabled: !bulkAssignTarget.value || bulkProcessing.value,
                  class: "px-5 py-2 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition disabled:opacity-50 flex items-center gap-2 rounded-sm shadow-none"
                }, [
                  (bulkProcessing.value)
                    ? (openBlock(), createBlock(unref(LoaderCircle), {
                        key: 0,
                        size: 11,
                        class: "animate-spin"
                      }))
                    : (openBlock(), createBlock(unref(UserPlus), {
                        key: 1,
                        size: 12
                      })),
                  createTextVNode(" " + toDisplayString(bulkProcessing.value ? 'Assigning...' : 'Confirm Assign'), 1)
                ], 8, _hoisted_71)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (!loading.value && accounts.value.length === 0)
      ? (openBlock(), createElementBlock("div", _hoisted_72, [
          _cache[73] || (_cache[73] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
          createBaseVNode("div", _hoisted_73, [
            createVNode(unref(Building), {
              size: 48,
              class: "text-gray-200 mx-auto mb-4"
            }),
            _cache[72] || (_cache[72] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "No_Accounts_Found", -1)),
            createBaseVNode("p", _hoisted_74, toDisplayString(searchQuery.value ? 'TRY_ADJUSTING_FILTERS' : 'REGISTRY_EMPTY'), 1),
            (!searchQuery.value)
              ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: openCreateModal,
                  class: "px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2 mx-auto"
                }, [
                  createVNode(unref(Plus), { size: 12 }),
                  _cache[71] || (_cache[71] = createTextVNode(" Add_First_Account ", -1))
                ]))
              : createCommentVNode("", true)
          ])
        ]))
      : createCommentVNode("", true),
    (!loading.value && accounts.value.length > 0 && viewMode.value === 'grid')
      ? (openBlock(), createElementBlock("div", _hoisted_75, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(accounts.value, (account) => {
            return (openBlock(), createElementBlock("div", {
              key: account.id,
              onClick: $event => (viewAccount(account)),
              class: "bg-white border border-gray-200 rounded-sm hover:border-[#2F2E8B]/50 hover:shadow-none transition cursor-pointer relative overflow-hidden group"
            }, [
              createBaseVNode("div", _hoisted_77, [
                createBaseVNode("div", _hoisted_78, [
                  createBaseVNode("div", _hoisted_79, toDisplayString(getInitials(account.name)), 1),
                  createBaseVNode("div", _hoisted_80, [
                    createBaseVNode("h4", _hoisted_81, toDisplayString(account.name), 1),
                    (account.industry)
                      ? (openBlock(), createElementBlock("p", _hoisted_82, toDisplayString(account.industry), 1))
                      : createCommentVNode("", true)
                  ])
                ]),
                (account.isConverted)
                  ? (openBlock(), createElementBlock("span", _hoisted_83, " Converted "))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_84, [
                (account.phone)
                  ? (openBlock(), createElementBlock("div", _hoisted_85, [
                      createVNode(unref(Phone), {
                        size: 8,
                        class: "text-[#2F2E8B] flex-shrink-0"
                      }),
                      createBaseVNode("span", null, toDisplayString(account.phone), 1)
                    ]))
                  : createCommentVNode("", true),
                (account.email)
                  ? (openBlock(), createElementBlock("div", _hoisted_86, [
                      createVNode(unref(Mail), {
                        size: 8,
                        class: "text-[#2F2E8B] flex-shrink-0"
                      }),
                      createBaseVNode("span", _hoisted_87, toDisplayString(account.email), 1)
                    ]))
                  : createCommentVNode("", true),
                (account.billingCity || account.billingCountry)
                  ? (openBlock(), createElementBlock("div", _hoisted_88, [
                      createVNode(unref(MapPin), {
                        size: 8,
                        class: "text-[#2F2E8B] flex-shrink-0"
                      }),
                      createBaseVNode("span", _hoisted_89, toDisplayString(formatLocation(account)), 1)
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_90, [
                createBaseVNode("div", _hoisted_91, [
                  createVNode(unref(Users), { size: 7 }),
                  createBaseVNode("span", null, toDisplayString(getAccountContactCount(account)), 1),
                  _cache[74] || (_cache[74] = createBaseVNode("span", { class: "text-gray-300" }, "|", -1)),
                  createVNode(unref(Calendar), { size: 7 }),
                  createBaseVNode("span", null, toDisplayString(formatDate(account.createdAt)), 1)
                ]),
                createBaseVNode("div", {
                  class: "flex items-center gap-0.5",
                  onClick: _cache[16] || (_cache[16] = withModifiers(() => {}, ["stop"]))
                }, [
                  createBaseVNode("button", {
                    onClick: withModifiers($event => (viewAccount(account)), ["stop"]),
                    class: "w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-[#2F2E8B] text-gray-400 hover:text-[#2F2E8B] transition",
                    title: "View"
                  }, [
                    createVNode(unref(Eye), { size: 7 })
                  ], 8, _hoisted_92),
                  createBaseVNode("button", {
                    onClick: withModifiers($event => (editAccount(account)), ["stop"]),
                    class: "w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-orange-500 text-gray-400 hover:text-orange-500 transition",
                    title: "Edit"
                  }, [
                    createVNode(unref(Pencil), { size: 7 })
                  ], 8, _hoisted_93),
                  createBaseVNode("button", {
                    onClick: withModifiers($event => (deleteAccount$1(account)), ["stop"]),
                    class: "w-5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded-sm hover:border-red-500 text-gray-400 hover:text-red-500 transition",
                    title: "Delete"
                  }, [
                    createVNode(unref(Trash2), { size: 7 })
                  ], 8, _hoisted_94)
                ])
              ])
            ], 8, _hoisted_76))
          }), 128))
        ]))
      : createCommentVNode("", true),
    (!loading.value && accounts.value.length > 0 && viewMode.value !== 'grid')
      ? (openBlock(), createElementBlock("div", _hoisted_95, [
          (isExcelEditing.value)
            ? (openBlock(), createElementBlock("div", _hoisted_96, [
                createBaseVNode("div", _hoisted_97, [
                  createVNode(unref(FileSpreadsheet), {
                    size: 14,
                    class: "text-orange-500"
                  }),
                  createBaseVNode("span", null, [
                    _cache[75] || (_cache[75] = createTextVNode("Spreadsheet Edit — ", -1)),
                    createBaseVNode("span", _hoisted_98, toDisplayString(Object.keys(excelChanges.value).length), 1),
                    _cache[76] || (_cache[76] = createTextVNode(" rows", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_99, [
                  createBaseVNode("button", {
                    onClick: deleteSelectedExcelRows,
                    class: "px-2 py-1 border border-red-300 text-red-600 hover:bg-red-50 text-[8px] font-mono font-black uppercase tracking-widest rounded-sm transition flex items-center gap-1"
                  }, [
                    createVNode(unref(Trash2), { size: 10 }),
                    _cache[77] || (_cache[77] = createTextVNode(" Delete ", -1))
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[17] || (_cache[17] = $event => (showExtractDialog.value = true)),
                    class: "px-2 py-1 border border-blue-300 text-blue-600 hover:bg-blue-50 text-[8px] font-mono font-black uppercase tracking-widest rounded-sm transition flex items-center gap-1"
                  }, [
                    createVNode(unref(FileSpreadsheet), { size: 10 }),
                    _cache[78] || (_cache[78] = createTextVNode(" Extract Rows ", -1))
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_100, [
            createBaseVNode("table", _hoisted_101, [
              createBaseVNode("thead", _hoisted_102, [
                createBaseVNode("tr", null, [
                  createBaseVNode("th", _hoisted_103, [
                    createBaseVNode("div", _hoisted_104, [
                      withDirectives(createBaseVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((allSelected).value = $event)),
                        class: "rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer"
                      }, null, 512), [
                        [vModelCheckbox, allSelected.value]
                      ])
                    ])
                  ]),
                  _cache[79] || (_cache[79] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Account", -1)),
                  _cache[80] || (_cache[80] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Industry", -1)),
                  _cache[81] || (_cache[81] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Phone", -1)),
                  _cache[82] || (_cache[82] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Location", -1)),
                  _cache[83] || (_cache[83] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Contacts", -1)),
                  _cache[84] || (_cache[84] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Assignee", -1)),
                  _cache[85] || (_cache[85] = createBaseVNode("th", { class: "px-2.5 py-2 text-left text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Created", -1)),
                  _cache[86] || (_cache[86] = createBaseVNode("th", { class: "px-2.5 py-2 text-right text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]" }, "Actions", -1))
                ])
              ]),
              createBaseVNode("tbody", _hoisted_105, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(accounts.value, (account) => {
                  return (openBlock(), createElementBlock("tr", {
                    key: account.id || account._id,
                    onClick: $event => (isExcelEditing.value ? null : viewAccount(account)),
                    class: normalizeClass(["hover:bg-gray-50/50 transition-colors group", { 'cursor-pointer': !isExcelEditing.value, 'bg-orange-50/20': isExcelEditing.value }])
                  }, [
                    createBaseVNode("td", _hoisted_107, [
                      createBaseVNode("div", _hoisted_108, [
                        createBaseVNode("input", {
                          type: "checkbox",
                          checked: selectedAccountIds.value.includes(account.id),
                          onClick: withModifiers($event => (toggleAccountSelection(account.id)), ["stop"]),
                          class: "rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] w-3 h-3 cursor-pointer"
                        }, null, 8, _hoisted_109)
                      ])
                    ]),
                    createBaseVNode("td", {
                      class: normalizeClass(["px-2.5 py-2 whitespace-nowrap", { 'py-3': isExcelEditing.value }])
                    }, [
                      createBaseVNode("div", _hoisted_110, [
                        createBaseVNode("div", _hoisted_111, [
                          createBaseVNode("div", _hoisted_112, toDisplayString(getInitials(account.name)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          (isExcelEditing.value)
                            ? (openBlock(), createElementBlock("input", {
                                key: 0,
                                value: getExcelValue(account, 'name'),
                                onInput: $event => (setExcelValue(account, 'name', $event.target.value)),
                                onClick: _cache[19] || (_cache[19] = withModifiers(() => {}, ["stop"])),
                                class: "w-56 px-3 py-2 text-sm font-mono font-bold text-gray-900 uppercase border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md"
                              }, null, 40, _hoisted_113))
                            : (openBlock(), createElementBlock("div", _hoisted_114, toDisplayString(account.name), 1)),
                          (account.isConverted)
                            ? (openBlock(), createElementBlock("div", _hoisted_115, "Converted from Lead"))
                            : createCommentVNode("", true)
                        ])
                      ])
                    ], 2),
                    createBaseVNode("td", {
                      class: normalizeClass(["px-2.5 py-2 whitespace-nowrap", { 'py-3': isExcelEditing.value }])
                    }, [
                      (isExcelEditing.value)
                        ? (openBlock(), createElementBlock("input", {
                            key: 0,
                            value: getExcelValue(account, 'industry'),
                            onInput: $event => (setExcelValue(account, 'industry', $event.target.value)),
                            onClick: _cache[20] || (_cache[20] = withModifiers(() => {}, ["stop"])),
                            class: "w-40 px-3 py-2 text-sm font-mono font-bold text-gray-700 capitalize border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md"
                          }, null, 40, _hoisted_116))
                        : (openBlock(), createElementBlock("span", _hoisted_117, toDisplayString(account.industry || '—'), 1))
                    ], 2),
                    createBaseVNode("td", {
                      class: normalizeClass(["px-2.5 py-2 whitespace-nowrap", { 'py-3': isExcelEditing.value }])
                    }, [
                      (isExcelEditing.value)
                        ? (openBlock(), createElementBlock("input", {
                            key: 0,
                            value: getExcelValue(account, 'phone'),
                            onInput: $event => (setExcelValue(account, 'phone', $event.target.value)),
                            onClick: _cache[21] || (_cache[21] = withModifiers(() => {}, ["stop"])),
                            class: "w-44 px-3 py-2 text-sm font-mono font-bold text-gray-800 border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md"
                          }, null, 40, _hoisted_118))
                        : (openBlock(), createElementBlock("span", _hoisted_119, toDisplayString(account.phone || '—'), 1))
                    ], 2),
                    createBaseVNode("td", _hoisted_120, toDisplayString(formatLocation(account)), 1),
                    createBaseVNode("td", _hoisted_121, toDisplayString(getAccountContactCount(account)), 1),
                    createBaseVNode("td", {
                      class: normalizeClass(["px-2.5 py-2 whitespace-nowrap", { 'py-3': isExcelEditing.value }])
                    }, [
                      createBaseVNode("div", _hoisted_122, [
                        (isExcelEditing.value)
                          ? (openBlock(), createElementBlock("input", {
                              key: 0,
                              value: getExcelValue(account, 'assignedTo'),
                              onInput: $event => (setExcelValue(account, 'assignedTo', $event.target.value)),
                              onClick: _cache[22] || (_cache[22] = withModifiers(() => {}, ["stop"])),
                              class: "w-36 px-3 py-2 text-sm font-mono font-bold border-2 border-orange-400 bg-orange-50 focus:outline-none focus:border-orange-600 focus:bg-white focus:shadow-md rounded-md",
                              placeholder: "Email"
                            }, null, 40, _hoisted_123))
                          : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", _hoisted_124, toDisplayString(account.assignedTo ? account.assignedTo.charAt(0).toUpperCase() : '?'), 1),
                              createBaseVNode("span", _hoisted_125, toDisplayString(account.assignedTo ? account.assignedTo.split('@')[0] : '—'), 1)
                            ], 64))
                      ])
                    ], 2),
                    createBaseVNode("td", _hoisted_126, toDisplayString(formatDate(account.createdAt)), 1),
                    createBaseVNode("td", _hoisted_127, [
                      createBaseVNode("div", {
                        class: "flex items-center justify-end gap-0.5",
                        onClick: _cache[23] || (_cache[23] = withModifiers(() => {}, ["stop"]))
                      }, [
                        createBaseVNode("button", {
                          onClick: withModifiers($event => (viewAccount(account)), ["stop"]),
                          class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] rounded-sm transition-all",
                          title: "View"
                        }, [
                          createVNode(unref(Eye), { size: 10 })
                        ], 8, _hoisted_128),
                        createBaseVNode("button", {
                          onClick: withModifiers($event => (editAccount(account)), ["stop"]),
                          class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 rounded-sm transition-all",
                          title: "Edit"
                        }, [
                          createVNode(unref(Pencil), { size: 10 })
                        ], 8, _hoisted_129),
                        createBaseVNode("button", {
                          onClick: withModifiers($event => (deleteAccount$1(account)), ["stop"]),
                          class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all",
                          title: "Delete"
                        }, [
                          createVNode(unref(Trash2), { size: 10 })
                        ], 8, _hoisted_130)
                      ])
                    ])
                  ], 10, _hoisted_106))
                }), 128))
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true),
    (accounts.value.length > 0 && totalPages.value > 1)
      ? (openBlock(), createElementBlock("div", _hoisted_131, [
          createBaseVNode("span", _hoisted_132, toDisplayString((currentPage.value - 1) * perPage.value + 1) + "–" + toDisplayString(Math.min(currentPage.value * perPage.value, totalAccounts.value)) + " of " + toDisplayString(totalAccounts.value) + "_Accounts ", 1),
          createBaseVNode("div", _hoisted_133, [
            createBaseVNode("button", {
              onClick: _cache[24] || (_cache[24] = $event => (goToPage(1))),
              disabled: currentPage.value === 1,
              class: "px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
            }, " « ", 8, _hoisted_134),
            createBaseVNode("button", {
              onClick: previousPage,
              disabled: currentPage.value === 1,
              class: "px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
            }, [
              createVNode(unref(ChevronLeft), { size: 10 }),
              _cache[87] || (_cache[87] = createTextVNode(" Prev ", -1))
            ], 8, _hoisted_135),
            (openBlock(true), createElementBlock(Fragment, null, renderList(visiblePages.value, (p) => {
              return (openBlock(), createElementBlock(Fragment, { key: p }, [
                (p === '...')
                  ? (openBlock(), createElementBlock("span", _hoisted_136, "…"))
                  : (openBlock(), createElementBlock("button", {
                      key: 1,
                      onClick: $event => (goToPage(p)),
                      class: normalizeClass(["w-7 h-7 border text-[9px] font-mono font-black transition-all", p === currentPage.value ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'])
                    }, toDisplayString(p), 11, _hoisted_137))
              ], 64))
            }), 128)),
            createBaseVNode("button", {
              onClick: nextPage,
              disabled: currentPage.value === totalPages.value,
              class: "px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
            }, [
              _cache[88] || (_cache[88] = createTextVNode(" Next ", -1)),
              createVNode(unref(ChevronRight), { size: 10 })
            ], 8, _hoisted_138),
            createBaseVNode("button", {
              onClick: _cache[25] || (_cache[25] = $event => (goToPage(totalPages.value))),
              disabled: currentPage.value === totalPages.value,
              class: "px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
            }, " » ", 8, _hoisted_139)
          ])
        ]))
      : createCommentVNode("", true),
    createVNode(AccountDetailModal, {
      modelValue: showDetailModal.value,
      "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => ((showDetailModal).value = $event)),
      account: selectedAccount.value,
      users: __props.users,
      onEdit: handleEdit,
      onDelete: handleDelete,
      onArchive: handleArchive,
      onRefresh: loadAccounts
    }, null, 8, ["modelValue", "account", "users"]),
    createVNode(AccountFormModal, {
      modelValue: showFormModal.value,
      "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => ((showFormModal).value = $event)),
      account: accountToEdit.value,
      users: __props.users,
      onSaved: handleSaved
    }, null, 8, ["modelValue", "account", "users"]),
    createVNode(_sfc_main$2, {
      modelValue: showBulkUploadModal.value,
      "onUpdate:modelValue": _cache[28] || (_cache[28] = $event => ((showBulkUploadModal).value = $event)),
      "branch-id": safeBranchId.value,
      onImported: handleBulkImportComplete
    }, null, 8, ["modelValue", "branch-id"]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showDeleteConfirm.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm",
            onClick: withModifiers(closeDeleteConfirm, ["self"])
          }, [
            createBaseVNode("div", _hoisted_140, [
              _cache[91] || (_cache[91] = createBaseVNode("div", { class: "h-1.5 w-full bg-red-600" }, null, -1)),
              createBaseVNode("div", _hoisted_141, [
                createBaseVNode("div", _hoisted_142, [
                  createBaseVNode("div", _hoisted_143, [
                    createVNode(unref(Trash2), {
                      size: 16,
                      class: "text-red-600"
                    })
                  ]),
                  createBaseVNode("div", null, [
                    _cache[89] || (_cache[89] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Irreversible Action", -1)),
                    createBaseVNode("p", _hoisted_144, "Delete \"" + toDisplayString(accountToDelete.value?.name || 'this account') + "\"?", 1),
                    _cache[90] || (_cache[90] = createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-2 font-mono leading-relaxed" }, "This action cannot be undone. Linked contacts and activity history remain referenced in CRM records.", -1))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_145, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: closeDeleteConfirm,
                  disabled: deleteLoading.value,
                  class: "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                }, " Cancel ", 8, _hoisted_146),
                createBaseVNode("button", {
                  type: "button",
                  onClick: confirmDelete,
                  disabled: deleteLoading.value,
                  class: "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
                }, [
                  (deleteLoading.value)
                    ? (openBlock(), createElementBlock("i", _hoisted_148))
                    : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(deleteLoading.value ? 'Deleting...' : 'Delete'), 1)
                ], 8, _hoisted_147)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showExtractDialog.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm",
            onClick: _cache[31] || (_cache[31] = withModifiers($event => (showExtractDialog.value = false), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_149, [
              _cache[93] || (_cache[93] = createBaseVNode("div", { class: "h-1.5 w-full bg-blue-500" }, null, -1)),
              createBaseVNode("div", _hoisted_150, [
                createBaseVNode("div", _hoisted_151, [
                  createBaseVNode("div", _hoisted_152, [
                    createVNode(unref(FileSpreadsheet), {
                      size: 18,
                      class: "text-blue-500"
                    })
                  ]),
                  _cache[92] || (_cache[92] = createBaseVNode("div", null, [
                    createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5" }, "Extract Rows"),
                    createBaseVNode("p", { class: "text-sm font-semibold text-gray-800" }, "Paste tab-separated data to add new rows")
                  ], -1))
                ]),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => ((extractText).value = $event)),
                  rows: "8",
                  placeholder: "Paste data here (tab-separated)\nFormat: Name, Industry, Phone, Email, Assignee\nExample:\nAcme Corp\tTechnology\t+260977...\tinfo@acme.com\tuser@email.com\nGlobex Inc\tFinance\t+260955...\tceo@globex.com\tadmin@email.com",
                  class: "w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-[12px] font-mono text-gray-700 outline-none focus:border-blue-500 focus:bg-blue-50/30 resize-none rounded-sm transition-colors"
                }, null, 512), [
                  [vModelText, extractText.value]
                ]),
                createBaseVNode("div", _hoisted_153, [
                  createBaseVNode("button", {
                    onClick: _cache[30] || (_cache[30] = $event => (showExtractDialog.value = false)),
                    class: "px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-sm"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    onClick: processExtractRows,
                    disabled: !extractText.value.trim(),
                    class: "px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm"
                  }, [
                    createVNode(unref(Plus), { size: 12 }),
                    createTextVNode(" Add " + toDisplayString(extractRowCount.value) + " Row" + toDisplayString(extractRowCount.value !== 1 ? 's' : ''), 1)
                  ], 8, _hoisted_154)
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ]))
}
}

};
const AccountsView = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-af2e0463"]]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative blur-scoped" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = ["value"];
const _hoisted_7 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider" };
const _hoisted_8 = { class: "bg-white border-b border-gray-100 sticky top-16 z-20 blur-scoped" };
const _hoisted_9 = { class: "px-4 sm:px-6 lg:px-8" };
const _hoisted_10 = { class: "flex items-center gap-0" };
const _hoisted_11 = { class: "flex-1 w-full relative z-10 pb-40 blur-scoped" };
const _hoisted_12 = { class: "px-4 sm:px-6 lg:px-8 py-6 relative" };
const _hoisted_13 = {
  key: 0,
  class: "space-y-4 w-full animate-pulse"
};
const _hoisted_14 = { class: "flex gap-3" };
const _hoisted_15 = { class: "flex-1 grid grid-cols-2 md:grid-cols-4 gap-3" };
const _hoisted_16 = { class: "flex gap-3" };


const _sfc_main = {
  __name: 'CRMAccountsPage',
  setup(__props) {

const {
  branches, selectedBranch, onBranchChange, getUserEmail, tenantUsers,
  activeTab, moduleLoading, showAccountFormModal, editingAccount,
  fetchPipelineData, loadMeetings
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'accounts';
  fetchPipelineData().catch(() => {});
  loadMeetings().catch(() => {});
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[12] || (_cache[12] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$3), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
          _cache[4] || (_cache[4] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "CRM // Accounts"),
            createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Accounts")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          (unref(branches).length > 0)
            ? withDirectives((openBlock(), createElementBlock("select", {
                key: 0,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(selectedBranch) ? (selectedBranch).value = $event : null)),
                onChange: _cache[1] || (_cache[1] = (...args) => (unref(onBranchChange) && unref(onBranchChange)(...args))),
                class: "appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-7 rounded-sm text-[10px] font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:ring-[#2F2E8B] cursor-pointer hover:border-[#2F2E8B] transition"
              }, [
                _cache[5] || (_cache[5] = createBaseVNode("option", { value: "" }, "ALL_BRANCHES", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(branches), (branch) => {
                  return (openBlock(), createElementBlock("option", {
                    key: branch._id,
                    value: branch._id
                  }, toDisplayString(branch.name.toUpperCase()), 9, _hoisted_6))
                }), 128))
              ], 544)), [
                [vModelSelect, unref(selectedBranch)]
              ])
            : createCommentVNode("", true),
          createBaseVNode("span", _hoisted_7, [
            createVNode(unref(CircleUser), { size: 14 }),
            createTextVNode(" " + toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("nav", _hoisted_8, [
      createBaseVNode("div", _hoisted_9, [
        createBaseVNode("div", _hoisted_10, [
          createVNode(_component_router_link, {
            to: "/dashboard/crm/leads",
            class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/leads' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
          }, {
            default: withCtx(() => [...(_cache[6] || (_cache[6] = [
              createBaseVNode("i", { class: "fas fa-user-plus text-[10px]" }, null, -1),
              createTextVNode(" Leads ", -1)
            ]))]),
            _: 1
          }, 8, ["class"]),
          createVNode(_component_router_link, {
            to: "/dashboard/crm/pipeline",
            class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/pipeline' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
          }, {
            default: withCtx(() => [...(_cache[7] || (_cache[7] = [
              createBaseVNode("i", { class: "fas fa-project-diagram text-[10px]" }, null, -1),
              createTextVNode(" Events Pipeline ", -1)
            ]))]),
            _: 1
          }, 8, ["class"]),
          createVNode(_component_router_link, {
            to: "/dashboard/crm/accounts",
            class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/accounts' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
          }, {
            default: withCtx(() => [...(_cache[8] || (_cache[8] = [
              createBaseVNode("i", { class: "fas fa-building text-[10px]" }, null, -1),
              createTextVNode(" Accounts ", -1)
            ]))]),
            _: 1
          }, 8, ["class"])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_11, [
      createBaseVNode("div", _hoisted_12, [
        (unref(moduleLoading))
          ? (openBlock(), createElementBlock("div", _hoisted_13, [
              _cache[11] || (_cache[11] = createStaticVNode("<div class=\"flex items-center justify-between\"><div class=\"flex items-center gap-2\"><div class=\"h-4 w-40 bg-gray-200 rounded-sm\"></div><div class=\"h-3 w-36 bg-gray-100 rounded-sm\"></div></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\"></div></div>", 1)),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", _hoisted_15, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                    return createBaseVNode("div", {
                      key: i,
                      class: "h-24 bg-gray-100 rounded-sm"
                    })
                  }), 64))
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "w-72 space-y-2" }, [
                  createBaseVNode("div", { class: "h-10 bg-gray-100 rounded-sm" }),
                  createBaseVNode("div", { class: "h-8 bg-gray-100 rounded-sm" })
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_16, [
                (openBlock(), createElementBlock(Fragment, null, renderList(4, (col) => {
                  return createBaseVNode("div", {
                    key: col,
                    class: "flex-1 space-y-2"
                  }, [
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "h-6 bg-gray-200 rounded-sm" }, null, -1)),
                    (openBlock(), createElementBlock(Fragment, null, renderList(3, (r) => {
                      return createBaseVNode("div", {
                        key: r,
                        class: "h-16 bg-gray-100 rounded-sm"
                      })
                    }), 64))
                  ])
                }), 64))
              ])
            ]))
          : (openBlock(), createBlock(AccountsView, {
              key: 1,
              users: unref(tenantUsers)
            }, null, 8, ["users"]))
      ])
    ]),
    (unref(showAccountFormModal))
      ? (openBlock(), createBlock(AccountFormModal, {
          key: 0,
          modelValue: unref(showAccountFormModal),
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (isRef(showAccountFormModal) ? (showAccountFormModal).value = $event : null)),
          account: unref(editingAccount),
          users: unref(tenantUsers),
          onSaved: unref(fetchPipelineData)
        }, null, 8, ["modelValue", "account", "users", "onSaved"]))
      : createCommentVNode("", true)
  ]))
}
}

};

export { _sfc_main as default };
