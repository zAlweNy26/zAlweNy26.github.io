<script setup lang="ts">
const { summary } = defineProps<{
  summary: WakaTimeSummary
}>()

const { t, localeProperties } = useI18n()

// WakaTime has no language colors: shades of the theme color, most used first
const shades = [100, 70, 45, 25].map(alpha => `color-mix(in oklab, var(--ui-primary) ${alpha}%, transparent)`)
const languageItems = computed(() => summary.languages.map((lang, i) => ({ label: lang.name, value: lang.seconds, color: shades[i] })))

const busiest = computed(() => Math.max(...summary.days.map(day => day.seconds), 1))

// Calendar dates are plain days: format them in UTC so they never shift by one
function format(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString(localeProperties.value.language, { timeZone: 'UTC', ...options })
}

const stats = computed(() => [
  { label: t('wakatime.total'), value: formatDuration(summary.totalSeconds) },
  { label: t('wakatime.average'), value: formatDuration(summary.dailyAverage) },
])
</script>

<template>
  <div class="space-y-4">
    <dl class="grid grid-cols-2 gap-2 text-center">
      <div v-for="stat in stats" :key="stat.label" class="rounded-md bg-elevated/50 p-2">
        <dt class="text-xs text-muted">
          {{ stat.label }}
        </dt>
        <dd class="text-lg font-bold text-highlighted tabular-nums">
          {{ stat.value }}
        </dd>
      </div>
    </dl>

    <div class="flex items-end gap-1.5 h-16" role="img" :aria-label="t('wakatime.chartLabel', { total: formatDuration(summary.totalSeconds) })">
      <UTooltip v-for="day in summary.days" :key="day.date" arrow
                :text="`${format(day.date, { weekday: 'long', day: 'numeric', month: 'short' })}: ${formatDuration(day.seconds)}`">
        <div class="flex-1 flex flex-col items-center gap-1 h-full">
          <!-- inverted: a vertical progress fills from the top otherwise -->
          <UProgress :model-value="day.seconds" :max="busiest" orientation="vertical" inverted
                     :ui="{ root: 'w-full flex-1 min-h-0', base: 'w-full rounded-sm bg-transparent', indicator: 'rounded-sm bg-primary/80' }" />
          <span class="text-[10px] text-muted uppercase" aria-hidden="true">{{ format(day.date, { weekday: 'narrow' }) }}</span>
        </div>
      </UTooltip>
    </div>

    <!-- The bar adds up to the whole period: what's left over is the other languages -->
    <UProgressGroup v-if="summary.languages.length > 0" :items="languageItems" :max="summary.totalSeconds">
      <template #item-trailing="{ item }">
        {{ formatDuration(item.value ?? 0) }}
      </template>
    </UProgressGroup>
  </div>
</template>
