import { describe, expect, it } from 'vitest'
import { formatDuration, formatMonthYear, getAge, getTimeSpan } from '../../app/utils/dates'

describe('formatMonthYear', () => {
  it('formats in UTC, so a month start is not shown as the previous month', () => {
    expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('America/New_York')
    expect(formatMonthYear(new Date('2023-11-01'), 'en-GB')).toBe('Nov 2023')
  })

  it('follows the locale', () => {
    expect(formatMonthYear(new Date('2023-11-01'), 'it-IT')).toBe('nov 2023')
  })
})

describe('getTimeSpan', () => {
  it('counts days under a month', () => {
    expect(getTimeSpan(new Date('2026-10-01'), new Date('2026-10-04'))).toEqual({ years: 0, months: 0, days: 3 })
  })

  it('counts whole months under a year', () => {
    expect(getTimeSpan(new Date('2023-10-01'), new Date('2024-08-31'))).toEqual({ years: 0, months: 10, days: 0 })
  })

  it('splits years and months', () => {
    expect(getTimeSpan(new Date('2023-11-01'), new Date('2026-10-04'))).toEqual({ years: 2, months: 11, days: 0 })
  })

  it('handles exact years', () => {
    expect(getTimeSpan(new Date('2025-10-01'), new Date('2026-10-04'))).toEqual({ years: 1, months: 0, days: 0 })
  })
})

describe('getAge', () => {
  const birth = new Date('2001-02-20')

  it('is one less the day before the birthday', () => {
    expect(getAge(birth, new Date('2026-02-19'))).toBe(24)
  })

  it('increments on the birthday', () => {
    expect(getAge(birth, new Date('2026-02-20'))).toBe(25)
  })
})

describe('formatDuration', () => {
  it('shows hours only when there are any', () => {
    expect(formatDuration(12_000)).toBe('3h 20m')
    expect(formatDuration(2_700)).toBe('45m')
    expect(formatDuration(0)).toBe('0m')
  })
})
