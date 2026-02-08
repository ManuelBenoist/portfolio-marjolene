<template>
  <div class="min-h-screen bg-background">
    <h1 class="sr-only">{{ $t('home.srTitle') }}</h1>
    <!-- ===================== -->
    <!-- MOBILE LAYOUT (< lg)  -->
    <!-- ===================== -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6 lg:hidden">
      <!-- Logo centré -->
      <div class="mb-12 mt-8">
        <NuxtLink 
          :to="localePath('/')" 
          :aria-label="$t('aria.home')"
          :class="['logo-animate', { 'logo-visible': isLogoVisible }]"
        >
          <img 
            :src="withBaseImage('/logo-colonne.png')" 
            :alt="$t('home.logoAlt')" 
            class="h-28 w-auto"
          />
        </NuxtLink>
      </div>

      <!-- Menu vertical centré -->
      <nav class="flex flex-col items-center gap-6">
        <NuxtLink 
          v-for="(item, index) in menuItems" 
          :key="item.path"
          :to="localePath(item.path)"
            :class="['menu-item-animate font-heading text-4xl sm:text-5xl text-primary hover:text-accent transition-colors duration-75', { 'menu-visible': revealedFlags[index], 'menu-smooth': true }]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Language Switcher -->
      <div 
        class="mt-12"
        :class="['menu-item-animate', { 'menu-visible': isLoaded }]"
        :style="{ '--menu-delay': `${150 + menuItems.length * 80}ms` }"
      >
        <LanguageSwitcher />
      </div>
    </div>

    <!-- ===================== -->
    <!-- DESKTOP LAYOUT (>= lg) -->
    <!-- ===================== -->
    <div class="hidden lg:grid lg:grid-cols-2 min-h-screen">
      <!-- Colonne Gauche: Navigation -->
      <div class="relative flex flex-col justify-center px-12 xl:px-20">
        <!-- Logo en haut à gauche -->
        <div 
          class="absolute top-8 left-8 xl:left-12"
          :class="['logo-animate', { 'logo-visible': isLogoVisible }]"
        >
          <NuxtLink :to="localePath('/')" :aria-label="$t('aria.home')">
            <img 
              :src="withBaseImage('/logo-colonne.png')" 
              :alt="$t('home.logoAlt')" 
              class="h-28 xl:h-36 w-auto"
            />
          </NuxtLink>
        </div>

        <!-- Language Switcher en haut à droite de la colonne gauche -->
        <div 
          class="absolute top-10 right-8 xl:right-12"
          :class="['menu-item-animate', { 'menu-visible': isLoaded }]"
          :style="{ '--menu-delay': '100ms' }"
        >
          <LanguageSwitcher />
        </div>

        <!-- Menu vertical aligné à droite -->
        <nav 
          class="flex flex-col items-end gap-8 pr-8 xl:pr-16"
          @mouseleave="activeImage = null"
        >
          <NuxtLink 
            v-for="(item, index) in menuItems" 
            :key="item.path"
            :to="localePath(item.path)"
            :class="['menu-item-animate group font-heading text-5xl xl:text-6xl 2xl:text-7xl text-primary transition-transform hover:text-accent hover:scale-105 origin-right', { 'menu-visible': revealedFlags[index], 'menu-smooth': true }]"
            :style="{ 'transition': 'transform 0.25s ease-out, color 0.25s ease-out' }"
            @mouseenter="activeImage = item.image"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Colonne Droite: Image interactive -->
      <div 
        class="relative overflow-hidden"
        :class="['image-panel-animate', { 'panel-visible': isLoaded }]"
      >
        <!-- Images avec transition fade - apparaît uniquement au hover -->
        <Transition name="fade">
          <img 
            v-if="activeImage"
            :key="activeImage"
            :src="withBaseImage(activeImage)"
            :alt="activeImageAlt"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { withBaseImage } from '~/utils/withBaseImage'
import { useSiteUrl } from '~/composables/useSiteUrl'
import { useContent } from '~/composables/useContent'

definePageMeta({ layout: false })

const { t } = useI18n()
const localePath = useLocalePath()

interface MenuItem {
  label: string
  path: string
  image: string
}

// Load content from JSON (page-specific data: images, paths)
const { data: pages } = await useContent<Record<string, any>>('pages.json')
const pageContent = computed(() => pages.value?.home)

// Build menu items with translated labels but keep the paths/images from JSON
const menuItems = computed<MenuItem[]>(() => {
  const items = pageContent.value?.menuItems || []
  const labelKeys: Record<string, string> = {
    '/artiste': 'home.menuItems.artist',
    '/peintures': 'home.menuItems.paintings',
    '/foulards': 'home.menuItems.scarves',
    '/autres-activites': 'home.menuItems.activities',
    '/contact': 'home.menuItems.contact',
  }
  return items.map((item: MenuItem) => {
    const labelKey = labelKeys[item.path]
    return {
      ...item,
      label: labelKey ? t(labelKey) : item.label,
    }
  })
})

// Image active (null par défaut - apparaît uniquement au hover)
const activeImage = ref<string | null>(null)

// Revealed flags for staggered menu animation
const revealedFlags = ref<boolean[]>([])

// Animation state - logo puis menu
const isLogoVisible = ref(false)
const isLoaded = ref(false)

const { withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => t('home.seo.title') || '')
const metaDescription = computed(() => t('home.seo.description') || '')
const metaImage = withSiteUrl(withBaseImage('/logo-colonne.png'))

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: metaImage,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImage,
})

// Trigger animations after mount (client-only)
onMounted(() => {
  const items = menuItems.value || []
  
  // Preload images for smoother hover interactions
  items.forEach(item => {
    const img = new Image()
    img.src = withBaseImage(item.image)
  })

  // Initialize revealed flags
  revealedFlags.value = items.map(() => false)

  // 1. Affiche le logo d'abord
  requestAnimationFrame(() => {
    isLogoVisible.value = true
  })

  // 2. Puis le menu après un court délai
  setTimeout(() => {
    isLoaded.value = true
    // Staggered reveal des items du menu (desktop & mobile)
    items.forEach((_, i) => {
      setTimeout(() => {
        revealedFlags.value[i] = true
      }, i * 160)
    })
  }, 180)
})

// Alt text dynamique basé sur l'image active
const activeImageAlt = computed(() => {
  const items = menuItems.value || []
  const item = items.find(i => i.image === activeImage.value)
  return item ? `${t('home.imageAltPrefix')} ${item.label}` : t('home.imageAltDefault')
})
</script>

<style scoped>
/* Transition fade premium pour les images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
