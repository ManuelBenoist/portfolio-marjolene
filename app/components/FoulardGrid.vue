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
  await nextTick()
  if (!gridRef.value) return
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    // Show items immediately for reduced motion
    const children = Array.from(gridRef.value.children) as HTMLElement[]
    children.forEach((child) => child.classList.add('revealed'))
    return
  }

  const children = Array.from(gridRef.value.children) as HTMLElement[]

  // Wait for hydration to complete and page transition to finish
  // This prevents the IntersectionObserver from triggering immediately on page load
  await new Promise(resolve => setTimeout(resolve, 100))

  // Observe grid and trigger staggered reveal when visible
  requestAnimationFrame(() => {
    if (!gridRef.value) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('revealed')
              }, index * 60)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(gridRef.value!)
  })
})
</script>
