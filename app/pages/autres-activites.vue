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

// Fetch activities data (server: read from filesystem; client: fetch from public)
if (process.server) {
  const { readFile } = await import('fs/promises')
  const { resolve } = await import('path')
  try {
    const file = await readFile(resolve(process.cwd(), 'public/content/activites.json'), 'utf-8')
    activities.value = JSON.parse(file) as Activity[]
  } catch (e) {
    // keep activities empty on error but log server-side for debugging
    console.error('Failed to read activites.json during SSR prerender:', e)
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
