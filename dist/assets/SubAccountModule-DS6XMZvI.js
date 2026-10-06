import { _ as _export_sfc, J as decodeJWT, G as useRBAC, r as ref, i as computed, M as watch, f as onMounted, c as createElementBlock, a as createStaticVNode, b as createBaseVNode, A as createTextVNode, q as createVNode, w as withCtx, W as Transition, t as toDisplayString, x as withDirectives, y as vModelText, L as vModelSelect, F as Fragment, e as renderList, h as normalizeClass, j as createCommentVNode, C as createBlock, v as withModifiers, T as Teleport, I as BASE_URL, u as useRouter, af as DEFAULT_ROLES, o as openBlock, s as unref } from './index-_vIa0xlU.js';
import { u as useCurrency } from './useCurrency-SwMbvF1k.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-w7_0WZk0.js';

const _hoisted_1 = { class: "absa-subaccounts-page" };
const _hoisted_2 = { class: "absa-subaccounts__actions" };
const _hoisted_3 = { class: "absa-subaccounts__btns" };
const _hoisted_4 = { class: "flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8" };
const _hoisted_5 = {
  key: 0,
  class: "absa-alert-info absa-subaccounts__sessions"
};
const _hoisted_6 = { class: "absa-subaccounts__sessions-header" };
const _hoisted_7 = { class: "absa-subaccounts__sessions-title" };
const _hoisted_8 = { class: "absa-subaccounts__sessions-list" };
const _hoisted_9 = { class: "absa-subaccounts__session-avatar" };
const _hoisted_10 = { class: "absa-subaccounts__session-info" };
const _hoisted_11 = { class: "absa-subaccounts__session-name" };
const _hoisted_12 = { class: "absa-subaccounts__session-time" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "absa-subaccounts__kpi-grid" };
const _hoisted_15 = { class: "absa-metric-bg absa-accent-left-maroon" };
const _hoisted_16 = { class: "absa-subaccounts__kpi-body" };
const _hoisted_17 = { class: "absa-subaccounts__kpi-value" };
const _hoisted_18 = { class: "absa-metric-bg absa-accent-left-success" };
const _hoisted_19 = { class: "absa-subaccounts__kpi-body" };
const _hoisted_20 = { class: "absa-subaccounts__kpi-value" };
const _hoisted_21 = { class: "absa-metric-bg absa-accent-left-warning" };
const _hoisted_22 = { class: "absa-subaccounts__kpi-body" };
const _hoisted_23 = { class: "absa-subaccounts__kpi-value absa-subaccounts__kpi-value--sm" };
const _hoisted_24 = { class: "absa-metric-bg absa-accent-left-info" };
const _hoisted_25 = { class: "absa-subaccounts__kpi-body" };
const _hoisted_26 = { class: "absa-subaccounts__kpi-value" };
const _hoisted_27 = { class: "absa-subaccounts__toolbar" };
const _hoisted_28 = { class: "absa-subaccounts__search-wrap" };
const _hoisted_29 = { class: "flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" };
const _hoisted_30 = { class: "absa-subaccounts__select-wrap" };
const _hoisted_31 = ["value"];
const _hoisted_32 = { class: "absa-subaccounts__select-wrap" };
const _hoisted_33 = ["value"];
const _hoisted_34 = { class: "absa-subaccounts__view-toggle" };
const _hoisted_35 = {
  key: 0,
  class: "absa-subaccounts__loading-grid"
};
const _hoisted_36 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10"
};
const _hoisted_37 = ["onClick"];
const _hoisted_38 = { class: "absolute top-0 right-0 py-1 px-3 bg-gray-50 border-b border-l border-gray-100 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest rounded-bl-sm group-hover:bg-[#BE0F2C] group-hover:text-white transition-colors" };
const _hoisted_39 = { class: "relative z-10" };
const _hoisted_40 = { class: "flex items-center gap-4 mb-5" };
const _hoisted_41 = { class: "h-12 w-12 text-[#BE0F2C] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform" };
const _hoisted_42 = { class: "min-w-0" };
const _hoisted_43 = { class: "font-black text-gray-900 group-hover:text-[#BE0F2C] transition-colors truncate uppercase tracking-tight" };
const _hoisted_44 = { class: "text-[10px] font-mono font-bold text-gray-400 truncate mt-0.5" };
const _hoisted_45 = { class: "space-y-3 pb-4" };
const _hoisted_46 = { class: "flex items-center justify-between text-[11px] font-bold text-gray-600 border-b border-gray-50 pb-2" };
const _hoisted_47 = { class: "text-gray-900 truncate max-w-[140px] uppercase" };
const _hoisted_48 = { class: "flex items-center justify-between text-[11px] font-bold text-gray-600" };
const _hoisted_49 = { class: "flex items-center gap-2 pt-4 border-t border-gray-50 relative z-10" };
const _hoisted_50 = ["onClick"];
const _hoisted_51 = ["onClick"];
const _hoisted_52 = ["onClick"];
const _hoisted_53 = {
  key: 0,
  class: "absa-subaccounts__empty absa-dots"
};
const _hoisted_54 = {
  key: 2,
  class: "relative z-10 bg-white border border-gray-200 rounded-sm overflow-hidden shadow-none"
};
const _hoisted_55 = { class: "overflow-x-auto" };
const _hoisted_56 = { class: "w-full text-left border-collapse" };
const _hoisted_57 = { class: "divide-y divide-gray-100" };
const _hoisted_58 = ["onClick"];
const _hoisted_59 = { class: "px-4 py-3" };
const _hoisted_60 = { class: "flex items-center gap-3" };
const _hoisted_61 = { class: "h-9 w-9 shrink-0 rounded-sm bg-[#BE0F2C]/5 flex items-center justify-center font-black text-sm text-[#BE0F2C] group-hover:bg-[#BE0F2C] group-hover:text-white transition-colors" };
const _hoisted_62 = { class: "text-xs font-bold text-gray-900 uppercase tracking-tight" };
const _hoisted_63 = { class: "text-[9px] font-mono text-gray-400" };
const _hoisted_64 = { class: "px-4 py-3" };
const _hoisted_65 = { class: "px-2 py-1 bg-gray-100 border border-gray-200 text-[9px] font-mono font-bold text-gray-600 uppercase rounded-sm" };
const _hoisted_66 = { class: "px-4 py-3" };
const _hoisted_67 = { class: "text-xs font-bold text-gray-700 uppercase" };
const _hoisted_68 = { class: "px-4 py-3" };
const _hoisted_69 = { class: "px-4 py-3 text-right" };
const _hoisted_70 = { class: "flex items-center justify-end gap-1" };
const _hoisted_71 = ["onClick"];
const _hoisted_72 = ["onClick"];
const _hoisted_73 = ["onClick"];
const _hoisted_74 = { key: 0 };
const _hoisted_75 = { class: "absa-subaccounts__pagination" };
const _hoisted_76 = { class: "absa-subaccounts__pagination-info" };
const _hoisted_77 = { class: "absa-subaccounts__pagination-controls" };
const _hoisted_78 = ["disabled"];
const _hoisted_79 = { class: "absa-subaccounts__page-btn absa-subaccounts__page-btn--current" };
const _hoisted_80 = { class: "absa-subaccounts__pagination-info" };
const _hoisted_81 = ["disabled"];
const _hoisted_82 = { class: "relative z-10" };
const _hoisted_83 = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" };
const _hoisted_84 = { class: "space-y-6" };
const _hoisted_85 = { class: "relative" };
const _hoisted_86 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_87 = { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between" };
const _hoisted_88 = { class: "relative" };
const _hoisted_89 = ["value"];
const _hoisted_90 = {
  key: 0,
  class: "mt-1 text-[9px] font-mono text-amber-600"
};
const _hoisted_91 = { class: "relative" };
const _hoisted_92 = ["value"];
const _hoisted_93 = { class: "space-y-6" };
const _hoisted_94 = {
  key: 0,
  class: "text-red-500 text-[10px] font-mono font-bold uppercase bg-red-50 p-3 border border-red-100 rounded-sm flex items-center gap-2"
};
const _hoisted_95 = { class: "flex items-center justify-end gap-3 pt-6 border-t border-gray-100" };
const _hoisted_96 = ["disabled"];
const _hoisted_97 = { key: 0 };
const _hoisted_98 = { key: 1 };
const _hoisted_99 = { class: "relative z-10" };
const _hoisted_100 = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" };
const _hoisted_101 = { class: "space-y-6" };
const _hoisted_102 = { class: "relative" };
const _hoisted_103 = { class: "space-y-6" };
const _hoisted_104 = { class: "flex items-center justify-end gap-3 pt-6 border-t border-gray-100" };
const _hoisted_105 = ["disabled"];
const _hoisted_106 = { key: 0 };
const _hoisted_107 = { key: 1 };
const _hoisted_108 = { class: "relative z-10" };
const _hoisted_109 = { class: "flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100" };
const _hoisted_110 = { class: "space-y-4 sm:space-y-6 pt-1 sm:pt-2" };
const _hoisted_111 = { class: "flex flex-col sm:flex-row items-start sm:items-center justify-between bg-orange-50 p-3 sm:p-4 border border-orange-100 rounded-sm border-l-4 border-l-orange-500 gap-3 sm:gap-4" };
const _hoisted_112 = { class: "border border-gray-200 rounded-sm overflow-hidden overflow-x-auto" };
const _hoisted_113 = { class: "w-full text-left border-collapse min-w-[600px]" };
const _hoisted_114 = { class: "divide-y divide-gray-100" };
const _hoisted_115 = { class: "px-3 sm:px-4 py-3 sm:py-4" };
const _hoisted_116 = { class: "text-[11px] sm:text-xs font-bold text-gray-900 uppercase tracking-tight" };
const _hoisted_117 = { class: "text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase mt-0.5" };
const _hoisted_118 = { class: "sm:hidden mt-1" };
const _hoisted_119 = {
  key: 0,
  class: "px-1.5 py-0.5 bg-green-50 text-green-600 text-[8px] font-mono font-black uppercase rounded-sm border border-green-100"
};
const _hoisted_120 = {
  key: 1,
  class: "px-1.5 py-0.5 bg-red-50 text-red-600 text-[8px] font-mono font-black uppercase rounded-sm border border-red-100"
};
const _hoisted_121 = { class: "px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell" };
const _hoisted_122 = { class: "text-[9px] sm:text-[10px] font-mono font-bold text-gray-500" };
const _hoisted_123 = { class: "text-[8px] sm:text-[9px] font-mono text-gray-400 lowercase" };
const _hoisted_124 = { class: "px-3 sm:px-4 py-3 sm:py-4" };
const _hoisted_125 = { class: "px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[8px] sm:text-[9px] font-mono font-black uppercase rounded-sm border border-gray-200" };
const _hoisted_126 = { class: "px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell" };
const _hoisted_127 = {
  key: 0,
  class: "px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-mono font-black uppercase rounded-sm border border-green-100"
};
const _hoisted_128 = {
  key: 1,
  class: "px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-mono font-black uppercase rounded-sm border border-red-100"
};
const _hoisted_129 = { class: "px-2 sm:px-4 py-3 sm:py-4 text-right" };
const _hoisted_130 = { class: "flex items-center justify-end gap-1 sm:gap-2" };
const _hoisted_131 = ["onClick", "title"];
const _hoisted_132 = ["onClick"];
const _hoisted_133 = ["onClick"];
const _hoisted_134 = { key: 0 };
const _hoisted_135 = { class: "flex justify-end pt-4 border-t border-gray-100" };
const _hoisted_136 = { class: "p-6 space-y-4" };
const _hoisted_137 = { class: "bg-red-50 border border-red-100 rounded-sm p-4" };
const _hoisted_138 = { class: "text-[10px] font-mono font-bold text-red-800 uppercase tracking-widest leading-relaxed" };
const _hoisted_139 = { class: "text-red-900" };
const _hoisted_140 = {
  key: 0,
  class: "mt-2 text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest"
};
const _hoisted_141 = { class: "flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50" };
const _hoisted_142 = ["disabled"];
const _hoisted_143 = { key: 0 };
const _hoisted_144 = { key: 1 };
const _hoisted_145 = { class: "relative z-10" };
const _hoisted_146 = { class: "flex items-center justify-between mb-6 pb-4 border-b border-gray-100" };
const _hoisted_147 = { class: "flex items-center gap-4" };
const _hoisted_148 = { class: "text-sm font-black text-gray-900 uppercase tracking-tight" };
const _hoisted_149 = { class: "border-b border-gray-100 mb-8 flex gap-8" };
const _hoisted_150 = {
  key: 0,
  class: "space-y-8"
};
const _hoisted_151 = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6" };
const _hoisted_152 = { class: "space-y-6" };
const _hoisted_153 = { class: "space-y-6" };
const _hoisted_154 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_155 = { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between" };
const _hoisted_156 = { class: "relative" };
const _hoisted_157 = ["value"];
const _hoisted_158 = {
  key: 0,
  class: "mt-1 text-[9px] font-mono text-amber-600"
};
const _hoisted_159 = { class: "relative" };
const _hoisted_160 = ["value"];
const _hoisted_161 = { class: "flex justify-end pt-8 gap-3 border-t border-gray-100" };
const _hoisted_162 = ["disabled"];
const _hoisted_163 = { key: 0 };
const _hoisted_164 = { key: 1 };
const _hoisted_165 = {
  key: 1,
  class: "space-y-6"
};
const _hoisted_166 = { class: "bg-maroon-soft-bg p-5 rounded-sm border border-maroon-soft-border border-l-4 border-l-[#BE0F2C]" };
const _hoisted_167 = { class: "flex gap-4" };
const _hoisted_168 = { class: "text-[10px] font-mono font-bold text-indigo-900 uppercase tracking-wider mt-1.5 leading-relaxed" };
const _hoisted_169 = { class: "text-[#BE0F2C]" };
const _hoisted_170 = { class: "flex justify-between items-center mb-4" };
const _hoisted_171 = { class: "relative" };
const _hoisted_172 = ["value"];
const _hoisted_173 = {
  key: 0,
  class: "text-center py-12 bg-gray-50 rounded-sm border border-dashed border-gray-200"
};
const _hoisted_174 = {
  key: 1,
  class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
};
const _hoisted_175 = ["onClick"];
const _hoisted_176 = { class: "text-[10px] font-mono font-black text-gray-800 uppercase tracking-widest" };
const _hoisted_177 = {
  key: 0,
  class: "text-[#BE0F2C]"
};
const _hoisted_178 = {
  key: 1,
  class: "text-[#BE0F2C] flex items-center justify-center"
};
const _hoisted_179 = {
  key: 2,
  class: "text-gray-300 group-hover:text-gray-400"
};
const _hoisted_180 = {
  key: 0,
  class: "col-span-3 text-center text-gray-400 py-12 border-2 border-dashed border-gray-100 rounded-sm"
};
const _hoisted_181 = { class: "relative z-10" };
const _hoisted_182 = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" };
const _hoisted_183 = { class: "space-y-6" };
const _hoisted_184 = { class: "relative" };
const _hoisted_185 = { class: "space-y-6" };
const _hoisted_186 = { class: "flex items-center justify-end gap-3 pt-6 border-t border-gray-100" };
const _hoisted_187 = ["disabled"];
const _hoisted_188 = { key: 0 };
const _hoisted_189 = { key: 1 };


const STORAGE_KEY = 'subaccount_sessions';

// View Mode: 'cards' | 'list'
const pageSize = 8;


const _sfc_main = {
  __name: 'SubAccountModule',
  setup(__props) {

useCurrency();
const { getTenantId } = decodeJWT();
const router = useRouter();

// RBAC integration for roles
const { tenantRoles, fetchRoles, initializeRBAC } = useRBAC();

// State
const subAccounts = ref([]);
const branches = ref([]); // Shops/branches list
const loading = ref(false);
const error = ref('');
const profile = ref({});
const subscription = ref(null);
const currentTier = computed(() => subscription.value || {});


const showCreateModal = ref(false);
ref(false);
const showBranchModal = ref(false); // Modal to create new branch
const showManageBranchesModal = ref(false); // Modal to manage/delete branches
ref(null);
ref('');
const showDeleteBranchModal = ref(false);
const branchPendingDelete = ref(null);
const branchDeleteConfirmation = ref('');
const branchDeleteError = ref('');
const branchDeleteLoading = ref(false);


const newAccount = ref({ name: '', email: '', password: '', confirmPassword: '', role: 'attendant', branch_id: null, pin: '' });
const newBranch = ref({ name: '', location: '', phone: '', email: '' });
const showEditBranchModal = ref(false);
const editBranchData = ref({ _id: '', name: '', location: '', phone: '', email: '' });

// Computed roles from RBAC (fallback to defaults if not loaded)
const roles = computed(() => {
  if (tenantRoles.value && tenantRoles.value.length > 0) {
    return tenantRoles.value;
  }
  // Fallback default roles (admin/super_admin intentionally omitted — managed from Admin dashboard)
  return [
    { id: 'manager', name: 'Manager' },
    { id: 'cashier', name: 'Cashier' },
    { id: 'attendant', name: 'Attendant' },
    { id: 'hotel_attendant', name: 'Hotel Staff' },
    // { id: 'kitchen', name: 'Kitchen' },
  ];
});

// Role hierarchy filtering - users can only create users with equal or lower roles
const _roleHierarchy = ['attendant', 'hotel_attendant', 'cashier', 'accountant', 'auditor', 'manager', 'admin', 'super_admin', 'owner'];
const currentUserRoleId = computed(() => String(localStorage.getItem('role') || 'attendant').toLowerCase().trim());

const availableRoles = computed(() => {
  const currentUserRole = currentUserRoleId.value;
  const currentUserLevel = _roleHierarchy.indexOf(currentUserRole);

  // admin / super_admin roles are managed exclusively from the Admin dashboard
  // and must NEVER appear in the User Management role dropdown.
  const ADMIN_ONLY = new Set(['admin', 'super_admin', 'superadmin']);
  const ADMIN_ONLY_NAMES = new Set(['admin', 'super admin', 'superadmin']);
  const isAdminOnly = (r) => {
    const id = String(r?.id || r || '').toLowerCase().trim();
    const name = String(r?.name || '').toLowerCase().trim();
    return ADMIN_ONLY.has(id) || ADMIN_ONLY_NAMES.has(name);
  };

  // Owner / admin / super_admin can assign any role except admin/super_admin
  if (['owner', 'admin', 'super_admin'].includes(currentUserRole)) {
    return roles.value.filter(r => {
      r.id || r;
      if (isAdminOnly(r)) return false;
      return true;
    });
  }
  
  try {
    return roles.value.filter(r => {
      const roleId = r.id || r;
      if (roleId === 'super_admin') return false;
      if (isAdminOnly(r)) return false;
      const roleLevel = _roleHierarchy.indexOf(roleId);
      // If roleId is not in hierarchy (custom role), allow it
      if (roleLevel < 0) return true;
      // Allow equal or lower level roles
      return roleLevel <= currentUserLevel;
    });
  } catch (e) {
    console.error('Error filtering roles:', e);
    return roles.value;
  }
});

const availableCreateRoles = computed(() => availableRoles.value);

const availableAssignableRoles = computed(() => {
  const assignable = [...availableRoles.value];
  if (currentUserRoleId.value !== 'owner') return assignable;
  const hasOwner = assignable.some(r => String(r?.id || r || '').toLowerCase().trim() === 'owner');
  if (hasOwner) return assignable;
  const ownerRole = roles.value.find(r => String(r?.id || r || '').toLowerCase().trim() === 'owner');
  return ownerRole ? [...assignable, ownerRole] : assignable;
});

// Branch filtering - non-admin users can only assign to their own branch
const availableBranches = computed(() => {
  const currentUserRole = localStorage.getItem('role') || 'attendant';
  const currentUserBranchId = localStorage.getItem('branch_id');
  
  // Owners and admins can assign to any branch
  if (['owner', 'admin', 'super_admin'].includes(currentUserRole)) {
    return branches.value;
  }
  
  // Other users can only assign to their own branch
  if (currentUserBranchId) {
    return branches.value.filter(b => b._id === currentUserBranchId);
  }
  
  return branches.value;
});

// Sub-account session management
const subAccountSessions = ref(new Map()); // Map<subAccountId, sessionInfo>
const viewMode = ref(localStorage.getItem('subaccount_view_mode') || 'cards');

// Persist view mode preference
watch(viewMode, (mode) => {
  localStorage.setItem('subaccount_view_mode', mode);
});

// Filters & Pagination
const search = ref('');
const filterRole = ref('');
const filterBranch = ref('');
const page = ref(1);
const fetchTenantProfile = async () => {
  try {
    const tenantId = getTenantId();
    const res = await fetch(`${BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
    if (res.ok) {
      profile.value = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch profile', e);
  }
};
  const fetchOwnerSubscription = async () => {
    try {
      const tenantId = getTenantId();
      const res = await fetch(`${BASE_URL}/modules-manager/owner/subscription?tenant_id=${tenantId}`);
      if (!res.ok) throw new Error('Failed to fetch owner subscription');
      const data = await res.json();
      subscription.value = data || { tier: null, payment_plan: null, modules: [] };
    } catch (e) {
      console.warn('Failed to fetch owner subscription', e);
      subscription.value = { tier: null, payment_plan: null, modules: [] };
    }
  };

const checkLimit = async (type) => {
  await fetchOwnerSubscription();
  await fetchBranches();
  
  // Use custom limits from approved subscription first, fall back to tier defaults
  const sub = subscription.value || {};
  const tier = currentTier.value || {};

  console.log('[checkLimit]', type, { custom_users: sub.custom_users, custom_branches: sub.custom_branches, tierMaxUsers: tier.maxUsers, tierMaxBranches: tier.maxBranches });

  if (type === 'user') {
    const maxUsers = (sub.custom_users != null && sub.custom_users !== '') ? Number(sub.custom_users) : tier.maxUsers;
    if (maxUsers && totalSubAccounts.value + 1 > maxUsers) {
      if (confirm(`You have reached the limit for users in your ${tier.label || 'current'} plan (${maxUsers} users). Would you like to upgrade your plan?`)) {
        router.push('/dashboard/settings?tab=modules');
      }
      return false;
    }
  } else if (type === 'branch') {
     const maxBranches = (sub.custom_branches != null && sub.custom_branches !== '') ? Number(sub.custom_branches) : tier.maxBranches;
     const totalActualBranches = branches.value.length + 1;
     if (maxBranches && totalActualBranches > maxBranches) {
       if (confirm(`You have reached the limit for branches in your ${tier.label || 'current'} plan (${maxBranches} branches). Would you like to upgrade your plan?`)) {
         router.push('/dashboard/settings?tab=modules');
       }
       return false;
     }
  }
  return true;
};

const handleAddUserClick = async () => {
  if (await checkLimit('user')) {
    // Refresh tenant roles (including custom roles created in Settings) so the dropdown
    // always reflects the latest list before opening the modal.
    try { await fetchRoles(); } catch (e) { console.warn('[handleAddUserClick] fetchRoles failed', e); }
    // If the currently selected default role no longer exists in the refreshed list,
    // fall back to the first available option.
    const firstAvailable = availableRoles.value[0];
    if (firstAvailable) {
      const exists = availableRoles.value.some(r => (r.id || r) === newAccount.value.role);
      if (!exists) newAccount.value.role = firstAvailable.id || firstAvailable;
    }
    showCreateModal.value = true;
  }
};

const handleAddBranchClick = async () => {
  if (await checkLimit('branch')) {
    showBranchModal.value = true;
  }
};

// Fetch branches from subaccounts API

const fetchBranches = async () => {
  try {
    const url = `${BASE_URL}/subaccounts/branches/list?tenant_id=${getTenantId()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch branches');
    const data = await res.json();
    const fetched = Array.isArray(data) ? data : [];
    branches.value = [{ _id: 'main', name: 'Main Branch', location: 'Headquarters' }, ...fetched];
  } catch (e) {
    console.warn('Failed to fetch branches', e);
    branches.value = [{ _id: 'main', name: 'Main Branch', location: 'Headquarters' }];
  }
};

// Create new branch
const createBranch = async () => {
  if (!newBranch.value.name || !newBranch.value.location) {
    alert('Branch name and location are required');
    return;
  }
  try {
    loading.value = true;
    const url = `${BASE_URL}/subaccounts/branches`;
    // Build payload, only include non-empty optional fields
    const payload = {
      name: newBranch.value.name,
      location: newBranch.value.location,
      tenant_id: getTenantId()
    };
    if (newBranch.value.phone) payload.phone = newBranch.value.phone;
    if (newBranch.value.email) payload.email = newBranch.value.email;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Create branch failed');
    await fetchBranches();
    closeBranchModal();
    alert('Branch created successfully!');
  } catch (e) {
    console.error('Failed to create branch', e);
    alert('Failed to create branch.');
  } finally {
    loading.value = false;
  }
};

const closeBranchModal = () => {
  showBranchModal.value = false;
  newBranch.value = { name: '', location: '', phone: '', email: '' };
};

const toggleBranchStatus = async (branch) => {
  try {
    loading.value = true;
    const newStatus = branch.status === 'active' ? 'inactive' : 'active';
    const url = `${BASE_URL}/subaccounts/branches/${branch._id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Toggle failed');
    await fetchBranches();
  } catch (e) {
    console.error('Failed to toggle branch status', e);
    alert('Failed to update status');
  } finally {
    loading.value = false;
  }
};

const handleEditBranch = (branch) => {
  editBranchData.value = {
    _id: branch._id,
    name: branch.name,
    location: branch.location,
    phone: branch.phone || '',
    email: branch.email || ''
  };
  showEditBranchModal.value = true;
};

const closeEditBranchModal = () => {
  showEditBranchModal.value = false;
  editBranchData.value = { _id: '', name: '', location: '', phone: '', email: '' };
};

const updateBranch = async () => {
  if (!editBranchData.value.name || !editBranchData.value.location) {
    alert('Name and location are required');
    return;
  }
  try {
    loading.value = true;
    const url = `${BASE_URL}/subaccounts/branches/${editBranchData.value._id}?tenant_id=${getTenantId()}`;
    const payload = {
      name: editBranchData.value.name,
      location: editBranchData.value.location,
      phone: editBranchData.value.phone || null,
      email: editBranchData.value.email || null
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Update branch failed');
    await fetchBranches();
    closeEditBranchModal();
    alert('Branch updated successfully!');
  } catch (e) {
    console.error('Failed to update branch', e);
    alert('Failed to update branch: ' + e.message);
  } finally {
    loading.value = false;
  }
};

const confirmDeleteBranch = async () => {
  const branch = branchPendingDelete.value;
  if (!branch) return;

  if (branchDeleteConfirmation.value.trim().toUpperCase() !== 'DELETE') {
    branchDeleteError.value = 'Type DELETE exactly to confirm this irreversible action.';
    return;
  }

  try {
    branchDeleteLoading.value = true;
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}/subaccounts/branches/${branch._id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Delete failed');
    }

    await fetchBranches();
    await fetchSubAccounts();
    closeDeleteBranchModal();
    alert(`Branch "${branch.name}" was deleted successfully.`);
  } catch (e) {
    console.error('Branch deletion failed', e);
    branchDeleteError.value = `Failed to delete branch: ${e.message}`;
  } finally {
    branchDeleteLoading.value = false;
  }
};

// Get branch name by ID
const getBranchName = (branchId) => {
  if (!branchId || branchId === null) {
    return 'Master Account';
  }
  const branch = branches.value.find(b => b._id === branchId || b.id === branchId);
  return branch?.name || 'No Branch';
};

const fetchSubAccounts = async () => {
  loading.value = true;
  error.value = '';
  try {
    const url = `${BASE_URL}/subaccounts/?tenant_id=${getTenantId()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch sub-accounts');
    const data = await res.json();
    // Expect array of { id, name, email, role, branch_id, usersCount, sales, users: [] }
    subAccounts.value = Array.isArray(data) ? data : (data.subaccounts || []);
  } catch (e) {
    console.warn('subaccounts API failed, falling back to empty list', e);
    subAccounts.value = subAccounts.value.length ? subAccounts.value : [];
    error.value = 'Failed to load sub-accounts (showing cached)';
  } finally {
    loading.value = false;
  }
};

const createSubAccount = async () => {
  if (!newAccount.value.name || !newAccount.value.email || !newAccount.value.password) {
    alert('Name, email, and password are required');
    return;
  }

  try {
    loading.value = true;
    const url = `${BASE_URL}/subaccounts/`;
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...newAccount.value, tenant_id: getTenantId() })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Create failed');
    }
    await fetchSubAccounts();
    closeCreateModal();
    alert('Sub-account created successfully!');
  } catch (e) {
    console.error('Failed to create sub-account', e);
    alert('Failed to create sub-account: ' + e.message);
  } finally {
    loading.value = false;
  }
};

const deleteSubAccount = async (acc) => {
  if (!confirm(`Delete sub-account ${acc.name}?`)) return;
  try {
    const url = `${BASE_URL}/subaccounts/${acc.id}?tenant_id=${getTenantId()}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await fetchSubAccounts();
  } catch (e) {
    console.error('Delete failed', e);
    alert('Failed to delete sub-account');
  }
};

const confirmDelete = (acc) => deleteSubAccount(acc);

const closeCreateModal = () => {
  showCreateModal.value = false;
  newAccount.value = { name: '', email: '', password: '', confirmPassword: '', role: 'attendant', branch_id: null, pin: '' };
};

const openDeleteBranchModal = (branch) => {
  branchPendingDelete.value = branch;
  branchDeleteConfirmation.value = '';
  branchDeleteError.value = '';
  branchDeleteLoading.value = false;
  showDeleteBranchModal.value = true;
};

const closeDeleteBranchModal = () => {
  showDeleteBranchModal.value = false;
  branchPendingDelete.value = null;
  branchDeleteConfirmation.value = '';
  branchDeleteError.value = '';
  branchDeleteLoading.value = false;
};

// Derived data
const filtered = computed(() => {
  let items = (subAccounts.value || []).slice();
  if (search.value) {
    const s = search.value.toLowerCase();
    items = items.filter(a => (a.name || '').toLowerCase().includes(s) || (a.email || '').toLowerCase().includes(s));
  }
  if (filterRole.value) items = items.filter(a => a.role === filterRole.value);
  if (filterBranch.value) items = items.filter(a => a.branch_id === filterBranch.value);
  return items;
});

const totalSubAccounts = computed(() => subAccounts.value.length);
const totalBranches = computed(() => branches.value.length);
computed(() => subAccounts.value.reduce((sum, a) => sum + (a.usersCount || (a.users ? a.users.length : 0) || 0), 0));
computed(() => subAccounts.value.reduce((sum, a) => sum + (Number(a.sales) || 0), 0));

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

const prevPage = () => { if (page.value > 1) page.value--; };
const nextPage = () => { if (page.value < totalPages.value) page.value++; };

const applySearch = () => { page.value = 1; };
const refresh = () => fetchSubAccounts();



// Sub-account session management functions
const loadSessions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const sessions = JSON.parse(stored);
      subAccountSessions.value = new Map(Object.entries(sessions));
    }
  } catch (e) {
    console.error('Failed to load sub-account sessions:', e);
    subAccountSessions.value = new Map();
  }
};

const saveSessions = () => {
  try {
    const sessionsObj = Object.fromEntries(subAccountSessions.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionsObj));
  } catch (e) {
    console.error('Failed to save sub-account sessions:', e);
  }
};

const loginToSubAccount = async (subAccount) => {
  try {
    // Store the original tenant owner's token before switching
    const originalToken = localStorage.getItem('token');
    const originalRole = localStorage.getItem('role');
    const originalEmail = localStorage.getItem('email');
    const originalUserId = localStorage.getItem('user_id');
    
    if (!localStorage.getItem('original_tenant_token')) {
      // First time logging into a sub-account, save original credentials
      localStorage.setItem('original_tenant_token', originalToken);
      localStorage.setItem('original_tenant_role', originalRole);
      localStorage.setItem('original_tenant_email', originalEmail);
      localStorage.setItem('original_tenant_user_id', originalUserId);
    }

    // Call backend impersonate endpoint to get sub-account JWT token
    const url = `${BASE_URL}/subaccounts/${subAccount.id}/impersonate?tenant_id=${getTenantId()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${originalToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Failed to impersonate sub-account' }));
      throw new Error(errorData.detail || 'Failed to impersonate sub-account');
    }

    const data = await res.json();
    
    // Update localStorage with sub-account JWT token and credentials
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.subaccount_email);
    localStorage.setItem('user_id', data.subaccount_id);
    localStorage.setItem('active_subaccount_id', subAccount.id);
    localStorage.setItem('active_subaccount_email', data.subaccount_email);
    localStorage.setItem('active_subaccount_name', data.subaccount_name);
    
    const sessionInfo = {
      subAccountId: subAccount.id,
      subAccountName: data.subaccount_name,
      subAccountEmail: data.subaccount_email,
      role: data.role,
      loginTime: new Date().toLocaleString(),
      timestamp: Date.now()
    };
    
    subAccountSessions.value.set(subAccount.id, sessionInfo);
    saveSessions();
    
    // Emit event to refresh CRM data with new sub-account context
    window.dispatchEvent(new CustomEvent('subaccount-context-changed', { 
      detail: { 
        type: 'login',
        subAccountEmail: data.subaccount_email,
        subAccountId: subAccount.id,
        subAccountName: data.subaccount_name
      } 
    }));
    
    // Show success notification
    alert(`Successfully logged into ${data.subaccount_name}!\n\nCRM data will now show ${data.subaccount_name}'s isolated data.`);
    
  } catch (error) {
    console.error('Login to sub-account failed:', error);
    alert(`Failed to login to sub-account: ${error.message || 'Please try again.'}`);
  }
};

const logoutFromSubAccount = async (subAccountId) => {
  try {
    const session = subAccountSessions.value.get(subAccountId);
    if (!session) return;

    // Restore original tenant owner's credentials
    const originalToken = localStorage.getItem('original_tenant_token');
    const originalRole = localStorage.getItem('original_tenant_role');
    const originalEmail = localStorage.getItem('original_tenant_email');
    const originalUserId = localStorage.getItem('original_tenant_user_id');
    
    if (originalToken) {
      localStorage.setItem('token', originalToken);
      localStorage.setItem('role', originalRole);
      localStorage.setItem('email', originalEmail);
      localStorage.setItem('user_id', originalUserId);
      
      // Clean up original credentials if no more active sessions
      if (subAccountSessions.value.size <= 1) {
        localStorage.removeItem('original_tenant_token');
        localStorage.removeItem('original_tenant_role');
        localStorage.removeItem('original_tenant_email');
        localStorage.removeItem('original_tenant_user_id');
      }
    }
    
    // Clear sub-account context
    localStorage.removeItem('active_subaccount_id');
    localStorage.removeItem('active_subaccount_email');
    localStorage.removeItem('active_subaccount_role');

    subAccountSessions.value.delete(subAccountId);
    saveSessions();
    
    // Emit event to refresh CRM data with tenant owner context
    window.dispatchEvent(new CustomEvent('subaccount-context-changed', { 
      detail: { 
        type: 'logout',
        restoredToTenant: true 
      }
    }));
    
    alert(`Logged out of ${session.subAccountName} successfully.`);
    window.location.reload(); 
    
  } catch (error) {
    console.error('Logout from sub-account failed:', error);
    alert('Failed to logout from sub-account.');
  }
};

const isLoggedInToSubAccount = (subAccountId) => {
  return subAccountSessions.value.has(subAccountId);
};

const logoutFromAllSubAccounts = () => {
    subAccountSessions.value.clear();
    saveSessions();
    // restore logic if needed...
    if (localStorage.getItem('original_tenant_token')) {
        const originalToken = localStorage.getItem('original_tenant_token');
        const originalRole = localStorage.getItem('original_tenant_role');
        const originalEmail = localStorage.getItem('original_tenant_email');
        const originalUserId = localStorage.getItem('original_tenant_user_id');

        localStorage.setItem('token', originalToken);
        localStorage.setItem('role', originalRole);
        localStorage.setItem('email', originalEmail);
        localStorage.setItem('user_id', originalUserId);

        localStorage.removeItem('original_tenant_token');
        localStorage.removeItem('original_tenant_role');
        localStorage.removeItem('original_tenant_email');
        localStorage.removeItem('original_tenant_user_id');
        localStorage.removeItem('active_subaccount_id');
        localStorage.removeItem('active_subaccount_email');
        localStorage.removeItem('active_subaccount_name');
        
        window.location.reload();
    }
};

// --- Subaccount Details & Modules Logic ---
const showDetailsModal = ref(false);
const selectedSubAccount = ref(null);
const detailsTab = ref('profile'); 
const availableModules = ref([]);
const assignedModules = ref([]); 
const editProfile = ref({ name: '', email: '', role: '', password: '', confirmPassword: '', pin: '' });
const modulesLoading = ref(false);
const roleFilter = ref(''); // New state for filter

// Computed modules based on filter
const filteredModules = computed(() => {
   const modules = availableModules.value || [];
   if (!roleFilter.value) return modules;
   
   const roleDef = DEFAULT_ROLES.find(r => (r.id || r) === roleFilter.value);
   if (!roleDef || !roleDef.permissions) return modules;
   
   return modules.filter(mod => {
      if (!mod || !mod.id) return false;
      const perms = roleDef.permissions[mod.id];
      // Show module if the role has any permission for it
      return Array.isArray(perms) && perms.length > 0;
   });
});

const openDetailsModal = async (acc) => {
  if (!acc) return;
  
  selectedSubAccount.value = acc;
  // Refresh tenant roles so the Assign Role dropdown reflects the latest list
  // (custom roles created in Settings, plus removals of admin/super_admin).
  try { await fetchRoles(); } catch (e) { console.warn('[openDetailsModal] fetchRoles failed', e); }
  editProfile.value = { 
    name: acc.name || '', 
    email: acc.email || '', 
    role: acc.role || 'attendant',
    branch_id: acc.branch_id || null,
    password: '', 
    confirmPassword: '',
    pin: acc.pin || '' 
  };
  detailsTab.value = 'profile';
  roleFilter.value = ''; // Reset filter
  
  // Reset modules state before fetching
  assignedModules.value = [];
  
  showDetailsModal.value = true;
  
  try {
    // Prefetch modules
    await Promise.all([
      fetchAvailableModules(),
      fetchAssignedModules(acc.email)
    ]);
  } catch (err) {
    console.error('Error opening details modal:', err);
  }
};

// ... (rest of the file)

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedSubAccount.value = null;
  assignedModules.value = [];
};

const fetchAvailableModules = async () => {
  try {
     const url = `${BASE_URL}/modules-manager/available`;
     const res = await fetch(url);
     if (res.ok) {
        const data = await res.json();
        availableModules.value = Array.isArray(data.modules) ? data.modules : [];
     }
  } catch(e) {
     console.error('Failed to fetch available modules', e);
  }
};

const fetchAssignedModules = async (email) => {
  if (!email) return;
  modulesLoading.value = true;
  try {
     const url = `${BASE_URL}/modules-manager/attendant/modules?attendant_email=${email}&tenant_id=${getTenantId()}`;
     const res = await fetch(url);
     if (res.ok) {
        const data = await res.json();
        assignedModules.value = Array.isArray(data.modules) ? data.modules : [];
     } else {
        // 404 or other non-ok status is a valid state (no modules assigned)
        assignedModules.value = [];
     }
  } catch(e) {
     console.warn('Failed to fetch assigned modules', e);
     assignedModules.value = [];
  } finally {
     modulesLoading.value = false;
  }
};

const saveProfile = async () => {
    if (editProfile.value.password && editProfile.value.password !== editProfile.value.confirmPassword) {
       alert('Passwords do not match');
       return;
    }
    
    try {
       loading.value = true;
       const url = `${BASE_URL}/subaccounts/${selectedSubAccount.value.id}?tenant_id=${getTenantId()}`;
       const payload = {
          name: editProfile.value.name,
          role: editProfile.value.role,
          branch_id: editProfile.value.branch_id
       };
       if (editProfile.value.password) {
          payload.password = editProfile.value.password;
       }
       
       const res = await fetch(url, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
       });
       
       if (!res.ok) throw new Error('Update failed');
       
       alert('Profile updated successfully');
       await fetchSubAccounts(); // Refresh list
    } catch(e) {
       console.error('Update profile failed', e);
       alert('Failed to update profile');
    } finally {
       loading.value = false;
    }
};

// Module saving and toggling functions removed to enforce role-based access only.

const savingModules = ref(false);
const togglingModuleId = ref(null);

async function toggleModuleAssignment(moduleId) {
  if (!selectedSubAccount.value?.email || savingModules.value) return;
  
  savingModules.value = true;
  togglingModuleId.value = moduleId;
  
  try {
    const currentModules = [...assignedModules.value];
    let newModules;
    
    if (currentModules.includes(moduleId)) {
      newModules = currentModules.filter(id => id !== moduleId);
    } else {
      newModules = [...currentModules, moduleId];
    }
    
    const tenantId = getTenantId();
    const res = await fetch(`${BASE_URL}/modules-manager/attendant/modules/assign?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attendant_email: selectedSubAccount.value.email,
        modules: newModules
      })
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to update modules');
    }
    
    const data = await res.json();
    assignedModules.value = Array.isArray(data.modules) ? data.modules : newModules;
  } catch (e) {
    console.error('Failed to toggle module:', e);
    alert(e.message || 'Failed to update module access');
  } finally {
    savingModules.value = false;
    togglingModuleId.value = null;
  }
}

// Computed properties for active sessions
const activeSessions = computed(() => {
  return Array.from(subAccountSessions.value.values()).sort((a, b) => b.timestamp - a.timestamp);
});

// Auto-cleanup expired sessions (optional - sessions expire after 24 hours)
const cleanupExpiredSessions = () => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  let hasExpired = false;
  for (const [subAccountId, session] of subAccountSessions.value.entries()) {
    if (now - session.timestamp > maxAge) {
      subAccountSessions.value.delete(subAccountId);
      hasExpired = true;
    }
  }
  
  if (hasExpired) {
    saveSessions();
  }
};

onMounted(async () => {
  loadSessions();
  await fetchTenantProfile();
  await fetchBranches();
  await fetchSubAccounts();
  await initializeRBAC();
  cleanupExpiredSessions();
  
  // Set up periodic cleanup
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000); // Check every hour
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[160] || (_cache[160] = createStaticVNode("<div class=\"absa-subaccounts__breadcrumb\" data-v-4716d3d8><span data-v-4716d3d8>Home</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-4716d3d8><polyline points=\"9 18 15 12 9 6\" data-v-4716d3d8></polyline></svg><span data-v-4716d3d8>Dashboard</span><svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" data-v-4716d3d8><polyline points=\"9 18 15 12 9 6\" data-v-4716d3d8></polyline></svg><span class=\"absa-subaccounts__breadcrumb-current\" data-v-4716d3d8>User Management</span></div>", 1)),
    createBaseVNode("div", _hoisted_2, [
      _cache[45] || (_cache[45] = createBaseVNode("h1", { class: "absa-subaccounts__title" }, "User Management", -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("button", {
          onClick: handleAddBranchClick,
          class: "absa-subaccounts__btn absa-subaccounts__btn--outline"
        }, [...(_cache[42] || (_cache[42] = [
          createBaseVNode("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5"
          }, [
            createBaseVNode("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
            createBaseVNode("polyline", { points: "9 22 9 12 15 12 15 22" })
          ], -1),
          createTextVNode(" Add Branch ", -1)
        ]))]),
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = $event => (showManageBranchesModal.value = true)),
          class: "absa-subaccounts__btn absa-subaccounts__btn--outline"
        }, [...(_cache[43] || (_cache[43] = [
          createBaseVNode("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5"
          }, [
            createBaseVNode("circle", {
              cx: "12",
              cy: "12",
              r: "3"
            }),
            createBaseVNode("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
          ], -1),
          createTextVNode(" Manage Branches ", -1)
        ]))]),
        createBaseVNode("button", {
          onClick: handleAddUserClick,
          class: "absa-subaccounts__btn absa-subaccounts__btn--primary"
        }, [...(_cache[44] || (_cache[44] = [
          createBaseVNode("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5"
          }, [
            createBaseVNode("line", {
              x1: "12",
              y1: "5",
              x2: "12",
              y2: "19"
            }),
            createBaseVNode("line", {
              x1: "5",
              y1: "12",
              x2: "19",
              y2: "12"
            })
          ], -1),
          createTextVNode(" New User ", -1)
        ]))])
      ])
    ]),
    createBaseVNode("div", _hoisted_4, [
      createVNode(Transition, {
        "enter-active-class": "transition duration-300 ease-out",
        "enter-from-class": "transform -translate-y-2 opacity-0",
        "enter-to-class": "transform translate-y-0 opacity-100"
      }, {
        default: withCtx(() => [
          (activeSessions.value.length > 0)
            ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    _cache[46] || (_cache[46] = createBaseVNode("span", { class: "absa-subaccounts__sessions-dot" }, null, -1)),
                    createTextVNode(" Active Sessions (" + toDisplayString(activeSessions.value.length) + ") ", 1)
                  ]),
                  createBaseVNode("button", {
                    onClick: logoutFromAllSubAccounts,
                    class: "absa-subaccounts__sessions-logout-all"
                  }, " Logout All ")
                ]),
                createBaseVNode("div", _hoisted_8, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(activeSessions.value, (session) => {
                    return (openBlock(), createElementBlock("div", {
                      key: session.subAccountId,
                      class: "absa-subaccounts__session-card"
                    }, [
                      createBaseVNode("div", _hoisted_9, toDisplayString(session.subAccountName.substring(0, 2)), 1),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, toDisplayString(session.subAccountName), 1),
                        createBaseVNode("div", _hoisted_12, "Since " + toDisplayString(new Date(session.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})), 1)
                      ]),
                      createBaseVNode("button", {
                        onClick: $event => (logoutFromSubAccount(session.subAccountId)),
                        class: "absa-subaccounts__session-close"
                      }, [...(_cache[47] || (_cache[47] = [
                        createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                      ]))], 8, _hoisted_13)
                    ]))
                  }), 128))
                ])
              ]))
            : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createBaseVNode("div", _hoisted_14, [
        createBaseVNode("div", _hoisted_15, [
          _cache[50] || (_cache[50] = createBaseVNode("div", { class: "absa-subaccounts__kpi-header" }, [
            createBaseVNode("span", { class: "absa-subaccounts__kpi-badge" }, "STAT_USER")
          ], -1)),
          createBaseVNode("div", _hoisted_16, [
            _cache[48] || (_cache[48] = createStaticVNode("<div class=\"absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--maroon\" data-v-4716d3d8><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-4716d3d8><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\" data-v-4716d3d8></path><circle cx=\"9\" cy=\"7\" r=\"4\" data-v-4716d3d8></circle><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\" data-v-4716d3d8></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\" data-v-4716d3d8></path></svg></div>", 1)),
            createBaseVNode("h3", _hoisted_17, toDisplayString(totalSubAccounts.value), 1),
            _cache[49] || (_cache[49] = createBaseVNode("p", { class: "absa-subaccounts__kpi-label" }, "Registered Users", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_18, [
          _cache[53] || (_cache[53] = createBaseVNode("div", { class: "absa-subaccounts__kpi-header" }, [
            createBaseVNode("span", { class: "absa-subaccounts__kpi-badge" }, "STAT_SHOP")
          ], -1)),
          createBaseVNode("div", _hoisted_19, [
            _cache[51] || (_cache[51] = createBaseVNode("div", { class: "absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--green" }, [
              createBaseVNode("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
                createBaseVNode("polyline", { points: "9 22 9 12 15 12 15 22" })
              ])
            ], -1)),
            createBaseVNode("h3", _hoisted_20, toDisplayString(totalBranches.value), 1),
            _cache[52] || (_cache[52] = createBaseVNode("p", { class: "absa-subaccounts__kpi-label absa-subaccounts__kpi-label--green" }, "Active Branches", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_21, [
          _cache[56] || (_cache[56] = createBaseVNode("div", { class: "absa-subaccounts__kpi-header" }, [
            createBaseVNode("span", { class: "absa-subaccounts__kpi-badge" }, "STAT_TIER")
          ], -1)),
          createBaseVNode("div", _hoisted_22, [
            _cache[54] || (_cache[54] = createBaseVNode("div", { class: "absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--amber" }, [
              createBaseVNode("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
              ])
            ], -1)),
            createBaseVNode("h3", _hoisted_23, toDisplayString(currentTier.value?.tier || 'COMMERCIAL'), 1),
            _cache[55] || (_cache[55] = createBaseVNode("p", { class: "absa-subaccounts__kpi-label absa-subaccounts__kpi-label--amber" }, "Subscription Tier", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_24, [
          _cache[59] || (_cache[59] = createBaseVNode("div", { class: "absa-subaccounts__kpi-header" }, [
            createBaseVNode("span", { class: "absa-subaccounts__kpi-badge" }, "STAT_CTX")
          ], -1)),
          createBaseVNode("div", _hoisted_25, [
            _cache[57] || (_cache[57] = createStaticVNode("<div class=\"absa-subaccounts__kpi-icon absa-subaccounts__kpi-icon--blue\" data-v-4716d3d8><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" data-v-4716d3d8><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" data-v-4716d3d8></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\" data-v-4716d3d8></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\" data-v-4716d3d8></path></svg></div>", 1)),
            createBaseVNode("h3", _hoisted_26, toDisplayString(filtered.value.length), 1),
            _cache[58] || (_cache[58] = createBaseVNode("p", { class: "absa-subaccounts__kpi-label absa-subaccounts__kpi-label--blue" }, "Filtered Context", -1))
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_27, [
        createBaseVNode("div", _hoisted_28, [
          _cache[60] || (_cache[60] = createBaseVNode("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            createBaseVNode("circle", {
              cx: "11",
              cy: "11",
              r: "8"
            }),
            createBaseVNode("line", {
              x1: "21",
              y1: "21",
              x2: "16.65",
              y2: "16.65"
            })
          ], -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((search).value = $event)),
            onInput: applySearch,
            placeholder: "Search by name or email..."
          }, null, 544), [
            [vModelText, search.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_29, [
          createBaseVNode("div", _hoisted_30, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((filterRole).value = $event)),
              onChange: applySearch,
              class: "absa-subaccounts__select"
            }, [
              _cache[61] || (_cache[61] = createBaseVNode("option", { value: "" }, "ALL_ROLES", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                return (openBlock(), createElementBlock("option", {
                  key: r.id || r,
                  value: r.name || r
                }, toDisplayString(r.name || r), 9, _hoisted_31))
              }), 128))
            ], 544), [
              [vModelSelect, filterRole.value]
            ]),
            _cache[62] || (_cache[62] = createBaseVNode("svg", {
              width: "10",
              height: "10",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "3"
            }, [
              createBaseVNode("polyline", { points: "6 9 12 15 18 9" })
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_32, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((filterBranch).value = $event)),
              onChange: applySearch,
              class: "absa-subaccounts__select"
            }, [
              _cache[63] || (_cache[63] = createBaseVNode("option", { value: "" }, "ALL_BRANCHES", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(branches.value, (b) => {
                return (openBlock(), createElementBlock("option", {
                  key: b._id,
                  value: b._id
                }, toDisplayString(b.name), 9, _hoisted_33))
              }), 128))
            ], 544), [
              [vModelSelect, filterBranch.value]
            ]),
            _cache[64] || (_cache[64] = createBaseVNode("svg", {
              width: "10",
              height: "10",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "3"
            }, [
              createBaseVNode("polyline", { points: "6 9 12 15 18 9" })
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_34, [
            createBaseVNode("button", {
              onClick: _cache[4] || (_cache[4] = $event => (viewMode.value = 'cards')),
              class: normalizeClass(["absa-subaccounts__view-btn", { 'absa-subaccounts__view-btn--active': viewMode.value === 'cards' }])
            }, [...(_cache[65] || (_cache[65] = [
              createBaseVNode("i", { class: "fas fa-th" }, null, -1)
            ]))], 2),
            createBaseVNode("button", {
              onClick: _cache[5] || (_cache[5] = $event => (viewMode.value = 'list')),
              class: normalizeClass(["absa-subaccounts__view-btn", { 'absa-subaccounts__view-btn--active': viewMode.value === 'list' }])
            }, [...(_cache[66] || (_cache[66] = [
              createBaseVNode("i", { class: "fas fa-list" }, null, -1)
            ]))], 2)
          ]),
          createBaseVNode("button", {
            onClick: refresh,
            class: "absa-subaccounts__reload-btn"
          }, [
            createBaseVNode("i", {
              class: normalizeClass(["fas fa-sync-alt", {'animate-spin': loading.value}])
            }, null, 2),
            _cache[67] || (_cache[67] = createBaseVNode("span", null, "Reload", -1))
          ])
        ])
      ]),
      (loading.value)
        ? (openBlock(), createElementBlock("div", _hoisted_35, [
            (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
              return createBaseVNode("div", {
                key: `skeleton-${i}`,
                class: "absa-subaccounts__loading-card"
              })
            }), 64))
          ]))
        : (viewMode.value === 'cards')
          ? (openBlock(), createElementBlock("div", _hoisted_36, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(paged.value, (acc, index) => {
                return (openBlock(), createElementBlock("div", {
                  key: acc.id || acc.email || index,
                  onClick: $event => (openDetailsModal(acc)),
                  class: "group bg-white rounded-sm border border-gray-200 p-5 shadow-none hover:shadow-md hover:border-[#BE0F2C] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]"
                }, [
                  _cache[73] || (_cache[73] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_38, toDisplayString(acc.role), 1),
                  createBaseVNode("div", _hoisted_39, [
                    createBaseVNode("div", _hoisted_40, [
                      createBaseVNode("div", _hoisted_41, toDisplayString(acc.name.charAt(0).toUpperCase()), 1),
                      createBaseVNode("div", _hoisted_42, [
                        createBaseVNode("h3", _hoisted_43, toDisplayString(acc.name), 1),
                        createBaseVNode("p", _hoisted_44, toDisplayString(acc.email), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_45, [
                      createBaseVNode("div", _hoisted_46, [
                        _cache[68] || (_cache[68] = createBaseVNode("span", { class: "text-gray-400 font-mono uppercase tracking-[0.1em]" }, "Branch", -1)),
                        createBaseVNode("span", _hoisted_47, toDisplayString(getBranchName(acc.branch_id)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_48, [
                        _cache[69] || (_cache[69] = createBaseVNode("span", { class: "text-gray-400 font-mono uppercase tracking-[0.1em]" }, "Status", -1)),
                        createBaseVNode("span", {
                          class: normalizeClass([isLoggedInToSubAccount(acc.id) ? 'text-green-600 bg-green-50 px-1.5 rounded-sm' : 'text-gray-400', "flex items-center gap-1.5 uppercase"])
                        }, [
                          createBaseVNode("span", {
                            class: normalizeClass(["w-1.5 h-1.5 rounded-full", isLoggedInToSubAccount(acc.id) ? 'bg-green-500 animate-pulse' : 'bg-gray-300'])
                          }, null, 2),
                          createTextVNode(" " + toDisplayString(isLoggedInToSubAccount(acc.id) ? 'Active' : 'Offline'), 1)
                        ], 2)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    (!isLoggedInToSubAccount(acc.id))
                      ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: withModifiers($event => (loginToSubAccount(acc)), ["stop"]),
                          class: "flex-1 flex items-center justify-center gap-2 bg-[#BE0F2C] text-white px-4 py-2 rounded-sm hover:bg-[#8B0015] transition-all text-[10px] font-mono font-bold uppercase shadow-none"
                        }, [...(_cache[70] || (_cache[70] = [
                          createBaseVNode("i", { class: "fas fa-sign-in-alt" }, null, -1),
                          createTextVNode(" Login ", -1)
                        ]))], 8, _hoisted_50))
                      : (openBlock(), createElementBlock("button", {
                          key: 1,
                          onClick: withModifiers($event => (logoutFromSubAccount(acc.id)), ["stop"]),
                          class: "flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition-all text-[10px] font-mono font-bold uppercase shadow-none"
                        }, [...(_cache[71] || (_cache[71] = [
                          createBaseVNode("i", { class: "fas fa-sign-out-alt" }, null, -1),
                          createTextVNode(" Logout ", -1)
                        ]))], 8, _hoisted_51)),
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (confirmDelete(acc)), ["stop"]),
                      class: "w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all border border-transparent hover:border-red-100",
                      title: "Delete"
                    }, [...(_cache[72] || (_cache[72] = [
                      createBaseVNode("i", { class: "fas fa-trash-alt text-xs" }, null, -1)
                    ]))], 8, _hoisted_52)
                  ])
                ], 8, _hoisted_37))
              }), 128)),
              (paged.value.length === 0)
                ? (openBlock(), createElementBlock("div", _hoisted_53, [...(_cache[74] || (_cache[74] = [
                    createBaseVNode("div", { class: "absa-subaccounts__empty-icon" }, [
                      createBaseVNode("i", { class: "fas fa-users-slash" })
                    ], -1),
                    createBaseVNode("p", { class: "absa-subaccounts__empty-text" }, "No sub-accounts match current filters", -1)
                  ]))]))
                : createCommentVNode("", true)
            ]))
          : (viewMode.value === 'list')
            ? (openBlock(), createElementBlock("div", _hoisted_54, [
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("table", _hoisted_56, [
                    _cache[79] || (_cache[79] = createBaseVNode("thead", { class: "absa-table-header" }, [
                      createBaseVNode("tr", null, [
                        createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "User"),
                        createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "Role"),
                        createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "Branch"),
                        createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "Status"),
                        createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest text-right" }, "Actions")
                      ])
                    ], -1)),
                    createBaseVNode("tbody", _hoisted_57, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(paged.value, (acc, index) => {
                        return (openBlock(), createElementBlock("tr", {
                          key: `list-${acc.id || acc.email || index}`,
                          onClick: $event => (openDetailsModal(acc)),
                          class: "hover:bg-maroon-soft-bg/30 transition-colors cursor-pointer group"
                        }, [
                          createBaseVNode("td", _hoisted_59, [
                            createBaseVNode("div", _hoisted_60, [
                              createBaseVNode("div", _hoisted_61, toDisplayString((acc.name || '?').charAt(0).toUpperCase()), 1),
                              createBaseVNode("div", null, [
                                createBaseVNode("div", _hoisted_62, toDisplayString(acc.name), 1),
                                createBaseVNode("div", _hoisted_63, toDisplayString(acc.email), 1)
                              ])
                            ])
                          ]),
                          createBaseVNode("td", _hoisted_64, [
                            createBaseVNode("span", _hoisted_65, toDisplayString(acc.role), 1)
                          ]),
                          createBaseVNode("td", _hoisted_66, [
                            createBaseVNode("span", _hoisted_67, toDisplayString(getBranchName(acc.branch_id)), 1)
                          ]),
                          createBaseVNode("td", _hoisted_68, [
                            createBaseVNode("span", {
                              class: normalizeClass([isLoggedInToSubAccount(acc.id) ? 'text-green-600 bg-green-50 border-green-100' : 'text-gray-400 bg-gray-50 border-gray-100', "inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold uppercase rounded-sm border"])
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["w-1.5 h-1.5 rounded-full", isLoggedInToSubAccount(acc.id) ? 'bg-green-500 animate-pulse' : 'bg-gray-300'])
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(isLoggedInToSubAccount(acc.id) ? 'Active' : 'Offline'), 1)
                            ], 2)
                          ]),
                          createBaseVNode("td", _hoisted_69, [
                            createBaseVNode("div", _hoisted_70, [
                              (!isLoggedInToSubAccount(acc.id))
                                ? (openBlock(), createElementBlock("button", {
                                    key: 0,
                                    onClick: withModifiers($event => (loginToSubAccount(acc)), ["stop"]),
                                    class: "h-8 px-3 flex items-center gap-1.5 bg-[#BE0F2C] text-white rounded-sm hover:bg-[#8B0015] transition-all text-[9px] font-mono font-bold uppercase shadow-none"
                                  }, [...(_cache[75] || (_cache[75] = [
                                    createBaseVNode("i", { class: "fas fa-sign-in-alt text-[8px]" }, null, -1),
                                    createTextVNode(" Login ", -1)
                                  ]))], 8, _hoisted_71))
                                : (openBlock(), createElementBlock("button", {
                                    key: 1,
                                    onClick: withModifiers($event => (logoutFromSubAccount(acc.id)), ["stop"]),
                                    class: "h-8 px-3 flex items-center gap-1.5 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition-all text-[9px] font-mono font-bold uppercase shadow-none"
                                  }, [...(_cache[76] || (_cache[76] = [
                                    createBaseVNode("i", { class: "fas fa-sign-out-alt text-[8px]" }, null, -1),
                                    createTextVNode(" Logout ", -1)
                                  ]))], 8, _hoisted_72)),
                              createBaseVNode("button", {
                                onClick: withModifiers($event => (confirmDelete(acc)), ["stop"]),
                                class: "h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all border border-transparent hover:border-red-100"
                              }, [...(_cache[77] || (_cache[77] = [
                                createBaseVNode("i", { class: "fas fa-trash-alt text-[10px]" }, null, -1)
                              ]))], 8, _hoisted_73)
                            ])
                          ])
                        ], 8, _hoisted_58))
                      }), 128)),
                      (paged.value.length === 0)
                        ? (openBlock(), createElementBlock("tr", _hoisted_74, [...(_cache[78] || (_cache[78] = [
                            createBaseVNode("td", {
                              colspan: "5",
                              class: "px-4 py-16 text-center"
                            }, [
                              createBaseVNode("i", { class: "fas fa-users-slash text-gray-200 text-3xl mb-3" }),
                              createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest" }, "No sub-accounts match current filters")
                            ], -1)
                          ]))]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_75, [
        createBaseVNode("div", _hoisted_76, "Displaying " + toDisplayString(filtered.value.length) + " entries", 1),
        createBaseVNode("div", _hoisted_77, [
          createBaseVNode("button", {
            onClick: prevPage,
            disabled: page.value <= 1,
            class: "absa-subaccounts__page-btn"
          }, [...(_cache[80] || (_cache[80] = [
            createBaseVNode("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5"
            }, [
              createBaseVNode("polyline", { points: "15 18 9 12 15 6" })
            ], -1)
          ]))], 8, _hoisted_78),
          createBaseVNode("span", _hoisted_79, toDisplayString(page.value), 1),
          createBaseVNode("span", _hoisted_80, "of " + toDisplayString(totalPages.value), 1),
          createBaseVNode("button", {
            onClick: nextPage,
            disabled: page.value >= totalPages.value,
            class: "absa-subaccounts__page-btn"
          }, [...(_cache[81] || (_cache[81] = [
            createBaseVNode("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5"
            }, [
              createBaseVNode("polyline", { points: "9 18 15 12 9 6" })
            ], -1)
          ]))], 8, _hoisted_81)
        ])
      ]),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          "enter-active-class": "transition duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            (showCreateModal.value)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm",
                  onClick: closeCreateModal
                }, [
                  createBaseVNode("div", {
                    class: "bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar",
                    onClick: _cache[13] || (_cache[13] = withModifiers(() => {}, ["stop"]))
                  }, [
                    _cache[99] || (_cache[99] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_82, [
                      createBaseVNode("div", { class: "flex items-center justify-between mb-6 pb-4 border-b border-gray-100" }, [
                        _cache[83] || (_cache[83] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
                          createBaseVNode("div", { class: "w-1 h-6 bg-[#BE0F2C]" }),
                          createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "System // New User Registration")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: closeCreateModal,
                          class: "text-gray-400 hover:text-gray-600"
                        }, [...(_cache[82] || (_cache[82] = [
                          createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                        ]))])
                      ]),
                      createBaseVNode("form", {
                        onSubmit: withModifiers(createSubAccount, ["prevent"]),
                        class: "space-y-6 pt-2"
                      }, [
                        createBaseVNode("div", _hoisted_83, [
                          createBaseVNode("div", _hoisted_84, [
                            createBaseVNode("div", null, [
                              _cache[84] || (_cache[84] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Display Name", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((newAccount.value.name) = $event)),
                                required: "",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase",
                                placeholder: "NAME_REQUIRED"
                              }, null, 512), [
                                [vModelText, newAccount.value.name]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[86] || (_cache[86] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Email Address", -1)),
                              createBaseVNode("div", _hoisted_85, [
                                _cache[85] || (_cache[85] = createBaseVNode("i", { class: "far fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs text-xs" }, null, -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((newAccount.value.email) = $event)),
                                  required: "",
                                  type: "email",
                                  class: "w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold",
                                  placeholder: "EMAIL_REQUIRED"
                                }, null, 512), [
                                  [vModelText, newAccount.value.email]
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_86, [
                              createBaseVNode("div", null, [
                                createBaseVNode("label", _hoisted_87, [
                                  _cache[88] || (_cache[88] = createBaseVNode("span", null, "Role", -1)),
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: _cache[8] || (_cache[8] = (...args) => (unref(fetchRoles) && unref(fetchRoles)(...args))),
                                    class: "text-[8px] font-mono font-bold text-[#BE0F2C] normal-case hover:underline flex items-center gap-1",
                                    title: "Reload roles from Settings"
                                  }, [...(_cache[87] || (_cache[87] = [
                                    createBaseVNode("i", { class: "fas fa-sync-alt" }, null, -1),
                                    createTextVNode(" refresh ", -1)
                                  ]))])
                                ]),
                                createBaseVNode("div", _hoisted_88, [
                                  withDirectives(createBaseVNode("select", {
                                    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((newAccount.value.role) = $event)),
                                    required: "",
                                    class: "w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase"
                                  }, [
                                    _cache[89] || (_cache[89] = createBaseVNode("option", {
                                      value: "",
                                      disabled: ""
                                    }, "SELECT_ROLE", -1)),
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(availableCreateRoles.value, (r) => {
                                      return (openBlock(), createElementBlock("option", {
                                        key: `new-role-${r.id || r}`,
                                        value: r.id || r
                                      }, [
                                        createTextVNode(toDisplayString((r.name || r)), 1),
                                        (r.isCustom || r.is_custom)
                                          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                              createTextVNode(" • CUSTOM")
                                            ], 64))
                                          : createCommentVNode("", true)
                                      ], 8, _hoisted_89))
                                    }), 128))
                                  ], 512), [
                                    [vModelSelect, newAccount.value.role]
                                  ]),
                                  _cache[90] || (_cache[90] = createBaseVNode("i", { class: "fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]" }, null, -1))
                                ]),
                                (availableCreateRoles.value.length === 0)
                                  ? (openBlock(), createElementBlock("p", _hoisted_90, "No roles available. Create one in Settings → Roles."))
                                  : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", null, [
                                _cache[93] || (_cache[93] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Branch", -1)),
                                createBaseVNode("div", _hoisted_91, [
                                  withDirectives(createBaseVNode("select", {
                                    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((newAccount.value.branch_id) = $event)),
                                    class: "w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase"
                                  }, [
                                    _cache[91] || (_cache[91] = createBaseVNode("option", { value: null }, "MASTER_ALL", -1)),
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(availableBranches.value, (b) => {
                                      return (openBlock(), createElementBlock("option", {
                                        key: `new-branch-${b._id || b.id}`,
                                        value: b._id || b._id
                                      }, toDisplayString(b.name), 9, _hoisted_92))
                                    }), 128))
                                  ], 512), [
                                    [vModelSelect, newAccount.value.branch_id]
                                  ]),
                                  _cache[92] || (_cache[92] = createBaseVNode("i", { class: "fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]" }, null, -1))
                                ])
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_93, [
                            createBaseVNode("div", null, [
                              _cache[94] || (_cache[94] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Access Password", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((newAccount.value.password) = $event)),
                                required: "",
                                type: "password",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold",
                                placeholder: "••••••••"
                              }, null, 512), [
                                [vModelText, newAccount.value.password]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[95] || (_cache[95] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Confirm Identity", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((newAccount.value.confirmPassword) = $event)),
                                required: "",
                                type: "password",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold",
                                placeholder: "••••••••"
                              }, null, 512), [
                                [vModelText, newAccount.value.confirmPassword]
                              ])
                            ]),
                            (newAccount.value.password && newAccount.value.confirmPassword && newAccount.value.password !== newAccount.value.confirmPassword)
                              ? (openBlock(), createElementBlock("div", _hoisted_94, [...(_cache[96] || (_cache[96] = [
                                  createBaseVNode("i", { class: "fas fa-exclamation-triangle" }, null, -1),
                                  createTextVNode(" ERROR_PASSWORD_MISMATCH ", -1)
                                ]))]))
                              : createCommentVNode("", true),
                            _cache[97] || (_cache[97] = createBaseVNode("div", { class: "p-4 bg-maroon-soft-bg border border-maroon-soft-border rounded-sm border-l-4 border-l-[#BE0F2C]" }, [
                              createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-indigo-900 uppercase tracking-wider leading-relaxed" }, " User permissions will be automatically inherited from the selected role. ")
                            ], -1))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_95, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: closeCreateModal,
                            class: "px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors"
                          }, "CANCEL_OP"),
                          createBaseVNode("button", {
                            type: "submit",
                            disabled: loading.value,
                            class: "px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50"
                          }, [
                            (loading.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_97, [...(_cache[98] || (_cache[98] = [
                                  createBaseVNode("i", { class: "fas fa-spinner fa-spin mr-2" }, null, -1),
                                  createTextVNode("EXECUTING...", -1)
                                ]))]))
                              : (openBlock(), createElementBlock("span", _hoisted_98, "COMMIT_REGISTRATION"))
                          ], 8, _hoisted_96)
                        ])
                      ], 32)
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": "transition duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            (showBranchModal.value)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm",
                  onClick: closeBranchModal
                }, [
                  createBaseVNode("div", {
                    class: "bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar",
                    onClick: _cache[18] || (_cache[18] = withModifiers(() => {}, ["stop"]))
                  }, [
                    _cache[109] || (_cache[109] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_99, [
                      createBaseVNode("div", { class: "flex items-center justify-between mb-6 pb-4 border-b border-gray-100" }, [
                        _cache[101] || (_cache[101] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
                          createBaseVNode("div", { class: "w-1 h-6 bg-[#BE0F2C]" }),
                          createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "System // New Branch Setup")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: closeBranchModal,
                          class: "text-gray-400 hover:text-gray-600"
                        }, [...(_cache[100] || (_cache[100] = [
                          createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                        ]))])
                      ]),
                      createBaseVNode("form", {
                        onSubmit: withModifiers(createBranch, ["prevent"]),
                        class: "space-y-6 pt-2"
                      }, [
                        createBaseVNode("div", _hoisted_100, [
                          createBaseVNode("div", _hoisted_101, [
                            createBaseVNode("div", null, [
                              _cache[102] || (_cache[102] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Branch Designation", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((newBranch.value.name) = $event)),
                                required: "",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase",
                                placeholder: "BRANCH_NAME"
                              }, null, 512), [
                                [vModelText, newBranch.value.name]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[104] || (_cache[104] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Physical Location", -1)),
                              createBaseVNode("div", _hoisted_102, [
                                _cache[103] || (_cache[103] = createBaseVNode("i", { class: "fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" }, null, -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((newBranch.value.location) = $event)),
                                  required: "",
                                  class: "w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase",
                                  placeholder: "STREET_CITY_LOC"
                                }, null, 512), [
                                  [vModelText, newBranch.value.location]
                                ])
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_103, [
                            createBaseVNode("div", null, [
                              _cache[105] || (_cache[105] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Technical Phone", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((newBranch.value.phone) = $event)),
                                type: "tel",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold",
                                placeholder: "+260_XXX_XXXXXX"
                              }, null, 512), [
                                [vModelText, newBranch.value.phone]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[106] || (_cache[106] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Technical Email", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((newBranch.value.email) = $event)),
                                type: "email",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold",
                                placeholder: "BRANCH_SUPPORT_EMAIL"
                              }, null, 512), [
                                [vModelText, newBranch.value.email]
                              ])
                            ])
                          ])
                        ]),
                        _cache[108] || (_cache[108] = createBaseVNode("div", { class: "p-4 bg-blue-50 border border-blue-100 rounded-sm border-l-4 border-l-blue-600 flex gap-4" }, [
                          createBaseVNode("div", { class: "text-blue-600 mt-0.5" }, [
                            createBaseVNode("i", { class: "fas fa-info-circle" })
                          ]),
                          createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-blue-900 uppercase tracking-wider leading-relaxed" }, " Branch creation initializes localized inventory and sales tracking silos. ")
                        ], -1)),
                        createBaseVNode("div", _hoisted_104, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: closeBranchModal,
                            class: "px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors"
                          }, "HALT_OP"),
                          createBaseVNode("button", {
                            type: "submit",
                            disabled: loading.value,
                            class: "px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50"
                          }, [
                            (loading.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_106, [...(_cache[107] || (_cache[107] = [
                                  createBaseVNode("i", { class: "fas fa-spinner fa-spin mr-2" }, null, -1),
                                  createTextVNode("EXECUTING...", -1)
                                ]))]))
                              : (openBlock(), createElementBlock("span", _hoisted_107, "INITIALIZE_BRANCH"))
                          ], 8, _hoisted_105)
                        ])
                      ], 32)
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": "transition duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            (showManageBranchesModal.value)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm",
                  onClick: _cache[23] || (_cache[23] = $event => (showManageBranchesModal.value = false))
                }, [
                  createBaseVNode("div", {
                    class: "bg-white border border-gray-200 rounded-sm p-4 sm:p-8 shadow-2xl relative overflow-hidden w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar",
                    onClick: _cache[22] || (_cache[22] = withModifiers(() => {}, ["stop"]))
                  }, [
                    _cache[118] || (_cache[118] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_108, [
                      createBaseVNode("div", _hoisted_109, [
                        _cache[111] || (_cache[111] = createBaseVNode("div", { class: "flex items-center gap-2 sm:gap-3" }, [
                          createBaseVNode("div", { class: "w-1 h-5 sm:h-6 bg-orange-500" }),
                          createBaseVNode("h3", { class: "text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight" }, "System // Manage Branches")
                        ], -1)),
                        createBaseVNode("button", {
                          onClick: _cache[19] || (_cache[19] = $event => (showManageBranchesModal.value = false)),
                          class: "text-gray-400 hover:text-gray-600 p-1"
                        }, [...(_cache[110] || (_cache[110] = [
                          createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                        ]))])
                      ]),
                      createBaseVNode("div", _hoisted_110, [
                        createBaseVNode("div", _hoisted_111, [
                          _cache[113] || (_cache[113] = createBaseVNode("div", { class: "flex gap-3 sm:gap-4" }, [
                            createBaseVNode("div", { class: "text-orange-600 mt-0.5 shrink-0" }, [
                              createBaseVNode("i", { class: "fas fa-exclamation-triangle" })
                            ]),
                            createBaseVNode("div", null, [
                              createBaseVNode("h4", { class: "text-[10px] sm:text-[11px] font-black text-orange-900 uppercase" }, "Warning: Irreversible Action"),
                              createBaseVNode("p", { class: "text-[9px] sm:text-[10px] font-mono font-bold text-orange-800 uppercase tracking-wider leading-relaxed mt-1" }, " Deleting a branch will permanently purge ALL associated data (Inventory, Sales, Expenses, and Sub-Accounts). Use extreme caution. ")
                            ])
                          ], -1)),
                          createBaseVNode("button", {
                            onClick: _cache[20] || (_cache[20] = $event => {handleAddBranchClick(); showManageBranchesModal.value = false;}),
                            class: "bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-sm text-[9px] sm:text-[10px] font-mono font-bold uppercase shadow-none shrink-0 w-full sm:w-auto text-center"
                          }, [...(_cache[112] || (_cache[112] = [
                            createBaseVNode("i", { class: "fas fa-plus" }, null, -1),
                            createTextVNode(" ADD_NEW ", -1)
                          ]))])
                        ]),
                        createBaseVNode("div", _hoisted_112, [
                          createBaseVNode("table", _hoisted_113, [
                            _cache[117] || (_cache[117] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-200" }, [
                              createBaseVNode("tr", null, [
                                createBaseVNode("th", { class: "px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "Branch Name / Loc"),
                                createBaseVNode("th", { class: "px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell" }, "Contacts / Email"),
                                createBaseVNode("th", { class: "px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest" }, "Users"),
                                createBaseVNode("th", { class: "px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest hidden sm:table-cell" }, "Status"),
                                createBaseVNode("th", { class: "px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest text-right" }, "Actions")
                              ])
                            ], -1)),
                            createBaseVNode("tbody", _hoisted_114, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(branches.value, (branch, index) => {
                                return (openBlock(), createElementBlock("tr", {
                                  key: branch._id || branch.id || index,
                                  class: "hover:bg-gray-50 transition-colors"
                                }, [
                                  createBaseVNode("td", _hoisted_115, [
                                    createBaseVNode("div", _hoisted_116, toDisplayString(branch.name), 1),
                                    createBaseVNode("div", _hoisted_117, toDisplayString(branch.location), 1),
                                    createBaseVNode("div", _hoisted_118, [
                                      (branch.status === 'active')
                                        ? (openBlock(), createElementBlock("span", _hoisted_119, "Active"))
                                        : (openBlock(), createElementBlock("span", _hoisted_120, "Inactive"))
                                    ])
                                  ]),
                                  createBaseVNode("td", _hoisted_121, [
                                    createBaseVNode("div", _hoisted_122, toDisplayString(branch.phone || 'NO_PHONE'), 1),
                                    createBaseVNode("div", _hoisted_123, toDisplayString(branch.email || 'no_email@sys.com'), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_124, [
                                    createBaseVNode("span", _hoisted_125, toDisplayString(branch.user_count || 0), 1)
                                  ]),
                                  createBaseVNode("td", _hoisted_126, [
                                    (branch.status === 'active')
                                      ? (openBlock(), createElementBlock("span", _hoisted_127, "Active"))
                                      : (openBlock(), createElementBlock("span", _hoisted_128, "Inactive"))
                                  ]),
                                  createBaseVNode("td", _hoisted_129, [
                                    createBaseVNode("div", _hoisted_130, [
                                      createBaseVNode("button", {
                                        onClick: $event => (toggleBranchStatus(branch)),
                                        class: normalizeClass([branch.status === 'active' ? 'text-green-500 hover:bg-green-50 hover:border-green-200' : 'text-gray-400 hover:bg-gray-100', "h-7 w-7 sm:h-8 sm:w-8 rounded-sm transition-all shadow-none border border-transparent flex items-center justify-center"]),
                                        title: branch.status === 'active' ? 'Deactivate Branch' : 'Activate Branch'
                                      }, [
                                        createBaseVNode("i", {
                                          class: normalizeClass(["fas text-xs", branch.status === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'])
                                        }, null, 2)
                                      ], 10, _hoisted_131),
                                      createBaseVNode("button", {
                                        onClick: $event => (handleEditBranch(branch)),
                                        class: "h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-sm transition-all shadow-none border border-transparent hover:border-blue-100 flex items-center justify-center",
                                        title: "Edit Branch"
                                      }, [...(_cache[114] || (_cache[114] = [
                                        createBaseVNode("i", { class: "fas fa-edit text-xs" }, null, -1)
                                      ]))], 8, _hoisted_132),
                                      createBaseVNode("button", {
                                        onClick: $event => (openDeleteBranchModal(branch)),
                                        class: "h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all shadow-none border border-transparent hover:border-red-100 flex items-center justify-center",
                                        title: "Delete Branch"
                                      }, [...(_cache[115] || (_cache[115] = [
                                        createBaseVNode("i", { class: "fas fa-trash-alt text-xs" }, null, -1)
                                      ]))], 8, _hoisted_133)
                                    ])
                                  ])
                                ]))
                              }), 128)),
                              (branches.value.length === 0)
                                ? (openBlock(), createElementBlock("tr", _hoisted_134, [...(_cache[116] || (_cache[116] = [
                                    createBaseVNode("td", {
                                      colspan: "5",
                                      class: "px-4 py-12 text-center"
                                    }, [
                                      createBaseVNode("i", { class: "fas fa-store-slash text-gray-200 text-3xl mb-3" }),
                                      createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-300 uppercase" }, "No active branches found")
                                    ], -1)
                                  ]))]))
                                : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_135, [
                          createBaseVNode("button", {
                            onClick: _cache[21] || (_cache[21] = $event => (showManageBranchesModal.value = false)),
                            class: "px-5 sm:px-6 py-2 bg-gray-100 text-gray-500 font-bold text-[11px] sm:text-xs uppercase rounded-sm hover:bg-gray-200 transition-all"
                          }, "Close")
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        (showDeleteBranchModal.value)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm",
              onClick: closeDeleteBranchModal
            }, [
              createBaseVNode("div", {
                class: "bg-white border border-gray-200 rounded-sm shadow-2xl w-full max-w-md",
                onClick: _cache[26] || (_cache[26] = withModifiers(() => {}, ["stop"]))
              }, [
                createBaseVNode("div", { class: "flex items-center justify-between px-6 py-4 border-b border-gray-100" }, [
                  _cache[120] || (_cache[120] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-5 bg-red-500" }),
                    createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight font-mono" }, "Delete Branch")
                  ], -1)),
                  createBaseVNode("button", {
                    onClick: closeDeleteBranchModal,
                    class: "text-gray-400 hover:text-gray-600 p-1"
                  }, [...(_cache[119] || (_cache[119] = [
                    createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                  ]))])
                ]),
                createBaseVNode("div", _hoisted_136, [
                  createBaseVNode("div", _hoisted_137, [
                    createBaseVNode("p", _hoisted_138, [
                      _cache[121] || (_cache[121] = createTextVNode(" Deleting ", -1)),
                      createBaseVNode("span", _hoisted_139, toDisplayString(branchPendingDelete.value?.name || 'this branch'), 1),
                      _cache[122] || (_cache[122] = createTextVNode(" will permanently remove its inventory, sales, expenses, and assigned sub-accounts. ", -1))
                    ])
                  ]),
                  _cache[125] || (_cache[125] = createBaseVNode("p", { class: "text-sm text-gray-600" }, [
                    createTextVNode(" Type "),
                    createBaseVNode("span", { class: "font-bold text-gray-900" }, "DELETE"),
                    createTextVNode(" to confirm this irreversible action. ")
                  ], -1)),
                  createBaseVNode("div", null, [
                    _cache[123] || (_cache[123] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Confirmation Text", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => ((branchDeleteConfirmation).value = $event)),
                      type: "text",
                      autocomplete: "off",
                      class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold uppercase",
                      placeholder: "DELETE",
                      onInput: _cache[25] || (_cache[25] = $event => (branchDeleteError.value = ''))
                    }, null, 544), [
                      [vModelText, branchDeleteConfirmation.value]
                    ]),
                    _cache[124] || (_cache[124] = createBaseVNode("p", { class: "mt-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest" }, " This check is case-sensitive. ", -1)),
                    (branchDeleteError.value)
                      ? (openBlock(), createElementBlock("p", _hoisted_140, toDisplayString(branchDeleteError.value), 1))
                      : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_141, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: closeDeleteBranchModal,
                    class: "px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors"
                  }, " Cancel "),
                  createBaseVNode("button", {
                    type: "button",
                    disabled: branchDeleteLoading.value || branchDeleteConfirmation.value.trim().toUpperCase() !== 'DELETE',
                    onClick: confirmDeleteBranch,
                    class: "px-5 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-700 shadow-md transition-all disabled:opacity-50"
                  }, [
                    (branchDeleteLoading.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_143, "Deleting..."))
                      : (openBlock(), createElementBlock("span", _hoisted_144, "Delete Branch"))
                  ], 8, _hoisted_142)
                ])
              ])
            ]))
          : createCommentVNode("", true),
        createVNode(Transition, {
          "enter-active-class": "transition duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            (showDetailsModal.value && selectedSubAccount.value)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm",
                  onClick: closeDetailsModal
                }, [
                  createBaseVNode("div", {
                    class: "bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar",
                    onClick: _cache[36] || (_cache[36] = withModifiers(() => {}, ["stop"]))
                  }, [
                    _cache[151] || (_cache[151] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_145, [
                      createBaseVNode("div", _hoisted_146, [
                        createBaseVNode("div", _hoisted_147, [
                          _cache[127] || (_cache[127] = createBaseVNode("div", { class: "h-10 w-10 flex items-center justify-center text-[#BE0F2C] font-black" }, [
                            createBaseVNode("i", { class: "fas fa-id-badge text-lg" })
                          ], -1)),
                          createBaseVNode("div", null, [
                            _cache[126] || (_cache[126] = createBaseVNode("div", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "SUB_ACCOUNT // PROFILE", -1)),
                            createBaseVNode("div", _hoisted_148, toDisplayString(selectedSubAccount.value.name), 1)
                          ])
                        ]),
                        createBaseVNode("button", {
                          onClick: closeDetailsModal,
                          class: "text-gray-400 hover:text-gray-600"
                        }, [...(_cache[128] || (_cache[128] = [
                          createBaseVNode("i", { class: "fas fa-times" }, null, -1)
                        ]))])
                      ]),
                      createBaseVNode("div", _hoisted_149, [
                        createBaseVNode("button", {
                          onClick: _cache[27] || (_cache[27] = $event => (detailsTab.value = 'profile')),
                          class: normalizeClass([{'border-b-2 border-[#BE0F2C] text-[#BE0F2C]': detailsTab.value === 'profile', 'text-gray-400 border-transparent hover:text-gray-600': detailsTab.value !== 'profile'}, "pb-3 px-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all"])
                        }, "PROFILE_CFG", 2),
                        createBaseVNode("button", {
                          onClick: _cache[28] || (_cache[28] = $event => (detailsTab.value = 'modules')),
                          class: normalizeClass([{'border-b-2 border-[#BE0F2C] text-[#BE0F2C]': detailsTab.value === 'modules', 'text-gray-400 border-transparent hover:text-gray-600': detailsTab.value !== 'modules'}, "pb-3 px-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all"])
                        }, "FEATURE_MATIX", 2)
                      ]),
                      (detailsTab.value === 'profile')
                        ? (openBlock(), createElementBlock("div", _hoisted_150, [
                            createBaseVNode("div", _hoisted_151, [
                              createBaseVNode("div", _hoisted_152, [
                                createBaseVNode("div", null, [
                                  _cache[129] || (_cache[129] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Display Name", -1)),
                                  withDirectives(createBaseVNode("input", {
                                    "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => ((editProfile.value.name) = $event)),
                                    class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all text-xs font-bold uppercase"
                                  }, null, 512), [
                                    [vModelText, editProfile.value.name]
                                  ])
                                ]),
                                createBaseVNode("div", null, [
                                  _cache[130] || (_cache[130] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "System Credentials", -1)),
                                  withDirectives(createBaseVNode("input", {
                                    "onUpdate:modelValue": _cache[30] || (_cache[30] = $event => ((editProfile.value.email) = $event)),
                                    disabled: "",
                                    class: "w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-sm text-gray-500 cursor-not-allowed text-xs font-mono font-bold"
                                  }, null, 512), [
                                    [vModelText, editProfile.value.email]
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_153, [
                                createBaseVNode("div", _hoisted_154, [
                                  createBaseVNode("div", null, [
                                    createBaseVNode("label", _hoisted_155, [
                                      _cache[132] || (_cache[132] = createBaseVNode("span", null, "Assign Role", -1)),
                                      createBaseVNode("button", {
                                        type: "button",
                                        onClick: _cache[31] || (_cache[31] = (...args) => (unref(fetchRoles) && unref(fetchRoles)(...args))),
                                        class: "text-[8px] font-mono font-bold text-[#BE0F2C] normal-case hover:underline flex items-center gap-1",
                                        title: "Reload roles from Settings"
                                      }, [...(_cache[131] || (_cache[131] = [
                                        createBaseVNode("i", { class: "fas fa-sync-alt" }, null, -1),
                                        createTextVNode(" refresh ", -1)
                                      ]))])
                                    ]),
                                    createBaseVNode("div", _hoisted_156, [
                                      withDirectives(createBaseVNode("select", {
                                        "onUpdate:modelValue": _cache[32] || (_cache[32] = $event => ((editProfile.value.role) = $event)),
                                        class: "w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase"
                                      }, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(availableAssignableRoles.value, (r) => {
                                          return (openBlock(), createElementBlock("option", {
                                            key: `edit-role-${r.id || r}`,
                                            value: r.id || r
                                          }, [
                                            createTextVNode(toDisplayString((r.name || r)), 1),
                                            (r.isCustom || r.is_custom)
                                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                                  createTextVNode(" • CUSTOM")
                                                ], 64))
                                              : createCommentVNode("", true)
                                          ], 8, _hoisted_157))
                                        }), 128))
                                      ], 512), [
                                        [vModelSelect, editProfile.value.role]
                                      ]),
                                      _cache[133] || (_cache[133] = createBaseVNode("i", { class: "fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]" }, null, -1))
                                    ]),
                                    (editProfile.value.role && !availableAssignableRoles.value.some(r => (r.id || r) === editProfile.value.role))
                                      ? (openBlock(), createElementBlock("p", _hoisted_158, " Current role “" + toDisplayString(editProfile.value.role) + "” is no longer available. Pick a new role. ", 1))
                                      : createCommentVNode("", true)
                                  ]),
                                  createBaseVNode("div", null, [
                                    _cache[136] || (_cache[136] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Assign Branch", -1)),
                                    createBaseVNode("div", _hoisted_159, [
                                      withDirectives(createBaseVNode("select", {
                                        "onUpdate:modelValue": _cache[33] || (_cache[33] = $event => ((editProfile.value.branch_id) = $event)),
                                        class: "w-full appearance-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] outline-none cursor-pointer text-[10px] font-mono font-bold uppercase"
                                      }, [
                                        _cache[134] || (_cache[134] = createBaseVNode("option", { value: null }, "MASTER_ALL", -1)),
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(branches.value, (b) => {
                                          return (openBlock(), createElementBlock("option", {
                                            key: `edit-branch-${b._id || b.id}`,
                                            value: b._id || b.id
                                          }, toDisplayString(b.name), 9, _hoisted_160))
                                        }), 128))
                                      ], 512), [
                                        [vModelSelect, editProfile.value.branch_id]
                                      ]),
                                      _cache[135] || (_cache[135] = createBaseVNode("i", { class: "fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]" }, null, -1))
                                    ])
                                  ])
                                ]),
                                createBaseVNode("div", null, [
                                  _cache[137] || (_cache[137] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Security Override (Password)", -1)),
                                  withDirectives(createBaseVNode("input", {
                                    "onUpdate:modelValue": _cache[34] || (_cache[34] = $event => ((editProfile.value.password) = $event)),
                                    type: "password",
                                    class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all text-xs font-bold",
                                    placeholder: "VERIFICATION_KEY_UNAVAILABLE"
                                  }, null, 512), [
                                    [vModelText, editProfile.value.password]
                                  ])
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_161, [
                              createBaseVNode("button", {
                                type: "button",
                                onClick: closeDetailsModal,
                                class: "px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors"
                              }, "DISCARD_CHG"),
                              createBaseVNode("button", {
                                onClick: saveProfile,
                                disabled: loading.value,
                                class: "px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all transform active:scale-95"
                              }, [
                                (loading.value)
                                  ? (openBlock(), createElementBlock("span", _hoisted_163, [...(_cache[138] || (_cache[138] = [
                                      createBaseVNode("i", { class: "fas fa-spinner fa-spin mr-2" }, null, -1),
                                      createTextVNode("EXECUTING...", -1)
                                    ]))]))
                                  : (openBlock(), createElementBlock("span", _hoisted_164, "COMMIT_UPDATE"))
                              ], 8, _hoisted_162)
                            ])
                          ]))
                        : createCommentVNode("", true),
                      (detailsTab.value === 'modules')
                        ? (openBlock(), createElementBlock("div", _hoisted_165, [
                            createBaseVNode("div", _hoisted_166, [
                              createBaseVNode("div", _hoisted_167, [
                                _cache[142] || (_cache[142] = createBaseVNode("div", { class: "text-[#BE0F2C] mt-1" }, [
                                  createBaseVNode("i", { class: "fas fa-shield-alt text-lg" })
                                ], -1)),
                                createBaseVNode("div", null, [
                                  _cache[141] || (_cache[141] = createBaseVNode("h4", { class: "font-black text-[#BE0F2C] text-[11px] uppercase tracking-wider" }, "Module Access Control", -1)),
                                  createBaseVNode("p", _hoisted_168, [
                                    _cache[139] || (_cache[139] = createTextVNode(" Click modules to toggle access for ", -1)),
                                    createBaseVNode("span", _hoisted_169, toDisplayString(selectedSubAccount.value?.name || selectedSubAccount.value?.email), 1),
                                    _cache[140] || (_cache[140] = createTextVNode(". Changes are saved automatically. ", -1))
                                  ])
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_170, [
                              _cache[145] || (_cache[145] = createBaseVNode("div", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Feature_Access_Matrix", -1)),
                              createBaseVNode("div", _hoisted_171, [
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": _cache[35] || (_cache[35] = $event => ((roleFilter).value = $event)),
                                  class: "appearance-none px-3 py-1.5 border border-gray-200 rounded-sm text-[9px] font-mono font-bold uppercase bg-white text-gray-700 outline-none focus:ring-1 focus:ring-[#BE0F2C]"
                                }, [
                                  _cache[143] || (_cache[143] = createBaseVNode("option", { value: "" }, "SHOW_ALL_MATRICES", -1)),
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                                    return (openBlock(), createElementBlock("option", {
                                      key: `matrix-role-${r.id || r}`,
                                      value: r.id || r
                                    }, toDisplayString(r.name || r) + " DEFAULTS", 9, _hoisted_172))
                                  }), 128))
                                ], 512), [
                                  [vModelSelect, roleFilter.value]
                                ]),
                                _cache[144] || (_cache[144] = createBaseVNode("i", { class: "fas fa-filter absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-[8px]" }, null, -1))
                              ])
                            ]),
                            (modulesLoading.value)
                              ? (openBlock(), createElementBlock("div", _hoisted_173, [...(_cache[146] || (_cache[146] = [
                                  createBaseVNode("i", { class: "fas fa-spinner fa-spin text-xl text-[#BE0F2C] mb-3" }, null, -1),
                                  createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase" }, "SYNCHRONIZING_MODULE_DATA...", -1)
                                ]))]))
                              : (openBlock(), createElementBlock("div", _hoisted_174, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredModules.value, (mod, index) => {
                                    return (openBlock(), createElementBlock("div", {
                                      key: mod.id || index,
                                      onClick: $event => (toggleModuleAssignment(mod.id)),
                                      class: normalizeClass(["p-4 border rounded-sm flex items-center justify-between group transition-all cursor-pointer hover:shadow-none", assignedModules.value.includes(mod.id) ? 'bg-maroon-soft-bg/50 border-indigo-200 hover:border-[var(--absa-maroon,#BE0F2C)]' : 'bg-gray-50/50 border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-80'])
                                    }, [
                                      createBaseVNode("span", _hoisted_176, toDisplayString(mod.name), 1),
                                      (savingModules.value && togglingModuleId.value === mod.id)
                                        ? (openBlock(), createElementBlock("div", _hoisted_177, [...(_cache[147] || (_cache[147] = [
                                            createBaseVNode("i", { class: "fas fa-spinner fa-spin text-[10px]" }, null, -1)
                                          ]))]))
                                        : (assignedModules.value.includes(mod.id))
                                          ? (openBlock(), createElementBlock("div", _hoisted_178, [...(_cache[148] || (_cache[148] = [
                                              createBaseVNode("i", { class: "fas fa-check text-[10px]" }, null, -1)
                                            ]))]))
                                          : (openBlock(), createElementBlock("div", _hoisted_179, [...(_cache[149] || (_cache[149] = [
                                              createBaseVNode("i", { class: "fas fa-plus text-[10px]" }, null, -1)
                                            ]))]))
                                    ], 10, _hoisted_175))
                                  }), 128)),
                                  (filteredModules.value.length === 0)
                                    ? (openBlock(), createElementBlock("div", _hoisted_180, [...(_cache[150] || (_cache[150] = [
                                        createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase" }, "NO_MODULES_MATCH_CURRENT_FILTER", -1)
                                      ]))]))
                                    : createCommentVNode("", true)
                                ])),
                            createBaseVNode("div", { class: "flex justify-end pt-8 border-t border-gray-100" }, [
                              createBaseVNode("button", {
                                type: "button",
                                onClick: closeDetailsModal,
                                class: "px-6 py-2 bg-white border border-gray-200 rounded-sm text-xs font-bold uppercase text-gray-500 hover:border-[#BE0F2C] hover:text-[#BE0F2C] transition-colors"
                              }, "CLOSE_MATIX")
                            ])
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": "transition duration-300 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition duration-200 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            (showEditBranchModal.value)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm",
                  onClick: closeEditBranchModal
                }, [
                  createBaseVNode("div", {
                    class: "bg-white border border-gray-200 rounded-sm p-8 shadow-2xl relative overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar",
                    onClick: _cache[41] || (_cache[41] = withModifiers(() => {}, ["stop"]))
                  }, [
                    _cache[159] || (_cache[159] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_181, [
                      createBaseVNode("div", { class: "flex items-center justify-between mb-6 pb-4 border-b border-gray-100" }, [
                        _cache[152] || (_cache[152] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
                          createBaseVNode("div", { class: "w-1 h-6 bg-blue-500" }),
                          createBaseVNode("h3", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "System // Edit Branch Details")
                        ], -1)),
                        createBaseVNode("button", {
                          type: "button",
                          onClick: closeEditBranchModal,
                          class: "text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
                        }, "×")
                      ]),
                      createBaseVNode("form", {
                        onSubmit: withModifiers(updateBranch, ["prevent"]),
                        class: "space-y-6 pt-2"
                      }, [
                        createBaseVNode("div", _hoisted_182, [
                          createBaseVNode("div", _hoisted_183, [
                            createBaseVNode("div", null, [
                              _cache[153] || (_cache[153] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Branch Designation", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[37] || (_cache[37] = $event => ((editBranchData.value.name) = $event)),
                                required: "",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase"
                              }, null, 512), [
                                [vModelText, editBranchData.value.name]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[155] || (_cache[155] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Physical Location", -1)),
                              createBaseVNode("div", _hoisted_184, [
                                _cache[154] || (_cache[154] = createBaseVNode("i", { class: "fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" }, null, -1)),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[38] || (_cache[38] = $event => ((editBranchData.value.location) = $event)),
                                  required: "",
                                  class: "w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-bold uppercase"
                                }, null, 512), [
                                  [vModelText, editBranchData.value.location]
                                ])
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_185, [
                            createBaseVNode("div", null, [
                              _cache[156] || (_cache[156] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Technical Phone", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[39] || (_cache[39] = $event => ((editBranchData.value.phone) = $event)),
                                type: "tel",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold"
                              }, null, 512), [
                                [vModelText, editBranchData.value.phone]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              _cache[157] || (_cache[157] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2" }, "Technical Email", -1)),
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": _cache[40] || (_cache[40] = $event => ((editBranchData.value.email) = $event)),
                                type: "email",
                                class: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-sm focus:ring-1 focus:ring-[#BE0F2C] focus:border-[#BE0F2C] outline-none transition-all placeholder-gray-300 text-xs font-mono font-bold"
                              }, null, 512), [
                                [vModelText, editBranchData.value.email]
                              ])
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_186, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: closeEditBranchModal,
                            class: "px-5 py-2 text-gray-500 font-bold text-xs uppercase hover:bg-gray-100 rounded-sm transition-colors"
                          }, "CANCEL_OP"),
                          createBaseVNode("button", {
                            type: "submit",
                            disabled: loading.value,
                            class: "px-6 py-2 bg-[#BE0F2C] text-white font-bold text-xs uppercase rounded-sm hover:bg-[#8B0015] shadow-md transition-all disabled:opacity-50"
                          }, [
                            (loading.value)
                              ? (openBlock(), createElementBlock("span", _hoisted_188, [...(_cache[158] || (_cache[158] = [
                                  createBaseVNode("i", { class: "fas fa-spinner fa-spin mr-2" }, null, -1),
                                  createTextVNode("EXECUTING...", -1)
                                ]))]))
                              : (openBlock(), createElementBlock("span", _hoisted_189, "UPDATE_BRANCH"))
                          ], 8, _hoisted_187)
                        ])
                      ], 32)
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]))
    ])
  ]))
}
}

};
const SubAccountModule = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-4716d3d8"]]);

export { SubAccountModule as default };
