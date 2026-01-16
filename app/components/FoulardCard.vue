<template>
  <article class="w-full bg-white rounded-[18px] p-4 flex flex-col gap-4 shadow-sm border border-[#F0ECE1] max-w-[340px] mx-auto">
    <div class="w-full aspect-square">
      <ImageBlock
        :base-image="baseImage"
        :variant-images="variantImages"
        :selected-color-id="selectedColorId"
        :selected-material-id="selectedMaterialId"
        class="w-full h-full"
      />
    </div>

    <div class="flex flex-col gap-5">
      <header class="space-y-1 text-left">
        <h3 class="font-['Averia_Serif_Libre'] text-[1.75rem] text-[#2E3D8B] font-light">
          {{ title }}
        </h3>
        <p class="text-[#4A5565] text-base font-montserrat">
          {{ description }}
        </p>
      </header>

      <section class="flex flex-col gap-3">
        <div class="text-sm font-montserrat text-[#4A5565]">
          Couleur :
          <span class="text-[#2E3D8B] font-semibold">
            {{ activeColor?.label || '—' }}
          </span>
        </div>
        <ColorSwatch v-model="selectedColorId" :options="colors" />
      </section>

      <section class="flex flex-col gap-3">
        <div class="text-sm font-montserrat text-[#4A5565]">
          Matière :
          <span class="text-[#2E3D8B] font-semibold">
            {{ activeMaterial?.label || '—' }}
          </span>
        </div>
        <MaterialBadge v-model="selectedMaterialId" :options="materials" />
      </section>

      <section class="flex flex-col gap-3">
        <div class="text-sm font-montserrat text-[#4A5565]">
          Tailles disponibles :
          <span class="text-[#2E3D8B] font-semibold">
            {{ activeSize?.label || '—' }}
          </span>
        </div>
        <SizeList v-model="selectedSizeId" :sizes="normalizedSizes" />
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import ColorSwatch from '~/components/ColorSwatch.vue'
import ImageBlock from '~/components/ImageBlock.vue'
import MaterialBadge from '~/components/MaterialBadge.vue'
import SizeList from '~/components/SizeList.vue'

type ColorOption = {
  id: string
  label: string
  hex: string
}

type MaterialOption = {
  id: string
  label: string
}

type SizeOption = string | { id: string; label: string }

type NormalizedSize = { id: string; label: string }

type ImageSource = {
  src: string
  alt?: string
}

type VariantImage = ImageSource & {
  colorId?: string | null
  materialId?: string | null
}

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    colors?: ColorOption[]
    materials?: MaterialOption[]
    sizes?: SizeOption[]
    baseImage: ImageSource
    variantImages?: VariantImage[]
  }>(),
  {
    colors: () => [],
    materials: () => [],
    sizes: () => [],
    variantImages: () => [],
  }
)

const selectedColorId = ref<string | null>(null)
const selectedMaterialId = ref<string | null>(null)
const selectedSizeId = ref<string | null>(null)

const normalizedSizes = computed<NormalizedSize[]>(() => {
  return props.sizes.map((size) =>
    typeof size === 'string'
      ? { id: size, label: size }
      : { id: size.id, label: size.label }
  )
})

watch(
  () => props.colors,
  (value) => {
    if (!value.length) {
      selectedColorId.value = null
      return
    }

    if (!value.some((option) => option.id === selectedColorId.value)) {
      selectedColorId.value = value[0].id
    }
  },
  { immediate: true }
)

watch(
  () => props.materials,
  (value) => {
    if (!value.length) {
      selectedMaterialId.value = null
      return
    }

    if (!value.some((option) => option.id === selectedMaterialId.value)) {
      selectedMaterialId.value = value[0].id
    }
  },
  { immediate: true }
)

watch(
  () => normalizedSizes.value,
  (value) => {
    if (!value.length) {
      selectedSizeId.value = null
      return
    }

    if (!value.some((option) => option.id === selectedSizeId.value)) {
      selectedSizeId.value = value[0].id
    }
  },
  { immediate: true }
)

const activeColor = computed(() =>
  props.colors.find((option) => option.id === selectedColorId.value)
)
const activeMaterial = computed(() =>
  props.materials.find((option) => option.id === selectedMaterialId.value)
)
const activeSize = computed(() =>
  normalizedSizes.value.find((option) => option.id === selectedSizeId.value)
)
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
