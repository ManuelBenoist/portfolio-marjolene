<template>
  <NuxtLink :to="to" class="block group" :id="`painting-${slug}`">
    <PaintingCard 
      :image="image"
      :title="title"
      :technique="technique"
      :dimensions="dimensions"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import PaintingCard from './PaintingCard.vue'

defineProps<{
  slug: string
  title: string
  collection: string
  description: string
  dimensions: string
  technique: string
  image: string
  to: string
  metaDescription?: string
}>()
</script>
