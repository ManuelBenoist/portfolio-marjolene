<template>
  <div class="test-page">
    <h1>Test Mise en situation de tableau</h1>
    <div class="paintings-list">
      <div v-for="painting in paintings" :key="painting.src" class="painting-item">
        <img :src="painting.src" :alt="painting.alt" class="painting-thumb" />
        <div class="painting-info">
          <div>{{ painting.alt }}</div>
          <div>{{ painting.widthCm }} × {{ painting.heightCm }} cm</div>
          <button @click="openSituation(painting)">
            Imaginer la toile chez vous
          </button>
        </div>
      </div>
    </div>
    <PaintingSituation
      v-if="selectedPainting"
      :painting-src="selectedPainting.src"
      :painting-alt="selectedPainting.alt"
      :painting-width-cm="selectedPainting.widthCm"
      :painting-height-cm="selectedPainting.heightCm"
      :is-open="modalOpen"
      @onClose="closeSituation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaintingSituation from '~/components/PaintingSituation.vue'

// Liste d'exemple de peintures (à adapter selon vos images)
const paintings = [
  {
    src: '/images/peintures/paysages/dune_dans_le_vent.jpg',
    alt: 'Dunes dans le vent',
    widthCm: 60,
    heightCm: 73,
  },
  {
    src: '/images/peintures/paysages/roussillon_aux_fleurs_sauvages.jpg',
    alt: 'Roussillon aux fleurs sauvages',
    widthCm: 50,
    heightCm: 50,
  },
  // Ajoutez d'autres peintures ici si besoin
]

const selectedPainting = ref<typeof paintings[0] | null>(null)
const modalOpen = ref(false)

function openSituation(painting: typeof paintings[0]) {
  selectedPainting.value = painting
  modalOpen.value = true
}
function closeSituation() {
  modalOpen.value = false
  selectedPainting.value = null
}
</script>

<style scoped>
.test-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}
.paintings-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}
.painting-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  background: #fafafa;
  width: 200px;
}
.painting-thumb {
  width: 120px;
  height: auto;
  border-radius: 6px;
  margin-bottom: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.painting-info {
  text-align: center;
}
button {
  margin-top: 10px;
  background: #2E3D8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #C94E54;
}
</style>
