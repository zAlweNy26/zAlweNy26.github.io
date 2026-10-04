import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const locales = [
  { path: '/', lang: 'en-GB', about: 'About Me', other: { path: '/it', label: 'Leggi in italiano' } },
  { path: '/it', lang: 'it-IT', about: 'Chi sono', other: { path: '/', label: 'Read in English' } },
]

/** Console errors and Vue warnings, minus the live-location API (it only allows the real origin) */
function collectProblems(page: Page) {
  const problems: string[] = []
  page.on('pageerror', e => problems.push(e.message))
  page.on('console', (m) => {
    if (/Content Security Policy/.test(m.text())) problems.push(m.text())
  })
  page.on('console', (m) => {
    if ((m.type() === 'error' || /hydration|Vue warn/i.test(m.text())) && !/location\.danyalwe\.me|CORS|ERR_FAILED/.test(m.text()))
      problems.push(m.text())
  })
  return problems
}

for (const locale of locales) {
  test.describe(`${locale.path} (${locale.lang})`, () => {
    test('renders without errors or hydration warnings', async ({ page }) => {
      const problems = collectProblems(page)
      await page.goto(locale.path)
      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Daniele Nicosia')
      await expect(page.getByRole('heading', { level: 2, name: locale.about })).toBeVisible()
      await page.waitForLoadState('networkidle')
      expect(problems).toEqual([])
    })

    test('has localized SEO metadata', async ({ page }) => {
      await page.goto(locale.path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical?.replace(/\/$/, '')).toBe(`https://danyalwe.me${locale.path}`.replace(/\/$/, ''))
      await expect(page.locator('link[rel="alternate"][hreflang="it"]')).toHaveAttribute('href', 'https://danyalwe.me/it')
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630')
      const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent() ?? '{}')
      expect(jsonLd['@graph'].filter((n: { '@type': string }) => n['@type'] === 'Person')).toHaveLength(1)
    })

    test('links to the other language', async ({ page }) => {
      await page.goto(locale.path)
      // Accessible name is the aria-label, in the other language's own words
      const link = page.getByRole('link', { name: locale.other.label })
      await expect(link).toHaveAttribute('href', locale.other.path)
      await link.click()
      await expect(page).toHaveURL(locale.other.path)
    })

    test('prints as a CV', async ({ page }) => {
      await page.goto(locale.path)
      await page.emulateMedia({ media: 'print' })
      // Short summary instead of the story, no web-only sections or buttons
      await expect(page.locator('footer').getByText(/GDPR/)).toBeVisible()
      await expect(page.locator('#particles')).toBeHidden()
      for (const section of await page.locator('section').all()) {
        const title = await section.locator('h2').textContent()
        if (/Projects|Progetti|Contributions|Contributi|Activity|Attività/.test(title ?? '')) await expect(section).toBeHidden()
      }
      // Not getByRole: it skips hidden elements, and hidden is the point here
      const certificateButtons = page.locator('a', { hasText: /View Certificate|Vedi certificato/ })
      await expect(certificateButtons).toHaveCount(2)
      for (const button of await certificateButtons.all()) await expect(button).toBeHidden()
      // Education descriptions are hidden, the badges stay
      const education = page.locator('section').filter({ has: page.getByRole('heading', { name: /Education|Formazione/ }) })
      for (const description of await education.locator('article').all()) await expect(description).toBeHidden()
      await expect(education.locator('[data-slot="item"]').first()).toBeVisible()
    })
  })
}
