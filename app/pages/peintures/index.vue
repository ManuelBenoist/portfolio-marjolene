<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Page Header -->
      <SectionTitle 
          :title="$t('paintings.title')"
          :subtitle="$t('paintings.subtitle')"
        />

        <!-- Loading state -->
        <div v-if="pending" class="text-center py-12">
          <p class="text-[#4A5565]">{{ $t('paintings.loading') }}</p>
        </div>

        <!-- Filters Section -->
        <template v-else>
          <div v-if="paintings && paintings.length > 0" class="mb-12">
            <div class="space-y-6">
              <!-- Collections Filter -->
              <Filter
                v-model="selectedCollection"
                :title="$t('paintings.filters.collections')"
                :items="collectionOptions"
              />

              <!-- Techniques Filter -->
              <Filter
                v-model="selectedTechnique"
                :title="$t('paintings.filters.techniques')"
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
                <p class="text-[#4A5565]">{{ $t('paintings.emptyState') }}</p>
              </div>
            </div>
          </Transition>
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, nextTick } from 'vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Filter from '~/components/Filter.vue'
import CardGrid from '~/components/CardGrid.vue'
import PaintingCard from '~/components/PaintingCard.vue'
import PaintingCardWrapper from '~/components/PaintingCardWrapper.vue'
import { useSiteUrl } from '~/composables/useSiteUrl'

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
  const allLabel = t('paintings.filters.all')
  const options = [
    { label: allLabel, value: '' },
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
  const allLabel = t('paintings.filters.all')
  const options = [
    { label: allLabel, value: '' },
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
    to: localePath(`/peintures/${painting.slug}`)
  }))
  
  return filtered
})

const filterKey = computed(() => `${selectedCollection.value}::${selectedTechnique.value}`)

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => t('paintings.seo.title'))
const metaDescription = computed(() => t('paintings.seo.description')) 
const metaImage = computed(() => {
  const image = paintings.value[0]?.image || '/logo.png'
  return withSiteUrl(image)
})

// Canonical URL optimization: Always point to the main gallery page without filters
// to prevent duplicate content issues with query parameters
const canonicalUrl = computed(() => withSiteUrl(localePath('/peintures')))

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: metaImage,
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImage,
})

const breadcrumbSchema = computed(() => {
  if (!siteUrl) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('paintings.breadcrumb.home'),
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('paintings.breadcrumb.current'),
        item: withSiteUrl(localePath('/peintures')),
      },
    ],
  }
})

useHead(() => ({
  script: breadcrumbSchema.value
    ? [{ type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) }]
    : [],
}))

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
