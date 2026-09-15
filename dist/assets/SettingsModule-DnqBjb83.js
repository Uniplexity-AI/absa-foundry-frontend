import { g as _export_sfc, r as ref, a0 as reactive, D as computed, o as openBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, m as createTextVNode, t as toDisplayString, F as Fragment, e as renderList, v as withDirectives, x as vModelText, S as vModelSelect, a as createStaticVNode, s as withModifiers, a1 as vModelDynamic, j as normalizeClass, l as createCommentVNode, G as decodeJWT, A as resolveComponent, a2 as vModelCheckbox } from './index-BiHzBeGU.js';

const _hoisted_1 = { class: "absa-profile-settings" };
const _hoisted_2 = { class: "settings-shell" };
const _hoisted_3 = {
  class: "settings-breadcrumb",
  "aria-label": "Breadcrumb"
};
const _hoisted_4 = { class: "settings-layout" };
const _hoisted_5 = {
  class: "settings-tabs",
  "aria-label": "Settings sections"
};
const _hoisted_6 = ["aria-controls", "onClick"];
const _hoisted_7 = {
  class: "settings-tab__icon",
  "aria-hidden": "true"
};
const _hoisted_8 = { class: "settings-content" };
const _hoisted_9 = {
  id: "personal-information",
  class: "settings-card"
};
const _hoisted_10 = { class: "settings-card__header" };
const _hoisted_11 = { class: "profile-grid" };
const _hoisted_12 = { class: "avatar-panel" };
const _hoisted_13 = { class: "avatar-ring" };
const _hoisted_14 = { class: "avatar" };
const _hoisted_15 = { class: "form-grid" };
const _hoisted_16 = { class: "field" };
const _hoisted_17 = ["readonly"];
const _hoisted_18 = { class: "field" };
const _hoisted_19 = ["readonly"];
const _hoisted_20 = { class: "field" };
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { class: "field" };
const _hoisted_23 = ["disabled"];
const _hoisted_24 = { class: "field" };
const _hoisted_25 = ["readonly"];
const _hoisted_26 = { class: "field" };
const _hoisted_27 = ["disabled"];
const _hoisted_28 = {
  id: "security-authentication",
  class: "settings-card"
};
const _hoisted_29 = { class: "security-grid" };
const _hoisted_30 = { class: "field" };
const _hoisted_31 = { class: "password-input" };
const _hoisted_32 = ["type"];
const _hoisted_33 = ["aria-label"];
const _hoisted_34 = {
  key: 0,
  class: "inline-feedback"
};
const _hoisted_35 = { class: "device-section" };
const _hoisted_36 = {
  class: "device-table",
  role: "table",
  "aria-label": "Authorized devices"
};
const _hoisted_37 = {
  id: "roles-permissions",
  class: "settings-card"
};
const _hoisted_38 = { class: "settings-card__header" };
const _hoisted_39 = { class: "roles-grid" };
const _hoisted_40 = { class: "role-card__top" };
const _hoisted_41 = { class: "role-count" };
const _hoisted_42 = ["aria-label"];
const _hoisted_43 = { class: "field" };
const _hoisted_44 = { class: "field" };
const _hoisted_45 = {
  id: "notification-preferences",
  class: "settings-card"
};
const _hoisted_46 = { class: "notification-list" };
const _hoisted_47 = ["aria-label"];
const _hoisted_48 = { class: "switch-field" };
const _hoisted_49 = ["onUpdate:modelValue"];
const _hoisted_50 = { class: "switch-field" };
const _hoisted_51 = ["onUpdate:modelValue"];
const _hoisted_52 = {
  id: "integrations",
  class: "settings-card"
};
const _hoisted_53 = { class: "integrations-list" };
const _hoisted_54 = { class: "integration-row__icon" };
const _hoisted_55 = { class: "integration-row__status" };
const _hoisted_56 = {
  type: "button",
  class: "btn btn--secondary"
};
const _hoisted_57 = { class: "save-panel" };
const _hoisted_58 = { key: 0 };


