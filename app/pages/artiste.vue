<template>
  <div class="w-full min-h-screen bg-[#FBFAF6]">
    <main class="flex-1 px-6 sm:px-12 md:px-24">
      <div class="max-w-[72rem] mx-auto">
        <!-- Section Title -->
        <SectionTitle
          title="L'Artiste"
          subtitle="Découvrez le parcours et la passion de Marjolène Lasne, artiste-peintre française inspirée par la lumière méditerranéenne et la beauté du Sud de la France."
        />

        <!-- Divider -->
        <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>

        <!-- Biography Section -->
        <div class="mb-16">
          <TitleImageContent
            v-if="artisteContent"
            :title="artisteContent.biography.title"
            :image="artisteContent.biography.image"
            :caption="artisteContent.biography.caption"
            :position="artisteContent.biography.position"
            :paragraphs="artisteContent.biography.paragraphs"
            :subParagraphs="artisteContent.biography.sub_paragraphs"
          />
        </div>

        <!-- Quote 1: Gwénaëlle de Carné -->
        <QuoteBlock
          quote="La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons, d'illuminer paysages et personnages de sa touche alerte et vibrante. Joliment mises en scènes, ses compositions évoquent des moments fugitifs pleins de charme et de quiétude. Vive et enjouée, sa palette est unique !"
          author="Gwénaëlle de Carné"
          role="Critique d'Art"
        />

        <!-- Timeline Section -->
        <div class="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#C94E54]/[0.04] py-16 px-8 mb-16">
          <div class="max-w-7xl mx-auto">
            <h2 class="text-[2.5rem] font-['Averia_Serif_Libre'] font-light text-[#C94E54] mb-8">Parcours et formation</h2>
            <Timeline />
          </div>
        </div>

        <!-- Quote 2: Thierry Sznytka -->
        <QuoteBlock
          quote="Inspirée d'un quotidien qu'elle traque le carnet de croquis à la main, cette artiste rapporte les scènes de vie d'une palette aux notes enjouées. Cette alchimie colorée et harmonieuse compte sur les contrastes de couleurs et de matière pour stigmatiser la composition. L'écriture alerte révèle les attitudes des personnages, au marché ou au café, au concert ou à la plage. Respectueuse des ambiances, Marjolène Lasne joue avec les volumes et les architectures pour donner un caractère panoramique à son œuvre. Avec un coté spatial pour ces orchestres qui découpent leurs silhouettes sur un fond intemporel."
          author="Thierry Sznytka"
          role="Critique d'Art"
          source="In ARTS ACTUALITÉS MAGAZINE - Hors série Janvier 2006"
        />

        <!-- Studio Section -->
        <div class="mb-16">
          <TitleImageContent
            v-if="artisteContent"
            :title="artisteContent.studio.title"
            :image="artisteContent.studio.image"
            :caption="artisteContent.studio.caption"
            :position="artisteContent.studio.position"
            :paragraphs="artisteContent.studio.paragraphs"
            :subParagraphs="artisteContent.studio.sub_paragraphs"
          />
          <div class="pl-8">
            <ContactButton
              :to="{
                path: '/contact',
                query: {
                  sujet: 'artiste',
                  message: `Bonjour,\n\nJe souhaite contacter l'artiste Marjolène Lasne.\n\nCordialement,`
                }
              }"
              label="Contacter l'artiste"
            />
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SectionTitle from '~/components/SectionTitle.vue'
import { useContent } from '~/composables/useContent'
import TitleImageContent from '~/components/TitleImageContent.vue'
import Timeline from '~/components/timeline/Timeline.vue'
import QuoteBlock from '~/components/QuoteBlock.vue'
import ContactButton from '~/components/ContactButton.vue'

interface BiographySection {
  title: string
  image: string
  caption: string
  position: 'left' | 'right'
  paragraphs: string[]
  sub_paragraphs: string[]
}

interface StudioSection {
  title: string
  image: string
  caption: string
  position: 'left' | 'right'
  paragraphs: string[]
  sub_paragraphs: string[]
}

interface ArtisteContent {
  biography: BiographySection
  studio: StudioSection
}

const { data: artisteContent } = await useContent<ArtisteContent>('artiste.json')
</script>

<style scoped>
</style>
