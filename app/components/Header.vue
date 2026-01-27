
<template>
  <header class="w-full bg-white border-b border-stroke">
    <div class="max-w-6xl mx-auto flex items-center justify-between py-2 px-6">
      <!-- Logo toujours visible -->
      <NuxtLink :to="localePath('/')" class="flex items-center shrink-0" :aria-label="$t('nav.accueil')">
        <img src="/logo.jpg" alt="Marjolène Lasne" class="h-16 sm:h-20 w-auto max-h-[80px]" />
      </NuxtLink>

      <!-- Menu principal desktop -->
      <nav class="hidden lg:flex flex-1 justify-center">
        <ul class="flex gap-8">
          <li>
            <NuxtLink :to="localePath('/artiste')" class="header-link">{{ $t('nav.artiste') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/peintures')" class="header-link">{{ $t('nav.peintures') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/foulards')" class="header-link">{{ $t('nav.foulards') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/autres-activites')" class="header-link">{{ $t('nav.autresActivites') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="header-link">{{ $t('nav.contact') }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Menu mobile/tablette : burger -->
      <div class="lg:hidden flex-1 flex justify-end">
        <button @click="menuOpen = !menuOpen" :aria-label="$t('accessibility.openMenu')" class="p-2 focus:outline-none">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Language Switcher visible uniquement sur desktop -->
      <div class="ml-6 hidden lg:block">
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Menu mobile/tablette déroulant -->
    <transition name="fade">
      <nav v-if="menuOpen" class="lg:hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center">
        <!-- Logo dans le menu burger -->
        <NuxtLink :to="localePath('/')" class="absolute top-6 left-6" :aria-label="$t('nav.accueil')" @click="menuOpen = false">
          <img src="/logo.jpg" alt="Marjolène Lasne" class="h-12 w-auto" />
        </NuxtLink>
        <button @click="menuOpen = false" :aria-label="$t('accessibility.closeMenu')" class="absolute top-6 right-6 p-2">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul class="flex flex-col gap-8 text-center mt-20">
          <li>
            <NuxtLink :to="localePath('/artiste')" class="header-link text-2xl" @click="menuOpen = false">{{ $t('nav.artiste') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/peintures')" class="header-link text-2xl" @click="menuOpen = false">{{ $t('nav.peintures') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/foulards')" class="header-link text-2xl" @click="menuOpen = false">{{ $t('nav.foulards') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/autres-activites')" class="header-link text-2xl" @click="menuOpen = false">{{ $t('nav.autresActivites') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="header-link text-2xl" @click="menuOpen = false">{{ $t('nav.contact') }}</NuxtLink>
          </li>
        </ul>
        <div class="mt-12">
          <LanguageSwitcher />
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const localePath = useLocalePath()
const menuOpen = ref(false)
</script>


<style scoped>
.header-link {
  font-family: 'Averia Serif Libre', serif;
  font-size: 1.5rem;
  color: #2E3D8B;
  padding: 0 0.5rem;
  transition: color 0.2s, transform 0.2s;
  text-decoration: none;
  font-weight: 400;
  position: relative;
}
.header-link:hover, .header-link:focus {
  color: #C94E54;
  outline: none;
  transform: scale(1.06);
}
.header-link.router-link-exact-active {
  color: #C94E54;
}
</style>
