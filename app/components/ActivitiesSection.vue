<template>
  <div class="flex flex-col md:flex-row gap-8" :class="{ 'md:flex-row-reverse': position === 'left' }">
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
        <ul class="list-inside list-disc space-y-2 text-base text-gray-text">
          <li v-for="(item, index) in items" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      
      <!-- Contact Button - aligned with image bottom -->
      <div class="mt-auto pt-6">
        <ContactButton :to="to" :label="buttonLabel" :aria-label="buttonAriaLabel" />
      </div>
    </div>

    <!-- Image Content -->
    <div class="md:w-1/2">
      <img :src="imageSrc" :alt="imageAlt" class="h-auto w-full rounded-[12px] object-cover" />
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
  to?: RouteLocationRaw
  buttonLabel?: string
  buttonAriaLabel?: string
}

withDefaults(defineProps<Props>(), {
  imageAlt: 'Section image',
  position: 'right',
  to: '#',
  buttonLabel: 'Contacter l\'artiste',
  buttonAriaLabel: 'Contacter l\'artiste',
})
</script>
