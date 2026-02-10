/**
 * Navigation cleanup plugin
 * Ensures body scroll is always restored when navigating between pages
 * This prevents scroll-lock bugs from modals/lightboxes persisting after navigation
 */
export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.beforeEach(() => {
    // Always restore body scroll on navigation
    // This ensures any modal/lightbox scroll locks are cleared
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  })
})
