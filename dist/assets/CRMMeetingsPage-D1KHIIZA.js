import { $ as createLucideIcon, _ as _export_sfc, r as ref, i as computed, f as onMounted, g as onBeforeUnmount, o as openBlock, c as createElementBlock, t as toDisplayString, j as createCommentVNode, b as createBaseVNode, q as createVNode, s as unref, x as withDirectives, y as vModelText, v as withModifiers, a3 as X, h as normalizeClass, F as Fragment, e as renderList, C as createBlock, P as nextTick, M as watch, L as vModelSelect, K as withKeys, A as createTextVNode, N as vModelCheckbox, T as Teleport, O as vShow, a as createStaticVNode, a9 as Calendar, Z as __vitePreload, I as BASE_URL } from './index-CSRWfGkc.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-WtZersWu.js';
import { _ as _sfc_main$3 } from './BackButton-C_J8mv7S.js';
import { i as useCRMModule, a1 as getMeetings, a2 as updateMeeting, a3 as cancelMeeting } from './CRMModule-Dh_JOtqO.js';
import { S as Search } from './search-DQhDhgn9.js';
import { C as ChevronDown } from './chevron-down-CngbXN7p.js';
import { C as Check } from './check-B1G6N7Et.js';
import { P as Plus } from './plus-DZ6EGz2e.js';
import { M as MapPin } from './map-pin-DwiRj7mX.js';
import { N as Navigation } from './navigation-DDKdX3vq.js';
import { L as LoaderCircle } from './loader-circle-RZsy0lpi.js';
import { T as Trash2 } from './trash-2-Dk_687hF.js';
import { U as Users } from './users-LtfCTvaV.js';
import { u as useCurrency } from './useCurrency-BbedTGo0.js';
import { C as CircleUser } from './circle-user-CNUVO4ZW.js';
import { E as Eye } from './eye-BSX0WebV.js';
import { E as EyeOff } from './eye-off-R4NjDIfS.js';
import { F as FileSpreadsheet } from './file-spreadsheet-CNUAXdl9.js';
import { C as Clock } from './clock-CClZCNZB.js';
import { C as CalendarDays } from './calendar-days-BTNvnFCC.js';
import { C as CircleCheck } from './circle-check-CYXIenMB.js';
import { C as CalendarCheck } from './calendar-check-OTeL0Yky.js';
import { T as TrendingUp } from './trending-up-C_ZMKZbX.js';
import { D as DollarSign } from './dollar-sign-DQoUs7ko.js';
import { T as Target } from './target-CkdLuHe5.js';
import { T as TriangleAlert } from './triangle-alert-D-rzoNME.js';
import { L as List } from './list-BoGjmmAD.js';
import { C as ChevronLeft } from './chevron-left-DyaMDUnF.js';
import { C as ChevronRight } from './chevron-right-Cqg9XeX0.js';
import { P as Pencil } from './pencil-8vo1EUGC.js';
import './_commonjsHelpers-BFTU3MAI.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const CalendarX = createLucideIcon("CalendarXIcon", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m14 14-4 4", key: "rymu2i" }],
  ["path", { d: "m10 14 4 4", key: "3sz06r" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ExternalLink = createLucideIcon("ExternalLinkIcon", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);

const _hoisted_1$2 = {
  key: 0,
  class: "block text-xs font-semibold text-gray-500 mb-1.5 ml-0.5"
};
const _hoisted_2$2 = ["placeholder"];
const _hoisted_3$2 = { class: "flex items-center gap-1 mr-2" };
const _hoisted_4$2 = { class: "text-gray-400 group-hover:text-[#2F2E8B] transition-colors mr-1" };
const _hoisted_5$2 = {
  key: 1,
  class: "absolute z-[100] mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-xl max-h-60 overflow-y-auto divide-y divide-gray-100 animate-dropdown-in pointer-events-auto"
};
const _hoisted_6$2 = {
  key: 0,
  class: "py-1"
};
const _hoisted_7$2 = ["onClick"];
const _hoisted_8$2 = { class: "text-sm text-gray-700" };
const _hoisted_9$2 = { class: "flex items-center gap-2" };
const _hoisted_10$2 = { class: "text-sm text-gray-700" };
const _hoisted_11$2 = {
  key: 2,
  class: "px-4 py-4 text-sm text-gray-400 text-center"
};


const _sfc_main$2 = {
  __name: 'SearchableSelect',
  props: {
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select option...' }
},
  emits: ['update:modelValue'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
const inputRef = ref(null);
const dropdownStyle = ref({});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  const query = searchQuery.value.toLowerCase();
  return props.options.filter(opt => opt.toLowerCase().includes(query));
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownPosition();
    nextTick(() => inputRef.value?.focus());
  }
}

function updateDropdownPosition() {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    // For fixed position, we use viewport coordinates directly
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  }
}

function selectOption(option) {
  emit('update:modelValue', option);
  isOpen.value = false;
  searchQuery.value = '';
}

function clearSelection() {
  emit('update:modelValue', '');
  searchQuery.value = '';
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false;
    searchQuery.value = '';
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

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: "relative",
    ref_key: "containerRef",
    ref: containerRef
  }, [
    (__props.label)
      ? (openBlock(), createElementBlock("label", _hoisted_1$2, toDisplayString(__props.label), 1))
      : createCommentVNode("", true),
    createBaseVNode("div", {
      onClick: toggleDropdown,
      class: normalizeClass(["w-full border border-gray-200 rounded-sm bg-white relative flex items-center min-h-[42px] transition-all hover:border-[#2F2E8B] cursor-pointer group", { 'ring-2 ring-[#2F2E8B]/20 border-[#2F2E8B]': isOpen.value }])
    }, [
      createVNode(unref(Search), {
        class: "text-gray-400 ml-3 shrink-0 group-hover:text-[#2F2E8B] transition-colors",
        size: 14
      }),
      withDirectives(createBaseVNode("input", {
        ref_key: "inputRef",
        ref: inputRef,
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((searchQuery).value = $event)),
        onInput: _cache[1] || (_cache[1] = $event => (isOpen.value = true)),
        onFocus: _cache[2] || (_cache[2] = $event => (isOpen.value = true)),
        placeholder: __props.modelValue || __props.placeholder,
        class: "w-full px-3 py-2 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400 cursor-pointer"
      }, null, 40, _hoisted_2$2), [
        [vModelText, searchQuery.value]
      ]),
      createBaseVNode("div", _hoisted_3$2, [
        (__props.modelValue || searchQuery.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: withModifiers(clearSelection, ["stop"]),
              type: "button",
              class: "text-gray-400 hover:text-red-500 p-1 transition-colors"
            }, [
              createVNode(unref(X), { size: 14 })
            ]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_4$2, [
          createVNode(unref(ChevronDown), { size: 14 })
        ])
      ])
    ], 2),
    (isOpen.value)
      ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
          (filteredOptions.value.length > 0)
            ? (openBlock(), createElementBlock("ul", _hoisted_6$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredOptions.value, (option) => {
                  return (openBlock(), createElementBlock("li", {
                    key: option,
                    onClick: $event => (selectOption(option)),
                    class: normalizeClass(["px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors", {'bg-[#2F2E8B]/5': __props.modelValue === option}])
                  }, [
                    createBaseVNode("span", _hoisted_8$2, toDisplayString(option), 1),
                    (__props.modelValue === option)
                      ? (openBlock(), createBlock(unref(Check), {
                          key: 0,
                          class: "text-[#2F2E8B]",
                          size: 14
                        }))
                      : createCommentVNode("", true)
                  ], 10, _hoisted_7$2))
                }), 128))
              ]))
            : createCommentVNode("", true),
          (searchQuery.value && !filteredOptions.value.includes(searchQuery.value))
            ? (openBlock(), createElementBlock("div", {
                key: 1,
                onClick: _cache[3] || (_cache[3] = $event => (selectOption(searchQuery.value))),
                class: "px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100 group transition-colors"
              }, [
                createBaseVNode("div", _hoisted_9$2, [
                  createVNode(unref(Plus), {
                    size: 14,
                    class: "text-[#2F2E8B]"
                  }),
                  createBaseVNode("span", _hoisted_10$2, " Use \"" + toDisplayString(searchQuery.value) + "\" ", 1)
                ])
              ]))
            : createCommentVNode("", true),
          (!filteredOptions.value.length && !searchQuery.value)
            ? (openBlock(), createElementBlock("div", _hoisted_11$2, " No options found "))
            : createCommentVNode("", true)
        ]))
      : createCommentVNode("", true)
  ], 512))
}
}

};
const SearchableSelect = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-a6702eaa"]]);

const _hoisted_1$1 = { class: "fixed inset-0 z-[100] flex items-center justify-center p-4" };
const _hoisted_2$1 = { class: "relative bg-white w-full max-w-2xl shadow-2xl rounded-sm border border-gray-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200" };
const _hoisted_3$1 = { class: "relative px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between" };
const _hoisted_4$1 = { class: "flex items-center gap-3" };
const _hoisted_5$1 = { class: "text-xl font-bold text-gray-900 tracking-tight" };
const _hoisted_6$1 = { class: "flex-1 overflow-y-auto p-8 space-y-10" };
const _hoisted_7$1 = { class: "space-y-6" };
const _hoisted_8$1 = { class: "space-y-5" };
const _hoisted_9$1 = { class: "space-y-1.5" };
const _hoisted_10$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_11$1 = { class: "space-y-1.5" };
const _hoisted_12$1 = { class: "relative" };
const _hoisted_13$1 = { class: "space-y-1.5" };
const _hoisted_14$1 = { class: "relative" };
const _hoisted_15$1 = {
  key: 0,
  class: "space-y-1.5"
};
const _hoisted_16$1 = {
  key: 1,
  class: "border border-green-200 bg-green-50/30 rounded-sm p-4 space-y-3"
};
const _hoisted_17$1 = { class: "flex items-center gap-2" };
const _hoisted_18$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_19$1 = { class: "bg-white border border-[#2F2E8B]/20 rounded-sm p-3 space-y-2" };
const _hoisted_20$1 = { class: "flex items-center gap-1.5 pb-1 border-b border-gray-100" };
const _hoisted_21$1 = {
  key: 0,
  class: "ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200"
};
const _hoisted_22$1 = { class: "relative" };
const _hoisted_23$1 = {
  key: 0,
  class: "border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1"
};
const _hoisted_24$1 = ["onClick"];
const _hoisted_25$1 = { class: "flex gap-1.5" };
const _hoisted_26$1 = ["disabled"];
const _hoisted_27$1 = {
  key: 1,
  class: "space-y-1.5"
};
const _hoisted_28$1 = { class: "grid grid-cols-2 gap-1.5" };
const _hoisted_29$1 = {
  key: 2,
  class: "bg-green-50 border border-green-200 px-2 py-1.5 rounded-sm"
};
const _hoisted_30$1 = { class: "text-[7px] font-mono font-bold text-green-800 truncate" };
const _hoisted_31$1 = { class: "text-[6px] font-mono text-green-600" };
const _hoisted_32$1 = {
  key: 3,
  class: "bg-gray-50 border border-dashed border-gray-200 px-2 py-3 text-center rounded-sm"
};
const _hoisted_33$1 = { class: "bg-white border border-amber-200/60 rounded-sm p-3 space-y-2" };
const _hoisted_34$1 = { class: "flex items-center gap-1.5 pb-1 border-b border-gray-100" };
const _hoisted_35$1 = { class: "text-[9px] font-mono font-black text-amber-700 uppercase tracking-widest" };
const _hoisted_36$1 = {
  key: 0,
  class: "ml-auto text-[7px] font-mono font-bold text-green-600 bg-green-50 px-1 py-0.5 border border-green-200"
};
const _hoisted_37$1 = {
  key: 1,
  class: "ml-auto text-[7px] font-mono font-bold text-amber-600 bg-amber-50 px-1 py-0.5 border border-amber-200"
};
const _hoisted_38$1 = {
  key: 0,
  class: "flex items-start gap-2"
};
const _hoisted_39$1 = { class: "flex-1 min-w-0" };
const _hoisted_40$1 = { class: "text-[8px] font-mono font-bold text-gray-800 uppercase truncate" };
const _hoisted_41$1 = { class: "text-[6px] font-mono text-gray-500" };
const _hoisted_42$1 = {
  key: 1,
  class: "bg-amber-50 border border-dashed border-amber-200 px-2 py-2 text-center rounded-sm"
};
const _hoisted_43$1 = { class: "text-[7px] font-mono font-bold text-amber-600 uppercase tracking-widest" };
const _hoisted_44$1 = { class: "relative" };
const _hoisted_45$1 = {
  key: 2,
  class: "border border-gray-200 bg-white max-h-28 overflow-y-auto -mt-1"
};
const _hoisted_46$1 = ["onClick"];
const _hoisted_47$1 = {
  key: 0,
  class: "bg-white border border-gray-200 rounded-sm px-4 py-3 flex items-center justify-between"
};
const _hoisted_48$1 = { class: "flex items-center gap-2" };
const _hoisted_49$1 = { class: "text-right" };
const _hoisted_50$1 = { class: "text-sm font-black text-[#2F2E8B]" };
const _hoisted_51$1 = {
  key: 1,
  class: "bg-gray-50 border border-dashed border-gray-200 rounded-sm px-4 py-2 text-center"
};
const _hoisted_52$1 = { class: "space-y-6" };
const _hoisted_53$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_54$1 = { class: "space-y-1.5" };
const _hoisted_55$1 = { class: "space-y-1.5" };
const _hoisted_56$1 = { class: "space-y-6" };
const _hoisted_57$1 = { class: "space-y-5" };
const _hoisted_58$1 = { class: "flex gap-2" };
const _hoisted_59$1 = { class: "flex-1 space-y-1.5" };
const _hoisted_60$1 = { class: "flex-[1.5] space-y-1.5" };
const _hoisted_61$1 = {
  key: 0,
  class: "bg-gray-50 border border-gray-200 rounded-sm divide-y divide-gray-200"
};
const _hoisted_62$1 = { class: "flex flex-col" };
const _hoisted_63$1 = { class: "text-sm font-semibold text-gray-900" };
const _hoisted_64$1 = { class: "text-xs text-gray-500" };
const _hoisted_65$1 = ["onClick"];
const _hoisted_66$1 = {
  key: 1,
  class: "text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-sm"
};
const _hoisted_67$1 = { class: "space-y-6" };
const _hoisted_68$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_69$1 = { class: "space-y-1.5" };
const _hoisted_70$1 = { class: "relative" };
const _hoisted_71$1 = {
  key: 0,
  class: "space-y-1.5"
};
const _hoisted_72$1 = { class: "space-y-6" };
const _hoisted_73$1 = { class: "space-y-1.5" };
const _hoisted_74$1 = { class: "space-y-6 pb-4" };
const _hoisted_75$1 = { class: "flex flex-wrap gap-8" };
const _hoisted_76$1 = { class: "flex items-center gap-3 cursor-pointer group" };
const _hoisted_77$1 = { class: "flex items-center gap-3 cursor-pointer group" };
const _hoisted_78$1 = { class: "flex items-center gap-3 cursor-pointer group" };
const _hoisted_79$1 = { class: "p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between" };
const _hoisted_80$1 = ["disabled"];


