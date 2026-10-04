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
        <div class="text-toned text-sm">
          <IconLabel icon="i-hugeicons-university">
            {{ experience.institution }}
          </IconLabel>
        </div>
      </div>
      <DateRange :start="experience.startDate" :end="experience.endDate" />
    </div>
    <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm"
             v-html="experience.description" />
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(skill, i) in experience.skills" :key="i" :label="skill" variant="soft" />
    </div>
  </div>
</template>
