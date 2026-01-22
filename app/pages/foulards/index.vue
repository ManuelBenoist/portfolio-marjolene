<template>
  <div class="min-h-screen bg-[#FBFAF6] flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 px-6 sm:px-12 md:px-24 py-12">
      <!-- Page Header -->
      <SectionTitle 
        title="Foulards"
        subtitle="Découvrez une collection de foulards en soie, inspirés par les couleurs et motifs de Provence"
      />

      <!-- Separator -->
      <hr class="border-t border-[#E5DFD3] mb-10" />

      <!-- Loading state -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-[#4A5565]">Chargement des foulards...</p>
      </div>

      <!-- Gallery -->
      <template v-else>
        <div v-if="transformedFoulards && transformedFoulards.length > 0">
          <CardGrid 
            :items="transformedFoulards" 
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
import { computed } from 'vue'

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

// Raw JSON structure (nested colors/materials)
interface RawMaterial {
  id: string
  label: string
  images: ImageSource[]
}

interface RawColor {
  id: string
  label: string
  hex: string
  materials: Record<string, RawMaterial>
}

interface RawFoulard {
  slug: string
  title: string
  description: string
  sizes: SizeOption[]
  colors: Record<string, RawColor>
}

// Transformed structure for cards
interface TransformedFoulard {
  slug: string
  title: string
  description: string
  colors: ColorOption[]
  sizes: SizeOption[]
  materials: MaterialOption[]
  baseImage: ImageSource
}

// Fetch raw data
const { data: rawFoulards, pending } = await useAsyncData<RawFoulard[]>(
  'foulards-page',
  () => $fetch('/content/foulards.json')
)

// Transform nested data to flat structure for cards
const transformedFoulards = computed<TransformedFoulard[]>(() => {
  if (!rawFoulards.value) return []

  return rawFoulards.value.map((foulard) => {
    // Extract colors as flat array
    const colors: ColorOption[] = Object.values(foulard.colors).map((color) => ({
      id: color.id,
      label: color.label,
      hex: color.hex,
    }))

    // Extract unique materials from all colors
    const materialsMap = new Map<string, MaterialOption>()
    Object.values(foulard.colors).forEach((color) => {
      Object.values(color.materials).forEach((material) => {
        if (!materialsMap.has(material.id)) {
          materialsMap.set(material.id, { id: material.id, label: material.label })
        }
      })
    })
    const materials: MaterialOption[] = Array.from(materialsMap.values())

    // Extract first available image for the card preview
    let baseImage: ImageSource = { src: '/foulards/foulard-marjo-bleu.avif', alt: foulard.title }
    const firstColor = Object.values(foulard.colors)[0]
    if (firstColor) {
      const firstMaterial = Object.values(firstColor.materials)[0]
      if (firstMaterial && firstMaterial.images && firstMaterial.images.length > 0) {
        baseImage = firstMaterial.images[0]
      }
    }

    return {
      slug: foulard.slug,
      title: foulard.title,
      description: foulard.description,
      colors,
      sizes: foulard.sizes,
      materials,
      baseImage,
    }
  })
})

// SEO
useSeoMeta({
  title: 'Foulards - Marjolène Lasne',
  ogTitle: 'Foulards - Marjolène Lasne',
  description: 'Découvrez les foulards en soie de Marjolène Lasne, pièces uniques fabriquées en France.',
  ogDescription: 'Découvrez les foulards en soie de Marjolène Lasne, pièces uniques fabriquées en France.',
})
</script>
