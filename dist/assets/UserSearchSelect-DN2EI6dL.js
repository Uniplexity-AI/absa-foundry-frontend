import { g as _export_sfc, r as ref, D as computed, h as onMounted, i as onBeforeUnmount, M as watch, o as openBlock, c as createElementBlock, t as toDisplayString, l as createCommentVNode, b as createBaseVNode, q as createVNode, y as unref, v as withDirectives, x as vModelText, s as withModifiers, aa as X, j as normalizeClass, z as createBlock, n as normalizeStyle, F as Fragment, e as renderList, U as Teleport, V as nextTick } from './index-BbnB6Erv.js';
import { S as Search } from './search-DB7QNcKq.js';
import { C as ChevronDown } from './chevron-down-m0wkTAiL.js';
import { C as Check } from './check-DETr3-PG.js';

const _hoisted_1 = {
  key: 0,
  class: "block text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-0.5"
};
const _hoisted_2 = ["placeholder"];
const _hoisted_3 = { class: "flex items-center gap-1 mr-2" };
const _hoisted_4 = { class: "text-gray-300 group-hover:text-gray-400 transition-colors mr-1" };
const _hoisted_5 = {
  key: 0,
  class: "py-0"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "flex flex-col min-w-0" };
const _hoisted_8 = { class: "text-[11px] font-mono font-black text-gray-800 truncate block uppercase tracking-tight" };
const _hoisted_9 = { class: "text-[9px] font-mono text-gray-400 truncate block uppercase tracking-widest mt-0.5" };
const _hoisted_10 = {
  key: 1,
  class: "px-4 py-3 text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest"
};


