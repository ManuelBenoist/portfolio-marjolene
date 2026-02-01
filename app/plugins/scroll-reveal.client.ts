/**
 * Scroll Reveal Plugin (Client-side)
 * Lightweight, performant scroll-triggered animations using Intersection Observer.
 * 
 * Usage:
 *   <div v-reveal>...</div>
 *   <div v-reveal.once>...</div>
 *   <div v-reveal="{ delay: 200 }">...</div>
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Register reveal directive
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        el.classList.remove('reveal-hidden')
        el.classList.add('revealed')
        return
      }

      const options = binding.value || {}
      const delay = options.delay || 0
      const threshold = options.threshold || 0.1
      const once = binding.modifiers.once !== false // default to once

      // Apply custom delay via CSS variable
      if (delay > 0) {
        el.style.setProperty('--reveal-delay', `${delay}ms`)
      }

      // Wait for hydration to complete before starting observer
      // This prevents immediate trigger on page refresh/SSR
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Small RAF delay for smoother paint
                requestAnimationFrame(() => {
                  el.classList.remove('reveal-hidden')
                  el.classList.add('revealed')
                })

                if (once) {
                  observer.unobserve(el)
                }
              } else if (!once) {
                el.classList.add('reveal-hidden')
                el.classList.remove('revealed')
              }
            })
          },
          { threshold, rootMargin: '0px 0px -50px 0px' }
        )

        observer.observe(el)

        // Store observer for cleanup
        ;(el as any)._revealObserver = observer
      }, 100)
    },
    unmounted(el: HTMLElement) {
      const observer = (el as any)._revealObserver
      if (observer) {
        observer.disconnect()
      }
    }
  })

  // Stagger directive for grid children
  nuxtApp.vueApp.directive('stagger', {
    mounted(el: HTMLElement, binding) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      const baseDelay = binding.value?.baseDelay || 50
      const children = el.children

      Array.from(children).forEach((child, index) => {
        const htmlChild = child as HTMLElement
        htmlChild.style.setProperty('--stagger-delay', `${index * baseDelay}ms`)
      })
    }
  })
})
