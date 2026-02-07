// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-gtag'],

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
      htmlAttrs: {
        lang: 'fr',
      },
      script: [],
      title: 'Marjolène Lasne - Artiste Peintre',
      meta: [
        { name: 'description', content: 'Portfolio de Marjolène Lasne, artiste peintre spécialisée dans les portraits et les paysages.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Marjolène Lasne' },
        { name: 'keywords', content: 'Marjolène Lasne, artiste peintre, peintures, portraits, paysages, art contemporain, galerie d\'art' },
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
