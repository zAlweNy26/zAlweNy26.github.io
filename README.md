# zAlweNy26.github.io

[Profile Web Site](https://danyalwe.me/) — personal portfolio and printable CV.

## Stack

- [Nuxt 4](https://nuxt.com) + [Nuxt UI 4](https://ui.nuxt.com) (Tailwind CSS 4)
- [@nuxtjs/seo](https://nuxtseo.com) for meta and schema.org
- Prerendered to static HTML and deployed to GitHub Pages by [GitHub Actions](.github/workflows/build.yml)

GitHub data (profile, projects, contributions) is fetched at build time and the
site is rebuilt daily, so visitors never hit the GitHub API. Set `NUXT_GITHUB_TOKEN`
when building locally if you run into the anonymous rate limit.

## Development

Bun is the package manager (version pinned in `package.json`); Node (`.nvmrc`) runs the Nuxt CLI.

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint       # eslint (bun run lint:fix to autofix)
bun run typecheck
bun run build      # static output in .output/public
bun run test       # unit tests (Vitest)
bun run test:e2e   # end-to-end tests on the build (Playwright; first run: bunx playwright install chromium)
bun run lighthouse # Lighthouse report for danyalwe.me (PRs are checked against the budgets in unlighthouse.config.ts)
```

## Editing content

The site is in English (`/`) and Italian (`/it`).

- Experience, education, certifications, skills and the About Me text: `app/utils/consts.ts`.
  Translated fields are `{ en, it }` objects; names and technologies are plain strings.
- Interface text (headings, labels, buttons): `i18n/locales/en.json` and `i18n/locales/it.json`
- Projects and open source contributions are pulled from the GitHub API at build time
- Use the print button (or Ctrl+P) to export the page as a CV

## Security headers

GitHub Pages can't set response headers, so they're added by Cloudflare (which proxies `danyalwe.me`).
`security-headers.json` is the source of truth: the end-to-end tests serve the build with these exact
headers, so a change that breaks the Content Security Policy fails CI.

To apply them: Cloudflare dashboard → `danyalwe.me` → **Rules → Transform Rules → Response Header Transform Rules**,
create a rule for _All incoming requests_ (or hostname equals `danyalwe.me`) and add a **Set static** operation
for each header in `security-headers.json`. Keep the two in sync when either changes.

`script-src` needs `'unsafe-inline'`: Nuxt's inline scripts (import map, runtime config) change on every
build, so hashes in a static Cloudflare rule would break after the next deploy. The policy still blocks
scripts and requests to any other origin.
