<script setup lang="ts">
defineProps<{
  start: Date
  end?: Date
}>()

const buildDate = useBuildDate()
</script>

<template>
  <p class="text-sm text-muted whitespace-nowrap">
    {{ formatMonthYear(start) }} - {{ end ? formatMonthYear(end) : 'Present' }}
    ({{ getTimeSpan(start, end ?? buildDate) }})
  </p>
</template>
