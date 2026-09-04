import { r as ref, D as computed, h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, j as normalizeClass, m as createTextVNode, n as normalizeStyle, F as Fragment, t as toDisplayString, l as createCommentVNode, a as createStaticVNode, e as renderList, v as withDirectives, x as vModelText, s as withModifiers } from './index-DySaQUSt.js';
import { f as fetchETLConfigs, c as createETLConfig, s as saveETLConfig, d as fetchETLConfigContent, t as triggerETLPipeline, e as deleteETLConfig } from './etlApi-C94VsQrz.js';
import { n as notify } from './absaExport-nqn31pTn.js';

const _hoisted_1 = { class: "dashboard-root w-full min-h-screen p-4 md:p-6 lg:p-8" };
const _hoisted_2 = { class: "flex border-b border-gray-300 mb-6" };
const _hoisted_3 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden flex flex-col relative text-on-surface text-sm min-h-[600px]"
};
const _hoisted_4 = { class: "px-4 py-3 flex justify-between items-center border-b border-gray-300 bg-white relative z-10" };
const _hoisted_5 = { class: "flex items-center gap-2 font-mono text-sm" };
const _hoisted_6 = { class: "text-on-surface" };
const _hoisted_7 = { class: "flex items-center gap-3" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = {
  key: 0,
  class: "material-symbols-outlined text-[16px] animate-spin"
};
const _hoisted_10 = { class: "flex justify-between items-center px-4 py-2 border-b border-gray-300 bg-white relative z-10" };
const _hoisted_11 = { class: "flex gap-2" };
const _hoisted_12 = { class: "flex-1 overflow-auto flex bg-transparent font-mono text-[13px] leading-[1.6] relative z-10" };
const _hoisted_13 = { class: "w-12 flex-shrink-0 text-right pr-4 text-on-surface-variant bg-white-container-low select-none py-4 border-r border-gray-300" };
const _hoisted_14 = {
  key: 0,
  class: "p-4 w-full outline-none focus:ring-0"
};
const _hoisted_15 = {
  key: 1,
  class: "p-4 whitespace-pre text-on-surface overflow-x-auto w-full font-medium"
};
const _hoisted_16 = { class: "text-[#DC0037] font-bold" };
const _hoisted_17 = {
  key: 1,
  class: "bg-white rounded-sm border border-gray-300 shadow-none relative"
};
const _hoisted_18 = { class: "relative z-10 px-6 py-5 border-b border-gray-300 flex justify-between items-center bg-white" };
const _hoisted_19 = { class: "flex items-center gap-4" };
const _hoisted_20 = { class: "text-body-md font-medium text-on-surface-variant uppercase tracking-widest text-[12px]" };
const _hoisted_21 = { class: "relative" };
const _hoisted_22 = { class: "relative z-10 overflow-x-auto bg-white" };
const _hoisted_23 = {
  key: 0,
  class: "p-12 text-center text-body-md text-secondary"
};
const _hoisted_24 = {
  key: 1,
  class: "p-12 text-center text-body-md text-primary"
};
const _hoisted_25 = {
  key: 2,
  class: "w-full text-left text-body-md"
};
const _hoisted_26 = { class: "divide-y divide-outline-variant bg-white" };
const _hoisted_27 = { key: 0 };
const _hoisted_28 = {
  colspan: "5",
  class: "p-12 text-center text-body-md text-secondary"
};
const _hoisted_29 = { key: 1 };
const _hoisted_30 = ["onClick"];
const _hoisted_31 = { class: "px-6 py-4" };
const _hoisted_32 = { class: "font-semibold text-on-surface" };
const _hoisted_33 = { class: "text-on-surface-variant text-sm mt-0.5" };
const _hoisted_34 = { class: "px-6 py-4" };
const _hoisted_35 = {
  key: 0,
  class: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-green-100 text-green-700 border border-green-200 text-xs font-semibold"
};
const _hoisted_36 = {
  key: 1,
  class: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-orange-100 text-absa-energy border border-orange-200 text-xs font-semibold"
};
const _hoisted_37 = { class: "px-6 py-4 text-on-surface-variant font-mono text-sm" };
const _hoisted_38 = { class: "px-6 py-4 text-on-surface-variant font-mono text-sm" };
const _hoisted_39 = { class: "px-6 py-4 text-right" };
const _hoisted_40 = ["onClick"];
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  key: 1,
  class: "bg-white rounded-sm border border-gray-300 shadow-none p-8 text-center text-on-surface-variant"
};

