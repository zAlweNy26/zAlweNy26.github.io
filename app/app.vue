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
    <UContainer as="main" class="min-h-screen py-4 not-print:pt-16 print:p-0 print:max-w-none selection:bg-primary selection:text-neutral-900">
      <BlurReveal class="space-y-4">
        <ProfileCard :profile :location :age />
        <SectionCard title="Professional Experience">
          <ExperienceTimeline :experiences="resume.experiences" />
        </SectionCard>
        <SectionCard v-if="repos.length > 0" title="Personal Projects" class="print:hidden">
          <UPageGrid>
            <TiltCard v-for="repo in repos" :key="repo.name">
              <ProjectSection :repo />
            </TiltCard>
          </UPageGrid>
        </SectionCard>
        <SectionCard v-if="contributions.length > 0" title="Open Source Contributions" class="print:hidden">
          <UPageGrid class="lg:grid-cols-2">
            <TiltCard v-for="contribution in contributions" :key="contribution.repoFullName">
              <ContributionSection :contribution />
            </TiltCard>
          </UPageGrid>
        </SectionCard>
        <SectionCard title="Skills" body-class="space-y-2">
          <div v-for="(skills, env) in categorySkills" :key="env" class="flex gap-2 items-center">
            <strong>{{ env }}:</strong>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="(lang, index) in skills" :key="index" :label="lang" variant="soft" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Education">
          <EducationTimeline :education="resume.education" />
        </SectionCard>
        <SectionCard title="Certifications">
          <UPageGrid class="lg:grid-cols-2">
            <TiltCard v-for="certificate in certifications" :key="certificate.title">
              <CertificationSection :certificate />
            </TiltCard>
          </UPageGrid>
        </SectionCard>
        <UFooter :ui="{ container: 'py-2 lg:py-2 px-0 sm:px-0 lg:px-0 text-sm text-muted print:hidden', bottom: 'py-0 lg:py-0' }">
          <template #left>
            Copyright © {{ new Date(profile.created_at).getFullYear() }} - {{ buildDate.getFullYear() }} by {{ username }}
          </template>
          <template #right>
            v{{ $config.public.version }}
          </template>
          <template #bottom>
            <p class="hidden print:block text-center text-muted">
              I authorise the processing of the personal data in my CV in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR).
            </p>
          </template>
        </UFooter>
      </BlurReveal>
    </UContainer>
    <ThemeButton />
    <UTooltip arrow text="Print">
      <UButton class="fixed bottom-4 right-4 rounded-full print:hidden z-50" size="lg" square icon="i-hugeicons-printer"
               aria-label="Print" @click="handlePrint" />
    </UTooltip>
  </UApp>
</template>
