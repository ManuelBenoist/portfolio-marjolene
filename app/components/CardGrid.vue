<template>
  <div ref="gridRef" :class="gridClass">
    <component
      v-for="(item, idx) in items"
      :is="cardComponent"
      v-bind="item"
      :key="item.id || item.slug || idx"
      :style="{ '--stagger-delay': `${idx * 60}ms` }"
      class="stagger-item"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'

const props = defineProps<{
  items: Array<any>
  cardComponent: any
}>()

const gridRef = ref<HTMLElement | null>(null)

const gridClass = computed(() => {
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center'
})

// Trigger stagger reveal on mount
onMounted(async () => {
  if (typeof window === 'undefined') return
  await nextTick()
  if (!gridRef.value) return
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return // Items already visible by default
  }

  const children = Array.from(gridRef.value.children) as HTMLElement[]
  
  // First, hide all items
  children.forEach((child) => {
    child.classList.add('stagger-hidden')
  })

  // Helper function to reveal children with stagger animation
  const revealChildren = () => {
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.remove('stagger-hidden')
        child.classList.add('revealed')
      }, index * 60)
    })
  }

  // Small delay to ensure CSS is applied
  requestAnimationFrame(() => {
    // Safety check: ensure grid ref is still available
    if (!gridRef.value) return
    
    // Check if grid is already in viewport
    const rect = gridRef.value.getBoundingClientRect()
    const isInViewport = rect.bottom > 0 && rect.top < window.innerHeight
    
    if (isInViewport) {
      // Grid is already visible, reveal immediately
      revealChildren()
    } else {
      // Grid is not visible, use IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealChildren()
              observer.disconnect()
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      )

      observer.observe(gridRef.value)
    }
  })
})
</script>
