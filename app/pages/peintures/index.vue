<template>
  <div class="min-h-screen bg-[#FBFAF6] flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 px-6 sm:px-12 md:px-24">
      <!-- Page Header -->
      <SectionTitle 
        :title="$t('peintures.pageTitle')"
        :subtitle="$t('peintures.pageSubtitle')"
      />

      <!-- Loading state -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-[#4A5565]">{{ $t('common.loading') || 'Chargement...' }}</p>
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
              :title="$t('peintures.filterTechnique')"
              :items="techniqueOptions"
            />
          </div>

          <!-- Separator -->
          <div class="border-t border-[#D1D5DC] mt-8"></div>
        </div>

        <!-- Gallery -->
        <div v-if="filteredPaintings.length > 0">
          <CardGrid 
            :items="filteredPaintings" 
            :card-component="PaintingCardWrapper"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-[#4A5565]">{{ $t('peintures.noResults') || 'Aucune peinture ne correspond à votre sélection.' }}</p>
        </div>
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

const { t } = useI18n()
const localePath = useLocalePath()

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

// Fetch data with locale awareness
const { data: paintings, pending } = await useLocalizedContent<Painting[]>('peintures')

// Filter state
const selectedCollection = ref<string>('')
const selectedTechnique = ref<string>('')

// Extract unique collections
const collectionOptions = computed(() => {
  if (!paintings.value) return []
  const collections = [...new Set(paintings.value.map(p => p.collection))]
  const options = [
    { label: t('peintures.filterAll'), value: '' },
    ...collections.map(col => ({
      label: col,
      value: col
    }))
  ]
  return options
})

// Extract unique techniques
const techniqueOptions = computed(() => {
  if (!paintings.value) return []
  const techniques = [...new Set(paintings.value.map(p => p.technique))]
  const options = [
    { label: t('peintures.filterAll'), value: '' },
    ...techniques.map(tech => ({
      label: tech,
      value: tech
    }))
  ]
  return options
})

// Filter paintings
const filteredPaintings = computed(() => {
  if (!paintings.value) return []
  
  const filtered = paintings.value.filter(painting => {
    const matchesCollection = !selectedCollection.value || painting.collection === selectedCollection.value
    const matchesTechnique = !selectedTechnique.value || painting.technique === selectedTechnique.value
    return matchesCollection && matchesTechnique
  }).map(painting => ({
    ...painting,
    component: PaintingCard,
    to: localePath(`/peintures/${painting.slug}`)
  }))
  
  return filtered
})

</script>

<style scoped>
</style>
