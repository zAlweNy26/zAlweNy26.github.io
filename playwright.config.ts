import { defineConfig, devices } from '@playwright/test'

// Runs against the static build: `bun run build` first
export default defineConfig({
  testDir: 'test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // Same headers as production (set by Cloudflare), so a CSP violation fails the tests
    command: 'serve .output/public -l 4173 --no-port-switching --config ../../security-headers.json',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
