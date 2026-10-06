import { o as openBlock, c as createElementBlock, b as createBaseVNode, h as normalizeClass, t as toDisplayString, n as normalizeStyle, j as createCommentVNode, i as computed, A as createTextVNode, F as Fragment, e as renderList, C as createBlock, q as createVNode, _ as _export_sfc, r as ref, g as onBeforeUnmount, R as API_BASE_URL, U as authFetch, Q as axios, f as onMounted, a as createStaticVNode, s as unref, x as withDirectives, L as vModelSelect, y as vModelText, d as defineComponent, V as h, E as useRoute, u as useRouter } from './index-_vIa0xlU.js';
import { f as formatCurrency } from './formatting-wctwG9eb.js';
import { _ as _sfc_main$5 } from './LoadingSkeleton-ufHhXLkC.js';
import { useSnapshotStore } from './snapshotStore-Bol18Xlu.js';
import { A as AiCampaignModal } from './AiCampaignModal-MQbH_a9j.js';
import { u as useCustomerStore } from './customerStore-rXaNJ0B1.js';
import { u as usePredictionStore } from './predictionStore-CpkNRHsz.js';
import { n as notify } from './absaExport-D9syV00a.js';
import { c as hydrateStateFromServer, e as getOverride, o as overrideRecommendation } from './absaActions-DdmYbxIx.js';

const _hoisted_1$4 = { class: "flex items-center gap-2" };
const _hoisted_2$4 = { class: "flex-1" };
const _hoisted_3$4 = { class: "flex justify-between items-center mb-0.5" };
const _hoisted_4$3 = { class: "text-xs font-semibold text-absa-enrich" };
const _hoisted_5$3 = { class: "w-full h-1 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_6$3 = {
  key: 0,
  class: "text-[10px] text-gray-400 mt-0.5"
};


const _sfc_main$4 = /*@__PURE__*/Object.assign({ name: 'AiShapDriverBar' }, {
  __name: 'AiShapDriverBar',
  props: {
  feature:      { type: String,  required: true },
  contribution: { type: Number,  required: true },
  direction:    { type: String,  default: 'risk' },
  desc:         { type: String,  default: '' },
},
  setup(__props) {




return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("div", {
      class: normalizeClass(["w-2 h-2 rounded-full flex-shrink-0", __props.direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600'])
    }, null, 2),
    createBaseVNode("div", _hoisted_2$4, [
      createBaseVNode("div", _hoisted_3$4, [
        createBaseVNode("span", _hoisted_4$3, toDisplayString(__props.feature), 1),
        createBaseVNode("span", {
          class: normalizeClass(["text-[11px] font-bold font-mono", __props.direction === 'risk' ? 'text-absa-passion' : 'text-green-600'])
        }, toDisplayString(__props.direction === 'risk' ? '+' : '') + toDisplayString(__props.contribution) + "% ", 3)
      ]),
      createBaseVNode("div", _hoisted_5$3, [
        createBaseVNode("div", {
          class: normalizeClass(["h-full rounded-full transition-all", __props.direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600']),
          style: normalizeStyle({ width: Math.abs(__props.contribution) + '%' })
        }, null, 6)
      ]),
      (__props.desc)
        ? (openBlock(), createElementBlock("p", _hoisted_6$3, toDisplayString(__props.desc), 1))
        : createCommentVNode("", true)
    ])
  ]))
}
}

});

const _hoisted_1$3 = { class: "flex items-center gap-2" };
const _hoisted_2$3 = { class: "flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_3$3 = {
  key: 0,
  class: "text-[10px] text-gray-400"
};


const _sfc_main$3 = /*@__PURE__*/Object.assign({ name: 'AiConfidenceBadge' }, {
  __name: 'AiConfidenceBadge',
  props: {
  score: { type: Number, required: true },
  label: { type: String, default: '' },
},
  setup(__props) {




return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$3, [
      createBaseVNode("div", {
        class: normalizeClass(["h-full rounded-full transition-all", __props.score >= 80 ? 'bg-green-600' : __props.score >= 65 ? 'bg-amber-500' : 'bg-absa-passion']),
        style: normalizeStyle({ width: __props.score + '%' })
      }, null, 6)
    ]),
    createBaseVNode("span", {
      class: normalizeClass(["text-[11px] font-bold font-mono", __props.score >= 80 ? 'text-green-600' : __props.score >= 65 ? 'text-amber-700' : 'text-absa-passion'])
    }, toDisplayString(__props.score) + "% ", 3),
    (__props.label)
      ? (openBlock(), createElementBlock("span", _hoisted_3$3, toDisplayString(__props.label), 1))
      : createCommentVNode("", true)
  ]))
}
}

});

const _hoisted_1$2 = {
  key: 0,
  class: "mb-3 flex items-center gap-3 bg-absa-passion text-white px-4 py-2 rounded-sm text-xs font-bold"
};
const _hoisted_2$2 = {
  key: 1,
  class: "mb-3 flex items-center gap-3 bg-amber-50 border border-amber-300 text-amber-800 px-4 py-2 rounded-sm text-xs font-bold"
};
const _hoisted_3$2 = { class: "bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden mb-6" };
const _hoisted_4$2 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-absa-enrich" };
const _hoisted_5$2 = { class: "flex items-center gap-2" };
const _hoisted_6$2 = {
  key: 0,
  class: "grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200"
};
const _hoisted_7$2 = { class: "p-5" };
const _hoisted_8$2 = { class: "flex items-start gap-3 mb-4" };
const _hoisted_9$2 = { class: "w-9 h-9 rounded-sm bg-absa-passion/10 flex items-center justify-center flex-shrink-0" };
const _hoisted_10$2 = { class: "material-symbols-outlined text-[20px] text-absa-passion" };
const _hoisted_11$2 = { class: "text-sm font-bold text-absa-enrich leading-tight" };
const _hoisted_12$2 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_13$1 = { class: "flex items-center gap-2" };
const _hoisted_14$1 = { class: "p-5" };
const _hoisted_15$1 = { class: "space-y-3" };
const _hoisted_16$1 = { class: "text-[10px] text-gray-400 mt-4" };
const _hoisted_17$1 = { class: "p-5" };
const _hoisted_18$1 = { class: "border border-red-200 bg-red-50 rounded-sm p-3 mb-2" };
const _hoisted_19$1 = { class: "text-xs text-gray-600" };
const _hoisted_20$1 = { class: "font-bold font-mono text-absa-passion" };
const _hoisted_21$1 = { class: "font-bold font-mono" };
const _hoisted_22$1 = { class: "border border-green-200 bg-green-50 rounded-sm p-3 mb-3" };
const _hoisted_23$1 = { class: "text-xs text-gray-600" };
const _hoisted_24$1 = { class: "font-bold font-mono text-green-700" };
const _hoisted_25$1 = { class: "font-bold font-mono text-green-700" };
const _hoisted_26$1 = {
  key: 1,
  class: "flex flex-col items-center justify-center py-16 bg-gray-50/50"
};


const _sfc_main$2 = /*@__PURE__*/Object.assign({ name: 'AiNbaPanel' }, {
  __name: 'AiNbaPanel',
  props: {
  churnProb: { type: Number, default: 0 },
  customerId: { type: String, default: '' },
  // Optional override from backend � wire later
  nbaOverride: { type: Object, default: null },
},
  emits: ['execute', 'override'],
  setup(__props) {



const props = __props;



const churnProbPct = computed(() => Math.round((props.churnProb || 0) * 100));

const nba = computed(() => {
  if (!props.nbaOverride) {
    return {
      urgency: 'MODERATE',
      churnWindow: '-',
      action: 'Evaluating Next Best Action...',
      actionDetail: 'Awaiting AI decision engine response.',
      actionIcon: 'sync',
      shapDrivers: [],
      aumAtRisk: '-',
      postInterventionChurn: '-',
      clvPreserved: '-',
      confidence: 0,
    }
  }

  const ov = props.nbaOverride;
  const mappedDrivers = (ov.reason_codes || []).map((code, idx) => ({
    feature: `Factor ${idx + 1}`,
    contribution: Math.round(100 / (ov.reason_codes.length || 1)),
    direction: 'risk',
    desc: code
  }));

  return {
    urgency: ov.priority_score > 80 ? 'CRITICAL' : (ov.priority_score > 50 ? 'HIGH' : 'MODERATE'),
    churnWindow: 'Immediate',
    action: ov.next_best_action || 'No Action Recommended',
    actionDetail: ov.explanation || '',
    actionIcon: (ov.channel || '').toLowerCase().includes('digital') ? 'campaign' : 'call',
    shapDrivers: mappedDrivers,
    aumAtRisk: `ZMW ${ov.estimated_revenue ? ov.estimated_revenue.toLocaleString() : '0'}`,
    postInterventionChurn: ov.estimated_churn_reduction ? Math.max(0, churnProbPct.value - Math.round(ov.estimated_churn_reduction * 100)) : churnProbPct.value,
    clvPreserved: `ZMW ${ov.estimated_revenue ? ov.estimated_revenue.toLocaleString() : '0'}`,
    confidence: ov.confidence ? Math.round(ov.confidence * 100) : 0,
  }
});

const urgencyBadgeClass = computed(() => {
  const u = nba.value.urgency;
  if (u === 'CRITICAL') return 'bg-absa-passion text-white'
  if (u === 'HIGH')     return 'bg-amber-400 text-absa-enrich'
  return 'bg-gray-200 text-gray-600'
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (nba.value.urgency === 'CRITICAL')
      ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          _cache[2] || (_cache[2] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px] animate-pulse" }, "emergency_home", -1)),
          createTextVNode(" AI CRITICAL ALERT — Immediate intervention required. Churn window: " + toDisplayString(nba.value.churnWindow), 1)
        ]))
      : (nba.value.urgency === 'HIGH')
        ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "warning", -1)),
            createTextVNode(" AI HIGH PRIORITY — Action recommended within " + toDisplayString(nba.value.churnWindow), 1)
          ]))
        : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_3$2, [
      createBaseVNode("div", _hoisted_4$2, [
        createBaseVNode("div", _hoisted_5$2, [
          _cache[4] || (_cache[4] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-amber-300" }, "auto_awesome", -1)),
          _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-sm font-bold text-white" }, "AI Prescribed Intervention", -1)),
          createBaseVNode("span", {
            class: normalizeClass(["inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-wider", urgencyBadgeClass.value])
          }, toDisplayString(nba.value.urgency), 3)
        ]),
        _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-[11px] text-gray-300 hidden md:block" }, " XGBoost Churn v2.1 · SHAP Attribution · Nightly Inference Batch ", -1))
      ]),
      (__props.nbaOverride)
        ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
            createBaseVNode("div", _hoisted_7$2, [
              _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Prescribed Action", -1)),
              createBaseVNode("div", _hoisted_8$2, [
                createBaseVNode("div", _hoisted_9$2, [
                  createBaseVNode("span", _hoisted_10$2, toDisplayString(nba.value.actionIcon), 1)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_11$2, toDisplayString(nba.value.action), 1),
                  createBaseVNode("p", _hoisted_12$2, toDisplayString(nba.value.actionDetail), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_13$1, [
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('execute'))),
                  class: "px-3 py-1.5 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power transition-colors shadow-none flex items-center gap-1.5"
                }, [...(_cache[7] || (_cache[7] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[13px]" }, "play_arrow", -1),
                  createTextVNode(" Execute Intervention ", -1)
                ]))]),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('override'))),
                  class: "px-3 py-1.5 border border-gray-300 text-absa-enrich text-xs font-semibold rounded-sm hover:bg-gray-50 transition-colors shadow-none"
                }, " Override ")
              ])
            ]),
            createBaseVNode("div", _hoisted_14$1, [
              _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Causal SHAP Drivers", -1)),
              createBaseVNode("div", _hoisted_15$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(nba.value.shapDrivers, (driver) => {
                  return (openBlock(), createBlock(_sfc_main$4, {
                    key: driver.feature,
                    feature: driver.feature,
                    contribution: driver.contribution,
                    direction: driver.direction,
                    desc: driver.desc
                  }, null, 8, ["feature", "contribution", "direction", "desc"]))
                }), 128))
              ]),
              createBaseVNode("p", _hoisted_16$1, " Attribution: XGBoost SHAP TreeExplainer · " + toDisplayString(nba.value.shapDrivers.length) + " features analysed ", 1)
            ]),
            createBaseVNode("div", _hoisted_17$1, [
              _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Counterfactual Outcome", -1)),
              createBaseVNode("div", _hoisted_18$1, [
                _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[10px] font-bold text-absa-passion uppercase mb-1.5 flex items-center gap-1" }, [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "close"),
                  createTextVNode(" Without Intervention ")
                ], -1)),
                createBaseVNode("p", _hoisted_19$1, [
                  _cache[10] || (_cache[10] = createTextVNode(" Churn probability ", -1)),
                  createBaseVNode("span", _hoisted_20$1, toDisplayString(churnProbPct.value) + "%", 1),
                  _cache[11] || (_cache[11] = createTextVNode(" · AUM at risk ", -1)),
                  createBaseVNode("span", _hoisted_21$1, toDisplayString(nba.value.aumAtRisk), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_22$1, [
                _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[10px] font-bold text-green-700 uppercase mb-1.5 flex items-center gap-1" }, [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "check"),
                  createTextVNode(" With Intervention ")
                ], -1)),
                createBaseVNode("p", _hoisted_23$1, [
                  _cache[13] || (_cache[13] = createTextVNode(" Churn drops to ", -1)),
                  createBaseVNode("span", _hoisted_24$1, toDisplayString(nba.value.postInterventionChurn) + "%", 1),
                  _cache[14] || (_cache[14] = createTextVNode(" · CLV preserved: ", -1)),
                  createBaseVNode("span", _hoisted_25$1, toDisplayString(nba.value.clvPreserved), 1)
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Model Confidence", -1)),
                createVNode(_sfc_main$3, {
                  score: nba.value.confidence,
                  label: "intervention success"
                }, null, 8, ["score"])
              ])
            ])
          ]))
        : (openBlock(), createElementBlock("div", _hoisted_26$1, [...(_cache[18] || (_cache[18] = [
            createBaseVNode("span", { class: "material-symbols-outlined text-[32px] text-absa-energy animate-spin mb-4" }, "sync", -1),
            createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-1" }, "Evaluating Next Best Action...", -1),
            createBaseVNode("p", { class: "text-xs text-gray-500 max-w-md text-center" }, " The AI decision engine is currently analyzing the customer profile, recent events, and risk factors to prescribe the optimal intervention. This may take up to a minute. ", -1)
          ]))]))
    ])
  ], 64))
}
}

});

