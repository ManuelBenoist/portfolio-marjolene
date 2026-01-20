<template>
  <NuxtLink
    class="mt-4 inline-flex items-center justify-center rounded-btn bg-primary px-8 py-3 text-base font-medium uppercase tracking-wide text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent"
    :to="to"
    :aria-label="ariaLabel"
  >
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw
  label?: string
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Contacter l\'artiste',
  ariaLabel: 'Contacter l\'artiste au sujet de l\'œuvre',
})
</script>
