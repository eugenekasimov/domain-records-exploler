import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useDomainRecords } from '../src/composables/useDomainRecords'
import * as api from '../src/api/domainApi'

describe('useDomainRecords', () => {
  const mockFetch = vi.spyOn(api, 'fetchDomains')

  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('loads domains when load is called', async () => {
    mockFetch.mockResolvedValueOnce({
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
    })

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
})