const _sfc_main = {
  __name: 'UserSearchSelect',
  props: {
  modelValue: { type: String, default: '' },
  users: { type: Array, default: () => [] },
  label: { type: String, default: '' }
},
  emits: ['update:modelValue'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
const dropdownRef = ref(null);
const inputRef = ref(null);
const dropdownStyle = ref({});

// Get currently selected full user object
const selectedUser = computed(() => {
  if (!props.users || !Array.isArray(props.users)) return null;
  return props.users.find(u => u && u.email === props.modelValue);
});

// Filter users based on search
const filteredUsers = computed(() => {
  if (!props.users || !Array.isArray(props.users)) return [];
  if (!searchQuery.value) return props.users;
  const query = searchQuery.value.toLowerCase();
  return props.users.filter(user =>
    user && (
      (user.full_name && user.full_name.toLowerCase().includes(query)) ||
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.role && user.role.toLowerCase().includes(query))
    )
  );
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
    nextTick(() => inputRef.value?.focus());
  }
}

function updateDropdownPosition() {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const dropdownHeight = 240;
  const gap = 4;

  // Space available below and above in the viewport
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (spaceAbove >= dropdownHeight && spaceBelow < dropdownHeight) {
    // Flip UP: anchor bottom of dropdown to top of trigger
    const bottomPx = viewportHeight - rect.top + gap;
    dropdownStyle.value = {
      top: 'auto',
      bottom: `${Math.max(bottomPx, gap)}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  } else {
    // Open DOWN: anchor top of dropdown to bottom of trigger, clamped inside viewport
    const topPx = Math.min(rect.bottom + gap, viewportHeight - dropdownHeight - gap);
    dropdownStyle.value = {
      top: `${Math.max(topPx, gap)}px`,
      bottom: 'auto',
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  }
}

// Handle selection
function selectUser(user) {
  emit('update:modelValue', user.email);
  isOpen.value = false;
  searchQuery.value = ''; 
}

function clearSelection() {
  emit('update:modelValue', '');
  searchQuery.value = '';
  isOpen.value = false;
}

function handleClickOutside(event) {
  const inContainer = containerRef.value && containerRef.value.contains(event.target);
  const inDropdown = dropdownRef.value && dropdownRef.value.contains(event.target);
  if (!inContainer && !inDropdown) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('resize', updateDropdownPosition);
  window.addEventListener('scroll', updateDropdownPosition, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
});

// Reset search on close
watch(isOpen, (newVal) => {
  if (!newVal) searchQuery.value = '';
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "relative",
    ref_key: "containerRef",
    ref: containerRef
  }, [
    (__props.label)
      ? (openBlock(), createElementBlock("label", _hoisted_1, toDisplayString(__props.label), 1))
      : createCommentVNode("", true),
    createBaseVNode("div", {
      onClick: toggleDropdown,
      class: normalizeClass(["w-full border border-gray-200 rounded-sm bg-white relative flex items-center min-h-[38px] transition-all hover:border-[#2F2E8B] cursor-pointer group", { 'ring-2 ring-[#2F2E8B]/30 border-[#2F2E8B]': isOpen.value }])
    }, [
      createVNode(unref(Search), {
        class: "text-gray-300 ml-3 shrink-0",
        size: 12
      }),
      withDirectives(createBaseVNode("input", {
        ref_key: "inputRef",
        ref: inputRef,
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchQuery).value = $event)),
        onInput: _cache[1] || (_cache[1] = $event => (isOpen.value = true)),
        onFocus: _cache[2] || (_cache[2] = $event => (isOpen.value = true)),
        placeholder: selectedUser.value ? (selectedUser.value.full_name || selectedUser.value.name || selectedUser.value.email).toUpperCase() : 'SEARCH_USER...',
        class: "w-full px-3 py-2 bg-transparent focus:outline-none text-[10px] font-mono font-bold text-gray-800 placeholder-gray-300 uppercase tracking-wider cursor-pointer"
      }, null, 40, _hoisted_2), [
        [vModelText, searchQuery.value]
      ]),
      createBaseVNode("div", _hoisted_3, [
        (__props.modelValue || searchQuery.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: withModifiers(clearSelection, ["stop"]),
              type: "button",
              class: "text-gray-300 hover:text-red-500 p-1 transition-colors",
              title: "Clear selection"
            }, [
              createVNode(unref(X), { size: 12 })
            ]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(ChevronDown), { size: 12 })
        ])
      ])
    ], 2),
    (openBlock(), createBlock(Teleport, { to: "#modal-target" }, [
      (isOpen.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "dropdownRef",
            ref: dropdownRef,
            class: "fixed z-[999999] bg-white border border-gray-200 rounded-sm shadow-2xl max-h-60 overflow-y-auto divide-y divide-gray-100 animate-dropdown-in pointer-events-auto",
            style: normalizeStyle(dropdownStyle.value)
          }, [
            (filteredUsers.value.length > 0)
              ? (openBlock(), createElementBlock("ul", _hoisted_5, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredUsers.value, (user) => {
                    return (openBlock(), createElementBlock("li", {
                      key: user.email,
                      onClick: $event => (selectUser(user)),
                      class: normalizeClass(["px-3 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors", {'bg-blue-50/50': __props.modelValue === user.email}])
                    }, [
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("span", _hoisted_8, toDisplayString(user.full_name || user.name || user.email.split('@')[0]), 1),
                        createBaseVNode("span", _hoisted_9, toDisplayString(user.email), 1)
                      ]),
                      (__props.modelValue === user.email)
                        ? (openBlock(), createBlock(unref(Check), {
                            key: 0,
                            class: "text-[#2F2E8B]",
                            size: 12
                          }))
                        : createCommentVNode("", true)
                    ], 10, _hoisted_6))
                  }), 128))
                ]))
              : (openBlock(), createElementBlock("div", _hoisted_10, " NO_RECORDS_FOUND "))
          ], 4))
        : createCommentVNode("", true)
    ]))
  ], 512))
}
}

};
const UserSearchSelect = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-fbbc8544"]]);

export { UserSearchSelect as U };
