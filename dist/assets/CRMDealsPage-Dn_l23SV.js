import { $ as createLucideIcon, _ as _export_sfc, J as decodeJWT, r as ref, M as watch, aa as resolveDirective, o as openBlock, C as createBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, h as normalizeClass, s as unref, q as createVNode, a3 as X, F as Fragment, e as renderList, ab as resolveDynamicComponent, A as createTextVNode, a9 as FileText, j as createCommentVNode, x as withDirectives, T as Teleport, a0 as Calendar, a2 as MessageSquare, G as useRBAC, i as computed, f as onMounted, v as withModifiers, y as vModelText, L as vModelSelect, ad as Percent, a4 as Filter, a as createStaticVNode, n as normalizeStyle, w as withCtx, Y as isRef, D as resolveComponent } from './index-rR_eRHdu.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-7pQD8Jf0.js';
import { _ as _sfc_main$4 } from './BackButton-DsAIkTW4.js';
import { R as getDealActivities, z as getAccounts, y as getContacts, L as updateDeal, K as createDeal, Q as getDeals, S as deleteDeal, B as emit, i as useCRMModule } from './CRMModule-Cpp-1nIr.js';
import { u as useCurrency } from './useCurrency-BGz46Aay.js';
import { H as History, a as Link, L as LinkedDocumentsWidget, S as SquarePen } from './LinkedDocumentsWidget-Di3psYEQ.js';
import { I as Info } from './info-DJI6gq6p.js';
import { B as Building2 } from './building-2-BUaAzTsL.js';
import { U as User, H as Handshake } from './user-CeGsgJJb.js';
import { A as AlignLeft, U as UserCheck } from './user-check-CPWkET-Z.js';
import { L as LoaderCircle } from './loader-circle-CBZniwa2.js';
import { T as Trash2 } from './trash-2-CsMcdkao.js';
import { P as Phone } from './phone-CQHYwDhI.js';
import { M as Mail } from './mail-B-IsY1kd.js';
import { P as Plus } from './plus-0PK5EWbd.js';
import { U as UserSearchSelect } from './UserSearchSelect-CghqkF4H.js';
import { C as Calculator } from './calculator-BGhni4wJ.js';
import { S as Save } from './upload-BNgWTMz9.js';
import { D as DollarSign } from './dollar-sign-DdwrADXv.js';
import { T as TrendingUp } from './trending-up-B4EJ2ZQm.js';
import { S as Search } from './search-8qNvz6y7.js';
import { C as ChevronDown } from './chevron-down-D7tZkelL.js';
import { L as LayoutGrid } from './layout-grid-DDMO5ojn.js';
import { L as LayoutList, A as ArrowUpDown } from './layout-list-B0JxO1LZ.js';
import { E as Eye } from './eye-C4FMrTwJ.js';
import { I as Inbox } from './inbox-DDOKhJLH.js';
import { C as ChevronLeft } from './chevron-left-B4V3aq-c.js';
import { C as ChevronRight } from './chevron-right-BS4Lx8MZ.js';
import { T as TriangleAlert } from './triangle-alert-XzMZerFP.js';
import { C as CircleUser } from './circle-user-CEgMKEcl.js';
import './_commonjsHelpers-BFTU3MAI.js';
import './check-HMBTIf7J.js';
import './download-Cpxob9od.js';
import './file-spreadsheet-CAOwekEn.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const SquareCheckBig = createLucideIcon("SquareCheckBigIcon", [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);

const _hoisted_1$3 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-2 md:p-4 backdrop-blur-sm"
};
const _hoisted_2$3 = { class: "bg-white border border-gray-200 shadow-[0_0_50px_rgba(47,46,139,0.2)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative rounded-none" };
const _hoisted_3$3 = { class: "bg-white border-b border-gray-100 p-6 relative z-10" };
const _hoisted_4$3 = { class: "flex items-start justify-between" };
const _hoisted_5$3 = { class: "flex-1" };
const _hoisted_6$3 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_7$3 = { class: "flex flex-wrap items-center gap-4 mt-6" };
const _hoisted_8$3 = { class: "flex items-center gap-4" };
const _hoisted_9$3 = { class: "bg-gray-50 border border-gray-100 p-3 rounded-sm min-w-[120px]" };
const _hoisted_10$3 = { class: "text-xl font-black text-[#2F2E8B] font-mono tracking-tighter" };
const _hoisted_11$3 = { class: "bg-gray-50 border border-gray-100 p-3 rounded-sm min-w-[100px]" };
const _hoisted_12$3 = { class: "text-xl font-black text-[#2F2E8B] font-mono tracking-tighter" };
const _hoisted_13$2 = { class: "bg-[#2F2E8B] border border-[#2F2E8B] p-3 rounded-sm min-w-[120px]" };
const _hoisted_14$2 = { class: "text-xl font-black text-white font-mono tracking-tighter" };
const _hoisted_15$2 = { class: "border-b border-gray-100 bg-gray-50/50 relative z-10" };
const _hoisted_16$2 = { class: "flex gap-1 px-6 overflow-x-auto custom-scrollbar" };
const _hoisted_17$2 = ["onClick"];
const _hoisted_18$2 = { class: "flex-1 overflow-y-auto p-3 md:p-6 custom-scrollbar" };
const _hoisted_19$2 = {
  key: 0,
  class: "space-y-6 relative z-10"
};
const _hoisted_20$2 = { class: "bg-white border border-gray-100 p-6 relative overflow-hidden rounded-sm" };
const _hoisted_21$2 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] mb-6 flex items-center gap-2 uppercase tracking-widest" };
const _hoisted_22$2 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" };
const _hoisted_23$2 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_24$2 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tighter" };
const _hoisted_25$2 = { class: "text-[11px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_26$2 = { class: "text-[11px] font-mono font-black text-gray-900" };
const _hoisted_27$2 = { key: 0 };
const _hoisted_28$2 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tighter" };
const _hoisted_29$2 = { key: 1 };
const _hoisted_30$2 = { class: "text-[11px] font-mono font-black text-green-600 uppercase tracking-tighter" };
const _hoisted_31$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_32$2 = {
  key: 0,
  class: "bg-white border border-gray-100 p-6 rounded-sm"
};
const _hoisted_33$2 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest" };
const _hoisted_34$2 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight" };
const _hoisted_35$2 = {
  key: 1,
  class: "bg-white border border-gray-100 p-6 rounded-sm"
};
const _hoisted_36$2 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest" };
const _hoisted_37$2 = { class: "flex items-center gap-3" };
const _hoisted_38$2 = { class: "w-8 h-8 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-[10px] font-mono font-black text-gray-400 uppercase" };
const _hoisted_39$2 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight" };
const _hoisted_40$2 = {
  key: 0,
  class: "bg-white border border-gray-100 p-6 rounded-sm"
};
const _hoisted_41$2 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest" };
const _hoisted_42$2 = { class: "text-[10px] font-mono text-gray-600 leading-relaxed uppercase tracking-tight whitespace-pre-wrap" };
const _hoisted_43$2 = {
  key: 1,
  class: "bg-blue-50/30 border border-blue-100 p-6 rounded-sm"
};
const _hoisted_44$2 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] mb-4 flex items-center gap-2 uppercase tracking-widest" };
const _hoisted_45$2 = { class: "text-[10px] font-mono text-gray-700 leading-relaxed uppercase tracking-tight" };
const _hoisted_46$2 = { class: "bg-gray-50/50 border border-gray-100 p-6 rounded-sm" };
const _hoisted_47$1 = { class: "grid grid-cols-2 lg:grid-cols-4 gap-6" };
const _hoisted_48$1 = { class: "text-[9px] font-mono font-black text-gray-600 uppercase" };
const _hoisted_49$1 = { class: "text-[9px] font-mono font-black text-gray-600 uppercase" };
const _hoisted_50$1 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase" };
const _hoisted_51$1 = { class: "text-[9px] font-mono text-gray-400 font-bold overflow-hidden whitespace-nowrap text-ellipsis block" };
const _hoisted_52$1 = {
  key: 1,
  class: "relative z-10"
};
const _hoisted_53$1 = {
  key: 0,
  class: "flex justify-center py-12"
};
const _hoisted_54$1 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_55$1 = { class: "flex-shrink-0 relative" };
const _hoisted_56$1 = { class: "flex-1 bg-white border border-gray-100 p-4 transition-all hover:border-gray-200 rounded-sm" };
const _hoisted_57$1 = { class: "flex items-start justify-between" };
const _hoisted_58$1 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest" };
const _hoisted_59$1 = { class: "text-[10px] font-mono text-gray-500 mt-2 leading-relaxed tracking-tight uppercase" };
const _hoisted_60$1 = { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_61$1 = {
  key: 2,
  class: "text-center py-16 bg-gray-50/50 rounded-sm border border-dashed border-gray-200"
};
const _hoisted_62$1 = {
  key: 2,
  class: "relative z-10"
};
const _hoisted_63$1 = { class: "text-center py-16 bg-gray-50/50 rounded-sm border border-dashed border-gray-200" };
const _hoisted_64$1 = {
  key: 3,
  class: "space-y-6"
};
const _hoisted_65$1 = { class: "border-t border-gray-100 p-6 bg-white relative z-10" };
const _hoisted_66$1 = { class: "flex flex-col sm:flex-row justify-between gap-4" };
const _hoisted_67$1 = { class: "flex gap-3" };


const _sfc_main$3 = {
  __name: 'DealDetailModal',
  props: {
  modelValue: Boolean,
  deal: Object
},
  emits: ['update:modelValue', 'edit', 'delete', 'refresh'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const { getTenantId } = decodeJWT();
const { formatCurrency } = useCurrency();

const activeTab = ref('overview');
const activities = ref([]);
const loadingActivities = ref(false);

const tabs = [
  { id: 'overview', label: 'Overview', lucideIcon: Info },
  { id: 'activities', label: 'Activities', lucideIcon: History },
  { id: 'related', label: 'Related', lucideIcon: Link },
  { id: 'documents', label: 'Documents', lucideIcon: FileText }
];

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.deal) {
    activeTab.value = 'overview';
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'activities' && activities.value.length === 0) {
    loadActivities();
  }
});

