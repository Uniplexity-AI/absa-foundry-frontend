import { $ as createLucideIcon, r as ref, o as openBlock, C as createBlock, c as createElementBlock, b as createBaseVNode, h as normalizeClass, q as createVNode, s as unref, a0 as FileText, A as createTextVNode, t as toDisplayString, j as createCommentVNode, T as Teleport, Q as axios, f as onMounted, F as Fragment, e as renderList, x as withDirectives, y as vModelText, _ as _export_sfc, w as withCtx, a as createStaticVNode, a4 as Filter, D as resolveComponent, a2 as MessageSquare, v as withModifiers } from './index-CSRWfGkc.js';
import { F as FileSpreadsheet } from './file-spreadsheet-CNUAXdl9.js';
import { F as File, U as Upload, S as Save } from './upload-CoLaMT0Y.js';
import { P as Plus } from './plus-DZ6EGz2e.js';
import { T as Trash2 } from './trash-2-Dk_687hF.js';
import { S as Search } from './search-DQhDhgn9.js';
import { A as ArrowLeft } from './arrow-left-BbQ2kkd4.js';
import { P as Phone } from './phone-C3mZGjrK.js';
import { L as Layers } from './layers-BgYHh4qs.js';
import { T as TriangleAlert } from './triangle-alert-D-rzoNME.js';
import { C as Clock } from './clock-CClZCNZB.js';
import { C as CircleCheckBig } from './circle-check-big-DQ3P87a8.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Database = createLucideIcon("DatabaseIcon", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Pen = createLucideIcon("PenIcon", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
]);

const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
};
const _hoisted_2$2 = { class: "bg-white rounded-none w-full max-w-2xl overflow-hidden shadow-2xl relative border border-gray-200" };
const _hoisted_3$2 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10" };
const _hoisted_4$2 = { class: "px-5 pt-4 flex items-center gap-4 border-b border-gray-200 bg-gray-50 relative z-10" };
const _hoisted_5$2 = { class: "p-5 relative z-10" };
const _hoisted_6$2 = { class: "border-2 border-dashed border-gray-300 bg-gray-50/50 flex flex-col items-center justify-center py-10 transition-colors hover:border-absa-passion hover:bg-gray-50 relative" };
const _hoisted_7$2 = { class: "w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-3 shadow-sm" };
const _hoisted_8$2 = { class: "text-[10px] font-mono text-gray-500 uppercase tracking-widest" };
const _hoisted_9$2 = {
  key: 0,
  class: "mt-4 p-4 border border-absa-enrich bg-absa-enrich/5 flex items-center gap-3"
};


