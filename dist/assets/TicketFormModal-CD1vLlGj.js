import { r as ref, M as watch, o as openBlock, C as createBlock, c as createElementBlock, b as createBaseVNode, A as createTextVNode, t as toDisplayString, x as withDirectives, y as vModelText, L as vModelSelect, j as createCommentVNode, T as Teleport } from './index-rR_eRHdu.js';

const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_2 = { class: "bg-white rounded-none shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden flex flex-col relative" };
const _hoisted_3 = { class: "px-5 py-4 border-b border-gray-200 bg-white relative z-10 flex justify-between items-start" };
const _hoisted_4 = { class: "text-lg font-black text-gray-900 uppercase tracking-tight font-display flex items-center gap-2" };
const _hoisted_5 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mt-1" };
const _hoisted_6 = { class: "p-6 font-mono space-y-5 overflow-y-auto max-h-[75vh] bg-white relative z-10" };
const _hoisted_7 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_8 = { class: "md:col-span-2" };
const _hoisted_9 = { class: "md:col-span-2" };
const _hoisted_10 = { class: "px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3" };


const _sfc_main = {
  __name: 'TicketFormModal',
  props: {
  open: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  initialData: { type: Object, default: () => ({}) }
},
  emits: ['close', 'save'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const form = ref({
  subject: '',
  customer: '',
  type: 'Complaint',
  priority: 'Low',
  channel: 'In-Branch',
  assignedTo: 'Unassigned',
  description: ''
});

watch(() => props.open, (newVal) => {
  if (newVal) {
    form.value = {
      subject: props.initialData?.subject || '',
      customer: props.initialData?.customer || '',
      type: props.initialData?.type || 'Complaint',
      priority: props.initialData?.priority || 'Low',
      channel: props.initialData?.channel || 'In-Branch',
      assignedTo: props.initialData?.assignedTo || 'Unassigned',
      description: props.initialData?.description || ''
    };
  }
});

const handleSave = () => {
  if (!form.value.subject || !form.value.customer) {
    alert("Subject and Customer are required!");
    return
  }
  emit('save', { ...form.value });
};

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.open)
      ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", null, [
                createBaseVNode("h3", _hoisted_4, [
                  _cache[9] || (_cache[9] = createBaseVNode("span", { class: "material-symbols-outlined text-absa-passion" }, "support_agent", -1)),
                  createTextVNode(" " + toDisplayString(__props.isEditing ? 'Edit Ticket' : 'Create New Ticket'), 1)
                ]),
                createBaseVNode("p", _hoisted_5, toDisplayString(__props.isEditing ? 'Update existing customer support case' : 'Open a new customer support case'), 1)
              ]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close'))),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [...(_cache[10] || (_cache[10] = [
                createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
              ]))])
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  _cache[11] || (_cache[11] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, [
                    createTextVNode("Subject / Title "),
                    createBaseVNode("span", { class: "text-absa-passion" }, "*")
                  ], -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.subject) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors",
                    placeholder: "Brief summary of issue"
                  }, null, 512), [
                    [vModelText, form.value.subject]
                  ])
                ]),
                createBaseVNode("div", _hoisted_9, [
                  _cache[12] || (_cache[12] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, [
                    createTextVNode("Customer Phone / ID "),
                    createBaseVNode("span", { class: "text-absa-passion" }, "*")
                  ], -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.customer) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors",
                    placeholder: "e.g. +260 96 111..."
                  }, null, 512), [
                    [vModelText, form.value.customer]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[14] || (_cache[14] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Case Category", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.type) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors"
                  }, [...(_cache[13] || (_cache[13] = [
                    createBaseVNode("option", null, "Complaint", -1),
                    createBaseVNode("option", null, "Enquiry", -1),
                    createBaseVNode("option", null, "Request", -1),
                    createBaseVNode("option", null, "Account Block", -1),
                    createBaseVNode("option", null, "Card Delivery", -1)
                  ]))], 512), [
                    [vModelSelect, form.value.type]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[16] || (_cache[16] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Priority", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.priority) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors"
                  }, [...(_cache[15] || (_cache[15] = [
                    createBaseVNode("option", null, "Low", -1),
                    createBaseVNode("option", null, "Medium", -1),
                    createBaseVNode("option", null, "High", -1),
                    createBaseVNode("option", null, "Critical", -1)
                  ]))], 512), [
                    [vModelSelect, form.value.priority]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[18] || (_cache[18] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Channel / Source", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.value.channel) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors"
                  }, [...(_cache[17] || (_cache[17] = [
                    createBaseVNode("option", null, "In-Branch", -1),
                    createBaseVNode("option", null, "Phone Call", -1),
                    createBaseVNode("option", null, "Email", -1),
                    createBaseVNode("option", null, "WhatsApp", -1),
                    createBaseVNode("option", null, "Mobile App", -1),
                    createBaseVNode("option", null, "Social Media", -1)
                  ]))], 512), [
                    [vModelSelect, form.value.channel]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[20] || (_cache[20] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Assign To", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.value.assignedTo) = $event)),
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors"
                  }, [...(_cache[19] || (_cache[19] = [
                    createBaseVNode("option", null, "Unassigned", -1),
                    createBaseVNode("option", null, "Self (Me)", -1),
                    createBaseVNode("option", null, "Front Office Team", -1),
                    createBaseVNode("option", null, "Technical Support", -1),
                    createBaseVNode("option", null, "Fraud & Risk", -1)
                  ]))], 512), [
                    [vModelSelect, form.value.assignedTo]
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[21] || (_cache[21] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Description", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.value.description) = $event)),
                  rows: "4",
                  class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors",
                  placeholder: "Detailed description of the case..."
                }, null, 512), [
                  [vModelText, form.value.description]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("button", {
                onClick: _cache[8] || (_cache[8] = $event => (_ctx.$emit('close'))),
                class: "px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
              }, "Cancel"),
              createBaseVNode("button", {
                onClick: handleSave,
                class: "px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors"
              }, toDisplayString(__props.isEditing ? 'Update Ticket' : 'Create Ticket'), 1)
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};

export { _sfc_main as _ };
