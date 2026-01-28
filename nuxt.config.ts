// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
    // Page transitions for premium navigation feel
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
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
