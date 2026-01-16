<template>
  <div>
    <header class="mb-8">
      <h1 class="text-4xl font-heading text-primary">UI Playground</h1>
      <p class="mt-2 text-gray-text">Zone de tests d'affichage des composants UI</p>
    </header>

    <section class="mb-12 section-demo">
      <h2 class="text-2xl font-heading mb-4">Header Preview</h2>
      <Header />
    </section>

    <section class="mb-12 section-demo">
      <h2 class="text-2xl font-heading mb-4">Footer Preview</h2>
      <Footer />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Language Switcher</h2>
      <LanguageSwitcher />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Painting Card</h2>
      <CardGrid
        :items="[
          { image: '/peintures/marjo-peinture-1.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' },
          { image: '/peintures/marjo-peinture-2.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' },
          { image: '/peintures/marjo-peinture-3.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' }
        ]"
        :cardComponent="PaintingCard"
      />
    </section>
    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Section Title</h2>
        <SectionTitle
        title="Peintures"
        subtitle="Découvrez une sélection d'œuvres originales, inspirées par les paysages méditerranéens et la lumière du Sud."
      />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Filter Component</h2>
      <Filter
        title="Collections"
        :items="[
          { label: 'Toutes', value: 'all' },
          { label: 'Paysages', value: 'paysages' },
          { label: 'Terrasses & Marchés', value: 'terrasses' },
        ]"
        v-model="selected"
    />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Title Image Content</h2>
      <TitleImageContent
        title="Biographie"
        image="/Marjolène-Lasne.png"
        caption="Marjolène Lasne , ses pinceaux et son chevalet"
        position="left"
        :paragraphs="[
          'Marjolène Lasne est une artiste peintre française basée en Provence. Son œuvre, profondément ancrée dans la lumière méditerranéenne, explore les paysages, les terrasses et les scènes d\'intérieur avec une sensibilité unique.',
          'Formée aux Beaux-Arts de Paris, elle développe rapidement un style personnel caractérisé par des compositions lumineuses et des palettes de couleurs chaudes inspirées du Sud de la France. Son travail a été exposé dans de nombreuses galeries en France et à l\'international.',
          'Elle partage désormais son temps entre la création, l\'enseignement et les résidences artistiques. Passionnée par la transmission de son art, Marjolène anime régulièrement des ateliers et accompagne des artistes émergents dans leur développement artistique.'
        ]"
      />
    </section>
    
  </div>
</template>

    <style scoped>
    h2 {
      color: #C94E54;
    }
    .section-demo {
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 2rem;
      background: #fff;
    }
    </style>


<script setup>
// Page used for visual QA of components and layout
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import CardGrid from "../components/CardGrid.vue"
import PaintingCard from "../components/PaintingCard.vue"
import SectionTitle from "../components/SectionTitle.vue"
import Filter from "../components/Filter.vue"
import TitleImageContent from "../components/TitleImageContent.vue"
</script>