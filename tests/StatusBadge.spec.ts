import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../src/components/StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders "Active" for status active', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'active' } })
    expect(wrapper.text()).toContain('Active')
  })

  it('renders "Client hold" for status clientHold', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'clientHold' } })
    expect(wrapper.text()).toContain('Client hold')
  })

  it('renders "Pending transfer" for status pendingTransfer', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'pendingTransfer' } })
    expect(wrapper.text()).toContain('Pending transfer')
  })

  it('renders unknown status with raw value for unrecognized status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'customStatus' } })
    expect(wrapper.text()).toContain('Unknown status (customStatus)')
  })

  it('applies status class for styling', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'active' } })
    const span = wrapper.find('.status-badge')
    expect(span.classes()).toContain('status-active')
  })
})
