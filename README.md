# zAlweNy26.github.io

[Profile Web Site](https://zalweny26.github.io/) — personal portfolio and printable CV.

## Stack

- [Nuxt 4](https://nuxt.com) + [Nuxt UI 4](https://ui.nuxt.com) (Tailwind CSS 4)
- [motion-v](https://motion.unovue.com) for reveal animations
- [@nuxtjs/seo](https://nuxtseo.com) for meta and schema.org
- Deployed to GitHub Pages by [GitHub Actions](.github/workflows/build.yml)

## Development

Bun is the package manager (version pinned in `package.json`); Node (`.nvmrc`) runs the Nuxt CLI.

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint       # eslint (bun run lint:fix to autofix)
bun run typecheck
bun run build      # static output in .output/public
```

## Editing content

- Experience, education, certifications and skills: `app/utils/consts.ts`
- Projects and open source contributions are pulled from the GitHub API
- Use the print button (or Ctrl+P) to export the page as a CV
