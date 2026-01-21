<template>
  <div class="min-h-screen bg-[#FBFAF6] text-[#4A5565]">
    <!-- Back Navigation -->
    <div class="w-full px-6 sm:px-12 md:px-24 pt-6 pb-4">
      <NuxtLink
        class="inline-flex items-center gap-2 text-sm font-medium text-[#2E3D8B] transition-colors hover:text-[#C94E54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54] focus-visible:ring-offset-2"
        to="/foulards"
        aria-label="Retour aux foulards"
      >
        <iconify-icon icon="mdi:arrow-left" class="text-xl"></iconify-icon>
        <span>Retour aux foulards</span>
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12 pb-16">
      <Transition name="page-fade" mode="out-in" appear>
        <!-- Foulard Found -->
        <div
          v-if="foulard"
          :key="foulard.slug"
          class="grid gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <!-- Left Column: Images -->
          <div class="flex flex-col gap-4">
            <!-- Main Image (always first image) -->
            <button
              type="button"
              class="relative aspect-square w-full overflow-hidden bg-white shadow-sm cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54]"
              :aria-label="`Agrandir l'image de ${foulard.title}`"
              @click="openLightbox(0)"
            >
              <img
                :src="activeImages[0].src"
                :alt="activeImages[0].alt || foulard.title"
                class="h-full w-full object-cover transition-opacity duration-300"
                loading="lazy"
                decoding="async"
              />
            </button>

            <!-- Thumbnail Gallery: 2 per row, skip main image -->
            <div v-if="activeImages.length > 1" class="flex flex-col gap-2">
              <div
                class="grid grid-cols-2 gap-2 w-full"
              >
                <button
                  v-for="(image, idx) in activeImages.slice(1)"
                  :key="idx"
                  type="button"
                  class="relative aspect-square w-full h-auto overflow-hidden bg-white shadow-sm transition-all duration-200 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54] opacity-80 hover:opacity-100"
                  :aria-label="`Agrandir l'image ${idx + 2}`"
                  @click="openLightbox(idx + 1)"
                >
                  <img
                    :src="image.src"
                    :alt="image.alt || `${foulard.title} - vue ${idx + 2}`"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Details -->
          <div class="flex flex-col gap-6">
            <!-- Title & Description -->
            <div>
              <h1 class="font-['Averia_Serif_Libre'] text-3xl font-light text-[#2E3D8B] sm:text-4xl">
                {{ foulard.title }}
              </h1>
              <p class="mt-3 text-base leading-relaxed text-[#4A5565]">
                {{ foulard.description }}
              </p>
            </div>

            <!-- Color Selection -->
            <section class="flex flex-col gap-2">
              <div class="text-sm font-medium text-[#4A5565]">
                Couleur : 
                <span class="font-semibold text-[#2E3D8B]">{{ activeColor?.label || '—' }}</span>
              </div>
              <ColorSwatch v-model="selectedColorId" :options="colorOptions" />
            </section>

            <!-- Size Selection -->
            <section class="flex flex-col gap-2">
              <div class="text-sm font-medium text-[#4A5565]">
                Taille : 
                <span class="font-semibold text-[#2E3D8B]">{{ activeSize?.label || '—' }}</span>
              </div>
              <SizeList v-model="selectedSizeId" :sizes="foulard.sizes" />
            </section>

            <!-- Material Selection -->
            <section class="flex flex-col gap-2">
              <div class="text-sm font-medium text-[#4A5565]">
                Matière : 
                <span class="font-semibold text-[#2E3D8B]">{{ activeMaterial?.label || '—' }}</span>
              </div>
              <MaterialBadge v-model="selectedMaterialId" :options="materialOptions" />
            </section>

            <!-- Separator -->
            <div class="border-t border-[#E5E1D6]"></div>

            <!-- Selection Summary -->
            <dl class="space-y-3 text-sm">
              <div class="flex items-baseline justify-between">
                <dt class="text-[#4A5565]">Dimensions</dt>
                <dd class="font-medium text-[#2E3D8B]">{{ activeSize?.label || '—' }}</dd>
              </div>
              <div class="flex items-baseline justify-between">
                <dt class="text-[#4A5565]">Matière</dt>
                <dd class="font-medium text-[#2E3D8B]">{{ activeMaterial?.label || '—' }}</dd>
              </div>
              <div class="flex items-baseline justify-between">
                <dt class="text-[#4A5565]">Couleur</dt>
                <dd class="font-medium text-[#2E3D8B]">{{ activeColor?.label || '—' }}</dd>
              </div>
            </dl>

            <!-- CTA Button -->
            <ContactButton
              :to="contactLink"
              label="Contacter l'artiste"
              aria-label="Contacter l'artiste pour ce foulard"
              class="w-full justify-center"
            />

            <!-- Separator -->
            <div class="border-t border-[#E5E1D6]"></div>

            <!-- Mentions -->
            <ul v-if="foulard.mentions && foulard.mentions.length > 0" class="space-y-2 text-sm text-[#4A5565]">
              <li v-for="(mention, index) in foulard.mentions" :key="index" class="flex items-start gap-2">
                <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2E3D8B]"></span>
                <span>{{ mention }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-else-if="pending"
          class="flex min-h-[50vh] items-center justify-center"
        >
          <p class="text-sm text-[#4A5565]">Chargement du foulard…</p>
        </div>

        <!-- Not Found State -->
        <div
          v-else
          class="flex min-h-[50vh] flex-col items-center justify-center gap-4"
        >
          <p class="text-lg font-medium text-[#2E3D8B]">Foulard introuvable.</p>
          <NuxtLink
            to="/foulards"
            class="text-sm text-[#C94E54] underline hover:no-underline"
          >
            Retour à la collection
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <!-- Image Lightbox -->
    <ImageLightbox
      v-model:show="isLightboxOpen"
      v-model="activeImageIndex"
      :images="activeImages"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ComputedRef } from 'vue'

