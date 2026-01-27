<template>
  <div class="min-h-screen bg-background">
    <!-- ===================== -->
    <!-- MOBILE LAYOUT (< lg)  -->
    <!-- ===================== -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6 lg:hidden">
      <!-- Logo centré -->
      <div class="mb-12 mt-8">
        <NuxtLink :to="localePath('/')" :aria-label="$t('nav.accueil')">
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
          v-for="item in menuItems" 
          :key="item.path"
          :to="localePath(item.path)"
          class="font-heading text-4xl sm:text-5xl text-primary hover:text-accent transition-colors duration-150"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Language Switcher -->
      <div class="mt-12">
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
        <div class="absolute top-8 left-8 xl:left-12">
          <NuxtLink :to="localePath('/')" :aria-label="$t('nav.accueil')">
            <img 
              src="/logo.jpg" 
              alt="Marjolène Lasne" 
              class="h-24 xl:h-32 w-auto"
            />
          </NuxtLink>
        </div>

        <!-- Language Switcher en haut à droite de la colonne gauche -->
        <div class="absolute top-10 right-8 xl:right-12">
          <LanguageSwitcher />
        </div>

        <!-- Menu vertical aligné à droite -->
        <nav class="flex flex-col items-end gap-8 pr-8 xl:pr-16">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="localePath(item.path)"
              class="group font-heading text-5xl xl:text-6xl 2xl:text-7xl text-primary transition-all duration-150 hover:text-accent hover:scale-105 origin-right"
            @mouseenter="activeImage = item.image"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Colonne Droite: Image interactive -->
      <div class="relative overflow-hidden">
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
definePageMeta({ layout: false })

const { t } = useI18n()
const localePath = useLocalePath()

// Menu items avec leurs images associées (computed for reactivity on locale change)
const menuItems = computed(() => [
  { 
    label: t('nav.artiste'), 
    path: '/artiste', 
    image: '/peintures/marjo-peinture-1.avif' 
  },
  { 
    label: t('nav.peintures'), 
    path: '/peintures', 
    image: '/peintures/marjo-peinture-2.avif' 
  },
  { 
    label: t('nav.foulards'), 
    path: '/foulards', 
    image: '/foulards/foulard-marjo-bleu.avif' 
  },
  { 
    label: t('nav.autresActivites'), 
    path: '/autres-activites', 
    image: '/peintures/marjo-peinture-4.avif' 
  },
  { 
    label: t('nav.contact'), 
    path: '/contact', 
    image: '/peintures/marjo-peinture-5.avif' 
  },
])

// Image active (par défaut: première image)
const activeImage = ref('/peintures/marjo-peinture-1.avif')

// Alt text dynamique basé sur l'image active
const activeImageAlt = computed(() => {
  const item = menuItems.value.find(i => i.image === activeImage.value)
  return item ? t('home.imageAlt', { item: item.label }) : 'Œuvre de Marjolène Lasne'
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
