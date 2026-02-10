<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        @click.self="close"
        role="dialog"
        aria-modal="true"
      >
        <!-- Close Button -->
        <button 
          @click="close"
          class="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-[100] focus:outline-none focus:ring-2 focus:ring-white rounded-full"
          :aria-label="$t('actions.close')"
        >
          <Icon icon="mdi:close" class="text-3xl" />
        </button>

        <!-- Previous Button -->
        <button 
          v-if="images.length > 1"
          @click.stop="prev"
          class="absolute left-4 p-3 text-white/70 hover:text-white transition-colors z-[100] bg-white/10 hover:bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
          :aria-label="$t('actions.previousImage')"
        >
          <Icon icon="mdi:chevron-left" class="text-4xl" />
        </button>

        <!-- Main Image -->
        <div class="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          <Transition 
            mode="out-in"
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-98"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-120 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-98"
          >
            <img 
              :key="currentIndex"
              :src="withBaseImage(currentImage.src)" 
              :alt="currentImage.alt"
              class="w-auto h-auto max-w-[85vw] max-h-[85vh] min-w-[55vw] min-h-[55vh] object-contain shadow-2xl select-none"
              draggable="false"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd"
            />
          </Transition>
          
          <!-- Counter -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest bg-black/50 px-3 py-1 rounded-full pointer-events-none">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>

        <!-- Next Button -->
        <button 
          v-if="images.length > 1"
          @click.stop="next"
          class="absolute right-4 p-3 text-white/70 hover:text-white transition-colors z-[100] bg-white/10 hover:bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
          :aria-label="$t('actions.nextImage')"
        >
          <Icon icon="mdi:chevron-right" class="text-4xl" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { withBaseImage } from '~/utils/withBaseImage'

// Touch swipe support for mobile
const touchStartX = ref<number | null>(null)
const touchEndX = ref<number | null>(null)

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
}

function onTouchMove(e: TouchEvent) {
  touchEndX.value = e.touches[0].clientX
}

function onTouchEnd() {
  if (touchStartX.value !== null && touchEndX.value !== null) {
    const dx = touchEndX.value - touchStartX.value
    if (Math.abs(dx) > 40) {
      if (dx < 0) next()
      else prev()
    }
  }
  touchStartX.value = null
  touchEndX.value = null
}

interface ImageSource {
  src: string
  alt?: string
}

const props = defineProps<{
  show: boolean
  images: ImageSource[]
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'update:modelValue', value: number): void
}>()

const currentIndex = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const currentImage = computed(() => {
  if (!props.images.length) return { src: '', alt: '' }
  return props.images[currentIndex.value] || props.images[0]
})

function close() {
  emit('update:show', false)
}

function next() {
  if (props.images.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prev() {
  if (props.images.length <= 1) return
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.show) return
  
  switch(e.key) {
    case 'Escape':
      close()
      break
    case 'ArrowLeft':
      prev()
      break
    case 'ArrowRight':
      next()
      break
  }
}

// Lock body scroll when modal is open
watch(() => props.show, (isShow) => {
  if (typeof document !== 'undefined') {
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  // Always restore scroll on unmount, even if lightbox was open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>
