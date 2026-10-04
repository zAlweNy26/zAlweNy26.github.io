import { readFileSync } from 'node:fs'
import { version } from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-vitalizer',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxt/ui',
    '@nuxt/eslint',
  ],

  // Dev-only tooling, kept out of production builds
  $development: {
    modules: [
      '@compodium/nuxt',
      'nuxt-mcp',
      '@nuxt/hints',
    ],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      script: [
        {
          // Inline (not a bundled module) so the particle background starts with the first paint
          innerHTML: readFileSync(new URL('./app/inline/particles.js', import.meta.url), 'utf8'),
          tagPosition: 'bodyOpen',
        },
      ],
    },
  },

  compatibilityDate: 'latest',

  experimental: {
    typedPages: true,
    payloadExtraction: true,
    emitRouteChunkError: 'automatic-immediate',
  },

  runtimeConfig: {
    // Set NUXT_GITHUB_TOKEN at build time to avoid the anonymous GitHub API rate limit
    githubToken: '',
    public: {
      version,
    },
  },

  site: {
    url: 'https://danyalwe.me',
    name: 'DanyAlwe · Portfolio',
  },

  nitro: {
    prerender: {
      // A failed route (see the data checks in app.vue) must fail the build and keep the last deploy online
      failOnError: true,
    },
  },

  ogImage: {
    enabled: false,
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Daniele Nicosia',
      alternateName: 'DanyAlwe',
      url: 'https://danyalwe.me',
      image: 'https://danyalwe.me/me_jojo.webp',
      jobTitle: 'Lead Frontend Developer',
      sameAs: [
        'https://github.com/zAlweNy26',
        'https://linkedin.com/in/daniele-nicosia',
        'https://www.instagram.com/dany_alwe',
      ],
    },
  },

  sitemap: {
    enabled: false,
  },

  colorMode: {
    disableTransition: false,
  },
})
