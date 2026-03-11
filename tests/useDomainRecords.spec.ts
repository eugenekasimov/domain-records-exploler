import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useDomainRecords } from '../src/composables/useDomainRecords'
import * as api from '../src/api/domainApi'

const DEBOUNCE_MS = 400

const samplePage = {
  data: [
    {
      domain: 'example.com',
      registrar: 'Acme',
      status: 'active',
      created_at: '2020-01-01T00:00:00Z',
      expires_at: '2030-01-01T00:00:00Z',
      nameservers: [],
      updated_at: '2024-01-01T00:00:00Z',
    },
  ],
  total: 1,
}

describe('useDomainRecords', () => {
  const mockFetch = vi.spyOn(api, 'fetchDomains')

  beforeEach(() => {
    mockFetch.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads domains when load is called', async () => {
    mockFetch.mockResolvedValueOnce(samplePage)

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()

    expect(composable.isLoading.value).toBe(false)
    expect(composable.error.value).toBeNull()
    expect(composable.domains.value).toHaveLength(1)
    expect(mockFetch).toHaveBeenCalled()
  })

  it('sets error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()

    expect(composable.error.value).toBeTruthy()
    expect(composable.domains.value).toHaveLength(0)
  })

  it('handles empty result', async () => {
    mockFetch.mockResolvedValueOnce({ data: [], total: 0 })

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()

    expect(composable.domains.value).toHaveLength(0)
    expect(composable.total.value).toBe(0)
    expect(composable.error.value).toBeNull()
  })

  it('filter change triggers load with debounce', async () => {
    vi.useFakeTimers()
    mockFetch.mockResolvedValue(samplePage)

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()
    mockFetch.mockClear()

    composable.filters.value = { ...composable.filters.value, domain: 'test' }
    await nextTick()
    vi.advanceTimersByTime(DEBOUNCE_MS)
    await flushPromises()

    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({ domain: 'test', page: 1 })
    )
  })

  it('resetFilters clears filters and triggers single load', async () => {
    vi.useFakeTimers()
    mockFetch.mockResolvedValue(samplePage)

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()
    mockFetch.mockClear()

    composable.resetFilters()
    await nextTick()
    vi.advanceTimersByTime(DEBOUNCE_MS)
    await flushPromises()

    expect(composable.filters.value).toEqual({})
    expect(mockFetch).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }))
  })

  it('pagination: setPage and goToNextPage call fetch with correct page', async () => {
    mockFetch.mockResolvedValue({ data: [], total: 25 })

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()
    expect(composable.total.value).toBe(25)
    mockFetch.mockClear()

    composable.setPage(2)
    await flushPromises()
    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({ page: 2, pageSize: 10 })
    )
    expect(composable.page.value).toBe(2)

    mockFetch.mockClear()
    composable.goToNextPage()
    await flushPromises()
    expect(composable.page.value).toBe(3)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.objectContaining({ page: 3 })
    )
  })

  it('goToPreviousPage decrements page and loads', async () => {
    mockFetch.mockResolvedValue({ data: [], total: 25 })

    const composable = useDomainRecords()
    await composable.reload()
    await flushPromises()
    composable.setPage(3)
    await flushPromises()
    mockFetch.mockClear()

    composable.goToPreviousPage()
    await flushPromises()
    expect(composable.page.value).toBe(2)
    expect(mockFetch).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }))
  })
})

