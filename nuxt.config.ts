// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  runtimeConfig: {
    public: {
      authless_routes: [
        '/login'
      ],
      api: {
        protocol: 'https',
        domain: 'localhost:7149'
      }
    },
  },
  router: {
    options: {
      linkActiveClass: "link-active"
    }
  },
  typescript: {
    strict: false
  },
  css: [
    '~/assets/scss/main.css',
  ],
  ui: {
    colors: {
      primary: 'brandRed'
    }
  }
})