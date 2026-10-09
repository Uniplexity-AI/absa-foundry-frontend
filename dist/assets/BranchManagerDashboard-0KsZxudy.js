import { Q as axios, R as API_BASE_URL, r as ref, p as reactive, M as watch, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, h as normalizeClass, x as withDirectives, y as vModelText, L as vModelSelect, v as withModifiers, j as createCommentVNode, A as createTextVNode, i as computed, f as onMounted, q as createVNode, F as Fragment, s as unref, e as renderList, a as createStaticVNode, n as normalizeStyle } from './index-rR_eRHdu.js';
import { _ as _sfc_main$2 } from './LoadingSkeleton-CUIxnaTD.js';
import { A as AiCampaignModal } from './AiCampaignModal-C6SokW-h.js';
import { u as useCustomerStore, f as formatMarketSegment } from './customerStore-Dl_Q7G8c.js';
import { u as usePredictionStore } from './predictionStore-Cyjrt6i7.js';
import { useSnapshotStore } from './snapshotStore-40uEPdOz.js';
import './absaActions-DhjJXYSG.js';
import './absaExport-CcqpY9wH.js';

const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-center justify-center p-4"
};
const _hoisted_2$1 = { class: "relative bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" };
const _hoisted_3$1 = { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50" };
const _hoisted_4$1 = { class: "text-lg font-bold text-gray-800 font-headline" };
const _hoisted_5$1 = { class: "p-6 overflow-y-auto" };
const _hoisted_6$1 = { class: "flex border-b border-gray-200 mb-6" };
const _hoisted_7$1 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_8$1 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_9$1 = {
  key: 0,
  class: "flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded"
};
const _hoisted_10$1 = { class: "flex items-center gap-3" };
const _hoisted_11$1 = { class: "text-sm font-semibold text-gray-800" };
const _hoisted_12$1 = { class: "text-xs text-gray-500" };
const _hoisted_13$1 = { class: "bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start gap-2 mt-4" };
const _hoisted_14$1 = { class: "text-xs text-blue-800 leading-relaxed" };
const _hoisted_15$1 = {
  key: 2,
  class: "mt-4 p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2"
};
const _hoisted_16$1 = {
  key: 3,
  class: "mt-4 p-3 bg-green-50 text-green-700 text-xs rounded border border-green-200 flex items-center gap-2"
};
const _hoisted_17$1 = { class: "px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3" };
const _hoisted_18$1 = ["disabled"];
const _hoisted_19$1 = ["disabled"];
const _hoisted_20$1 = {
  key: 0,
  class: "material-symbols-outlined animate-spin text-[16px]"
};


const _sfc_main$1 = {
  __name: 'CatalogUploadModal',
  props: {
  show: Boolean,
  type: {
    type: String,
    default: 'campaign' // 'campaign' or 'product'
  },
  editItem: {
    type: Object,
    default: null
  }
},
  emits: ['close', 'uploaded'],
  setup(__props, { emit: __emit }) {

const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const props = __props;

const emit = __emit;

const uploadMode = ref('form');
const isDragging = ref(false);
const selectedFile = ref(null);
const isSubmitting = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const formData = reactive({
  title: '',
  target_segment: 'MASS_MARKET',
  channel: '',
  description: ''
});

watch(() => props.editItem, (newVal) => {
  if (newVal) {
    uploadMode.value = 'form';
    formData.title = newVal.name || newVal.title || '';
    formData.description = newVal.description || '';
    formData.channel = newVal.channel || '';
    formData.expires = newVal.expires || '';
    formData.target_segment = newVal.segment || newVal.target_segment || 'MASS_MARKET';
  } else {
    formData.title = '';
    formData.description = '';
    formData.channel = '';
    formData.expires = '';
    formData.target_segment = 'MASS_MARKET';
  }
}, { immediate: true });

const close = () => {
  errorMsg.value = '';
  successMsg.value = '';
  selectedFile.value = null;
  emit('close');
};

const handleFileSelect = (e) => {
  if (e.target.files.length > 0) {
    selectedFile.value = e.target.files[0];
    errorMsg.value = '';
  }
};

const handleDrop = (e) => {
  isDragging.value = false;
  if (e.dataTransfer.files.length > 0) {
    selectedFile.value = e.dataTransfer.files[0];
    errorMsg.value = '';
  }
};

const submit = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  
  if (uploadMode.value === 'form' && (!formData.title || !formData.description)) {
    errorMsg.value = 'Please provide at least a title and description.';
    return
  }
  if (uploadMode.value === 'file' && !selectedFile.value) {
    errorMsg.value = 'Please select a file to upload.';
    return
  }

  isSubmitting.value = true;
  try {
    const endpoint = props.type === 'campaign' ? '/api/v1/decisions/catalog/campaigns' : '/api/v1/decisions/catalog/products';
    
    if (uploadMode.value === 'form') {
      if (props.editItem) {
        await api.put(`${endpoint}/${props.editItem.id}`, formData);
        successMsg.value = `Successfully updated ${props.type}.`;
      } else {
        await api.post(endpoint, formData);
        successMsg.value = `Successfully added new ${props.type}.`;
      }
    } else {
      const fd = new FormData();
      fd.append('file', selectedFile.value);
      const res = await api.post(`${endpoint}/upload`, fd);
      successMsg.value = `Successfully processed file and extracted ${res.data.extracted_count || 1} ${props.type}(s).`;
    }
    
    // Clear form after 1.5s and close
    setTimeout(() => {
      formData.title = '';
      formData.description = '';
      formData.channel = '';
      selectedFile.value = null;
      close();
      emit('uploaded');
    }, 1500);
    
  } catch (err) {
    console.error(err);
    errorMsg.value = err.response?.data?.detail || 'An error occurred during upload. Check backend connection.';
  } finally {
    isSubmitting.value = false;
  }
};

return (_ctx, _cache) => {
  return (__props.show)
    ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", {
          class: "absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm",
          onClick: close
        }),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("h2", _hoisted_4$1, toDisplayString(__props.editItem ? 'Edit' : 'Upload') + " " + toDisplayString(__props.type === 'campaign' ? 'Campaign' : 'Product') + " Catalog", 1),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 transition-colors"
            }, [...(_cache[11] || (_cache[11] = [
              createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("div", _hoisted_6$1, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (uploadMode.value = 'form')),
                class: normalizeClass(['pb-3 px-4 text-sm font-semibold border-b-2 transition-colors', uploadMode.value === 'form' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-700'])
              }, "Manual Entry", 2),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = $event => (uploadMode.value = 'file')),
                class: normalizeClass(['pb-3 px-4 text-sm font-semibold border-b-2 transition-colors', uploadMode.value === 'file' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-700'])
              }, "Upload Document", 2)
            ]),
            (uploadMode.value === 'form')
              ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                  createBaseVNode("div", null, [
                    _cache[12] || (_cache[12] = createBaseVNode("label", { class: "block text-xs font-bold text-gray-700 mb-1" }, "Title", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((formData.title) = $event)),
                      type: "text",
                      class: "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm",
                      placeholder: "e.g., Q4 Wealth Savings Booster"
                    }, null, 512), [
                      [vModelText, formData.title]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[14] || (_cache[14] = createBaseVNode("label", { class: "block text-xs font-bold text-gray-700 mb-1" }, "Target Segment", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((formData.target_segment) = $event)),
                      class: "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm"
                    }, [...(_cache[13] || (_cache[13] = [
                      createBaseVNode("option", { value: "MASS_MARKET" }, "Mass Market", -1),
                      createBaseVNode("option", { value: "WEALTH" }, "Wealth", -1),
                      createBaseVNode("option", { value: "YOUTH" }, "Youth / Student", -1),
                      createBaseVNode("option", { value: "SME" }, "SME", -1)
                    ]))], 512), [
                      [vModelSelect, formData.target_segment]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[15] || (_cache[15] = createBaseVNode("label", { class: "block text-xs font-bold text-gray-700 mb-1" }, "Channel (Optional)", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((formData.channel) = $event)),
                      type: "text",
                      class: "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm",
                      placeholder: "e.g., SMS, Email, Branch"
                    }, null, 512), [
                      [vModelText, formData.channel]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[16] || (_cache[16] = createBaseVNode("label", { class: "block text-xs font-bold text-gray-700 mb-1" }, "Expiry Date", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((formData.expires) = $event)),
                      type: "date",
                      class: "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm"
                    }, null, 512), [
                      [vModelText, formData.expires]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-xs font-bold text-gray-700 mb-1" }, "Description", -1)),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((formData.description) = $event)),
                      rows: "4",
                      class: "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none text-sm",
                      placeholder: "Provide detailed conditions, incentives, and requirements..."
                    }, null, 512), [
                      [vModelText, formData.description]
                    ])
                  ])
                ]))
              : (openBlock(), createElementBlock("div", _hoisted_8$1, [
                  createBaseVNode("div", {
                    class: normalizeClass(["border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors", {'bg-absa-serene border-absa-passion': isDragging.value}]),
                    onDragover: _cache[8] || (_cache[8] = withModifiers($event => (isDragging.value = true), ["prevent"])),
                    onDragleave: _cache[9] || (_cache[9] = withModifiers($event => (isDragging.value = false), ["prevent"])),
                    onDrop: withModifiers(handleDrop, ["prevent"])
                  }, [
                    createBaseVNode("input", {
                      type: "file",
                      ref: "fileInput",
                      class: "hidden",
                      onChange: handleFileSelect,
                      accept: ".csv,.pdf,.docx,.txt"
                    }, null, 544),
                    _cache[18] || (_cache[18] = createBaseVNode("span", { class: "material-symbols-outlined text-4xl text-gray-400 mb-3" }, "cloud_upload", -1)),
                    _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-sm text-gray-700 font-semibold mb-1" }, "Drag and drop your file here", -1)),
                    _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-4" }, "Supports PDF, DOCX, CSV, TXT (Max 10MB)", -1)),
                    createBaseVNode("button", {
                      onClick: _cache[7] || (_cache[7] = $event => (_ctx.$refs.fileInput.click())),
                      class: "px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-semibold hover:bg-gray-50 transition-colors"
                    }, " Browse Files ")
                  ], 34),
                  (selectedFile.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                        createBaseVNode("div", _hoisted_10$1, [
                          _cache[21] || (_cache[21] = createBaseVNode("span", { class: "material-symbols-outlined text-absa-passion" }, "description", -1)),
                          createBaseVNode("div", null, [
                            createBaseVNode("p", _hoisted_11$1, toDisplayString(selectedFile.value.name), 1),
                            createBaseVNode("p", _hoisted_12$1, toDisplayString((selectedFile.value.size / 1024).toFixed(1)) + " KB", 1)
                          ])
                        ]),
                        createBaseVNode("button", {
                          onClick: _cache[10] || (_cache[10] = $event => (selectedFile.value = null)),
                          class: "text-gray-400 hover:text-red-500"
                        }, [...(_cache[22] || (_cache[22] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-lg" }, "delete", -1)
                        ]))])
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_13$1, [
                    _cache[24] || (_cache[24] = createBaseVNode("span", { class: "material-symbols-outlined text-blue-500 text-[18px] mt-0.5" }, "info", -1)),
                    createBaseVNode("p", _hoisted_14$1, [
                      _cache[23] || (_cache[23] = createBaseVNode("strong", null, "AI Document Processing:", -1)),
                      createTextVNode(" When uploading unstructured documents (like PDF or Word brochures), the Absa AI engine will automatically read and extract the relevant " + toDisplayString(__props.type) + " metadata into the vector database. ", 1)
                    ])
                  ])
                ])),
            (errorMsg.value)
              ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                  _cache[25] || (_cache[25] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "error", -1)),
                  createTextVNode(" " + toDisplayString(errorMsg.value), 1)
                ]))
              : createCommentVNode("", true),
            (successMsg.value)
              ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
                  _cache[26] || (_cache[26] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "check_circle", -1)),
                  createTextVNode(" " + toDisplayString(successMsg.value), 1)
                ]))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_17$1, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors",
              disabled: isSubmitting.value
            }, "Cancel", 8, _hoisted_18$1),
            createBaseVNode("button", {
              onClick: submit,
              class: "px-6 py-2 bg-absa-passion text-white text-sm font-bold rounded hover:bg-absa-power transition-colors flex items-center gap-2",
              disabled: isSubmitting.value
            }, [
              (isSubmitting.value)
                ? (openBlock(), createElementBlock("span", _hoisted_20$1, "progress_activity"))
                : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(isSubmitting.value ? 'Processing...' : (__props.editItem ? 'Save Changes' : 'Upload & Process')), 1)
            ], 8, _hoisted_19$1)
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-screen flex flex-col space-y-6"
};
const _hoisted_3 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_4 = { class: "text-body-md text-gray-500 mt-1" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "flex border-b border-gray-300 mb-6" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_9 = {
  key: 0,
  class: "ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full"
};
const _hoisted_10 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_11 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_12 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_13 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_14 = { class: "grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" };
const _hoisted_15 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_16 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_17 = { class: "inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider" };
const _hoisted_18 = { class: "p-5" };
const _hoisted_19 = { class: "grid grid-cols-4 gap-3" };
const _hoisted_20 = {
  key: 0,
  class: "absolute -left-2.5 top-4 text-gray-300"
};
const _hoisted_21 = { class: "bg-white border border-gray-300 rounded-sm p-3" };
const _hoisted_22 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2" };
const _hoisted_23 = { class: "w-full h-0.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_24 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_25 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_26 = { class: "inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider" };
const _hoisted_27 = { class: "p-5" };
const _hoisted_28 = { class: "grid grid-cols-4 gap-3" };
const _hoisted_29 = {
  key: 0,
  class: "absolute -left-2.5 top-4 text-gray-300"
};
const _hoisted_30 = { class: "bg-white border border-gray-300 rounded-sm p-3" };
const _hoisted_31 = { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2" };
const _hoisted_32 = { class: "w-full h-0.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_33 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_34 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_35 = { class: "flex text-[11px] font-bold border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_36 = ["onClick"];
const _hoisted_37 = { class: "p-5" };
const _hoisted_38 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_39 = { class: "flex flex-col gap-3" };
const _hoisted_40 = { class: "flex items-center gap-2 w-44 flex-shrink-0" };
const _hoisted_41 = { class: "text-xs text-gray-600 font-medium truncate" };
const _hoisted_42 = { class: "flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden relative" };
const _hoisted_43 = { class: "absolute right-2 top-0 h-full flex items-center text-[11px] font-bold text-absa-enrich font-mono" };
const _hoisted_44 = { class: "flex flex-col gap-4" };
const _hoisted_45 = { class: "border border-gray-300 rounded-sm p-4 flex justify-between items-center" };
const _hoisted_46 = { class: "mt-1 text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_47 = { class: "border border-gray-300 rounded-sm p-4 flex justify-between items-center" };
const _hoisted_48 = { class: "mt-1 text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_49 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_50 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_51 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_52 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_53 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_54 = { class: "overflow-x-auto" };
const _hoisted_55 = { class: "w-full min-w-[860px] text-left border-collapse" };
const _hoisted_56 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_57 = { key: 0 };
const _hoisted_58 = { class: "px-5 py-3" };
const _hoisted_59 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_60 = { class: "text-[11px] text-gray-400 mt-0.5" };
const _hoisted_61 = { class: "px-4 py-3 text-right font-mono text-xs text-gray-700" };
const _hoisted_62 = { class: "px-4 py-3" };
const _hoisted_63 = { class: "flex items-center gap-3" };
const _hoisted_64 = { class: "w-20 h-1 bg-gray-200 rounded-full overflow-hidden flex-shrink-0" };
const _hoisted_65 = { class: "font-mono text-xs text-absa-enrich whitespace-nowrap" };
const _hoisted_66 = { class: "text-gray-400 font-normal" };
const _hoisted_67 = { class: "px-4 py-3 text-center" };
const _hoisted_68 = { class: "px-5 py-3 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400" };
const _hoisted_69 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_70 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_71 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_72 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_73 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_74 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_75 = { class: "overflow-x-auto" };
const _hoisted_76 = { class: "w-full text-left border-collapse" };
const _hoisted_77 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_78 = { class: "px-5 py-3" };
const _hoisted_79 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_80 = { class: "text-[11px] text-gray-400 mt-0.5" };
const _hoisted_81 = { class: "px-4 py-3" };
const _hoisted_82 = { class: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600" };
const _hoisted_83 = { class: "material-symbols-outlined text-[14px]" };
const _hoisted_84 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_85 = { class: "px-4 py-3 text-right font-mono text-xs font-bold text-absa-enrich" };
const _hoisted_86 = { class: "px-4 py-3 text-right font-mono text-xs text-gray-600" };
const _hoisted_87 = { class: "px-4 py-3 text-right font-mono text-xs font-bold text-absa-passion" };
const _hoisted_88 = { class: "px-4 py-3" };
const _hoisted_89 = { class: "flex items-center gap-2" };
const _hoisted_90 = { class: "w-16 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_91 = { class: "text-[11px] font-bold font-mono text-absa-enrich" };
const _hoisted_92 = { class: "px-4 py-3 text-center" };
const _hoisted_93 = { class: "px-4 py-3 text-right" };
const _hoisted_94 = { class: "flex items-center justify-end gap-2" };
const _hoisted_95 = ["onClick"];
const _hoisted_96 = ["onClick"];
const _hoisted_97 = ["onClick"];
const _hoisted_98 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_99 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_100 = { class: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-absa-passion border border-absa-passion/30 rounded-sm text-xs font-bold" };
const _hoisted_101 = { class: "w-full text-left" };
const _hoisted_102 = { class: "divide-y divide-gray-100" };
const _hoisted_103 = { class: "px-5 py-3" };
const _hoisted_104 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_105 = { class: "text-[11px] text-gray-400 font-mono" };
const _hoisted_106 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_107 = { class: "px-4 py-3" };
const _hoisted_108 = { class: "flex items-center gap-2" };
const _hoisted_109 = { class: "w-14 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_110 = { class: "font-bold font-mono text-xs text-absa-passion" };
const _hoisted_111 = { class: "px-4 py-3 font-mono text-xs font-bold text-absa-passion" };
const _hoisted_112 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_113 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_114 = { class: "overflow-x-auto" };
const _hoisted_115 = { class: "w-full text-left border-collapse" };
const _hoisted_116 = { class: "divide-y divide-gray-100 text-sm" };
const _hoisted_117 = { class: "px-5 py-3" };
const _hoisted_118 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_119 = { class: "px-4 py-3" };
const _hoisted_120 = ["title"];
const _hoisted_121 = { class: "px-4 py-3 text-center" };
const _hoisted_122 = { class: "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_123 = { class: "px-4 py-3 text-right" };
const _hoisted_124 = { class: "flex items-center justify-end gap-2" };
const _hoisted_125 = ["onClick"];
const _hoisted_126 = ["onClick"];
const _hoisted_127 = ["onClick"];
const _hoisted_128 = { key: 0 };
const _hoisted_129 = {
  key: 4,
  class: "grid grid-cols-1 xl:grid-cols-12 gap-6"
};
const _hoisted_130 = { class: "xl:col-span-8 rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_131 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_132 = { class: "flex gap-1.5" };
const _hoisted_133 = ["onClick"];
const _hoisted_134 = { class: "w-full text-left" };
const _hoisted_135 = { class: "divide-y divide-gray-100" };
const _hoisted_136 = { class: "px-5 py-3" };
const _hoisted_137 = { class: "font-semibold text-absa-enrich text-xs" };
const _hoisted_138 = { class: "text-[11px] text-gray-400 font-mono" };
const _hoisted_139 = { class: "px-4 py-3" };
const _hoisted_140 = { class: "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_141 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_142 = { class: "px-4 py-3" };
const _hoisted_143 = { class: "flex items-center gap-2" };
const _hoisted_144 = { class: "w-12 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_145 = { class: "px-4 py-3 font-mono text-xs text-gray-700" };
const _hoisted_146 = { class: "px-4 py-3 text-right" };
const _hoisted_147 = {
  key: 0,
  class: "text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors"
};
const _hoisted_148 = {
  key: 1,
  class: "text-[11px] font-bold text-gray-600 border border-gray-300 px-2.5 py-1 rounded-sm hover:bg-gray-50 transition-colors"
};
const _hoisted_149 = { class: "xl:col-span-4 flex flex-col gap-4" };
const _hoisted_150 = { class: "rounded-sm border border-gray-300 border-l-4 border-l-absa-passion overflow-hidden" };
const _hoisted_151 = { class: "p-4 flex flex-col gap-3" };
const _hoisted_152 = { class: "flex items-start gap-2 mb-2" };
const _hoisted_153 = { class: "text-xs font-semibold text-absa-enrich leading-snug" };
const _hoisted_154 = { class: "text-[11px] text-gray-600 leading-relaxed mb-2" };
const _hoisted_155 = { class: "flex items-center justify-between" };
const _hoisted_156 = { class: "text-[10px] text-gray-400 font-mono" };
const _hoisted_157 = { class: "rounded-sm border border-gray-300 overflow-hidden" };
const _hoisted_158 = { class: "p-4 flex flex-col gap-4" };
const _hoisted_159 = { class: "flex justify-between text-[11px] mb-1.5" };
const _hoisted_160 = { class: "flex items-center gap-1.5" };
const _hoisted_161 = { class: "inline-flex px-1 py-0.5 rounded-sm text-[9px] font-bold bg-gray-100 text-gray-500" };
const _hoisted_162 = { class: "text-gray-600 font-medium" };
const _hoisted_163 = { class: "font-bold font-mono text-absa-enrich" };
const _hoisted_164 = { class: "w-full h-1 rounded-full overflow-hidden bg-gray-200" };
const _hoisted_165 = {
  key: 2,
  class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
};
const _hoisted_166 = { class: "bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col" };
const _hoisted_167 = { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50" };
const _hoisted_168 = { class: "text-lg font-bold text-gray-800 font-headline" };
const _hoisted_169 = { class: "p-6 space-y-4" };
const _hoisted_170 = { class: "text-sm font-semibold text-gray-800" };
const _hoisted_171 = { class: "text-sm text-gray-700 whitespace-pre-wrap leading-relaxed" };
const _hoisted_172 = { class: "grid grid-cols-2 gap-4 border-t border-gray-100 pt-4" };
const _hoisted_173 = { class: "text-sm text-gray-700" };
const _hoisted_174 = { key: 0 };
const _hoisted_175 = { class: "text-sm text-gray-700 flex items-center gap-1" };
const _hoisted_176 = { class: "material-symbols-outlined text-[16px]" };
const _hoisted_177 = { key: 1 };
const _hoisted_178 = { class: "text-sm text-gray-700" };
const _hoisted_179 = { key: 2 };
const _hoisted_180 = { class: "px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end" };


const _sfc_main = {
  __name: 'BranchManagerDashboard',
  setup(__props) {

const showCampaignModal = ref(false);
const showUploadModal = ref(false);
const uploadType = ref('campaign');
const campaignToEdit = ref(null);
const campaignToView = ref(null);
const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const customerStore   = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore   = useSnapshotStore();

const loading         = ref(true);
const activeTab       = ref('overview');
const forecastHorizon = ref(30);
const caseFilter      = ref('all');
const branchData      = ref([]);
const forecastData    = ref(null);

const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

const backendSegments = computed(() => {
  const groups = new Map();
  for (const customer of customerStore.customers) {
    if (customer.marketSegment === null) continue
    const group = groups.get(customer.marketSegment) || {
      marketSegment: customer.marketSegment,
      label: formatMarketSegment(customer.marketSegment),
      total: 0,
      atRisk: 0,
    };
    group.total += 1;
    if (['AT_RISK', 'DORMANT', 'CHURNED'].includes(customer.state)) group.atRisk += 1;
    groups.set(customer.marketSegment, group);
  }
  return [...groups.values()]
    .map((group) => ({ ...group, riskPct: group.total ? Math.round((group.atRisk / group.total) * 100) : 0 }))
    .sort((a, b) => b.atRisk - a.atRisk)
});

// â”€â”€ Portfolio tracks â”€â”€
const rmSegments = [30, 50, 60, 85];
const rmTrack = computed(() => {
  let total = 0;
  let atRisk = 0;
  for (const seg of backendSegments.value) {
    if (rmSegments.includes(seg.marketSegment)) {
      total += seg.total;
      atRisk += seg.atRisk;
    }
  }
  return { total, atRisk, openCases: Math.round(atRisk * 0.4) }
});
const branchTrack = computed(() => {
  let total = 0;
  let atRisk = 0;
  for (const seg of backendSegments.value) {
    if (!rmSegments.includes(seg.marketSegment)) {
      total += seg.total;
      atRisk += seg.atRisk;
    }
  }
  return { total, atRisk, inCampaign: Math.round(atRisk * 0.58) }
});

// â”€â”€ Tabs â”€â”€
const tabs = computed(() => [
  { id: 'overview',     label: 'Overview',        icon: 'gauge'            },
  { id: 'rm_portfolio', label: 'RM Portfolio',    icon: 'manage_accounts'  },
  { id: 'campaigns',    label: 'Branch Campaigns',icon: 'campaign'         },
  { id: 'products',     label: 'Products Catalog', icon: 'inventory' },
  { id: 'cases',        label: 'All Cases',        icon: 'assignment_late', badge: kpis.value.newFlagsToday || null },
]);

// â”€â”€ KPIs â”€â”€
const kpis = computed(() => {
  const avgChurn      = forecastData.value?.churn_rate_pct || customerStore.portfolio.churnedPct || 5.8;
  const totalBranches = branchData.value.length || 0;
  return {
    totalBranches,
    newFlagsToday: customerStore.customers.filter(c => c.state === 'AT_RISK').length || 0,
    retentionRate:       72,
    churnTarget:         6.0,
    monthlyChurnValue:   avgChurn,
    churnRateAboveTarget: avgChurn > 6.0,
  }
});

const overviewKpis = computed(() => [
  { label: 'New High-Risk (Today)', value: kpis.value.newFlagsToday,          valueClass: 'text-absa-passion', note: 'Flagged since yesterday' },
  { label: 'RM Pending AI Interventions',        value: rmTrack.value.openCases,            valueClass: 'text-absa-enrich',  note: 'Premium Â· uncontacted' },
  { label: 'Not in Campaign',      value: (branchTrack.value.atRisk - branchTrack.value.inCampaign).toLocaleString(), valueClass: 'text-absa-passion', note: 'Mass-market Â· no outreach' },
  { label: 'Campaign Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), valueClass: 'text-absa-enrich', note: `of ${branchTrack.value.atRisk.toLocaleString()} at-risk` },
  { label: 'Retention Rate MTD',   value: kpis.value.retentionRate + '%',     valueClass: 'text-absa-passion',    note: 'All channels combined' },
  { label: 'Churn vs Target',      value: kpis.value.monthlyChurnValue + '%', valueClass: kpis.value.churnRateAboveTarget ? 'text-absa-inspire' : 'text-absa-passion', note: `Target: ${kpis.value.churnTarget}%` },
]);

// â”€â”€ RM Pipeline â”€â”€
const rmPipeline = computed(() => {
  const f = rmTrack.value.atRisk;
  const a = Math.round(f * 0.77), c = Math.round(f * 0.61), r = Math.round(c * 0.82);
  return [
    { label: 'Flagged',   value: f, valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Assigned',  value: a, valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Contacted', value: c, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r, valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
});

// â”€â”€ Branch Pipeline â”€â”€
const branchPipeline = computed(() => {
  const f = branchTrack.value.atRisk, e = branchTrack.value.inCampaign;
  const res = Math.round(e * 0.34), r = Math.round(res * 0.68);
  return [
    { label: 'Flagged',   value: f,   valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Enrolled',  value: e,   valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Responded', value: res, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r,   valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
});

// â”€â”€ Forecast â”€â”€
const forecastWeeks = computed(() => {
  const segs = backendSegments.value.map((segment) => ({
    label: segment.label,
    value: segment.atRisk,
    track: [30, 50, 60, 85].includes(segment.marketSegment) ? 'rm' : 'branch',
  }));
  const max = Math.max(...segs.map(s => s.value));
  return segs.map(s => ({ ...s, pct: max ? Math.round(s.value / max * 100) : 0 }))
});
const totalForecast = computed(() => forecastWeeks.value.reduce((s, w) => s + w.value, 0));
const estimatedAUM  = computed(() => {
  const v = totalForecast.value * 42000;
  return v >= 1e6 ? 'K' + (v / 1e6).toFixed(1) + 'M' : 'K' + v.toLocaleString()
});

// â”€â”€ RM Table â”€â”€
const relationshipManagers = computed(() => [
  { name: 'Naledi Khumalo', segment: formatMarketSegment(30), portfolio: 84,  avgRiskScore: 38, openCases: 8,  actioned: 19, target: 20, retentionRate: 88, daysSinceActivity: 0 },
  { name: 'Ayanda Nkosi',   segment: formatMarketSegment(85), portfolio: 127, avgRiskScore: 48, openCases: 18, actioned: 24, target: 28, retentionRate: 71, daysSinceActivity: 2 },
  { name: 'Dineo Molefe',   segment: formatMarketSegment(60), portfolio: 98,  avgRiskScore: 61, openCases: 16, actioned: 18, target: 25, retentionRate: 65, daysSinceActivity: 1 },
].map(rm => {
  const pct = (rm.actioned / rm.target) * 100;
  const s   = pct >= 80 && rm.retentionRate >= 65 ? 'ON TRACK' : rm.daysSinceActivity > 3 || rm.retentionRate < 50 ? 'AT RISK' : 'MONITOR';
  return { ...rm, status: s,
    statusClass: s === 'ON TRACK' ? 'bg-red-50 text-absa-passion' : s === 'AT RISK' ? 'bg-red-100 text-absa-inspire' : 'bg-amber-100 text-amber-700',
    dotClass: s === 'ON TRACK' ? 'bg-absa-passion' : s === 'AT RISK' ? 'bg-absa-inspire' : 'bg-amber-500'
  }
}));

const rmStatusCounts = computed(() =>
  relationshipManagers.value.reduce((a, r) => { a[r.status] = (a[r.status] || 0) + 1; return a }, {})
);

const rmSummaryKpis = computed(() => [
  { label: 'Active RMs',      value: relationshipManagers.value.length, note: 'RM-managed segments' },
  { label: 'On Track',        value: rmStatusCounts.value['ON TRACK'] || 0, valueClass: 'text-absa-passion', note: 'Meeting targets' },
  { label: 'Monitoring',      value: rmStatusCounts.value['MONITOR']  || 0, valueClass: 'text-absa-energy', note: 'Needs attention' },
  { label: 'Needs Attention', value: rmStatusCounts.value['AT RISK']  || 0, valueClass: 'text-absa-passion', note: 'Idle or low retention' },
]);

// â”€â”€ Campaigns â”€â”€
const activeProducts = ref([]);

const fetchProducts = async () => {
  try {
    const res = await api.get('/api/v1/decisions/catalog/products');
    if (res.data && res.data.length > 0) {
      activeProducts.value = res.data.map(p => ({
        id: p.id,
        name: p.title,
        description: p.description,
        segment: p.target_segment || 'All'
      }));
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
};

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return
  try {
    await api.delete(`/api/v1/decisions/catalog/products/${id}`);
    await fetchProducts();
  } catch (err) {
    console.error("Failed to delete product:", err);
  }
};

const activeCampaigns = ref([]);

const fetchCampaigns = async () => {
  try {
    const res = await api.get('/api/v1/decisions/catalog/campaigns');
    if (res.data && res.data.length > 0) {
      activeCampaigns.value = res.data.map(c => ({
        id: c.id,
        name: c.title,
        description: c.description,
        channel: c.channel || 'Digital',
        channelIcon: c.channel?.toLowerCase().includes('email') ? 'mail' : (c.channel?.toLowerCase().includes('sms') ? 'sms' : 'phone_iphone'),
        segment: c.target_segment || 'All',
        expires: c.expires || '2026-12-31',
        enrolled: 0,
        responded: 0,
        retained: 0,
        conversionPct: 0,
        status: 'ACTIVE',
        statusClass: 'bg-red-50 text-absa-passion',
        dotClass: 'bg-absa-passion'
      }));
    }
  } catch (err) {
    console.error("Failed to fetch campaigns:", err);
  }
};

const deleteCampaign = async (id) => {
  if (!confirm("Are you sure you want to delete this campaign?")) return
  try {
    await api.delete(`/api/v1/decisions/catalog/campaigns/${id}`);
    await fetchCampaigns();
    fetchProducts();
  } catch (err) {
    console.error("Failed to delete campaign:", err);
    alert("Failed to delete campaign.");
  }
};

const campaignKpis = computed(() => [
  { label: 'Active Campaigns',    value: activeCampaigns.value.filter(c => c.status === 'ACTIVE').length, note: 'Running this month' },
  { label: 'At-Risk Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), note: `of ${branchTrack.value.atRisk.toLocaleString()} flagged` },
  { label: 'Avg Response Rate',   value: '34%', valueClass: 'text-absa-energy', note: 'Responded to outreach' },
  { label: 'Retained via Campaign', value: Math.round(branchTrack.value.inCampaign * 0.34 * 0.68).toLocaleString(), valueClass: 'text-green-600', note: 'Confirmed no churn MTD' },
]);

// â”€â”€ Unenrolled high-risk (populated from API) â”€â”€
const unenrolledCustomers = ref([]);

// â”€â”€ Cases (populated from API) â”€â”€
const caseFilters = [
  { id: 'all',    label: 'All'     },
  { id: 'rm',     label: 'RM'      },
  { id: 'branch', label: 'Branch'  },
];

const allCases = ref([]);

const filteredCases = computed(() =>
  caseFilter.value === 'all' ? allCases.value : allCases.value.filter(c => c.track === caseFilter.value)
);

const churnSegments = computed(() => backendSegments.value.map((segment) => ({
  name: segment.label,
  pct: segment.riskPct,
  track: [30, 50, 60, 85].includes(segment.marketSegment) ? 'rm' : 'branch',
})));

// â”€â”€ AI Priority Actions (populated from API) â”€â”€
const aiPriorityActions = ref([]);

// â”€â”€ Fetch â”€â”€
onMounted(async () => {
  try {
    await customerStore.fetchPortfolio();
    predictionStore.fetchChurnDrivers();
    fetchCampaigns();
    fetchProducts();

    const [bRes, fRes, casesRes, unenrolledRes, actionsRes] = await Promise.all([
      api.get('/api/v1/churn-intel/branches',       { params: { as_of_date: snapshotStore.asOfDate } }),
      api.get('/api/v1/forecasts/churn',            { params: { as_of_date: snapshotStore.asOfDate } }),
      api.get('/api/v1/churn-intel/at-risk-cases',  { params: { as_of_date: snapshotStore.asOfDate, limit: 50 } }),
      api.get('/api/v1/churn-intel/unenrolled-high-risk', { params: { as_of_date: snapshotStore.asOfDate, limit: 10 } }),
      api.get('/api/v1/churn-intel/priority-actions', { params: { as_of_date: snapshotStore.asOfDate } }),
    ]);

    branchData.value   = bRes.data.branches || [];
    forecastData.value = fRes.data;

    // Map at-risk cases: add segment label for display
    allCases.value = (casesRes.data || []).map(c => ({
      ...c,
      segment: formatMarketSegment(c.segment_code),
    }));

    // Map unenrolled customers: add segment label
    unenrolledCustomers.value = (unenrolledRes.data || []).map(c => ({
      ...c,
      segment: formatMarketSegment(c.segment_code),
    }));

    // Map priority actions: camelCase for template binding
    aiPriorityActions.value = (actionsRes.data || []).map(a => ({
      urgency:       a.urgency,
      urgencyClass:  a.urgency_class,
      title:         a.title,
      detail:        a.detail,
      meta:          a.meta,
    }));

  } catch (e) {
    console.warn('BranchManagerDashboard: API error', e.message);
  } finally {
    loading.value = false;
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$2, { type: "stats" }),
          createVNode(_sfc_main$2, { type: "block" }),
          createVNode(_sfc_main$2, {
            type: "table",
            count: 5
          })
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Home"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Branch Manager")
              ], -1)),
              _cache[8] || (_cache[8] = createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Branch Manager Dashboard", -1)),
              createBaseVNode("p", _hoisted_4, toDisplayString(kpis.value.totalBranches) + " branches Â· " + toDisplayString(unref(customerStore).portfolio.total.toLocaleString()) + " total customers Â· " + toDisplayString(unref(currentMonth)), 1)
            ]),
            createBaseVNode("div", _hoisted_5, [
              _cache[10] || (_cache[10] = createBaseVNode("button", { class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none" }, [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download"),
                createTextVNode("Export Report ")
              ], -1)),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (showCampaignModal.value = true)),
                class: "px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-bold shadow-none"
              }, [...(_cache[9] || (_cache[9] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "auto_awesome", -1),
                createTextVNode("AI Campaign Generator ", -1)
              ]))])
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab) => {
              return (openBlock(), createElementBlock("button", {
                key: tab.id,
                onClick: $event => (activeTab.value = tab.id),
                class: normalizeClass(['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
              }, [
                createBaseVNode("span", _hoisted_8, toDisplayString(tab.icon), 1),
                createTextVNode(" " + toDisplayString(tab.label) + " ", 1),
                (tab.badge)
                  ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(tab.badge), 1))
                  : createCommentVNode("", true)
              ], 10, _hoisted_7))
            }), 128))
          ]),
          (activeTab.value === 'overview')
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_10, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(overviewKpis.value, (kpi) => {
                    return (openBlock(), createElementBlock("div", {
                      key: kpi.label,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_11, toDisplayString(kpi.label), 1),
                      createBaseVNode("p", _hoisted_12, toDisplayString(kpi.value), 1),
                      createBaseVNode("p", _hoisted_13, toDisplayString(kpi.note), 1)
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, [
                      _cache[11] || (_cache[11] = createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "RM-Managed Pipeline"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "CIB, Enterprise, Prestige & Premier Â· Dedicated RM per customer")
                      ], -1)),
                      createBaseVNode("span", _hoisted_17, toDisplayString(rmTrack.value.total.toLocaleString()) + " customers", 1)
                    ]),
                    createBaseVNode("div", _hoisted_18, [
                      createBaseVNode("div", _hoisted_19, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(rmPipeline.value, (stage, i) => {
                          return (openBlock(), createElementBlock("div", {
                            key: stage.label,
                            class: "relative"
                          }, [
                            (i > 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_20, [...(_cache[12] || (_cache[12] = [
                                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "arrow_right", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            createBaseVNode("div", _hoisted_21, [
                              createBaseVNode("p", _hoisted_22, toDisplayString(stage.label), 1),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-xl font-bold font-mono mb-2", stage.valueClass])
                              }, toDisplayString(stage.value), 3),
                              createBaseVNode("div", _hoisted_23, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["h-full rounded-full", stage.barClass]),
                                  style: normalizeStyle({ width: (rmPipeline.value[0].value ? (stage.value / rmPipeline.value[0].value * 100) : 0) + '%' })
                                }, null, 6)
                              ])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("div", _hoisted_25, [
                      _cache[13] || (_cache[13] = createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Branch Campaign Pipeline"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Mass, Personal, SME & BB Â· No dedicated RM Â· Campaign-based retention")
                      ], -1)),
                      createBaseVNode("span", _hoisted_26, toDisplayString(branchTrack.value.total.toLocaleString()) + " customers", 1)
                    ]),
                    createBaseVNode("div", _hoisted_27, [
                      createBaseVNode("div", _hoisted_28, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(branchPipeline.value, (stage, i) => {
                          return (openBlock(), createElementBlock("div", {
                            key: stage.label,
                            class: "relative"
                          }, [
                            (i > 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_29, [...(_cache[14] || (_cache[14] = [
                                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "arrow_right", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            createBaseVNode("div", _hoisted_30, [
                              createBaseVNode("p", _hoisted_31, toDisplayString(stage.label), 1),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-xl font-bold font-mono mb-2", stage.valueClass])
                              }, toDisplayString(stage.value.toLocaleString()), 3),
                              createBaseVNode("div", _hoisted_32, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["h-full rounded-full", stage.barClass]),
                                  style: normalizeStyle({ width: (branchPipeline.value[0].value ? (stage.value / branchPipeline.value[0].value * 100) : 0) + '%' })
                                }, null, 6)
                              ])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("div", _hoisted_34, [
                    _cache[15] || (_cache[15] = createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Churn Forecast — Projected Exits by Segment"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "AI-projected customer exits Â· Powered by LightGBM v1.4.2")
                    ], -1)),
                    createBaseVNode("div", _hoisted_35, [
                      (openBlock(), createElementBlock(Fragment, null, renderList([30, 60, 90], (d) => {
                        return createBaseVNode("button", {
                          key: d,
                          onClick: $event => (forecastHorizon.value = d),
                          class: normalizeClass(['px-3 py-1.5', forecastHorizon.value === d ? 'bg-absa-passion text-white' : 'text-gray-500 hover:bg-gray-50'])
                        }, toDisplayString(d) + "D ", 11, _hoisted_36)
                      }), 64))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    createBaseVNode("div", _hoisted_38, [
                      createBaseVNode("div", _hoisted_39, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(forecastWeeks.value, (seg) => {
                          return (openBlock(), createElementBlock("div", {
                            key: seg.label,
                            class: "flex items-center gap-3"
                          }, [
                            createBaseVNode("div", _hoisted_40, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded-sm", seg.track === 'rm' ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'])
                              }, toDisplayString(seg.track === 'rm' ? 'RM' : 'BRANCH'), 3),
                              createBaseVNode("span", _hoisted_41, toDisplayString(seg.label), 1)
                            ]),
                            createBaseVNode("div", _hoisted_42, [
                              createBaseVNode("div", {
                                class: "h-full bg-absa-passion/70 rounded-sm transition-all duration-500",
                                style: normalizeStyle({ width: seg.pct + '%' })
                              }, null, 4),
                              createBaseVNode("span", _hoisted_43, toDisplayString(seg.value.toLocaleString()), 1)
                            ])
                          ]))
                        }), 128))
                      ]),
                      createBaseVNode("div", _hoisted_44, [
                        createBaseVNode("div", _hoisted_45, [
                          createBaseVNode("div", null, [
                            _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[11px] text-gray-500 uppercase font-bold tracking-wider" }, "Total Projected Exits", -1)),
                            createBaseVNode("p", _hoisted_46, toDisplayString(totalForecast.value.toLocaleString()), 1)
                          ]),
                          _cache[17] || (_cache[17] = createBaseVNode("span", { class: "material-symbols-outlined text-[30px] text-gray-200" }, "group_remove", -1))
                        ]),
                        createBaseVNode("div", _hoisted_47, [
                          createBaseVNode("div", null, [
                            _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[11px] text-gray-500 uppercase font-bold tracking-wider" }, "Estimated AUM at Risk", -1)),
                            createBaseVNode("p", _hoisted_48, toDisplayString(estimatedAUM.value), 1)
                          ]),
                          _cache[19] || (_cache[19] = createBaseVNode("span", { class: "material-symbols-outlined text-[30px] text-gray-200" }, "account_balance", -1))
                        ])
                      ])
                    ])
                  ])
                ])
              ], 64))
            : (activeTab.value === 'rm_portfolio')
              ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  _cache[26] || (_cache[26] = createStaticVNode("<div class=\"mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3\"><span class=\"material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0\">info</span><p class=\"text-xs text-gray-600\"><span class=\"font-bold text-absa-enrich\">Scope:</span> This view covers <span class=\"font-semibold\">CIB, Enterprise, Prestige and Premier</span> customers assigned to a dedicated Relationship Manager. For Mass, Personal, SME and BB retention, see the <span class=\"font-semibold\">Branch Campaigns</span> tab. </p></div>", 1)),
                  createBaseVNode("div", _hoisted_49, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(rmSummaryKpis.value, (kpi) => {
                      return (openBlock(), createElementBlock("div", {
                        key: kpi.label,
                        class: "bg-white border border-gray-300 rounded-sm p-4"
                      }, [
                        createBaseVNode("p", _hoisted_50, toDisplayString(kpi.label), 1),
                        createBaseVNode("p", _hoisted_51, toDisplayString(kpi.value), 1),
                        createBaseVNode("p", _hoisted_52, toDisplayString(kpi.note), 1)
                      ]))
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_53, [
                    _cache[25] || (_cache[25] = createStaticVNode("<div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center\"><div><h2 class=\"text-sm font-bold text-absa-enrich\">Relationship Manager Workload</h2><p class=\"text-[11px] text-gray-500 mt-0.5\">Individual RM operational metrics Â· RM-managed segments Â· Sourced from Nightly Inference Batch</p></div><div class=\"flex gap-2\"><button class=\"px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none\"><span class=\"material-symbols-outlined text-[14px]\">filter_list</span>Filter </button><button class=\"px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none\"><span class=\"material-symbols-outlined text-[14px]\">download</span>Export </button></div></div>", 1)),
                    createBaseVNode("div", _hoisted_54, [
                      createBaseVNode("table", _hoisted_55, [
                        _cache[21] || (_cache[21] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-5 py-3" }, "Relationship Manager"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Portfolio"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Avg Risk Score"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Pending AI Interventions"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Cases Actioned MTD"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Retention Rate"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Last Activity"),
                            createBaseVNode("th", { class: "px-4 py-3 text-center" }, "Status")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_56, [
                          (relationshipManagers.value.length === 0)
                            ? (openBlock(), createElementBlock("tr", _hoisted_57, [...(_cache[20] || (_cache[20] = [
                                createBaseVNode("td", {
                                  colspan: "8",
                                  class: "p-12 text-center text-gray-400 text-sm"
                                }, "No RM data available", -1)
                              ]))]))
                            : createCommentVNode("", true),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(relationshipManagers.value, (rm) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: rm.name,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_58, [
                                createBaseVNode("p", _hoisted_59, toDisplayString(rm.name), 1),
                                createBaseVNode("p", _hoisted_60, toDisplayString(rm.segment), 1)
                              ]),
                              createBaseVNode("td", _hoisted_61, toDisplayString(rm.portfolio.toLocaleString()), 1),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.avgRiskScore > 65 ? 'text-absa-inspire' : rm.avgRiskScore > 45 ? 'text-absa-power' : 'text-absa-passion'])
                              }, toDisplayString(rm.avgRiskScore), 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.openCases > 15 ? 'text-absa-inspire' : rm.openCases > 8 ? 'text-absa-energy' : 'text-absa-passion'])
                              }, toDisplayString(rm.openCases), 3),
                              createBaseVNode("td", _hoisted_62, [
                                createBaseVNode("div", _hoisted_63, [
                                  createBaseVNode("div", _hoisted_64, [
                                    createBaseVNode("div", {
                                      class: "h-full bg-absa-passion rounded-full",
                                      style: normalizeStyle({ width: Math.min((rm.actioned / rm.target) * 100, 100) + '%' })
                                    }, null, 4)
                                  ]),
                                  createBaseVNode("span", _hoisted_65, [
                                    createTextVNode(toDisplayString(rm.actioned), 1),
                                    createBaseVNode("span", _hoisted_66, " / " + toDisplayString(rm.target), 1)
                                  ])
                                ])
                              ]),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right font-mono text-xs font-bold", rm.retentionRate >= 70 ? 'text-absa-passion' : rm.retentionRate >= 50 ? 'text-absa-energy' : 'text-absa-inspire'])
                              }, toDisplayString(rm.retentionRate) + "% ", 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-4 py-3 text-right text-xs", rm.daysSinceActivity > 3 ? 'text-absa-passion font-bold' : 'text-gray-500'])
                              }, toDisplayString(rm.daysSinceActivity === 0 ? 'Today' : rm.daysSinceActivity + 'd ago'), 3),
                              createBaseVNode("td", _hoisted_67, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', rm.statusClass])
                                }, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(["w-1 h-1 rounded-full", rm.dotClass])
                                  }, null, 2),
                                  createTextVNode(toDisplayString(rm.status), 1)
                                ], 2)
                              ])
                            ]))
                          }), 128))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_68, [
                      _cache[22] || (_cache[22] = createBaseVNode("span", { class: "font-bold text-absa-passion" }, "ON TRACK", -1)),
                      _cache[23] || (_cache[23] = createTextVNode(" = actioned >80% of target & retention â‰¥65% Â· ", -1)),
                      _cache[24] || (_cache[24] = createBaseVNode("span", { class: "font-bold text-absa-inspire" }, "AT RISK", -1)),
                      createTextVNode(" = idle >3 days or retention <50% Â· " + toDisplayString(unref(currentMonth)), 1)
                    ])
                  ])
                ], 64))
              : (activeTab.value === 'campaigns')
                ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    _cache[37] || (_cache[37] = createStaticVNode("<div class=\"mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3\"><span class=\"material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0\">info</span><p class=\"text-xs text-gray-600\"><span class=\"font-bold text-absa-enrich\">Scope:</span> Branch-managed customers — <span class=\"font-semibold\">Mass, Personal, SME and BB</span> — have no dedicated RM. Retention is managed through outreach campaigns and call centre referrals. </p></div>", 1)),
                    createBaseVNode("div", _hoisted_69, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(campaignKpis.value, (kpi) => {
                        return (openBlock(), createElementBlock("div", {
                          key: kpi.label,
                          class: "bg-white border border-gray-300 rounded-sm p-4"
                        }, [
                          createBaseVNode("p", _hoisted_70, toDisplayString(kpi.label), 1),
                          createBaseVNode("p", _hoisted_71, toDisplayString(kpi.value), 1),
                          createBaseVNode("p", _hoisted_72, toDisplayString(kpi.note), 1)
                        ]))
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_73, [
                      createBaseVNode("div", _hoisted_74, [
                        _cache[28] || (_cache[28] = createBaseVNode("div", null, [
                          createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Active Retention Campaigns"),
                          createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Branch-level outreach targeting mass-market at-risk customers")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: _cache[1] || (_cache[1] = $event => {showUploadModal.value = true; uploadType.value = 'campaign';}),
                          class: "px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none"
                        }, [...(_cache[27] || (_cache[27] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "add", -1),
                          createTextVNode("New Campaign ", -1)
                        ]))])
                      ]),
                      createBaseVNode("div", _hoisted_75, [
                        createBaseVNode("table", _hoisted_76, [
                          _cache[32] || (_cache[32] = createBaseVNode("thead", null, [
                            createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                              createBaseVNode("th", { class: "px-5 py-3" }, "Campaign"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Channel"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Enrolled"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Responded"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Retained"),
                              createBaseVNode("th", { class: "px-4 py-3" }, "Conversion"),
                              createBaseVNode("th", { class: "px-4 py-3 text-center" }, "Status"),
                              createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Actions")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_77, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(activeCampaigns.value, (c) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: c.name,
                                class: "hover:bg-gray-50 transition-colors"
                              }, [
                                createBaseVNode("td", _hoisted_78, [
                                  createBaseVNode("p", _hoisted_79, toDisplayString(c.name), 1),
                                  createBaseVNode("p", _hoisted_80, "Expires " + toDisplayString(c.expires), 1)
                                ]),
                                createBaseVNode("td", _hoisted_81, [
                                  createBaseVNode("span", _hoisted_82, [
                                    createBaseVNode("span", _hoisted_83, toDisplayString(c.channelIcon), 1),
                                    createTextVNode(toDisplayString(c.channel), 1)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_84, toDisplayString(c.segment), 1),
                                createBaseVNode("td", _hoisted_85, toDisplayString(c.enrolled.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_86, toDisplayString(c.responded.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_87, toDisplayString(c.retained.toLocaleString()), 1),
                                createBaseVNode("td", _hoisted_88, [
                                  createBaseVNode("div", _hoisted_89, [
                                    createBaseVNode("div", _hoisted_90, [
                                      createBaseVNode("div", {
                                        class: "h-full bg-absa-passion rounded-full",
                                        style: normalizeStyle({ width: c.conversionPct + '%' })
                                      }, null, 4)
                                    ]),
                                    createBaseVNode("span", _hoisted_91, toDisplayString(c.conversionPct) + "%", 1)
                                  ])
                                ]),
                                createBaseVNode("td", _hoisted_92, [
                                  createBaseVNode("span", {
                                    class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', c.statusClass])
                                  }, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["w-1 h-1 rounded-full", c.dotClass])
                                    }, null, 2),
                                    createTextVNode(toDisplayString(c.status), 1)
                                  ], 2)
                                ]),
                                createBaseVNode("td", _hoisted_93, [
                                  createBaseVNode("div", _hoisted_94, [
                                    createBaseVNode("button", {
                                      onClick: $event => (campaignToView.value = c),
                                      class: "p-1 text-gray-400 hover:text-absa-energy transition-colors",
                                      title: "View"
                                    }, [...(_cache[29] || (_cache[29] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "visibility", -1)
                                    ]))], 8, _hoisted_95),
                                    createBaseVNode("button", {
                                      onClick: $event => {campaignToEdit.value = c; uploadType.value = 'campaign'; showUploadModal.value = true;},
                                      class: "p-1 text-gray-400 hover:text-absa-enrich transition-colors",
                                      title: "Edit"
                                    }, [...(_cache[30] || (_cache[30] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "edit", -1)
                                    ]))], 8, _hoisted_96),
                                    createBaseVNode("button", {
                                      onClick: $event => (deleteCampaign(c.id)),
                                      class: "p-1 text-gray-400 hover:text-absa-passion transition-colors",
                                      title: "Delete"
                                    }, [...(_cache[31] || (_cache[31] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "delete", -1)
                                    ]))], 8, _hoisted_97)
                                  ])
                                ])
                              ]))
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_98, [
                      createBaseVNode("div", _hoisted_99, [
                        _cache[34] || (_cache[34] = createBaseVNode("div", null, [
                          createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "At-Risk Â· Not Enrolled in Any Campaign"),
                          createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Flagged high-risk with no outreach Â· Immediate action recommended")
                        ], -1)),
                        createBaseVNode("span", _hoisted_100, [
                          _cache[33] || (_cache[33] = createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse" }, null, -1)),
                          createTextVNode(" " + toDisplayString((branchTrack.value.atRisk - branchTrack.value.inCampaign).toLocaleString()) + " customers ", 1)
                        ])
                      ]),
                      createBaseVNode("table", _hoisted_101, [
                        _cache[36] || (_cache[36] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-5 py-3" }, "Customer"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Churn Prob."),
                            createBaseVNode("th", { class: "px-4 py-3" }, "Days Flagged"),
                            createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Action")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_102, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unenrolledCustomers.value, (cust) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: cust.id,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_103, [
                                createBaseVNode("p", _hoisted_104, toDisplayString(cust.name), 1),
                                createBaseVNode("p", _hoisted_105, toDisplayString(cust.id), 1)
                              ]),
                              createBaseVNode("td", _hoisted_106, toDisplayString(cust.segment), 1),
                              createBaseVNode("td", _hoisted_107, [
                                createBaseVNode("div", _hoisted_108, [
                                  createBaseVNode("div", _hoisted_109, [
                                    createBaseVNode("div", {
                                      class: "h-full bg-absa-passion rounded-full",
                                      style: normalizeStyle({ width: cust.prob + '%' })
                                    }, null, 4)
                                  ]),
                                  createBaseVNode("span", _hoisted_110, toDisplayString(cust.prob) + "%", 1)
                                ])
                              ]),
                              createBaseVNode("td", _hoisted_111, toDisplayString(cust.daysFlagged) + "d", 1),
                              _cache[35] || (_cache[35] = createBaseVNode("td", { class: "px-4 py-3 text-right" }, [
                                createBaseVNode("button", { class: "text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors" }, " Enrol in Campaign ")
                              ], -1))
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ], 64))
                : (activeTab.value === 'products')
                  ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                      _cache[45] || (_cache[45] = createBaseVNode("div", { class: "mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3" }, [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0" }, "info"),
                        createBaseVNode("p", { class: "text-xs text-gray-600" }, " Upload and manage the bank's product catalog. These products are referenced by the Decision Intelligence engine during NBA (Next Best Action) evaluation. ")
                      ], -1)),
                      createBaseVNode("div", _hoisted_112, [
                        createBaseVNode("div", _hoisted_113, [
                          _cache[39] || (_cache[39] = createBaseVNode("div", null, [
                            createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Products Catalog"),
                            createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Active retail products available for cross-sell recommendations")
                          ], -1)),
                          createBaseVNode("button", {
                            onClick: _cache[2] || (_cache[2] = $event => {uploadType.value = 'product'; showUploadModal.value = true;}),
                            class: "px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none"
                          }, [...(_cache[38] || (_cache[38] = [
                            createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "add", -1),
                            createTextVNode("New Product ", -1)
                          ]))])
                        ]),
                        createBaseVNode("div", _hoisted_114, [
                          createBaseVNode("table", _hoisted_115, [
                            _cache[44] || (_cache[44] = createBaseVNode("thead", null, [
                              createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                                createBaseVNode("th", { class: "px-5 py-3 w-1/4" }, "Product Name"),
                                createBaseVNode("th", { class: "px-4 py-3 w-1/2" }, "Description"),
                                createBaseVNode("th", { class: "px-4 py-3 text-center" }, "Target Segment"),
                                createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Actions")
                              ])
                            ], -1)),
                            createBaseVNode("tbody", _hoisted_116, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(activeProducts.value, (p) => {
                                return (openBlock(), createElementBlock("tr", {
                                  key: p.id,
                                  class: "hover:bg-gray-50 transition-colors"
                                }, [
                                  createBaseVNode("td", _hoisted_117, [
                                    createBaseVNode("p", _hoisted_118, toDisplayString(p.name), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_119, [
                                    createBaseVNode("p", {
                                      class: "text-xs text-gray-600 line-clamp-2",
                                      title: p.description
                                    }, toDisplayString(p.description), 9, _hoisted_120)
                                  ]),
                                  createBaseVNode("td", _hoisted_121, [
                                    createBaseVNode("span", _hoisted_122, toDisplayString(p.segment), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_123, [
                                    createBaseVNode("div", _hoisted_124, [
                                      createBaseVNode("button", {
                                        onClick: $event => (campaignToView.value = p),
                                        class: "p-1 text-gray-400 hover:text-absa-energy transition-colors",
                                        title: "View"
                                      }, [...(_cache[40] || (_cache[40] = [
                                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "visibility", -1)
                                      ]))], 8, _hoisted_125),
                                      createBaseVNode("button", {
                                        onClick: $event => {campaignToEdit.value = p; uploadType.value = 'product'; showUploadModal.value = true;},
                                        class: "p-1 text-gray-400 hover:text-absa-enrich transition-colors",
                                        title: "Edit"
                                      }, [...(_cache[41] || (_cache[41] = [
                                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "edit", -1)
                                      ]))], 8, _hoisted_126),
                                      createBaseVNode("button", {
                                        onClick: $event => (deleteProduct(p.id)),
                                        class: "p-1 text-gray-400 hover:text-absa-passion transition-colors",
                                        title: "Delete"
                                      }, [...(_cache[42] || (_cache[42] = [
                                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "delete", -1)
                                      ]))], 8, _hoisted_127)
                                    ])
                                  ])
                                ]))
                              }), 128)),
                              (activeProducts.value.length === 0)
                                ? (openBlock(), createElementBlock("tr", _hoisted_128, [...(_cache[43] || (_cache[43] = [
                                    createBaseVNode("td", {
                                      colspan: "4",
                                      class: "px-5 py-8 text-center text-gray-500 text-sm font-semibold"
                                    }, " No products found. Click \"New Product\" to upload your catalog. ", -1)
                                  ]))]))
                                : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ], 64))
                  : (activeTab.value === 'cases')
                    ? (openBlock(), createElementBlock("div", _hoisted_129, [
                        createBaseVNode("div", _hoisted_130, [
                          createBaseVNode("div", _hoisted_131, [
                            _cache[46] || (_cache[46] = createBaseVNode("div", null, [
                              createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "All High-Risk Cases"),
                              createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Ranked by churn probability Â· Action differs by retention track")
                            ], -1)),
                            createBaseVNode("div", _hoisted_132, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(caseFilters, (f) => {
                                return createBaseVNode("button", {
                                  key: f.id,
                                  onClick: $event => (caseFilter.value = f.id),
                                  class: normalizeClass(['px-2.5 py-1 text-[11px] font-bold rounded-sm border', caseFilter.value === f.id ? 'bg-absa-passion text-white border-absa-passion' : 'border-gray-300 text-gray-500 hover:bg-gray-50'])
                                }, toDisplayString(f.label), 11, _hoisted_133)
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("table", _hoisted_134, [
                            _cache[47] || (_cache[47] = createBaseVNode("thead", null, [
                              createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                                createBaseVNode("th", { class: "px-5 py-3" }, "Customer"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Track"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Segment"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Churn Prob."),
                                createBaseVNode("th", { class: "px-4 py-3" }, "AUM"),
                                createBaseVNode("th", { class: "px-4 py-3" }, "Days Flagged"),
                                createBaseVNode("th", { class: "px-4 py-3 text-right" }, "Action")
                              ])
                            ], -1)),
                            createBaseVNode("tbody", _hoisted_135, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCases.value, (cust) => {
                                return (openBlock(), createElementBlock("tr", {
                                  key: cust.id,
                                  class: "hover:bg-gray-50 transition-colors"
                                }, [
                                  createBaseVNode("td", _hoisted_136, [
                                    createBaseVNode("p", _hoisted_137, toDisplayString(cust.name), 1),
                                    createBaseVNode("p", _hoisted_138, toDisplayString(cust.id), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_139, [
                                    createBaseVNode("span", _hoisted_140, toDisplayString(cust.track === 'rm' ? 'RM' : 'BRANCH'), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_141, toDisplayString(cust.segment), 1),
                                  createBaseVNode("td", _hoisted_142, [
                                    createBaseVNode("div", _hoisted_143, [
                                      createBaseVNode("div", _hoisted_144, [
                                        createBaseVNode("div", {
                                          class: normalizeClass(["h-full rounded-full", cust.prob >= 75 ? 'bg-absa-inspire' : cust.prob >= 50 ? 'bg-absa-energy' : 'bg-absa-passion']),
                                          style: normalizeStyle({ width: cust.prob + '%' })
                                        }, null, 6)
                                      ]),
                                      createBaseVNode("span", {
                                        class: normalizeClass(["font-bold font-mono text-xs", cust.prob >= 75 ? 'text-absa-inspire' : cust.prob >= 50 ? 'text-absa-energy' : 'text-absa-passion'])
                                      }, toDisplayString(cust.prob) + "% ", 3)
                                    ])
                                  ]),
                                  createBaseVNode("td", _hoisted_145, toDisplayString(cust.aum), 1),
                                  createBaseVNode("td", {
                                    class: normalizeClass(["px-4 py-3 font-mono text-xs font-bold", cust.daysFlagged > 7 ? 'text-absa-passion' : 'text-absa-energy'])
                                  }, toDisplayString(cust.daysFlagged) + "d ", 3),
                                  createBaseVNode("td", _hoisted_146, [
                                    (cust.track === 'rm')
                                      ? (openBlock(), createElementBlock("button", _hoisted_147, " Assign RM "))
                                      : (openBlock(), createElementBlock("button", _hoisted_148, " Enrol Campaign "))
                                  ])
                                ]))
                              }), 128))
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_149, [
                          createBaseVNode("div", _hoisted_150, [
                            _cache[49] || (_cache[49] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                              createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich flex items-center gap-2" }, [
                                createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion" }, "auto_awesome"),
                                createTextVNode(" AI Priority Actions ")
                              ]),
                              createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Recommended by churn intelligence engine")
                            ], -1)),
                            createBaseVNode("div", _hoisted_151, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(aiPriorityActions.value, (action, i) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: i,
                                  class: "border border-gray-200 rounded-sm p-3 bg-white hover:border-absa-passion/40 transition-colors"
                                }, [
                                  createBaseVNode("div", _hoisted_152, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(['inline-flex px-1.5 py-0.5 rounded-sm text-[10px] font-bold flex-shrink-0 mt-0.5', action.urgencyClass])
                                    }, toDisplayString(action.urgency), 3),
                                    createBaseVNode("p", _hoisted_153, toDisplayString(action.title), 1)
                                  ]),
                                  createBaseVNode("p", _hoisted_154, toDisplayString(action.detail), 1),
                                  createBaseVNode("div", _hoisted_155, [
                                    createBaseVNode("span", _hoisted_156, toDisplayString(action.meta), 1),
                                    _cache[48] || (_cache[48] = createBaseVNode("button", { class: "text-[11px] font-bold text-absa-passion hover:underline" }, "Act â†’", -1))
                                  ])
                                ]))
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_157, [
                            _cache[50] || (_cache[50] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                              createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Churn Risk by Segment")
                            ], -1)),
                            createBaseVNode("div", _hoisted_158, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(churnSegments.value, (seg) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: seg.name
                                }, [
                                  createBaseVNode("div", _hoisted_159, [
                                    createBaseVNode("div", _hoisted_160, [
                                      createBaseVNode("span", _hoisted_161, toDisplayString(seg.track === 'rm' ? 'RM' : 'BRANCH'), 1),
                                      createBaseVNode("span", _hoisted_162, toDisplayString(seg.name), 1)
                                    ]),
                                    createBaseVNode("span", _hoisted_163, toDisplayString(seg.pct) + "%", 1)
                                  ]),
                                  createBaseVNode("div", _hoisted_164, [
                                    createBaseVNode("div", {
                                      class: "h-full bg-absa-passion rounded-full",
                                      style: normalizeStyle({ width: seg.pct + '%' })
                                    }, null, 4)
                                  ])
                                ]))
                              }), 128))
                            ])
                          ])
                        ])
                      ]))
                    : createCommentVNode("", true)
        ], 64)),
    createVNode(_sfc_main$1, {
      show: showUploadModal.value,
      type: uploadType.value,
      editItem: campaignToEdit.value,
      onClose: _cache[3] || (_cache[3] = $event => {showUploadModal.value = false; campaignToEdit.value = null;}),
      onUploaded: fetchCampaigns
    }, null, 8, ["show", "type", "editItem"]),
    (campaignToView.value)
      ? (openBlock(), createElementBlock("div", _hoisted_165, [
          createBaseVNode("div", _hoisted_166, [
            createBaseVNode("div", _hoisted_167, [
              createBaseVNode("h2", _hoisted_168, toDisplayString(campaignToView.value.channel ? 'Campaign Details' : 'Product Details'), 1),
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = $event => (campaignToView.value = null)),
                class: "text-gray-400 hover:text-gray-600 transition-colors"
              }, [...(_cache[51] || (_cache[51] = [
                createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
              ]))])
            ]),
            createBaseVNode("div", _hoisted_169, [
              createBaseVNode("div", null, [
                _cache[52] || (_cache[52] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Title", -1)),
                createBaseVNode("p", _hoisted_170, toDisplayString(campaignToView.value.name), 1)
              ]),
              createBaseVNode("div", null, [
                _cache[53] || (_cache[53] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Description", -1)),
                createBaseVNode("p", _hoisted_171, toDisplayString(campaignToView.value.description || 'No description provided.'), 1)
              ]),
              createBaseVNode("div", _hoisted_172, [
                createBaseVNode("div", null, [
                  _cache[54] || (_cache[54] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Target Segment", -1)),
                  createBaseVNode("p", _hoisted_173, toDisplayString(campaignToView.value.segment), 1)
                ]),
                (campaignToView.value.channel)
                  ? (openBlock(), createElementBlock("div", _hoisted_174, [
                      _cache[55] || (_cache[55] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Channel", -1)),
                      createBaseVNode("p", _hoisted_175, [
                        createBaseVNode("span", _hoisted_176, toDisplayString(campaignToView.value.channelIcon), 1),
                        createTextVNode(" " + toDisplayString(campaignToView.value.channel), 1)
                      ])
                    ]))
                  : createCommentVNode("", true),
                (campaignToView.value.expires)
                  ? (openBlock(), createElementBlock("div", _hoisted_177, [
                      _cache[56] || (_cache[56] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Expires", -1)),
                      createBaseVNode("p", _hoisted_178, toDisplayString(campaignToView.value.expires), 1)
                    ]))
                  : createCommentVNode("", true),
                (campaignToView.value.status)
                  ? (openBlock(), createElementBlock("div", _hoisted_179, [
                      _cache[57] || (_cache[57] = createBaseVNode("h3", { class: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1" }, "Status", -1)),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm text-gray-700 font-bold", campaignToView.value.statusClass])
                      }, toDisplayString(campaignToView.value.status), 3)
                    ]))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_180, [
              createBaseVNode("button", {
                onClick: _cache[5] || (_cache[5] = $event => (campaignToView.value = null)),
                class: "px-4 py-2 bg-absa-enrich text-white rounded font-bold text-sm hover:bg-opacity-90"
              }, "Close")
            ])
          ])
        ]))
      : createCommentVNode("", true),
    createVNode(AiCampaignModal, {
      modelValue: showCampaignModal.value,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((showCampaignModal).value = $event)),
      customers: unenrolledCustomers.value,
      "source-context": "branch-manager"
    }, null, 8, ["modelValue", "customers"])
  ]))
}
}

};

export { _sfc_main as default };
