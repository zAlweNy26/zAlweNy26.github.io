<script setup lang="ts">
const { activity } = defineProps<{
  activity: GitHubActivity
}>()

const { t, localeProperties } = useI18n()

const levelClasses: Record<ContributionLevel, string> = {
  NONE: 'bg-accented',
  FIRST_QUARTILE: 'bg-primary/30',
  SECOND_QUARTILE: 'bg-primary/55',
  THIRD_QUARTILE: 'bg-primary/80',
  FOURTH_QUARTILE: 'bg-primary',
}
const levels = Object.values(levelClasses)

// Calendar dates are plain days: format them in UTC so they never shift by one
function format(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString(localeProperties.value.language, { timeZone: 'UTC', ...options })
}

/** A month name above the first week of each month, skipped when it would overlap the previous one */
const monthLabels = computed(() => {
  let lastLabelled = -Infinity
  return activity.weeks.map((week, i) => {
    const month = week[0]?.date.slice(0, 7)
    const previous = activity.weeks[i - 1]?.[0]?.date.slice(0, 7)
    // Not in the last two columns either: there's no room after them, so the name would be cut off
    if (!week[0] || month === previous || i - lastLabelled < 3 || i > activity.weeks.length - 3) return ''
    // A partial first week would label the month before the one most of its columns show
    if (i === 0 && week[0].date.slice(8) > '24') return ''
    lastLabelled = i
    return format(week[0].date, { month: 'short' })
  })
})

const total = computed(() => activity.totalContributions.toLocaleString(localeProperties.value.language))

const stats = computed(() => [
  { label: t('activity.total'), value: total.value },
  { label: t('activity.longestStreak'), value: t('time.days', activity.streaks.longest) },
  { label: t('activity.currentStreak'), value: t('time.days', activity.streaks.current) },
])
</script>

<template>
  <div class="space-y-6">
    <dl class="grid grid-cols-3 gap-2 text-center">
      <div v-for="stat in stats" :key="stat.label" class="rounded-md bg-elevated/50 p-2">
        <dt class="text-xs sm:text-sm text-muted">
          {{ stat.label }}
        </dt>
        <dd class="text-lg sm:text-xl font-bold text-highlighted">
          {{ stat.value }}
        </dd>
      </div>
    </dl>

    <div class="space-y-2">
      <!-- rtl: on narrow screens the scroll starts at the end, showing the latest weeks -->
      <div dir="rtl" class="overflow-x-auto pb-1">
        <!-- Columns stretch to fill the card, down to 11px cells before scrolling -->
        <div dir="ltr" role="img" :aria-label="t('activity.calendarLabel', { n: total })"
             class="flex flex-col gap-1 w-max min-w-full">
          <div class="flex gap-[3px] text-xs text-muted h-4" aria-hidden="true">
            <!-- Absolute, so a label overflows into the next columns instead of widening its own -->
            <span v-for="(label, i) in monthLabels" :key="i" class="relative flex-1 basis-0 min-w-[11px]">
              <span class="absolute whitespace-nowrap">{{ label }}</span>
            </span>
          </div>
          <div class="flex gap-[3px]">
            <div v-for="(week, i) in activity.weeks" :key="i" class="flex flex-1 basis-0 min-w-[11px] flex-col gap-[3px]" :class="{ 'justify-end': i === 0 }">
              <span v-for="day in week" :key="day.date" :class="levelClasses[day.contributionLevel]"
                    class="w-full aspect-square rounded-[2px]"
                    :title="t('activity.day', { count: day.contributionCount, date: format(day.date, { dateStyle: 'medium' }) }, day.contributionCount)" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-[3px] text-xs text-muted" aria-hidden="true">
        <span class="me-1">{{ $t('activity.less') }}</span>
        <span v-for="level in levels" :key="level" :class="level" class="size-[11px] rounded-[2px]" />
        <span class="ms-1">{{ $t('activity.more') }}</span>
      </div>
    </div>

    <div v-if="activity.languages.length > 0" class="space-y-3">
      <h3 class="text-base font-semibold text-highlighted">
        {{ $t('activity.languages') }}
      </h3>
      <div class="flex h-3 overflow-hidden rounded-full bg-accented" aria-hidden="true">
        <span v-for="lang in activity.languages" :key="lang.name" :style="{ width: `${lang.percent}%`, backgroundColor: lang.color }" />
      </div>
      <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <li v-for="lang in activity.languages" :key="lang.name" class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full" :style="{ backgroundColor: lang.color }" />
          <span class="text-highlighted">{{ lang.name === OTHER_LANGUAGES ? $t('activity.other') : lang.name }}</span>
          <span class="text-muted">{{ lang.percent.toLocaleString(localeProperties.language) }}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>