/**
 * marked v16.4.2 - a markdown parser
 * Copyright (c) 2018-2025, MarkedJS. (MIT License)
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

function L(){return {async:false,breaks:false,extensions:null,gfm:true,hooks:null,pedantic:false,renderer:null,silent:false,tokenizer:null,walkTokens:null}}var T=L();function G(l){T=l;}var E={exec:()=>null};function d(l,e=""){let t=typeof l=="string"?l:l.source,n={replace:(r,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(m.caret,"$1"),t=t.replace(r,s),n},getRegex:()=>new RegExp(t,e)};return n}var be=(()=>{try{return !!new RegExp("(?<=1)(?<!1)")}catch{return  false}})(),m={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:l=>new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}#`),htmlBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}<(?:[a-z].*>|!--)`,"i")},Re=/^(?:[ \t]*(?:\n|$))+/,Te=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Oe=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,I=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,we=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,F=/(?:[*+-]|\d{1,9}[.)])/,ie=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,oe=d(ie).replace(/bull/g,F).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ye=d(ie).replace(/bull/g,F).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),j=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Pe=/^[^\n]+/,Q=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Se=d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Q).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),$e=d(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,F).getRegex(),v="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",U=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_e=d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",U).replace("tag",v).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ae=d(j).replace("hr",I).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),Le=d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ae).getRegex(),K={blockquote:Le,code:Te,def:Se,fences:Oe,heading:we,hr:I,html:_e,lheading:oe,list:$e,newline:Re,paragraph:ae,table:E,text:Pe},re=d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",I).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),Me={...K,lheading:ye,table:re,paragraph:d(j).replace("hr",I).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",re).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex()},ze={...K,html:d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",U).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:E,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:d(j).replace("hr",I).replace("heading",` *#{1,6} *[^
]`).replace("lheading",oe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ae=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ee=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,le=/^( {2,}|\\)\n(?!\s*$)/,Ie=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,D=/[\p{P}\p{S}]/u,W=/[\s\p{P}\p{S}]/u,ue=/[^\s\p{P}\p{S}]/u,Ce=d(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,W).getRegex(),pe=/(?!~)[\p{P}\p{S}]/u,Be=/(?!~)[\s\p{P}\p{S}]/u,qe=/(?:[^\s\p{P}\p{S}]|~)/u,ve=d(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",be?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ce=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,De=d(ce,"u").replace(/punct/g,D).getRegex(),He=d(ce,"u").replace(/punct/g,pe).getRegex(),he="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ze=d(he,"gu").replace(/notPunctSpace/g,ue).replace(/punctSpace/g,W).replace(/punct/g,D).getRegex(),Ge=d(he,"gu").replace(/notPunctSpace/g,qe).replace(/punctSpace/g,Be).replace(/punct/g,pe).getRegex(),Ne=d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ue).replace(/punctSpace/g,W).replace(/punct/g,D).getRegex(),Fe=d(/\\(punct)/,"gu").replace(/punct/g,D).getRegex(),je=d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qe=d(U).replace("(?:-->|$)","-->").getRegex(),Ue=d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qe).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),q=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ke=d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",q).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),de=d(/^!?\[(label)\]\[(ref)\]/).replace("label",q).replace("ref",Q).getRegex(),ke=d(/^!?\[(ref)\](?:\[\])?/).replace("ref",Q).getRegex(),We=d("reflink|nolink(?!\\()","g").replace("reflink",de).replace("nolink",ke).getRegex(),se=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,X={_backpedal:E,anyPunctuation:Fe,autolink:je,blockSkip:ve,br:le,code:Ee,del:E,emStrongLDelim:De,emStrongRDelimAst:Ze,emStrongRDelimUnd:Ne,escape:Ae,link:Ke,nolink:ke,punctuation:Ce,reflink:de,reflinkSearch:We,tag:Ue,text:Ie,url:E},Xe={...X,link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",q).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",q).getRegex()},N={...X,emStrongRDelimAst:Ge,emStrongLDelim:He,url:d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",se).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:d(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",se).getRegex()},Je={...N,br:d(le).replace("{2,}","*").getRegex(),text:d(N.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},C={normal:K,gfm:Me,pedantic:ze},M={normal:X,gfm:N,breaks:Je,pedantic:Xe};var Ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ge=l=>Ve[l];function w(l,e){if(e){if(m.escapeTest.test(l))return l.replace(m.escapeReplace,ge)}else if(m.escapeTestNoEncode.test(l))return l.replace(m.escapeReplaceNoEncode,ge);return l}function J(l){try{l=encodeURI(l).replace(m.percentDecode,"%");}catch{return null}return l}function V(l,e){let t=l.replace(m.findPipe,(i,s,a)=>{let o=false,p=s;for(;--p>=0&&a[p]==="\\";)o=!o;return o?"|":" |"}),n=t.split(m.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(m.slashPipe,"|");return n}function z(l,e,t){let n=l.length;if(n===0)return "";let r=0;for(;r<n;){let i=l.charAt(n-r-1);if(i===e&&true)r++;else break}return l.slice(0,n-r)}function fe(l,e){if(l.indexOf(e[1])===-1)return  -1;let t=0;for(let n=0;n<l.length;n++)if(l[n]==="\\")n++;else if(l[n]===e[0])t++;else if(l[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function me(l,e,t,n,r){let i=e.href,s=e.title||null,a=l[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=true;let o={type:l[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:s,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=false,o}function Ye(l,e,t){let n=l.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let s=i.match(t.other.beginningSpace);if(s===null)return i;let[a]=s;return a.length>=r.length?i.slice(r.length):i}).join(`
`)}var y=class{options;rules;lexer;constructor(e){this.options=e||T;}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return {type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return {type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:z(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ye(n,t[3]||"",this.rules);return {type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=z(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim());}return {type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return {type:"hr",raw:z(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=z(t[0],`
`).split(`
`),r="",i="",s=[];for(;n.length>0;){let a=false,o=[],p;for(p=0;p<n.length;p++)if(this.rules.other.blockquoteStart.test(n[p]))o.push(n[p]),a=true;else if(!a)o.push(n[p]);else break;n=n.slice(p);let u=o.join(`
`),c=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,i=i?`${i}
${c}`:c;let g=this.lexer.state.top;if(this.lexer.state.top=true,this.lexer.blockTokens(c,s,true),this.lexer.state.top=g,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let R=h,f=R.raw+`
`+n.join(`
`),O=this.blockquote(f);s[s.length-1]=O,r=r.substring(0,r.length-R.raw.length)+O.raw,i=i.substring(0,i.length-R.text.length)+O.text;break}else if(h?.type==="list"){let R=h,f=R.raw+`
`+n.join(`
`),O=this.list(f);s[s.length-1]=O,r=r.substring(0,r.length-h.raw.length)+O.raw,i=i.substring(0,i.length-R.raw.length)+O.raw,n=f.substring(s.at(-1).raw.length).split(`
`);continue}}return {type:"blockquote",raw:r,tokens:s,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:false,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),a=false;for(;e;){let p=false,u="",c="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,H=>" ".repeat(3*H.length)),h=e.split(`
`,1)[0],R=!g.trim(),f=0;if(this.options.pedantic?(f=2,c=g.trimStart()):R?f=t[1].length+1:(f=t[2].search(this.rules.other.nonSpaceChar),f=f>4?1:f,c=g.slice(f),f+=t[1].length),R&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),p=true),!p){let H=this.rules.other.nextBulletRegex(f),ee=this.rules.other.hrRegex(f),te=this.rules.other.fencesBeginRegex(f),ne=this.rules.other.headingBeginRegex(f),xe=this.rules.other.htmlBeginRegex(f);for(;e;){let Z=e.split(`
`,1)[0],A;if(h=Z,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),A=h):A=h.replace(this.rules.other.tabCharGlobal,"    "),te.test(h)||ne.test(h)||xe.test(h)||H.test(h)||ee.test(h))break;if(A.search(this.rules.other.nonSpaceChar)>=f||!h.trim())c+=`
`+A.slice(f);else {if(R||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(g)||ne.test(g)||ee.test(g))break;c+=`
`+h;}!R&&!h.trim()&&(R=true),u+=Z+`
`,e=e.substring(Z.length+1),g=A.slice(f);}}i.loose||(a?i.loose=true:this.rules.other.doubleBlankLine.test(u)&&(a=true));let O=null,Y;this.options.gfm&&(O=this.rules.other.listIsTask.exec(c),O&&(Y=O[0]!=="[ ] ",c=c.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:u,task:!!O,checked:Y,loose:false,text:c,tokens:[]}),i.raw+=u;}let o=i.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let p=0;p<i.items.length;p++)if(this.lexer.state.top=false,i.items[p].tokens=this.lexer.blockTokens(i.items[p].text,[]),!i.loose){let u=i.items[p].tokens.filter(g=>g.type==="space"),c=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));i.loose=c;}if(i.loose)for(let p=0;p<i.items.length;p++)i.items[p].loose=true;return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return {type:"html",block:true,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return {type:"def",tag:n,raw:t[0],href:r,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=V(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<n.length;a++)s.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:true,align:s.align[a]});for(let a of i)s.rows.push(V(a,s.header.length).map((o,p)=>({text:o,tokens:this.lexer.inline(o),header:false,align:s.align[p]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return {type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return {type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return {type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return {type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return !this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=true:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=false),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=true:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=false),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:false,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=z(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else {let s=fe(t[2],"()");if(s===-2)return;if(s>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,o).trim(),t[3]="";}}let r=t[2],i="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],i=s[3]);}else i=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),me(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[r.toLowerCase()];if(!i){let s=n[0].charAt(0);return {type:"text",raw:s,text:s}}return me(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...r[0]].length-1,a,o,p=s,u=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(r=c.exec(t))!=null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){p+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){u+=o;continue}if(p-=o,p>0)continue;o=Math.min(o,o+p+u);let g=[...r[0]][0].length,h=e.slice(0,s+r.index+g+o);if(Math.min(s,o)%2){let f=h.slice(1,-1);return {type:"em",raw:h,text:f,tokens:this.lexer.inlineTokens(f)}}let R=h.slice(2,-2);return {type:"strong",raw:h,text:R,tokens:this.lexer.inlineTokens(R)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return {type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return {type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else {let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0];}return {type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return {type:"text",raw:t[0],text:t[0],escaped:n}}}};var x=class l{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||T,this.options.tokenizer=this.options.tokenizer||new y,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:false,inRawBlock:false,top:true};let t={other:m,block:C.normal,inline:M.normal};this.options.pedantic?(t.block=C.pedantic,t.inline=M.pedantic):this.options.gfm&&(t.block=C.gfm,this.options.breaks?t.inline=M.breaks:t.inline=M.gfm),this.tokenizer.rules=t;}static get rules(){return {block:C,inline:M}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(m.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens);}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=false){for(this.options.pedantic&&(e=e.replace(m.tabCharGlobal,"    ").replace(m.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(s=>(r=s.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),true):false))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let s=t.at(-1);r.raw.length===1&&s!==void 0?s.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let s=1/0,a=e.slice(1),o;this.options.extensions.startBlock.forEach(p=>{o=p.call({lexer:this},a),typeof o=="number"&&o>=0&&(s=Math.min(s,o));}),s<1/0&&s>=0&&(i=e.substring(0,s+1));}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let s=t.at(-1);n&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=true,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,r=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=false,a="";for(;e;){s||(a=""),s=false;let o;if(this.options.extensions?.inline?.some(u=>(o=u.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),true):false))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let u=t.at(-1);o.type==="text"&&u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,a)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let p=e;if(this.options.extensions?.startInline){let u=1/0,c=e.slice(1),g;this.options.extensions.startInline.forEach(h=>{g=h.call({lexer:this},c),typeof g=="number"&&g>=0&&(u=Math.min(u,g));}),u<1/0&&u>=0&&(p=e.substring(0,u+1));}if(o=this.tokenizer.inlineText(p)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(a=o.raw.slice(-1)),s=true;let u=t.at(-1);u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}};var P=class{options;parser;constructor(e){this.options=e||T;}space(e){return ""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(m.notSpaceStart)?.[0],i=e.replace(m.endingNewline,"")+`
`;return r?'<pre><code class="language-'+w(r)+'">'+(n?i:w(i,true))+`</code></pre>
`:"<pre><code>"+(n?i:w(i,true))+`</code></pre>
`}blockquote({tokens:e}){return `<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return ""}heading({tokens:e,depth:t}){return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return `<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let o=e.items[a];r+=this.listitem(o);}let i=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return "<"+i+s+`>
`+r+"</"+i+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+w(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=true)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:true}):t+=n+" ";}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return "<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return `<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let r="";for(let i=0;i<e.rows.length;i++){let s=e.rows[i];n="";for(let a=0;a<s.length;a++)n+=this.tablecell(s[a]);r+=this.tablerow({text:n});}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return `<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return (e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return `<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return `<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return `<code>${w(e,true)}</code>`}br(e){return "<br>"}del({tokens:e}){return `<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=J(e);if(i===null)return r;e=i;let s='<a href="'+e+'"';return t&&(s+=' title="'+w(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=J(e);if(i===null)return w(n);e=i;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${w(t)}"`),s+=">",s}text(e){return "tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:w(e.text)}};var $=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return ""+e}image({text:e}){return ""+e}br(){return ""}};var b=class l{options;renderer;textRenderer;constructor(e){this.options=e||T,this.options.renderer=this.options.renderer||new P,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new $;}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e,t=true){let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let a=i,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==false||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=o||"";continue}}let s=i;switch(s.type){case "space":{n+=this.renderer.space(s);continue}case "hr":{n+=this.renderer.hr(s);continue}case "heading":{n+=this.renderer.heading(s);continue}case "code":{n+=this.renderer.code(s);continue}case "table":{n+=this.renderer.table(s);continue}case "blockquote":{n+=this.renderer.blockquote(s);continue}case "list":{n+=this.renderer.list(s);continue}case "html":{n+=this.renderer.html(s);continue}case "def":{n+=this.renderer.def(s);continue}case "paragraph":{n+=this.renderer.paragraph(s);continue}case "text":{let a=s,o=this.renderer.text(a);for(;r+1<e.length&&e[r+1].type==="text";)a=e[++r],o+=`
`+this.renderer.text(a);t?n+=this.renderer.paragraph({type:"paragraph",raw:o,text:o,tokens:[{type:"text",raw:o,text:o,escaped:true}]}):n+=o;continue}default:{let a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t=this.renderer){let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==false||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=a||"";continue}}let s=i;switch(s.type){case "escape":{n+=t.text(s);break}case "html":{n+=t.html(s);break}case "link":{n+=t.link(s);break}case "image":{n+=t.image(s);break}case "strong":{n+=t.strong(s);break}case "em":{n+=t.em(s);break}case "codespan":{n+=t.codespan(s);break}case "br":{n+=t.br(s);break}case "del":{n+=t.del(s);break}case "text":{n+=t.text(s);break}default:{let a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}};var S=class{options;block;constructor(e){this.options=e||T;}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?x.lex:x.lexInline}provideParser(){return this.block?b.parse:b.parseInline}};var B=class{defaults=L();options=this.setOptions;parse=this.parseMarkdown(true);parseInline=this.parseMarkdown(false);Parser=b;Renderer=P;TextRenderer=$;Lexer=x;Tokenizer=y;Hooks=S;constructor(...e){this.use(...e);}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case "table":{let i=r;for(let s of i.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of i.rows)for(let a of s)n=n.concat(this.walkTokens(a.tokens,t));break}case "list":{let i=r;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=r;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(s=>{let a=i[s].flat(1/0);n=n.concat(this.walkTokens(a,t));}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)));}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||false,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let s=t.renderers[i.name];s?t.renderers[i.name]=function(...a){let o=i.renderer.apply(this,a);return o===false&&(o=s.apply(this,a)),o}:t.renderers[i.name]=i.renderer;}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[i.level];s?s.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]));}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens);}),r.extensions=t),n.renderer){let i=this.defaults.renderer||new P(this.defaults);for(let s in n.renderer){if(!(s in i))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,o=n.renderer[a],p=i[a];i[a]=(...u)=>{let c=o.apply(i,u);return c===false&&(c=p.apply(i,u)),c||""};}r.renderer=i;}if(n.tokenizer){let i=this.defaults.tokenizer||new y(this.defaults);for(let s in n.tokenizer){if(!(s in i))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,o=n.tokenizer[a],p=i[a];i[a]=(...u)=>{let c=o.apply(i,u);return c===false&&(c=p.apply(i,u)),c};}r.tokenizer=i;}if(n.hooks){let i=this.defaults.hooks||new S;for(let s in n.hooks){if(!(s in i))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,o=n.hooks[a],p=i[a];S.passThroughHooks.has(s)?i[a]=u=>{if(this.defaults.async&&S.passThroughHooksRespectAsync.has(s))return (async()=>{let g=await o.call(i,u);return p.call(i,g)})();let c=o.call(i,u);return p.call(i,c)}:i[a]=(...u)=>{if(this.defaults.async)return (async()=>{let g=await o.apply(i,u);return g===false&&(g=await p.apply(i,u)),g})();let c=o.apply(i,u);return c===false&&(c=p.apply(i,u)),c};}r.hooks=i;}if(n.walkTokens){let i=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(a){let o=[];return o.push(s.call(this,a)),i&&(o=o.concat(i.call(this,a))),o};}this.defaults={...this.defaults,...r};}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return x.lex(e,t??this.defaults)}parser(e,t){return b.parse(e,t??this.defaults)}parseMarkdown(e){return (n,r)=>{let i={...r},s={...this.defaults,...i},a=this.onError(!!s.silent,!!s.async);if(this.defaults.async===true&&i.async===false)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return (async()=>{let o=s.hooks?await s.hooks.preprocess(n):n,u=await(s.hooks?await s.hooks.provideLexer():e?x.lex:x.lexInline)(o,s),c=s.hooks?await s.hooks.processAllTokens(u):u;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let h=await(s.hooks?await s.hooks.provideParser():e?b.parse:b.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(h):h})().catch(a);try{s.hooks&&(n=s.hooks.preprocess(n));let p=(s.hooks?s.hooks.provideLexer():e?x.lex:x.lexInline)(n,s);s.hooks&&(p=s.hooks.processAllTokens(p)),s.walkTokens&&this.walkTokens(p,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?b.parse:b.parseInline)(p,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(o){return a(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+w(n.message+"",true)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}};var _=new B;function k(l,e){return _.parse(l,e)}k.options=k.setOptions=function(l){return _.setOptions(l),k.defaults=_.defaults,G(k.defaults),k};k.getDefaults=L;k.defaults=T;k.use=function(...l){return _.use(...l),k.defaults=_.defaults,G(k.defaults),k};k.walkTokens=function(l,e){return _.walkTokens(l,e)};k.parseInline=_.parseInline;k.Parser=b;k.parser=b.parse;k.Renderer=P;k.TextRenderer=$;k.Lexer=x;k.lexer=x.lex;k.Tokenizer=y;k.Hooks=S;k.parse=k;k.options;k.setOptions;k.use;k.walkTokens;k.parseInline;b.parse;x.lex;

const _hoisted_1$1 = { class: "bg-white border border-gray-200 rounded-sm p-4" };
const _hoisted_2$1 = { class: "flex items-start justify-between gap-3 mb-2" };
const _hoisted_3$1 = { class: "flex items-center gap-2 shrink-0" };
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = {
  key: 0,
  class: "text-[11px] text-gray-500 mt-2"
};
const _hoisted_6$1 = {
  key: 1,
  class: "mt-2 text-[11px] text-absa-passion font-semibold"
};
const _hoisted_7$1 = {
  key: 2,
  class: "mt-2 text-[11px] text-status-warning font-semibold"
};
const _hoisted_8$1 = {
  key: 3,
  class: "mt-3"
};
const _hoisted_9$1 = { class: "flex flex-wrap items-center gap-2 mb-2" };
const _hoisted_10$1 = {
  key: 0,
  class: "px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-mono rounded-sm"
};
const _hoisted_11$1 = {
  key: 1,
  class: "px-2 py-0.5 bg-absa-enrich/10 text-absa-enrich text-[10px] font-bold rounded-sm"
};
const _hoisted_12$1 = ["innerHTML"];

/**
 * AI narration panel (Ollama).
 *
 * ADR-005: the LLM is an advisor — it only narrates a decision that the
 * deterministic rule engine already made. On CPU a 7B model needs ~1-2 minutes,
 * so generation is user-triggered (never on mount) and uses fetch with no
 * axios timeout, plus a hard 5-minute abort.
 */

