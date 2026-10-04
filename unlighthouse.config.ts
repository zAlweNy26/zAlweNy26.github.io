import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'danyalwe.me',
  scanner: {
    device: 'desktop',
    samples: 3,
    throttle: true,
    maxRoutes: 100,
  },
})
