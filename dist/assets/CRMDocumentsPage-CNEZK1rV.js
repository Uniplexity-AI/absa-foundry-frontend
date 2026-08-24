import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-D3Bl0x12.js';
import { Y as apiClient, W as trackDownload, _ as shareDocument, V as updateDocument, $ as createInvoiceReference, n as getDocuments, a0 as getFolders, a1 as getDocumentStats, a2 as downloadInvoicePdf, D as emit, Z as deleteDocument, u as useCRMModule } from './CRMModule-Cs71Ed91.js';
import { g as _export_sfc, G as decodeJWT, r as ref, O as watch, D as computed, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, m as createTextVNode, l as createCommentVNode, j as normalizeClass, F as Fragment, e as renderList, v as withDirectives, x as vModelText, S as vModelSelect, a as createStaticVNode, U as API_BASE_URL, u as useRouter, h as onMounted, s as withModifiers, q as createVNode, y as unref } from './index-F0Jaczum.js';
import { D as DocumentUploadModal } from './DocumentUploadModal-DIRW2BW1.js';
import './useCurrency-B0if_ZNR.js';
import './FileSaver.min-CLGdtH5R.js';

const _hoisted_1$6 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2$6 = { class: "bg-white rounded-none shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative" };
const _hoisted_3$6 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center justify-between" };
const _hoisted_4$5 = { class: "flex items-center gap-3" };
const _hoisted_5$5 = { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_6$5 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5" };
const _hoisted_7$5 = { class: "p-6 space-y-8 relative z-10" };
const _hoisted_8$5 = { class: "flex flex-wrap gap-2" };
const _hoisted_9$5 = { class: "border border-gray-200 bg-gray-50 relative" };
const _hoisted_10$4 = { class: "flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white" };
const _hoisted_11$4 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_12$4 = {
  class: "w-full bg-gray-100 flex items-center justify-center",
  style: {"min-height":"480px"}
};
const _hoisted_13$4 = {
  key: 0,
  class: "text-center p-10"
};
const _hoisted_14$3 = {
  key: 1,
  class: "text-center p-10"
};
const _hoisted_15$3 = ["src", "alt"];
const _hoisted_16$3 = ["src", "title"];
const _hoisted_17$2 = ["src", "title"];
const _hoisted_18$2 = {
  key: 5,
  class: "text-center p-10"
};
const _hoisted_19$2 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2" };
const _hoisted_20$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden" };
const _hoisted_21$1 = { class: "space-y-6 relative z-10" };
const _hoisted_22$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_23$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_24$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_25$1 = { class: "space-y-6 relative z-10" };
const _hoisted_26$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_27$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_28$1 = { key: 0 };
const _hoisted_29$1 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_30$1 = { key: 0 };
const _hoisted_31$1 = { class: "text-gray-900 mt-1" };
const _hoisted_32$1 = { key: 1 };
const _hoisted_33$1 = { class: "flex flex-wrap gap-2 mt-2" };


const _sfc_main$6 = {
  __name: 'DocumentDetailModal',
  props: {
  modelValue: Boolean,
  document: Object
},
  emits: ['update:modelValue', 'refresh'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();

const props = __props;

const emit = __emit;

const previewError = ref(false);

watch(() => props.document?._id || props.document?.id, () => {
  previewError.value = false;
});

const fullFileUrl = computed(() => {
  const url = props.document?.file_url;
  if (!url) return '';
  return url.startsWith('http') ? url : `${apiClient.defaults.baseURL}${url}`;
});

const extension = computed(() => {
  const name = props.document?.name || props.document?.file_name || props.document?.file_url || '';
  const fromName = name.split('?')[0].split('#')[0].split('.').pop();
  const ext = (fromName || props.document?.file_type || '').toString().toLowerCase();
  return ext;
});

const isImage = computed(() => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(extension.value));
const isPdf = computed(() => extension.value === 'pdf' || props.document?.file_type === 'pdf');
const isText = computed(() => ['txt', 'csv', 'json', 'log', 'md', 'xml', 'html'].includes(extension.value));

const previewLabel = computed(() => {
  if (props.document?.file_type === 'invoice_ref') return 'INVOICE REF';
  if (isImage.value) return 'IMAGE';
  if (isPdf.value) return 'PDF';
  if (isText.value) return 'TEXT';
  return extension.value ? extension.value.toUpperCase() : 'FILE';
});

function close() {
  emit('update:modelValue', false);
}

function openInNewTab() {
  if (fullFileUrl.value) {
    window.open(fullFileUrl.value, '_blank', 'noopener,noreferrer');
  }
}

async function downloadDocument() {
  try {
    const tenantId = getTenantId();
    const docId = props.document?._id || props.document?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await trackDownload(docId, tenantId);
    
    if (props.document.file_url) {
      const fullUrl = props.document.file_url.startsWith('http') ? props.document.file_url : `${apiClient.defaults.baseURL}${props.document.file_url}`;
      window.open(fullUrl, '_blank');
    } else {
      alert('No file URL available for this document');
    }
    
    emit('refresh');
  } catch (error) {
    console.error('Failed to download:', error);
    alert('Failed to download document');
  }
}

function getFileIcon(fileType) {
  const icons = {
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'xls': 'fas fa-file-excel',
    'xlsx': 'fas fa-file-excel',
    'image': 'fas fa-file-image',
    'jpg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
  };
  return icons[fileType?.toLowerCase()] || 'fas fa-file';
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

return (_ctx, _cache) => {
  return (__props.modelValue && __props.document)
    ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          _cache[21] || (_cache[21] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", _hoisted_3$6, [
            createBaseVNode("div", _hoisted_4$5, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
              createBaseVNode("div", null, [
                createBaseVNode("h3", _hoisted_5$5, toDisplayString(__props.document.name), 1),
                createBaseVNode("p", _hoisted_6$5, "v" + toDisplayString(__props.document.version) + " • " + toDisplayString(formatDate(__props.document.created_at)), 1)
              ])
            ]),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[3] || (_cache[3] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_7$5, [
            createBaseVNode("div", _hoisted_8$5, [
              createBaseVNode("button", {
                onClick: downloadDocument,
                class: "px-6 py-2.5 bg-white border border-gray-200 text-green-600 font-bold font-mono text-[10px] rounded-none hover:bg-green-50 hover:border-green-600 transition flex items-center gap-2 uppercase tracking-widest shadow-none"
              }, [...(_cache[4] || (_cache[4] = [
                createBaseVNode("i", { class: "fas fa-download" }, null, -1),
                createTextVNode(" Download ", -1)
              ]))]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('refresh'))),
                class: "px-6 py-2.5 bg-white border border-gray-200 text-[#2F2E8B] font-bold font-mono text-[10px] rounded-none hover:bg-blue-50 hover:border-[#2F2E8B] transition flex items-center gap-2 uppercase tracking-widest shadow-none"
              }, [...(_cache[5] || (_cache[5] = [
                createBaseVNode("i", { class: "fas fa-sync" }, null, -1),
                createTextVNode(" Refresh ", -1)
              ]))]),
              (fullFileUrl.value)
                ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: openInNewTab,
                    class: "px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold font-mono text-[10px] rounded-none hover:bg-gray-50 hover:border-gray-400 transition flex items-center gap-2 uppercase tracking-widest shadow-none"
                  }, [...(_cache[6] || (_cache[6] = [
                    createBaseVNode("i", { class: "fas fa-external-link-alt" }, null, -1),
                    createTextVNode(" Open in New Tab ", -1)
                  ]))]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_9$5, [
              createBaseVNode("div", _hoisted_10$4, [
                _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "File Preview", -1)),
                createBaseVNode("p", _hoisted_11$4, toDisplayString(previewLabel.value), 1)
              ]),
              createBaseVNode("div", _hoisted_12$4, [
                (__props.document.file_type === 'invoice_ref')
                  ? (openBlock(), createElementBlock("div", _hoisted_13$4, [...(_cache[8] || (_cache[8] = [
                      createBaseVNode("i", { class: "fas fa-file-invoice text-5xl text-[#2F2E8B] mb-4" }, null, -1),
                      createBaseVNode("p", { class: "text-sm font-bold text-gray-700 font-display uppercase tracking-tight" }, "Invoice / Quote Reference", -1),
                      createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2" }, "Open the invoicing module to view the PDF", -1)
                    ]))]))
                  : (!fullFileUrl.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_14$3, [...(_cache[9] || (_cache[9] = [
                        createBaseVNode("i", { class: "fas fa-file-excel text-5xl text-gray-300 mb-4" }, null, -1),
                        createBaseVNode("p", { class: "text-sm font-bold text-gray-700 font-display uppercase tracking-tight" }, "No File Available", -1),
                        createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2" }, "This document has no attached file URL", -1)
                      ]))]))
                    : (isImage.value)
                      ? (openBlock(), createElementBlock("img", {
                          key: 2,
                          src: fullFileUrl.value,
                          alt: __props.document.name,
                          class: "max-w-full max-h-[70vh] object-contain bg-white",
                          onError: _cache[1] || (_cache[1] = $event => (previewError.value = true))
                        }, null, 40, _hoisted_15$3))
                      : (isPdf.value)
                        ? (openBlock(), createElementBlock("iframe", {
                            key: 3,
                            src: fullFileUrl.value,
                            class: "w-full bg-white",
                            style: {"height":"70vh","border":"0"},
                            title: __props.document.name
                          }, null, 8, _hoisted_16$3))
                        : (isText.value)
                          ? (openBlock(), createElementBlock("iframe", {
                              key: 4,
                              src: fullFileUrl.value,
                              class: "w-full bg-white",
                              style: {"height":"70vh","border":"0"},
                              title: __props.document.name
                            }, null, 8, _hoisted_17$2))
                          : (openBlock(), createElementBlock("div", _hoisted_18$2, [
                              createBaseVNode("i", {
                                class: normalizeClass([getFileIcon(extension.value), "text-5xl text-[#2F2E8B] mb-4"])
                              }, null, 2),
                              _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-sm font-bold text-gray-700 font-display uppercase tracking-tight" }, "Preview Not Available", -1)),
                              createBaseVNode("p", _hoisted_19$2, toDisplayString(extension.value ? extension.value.toUpperCase() : 'FILE') + " files cannot be previewed inline", 1),
                              createBaseVNode("button", {
                                onClick: downloadDocument,
                                class: "mt-4 px-6 py-2.5 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition uppercase tracking-widest"
                              }, [...(_cache[10] || (_cache[10] = [
                                createBaseVNode("i", { class: "fas fa-download mr-2" }, null, -1),
                                createTextVNode(" Download to View ", -1)
                              ]))])
                            ]))
              ])
            ]),
            createBaseVNode("div", _hoisted_20$1, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_21$1, [
                createBaseVNode("div", null, [
                  _cache[12] || (_cache[12] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Category", -1)),
                  createBaseVNode("p", _hoisted_22$1, toDisplayString(__props.document.category || 'N/A'), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[13] || (_cache[13] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "File Size", -1)),
                  createBaseVNode("p", _hoisted_23$1, toDisplayString(formatFileSize(__props.document.file_size)), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[14] || (_cache[14] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Uploaded By", -1)),
                  createBaseVNode("p", _hoisted_24$1, toDisplayString(__props.document.uploaded_by), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_25$1, [
                createBaseVNode("div", null, [
                  _cache[15] || (_cache[15] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Views", -1)),
                  createBaseVNode("p", _hoisted_26$1, toDisplayString(__props.document.views), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[16] || (_cache[16] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Downloads", -1)),
                  createBaseVNode("p", _hoisted_27$1, toDisplayString(__props.document.downloads), 1)
                ]),
                (__props.document.linked_to_type)
                  ? (openBlock(), createElementBlock("div", _hoisted_28$1, [
                      _cache[17] || (_cache[17] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Linked To", -1)),
                      createBaseVNode("p", _hoisted_29$1, toDisplayString(__props.document.linked_to_type), 1)
                    ]))
                  : createCommentVNode("", true)
              ])
            ]),
            (__props.document.description)
              ? (openBlock(), createElementBlock("div", _hoisted_30$1, [
                  _cache[19] || (_cache[19] = createBaseVNode("label", { class: "text-sm font-semibold text-gray-600" }, "Description", -1)),
                  createBaseVNode("p", _hoisted_31$1, toDisplayString(__props.document.description), 1)
                ]))
              : createCommentVNode("", true),
            (__props.document.tags && __props.document.tags.length > 0)
              ? (openBlock(), createElementBlock("div", _hoisted_32$1, [
                  _cache[20] || (_cache[20] = createBaseVNode("label", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Tags", -1)),
                  createBaseVNode("div", _hoisted_33$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.document.tags, (tag) => {
                      return (openBlock(), createElementBlock("span", {
                        key: tag,
                        class: "px-3 py-1 bg-gray-50 border border-gray-100 text-[9px] font-mono font-bold text-gray-400 uppercase"
                      }, toDisplayString(tag), 1))
                    }), 128))
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", { class: "bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20" }, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
            }, " Close ")
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const DocumentDetailModal = /*#__PURE__*/_export_sfc(_sfc_main$6, [['__scopeId',"data-v-06b84f6d"]]);

const _hoisted_1$5 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2$5 = { class: "bg-white rounded-none shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border border-gray-200 relative" };
const _hoisted_3$5 = { class: "p-6 space-y-6 relative z-10" };
const _hoisted_4$4 = { class: "flex items-start gap-4 p-4 bg-gray-50/50 border border-gray-100 relative overflow-hidden" };
const _hoisted_5$4 = { class: "relative z-10" };
const _hoisted_6$4 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_7$4 = { class: "flex items-center justify-between p-4 border border-gray-100" };
const _hoisted_8$4 = ["disabled"];
const _hoisted_9$4 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_10$3 = { class: "flex gap-2" };
const _hoisted_11$3 = ["value"];
const _hoisted_12$3 = {
  key: 1,
  class: "flex justify-center py-4"
};
const _hoisted_13$3 = {
  key: 2,
  class: "text-center py-8 bg-gray-50/30 border border-dashed border-gray-200"
};


const _sfc_main$5 = {
  __name: 'DocumentShareModal',
  props: {
  modelValue: Boolean,
  document: Object
},
  emits: ['update:modelValue', 'shared'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();

const props = __props;

const emit = __emit;

// State
const updating = ref(false);
const copied = ref(false);
const isPublic = ref(false);
const publicLink = ref(null);

// Computed
const fullPublicLink = computed(() => {
  if (!publicLink.value) return '';
  const baseUrl = window.location.origin;
  return `${baseUrl}/view/doc/${publicLink.value}`;
});

// Watch for document changes
watch(() => props.document, (newDoc) => {
  if (newDoc) {
    isPublic.value = !!newDoc.is_public;
    publicLink.value = newDoc.public_link || null;
  }
}, { immediate: true });

// Methods
async function togglePublicAccess() {
  updating.value = true;
  try {
    const tenantId = getTenantId();
    const result = await shareDocument(props.document._id, {
      is_public: !isPublic.value
    }, tenantId);
    
    isPublic.value = !isPublic.value;
    publicLink.value = result.public_link || null;
    
    emit('shared');
  } catch (error) {
    console.error('Failed to update sharing settings:', error);
    alert('Failed to update sharing settings');
  } finally {
    updating.value = false;
  }
}

function copyLink() {
  if (!fullPublicLink.value) return;
  
  navigator.clipboard.writeText(fullPublicLink.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function close() {
  emit('update:modelValue', false);
}

function getFileIcon(fileType) {
  const icons = {
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'xls': 'fas fa-file-excel',
    'xlsx': 'fas fa-file-excel',
    'image': 'fas fa-file-image',
    'jpg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
  };
  return icons[fileType?.toLowerCase()] || 'fas fa-file';
}

return (_ctx, _cache) => {
  return (__props.modelValue && __props.document)
    ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$5, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between" }, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
              createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" }, " Share Document ")
            ], -1)),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[0] || (_cache[0] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_3$5, [
            createBaseVNode("div", _hoisted_4$4, [
              _cache[3] || (_cache[3] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none" }, null, -1)),
              createBaseVNode("i", {
                class: normalizeClass([getFileIcon(__props.document.file_type), "text-3xl text-gray-300 relative z-10"])
              }, null, 2),
              createBaseVNode("div", _hoisted_5$4, [
                _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Sharing Document", -1)),
                createBaseVNode("h4", _hoisted_6$4, toDisplayString(__props.document.name), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_7$4, [
              _cache[4] || (_cache[4] = createBaseVNode("div", null, [
                createBaseVNode("h5", { class: "text-xs font-black text-gray-900 font-display uppercase tracking-tight" }, "Public Link Access"),
                createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Anyone with the link can view this document")
              ], -1)),
              createBaseVNode("button", {
                onClick: togglePublicAccess,
                disabled: updating.value,
                class: normalizeClass([isPublic.value ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-300', "w-12 h-6 border transition-colors relative"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass([isPublic.value ? 'translate-x-6' : 'translate-x-0', "absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white transition-transform"])
                }, null, 2)
              ], 10, _hoisted_8$4)
            ]),
            (isPublic.value && publicLink.value)
              ? (openBlock(), createElementBlock("div", _hoisted_9$4, [
                  _cache[5] || (_cache[5] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Direct access link", -1)),
                  createBaseVNode("div", _hoisted_10$3, [
                    createBaseVNode("input", {
                      ref: "linkInput",
                      type: "text",
                      readonly: "",
                      value: fullPublicLink.value,
                      class: "flex-1 px-4 py-2 bg-gray-50 border border-gray-200 text-[10px] font-mono focus:outline-none"
                    }, null, 8, _hoisted_11$3),
                    createBaseVNode("button", {
                      onClick: copyLink,
                      class: "px-4 py-2 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] uppercase hover:opacity-90 transition shadow-md"
                    }, toDisplayString(copied.value ? 'COPIED' : 'COPY'), 1)
                  ])
                ]))
              : (updating.value)
                ? (openBlock(), createElementBlock("div", _hoisted_12$3, [...(_cache[6] || (_cache[6] = [
                    createBaseVNode("div", { class: "animate-spin rounded-none h-6 w-6 border-b-2 border-[#2F2E8B]" }, null, -1)
                  ]))]))
                : (!isPublic.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_13$3, [...(_cache[7] || (_cache[7] = [
                      createBaseVNode("i", { class: "fas fa-lock text-gray-300 text-3xl mb-3" }, null, -1),
                      createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "This document is currently private", -1)
                    ]))]))
                  : createCommentVNode("", true)
          ]),
          createBaseVNode("div", { class: "bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20" }, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
            }, " Close ")
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const DocumentShareModal = /*#__PURE__*/_export_sfc(_sfc_main$5, [['__scopeId',"data-v-d2fbfa24"]]);

const _hoisted_1$4 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2$4 = { class: "bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative" };
const _hoisted_3$4 = { class: "p-6 space-y-6 relative z-10" };


const _sfc_main$4 = {
  __name: 'DocumentEditModal',
  props: {
  modelValue: Boolean,
  document: Object
},
  emits: ['update:modelValue', 'updated'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();

const props = __props;

const emit = __emit;

const form = ref({
  name: '',
  category: '',
  description: ''
});

watch(() => props.document, (newDoc) => {
  if (newDoc) {
    form.value = {
      name: newDoc.name || '',
      category: newDoc.category || '',
      description: newDoc.description || ''
    };
  }
}, { immediate: true });

async function saveChanges() {
  try {
    const tenantId = getTenantId();
    const docId = props.document?._id || props.document?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await updateDocument(docId, form.value, tenantId);
    emit('updated');
    close();
  } catch (error) {
    console.error('Failed to update document:', error);
    alert('Failed to update document');
  }
}

function close() {
  emit('update:modelValue', false);
}

return (_ctx, _cache) => {
  return (__props.modelValue && __props.document)
    ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between" }, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
              createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" }, " Edit Document ")
            ], -1)),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[3] || (_cache[3] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("div", null, [
              _cache[5] || (_cache[5] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Document Name", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.name) = $event)),
                type: "text",
                class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
              }, null, 512), [
                [vModelText, form.value.name]
              ])
            ]),
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Category", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.category) = $event)),
                class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
              }, [...(_cache[6] || (_cache[6] = [
                createStaticVNode("<option value=\"contract\" data-v-b1c6c4f1>CONTRACT</option><option value=\"invoice\" data-v-b1c6c4f1>INVOICE</option><option value=\"proposal\" data-v-b1c6c4f1>PROPOSAL</option><option value=\"quotation\" data-v-b1c6c4f1>QUOTATION</option><option value=\"presentation\" data-v-b1c6c4f1>PRESENTATION</option><option value=\"other\" data-v-b1c6c4f1>OTHER</option>", 6)
              ]))], 512), [
                [vModelSelect, form.value.category]
              ])
            ]),
            createBaseVNode("div", null, [
              _cache[8] || (_cache[8] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Description", -1)),
              withDirectives(createBaseVNode("textarea", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.description) = $event)),
                rows: "3",
                class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
              }, null, 512), [
                [vModelText, form.value.description]
              ])
            ])
          ]),
          createBaseVNode("div", { class: "bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20" }, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
            }, " Cancel "),
            createBaseVNode("button", {
              onClick: saveChanges,
              class: "px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md uppercase tracking-widest"
            }, " Save Changes ")
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const DocumentEditModal = /*#__PURE__*/_export_sfc(_sfc_main$4, [['__scopeId',"data-v-b1c6c4f1"]]);

/**
 * Modules API Service
 * Handles module subscription checks and management
 */

const { getTenantId, getToken } = decodeJWT();

/**
 * Check if tenant has access to a specific module
 * @param {string} moduleId - Module ID to check (e.g., 'invoicing', 'crm')
 * @returns {Promise<boolean>} - True if subscribed, false otherwise
 */
async function checkModuleSubscription(moduleId) {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) {
      console.error('No tenant ID found');
      return false;
    }

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch modules:', response.status);
      return false;
    }

    const data = await response.json();
    const subscribedModules = data.modules || [];

    // Check if the module is in the subscribed list
    return subscribedModules.includes(moduleId);
  } catch (error) {
    console.error('Error checking module subscription:', error);
    return false;
  }
}

/**
 * Request subscription to a module
 * @param {string} moduleId - Module ID to subscribe to
 * @param {string} subscriptionType - Optional subscription type
 * @returns {Promise<Object>} - Response with success status and message
 */
async function requestModuleSubscription(modules, paymentPlan = null, tier = null, extraPayload = null) {
  try {
    const tenantId = getTenantId();
    const token = getToken();

    if (!tenantId) {
      throw new Error('No tenant ID found');
    }

    // Handle both single module ID (string) and array of IDs
    const moduleList = Array.isArray(modules) ? modules : [modules];

    const body = {
      modules: moduleList
    };

    if (paymentPlan) {
      body.payment_plan = paymentPlan;
    }

    if (tier) {
      body.tier = tier;
    }

    // Merge extra capacity fields (custom_users, custom_branches, etc.)
    if (extraPayload) {
      if (extraPayload.custom_users != null) body.custom_users = extraPayload.custom_users;
      if (extraPayload.custom_branches != null) body.custom_branches = extraPayload.custom_branches;
      if (extraPayload.selected_storage_id != null) body.selected_storage_id = extraPayload.selected_storage_id;
      if (extraPayload.total_est != null) body.total_est = extraPayload.total_est;
    }

    const response = await fetch(
      `${API_BASE_URL}/modules-manager/owner/modules/select?tenant_id=${tenantId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to request module subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error requesting module subscription:', error);
    throw error;
  }
}

const _hoisted_1$3 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2$3 = { class: "bg-white rounded-none shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in border border-gray-200 relative" };
const _hoisted_3$3 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between relative z-10" };
const _hoisted_4$3 = { class: "flex items-center gap-3" };
const _hoisted_5$3 = { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_6$3 = { class: "p-8 space-y-6" };
const _hoisted_7$3 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_8$3 = {
  key: 1,
  class: "bg-orange-50/30 border border-orange-100 p-8"
};
const _hoisted_9$3 = { class: "flex items-start gap-4" };
const _hoisted_10$2 = {
  key: 2,
  class: "space-y-6"
};
const _hoisted_11$2 = { class: "flex border border-gray-100 p-1 bg-gray-50/50" };
const _hoisted_12$2 = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
};
const _hoisted_13$2 = {
  key: 1,
  class: "space-y-6"
};
const _hoisted_14$2 = { class: "bg-blue-50/30 border border-blue-100 p-6 relative overflow-hidden" };
const _hoisted_15$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" };
const _hoisted_16$2 = { class: "md:col-span-2" };
const _hoisted_17$1 = {
  key: 0,
  class: "text-center text-[10px] font-mono font-bold text-[#2F2E8B] animate-pulse"
};
const _hoisted_18$1 = { class: "bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100 relative z-20" };
const _hoisted_19$1 = ["disabled"];


const _sfc_main$3 = {
  __name: 'InvoiceCreationModal',
  props: {
  modelValue: Boolean
},
  emits: ['update:modelValue', 'subscription-required', 'created'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();
const router = useRouter();

const props = __props;

const emit = __emit;

const hasInvoicingAccess = ref(false);
const checkingAccess = ref(true);
const mode = ref('redirect'); // 'redirect' or 'link'
const submitting = ref(false);

const referenceForm = ref({
  name: '',
  category: 'invoice',
  reference_id: ''
});

async function checkSubscription() {
  try {
    checkingAccess.value = true;
    hasInvoicingAccess.value = await checkModuleSubscription('invoicing');
  } catch (error) {
    console.error('Error checking invoicing subscription:', error);
    hasInvoicingAccess.value = false;
  } finally {
    checkingAccess.value = false;
  }
}

async function createReference() {
  if (!referenceForm.value.reference_id || !referenceForm.value.name) return;
  
  submitting.value = true;
  try {
    const tenantId = getTenantId();
    await createInvoiceReference({
      ...referenceForm.value,
      // Pass IDs if we want to be explicit, but reference_id is used by backend to find the invoice
      invoice_id: referenceForm.value.category === 'invoice' ? referenceForm.value.reference_id : null,
      quote_id: referenceForm.value.category === 'quotation' ? referenceForm.value.reference_id : null,
    }, tenantId);
    
    emit('created');
    close();
  } catch (error) {
    console.error('Failed to create reference:', error);
    alert('Failed to link document reference: ' + (error.message || 'ID not found'));
  } finally {
    submitting.value = false;
  }
}

function goToInvoicing() {
  // Clear any old data
  sessionStorage.removeItem('crm_invoice_data');
  
  // Navigate to invoicing module
  router.push('/dashboard/invoicing');
  close();
}

function close() {
  emit('update:modelValue', false);
}

// Check subscription when modal opens
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    checkSubscription();
  }
});

// Initial check
onMounted(() => {
  if (props.modelValue) {
    checkSubscription();
  }
});

return (_ctx, _cache) => {
  return (__props.modelValue)
    ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("div", _hoisted_4$3, [
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
              createBaseVNode("h3", _hoisted_5$3, toDisplayString(mode.value === 'link' ? 'Link Existing Asset' : 'Generate New Asset'), 1)
            ]),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[8] || (_cache[8] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_6$3, [
            (checkingAccess.value)
              ? (openBlock(), createElementBlock("div", _hoisted_7$3, [...(_cache[9] || (_cache[9] = [
                  createBaseVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" }, null, -1),
                  createBaseVNode("p", { class: "text-gray-600" }, "Checking subscription access...", -1)
                ]))]))
              : (!hasInvoicingAccess.value)
                ? (openBlock(), createElementBlock("div", _hoisted_8$3, [
                    createBaseVNode("div", _hoisted_9$3, [
                      _cache[13] || (_cache[13] = createBaseVNode("div", { class: "w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0" }, [
                        createBaseVNode("i", { class: "fas fa-exclamation-triangle text-orange-500 text-xl" })
                      ], -1)),
                      createBaseVNode("div", null, [
                        _cache[11] || (_cache[11] = createBaseVNode("h4", { class: "text-lg font-black text-gray-900 font-display uppercase tracking-tight mb-2" }, "Subscription Required", -1)),
                        _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-4" }, [
                          createTextVNode(" You need access to the "),
                          createBaseVNode("span", { class: "text-orange-600" }, "Invoicing Module"),
                          createTextVNode(" to authorize document generation. ")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: _cache[0] || (_cache[0] = $event => {_ctx.$emit('subscription-required'); close();}),
                          class: "px-8 py-3 bg-orange-600 text-white font-bold font-mono text-[10px] rounded-none hover:bg-orange-700 transition shadow-md flex items-center gap-3 uppercase tracking-widest"
                        }, [...(_cache[10] || (_cache[10] = [
                          createBaseVNode("i", { class: "fas fa-rocket" }, null, -1),
                          createBaseVNode("span", null, "Authorize Subscription", -1)
                        ]))])
                      ])
                    ])
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_10$2, [
                    createBaseVNode("div", _hoisted_11$2, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (mode.value = 'redirect')),
                        class: normalizeClass([mode.value === 'redirect' ? 'bg-white text-[#2F2E8B] shadow-none' : 'text-gray-400 hover:text-gray-600', "flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"])
                      }, " Redirect to Module ", 2),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = $event => (mode.value = 'link')),
                        class: normalizeClass([mode.value === 'link' ? 'bg-white text-[#2F2E8B] shadow-none' : 'text-gray-400 hover:text-gray-600', "flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"])
                      }, " Link Existing ID ", 2)
                    ]),
                    (mode.value === 'redirect')
                      ? (openBlock(), createElementBlock("div", _hoisted_12$2, [...(_cache[14] || (_cache[14] = [
                          createStaticVNode("<div class=\"text-center md:text-left\" data-v-9fe36a63><div class=\"w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto md:mx-0 mb-6\" data-v-9fe36a63><i class=\"fas fa-file-invoice text-gray-300 text-3xl\" data-v-9fe36a63></i></div><h4 class=\"text-2xl font-black text-gray-900 font-display uppercase tracking-tight mb-2\" data-v-9fe36a63>Generate Assets</h4><p class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-6\" data-v-9fe36a63> Redirecting to <span class=\"text-[#2F2E8B]\" data-v-9fe36a63>Invoicing Module</span> for document construction. </p><div class=\"bg-gray-50/50 border border-gray-100 p-6 relative overflow-hidden\" data-v-9fe36a63><div class=\"absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none\" data-v-9fe36a63></div><div class=\"flex items-start gap-3 relative z-10\" data-v-9fe36a63><i class=\"fas fa-info-circle text-[#2F2E8B] mt-1\" data-v-9fe36a63></i><div class=\"text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed\" data-v-9fe36a63><p class=\"text-gray-900 mb-1\" data-v-9fe36a63>Automated Referencing</p><p data-v-9fe36a63>Invoicing assets are automatically mapped to CRM database records.</p></div></div></div></div><div class=\"bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden\" data-v-9fe36a63><div class=\"absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none\" data-v-9fe36a63></div><h5 class=\"text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10\" data-v-9fe36a63><i class=\"fas fa-check-circle text-[#2F2E8B]\" data-v-9fe36a63></i> Module Capabilities: </h5><ul class=\"space-y-3 relative z-10\" data-v-9fe36a63><li class=\"flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest\" data-v-9fe36a63><i class=\"fas fa-check text-[#2F2E8B] mt-0.5\" data-v-9fe36a63></i><span data-v-9fe36a63>Professional Invoices &amp; Quotes</span></li><li class=\"flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest\" data-v-9fe36a63><i class=\"fas fa-check text-[#2F2E8B] mt-0.5\" data-v-9fe36a63></i><span data-v-9fe36a63>Linked Leads &amp; Deals</span></li></ul></div>", 2)
                        ]))]))
                      : (openBlock(), createElementBlock("div", _hoisted_13$2, [
                          createBaseVNode("div", _hoisted_14$2, [
                            _cache[19] || (_cache[19] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none" }, null, -1)),
                            createBaseVNode("div", _hoisted_15$2, [
                              createBaseVNode("div", null, [
                                _cache[16] || (_cache[16] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Asset Type", -1)),
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((referenceForm.value.category) = $event)),
                                  class: "w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0"
                                }, [...(_cache[15] || (_cache[15] = [
                                  createBaseVNode("option", { value: "invoice" }, "INVOICE", -1),
                                  createBaseVNode("option", { value: "quotation" }, "QUOTATION", -1)
                                ]))], 512), [
                                  [vModelSelect, referenceForm.value.category]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Asset ID (System Serial)", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((referenceForm.value.reference_id) = $event)),
                                  type: "text",
                                  placeholder: "E.G. INV-000001",
                                  class: "w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0"
                                }, null, 512), [
                                  [vModelText, referenceForm.value.reference_id]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_16$2, [
                                _cache[18] || (_cache[18] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Display Name", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((referenceForm.value.name) = $event)),
                                  type: "text",
                                  placeholder: "E.G. Q1 PROJECT INVOICE",
                                  class: "w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0"
                                }, null, 512), [
                                  [vModelText, referenceForm.value.name]
                                ])
                              ])
                            ])
                          ]),
                          (submitting.value)
                            ? (openBlock(), createElementBlock("p", _hoisted_17$1, " SYNCHRONIZING WITH BACKEND... "))
                            : createCommentVNode("", true)
                        ]))
                  ]))
          ]),
          createBaseVNode("div", _hoisted_18$1, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
            }, " Cancel "),
            (hasInvoicingAccess.value)
              ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: _cache[6] || (_cache[6] = $event => (mode.value === 'redirect' ? goToInvoicing() : createReference())),
                  disabled: mode.value === 'link' && (!referenceForm.value.reference_id || !referenceForm.value.name || submitting.value),
                  class: "px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md flex items-center gap-3 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  createBaseVNode("span", null, toDisplayString(mode.value === 'redirect' ? 'Initialize Module' : 'Authorize Link'), 1),
                  createBaseVNode("i", {
                    class: normalizeClass(mode.value === 'redirect' ? 'fas fa-arrow-right' : 'fas fa-link')
                  }, null, 2)
                ], 8, _hoisted_19$1))
              : createCommentVNode("", true)
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const InvoiceCreationModal = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-9fe36a63"]]);

const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2$2 = { class: "bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in border border-gray-200 relative" };
const _hoisted_3$2 = { class: "p-8 space-y-8 relative z-10" };
const _hoisted_4$2 = { class: "text-center" };
const _hoisted_5$2 = { class: "text-2xl font-black text-gray-900 font-display uppercase tracking-tight mb-2" };
const _hoisted_6$2 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-sm mx-auto" };
const _hoisted_7$2 = { class: "text-orange-600" };
const _hoisted_8$2 = { class: "bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden" };
const _hoisted_9$2 = { class: "space-y-3 relative z-10" };
const _hoisted_10$1 = {
  key: 0,
  class: "border border-gray-100 p-6 bg-white relative overflow-hidden"
};
const _hoisted_11$1 = { class: "flex items-center justify-between" };
const _hoisted_12$1 = { class: "text-3xl font-black text-gray-900 font-display" };
const _hoisted_13$1 = { class: "bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100 relative z-20" };
const _hoisted_14$1 = ["disabled"];
const _hoisted_15$1 = {
  key: 0,
  class: "fas fa-spinner fa-spin"
};
const _hoisted_16$1 = {
  key: 1,
  class: "fas fa-paper-plane"
};


const _sfc_main$2 = {
  __name: 'SubscriptionRequiredModal',
  props: {
  modelValue: Boolean,
  moduleId: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    default: 'Invoicing Module'
  },
  featureName: {
    type: String,
    default: 'Create Invoice/Quote'
  },
  modulePrice: {
    type: Number,
    default: null
  },
  benefits: {
    type: Array,
    default: () => [
      'Professional invoice and quotation generation',
      'Custom branding with your business logo',
      'PDF export with automated email delivery',
      'Track invoice status and payment history',
      'Automated payment reminders',
      'Multi-currency support'
    ]
  }
},
  emits: ['update:modelValue', 'requested'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const isRequesting = ref(false);

async function requestSubscription() {
  try {
    isRequesting.value = true;
    
    // Request subscription for the module
    const result = await requestModuleSubscription(props.moduleId);
    
    // Show success message
    alert(`Subscription request sent successfully! Request ID: ${result.request_id || 'N/A'}\n\nAn admin will review your request shortly.`);
    
    // Emit event
    emit('requested', result);
    
    close();
  } catch (error) {
    console.error('Failed to request subscription:', error);
    alert(`Failed to request subscription: ${error.message}`);
  } finally {
    isRequesting.value = false;
  }
}

function close() {
  emit('update:modelValue', false);
}

return (_ctx, _cache) => {
  return (__props.modelValue)
    ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between relative z-10" }, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
              createBaseVNode("div", { class: "w-1.5 h-6 bg-orange-500" }),
              createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" }, "Subscription Required")
            ], -1)),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[0] || (_cache[0] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$2, [
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6" }, [
                createBaseVNode("i", { class: "fas fa-lock text-2xl text-orange-500" })
              ], -1)),
              createBaseVNode("h4", _hoisted_5$2, toDisplayString(__props.featureName), 1),
              createBaseVNode("p", _hoisted_6$2, [
                _cache[2] || (_cache[2] = createTextVNode(" You need access to the ", -1)),
                createBaseVNode("span", _hoisted_7$2, toDisplayString(__props.moduleName), 1),
                _cache[3] || (_cache[3] = createTextVNode(" to utilize this architectural feature. ", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_8$2, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none" }, null, -1)),
              _cache[7] || (_cache[7] = createBaseVNode("h5", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10" }, [
                createBaseVNode("i", { class: "fas fa-shield-alt text-orange-500" }),
                createTextVNode(" Architectural Benefits: ")
              ], -1)),
              createBaseVNode("ul", _hoisted_9$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.benefits, (benefit, index) => {
                  return (openBlock(), createElementBlock("li", {
                    key: index,
                    class: "flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest"
                  }, [
                    _cache[5] || (_cache[5] = createBaseVNode("i", { class: "fas fa-check-circle text-orange-500 mt-1" }, null, -1)),
                    createBaseVNode("span", null, toDisplayString(benefit), 1)
                  ]))
                }), 128))
              ])
            ]),
            (__props.modulePrice !== null)
              ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
                  createBaseVNode("div", _hoisted_11$1, [
                    createBaseVNode("div", null, [
                      _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Standard Rate", -1)),
                      createBaseVNode("p", _hoisted_12$1, [
                        createTextVNode(" $" + toDisplayString(__props.modulePrice.toFixed(2)) + " ", 1),
                        _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest ml-1" }, "/ Month", -1))
                      ])
                    ]),
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center" }, [
                      createBaseVNode("i", { class: "fas fa-tag text-gray-300" })
                    ], -1))
                  ])
                ]))
              : createCommentVNode("", true),
            _cache[11] || (_cache[11] = createStaticVNode("<div class=\"bg-orange-50/30 border border-orange-100 p-4\" data-v-693a47b3><div class=\"flex items-start gap-3\" data-v-693a47b3><i class=\"fas fa-info-circle text-orange-500 mt-1\" data-v-693a47b3></i><div class=\"text-[9px] font-mono font-bold text-orange-800 uppercase tracking-widest leading-relaxed\" data-v-693a47b3><p class=\"font-black mb-1\" data-v-693a47b3>Status: Pending Approval</p><p data-v-693a47b3>Requested subscriptions are subject to administrative review. Notification will be issued upon clearance.</p></div></div></div>", 1))
          ]),
          createBaseVNode("div", _hoisted_13$1, [
            createBaseVNode("button", {
              onClick: close,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
            }, " Decline "),
            createBaseVNode("button", {
              onClick: requestSubscription,
              disabled: isRequesting.value,
              class: "px-8 py-3 bg-orange-600 text-white font-bold font-mono text-[10px] rounded-none hover:bg-orange-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest flex items-center gap-3"
            }, [
              (isRequesting.value)
                ? (openBlock(), createElementBlock("i", _hoisted_15$1))
                : (openBlock(), createElementBlock("i", _hoisted_16$1)),
              createBaseVNode("span", null, toDisplayString(isRequesting.value ? 'Deploying Request...' : 'Authorize Subscription'), 1)
            ], 8, _hoisted_14$1)
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const SubscriptionRequiredModal = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-693a47b3"]]);

const _hoisted_1$1 = { class: "documents-view space-y-6 relative" };
const _hoisted_2$1 = { class: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8" };
const _hoisted_3$1 = { class: "flex items-center gap-3" };
const _hoisted_4$1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" };
const _hoisted_5$1 = { class: "bg-white rounded-none p-5 border border-gray-100 shadow-none hover:shadow-md transition group" };
const _hoisted_6$1 = { class: "flex items-center justify-between" };
const _hoisted_7$1 = { class: "text-2xl font-black text-gray-900 font-display mt-1" };
const _hoisted_8$1 = { class: "bg-white rounded-none p-5 border border-gray-100 shadow-none hover:shadow-md transition group" };
const _hoisted_9$1 = { class: "flex items-center justify-between" };
const _hoisted_10 = { class: "text-2xl font-black text-gray-900 font-display mt-1" };
const _hoisted_11 = { class: "bg-white rounded-none p-5 border border-gray-100 shadow-none hover:shadow-md transition group" };
const _hoisted_12 = { class: "flex items-center justify-between" };
const _hoisted_13 = { class: "text-2xl font-black text-gray-900 font-display mt-1" };
const _hoisted_14 = { class: "bg-white rounded-none p-5 border border-gray-100 shadow-none hover:shadow-md transition group" };
const _hoisted_15 = { class: "flex items-center justify-between" };
const _hoisted_16 = { class: "text-2xl font-black text-gray-900 font-display mt-1" };
const _hoisted_17 = { class: "relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-none" };
const _hoisted_18 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" };
const _hoisted_19 = { class: "lg:col-span-2 relative" };
const _hoisted_20 = ["value"];
const _hoisted_21 = { class: "flex items-center gap-1 border border-gray-200 rounded-none p-1" };
const _hoisted_22 = { class: "mt-4 flex flex-wrap gap-2" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = {
  key: 0,
  class: "flex justify-center items-center py-12 relative z-10"
};
const _hoisted_25 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
};
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "bg-gray-50/50 border-b border-gray-100 p-8 flex items-center justify-center relative overflow-hidden" };
const _hoisted_28 = { class: "absolute top-3 right-3 z-10" };
const _hoisted_29 = { class: "p-4 flex-1 space-y-3" };
const _hoisted_30 = ["title"];
const _hoisted_31 = {
  key: 0,
  class: "flex flex-wrap gap-1"
};
const _hoisted_32 = {
  key: 0,
  class: "px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-bold text-gray-400 uppercase"
};
const _hoisted_33 = {
  key: 1,
  class: "flex items-center gap-2 text-[10px] font-mono font-bold text-gray-500 uppercase"
};
const _hoisted_34 = { class: "flex items-center justify-between text-[9px] font-mono font-bold text-gray-400 pt-2 border-t border-gray-50" };
const _hoisted_35 = { class: "uppercase" };
const _hoisted_36 = { class: "bg-gray-50/50 px-4 py-3 flex items-center justify-between border-t border-gray-100" };
const _hoisted_37 = { class: "text-[8px] font-mono font-black text-gray-300 uppercase" };
const _hoisted_38 = { class: "flex gap-1" };
const _hoisted_39 = ["onClick"];
const _hoisted_40 = ["onClick"];
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  key: 2,
  class: "relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-none"
};
const _hoisted_44 = { class: "overflow-x-auto" };
const _hoisted_45 = { class: "w-full border-collapse" };
const _hoisted_46 = { class: "divide-y divide-gray-50" };
const _hoisted_47 = ["onClick"];
const _hoisted_48 = { class: "py-3 px-6" };
const _hoisted_49 = { class: "flex items-center gap-3" };
const _hoisted_50 = { class: "text-[10px] font-mono font-bold text-gray-700 uppercase" };
const _hoisted_51 = { class: "text-[8px] font-mono text-gray-400 uppercase" };
const _hoisted_52 = { class: "py-3 px-6" };
const _hoisted_53 = { class: "py-3 px-6" };
const _hoisted_54 = {
  key: 0,
  class: "flex items-center gap-2 text-[10px] font-mono font-bold text-gray-500 uppercase"
};
const _hoisted_55 = {
  key: 1,
  class: "text-gray-300"
};
const _hoisted_56 = { class: "py-3 px-6 text-[10px] font-mono text-gray-500" };
const _hoisted_57 = { class: "py-3 px-6" };
const _hoisted_58 = { class: "flex items-center gap-3 text-[10px] font-mono text-gray-500" };
const _hoisted_59 = { title: "Views" };
const _hoisted_60 = { title: "Downloads" };
const _hoisted_61 = { class: "py-3 px-6 text-[10px] font-mono text-gray-500" };
const _hoisted_62 = { class: "py-3 px-6 text-right" };
const _hoisted_63 = { class: "flex items-center justify-end gap-1" };
const _hoisted_64 = ["onClick"];
const _hoisted_65 = ["onClick"];
const _hoisted_66 = ["onClick"];
const _hoisted_67 = ["onClick"];
const _hoisted_68 = {
  key: 3,
  class: "bg-white border border-gray-100 p-12 text-center rounded-none shadow-none relative overflow-hidden"
};
const _hoisted_69 = { class: "relative z-10" };
const _hoisted_70 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-8 max-w-md mx-auto" };
const _hoisted_71 = {
  key: 4,
  class: "px-4 py-3 bg-white border border-gray-100 rounded-none shadow-none flex justify-between items-center relative z-10"
};
const _hoisted_72 = { class: "text-[9px] font-mono text-gray-400 uppercase font-bold tracking-widest" };
const _hoisted_73 = { class: "flex gap-2" };
const _hoisted_74 = ["disabled"];
const _hoisted_75 = { class: "px-4 py-1.5 text-[9px] font-mono font-bold text-[#2F2E8B] border border-blue-100 bg-blue-50/50 uppercase tracking-widest" };
const _hoisted_76 = ["disabled"];
const _hoisted_77 = {
  key: 5,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
};
const _hoisted_78 = { class: "bg-white rounded-none shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border-t-4 border-red-600" };
const _hoisted_79 = { class: "p-8" };
const _hoisted_80 = { class: "text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest leading-relaxed" };
const _hoisted_81 = { class: "text-gray-900" };
const _hoisted_82 = { class: "bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100" };


const _sfc_main$1 = {
  __name: 'DocumentsView',
  setup(__props) {

const { getTenantId } = decodeJWT();
const router = useRouter();

// State
const documents = ref([]);
const folders = ref([]);
const stats = ref({});
const loading = ref(false);
const searchQuery = ref('');
const folderFilter = ref('');
const categoryFilter = ref('');
const linkedToFilter = ref('');
const viewMode = ref('grid');
const currentPage = ref(1);
const perPage = ref(24);
const totalDocs = ref(0);

// Modal states
const showUploadModal = ref(false);
const showDetailModal = ref(false);
const showShareModal = ref(false);
const showEditModal = ref(false);
const showInvoiceModal = ref(false);
const showSubscriptionModal = ref(false);
const showDeleteConfirm = ref(false);

const selectedDocument = ref(null);
const documentToShare = ref(null);
const documentToEdit = ref(null);
const documentToDelete = ref(null);

// Quick filters
const quickFilters = [
  { label: 'All Documents', value: '', icon: 'fas fa-file-alt' },
  { label: 'Linked to Leads', value: 'lead', icon: 'fas fa-user-plus' },
  { label: 'Linked to Contacts', value: 'contact', icon: 'fas fa-address-book' },
  { label: 'Linked to Accounts', value: 'account', icon: 'fas fa-building' },
  { label: 'Linked to Deals', value: 'deal', icon: 'fas fa-handshake' },
];

// Computed
const totalPages = computed(() => Math.ceil(totalDocs.value / perPage.value));

// Methods
async function loadDocuments() {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      search: searchQuery.value || undefined,
      folder: folderFilter.value || undefined,
      category: categoryFilter.value || undefined,
      linked_to_type: linkedToFilter.value || undefined,
    };

    const response = await getDocuments(tenantId, params);
    documents.value = response.items || [];
    totalDocs.value = response.total || 0;
  } catch (error) {
    console.error('Failed to load documents:', error);
    documents.value = [];
    totalDocs.value = 0;
  } finally {
    loading.value = false;
  }
}

async function loadFolders() {
  try {
    const tenantId = getTenantId();
    const folderList = await getFolders(tenantId);
    folders.value = Array.isArray(folderList) ? folderList : [];
  } catch (error) {
    console.error('Failed to load folders:', error);
    folders.value = [];
  }
}

async function loadStats() {
  try {
    const tenantId = getTenantId();
    const docStats = await getDocumentStats(tenantId);
    stats.value = docStats || {};
  } catch (error) {
    console.error('Failed to load stats:', error);
    stats.value = {};
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadDocuments();
  }, 500);
}

function applyQuickFilter(value) {
  linkedToFilter.value = value;
  currentPage.value = 1;
  loadDocuments();
}

function viewDocument(doc) {
  selectedDocument.value = doc;
  showDetailModal.value = true;
}

async function downloadDocument(doc) {
  try {
    const tenantId = getTenantId();
    const docId = doc?._id || doc?.id;
    if (!docId) {
      alert('Document ID is missing');
      return;
    }
    
    // Check if this is an invoice reference (no actual file)
    if (doc.file_type === 'invoice_ref') {
      // This is an invoice/quote reference - fetch from invoicing module
      const invoiceData = await downloadInvoicePdf(docId, tenantId);
      
      if (invoiceData.download_endpoint) {
        // Direct download via endpoint
        const downloadUrl = `${API_BASE_URL}${invoiceData.download_endpoint}`;
        window.open(downloadUrl, '_blank');
      } else {
        // Fallback to invoicing module
        if (confirm('Direct PDF generation not available from here. Go to Invoicing Module?')) {
          router.push('/dashboard/invoicing');
        }
      }
      
      // Refresh to update download count
      loadDocuments();
    } else {
      // Regular document with file
      await trackDownload(docId, tenantId);
      
      // Open document in new tab
      if (doc.file_url) {
        const fullUrl = doc.file_url.startsWith('http') ? doc.file_url : `${API_BASE_URL}${doc.file_url}`;
        window.open(fullUrl, '_blank');
      } else {
        alert('No file URL available for this document');
      }
      
      // Refresh to update download count
      loadDocuments();
    }
  } catch (error) {
    console.error('Failed to download document:', error);
    alert('Failed to download document: ' + (error.message || 'Unknown error'));
  }
}

function shareDocument(doc) {
  documentToShare.value = doc;
  showShareModal.value = true;
}

function editDocument(doc) {
  documentToEdit.value = doc;
  showEditModal.value = true;
}

function deleteDoc(doc) {
  documentToDelete.value = doc;
  showDeleteConfirm.value = true;
}

async function confirmDelete() {
  try {
    const tenantId = getTenantId();
    const docId = documentToDelete.value?._id || documentToDelete.value?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await deleteDocument(docId, tenantId);
    showDeleteConfirm.value = false;
    documentToDelete.value = null;
    await loadDocuments();
    await loadStats();
    // Broadcast change
    emit('crm:documents:changed');
  } catch (error) {
    console.error('Failed to delete document:', error);
    alert('Failed to delete document');
  }
}

function handleDocumentUploaded() {
  loadDocuments();
  loadStats();
  loadFolders();
  emit('crm:documents:changed');
}

function handleInvoiceCreated(invoice) {
  // Invoice created - refresh documents
  loadDocuments();
  loadStats();
  emit('crm:documents:changed');
}

function handleSubscriptionRequested(result) {
  console.log('Subscription requested:', result);
  // Could show a success message or update UI
  // The SubscriptionRequiredModal already shows an alert
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadDocuments();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadDocuments();
  }
}

// Utility functions
function getFileIcon(fileType) {
  const icons = {
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'xls': 'fas fa-file-excel',
    'xlsx': 'fas fa-file-excel',
    'ppt': 'fas fa-file-powerpoint',
    'pptx': 'fas fa-file-powerpoint',
    'jpg': 'fas fa-file-image',
    'jpeg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
    'gif': 'fas fa-file-image',
    'zip': 'fas fa-file-archive',
    'rar': 'fas fa-file-archive',
    'txt': 'fas fa-file-alt',
  };
  return icons[fileType?.toLowerCase()] || 'fas fa-file';
}

function getCategoryBadgeClass(category) {
  const classes = {
    'contract': 'bg-blue-50/50 border-blue-100 text-blue-600',
    'invoice': 'bg-green-50/50 border-green-100 text-green-600',
    'proposal': 'bg-purple-50/50 border-purple-100 text-purple-600',
    'quotation': 'bg-amber-50/50 border-amber-100 text-amber-600',
    'presentation': 'bg-pink-50/50 border-pink-100 text-pink-600',
    'other': 'bg-gray-50 border-gray-100 text-gray-400',
  };
  return classes[category] || 'bg-gray-50 border-gray-100 text-gray-400';
}

function getLinkedIcon(type) {
  const icons = {
    'lead': 'fas fa-user-plus',
    'contact': 'fas fa-address-book',
    'account': 'fas fa-building',
    'deal': 'fas fa-handshake',
    'campaign': 'fas fa-bullhorn',
  };
  return icons[type] || 'fas fa-link';
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Lifecycle
onMounted(() => {
  loadDocuments();
  loadFolders();
  loadStats();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    _cache[52] || (_cache[52] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background opacity-[0.4]" }, null, -1)),
    createBaseVNode("div", _hoisted_2$1, [
      _cache[18] || (_cache[18] = createBaseVNode("div", { class: "relative z-10" }, [
        createBaseVNode("h3", { class: "text-2xl font-black text-gray-900 font-display flex items-center gap-3 uppercase tracking-tight" }, [
          createBaseVNode("i", { class: "fas fa-file-alt text-[#2F2E8B]" }),
          createTextVNode(" Documents & Files ")
        ]),
        createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1" }, " Centralized document management // system_ref: documents_core ")
      ], -1)),
      createBaseVNode("div", _hoisted_3$1, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = $event => (showUploadModal.value = true)),
          class: "bg-white border border-[#2F2E8B] text-[#2F2E8B] font-bold font-mono text-[10px] rounded-none px-6 py-3 transition hover:bg-blue-50 flex items-center gap-2 uppercase tracking-wider"
        }, [...(_cache[16] || (_cache[16] = [
          createBaseVNode("i", { class: "fas fa-upload" }, null, -1),
          createTextVNode(" Upload Document ", -1)
        ]))]),
        createBaseVNode("button", {
          onClick: _cache[1] || (_cache[1] = $event => (showInvoiceModal.value = true)),
          class: "bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none px-6 py-3 transition hover:opacity-90 flex items-center gap-2 uppercase tracking-wider shadow-md"
        }, [...(_cache[17] || (_cache[17] = [
          createBaseVNode("i", { class: "fas fa-file-invoice" }, null, -1),
          createTextVNode(" Create Invoice/Quote ", -1)
        ]))])
      ])
    ]),
    createBaseVNode("div", _hoisted_4$1, [
      createBaseVNode("div", _hoisted_5$1, [
        createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("div", null, [
            _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Total Documents", -1)),
            createBaseVNode("h4", _hoisted_7$1, toDisplayString(stats.value.total_documents || 0), 1)
          ]),
          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "bg-gray-50 group-hover:bg-blue-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-blue-100" }, [
            createBaseVNode("i", { class: "fas fa-file-alt text-gray-300 group-hover:text-[#2F2E8B] text-xl transition-colors" })
          ], -1))
        ])
      ]),
      createBaseVNode("div", _hoisted_8$1, [
        createBaseVNode("div", _hoisted_9$1, [
          createBaseVNode("div", null, [
            _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Total Views", -1)),
            createBaseVNode("h4", _hoisted_10, toDisplayString(stats.value.total_views || 0), 1)
          ]),
          _cache[22] || (_cache[22] = createBaseVNode("div", { class: "bg-gray-50 group-hover:bg-purple-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-purple-100" }, [
            createBaseVNode("i", { class: "fas fa-eye text-gray-300 group-hover:text-purple-500 text-xl transition-colors" })
          ], -1))
        ])
      ]),
      createBaseVNode("div", _hoisted_11, [
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", null, [
            _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Total Downloads", -1)),
            createBaseVNode("h4", _hoisted_13, toDisplayString(stats.value.total_downloads || 0), 1)
          ]),
          _cache[24] || (_cache[24] = createBaseVNode("div", { class: "bg-gray-50 group-hover:bg-green-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-green-100" }, [
            createBaseVNode("i", { class: "fas fa-download text-gray-300 group-hover:text-green-500 text-xl transition-colors" })
          ], -1))
        ])
      ]),
      createBaseVNode("div", _hoisted_14, [
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("div", null, [
            _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Folders", -1)),
            createBaseVNode("h4", _hoisted_16, toDisplayString(folders.value.length), 1)
          ]),
          _cache[26] || (_cache[26] = createBaseVNode("div", { class: "bg-gray-50 group-hover:bg-yellow-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-yellow-100" }, [
            createBaseVNode("i", { class: "fas fa-folder text-gray-300 group-hover:text-yellow-500 text-xl transition-colors" })
          ], -1))
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_17, [
      createBaseVNode("div", _hoisted_18, [
        createBaseVNode("div", _hoisted_19, [
          _cache[27] || (_cache[27] = createBaseVNode("i", { class: "fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, null, -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((searchQuery).value = $event)),
            onInput: debouncedSearch,
            type: "text",
            placeholder: "Search documents by name, tags, description...",
            class: "w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-none text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
          }, null, 544), [
            [vModelText, searchQuery.value]
          ])
        ]),
        withDirectives(createBaseVNode("select", {
          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((folderFilter).value = $event)),
          onChange: loadDocuments,
          class: "rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
        }, [
          _cache[28] || (_cache[28] = createBaseVNode("option", { value: "" }, "All Folders", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(folders.value, (folder) => {
            return (openBlock(), createElementBlock("option", {
              key: folder,
              value: folder
            }, toDisplayString(folder), 9, _hoisted_20))
          }), 128))
        ], 544), [
          [vModelSelect, folderFilter.value]
        ]),
        withDirectives(createBaseVNode("select", {
          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((categoryFilter).value = $event)),
          onChange: loadDocuments,
          class: "rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
        }, [...(_cache[29] || (_cache[29] = [
          createStaticVNode("<option value=\"\" data-v-cdf0247b>All Categories</option><option value=\"contract\" data-v-cdf0247b>Contracts</option><option value=\"invoice\" data-v-cdf0247b>Invoices</option><option value=\"proposal\" data-v-cdf0247b>Proposals</option><option value=\"quotation\" data-v-cdf0247b>Quotations</option><option value=\"presentation\" data-v-cdf0247b>Presentations</option><option value=\"other\" data-v-cdf0247b>Other</option>", 7)
        ]))], 544), [
          [vModelSelect, categoryFilter.value]
        ]),
        createBaseVNode("div", _hoisted_21, [
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = $event => (viewMode.value = 'grid')),
            class: normalizeClass([viewMode.value === 'grid' ? 'bg-brand text-white' : 'text-gray-400 hover:text-brand hover:bg-brand/5', "flex-1 px-3 py-1.5 rounded-none transition-all flex items-center justify-center"])
          }, [...(_cache[30] || (_cache[30] = [
            createBaseVNode("i", { class: "fas fa-th text-xs" }, null, -1)
          ]))], 2),
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = $event => (viewMode.value = 'list')),
            class: normalizeClass([viewMode.value === 'list' ? 'bg-brand text-white' : 'text-gray-400 hover:text-brand hover:bg-brand/5', "flex-1 px-3 py-1.5 rounded-none transition-all flex items-center justify-center"])
          }, [...(_cache[31] || (_cache[31] = [
            createBaseVNode("i", { class: "fas fa-list text-xs" }, null, -1)
          ]))], 2)
        ])
      ]),
      createBaseVNode("div", _hoisted_22, [
        (openBlock(), createElementBlock(Fragment, null, renderList(quickFilters, (quickFilter) => {
          return createBaseVNode("button", {
            key: quickFilter.value,
            onClick: $event => (applyQuickFilter(quickFilter.value)),
            class: normalizeClass([linkedToFilter.value === quickFilter.value ? 'bg-brand text-white border-brand shadow-none' : 'bg-white text-gray-400 border-gray-200 hover:border-brand hover:text-brand hover:bg-brand/5', "px-4 py-2 border rounded-none text-[9px] font-mono font-bold uppercase tracking-wider transition-all"])
          }, [
            createBaseVNode("i", {
              class: normalizeClass([quickFilter.icon, "mr-2"])
            }, null, 2),
            createTextVNode(" " + toDisplayString(quickFilter.label), 1)
          ], 10, _hoisted_23)
        }), 64))
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_24, [...(_cache[32] || (_cache[32] = [
          createBaseVNode("div", { class: "animate-spin rounded-none h-12 w-12 border-b-2 border-[#2F2E8B]" }, null, -1)
        ]))]))
      : (viewMode.value === 'grid' && documents.value.length > 0)
        ? (openBlock(), createElementBlock("div", _hoisted_25, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(documents.value, (doc) => {
              return (openBlock(), createElementBlock("div", {
                key: doc._id,
                onClick: $event => (viewDocument(doc)),
                class: "group bg-white rounded-none shadow-none border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
              }, [
                createBaseVNode("div", _hoisted_27, [
                  _cache[33] || (_cache[33] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_28, [
                    createBaseVNode("span", {
                      class: normalizeClass([getCategoryBadgeClass(doc.category), "px-2 py-1 rounded-none text-[8px] font-black font-mono uppercase tracking-widest border bg-white"])
                    }, toDisplayString(doc.category || 'other'), 3)
                  ]),
                  createBaseVNode("i", {
                    class: normalizeClass([getFileIcon(doc.file_type), "text-6xl text-gray-300 group-hover:text-brand transition-colors relative z-10"])
                  }, null, 2)
                ]),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("h4", {
                    class: "text-[11px] font-black text-gray-900 uppercase tracking-tight truncate group-hover:text-brand transition",
                    title: doc.name
                  }, toDisplayString(doc.name), 9, _hoisted_30),
                  (doc.tags && doc.tags.length > 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_31, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(doc.tags.slice(0, 3), (tag) => {
                          return (openBlock(), createElementBlock("span", {
                            key: tag,
                            class: "px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-bold text-gray-400 uppercase"
                          }, toDisplayString(tag), 1))
                        }), 128)),
                        (doc.tags.length > 3)
                          ? (openBlock(), createElementBlock("span", _hoisted_32, " +" + toDisplayString(doc.tags.length - 3), 1))
                          : createCommentVNode("", true)
                      ]))
                    : createCommentVNode("", true),
                  (doc.linked_to_type)
                    ? (openBlock(), createElementBlock("div", _hoisted_33, [
                        createBaseVNode("i", {
                          class: normalizeClass([getLinkedIcon(doc.linked_to_type), "text-brand"])
                        }, null, 2),
                        createBaseVNode("span", null, toDisplayString(doc.linked_to_type), 1)
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("span", null, toDisplayString(formatFileSize(doc.file_size)), 1),
                    createBaseVNode("span", _hoisted_35, toDisplayString(doc.file_type), 1)
                  ])
                ]),
                createBaseVNode("div", _hoisted_36, [
                  createBaseVNode("span", _hoisted_37, " v" + toDisplayString(doc.version), 1),
                  createBaseVNode("div", _hoisted_38, [
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (downloadDocument(doc)), ["stop"]),
                      class: "p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors",
                      title: "Download"
                    }, [...(_cache[34] || (_cache[34] = [
                      createBaseVNode("i", { class: "fas fa-download text-xs" }, null, -1)
                    ]))], 8, _hoisted_39),
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (shareDocument(doc)), ["stop"]),
                      class: "p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",
                      title: "Share"
                    }, [...(_cache[35] || (_cache[35] = [
                      createBaseVNode("i", { class: "fas fa-share-alt text-xs" }, null, -1)
                    ]))], 8, _hoisted_40),
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (editDocument(doc)), ["stop"]),
                      class: "p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors",
                      title: "Edit"
                    }, [...(_cache[36] || (_cache[36] = [
                      createBaseVNode("i", { class: "fas fa-edit text-xs" }, null, -1)
                    ]))], 8, _hoisted_41),
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (deleteDoc(doc)), ["stop"]),
                      class: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors",
                      title: "Delete"
                    }, [...(_cache[37] || (_cache[37] = [
                      createBaseVNode("i", { class: "fas fa-trash text-xs" }, null, -1)
                    ]))], 8, _hoisted_42)
                  ])
                ])
              ], 8, _hoisted_26))
            }), 128))
          ]))
        : (viewMode.value === 'list' && documents.value.length > 0)
          ? (openBlock(), createElementBlock("div", _hoisted_43, [
              createBaseVNode("div", _hoisted_44, [
                createBaseVNode("table", _hoisted_45, [
                  _cache[44] || (_cache[44] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", { class: "bg-gray-50 border-b border-gray-100" }, [
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Document"),
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Category"),
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Linked To"),
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Size"),
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Stats"),
                      createBaseVNode("th", { class: "py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Uploaded"),
                      createBaseVNode("th", { class: "py-3 px-6 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Actions")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", _hoisted_46, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(documents.value, (doc) => {
                      return (openBlock(), createElementBlock("tr", {
                        key: doc._id,
                        class: "hover:bg-gray-50/50 transition-colors group cursor-pointer",
                        onClick: $event => (viewDocument(doc))
                      }, [
                        createBaseVNode("td", _hoisted_48, [
                          createBaseVNode("div", _hoisted_49, [
                            createBaseVNode("i", {
                              class: normalizeClass([getFileIcon(doc.file_type), "text-xl text-gray-300 group-hover:text-brand transition-colors"])
                            }, null, 2),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_50, toDisplayString(doc.name), 1),
                              createBaseVNode("div", _hoisted_51, toDisplayString(doc.file_type), 1)
                            ])
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_52, [
                          createBaseVNode("span", {
                            class: normalizeClass([getCategoryBadgeClass(doc.category), "px-2 py-1 rounded-none text-[8px] font-black font-mono uppercase tracking-widest border"])
                          }, toDisplayString(doc.category || 'other'), 3)
                        ]),
                        createBaseVNode("td", _hoisted_53, [
                          (doc.linked_to_type)
                            ? (openBlock(), createElementBlock("div", _hoisted_54, [
                                createBaseVNode("i", {
                                  class: normalizeClass([getLinkedIcon(doc.linked_to_type), "text-brand"])
                                }, null, 2),
                                createBaseVNode("span", null, toDisplayString(doc.linked_to_type), 1)
                              ]))
                            : (openBlock(), createElementBlock("span", _hoisted_55, "-"))
                        ]),
                        createBaseVNode("td", _hoisted_56, toDisplayString(formatFileSize(doc.file_size)), 1),
                        createBaseVNode("td", _hoisted_57, [
                          createBaseVNode("div", _hoisted_58, [
                            createBaseVNode("span", _hoisted_59, [
                              _cache[38] || (_cache[38] = createBaseVNode("i", { class: "fas fa-eye text-gray-300 mr-1" }, null, -1)),
                              createTextVNode(toDisplayString(doc.views), 1)
                            ]),
                            createBaseVNode("span", _hoisted_60, [
                              _cache[39] || (_cache[39] = createBaseVNode("i", { class: "fas fa-download text-gray-300 mr-1" }, null, -1)),
                              createTextVNode(toDisplayString(doc.downloads), 1)
                            ])
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_61, toDisplayString(formatDate(doc.created_at)), 1),
                        createBaseVNode("td", _hoisted_62, [
                          createBaseVNode("div", _hoisted_63, [
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (downloadDocument(doc)), ["stop"]),
                              class: "p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors",
                              title: "Download"
                            }, [...(_cache[40] || (_cache[40] = [
                              createBaseVNode("i", { class: "fas fa-download text-xs" }, null, -1)
                            ]))], 8, _hoisted_64),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (shareDocument(doc)), ["stop"]),
                              class: "p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",
                              title: "Share"
                            }, [...(_cache[41] || (_cache[41] = [
                              createBaseVNode("i", { class: "fas fa-share-alt text-xs" }, null, -1)
                            ]))], 8, _hoisted_65),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (editDocument(doc)), ["stop"]),
                              class: "p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors",
                              title: "Edit"
                            }, [...(_cache[42] || (_cache[42] = [
                              createBaseVNode("i", { class: "fas fa-edit text-xs" }, null, -1)
                            ]))], 8, _hoisted_66),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (deleteDoc(doc)), ["stop"]),
                              class: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors",
                              title: "Delete"
                            }, [...(_cache[43] || (_cache[43] = [
                              createBaseVNode("i", { class: "fas fa-trash text-xs" }, null, -1)
                            ]))], 8, _hoisted_67)
                          ])
                        ])
                      ], 8, _hoisted_47))
                    }), 128))
                  ])
                ])
              ])
            ]))
          : (!loading.value && documents.value.length === 0)
            ? (openBlock(), createElementBlock("div", _hoisted_68, [
                _cache[48] || (_cache[48] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_69, [
                  _cache[46] || (_cache[46] = createBaseVNode("div", { class: "w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6" }, [
                    createBaseVNode("i", { class: "fas fa-file-alt text-2xl text-gray-200" })
                  ], -1)),
                  _cache[47] || (_cache[47] = createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight mb-2" }, "No documents found", -1)),
                  createBaseVNode("p", _hoisted_70, toDisplayString(searchQuery.value ? 'Try adjusting your search or filters' : 'Start organizing your documents by uploading your first file'), 1),
                  (!searchQuery.value)
                    ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        onClick: _cache[7] || (_cache[7] = $event => (showUploadModal.value = true)),
                        class: "bg-brand text-white font-bold font-mono text-[10px] rounded-none px-8 py-3 transition hover:opacity-90 inline-flex items-center gap-3 uppercase tracking-wider shadow-md"
                      }, [...(_cache[45] || (_cache[45] = [
                        createBaseVNode("i", { class: "fas fa-upload" }, null, -1),
                        createBaseVNode("span", null, "Upload Your First Document", -1)
                      ]))]))
                    : createCommentVNode("", true)
                ])
              ]))
            : createCommentVNode("", true),
    (documents.value.length > 0)
      ? (openBlock(), createElementBlock("div", _hoisted_71, [
          createBaseVNode("div", _hoisted_72, " Showing " + toDisplayString((currentPage.value - 1) * perPage.value + 1) + " to " + toDisplayString(Math.min(currentPage.value * perPage.value, totalDocs.value)) + " of " + toDisplayString(totalDocs.value), 1),
          createBaseVNode("div", _hoisted_73, [
            createBaseVNode("button", {
              onClick: previousPage,
              disabled: currentPage.value === 1,
              class: "px-4 py-1.5 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50 transition-all rounded-none tracking-widest"
            }, " Prev ", 8, _hoisted_74),
            createBaseVNode("span", _hoisted_75, toDisplayString(currentPage.value) + " / " + toDisplayString(totalPages.value), 1),
            createBaseVNode("button", {
              onClick: nextPage,
              disabled: currentPage.value >= totalPages.value,
              class: "px-4 py-1.5 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50 transition-all rounded-none tracking-widest"
            }, " Next ", 8, _hoisted_76)
          ])
        ]))
      : createCommentVNode("", true),
    createVNode(DocumentUploadModal, {
      modelValue: showUploadModal.value,
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((showUploadModal).value = $event)),
      onUploaded: handleDocumentUploaded
    }, null, 8, ["modelValue"]),
    createVNode(DocumentDetailModal, {
      modelValue: showDetailModal.value,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((showDetailModal).value = $event)),
      document: selectedDocument.value,
      onRefresh: loadDocuments
    }, null, 8, ["modelValue", "document"]),
    createVNode(DocumentShareModal, {
      modelValue: showShareModal.value,
      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((showShareModal).value = $event)),
      document: documentToShare.value,
      onShared: loadDocuments
    }, null, 8, ["modelValue", "document"]),
    createVNode(DocumentEditModal, {
      modelValue: showEditModal.value,
      "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((showEditModal).value = $event)),
      document: documentToEdit.value,
      onUpdated: loadDocuments
    }, null, 8, ["modelValue", "document"]),
    createVNode(InvoiceCreationModal, {
      modelValue: showInvoiceModal.value,
      "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((showInvoiceModal).value = $event)),
      onCreated: handleInvoiceCreated,
      onSubscriptionRequired: _cache[13] || (_cache[13] = $event => (showSubscriptionModal.value = true))
    }, null, 8, ["modelValue"]),
    createVNode(SubscriptionRequiredModal, {
      modelValue: showSubscriptionModal.value,
      "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((showSubscriptionModal).value = $event)),
      moduleId: "invoicing",
      moduleName: "Invoicing Module",
      featureName: "Create Invoice/Quote",
      modulePrice: 8.00,
      onRequested: handleSubscriptionRequested
    }, null, 8, ["modelValue"]),
    (showDeleteConfirm.value)
      ? (openBlock(), createElementBlock("div", _hoisted_77, [
          createBaseVNode("div", _hoisted_78, [
            createBaseVNode("div", _hoisted_79, [
              _cache[51] || (_cache[51] = createBaseVNode("div", { class: "flex items-center gap-4 mb-6" }, [
                createBaseVNode("div", { class: "w-12 h-12 bg-red-50 flex items-center justify-center border border-red-100" }, [
                  createBaseVNode("i", { class: "fas fa-exclamation-triangle text-red-600 text-xl" })
                ]),
                createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" }, "Delete Document")
              ], -1)),
              createBaseVNode("p", _hoisted_80, [
                _cache[49] || (_cache[49] = createTextVNode(" Are you sure you want to delete ", -1)),
                createBaseVNode("span", _hoisted_81, "\"" + toDisplayString(documentToDelete.value?.name) + "\"", 1),
                _cache[50] || (_cache[50] = createTextVNode("? This action cannot be undone and the file will be permanently removed. ", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_82, [
              createBaseVNode("button", {
                onClick: _cache[15] || (_cache[15] = $event => (showDeleteConfirm.value = false)),
                class: "px-6 py-2 border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-[10px] font-bold font-mono uppercase transition-all rounded-none"
              }, " Cancel "),
              createBaseVNode("button", {
                onClick: confirmDelete,
                class: "px-6 py-2 bg-red-600 text-white font-bold font-mono text-[10px] uppercase hover:bg-red-700 transition-all shadow-md rounded-none"
              }, " Delete Document ")
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const DocumentsView = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-cdf0247b"]]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-none" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50/50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase" };
const _hoisted_7 = { class: "flex-1 w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10 transition-all duration-300" };
const _hoisted_8 = { class: "relative" };
const _hoisted_9 = {
  key: 0,
  class: "absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center"
};


const _sfc_main = {
  __name: 'CRMDocumentsPage',
  setup(__props) {

const { getUserEmail, activeTab, moduleLoading } = useCRMModule();

onMounted(() => {
  activeTab.value = 'documents';
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[6] || (_cache[6] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.$router.push('/dashboard/crm'))),
            class: "text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2"
          }, [...(_cache[1] || (_cache[1] = [
            createBaseVNode("i", { class: "fas fa-arrow-left text-lg" }, null, -1)
          ]))]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-2 h-8 bg-[#2F2E8B] rounded-none" }, null, -1)),
          _cache[3] || (_cache[3] = createBaseVNode("div", null, [
            createBaseVNode("div", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" }, [
              createBaseVNode("i", { class: "fas fa-file-alt text-[#2F2E8B]" }),
              createBaseVNode("span", null, "CRM // Documents")
            ]),
            createBaseVNode("h1", { class: "text-xl font-black text-gray-900 uppercase tracking-tight font-display" }, "Documents")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("span", _hoisted_6, [
            _cache[4] || (_cache[4] = createBaseVNode("i", { class: "fas fa-user-circle" }, null, -1)),
            createTextVNode(toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("main", _hoisted_7, [
      createBaseVNode("div", _hoisted_8, [
        (unref(moduleLoading))
          ? (openBlock(), createElementBlock("div", _hoisted_9, [...(_cache[5] || (_cache[5] = [
              createBaseVNode("div", { class: "flex items-center gap-3 text-[#2F2E8B]" }, [
                createBaseVNode("i", { class: "fas fa-spinner fa-spin text-2xl" }),
                createBaseVNode("span", { class: "font-semibold" }, "Loading documents...")
              ], -1)
            ]))]))
          : createCommentVNode("", true),
        createVNode(DocumentsView)
      ])
    ])
  ]))
}
}

};

export { _sfc_main as default };
