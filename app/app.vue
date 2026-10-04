<script setup lang="ts">
const username = GITHUB_USERNAME
const description = 'Portfolio of DanyAlwe, showcasing web development projects and skills.'
const site = useSiteConfig()
const ogImage = `${site.url}/og-image.png`
const title = 'DanyAlwe'

const buildDate = useBuildDate()
const birthDate = new Date('2001-02-20')
const age = computed(() => {
  const now = buildDate.value
  const hadBirthday = now.getUTCMonth() > birthDate.getUTCMonth()
    || (now.getUTCMonth() === birthDate.getUTCMonth() && now.getUTCDate() >= birthDate.getUTCDate())
  return now.getUTCFullYear() - birthDate.getUTCFullYear() - (hadBirthday ? 0 : 1)
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})

useSeoMeta({
  title,
  titleTemplate: t => t ? `${t} · Portfolio` : `DanyAlwe · Portfolio`,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogType: 'website',
  ogUrl: site.url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterCard: 'summary',
})

const [profileRes, reposRes, contributionsRes, resumeRes] = await Promise.all([
  useGitHubProfile(),
  useGitHubRepos(),
  useGitHubContributions(),
  useResume(),
])
const { data: profile } = profileRes, { data: repos } = reposRes
const { data: contributions } = contributionsRes, { data: resume } = resumeRes

// Fail the static build rather than deploy a page with missing sections (e.g. GitHub rate limit)
if (import.meta.prerender) {
  const failed = [profileRes, reposRes, contributionsRes, resumeRes].find(res => res.error.value)
  if (failed) throw createError({ statusCode: 500, message: `Prerender data fetch failed: ${failed.error.value?.message}`, fatal: true })
}

// The live position changes all the time, so it's the only data fetched in the browser
const { data: location } = useFetch('https://location.danyalwe.me/api/location', {
  key: 'location',
  server: false,
  lazy: true,
  transform: (data: { location: string }) => data.location,
})

