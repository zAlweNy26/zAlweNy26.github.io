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

const languageItems = computed(() => activity.languages.map(lang => ({
  label: lang.name === OTHER_LANGUAGES ? t('activity.other') : lang.name,
  value: lang.percent,
  color: lang.color,
})))

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
      <div v-for="stat in stats" :key="stat.label" class="rounded-md bg-elevated/50 px-1.5 py-1">
        <dt class="text-2xs text-muted">
          {{ stat.label }}
        </dt>
        <dd class="text-sm font-bold text-highlighted whitespace-nowrap">
          {{ stat.value }}
        </dd>
      </div>
    </dl>

    <!-- rtl: if a narrow screen can't fit it, the scroll starts at the end, showing the latest weeks -->
    <div dir="rtl" class="overflow-x-auto pb-1">
      <div dir="ltr" class="w-max mx-auto space-y-2">
        <div role="img" :aria-label="t('activity.calendarLabel', { n: total })" class="flex flex-col gap-1">
          <div class="flex gap-0.75 text-xs text-muted h-4" aria-hidden="true">
            <!-- Absolute, so a label overflows into the next columns instead of widening its own -->
            <span v-for="(label, i) in monthLabels" :key="i" class="relative w-[11px] shrink-0">
              <span class="absolute whitespace-nowrap">{{ label }}</span>
            </span>
          </div>
          <div class="flex gap-[3px]">
            <div v-for="(week, i) in activity.weeks" :key="i" class="flex flex-col gap-[3px] w-[11px] shrink-0" :class="{ 'justify-end': i === 0 }">
              <UTooltip v-for="day in week" :key="day.date" arrow
                        :text="t('activity.day', { count: day.contributionCount, date: format(day.date, { dateStyle: 'medium' }) }, day.contributionCount)">
                <span :class="levelClasses[day.contributionLevel]" class="size-[11px] rounded-[2px]" />
              </UTooltip>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-[3px] text-xs text-muted" aria-hidden="true">
          <span class="me-1">{{ $t('activity.less') }}</span>
          <span v-for="level in levels" :key="level" :class="level" class="size-[11px] rounded-[2px]" />
          <span class="ms-1">{{ $t('activity.more') }}</span>
        </div>
      </div>
    </div>

    <div v-if="activity.languages.length > 0" class="space-y-3">
      <h4 class="text-sm font-semibold text-highlighted">
        {{ $t('activity.languages') }}
      </h4>
      <UProgressGroup :items="languageItems">
        <template #item-trailing="{ item }">
          {{ item.value?.toLocaleString(localeProperties.language) }}%
        </template>
      </UProgressGroup>
    </div>
  </div>
</template>
