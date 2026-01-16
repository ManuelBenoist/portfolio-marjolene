<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      class="w-10 h-10 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54]"
      :class="option.id === modelValue ? 'border-[#C94E54] scale-105' : 'border-transparent opacity-80'"
      :style="{ backgroundColor: option.hex }"
      :aria-label="`Sélectionner ${option.label}`"
      :aria-pressed="option.id === modelValue"
      @click="selectOption(option.id)"
    >
      <span class="sr-only">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
type ColorOption = {
  id: string
  label: string
  hex: string
}

const props = withDefaults(
  defineProps<{
    options?: ColorOption[]
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
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
