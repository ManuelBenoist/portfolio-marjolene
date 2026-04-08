<template>
  <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    <FoulardCard
      v-for="(item, idx) in items"
      :key="item.slug || item.title"
      :slug="item.slug"
      :title="item.title"
      :description="item.description"
      :colors="item.colors"
      :style="{ '--stagger-delay': `${idx * 60}ms` }"
      class="stagger-item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FoulardCard from './FoulardCard.vue'

defineProps<{
  items: any[]
}>()

const gridRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (typeof window === 'undefined') return
  await nextTick()
  if (!gridRef.value) return
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return
  }

  const children = Array.from(gridRef.value.children) as HTMLElement[]
  
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
