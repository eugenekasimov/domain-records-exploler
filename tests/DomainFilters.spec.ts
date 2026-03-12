import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainFilters from '../src/components/DomainFilters.vue'

const FILTER_DEBOUNCE_MS = 400

describe('DomainFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('emits update:domain when domain input changes (after debounce)', async () => {
    const wrapper = mount(DomainFilters, {
      props: { domain: '', registrar: '', status: '' },
    })
    const input = wrapper.find('input[name="domain"]')
    await input.setValue('example.com')
    expect(wrapper.emitted('update:domain')).toBeFalsy()
    await vi.advanceTimersByTime(FILTER_DEBOUNCE_MS)
    const emitted = wrapper.emitted('update:domain')
    expect(emitted).toBeTruthy()
    expect(emitted?.[emitted.length - 1]).toEqual(['example.com'])
  })

  it('emits update:registrar when registrar input changes (after debounce)', async () => {
    const wrapper = mount(DomainFilters, {
      props: { domain: '', registrar: '', status: '' },
    })
    const input = wrapper.find('input[name="registrar"]')
    await input.setValue('Acme')
    expect(wrapper.emitted('update:registrar')).toBeFalsy()
    await vi.advanceTimersByTime(FILTER_DEBOUNCE_MS)
    const emitted = wrapper.emitted('update:registrar')
    expect(emitted).toBeTruthy()
    expect(emitted?.[emitted.length - 1]).toEqual(['Acme'])
  })

  it('emits update:status when status select changes', async () => {
    const wrapper = mount(DomainFilters, {
      props: { domain: '', registrar: '', status: '' },
    })
    const select = wrapper.find('select[name="status"]')
    await select.setValue('active')
    const emitted = wrapper.emitted('update:status')
    expect(emitted).toBeTruthy()
    expect(emitted?.[emitted.length - 1]).toEqual(['active'])
  })

  it('emits reset when Reset filters button is clicked', async () => {
    const wrapper = mount(DomainFilters, {
      props: { domain: 'x', registrar: 'y', status: 'active' },
    })
    const button = wrapper.find('.reset-button')
    await button.trigger('click')
    const emitted = wrapper.emitted('reset')
    expect(emitted).toBeTruthy()
    expect(emitted).toHaveLength(1)
  })

  it('renders with initial prop values', () => {
    const wrapper = mount(DomainFilters, {
      props: { domain: 'test.com', registrar: 'Reg', status: 'clientHold' },
    })
    expect((wrapper.find('input[name="domain"]').element as HTMLInputElement).value).toBe('test.com')
    expect((wrapper.find('input[name="registrar"]').element as HTMLInputElement).value).toBe('Reg')
    expect((wrapper.find('select[name="status"]').element as HTMLSelectElement).value).toBe('clientHold')
  })
})
