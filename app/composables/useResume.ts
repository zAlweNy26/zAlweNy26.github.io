/**
 * The moment the page was prerendered. Using it instead of `new Date()` keeps
 * ages and "Present" durations identical between the static HTML and hydration.
 */
export const useBuildDate = () => useState('build-date', () => new Date())

/** The CV content in the current language, with markdown already rendered to HTML */
export function useResume() {
  const { locale } = useI18n()
  return useAsyncData(`resume-${locale.value}`, async () => {
    // Dynamic: the prerendered payload already holds the HTML, so the deployed site never downloads unified/remark.
    // The handler only runs in the browser without a payload (in dev: hot reload, switching language)
    const { parseMarkdown } = await import('~/lib/markdown')
    const lang = locale.value as Locale
    const tx = (text: LocalizedText) => localize(text, lang)
    return {
      experiences: professionalExperiences.map((e): ProfessionalExperience<string> => ({
        ...e,
        position: tx(e.position),
        location: tx(e.location),
        description: parseMarkdown(tx(e.description)),
      })),
      education: educationalExperiences.map((e): EducationalExperience<string> => ({
        ...e,
        institution: tx(e.institution),
        degree: tx(e.degree),
        description: parseMarkdown(tx(e.description)),
        skills: e.skills.map(tx),
      })),
      certifications: certifications.map((c): Certification<string> => ({ ...c, title: tx(c.title) })),
      skills: Object.entries(categorySkills).map(([category, skills]) => ({ category, skills: skills.map(tx) })),
      aboutStory: parseMarkdown(aboutStory[lang]),
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
