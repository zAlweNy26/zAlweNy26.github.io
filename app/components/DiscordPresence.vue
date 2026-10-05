<script setup lang="ts">
// Explicit: auto-imported enums are values only, and ActivityType is also used as a type here
import { ActivityType, PresenceUpdateStatus } from 'discord-api-types/v10'

const { presence, loading } = useDiscordPresence()
// For the elapsed times, which show minutes
const now = useNow({ scheduler: cb => useIntervalFn(cb, 30_000) })

const statusColors = {
  [PresenceUpdateStatus.Online]: 'success',
  [PresenceUpdateStatus.Idle]: 'warning',
  [PresenceUpdateStatus.DoNotDisturb]: 'error',
  [PresenceUpdateStatus.Offline]: 'neutral',
} as const satisfies Record<DiscordStatus, string>

// The ping is a ::before copy of the dot (same color through bg-inherit), only while not offline
const statusChipUi = computed(() => ({
  base: presence.value?.discord_status === PresenceUpdateStatus.Offline
    ? 'bg-(--ui-text-dimmed)'
    : 'relative before:absolute before:inset-0 before:rounded-full before:bg-inherit before:animate-ping motion-reduce:before:animate-none',
}))

const activityVerbs: Partial<Record<ActivityType, string>> = {
  [ActivityType.Playing]: 'discord.playing',
  [ActivityType.Streaming]: 'discord.streaming',
  [ActivityType.Listening]: 'discord.listening',
  [ActivityType.Watching]: 'discord.watching',
  [ActivityType.Competing]: 'discord.competing',
}

const custom = computed(() => presence.value && splitActivities(presence.value).custom)

const activities = computed(() => (presence.value ? splitActivities(presence.value).others : []).map(activity => ({
  ...activity,
  verb: activityVerbs[activity.type],
  largeImage: activityAssetUrl(activity.assets?.large_image, activity.application_id),
  smallImage: activityAssetUrl(activity.assets?.small_image, activity.application_id),
})))

const doingNothing = computed(() => presence.value?.discord_status !== 'offline' && !presence.value?.spotify && activities.value.length === 0)

const elapsedSince = (start: number) => formatDuration(Math.max(0, now.value.getTime() - start) / 1000)
</script>

<template>
  <div class="space-y-3">
    <div v-if="loading" class="space-y-2" :aria-label="$t('discord.loading')">
      <USkeleton class="h-4 w-32" />
      <USkeleton class="h-14 w-full" />
    </div>

    <template v-else-if="presence">
      <p class="flex items-center gap-2 text-sm">
        <UChip standalone inset size="xl" :color="statusColors[presence.discord_status]" :ui="statusChipUi" />
        <span class="text-highlighted">{{ $t(`discord.status.${presence.discord_status}`) }}</span>
        <UIcon v-if="presence.discord_status !== 'offline'" :name="presence.active_on_discord_desktop ? 'i-hugeicons-computer' : 'i-hugeicons-smart-phone-01'"
               class="size-4 text-muted" />
      </p>

      <p v-if="custom?.state || custom?.emoji" class="text-sm italic text-toned">
        <!-- Only unicode emoji: custom ones would need another image host -->
        <span v-if="custom.emoji && !custom.emoji.id">{{ custom.emoji.name }}</span>
        {{ custom.state }}
      </p>

      <SpotifyTrack v-if="presence.spotify" :track="presence.spotify" />

      <div v-for="activity in activities" :key="activity.id" class="flex gap-3 items-center">
        <div v-if="activity.largeImage" class="relative shrink-0">
          <img :src="activity.largeImage" :alt="activity.assets?.large_text ?? activity.name" class="size-14 rounded-md" loading="lazy">
          <img v-if="activity.smallImage" :src="activity.smallImage" :alt="activity.assets?.small_text ?? ''"
               class="absolute -bottom-1 -inset-e-1 size-5 rounded-full ring-2 ring-(--ui-bg-elevated)" loading="lazy">
        </div>
        <div v-else class="size-14 rounded-md bg-elevated flex items-center justify-center shrink-0">
          <UIcon name="i-hugeicons-game-controller-03" class="size-6 text-muted" />
        </div>
        <div class="min-w-0 flex-1">
          <p v-if="activity.verb" class="text-xs text-muted">
            {{ $t(activity.verb) }}
          </p>
          <p class="truncate text-sm font-semibold text-highlighted">
            {{ activity.name }}
          </p>
          <p v-if="activity.details" class="truncate text-xs text-toned">
            {{ activity.details }}
          </p>
          <p v-if="activity.state" class="truncate text-xs text-toned">
            {{ activity.state }}
          </p>
          <p v-if="activity.timestamps?.start" class="text-xs text-muted tabular-nums">
            {{ $t('discord.elapsed', { time: elapsedSince(activity.timestamps.start) }) }}
          </p>
        </div>
      </div>

      <p v-if="doingNothing" class="text-sm text-muted">
        {{ $t('discord.idle') }}
      </p>
    </template>

    <p v-else class="text-sm text-muted">
      {{ $t('discord.unavailable') }}
    </p>
  </div>
</template>
