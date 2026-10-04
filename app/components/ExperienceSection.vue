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
        <p class="text-toned justify-start flex flex-wrap gap-2 text-sm">
          <ULink external :to="experience.companyUrl" target="_blank"
                 class="group inline-flex text-highlighted items-center gap-2">
            <UIcon name="i-hugeicons-briefcase-01" class="size-5" />
            <span class="group-hover:text-primary transition-colors">{{ experience.company }}</span>
          </ULink>
          <UChip standalone inset size="2xs" />
          <span class="group inline-flex text-highlighted items-center gap-2">
            <UIcon name="i-hugeicons-pin-location-03" class="size-5" />
            {{ experience.location }}
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
      <UBadge v-for="(tech, i) in experience.technologies" :key="i" :label="tech" variant="soft" />
    </div>
  </div>
</template>
