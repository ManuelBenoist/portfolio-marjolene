<template>
  <div class="min-h-screen bg-background text-gray-text">
    <Header />
    <main class="pt-16">
      <div class="max-w-6xl mx-auto px-6 py-12">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
</script>