const _sfc_main$1 = {
  __name: 'AiNarrationPanel',
  props: {
  customerId: { type: String, required: true },
  asOfDate: { type: String, default: '' },
},
  setup(__props) {

const props = __props;

const snapshotStore = useSnapshotStore();
const effectiveAsOfDate = computed(() => props.asOfDate || snapshotStore.asOfDate);

const loading = ref(false);
const elapsed = ref(0);
const error = ref('');
const narration = ref('');
const model = ref('');
const topAction = ref('');
const available = ref(null);

let ticker = null;
let controller = null;

const elapsedLabel = computed(() =>
  elapsed.value < 60
    ? `${elapsed.value}s`
    : `${Math.floor(elapsed.value / 60)}m ${elapsed.value % 60}s`,
);

const parsedNarration = computed(() => {
  if (!narration.value) return ''
  return k(narration.value)
});

async function generate() {

  if (loading.value) return
  loading.value = true;
  error.value = '';
  narration.value = '';
  elapsed.value = 0;
  ticker = setInterval(() => { elapsed.value += 1; }, 1000);
  controller = new AbortController();
  const hardStop = setTimeout(() => controller?.abort(), 300000);

  try {
    const url = `${API_BASE_URL}/api/v1/insights/llm-explain/${encodeURIComponent(props.customerId)}`
      + `?as_of_date=${encodeURIComponent(effectiveAsOfDate.value)}`;
    const res = await authFetch(url, { signal: controller.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.detail || `Request failed (${res.status})`)

    available.value = data.llm_available ?? null;
    model.value = data.model || '';
    topAction.value = data.top_action || '';
    narration.value = data.llm_explanation || '';
  } catch (e) {
    error.value = e?.name === 'AbortError'
      ? 'Cancelled.'
      : (e?.message || 'Failed to generate the explanation');
  } finally {
    clearTimeout(hardStop);
    if (ticker) { clearInterval(ticker); ticker = null; }
    loading.value = false;
  }
}

function cancel() {
  controller?.abort();
  if (ticker) { clearInterval(ticker); ticker = null; }
  loading.value = false;
}

onBeforeUnmount(() => {
  controller?.abort();
  if (ticker) clearInterval(ticker);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[0] || (_cache[0] = createBaseVNode("div", null, [
        createBaseVNode("h4", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, " AI Explanation "),
        createBaseVNode("p", { class: "text-[11px] text-gray-400 mt-1" }, " Narration only — the recommended action is produced by the deterministic rule engine (ADR-005). ")
      ], -1)),
      createBaseVNode("div", _hoisted_3$1, [
        (loading.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: cancel,
              class: "px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-bold rounded-sm hover:bg-gray-50"
            }, " Cancel "))
          : createCommentVNode("", true),
        createBaseVNode("button", {
          onClick: generate,
          disabled: loading.value,
          class: normalizeClass(['px-3 py-1.5 text-xs font-bold rounded-sm transition-colors',
                   loading.value ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-absa-enrich text-white hover:bg-absa-power'])
        }, toDisplayString(loading.value ? `Generating… ${elapsedLabel.value}` : (narration.value ? 'Regenerate' : 'Generate explanation')), 11, _hoisted_4$1)
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("p", _hoisted_5$1, " Local Ollama model — allow ~1-2 minutes on CPU. You can navigate away; this request is cancelled if you do. "))
      : createCommentVNode("", true),
    (error.value)
      ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(error.value), 1))
      : createCommentVNode("", true),
    (available.value === false && !error.value)
      ? (openBlock(), createElementBlock("p", _hoisted_7$1, " LLM unavailable — Ollama is not running or the model is not pulled. Showing the deterministic summary. "))
      : createCommentVNode("", true),
    (narration.value)
      ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
          createBaseVNode("div", _hoisted_9$1, [
            (model.value)
              ? (openBlock(), createElementBlock("span", _hoisted_10$1, toDisplayString(model.value), 1))
              : createCommentVNode("", true),
            (topAction.value)
              ? (openBlock(), createElementBlock("span", _hoisted_11$1, " Rule-engine action: " + toDisplayString(topAction.value), 1))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: "text-sm text-gray-700 leading-relaxed markdown-content",
            innerHTML: parsedNarration.value
          }, null, 8, _hoisted_12$1)
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const AiNarrationPanel = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-11fa0a70"]]);

const _hoisted_1 = { class: "relative w-full min-h-screen" };
const _hoisted_2 = { class: "relative z-10 w-full pt-6 px-6 pb-6" };
const _hoisted_3 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-8" };
const _hoisted_4 = { class: "col-span-12 lg:col-span-8" };
const _hoisted_5 = { class: "col-span-12 lg:col-span-4" };
const _hoisted_6 = { class: "grid grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_7 = {
  key: 1,
  class: "flex flex-col items-center justify-center min-h-[60vh] text-center"
};
const _hoisted_8 = { class: "mb-5" };
const _hoisted_9 = { class: "flex items-center gap-2 text-[11px] text-gray-500 mt-2" };
const _hoisted_10 = { class: "text-absa-enrich font-bold" };
const _hoisted_11 = {
  key: 0,
  class: "mb-3 flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm text-xs"
};
const _hoisted_12 = { class: "text-gray-300" };
const _hoisted_13 = {
  key: 2,
  class: "fixed inset-0 z-50 flex items-center justify-center p-4"
};
const _hoisted_14 = { class: "relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl" };
const _hoisted_15 = { class: "px-6 py-5 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_16 = { class: "text-xs text-gray-500 mt-0.5" };
const _hoisted_17 = { class: "p-6 space-y-4" };
const _hoisted_18 = ["value"];
const _hoisted_19 = { class: "flex justify-end gap-2 pt-1" };
const _hoisted_20 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_21 = { class: "relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6" };
const _hoisted_22 = { class: "flex items-start gap-4" };
const _hoisted_23 = { class: "flex items-center gap-3 flex-wrap" };
const _hoisted_24 = { class: "text-base font-bold font-display uppercase tracking-tight text-gray-900" };
const _hoisted_25 = { class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5" };
const _hoisted_26 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 mt-4 text-xs" };
const _hoisted_27 = { class: "font-bold text-gray-900" };
const _hoisted_28 = { class: "font-bold text-gray-900" };
const _hoisted_29 = { class: "font-bold text-gray-900" };
const _hoisted_30 = { class: "font-bold text-gray-900" };
const _hoisted_31 = { key: 0 };
const _hoisted_32 = { class: "font-bold text-gray-900" };
const _hoisted_33 = { class: "font-bold text-gray-900" };
const _hoisted_34 = { class: "flex items-center gap-2 flex-wrap shrink-0" };
const _hoisted_35 = { class: "relative" };
const _hoisted_36 = {
  key: 0,
  class: "absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 shadow-lg z-30 py-1 rounded-none"
};
const _hoisted_37 = { class: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_38 = { class: "bg-white border border-gray-200 p-4 shadow-sm" };
const _hoisted_39 = { class: "flex items-center justify-between mb-3" };
const _hoisted_40 = { class: "flex items-baseline gap-1" };
const _hoisted_41 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_42 = { class: "pp-track mt-3" };
const _hoisted_43 = { class: "bg-white border border-gray-200 p-4 shadow-sm" };
const _hoisted_44 = { class: "flex items-center justify-between mb-3" };
const _hoisted_45 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_46 = { class: "bg-white border border-gray-200 p-4 shadow-sm" };
const _hoisted_47 = { class: "flex items-center justify-between mb-3" };
const _hoisted_48 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_49 = { class: "text-xs text-gray-500 mt-2" };
const _hoisted_50 = { key: 0 };
const _hoisted_51 = { class: "bg-white border border-gray-200 p-4 shadow-sm" };
const _hoisted_52 = {
  key: 0,
  class: "text-xs text-gray-500 mt-3"
};
const _hoisted_53 = {
  key: 1,
  class: "text-xs text-gray-500 mt-3"
};
const _hoisted_54 = {
  id: "why-predictions",
  class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden"
};
const _hoisted_55 = { class: "relative grid grid-cols-12 gap-6 z-10" };
const _hoisted_56 = { class: "col-span-12 lg:col-span-6" };
const _hoisted_57 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-3" };
const _hoisted_58 = { class: "space-y-3" };
const _hoisted_59 = { class: "text-xs text-gray-900 w-48 shrink-0" };
const _hoisted_60 = { class: "pp-track flex-1 rounded-none" };
const _hoisted_61 = { class: "text-xs font-bold text-gray-900 w-14 text-right" };
const _hoisted_62 = { class: "col-span-12 lg:col-span-6 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6" };
const _hoisted_63 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-3" };
const _hoisted_64 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_65 = { class: "text-xs font-bold text-gray-900" };
const _hoisted_66 = { class: "text-[11px] text-gray-500" };
const _hoisted_67 = {
  key: 1,
  class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_68 = { class: "relative mt-6 pt-5 border-t border-gray-200 z-10" };
const _hoisted_69 = { class: "text-xs text-gray-500 max-w-3xl" };
const _hoisted_70 = { class: "text-gray-900" };
const _hoisted_71 = { key: 0 };
const _hoisted_72 = { class: "text-[10px] font-mono text-gray-400 mt-3" };
const _hoisted_73 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_74 = { class: "relative z-10 flex flex-wrap items-center gap-2" };
const _hoisted_75 = {
  key: 0,
  class: "w-4 h-4 text-gray-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_76 = { class: "relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6" };
const _hoisted_77 = { class: "pp-metric" };
const _hoisted_78 = { class: "pp-metric__value" };
const _hoisted_79 = { class: "pp-metric" };
const _hoisted_80 = { class: "pp-metric__value" };
const _hoisted_81 = { class: "pp-metric" };
const _hoisted_82 = { class: "pp-metric__value" };
const _hoisted_83 = { class: "pp-metric" };
const _hoisted_84 = { class: "pp-metric__value" };
const _hoisted_85 = {
  key: 0,
  class: "text-[10px] text-gray-400 mt-1 block font-mono"
};
const _hoisted_86 = {
  key: 0,
  class: "relative z-10 mt-6 pt-5 border-t border-gray-200"
};
const _hoisted_87 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_88 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-2" };
const _hoisted_89 = { class: "text-2xl font-bold font-mono text-gray-900 mt-2" };
const _hoisted_90 = {
  key: 0,
  class: "text-[10px] text-gray-400 mt-1 font-mono"
};
const _hoisted_91 = {
  key: 1,
  class: "text-[10px] font-mono uppercase tracking-widest text-gray-400"
};
const _hoisted_92 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_93 = {
  key: 0,
  class: "relative z-10 pl-6 mt-4"
};
const _hoisted_94 = { class: "text-xs font-bold text-gray-900 uppercase tracking-wide" };
const _hoisted_95 = { class: "text-[10px] font-mono text-gray-500 mt-0.5" };
const _hoisted_96 = {
  key: 1,
  class: "relative z-10 text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-4"
};
const _hoisted_97 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_98 = { class: "relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" };
const _hoisted_99 = { class: "flex items-center justify-between mb-2" };
const _hoisted_100 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900" };
const _hoisted_101 = { class: "text-[10px] text-gray-400 font-mono" };
const _hoisted_102 = {
  key: 0,
  class: "text-[11px] text-gray-500 mb-3"
};
const _hoisted_103 = {
  key: 1,
  class: "pp-track rounded-none"
};
const _hoisted_104 = {
  key: 2,
  class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_105 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 mb-6" };
const _hoisted_106 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden" };
const _hoisted_107 = {
  key: 0,
  class: "relative z-10 space-y-3"
};
const _hoisted_108 = { class: "flex items-center justify-between" };
const _hoisted_109 = { class: "text-xs font-bold text-gray-900 uppercase tracking-wide" };
const _hoisted_110 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_111 = {
  key: 1,
  class: "relative z-10 text-[10px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_112 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden" };
const _hoisted_113 = {
  key: 0,
  class: "relative z-10 space-y-3"
};
const _hoisted_114 = { class: "text-xs font-bold text-gray-900 uppercase tracking-wide" };
const _hoisted_115 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_116 = {
  key: 1,
  class: "relative z-10 text-[10px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_117 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_118 = {
  key: 0,
  class: "relative z-10 space-y-4"
};
const _hoisted_119 = { class: "w-10 h-10 bg-gray-50 border border-gray-200 text-absa-passion flex items-center justify-center font-mono font-bold shrink-0 rounded-none" };
const _hoisted_120 = { class: "flex-1" };
const _hoisted_121 = { class: "text-xs font-bold text-gray-900 uppercase tracking-wide" };
const _hoisted_122 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_123 = { class: "text-[10px] font-mono text-absa-passion uppercase tracking-widest mt-1.5" };
const _hoisted_124 = { class: "text-right shrink-0" };
const _hoisted_125 = { class: "text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2" };
const _hoisted_126 = ["onClick"];
const _hoisted_127 = {
  key: 1,
  class: "relative z-10 text-[10px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_128 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-6" };
const _hoisted_129 = { class: "col-span-12 lg:col-span-5 bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden" };
const _hoisted_130 = { class: "relative z-10" };
const _hoisted_131 = { class: "flex items-baseline gap-2 mb-3" };
const _hoisted_132 = { class: "text-2xl font-bold font-mono text-gray-900" };
const _hoisted_133 = { class: "space-y-2 text-xs" };
const _hoisted_134 = { class: "flex justify-between" };
const _hoisted_135 = { class: "font-bold font-mono text-gray-900" };
const _hoisted_136 = { class: "flex justify-between" };
const _hoisted_137 = { class: "font-bold font-mono text-gray-900" };
const _hoisted_138 = { class: "flex justify-between" };
const _hoisted_139 = { class: "font-bold font-mono text-gray-900" };
const _hoisted_140 = { class: "flex justify-between" };
const _hoisted_141 = { class: "font-bold font-mono text-gray-900" };
const _hoisted_142 = { class: "col-span-12 lg:col-span-7 bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden" };
const _hoisted_143 = { class: "relative z-10" };
const _hoisted_144 = { open: "" };
const _hoisted_145 = { class: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" };
const _hoisted_146 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-0.5" };
const _hoisted_147 = { class: "text-[11px] text-gray-500" };
const _hoisted_148 = { class: "bg-white border border-gray-200 shadow-sm mb-6 relative overflow-hidden" };
const _hoisted_149 = { class: "relative z-10 overflow-x-auto" };
const _hoisted_150 = { class: "min-w-full divide-y divide-gray-200" };
const _hoisted_151 = { class: "bg-white divide-y divide-gray-100" };
const _hoisted_152 = { key: 0 };
const _hoisted_153 = { class: "p-4 text-[10px] font-mono text-gray-900" };
const _hoisted_154 = { class: "p-4" };
const _hoisted_155 = {
  key: 3,
  class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden"
};
const _hoisted_156 = { class: "relative z-10 flex items-center justify-between mb-4" };
const _hoisted_157 = { class: "text-[10px] font-mono font-bold tracking-widest text-[#DC0037]" };
const _hoisted_158 = { class: "relative z-10 space-y-3" };
const _hoisted_159 = { class: "text-xs font-bold text-gray-900 uppercase tracking-wide" };
const _hoisted_160 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_161 = { class: "bg-white border border-gray-200 shadow-sm p-5 mb-6 relative overflow-hidden" };
const _hoisted_162 = { class: "relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4" };
const _hoisted_163 = { class: "pp-metric" };
const _hoisted_164 = { class: "pp-metric__value" };
const _hoisted_165 = { class: "pp-metric" };
const _hoisted_166 = { class: "pp-metric__value" };
const _hoisted_167 = { class: "pp-metric" };
const _hoisted_168 = { class: "pp-metric__value" };
const _hoisted_169 = { class: "pp-metric" };
const _hoisted_170 = { class: "pp-metric__value" };
const _hoisted_171 = {
  key: 0,
  class: "pp-metric"
};
const _hoisted_172 = { class: "pp-metric__value" };
const _hoisted_173 = { class: "pp-metric" };
const _hoisted_174 = { class: "pp-metric__value" };
const _hoisted_175 = { class: "pp-metric" };
const _hoisted_176 = { class: "pp-metric__value" };
const _hoisted_177 = { class: "pp-metric" };
const _hoisted_178 = { class: "pp-metric__value" };


const _sfc_main = {
  __name: 'CustomerDetail',
  setup(__props) {

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore = useSnapshotStore();

const api = axios.create({ baseURL: API_BASE_URL, timeout: 20000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const STATE_COLORS = {
  NEW: '#16a34a',
  ACTIVE: '#16a34a',
  GROWING: '#16a34a',
  AT_RISK: '#7f1d1d',
  DORMANT: '#7f1d1d',
  CHURNED: '#7f1d1d',
};
const LIFECYCLE_ORDER = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED'];

// Inline StatePill (the previously-imported StateBadge component no longer exists)
const StatePill = defineComponent({
  props: { state: { type: String, default: '—' }, size: { type: String, default: 'md' } },
  setup(props) {
    return () => h('span', {
      class: [
        'inline-flex items-center rounded-full font-bold uppercase tracking-wide',
        props.size === 'lg' ? 'px-4 py-1.5 text-xs' : 'px-2.5 py-0.5 text-[11px]',
      ],
      style: {
        background: '#ffffff',
        color: STATE_COLORS[props.state] || '#7f1d1d',
        border: '1px solid #e5e7eb',
      },
    }, (props.state || '—').replace('_', ' '))
  },
});

// Inline info tooltip (title attribute)
const InfoDot = defineComponent({
  props: { label: { type: String, default: '' } },
  setup(props) {
    return () => h('span', { class: 'text-gray-500 cursor-help', title: props.label }, h('svg', {
      class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24',
    }, [h('circle', { cx: '12', cy: '12', r: '9', 'stroke-width': '2' }), h('path', { d: 'M12 16v-4m0-4h.01', 'stroke-linecap': 'round', 'stroke-width': '2' })]))
  },
});

const loading = ref(true);
const showCampaignModal = ref(false);
const showOverrideDialog = ref(false);
const showMoreMenu = ref(false);
const overrideReason = ref('');
const overrideOffer = ref('Fee Waiver (3 months)');
const reasonCodes = ref([]);
const recommendations = ref([]);

const customerId = computed(() => String(route.params.id || ''));
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer);

const customer = computed(() => customerStore.selectedCustomer || {});

const state = computed(() => customer.value.state || customer.value._raw?.state || '—');
const previousState = computed(() => customer.value.previousState || customer.value._raw?.previous_state || null);

const healthScore = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  if (h?.health_score != null) return h.health_score
  return customer.value.healthScore ?? null
});

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  const c = customer.value._raw?.component_scores;
  return h?.component_scores || c || {}
});

const churnProb = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'number' ? p : p?.churn_probability ?? null
});

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'object' ? p?.clv_percentile ?? null : null
});

/** Absolute predicted 12-month CLV (ZMW) — the money value. */
const clvValue = computed(() => predictionStore.getClv(customerId.value));

/** Its rank within the cohort, shown as a secondary hint only. */
const clvPercentileOrdinal = computed(() => {
  const pct = clvPercentile.value;
  if (pct == null) return null
  const n = Math.round(pct * 100);
  const mod100 = n % 100;
  const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th');
  return `${n}${suffix}`
});

// ── Forward lifecycle-stage forecast (14/30/90d models) ──────────
// Model-only and forward-looking: the state shown above the fold is the rule
// engine's *current* stage, these are predictions of where it goes next.
const HORIZONS = ['14', '30', '90'];
const horizonForecast = computed(() => predictionStore.getLifecycleForecast(customerId.value));

/** Second-most-likely stage for a horizon, so a 51% call doesn't read as certain. */
function runnerUp(horizon) {
  const probs = horizonForecast.value?.[horizon]?.probabilities;
  if (!probs) return null
  const ranked = Object.entries(probs).sort((a, b) => b[1] - a[1]);
  return ranked.length > 1 ? { stage: ranked[1][0], prob: ranked[1][1] } : null
}

const featureSnapshot = computed(() => customerStore.features);

const healthLabel = computed(() => {
  const s = healthScore.value;
  if (s == null) return '—'
  if (s < 25) return 'Critical'
  if (s < 50) return 'At Risk'
  if (s < 70) return 'Moderate'
  return 'Healthy'
});

const healthColor = computed(() => {
  const s = healthScore.value;
  if (s == null) return '#857371'
  if (s < 25) return '#7f1d1d'
  if (s < 50) return '#7f1d1d'
  if (s < 70) return '#16a34a'
  return '#16a34a'
});

const churnLabel = computed(() => {
  const p = churnProb.value;
  if (p == null) return '—'
  if (p < 0.2) return 'Low Risk'
  if (p < 0.5) return 'Moderate Risk'
  return 'High Risk'
});

const churnColor = computed(() => {
  const p = churnProb.value;
  if (p == null) return '#857371'
  if (p < 0.2) return '#16a34a'
  if (p < 0.5) return '#16a34a'
  return '#7f1d1d'
});

const timelineEntries = computed(() => {
  const raw = customerStore.timeline;
  if (Array.isArray(raw)) return raw
  return raw?.timeline || []
});

const transitions = computed(() => {
  const raw = customerStore.timeline;
  if (Array.isArray(raw)) return []
  return raw?.transitions || []
});

const customerSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
  return fmtDate(sorted[0].as_of_date)
});

const stateSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  // Most recent entry date for the current state
  const current = entries.filter(e => e.state === state.value);
  if (current.length) return fmtDate(current[current.length - 1].as_of_date)
  return fmtDate(entries[entries.length - 1].as_of_date)
});

const computedAt = computed(() => {
  const raw = customer.value._raw?.computed_at || customer.value.computedAt;
  if (!raw) return null
  try { return new Date(raw).toLocaleString() } catch { return raw }
});

const lastActivity = computed(() => {
  const f = featureSnapshot.value;
  if (f?.days_since_last_txn != null) return `${f.days_since_last_txn} days ago`
  // Fall back to a reason code detail if present
  const rc = reasonCodes.value.find(r => r.code === 'INACTIVE_EXTENDED');
  if (rc?.detail?.days_since_last_txn != null) return `${rc.detail.days_since_last_txn} days ago`
  return '—'
});

const statePct = computed(() => {
  const p = customerStore.portfolio;
  const map = { DORMANT: p.dormantPct, AT_RISK: p.atRiskPct, CHURNED: p.churnedPct, ACTIVE: p.activePct };
  return map[state.value] != null ? map[state.value] : null
});

const currentStateIndex = computed(() => LIFECYCLE_ORDER.indexOf(state.value));

const markovStates = computed(() => predictionStore.markovMatrix?.states || []);
const markovMatrix = computed(() => predictionStore.markovMatrix?.matrix || []);

const predictedNextState = computed(() => {
  const states = markovStates.value;
  const matrix = markovMatrix.value;
  const idx = states.indexOf(state.value);
  if (idx < 0 || !matrix[idx] || !matrix[idx].length) return null
  const row = matrix[idx];
  const maxVal = Math.max(...row);
  const maxIdx = row.indexOf(maxVal);
  return { state: states[maxIdx] || '—', probability: maxVal }
});

const healthFactors = computed(() => {
  const c = components.value;
  return [
    { key: 'churn_risk_sub', label: 'Churn Risk', good: false, value: c.churn_risk_sub ?? null },
    { key: 'clv_percentile_sub', label: 'Customer Value (CLV)', good: true, value: c.clv_percentile_sub ?? null },
    { key: 'behaviour_sub', label: 'Behavioural Engagement', good: true, value: c.behaviour_sub ?? null },
  ]
});

const behaviourFactors = computed(() => {
  const f = featureSnapshot.value || {};
  return [
    { label: 'Recency', unit: 'days', evidence: f.days_since_last_txn != null ? `${f.days_since_last_txn} days since last transaction` : null, value: f.days_since_last_txn, max: 180, invert: true },
    { label: 'Transaction Frequency (90d)', unit: 'txns', evidence: f.txn_count_90d != null ? `${f.txn_count_90d} transactions in last 90 days` : null, value: f.txn_count_90d, max: 30, invert: false },
    { label: 'Transaction Frequency (180d)', unit: 'txns', evidence: f.txn_count_180d != null ? `${f.txn_count_180d} transactions in last 180 days` : null, value: f.txn_count_180d, max: 60, invert: false },
    { label: 'Total Value (90d)', unit: 'ZMW', evidence: f.total_amount_90d != null ? `${Math.round(f.total_amount_90d).toLocaleString()} ZMW in last 90 days` : null, value: f.total_amount_90d, max: 500000, invert: false },
    { label: 'Engagement Score', unit: 'pts', evidence: f.engagement_score != null ? `Engagement ${f.engagement_score} / 100` : null, value: f.engagement_score, max: 100, invert: false },
    { label: 'Distinct Channels (90d)', unit: 'channels', evidence: f.distinct_channels_90d != null ? `${f.distinct_channels_90d} channels used` : null, value: f.distinct_channels_90d, max: 6, invert: false },
  ]
});

const riskCodes = computed(() => reasonCodes.value.filter(r => r.category === 'RISK'));
const opportunityCodes = computed(() => reasonCodes.value.filter(r => r.category === 'OPPORTUNITY'));
const alertCodes = computed(() => reasonCodes.value.filter(r => r.severity === 'HIGH'));

const clvEvidence = computed(() => {
  const f = featureSnapshot.value || {};
  const parts = [];
  if (f.total_amount_90d != null) parts.push(`90-day value: ${Math.round(f.total_amount_90d).toLocaleString()} ZMW`);
  if (f.avg_amount_90d != null) parts.push(`Avg transaction: ${Math.round(f.avg_amount_90d).toLocaleString()} ZMW`);
  if (f.txn_count_90d != null) parts.push(`${f.txn_count_90d} txns / 90d`);
  if (f.has_salary_credit != null && f.has_salary_credit) parts.push('Salary credit detected');
  if (f.customer_tenure_days != null) parts.push(`Tenure: ${Math.round(f.customer_tenure_days / 30)} months`);
  return parts
});

const actionPlan = computed(() => {
  const recs = recommendations.value;
  if (recs.length) {
    return recs.map((r, i) => ({
      priority: i + 1,
      title: r.product_name || r.campaign_name || 'Review Required',
      reason: r.campaign_name ? `Campaign: ${r.campaign_name}` : 'Identified opportunity',
      action: r.is_upsell ? `Upsell to ${r.product_name}` : `Offer ${r.product_name || 'a suitable product'}`,
      confidence: Math.round((r.propensity_score || 0) * 100),
    }))
  }
  // Fallback actions derived from the customer's actual state
  const fallback = [];
  if (state.value === 'DORMANT') fallback.push({ priority: 1, title: 'Re-engage Customer', reason: 'Customer has been inactive for an extended period.', action: 'Contact the customer and identify the reason for inactivity.', confidence: 0 });
  if (state.value === 'AT_RISK') fallback.push({ priority: 1, title: 'Retain Customer', reason: 'Customer is showing early signs of disengagement.', action: 'Assign account manager for proactive follow-up.', confidence: 0 });
  if (clvPercentile.value != null && clvPercentile.value > 0.6) fallback.push({ priority: fallback.length + 1, title: 'Review Customer Value', reason: 'Customer historically generated significant value.', action: 'Assign account manager for proactive follow-up.', confidence: 0 });
  return fallback
});

const modelVersion = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  return h?.model_versions?.churn || predictionStore.predictions[customerId.value]?.model_version || 'churn_v1'
});

