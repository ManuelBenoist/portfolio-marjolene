<template>
  <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    <FoulardCard
      v-for="(item, idx) in items"
      :key="item.slug || item.title"
      :slug="item.slug"
      :title="item.title"
      :description="item.description"
      :colors="item.colors"
      :style="{ '--stagger-delay': `${idx * 60}ms` }"
      class="stagger-item"
    />
  </div>
</template>

<script setup lang="ts">
import FoulardCard from './FoulardCard.vue'

defineProps<{
  items: any[]
}>()
</script>