const _sfc_main$2 = {
  __name: 'FaqUploadModal',
  props: {
  open: { type: Boolean, default: false }
},
  emits: ['close', 'uploaded'],
  setup(__props, { emit: __emit }) {
const emit = __emit;

const fileType = ref('doc'); // 'doc', 'csv', 'pdf'
ref(null);
const isUploading = ref(false);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return

  // Minimal validation based on selected tab
  const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (fileType.value === 'doc' && !['.doc', '.docx'].includes(ext)) {
    alert('Please upload a Word document (.doc or .docx)');
    event.target.value = '';
    return
  }
  if (fileType.value === 'csv' && ext !== '.csv') {
    alert('Please upload a CSV file (.csv)');
    event.target.value = '';
    return
  }
  if (fileType.value === 'pdf' && ext !== '.pdf') {
    alert('Please upload a PDF file (.pdf)');
    event.target.value = '';
    return
  }

  isUploading.value = true;
  
  const formData = new FormData();
  formData.append('file', file);
  
  axios.post('http://localhost:8080/api/v1/crm/faqs/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(response => {
    isUploading.value = false;
    const msg = response.data.message || `FAQ document "${file.name}" uploaded successfully!`;
    alert(msg + '\n\nThe bot has processed the document and will use these FAQs for automated replies.');
    event.target.value = '';
    emit('uploaded');
    emit('close');
  })
  .catch(error => {
    isUploading.value = false;
    console.error('Upload failed:', error);
    alert('Failed to upload FAQ document. Make sure the backend is running.');
    event.target.value = '';
  });
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.open)
      ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-30" }, null, -1)),
            createBaseVNode("div", _hoisted_3$2, [
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion shrink-0" }),
                createBaseVNode("h3", { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900" }, "Upload FAQ Data")
              ], -1)),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close'))),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [...(_cache[4] || (_cache[4] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "close", -1)
              ]))])
            ]),
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("button", {
                class: normalizeClass(["pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2", fileType.value === 'doc' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800']),
                onClick: _cache[1] || (_cache[1] = $event => (fileType.value = 'doc'))
              }, [
                createVNode(unref(FileText), { size: 14 }),
                _cache[6] || (_cache[6] = createTextVNode(" Word (.doc) ", -1))
              ], 2),
              createBaseVNode("button", {
                class: normalizeClass(["pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2", fileType.value === 'csv' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800']),
                onClick: _cache[2] || (_cache[2] = $event => (fileType.value = 'csv'))
              }, [
                createVNode(unref(FileSpreadsheet), { size: 14 }),
                _cache[7] || (_cache[7] = createTextVNode(" CSV (.csv) ", -1))
              ], 2),
              createBaseVNode("button", {
                class: normalizeClass(["pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2", fileType.value === 'pdf' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800']),
                onClick: _cache[3] || (_cache[3] = $event => (fileType.value = 'pdf'))
              }, [
                createVNode(unref(File), { size: 14 }),
                _cache[8] || (_cache[8] = createTextVNode(" PDF (.pdf) ", -1))
              ], 2)
            ]),
            createBaseVNode("div", _hoisted_5$2, [
              createBaseVNode("div", _hoisted_6$2, [
                createBaseVNode("input", {
                  type: "file",
                  class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                  onChange: handleFileUpload
                }, null, 32),
                createBaseVNode("div", _hoisted_7$2, [
                  createVNode(unref(Upload), { size: 20 })
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900 mb-1" }, "Click to browse or drag file here", -1)),
                createBaseVNode("p", _hoisted_8$2, toDisplayString(fileType.value === 'doc' ? 'Supports .doc, .docx' : (fileType.value === 'csv' ? 'Supports .csv' : 'Supports .pdf')), 1)
              ]),
              (isUploading.value)
                ? (openBlock(), createElementBlock("div", _hoisted_9$2, [...(_cache[10] || (_cache[10] = [
                    createBaseVNode("div", { class: "w-4 h-4 border-2 border-absa-enrich/30 border-t-absa-enrich rounded-full animate-spin shrink-0" }, null, -1),
                    createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-absa-enrich uppercase tracking-widest" }, "Processing & Embedding FAQs... This may take a moment.", -1)
                  ]))]))
                : createCommentVNode("", true)
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};

const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
};
const _hoisted_2$1 = { class: "bg-white rounded-none w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl relative border border-gray-200 flex flex-col" };
const _hoisted_3$1 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10 shrink-0" };
const _hoisted_4$1 = { class: "flex items-center gap-4" };
const _hoisted_5$1 = { class: "p-5 overflow-y-auto flex-1 bg-transparent relative z-10" };
const _hoisted_6$1 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-12"
};
const _hoisted_7$1 = {
  key: 1,
  class: "bg-red-50 text-absa-passion p-4 border border-absa-passion flex items-start gap-3 rounded-none"
};
const _hoisted_8$1 = { class: "font-mono text-xs" };
const _hoisted_9$1 = {
  key: 2,
  class: "text-center py-12 border border-dashed border-gray-300 bg-gray-50/50"
};
const _hoisted_10$1 = {
  key: 3,
  class: "space-y-4"
};
const _hoisted_11$1 = {
  key: 0,
  class: "flex flex-col gap-3"
};
const _hoisted_12$1 = { class: "flex justify-end gap-2 mt-2" };
const _hoisted_13$1 = ["onClick", "disabled"];
const _hoisted_14$1 = ["onClick", "disabled"];
const _hoisted_15$1 = {
  key: 0,
  class: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
};
const _hoisted_16$1 = {
  key: 1,
  class: "flex gap-4"
};
const _hoisted_17$1 = { class: "shrink-0 mt-1" };
const _hoisted_18$1 = { class: "w-6 h-6 bg-gray-50 text-gray-700 text-[9px] font-mono font-bold flex items-center justify-center rounded-none border border-gray-200" };
const _hoisted_19$1 = { class: "flex-1 min-w-0" };
const _hoisted_20$1 = ["innerHTML"];
const _hoisted_21$1 = { class: "absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" };
const _hoisted_22$1 = ["onClick"];
const _hoisted_23$1 = ["onClick"];
const _hoisted_24$1 = { class: "mt-4 flex items-center justify-between border-t border-gray-100 pt-3" };
const _hoisted_25$1 = { class: "flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest" };
const _hoisted_26$1 = { class: "text-gray-600" };
const _hoisted_27$1 = { class: "flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest" };
const _hoisted_28$1 = ["title"];


const _sfc_main$1 = {
  __name: 'FaqViewModal',
  props: {
  open: { type: Boolean, default: true }
},
  emits: ['close'],
  setup(__props, { emit: __emit }) {

const faqs = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);
const error = ref('');

const editingId = ref(null);
const editDraft = ref('');

const fetchFaqs = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/crm/faqs');
    faqs.value = response.data.faqs || [];
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    error.value = 'Failed to load FAQs. Ensure the backend server is running.';
  } finally {
    isLoading.value = false;
  }
};

const formatFaq = (text) => {
  if (!text) return ''
  let formatted = text.replace(/^Q:\s*/i, '<strong class="text-absa-passion font-black">Q: </strong>');
  formatted = formatted.replace(/A:\s*/i, '<br><br><strong class="text-absa-enrich font-black">A: </strong>');
  return formatted
};

const startEdit = (faq) => {
  editingId.value = faq.id;
  editDraft.value = faq.text;
};

const cancelEdit = (faq, index) => {
  if (faq.isNew) {
    faqs.value.splice(index, 1);
  }
  editingId.value = null;
  editDraft.value = '';
};

const saveFaq = async (faq, index) => {
  if (!editDraft.value.trim()) return
  
  isSaving.value = true;
  try {
    if (faq.isNew) {
      const res = await axios.post('http://localhost:8080/api/v1/crm/faqs', { text: editDraft.value });
      faqs.value[index] = res.data.faq;
    } else {
      await axios.put(`http://localhost:8080/api/v1/crm/faqs/${faq.id}`, { text: editDraft.value });
      faqs.value[index].text = editDraft.value;
    }
    editingId.value = null;
    editDraft.value = '';
  } catch (err) {
    console.error('Error saving FAQ:', err);
    alert('Failed to save FAQ. See console for details.');
  } finally {
    isSaving.value = false;
  }
};

const deleteFaq = async (id, index) => {
  if (!confirm('Are you sure you want to delete this FAQ from the knowledge base?')) return
  try {
    await axios.delete(`http://localhost:8080/api/v1/crm/faqs/${id}`);
    faqs.value.splice(index, 1);
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    alert('Failed to delete FAQ.');
  }
};

const addNewFaq = () => {
  if (editingId.value) return // finish editing current first
  const newFaq = {
    id: `temp_${Date.now()}`,
    text: 'Q: \nA: ',
    document_id: 'manual',
    isNew: true
  };
  faqs.value.unshift(newFaq);
  startEdit(newFaq);
};

onMounted(() => {
  fetchFaqs();
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.open)
      ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-30" }, null, -1)),
            createBaseVNode("div", _hoisted_3$1, [
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion shrink-0" }),
                createBaseVNode("h3", { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900" }, "Bot Knowledge Base - Embedded FAQs")
              ], -1)),
              createBaseVNode("div", _hoisted_4$1, [
                createBaseVNode("button", {
                  onClick: addNewFaq,
                  class: "flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion hover:text-absa-passion/80 transition-colors"
                }, [
                  createVNode(unref(Plus), { size: 14 }),
                  _cache[2] || (_cache[2] = createTextVNode(" Add FAQ ", -1))
                ]),
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-px h-4 bg-gray-200" }, null, -1)),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close'))),
                  class: "text-gray-400 hover:text-absa-passion transition-colors"
                }, [...(_cache[3] || (_cache[3] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "close", -1)
                ]))])
              ])
            ]),
            createBaseVNode("div", _hoisted_5$1, [
              (isLoading.value)
                ? (openBlock(), createElementBlock("div", _hoisted_6$1, [...(_cache[6] || (_cache[6] = [
                    createBaseVNode("div", { class: "w-8 h-8 border-4 border-absa-passion/20 border-t-absa-passion rounded-full animate-spin mb-4" }, null, -1),
                    createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Fetching from ChromaDB...", -1)
                  ]))]))
                : (error.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] shrink-0 mt-0.5" }, "error", -1)),
                      createBaseVNode("p", _hoisted_8$1, toDisplayString(error.value), 1)
                    ]))
                  : (faqs.value.length === 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                        createVNode(unref(Database), {
                          size: 32,
                          class: "mx-auto mb-4 text-gray-400"
                        }),
                        _cache[8] || (_cache[8] = createBaseVNode("h3", { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900 mb-1" }, "Empty Knowledge Base", -1)),
                        _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-500 uppercase tracking-widest" }, "There are no FAQs embedded yet.", -1))
                      ]))
                    : (openBlock(), createElementBlock("div", _hoisted_10$1, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(faqs.value, (faq, index) => {
                          return (openBlock(), createElementBlock("div", {
                            class: "bg-white border border-gray-200 p-5 shadow-sm hover:border-absa-passion transition-colors rounded-none relative group",
                            key: faq.id
                          }, [
                            (editingId.value === faq.id)
                              ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                                  withDirectives(createBaseVNode("textarea", {
                                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((editDraft).value = $event)),
                                    rows: "4",
                                    class: "w-full border border-absa-passion focus:ring-1 focus:ring-absa-passion outline-none p-3 text-sm text-gray-800 rounded-none bg-white font-mono",
                                    placeholder: "Q: Your question here...\nA: Your answer here..."
                                  }, null, 512), [
                                    [vModelText, editDraft.value]
                                  ]),
                                  createBaseVNode("div", _hoisted_12$1, [
                                    createBaseVNode("button", {
                                      onClick: $event => (cancelEdit(faq, index)),
                                      class: "px-4 py-1.5 border border-gray-300 text-gray-600 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors disabled:opacity-50",
                                      disabled: isSaving.value
                                    }, " Cancel ", 8, _hoisted_13$1),
                                    createBaseVNode("button", {
                                      onClick: $event => (saveFaq(faq, index)),
                                      class: "px-4 py-1.5 bg-absa-passion text-white hover:bg-absa-passion/90 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50",
                                      disabled: isSaving.value
                                    }, [
                                      (isSaving.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_15$1))
                                        : (openBlock(), createBlock(unref(Save), {
                                            key: 1,
                                            size: 12
                                          })),
                                      createTextVNode(" " + toDisplayString(isSaving.value ? 'Embedding...' : 'Save'), 1)
                                    ], 8, _hoisted_14$1)
                                  ])
                                ]))
                              : (openBlock(), createElementBlock("div", _hoisted_16$1, [
                                  createBaseVNode("div", _hoisted_17$1, [
                                    createBaseVNode("div", _hoisted_18$1, toDisplayString(String(index + 1).padStart(2, '0')), 1)
                                  ]),
                                  createBaseVNode("div", _hoisted_19$1, [
                                    createBaseVNode("div", {
                                      class: "text-gray-800 text-sm whitespace-pre-wrap leading-relaxed font-medium pr-16",
                                      innerHTML: formatFaq(faq.text)
                                    }, null, 8, _hoisted_20$1),
                                    createBaseVNode("div", _hoisted_21$1, [
                                      createBaseVNode("button", {
                                        onClick: $event => (startEdit(faq)),
                                        class: "w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-absa-passion hover:text-white text-gray-500 border border-gray-200 transition-colors",
                                        title: "Edit FAQ"
                                      }, [
                                        createVNode(unref(Pen), { size: 14 })
                                      ], 8, _hoisted_22$1),
                                      createBaseVNode("button", {
                                        onClick: $event => (deleteFaq(faq.id, index)),
                                        class: "w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-red-600 hover:text-white text-gray-500 border border-gray-200 transition-colors",
                                        title: "Delete FAQ"
                                      }, [
                                        createVNode(unref(Trash2), { size: 14 })
                                      ], 8, _hoisted_23$1)
                                    ]),
                                    createBaseVNode("div", _hoisted_24$1, [
                                      createBaseVNode("div", _hoisted_25$1, [
                                        createVNode(unref(FileText), { size: 12 }),
                                        _cache[10] || (_cache[10] = createTextVNode(" Doc ID: ", -1)),
                                        createBaseVNode("span", _hoisted_26$1, toDisplayString(faq.document_id), 1)
                                      ]),
                                      createBaseVNode("div", _hoisted_27$1, [
                                        createVNode(unref(Database), { size: 12 }),
                                        _cache[11] || (_cache[11] = createTextVNode(" Vector: ", -1)),
                                        createBaseVNode("span", {
                                          class: "text-gray-600 truncate max-w-[150px] inline-block align-bottom",
                                          title: faq.id
                                        }, toDisplayString(faq.id), 9, _hoisted_28$1)
                                      ])
                                    ])
                                  ])
                                ]))
                          ]))
                        }), 128))
                      ]))
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0" };
const _hoisted_3 = { class: "px-4 sm:px-6 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex gap-2" };
const _hoisted_6 = { class: "px-3 py-1.5 bg-transparent border border-gray-300 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 blur-scoped pb-20" };
const _hoisted_8 = { class: "px-4 sm:px-6 py-6 w-full" };
const _hoisted_9 = { class: "flex justify-between items-center mb-4" };
const _hoisted_10 = { class: "relative w-64" };
const _hoisted_11 = { class: "bg-white border border-gray-200 shadow-sm overflow-x-auto" };
const _hoisted_12 = { class: "w-full text-left border-collapse" };
const _hoisted_13 = { class: "text-xs font-mono" };
const _hoisted_14 = { class: "p-3 text-absa-passion font-bold" };
const _hoisted_15 = { class: "p-3 text-gray-900" };
const _hoisted_16 = { class: "p-3 text-gray-600" };
const _hoisted_17 = { class: "p-3 text-gray-500" };
const _hoisted_18 = { class: "flex items-center gap-1" };
const _hoisted_19 = { class: "p-3" };
const _hoisted_20 = { class: "p-3" };
const _hoisted_21 = { class: "p-3 text-gray-400" };
const _hoisted_22 = { class: "p-3 text-right" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_25 = { class: "bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_26 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_27 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_28 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_29 = { class: "bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_30 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_31 = { class: "text-sm font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_32 = { class: "text-[9px] font-mono text-gray-500 mt-1 uppercase" };
const _hoisted_33 = { class: "p-6 font-mono text-sm space-y-6" };
const _hoisted_34 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_35 = { class: "text-gray-900 font-bold" };
const _hoisted_36 = { class: "text-gray-900 flex items-center gap-2" };
const _hoisted_37 = { class: "text-gray-900 font-bold" };
const _hoisted_38 = { class: "text-gray-400 font-normal" };
const _hoisted_39 = { class: "space-y-3 text-xs" };
const _hoisted_40 = { class: "flex gap-3" };
const _hoisted_41 = { class: "text-gray-500 text-[9px]" };
const _hoisted_42 = { class: "text-gray-800" };
const _hoisted_43 = { class: "flex gap-3" };
const _hoisted_44 = { class: "text-gray-500 text-[9px]" };
const _hoisted_45 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };


const _sfc_main = {
  __name: 'CRMTicketsPage',
  setup(__props) {

const showNewCaseModal = ref(false);

const showFaqUploadModal = ref(false);
const showFaqViewModal = ref(false);

const selectedTicket = ref(null);
const mockTickets = ref([
  { id: 'CASE-4892', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
]);


return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _cache[30] || (_cache[30] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
      createBaseVNode("header", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_router_link, {
              to: "/dashboard/crm",
              class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"
            }, {
              default: withCtx(() => [
                createVNode(unref(ArrowLeft), { size: 14 }),
                _cache[10] || (_cache[10] = createTextVNode(" Back", -1))
              ]),
              _: 1
            }),
            _cache[11] || (_cache[11] = createStaticVNode("<div class=\"w-2 h-8 bg-absa-passion rounded-none ml-2\" data-v-785b7c85></div><div data-v-785b7c85><div class=\"flex items-center gap-1.5\" data-v-785b7c85><span class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-785b7c85>Case Management</span><span class=\"text-[10px] font-mono font-bold text-gray-300\" data-v-785b7c85>//</span><span class=\"text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest\" data-v-785b7c85>Global Queue</span></div><h1 class=\"text-xl font-black font-display text-gray-900 uppercase tracking-tight\" data-v-785b7c85>Tickets &amp; Cases</h1></div>", 2))
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("button", _hoisted_6, [
              createVNode(unref(Filter), { size: 12 }),
              _cache[12] || (_cache[12] = createTextVNode(" Filter", -1))
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = $event => (showFaqViewModal.value = true)),
              class: "px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"
            }, [...(_cache[13] || (_cache[13] = [
              createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "visibility", -1),
              createTextVNode(" View FAQs ", -1)
            ]))]),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = $event => (showFaqUploadModal.value = true)),
              class: "px-3 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"
            }, [
              createVNode(unref(Upload), { size: 12 }),
              _cache[14] || (_cache[14] = createTextVNode(" Upload FAQs ", -1))
            ]),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = $event => (showNewCaseModal.value = true)),
              class: "px-3 py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-2"
            }, [
              createVNode(unref(Plus), { size: 12 }),
              _cache[15] || (_cache[15] = createTextVNode(" New Case", -1))
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createVNode(unref(Search), {
                class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                size: 14
              }),
              _cache[16] || (_cache[16] = createBaseVNode("input", {
                type: "text",
                placeholder: "Search ticket ID or phone...",
                class: "w-full bg-white border border-gray-200 rounded-none pl-9 pr-3 py-1.5 text-xs font-mono outline-none focus:border-absa-passion"
              }, null, -1))
            ]),
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "flex text-[9px] font-mono font-bold uppercase border border-gray-200 bg-white" }, [
              createBaseVNode("button", { class: "px-3 py-1.5 bg-gray-50 text-absa-passion border-r border-gray-200" }, "All"),
              createBaseVNode("button", { class: "px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500" }, "Open"),
              createBaseVNode("button", { class: "px-3 py-1.5 hover:bg-gray-50 text-gray-500" }, "Escalated")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("table", _hoisted_12, [
              _cache[18] || (_cache[18] = createBaseVNode("thead", null, [
                createBaseVNode("tr", { class: "bg-gray-50 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200" }, [
                  createBaseVNode("th", { class: "p-3" }, "Ticket ID"),
                  createBaseVNode("th", { class: "p-3" }, "Customer Info"),
                  createBaseVNode("th", { class: "p-3" }, "Type"),
                  createBaseVNode("th", { class: "p-3" }, "Channel"),
                  createBaseVNode("th", { class: "p-3" }, "Status"),
                  createBaseVNode("th", { class: "p-3" }, "SLA Health"),
                  createBaseVNode("th", { class: "p-3" }, "Created"),
                  createBaseVNode("th", { class: "p-3 text-right" }, "Action")
                ])
              ], -1)),
              createBaseVNode("tbody", _hoisted_13, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(mockTickets.value, (ticket) => {
                  return (openBlock(), createElementBlock("tr", {
                    key: ticket.id,
                    class: "border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  }, [
                    createBaseVNode("td", _hoisted_14, toDisplayString(ticket.id), 1),
                    createBaseVNode("td", _hoisted_15, toDisplayString(ticket.customer), 1),
                    createBaseVNode("td", _hoisted_16, toDisplayString(ticket.type), 1),
                    createBaseVNode("td", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        (ticket.channel === 'Voice')
                          ? (openBlock(), createBlock(unref(Phone), {
                              key: 0,
                              size: 12
                            }))
                          : createCommentVNode("", true),
                        (ticket.channel === 'WhatsApp')
                          ? (openBlock(), createBlock(unref(MessageSquare), {
                              key: 1,
                              size: 12,
                              class: "text-green-500"
                            }))
                          : createCommentVNode("", true),
                        (ticket.channel === 'Facebook')
                          ? (openBlock(), createBlock(unref(Layers), {
                              key: 2,
                              size: 12,
                              class: "text-blue-500"
                            }))
                          : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(ticket.channel), 1)
                      ])
                    ]),
                    createBaseVNode("td", _hoisted_19, [
                      createBaseVNode("span", {
                        class: normalizeClass(["px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold", ticket.status === 'Open' ? 'text-blue-600 border-blue-200' : ticket.status === 'Escalated' ? 'text-orange-500 border-orange-200' : 'text-gray-500'])
                      }, toDisplayString(ticket.status), 3)
                    ]),
                    createBaseVNode("td", _hoisted_20, [
                      createBaseVNode("span", {
                        class: normalizeClass(["flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold", ticket.sla === 'Breached' ? 'text-red-500' : ticket.sla === 'At Risk' ? 'text-orange-500' : 'text-green-500'])
                      }, [
                        (ticket.sla === 'Breached')
                          ? (openBlock(), createBlock(unref(TriangleAlert), {
                              key: 0,
                              size: 12
                            }))
                          : createCommentVNode("", true),
                        (ticket.sla === 'At Risk')
                          ? (openBlock(), createBlock(unref(Clock), {
                              key: 1,
                              size: 12
                            }))
                          : createCommentVNode("", true),
                        (ticket.sla === 'Met' || ticket.sla === 'On Track')
                          ? (openBlock(), createBlock(unref(CircleCheckBig), {
                              key: 2,
                              size: 12
                            }))
                          : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(ticket.sla), 1)
                      ], 2)
                    ]),
                    createBaseVNode("td", _hoisted_21, toDisplayString(ticket.created), 1),
                    createBaseVNode("td", _hoisted_22, [
                      createBaseVNode("button", {
                        onClick: withModifiers($event => (selectedTicket.value = ticket), ["stop"]),
                        class: "px-2 py-1 bg-transparent text-gray-500 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-bold uppercase rounded-none transition"
                      }, "View", 8, _hoisted_23)
                    ])
                  ]))
                }), 128))
              ])
            ])
          ])
        ]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          (showNewCaseModal.value)
            ? (openBlock(), createElementBlock("div", _hoisted_24, [
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" }, "New Case", -1)),
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = $event => (showNewCaseModal.value = false)),
                      class: "text-gray-400 hover:text-absa-passion"
                    }, "X")
                  ]),
                  _cache[20] || (_cache[20] = createBaseVNode("div", { class: "p-6 space-y-4 font-mono text-sm" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Customer Phone / ID"),
                      createBaseVNode("input", {
                        type: "text",
                        class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion",
                        placeholder: "e.g. +260 96 111..."
                      })
                    ]),
                    createBaseVNode("div", null, [
                      createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Case Category"),
                      createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" }, [
                        createBaseVNode("option", null, "Complaint"),
                        createBaseVNode("option", null, "Enquiry"),
                        createBaseVNode("option", null, "Account Block"),
                        createBaseVNode("option", null, "Card Delivery")
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Priority"),
                      createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" }, [
                        createBaseVNode("option", null, "Low"),
                        createBaseVNode("option", null, "Medium"),
                        createBaseVNode("option", null, "High"),
                        createBaseVNode("option", null, "Critical")
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Description"),
                      createBaseVNode("textarea", {
                        rows: "3",
                        class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion",
                        placeholder: "Case details..."
                      })
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("button", {
                      onClick: _cache[4] || (_cache[4] = $event => (showNewCaseModal.value = false)),
                      class: "px-4 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none"
                    }, "Cancel"),
                    createBaseVNode("button", {
                      onClick: _cache[5] || (_cache[5] = $event => (showNewCaseModal.value = false)),
                      class: "px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none"
                    }, "Create Case")
                  ])
                ])
              ]))
            : createCommentVNode("", true)
        ])),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          (selectedTicket.value)
            ? (openBlock(), createElementBlock("div", _hoisted_28, [
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h3", _hoisted_31, toDisplayString(selectedTicket.value.id), 1),
                      createBaseVNode("div", _hoisted_32, toDisplayString(selectedTicket.value.type) + " • " + toDisplayString(selectedTicket.value.created), 1)
                    ]),
                    createBaseVNode("button", {
                      onClick: _cache[6] || (_cache[6] = $event => (selectedTicket.value = null)),
                      class: "text-gray-400 hover:text-absa-passion"
                    }, "X")
                  ]),
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("div", _hoisted_34, [
                      createBaseVNode("div", null, [
                        _cache[21] || (_cache[21] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Customer Info", -1)),
                        createBaseVNode("span", _hoisted_35, toDisplayString(selectedTicket.value.customer), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[22] || (_cache[22] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Channel", -1)),
                        createBaseVNode("span", _hoisted_36, toDisplayString(selectedTicket.value.channel), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[23] || (_cache[23] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Status", -1)),
                        createBaseVNode("span", {
                          class: normalizeClass(["px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold", selectedTicket.value.status === 'Open' ? 'text-blue-600' : selectedTicket.value.status === 'Escalated' ? 'text-orange-500' : 'text-gray-500'])
                        }, toDisplayString(selectedTicket.value.status), 3)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[24] || (_cache[24] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Priority & SLA", -1)),
                        createBaseVNode("span", _hoisted_37, [
                          createTextVNode(toDisplayString(selectedTicket.value.priority) + " ", 1),
                          createBaseVNode("span", _hoisted_38, "(" + toDisplayString(selectedTicket.value.sla) + ")", 1)
                        ])
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[28] || (_cache[28] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1" }, "Activity Log", -1)),
                      createBaseVNode("div", _hoisted_39, [
                        createBaseVNode("div", _hoisted_40, [
                          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" }, null, -1)),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_41, toDisplayString(selectedTicket.value.created) + " 08:42 AM", 1),
                            createBaseVNode("div", _hoisted_42, "Case opened by System via " + toDisplayString(selectedTicket.value.channel), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_43, [
                          _cache[27] || (_cache[27] = createBaseVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion mt-1.5" }, null, -1)),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_44, toDisplayString(selectedTicket.value.created) + " 09:15 AM", 1),
                            _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-gray-800" }, "Assigned to queue and acknowledged.", -1))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_45, [
                    _cache[29] || (_cache[29] = createBaseVNode("button", { class: "px-4 py-2 bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase rounded-none mr-auto" }, "Escalate", -1)),
                    createBaseVNode("button", {
                      onClick: _cache[7] || (_cache[7] = $event => (selectedTicket.value = null)),
                      class: "px-6 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none"
                    }, "Close Viewer")
                  ])
                ])
              ]))
            : createCommentVNode("", true)
        ]))
      ])
    ]),
    createVNode(_sfc_main$2, {
      open: showFaqUploadModal.value,
      onClose: _cache[8] || (_cache[8] = $event => (showFaqUploadModal.value = false))
    }, null, 8, ["open"]),
    (showFaqViewModal.value)
      ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          onClose: _cache[9] || (_cache[9] = $event => (showFaqViewModal.value = false))
        }))
      : createCommentVNode("", true)
  ], 64))
}
}

};
const CRMTicketsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-785b7c85"]]);

export { CRMTicketsPage as default };
