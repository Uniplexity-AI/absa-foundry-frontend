import { m as recordExecuted, r as recordAction } from './absaActions-BYs1rMtw.js';
import { n as notify } from './absaExport-nqn31pTn.js';
import { g as _export_sfc, r as ref, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, m as createTextVNode, F as Fragment, e as renderList, j as normalizeClass, l as createCommentVNode } from './index-DySaQUSt.js';

const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-50 flex justify-end"
};
const _hoisted_2 = { class: "relative w-full max-w-2xl bg-white h-full flex flex-col shadow-2xl transition-transform transform" };
const _hoisted_3 = { class: "px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10" };
const _hoisted_4 = { class: "bg-absa-passion/5 border border-absa-passion/20 rounded-sm px-4 py-2 text-xs text-absa-enrich" };
const _hoisted_5 = { class: "font-bold" };
const _hoisted_6 = { class: "font-bold" };
const _hoisted_7 = { class: "flex-1 overflow-y-auto p-6 space-y-8" };
const _hoisted_8 = { class: "grid grid-cols-1 md:grid-cols-3 gap-3" };
const _hoisted_9 = { class: "pl-2" };
const _hoisted_10 = { class: "flex justify-between items-start mb-2" };
const _hoisted_11 = { class: "material-symbols-outlined text-[20px] text-gray-400" };
const _hoisted_12 = { class: "text-[11px] font-bold font-mono text-absa-passion" };
const _hoisted_13 = { class: "text-xs font-bold text-absa-enrich mb-1" };
const _hoisted_14 = { class: "text-[10px] text-gray-500 leading-tight" };
const _hoisted_15 = { class: "mb-4" };
const _hoisted_16 = { class: "flex items-center gap-2" };
const _hoisted_17 = { class: "inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-gray-200 text-gray-700 rounded-full" };
const _hoisted_18 = { class: "space-y-3" };
const _hoisted_19 = ["onClick"];
const _hoisted_20 = { class: "flex justify-between items-start mb-2" };
const _hoisted_21 = { class: "flex items-center gap-2" };
const _hoisted_22 = { class: "text-sm font-bold text-absa-enrich" };
const _hoisted_23 = { class: "flex items-center gap-1.5 text-[11px] text-gray-500 mb-2" };
const _hoisted_24 = { class: "material-symbols-outlined text-[14px]" };
const _hoisted_25 = { class: "text-xs text-gray-600 mb-4" };
const _hoisted_26 = { class: "font-mono font-bold text-absa-passion text-sm" };
const _hoisted_27 = { class: "text-sm font-semibold text-gray-700" };
const _hoisted_28 = { class: "font-mono font-bold text-green-600 text-sm" };
const _hoisted_29 = {
  key: 0,
  class: "animate-fade-in"
};
const _hoisted_30 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" };
const _hoisted_31 = { class: "bg-red-50 border border-red-100 rounded-sm p-4" };
const _hoisted_32 = { class: "text-xs text-gray-700 space-y-2" };
const _hoisted_33 = { class: "flex justify-between border-b border-red-100 pb-1" };
const _hoisted_34 = { class: "font-bold" };
const _hoisted_35 = { class: "bg-green-50 border border-green-100 rounded-sm p-4" };
const _hoisted_36 = { class: "text-xs text-gray-700 space-y-2" };
const _hoisted_37 = { class: "flex justify-between border-b border-green-100 pb-1" };
const _hoisted_38 = { class: "font-bold text-green-700" };
const _hoisted_39 = { class: "flex justify-between border-b border-green-100 pb-1" };
const _hoisted_40 = { class: "font-bold font-mono text-green-700" };
const _hoisted_41 = { class: "flex justify-between pb-1" };
const _hoisted_42 = { class: "font-bold font-mono text-green-700" };
const _hoisted_43 = { class: "text-[9px] text-gray-400 bg-gray-50 p-3 rounded-sm border border-gray-100 text-center" };
const _hoisted_44 = { class: "border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center mt-auto" };
const _hoisted_45 = {
  key: 0,
  class: "text-xs text-gray-500 italic"
};
const _hoisted_46 = {
  key: 1,
  class: "flex flex-col"
};
const _hoisted_47 = { class: "text-sm font-bold text-absa-enrich" };
const _hoisted_48 = { class: "text-[11px] text-gray-500" };
const _hoisted_49 = { class: "flex gap-3" };
const _hoisted_50 = ["disabled"];


