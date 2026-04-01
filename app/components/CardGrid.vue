<template>
  <div :class="gridClass">
    <component
      v-for="(item, idx) in items"
      :is="cardComponent"
      v-bind="item"
      :key="item.id || item.slug || idx"
      :style="{ '--stagger-delay': `${idx * 60}ms` }"
      class="stagger-item"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: Array<any>
  cardComponent: any
}>()

const gridClass = computed(() => {
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center'
})
</script>
