# zAlweNy26.github.io

My personal portfolio, live at [danyalwe.me](https://danyalwe.me/), in English and Italian. It also prints as a CV.

## What's inside

- **Profile**: who I am, where I am right now and what I do
- **Experience, education, certifications and skills**
- **Projects and open source contributions**, pulled from GitHub
- **Activity panel**: live Discord presence (status, Spotify, games), last week's coding stats from WakaTime, and
  a GitHub contributions heatmap with a language breakdown

## How it's made

Built with [Nuxt 4](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com) (Tailwind CSS), with
[Nuxt SEO](https://nuxtseo.com) for meta tags, schema.org and the OG image. The site is prerendered to static HTML
and deployed to GitHub Pages by [GitHub Actions](.github/workflows/build.yml), rebuilding daily so the GitHub data
stays fresh.

The live data (location, Discord presence, coding stats) comes from
[my-location](https://github.com/zAlweNy26/my-location), a Cloudflare Worker that keeps a bot connected to Discord
and caches the other APIs.

## PageSpeed

![PageSpeed metrics](.github/metrics/pagespeed.svg)