const _sfc_main$1 = {
  __name: 'CRMMeetingModal',
  setup(__props) {

const {
  editingMeeting, meetingForm, newParticipant, savingMeeting,
  closeMeetingModal, submitMeeting, addParticipant, removeParticipant,
  getRecordsForType
} = useCRMModule();

// ── Location Search ──
const locationSearchQuery = ref('');
const locationResults = ref([]);
const searchingLocation = ref(false);
const meetingDistance = ref(null);
const isLocatingDevice = ref(false);
const showManualLocation = ref(false);
const meetingManualLat = ref(null);
const meetingManualLng = ref(null);

// Linked record location
const linkedRecordLocation = ref(null);
const linkedLocationSearch = ref('');
const linkedLocationResults = ref([]);
ref(false);

function updateLinkedRecordLocation() {
  const linkedId = meetingForm.value.linkedRecordId;
  const linkedType = meetingForm.value.linkedRecordType;
  if (!linkedId || !linkedType) {
    linkedRecordLocation.value = null;
    return;
  }
  const records = getRecordsForType(linkedType);
  const record = records.find(r => (r.id || r._id) === linkedId);
  if (!record) { linkedRecordLocation.value = null; return; }
  const loc = record.location || record;
  const lat = loc.lat || loc.latitude;
  const lng = loc.lng || loc.longitude || loc.lng;
  if (lat && lng) {
    linkedRecordLocation.value = {
      lat, lng,
      label: record.city ? `${record.city}, ${record.country || ''}` : (record.name || '')
    };
  } else {
    linkedRecordLocation.value = null;
  }
}

// ── Linked Record Location Search ──
async function searchLinkedLocation() {
  const q = linkedLocationSearch.value.trim();
  if (!q) return;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
    const data = await res.json();
    linkedLocationResults.value = data.map(d => ({
      label: d.display_name,
      lat: parseFloat(d.lat),
      lng: parseFloat(d.lon)
    }));
  } catch {
    linkedLocationResults.value = [];
  }
}

function selectLinkedLocation(result) {
  linkedLocationResults.value = [];
  linkedLocationSearch.value = '';
  // Update the linked record's location in the form metadata
  const linkedId = meetingForm.value.linkedRecordId;
  const linkedType = meetingForm.value.linkedRecordType;
  if (!linkedId || !linkedType) return;
  // Update local linkedRecordLocation for distance calculation
  linkedRecordLocation.value = {
    lat: result.lat,
    lng: result.lng,
    label: result.label
  };
  calcMeetingDistance();
}

async function searchLocation() {
  const q = locationSearchQuery.value.trim();
  if (!q) return;
  searchingLocation.value = true;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
    const data = await res.json();
    locationResults.value = data.map(d => ({
      label: d.display_name,
      lat: parseFloat(d.lat),
      lng: parseFloat(d.lon)
    }));
  } catch {
    locationResults.value = [];
  } finally {
    searchingLocation.value = false;
  }
}

function selectLocation(result) {
  meetingForm.value.location = result.label;
  meetingForm.value.lat = result.lat;
  meetingForm.value.lng = result.lng;
  locationResults.value = [];
  locationSearchQuery.value = '';
  calcMeetingDistance();
}

