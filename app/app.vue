<template>
  <div class="min-h-screen bg-background text-gray-text flex flex-col">
    <!-- Header: shown on all pages except landing page (layout: false) -->
    <Header v-if="showHeaderFooter" />
    
    <!-- Main content area -->
    <main class="flex-1 w-full" :class="{ 'flex flex-col': !showHeaderFooter }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    
    <!-- Footer: shown on all pages except landing page (layout: false) -->
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Show header/footer on all pages except landing page (which uses layout: false)
const showHeaderFooter = computed(() => route.path !== '/')
</script>
