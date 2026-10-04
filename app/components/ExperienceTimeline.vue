<script setup lang="ts">
const props = defineProps<{
  experiences: ProfessionalExperience[]
}>()

const buildDate = useBuildDate()

const items = computed(() => props.experiences.map(experience => ({
  ...experience,
  date: formatDateRange(experience.startDate, experience.endDate, buildDate.value),
  icon: 'i-hugeicons-briefcase-01',
})))

// Only the ongoing entry (no end date) is highlighted; finished ones stay neutral
const presentIndex = computed(() => {
  const index = items.value.findIndex(item => !item.endDate)
  return index === -1 ? undefined : index
})
</script>

<template>
  <UTimeline :items :default-value="presentIndex">
    <template #title="{ item }">
      <h3 class="text-base font-semibold text-highlighted">
        {{ item.position }}
      </h3>
      <div class="mt-1 flex flex-wrap items-center gap-2 text-sm font-normal">
        <IconLabel icon="i-hugeicons-building-03" :to="item.companyUrl">
          {{ item.company }}
        </IconLabel>
        <USeparator orientation="vertical" decorative class="h-4" />
        <IconLabel icon="i-hugeicons-pin-location-03">
          {{ item.location }}
        </IconLabel>
      </div>
    </template>
    <template #description="{ item }">
      <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm"
               v-html="item.description" />
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="tech in item.technologies" :key="tech" :label="tech" variant="soft" />
      </div>
    </template>
  </UTimeline>
</template>
