// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: '../app/locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js',
          async: true,
        },
      ],
    },
  },
})
