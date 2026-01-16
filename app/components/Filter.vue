<template>
  <div>
    <div class="text-[1.325rem] text-[#4A5565] font-['Averia_Serif_Libre'] mb-3">{{ title }}</div>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="item in items"
        :key="item.value"
        :class="[
          'px-6 py-3 rounded-full border text-lg font-montserrat transition-all',
          item.value === modelValue
            ? 'bg-[#2E3D8B] text-[#FFFFFF] border-[#2E3D8B] shadow-sm'
            : 'bg-transparent text-[#4A5565] border-[#B0B3B8] hover:bg-[#2E3D8B] hover:text-[#FFFFFF] hover:border-[#2E3D8B]'
        ]"
        @click="$emit('update:modelValue', item.value)"
        type="button"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
