import { r as ref, f as onMounted, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, F as Fragment, e as renderList, t as toDisplayString, v as withModifiers, j as createCommentVNode, x as withDirectives, y as vModelText, l as useAuthStore, D as resolveComponent, u as useRouter, o as openBlock, A as createTextVNode } from './index-CJBj3n9Z.js';
import { b as authApi } from './auth_api-BWi4DAeF.js';

const _hoisted_1 = { class: "w-full pt-8 mt-4 px-8 pb-8" };
const _hoisted_2 = { class: "mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4" };
const _hoisted_3 = { class: "flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap" };
const _hoisted_4 = { class: "flex items-center gap-2 flex-wrap shrink-0" };
const _hoisted_5 = {
  key: 0,
  class: "grid grid-cols-12 gap-6 mb-6"
};
const _hoisted_6 = {
  key: 1,
  class: "mb-6 px-4 py-3 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-2"
};
const _hoisted_7 = { class: "text-sm text-amber-900" };
const _hoisted_8 = { class: "mt-1" };
const _hoisted_9 = {
  key: 2,
  class: "flex flex-col items-center justify-center min-h-[50vh] text-center"
};
const _hoisted_10 = {
  key: 3,
  class: "grid grid-cols-12 gap-6"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "flex items-center justify-between mb-3" };
