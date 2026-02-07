<template>
  <div class="min-h-screen bg-background">
    <h1 class="sr-only">Marjolene Lasne - Artiste peintre</h1>
    <!-- ===================== -->
    <!-- MOBILE LAYOUT (< lg)  -->
    <!-- ===================== -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6 lg:hidden">
      <!-- Logo centré -->
      <div class="mb-12 mt-8">
        <NuxtLink 
          to="/" 
          aria-label="Accueil"
          :class="['logo-animate', { 'logo-visible': isLogoVisible }]"
        >
          <img 
            src="/logo.png" 
            alt="Marjolène Lasne" 
            class="h-28 w-auto"
          />
        </NuxtLink>
      </div>

      <!-- Menu vertical centré -->
      <nav class="flex flex-col items-center gap-6">
        <NuxtLink 
          v-for="(item, index) in menuItems" 
          :key="item.path"
          :to="item.path"
            :class="['menu-item-animate font-heading text-4xl sm:text-5xl text-primary hover:text-accent transition-colors duration-75', { 'menu-visible': revealedMenu[index], 'menu-smooth': true }]"
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
          <NuxtLink to="/" aria-label="Accueil">
            <img 
              src="/logo.png" 
              alt="Marjolène Lasne" 
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
            :to="item.path"
            :class="['menu-item-animate group font-heading text-5xl xl:text-6xl 2xl:text-7xl text-primary transition-transform hover:text-accent hover:scale-105 origin-right', { 'menu-visible': revealedMenu[index], 'menu-smooth': true }]"
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
            :src="activeImage"
            :alt="activeImageAlt"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useSiteUrl } from '~/composables/useSiteUrl'

definePageMeta({ layout: false })

// Menu items avec leurs images associées
const menuItems = [
  { 
    label: "L'Artiste", 
    path: '/artiste', 
    image: '/img/accueil/Marjolène-Lasne.webp' 
  },
  { 
    label: 'Peintures', 
    path: '/peintures', 
    image: '/img/accueil/en_terrasse_parmi_les_fleurs.webp' 
  },
  { 
    label: 'Foulards', 
    path: '/foulards', 
    image: '/img/accueil/rose-degrade-orange-BMS-84x84.webp' 
  },
  { 
    label: 'Autres activités', 
    path: '/autres-activites', 
    image: '/img/accueil/gites_illu.webp' 
  },
  { 
    label: 'Contact', 
    path: '/contact', 
    image: '/img/accueil/gordes_aux_iris.webp' 
  },
]

// Image active (null par défaut - apparaît uniquement au hover)
const activeImage = ref(null)

// Pour le stagger/reveal progressif des items du menu
const revealedMenu = ref(menuItems.map(() => false))

// Animation state - logo puis menu
const isLogoVisible = ref(false)
const isLoaded = ref(false)

const { withSiteUrl } = useSiteUrl()
const metaTitle = 'Marjolene Lasne - Artiste peintre'
const metaDescription = 'Portfolio de Marjolene Lasne, artiste peintre en Provence. Peintures originales, foulards en soie et univers artistique.'
const metaImage = withSiteUrl('/logo.png')

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
  // Preload images for smoother hover interactions
  menuItems.forEach(item => {
    const img = new Image()
    img.src = item.image
  })

  // 1. Affiche le logo d'abord
  requestAnimationFrame(() => {
    isLogoVisible.value = true
  })

  // 2. Puis le menu après un court délai
  setTimeout(() => {
    isLoaded.value = true
    // Staggered reveal des items du menu (desktop & mobile)
    menuItems.forEach((_, i) => {
      setTimeout(() => {
        revealedMenu.value[i] = true
      }, i * 160)
    })
  }, 180)
})

// Alt text dynamique basé sur l'image active
const activeImageAlt = computed(() => {
  const item = menuItems.find(i => i.image === activeImage.value)
  return item ? `Image pour ${item.label}` : 'Œuvre de Marjolène Lasne'
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
