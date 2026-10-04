<script setup lang="ts">
const props = defineProps<{
  profile: GitHubProfile
  /** Live position, fetched in the browser */
  location?: string | null
  age: number
  /** HTML with an `{age}` placeholder */
  story: string
  summary: string
}>()

const storyHtml = computed(() => props.story.replace('{age}', String(props.age)))

const mapsUrl = (place: string) => `https://google.com/maps/place/${place.replaceAll(' ', '+')}`
</script>

<template>
  <UCard variant="subtle" class="print:bg-transparent">
    <div class="flex justify-between gap-4">
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-4">
          <h1 class="text-3xl md:text-4xl font-bold text-highlighted">
            {{ profile.name }}
          </h1>
          <ULink v-if="location" external :to="mapsUrl(location)" target="_blank"
                 class="group inline-flex text-highlighted items-center gap-2 print:hidden">
            <span class="relative inline-flex items-center">
              <span class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span class="h-8 w-8 rounded-full bg-primary/30 animate-ping motion-reduce:animate-none" />
              </span>
              <UIcon name="i-hugeicons-pin-location-03" class="size-8 text-primary relative z-10" />
            </span>
            <span class="ms-2 flex flex-col italic">
              <span class="text-xs text-muted font-semibold">{{ $t('profile.livePosition') }}</span>
              <span class="group-hover:text-primary transition-colors">{{ location }}</span>
            </span>
          </ULink>
        </div>
        <p class="text-base md:text-lg font-medium print:text-base">
          Lead Frontend Developer
        </p>
        <div v-if="profile.followers > 0 || profile.following > 0" class="flex flex-wrap items-center print:hidden gap-2 text-sm">
          <UIcon name="i-hugeicons-user-group" class="size-5" />
          <p><strong>{{ profile.followers }}</strong> {{ $t('profile.followers', profile.followers) }}</p>
          <USeparator orientation="vertical" decorative class="h-4" />
          <p><strong>{{ profile.following }}</strong> {{ $t('profile.following') }}</p>
        </div>
        <div class="items-center flex flex-wrap gap-2 text-sm">
          <IconLabel icon="i-hugeicons-mail-01" :to="`mailto:${profile.email}`">
            {{ profile.email }}
          </IconLabel>
          <USeparator orientation="vertical" decorative class="h-4" />
          <IconLabel icon="i-hugeicons-pin-location-03" :to="mapsUrl(profile.location)">
            {{ profile.location }}
          </IconLabel>
        </div>
        <div class="items-center flex flex-wrap gap-2 text-sm">
          <template v-for="(link, index) in socialLinks" :key="link.label">
            <USeparator v-if="index > 0" orientation="vertical" decorative class="h-4" />
            <IconLabel :icon="link.icon" :to="link.to">
              {{ link.label }}
            </IconLabel>
          </template>
        </div>
      </div>
      <div class="shrink-0">
        <ImageSpotlight baseImage="/me_jojo.webp" spotlightImage="/me.webp"
                        :alt="profile.name" class="size-30 md:size-40 rounded-full object-cover" />
        <p class="text-sm text-center select-none print:hidden text-muted italic">
          <span class="pointer-coarse:hidden">{{ $t('profile.hover') }}</span>
          <span class="hidden pointer-coarse:inline">{{ $t('profile.touch') }}</span>
        </p>
      </div>
    </div>
    <template #footer>
      <h2 class="font-semibold text-lg md:text-xl text-highlighted leading-loose">
        {{ $t('sections.about') }}
      </h2>
      <!-- The full story is for the website, the printed CV gets a short professional summary -->
      <p class="hidden print:block text-sm text-toned">
        {{ summary }}
      </p>
      <div class="text-sm md:text-base text-toned space-y-2 print:hidden" v-html="storyHtml" />
    </template>
  </UCard>
</template>
