export function useDates() {
  const { t, localeProperties } = useI18n()
  const buildDate = useBuildDate()
  const language = computed(() => localeProperties.value.language ?? 'en-GB')

  const formatDate = (date: Date) => formatMonthYear(date, language.value)

  function formatSpan(start: Date, end: Date) {
    const { years, months, days } = getTimeSpan(start, end)
    if (years === 0 && months === 0) return t('time.days', days)
    return [years && t('time.years', years), months && t('time.months', months)].filter(Boolean).join(' ')
  }

  function formatDateRange(start: Date, end?: Date) {
    return `${formatDate(start)} - ${end ? formatDate(end) : t('time.present')} (${formatSpan(start, end ?? buildDate.value)})`
  }

  return { formatDate, formatDateRange }
}
