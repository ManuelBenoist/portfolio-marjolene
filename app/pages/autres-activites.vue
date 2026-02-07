<template>
  <div v-if="pageContent" class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Section Title -->
      <SectionTitle 
            :title="pageContent.title" 
            :subtitle="pageContent.subtitle"
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
import { useContent } from '~/composables/useContent'

interface Activity {
  id: string
  title: string
  description: string
  items: string[]
  imageSrc: string
  imageAlt: string
  position: 'left' | 'right'
}

const { data: activities } = await useAsyncData<Activity[]>('activities', async () => {
  if (process.server) {
    const { readFile } = await import('fs/promises')
    const { resolve } = await import('path')
    try {
      const file = await readFile(resolve(process.cwd(), 'public/content/activites.json'), 'utf-8')
      return JSON.parse(file) as Activity[]
    } catch (e) {
      console.error('Error loading activities:', e)
      return []
    }
  }
  const result = await $fetch<Activity[]>('/content/activites.json')
  return result
}, {
  default: () => []
})

const { data: pages } = await useContent('pages.json')
const pageContent = computed(() => pages.value?.activities)

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => pageContent.value?.seo?.title || '')
const metaDescription = computed(() => pageContent.value?.seo?.description || '')
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
        name: pageContent.value?.breadcrumb?.home || 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageContent.value?.breadcrumb?.current || 'Autres activites',
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

// Routing logic based on activity type
const getRouteTo = (activityId: string): string | { path: string; query?: Record<string, string> } => {
  if (activityId === 'gites') {
    return 'https://www.unairdevacances.art'
  }
  // Liens vers la page contact avec préremplissage selon l'activité
  const activity = activities.value?.find(a => a.id === activityId)
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
    return pageContent.value?.buttons?.gites || 'Découvrir les logements'
  }
  return pageContent.value?.buttons?.default || 'Contacter l\'artiste'
}
</script>
