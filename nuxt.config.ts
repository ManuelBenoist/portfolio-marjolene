// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-gtag', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  gtag: {
    id: 'G-EYG5NEC6FC', 
    // RGPD: no tracking until user accepts cookies
    initCommands: [
      ['consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      }]
    ]
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://marjolene-lasne.com',
      contact: {
        email: 'marjolenelasne@gmail.com',
        phone: '+33 6 08 77 08 24',
        address: {
          street: "11 place de l'Abbé Avon",
          zip: '84220',
          city: 'Roussillon',
          country: 'France'
        }
      }
    }
  },
  app: {
    baseURL: '/', // si domaine custom, laisse '/' ; sinon '/nom-du-repo/' si pas domaine
    head: {
      script: [],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-painting.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Marjolène Lasne' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: false,
    trailingSlash: true, // ✅ important pour GitHub Pages
  },

  nitro: {
    preset: 'github_pages', // ✅ ajuste les chemins pour GitHub Pages
    prerender: {
      // Don't fail on 404 errors during prerender (some routes may be dynamically generated)
      failOnError: false,
      crawlLinks: true,
    },
    publicAssets: [
      { dir: 'public', baseURL: '/' },
    ],
  }
})
