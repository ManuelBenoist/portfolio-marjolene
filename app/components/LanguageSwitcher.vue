<template>
  <div class="relative inline-flex items-center">
    <label for="lang" class="sr-only">Language</label>
    <select
      id="lang"
      aria-label="Language switcher"
      class="appearance-none border border-[#2E3D8B] bg-white text-[#2E3D8B] font-heading font-semibold px-3 py-1 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E3D8B]/60 focus:border-[#2E3D8B] active:ring-2 active:ring-[#2E3D8B]/80 active:border-[#2E3D8B] transition-all duration-150 cursor-pointer min-w-[60px] pr-7" style="border-radius:10px;"
      @change="onChange"
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
    <svg class="absolute right-3 w-4 h-4 text-[#2E3D8B] pointer-events-none" style="top: 50%; transform: translateY(-50%);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</template>

<script setup>
// Placeholder - integrate with i18n later
function onChange(event) {
  event.target.blur()
}
</script>