const modelConfidence = computed(() => {
  const c = dataCompleteness.value;
  if (!c) return '—'
  return Math.round(c.populated / c.total * 100) + '%'
});

const dataCompleteness = computed(() => {
  const f = featureSnapshot.value;
  if (!f || typeof f !== 'object') return null
  const keys = Object.keys(f).filter(k => !['customer_id', 'as_of_date', 'computed_at'].includes(k));
  const populated = keys.filter(k => f[k] != null && f[k] !== '').length;
  return { populated, total: keys.length }
});

const dataUsed = computed(() => {
  const f = featureSnapshot.value || {};
  const groups = [
    { name: 'Transactions', fields: ['txn_count_30d', 'txn_count_90d', 'txn_count_180d', 'txn_count_365d', 'avg_days_between_txn'] },
    { name: 'Revenue', fields: ['total_amount_90d', 'avg_amount_90d', 'total_amount_180d', 'amount_growth_ratio', 'credit_sum_30d', 'debit_sum_30d'] },
    { name: 'Recency', fields: ['days_since_last_txn', 'days_since_first_txn', 'inactivity_streak_days', 'behav_recency_score'] },
    { name: 'Engagement', fields: ['engagement_score', 'eng_login_count_30d', 'eng_login_count_7d', 'behav_active_days_90d', 'behav_activity_consistency'] },
    { name: 'Purchase frequency', fields: ['behav_txn_count_7d', 'behav_frequency_score', 'txn_frequency_trend'] },
    { name: 'Customer tenure', fields: ['customer_tenure_days', 'customer_segment', 'age_years'] },
    { name: 'Payment history', fields: ['has_salary_credit', 'monthly_income_estimate', 'credit_to_debit_ratio_90d', 'fin_salary_consistency'] },
    { name: 'Lifecycle history', fields: ['rel_customer_status'] },
  ];
  return groups.map(g => {
    const populated = g.fields.filter(k => f[k] != null && f[k] !== '').length;
    return { name: g.name, available: `${populated} of ${g.fields.length} data points available` }
  })
});

