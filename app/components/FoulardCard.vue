<template>
  <article
    :id="`foulard-${slug}`"
    class="bg-white rounded-2xl overflow-hidden w-full max-w-[420px] cursor-pointer card-premium"
    @click="navigateToDetail"
  >
    
    <!-- IMAGE -->
    <div class="aspect-square w-full overflow-hidden bg-[#F8F6F2] image-reveal">
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
      <div class="mb-5" @click.stop>
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
      <div class="mb-5" @click.stop>
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
      <div @click.stop>
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

interface Size {
  id: string
  label: string
}

interface Material {
  id: string
  label: string
  images: Image[]
  sizes: Size[]
}

interface Color {
  id: string
  label: string
  /** @deprecated Utiliser hexes */
  hex?: string
  hexes?: string[]
  type?: 'solid' | 'gradient' | 'split'
  materials: Record<string, Material>
}

const props = defineProps<{
  slug?: string
  title: string
  description: string
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

const firstColor = colorList.value[0]
selectedColor.value = firstColor?.id ?? null

watch(selectedColor, (newColor) => {
  const color = colorList.value.find((c) => c.id === newColor)
  if (!color) return
  const firstMaterial = Object.values(color.materials)[0]
  selectedMaterial.value = firstMaterial?.id ?? null
  // Initialise la taille avec la première taille de la première matière
  selectedSize.value = firstMaterial?.sizes?.[0]?.id ?? null
}, { immediate: true })

// Réinitialise la taille quand la matière change
watch(selectedMaterial, (newMaterial) => {
  const color = colorList.value.find((c) => c.id === selectedColor.value)
  if (!color || !newMaterial) return
  const material = color.materials[newMaterial]
  selectedSize.value = material?.sizes?.[0]?.id ?? null
})

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
    hex: c.hex,
    hexes: c.hexes,
    type: c.type
  }))
})

const currentMaterial = computed(() => {
  if (!currentColor.value || !selectedMaterial.value) return null
  return currentColor.value.materials[selectedMaterial.value]
})

const sizeList = computed(() => {
  return currentMaterial.value?.sizes ?? []
})

const currentImage = computed(() => {
  return currentMaterial.value?.images?.[0] ?? null
})

/* ----------------------------------
   NAVIGATION
---------------------------------- */

function navigateToDetail() {
  if (!props.slug || typeof props.slug !== 'string' || !/^[a-zA-Z0-9-_]+$/.test(props.slug)) return
  navigateTo({
    path: `/foulards/${props.slug}`,
    query: {
      color: selectedColor.value ?? undefined,
      material: selectedMaterial.value ?? undefined,
      size: selectedSize.value ?? undefined
    }
  })
}
</script>
