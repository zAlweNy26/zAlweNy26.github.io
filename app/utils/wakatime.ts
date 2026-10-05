export interface WakaTimeSummaryDay {
  grand_total: { total_seconds: number }
  languages: { name: string, total_seconds: number }[]
  range: { date: string }
}

export interface WakaTimeSummary {
  totalSeconds: number
  dailyAverage: number
  days: { date: string, seconds: number }[]
  languages: { name: string, seconds: number, percent: number }[]
}

/** Totals for the period: time per day and the most used languages (projects are left out, they can be private) */
export function summarizeWakaTime(days: WakaTimeSummaryDay[], limit = 4): WakaTimeSummary {
  const totalSeconds = days.reduce((sum, day) => sum + day.grand_total.total_seconds, 0)

  const languages = new Map<string, number>()
  for (const { name, total_seconds } of days.flatMap(day => day.languages))
    languages.set(name, (languages.get(name) ?? 0) + total_seconds)

  return {
    totalSeconds,
    dailyAverage: days.length > 0 ? totalSeconds / days.length : 0,
    days: days.map(day => ({ date: day.range.date, seconds: day.grand_total.total_seconds })),
    languages: [...languages.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, seconds]) => ({ name, seconds, percent: totalSeconds > 0 ? Math.round(seconds / totalSeconds * 100) : 0 })),
  }
}
