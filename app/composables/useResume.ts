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

export function useResume() {
  return useAsyncData('resume', async () => ({
    experiences: await Promise.all(professionalExperiences.map(async e => ({ ...e, description: await renderMarkdown(e.description) }))),
    education: await Promise.all(educationalExperiences.map(async e => ({ ...e, description: await renderMarkdown(e.description) }))),
  }), {
    default: () => ({ experiences: [] as ProfessionalExperience[], education: [] as EducationalExperience[] }),
  })
}
