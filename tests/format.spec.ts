import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime } from '../src/utils/format'

describe('formatDate', () => {
  it('returns "Unknown" for null', () => {
    expect(formatDate(null)).toBe('Unknown')
  })

  it('returns "Unknown" for empty string', () => {
    expect(formatDate('')).toBe('Unknown')
  })

  it('returns "Unknown" for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('Unknown')
    expect(formatDate('2024-13-45')).toBe('Unknown')
  })

  it('formats valid ISO date', () => {
    const result = formatDate('2024-06-15T12:00:00Z')
    expect(result).not.toBe('Unknown')
    expect(result).toMatch(/\d/) // contains digits
    expect(typeof result).toBe('string')
  })
})

describe('formatDateTime', () => {
  it('returns "Unknown" for null', () => {
    expect(formatDateTime(null)).toBe('Unknown')
  })

  it('returns "Unknown" for empty string', () => {
    expect(formatDateTime('')).toBe('Unknown')
  })

  it('returns "Unknown" for invalid date string', () => {
    expect(formatDateTime('invalid')).toBe('Unknown')
  })

  it('formats valid ISO date time', () => {
    const result = formatDateTime('2024-01-01T14:30:00Z')
    expect(result).not.toBe('Unknown')
    expect(typeof result).toBe('string')
  })
})
