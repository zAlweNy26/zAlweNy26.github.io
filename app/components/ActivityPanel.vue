<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const { data: activity, status } = useActivity()
const { githubMonths } = useAppConfig().activity
// lg is where the page puts the panel in a side column (pages/index.vue)
const inSideColumn = useBreakpoints(breakpointsTailwind).greaterOrEqual('lg')
const months = computed(() => inSideColumn.value ? githubMonths.side : githubMonths.stacked)
const github = computed(() => activity.value?.github ? toGitHubActivity(activity.value.github, months.value) : null)
const loading = computed(() => status.value === 'idle' || status.value === 'pending')
</script>

<template>
  <SectionCard :title="$t('sections.activity')" class="print:hidden lg:flex lg:flex-col lg:max-h-[calc(100dvh-5rem)]"
               body-class="lg:min-h-0 lg:overflow-y-auto lg:[scrollbar-width:thin]">
    <div class="space-y-4">
      <DiscordPresence />

      <div v-if="loading" class="space-y-3" :aria-label="$t('activity.loading')">
        <USeparator decorative />
        <USkeleton class="h-5 w-40" />
        <USkeleton class="h-16 w-full" />
        <USkeleton class="h-24 w-full" />
      </div>

      <template v-if="activity?.wakatime">
        <USeparator decorative />
        <h3 class="flex items-center gap-2 text-base font-semibold text-highlighted">
          <UIcon name="i-hugeicons-code" class="size-4 text-primary" />
          {{ $t('activity.coding') }}
        </h3>
        <WakaTimeStats :summary="activity.wakatime" />
      </template>

      <template v-if="github">
        <USeparator decorative />
        <h3 class="flex items-center gap-2 text-base font-semibold text-highlighted">
          <UIcon name="i-hugeicons-github" class="size-4 text-primary" />
          {{ $t('activity.github', months) }}
        </h3>
        <GitHubActivity :activity="github" />
      </template>
    </div>
  </SectionCard>
</template>
