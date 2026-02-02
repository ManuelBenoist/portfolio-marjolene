import type { RouterConfig } from '@nuxt/schema'

// Custom scroll behavior to handle gallery state restoration
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If browser has a saved position (back/forward navigation), use it
    if (savedPosition) {
      return savedPosition
    }

    // Check if we're navigating to the paintings gallery from a detail page
    // and have an active slug to restore
    if (to.path === '/peintures' && from?.path?.startsWith('/peintures/')) {
      const activePaintingSlug = useState<string>('peintures-active-slug')
      
      if (activePaintingSlug.value) {
        // Return false to prevent any automatic scrolling
        // The page component will handle scroll restoration
        return false
      }
    }

    // Check if we're navigating to the foulards gallery from a detail page
    if (to.path === '/foulards' && from?.path?.startsWith('/foulards/')) {
      const activeFoulardSlug = useState<string>('foulards-active-slug')
      
      if (activeFoulardSlug.value) {
        // Return false to prevent any automatic scrolling
        // The page component will handle scroll restoration
        return false
      }
    }

    // Default: scroll to top after page transition completes
    // Delay scroll to sync with page transition (350ms) to avoid visual "jump"
    const prefersReducedMotion = typeof window !== 'undefined' 
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      return { top: 0 }
    }

    // Return a promise that resolves after the page transition out phase
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'instant' })
      }, 400) // Slightly longer than transition duration (350ms)
    })
  }
}
