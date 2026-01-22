<template>
  <div class="min-h-screen bg-background text-gray-text">
    <Header />
    <main>
      <div class="max-w-[72rem] mx-auto py-12">
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
