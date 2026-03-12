import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchDomains } from '../src/api/domainApi'

const MOCK_LATENCY_MS = 250

describe('fetchDomains', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  /** Run fetchDomains and advance fake time so the internal 250ms delay resolves without real wait */
  async function fetchWithFakeTime(
    params: Parameters<typeof fetchDomains>[0] = {}
  ) {
    const p = fetchDomains(params)
    await vi.advanceTimersByTimeAsync(MOCK_LATENCY_MS)
    return p
  }

  it('returns paginated data with default page and pageSize', async () => {
    const result = await fetchWithFakeTime({})
    expect(result.data).toBeDefined()
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.total).toBeGreaterThanOrEqual(0)
    expect(result.data.length).toBeLessThanOrEqual(10)
  })

  it('filters by domain (partial match)', async () => {
    const result = await fetchWithFakeTime({ domain: 'example' })
    expect(result.data.every((d) => d.domain.toLowerCase().includes('example'))).toBe(true)
    expect(result.total).toBeGreaterThanOrEqual(result.data.length)
  })

  it('filters by registrar (partial match)', async () => {
    const result = await fetchWithFakeTime({ registrar: 'Acme' })
    expect(
      result.data.every((d) => (d.registrar ?? '').toLowerCase().includes('acme'))
    ).toBe(true)
  })

  it('filters by status (exact match)', async () => {
    const result = await fetchWithFakeTime({ status: 'active' })
    expect(result.data.every((d) => d.status === 'active')).toBe(true)
  })

  it('respects page and pageSize', async () => {
    const page1 = await fetchWithFakeTime({ page: 1, pageSize: 3 })
    const page2 = await fetchWithFakeTime({ page: 2, pageSize: 3 })
    expect(page1.data).toHaveLength(3)
    expect(page2.data).toHaveLength(3)
    const ids1 = page1.data.map((d) => d.domain)
    const ids2 = page2.data.map((d) => d.domain)
    expect(ids1.some((id) => ids2.includes(id))).toBe(false)
  })

  it('returns empty data when filters match nothing', async () => {
    const result = await fetchWithFakeTime({ domain: 'xyznonexistent123' })
    expect(result.data).toHaveLength(0)
    expect(result.total).toBe(0)
  })
})
