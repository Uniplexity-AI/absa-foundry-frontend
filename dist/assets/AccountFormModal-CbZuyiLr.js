import { a5 as createLucideIcon, g as _export_sfc, G as decodeJWT, C as useRBAC, D as computed, h as onMounted, r as ref, O as watch, o as openBlock, z as createBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, l as createCommentVNode, m as createTextVNode, s as withModifiers, q as createVNode, y as unref, a6 as X, a8 as MessageSquare, F as Fragment, e as renderList, j as normalizeClass, a7 as resolveDynamicComponent, aa as FileText, v as withDirectives, x as vModelText, L as LoaderCircle, W as Teleport, S as vModelSelect, a3 as vModelCheckbox, a0 as withKeys, af as __vitePreload } from './index-F0Jaczum.js';
import { n as getDocuments, K as updateAccount, a as getLeads, e as updateLead, M as createDeal, N as updateDeal, r as updateMeeting, s as createMeeting, t as deleteMeeting, O as deleteAccountActivity, P as getAccountActivities, Q as getAccountDeals, y as getMeetings, L as logAccountActivity, R as getAccountContacts, I as createAccount, A as getContacts, S as getDeals } from './CRMModule-Cs71Ed91.js';
import { D as Download, S as SquarePen, H as History, a as Save, L as LinkedDocumentsWidget, b as Link } from './LinkedDocumentsWidget-Cn0suB_h.js';
import { G as Globe, L as Linkedin, a as Twitter, F as Facebook, C as CircleX, T as Tag, A as Archive, b as GitCommitHorizontal, V as Video, c as CalendarPlus } from './video-Dwyshccd.js';
import { P as Phone } from './phone-B0RWpClh.js';
import { M as Mail } from './mail-lnOR8KuB.js';
import { R as RefreshCw } from './refresh-cw-CO0HBn27.js';
import { I as Info } from './info-DBvdJWE2.js';
import { U as Users } from './users-p3GCu42X.js';
import { B as Briefcase, S as StickyNote, U as UserPlus } from './user-plus-_P5EeI1z.js';
import { C as CalendarCheck } from './calendar-check-C131p9Ua.js';
import { C as CircleCheck } from './circle-check-Cn2nH0Eo.js';
import { S as Search, C as ChevronLeft } from './search-CFC07nlX.js';
import { P as Plus } from './plus-DOjsdRqQ.js';
import { T as Trash2 } from './trash-2-BFC5iEZ7.js';
import { C as ChevronDown } from './chevron-down-DAYdaw5v.js';
import { C as Check } from './check-D6Z4Lj9D.js';
import { C as Clock } from './clock-0Lm9w9HU.js';
import { T as Target } from './target-CTU7VLkX.js';
import { D as DollarSign, T as TrendingUp } from './trending-up-TsG3lxPA.js';
import { C as ChevronRight } from './chevron-right-DmsnYZxZ.js';
import { M as MapPin } from './map-pin-Ca2jTTzr.js';
import { P as Paperclip } from './paperclip-CWWSgq9C.js';
import { U as UserSearchSelect } from './UserSearchSelect-FeeOpg-9.js';
import { B as Building2 } from './building-2-B65Nq4FC.js';
import { U as UserCheck, A as AlignLeft } from './user-check-DMfpTZav.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Copy = createLucideIcon("CopyIcon", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Share2 = createLucideIcon("Share2Icon", [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Truck = createLucideIcon("TruckIcon", [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
]);