function useCurrentLocationForMeeting() {
  if (!navigator.geolocation) { alert('Geolocation is not supported.'); return; }
  isLocatingDevice.value = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      meetingForm.value.lat = lat;
      meetingForm.value.lng = lng;
      // Reverse geocode to get a place name
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
        const data = await res.json();
        meetingForm.value.location = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      } catch {
        meetingForm.value.location = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
      isLocatingDevice.value = false;
      calcMeetingDistance();
    },
    () => { isLocatingDevice.value = false; alert('Could not get current location.'); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function applyManualLocation() {
  const lat = parseFloat(meetingManualLat.value);
  const lng = parseFloat(meetingManualLng.value);
  if (isNaN(lat) || isNaN(lng)) { alert('Enter valid coordinates.'); return; }
  meetingForm.value.lat = lat;
  meetingForm.value.lng = lng;
  meetingForm.value.location = `MANUAL: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  showManualLocation.value = false;
  calcMeetingDistance();
}

function calcMeetingDistance() {
  const mLat = meetingForm.value.lat;
  const mLng = meetingForm.value.lng;
  const rLoc = linkedRecordLocation.value;
  if (!mLat || !mLng || !rLoc?.lat || !rLoc?.lng) {
    meetingDistance.value = null;
    return;
  }
  const R = 6371;
  const dLat = (rLoc.lat - mLat) * Math.PI / 180;
  const dLng = (rLoc.lng - mLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(mLat * Math.PI / 180) * Math.cos(rLoc.lat * Math.PI / 180) * Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  meetingDistance.value = R * c;
  // Save distance to form
  meetingForm.value.distance_km = R * c;
}

// Helper to sync record name from searchable select to id in form
const selectedRecordName = ref('');

// Watch for manual name selection and find the ID
watch(selectedRecordName, (newName) => {
  if (!newName) {
    meetingForm.value.linkedRecordId = '';
    return;
  }
  const records = getRecordsForType(meetingForm.value.linkedRecordType);
  const found = records.find(r => r.name === newName);
  if (found) {
    meetingForm.value.linkedRecordId = found.id || found._id;
  }
});

// Watch for external ID changes (e.g. when editing) to sync name
watch(() => meetingForm.value.linkedRecordId, (newId) => {
  if (!newId) {
    selectedRecordName.value = '';
    return;
  }
  const records = getRecordsForType(meetingForm.value.linkedRecordType);
  const found = records.find(r => (r.id || r._id) === newId);
  if (found) {
    selectedRecordName.value = found.name;
  }
  updateLinkedRecordLocation();
  calcMeetingDistance();
}, { immediate: true });

// Recalculate distance when linked record type changes
watch(() => meetingForm.value.linkedRecordType, () => {
  updateLinkedRecordLocation();
  calcMeetingDistance();
});

// Watch for distance_km reset on form clear
watch(() => meetingForm.value.location, () => {
  if (!meetingForm.value.location) {
    meetingForm.value.lat = null;
    meetingForm.value.lng = null;
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", {
        class: "absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity",
        onClick: _cache[0] || (_cache[0] = (...args) => (unref(closeMeetingModal) && unref(closeMeetingModal)(...args)))
      }),
      createBaseVNode("div", _hoisted_2$1, [
        _cache[54] || (_cache[54] = createBaseVNode("div", { class: "absolute top-0 right-0 w-32 h-32 dotted-pattern opacity-10 pointer-events-none" }, null, -1)),
        createBaseVNode("header", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            _cache[25] || (_cache[25] = createBaseVNode("div", { class: "w-1 h-8 bg-[#2F2E8B] rounded-full" }, null, -1)),
            createBaseVNode("div", null, [
              _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-[11px] font-medium text-gray-400 uppercase tracking-widest" }, "Meeting Scheduler", -1)),
              createBaseVNode("h2", _hoisted_5$1, toDisplayString(unref(editingMeeting) ? 'Edit Meeting' : 'Schedule New Meeting'), 1)
            ])
          ]),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => (unref(closeMeetingModal) && unref(closeMeetingModal)(...args))),
            class: "p-2 text-gray-400 hover:text-gray-900 transition hover:bg-gray-100 rounded-full"
          }, [
            createVNode(unref(X), { size: 20 })
          ])
        ]),
        createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("section", _hoisted_7$1, [
            _cache[37] || (_cache[37] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 1: Primary Information")
            ], -1)),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("div", _hoisted_9$1, [
                _cache[26] || (_cache[26] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Meeting Title *", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(meetingForm).title) = $event)),
                  type: "text",
                  placeholder: "Enter a descriptive title for this meeting...",
                  class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
                }, null, 512), [
                  [vModelText, unref(meetingForm).title]
                ])
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("div", _hoisted_11$1, [
                  _cache[28] || (_cache[28] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Meeting Type", -1)),
                  createBaseVNode("div", _hoisted_12$1, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(meetingForm).meeting_type) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                    }, [...(_cache[27] || (_cache[27] = [
                      createBaseVNode("option", { value: "call" }, "Phone Call", -1),
                      createBaseVNode("option", { value: "virtual" }, "Virtual Meeting", -1),
                      createBaseVNode("option", { value: "physical" }, "Physical Meeting", -1),
                      createBaseVNode("option", { value: "other" }, "Other", -1)
                    ]))], 512), [
                      [vModelSelect, unref(meetingForm).meeting_type]
                    ]),
                    createVNode(unref(ChevronDown), {
                      class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
                      size: 16
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_13$1, [
                  _cache[30] || (_cache[30] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Location Type", -1)),
                  createBaseVNode("div", _hoisted_14$1, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(meetingForm).location_type) = $event)),
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                    }, [...(_cache[29] || (_cache[29] = [
                      createBaseVNode("option", { value: "virtual" }, "Virtual (Zoom/Google Meet)", -1),
                      createBaseVNode("option", { value: "physical" }, "Physical Address", -1),
                      createBaseVNode("option", { value: "phone" }, "Phone Call", -1)
                    ]))], 512), [
                      [vModelSelect, unref(meetingForm).location_type]
                    ]),
                    createVNode(unref(ChevronDown), {
                      class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
                      size: 16
                    })
                  ])
                ])
              ]),
              (unref(meetingForm).location_type === 'virtual')
                ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                    _cache[31] || (_cache[31] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Meeting Link (Optional)", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(meetingForm).virtual_meeting_url) = $event)),
                      type: "url",
                      placeholder: "https://meet.google.com/abc-defg-hij",
                      class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
                    }, null, 512), [
                      [vModelText, unref(meetingForm).virtual_meeting_url]
                    ])
                  ]))
                : createCommentVNode("", true),
              (unref(meetingForm).location_type === 'physical')
                ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
                    createBaseVNode("div", _hoisted_17$1, [
                      createVNode(unref(MapPin), {
                        size: 14,
                        class: "text-green-600"
                      }),
                      _cache[32] || (_cache[32] = createBaseVNode("span", { class: "text-xs font-bold text-green-700 uppercase tracking-wider" }, "Location & Distance", -1))
                    ]),
                    createBaseVNode("div", _hoisted_18$1, [
                      createBaseVNode("div", _hoisted_19$1, [
                        createBaseVNode("div", _hoisted_20$1, [
                          createVNode(unref(Navigation), {
                            size: 11,
                            class: "text-[#2F2E8B]"
                          }),
                          _cache[33] || (_cache[33] = createBaseVNode("span", { class: "text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest" }, "Your Location", -1)),
                          (unref(meetingForm).lat)
                            ? (openBlock(), createElementBlock("span", _hoisted_21$1, "SET"))
                            : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_22$1, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((locationSearchQuery).value = $event)),
                            onKeyup: withKeys(searchLocation, ["enter"]),
                            type: "text",
                            placeholder: "Search address or place...",
                            class: "w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[9px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                          }, null, 544), [
                            [vModelText, locationSearchQuery.value]
                          ]),
                          createBaseVNode("button", {
                            onClick: searchLocation,
                            type: "button",
                            class: "absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest hover:bg-gray-100"
                          }, "GO")
                        ]),
                        (locationResults.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(locationResults.value, (r) => {
                                return (openBlock(), createElementBlock("button", {
                                  key: r.label,
                                  onClick: $event => (selectLocation(r)),
                                  type: "button",
                                  class: "w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-[#2F2E8B]/5 hover:text-[#2F2E8B] border-b border-gray-50 truncate"
                                }, toDisplayString(r.label), 9, _hoisted_24$1))
                              }), 128))
                            ]))
                          : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_25$1, [
                          createBaseVNode("button", {
                            onClick: useCurrentLocationForMeeting,
                            disabled: isLocatingDevice.value,
                            type: "button",
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
                          ], 8, _hoisted_26$1),
                          createBaseVNode("button", {
                            onClick: _cache[7] || (_cache[7] = $event => (showManualLocation.value = !showManualLocation.value)),
                            type: "button",
                            class: "px-2 py-1.5 border border-gray-300 text-gray-500 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[7px] font-mono font-black uppercase tracking-widest transition-all"
                          }, "MANUAL")
                        ]),
                        (showManualLocation.value)
                          ? (openBlock(), createElementBlock("div", _hoisted_27$1, [
                              createBaseVNode("div", _hoisted_28$1, [
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((meetingManualLat).value = $event)),
                                  type: "number",
                                  step: "any",
                                  placeholder: "Lat",
                                  class: "border border-gray-200 px-2 py-1 text-[8px] font-mono focus:outline-none focus:border-[#2F2E8B]"
                                }, null, 512), [
                                  [vModelText, meetingManualLat.value]
                                ]),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((meetingManualLng).value = $event)),
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
                                type: "button",
                                class: "w-full px-2 py-1 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all"
                              }, "APPLY")
                            ]))
                          : createCommentVNode("", true),
                        (unref(meetingForm).lat)
                          ? (openBlock(), createElementBlock("div", _hoisted_29$1, [
                              createBaseVNode("p", _hoisted_30$1, toDisplayString(unref(meetingForm).location || `${unref(meetingForm).lat.toFixed(4)}, ${unref(meetingForm).lng.toFixed(4)}`), 1),
                              createBaseVNode("p", _hoisted_31$1, toDisplayString(unref(meetingForm).lat.toFixed(6)) + ", " + toDisplayString(unref(meetingForm).lng.toFixed(6)), 1)
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_32$1, [...(_cache[34] || (_cache[34] = [
                              createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "No location set", -1)
                            ]))]))
                      ]),
                      createBaseVNode("div", _hoisted_33$1, [
                        createBaseVNode("div", _hoisted_34$1, [
                          createVNode(unref(MapPin), {
                            size: 11,
                            class: "text-amber-600"
                          }),
                          createBaseVNode("span", _hoisted_35$1, toDisplayString(unref(meetingForm).linkedRecordType ? (unref(meetingForm).linkedRecordType.charAt(0).toUpperCase() + unref(meetingForm).linkedRecordType.slice(1) + "'s Location") : 'Linked Record'), 1),
                          (linkedRecordLocation.value)
                            ? (openBlock(), createElementBlock("span", _hoisted_36$1, "KNOWN"))
                            : (openBlock(), createElementBlock("span", _hoisted_37$1, "UNSET"))
                        ]),
                        (linkedRecordLocation.value)
                          ? (openBlock(), createElementBlock("div", _hoisted_38$1, [
                              createVNode(unref(MapPin), {
                                size: 10,
                                class: "text-amber-500 mt-0.5 shrink-0"
                              }),
                              createBaseVNode("div", _hoisted_39$1, [
                                createBaseVNode("p", _hoisted_40$1, toDisplayString(linkedRecordLocation.value.label || ''), 1),
                                createBaseVNode("p", _hoisted_41$1, toDisplayString(linkedRecordLocation.value.lat.toFixed(6)) + ", " + toDisplayString(linkedRecordLocation.value.lng.toFixed(6)), 1)
                              ])
                            ]))
                          : (openBlock(), createElementBlock("div", _hoisted_42$1, [
                              createBaseVNode("p", _hoisted_43$1, toDisplayString(unref(meetingForm).linkedRecordType ? 'No location for linked record' : 'Link a record to see location'), 1)
                            ])),
                        createBaseVNode("div", _hoisted_44$1, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((linkedLocationSearch).value = $event)),
                            onKeyup: withKeys(searchLinkedLocation, ["enter"]),
                            type: "text",
                            placeholder: "Search address for linked record...",
                            class: "w-full border border-gray-200 bg-white px-2.5 py-1.5 text-[8px] font-mono focus:outline-none focus:border-amber-500"
                          }, null, 544), [
                            [vModelText, linkedLocationSearch.value]
                          ]),
                          createBaseVNode("button", {
                            onClick: searchLinkedLocation,
                            type: "button",
                            class: "absolute right-0.5 top-0.5 px-2 py-1 text-[7px] font-mono font-black text-amber-600 uppercase tracking-widest hover:bg-gray-100"
                          }, "GO")
                        ]),
                        (linkedLocationResults.value.length > 0)
                          ? (openBlock(), createElementBlock("div", _hoisted_45$1, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(linkedLocationResults.value, (r) => {
                                return (openBlock(), createElementBlock("button", {
                                  key: r.label,
                                  onClick: $event => (selectLinkedLocation(r)),
                                  type: "button",
                                  class: "w-full text-left px-2.5 py-1.5 text-[8px] font-mono text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-b border-gray-50 truncate"
                                }, toDisplayString(r.label), 9, _hoisted_46$1))
                              }), 128))
                            ]))
                          : createCommentVNode("", true)
                      ])
                    ]),
                    (unref(meetingForm).lat && linkedRecordLocation.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_47$1, [
                          createBaseVNode("div", _hoisted_48$1, [
                            createVNode(unref(Navigation), {
                              size: 14,
                              class: "text-[#2F2E8B]"
                            }),
                            _cache[35] || (_cache[35] = createBaseVNode("span", { class: "text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Distance", -1))
                          ]),
                          createBaseVNode("div", _hoisted_49$1, [
                            createBaseVNode("span", _hoisted_50$1, toDisplayString(meetingDistance.value !== null ? (meetingDistance.value < 1 ? (meetingDistance.value * 1000).toFixed(0) + ' m' : meetingDistance.value.toFixed(2) + ' km') : '—'), 1)
                          ])
                        ]))
                      : (openBlock(), createElementBlock("div", _hoisted_51$1, [...(_cache[36] || (_cache[36] = [
                          createBaseVNode("p", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Set both locations to calculate distance", -1)
                        ]))]))
                  ]))
                : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("section", _hoisted_52$1, [
            _cache[40] || (_cache[40] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 2: Date & Time")
            ], -1)),
            createBaseVNode("div", _hoisted_53$1, [
              createBaseVNode("div", _hoisted_54$1, [
                _cache[38] || (_cache[38] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Starts At *", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((unref(meetingForm).start_datetime) = $event)),
                  type: "datetime-local",
                  class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm"
                }, null, 512), [
                  [vModelText, unref(meetingForm).start_datetime]
                ])
              ]),
              createBaseVNode("div", _hoisted_55$1, [
                _cache[39] || (_cache[39] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Ends At *", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((unref(meetingForm).end_datetime) = $event)),
                  type: "datetime-local",
                  class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm"
                }, null, 512), [
                  [vModelText, unref(meetingForm).end_datetime]
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_56$1, [
            _cache[42] || (_cache[42] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 3: Participants")
            ], -1)),
            createBaseVNode("div", _hoisted_57$1, [
              createBaseVNode("div", _hoisted_58$1, [
                createBaseVNode("div", _hoisted_59$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((unref(newParticipant).name) = $event)),
                    type: "text",
                    placeholder: "Full Name",
                    class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm"
                  }, null, 512), [
                    [vModelText, unref(newParticipant).name]
                  ])
                ]),
                createBaseVNode("div", _hoisted_60$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((unref(newParticipant).email) = $event)),
                    type: "email",
                    placeholder: "Email Address",
                    class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm"
                  }, null, 512), [
                    [vModelText, unref(newParticipant).email]
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: _cache[15] || (_cache[15] = (...args) => (unref(addParticipant) && unref(addParticipant)(...args))),
                  type: "button",
                  class: "bg-[#2F2E8B] text-white px-5 rounded-sm hover:bg-[#3D2F88] transition flex items-center justify-center self-stretch mb-0.5"
                }, [
                  createVNode(unref(Plus), { size: 20 })
                ])
              ]),
              (unref(meetingForm).participants.length > 0)
                ? (openBlock(), createElementBlock("div", _hoisted_61$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(meetingForm).participants, (p, idx) => {
                      return (openBlock(), createElementBlock("div", {
                        key: idx,
                        class: "flex items-center justify-between p-3.5 group hover:bg-white transition-colors"
                      }, [
                        createBaseVNode("div", _hoisted_62$1, [
                          createBaseVNode("span", _hoisted_63$1, toDisplayString(p.name), 1),
                          createBaseVNode("span", _hoisted_64$1, toDisplayString(p.email || 'No email provided') + " · " + toDisplayString(p.type), 1)
                        ]),
                        createBaseVNode("button", {
                          onClick: $event => (unref(removeParticipant)(idx)),
                          class: "text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-all"
                        }, [
                          createVNode(unref(Trash2), { size: 16 })
                        ], 8, _hoisted_65$1)
                      ]))
                    }), 128))
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_66$1, [
                    createVNode(unref(Users), {
                      size: 32,
                      class: "text-gray-300 mx-auto mb-2"
                    }),
                    _cache[41] || (_cache[41] = createBaseVNode("p", { class: "text-xs font-medium text-gray-400" }, "No participants added yet", -1))
                  ]))
            ])
          ]),
          createBaseVNode("section", _hoisted_67$1, [
            _cache[45] || (_cache[45] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 4: Linked Records")
            ], -1)),
            createBaseVNode("div", _hoisted_68$1, [
              createBaseVNode("div", _hoisted_69$1, [
                _cache[44] || (_cache[44] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Record Type", -1)),
                createBaseVNode("div", _hoisted_70$1, [
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((unref(meetingForm).linkedRecordType) = $event)),
                    class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm appearance-none cursor-pointer"
                  }, [...(_cache[43] || (_cache[43] = [
                    createBaseVNode("option", { value: "" }, "No Link", -1),
                    createBaseVNode("option", { value: "lead" }, "Lead", -1),
                    createBaseVNode("option", { value: "contact" }, "Contact", -1),
                    createBaseVNode("option", { value: "account" }, "Account", -1)
                  ]))], 512), [
                    [vModelSelect, unref(meetingForm).linkedRecordType]
                  ]),
                  createVNode(unref(ChevronDown), {
                    class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
                    size: 16
                  })
                ])
              ]),
              (unref(meetingForm).linkedRecordType)
                ? (openBlock(), createElementBlock("div", _hoisted_71$1, [
                    createVNode(SearchableSelect, {
                      label: "Select Record",
                      options: unref(getRecordsForType)(unref(meetingForm).linkedRecordType).map(r => r.name),
                      modelValue: selectedRecordName.value,
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((selectedRecordName).value = $event)),
                      placeholder: "Search by name..."
                    }, null, 8, ["options", "modelValue"])
                  ]))
                : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("section", _hoisted_72$1, [
            _cache[47] || (_cache[47] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 5: Documentation")
            ], -1)),
            createBaseVNode("div", _hoisted_73$1, [
              _cache[46] || (_cache[46] = createBaseVNode("label", { class: "text-xs font-semibold text-gray-500" }, "Meeting Notes / Agenda", -1)),
              withDirectives(createBaseVNode("textarea", {
                "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((unref(meetingForm).description) = $event)),
                rows: "4",
                placeholder: "Outline the goals and agenda for this meeting...",
                class: "w-full bg-white border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm p-3 text-sm transition-all"
              }, null, 512), [
                [vModelText, unref(meetingForm).description]
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_74$1, [
            _cache[51] || (_cache[51] = createBaseVNode("div", { class: "border-b border-gray-100 pb-2" }, [
              createBaseVNode("h3", { class: "text-xs font-bold text-[#2F2E8B] uppercase tracking-wider" }, "Step 6: Notification Triggers")
            ], -1)),
            createBaseVNode("div", _hoisted_75$1, [
              createBaseVNode("label", _hoisted_76$1, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => ((unref(meetingForm).reminder15min) = $event)),
                  class: "w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]"
                }, null, 512), [
                  [vModelCheckbox, unref(meetingForm).reminder15min]
                ]),
                _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" }, "15 Minutes Before", -1))
              ]),
              createBaseVNode("label", _hoisted_77$1, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => ((unref(meetingForm).reminder1hour) = $event)),
                  class: "w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]"
                }, null, 512), [
                  [vModelCheckbox, unref(meetingForm).reminder1hour]
                ]),
                _cache[49] || (_cache[49] = createBaseVNode("span", { class: "text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" }, "1 Hour Before", -1))
              ]),
              createBaseVNode("label", _hoisted_78$1, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((unref(meetingForm).reminder1day) = $event)),
                  class: "w-5 h-5 rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]"
                }, null, 512), [
                  [vModelCheckbox, unref(meetingForm).reminder1day]
                ]),
                _cache[50] || (_cache[50] = createBaseVNode("span", { class: "text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors" }, "24 Hours Before", -1))
              ])
            ])
          ])
        ]),
        createBaseVNode("footer", _hoisted_79$1, [
          createBaseVNode("button", {
            type: "button",
            onClick: _cache[22] || (_cache[22] = (...args) => (unref(closeMeetingModal) && unref(closeMeetingModal)(...args))),
            class: "px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition shadow-none"
          }, " Cancel "),
          createBaseVNode("button", {
            type: "button",
            onClick: _cache[23] || (_cache[23] = (...args) => (unref(submitMeeting) && unref(submitMeeting)(...args))),
            disabled: unref(savingMeeting),
            class: "px-10 py-3 bg-[#2F2E8B] text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition shadow-lg disabled:opacity-50 flex items-center gap-2"
          }, [
            (unref(savingMeeting))
              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  _cache[52] || (_cache[52] = createBaseVNode("span", { class: "w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" }, null, -1)),
                  _cache[53] || (_cache[53] = createTextVNode(" Processing... ", -1))
                ], 64))
              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(editingMeeting) ? 'Update Meeting' : 'Schedule Meeting'), 1)
                ], 64))
          ], 8, _hoisted_80$1)
        ])
      ])
    ])
  ]))
}
}

};
const CRMMeetingModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-c94f4951"]]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 pb-40" };
const _hoisted_8 = { class: "px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative" };
const _hoisted_9 = {
  key: 0,
  class: "space-y-6 w-full animate-pulse"
};
const _hoisted_10 = { class: "grid grid-cols-2 sm:grid-cols-4 gap-4" };
const _hoisted_11 = { class: "grid grid-cols-2 sm:grid-cols-4 gap-4" };
const _hoisted_12 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" };
const _hoisted_13 = { class: "flex items-center justify-between border-b border-gray-100 pb-4" };
const _hoisted_14 = { class: "flex items-center gap-2" };
const _hoisted_15 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_16 = ["title"];
const _hoisted_17 = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-4"
};
const _hoisted_18 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_19 = { class: "p-4 relative z-10" };
const _hoisted_20 = { class: "flex items-center justify-between mb-3" };
const _hoisted_21 = { class: "bg-blue-50 p-2 border border-blue-100" };
const _hoisted_22 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_23 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_24 = { class: "p-4 relative z-10" };
const _hoisted_25 = { class: "flex items-center justify-between mb-3" };
const _hoisted_26 = { class: "bg-green-50 p-2 border border-green-100" };
const _hoisted_27 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_28 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_29 = { class: "p-4 relative z-10" };
const _hoisted_30 = { class: "flex items-center justify-between mb-3" };
const _hoisted_31 = { class: "bg-emerald-50 p-2 border border-emerald-100" };
const _hoisted_32 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_33 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_34 = { class: "p-4 relative z-10" };
const _hoisted_35 = { class: "flex items-center justify-between mb-3" };
const _hoisted_36 = { class: "bg-orange-50 p-2 border border-orange-100" };
const _hoisted_37 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_38 = {
  key: 2,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-4"
};
const _hoisted_39 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_40 = { class: "p-4 relative z-10" };
const _hoisted_41 = { class: "flex items-center justify-between mb-3" };
const _hoisted_42 = { class: "bg-blue-50 p-2 border border-blue-100" };
const _hoisted_43 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_44 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_45 = { class: "p-4 relative z-10" };
const _hoisted_46 = { class: "flex items-center justify-between mb-3" };
const _hoisted_47 = { class: "bg-green-50 p-2 border border-green-100" };
const _hoisted_48 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_49 = { class: "bg-white border border-gray-200 shadow-none hover:border-[#2F2E8B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_50 = { class: "p-4 relative z-10" };
const _hoisted_51 = { class: "flex items-center justify-between mb-3" };
const _hoisted_52 = { class: "bg-purple-50 p-2 border border-purple-100" };
const _hoisted_53 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tight" };
const _hoisted_54 = { class: "bg-[#2F2E8B] border border-[#2F2E8B] shadow-none hover:bg-[#1D226B] transition cursor-pointer group relative overflow-hidden" };
const _hoisted_55 = { class: "p-4 relative z-10" };
const _hoisted_56 = { class: "flex items-center justify-between mb-3" };
const _hoisted_57 = { class: "bg-white/15 p-2 border border-white/20" };
const _hoisted_58 = { class: "text-sm font-black text-white tracking-tight" };
const _hoisted_59 = {
  key: 3,
  class: "flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3"
};
const _hoisted_60 = { class: "flex items-center gap-1.5 mr-2" };
const _hoisted_61 = { class: "flex items-center gap-1.5 overflow-x-auto" };
const _hoisted_62 = ["onClick"];
const _hoisted_63 = { key: 4 };
const _hoisted_64 = {
  key: 0,
  class: "bg-white border border-gray-100 text-center py-20 rounded-sm relative overflow-hidden"
};
const _hoisted_65 = { class: "relative z-10 flex flex-col items-center" };
const _hoisted_66 = { class: "w-16 h-16 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center mb-4" };
const _hoisted_67 = {
  key: 1,
  class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
};
const _hoisted_68 = ["onClick"];
const _hoisted_69 = { class: "px-3 py-2 border-b border-gray-50 bg-gray-50/30" };
const _hoisted_70 = { class: "flex items-start justify-between gap-2" };
const _hoisted_71 = { class: "flex-1 min-w-0" };
const _hoisted_72 = { class: "text-[10px] font-mono font-black text-gray-900 truncate uppercase tracking-tight group-hover:text-[#2F2E8B]" };
const _hoisted_73 = { class: "px-3 py-2 space-y-1.5 flex-1" };
const _hoisted_74 = { class: "flex items-center justify-between border-b border-dashed border-gray-100 pb-1.5" };
const _hoisted_75 = { class: "text-[10px] font-mono font-black text-[#2F2E8B] tracking-tighter" };
const _hoisted_76 = { class: "space-y-1" };
const _hoisted_77 = { class: "flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight" };
const _hoisted_78 = {
  key: 0,
  class: "flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight"
};
const _hoisted_79 = { class: "truncate" };
const _hoisted_80 = {
  key: 1,
  class: "flex items-center gap-1.5 text-[8px] font-mono font-bold text-gray-600 uppercase tracking-tight"
};
const _hoisted_81 = ["href"];
const _hoisted_82 = {
  key: 2,
  class: "text-[8px] font-mono text-gray-400 line-clamp-1 pt-0.5 normal-case leading-relaxed"
};
const _hoisted_83 = { class: "flex items-center gap-0.5" };
const _hoisted_84 = ["onClick"];
const _hoisted_85 = ["onClick"];
const _hoisted_86 = ["onClick"];
const _hoisted_87 = ["onClick"];
const _hoisted_88 = { class: "flex items-center gap-0.5" };
const _hoisted_89 = ["onClick"];
const _hoisted_90 = ["onClick"];
const _hoisted_91 = {
  key: 5,
  class: "bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden"
};
const _hoisted_92 = { class: "p-4 md:p-6 relative z-10" };
const _hoisted_93 = { class: "flex items-center justify-between mb-4" };
const _hoisted_94 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-mono" };
const _hoisted_95 = { class: "grid grid-cols-7 gap-1 mb-1" };
const _hoisted_96 = { class: "grid grid-cols-7 gap-1" };
const _hoisted_97 = ["onClick"];
const _hoisted_98 = { class: "space-y-0.5" };
const _hoisted_99 = {
  key: 0,
  class: "text-[8px] font-mono text-gray-400 text-center"
};
const _hoisted_100 = {
  key: 6,
  class: "bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden"
};
const _hoisted_101 = { class: "p-4 md:p-6 relative z-10" };
const _hoisted_102 = { class: "flex items-center gap-2 mb-4" };
const _hoisted_103 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_104 = { class: "space-y-2" };
const _hoisted_105 = ["onClick"];
const _hoisted_106 = { class: "text-xs font-mono font-bold text-gray-900 uppercase tracking-tight" };
const _hoisted_107 = { class: "text-[10px] font-mono text-gray-500 mt-0.5" };
const _hoisted_108 = {
  key: 0,
  class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
};
const _hoisted_109 = { class: "bg-white w-full max-w-2xl rounded-sm border border-gray-200 shadow-2xl flex flex-col max-h-[90vh]" };
const _hoisted_110 = { class: "flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0" };
const _hoisted_111 = { class: "overflow-y-auto px-6 py-5 space-y-5" };
const _hoisted_112 = { class: "space-y-3" };
const _hoisted_113 = { class: "flex items-center justify-between" };
const _hoisted_114 = { class: "text-[10px] text-[#2F2E8B] font-mono" };
const _hoisted_115 = { class: "flex items-center gap-1 bg-gray-100 rounded-sm p-1" };
const _hoisted_116 = ["onClick"];
const _hoisted_117 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_118 = ["value"];
const _hoisted_119 = ["value"];
const _hoisted_120 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_121 = { class: "border border-gray-200 rounded-sm overflow-hidden" };
const _hoisted_122 = { class: "flex items-center gap-3 px-3 py-2 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition" };
const _hoisted_123 = ["checked", ".indeterminate"];
const _hoisted_124 = { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" };
const _hoisted_125 = { class: "max-h-52 overflow-y-auto divide-y divide-gray-50" };
const _hoisted_126 = {
  key: 0,
  class: "px-3 py-5 text-xs text-gray-400 text-center"
};
const _hoisted_127 = ["checked", "onChange"];
const _hoisted_128 = { class: "min-w-0" };
const _hoisted_129 = { class: "text-xs font-semibold text-gray-800 truncate" };
const _hoisted_130 = { class: "text-[10px] text-gray-400" };
const _hoisted_131 = { class: "space-y-3" };
const _hoisted_132 = {
  key: 0,
  class: "flex flex-wrap gap-1.5"
};
const _hoisted_133 = ["onClick"];
const _hoisted_134 = {
  key: 1,
  class: "text-[10px] text-gray-400"
};
const _hoisted_135 = { class: "flex items-center gap-2" };
const _hoisted_136 = ["onKeydown"];
const _hoisted_137 = { class: "flex items-center gap-2 cursor-pointer select-none" };
const _hoisted_138 = {
  key: 2,
  class: "space-y-1.5"
};
const _hoisted_139 = { class: "flex flex-wrap gap-1.5" };
const _hoisted_140 = ["onClick"];
const _hoisted_141 = ["onClick"];
const _hoisted_142 = {
  key: 0,
  class: "text-[11px] text-green-600 font-medium"
};
const _hoisted_143 = {
  key: 1,
  class: "text-[11px] text-red-500"
};
const _hoisted_144 = { class: "flex items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 shrink-0" };
const _hoisted_145 = ["disabled"];
const _hoisted_146 = { key: 0 };
const _hoisted_147 = { key: 1 };
const _hoisted_148 = { class: "bg-white w-full max-w-md mx-4 border border-amber-200 shadow-2xl overflow-hidden" };
const _hoisted_149 = { class: "p-6" };
const _hoisted_150 = { class: "flex items-start gap-4 mb-5" };
const _hoisted_151 = { class: "w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0" };
const _hoisted_152 = { class: "flex justify-end gap-2 mt-5" };
const _hoisted_153 = ["disabled"];

const SAVED_EMAILS_KEY = 'crm_gcal_saved_emails';

const _sfc_main = {
  __name: 'CRMMeetingsPage',
  setup(__props) {

const {
  getUserEmail, activeTab, moduleLoading, meetingStats, meetingView, meetingFilter,
  showMeetingModal, filteredMeetings, openNewMeeting, openMeetingDetail, editMeeting,
  completeMeetingAction, deleteMeeting, crmFormatDate, formatTime,
  currentMonthYear, calendarDays, weekDays, previousMonth, nextMonth, openDayMeetings,
  loadMeetings, loadMeetingStats, pipelineDeals, fetchPipelineData
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'meetings';
  loadMeetings();
  loadMeetingStats();
  fetchPipelineData().catch(() => {});
});

// ── Cancel Meeting Modal ──
const showKPIs = ref(false);
const showCancelModal = ref(false);
const cancelMeetingId = ref(null);
const cancelReason = ref('');
const cancelling = ref(false);

function openCancelModal(meetingId) {
  cancelMeetingId.value = meetingId;
  cancelReason.value = '';
  showCancelModal.value = true;
}

function closeCancelModal() {
  showCancelModal.value = false;
  cancelMeetingId.value = null;
  cancelReason.value = '';
}

async function confirmCancelMeeting() {
  if (!cancelMeetingId.value) return;
  cancelling.value = true;
  try {
    const reason = cancelReason.value?.trim() || '';
    const result = await cancelMeeting(cancelMeetingId.value, reason);
    if (result.success) {
      closeCancelModal();
      await loadMeetings();
      await loadMeetingStats();
    }
  } catch (error) {
    console.error('Error cancelling meeting:', error);
  } finally {
    cancelling.value = false;
  }
}

// ── Financial KPIs ──
const { formatCurrencyCompact } = useCurrency();
function fmtMoney(val) {
  if (!val || isNaN(val)) return formatCurrencyCompact(0);
  return formatCurrencyCompact(val);
}
const kpiPipelineValue = computed(() =>
  (pipelineDeals.value || []).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiWonRevenue = computed(() =>
  (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won')).reduce((s, d) => s + (parseFloat(d.value) || 0), 0)
);
const kpiCAC = computed(() => {
  const won = (pipelineDeals.value || []).filter(d => (d.stage || '').includes('won'));
  return won.length ? kpiWonRevenue.value / won.length : 0;
});
const kpiMaintenance = computed(() =>
  (filteredMeetings.value || []).filter(m => m.status === 'cancelled' || m.status === 'no_show').length
);

// ── Google Calendar Send Modal ──
const showGCalModal = ref(false);
const sendingCalEmail = ref(false);
const calEmailSent = ref(false);
const calEmailError = ref('');
const calEmailSuccessCount = ref(0);
ref(false); // kept so existing template refs don't break

// Recipients
const gcalEmailInput = ref('');
const gcalRecipients = ref([]);
const gcalSavedEmails = ref(JSON.parse(localStorage.getItem(SAVED_EMAILS_KEY) || '[]'));
const gcalSaveEmail = ref(false);

// Meeting filter
const gcalFilterType = ref('all');   // 'all' | 'month' | 'range'
const gcalFilterMonth = ref(new Date().getMonth() + 1);
const gcalFilterYear = ref(new Date().getFullYear());
const gcalDateFrom = ref('');
const gcalDateTo = ref('');

// Selected meeting IDs (array for proper Vue reactivity)
const gcalSelectedIds = ref([]);

const gcalFilteredMeetings = computed(() => {
  const all = (filteredMeetings.value || []).filter(m => m.status !== 'cancelled');
  if (gcalFilterType.value === 'month') {
    return all.filter(m => {
      if (!m.start_datetime) return false;
      const dt = new Date(m.start_datetime);
      return dt.getMonth() + 1 === gcalFilterMonth.value && dt.getFullYear() === gcalFilterYear.value;
    });
  }
  if (gcalFilterType.value === 'range') {
    const from = gcalDateFrom.value ? new Date(gcalDateFrom.value) : null;
    const to = gcalDateTo.value ? new Date(gcalDateTo.value + 'T23:59:59') : null;
    return all.filter(m => {
      if (!m.start_datetime) return false;
      const dt = new Date(m.start_datetime);
      if (from && dt < from) return false;
      if (to && dt > to) return false;
      return true;
    });
  }
  return all;
});

const gcalAllSelected = computed(() =>
  gcalFilteredMeetings.value.length > 0 &&
  gcalFilteredMeetings.value.every(m => gcalSelectedIds.value.includes(String(m._id || m.id)))
);
const gcalSomeSelected = computed(() =>
  gcalFilteredMeetings.value.some(m => gcalSelectedIds.value.includes(String(m._id || m.id)))
);

// Auto-select all when filter changes
watch([gcalFilterType, gcalFilterMonth, gcalFilterYear, gcalDateFrom, gcalDateTo], () => {
  gcalSelectedIds.value = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
});

function openGCalModal() {
  gcalSelectedIds.value = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
  calEmailSent.value = false;
  calEmailError.value = '';
  showGCalModal.value = true;
}

function gcalToggleSelectAll() {
  const ids = gcalFilteredMeetings.value.map(m => String(m._id || m.id));
  gcalSelectedIds.value = gcalAllSelected.value ? [] : ids;
}

function gcalToggleMeeting(m) {
  const id = String(m._id || m.id);
  const idx = gcalSelectedIds.value.indexOf(id);
  if (idx >= 0) gcalSelectedIds.value.splice(idx, 1);
  else gcalSelectedIds.value.push(id);
}

function addGCalRecipient() {
  const em = gcalEmailInput.value.trim();
  if (!em || !em.includes('@')) return;
  if (!gcalRecipients.value.includes(em)) {
    gcalRecipients.value.push(em);
    if (gcalSaveEmail.value) {
      const updated = [...new Set([...gcalSavedEmails.value, em])];
      gcalSavedEmails.value = updated;
      localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(updated));
    }
  }
  gcalEmailInput.value = '';
}

function removeGCalRecipient(em) {
  gcalRecipients.value = gcalRecipients.value.filter(e => e !== em);
}

function addSavedEmail(em) {
  if (!gcalRecipients.value.includes(em)) gcalRecipients.value.push(em);
}

function removeSavedEmail(em) {
  gcalSavedEmails.value = gcalSavedEmails.value.filter(e => e !== em);
  localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(gcalSavedEmails.value));
}

async function sendCalendarByEmail() {
  if (gcalRecipients.value.length === 0) {
    calEmailError.value = 'Add at least one recipient email.';
    return;
  }
  if (gcalSelectedIds.value.length === 0) {
    calEmailError.value = 'Select at least one meeting to send.';
    return;
  }
  sendingCalEmail.value = true;
  calEmailError.value = '';
  calEmailSent.value = false;
  try {
    const tenantId = getTenantId ? getTenantId() : '';
    const userEmail = getUserEmail ? getUserEmail() : (gcalRecipients.value[0] || '');
    const params = new URLSearchParams({ tenant_id: tenantId, email: userEmail });
    const res = await fetch(`${BASE_URL}/crm/meetings/send-ical?${params}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: gcalRecipients.value,
        meeting_ids: gcalSelectedIds.value,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || `Server error ${res.status}`);
    }
    const data = await res.json();
    calEmailSuccessCount.value = data.meeting_count || gcalSelectedIds.value.length;
    calEmailSent.value = true;
    setTimeout(() => { calEmailSent.value = false; }, 6000);
  } catch (err) {
    calEmailError.value = err.message || 'Failed to send. Please try again.';
  } finally {
    sendingCalEmail.value = false;
  }
}

