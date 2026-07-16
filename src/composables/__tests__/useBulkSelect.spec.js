import { describe, it, expect, beforeEach } from 'vitest'
import { useBulkSelect } from '@/composables/useBulkSelect'

const items = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' }
]

describe('useBulkSelect', () => {
  let bulk

  beforeEach(() => {
    bulk = useBulkSelect()
    bulk.clearSelection()
  })

  it('starts with empty selection', () => {
    expect(bulk.selectionCount.value).toBe(0)
    expect(bulk.hasSelection.value).toBe(false)
  })

  it('toggles single item selection', () => {
    bulk.toggleSelect(items[0])
    expect(bulk.isSelected(items[0])).toBe(true)
    expect(bulk.selectionCount.value).toBe(1)
    expect(bulk.hasSelection.value).toBe(true)

    bulk.toggleSelect(items[0])
    expect(bulk.isSelected(items[0])).toBe(false)
    expect(bulk.selectionCount.value).toBe(0)
  })

  it('selects multiple items', () => {
    bulk.toggleSelect(items[0])
    bulk.toggleSelect(items[1])
    expect(bulk.selectionCount.value).toBe(2)
    expect(bulk.isSelected(items[0])).toBe(true)
    expect(bulk.isSelected(items[1])).toBe(true)
    expect(bulk.isSelected(items[2])).toBe(false)
  })

  it('checks isAllPageSelected', () => {
    bulk.toggleSelect(items[0])
    expect(bulk.isAllPageSelected(items)).toBe(false)

    bulk.toggleSelect(items[1])
    bulk.toggleSelect(items[2])
    expect(bulk.isAllPageSelected(items)).toBe(true)
  })

  it('returns false for isAllPageSelected on empty array', () => {
    expect(bulk.isAllPageSelected([])).toBe(false)
  })

  it('toggles all items', () => {
    bulk.toggleSelectAll(items)
    expect(bulk.isAllPageSelected(items)).toBe(true)
    expect(bulk.selectionCount.value).toBe(3)
  })

  it('deselects all when toggling all on fully selected', () => {
    bulk.selectAll(items)
    bulk.toggleSelectAll(items)
    expect(bulk.selectionCount.value).toBe(0)
  })

  it('selects all items', () => {
    bulk.selectAll(items)
    expect(bulk.selectionCount.value).toBe(3)
    expect(bulk.isAllPageSelected(items)).toBe(true)
  })

  it('clears selection', () => {
    bulk.selectAll(items)
    bulk.clearSelection()
    expect(bulk.selectionCount.value).toBe(0)
    expect(bulk.hasSelection.value).toBe(false)
  })

  it('gets selected items', () => {
    bulk.toggleSelect(items[0])
    bulk.toggleSelect(items[2])
    const selected = bulk.getSelectedItems(items)
    expect(selected).toHaveLength(2)
    expect(selected).toContain(items[0])
    expect(selected).toContain(items[2])
    expect(selected).not.toContain(items[1])
  })

  it('isPartiallySelected returns false when none selected', () => {
    expect(bulk.isPartiallySelected(items)).toBe(false)
  })

  it('isPartiallySelected returns true when some selected', () => {
    bulk.toggleSelect(items[0])
    expect(bulk.isPartiallySelected(items)).toBe(true)
  })

  it('isPartiallySelected returns false when all selected', () => {
    bulk.selectAll(items)
    expect(bulk.isPartiallySelected(items)).toBe(false)
  })

  it('isPartiallySelected returns false on empty array', () => {
    expect(bulk.isPartiallySelected([])).toBe(false)
  })

  it('isAllPageSelected with filterFn only checks filtered items', () => {
    const filtered = items.filter(i => i.id !== 2)
    bulk.toggleSelect(items[0])
    bulk.toggleSelect(items[2])
    expect(bulk.isAllPageSelected(items, { filterFn: i => i.id !== 2 })).toBe(true)
    expect(bulk.isAllPageSelected(items)).toBe(false)
  })

  it('toggleSelectAll with filterFn only toggles filtered items', () => {
    bulk.toggleSelectAll(items, { filterFn: i => i.id !== 2 })
    expect(bulk.isSelected(items[0])).toBe(true)
    expect(bulk.isSelected(items[1])).toBe(false)
    expect(bulk.isSelected(items[2])).toBe(true)
  })

  it('isPartiallySelected with filterFn includes only filtered items', () => {
    bulk.toggleSelect(items[0])
    expect(bulk.isPartiallySelected(items, { filterFn: i => i.id !== 2 })).toBe(true)
    expect(bulk.isPartiallySelected(items)).toBe(true)
  })

  it('isPartiallySelected with filterFn returns false when all filtered selected', () => {
    bulk.toggleSelect(items[0])
    bulk.toggleSelect(items[2])
    expect(bulk.isPartiallySelected(items, { filterFn: i => i.id !== 2 })).toBe(false)
    expect(bulk.isAllPageSelected(items, { filterFn: i => i.id !== 2 })).toBe(true)
  })

  it('uses custom getId function', () => {
    const custom = useBulkSelect({ getId: (item) => item.key })
    const customItems = [
      { key: 'a', name: 'X' },
      { key: 'b', name: 'Y' }
    ]
    custom.toggleSelect(customItems[0])
    expect(custom.isSelected(customItems[0])).toBe(true)
    expect(custom.isSelected(customItems[1])).toBe(false)
    expect(custom.selectionCount.value).toBe(1)
  })

  it('handles items with _id fallback', () => {
    const itemsWithUnderscoreId = [
      { _id: 10, name: 'Alpha' },
      { _id: 20, name: 'Beta' }
    ]
    bulk.toggleSelect(itemsWithUnderscoreId[0])
    expect(bulk.isSelected(itemsWithUnderscoreId[0])).toBe(true)
    expect(bulk.selectionCount.value).toBe(1)
  })
})
