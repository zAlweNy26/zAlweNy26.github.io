import { version } from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'motion-v/nuxt',
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
    url: 'https://zalweny26.github.io',
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
      url: 'https://zalweny26.github.io',
      image: 'https://zalweny26.github.io/me_jojo.webp',
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
