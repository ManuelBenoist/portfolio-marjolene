<template>
  <header>
    <!-- Desktop vertical sidebar -->
    <div class="hidden md:flex md:flex-col md:h-screen md:w-72 md:fixed md:left-0 md:top-0 bg-white border-r border-stroke p-6">
      <div class="mb-8">
        <NuxtLink to="/" class="text-2xl font-heading text-primary">Marjolène Lasne</NuxtLink>
      </div>
      <nav class="flex-1 space-y-4">
        <NuxtLink to="/" class="block text-lg hover:text-accent">Accueil</NuxtLink>
        <NuxtLink to="/peintures" class="block text-lg hover:text-accent">Peintures</NuxtLink>
        <NuxtLink to="/foulards" class="block text-lg hover:text-accent">Foulards</NuxtLink>
        <NuxtLink to="/artiste" class="block text-lg hover:text-accent">L'Artiste</NuxtLink>
        <NuxtLink to="/contact" class="block text-lg hover:text-accent">Contact</NuxtLink>
      </nav>
      <div class="mt-6">
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Mobile top bar -->
    <div class="md:hidden bg-white border-b border-stroke p-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-lg font-heading text-primary">Marjolène</NuxtLink>
      <div class="flex items-center space-x-4">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>
