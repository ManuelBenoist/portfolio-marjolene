<template v-if="isValidSlug">
  <NuxtLink 
    :to="`/foulards/${slug}`"
    class="block transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
  >
    <FoulardCard
      :title="title"
      :description="description"
      :colors="colors"
      :materials="materials"
      :sizes="sizes"
      :base-image="baseImage"
      :variant-images="[]"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  slug: string
  title: string
  description: string
  colors: ColorOption[]
  sizes: SizeOption[]
  materials: MaterialOption[]
  baseImage: ImageSource
}>()

const isValidSlug = typeof props.slug === 'string' && /^[a-zA-Z0-9-_]+$/.test(props.slug)
</script>
