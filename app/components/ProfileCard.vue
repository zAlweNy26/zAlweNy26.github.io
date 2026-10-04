<script setup lang="ts">
defineProps<{
  profile: GitHubProfile
  /** Live position, fetched in the browser */
  location?: string | null
  age: number
}>()

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
              <span class="text-xs text-muted font-semibold">Live position</span>
              <span class="group-hover:text-primary transition-colors">{{ location }}</span>
            </span>
          </ULink>
        </div>
        <p class="text-base md:text-lg font-medium print:text-base">
          Lead Frontend Developer
        </p>
        <div v-if="profile.followers > 0 || profile.following > 0" class="flex flex-wrap items-center print:hidden gap-2 text-sm">
          <UIcon name="i-hugeicons-user-group" class="size-5" />
          <p><strong>{{ profile.followers }}</strong> followers</p>
          <UChip standalone inset size="2xs" />
          <p><strong>{{ profile.following }}</strong> following</p>
        </div>
        <div class="items-center flex flex-wrap gap-2 text-sm">
          <IconLabel icon="i-hugeicons-mail-01" :to="`mailto:${profile.email}`">
            {{ profile.email }}
          </IconLabel>
          <UChip standalone inset size="2xs" />
          <IconLabel icon="i-hugeicons-pin-location-03" :to="mapsUrl(profile.location)">
            {{ profile.location }}
          </IconLabel>
        </div>
        <div class="items-center flex flex-wrap gap-2 text-sm">
          <template v-for="(link, index) in socialLinks" :key="link.label">
            <UChip v-if="index > 0" standalone inset size="2xs" />
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
          <span class="pointer-coarse:hidden">Hover me!</span>
          <span class="hidden pointer-coarse:inline">Touch me!</span>
        </p>
      </div>
    </div>
    <template #footer>
      <h2 class="font-semibold text-lg md:text-xl text-highlighted leading-loose">
        About Me
      </h2>
      <!-- The full story is for the website, the printed CV gets a short professional summary -->
      <p class="hidden print:block text-sm text-toned">
        Developer with a lifelong passion for programming and a curiosity that led me through many languages before
        finding my home on the web. I value simplicity, clean code and consistent design, and I like building things
        that anyone can use just by opening a browser.
      </p>
      <p class="text-sm md:text-base text-toned print:hidden">
        I'm <strong>{{ age }}</strong> years old born in
        <span
          class="bg-clip-text text-transparent font-bold bg-linear-[45deg,#fff100_50%,#ed141e_50%]">Sicily</span>,
        <strong
          class="bg-clip-text text-transparent font-bold bg-linear-[90deg,#009246_33%,#ffffff_33%,#ffffff_61%,#ce2b37_61%]">Italy</strong>.
        I first discovered the magical world of programming at the age of <strong>12</strong>.
        Obviously the first programs I did were nothing special (Visual Basic in my ❤️),
        but it was thanks to my consistency that I understood that programming was something else, something more
        powerful than this.<br>
        I tried many programming languages over the years, from <strong>C</strong> to <strong>Java</strong>,
        from <strong>C#</strong> to <strong>Kotlin</strong>, but the one that really fascinated me was
        <strong>JavaScript</strong>, the language of the web.
        I fell in love with the idea of being able to create something that could be used by anyone, anywhere in the world,
        just by opening a browser.<br>
        After mastering the basics of web development, I started to explore the world of frameworks,
        discovering <strong>Vue.js</strong> which I fell in love with immediately due to its simplicity and flexibility.
        Since then, I have been using it for every one of my projects. 💚
      </p>
    </template>
  </UCard>
</template>
