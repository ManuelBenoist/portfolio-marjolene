<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    <FoulardCard
      v-for="item in items"
      :key="item.slug || item.title"
      :slug="item.slug"
      :title="item.title"
      :description="item.description"
      :colors="item.colors"
    />
  </div>
</template>

<script setup lang="ts">
import FoulardCard from './FoulardCard.vue'

defineProps<{
  items: any[]
}>()
</script>
