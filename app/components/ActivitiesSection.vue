<template>
  <div v-reveal class="flex flex-col gap-8 md:flex-row md:items-stretch" :class="{ 'md:flex-row-reverse': position === 'left' }">
    <!-- Text Content -->
    <div ref="textContainer" class="flex flex-col justify-start md:flex-1">
      <!-- Title -->
      <h2 class="text-[36px] font-['Averia_Serif_Libre'] leading-tight text-accent">
        {{ title }}
      </h2>
      
      <!-- Description -->
      <p class="mt-4 text-lg leading-relaxed text-gray-text">
        {{ description }}
      </p>
      
      <!-- Colored Box with Bullet Points -->
      <div class="mt-6 rounded-[12px] bg-accent/10 p-6">
        <ul class="custom-list list-disc space-y-2 text-base text-gray-text" v-stagger="{ baseDelay: 60 }">
          <li v-for="(item, index) in items" :key="index" class="stagger-item stagger-hidden">
            {{ item }}
          </li>
        </ul>
      </div>
      
      <!-- Contact Button - aligned with image bottom -->
      <div class="mt-auto pt-6">
        <!-- Internal link -->
        <NuxtLink
          v-if="!isExternalLink"
          class="mt-4 inline-flex items-center justify-center rounded-btn bg-primary px-8 py-3 text-base font-medium uppercase tracking-wide text-white btn-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent"
          :to="to as RouteLocationRaw"
          :aria-label="buttonAriaLabel"
        >
          {{ buttonLabel }}
        </NuxtLink>
        <!-- External link -->
        <a
          v-else
          :href="to as string"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center justify-center rounded-btn bg-primary px-8 py-3 text-base font-medium uppercase tracking-wide text-white btn-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent"
          :aria-label="buttonAriaLabel"
        >
          {{ buttonLabel }}
        </a>
      </div>
    </div>

    <!-- Image Content -->
    <div class="image-reveal md:flex-none md:self-stretch md:max-w-[35%]" :style="{ '--target-height': targetHeight }">
      <img
        :src="withBaseImage(imageSrc)"
        :alt="imageAlt"
        class="h-auto w-full rounded-[12px] object-cover md:h-[var(--target-height)] md:w-auto"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { withBaseImage } from '~/utils/withBaseImage'

interface Props {
  title: string
  description: string
  items: string[]
  imageSrc: string
  imageAlt?: string
  position?: 'left' | 'right'
  to?: RouteLocationRaw | string
  buttonLabel?: string
  buttonAriaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Section image',
  position: 'right',
  to: '#',
  buttonLabel: 'Contacter l\'artiste',
  buttonAriaLabel: 'Contacter l\'artiste',
})

// Responsive height logic
const textContainer = ref<HTMLElement | null>(null)
const targetHeight = ref('auto')
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (textContainer.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Enforce a minimum height (e.g., 250px) to prevent tiny images
        // The image height will match the text height, or 250px, whichever is larger
        // This effectively minimizes the white space while keeping layout balanced
        const height = Math.max(50, entry.contentRect.height)
        targetHeight.value = `${height}px`
      }
    })
    resizeObserver.observe(textContainer.value)
  }
  
  // Trigger stagger item animations after mount (client-side only)
  if (process.client) {
    nextTick(() => {
      const items = document.querySelectorAll('.stagger-item')
      items.forEach(item => {
        item.classList.remove('stagger-hidden')
        item.classList.add('revealed')
      })
    })
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// Check if the link is external (starts with http)
const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<style scoped>
.custom-list {
  list-style-position: outside;
  padding-left: 1.5rem;
}

.custom-list li {
  padding-left: 1.5rem;
}
</style>
