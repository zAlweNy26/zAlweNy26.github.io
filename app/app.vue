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
    <BlurReveal class="min-h-screen max-w-4xl mx-auto p-4 space-y-4 not-print:pt-16 print:p-0 print:max-w-none selection:bg-primary selection:text-neutral-900">
      <ProfileCard :profile :location :age />
      <SectionCard title="Professional Experience" body-class="space-y-8">
        <ExperienceSection v-for="(experience, index) in resume.experiences" :key="index" :experience />
      </SectionCard>
      <SectionCard v-if="repos.length > 0" title="Personal Projects" body-class="grid grid-cols-2 md:grid-cols-3 gap-4" class="print:hidden">
        <SpecialCard v-for="repo in repos" :key="repo.name">
          <ProjectSection :repo />
        </SpecialCard>
      </SectionCard>
      <SectionCard v-if="contributions.length > 0" title="Open Source Contributions" body-class="grid grid-cols-1 md:grid-cols-2 gap-4" class="print:hidden">
        <SpecialCard v-for="contribution in contributions" :key="contribution.repoFullName">
          <ContributionSection :contribution />
        </SpecialCard>
      </SectionCard>
      <SectionCard title="Skills" body-class="space-y-2">
        <div v-for="(skills, env) in categorySkills" :key="env" class="flex gap-2 items-center">
          <strong>{{ env }}:</strong>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="(lang, index) in skills" :key="index" :label="lang" variant="soft" />
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Education" body-class="space-y-8">
        <EducationSection v-for="(experience, index) in resume.education" :key="index" :experience />
      </SectionCard>
      <SectionCard title="Certifications" body-class="grid grid-cols-2 gap-4">
        <SpecialCard v-for="certificate in certifications" :key="certificate.title">
          <CertificationSection :certificate />
        </SpecialCard>
      </SectionCard>
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
    <ThemeButton />
    <UTooltip arrow text="Print">
      <UButton class="fixed bottom-4 right-4 rounded-full print:hidden z-50" size="lg" square icon="i-hugeicons-printer"
               aria-label="Print" @click="handlePrint" />
    </UTooltip>
  </UApp>
</template>
