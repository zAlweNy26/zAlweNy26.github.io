import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'danyalwe.me',
  scanner: {
    // Lighthouse's standard mobile profile (slow 4G, 4x CPU), the one Google uses for ranking.
    // device: 'desktop' with throttle: true mixed a desktop screen with a slow-4G network
    device: 'mobile',
    throttle: true,
    samples: 3,
    maxRoutes: 100,
  },
  ci: {
    // A few points under the current scores (mobile 90 / 100 / 96 / 100): runs vary between samples
    budget: {
      'performance': 85,
      'accessibility': 95,
      'best-practices': 90,
      'seo': 95,
    },
  },
})
