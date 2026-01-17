<template>
  <div class="flex flex-wrap gap-3">
    <FilterItem
      v-for="option in options"
      :key="option.id"
      :label="option.label"
      :value="option.id"
      :selected="option.id === modelValue"
      @click="selectOption(option.id)"
    />
  </div>
</template>

<script setup lang="ts">
import FilterItem from './FilterItem.vue'
type MaterialOption = {
  id: string
  label: string
}
const props = withDefaults(
  defineProps<{
    options?: MaterialOption[]
    modelValue?: string | null
  }>(),
  {
    options: () => [],
    modelValue: null,
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'change', value: string | null): void
}>()
const selectOption = (id: string) => {
  if (id === props.modelValue) return
  emit('update:modelValue', id)
  emit('change', id)
}
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
