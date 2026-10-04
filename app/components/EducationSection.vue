<script setup lang="ts">
defineProps<{
  experience: EducationalExperience
}>()
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
            <UIcon name="i-hugeicons-university" class="size-5" />
            {{ experience.institution }}
          </span>
        </p>
      </div>
      <p class="text-sm text-muted whitespace-nowrap">
        <span class="capitalize">{{ formatMonthYear(experience.startDate) }}</span>
        -
        <span class="capitalize">{{ experience.endDate ? formatMonthYear(experience.endDate) : 'Present' }}</span>
        ({{ getTimeSpan(experience.startDate, experience.endDate) }})
      </p>
    </div>
    <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm"
             v-html="parseMarkdown(experience.description)" />
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(skill, i) in experience.skills" :key="i" :label="skill" variant="soft" />
    </div>
  </div>
</template>
