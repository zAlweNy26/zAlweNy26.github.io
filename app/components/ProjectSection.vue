<script setup lang="ts">
const { repo } = defineProps<{
  repo: GitHubRepository
}>()

const { data: languages } = await useFetch(repo.languages_url, {
  transform: (data: Record<string, number>) => {
    const res = {
      list: Object.entries(data).sort(([, a], [, b]) => b - a).map(([lang]) => lang),
      fetchedAt: new Date(),
    }
    window.localStorage.setItem(`cache:languages:${repo.name}`, JSON.stringify(res))
    return res
  },
  key: `languages:${repo.name}`,
  getCachedData,
  default: () => ({
    list: [] as string[],
    fetchedAt: new Date(),
  }),
})

function getLastUpdate(date?: string | null) {
  if (!date) return 'Unknown'
  const updatedDate = new Date(date)
  return `Last Update: ${updatedDate.toLocaleDateString('en-GB')}`
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
      <p class="text-toned justify-start flex flex-wrap gap-2 text-sm">
        <template v-if="repo.homepage">
          <ULink external :to="repo.homepage" target="_blank"
                 class="group inline-flex text-highlighted items-center gap-2">
            <UIcon name="i-hugeicons-link-04" class="size-5" />
            <span class="group-hover:text-primary transition-colors">Demo</span>
          </ULink>
          <UChip standalone inset size="2xs" />
        </template>
        <ULink external :to="repo.html_url" target="_blank"
               class="group inline-flex text-highlighted items-center gap-2">
          <UIcon name="i-hugeicons-github-01" class="size-5" />
          <span class="group-hover:text-primary transition-colors">Code</span>
        </ULink>
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <UBadge v-for="(lang, i) in languages.list" :key="i" :label="lang" variant="soft" />
    </div>
  </div>
</template>
