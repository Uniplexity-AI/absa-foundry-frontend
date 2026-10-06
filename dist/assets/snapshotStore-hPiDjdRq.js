import { a1 as defineStore, Q as axios, R as API_BASE_URL, r as ref, i as computed } from './index-CAIvJQgo.js';

const STORAGE_KEY = "asOfDate";
const api = axios.create({ baseURL: API_BASE_URL, timeout: 15e3 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
function cleanDate(val, fallback = "2026-07-27") {
  let d = String(val || "").trim();
  if (!d) return fallback;
  if (/^\d{4}-\d{2}0\d{2}$/.test(d)) {
    d = d.slice(0, 7) + "-" + d.slice(8);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return fallback;
  }
  return d;
}
const useSnapshotStore = defineStore("snapshot", () => {
  const initial = "2026-07-27";
  const stored = localStorage.getItem(STORAGE_KEY);
  const resolved = cleanDate(stored, initial);
  if (stored && stored !== resolved) {
    localStorage.setItem(STORAGE_KEY, resolved);
  }
  const selectedDate = ref(resolved);
  const availableDates = ref([]);
  const asOfDate = computed(() => cleanDate(selectedDate.value, initial));
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
    const d = cleanDate(value, null);
    if (!d) return;
    selectedDate.value = d;
    localStorage.setItem(STORAGE_KEY, d);
  }
  return { selectedDate, availableDates, asOfDate, fetchAvailable, setDate };
});

export { useSnapshotStore };
