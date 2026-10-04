<script setup lang="ts">
const { repo } = defineProps<{
  repo: GitHubRepository
}>()

function getLastUpdate(date?: string | null) {
  if (!date) return 'Unknown'
  const updatedDate = new Date(date)
  return `Last Update: ${updatedDate.toLocaleDateString('en-GB', { timeZone: 'UTC' })}`
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-start gap-2 justify-between">
      <div class="space-y-4">
        <h3 class="text-base font-semibold text-highlighted">
          {{ repo.name }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <UBadge :label="getLastUpdate(repo.updated_at)" color="neutral" class="print:bg-transparent"
                  variant="soft" :ui="{ leadingIcon: 'text-warning' }" />
          <UBadge :label="repo.stargazers_count" icon="i-hugeicons-star" color="neutral" class="print:bg-transparent"
                  variant="soft" :ui="{ leadingIcon: 'text-warning' }" />
        </div>
      </div>
      <div class="text-toned justify-start flex flex-wrap gap-2 text-sm">
        <template v-if="repo.homepage">
          <IconLabel icon="i-hugeicons-link-04" :to="repo.homepage">
            Demo
          </IconLabel>
          <UChip standalone inset size="2xs" />
        </template>
        <IconLabel icon="i-hugeicons-github-01" :to="repo.html_url">
          Code
        </IconLabel>
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(lang, i) in repo.languages" :key="i" :label="lang" variant="soft" />
    </div>
  </div>
</template>
