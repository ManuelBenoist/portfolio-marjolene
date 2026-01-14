<template>
  <div>
    <Header />

    <header class="mb-8">
      <h1 class="text-4xl font-heading text-primary">UI Playground</h1>
      <p class="mt-2 text-gray-text">Visual test area for layout and components.</p>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-heading mb-4">Language Switcher</h2>
      <LanguageSwitcher />
    </section>


    <section class="mb-12">
      <h2 class="text-2xl font-heading mb-4">Footer Preview</h2>
      <div class="bg-white border p-6 rounded">Footer is rendered by layout below.</div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// Page used for visual QA of components and layout
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
</script>

