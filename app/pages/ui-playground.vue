<template>
  <div>

    <header class="mb-8">
      <h1 class="text-4xl font-heading text-primary">UI Playground</h1>
      <p class="mt-2 text-gray-text">Zone de tests d'affichage des composants UI</p>
    </header>

    <section class="mb-12">
      <h2 class="text-2xl font-heading mb-4">Header Preview</h2>
      <Header />
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-heading mb-4">Footer Preview</h2>
      <Footer />
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-heading mb-4">Language Switcher</h2>
      <LanguageSwitcher />
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-heading mb-4">Painting Card</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        <PaintingCard
          image="/peintures/marjo-peinture-1.avif"
          title="Roussillon aux fleurs sauvages"
          technique="Huile sur toile"
          dimensions="80cm x 120cm"
        />
        <PaintingCard
          image="/peintures/marjo-peinture-2.avif"
          title="Roussillon aux fleurs sauvages"
          technique="Huile sur toile"
          dimensions="80cm x 120cm"
        />
        <PaintingCard
          image="/peintures/marjo-peinture-3.avif"
          title="Roussillon aux fleurs sauvages"
          technique="Huile sur toile"
          dimensions="80cm x 120cm"
        />

      </div>
    </section>

  </div>
</template>

<script setup>
// Page used for visual QA of components and layout
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
</script>
