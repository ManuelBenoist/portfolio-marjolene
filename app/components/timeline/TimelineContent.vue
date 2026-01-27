<template>
  <div v-if="entry" class="timeline-content mx-auto max-w-3xl text-left">
    <h2 class="text-4xl sm:text-6xl font-heading text-[#2E3D8B] mb-8 text-center">{{ entry.date }}</h2>

    <div v-if="entry.expositions_personnelles && entry.expositions_personnelles.length">
      <h3 class="text-2xl sm:text-3xl font-heading text-[#4A5565] mb-2">{{ $t('timeline.expositionsPersonnelles') }}</h3>
      <ul class="mb-6 ml-4 list-disc">
        <li v-for="expo in entry.expositions_personnelles" :key="expo.titre + expo.lieu + expo.date" class="text-lg text-[#2E3D8B]">
          {{ expo.titre }}<span v-if="expo.lieu">, {{ expo.lieu }}</span><span v-if="expo.date"> ({{ expo.date }})</span>
        </li>
      </ul>
    </div>

    <div v-if="entry.salons && entry.salons.length">
      <h3 class="text-2xl sm:text-3xl font-heading text-[#4A5565] mb-2">{{ $t('timeline.salons') }}</h3>
      <ul class="mb-6 ml-4 list-disc">
        <li v-for="salon in entry.salons" :key="salon.titre + salon.lieu + salon.date" class="text-lg text-[#2E3D8B]">
          {{ salon.titre }}<span v-if="salon.lieu">, {{ salon.lieu }}</span><span v-if="salon.date"> ({{ salon.date }})</span>
        </li>
      </ul>
    </div>

    <div v-if="entry.prix && entry.prix.length">
      <h3 class="text-2xl sm:text-3xl font-heading text-[#4A5565] mb-2">{{ $t('timeline.prix') }}</h3>
      <ul class="mb-6 ml-4 list-disc">
        <li v-for="prix in entry.prix" :key="prix.titre + prix.lieu + prix.date" class="text-lg text-[#2E3D8B]">
          {{ prix.titre }}<span v-if="prix.lieu">, {{ prix.lieu }}</span><span v-if="prix.date"> ({{ prix.date }})</span>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="text-center text-[#4A5565]/70">{{ $t('timeline.noData') || 'Aucune donnée pour cette période.' }}</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps<{ entry: any }>()
</script>

<style>

.timeline-content h2 {
  letter-spacing: 0.04em;
}
.timeline-content h3 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  margin-top: 2rem;
}
.timeline-content ul {
  margin-bottom: 1.5rem;
}
.timeline-content li {
  margin-bottom: 0.5rem;
}

</style>