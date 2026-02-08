<template>
  <div v-reveal class="w-full bg-[#FBFAF6] rounded-[12px] p-8">
    <h2 class="text-[2.5rem] font-['Averia_Serif_Libre'] font-light text-[#C94E54] mb-6">{{ title }}</h2>
    <div :class="['flex flex-col md:flex-row gap-8 items-start', position === 'right' ? 'md:flex-row-reverse' : '']">
      <div class="md:w-1/2 w-full flex flex-col image-reveal">
        <img :src="withBaseImage(image)" :alt="caption || title" class="rounded-[12px] w-full object-cover mb-2" loading="lazy" />
        <span v-if="caption" class="italic text-[#4A5565] text-sm mt-1">{{ caption }}</span>
      </div>
      <div class="md:w-1/2 w-full">
        <div>
          <template v-for="(para, idx) in paragraphs" :key="idx">
            <p class="text-[#4A5565] text-lg font-montserrat leading-relaxed mb-4">{{ para }}</p>
          </template>
        </div>
      </div>
    </div>
    <div v-if="subParagraphs && subParagraphs.length" class="mt-6 w-full">
      <template v-for="(sub, idx) in subParagraphs" :key="'sub-' + idx">
        <p class="text-[#4A5565] text-lg font-montserrat leading-relaxed mb-2">{{ sub }}</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBaseImage } from '~/utils/withBaseImage'

defineProps<{
  title: string
  image: string
  caption?: string
  position?: 'left' | 'right'
  paragraphs: string[]
  subParagraphs?: string[]
}>()
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
