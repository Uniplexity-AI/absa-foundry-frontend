import { i as computed, o as openBlock, c as createElementBlock, b as createBaseVNode, h as normalizeClass, t as toDisplayString, j as createCommentVNode, u as useRouter } from './index-DJKk8LB7.js';

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { key: 0 };


const _sfc_main = {
  __name: 'BackButton',
  props: {
  route: { type: [String, Object], default: null },
  label: { type: String, default: 'Back' },
  variant: { type: String, default: 'default' },
  useHistory: { type: Boolean, default: false }
},
  setup(__props) {

const props = __props;

const router = useRouter();

const ariaLabel = computed(() => props.label ? `Back to ${props.label}` : 'Go back');

function handleBack() {
  if (props.route) {
    router.push(props.route);
  } else {
    router.back();
  }
}

return (_ctx, _cache) => {
  return (__props.route || __props.useHistory)
    ? (openBlock(), createElementBlock("button", {
        key: 0,
        onClick: handleBack,
        class: normalizeClass([
      __props.variant === 'icon-only'
        ? 'text-gray-400 hover:text-[var(--brand-primary)] transition-colors'
        : __props.variant === 'pill'
          ? 'inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-all bg-white'
          : 'inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-gray-500 hover:text-[var(--brand-primary)] transition-colors'
    ]),
        "aria-label": ariaLabel.value
      }, [
        createBaseVNode("i", {
          class: normalizeClass(["fas fa-arrow-left", __props.variant === 'icon-only' ? 'text-lg' : 'text-[10px]'])
        }, null, 2),
        (__props.variant !== 'icon-only')
          ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.label), 1))
          : createCommentVNode("", true)
      ], 10, _hoisted_1))
    : createCommentVNode("", true)
}
}

};

export { _sfc_main as _ };
