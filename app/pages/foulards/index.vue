<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Page Header -->
      <SectionTitle 
          title="Foulards"
          subtitle="Découvrez la collection de foulards en soie de Marjolène Lasne, fabriqués en France en édition limitée."
        />

        <!-- Separator -->
        <hr class="border-t border-[#E5DFD3] mb-10" />

        <!-- Loading state -->
        <div v-if="pending" class="text-center py-12">
          <p class="text-[#4A5565]">Chargement des foulards...</p>
        </div>

        <!-- Gallery -->
        <template v-else>
          <div v-if="foulardsForGrid.length">
            <FoulardGrid :items="foulardsForGrid" />
          </div>

          <div v-else class="text-center py-12">
            <p class="text-[#4A5565]">Aucun foulard disponible pour le moment.</p>
          </div>
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import SectionTitle from '~/components/SectionTitle.vue'
import FoulardGrid from '~/components/FoulardGrid.vue'
import { useSiteUrl } from '~/composables/useSiteUrl'

// Fetch raw data
const { data: rawFoulards, pending } = await useContent<RawFoulard[]>('foulards.json')

// Gallery state for scroll restoration
const { activeFoulardSlug } = useGalleryState()

interface ColorOption {
  id: string
  label: string
  hex: string
}

interface SizeOption {
  id: string
  label: string
}

interface MaterialOption {
  id: string
  label: string
}

interface ImageSource {
  src: string
  alt?: string
}

// Raw JSON structure (nested colors/materials with sizes)
interface RawMaterial {
  id: string
  label: string
  images: ImageSource[]
  sizes: SizeOption[]
}

interface RawColor {
  id: string
  label: string
  hex: string
  materials: Record<string, RawMaterial>
}

interface RawFoulard {
  slug: string
  title: string
  description: string
  colors: Record<string, RawColor>
}

// Pour FoulardGrid : on passe un tableau d'objets {slug, title, description, colors}
const foulardsForGrid = computed(() => {
  if (!rawFoulards.value) return []
  return rawFoulards.value.map(foulard => ({
    slug: foulard.slug,
    title: foulard.title,
    description: foulard.description,
    colors: Object.values(foulard.colors)
  }))
})

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = 'Foulards - Marjolene Lasne'
const metaDescription = 'Decouvrez les foulards en soie de Marjolene Lasne, pieces uniques fabriquees en France.'
const metaImage = computed(() => {
  const firstFoulard = rawFoulards.value?.[0]
  const firstColor = firstFoulard ? Object.values(firstFoulard.colors)[0] : null
  const firstMaterial = firstColor ? Object.values(firstColor.materials)[0] : null
  const image = firstMaterial?.images?.[0]?.src || '/logo.png'
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
        name: 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Foulards',
        item: withSiteUrl('/foulards'),
      },
    ],
  }
})

useHead(() => ({
  script: breadcrumbSchema.value
    ? [{ type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) }]
    : [],
}))

// Scroll restoration: scroll to the foulard card after returning from detail page
onMounted(() => {
  if (activeFoulardSlug.value) {
    const slugToScrollTo = activeFoulardSlug.value
    // Clear immediately to prevent re-triggering
    activeFoulardSlug.value = ''
    
    // Use nextTick + requestAnimationFrame to ensure DOM is fully rendered
    nextTick(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(`foulard-${slugToScrollTo}`)
        if (element) {
          // Use scrollIntoView with instant behavior to avoid animation
          element.scrollIntoView({ behavior: 'instant', block: 'center' })
        }
      })
    })
  }
})

</script>