const _sfc_main = {
  __name: 'SettingsModule',
  setup(__props) {

const activeTab = ref('personal');
const isEditing = ref(false);
const newPassword = ref('');
const showPassword = ref(false);
const passwordQueued = ref(false);
const savedAt = ref('');

function getJwtValue(methodName, fallback) {
  try {
    return decodeJWT()?.[methodName]?.() || fallback
  } catch {
    return fallback
  }
}

const defaultEmail = getJwtValue('getUserEmail', 'sbwalya@uniplexity.ai');
const defaultRole = getJwtValue('getUserRole', 'Senior KYC Analyst');
const derivedName = defaultEmail.includes('@')
  ? defaultEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  : 'Sarah Bwalya';

const profile = reactive({
  fullName: derivedName || 'Sarah Bwalya',
  email: defaultEmail,
  department: 'High-Risk Compliance',
  role: defaultRole === 'User' ? 'Senior KYC Analyst' : defaultRole,
  employeeId: 'UX-7742-KYC',
  timezone: 'Lusaka, Zambia (GMT+2)',
});

const userInitials = computed(() => {
  return profile.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || 'SB'
});

const tabs = [
  { id: 'personal', label: 'Personal Information', icon: 'fas fa-user', sectionId: 'personal-information' },
  { id: 'security', label: 'Security & Authentication', icon: 'fas fa-lock', sectionId: 'security-authentication' },
  { id: 'roles', label: 'Roles', icon: 'fas fa-id-badge', sectionId: 'roles-permissions' },
  { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell', sectionId: 'notification-preferences' },
  { id: 'integrations', label: 'Integrations', icon: 'fas fa-plug', sectionId: 'integrations' },
];

const activeTabLabel = computed(() => tabs.find(tab => tab.id === activeTab.value)?.label || 'Personal Information');

const devices = [
  { name: 'Chrome on Windows', location: 'Lusaka, Zambia (Current)', lastActive: 'Now', icon: 'fas fa-desktop' },
  { name: 'iPhone 15 Pro', location: 'Lusaka, Zambia', lastActive: '2h ago', icon: 'fas fa-mobile-screen' },
];

const roleDraftOpen = ref(false);
const roleDraft = reactive({
  name: '',
  level: 'Reviewer',
});

const roles = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full settings ownership, user management, and system configuration.',
    users: 2,
    permissions: ['All modules', 'Users', 'Billing', 'Audit logs'],
  },
  {
    id: 'kyc-analyst',
    name: 'KYC Analyst',
    description: 'Can review customers, update cases, and receive risk notifications.',
    users: 14,
    permissions: ['Cases', 'Documents', 'Risk signals'],
  },
  {
    id: 'approver',
    name: 'Compliance Approver',
    description: 'Can approve escalations, review exceptions, and revoke sessions.',
    users: 5,
    permissions: ['Approvals', 'Security', 'Reports'],
  },
];

const notificationPreferences = reactive([
  {
    id: 'case-alerts',
    title: 'Case alerts',
    description: 'New assignments, status changes, and SLA risk updates.',
    email: true,
    mobile: true,
  },
  {
    id: 'approval-requests',
    title: 'Approval requests',
    description: 'Reviews that require your decision or escalation.',
    email: true,
    mobile: true,
  },
  {
    id: 'risk-thresholds',
    title: 'Risk threshold changes',
    description: 'Material changes in KYC risk score, flags, or sanctions match confidence.',
    email: false,
    mobile: true,
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Scheduled compliance, portfolio, and operational summary reports.',
    email: false,
    mobile: true,
  },
]);

const integrations = [
  {
    id: 'core-banking',
    name: 'Core Banking',
    description: 'Sync customer profile, account, and branch context into KYC workflows.',
    connected: true,
    icon: 'fas fa-building-columns',
  },
  {
    id: 'email',
    name: 'Email Gateway',
    description: 'Send approval notices, case assignments, and scheduled reports.',
    connected: true,
    icon: 'fas fa-envelope',
  },
  {
    id: 'document-store',
    name: 'Document Store',
    description: 'Archive KYC files, verification documents, and audit attachments.',
    connected: false,
    icon: 'fas fa-folder-open',
  },
  {
    id: 'webhooks',
    name: 'Webhook Events',
    description: 'Publish case, risk, and approval events to downstream systems.',
    connected: false,
    icon: 'fas fa-code-branch',
  },
];

function goToSection(tab) {
  activeTab.value = tab.id;
  requestAnimationFrame(() => {
    const target = document.getElementById(tab.sectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function saveSettings() {
  savedAt.value = new Intl.DateTimeFormat('en-ZM', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
  isEditing.value = false;
}

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("section", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("nav", _hoisted_3, [
        createVNode(_component_router_link, { to: "/dashboard/portfolio" }, {
          default: withCtx(() => [...(_cache[14] || (_cache[14] = [
            createTextVNode("Home", -1)
          ]))]),
          _: 1
        }),
        _cache[15] || (_cache[15] = createBaseVNode("span", { "aria-hidden": "true" }, "/", -1)),
        _cache[16] || (_cache[16] = createBaseVNode("span", null, "Settings", -1)),
        _cache[17] || (_cache[17] = createBaseVNode("span", { "aria-hidden": "true" }, "/", -1)),
        createBaseVNode("strong", null, toDisplayString(activeTabLabel.value), 1)
      ]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("aside", _hoisted_5, [
          (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
            return createBaseVNode("button", {
              key: tab.id,
              type: "button",
              class: normalizeClass(["settings-tab", { 'settings-tab--active': activeTab.value === tab.id }]),
              "aria-controls": tab.sectionId,
              onClick: $event => (goToSection(tab))
            }, [
              createBaseVNode("span", _hoisted_7, [
                createBaseVNode("i", {
                  class: normalizeClass(tab.icon)
                }, null, 2)
              ]),
              createBaseVNode("span", null, toDisplayString(tab.label), 1)
            ], 10, _hoisted_6)
          }), 64))
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("section", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              _cache[18] || (_cache[18] = createBaseVNode("div", null, [
                createBaseVNode("p", { class: "eyebrow" }, "Profile"),
                createBaseVNode("h1", null, "Personal Information")
              ], -1)),
              createBaseVNode("button", {
                type: "button",
                class: "btn btn--secondary",
                onClick: _cache[0] || (_cache[0] = $event => (isEditing.value = !isEditing.value))
              }, toDisplayString(isEditing.value ? 'Cancel editing' : 'Edit profile'), 1)
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, toDisplayString(userInitials.value), 1)
                ]),
                _cache[19] || (_cache[19] = createBaseVNode("button", {
                  type: "button",
                  class: "avatar-action"
                }, "Change photo", -1))
              ]),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("label", _hoisted_16, [
                  _cache[20] || (_cache[20] = createBaseVNode("span", null, "Full Name", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((profile.fullName) = $event)),
                    readonly: !isEditing.value,
                    type: "text"
                  }, null, 8, _hoisted_17), [
                    [vModelText, profile.fullName]
                  ])
                ]),
                createBaseVNode("label", _hoisted_18, [
                  _cache[21] || (_cache[21] = createBaseVNode("span", null, "Email Address", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((profile.email) = $event)),
                    readonly: !isEditing.value,
                    type: "email"
                  }, null, 8, _hoisted_19), [
                    [vModelText, profile.email]
                  ])
                ]),
                createBaseVNode("label", _hoisted_20, [
                  _cache[23] || (_cache[23] = createBaseVNode("span", null, "Department", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((profile.department) = $event)),
                    disabled: !isEditing.value
                  }, [...(_cache[22] || (_cache[22] = [
                    createBaseVNode("option", null, "High-Risk Compliance", -1),
                    createBaseVNode("option", null, "Relationship Banking", -1),
                    createBaseVNode("option", null, "Credit Risk", -1),
                    createBaseVNode("option", null, "Operations", -1)
                  ]))], 8, _hoisted_21), [
                    [vModelSelect, profile.department]
                  ])
                ]),
                createBaseVNode("label", _hoisted_22, [
                  _cache[25] || (_cache[25] = createBaseVNode("span", null, "Role", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((profile.role) = $event)),
                    disabled: !isEditing.value
                  }, [...(_cache[24] || (_cache[24] = [
                    createBaseVNode("option", null, "Senior KYC Analyst", -1),
                    createBaseVNode("option", null, "Relationship Manager", -1),
                    createBaseVNode("option", null, "Branch Manager", -1),
                    createBaseVNode("option", null, "Administrator", -1)
                  ]))], 8, _hoisted_23), [
                    [vModelSelect, profile.role]
                  ])
                ]),
                createBaseVNode("label", _hoisted_24, [
                  _cache[26] || (_cache[26] = createBaseVNode("span", null, "Employee ID", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((profile.employeeId) = $event)),
                    readonly: !isEditing.value,
                    type: "text"
                  }, null, 8, _hoisted_25), [
                    [vModelText, profile.employeeId]
                  ])
                ]),
                createBaseVNode("label", _hoisted_26, [
                  _cache[28] || (_cache[28] = createBaseVNode("span", null, "Locale / Timezone", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((profile.timezone) = $event)),
                    disabled: !isEditing.value
                  }, [...(_cache[27] || (_cache[27] = [
                    createBaseVNode("option", null, "Lusaka, Zambia (GMT+2)", -1),
                    createBaseVNode("option", null, "Johannesburg, South Africa (GMT+2)", -1),
                    createBaseVNode("option", null, "London, United Kingdom (GMT+0)", -1)
                  ]))], 8, _hoisted_27), [
                    [vModelSelect, profile.timezone]
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_28, [
            _cache[35] || (_cache[35] = createBaseVNode("div", { class: "settings-card__header" }, [
              createBaseVNode("div", null, [
                createBaseVNode("p", { class: "eyebrow" }, "Access control"),
                createBaseVNode("h2", null, "Security & Authentication")
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_29, [
              _cache[31] || (_cache[31] = createStaticVNode("<article class=\"mfa-card\" data-v-c6382e93><div class=\"mfa-card__top\" data-v-c6382e93><div class=\"mfa-card__icon\" data-v-c6382e93><i class=\"fas fa-shield-halved\" data-v-c6382e93></i></div><div data-v-c6382e93><h3 data-v-c6382e93>Multi-factor authentication</h3><span data-v-c6382e93>Enforced</span></div></div><p data-v-c6382e93>MFA is enforced across your organization. Last updated on Oct 12, 2023.</p><button type=\"button\" data-v-c6382e93>Manage MFA policy</button></article>", 1)),
              createBaseVNode("form", {
                class: "password-panel",
                onSubmit: _cache[9] || (_cache[9] = withModifiers($event => (passwordQueued.value = true), ["prevent"]))
              }, [
                createBaseVNode("label", _hoisted_30, [
                  _cache[29] || (_cache[29] = createBaseVNode("span", null, "Update Password", -1)),
                  createBaseVNode("div", _hoisted_31, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((newPassword).value = $event)),
                      type: showPassword.value ? 'text' : 'password',
                      autocomplete: "new-password",
                      placeholder: "Enter new password"
                    }, null, 8, _hoisted_32), [
                      [vModelDynamic, newPassword.value]
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[8] || (_cache[8] = $event => (showPassword.value = !showPassword.value)),
                      "aria-label": showPassword.value ? 'Hide password' : 'Show password'
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(showPassword.value ? 'fas fa-eye-slash' : 'fas fa-eye')
                      }, null, 2)
                    ], 8, _hoisted_33)
                  ])
                ]),
                _cache[30] || (_cache[30] = createBaseVNode("button", {
                  type: "submit",
                  class: "btn btn--primary"
                }, "Update Password", -1)),
                (passwordQueued.value)
                  ? (openBlock(), createElementBlock("p", _hoisted_34, "Password update queued for secure confirmation."))
                  : createCommentVNode("", true)
              ], 32)
            ]),
            createBaseVNode("div", _hoisted_35, [
              _cache[34] || (_cache[34] = createBaseVNode("h3", null, "Authorized Devices", -1)),
              createBaseVNode("div", _hoisted_36, [
                _cache[33] || (_cache[33] = createBaseVNode("div", {
                  class: "device-row device-row--head",
                  role: "row"
                }, [
                  createBaseVNode("span", null, "Device"),
                  createBaseVNode("span", null, "Location"),
                  createBaseVNode("span", null, "Last active"),
                  createBaseVNode("span", null, "Action")
                ], -1)),
                (openBlock(), createElementBlock(Fragment, null, renderList(devices, (device) => {
                  return createBaseVNode("div", {
                    key: device.name,
                    class: "device-row",
                    role: "row"
                  }, [
                    createBaseVNode("span", null, [
                      createBaseVNode("i", {
                        class: normalizeClass(device.icon)
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(device.name), 1)
                    ]),
                    createBaseVNode("span", null, toDisplayString(device.location), 1),
                    createBaseVNode("span", null, toDisplayString(device.lastActive), 1),
                    _cache[32] || (_cache[32] = createBaseVNode("button", { type: "button" }, "Revoke", -1))
                  ])
                }), 64))
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_37, [
            createBaseVNode("div", _hoisted_38, [
              _cache[36] || (_cache[36] = createBaseVNode("div", null, [
                createBaseVNode("p", { class: "eyebrow" }, "Permissions"),
                createBaseVNode("h2", null, "Roles & Access")
              ], -1)),
              createBaseVNode("button", {
                type: "button",
                class: "btn btn--secondary",
                onClick: _cache[10] || (_cache[10] = $event => (roleDraftOpen.value = !roleDraftOpen.value))
              }, toDisplayString(roleDraftOpen.value ? 'Close editor' : 'Create role'), 1)
            ]),
            createBaseVNode("div", _hoisted_39, [
              (openBlock(), createElementBlock(Fragment, null, renderList(roles, (role) => {
                return createBaseVNode("article", {
                  key: role.id,
                  class: "role-card"
                }, [
                  createBaseVNode("div", _hoisted_40, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h3", null, toDisplayString(role.name), 1),
                      createBaseVNode("p", null, toDisplayString(role.description), 1)
                    ]),
                    createBaseVNode("span", _hoisted_41, toDisplayString(role.users) + " users", 1)
                  ]),
                  createBaseVNode("div", {
                    class: "permission-chips",
                    "aria-label": `${role.name} permissions`
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(role.permissions, (permission) => {
                      return (openBlock(), createElementBlock("span", { key: permission }, toDisplayString(permission), 1))
                    }), 128))
                  ], 8, _hoisted_42),
                  _cache[37] || (_cache[37] = createBaseVNode("div", { class: "role-card__actions" }, [
                    createBaseVNode("button", { type: "button" }, "Edit role"),
                    createBaseVNode("button", { type: "button" }, "Audit access")
                  ], -1))
                ])
              }), 64))
            ]),
            (roleDraftOpen.value)
              ? (openBlock(), createElementBlock("form", {
                  key: 0,
                  class: "role-editor",
                  onSubmit: _cache[13] || (_cache[13] = withModifiers($event => (roleDraftOpen.value = false), ["prevent"]))
                }, [
                  createBaseVNode("label", _hoisted_43, [
                    _cache[38] || (_cache[38] = createBaseVNode("span", null, "Role name", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((roleDraft.name) = $event)),
                      type: "text",
                      placeholder: "e.g. Compliance Reviewer"
                    }, null, 512), [
                      [vModelText, roleDraft.name]
                    ])
                  ]),
                  createBaseVNode("label", _hoisted_44, [
                    _cache[40] || (_cache[40] = createBaseVNode("span", null, "Access level", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((roleDraft.level) = $event))
                    }, [...(_cache[39] || (_cache[39] = [
                      createBaseVNode("option", null, "Read only", -1),
                      createBaseVNode("option", null, "Reviewer", -1),
                      createBaseVNode("option", null, "Approver", -1),
                      createBaseVNode("option", null, "Administrator", -1)
                    ]))], 512), [
                      [vModelSelect, roleDraft.level]
                    ])
                  ]),
                  _cache[41] || (_cache[41] = createBaseVNode("button", {
                    type: "submit",
                    class: "btn btn--primary"
                  }, "Save Role Draft", -1))
                ], 32))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("section", _hoisted_45, [
            _cache[46] || (_cache[46] = createBaseVNode("div", { class: "settings-card__header" }, [
              createBaseVNode("div", null, [
                createBaseVNode("p", { class: "eyebrow" }, "Channels"),
                createBaseVNode("h2", null, "Notification Preferences")
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_46, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(notificationPreferences, (item) => {
                return (openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: "notification-row"
                }, [
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", null, toDisplayString(item.title), 1),
                    createBaseVNode("p", null, toDisplayString(item.description), 1)
                  ]),
                  createBaseVNode("div", {
                    class: "channel-toggles",
                    "aria-label": `${item.title} channels`
                  }, [
                    createBaseVNode("label", _hoisted_48, [
                      _cache[42] || (_cache[42] = createBaseVNode("span", null, "Email", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": $event => ((item.email) = $event),
                        type: "checkbox"
                      }, null, 8, _hoisted_49), [
                        [vModelCheckbox, item.email]
                      ]),
                      _cache[43] || (_cache[43] = createBaseVNode("span", {
                        class: "switch-control",
                        "aria-hidden": "true"
                      }, null, -1))
                    ]),
                    createBaseVNode("label", _hoisted_50, [
                      _cache[44] || (_cache[44] = createBaseVNode("span", null, "Mobile", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": $event => ((item.mobile) = $event),
                        type: "checkbox"
                      }, null, 8, _hoisted_51), [
                        [vModelCheckbox, item.mobile]
                      ]),
                      _cache[45] || (_cache[45] = createBaseVNode("span", {
                        class: "switch-control",
                        "aria-hidden": "true"
                      }, null, -1))
                    ])
                  ], 8, _hoisted_47)
                ]))
              }), 128))
            ])
          ]),
          createBaseVNode("section", _hoisted_52, [
            _cache[47] || (_cache[47] = createBaseVNode("div", { class: "settings-card__header" }, [
              createBaseVNode("div", null, [
                createBaseVNode("p", { class: "eyebrow" }, "Connected systems"),
                createBaseVNode("h2", null, "Integrations")
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_53, [
              (openBlock(), createElementBlock(Fragment, null, renderList(integrations, (integration) => {
                return createBaseVNode("article", {
                  key: integration.id,
                  class: "integration-row"
                }, [
                  createBaseVNode("div", _hoisted_54, [
                    createBaseVNode("i", {
                      class: normalizeClass(integration.icon)
                    }, null, 2)
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", null, toDisplayString(integration.name), 1),
                    createBaseVNode("p", null, toDisplayString(integration.description), 1)
                  ]),
                  createBaseVNode("div", _hoisted_55, [
                    createBaseVNode("span", {
                      class: normalizeClass(['status-pill', integration.connected ? 'status-pill--connected' : 'status-pill--muted'])
                    }, toDisplayString(integration.connected ? 'Connected' : 'Available'), 3),
                    createBaseVNode("button", _hoisted_56, toDisplayString(integration.connected ? 'Manage' : 'Connect'), 1)
                  ])
                ])
              }), 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_57, [
            createBaseVNode("button", {
              type: "button",
              class: "btn btn--primary btn--large",
              onClick: saveSettings
            }, " Save Settings "),
            (savedAt.value)
              ? (openBlock(), createElementBlock("p", _hoisted_58, "Saved locally at " + toDisplayString(savedAt.value), 1))
              : createCommentVNode("", true)
          ])
        ])
      ])
    ])
  ]))
}
}

};
const SettingsModule = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-c6382e93"]]);

export { SettingsModule as default };
