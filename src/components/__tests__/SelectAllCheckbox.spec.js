import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectAllCheckbox from '@/components/ui/SelectAllCheckbox.vue'

describe('SelectAllCheckbox', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(SelectAllCheckbox)
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(input.element.checked).toBe(false)
  })

  it('renders checked when model-value is true', () => {
    const wrapper = mount(SelectAllCheckbox, {
      props: { modelValue: true }
    })
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true)
  })

  it('renders with indeterminate prop', () => {
    const wrapper = mount(SelectAllCheckbox, {
      props: { modelValue: false, indeterminate: true }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.element.indeterminate).toBe(true)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(SelectAllCheckbox, {
      props: { modelValue: false }
    })
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('does not show indeterminate when fully checked', () => {
    const wrapper = mount(SelectAllCheckbox, {
      props: { modelValue: true, indeterminate: false }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.element.checked).toBe(true)
    expect(input.element.indeterminate).toBe(false)
  })
})
