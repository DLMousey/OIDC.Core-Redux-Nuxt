// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/color-mode'],
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
  }
})