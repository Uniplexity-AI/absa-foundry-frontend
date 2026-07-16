import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BulkActionsBar from '@/components/ui/BulkActionsBar.vue'

describe('BulkActionsBar', () => {
  it('renders nothing when count is 0', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 0 }
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('displays selection count', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 5 }
    })
    expect(wrapper.text()).toContain('5 SELECTED')
  })

  it('emits clear on clear button click', async () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3 }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('emits delete on delete button click', async () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3 }
    })
    const buttons = wrapper.findAll('button')
    const deleteBtn = buttons[buttons.length - 1]
    await deleteBtn.trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('shows deleting state', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3, deleting: true }
    })
    expect(wrapper.text()).toContain('DELETING...')
    expect(wrapper.find('.fa-spinner.fa-spin').exists()).toBe(true)
  })

  it('does not show delete button when showDelete is false', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3, showDelete: false }
    })
    expect(wrapper.text()).not.toContain('DELETE')
  })

  it('renders actions slot content', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3 },
      slots: {
        actions: '<button class="custom-action">Stage</button>'
      }
    })
    expect(wrapper.find('.custom-action').exists()).toBe(true)
    expect(wrapper.text()).toContain('Stage')
  })

  it('renders secondary slot content', () => {
    const wrapper = mount(BulkActionsBar, {
      props: { count: 3 },
      slots: {
        secondary: '<span class="extra-info">Extra</span>'
      }
    })
    expect(wrapper.find('.extra-info').exists()).toBe(true)
  })
})
