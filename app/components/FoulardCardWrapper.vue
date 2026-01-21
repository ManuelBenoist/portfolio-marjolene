<template>
  <NuxtLink 
    :to="`/foulards/${item.slug}`"
    class="block transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
  >
    <FoulardCard
      :title="item.title"
      :description="item.description"
      :colors="item.colors"
      :materials="item.materials"
      :sizes="item.sizes"
      :base-image="baseImage"
      :variant-images="[]"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FoulardCard from '~/components/FoulardCard.vue'

interface ColorOption {
  id: string
  label: string
  hex: string
}

interface SizeOption {
  id: string
  label: string
}

interface MaterialOption {
  id: string
  label: string
}

interface ImageSource {
  src: string
  alt?: string
}

interface FoulardItem {
  slug: string
  title: string
  description: string
  colors: ColorOption[]
  sizes: SizeOption[]
  materials: MaterialOption[]
  images: ImageSource[]
}

const props = defineProps<{
  item: FoulardItem
}>()

const baseImage = computed(() => {
  if (props.item.images && props.item.images.length > 0) {
    return props.item.images[0]
  }
  return { src: '/foulards/foulard-marjo-bleu.avif', alt: props.item.title }
})
</script>
