<template>
  <div v-reveal class="flex flex-col md:flex-row gap-8" :class="{ 'md:flex-row-reverse': position === 'left' }">
    <!-- Text Content -->
    <div class="flex flex-col justify-start md:w-1/2">
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
        <ul class="custom-list list-disc space-y-2 text-base text-gray-text">
          <li v-for="(item, index) in items" :key="index">
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
    <div class="md:w-1/2 image-reveal">
      <img :src="imageSrc" :alt="imageAlt" class="h-auto w-full rounded-[12px] object-cover" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

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