const initials = computed(() => {
  const name = customer.value.fullName || customerId.value;
  return name.replace('CUST', 'C').replace('Customer ', '').slice(0, 2).toUpperCase() || 'CU'
});

function severityColor(sev) {
  if (sev === 'HIGH') return '#7f1d1d'
  if (sev === 'MEDIUM') return '#16a34a'
  return '#16a34a'
}

function codeLabel(code) {
  return String(code || '').replace(/_/g, ' ')
}

function detailText(detail) {
  if (!detail || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return d }
}

function behaviourBarWidth(b) {
  if (b.value == null) return 0
  if (b.invert) {
    // Recency: lower (more recent) is better → invert the bar
    const pct = Math.max(0, 100 - (b.value / b.max) * 100);
    return Math.min(100, pct)
  }
  return Math.min(100, (b.value / b.max) * 100)
}

function goBack() {
  if (route.query.from === 'ledger') {
    router.push({ path: '/dashboard/portfolio', query: { page: route.query.page || 1 } });
  } else {
    router.back();
  }
}

function goToActionPlan() {
  router.push({
    path: `/dashboard/customer/${customerId.value}/action-plan`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  });
}

function goToTakeAction(a) {
  router.push({
    path: `/dashboard/customer/${customerId.value}/take-action`,
    query: {
      action: JSON.stringify(a),
      from: route.query.from || undefined,
      page: route.query.page || undefined,
    },
  });
}

