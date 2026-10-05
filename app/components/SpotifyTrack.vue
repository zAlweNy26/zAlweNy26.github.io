<script setup lang="ts">
defineProps<{
  track: SpotifyPresence
}>()
</script>

<template>
  <div class="flex gap-3 items-center">
    <img v-if="track.album_art_url" :src="track.album_art_url" :alt="track.album" class="size-14 rounded-md shrink-0" loading="lazy">
    <div class="min-w-0 flex-1 space-y-1">
      <p class="text-xs text-muted flex items-center gap-1">
        <UIcon name="i-hugeicons-spotify" class="size-3.5 text-success" />
        {{ $t('discord.spotify') }}
      </p>
      <ULink v-if="track.track_id" :to="`https://open.spotify.com/track/${track.track_id}`" external target="_blank"
             class="block truncate text-sm font-semibold text-highlighted hover:text-primary">
        {{ track.song }}
      </ULink>
      <p v-else class="truncate text-sm font-semibold text-highlighted">
        {{ track.song }}
      </p>
      <p class="truncate text-xs text-toned">
        {{ track.artist }}
      </p>
    </div>
  </div>
</template>
