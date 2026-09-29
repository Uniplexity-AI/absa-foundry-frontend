import { $ as createLucideIcon, _ as _export_sfc, J as decodeJWT, ab as usePreferences, G as useRBAC, i as computed, r as ref, f as onMounted, M as watch, o as openBlock, C as createBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, j as createCommentVNode, A as createTextVNode, v as withModifiers, q as createVNode, s as unref, a3 as X, a2 as MessageSquare, F as Fragment, e as renderList, h as normalizeClass, aa as resolveDynamicComponent, a0 as FileText, n as normalizeStyle, x as withDirectives, y as vModelText, K as withKeys, a9 as Calendar, L as vModelSelect, T as Teleport, Z as __vitePreload, S as nextTick, X as vModelRadio } from './index-D3zh6Tx5.js';
import { u as useCurrency } from './useCurrency-BDA6TXzG.js';
import { k as getDocuments, u as updateLead, m as deleteLeadActivity, n as updateMeeting, q as createMeeting, r as deleteMeeting, s as deleteLeadNote, j as createLeadNote, t as uploadDocument, v as getLeadActivities, w as getMeetings, l as logLeadActivity, x as getLeadNotes, y as getContacts, z as getAccounts, A as convertLead, B as emit } from './CRMModule-C_kL94E5.js';
import { S as SquarePen, H as History, a as Save, L as LinkedDocumentsWidget } from './LinkedDocumentsWidget-DKAYWdIW.js';
import { P as Phone } from './phone-3Z2DrIju.js';
import { M as Mail } from './mail-CMDcyAzX.js';
import { R as RefreshCw } from './refresh-cw-Dom8ifl8.js';
import { I as Info } from './info-Cnab-DMj.js';
import { U as Users } from './users-BvkXk0Le.js';
import { C as CalendarCheck } from './calendar-check-Bh-Oy9_W.js';
import { S as StickyNote, G as Globe, L as Linkedin, a as Twitter, F as Facebook, b as GitCommitHorizontal, C as CircleX, A as Archive, V as Video, c as CalendarPlus, U as UserPlus } from './video-IXSBqfqy.js';
import { C as CircleCheck } from './circle-check-zPxsoNWg.js';
import { B as Briefcase } from './briefcase-BvkQeOHS.js';
import { M as MapPin } from './map-pin-I1lSaiLB.js';
import { L as LoaderCircle } from './loader-circle-sPSlwSnv.js';
import { C as Clock } from './clock-q-wEG4lU.js';
import { T as Trash2 } from './trash-2-BNEie1Ej.js';
import { P as Plus } from './plus-DJmFpN5A.js';
import { N as Navigation } from './navigation-DVf_QbWh.js';
import { T as TriangleAlert } from './triangle-alert-DR7ACPHk.js';
import { P as Paperclip } from './paperclip-CICD0pYz.js';
import { C as Check } from './check-sC3QA1R_.js';
import { U as User, H as Handshake } from './user-bcM6Offb.js';
import { S as Search } from './search-Q-2cr8Cb.js';
import { B as Building2 } from './building-2-Y_UT2tXH.js';
import { A as ArrowLeft } from './arrow-left-DyFrL4eI.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArchiveRestore = createLucideIcon("ArchiveRestoreIcon", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h2", key: "tvwodi" }],
  ["path", { d: "M20 8v11a2 2 0 0 1-2 2h-2", key: "1gkqxj" }],
  ["path", { d: "m9 15 3-3 3 3", key: "1pd0qc" }],
  ["path", { d: "M12 12v9", key: "192myk" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowRight = createLucideIcon("ArrowRightIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ChevronUp = createLucideIcon("ChevronUpIcon", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);

const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/40"
};
const _hoisted_2$1 = { class: "bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-6xl h-full sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-none relative" };
const _hoisted_3$1 = { class: "flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white/50 sticky top-0 z-20" };
const _hoisted_4$1 = { class: "flex items-center gap-2 flex-1 min-w-0" };
const _hoisted_5$1 = { class: "flex-1 min-w-0" };
const _hoisted_6$1 = { class: "flex items-center gap-2" };
const _hoisted_7$1 = {
  key: 0,
  class: "text-[9px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase tracking-widest border border-blue-100"
};
const _hoisted_8$1 = { class: "text-base font-black text-gray-900 uppercase tracking-tight truncate" };
const _hoisted_9$1 = {
  key: 0,
  class: "text-gray-500 text-[12px] font-mono font-bold ml-1"
};
const _hoisted_10$1 = { class: "flex items-center gap-1.5 shrink-0" };
const _hoisted_11$1 = {
  key: 0,
  class: "absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-50 min-w-[140px] rounded"
};
const _hoisted_12$1 = { class: "bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex flex-wrap items-center gap-2 relative z-10" };
const _hoisted_13$1 = {
  key: 0,
  class: "w-full text-[10px] font-mono font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 uppercase tracking-widest flex items-center gap-1.5"
};
const _hoisted_14$1 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_15$1 = { class: "px-4 border-b border-gray-100 bg-white/50 relative z-10" };
const _hoisted_16$1 = { class: "flex gap-5 overflow-x-auto whitespace-nowrap" };
const _hoisted_17$1 = ["onClick"];
const _hoisted_18$1 = { class: "flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar relative" };
const _hoisted_19$1 = { class: "relative z-10 space-y-3 animate-in fade-in duration-500" };
const _hoisted_20$1 = {
  key: 0,
  class: "space-y-2.5"
};
const _hoisted_21$1 = { class: "bg-white border border-gray-100 p-3.5 relative overflow-hidden" };
const _hoisted_22$1 = { class: "flex items-center justify-between mb-2" };
const _hoisted_23$1 = { class: "flex items-center gap-3" };
const _hoisted_24$1 = { class: "text-[13px] font-mono font-black text-[#2F2E8B] uppercase" };
const _hoisted_25$1 = { class: "text-[8px] font-mono text-gray-400" };
const _hoisted_26$1 = { class: "flex items-center gap-2" };
const _hoisted_27$1 = { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase" };
const _hoisted_28$1 = { class: "relative" };
const _hoisted_29$1 = { class: "h-3 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_30$1 = { class: "flex justify-between mt-1.5" };
const _hoisted_31$1 = { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-wider text-center leading-tight" };
const _hoisted_32$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-2" };
const _hoisted_33$1 = { class: "lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-1.5" };
const _hoisted_34$1 = { class: "bg-gray-50 border border-gray-100 p-2" };
const _hoisted_35$1 = { class: "bg-gray-50 border border-gray-100 p-2" };
const _hoisted_36$1 = { class: "text-sm font-mono font-black text-gray-900 uppercase tracking-tighter" };
const _hoisted_37$1 = { class: "bg-[#2F2E8B] border border-[#2F2E8B] p-2" };
const _hoisted_38$1 = { class: "text-sm font-mono font-black text-white tracking-tighter" };
const _hoisted_39$1 = { class: "bg-gray-50 border border-gray-100 p-2" };
const _hoisted_40$1 = { class: "text-sm font-mono font-black text-gray-900 uppercase tracking-tighter truncate" };
const _hoisted_41$1 = { class: "lg:col-span-12 bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-2" };
const _hoisted_42$1 = { class: "flex items-center justify-between gap-2" };
const _hoisted_43$1 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-wider" };
const _hoisted_44$1 = { key: 0 };
const _hoisted_45$1 = { class: "flex items-center gap-1.5" };
const _hoisted_46$1 = { class: "text-[10px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_47$1 = ["disabled"];
const _hoisted_48$1 = { class: "flex items-center justify-end gap-1.5 mt-1.5 pt-1.5 border-t border-[#2F2E8B]/10" };
const _hoisted_49$1 = { class: "text-[8px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_50$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-2 pt-2 border-t border-dashed border-gray-100" };
const _hoisted_51$1 = { class: "lg:col-span-12 grid grid-cols-2 gap-3" };
const _hoisted_52$1 = ["href"];
const _hoisted_53$1 = ["href"];
const _hoisted_54$1 = { key: 0 };
const _hoisted_55$1 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1" };
const _hoisted_56$1 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1" };
const _hoisted_57$1 = { class: "col-span-2" };
const _hoisted_58$1 = { class: "flex flex-wrap gap-1.5" };
const _hoisted_59$1 = ["href"];
const _hoisted_60$1 = ["href"];
const _hoisted_61$1 = ["href"];
const _hoisted_62$1 = ["href"];
const _hoisted_63$1 = {
  key: 0,
  class: "pt-2"
};
const _hoisted_64$1 = {
  key: 1,
  class: "pt-2 border-t border-dashed border-gray-100"
};
const _hoisted_65$1 = { class: "bg-gray-50/50 border border-gray-100 p-2.5" };
const _hoisted_66$1 = { class: "text-[11px] font-mono text-gray-800 leading-relaxed uppercase tracking-tight whitespace-pre-line" };
const _hoisted_67$1 = { class: "bg-gray-50/80 border border-gray-200 p-3 mt-3 relative overflow-hidden" };
const _hoisted_68$1 = { class: "grid grid-cols-2 md:grid-cols-4 gap-3" };
const _hoisted_69$1 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_70$1 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_71$1 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_72$1 = { class: "w-4 h-4 bg-[#2F2E8B] text-white text-[7px] font-mono font-black flex items-center justify-center" };
const _hoisted_73$1 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] uppercase" };
const _hoisted_74$1 = {
  key: 1,
  class: "text-[10px] font-mono font-black text-gray-400 uppercase"
};
const _hoisted_75$1 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_76$1 = {
  key: 1,
  class: "relative"
};
const _hoisted_77$1 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_78$1 = {
  key: 1,
  class: "relative pl-10"
};
const _hoisted_79$1 = { class: "absolute left-[13px] top-[11px] z-20" };
const _hoisted_80$1 = { class: "relative" };
const _hoisted_81$1 = { class: "ml-[26px] bg-white border border-gray-100 rounded-md p-2.5 transition-all hover:border-[#2F2E8B]/20 hover:shadow-none group relative" };
const _hoisted_82$1 = { class: "flex items-start justify-between gap-2" };
const _hoisted_83$1 = { class: "flex-1 min-w-0" };
const _hoisted_84$1 = { class: "flex items-center gap-1.5 mb-0.5 flex-wrap" };
const _hoisted_85$1 = { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap" };
const _hoisted_86$1 = { class: "inline-flex items-center gap-1 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_87 = { class: "text-[12px] font-mono text-gray-700 leading-snug tracking-tight uppercase font-bold" };
const _hoisted_88 = {
  key: 0,
  class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest"
};
const _hoisted_89 = { key: 0 };
const _hoisted_90 = { key: 1 };
const _hoisted_91 = { key: 2 };
const _hoisted_92 = {
  key: 3,
  class: "text-green-600"
};
const _hoisted_93 = { class: "flex items-center gap-1 shrink-0" };
const _hoisted_94 = ["onClick"];
const _hoisted_95 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200 rounded-lg"
};
const _hoisted_96 = {
  key: 2,
  class: "space-y-6"
};
const _hoisted_97 = { class: "flex items-center justify-between mb-2" };
const _hoisted_98 = {
  key: 0,
  class: "border border-[#2F2E8B]/20 bg-blue-50/30 p-5 space-y-3"
};
const _hoisted_99 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_100 = { class: "flex gap-2 justify-end" };
const _hoisted_101 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_102 = { class: "w-10 h-10 bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 flex items-center justify-center flex-shrink-0" };
const _hoisted_103 = { class: "flex-1 min-w-0" };
const _hoisted_104 = { class: "flex items-center gap-2 mb-1" };
const _hoisted_105 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" };
const _hoisted_106 = {
  key: 0,
  class: "text-[8px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-1.5 py-0.5 uppercase tracking-widest"
};
const _hoisted_107 = { class: "flex flex-wrap gap-3 text-[9px] font-mono text-gray-500" };
const _hoisted_108 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_109 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_110 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_111 = ["onClick"];
const _hoisted_112 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-16 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_113 = {
  key: 3,
  class: "space-y-6"
};
const _hoisted_114 = { class: "flex items-center justify-between" };
const _hoisted_115 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" };
const _hoisted_116 = {
  key: 0,
  class: "border border-[#2F2E8B]/20 bg-white shadow-none relative overflow-hidden"
};
const _hoisted_117 = { class: "relative z-10" };
const _hoisted_118 = { class: "bg-gradient-to-r from-[#2F2E8B] to-[#3D2F88] px-5 py-3 flex items-center gap-3" };
const _hoisted_119 = { class: "w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center" };
const _hoisted_120 = { class: "text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]" };
const _hoisted_121 = { class: "p-5 space-y-4" };
const _hoisted_122 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_123 = { class: "md:col-span-2" };
const _hoisted_124 = { class: "md:col-span-2" };
const _hoisted_125 = {
  key: 0,
  class: "border border-green-200 bg-green-50/30 p-4 space-y-4"
};
const _hoisted_126 = { class: "flex items-center gap-2" };
const _hoisted_127 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_128 = { class: "bg-white border border-[#2F2E8B]/20 p-3 space-y-2" };
const _hoisted_129 = { class: "flex items-center gap-1.5 pb-1 border-b border-gray-100" };
const _hoisted_130 = {
  key: 0,
  class: "ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200"
};
const _hoisted_131 = { class: "relative" };
const _hoisted_132 = {
  key: 0,
  class: "border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1"
};
const _hoisted_133 = ["onClick"];
const _hoisted_134 = { class: "flex gap-1.5" };
const _hoisted_135 = ["disabled"];
const _hoisted_136 = {
  key: 1,
  class: "space-y-1.5"
};
const _hoisted_137 = { class: "grid grid-cols-2 gap-1.5" };
const _hoisted_138 = {
  key: 2,
  class: "bg-green-50 border border-green-200 px-2 py-1.5"
};
const _hoisted_139 = { class: "text-[7px] font-mono font-bold text-green-800 truncate" };
const _hoisted_140 = { class: "text-[6px] font-mono text-green-600" };
const _hoisted_141 = {
  key: 3,
  class: "bg-gray-50 border border-dashed border-gray-200 px-2 py-3 text-center"
};
const _hoisted_142 = { class: "bg-white border border-amber-200/60 p-3 space-y-2" };
const _hoisted_143 = { class: "flex items-center gap-1.5 pb-1 border-b border-gray-100" };
const _hoisted_144 = {
  key: 0,
  class: "ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200"
};
const _hoisted_145 = {
  key: 1,
  class: "ml-auto text-[7px] font-mono font-bold text-amber-600 bg-amber-50 px-1 py-0.5 border border-amber-200"
};
const _hoisted_146 = {
  key: 0,
  class: "flex items-start gap-2"
};
const _hoisted_147 = { class: "flex-1 min-w-0" };
const _hoisted_148 = { class: "text-[8px] font-mono font-bold text-gray-800 uppercase" };
const _hoisted_149 = { class: "text-[6px] font-mono text-gray-500" };
const _hoisted_150 = {
  key: 1,
  class: "bg-amber-50 border border-dashed border-amber-200 px-2 py-2"
};
const _hoisted_151 = { class: "flex gap-1.5" };
const _hoisted_152 = { class: "relative" };
const _hoisted_153 = {
  key: 2,
  class: "border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1"
};
const _hoisted_154 = ["onClick"];
const _hoisted_155 = {
  key: 0,
  class: "bg-white border border-gray-200 px-4 py-3 flex items-center justify-between"
};
const _hoisted_156 = { class: "flex items-center gap-2" };
const _hoisted_157 = { class: "text-right" };
const _hoisted_158 = { class: "text-[16px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_159 = {
  key: 1,
  class: "bg-gray-50 border border-dashed border-gray-200 px-4 py-2 text-center"
};
const _hoisted_160 = {
  key: 1,
  class: "border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-[10px] font-mono uppercase tracking-wider whitespace-pre-wrap"
};
const _hoisted_161 = { class: "flex justify-end gap-3 pt-2 border-t border-gray-100" };
const _hoisted_162 = ["disabled"];
const _hoisted_163 = {
  key: 1,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_164 = {
  key: 2,
  class: "grid grid-cols-1 md:grid-cols-2 gap-3"
};
const _hoisted_165 = { class: "p-3 space-y-2" };
const _hoisted_166 = { class: "flex items-start justify-between gap-2" };
const _hoisted_167 = { class: "flex-1 min-w-0" };
const _hoisted_168 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-tight truncate" };
const _hoisted_169 = { class: "inline-block mt-0.5 px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest" };
const _hoisted_170 = { class: "flex items-center gap-0.5 shrink-0" };
const _hoisted_171 = ["onClick"];
const _hoisted_172 = ["onClick"];
const _hoisted_173 = { class: "grid grid-cols-2 gap-x-3 gap-y-1.5 text-[8px] font-mono" };
const _hoisted_174 = { class: "col-span-2 flex items-center gap-1.5 text-gray-500" };
const _hoisted_175 = { class: "font-bold text-gray-700 uppercase tracking-widest" };
const _hoisted_176 = {
  key: 0,
  class: "text-gray-400"
};
const _hoisted_177 = {
  key: 0,
  class: "col-span-2 flex items-start gap-1.5 text-gray-500"
};
const _hoisted_178 = { class: "text-gray-700 leading-tight" };
const _hoisted_179 = {
  key: 1,
  class: "col-span-2 flex items-center gap-1.5 text-gray-400"
};
const _hoisted_180 = { class: "ml-auto text-[9px] font-black text-[#2F2E8B]" };
const _hoisted_181 = ["href"];
const _hoisted_182 = {
  key: 2,
  class: "col-span-2 flex items-center gap-1.5 text-gray-400"
};
const _hoisted_183 = { class: "ml-auto text-[9px] font-black text-[#2F2E8B]" };
const _hoisted_184 = {
  key: 3,
  class: "col-span-2 border-t border-gray-50 pt-1.5 mt-0.5"
};
const _hoisted_185 = { class: "text-[8px] font-mono text-gray-600 leading-relaxed" };
const _hoisted_186 = {
  key: 4,
  class: "col-span-2 flex items-center gap-1 text-gray-400"
};
const _hoisted_187 = { class: "text-[7px] uppercase tracking-widest" };
const _hoisted_188 = {
  key: 3,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_189 = {
  key: 4,
  class: "space-y-6"
};
const _hoisted_190 = {
  key: 5,
  class: "space-y-4"
};
const _hoisted_191 = { class: "border border-[#2F2E8B]/20 bg-blue-50/20 p-4" };
const _hoisted_192 = { class: "flex justify-end mt-2" };
const _hoisted_193 = {
  key: 0,
  class: "mt-3 pt-3 border-t border-dashed border-[#2F2E8B]/20"
};
const _hoisted_194 = { class: "text-[8px] font-mono font-bold text-amber-600 uppercase tracking-widest mb-2" };
const _hoisted_195 = { class: "text-[10px] font-mono text-gray-700 truncate flex-1" };
const _hoisted_196 = ["onClick"];
const _hoisted_197 = {
  key: 0,
  class: "flex justify-center py-8"
};
const _hoisted_198 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_199 = { class: "flex items-start justify-between gap-3" };
const _hoisted_200 = { class: "flex-1" };
const _hoisted_201 = { class: "text-[11px] font-mono text-gray-700 leading-relaxed" };
const _hoisted_202 = { class: "flex items-center gap-2 mt-1.5 flex-wrap" };
const _hoisted_203 = { class: "text-[8px] font-mono text-gray-300 uppercase tracking-widest" };
const _hoisted_204 = {
  key: 0,
  class: "text-[7px] font-mono font-bold text-gray-300 uppercase tracking-widest"
};
const _hoisted_205 = ["onClick"];
const _hoisted_206 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-16 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_207 = { class: "px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 sticky bottom-0 z-20" };
const _hoisted_208 = { class: "flex items-center gap-2" };
const _hoisted_209 = { class: "flex items-center gap-2" };
const _hoisted_210 = ["disabled"];
const _hoisted_211 = { class: "bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden" };
const _hoisted_212 = { class: "p-6" };
const _hoisted_213 = { class: "flex items-start gap-4" };
const _hoisted_214 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" };
const _hoisted_215 = { class: "text-sm font-semibold text-gray-800" };
const _hoisted_216 = { class: "px-6 pb-5 flex justify-end gap-3" };
const _hoisted_217 = { class: "bg-white shadow-2xl w-full max-w-sm rounded-lg border border-[#2F2E8B]/20 overflow-hidden animate-in zoom-in-95 duration-200" };
const _hoisted_218 = { class: "bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between" };
const _hoisted_219 = { class: "flex items-center gap-2" };
const _hoisted_220 = { class: "w-6 h-6 bg-[#3D3A9E] rounded-full flex items-center justify-center" };
const _hoisted_221 = { class: "p-3.5 space-y-3" };
const _hoisted_222 = { class: "flex items-center gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-[#2F2E8B]/5 px-2.5 py-1.5 rounded-sm border border-[#2F2E8B]/10" };
const _hoisted_223 = {
  key: 0,
  class: "text-[#2F2E8B]"
};
const _hoisted_224 = { class: "bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 px-3 py-2 rounded" };
const _hoisted_225 = { class: "text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1.5" };
const _hoisted_226 = { class: "px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2" };
const _hoisted_227 = ["href"];
const _hoisted_228 = { class: "flex items-center gap-2" };


const _sfc_main$1 = {
  __name: 'LeadDetailModal',
  props: {
  modelValue: { type: Boolean, default: false },
  lead: { type: Object, default: null },
  users: { type: Array, default: () => [] },
  pipelineStages: { type: Array, default: () => [] }
},
  emits: ['update:modelValue', 'edit', 'call', 'whatsapp', 'email', 'convert', 'delete', 'archive'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const { formatCurrency, currencySymbol } = useCurrency();
const { getTenantId, getUserEmail, getUserName, getUserId } = decodeJWT();
const { preferences: brandPrefs } = usePreferences();
const { canAssign, initializeRBAC } = useRBAC();
computed(() => canAssign('crm'));

// ── Confirm Dialog ──
const showConfirm = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmDanger = ref(true);
let confirmCallback = null;

function showConfirmDialog(title, message, danger = true) {
  return new Promise((resolve) => {
    confirmTitle.value = title;
    confirmMessage.value = message;
    confirmDanger.value = danger;
    confirmCallback = resolve;
    showConfirm.value = true;
  });
}

function executeConfirm() {
  showConfirm.value = false;
  if (confirmCallback) confirmCallback(true);
  confirmCallback = null;
}

function cancelConfirm() {
  showConfirm.value = false;
  if (confirmCallback) confirmCallback(false);
  confirmCallback = null;
}
onMounted(() => { initializeRBAC().catch(() => {}); });

const activeTab = ref('overview');
const activities = ref([]);
const loadingActivities = ref(false);

// CAC (Customer Acquisition Cost) state
const localCac = ref(props.lead?.cac ?? 0);
const savingCac = ref(false);
const cacSaved = ref(false);
ref(false);

// Notes tab state
const notes = ref([]);
const loadingNotes = ref(false);
const newNoteText = ref('');

// Staged changes (for Save button)
const stagedNotes = ref([]);
const stagedDocuments = ref([]);
const savingStaged = ref(false);
ref(null);
const hasStagedChanges = computed(() => stagedNotes.value.length > 0 || stagedDocuments.value.length > 0);

function stageNote() {
  const text = newNoteText.value.trim();
  if (!text) return;
  stagedNotes.value.push(text);
  newNoteText.value = '';
}

async function commitStagedChanges() {
  if (!props.lead?.id) return;
  savingStaged.value = true;
  const tenantId = getTenantId();
  try {
    // Save all staged notes
    for (const text of stagedNotes.value) {
      await createLeadNote(props.lead.id, tenantId, { note: text, title: '' });
      await logActivity('note:create', `Note added: "${text.substring(0, 80)}"`);
    }
    stagedNotes.value = [];
    await loadNotes();
    
    // Upload all staged documents
    for (const sd of stagedDocuments.value) {
      const formData = new FormData();
      formData.append('file', sd.file);
      formData.append('name', sd.name);
      formData.append('category', sd.category || 'other');
      formData.append('linked_to_type', 'lead');
      formData.append('linked_to_id', props.lead.id);
      await uploadDocument(formData, tenantId);
      await logActivity('document:upload', `Document "${sd.name}" uploaded and linked to lead`);
    }
    stagedDocuments.value = [];
    
    await loadActivities();
  } catch (err) {
    console.error('[LeadDetailModal] Failed to commit staged changes:', err);
    alert('Failed to save some changes. Please try again.');
  } finally {
    savingStaged.value = false;
  }
}

async function loadNotes() {
  if (!props.lead?.id) return;
  loadingNotes.value = true;
  try {
    notes.value = await getLeadNotes(props.lead.id, getTenantId());
  } catch (err) {
    console.error('[LeadDetailModal] Failed to load notes:', err);
    notes.value = [];
  } finally {
    loadingNotes.value = false;
  }
}

watch(() => props.lead, (l) => {
  localCac.value = l?.cac ?? 0;
  cacSaved.value = false;
  if (l?.id) {
    loadActivities();
    loadNotes();
  }
}, { immediate: true });

// Reload activities whenever the activities tab is selected
watch(activeTab, (tab) => {
  if (tab === 'activities' && props.lead?.id) loadActivities();
  if (tab === 'notes' && props.lead?.id) loadNotes();
});

async function saveCac() {
  if (!props.lead?.id) return;
  const oldCac = props.lead.cac ?? 0;
  const newCac = Number(localCac.value) || 0;
  if (newCac === oldCac) return;
  savingCac.value = true;
  cacSaved.value = false;
  try {
    await updateLead(props.lead.id, leadPayload({ cac: newCac }), getTenantId());
    props.lead.cac = newCac;
    cacSaved.value = true;
    await logActivity('cac:update', `CAC changed: ${formatCurrency(oldCac)} → ${formatCurrency(newCac)}`);
    setTimeout(() => { cacSaved.value = false; }, 2000);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to save CAC:', error);
    localCac.value = props.lead.cac ?? 0;
  } finally {
    savingCac.value = false;
  }
}

const cacAdjustAmount = ref(0);

function applyCacAdjust(mode) {
  const amount = Number(cacAdjustAmount.value) || 0;
  if (amount <= 0) { alert('Enter a valid positive amount.'); return; }
  const current = Number(localCac.value) || 0;
  localCac.value = mode === 'add' ? current + amount : Math.max(0, current - amount);
  cacAdjustAmount.value = 0;
  saveCac();
}

// Helper: build full payload with required fields for PUT endpoint
function leadPayload(extra) {
  return { ...props.lead, tenant_id: getTenantId(), ...extra };
}

// ── Document Upload Callback ──
async function handleDocumentAttached() {
  await logActivity('document:upload', 'Document uploaded and linked to lead');
}

async function handleDocumentDeleted(docName) {
  await logActivity('document:delete', `Document "${docName}" deleted from lead`);
}

// ── Activity Logging ──
async function logActivity(action, notes = '') {
  if (!props.lead?.id) return;
  try {
    await logLeadActivity(props.lead.id, {
      action,
      notes: notes || `Activity: ${action}`,
      actor: getUserEmail() || 'system',
      actor_role: 'owner',
      tenant_id: getTenantId(),
      timestamp: new Date().toISOString()
    });
    if (activeTab.value === 'activities') {
      await loadActivities();
    }
  } catch (err) {
    console.error('[LeadDetailModal] Failed to log activity:', err);
  }
}

// Wrap the original emit to auto-log activity
const _origCall = (lead) => {
  const now = new Date().toISOString();
  logActivity('communication:call', `Call initiated to ${lead?.name || 'lead'} | Phone: ${lead?.phone || '—'} | Time: ${formatDate(now)}`);
  emit('call', lead);
};

// ── WhatsApp Dialog ──
const showWhatsAppDialog = ref(false);
const whatsAppMessage = ref('');

function proceedWithWhatsApp() {
  const msg = whatsAppMessage.value?.trim() || '';
  logActivity('communication:whatsapp', `WhatsApp message to ${props.lead?.name}${msg ? ' | Message: ' + msg : ''}`);
  emit('whatsapp', props.lead);
  showWhatsAppDialog.value = false;
  whatsAppMessage.value = '';
}

// ── Time Tracker ──
const showExportMenu = ref(false);
// Dynamic stage list from pipeline stages prop (falls back to defaults)
const stageList = computed(() => {
  if (props.pipelineStages?.length) {
    return props.pipelineStages.map(s => ({ key: s.id, label: (s.name || s.id).toUpperCase(), order: s.order || 0 }))
      .sort((a, b) => a.order - b.order);
  }
  // Fallback defaults
  return [
    { key: 'new', label: 'NEW' },
    { key: 'contacted', label: 'CONTACTED' },
    { key: 'qualified', label: 'QUALIFIED' },
    { key: 'proposal', label: 'PROPOSAL' },
    { key: 'negotiation', label: 'NEGOTIATION' },
    { key: 'closed-won', label: 'WON' },
    { key: 'closed-lost', label: 'LOST' }
  ];
});

const leadAgeDays = computed(() => {
  if (!props.lead?.created_at) return 0;
  const created = new Date(props.lead.created_at);
  const now = new Date();
  return Math.max(0, Math.floor((now - created) / (1000 * 60 * 60 * 24)));
});

const currentStageIdx = computed(() => {
  const stage = (props.lead?.stage || 'new').toLowerCase().replace(/\s+/g, '-');
  const list = stageList.value;
  const idx = list.findIndex(s => s.key === stage || s.key.toLowerCase() === stage);
  return idx >= 0 ? idx : 0;
});

const stageProgressPct = computed(() => {
  const list = stageList.value;
  if (currentStageIdx.value >= list.length - 1) return 100;
  // Progress is based on non-terminal stages (exclude closed-lost if it's last)
  const progressStages = list.filter(s => s.key !== 'closed-lost');
  const currentInProgress = progressStages.findIndex(s => s.key === list[currentStageIdx.value]?.key);
  if (currentInProgress < 0) return 0;
  return Math.round((currentInProgress / Math.max(progressStages.length - 1, 1)) * 100);
});

function getStageDotClass(idx) {
  if (idx < currentStageIdx.value) return 'bg-[#2F2E8B] border-[#2F2E8B]';
  if (idx === currentStageIdx.value) return 'bg-white border-[#2F2E8B] ring-2 ring-[#2F2E8B]/30';
  return 'bg-white border-gray-300';
}

// ── Export Report ──
async function exportReport(format) {
  showExportMenu.value = false;
  const l = props.lead;
  if (!l) return;

  // Ensure activities and meetings are loaded before export
  if (!activities.value.length) await loadActivities();
  if (!meetings.value.length) loadMeetings().catch(() => {});
  
  const tenantColor = '#2F2E8B';
  const now = new Date().toISOString().split('T')[0];
  const leadName = (l.name || 'UNKNOWN').trim();
  const safeName = leadName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
  const reportTitle = `${safeName}_REPORT_${now}`;

  // ── Fetch documents for export ──
  let documents = [];
  try {
    const tenantId = getTenantId();
    const docsResp = await getDocuments(tenantId, {
      linked_to_type: 'lead',
      linked_to_id: l.id
    });
    documents = docsResp.items || [];
  } catch (e) { /* ignore */ }
  
  // ── Consolidated data sections ──
  
  // 1) All lead fields as key-value pairs
  const leadFields = [
    { label: 'Full Name', value: l.name || 'N/A' },
    { label: 'Email Address', value: l.email || 'N/A' },
    { label: 'Phone Contact', value: l.phone || 'N/A' },
    { label: 'Company / Organization', value: l.company || 'N/A' },
    { label: 'Position / Role', value: l.position || 'N/A' },
    { label: 'Priority Level', value: (l.priority || 'N/A').toUpperCase() },
    { label: 'Current Stage', value: formatStage(l.stage) },
    { label: 'Acquisition Source', value: l.source || 'N/A' },
    { label: 'Projected Valuation', value: formatCurrency(l.value || 0) },
    { label: 'Client Maintenance Cost (CAC)', value: formatCurrency(l.cac || 0) },
    { label: 'Lead Age', value: `${leadAgeDays.value} day(s)` },
    { label: 'City / Zone', value: l.city || 'N/A' },
    { label: 'Country / Jurisdiction', value: l.country || 'N/A' },
    { label: 'Street Address', value: l.address || 'N/A' },
    { label: 'Area / District', value: l.areaName || 'N/A' },
    { label: 'Assigned To', value: l.assignedTo || 'N/A' },
    { label: 'TPIN / Tax ID', value: l.tpin || 'N/A' },
    { label: 'Website / Digital Asset', value: l.website || 'N/A' },
    { label: 'LinkedIn Profile', value: l.linkedin || 'N/A' },
    { label: 'Twitter / X', value: l.twitter || 'N/A' },
    { label: 'Facebook', value: l.facebook || 'N/A' },
    { label: 'Instagram', value: l.instagram || 'N/A' },
    { label: 'Tags', value: (l.tags || []).join(', ') || 'N/A' },
    { label: 'Notes', value: l.notes || 'N/A' },
    { label: 'Created On', value: formatDate(l.created_at) },
    { label: 'Last Updated', value: formatDate(l.updatedAt) }
  ];
  
  // 2) Conversion info (inline)
  const conversionInfo = l.isConverted
    ? `YES — Converted on ${formatDate(l.convertedDate)} | Contact: ${l.convertedContactId || 'N/A'} | Account: ${l.convertedAccountId || 'N/A'}`
    : 'NO';
  
  // 3) Stage timeline (inline string)
  const stageTimelineStr = stageList.value.map((s, i) => {
    const isCurrent = s.key === (l.stage || 'new').toLowerCase().replace(/\s+/g, '-');
    const isCompleted = i < currentStageIdx.value;
    const status = isCurrent ? '◉ CURRENT' : isCompleted ? '✓ COMPLETED' : '○ PENDING';
    return `${s.label} [${status}]`;
  }).join(' → ');
  
  // 4) Activities — detailed list
  const activityDetails = (activities.value || []).map(a => ({
    type: (a.type || a.action || 'event').toUpperCase(),
    notes: a.notes || a.description || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || 'system').split('@')[0]
  }));
  
  // 5) Communications
  const commDetails = (activities.value || []).filter(a => {
    const t = (a.type || a.action || '').toLowerCase();
    return t.includes('call') || t.includes('whatsapp') || t.includes('email') || t.includes('communication');
  }).map(a => ({
    type: (a.type || a.action || '').replace('communication:', '').toUpperCase(),
    notes: a.notes || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || '').split('@')[0] || '—'
  }));
  
  // 6) Documents
  const docDetails = documents.map(d => ({
    name: d.name || 'N/A',
    category: (d.category || 'FILE').toUpperCase(),
    size: formatFileSize(d.file_size),
    date: formatDate(d.created_at)
  }));
  
  // 7) Meetings
  const meetingDetails = (meetings.value || []).map(m => {
    const locStr = m.lat && m.lng ? `${m.location_name || ''} (${m.lat.toFixed(4)}, ${m.lng.toFixed(4)})` : (m.location || '—');
    let distStr = '—';
    if (m.distance_km != null) {
      distStr = m.distance_km < 1 ? (m.distance_km * 1000).toFixed(0) + ' m' : m.distance_km.toFixed(2) + ' km';
    }
    return { title: m.title || '—', type: m.meeting_type || '—', location: locStr, distance: distStr, date: formatDate(m.start_datetime || m.start_time) };
  });
  
  // ═══════════════════════════════════════
  // PDF (jsPDF)
  // ═══════════════════════════════════════
  if (format === 'pdf') {
    const { jsPDF } = await __vitePreload(async () => { const { jsPDF } = await import('./jspdf.es.min-CoX7cp20.js').then(n => n.j);return { jsPDF }},true              ?[]:void 0);
    const autoTable = (await __vitePreload(async () => { const {default: __vite_default__} = await import('./jspdf.plugin.autotable-DJ3LRzAR.js');return { default: __vite_default__ }},true              ?[]:void 0)).default;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentW = pageW - margin * 2;
    let y = margin;
    
    function jspdfSection(title) {
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y, contentW, 6, 'F');
      doc.setTextColor(47, 46, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 2, y + 4.5);
      y += 9;
    }
    
    function jspdfCell(label, value) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(85, 85, 85);
      doc.text(String(label || ''), margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 51, 51);
      const valStr = String(value || '—');
      const maxW = contentW - 55;
      const lines = doc.splitTextToSize(valStr, maxW);
      doc.text(lines, margin + 50, y);
      y += Math.max(lines.length * 4, 4.5);
    }
    
    function jspdfTable(headers, data, opt) {
      try {
        const colCount = headers.length;
        const remaining = contentW - (opt?.colWidth0 || 50);
        const colW0 = opt?.colWidth0 || (colCount <= 2 ? 50 : Math.floor(contentW / colCount));
        const colStyles = {};
        colStyles[0] = { cellWidth: colW0, fontStyle: 'bold', textColor: [85,85,85] };
        if (colCount === 2) {
          colStyles[1] = { cellWidth: remaining };
        } else if (opt?.colWidth1) {
          colStyles[1] = { cellWidth: opt.colWidth1 };
          const restW = contentW - colW0 - opt.colWidth1;
          const otherW = Math.floor(restW / (colCount - 2));
          for (let i = 2; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        } else {
          const otherW = Math.floor(remaining / (colCount - 1));
          for (let i = 1; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        }
        const result = autoTable(doc, {
          startY: y,
          head: [headers],
          body: data,
          margin: { left: margin, right: margin },
          tableWidth: contentW,
          styles: { fontSize: 6.5, font: 'helvetica', cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 }, overflow: 'linebreak', minCellHeight: 5, valign: 'top' },
          headStyles: { fillColor: [47, 46, 139], textColor: 255, fontStyle: 'bold', fontSize: 7, halign: 'left' },
          columnStyles: colStyles,
          didParseCell: (cellData) => {
            if (cellData.section === 'body' && cellData.column.index === 1) {
              cellData.cell.styles.fontSize = 6;
            }
          }
        });
        y = (result && result.lastFinalY) ? result.lastFinalY + 4 : y + 20;
      } catch (e) {
        console.warn('[PDF] autoTable error:', e);
        y += 20;
      }
    }
    
    // Header
    doc.setFillColor(47, 46, 139);
    doc.rect(margin, y, contentW, 16, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('LEAD REPORT — ' + leadName.toUpperCase(), margin + 3, y + 7);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 255);
    doc.text((l.company || '') + '  |  Generated: ' + now + '  |  Age: ' + leadAgeDays.value + ' day(s)  |  ID: ' + (l.id?.slice(0, 8) || '—'), margin + 3, y + 12.5);
    y += 20;
    
    // Lead Timeline
    jspdfSection('Lead Timeline & Progress');
    jspdfCell('Lead Age', 'Since ' + formatDate(l.created_at) + ' — ' + leadAgeDays.value + ' day(s)');
    jspdfCell('Current Stage', formatStage(l.stage) + ' (' + stageProgressPct.value + '% complete)');
    jspdfCell('Progress', stageTimelineStr);
    
    // Lead Information — comprehensive field list
    jspdfSection('Lead Profile');
    const chunkSize = 18;
    for (let i = 0; i < leadFields.length; i += chunkSize) {
      const chunk = leadFields.slice(i, i + chunkSize);
      if (i > 0) { doc.addPage(); y = margin; jspdfSection('Lead Profile (continued)'); }
      chunk.forEach(f => jspdfCell(f.label, f.value));
    }
    
    // Timeline
    if (y > pageW - 45) { doc.addPage(); y = margin; }
    jspdfSection('Stage Timeline & Progress');
    jspdfCell('Lead Age', `Since ${formatDate(l.created_at)} — ${leadAgeDays.value} day(s)`);
    jspdfCell('Current Stage', `${formatStage(l.stage)} (${stageProgressPct.value}% complete)`);
    jspdfCell('Progress', stageTimelineStr);
    
    // Conversion
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Conversion Status');
    jspdfCell('Converted', conversionInfo);
    
    // Activities
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Activity Log (${activityDetails.length})');
    if (activityDetails.length) {
      jspdfTable(['Activity', 'Notes', 'Date', 'Actor'], activityDetails.map(a => [a.type, a.notes, a.date, a.actor]), { colWidth0: 18, colWidth1: 100 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No activities recorded.', margin, y);
    }
    
    // Communications
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Communications (${commDetails.length})');
    if (commDetails.length) {
      jspdfTable(['Type', 'Details', 'Date', 'Actor'], commDetails.map(c => [c.type, c.notes, c.date, c.actor]), { colWidth0: 18, colWidth1: 100 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No communications recorded.', margin, y);
    }
    
    // Documents
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Linked Documents (${docDetails.length})');
    if (docDetails.length) {
      jspdfTable(['Name', 'Category', 'Size', 'Date'], docDetails.map(d => [d.name, d.category, d.size, d.date]), { colWidth0: 55 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No documents linked.', margin, y);
    }
    
    // Meetings
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('Meetings (${meetingDetails.length})');
    if (meetingDetails.length) {
      jspdfTable(['Title', 'Type', 'Location', 'Distance', 'Date'], meetingDetails.map(m => [m.title, m.type, m.location, m.distance, m.date]), { colWidth0: 45 });
    } else {
      doc.setFontSize(8); doc.setTextColor(150); doc.text('No meetings recorded.', margin, y);
    }
    
    // CAC Summary
    if (y > pageW - 40) { doc.addPage(); y = margin; }
    jspdfSection('CAC Summary');
    jspdfTable(['Metric', 'Value'], [
      ['Customer Acquisition Cost', formatCurrency(l.cac || 0)],
      ['Lead Valuation', formatCurrency(l.value || 0)],
      ['ROI', l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A']
    ]);
    
    // Footer
    doc.setFontSize(7);
    doc.setTextColor(180);
    doc.setFont('helvetica', 'normal');
    doc.text('Uniplexity CRM — Lead Report • ' + now + ' • Confidential', margin, doc.internal.pageSize.getHeight() - 10);
    
    doc.save(safeName + '_REPORT.pdf');
  
  // ═══════════════════════════════════════
  // DOCX
  // ═══════════════════════════════════════
  } else if (format === 'docx') {
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><style>
      @page { size: A4 landscape; margin: 1.2cm; }
      body { font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; font-size: 10px; color: #2d2d2d; line-height: 1.5; }
      h1 { background: ${tenantColor}; color: #fff; padding: 12px 18px; font-size: 18px; font-family: 'Calibri', 'Segoe UI', sans-serif; font-weight: 600; letter-spacing: 0.5px; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; table-layout: fixed; }
      th, td { border: 1px solid #c0c0c0; padding: 4px 7px; text-align: left; font-size: 9px; font-family: 'Calibri', 'Segoe UI', sans-serif; word-wrap: break-word; overflow-wrap: break-word; white-space: normal; }
      th { background: ${tenantColor}; color: #fff; font-weight: 600; font-size: 8.5px; letter-spacing: 0.3px; }
      td { color: #333; }
      .section-title { font-weight: 700; font-size: 11px; margin: 14px 0 5px; padding: 4px 10px; background: #f0f0f0; border-left: 4px solid ${tenantColor}; font-family: 'Calibri', 'Segoe UI', sans-serif; color: ${tenantColor}; }
      .footer { text-align: center; font-size: 7px; color: #999; margin-top: 20px; font-family: 'Calibri', 'Segoe UI', sans-serif; }
      .subtitle { color: #888; font-size: 8.5px; font-family: 'Calibri', 'Segoe UI', sans-serif; }
    </style></head><body>
      <h1>Lead Report — ${toTitleCase(l.name) || 'Unknown'}</h1>
      <p class="subtitle">${toTitleCase(l.company) || ''} | Generated: ${now} | Lead ID: ${l.id?.substring(0,8) || '—'} | Age: ${leadAgeDays.value} Day(s)</p>
      
      <div class="section-title">Lead Profile</div>
      <table>${leadFields.map(f => `<tr><td style="width:28%;background:#f5f5f5;font-weight:600;">${f.label}</td><td>${f.value}</td></tr>`).join('')}</table>
      
      <div class="section-title">Stage Timeline & Progress</div>
      <table>
        <tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Lead Age</td><td>Since ${formatDate(l.created_at)} — ${leadAgeDays.value} Day(s)</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Current Stage</td><td>${formatStage(l.stage)} (${stageProgressPct.value}% Complete)</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Progress</td><td>${stageTimelineStr}</td></tr>
      </table>
      
      <div class="section-title">Conversion Status</div>
      <table><tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Converted</td><td>${conversionInfo}</td></tr></table>
      
      <div class="section-title">Activity Log (${activityDetails.length})</div>
      ${activityDetails.length ? '<table><tr><th>Activity</th><th>Notes</th><th>Date</th><th>Actor</th></tr>' + activityDetails.map(a => `<tr><td>${a.type}</td><td>${a.notes}</td><td>${a.date}</td><td>${a.actor}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No activities recorded.</p>'}
      
      <div class="section-title">Communications (${commDetails.length})</div>
      ${commDetails.length ? '<table><tr><th>Type</th><th>Details</th><th>Date</th><th>Actor</th></tr>' + commDetails.map(c => `<tr><td>${c.type}</td><td>${c.notes}</td><td>${c.date}</td><td>${c.actor}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No communications recorded.</p>'}
      
      <div class="section-title">Linked Documents (${docDetails.length})</div>
      ${docDetails.length ? '<table><tr><th>Name</th><th>Category</th><th>Size</th><th>Date</th></tr>' + docDetails.map(d => `<tr><td>${d.name}</td><td>${d.category}</td><td>${d.size}</td><td>${d.date}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No documents linked.</p>'}
      
      <div class="section-title">Meetings (${meetingDetails.length})</div>
      ${meetingDetails.length ? '<table><tr><th>Title</th><th>Type</th><th>Location</th><th>Distance</th><th>Date</th></tr>' + meetingDetails.map(m => `<tr><td>${m.title}</td><td>${m.type}</td><td>${m.location}</td><td>${m.distance}</td><td>${m.date}</td></tr>`).join('') + '</table>' : '<p class="subtitle">No meetings recorded.</p>'}
      
      <div class="section-title">CAC Summary</div>
      <table>
        <tr><td style="width:28%;background:#f5f5f5;font-weight:600;">Customer Acquisition Cost</td><td>${formatCurrency(l.cac || 0)}</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">Lead Valuation</td><td>${formatCurrency(l.value || 0)}</td></tr>
        <tr><td style="background:#f5f5f5;font-weight:600;">ROI</td><td>${l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A'}</td></tr>
      </table>
      
      <div class="footer">Uniplexity CRM — Confidential</div>
    </body></html>`;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportTitle + '.doc';
    a.click();
    URL.revokeObjectURL(url);
  
  // ═══════════════════════════════════════
  // XLSX (CSV)
  // ═══════════════════════════════════════
  } else if (format === 'xlsx') {
    const csvRows = [];
    csvRows.push('LEAD REPORT,' + (l.name || 'UNKNOWN') + ',Generated,' + now + ',Age,' + leadAgeDays.value + ' day(s)');
    csvRows.push('');
    csvRows.push('LEAD PROFILE');
    csvRows.push('FIELD,VALUE');
    leadFields.forEach(f => csvRows.push('"' + f.label + '","' + f.value.replace(/"/g, '""') + '"'));
    csvRows.push('');
    csvRows.push('STAGE TIMELINE');
    csvRows.push('"' + stageTimelineStr.replace(/"/g, '""') + '"');
    csvRows.push('');
    csvRows.push('CONVERSION STATUS');
    csvRows.push('"' + conversionInfo.replace(/"/g, '""') + '"');
    csvRows.push('');
    csvRows.push('ACTIVITY LOG,' + activityDetails.length + ' entries');
    csvRows.push('Type,Notes,Date,Actor');
    activityDetails.forEach(a => csvRows.push('"' + a.type + '","' + a.notes.replace(/"/g, '""') + '","' + a.date + '","' + a.actor + '"'));
    csvRows.push('');
    csvRows.push('COMMUNICATIONS,' + commDetails.length + ' entries');
    csvRows.push('Type,Details,Date,Actor');
    commDetails.forEach(c => csvRows.push('"' + c.type + '","' + c.notes.replace(/"/g, '""') + '","' + c.date + '","' + c.actor + '"'));
    csvRows.push('');
    csvRows.push('LINKED DOCUMENTS,' + docDetails.length + ' entries');
    csvRows.push('Name,Category,Size,Date');
    docDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.category + '","' + d.size + '","' + d.date + '"'));
    csvRows.push('');
    csvRows.push('MEETINGS,' + meetingDetails.length + ' entries');
    csvRows.push('Title,Type,Location,Distance,Date');
    meetingDetails.forEach(m => csvRows.push('"' + m.title + '","' + m.type + '","' + m.location + '","' + m.distance + '","' + m.date + '"'));
    csvRows.push('');
    csvRows.push('CAC SUMMARY');
    csvRows.push('"Customer Acquisition Cost","' + formatCurrency(l.cac || 0) + '"');
    csvRows.push('"Lead Valuation","' + formatCurrency(l.value || 0) + '"');
    csvRows.push('"ROI","' + (l.cac && l.cac > 0 ? ((l.value || 0) / l.cac * 100).toFixed(1) + '%' : 'N/A') + '"');
    
    const csv = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportTitle + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// ── Close export menu on outside click ──
onMounted(() => {
  document.addEventListener('click', () => { showExportMenu.value = false; });
});
const _origWhatsapp = (lead) => { showWhatsAppDialog.value = true; };
const _origEmail = (lead) => { logActivity('communication:email', `Email sent to ${lead?.email || lead?.name}`); emit('email', lead); };
const _origConvert = (lead) => { logActivity('convert', `Lead converted to account`); emit('convert', lead); };

// Contacts tab state
const newContact = ref({ name: '', phone: '', email: '', position: '', company: '' });
const showContactForm = ref(false);
const contacts = computed(() => props.lead?.contacts || []);

async function addContact() {
  if (!newContact.value.name) return;
  const contactName = newContact.value.name;
  const updated = [...contacts.value, { ...newContact.value, id: Date.now() }];
  try {
    await updateLead(props.lead.id, leadPayload({ contacts: updated }), getTenantId());
    props.lead.contacts = updated;
  } catch {
    if (!props.lead.contacts) props.lead.contacts = [];
    props.lead.contacts.push({ ...newContact.value, id: Date.now() });
  }
  newContact.value = { name: '', phone: '', email: '', position: '', company: '' };
  showContactForm.value = false;
  await logActivity('contact:create', `Contact "${contactName}" added`);
}

async function removeContact(contactId) {
  const ok = await showConfirmDialog('REMOVE CONTACT', 'Remove this contact from the lead? This cannot be undone.', true);
  if (!ok) return;
  const updated = contacts.value.filter(c => c.id !== contactId);
  try {
    await updateLead(props.lead.id, leadPayload({ contacts: updated }), getTenantId());
    props.lead.contacts = updated;
  } catch {
    props.lead.contacts = updated;
  }
}

async function deleteNote(noteId) {
  const ok = await showConfirmDialog('DELETE NOTE', 'Permanently delete this note? This cannot be undone.', true);
  if (!ok) return;
  try {
    await deleteLeadNote(noteId, getTenantId());
    notes.value = notes.value.filter(n => n.id !== noteId);
    await logActivity('note:delete', `Note deleted`);
  } catch (err) {
    console.error('[LeadDetailModal] Failed to delete note:', err);
  }
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'contacts', label: 'Leads', icon: Users },
  { id: 'meetings', label: 'Meetings', icon: CalendarCheck },
  { id: 'activities', label: 'Activity', icon: History },
  { id: 'assets', label: 'Documents', icon: FileText },
  { id: 'notes', label: 'Notes', icon: StickyNote }
];

// Map logic
let leadMap = null;

function initLeadMap() {
  if (!props.lead?.location?.lat || !props.lead?.location?.lng) return;
  
  const containerId = 'lead-preview-map';
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (leadMap) {
    leadMap.remove();
    leadMap = null;
  }
  
  const lat = props.lead.location.lat;
  const lng = props.lead.location.lng;
  
  // Use Leaflet if available globaly (assuming it's loaded as per project standard)
  if (typeof L !== 'undefined') {
    leadMap = L.map(containerId, {
      zoomControl: false,
      attributionControl: false
    }).setView([lat, lng], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leadMap);
    
    let icon;
    const logo = brandPrefs.companyLogo;
    if (logo) {
      icon = L.divIcon({
        className: 'crm-logo-marker',
        html: `<div style="width:40px;height:40px;border-radius:50%;border:3px solid #2F2E8B;background:#fff;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><img src="${logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'"/></div><div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid #2F2E8B;margin:-2px auto 0;"></div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52]
      });
    } else {
      icon = L.divIcon({
        className: 'crm-default-marker',
        html: '<div style="width:20px;height:20px;border:3px solid #fff;border-radius:50% 50% 50% 0;background:#DC0037;box-shadow:0 1px 4px rgba(0,0,0,.35);transform:rotate(-45deg)"></div>',
        iconSize: [26, 26],
        iconAnchor: [13, 26]
      });
    }
    
    L.marker([lat, lng], { icon }).addTo(leadMap);
    
    // Grayscale logic handled via CSS
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    activeTab.value = 'overview';
    if (props.lead?.id) {
       loadActivities();
       nextTick(() => {
         initLeadMap();
       });
    }
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'overview') {
     nextTick(() => {
       initLeadMap();
     });
  } else if (newTab === 'meetings') {
    if (typeof meetings !== 'undefined' && meetings.value && meetings.value.length === 0 && typeof loadingMeetings !== 'undefined' && !loadingMeetings.value) {
      loadMeetings();
    }
  }
});

async function loadActivities() {
  if (!props.lead?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    const data = await getLeadActivities(props.lead.id, tenantId);
    // Normalize: backend stores 'action', frontend expects 'type'
    activities.value = (data || []).map(a => ({ ...a, type: a.type || a.action || 'updated' }));
  } catch (error) {
    console.error('[LeadDetailModal] Failed to load activities:', error);
    activities.value = [];
  } finally {
    loadingActivities.value = false;
  }
}

async function deleteActivity(activityId) {
  if (!activityId) return;
  const ok = await showConfirmDialog('DELETE ACTIVITY', 'Permanently delete this activity record? This cannot be undone.', true);
  if (!ok) return;
  try {
    await deleteLeadActivity(activityId, getTenantId());
    activities.value = activities.value.filter(a => a.id !== activityId);
  } catch (err) {
    console.error('[LeadDetailModal] Failed to delete activity:', err);
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).toUpperCase();
  } catch { return 'N/A'; }
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatStage(stage) {
  if (!stage) return 'NEW';
  return stage.replace(/_/g, ' ').toUpperCase();
}

function toTitleCase(str) {
  if (!str) return 'N/A';
  return String(str).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatActivityType(type) {
  return type
    .replace('communication:', '')
    .replace(':create', '')
    .replace(':update', '')
    .replace(':delete', '')
    .replace(/_/g, ' ')
    .toUpperCase();
}

function getPriorityColor(priority) {
  if (priority === 'hot') return 'text-red-600';
  if (priority === 'warm') return 'text-orange-600';
  if (priority === 'cold') return 'text-blue-600';
  return 'text-gray-400';
}

function getUserInitials(email) {
  if (!email) return 'SY';
  return email.charAt(0).toUpperCase() + (email.split('@')[0].charAt(1) || '').toUpperCase();
}

function getActivityLucideIcon(type) {
  if (!type) return Info;
  const icons = {
    'created': Plus,
    'updated': SquarePen,
    'deleted': Trash2,
    'communication:email': Mail,
    'communication:call': Phone,
    'communication:whatsapp': MessageSquare,
    'note': FileText,
    'convert': RefreshCw,
    'contact:create': UserPlus,
    'appointment:create': CalendarPlus,
    'appointment:update': CalendarCheck,
    'visit:create': MapPin,
    'meeting:create': Video,
    'note:create': FileText,
    'document:upload': Paperclip,
    'WhatsApp': MessageSquare,
    'Phone Call': Phone
  };
  return icons[type?.toLowerCase()] || Info;
}

function getActivityColorClass(type) {
  if (!type) return 'bg-gray-400';
  const colors = {
    'created': 'bg-emerald-500',
    'updated': 'bg-blue-500',
    'deleted': 'bg-red-500',
    'communication:email': 'bg-indigo-500',
    'communication:call': 'bg-emerald-600',
    'communication:whatsapp': 'bg-green-500',
    'note': 'bg-amber-500',
    'convert': 'bg-purple-600',
    'contact:create': 'bg-cyan-500',
    'appointment:create': 'bg-orange-500',
    'appointment:update': 'bg-orange-600',
    'visit:create': 'bg-rose-500',
    'meeting:create': 'bg-violet-500',
    'note:create': 'bg-amber-500',
    'document:upload': 'bg-sky-500',
    'WhatsApp': 'bg-green-500',
    'Phone Call': 'bg-emerald-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400';
}

// =========================
// MEETINGS
// =========================
const meetings = ref([]);
const loadingMeetings = ref(false);
const showMeetingForm = ref(false);
const editingMeetingId = ref(null);
const savingMeeting = ref(false);
const meetingError = ref('');
const emptyMeeting = () => ({
  title: '',
  meeting_type: 'call',
  location: '',
  start_datetime: '',
  end_datetime: '',
  agenda: '',
  lat: null,
  lng: null,
  location_name: ''
});
const newMeeting = ref(emptyMeeting());

// Meeting location state
const meetingLocationSearch = ref('');
const meetingLocationResults = ref([]);
const isSearchingLocation = ref(false);
const isLocatingDevice = ref(false);
const meetingDistance = ref(null);
const meetingManualLat = ref(null);
const meetingManualLng = ref(null);
const showManualLocation = ref(false);

// Lead location state
const leadLocationSearch = ref('');
const leadLocationResults = ref([]);
const leadManualCity = ref('');
const leadLocationSet = computed(() => !!(props.lead?.location?.lat && props.lead?.location?.lng));

async function loadMeetings() {
  if (!props.lead?.id) return;
  loadingMeetings.value = true;
  try {
    const res = await getMeetings(getTenantId(), { related_record_id: props.lead.id, limit: 100 });
    meetings.value = Array.isArray(res) ? res : (res?.items || res?.data || []);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to load meetings:', error);
    meetings.value = [];
  } finally {
    loadingMeetings.value = false;
  }
}

function cancelMeetingForm() {
  showMeetingForm.value = false;
  editingMeetingId.value = null;
  newMeeting.value = emptyMeeting();
  meetingError.value = '';
  meetingDistance.value = null;
  meetingLocationSearch.value = '';
  meetingLocationResults.value = [];
  showManualLocation.value = false;
  meetingManualLat.value = null;
  meetingManualLng.value = null;
}

function searchMeetingLocation() {
  const q = meetingLocationSearch.value.trim();
  if (!q) return;
  isSearchingLocation.value = true;
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    // Fallback: use a simple geocode via OpenStreetMap Nominatim
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`)
      .then(r => r.json())
      .then(data => {
        meetingLocationResults.value = data.map(d => ({
          label: d.display_name,
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon)
        }));
      })
      .catch(() => { meetingLocationResults.value = []; })
      .finally(() => { isSearchingLocation.value = false; });
  } else {
    // Use Google Places
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: q, types: ['geocode'] }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        meetingLocationResults.value = predictions.map(p => ({ label: p.description, placeId: p.place_id, lat: null, lng: null }));
      } else {
        meetingLocationResults.value = [];
      }
      isSearchingLocation.value = false;
    });
  }
}

function selectMeetingLocation(result) {
  newMeeting.value.location_name = result.label;
  if (result.lat && result.lng) {
    newMeeting.value.lat = result.lat;
    newMeeting.value.lng = result.lng;
  } else if (result.placeId && window.google?.maps?.places) {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails({ placeId: result.placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        newMeeting.value.lat = place.geometry.location.lat();
        newMeeting.value.lng = place.geometry.location.lng();
      }
    });
  }
  newMeeting.value.location = result.label;
  meetingLocationResults.value = [];
  meetingLocationSearch.value = '';
  calcMeetingDistance();
}

function calcMeetingDistance() {
  const mLat = newMeeting.value.lat;
  const mLng = newMeeting.value.lng;
  const leadLoc = props.lead?.location;
  if (!mLat || !mLng || !leadLoc?.lat || !leadLoc?.lng) {
    meetingDistance.value = null;
    return;
  }
  const R = 6371;
  const dLat = (leadLoc.lat - mLat) * Math.PI / 180;
  const dLng = (leadLoc.lng - mLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(leadLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  meetingDistance.value = R * c;
}

function calcMeetingDistanceStatic(meeting) {
  const leadLoc = props.lead?.location;
  if (!meeting.lat || !meeting.lng || !leadLoc?.lat || !leadLoc?.lng) return '';
  const R = 6371;
  const dLat = (leadLoc.lat - meeting.lat) * Math.PI / 180;
  const dLng = (leadLoc.lng - meeting.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(meeting.lat * Math.PI / 180) * Math.cos(leadLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return d < 1 ? (d * 1000).toFixed(0) + 'm' : d.toFixed(2) + 'km';
}

function formatMeetingDistance(meeting) {
  // Use saved backend distance if available
  if (meeting.distance_km != null) {
    const d = meeting.distance_km;
    return d < 1 ? (d * 1000).toFixed(0) + 'm' : d.toFixed(2) + 'km';
  }
  // Fallback to frontend calculation
  return calcMeetingDistanceStatic(meeting);
}

function useCurrentLocation() {
  if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
  isLocatingDevice.value = true;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      newMeeting.value.lat = pos.coords.latitude;
      newMeeting.value.lng = pos.coords.longitude;
      newMeeting.value.location_name = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      newMeeting.value.location = `CURRENT_LOCATION (${newMeeting.value.location_name})`;
      isLocatingDevice.value = false;
      calcMeetingDistance();
    },
    () => { isLocatingDevice.value = false; alert('Could not get current location. Please enable location access.'); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function applyManualLocation() {
  const lat = parseFloat(meetingManualLat.value);
  const lng = parseFloat(meetingManualLng.value);
  if (isNaN(lat) || isNaN(lng)) { alert('Enter valid latitude and longitude values.'); return; }
  newMeeting.value.lat = lat;
  newMeeting.value.lng = lng;
  newMeeting.value.location_name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  newMeeting.value.location = `MANUAL (${newMeeting.value.location_name})`;
  showManualLocation.value = false;
  calcMeetingDistance();
}

function openDirections() {
  const mLat = newMeeting.value.lat;
  const mLng = newMeeting.value.lng;
  if (!mLat || !mLng) return;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${mLat},${mLng}`;
  window.open(url, '_blank');
}

function searchLeadLocation() {
  const q = leadLocationSearch.value.trim();
  if (!q) return;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`)
    .then(r => r.json())
    .then(data => {
      leadLocationResults.value = data.map(d => ({
        label: d.display_name,
        lat: parseFloat(d.lat),
        lng: parseFloat(d.lon)
      }));
    })
    .catch(() => { leadLocationResults.value = []; });
}

function selectLeadLocation(result) {
  if (!props.lead?.id) return;
  const tenantId = getTenantId();
  if (!tenantId) return;
  // Save the location to the lead via API
  const updatePayload = {
    location: { lat: result.lat, lng: result.lng },
    city: result.label.split(',')[0]?.trim() || '',
    country: result.label.split(',').pop()?.trim() || ''
  };
  updateLead(props.lead.id, updatePayload).then(() => {
    if (props.lead) {
      props.lead.location = updatePayload.location;
      props.lead.city = updatePayload.city;
      props.lead.country = updatePayload.country;
    }
    leadLocationResults.value = [];
    leadLocationSearch.value = '';
    calcMeetingDistance();
  }).catch(() => alert('Failed to save lead location.'));
}

async function saveLeadLocation() {
  const city = leadManualCity.value.trim();
  if (!city) return;
  if (!props.lead?.id) return;
  const tenantId = getTenantId();
  if (!tenantId) return;
  // Geocode the city name
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
    const data = await res.json();
    if (data.length > 0) {
      const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      await updateLead(props.lead.id, { location: loc, city }, tenantId);
      if (props.lead) {
        props.lead.location = loc;
        props.lead.city = city;
      }
      leadManualCity.value = '';
      calcMeetingDistance();
    } else {
      alert('Could not find that location. Try a more specific name.');
    }
  } catch { alert('Failed to geocode location.'); }
}

function toDatetimeLocal(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  } catch { return ''; }
}

function editMeeting(meeting) {
  editingMeetingId.value = meeting.id;
  newMeeting.value = {
    title: meeting.title || '',
    meeting_type: meeting.meeting_type || 'call',
    location: meeting.location || '',
    start_datetime: toDatetimeLocal(meeting.start_datetime || meeting.start_time),
    end_datetime: toDatetimeLocal(meeting.end_datetime || meeting.end_time),
    agenda: meeting.agenda || meeting.description || '',
    lat: meeting.lat || null,
    lng: meeting.lng || null,
    location_name: meeting.location_name || ''
  };
  showMeetingForm.value = true;
}

async function saveMeeting() {
  meetingError.value = '';
  if (!props.lead?.id) {
    meetingError.value = 'Cannot create meeting: lead ID is missing. Please reopen this lead and try again.';
    return;
  }
  if (!newMeeting.value.title?.trim()) {
    meetingError.value = 'Meeting title is required.';
    return;
  }
  if (!newMeeting.value.start_datetime || !newMeeting.value.end_datetime) {
    meetingError.value = 'Start and end date/time are required.';
    return;
  }
  const startDt = new Date(newMeeting.value.start_datetime);
  const endDt = new Date(newMeeting.value.end_datetime);
  if (isNaN(startDt.getTime()) || isNaN(endDt.getTime())) {
    meetingError.value = 'Invalid start or end date/time.';
    return;
  }
  if (endDt <= startDt) {
    meetingError.value = 'End date/time must be after start date/time.';
    return;
  }
  const tenantId = getTenantId();
  if (!tenantId) {
    meetingError.value = 'Tenant ID is missing. Please log out and log back in.';
    return;
  }
  const organizerEmail = getUserEmail() || '';
  const organizerUserId = getUserId() || organizerEmail;
  if (!organizerUserId) {
    meetingError.value = 'Cannot determine the current user. Please log out and log back in.';
    return;
  }
  savingMeeting.value = true;
  try {
    // Calculate distance between meeting location and lead location
    let distanceKm = null;
    if (newMeeting.value.lat && newMeeting.value.lng && props.lead?.location?.lat && props.lead?.location?.lng) {
      const mLat = newMeeting.value.lat;
      const mLng = newMeeting.value.lng;
      const lLat = props.lead.location.lat;
      const lLng = props.lead.location.lng;
      const R = 6371;
      const dLat = (lLat - mLat) * Math.PI / 180;
      const dLng = (lLng - mLng) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(lLat * Math.PI / 180) * Math.sin(dLng/2)**2;
      distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    const payload = {
      tenant_id: tenantId,
      title: newMeeting.value.title.trim(),
      meeting_type: newMeeting.value.meeting_type || 'call',
      location_type: newMeeting.value.meeting_type === 'in_person' ? 'physical' : ((newMeeting.value.location || '').match(/^https?:\/\//i) ? 'virtual' : (newMeeting.value.location ? 'physical' : 'virtual')),
      location: newMeeting.value.location || '',
      lat: newMeeting.value.lat,
      lng: newMeeting.value.lng,
      location_name: newMeeting.value.location_name || '',
      distance_km: distanceKm,
      start_datetime: startDt.toISOString(),
      end_datetime: endDt.toISOString(),
      agenda: newMeeting.value.agenda || '',
      organizer_id: String(organizerUserId),
      organizer_name: getUserName() || organizerEmail || 'Unknown',
      created_by: organizerEmail || String(organizerUserId),
      participants: organizerEmail ? [{
        user_id: String(organizerUserId),
        name: getUserName() || organizerEmail,
        email: organizerEmail,
        type: 'internal'
      }] : [],
      related_records: [{
        record_type: 'lead',
        record_id: String(props.lead.id),
        record_name: props.lead.name || ''
      }]
    };
    const meetingTitle = newMeeting.value.title;
    const isUpdate = !!editingMeetingId.value;
    if (editingMeetingId.value) {
      await updateMeeting(editingMeetingId.value, payload);
    } else {
      await createMeeting(payload);
    }
    cancelMeetingForm();
    await loadMeetings();
    const isPhysical = newMeeting.value.meeting_type === 'in_person';
    const locNote = isPhysical && newMeeting.value.lat ? ` at ${newMeeting.value.location_name || ''} (${newMeeting.value.lat?.toFixed(4)}, ${newMeeting.value.lng?.toFixed(4)})` : '';
    const distNote = distanceKm !== null ? ` | Distance: ${distanceKm < 1 ? (distanceKm * 1000).toFixed(0) + 'm' : distanceKm.toFixed(2) + 'km'}` : '';
    await logActivity('meeting:create', `Meeting "${meetingTitle}" ${isUpdate ? 'updated' : 'created'}${locNote}${distNote}`);
    await loadActivities();
  } catch (error) {
    console.error('[LeadDetailModal] Failed to save meeting:', error);
    const apiMsg = error?.message || error?.data?.detail || error?.data?.message || '';
    meetingError.value = apiMsg
      ? `Failed to save meeting: ${apiMsg}`
      : 'Failed to save meeting. Please check your connection and try again.';
  } finally {
    savingMeeting.value = false;
  }
}

async function deleteMeetingRecord(meeting) {
  if (!meeting?.id) return;
  const ok = await showConfirmDialog('DELETE MEETING', `Permanently delete meeting "${meeting.title || 'this record'}"? This cannot be undone.`, true);
  if (!ok) return;
  try {
    await deleteMeeting(meeting.id, getTenantId());
    meetings.value = meetings.value.filter(m => m.id !== meeting.id);
  } catch (error) {
    console.error('[LeadDetailModal] Failed to delete meeting:', error);
    const apiMsg = error?.message || error?.data?.detail || error?.data?.message || '';
    alert(apiMsg ? `Failed to delete meeting: ${apiMsg}` : 'Failed to delete meeting. Please try again.');
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            _cache[128] || (_cache[128] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]" }, null, -1)),
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("div", _hoisted_4$1, [
                _cache[47] || (_cache[47] = createBaseVNode("div", { class: "w-1 h-5 bg-[#2F2E8B] shrink-0" }, null, -1)),
                createBaseVNode("div", _hoisted_5$1, [
                  createBaseVNode("div", _hoisted_6$1, [
                    _cache[46] || (_cache[46] = createBaseVNode("span", { class: "text-[11px] font-mono font-black text-gray-500 uppercase tracking-[0.15em]" }, "Lead_Entity // Details", -1)),
                    (__props.lead?.id)
                      ? (openBlock(), createElementBlock("span", _hoisted_7$1, "ID:" + toDisplayString(__props.lead.id.substring(0, 8)), 1))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("h3", _hoisted_8$1, [
                    createTextVNode(toDisplayString(__props.lead?.name || 'NAMELESS_LEAD') + " ", 1),
                    (__props.lead?.company)
                      ? (openBlock(), createElementBlock("span", _hoisted_9$1, "// " + toDisplayString(__props.lead.company), 1))
                      : createCommentVNode("", true)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("div", {
                  class: "relative",
                  onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
                }, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = $event => (showExportMenu.value = !showExportMenu.value)),
                    class: "w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all",
                    title: "Export Report"
                  }, [...(_cache[48] || (_cache[48] = [
                    createBaseVNode("i", { class: "fas fa-download text-[12px]" }, null, -1)
                  ]))]),
                  (showExportMenu.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                        createBaseVNode("button", {
                          onClick: _cache[1] || (_cache[1] = $event => (exportReport('pdf'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50"
                        }, [...(_cache[49] || (_cache[49] = [
                          createBaseVNode("i", { class: "fas fa-file-pdf text-red-500 text-[10px] w-4" }, null, -1),
                          createTextVNode(" PDF ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: _cache[2] || (_cache[2] = $event => (exportReport('docx'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50"
                        }, [...(_cache[50] || (_cache[50] = [
                          createBaseVNode("i", { class: "fas fa-file-word text-blue-500 text-[10px] w-4" }, null, -1),
                          createTextVNode(" DOCX ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: _cache[3] || (_cache[3] = $event => (exportReport('xlsx'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2"
                        }, [...(_cache[51] || (_cache[51] = [
                          createBaseVNode("i", { class: "fas fa-file-excel text-green-600 text-[10px] w-4" }, null, -1),
                          createTextVNode(" XLSX ", -1)
                        ]))])
                      ]))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("button", {
                  onClick: _cache[5] || (_cache[5] = $event => (_ctx.$emit('edit', __props.lead))),
                  class: "w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all",
                  title: "Edit"
                }, [
                  createVNode(unref(SquarePen), { size: 14 })
                ]),
                createBaseVNode("button", {
                  onClick: _cache[6] || (_cache[6] = $event => (_ctx.$emit('update:modelValue', false))),
                  class: "w-8 h-8 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_12$1, [
              (__props.lead?.archived)
                ? (openBlock(), createElementBlock("div", _hoisted_13$1, "Archived — Restore to re-activate."))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_14$1, [
                createBaseVNode("button", {
                  onClick: _cache[7] || (_cache[7] = $event => (_origCall(__props.lead))),
                  class: "px-4 py-2 bg-emerald-600 text-white border border-emerald-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-2 relative overflow-hidden group"
                }, [
                  _cache[52] || (_cache[52] = createBaseVNode("span", { class: "absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, null, -1)),
                  createVNode(unref(Phone), {
                    size: 14,
                    class: "relative z-10"
                  }),
                  _cache[53] || (_cache[53] = createBaseVNode("span", { class: "relative z-10" }, "CALL", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = $event => (_origWhatsapp(__props.lead))),
                  class: "px-4 py-2 bg-green-600 text-white border border-green-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all flex items-center gap-2 relative overflow-hidden group"
                }, [
                  _cache[54] || (_cache[54] = createBaseVNode("span", { class: "absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, null, -1)),
                  createVNode(unref(MessageSquare), {
                    size: 14,
                    class: "relative z-10"
                  }),
                  _cache[55] || (_cache[55] = createBaseVNode("span", { class: "relative z-10" }, "WHATSAPP", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[9] || (_cache[9] = $event => (_origEmail(__props.lead))),
                  class: "px-4 py-2 bg-[#2F2E8B] text-white border border-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] hover:shadow-lg hover:shadow-[#2F2E8B]/20 transition-all flex items-center gap-2 relative overflow-hidden group"
                }, [
                  _cache[56] || (_cache[56] = createBaseVNode("span", { class: "absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, null, -1)),
                  createVNode(unref(Mail), {
                    size: 14,
                    class: "relative z-10"
                  }),
                  _cache[57] || (_cache[57] = createBaseVNode("span", { class: "relative z-10" }, "MAIL", -1))
                ]),
                (__props.lead?.archived)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: _cache[10] || (_cache[10] = $event => {_ctx.$emit('archive', __props.lead); _ctx.$emit('update:modelValue', false);}),
                      class: "px-4 py-2 bg-amber-500 text-white border border-amber-500 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 relative overflow-hidden group"
                    }, [
                      _cache[58] || (_cache[58] = createBaseVNode("span", { class: "absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, null, -1)),
                      createVNode(unref(ArchiveRestore), {
                        size: 14,
                        class: "relative z-10"
                      }),
                      _cache[59] || (_cache[59] = createBaseVNode("span", { class: "relative z-10" }, "RESTORE", -1))
                    ]))
                  : (openBlock(), createElementBlock("button", {
                      key: 1,
                      onClick: _cache[11] || (_cache[11] = $event => (_origConvert(__props.lead))),
                      class: "px-4 py-2 bg-[#2F2E8B] text-white border border-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] hover:shadow-lg hover:shadow-[#2F2E8B]/20 transition-all flex items-center gap-2 relative overflow-hidden group"
                    }, [
                      _cache[60] || (_cache[60] = createBaseVNode("span", { class: "absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, null, -1)),
                      createVNode(unref(RefreshCw), {
                        size: 14,
                        class: "relative z-10"
                      }),
                      _cache[61] || (_cache[61] = createBaseVNode("span", { class: "relative z-10" }, "CONVERT", -1))
                    ]))
              ])
            ]),
            createBaseVNode("div", _hoisted_15$1, [
              createBaseVNode("div", _hoisted_16$1, [
                (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                  return createBaseVNode("button", {
                    key: tab.id,
                    onClick: $event => (activeTab.value = tab.id),
                    class: normalizeClass([activeTab.value === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] font-black' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold', "py-3 border-b-2 text-[11px] font-mono uppercase tracking-[0.15em] transition-all flex items-center gap-1.5"])
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(tab.icon), { size: 14 })),
                    createTextVNode(" " + toDisplayString(tab.label), 1)
                  ], 10, _hoisted_17$1)
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_18$1, [
              _cache[124] || (_cache[124] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
              createBaseVNode("div", _hoisted_19$1, [
                (activeTab.value === 'overview')
                  ? (openBlock(), createElementBlock("div", _hoisted_20$1, [
                      createBaseVNode("div", _hoisted_21$1, [
                        createBaseVNode("div", _hoisted_22$1, [
                          createBaseVNode("div", _hoisted_23$1, [
                            _cache[62] || (_cache[62] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Lead Age", -1)),
                            createBaseVNode("span", _hoisted_24$1, toDisplayString(leadAgeDays.value) + " day" + toDisplayString(leadAgeDays.value !== 1 ? 's' : ''), 1),
                            createBaseVNode("span", _hoisted_25$1, "since " + toDisplayString(formatDate(__props.lead?.created_at)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_26$1, [
                            _cache[63] || (_cache[63] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Stage", -1)),
                            createBaseVNode("span", _hoisted_27$1, toDisplayString(formatStage(__props.lead?.stage)), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_28$1, [
                          createBaseVNode("div", _hoisted_29$1, [
                            createBaseVNode("div", {
                              class: "h-full bg-gradient-to-r from-[#2F2E8B] to-blue-400 rounded-full transition-all duration-500",
                              style: normalizeStyle({ width: stageProgressPct.value + '%' })
                            }, null, 4)
                          ]),
                          createBaseVNode("div", _hoisted_30$1, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(stageList.value, (stg, stgIdx) => {
                              return (openBlock(), createElementBlock("div", {
                                key: stgIdx,
                                class: "flex flex-col items-center",
                                style: normalizeStyle({ width: (100 / stageList.value.length) + '%' })
                              }, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["w-3.5 h-3.5 rounded-full border-2 mb-1 transition-colors", getStageDotClass(stgIdx)])
                                }, null, 2),
                                createBaseVNode("span", _hoisted_31$1, toDisplayString(stg.label), 1)
                              ], 4))
                            }), 128))
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_32$1, [
                        _cache[70] || (_cache[70] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                          createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5" }, [
                            createBaseVNode("span", { class: "w-1 h-3 bg-[#2F2E8B]" }),
                            createTextVNode(" Strategic_Parameters ")
                          ])
                        ], -1)),
                        createBaseVNode("div", _hoisted_33$1, [
                          createBaseVNode("div", _hoisted_34$1, [
                            _cache[64] || (_cache[64] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5" }, "Priority", -1)),
                            createBaseVNode("div", {
                              class: normalizeClass([getPriorityColor(__props.lead?.priority), "text-sm font-mono font-black uppercase tracking-tighter"])
                            }, toDisplayString(__props.lead?.priority || 'NONE'), 3)
                          ]),
                          createBaseVNode("div", _hoisted_35$1, [
                            _cache[65] || (_cache[65] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5" }, "Stage", -1)),
                            createBaseVNode("div", _hoisted_36$1, toDisplayString(formatStage(__props.lead?.stage)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_37$1, [
                            _cache[66] || (_cache[66] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-0.5" }, "Valuation", -1)),
                            createBaseVNode("div", _hoisted_38$1, toDisplayString(unref(formatCurrency)(__props.lead?.value || 0)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_39$1, [
                            _cache[67] || (_cache[67] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-0.5" }, "Source", -1)),
                            createBaseVNode("div", _hoisted_40$1, toDisplayString(__props.lead?.source || 'N/A'), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_41$1, [
                          createBaseVNode("div", _hoisted_42$1, [
                            createBaseVNode("span", _hoisted_43$1, [
                              _cache[68] || (_cache[68] = createTextVNode("CAC ", -1)),
                              (cacSaved.value)
                                ? (openBlock(), createElementBlock("span", _hoisted_44$1, [
                                    createVNode(unref(CircleCheck), {
                                      size: 10,
                                      class: "inline text-[#2F2E8B]"
                                    })
                                  ]))
                                : createCommentVNode("", true)
                            ]),
                            createBaseVNode("div", _hoisted_45$1, [
                              createBaseVNode("span", _hoisted_46$1, toDisplayString(unref(currencySymbol)), 1),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((localCac).value = $event)),
                                type: "number",
                                min: "0",
                                step: "0.01",
                                onBlur: saveCac,
                                onKeyup: withKeys(saveCac, ["enter"]),
                                class: "w-20 bg-white border border-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none px-1.5 py-1 text-xs font-mono font-black text-gray-900 text-right",
                                placeholder: "0"
                              }, null, 544), [
                                [
                                  vModelText,
                                  localCac.value,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              createBaseVNode("button", {
                                onClick: saveCac,
                                disabled: savingCac.value,
                                class: "px-2 py-1 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all disabled:opacity-50"
                              }, toDisplayString(savingCac.value ? '...' : cacSaved.value ? 'SAVED' : 'UPDATE'), 9, _hoisted_47$1)
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_48$1, [
                            _cache[69] || (_cache[69] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1" }, "Adjust:", -1)),
                            createBaseVNode("span", _hoisted_49$1, toDisplayString(unref(currencySymbol)), 1),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((cacAdjustAmount).value = $event)),
                              type: "number",
                              min: "0",
                              step: "0.01",
                              class: "w-16 bg-white border border-gray-200 focus:border-[#2F2E8B] outline-none px-1 py-0.5 text-[10px] font-mono font-black text-gray-900 text-right",
                              placeholder: "0"
                            }, null, 512), [
                              [
                                vModelText,
                                cacAdjustAmount.value,
                                void 0,
                                { number: true }
                              ]
                            ]),
                            createBaseVNode("button", {
                              onClick: _cache[14] || (_cache[14] = $event => (applyCacAdjust('subtract'))),
                              class: "px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all rounded"
                            }, "− Subtract"),
                            createBaseVNode("button", {
                              onClick: _cache[15] || (_cache[15] = $event => (applyCacAdjust('add'))),
                              class: "px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all rounded"
                            }, "+ Add")
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_50$1, [
                        _cache[76] || (_cache[76] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                          createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5" }, [
                            createBaseVNode("span", { class: "w-1 h-3 bg-[#2F2E8B]" }),
                            createTextVNode(" Attributes ")
                          ])
                        ], -1)),
                        createBaseVNode("div", _hoisted_51$1, [
                          createBaseVNode("div", null, [
                            _cache[71] || (_cache[71] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Email", -1)),
                            createBaseVNode("a", {
                              href: 'mailto:' + __props.lead?.email,
                              class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase flex items-center gap-1"
                            }, [
                              createVNode(unref(Mail), { size: 10 }),
                              createTextVNode(" " + toDisplayString(__props.lead?.email || 'UNDEFINED'), 1)
                            ], 8, _hoisted_52$1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[72] || (_cache[72] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Phone", -1)),
                            createBaseVNode("a", {
                              href: 'tel:' + __props.lead?.phone,
                              class: "text-[11px] font-mono font-black text-gray-900 uppercase flex items-center gap-1"
                            }, [
                              createVNode(unref(Phone), {
                                size: 10,
                                class: "text-[#2F2E8B]"
                              }),
                              createTextVNode(" " + toDisplayString(__props.lead?.phone || 'NO_RECORD'), 1)
                            ], 8, _hoisted_53$1)
                          ]),
                          (__props.lead?.position)
                            ? (openBlock(), createElementBlock("div", _hoisted_54$1, [
                                _cache[73] || (_cache[73] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Position", -1)),
                                createBaseVNode("p", _hoisted_55$1, [
                                  createVNode(unref(Briefcase), { size: 10 }),
                                  createTextVNode(" " + toDisplayString(__props.lead.position), 1)
                                ])
                              ]))
                            : createCommentVNode("", true),
                          createBaseVNode("div", null, [
                            _cache[74] || (_cache[74] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Location", -1)),
                            createBaseVNode("p", _hoisted_56$1, [
                              createVNode(unref(MapPin), {
                                size: 10,
                                class: "text-[#2F2E8B]"
                              }),
                              createTextVNode(" " + toDisplayString(__props.lead?.city ? __props.lead.city + ',' : '') + " " + toDisplayString(__props.lead?.country || 'GLOBAL'), 1)
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_57$1, [
                            _cache[75] || (_cache[75] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Links", -1)),
                            createBaseVNode("div", _hoisted_58$1, [
                              (__props.lead?.website)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 0,
                                    href: __props.lead.website,
                                    target: "_blank",
                                    class: "w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                                  }, [
                                    createVNode(unref(Globe), { size: 12 })
                                  ], 8, _hoisted_59$1))
                                : createCommentVNode("", true),
                              (__props.lead?.linkedin)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 1,
                                    href: __props.lead.linkedin,
                                    target: "_blank",
                                    class: "w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                                  }, [
                                    createVNode(unref(Linkedin), { size: 12 })
                                  ], 8, _hoisted_60$1))
                                : createCommentVNode("", true),
                              (__props.lead?.twitter)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 2,
                                    href: 'https://twitter.com/' + __props.lead.twitter.replace('@', ''),
                                    target: "_blank",
                                    class: "w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                                  }, [
                                    createVNode(unref(Twitter), { size: 12 })
                                  ], 8, _hoisted_61$1))
                                : createCommentVNode("", true),
                              (__props.lead?.facebook)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 3,
                                    href: __props.lead.facebook,
                                    target: "_blank",
                                    class: "w-7 h-7 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                                  }, [
                                    createVNode(unref(Facebook), { size: 12 })
                                  ], 8, _hoisted_62$1))
                                : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ]),
                      (__props.lead?.location?.lat && __props.lead?.location?.lng)
                        ? (openBlock(), createElementBlock("div", _hoisted_63$1, [...(_cache[77] || (_cache[77] = [
                            createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5" }, [
                              createBaseVNode("span", { class: "w-1 h-3 bg-[#2F2E8B]" }),
                              createTextVNode(" Location_Map ")
                            ], -1),
                            createBaseVNode("div", { class: "bg-gray-100 border border-gray-200 h-36 w-full overflow-hidden relative" }, [
                              createBaseVNode("div", {
                                id: "lead-preview-map",
                                class: "w-full h-full"
                              })
                            ], -1)
                          ]))]))
                        : createCommentVNode("", true),
                      (__props.lead?.notes)
                        ? (openBlock(), createElementBlock("div", _hoisted_64$1, [
                            _cache[78] || (_cache[78] = createBaseVNode("h4", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5" }, [
                              createBaseVNode("span", { class: "w-1 h-3 bg-[#2F2E8B]" }),
                              createTextVNode(" Notes ")
                            ], -1)),
                            createBaseVNode("div", _hoisted_65$1, [
                              createBaseVNode("p", _hoisted_66$1, toDisplayString(__props.lead.notes), 1)
                            ])
                          ]))
                        : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_67$1, [
                        _cache[83] || (_cache[83] = createBaseVNode("h5", { class: "text-[9px] font-mono font-black text-gray-500 uppercase tracking-wider mb-2" }, "Metadata", -1)),
                        createBaseVNode("div", _hoisted_68$1, [
                          createBaseVNode("div", null, [
                            _cache[79] || (_cache[79] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Created", -1)),
                            createBaseVNode("span", _hoisted_69$1, toDisplayString(formatDate(__props.lead?.created_at)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[80] || (_cache[80] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Updated", -1)),
                            createBaseVNode("span", _hoisted_70$1, toDisplayString(formatDate(__props.lead?.updatedAt)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[81] || (_cache[81] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Assignee", -1)),
                            (__props.lead?.assignedTo)
                              ? (openBlock(), createElementBlock("div", _hoisted_71$1, [
                                  createBaseVNode("div", _hoisted_72$1, toDisplayString(getUserInitials(__props.lead.assignedTo)), 1),
                                  createBaseVNode("span", _hoisted_73$1, toDisplayString(__props.lead.assignedTo.split('@')[0]), 1)
                                ]))
                              : (openBlock(), createElementBlock("span", _hoisted_74$1, "UNASSIGNED"))
                          ]),
                          createBaseVNode("div", null, [
                            _cache[82] || (_cache[82] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-0.5" }, "Owner", -1)),
                            createBaseVNode("span", _hoisted_75$1, toDisplayString(__props.lead?.owner?.split('@')[0] || 'SYSTEM'), 1)
                          ])
                        ])
                      ])
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'activities')
                  ? (openBlock(), createElementBlock("div", _hoisted_76$1, [
                      (loadingActivities.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_77$1, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[84] || (_cache[84] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Retreiving_Interaction_Log...", -1))
                          ]))
                        : (activities.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_78$1, [
                              _cache[87] || (_cache[87] = createBaseVNode("div", { class: "absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#2F2E8B] via-blue-400 to-gray-200 rounded-full opacity-20" }, null, -1)),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(activities.value, (activity, aIdx) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: activity.id,
                                  class: "relative pb-3 last:pb-1"
                                }, [
                                  createBaseVNode("div", {
                                    class: normalizeClass(["absolute left-[19px] top-[18px] w-[14px] h-[2px] rounded-r-full", aIdx === 0 ? 'bg-[#2F2E8B]/30' : 'bg-gray-200'])
                                  }, null, 2),
                                  createBaseVNode("div", _hoisted_79$1, [
                                    createBaseVNode("div", _hoisted_80$1, [
                                      (aIdx === 0)
                                        ? (openBlock(), createElementBlock("div", {
                                            key: 0,
                                            class: normalizeClass(["absolute inset-0 rounded-full animate-ping opacity-15", getActivityColorClass(activity.type)])
                                          }, null, 2))
                                        : createCommentVNode("", true),
                                      createBaseVNode("div", {
                                        class: normalizeClass([getActivityColorClass(activity.type), 'w-[14px] h-[14px] rounded-full border-2 border-white shadow-none flex items-center justify-center relative z-10'])
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(getActivityLucideIcon(activity.type)), {
                                          size: 7,
                                          class: "text-white"
                                        }))
                                      ], 2)
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_81$1, [
                                    createBaseVNode("div", _hoisted_82$1, [
                                      createBaseVNode("div", _hoisted_83$1, [
                                        createBaseVNode("div", _hoisted_84$1, [
                                          createBaseVNode("span", {
                                            class: normalizeClass([getActivityColorClass(activity.type)?.replace('bg-', 'text-'), 'text-[11px] font-mono font-black uppercase tracking-widest'])
                                          }, toDisplayString(formatActivityType(activity.type || activity.action || 'event')), 3),
                                          _cache[85] || (_cache[85] = createBaseVNode("span", { class: "w-0.5 h-0.5 bg-gray-300 rounded-full" }, null, -1)),
                                          createBaseVNode("span", _hoisted_85$1, [
                                            createVNode(unref(Clock), {
                                              size: 9,
                                              class: "inline -mt-0.5 mr-0.5"
                                            }),
                                            createTextVNode(" " + toDisplayString(formatDate(activity.createdAt || activity.timestamp)), 1)
                                          ]),
                                          _cache[86] || (_cache[86] = createBaseVNode("span", { class: "w-0.5 h-0.5 bg-gray-300 rounded-full" }, null, -1)),
                                          createBaseVNode("span", _hoisted_86$1, [
                                            createVNode(unref(Users), {
                                              size: 8,
                                              class: "text-gray-300"
                                            }),
                                            createTextVNode(" " + toDisplayString((activity.actor || 'system').split('@')[0]), 1)
                                          ])
                                        ]),
                                        createBaseVNode("p", _hoisted_87, toDisplayString(activity.notes || activity.description || 'NO_DETAILS_RECORDED'), 1),
                                        (activity.lead_id || activity.related_record_id || activity.duration || activity.outcome)
                                          ? (openBlock(), createElementBlock("div", _hoisted_88, [
                                              (activity.lead_id)
                                                ? (openBlock(), createElementBlock("span", _hoisted_89, "Lead: " + toDisplayString(activity.lead_id?.substring(0, 8)), 1))
                                                : createCommentVNode("", true),
                                              (activity.related_record_id)
                                                ? (openBlock(), createElementBlock("span", _hoisted_90, "Related: " + toDisplayString(activity.related_record_id?.substring(0, 8)), 1))
                                                : createCommentVNode("", true),
                                              (activity.duration)
                                                ? (openBlock(), createElementBlock("span", _hoisted_91, toDisplayString(activity.duration), 1))
                                                : createCommentVNode("", true),
                                              (activity.outcome)
                                                ? (openBlock(), createElementBlock("span", _hoisted_92, toDisplayString(activity.outcome), 1))
                                                : createCommentVNode("", true)
                                            ]))
                                          : createCommentVNode("", true)
                                      ]),
                                      createBaseVNode("div", _hoisted_93, [
                                        createBaseVNode("button", {
                                          onClick: $event => (deleteActivity(activity.id)),
                                          class: "w-6 h-6 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 rounded-sm transition-all",
                                          title: "Delete activity"
                                        }, [
                                          createVNode(unref(Trash2), { size: 11 })
                                        ], 8, _hoisted_94)
                                      ])
                                    ])
                                  ])
                                ]))
                              }), 128)),
                              _cache[88] || (_cache[88] = createBaseVNode("div", { class: "relative pl-[26px] pt-1 pb-2" }, [
                                createBaseVNode("div", { class: "flex items-center gap-2 text-[8px] font-mono font-bold text-gray-300 uppercase tracking-[0.3em]" }, [
                                  createBaseVNode("span", { class: "w-4 h-[2px] bg-gray-200 rounded-full" }),
                                  createTextVNode(" END_OF_LOG ")
                                ])
                              ], -1))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_95, [
                              createVNode(unref(GitCommitHorizontal), {
                                size: 36,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[89] || (_cache[89] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "ZERO_ACTIVITY_DETECTED", -1)),
                              _cache[90] || (_cache[90] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "System interaction logs are currently empty. Initialize communications to populate this stream.", -1))
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'contacts')
                  ? (openBlock(), createElementBlock("div", _hoisted_96, [
                      createBaseVNode("div", _hoisted_97, [
                        _cache[92] || (_cache[92] = createBaseVNode("div", null, [
                          createBaseVNode("h4", { class: "text-[10px] font-mono font-black uppercase tracking-widest text-gray-700" }, "Lead Persons"),
                          createBaseVNode("p", { class: "text-[9px] font-mono text-gray-400 mt-0.5 uppercase tracking-widest" }, "Multiple leads associated with this lead entity")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: _cache[16] || (_cache[16] = $event => (showContactForm.value = !showContactForm.value)),
                          class: "px-3 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5"
                        }, [
                          createVNode(unref(Plus), { size: 11 }),
                          _cache[91] || (_cache[91] = createTextVNode(" Add Lead ", -1))
                        ])
                      ]),
                      (showContactForm.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_98, [
                            createBaseVNode("div", _hoisted_99, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((newContact.value.name) = $event)),
                                type: "text",
                                placeholder: "Full Name *",
                                class: "border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]"
                              }, null, 512), [
                                [vModelText, newContact.value.name]
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((newContact.value.position) = $event)),
                                type: "text",
                                placeholder: "Position / Role",
                                class: "border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]"
                              }, null, 512), [
                                [vModelText, newContact.value.position]
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((newContact.value.phone) = $event)),
                                type: "text",
                                placeholder: "Phone",
                                class: "border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]"
                              }, null, 512), [
                                [vModelText, newContact.value.phone]
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((newContact.value.email) = $event)),
                                type: "email",
                                placeholder: "Email",
                                class: "border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B]"
                              }, null, 512), [
                                [vModelText, newContact.value.email]
                              ]),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((newContact.value.company) = $event)),
                                type: "text",
                                placeholder: "Company / Org",
                                class: "border border-gray-200 px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest outline-none focus:border-[#2F2E8B] col-span-2"
                              }, null, 512), [
                                [vModelText, newContact.value.company]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_100, [
                              createBaseVNode("button", {
                                onClick: _cache[22] || (_cache[22] = $event => (showContactForm.value = false)),
                                class: "px-3 py-1.5 border border-gray-200 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-gray-50"
                              }, "Cancel"),
                              createBaseVNode("button", {
                                onClick: addContact,
                                class: "px-4 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88]"
                              }, "Save Lead")
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (contacts.value.length > 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_101, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(contacts.value, (contact) => {
                              return (openBlock(), createElementBlock("div", {
                                key: contact.id,
                                class: "flex items-start gap-4 bg-white border border-gray-100 p-4 hover:border-[#2F2E8B]/30 transition group"
                              }, [
                                createBaseVNode("div", _hoisted_102, [
                                  createVNode(unref(Users), {
                                    size: 18,
                                    class: "text-[#2F2E8B]/40"
                                  })
                                ]),
                                createBaseVNode("div", _hoisted_103, [
                                  createBaseVNode("div", _hoisted_104, [
                                    createBaseVNode("span", _hoisted_105, toDisplayString(contact.name), 1),
                                    (contact.position)
                                      ? (openBlock(), createElementBlock("span", _hoisted_106, toDisplayString(contact.position), 1))
                                      : createCommentVNode("", true)
                                  ]),
                                  createBaseVNode("div", _hoisted_107, [
                                    (contact.company)
                                      ? (openBlock(), createElementBlock("span", _hoisted_108, [
                                          createVNode(unref(Briefcase), { size: 10 }),
                                          createTextVNode(" " + toDisplayString(contact.company), 1)
                                        ]))
                                      : createCommentVNode("", true),
                                    (contact.phone)
                                      ? (openBlock(), createElementBlock("span", _hoisted_109, [
                                          createVNode(unref(Phone), { size: 10 }),
                                          createTextVNode(" " + toDisplayString(contact.phone), 1)
                                        ]))
                                      : createCommentVNode("", true),
                                    (contact.email)
                                      ? (openBlock(), createElementBlock("span", _hoisted_110, [
                                          createVNode(unref(Mail), { size: 10 }),
                                          createTextVNode(" " + toDisplayString(contact.email), 1)
                                        ]))
                                      : createCommentVNode("", true)
                                  ])
                                ]),
                                createBaseVNode("button", {
                                  onClick: $event => (removeContact(contact.id)),
                                  class: "w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                }, [
                                  createVNode(unref(Trash2), { size: 12 })
                                ], 8, _hoisted_111)
                              ]))
                            }), 128))
                          ]))
                        : (!showContactForm.value)
                          ? (openBlock(), createElementBlock("div", _hoisted_112, [
                              createVNode(unref(Users), {
                                size: 28,
                                class: "text-gray-200 mb-3"
                              }),
                              _cache[93] || (_cache[93] = createBaseVNode("h5", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "No Contacts Added", -1)),
                              _cache[94] || (_cache[94] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-1" }, "Add contact persons for this lead above.", -1))
                            ]))
                          : createCommentVNode("", true)
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'meetings')
                  ? (openBlock(), createElementBlock("div", _hoisted_113, [
                      createBaseVNode("div", _hoisted_114, [
                        createBaseVNode("div", _hoisted_115, toDisplayString(meetings.value.length) + " MEETING_RECORD(S)", 1),
                        createBaseVNode("button", {
                          onClick: _cache[23] || (_cache[23] = $event => (showMeetingForm.value = !showMeetingForm.value)),
                          class: normalizeClass([showMeetingForm.value ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white', "px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2"])
                        }, [
                          createVNode(unref(Plus), { size: 12 }),
                          createTextVNode(" " + toDisplayString(showMeetingForm.value ? 'CANCEL' : 'SCHEDULE_MEETING'), 1)
                        ], 2)
                      ]),
                      (showMeetingForm.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_116, [
                            _cache[113] || (_cache[113] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                            createBaseVNode("div", _hoisted_117, [
                              createBaseVNode("div", _hoisted_118, [
                                createBaseVNode("div", _hoisted_119, [
                                  createVNode(unref(Calendar), {
                                    size: 14,
                                    class: "text-white"
                                  })
                                ]),
                                createBaseVNode("div", null, [
                                  createBaseVNode("h4", _hoisted_120, toDisplayString(editingMeetingId.value ? 'EDIT_MEETING_RECORD' : 'NEW_MEETING_RECORD'), 1),
                                  _cache[95] || (_cache[95] = createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-white/50 uppercase tracking-widest mt-0.5" }, "Schedule a meeting with this lead", -1))
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_121, [
                                createBaseVNode("div", _hoisted_122, [
                                  createBaseVNode("div", _hoisted_123, [
                                    _cache[96] || (_cache[96] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Meeting Title *", -1)),
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => ((newMeeting.value.title) = $event)),
                                      type: "text",
                                      placeholder: "MEETING_SUBJECT",
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all"
                                    }, null, 512), [
                                      [vModelText, newMeeting.value.title]
                                    ])
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[98] || (_cache[98] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Meeting Type", -1)),
                                    withDirectives(createBaseVNode("select", {
                                      "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => ((newMeeting.value.meeting_type) = $event)),
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all"
                                    }, [...(_cache[97] || (_cache[97] = [
                                      createBaseVNode("option", { value: "call" }, "Call", -1),
                                      createBaseVNode("option", { value: "demo" }, "Demo", -1),
                                      createBaseVNode("option", { value: "presentation" }, "Presentation", -1),
                                      createBaseVNode("option", { value: "follow_up" }, "Follow-up", -1),
                                      createBaseVNode("option", { value: "in_person" }, "In Person", -1),
                                      createBaseVNode("option", { value: "other" }, "Other", -1)
                                    ]))], 512), [
                                      [vModelSelect, newMeeting.value.meeting_type]
                                    ])
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[99] || (_cache[99] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Location / Link", -1)),
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => ((newMeeting.value.location) = $event)),
                                      type: "text",
                                      placeholder: "OFFICE / ZOOM_LINK",
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 tracking-widest focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all"
                                    }, null, 512), [
                                      [vModelText, newMeeting.value.location]
                                    ])
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[100] || (_cache[100] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Start Date/Time *", -1)),
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => ((newMeeting.value.start_datetime) = $event)),
                                      type: "datetime-local",
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all"
                                    }, null, 512), [
                                      [vModelText, newMeeting.value.start_datetime]
                                    ])
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[101] || (_cache[101] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "End Date/Time *", -1)),
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[28] || (_cache[28] = $event => ((newMeeting.value.end_datetime) = $event)),
                                      type: "datetime-local",
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all"
                                    }, null, 512), [
                                      [vModelText, newMeeting.value.end_datetime]
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_124, [
                                    _cache[102] || (_cache[102] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Agenda / Description", -1)),
                                    withDirectives(createBaseVNode("textarea", {
                                      "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => ((newMeeting.value.agenda) = $event)),
                                      rows: "3",
                                      placeholder: "MEETING_AGENDA_POINTS...",
                                      class: "w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]/20 transition-all resize-none"
                                    }, null, 512), [
                                      [vModelText, newMeeting.value.agenda]
                                    ])
                                  ])
                                ]),
                                (newMeeting.value.meeting_type === 'in_person')
                                  ? (openBlock(), createElementBlock("div", _hoisted_125, [
                                      createBaseVNode("div", _hoisted_126, [
                                        createVNode(unref(MapPin), {
                                          size: 14,
                                          class: "text-green-600"
                                        }),
                                        _cache[103] || (_cache[103] = createBaseVNode("span", { class: "text-[9px] font-mono font-black text-green-700 uppercase tracking-widest" }, "Location & Distance", -1))
                                      ]),
                                      createBaseVNode("div", _hoisted_127, [
                                        createBaseVNode("div", _hoisted_128, [
                                          createBaseVNode("div", _hoisted_129, [
                                            createVNode(unref(Navigation), {
                                              size: 11,
                                              class: "text-[#2F2E8B]"
                                            }),
                                            _cache[104] || (_cache[104] = createBaseVNode("span", { class: "text-[8px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest" }, "Your Location", -1)),
                                            (newMeeting.value.lat)
                                              ? (openBlock(), createElementBlock("span", _hoisted_130, "SET"))
                                              : createCommentVNode("", true)
                                          ]),
                                          createBaseVNode("div", _hoisted_131, [
                                            withDirectives(createBaseVNode("input", {
                                              "onUpdate:modelValue": _cache[30] || (_cache[30] = $event => ((meetingLocationSearch).value = $event)),
                                              onKeyup: withKeys(searchMeetingLocation, ["enter"]),
                                              type: "text",
                                              placeholder: "Search address or place...",
                                              class: "w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[9px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                            }, null, 544), [
                                              [vModelText, meetingLocationSearch.value]
                                            ]),
                                            createBaseVNode("button", {
                                              onClick: searchMeetingLocation,
                                              class: "absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:bg-gray-100"
                                            }, "GO")
                                          ]),
                                          (meetingLocationResults.value.length > 0)
                                            ? (openBlock(), createElementBlock("div", _hoisted_132, [
                                                (openBlock(true), createElementBlock(Fragment, null, renderList(meetingLocationResults.value, (r) => {
                                                  return (openBlock(), createElementBlock("button", {
                                                    key: r.label,
                                                    onClick: $event => (selectMeetingLocation(r)),
                                                    class: "w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] border-b border-gray-50 truncate"
                                                  }, toDisplayString(r.label), 9, _hoisted_133))
                                                }), 128))
                                              ]))
                                            : createCommentVNode("", true),
                                          createBaseVNode("div", _hoisted_134, [
                                            createBaseVNode("button", {
                                              onClick: useCurrentLocation,
                                              disabled: isLocatingDevice.value,
                                              class: "flex-1 px-2 py-1.5 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-[7px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1"
                                            }, [
                                              (isLocatingDevice.value)
                                                ? (openBlock(), createBlock(unref(LoaderCircle), {
                                                    key: 0,
                                                    size: 9,
                                                    class: "animate-spin"
                                                  }))
                                                : (openBlock(), createBlock(unref(Navigation), {
                                                    key: 1,
                                                    size: 9
                                                  })),
                                              createTextVNode(" " + toDisplayString(isLocatingDevice.value ? '...' : 'CURRENT'), 1)
                                            ], 8, _hoisted_135),
                                            createBaseVNode("button", {
                                              onClick: _cache[31] || (_cache[31] = $event => (showManualLocation.value = !showManualLocation.value)),
                                              class: "px-2 py-1.5 border border-gray-300 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[7px] font-mono font-black uppercase tracking-widest transition-all"
                                            }, "MANUAL")
                                          ]),
                                          (showManualLocation.value)
                                            ? (openBlock(), createElementBlock("div", _hoisted_136, [
                                                createBaseVNode("div", _hoisted_137, [
                                                  withDirectives(createBaseVNode("input", {
                                                    "onUpdate:modelValue": _cache[32] || (_cache[32] = $event => ((meetingManualLat).value = $event)),
                                                    type: "number",
                                                    step: "any",
                                                    placeholder: "Lat",
                                                    class: "border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                                  }, null, 512), [
                                                    [vModelText, meetingManualLat.value]
                                                  ]),
                                                  withDirectives(createBaseVNode("input", {
                                                    "onUpdate:modelValue": _cache[33] || (_cache[33] = $event => ((meetingManualLng).value = $event)),
                                                    type: "number",
                                                    step: "any",
                                                    placeholder: "Lng",
                                                    class: "border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                                  }, null, 512), [
                                                    [vModelText, meetingManualLng.value]
                                                  ])
                                                ]),
                                                createBaseVNode("button", {
                                                  onClick: applyManualLocation,
                                                  class: "w-full px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all"
                                                }, "APPLY")
                                              ]))
                                            : createCommentVNode("", true),
                                          (newMeeting.value.lat)
                                            ? (openBlock(), createElementBlock("div", _hoisted_138, [
                                                createBaseVNode("p", _hoisted_139, toDisplayString(newMeeting.value.location_name || `${newMeeting.value.lat.toFixed(4)}, ${newMeeting.value.lng.toFixed(4)}`), 1),
                                                createBaseVNode("p", _hoisted_140, toDisplayString(newMeeting.value.lat.toFixed(6)) + ", " + toDisplayString(newMeeting.value.lng.toFixed(6)), 1)
                                              ]))
                                            : (openBlock(), createElementBlock("div", _hoisted_141, [...(_cache[105] || (_cache[105] = [
                                                createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "No location set", -1)
                                              ]))]))
                                        ]),
                                        createBaseVNode("div", _hoisted_142, [
                                          createBaseVNode("div", _hoisted_143, [
                                            createVNode(unref(MapPin), {
                                              size: 11,
                                              class: "text-amber-600"
                                            }),
                                            _cache[106] || (_cache[106] = createBaseVNode("span", { class: "text-[8px] font-mono font-black text-amber-700 uppercase tracking-widest" }, "Lead's Location", -1)),
                                            (leadLocationSet.value)
                                              ? (openBlock(), createElementBlock("span", _hoisted_144, "KNOWN"))
                                              : (openBlock(), createElementBlock("span", _hoisted_145, "UNSET"))
                                          ]),
                                          (leadLocationSet.value)
                                            ? (openBlock(), createElementBlock("div", _hoisted_146, [
                                                createVNode(unref(MapPin), {
                                                  size: 10,
                                                  class: "text-amber-500 mt-0.5 shrink-0"
                                                }),
                                                createBaseVNode("div", _hoisted_147, [
                                                  createBaseVNode("p", _hoisted_148, toDisplayString(props.lead.city || '') + ", " + toDisplayString(props.lead.country || ''), 1),
                                                  createBaseVNode("p", _hoisted_149, toDisplayString(props.lead.location.lat.toFixed(6)) + ", " + toDisplayString(props.lead.location.lng.toFixed(6)), 1)
                                                ])
                                              ]))
                                            : (openBlock(), createElementBlock("div", _hoisted_150, [
                                                _cache[107] || (_cache[107] = createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-amber-600 uppercase tracking-widest mb-1.5" }, "No lead location", -1)),
                                                createBaseVNode("div", _hoisted_151, [
                                                  withDirectives(createBaseVNode("input", {
                                                    "onUpdate:modelValue": _cache[34] || (_cache[34] = $event => ((leadManualCity).value = $event)),
                                                    type: "text",
                                                    placeholder: "City / Area",
                                                    class: "flex-1 border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                                  }, null, 512), [
                                                    [vModelText, leadManualCity.value]
                                                  ]),
                                                  createBaseVNode("button", {
                                                    onClick: saveLeadLocation,
                                                    class: "px-2 py-1 bg-amber-500 text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-amber-600 transition-all"
                                                  }, "SAVE")
                                                ]),
                                                _cache[108] || (_cache[108] = createBaseVNode("p", { class: "text-[6px] font-mono text-gray-400 mt-1" }, "Or search address below to set lead's location", -1))
                                              ])),
                                          createBaseVNode("div", _hoisted_152, [
                                            withDirectives(createBaseVNode("input", {
                                              "onUpdate:modelValue": _cache[35] || (_cache[35] = $event => ((leadLocationSearch).value = $event)),
                                              onKeyup: withKeys(searchLeadLocation, ["enter"]),
                                              type: "text",
                                              placeholder: "Search lead address...",
                                              class: "w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[8px] font-mono focus:outline-none focus:border-amber-500"
                                            }, null, 544), [
                                              [vModelText, leadLocationSearch.value]
                                            ]),
                                            createBaseVNode("button", {
                                              onClick: searchLeadLocation,
                                              class: "absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-amber-600 uppercase tracking-widest hover:bg-gray-100"
                                            }, "GO")
                                          ]),
                                          (leadLocationResults.value.length > 0)
                                            ? (openBlock(), createElementBlock("div", _hoisted_153, [
                                                (openBlock(true), createElementBlock(Fragment, null, renderList(leadLocationResults.value, (r) => {
                                                  return (openBlock(), createElementBlock("button", {
                                                    key: r.label,
                                                    onClick: $event => (selectLeadLocation(r)),
                                                    class: "w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-b border-gray-50 truncate"
                                                  }, toDisplayString(r.label), 9, _hoisted_154))
                                                }), 128))
                                              ]))
                                            : createCommentVNode("", true)
                                        ])
                                      ]),
                                      (newMeeting.value.lat && leadLocationSet.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_155, [
                                            createBaseVNode("div", _hoisted_156, [
                                              createVNode(unref(Navigation), {
                                                size: 14,
                                                class: "text-[#2F2E8B]"
                                              }),
                                              _cache[109] || (_cache[109] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Distance", -1))
                                            ]),
                                            createBaseVNode("div", _hoisted_157, [
                                              createBaseVNode("span", _hoisted_158, toDisplayString(meetingDistance.value !== null ? (meetingDistance.value < 1 ? (meetingDistance.value * 1000).toFixed(0) + ' m' : meetingDistance.value.toFixed(2) + ' km') : '—'), 1)
                                            ]),
                                            (newMeeting.value.lat)
                                              ? (openBlock(), createElementBlock("button", {
                                                  key: 0,
                                                  onClick: openDirections,
                                                  class: "px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
                                                }, [
                                                  createVNode(unref(Navigation), { size: 10 }),
                                                  _cache[110] || (_cache[110] = createTextVNode(" DIRECTIONS ", -1))
                                                ]))
                                              : createCommentVNode("", true)
                                          ]))
                                        : (openBlock(), createElementBlock("div", _hoisted_159, [...(_cache[111] || (_cache[111] = [
                                            createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Set both locations to calculate distance", -1)
                                          ]))]))
                                    ]))
                                  : createCommentVNode("", true),
                                (meetingError.value)
                                  ? (openBlock(), createElementBlock("div", _hoisted_160, toDisplayString(meetingError.value), 1))
                                  : createCommentVNode("", true),
                                createBaseVNode("div", _hoisted_161, [
                                  createBaseVNode("button", {
                                    onClick: cancelMeetingForm,
                                    class: "px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 hover:border-gray-300 transition-all flex items-center gap-2"
                                  }, [
                                    createVNode(unref(CircleX), { size: 12 }),
                                    _cache[112] || (_cache[112] = createTextVNode(" CANCEL ", -1))
                                  ]),
                                  createBaseVNode("button", {
                                    onClick: saveMeeting,
                                    disabled: savingMeeting.value || !newMeeting.value.title?.trim() || !newMeeting.value.start_datetime || !newMeeting.value.end_datetime,
                                    class: "px-6 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20"
                                  }, [
                                    (savingMeeting.value)
                                      ? (openBlock(), createBlock(unref(LoaderCircle), {
                                          key: 0,
                                          size: 12,
                                          class: "animate-spin"
                                        }))
                                      : (openBlock(), createBlock(unref(Save), {
                                          key: 1,
                                          size: 12
                                        })),
                                    createTextVNode(" " + toDisplayString(savingMeeting.value ? 'SAVING...' : (editingMeetingId.value ? 'SAVE_CHANGES' : 'COMMIT_MEETING')), 1)
                                  ], 8, _hoisted_162)
                                ])
                              ])
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (loadingMeetings.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_163, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[114] || (_cache[114] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Loading_Meeting_Records...", -1))
                          ]))
                        : (meetings.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_164, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(meetings.value, (meeting) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: meeting.id,
                                  class: "bg-white border border-gray-200 hover:border-[#2F2E8B]/30 transition-all group relative overflow-hidden"
                                }, [
                                  createBaseVNode("div", _hoisted_165, [
                                    createBaseVNode("div", _hoisted_166, [
                                      createBaseVNode("div", _hoisted_167, [
                                        createBaseVNode("h4", _hoisted_168, toDisplayString(meeting.title || 'MEETING_RECORD'), 1),
                                        createBaseVNode("span", _hoisted_169, toDisplayString(meeting.meeting_type?.replace('_', ' ') || 'call'), 1)
                                      ]),
                                      createBaseVNode("div", _hoisted_170, [
                                        createBaseVNode("button", {
                                          onClick: $event => (editMeeting(meeting)),
                                          class: "w-6 h-6 flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all rounded-sm",
                                          title: "Edit"
                                        }, [
                                          createVNode(unref(SquarePen), { size: 10 })
                                        ], 8, _hoisted_171),
                                        createBaseVNode("button", {
                                          onClick: $event => (deleteMeetingRecord(meeting)),
                                          class: "w-6 h-6 flex items-center justify-center border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition-all rounded-sm",
                                          title: "Delete"
                                        }, [
                                          createVNode(unref(Trash2), { size: 10 })
                                        ], 8, _hoisted_172)
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_173, [
                                      createBaseVNode("div", _hoisted_174, [
                                        createVNode(unref(Clock), {
                                          size: 9,
                                          class: "text-gray-400 shrink-0"
                                        }),
                                        createBaseVNode("span", _hoisted_175, toDisplayString(formatDate(meeting.start_datetime || meeting.start_time)), 1),
                                        (meeting.end_datetime || meeting.end_time)
                                          ? (openBlock(), createElementBlock("span", _hoisted_176, "→ " + toDisplayString(formatDate(meeting.end_datetime || meeting.end_time)), 1))
                                          : createCommentVNode("", true)
                                      ]),
                                      (meeting.location)
                                        ? (openBlock(), createElementBlock("div", _hoisted_177, [
                                            createVNode(unref(MapPin), {
                                              size: 9,
                                              class: "text-amber-500 mt-0.5 shrink-0"
                                            }),
                                            createBaseVNode("span", _hoisted_178, toDisplayString(meeting.location), 1)
                                          ]))
                                        : createCommentVNode("", true),
                                      (meeting.lat && meeting.lng)
                                        ? (openBlock(), createElementBlock("div", _hoisted_179, [
                                            createVNode(unref(Navigation), {
                                              size: 8,
                                              class: "text-green-500 shrink-0"
                                            }),
                                            createBaseVNode("span", null, toDisplayString(meeting.lat.toFixed(4)) + ", " + toDisplayString(meeting.lng.toFixed(4)), 1),
                                            createBaseVNode("span", _hoisted_180, toDisplayString(formatMeetingDistance(meeting)), 1),
                                            createBaseVNode("a", {
                                              href: 'https://www.google.com/maps/dir/?api=1&destination=' + meeting.lat + ',' + meeting.lng,
                                              target: "_blank",
                                              class: "ml-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white text-[6px] font-mono font-black uppercase tracking-widest transition-all rounded-sm"
                                            }, "DIR", 8, _hoisted_181)
                                          ]))
                                        : (meeting.meeting_type === 'in_person' && props.lead?.location?.lat)
                                          ? (openBlock(), createElementBlock("div", _hoisted_182, [
                                              createVNode(unref(MapPin), {
                                                size: 8,
                                                class: "text-green-500 shrink-0"
                                              }),
                                              _cache[115] || (_cache[115] = createBaseVNode("span", { class: "text-gray-500" }, "Meeting at lead's location", -1)),
                                              createBaseVNode("span", _hoisted_183, toDisplayString(meeting.distance_km != null ? (meeting.distance_km < 1 ? (meeting.distance_km * 1000).toFixed(0) + 'm' : meeting.distance_km.toFixed(2) + 'km') : '0m'), 1)
                                            ]))
                                          : createCommentVNode("", true),
                                      (meeting.agenda || meeting.description)
                                        ? (openBlock(), createElementBlock("div", _hoisted_184, [
                                            _cache[116] || (_cache[116] = createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5" }, "Agenda", -1)),
                                            createBaseVNode("p", _hoisted_185, toDisplayString(meeting.agenda || meeting.description), 1)
                                          ]))
                                        : createCommentVNode("", true),
                                      (meeting.organizer_name)
                                        ? (openBlock(), createElementBlock("div", _hoisted_186, [
                                            createVNode(unref(Users), {
                                              size: 8,
                                              class: "shrink-0"
                                            }),
                                            createBaseVNode("span", _hoisted_187, toDisplayString(meeting.organizer_name), 1)
                                          ]))
                                        : createCommentVNode("", true)
                                    ])
                                  ])
                                ]))
                              }), 128))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_188, [
                              createVNode(unref(CalendarCheck), {
                                size: 32,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[118] || (_cache[118] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "NO_MEETINGS_SCHEDULED", -1)),
                              _cache[119] || (_cache[119] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "No meeting records linked to this lead yet.", -1)),
                              createBaseVNode("button", {
                                onClick: _cache[36] || (_cache[36] = $event => (showMeetingForm.value = true)),
                                class: "mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2"
                              }, [
                                createVNode(unref(Plus), { size: 12 }),
                                _cache[117] || (_cache[117] = createTextVNode(" SCHEDULE_FIRST_MEETING ", -1))
                              ])
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'assets')
                  ? (openBlock(), createElementBlock("div", _hoisted_189, [
                      createVNode(LinkedDocumentsWidget, {
                        recordType: "lead",
                        recordId: __props.lead.id,
                        recordName: __props.lead.name,
                        onDocumentAttached: handleDocumentAttached,
                        onDocumentDeleted: handleDocumentDeleted
                      }, null, 8, ["recordId", "recordName"])
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'notes')
                  ? (openBlock(), createElementBlock("div", _hoisted_190, [
                      createBaseVNode("div", _hoisted_191, [
                        _cache[121] || (_cache[121] = createBaseVNode("h4", { class: "text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 mb-3" }, "Add Note", -1)),
                        withDirectives(createBaseVNode("textarea", {
                          "onUpdate:modelValue": _cache[37] || (_cache[37] = $event => ((newNoteText).value = $event)),
                          rows: "3",
                          placeholder: "Type a note about this lead...",
                          class: "w-full border border-gray-200 px-3 py-2.5 text-[11px] font-mono text-gray-700 outline-none focus:border-[#2F2E8B] resize-none bg-white"
                        }, null, 512), [
                          [vModelText, newNoteText.value]
                        ]),
                        createBaseVNode("div", _hoisted_192, [
                          createBaseVNode("button", {
                            onClick: stageNote,
                            class: "px-4 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5"
                          }, [
                            createVNode(unref(Plus), { size: 11 }),
                            _cache[120] || (_cache[120] = createTextVNode(" Stage Note ", -1))
                          ])
                        ]),
                        (stagedNotes.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_193, [
                              createBaseVNode("p", _hoisted_194, "Pending Notes (" + toDisplayString(stagedNotes.value.length) + ")", 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(stagedNotes.value, (sn, si) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: si,
                                  class: "flex items-center justify-between gap-2 bg-amber-50 border border-amber-200 px-3 py-2 mb-1"
                                }, [
                                  createBaseVNode("p", _hoisted_195, toDisplayString(sn), 1),
                                  createBaseVNode("button", {
                                    onClick: $event => (stagedNotes.value.splice(si, 1)),
                                    class: "text-red-400 hover:text-red-600 shrink-0"
                                  }, [
                                    createVNode(unref(X), { size: 10 })
                                  ], 8, _hoisted_196)
                                ]))
                              }), 128))
                            ]))
                          : createCommentVNode("", true)
                      ]),
                      (loadingNotes.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_197, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-gray-300",
                              size: 20
                            })
                          ]))
                        : (notes.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_198, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(notes.value, (note) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: note.id,
                                  class: "bg-white border border-gray-100 p-4 hover:border-gray-200 transition group"
                                }, [
                                  createBaseVNode("div", _hoisted_199, [
                                    createBaseVNode("div", _hoisted_200, [
                                      createBaseVNode("p", _hoisted_201, toDisplayString(note.note || note.text), 1),
                                      createBaseVNode("div", _hoisted_202, [
                                        createBaseVNode("span", _hoisted_203, toDisplayString(formatDate(note.created_at || note.createdAt)), 1),
                                        (note.created_by || note.author)
                                          ? (openBlock(), createElementBlock("span", _hoisted_204, " by " + toDisplayString((note.created_by || note.author)?.split('@')[0] || note.created_by || note.author), 1))
                                          : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createBaseVNode("button", {
                                      onClick: $event => (deleteNote(note.id)),
                                      class: "w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                                    }, [
                                      createVNode(unref(Trash2), { size: 11 })
                                    ], 8, _hoisted_205)
                                  ])
                                ]))
                              }), 128))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_206, [
                              createVNode(unref(StickyNote), {
                                size: 28,
                                class: "text-gray-200 mb-3"
                              }),
                              _cache[122] || (_cache[122] = createBaseVNode("h5", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "No Notes Yet", -1)),
                              _cache[123] || (_cache[123] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-1" }, "Add your first note above.", -1))
                            ]))
                    ]))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_207, [
              createBaseVNode("div", _hoisted_208, [
                createBaseVNode("button", {
                  onClick: _cache[38] || (_cache[38] = $event => (_ctx.$emit('delete', __props.lead))),
                  class: "px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(Trash2), { size: 13 }),
                  _cache[125] || (_cache[125] = createTextVNode(" DELETE ", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[39] || (_cache[39] = $event => {_ctx.$emit('archive', __props.lead); _ctx.$emit('update:modelValue', false);}),
                  class: "px-4 py-2 border border-amber-200 text-amber-600 hover:bg-amber-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(Archive), { size: 13 }),
                  _cache[126] || (_cache[126] = createTextVNode(" ARCHIVE ", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_209, [
                createBaseVNode("button", {
                  onClick: _cache[40] || (_cache[40] = $event => (_ctx.$emit('update:modelValue', false))),
                  class: "px-5 py-2 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all"
                }, " CLOSE "),
                (hasStagedChanges.value)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: commitStagedChanges,
                      disabled: savingStaged.value,
                      class: "px-6 py-2 bg-green-600 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
                    }, [
                      createVNode(unref(Save), { size: 14 }),
                      createTextVNode(" " + toDisplayString(savingStaged.value ? 'SAVING...' : 'SAVE CHANGES'), 1)
                    ], 8, _hoisted_210))
                  : createCommentVNode("", true),
                createBaseVNode("button", {
                  onClick: _cache[41] || (_cache[41] = $event => (_ctx.$emit('edit', __props.lead))),
                  class: "px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(SquarePen), { size: 14 }),
                  _cache[127] || (_cache[127] = createTextVNode(" EDIT ", -1))
                ])
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showConfirm.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm",
            onClick: withModifiers(cancelConfirm, ["self"])
          }, [
            createBaseVNode("div", _hoisted_211, [
              createBaseVNode("div", {
                class: normalizeClass(["h-1.5 w-full", confirmDanger.value ? 'bg-red-600' : 'bg-[#2F2E8B]'])
              }, null, 2),
              createBaseVNode("div", _hoisted_212, [
                createBaseVNode("div", _hoisted_213, [
                  createBaseVNode("div", {
                    class: normalizeClass(["flex-shrink-0 w-10 h-10 flex items-center justify-center", confirmDanger.value ? 'bg-red-50 border border-red-200' : 'bg-[#2F2E8B]/5 border border-[#2F2E8B]/20'])
                  }, [
                    (confirmDanger.value)
                      ? (openBlock(), createBlock(unref(Trash2), {
                          key: 0,
                          size: 16,
                          class: "text-red-600"
                        }))
                      : (openBlock(), createBlock(unref(TriangleAlert), {
                          key: 1,
                          size: 16,
                          class: "text-[#2F2E8B]"
                        }))
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", _hoisted_214, toDisplayString(confirmTitle.value), 1),
                    createBaseVNode("p", _hoisted_215, toDisplayString(confirmMessage.value), 1)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_216, [
                createBaseVNode("button", {
                  onClick: cancelConfirm,
                  class: "px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                }, " CANCEL "),
                createBaseVNode("button", {
                  onClick: executeConfirm,
                  class: normalizeClass(["px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white transition flex items-center gap-2", confirmDanger.value ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2F2E8B] hover:bg-[#3D2F88]'])
                }, [
                  createVNode(unref(Trash2), { size: 12 }),
                  _cache[129] || (_cache[129] = createTextVNode(" DELETE ", -1))
                ], 2)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showWhatsAppDialog.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-[2px]",
            onClick: _cache[45] || (_cache[45] = withModifiers($event => (showWhatsAppDialog.value = false), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_217, [
              createBaseVNode("div", _hoisted_218, [
                createBaseVNode("div", _hoisted_219, [
                  createBaseVNode("div", _hoisted_220, [
                    createVNode(unref(MessageSquare), {
                      size: 12,
                      class: "text-white"
                    })
                  ]),
                  _cache[130] || (_cache[130] = createBaseVNode("span", { class: "text-[11px] font-mono font-black text-white uppercase tracking-widest" }, "WhatsApp // Message", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[42] || (_cache[42] = $event => (showWhatsAppDialog.value = false)),
                  class: "w-5 h-5 flex items-center justify-center text-blue-300 hover:text-white rounded-sm hover:bg-[#3D3A9E] transition-colors"
                }, [
                  createVNode(unref(X), { size: 12 })
                ])
              ]),
              createBaseVNode("div", _hoisted_221, [
                createBaseVNode("div", _hoisted_222, [
                  createVNode(unref(MessageSquare), {
                    size: 11,
                    class: "text-[#2F2E8B]"
                  }),
                  createBaseVNode("span", null, toDisplayString(__props.lead?.name || 'CONTACT'), 1),
                  (__props.lead?.phone)
                    ? (openBlock(), createElementBlock("span", _hoisted_223, "· " + toDisplayString(__props.lead.phone), 1))
                    : createCommentVNode("", true)
                ]),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[43] || (_cache[43] = $event => ((whatsAppMessage).value = $event)),
                  rows: "3",
                  placeholder: "Type your WhatsApp message...",
                  class: "w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-mono text-gray-700 outline-none focus:border-[#2F2E8B] focus:bg-[#2F2E8B]/5 resize-none rounded-sm transition-colors"
                }, null, 512), [
                  [vModelText, whatsAppMessage.value]
                ]),
                createBaseVNode("div", _hoisted_224, [
                  createBaseVNode("p", _hoisted_225, [
                    createVNode(unref(MessageSquare), { size: 10 }),
                    _cache[131] || (_cache[131] = createTextVNode(" Message logged to lead activity. ", -1))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_226, [
                (__props.lead?.phone)
                  ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      href: 'https://wa.me/' + __props.lead.phone.replace(/[^0-9]/g, ''),
                      target: "_blank",
                      class: "px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none"
                    }, [
                      createVNode(unref(MessageSquare), { size: 11 }),
                      _cache[132] || (_cache[132] = createTextVNode(" Open WhatsApp ", -1))
                    ], 8, _hoisted_227))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_228, [
                  createBaseVNode("button", {
                    onClick: _cache[44] || (_cache[44] = $event => (showWhatsAppDialog.value = false)),
                    class: "px-3 py-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest hover:text-gray-700 transition-colors"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    onClick: proceedWithWhatsApp,
                    class: "px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none"
                  }, [
                    createVNode(unref(MessageSquare), { size: 11 }),
                    _cache[133] || (_cache[133] = createTextVNode(" Save Text ", -1))
                  ])
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
const LeadDetailModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-af445ea8"]]);

const _hoisted_1 = { class: "bg-white border border-gray-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col" };
const _hoisted_2 = { class: "sticky top-0 bg-[#2F2E8B] border-b border-white/20 p-4 md:p-6 flex items-center justify-between z-10 flex-shrink-0" };
const _hoisted_3 = { class: "text-xs text-blue-200 uppercase tracking-wider truncate pl-3.5" };
const _hoisted_4 = { class: "p-3 md:p-6 space-y-4 md:space-y-6 flex-1 overflow-y-auto custom-scrollbar" };
const _hoisted_5 = { class: "border border-dashed border-[#2F2E8B]/40 bg-[#2F2E8B]/[0.04] p-3 md:p-4" };
const _hoisted_6 = { class: "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2F2E8B] mb-3" };
const _hoisted_7 = { class: "grid grid-cols-2 md:grid-cols-4 gap-2 text-xs" };
const _hoisted_8 = { class: "font-semibold text-gray-800 truncate" };
const _hoisted_9 = { class: "font-semibold text-gray-800 truncate" };
const _hoisted_10 = { class: "font-semibold text-gray-800" };
const _hoisted_11 = { class: "font-semibold text-gray-800 truncate" };
const _hoisted_12 = { class: "flex items-center overflow-x-auto pb-1" };
const _hoisted_13 = { class: "flex items-center gap-1.5 flex-shrink-0" };
const _hoisted_14 = { key: 1 };
const _hoisted_15 = {
  key: 0,
  class: "space-y-3 md:space-y-4"
};
const _hoisted_16 = { class: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2" };
const _hoisted_17 = { class: "flex flex-wrap gap-2 mb-3" };
const _hoisted_18 = ["value"];
const _hoisted_19 = {
  key: 0,
  class: "space-y-3 border border-dashed border-gray-200 p-3 md:p-4"
};
const _hoisted_20 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_21 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_22 = {
  key: 1,
  class: "border border-dashed border-gray-200 p-3 md:p-4"
};
const _hoisted_23 = { class: "relative" };
const _hoisted_24 = {
  key: 0,
  class: "mt-2 space-y-1 max-h-44 overflow-y-auto custom-scrollbar"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "font-semibold uppercase tracking-wide" };
const _hoisted_27 = { class: "text-gray-400 truncate" };
const _hoisted_28 = {
  key: 2,
  class: "text-xs text-gray-400 uppercase tracking-wider border border-dashed border-gray-200 p-3"
};
const _hoisted_29 = {
  key: 1,
  class: "space-y-3 md:space-y-4"
};
const _hoisted_30 = { class: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2" };
const _hoisted_31 = { class: "flex flex-wrap gap-2 mb-3" };
const _hoisted_32 = ["value"];
const _hoisted_33 = {
  key: 0,
  class: "space-y-3 border border-dashed border-gray-200 p-3 md:p-4"
};
const _hoisted_34 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_35 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_36 = {
  key: 1,
  class: "border border-dashed border-gray-200 p-3 md:p-4"
};
const _hoisted_37 = { class: "relative" };
const _hoisted_38 = {
  key: 0,
  class: "mt-2 space-y-1 max-h-44 overflow-y-auto custom-scrollbar"
};
const _hoisted_39 = ["onClick"];
const _hoisted_40 = { class: "font-semibold uppercase tracking-wide" };
const _hoisted_41 = { class: "text-gray-400" };
const _hoisted_42 = {
  key: 2,
  class: "text-xs text-gray-400 uppercase tracking-wider border border-dashed border-gray-200 p-3"
};
const _hoisted_43 = {
  key: 2,
  class: "space-y-3 md:space-y-4"
};
const _hoisted_44 = { class: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2" };
const _hoisted_45 = { class: "space-y-3 border border-gray-200 p-3 md:p-4" };
const _hoisted_46 = ["placeholder"];
const _hoisted_47 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_48 = { class: "grid grid-cols-1 md:grid-cols-2 gap-3" };
const _hoisted_49 = ["placeholder"];
const _hoisted_50 = {
  key: 3,
  class: "space-y-3"
};
const _hoisted_51 = { class: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-dashed border-gray-200 pb-2" };
const _hoisted_52 = { class: "grid grid-cols-1 md:grid-cols-3 gap-3" };
const _hoisted_53 = { class: "border border-dashed border-gray-200 p-3" };
const _hoisted_54 = { class: "flex items-center justify-between mb-2" };
const _hoisted_55 = { class: "flex items-center gap-1.5" };
const _hoisted_56 = {
  key: 0,
  class: "space-y-1 text-xs"
};
const _hoisted_57 = { class: "font-semibold" };
const _hoisted_58 = { class: "font-semibold truncate block" };
const _hoisted_59 = { key: 0 };
const _hoisted_60 = { class: "font-semibold" };
const _hoisted_61 = {
  key: 1,
  class: "text-xs"
};
const _hoisted_62 = { class: "font-semibold font-mono text-[#2F2E8B]" };
const _hoisted_63 = {
  key: 2,
  class: "text-xs text-gray-400 uppercase tracking-wider"
};
const _hoisted_64 = { class: "border border-dashed border-gray-200 p-3" };
const _hoisted_65 = { class: "flex items-center justify-between mb-2" };
const _hoisted_66 = { class: "flex items-center gap-1.5" };
const _hoisted_67 = {
  key: 0,
  class: "space-y-1 text-xs"
};
const _hoisted_68 = { class: "font-semibold truncate block" };
const _hoisted_69 = { key: 0 };
const _hoisted_70 = { class: "font-semibold truncate block" };
const _hoisted_71 = { key: 1 };
const _hoisted_72 = { class: "font-semibold" };
const _hoisted_73 = {
  key: 1,
  class: "text-xs"
};
const _hoisted_74 = { class: "font-semibold font-mono text-[#2F2E8B]" };
const _hoisted_75 = {
  key: 2,
  class: "text-xs text-gray-400 uppercase tracking-wider"
};
const _hoisted_76 = { class: "border border-dashed border-gray-200 p-3" };
const _hoisted_77 = { class: "flex items-center justify-between mb-2" };
const _hoisted_78 = { class: "flex items-center gap-1.5" };
const _hoisted_79 = { class: "space-y-1 text-xs" };
const _hoisted_80 = { class: "font-semibold truncate block" };
const _hoisted_81 = { class: "font-semibold" };
const _hoisted_82 = { class: "font-semibold" };
const _hoisted_83 = { class: "sticky bottom-0 bg-gray-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-t border-gray-200 gap-2 flex-shrink-0" };
const _hoisted_84 = { key: 1 };
const _hoisted_85 = { class: "flex gap-2 md:gap-3" };
const _hoisted_86 = ["disabled"];


const _sfc_main = {
  __name: 'LeadConversionModal',
  props: {
  modelValue: Boolean,
  lead: Object
},
  emits: ['update:modelValue', 'converted'],
  setup(__props, { emit: __emit }) {

const { getTenantId } = decodeJWT();
const { formatCurrency} = useCurrency();

const props = __props;

const emit$1 = __emit;

const steps = ['Contact', 'Account', 'Deal', 'Review'];
const step = ref(0);
const loading = ref(false);

// Contact fields
const contactOption = ref('create');
const contactData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  title: ''
});
const contactSearch = ref('');
const searchedContacts = ref([]);
const selectedContactId = ref(null);

// Account fields
const accountOption = ref('create');
const accountData = ref({
  name: '',
  website: '',
  phone: '',
  industry: '',
  type: 'Prospect'
});
const accountSearch = ref('');
const searchedAccounts = ref([]);
const selectedAccountId = ref(null);

// Deal fields
const dealOption = ref('skip');
const dealData = ref({
  name: '',
  value: 0,
  stage: 'Negotiation',
  probability: 50,
  expectedCloseDate: '',
  description: ''
});

// Initialize data from lead when modal opens
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.lead) {
    initializeFromLead();
  }
});

watch(() => props.lead, (newLead) => {
  if (newLead && props.modelValue) {
    initializeFromLead();
  }
});

function initializeFromLead() {
  const lead = props.lead;
  if (!lead) return;

  // Split lead name
  const nameParts = (lead.name || '').split(' ');
  contactData.value = {
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: lead.email || '',
    phone: lead.phone || '',
    title: ''
  };

  accountData.value = {
    name: lead.company || '',
    website: lead.website || '',
    phone: lead.phone || '',
    industry: lead.industry || '',
    type: 'Prospect'
  };

  dealData.value = {
    name: `${lead.company || 'Opportunity'} - ${lead.name || 'Deal'}`,
    value: lead.value || 0,
    stage: 'Negotiation',
    probability: 50,
    expectedCloseDate: '',
    description: lead.notes || ''
  };

  // Reset step and options
  step.value = 0;
  contactOption.value = 'create';
  accountOption.value = 'create';
  dealOption.value = 'skip';
}

function nextStep() {
  if (step.value < 3) {
    step.value++;
  }
}

async function searchContacts() {
  if (contactSearch.value.length < 2) {
    searchedContacts.value = [];
    return;
  }
  try {
    const result = await getContacts(getTenantId(), { q: contactSearch.value, per_page: 10 });
    searchedContacts.value = result.items || [];
  } catch (error) {
    console.error('Error searching contacts:', error);
    searchedContacts.value = [];
  }
}

function selectContact(contact) {
  selectedContactId.value = contact.id;
}

async function searchAccounts() {
  if (accountSearch.value.length < 2) {
    searchedAccounts.value = [];
    return;
  }
  try {
    const result = await getAccounts(getTenantId(), { q: accountSearch.value, per_page: 10 });
    searchedAccounts.value = result.items || [];
  } catch (error) {
    console.error('Error searching accounts:', error);
    searchedAccounts.value = [];
  }
}

function selectAccount(account) {
  selectedAccountId.value = account.id;
}

async function convertLead$1() {
  if (!props.lead) return;

  // Validation
  if (contactOption.value === 'create' && (!contactData.value.firstName || !contactData.value.lastName || !contactData.value.email)) {
    alert('Please fill in required contact fields (First Name, Last Name, Email)');
    return;
  }
  if (accountOption.value === 'create' && !accountData.value.name) {
    alert('Please fill in required account field (Name)');
    return;
  }

  loading.value = true;
  try {
    const tenantId = getTenantId();
    const conversionPayload = {
      createContact: accountOption.value !== 'skip' ? true : (contactOption.value !== 'skip'),
      contactId: contactOption.value === 'existing' ? selectedContactId.value : null,
      contactData: contactOption.value === 'create' ? contactData.value : null,
      createAccount: accountOption.value !== 'skip',
      accountId: accountOption.value === 'existing' ? selectedAccountId.value : null,
      accountData: accountOption.value === 'create' ? accountData.value : null,
      createDeal: true, // Always create a deal when converting to account
      dealData: {
        name: (dealOption.value === 'create' && dealData.value.name) ? dealData.value.name : `${props.lead?.name || 'Converted'} Deal`,
        value: (dealOption.value === 'create' && dealData.value?.value) ? dealData.value.value : Number(props.lead?.value || 0),
        amount: (dealOption.value === 'create' && dealData.value?.value) ? dealData.value.value : Number(props.lead?.value || 0),
        stage: (dealOption.value === 'create' && dealData.value?.stage) ? dealData.value.stage : 'closed-won',
        probability: (dealOption.value === 'create' && dealData.value?.probability) ? dealData.value.probability : 100,
        expectedCloseDate: dealData.value?.expectedCloseDate || new Date().toISOString().split('T')[0],
        description: dealData.value?.description || `Auto-created from lead: ${props.lead?.name || 'Converted Lead'}`
      },
      // Keep lead visible in Lead Management with updated status
      convertedStatus: 'contacted'
    };

    // API expects: convertLead(leadId, tenantId, options)
    const result = await convertLead(props.lead.id, tenantId, conversionPayload);

    // Ask the user whether to archive the converted lead. We do not auto-archive —
    // the lead stays visible on the Active leads page unless the user opts in.
    const created = [];
    if (conversionPayload.createAccount || conversionPayload.accountId) {
      created.push('Contact');
      created.push('Account');
      created.push('Deal');
    }
    const summary = created.length ? created.join(', ') : 'records';
    const wantsArchive = window.confirm(
      `Lead converted successfully (${summary}).\n\n` +
      `Do you want to archive "${props.lead.name || 'this lead'}" so it is removed from the active leads list?\n\n` +
      `Click OK to archive, or Cancel to keep it active.`
    );
    if (wantsArchive) {
      try {
        await updateLead(
          props.lead.id,
          { ...props.lead, archived: true, tenant_id: tenantId },
          tenantId
        );
      } catch (archiveErr) {
        console.warn('Lead converted but failed to archive:', archiveErr);
      }
    }

    // Broadcast changes for all possibly affected entities
    emit('crm:leads:changed');
    if (conversionPayload.createAccount || conversionPayload.accountId) {
      emit('crm:contacts:changed');
      emit('crm:accounts:changed');
      emit('crm:deals:changed');
    }
    emit$1('converted', result);
    emit$1('update:modelValue', false);
  } catch (error) {
    console.error('Conversion error:', error);
    alert('Failed to convert lead: ' + (error.message || 'Unknown error'));
  } finally {
    loading.value = false;
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10001] p-2 md:p-4 font-mono",
          onClick: _cache[26] || (_cache[26] = withModifiers($event => (_ctx.$emit('update:modelValue', false)), ["self"]))
        }, [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", null, [
                _cache[27] || (_cache[27] = createBaseVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                  createBaseVNode("div", { class: "w-1.5 h-5 bg-white/40" }),
                  createBaseVNode("h3", { class: "text-sm md:text-base font-black uppercase tracking-widest text-white" }, "Convert Lead")
                ], -1)),
                createBaseVNode("p", _hoisted_3, toDisplayString(__props.lead?.name) + " → Contact / Account / Deal", 1)
              ]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', false))),
                class: "w-9 h-9 flex items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/20 transition flex-shrink-0"
              }, [
                createVNode(unref(X), { size: 16 })
              ])
            ]),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("h4", _hoisted_6, [
                  createVNode(unref(Info), { size: 13 }),
                  _cache[28] || (_cache[28] = createTextVNode(" Lead Information ", -1))
                ]),
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", null, [
                    _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-gray-400 uppercase tracking-wider mb-0.5" }, "Name", -1)),
                    createBaseVNode("div", _hoisted_8, toDisplayString(__props.lead?.name || '—'), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[30] || (_cache[30] = createBaseVNode("div", { class: "text-gray-400 uppercase tracking-wider mb-0.5" }, "Email", -1)),
                    createBaseVNode("div", _hoisted_9, toDisplayString(__props.lead?.email || '—'), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[31] || (_cache[31] = createBaseVNode("div", { class: "text-gray-400 uppercase tracking-wider mb-0.5" }, "Phone", -1)),
                    createBaseVNode("div", _hoisted_10, toDisplayString(__props.lead?.phone || '—'), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[32] || (_cache[32] = createBaseVNode("div", { class: "text-gray-400 uppercase tracking-wider mb-0.5" }, "Company", -1)),
                    createBaseVNode("div", _hoisted_11, toDisplayString(__props.lead?.company || '—'), 1)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_12, [
                (openBlock(), createElementBlock(Fragment, null, renderList(steps, (stepItem, idx) => {
                  return (openBlock(), createElementBlock(Fragment, { key: idx }, [
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("div", {
                        class: normalizeClass(["flex items-center justify-center w-7 h-7 text-xs font-bold uppercase tracking-wider border-2 transition-all", step.value === idx
                  ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white'
                  : step.value > idx
                    ? 'bg-[#2F2E8B]/10 border-[#2F2E8B]/40 text-[#2F2E8B]'
                    : 'bg-white border-gray-300 text-gray-400'])
                      }, [
                        (step.value > idx)
                          ? (openBlock(), createBlock(unref(Check), {
                              key: 0,
                              size: 12
                            }))
                          : (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(idx + 1), 1))
                      ], 2),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs uppercase tracking-widest", step.value === idx ? 'text-[#2F2E8B] font-bold' : step.value > idx ? 'text-[#2F2E8B]/60' : 'text-gray-400'])
                      }, toDisplayString(stepItem), 3)
                    ]),
                    (idx < steps.length - 1)
                      ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["flex-1 min-w-[20px] h-px mx-2", step.value > idx ? 'bg-[#2F2E8B]/40' : 'bg-gray-200'])
                        }, null, 2))
                      : createCommentVNode("", true)
                  ], 64))
                }), 64))
              ]),
              (step.value === 0)
                ? (openBlock(), createElementBlock("div", _hoisted_15, [
                    createBaseVNode("h4", _hoisted_16, [
                      createVNode(unref(User), {
                        size: 13,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[33] || (_cache[33] = createTextVNode(" Create Contact ", -1))
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      (openBlock(), createElementBlock(Fragment, null, renderList([['create','Create New'],['existing','Link Existing'],['skip','Skip']], (opt) => {
                        return createBaseVNode("label", {
                          key: opt[0],
                          class: normalizeClass(["flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-wider cursor-pointer transition-all", contactOption.value === opt[0] ? 'border-[#2F2E8B] bg-[#2F2E8B] text-white' : 'border-gray-300 text-gray-500 hover:border-[#2F2E8B]'])
                        }, [
                          withDirectives(createBaseVNode("input", {
                            type: "radio",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((contactOption).value = $event)),
                            value: opt[0],
                            class: "hidden"
                          }, null, 8, _hoisted_18), [
                            [vModelRadio, contactOption.value]
                          ]),
                          createTextVNode(" " + toDisplayString(opt[1]), 1)
                        ], 2)
                      }), 64))
                    ]),
                    (contactOption.value === 'create')
                      ? (openBlock(), createElementBlock("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, [
                            createBaseVNode("div", null, [
                              _cache[34] || (_cache[34] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, [
                                createTextVNode("First Name "),
                                createBaseVNode("span", { class: "text-red-500" }, "*")
                              ], -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((contactData.value.firstName) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "First name"
                              }, null, 512), [
                                [vModelText, contactData.value.firstName]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[35] || (_cache[35] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, [
                                createTextVNode("Last Name "),
                                createBaseVNode("span", { class: "text-red-500" }, "*")
                              ], -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((contactData.value.lastName) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "Last name"
                              }, null, 512), [
                                [vModelText, contactData.value.lastName]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            _cache[36] || (_cache[36] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, [
                              createTextVNode("Email "),
                              createBaseVNode("span", { class: "text-red-500" }, "*")
                            ], -1)),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((contactData.value.email) = $event)),
                              type: "email",
                              class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                              placeholder: "contact@email.com"
                            }, null, 512), [
                              [vModelText, contactData.value.email]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_21, [
                            createBaseVNode("div", null, [
                              _cache[37] || (_cache[37] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Phone", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((contactData.value.phone) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "+260 XXX XXX XXX"
                              }, null, 512), [
                                [vModelText, contactData.value.phone]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[38] || (_cache[38] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Job Title", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((contactData.value.title) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "e.g., Marketing Manager"
                              }, null, 512), [
                                [vModelText, contactData.value.title]
                              ])
                            ])
                          ])
                        ]))
                      : createCommentVNode("", true),
                    (contactOption.value === 'existing')
                      ? (openBlock(), createElementBlock("div", _hoisted_22, [
                          _cache[39] || (_cache[39] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-2" }, "Search Contacts", -1)),
                          createBaseVNode("div", _hoisted_23, [
                            createVNode(unref(Search), {
                              size: 13,
                              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((contactSearch).value = $event)),
                              onInput: searchContacts,
                              type: "text",
                              class: "w-full pl-8 pr-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                              placeholder: "Search by name or email..."
                            }, null, 544), [
                              [vModelText, contactSearch.value]
                            ])
                          ]),
                          (searchedContacts.value.length > 0)
                            ? (openBlock(), createElementBlock("div", _hoisted_24, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(searchedContacts.value, (contact) => {
                                  return (openBlock(), createElementBlock("div", {
                                    key: contact.id,
                                    onClick: $event => (selectContact(contact)),
                                    class: normalizeClass(["px-3 py-2 border cursor-pointer transition text-xs", selectedContactId.value === contact.id ? 'border-[#2F2E8B] bg-[#2F2E8B]/5 text-[#2F2E8B]' : 'border-gray-200 bg-white hover:border-[#2F2E8B]/40'])
                                  }, [
                                    createBaseVNode("div", _hoisted_26, toDisplayString(contact.firstName) + " " + toDisplayString(contact.lastName), 1),
                                    createBaseVNode("div", _hoisted_27, toDisplayString(contact.email), 1)
                                  ], 10, _hoisted_25))
                                }), 128))
                              ]))
                            : createCommentVNode("", true)
                        ]))
                      : createCommentVNode("", true),
                    (contactOption.value === 'skip')
                      ? (openBlock(), createElementBlock("div", _hoisted_28, " No contact will be created for this lead. "))
                      : createCommentVNode("", true)
                  ]))
                : createCommentVNode("", true),
              (step.value === 1)
                ? (openBlock(), createElementBlock("div", _hoisted_29, [
                    createBaseVNode("h4", _hoisted_30, [
                      createVNode(unref(Building2), {
                        size: 13,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[40] || (_cache[40] = createTextVNode(" Create Account ", -1))
                    ]),
                    createBaseVNode("div", _hoisted_31, [
                      (openBlock(), createElementBlock(Fragment, null, renderList([['create','Create New'],['existing','Link Existing'],['skip','Skip']], (opt) => {
                        return createBaseVNode("label", {
                          key: opt[0],
                          class: normalizeClass(["flex items-center gap-1.5 px-3 py-1.5 border text-xs uppercase tracking-wider cursor-pointer transition-all", accountOption.value === opt[0] ? 'border-[#2F2E8B] bg-[#2F2E8B] text-white' : 'border-gray-300 text-gray-500 hover:border-[#2F2E8B]'])
                        }, [
                          withDirectives(createBaseVNode("input", {
                            type: "radio",
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((accountOption).value = $event)),
                            value: opt[0],
                            class: "hidden"
                          }, null, 8, _hoisted_32), [
                            [vModelRadio, accountOption.value]
                          ]),
                          createTextVNode(" " + toDisplayString(opt[1]), 1)
                        ], 2)
                      }), 64))
                    ]),
                    (accountOption.value === 'create')
                      ? (openBlock(), createElementBlock("div", _hoisted_33, [
                          createBaseVNode("div", null, [
                            _cache[41] || (_cache[41] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, [
                              createTextVNode("Account Name "),
                              createBaseVNode("span", { class: "text-red-500" }, "*")
                            ], -1)),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((accountData.value.name) = $event)),
                              type: "text",
                              class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                              placeholder: "Company name"
                            }, null, 512), [
                              [vModelText, accountData.value.name]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_34, [
                            createBaseVNode("div", null, [
                              _cache[42] || (_cache[42] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Website", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((accountData.value.website) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "https://company.com"
                              }, null, 512), [
                                [vModelText, accountData.value.website]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[43] || (_cache[43] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Phone", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((accountData.value.phone) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "+260 XXX XXX XXX"
                              }, null, 512), [
                                [vModelText, accountData.value.phone]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_35, [
                            createBaseVNode("div", null, [
                              _cache[44] || (_cache[44] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Industry", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((accountData.value.industry) = $event)),
                                type: "text",
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                                placeholder: "e.g., Technology, Finance"
                              }, null, 512), [
                                [vModelText, accountData.value.industry]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[46] || (_cache[46] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Type", -1)),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((accountData.value.type) = $event)),
                                class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                              }, [...(_cache[45] || (_cache[45] = [
                                createBaseVNode("option", { value: "Customer" }, "Customer", -1),
                                createBaseVNode("option", { value: "Prospect" }, "Prospect", -1),
                                createBaseVNode("option", { value: "Partner" }, "Partner", -1),
                                createBaseVNode("option", { value: "Competitor" }, "Competitor", -1)
                              ]))], 512), [
                                [vModelSelect, accountData.value.type]
                              ])
                            ])
                          ])
                        ]))
                      : createCommentVNode("", true),
                    (accountOption.value === 'existing')
                      ? (openBlock(), createElementBlock("div", _hoisted_36, [
                          _cache[47] || (_cache[47] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-2" }, "Search Accounts", -1)),
                          createBaseVNode("div", _hoisted_37, [
                            createVNode(unref(Search), {
                              size: 13,
                              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((accountSearch).value = $event)),
                              onInput: searchAccounts,
                              type: "text",
                              class: "w-full pl-8 pr-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                              placeholder: "Search by company name..."
                            }, null, 544), [
                              [vModelText, accountSearch.value]
                            ])
                          ]),
                          (searchedAccounts.value.length > 0)
                            ? (openBlock(), createElementBlock("div", _hoisted_38, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(searchedAccounts.value, (account) => {
                                  return (openBlock(), createElementBlock("div", {
                                    key: account.id,
                                    onClick: $event => (selectAccount(account)),
                                    class: normalizeClass(["px-3 py-2 border cursor-pointer transition text-xs", selectedAccountId.value === account.id ? 'border-[#2F2E8B] bg-[#2F2E8B]/5 text-[#2F2E8B]' : 'border-gray-200 bg-white hover:border-[#2F2E8B]/40'])
                                  }, [
                                    createBaseVNode("div", _hoisted_40, toDisplayString(account.name), 1),
                                    createBaseVNode("div", _hoisted_41, toDisplayString(account.industry || 'No industry'), 1)
                                  ], 10, _hoisted_39))
                                }), 128))
                              ]))
                            : createCommentVNode("", true)
                        ]))
                      : createCommentVNode("", true),
                    (accountOption.value === 'skip')
                      ? (openBlock(), createElementBlock("div", _hoisted_42, " No account will be created for this lead. "))
                      : createCommentVNode("", true)
                  ]))
                : createCommentVNode("", true),
              (step.value === 2)
                ? (openBlock(), createElementBlock("div", _hoisted_43, [
                    createBaseVNode("h4", _hoisted_44, [
                      createVNode(unref(Handshake), {
                        size: 13,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[48] || (_cache[48] = createTextVNode(" Edit Deal ", -1)),
                      _cache[49] || (_cache[49] = createBaseVNode("span", { class: "text-[10px] text-emerald-600 font-bold ml-auto" }, "Auto-created", -1))
                    ]),
                    createBaseVNode("div", _hoisted_45, [
                      createBaseVNode("div", null, [
                        _cache[50] || (_cache[50] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Deal Name", -1)),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((dealData.value.name) = $event)),
                          type: "text",
                          class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                          placeholder: `${__props.lead?.name || 'Converted'} Deal`
                        }, null, 8, _hoisted_46), [
                          [vModelText, dealData.value.name]
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_47, [
                        createBaseVNode("div", null, [
                          _cache[51] || (_cache[51] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Value (ZMW)", -1)),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((dealData.value.value) = $event)),
                            type: "number",
                            class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                            placeholder: "0.00"
                          }, null, 512), [
                            [
                              vModelText,
                              dealData.value.value,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          _cache[53] || (_cache[53] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Stage", -1)),
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((dealData.value.stage) = $event)),
                            class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                          }, [...(_cache[52] || (_cache[52] = [
                            createBaseVNode("option", { value: "Negotiation" }, "Negotiation", -1),
                            createBaseVNode("option", { value: "Closed Won" }, "Closed Won", -1),
                            createBaseVNode("option", { value: "Closed Lost" }, "Closed Lost", -1)
                          ]))], 512), [
                            [vModelSelect, dealData.value.stage]
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_48, [
                        createBaseVNode("div", null, [
                          _cache[54] || (_cache[54] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Probability (%)", -1)),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((dealData.value.probability) = $event)),
                            type: "number",
                            min: "0",
                            max: "100",
                            class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                            placeholder: "100"
                          }, null, 512), [
                            [
                              vModelText,
                              dealData.value.probability,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          _cache[55] || (_cache[55] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Close Date", -1)),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((dealData.value.expectedCloseDate) = $event)),
                            type: "date",
                            class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                          }, null, 512), [
                            [vModelText, dealData.value.expectedCloseDate]
                          ])
                        ])
                      ]),
                      createBaseVNode("div", null, [
                        _cache[56] || (_cache[56] = createBaseVNode("label", { class: "block text-xs uppercase tracking-wider text-gray-500 mb-1" }, "Description", -1)),
                        withDirectives(createBaseVNode("textarea", {
                          "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((dealData.value.description) = $event)),
                          rows: "3",
                          class: "w-full px-3 py-2 text-xs border border-gray-300 bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition resize-none",
                          placeholder: `Auto-created from lead: ${__props.lead?.name || 'Converted Lead'}`
                        }, null, 8, _hoisted_49), [
                          [vModelText, dealData.value.description]
                        ])
                      ])
                    ])
                  ]))
                : createCommentVNode("", true),
              (step.value === 3)
                ? (openBlock(), createElementBlock("div", _hoisted_50, [
                    createBaseVNode("h4", _hoisted_51, [
                      createVNode(unref(CircleCheck), {
                        size: 13,
                        class: "text-emerald-600"
                      }),
                      _cache[57] || (_cache[57] = createTextVNode(" Review & Confirm ", -1))
                    ]),
                    createBaseVNode("div", _hoisted_52, [
                      createBaseVNode("div", _hoisted_53, [
                        createBaseVNode("div", _hoisted_54, [
                          createBaseVNode("div", _hoisted_55, [
                            createVNode(unref(User), {
                              size: 11,
                              class: "text-[#2F2E8B]"
                            }),
                            _cache[58] || (_cache[58] = createBaseVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-[#2F2E8B]" }, "Contact", -1))
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[21] || (_cache[21] = $event => (step.value = 0)),
                            class: "text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest"
                          }, "Edit")
                        ]),
                        (contactOption.value === 'create')
                          ? (openBlock(), createElementBlock("div", _hoisted_56, [
                              createBaseVNode("div", null, [
                                _cache[59] || (_cache[59] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Name", -1)),
                                _cache[60] || (_cache[60] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("span", _hoisted_57, toDisplayString(contactData.value.firstName) + " " + toDisplayString(contactData.value.lastName), 1)
                              ]),
                              createBaseVNode("div", null, [
                                _cache[61] || (_cache[61] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Email", -1)),
                                _cache[62] || (_cache[62] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("span", _hoisted_58, toDisplayString(contactData.value.email), 1)
                              ]),
                              (contactData.value.phone)
                                ? (openBlock(), createElementBlock("div", _hoisted_59, [
                                    _cache[63] || (_cache[63] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Phone", -1)),
                                    _cache[64] || (_cache[64] = createBaseVNode("br", null, null, -1)),
                                    createBaseVNode("span", _hoisted_60, toDisplayString(contactData.value.phone), 1)
                                  ]))
                                : createCommentVNode("", true)
                            ]))
                          : (contactOption.value === 'existing')
                            ? (openBlock(), createElementBlock("div", _hoisted_61, [
                                _cache[65] || (_cache[65] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Linking ID", -1)),
                                _cache[66] || (_cache[66] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("span", _hoisted_62, toDisplayString(selectedContactId.value || '—'), 1)
                              ]))
                            : (openBlock(), createElementBlock("div", _hoisted_63, "Skipped"))
                      ]),
                      createBaseVNode("div", _hoisted_64, [
                        createBaseVNode("div", _hoisted_65, [
                          createBaseVNode("div", _hoisted_66, [
                            createVNode(unref(Building2), {
                              size: 11,
                              class: "text-[#2F2E8B]"
                            }),
                            _cache[67] || (_cache[67] = createBaseVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-[#2F2E8B]" }, "Account", -1))
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[22] || (_cache[22] = $event => (step.value = 1)),
                            class: "text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest"
                          }, "Edit")
                        ]),
                        (accountOption.value === 'create')
                          ? (openBlock(), createElementBlock("div", _hoisted_67, [
                              createBaseVNode("div", null, [
                                _cache[68] || (_cache[68] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Name", -1)),
                                _cache[69] || (_cache[69] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("span", _hoisted_68, toDisplayString(accountData.value.name), 1)
                              ]),
                              (accountData.value.website)
                                ? (openBlock(), createElementBlock("div", _hoisted_69, [
                                    _cache[70] || (_cache[70] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Website", -1)),
                                    _cache[71] || (_cache[71] = createBaseVNode("br", null, null, -1)),
                                    createBaseVNode("span", _hoisted_70, toDisplayString(accountData.value.website), 1)
                                  ]))
                                : createCommentVNode("", true),
                              (accountData.value.industry)
                                ? (openBlock(), createElementBlock("div", _hoisted_71, [
                                    _cache[72] || (_cache[72] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Industry", -1)),
                                    _cache[73] || (_cache[73] = createBaseVNode("br", null, null, -1)),
                                    createBaseVNode("span", _hoisted_72, toDisplayString(accountData.value.industry), 1)
                                  ]))
                                : createCommentVNode("", true)
                            ]))
                          : (accountOption.value === 'existing')
                            ? (openBlock(), createElementBlock("div", _hoisted_73, [
                                _cache[74] || (_cache[74] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Linking ID", -1)),
                                _cache[75] || (_cache[75] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("span", _hoisted_74, toDisplayString(selectedAccountId.value || '—'), 1)
                              ]))
                            : (openBlock(), createElementBlock("div", _hoisted_75, "Skipped"))
                      ]),
                      createBaseVNode("div", _hoisted_76, [
                        createBaseVNode("div", _hoisted_77, [
                          createBaseVNode("div", _hoisted_78, [
                            createVNode(unref(Handshake), {
                              size: 11,
                              class: "text-[#2F2E8B]"
                            }),
                            _cache[76] || (_cache[76] = createBaseVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-[#2F2E8B]" }, "Deal", -1))
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[23] || (_cache[23] = $event => (step.value = 2)),
                            class: "text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest"
                          }, "Edit")
                        ]),
                        createBaseVNode("div", _hoisted_79, [
                          createBaseVNode("div", null, [
                            _cache[77] || (_cache[77] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Name", -1)),
                            _cache[78] || (_cache[78] = createBaseVNode("br", null, null, -1)),
                            createBaseVNode("span", _hoisted_80, toDisplayString(dealData.value.name), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[79] || (_cache[79] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Value", -1)),
                            _cache[80] || (_cache[80] = createBaseVNode("br", null, null, -1)),
                            createBaseVNode("span", _hoisted_81, toDisplayString(unref(formatCurrency)(dealData.value.value || 0)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[81] || (_cache[81] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-wider" }, "Stage", -1)),
                            _cache[82] || (_cache[82] = createBaseVNode("br", null, null, -1)),
                            createBaseVNode("span", _hoisted_82, toDisplayString(dealData.value.stage), 1)
                          ])
                        ])
                      ])
                    ]),
                    _cache[83] || (_cache[83] = createBaseVNode("div", { class: "border border-gray-200 p-3 text-xs uppercase tracking-wider text-gray-700 font-bold" }, " This will convert the lead to an account. A contact and deal will be auto-created under the account. Continue? ", -1))
                  ]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_83, [
              (step.value > 0)
                ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: _cache[24] || (_cache[24] = $event => (step.value--)),
                    class: "flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-300 transition"
                  }, [
                    createVNode(unref(ArrowLeft), { size: 12 }),
                    _cache[84] || (_cache[84] = createTextVNode(" Back ", -1))
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_84)),
              createBaseVNode("div", _hoisted_85, [
                createBaseVNode("button", {
                  onClick: _cache[25] || (_cache[25] = $event => (_ctx.$emit('update:modelValue', false))),
                  class: "px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition"
                }, " Cancel "),
                (step.value < 3)
                  ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: nextStep,
                      class: "flex items-center gap-1.5 px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2F2E8B] text-white hover:bg-[#1D226B] transition shadow-lg shadow-[#2F2E8B]/20"
                    }, [
                      _cache[85] || (_cache[85] = createTextVNode(" Next ", -1)),
                      createVNode(unref(ArrowRight), { size: 12 })
                    ]))
                  : (openBlock(), createElementBlock("button", {
                      key: 1,
                      onClick: convertLead$1,
                      disabled: loading.value,
                      class: "flex items-center gap-1.5 px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, [
                      createVNode(unref(Check), { size: 12 }),
                      createTextVNode(" " + toDisplayString(loading.value ? 'Converting...' : 'Convert Lead'), 1)
                    ], 8, _hoisted_86))
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const LeadConversionModal = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-661aaf2b"]]);

export { ArchiveRestore as A, ChevronUp as C, LeadDetailModal as L, LeadConversionModal as a };