function exportProfile() {
  const payload = {
    customer_id: customerId.value,
    name: customer.value.fullName || null,
    state: state.value,
    health_score: healthScore.value,
    churn_probability: churnProb.value,
    clv_percentile: clvPercentile.value,
    reason_codes: reasonCodes.value,
    recommendations: recommendations.value,
    features: featureSnapshot.value || {},
    exported_at: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customerId.value || 'customer'}-profile.json`;
  a.click();
  URL.revokeObjectURL(url);
  notify(`Profile exported for ${customerId.value}`, 'success', { autoClose: 2500 });
  showMoreMenu.value = false;
}

async function copyCustomerId() {
  try {
    await navigator.clipboard.writeText(customerId.value);
    notify(`Customer ID ${customerId.value} copied`, 'success', { autoClose: 2000 });
  } catch {
    notify('Could not copy — clipboard unavailable', 'error', { autoClose: 2500 });
  }
  showMoreMenu.value = false;
}

// ── Override dialog ──────────────────────────────────────────────────────────
const overrideOptions = [
  'Fee Waiver (3 months)',
  'Rate Review on Home Loan',
  'Digital Reactivation SMS',
  'RM Courtesy Call',
  'No Action — Escalate to Branch',
];

const activeOverride = ref(null);

function openOverrideDialog() {
  showOverrideDialog.value = true;
  showMoreMenu.value = false;
}

function doOverride() {
  if (!overrideReason.value.trim()) {
    notify('Please add a reason for the override', 'error', { autoClose: 2500 });
    return
  }
  activeOverride.value = overrideRecommendation(customerId.value, 'AI Prescribed Intervention', overrideOffer.value, overrideReason.value.trim());
  showOverrideDialog.value = false;
  overrideReason.value = '';
  notify(`Override applied — ${overrideOffer.value}`, 'success', { autoClose: 3000 });
}

function resetOverride() {
  activeOverride.value = null;
  showOverrideDialog.value = false;
  overrideReason.value = '';
  notify('Override removed — AI recommendation restored', 'info', { autoClose: 2500 });
}

onMounted(async () => {
  loading.value = true;
  const id = customerId.value;
  if (!id) { loading.value = false; return }

  // Pull any server-persisted state first (other pilot viewers / browsers),
  // then rehydrate a prior override for this customer, if any.
  await hydrateStateFromServer(id);
  activeOverride.value = getOverride(id);

  // Fire and forget the NBA generation so it doesn't block page load
  customerStore.fetchNextBestAction(id);

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchPortfolio(),
  ]);
  await Promise.allSettled([
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    predictionStore.fetchMarkovMatrix(),
  ]);
  loading.value = false;

  // Background: structured reason codes + recommendations
  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: snapshotStore.asOfDate }, timeout: 30000 });
        reasonCodes.value = data.reason_codes || [];
      } catch (e) { console.warn('reason-codes failed:', e.message); reasonCodes.value = []; }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: snapshotStore.asOfDate }, timeout: 30000 });
        recommendations.value = data.recommendations || [];
      } catch (e) { console.warn('recommendations failed:', e.message); recommendations.value = []; }
    })(),
  ]);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[90] || (_cache[90] = createBaseVNode("div", { class: "fixed inset-0 z-0 mesh-background pointer-events-none" }, null, -1)),
    createBaseVNode("div", _hoisted_2, [
      (loading.value)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            _cache[10] || (_cache[10] = createBaseVNode("div", { class: "mb-6 h-6 bg-white rounded-sm w-1/3 animate-pulse" }, null, -1)),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createVNode(_sfc_main$5, { type: "block" })
              ]),
              createBaseVNode("div", _hoisted_5, [
                createVNode(_sfc_main$5, { type: "block" })
              ])
            ]),
            createBaseVNode("div", _hoisted_6, [
              (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                return createVNode(_sfc_main$5, {
                  key: i,
                  type: "card"
                })
              }), 64))
            ]),
            createVNode(_sfc_main$5, { type: "block" })
          ], 64))
        : (!customerId.value || isEmpty.value)
          ? (openBlock(), createElementBlock("div", _hoisted_7, [
              _cache[11] || (_cache[11] = createStaticVNode("<div class=\"w-16 h-16 bg-amber-100 rounded-none flex items-center justify-center mb-4 border border-amber-200\" data-v-a1b06b68><svg class=\"w-8 h-8 text-amber-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" data-v-a1b06b68><path d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" data-v-a1b06b68></path></svg></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-absa-enrich mb-2\" data-v-a1b06b68>Customer Not Found</h2><p class=\"text-xs text-gray-500 max-w-md\" data-v-a1b06b68>No predictive profile is available for this customer.</p>", 3)),
              createBaseVNode("button", {
                onClick: goBack,
                class: "mt-6 bg-absa-passion text-white text-[10px] font-mono font-bold py-2.5 px-5 rounded-none uppercase tracking-widest hover:bg-absa-power transition-colors"
              }, "Back to Predictive Lifecycle Ledger")
            ]))
          : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("button", {
                  onClick: goBack,
                  class: "flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion hover:text-absa-power transition-colors"
                }, [...(_cache[12] || (_cache[12] = [
                  createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      d: "M15 19l-7-7 7-7",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2.5"
                    })
                  ], -1),
                  createTextVNode(" Back to Predictive Lifecycle Ledger ", -1)
                ]))]),
                createBaseVNode("div", _hoisted_9, [
                  _cache[13] || (_cache[13] = createBaseVNode("span", null, "Dashboard", -1)),
                  _cache[14] || (_cache[14] = createBaseVNode("span", null, "/", -1)),
                  _cache[15] || (_cache[15] = createBaseVNode("span", null, "Portfolio", -1)),
                  _cache[16] || (_cache[16] = createBaseVNode("span", null, "/", -1)),
                  _cache[17] || (_cache[17] = createBaseVNode("span", null, "Predictive Lifecycle Ledger", -1)),
                  _cache[18] || (_cache[18] = createBaseVNode("span", null, "/", -1)),
                  createBaseVNode("span", _hoisted_10, toDisplayString(customerId.value), 1)
                ])
              ]),
              (activeOverride.value)
                ? (openBlock(), createElementBlock("div", _hoisted_11, [
                    _cache[19] || (_cache[19] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "edit", -1)),
                    _cache[20] || (_cache[20] = createBaseVNode("span", { class: "font-bold" }, "Override active:", -1)),
                    createBaseVNode("span", null, toDisplayString(activeOverride.value.toOffer), 1),
                    createBaseVNode("span", _hoisted_12, "— " + toDisplayString(activeOverride.value.reason), 1),
                    createBaseVNode("button", {
                      onClick: resetOverride,
                      class: "ml-auto text-[11px] font-bold underline hover:text-absa-energy"
                    }, "Undo override")
                  ]))
                : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                "nba-override": unref(customerStore).currentNba,
                "churn-prob": churnProb.value,
                "customer-id": customerId.value,
                onExecute: _cache[0] || (_cache[0] = $event => (showCampaignModal.value = true)),
                onOverride: openOverrideDialog
              }, null, 8, ["nba-override", "churn-prob", "customer-id"]),
              (customerId.value)
                ? (openBlock(), createBlock(AiNarrationPanel, {
                    key: 1,
                    class: "mt-3",
                    "customer-id": customerId.value
                  }, null, 8, ["customer-id"]))
                : createCommentVNode("", true),
              (showOverrideDialog.value)
                ? (openBlock(), createElementBlock("div", _hoisted_13, [
                    createBaseVNode("div", {
                      class: "absolute inset-0 bg-black/40",
                      onClick: _cache[1] || (_cache[1] = $event => (showOverrideDialog.value = false))
                    }),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", null, [
                          _cache[21] || (_cache[21] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Override AI Recommendation", -1)),
                          createBaseVNode("p", _hoisted_16, "RM discretion overrides the prescribed intervention for " + toDisplayString(customerId.value), 1)
                        ]),
                        createBaseVNode("button", {
                          onClick: _cache[2] || (_cache[2] = $event => (showOverrideDialog.value = false)),
                          class: "text-gray-400 hover:text-gray-600"
                        }, [...(_cache[22] || (_cache[22] = [
                          createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
                        ]))])
                      ]),
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("div", null, [
                          _cache[23] || (_cache[23] = createBaseVNode("label", { class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5" }, "Alternative Action", -1)),
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((overrideOffer).value = $event)),
                            class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion"
                          }, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(overrideOptions, (opt) => {
                              return createBaseVNode("option", {
                                key: opt,
                                value: opt
                              }, toDisplayString(opt), 9, _hoisted_18)
                            }), 64))
                          ], 512), [
                            [vModelSelect, overrideOffer.value]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          _cache[24] || (_cache[24] = createBaseVNode("label", { class: "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5" }, "Reason for override", -1)),
                          withDirectives(createBaseVNode("textarea", {
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((overrideReason).value = $event)),
                            rows: "3",
                            placeholder: "e.g. Customer is a high-value HNI with a personal relationship — RM will contact directly.",
                            class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion resize-none"
                          }, null, 512), [
                            [vModelText, overrideReason.value]
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("button", {
                            onClick: _cache[5] || (_cache[5] = $event => (showOverrideDialog.value = false)),
                            class: "px-4 py-2 border border-gray-300 text-xs font-bold text-absa-enrich rounded-sm hover:bg-gray-50"
                          }, "Cancel"),
                          createBaseVNode("button", {
                            onClick: doOverride,
                            class: "px-4 py-2 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power"
                          }, "APPLY OVERRIDE")
                        ])
                      ])
                    ])
                  ]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_20, [
                _cache[35] || (_cache[35] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("div", {
                      class: "w-14 h-14 rounded-none flex items-center justify-center text-white text-xl font-bold shrink-0 border border-white/20",
                      style: normalizeStyle({ background: STATE_COLORS[state.value] || '#7f1d1d' })
                    }, toDisplayString(initials.value), 5),
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("h1", _hoisted_24, toDisplayString(customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', ''))), 1),
                        createVNode(unref(StatePill), { state: state.value }, null, 8, ["state"])
                      ]),
                      createBaseVNode("p", _hoisted_25, "ID: " + toDisplayString(customerId.value), 1),
                      createBaseVNode("div", _hoisted_26, [
                        createBaseVNode("div", null, [
                          _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "Customer Since", -1)),
                          createBaseVNode("span", _hoisted_27, toDisplayString(customerSince.value || '—'), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[26] || (_cache[26] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "Last Activity", -1)),
                          createBaseVNode("span", _hoisted_28, toDisplayString(lastActivity.value), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "Last Snapshot", -1)),
                          createBaseVNode("span", _hoisted_29, toDisplayString(computedAt.value || '—'), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _cache[28] || (_cache[28] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "State Since", -1)),
                          createBaseVNode("span", _hoisted_30, toDisplayString(stateSince.value || '—'), 1)
                        ]),
                        (customer.value.branch)
                          ? (openBlock(), createElementBlock("div", _hoisted_31, [
                              _cache[29] || (_cache[29] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "Branch", -1)),
                              createBaseVNode("span", _hoisted_32, toDisplayString(customer.value.branch), 1)
                            ]))
                          : createCommentVNode("", true),
                        createBaseVNode("div", null, [
                          _cache[30] || (_cache[30] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 block" }, "Market Segment", -1)),
                          createBaseVNode("span", _hoisted_33, toDisplayString(customer.value.segment), 1)
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("button", {
                      onClick: goToActionPlan,
                      class: "bg-absa-passion text-white text-[10px] font-mono font-bold py-2.5 px-4 rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors"
                    }, "Create Action Plan"),
                    createBaseVNode("div", _hoisted_35, [
                      createBaseVNode("button", {
                        onClick: _cache[6] || (_cache[6] = $event => (showMoreMenu.value = !showMoreMenu.value)),
                        class: "border border-gray-300 text-absa-enrich text-[10px] font-mono font-bold py-2.5 px-4 rounded-none uppercase tracking-widest hover:bg-gray-50 hover:border-absa-passion hover:text-absa-passion transition-colors flex items-center gap-1"
                      }, [...(_cache[31] || (_cache[31] = [
                        createTextVNode(" More ", -1),
                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "expand_more", -1)
                      ]))]),
                      (showMoreMenu.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_36, [
                            createBaseVNode("button", {
                              onClick: _cache[7] || (_cache[7] = $event => (exportProfile())),
                              class: "w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-enrich hover:bg-gray-50 flex items-center gap-2"
                            }, [...(_cache[32] || (_cache[32] = [
                              createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-gray-400" }, "download", -1),
                              createTextVNode(" Export Profile (JSON) ", -1)
                            ]))]),
                            createBaseVNode("button", {
                              onClick: _cache[8] || (_cache[8] = $event => (goToTakeAction(actionPlan.value[0]))),
                              class: "w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-enrich hover:bg-gray-50 flex items-center gap-2"
                            }, [...(_cache[33] || (_cache[33] = [
                              createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-gray-400" }, "flash_on", -1),
                              createTextVNode(" Take Action ", -1)
                            ]))]),
                            createBaseVNode("button", {
                              onClick: copyCustomerId,
                              class: "w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-enrich hover:bg-gray-50 flex items-center gap-2"
                            }, [...(_cache[34] || (_cache[34] = [
                              createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-gray-400" }, "content_copy", -1),
                              createTextVNode(" Copy Customer ID ", -1)
                            ]))])
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_37, [
                createBaseVNode("div", _hoisted_38, [
                  createBaseVNode("div", _hoisted_39, [
                    _cache[36] || (_cache[36] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Customer Health", -1)),
                    createVNode(unref(InfoDot), { label: 'Combined health score from churn risk, customer value and behavioural engagement.' })
                  ]),
                  createBaseVNode("div", _hoisted_40, [
                    createBaseVNode("span", _hoisted_41, toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) : '—'), 1),
                    _cache[37] || (_cache[37] = createBaseVNode("span", { class: "text-xs text-gray-500" }, "/ 100", -1))
                  ]),
                  createBaseVNode("div", _hoisted_42, [
                    createBaseVNode("div", {
                      class: "pp-fill",
                      style: normalizeStyle({ width: (healthScore.value || 0) + '%', background: healthColor.value })
                    }, null, 4)
                  ]),
                  createBaseVNode("p", {
                    class: "text-xs font-bold mt-2",
                    style: normalizeStyle({ color: healthColor.value })
                  }, toDisplayString(healthLabel.value), 5)
                ]),
                createBaseVNode("div", _hoisted_43, [
                  createBaseVNode("div", _hoisted_44, [
                    _cache[38] || (_cache[38] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Churn Probability", -1)),
                    createVNode(unref(InfoDot), { label: 'Probability the customer will churn within the prediction horizon, from the XGBoost churn model.' })
                  ]),
                  createBaseVNode("span", _hoisted_45, toDisplayString(churnProb.value != null ? Math.round(churnProb.value * 100) + '%' : '—'), 1),
                  createBaseVNode("p", {
                    class: "text-xs font-bold mt-2",
                    style: normalizeStyle({ color: churnColor.value })
                  }, toDisplayString(churnLabel.value), 5),
                  _cache[39] || (_cache[39] = createBaseVNode("a", {
                    href: "#why-predictions",
                    class: "text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion hover:text-absa-power mt-2 inline-block"
                  }, "Why?", -1))
                ]),
                createBaseVNode("div", _hoisted_46, [
                  createBaseVNode("div", _hoisted_47, [
                    _cache[40] || (_cache[40] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Customer Lifetime Value", -1)),
                    createVNode(unref(InfoDot), { label: 'Predicted 12-month net revenue in ZMW, from the CLV LightGBM model — an estimate, not guaranteed future revenue.' })
                  ]),
                  createBaseVNode("span", _hoisted_48, toDisplayString(clvValue.value != null ? unref(formatCurrency)(clvValue.value) : '—'), 1),
                  createBaseVNode("p", _hoisted_49, [
                    _cache[41] || (_cache[41] = createTextVNode(" Predicted 12-month net revenue ", -1)),
                    (clvPercentileOrdinal.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_50, " · " + toDisplayString(clvPercentileOrdinal.value) + " percentile", 1))
                      : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_51, [
                  _cache[42] || (_cache[42] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-3" }, "Lifecycle State", -1)),
                  createVNode(unref(StatePill), {
                    state: state.value,
                    size: "lg"
                  }, null, 8, ["state"]),
                  (statePct.value != null)
                    ? (openBlock(), createElementBlock("p", _hoisted_52, toDisplayString(statePct.value) + "% of portfolio customers are currently " + toDisplayString(state.value.toLowerCase().replace('_', ' ')), 1))
                    : (openBlock(), createElementBlock("p", _hoisted_53, "Current predictive lifecycle classification"))
                ])
              ]),
              createBaseVNode("div", _hoisted_54, [
                _cache[49] || (_cache[49] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative mb-4\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Why These Predictions?</h2></div><p class=\"text-xs text-gray-500 ml-3\" data-v-a1b06b68>Explanation of the customer&#39;s current lifecycle position</p></div>", 2)),
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("div", _hoisted_56, [
                    createBaseVNode("h3", _hoisted_57, "Customer Health Score — " + toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) + ' / 100' : '—'), 1),
                    createBaseVNode("div", _hoisted_58, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(healthFactors.value, (f) => {
                        return (openBlock(), createElementBlock("div", {
                          key: f.key,
                          class: "flex items-center gap-3"
                        }, [
                          createBaseVNode("span", {
                            class: "w-2.5 h-2.5 rounded-none shrink-0",
                            style: normalizeStyle({ background: f.good ? '#16a34a' : '#7f1d1d' })
                          }, null, 4),
                          createBaseVNode("span", _hoisted_59, toDisplayString(f.label), 1),
                          createBaseVNode("div", _hoisted_60, [
                            createBaseVNode("div", {
                              class: "pp-fill rounded-none",
                              style: normalizeStyle({ width: (f.value || 0) + '%', background: f.good ? '#16a34a' : '#7f1d1d' })
                            }, null, 4)
                          ]),
                          createBaseVNode("span", _hoisted_61, toDisplayString(f.value != null ? f.value.toFixed(0) : '—'), 1)
                        ]))
                      }), 128)),
                      _cache[43] || (_cache[43] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest pt-1" }, "Components: Churn risk, CLV, engagement", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_62, [
                    createBaseVNode("h3", _hoisted_63, "What is driving churn? — " + toDisplayString(churnProb.value != null ? Math.round(churnProb.value * 100) + '%' : '—'), 1),
                    (riskCodes.value.length)
                      ? (openBlock(), createElementBlock("div", _hoisted_64, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(riskCodes.value, (r) => {
                            return (openBlock(), createElementBlock("div", {
                              key: r.code,
                              class: "flex items-start gap-3"
                            }, [
                              createBaseVNode("span", {
                                class: "w-2.5 h-2.5 rounded-none shrink-0 mt-1.5",
                                style: normalizeStyle({ background: severityColor(r.severity) })
                              }, null, 4),
                              createBaseVNode("div", null, [
                                createBaseVNode("div", _hoisted_65, toDisplayString(codeLabel(r.code)), 1),
                                createBaseVNode("div", _hoisted_66, toDisplayString(detailText(r.detail)), 1)
                              ]),
                              createBaseVNode("span", {
                                class: "ml-auto text-[10px] font-mono font-bold tracking-widest uppercase",
                                style: normalizeStyle({ color: severityColor(r.severity) })
                              }, toDisplayString(r.severity), 5)
                            ]))
                          }), 128))
                        ]))
                      : (openBlock(), createElementBlock("p", _hoisted_67, "No churn risk signals flagged."))
                  ])
                ]),
                createBaseVNode("div", _hoisted_68, [
                  _cache[48] || (_cache[48] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2" }, "How was CLV estimated?", -1)),
                  createBaseVNode("p", _hoisted_69, [
                    _cache[44] || (_cache[44] = createTextVNode(" Predicted CLV is an ", -1)),
                    _cache[45] || (_cache[45] = createBaseVNode("strong", { class: "text-gray-900" }, "absolute", -1)),
                    _cache[46] || (_cache[46] = createTextVNode(" figure — ", -1)),
                    createBaseVNode("strong", _hoisted_70, toDisplayString(clvValue.value != null ? unref(formatCurrency)(clvValue.value) : '—'), 1),
                    _cache[47] || (_cache[47] = createTextVNode(" of 12-month net revenue in ZMW. ", -1)),
                    (clvPercentileOrdinal.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_71, "That ranks at the " + toDisplayString(clvPercentileOrdinal.value) + " percentile.", 1))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("p", _hoisted_72, toDisplayString(clvEvidence.value.length ? clvEvidence.value.join(' · ') : 'No historical data'), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_73, [
                _cache[57] || (_cache[57] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 mb-5\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Customer Lifecycle Journey</h2></div></div>", 2)),
                createBaseVNode("div", _hoisted_74, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(LIFECYCLE_ORDER, (s, i) => {
                    return createBaseVNode("div", {
                      key: s,
                      class: "flex items-center gap-2"
                    }, [
                      createBaseVNode("div", {
                        class: normalizeClass(['flex items-center gap-2 px-3 py-1.5 rounded-none border-2 text-[10px] font-mono font-bold uppercase tracking-widest', i === currentStateIndex.value ? 'pp-current-state' : 'border-gray-200 bg-white']),
                        style: normalizeStyle(i === currentStateIndex.value ? { borderColor: STATE_COLORS[s], color: STATE_COLORS[s] } : { color: '#857371' })
                      }, [
                        createBaseVNode("span", {
                          class: "w-2 h-2 rounded-none",
                          style: normalizeStyle({ background: STATE_COLORS[s] })
                        }, null, 4),
                        createTextVNode(" " + toDisplayString(s.replace('_', ' ')), 1)
                      ], 6),
                      (i < LIFECYCLE_ORDER.length - 1)
                        ? (openBlock(), createElementBlock("svg", _hoisted_75, [...(_cache[50] || (_cache[50] = [
                            createBaseVNode("path", {
                              d: "M5 12h14m-7-7l7 7-7 7",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2"
                            }, null, -1)
                          ]))]))
                        : createCommentVNode("", true)
                    ])
                  }), 64))
                ]),
                createBaseVNode("div", _hoisted_76, [
                  createBaseVNode("div", _hoisted_77, [
                    _cache[51] || (_cache[51] = createBaseVNode("span", { class: "pp-metric__label" }, "Date entered current state", -1)),
                    createBaseVNode("span", _hoisted_78, toDisplayString(stateSince.value || '—'), 1)
                  ]),
                  createBaseVNode("div", _hoisted_79, [
                    _cache[52] || (_cache[52] = createBaseVNode("span", { class: "pp-metric__label" }, "Previous state", -1)),
                    createBaseVNode("span", _hoisted_80, toDisplayString(previousState.value || '—'), 1)
                  ]),
                  createBaseVNode("div", _hoisted_81, [
                    _cache[53] || (_cache[53] = createBaseVNode("span", { class: "pp-metric__label" }, "State transitions", -1)),
                    createBaseVNode("span", _hoisted_82, toDisplayString(transitions.value.length || (timelineEntries.value.length ? timelineEntries.value.length - 1 : 0)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_83, [
                    _cache[54] || (_cache[54] = createBaseVNode("span", { class: "pp-metric__label" }, "Next state (Markov)", -1)),
                    createBaseVNode("span", _hoisted_84, toDisplayString(predictedNextState.value ? predictedNextState.value.state.replace('_', ' ') : '—'), 1),
                    (predictedNextState.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_85, toDisplayString(Math.round(predictedNextState.value.probability * 100)) + "% from observed transitions", 1))
                      : createCommentVNode("", true)
                  ])
                ]),
                (horizonForecast.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_86, [
                      _cache[56] || (_cache[56] = createBaseVNode("div", { class: "flex items-center justify-between mb-3" }, [
                        createBaseVNode("h3", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Stage forecast by horizon"),
                        createBaseVNode("span", { class: "text-[10px] text-gray-400" }, "Lifecycle models · predictions")
                      ], -1)),
                      createBaseVNode("div", _hoisted_87, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(HORIZONS, (h) => {
                          return createBaseVNode("div", {
                            key: h,
                            class: "border border-gray-200 rounded-none p-4 bg-gray-50/40"
                          }, [
                            createBaseVNode("p", _hoisted_88, toDisplayString(h) + "-day", 1),
                            (horizonForecast.value[h]?.stage)
                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                  createVNode(unref(StatePill), {
                                    state: horizonForecast.value[h].stage
                                  }, null, 8, ["state"]),
                                  createBaseVNode("p", _hoisted_89, toDisplayString(Math.round(horizonForecast.value[h].confidence * 100)) + "%", 1),
                                  _cache[55] || (_cache[55] = createBaseVNode("p", { class: "text-[10px] text-gray-400 uppercase tracking-widest font-mono" }, "confidence", -1)),
                                  (runnerUp(h))
                                    ? (openBlock(), createElementBlock("p", _hoisted_90, " vs " + toDisplayString(runnerUp(h).stage) + " " + toDisplayString(Math.round(runnerUp(h).prob * 100)) + "% ", 1))
                                    : createCommentVNode("", true)
                                ], 64))
                              : (openBlock(), createElementBlock("p", _hoisted_91, "Not available"))
                          ])
                        }), 64))
                      ])
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_92, [
                _cache[59] || (_cache[59] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 mb-5\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Customer Activity Timeline</h2></div></div>", 2)),
                (timelineEntries.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_93, [
                      _cache[58] || (_cache[58] = createBaseVNode("div", { class: "absolute left-2 top-1 bottom-1 w-px bg-gray-200" }, null, -1)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(timelineEntries.value, (e, i) => {
                        return (openBlock(), createElementBlock("div", {
                          key: i,
                          class: "relative pl-6 pb-5"
                        }, [
                          createBaseVNode("span", {
                            class: "absolute left-[-10px] top-1 w-4 h-4 rounded-none border-2 border-white",
                            style: normalizeStyle({ background: STATE_COLORS[e.state] || '#7f1d1d' })
                          }, null, 4),
                          createBaseVNode("div", _hoisted_94, toDisplayString(e.state ? e.state.replace('_', ' ') : '—'), 1),
                          createBaseVNode("div", _hoisted_95, toDisplayString(fmtDate(e.as_of_date)), 1)
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_96, "No lifecycle activity recorded."))
              ]),
              createBaseVNode("div", _hoisted_97, [
                _cache[60] || (_cache[60] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 mb-5\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Customer Behaviour</h2></div><p class=\"text-[10px] font-mono text-gray-500 ml-3\" data-v-a1b06b68>Behavioural signals derived from history</p></div>", 2)),
                createBaseVNode("div", _hoisted_98, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(behaviourFactors.value, (b) => {
                    return (openBlock(), createElementBlock("div", {
                      key: b.label,
                      class: "border border-gray-200 rounded-none p-4 bg-gray-50/40"
                    }, [
                      createBaseVNode("div", _hoisted_99, [
                        createBaseVNode("span", _hoisted_100, toDisplayString(b.label), 1),
                        createBaseVNode("span", _hoisted_101, toDisplayString(b.unit), 1)
                      ]),
                      (b.evidence)
                        ? (openBlock(), createElementBlock("div", _hoisted_102, toDisplayString(b.evidence), 1))
                        : createCommentVNode("", true),
                      (b.evidence)
                        ? (openBlock(), createElementBlock("div", _hoisted_103, [
                            createBaseVNode("div", {
                              class: "pp-fill rounded-none",
                              style: normalizeStyle({ width: behaviourBarWidth(b) + '%', background: '#7f1d1d' })
                            }, null, 4)
                          ]))
                        : (openBlock(), createElementBlock("span", _hoisted_104, "Not available"))
                    ]))
                  }), 128))
                ])
              ]),
              createBaseVNode("div", _hoisted_105, [
                createBaseVNode("div", _hoisted_106, [
                  _cache[61] || (_cache[61] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  _cache[62] || (_cache[62] = createBaseVNode("h3", { class: "relative z-10 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4" }, "Risk Signals", -1)),
                  (riskCodes.value.length)
                    ? (openBlock(), createElementBlock("div", _hoisted_107, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(riskCodes.value, (r) => {
                          return (openBlock(), createElementBlock("div", {
                            key: r.code,
                            class: "border-l-4 pl-3",
                            style: normalizeStyle({ borderColor: severityColor(r.severity) })
                          }, [
                            createBaseVNode("div", _hoisted_108, [
                              createBaseVNode("span", _hoisted_109, toDisplayString(codeLabel(r.code)), 1),
                              createBaseVNode("span", {
                                class: "text-[10px] font-mono font-bold uppercase tracking-widest",
                                style: normalizeStyle({ color: severityColor(r.severity) })
                              }, toDisplayString(r.severity), 5)
                            ]),
                            createBaseVNode("p", _hoisted_110, toDisplayString(detailText(r.detail)), 1)
                          ], 4))
                        }), 128))
                      ]))
                    : (openBlock(), createElementBlock("p", _hoisted_111, "No risk signals detected."))
                ]),
                createBaseVNode("div", _hoisted_112, [
                  _cache[63] || (_cache[63] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  _cache[64] || (_cache[64] = createBaseVNode("h3", { class: "relative z-10 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4" }, "Opportunity Signals", -1)),
                  (opportunityCodes.value.length)
                    ? (openBlock(), createElementBlock("div", _hoisted_113, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(opportunityCodes.value, (r) => {
                          return (openBlock(), createElementBlock("div", {
                            key: r.code,
                            class: "border-l-4 pl-3 border-[#16a34a]"
                          }, [
                            createBaseVNode("span", _hoisted_114, toDisplayString(codeLabel(r.code)), 1),
                            createBaseVNode("p", _hoisted_115, toDisplayString(detailText(r.detail)), 1)
                          ]))
                        }), 128))
                      ]))
                    : (openBlock(), createElementBlock("p", _hoisted_116, "No opportunity signals detected."))
                ])
              ]),
              createBaseVNode("div", _hoisted_117, [
                _cache[65] || (_cache[65] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 mb-5\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Recommended Actions</h2></div></div>", 2)),
                (actionPlan.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_118, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(actionPlan.value, (a) => {
                        return (openBlock(), createElementBlock("div", {
                          key: a.priority,
                          class: "border border-gray-200 rounded-none p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-white"
                        }, [
                          createBaseVNode("div", _hoisted_119, toDisplayString(a.priority), 1),
                          createBaseVNode("div", _hoisted_120, [
                            createBaseVNode("div", _hoisted_121, toDisplayString(a.title), 1),
                            createBaseVNode("div", _hoisted_122, toDisplayString(a.reason), 1),
                            createBaseVNode("div", _hoisted_123, toDisplayString(a.action), 1)
                          ]),
                          createBaseVNode("div", _hoisted_124, [
                            createBaseVNode("div", _hoisted_125, "Propensity " + toDisplayString(a.confidence) + "%", 1),
                            createBaseVNode("button", {
                              onClick: $event => (goToTakeAction(a)),
                              class: "bg-absa-passion text-white text-[10px] font-mono font-bold py-2.5 px-4 rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors"
                            }, "Take Action", 8, _hoisted_126)
                          ])
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_127, "No recommended actions generated yet."))
              ]),
              createBaseVNode("div", _hoisted_128, [
                createBaseVNode("div", _hoisted_129, [
                  _cache[73] || (_cache[73] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_130, [
                    _cache[71] || (_cache[71] = createBaseVNode("h2", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4" }, "Prediction Confidence", -1)),
                    createBaseVNode("div", _hoisted_131, [
                      createBaseVNode("span", _hoisted_132, toDisplayString(modelConfidence.value), 1),
                      _cache[66] || (_cache[66] = createBaseVNode("span", { class: "text-[10px] font-mono text-gray-500 uppercase tracking-widest" }, "Confidence", -1))
                    ]),
                    createBaseVNode("ul", _hoisted_133, [
                      createBaseVNode("li", _hoisted_134, [
                        _cache[67] || (_cache[67] = createBaseVNode("span", { class: "text-gray-500" }, "Data completeness", -1)),
                        createBaseVNode("span", _hoisted_135, toDisplayString(dataCompleteness.value ? Math.round(dataCompleteness.value.populated / dataCompleteness.value.total * 100) + '%' : '—'), 1)
                      ]),
                      createBaseVNode("li", _hoisted_136, [
                        _cache[68] || (_cache[68] = createBaseVNode("span", { class: "text-gray-500" }, "Behavioural features populated", -1)),
                        createBaseVNode("span", _hoisted_137, toDisplayString(dataCompleteness.value ? dataCompleteness.value.populated + ' / ' + dataCompleteness.value.total : '—'), 1)
                      ]),
                      createBaseVNode("li", _hoisted_138, [
                        _cache[69] || (_cache[69] = createBaseVNode("span", { class: "text-gray-500" }, "Model version", -1)),
                        createBaseVNode("span", _hoisted_139, toDisplayString(modelVersion.value), 1)
                      ]),
                      createBaseVNode("li", _hoisted_140, [
                        _cache[70] || (_cache[70] = createBaseVNode("span", { class: "text-gray-500" }, "Last model update", -1)),
                        createBaseVNode("span", _hoisted_141, toDisplayString(computedAt.value || '—'), 1)
                      ])
                    ]),
                    _cache[72] || (_cache[72] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-4 leading-relaxed" }, "Confidence is based on the amount, recency, and consistency of behavioural data. Predictions are estimates.", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_142, [
                  _cache[75] || (_cache[75] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_143, [
                    createBaseVNode("details", _hoisted_144, [
                      _cache[74] || (_cache[74] = createBaseVNode("summary", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 cursor-pointer list-none flex items-center justify-between" }, [
                        createTextVNode(" Data Used for Prediction "),
                        createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "expand_more")
                      ], -1)),
                      createBaseVNode("div", _hoisted_145, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(dataUsed.value, (d) => {
                          return (openBlock(), createElementBlock("div", {
                            key: d.name,
                            class: "border border-gray-200 bg-gray-50/40 rounded-none p-3"
                          }, [
                            createBaseVNode("div", _hoisted_146, toDisplayString(d.name), 1),
                            createBaseVNode("div", _hoisted_147, toDisplayString(d.available), 1)
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_148, [
                _cache[78] || (_cache[78] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 p-4 border-b border-gray-200\" data-v-a1b06b68><div class=\"flex items-center gap-2 mb-1\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-absa-passion shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Prediction History</h2></div><p class=\"text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-3\" data-v-a1b06b68>Lifecycle state over time</p></div>", 2)),
                createBaseVNode("div", _hoisted_149, [
                  createBaseVNode("table", _hoisted_150, [
                    _cache[77] || (_cache[77] = createBaseVNode("thead", null, [
                      createBaseVNode("tr", { class: "bg-gray-50/50" }, [
                        createBaseVNode("th", { class: "p-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 text-left" }, "Date"),
                        createBaseVNode("th", { class: "p-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 text-left" }, "Lifecycle State")
                      ])
                    ], -1)),
                    createBaseVNode("tbody", _hoisted_151, [
                      (!timelineEntries.value.length)
                        ? (openBlock(), createElementBlock("tr", _hoisted_152, [...(_cache[76] || (_cache[76] = [
                            createBaseVNode("td", {
                              colspan: "2",
                              class: "p-8 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest"
                            }, "No history available", -1)
                          ]))]))
                        : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(timelineEntries.value, (e, i) => {
                        return (openBlock(), createElementBlock("tr", {
                          key: i,
                          class: "hover:bg-gray-50/50"
                        }, [
                          createBaseVNode("td", _hoisted_153, toDisplayString(fmtDate(e.as_of_date)), 1),
                          createBaseVNode("td", _hoisted_154, [
                            createVNode(unref(StatePill), {
                              state: e.state
                            }, null, 8, ["state"])
                          ])
                        ]))
                      }), 128))
                    ])
                  ])
                ])
              ]),
              (alertCodes.value.length)
                ? (openBlock(), createElementBlock("div", _hoisted_155, [
                    _cache[80] || (_cache[80] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_156, [
                      _cache[79] || (_cache[79] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                        createBaseVNode("div", { class: "w-1 h-3.5 bg-[#DC0037] shrink-0" }),
                        createBaseVNode("h2", { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900" }, "Customer Alerts")
                      ], -1)),
                      createBaseVNode("span", _hoisted_157, toDisplayString(alertCodes.value.length) + " ACTIVE", 1)
                    ]),
                    createBaseVNode("div", _hoisted_158, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(alertCodes.value, (r) => {
                        return (openBlock(), createElementBlock("div", {
                          key: r.code,
                          class: "border-l-4 border-[#DC0037] pl-4 bg-red-50/30 py-2"
                        }, [
                          createBaseVNode("div", _hoisted_159, toDisplayString(codeLabel(r.code)), 1),
                          createBaseVNode("div", _hoisted_160, "Severity: " + toDisplayString(r.severity) + " · " + toDisplayString(detailText(r.detail)), 1)
                        ]))
                      }), 128))
                    ])
                  ]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_161, [
                _cache[89] || (_cache[89] = createStaticVNode("<div class=\"absolute inset-0 dotted-pattern pointer-events-none\" data-v-a1b06b68></div><div class=\"relative z-10 mb-4\" data-v-a1b06b68><div class=\"flex items-center gap-2\" data-v-a1b06b68><div class=\"w-1 h-3.5 bg-gray-400 shrink-0\" data-v-a1b06b68></div><h2 class=\"text-xs font-mono font-bold uppercase tracking-widest text-gray-900\" data-v-a1b06b68>Customer Information</h2></div></div>", 2)),
                createBaseVNode("div", _hoisted_162, [
                  createBaseVNode("div", _hoisted_163, [
                    _cache[81] || (_cache[81] = createBaseVNode("span", { class: "pp-metric__label" }, "Customer ID", -1)),
                    createBaseVNode("span", _hoisted_164, toDisplayString(customerId.value), 1)
                  ]),
                  createBaseVNode("div", _hoisted_165, [
                    _cache[82] || (_cache[82] = createBaseVNode("span", { class: "pp-metric__label" }, "Name", -1)),
                    createBaseVNode("span", _hoisted_166, toDisplayString(customer.value.fullName || '—'), 1)
                  ]),
                  createBaseVNode("div", _hoisted_167, [
                    _cache[83] || (_cache[83] = createBaseVNode("span", { class: "pp-metric__label" }, "Account status", -1)),
                    createBaseVNode("span", _hoisted_168, toDisplayString(state.value.replace('_', ' ')), 1)
                  ]),
                  createBaseVNode("div", _hoisted_169, [
                    _cache[84] || (_cache[84] = createBaseVNode("span", { class: "pp-metric__label" }, "Customer since", -1)),
                    createBaseVNode("span", _hoisted_170, toDisplayString(customerSince.value || '—'), 1)
                  ]),
                  (customer.value.branch)
                    ? (openBlock(), createElementBlock("div", _hoisted_171, [
                        _cache[85] || (_cache[85] = createBaseVNode("span", { class: "pp-metric__label" }, "Branch", -1)),
                        createBaseVNode("span", _hoisted_172, toDisplayString(customer.value.branch), 1)
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_173, [
                    _cache[86] || (_cache[86] = createBaseVNode("span", { class: "pp-metric__label" }, "Market segment", -1)),
                    createBaseVNode("span", _hoisted_174, toDisplayString(customer.value.segment), 1)
                  ]),
                  createBaseVNode("div", _hoisted_175, [
                    _cache[87] || (_cache[87] = createBaseVNode("span", { class: "pp-metric__label" }, "Health score", -1)),
                    createBaseVNode("span", _hoisted_176, toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) : '—'), 1)
                  ]),
                  createBaseVNode("div", _hoisted_177, [
                    _cache[88] || (_cache[88] = createBaseVNode("span", { class: "pp-metric__label" }, "Last activity", -1)),
                    createBaseVNode("span", _hoisted_178, toDisplayString(lastActivity.value), 1)
                  ])
                ])
              ]),
              createVNode(AiCampaignModal, {
                modelValue: showCampaignModal.value,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((showCampaignModal).value = $event)),
                customers: [{ id: customerId.value, name: customer.value.fullName || 'Customer', churnProb: churnProb.value, segment: customer.value.segment, clv: clvValue.value, healthScore: healthScore.value }],
                "source-context": "portfolio"
              }, null, 8, ["modelValue", "customers"])
            ], 64))
    ])
  ]))
}
}

};
const CustomerDetail = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a1b06b68"]]);

export { CustomerDetail as default };
