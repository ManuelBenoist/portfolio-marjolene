<template>
  <button
    type="button"
    class="filter-item px-4 py-2 rounded-full border text-sm font-montserrat transition-all duration-150 focus:outline-none focus-visible:ring-2"
    :class="[
      selected ? 'filter-item--active' : 'filter-item--inactive',
      colorClass
    ]"
    :aria-pressed="selected"
    :aria-label="ariaLabel || label"
    @click="$emit('click', value)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: false, default: '' },
  value: { type: [String, Number], required: false },
  selected: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '' },
  colorClass: { type: String, default: '' } // Permet de customiser la couleur si besoin
})
</script>

<style scoped>
.filter-item {
  border-width: 1px;
  border-color: #D1D5DC;
  background: #fff;
  color: #4A5565;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.filter-item--active {
  background: #2E3D8B;
  color: #FBFAF6;
  border-color: #2E3D8B;
  box-shadow: 0 2px 8px 0 rgba(46,61,139,0.08);
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.filter-item--inactive {
  background: #fff;
  color: #4A5565;
  border-color: #D1D5DC;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
