<template>
  <div
    class="bg-[#FBFAF6] rounded-[18px] p-6 flex flex-col gap-6 card-premium group"
  >
    <div
      class="w-full h-[360px] overflow-hidden flex items-center justify-center image-reveal"
      style="background-color: rgba(251, 250, 246, 0.8);"
    >
      <img
        :src="image"
        :alt="title"
        class="max-w-full max-h-full object-contain" 
        style="border-radius:0;"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col gap-1 text-left">
      <h3
        class="font-['Averia_Serif_Libre'] text-[1.5rem] text-[#2E3D8B] group-hover:text-[#C94E54] font-light"
      >
        {{ title }}
      </h3>
      <div class="text-[#4A5565] text-base font-montserrat">
        {{ technique }}
      </div>
      <div class="text-[#4A5565] text-sm font-montserrat">
        {{ dimensions }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  title: string
  technique: string
  dimensions: string
}>()
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>