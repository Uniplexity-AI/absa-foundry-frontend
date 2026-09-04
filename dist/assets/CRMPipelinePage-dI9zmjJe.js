import { g as _export_sfc, r as ref, D as computed, h as onMounted, R as nextTick, a0 as reactive, O as watch, o as openBlock, c as createElementBlock, b as createBaseVNode, y as unref, v as withDirectives, S as vModelSelect, aa as isRef, F as Fragment, e as renderList, l as createCommentVNode, m as createTextVNode, t as toDisplayString, q as createVNode, w as withCtx, j as normalizeClass, a as createStaticVNode, s as withModifiers, a2 as vModelCheckbox, x as vModelText, n as normalizeStyle, z as createBlock, a5 as X, H as withKeys, L as LoaderCircle, W as Teleport, A as resolveComponent, a9 as FileText, Z as __vitePreload } from './index-DySaQUSt.js';
import { u as useCRMModule, m as createLeadNote, l as logLeadActivity } from './CRMModule-xMpz4Yw2.js';
import { C as CloudUpload, a as Save } from './LinkedDocumentsWidget-COaSfgVd.js';
import { C as ChevronUp, L as LeadDetailModal, a as LeadConversionModal } from './LeadConversionModal-B4VmEOk6.js';
import { A as AccountDetailModal, a as AccountFormModal } from './AccountFormModal-BHOXa64q.js';
import { M as MapPin } from './map-pin-ezx-ZUtP.js';
import { C as ChevronDown } from './chevron-down-CN8nxYKW.js';
import { P as Plus } from './plus-PZKagvva.js';
import './useCurrency-CHX9df4b.js';
import './FileSaver.min-CLGdtH5R.js';
import './search-BCZjld4F.js';
import './check-BNnDhMGQ.js';
import './trash-2-7L892nmL.js';
import './file-spreadsheet-BsxBq43u.js';
import './phone-Brc4TK7e.js';
import './mail-BIKtqgC9.js';
import './refresh-cw-B6kbjdXb.js';
import './info-C_WbPxxb.js';
import './users-D2_CXga8.js';
import './calendar-check-0Q8bdUuk.js';
import './user-plus-BzFv7PFZ.js';
import './circle-check-Dw-IhVxQ.js';
import './video-Dg2THkbG.js';
import './clock-CTnpcbmp.js';
import './navigation-tv4gO24t.js';
import './triangle-alert-DJBQZG9S.js';
import './paperclip-B-f3rnV6.js';
import './user-BFb_MIGD.js';
import './building-2-BxeHQ9Yf.js';
import './arrow-right-CUwzi1e8.js';
import './target-Dw9xQcbm.js';
import './trending-up-B3Xg9oGM.js';
import './chevron-right-CXnPJew3.js';
import './UserSearchSelect-BdFFPNVW.js';
import './user-check-Ddl0JNxz.js';

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-none" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-4" };
const _hoisted_6 = { class: "hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-none" };
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider border-l border-gray-200 pl-4" };
const _hoisted_9 = { class: "bg-white border-b border-gray-100 sticky top-16 z-[99]" };
const _hoisted_10 = { class: "px-4 sm:px-6 lg:px-8" };
const _hoisted_11 = { class: "flex items-center gap-0" };
const _hoisted_12 = { class: "flex-1 w-full relative z-10 pb-40" };
const _hoisted_13 = {
  id: "module-pipeline",
  class: "space-y-6 relative p-4 sm:p-6 lg:p-8"
};
const _hoisted_14 = {
  key: 0,
  class: "space-y-4 w-full animate-pulse"
};
const _hoisted_15 = { class: "flex gap-3 overflow-hidden" };
const _hoisted_16 = { class: "flex gap-3 overflow-hidden" };
const _hoisted_17 = {
  key: 1,
  class: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-6"
};
const _hoisted_18 = { class: "flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto" };
const _hoisted_19 = { class: "flex items-center gap-4" };
const _hoisted_20 = {
  key: 0,
  class: "absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-[99999] min-w-[200px] rounded-sm py-1"
};
const _hoisted_21 = { class: "flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer" };
const _hoisted_22 = { class: "max-h-40 overflow-y-auto" };
const _hoisted_23 = ["checked", "onChange"];
const _hoisted_24 = { class: "text-[9px] font-mono font-bold text-gray-700 uppercase tracking-widest" };
const _hoisted_25 = { class: "text-[7px] font-mono text-gray-400 uppercase ml-auto" };
const _hoisted_26 = { class: "relative w-full sm:w-64" };
const _hoisted_27 = { class: "relative flex items-center" };
const _hoisted_28 = ["value"];
const _hoisted_29 = {
  key: 2,
  class: "relative"
};
const _hoisted_30 = ["data-stage-id", "onDrop", "onDragenter", "onDragleave"];
const _hoisted_31 = { class: "relative z-10 flex justify-between items-start" };
const _hoisted_32 = { class: "flex items-center gap-1.5" };
const _hoisted_33 = ["onKeyup", "onBlur"];
const _hoisted_34 = { class: "font-black text-[10px] text-gray-900 uppercase tracking-widest font-mono" };
const _hoisted_35 = ["onClick"];
const _hoisted_36 = {
  key: 2,
  class: "px-1 py-0.5 bg-green-100 text-green-700 text-[7px] font-mono font-black uppercase tracking-widest border border-green-200",
  title: "Leads dropped here auto-convert to Accounts"
};
const _hoisted_37 = { class: "flex items-center gap-1.5 mt-0.5" };
const _hoisted_38 = { class: "bg-[#2F2E8B] text-white px-1.5 py-0.5 text-[8px] font-mono font-bold" };
const _hoisted_39 = {
  key: 0,
  class: "text-[8px] font-mono font-bold text-gray-700"
};
const _hoisted_40 = { class: "flex items-center gap-1" };
const _hoisted_41 = ["onClick", "disabled"];
const _hoisted_42 = ["onClick", "disabled"];
const _hoisted_43 = ["onClick", "title"];
const _hoisted_44 = ["onClick", "title"];
const _hoisted_45 = ["onClick"];
const _hoisted_46 = ["onDragstart", "onClick"];
const _hoisted_47 = { class: "mb-1 flex items-center gap-1 flex-wrap" };
const _hoisted_48 = { class: "text-[7px] font-mono font-black uppercase tracking-widest px-1 py-0.5 bg-gray-50 text-gray-700 border border-gray-100" };
const _hoisted_49 = {
  key: 0,
  class: "text-[7px] font-mono font-black uppercase tracking-widest px-1 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-0.5"
};
const _hoisted_50 = { class: "flex items-start justify-between mb-1" };
const _hoisted_51 = { class: "flex-1 min-w-0" };
const _hoisted_52 = { class: "font-bold text-[10px] text-gray-900 truncate uppercase tracking-tight" };
const _hoisted_53 = { class: "text-[8px] font-bold text-gray-700 font-mono truncate uppercase" };
const _hoisted_54 = { class: "pt-1 border-t border-gray-50 flex flex-wrap justify-between items-center gap-1" };
const _hoisted_55 = {
  key: 0,
  class: "text-[10px] font-black text-[#2F2E8B] font-mono"
};
const _hoisted_56 = {
  key: 1,
  class: "text-[8px] font-bold text-gray-500 font-mono"
};
const _hoisted_57 = { class: "flex items-center gap-1" };
const _hoisted_58 = ["onClick"];
const _hoisted_59 = ["onClick"];
const _hoisted_60 = ["onClick", "title"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = {
  key: 0,
  class: "flex flex-col items-center justify-center py-8 opacity-40"
};
const _hoisted_63 = {
  key: 3,
  class: "space-y-4"
};
const _hoisted_64 = { class: "px-4 py-3 border-b border-gray-200 bg-gray-50/50" };
const _hoisted_65 = { class: "flex items-center justify-between" };
const _hoisted_66 = { class: "flex items-center gap-2" };
const _hoisted_67 = { class: "font-black text-sm text-gray-900 uppercase font-outfit" };
const _hoisted_68 = { class: "flex items-center gap-3" };
const _hoisted_69 = { class: "text-xs font-mono font-bold text-gray-500" };
const _hoisted_70 = {
  key: 0,
  class: "text-xs font-mono font-black text-[#2F2E8B]"
};
const _hoisted_71 = { class: "p-3 space-y-2" };
const _hoisted_72 = {
  key: 0,
  class: "text-center py-6 text-gray-400 text-sm"
};
const _hoisted_73 = ["onClick"];
const _hoisted_74 = { class: "flex items-start justify-between mb-2" };
const _hoisted_75 = { class: "flex-1 min-w-0" };
const _hoisted_76 = { class: "font-bold text-xs text-gray-900 truncate uppercase" };
const _hoisted_77 = { class: "text-[10px] text-gray-500 truncate font-mono" };
const _hoisted_78 = {
  key: 0,
  class: "inline-flex items-center gap-1 mt-1 text-[8px] font-mono font-black uppercase tracking-widest px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-200"
};
const _hoisted_79 = { class: "flex items-center gap-1 ml-2" };
const _hoisted_80 = ["onClick"];
const _hoisted_81 = ["onClick"];
const _hoisted_82 = ["onClick", "title"];
const _hoisted_83 = ["onClick"];
const _hoisted_84 = {
  key: 0,
  class: "text-sm font-black text-[#2F2E8B] font-mono mb-2"
};
const _hoisted_85 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-black/40"
};
const _hoisted_86 = { class: "bg-white shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200" };
const _hoisted_87 = { class: "flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/20 bg-[#2F2E8B] sticky top-0 z-10" };
const _hoisted_88 = { class: "flex items-center gap-2 sm:gap-3" };
const _hoisted_89 = { class: "text-[8px] sm:text-[10px] font-mono font-black text-blue-200 uppercase tracking-[0.2em] mb-0.5" };
const _hoisted_90 = { class: "text-base sm:text-xl font-black text-white uppercase tracking-tight" };
const _hoisted_91 = { class: "flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative" };
const _hoisted_92 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_93 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" };
const _hoisted_94 = { class: "flex flex-col sm:flex-row gap-2" };
const _hoisted_95 = { class: "relative flex-1" };
const _hoisted_96 = { class: "flex gap-1.5 shrink-0" };
const _hoisted_97 = ["disabled"];
const _hoisted_98 = ["disabled"];
const _hoisted_99 = {
  key: 0,
  class: "max-h-28 overflow-y-auto border border-gray-100 bg-gray-50"
};
const _hoisted_100 = ["onClick"];
const _hoisted_101 = { class: "flex items-center gap-3" };
const _hoisted_102 = {
  key: 0,
  class: "text-xs text-green-600 font-medium flex items-center gap-2"
};
const _hoisted_103 = ["src"];
const _hoisted_104 = { class: "text-center pt-1" };
const _hoisted_105 = { key: 1 };
const _hoisted_106 = {
  key: 0,
  class: "flex justify-end mb-2"
};
const _hoisted_107 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_108 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_109 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_110 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_111 = { class: "lg:col-span-3 space-y-2" };
const _hoisted_112 = { class: "lg:col-span-3 space-y-2" };
const _hoisted_113 = { class: "lg:col-span-3 space-y-2" };
const _hoisted_114 = { class: "lg:col-span-3 space-y-2" };
const _hoisted_115 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_116 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_117 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_118 = ["value"];
const _hoisted_119 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_120 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_121 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_122 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_123 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_124 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_125 = { class: "lg:col-span-6 space-y-2" };
const _hoisted_126 = {
  key: 0,
  class: "px-3 py-2 bg-gray-50 border border-dashed border-gray-200 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest"
};
const _hoisted_127 = {
  key: 1,
  class: "relative"
};
const _hoisted_128 = {
  key: 0,
  class: "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl z-[100001] max-h-60 overflow-y-auto"
};
const _hoisted_129 = ["onClick"];
const _hoisted_130 = { class: "w-6 h-6 bg-gray-200 flex items-center justify-center text-[10px] font-bold font-mono" };
const _hoisted_131 = { class: "flex-1 min-w-0" };
const _hoisted_132 = { class: "text-[10px] font-bold font-mono uppercase text-gray-900 truncate" };
const _hoisted_133 = { class: "text-[9px] font-mono text-gray-400 uppercase tracking-wider" };
const _hoisted_134 = {
  key: 1,
  class: "mt-2 flex items-center gap-2"
};
const _hoisted_135 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] uppercase" };
const _hoisted_136 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_137 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_138 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_139 = { class: "lg:col-span-4 space-y-2" };
const _hoisted_140 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_141 = { class: "lg:col-span-12" };
const _hoisted_142 = { class: "flex items-center justify-between mb-2" };
const _hoisted_143 = { class: "flex items-center gap-2" };
const _hoisted_144 = { class: "text-[9px] font-mono font-black text-[#2F2E8B]" };
const _hoisted_145 = { class: "px-3 py-1 bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition flex items-center gap-2 cursor-pointer" };
const _hoisted_146 = { class: "px-3 py-1 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-2 cursor-pointer" };
const _hoisted_147 = {
  key: 0,
  class: "text-center py-8 bg-gray-50/50 border border-dashed border-gray-200"
};
const _hoisted_148 = {
  key: 1,
  class: "space-y-1.5"
};
const _hoisted_149 = { class: "flex items-center gap-2 flex-1 min-w-0" };
const _hoisted_150 = { class: "text-[10px] font-mono font-black text-gray-900 uppercase truncate" };
const _hoisted_151 = ["onClick"];
const _hoisted_152 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" };
const _hoisted_153 = { class: "lg:col-span-12" };
const _hoisted_154 = { class: "px-4 sm:px-8 py-4 sm:py-5 border-t border-gray-100 bg-gray-50/50 flex flex-wrap justify-end items-center gap-2 sm:gap-3 sticky bottom-0 z-10 backdrop-blur-md" };
const _hoisted_155 = ["disabled"];
const _hoisted_156 = { class: "bg-white shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col animate-modal-in rounded-lg border border-[#2F2E8B]/20" };
const _hoisted_157 = { class: "bg-[#2F2E8B] px-4 py-2.5 flex items-center justify-between" };
const _hoisted_158 = { class: "flex items-center gap-2.5" };
const _hoisted_159 = { class: "text-[12px] font-black text-white uppercase tracking-tight" };
const _hoisted_160 = { class: "text-[8px] font-mono text-blue-300 uppercase tracking-wider leading-none" };
const _hoisted_161 = { class: "p-3.5 space-y-3" };
const _hoisted_162 = { class: "bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-3 flex items-center justify-between gap-3 rounded" };
const _hoisted_163 = { class: "text-[13px] font-black text-gray-900 font-mono mt-0.5 break-all" };
const _hoisted_164 = ["href"];
const _hoisted_165 = { class: "space-y-1 max-h-36 overflow-y-auto custom-scrollbar pr-1" };
const _hoisted_166 = ["onUpdate:modelValue"];
const _hoisted_167 = { class: "flex gap-1.5 mt-1.5" };
const _hoisted_168 = { class: "grid grid-cols-2 gap-2.5" };
const _hoisted_169 = {
  key: 0,
  class: "text-[10px] font-mono text-red-600 bg-red-50 border border-red-200 p-2 rounded"
};
const _hoisted_170 = { class: "flex items-center justify-end gap-2 px-3.5 py-2.5 border-t border-gray-100 bg-gray-50/50" };
const _hoisted_171 = ["disabled"];
const _hoisted_172 = { class: "bg-white rounded-none shadow-2xl w-full max-w-md border border-gray-100 flex flex-col overflow-hidden animate-modal-in" };
const _hoisted_173 = { class: "flex items-center justify-between p-6 border-b border-gray-100 relative overflow-hidden" };
const _hoisted_174 = { class: "space-y-2" };
const _hoisted_175 = { class: "space-y-2" };
const _hoisted_176 = ["value"];
const _hoisted_177 = { class: "flex justify-end gap-3 pt-4 border-t border-gray-50 mt-4" };
const _hoisted_178 = { class: "bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden" };
const _hoisted_179 = { class: "p-5" };
const _hoisted_180 = { class: "text-xs font-mono text-gray-600 uppercase tracking-wide leading-relaxed" };
const _hoisted_181 = { class: "flex items-center gap-2 mt-5" };


