<template>
  <div class="min-h-screen bg-background text-gray-text">
    <Header />
    <main class="w-95">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>
