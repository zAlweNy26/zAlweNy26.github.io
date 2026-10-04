<script setup lang="ts">
defineProps<{
  skills: { category: string, skills: string[] }[]
}>()
</script>

<template>
  <div class="space-y-2">
    <div v-for="{ category, skills: items } in skills" :key="category" class="flex gap-2 items-center print:break-inside-avoid">
      <strong>{{ $t(`skills.${category}`) }}:</strong>
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="skill in items" :key="skill" :label="skill" variant="soft" />
      </div>
    </div>
  </div>
</template>