const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/40"
};
const _hoisted_2$1 = { class: "bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-6xl h-full sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 rounded-none relative" };
const _hoisted_3$1 = { class: "flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-20" };
const _hoisted_4$1 = { class: "flex items-center gap-2 sm:gap-4 flex-1 min-w-0" };
const _hoisted_5$1 = { class: "flex-1 min-w-0 flex items-center gap-2 sm:gap-4" };
const _hoisted_6$1 = { class: "w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 flex items-center justify-center text-lg sm:text-2xl font-mono font-black text-[#2F2E8B] shadow-inner shrink-0 uppercase tracking-tighter" };
const _hoisted_7$1 = { class: "min-w-0 flex-1" };
const _hoisted_8$1 = { class: "flex items-center gap-2 mb-1" };
const _hoisted_9$1 = {
  key: 0,
  class: "hidden sm:inline text-[8px] font-mono font-bold text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase tracking-widest border border-blue-100"
};
const _hoisted_10$1 = { class: "text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-outfit truncate" };
const _hoisted_11$1 = {
  key: 0,
  class: "text-gray-300 font-mono font-normal mx-2 hidden sm:inline"
};
const _hoisted_12$1 = {
  key: 1,
  class: "hidden sm:inline text-gray-400 text-lg font-mono font-bold uppercase tracking-widest"
};
const _hoisted_13$1 = { class: "flex items-center gap-2" };
const _hoisted_14$1 = {
  key: 0,
  class: "absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-50 min-w-[140px] rounded"
};
const _hoisted_15$1 = { class: "bg-gray-50 border-b border-gray-100 px-4 sm:px-8 py-3 flex flex-wrap items-center gap-3 sm:gap-4 relative z-10" };
const _hoisted_16$1 = { class: "flex items-center gap-2 w-full sm:w-auto" };
const _hoisted_17$1 = { class: "flex flex-wrap gap-1" };
const _hoisted_18$1 = ["href"];
const _hoisted_19$1 = ["href"];
const _hoisted_20$1 = {
  key: 0,
  class: "inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest"
};
const _hoisted_21$1 = { class: "px-3 sm:px-8 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10" };
const _hoisted_22$1 = { class: "flex gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap" };
const _hoisted_23$1 = ["onClick"];
const _hoisted_24$1 = { class: "flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative" };
const _hoisted_25$1 = { class: "relative z-10 space-y-12 animate-in fade-in duration-500" };
const _hoisted_26$1 = {
  key: 0,
  class: "space-y-12"
};
const _hoisted_27$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-8" };
const _hoisted_28$1 = { class: "lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_29$1 = { class: "bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group" };
const _hoisted_30$1 = { class: "text-xl font-mono font-black text-[#2F2E8B] tracking-tighter" };
const _hoisted_31$1 = { class: "bg-gray-50 border border-gray-100 p-6 relative overflow-hidden group" };
const _hoisted_32$1 = { class: "text-xl font-mono font-black text-gray-900 uppercase tracking-tighter" };
const _hoisted_33$1 = { class: "bg-[#2F2E8B] border border-[#2F2E8B] p-6 relative overflow-hidden group shadow-lg shadow-blue-100" };
const _hoisted_34$1 = { class: "text-xl font-mono font-black text-white uppercase tracking-widest" };
const _hoisted_35$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100" };
const _hoisted_36$1 = { class: "lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8" };
const _hoisted_37$1 = { class: "space-y-6" };
const _hoisted_38$1 = { class: "group" };
const _hoisted_39$1 = ["href"];
const _hoisted_40$1 = {
  key: 1,
  class: "text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest"
};
const _hoisted_41$1 = { class: "group" };
const _hoisted_42$1 = ["href"];
const _hoisted_43$1 = {
  key: 1,
  class: "text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest"
};
const _hoisted_44$1 = { class: "space-y-6" };
const _hoisted_45$1 = { class: "group" };
const _hoisted_46$1 = ["href"];
const _hoisted_47$1 = {
  key: 1,
  class: "text-[11px] font-mono font-black text-gray-300 uppercase tracking-widest"
};
const _hoisted_48$1 = { class: "group" };
const _hoisted_49$1 = { class: "flex flex-wrap gap-4 mt-2" };
const _hoisted_50$1 = ["href"];
const _hoisted_51$1 = ["href"];
const _hoisted_52$1 = ["href"];
const _hoisted_53$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100" };
const _hoisted_54$1 = { class: "lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8" };
const _hoisted_55$1 = {
  key: 0,
  class: "bg-gray-50 border border-gray-100 p-6 space-y-4"
};
const _hoisted_56$1 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest flex items-center gap-2" };
const _hoisted_57$1 = { class: "text-[10px] font-mono font-black text-gray-600 space-y-1 uppercase tracking-tight" };
const _hoisted_58$1 = { key: 0 };
const _hoisted_59$1 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_60$1 = {
  key: 1,
  class: "bg-gray-50 border border-gray-100 p-6 space-y-4"
};
const _hoisted_61$1 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest flex items-center gap-2" };
const _hoisted_62$1 = { class: "text-[10px] font-mono font-black text-gray-600 space-y-1 uppercase tracking-tight" };
const _hoisted_63$1 = { key: 0 };
const _hoisted_64$1 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_65$1 = {
  key: 0,
  class: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100"
};
const _hoisted_66$1 = { class: "lg:col-span-9" };
const _hoisted_67$1 = { class: "bg-gray-50/50 border border-gray-100 p-6 italic text-[11px] font-mono text-gray-600 whitespace-pre-wrap leading-relaxed uppercase tracking-tight" };
const _hoisted_68$1 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-dashed border-gray-100" };
const _hoisted_69$1 = { class: "lg:col-span-9" };
const _hoisted_70$1 = { class: "bg-gray-50 border border-gray-100 p-6" };
const _hoisted_71$1 = { class: "flex items-end gap-4 mb-4" };
const _hoisted_72$1 = { class: "text-left shrink-0" };
const _hoisted_73$1 = { class: "text-2xl font-mono font-black text-gray-900" };
const _hoisted_74$1 = { class: "flex-1" };
const _hoisted_75 = ["disabled"];
const _hoisted_76 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_77 = { class: "bg-gray-50/80 border border-gray-200 p-6 pt-8 mt-12 relative overflow-hidden" };
const _hoisted_78 = { class: "grid grid-cols-2 md:grid-cols-4 gap-8" };
const _hoisted_79 = { class: "text-[9px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_80 = { class: "text-[9px] font-mono font-black text-gray-900 uppercase" };
const _hoisted_81 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase" };
const _hoisted_82 = { class: "text-[9px] font-mono text-gray-400 font-bold truncate block" };
const _hoisted_83 = {
  key: 1,
  class: "space-y-6"
};
const _hoisted_84 = { class: "flex items-center gap-2" };
const _hoisted_85 = { class: "relative flex-1" };
const _hoisted_86 = { class: "bg-white w-full max-w-lg mx-4 border border-gray-200 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col" };
const _hoisted_87 = { class: "px-4 py-3 border-b border-gray-100 flex items-center justify-between" };
const _hoisted_88 = { class: "p-4 space-y-3 overflow-y-auto flex-1" };
const _hoisted_89 = { class: "relative" };
const _hoisted_90 = {
  key: 0,
  class: "flex justify-center py-8"
};
const _hoisted_91 = {
  key: 1,
  class: "space-y-1 max-h-60 overflow-y-auto"
};
const _hoisted_92 = ["onClick"];
const _hoisted_93 = { class: "flex items-center gap-3 min-w-0" };
const _hoisted_94 = { class: "w-8 h-8 bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center text-[#2F2E8B] font-black text-[8px] font-mono" };
const _hoisted_95 = { class: "min-w-0" };
const _hoisted_96 = { class: "text-[9px] font-mono font-black text-gray-900 uppercase truncate" };
const _hoisted_97 = { class: "text-[7px] font-mono text-gray-500 truncate" };
const _hoisted_98 = {
  key: 2,
  class: "text-center py-8 text-[9px] font-mono text-gray-400"
};
const _hoisted_99 = {
  key: 3,
  class: "text-center py-8 text-[9px] font-mono text-gray-400"
};
const _hoisted_100 = { class: "px-4 py-3 border-t border-gray-100 flex justify-end" };
const _hoisted_101 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_102 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 gap-4"
};
const _hoisted_103 = { class: "flex items-center gap-4" };
const _hoisted_104 = { class: "w-12 h-12 bg-[#2F2E8B] text-white flex items-center justify-center font-mono font-black text-lg group-hover:scale-110 transition-transform" };
const _hoisted_105 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" };
const _hoisted_106 = { class: "text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5" };
const _hoisted_107 = { class: "flex gap-2" };
const _hoisted_108 = ["href"];
const _hoisted_109 = ["onClick"];
const _hoisted_110 = ["onClick"];
const _hoisted_111 = ["onClick"];
const _hoisted_112 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_113 = {
  key: 2,
  class: "space-y-6"
};
const _hoisted_114 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4" };
const _hoisted_115 = { class: "bg-[#2F2E8B] p-5 relative overflow-hidden" };
const _hoisted_116 = { class: "text-2xl font-mono font-black text-white relative z-10" };
const _hoisted_117 = { class: "bg-gray-50 border border-gray-100 p-5" };
const _hoisted_118 = { class: "text-xl font-mono font-black text-[#2F2E8B]" };
const _hoisted_119 = { class: "bg-gray-50 border border-gray-100 p-5" };
const _hoisted_120 = { class: "text-xl font-mono font-black text-emerald-600" };
const _hoisted_121 = { class: "bg-gray-50 border border-gray-100 p-5" };
const _hoisted_122 = { class: "text-xl font-mono font-black text-gray-900" };
const _hoisted_123 = { class: "flex items-center justify-between" };
const _hoisted_124 = { class: "flex gap-1 flex-wrap" };
const _hoisted_125 = ["onClick"];
const _hoisted_126 = {
  key: 0,
  class: "border border-dashed border-[#2F2E8B] bg-blue-50/30 p-6 space-y-4"
};
const _hoisted_127 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_128 = ["value"];
const _hoisted_129 = {
  key: 0,
  class: "px-3 py-2 bg-gray-50 border border-dashed border-gray-200 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest"
};
const _hoisted_130 = {
  key: 1,
  class: "relative"
};
const _hoisted_131 = ["onClick"];
const _hoisted_132 = {
  key: 1,
  class: "text-[10px] font-mono text-gray-400 uppercase tracking-widest px-1"
};
const _hoisted_133 = {
  key: 0,
  class: "absolute z-50 w-full bg-white border border-[#2F2E8B]/30 shadow-xl mt-0.5 max-h-48 overflow-y-auto"
};
const _hoisted_134 = { class: "p-2 border-b border-gray-100 sticky top-0 bg-white" };
const _hoisted_135 = {
  key: 0,
  class: "px-3 py-4 text-[9px] font-mono text-gray-400 text-center uppercase tracking-widest"
};
const _hoisted_136 = ["onClick"];
const _hoisted_137 = { class: "flex-1 min-w-0" };
const _hoisted_138 = { class: "text-[8px] font-mono text-gray-400 uppercase tracking-widest" };
const _hoisted_139 = { class: "md:col-span-2" };
const _hoisted_140 = { class: "flex justify-end gap-3 pt-2 border-t border-dashed border-blue-100" };
const _hoisted_141 = ["disabled"];
const _hoisted_142 = {
  key: 1,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_143 = { class: "space-y-3" };
const _hoisted_144 = { class: "pl-3" };
const _hoisted_145 = { class: "flex items-start justify-between gap-4 mb-3" };
const _hoisted_146 = { class: "flex-1 min-w-0" };
const _hoisted_147 = { class: "flex items-center gap-2 mb-1 flex-wrap" };
const _hoisted_148 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight truncate" };
const _hoisted_149 = {
  key: 0,
  class: "px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[8px] font-mono font-black uppercase tracking-widest"
};
const _hoisted_150 = { class: "flex items-center gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest flex-wrap" };
const _hoisted_151 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_152 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_153 = {
  key: 3,
  class: "flex items-center gap-1"
};
const _hoisted_154 = {
  key: 0,
  class: "text-[9px] font-mono text-[#2F2E8B] mt-2 flex items-center gap-1 uppercase tracking-wide"
};
const _hoisted_155 = { class: "text-right shrink-0" };
const _hoisted_156 = { class: "text-lg font-mono font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_157 = {
  key: 0,
  class: "flex items-center gap-2 flex-wrap pt-3 border-t border-dashed border-gray-100"
};
const _hoisted_158 = ["onClick"];
const _hoisted_159 = ["onClick"];
const _hoisted_160 = ["onClick"];
const _hoisted_161 = {
  key: 0,
  class: "mt-3 p-3 border border-dashed border-[#2F2E8B]/30 bg-gray-50/50 space-y-2"
};
const _hoisted_162 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_163 = ["value"];
const _hoisted_164 = { class: "flex items-center gap-2" };
const _hoisted_165 = ["onClick"];
const _hoisted_166 = {
  key: 0,
  class: "flex items-center justify-between pt-4 border-t border-gray-100"
};
const _hoisted_167 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_168 = { class: "flex items-center gap-1" };
const _hoisted_169 = ["disabled"];
const _hoisted_170 = ["disabled"];
const _hoisted_171 = ["onClick"];
const _hoisted_172 = ["disabled"];
const _hoisted_173 = ["disabled"];
const _hoisted_174 = {
  key: 3,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_175 = {
  key: 3,
  class: "space-y-6"
};
const _hoisted_176 = { class: "bg-blue-50/30 border border-dashed border-[#2F2E8B]/30 p-6 space-y-4" };
const _hoisted_177 = { class: "flex justify-end" };
const _hoisted_178 = ["disabled"];
const _hoisted_179 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_180 = { class: "flex items-start justify-between gap-4" };
const _hoisted_181 = { class: "flex-1 min-w-0" };
const _hoisted_182 = { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" };
const _hoisted_183 = {
  key: 0,
  class: "text-amber-500"
};
const _hoisted_184 = { class: "flex justify-end gap-2 mt-2" };
const _hoisted_185 = ["onClick", "disabled"];
const _hoisted_186 = {
  key: 1,
  class: "text-[11px] font-mono text-gray-700 leading-relaxed whitespace-pre-wrap"
};
const _hoisted_187 = {
  key: 0,
  class: "flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
};
const _hoisted_188 = ["onClick"];
const _hoisted_189 = ["onClick"];
const _hoisted_190 = {
  key: 1,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_191 = {
  key: 4,
  class: "space-y-6"
};
const _hoisted_192 = { class: "flex items-center justify-between" };
const _hoisted_193 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" };
const _hoisted_194 = {
  key: 0,
  class: "border border-dashed border-[#2F2E8B] bg-blue-50/30 p-6 space-y-4"
};
const _hoisted_195 = { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2" };
const _hoisted_196 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_197 = { class: "md:col-span-2" };
const _hoisted_198 = { class: "md:col-span-2" };
const _hoisted_199 = { class: "flex justify-end gap-3 pt-2 border-t border-dashed border-blue-100" };
const _hoisted_200 = ["disabled"];
const _hoisted_201 = {
  key: 1,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_202 = {
  key: 2,
  class: "space-y-3"
};
const _hoisted_203 = { class: "pl-3 flex items-start justify-between gap-4" };
const _hoisted_204 = { class: "flex-1 min-w-0" };
const _hoisted_205 = { class: "flex items-center gap-2 mb-1 flex-wrap" };
const _hoisted_206 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight truncate" };
const _hoisted_207 = {
  key: 1,
  class: "px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-black text-gray-500 uppercase tracking-widest"
};
const _hoisted_208 = { class: "flex items-center gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest flex-wrap mt-1" };
const _hoisted_209 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_210 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_211 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_212 = {
  key: 0,
  class: "text-[10px] font-mono text-gray-600 mt-2 leading-relaxed"
};
const _hoisted_213 = {
  key: 0,
  class: "shrink-0"
};
const _hoisted_214 = { class: "flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" };
const _hoisted_215 = ["onClick"];
const _hoisted_216 = ["onClick"];
const _hoisted_217 = {
  key: 3,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_218 = {
  key: 5,
  class: "space-y-6"
};
const _hoisted_219 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-24"
};
const _hoisted_220 = {
  key: 1,
  class: "relative pl-10"
};
const _hoisted_221 = { class: "absolute left-[13px] top-[11px] z-20" };
const _hoisted_222 = { class: "relative" };
const _hoisted_223 = { class: "ml-[26px] bg-white border border-gray-100 rounded-md p-2.5 transition-all hover:border-[#2F2E8B]/20 hover:shadow-none group relative" };
const _hoisted_224 = { class: "flex items-start justify-between gap-2" };
const _hoisted_225 = { class: "flex-1 min-w-0" };
const _hoisted_226 = { class: "flex items-center gap-1.5 mb-0.5 flex-wrap" };
const _hoisted_227 = { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap" };
const _hoisted_228 = { class: "inline-flex items-center gap-1 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_229 = { class: "text-[12px] font-mono text-gray-700 leading-snug tracking-tight uppercase font-bold" };
const _hoisted_230 = {
  key: 0,
  class: "mt-2 space-y-1"
};
const _hoisted_231 = { class: "font-black text-[#2F2E8B] uppercase tracking-wider shrink-0 min-w-[80px]" };
const _hoisted_232 = ["title"];
const _hoisted_233 = ["title"];
const _hoisted_234 = {
  key: 1,
  class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest"
};
const _hoisted_235 = { key: 0 };
const _hoisted_236 = { key: 1 };
const _hoisted_237 = { key: 2 };
const _hoisted_238 = {
  key: 3,
  class: "text-green-600"
};
const _hoisted_239 = { class: "flex items-center gap-1 shrink-0" };
const _hoisted_240 = ["onClick"];
const _hoisted_241 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-24 bg-gray-50/50 border border-dashed border-gray-200 rounded-lg"
};
const _hoisted_242 = {
  key: 6,
  class: "space-y-6"
};
const _hoisted_243 = { class: "px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 sticky bottom-0 z-20" };
const _hoisted_244 = { class: "flex items-center gap-2" };
const _hoisted_245 = { class: "flex items-center gap-2" };
const _hoisted_246 = { class: "bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden" };
const _hoisted_247 = { class: "p-6" };
const _hoisted_248 = { class: "flex items-center gap-3 mb-4" };
const _hoisted_249 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" };
const _hoisted_250 = { class: "text-sm font-semibold text-gray-800" };
const _hoisted_251 = { class: "flex justify-end gap-2 mt-6" };
const _hoisted_252 = { class: "bg-white shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200" };
const _hoisted_253 = { class: "bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 flex items-center justify-between" };
const _hoisted_254 = { class: "flex items-center gap-2.5" };
const _hoisted_255 = { class: "w-8 h-8 bg-emerald-500/30 border border-emerald-400/30 flex items-center justify-center" };
const _hoisted_256 = { class: "text-[11px] font-black text-white uppercase tracking-tight" };
const _hoisted_257 = { class: "text-[7px] font-mono text-emerald-200 uppercase tracking-wider leading-none" };
const _hoisted_258 = { class: "p-4 space-y-3 max-h-[60vh] overflow-y-auto" };
const _hoisted_259 = { class: "bg-emerald-50 border border-emerald-100 p-3 flex items-center justify-between gap-3" };
const _hoisted_260 = { class: "text-[12px] font-black text-gray-900 font-mono mt-0.5 break-all" };
const _hoisted_261 = ["href"];
const _hoisted_262 = { class: "space-y-1 max-h-28 overflow-y-auto pr-1" };
const _hoisted_263 = ["onUpdate:modelValue"];
const _hoisted_264 = { class: "flex gap-1.5 mt-1.5" };
const _hoisted_265 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_266 = {
  key: 0,
  class: "text-[9px] font-mono text-red-600 bg-red-50 border border-red-200 p-2"
};
const _hoisted_267 = { class: "flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50" };
const _hoisted_268 = ["disabled"];
const _hoisted_269 = { class: "bg-white shadow-2xl w-full max-w-sm rounded-lg border border-green-200 overflow-hidden animate-in zoom-in-95 duration-200" };
const _hoisted_270 = { class: "bg-green-600 px-4 py-2.5 flex items-center justify-between" };
const _hoisted_271 = { class: "flex items-center gap-2" };
const _hoisted_272 = { class: "w-6 h-6 bg-green-700 rounded-full flex items-center justify-center" };
const _hoisted_273 = { class: "p-3.5 space-y-3" };
const _hoisted_274 = { class: "flex items-center gap-2 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-green-50 px-2.5 py-1.5 rounded-sm border border-green-100" };
const _hoisted_275 = {
  key: 0,
  class: "text-green-600"
};
const _hoisted_276 = { class: "bg-green-50 border border-green-100 px-3 py-2 rounded" };
const _hoisted_277 = { class: "text-[8px] font-mono font-bold text-green-700 uppercase tracking-widest flex items-center gap-1.5" };
const _hoisted_278 = { class: "px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2" };
const _hoisted_279 = ["href"];
const _hoisted_280 = { class: "flex items-center gap-2" };

const DEALS_PER_PAGE = 12;

const _sfc_main$1 = {
  __name: 'AccountDetailModal',
  props: {
  modelValue: Boolean,
  account: Object,
  users: { type: Array, default: () => [] }
},
  emits: ['update:modelValue', 'edit', 'delete', 'archive', 'refresh'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const { getTenantId } = decodeJWT();
const { getUserEmail } = decodeJWT();
const { canAssign, initializeRBAC } = useRBAC();
const canAssignCrm = computed(() => canAssign('crm'));
onMounted(() => { initializeRBAC().catch(() => {}); });

const activeTab = ref('overview');
const contacts = ref([]);
const activities = ref([]);
const loadingContacts = ref(false);
const loadingActivities = ref(false);
const contactSearchQuery = ref('');
const showLinkLeadModal = ref(false);
const leadSearchQuery = ref('');
const leadSearchResults = ref([]);
const searchingLeads = ref(false);
let contactSearchTimer = null;

const filteredContacts = computed(() => {
  const q = contactSearchQuery.value?.toLowerCase().trim();
  if (!q) return contacts.value;
  return contacts.value.filter(c => {
    const name = ((c.firstName || '') + ' ' + (c.lastName || '')).toLowerCase();
    const email = (c.email || '').toLowerCase();
    const phone = (c.phone || '');
    return name.includes(q) || email.includes(q) || phone.includes(q);
  });
});

function debouncedContactSearch() {
  clearTimeout(contactSearchTimer);
  contactSearchTimer = setTimeout(() => {}, 300);
}

// Deals state
const deals = ref([]);
const loadingDeals = ref(false);
const showDealForm = ref(false);
const savingDeal = ref(false);
const dealStageFilter = ref('all');
const dealPage = ref(1);
const newDeal = ref({
  name: '', value: 0, stage: 'Prospecting', probability: 10,
  expectedCloseDate: '', assignedTo: [], description: '',
  nextStep: '', status: 'active', cac: null
});
const showAssigneeDropdown = ref(false);
const assigneeSearch = ref('');
const filteredAssigneeUsers = computed(() => {
  if (!assigneeSearch.value) return props.users;
  const q = assigneeSearch.value.toLowerCase();
  return props.users.filter(u => u.email.toLowerCase().includes(q));
});
function toggleAssignee(email) {
  const idx = newDeal.value.assignedTo.indexOf(email);
  if (idx === -1) newDeal.value.assignedTo.push(email);
  else newDeal.value.assignedTo.splice(idx, 1);
}
function dealAssigneesDisplay(assignedTo) {
  if (!assignedTo) return [];
  if (Array.isArray(assignedTo)) return assignedTo;
  return assignedTo.split(',').map(s => s.trim()).filter(Boolean);
}

// Notes state
const accountNotes = ref([]);
const newNoteText = ref('');
const savingNote = ref(false);
const editingNoteId = ref(null);
const editingNoteText = ref('');

// Meetings state
const meetings = ref([]);
const loadingMeetings = ref(false);
const showMeetingForm = ref(false);
const savingMeeting = ref(false);
const editingMeetingId = ref(null);
const newMeeting = ref({
  title: '', description: '', meeting_type: 'call',
  start_datetime: '', end_datetime: '', location: '', agenda: ''
});



watch(showMeetingForm, (open) => {
  if (!open) editingMeetingId.value = null;
});

// CAC state
const cacValue = ref(null);
const savingCac = ref(false);
const cacSaved = ref(false);
const localCac = ref(0);

const tabs = [
  { id: 'overview', label: 'Overview', lucideIcon: Info },
  { id: 'contacts', label: 'Contacts', lucideIcon: Users },
  { id: 'deals', label: 'Deals', lucideIcon: Briefcase },
  { id: 'meetings', label: 'Meetings', lucideIcon: CalendarCheck },
  { id: 'notes', label: 'Notes', lucideIcon: StickyNote },
  { id: 'activities', label: 'Activities', lucideIcon: History },
  { id: 'documents', label: 'Documents', lucideIcon: FileText }
];

const hasBillingAddress = computed(() => {
  return props.account?.billingStreet || props.account?.billingCity || 
         props.account?.billingState || props.account?.billingPostalCode || 
         props.account?.billingCountry;
});

const hasShippingAddress = computed(() => {
  return props.account?.shippingStreet || props.account?.shippingCity || 
         props.account?.shippingState || props.account?.shippingPostalCode || 
         props.account?.shippingCountry;
});

computed(() => {
  return props.account?.linkedin || props.account?.twitter || props.account?.facebook;
});

watch(() => props.modelValue, (newVal) => {
  if (newVal && props.account) {
    activeTab.value = 'overview';
    contacts.value = [];
    activities.value = [];
    deals.value = [];
    meetings.value = [];
    accountNotes.value = Array.isArray(props.account?.account_notes) ? [...props.account.account_notes] : [];
    cacValue.value = props.account?.cac ?? null;
    localCac.value = props.account?.cac ?? 0;
    cacSaved.value = false;
    showDealForm.value = false;
    showMeetingForm.value = false;
    newNoteText.value = '';
  }
});

watch(() => props.account, (acc) => {
  if (acc) {
    accountNotes.value = Array.isArray(acc.account_notes) ? [...acc.account_notes] : [];
    cacValue.value = acc?.cac ?? null;
    localCac.value = acc?.cac ?? 0;
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'contacts' && contacts.value.length === 0) {
    loadContacts();
  } else if (newTab === 'activities' && activities.value.length === 0) {
    loadActivities();
  } else if (newTab === 'deals' && deals.value.length === 0) {
    loadDeals();
  } else if (newTab === 'meetings' && meetings.value.length === 0) {
    loadMeetings();
  }
});

async function loadContacts() {
  if (!props.account?.id) return;
  
  loadingContacts.value = true;
  try {
    const tenantId = getTenantId();

    // Associated leads now serve as the contacts under this account
    // (independent of the lead's pipeline stage).
    const associatedLeadIds = Array.isArray(props.account.associatedLeadIds)
      ? props.account.associatedLeadIds
      : [];
    let leadContacts = [];
    if (associatedLeadIds.length > 0) {
      try {
        const leadsData = await getLeads(tenantId, { per_page: 1000 });
        const allLeads = leadsData?.items || [];
          leadContacts = allLeads
            .filter(l => associatedLeadIds.includes(l.id))
            .map(l => {
              const parts = (l.name || '').trim().split(/\s+/);
              const firstName = parts.shift() || '';
              const lastName = parts.join(' ');
              const lat = Number(l.location?.lat ?? l.latitude ?? l.lat);
              const lng = Number(l.location?.lng ?? l.longitude ?? l.lng);
              return {
                id: l.id,
                firstName,
                lastName,
                title: l.position || 'LEAD',
                email: l.email || '',
                phone: l.phone || '',
                company: l.company || '',
                address: l.address || l.location?.address || '',
                latitude: Number.isFinite(lat) ? lat : null,
                longitude: Number.isFinite(lng) ? lng : null,
                sourceType: 'lead'
              };
            });
      } catch (err) {
        console.warn('[AccountDetailModal] Failed to load associated leads as contacts', err);
      }
    }

    // Also include any explicitly linked contacts (legacy / direct links).
    let directContacts = [];
    try {
      const result = await getAccountContacts(props.account.id, tenantId);
      directContacts = Array.isArray(result) ? result : [];
    } catch (err) {
      console.warn('[AccountDetailModal] Failed to load direct account contacts', err);
    }

    // Merge, dedupe by id, leads take precedence in display order.
    const seen = new Set();
    const merged = [];
    for (const c of [...leadContacts, ...directContacts]) {
      if (!c || !c.id || seen.has(c.id)) continue;
      seen.add(c.id);
      merged.push(c);
    }
    contacts.value = merged;
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load contacts:', error);
    contacts.value = [];
  } finally {
    loadingContacts.value = false;
  }
}

async function searchLeadsToLink() {
  const q = leadSearchQuery.value.trim();
  if (!q || q.length < 2) { leadSearchResults.value = []; return; }
  searchingLeads.value = true;
  try {
    const tenantId = getTenantId();
    const res = await getLeads(tenantId, { search: q, per_page: 20 });
    const items = Array.isArray(res) ? res : (res?.items || []);
    const existingIds = new Set(contacts.value.map(c => c.id));
    leadSearchResults.value = items.filter(l => !existingIds.has(l.id));
  } catch { leadSearchResults.value = []; }
  finally { searchingLeads.value = false; }
}

async function linkLeadAsContact(lead) {
  if (!props.account?.id || !lead?.id) return;
  try {
    const tenantId = getTenantId();
    await updateLead(lead.id, { account_id: props.account.id, convertedAccountId: props.account.id, stage: 'closed-won' }, tenantId);
    await logActivity('contact:link', `Lead "${lead.name}" linked as contact to this account`);
    showLinkLeadModal.value = false;
    leadSearchQuery.value = '';
    leadSearchResults.value = [];
    await loadContacts();
    await loadActivities();
  } catch (err) {
    console.error('[AccountDetailModal] Failed to link lead:', err);
    alert('Failed to link lead as contact.');
  }
}

async function loadDeals() {
  if (!props.account?.id) return;
  loadingDeals.value = true;
  try {
    const tenantId = getTenantId();
    const result = await getAccountDeals(props.account.id, tenantId);
    deals.value = Array.isArray(result) ? result : (result?.items || result?.deals || result?.data || []);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load deals:', error);
    deals.value = [];
  } finally {
    loadingDeals.value = false;
  }
}

async function saveDeal() {
  if (!newDeal.value.name?.trim()) return;
  savingDeal.value = true;
  try {
    const tenantId = getTenantId();
    const selfEmail = getUserEmail() || '';
    // Backend expects assignedTo as a string, not array
    let assignedToStr = '';
    if (canAssignCrm.value) {
      assignedToStr = Array.isArray(newDeal.value.assignedTo) ? newDeal.value.assignedTo[0] || '' : String(newDeal.value.assignedTo || '');
    } else {
      assignedToStr = selfEmail;
    }
    // Ensure numeric fields are numbers
    const payload = {
      name: newDeal.value.name.trim(),
      value: Number(newDeal.value.value) || 0,
      stage: newDeal.value.stage || 'Prospecting',
      probability: Number(newDeal.value.probability) || 0,
      expectedCloseDate: newDeal.value.expectedCloseDate || '',
      assignedTo: assignedToStr,
      description: newDeal.value.description || '',
      nextStep: newDeal.value.nextStep || '',
      status: newDeal.value.status || 'active',
      cac: newDeal.value.cac ? Number(newDeal.value.cac) : null,
      accountId: props.account.id,
      accountName: props.account.name,
      tenant_id: tenantId
    };
    await createDeal(payload);
    newDeal.value = { name: '', value: 0, stage: 'Prospecting', probability: 10, expectedCloseDate: '', assignedTo: [], description: '', nextStep: '', status: 'active', cac: null };
    showAssigneeDropdown.value = false;
    assigneeSearch.value = '';
    showDealForm.value = false;
    await loadDeals();
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save deal:', error);
  } finally {
    savingDeal.value = false;
  }
}

async function updateDealStage(deal, newStage) {
  try {
    const tenantId = getTenantId();
    await updateDeal(deal.id, { ...deal, stage: newStage }, tenantId);
    const idx = deals.value.findIndex(d => d.id === deal.id);
    if (idx !== -1) deals.value[idx] = { ...deals.value[idx], stage: newStage };
  } catch (error) {
    console.error('[AccountDetailModal] Failed to update deal stage:', error);
  }
}

const editingDeal = ref(null);
const editingDealData = ref({});

function startEditDeal(deal) {
  editingDeal.value = deal.id;
  editingDealData.value = {
    name: deal.name || '',
    value: deal.value || 0,
    stage: deal.stage || 'Prospecting',
    probability: deal.probability || 10,
    expectedCloseDate: deal.expectedCloseDate || '',
    nextStep: deal.nextStep || '',
    description: deal.description || '',
    cac: deal.cac || null
  };
}

function cancelEditDeal() {
  editingDeal.value = null;
  editingDealData.value = {};
}

async function saveEditDeal(deal) {
  const tenantId = getTenantId();
  if (!tenantId || !editingDealData.value.name?.trim()) return;
  try {
    await updateDeal(deal.id, { ...deal, ...editingDealData.value, tenant_id: tenantId }, tenantId);
    const idx = deals.value.findIndex(d => d.id === deal.id);
    if (idx !== -1) deals.value[idx] = { ...deals.value[idx], ...editingDealData.value };
    cancelEditDeal();
  } catch (e) {
    console.error('[AccountDetailModal] Failed to update deal:', e);
  }
}

async function archiveDeal(deal) {
  try {
    const tenantId = getTenantId();
    await updateDeal(deal.id, { ...deal, archived: true, status: 'archived' }, tenantId);
    deals.value = deals.value.filter(d => d.id !== deal.id);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to archive deal:', error);
  }
}

async function addNote() {
  if (!newNoteText.value?.trim()) return;
  savingNote.value = true;
  try {
    const tenantId = getTenantId();
    const noteText = newNoteText.value.trim();
    const note = { id: Date.now().toString(), text: noteText, createdAt: new Date().toISOString() };
    const updatedNotes = [...accountNotes.value, note];
    await updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    newNoteText.value = '';
    await logActivity('note:create', `Note added: "${noteText.substring(0, 500)}"`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save note:', error);
  } finally {
    savingNote.value = false;
  }
}

async function deleteNote(noteId) {
  const ok = await showConfirmDialog('DELETE NOTE', 'Permanently delete this note? This cannot be undone.', true);
  if (!ok) return;
  try {
    const tenantId = getTenantId();
    const deletedNote = accountNotes.value.find(n => n.id === noteId);
    const updatedNotes = accountNotes.value.filter(n => n.id !== noteId);
    await updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    if (editingNoteId.value === noteId) {
      editingNoteId.value = null;
      editingNoteText.value = '';
    }
    await logActivity('note:delete', `Note deleted: "${(deletedNote?.text || '').substring(0, 500)}"`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to delete note:', error);
  }
}

function startEditNote(note) {
  editingNoteId.value = note.id;
  editingNoteText.value = note.text || '';
}

function cancelEditNote() {
  editingNoteId.value = null;
  editingNoteText.value = '';
}

async function saveEditNote(noteId) {
  if (!editingNoteText.value?.trim()) return;
  try {
    const tenantId = getTenantId();
    const updatedNotes = accountNotes.value.map(n => n.id === noteId
      ? { ...n, text: editingNoteText.value.trim(), updatedAt: new Date().toISOString() }
      : n);
    await updateAccount(props.account.id, { ...props.account, account_notes: updatedNotes }, tenantId);
    accountNotes.value = updatedNotes;
    editingNoteId.value = null;
    editingNoteText.value = '';
  } catch (error) {
    console.error('[AccountDetailModal] Failed to update note:', error);
  }
}

async function loadMeetings() {
  if (!props.account?.id) return;
  loadingMeetings.value = true;
  try {
    const tenantId = getTenantId();
    const result = await getMeetings(tenantId, { related_record_id: props.account.id, limit: 100 });
    meetings.value = Array.isArray(result) ? result : (result?.meetings || result?.data || []);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load meetings:', error);
    meetings.value = [];
  } finally {
    loadingMeetings.value = false;
  }
}

async function saveMeeting() {
  if (!newMeeting.value.title?.trim() || !newMeeting.value.start_datetime || !newMeeting.value.end_datetime) return;
  savingMeeting.value = true;
  try {
    const tenantId = getTenantId();
    const jwtUtils = decodeJWT();
    const organizerName = jwtUtils.getUserName?.() || jwtUtils.getUserEmail?.() || 'Account Manager';
    const organizerId = jwtUtils.getUserId?.() || jwtUtils.getUserEmail?.() || 'unknown';
    const payload = {
      tenant_id: tenantId,
      title: newMeeting.value.title.trim(),
      description: newMeeting.value.description || '',
      meeting_type: newMeeting.value.meeting_type || 'call',
      start_datetime: new Date(newMeeting.value.start_datetime).toISOString(),
      end_datetime: new Date(newMeeting.value.end_datetime).toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      location_type: newMeeting.value.location ? 'physical' : 'virtual',
      location: newMeeting.value.location || null,
      agenda: newMeeting.value.agenda || '',
      organizer_id: organizerId,
      organizer_name: organizerName,
      participants: [],
      related_records: [{ record_type: 'account', record_id: props.account.id, record_name: props.account.name }]
    };
    const isUpdate = !!editingMeetingId.value;
    if (editingMeetingId.value) {
      await updateMeeting(editingMeetingId.value, payload);
    } else {
      await createMeeting(payload);
    }
    const meetingTitle = newMeeting.value.title;
    newMeeting.value = { title: '', description: '', meeting_type: 'call', start_datetime: '', end_datetime: '', location: '', agenda: '' };
    editingMeetingId.value = null;
    showMeetingForm.value = false;
    await loadMeetings();
    await logActivity('meeting:create', `Meeting "${meetingTitle}" ${isUpdate ? 'updated' : 'created'}`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save meeting:', error);
  } finally {
    savingMeeting.value = false;
  }
}

function editMeeting(meeting) {
  editingMeetingId.value = meeting.id;
  const toLocal = (iso) => iso ? new Date(iso).toISOString().slice(0, 16) : '';
  newMeeting.value = {
    title: meeting.title || '',
    description: meeting.description || '',
    meeting_type: meeting.meeting_type || 'call',
    start_datetime: toLocal(meeting.start_datetime || meeting.start_time),
    end_datetime: toLocal(meeting.end_datetime || meeting.end_time),
    location: meeting.location || '',
    agenda: meeting.agenda || ''
  };
  showMeetingForm.value = true;
}

async function deleteMeetingRecord(meeting) {
  if (!confirm(`Delete meeting "${meeting.title || 'this meeting'}"? This cannot be undone.`)) return;
  try {
    await deleteMeeting(meeting.id);
    meetings.value = meetings.value.filter(m => m.id !== meeting.id);
    await logActivity('meeting:delete', `Meeting "${meeting.title || 'this record'}" deleted`);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to delete meeting:', error);
  }
}


/** Add/subtract a preset amount from the current CMA and pre-fill the input */
function adjustCac(amount) {
  // If input is empty/null, start from current CMA
  const base = (cacValue.value !== null && cacValue.value !== undefined && cacValue.value !== '')
    ? parseFloat(cacValue.value)
    : (localCac.value || 0);
  const newVal = Math.max(0, base + amount);
  cacValue.value = newVal;
}

async function saveCac() {
  if (cacValue.value === null || cacValue.value === undefined || cacValue.value === '') return;
  savingCac.value = true;
  try {
    const tenantId = getTenantId();
    const oldCac = props.account?.cac || 0;
    const newCac = parseFloat(cacValue.value);
    await updateAccount(props.account.id, { ...props.account, cac: newCac }, tenantId);
    localCac.value = newCac;
    cacSaved.value = true;
    await logActivity('cac:update', `CAC changed: ${formatCurrency(oldCac)} → ${formatCurrency(newCac)}`, [
      { field: 'CMA (CAC)', oldValue: formatCurrency(oldCac), newValue: formatCurrency(newCac) }
    ]);
    emit('refresh');
    setTimeout(() => { cacSaved.value = false; }, 2500);
  } catch (error) {
    console.error('[AccountDetailModal] Failed to save CAC:', error);
  } finally {
    savingCac.value = false;
  }
}

const PIPELINE_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const stageBadgeClass = (stage) => {
  const map = {
    'Prospecting': 'bg-gray-100 text-gray-600 border-gray-200',
    'Qualification': 'bg-blue-50 text-blue-700 border-blue-100',
    'Proposal': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Negotiation': 'bg-amber-50 text-amber-700 border-amber-100',
    'Closed Won': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Closed Lost': 'bg-red-50 text-red-700 border-red-100'
  };
  return map[stage] || 'bg-gray-100 text-gray-600 border-gray-200';
};

const stageBarClass = (stage) => {
  const map = {
    'Prospecting': 'bg-gray-400',
    'Qualification': 'bg-blue-500',
    'Proposal': 'bg-indigo-500',
    'Negotiation': 'bg-amber-500',
    'Closed Won': 'bg-emerald-500',
    'Closed Lost': 'bg-red-500'
  };
  return map[stage] || 'bg-gray-400';
};

const filteredDeals = computed(() => {
  if (dealStageFilter.value === 'all') return deals.value.filter(d => !d.archived);
  if (dealStageFilter.value === 'archived') return deals.value.filter(d => d.archived);
  return deals.value.filter(d => !d.archived && d.stage === dealStageFilter.value);
});

// Only show stages that have at least one deal
const stagesWithDeals = computed(() =>
  PIPELINE_STAGES.filter(stage => deals.value.some(d => d.stage === stage))
);

const dealTotalPages = computed(() => Math.max(1, Math.ceil(filteredDeals.value.length / DEALS_PER_PAGE)));

const pagedDeals = computed(() => {
  const start = (dealPage.value - 1) * DEALS_PER_PAGE;
  return filteredDeals.value.slice(start, start + DEALS_PER_PAGE);
});

watch(dealStageFilter, () => { dealPage.value = 1; });

const dealStats = computed(() => {
  const active = deals.value.filter(d => !d.archived);
  const won = active.filter(d => d.stage === 'Closed Won');
  const totalValue = active.reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0);
  const wonValue = won.reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0);
  return { total: active.length, totalValue, wonValue, winRate: active.length ? Math.round((won.length / active.length) * 100) : 0 };
});


async function loadActivities() {
  if (!props.account?.id) return;
  
  loadingActivities.value = true;
  try {
    const tenantId = getTenantId();
    const data = await getAccountActivities(props.account.id, tenantId);
    activities.value = (Array.isArray(data) ? data : (data?.items || data?.data || [])).map(a => ({
      ...a,
      type: a.type || a.action || 'updated',
      actor: a.actor || a.metadata?.actor || 'system',
      createdAt: a.createdAt || a.timestamp
    }));
  } catch (error) {
    console.error('[AccountDetailModal] Failed to load activities:', error);
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
    await deleteAccountActivity(activityId, getTenantId());
    activities.value = activities.value.filter(a => a.id !== activityId);
  } catch (err) {
    console.error('[AccountDetailModal] Failed to delete activity:', err);
  }
}

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

function close() {
  emit('update:modelValue', false);
}

function handleEdit() {
  emit('edit', props.account);
}

function handleDelete() {
  emit('delete', props.account);
}

// ── Export Report ──
const showExportMenu = ref(false);

async function exportReport(format) {
  showExportMenu.value = false;
  const a = props.account;
  if (!a) return;

  const tenantColor = '#2F2E8B';
  const now = new Date().toISOString().split('T')[0];
  const name = (a.name || 'UNKNOWN').trim();
  const safeName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
  const reportTitle = `${safeName}_REPORT_${now}`;

  // ── Fetch related data ──
  let documents = [];
  const tenantId = getTenantId();
  // Load data for export (non-blocking — use whatever is available)
  if (!activities.value.length) { loadActivities().catch(() => {}); }
  if (!deals.value.length) { loadDeals().catch(() => {}); }
  if (!meetings.value.length) { loadMeetings().catch(() => {}); }
  try {
    const docsResp = await getDocuments(tenantId, { linked_to_type: 'account', linked_to_id: a.id });
    documents = docsResp.items || [];
  } catch (e) { /* ignore */ }

  // ── Account fields ──
  const accountFields = [
    { label: 'Account Name', value: a.name || 'N/A' },
    { label: 'Website', value: a.website || 'N/A' },
    { label: 'Industry', value: a.industry || 'N/A' },
    { label: 'Phone', value: a.phone || 'N/A' },
    { label: 'Email', value: a.email || 'N/A' },
    { label: 'Employees', value: a.numberOfEmployees || 'N/A' },
    { label: 'Annual Revenue', value: a.annualRevenue ? formatCurrency(a.annualRevenue) : 'N/A' },
    { label: 'Assigned To', value: a.assignedTo || 'N/A' },
    { label: 'Description', value: a.description || 'N/A' },
    { label: 'Billing Street', value: a.billingStreet || 'N/A' },
    { label: 'Billing City', value: a.billingCity || 'N/A' },
    { label: 'Billing State', value: a.billingState || 'N/A' },
    { label: 'Billing Postal Code', value: a.billingPostalCode || 'N/A' },
    { label: 'Billing Country', value: a.billingCountry || 'N/A' },
    { label: 'Shipping Street', value: a.shippingStreet || 'N/A' },
    { label: 'Shipping City', value: a.shippingCity || 'N/A' },
    { label: 'Shipping State', value: a.shippingState || 'N/A' },
    { label: 'Shipping Postal Code', value: a.shippingPostalCode || 'N/A' },
    { label: 'Shipping Country', value: a.shippingCountry || 'N/A' },
    { label: 'LinkedIn', value: a.linkedin || 'N/A' },
    { label: 'Twitter', value: a.twitter || 'N/A' },
    { label: 'Facebook', value: a.facebook || 'N/A' },
    { label: 'CMA (Client Maintenance Cost)', value: formatCurrency(a.cac || 0) },
    { label: 'Created', value: formatDate(a.createdAt || a.created_at) }
  ];

  // Contacts derived from linked leads
  const contactDetails = contacts.value.filter(c => c.sourceType === 'lead').map(c => ({
    name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'N/A',
    email: c.email || '—',
    phone: c.phone || '—',
    title: c.title || '—'
  }));

  // Activities
  const activityDetails = (activities.value || []).map(a => ({
    type: (a.type || a.action || 'event').toUpperCase(),
    notes: a.notes || a.description || '—',
    date: formatDate(a.createdAt || a.timestamp),
    actor: (a.actor || 'system').split('@')[0]
  }));

  // Deals
  const dealDetails = (deals.value || []).map(d => ({
    name: d.name || '—',
    stage: d.stage || '—',
    value: formatCurrency(d.value || 0),
    status: d.status || 'active'
  }));

  // Meetings
  const meetingDetails = (meetings.value || []).map(m => ({
    title: m.title || '—',
    type: m.meeting_type || '—',
    location: m.location || '—',
    date: formatDate(m.start_datetime || m.start_time)
  }));

  // Notes
  const noteDetails = (accountNotes.value || []).map(n => ({
    text: n.text || '—',
    date: formatDate(n.createdAt)
  }));

  // Documents
  const docDetails = documents.map(d => ({
    name: d.name || 'N/A',
    category: (d.category || 'FILE').toUpperCase(),
    size: formatFileSize(d.file_size),
    date: formatDate(d.created_at)
  }));

  function toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  }

  function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // ═══════════════════════════════════════
  // PDF (jsPDF)
  // ═══════════════════════════════════════
  if (format === 'pdf') {
    const { jsPDF } = await __vitePreload(async () => { const { jsPDF } = await import('./jspdf.es.min-Z9zcgTku.js').then(n => n.j);return { jsPDF }},true              ?[]:void 0);
    const autoTable = (await __vitePreload(async () => { const {default: __vite_default__} = await import('./jspdf.plugin.autotable-DJ3LRzAR.js');return { default: __vite_default__ }},true              ?[]:void 0)).default;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;
    const contentW = pageW - margin * 2;
    let y = margin;

    function jspdfSection(title) {
      if (y > pageW - 30) { doc.addPage(); y = margin; }
      doc.setFillColor(245, 245, 255);
      doc.rect(margin, y, contentW, 6, 'F');
      doc.setTextColor(47, 46, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 2, y + 4.5);
      y += 9;
    }

    function jspdfCell(label, value) {
      if (y > pageW - 20) { doc.addPage(); y = margin; }
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
        if (y > pageW - 30) { doc.addPage(); y = margin; }
        const colCount = headers.length;
        const remaining = contentW - (opt?.colWidth0 || 40);
        const colW0 = opt?.colWidth0 || (colCount <= 2 ? 40 : Math.floor(contentW / colCount));
        const colStyles = {};
        colStyles[0] = { cellWidth: colW0, fontStyle: 'bold', textColor: [85,85,85] };
        if (colCount === 2) { colStyles[1] = { cellWidth: remaining }; }
        else if (opt?.colWidth1) {
          colStyles[1] = { cellWidth: opt.colWidth1 };
          const restW = contentW - colW0 - opt.colWidth1;
          const otherW = Math.floor(restW / (colCount - 2));
          for (let i = 2; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        } else {
          const otherW = Math.floor(remaining / (colCount - 1));
          for (let i = 1; i < colCount; i++) colStyles[i] = { cellWidth: Math.max(otherW, 15) };
        }
        const result = autoTable(doc, { startY: y, head: [headers], body: data, margin: { left: margin, right: margin }, tableWidth: contentW, styles: { fontSize: 6.5, font: 'helvetica', cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 }, overflow: 'linebreak', minCellHeight: 5, valign: 'top' }, headStyles: { fillColor: [47, 46, 139], textColor: 255, fontStyle: 'bold', fontSize: 7, halign: 'left' }, columnStyles: colStyles });
        y = (result && result.lastFinalY) ? result.lastFinalY + 4 : y + 20;
      } catch (e) { console.warn('[PDF] autoTable error:', e); y += 20; }
    }

    doc.setFillColor(47, 46, 139); doc.rect(margin, y, contentW, 16, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('ACCOUNT REPORT — ' + name.toUpperCase(), margin + 3, y + 7);
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(200, 210, 255);
    doc.text((a.industry || '') + '  |  Generated: ' + now + '  |  ID: ' + (a.id?.slice(0, 8) || '—'), margin + 3, y + 12.5);
    y += 20;

    jspdfSection('Account Profile');
    for (let i = 0; i < accountFields.length; i += 15) {
      const chunk = accountFields.slice(i, i + 15);
      if (i > 0) jspdfSection('Account Profile (continued)');
      chunk.forEach(f => jspdfCell(f.label, f.value));
    }
    jspdfSection('Contacts (' + contactDetails.length + ')');
    if (contactDetails.length) { jspdfTable(['Name','Email','Phone','Title'], contactDetails.map(c => [c.name, c.email, c.phone, c.title])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No contacts.', margin, y); y += 5; }
    jspdfSection('Deals (' + dealDetails.length + ')');
    if (dealDetails.length) { jspdfTable(['Name','Stage','Value','Status'], dealDetails.map(d => [d.name, d.stage, d.value, d.status])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No deals.', margin, y); y += 5; }
    jspdfSection('Activity Log (' + activityDetails.length + ')');
    if (activityDetails.length) { jspdfTable(['Activity','Notes','Date','Actor'], activityDetails.map(a => [a.type, a.notes, a.date, a.actor]), { colWidth0: 18, colWidth1: 100 }); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No activities.', margin, y); y += 5; }
    jspdfSection('Account Notes (' + noteDetails.length + ')');
    if (noteDetails.length) { jspdfTable(['Note','Date'], noteDetails.map(n => [n.text, n.date]), { colWidth0: 150 }); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No notes.', margin, y); y += 5; }
    jspdfSection('Meetings (' + meetingDetails.length + ')');
    if (meetingDetails.length) { jspdfTable(['Title','Type','Location','Date'], meetingDetails.map(m => [m.title, m.type, m.location, m.date])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No meetings.', margin, y); y += 5; }
    jspdfSection('Documents (' + docDetails.length + ')');
    if (docDetails.length) { jspdfTable(['Name','Category','Size','Date'], docDetails.map(d => [d.name, d.category, d.size, d.date])); } else { doc.setFontSize(8); doc.setTextColor(150); doc.text('No documents.', margin, y); y += 5; }
    doc.setFontSize(7); doc.setTextColor(180);
    doc.text('Uniplexity CRM — Account Report • ' + now + ' • Confidential', margin, doc.internal.pageSize.getHeight() - 10);
    doc.save(safeName + '_REPORT.pdf');

  // ═══════════════════════════════════════
  // DOCX
  // ═══════════════════════════════════════
  } else if (format === 'docx') {
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><style>
      @page { size: A4 landscape; margin: 1.2cm; }
      body { font-family: 'Calibri', sans-serif; font-size: 10px; color: #2d2d2d; line-height: 1.5; }
      h1 { background: ${tenantColor}; color: #fff; padding: 12px 18px; font-size: 18px; font-weight: 600; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; table-layout: fixed; }
      th, td { border: 1px solid #c0c0c0; padding: 4px 7px; text-align: left; font-size: 9px; word-wrap: break-word; white-space: normal; }
      th { background: ${tenantColor}; color: #fff; font-weight: 600; font-size: 8.5px; }
      .section-title { font-weight: 700; font-size: 11px; margin: 14px 0 5px; padding: 4px 10px; background: #f0f0f0; border-left: 4px solid ${tenantColor}; color: ${tenantColor}; }
      .footer { text-align: center; font-size: 7px; color: #999; margin-top: 20px; }
      .subtitle { color: #888; font-size: 8.5px; }
    </style></head><body>
      <h1>Account Report — ${toTitleCase(a.name) || 'Unknown'}</h1>
      <p class="subtitle">${toTitleCase(a.industry) || ''} | Generated: ${now} | ID: ${a.id?.substring(0,8) || '—'}</p>
      <div class="section-title">Account Profile</div>
      <table>${accountFields.map(f => '<tr><td style="width:28%;background:#f5f5f5;font-weight:600;">' + f.label + '</td><td>' + f.value + '</td></tr>').join('')}</table>
      <div class="section-title">Contacts (' + contactDetails.length + ')</div>
      ${contactDetails.length ? '<table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Title</th></tr>' + contactDetails.map(c => '<tr><td>' + c.name + '</td><td>' + c.email + '</td><td>' + c.phone + '</td><td>' + c.title + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No contacts.</p>'}
      <div class="section-title">Deals (' + dealDetails.length + ')</div>
      ${dealDetails.length ? '<table><tr><th>Name</th><th>Stage</th><th>Value</th><th>Status</th></tr>' + dealDetails.map(d => '<tr><td>' + d.name + '</td><td>' + d.stage + '</td><td>' + d.value + '</td><td>' + d.status + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No deals.</p>'}
      <div class="section-title">Activity Log (' + activityDetails.length + ')</div>
      ${activityDetails.length ? '<table><tr><th>Activity</th><th>Notes</th><th>Date</th><th>Actor</th></tr>' + activityDetails.map(a => '<tr><td>' + a.type + '</td><td>' + a.notes + '</td><td>' + a.date + '</td><td>' + a.actor + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No activities recorded.</p>'}
      <div class="section-title">Account Notes (' + noteDetails.length + ')</div>
      ${noteDetails.length ? '<table><tr><th>Note</th><th>Date</th></tr>' + noteDetails.map(n => '<tr><td>' + n.text + '</td><td>' + n.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No notes.</p>'}
      <div class="section-title">Meetings (' + meetingDetails.length + ')</div>
      ${meetingDetails.length ? '<table><tr><th>Title</th><th>Type</th><th>Location</th><th>Date</th></tr>' + meetingDetails.map(m => '<tr><td>' + m.title + '</td><td>' + m.type + '</td><td>' + m.location + '</td><td>' + m.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No meetings.</p>'}
      <div class="section-title">Documents (' + docDetails.length + ')</div>
      ${docDetails.length ? '<table><tr><th>Name</th><th>Category</th><th>Size</th><th>Date</th></tr>' + docDetails.map(d => '<tr><td>' + d.name + '</td><td>' + d.category + '</td><td>' + d.size + '</td><td>' + d.date + '</td></tr>').join('') + '</table>' : '<p class="subtitle">No documents.</p>'}
      <div class="footer">Uniplexity CRM — Confidential</div>
    </body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const docLink = document.createElement('a'); docLink.href = url;
    docLink.download = reportTitle + '.doc'; docLink.click(); URL.revokeObjectURL(url);

  // ═══════════════════════════════════════
  // CSV
  // ═══════════════════════════════════════
  } else {
    const csvRows = [];
    csvRows.push('ACCOUNT REPORT,' + (a.name || 'UNKNOWN') + ',Generated,' + now);
    csvRows.push(''); csvRows.push('ACCOUNT PROFILE'); csvRows.push('FIELD,VALUE');
    accountFields.forEach(f => csvRows.push('"' + f.label + '","' + f.value.replace(/"/g, '""') + '"'));
    csvRows.push(''); csvRows.push('CONTACTS,' + contactDetails.length); csvRows.push('Name,Email,Phone,Title');
    contactDetails.forEach(c => csvRows.push('"' + c.name + '","' + c.email + '","' + c.phone + '","' + c.title + '"'));
    csvRows.push(''); csvRows.push('DEALS,' + dealDetails.length); csvRows.push('Name,Stage,Value,Status');
    dealDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.stage + '","' + d.value + '","' + d.status + '"'));
    csvRows.push(''); csvRows.push('ACTIVITY LOG,' + activityDetails.length); csvRows.push('Type,Notes,Date,Actor');
    activityDetails.forEach(at => csvRows.push('"' + at.type + '","' + at.notes.replace(/"/g, '""') + '","' + at.date + '","' + at.actor + '"'));
    csvRows.push(''); csvRows.push('ACCOUNT NOTES,' + noteDetails.length); csvRows.push('Note,Date');
    noteDetails.forEach(n => csvRows.push('"' + n.text.replace(/"/g, '""') + '","' + n.date + '"'));
    csvRows.push(''); csvRows.push('MEETINGS,' + meetingDetails.length); csvRows.push('Title,Type,Location,Date');
    meetingDetails.forEach(m => csvRows.push('"' + m.title + '","' + m.type + '","' + m.location + '","' + m.date + '"'));
    csvRows.push(''); csvRows.push('DOCUMENTS,' + docDetails.length); csvRows.push('Name,Category,Size,Date');
    docDetails.forEach(d => csvRows.push('"' + d.name + '","' + d.category + '","' + d.size + '","' + d.date + '"'));
    const csv = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const csvLink = document.createElement('a'); csvLink.href = url;
    csvLink.download = reportTitle + '.csv'; csvLink.click(); URL.revokeObjectURL(url);
  }
}

// ── Close export menu on outside click ──
onMounted(() => {
  document.addEventListener('click', () => { showExportMenu.value = false; });
});

const showWhatsAppDialog = ref(false);
const whatsAppPhoneNumber = ref('');
const whatsAppContactName = ref('');
const whatsAppMessage = ref('');

function openWhatsAppDialog(phone, name) {
  whatsAppPhoneNumber.value = phone || '';
  whatsAppContactName.value = name || '';
  whatsAppMessage.value = '';
  showWhatsAppDialog.value = true;
}

function closeWhatsAppDialog() {
  showWhatsAppDialog.value = false;
  whatsAppMessage.value = '';
}

async function proceedWithWhatsApp() {
  const msg = whatsAppMessage.value?.trim() || '';
  await logActivity('communication:whatsapp', `WhatsApp message to ${whatsAppContactName.value} at ${whatsAppPhoneNumber.value}${msg ? ' | Message: ' + msg : ''}`);
  closeWhatsAppDialog();
}

async function unlinkContact(contact) {
  if (!confirm(`Unlink "${contact.firstName} ${contact.lastName}" from this account?`)) return;
  try {
    const tenantId = getTenantId();
    if (contact.sourceType === 'lead' && contact.id) {
      await updateLead(contact.id, { account_id: null, convertedAccountId: null }, tenantId);
    }
    await logActivity('contact:unlink', `Contact "${contact.firstName} ${contact.lastName}" unlinked from account`);
    await loadContacts();
    await loadActivities();
  } catch (err) {
    console.error('[AccountDetailModal] Failed to unlink contact:', err);
    alert('Failed to unlink contact.');
  }
}

// ── Call Dialog ──
const showCallDialog = ref(false);
const callPhoneNumber = ref('');
const customCallPhone = ref('');
const callContactName = ref('');
const callTalkingPoints = ref([]);
const callNewTalkingPoint = ref('');
const callOutcomeVal = ref('connected');
const callDurationVal = ref(0);
const callNoteText = ref('');
const callSaving = ref(false);
const callErrorMsg = ref('');

function openCallDialog(phone, name) {
  callPhoneNumber.value = phone || '';
  customCallPhone.value = phone || '';
  callContactName.value = name || '';
  resetCallTalkingPoints();
  callOutcomeVal.value = 'connected';
  callDurationVal.value = 0;
  callNoteText.value = '';
  callErrorMsg.value = '';
  showCallDialog.value = true;
}

function closeCallDialog() {
  showCallDialog.value = false;
}

function resetCallTalkingPoints() {
  callTalkingPoints.value = [
    { text: 'Confirm decision-maker & best time to talk', done: false },
    { text: 'Recap previous interaction / context', done: false },
    { text: 'Identify pain points & current situation', done: false },
    { text: 'Pitch tailored value proposition', done: false },
    { text: 'Discuss budget, timeline, authority', done: false },
    { text: 'Set next steps / follow-up date', done: false }
  ];
}

function addCallTalkingPoint() {
  const t = callNewTalkingPoint.value.trim();
  if (!t) return;
  callTalkingPoints.value.push({ text: t, done: false });
  callNewTalkingPoint.value = '';
}

async function saveAccountCallNote() {
  if (!callNoteText.value.trim()) { callErrorMsg.value = 'Please enter call notes.'; return; }
  callSaving.value = true;
  callErrorMsg.value = '';
  try {
    const donePoints = callTalkingPoints.value.filter(p => p.done).map(p => p.text);
    const summary = `Call to ${callContactName.value || 'Account'} at ${callPhoneNumber.value || '—'} | Outcome: ${callOutcomeVal.value} | Duration: ${callDurationVal.value || 0}min | Notes: ${callNoteText.value.trim()}${donePoints.length ? ' | Topics: ' + donePoints.join(', ') : ''}`;
    await logActivity('communication:call', summary);
    closeCallDialog();
    await loadActivities();
  } catch (e) {
    callErrorMsg.value = 'Failed to save call record.';
    console.error('[AccountDetailModal] Failed to save call:', e);
  } finally {
    callSaving.value = false;
  }
}

async function logActivity(action, notes = '', changes = []) {
  if (!props.account?.id) return;
  try {
    const metadata = {
      actor: getUserEmail() || 'system',
      actor_role: 'owner',
      timestamp: new Date().toISOString()
    };
    if (changes.length > 0) {
      metadata.changes = changes;
    }
    await logAccountActivity(props.account.id, {
      type: action,
      notes: notes || '',
      description: notes || `Activity: ${action}`,
      metadata,
      tenant_id: getTenantId()
    });
    if (activeTab.value === 'activities') {
      await loadActivities();
    }
  } catch (err) {
    console.error('[AccountDetailModal] Failed to log activity:', err);
  }
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).toUpperCase();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(amount || 0);
}

function formatActivityType(type) {
  return type
    .replace('communication:', '')
    .replace('account:', '')
    .replace('cac:', 'CMA ')
    .replace(':create', '')
    .replace(':update', '')
    .replace(':delete', '')
    .replace(/_/g, ' ')
    .toUpperCase()
    .trim();
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
    'meeting:delete': Trash2,
    'note:create': FileText,
    'note:delete': Trash2,
    'document:upload': Paperclip,
    'document:delete': Trash2,
    'cac:update': TrendingUp,
    'cac': TrendingUp,
    'account:create': Plus,
    'account:update': SquarePen,
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
    'appointment:create': 'bg-violet-500',
    'appointment:update': 'bg-violet-600',
    'visit:create': 'bg-orange-500',
    'meeting:create': 'bg-purple-500',
    'meeting:delete': 'bg-red-500',
    'note:create': 'bg-amber-500',
    'note:delete': 'bg-red-500',
    'document:upload': 'bg-pink-500',
    'document:delete': 'bg-red-500',
    'cac:update': 'bg-amber-500',
    'cac': 'bg-amber-500',
    'account:create': 'bg-emerald-500',
    'account:update': 'bg-blue-500',
    'WhatsApp': 'bg-green-500',
    'Phone Call': 'bg-emerald-600'
  };
  return colors[type?.toLowerCase()] || 'bg-gray-400';
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            _cache[171] || (_cache[171] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]" }, null, -1)),
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("div", _hoisted_4$1, [
                _cache[67] || (_cache[67] = createBaseVNode("div", { class: "w-1.5 h-8 bg-[#2F2E8B]" }, null, -1)),
                createBaseVNode("div", _hoisted_5$1, [
                  createBaseVNode("div", _hoisted_6$1, toDisplayString(getInitials(__props.account?.name)), 1),
                  createBaseVNode("div", _hoisted_7$1, [
                    createBaseVNode("div", _hoisted_8$1, [
                      _cache[66] || (_cache[66] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] truncate" }, "Account_Node // Corporate_Registry", -1)),
                      (__props.account?.id)
                        ? (openBlock(), createElementBlock("span", _hoisted_9$1, "ID:" + toDisplayString(__props.account.id.substring(0, 8)), 1))
                        : createCommentVNode("", true)
                    ]),
                    createBaseVNode("h3", _hoisted_10$1, [
                      createTextVNode(toDisplayString(__props.account?.name || 'NAMELESS_ACCOUNT') + " ", 1),
                      (__props.account?.industry)
                        ? (openBlock(), createElementBlock("span", _hoisted_11$1, "//"))
                        : createCommentVNode("", true),
                      (__props.account?.industry)
                        ? (openBlock(), createElementBlock("span", _hoisted_12$1, toDisplayString(__props.account.industry), 1))
                        : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_13$1, [
                createBaseVNode("div", {
                  class: "relative",
                  onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
                }, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = $event => (showExportMenu.value = !showExportMenu.value)),
                    class: "w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all shadow-none group",
                    title: "Export Report"
                  }, [
                    createVNode(unref(Download), {
                      size: 16,
                      class: "group-hover:scale-110 transition-transform"
                    })
                  ]),
                  (showExportMenu.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
                        createBaseVNode("button", {
                          onClick: _cache[1] || (_cache[1] = $event => (exportReport('pdf'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50"
                        }, [...(_cache[68] || (_cache[68] = [
                          createBaseVNode("i", { class: "fas fa-file-pdf text-red-500 text-[10px] w-4" }, null, -1),
                          createTextVNode(" PDF ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: _cache[2] || (_cache[2] = $event => (exportReport('docx'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2 border-b border-gray-50"
                        }, [...(_cache[69] || (_cache[69] = [
                          createBaseVNode("i", { class: "fas fa-file-word text-blue-500 text-[10px] w-4" }, null, -1),
                          createTextVNode(" DOCX ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: _cache[3] || (_cache[3] = $event => (exportReport('xlsx'))),
                          class: "w-full px-3 py-2 text-[9px] font-mono font-bold text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] uppercase tracking-widest text-left flex items-center gap-2"
                        }, [...(_cache[70] || (_cache[70] = [
                          createBaseVNode("i", { class: "fas fa-file-excel text-green-600 text-[10px] w-4" }, null, -1),
                          createTextVNode(" XLSX ", -1)
                        ]))])
                      ]))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("button", {
                  onClick: handleEdit,
                  class: "w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all shadow-none group",
                  title: "Modify State"
                }, [
                  createVNode(unref(SquarePen), {
                    size: 18,
                    class: "group-hover:scale-110 transition-transform"
                  })
                ]),
                createBaseVNode("button", {
                  onClick: close,
                  class: "w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-none group"
                }, [
                  createVNode(unref(X), {
                    size: 20,
                    class: "group-hover:rotate-90 transition-transform"
                  })
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_15$1, [
              createBaseVNode("div", _hoisted_16$1, [
                _cache[75] || (_cache[75] = createBaseVNode("span", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest shrink-0" }, "Protocol_Link:", -1)),
                createBaseVNode("div", _hoisted_17$1, [
                  (__props.account?.website)
                    ? (openBlock(), createElementBlock("a", {
                        key: 0,
                        href: __props.account.website,
                        target: "_blank",
                        class: "px-3 py-1.5 bg-blue-50 text-[#2F2E8B] border border-blue-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] hover:text-white transition-all flex items-center gap-2"
                      }, [
                        createVNode(unref(Globe), { size: 12 }),
                        _cache[71] || (_cache[71] = createTextVNode(" ACCESS_WEBSITE ", -1))
                      ], 8, _hoisted_18$1))
                    : createCommentVNode("", true),
                  (__props.account?.phone)
                    ? (openBlock(), createElementBlock("button", {
                        key: 1,
                        onClick: _cache[5] || (_cache[5] = $event => (openCallDialog(__props.account?.phone, __props.account?.name))),
                        class: "px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
                      }, [
                        createVNode(unref(Phone), { size: 12 }),
                        _cache[72] || (_cache[72] = createTextVNode(" PRIMARY_COMM ", -1))
                      ]))
                    : createCommentVNode("", true),
                  (__props.account?.phone)
                    ? (openBlock(), createElementBlock("button", {
                        key: 2,
                        onClick: _cache[6] || (_cache[6] = $event => (openWhatsAppDialog(__props.account?.phone, __props.account?.name))),
                        class: "px-3 py-1.5 bg-green-50 text-green-600 border border-green-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center gap-2"
                      }, [
                        createVNode(unref(MessageSquare), { size: 12 }),
                        _cache[73] || (_cache[73] = createTextVNode(" WHATSAPP ", -1))
                      ]))
                    : createCommentVNode("", true),
                  (__props.account?.email)
                    ? (openBlock(), createElementBlock("a", {
                        key: 3,
                        href: 'mailto:' + __props.account.email,
                        class: "px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-mono font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                      }, [
                        createVNode(unref(Mail), { size: 12 }),
                        _cache[74] || (_cache[74] = createTextVNode(" TRANSMIT_DOCS ", -1))
                      ], 8, _hoisted_19$1))
                    : createCommentVNode("", true)
                ])
              ]),
              _cache[77] || (_cache[77] = createBaseVNode("div", { class: "w-px h-6 bg-gray-200 mx-2 hidden sm:block" }, null, -1)),
              (__props.account?.isConverted)
                ? (openBlock(), createElementBlock("span", _hoisted_20$1, [
                    createVNode(unref(RefreshCw), { size: 10 }),
                    _cache[76] || (_cache[76] = createTextVNode(" CONVERTED_FROM_LEAD ", -1))
                  ]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_21$1, [
              createBaseVNode("div", _hoisted_22$1, [
                (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                  return createBaseVNode("button", {
                    key: tab.id,
                    onClick: $event => (activeTab.value = tab.id),
                    class: normalizeClass([activeTab.value === tab.id ? 'border-[#2F2E8B] text-[#2F2E8B] font-black' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold', "py-4 border-b-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"])
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(tab.lucideIcon), { size: 14 })),
                    createTextVNode(" " + toDisplayString(tab.label), 1)
                  ], 10, _hoisted_23$1)
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_24$1, [
              _cache[167] || (_cache[167] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
              createBaseVNode("div", _hoisted_25$1, [
                (activeTab.value === 'overview')
                  ? (openBlock(), createElementBlock("div", _hoisted_26$1, [
                      createBaseVNode("div", _hoisted_27$1, [
                        _cache[81] || (_cache[81] = createBaseVNode("div", { class: "lg:col-span-3" }, [
                          createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                            createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                            createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Strategic_Assessment")
                          ]),
                          createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest" }, " High-level performance and valuation metrics. ")
                        ], -1)),
                        createBaseVNode("div", _hoisted_28$1, [
                          createBaseVNode("div", _hoisted_29$1, [
                            _cache[78] || (_cache[78] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#2F2E8B] transition-colors" }, "Total_Deal_Value", -1)),
                            createBaseVNode("div", _hoisted_30$1, toDisplayString(formatCurrency(dealStats.value.totalValue)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_31$1, [
                            _cache[79] || (_cache[79] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#2F2E8B] transition-colors" }, "Resource_Capacity", -1)),
                            createBaseVNode("div", _hoisted_32$1, toDisplayString(__props.account?.employees || '0') + " EMPLOYEES", 1)
                          ]),
                          createBaseVNode("div", _hoisted_33$1, [
                            _cache[80] || (_cache[80] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-blue-300 uppercase tracking-widest mb-1" }, "Operational_Stability", -1)),
                            createBaseVNode("div", _hoisted_34$1, toDisplayString(__props.account?.industry || 'N/A'), 1)
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_35$1, [
                        _cache[86] || (_cache[86] = createBaseVNode("div", { class: "lg:col-span-3" }, [
                          createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                            createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                            createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Entity_Attributes")
                          ]),
                          createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest" }, " Communication channels and regional positioning. ")
                        ], -1)),
                        createBaseVNode("div", _hoisted_36$1, [
                          createBaseVNode("div", _hoisted_37$1, [
                            createBaseVNode("div", _hoisted_38$1, [
                              _cache[82] || (_cache[82] = createBaseVNode("label", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors" }, "PRIMARY_DOMAIN", -1)),
                              (__props.account?.website)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 0,
                                    href: __props.account.website,
                                    target: "_blank",
                                    class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase border-b border-blue-50 hover:border-[#2F2E8B] transition-all flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Globe), { size: 12 }),
                                    createTextVNode(" " + toDisplayString(__props.account.website), 1)
                                  ], 8, _hoisted_39$1))
                                : (openBlock(), createElementBlock("span", _hoisted_40$1, "UNDEFINED"))
                            ]),
                            createBaseVNode("div", _hoisted_41$1, [
                              _cache[83] || (_cache[83] = createBaseVNode("label", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors" }, "COMM_CHANNEL_PHONE", -1)),
                              (__props.account?.phone)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 0,
                                    href: 'tel:' + __props.account.phone,
                                    class: "text-[11px] font-mono font-black text-gray-900 border-b border-gray-50 hover:border-emerald-500 transition-all flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Phone), {
                                      size: 12,
                                      class: "text-emerald-500"
                                    }),
                                    createTextVNode(" " + toDisplayString(__props.account.phone), 1)
                                  ], 8, _hoisted_42$1))
                                : (openBlock(), createElementBlock("span", _hoisted_43$1, "NO_RECORD"))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_44$1, [
                            createBaseVNode("div", _hoisted_45$1, [
                              _cache[84] || (_cache[84] = createBaseVNode("label", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors" }, "DISPATCH_POINT_MAIL", -1)),
                              (__props.account?.email)
                                ? (openBlock(), createElementBlock("a", {
                                    key: 0,
                                    href: 'mailto:' + __props.account.email,
                                    class: "text-[11px] font-mono font-black text-gray-900 border-b border-gray-50 hover:border-blue-500 transition-all flex items-center gap-2"
                                  }, [
                                    createVNode(unref(Mail), {
                                      size: 12,
                                      class: "text-blue-400"
                                    }),
                                    createTextVNode(" " + toDisplayString(__props.account.email), 1)
                                  ], 8, _hoisted_46$1))
                                : (openBlock(), createElementBlock("span", _hoisted_47$1, "NO_RECORD"))
                            ]),
                            createBaseVNode("div", _hoisted_48$1, [
                              _cache[85] || (_cache[85] = createBaseVNode("label", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2 group-hover:text-[#2F2E8B] transition-colors" }, "DIGITAL_PRESENCE", -1)),
                              createBaseVNode("div", _hoisted_49$1, [
                                (__props.account?.linkedin)
                                  ? (openBlock(), createElementBlock("a", {
                                      key: 0,
                                      href: __props.account.linkedin,
                                      target: "_blank",
                                      class: "w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-700 transition-all shadow-none"
                                    }, [
                                      createVNode(unref(Linkedin), { size: 14 })
                                    ], 8, _hoisted_50$1))
                                  : createCommentVNode("", true),
                                (__props.account?.twitter)
                                  ? (openBlock(), createElementBlock("a", {
                                      key: 1,
                                      href: __props.account.twitter,
                                      target: "_blank",
                                      class: "w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-400 transition-all shadow-none"
                                    }, [
                                      createVNode(unref(Twitter), { size: 14 })
                                    ], 8, _hoisted_51$1))
                                  : createCommentVNode("", true),
                                (__props.account?.facebook)
                                  ? (openBlock(), createElementBlock("a", {
                                      key: 2,
                                      href: __props.account.facebook,
                                      target: "_blank",
                                      class: "w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-600 transition-all shadow-none"
                                    }, [
                                      createVNode(unref(Facebook), { size: 14 })
                                    ], 8, _hoisted_52$1))
                                  : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_53$1, [
                        _cache[89] || (_cache[89] = createBaseVNode("div", { class: "lg:col-span-3" }, [
                          createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                            createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                            createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Address_Matrix")
                          ])
                        ], -1)),
                        createBaseVNode("div", _hoisted_54$1, [
                          (hasBillingAddress.value)
                            ? (openBlock(), createElementBlock("div", _hoisted_55$1, [
                                createBaseVNode("h5", _hoisted_56$1, [
                                  createVNode(unref(FileText), { size: 12 }),
                                  _cache[87] || (_cache[87] = createTextVNode(" BILLING_DISPATCH_ENDPOINT ", -1))
                                ]),
                                createBaseVNode("div", _hoisted_57$1, [
                                  (__props.account?.billingStreet)
                                    ? (openBlock(), createElementBlock("p", _hoisted_58$1, toDisplayString(__props.account.billingStreet), 1))
                                    : createCommentVNode("", true),
                                  createBaseVNode("p", null, toDisplayString([__props.account.billingCity, __props.account.billingState, __props.account.billingPostalCode].filter(Boolean).join(', ')), 1),
                                  (__props.account?.billingCountry)
                                    ? (openBlock(), createElementBlock("p", _hoisted_59$1, toDisplayString(__props.account.billingCountry), 1))
                                    : createCommentVNode("", true)
                                ])
                              ]))
                            : createCommentVNode("", true),
                          (hasShippingAddress.value)
                            ? (openBlock(), createElementBlock("div", _hoisted_60$1, [
                                createBaseVNode("h5", _hoisted_61$1, [
                                  createVNode(unref(Truck), { size: 12 }),
                                  _cache[88] || (_cache[88] = createTextVNode(" LOGISTICS_DELIVERY_NODE ", -1))
                                ]),
                                createBaseVNode("div", _hoisted_62$1, [
                                  (__props.account?.shippingStreet)
                                    ? (openBlock(), createElementBlock("p", _hoisted_63$1, toDisplayString(__props.account.shippingStreet), 1))
                                    : createCommentVNode("", true),
                                  createBaseVNode("p", null, toDisplayString([__props.account.shippingCity, __props.account.shippingState, __props.account.shippingPostalCode].filter(Boolean).join(', ')), 1),
                                  (__props.account?.shippingCountry)
                                    ? (openBlock(), createElementBlock("p", _hoisted_64$1, toDisplayString(__props.account.shippingCountry), 1))
                                    : createCommentVNode("", true)
                                ])
                              ]))
                            : createCommentVNode("", true)
                        ])
                      ]),
                      (__props.account?.description)
                        ? (openBlock(), createElementBlock("div", _hoisted_65$1, [
                            _cache[90] || (_cache[90] = createBaseVNode("div", { class: "lg:col-span-3" }, [
                              createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                                createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Qualitative_Summary")
                              ])
                            ], -1)),
                            createBaseVNode("div", _hoisted_66$1, [
                              createBaseVNode("div", _hoisted_67$1, toDisplayString(__props.account.description), 1)
                            ])
                          ]))
                        : createCommentVNode("", true),
                      createBaseVNode("div", _hoisted_68$1, [
                        _cache[95] || (_cache[95] = createBaseVNode("div", { class: "lg:col-span-3" }, [
                          createBaseVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                            createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                            createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "CMA_Tracker")
                          ]),
                          createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-widest" }, "Client Maintenance Cost for this account.")
                        ], -1)),
                        createBaseVNode("div", _hoisted_69$1, [
                          createBaseVNode("div", _hoisted_70$1, [
                            createBaseVNode("div", _hoisted_71$1, [
                              createBaseVNode("div", _hoisted_72$1, [
                                _cache[91] || (_cache[91] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Current CMA", -1)),
                                createBaseVNode("div", _hoisted_73$1, toDisplayString(formatCurrency(localCac.value)), 1)
                              ]),
                              createBaseVNode("div", _hoisted_74$1, [
                                _cache[92] || (_cache[92] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "New Value (ZMW)", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((cacValue).value = $event)),
                                  type: "number",
                                  min: "0",
                                  step: "0.01",
                                  placeholder: "0.00",
                                  class: "w-full border border-gray-200 bg-white px-4 py-3 text-xl font-mono font-black text-[#2F2E8B] focus:outline-none focus:border-[#2F2E8B] transition-colors tracking-tight"
                                }, null, 512), [
                                  [
                                    vModelText,
                                    cacValue.value,
                                    void 0,
                                    { number: true }
                                  ]
                                ])
                              ]),
                              createBaseVNode("button", {
                                onClick: saveCac,
                                disabled: savingCac.value || cacSaved.value || cacValue.value === null || cacValue.value === '',
                                class: normalizeClass(["px-6 py-3 text-[9px] font-mono font-black uppercase tracking-widest disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg self-end", cacSaved.value ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-[#2F2E8B] text-white hover:bg-[#3D2F88] shadow-[#2F2E8B]/20'])
                              }, [
                                (savingCac.value)
                                  ? (openBlock(), createBlock(unref(LoaderCircle), {
                                      key: 0,
                                      size: 12,
                                      class: "animate-spin"
                                    }))
                                  : (cacSaved.value)
                                    ? (openBlock(), createBlock(unref(CircleCheck), {
                                        key: 1,
                                        size: 12
                                      }))
                                    : (openBlock(), createBlock(unref(Save), {
                                        key: 2,
                                        size: 12
                                      })),
                                createTextVNode(" " + toDisplayString(savingCac.value ? 'SAVING...' : cacSaved.value ? 'SAVED!' : 'UPDATE'), 1)
                              ], 10, _hoisted_75)
                            ]),
                            createBaseVNode("div", _hoisted_76, [
                              _cache[93] || (_cache[93] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1" }, "Quick Adjust:", -1)),
                              createBaseVNode("button", {
                                onClick: _cache[8] || (_cache[8] = $event => (adjustCac(100))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider"
                              }, "+100"),
                              createBaseVNode("button", {
                                onClick: _cache[9] || (_cache[9] = $event => (adjustCac(500))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider"
                              }, "+500"),
                              createBaseVNode("button", {
                                onClick: _cache[10] || (_cache[10] = $event => (adjustCac(1000))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider"
                              }, "+1,000"),
                              createBaseVNode("button", {
                                onClick: _cache[11] || (_cache[11] = $event => (adjustCac(5000))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition rounded-sm uppercase tracking-wider"
                              }, "+5,000"),
                              _cache[94] || (_cache[94] = createBaseVNode("span", { class: "w-px h-5 bg-gray-200 mx-1" }, null, -1)),
                              createBaseVNode("button", {
                                onClick: _cache[12] || (_cache[12] = $event => (adjustCac(-100))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider"
                              }, "-100"),
                              createBaseVNode("button", {
                                onClick: _cache[13] || (_cache[13] = $event => (adjustCac(-500))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider"
                              }, "-500"),
                              createBaseVNode("button", {
                                onClick: _cache[14] || (_cache[14] = $event => (adjustCac(-1e3))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider"
                              }, "-1,000"),
                              createBaseVNode("button", {
                                onClick: _cache[15] || (_cache[15] = $event => (adjustCac(-5e3))),
                                class: "px-3 py-1.5 text-[10px] font-mono font-black text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition rounded-sm uppercase tracking-wider"
                              }, "-5,000")
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_77, [
                        _cache[100] || (_cache[100] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]" }, null, -1)),
                        _cache[101] || (_cache[101] = createBaseVNode("h5", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-4" }, "Registry_Execution_Metadata", -1)),
                        createBaseVNode("div", _hoisted_78, [
                          createBaseVNode("div", null, [
                            _cache[96] || (_cache[96] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Entity_Initialize", -1)),
                            createBaseVNode("span", _hoisted_79, toDisplayString(formatDate(__props.account?.createdAt)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[97] || (_cache[97] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Last_Update", -1)),
                            createBaseVNode("span", _hoisted_80, toDisplayString(formatDate(__props.account?.updatedAt)), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[98] || (_cache[98] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Registry_Owner", -1)),
                            createBaseVNode("span", _hoisted_81, toDisplayString(__props.account?.owner || 'UNASSIGNED'), 1)
                          ]),
                          createBaseVNode("div", null, [
                            _cache[99] || (_cache[99] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1" }, "Object_ID", -1)),
                            createBaseVNode("span", _hoisted_82, toDisplayString(__props.account?.id), 1)
                          ])
                        ])
                      ])
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'contacts')
                  ? (openBlock(), createElementBlock("div", _hoisted_83, [
                      createBaseVNode("div", _hoisted_84, [
                        createBaseVNode("div", _hoisted_85, [
                          createVNode(unref(Search), {
                            size: 12,
                            class: "absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          }),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((contactSearchQuery).value = $event)),
                            onInput: debouncedContactSearch,
                            type: "text",
                            placeholder: "SEARCH CONTACTS OR LINK LEADS...",
                            class: "w-full border border-gray-200 pl-7 pr-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none transition-all"
                          }, null, 544), [
                            [vModelText, contactSearchQuery.value]
                          ])
                        ]),
                        createBaseVNode("button", {
                          onClick: _cache[17] || (_cache[17] = $event => (showLinkLeadModal.value = true)),
                          class: "px-3 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5 rounded-sm"
                        }, [
                          createVNode(unref(Plus), { size: 10 }),
                          _cache[102] || (_cache[102] = createTextVNode(" LINK LEAD ", -1))
                        ])
                      ]),
                      (openBlock(), createBlock(Teleport, { to: "body" }, [
                        (showLinkLeadModal.value)
                          ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm",
                              onClick: _cache[21] || (_cache[21] = withModifiers($event => (showLinkLeadModal.value = false), ["self"]))
                            }, [
                              createBaseVNode("div", _hoisted_86, [
                                createBaseVNode("div", _hoisted_87, [
                                  _cache[103] || (_cache[103] = createBaseVNode("h3", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest" }, "Link Lead as Contact", -1)),
                                  createBaseVNode("button", {
                                    onClick: _cache[18] || (_cache[18] = $event => (showLinkLeadModal.value = false)),
                                    class: "text-gray-400 hover:text-gray-700"
                                  }, [
                                    createVNode(unref(X), { size: 16 })
                                  ])
                                ]),
                                createBaseVNode("div", _hoisted_88, [
                                  createBaseVNode("div", _hoisted_89, [
                                    createVNode(unref(Search), {
                                      size: 12,
                                      class: "absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    }),
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((leadSearchQuery).value = $event)),
                                      onInput: searchLeadsToLink,
                                      type: "text",
                                      placeholder: "Search leads by name, email, phone...",
                                      class: "w-full border border-gray-200 pl-7 pr-3 py-2 text-[9px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B]/30 focus:border-[#2F2E8B] outline-none"
                                    }, null, 544), [
                                      [vModelText, leadSearchQuery.value]
                                    ])
                                  ]),
                                  (searchingLeads.value)
                                    ? (openBlock(), createElementBlock("div", _hoisted_90, [
                                        createVNode(unref(LoaderCircle), {
                                          class: "animate-spin text-[#2F2E8B]",
                                          size: 20
                                        })
                                      ]))
                                    : (leadSearchResults.value.length > 0)
                                      ? (openBlock(), createElementBlock("div", _hoisted_91, [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(leadSearchResults.value, (lead) => {
                                            return (openBlock(), createElementBlock("div", {
                                              key: lead.id,
                                              class: "flex items-center justify-between gap-2 p-2.5 border border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-[#2F2E8B]/5 transition cursor-pointer",
                                              onClick: $event => (linkLeadAsContact(lead))
                                            }, [
                                              createBaseVNode("div", _hoisted_93, [
                                                createBaseVNode("div", _hoisted_94, toDisplayString(getInitials(lead.name)), 1),
                                                createBaseVNode("div", _hoisted_95, [
                                                  createBaseVNode("p", _hoisted_96, toDisplayString(lead.name), 1),
                                                  createBaseVNode("p", _hoisted_97, toDisplayString(lead.email || lead.phone || '—'), 1)
                                                ])
                                              ]),
                                              _cache[104] || (_cache[104] = createBaseVNode("button", { class: "px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition rounded-sm whitespace-nowrap" }, "LINK", -1))
                                            ], 8, _hoisted_92))
                                          }), 128))
                                        ]))
                                      : (leadSearchQuery.value && !searchingLeads.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_98, "No leads found matching your search."))
                                        : (openBlock(), createElementBlock("div", _hoisted_99, "Type a name, email, or phone to search leads."))
                                ]),
                                createBaseVNode("div", _hoisted_100, [
                                  createBaseVNode("button", {
                                    onClick: _cache[20] || (_cache[20] = $event => (showLinkLeadModal.value = false)),
                                    class: "px-4 py-2 border border-gray-200 text-gray-500 text-[8px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition"
                                  }, "CLOSE")
                                ])
                              ])
                            ]))
                          : createCommentVNode("", true)
                      ])),
                      (loadingContacts.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_101, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[105] || (_cache[105] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Retrieving_Associated_Personnel...", -1))
                          ]))
                        : (filteredContacts.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_102, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredContacts.value, (contact) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: contact.id,
                                  class: "bg-white border border-gray-100 p-6 flex items-center justify-between group hover:border-[#2F2E8B] transition-all hover:bg-gray-50/50"
                                }, [
                                  createBaseVNode("div", _hoisted_103, [
                                    createBaseVNode("div", _hoisted_104, toDisplayString(getInitials(contact.firstName + ' ' + contact.lastName)), 1),
                                    createBaseVNode("div", null, [
                                      createBaseVNode("h4", _hoisted_105, toDisplayString(contact.firstName) + " " + toDisplayString(contact.lastName), 1),
                                      createBaseVNode("p", _hoisted_106, toDisplayString(contact.title || 'MEMBER'), 1)
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_107, [
                                    (contact.email)
                                      ? (openBlock(), createElementBlock("a", {
                                          key: 0,
                                          href: 'mailto:' + contact.email,
                                          class: "w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all"
                                        }, [
                                          createVNode(unref(Mail), { size: 14 })
                                        ], 8, _hoisted_108))
                                      : createCommentVNode("", true),
                                    (contact.phone)
                                      ? (openBlock(), createElementBlock("button", {
                                          key: 1,
                                          onClick: $event => (openCallDialog(contact.phone, contact.firstName + ' ' + contact.lastName)),
                                          class: "w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-emerald-500 hover:border-emerald-500 transition-all"
                                        }, [
                                          createVNode(unref(Phone), { size: 14 })
                                        ], 8, _hoisted_109))
                                      : createCommentVNode("", true),
                                    (contact.phone)
                                      ? (openBlock(), createElementBlock("button", {
                                          key: 2,
                                          onClick: $event => (openWhatsAppDialog(contact.phone, contact.firstName + ' ' + contact.lastName)),
                                          class: "w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-green-500 hover:border-green-500 transition-all"
                                        }, [
                                          createVNode(unref(MessageSquare), { size: 14 })
                                        ], 8, _hoisted_110))
                                      : createCommentVNode("", true),
                                    createBaseVNode("button", {
                                      onClick: $event => (unlinkContact(contact)),
                                      class: "w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-500 transition-all",
                                      title: "Unlink contact"
                                    }, [
                                      createVNode(unref(Trash2), { size: 12 })
                                    ], 8, _hoisted_111)
                                  ])
                                ]))
                              }), 128))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_112, [
                              createVNode(unref(Users), {
                                size: 32,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[106] || (_cache[106] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "ZERO_PERSONNEL_MAPPED", -1)),
                              _cache[107] || (_cache[107] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "Account registry contains no linked contact entities.", -1))
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'deals')
                  ? (openBlock(), createElementBlock("div", _hoisted_113, [
                      createBaseVNode("div", _hoisted_114, [
                        createBaseVNode("div", _hoisted_115, [
                          _cache[108] || (_cache[108] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.05]" }, null, -1)),
                          _cache[109] || (_cache[109] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-blue-300 uppercase tracking-widest mb-1 relative z-10" }, "Total_Deals", -1)),
                          createBaseVNode("div", _hoisted_116, toDisplayString(dealStats.value.total), 1)
                        ]),
                        createBaseVNode("div", _hoisted_117, [
                          _cache[110] || (_cache[110] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Pipeline_Value", -1)),
                          createBaseVNode("div", _hoisted_118, toDisplayString(formatCurrency(dealStats.value.totalValue)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_119, [
                          _cache[111] || (_cache[111] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Won_Value", -1)),
                          createBaseVNode("div", _hoisted_120, toDisplayString(formatCurrency(dealStats.value.wonValue)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_121, [
                          _cache[112] || (_cache[112] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Win_Rate", -1)),
                          createBaseVNode("div", _hoisted_122, toDisplayString(dealStats.value.winRate) + "%", 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_123, [
                        createBaseVNode("div", _hoisted_124, [
                          createBaseVNode("button", {
                            onClick: _cache[22] || (_cache[22] = $event => (dealStageFilter.value = 'all')),
                            class: normalizeClass([dealStageFilter.value === 'all' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300', "px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"])
                          }, "ALL", 2),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(stagesWithDeals.value, (stage) => {
                            return (openBlock(), createElementBlock("button", {
                              key: stage,
                              onClick: $event => (dealStageFilter.value = stage),
                              class: normalizeClass([dealStageFilter.value === stage ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300', "px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"])
                            }, toDisplayString(stage.replace(' ', '_').toUpperCase()), 11, _hoisted_125))
                          }), 128)),
                          createBaseVNode("button", {
                            onClick: _cache[23] || (_cache[23] = $event => (dealStageFilter.value = 'archived')),
                            class: normalizeClass([dealStageFilter.value === 'archived' ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-300 border-gray-100 hover:border-gray-300', "px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"])
                          }, "ARCHIVED", 2)
                        ]),
                        createBaseVNode("button", {
                          onClick: _cache[24] || (_cache[24] = $event => (showDealForm.value = !showDealForm.value)),
                          class: normalizeClass([showDealForm.value ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white', "px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2"])
                        }, [
                          createVNode(unref(Plus), { size: 12 }),
                          createTextVNode(" " + toDisplayString(showDealForm.value ? 'CANCEL' : 'ADD_DEAL'), 1)
                        ], 2)
                      ]),
                      (showDealForm.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_126, [
                            _cache[123] || (_cache[123] = createBaseVNode("div", { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2" }, [
                              createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                              createTextVNode(" NEW_DEAL_RECORD ")
                            ], -1)),
                            createBaseVNode("div", _hoisted_127, [
                              createBaseVNode("div", null, [
                                _cache[113] || (_cache[113] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Deal_Name *", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => ((newDeal.value.name) = $event)),
                                  type: "text",
                                  placeholder: "OPPORTUNITY_TITLE",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newDeal.value.name]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[114] || (_cache[114] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Deal_Value (ZMW)", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => ((newDeal.value.value) = $event)),
                                  type: "number",
                                  min: "0",
                                  placeholder: "0",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [
                                    vModelText,
                                    newDeal.value.value,
                                    void 0,
                                    { number: true }
                                  ]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[115] || (_cache[115] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Pipeline_Stage", -1)),
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => ((newDeal.value.stage) = $event)),
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, [
                                  (openBlock(), createElementBlock(Fragment, null, renderList(PIPELINE_STAGES, (s) => {
                                    return createBaseVNode("option", {
                                      key: s,
                                      value: s
                                    }, toDisplayString(s), 9, _hoisted_128)
                                  }), 64))
                                ], 512), [
                                  [vModelSelect, newDeal.value.stage]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[116] || (_cache[116] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Probability (%)", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[28] || (_cache[28] = $event => ((newDeal.value.probability) = $event)),
                                  type: "number",
                                  min: "0",
                                  max: "100",
                                  placeholder: "10",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [
                                    vModelText,
                                    newDeal.value.probability,
                                    void 0,
                                    { number: true }
                                  ]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[117] || (_cache[117] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Expected_Close_Date", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => ((newDeal.value.expectedCloseDate) = $event)),
                                  type: "date",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newDeal.value.expectedCloseDate]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[118] || (_cache[118] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Assigned_Rep(s)", -1)),
                                (!canAssignCrm.value)
                                  ? (openBlock(), createElementBlock("div", _hoisted_129, " Assignment locked to your scope "))
                                  : (openBlock(), createElementBlock("div", _hoisted_130, [
                                      createBaseVNode("div", {
                                        onClick: _cache[30] || (_cache[30] = $event => (showAssigneeDropdown.value = !showAssigneeDropdown.value)),
                                        class: normalizeClass(["w-full min-h-[38px] border border-gray-200 bg-white px-2 py-1.5 cursor-pointer flex flex-wrap gap-1 items-center hover:border-[#2F2E8B] transition-colors", showAssigneeDropdown.value ? 'border-[#2F2E8B]' : ''])
                                      }, [
                                        (newDeal.value.assignedTo.length > 0)
                                          ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(newDeal.value.assignedTo, (email) => {
                                              return (openBlock(), createElementBlock("span", {
                                                key: email,
                                                class: "inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-[#2F2E8B] px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wide"
                                              }, [
                                                createTextVNode(toDisplayString(email.split('@')[0].toUpperCase()) + " ", 1),
                                                createBaseVNode("button", {
                                                  type: "button",
                                                  onClick: withModifiers($event => (toggleAssignee(email)), ["stop"]),
                                                  class: "hover:text-red-500 transition-colors"
                                                }, [
                                                  createVNode(unref(X), { size: 8 })
                                                ], 8, _hoisted_131)
                                              ]))
                                            }), 128))
                                          : (openBlock(), createElementBlock("span", _hoisted_132, "— SELECT_REPS —")),
                                        createVNode(unref(ChevronDown), {
                                          size: 10,
                                          class: normalizeClass(["ml-auto text-gray-400 flex-shrink-0 transition-transform", showAssigneeDropdown.value ? 'rotate-180' : ''])
                                        }, null, 8, ["class"])
                                      ], 2),
                                      (showAssigneeDropdown.value)
                                        ? (openBlock(), createElementBlock("div", _hoisted_133, [
                                            createBaseVNode("div", _hoisted_134, [
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[31] || (_cache[31] = $event => ((assigneeSearch).value = $event)),
                                                type: "text",
                                                placeholder: "SEARCH_REPS...",
                                                class: "w-full border border-gray-200 px-2 py-1 text-[10px] font-mono font-black uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors",
                                                onClick: _cache[32] || (_cache[32] = withModifiers(() => {}, ["stop"]))
                                              }, null, 512), [
                                                [vModelText, assigneeSearch.value]
                                              ])
                                            ]),
                                            (filteredAssigneeUsers.value.length === 0)
                                              ? (openBlock(), createElementBlock("div", _hoisted_135, " NO_USERS_FOUND "))
                                              : createCommentVNode("", true),
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredAssigneeUsers.value, (u) => {
                                              return (openBlock(), createElementBlock("button", {
                                                key: u.email,
                                                type: "button",
                                                onClick: withModifiers($event => (toggleAssignee(u.email)), ["stop"]),
                                                class: "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                                              }, [
                                                createBaseVNode("div", {
                                                  class: normalizeClass(["w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors", newDeal.value.assignedTo.includes(u.email) ? 'bg-[#2F2E8B] border-[#2F2E8B]' : 'border-gray-300'])
                                                }, [
                                                  (newDeal.value.assignedTo.includes(u.email))
                                                    ? (openBlock(), createBlock(unref(Check), {
                                                        key: 0,
                                                        size: 10,
                                                        class: "text-white"
                                                      }))
                                                    : createCommentVNode("", true)
                                                ], 2),
                                                createBaseVNode("div", _hoisted_137, [
                                                  createBaseVNode("div", {
                                                    class: normalizeClass(["text-[10px] font-mono font-black uppercase tracking-tight truncate", newDeal.value.assignedTo.includes(u.email) ? 'text-[#2F2E8B]' : 'text-gray-700'])
                                                  }, toDisplayString(u.email.split('@')[0]), 3),
                                                  createBaseVNode("div", _hoisted_138, toDisplayString(u.role || 'MEMBER'), 1)
                                                ])
                                              ], 8, _hoisted_136))
                                            }), 128))
                                          ]))
                                        : createCommentVNode("", true)
                                    ]))
                              ]),
                              createBaseVNode("div", null, [
                                _cache[119] || (_cache[119] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "CMA (ZMW)", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[33] || (_cache[33] = $event => ((newDeal.value.cac) = $event)),
                                  type: "number",
                                  min: "0",
                                  placeholder: "0",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [
                                    vModelText,
                                    newDeal.value.cac,
                                    void 0,
                                    { number: true }
                                  ]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[120] || (_cache[120] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Next_Step", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[34] || (_cache[34] = $event => ((newDeal.value.nextStep) = $event)),
                                  type: "text",
                                  placeholder: "FOLLOW_UP_ACTION",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newDeal.value.nextStep]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_139, [
                                _cache[121] || (_cache[121] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Description", -1)),
                                withDirectives(createBaseVNode("textarea", {
                                  "onUpdate:modelValue": _cache[35] || (_cache[35] = $event => ((newDeal.value.description) = $event)),
                                  rows: "3",
                                  placeholder: "DEAL_CONTEXT_NOTES...",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"
                                }, null, 512), [
                                  [vModelText, newDeal.value.description]
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_140, [
                              createBaseVNode("button", {
                                onClick: _cache[36] || (_cache[36] = $event => (showDealForm.value = false)),
                                class: "px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition-all flex items-center gap-2"
                              }, [
                                createVNode(unref(CircleX), { size: 12 }),
                                _cache[122] || (_cache[122] = createTextVNode(" CANCEL ", -1))
                              ]),
                              createBaseVNode("button", {
                                onClick: saveDeal,
                                disabled: savingDeal.value || !newDeal.value.name?.trim(),
                                class: "px-6 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20"
                              }, [
                                (savingDeal.value)
                                  ? (openBlock(), createBlock(unref(LoaderCircle), {
                                      key: 0,
                                      size: 12,
                                      class: "animate-spin"
                                    }))
                                  : (openBlock(), createBlock(unref(Save), {
                                      key: 1,
                                      size: 12
                                    })),
                                createTextVNode(" " + toDisplayString(savingDeal.value ? 'SAVING...' : 'COMMIT_DEAL'), 1)
                              ], 8, _hoisted_141)
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (loadingDeals.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_142, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[124] || (_cache[124] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Loading_Pipeline_Data...", -1))
                          ]))
                        : (filteredDeals.value.length > 0)
                          ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              createBaseVNode("div", _hoisted_143, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(pagedDeals.value, (deal) => {
                                  return (openBlock(), createElementBlock("div", {
                                    key: deal.id,
                                    class: "bg-white border border-gray-100 p-5 hover:border-[#2F2E8B]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden"
                                  }, [
                                    createBaseVNode("div", {
                                      class: normalizeClass([stageBarClass(deal.stage), "absolute left-0 top-0 bottom-0 w-1"])
                                    }, null, 2),
                                    createBaseVNode("div", _hoisted_144, [
                                      createBaseVNode("div", _hoisted_145, [
                                        createBaseVNode("div", _hoisted_146, [
                                          createBaseVNode("div", _hoisted_147, [
                                            createBaseVNode("span", _hoisted_148, toDisplayString(deal.name), 1),
                                            createBaseVNode("span", {
                                              class: normalizeClass([stageBadgeClass(deal.stage), "px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest shrink-0"])
                                            }, toDisplayString(deal.stage), 3),
                                            (deal.archived)
                                              ? (openBlock(), createElementBlock("span", _hoisted_149, "ARCHIVED"))
                                              : createCommentVNode("", true)
                                          ]),
                                          createBaseVNode("div", _hoisted_150, [
                                            (dealAssigneesDisplay(deal.assignedTo).length > 0)
                                              ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(dealAssigneesDisplay(deal.assignedTo), (rep) => {
                                                  return (openBlock(), createElementBlock("span", {
                                                    key: rep,
                                                    class: "flex items-center gap-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] px-1.5 py-0.5"
                                                  }, [
                                                    createVNode(unref(Tag), { size: 9 }),
                                                    createTextVNode(" " + toDisplayString(rep.split('@')[0].toUpperCase()), 1)
                                                  ]))
                                                }), 128))
                                              : createCommentVNode("", true),
                                            (deal.expectedCloseDate)
                                              ? (openBlock(), createElementBlock("span", _hoisted_151, [
                                                  createVNode(unref(Clock), { size: 10 }),
                                                  createTextVNode(" " + toDisplayString(formatDate(deal.expectedCloseDate)), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (deal.probability)
                                              ? (openBlock(), createElementBlock("span", _hoisted_152, [
                                                  createVNode(unref(Target), { size: 10 }),
                                                  createTextVNode(" " + toDisplayString(deal.probability) + "%", 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (deal.cac)
                                              ? (openBlock(), createElementBlock("span", _hoisted_153, [
                                                  createVNode(unref(DollarSign), { size: 10 }),
                                                  createTextVNode(" CAC: " + toDisplayString(formatCurrency(deal.cac)), 1)
                                                ]))
                                              : createCommentVNode("", true)
                                          ]),
                                          (deal.nextStep)
                                            ? (openBlock(), createElementBlock("p", _hoisted_154, [
                                                createVNode(unref(ChevronRight), { size: 11 }),
                                                createTextVNode(" " + toDisplayString(deal.nextStep), 1)
                                              ]))
                                            : createCommentVNode("", true)
                                        ]),
                                        createBaseVNode("div", _hoisted_155, [
                                          createBaseVNode("div", _hoisted_156, toDisplayString(formatCurrency(deal.value)), 1)
                                        ])
                                      ]),
                                      (!deal.archived)
                                        ? (openBlock(), createElementBlock("div", _hoisted_157, [
                                            _cache[127] || (_cache[127] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1" }, "ADVANCE_STAGE:", -1)),
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(PIPELINE_STAGES.filter(s => s !== deal.stage), (stage) => {
                                              return (openBlock(), createElementBlock("button", {
                                                key: stage,
                                                onClick: $event => (updateDealStage(deal, stage)),
                                                class: normalizeClass([stageBadgeClass(stage), "px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest hover:opacity-80 transition-all"])
                                              }, toDisplayString(stage.replace(' ', '_')), 11, _hoisted_158))
                                            }), 128)),
                                            _cache[128] || (_cache[128] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
                                            createBaseVNode("button", {
                                              onClick: $event => (startEditDeal(deal)),
                                              class: "px-3 py-1 border border-[#2F2E8B]/30 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1"
                                            }, [
                                              createVNode(unref(SquarePen), { size: 10 }),
                                              _cache[125] || (_cache[125] = createTextVNode(" EDIT ", -1))
                                            ], 8, _hoisted_159),
                                            createBaseVNode("button", {
                                              onClick: $event => (archiveDeal(deal)),
                                              class: "px-3 py-1 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 text-[8px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1"
                                            }, [
                                              createVNode(unref(Archive), { size: 10 }),
                                              _cache[126] || (_cache[126] = createTextVNode(" ARCHIVE ", -1))
                                            ], 8, _hoisted_160)
                                          ]))
                                        : createCommentVNode("", true)
                                    ]),
                                    (editingDeal.value === deal.id)
                                      ? (openBlock(), createElementBlock("div", _hoisted_161, [
                                          createBaseVNode("div", _hoisted_162, [
                                            createBaseVNode("div", null, [
                                              _cache[129] || (_cache[129] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Name", -1)),
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[37] || (_cache[37] = $event => ((editingDealData.value.name) = $event)),
                                                type: "text",
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, null, 512), [
                                                [vModelText, editingDealData.value.name]
                                              ])
                                            ]),
                                            createBaseVNode("div", null, [
                                              _cache[130] || (_cache[130] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Value", -1)),
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[38] || (_cache[38] = $event => ((editingDealData.value.value) = $event)),
                                                type: "number",
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, null, 512), [
                                                [
                                                  vModelText,
                                                  editingDealData.value.value,
                                                  void 0,
                                                  { number: true }
                                                ]
                                              ])
                                            ]),
                                            createBaseVNode("div", null, [
                                              _cache[131] || (_cache[131] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Stage", -1)),
                                              withDirectives(createBaseVNode("select", {
                                                "onUpdate:modelValue": _cache[39] || (_cache[39] = $event => ((editingDealData.value.stage) = $event)),
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, [
                                                (openBlock(), createElementBlock(Fragment, null, renderList(PIPELINE_STAGES, (s) => {
                                                  return createBaseVNode("option", {
                                                    key: s,
                                                    value: s
                                                  }, toDisplayString(s), 9, _hoisted_163)
                                                }), 64))
                                              ], 512), [
                                                [vModelSelect, editingDealData.value.stage]
                                              ])
                                            ]),
                                            createBaseVNode("div", null, [
                                              _cache[132] || (_cache[132] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Probability", -1)),
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[40] || (_cache[40] = $event => ((editingDealData.value.probability) = $event)),
                                                type: "number",
                                                min: "0",
                                                max: "100",
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, null, 512), [
                                                [
                                                  vModelText,
                                                  editingDealData.value.probability,
                                                  void 0,
                                                  { number: true }
                                                ]
                                              ])
                                            ]),
                                            createBaseVNode("div", null, [
                                              _cache[133] || (_cache[133] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Close Date", -1)),
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[41] || (_cache[41] = $event => ((editingDealData.value.expectedCloseDate) = $event)),
                                                type: "date",
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, null, 512), [
                                                [vModelText, editingDealData.value.expectedCloseDate]
                                              ])
                                            ]),
                                            createBaseVNode("div", null, [
                                              _cache[134] || (_cache[134] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Next Step", -1)),
                                              withDirectives(createBaseVNode("input", {
                                                "onUpdate:modelValue": _cache[42] || (_cache[42] = $event => ((editingDealData.value.nextStep) = $event)),
                                                type: "text",
                                                class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                              }, null, 512), [
                                                [vModelText, editingDealData.value.nextStep]
                                              ])
                                            ])
                                          ]),
                                          createBaseVNode("div", null, [
                                            _cache[135] || (_cache[135] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase block mb-0.5" }, "Description", -1)),
                                            withDirectives(createBaseVNode("textarea", {
                                              "onUpdate:modelValue": _cache[43] || (_cache[43] = $event => ((editingDealData.value.description) = $event)),
                                              rows: "2",
                                              class: "w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B] resize-none"
                                            }, null, 512), [
                                              [vModelText, editingDealData.value.description]
                                            ])
                                          ]),
                                          createBaseVNode("div", _hoisted_164, [
                                            createBaseVNode("button", {
                                              onClick: $event => (saveEditDeal(deal)),
                                              class: "px-3 py-1.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-bold uppercase tracking-widest hover:bg-[#1D226B] transition"
                                            }, "Save", 8, _hoisted_165),
                                            createBaseVNode("button", {
                                              onClick: cancelEditDeal,
                                              class: "px-3 py-1.5 border border-gray-200 text-gray-500 text-[8px] font-mono font-bold uppercase tracking-widest hover:text-red-500 transition"
                                            }, "Cancel")
                                          ])
                                        ]))
                                      : createCommentVNode("", true)
                                  ]))
                                }), 128))
                              ]),
                              (dealTotalPages.value > 1)
                                ? (openBlock(), createElementBlock("div", _hoisted_166, [
                                    createBaseVNode("span", _hoisted_167, " Page_" + toDisplayString(dealPage.value) + "_of_" + toDisplayString(dealTotalPages.value) + "  •  " + toDisplayString(filteredDeals.value.length) + "_Records ", 1),
                                    createBaseVNode("div", _hoisted_168, [
                                      createBaseVNode("button", {
                                        onClick: _cache[44] || (_cache[44] = $event => (dealPage.value = 1)),
                                        disabled: dealPage.value === 1,
                                        class: "px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
                                      }, "«", 8, _hoisted_169),
                                      createBaseVNode("button", {
                                        onClick: _cache[45] || (_cache[45] = $event => (dealPage.value--)),
                                        disabled: dealPage.value === 1,
                                        class: "px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
                                      }, [
                                        createVNode(unref(ChevronLeft), { size: 10 }),
                                        _cache[136] || (_cache[136] = createTextVNode(" Prev", -1))
                                      ], 8, _hoisted_170),
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(dealTotalPages.value, (p) => {
                                        return (openBlock(), createElementBlock("button", {
                                          key: p,
                                          onClick: $event => (dealPage.value = p),
                                          class: normalizeClass(["w-7 h-7 border text-[9px] font-mono font-black transition-all", p === dealPage.value ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'])
                                        }, toDisplayString(p), 11, _hoisted_171))
                                      }), 128)),
                                      createBaseVNode("button", {
                                        onClick: _cache[46] || (_cache[46] = $event => (dealPage.value++)),
                                        disabled: dealPage.value === dealTotalPages.value,
                                        class: "px-3 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
                                      }, [
                                        _cache[137] || (_cache[137] = createTextVNode("Next ", -1)),
                                        createVNode(unref(ChevronRight), { size: 10 })
                                      ], 8, _hoisted_172),
                                      createBaseVNode("button", {
                                        onClick: _cache[47] || (_cache[47] = $event => (dealPage.value = dealTotalPages.value)),
                                        disabled: dealPage.value === dealTotalPages.value,
                                        class: "px-2 py-1.5 border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[9px] font-mono font-black"
                                      }, "»", 8, _hoisted_173)
                                    ])
                                  ]))
                                : createCommentVNode("", true)
                            ], 64))
                          : (openBlock(), createElementBlock("div", _hoisted_174, [
                              createVNode(unref(Briefcase), {
                                size: 32,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[139] || (_cache[139] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "ZERO_DEALS_IN_PIPELINE", -1)),
                              _cache[140] || (_cache[140] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "No active deal records linked to this account.", -1)),
                              createBaseVNode("button", {
                                onClick: _cache[48] || (_cache[48] = $event => (showDealForm.value = true)),
                                class: "mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2"
                              }, [
                                createVNode(unref(Plus), { size: 12 }),
                                _cache[138] || (_cache[138] = createTextVNode(" INIT_FIRST_DEAL ", -1))
                              ])
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'notes')
                  ? (openBlock(), createElementBlock("div", _hoisted_175, [
                      createBaseVNode("div", _hoisted_176, [
                        _cache[141] || (_cache[141] = createBaseVNode("div", { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.2em] flex items-center gap-2" }, [
                          createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
                          createTextVNode(" APPEND_ACCOUNT_NOTE ")
                        ], -1)),
                        withDirectives(createBaseVNode("textarea", {
                          "onUpdate:modelValue": _cache[49] || (_cache[49] = $event => ((newNoteText).value = $event)),
                          rows: "4",
                          placeholder: "ENTER_NOTE_TEXT...",
                          class: "w-full border border-gray-200 bg-white px-4 py-3 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"
                        }, null, 512), [
                          [vModelText, newNoteText.value]
                        ]),
                        createBaseVNode("div", _hoisted_177, [
                          createBaseVNode("button", {
                            onClick: addNote,
                            disabled: savingNote.value || !newNoteText.value.trim(),
                            class: "px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20"
                          }, [
                            (savingNote.value)
                              ? (openBlock(), createBlock(unref(LoaderCircle), {
                                  key: 0,
                                  size: 12,
                                  class: "animate-spin"
                                }))
                              : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  size: 12
                                })),
                            createTextVNode(" " + toDisplayString(savingNote.value ? 'WRITING...' : 'COMMIT_NOTE'), 1)
                          ], 8, _hoisted_178)
                        ])
                      ]),
                      (accountNotes.value.length > 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_179, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList([...accountNotes.value].reverse(), (note) => {
                              return (openBlock(), createElementBlock("div", {
                                key: note.id,
                                class: "bg-white border border-gray-100 p-5 group hover:border-[#2F2E8B]/30 transition-all relative"
                              }, [
                                createBaseVNode("div", _hoisted_180, [
                                  createBaseVNode("div", _hoisted_181, [
                                    createBaseVNode("div", _hoisted_182, [
                                      createVNode(unref(Clock), { size: 10 }),
                                      createTextVNode(" " + toDisplayString(formatDate(note.createdAt)) + " ", 1),
                                      (note.updatedAt)
                                        ? (openBlock(), createElementBlock("span", _hoisted_183, "// EDITED " + toDisplayString(formatDate(note.updatedAt)), 1))
                                        : createCommentVNode("", true)
                                    ]),
                                    (editingNoteId.value === note.id)
                                      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                          withDirectives(createBaseVNode("textarea", {
                                            "onUpdate:modelValue": _cache[50] || (_cache[50] = $event => ((editingNoteText).value = $event)),
                                            rows: "4",
                                            class: "w-full border border-[#2F2E8B] bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none resize-none"
                                          }, null, 512), [
                                            [vModelText, editingNoteText.value]
                                          ]),
                                          createBaseVNode("div", _hoisted_184, [
                                            createBaseVNode("button", {
                                              onClick: cancelEditNote,
                                              class: "px-3 py-1.5 border border-gray-200 text-gray-500 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-800 transition-all flex items-center gap-1.5"
                                            }, [
                                              createVNode(unref(CircleX), { size: 10 }),
                                              _cache[142] || (_cache[142] = createTextVNode(" CANCEL ", -1))
                                            ]),
                                            createBaseVNode("button", {
                                              onClick: $event => (saveEditNote(note.id)),
                                              disabled: !editingNoteText.value.trim(),
                                              class: "px-3 py-1.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-1.5"
                                            }, [
                                              createVNode(unref(Save), { size: 10 }),
                                              _cache[143] || (_cache[143] = createTextVNode(" SAVE ", -1))
                                            ], 8, _hoisted_185)
                                          ])
                                        ], 64))
                                      : (openBlock(), createElementBlock("p", _hoisted_186, toDisplayString(note.text), 1))
                                  ]),
                                  (editingNoteId.value !== note.id)
                                    ? (openBlock(), createElementBlock("div", _hoisted_187, [
                                        createBaseVNode("button", {
                                          onClick: $event => (startEditNote(note)),
                                          class: "w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all",
                                          title: "Edit note"
                                        }, [
                                          createVNode(unref(SquarePen), { size: 12 })
                                        ], 8, _hoisted_188),
                                        createBaseVNode("button", {
                                          onClick: $event => (deleteNote(note.id)),
                                          class: "w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all",
                                          title: "Delete note"
                                        }, [
                                          createVNode(unref(Trash2), { size: 12 })
                                        ], 8, _hoisted_189)
                                      ]))
                                    : createCommentVNode("", true)
                                ])
                              ]))
                            }), 128))
                          ]))
                        : (openBlock(), createElementBlock("div", _hoisted_190, [
                            createVNode(unref(StickyNote), {
                              size: 32,
                              class: "text-gray-200 mb-4"
                            }),
                            _cache[144] || (_cache[144] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "NO_NOTES_RECORDED", -1)),
                            _cache[145] || (_cache[145] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "Add contextual notes to this account above.", -1))
                          ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'meetings')
                  ? (openBlock(), createElementBlock("div", _hoisted_191, [
                      createBaseVNode("div", _hoisted_192, [
                        createBaseVNode("div", _hoisted_193, toDisplayString(meetings.value.length) + " MEETING_RECORD(S)", 1),
                        createBaseVNode("button", {
                          onClick: _cache[51] || (_cache[51] = $event => (showMeetingForm.value = !showMeetingForm.value)),
                          class: normalizeClass([showMeetingForm.value ? 'bg-gray-100 text-gray-600' : 'bg-[#2F2E8B] text-white', "px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-2"])
                        }, [
                          createVNode(unref(Plus), { size: 12 }),
                          createTextVNode(" " + toDisplayString(showMeetingForm.value ? 'CANCEL' : 'SCHEDULE_MEETING'), 1)
                        ], 2)
                      ]),
                      (showMeetingForm.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_194, [
                            createBaseVNode("div", _hoisted_195, [
                              _cache[146] || (_cache[146] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                              createTextVNode(" " + toDisplayString(editingMeetingId.value ? 'EDIT_MEETING_RECORD' : 'NEW_MEETING_RECORD'), 1)
                            ]),
                            createBaseVNode("div", _hoisted_196, [
                              createBaseVNode("div", _hoisted_197, [
                                _cache[147] || (_cache[147] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Meeting Title *", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[52] || (_cache[52] = $event => ((newMeeting.value.title) = $event)),
                                  type: "text",
                                  placeholder: "MEETING_SUBJECT",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newMeeting.value.title]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[149] || (_cache[149] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Meeting Type", -1)),
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": _cache[53] || (_cache[53] = $event => ((newMeeting.value.meeting_type) = $event)),
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 uppercase focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, [...(_cache[148] || (_cache[148] = [
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
                                _cache[150] || (_cache[150] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Location / Link", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[54] || (_cache[54] = $event => ((newMeeting.value.location) = $event)),
                                  type: "text",
                                  placeholder: "OFFICE / ZOOM_LINK",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-widest focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newMeeting.value.location]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[151] || (_cache[151] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Start Date/Time *", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[55] || (_cache[55] = $event => ((newMeeting.value.start_datetime) = $event)),
                                  type: "datetime-local",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newMeeting.value.start_datetime]
                                ])
                              ]),
                              createBaseVNode("div", null, [
                                _cache[152] || (_cache[152] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "End Date/Time *", -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[56] || (_cache[56] = $event => ((newMeeting.value.end_datetime) = $event)),
                                  type: "datetime-local",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 focus:outline-none focus:border-[#2F2E8B] transition-colors"
                                }, null, 512), [
                                  [vModelText, newMeeting.value.end_datetime]
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_198, [
                                _cache[153] || (_cache[153] = createBaseVNode("label", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-1" }, "Agenda / Description", -1)),
                                withDirectives(createBaseVNode("textarea", {
                                  "onUpdate:modelValue": _cache[57] || (_cache[57] = $event => ((newMeeting.value.agenda) = $event)),
                                  rows: "3",
                                  placeholder: "MEETING_AGENDA_POINTS...",
                                  class: "w-full border border-gray-200 bg-white px-3 py-2 text-[11px] font-mono font-black text-gray-900 tracking-tight focus:outline-none focus:border-[#2F2E8B] transition-colors resize-none"
                                }, null, 512), [
                                  [vModelText, newMeeting.value.agenda]
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_199, [
                              createBaseVNode("button", {
                                onClick: _cache[58] || (_cache[58] = $event => (showMeetingForm.value = false)),
                                class: "px-4 py-2 border border-gray-200 text-gray-400 text-[9px] font-mono font-black uppercase tracking-widest hover:text-gray-700 transition-all flex items-center gap-2"
                              }, [
                                createVNode(unref(CircleX), { size: 12 }),
                                _cache[154] || (_cache[154] = createTextVNode(" CANCEL ", -1))
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
                                createTextVNode(" " + toDisplayString(savingMeeting.value ? 'SCHEDULING...' : (editingMeetingId.value ? 'SAVE_CHANGES' : 'COMMIT_MEETING')), 1)
                              ], 8, _hoisted_200)
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (loadingMeetings.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_201, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[155] || (_cache[155] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Loading_Meeting_Records...", -1))
                          ]))
                        : (meetings.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_202, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(meetings.value, (meeting) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: meeting.id,
                                  class: "bg-white border border-gray-100 p-5 hover:border-[#2F2E8B]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden"
                                }, [
                                  createBaseVNode("div", {
                                    class: normalizeClass(["absolute left-0 top-0 bottom-0 w-1", meeting.status === 'completed' ? 'bg-emerald-500' : meeting.status === 'cancelled' ? 'bg-red-400' : 'bg-[#2F2E8B]'])
                                  }, null, 2),
                                  createBaseVNode("div", _hoisted_203, [
                                    createBaseVNode("div", _hoisted_204, [
                                      createBaseVNode("div", _hoisted_205, [
                                        createBaseVNode("span", _hoisted_206, toDisplayString(meeting.title || meeting.subject || 'UNTITLED_MEETING'), 1),
                                        (meeting.status)
                                          ? (openBlock(), createElementBlock("span", {
                                              key: 0,
                                              class: normalizeClass(["px-2 py-0.5 border text-[8px] font-mono font-black uppercase tracking-widest", meeting.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : meeting.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-[#2F2E8B] border-blue-100'])
                                            }, toDisplayString(meeting.status), 3))
                                          : createCommentVNode("", true),
                                        (meeting.meeting_type)
                                          ? (openBlock(), createElementBlock("span", _hoisted_207, toDisplayString(meeting.meeting_type?.replace('_', ' ')), 1))
                                          : createCommentVNode("", true)
                                      ]),
                                      createBaseVNode("div", _hoisted_208, [
                                        (meeting.start_datetime || meeting.start_time)
                                          ? (openBlock(), createElementBlock("span", _hoisted_209, [
                                              createVNode(unref(Clock), { size: 10 }),
                                              createTextVNode(" " + toDisplayString(formatDate(meeting.start_datetime || meeting.start_time)), 1)
                                            ]))
                                          : createCommentVNode("", true),
                                        (meeting.location)
                                          ? (openBlock(), createElementBlock("span", _hoisted_210, [
                                              createVNode(unref(MapPin), { size: 10 }),
                                              createTextVNode(" " + toDisplayString(meeting.location), 1)
                                            ]))
                                          : createCommentVNode("", true),
                                        (meeting.organizer_name)
                                          ? (openBlock(), createElementBlock("span", _hoisted_211, [
                                              createVNode(unref(Tag), { size: 10 }),
                                              createTextVNode(" " + toDisplayString(meeting.organizer_name), 1)
                                            ]))
                                          : createCommentVNode("", true)
                                      ]),
                                      (meeting.agenda || meeting.description)
                                        ? (openBlock(), createElementBlock("p", _hoisted_212, toDisplayString(meeting.agenda || meeting.description), 1))
                                        : createCommentVNode("", true)
                                    ]),
                                    (meeting.status === 'completed')
                                      ? (openBlock(), createElementBlock("div", _hoisted_213, [
                                          createVNode(unref(CircleCheck), {
                                            size: 18,
                                            class: "text-emerald-500"
                                          })
                                        ]))
                                      : createCommentVNode("", true),
                                    createBaseVNode("div", _hoisted_214, [
                                      createBaseVNode("button", {
                                        onClick: $event => (editMeeting(meeting)),
                                        class: "w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all",
                                        title: "Edit meeting"
                                      }, [
                                        createVNode(unref(SquarePen), { size: 12 })
                                      ], 8, _hoisted_215),
                                      createBaseVNode("button", {
                                        onClick: $event => (deleteMeetingRecord(meeting)),
                                        class: "w-7 h-7 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all",
                                        title: "Delete meeting"
                                      }, [
                                        createVNode(unref(Trash2), { size: 12 })
                                      ], 8, _hoisted_216)
                                    ])
                                  ])
                                ]))
                              }), 128))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_217, [
                              createVNode(unref(CalendarCheck), {
                                size: 32,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[157] || (_cache[157] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "NO_MEETINGS_SCHEDULED", -1)),
                              _cache[158] || (_cache[158] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "No meeting records linked to this account.", -1)),
                              createBaseVNode("button", {
                                onClick: _cache[59] || (_cache[59] = $event => (showMeetingForm.value = true)),
                                class: "mt-6 px-6 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-2"
                              }, [
                                createVNode(unref(Plus), { size: 12 }),
                                _cache[156] || (_cache[156] = createTextVNode(" SCHEDULE_FIRST_MEETING ", -1))
                              ])
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'activities')
                  ? (openBlock(), createElementBlock("div", _hoisted_218, [
                      (loadingActivities.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_219, [
                            createVNode(unref(LoaderCircle), {
                              class: "animate-spin text-[#2F2E8B]",
                              size: 32
                            }),
                            _cache[159] || (_cache[159] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mt-4" }, "Retrieving_Audit_Log...", -1))
                          ]))
                        : (activities.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_220, [
                              _cache[163] || (_cache[163] = createBaseVNode("div", { class: "absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#2F2E8B] via-blue-400 to-gray-200 rounded-full opacity-20" }, null, -1)),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(activities.value, (activity, aIdx) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: activity.id,
                                  class: "relative pb-3 last:pb-1"
                                }, [
                                  createBaseVNode("div", {
                                    class: normalizeClass(["absolute left-[19px] top-[18px] w-[14px] h-[2px] rounded-r-full", aIdx === 0 ? 'bg-[#2F2E8B]/30' : 'bg-gray-200'])
                                  }, null, 2),
                                  createBaseVNode("div", _hoisted_221, [
                                    createBaseVNode("div", _hoisted_222, [
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
                                  createBaseVNode("div", _hoisted_223, [
                                    createBaseVNode("div", _hoisted_224, [
                                      createBaseVNode("div", _hoisted_225, [
                                        createBaseVNode("div", _hoisted_226, [
                                          createBaseVNode("span", {
                                            class: normalizeClass([getActivityColorClass(activity.type)?.replace('bg-', 'text-'), 'text-[11px] font-mono font-black uppercase tracking-widest'])
                                          }, toDisplayString(formatActivityType(activity.type || activity.action || 'event')), 3),
                                          _cache[160] || (_cache[160] = createBaseVNode("span", { class: "w-0.5 h-0.5 bg-gray-300 rounded-full" }, null, -1)),
                                          createBaseVNode("span", _hoisted_227, [
                                            createVNode(unref(Clock), {
                                              size: 9,
                                              class: "inline -mt-0.5 mr-0.5"
                                            }),
                                            createTextVNode(" " + toDisplayString(formatDate(activity.createdAt || activity.timestamp)), 1)
                                          ]),
                                          _cache[161] || (_cache[161] = createBaseVNode("span", { class: "w-0.5 h-0.5 bg-gray-300 rounded-full" }, null, -1)),
                                          createBaseVNode("span", _hoisted_228, [
                                            createVNode(unref(Users), {
                                              size: 8,
                                              class: "text-gray-300"
                                            }),
                                            createTextVNode(" " + toDisplayString((activity.actor || 'system').split('@')[0]), 1)
                                          ])
                                        ]),
                                        createBaseVNode("p", _hoisted_229, toDisplayString(activity.notes || activity.description || 'NO_DETAILS_RECORDED'), 1),
                                        (activity.metadata?.changes?.length)
                                          ? (openBlock(), createElementBlock("div", _hoisted_230, [
                                              (openBlock(true), createElementBlock(Fragment, null, renderList(activity.metadata.changes, (chg, cIdx) => {
                                                return (openBlock(), createElementBlock("div", {
                                                  key: cIdx,
                                                  class: "flex items-center gap-2 text-[9px] font-mono border border-dashed border-gray-200 bg-white px-2 py-1.5 rounded-sm"
                                                }, [
                                                  createBaseVNode("span", _hoisted_231, toDisplayString(chg.field), 1),
                                                  createBaseVNode("span", {
                                                    class: "text-gray-400 line-through decoration-red-400/60 truncate max-w-[120px]",
                                                    title: chg.oldValue
                                                  }, "\"" + toDisplayString(chg.oldValue || '—') + "\"", 9, _hoisted_232),
                                                  _cache[162] || (_cache[162] = createBaseVNode("span", { class: "text-gray-300 shrink-0" }, [
                                                    createBaseVNode("svg", {
                                                      width: "12",
                                                      height: "12",
                                                      viewBox: "0 0 24 24",
                                                      fill: "none",
                                                      stroke: "currentColor",
                                                      "stroke-width": "2",
                                                      class: "inline"
                                                    }, [
                                                      createBaseVNode("path", { d: "M5 12h14" }),
                                                      createBaseVNode("path", { d: "m12 5 7 7-7 7" })
                                                    ])
                                                  ], -1)),
                                                  createBaseVNode("span", {
                                                    class: "font-bold text-emerald-700 truncate max-w-[200px]",
                                                    title: chg.newValue
                                                  }, "\"" + toDisplayString(chg.newValue || '—') + "\"", 9, _hoisted_233)
                                                ]))
                                              }), 128))
                                            ]))
                                          : createCommentVNode("", true),
                                        (activity.lead_id || activity.related_record_id || activity.duration || activity.outcome)
                                          ? (openBlock(), createElementBlock("div", _hoisted_234, [
                                              (activity.lead_id)
                                                ? (openBlock(), createElementBlock("span", _hoisted_235, "Lead: " + toDisplayString(activity.lead_id?.substring(0, 8)), 1))
                                                : createCommentVNode("", true),
                                              (activity.related_record_id)
                                                ? (openBlock(), createElementBlock("span", _hoisted_236, "Related: " + toDisplayString(activity.related_record_id?.substring(0, 8)), 1))
                                                : createCommentVNode("", true),
                                              (activity.duration)
                                                ? (openBlock(), createElementBlock("span", _hoisted_237, toDisplayString(activity.duration), 1))
                                                : createCommentVNode("", true),
                                              (activity.outcome)
                                                ? (openBlock(), createElementBlock("span", _hoisted_238, toDisplayString(activity.outcome), 1))
                                                : createCommentVNode("", true)
                                            ]))
                                          : createCommentVNode("", true)
                                      ]),
                                      createBaseVNode("div", _hoisted_239, [
                                        createBaseVNode("button", {
                                          onClick: $event => (deleteActivity(activity.id)),
                                          class: "w-6 h-6 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 rounded-sm transition-all",
                                          title: "Delete activity"
                                        }, [
                                          createVNode(unref(Trash2), { size: 11 })
                                        ], 8, _hoisted_240)
                                      ])
                                    ])
                                  ])
                                ]))
                              }), 128)),
                              _cache[164] || (_cache[164] = createBaseVNode("div", { class: "relative pl-[26px] pt-1 pb-2" }, [
                                createBaseVNode("div", { class: "flex items-center gap-2 text-[8px] font-mono font-bold text-gray-300 uppercase tracking-[0.3em]" }, [
                                  createBaseVNode("span", { class: "w-4 h-[2px] bg-gray-200 rounded-full" }),
                                  createTextVNode(" END_OF_LOG ")
                                ])
                              ], -1))
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_241, [
                              createVNode(unref(GitCommitHorizontal), {
                                size: 36,
                                class: "text-gray-200 mb-4"
                              }),
                              _cache[165] || (_cache[165] = createBaseVNode("h5", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "ZERO_ACTIVITY_DETECTED", -1)),
                              _cache[166] || (_cache[166] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed" }, "System interaction logs are currently empty. Initialize communications to populate this stream.", -1))
                            ]))
                    ]))
                  : createCommentVNode("", true),
                (activeTab.value === 'documents')
                  ? (openBlock(), createElementBlock("div", _hoisted_242, [
                      createVNode(LinkedDocumentsWidget, {
                        recordType: "account",
                        recordId: __props.account.id,
                        recordName: __props.account.name
                      }, null, 8, ["recordId", "recordName"])
                    ]))
                  : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_243, [
              createBaseVNode("div", _hoisted_244, [
                createBaseVNode("button", {
                  onClick: handleDelete,
                  class: "px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(Trash2), { size: 13 }),
                  _cache[168] || (_cache[168] = createTextVNode(" DELETE ", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[60] || (_cache[60] = $event => {_ctx.$emit('archive', __props.account); close();}),
                  class: "px-4 py-2 border border-amber-200 text-amber-600 hover:bg-amber-50 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(Archive), { size: 13 }),
                  _cache[169] || (_cache[169] = createTextVNode(" ARCHIVE ", -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_245, [
                createBaseVNode("button", {
                  onClick: close,
                  class: "px-5 py-2 border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all"
                }, " CLOSE "),
                createBaseVNode("button", {
                  onClick: handleEdit,
                  class: "px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all flex items-center gap-1.5"
                }, [
                  createVNode(unref(SquarePen), { size: 14 }),
                  _cache[170] || (_cache[170] = createTextVNode(" EDIT ", -1))
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
            createBaseVNode("div", _hoisted_246, [
              createBaseVNode("div", {
                class: normalizeClass(["h-1.5 w-full", confirmDanger.value ? 'bg-red-600' : 'bg-[#2F2E8B]'])
              }, null, 2),
              createBaseVNode("div", _hoisted_247, [
                createBaseVNode("div", _hoisted_248, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-10 h-10 flex items-center justify-center rounded-full", confirmDanger.value ? 'bg-red-50 border border-red-200' : 'bg-[#2F2E8B]/5 border border-[#2F2E8B]/20'])
                  }, [
                    (confirmDanger.value)
                      ? (openBlock(), createBlock(unref(Trash2), {
                          key: 0,
                          size: 16,
                          class: "text-red-600"
                        }))
                      : (openBlock(), createBlock(unref(Info), {
                          key: 1,
                          size: 16,
                          class: "text-[#2F2E8B]"
                        }))
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", _hoisted_249, toDisplayString(confirmTitle.value), 1),
                    createBaseVNode("p", _hoisted_250, toDisplayString(confirmMessage.value), 1)
                  ])
                ]),
                createBaseVNode("div", _hoisted_251, [
                  createBaseVNode("button", {
                    onClick: cancelConfirm,
                    class: "px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"
                  }, "CANCEL"),
                  createBaseVNode("button", {
                    onClick: executeConfirm,
                    class: normalizeClass(["px-4 py-2 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5", confirmDanger.value ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2F2E8B] hover:bg-[#3D2F88]'])
                  }, [
                    (confirmDanger.value)
                      ? (openBlock(), createBlock(unref(Trash2), {
                          key: 0,
                          size: 12
                        }))
                      : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(confirmDanger.value ? 'DELETE' : 'CONFIRM'), 1)
                  ], 2)
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showCallDialog.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[100001] p-4 pt-[8vh]",
            onClick: withModifiers(closeCallDialog, ["self"])
          }, [
            createBaseVNode("div", _hoisted_252, [
              createBaseVNode("div", _hoisted_253, [
                createBaseVNode("div", _hoisted_254, [
                  createBaseVNode("div", _hoisted_255, [
                    createVNode(unref(Phone), {
                      size: 14,
                      class: "text-white"
                    })
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", _hoisted_256, toDisplayString(callContactName.value || 'Account'), 1),
                    createBaseVNode("div", _hoisted_257, toDisplayString(customCallPhone.value || '—'), 1)
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: closeCallDialog,
                  class: "w-6 h-6 flex items-center justify-center text-emerald-300 hover:text-white transition rounded-sm hover:bg-emerald-600"
                }, [
                  createVNode(unref(X), { size: 14 })
                ])
              ]),
              createBaseVNode("div", _hoisted_258, [
                createBaseVNode("div", _hoisted_259, [
                  createBaseVNode("div", null, [
                    _cache[172] || (_cache[172] = createBaseVNode("div", { class: "text-[7px] font-mono font-bold text-emerald-700 uppercase tracking-widest" }, "Phone Number", -1)),
                    createBaseVNode("div", _hoisted_260, toDisplayString(customCallPhone.value || 'No number on file'), 1)
                  ]),
                  (customCallPhone.value)
                    ? (openBlock(), createElementBlock("a", {
                        key: 0,
                        href: `tel:${customCallPhone.value}`,
                        class: "inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[8px] font-mono font-black uppercase tracking-widest transition-colors"
                      }, [
                        createVNode(unref(Phone), { size: 10 }),
                        _cache[173] || (_cache[173] = createTextVNode(" Initiate Call ", -1))
                      ], 8, _hoisted_261))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", { class: "flex items-center justify-between mb-1.5" }, [
                    _cache[174] || (_cache[174] = createBaseVNode("h4", { class: "text-[8px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1" }, [
                      createBaseVNode("i", { class: "fas fa-list-check text-emerald-600 text-[9px]" }),
                      createTextVNode(" Talking Points ")
                    ], -1)),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: resetCallTalkingPoints,
                      class: "text-[7px] font-mono font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-wider"
                    }, "Reset")
                  ]),
                  createBaseVNode("div", _hoisted_262, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(callTalkingPoints.value, (point, idx) => {
                      return (openBlock(), createElementBlock("label", {
                        key: idx,
                        class: "flex items-start gap-1.5 p-1.5 border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-colors"
                      }, [
                        withDirectives(createBaseVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": $event => ((point.done) = $event),
                          class: "mt-0.5 rounded-sm text-emerald-600 focus:ring-emerald-500 border-gray-300 w-3 h-3"
                        }, null, 8, _hoisted_263), [
                          [vModelCheckbox, point.done]
                        ]),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-[9px] text-gray-700 font-mono uppercase tracking-tight leading-snug", { 'line-through text-gray-400': point.done }])
                        }, toDisplayString(point.text), 3)
                      ]))
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_264, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[61] || (_cache[61] = $event => ((callNewTalkingPoint).value = $event)),
                      onKeyup: withKeys(addCallTalkingPoint, ["enter"]),
                      type: "text",
                      placeholder: "Add point...",
                      class: "flex-1 border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono uppercase outline-none bg-gray-50"
                    }, null, 544), [
                      [vModelText, callNewTalkingPoint.value]
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: addCallTalkingPoint,
                      class: "px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[8px] font-mono font-black uppercase transition"
                    }, [...(_cache[175] || (_cache[175] = [
                      createBaseVNode("i", { class: "fas fa-plus text-[9px]" }, null, -1)
                    ]))])
                  ])
                ]),
                createBaseVNode("div", _hoisted_265, [
                  createBaseVNode("div", null, [
                    _cache[177] || (_cache[177] = createBaseVNode("label", { class: "block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Outcome", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[62] || (_cache[62] = $event => ((callOutcomeVal).value = $event)),
                      class: "w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono uppercase outline-none bg-gray-50"
                    }, [...(_cache[176] || (_cache[176] = [
                      createBaseVNode("option", { value: "connected" }, "CONNECTED", -1),
                      createBaseVNode("option", { value: "voicemail" }, "VOICEMAIL", -1),
                      createBaseVNode("option", { value: "no_answer" }, "NO ANSWER", -1),
                      createBaseVNode("option", { value: "busy" }, "BUSY", -1),
                      createBaseVNode("option", { value: "follow_up" }, "FOLLOW-UP NEEDED", -1),
                      createBaseVNode("option", { value: "not_interested" }, "NOT INTERESTED", -1)
                    ]))], 512), [
                      [vModelSelect, callOutcomeVal.value]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[178] || (_cache[178] = createBaseVNode("label", { class: "block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Duration (Min)", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[63] || (_cache[63] = $event => ((callDurationVal).value = $event)),
                      type: "number",
                      min: "0",
                      step: "0.5",
                      placeholder: "0",
                      class: "w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono outline-none bg-gray-50"
                    }, null, 512), [
                      [
                        vModelText,
                        callDurationVal.value,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[179] || (_cache[179] = createBaseVNode("label", { class: "block text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1" }, [
                    createBaseVNode("i", { class: "fas fa-pen text-emerald-600 text-[9px]" }),
                    createTextVNode(" Call Notes ")
                  ], -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[64] || (_cache[64] = $event => ((callNoteText).value = $event)),
                    rows: "2",
                    placeholder: "DISCUSSION, NEXT STEPS, OBJECTIONS...",
                    class: "w-full border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-2 py-1.5 text-[9px] font-mono outline-none bg-gray-50 resize-none"
                  }, null, 512), [
                    [vModelText, callNoteText.value]
                  ])
                ]),
                (callErrorMsg.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_266, toDisplayString(callErrorMsg.value), 1))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_267, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: closeCallDialog,
                  class: "px-3 py-1.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition text-[8px] font-mono font-black uppercase tracking-widest"
                }, "Cancel"),
                createBaseVNode("button", {
                  type: "button",
                  onClick: saveAccountCallNote,
                  disabled: callSaving.value || !callNoteText.value.trim(),
                  class: "px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition text-[8px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5"
                }, [
                  (callSaving.value)
                    ? (openBlock(), createBlock(unref(LoaderCircle), {
                        key: 0,
                        size: 10,
                        class: "animate-spin"
                      }))
                    : (openBlock(), createBlock(unref(Save), {
                        key: 1,
                        size: 10
                      })),
                  createTextVNode(" " + toDisplayString(callSaving.value ? 'SAVING...' : 'Save Note & Log Call'), 1)
                ], 8, _hoisted_268)
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
            onClick: withModifiers(closeWhatsAppDialog, ["self"])
          }, [
            createBaseVNode("div", _hoisted_269, [
              createBaseVNode("div", _hoisted_270, [
                createBaseVNode("div", _hoisted_271, [
                  createBaseVNode("div", _hoisted_272, [
                    createVNode(unref(MessageSquare), {
                      size: 12,
                      class: "text-white"
                    })
                  ]),
                  _cache[180] || (_cache[180] = createBaseVNode("span", { class: "text-[11px] font-mono font-black text-white uppercase tracking-widest" }, "WhatsApp // Message", -1))
                ]),
                createBaseVNode("button", {
                  onClick: closeWhatsAppDialog,
                  class: "w-5 h-5 flex items-center justify-center text-green-300 hover:text-white rounded-sm hover:bg-green-700 transition-colors"
                }, [
                  createVNode(unref(X), { size: 12 })
                ])
              ]),
              createBaseVNode("div", _hoisted_273, [
                createBaseVNode("div", _hoisted_274, [
                  createVNode(unref(MessageSquare), {
                    size: 11,
                    class: "text-green-600"
                  }),
                  createBaseVNode("span", null, toDisplayString(whatsAppContactName.value || 'CONTACT'), 1),
                  (whatsAppPhoneNumber.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_275, "· " + toDisplayString(whatsAppPhoneNumber.value), 1))
                    : createCommentVNode("", true)
                ]),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[65] || (_cache[65] = $event => ((whatsAppMessage).value = $event)),
                  rows: "3",
                  placeholder: "Type your WhatsApp message...",
                  class: "w-full border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-mono text-gray-700 outline-none focus:border-green-500 focus:bg-green-50/30 resize-none rounded-sm transition-colors"
                }, null, 512), [
                  [vModelText, whatsAppMessage.value]
                ]),
                createBaseVNode("div", _hoisted_276, [
                  createBaseVNode("p", _hoisted_277, [
                    createVNode(unref(MessageSquare), { size: 10 }),
                    _cache[181] || (_cache[181] = createTextVNode(" Message logged to account activity. ", -1))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_278, [
                (whatsAppPhoneNumber.value)
                  ? (openBlock(), createElementBlock("a", {
                      key: 0,
                      href: 'https://wa.me/' + whatsAppPhoneNumber.value.replace(/[^0-9]/g, ''),
                      target: "_blank",
                      class: "px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none"
                    }, [
                      createVNode(unref(MessageSquare), { size: 11 }),
                      _cache[182] || (_cache[182] = createTextVNode(" Open WhatsApp ", -1))
                    ], 8, _hoisted_279))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_280, [
                  createBaseVNode("button", {
                    onClick: closeWhatsAppDialog,
                    class: "px-3 py-1.5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest hover:text-gray-700 transition-colors"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    onClick: proceedWithWhatsApp,
                    class: "px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[9px] font-mono font-black uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm shadow-none"
                  }, [
                    createVNode(unref(MessageSquare), { size: 11 }),
                    _cache[183] || (_cache[183] = createTextVNode(" Save Text ", -1))
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
const AccountDetailModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-74d1fb0e"]]);

const _hoisted_1 = { class: "bg-white rounded-sm shadow-2xl max-w-5xl w-full border border-gray-200 relative overflow-hidden animate-modal-in flex flex-col my-auto md:my-10" };
const _hoisted_2 = { class: "relative z-10 sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-sm" };
const _hoisted_3 = { class: "flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "text-sm font-black text-gray-900 uppercase tracking-tight font-mono flex items-center gap-2" };
const _hoisted_6 = { class: "relative z-10 flex-1 overflow-y-auto p-4 max-h-[75vh]" };
const _hoisted_7 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_8 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_9 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_10 = { class: "relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_11 = { class: "md:col-span-3 space-y-1.5" };
const _hoisted_12 = { class: "space-y-1.5" };
const _hoisted_13 = { class: "space-y-1.5" };
const _hoisted_14 = { class: "space-y-1.5" };
const _hoisted_15 = { class: "space-y-1.5" };
const _hoisted_16 = { class: "space-y-1.5" };
const _hoisted_17 = { class: "space-y-1.5" };
const _hoisted_18 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_19 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_20 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_21 = {
  key: 0,
  class: "relative z-10 p-4"
};
const _hoisted_22 = {
  key: 1,
  class: "relative z-10 p-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400"
};
const _hoisted_23 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_24 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_25 = { class: "relative z-10 p-4 space-y-4" };
const _hoisted_26 = { class: "space-y-1.5" };
const _hoisted_27 = { class: "relative" };
const _hoisted_28 = { class: "relative" };
const _hoisted_29 = {
  key: 0,
  class: "absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-xl max-h-48 overflow-y-auto"
};
const _hoisted_30 = ["onClick"];
const _hoisted_31 = { class: "text-[11px] font-bold text-gray-900 font-mono" };
const _hoisted_32 = { class: "text-[9px] text-gray-500 font-mono" };
const _hoisted_33 = {
  key: 0,
  class: "flex flex-wrap gap-1.5 mt-2"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_36 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_37 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_38 = { class: "relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_39 = { class: "md:col-span-3 space-y-1.5" };
const _hoisted_40 = { class: "space-y-1.5" };
const _hoisted_41 = { class: "space-y-1.5" };
const _hoisted_42 = { class: "space-y-1.5" };
const _hoisted_43 = { class: "space-y-1.5" };
const _hoisted_44 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_45 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center justify-between" };
const _hoisted_46 = { class: "flex items-center gap-2" };
const _hoisted_47 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_48 = { class: "relative z-10 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_49 = { class: "md:col-span-3 space-y-1.5" };
const _hoisted_50 = { class: "space-y-1.5" };
const _hoisted_51 = { class: "space-y-1.5" };
const _hoisted_52 = { class: "space-y-1.5" };
const _hoisted_53 = { class: "space-y-1.5" };
const _hoisted_54 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_55 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_56 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_57 = { class: "relative z-10 p-4 space-y-4" };
const _hoisted_58 = { class: "space-y-1.5" };
const _hoisted_59 = { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_60 = { class: "space-y-1.5" };
const _hoisted_61 = { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_62 = { class: "space-y-1.5" };
const _hoisted_63 = { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_64 = { class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden" };
const _hoisted_65 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_66 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_67 = { class: "relative z-10 p-4" };
const _hoisted_68 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-200 relative overflow-hidden"
};
const _hoisted_69 = { class: "relative z-10 border-b border-gray-100 px-4 py-3 flex items-center gap-2" };
const _hoisted_70 = { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_71 = { class: "relative z-10 p-4" };
const _hoisted_72 = { class: "relative z-10 border-t border-gray-200 p-4 bg-white sticky bottom-0" };
const _hoisted_73 = { class: "flex flex-col sm:flex-row justify-end gap-2" };
const _hoisted_74 = ["disabled"];


const _sfc_main = {
  __name: 'AccountFormModal',
  props: {
  modelValue: Boolean,
  account: Object,
  users: Array
},
  emits: ['update:modelValue', 'saved'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const { getTenantId, getUserEmail } = decodeJWT();
const { canAssign, initializeRBAC } = useRBAC();
const currentUserEmail = getUserEmail();
const canAssignCrm = computed(() => canAssign('crm'));

const saving = ref(false);

const form = ref({
  name: '',
  website: '',
  industry: '',
  phone: '',
  email: '',
  numberOfEmployees: null,
  annualRevenue: null,
  billingStreet: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
  billingCountry: '',
  shippingStreet: '',
  shippingCity: '',
  shippingState: '',
  shippingPostalCode: '',
  shippingCountry: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  description: '',
  assignedTo: currentUserEmail
});

// CRM Association Data
const leadSearchQuery = ref('');
const contactSearchQuery = ref('');
const dealSearchQuery = ref('');

const showLeadDropdown = ref(false);
const showContactDropdown = ref(false);
const showDealDropdown = ref(false);

const selectedLeads = ref([]);
const selectedContacts = ref([]);
const selectedDeals = ref([]);

const availableLeads = ref([]);
const availableContacts = ref([]);
const availableDeals = ref([]);

const filteredLeads = ref([]);
ref([]);
ref([]);

const isEditMode = computed(() => !!props.account?.id);

watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    await loadCRMEntities();
    
    if (props.account) {
      form.value = {
        id: props.account.id,
        name: props.account.name || '',
        website: props.account.website || '',
        industry: props.account.industry || '',
        phone: props.account.phone || '',
        email: props.account.email || '',
        numberOfEmployees: props.account.numberOfEmployees || null,
        annualRevenue: props.account.annualRevenue || null,
        billingStreet: props.account.billingStreet || '',
        billingCity: props.account.billingCity || '',
        billingState: props.account.billingState || '',
        billingPostalCode: props.account.billingPostalCode || '',
        billingCountry: props.account.billingCountry || '',
        shippingStreet: props.account.shippingStreet || '',
        shippingCity: props.account.shippingCity || '',
        shippingState: props.account.shippingState || '',
        shippingPostalCode: props.account.shippingPostalCode || '',
        shippingCountry: props.account.shippingCountry || '',
        linkedin: props.account.linkedin || '',
        twitter: props.account.twitter || '',
        facebook: props.account.facebook || '',
        description: props.account.description || '',
        assignedTo: props.account.assignedTo || props.account.owner || currentUserEmail
      };
      
      if (props.account.associatedLeadIds && props.account.associatedLeadIds.length > 0) {
        selectedLeads.value = availableLeads.value.filter(lead => 
          props.account.associatedLeadIds.includes(lead.id)
        );
      }
      if (props.account.associatedContactIds && props.account.associatedContactIds.length > 0) {
        selectedContacts.value = availableContacts.value.filter(contact => 
          props.account.associatedContactIds.includes(contact.id)
        );
      }
      if (props.account.associatedDealIds && props.account.associatedDealIds.length > 0) {
        selectedDeals.value = availableDeals.value.filter(deal => 
          props.account.associatedDealIds.includes(deal.id)
        );
      }
    } else {
      resetForm();
    }
  }
});

function resetForm() {
  form.value = {
    name: '',
    website: '',
    industry: '',
    phone: '',
    email: '',
    numberOfEmployees: null,
    annualRevenue: null,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    description: '',
    assignedTo: currentUserEmail
  };
  
  selectedLeads.value = [];
  selectedContacts.value = [];
  selectedDeals.value = [];
  leadSearchQuery.value = '';
  contactSearchQuery.value = '';
  dealSearchQuery.value = '';
}

function copyBillingToShipping() {
  form.value.shippingStreet = form.value.billingStreet;
  form.value.shippingCity = form.value.billingCity;
  form.value.shippingState = form.value.billingState;
  form.value.shippingPostalCode = form.value.billingPostalCode;
  form.value.shippingCountry = form.value.billingCountry;
}

// CRM Association Functions
async function loadCRMEntities() {
  const tenantId = getTenantId();
  try {
    const leadsData = await getLeads(tenantId, { per_page: 1000 });
    availableLeads.value = leadsData.items || [];
    const contactsData = await getContacts(tenantId, { per_page: 1000 });
    availableContacts.value = contactsData.items || [];
    const dealsData = await getDeals(tenantId, { per_page: 1000 });
    availableDeals.value = dealsData.items || [];
  } catch (error) {
    console.error('Failed to load CRM entities:', error);
  }
}

function searchLeads() {
  const query = leadSearchQuery.value.toLowerCase();
  // No query -> surface all available leads (minus already selected ones)
  if (!query) {
    filteredLeads.value = availableLeads.value
      .filter(lead => !selectedLeads.value.some(s => s.id === lead.id))
      .slice(0, 50);
    showLeadDropdown.value = filteredLeads.value.length > 0;
    return;
  }
  filteredLeads.value = availableLeads.value.filter(lead => {
    const isAlreadySelected = selectedLeads.value.some(s => s.id === lead.id);
    if (isAlreadySelected) return false;
    return (lead.name?.toLowerCase().includes(query) || lead.company?.toLowerCase().includes(query) || lead.email?.toLowerCase().includes(query));
  }).slice(0, 50);
}

function openLeadDropdown() {
  showLeadDropdown.value = true;
  searchLeads();
}

function addLead(lead) {
  if (!selectedLeads.value.some(s => s.id === lead.id)) { selectedLeads.value.push(lead); }
  leadSearchQuery.value = ''; filteredLeads.value = []; showLeadDropdown.value = false;
}

function removeLead(leadId) { selectedLeads.value = selectedLeads.value.filter(l => l.id !== leadId); }

onMounted(() => {
  initializeRBAC().catch(() => {});
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showLeadDropdown.value = false;
      showContactDropdown.value = false;
      showDealDropdown.value = false;
    }
  });
});

async function handleSubmit() {
  if (!form.value.name) { alert('Account name is required'); return; }
  saving.value = true;
  try {
    const tenantId = getTenantId();
    const accountData = {
      ...form.value,
      assignedTo: canAssignCrm.value
        ? form.value.assignedTo
        : (isEditMode.value ? (props.account?.assignedTo || props.account?.owner || currentUserEmail) : currentUserEmail),
      associatedLeadIds: selectedLeads.value.map(l => l.id),
      // Contacts shown under an account are derived from associated leads;
      // explicit contact/deal associations are no longer captured here.
      associatedContactIds: [],
      associatedDealIds: []
    };
    if (isEditMode.value) {
      await updateAccount(props.account.id, accountData, tenantId);
      // Field-level change tracking
      const changes = [];
      const fields = [
        { key: 'name', label: 'Name' },
        { key: 'website', label: 'Website' },
        { key: 'industry', label: 'Industry' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'numberOfEmployees', label: 'Employees' },
        { key: 'annualRevenue', label: 'Annual Revenue' },
        { key: 'billingStreet', label: 'Billing Street' },
        { key: 'billingCity', label: 'Billing City' },
        { key: 'billingState', label: 'Billing State' },
        { key: 'billingPostalCode', label: 'Billing Postal Code' },
        { key: 'billingCountry', label: 'Billing Country' },
        { key: 'shippingStreet', label: 'Shipping Street' },
        { key: 'shippingCity', label: 'Shipping City' },
        { key: 'shippingState', label: 'Shipping State' },
        { key: 'shippingPostalCode', label: 'Shipping Postal Code' },
        { key: 'shippingCountry', label: 'Shipping Country' },
        { key: 'linkedin', label: 'LinkedIn' },
        { key: 'twitter', label: 'Twitter' },
        { key: 'facebook', label: 'Facebook' },
        { key: 'description', label: 'Description' },
        { key: 'assignedTo', label: 'Assigned To' }
      ];
      const structuredChanges = [];
      for (const { key, label } of fields) {
        const oldVal = props.account[key] ?? '';
        const newVal = form.value[key] ?? '';
        if (String(oldVal) !== String(newVal)) {
          changes.push(`${label}: "${oldVal}" → "${newVal}"`);
          structuredChanges.push({ field: label, oldValue: String(oldVal), newValue: String(newVal) });
        }
      }
      if (changes.length > 0) {
        // Check if linked leads changed
        const oldLeadIds = (props.account.associatedLeadIds || []).sort().join(',');
        const newLeadIds = selectedLeads.value.map(l => l.id).sort().join(',');
        if (oldLeadIds !== newLeadIds) {
          changes.push(`Linked Leads: ${selectedLeads.value.map(l => l.name).join(', ') || 'none'}`);
          structuredChanges.push({ field: 'Linked Leads', oldValue: oldLeadIds || 'none', newValue: newLeadIds || 'none' });
        }
        logAccountActivity(props.account.id, {
          tenant_id: tenantId,
          type: 'account:update',
          notes: `Account fields updated: ${changes.join(', ')}`,
          description: `${changes.length} field(s) updated`,
          metadata: { changes: structuredChanges },
          performed_by: currentUserEmail
        }).catch(e => console.warn('[AccountFormModal] Log activity failed:', e));
      }
    } else {
      const created = await createAccount(accountData, tenantId);
      const newId = created?.id || created?._id || created?.result?.id;
      if (newId) {
        // Log creation with all populated fields
        const createdFields = [];
        const structuredChanges = [];
        const createFieldMap = [
          { key: 'name', label: 'Name' },
          { key: 'website', label: 'Website' },
          { key: 'industry', label: 'Industry' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'numberOfEmployees', label: 'Employees' },
          { key: 'annualRevenue', label: 'Annual Revenue' },
          { key: 'billingStreet', label: 'Billing Street' },
          { key: 'billingCity', label: 'Billing City' },
          { key: 'billingState', label: 'Billing State' },
          { key: 'billingPostalCode', label: 'Billing Postal Code' },
          { key: 'billingCountry', label: 'Billing Country' },
          { key: 'shippingStreet', label: 'Shipping Street' },
          { key: 'shippingCity', label: 'Shipping City' },
          { key: 'shippingState', label: 'Shipping State' },
          { key: 'shippingPostalCode', label: 'Shipping Postal Code' },
          { key: 'shippingCountry', label: 'Shipping Country' },
          { key: 'linkedin', label: 'LinkedIn' },
          { key: 'twitter', label: 'Twitter' },
          { key: 'facebook', label: 'Facebook' },
          { key: 'description', label: 'Description' },
          { key: 'assignedTo', label: 'Assigned To' }
        ];
        createFieldMap.forEach(({ key, label }) => {
          const val = form.value[key];
          if (val != null && val !== '') {
            createdFields.push(`${label}: "${val}"`);
            structuredChanges.push({ field: label, oldValue: '', newValue: String(val) });
          }
        });
        if (selectedLeads.value.length) {
          createdFields.push(`Linked Leads: ${selectedLeads.value.map(l => l.name).join(', ')}`);
          structuredChanges.push({ field: 'Linked Leads', oldValue: '', newValue: selectedLeads.value.map(l => l.name).join(', ') });
        }
        logAccountActivity(newId, {
          tenant_id: tenantId,
          type: 'account:create',
          notes: `Account created — ${createdFields.join('; ')}`,
          description: `Account created with ${structuredChanges.length} field(s)`,
          metadata: { changes: structuredChanges },
          performed_by: currentUserEmail
        }).catch(e => console.warn('[AccountFormModal] Log activity failed:', e));
      }
    }
    emit('saved');
    emit('update:modelValue', false);
  } catch (error) {
    console.error('Failed to save account:', error);
    alert('Failed to save account. Please try again.');
  } finally {
    saving.value = false;
  }
}

function close() {
  if (!saving.value) {
    emit('update:modelValue', false);
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.modelValue)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-10 overflow-y-auto",
          onClick: withModifiers(close, ["self"])
        }, [
          createBaseVNode("div", _hoisted_1, [
            _cache[74] || (_cache[74] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, [
                  _cache[24] || (_cache[24] = createBaseVNode("div", { class: "w-1 h-6 bg-[#2F2E8B]" }, null, -1)),
                  createBaseVNode("div", null, [
                    _cache[23] || (_cache[23] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "CRM // Accounts // Form", -1)),
                    createBaseVNode("h2", _hoisted_5, [
                      createVNode(unref(Building2), {
                        size: 14,
                        class: "text-[#2F2E8B]"
                      }),
                      createTextVNode(" " + toDisplayString(isEditMode.value ? 'Edit_Account' : 'New_Account'), 1)
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
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("form", {
                onSubmit: withModifiers(handleSubmit, ["prevent"]),
                class: "space-y-4"
              }, [
                createBaseVNode("section", _hoisted_7, [
                  _cache[35] || (_cache[35] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_8, [
                    _cache[26] || (_cache[26] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_9, [
                      createVNode(unref(Info), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[25] || (_cache[25] = createTextVNode(" Company_Information ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("div", _hoisted_11, [
                      _cache[27] || (_cache[27] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Account_Name *", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.name) = $event)),
                        required: "",
                        type: "text",
                        class: "input-base",
                        placeholder: "Acme Corporation"
                      }, null, 512), [
                        [vModelText, form.value.name]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_12, [
                      _cache[28] || (_cache[28] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Website", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.website) = $event)),
                        type: "url",
                        class: "input-base",
                        placeholder: "https://example.com"
                      }, null, 512), [
                        [vModelText, form.value.website]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      _cache[30] || (_cache[30] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Industry", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.industry) = $event)),
                        class: "input-base"
                      }, [...(_cache[29] || (_cache[29] = [
                        createBaseVNode("option", { value: "" }, "Select Industry", -1),
                        createBaseVNode("option", { value: "technology" }, "Technology", -1),
                        createBaseVNode("option", { value: "healthcare" }, "Healthcare", -1),
                        createBaseVNode("option", { value: "finance" }, "Finance", -1),
                        createBaseVNode("option", { value: "retail" }, "Retail", -1),
                        createBaseVNode("option", { value: "manufacturing" }, "Manufacturing", -1),
                        createBaseVNode("option", { value: "education" }, "Education", -1),
                        createBaseVNode("option", { value: "other" }, "Other", -1)
                      ]))], 512), [
                        [vModelSelect, form.value.industry]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      _cache[31] || (_cache[31] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Phone", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.phone) = $event)),
                        type: "tel",
                        class: "input-base",
                        placeholder: "+1 (555) 123-4567"
                      }, null, 512), [
                        [vModelText, form.value.phone]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_15, [
                      _cache[32] || (_cache[32] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Email", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.email) = $event)),
                        type: "email",
                        class: "input-base",
                        placeholder: "contact@company.com"
                      }, null, 512), [
                        [vModelText, form.value.email]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_16, [
                      _cache[33] || (_cache[33] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Employees", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.value.numberOfEmployees) = $event)),
                        type: "number",
                        min: "1",
                        class: "input-base",
                        placeholder: "100"
                      }, null, 512), [
                        [
                          vModelText,
                          form.value.numberOfEmployees,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      _cache[34] || (_cache[34] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Annual_Revenue", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.value.annualRevenue) = $event)),
                        type: "number",
                        min: "0",
                        step: "1000",
                        class: "input-base",
                        placeholder: "1000000"
                      }, null, 512), [
                        [
                          vModelText,
                          form.value.annualRevenue,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_18, [
                  _cache[38] || (_cache[38] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_19, [
                    _cache[37] || (_cache[37] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_20, [
                      createVNode(unref(UserCheck), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[36] || (_cache[36] = createTextVNode(" Assignment ", -1))
                    ])
                  ]),
                  (canAssignCrm.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_21, [
                        createVNode(UserSearchSelect, {
                          modelValue: form.value.assignedTo,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.value.assignedTo) = $event)),
                          users: __props.users,
                          label: ""
                        }, null, 8, ["modelValue", "users"])
                      ]))
                    : (openBlock(), createElementBlock("div", _hoisted_22, " Assignment is locked to your scope. "))
                ]),
                createBaseVNode("section", {
                  class: normalizeClass(["bg-white rounded-sm border border-gray-200 relative", showLeadDropdown.value ? 'z-30' : 'z-10'])
                }, [
                  _cache[43] || (_cache[43] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none rounded-sm overflow-hidden" }, null, -1)),
                  createBaseVNode("div", _hoisted_23, [
                    _cache[40] || (_cache[40] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_24, [
                      createVNode(unref(Link), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[39] || (_cache[39] = createTextVNode(" Associate_with_Leads ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_25, [
                    createBaseVNode("div", _hoisted_26, [
                      _cache[41] || (_cache[41] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Leads", -1)),
                      _cache[42] || (_cache[42] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-400 leading-relaxed" }, " Linked leads become the contacts displayed under this account, regardless of pipeline stage. ", -1)),
                      createBaseVNode("div", _hoisted_27, [
                        createBaseVNode("div", _hoisted_28, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((leadSearchQuery).value = $event)),
                            onInput: searchLeads,
                            onFocus: openLeadDropdown,
                            type: "text",
                            class: "input-base pr-10",
                            placeholder: "Search leads by name or company..."
                          }, null, 544), [
                            [vModelText, leadSearchQuery.value]
                          ]),
                          createVNode(unref(Search), {
                            size: 14,
                            class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          })
                        ]),
                        (showLeadDropdown.value && filteredLeads.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_29, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLeads.value, (lead) => {
                                return (openBlock(), createElementBlock("div", {
                                  key: lead.id,
                                  onClick: $event => (addLead(lead)),
                                  class: "px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                }, [
                                  createBaseVNode("div", _hoisted_31, toDisplayString(lead.name), 1),
                                  createBaseVNode("div", _hoisted_32, toDisplayString(lead.company), 1)
                                ], 8, _hoisted_30))
                              }), 128))
                            ]))
                          : createCommentVNode("", true)
                      ]),
                      (selectedLeads.value.length > 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_33, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(selectedLeads.value, (lead) => {
                              return (openBlock(), createElementBlock("div", {
                                key: lead.id,
                                class: "inline-flex items-center gap-2 px-2 py-1 bg-[#2F2E8B]/5 border border-[#2F2E8B]/10 text-[#2F2E8B] rounded-sm text-[10px] font-mono"
                              }, [
                                createBaseVNode("span", null, toDisplayString(lead.name), 1),
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: $event => (removeLead(lead.id)),
                                  class: "hover:text-red-500"
                                }, [
                                  createVNode(unref(X), { size: 10 })
                                ], 8, _hoisted_34)
                              ]))
                            }), 128))
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ], 2),
                createBaseVNode("section", _hoisted_35, [
                  _cache[51] || (_cache[51] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_36, [
                    _cache[45] || (_cache[45] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_37, [
                      createVNode(unref(MapPin), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[44] || (_cache[44] = createTextVNode(" Billing_Address ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_38, [
                    createBaseVNode("div", _hoisted_39, [
                      _cache[46] || (_cache[46] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Street", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((form.value.billingStreet) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "123 Main Street"
                      }, null, 512), [
                        [vModelText, form.value.billingStreet]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_40, [
                      _cache[47] || (_cache[47] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "City", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((form.value.billingCity) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "New York"
                      }, null, 512), [
                        [vModelText, form.value.billingCity]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_41, [
                      _cache[48] || (_cache[48] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "State/Province", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((form.value.billingState) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "NY"
                      }, null, 512), [
                        [vModelText, form.value.billingState]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_42, [
                      _cache[49] || (_cache[49] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Postal_Code", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((form.value.billingPostalCode) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "10001"
                      }, null, 512), [
                        [vModelText, form.value.billingPostalCode]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_43, [
                      _cache[50] || (_cache[50] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Country", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((form.value.billingCountry) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "United States"
                      }, null, 512), [
                        [vModelText, form.value.billingCountry]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_44, [
                  _cache[60] || (_cache[60] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_45, [
                    createBaseVNode("div", _hoisted_46, [
                      _cache[53] || (_cache[53] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                      createBaseVNode("span", _hoisted_47, [
                        createVNode(unref(Truck), {
                          size: 10,
                          class: "text-[#2F2E8B]"
                        }),
                        _cache[52] || (_cache[52] = createTextVNode(" Shipping_Address ", -1))
                      ])
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: copyBillingToShipping,
                      class: "text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 hover:underline"
                    }, [
                      createVNode(unref(Copy), { size: 10 }),
                      _cache[54] || (_cache[54] = createTextVNode(" Same_as_Billing ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_48, [
                    createBaseVNode("div", _hoisted_49, [
                      _cache[55] || (_cache[55] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Street", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((form.value.shippingStreet) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "123 Main Street"
                      }, null, 512), [
                        [vModelText, form.value.shippingStreet]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_50, [
                      _cache[56] || (_cache[56] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "City", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((form.value.shippingCity) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "New York"
                      }, null, 512), [
                        [vModelText, form.value.shippingCity]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_51, [
                      _cache[57] || (_cache[57] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "State/Province", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((form.value.shippingState) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "NY"
                      }, null, 512), [
                        [vModelText, form.value.shippingState]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_52, [
                      _cache[58] || (_cache[58] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Postal_Code", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((form.value.shippingPostalCode) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "10001"
                      }, null, 512), [
                        [vModelText, form.value.shippingPostalCode]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_53, [
                      _cache[59] || (_cache[59] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Country", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((form.value.shippingCountry) = $event)),
                        type: "text",
                        class: "input-base",
                        placeholder: "United States"
                      }, null, 512), [
                        [vModelText, form.value.shippingCountry]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_54, [
                  _cache[66] || (_cache[66] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_55, [
                    _cache[62] || (_cache[62] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_56, [
                      createVNode(unref(Share2), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[61] || (_cache[61] = createTextVNode(" Social_Media ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_57, [
                    createBaseVNode("div", _hoisted_58, [
                      createBaseVNode("label", _hoisted_59, [
                        createVNode(unref(Linkedin), {
                          size: 10,
                          class: "text-blue-600"
                        }),
                        _cache[63] || (_cache[63] = createTextVNode(" LinkedIn ", -1))
                      ]),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((form.value.linkedin) = $event)),
                        type: "url",
                        class: "input-base",
                        placeholder: "https://linkedin.com/company/..."
                      }, null, 512), [
                        [vModelText, form.value.linkedin]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_60, [
                      createBaseVNode("label", _hoisted_61, [
                        createVNode(unref(Twitter), {
                          size: 10,
                          class: "text-sky-500"
                        }),
                        _cache[64] || (_cache[64] = createTextVNode(" Twitter ", -1))
                      ]),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((form.value.twitter) = $event)),
                        type: "url",
                        class: "input-base",
                        placeholder: "https://twitter.com/..."
                      }, null, 512), [
                        [vModelText, form.value.twitter]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_62, [
                      createBaseVNode("label", _hoisted_63, [
                        createVNode(unref(Facebook), {
                          size: 10,
                          class: "text-blue-700"
                        }),
                        _cache[65] || (_cache[65] = createTextVNode(" Facebook ", -1))
                      ]),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((form.value.facebook) = $event)),
                        type: "url",
                        class: "input-base",
                        placeholder: "https://facebook.com/..."
                      }, null, 512), [
                        [vModelText, form.value.facebook]
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_64, [
                  _cache[69] || (_cache[69] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_65, [
                    _cache[68] || (_cache[68] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                    createBaseVNode("span", _hoisted_66, [
                      createVNode(unref(AlignLeft), {
                        size: 10,
                        class: "text-[#2F2E8B]"
                      }),
                      _cache[67] || (_cache[67] = createTextVNode(" Description ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_67, [
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => ((form.value.description) = $event)),
                      rows: "4",
                      class: "input-base",
                      placeholder: "Additional notes about this account..."
                    }, null, 512), [
                      [vModelText, form.value.description]
                    ])
                  ])
                ]),
                (form.value.id)
                  ? (openBlock(), createElementBlock("section", _hoisted_68, [
                      _cache[72] || (_cache[72] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                      createBaseVNode("div", _hoisted_69, [
                        _cache[71] || (_cache[71] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                        createBaseVNode("span", _hoisted_70, [
                          createVNode(unref(FileText), {
                            size: 10,
                            class: "text-[#2F2E8B]"
                          }),
                          _cache[70] || (_cache[70] = createTextVNode(" Documents ", -1))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_71, [
                        createVNode(LinkedDocumentsWidget, {
                          recordType: "account",
                          recordId: form.value.id,
                          recordName: form.value.name
                        }, null, 8, ["recordId", "recordName"])
                      ])
                    ]))
                  : createCommentVNode("", true)
              ], 32)
            ]),
            createBaseVNode("div", _hoisted_72, [
              createBaseVNode("div", _hoisted_73, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: close,
                  class: "px-5 py-2 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2"
                }, [
                  createVNode(unref(X), { size: 12 }),
                  _cache[73] || (_cache[73] = createTextVNode(" Cancel ", -1))
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
                  createTextVNode(" " + toDisplayString(saving.value ? 'Saving…' : (isEditMode.value ? 'Update_Account' : 'Create_Account')), 1)
                ], 8, _hoisted_74)
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const AccountFormModal = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-4eea2be1"]]);

export { AccountDetailModal as A, AccountFormModal as a };
