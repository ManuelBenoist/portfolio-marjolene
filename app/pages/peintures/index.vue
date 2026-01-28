<template>
  <div class="min-h-screen bg-[#FBFAF6] flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 px-6 sm:px-12 md:px-24">
      <!-- Page Header -->
      <SectionTitle 
        title="Peintures"
        subtitle="Découvrez une sélection d'œuvres originales, inspirées par les paysages, l'ambiance des Terrasses et la Lumière du Sud"
      />

      <!-- Loading state -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-[#4A5565]">Chargement des peintures...</p>
      </div>

      <!-- Filters Section -->
      <template v-else>
        <div v-if="paintings && paintings.length > 0" class="mb-12">
          <div class="space-y-6">
            <!-- Collections Filter -->
            <Filter
              v-model="selectedCollection"
              title="Collections"
              :items="collectionOptions"
            />

            <!-- Techniques Filter -->
            <Filter
              v-model="selectedTechnique"
              title="Techniques"
              :items="techniqueOptions"
            />
          </div>

          <!-- Separator -->
          <div class="border-t border-[#D1D5DC] mt-8"></div>
        </div>

        <!-- Gallery -->
        <Transition name="filter-fade" mode="out-in">
          <div :key="filterKey">
            <div v-if="filteredPaintings.length > 0">
              <CardGrid 
                :items="filteredPaintings" 
                :card-component="PaintingCardWrapper"
              />
            </div>

            <div v-else class="text-center py-12">
              <p class="text-[#4A5565]">Aucune peinture ne correspond à votre sélection.</p>
            </div>
          </div>
        </Transition>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'grid' })

import { ref, computed } from 'vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Filter from '~/components/Filter.vue'
import CardGrid from '~/components/CardGrid.vue'
import PaintingCard from '~/components/PaintingCard.vue'
import PaintingCardWrapper from '~/components/PaintingCardWrapper.vue'

interface Painting {
  slug: string
  title: string
  collection: string
  description: string
  dimensions: string
  technique: string
  image: string
  metaDescription?: string
}

interface PeinturesData {
  collections: Record<string, Omit<Painting, 'collection'>[]>
}

// Fetch data (now grouped by collections)
const { data: peinturesData, pending } = await useContent<PeinturesData>('peintures.json')

// Flatten paintings from grouped structure and add collection property
const paintings = computed<Painting[]>(() => {
  if (!peinturesData.value?.collections) return []
  
  const result: Painting[] = []
  for (const [collectionName, collectionPaintings] of Object.entries(peinturesData.value.collections)) {
    for (const painting of collectionPaintings) {
      result.push({
        ...painting,
        collection: collectionName
      })
    }
  }
  return result
})

// Filter state
const selectedCollection = ref<string>('')
const selectedTechnique = ref<string>('')

// Extract unique collections from the keys
const collectionOptions = computed(() => {
  if (!peinturesData.value?.collections) return []
  const collections = Object.keys(peinturesData.value.collections)
  const options = [
    { label: 'Toutes', value: '' },
    ...collections.map(col => ({
      label: col,
      value: col
    }))
  ]
  return options
})

// Extract unique techniques
const techniqueOptions = computed(() => {
  if (!paintings.value.length) return []
  const techniques = [...new Set(paintings.value.map(p => p.technique))]
  const options = [
    { label: 'Toutes', value: '' },
    ...techniques.map(tech => ({
      label: tech,
      value: tech
    }))
  ]
  return options
})

// Filter paintings
const filteredPaintings = computed(() => {
  if (!paintings.value.length) return []
  
  const filtered = paintings.value.filter(painting => {
    const matchesCollection = !selectedCollection.value || painting.collection === selectedCollection.value
    const matchesTechnique = !selectedTechnique.value || painting.technique === selectedTechnique.value
    return matchesCollection && matchesTechnique
  }).map(painting => ({
    ...painting,
    component: PaintingCard,
    to: `/peintures/${painting.slug}`
  }))
  
  return filtered
})

const filterKey = computed(() => `${selectedCollection.value}::${selectedTechnique.value}`)

</script>

<style scoped>
.filter-fade-enter-active,
.filter-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.filter-fade-enter-from,
.filter-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.filter-fade-enter-to,
.filter-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .filter-fade-enter-active,
  .filter-fade-leave-active {
    transition: none;
  }
  .filter-fade-enter-from,
  .filter-fade-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