const _hoisted_13 = { class: "text-sm font-bold uppercase tracking-wider text-absa-enrich" };
const _hoisted_14 = { class: "text-sm text-gray-500 mt-1 line-clamp-3 leading-relaxed" };
const _hoisted_15 = { class: "bg-white rounded-sm w-full max-w-md p-6 shadow-xl border border-gray-200" };
const _hoisted_16 = { class: "flex justify-between items-start mb-4" };
const _hoisted_17 = { class: "text-sm font-bold text-absa-enrich uppercase tracking-wider" };
const _hoisted_18 = { class: "text-xs text-gray-500 mb-5" };
const _hoisted_19 = { class: "mt-2 p-4 bg-gray-50 border border-gray-100 rounded-sm max-h-[40vh] overflow-y-auto" };
const _hoisted_20 = { class: "space-y-2" };
const _hoisted_21 = {
  key: 0,
  class: "text-xs text-gray-400 italic"
};
const _hoisted_22 = { class: "bg-white rounded-sm w-full max-w-md p-6 shadow-xl border border-gray-200" };
const _hoisted_23 = { class: "flex justify-between items-start mb-4" };
const _hoisted_24 = { class: "pt-4 flex justify-end gap-2" };
const _hoisted_25 = ["disabled"];
const _sfc_main = {
  __name: "SettingsModule",
  setup(__props) {
    const router = useRouter();
    const roles = ref([]);
    const showRoleModal = ref(false);
    const selectedRole = ref(null);
    const saving = ref(false);
    const roleForm = ref({ role_name: "", description: "" });
    const errorMsg = ref("");
    const loading = ref(true);
    const openRoleDetails = (role) => {
      selectedRole.value = role;
    };
    const closeRoleDetails = () => {
      selectedRole.value = null;
    };
    const getAccessiblePages = (roleName) => {
      const routes = router.getRoutes();
      const pages = /* @__PURE__ */ new Set();
      routes.forEach((route) => {
        if (route.meta && route.meta.requiresRoles && route.meta.requiresRoles.includes(roleName)) {
          if (route.meta.title) {
            pages.add(route.meta.title);
          } else if (route.name) {
            pages.add(route.name);
          }
        }
      });
      return Array.from(pages).sort();
    };
    const fetchRoles = async () => {
      errorMsg.value = "";
      loading.value = true;
      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem("token");
        const BASE_URL = "http://22.84.115.25:8080";
        const res = await fetch(`${BASE_URL}/auth/admin/roles`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }
        roles.value = await res.json();
      } catch (err) {
        console.error("Failed to fetch roles", err);
        errorMsg.value = err.message;
      } finally {
        loading.value = false;
      }
    };
    const handleCreateRole = async () => {
      if (!roleForm.value.role_name) return;
      saving.value = true;
      try {
        await authApi.createRole({
          role_name: roleForm.value.role_name,
          description: roleForm.value.description
        });
        showRoleModal.value = false;
        roleForm.value = { role_name: "", description: "" };
        await fetchRoles();
      } catch (err) {
        console.error("Failed to create role", err);
        alert(err.message || "Error creating role");
      } finally {
        saving.value = false;
      }
    };
    onMounted(() => {
      fetchRoles();
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(_component_router_link, {
                to: "/dashboard/portfolio",
                class: "hover:text-absa-passion"
              }, {
                default: withCtx(() => [..._cache[6] || (_cache[6] = [
                  createTextVNode("Home", -1)
                ])]),
                _: 1
              }),
              _cache[7] || (_cache[7] = createBaseVNode("span", null, "/", -1)),
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Roles & Permissions", -1))
            ]),
            _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-sm text-gray-500" }, "Manage system roles and access levels.", -1))
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => showRoleModal.value = true),
              class: "bg-absa-passion text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-absa-power transition-colors uppercase tracking-wider shadow-sm"
            }, " Create Role ")
          ])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
          (openBlock(), createElementBlock(Fragment, null, renderList(3, (i) => {
            return createBaseVNode("div", {
              key: i,
              class: "col-span-12 lg:col-span-4 h-32 bg-gray-100 rounded-sm animate-pulse"
            });
          }), 64))
        ])) : errorMsg.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          _cache[11] || (_cache[11] = createBaseVNode("span", { class: "material-symbols-outlined text-[20px] text-amber-700" }, "warning", -1)),
          createBaseVNode("div", _hoisted_7, [
            _cache[10] || (_cache[10] = createBaseVNode("p", { class: "font-bold" }, "Error loading roles", -1)),
            createBaseVNode("p", _hoisted_8, toDisplayString(errorMsg.value), 1)
          ])
        ])) : roles.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [..._cache[12] || (_cache[12] = [
          createBaseVNode("div", { class: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" }, [
            createBaseVNode("span", { class: "material-symbols-outlined text-gray-400 text-[32px]" }, "shield")
          ], -1),
          createBaseVNode("h2", { class: "text-base font-bold text-absa-enrich mb-2" }, "No Roles Found", -1),
          createBaseVNode("p", { class: "text-sm text-gray-500 max-w-md" }, "There are currently no roles configured in the system.", -1)
        ])])) : (openBlock(), createElementBlock("div", _hoisted_10, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (role) => {
            return openBlock(), createElementBlock("div", {
              key: role.role_id,
              class: "col-span-12 lg:col-span-4 bg-white border border-gray-300 rounded-sm p-6 cursor-pointer hover:shadow-md hover:border-absa-passion/50 transition-all duration-200 flex flex-col justify-between",
              onClick: ($event) => openRoleDetails(role)
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("h2", _hoisted_13, toDisplayString(role.role_name), 1),
                  _cache[13] || (_cache[13] = createBaseVNode("span", { class: "material-symbols-outlined text-gray-400 text-[20px]" }, "chevron_right", -1))
                ]),
                createBaseVNode("p", _hoisted_14, toDisplayString(role.description || "No description provided."), 1)
              ])
            ], 8, _hoisted_11);
          }), 128))
        ])),
        selectedRole.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm",
          onClick: withModifiers(closeRoleDetails, ["self"])
        }, [
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("div", _hoisted_16, [
              createBaseVNode("h2", _hoisted_17, toDisplayString(selectedRole.value.role_name), 1),
              createBaseVNode("button", {
                onClick: closeRoleDetails,
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [..._cache[14] || (_cache[14] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "close", -1)
              ])])
            ]),
            createBaseVNode("p", _hoisted_18, toDisplayString(selectedRole.value.description), 1),
            createBaseVNode("div", null, [
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-[10px] font-bold uppercase tracking-widest text-gray-400" }, "Accessible Pages", -1)),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("ul", _hoisted_20, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(getAccessiblePages(selectedRole.value.role_name), (page) => {
                    return openBlock(), createElementBlock("li", {
                      key: page,
                      class: "text-xs font-semibold text-absa-enrich flex items-start gap-2"
                    }, [
                      _cache[15] || (_cache[15] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion mt-0.5" }, "check_circle", -1)),
                      createTextVNode(" " + toDisplayString(page), 1)
                    ]);
                  }), 128)),
                  getAccessiblePages(selectedRole.value.role_name).length === 0 ? (openBlock(), createElementBlock("li", _hoisted_21, " No UI pages explicitly assigned. ")) : createCommentVNode("", true)
                ])
              ])
            ]),
            createBaseVNode("div", { class: "mt-6 flex justify-end" }, [
              createBaseVNode("button", {
                type: "button",
                class: "bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold rounded-sm hover:bg-gray-200 transition-colors tracking-wider uppercase",
                onClick: closeRoleDetails
              }, "Close")
            ])
          ])
        ])) : createCommentVNode("", true),
        showRoleModal.value ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm",
          onClick: _cache[5] || (_cache[5] = withModifiers(($event) => showRoleModal.value = false, ["self"]))
        }, [
          createBaseVNode("div", _hoisted_22, [
            createBaseVNode("div", _hoisted_23, [
              _cache[18] || (_cache[18] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich uppercase tracking-wider" }, "Create New Role", -1)),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => showRoleModal.value = false),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [..._cache[17] || (_cache[17] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "close", -1)
              ])])
            ]),
            createBaseVNode("form", {
              onSubmit: withModifiers(handleCreateRole, ["prevent"]),
              class: "space-y-4"
            }, [
              createBaseVNode("div", null, [
                _cache[19] || (_cache[19] = createBaseVNode("label", { class: "block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" }, "Role Name", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => roleForm.value.role_name = $event),
                  required: "",
                  placeholder: "e.g. AUDITOR",
                  class: "w-full text-sm border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-absa-passion focus:ring-1 focus:ring-absa-passion"
                }, null, 512), [
                  [vModelText, roleForm.value.role_name]
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[20] || (_cache[20] = createBaseVNode("label", { class: "block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" }, "Description", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => roleForm.value.description = $event),
                  placeholder: "Brief description...",
                  class: "w-full text-sm border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-absa-passion focus:ring-1 focus:ring-absa-passion"
                }, null, 512), [
                  [vModelText, roleForm.value.description]
                ])
              ]),
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("button", {
                  type: "button",
                  class: "bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold rounded-sm hover:bg-gray-200 transition-colors tracking-wider uppercase",
                  onClick: _cache[4] || (_cache[4] = ($event) => showRoleModal.value = false)
                }, "Cancel"),
                createBaseVNode("button", {
                  type: "submit",
                  class: "bg-absa-passion text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-absa-power transition-colors tracking-wider uppercase",
                  disabled: saving.value
                }, toDisplayString(saving.value ? "Saving..." : "Create Role"), 9, _hoisted_25)
              ])
            ], 32)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};

export { _sfc_main as default };
