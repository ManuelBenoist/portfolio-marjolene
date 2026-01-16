<template>
  <div class="flex flex-wrap gap-2 font-montserrat text-sm">
    <button
      v-for="size in normalizedSizes"
      :key="size.id"
      type="button"
      class="px-3 py-1 rounded-full border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54]"
      :class="
        size.id === modelValue
          ? 'bg-[#C94E54] text-white border-[#C94E54] shadow-sm'
          : 'bg-white text-[#2E3D8B] border-[#D1D5DC]'
      "
      :aria-pressed="size.id === modelValue"
      :aria-label="`Sélectionner la taille ${size.label}`"
      @click="selectSize(size.id)"
    >
      {{ size.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
