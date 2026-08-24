import { h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, u as useRouter } from './index-F0Jaczum.js';

const _hoisted_1 = { class: "min-h-screen flex items-center justify-center" };


const _sfc_main = {
  __name: 'Logout',
  setup(__props) {

const router = useRouter();

onMounted(() => {
  // Clear authentication data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tenantId');
  
  // Redirect to login
  router.push('/login');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("div", { class: "text-center" }, [
      createBaseVNode("p", { class: "text-gray-600" }, "Logging out...")
    ], -1)
  ]))]))
}
}

};

export { _sfc_main as default };
