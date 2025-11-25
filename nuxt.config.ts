// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
  },

  runtimeConfig: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.NUXT_API_URL || 'http://prolific-dev.com:8080',
  },

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2025-11-13',

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      // autoprefixer: {},
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})
