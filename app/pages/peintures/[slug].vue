<template>
  <div class="relative min-h-screen bg-background text-gray-text">
    <div class="max-w-[72rem] mx-auto px-6">
      <div class="w-full flex justify-end pt-4 pb-4 sm:pt-8 sm:pb-10">
        <NuxtLink
          class="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :to="backToGalleryRoute"
          :aria-label="$t('paintings.detail.backToGallery')"
        >
          <Icon icon="mdi:close" class="text-3xl" />
          <span class="sm:inline text-gray-text font-medium">{{ $t('paintings.detail.backToGallery') }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="mx-auto flex max-w-6xl flex-col px-6 pb-0 pt-0 gap-6 lg:px-10">
      <Transition name="gallery-fade" mode="out-in" appear>
        <div
          v-if="painting"
          :key="painting.slug"
          class="grid flex-1 items-center gap-10 lg:grid-cols-2"
        >
          <figure class="relative flex h-full items-center justify-center bg-background p-0">
            <img
              :src="withBaseImage(painting.image)"
              :alt="$t('paintings.detail.imageAlt', { title: painting.title })"
              class="max-h-[70vh] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="flex flex-col gap-8 text-lg">
            <div>
              <NuxtLink 
                :to="localePath(`/peintures?collection=${encodeURIComponent(painting.collection)}`)"
                class="text-xs font-bold uppercase tracking-[0.55em] text-primary/70 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {{ $t('paintings.detail.collectionPrefix') }} {{ painting.collection }}
              </NuxtLink>
              <h1 class="mt-4 font-heading text-4xl text-primary sm:text-5xl">
                {{ painting.title }}
              </h1>
            </div>

            <dl class="space-y-4 text-base">
              <div class="flex items-baseline justify-between border-b border-stroke pb-3">
                <dt class="font-medium text-gray-text">{{ $t('paintings.detail.dimensions') }}</dt>
                <dd class="font-medium">{{ painting.dimensions }}</dd>
              </div>
              <div class="flex items-baseline justify-between border-b border-stroke pb-3">
                <dt class="font-medium text-gray-text">{{ $t('paintings.detail.technique') }}</dt>
                <dd class="font-medium">{{ painting.technique }}</dd>
              </div>
            </dl>

            <p class="text-lg font-medium leading-relaxed text-gray-text">
              {{ painting.description }}
            </p>

            <div>
              <p class="text-sm font-medium text-primary/70">{{ $t('paintings.detail.questionCta') }}</p>
              <ContactButton
                :to="contactLink"
                :label="$t('actions.contactArtist')"
                :aria-label="$t('actions.contactArtistAboutWork')"
                class="mt-4"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="pending"
          class="flex flex-1 items-center justify-center text-sm text-gray-text"
        >
          {{ $t('paintings.detail.loading') }}
        </div>

        <div
          v-else
          class="flex flex-1 items-center justify-center text-center"
        >
          <p class="text-lg text-primary font-medium">{{ $t('paintings.detail.notFound') }}</p>
        </div>
      </Transition>

      <nav
        class="mt-4 pt-8 flex flex-row items-center justify-between gap-4 text-sm uppercase text-gray-text pb-0 lg:mt-4 lg:pt-0"
        :aria-label="$t('aria.paintingNavigation')"
      >
        <NuxtLink
          v-if="previousPainting"
          class="group flex items-center gap-3 font-bold tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :to="localePath(`/peintures/${previousPainting.slug}`)"
          :aria-label="$t('paintings.detail.previousAriaLabel', { title: previousPainting.title })"
          @click="scrollToTop"
        >
          <Icon icon="mdi:chevron-left" class="text-3xl" />
          <div class="flex flex-col gap-1 tracking-normal">
            <span class="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-text">{{ $t('paintings.detail.previousPainting') }}</span>
            <span class="text-base capitalize text-primary">
              {{ previousPainting.title }}
            </span>
          </div>
        </NuxtLink>
        <span
          v-else
          class="flex items-center gap-3 text-gray-text/30"
          aria-disabled="true"
        >
          <Icon icon="mdi:chevron-left" class="text-3xl" />
          <span class="text-[11px] uppercase tracking-[0.35em]">{{ $t('paintings.detail.collectionStart') }}</span>
        </span>

        <NuxtLink
          v-if="nextPainting"
          class="group flex items-center gap-3 font-bold tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :to="localePath(`/peintures/${nextPainting.slug}`)"
          :aria-label="$t('paintings.detail.nextAriaLabel', { title: nextPainting.title })"
          @click="scrollToTop"
        >
          <div class="flex flex-col gap-1 tracking-normal text-right">
            <span class="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-text">{{ $t('paintings.detail.nextPainting') }}</span>
            <span class="text-base capitalize text-primary">
              {{ nextPainting.title }}
            </span>
          </div>
          <Icon icon="mdi:chevron-right" class="text-3xl" />
        </NuxtLink>
        <span
          v-else
          class="flex items-center gap-3 text-gray-text/30"
          aria-disabled="true"
        >
          <span class="text-[11px] uppercase tracking-[0.35em]">{{ $t('paintings.detail.collectionEnd') }}</span>
          <Icon icon="mdi:chevron-right" class="text-3xl" />
        </span>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { withBaseImage } from '~/utils/withBaseImage'
const route = useRoute()
const { siteUrl, withSiteUrl } = useSiteUrl()
const { t } = useI18n()
const localePath = useLocalePath()

// Gallery state for filter persistence and scroll restoration
const { localizedBackToGalleryRoute, activePaintingSlug } = useGalleryState()
const backToGalleryRoute = localizedBackToGalleryRoute(localePath)

// Update active slug when the route changes (including next/prev navigation)
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      activePaintingSlug.value = String(newSlug)
    }
  },
  { immediate: true }
)

