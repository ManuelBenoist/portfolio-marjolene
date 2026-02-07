<template>
  <div class="w-full">
    <!-- Section Title & Biography (contained) -->
    <div class="max-w-[72rem] mx-auto px-6 pt-12">
      <SectionTitle
        :title="$t('artist.title')"
        :subtitle="$t('artist.subtitle')"
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

      <!-- Quote 1 -->
      <QuoteBlock
        :quote="$t('artist.quotes.0.quote')"
        :author="$t('artist.quotes.0.author')"
        :role="$t('artist.quotes.0.role')"
      />
    </div>

    <!-- Timeline Section (full-width background) -->
    <div class="w-full bg-[#C94E54]/[0.04] py-16 mb-16">
      <div class="max-w-[72rem] mx-auto pl-14">
        <h2 class="text-[2.5rem] font-['Averia_Serif_Libre'] font-light text-[#C94E54] mb-8">{{ $t('artist.timelineTitle') }}</h2>
        <Timeline />
      </div>
    </div>

    <!-- Quote 2 & Studio Section (contained) -->
    <div class="max-w-[72rem] mx-auto px-6 pb-12">
      <!-- Quote 2 -->
      <QuoteBlock
        :quote="$t('artist.quotes.1.quote')"
        :author="$t('artist.quotes.1.author')"
        :role="$t('artist.quotes.1.role')"
        :source="$t('artist.quotes.1.source')"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SectionTitle from '~/components/SectionTitle.vue'
import { useContent } from '~/composables/useContent'
import TitleImageContent from '~/components/TitleImageContent.vue'
import Timeline from '~/components/timeline/Timeline.vue'
import QuoteBlock from '~/components/QuoteBlock.vue'
import { useSiteUrl } from '~/composables/useSiteUrl'

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

const { t } = useI18n()
const localePath = useLocalePath()

const { data: artisteContent } = await useContent<ArtisteContent>('artiste.json')

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => t('artist.seo.title') || '')
const metaDescription = computed(() => t('artist.seo.description') || '')
const metaImage = computed(() => {
  const image = artisteContent.value?.biography?.image || '/logo.png'
  return withSiteUrl(image)
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
        name: t('artist.breadcrumb.home') || 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('artist.breadcrumb.current') || "L'Artiste",
        item: withSiteUrl(localePath('/artiste')),
      },
    ],
  }
})

useHead(() => ({
  script: breadcrumbSchema.value
    ? [{ type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) }]
    : [],
}))
</script>

<style scoped>
</style>
