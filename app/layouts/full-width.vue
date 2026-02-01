<template>
  <div class="min-h-screen bg-background text-gray-text flex flex-col">
    <Header />
    <main class="flex-1 w-full">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>
