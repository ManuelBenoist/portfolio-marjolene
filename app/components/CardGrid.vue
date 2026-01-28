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

  // Small delay to ensure CSS is applied
  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger reveal children
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.remove('stagger-hidden')
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
