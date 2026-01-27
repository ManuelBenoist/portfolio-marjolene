<template>
  <section class="flex w-full flex-col items-center gap-10">
    <TimelineBar
      v-if="hasEntries"
      :dates="dates"
      :active-index="selectedIndex"
      @select="handleSelect"
      @prev="handlePrev"
      @next="handleNext"
    />

    <p v-else class="text-center text-sm text-[#4A5565]/70">
      {{ $t('timeline.loading') || 'Chronologie en cours de préparation.' }}
    </p>

    <div v-if="hasEntries" class="w-full flex justify-center">
      <TimelineContent :entry="activeEntry" />
    </div>
  </section>
</template>

<script lang="ts" setup>

import { ref, computed, watch } from 'vue'
import TimelineBar from './TimelineBar.vue'
import TimelineContent from './TimelineContent.vue'


const { data: entriesData, pending, error } = await useLocalizedContent<TimelineEntry[]>('frise')

const entries = computed(() => entriesData.value || [])

type TimelineHighlight = {
  titre: string
  lieu: string
  date: string
}

type TimelineEntry = {
  id: number
  date: string
  expositions_personnelles: TimelineHighlight[]
  salons: TimelineHighlight[]
  prix: TimelineHighlight[]
}

const selectedIndex = ref(0)

const hasEntries = computed(() => entries.value.length > 0)
const dates = computed(() => entries.value.map((entry) => entry.date))
const maxIndex = computed(() => Math.max(dates.value.length - 1, 0))

const clampIndex = (value: number) => {
  if (!hasEntries.value) return 0
  return Math.max(0, Math.min(value, maxIndex.value))
}

const setSelectedIndex = (nextIndex: number) => {
  selectedIndex.value = clampIndex(nextIndex)
}

const handleSelect = (index: number) => setSelectedIndex(index)
const handlePrev = () => setSelectedIndex(selectedIndex.value - 1)
const handleNext = () => setSelectedIndex(selectedIndex.value + 1)

const activeEntry = computed(() => {
  if (!hasEntries.value) return null
  return entries.value[selectedIndex.value] ?? null
})
</script>

<style>

</style>