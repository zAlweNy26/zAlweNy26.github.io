<script setup lang="ts">
defineProps<{
  experience: ProfessionalExperience
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2 items-start justify-between">
      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          {{ experience.position }}
        </h3>
        <div class="text-toned justify-start flex flex-wrap gap-2 text-sm">
          <IconLabel icon="i-hugeicons-briefcase-01" :to="experience.companyUrl">
            {{ experience.company }}
          </IconLabel>
          <UChip standalone inset size="2xs" />
          <IconLabel icon="i-hugeicons-pin-location-03">
            {{ experience.location }}
          </IconLabel>
        </div>
      </div>
      <DateRange :start="experience.startDate" :end="experience.endDate" />
    </div>
    <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm"
             v-html="experience.description" />
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(tech, i) in experience.technologies" :key="i" :label="tech" variant="soft" />
    </div>
  </div>
</template>
