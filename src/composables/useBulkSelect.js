import { ref, computed } from 'vue'

export function useBulkSelect({ getId = (item) => item.id || item._id } = {}) {
  const selectedIds = ref(new Set())
  const lastClickedIndex = ref(-1)

  const selectionCount = computed(() => selectedIds.value.size)
  const hasSelection = computed(() => selectionCount.value > 0)

  function isSelected(item) {
    return selectedIds.value.has(getId(item))
  }

  function isAllPageSelected(items, { filterFn } = {}) {
    const filtered = filterFn ? items.filter(filterFn) : items
    return filtered.length > 0 && filtered.every(item => selectedIds.value.has(getId(item)))
  }

  function isPartiallySelected(items, { filterFn } = {}) {
    const filtered = filterFn ? items.filter(filterFn) : items
    if (filtered.length === 0) return false
    const someSelected = filtered.some(item => selectedIds.value.has(getId(item)))
    const allSelected = filtered.every(item => selectedIds.value.has(getId(item)))
    return someSelected && !allSelected
  }

  function toggleSelect(item, index, event) {
    const id = getId(item)
    const next = new Set(selectedIds.value)

    if (event && event.shiftKey && lastClickedIndex.value >= 0 && index !== undefined) {
      const start = Math.min(lastClickedIndex.value, index)
      const end = Math.max(lastClickedIndex.value, index)
      const rangeSelected = new Set(next)
      for (let i = start; i <= end; i++) {
        rangeSelected.add(getId(arguments[i - (index - i)]))
      }
      selectedIds.value = rangeSelected
      lastClickedIndex.value = index
      return
    }

    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    selectedIds.value = next
    if (index !== undefined) lastClickedIndex.value = index
  }

  function toggleSelectAll(items, { filterFn } = {}) {
    const target = filterFn ? items.filter(filterFn) : items
    const next = new Set(selectedIds.value)
    const allSelected = isAllPageSelected(items, { filterFn })
    for (const item of target) {
      const id = getId(item)
      if (allSelected) {
        next.delete(id)
      } else {
        next.add(id)
      }
    }
    selectedIds.value = next
    lastClickedIndex.value = -1
  }

  function selectAll(items) {
    const next = new Set()
    for (const item of items) {
      next.add(getId(item))
    }
    selectedIds.value = next
  }

  function clearSelection() {
    selectedIds.value = new Set()
    lastClickedIndex.value = -1
  }

  function getSelectedItems(items) {
    return items.filter(item => selectedIds.value.has(getId(item)))
  }

  return {
    selectedIds,
    selectionCount,
    hasSelection,
    isSelected,
    isAllPageSelected,
    isPartiallySelected,
    toggleSelect,
    toggleSelectAll,
    selectAll,
    clearSelection,
    getSelectedItems
  }
}