async function loadActivities() {
  if (!props.deal?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    activities.value = await getDealActivities(props.deal.id, tenantId);
  } catch (error) {
    console.error('Failed to load activities:', error);
    activities.value = [];
  } finally {
    loadingActivities.value = false;
  }
}

function close() {
  emit('update:modelValue', false);
}

function handleEdit() {
  emit('edit', props.deal);
}

function handleDelete() {
  emit('delete', props.deal);
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatStage(stage) {
  if (!stage) return '';
  return stage.replace(/-/g, ' ');
}

function getActivityLucideIcon(type) {
  const icons = {
    'created': Plus,
    'updated': SquarePen,
    'note': FileText,
    'email': Mail,
    'call': Phone,
    'meeting': Calendar
  };
  return icons[type?.toLowerCase()] || MessageSquare;
}

function getActivityColorClass(type) {
  const colors = {
    'created': 'bg-green-500 border-green-600',
    'updated': 'bg-blue-500 border-blue-600',
    'note': 'bg-yellow-500 border-yellow-600',
    'email': 'bg-purple-500 border-purple-600',
    'call': 'bg-orange-500 border-orange-600',
    'meeting': 'bg-pink-500 border-pink-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400 border-gray-500';
}

function getStageBadgeClass(stage) {
  return 'bg-gray-50 text-gray-400 border-gray-100';
}

return (_ctx, _cache) => {
  const _directive_permission = resolveDirective("permission");

  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$3, [
            createBaseVNode("div", _hoisted_3$3, [
              createBaseVNode("div", _hoisted_4$3, [
                createBaseVNode("div", _hoisted_5$3, [
                  _cache[3] || (_cache[3] = createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                    createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                    createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "DEAL_IDENTIFIER // DETAILS")
                  ], -1)),
                  createBaseVNode("h2", _hoisted_6$3, toDisplayString(__props.deal?.name), 1),
                  createBaseVNode("div", _hoisted_7$3, [
                    createBaseVNode("div", {
                      class: normalizeClass([getStageBadgeClass(__props.deal?.stage), "inline-block px-3 py-1 border text-[10px] font-mono font-black uppercase tracking-widest rounded-sm"])
                    }, toDisplayString(formatStage(__props.deal?.stage)), 3),
                    createBaseVNode("div", _hoisted_8$3, [
                      createBaseVNode("div", _hoisted_9$3, [
                        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "VAL_ESTIMATE", -1)),
                        createBaseVNode("div", _hoisted_10$3, toDisplayString(unref(formatCurrency)(__props.deal?.amount)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_11$3, [
                        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "PROBABILITY", -1)),
                        createBaseVNode("div", _hoisted_12$3, toDisplayString(__props.deal?.probability) + "%", 1)
                      ]),
                      createBaseVNode("div", _hoisted_13$2, [
                        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-1" }, "WEIGHTED_VAL", -1)),
                        createBaseVNode("div", _hoisted_14$2, toDisplayString(unref(formatCurrency)(((__props.deal?.amount || 0) * (__props.deal?.probability || 0)) / 100)), 1)
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: close,
                  class: "p-2 border border-gray-100 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition ml-4"
                }, [
                  createVNode(unref(X), { size: 20 })
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_15$2, [
              createBaseVNode("div", _hoisted_16$2, [
                (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                  return createBaseVNode("button", {
                    key: tab.id,
                    onClick: $event => (activeTab.value = tab.id),
                    class: normalizeClass([activeTab.value === tab.id ? 'bg-white text-[#2F2E8B] border-x border-t border-gray-100 -mb-px font-black shadow-none' : 'text-gray-400 hover:text-gray-600 font-bold', "px-6 py-3 transition text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"])
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(tab.lucideIcon), { size: 14 })),
                    createTextVNode(" " + toDisplayString(tab.label), 1)
                  ], 10, _hoisted_17$2)
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_18$2, [
              (activeTab.value === 'overview')
                ? (openBlock(), createElementBlock("div", _hoisted_19$2, [
                    createBaseVNode("div", _hoisted_20$2, [
                      createBaseVNode("h3", _hoisted_21$2, [
                        createVNode(unref(Info), { size: 14 }),
                        _cache[4] || (_cache[4] = createTextVNode(" DEAL_CORE_INFORMATION ", -1))
                      ]),
                      createBaseVNode("div", _hoisted_22$2, [
                        createBaseVNode("div", null, [
                          _cache[5] || (_cache[5] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Deal_Identity", -1)),
                          createBaseVNode("p", _hoisted_23$2, toDisplayString(__props.deal?.name), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[6] || (_cache[6] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Pipeline_Stage", -1)),
                          createBaseVNode("p", _hoisted_24$2, toDisplayString(formatStage(__props.deal?.stage)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[7] || (_cache[7] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Value_Assessment", -1)),
                          createBaseVNode("p", _hoisted_25$2, toDisplayString(unref(formatCurrency)(__props.deal?.amount)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[8] || (_cache[8] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Success_Probability", -1)),
                          createBaseVNode("p", _hoisted_26$2, toDisplayString(__props.deal?.probability) + "%", 1)
                        ]),
                        (__props.deal?.expectedCloseDate)
                          ? (openBlock(), createElementBlock("div", _hoisted_27$2, [
                              _cache[9] || (_cache[9] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Target_Close_Date", -1)),
                              createBaseVNode("p", _hoisted_28$2, toDisplayString(formatDate(__props.deal.expectedCloseDate)), 1)
                            ]))
                          : createCommentVNode("", true),
                        (__props.deal?.actualCloseDate)
                          ? (openBlock(), createElementBlock("div", _hoisted_29$2, [
                              _cache[10] || (_cache[10] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Execution_Close_Date", -1)),
                              createBaseVNode("p", _hoisted_30$2, toDisplayString(formatDate(__props.deal.actualCloseDate)), 1)
                            ]))
                          : createCommentVNode("", true)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_31$2, [
                      (__props.deal?.accountName)
                        ? (openBlock(), createElementBlock("div", _hoisted_32$2, [
                            createBaseVNode("h3", _hoisted_33$2, [
                              createVNode(unref(Building2), { size: 14 }),
                              _cache[11] || (_cache[11] = createTextVNode(" ORGANIZATION_NODE ", -1))
                            ]),
                            createBaseVNode("p", _hoisted_34$2, toDisplayString(__props.deal.accountName), 1)
                          ]))
                        : createCommentVNode("", true),
                      (__props.deal?.contactName)
                        ? (openBlock(), createElementBlock("div", _hoisted_35$2, [
                            createBaseVNode("h3", _hoisted_36$2, [
                              createVNode(unref(User), { size: 14 }),
                              _cache[12] || (_cache[12] = createTextVNode(" PRIMARY_CONTACT ", -1))
                            ]),
                            createBaseVNode("div", _hoisted_37$2, [
                              createBaseVNode("div", _hoisted_38$2, toDisplayString(__props.deal.contactName?.charAt(0)), 1),
                              createBaseVNode("p", _hoisted_39$2, toDisplayString(__props.deal.contactName), 1)
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ]),
                    (__props.deal?.description)
                      ? (openBlock(), createElementBlock("div", _hoisted_40$2, [
                          createBaseVNode("h3", _hoisted_41$2, [
                            createVNode(unref(AlignLeft), { size: 14 }),
                            _cache[13] || (_cache[13] = createTextVNode(" DEAL_NARRATIVE ", -1))
                          ]),
                          createBaseVNode("p", _hoisted_42$2, toDisplayString(__props.deal.description), 1)
                        ]))
                      : createCommentVNode("", true),
                    (__props.deal?.nextSteps)
                      ? (openBlock(), createElementBlock("div", _hoisted_43$2, [
                          createBaseVNode("h3", _hoisted_44$2, [
                            createVNode(unref(SquareCheckBig), { size: 14 }),
                            _cache[14] || (_cache[14] = createTextVNode(" SYSTEM_NEXT_STEPS ", -1))
                          ]),
                          createBaseVNode("p", _hoisted_45$2, toDisplayString(__props.deal.nextSteps), 1)
                        ]))
                      : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_46$2, [
                      _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-[9px] font-mono font-black text-gray-400 mb-4 uppercase tracking-widest" }, "SYSTEM_METADATA", -1)),
                      createBaseVNode("div", _hoisted_47$1, [
                        createBaseVNode("div", null, [
                          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1" }, "Node_Created", -1)),
                          createBaseVNode("span", _hoisted_48$1, toDisplayString(formatDate(__props.deal?.createdAt)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1" }, "State_Updated", -1)),
                          createBaseVNode("span", _hoisted_49$1, toDisplayString(formatDate(__props.deal?.updatedAt)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1" }, "Assigned_Owner", -1)),
                          createBaseVNode("span", _hoisted_50$1, toDisplayString(__props.deal?.owner || 'UNASSIGNED'), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-1" }, "Object_ID", -1)),
                          createBaseVNode("span", _hoisted_51$1, toDisplayString(__props.deal?.id), 1)
                        ])
                      ])
                    ])
                  ]))
                : createCommentVNode("", true),
              (activeTab.value === 'activities')
                ? (openBlock(), createElementBlock("div", _hoisted_52$1, [
                    (loadingActivities.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_53$1, [
                          createVNode(unref(LoaderCircle), {
                            class: "animate-spin text-[#2F2E8B]",
                            size: 32
                          })
                        ]))
                      : (activities.value.length > 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_54$1, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(activities.value, (activity) => {
                              return (openBlock(), createElementBlock("div", {
                                key: activity.id,
                                class: "flex gap-4 group"
                              }, [
                                createBaseVNode("div", _hoisted_55$1, [
                                  _cache[20] || (_cache[20] = createBaseVNode("div", { class: "absolute inset-0 bg-[#2F2E8B]/10 rounded-sm scale-0 transition-transform group-hover:scale-100" }, null, -1)),
                                  createBaseVNode("div", {
                                    class: normalizeClass([getActivityColorClass(activity.type), "w-10 h-10 border border-transparent rounded-sm flex items-center justify-center relative z-10"])
                                  }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(getActivityLucideIcon(activity.type)), {
                                      size: 16,
                                      class: "text-white"
                                    }))
                                  ], 2)
                                ]),
                                createBaseVNode("div", _hoisted_56$1, [
                                  createBaseVNode("div", _hoisted_57$1, [
                                    createBaseVNode("div", null, [
                                      createBaseVNode("h4", _hoisted_58$1, toDisplayString(activity.type), 1),
                                      createBaseVNode("p", _hoisted_59$1, toDisplayString(activity.description), 1)
                                    ]),
                                    createBaseVNode("span", _hoisted_60$1, toDisplayString(formatDate(activity.createdAt)), 1)
                                  ])
                                ])
                              ]))
                            }), 128))
                          ]))
                        : (openBlock(), createElementBlock("div", _hoisted_61$1, [
                            createVNode(unref(History), {
                              size: 32,
                              class: "text-gray-200 mx-auto mb-4"
                            }),
                            _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "ZERO_ACTIVITIES_LOGGED", -1))
                          ]))
                  ]))
                : createCommentVNode("", true),
              (activeTab.value === 'related')
                ? (openBlock(), createElementBlock("div", _hoisted_62$1, [
                    createBaseVNode("div", _hoisted_63$1, [
                      createVNode(unref(Link), {
                        size: 32,
                        class: "text-gray-200 mx-auto mb-4"
                      }),
                      _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "NO_RELATED_ENTITIES_DETECTED", -1))
                    ])
                  ]))
                : createCommentVNode("", true),
              (activeTab.value === 'documents')
                ? (openBlock(), createElementBlock("div", _hoisted_64$1, [
                    createVNode(LinkedDocumentsWidget, {
                      recordType: "deal",
                      recordId: __props.deal.id,
                      recordName: __props.deal.name
                    }, null, 8, ["recordId", "recordName"])
                  ]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_65$1, [
              createBaseVNode("div", _hoisted_66$1, [
                withDirectives((openBlock(), createElementBlock("button", {
                  onClick: handleDelete,
                  class: "px-6 py-2.5 border border-red-200 text-red-500 rounded-sm hover:bg-red-50 transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2"
                }, [
                  createVNode(unref(Trash2), { size: 14 }),
                  _cache[23] || (_cache[23] = createTextVNode(" EXEC_DELETE_DEAL ", -1))
                ])), [
                  [_directive_permission, ['crm', 'delete']]
                ]),
                createBaseVNode("div", _hoisted_67$1, [
                  createBaseVNode("button", {
                    onClick: close,
                    class: "px-6 py-2.5 border border-gray-100 text-gray-400 rounded-sm hover:bg-gray-50 transition text-[9px] font-mono font-black uppercase tracking-widest"
                  }, " CLOSE "),
                  createBaseVNode("button", {
                    onClick: handleEdit,
                    class: "px-8 py-2.5 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-100"
                  }, [
                    createVNode(unref(SquarePen), { size: 14 }),
                    _cache[24] || (_cache[24] = createTextVNode(" MODIFY_DEAL_STATE ", -1))
                  ])
                ])
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const DealDetailModal = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-c7f89a47"]]);

const _hoisted_1$2 = { class: "bg-white rounded-sm shadow-2xl max-w-5xl w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10" };
const _hoisted_2$2 = { class: "relative z-10 sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-sm" };
const _hoisted_3$2 = { class: "flex items-center justify-between" };
const _hoisted_4$2 = { class: "flex items-center gap-3" };
const _hoisted_5$2 = { class: "text-sm font-black text-gray-900 uppercase tracking-tight font-mono flex items-center gap-2" };
const _hoisted_6$2 = { class: "relative z-10 flex-1 overflow-y-auto p-4 max-h-[75vh]" };
const _hoisted_7$2 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_8$2 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_9$2 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_10$2 = { class: "relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_11$2 = { class: "md:col-span-3 space-y-1.5" };
const _hoisted_12$2 = { class: "space-y-1.5" };
const _hoisted_13$1 = { class: "space-y-1.5" };
const _hoisted_14$1 = { class: "space-y-1.5" };
const _hoisted_15$1 = { class: "space-y-1.5" };
const _hoisted_16$1 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_17$1 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_18$1 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_19$1 = { class: "relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_20$1 = { class: "space-y-1.5" };
const _hoisted_21$1 = ["value"];
const _hoisted_22$1 = { class: "space-y-1.5" };
const _hoisted_23$1 = ["value"];
const _hoisted_24$1 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_25$1 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_26$1 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_27$1 = {
  key: 0,
  class: "relative z-10 p-4"
};
const _hoisted_28$1 = {
  key: 1,
  class: "relative z-10 p-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400"
};
const _hoisted_29$1 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_30$1 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_31$1 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_32$1 = { class: "relative z-10 p-4 space-y-4" };
const _hoisted_33$1 = { class: "space-y-1.5" };
const _hoisted_34$1 = { class: "space-y-1.5" };
const _hoisted_35$1 = { class: "bg-gray-50 rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_36$1 = { class: "relative z-10 p-4" };
const _hoisted_37$1 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_38$1 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_39$1 = { class: "text-[10px] text-gray-500 font-mono mt-1" };
const _hoisted_40$1 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden"
};
const _hoisted_41$1 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_42$1 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_43$1 = { class: "relative z-10 p-4" };
const _hoisted_44$1 = { class: "relative z-10 border-t border-gray-200 p-4 bg-white sticky bottom-0" };
const _hoisted_45$1 = { class: "flex flex-col sm:flex-row justify-end gap-2" };
const _hoisted_46$1 = ["disabled"];


const _sfc_main$2 = {
  __name: 'DealFormModal',
  props: {
  modelValue: Boolean,
  deal: Object,
  users: Array
},
  emits: ['update:modelValue', 'saved'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const { getTenantId, getUserEmail } = decodeJWT();
const { formatCurrency } = useCurrency();
const { canAssign, initializeRBAC } = useRBAC();
const currentUserEmail = getUserEmail();
const canAssignCrm = computed(() => canAssign('crm'));

const saving = ref(false);
const accounts = ref([]);
const contacts = ref([]);

const form = ref({
  name: '',
  amount: null,
  stage: '',
  probability: 50,
  expectedCloseDate: '',
  accountId: '',
  contactId: '',
  description: '',
  nextStep: '',
  assignedTo: currentUserEmail
});

const isEditMode = computed(() => !!props.deal?.id);

const filteredContacts = computed(() => {
  if (!form.value.accountId) {
    return contacts.value;
  }
  return contacts.value.filter(c => {
    const contactAccountId = c.accountId || c.account_id;
    return contactAccountId === form.value.accountId;
  });
});

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    initializeRBAC().catch(() => {});
    if (props.deal) {
      form.value = {
        id: props.deal.id,
        name: props.deal.name || '',
        amount: props.deal.value || props.deal.amount || null,
        stage: props.deal.stage || '',
        probability: props.deal.probability || 50,
        expectedCloseDate: props.deal.expectedCloseDate || '',
        accountId: props.deal.accountId || '',
        contactId: props.deal.contactId || '',
        description: props.deal.description || '',
        nextStep: props.deal.nextStep || '',
        assignedTo: props.deal.assignedTo || props.deal.owner || currentUserEmail
      };
    } else {
      resetForm();
    }
    loadAccounts();
    loadContacts();
  }
});

function resetForm() {
  form.value = {
    name: '',
    amount: null,
    stage: '',
    probability: 50,
    expectedCloseDate: '',
    accountId: '',
    contactId: '',
    description: '',
    nextStep: '',
    assignedTo: currentUserEmail
  };
}

async function loadAccounts() {
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const response = await getAccounts(tenantId, { per_page: 1000 });
    accounts.value = response.items || response || [];
  } catch (error) {
    console.error('Failed to load accounts:', error);
    accounts.value = [];
  }
}

async function loadContacts() {
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const response = await getContacts(tenantId, { per_page: 1000 });
    contacts.value = response.items || response || [];
  } catch (error) {
    console.error('Failed to load contacts:', error);
    contacts.value = [];
  }
}

function onAccountChange() {
  if (form.value.contactId) {
    const contact = contacts.value.find(c => (c.id || c._id) === form.value.contactId);
    if (contact) {
      const contactAccountId = contact.accountId || contact.account_id;
      if (contactAccountId !== form.value.accountId) {
        form.value.contactId = '';
      }
    }
  }
}

async function handleSubmit() {
  if (!form.value.name || !form.value.amount || !form.value.stage) {
    alert('Please fill in all required fields');
    return;
  }

  if (form.value.probability < 0 || form.value.probability > 100) {
    alert('Probability must be between 0 and 100');
    return;
  }

  saving.value = true;
  try {
    const tenantId = String(getTenantId() || '');
    if (!tenantId) throw new Error('Missing tenant ID');
    const payload = {
      name: form.value.name,
      value: form.value.amount,
      stage: form.value.stage,
      probability: form.value.probability,
      expectedCloseDate: form.value.expectedCloseDate,
      accountId: form.value.accountId,
      contactId: form.value.contactId,
      description: form.value.description,
      nextStep: form.value.nextStep,
      assignedTo: canAssignCrm.value
        ? form.value.assignedTo
        : (isEditMode.value ? (props.deal?.assignedTo || props.deal?.owner || currentUserEmail) : currentUserEmail),
      tenant_id: tenantId
    };
    if (isEditMode.value) {
      await updateDeal(props.deal.id, payload);
    } else {
      await createDeal(payload);
    }

    emit('saved');
    emit('update:modelValue', false);
  } catch (error) {
    console.error('Failed to save deal:', error);
    alert('Failed to save deal. Please try again.');
  } finally {
    saving.value = false;
  }
}


function close() {
  if (!saving.value) {
    emit('update:modelValue', false);
  }
}

onMounted(() => {
  if (props.modelValue) {
    loadAccounts();
    loadContacts();
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-10 overflow-y-auto",
          onClick: withModifiers(close, ["self"])
        }, [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$2, [
              createBaseVNode("div", _hoisted_3$2, [
                createBaseVNode("div", _hoisted_4$2, [
                  _cache[11] || (_cache[11] = createBaseVNode("div", { class: "w-1 h-6 bg-[#2F2E8B]" }, null, -1)),
                  createBaseVNode("div", null, [
                    _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "CRM // Deals // Form", -1)),
                    createBaseVNode("h2", _hoisted_5$2, [
                      createVNode(unref(Handshake), {
                        size: 14,
                        class: "text-[#2F2E8B]"
                      }),
                      createTextVNode(" " + toDisplayString(isEditMode.value ? 'Edit_Deal' : 'New_Deal'), 1)
                    ])
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: close,
                  class: "p-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_6$2, [
              createBaseVNode("form", {
                onSubmit: withModifiers(handleSubmit, ["prevent"]),
                class: "space-y-4"
              }, [
                createBaseVNode("section", _hoisted_7$2, [
                  createBaseVNode("div", _hoisted_8$2, [
                    _cache[13] || (_cache[13] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_9$2, [
                      createVNode(unref(Info), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[12] || (_cache[12] = createTextVNode(" Basic_Information ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_10$2, [
                    createBaseVNode("div", _hoisted_11$2, [
                      _cache[14] || (_cache[14] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Deal_Name *", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.name) = $event)),
                        required: "",
                        type: "text",
                        class: "input-base",
                        placeholder: "e.g. Enterprise Software License"
                      }, null, 512), [
                        [vModelText, form.value.name]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_12$2, [
                      _cache[15] || (_cache[15] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Amount *", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.amount) = $event)),
                        required: "",
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "input-base",
                        placeholder: "0.00"
                      }, null, 512), [
                        [
                          vModelText,
                          form.value.amount,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_13$1, [
                      _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Stage *", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.stage) = $event)),
                        required: "",
                        class: "input-base"
                      }, [...(_cache[16] || (_cache[16] = [
                        createBaseVNode("option", { value: "" }, "Select Stage", -1),
                        createBaseVNode("option", { value: "negotiation" }, "Negotiation", -1),
                        createBaseVNode("option", { value: "closed-won" }, "Closed Won", -1),
                        createBaseVNode("option", { value: "closed-lost" }, "Closed Lost", -1)
                      ]))], 512), [
                        [vModelSelect, form.value.stage]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_14$1, [
                      _cache[18] || (_cache[18] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Probability (%) *", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.probability) = $event)),
                        required: "",
                        type: "number",
                        min: "0",
                        max: "100",
                        class: "input-base",
                        placeholder: "50"
                      }, null, 512), [
                        [
                          vModelText,
                          form.value.probability,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_15$1, [
                      _cache[19] || (_cache[19] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Expected_Close_Date", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.expectedCloseDate) = $event)),
                        type: "date",
                        class: "input-base"
                      }, null, 512), [
                        [vModelText, form.value.expectedCloseDate]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_16$1, [
                  createBaseVNode("div", _hoisted_17$1, [
                    _cache[21] || (_cache[21] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_18$1, [
                      createVNode(unref(Link), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[20] || (_cache[20] = createTextVNode(" Associated_Records ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_19$1, [
                    createBaseVNode("div", _hoisted_20$1, [
                      _cache[23] || (_cache[23] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Account", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.value.accountId) = $event)),
                        onChange: onAccountChange,
                        class: "input-base"
                      }, [
                        _cache[22] || (_cache[22] = createBaseVNode("option", { value: "" }, "Select Account", -1)),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(accounts.value, (account) => {
                          return (openBlock(), createElementBlock("option", {
                            key: account.id || account._id,
                            value: account.id || account._id
                          }, toDisplayString(account.name), 9, _hoisted_21$1))
                        }), 128))
                      ], 544), [
                        [vModelSelect, form.value.accountId]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_22$1, [
                      _cache[25] || (_cache[25] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Contact", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.value.contactId) = $event)),
                        class: "input-base"
                      }, [
                        _cache[24] || (_cache[24] = createBaseVNode("option", { value: "" }, "Select Contact", -1)),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(filteredContacts.value, (contact) => {
                          return (openBlock(), createElementBlock("option", {
                            key: contact.id || contact._id,
                            value: contact.id || contact._id
                          }, toDisplayString(contact.firstName) + " " + toDisplayString(contact.lastName), 9, _hoisted_23$1))
                        }), 128))
                      ], 512), [
                        [vModelSelect, form.value.contactId]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_24$1, [
                  createBaseVNode("div", _hoisted_25$1, [
                    _cache[27] || (_cache[27] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_26$1, [
                      createVNode(unref(UserCheck), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[26] || (_cache[26] = createTextVNode(" Assignment ", -1))
                    ])
                  ]),
                  (canAssignCrm.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_27$1, [
                        createVNode(UserSearchSelect, {
                          modelValue: form.value.assignedTo,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.value.assignedTo) = $event)),
                          users: __props.users,
                          label: ""
                        }, null, 8, ["modelValue", "users"])
                      ]))
                    : (openBlock(), createElementBlock("div", _hoisted_28$1, " Assignment is locked to your scope. "))
                ]),
                createBaseVNode("section", _hoisted_29$1, [
                  createBaseVNode("div", _hoisted_30$1, [
                    _cache[29] || (_cache[29] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_31$1, [
                      createVNode(unref(AlignLeft), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[28] || (_cache[28] = createTextVNode(" Details_&_Next_Steps ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_32$1, [
                    createBaseVNode("div", _hoisted_33$1, [
                      _cache[30] || (_cache[30] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Description", -1)),
                      withDirectives(createBaseVNode("textarea", {
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((form.value.description) = $event)),
                        rows: "3",
                        class: "input-base",
                        placeholder: "Describe the deal opportunity..."
                      }, null, 512), [
                        [vModelText, form.value.description]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_34$1, [
                      _cache[31] || (_cache[31] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Next_Steps", -1)),
                      withDirectives(createBaseVNode("textarea", {
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((form.value.nextStep) = $event)),
                        rows: "2",
                        class: "input-base",
                        placeholder: "What are the next actions?"
                      }, null, 512), [
                        [vModelText, form.value.nextStep]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_35$1, [
                  createBaseVNode("div", _hoisted_36$1, [
                    createBaseVNode("div", _hoisted_37$1, [
                      createVNode(unref(Calculator), {
                        size: 14,
                        class: "text-gray-400"
                      }),
                      _cache[32] || (_cache[32] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Weighted_Value", -1))
                    ]),
                    createBaseVNode("div", _hoisted_38$1, toDisplayString(unref(formatCurrency)((form.value.amount || 0) * (form.value.probability || 0) / 100)), 1),
                    createBaseVNode("div", _hoisted_39$1, toDisplayString(unref(formatCurrency)(form.value.amount || 0)) + " × " + toDisplayString(form.value.probability || 0) + "% ", 1)
                  ])
                ]),
                (form.value.id)
                  ? (openBlock(), createElementBlock("section", _hoisted_40$1, [
                      createBaseVNode("div", _hoisted_41$1, [
                        _cache[34] || (_cache[34] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                        createBaseVNode("span", _hoisted_42$1, [
                          createVNode(unref(FileText), {
                            size: 10,
                            class: "text-[#2F2E8B]"
                          }),
                          _cache[33] || (_cache[33] = createTextVNode(" Documents ", -1))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_43$1, [
                        createVNode(LinkedDocumentsWidget, {
                          recordType: "deal",
                          recordId: form.value.id,
                          recordName: form.value.name
                        }, null, 8, ["recordId", "recordName"])
                      ])
                    ]))
                  : createCommentVNode("", true)
              ], 32)
            ]),
            createBaseVNode("div", _hoisted_44$1, [
              createBaseVNode("div", _hoisted_45$1, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: close,
                  class: "px-5 py-2 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2"
                }, [
                  createVNode(unref(X), { size: 12 }),
                  _cache[35] || (_cache[35] = createTextVNode(" Cancel ", -1))
                ]),
                createBaseVNode("button", {
                  type: "button",
                  onClick: handleSubmit,
                  disabled: saving.value,
                  class: "px-5 py-2 bg-[#2F2E8B] text-white rounded-sm hover:bg-[#3D2F88] transition text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-60 flex items-center justify-center gap-2 min-w-[140px]"
                }, [
                  (saving.value)
                    ? (openBlock(), createBlock(unref(LoaderCircle), {
                        key: 0,
                        size: 12,
                        class: "animate-spin"
                      }))
                    : (openBlock(), createBlock(unref(Save), {
                        key: 1,
                        size: 12
                      })),
                  createTextVNode(" " + toDisplayString(saving.value ? 'Saving…' : (isEditMode.value ? 'Update_Deal' : 'Create_Deal')), 1)
                ], 8, _hoisted_46$1)
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const DealFormModal = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-c50002f0"]]);

const _hoisted_1$1 = { class: "deals-view space-y-6" };
const _hoisted_2$1 = {
  key: 0,
  class: "absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex items-center justify-center"
};
const _hoisted_3$1 = { class: "flex items-center gap-3 text-[#2F2E8B]" };
const _hoisted_4$1 = { class: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4" };
const _hoisted_5$1 = { class: "flex-1 w-full" };
const _hoisted_6$1 = { class: "flex items-center justify-between gap-4" };
const _hoisted_7$1 = { class: "text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-widest" };
const _hoisted_8$1 = { class: "text-[#2F2E8B] font-black" };
const _hoisted_9$1 = { class: "flex items-center gap-2" };
const _hoisted_10$1 = { class: "flex gap-4" };
const _hoisted_11$1 = { class: "bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 relative overflow-hidden group" };
const _hoisted_12$1 = { class: "px-4 py-2 relative z-10 w-32" };
const _hoisted_13 = { class: "text-xl font-black text-[#2F2E8B] tracking-tighter group-hover:scale-110 transition-transform origin-left truncate" };
const _hoisted_14 = { class: "absolute right-2 bottom-2 text-blue-100 group-hover:text-blue-200 transition-colors" };
const _hoisted_15 = { class: "bg-white border border-gray-200 hover:border-purple-500 transition-all duration-300 relative overflow-hidden group" };
const _hoisted_16 = { class: "px-4 py-2 relative z-10 w-32" };
const _hoisted_17 = { class: "text-xl font-black text-purple-600 tracking-tighter group-hover:scale-110 transition-transform origin-left truncate" };
const _hoisted_18 = { class: "absolute right-2 bottom-2 text-purple-100 group-hover:text-purple-200 transition-colors" };
const _hoisted_19 = { class: "bg-white border border-gray-200 hover:border-green-500 transition-all duration-300 relative overflow-hidden group" };
const _hoisted_20 = { class: "px-4 py-2 relative z-10 w-32" };
const _hoisted_21 = { class: "text-xl font-black text-green-600 tracking-tighter group-hover:scale-110 transition-transform origin-left" };
const _hoisted_22 = { class: "absolute right-2 bottom-2 text-green-100 group-hover:text-green-200 transition-colors" };
const _hoisted_23 = { class: "bg-white p-4 space-y-3 border border-gray-200" };
const _hoisted_24 = { class: "flex flex-col lg:flex-row gap-4" };
const _hoisted_25 = { class: "flex-1 relative group" };
const _hoisted_26 = { class: "relative min-w-[160px]" };
const _hoisted_27 = { class: "flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-sm p-1" };
const _hoisted_28 = {
  key: 1,
  class: "flex justify-center items-center py-12"
};
const _hoisted_29 = {
  key: 2,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
};
const _hoisted_30 = ["onClick"];
const _hoisted_31 = { class: "p-4 border-b border-gray-100 relative z-10 flex-1" };
const _hoisted_32 = { class: "flex justify-between items-start mb-3" };
const _hoisted_33 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100" };
const _hoisted_34 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-wider mb-4 line-clamp-2 group-hover:text-[#2F2E8B] transition-colors leading-relaxed" };
const _hoisted_35 = { class: "space-y-2" };
const _hoisted_36 = { class: "flex items-center justify-between group/val" };
const _hoisted_37 = { class: "text-xs font-mono font-black text-[#2F2E8B]" };
const _hoisted_38 = {
  key: 0,
  class: "flex items-center gap-2 mt-3 pt-2 border-t border-gray-50"
};
const _hoisted_39 = { class: "text-[9px] font-mono text-gray-500 uppercase tracking-tight truncate" };
const _hoisted_40 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_41 = { class: "text-[9px] font-mono text-gray-600 font-bold uppercase tracking-tight truncate" };
const _hoisted_42 = { class: "px-4 py-2 border-t border-gray-100 bg-gray-50/50 relative z-10 flex items-center justify-between" };
const _hoisted_43 = { class: "flex items-center gap-2" };
const _hoisted_44 = { class: "text-[8px] font-mono text-gray-400 uppercase tracking-tighter" };
const _hoisted_45 = { class: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" };
const _hoisted_46 = ["onClick"];
const _hoisted_47 = ["onClick"];
const _hoisted_48 = ["onClick"];
const _hoisted_49 = {
  key: 3,
  class: "bg-white border border-gray-200 overflow-hidden rounded-sm relative"
};
const _hoisted_50 = { class: "overflow-x-auto relative z-10" };
const _hoisted_51 = { class: "min-w-full divide-y divide-gray-100" };
const _hoisted_52 = { class: "bg-gray-50/50" };
const _hoisted_53 = { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" };
const _hoisted_54 = { class: "flex items-center gap-2" };
const _hoisted_55 = { class: "divide-y divide-gray-50" };
const _hoisted_56 = ["onClick"];
const _hoisted_57 = { class: "px-4 py-3" };
const _hoisted_58 = { class: "flex items-center gap-3" };
const _hoisted_59 = { class: "w-8 h-8 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-[10px] font-mono font-black text-gray-400 group-hover:text-[#2F2E8B] group-hover:border-blue-100 transition-colors uppercase" };
const _hoisted_60 = { class: "text-[10px] font-mono font-black text-gray-900 group-hover:text-[#2F2E8B] transition-colors uppercase truncate max-w-[200px]" };
const _hoisted_61 = { class: "px-4 py-3" };
const _hoisted_62 = { class: "px-4 py-3" };
const _hoisted_63 = { class: "text-[10px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_64 = { class: "px-4 py-3" };
const _hoisted_65 = { class: "flex items-center gap-2" };
const _hoisted_66 = { class: "w-12 bg-gray-100 h-1 rounded-full overflow-hidden" };
const _hoisted_67 = { class: "text-[9px] font-mono font-black text-gray-600" };
const _hoisted_68 = { class: "px-4 py-3" };
const _hoisted_69 = {
  key: 0,
  class: "flex items-center gap-1.5 min-w-0"
};
const _hoisted_70 = { class: "text-[9px] font-mono text-gray-500 uppercase tracking-tight truncate" };
const _hoisted_71 = {
  key: 1,
  class: "text-[9px] font-mono text-gray-300 uppercase"
};
const _hoisted_72 = { class: "px-4 py-3" };
const _hoisted_73 = {
  key: 0,
  class: "flex items-center gap-1.5"
};
const _hoisted_74 = { class: "text-[9px] font-mono text-gray-700 font-bold uppercase tracking-tight" };
const _hoisted_75 = {
  key: 1,
  class: "text-[9px] font-mono text-gray-300 uppercase"
};
const _hoisted_76 = { class: "px-4 py-3" };
const _hoisted_77 = { class: "flex items-center gap-1.5" };
const _hoisted_78 = { class: "text-[9px] font-mono text-gray-500 uppercase tracking-tight" };
const _hoisted_79 = { class: "px-4 py-3 text-right" };
const _hoisted_80 = { class: "flex items-center justify-end gap-2" };
const _hoisted_81 = ["onClick"];
const _hoisted_82 = ["onClick"];
const _hoisted_83 = ["onClick"];
const _hoisted_84 = {
  key: 4,
  class: "bg-white border border-gray-100 p-16 text-center relative overflow-hidden rounded-sm"
};
const _hoisted_85 = { class: "relative z-10 flex flex-col items-center" };
const _hoisted_86 = { class: "w-16 h-16 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-6 shadow-none" };
const _hoisted_87 = { class: "text-[10px] font-mono text-gray-400 mb-8 max-w-xs mx-auto uppercase tracking-wider leading-relaxed" };
const _hoisted_88 = {
  key: 5,
  class: "flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-sm"
};
const _hoisted_89 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_90 = { class: "text-[#2F2E8B] font-black" };
const _hoisted_91 = { class: "text-[#2F2E8B] font-black" };
const _hoisted_92 = { class: "text-[#2F2E8B] font-black" };
const _hoisted_93 = { class: "flex items-center gap-2" };
const _hoisted_94 = ["disabled"];
const _hoisted_95 = { class: "px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-sm" };
const _hoisted_96 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest" };
const _hoisted_97 = ["disabled"];
const _hoisted_98 = {
  key: 6,
  class: "fixed inset-0 bg-[#0B0B1E]/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-mono uppercase tracking-widest"
};
const _hoisted_99 = { class: "bg-white border border-gray-200 shadow-2xl max-w-sm w-full relative overflow-hidden rounded-sm animate-scale-in" };
const _hoisted_100 = { class: "p-6 relative z-10 text-center" };
const _hoisted_101 = { class: "w-12 h-12 bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4 rounded-sm" };
const _hoisted_102 = { class: "text-[9px] font-bold text-gray-400 mb-6 leading-relaxed" };
const _hoisted_103 = { class: "text-gray-900 font-black" };
const _hoisted_104 = { class: "grid grid-cols-2 gap-3" };


const _sfc_main$1 = {
  __name: 'DealsView',
  props: {
  users: {
    type: Array,
    default: () => []
  }
},
  setup(__props) {

const { getTenantId } = decodeJWT();
const { formatCurrency } = useCurrency();

// State
const deals = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const totalDeals = ref(0);
const stageFilter = ref('');
const viewMode = ref('grid');

const showDetailModal = ref(false);
const showFormModal = ref(false);
const showDeleteConfirm = ref(false);
const selectedDeal = ref(null);
const dealToEdit = ref(null);
const dealToDelete = ref(null);

// Computed
const totalPages = computed(() => Math.ceil(totalDeals.value / perPage.value));

const stats = computed(() => {
  const total = deals.value.length;
  const totalValue = deals.value.reduce((sum, d) => sum + (d.amount || 0), 0);
  const weightedValue = deals.value.reduce((sum, d) => sum + ((d.amount || 0) * (d.probability || 0)) / 100, 0);
  const closedWon = deals.value.filter(d => d.stage === 'closed-won').length;
  const closedLost = deals.value.filter(d => d.stage === 'closed-lost').length;
  const totalClosed = closedWon + closedLost;
  const winRate = totalClosed > 0 ? Math.round((closedWon / totalClosed) * 100) : 0;

  return { total, totalValue, weightedValue, winRate };
});

// Methods
async function loadDeals() {
  loading.value = true;
  try {
    const tenantId = String(getTenantId() || '');
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      q: searchQuery.value || undefined,
      stage: stageFilter.value || undefined
    };

    const response = await getDeals(tenantId, params);
    deals.value = response.items || response || [];
    totalDeals.value = response.total || deals.value.length;
  } catch (error) {
    console.error('Failed to load deals:', error);
    deals.value = [];
    totalDeals.value = 0;
  } finally {
    loading.value = false;
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadDeals();
  }, 500);
}

function openCreateModal() {
  dealToEdit.value = null;
  showFormModal.value = true;
}

function viewDeal(deal) {
  selectedDeal.value = deal;
  showDetailModal.value = true;
}

function editDeal(deal) {
  dealToEdit.value = deal;
  showFormModal.value = true;
}

function deleteDeal$1(deal) {
  dealToDelete.value = deal;
  showDeleteConfirm.value = true;
}

async function confirmDelete() {
  try {
    const tenantId = String(getTenantId() || '');
    await deleteDeal(dealToDelete.value.id, tenantId);
    showDeleteConfirm.value = false;
    dealToDelete.value = null;
    await loadDeals();
    emit('crm:deals:changed');
  } catch (error) {
    console.error('Failed to delete deal:', error);
  }
}

function handleEdit(deal) {
  showDetailModal.value = false;
  setTimeout(() => {
    dealToEdit.value = deal;
    showFormModal.value = true;
  }, 100);
}

function handleDelete(deal) {
  showDetailModal.value = false;
  setTimeout(() => {
    deleteDeal$1(deal);
  }, 100);
}

async function handleSaved() {
  showFormModal.value = false;
  dealToEdit.value = null;
  await loadDeals();
  emit('crm:deals:changed');
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadDeals();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadDeals();
  }
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatStage(stage) {
  if (!stage) return '';
  return stage.replace(/-/g, ' ');
}

function getStageBadgeClass(stage) {
  return 'bg-gray-50 text-gray-400 border-gray-100';
}

// Lifecycle
onMounted(() => {
  loadDeals();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createVNode(unref(LoaderCircle), {
              class: "animate-spin",
              size: 24
            }),
            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-mono font-black uppercase text-sm tracking-widest" }, "Loading_Pipeline...", -1))
          ])
        ]))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_4$1, [
      createBaseVNode("div", _hoisted_5$1, [
        createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("div", null, [
            _cache[9] || (_cache[9] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
              createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
              createBaseVNode("h3", { class: "text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono" }, "Deal_Pipeline")
            ], -1)),
            createBaseVNode("p", _hoisted_7$1, [
              _cache[8] || (_cache[8] = createTextVNode(" Total_Deals: ", -1)),
              createBaseVNode("span", _hoisted_8$1, toDisplayString(totalDeals.value), 1),
              createTextVNode(" // Range: " + toDisplayString((currentPage.value - 1) * perPage.value + 1) + "-" + toDisplayString(Math.min(currentPage.value * perPage.value, totalDeals.value)), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_9$1, [
            createBaseVNode("button", {
              onClick: openCreateModal,
              class: "px-4 py-2 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-2 font-mono font-bold uppercase text-[9px] rounded-sm tracking-widest"
            }, [
              createVNode(unref(Plus), { size: 12 }),
              _cache[10] || (_cache[10] = createTextVNode(" Add_Deal ", -1))
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_10$1, [
        createBaseVNode("div", _hoisted_11$1, [
          createBaseVNode("div", _hoisted_12$1, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1" }, "Total_Value", -1)),
            createBaseVNode("div", _hoisted_13, toDisplayString(unref(formatCurrency)(stats.value.totalValue)), 1),
            createBaseVNode("div", _hoisted_14, [
              createVNode(unref(DollarSign), { size: 14 })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1" }, "Weighted_Value", -1)),
            createBaseVNode("div", _hoisted_17, toDisplayString(unref(formatCurrency)(stats.value.weightedValue)), 1),
            createBaseVNode("div", _hoisted_18, [
              createVNode(unref(Percent), { size: 14 })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_19, [
          createBaseVNode("div", _hoisted_20, [
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] mb-1" }, "Win_Rate", -1)),
            createBaseVNode("div", _hoisted_21, toDisplayString(stats.value.winRate) + "%", 1),
            createBaseVNode("div", _hoisted_22, [
              createVNode(unref(TrendingUp), { size: 14 })
            ])
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_23, [
      createBaseVNode("div", _hoisted_24, [
        createBaseVNode("div", _hoisted_25, [
          createVNode(unref(Search), {
            class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors",
            size: 14
          }),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchQuery).value = $event)),
            onInput: debouncedSearch,
            type: "text",
            placeholder: "Search_Deals_By_Name_Account_Contact...",
            class: "w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-all font-mono text-[10px] uppercase tracking-wider"
          }, null, 544), [
            [vModelText, searchQuery.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_26, [
          createVNode(unref(Filter), {
            class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            size: 12
          }),
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((stageFilter).value = $event)),
            onChange: loadDeals,
            class: "w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-sm focus:bg-white focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] transition-all font-mono text-[10px] uppercase tracking-wider appearance-none"
          }, [...(_cache[14] || (_cache[14] = [
            createStaticVNode("<option value=\"\" data-v-f8ee485f>All_Stages</option><option value=\"prospecting\" data-v-f8ee485f>Prospecting</option><option value=\"qualification\" data-v-f8ee485f>Qualification</option><option value=\"proposal\" data-v-f8ee485f>Proposal</option><option value=\"negotiation\" data-v-f8ee485f>Negotiation</option><option value=\"closed-won\" data-v-f8ee485f>Closed Won</option><option value=\"closed-lost\" data-v-f8ee485f>Closed Lost</option>", 7)
          ]))], 544), [
            [vModelSelect, stageFilter.value]
          ]),
          createVNode(unref(ChevronDown), {
            class: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",
            size: 12
          })
        ]),
        createBaseVNode("div", _hoisted_27, [
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = $event => (viewMode.value = 'grid')),
            class: normalizeClass([viewMode.value === 'grid' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100', "p-1.5 rounded-sm transition-all"]),
            title: "Grid View"
          }, [
            createVNode(unref(LayoutGrid), { size: 14 })
          ], 2),
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = $event => (viewMode.value = 'list')),
            class: normalizeClass([viewMode.value === 'list' ? 'bg-[#2F2E8B] text-white shadow-none' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100', "p-1.5 rounded-sm transition-all"]),
            title: "List View"
          }, [
            createVNode(unref(LayoutList), { size: 14 })
          ], 2)
        ])
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_28, [...(_cache[15] || (_cache[15] = [
          createBaseVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F2E8B]" }, null, -1)
        ]))]))
      : (viewMode.value === 'grid' && deals.value.length > 0)
        ? (openBlock(), createElementBlock("div", _hoisted_29, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(deals.value, (deal) => {
              return (openBlock(), createElementBlock("div", {
                key: deal.id,
                onClick: $event => (viewDeal(deal)),
                class: "group bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full rounded-sm"
              }, [
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("div", {
                      class: normalizeClass([getStageBadgeClass(deal.stage), "px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest rounded-sm"])
                    }, toDisplayString(formatStage(deal.stage)), 3),
                    createBaseVNode("div", _hoisted_33, toDisplayString(deal.probability) + "%_WIN ", 1)
                  ]),
                  createBaseVNode("h4", _hoisted_34, toDisplayString(deal.name), 1),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("div", _hoisted_36, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Deal_Value", -1)),
                      createBaseVNode("span", _hoisted_37, toDisplayString(unref(formatCurrency)(deal.amount)), 1)
                    ]),
                    (deal.accountName)
                      ? (openBlock(), createElementBlock("div", _hoisted_38, [
                          createVNode(unref(Building2), {
                            size: 10,
                            class: "text-gray-400"
                          }),
                          createBaseVNode("span", _hoisted_39, toDisplayString(deal.accountName), 1)
                        ]))
                      : createCommentVNode("", true),
                    (deal.contactName)
                      ? (openBlock(), createElementBlock("div", _hoisted_40, [
                          createVNode(unref(User), {
                            size: 10,
                            class: "text-gray-400"
                          }),
                          createBaseVNode("span", _hoisted_41, toDisplayString(deal.contactName), 1)
                        ]))
                      : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_42, [
                  createBaseVNode("div", _hoisted_43, [
                    createVNode(unref(Calendar), {
                      size: 10,
                      class: "text-gray-400"
                    }),
                    createBaseVNode("span", _hoisted_44, toDisplayString(formatDate(deal.expectedCloseDate)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_45, [
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (editDeal(deal)), ["stop"]),
                      class: "p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-orange-500 transition-all",
                      title: "Edit"
                    }, [
                      createVNode(unref(SquarePen), { size: 12 })
                    ], 8, _hoisted_46),
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (deleteDeal$1(deal)), ["stop"]),
                      class: "p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-red-500 transition-all",
                      title: "Delete"
                    }, [
                      createVNode(unref(Trash2), { size: 12 })
                    ], 8, _hoisted_47)
                  ]),
                  createBaseVNode("button", {
                    onClick: withModifiers($event => (viewDeal(deal)), ["stop"]),
                    class: "px-2 py-0.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition-all"
                  }, " REVIEW ", 8, _hoisted_48)
                ])
              ], 8, _hoisted_30))
            }), 128))
          ]))
        : (viewMode.value === 'list' && deals.value.length > 0)
          ? (openBlock(), createElementBlock("div", _hoisted_49, [
              createBaseVNode("div", _hoisted_50, [
                createBaseVNode("table", _hoisted_51, [
                  createBaseVNode("thead", null, [
                    createBaseVNode("tr", _hoisted_52, [
                      createBaseVNode("th", _hoisted_53, [
                        createBaseVNode("div", _hoisted_54, [
                          _cache[17] || (_cache[17] = createBaseVNode("span", null, "Deal_Identity", -1)),
                          createVNode(unref(ArrowUpDown), { size: 10 })
                        ])
                      ]),
                      _cache[18] || (_cache[18] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Stage", -1)),
                      _cache[19] || (_cache[19] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Value_Estimate", -1)),
                      _cache[20] || (_cache[20] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Probability", -1)),
                      _cache[21] || (_cache[21] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Organization", -1)),
                      _cache[22] || (_cache[22] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Contact", -1)),
                      _cache[23] || (_cache[23] = createBaseVNode("th", { class: "px-4 py-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Target_Date", -1)),
                      _cache[24] || (_cache[24] = createBaseVNode("th", { class: "px-4 py-3 text-right text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "Actions", -1))
                    ])
                  ]),
                  createBaseVNode("tbody", _hoisted_55, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(deals.value, (deal) => {
                      return (openBlock(), createElementBlock("tr", {
                        key: deal.id,
                        class: "hover:bg-gray-50/80 transition-colors group cursor-pointer",
                        onClick: $event => (viewDeal(deal))
                      }, [
                        createBaseVNode("td", _hoisted_57, [
                          createBaseVNode("div", _hoisted_58, [
                            createBaseVNode("div", _hoisted_59, toDisplayString(deal.name.charAt(0)), 1),
                            createBaseVNode("div", _hoisted_60, toDisplayString(deal.name), 1)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_61, [
                          createBaseVNode("div", {
                            class: normalizeClass([getStageBadgeClass(deal.stage), "inline-block px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest rounded-sm"])
                          }, toDisplayString(formatStage(deal.stage)), 3)
                        ]),
                        createBaseVNode("td", _hoisted_62, [
                          createBaseVNode("div", _hoisted_63, toDisplayString(unref(formatCurrency)(deal.amount)), 1),
                          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-[8px] font-mono text-gray-400 uppercase tracking-tighter" }, "Deal_Value", -1))
                        ]),
                        createBaseVNode("td", _hoisted_64, [
                          createBaseVNode("div", _hoisted_65, [
                            createBaseVNode("div", _hoisted_66, [
                              createBaseVNode("div", {
                                class: "bg-[#2F2E8B] h-full transition-all duration-500",
                                style: normalizeStyle({ width: deal.probability + '%' })
                              }, null, 4)
                            ]),
                            createBaseVNode("span", _hoisted_67, toDisplayString(deal.probability) + "%", 1)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_68, [
                          (deal.accountName)
                            ? (openBlock(), createElementBlock("div", _hoisted_69, [
                                createVNode(unref(Building2), {
                                  size: 10,
                                  class: "text-gray-300"
                                }),
                                createBaseVNode("span", _hoisted_70, toDisplayString(deal.accountName), 1)
                              ]))
                            : (openBlock(), createElementBlock("span", _hoisted_71, "n/a"))
                        ]),
                        createBaseVNode("td", _hoisted_72, [
                          (deal.contactName)
                            ? (openBlock(), createElementBlock("div", _hoisted_73, [
                                createVNode(unref(User), {
                                  size: 10,
                                  class: "text-gray-300"
                                }),
                                createBaseVNode("span", _hoisted_74, toDisplayString(deal.contactName), 1)
                              ]))
                            : (openBlock(), createElementBlock("span", _hoisted_75, "n/a"))
                        ]),
                        createBaseVNode("td", _hoisted_76, [
                          createBaseVNode("div", _hoisted_77, [
                            createVNode(unref(Calendar), {
                              size: 10,
                              class: "text-gray-300"
                            }),
                            createBaseVNode("span", _hoisted_78, toDisplayString(formatDate(deal.expectedCloseDate)), 1)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_79, [
                          createBaseVNode("div", _hoisted_80, [
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (viewDeal(deal)), ["stop"]),
                              class: "p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-[#2F2E8B] transition-all",
                              title: "View"
                            }, [
                              createVNode(unref(Eye), { size: 12 })
                            ], 8, _hoisted_81),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (editDeal(deal)), ["stop"]),
                              class: "p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-orange-500 transition-all",
                              title: "Edit"
                            }, [
                              createVNode(unref(SquarePen), { size: 12 })
                            ], 8, _hoisted_82),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (deleteDeal$1(deal)), ["stop"]),
                              class: "p-1 hover:bg-white rounded-sm border border-transparent hover:border-gray-200 text-gray-400 hover:text-red-500 transition-all",
                              title: "Delete"
                            }, [
                              createVNode(unref(Trash2), { size: 12 })
                            ], 8, _hoisted_83)
                          ])
                        ])
                      ], 8, _hoisted_56))
                    }), 128))
                  ])
                ])
              ])
            ]))
          : (!loading.value && deals.value.length === 0)
            ? (openBlock(), createElementBlock("div", _hoisted_84, [
                createBaseVNode("div", _hoisted_85, [
                  createBaseVNode("div", _hoisted_86, [
                    createVNode(unref(Inbox), {
                      size: 32,
                      class: "text-gray-200"
                    })
                  ]),
                  _cache[27] || (_cache[27] = createBaseVNode("h3", { class: "text-[12px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-2" }, "NO_RECORDS_DETECTED", -1)),
                  createBaseVNode("p", _hoisted_87, toDisplayString(searchQuery.value ? 'SEARCH_QUERY_RETURNED_ZERO_RESULTS // ADJUST_FILTERS' : 'PIPELINE_IS_EMPTY // INITIALIZE_FIRST_DEAL'), 1),
                  (!searchQuery.value)
                    ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        onClick: openCreateModal,
                        class: "px-8 py-3 bg-[#2F2E8B] text-white font-mono font-black uppercase text-[10px] rounded-sm tracking-[0.2em] hover:bg-[#3D2F88] transition-all flex items-center gap-3"
                      }, [
                        createVNode(unref(Plus), { size: 14 }),
                        _cache[26] || (_cache[26] = createBaseVNode("span", null, "INIT_NEW_DEAL", -1))
                      ]))
                    : createCommentVNode("", true)
                ])
              ]))
            : createCommentVNode("", true),
    (deals.value.length > 0)
      ? (openBlock(), createElementBlock("div", _hoisted_88, [
          createBaseVNode("div", _hoisted_89, [
            _cache[28] || (_cache[28] = createTextVNode(" Showing_Records: ", -1)),
            createBaseVNode("span", _hoisted_90, toDisplayString((currentPage.value - 1) * perPage.value + 1), 1),
            _cache[29] || (_cache[29] = createTextVNode(" -- ", -1)),
            createBaseVNode("span", _hoisted_91, toDisplayString(Math.min(currentPage.value * perPage.value, totalDeals.value)), 1),
            _cache[30] || (_cache[30] = createTextVNode(" // Total: ", -1)),
            createBaseVNode("span", _hoisted_92, toDisplayString(totalDeals.value), 1)
          ]),
          createBaseVNode("div", _hoisted_93, [
            createBaseVNode("button", {
              onClick: previousPage,
              disabled: currentPage.value === 1,
              class: "p-2 border border-gray-200 rounded-sm text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all",
              title: "Previous Page"
            }, [
              createVNode(unref(ChevronLeft), { size: 14 })
            ], 8, _hoisted_94),
            createBaseVNode("div", _hoisted_95, [
              createBaseVNode("span", _hoisted_96, " Page_" + toDisplayString(currentPage.value) + "_Of_" + toDisplayString(totalPages.value), 1)
            ]),
            createBaseVNode("button", {
              onClick: nextPage,
              disabled: currentPage.value === totalPages.value,
              class: "p-2 border border-blue-200 rounded-sm text-[#2F2E8B] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all",
              title: "Next Page"
            }, [
              createVNode(unref(ChevronRight), { size: 14 })
            ], 8, _hoisted_97)
          ])
        ]))
      : createCommentVNode("", true),
    createVNode(DealDetailModal, {
      modelValue: showDetailModal.value,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((showDetailModal).value = $event)),
      deal: selectedDeal.value,
      onEdit: handleEdit,
      onDelete: handleDelete,
      onRefresh: loadDeals
    }, null, 8, ["modelValue", "deal"]),
    createVNode(DealFormModal, {
      modelValue: showFormModal.value,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((showFormModal).value = $event)),
      deal: dealToEdit.value,
      users: __props.users,
      onSaved: handleSaved
    }, null, 8, ["modelValue", "deal", "users"]),
    (showDeleteConfirm.value)
      ? (openBlock(), createElementBlock("div", _hoisted_98, [
          createBaseVNode("div", _hoisted_99, [
            _cache[36] || (_cache[36] = createBaseVNode("div", { class: "h-1 w-full bg-red-600 relative z-10" }, null, -1)),
            createBaseVNode("div", _hoisted_100, [
              createBaseVNode("div", _hoisted_101, [
                createVNode(unref(TriangleAlert), {
                  size: 20,
                  class: "text-red-600"
                })
              ]),
              _cache[35] || (_cache[35] = createBaseVNode("h3", { class: "text-[12px] font-black text-gray-900 mb-2" }, "SYSTEM_WARNING", -1)),
              createBaseVNode("p", _hoisted_102, [
                _cache[31] || (_cache[31] = createTextVNode(" CONFIRM_DELETION_OF: ", -1)),
                _cache[32] || (_cache[32] = createBaseVNode("br", null, null, -1)),
                createBaseVNode("span", _hoisted_103, "\"" + toDisplayString(dealToDelete.value?.name) + "\"", 1),
                _cache[33] || (_cache[33] = createBaseVNode("br", null, null, -1)),
                _cache[34] || (_cache[34] = createTextVNode(" THIS_OPERATION_IS_PERMANENT. ", -1))
              ]),
              createBaseVNode("div", _hoisted_104, [
                createBaseVNode("button", {
                  onClick: _cache[6] || (_cache[6] = $event => (showDeleteConfirm.value = false)),
                  class: "px-4 py-2.5 border border-gray-200 text-gray-600 font-black text-[9px] hover:bg-gray-50 transition-all rounded-sm uppercase"
                }, " ABORT "),
                createBaseVNode("button", {
                  onClick: confirmDelete,
                  class: "px-4 py-2.5 bg-red-600 text-white font-black text-[9px] hover:bg-red-700 transition-all rounded-sm shadow-lg shadow-red-200 uppercase"
                }, " EXEC_DELETE ")
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const DealsView = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-f8ee485f"]]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative text-gray-800 blur-scoped" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-1.5" };
const _hoisted_6 = { class: "flex items-center gap-3" };
const _hoisted_7 = {
  key: 0,
  class: "relative"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider" };
const _hoisted_10 = { class: "flex-1 w-full relative z-10 pb-40 blur-scoped" };
const _hoisted_11 = { class: "px-4 sm:px-6 lg:px-8 py-6 relative" };
const _hoisted_12 = {
  key: 0,
  class: "absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center"
};


const _sfc_main = {
  __name: 'CRMDealsPage',
  setup(__props) {

const {
  branches, selectedBranch, onBranchChange, getUserEmail, tenantUsers,
  activeTab, moduleLoading, showDealFormModal, editingDeal, fetchPipelineData
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'deals';
  fetchPipelineData();
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$4), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_router_link, {
                to: "/dashboard/sales",
                class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-[#2F2E8B] transition"
              }, {
                default: withCtx(() => [...(_cache[3] || (_cache[3] = [
                  createTextVNode("Sales", -1)
                ]))]),
                _: 1
              }),
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-300" }, "//", -1)),
              createVNode(_component_router_link, {
                to: "/dashboard/crm",
                class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-[#2F2E8B] transition"
              }, {
                default: withCtx(() => [...(_cache[4] || (_cache[4] = [
                  createTextVNode("CRM", -1)
                ]))]),
                _: 1
              }),
              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-300" }, "//", -1)),
              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest" }, "Deals", -1))
            ]),
            _cache[8] || (_cache[8] = createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Deal_Pipeline", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          (unref(branches).length > 0)
            ? (openBlock(), createElementBlock("div", _hoisted_7, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(selectedBranch) ? (selectedBranch).value = $event : null)),
                  onChange: _cache[1] || (_cache[1] = (...args) => (unref(onBranchChange) && unref(onBranchChange)(...args))),
                  class: "appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent cursor-pointer hover:border-[#2F2E8B] transition"
                }, [
                  _cache[10] || (_cache[10] = createBaseVNode("option", { value: "" }, "ALL_BRANCHES", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(branches), (branch) => {
                    return (openBlock(), createElementBlock("option", {
                      key: branch._id,
                      value: branch._id
                    }, toDisplayString(branch.name.toUpperCase()), 9, _hoisted_8))
                  }), 128))
                ], 544), [
                  [vModelSelect, unref(selectedBranch)]
                ])
              ]))
            : createCommentVNode("", true),
          createBaseVNode("span", _hoisted_9, [
            createVNode(unref(CircleUser), { size: 14 }),
            createTextVNode(" " + toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_10, [
      createBaseVNode("div", _hoisted_11, [
        (unref(moduleLoading))
          ? (openBlock(), createElementBlock("div", _hoisted_12, [...(_cache[11] || (_cache[11] = [
              createBaseVNode("div", { class: "h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin" }, null, -1)
            ]))]))
          : createCommentVNode("", true),
        createVNode(DealsView, { users: unref(tenantUsers) }, null, 8, ["users"])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "#modal-target" }, [
      (unref(showDealFormModal))
        ? (openBlock(), createBlock(DealFormModal, {
            key: 0,
            modelValue: unref(showDealFormModal),
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (isRef(showDealFormModal) ? (showDealFormModal).value = $event : null)),
            deal: unref(editingDeal),
            users: unref(tenantUsers),
            onSaved: unref(fetchPipelineData)
          }, null, 8, ["modelValue", "deal", "users", "onSaved"]))
        : createCommentVNode("", true)
    ]))
  ]))
}
}

};

export { _sfc_main as default };
