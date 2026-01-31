<template>
  <div class="quote-block relative py-16 px-6 md:px-12 my-12 md:my-16 overflow-hidden">
    <!-- Brush stroke SVG en fond -->
    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-[0.04]" viewBox="0 0 800 200" fill="none" aria-hidden="true">
      <path d="M50 100 Q200 20 400 100 T750 100" stroke="#C94E54" stroke-width="80" stroke-linecap="round" fill="none"/>
    </svg>
    
    <blockquote class="relative z-10 text-center max-w-4xl mx-auto">
      <!-- Citation -->
      <p class="text-xl md:text-2xl lg:text-[1.3rem] font-['Averia_Serif_Libre'] text-[#2E3D8B] leading-relaxed mb-8 italic">
        « {{ quote }} »
      </p>
      
      <!-- Ligne brush -->
      <div class="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-transparent via-[#C94E54] to-transparent rounded-full"></div>
      
      <!-- Auteur -->
      <footer>
        <cite class="not-italic">
          <span class="font-montserrat text-base font-medium text-[#C94E54]">{{ author }}</span>
          <span v-if="role" class="mx-2 text-[#D1D5DC]">·</span>
          <span v-if="role" class="font-montserrat text-sm text-[#4A5565]/70">{{ role }}</span>
          <span v-if="source" class="block mt-2 font-montserrat text-xs italic text-[#4A5565]/60">
            {{ source }}
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
interface Props {
  quote: string
  author: string
  role?: string
  source?: string
}

defineProps<Props>()
</script>

<style scoped>
/* Design D: Coup de Pinceau */
</style>
