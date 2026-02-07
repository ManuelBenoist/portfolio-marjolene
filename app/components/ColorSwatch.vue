<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      class="w-10 h-10 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C94E54] focus-visible:ring-offset-2"
      :class="option.id === modelValue ? 'ring-2 ring-[#C94E54] ring-offset-2 scale-105' : 'opacity-80 hover:opacity-100'"
      :style="getSwatchStyle(option)"
      :aria-label="$t('actions.selectColor', { label: option.label })"
      :aria-pressed="option.id === modelValue"
      @click="selectOption(option.id)"
    >
      <span class="sr-only">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">

/**
 * ColorSwatch - Composant de sélection de couleurs
 * 
 * Supporte 3 types d'affichage :
 * - 'solid' (défaut) : Couleur unie simple
 * - 'gradient' : Dégradé fluide entre plusieurs couleurs
 * - 'split' : Couleurs séparées par une diagonale nette (bi-color, tri-color...)
 * 
 * Format des données :
 * - hex: string (rétrocompatible, couleur unique)
 * - hexes: string[] (nouveau, plusieurs couleurs)
 * - type: 'solid' | 'gradient' | 'split' (nouveau, type d'affichage)
 */

export type ColorType = 'solid' | 'gradient' | 'split'

export type ColorOption = {
  id: string
  label: string
  /** @deprecated Utiliser hexes à la place. Conservé pour rétrocompatibilité */
  hex?: string
  /** Liste des couleurs (1 ou plusieurs) */
  hexes?: string[]
  /** Type d'affichage : 'solid', 'gradient', 'split' */
  type?: ColorType
}

const props = withDefaults(
  defineProps<{
    options?: ColorOption[]
    modelValue?: string | null
  }>(),
  {
    options: () => [],
    modelValue: null,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'change', value: string | null): void
}>()

const selectOption = (id: string) => {
  if (id === props.modelValue) return
  emit('update:modelValue', id)
  emit('change', id)
}

/**
 * Génère le style CSS pour le swatch en fonction du type et des couleurs
 */
function getSwatchStyle(option: ColorOption): Record<string, string> {
  // Récupère les couleurs (rétrocompatibilité avec hex simple)
  const colors = option.hexes?.length ? option.hexes : (option.hex ? [option.hex] : ['#CCCCCC'])
  const type = option.type || 'solid'

  // Couleur unique : toujours solid
  if (colors.length === 1) {
    return { backgroundColor: colors[0] }
  }

  // Plusieurs couleurs
  if (type === 'gradient') {
    if (colors.length === 3) {
      // Dégradé tricolore circulaire avec transitions douces
      const [first, second, third] = colors
      return { background: `conic-gradient(${first}, ${second}, ${third}, ${first})` }
    }
    // Dégradé fluide diagonal (45deg) pour 2 couleurs (ou plus)
    return { background: `linear-gradient(45deg, ${colors.join(', ')})` }
  }

  if (type === 'split') {
    // Couleurs séparées par des diagonales nettes
    const stops = colors.map((color, index) => {
      const start = (index / colors.length) * 100
      const end = ((index + 1) / colors.length) * 100
      return `${color} ${start}%, ${color} ${end}%`
    }).join(', ')
    return { background: `linear-gradient(45deg, ${stops})` }
  }

  // Fallback : gradient par défaut si type inconnu
  return { background: `linear-gradient(45deg, ${colors.join(', ')})` }
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
