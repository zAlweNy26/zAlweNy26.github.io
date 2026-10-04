<script setup lang="ts">
const props = defineProps<{
  education: EducationalExperience<string>[]
}>()

const { formatDateRange } = useDates()

const items = computed(() => props.education.map(entry => ({
  ...entry,
  date: formatDateRange(entry.startDate, entry.endDate),
  icon: 'i-hugeicons-mortarboard-02',
})))

const presentIndex = computed(() => {
  const index = items.value.findIndex(item => !item.endDate)
  return index === -1 ? undefined : index
})
</script>

<template>
  <UTimeline :items :default-value="presentIndex">
    <template #title="{ item }">
      <h3 class="text-base font-semibold text-highlighted">
        {{ item.degree }}
      </h3>
      <div class="mt-1 text-sm font-normal">
        <IconLabel icon="i-hugeicons-university">
          {{ item.institution }}
        </IconLabel>
      </div>
    </template>
    <template #description="{ item }">
      <article class="leading-relaxed prose prose-neutral prose-p:m-0 prose-ul:m-0 dark:prose-invert max-w-none text-sm print:hidden"
               v-html="item.description" />
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="skill in item.skills" :key="skill" :label="skill" variant="soft" />
      </div>
    </template>
  </UTimeline>
</template>
