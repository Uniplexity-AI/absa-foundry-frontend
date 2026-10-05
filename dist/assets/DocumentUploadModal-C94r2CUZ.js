import { _ as _export_sfc, J as decodeJWT, r as ref, i as computed, M as watch, o as openBlock, c as createElementBlock, b as createBaseVNode, h as normalizeClass, t as toDisplayString, n as normalizeStyle, j as createCommentVNode, x as withDirectives, y as vModelText, L as vModelSelect, a as createStaticVNode } from './index-CSRWfGkc.js';
import { t as uploadDocument } from './CRMModule-Dh_JOtqO.js';

const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
};
const _hoisted_2 = { class: "bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative" };
const _hoisted_3 = { class: "p-6 space-y-6 relative z-10" };
const _hoisted_4 = { class: "border-2 border-dashed border-gray-200 rounded-none p-8 text-center hover:border-[#2F2E8B] transition bg-gray-50/30 group" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
  key: 1,
  class: "flex items-center justify-between bg-white border border-gray-100 p-4 rounded-none shadow-none relative overflow-hidden"
};
const _hoisted_7 = { class: "relative z-10 flex items-center gap-3" };
const _hoisted_8 = { class: "text-left" };
const _hoisted_9 = { class: "font-black text-gray-900 font-display uppercase tracking-tight text-sm" };
const _hoisted_10 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_11 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_12 = { class: "flex items-center justify-between text-sm text-gray-600" };
const _hoisted_13 = { class: "w-full bg-gray-100 rounded-none h-1.5 overflow-hidden" };
const _hoisted_14 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_15 = { class: "md:col-span-2" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { class: "md:col-span-2" };
const _hoisted_18 = { class: "md:col-span-2" };
const _hoisted_19 = { class: "bg-gray-50/80 backdrop-blur-md px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20" };
const _hoisted_20 = ["disabled"];
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { key: 0 };
const _hoisted_23 = { key: 1 };


const _sfc_main = {
  __name: 'DocumentUploadModal',
  props: {
  modelValue: Boolean,
  linkedEntity: {
    type: Object,
    default: null
  }
},
  emits: ['update:modelValue', 'uploaded'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();

const props = __props;

const emit = __emit;

// State
const selectedFile = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const tagsInput = ref('');
const form = ref({
  name: '',
  category: '',
  folder: '',
  linked_to_type: '',
  linked_to_id: '',
  description: '',
});

const fileInput = ref(null);

// Computed
const canUpload = computed(() => {
  return selectedFile.value && form.value.name && form.value.category;
});

// Watch for linkedEntity prop to pre-populate form
watch(() => props.linkedEntity, (newEntity) => {
  if (newEntity && newEntity.type && newEntity.id) {
    form.value.linked_to_type = newEntity.type;
    form.value.linked_to_id = newEntity.id;
  }
}, { immediate: true });

// Methods
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    if (!form.value.name) {
      form.value.name = file.name;
    }
  }
}

async function uploadDocument$1() {
  if (!canUpload.value) return;

  uploading.value = true;
  uploadProgress.value = 0;

  try {
    const tenantId = getTenantId();
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('name', form.value.name);
    formData.append('category', form.value.category);
    
    if (form.value.folder) formData.append('folder', form.value.folder);
    if (form.value.linked_to_type) formData.append('linked_to_type', form.value.linked_to_type);
    if (form.value.linked_to_id) formData.append('linked_to_id', form.value.linked_to_id);
    if (form.value.description) formData.append('description', form.value.description);
    
    // Parse and add tags
    const tags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }
    
    formData.append('file_type', selectedFile.value.name.split('.').pop().toLowerCase());
    formData.append('file_size', selectedFile.value.size.toString());

    // Upload document with progress tracking (supported via apiClient interceptors or options if implemented in api_services)
    // For now, simple call as we cleaned up the manual XHR
    await uploadDocument(formData, tenantId);
    
    uploadProgress.value = 100;
    
    // Emit success
    emit('uploaded');
    setTimeout(() => {
      close();
    }, 500);
  } catch (error) {
    console.error('Failed to upload document:', error);
    alert(`Failed to upload document: ${error.message || 'Please try again.'}`);
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
}

function close() {
  emit('update:modelValue', false);
  resetForm();
}

function resetForm() {
  selectedFile.value = null;
  form.value = {
    name: '',
    category: '',
    folder: '',
    linked_to_type: '',
    linked_to_id: '',
    description: '',
  };
  tagsInput.value = '';
}

function getFileIcon(fileType) {
  const type = fileType.split('/')[1] || fileType;
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
  };
  return icons[type] || 'fas fa-file';
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

return (_ctx, _cache) => {
  return (__props.modelValue)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[27] || (_cache[27] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
          createBaseVNode("div", { class: "bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center justify-between" }, [
            _cache[10] || (_cache[10] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
              createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-xl font-black text-gray-900 font-display uppercase tracking-tight" }, " Upload Document ")
            ], -1)),
            createBaseVNode("button", {
              onClick: close,
              class: "text-gray-400 hover:text-gray-600 p-2 transition"
            }, [...(_cache[9] || (_cache[9] = [
              createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
            ]))])
          ]),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("input", {
                ref_key: "fileInput",
                ref: fileInput,
                type: "file",
                onChange: handleFileSelect,
                class: "hidden",
                accept: "*/*"
              }, null, 544),
              (!selectedFile.value)
                ? (openBlock(), createElementBlock("div", _hoisted_5, [
                    _cache[11] || (_cache[11] = createBaseVNode("i", { class: "fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4" }, null, -1)),
                    _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-gray-700 font-semibold mb-2" }, "Click to upload or drag and drop", -1)),
                    _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-sm text-gray-500" }, "Any file type supported", -1)),
                    createBaseVNode("button", {
                      onClick: _cache[0] || (_cache[0] = $event => (_ctx.$refs.fileInput.click())),
                      class: "mt-4 px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold font-mono text-[10px] rounded-none hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition uppercase tracking-widest shadow-none"
                    }, " Select File ")
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_6, [
                    _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.1] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("i", {
                        class: normalizeClass([getFileIcon(selectedFile.value.type), "text-3xl text-[#2F2E8B]"])
                      }, null, 2),
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("p", _hoisted_9, toDisplayString(selectedFile.value.name), 1),
                        createBaseVNode("p", _hoisted_10, toDisplayString(formatFileSize(selectedFile.value.size)), 1)
                      ])
                    ]),
                    createBaseVNode("button", {
                      onClick: _cache[1] || (_cache[1] = $event => (selectedFile.value = null)),
                      class: "text-red-500 hover:bg-red-50 p-2 rounded-none transition relative z-10"
                    }, [...(_cache[14] || (_cache[14] = [
                      createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                    ]))])
                  ]))
            ]),
            (uploading.value)
              ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  createBaseVNode("div", _hoisted_12, [
                    _cache[16] || (_cache[16] = createBaseVNode("span", null, "Uploading...", -1)),
                    createBaseVNode("span", null, toDisplayString(uploadProgress.value) + "%", 1)
                  ]),
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("div", {
                      class: "bg-[#2F2E8B] h-full rounded-none transition-all duration-300",
                      style: normalizeStyle({ width: uploadProgress.value + '%' })
                    }, null, 4)
                  ])
                ]))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Document Name *", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.name) = $event)),
                  type: "text",
                  placeholder: "ENTER DOCUMENT NAME",
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono",
                  required: ""
                }, null, 512), [
                  [vModelText, form.value.name]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[19] || (_cache[19] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Category *", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.category) = $event)),
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono",
                  required: ""
                }, [...(_cache[18] || (_cache[18] = [
                  createStaticVNode("<option value=\"\" data-v-be206f0f>SELECT CATEGORY</option><option value=\"contract\" data-v-be206f0f>CONTRACT</option><option value=\"invoice\" data-v-be206f0f>INVOICE</option><option value=\"proposal\" data-v-be206f0f>PROPOSAL</option><option value=\"quotation\" data-v-be206f0f>QUOTATION</option><option value=\"presentation\" data-v-be206f0f>PRESENTATION</option><option value=\"other\" data-v-be206f0f>OTHER</option>", 7)
                ]))], 512), [
                  [vModelSelect, form.value.category]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[20] || (_cache[20] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Folder", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.folder) = $event)),
                  type: "text",
                  placeholder: "ENTER FOLDER NAME",
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
                }, null, 512), [
                  [vModelText, form.value.folder]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[22] || (_cache[22] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Link To", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.value.linked_to_type) = $event)),
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
                }, [...(_cache[21] || (_cache[21] = [
                  createStaticVNode("<option value=\"\" data-v-be206f0f>NONE</option><option value=\"lead\" data-v-be206f0f>LEAD</option><option value=\"contact\" data-v-be206f0f>CONTACT</option><option value=\"account\" data-v-be206f0f>ACCOUNT</option><option value=\"deal\" data-v-be206f0f>DEAL</option><option value=\"campaign\" data-v-be206f0f>CAMPAIGN</option>", 6)
                ]))], 512), [
                  [vModelSelect, form.value.linked_to_type]
                ])
              ]),
              (form.value.linked_to_type)
                ? (openBlock(), createElementBlock("div", _hoisted_16, [
                    _cache[23] || (_cache[23] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Record ID", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.value.linked_to_id) = $event)),
                      type: "text",
                      placeholder: "ENTER RECORD ID",
                      class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
                    }, null, 512), [
                      [vModelText, form.value.linked_to_id]
                    ])
                  ]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_17, [
                _cache[24] || (_cache[24] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Description", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.value.description) = $event)),
                  rows: "3",
                  placeholder: "ENTER DOCUMENT DESCRIPTION",
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
                }, null, 512), [
                  [vModelText, form.value.description]
                ])
              ]),
              createBaseVNode("div", _hoisted_18, [
                _cache[25] || (_cache[25] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Tags", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((tagsInput).value = $event)),
                  type: "text",
                  placeholder: "ENTER TAGS SEPARATED BY COMMAS",
                  class: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
                }, null, 512), [
                  [vModelText, tagsInput.value]
                ]),
                _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2" }, "Separate multiple tags with commas", -1))
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("button", {
              onClick: close,
              disabled: uploading.value,
              class: "px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition disabled:opacity-50 uppercase tracking-widest"
            }, " Cancel ", 8, _hoisted_20),
            createBaseVNode("button", {
              onClick: uploadDocument$1,
              disabled: !canUpload.value || uploading.value,
              class: "px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
            }, [
              (!uploading.value)
                ? (openBlock(), createElementBlock("span", _hoisted_22, "Execute Upload"))
                : (openBlock(), createElementBlock("span", _hoisted_23, "Processing..."))
            ], 8, _hoisted_21)
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

};
const DocumentUploadModal = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-be206f0f"]]);

export { DocumentUploadModal as D };
