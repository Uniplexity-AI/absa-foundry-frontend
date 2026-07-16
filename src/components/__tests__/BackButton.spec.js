import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BackButton from '@/components/ui/BackButton.vue'

const mockPush = vi.fn()
const mockBack = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack
  })
}))

describe('BackButton', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockBack.mockClear()
  })

  it('renders with default props', () => {
    const wrapper = mount(BackButton, {
      props: { route: '/dashboard/test' }
    })
    expect(wrapper.find('.fa-arrow-left').exists()).toBe(true)
    expect(wrapper.text()).toContain('Back')
  })

  it('renders icon-only variant', () => {
    const wrapper = mount(BackButton, {
      props: { route: '/dashboard/test', variant: 'icon-only' }
    })
    expect(wrapper.find('.fa-arrow-left').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Back')
  })

  it('renders pill variant', () => {
    const wrapper = mount(BackButton, {
      props: { route: '/dashboard/test', variant: 'pill' }
    })
    expect(wrapper.find('.fa-arrow-left').exists()).toBe(true)
    expect(wrapper.text()).toContain('Back')
  })

  it('calls router.push when route prop is provided', async () => {
    const wrapper = mount(BackButton, {
      props: { route: '/dashboard/expenses' }
    })
    await wrapper.find('button').trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/dashboard/expenses')
    expect(mockBack).not.toHaveBeenCalled()
  })

  it('calls router.back when no route is provided', async () => {
    const wrapper = mount(BackButton, {
      props: { useHistory: true }
    })
    await wrapper.find('button').trigger('click')
    expect(mockBack).toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('passes object routes correctly', async () => {
    const wrapper = mount(BackButton, {
      props: { route: { name: 'shortlisting' } }
    })
    await wrapper.find('button').trigger('click')
    expect(mockPush).toHaveBeenCalledWith({ name: 'shortlisting' })
  })

  it('does not render when no route and no useHistory', () => {
    const wrapper = mount(BackButton)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('applies correct aria-label', () => {
    const wrapper = mount(BackButton, {
      props: { route: '/dashboard/test', label: 'Invoices' }
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Back to Invoices')
  })
})
