<template>
  <div class="min-h-screen bg-[#FBFAF6] flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 px-6 sm:px-12 md:px-24">
      <!-- Page Header -->
      <SectionTitle 
        title="Foulards"
        subtitle="Découvrez une collection de foulards en soie, inspirés par les couleurs et motifs de Provence"
      />

      <!-- Loading state -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-[#4A5565]">Chargement des foulards...</p>
      </div>

      <!-- Gallery -->
      <template v-else>
        <div v-if="foulards && foulards.length > 0">
          <CardGrid 
            :items="foulards" 
            :card-component="FoulardCardWrapper"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-[#4A5565]">Aucun foulard disponible pour le moment.</p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'grid' })

import SectionTitle from '~/components/SectionTitle.vue'
import CardGrid from '~/components/CardGrid.vue'
import FoulardCardWrapper from '~/components/FoulardCardWrapper.vue'

interface ColorOption {
  id: string
  label: string
  hex: string
}

interface SizeOption {
  id: string
  label: string
}

interface MaterialOption {
  id: string
  label: string
}

interface ImageSource {
  src: string
  alt?: string
}

interface Foulard {
  slug: string
  title: string
  description: string
  colors: ColorOption[]
  sizes: SizeOption[]
  materials: MaterialOption[]
  images: ImageSource[]
  details: {
    dimensions: string
    material: string
    color: string
  }
  mentions: string[]
  metaDescription?: string
}

// Fetch data
const { data: foulards, pending } = await useAsyncData<Foulard[]>(
  'foulards-page',
  () => $fetch('/content/foulards.json')
)

// SEO
useSeoMeta({
  title: 'Foulards - Marjolène Lasne',
  ogTitle: 'Foulards - Marjolène Lasne',
  description: 'Découvrez les foulards en soie de Marjolène Lasne, pièces uniques fabriquées en France.',
  ogDescription: 'Découvrez les foulards en soie de Marjolène Lasne, pièces uniques fabriquées en France.',
})
</script>
