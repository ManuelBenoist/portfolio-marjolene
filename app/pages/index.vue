<template>
  <div class="min-h-screen bg-background">
    <!-- ===================== -->
    <!-- MOBILE LAYOUT (< lg)  -->
    <!-- ===================== -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6 lg:hidden">
      <!-- Logo centré -->
      <div class="mb-12 mt-8">
        <NuxtLink 
          to="/" 
          aria-label="Accueil"
          :class="['logo-animate', { 'logo-visible': isLoaded }]"
        >
          <img 
            src="/logo.jpg" 
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
          :class="['menu-item-animate font-heading text-4xl sm:text-5xl text-primary hover:text-accent transition-colors duration-75', { 'menu-visible': isLoaded }]"
          :style="{ '--menu-delay': `${150 + index * 80}ms` }"
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
          :class="['logo-animate', { 'logo-visible': isLoaded }]"
        >
          <NuxtLink to="/" aria-label="Accueil">
            <img 
              src="/logo.jpg" 
              alt="Marjolène Lasne" 
              class="h-24 xl:h-32 w-auto"
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
        <nav class="flex flex-col items-end gap-8 pr-8 xl:pr-16">
          <NuxtLink 
            v-for="(item, index) in menuItems" 
            :key="item.path"
            :to="item.path"
            :class="['menu-item-animate group font-heading text-5xl xl:text-6xl 2xl:text-7xl text-primary transition-all duration-75 hover:text-accent hover:scale-105 origin-right', { 'menu-visible': isLoaded }]"
            :style="{ '--menu-delay': `${200 + index * 100}ms` }"
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
        <!-- Images avec transition fade -->
        <Transition name="fade" mode="out-in">
          <img 
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
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: false })

// Menu items avec leurs images associées
const menuItems = [
  { 
    label: "L'Artiste", 
    path: '/artiste', 
    image: '/peintures/marjo-peinture-1.avif' 
  },
  { 
    label: 'Peintures', 
    path: '/peintures', 
    image: '/peintures/marjo-peinture-2.avif' 
  },
  { 
    label: 'Foulards', 
    path: '/foulards', 
    image: '/foulards/foulard-marjo-bleu.avif' 
  },
  { 
    label: 'Autres activités', 
    path: '/autres-activites', 
    image: '/peintures/marjo-peinture-4.avif' 
  },
  { 
    label: 'Contact', 
    path: '/contact', 
    image: '/peintures/marjo-peinture-5.avif' 
  },
]

// Image active (par défaut: première image)
const activeImage = ref(menuItems[0].image)

// Animation state - starts false for SSR, becomes true on client mount
const isLoaded = ref(false)

// Trigger animations after mount
onMounted(() => {
  // Small delay to ensure CSS is ready
  requestAnimationFrame(() => {
    isLoaded.value = true
  })
})

// Alt text dynamique basé sur l'image active
const activeImageAlt = computed(() => {
  const item = menuItems.find(i => i.image === activeImage.value)
  return item ? `Image pour ${item.label}` : 'Œuvre de Marjolène Lasne'
})
</script>

<style scoped>
/* Transition fade pour les images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
