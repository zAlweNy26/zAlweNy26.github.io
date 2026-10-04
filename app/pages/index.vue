<script setup lang="ts">
const { t } = useI18n()
const username = GITHUB_USERNAME
const title = 'DanyAlwe'

const buildDate = useBuildDate()
const birthDate = new Date('2001-02-20')
const age = computed(() => getAge(birthDate, buildDate.value))

useSeoMeta({
  title,
  titleTemplate: t => t ? `${t} · Portfolio` : `DanyAlwe · Portfolio`,
  description: () => t('meta.description'),
  ogTitle: title,
  ogDescription: () => t('meta.description'),
  ogType: 'website',
})

// Same @id as the identity in nuxt.config.ts, so these fields are merged into that Person
useSchemaOrg([
  definePerson({
    '@id': '#identity',
    'worksFor': professionalExperiences
      .filter(experience => !experience.endDate)
      .map(experience => ({ '@type': 'Organization', 'name': experience.company, 'url': experience.companyUrl })),
    'alumniOf': educationalExperiences.map(entry => ({ '@type': 'EducationalOrganization', 'name': localize(entry.institution, 'en') })),
    'knowsAbout': Object.entries(categorySkills).filter(([category]) => category !== 'languages').flatMap(([, skills]) => skills.map(skill => localize(skill, 'en'))),
    // "🇮🇹 Italian (Native)" -> "Italian"
    'knowsLanguage': categorySkills.languages!.map(language => localize(language, 'en').replace(/^\S+\s/, '').replace(/\s*\(.*\)$/, '')),
  }),
])

defineOgImage('Portfolio', { summary: t('meta.ogSummary') }, {
  width: 1200,
  height: 630,
  alt: t('meta.ogAlt'),
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
</script>

<template>
  <UContainer as="main" class="min-h-screen py-4 not-print:pt-16 print:p-0 print:max-w-none selection:bg-primary selection:text-neutral-900">
    <BlurReveal class="space-y-4">
      <ProfileCard :profile :location :age :story="resume.aboutStory" :summary="resume.aboutSummary" />
      <!-- Static sections never hydrate (no JS needed); tilt cards hydrate once scrolled into view -->
      <SectionCard :title="$t('sections.experience')">
        <LazyExperienceTimeline hydrate-never :experiences="resume.experiences" />
      </SectionCard>
      <SectionCard v-if="repos.length > 0" :title="$t('sections.projects')" class="print:hidden">
        <UPageGrid>
          <LazyTiltCard v-for="repo in repos" :key="repo.name" hydrate-on-visible>
            <ProjectSection :repo />
          </LazyTiltCard>
        </UPageGrid>
      </SectionCard>
      <SectionCard v-if="contributions.length > 0" :title="$t('sections.contributions')" class="print:hidden">
        <UPageGrid class="lg:grid-cols-2">
          <LazyTiltCard v-for="contribution in contributions" :key="contribution.repoFullName" hydrate-on-visible>
            <ContributionSection :contribution />
          </LazyTiltCard>
        </UPageGrid>
      </SectionCard>
      <SectionCard :title="$t('sections.skills')">
        <LazySkillsList hydrate-never :skills="resume.skills" />
      </SectionCard>
      <SectionCard :title="$t('sections.education')">
        <LazyEducationTimeline hydrate-never :education="resume.education" />
      </SectionCard>
      <SectionCard :title="$t('sections.certifications')">
        <UPageGrid class="lg:grid-cols-2">
          <LazyTiltCard v-for="certificate in resume.certifications" :key="certificate.title" hydrate-on-visible>
            <CertificationSection :certificate />
          </LazyTiltCard>
        </UPageGrid>
      </SectionCard>
      <UFooter :ui="{ container: 'py-2 lg:py-2 px-0 sm:px-0 lg:px-0 text-sm text-muted print:hidden', bottom: 'py-0 lg:py-0' }">
        <template #left>
          {{ $t('footer.copyright', { from: new Date(profile.created_at).getFullYear(), to: buildDate.getFullYear(), name: username }) }}
        </template>
        <template #right>
          v{{ $config.public.version }}
        </template>
        <template #bottom>
          <p class="hidden print:block text-center text-muted">
            {{ $t('footer.gdpr') }}
          </p>
        </template>
      </UFooter>
    </BlurReveal>
  </UContainer>
</template>
