<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      class="px-4 py-2 rounded-full border text-sm font-montserrat transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E3D8B]"
      :class="
        option.id === modelValue
          ? 'bg-[#2E3D8B] text-[#FBFAF6] border-[#2E3D8B] shadow-md'
          : 'bg-white text-[#2E3D8B] border-[#D1D5DC]'
      "
      :aria-pressed="option.id === modelValue"
      :aria-label="`Sélectionner la matière ${option.label}`"
      @click="selectOption(option.id)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
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
