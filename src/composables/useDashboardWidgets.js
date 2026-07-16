import { ref, computed, watch, markRaw } from 'vue'

const WIDGET_STORAGE_KEY = 'ub_dashboard_widgets'

const registeredWidgets = ref([])
const enabledWidgets = ref(new Set())

function loadPersisted() {
  try {
    const raw = localStorage.getItem(WIDGET_STORAGE_KEY)
    if (raw) {
      const ids = JSON.parse(raw)
      enabledWidgets.value = new Set(ids)
    }
  } catch { /* ignore */ }
}

function persist() {
  try {
    localStorage.setItem(WIDGET_STORAGE_KEY, JSON.stringify([...enabledWidgets.value]))
  } catch { /* ignore */ }
}

export function useDashboardWidgets() {
  loadPersisted()

  function registerWidget(widget) {
    const existing = registeredWidgets.value.find(w => w.id === widget.id)
    if (!existing) {
      // markRaw prevents Vue from making the component reactive
      registeredWidgets.value.push(markRaw(widget))
      if (!enabledWidgets.value.has(widget.id)) {
        enabledWidgets.value.add(widget.id)
        persist()
      }
    }
  }

  function registerWidgets(widgets) {
    for (const w of widgets) registerWidget(w)
  }

  function toggleWidget(id) {
    const next = new Set(enabledWidgets.value)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    enabledWidgets.value = next
    persist()
  }

  function isWidgetEnabled(id) {
    return enabledWidgets.value.has(id)
  }

  function enableWidget(id) {
    const next = new Set(enabledWidgets.value)
    next.add(id)
    enabledWidgets.value = next
    persist()
  }

  function disableWidget(id) {
    const next = new Set(enabledWidgets.value)
    next.delete(id)
    enabledWidgets.value = next
    persist()
  }

  const activeWidgets = computed(() =>
    registeredWidgets.value.filter(w => enabledWidgets.value.has(w.id))
  )

  const allWidgets = computed(() => registeredWidgets.value)

  return {
    registeredWidgets,
    enabledWidgets,
    activeWidgets,
    allWidgets,
    registerWidget,
    registerWidgets,
    toggleWidget,
    isWidgetEnabled,
    enableWidget,
    disableWidget
  }
}
