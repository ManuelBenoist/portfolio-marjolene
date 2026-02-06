<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Section Title -->
      <SectionTitle 
            title="Autres activités" 
            subtitle="Marjolène Lasne élargit son univers artistique en proposant diverses activités en parallèle de sa peinture.",
          />
          
          <!-- Separator Line -->
          <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>

          <!-- Activities Sections -->
          <div class="space-y-24">
          <ActivitiesSection
            v-for="(activity, index) in activities"
            :key="activity.id"
            :title="activity.title"
            :description="activity.description"
            :items="activity.items"
            :imageSrc="activity.imageSrc"
            :imageAlt="activity.imageAlt"
            :position="activity.position"
            :to="getRouteTo(activity.id)"
            :buttonLabel="getButtonLabel(activity.id)"
            :buttonAriaLabel="getButtonLabel(activity.id)"
          />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useSiteUrl } from '~/composables/useSiteUrl'

interface Activity {
  id: string
  title: string
  description: string
  items: string[]
  imageSrc: string
  imageAlt: string
  position: 'left' | 'right'
}

const activities = ref<Activity[]>([])

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = 'Autres activites - Marjolene Lasne'
const metaDescription = "Decouvrez les autres activites de Marjolene Lasne : stages, design textile, commandes et hebergements en Provence."
const metaImage = withSiteUrl('/logo.png')

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
        name: 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Autres activites',
        item: withSiteUrl('/autres-activites'),
      },
    ],
  }
})

useHead(() => ({
  script: breadcrumbSchema.value
    ? [{ type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) }]
    : [],
}))

// Fetch activities data (server: read from filesystem; client: fetch from public)
if (process.server) {
  const { readFile } = await import('fs/promises')
  const { resolve } = await import('path')
  try {
    const file = await readFile(resolve(process.cwd(), 'public/content/activites.json'), 'utf-8')
    activities.value = JSON.parse(file) as Activity[]
  } catch (e) {
    // keep activities empty on error
  }
} else {
  const { data: activitiesData } = await useFetch('/content/activites.json')
  if (activitiesData.value) {
    activities.value = activitiesData.value as Activity[]
  }
}

// Routing logic based on activity type
const getRouteTo = (activityId: string): string | { path: string; query?: Record<string, string> } => {
  if (activityId === 'gites') {
    return 'https://www.unairdevacances.art'
  }
  // Liens vers la page contact avec préremplissage selon l'activité
  const activity = activities.value.find(a => a.id === activityId)
  return {
    path: '/contact',
    query: {
      sujet: 'activite',
      activite: activity?.title || activityId
    }
  }
}

// Button label logic
const getButtonLabel = (activityId: string): string => {
  if (activityId === 'gites') {
    return 'Découvrir les logements'
  }
  return 'Contacter l\'artiste'
}
</script>