const _sfc_main = {
  __name: 'CRMPipelinePage',
  setup(__props) {

const {
  branches, selectedBranch, onBranchChange, getUserEmail, formatCurrency, activeTab, moduleLoading, pipelineMobileView, pipelineSearchQuery, pipelineAssignedFilter, accountConversionStages,
  allPipelineStages, kpiLeadsByStage, kpiStageValue, getVisibleLeadsByStage, getRecordTitle, getRecordSubtitle,
  getRecordValue, viewRecord,
  showAddStageModal, newStageForm, openAddStageModal, closeAddStageModal, addCustomStage, removeCustomStage,
  customPipelineStages, getTenantId,
  draggingLead, dragOverStage, dragState, onDragStart, onDragEnd, onDrop, onDragEnter, onDragLeave,
  fetchPipelineData, tenantUsers,
  showLeadModal, leadModalTitle, leadForm, closeLeadModal, submitLead, isSubmitting,
  showAccountFormModal, editingAccount,
  assignToSearch, showAssignToDropdown, filteredAssignToUsers, selectAssignTo, canAssignCrm,
  getUserInitials, locationSearchQuery, searchLocation, isSearchingLocation, locationSearchResults,
  selectSearchResult, roundLocationCoordinates, editLead,
  deleteLead, getStageName,
  useCurrentLocation, isLocatingDevice, initLeadMap,
  pendingLeadDocuments, addPendingLeadDocument, removePendingLeadDocument,
  visiblePipelineStages, hiddenStageIds, showStageAmounts,
  handleLeadConverted, showConversionModal, selectedLeadForConversion, pipelineConfirm
} = useCRMModule();

const showPipelineSettings = ref(false);
const showExpandedLeadForm = ref(false);

// Camera capture for quick-add
const cameraInputRef = ref(null);
const capturedPhotoPreview = ref(null);

function triggerCameraCapture() {
  cameraInputRef.value?.click();
}

function clearCapturedPhoto() {
  capturedPhotoPreview.value = null;
}

// Only show stages that have records, except 'new' and custom stages which are always shown
const activePipelineStages = computed(() =>
  visiblePipelineStages.value.filter(stage =>
    stage.id === 'new' || stage.isCustom || kpiLeadsByStage(stage.id).length > 0
  )
);

function toggleStageVisibility(stageId) {
  const idx = hiddenStageIds.value.indexOf(stageId);
  if (idx > -1) hiddenStageIds.value.splice(idx, 1);
  else hiddenStageIds.value.push(stageId);
}

// ── Stage Rename ──
const editingStageId = ref(null);
const editingStageName = ref('');
const stageRenameInput = ref(null);

function startStageRename(stage) {
  editingStageId.value = stage.id;
  editingStageName.value = stage.name;
  nextTick(() => {
    if (stageRenameInput.value) stageRenameInput.value.focus();
  });
}

function saveStageRename(stage) {
  const newName = editingStageName.value?.trim();
  if (!newName || newName === stage.name) { editingStageId.value = null; return; }
  // Check if it's a custom stage
  const idx = customPipelineStages.value.findIndex(s => s.id === stage.id);
  if (idx > -1) {
    customPipelineStages.value[idx].name = newName;
  } else {
    // Default stage — save as override in customPipelineStages
    customPipelineStages.value.push({ ...stage, name: newName, isCustom: true });
  }
  __vitePreload(() => import('./CRMModule-xMpz4Yw2.js').then(n => n.aa),true              ?[]:void 0).then(crmApi => {
    crmApi.updateCRMMetadata({ tenant_id: getTenantId(), pipeline_stages: customPipelineStages.value }).catch(() => {});
  });
  editingStageId.value = null;
}

// ── Stage Reposition ──
function isFirstVisibleStage(stage) {
  const vis = activePipelineStages.value;
  return vis.length < 2 || vis[0].id === stage.id;
}

function isLastVisibleStage(stage) {
  const vis = activePipelineStages.value;
  return vis.length < 2 || vis[vis.length - 1].id === stage.id;
}

function moveStage(stage, direction) {
  // Work with the full combined list for reorder
  const allStages = [...allPipelineStages.value];
  const fromIdx = allStages.findIndex(s => s.id === stage.id);
  if (fromIdx < 0) return;
  const toIdx = fromIdx + direction;
  if (toIdx < 0 || toIdx >= allStages.length) return;

  const targetStage = allStages[toIdx];
  // Swap order values
  const temp = stage.order;
  stage.order = targetStage.order;
  targetStage.order = temp;

  // Ensure both stages are in customPipelineStages for persistence
  [stage, targetStage].forEach(s => {
    if (!customPipelineStages.value.find(cs => cs.id === s.id)) {
      customPipelineStages.value.push({ ...s, isCustom: true });
    }
  });

  __vitePreload(() => import('./CRMModule-xMpz4Yw2.js').then(n => n.aa),true              ?[]:void 0).then(crmApi => {
    crmApi.updateCRMMetadata({ tenant_id: getTenantId(), pipeline_stages: customPipelineStages.value }).catch(() => {});
  });
}

function closePipelineSettings() {
  showPipelineSettings.value = false;
}

onMounted(() => {
  document.addEventListener('click', closePipelineSettings);
  // Sync top scrollbar width after render
  nextTick(() => {
    if (kanbanTopScrollRef.value && kanbanInnerRef.value) {
      kanbanTopScrollRef.value.scrollLeft = 0;
    }
  });
});

function onPendingDocsFileSelect(event) {
  const files = Array.from(event.target.files || []);
  files.forEach(file => addPendingLeadDocument(file, { name: file.name, category: 'other' }));
  event.target.value = '';
}

function onCameraCapture(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  addPendingLeadDocument(file, { name: 'CAMERA_' + Date.now(), category: 'photo' });
  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => { capturedPhotoPreview.value = e.target.result; };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function openAddForStage(stage) {
  if (stage.id === 'closed-won') {
    editingAccount.value = null;
    showAccountFormModal.value = true;
  } else {
    leadForm.value = { stage: stage.name, name: '', phone: '', email: '', company: '', notes: '', location: { lat: null, lng: null }, priority: '', source: '' };
    showExpandedLeadForm.value = false;
    leadModalTitle.value = `Add Lead // ${stage.name}`;
    showLeadModal.value = true;
    nextTick(() => { initLeadMap(); });
  }
}

async function deletePipelineRecord(record, entityType) {
  if (entityType === 'leads') {
    await deleteLead(record);
    fetchPipelineData();
  }
}

// ===== Lead Profile Modal =====
const selectedLeadForProfile = ref(null);
const showLeadProfileModal = ref(false);
function openLeadProfile(record) {
  selectedLeadForProfile.value = record;
  showLeadProfileModal.value = true;
}

// ===== Account Profile Modal (Closed Won column) =====
const selectedAccountForProfile = ref(null);
const showAccountProfileModal = ref(false);
function openAccountProfile(record) {
  selectedAccountForProfile.value = record;
  showAccountProfileModal.value = true;
}

// Horizontal scroll for kanban board
const kanbanScrollRef = ref(null);
const kanbanInnerRef = ref(null);
const kanbanTopScrollRef = ref(null);

// Use the same minWidth calculation as the grid for the top scrollbar spacer
const kanbanInnerWidth = computed(() => {
  const count = activePipelineStages.length;
  if (count <= 4) return 0; // no overflow when 4 or fewer columns
  // Match grid minWidth: count * 14rem, converted to px (1rem = 16px base)
  return count * 14 * 16;
});

function onKanbanScroll() {
  if (kanbanTopScrollRef.value) {
    kanbanTopScrollRef.value.scrollLeft = kanbanScrollRef.value?.scrollLeft || 0;
  }
}

function onTopScroll() {
  if (kanbanScrollRef.value) {
    kanbanScrollRef.value.scrollLeft = kanbanTopScrollRef.value?.scrollLeft || 0;
  }
}

function scrollKanban(direction) {
  const container = kanbanScrollRef.value;
  if (!container) return;
  const scrollAmount = container.clientWidth * 0.6;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  // Sync the top scrollbar
  if (kanbanTopScrollRef.value) {
    kanbanTopScrollRef.value.scrollLeft = container.scrollLeft;
  }
}


// ===== Call Modal State =====
const DEFAULT_TALKING_POINTS = [
  'Confirm decision-maker & best time to talk',
  'Recap previous interaction / context',
  'Identify pain points & current situation',
  'Pitch tailored value proposition',
  'Discuss budget, timeline, authority',
  'Address objections',
  'Confirm next step (demo / proposal / follow-up date)'
];

const showCallModal = ref(false);
const callContext = reactive({ id: '', name: '', phone: '', company: '', subtitle: '', entity: 'leads' });
const talkingPoints = ref([]);
const newTalkingPoint = ref('');
const callOutcome = ref('connected');
const callDurationMin = ref(0);
const callNote = ref('');
const callError = ref('');
const savingCall = ref(false);

function openCallModal(record, entity) {
  callContext.id = record.id;
  callContext.name = getRecordTitle(record, entity);
  callContext.phone = record.phone || '';
  callContext.company = record.company || '';
  callContext.subtitle = getRecordSubtitle(record, entity);
  callContext.entity = entity;
  talkingPoints.value = DEFAULT_TALKING_POINTS.map(t => ({ text: t, done: false }));
  newTalkingPoint.value = '';
  callOutcome.value = 'connected';
  callDurationMin.value = 0;
  callNote.value = '';
  callError.value = '';
  savingCall.value = false;
  showCallModal.value = true;
}

function closeCallModal() { showCallModal.value = false; }

function resetTalkingPoints() {
  talkingPoints.value.forEach(p => { p.done = false; });
}

function addTalkingPoint() {
  const t = (newTalkingPoint.value || '').trim();
  if (!t) return;
  talkingPoints.value.push({ text: t, done: false });
  newTalkingPoint.value = '';
}

function _getTenantId() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.tenant_id || '';
  } catch { return ''; }
}

async function saveCallNote() {
  if (callContext.entity !== 'leads') {
    callError.value = 'Notes from pipeline call modal currently support leads only.';
    return;
  }
  const note = (callNote.value || '').trim();
  if (!note) { callError.value = 'Please add a note before saving.'; return; }
  const tenantId = _getTenantId();
  if (!tenantId || !callContext.id) { callError.value = 'Missing tenant or lead context.'; return; }
  savingCall.value = true; callError.value = '';
  try {
    const completed = talkingPoints.value.filter(p => p.done).map(p => `\u2022 ${p.text}`).join('\n');
    const composed = [
      `[CALL // ${callOutcome.value.toUpperCase()}${callDurationMin.value ? ` // ${callDurationMin.value} MIN` : ''}]`,
      note,
      completed ? `\nCovered:\n${completed}` : ''
    ].filter(Boolean).join('\n');
    await createLeadNote(callContext.id, tenantId, { note: composed });
    try {
      await logLeadActivity(callContext.id, {
        tenant_id: tenantId,
        action: 'Phone Call',
        notes: `${callOutcome.value} \u2014 ${note.substring(0, 200)}`,
        timestamp: new Date().toISOString()
      });
    } catch (e) { /* non-blocking */ }
    closeCallModal();
  } catch (err) {
    console.error('Failed to save call note', err);
    callError.value = err?.message || 'Failed to save note. Please try again.';
  } finally {
    savingCall.value = false;
  }
}

onMounted(() => {
  activeTab.value = 'pipeline';
  fetchPipelineData();
});
const addStageInputRef = ref(null);
watch(showAddStageModal, async (newVal) => {
  if (newVal) {
    await nextTick();
    if (addStageInputRef.value) addStageInputRef.value.focus();
  }
});

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _cache[186] || (_cache[186] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
      createBaseVNode("header", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.$router.push('/dashboard/crm'))),
              class: "text-gray-500 hover:text-[#2F2E8B] transition p-2"
            }, [...(_cache[80] || (_cache[80] = [
              createBaseVNode("i", { class: "fas fa-arrow-left" }, null, -1)
            ]))]),
            _cache[81] || (_cache[81] = createBaseVNode("div", { class: "w-2 h-8 bg-[#2F2E8B] rounded-none" }, null, -1)),
            _cache[82] || (_cache[82] = createBaseVNode("div", null, [
              createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "CRM // Pipeline"),
              createBaseVNode("h1", { class: "text-xl font-black text-gray-900 uppercase tracking-tight font-outfit" }, "Events Pipeline")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              _cache[84] || (_cache[84] = createBaseVNode("i", { class: "fas fa-store text-[10px] text-gray-400" }, null, -1)),
              (unref(branches).length > 0)
                ? withDirectives((openBlock(), createElementBlock("select", {
                    key: 0,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(selectedBranch) ? (selectedBranch).value = $event : null)),
                    onChange: _cache[2] || (_cache[2] = (...args) => (unref(onBranchChange) && unref(onBranchChange)(...args))),
                    class: "text-[10px] font-bold font-mono uppercase bg-transparent border-none focus:ring-0 cursor-pointer p-0"
                  }, [
                    _cache[83] || (_cache[83] = createBaseVNode("option", { value: "" }, "ALL DIVISIONS", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(branches), (branch) => {
                      return (openBlock(), createElementBlock("option", {
                        key: branch._id,
                        value: branch._id
                      }, toDisplayString(branch.name.toUpperCase()), 9, _hoisted_7))
                    }), 128))
                  ], 544)), [
                    [vModelSelect, unref(selectedBranch)]
                  ])
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_8, [
              _cache[85] || (_cache[85] = createBaseVNode("i", { class: "fas fa-user-circle" }, null, -1)),
              createTextVNode(" " + toDisplayString(unref(getUserEmail)()?.split('@')[0] || 'OPERATOR'), 1)
            ])
          ])
        ])
      ]),
      createBaseVNode("nav", _hoisted_9, [
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            createVNode(_component_router_link, {
              to: "/dashboard/crm/leads",
              class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/leads' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
            }, {
              default: withCtx(() => [...(_cache[86] || (_cache[86] = [
                createBaseVNode("i", { class: "fas fa-user-plus text-[10px]" }, null, -1),
                createTextVNode(" Leads ", -1)
              ]))]),
              _: 1
            }, 8, ["class"]),
            createVNode(_component_router_link, {
              to: "/dashboard/crm/pipeline",
              class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/pipeline' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
            }, {
              default: withCtx(() => [...(_cache[87] || (_cache[87] = [
                createBaseVNode("i", { class: "fas fa-project-diagram text-[10px]" }, null, -1),
                createTextVNode(" Events Pipeline ", -1)
              ]))]),
              _: 1
            }, 8, ["class"]),
            createVNode(_component_router_link, {
              to: "/dashboard/crm/accounts",
              class: normalizeClass(["flex items-center gap-2 px-5 py-3 text-[10px] font-mono font-black uppercase tracking-widest border-b-2 transition-colors", _ctx.$route.path === '/dashboard/crm/accounts' ? 'border-[#2F2E8B] text-[#2F2E8B]' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'])
            }, {
              default: withCtx(() => [...(_cache[88] || (_cache[88] = [
                createBaseVNode("i", { class: "fas fa-building text-[10px]" }, null, -1),
                createTextVNode(" Accounts ", -1)
              ]))]),
              _: 1
            }, 8, ["class"])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_12, [
        createBaseVNode("div", _hoisted_13, [
          (unref(moduleLoading))
            ? (openBlock(), createElementBlock("div", _hoisted_14, [
                _cache[90] || (_cache[90] = createStaticVNode("<div class=\"flex items-center justify-between pb-6 border-b border-gray-100\" data-v-a5227688><div class=\"flex gap-4 items-center\" data-v-a5227688><div class=\"h-10 w-32 bg-gray-200 rounded-sm\" data-v-a5227688></div><div class=\"h-8 w-24 bg-gray-100 rounded-sm\" data-v-a5227688></div><div class=\"h-8 w-24 bg-gray-100 rounded-sm\" data-v-a5227688></div></div><div class=\"flex gap-3\" data-v-a5227688><div class=\"h-8 w-56 bg-gray-200 rounded-sm\" data-v-a5227688></div><div class=\"h-8 w-36 bg-gray-100 rounded-sm\" data-v-a5227688></div></div></div>", 1)),
                createBaseVNode("div", _hoisted_15, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(7, (i) => {
                    return createBaseVNode("div", {
                      key: i,
                      class: "h-28 w-44 bg-gray-100 rounded-sm shrink-0"
                    })
                  }), 64))
                ]),
                createBaseVNode("div", _hoisted_16, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(4, (col) => {
                    return createBaseVNode("div", {
                      key: col,
                      class: "w-60 space-y-2 shrink-0"
                    }, [
                      _cache[89] || (_cache[89] = createBaseVNode("div", { class: "h-16 w-full bg-gray-200 rounded-sm" }, null, -1)),
                      (openBlock(), createElementBlock(Fragment, null, renderList(3, (card) => {
                        return createBaseVNode("div", {
                          key: card,
                          class: "h-24 w-full bg-gray-100 rounded-sm"
                        })
                      }), 64))
                    ])
                  }), 64))
                ])
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_17, [
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = (...args) => (unref(openAddStageModal) && unref(openAddStageModal)(...args))),
                      class: "px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#2F2E8B] transition flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest",
                      title: "Add Custom Stage"
                    }, [...(_cache[91] || (_cache[91] = [
                      createBaseVNode("i", { class: "fas fa-plus" }, null, -1),
                      createBaseVNode("span", { class: "hidden sm:inline" }, "Add Stage", -1)
                    ]))]),
                    createBaseVNode("div", {
                      class: "relative",
                      onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
                    }, [
                      createBaseVNode("button", {
                        onClick: _cache[4] || (_cache[4] = $event => (showPipelineSettings.value = !showPipelineSettings.value)),
                        class: "px-3 py-2 border border-gray-200 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-widest transition flex items-center gap-1.5",
                        title: "Pipeline Settings"
                      }, [...(_cache[92] || (_cache[92] = [
                        createBaseVNode("i", { class: "fas fa-sliders-h" }, null, -1),
                        createBaseVNode("span", { class: "hidden sm:inline" }, "Settings", -1)
                      ]))]),
                      (showPipelineSettings.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_20, [
                            createBaseVNode("label", _hoisted_21, [
                              withDirectives(createBaseVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => (isRef(showStageAmounts) ? (showStageAmounts).value = $event : null)),
                                class: "accent-[#2F2E8B] w-3 h-3"
                              }, null, 512), [
                                [vModelCheckbox, unref(showStageAmounts)]
                              ]),
                              _cache[93] || (_cache[93] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-700 uppercase tracking-widest" }, "Show Amounts", -1))
                            ]),
                            _cache[94] || (_cache[94] = createBaseVNode("div", { class: "px-3 py-1.5 border-t border-gray-50 border-b border-gray-50 mt-1" }, [
                              createBaseVNode("span", { class: "text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "Stage Visibility")
                            ], -1)),
                            createBaseVNode("div", _hoisted_22, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(allPipelineStages), (stg) => {
                                return (openBlock(), createElementBlock("label", {
                                  key: stg.id,
                                  class: "flex items-center gap-2 px-3 py-1 hover:bg-gray-50 cursor-pointer"
                                }, [
                                  createBaseVNode("input", {
                                    type: "checkbox",
                                    checked: !unref(hiddenStageIds).includes(stg.id),
                                    onChange: $event => (toggleStageVisibility(stg.id)),
                                    class: "accent-[#2F2E8B] w-3 h-3"
                                  }, null, 40, _hoisted_23),
                                  createBaseVNode("span", _hoisted_24, toDisplayString(stg.name), 1),
                                  createBaseVNode("span", _hoisted_25, toDisplayString(stg.entity), 1)
                                ]))
                              }), 128))
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_26, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => (isRef(pipelineSearchQuery) ? (pipelineSearchQuery).value = $event : null)),
                      type: "text",
                      placeholder: "SEARCH LEADS, COMPANIES...",
                      class: "w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono placeholder-gray-400 focus:border-[#2F2E8B] focus:ring-0 transition uppercase"
                    }, null, 512), [
                      [vModelText, unref(pipelineSearchQuery)]
                    ]),
                    _cache[96] || (_cache[96] = createBaseVNode("i", { class: "fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" }, null, -1)),
                    (unref(pipelineSearchQuery))
                      ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: _cache[8] || (_cache[8] = $event => (pipelineSearchQuery.value = '')),
                          class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        }, [...(_cache[95] || (_cache[95] = [
                          createBaseVNode("i", { class: "fas fa-times text-xs" }, null, -1)
                        ]))]))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    _cache[99] || (_cache[99] = createBaseVNode("i", { class: "fas fa-user-tag absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" }, null, -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => (isRef(pipelineAssignedFilter) ? (pipelineAssignedFilter).value = $event : null)),
                      class: "pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest text-gray-600 focus:border-[#2F2E8B] focus:ring-0 transition cursor-pointer min-w-[160px]"
                    }, [
                      _cache[97] || (_cache[97] = createBaseVNode("option", { value: "" }, "ALL REPS", -1)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tenantUsers), (user) => {
                        return (openBlock(), createElementBlock("option", {
                          key: user.email,
                          value: user.email.toLowerCase()
                        }, toDisplayString((user.name || user.email.split('@')[0]).toUpperCase()), 9, _hoisted_28))
                      }), 128))
                    ], 512), [
                      [vModelSelect, unref(pipelineAssignedFilter)]
                    ]),
                    (unref(pipelineAssignedFilter))
                      ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: _cache[10] || (_cache[10] = $event => (pipelineAssignedFilter.value = '')),
                          class: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B]",
                          title: "Clear filter"
                        }, [...(_cache[98] || (_cache[98] = [
                          createBaseVNode("i", { class: "fas fa-times text-xs" }, null, -1)
                        ]))]))
                      : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: _cache[11] || (_cache[11] = $event => (pipelineMobileView.value = !unref(pipelineMobileView))),
                  class: "lg:hidden px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-mono font-bold uppercase transition flex items-center gap-2"
                }, [
                  createBaseVNode("i", {
                    class: normalizeClass(unref(pipelineMobileView) ? 'fas fa-th' : 'fas fa-list')
                  }, null, 2),
                  createTextVNode(" " + toDisplayString(unref(pipelineMobileView) ? 'Board' : 'List'), 1)
                ])
              ])),
          (!unref(pipelineMobileView))
            ? (openBlock(), createElementBlock("div", _hoisted_29, [
                createBaseVNode("button", {
                  onClick: _cache[12] || (_cache[12] = $event => (scrollKanban(-1))),
                  class: "hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white border border-gray-200 shadow-md hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-500 transition-colors rounded-full",
                  title: "Scroll left"
                }, [...(_cache[100] || (_cache[100] = [
                  createBaseVNode("i", { class: "fas fa-chevron-left text-xs" }, null, -1)
                ]))]),
                createBaseVNode("button", {
                  onClick: _cache[13] || (_cache[13] = $event => (scrollKanban(1))),
                  class: "hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center bg-white border border-gray-200 shadow-md hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-500 transition-colors rounded-full",
                  title: "Scroll right"
                }, [...(_cache[101] || (_cache[101] = [
                  createBaseVNode("i", { class: "fas fa-chevron-right text-xs" }, null, -1)
                ]))]),
                createBaseVNode("div", {
                  ref_key: "kanbanTopScrollRef",
                  ref: kanbanTopScrollRef,
                  class: "overflow-x-scroll mb-2 py-0.5 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full",
                  style: {"scrollbar-width":"auto","scrollbar-color":"#9ca3af #f3f4f6","min-height":"20px"},
                  onScroll: onTopScroll
                }, [
                  createBaseVNode("div", {
                    style: normalizeStyle({ width: kanbanInnerWidth.value || (activePipelineStages.value.length * 14) + 'rem', height: '5px' })
                  }, null, 4)
                ], 544),
                createBaseVNode("div", {
                  ref_key: "kanbanScrollRef",
                  ref: kanbanScrollRef,
                  id: "kanban-scroll-container",
                  class: "w-full overflow-x-auto overflow-y-hidden",
                  style: {"scrollbar-width":"none","-ms-overflow-style":"none"},
                  onScroll: onKanbanScroll
                }, [
                  createBaseVNode("div", {
                    ref_key: "kanbanInnerRef",
                    ref: kanbanInnerRef,
                    class: "grid gap-3",
                    style: normalizeStyle({ gridTemplateColumns: `repeat(${activePipelineStages.value.length}, minmax(12rem, 1fr))`, minWidth: activePipelineStages.value.length > 4 ? `${activePipelineStages.value.length * 14}rem` : '100%' })
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(activePipelineStages.value, (stage) => {
                      return (openBlock(), createElementBlock("div", {
                        key: stage.id,
                        "data-stage-id": stage.id,
                        class: "bg-gray-50/50 rounded-none overflow-hidden border border-gray-200/50 min-w-0",
                        onDrop: $event => (unref(onDrop)($event, stage.id)),
                        onDragover: _cache[17] || (_cache[17] = withModifiers(() => {}, ["prevent"])),
                        onDragenter: withModifiers($event => (unref(onDragEnter)($event, stage.id)), ["prevent"]),
                        onDragleave: $event => (unref(onDragLeave)($event, stage.id))
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["p-2 border-b-2 bg-white relative overflow-hidden group", stage.borderClass])
                        }, [
                          createBaseVNode("div", _hoisted_31, [
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_32, [
                                (editingStageId.value === stage.id)
                                  ? withDirectives((openBlock(), createElementBlock("input", {
                                      key: 0,
                                      "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((editingStageName).value = $event)),
                                      onKeyup: [
                                        withKeys($event => (saveStageRename(stage)), ["enter"]),
                                        _cache[15] || (_cache[15] = withKeys($event => (editingStageId.value = null), ["escape"]))
                                      ],
                                      onBlur: $event => (saveStageRename(stage)),
                                      class: "w-24 border border-[#2F2E8B] px-1 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest outline-none bg-white",
                                      ref_for: true,
                                      ref_key: "stageRenameInput",
                                      ref: stageRenameInput
                                    }, null, 40, _hoisted_33)), [
                                      [vModelText, editingStageName.value]
                                    ])
                                  : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                      createBaseVNode("h4", _hoisted_34, toDisplayString(stage.name), 1),
                                      createBaseVNode("button", {
                                        onClick: withModifiers($event => (startStageRename(stage)), ["stop"]),
                                        class: "opacity-0 group-hover:opacity-100 text-gray-300 hover:text-[#2F2E8B] transition-all",
                                        title: "Rename stage"
                                      }, [...(_cache[102] || (_cache[102] = [
                                        createBaseVNode("i", { class: "fas fa-pen text-[8px]" }, null, -1)
                                      ]))], 8, _hoisted_35)
                                    ], 64)),
                                (unref(accountConversionStages).includes(stage.id))
                                  ? (openBlock(), createElementBlock("span", _hoisted_36, "ACCT"))
                                  : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", _hoisted_37, [
                                createBaseVNode("span", _hoisted_38, toDisplayString(unref(kpiLeadsByStage)(stage.id).length), 1),
                                (unref(showStageAmounts))
                                  ? (openBlock(), createElementBlock("span", _hoisted_39, toDisplayString(unref(formatCurrency)(unref(kpiStageValue)(stage.id))), 1))
                                  : createCommentVNode("", true)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_40, [
                              createBaseVNode("button", {
                                onClick: withModifiers($event => (moveStage(stage, -1)), ["stop"]),
                                disabled: isFirstVisibleStage(stage),
                                class: "text-gray-300 hover:text-[#2F2E8B] disabled:opacity-20 transition-colors",
                                title: "Move left"
                              }, [...(_cache[103] || (_cache[103] = [
                                createBaseVNode("i", { class: "fas fa-chevron-left text-[8px]" }, null, -1)
                              ]))], 8, _hoisted_41),
                              createBaseVNode("button", {
                                onClick: withModifiers($event => (moveStage(stage, 1)), ["stop"]),
                                disabled: isLastVisibleStage(stage),
                                class: "text-gray-300 hover:text-[#2F2E8B] disabled:opacity-20 transition-colors",
                                title: "Move right"
                              }, [...(_cache[104] || (_cache[104] = [
                                createBaseVNode("i", { class: "fas fa-chevron-right text-[8px]" }, null, -1)
                              ]))], 8, _hoisted_42),
                              createBaseVNode("button", {
                                onClick: withModifiers($event => (openAddForStage(stage)), ["stop"]),
                                class: "w-6 h-6 flex items-center justify-center bg-[#2F2E8B] text-white hover:bg-[#3D2F88] rounded-sm transition-all text-[9px] font-bold",
                                title: stage.id === 'closed-won' ? 'Add Account' : 'Add Lead'
                              }, [...(_cache[105] || (_cache[105] = [
                                createBaseVNode("i", { class: "fas fa-plus text-[8px]" }, null, -1)
                              ]))], 8, _hoisted_43),
                              createBaseVNode("button", {
                                onClick: withModifiers($event => (unref(accountConversionStages).includes(stage.id) ? unref(accountConversionStages).splice(unref(accountConversionStages).indexOf(stage.id), 1) : unref(accountConversionStages).push(stage.id)), ["stop"]),
                                class: normalizeClass([unref(accountConversionStages).includes(stage.id) ? 'text-green-500 hover:text-gray-400' : 'text-gray-300 hover:text-green-500', "transition-colors"]),
                                title: unref(accountConversionStages).includes(stage.id) ? 'Disable auto-convert to account' : 'Enable auto-convert to account for this stage'
                              }, [...(_cache[106] || (_cache[106] = [
                                createBaseVNode("i", { class: "fas fa-building text-[9px]" }, null, -1)
                              ]))], 10, _hoisted_44),
                              (stage.isCustom || !stage.entity || stage.id !== 'new')
                                ? (openBlock(), createElementBlock("button", {
                                    key: 0,
                                    onClick: withModifiers($event => (unref(removeCustomStage)(stage.id)), ["stop"]),
                                    class: "text-gray-300 hover:text-red-500 transition-colors",
                                    title: "Delete Stage"
                                  }, [...(_cache[107] || (_cache[107] = [
                                    createBaseVNode("i", { class: "fas fa-trash-alt text-[9px]" }, null, -1)
                                  ]))], 8, _hoisted_45))
                                : createCommentVNode("", true)
                            ])
                          ])
                        ], 2),
                        createBaseVNode("div", {
                          class: normalizeClass(["p-1.5 space-y-1.5 min-h-[350px] max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar transition-colors", { 'bg-blue-50/50 border-2 border-dashed border-[#2F2E8B]/20': unref(dragOverStage) === stage.id }])
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getVisibleLeadsByStage)(stage.id), (record) => {
                            return (openBlock(), createElementBlock("div", {
                              key: `${record.entityType || 'lead'}-${record.id}`,
                              draggable: "true",
                              onDragstart: $event => (unref(onDragStart)($event, record)),
                              onDragend: _cache[16] || (_cache[16] = (...args) => (unref(onDragEnd) && unref(onDragEnd)(...args))),
                              onClick: $event => ((record.entityType || (stage.entity || '').slice(0, -1)) === 'lead' ? unref(editLead)(record) : ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account' ? openAccountProfile(record) : unref(viewRecord)(record, (record.entityType || (stage.entity || '').slice(0, -1)) + 's'))),
                              class: normalizeClass(["bg-white rounded-sm p-2 shadow-none border border-gray-100 hover:border-[#2F2E8B] transition-all cursor-move group relative", [
                    { 'opacity-50 dashed-border': unref(draggingLead) && unref(draggingLead).id === record.id && unref(dragState)?.status === 'dragging' },
                    { 'opacity-70 border-2 border-blue-400 animate-pulse': unref(dragState)?.status === 'updating' && unref(dragState)?.record?.id === record.id },
                    { 'border-2 border-green-400 bg-green-50': unref(dragState)?.status === 'success' && unref(dragState)?.record?.id === record.id },
                    { 'border-2 border-red-400 bg-red-50': unref(dragState)?.status === 'error' && unref(dragState)?.record?.id === record.id }
                  ]])
                            }, [
                              createBaseVNode("div", _hoisted_47, [
                                createBaseVNode("span", _hoisted_48, toDisplayString(record.entityType || stage.entity.slice(0, -1)) + " " + toDisplayString(record.priority ? '// ' + record.priority : ''), 1),
                                (record.previousStage && record.previousStage !== record.stage)
                                  ? (openBlock(), createElementBlock("span", _hoisted_49, [
                                      _cache[108] || (_cache[108] = createBaseVNode("i", { class: "fas fa-arrow-right text-[6px]" }, null, -1)),
                                      createTextVNode(" " + toDisplayString(unref(getStageName)(record.previousStage)), 1)
                                    ]))
                                  : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", _hoisted_50, [
                                createBaseVNode("div", _hoisted_51, [
                                  createBaseVNode("div", _hoisted_52, toDisplayString(unref(getRecordTitle)(record, (record.entityType ? record.entityType + 's' : stage.entity))), 1),
                                  createBaseVNode("div", _hoisted_53, toDisplayString(unref(getRecordSubtitle)(record, (record.entityType ? record.entityType + 's' : stage.entity))), 1)
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_54, [
                                (unref(showStageAmounts) && unref(getRecordValue)(record, (record.entityType ? record.entityType + 's' : stage.entity)))
                                  ? (openBlock(), createElementBlock("div", _hoisted_55, toDisplayString(unref(formatCurrency)(unref(getRecordValue)(record, (record.entityType ? record.entityType + 's' : stage.entity)))), 1))
                                  : (unref(showStageAmounts))
                                    ? (openBlock(), createElementBlock("div", _hoisted_56, "NO VALUE"))
                                    : createCommentVNode("", true),
                                createBaseVNode("div", _hoisted_57, [
                                  ((record.entityType || (stage.entity || '').slice(0, -1)) === 'lead')
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 0,
                                        onClick: withModifiers($event => (openLeadProfile(record)), ["stop"]),
                                        class: "w-6 h-6 flex items-center justify-center bg-blue-50 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white border border-blue-200 hover:border-[#2F2E8B] transition-colors rounded-sm",
                                        title: "View Lead Profile"
                                      }, [...(_cache[109] || (_cache[109] = [
                                        createBaseVNode("i", { class: "fas fa-user text-[8px]" }, null, -1)
                                      ]))], 8, _hoisted_58))
                                    : createCommentVNode("", true),
                                  ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account')
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 1,
                                        onClick: withModifiers($event => (openAccountProfile(record)), ["stop"]),
                                        class: "w-6 h-6 flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 transition-colors rounded-sm",
                                        title: "View Account Profile"
                                      }, [...(_cache[110] || (_cache[110] = [
                                        createBaseVNode("i", { class: "fas fa-building text-[8px]" }, null, -1)
                                      ]))], 8, _hoisted_59))
                                    : createCommentVNode("", true),
                                  (record.phone)
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 2,
                                        onClick: withModifiers($event => (openCallModal(record, (record.entityType ? record.entityType + 's' : stage.entity))), ["stop"]),
                                        class: "w-6 h-6 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 transition-colors rounded-sm",
                                        title: `Call ${record.phone}`
                                      }, [...(_cache[111] || (_cache[111] = [
                                        createBaseVNode("i", { class: "fas fa-phone text-[8px]" }, null, -1)
                                      ]))], 8, _hoisted_60))
                                    : createCommentVNode("", true),
                                  createBaseVNode("button", {
                                    onClick: withModifiers($event => (deletePipelineRecord(record, (record.entityType ? record.entityType + 's' : stage.entity))), ["stop"]),
                                    class: "w-6 h-6 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-colors rounded-sm",
                                    title: "Delete"
                                  }, [...(_cache[112] || (_cache[112] = [
                                    createBaseVNode("i", { class: "fas fa-trash-alt text-[8px]" }, null, -1)
                                  ]))], 8, _hoisted_61),
                                  _cache[113] || (_cache[113] = createBaseVNode("div", { class: "text-[8px] font-black text-[#2F2E8B] font-mono tracking-widest" }, "EDIT", -1))
                                ])
                              ])
                            ], 42, _hoisted_46))
                          }), 128)),
                          (unref(getVisibleLeadsByStage)(stage.id).length === 0)
                            ? (openBlock(), createElementBlock("div", _hoisted_62, [...(_cache[114] || (_cache[114] = [
                                createBaseVNode("div", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Empty Stage", -1)
                              ]))]))
                            : createCommentVNode("", true)
                        ], 2)
                      ], 40, _hoisted_30))
                    }), 128))
                  ], 4)
                ], 544)
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_63, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(activePipelineStages.value, (stage) => {
                  return (openBlock(), createElementBlock("div", {
                    key: `mobile-${stage.id}`,
                    class: "bg-white rounded-none border border-gray-200 overflow-hidden"
                  }, [
                    createBaseVNode("div", _hoisted_64, [
                      createBaseVNode("div", _hoisted_65, [
                        createBaseVNode("div", _hoisted_66, [
                          createBaseVNode("h4", _hoisted_67, toDisplayString(stage.name), 1)
                        ]),
                        createBaseVNode("div", _hoisted_68, [
                          createBaseVNode("span", _hoisted_69, toDisplayString(unref(kpiLeadsByStage)(stage.id).length) + " ITEMS", 1),
                          (unref(showStageAmounts))
                            ? (openBlock(), createElementBlock("span", _hoisted_70, toDisplayString(unref(formatCurrency)(unref(kpiStageValue)(stage.id))), 1))
                            : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_71, [
                      (unref(getVisibleLeadsByStage)(stage.id).length === 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_72, [...(_cache[115] || (_cache[115] = [
                            createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase" }, "No items", -1)
                          ]))]))
                        : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(getVisibleLeadsByStage)(stage.id), (record) => {
                            return (openBlock(), createElementBlock("div", {
                              key: `mobile-${record.id}`,
                              onClick: $event => ((record.entityType || (stage.entity || '').slice(0, -1)) === 'lead' ? unref(editLead)(record) : ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account' ? openAccountProfile(record) : unref(viewRecord)(record, (record.entityType || (stage.entity || '').slice(0, -1)) + 's'))),
                              class: "bg-white rounded-none p-3 border border-gray-100 hover:border-[#2F2E8B] transition cursor-pointer group"
                            }, [
                              createBaseVNode("div", _hoisted_74, [
                                createBaseVNode("div", _hoisted_75, [
                                  createBaseVNode("h5", _hoisted_76, toDisplayString(unref(getRecordTitle)(record, (record.entityType ? record.entityType + 's' : stage.entity))), 1),
                                  createBaseVNode("p", _hoisted_77, toDisplayString(unref(getRecordSubtitle)(record, (record.entityType ? record.entityType + 's' : stage.entity))), 1),
                                  (record.previousStage && record.previousStage !== record.stage)
                                    ? (openBlock(), createElementBlock("span", _hoisted_78, [
                                        _cache[116] || (_cache[116] = createBaseVNode("i", { class: "fas fa-arrow-right text-[7px]" }, null, -1)),
                                        createTextVNode(" " + toDisplayString(unref(getStageName)(record.previousStage)) + " → " + toDisplayString(unref(getStageName)(record.stage)), 1)
                                      ]))
                                    : createCommentVNode("", true)
                                ]),
                                createBaseVNode("div", _hoisted_79, [
                                  ((record.entityType || (stage.entity || '').slice(0, -1)) === 'lead')
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 0,
                                        onClick: withModifiers($event => (openLeadProfile(record)), ["stop"]),
                                        class: "w-7 h-7 flex items-center justify-center bg-blue-50 text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white border border-blue-200 transition-colors",
                                        title: "View Lead Profile"
                                      }, [...(_cache[117] || (_cache[117] = [
                                        createBaseVNode("i", { class: "fas fa-user text-[10px]" }, null, -1)
                                      ]))], 8, _hoisted_80))
                                    : createCommentVNode("", true),
                                  ((record.entityType || (stage.entity || '').slice(0, -1)) === 'account')
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 1,
                                        onClick: withModifiers($event => (openAccountProfile(record)), ["stop"]),
                                        class: "w-7 h-7 flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors",
                                        title: "View Account Profile"
                                      }, [...(_cache[118] || (_cache[118] = [
                                        createBaseVNode("i", { class: "fas fa-building text-[10px]" }, null, -1)
                                      ]))], 8, _hoisted_81))
                                    : createCommentVNode("", true),
                                  (record.phone)
                                    ? (openBlock(), createElementBlock("button", {
                                        key: 2,
                                        onClick: withModifiers($event => (openCallModal(record, (record.entityType ? record.entityType + 's' : stage.entity))), ["stop"]),
                                        class: "w-7 h-7 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border border-green-200 transition-colors",
                                        title: `Call ${record.phone}`
                                      }, [...(_cache[119] || (_cache[119] = [
                                        createBaseVNode("i", { class: "fas fa-phone text-[10px]" }, null, -1)
                                      ]))], 8, _hoisted_82))
                                    : createCommentVNode("", true),
                                  createBaseVNode("button", {
                                    onClick: withModifiers($event => (deletePipelineRecord(record, (record.entityType ? record.entityType + 's' : stage.entity))), ["stop"]),
                                    class: "w-7 h-7 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white border border-red-200 transition-colors",
                                    title: "Delete"
                                  }, [...(_cache[120] || (_cache[120] = [
                                    createBaseVNode("i", { class: "fas fa-trash-alt text-[10px]" }, null, -1)
                                  ]))], 8, _hoisted_83)
                                ])
                              ]),
                              (unref(showStageAmounts) && unref(getRecordValue)(record, stage.entity))
                                ? (openBlock(), createElementBlock("div", _hoisted_84, toDisplayString(unref(formatCurrency)(unref(getRecordValue)(record, stage.entity))), 1))
                                : createCommentVNode("", true)
                            ], 8, _hoisted_73))
                          }), 128))
                    ])
                  ]))
                }), 128))
              ]))
        ])
      ]),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (unref(showLeadModal))
          ? (openBlock(), createElementBlock("div", _hoisted_85, [
              createBaseVNode("div", _hoisted_86, [
                createBaseVNode("div", _hoisted_87, [
                  createBaseVNode("div", _hoisted_88, [
                    _cache[121] || (_cache[121] = createBaseVNode("div", { class: "w-1 sm:w-1.5 h-5 sm:h-6 bg-white/40" }, null, -1)),
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_89, "Lead_Protocol // " + toDisplayString(unref(leadModalTitle).split(' ')[0].toUpperCase()), 1),
                      createBaseVNode("h3", _hoisted_90, toDisplayString(unref(leadModalTitle)), 1)
                    ])
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[18] || (_cache[18] = (...args) => (unref(closeLeadModal) && unref(closeLeadModal)(...args))),
                    class: "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all"
                  }, [
                    createVNode(unref(X), { size: 18 })
                  ])
                ]),
                createBaseVNode("div", _hoisted_91, [
                  _cache[164] || (_cache[164] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
                  createBaseVNode("form", {
                    onSubmit: _cache[54] || (_cache[54] = withModifiers((...args) => (unref(submitLead) && unref(submitLead)(...args)), ["prevent"])),
                    class: "space-y-6 sm:space-y-8 relative z-10"
                  }, [
                    (!showExpandedLeadForm.value && !unref(leadForm).id)
                      ? (openBlock(), createElementBlock("div", _hoisted_92, [
                          createBaseVNode("div", _hoisted_93, [
                            createBaseVNode("div", null, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((unref(leadForm).name) = $event)),
                                required: "",
                                type: "text",
                                placeholder: "Full Name *",
                                class: "w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                              }, null, 512), [
                                [vModelText, unref(leadForm).name]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((unref(leadForm).phone) = $event)),
                                required: "",
                                type: "tel",
                                placeholder: "Phone Number *",
                                class: "w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                              }, null, 512), [
                                [vModelText, unref(leadForm).phone]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((unref(leadForm).email) = $event)),
                              type: "email",
                              placeholder: "Email (optional)",
                              class: "w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                            }, null, 512), [
                              [vModelText, unref(leadForm).email]
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => ((unref(leadForm).company) = $event)),
                              type: "text",
                              placeholder: "Company (optional)",
                              class: "w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400"
                            }, null, 512), [
                              [vModelText, unref(leadForm).company]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_94, [
                            createBaseVNode("div", _hoisted_95, [
                              createVNode(unref(MapPin), {
                                size: 14,
                                class: "absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                              }),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[23] || (_cache[23] = $event => (isRef(locationSearchQuery) ? (locationSearchQuery).value = $event : null)),
                                type: "text",
                                placeholder: "Search location...",
                                class: "w-full bg-gray-50 border border-gray-200 pl-9 pr-3 py-2.5 text-sm focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400",
                                onKeyup: _cache[24] || (_cache[24] = withKeys((...args) => (unref(searchLocation) && unref(searchLocation)(...args)), ["enter"]))
                              }, null, 544), [
                                [vModelText, unref(locationSearchQuery)]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_96, [
                              createBaseVNode("button", {
                                type: "button",
                                onClick: _cache[25] || (_cache[25] = (...args) => (unref(searchLocation) && unref(searchLocation)(...args))),
                                disabled: unref(isSearchingLocation),
                                class: "px-3 py-2.5 bg-[#2F2E8B] text-white text-xs font-semibold hover:bg-[#3D2F88] transition disabled:opacity-50 whitespace-nowrap"
                              }, [
                                createBaseVNode("i", {
                                  class: normalizeClass(unref(isSearchingLocation) ? 'fas fa-spinner fa-spin' : 'fas fa-search')
                                }, null, 2),
                                _cache[122] || (_cache[122] = createBaseVNode("span", { class: "ml-1 hidden sm:inline" }, "Search", -1))
                              ], 8, _hoisted_97),
                              createBaseVNode("button", {
                                type: "button",
                                onClick: _cache[26] || (_cache[26] = (...args) => (unref(useCurrentLocation) && unref(useCurrentLocation)(...args))),
                                disabled: unref(isLocatingDevice),
                                class: "px-3 py-2.5 border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition disabled:opacity-50 whitespace-nowrap"
                              }, [
                                createBaseVNode("i", {
                                  class: normalizeClass(unref(isLocatingDevice) ? 'fas fa-spinner fa-spin' : 'fas fa-crosshairs')
                                }, null, 2),
                                _cache[123] || (_cache[123] = createBaseVNode("span", { class: "ml-1 hidden sm:inline" }, "Current", -1))
                              ], 8, _hoisted_98)
                            ])
                          ]),
                          (unref(locationSearchResults).length > 0)
                            ? (openBlock(), createElementBlock("div", _hoisted_99, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(locationSearchResults), (result, idx) => {
                                  return (openBlock(), createElementBlock("div", {
                                    key: idx,
                                    onClick: $event => (unref(selectSearchResult)(result)),
                                    class: "p-2 hover:bg-[#2F2E8B]/5 cursor-pointer border-b border-gray-100 last:border-b-0 text-xs font-medium text-gray-700"
                                  }, toDisplayString(result.display_name), 9, _hoisted_100))
                                }), 128))
                              ]))
                            : createCommentVNode("", true),
                          _cache[128] || (_cache[128] = createBaseVNode("div", {
                            id: "lead-map",
                            class: "w-full h-36 sm:h-44 bg-gray-100 border border-gray-200 overflow-hidden rounded"
                          }, null, -1)),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => ((unref(leadForm).location.lat) = $event)),
                            type: "hidden",
                            onBlur: _cache[28] || (_cache[28] = (...args) => (unref(roundLocationCoordinates) && unref(roundLocationCoordinates)(...args)))
                          }, null, 544), [
                            [
                              vModelText,
                              unref(leadForm).location.lat,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => ((unref(leadForm).location.lng) = $event)),
                            type: "hidden",
                            onBlur: _cache[30] || (_cache[30] = (...args) => (unref(roundLocationCoordinates) && unref(roundLocationCoordinates)(...args)))
                          }, null, 544), [
                            [
                              vModelText,
                              unref(leadForm).location.lng,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createBaseVNode("div", _hoisted_101, [
                            createBaseVNode("button", {
                              type: "button",
                              onClick: triggerCameraCapture,
                              class: "px-4 py-2.5 bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition flex items-center gap-2 rounded-sm"
                            }, [...(_cache[124] || (_cache[124] = [
                              createBaseVNode("i", { class: "fas fa-camera" }, null, -1),
                              createTextVNode(" Take Picture ", -1)
                            ]))]),
                            (capturedPhotoPreview.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_102, [
                                  createBaseVNode("img", {
                                    src: capturedPhotoPreview.value,
                                    class: "w-10 h-10 object-cover border border-green-200 rounded-sm"
                                  }, null, 8, _hoisted_103),
                                  _cache[126] || (_cache[126] = createTextVNode(" Photo captured ", -1)),
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: clearCapturedPhoto,
                                    class: "text-red-500 hover:text-red-700 ml-1"
                                  }, [...(_cache[125] || (_cache[125] = [
                                    createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                                  ]))])
                                ]))
                              : createCommentVNode("", true),
                            createBaseVNode("input", {
                              ref_key: "cameraInputRef",
                              ref: cameraInputRef,
                              type: "file",
                              accept: "image/*",
                              capture: "environment",
                              class: "hidden",
                              onChange: onCameraCapture
                            }, null, 544)
                          ]),
                          createBaseVNode("div", null, [
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[31] || (_cache[31] = $event => ((unref(leadForm).notes) = $event)),
                              rows: "2",
                              class: "w-full bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-400",
                              placeholder: "Notes (optional)"
                            }, null, 512), [
                              [vModelText, unref(leadForm).notes]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_104, [
                            createBaseVNode("button", {
                              type: "button",
                              onClick: _cache[32] || (_cache[32] = $event => (showExpandedLeadForm.value = true)),
                              class: "text-xs text-gray-400 hover:text-[#2F2E8B] font-medium transition-colors inline-flex items-center gap-1"
                            }, [
                              createVNode(unref(ChevronDown), { size: 12 }),
                              _cache[127] || (_cache[127] = createTextVNode(" More fields ", -1))
                            ])
                          ])
                        ]))
                      : (openBlock(), createElementBlock("div", _hoisted_105, [
                          (!unref(leadForm).id)
                            ? (openBlock(), createElementBlock("div", _hoisted_106, [
                                createBaseVNode("button", {
                                  type: "button",
                                  onClick: _cache[33] || (_cache[33] = $event => (showExpandedLeadForm.value = false)),
                                  class: "px-3 py-1.5 text-[9px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest flex items-center gap-1 transition-colors"
                                }, [
                                  createVNode(unref(ChevronUp), { size: 12 }),
                                  _cache[129] || (_cache[129] = createTextVNode(" Compact_View ", -1))
                                ])
                              ]))
                            : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_107, [
                            _cache[138] || (_cache[138] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Basic Information")
                            ], -1)),
                            createBaseVNode("div", _hoisted_108, [
                              _cache[130] || (_cache[130] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Full_Designation *", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[34] || (_cache[34] = $event => ((unref(leadForm).name) = $event)),
                                required: "",
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).name]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_109, [
                              _cache[131] || (_cache[131] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "COMM_ENDPOINT_MAIL *", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[35] || (_cache[35] = $event => ((unref(leadForm).email) = $event)),
                                required: "",
                                type: "email",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).email]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_110, [
                              _cache[132] || (_cache[132] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "COMM_ENDPOINT_PHONE", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[36] || (_cache[36] = $event => ((unref(leadForm).phone) = $event)),
                                type: "tel",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).phone]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_111, [
                              _cache[133] || (_cache[133] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Tax_ID (TPIN)", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[37] || (_cache[37] = $event => ((unref(leadForm).tpin) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).tpin]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_112, [
                              _cache[134] || (_cache[134] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Organization", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[38] || (_cache[38] = $event => ((unref(leadForm).company) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).company]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_113, [
                              _cache[135] || (_cache[135] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Executive_Position", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[39] || (_cache[39] = $event => ((unref(leadForm).position) = $event)),
                                type: "text",
                                placeholder: "E.G. CEO, MANAGER",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).position]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_114, [
                              _cache[136] || (_cache[136] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Lead_Source", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[40] || (_cache[40] = $event => ((unref(leadForm).source) = $event)),
                                type: "text",
                                list: "lead-source-options",
                                placeholder: "SELECT OR TYPE...",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).source]
                              ]),
                              _cache[137] || (_cache[137] = createBaseVNode("datalist", { id: "lead-source-options" }, [
                                createBaseVNode("option", { value: "Website" }),
                                createBaseVNode("option", { value: "WhatsApp" }),
                                createBaseVNode("option", { value: "Email" }),
                                createBaseVNode("option", { value: "Phone Call" }),
                                createBaseVNode("option", { value: "Referral" }),
                                createBaseVNode("option", { value: "Event" }),
                                createBaseVNode("option", { value: "Social Media" }),
                                createBaseVNode("option", { value: "Direct Mail" }),
                                createBaseVNode("option", { value: "Advertisement" }),
                                createBaseVNode("option", { value: "Trade Show" }),
                                createBaseVNode("option", { value: "Partner" }),
                                createBaseVNode("option", { value: "Cold Call" }),
                                createBaseVNode("option", { value: "LinkedIn" }),
                                createBaseVNode("option", { value: "Facebook" }),
                                createBaseVNode("option", { value: "Instagram" }),
                                createBaseVNode("option", { value: "Twitter" }),
                                createBaseVNode("option", { value: "Google Search" }),
                                createBaseVNode("option", { value: "Other" })
                              ], -1))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_115, [
                            _cache[143] || (_cache[143] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Pipeline_Status")
                            ], -1)),
                            createBaseVNode("div", _hoisted_116, [
                              _cache[140] || (_cache[140] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Priority_Rank", -1)),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[41] || (_cache[41] = $event => ((unref(leadForm).priority) = $event)),
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, [...(_cache[139] || (_cache[139] = [
                                createBaseVNode("option", { value: "" }, "SET_PRIORITY", -1),
                                createBaseVNode("option", { value: "hot" }, "HOT", -1),
                                createBaseVNode("option", { value: "warm" }, "WARM", -1),
                                createBaseVNode("option", { value: "cold" }, "COLD", -1)
                              ]))], 512), [
                                [vModelSelect, unref(leadForm).priority]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_117, [
                              _cache[141] || (_cache[141] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Pipeline_Stage", -1)),
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": _cache[42] || (_cache[42] = $event => ((unref(leadForm).stage) = $event)),
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(allPipelineStages), (stage) => {
                                  return (openBlock(), createElementBlock("option", {
                                    key: stage.id,
                                    value: stage.id
                                  }, toDisplayString(stage.name.toUpperCase()), 9, _hoisted_118))
                                }), 128))
                              ], 512), [
                                [vModelSelect, unref(leadForm).stage]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_119, [
                              _cache[142] || (_cache[142] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Projected_Value", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[43] || (_cache[43] = $event => ((unref(leadForm).value) = $event)),
                                type: "number",
                                min: "0",
                                step: "0.01",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [
                                  vModelText,
                                  unref(leadForm).value,
                                  void 0,
                                  { number: true }
                                ]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_120, [
                            _cache[147] || (_cache[147] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Regional_Mapping")
                            ], -1)),
                            createBaseVNode("div", _hoisted_121, [
                              _cache[144] || (_cache[144] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "City / District", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[44] || (_cache[44] = $event => ((unref(leadForm).city) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).city]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_122, [
                              _cache[145] || (_cache[145] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Country / Region", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[45] || (_cache[45] = $event => ((unref(leadForm).country) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).country]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_123, [
                              _cache[146] || (_cache[146] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Website", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[46] || (_cache[46] = $event => ((unref(leadForm).website) = $event)),
                                type: "url",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).website]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_124, [
                            _cache[151] || (_cache[151] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Operational_Information")
                            ], -1)),
                            createBaseVNode("div", _hoisted_125, [
                              _cache[150] || (_cache[150] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Resource_Assignment", -1)),
                              (!unref(canAssignCrm))
                                ? (openBlock(), createElementBlock("div", _hoisted_126, "Assignment locked"))
                                : (openBlock(), createElementBlock("div", _hoisted_127, [
                                    withDirectives(createBaseVNode("input", {
                                      "onUpdate:modelValue": _cache[47] || (_cache[47] = $event => (isRef(assignToSearch) ? (assignToSearch).value = $event : null)),
                                      type: "text",
                                      placeholder: "SEARCH OPERATORS...",
                                      onFocus: _cache[48] || (_cache[48] = $event => (showAssignToDropdown.value = true)),
                                      class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                                    }, null, 544), [
                                      [vModelText, unref(assignToSearch)]
                                    ]),
                                    (unref(showAssignToDropdown) && unref(filteredAssignToUsers)?.length > 0)
                                      ? (openBlock(), createElementBlock("div", _hoisted_128, [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredAssignToUsers), (user) => {
                                            return (openBlock(), createElementBlock("button", {
                                              key: user.email,
                                              type: "button",
                                              onClick: $event => (unref(selectAssignTo)(user)),
                                              class: "w-full text-left px-4 py-2 hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-50 last:border-0"
                                            }, [
                                              createBaseVNode("div", _hoisted_130, toDisplayString(unref(getUserInitials)(user.email)), 1),
                                              createBaseVNode("div", _hoisted_131, [
                                                createBaseVNode("div", _hoisted_132, toDisplayString(user.email), 1),
                                                createBaseVNode("div", _hoisted_133, toDisplayString(user.role || 'User'), 1)
                                              ])
                                            ], 8, _hoisted_129))
                                          }), 128))
                                        ]))
                                      : createCommentVNode("", true),
                                    (unref(leadForm).assignedTo)
                                      ? (openBlock(), createElementBlock("div", _hoisted_134, [
                                          _cache[149] || (_cache[149] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase" }, "Assigned:", -1)),
                                          createBaseVNode("span", _hoisted_135, toDisplayString(unref(leadForm).assignedTo), 1),
                                          createBaseVNode("button", {
                                            type: "button",
                                            onClick: _cache[49] || (_cache[49] = $event => {unref(leadForm).assignedTo = ''; assignToSearch.value = '';}),
                                            class: "text-red-500 hover:text-red-700"
                                          }, [...(_cache[148] || (_cache[148] = [
                                            createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                                          ]))])
                                        ]))
                                      : createCommentVNode("", true)
                                  ]))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_136, [
                            _cache[155] || (_cache[155] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Digital_Footprint")
                            ], -1)),
                            createBaseVNode("div", _hoisted_137, [
                              _cache[152] || (_cache[152] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "LinkedIn", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[50] || (_cache[50] = $event => ((unref(leadForm).linkedin) = $event)),
                                type: "url",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).linkedin]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_138, [
                              _cache[153] || (_cache[153] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Twitter (X)", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[51] || (_cache[51] = $event => ((unref(leadForm).twitter) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).twitter]
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_139, [
                              _cache[154] || (_cache[154] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Facebook / Instagram", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[52] || (_cache[52] = $event => ((unref(leadForm).facebook) = $event)),
                                type: "text",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none"
                              }, null, 512), [
                                [vModelText, unref(leadForm).facebook]
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_140, [
                            createBaseVNode("div", _hoisted_141, [
                              createBaseVNode("div", _hoisted_142, [
                                createBaseVNode("div", _hoisted_143, [
                                  _cache[156] || (_cache[156] = createBaseVNode("div", { class: "w-1 h-3 bg-[#2F2E8B]" }, null, -1)),
                                  _cache[157] || (_cache[157] = createBaseVNode("h4", { class: "text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest" }, "STAGED_ASSETS", -1)),
                                  createBaseVNode("span", _hoisted_144, "[" + toDisplayString(unref(pendingLeadDocuments).length) + "]", 1)
                                ]),
                                createBaseVNode("label", _hoisted_145, [
                                  _cache[158] || (_cache[158] = createBaseVNode("i", { class: "fas fa-camera" }, null, -1)),
                                  _cache[159] || (_cache[159] = createTextVNode(" PICTURE ", -1)),
                                  createBaseVNode("input", {
                                    type: "file",
                                    accept: "image/*",
                                    capture: "environment",
                                    class: "hidden",
                                    onChange: onCameraCapture
                                  }, null, 32)
                                ]),
                                createBaseVNode("label", _hoisted_146, [
                                  createVNode(unref(Plus), { size: 10 }),
                                  _cache[160] || (_cache[160] = createTextVNode(" ATTACH_NODE ", -1)),
                                  createBaseVNode("input", {
                                    type: "file",
                                    multiple: "",
                                    class: "hidden",
                                    onChange: onPendingDocsFileSelect
                                  }, null, 32)
                                ])
                              ]),
                              (unref(pendingLeadDocuments).length === 0)
                                ? (openBlock(), createElementBlock("div", _hoisted_147, [
                                    createVNode(unref(CloudUpload), {
                                      size: 22,
                                      class: "text-gray-300 mx-auto mb-2"
                                    }),
                                    _cache[161] || (_cache[161] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "NO_ASSETS_STAGED", -1)),
                                    _cache[162] || (_cache[162] = createBaseVNode("p", { class: "text-[9px] font-mono text-gray-300 uppercase tracking-widest" }, "Files will upload after the lead is saved.", -1))
                                  ]))
                                : (openBlock(), createElementBlock("div", _hoisted_148, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(pendingLeadDocuments), (item) => {
                                      return (openBlock(), createElementBlock("div", {
                                        key: item.id,
                                        class: "flex items-center justify-between gap-2 p-2.5 bg-white border border-gray-100 hover:border-[#2F2E8B]/30 transition"
                                      }, [
                                        createBaseVNode("div", _hoisted_149, [
                                          createVNode(unref(FileText), {
                                            size: 14,
                                            class: "text-[#2F2E8B] shrink-0"
                                          }),
                                          createBaseVNode("span", _hoisted_150, toDisplayString(item.name), 1)
                                        ]),
                                        createBaseVNode("button", {
                                          onClick: $event => (unref(removePendingLeadDocument)(item.id)),
                                          class: "text-gray-300 hover:text-red-500 transition shrink-0"
                                        }, [
                                          createVNode(unref(X), { size: 12 })
                                        ], 8, _hoisted_151)
                                      ]))
                                    }), 128))
                                  ]))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_152, [
                            _cache[163] || (_cache[163] = createBaseVNode("div", { class: "lg:col-span-12" }, [
                              createBaseVNode("h4", { class: "text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest border-b border-gray-100 pb-2" }, "Qualitative_Summary")
                            ], -1)),
                            createBaseVNode("div", _hoisted_153, [
                              withDirectives(createBaseVNode("textarea", {
                                "onUpdate:modelValue": _cache[53] || (_cache[53] = $event => ((unref(leadForm).notes) = $event)),
                                rows: "3",
                                class: "w-full border border-gray-200 px-3 py-2 text-sm font-mono resize-none focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] outline-none",
                                placeholder: "NOTES / CONTEXT..."
                              }, null, 512), [
                                [vModelText, unref(leadForm).notes]
                              ])
                            ])
                          ])
                        ]))
                  ], 32)
                ]),
                createBaseVNode("div", _hoisted_154, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[55] || (_cache[55] = (...args) => (unref(closeLeadModal) && unref(closeLeadModal)(...args))),
                    class: "px-6 py-2.5 border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all"
                  }, " PROTOCOL_ABORT "),
                  createBaseVNode("button", {
                    onClick: _cache[56] || (_cache[56] = (...args) => (unref(submitLead) && unref(submitLead)(...args))),
                    disabled: unref(isSubmitting),
                    class: "px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20"
                  }, [
                    (!unref(isSubmitting))
                      ? (openBlock(), createBlock(unref(Save), {
                          key: 0,
                          size: 14
                        }))
                      : (openBlock(), createBlock(unref(LoaderCircle), {
                          key: 1,
                          class: "animate-spin",
                          size: 14
                        })),
                    createTextVNode(" " + toDisplayString(unref(isSubmitting) ? 'PROCESSING_SAVE...' : (unref(leadForm).id ? 'COMMIT_UPDATE' : 'INITIALIZE_LEAD')), 1)
                  ], 8, _hoisted_155)
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ])),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (showCallModal.value)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[100001] p-4 pt-[8vh]",
              onClick: withModifiers(closeCallModal, ["self"])
            }, [
              createBaseVNode("div", _hoisted_156, [
                createBaseVNode("div", _hoisted_157, [
                  createBaseVNode("div", _hoisted_158, [
                    _cache[166] || (_cache[166] = createBaseVNode("div", { class: "w-7 h-7 bg-[#3D3A9E] rounded-full flex items-center justify-center" }, [
                      createBaseVNode("i", { class: "fas fa-phone-alt text-white text-[11px]" })
                    ], -1)),
                    createBaseVNode("div", null, [
                      _cache[165] || (_cache[165] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-blue-200 uppercase tracking-widest leading-none" }, "Call // Session", -1)),
                      createBaseVNode("h3", _hoisted_159, toDisplayString(callContext.name || 'Lead'), 1),
                      createBaseVNode("div", _hoisted_160, toDisplayString(callContext.company || callContext.subtitle || '\u2014'), 1)
                    ])
                  ]),
                  createBaseVNode("button", {
                    onClick: closeCallModal,
                    class: "w-6 h-6 flex items-center justify-center text-blue-300 hover:text-white transition rounded-sm hover:bg-[#3D3A9E]"
                  }, [...(_cache[167] || (_cache[167] = [
                    createBaseVNode("i", { class: "fas fa-times text-sm" }, null, -1)
                  ]))])
                ]),
                createBaseVNode("div", _hoisted_161, [
                  createBaseVNode("div", _hoisted_162, [
                    createBaseVNode("div", null, [
                      _cache[168] || (_cache[168] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest" }, "Phone Number", -1)),
                      createBaseVNode("div", _hoisted_163, toDisplayString(callContext.phone || 'No number on file'), 1)
                    ]),
                    (callContext.phone)
                      ? (openBlock(), createElementBlock("a", {
                          key: 0,
                          href: `tel:${callContext.phone}`,
                          class: "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase tracking-widest transition-colors rounded"
                        }, [...(_cache[169] || (_cache[169] = [
                          createBaseVNode("i", { class: "fas fa-phone text-[10px]" }, null, -1),
                          createTextVNode(" Initiate Call ", -1)
                        ]))], 8, _hoisted_164))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("div", { class: "flex items-center justify-between mb-1.5" }, [
                      _cache[170] || (_cache[170] = createBaseVNode("h4", { class: "text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1" }, [
                        createBaseVNode("i", { class: "fas fa-list-check text-[#2F2E8B] text-[10px]" }),
                        createTextVNode(" Talking Points ")
                      ], -1)),
                      createBaseVNode("button", {
                        type: "button",
                        onClick: resetTalkingPoints,
                        class: "text-[8px] font-mono font-bold text-gray-400 hover:text-[#2F2E8B] uppercase tracking-wider"
                      }, "Reset")
                    ]),
                    createBaseVNode("div", _hoisted_165, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(talkingPoints.value, (point, idx) => {
                        return (openBlock(), createElementBlock("label", {
                          key: idx,
                          class: "flex items-start gap-1.5 p-1.5 border border-gray-100 hover:border-[#2F2E8B]/30 hover:bg-[#2F2E8B]/5 cursor-pointer transition-colors rounded"
                        }, [
                          withDirectives(createBaseVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": $event => ((point.done) = $event),
                            class: "mt-0.5 rounded-sm text-[#2F2E8B] focus:ring-[#2F2E8B] border-gray-300 w-3 h-3"
                          }, null, 8, _hoisted_166), [
                            [vModelCheckbox, point.done]
                          ]),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-[10px] text-gray-700 font-mono uppercase tracking-tight leading-snug", { 'line-through text-gray-400': point.done }])
                          }, toDisplayString(point.text), 3)
                        ]))
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_167, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[57] || (_cache[57] = $event => ((newTalkingPoint).value = $event)),
                        onKeyup: withKeys(addTalkingPoint, ["enter"]),
                        type: "text",
                        placeholder: "ADD CUSTOM TALKING POINT...",
                        class: "flex-1 border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded-sm outline-none bg-gray-50"
                      }, null, 544), [
                        [vModelText, newTalkingPoint.value]
                      ]),
                      createBaseVNode("button", {
                        type: "button",
                        onClick: addTalkingPoint,
                        class: "px-2.5 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] text-white text-[9px] font-mono font-black uppercase rounded-sm transition"
                      }, [...(_cache[171] || (_cache[171] = [
                        createBaseVNode("i", { class: "fas fa-plus text-[10px]" }, null, -1)
                      ]))])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_168, [
                    createBaseVNode("div", null, [
                      _cache[173] || (_cache[173] = createBaseVNode("label", { class: "block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Outcome", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[58] || (_cache[58] = $event => ((callOutcome).value = $event)),
                        class: "w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono uppercase rounded-sm outline-none bg-gray-50"
                      }, [...(_cache[172] || (_cache[172] = [
                        createBaseVNode("option", { value: "connected" }, "CONNECTED", -1),
                        createBaseVNode("option", { value: "voicemail" }, "VOICEMAIL", -1),
                        createBaseVNode("option", { value: "no_answer" }, "NO ANSWER", -1),
                        createBaseVNode("option", { value: "busy" }, "BUSY", -1),
                        createBaseVNode("option", { value: "follow_up" }, "FOLLOW-UP NEEDED", -1),
                        createBaseVNode("option", { value: "not_interested" }, "NOT INTERESTED", -1)
                      ]))], 512), [
                        [vModelSelect, callOutcome.value]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[174] || (_cache[174] = createBaseVNode("label", { class: "block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Duration (Min)", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[59] || (_cache[59] = $event => ((callDurationMin).value = $event)),
                        type: "number",
                        min: "0",
                        step: "0.5",
                        placeholder: "0",
                        class: "w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded-sm outline-none bg-gray-50"
                      }, null, 512), [
                        [
                          vModelText,
                          callDurationMin.value,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[175] || (_cache[175] = createBaseVNode("label", { class: "block text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1" }, [
                      createBaseVNode("i", { class: "fas fa-pen text-[#2F2E8B] text-[10px]" }),
                      createTextVNode(" Call Notes ")
                    ], -1)),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[60] || (_cache[60] = $event => ((callNote).value = $event)),
                      rows: "2",
                      placeholder: "WHAT WAS DISCUSSED, NEXT STEPS, OBJECTIONS...",
                      class: "w-full border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] px-2 py-1.5 text-[10px] font-mono rounded-sm outline-none bg-gray-50 resize-none"
                    }, null, 512), [
                      [vModelText, callNote.value]
                    ]),
                    _cache[176] || (_cache[176] = createBaseVNode("p", { class: "text-[8px] font-mono text-gray-400 mt-0.5 uppercase tracking-wider flex items-center gap-1" }, [
                      createBaseVNode("i", { class: "fas fa-info-circle text-[#2F2E8B] text-[9px]" }),
                      createTextVNode(" Saved to lead profile and visible in activity log. ")
                    ], -1))
                  ]),
                  (callError.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_169, toDisplayString(callError.value), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_170, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: closeCallModal,
                    class: "px-3.5 py-1.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 rounded-sm transition text-[9px] font-mono font-black uppercase tracking-widest"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: saveCallNote,
                    disabled: savingCall.value || !callNote.value.trim(),
                    class: "px-4 py-1.5 bg-[#2F2E8B] hover:bg-[#3D3A9E] disabled:opacity-50 text-white rounded-sm transition text-[9px] font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5"
                  }, [
                    createBaseVNode("i", {
                      class: normalizeClass(savingCall.value ? 'fas fa-spinner fa-spin' : 'fas fa-save')
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(savingCall.value ? 'SAVING...' : 'Save Note & Log Call'), 1)
                  ], 8, _hoisted_171)
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ])),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (showLeadProfileModal.value)
          ? (openBlock(), createBlock(LeadDetailModal, {
              key: 0,
              modelValue: showLeadProfileModal.value,
              "onUpdate:modelValue": _cache[61] || (_cache[61] = $event => ((showLeadProfileModal).value = $event)),
              lead: selectedLeadForProfile.value,
              users: unref(tenantUsers),
              "pipeline-stages": unref(allPipelineStages),
              onEdit: _cache[62] || (_cache[62] = (l) => { showLeadProfileModal.value = false; unref(editLead)(l); }),
              onCall: _cache[63] || (_cache[63] = (l) => openCallModal(l, 'leads')),
              onWhatsapp: () => { /* handled internally by LeadDetailModal */ },
              onEmail: () => {},
              onDelete: _cache[64] || (_cache[64] = (l) => { deletePipelineRecord(l, 'leads'); showLeadProfileModal.value = false; }),
              onArchive: _cache[65] || (_cache[65] = () => { showLeadProfileModal.value = false; unref(fetchPipelineData)(); }),
              onConvert: _cache[66] || (_cache[66] = (lead) => { showLeadProfileModal.value = false; selectedLeadForConversion.value = lead; showConversionModal.value = true; })
            }, null, 8, ["modelValue", "lead", "users", "pipeline-stages"]))
          : createCommentVNode("", true)
      ])),
      (unref(showConversionModal))
        ? (openBlock(), createBlock(LeadConversionModal, {
            key: 0,
            modelValue: unref(showConversionModal),
            "onUpdate:modelValue": _cache[67] || (_cache[67] = $event => (isRef(showConversionModal) ? (showConversionModal).value = $event : null)),
            lead: unref(selectedLeadForConversion),
            onConverted: unref(handleLeadConverted)
          }, null, 8, ["modelValue", "lead", "onConverted"]))
        : createCommentVNode("", true),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (showAccountProfileModal.value)
          ? (openBlock(), createBlock(AccountDetailModal, {
              key: 0,
              modelValue: showAccountProfileModal.value,
              "onUpdate:modelValue": _cache[68] || (_cache[68] = $event => ((showAccountProfileModal).value = $event)),
              account: selectedAccountForProfile.value,
              users: unref(tenantUsers),
              onRefresh: unref(fetchPipelineData),
              onDelete: _cache[69] || (_cache[69] = () => { showAccountProfileModal.value = false; unref(fetchPipelineData)(); })
            }, null, 8, ["modelValue", "account", "users", "onRefresh"]))
          : createCommentVNode("", true)
      ])),
      (unref(showAccountFormModal))
        ? (openBlock(), createBlock(AccountFormModal, {
            key: 1,
            modelValue: unref(showAccountFormModal),
            "onUpdate:modelValue": _cache[70] || (_cache[70] = $event => (isRef(showAccountFormModal) ? (showAccountFormModal).value = $event : null)),
            account: unref(editingAccount),
            users: unref(tenantUsers),
            onSaved: unref(fetchPipelineData)
          }, null, 8, ["modelValue", "account", "users", "onSaved"]))
        : createCommentVNode("", true),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (unref(showAddStageModal))
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4",
              onClick: _cache[76] || (_cache[76] = withModifiers((...args) => (unref(closeAddStageModal) && unref(closeAddStageModal)(...args)), ["self"]))
            }, [
              createBaseVNode("div", _hoisted_172, [
                _cache[185] || (_cache[185] = createBaseVNode("div", { class: "h-1.5 bg-[#2F2E8B]" }, null, -1)),
                createBaseVNode("div", _hoisted_173, [
                  _cache[178] || (_cache[178] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-50" }, null, -1)),
                  _cache[179] || (_cache[179] = createBaseVNode("div", { class: "relative z-10" }, [
                    createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest leading-none" }, "Config // Structure"),
                    createBaseVNode("h3", { class: "text-xl font-black text-gray-900 uppercase font-outfit tracking-tight" }, "Add Stage")
                  ], -1)),
                  createBaseVNode("button", {
                    onClick: _cache[71] || (_cache[71] = (...args) => (unref(closeAddStageModal) && unref(closeAddStageModal)(...args))),
                    class: "relative z-10 text-gray-400 hover:text-gray-600 transition"
                  }, [...(_cache[177] || (_cache[177] = [
                    createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
                  ]))])
                ]),
                createBaseVNode("form", {
                  onSubmit: _cache[75] || (_cache[75] = withModifiers((...args) => (unref(addCustomStage) && unref(addCustomStage)(...args)), ["prevent"])),
                  class: "p-6 space-y-4"
                }, [
                  createBaseVNode("div", _hoisted_174, [
                    _cache[180] || (_cache[180] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Stage Name *", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[72] || (_cache[72] = $event => ((unref(newStageForm).name) = $event)),
                      type: "text",
                      required: "",
                      placeholder: "E.G. ON HOLD",
                      class: "w-full rounded-none border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm font-mono font-bold uppercase",
                      ref_key: "addStageInputRef",
                      ref: addStageInputRef
                    }, null, 512), [
                      [vModelText, unref(newStageForm).name]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_175, [
                    _cache[183] || (_cache[183] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Position", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[73] || (_cache[73] = $event => ((unref(newStageForm).insertAfter) = $event)),
                      class: "w-full rounded-none border-gray-300 shadow-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] text-sm font-mono font-bold uppercase"
                    }, [
                      _cache[181] || (_cache[181] = createBaseVNode("option", { value: "start" }, "START (FIRST)", -1)),
                      _cache[182] || (_cache[182] = createBaseVNode("option", { value: "end" }, "END (LAST)", -1)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(allPipelineStages), (stage) => {
                        return (openBlock(), createElementBlock("option", {
                          key: stage.id,
                          value: stage.id
                        }, "AFTER -> " + toDisplayString(stage.name), 9, _hoisted_176))
                      }), 128))
                    ], 512), [
                      [vModelSelect, unref(newStageForm).insertAfter]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_177, [
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[74] || (_cache[74] = (...args) => (unref(closeAddStageModal) && unref(closeAddStageModal)(...args))),
                      class: "px-6 py-2.5 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition text-[10px] font-mono font-black uppercase tracking-widest"
                    }, "Cancel"),
                    _cache[184] || (_cache[184] = createBaseVNode("button", {
                      type: "submit",
                      class: "px-6 py-2.5 bg-[#2F2E8B] text-white hover:bg-[#1D226B] text-[10px] font-mono font-black uppercase tracking-widest"
                    }, [
                      createBaseVNode("i", { class: "fas fa-plus mr-2" }),
                      createTextVNode("Create Stage")
                    ], -1))
                  ])
                ], 32)
              ])
            ]))
          : createCommentVNode("", true)
      ]))
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (unref(pipelineConfirm).show)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm bg-black/50",
            onClick: _cache[79] || (_cache[79] = withModifiers((...args) => (unref(pipelineConfirm).onCancel && unref(pipelineConfirm).onCancel(...args)), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_178, [
              createBaseVNode("div", {
                class: normalizeClass(["px-5 py-4 border-b", unref(pipelineConfirm).type === 'danger' ? 'border-red-200 bg-red-50' : unref(pipelineConfirm).type === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-black uppercase tracking-tight", unref(pipelineConfirm).type === 'danger' ? 'text-red-700' : unref(pipelineConfirm).type === 'warning' ? 'text-amber-700' : 'text-gray-900'])
                }, toDisplayString(unref(pipelineConfirm).title), 3)
              ], 2),
              createBaseVNode("div", _hoisted_179, [
                createBaseVNode("p", _hoisted_180, toDisplayString(unref(pipelineConfirm).message), 1),
                createBaseVNode("div", _hoisted_181, [
                  (unref(pipelineConfirm).showCancel)
                    ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        onClick: _cache[77] || (_cache[77] = (...args) => (unref(pipelineConfirm).onCancel && unref(pipelineConfirm).onCancel(...args))),
                        class: "flex-1 px-4 py-2 border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition"
                      }, "Cancel"))
                    : createCommentVNode("", true),
                  createBaseVNode("button", {
                    onClick: _cache[78] || (_cache[78] = (...args) => (unref(pipelineConfirm).onConfirm && unref(pipelineConfirm).onConfirm(...args))),
                    class: normalizeClass(["flex-1 px-4 py-2 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition", unref(pipelineConfirm).type === 'danger' ? 'bg-red-600 hover:bg-red-700' : unref(pipelineConfirm).type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#2F2E8B] hover:bg-[#1D226B]'])
                  }, toDisplayString(unref(pipelineConfirm).showCancel ? 'Confirm' : 'OK'), 3)
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ], 64))
}
}

};
const CRMPipelinePage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a5227688"]]);

export { CRMPipelinePage as default };