const _sfc_main = /*@__PURE__*/Object.assign({ name: 'AiCampaignModal' }, {
  __name: 'AiCampaignModal',
  props: {
  modelValue: { type: Boolean, default: false },
  customers: { type: Array, default: () => [] },
  sourceContext: { type: String, default: 'portfolio' }
},
  emits: ['update:modelValue', 'campaign-launched'],
  setup(__props, { emit: __emit }) {



const props = __props;

const emit = __emit;

const selectedCampaign = ref(null);

const cohortDrivers = [
  { icon: 'signal_cellular_nodata', label: 'Digital Inactivity', contribution: 38, desc: '0 app/web logins in 45+ days � strongest predictor of 90-day churn' },
  { icon: 'account_balance_wallet', label: 'Balance Decline', contribution: 27, desc: 'AUM dropped >25% in the last 60 days across this cohort' },
  { icon: 'cancel_schedule_send', label: 'Direct Debit Failure', contribution: 19, desc: '1+ failed recurring payment detected in the last 30 days' },
];

const aiCampaigns = [
  {
    id: 'digital-reactivation', rank: 1,
    tag: 'RECOMMENDED', tagClass: 'bg-green-100 text-green-700',
    title: 'Digital Reactivation Campaign',
    channel: 'SMS + Push Notification', channelIcon: 'smartphone',
    description: 'Re-engage customers showing digital inactivity. Drive app login within 7 days via personalised incentive.',
    upliftScore: 64, successRate: '61%', aumProtected: 'K 18.5M', confidence: 87, duration: '14 days', cost: 'Low',
  },
  {
    id: 'relationship-retention', rank: 2,
    tag: 'HIGH VALUE', tagClass: 'bg-amber-100 text-amber-700',
    title: 'Relationship Retention � RM Outreach',
    channel: 'Phone Call (RM-initiated)', channelIcon: 'call',
    description: 'Assign a senior RM for a personalised check-in call. Offer a fee-waiver or rate review based on customer tenure.',
    upliftScore: 51, successRate: '74%', aumProtected: 'K 31.2M', confidence: 79, duration: '7 days', cost: 'Medium',
  },
  {
    id: 'balance-protection', rank: 3,
    tag: 'EXPERIMENTAL', tagClass: 'bg-gray-100 text-gray-600',
    title: 'Balance Protection Alert',
    channel: 'Email + In-App Banner', channelIcon: 'mark_email_unread',
    description: 'Proactively notify customers of their balance trend and offer a product switch to a higher-interest savings tier.',
    upliftScore: 43, successRate: '48%', aumProtected: 'K 12.8M', confidence: 63, duration: '21 days', cost: 'Low',
  },
];

function close() {
  emit('update:modelValue', false);
  setTimeout(() => { selectedCampaign.value = null; }, 300);
}

function launch() {
  if (!selectedCampaign.value) return
  recordExecuted(
    props.customers.map((c) => c.customer_id || c.id).filter(Boolean),
    selectedCampaign.value.title
  );
  recordAction({
    type: 'CAMPAIGN_LAUNCHED',
    detail: `Launched ${selectedCampaign.value.title} from ${props.sourceContext}`,
    meta: { campaign: selectedCampaign.value.title, context: props.sourceContext, customers: props.customers.length },
  });
  emit('campaign-launched', { campaign: selectedCampaign.value, customers: props.customers });
  close();
  notify(`Campaign launched: ${selectedCampaign.value.title} (${props.customers.length} customer${props.customers.length === 1 ? '' : 's'})`, 'success');
}

return (_ctx, _cache) => {
  return (__props.modelValue)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "absolute inset-0 bg-black/40 transition-opacity",
          onClick: close
        }),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              onClick: close,
              class: "absolute top-5 right-6 text-gray-400 hover:text-gray-600"
            }, [...(_cache[0] || (_cache[0] = [
              createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
            ]))]),
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "flex items-center gap-2 mb-1" }, [
              createBaseVNode("span", { class: "material-symbols-outlined text-absa-passion" }, "auto_awesome"),
              createBaseVNode("h2", { class: "text-lg font-bold text-absa-enrich" }, "AI Campaign Recommendation Engine")
            ], -1)),
            _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-4" }, "Cohort analysis powered by XGBoost Churn Model v2.1 · SHAP feature attribution", -1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(__props.customers.length), 1),
              _cache[1] || (_cache[1] = createTextVNode(" customers selected · AI has identified ", -1)),
              createBaseVNode("span", _hoisted_6, toDisplayString(aiCampaigns.length), 1),
              _cache[2] || (_cache[2] = createTextVNode(" campaign strategies optimised for this cohort ", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("section", null, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "mb-4" }, [
                createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Cohort Analysis"),
                createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "AI has grouped selected customers by shared behavioural features")
              ], -1)),
              createBaseVNode("div", _hoisted_8, [
                (openBlock(), createElementBlock(Fragment, null, renderList(cohortDrivers, (driver) => {
                  return createBaseVNode("div", {
                    key: driver.label,
                    class: "bg-white border border-gray-200 rounded-sm p-3 relative flex flex-col h-full overflow-hidden"
                  }, [
                    _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absolute left-0 top-0 bottom-0 w-1 bg-absa-passion" }, null, -1)),
                    createBaseVNode("div", _hoisted_9, [
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("span", _hoisted_11, toDisplayString(driver.icon), 1),
                        createBaseVNode("span", _hoisted_12, toDisplayString(driver.contribution) + "%", 1)
                      ]),
                      createBaseVNode("h4", _hoisted_13, toDisplayString(driver.label), 1),
                      createBaseVNode("p", _hoisted_14, toDisplayString(driver.desc), 1)
                    ])
                  ])
                }), 64))
              ])
            ]),
            createBaseVNode("section", null, [
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", _hoisted_16, [
                  _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "AI-Generated Campaign Strategies", -1)),
                  createBaseVNode("span", _hoisted_17, toDisplayString(aiCampaigns.length), 1)
                ]),
                _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Select a strategy. Recommendations are ranked by predicted CLV retention (Uplift Model v1.2).", -1))
              ]),
              createBaseVNode("div", _hoisted_18, [
                (openBlock(), createElementBlock(Fragment, null, renderList(aiCampaigns, (camp) => {
                  return createBaseVNode("div", {
                    key: camp.id,
                    onClick: $event => (selectedCampaign.value = camp),
                    class: normalizeClass(["border rounded-sm p-4 cursor-pointer transition-colors relative", selectedCampaign.value?.id === camp.id ? 'border-absa-passion bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'])
                  }, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("div", _hoisted_21, [
                        createBaseVNode("span", {
                          class: normalizeClass(["inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-sm", selectedCampaign.value?.id === camp.id ? 'bg-absa-passion text-white' : 'bg-gray-100 text-gray-600'])
                        }, " #" + toDisplayString(camp.rank), 3),
                        createBaseVNode("span", {
                          class: normalizeClass(["px-2 py-0.5 text-[9px] font-bold rounded-sm tracking-wider uppercase", camp.tagClass])
                        }, toDisplayString(camp.tag), 3),
                        createBaseVNode("h4", _hoisted_22, toDisplayString(camp.title), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("span", _hoisted_24, toDisplayString(camp.channelIcon), 1),
                      createTextVNode(" " + toDisplayString(camp.channel), 1)
                    ]),
                    createBaseVNode("p", _hoisted_25, toDisplayString(camp.description), 1),
                    createBaseVNode("div", {
                      class: normalizeClass(["grid grid-cols-4 gap-4 pt-3 border-t", selectedCampaign.value?.id === camp.id ? 'border-red-100' : 'border-gray-100'])
                    }, [
                      createBaseVNode("div", null, [
                        _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Uplift Score", -1)),
                        createBaseVNode("p", _hoisted_26, toDisplayString(camp.upliftScore), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Success Rate", -1)),
                        createBaseVNode("p", _hoisted_27, toDisplayString(camp.successRate), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-[9px] font-bold text-gray-400 uppercase mb-1" }, "AUM Protected", -1)),
                        createBaseVNode("p", _hoisted_28, toDisplayString(camp.aumProtected), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[9px] font-bold text-gray-400 uppercase mb-1" }, "AI Confidence", -1)),
                        createBaseVNode("span", {
                          class: normalizeClass(["px-2 py-0.5 text-[10px] font-bold font-mono rounded-sm", camp.confidence >= 80 ? 'bg-green-100 text-green-700' : camp.confidence >= 65 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'])
                        }, toDisplayString(camp.confidence) + "% ", 3)
                      ])
                    ], 2)
                  ], 10, _hoisted_19)
                }), 64))
              ])
            ]),
            (selectedCampaign.value)
              ? (openBlock(), createElementBlock("section", _hoisted_29, [
                  _cache[22] || (_cache[22] = createBaseVNode("div", { class: "mb-4" }, [
                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "AI-Predicted Intervention Outcomes"),
                    createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Based on Uplift Model v1.2 applied to the cohort historical behaviour. Outcomes are probabilistic estimates.")
                  ], -1)),
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("div", _hoisted_31, [
                      _cache[16] || (_cache[16] = createBaseVNode("div", { class: "flex items-center gap-1.5 mb-3" }, [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion" }, "trending_down"),
                        createBaseVNode("h4", { class: "text-[11px] font-bold text-absa-passion uppercase tracking-wider" }, "Projected WITHOUT Action (90 days)")
                      ], -1)),
                      createBaseVNode("ul", _hoisted_32, [
                        createBaseVNode("li", _hoisted_33, [
                          _cache[13] || (_cache[13] = createBaseVNode("span", null, "Expected Exits:", -1)),
                          createBaseVNode("span", _hoisted_34, toDisplayString(Math.round(__props.customers.length * 0.82) || 1) + " customers", 1)
                        ]),
                        _cache[14] || (_cache[14] = createBaseVNode("li", { class: "flex justify-between border-b border-red-100 pb-1" }, [
                          createBaseVNode("span", null, "AUM Lost:"),
                          createBaseVNode("span", { class: "font-bold font-mono" }, "K 23.1M")
                        ], -1)),
                        _cache[15] || (_cache[15] = createBaseVNode("li", { class: "flex justify-between pb-1" }, [
                          createBaseVNode("span", null, "CLV Erosion:"),
                          createBaseVNode("span", { class: "font-bold font-mono" }, "K 4.8M")
                        ], -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_35, [
                      _cache[20] || (_cache[20] = createBaseVNode("div", { class: "flex items-center gap-1.5 mb-3" }, [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-green-600" }, "trending_up"),
                        createBaseVNode("h4", { class: "text-[11px] font-bold text-green-700 uppercase tracking-wider" }, "Projected WITH Campaign")
                      ], -1)),
                      createBaseVNode("ul", _hoisted_36, [
                        createBaseVNode("li", _hoisted_37, [
                          _cache[17] || (_cache[17] = createBaseVNode("span", null, "Customers Retained:", -1)),
                          createBaseVNode("span", _hoisted_38, toDisplayString(Math.round(__props.customers.length * selectedCampaign.value.upliftScore / 100) || 1), 1)
                        ]),
                        createBaseVNode("li", _hoisted_39, [
                          _cache[18] || (_cache[18] = createBaseVNode("span", null, "AUM Protected:", -1)),
                          createBaseVNode("span", _hoisted_40, toDisplayString(selectedCampaign.value.aumProtected), 1)
                        ]),
                        createBaseVNode("li", _hoisted_41, [
                          _cache[19] || (_cache[19] = createBaseVNode("span", null, "Net Benefit:", -1)),
                          createBaseVNode("span", _hoisted_42, "~" + toDisplayString(selectedCampaign.value.aumProtected), 1)
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    _cache[21] || (_cache[21] = createBaseVNode("strong", null, "Model Traceability:", -1)),
                    createTextVNode(" Inference Engine: XGBoost Churn v2.1 · Uplift Model: LightGBM v1.2 · Cohort Features: " + toDisplayString(cohortDrivers.length) + " SHAP attributes · Batch: Nightly Inference ", 1)
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_44, [
            (!selectedCampaign.value)
              ? (openBlock(), createElementBlock("div", _hoisted_45, " Select a campaign strategy above to proceed "))
              : (openBlock(), createElementBlock("div", _hoisted_46, [
                  createBaseVNode("span", _hoisted_47, toDisplayString(selectedCampaign.value.title), 1),
                  createBaseVNode("span", _hoisted_48, toDisplayString(__props.customers.length) + " customers · " + toDisplayString(selectedCampaign.value.duration) + " · Confidence: " + toDisplayString(selectedCampaign.value.confidence) + "%", 1)
                ])),
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("button", {
                onClick: close,
                class: "px-4 py-2 border border-gray-300 text-absa-enrich text-xs font-bold rounded-sm hover:bg-white transition-colors shadow-none"
              }, " Cancel "),
              createBaseVNode("button", {
                onClick: launch,
                disabled: !selectedCampaign.value,
                class: normalizeClass(["px-5 py-2 text-white text-xs font-bold rounded-sm transition-colors shadow-none flex items-center gap-2", selectedCampaign.value ? 'bg-absa-passion hover:bg-absa-power' : 'bg-gray-300 cursor-not-allowed'])
              }, [...(_cache[23] || (_cache[23] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "rocket_launch", -1),
                createTextVNode(" Launch Campaign ", -1)
              ]))], 10, _hoisted_50)
            ])
          ])
        ])
      ]))
    : createCommentVNode("", true)
}
}

});
const AiCampaignModal = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-73bb7bab"]]);

export { AiCampaignModal as A };
