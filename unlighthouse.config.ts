import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'zalweny26.github.io',
  scanner: {
    device: 'desktop',
    samples: 3,
    throttle: true,
    maxRoutes: 100,
  },
})
