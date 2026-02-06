// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  devServer: {
    host: '0.0.0.0'
  },
  vite: {
    server: {
      host: true,
      allowedHosts: ['.localhost']
    }
  }
})
