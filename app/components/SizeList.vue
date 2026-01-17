<template>
  <div class="flex flex-wrap gap-2 font-montserrat text-sm">
    <FilterItem
      v-for="size in normalizedSizes"
      :key="size.id"
      :label="size.label"
      :value="size.id"
      :selected="size.id === modelValue"
      @click="selectSize(size.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FilterItem from './FilterItem.vue'
type SizeOption = string | { id: string; label: string }
type NormalizedSize = { id: string; label: string }
const props = withDefaults(
  defineProps<{
    sizes?: SizeOption[]
    modelValue?: string | null
  }>(),
  {
    sizes: () => [],
    modelValue: null,
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'change', value: string | null): void
}>()
const normalizedSizes = computed<NormalizedSize[]>(() => {
  return props.sizes.map((size) =>
    typeof size === 'string'
      ? { id: size, label: size }
      : { id: size.id, label: size.label }
  )
})
const selectSize = (id: string) => {
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
