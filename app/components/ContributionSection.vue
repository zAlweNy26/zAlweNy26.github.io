<script setup lang="ts">
defineProps<{
  contribution: ContributionSummary
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-start gap-2 justify-between">
      <div class="space-y-2">
        <h3 class="text-base font-semibold text-highlighted">
          <ULink external :to="contribution.repoUrl" target="_blank"
                 class="group inline-flex text-highlighted items-center gap-2">
            <UIcon name="i-hugeicons-github-01" class="size-5" />
            <span class="group-hover:text-primary transition-colors">{{ contribution.repoFullName }}</span>
          </ULink>
        </h3>
        <div class="flex flex-wrap gap-2">
          <UBadge :label="`PR merged: ${contribution.prCount}`" color="neutral" class="print:bg-transparent" variant="soft" />
          <UBadge icon="i-hugeicons-star" :label="contribution.stars" color="neutral"
                  class="print:bg-transparent" variant="soft" :ui="{ leadingIcon: 'text-warning' }" />
        </div>
      </div>
    </div>
    <div v-if="contribution.recentPrs.length > 0" class="space-y-2 text-sm">
      <p class="text-muted">
        Recent PRs
      </p>
      <div class="flex flex-col gap-2">
        <ULink v-for="pr in contribution.recentPrs" :key="pr.url" external :to="pr.url" target="_blank"
               class="group flex text-highlighted items-center gap-2 w-full">
          <UIcon name="i-hugeicons-link-04" class="size-4" />
          <span class="group-hover:text-primary transition-colors truncate min-w-0 flex-1">
            {{ pr.title }}
          </span>
        </ULink>
      </div>
    </div>
  </div>
</template>