// Typed structure expected from content/peintures.json
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

const currentIndex = computed(() =>
  paintings.value.findIndex((item) => item.slug === String(route.params.slug))
)

if (currentIndex.value === -1) {
  throw createError({ statusCode: 404, statusMessage: 'Peinture introuvable' })
}

const painting: ComputedRef<Painting | null | undefined> = computed(() =>
  currentIndex.value >= 0 ? paintings.value[currentIndex.value] : null
)
const previousPainting = computed(() =>
  currentIndex.value > 0 ? paintings.value[currentIndex.value - 1] : null
)
const nextPainting = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < paintings.value.length - 1
    ? paintings.value[currentIndex.value + 1]
    : null
)

const contactLink = computed(() => {
  if (!painting.value) return { path: localePath('/contact') }
  return {
    path: localePath('/contact'),
    query: {
      oeuvre: painting.value.title,
      technique: painting.value.technique,
    },
  }
})

const fallbackDescription = computed(() => t('paintings.detail.fallbackDescription'))
const metaTitle = computed(() =>
  painting.value ? `${painting.value.title} - ${t('paintings.seo.title')}` : t('paintings.seo.title')
)
const metaDescription = computed(
  () => painting.value?.metaDescription ?? painting.value?.description ?? fallbackDescription.value
)
const metaImage = computed(() => {
  const image = painting.value?.image || '/logo.png'
  return withSiteUrl(withBaseImage(image))
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
  if (!siteUrl || !painting.value) return null

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
      {
        '@type': 'ListItem',
        position: 3,
        name: painting.value.title,
        item: withSiteUrl(localePath(`/peintures/${painting.value.slug}`)),
      },
    ],
  }
})

const artworkSchema = computed(() => {
  if (!siteUrl || !painting.value) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: painting.value.title,
    description: metaDescription.value,
    image: withSiteUrl(withBaseImage(painting.value.image)),
    artform: 'Peinture',
    artMedium: painting.value.technique,
    creator: {
      '@type': 'Person',
      name: 'Marjolene Lasne',
    },
    url: withSiteUrl(localePath(`/peintures/${painting.value.slug}`)),
  }
})

useHead(() => ({
  script: [breadcrumbSchema.value, artworkSchema.value]
    .filter(Boolean)
    .map((schema) => ({
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
}))

function scrollToTop(e: Event) {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .gallery-fade-enter-active,
  .gallery-fade-leave-active {
    transition: opacity 200ms ease;
  }
  .gallery-fade-enter-from,
  .gallery-fade-leave-to {
    opacity: 0;
  }
  .gallery-fade-enter-to,
  .gallery-fade-leave-from {
    opacity: 1;
  }
  figure img {
    max-height: 60vh !important;
  }
  .mx-auto.flex.min-h-screen {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    gap: 2.5rem !important;
  }
}
</style>
