import { r as ref, i as computed, f as onMounted, c as createElementBlock, b as createBaseVNode, a as createStaticVNode, A as createTextVNode, h as normalizeClass, t as toDisplayString, x as withDirectives, O as vShow, y as vModelText, F as Fragment, e as renderList, j as createCommentVNode, v as withModifiers, L as vModelSelect, z as vModelDynamic, ah as DEFAULT_ROLE_PERMISSIONS, u as useRouter, o as openBlock } from './index-rR_eRHdu.js';
import { b as authApi } from './auth_api-BRvnNIi6.js';

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 shrink-0 relative z-0" };
const _hoisted_3 = { class: "max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4" };
const _hoisted_4 = { class: "flex items-center gap-2 shrink-0" };
const _hoisted_5 = { class: "max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 border-t border-gray-200" };
const _hoisted_6 = { class: "text-[9px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-600 font-black" };
const _hoisted_7 = { class: "text-[9px] font-mono px-1.5 py-0.5 bg-red-50 text-absa-passion font-black" };
const _hoisted_8 = { class: "text-[9px] font-mono px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-200 font-black" };
const _hoisted_9 = { class: "flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" };
const _hoisted_11 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_12 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_13 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_14 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_15 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_16 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_17 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_18 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_19 = { class: "bg-white p-3 border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between relative z-10 transition-colors hover:border-absa-passion" };
const _hoisted_20 = { class: "relative flex-1 w-full md:max-w-md" };
const _hoisted_21 = { class: "flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0" };
const _hoisted_22 = { class: "flex items-center border border-gray-200 overflow-hidden bg-gray-50" };
const _hoisted_23 = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 relative z-10"
};
const _hoisted_24 = { class: "absolute top-0 right-0 max-w-[65%] py-1 px-3 text-right leading-[1.15] bg-white border-b border-l border-gray-200 text-[9px] font-black text-gray-500 uppercase tracking-wider group-hover:bg-absa-passion group-hover:text-white group-hover:border-absa-passion transition-colors z-20" };
const _hoisted_25 = { class: "relative z-10" };
const _hoisted_26 = { class: "flex items-center gap-4 mb-5" };
const _hoisted_27 = { class: "h-12 w-12 shrink-0 flex items-center justify-center bg-red-50 text-absa-passion font-mono font-black text-xl group-hover:bg-absa-passion group-hover:text-white transition-colors" };
const _hoisted_28 = { class: "min-w-0" };
const _hoisted_29 = { class: "font-black text-[11px] text-gray-900 group-hover:text-absa-passion transition-colors truncate uppercase tracking-tight" };
const _hoisted_30 = { class: "text-[9px] font-bold text-gray-500 truncate mt-0.5" };
const _hoisted_31 = { class: "space-y-3 pb-4" };
const _hoisted_32 = { class: "flex items-center justify-between text-[11px] border-b border-gray-200 pb-2" };
const _hoisted_33 = { class: "text-gray-900 font-bold text-right break-words leading-tight max-w-[60%] uppercase" };
const _hoisted_34 = { class: "flex items-center justify-between text-[11px] border-b border-gray-200 pb-2" };
const _hoisted_35 = { class: "px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-[8px] font-bold uppercase truncate max-w-[60%]" };
const _hoisted_36 = { class: "flex items-center justify-between text-[11px]" };
const _hoisted_37 = { class: "flex items-center gap-2 pt-4 border-t border-gray-200 relative z-10" };
const _hoisted_38 = ["onClick"];
const _hoisted_39 = ["onClick"];
const _hoisted_40 = ["onClick"];
const _hoisted_41 = {
  key: 0,
  class: "col-span-full text-center py-16 border border-dashed border-gray-200 bg-gray-50"
};
const _hoisted_42 = {
  key: 1,
  class: "relative z-10 bg-white border border-gray-200 overflow-hidden"
};
const _hoisted_43 = { class: "overflow-x-auto" };
const _hoisted_44 = { class: "w-full text-left border-collapse" };
const _hoisted_45 = { class: "divide-y divide-gray-200" };
const _hoisted_46 = { class: "px-4 py-3" };
const _hoisted_47 = { class: "flex items-center gap-3" };
const _hoisted_48 = { class: "h-9 w-9 shrink-0 bg-red-50 flex items-center justify-center font-black text-[11px] text-absa-passion group-hover:bg-absa-passion group-hover:text-white transition-colors" };
const _hoisted_49 = { class: "min-w-0 flex flex-col justify-center" };
const _hoisted_50 = { class: "text-[11px] font-black text-gray-900 uppercase" };
const _hoisted_51 = { class: "text-[9px] font-bold text-gray-500 mt-0.5 truncate" };
const _hoisted_52 = { class: "px-4 py-3" };
const _hoisted_53 = { class: "inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-[9px] font-black uppercase tracking-widest" };
const _hoisted_54 = { class: "px-4 py-3" };
const _hoisted_55 = { class: "px-4 py-3" };
const _hoisted_56 = { class: "text-[10px] font-black text-gray-900 uppercase" };
const _hoisted_57 = { class: "px-4 py-3 text-right" };
const _hoisted_58 = { class: "flex items-center justify-end gap-1" };
const _hoisted_59 = ["onClick", "title"];
const _hoisted_60 = ["onClick"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = { key: 0 };
const _hoisted_63 = { class: "flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20" };
const _hoisted_64 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4" };
const _hoisted_65 = {
  key: 0,
  class: "flex items-center justify-center py-16"
};
const _hoisted_66 = {
  key: 1,
  class: "bg-red-50 border border-red-200 p-4 text-[10px] font-mono text-red-700 font-bold uppercase tracking-widest"
};
const _hoisted_67 = {
  key: 2,
  class: "flex flex-col space-y-4"
};
const _hoisted_68 = { class: "flex flex-col gap-3" };
const _hoisted_69 = { class: "flex items-center gap-2" };
const _hoisted_70 = { class: "text-[13px] font-black text-gray-900 uppercase tracking-wider" };
const _hoisted_71 = {
  key: 0,
  class: "px-2 py-0.5 bg-absa-passion text-white text-[9px] font-mono font-bold uppercase tracking-widest"
};
const _hoisted_72 = {
  key: 1,
  class: "px-2 py-0.5 bg-red-50 text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest"
};
const _hoisted_73 = { class: "text-xs text-gray-500" };
const _hoisted_74 = { class: "flex items-center gap-2 flex-wrap mt-1" };
const _hoisted_75 = {
  key: 0,
  class: "text-[9px] font-mono text-gray-400 font-bold ml-1"
};
const _hoisted_76 = { class: "flex items-center gap-2 ml-4" };
const _hoisted_77 = ["onClick"];
const _hoisted_78 = ["onClick"];
const _hoisted_79 = {
  key: 3,
  class: "flex flex-col items-center justify-center py-16 text-center"
};
const _hoisted_80 = { class: "bg-white border-t-4 border-absa-passion shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col relative overflow-hidden" };
const _hoisted_81 = { class: "flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50" };
const _hoisted_82 = { class: "flex items-center gap-4" };
const _hoisted_83 = { class: "px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm" };
const _hoisted_84 = { class: "p-6 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-6 shrink-0" };
const _hoisted_85 = { class: "flex-1" };
const _hoisted_86 = { class: "flex-[2]" };
const _hoisted_87 = { class: "flex-1 overflow-hidden flex flex-col md:flex-row" };
const _hoisted_88 = { class: "w-full md:w-80 flex flex-col border-r border-gray-100 bg-gray-50/30 shrink-0 h-[60vh] md:h-auto overflow-y-auto" };
const _hoisted_89 = { class: "p-5 flex-1" };
const _hoisted_90 = { class: "flex items-center justify-between mb-4" };
const _hoisted_91 = { class: "text-[9px] font-mono font-bold text-absa-passion uppercase tracking-widest" };
const _hoisted_92 = { class: "flex flex-col space-y-1" };
const _hoisted_93 = ["onClick"];
const _hoisted_94 = { class: "flex items-center gap-3" };
const _hoisted_95 = { class: "p-5 border-t border-gray-100 bg-white shrink-0" };
const _hoisted_96 = { class: "flex items-center justify-between mb-4" };
const _hoisted_97 = { class: "grid grid-cols-2 gap-y-3 gap-x-4" };
const _hoisted_98 = ["onClick"];
const _hoisted_99 = { class: "text-[10px] font-black text-gray-700 group-hover:text-gray-900 uppercase tracking-wider" };
const _hoisted_100 = { class: "flex-1 bg-gray-50/50 flex flex-col h-[60vh] md:h-auto overflow-hidden" };
const _hoisted_101 = { class: "flex justify-between items-center p-5 border-b border-gray-100 bg-white shrink-0" };
const _hoisted_102 = { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" };
const _hoisted_103 = { class: "p-6 overflow-y-auto flex-1" };
const _hoisted_104 = { class: "bg-white border border-gray-100 p-6 shadow-sm rounded-sm" };
const _hoisted_105 = { class: "flex items-center gap-2 mb-6 border-b border-gray-100 pb-4" };
const _hoisted_106 = { class: "text-xs font-black text-gray-900 uppercase tracking-wider" };
const _hoisted_107 = { class: "grid grid-cols-1 xl:grid-cols-2 gap-4" };
const _hoisted_108 = ["onClick"];
const _hoisted_109 = {
  key: 0,
  class: "fas fa-check text-[10px]"
};
const _hoisted_110 = { class: "flex items-center gap-2" };
const _hoisted_111 = { class: "text-[11px] font-black text-gray-900 uppercase tracking-wider" };
const _hoisted_112 = { class: "text-[10px] font-mono text-gray-500 mt-1" };
const _hoisted_113 = { class: "p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0" };
const _hoisted_114 = ["disabled"];
const _hoisted_115 = { key: 0 };
const _hoisted_116 = { key: 1 };
const _hoisted_117 = { class: "bg-white border border-gray-200 shadow-xl w-full max-w-md p-6" };
const _hoisted_118 = { class: "flex justify-between items-center mb-6" };
const _hoisted_119 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_120 = ["value"];
const _hoisted_121 = ["value"];
const _hoisted_122 = { class: "pt-4 flex justify-end gap-2" };
const _hoisted_123 = { class: "bg-white shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh]" };
const _hoisted_124 = { class: "p-6 border-b border-gray-100 flex justify-between items-start shrink-0" };
const _hoisted_125 = { class: "flex items-center gap-4" };
const _hoisted_126 = { class: "text-xl font-black text-gray-900 uppercase tracking-tight mt-1" };
const _hoisted_127 = { class: "flex border-b border-gray-100 px-6 shrink-0" };
const _hoisted_128 = { class: "p-8 overflow-y-auto flex-1" };
const _hoisted_129 = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8" };
const _hoisted_130 = { class: "space-y-6" };
const _hoisted_131 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_132 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_133 = { class: "space-y-6" };
const _hoisted_134 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_135 = { class: "flex items-center justify-between mb-2" };
const _hoisted_136 = ["value"];
const _hoisted_137 = ["value"];
const _hoisted_138 = { class: "relative" };
const _hoisted_139 = ["type"];
const _hoisted_140 = { class: "relative" };
const _hoisted_141 = ["type"];
const _hoisted_142 = { class: "p-8 overflow-y-auto flex-1 bg-gray-50/30" };
const _hoisted_143 = { class: "bg-white border border-gray-200 p-4 mb-6 flex items-start gap-4" };
const _hoisted_144 = { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest" };
const _hoisted_145 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" };
const _hoisted_146 = ["onClick"];
const _hoisted_147 = { class: "flex items-center gap-2" };
const _hoisted_148 = { class: "text-[10px] font-black uppercase tracking-wider" };
const _hoisted_149 = {
  key: 0,
  class: "fas fa-check text-xs"
};
const _hoisted_150 = {
  key: 1,
  class: "fas fa-plus text-xs text-gray-300"
};
const _hoisted_151 = { class: "p-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0" };
const _hoisted_152 = ["disabled"];
const _hoisted_153 = { key: 0 };
const _hoisted_154 = { key: 1 };
const _sfc_main = {
  __name: "UserManagement",
  setup(__props) {
    const router = useRouter();
    const activeTab = ref("users");
    ref(false);
    const selectedRole = ref(null);
    const savingRole = ref(false);
    const errorMsg = ref("");
    ref({ role_name: "", description: "" });
    const activeModalModule = ref("crm");
    const deselectAllMain = (modId) => {
      if (!selectedRole.value || !selectedRole.value.permissions || !selectedRole.value.permissions[modId]) return;
      const mainPerms = ["read", "write", "edit", "delete", "assign", "approve", "export"];
      selectedRole.value.permissions[modId] = selectedRole.value.permissions[modId].filter((p) => !mainPerms.includes(p));
    };
    const toggleFeature = (modId, featId) => {
      console.log("toggleFeature", modId, featId);
      if (!selectedRole.value) return;
      if (!selectedRole.value.permissions) selectedRole.value.permissions = {};
      if (!selectedRole.value.permissions[modId]) selectedRole.value.permissions[modId] = [];
      const arr = selectedRole.value.permissions[modId];
      const idx = arr.indexOf(featId);
      if (idx === -1) {
        arr.push(featId);
      } else {
        arr.splice(idx, 1);
      }
    };
    const hasFeature = (modId, featId) => {
      if (!selectedRole.value || !selectedRole.value.permissions) return false;
      return (selectedRole.value.permissions[modId] || []).includes(featId);
    };
    const actualModules = [
      {
        id: "crm",
        name: "CRM & SALES",
        icon: "fas fa-address-book",
        features: [
          { id: "workspace", name: "WORKSPACE", desc: "Omnichannel workspace & communication", icon: "fas fa-headset" },
          { id: "customers", name: "MY CUSTOMERS", desc: "Assigned customer list and profiles", icon: "fas fa-users" },
          { id: "tickets", name: "TICKETS & CASES", desc: "Customer support ticketing", icon: "fas fa-ticket-alt" },
          { id: "analytics", name: "CRM ANALYTICS", desc: "Sales and performance dashboards", icon: "fas fa-chart-pie" },
          { id: "calendar", name: "CALENDAR & ACTIVITIES", desc: "Manage meetings and activities", icon: "fas fa-calendar-alt" }
        ]
      },
      {
        id: "etl-pipeline",
        name: "DATA PIPELINE",
        icon: "fas fa-network-wired",
        features: [
          { id: "pipeline", name: "ETL PIPELINE", desc: "Main data integration pipeline", icon: "fas fa-project-diagram" },
          { id: "history", name: "ETL RUN HISTORY", desc: "Logs and execution history", icon: "fas fa-history" },
          { id: "config", name: "ETL CONFIG MANAGER", desc: "Pipeline settings and configurations", icon: "fas fa-cogs" }
        ]
      },
      {
        id: "intelligence",
        name: "INTELLIGENCE & AI",
        icon: "fas fa-brain",
        features: [
          { id: "cv", name: "CUSTOMER VALUE", desc: "Lifetime value & profitability metrics", icon: "fas fa-gem" },
          { id: "lifecycle", name: "LIFECYCLE PREDICTION", desc: "Customer journey prediction and churn", icon: "fas fa-recycle" },
          { id: "forecast", name: "BALANCE FORECAST", desc: "Predictive account balance models", icon: "fas fa-chart-area" },
          { id: "outcomes", name: "BUSINESS OUTCOMES", desc: "Goal tracking and projections", icon: "fas fa-bullseye" },
          { id: "models", name: "MODEL PERFORMANCE", desc: "AI model monitoring and drift", icon: "fas fa-robot" }
        ]
      },
      {
        id: "operations",
        name: "OPERATIONS",
        icon: "fas fa-briefcase",
        features: [
          { id: "portfolio", name: "PORTFOLIO OVERVIEW", desc: "Global portfolio metrics dashboard", icon: "fas fa-globe" },
          { id: "branch", name: "BRANCH MANAGER", desc: "Branch-level performance dashboard", icon: "fas fa-store" }
        ]
      },
      {
        id: "settings",
        name: "SETTINGS & ADMIN",
        icon: "fas fa-sliders-h",
        features: [
          { id: "settings", name: "PLATFORM SETTINGS", desc: "System-wide configurations", icon: "fas fa-cog" },
          { id: "users", name: "USER MANAGEMENT", desc: "Roles, permissions and users", icon: "fas fa-users-cog" },
          { id: "subaccounts", name: "SUB ACCOUNTS", desc: "Manage sub-entities", icon: "fas fa-sitemap" }
        ]
      }
    ];
    const activeModuleData = computed(() => {
      return actualModules.find((m) => m.id === activeModalModule.value) || actualModules[0];
    });
    const openRoleDetails = (role) => {
      selectedRole.value = {
        ...role,
        permissions: role.permissions ? JSON.parse(JSON.stringify(role.permissions)) : {
          "crm": ["workspace", "customers", "tickets", "analytics", "calendar"],
          "etl-pipeline": ["pipeline", "history", "config"],
          "intelligence": ["cv", "lifecycle", "forecast", "outcomes", "models"],
          "operations": ["portfolio", "branch"],
          "settings": ["settings", "users"]
        }
      };
    };
    const saveRoleDetails = async () => {
      if (!selectedRole.value) return;
      savingRole.value = true;
      errorMsg.value = "";
      try {
        const roleId = selectedRole.value.id || selectedRole.value.name.toLowerCase().replace(/ /g, "_");
        const payload = {
          id: roleId,
          name: selectedRole.value.name,
          description: selectedRole.value.description || "",
          permissions: selectedRole.value.permissions
        };
        let localRoles = JSON.parse(localStorage.getItem("mock_absa_roles") || "[]");
        const existingIdx = localRoles.findIndex((r) => r.id === roleId);
        if (existingIdx >= 0) {
          localRoles[existingIdx] = payload;
        } else {
          localRoles.push(payload);
        }
        localStorage.setItem("mock_absa_roles", JSON.stringify(localRoles));
        closeRoleDetails();
        await fetchRoles();
      } catch (err) {
        console.error("Failed to save role", err);
        errorMsg.value = err.message || "Failed to save role";
      } finally {
        savingRole.value = false;
      }
    };
    const closeRoleDetails = () => {
      selectedRole.value = null;
    };
    const getAccessiblePages = (role) => {
      const routes = router.getRoutes();
      const pages = /* @__PURE__ */ new Set();
      const rolePerms = role.permissions && Object.keys(role.permissions).length > 0 ? role.permissions : DEFAULT_ROLE_PERMISSIONS[role.name || role] || {};
      let hasGranularFeatures = false;
      Object.keys(rolePerms).forEach((modId) => {
        const mod = actualModules.find((m) => m.id === modId);
        if (mod) {
          rolePerms[modId].forEach((featId) => {
            const feat = mod.features.find((f) => f.id === featId);
            if (feat) {
              pages.add(feat.name);
              hasGranularFeatures = true;
            }
          });
        }
      });
      if (!hasGranularFeatures) {
        const roleName = role.name || role;
        routes.forEach((route) => {
          let hasAccess = false;
          if (route.meta && route.meta.requiredPermissions) {
            hasAccess = route.meta.requiredPermissions.every((p) => {
              return rolePerms[p.entity] && rolePerms[p.entity].includes(p.action);
            });
          } else if (route.meta && route.meta.requiresRoles) {
            hasAccess = route.meta.requiresRoles.includes(roleName);
          }
          if (hasAccess) {
            if (route.meta.title) {
              pages.add(route.meta.title);
            } else if (route.name) {
              pages.add(route.name);
            }
          }
        });
      }
      return Array.from(pages).sort();
    };
    const users = ref([]);
    const roles = ref([]);
    const search = ref("");
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const activeUserTab = ref("profile");
    const showPwd = ref(false);
    const showPwd2 = ref(false);
    const saving = ref(false);
    const toggleUserModule = (modId) => {
      if (!editForm.value.custom_modules) editForm.value.custom_modules = [];
      const idx = editForm.value.custom_modules.indexOf(modId);
      if (idx >= 0) {
        editForm.value.custom_modules.splice(idx, 1);
      } else {
        editForm.value.custom_modules.push(modId);
      }
    };
    const viewMode = ref("cards");
    const branches = ref([]);
    const showBranchModal = ref(false);
    ref(false);
    ref(false);
    const newBranch = ref({ branch_code: "", name: "", location: "", phone: "", email: "" });
    ref({});
    const getBranchName = (code) => {
      if (!code) return "N/A";
      const b = branches.value.find((x) => x.branch_code === code);
      return b ? b.name : code;
    };
    const createForm = ref({ username: "", email: "", display_name: "", password: "", role: "", branch_code: "" });
    const editForm = ref({ user_id: null, role: "", branch_code: "" });
    const fetchUsers = async () => {
      try {
        users.value = await authApi.listUsers();
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    const rolesLoading = ref(false);
    const rolesError = ref("");
    const deleteRole = async (role) => {
      if (!confirm(`Are you sure you want to delete role ${role.name}?`)) return;
      try {
        let localRoles = JSON.parse(localStorage.getItem("mock_absa_roles") || "[]");
        localRoles = localRoles.filter((r) => r.id !== role.id);
        localStorage.setItem("mock_absa_roles", JSON.stringify(localRoles));
        await fetchRoles();
      } catch (err) {
        console.error("Failed to delete role", err);
        rolesError.value = err.message || "Failed to delete role";
      }
    };
    const fetchRoles = async () => {
      rolesLoading.value = true;
      rolesError.value = "";
      try {
        const token = localStorage.getItem("token");
        const BASE_URL = "http://22.84.115.25:8080".trim() || "http://22.84.115.25:8080";
        let apiRoles = [];
        try {
          const res = await fetch(`${BASE_URL}/auth/admin/roles`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (res.ok) {
            const rawRoles = await res.json();
            apiRoles = rawRoles.map((r) => ({
              id: r.role_id || r.role_name,
              name: r.role_name,
              description: r.description || "",
              permissions: DEFAULT_ROLE_PERMISSIONS[r.role_name] || DEFAULT_ROLE_PERMISSIONS["SUPERADMIN"]
            }));
          }
        } catch (apiErr) {
          console.warn("API roles fetch failed, falling back to local only:", apiErr);
        }
        let localRoles = JSON.parse(localStorage.getItem("mock_absa_roles") || "[]");
        const merged = [...apiRoles];
        for (const lr of localRoles) {
          const idx = merged.findIndex((r) => r.id === lr.id || r.name === lr.name);
          if (idx >= 0) {
            merged[idx] = { ...merged[idx], ...lr };
          } else {
            merged.push(lr);
          }
        }
        if (merged.length === 0) {
          merged.push({ id: "superadmin", name: "SUPERADMIN", description: "System Administrator.", permissions: DEFAULT_ROLE_PERMISSIONS["SUPERADMIN"] });
          merged.push({ id: "relationship_manager", name: "RELATIONSHIP_MANAGER", description: "Manages customers.", permissions: DEFAULT_ROLE_PERMISSIONS["RELATIONSHIP_MANAGER"] || {} });
        }
        roles.value = merged;
      } catch (err) {
        console.error("Failed to fetch roles", err);
        rolesError.value = err.message || "Failed to load roles";
      } finally {
        rolesLoading.value = false;
      }
    };
    const filteredUsers = computed(() => {
      if (!search.value) return users.value;
      const q = search.value.toLowerCase();
      return users.value.filter(
        (u) => u.display_name && u.display_name.toLowerCase().includes(q) || u.email && u.email.toLowerCase().includes(q) || u.username && u.username.toLowerCase().includes(q)
      );
    });
    const activeBranches = computed(() => {
      const branchSet = new Set(users.value.map((u) => u.branch_code).filter(Boolean));
      return branchSet.size || 0;
    });
    const activeUsersCount = computed(() => {
      return users.value.filter((u) => u.is_active).length || 0;
    });
    const handleCreateUser = async () => {
      saving.value = true;
      try {
        await authApi.createUser({
          username: createForm.value.username,
          email: createForm.value.email,
          display_name: createForm.value.display_name,
          password: createForm.value.password,
          roles: [createForm.value.role],
          branch_code: createForm.value.branch_code
        });
        showCreateModal.value = false;
        createForm.value = { username: "", email: "", display_name: "", password: "", role: "", branch_code: "" };
        await fetchUsers();
      } catch (err) {
        alert(err.message || "Failed to create user");
      } finally {
        saving.value = false;
      }
    };
    const openEditUser = (u) => {
      const userRole = (u.roles || [])[0];
      const matchedRole = roles.value.find((r) => {
        const rId = String(r.id || "");
        const rName = String(r.name || "");
        const uRole = String(userRole || "");
        return rId === uRole || rName === uRole || rId.toLowerCase() === uRole.toLowerCase() || rName.toLowerCase() === uRole.toLowerCase();
      });
      editForm.value = {
        user_id: u.user_id,
        username: u.username || "",
        display_name: u.display_name || u.username || "",
        email: u.email || "",
        phone: u.phone || "",
        secondary_email: u.secondary_email || "",
        department: u.department || "SALES & MARKETING",
        approval_level: u.approval_level || "LEVEL 0: AUTO-APPROVED",
        role: matchedRole ? matchedRole.name : userRole || "",
        branch_code: u.branch_code || "",
        password: "",
        confirm_password: "",
        custom_modules: u.custom_modules || []
      };
      activeUserTab.value = "profile";
      showEditModal.value = true;
    };
    const handleEditUser = async () => {
      saving.value = true;
      try {
        await authApi.updateUser(editForm.value.user_id, {
          roles: [editForm.value.role],
          branch_code: editForm.value.branch_code
        });
        showEditModal.value = false;
        await fetchUsers();
      } catch (err) {
        alert(err.message || "Failed to update user");
      } finally {
        saving.value = false;
      }
    };
    const toggleUserStatus = async (u) => {
      try {
        await authApi.updateUser(u.user_id, { is_active: !u.is_active });
        await fetchUsers();
      } catch (err) {
        alert(err.message || "Failed to update status");
      }
    };
    const deleteUser = async (u) => {
      if (!confirm(`Are you sure you want to permanently delete user: ${u.display_name || u.username}?`)) return;
      try {
        await authApi.deleteUser(u.user_id);
        await fetchUsers();
      } catch (err) {
        console.error("Delete failed:", err.response?.data || err);
        const serverDetail = err.response?.data?.detail;
        alert(serverDetail ? `Error: ${serverDetail}` : err.message || "Failed to delete user");
      }
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "Never";
      return new Date(dateStr).toLocaleString();
    };
    onMounted(() => {
      fetchUsers();
      fetchRoles();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[42] || (_cache[42] = createStaticVNode('<div class="flex items-center gap-3 min-w-0"><div class="min-w-0"><span class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Module // User Management</span><h1 class="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display leading-tight truncate">User Management</h1><p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1"> Create staff accounts, assign roles &amp; branches, and control module access </p></div></div>', 1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  showBranchModal.value = true;
                  newBranch.value = { branch_code: "", name: "", location: "", phone: "", email: "" };
                }),
                class: "h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer"
              }, [..._cache[39] || (_cache[39] = [
                createBaseVNode("i", { class: "fas fa-store" }, null, -1),
                createTextVNode(" Add Branch ", -1)
              ])]),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  showBranchModal.value = true;
                  newBranch.value = { branch_code: "", name: "", location: "", phone: "", email: "" };
                }),
                class: "h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer"
              }, [..._cache[40] || (_cache[40] = [
                createBaseVNode("i", { class: "fas fa-cog" }, null, -1),
                createTextVNode(" Manage Branches ", -1)
              ])]),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => showCreateModal.value = true),
                class: "h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-[#b3002d] cursor-pointer"
              }, [..._cache[41] || (_cache[41] = [
                createBaseVNode("i", { class: "fas fa-plus" }, null, -1),
                createTextVNode(" New User ", -1)
              ])])
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("button", {
              type: "button",
              onClick: _cache[3] || (_cache[3] = ($event) => activeTab.value = "users"),
              class: normalizeClass([activeTab.value === "users" ? "border-absa-passion text-absa-passion bg-white" : "border-transparent text-gray-500 hover:text-gray-900 bg-transparent", "py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer"])
            }, [
              _cache[43] || (_cache[43] = createBaseVNode("i", { class: "fas fa-users" }, null, -1)),
              _cache[44] || (_cache[44] = createTextVNode(" Users ", -1)),
              createBaseVNode("span", _hoisted_6, toDisplayString(users.value.length), 1)
            ], 2),
            createBaseVNode("button", {
              type: "button",
              onClick: _cache[4] || (_cache[4] = ($event) => activeTab.value = "roles"),
              class: normalizeClass([activeTab.value === "roles" ? "border-absa-passion text-absa-passion bg-white" : "border-transparent text-gray-500 hover:text-gray-900 bg-transparent", "py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer"])
            }, [
              _cache[45] || (_cache[45] = createBaseVNode("i", { class: "fas fa-user-shield" }, null, -1)),
              _cache[46] || (_cache[46] = createTextVNode(" Roles & Permissions ", -1)),
              createBaseVNode("span", _hoisted_7, toDisplayString(roles.value.length), 1)
            ], 2),
            createBaseVNode("button", {
              type: "button",
              onClick: _cache[5] || (_cache[5] = ($event) => activeTab.value = "sessions"),
              class: normalizeClass([activeTab.value === "sessions" ? "border-absa-passion text-absa-passion bg-white" : "border-transparent text-gray-500 hover:text-gray-900 bg-transparent", "py-2.5 px-4 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 cursor-pointer"])
            }, [
              _cache[47] || (_cache[47] = createBaseVNode("i", { class: "fas fa-user-check" }, null, -1)),
              _cache[48] || (_cache[48] = createTextVNode(" Active Sessions ", -1)),
              createBaseVNode("span", _hoisted_8, toDisplayString(activeUsersCount.value || 0), 1)
            ], 2)
          ])
        ]),
        withDirectives(createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              _cache[49] || (_cache[49] = createStaticVNode('<div class="flex items-center justify-between mb-3"><div class="text-gray-400"><i class="fas fa-users text-[18px]"></i></div><span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Users</span></div><h5 class="text-xs font-medium text-gray-500 mb-1">Registered Users</h5>', 2)),
              createBaseVNode("p", _hoisted_12, toDisplayString(users.value.length || 0), 1)
            ]),
            createBaseVNode("div", _hoisted_13, [
              _cache[50] || (_cache[50] = createStaticVNode('<div class="flex items-center justify-between mb-3"><div class="text-gray-400"><i class="fas fa-store text-[18px]"></i></div><span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Branches</span></div><h5 class="text-xs font-medium text-gray-500 mb-1">Active Branches</h5>', 2)),
              createBaseVNode("p", _hoisted_14, toDisplayString(activeBranches.value || 0), 1)
            ]),
            createBaseVNode("div", _hoisted_15, [
              _cache[51] || (_cache[51] = createStaticVNode('<div class="flex items-center justify-between mb-3"><div class="text-gray-400"><i class="fas fa-user-check text-[18px]"></i></div><span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Active</span></div><h5 class="text-xs font-medium text-gray-500 mb-1">Active Accounts</h5>', 2)),
              createBaseVNode("p", _hoisted_16, toDisplayString(activeUsersCount.value || 0), 1)
            ]),
            createBaseVNode("div", _hoisted_17, [
              _cache[52] || (_cache[52] = createStaticVNode('<div class="flex items-center justify-between mb-3"><div class="text-gray-400"><i class="fas fa-database text-[18px]"></i></div><span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Filtered</span></div><h5 class="text-xs font-medium text-gray-500 mb-1">Filtered Context</h5>', 2)),
              createBaseVNode("p", _hoisted_18, toDisplayString(filteredUsers.value.length || 0), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("div", _hoisted_20, [
              _cache[53] || (_cache[53] = createBaseVNode("i", { class: "fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" }, null, -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => search.value = $event),
                placeholder: "Search by name or email...",
                autocomplete: "off",
                "data-1p-ignore": "",
                class: "w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-200 focus:border-absa-passion outline-none transition-colors placeholder-gray-400 text-[11px] font-mono font-bold"
              }, null, 512), [
                [vModelText, search.value]
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              _cache[57] || (_cache[57] = createStaticVNode('<div class="relative min-w-[140px]"><select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors"><option value="">All Roles</option></select><i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i></div><div class="relative min-w-[150px]"><select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors"><option value="">All Departments</option></select><i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i></div><div class="relative min-w-[150px]"><select class="w-full h-9 appearance-none px-3 bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest outline-none cursor-pointer hover:border-absa-passion focus:border-absa-passion transition-colors"><option value="">All Branches</option></select><i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]"></i></div>', 3)),
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("button", {
                  onClick: _cache[7] || (_cache[7] = ($event) => viewMode.value = "cards"),
                  class: normalizeClass([viewMode.value === "cards" ? "bg-absa-passion text-white" : "text-gray-500 hover:text-absa-passion hover:bg-white", "h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"])
                }, [..._cache[54] || (_cache[54] = [
                  createBaseVNode("i", { class: "fas fa-th" }, null, -1)
                ])], 2),
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = ($event) => viewMode.value = "list"),
                  class: normalizeClass([viewMode.value === "list" ? "bg-absa-passion text-white" : "text-gray-500 hover:text-absa-passion hover:bg-white", "h-9 px-3 text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1.5 border-l border-gray-200 cursor-pointer"])
                }, [..._cache[55] || (_cache[55] = [
                  createBaseVNode("i", { class: "fas fa-list" }, null, -1)
                ])], 2)
              ]),
              createBaseVNode("button", {
                onClick: fetchUsers,
                class: "h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion"
              }, [..._cache[56] || (_cache[56] = [
                createBaseVNode("i", { class: "fas fa-sync-alt" }, null, -1),
                createBaseVNode("span", null, "Reload", -1)
              ])])
            ])
          ]),
          viewMode.value === "cards" ? (openBlock(), createElementBlock("div", _hoisted_23, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredUsers.value, (u, index) => {
              return openBlock(), createElementBlock("div", {
                key: u.user_id,
                class: "group bg-white border border-gray-200 p-5 transition-colors duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full min-h-[220px] hover:border-absa-passion"
              }, [
                createBaseVNode("div", _hoisted_24, toDisplayString((u.roles || []).join(", ") || "USER"), 1),
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    createBaseVNode("div", _hoisted_27, toDisplayString((u.display_name || u.username || "?").charAt(0).toUpperCase()), 1),
                    createBaseVNode("div", _hoisted_28, [
                      createBaseVNode("h3", _hoisted_29, toDisplayString(u.display_name || u.username), 1),
                      createBaseVNode("p", _hoisted_30, toDisplayString(u.email), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_31, [
                    createBaseVNode("div", _hoisted_32, [
                      _cache[58] || (_cache[58] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-widest text-[9px] font-bold" }, "Branch", -1)),
                      createBaseVNode("span", _hoisted_33, toDisplayString(getBranchName(u.branch_code)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_34, [
                      _cache[59] || (_cache[59] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-widest text-[9px] font-bold" }, "Dept", -1)),
                      createBaseVNode("span", _hoisted_35, toDisplayString(u.department || "N/A"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_36, [
                      _cache[60] || (_cache[60] = createBaseVNode("span", { class: "text-gray-400 uppercase tracking-widest text-[9px] font-bold" }, "Status", -1)),
                      createBaseVNode("span", {
                        class: normalizeClass([u.is_active ? "text-gray-900" : "text-gray-400", "flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-wider"])
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass(["w-1.5 h-1.5 rounded-full", u.is_active ? "bg-absa-passion" : "bg-gray-300"])
                        }, null, 2),
                        createTextVNode(" " + toDisplayString(u.is_active ? "Active" : "Offline"), 1)
                      ], 2)
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_37, [
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => toggleUserStatus(u), ["stop"]),
                    class: normalizeClass(["flex-1 h-9 flex items-center justify-center gap-2 text-white transition-colors text-[10px] font-bold uppercase tracking-widest cursor-pointer", u.is_active ? "bg-absa-passion hover:bg-[#b3002d] text-white" : "bg-gray-800 hover:bg-gray-900 text-white"])
                  }, [
                    createBaseVNode("i", {
                      class: normalizeClass(["fas", u.is_active ? "fa-ban" : "fa-check"])
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(u.is_active ? "Disable" : "Enable"), 1)
                  ], 10, _hoisted_38),
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => openEditUser(u), ["stop"]),
                    class: "w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 border border-gray-200 transition-colors cursor-pointer hover:text-absa-passion hover:border-absa-passion",
                    title: "Edit user"
                  }, [..._cache[61] || (_cache[61] = [
                    createBaseVNode("i", { class: "fas fa-edit text-xs" }, null, -1)
                  ])], 8, _hoisted_39),
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => deleteUser(u), ["stop"]),
                    class: "w-9 h-9 shrink-0 flex items-center justify-center text-gray-400 border border-gray-200 transition-colors cursor-pointer hover:text-red-600 hover:border-red-600",
                    title: "Delete"
                  }, [..._cache[62] || (_cache[62] = [
                    createBaseVNode("i", { class: "fas fa-trash-alt text-xs" }, null, -1)
                  ])], 8, _hoisted_40)
                ])
              ]);
            }), 128)),
            filteredUsers.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_41, [..._cache[63] || (_cache[63] = [
              createBaseVNode("i", { class: "fas fa-users-slash text-gray-300 text-4xl mb-4" }, null, -1),
              createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "No users match current filters", -1)
            ])])) : createCommentVNode("", true)
          ])) : viewMode.value === "list" ? (openBlock(), createElementBlock("div", _hoisted_42, [
            createBaseVNode("div", _hoisted_43, [
              createBaseVNode("table", _hoisted_44, [
                _cache[67] || (_cache[67] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-200" }, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "User"),
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Roles"),
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Branch"),
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Status"),
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest" }, "Last Login"),
                    createBaseVNode("th", { class: "px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right" }, "Actions")
                  ])
                ], -1)),
                createBaseVNode("tbody", _hoisted_45, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredUsers.value, (u) => {
                    return openBlock(), createElementBlock("tr", {
                      key: u.user_id,
                      class: "hover:bg-gray-50 transition-colors group"
                    }, [
                      createBaseVNode("td", _hoisted_46, [
                        createBaseVNode("div", _hoisted_47, [
                          createBaseVNode("div", _hoisted_48, toDisplayString((u.display_name || u.username || "?").charAt(0).toUpperCase()), 1),
                          createBaseVNode("div", _hoisted_49, [
                            createBaseVNode("div", _hoisted_50, toDisplayString(u.display_name || u.username), 1),
                            createBaseVNode("div", _hoisted_51, toDisplayString(u.email), 1)
                          ])
                        ])
                      ]),
                      createBaseVNode("td", _hoisted_52, [
                        createBaseVNode("span", _hoisted_53, toDisplayString((u.roles || []).join(", ") || "USER"), 1)
                      ]),
                      createBaseVNode("td", _hoisted_54, [
                        createBaseVNode("span", {
                          class: normalizeClass([u.is_active ? "text-gray-900 bg-gray-100 border-gray-200" : "text-gray-500 bg-gray-50 border-gray-200", "inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-widest"])
                        }, [
                          createBaseVNode("span", {
                            class: normalizeClass(["w-1.5 h-1.5 rounded-full", u.is_active ? "bg-absa-passion" : "bg-gray-300"])
                          }, null, 2),
                          createTextVNode(" " + toDisplayString(u.is_active ? "Active" : "Inactive"), 1)
                        ], 2)
                      ]),
                      createBaseVNode("td", _hoisted_55, [
                        createBaseVNode("div", _hoisted_56, toDisplayString(formatDate(u.last_login_at)), 1)
                      ]),
                      createBaseVNode("td", _hoisted_57, [
                        createBaseVNode("div", _hoisted_58, [
                          createBaseVNode("button", {
                            onClick: ($event) => toggleUserStatus(u),
                            class: normalizeClass([u.is_active ? "text-gray-800 hover:border-gray-900 hover:text-gray-900" : "text-gray-400 hover:border-absa-passion hover:text-absa-passion", "h-8 w-8 border border-gray-200 transition-colors flex items-center justify-center cursor-pointer"]),
                            title: u.is_active ? "Deactivate" : "Activate"
                          }, [
                            createBaseVNode("i", {
                              class: normalizeClass(["fas text-[11px]", u.is_active ? "fa-toggle-on" : "fa-toggle-off"])
                            }, null, 2)
                          ], 10, _hoisted_59),
                          createBaseVNode("button", {
                            onClick: ($event) => openEditUser(u),
                            class: "h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-absa-passion hover:text-absa-passion",
                            title: "Edit User"
                          }, [..._cache[64] || (_cache[64] = [
                            createBaseVNode("i", { class: "fas fa-edit text-[11px]" }, null, -1)
                          ])], 8, _hoisted_60),
                          createBaseVNode("button", {
                            onClick: ($event) => deleteUser(u),
                            class: "h-8 w-8 border border-gray-200 text-gray-400 transition-colors flex items-center justify-center cursor-pointer hover:border-red-600 hover:text-red-600",
                            title: "Delete User"
                          }, [..._cache[65] || (_cache[65] = [
                            createBaseVNode("i", { class: "fas fa-trash-alt text-[11px]" }, null, -1)
                          ])], 8, _hoisted_61)
                        ])
                      ])
                    ]);
                  }), 128)),
                  filteredUsers.value.length === 0 ? (openBlock(), createElementBlock("tr", _hoisted_62, [..._cache[66] || (_cache[66] = [
                    createBaseVNode("td", {
                      colspan: "5",
                      class: "px-4 py-16 text-center"
                    }, [
                      createBaseVNode("i", { class: "fas fa-users-slash text-gray-300 text-3xl mb-3" }),
                      createBaseVNode("p", { class: "text-[11px] font-black text-gray-500 uppercase tracking-widest" }, "No users found")
                    ], -1)
                  ])])) : createCommentVNode("", true)
                ])
              ])
            ])
          ])) : createCommentVNode("", true)
        ], 512), [
          [vShow, activeTab.value === "users"]
        ]),
        withDirectives(createBaseVNode("div", _hoisted_63, [
          createBaseVNode("div", _hoisted_64, [
            _cache[69] || (_cache[69] = createBaseVNode("div", null, [
              createBaseVNode("div", { class: "flex items-center gap-2" }, [
                createBaseVNode("div", { class: "w-1 h-5 bg-absa-passion" }),
                createBaseVNode("h2", { class: "text-lg font-black text-gray-900 uppercase tracking-tight font-display" }, "ROLES & PERMISSIONS")
              ]),
              createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2" }, "MANAGE USER ROLES, MAIN PERMISSIONS, AND GRANULAR MODULE FEATURE ACCESS")
            ], -1)),
            createBaseVNode("button", {
              onClick: _cache[9] || (_cache[9] = ($event) => openRoleDetails({ name: "", description: "", permissions: {} })),
              class: "h-9 px-5 bg-absa-passion text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-[#b3002d] cursor-pointer shrink-0"
            }, [..._cache[68] || (_cache[68] = [
              createBaseVNode("i", { class: "fas fa-plus" }, null, -1),
              createTextVNode(" CREATE ROLE ", -1)
            ])])
          ]),
          rolesLoading.value ? (openBlock(), createElementBlock("div", _hoisted_65, [..._cache[70] || (_cache[70] = [
            createBaseVNode("i", { class: "fas fa-circle-notch fa-spin text-absa-passion text-2xl mr-3" }, null, -1),
            createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Loading roles...", -1)
          ])])) : rolesError.value ? (openBlock(), createElementBlock("div", _hoisted_66, [
            _cache[71] || (_cache[71] = createBaseVNode("i", { class: "fas fa-exclamation-triangle mr-2" }, null, -1)),
            createTextVNode(" " + toDisplayString(rolesError.value), 1)
          ])) : roles.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_67, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (role) => {
              return openBlock(), createElementBlock("div", {
                key: role.id,
                class: "bg-white border border-gray-100 p-6 flex flex-row justify-between items-start hover:border-gray-200 transition-colors"
              }, [
                createBaseVNode("div", _hoisted_68, [
                  createBaseVNode("div", _hoisted_69, [
                    createBaseVNode("h3", _hoisted_70, toDisplayString(role.name), 1),
                    _cache[72] || (_cache[72] = createBaseVNode("span", { class: "px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest" }, "SYSTEM", -1)),
                    role.name === "SUPERADMIN" || role.name === "OWNER" ? (openBlock(), createElementBlock("span", _hoisted_71, "FULL ACCESS")) : (openBlock(), createElementBlock("span", _hoisted_72, "TEMPLATE"))
                  ]),
                  createBaseVNode("p", _hoisted_73, toDisplayString(role.description || "No description provided."), 1),
                  createBaseVNode("div", _hoisted_74, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(getAccessiblePages(role).slice(0, 5), (page) => {
                      return openBlock(), createElementBlock("span", {
                        key: page,
                        class: "px-2 py-1 bg-red-50 text-absa-passion text-[8px] font-mono font-bold uppercase tracking-widest"
                      }, toDisplayString(page), 1);
                    }), 128)),
                    getAccessiblePages(role).length > 5 ? (openBlock(), createElementBlock("span", _hoisted_75, " +" + toDisplayString(getAccessiblePages(role).length - 5) + " more ", 1)) : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_76, [
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => openRoleDetails(role), ["stop"]),
                    class: "w-8 h-8 flex items-center justify-center border border-gray-200 text-absa-passion hover:border-absa-passion hover:bg-red-50 transition-colors bg-white"
                  }, [..._cache[73] || (_cache[73] = [
                    createBaseVNode("i", { class: "fas fa-edit text-xs" }, null, -1)
                  ])], 8, _hoisted_77),
                  role.name !== "SUPERADMIN" && role.name !== "OWNER" ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: withModifiers(($event) => deleteRole(role), ["stop"]),
                    class: "w-8 h-8 flex items-center justify-center border border-gray-200 text-[#ff6b6b] hover:border-[#ff6b6b] hover:bg-red-50 transition-colors bg-white"
                  }, [..._cache[74] || (_cache[74] = [
                    createBaseVNode("i", { class: "fas fa-trash-alt text-xs" }, null, -1)
                  ])], 8, _hoisted_78)) : createCommentVNode("", true)
                ])
              ]);
            }), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_79, [..._cache[75] || (_cache[75] = [
            createBaseVNode("i", { class: "fas fa-user-shield text-gray-200 text-5xl mb-4" }, null, -1),
            createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "No roles configured in the system", -1)
          ])]))
        ], 512), [
          [vShow, activeTab.value === "roles"]
        ]),
        selectedRole.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md",
          onClick: withModifiers(closeRoleDetails, ["self"])
        }, [
          createBaseVNode("div", _hoisted_80, [
            createBaseVNode("div", _hoisted_81, [
              _cache[77] || (_cache[77] = createBaseVNode("div", null, [
                createBaseVNode("div", { class: "flex items-center gap-2" }, [
                  createBaseVNode("div", { class: "w-1 h-5 bg-absa-passion" }),
                  createBaseVNode("h2", { class: "text-lg font-black text-gray-900 uppercase tracking-tight font-display" }, "EDIT ROLE")
                ]),
                createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-2" }, "CONFIGURE MODULE ACCESS AND GRANULAR TOOL TOGGLES")
              ], -1)),
              createBaseVNode("div", _hoisted_82, [
                createBaseVNode("span", _hoisted_83, toDisplayString(actualModules.length) + " MODULES AVAILABLE", 1),
                createBaseVNode("button", {
                  onClick: closeRoleDetails,
                  class: "text-gray-400 hover:text-absa-passion transition-colors"
                }, [..._cache[76] || (_cache[76] = [
                  createBaseVNode("i", { class: "fas fa-times text-lg" }, null, -1)
                ])])
              ])
            ]),
            createBaseVNode("div", _hoisted_84, [
              createBaseVNode("div", _hoisted_85, [
                _cache[78] || (_cache[78] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, [
                  createTextVNode("ROLE NAME "),
                  createBaseVNode("span", { class: "text-absa-passion" }, "*")
                ], -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => selectedRole.value.name = $event),
                  class: "w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-black text-gray-900 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                }, null, 512), [
                  [vModelText, selectedRole.value.name]
                ])
              ]),
              createBaseVNode("div", _hoisted_86, [
                _cache[79] || (_cache[79] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "DESCRIPTION", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => selectedRole.value.description = $event),
                  class: "w-full bg-gray-50/50 border border-gray-100 p-3 text-xs font-mono text-gray-700 focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                }, null, 512), [
                  [vModelText, selectedRole.value.description]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_87, [
              createBaseVNode("div", _hoisted_88, [
                createBaseVNode("div", _hoisted_89, [
                  createBaseVNode("div", _hoisted_90, [
                    _cache[80] || (_cache[80] = createBaseVNode("div", { class: "flex items-center gap-2 text-absa-passion" }, [
                      createBaseVNode("i", { class: "fas fa-th-large text-xs" }),
                      createBaseVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-gray-900" }, "MODULES")
                    ], -1)),
                    createBaseVNode("span", _hoisted_91, toDisplayString(actualModules.length) + " ENABLED", 1)
                  ]),
                  createBaseVNode("div", _hoisted_92, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(actualModules, (mod) => {
                      return createBaseVNode("button", {
                        key: mod.id,
                        onClick: ($event) => activeModalModule.value = mod.id,
                        class: normalizeClass(["w-full flex items-center justify-between p-3 transition-colors group text-left border", activeModalModule.value === mod.id ? "bg-red-50 border-absa-passion" : "bg-white border-gray-100 hover:border-absa-passion"])
                      }, [
                        createBaseVNode("div", _hoisted_94, [
                          createBaseVNode("i", {
                            class: normalizeClass([mod.icon, "text-xs w-4", activeModalModule.value === mod.id ? "text-absa-passion" : "text-gray-400 group-hover:text-absa-passion"])
                          }, null, 2),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-[10px] font-black uppercase tracking-wider", activeModalModule.value === mod.id ? "text-absa-passion" : "text-gray-700 group-hover:text-gray-900"])
                          }, toDisplayString(mod.name), 3)
                        ]),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-[9px] font-mono font-bold px-1.5 py-0.5", activeModalModule.value === mod.id ? "text-white bg-absa-passion" : "text-absa-passion bg-red-50"])
                        }, toDisplayString(mod.features.length) + "/" + toDisplayString(mod.features.length), 3)
                      ], 10, _hoisted_93);
                    }), 64))
                  ])
                ]),
                createBaseVNode("div", _hoisted_95, [
                  createBaseVNode("div", _hoisted_96, [
                    _cache[81] || (_cache[81] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                      createBaseVNode("i", { class: "fas fa-shield-alt text-gray-400 text-xs" }),
                      createBaseVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-gray-900" }, "MAIN PERMISSIONS")
                    ], -1)),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[12] || (_cache[12] = withModifiers(($event) => deselectAllMain(activeModalModule.value), ["stop", "prevent"])),
                      class: "text-[9px] font-mono font-bold text-gray-500 hover:text-absa-passion uppercase tracking-widest transition-colors cursor-pointer z-10"
                    }, "DESELECT ALL")
                  ]),
                  createBaseVNode("div", _hoisted_97, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(["READ", "WRITE", "EDIT", "DELETE", "ASSIGN", "APPROVE", "EXPORT"], (perm) => {
                      return createBaseVNode("div", {
                        key: perm,
                        onClick: withModifiers(($event) => toggleFeature(activeModalModule.value, perm.toLowerCase()), ["stop", "prevent"]),
                        class: "flex items-center gap-2 cursor-pointer group select-none"
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["w-4 h-4 rounded-sm flex items-center justify-center shadow-sm border transition-colors", hasFeature(activeModalModule.value, perm.toLowerCase()) ? "bg-absa-passion border-absa-passion text-white" : "bg-white border-gray-300 group-hover:border-absa-passion text-transparent"])
                        }, [..._cache[82] || (_cache[82] = [
                          createBaseVNode("i", { class: "fas fa-check text-[10px]" }, null, -1)
                        ])], 2),
                        createBaseVNode("span", _hoisted_99, toDisplayString(perm), 1)
                      ], 8, _hoisted_98);
                    }), 64))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_100, [
                createBaseVNode("div", _hoisted_101, [
                  _cache[83] || (_cache[83] = createBaseVNode("div", { class: "flex items-center gap-2 text-absa-passion" }, [
                    createBaseVNode("i", { class: "fas fa-puzzle-piece text-xs" }),
                    createBaseVNode("span", { class: "text-[10px] font-black uppercase tracking-widest text-gray-900" }, "FEATURE ACCESS")
                  ], -1)),
                  createBaseVNode("span", _hoisted_102, toDisplayString(activeModuleData.value.name), 1)
                ]),
                createBaseVNode("div", _hoisted_103, [
                  createBaseVNode("div", _hoisted_104, [
                    createBaseVNode("div", _hoisted_105, [
                      createBaseVNode("i", {
                        class: normalizeClass([activeModuleData.value.icon, "text-gray-400 text-sm"])
                      }, null, 2),
                      createBaseVNode("h3", _hoisted_106, toDisplayString(activeModuleData.value.name) + " FEATURE ACCESS", 1)
                    ]),
                    createBaseVNode("div", _hoisted_107, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(activeModuleData.value.features, (feat) => {
                        return openBlock(), createElementBlock("div", {
                          key: feat.id,
                          onClick: withModifiers(($event) => toggleFeature(activeModuleData.value.id, feat.id), ["stop", "prevent"]),
                          class: normalizeClass(["flex items-start gap-3 p-4 border transition-colors cursor-pointer group rounded-sm select-none", hasFeature(activeModuleData.value.id, feat.id) ? "border-absa-passion bg-red-50/10" : "border-gray-100 hover:border-absa-passion"])
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["w-4 h-4 mt-0.5 rounded-sm flex items-center justify-center text-white shadow-sm border shrink-0 transition-colors", hasFeature(activeModuleData.value.id, feat.id) ? "bg-absa-passion border-absa-passion" : "bg-white border-gray-300 group-hover:border-absa-passion"])
                          }, [
                            hasFeature(activeModuleData.value.id, feat.id) ? (openBlock(), createElementBlock("i", _hoisted_109)) : createCommentVNode("", true)
                          ], 2),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_110, [
                              createBaseVNode("i", {
                                class: normalizeClass([feat.icon, "text-absa-passion text-[10px]"])
                              }, null, 2),
                              createBaseVNode("span", _hoisted_111, toDisplayString(feat.name), 1)
                            ]),
                            createBaseVNode("p", _hoisted_112, toDisplayString(feat.desc), 1)
                          ])
                        ], 10, _hoisted_108);
                      }), 128))
                    ])
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_113, [
              createBaseVNode("button", {
                onClick: closeRoleDetails,
                class: "px-5 py-2.5 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
              }, "CANCEL"),
              createBaseVNode("button", {
                onClick: saveRoleDetails,
                disabled: savingRole.value,
                class: "px-5 py-2.5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md disabled:opacity-50"
              }, [
                savingRole.value ? (openBlock(), createElementBlock("span", _hoisted_115, "SAVING...")) : (openBlock(), createElementBlock("span", _hoisted_116, "UPDATE ROLE"))
              ], 8, _hoisted_114)
            ])
          ])
        ])) : createCommentVNode("", true),
        showCreateModal.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm",
          onClick: _cache[21] || (_cache[21] = withModifiers(($event) => showCreateModal.value = false, ["self"]))
        }, [
          createBaseVNode("div", _hoisted_117, [
            createBaseVNode("div", _hoisted_118, [
              _cache[85] || (_cache[85] = createBaseVNode("h2", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "Create User", -1)),
              createBaseVNode("button", {
                onClick: _cache[13] || (_cache[13] = ($event) => showCreateModal.value = false),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [..._cache[84] || (_cache[84] = [
                createBaseVNode("i", { class: "fas fa-times" }, null, -1)
              ])])
            ]),
            createBaseVNode("form", {
              onSubmit: withModifiers(handleCreateUser, ["prevent"]),
              class: "space-y-4"
            }, [
              createBaseVNode("div", null, [
                _cache[86] || (_cache[86] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Username", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => createForm.value.username = $event),
                  required: "",
                  class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                }, null, 512), [
                  [vModelText, createForm.value.username]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[87] || (_cache[87] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Email", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => createForm.value.email = $event),
                  type: "email",
                  required: "",
                  class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                }, null, 512), [
                  [vModelText, createForm.value.email]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[88] || (_cache[88] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Password", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => createForm.value.password = $event),
                  type: "password",
                  required: "",
                  autocomplete: "new-password",
                  class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                }, null, 512), [
                  [vModelText, createForm.value.password]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[89] || (_cache[89] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Display Name", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => createForm.value.display_name = $event),
                  class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                }, null, 512), [
                  [vModelText, createForm.value.display_name]
                ])
              ]),
              createBaseVNode("div", _hoisted_119, [
                createBaseVNode("div", null, [
                  _cache[90] || (_cache[90] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Role", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => createForm.value.role = $event),
                    class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                      return openBlock(), createElementBlock("option", {
                        key: r.id,
                        value: r.name
                      }, toDisplayString(r.name), 9, _hoisted_120);
                    }), 128))
                  ], 512), [
                    [vModelSelect, createForm.value.role]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[92] || (_cache[92] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1" }, "Branch", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => createForm.value.branch_code = $event),
                    class: "w-full h-9 px-3 border border-gray-200 text-xs focus:outline-none focus:border-absa-passion transition-colors"
                  }, [
                    _cache[91] || (_cache[91] = createBaseVNode("option", { value: "" }, "MASTER", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(branches.value, (b) => {
                      return openBlock(), createElementBlock("option", {
                        key: b.branch_code,
                        value: b.branch_code
                      }, toDisplayString(b.name.toUpperCase()), 9, _hoisted_121);
                    }), 128))
                  ], 512), [
                    [vModelSelect, createForm.value.branch_code]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_122, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[20] || (_cache[20] = ($event) => showCreateModal.value = false),
                  class: "px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase transition-colors hover:border-gray-300"
                }, "Cancel"),
                _cache[93] || (_cache[93] = createBaseVNode("button", {
                  type: "submit",
                  class: "px-4 py-2 bg-absa-passion text-white text-[10px] font-bold uppercase transition-colors hover:bg-[#b3002d]"
                }, "Create", -1))
              ])
            ], 32)
          ])
        ])) : createCommentVNode("", true),
        showEditModal.value ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm",
          onClick: _cache[38] || (_cache[38] = withModifiers(($event) => showEditModal.value = false, ["self"]))
        }, [
          createBaseVNode("div", _hoisted_123, [
            createBaseVNode("div", _hoisted_124, [
              createBaseVNode("div", _hoisted_125, [
                _cache[95] || (_cache[95] = createBaseVNode("div", { class: "w-12 h-12 bg-red-50 text-absa-passion rounded flex items-center justify-center text-xl" }, [
                  createBaseVNode("i", { class: "fas fa-id-badge" })
                ], -1)),
                createBaseVNode("div", null, [
                  _cache[94] || (_cache[94] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "SUB_ACCOUNT // PROFILE", -1)),
                  createBaseVNode("h2", _hoisted_126, toDisplayString(editForm.value.display_name || editForm.value.username), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: _cache[22] || (_cache[22] = ($event) => showEditModal.value = false),
                class: "text-gray-400 hover:text-absa-passion transition-colors mt-2"
              }, [..._cache[96] || (_cache[96] = [
                createBaseVNode("i", { class: "fas fa-times text-xl" }, null, -1)
              ])])
            ]),
            createBaseVNode("div", _hoisted_127, [
              createBaseVNode("button", {
                onClick: _cache[23] || (_cache[23] = ($event) => activeUserTab.value = "profile"),
                class: normalizeClass(["px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors", activeUserTab.value === "profile" ? "text-absa-passion border-b-2 border-absa-passion" : "text-gray-500 hover:text-gray-900"])
              }, "PROFILE", 2),
              createBaseVNode("button", {
                onClick: _cache[24] || (_cache[24] = ($event) => activeUserTab.value = "modules"),
                class: normalizeClass(["px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors", activeUserTab.value === "modules" ? "text-absa-passion border-b-2 border-absa-passion" : "text-gray-500 hover:text-gray-900"])
              }, "MODULES", 2)
            ]),
            withDirectives(createBaseVNode("div", _hoisted_128, [
              createBaseVNode("div", _hoisted_129, [
                createBaseVNode("div", _hoisted_130, [
                  createBaseVNode("div", null, [
                    _cache[97] || (_cache[97] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "DISPLAY NAME", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => editForm.value.display_name = $event),
                      autocomplete: "off",
                      "data-1p-ignore": "",
                      class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                    }, null, 512), [
                      [vModelText, editForm.value.display_name]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[98] || (_cache[98] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "SYSTEM CREDENTIALS", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => editForm.value.email = $event),
                      disabled: "",
                      autocomplete: "off",
                      "data-1p-ignore": "",
                      class: "w-full h-11 px-4 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-500 cursor-not-allowed"
                    }, null, 512), [
                      [vModelText, editForm.value.email]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_131, [
                    createBaseVNode("div", null, [
                      _cache[99] || (_cache[99] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "PHONE NUMBER (optional)", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => editForm.value.phone = $event),
                        placeholder: "+260_XXX_XXXXXX",
                        autocomplete: "off",
                        "data-1p-ignore": "",
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, null, 512), [
                        [vModelText, editForm.value.phone]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[100] || (_cache[100] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "SECONDARY EMAIL (optional)", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => editForm.value.secondary_email = $event),
                        autocomplete: "off",
                        "data-1p-ignore": "",
                        class: "w-full h-11 px-4 bg-gray-50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, null, 512), [
                        [vModelText, editForm.value.secondary_email]
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_132, [
                    createBaseVNode("div", null, [
                      _cache[102] || (_cache[102] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "DEPARTMENT / ORG UNIT", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => editForm.value.department = $event),
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, [..._cache[101] || (_cache[101] = [
                        createStaticVNode('<option value="SALES &amp; MARKETING">SALES &amp; MARKETING</option><option value="FINANCE &amp; ACCOUNTING">FINANCE &amp; ACCOUNTING</option><option value="OPERATIONS">OPERATIONS</option><option value="IT &amp; ENGINEERING">IT &amp; ENGINEERING</option><option value="HUMAN RESOURCES">HUMAN RESOURCES</option>', 5)
                      ])], 512), [
                        [vModelSelect, editForm.value.department]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[104] || (_cache[104] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "APPROVAL AUTHORITY LEVEL", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => editForm.value.approval_level = $event),
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, [..._cache[103] || (_cache[103] = [
                        createBaseVNode("option", { value: "LEVEL 0: AUTO-APPROVED" }, "LEVEL 0: AUTO-APPROVED / STANDARD", -1),
                        createBaseVNode("option", { value: "LEVEL 1: MANAGER" }, "LEVEL 1: MANAGER", -1),
                        createBaseVNode("option", { value: "LEVEL 2: DIRECTOR" }, "LEVEL 2: DIRECTOR", -1)
                      ])], 512), [
                        [vModelSelect, editForm.value.approval_level]
                      ])
                    ])
                  ]),
                  _cache[105] || (_cache[105] = createBaseVNode("p", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1" }, "USER'S DEPARTMENT AND AUTHORITY LEVEL FOR WORKFLOW ACTIONS AND APPROVALS", -1))
                ]),
                createBaseVNode("div", _hoisted_133, [
                  createBaseVNode("div", _hoisted_134, [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_135, [
                        _cache[107] || (_cache[107] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "ASSIGN ROLE", -1)),
                        createBaseVNode("button", {
                          onClick: withModifiers(fetchRoles, ["prevent"]),
                          class: "text-[8px] font-mono font-bold text-absa-passion uppercase tracking-widest hover:underline"
                        }, [..._cache[106] || (_cache[106] = [
                          createBaseVNode("i", { class: "fas fa-sync-alt mr-1" }, null, -1),
                          createTextVNode(" refresh", -1)
                        ])])
                      ]),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => editForm.value.role = $event),
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                          return openBlock(), createElementBlock("option", {
                            key: r.id,
                            value: r.name
                          }, toDisplayString(r.name), 9, _hoisted_136);
                        }), 128))
                      ], 512), [
                        [vModelSelect, editForm.value.role]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[109] || (_cache[109] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "ASSIGN BRANCH", -1)),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => editForm.value.branch_code = $event),
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-bold focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, [
                        _cache[108] || (_cache[108] = createBaseVNode("option", { value: "" }, "MASTER", -1)),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(branches.value, (b) => {
                          return openBlock(), createElementBlock("option", {
                            key: b.branch_code,
                            value: b.branch_code
                          }, toDisplayString(b.name.toUpperCase()), 9, _hoisted_137);
                        }), 128))
                      ], 512), [
                        [vModelSelect, editForm.value.branch_code]
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[111] || (_cache[111] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "SECURITY OVERRIDE (PASSWORD)", -1)),
                    createBaseVNode("div", _hoisted_138, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => editForm.value.password = $event),
                        type: showPwd.value ? "text" : "password",
                        placeholder: "••••••••",
                        autocomplete: "new-password",
                        "data-1p-ignore": "",
                        class: "w-full h-11 px-4 bg-red-50/30 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, null, 8, _hoisted_139), [
                        [vModelDynamic, editForm.value.password]
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[34] || (_cache[34] = withModifiers(($event) => showPwd.value = !showPwd.value, ["prevent"])),
                        class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      }, [..._cache[110] || (_cache[110] = [
                        createBaseVNode("i", { class: "fas fa-eye" }, null, -1)
                      ])])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[113] || (_cache[113] = createBaseVNode("label", { class: "block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2" }, "CONFIRM IDENTITY", -1)),
                    createBaseVNode("div", _hoisted_140, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[35] || (_cache[35] = ($event) => editForm.value.confirm_password = $event),
                        type: showPwd2.value ? "text" : "password",
                        placeholder: "••••••••",
                        autocomplete: "new-password",
                        "data-1p-ignore": "",
                        class: "w-full h-11 px-4 bg-gray-50/50 border border-gray-200 text-xs font-mono focus:bg-white focus:border-absa-passion focus:ring-0 outline-none transition-colors"
                      }, null, 8, _hoisted_141), [
                        [vModelDynamic, editForm.value.confirm_password]
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[36] || (_cache[36] = withModifiers(($event) => showPwd2.value = !showPwd2.value, ["prevent"])),
                        class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      }, [..._cache[112] || (_cache[112] = [
                        createBaseVNode("i", { class: "fas fa-eye" }, null, -1)
                      ])])
                    ])
                  ])
                ])
              ])
            ], 512), [
              [vShow, activeUserTab.value === "profile"]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_142, [
              createBaseVNode("div", _hoisted_143, [
                _cache[115] || (_cache[115] = createBaseVNode("div", { class: "text-absa-passion text-xl mt-1" }, [
                  createBaseVNode("i", { class: "fas fa-shield-alt" })
                ], -1)),
                createBaseVNode("div", null, [
                  _cache[114] || (_cache[114] = createBaseVNode("h3", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1" }, "MODULE ACCESS CONTROL", -1)),
                  createBaseVNode("p", _hoisted_144, "CLICK MODULES TO TOGGLE ACCESS FOR " + toDisplayString(editForm.value.display_name?.toUpperCase() || editForm.value.username?.toUpperCase()) + ". CHANGES ARE SAVED AUTOMATICALLY.", 1)
                ])
              ]),
              _cache[116] || (_cache[116] = createBaseVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createBaseVNode("h4", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "FEATURE_ACCESS_MATRIX"),
                createBaseVNode("select", { class: "h-8 px-3 border border-gray-200 text-[9px] font-mono font-bold bg-white focus:outline-none" }, [
                  createBaseVNode("option", null, "SHOW_ALL_MATRICES")
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_145, [
                (openBlock(), createElementBlock(Fragment, null, renderList(actualModules, (mod) => {
                  return createBaseVNode("button", {
                    key: mod.id,
                    onClick: withModifiers(($event) => toggleUserModule(mod.id), ["prevent"]),
                    class: normalizeClass(["h-14 px-4 border flex items-center justify-between text-left transition-colors bg-white", editForm.value.custom_modules?.includes(mod.id) ? "border-absa-passion bg-red-50/10 text-absa-passion" : "border-gray-200 text-gray-500 hover:border-gray-300"])
                  }, [
                    createBaseVNode("div", _hoisted_147, [
                      createBaseVNode("i", {
                        class: normalizeClass([mod.icon, "text-xs w-4"])
                      }, null, 2),
                      createBaseVNode("span", _hoisted_148, toDisplayString(mod.name), 1)
                    ]),
                    editForm.value.custom_modules?.includes(mod.id) ? (openBlock(), createElementBlock("i", _hoisted_149)) : (openBlock(), createElementBlock("i", _hoisted_150))
                  ], 10, _hoisted_146);
                }), 64))
              ])
            ], 512), [
              [vShow, activeUserTab.value === "modules"]
            ]),
            createBaseVNode("div", _hoisted_151, [
              createBaseVNode("button", {
                onClick: _cache[37] || (_cache[37] = withModifiers(($event) => showEditModal.value = false, ["prevent"])),
                class: "px-6 py-3 bg-white text-gray-700 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
              }, "CANCEL"),
              createBaseVNode("button", {
                onClick: withModifiers(handleEditUser, ["prevent"]),
                disabled: saving.value,
                class: "px-8 py-3 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md disabled:opacity-50"
              }, [
                saving.value ? (openBlock(), createElementBlock("span", _hoisted_153, "SAVING...")) : (openBlock(), createElementBlock("span", _hoisted_154, "SAVE CHANGES"))
              ], 8, _hoisted_152)
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};

export { _sfc_main as default };
