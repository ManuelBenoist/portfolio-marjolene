import type { RouterConfig } from '@nuxt/schema'

// Transition scroll delay for page navigation (ms)
const TRANSITION_SCROLL_DELAY = 50

// Matches /peintures or /xx/peintures (where xx is a locale prefix)
const peinturesPattern = /^(\/[a-z]{2})?\/peintures$/
const peinturesDetailPattern = /^(\/[a-z]{2})?\/peintures\//
const foulardsPattern = /^(\/[a-z]{2})?\/foulards$/
const foulardsDetailPattern = /^(\/[a-z]{2})?\/foulards\//

// Custom scroll behavior to handle gallery state restoration
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If browser has a saved position (back/forward navigation), use it
    if (savedPosition) {
      return savedPosition
    }

    // Check if we're navigating to the paintings gallery from a detail page
    // and have an active slug to restore
    if (peinturesPattern.test(to.path) && from?.path && peinturesDetailPattern.test(from.path)) {
      const activePaintingSlug = useState<string>('peintures-active-slug')
      
      if (activePaintingSlug.value) {
        // Return false to prevent any automatic scrolling
        // The page component will handle scroll restoration
        return false
      }
    }

    // Check if we're navigating to the foulards gallery from a detail page
    if (foulardsPattern.test(to.path) && from?.path && foulardsDetailPattern.test(from.path)) {
      const activeFoulardSlug = useState<string>('foulards-active-slug')
      
      if (activeFoulardSlug.value) {
        // Return false to prevent any automatic scrolling
        // The page component will handle scroll restoration
        return false
      }
    }

    // Default: scroll to top after page transition completes
    // Delay scroll to sync with page transition to avoid visual "jump"
    const prefersReducedMotion = typeof window !== 'undefined' 
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      return { top: 0 }
    }

    // Return a promise that resolves after a brief delay to allow transition
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'instant' })
      }, TRANSITION_SCROLL_DELAY)
    })
  }
}
