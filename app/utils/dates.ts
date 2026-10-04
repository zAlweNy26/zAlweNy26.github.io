const plural = (n: number, unit: string) => `${n} ${unit}${n !== 1 ? 's' : ''}`

/**
 * Dates in `consts.ts` are parsed as UTC midnight, so format them in UTC
 * to avoid showing the previous month to visitors west of Greenwich.
 */
export function formatMonthYear(date: Date) {
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', timeZone: 'UTC' })
}

export function getTimeSpan(startDate: Date, end: Date) {
  const months = (end.getUTCFullYear() - startDate.getUTCFullYear()) * 12 + (end.getUTCMonth() - startDate.getUTCMonth())
  if (months < 1) {
    const days = Math.floor(Math.abs(end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return plural(days, 'day')
  }
  if (months < 12) return plural(months, 'month')
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  return remMonths === 0 ? plural(years, 'year') : `${plural(years, 'year')} ${plural(remMonths, 'month')}`
}
