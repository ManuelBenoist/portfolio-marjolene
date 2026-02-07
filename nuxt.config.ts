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
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  gtag: {
    id: 'G-EYG5NEC6FC', 
    initialConsent: false, // RGPD: no tracking until user accepts cookies
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: '',
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
    head: {
      script: [],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Marjolène Lasne' },
      ],
    },
    // Page transitions for premium navigation feel
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    // Layout transitions disabled - all pages now use implicit default layout
    layoutTransition: false,
  },

  // Static site generation configuration
  nitro: {
    prerender: {
      // Don't fail on 404 errors during prerender (some routes may be dynamically generated)
      failOnError: false,
      // Crawl links to discover all pages
      crawlLinks: true,
    },
    // Serve public files correctly during prerender
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
      },
    ],
  },
})