// Tab & Search State

const _sfc_main = {
  __name: 'EtlConfigManager',
  setup(__props) {

const activeTab = ref('configurations');
const searchQuery = ref('');
const isSaving = ref(false);

// Editor view state: null = show configs table, config object = show editor
const editorView = ref(null);
const editingConfig = ref(null);
const editorMode = ref('edit'); // 'edit' | 'preview'
const isNewConfig = ref(false);

// Config Specifications Data (loaded from the backend extraction_specs dir)
const configs = ref([]);
const configsLoading = ref(false);
const configsError = ref(null);

// Map backend config rows to the shape the template expects.
function toDisplayConfig(c) {
  return {
    id: c.name,                    // filename is the stable key
    name: c.name,
    description: c.description || '',
    status: c.status === 'ok' ? 'valid' : 'check needed',
    lastModified: c.last_modified || '',
    size: c.size_bytes != null ? (c.size_bytes / 1024).toFixed(1) : '—',
    content: c.content || null,
  }
}

async function loadConfigs() {
  configsLoading.value = true;
  configsError.value = null;
  try {
    const list = await fetchETLConfigs();
    configs.value = (list || []).map(toDisplayConfig);
  } catch (e) {
    configsError.value = e.message || 'Failed to load configs';
    configs.value = [];
  } finally {
    configsLoading.value = false;
  }
}

// Search Filter Computed Property
const filteredConfigs = computed(() => {
  if (!searchQuery.value.trim()) return configs.value
  const query = searchQuery.value.toLowerCase();
  return configs.value.filter(
    item => (item.name || '').toLowerCase().includes(query) || (item.description || '').toLowerCase().includes(query)
  )
});

// Editor content lines for line numbers
const editorLines = computed(() => {
  if (!editingConfig.value?.content) return []
  return editingConfig.value.content.split('\n')
});

// Open editor for existing config
async function openEditor(config) {
  if (!config) return
  // Always fetch the freshest content from the backend before editing.
  try {
    const detail = await fetchETLConfigContent(config.name);
    editingConfig.value = {
      ...config,
      content: detail.content,
      lastModified: detail.last_modified || config.lastModified,
    };
  } catch (e) {
    notify(`Failed to load "${config.name}" — ${e.message || 'backend error'}`, 'error');
    editingConfig.value = JSON.parse(JSON.stringify(config));
  }
  isNewConfig.value = false;
  editorMode.value = 'edit';
  editorView.value = config.name;
}

// Open editor for new config
function openNewEditor() {
  editingConfig.value = {
    id: null,
    name: 'new_extraction.yaml',
    description: 'New data extraction specification.',
    status: 'valid',
    lastModified: new Date().toISOString().slice(0, 10),
    size: '1.0',
    content: `spec_version: "v2.1"
name: "new_extraction"
description: "New specification"
source:
  type: "postgres"
  connection_ref: "prod_db"
output:
  type: "postgres"
  table: "staging_new_extraction"`
  };
  isNewConfig.value = true;
  editorMode.value = 'edit';
  editorView.value = 'new';
}

// Close editor, return to table
function closeEditor() {
  editorView.value = null;
  editingConfig.value = null;
  isNewConfig.value = false;
}

// Save config (create or update) against the backend
async function saveConfig() {
  if (!editingConfig.value?.content) return
  if (!editingConfig.value.content.trim()) {
    notify('Config content is empty', 'error');
    return
  }
  isSaving.value = true;
  try {
    if (isNewConfig.value) {
      // Backend derives the filename from the YAML `name:` field.
      const created = await createETLConfig(editingConfig.value.content);
      notify(`Config created — ${created.name || 'see backend'}`, 'success');
    } else {
      const name = editingConfig.value.name || editingConfig.value.id;
      await saveETLConfig(name, editingConfig.value.content);
      notify(`Config saved — ${name}`, 'success');
    }
    closeEditor();
    await loadConfigs();
  } catch (e) {
    notify(`Failed to save config — ${e.message || 'backend error'}`, 'error', { autoClose: 5000 });
  } finally {
    isSaving.value = false;
  }
}

async function deleteConfig(name) {
  if (!name) return
  if (!window.confirm(`Delete config "${name}"? This cannot be undone.`)) return
  try {
    await deleteETLConfig(name);
    notify(`Config deleted — ${name}`, 'success');
    if (editorView.value === name) closeEditor();
    await loadConfigs();
  } catch (e) {
    notify(`Failed to delete — ${e.message || 'backend error'}`, 'error');
  }
}

// Run a config (jump to Run History and start it) — wire the play button.
async function runConfig(config) {
  const name = config?.name || config?.id;
  if (!name) return
  try {
    const res = await triggerETLPipeline(name);
    notify(`${res.message || `Pipeline triggered — ${name}`}`, 'success', { autoClose: 5000 });
    activeTab.value = 'run_history';
  } catch (e) {
    notify(`Failed to run "${name}" — ${e.message || 'backend error'}`, 'error');
  }
}

// ── Relative timestamp helper ──
function relativeTime(dateStr) {
  if (!dateStr) return '—'
  const then = new Date(dateStr);
  if (isNaN(then.getTime())) return dateStr.slice(0, 10)
  const now = new Date();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHrs < 24) return `${diffHrs}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return dateStr.slice(0, 10)
}

onMounted(() => {
  loadConfigs();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[26] || (_cache[26] = createBaseVNode("div", { class: "mb-6 pb-4 border-b border-gray-300 flex justify-between items-end" }, [
      createBaseVNode("div", null, [
        createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Dashboard"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Data Pipeline"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Config Manager")
        ]),
        createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "ETL Config Manager")
      ])
    ], -1)),
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("button", {
        onClick: _cache[0] || (_cache[0] = $event => (activeTab.value = 'run_history')),
        class: normalizeClass([
          'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
          activeTab.value === 'run_history' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-on-surface-variant hover:text-[#DC0037]'
        ])
      }, [...(_cache[7] || (_cache[7] = [
        createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "history", -1),
        createTextVNode(" Run History ", -1)
      ]))], 2),
      createBaseVNode("button", {
        onClick: _cache[1] || (_cache[1] = $event => (activeTab.value = 'configurations')),
        class: normalizeClass([
          'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
          activeTab.value === 'configurations' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-on-surface-variant hover:text-[#DC0037]'
        ])
      }, [
        createBaseVNode("span", {
          class: "material-symbols-outlined text-[20px]",
          style: normalizeStyle({ fontVariationSettings: activeTab.value === 'configurations' ? '\'FILL\' 1' : '\'FILL\' 0' })
        }, "description", 4),
        _cache[8] || (_cache[8] = createTextVNode(" Configurations ", -1))
      ], 2)
    ]),
    (activeTab.value === 'configurations')
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (editorView.value)
            ? (openBlock(), createElementBlock("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("div", _hoisted_5, [
                    _cache[9] || (_cache[9] = createBaseVNode("span", { class: "material-symbols-outlined text-on-surface-variant text-[20px]" }, "dataset", -1)),
                    _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-[#DC0037] font-bold" }, "customer-lifecycle-ai", -1)),
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-on-surface-variant" }, "/", -1)),
                    createBaseVNode("strong", _hoisted_6, toDisplayString(editingConfig.value?.name), 1)
                  ]),
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("button", {
                      onClick: closeEditor,
                      class: "px-3 py-1.5 text-sm font-medium text-on-surface-variant bg-white border border-gray-300 rounded-md hover:border-[#DC0037] hover:text-[#DC0037] transition-colors"
                    }, "Cancel changes"),
                    createBaseVNode("button", {
                      onClick: saveConfig,
                      disabled: isSaving.value,
                      class: "px-3 py-1.5 text-sm font-bold text-on-primary bg-[#DC0037] hover:bg-[#B50232] rounded-md transition-colors flex items-center gap-2 shadow-none border border-[#DC0037]"
                    }, [
                      (isSaving.value)
                        ? (openBlock(), createElementBlock("span", _hoisted_9, "sync"))
                        : createCommentVNode("", true),
                      _cache[12] || (_cache[12] = createTextVNode(" save config ", -1))
                    ], 8, _hoisted_8)
                  ])
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("button", {
                      onClick: _cache[2] || (_cache[2] = $event => (editorMode.value = 'edit')),
                      class: normalizeClass(['px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md transition-colors', editorMode.value === 'edit' ? 'text-on-surface bg-white' : 'text-on-surface-variant hover:text-on-surface'])
                    }, "Edit", 2),
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = $event => (editorMode.value = 'preview')),
                      class: normalizeClass(['px-3 py-1.5 text-sm font-medium transition-colors', editorMode.value === 'preview' ? 'text-on-surface bg-white border border-gray-300 rounded-md' : 'text-on-surface-variant hover:text-on-surface'])
                    }, "Preview", 2)
                  ]),
                  _cache[13] || (_cache[13] = createStaticVNode("<div class=\"flex gap-4 items-center\"><div class=\"flex items-center gap-2 text-sm text-on-surface-variant\"><span>Spaces:</span><select class=\"bg-transparent border border-gray-300 rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm\"><option>2</option><option>4</option></select></div><div class=\"flex items-center gap-2 text-sm text-on-surface-variant\"><span>Soft wrap</span><select class=\"bg-transparent border border-gray-300 rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm\"><option>None</option><option>Word</option></select></div></div>", 1))
                ]),
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("div", _hoisted_13, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(editorLines.value, (_, i) => {
                      return (openBlock(), createElementBlock(Fragment, { key: i }, [
                        createTextVNode(toDisplayString(i + 1), 1),
                        _cache[14] || (_cache[14] = createBaseVNode("br", null, null, -1))
                      ], 64))
                    }), 128))
                  ]),
                  (editorMode.value === 'edit')
                    ? (openBlock(), createElementBlock("div", _hoisted_14, [
                        withDirectives(createBaseVNode("textarea", {
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((editingConfig.value.content) = $event)),
                          class: "w-full h-full min-h-[400px] bg-transparent border-none outline-none resize-none font-mono text-[13px] leading-[1.6] text-on-surface",
                          spellcheck: "false"
                        }, null, 512), [
                          [vModelText, editingConfig.value.content]
                        ])
                      ]))
                    : (openBlock(), createElementBlock("div", _hoisted_15, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(editorLines.value, (line, i) => {
                          return (openBlock(), createElementBlock(Fragment, { key: i }, [
                            createBaseVNode("span", _hoisted_16, toDisplayString(line.match(/^\s*\w+/) ? line.match(/^\s*\w+/)[0] : ''), 1),
                            createBaseVNode("span", null, toDisplayString(line.replace(/^\s*\w+/, '')), 1),
                            _cache[15] || (_cache[15] = createBaseVNode("br", null, null, -1))
                          ], 64))
                        }), 128))
                      ]))
                ])
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_17, [
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("p", _hoisted_20, toDisplayString(configs.value.length) + " extraction specs in etl/config/extraction_specs/ ", 1),
                    createBaseVNode("div", _hoisted_21, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]" }, "search", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((searchQuery).value = $event)),
                        class: "bg-white border border-gray-300 rounded-sm pl-8 pr-3 py-1 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary w-56",
                        placeholder: "Search configs...",
                        type: "text"
                      }, null, 512), [
                        [vModelText, searchQuery.value]
                      ])
                    ])
                  ]),
                  createBaseVNode("button", {
                    onClick: openNewEditor,
                    class: "bg-[#DC0037] hover:bg-[#B50232] text-on-primary font-medium py-2 px-4 rounded-sm transition-colors flex items-center gap-2 text-body-md shadow-none"
                  }, [...(_cache[17] || (_cache[17] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "add", -1),
                    createTextVNode(" New Config ", -1)
                  ]))])
                ]),
                createBaseVNode("div", _hoisted_22, [
                  (configsLoading.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_23, " Loading extraction specs… "))
                    : (configsError.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_24, [
                          createBaseVNode("p", null, toDisplayString(configsError.value), 1),
                          createBaseVNode("button", {
                            onClick: loadConfigs,
                            class: "mt-3 text-[#DC0037] font-semibold hover:underline"
                          }, "Retry")
                        ]))
                      : (openBlock(), createElementBlock("table", _hoisted_25, [
                          _cache[24] || (_cache[24] = createBaseVNode("thead", { class: "bg-white border-b border-gray-300 text-label-caps text-on-surface-variant" }, [
                            createBaseVNode("tr", null, [
                              createBaseVNode("th", { class: "px-6 py-4 font-bold tracking-widest" }, "Name"),
                              createBaseVNode("th", { class: "px-6 py-4 font-bold tracking-widest" }, "Status"),
                              createBaseVNode("th", { class: "px-6 py-4 font-bold tracking-widest" }, "Last Modified"),
                              createBaseVNode("th", { class: "px-6 py-4 font-bold tracking-widest" }, "Size (KB)"),
                              createBaseVNode("th", { class: "px-6 py-4 font-bold tracking-widest text-right" }, "Actions")
                            ])
                          ], -1)),
                          createBaseVNode("tbody", _hoisted_26, [
                            (filteredConfigs.value.length === 0 && configs.value.length > 0)
                              ? (openBlock(), createElementBlock("tr", _hoisted_27, [
                                  createBaseVNode("td", _hoisted_28, "No configs matching \"" + toDisplayString(searchQuery.value) + "\"", 1)
                                ]))
                              : (configs.value.length === 0)
                                ? (openBlock(), createElementBlock("tr", _hoisted_29, [...(_cache[18] || (_cache[18] = [
                                    createBaseVNode("td", {
                                      colspan: "5",
                                      class: "p-12 text-center text-body-md text-secondary"
                                    }, "No extraction specs found — create one with + New Config", -1)
                                  ]))]))
                                : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredConfigs.value, (config) => {
                              return (openBlock(), createElementBlock("tr", {
                                key: config.id,
                                class: "hover:bg-white-container-low transition-colors group cursor-pointer",
                                onClick: $event => (openEditor(config))
                              }, [
                                createBaseVNode("td", _hoisted_31, [
                                  createBaseVNode("div", _hoisted_32, toDisplayString(config.name), 1),
                                  createBaseVNode("div", _hoisted_33, toDisplayString(config.description), 1)
                                ]),
                                createBaseVNode("td", _hoisted_34, [
                                  (config.status === 'valid')
                                    ? (openBlock(), createElementBlock("span", _hoisted_35, [...(_cache[19] || (_cache[19] = [
                                        createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-green-600" }, null, -1),
                                        createTextVNode(" valid ", -1)
                                      ]))]))
                                    : (openBlock(), createElementBlock("span", _hoisted_36, [...(_cache[20] || (_cache[20] = [
                                        createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-absa-energy" }, null, -1),
                                        createTextVNode(" check needed ", -1)
                                      ]))]))
                                ]),
                                createBaseVNode("td", _hoisted_37, toDisplayString(relativeTime(config.lastModified)), 1),
                                createBaseVNode("td", _hoisted_38, toDisplayString(config.size), 1),
                                createBaseVNode("td", _hoisted_39, [
                                  createBaseVNode("div", {
                                    class: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                    onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
                                  }, [
                                    createBaseVNode("button", {
                                      onClick: $event => (openEditor(config)),
                                      class: "p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded-sm transition-colors",
                                      title: "Edit"
                                    }, [...(_cache[21] || (_cache[21] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "edit", -1)
                                    ]))], 8, _hoisted_40),
                                    createBaseVNode("button", {
                                      onClick: $event => (runConfig(config)),
                                      class: "p-1.5 text-on-surface-variant hover:text-[#2e7d32] hover:bg-[#2e7d32]/10 rounded-sm transition-colors",
                                      title: "Run now"
                                    }, [...(_cache[22] || (_cache[22] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "play_arrow", -1)
                                    ]))], 8, _hoisted_41),
                                    createBaseVNode("button", {
                                      onClick: $event => (deleteConfig(config.name)),
                                      class: "p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded-sm transition-colors",
                                      title: "Delete"
                                    }, [...(_cache[23] || (_cache[23] = [
                                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "delete", -1)
                                    ]))], 8, _hoisted_42)
                                  ])
                                ])
                              ], 8, _hoisted_30))
                            }), 128))
                          ])
                        ]))
                ])
              ]))
        ], 64))
      : (openBlock(), createElementBlock("div", _hoisted_43, [...(_cache[25] || (_cache[25] = [
          createBaseVNode("p", { class: "text-body-lg" }, "Run History logs will appear here.", -1)
        ]))]))
  ]))
}
}

};

export { _sfc_main as default };
