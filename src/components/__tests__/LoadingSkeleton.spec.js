import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

describe('LoadingSkeleton Component', () => {
  describe('card type skeleton', () => {
    it('renders card skeleton with proper structure', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'card' }
      })

      expect(wrapper.find('.animate-pulse').exists()).toBe(true)
      expect(wrapper.find('.bg-gray-200.rounded-2xl').exists()).toBe(true)
      
      // Check for the card content structure
      const cardContent = wrapper.find('.bg-gray-200.rounded-2xl.p-6')
      expect(cardContent.exists()).toBe(true)
      
      // Check for skeleton lines
      expect(wrapper.findAll('.bg-gray-300').length).toBeGreaterThan(0)
    })
  })

  describe('table type skeleton', () => {
    it('renders table skeleton with default count', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'table' }
      })

      expect(wrapper.find('.animate-pulse').exists()).toBe(true)
      
      // Should have 5 rows by default
      const rows = wrapper.findAll('.flex.space-x-4')
      expect(rows.length).toBe(5)
      
      // Each row should have 4 columns
      rows.forEach(row => {
        const columns = row.findAll('.h-4.bg-gray-200.rounded')
        expect(columns.length).toBe(4)
      })
    })

    it('renders table skeleton with custom count', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'table', count: 3 }
      })

      const rows = wrapper.findAll('.flex.space-x-4')
      expect(rows.length).toBe(3)
    })
  })

  describe('module type skeleton', () => {
    it('renders module skeleton with proper layout', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'module' }
      })

      expect(wrapper.find('.animate-pulse').exists()).toBe(true)
      expect(wrapper.find('.bg-white.rounded-xl.shadow-sm').exists()).toBe(true)
      
      // Check for icon placeholder
      expect(wrapper.find('.w-12.h-12.bg-gray-200.rounded-xl').exists()).toBe(true)
      
      // Check for content placeholders
      expect(wrapper.find('.h-5.bg-gray-200.rounded').exists()).toBe(true)
      expect(wrapper.find('.h-10.bg-gray-200.rounded').exists()).toBe(true)
    })
  })

  describe('spinner type', () => {
    it('renders spinner with default message', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'spinner' }
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.find('.border-blue-600').exists()).toBe(true)
      expect(wrapper.text()).toContain('Loading...')
    })

    it('renders spinner with custom message', () => {
      const customMessage = 'Processing data...'
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'spinner', message: customMessage }
      })

      expect(wrapper.find('.animate-spin').exists()).toBe(true)
      expect(wrapper.text()).toContain(customMessage)
    })
  })

  describe('default type', () => {
    it('renders default skeleton when no type specified', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'unknown' }
      })

      expect(wrapper.find('.animate-pulse').exists()).toBe(true)
      expect(wrapper.find('.bg-gray-200.rounded-lg.h-4').exists()).toBe(true)
    })
  })

  describe('prop validation', () => {
    it('validates type prop correctly', () => {
      const validTypes = ['card', 'table', 'module', 'spinner']
      
      validTypes.forEach(type => {
        const wrapper = mount(LoadingSkeleton, {
          props: { type }
        })
        expect(wrapper.exists()).toBe(true)
      })
    })

    it('accepts count prop for table type', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'table', count: 10 }
      })

      const rows = wrapper.findAll('.flex.space-x-4')
      expect(rows.length).toBe(10)
    })
  })

  describe('animations and styling', () => {
    it('applies pulse animation to all skeleton types', () => {
      const types = ['card', 'table', 'module']
      
      types.forEach(type => {
        const wrapper = mount(LoadingSkeleton, {
          props: { type }
        })
        expect(wrapper.find('.animate-pulse').exists()).toBe(true)
      })
    })

    it('applies spin animation to spinner type', () => {
      const wrapper = mount(LoadingSkeleton, {
        props: { type: 'spinner' }
      })
      
      expect(wrapper.find('.animate-spin').exists()).toBe(true)
    })
  })
})