import { _ as _export_sfc, r as ref, i as computed, f as onMounted, c as createElementBlock, b as createBaseVNode, x as withDirectives, y as vModelText, F as Fragment, e as renderList, j as createCommentVNode, v as withModifiers, L as vModelSelect, o as openBlock, t as toDisplayString, h as normalizeClass } from './index-D7z0QEXH.js';
import { b as authApi } from './auth_api-nZjIIObq.js';

const _hoisted_1 = { class: "absa-um" };
const _hoisted_2 = { class: "absa-um__content" };
const _hoisted_3 = { class: "absa-um__header" };
const _hoisted_4 = { class: "absa-um__toolbar" };
const _hoisted_5 = { class: "absa-um__search" };
const _hoisted_6 = { class: "absa-um__table-wrap" };
const _hoisted_7 = { class: "absa-um__table" };
const _hoisted_8 = { class: "absa-um__user-cell" };
const _hoisted_9 = { class: "absa-um__user-name" };
const _hoisted_10 = { class: "absa-um__user-email" };
const _hoisted_11 = { class: "absa-um__role-text" };
const _hoisted_12 = { class: "absa-um__login-time" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { class: "modal-content" };
const _hoisted_18 = { class: "field" };
const _hoisted_19 = { class: "field" };
const _hoisted_20 = { class: "field" };
const _hoisted_21 = { class: "field" };
const _hoisted_22 = { class: "field" };
const _hoisted_23 = ["value"];
const _hoisted_24 = { class: "modal-actions" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = { class: "modal-content" };
const _hoisted_27 = { class: "field" };
const _hoisted_28 = ["value"];
const _hoisted_29 = { class: "modal-actions" };
const _hoisted_30 = ["disabled"];


const _sfc_main = {
  __name: 'UserManagement',
  setup(__props) {

const users = ref([]);
const roles = ref([]);
const search = ref('');

const showCreateModal = ref(false);
const showEditModal = ref(false);
const saving = ref(false);

const createForm = ref({ username: '', email: '', display_name: '', password: '', role: '' });
const editForm = ref({ user_id: null, role: '' });

const fetchUsers = async () => {
  try {
    users.value = await authApi.listUsers();
  } catch (err) {
    console.error('Failed to fetch users', err);
  }
};

const fetchRoles = async () => {
  try {
    roles.value = await authApi.listRoles();
  } catch (err) {
    console.error('Failed to fetch roles', err);
  }
};

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const q = search.value.toLowerCase();
  return users.value.filter(u => 
    (u.display_name && u.display_name.toLowerCase().includes(q)) || 
    (u.email && u.email.toLowerCase().includes(q)) ||
    (u.username && u.username.toLowerCase().includes(q))
  )
});

const handleCreateUser = async () => {
  saving.value = true;
  try {
    await authApi.createUser({
      username: createForm.value.username,
      email: createForm.value.email,
      display_name: createForm.value.display_name,
      password: createForm.value.password,
      roles: [createForm.value.role]
    });
    showCreateModal.value = false;
    createForm.value = { username: '', email: '', display_name: '', password: '', role: '' };
    await fetchUsers();
  } catch (err) {
    alert(err.message || 'Failed to create user');
  } finally {
    saving.value = false;
  }
};

const openEditUser = (u) => {
  editForm.value = { user_id: u.user_id, role: (u.roles || [])[0] || '' };
  showEditModal.value = true;
};

const handleEditUser = async () => {
  saving.value = true;
  try {
    await authApi.updateUser(editForm.value.user_id, {
      roles: [editForm.value.role]
    });
    showEditModal.value = false;
    await fetchUsers();
  } catch (err) {
    alert(err.message || 'Failed to update user');
  } finally {
    saving.value = false;
  }
};

const toggleUserStatus = async (u) => {
  try {
    await authApi.updateUser(u.user_id, { is_active: !u.is_active });
    await fetchUsers();
  } catch (err) {
    alert(err.message || 'Failed to update status');
  }
};

const deleteUser = async (u) => {
  if (!confirm(`Are you sure you want to permanently delete user: ${u.display_name || u.username}?`)) return
  try {
    await authApi.deleteUser(u.user_id);
    await fetchUsers();
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err);
    const serverDetail = err.response?.data?.detail;
    alert(serverDetail ? `Error: ${serverDetail}` : (err.message || 'Failed to delete user'));
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Never'
  return new Date(dateStr).toLocaleString()
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        _cache[12] || (_cache[12] = createBaseVNode("div", null, [
          createBaseVNode("h1", { class: "absa-um__title" }, "User Management"),
          createBaseVNode("p", { class: "absa-um__subtitle" }, "Manage platform users and access.")
        ], -1)),
        createBaseVNode("button", {
          class: "btn btn-primary",
          onClick: _cache[0] || (_cache[0] = $event => (showCreateModal.value = true))
        }, " Create User ")
      ]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((search).value = $event)),
            type: "text",
            placeholder: "Search users...",
            class: "absa-um__search-input"
          }, null, 512), [
            [vModelText, search.value]
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_6, [
        createBaseVNode("table", _hoisted_7, [
          _cache[14] || (_cache[14] = createBaseVNode("thead", null, [
            createBaseVNode("tr", null, [
              createBaseVNode("th", null, "USER NAME"),
              createBaseVNode("th", null, "ROLES"),
              createBaseVNode("th", null, "STATUS"),
              createBaseVNode("th", null, "LAST LOGIN"),
              createBaseVNode("th", null, "ACTIONS")
            ])
          ], -1)),
          createBaseVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredUsers.value, (u) => {
              return (openBlock(), createElementBlock("tr", {
                key: u.user_id
              }, [
                createBaseVNode("td", null, [
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_9, toDisplayString(u.display_name || u.username), 1),
                      createBaseVNode("div", _hoisted_10, toDisplayString(u.email), 1)
                    ])
                  ])
                ]),
                createBaseVNode("td", null, [
                  createBaseVNode("span", _hoisted_11, toDisplayString((u.roles || []).join(', ')), 1)
                ]),
                createBaseVNode("td", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(['absa-um__status', u.is_active ? 'absa-um__status--active' : 'absa-um__status--inactive'])
                  }, toDisplayString(u.is_active ? 'ACTIVE' : 'INACTIVE'), 3)
                ]),
                createBaseVNode("td", _hoisted_12, toDisplayString(formatDate(u.last_login_at)), 1),
                createBaseVNode("td", null, [
                  createBaseVNode("button", {
                    class: "btn btn-secondary btn-sm",
                    onClick: $event => (openEditUser(u))
                  }, "Edit", 8, _hoisted_13),
                  createBaseVNode("button", {
                    class: "btn btn-secondary btn-sm",
                    onClick: $event => (toggleUserStatus(u))
                  }, toDisplayString(u.is_active ? 'Deactivate' : 'Activate'), 9, _hoisted_14),
                  createBaseVNode("button", {
                    class: "btn btn-primary btn-sm",
                    style: {"background-color":"#dc2626"},
                    onClick: $event => (deleteUser(u))
                  }, " Delete ", 8, _hoisted_15)
                ])
              ]))
            }), 128)),
            (filteredUsers.value.length === 0)
              ? (openBlock(), createElementBlock("tr", _hoisted_16, [...(_cache[13] || (_cache[13] = [
                  createBaseVNode("td", {
                    colspan: "5",
                    class: "text-center py-4"
                  }, "No users found.", -1)
                ]))]))
              : createCommentVNode("", true)
          ])
        ])
      ]),
      (showCreateModal.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "modal-overlay",
            onClick: _cache[8] || (_cache[8] = withModifiers($event => (showCreateModal.value = false), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_17, [
              _cache[21] || (_cache[21] = createBaseVNode("h2", null, "Create User", -1)),
              createBaseVNode("form", {
                onSubmit: withModifiers(handleCreateUser, ["prevent"])
              }, [
                createBaseVNode("label", _hoisted_18, [
                  _cache[15] || (_cache[15] = createBaseVNode("span", null, "Username", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((createForm.value.username) = $event)),
                    required: ""
                  }, null, 512), [
                    [vModelText, createForm.value.username]
                  ])
                ]),
                createBaseVNode("label", _hoisted_19, [
                  _cache[16] || (_cache[16] = createBaseVNode("span", null, "Email", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((createForm.value.email) = $event)),
                    type: "email",
                    required: ""
                  }, null, 512), [
                    [vModelText, createForm.value.email]
                  ])
                ]),
                createBaseVNode("label", _hoisted_20, [
                  _cache[17] || (_cache[17] = createBaseVNode("span", null, "Display Name", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((createForm.value.display_name) = $event)),
                    required: ""
                  }, null, 512), [
                    [vModelText, createForm.value.display_name]
                  ])
                ]),
                createBaseVNode("label", _hoisted_21, [
                  _cache[18] || (_cache[18] = createBaseVNode("span", null, "Password", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((createForm.value.password) = $event)),
                    type: "password",
                    required: ""
                  }, null, 512), [
                    [vModelText, createForm.value.password]
                  ])
                ]),
                createBaseVNode("label", _hoisted_22, [
                  _cache[20] || (_cache[20] = createBaseVNode("span", null, "Role", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((createForm.value.role) = $event)),
                    required: ""
                  }, [
                    _cache[19] || (_cache[19] = createBaseVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Select Role", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                      return (openBlock(), createElementBlock("option", {
                        key: r.role_id,
                        value: r.role_name
                      }, toDisplayString(r.role_name), 9, _hoisted_23))
                    }), 128))
                  ], 512), [
                    [vModelSelect, createForm.value.role]
                  ])
                ]),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[7] || (_cache[7] = $event => (showCreateModal.value = false)),
                    class: "btn btn-secondary"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    type: "submit",
                    class: "btn btn-primary",
                    disabled: saving.value
                  }, "Create", 8, _hoisted_25)
                ])
              ], 32)
            ])
          ]))
        : createCommentVNode("", true),
      (showEditModal.value)
        ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "modal-overlay",
            onClick: _cache[11] || (_cache[11] = withModifiers($event => (showEditModal.value = false), ["self"]))
          }, [
            createBaseVNode("div", _hoisted_26, [
              _cache[24] || (_cache[24] = createBaseVNode("h2", null, "Edit User", -1)),
              createBaseVNode("form", {
                onSubmit: withModifiers(handleEditUser, ["prevent"])
              }, [
                createBaseVNode("label", _hoisted_27, [
                  _cache[23] || (_cache[23] = createBaseVNode("span", null, "Role", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((editForm.value.role) = $event)),
                    required: ""
                  }, [
                    _cache[22] || (_cache[22] = createBaseVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Select Role", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(roles.value, (r) => {
                      return (openBlock(), createElementBlock("option", {
                        key: r.role_id,
                        value: r.role_name
                      }, toDisplayString(r.role_name), 9, _hoisted_28))
                    }), 128))
                  ], 512), [
                    [vModelSelect, editForm.value.role]
                  ])
                ]),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[10] || (_cache[10] = $event => (showEditModal.value = false)),
                    class: "btn btn-secondary"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    type: "submit",
                    class: "btn btn-primary",
                    disabled: saving.value
                  }, "Save", 8, _hoisted_30)
                ])
              ], 32)
            ])
          ]))
        : createCommentVNode("", true)
    ])
  ]))
}
}

};
const UserManagement = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-59ae1c66"]]);

export { UserManagement as default };
