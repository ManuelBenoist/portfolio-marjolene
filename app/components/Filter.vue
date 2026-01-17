<template>
  <div>
    <div class="text-[1.325rem] text-[#4A5565] font-['Averia_Serif_Libre'] mb-3">{{ title }}</div>
    <div class="flex flex-wrap gap-3">
      <FilterItem
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :selected="item.value === modelValue"
        @click="$emit('update:modelValue', item.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterItem from './FilterItem.vue'
defineProps<{
  title: string
  items: Array<{ label: string; value: string }>
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
