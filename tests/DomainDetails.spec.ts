import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainDetails from '../src/components/DomainDetails.vue'
import type { DomainRecord } from '../src/types/domain'

const sampleDomain: DomainRecord = {
  domain: 'example.com',
  registrar: 'Acme Registrar',
  status: 'active',
  created_at: '2020-01-01T00:00:00Z',
  expires_at: '2030-01-01T00:00:00Z',
  nameservers: ['ns1.example.com', 'ns2.example.com'],
  updated_at: '2024-01-01T00:00:00Z',
}

describe('DomainDetails', () => {
  it('shows empty state when domain is null', () => {
    const wrapper = mount(DomainDetails, { props: { domain: null } })
    expect(wrapper.find('.details-empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('No domain selected')
    expect(wrapper.find('.details').exists()).toBe(false)
  })

  it('shows domain name and overview when domain is set', () => {
    const wrapper = mount(DomainDetails, { props: { domain: sampleDomain } })
    expect(wrapper.find('.details-empty').exists()).toBe(false)
    expect(wrapper.find('.details').exists()).toBe(true)
    expect(wrapper.text()).toContain('example.com')
    expect(wrapper.text()).toContain('Acme Registrar')
    expect(wrapper.text()).toContain('Active')
  })

  it('shows "Unknown registrar" when registrar is null', () => {
    const domainNoRegistrar: DomainRecord = { ...sampleDomain, registrar: null }
    const wrapper = mount(DomainDetails, { props: { domain: domainNoRegistrar } })
    expect(wrapper.text()).toContain('Unknown registrar')
  })

  it('shows nameservers when present', () => {
    const wrapper = mount(DomainDetails, { props: { domain: sampleDomain } })
    expect(wrapper.text()).toContain('ns1.example.com')
    expect(wrapper.text()).toContain('ns2.example.com')
  })

  it('shows empty nameservers message when nameservers is empty or null', () => {
    const domainNoNs: DomainRecord = { ...sampleDomain, nameservers: null }
    const wrapper = mount(DomainDetails, { props: { domain: domainNoNs } })
    expect(wrapper.text()).toContain('No nameservers configured or data unavailable')
  })

  it('emits close when Clear selection button is clicked', async () => {
    const wrapper = mount(DomainDetails, { props: { domain: sampleDomain } })
    const button = wrapper.find('.details-close')
    await button.trigger('click')
    const emitted = wrapper.emitted('close')
    expect(emitted).toBeTruthy()
    expect(emitted).toHaveLength(1)
  })
})
