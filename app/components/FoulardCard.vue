<template>
  <article class="bg-white rounded-2xl shadow-sm overflow-hidden w-full max-w-[420px]">
    
    <!-- IMAGE -->
    <div class="aspect-square w-full overflow-hidden bg-[#F8F6F2]">
      <img
        v-if="currentImage"
        :src="currentImage.src"
        :alt="currentImage.alt"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <!-- CONTENT -->
    <div class="p-6">

      <!-- TITLE -->
      <h2 class="text-[1.6rem] text-[#2E3D8B] font-['Averia_Serif_Libre'] leading-tight mb-2">
        {{ title }}
      </h2>

      <!-- DESCRIPTION -->
      <p class="text-[#4A5565] text-sm mb-5">
        {{ description }}
      </p>

      <!-- COLOR -->
      <div class="mb-5">
        <div class="text-xs uppercase tracking-wider text-[#4A5565] mb-2">
          Couleur :
          <span class="font-semibold">{{ currentColor?.label }}</span>
        </div>

        <ColorSwatch
          v-model="selectedColor"
          :options="colorOptions"
        />
      </div>

      <!-- MATERIAL -->
      <div class="mb-5">
        <div class="text-xs uppercase tracking-wider text-[#4A5565] mb-2">
          Matière :
          <span class="font-semibold">{{ currentMaterial?.label }}</span>
        </div>

        <MaterialBadge
          v-model="selectedMaterial"
          :options="materialOptions"
        />
      </div>

      <!-- SIZES -->
      <div>
        <div class="text-xs uppercase tracking-wider text-[#4A5565] mb-2">
          Tailles :
        </div>

        <SizeList
          v-model="selectedSize"
          :sizes="sizeList"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ColorSwatch from './ColorSwatch.vue'
import MaterialBadge from './MaterialBadge.vue'
import SizeList from './SizeList.vue'

interface Image {
  src: string
  alt: string
}

interface Material {
  id: string
  label: string
  images: Image[]
}

interface Color {
  id: string
  label: string
  hex: string
  materials: Record<string, Material>
}

const props = defineProps<{
  slug?: string
  title: string
  description: string
  sizes: Array<{ id: string; label: string }> | Record<string, { id: string; label: string }>
  colors: Record<string, Color> | Color[]
}>()

/* ----------------------------------
   STATE
---------------------------------- */

const selectedColor = ref<string | null>(null)
const selectedMaterial = ref<string | null>(null)
const selectedSize = ref<string | null>(null)

/* ----------------------------------
   INITIALIZATION
---------------------------------- */


const colorList = computed(() => Array.isArray(props.colors) ? props.colors : Object.values(props.colors))
const sizeList = computed(() => Array.isArray(props.sizes) ? props.sizes : Object.values(props.sizes))

const firstColor = colorList.value[0]
selectedColor.value = firstColor?.id ?? null


watch(selectedColor, (newColor) => {
  const color = colorList.value.find((c) => c.id === newColor)
  if (!color) return
  const firstMaterial = Object.values(color.materials)[0]
  selectedMaterial.value = firstMaterial?.id ?? null
}, { immediate: true })

selectedSize.value = sizeList.value?.[0]?.id ?? null

/* ----------------------------------
   COMPUTED
---------------------------------- */

const currentColor = computed(() => {
  if (!selectedColor.value) return null
  return colorList.value.find((c) => c.id === selectedColor.value) || null
})

const materialOptions = computed(() => {
  if (!currentColor.value) return []
  return Object.values(currentColor.value.materials).map((m) => ({
    id: m.id,
    label: m.label
  }))
})

const colorOptions = computed(() => {
  return colorList.value.map((c) => ({
    id: c.id,
    label: c.label,
    hex: c.hex
  }))
})

const currentMaterial = computed(() => {
  if (!currentColor.value || !selectedMaterial.value) return null
  return currentColor.value.materials[selectedMaterial.value]
})

const currentImage = computed(() => {
  return currentMaterial.value?.images?.[0] ?? null
})
</script>