import ColorSwatch from '~/components/ColorSwatch.vue'
import MaterialBadge from '~/components/MaterialBadge.vue'
import SizeList from '~/components/SizeList.vue'
import ContactButton from '~/components/ContactButton.vue'
import ImageLightbox from '~/components/ImageLightbox.vue'

definePageMeta({ layout: 'wide' })

// Types adaptés à la nouvelle structure
interface ImageSource {
  src: string
  alt?: string
}
interface Material {
  id: string
  label: string
  images: ImageSource[]
}
interface Color {
  id: string
  label: string
  hex: string
  materials: Record<string, Material>
}
interface Foulard {
  slug: string
  title: string
  description: string
  colors: Record<string, Color>
  sizes: { id: string; label: string }[]
  mentions: string[]
  metaDescription?: string
}

// Route & Data Fetching
const route = useRoute()

const { data: foulardsData, pending } = await useAsyncData<Foulard[]>(
  'foulards-detail',
  () => $fetch('/content/foulards.json')
)
const foulards = computed(() => foulardsData.value ?? [])
const foulard: ComputedRef<Foulard | null | undefined> = computed(() =>
  foulards.value.find((item) => item.slug === String(route.params.slug))
)
// 404 handling
if (!foulard.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Foulard introuvable' })
}

// Reactive State
const colorOptions = computed(() =>
  foulard.value ? Object.values(foulard.value.colors).map(({ id, label, hex }) => ({ id, label, hex })) : []
)
const selectedColorId = ref<string | null>(colorOptions.value[0]?.id ?? null)
const selectedMaterialId = ref<string | null>(null)
const selectedSizeId = ref<string | null>(foulard.value?.sizes[0]?.id ?? null)
const activeImageIndex = ref(0)
const isLightboxOpen = ref(false)

function openLightbox(index: number) {
  activeImageIndex.value = index
  isLightboxOpen.value = true
}

// Met à jour la matière disponible selon la couleur sélectionnée
const materialOptions = computed(() => {
  if (!foulard.value || !selectedColorId.value) return []
  const color = foulard.value.colors[selectedColorId.value]
  return color ? Object.values(color.materials).map(({ id, label }) => ({ id, label })) : []
})

// Initialisation des sélections
watch(
  () => foulard.value,
  (newFoulard) => {
    if (newFoulard) {
      const colorIds = Object.keys(newFoulard.colors)
      selectedColorId.value = colorIds[0] ?? null
      const firstColor = colorIds[0] ? newFoulard.colors[colorIds[0]] : null
      const materialIds = firstColor ? Object.keys(firstColor.materials) : []
      selectedMaterialId.value = materialIds[0] ?? null
      selectedSizeId.value = newFoulard.sizes[0]?.id ?? null
      activeImageIndex.value = 0
    }
  },
  { immediate: true }
)

// Met à jour la matière quand la couleur change
watch(
  () => selectedColorId.value,
  (newColorId) => {
    if (foulard.value && newColorId) {
      const color = foulard.value.colors[newColorId]
      const materialIds = color ? Object.keys(color.materials) : []
      selectedMaterialId.value = materialIds[0] ?? null
      activeImageIndex.value = 0
    }
  }
)

const activeColor = computed(() =>
  selectedColorId.value && foulard.value ? foulard.value.colors[selectedColorId.value] : null
)
const activeMaterial = computed(() =>
  activeColor.value && selectedMaterialId.value ? activeColor.value.materials[selectedMaterialId.value] : null
)
const activeSize = computed(() =>
  foulard.value?.sizes.find((s) => s.id === selectedSizeId.value) ?? null
)

const activeImages = computed(() => {
  if (activeMaterial.value && activeMaterial.value.images.length > 0) {
    return activeMaterial.value.images
  }
  // fallback: images d'une autre matière de la couleur
  if (activeColor.value) {
    const mats = Object.values(activeColor.value.materials)
    if (mats.length > 0) return mats[0].images
  }
  // fallback: image générique
  return [{ src: '/foulards/foulard-marjo-bleu.avif', alt: 'Foulard' }]
})

const activeImage = computed(() => activeImages.value[activeImageIndex.value] ?? activeImages.value[0])

// Plus besoin de thumbnailRows ni imageIndexInList : grid-cols-2 natif

// Contact link with query params
const contactLink = computed(() => {
  if (!foulard.value) return { path: '/contact' }
  return {
    path: '/contact',
    query: {
      sujet: 'foulard',
      produit: foulard.value.title,
      couleur: activeColor.value?.label,
      taille: activeSize.value?.label,
      matiere: activeMaterial.value?.label,
    },
  }
})

// SEO Meta
const fallbackDescription = 'Découvrez un foulard unique de Marjolène Lasne.'
const metaTitle = computed(() =>
  foulard.value ? `${foulard.value.title} - Foulards - Marjolène Lasne` : 'Foulards - Marjolène Lasne'
)
const metaDescription = computed(
  () => foulard.value?.metaDescription ?? foulard.value?.description ?? fallbackDescription
)
const metaImage = computed(() => activeImages.value[0]?.src ?? '/foulards/foulard-marjo-bleu.avif')

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
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
.page-fade-enter-to,
.page-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
