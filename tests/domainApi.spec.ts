import { describe, it, expect } from 'vitest'
import { fetchDomains } from '../src/api/domainApi'

describe('fetchDomains', () => {
  // Assumes VITE_SIMULATE_API_ERROR is not set (or not "always") so requests succeed

  it('returns paginated data with default page and pageSize', async () => {
    const result = await fetchDomains({})
    expect(result.data).toBeDefined()
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.total).toBeGreaterThanOrEqual(0)
    expect(result.data.length).toBeLessThanOrEqual(10)
  })

  it('filters by domain (partial match)', async () => {
    const result = await fetchDomains({ domain: 'example' })
    expect(result.data.every((d) => d.domain.toLowerCase().includes('example'))).toBe(true)
    expect(result.total).toBe(result.data.length)
  })

  it('filters by registrar (partial match)', async () => {
    const result = await fetchDomains({ registrar: 'Acme' })
    expect(
      result.data.every((d) => (d.registrar ?? '').toLowerCase().includes('acme'))
    ).toBe(true)
  })

  it('filters by status (exact match)', async () => {
    const result = await fetchDomains({ status: 'active' })
    expect(result.data.every((d) => d.status === 'active')).toBe(true)
  })

  it('respects page and pageSize', async () => {
    const page1 = await fetchDomains({ page: 1, pageSize: 3 })
    const page2 = await fetchDomains({ page: 2, pageSize: 3 })
    expect(page1.data).toHaveLength(3)
    expect(page2.data).toHaveLength(3)
    const ids1 = page1.data.map((d) => d.domain)
    const ids2 = page2.data.map((d) => d.domain)
    expect(ids1.some((id) => ids2.includes(id))).toBe(false)
  })

  it('returns empty data when filters match nothing', async () => {
    const result = await fetchDomains({ domain: 'xyznonexistent123' })
    expect(result.data).toHaveLength(0)
    expect(result.total).toBe(0)
  })
})
