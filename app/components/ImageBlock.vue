<template>
  <div class="w-full h-[360px] sm:h-[420px] bg-[#FBFAF6] rounded-[18px] flex items-center justify-center overflow-hidden">
    <Transition name="fade" mode="out-in">
      <img
        v-if="currentImage?.src"
        :key="currentImage.src"
        :src="currentImage.src"
        :alt="currentImage.alt || altFallback"
        class="w-full h-full object-contain"
        style="aspect-ratio: 1/1; background: #FBFAF6;"
        loading="lazy"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
    baseImage: ImageSource
    variantImages?: VariantImage[]
    selectedColorId?: string | null
    selectedMaterialId?: string | null
  }>(),
  {
    variantImages: () => [],
    selectedColorId: null,
    selectedMaterialId: null,
  }
)

const { data: commonData } = await useContent<Record<string, any>>('common.json')
const common = computed(() => commonData.value)

const altFallback = computed(() => props.baseImage.alt || common.value?.aria?.scarfImageAlt || '')

const currentImage = computed<ImageSource>(() => {
  if (!props.variantImages.length) {
    return props.baseImage
  }

  const exactMatch = props.variantImages.find(
    (variant) =>
      variant.colorId === props.selectedColorId &&
      variant.materialId === props.selectedMaterialId &&
      variant.src
  )

  if (exactMatch) return exactMatch

  const colorMatch = props.variantImages.find(
    (variant) => variant.colorId === props.selectedColorId && !!variant.src
  )
  if (colorMatch) return colorMatch

  const materialMatch = props.variantImages.find(
    (variant) => variant.materialId === props.selectedMaterialId && !!variant.src
  )
  if (materialMatch) return materialMatch

  return props.baseImage
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
