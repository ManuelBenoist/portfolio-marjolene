<template>
  <div class="w-full min-h-screen">
    <!-- Section Title -->
    <SectionTitle
      title="L'Artiste"
      subtitle="Découvrez le parcours et la passion de Marjolène Lasne, peintre française inspirée par la lumière méditerranéenne et la beauté du Sud de la France."
    />

    <!-- Divider -->
    <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>

    <!-- Biography Section -->
    <div class="mb-16">
      <TitleImageContent
        :title="artisteContent.biography.title"
        :image="artisteContent.biography.image"
        :caption="artisteContent.biography.caption"
        :position="artisteContent.biography.position"
        :paragraphs="artisteContent.biography.paragraphs"
      />
    </div>

    <!-- Timeline Section -->
    <div class="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#C94E54]/[0.04] py-16 px-8 mb-16">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-[2.5rem] font-['Averia_Serif_Libre'] font-light text-[#C94E54] mb-8">Parcours et formation</h2>
        <Timeline />
      </div>
    </div>

    <!-- Studio Section -->
    <div class="mb-16">
      <TitleImageContent
        :title="artisteContent.studio.title"
        :image="artisteContent.studio.image"
        :caption="artisteContent.studio.caption"
        :position="artisteContent.studio.position"
        :paragraphs="artisteContent.studio.paragraphs"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SectionTitle from '~/components/SectionTitle.vue'
import TitleImageContent from '~/components/TitleImageContent.vue'
import Timeline from '~/components/timeline/Timeline.vue'

interface BiographySection {
  title: string
  image: string
  caption: string
  position: 'left' | 'right'
  paragraphs: string[]
}

interface StudioSection {
  title: string
  image: string
  caption: string
  position: 'left' | 'right'
  paragraphs: string[]
}

interface ArtisteContent {
  biography: BiographySection
  studio: StudioSection
}

const { data: artisteContent } = await useAsyncData<ArtisteContent>(
  'artiste-content',
  () => $fetch('/content/artiste.json')
)
</script>

<style scoped>
</style>
