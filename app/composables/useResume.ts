/**
 * The moment the page was prerendered. Using it instead of `new Date()` keeps
 * ages and "Present" durations identical between the static HTML and hydration.
 */
export const useBuildDate = () => useState('build-date', () => new Date())

async function renderMarkdown(text: string) {
  // Only ever runs at build time: the dead client branch keeps unified/remark out of the bundle
  if (import.meta.server) {
    const { parseMarkdown } = await import('~/lib/markdown')
    return parseMarkdown(text)
  }
  return text
}

/** The CV content in the current language, with markdown already rendered to HTML */
export function useResume() {
  const { locale } = useI18n()
  return useAsyncData(`resume-${locale.value}`, async () => {
    const lang = locale.value as Locale
    const tx = (text: LocalizedText) => localize(text, lang)
    return {
      experiences: await Promise.all(professionalExperiences.map(async (e): Promise<ProfessionalExperience<string>> => ({
        ...e,
        position: tx(e.position),
        location: tx(e.location),
        description: await renderMarkdown(tx(e.description)),
      }))),
      education: await Promise.all(educationalExperiences.map(async (e): Promise<EducationalExperience<string>> => ({
        ...e,
        institution: tx(e.institution),
        degree: tx(e.degree),
        description: await renderMarkdown(tx(e.description)),
        skills: e.skills.map(tx),
      }))),
      certifications: certifications.map((c): Certification<string> => ({ ...c, title: tx(c.title) })),
      skills: Object.entries(categorySkills).map(([category, skills]) => ({ category, skills: skills.map(tx) })),
      aboutStory: await renderMarkdown(aboutStory[lang]),
      aboutSummary: aboutSummary[lang],
    }
  }, {
    default: () => ({
      experiences: [] as ProfessionalExperience<string>[],
      education: [] as EducationalExperience<string>[],
      certifications: [] as Certification<string>[],
      skills: [] as { category: string, skills: string[] }[],
      aboutStory: '',
      aboutSummary: '',
    }),
  })
}
