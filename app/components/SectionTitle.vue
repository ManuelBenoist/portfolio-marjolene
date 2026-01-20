<template>
  <div class="mb-8">
    <h1
      class="text-[4rem] leading-none font-['Averia_Serif_Libre'] font-light text-[#2E3D8B] mb-4"
    >
      {{ title }}
    </h1>
    <p
      v-if="subtitle"
      class="text-xl text-[#4A5565] font-montserrat break-words"
      style="word-break: break-word; hyphens: auto;"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
    defineProps<{
    title: string
    subtitle?: string
    }>()
</script>

<style scoped>
    .font-montserrat {
    font-family: 'Montserrat', sans-serif;
    }
</style>
