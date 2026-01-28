<template>
  <div class="relative min-h-screen bg-background text-gray-text">
    <div class="w-full flex justify-end pt-4 pb-4 sm:pt-8 sm:pb-10">
      <NuxtLink
        class="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        to="/peintures"
        aria-label="Retour aux œuvres"
      >
        <iconify-icon icon="mdi:close" class="text-3xl"></iconify-icon>
        <span class="sm:inline text-gray-text font-medium">Retour aux œuvres</span>
      </NuxtLink>
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
              :src="painting.image"
              :alt="`Peinture ${painting.title}`"
              class="max-h-[70vh] w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="flex flex-col gap-8 text-lg">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.55em] text-primary/70">Collection {{ painting.collection }}</p>
              <h1 class="mt-4 font-heading text-4xl text-primary sm:text-5xl">
                {{ painting.title }}
              </h1>
            </div>

            <dl class="space-y-4 text-base">
              <div class="flex items-baseline justify-between border-b border-stroke pb-3">
                <dt class="font-medium text-gray-text">Dimensions</dt>
                <dd class="font-medium">{{ painting.dimensions }}</dd>
              </div>
              <div class="flex items-baseline justify-between border-b border-stroke pb-3">
                <dt class="font-medium text-gray-text">Technique</dt>
                <dd class="font-medium">{{ painting.technique }}</dd>
              </div>
            </dl>

            <p class="text-lg font-medium leading-relaxed text-gray-text">
              {{ painting.description }}
            </p>

            <div>
              <p class="text-sm font-medium text-primary/70">Vous avez une question&nbsp;?</p>
              <ContactButton
                :to="contactLink"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="pending"
          class="flex flex-1 items-center justify-center text-sm text-gray-text"
        >
          Chargement de l'œuvre…
        </div>

        <div
          v-else
          class="flex flex-1 items-center justify-center text-center"
        >
          <p class="text-lg text-primary font-medium">Peinture introuvable.</p>
        </div>
      </Transition>

      <nav
        class="mt-4 pt-8 flex flex-row items-center justify-between gap-4 text-sm uppercase text-gray-text pb-0 lg:mt-4 lg:pt-0"
        aria-label="Navigation entre les peintures"
      >
        <NuxtLink
          v-if="previousPainting"
          class="group flex items-center gap-3 font-bold tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :to="`/peintures/${previousPainting.slug}`"
          :aria-label="`Voir la peinture précédente : ${previousPainting.title}`"
          @click.native="scrollToTop"
        >
          <iconify-icon icon="mdi:chevron-left" class="text-3xl"></iconify-icon>
          <div class="flex flex-col gap-1 tracking-normal">
            <span class="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-text">Peinture précédente</span>
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
          <iconify-icon icon="mdi:chevron-left" class="text-3xl"></iconify-icon>
          <span class="text-[11px] uppercase tracking-[0.35em]">Début de la collection</span>
        </span>

        <NuxtLink
          v-if="nextPainting"
          class="group flex items-center gap-3 font-bold tracking-[0.35em] text-gray-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          :to="`/peintures/${nextPainting.slug}`"
          :aria-label="`Voir la peinture suivante : ${nextPainting.title}`"
          @click.native="scrollToTop"
        >
          <div class="flex flex-col gap-1 tracking-normal text-right">
            <span class="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-text">Peinture suivante</span>
            <span class="text-base capitalize text-primary">
              {{ nextPainting.title }}
            </span>
          </div>
          <iconify-icon icon="mdi:chevron-right" class="text-3xl"></iconify-icon>
        </NuxtLink>
        <span
          v-else
          class="flex items-center gap-3 text-gray-text/30"
          aria-disabled="true"
        >
          <span class="text-[11px] uppercase tracking-[0.35em]">Fin de la collection</span>
          <iconify-icon icon="mdi:chevron-right" class="text-3xl"></iconify-icon>
        </span>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'gallery' })

// import { onMounted, onUnmounted } from 'vue'
// onMounted(() => {
//   document.body.classList.add('overflow-hidden')
// })
// onUnmounted(() => {
//   document.body.classList.remove('overflow-hidden')
// })
// import type { ComputedRef } from 'vue'

const route = useRoute()

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
  if (!painting.value) return { path: '/contact' }
  return {
    path: '/contact',
    query: {
      oeuvre: painting.value.title,
      technique: painting.value.technique,
    },
  }
})

const fallbackDescription = 'Découvrez une œuvre originale de Marjolène Lasne.'
const metaTitle = computed(() =>
  painting.value ? `${painting.value.title} - Marjolène Lasne` : 'Peintures - Marjolène Lasne'
)
const metaDescription = computed(
  () => painting.value?.metaDescription ?? painting.value?.description ?? fallbackDescription
)
const metaImage = computed(() => painting.value?.image ?? '/share-default.jpg')

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
