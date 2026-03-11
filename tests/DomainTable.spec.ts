import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainTable from '../src/components/DomainTable.vue'
import type { DomainRecord } from '../src/types/domain'

const sampleDomains: DomainRecord[] = [
  {
    domain: 'example.com',
    registrar: 'Acme',
    status: 'active',
    created_at: '2020-01-01T00:00:00Z',
    expires_at: '2030-01-01T00:00:00Z',
    nameservers: [],
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    domain: 'hold-domain.net',
    registrar: 'Global',
    status: 'clientHold',
    created_at: null,
    expires_at: null,
    nameservers: null,
    updated_at: null,
  },
]

describe('DomainTable', () => {
  it('renders rows for provided domains', () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
        selectedDomain: null,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('example.com')
    expect(rows[1].text()).toContain('hold-domain.net')
  })

  it('emits select event when row clicked', async () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
        selectedDomain: null,
      },
    })

    const firstRow = wrapper.find('tbody tr')
    await firstRow.trigger('click')

    const emitted = wrapper.emitted('select')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toMatchObject({ domain: 'example.com' })
  })
})

