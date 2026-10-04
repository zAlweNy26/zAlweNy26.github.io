import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/unit/**/*.test.ts'],
    // West of UTC, where formatting resume dates in local time showed the previous month
    env: { TZ: 'America/New_York' },
  },
})
