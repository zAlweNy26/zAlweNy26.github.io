/**
 * Dates in `consts.ts` are parsed as UTC midnight, so format them in UTC
 * to avoid showing the previous month to visitors west of Greenwich.
 */
export function formatMonthYear(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', timeZone: 'UTC' })
}

/** Whole calendar months between two dates, split into years and months (days only under a month) */
export function getTimeSpan(start: Date, end: Date) {
  const totalMonths = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth())
  if (totalMonths < 1)
    return { years: 0, months: 0, days: Math.floor(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) }
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12, days: 0 }
}

export function getAge(birthDate: Date, now: Date) {
  const hadBirthday = now.getUTCMonth() > birthDate.getUTCMonth()
    || (now.getUTCMonth() === birthDate.getUTCMonth() && now.getUTCDate() >= birthDate.getUTCDate())
  return now.getUTCFullYear() - birthDate.getUTCFullYear() - (hadBirthday ? 0 : 1)
}
