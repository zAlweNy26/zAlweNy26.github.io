<script setup lang="ts">
defineProps<{
  experience: EducationalExperience
}>()

function getTimeSpan(startDate: Date, endDate?: Date) {
  const end = endDate || new Date()
  const months = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth())
  if (months < 1) {
    const diffTime = Math.abs(end.getTime() - startDate.getTime())
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return `${days} day${days !== 1 ? 's' : ''}`
  }
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  return remMonths === 0
    ? `${years} year${years !== 1 ? 's' : ''}`
    : `${years} year${years !== 1 ? 's' : ''} ${remMonths} month${remMonths !== 1 ? 's' : ''}`
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2 items-start justify-between">
      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          {{ experience.degree }}
        </h3>
        <p class="text-toned justify-start flex flex-wrap gap-2 text-sm">
          <span class="group inline-flex text-highlighted items-center gap-2">
            <UIcon name="i-hugeicons-pin-location-03" class="size-5" />
            {{ experience.institution }}
          </span>
        </p>
      </div>
      <p class="text-sm text-muted whitespace-nowrap">
        <span class="capitalize">{{ experience.startDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }) }}</span>
        -
        <span class="capitalize">{{ experience.endDate?.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }) || 'Present' }}</span>
        ({{ getTimeSpan(experience.startDate, experience.endDate) }})
      </p>
    </div>
    <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm"
             v-html="markdown.render(experience.description)" />
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(skill, i) in experience.skills" :key="i" :label="skill" variant="soft" />
    </div>
  </div>
</template>
