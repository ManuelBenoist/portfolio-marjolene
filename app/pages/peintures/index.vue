<template>
  <div>
    <!-- Page Header -->
    <SectionTitle 
        title="Peintures"
        subtitle="Découvrez une sélection d'œuvres originales de Marjolène Lasne, inspirées par les paysages, les scènes de vie et l'ambiance du Sud."
      />

      <!-- Loading state with transition -->
      <Transition name="content-fade" mode="out-in">
        <div v-if="pending" key="loading" class="text-center py-12">
          <p class="text-[#4A5565]">Chargement des peintures...</p>
        </div>

        <!-- Filters Section -->
        <div v-else key="content">
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
        </div>
      </Transition>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: 'default' })

import { computed, watch, onMounted, nextTick } from 'vue'
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

// Filter state - useState pour persister entre navigations, synchro avec URL pour liens partageables
const route = useRoute()
const router = useRouter()

// Use gallery state composable for filter persistence and scroll restoration
const { selectedCollection, selectedTechnique, activePaintingSlug } = useGalleryState()

// Initialiser depuis l'URL si présent (deep linking / refresh)
const getQueryParam = (key: string): string => {
  const value = route.query[key]
  return (Array.isArray(value) ? value[0] : value) as string || ''
}

// Synchroniser l'URL vers le state quand on arrive sur la page (ex: depuis un lien de collection)
watch(() => route.query, (newQuery) => {
  const urlCollection = (Array.isArray(newQuery.collection) ? newQuery.collection[0] : newQuery.collection) as string || ''
  const urlTechnique = (Array.isArray(newQuery.technique) ? newQuery.technique[0] : newQuery.technique) as string || ''
  
  if (selectedCollection.value !== urlCollection) {
    selectedCollection.value = urlCollection
  }
  if (selectedTechnique.value !== urlTechnique) {
    selectedTechnique.value = urlTechnique
  }
}, { immediate: true })

// Synchroniser les changements de filtres vers l'URL (sans polluer l'historique)
watch([selectedCollection, selectedTechnique], ([newCollection, newTechnique]) => {
  const query: Record<string, string | undefined> = {}
  if (newCollection) query.collection = newCollection
  if (newTechnique) query.technique = newTechnique
  
  router.replace({ query })
}, { immediate: false })

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

// Scroll restoration: scroll to the painting card after returning from detail page
onMounted(() => {
  if (activePaintingSlug.value) {
    const slugToScrollTo = activePaintingSlug.value
    // Clear immediately to prevent re-triggering
    activePaintingSlug.value = ''
    
    // Use nextTick + requestAnimationFrame to ensure DOM is fully rendered
    nextTick(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(`painting-${slugToScrollTo}`)
        if (element) {
          // Use scrollIntoView with instant behavior to avoid animation
          element.scrollIntoView({ behavior: 'instant', block: 'center' })
        }
      })
    })
  }
})

</script>

<style scoped>
.filter-fade-enter-active,
.filter-fade-leave-active {
  transition: opacity 350ms ease, transform 350ms ease;
}
.filter-fade-enter-from,
.filter-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.filter-fade-enter-to,
.filter-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Content loading transition */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 350ms ease;
}
.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .filter-fade-enter-active,
  .filter-fade-leave-active,
  .content-fade-enter-active,
  .content-fade-leave-active {
    transition: none;
  }
  .filter-fade-enter-from,
  .filter-fade-leave-to,
  .content-fade-enter-from,
  .content-fade-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
