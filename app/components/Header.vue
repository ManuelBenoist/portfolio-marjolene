<template>
  <header v-if="common" class="w-full bg-white border-b border-stroke">
    <div class="max-w-6xl mx-auto flex items-center justify-between py-3 px-6">
      <!-- Logo à gauche -->
      <NuxtLink to="/" class="flex items-center shrink-0" :aria-label="common.aria.home">
        <img src="/logo.png" :alt="common.footer.presentation.name" class="h-20 w-auto" />
      </NuxtLink>

      <!-- Menu aligné à droite (desktop) -->
      <nav class="hidden lg:flex items-center">
        <ul class="flex gap-6">
          <li>
            <NuxtLink to="/artiste" class="header-link">{{ common.nav.artist }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/peintures" class="header-link">{{ common.nav.paintings }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/foulards" class="header-link">{{ common.nav.scarves }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/autres-activites" class="header-link">{{ common.nav.activities }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="header-link">{{ common.nav.contact }}</NuxtLink>
          </li>
        </ul>
        <div class="ml-6">
          <LanguageSwitcher />
        </div>
      </nav>

      <!-- Menu mobile/tablette : burger -->
      <div class="lg:hidden">
        <button @click="menuOpen = !menuOpen" :aria-label="common.actions.openMenu" class="p-2 focus:outline-none">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile/tablette déroulant -->
    <transition name="fade">
      <nav v-if="menuOpen" class="lg:hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center">
        <!-- Logo dans le menu burger -->
        <NuxtLink to="/" class="absolute top-6 left-6" :aria-label="common.aria.home" @click="menuOpen = false">
          <img src="/logo.png" :alt="common.footer.presentation.name" class="h-12 w-auto" />
        </NuxtLink>
        <button @click="menuOpen = false" :aria-label="common.actions.closeMenu" class="absolute top-6 right-6 p-2">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul class="flex flex-col gap-8 text-center mt-20">
          <li>
            <NuxtLink to="/artiste" class="header-link text-2xl" @click="menuOpen = false">{{ common.nav.artist }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/peintures" class="header-link text-2xl" @click="menuOpen = false">{{ common.nav.paintings }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/foulards" class="header-link text-2xl" @click="menuOpen = false">{{ common.nav.scarves }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/autres-activites" class="header-link text-2xl" @click="menuOpen = false">{{ common.nav.activities }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="header-link text-2xl" @click="menuOpen = false">{{ common.nav.contact }}</NuxtLink>
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
import { useContent } from '~/composables/useContent'

const menuOpen = ref(false)
const { data: common } = await useContent('common.json')
</script>

<style scoped>
.header-link {
  font-family: 'Averia Serif Libre', serif;
  font-size: 1.25rem;
  color: #2E3D8B;
  padding: 0 0.25rem;
  transition: color 0.2s, transform 0.2s;
  text-decoration: none;
  font-weight: 400;
  position: relative;
}
.header-link:hover, .header-link:focus {
  color: #C94E54;
  outline: none;
  transform: scale(1.05);
}
.header-link.router-link-exact-active {
  color: #C94E54;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
