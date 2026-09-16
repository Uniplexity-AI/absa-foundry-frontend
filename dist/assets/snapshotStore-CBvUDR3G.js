import { Y as defineStore, R as axios, Q as API_BASE_URL, r as ref, D as computed } from './index-BDk32LgJ.js';

const STORAGE_KEY = "asOfDate";
const api = axios.create({ baseURL: API_BASE_URL, timeout: 15e3 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const useSnapshotStore = defineStore("snapshot", () => {
  const initial = "2026-07-27";
  const selectedDate = ref(localStorage.getItem(STORAGE_KEY) || initial);
  const availableDates = ref([]);
  const asOfDate = computed(() => selectedDate.value);
  async function fetchAvailable() {
    try {
      const { data } = await api.get("/api/v1/customers/snapshots");
      const dates = data?.dates || [];
      availableDates.value = dates;
      if (dates.length && !dates.includes(selectedDate.value)) setDate(dates[0]);
    } catch {
      availableDates.value = [];
    }
  }
  function setDate(value) {
    const d = String(value || "").trim();
    if (!d) return;
    selectedDate.value = d;
    localStorage.setItem(STORAGE_KEY, d);
  }
  return { selectedDate, availableDates, asOfDate, fetchAvailable, setDate };
});

export { useSnapshotStore };
