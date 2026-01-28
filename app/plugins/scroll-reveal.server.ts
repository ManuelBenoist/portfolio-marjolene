/**
 * Scroll Reveal Server Plugin
 * Provides SSR-safe directive stubs for v-reveal and v-stagger
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Register reveal directive with SSR stub
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {
        class: 'reveal-hidden'
      }
    }
  })

  // Stagger directive SSR stub
  nuxtApp.vueApp.directive('stagger', {
    getSSRProps() {
      return {}
    }
  })
})
