<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Section Title -->
      <SectionTitle 
            :title="$t('activities.title')" 
            :subtitle="$t('activities.subtitle')"
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
import { withBaseImage } from '~/utils/withBaseImage'

interface Activity {
  id: string
  title: string
  description: string
  items: string[]
  imageSrc: string
  imageAlt: string
  position: 'left' | 'right'
}

const { locale: currentLocale } = useI18n()
const localePath = useLocalePath()

const { data: activities } = await useAsyncData<Activity[]>(`activities-${currentLocale.value}`, async () => {
  if (process.server) {
    const { readFile } = await import('fs/promises')
    const { resolve } = await import('path')
    try {
      const file = await readFile(resolve(process.cwd(), `public/content/${currentLocale.value}/activites.json`), 'utf-8')
      return JSON.parse(file) as Activity[]
    } catch (e) {
      // Fallback to French
      try {
        const file = await readFile(resolve(process.cwd(), 'public/content/fr/activites.json'), 'utf-8')
        return JSON.parse(file) as Activity[]
      } catch {
        console.error('Error loading activities:', e)
        return []
      }
    }
  }
  try {
    return await $fetch<Activity[]>(`/content/${currentLocale.value}/activites.json`)
  } catch {
    return await $fetch<Activity[]>('/content/fr/activites.json')
  }
}, {
  default: () => [],
  watch: [currentLocale]
})

const { t } = useI18n()
const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => t('activities.seo.title'))
const metaDescription = computed(() => t('activities.seo.description'))
const metaImage = withSiteUrl(withBaseImage('/logo-ligne.png'))

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
        name: t('activities.breadcrumb.home'),
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('activities.breadcrumb.current'),
        item: withSiteUrl(localePath('/autres-activites')),
      },
    ],
  }
})

useHead(() => {
  const scripts = []
  
  if (breadcrumbSchema.value) {
    scripts.push({ type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) })
  }

  // Schema Service (pour chaque activité)
  if (activities.value?.length) {
    const services = activities.value.map(activity => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: activity.title,
      description: activity.description,
      provider: {
          '@type': 'Person',
          name: t('seo.structuredData.personName') || 'Marjolène Lasne',
      }
    }))
    services.forEach(service => {
      scripts.push({ type: 'application/ld+json', children: JSON.stringify(service) })
    })
  }

  return { script: scripts }
})

// Routing logic based on activity type
const getRouteTo = (activityId: string): string | { path: string; query?: Record<string, string> } => {
  if (activityId === 'gites') {
    return 'https://www.unairdevacances.art'
  }
  // Liens vers la page contact avec préremplissage selon l'activité
  const activity = activities.value?.find(a => a.id === activityId)
  return {
    path: localePath('/contact'),
    query: {
      sujet: 'activite',
      activite: activity?.title || activityId
    }
  }
}

// Button label logic
const getButtonLabel = (activityId: string): string => {
  if (activityId === 'gites') {
    return t('activities.buttons.gites')
  }
  return t('activities.buttons.default')
}
</script>