// Legacy helpers (kept for addMeetingToGoogleCalendar below)
ref('');
computed(() => {
  const tenantId = getTenantId ? getTenantId() : '';
  return `${BASE_URL}/crm/meetings/ical-feed?tenant_id=${encodeURIComponent(tenantId)}`;
});

/**
 * Build a Google Calendar event URL for a single meeting and open it.
 * Uses the "Add to Calendar" URL format — no OAuth required.
 */
function addMeetingToGoogleCalendar(meeting) {
  const start = toGCalDate(meeting.start_datetime);
  const end = toGCalDate(meeting.end_datetime || meeting.start_datetime);
  const title = encodeURIComponent(meeting.title || 'Meeting');
  const details = encodeURIComponent([
    meeting.description || '',
    meeting.virtual_meeting_url ? `Join: ${meeting.virtual_meeting_url}` : '',
    meeting.location || ''
  ].filter(Boolean).join('\n'));
  const location = encodeURIComponent(meeting.location || '');
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function toGCalDate(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// ── Excel Export/Edit ──
const excelImportRef = ref(null);

async function openExcelEditor() {
  try {
    const tenantId = getTenantId ? getTenantId() : '';
    if (!tenantId) { alert('Could not determine tenant.'); return; }
    const result = await getMeetings({ tenant_id: tenantId, limit: 10000 });
    const data = result?.data || result?.items || (Array.isArray(result) ? result : []);
    if (!data || !data.length) { alert('No meetings to export.'); return; }
    const { XLSXCompat: XLSX } = await __vitePreload(async () => { const { XLSXCompat: XLSX } = await import('./CRMModule-Dh_JOtqO.js').then(n => n.a9);return { XLSXCompat: XLSX }},true              ?[]:void 0);
    const rows = data.map(m => ({
      ID: m.id || m._id || '',
      Title: m.title || '',
      Type: m.meeting_type || '',
      Status: m.status || '',
      Location: m.location || '',
      Start_DateTime: m.start_datetime || '',
      End_DateTime: m.end_datetime || '',
      Description: m.description || ''
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Meetings');
    const wbout = await XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `meetings_edit_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click(); URL.revokeObjectURL(url);
    setTimeout(() => { excelImportRef.value?.click(); }, 500);
  } catch (err) { console.error('[CRMMeetingsPage] Excel export failed:', err); }
}

async function onExcelImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const { XLSXCompat: XLSX } = await __vitePreload(async () => { const { XLSXCompat: XLSX } = await import('./CRMModule-Dh_JOtqO.js').then(n => n.a9);return { XLSXCompat: XLSX }},true              ?[]:void 0);
    const data = await file.arrayBuffer();
    const wb = await XLSX.read(data, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);
    if (!rows.length) { alert('No data found.'); return; }
    let updated = 0;
    for (const row of rows) {
      const id = String(row.ID || '').trim();
      if (!id) continue;
      const payload = {};
      if (row.Title !== undefined) payload.title = String(row.Title).trim();
      if (row.Type !== undefined) payload.meeting_type = String(row.Type).trim();
      if (row.Status !== undefined) payload.status = String(row.Status).trim();
      if (row.Location !== undefined) payload.location = String(row.Location).trim();
      if (row.Description !== undefined) payload.description = String(row.Description).trim();
      try {
        await updateMeeting(id, payload);
        updated++;
      } catch (e) { console.warn(`[CRMMeetingsPage] Failed to update meeting ${id}:`, e); }
    }
    alert(`Excel import complete! ${updated} of ${rows.length} meetings updated.`);
    await loadMeetings();
    await loadMeetingStats();
  } catch (err) {
    console.error('[CRMMeetingsPage] Excel import failed:', err);
    alert('Failed to import Excel file.');
  } finally { event.target.value = ''; }
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[77] || (_cache[77] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$3), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[18] || (_cache[18] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
          _cache[19] || (_cache[19] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "CRM // Calendar"),
            createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Calendar")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("span", _hoisted_6, [
            createVNode(unref(CircleUser), { size: 14 }),
            createTextVNode(" " + toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_7, [
      withDirectives(createBaseVNode("div", _hoisted_8, [
        (unref(moduleLoading))
          ? (openBlock(), createElementBlock("div", _hoisted_9, [
              _cache[20] || (_cache[20] = createStaticVNode("<div class=\"flex items-center justify-between border-b border-gray-100 pb-4\" data-v-fafb7d77><div class=\"h-5 w-44 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"flex gap-2\" data-v-fafb7d77><div class=\"h-8 w-36 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"h-8 w-36 bg-gray-200 rounded-sm\" data-v-fafb7d77></div></div></div>", 1)),
              createBaseVNode("div", _hoisted_10, [
                (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                  return createBaseVNode("div", {
                    key: i,
                    class: "h-28 bg-gray-100 border border-gray-200 rounded-sm"
                  })
                }), 64))
              ]),
              createBaseVNode("div", _hoisted_11, [
                (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                  return createBaseVNode("div", {
                    key: i,
                    class: "h-28 bg-gray-100 border border-gray-200 rounded-sm"
                  })
                }), 64))
              ]),
              _cache[21] || (_cache[21] = createStaticVNode("<div class=\"flex items-center gap-2 border-b border-gray-100 pb-3\" data-v-fafb7d77><div class=\"h-8 w-24 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"w-px h-5 bg-gray-200\" data-v-fafb7d77></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\" data-v-fafb7d77></div><div class=\"h-8 w-28 bg-gray-200 rounded-sm\" data-v-fafb7d77></div></div>", 1)),
              createBaseVNode("div", _hoisted_12, [
                (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                  return createBaseVNode("div", {
                    key: i,
                    class: "h-44 bg-gray-100 border border-gray-200 rounded-sm"
                  })
                }), 64))
              ])
            ]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("div", _hoisted_14, [
            _cache[23] || (_cache[23] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
            createBaseVNode("h3", _hoisted_15, [
              createVNode(unref(Calendar), {
                size: 14,
                class: "text-gray-400"
              }),
              _cache[22] || (_cache[22] = createTextVNode(" Calendar_Overview ", -1))
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = $event => (showKPIs.value = !showKPIs.value)),
              class: "ml-2 p-1 border border-gray-200 rounded-sm text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition",
              title: showKPIs.value ? 'Hide KPIs' : 'Show KPIs'
            }, [
              (showKPIs.value)
                ? (openBlock(), createBlock(unref(Eye), {
                    key: 0,
                    size: 12
                  }))
                : (openBlock(), createBlock(unref(EyeOff), {
                    key: 1,
                    size: 12
                  }))
            ], 8, _hoisted_16)
          ]),
          (!unref(showMeetingModal))
            ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: _cache[1] || (_cache[1] = (...args) => (unref(openNewMeeting) && unref(openNewMeeting)(...args))),
                class: "px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2"
              }, [
                createVNode(unref(Plus), { size: 14 }),
                _cache[24] || (_cache[24] = createTextVNode(" Schedule_Meeting ", -1))
              ]))
            : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: openGCalModal,
            class: "px-4 py-2 rounded-sm bg-white border border-gray-200 text-gray-700 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition flex items-center gap-2"
          }, [
            createVNode(unref(ExternalLink), { size: 14 }),
            _cache[25] || (_cache[25] = createTextVNode(" Sync_Google_Cal ", -1))
          ]),
          createBaseVNode("button", {
            onClick: openExcelEditor,
            class: "px-4 py-2 rounded-sm bg-white border border-gray-200 text-gray-700 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition flex items-center gap-2"
          }, [
            createVNode(unref(FileSpreadsheet), { size: 14 }),
            _cache[26] || (_cache[26] = createTextVNode(" Excel Edit ", -1))
          ]),
          createBaseVNode("input", {
            ref_key: "excelImportRef",
            ref: excelImportRef,
            type: "file",
            accept: ".xlsx,.xls",
            class: "hidden",
            onChange: onExcelImport
          }, null, 544)
        ]),
        (showKPIs.value)
          ? (openBlock(), createElementBlock("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                _cache[29] || (_cache[29] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("div", _hoisted_21, [
                      createVNode(unref(Clock), {
                        size: 18,
                        class: "text-blue-500 group-hover:text-blue-600 transition-colors"
                      })
                    ]),
                    _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-[9px] text-blue-600 font-mono font-bold uppercase" }, "Count", -1))
                  ]),
                  _cache[28] || (_cache[28] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Scheduled", -1)),
                  createBaseVNode("p", _hoisted_22, toDisplayString(unref(meetingStats).scheduled || 0), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_23, [
                _cache[32] || (_cache[32] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("div", _hoisted_25, [
                    createBaseVNode("div", _hoisted_26, [
                      createVNode(unref(CalendarDays), {
                        size: 18,
                        class: "text-green-500 group-hover:text-green-600 transition-colors"
                      })
                    ]),
                    _cache[30] || (_cache[30] = createBaseVNode("span", { class: "text-[9px] text-green-600 font-mono font-bold uppercase" }, "Today", -1))
                  ]),
                  _cache[31] || (_cache[31] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Today", -1)),
                  createBaseVNode("p", _hoisted_27, toDisplayString(unref(meetingStats).today || 0), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_28, [
                _cache[35] || (_cache[35] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("div", _hoisted_31, [
                      createVNode(unref(CircleCheck), {
                        size: 18,
                        class: "text-emerald-500 group-hover:text-emerald-600 transition-colors"
                      })
                    ]),
                    _cache[33] || (_cache[33] = createBaseVNode("span", { class: "text-[9px] text-emerald-600 font-mono font-bold uppercase" }, "Week", -1))
                  ]),
                  _cache[34] || (_cache[34] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Completed_Week", -1)),
                  createBaseVNode("p", _hoisted_32, toDisplayString(unref(meetingStats).completedThisWeek || 0), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_33, [
                _cache[38] || (_cache[38] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_34, [
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("div", _hoisted_36, [
                      createVNode(unref(CalendarCheck), {
                        size: 18,
                        class: "text-orange-500 group-hover:text-orange-600 transition-colors"
                      })
                    ]),
                    _cache[36] || (_cache[36] = createBaseVNode("span", { class: "text-[9px] text-orange-600 font-mono font-bold uppercase" }, "Total", -1))
                  ]),
                  _cache[37] || (_cache[37] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Total", -1)),
                  createBaseVNode("p", _hoisted_37, toDisplayString(unref(meetingStats).totalMeetings || 0), 1)
                ])
              ])
            ]))
          : createCommentVNode("", true),
        (showKPIs.value)
          ? (openBlock(), createElementBlock("div", _hoisted_38, [
              createBaseVNode("div", _hoisted_39, [
                _cache[41] || (_cache[41] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("div", _hoisted_41, [
                    createBaseVNode("div", _hoisted_42, [
                      createVNode(unref(TrendingUp), {
                        size: 18,
                        class: "text-blue-500 group-hover:text-blue-600 transition-colors"
                      })
                    ]),
                    _cache[39] || (_cache[39] = createBaseVNode("span", { class: "text-[9px] text-blue-600 font-mono font-bold uppercase" }, "Pipeline", -1))
                  ]),
                  _cache[40] || (_cache[40] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Deal_Values", -1)),
                  createBaseVNode("p", _hoisted_43, toDisplayString(fmtMoney(kpiPipelineValue.value)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_44, [
                _cache[44] || (_cache[44] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_45, [
                  createBaseVNode("div", _hoisted_46, [
                    createBaseVNode("div", _hoisted_47, [
                      createVNode(unref(DollarSign), {
                        size: 18,
                        class: "text-green-500 group-hover:text-green-600 transition-colors"
                      })
                    ]),
                    _cache[42] || (_cache[42] = createBaseVNode("span", { class: "text-[9px] text-green-600 font-mono font-bold uppercase" }, "Won", -1))
                  ]),
                  _cache[43] || (_cache[43] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Won_Revenue", -1)),
                  createBaseVNode("p", _hoisted_48, toDisplayString(fmtMoney(kpiWonRevenue.value)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_49, [
                _cache[47] || (_cache[47] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_50, [
                  createBaseVNode("div", _hoisted_51, [
                    createBaseVNode("div", _hoisted_52, [
                      createVNode(unref(Target), {
                        size: 18,
                        class: "text-purple-500 group-hover:text-purple-600 transition-colors"
                      })
                    ]),
                    _cache[45] || (_cache[45] = createBaseVNode("span", { class: "text-[9px] text-purple-600 font-mono font-bold uppercase" }, "Avg", -1))
                  ]),
                  _cache[46] || (_cache[46] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "CAC", -1)),
                  createBaseVNode("p", _hoisted_53, toDisplayString(fmtMoney(kpiCAC.value)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_54, [
                _cache[50] || (_cache[50] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-10" }, null, -1)),
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("div", _hoisted_56, [
                    createBaseVNode("div", _hoisted_57, [
                      createVNode(unref(TriangleAlert), {
                        size: 18,
                        class: "text-white"
                      })
                    ]),
                    _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-[9px] text-red-200 font-mono font-bold uppercase" }, "No-Shows", -1))
                  ]),
                  _cache[49] || (_cache[49] = createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-blue-200 uppercase tracking-widest mb-1" }, "Maintenance", -1)),
                  createBaseVNode("p", _hoisted_58, toDisplayString(kpiMaintenance.value), 1)
                ])
              ])
            ]))
          : createCommentVNode("", true),
        (showKPIs.value)
          ? (openBlock(), createElementBlock("div", _hoisted_59, [
              createBaseVNode("div", _hoisted_60, [
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = $event => (meetingView.value = 'list')),
                  class: normalizeClass([unref(meetingView) === 'list' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]', "px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5"])
                }, [
                  createVNode(unref(List), { size: 11 }),
                  _cache[51] || (_cache[51] = createTextVNode(" List_View ", -1))
                ], 2),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = $event => (meetingView.value = 'calendar')),
                  class: normalizeClass([unref(meetingView) === 'calendar' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]', "px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5"])
                }, [
                  createVNode(unref(Calendar), { size: 11 }),
                  _cache[52] || (_cache[52] = createTextVNode(" Calendar_View ", -1))
                ], 2)
              ]),
              _cache[53] || (_cache[53] = createBaseVNode("div", { class: "w-px h-5 bg-gray-200" }, null, -1)),
              createBaseVNode("div", _hoisted_61, [
                (openBlock(), createElementBlock(Fragment, null, renderList(['all', 'scheduled', 'completed', 'cancelled'], (f) => {
                  return createBaseVNode("button", {
                    key: f,
                    onClick: $event => (meetingFilter.value = f),
                    class: normalizeClass([unref(meetingFilter) === f ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]', "px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition"])
                  }, toDisplayString(f === 'all' ? 'All_Meetings' : f.charAt(0).toUpperCase() + f.slice(1) + '_Only'), 11, _hoisted_62)
                }), 64))
              ])
            ]))
          : createCommentVNode("", true),
        (unref(meetingView) === 'list')
          ? (openBlock(), createElementBlock("div", _hoisted_63, [
              (unref(filteredMeetings).length === 0)
                ? (openBlock(), createElementBlock("div", _hoisted_64, [
                    _cache[57] || (_cache[57] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                    createBaseVNode("div", _hoisted_65, [
                      createBaseVNode("div", _hoisted_66, [
                        createVNode(unref(CalendarX), {
                          size: 32,
                          class: "text-gray-200"
                        })
                      ]),
                      _cache[55] || (_cache[55] = createBaseVNode("h4", { class: "text-[12px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "No_Meetings_Found", -1)),
                      _cache[56] || (_cache[56] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-300 mt-2 uppercase tracking-widest max-w-xs leading-relaxed" }, "Adjust filters or schedule a new meeting to populate this log.", -1)),
                      createBaseVNode("button", {
                        onClick: _cache[4] || (_cache[4] = (...args) => (unref(openNewMeeting) && unref(openNewMeeting)(...args))),
                        class: "mt-6 px-4 py-2 border border-gray-200 text-[10px] font-mono font-bold uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all rounded-sm flex items-center gap-2"
                      }, [
                        createVNode(unref(Plus), { size: 10 }),
                        _cache[54] || (_cache[54] = createTextVNode(" Schedule_First_Meeting ", -1))
                      ])
                    ])
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_67, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredMeetings), (meeting) => {
                      return (openBlock(), createElementBlock("div", {
                        key: meeting.id,
                        class: normalizeClass(["bg-white border rounded-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col group", {
                'border-l-[3px] border-l-blue-500 border-gray-200': meeting.status === 'scheduled',
                'border-l-[3px] border-l-green-500 border-gray-200': meeting.status === 'completed',
                'border-l-[3px] border-l-red-500 border-gray-200': meeting.status === 'cancelled',
              }]),
                        onClick: $event => (unref(openMeetingDetail)(meeting))
                      }, [
                        _cache[61] || (_cache[61] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none" }, null, -1)),
                        createBaseVNode("div", _hoisted_69, [
                          createBaseVNode("div", _hoisted_70, [
                            createBaseVNode("div", _hoisted_71, [
                              _cache[58] || (_cache[58] = createBaseVNode("div", { class: "text-[7px] font-mono font-black text-gray-300 uppercase tracking-[0.15em] mb-0.5" }, "Meeting_Log", -1)),
                              createBaseVNode("h4", _hoisted_72, toDisplayString(meeting.title || 'UNTITLED_MEETING'), 1)
                            ]),
                            createBaseVNode("span", {
                              class: normalizeClass(["px-1 py-0.5 rounded-sm text-[7px] font-mono font-black uppercase tracking-widest border shrink-0", {
                      'bg-blue-50 text-blue-700 border-blue-200': meeting.status === 'scheduled',
                      'bg-green-50 text-green-700 border-green-200': meeting.status === 'completed',
                      'bg-red-50 text-red-700 border-red-200': meeting.status === 'cancelled',
                    }])
                            }, toDisplayString(meeting.status), 3)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_73, [
                          createBaseVNode("div", _hoisted_74, [
                            _cache[59] || (_cache[59] = createBaseVNode("span", { class: "text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Date", -1)),
                            createBaseVNode("span", _hoisted_75, toDisplayString(unref(crmFormatDate)(meeting.start_datetime)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_76, [
                            createBaseVNode("div", _hoisted_77, [
                              createVNode(unref(Clock), {
                                size: 8,
                                class: "text-gray-300"
                              }),
                              createBaseVNode("span", null, toDisplayString(unref(formatTime)(meeting.start_datetime)) + " — " + toDisplayString(unref(formatTime)(meeting.end_datetime)), 1)
                            ]),
                            (meeting.location)
                              ? (openBlock(), createElementBlock("div", _hoisted_78, [
                                  createVNode(unref(MapPin), {
                                    size: 8,
                                    class: "text-gray-300"
                                  }),
                                  createBaseVNode("span", _hoisted_79, toDisplayString(meeting.location), 1)
                                ]))
                              : createCommentVNode("", true),
                            (meeting.meeting_link)
                              ? (openBlock(), createElementBlock("div", _hoisted_80, [
                                  createVNode(unref(ExternalLink), {
                                    size: 8,
                                    class: "text-gray-300"
                                  }),
                                  createBaseVNode("a", {
                                    href: meeting.meeting_link,
                                    target: "_blank",
                                    onClick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
                                    class: "truncate text-[#2F2E8B] hover:underline normal-case text-[8px]"
                                  }, "Join_Link", 8, _hoisted_81)
                                ]))
                              : createCommentVNode("", true),
                            (meeting.description)
                              ? (openBlock(), createElementBlock("div", _hoisted_82, toDisplayString(meeting.description), 1))
                              : createCommentVNode("", true)
                          ])
                        ]),
                        createBaseVNode("div", {
                          class: "px-2 py-1.5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-1",
                          onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
                        }, [
                          createBaseVNode("div", _hoisted_83, [
                            (meeting.status === 'scheduled')
                              ? (openBlock(), createElementBlock("button", {
                                  key: 0,
                                  onClick: withModifiers($event => (unref(completeMeetingAction)(meeting.id)), ["stop"]),
                                  class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-green-500 hover:border-green-500 rounded-sm transition-all",
                                  title: "Mark Complete"
                                }, [
                                  createVNode(unref(Check), { size: 10 })
                                ], 8, _hoisted_84))
                              : createCommentVNode("", true),
                            (meeting.status === 'scheduled')
                              ? (openBlock(), createElementBlock("button", {
                                  key: 1,
                                  onClick: withModifiers($event => (openCancelModal(meeting.id)), ["stop"]),
                                  class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-500 rounded-sm transition-all",
                                  title: "Cancel"
                                }, [
                                  createVNode(unref(X), { size: 10 })
                                ], 8, _hoisted_85))
                              : createCommentVNode("", true),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (addMeetingToGoogleCalendar(meeting)), ["stop"]),
                              class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 rounded-sm transition-all",
                              title: "Add to Google Calendar"
                            }, [
                              createVNode(unref(ExternalLink), { size: 10 })
                            ], 8, _hoisted_86),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (unref(deleteMeeting)(meeting.id)), ["stop"]),
                              class: "w-6 h-6 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-sm transition-all",
                              title: "Delete"
                            }, [
                              createVNode(unref(Trash2), { size: 10 })
                            ], 8, _hoisted_87)
                          ]),
                          createBaseVNode("div", _hoisted_88, [
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (unref(editMeeting)(meeting)), ["stop"]),
                              class: "px-1.5 py-0.5 bg-white border border-gray-200 text-gray-600 text-[7px] font-mono font-black uppercase tracking-widest rounded-sm hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all flex items-center gap-0.5"
                            }, [
                              createVNode(unref(Pencil), { size: 8 }),
                              _cache[60] || (_cache[60] = createTextVNode(" Edit ", -1))
                            ], 8, _hoisted_89),
                            createBaseVNode("button", {
                              onClick: withModifiers($event => (unref(openMeetingDetail)(meeting)), ["stop"]),
                              class: "px-1.5 py-0.5 bg-[#2F2E8B] text-white text-[7px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition-all"
                            }, " Review ", 8, _hoisted_90)
                          ])
                        ])
                      ], 10, _hoisted_68))
                    }), 128))
                  ]))
            ]))
          : createCommentVNode("", true),
        (unref(meetingView) === 'calendar')
          ? (openBlock(), createElementBlock("div", _hoisted_91, [
              _cache[64] || (_cache[64] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_92, [
                createBaseVNode("div", _hoisted_93, [
                  createBaseVNode("button", {
                    onClick: _cache[7] || (_cache[7] = (...args) => (unref(previousMonth) && unref(previousMonth)(...args))),
                    class: "px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1"
                  }, [
                    createVNode(unref(ChevronLeft), { size: 12 }),
                    _cache[62] || (_cache[62] = createTextVNode(" PREV ", -1))
                  ]),
                  createBaseVNode("h3", _hoisted_94, toDisplayString(unref(currentMonthYear)), 1),
                  createBaseVNode("button", {
                    onClick: _cache[8] || (_cache[8] = (...args) => (unref(nextMonth) && unref(nextMonth)(...args))),
                    class: "px-3 py-1.5 border border-gray-200 rounded-sm hover:bg-gray-50 transition text-[10px] font-mono font-bold flex items-center gap-1"
                  }, [
                    _cache[63] || (_cache[63] = createTextVNode(" NEXT ", -1)),
                    createVNode(unref(ChevronRight), { size: 12 })
                  ])
                ]),
                createBaseVNode("div", _hoisted_95, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(weekDays), (day) => {
                    return (openBlock(), createElementBlock("div", {
                      key: day,
                      class: "text-center text-[9px] font-mono font-black text-gray-400 py-2 uppercase tracking-widest"
                    }, toDisplayString(day), 1))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_96, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(calendarDays), (day, index) => {
                    return (openBlock(), createElementBlock("div", {
                      key: index,
                      class: normalizeClass([{
                  'bg-gray-50/50': !day.isCurrentMonth,
                  'border-2 border-[#2F2E8B] bg-blue-50/30': day.isToday,
                  'hover:bg-gray-50 cursor-pointer': day.meetings && day.meetings.length > 0,
                }, "min-h-[80px] border border-gray-100 rounded-sm p-1.5 transition"]),
                      onClick: $event => (day.meetings && day.meetings.length > 0 && unref(openDayMeetings)(day))
                    }, [
                      createBaseVNode("div", {
                        class: normalizeClass(["text-[9px] font-mono font-bold mb-1", day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'])
                      }, toDisplayString(day.date), 3),
                      createBaseVNode("div", _hoisted_98, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((day.meetings || []).slice(0, 2), (meeting) => {
                          return (openBlock(), createElementBlock("div", {
                            key: meeting.id,
                            class: normalizeClass([{
                      'bg-blue-500': meeting.status === 'scheduled',
                      'bg-green-500': meeting.status === 'completed',
                      'bg-red-500': meeting.status === 'cancelled'
                    }, "text-white text-[8px] font-mono rounded-sm px-1 py-0.5 truncate"])
                          }, toDisplayString(unref(formatTime)(meeting.start_datetime)) + " " + toDisplayString(meeting.title), 3))
                        }), 128)),
                        ((day.meetings || []).length > 2)
                          ? (openBlock(), createElementBlock("div", _hoisted_99, "+" + toDisplayString(day.meetings.length - 2) + " more", 1))
                          : createCommentVNode("", true)
                      ])
                    ], 10, _hoisted_97))
                  }), 128))
                ])
              ])
            ]))
          : createCommentVNode("", true),
        (unref(meetingStats).upcoming && unref(meetingStats).upcoming.length > 0)
          ? (openBlock(), createElementBlock("div", _hoisted_100, [
              _cache[67] || (_cache[67] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_101, [
                createBaseVNode("div", _hoisted_102, [
                  _cache[66] || (_cache[66] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
                  createBaseVNode("h4", _hoisted_103, [
                    createVNode(unref(CalendarDays), {
                      size: 14,
                      class: "text-gray-400"
                    }),
                    _cache[65] || (_cache[65] = createTextVNode(" Upcoming_Meetings ", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_104, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(meetingStats).upcoming, (meeting) => {
                    return (openBlock(), createElementBlock("div", {
                      key: meeting.id,
                      class: "border border-gray-100 rounded-sm p-3 flex items-center justify-between hover:border-[#2F2E8B]/40 hover:bg-gray-50/50 transition cursor-pointer",
                      onClick: $event => (unref(openMeetingDetail)(meeting))
                    }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h5", _hoisted_106, toDisplayString(meeting.title), 1),
                        createBaseVNode("p", _hoisted_107, toDisplayString(unref(crmFormatDate)(meeting.start_datetime)) + " // " + toDisplayString(unref(formatTime)(meeting.start_datetime)), 1)
                      ]),
                      createVNode(unref(ChevronRight), {
                        size: 14,
                        class: "text-gray-300"
                      })
                    ], 8, _hoisted_105))
                  }), 128))
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ], 512), [
        [vShow, !unref(moduleLoading)]
      ])
    ]),
    (unref(showMeetingModal))
      ? (openBlock(), createBlock(CRMMeetingModal, { key: 0 }))
      : createCommentVNode("", true),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showGCalModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_108, [
            createBaseVNode("div", _hoisted_109, [
              createBaseVNode("div", _hoisted_110, [
                _cache[68] || (_cache[68] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
                  createBaseVNode("div", { class: "w-1 h-5 bg-[#2F2E8B]" }),
                  createBaseVNode("div", null, [
                    createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Google Calendar"),
                    createBaseVNode("h2", { class: "text-sm font-black text-gray-900 uppercase tracking-tight" }, "Send_Meetings")
                  ])
                ], -1)),
                createBaseVNode("button", {
                  onClick: _cache[9] || (_cache[9] = $event => (showGCalModal.value = false)),
                  class: "text-gray-400 hover:text-gray-700 transition p-1"
                }, [
                  createVNode(unref(X), { size: 18 })
                ])
              ]),
              createBaseVNode("div", _hoisted_111, [
                createBaseVNode("div", _hoisted_112, [
                  createBaseVNode("div", _hoisted_113, [
                    _cache[69] || (_cache[69] = createBaseVNode("span", { class: "text-xs font-bold text-gray-700 uppercase tracking-wider" }, "Select Meetings", -1)),
                    createBaseVNode("span", _hoisted_114, toDisplayString(gcalSelectedIds.value.length) + " selected", 1)
                  ]),
                  createBaseVNode("div", _hoisted_115, [
                    (openBlock(), createElementBlock(Fragment, null, renderList([['all','All'],['month','By Month'],['range','Date Range']], ([key, label]) => {
                      return createBaseVNode("button", {
                        key: key,
                        onClick: $event => (gcalFilterType.value = key),
                        class: normalizeClass(['flex-1 py-1 text-[10px] font-mono font-bold uppercase rounded-sm transition',
                  gcalFilterType.value === key ? 'bg-white text-[#2F2E8B] shadow-none' : 'text-gray-500 hover:text-gray-700'])
                      }, toDisplayString(label), 11, _hoisted_116)
                    }), 64))
                  ]),
                  (gcalFilterType.value === 'month')
                    ? (openBlock(), createElementBlock("div", _hoisted_117, [
                        withDirectives(createBaseVNode("select", {
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((gcalFilterMonth).value = $event)),
                          class: "flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none"
                        }, [
                          (openBlock(), createElementBlock(Fragment, null, renderList(['January','February','March','April','May','June','July','August','September','October','November','December'], (name, idx) => {
                            return createBaseVNode("option", {
                              key: idx,
                              value: idx + 1
                            }, toDisplayString(name), 9, _hoisted_118)
                          }), 64))
                        ], 512), [
                          [
                            vModelSelect,
                            gcalFilterMonth.value,
                            void 0,
                            { number: true }
                          ]
                        ]),
                        withDirectives(createBaseVNode("select", {
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((gcalFilterYear).value = $event)),
                          class: "w-28 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none"
                        }, [
                          (openBlock(), createElementBlock(Fragment, null, renderList([2024,2025,2026,2027,2028], (y) => {
                            return createBaseVNode("option", {
                              key: y,
                              value: y
                            }, toDisplayString(y), 9, _hoisted_119)
                          }), 64))
                        ], 512), [
                          [
                            vModelSelect,
                            gcalFilterYear.value,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]))
                    : createCommentVNode("", true),
                  (gcalFilterType.value === 'range')
                    ? (openBlock(), createElementBlock("div", _hoisted_120, [
                        withDirectives(createBaseVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((gcalDateFrom).value = $event)),
                          class: "flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none"
                        }, null, 512), [
                          [vModelText, gcalDateFrom.value]
                        ]),
                        _cache[70] || (_cache[70] = createBaseVNode("span", { class: "text-gray-400 text-xs shrink-0" }, "to", -1)),
                        withDirectives(createBaseVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((gcalDateTo).value = $event)),
                          class: "flex-1 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:border-[#2F2E8B] focus:outline-none"
                        }, null, 512), [
                          [vModelText, gcalDateTo.value]
                        ])
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_121, [
                    createBaseVNode("label", _hoisted_122, [
                      createBaseVNode("input", {
                        type: "checkbox",
                        checked: gcalAllSelected.value,
                        ".indeterminate": gcalSomeSelected.value && !gcalAllSelected.value,
                        onChange: gcalToggleSelectAll,
                        class: "rounded-sm accent-[#2F2E8B]"
                      }, null, 40, _hoisted_123),
                      createBaseVNode("span", _hoisted_124, "Select All (" + toDisplayString(gcalFilteredMeetings.value.length) + ")", 1)
                    ]),
                    createBaseVNode("div", _hoisted_125, [
                      (gcalFilteredMeetings.value.length === 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_126, " No meetings for this filter. "))
                        : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(gcalFilteredMeetings.value, (m) => {
                        return (openBlock(), createElementBlock("label", {
                          key: m._id || m.id,
                          class: "flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition"
                        }, [
                          createBaseVNode("input", {
                            type: "checkbox",
                            checked: gcalSelectedIds.value.includes(String(m._id || m.id)),
                            onChange: $event => (gcalToggleMeeting(m)),
                            class: "rounded-sm accent-[#2F2E8B] shrink-0"
                          }, null, 40, _hoisted_127),
                          createBaseVNode("div", _hoisted_128, [
                            createBaseVNode("p", _hoisted_129, toDisplayString(m.title || 'Untitled Meeting'), 1),
                            createBaseVNode("p", _hoisted_130, toDisplayString(unref(crmFormatDate)(m.start_datetime)), 1)
                          ])
                        ]))
                      }), 128))
                    ])
                  ])
                ]),
                _cache[74] || (_cache[74] = createBaseVNode("div", { class: "border-t border-gray-100" }, null, -1)),
                createBaseVNode("div", _hoisted_131, [
                  _cache[73] || (_cache[73] = createBaseVNode("span", { class: "text-xs font-bold text-gray-700 uppercase tracking-wider" }, "Recipients", -1)),
                  (gcalRecipients.value.length > 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_132, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(gcalRecipients.value, (em) => {
                          return (openBlock(), createElementBlock("span", {
                            key: em,
                            class: "inline-flex items-center gap-1.5 bg-[#2F2E8B]/10 text-[#2F2E8B] text-[11px] font-medium px-2.5 py-1 rounded-full"
                          }, [
                            createTextVNode(toDisplayString(em) + " ", 1),
                            createBaseVNode("button", {
                              onClick: $event => (removeGCalRecipient(em)),
                              class: "hover:text-red-500 transition leading-none"
                            }, [
                              createVNode(unref(X), { size: 10 })
                            ], 8, _hoisted_133)
                          ]))
                        }), 128))
                      ]))
                    : (openBlock(), createElementBlock("p", _hoisted_134, "No recipients added yet.")),
                  createBaseVNode("div", _hoisted_135, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((gcalEmailInput).value = $event)),
                      type: "email",
                      placeholder: "Add email address…",
                      onKeydown: withKeys(withModifiers(addGCalRecipient, ["prevent"]), ["enter"]),
                      class: "flex-1 border border-gray-200 focus:border-[#2F2E8B] focus:ring-4 focus:ring-[#2F2E8B]/10 rounded-sm px-3 py-2 text-sm"
                    }, null, 40, _hoisted_136), [
                      [vModelText, gcalEmailInput.value]
                    ]),
                    createBaseVNode("button", {
                      onClick: addGCalRecipient,
                      class: "shrink-0 px-3 py-2 border border-[#2F2E8B] text-[#2F2E8B] text-[10px] font-mono font-bold uppercase rounded-sm hover:bg-[#2F2E8B] hover:text-white transition"
                    }, " Add ")
                  ]),
                  createBaseVNode("label", _hoisted_137, [
                    withDirectives(createBaseVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((gcalSaveEmail).value = $event)),
                      class: "rounded-sm accent-[#2F2E8B]"
                    }, null, 512), [
                      [vModelCheckbox, gcalSaveEmail.value]
                    ]),
                    _cache[71] || (_cache[71] = createBaseVNode("span", { class: "text-[10px] text-gray-500" }, "Save added emails for next time", -1))
                  ]),
                  (gcalSavedEmails.value.length > 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_138, [
                        _cache[72] || (_cache[72] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider" }, "Saved Emails", -1)),
                        createBaseVNode("div", _hoisted_139, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(gcalSavedEmails.value, (em) => {
                            return (openBlock(), createElementBlock("span", {
                              key: em,
                              class: "group inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full"
                            }, [
                              createBaseVNode("button", {
                                onClick: $event => (addSavedEmail(em)),
                                class: "hover:text-[#2F2E8B] transition font-medium"
                              }, toDisplayString(em), 9, _hoisted_140),
                              createBaseVNode("button", {
                                onClick: $event => (removeSavedEmail(em)),
                                class: "text-gray-300 hover:text-red-400 transition opacity-0 group-hover:opacity-100 leading-none"
                              }, [
                                createVNode(unref(X), { size: 10 })
                              ], 8, _hoisted_141)
                            ]))
                          }), 128))
                        ])
                      ]))
                    : createCommentVNode("", true)
                ]),
                (calEmailSent.value)
                  ? (openBlock(), createElementBlock("p", _hoisted_142, " ✓ Sent " + toDisplayString(calEmailSuccessCount.value) + " meeting" + toDisplayString(calEmailSuccessCount.value !== 1 ? 's' : '') + " to " + toDisplayString(gcalRecipients.value.length) + " recipient" + toDisplayString(gcalRecipients.value.length !== 1 ? 's' : '') + "! ", 1))
                  : createCommentVNode("", true),
                (calEmailError.value)
                  ? (openBlock(), createElementBlock("p", _hoisted_143, toDisplayString(calEmailError.value), 1))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_144, [
                createBaseVNode("button", {
                  onClick: _cache[16] || (_cache[16] = $event => (showGCalModal.value = false)),
                  class: "text-[10px] font-mono font-bold uppercase text-gray-500 hover:text-gray-700 transition"
                }, " Cancel "),
                createBaseVNode("button", {
                  onClick: sendCalendarByEmail,
                  disabled: sendingCalEmail.value || gcalRecipients.value.length === 0 || gcalSelectedIds.value.length === 0,
                  class: "px-5 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm hover:bg-[#3D2F88] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  (sendingCalEmail.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_146, "Sending…"))
                    : (openBlock(), createElementBlock("span", _hoisted_147, "Send " + toDisplayString(gcalSelectedIds.value.length) + " Meeting" + toDisplayString(gcalSelectedIds.value.length !== 1 ? 's' : '') + " → " + toDisplayString(gcalRecipients.value.length) + " Recipient" + toDisplayString(gcalRecipients.value.length !== 1 ? 's' : ''), 1))
                ], 8, _hoisted_145)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showCancelModal.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm",
            onClick: withModifiers(closeCancelModal, ["self"])
          }, [
            createBaseVNode("div", _hoisted_148, [
              _cache[76] || (_cache[76] = createBaseVNode("div", { class: "h-1.5 w-full bg-amber-500" }, null, -1)),
              createBaseVNode("div", _hoisted_149, [
                createBaseVNode("div", _hoisted_150, [
                  createBaseVNode("div", _hoisted_151, [
                    createVNode(unref(TriangleAlert), {
                      size: 18,
                      class: "text-amber-500"
                    })
                  ]),
                  _cache[75] || (_cache[75] = createBaseVNode("div", null, [
                    createBaseVNode("p", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "Cancel Meeting"),
                    createBaseVNode("p", { class: "text-sm font-semibold text-gray-800" }, "Are you sure you want to cancel this meeting?"),
                    createBaseVNode("p", { class: "text-[10px] text-gray-400 mt-1.5 font-mono leading-relaxed" }, "Provide a reason for cancellation (optional).")
                  ], -1))
                ]),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((cancelReason).value = $event)),
                  rows: "3",
                  placeholder: "Enter cancellation reason (optional)...",
                  class: "w-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-[11px] font-mono text-gray-700 outline-none focus:border-amber-500 focus:bg-amber-50/30 resize-none rounded-sm transition-colors"
                }, null, 512), [
                  [vModelText, cancelReason.value]
                ]),
                createBaseVNode("div", _hoisted_152, [
                  createBaseVNode("button", {
                    onClick: closeCancelModal,
                    class: "px-4 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-sm"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    onClick: confirmCancelMeeting,
                    disabled: cancelling.value,
                    class: "px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 rounded-sm"
                  }, [
                    (cancelling.value)
                      ? (openBlock(), createBlock(unref(LoaderCircle), {
                          key: 0,
                          size: 12,
                          class: "animate-spin"
                        }))
                      : (openBlock(), createBlock(unref(X), {
                          key: 1,
                          size: 12
                        })),
                    createTextVNode(" " + toDisplayString(cancelling.value ? 'Cancelling...' : 'Confirm Cancellation'), 1)
                  ], 8, _hoisted_153)
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
const CRMMeetingsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-fafb7d77"]]);

export { CRMMeetingsPage as default };