function handlePrint() {
  window.print()
}
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300 }">
    <MotionConfig reduced-motion="user">
      <BlurReveal class="min-h-screen max-w-4xl mx-auto p-4 space-y-4 not-print:pt-16 print:p-0 print:max-w-none selection:bg-primary selection:text-neutral-900">
        <UCard variant="subtle" class="print:bg-transparent">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between gap-4">
              <div class="space-y-4">
                <div class="flex flex-wrap items-center gap-4">
                  <h1 class="text-3xl md:text-4xl font-bold text-highlighted">
                    {{ profile?.name || 'Daniele Nicosia' }}
                  </h1>
                  <ULink v-if="location" external :to="`https://google.com/maps/place/${location.replaceAll(' ', '+')}`" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2 print:hidden">
                    <span class="relative inline-flex items-center">
                      <span class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span class="h-8 w-8 rounded-full bg-primary/30 animate-ping motion-reduce:animate-none" />
                      </span>
                      <UIcon name="i-hugeicons-pin-location-03" class="size-8 text-primary relative z-10" />
                    </span>
                    <p class="ms-2 flex flex-col italic">
                      <span class="text-xs text-muted font-semibold">Live position</span>
                      <span class="group-hover:text-primary transition-colors">{{ location }}</span>
                    </p>
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
                  <ULink external :to="`mailto:${profile.email}`" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-mail-01" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">{{ profile.email }}</span>
                  </ULink>
                  <UChip standalone inset size="2xs" />
                  <ULink external :to="`https://google.com/maps/place/${profile.location.replaceAll(' ', '+')}`" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-pin-location-03" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">{{ profile.location }}</span>
                  </ULink>
                </div>
                <div class="items-center flex flex-wrap gap-2 text-sm">
                  <ULink external to="https://linkedin.com/in/daniele-nicosia" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-linkedin-02" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">LinkedIn</span>
                  </ULink>
                  <UChip standalone inset size="2xs" />
                  <ULink external :to="`https://github.com/${username}`" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-github" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">GitHub</span>
                  </ULink>
                  <UChip standalone inset size="2xs" />
                  <ULink external to="https://www.instagram.com/dany_alwe" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-instagram" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">Instagram</span>
                  </ULink>
                  <UChip standalone inset size="2xs" />
                  <ULink external to="https://paypal.me/danyalwe" target="_blank"
                         class="group inline-flex text-highlighted items-center gap-2">
                    <UIcon name="i-hugeicons-paypal" class="size-5" />
                    <span class="group-hover:text-primary transition-colors">PayPal</span>
                  </ULink>
                </div>
              </div>
              <div class="shrink-0">
                <ImageSpotlight baseImage="/me_jojo.webp" spotlightImage="/me.webp"
                                :alt="profile.name || 'Profile Picture'" class="size-30 md:size-40 rounded-full object-cover" />
                <p class="text-sm text-center select-none print:hidden text-muted italic">
                  <span class="pointer-coarse:hidden">Hover me!</span>
                  <span class="hidden pointer-coarse:inline">Touch me!</span>
                </p>
              </div>
            </div>
          </div>
          <template #footer>
            <h2 class="font-semibold text-lg md:text-xl text-highlighted leading-loose">
              About Me
            </h2>
            <p class="text-sm md:text-base text-toned print:text-sm">
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
        <UCard as="section" variant="subtle" class="print:bg-transparent" :ui="{ body: 'space-y-8' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Professional Experience
            </h2>
          </template>
          <ExperienceSection v-for="(experience, index) in resume.experiences" :key="index" :experience />
        </UCard>
        <UCard v-if="repos.length > 0" as="section" variant="subtle" class="print:hidden" :ui="{ body: 'grid grid-cols-2 md:grid-cols-3 gap-4' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Personal Projects
            </h2>
          </template>
          <SpecialCard v-for="(repo, index) in repos" :key="index">
            <ProjectSection :repo />
          </SpecialCard>
        </UCard>
        <UCard v-if="contributions.length > 0" as="section" variant="subtle" class="print:hidden" :ui="{ body: 'grid grid-cols-1 md:grid-cols-2 gap-4' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Open Source Contributions
            </h2>
          </template>
          <SpecialCard v-for="(contribution, index) in contributions" :key="index">
            <ContributionSection :contribution />
          </SpecialCard>
        </UCard>
        <UCard as="section" variant="subtle" class="print:bg-transparent" :ui="{ body: 'space-y-2' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Skills
            </h2>
          </template>
          <div v-for="(skills, env) in categorySkills" :key="env" class="flex gap-2 items-center">
            <strong>{{ env }}:</strong>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="(lang, index) in skills" :key="index" :label="lang" variant="soft" />
            </div>
          </div>
        </UCard>
        <UCard as="section" variant="subtle" class="print:bg-transparent" :ui="{ body: 'space-y-8' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Education
            </h2>
          </template>
          <EducationSection v-for="(experience, index) in resume.education" :key="index" :experience />
        </UCard>
        <UCard as="section" variant="subtle" class="print:bg-transparent" :ui="{ body: 'grid grid-cols-2 gap-4' }">
          <template #header>
            <h2 class="text-xl md:text-2xl font-bold text-highlighted leading-loose">
              Certifications
            </h2>
          </template>
          <SpecialCard v-for="(certificate, index) in certifications" :key="index">
            <CertificationSection :certificate />
          </SpecialCard>
        </UCard>
        <p class="text-muted print:hidden text-sm text-center">
          Copyright © {{ new Date(profile.created_at).getFullYear() }} - {{ buildDate.getFullYear() }} by {{ username }}
        </p>
        <p class="text-muted print:hidden text-xs text-center">
          v{{ $config.public.version }}
        </p>
        <p class="text-muted hidden print:block text-center">
          I authorise the processing of the personal data in my CV in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR).
        </p>
      </BlurReveal>
    </MotionConfig>
    <ThemeButton />
    <UTooltip arrow text="Print" class="no-print">
      <UButton class="fixed bottom-4 right-4 rounded-full no-print z-50" size="lg" square icon="i-hugeicons-printer"
               aria-label="Print" @click="handlePrint" />
    </UTooltip>
  </UApp>
</template>
