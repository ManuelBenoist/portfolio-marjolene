<template>
  <div class="situation-modal" :class="{ open: isOpen }" tabindex="-1" @keydown.esc="close">
    <div class="modal-backdrop" @click="close" />
    <div class="modal-content" ref="modalContent">
      <button class="modal-close" @click="close" aria-label="Fermer">×</button>
      <div class="situation-container">
        <!-- Toggle ambiance -->
        <div class="ambiance-toggle">
          <button :class="{ active: ambiance === 'clair' }" @click="ambiance = 'clair'">Clair</button>
          <button :class="{ active: ambiance === 'chaleureux' }" @click="ambiance = 'chaleureux'">Chaleureux</button>
        </div>
        <!-- Image de salon -->
        <div class="salon-wall" :style="wallStyle">
          <img :src="ambianceImage" :alt="`Salon ${ambiance}`" class="salon-bg" />
          <!-- Peinture projetée -->
          <img
            v-if="paintingSrc"
            :src="paintingSrc"
            :alt="paintingAlt"
            class="painting"
            :style="paintingStyle"
            draggable="false"
          />
        </div>
        <div class="dimensions-info">
          <span>Tableau : {{ paintingWidthCm }} × {{ paintingHeightCm }} cm</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// --- Props ---
// image du tableau détourée (PNG/WebP), dimensions en cm, alt, ouverture modale
const props = defineProps<{
  paintingSrc: string
  paintingAlt?: string
  paintingWidthCm: number
  paintingHeightCm: number
  isOpen: boolean
}>()

// Événements: onClose doit être émis vers le parent
const emit = defineEmits<{
  (e: 'onClose'): void
}>()

// --- Constantes ajustables ---
const WALL_REAL_WIDTH_CM = 300 // Largeur réelle du mur (cm)
const WALL_IMAGE_WIDTH_PX = 900 // Largeur du mur dans l'image (px)
const WALL_IMAGE_HEIGHT_PX = 600 // Hauteur du mur dans l'image (px)
const PAINTING_TOP_PX = 180 // Décalage vertical du haut du tableau (px, desktop)
const PAINTING_TOP_PX_MOBILE = 80 // Décalage vertical mobile

// Images de salon (à adapter selon vos assets)
const salonImages = {
  clair: '/images/salon_image/salon_clair.jpg',
  chaleureux: '/images/salon_image/salon_chaleureux.jpg',
}

// --- Ambiance ---
const ambiance = ref<'clair' | 'chaleureux'>('clair')
const ambianceImage = computed(() => salonImages[ambiance.value])

// --- Responsive ---
const isMobile = ref(false)
function handleResize() {
  isMobile.value = window.innerWidth < 768
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// --- Calcul taille tableau projeté (px) ---
const paintingWidthPx = computed(() => {
  // Largeur tableau en px = (largeur tableau en cm / largeur mur réel en cm) * largeur mur image px
  return (props.paintingWidthCm / WALL_REAL_WIDTH_CM) * WALL_IMAGE_WIDTH_PX
})
const paintingHeightPx = computed(() => {
  return (props.paintingHeightCm / props.paintingWidthCm) * paintingWidthPx.value
})

// --- Style du mur (container) ---
const wallStyle = computed(() => ({
  width: isMobile.value ? '100vw' : WALL_IMAGE_WIDTH_PX + 'px',
  height: isMobile.value ? 'auto' : WALL_IMAGE_HEIGHT_PX + 'px',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  background: '#FBFAF6',
  borderRadius: '10px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
}))

// --- Style du tableau projeté ---
const paintingStyle = computed(() => ({
  position: 'absolute',
  left: `calc(50% - ${paintingWidthPx.value / 2}px)` ,
  top: isMobile.value ? PAINTING_TOP_PX_MOBILE + 'px' : PAINTING_TOP_PX + 'px',
  width: paintingWidthPx.value + 'px',
  height: paintingHeightPx.value + 'px',
  objectFit: 'contain',
  zIndex: 2,
  pointerEvents: 'none',
  userSelect: 'none',
}))

// --- Accessibilité/fermeture modale ---
const modalContent = ref<HTMLElement | null>(null)
function close() {
  console.log('PaintingSituation: close() called');
  emit('onClose')
}
watch(() => props.isOpen, (open) => {
  if (open) {
    setTimeout(() => {
      modalContent.value?.focus()
    }, 10)
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.situation-modal {
  display: none;
}
.situation-modal.open {
  display: flex;
  position: fixed;
  z-index: 1000;
  inset: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.25);
}
.modal-backdrop {
  position: absolute;
  inset: 0;
  background: transparent;
}
.modal-content {
  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12);
  padding: 0;
  outline: none;
  min-width: 320px;
  max-width: 98vw;
  max-height: 98vh;
  overflow: auto;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #2E3D8B;
  cursor: pointer;
  z-index: 10;
}
.situation-container {
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ambiance-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.ambiance-toggle button {
  background: #FBFAF6;
  border: 1px solid #D1D5DC;
  border-radius: 10px;
  padding: 6px 18px;
  color: #2E3D8B;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.ambiance-toggle button.active {
  background: #C94E54;
  color: #fff;
  border-color: #C94E54;
}
.salon-wall {
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 3/2;
  background: #FBFAF6;
  border-radius: 10px;
  overflow: hidden;
}
.salon-bg {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}
.painting {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-radius: 4px;
  background: transparent;
}
.dimensions-info {
  margin-top: 18px;
  color: #4A5565;
  font-size: 1rem;
  text-align: center;
}
@media (max-width: 767px) {
  .modal-content {
    min-width: 0;
    width: 98vw;
    padding: 0;
  }
  .situation-container {
    padding: 16px 4px 12px 4px;
  }
  .salon-wall {
    max-width: 100vw;
    aspect-ratio: 3/2;
  }
  .painting {
    border-radius: 2px;
  }
}
</style>
