<template>
  <div v-reveal class="flex w-full items-center justify-center gap-4 h-20">

    <!-- Boutons -->
    <div class="flex items-center gap-2 h-20">
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-full text-[#2E3D8B] transition-colors hover:text-[#C94E54] disabled:opacity-40"
        :disabled="isAtStart"
        aria-label="Précédent"
        @click="emitPrev"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 rotate-180" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-full text-[#2E3D8B] transition-colors hover:text-[#C94E54] disabled:opacity-40"
        :disabled="isAtEnd"
        aria-label="Suivant"
        @click="emitNext"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>

    <!-- Timeline -->
    <div ref="containerRef" class="w-full max-w-5xl min-w-0 overflow-x-auto lg:overflow-visible">
      <div ref="timelineRef" class="relative w-full h-20" :style="minWidthStyle">

        <!-- Ligne grise -->
        <div class="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#D1D5DC]" />

        <!-- Ligne bleue -->
        <div
          class="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#2E3D8B] transition-all duration-500 ease-in-out"
          :style="{ width: progressBarWidth }"
        />

        <!-- Points -->
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full flex items-center justify-between z-10">
          <div
            v-for="(date, index) in dates"
            :key="date + index"
            class="flex flex-1 flex-col justify-center items-center"
          >
            <button
              ref="pointRefs"
              type="button"
              class="focus:outline-none flex"
              @click="emitSelect(index)"
            >
              <span
                class="rounded-full inline-block transition-all duration-300"
                :class="[
                  index === clampedIndex
                    ? 'h-5 w-5 bg-[#2E3D8B] shadow-[0_0_10px_rgba(46,61,139,0.35)]'
                    : index < clampedIndex
                      ? 'h-2.5 w-2.5 bg-[#2E3D8B]'
                      : 'h-2.5 w-2.5 bg-[#D1D5DC]'
                ]"
              />
            </button>
          </div>
        </div>

        <!-- Labels (hidden until large screens for readability on tablet/mobile) -->
        <div class="absolute left-0 w-full hidden lg:flex items-center justify-between z-10" style="top: 70%">
          <div
            v-for="(date, index) in dates"
            :key="date + index + '-label'"
            class="flex flex-1 justify-center"
          >
            <span
              class="text-xs font-montserrat transition-colors duration-300"
              :class="index === clampedIndex ? 'font-semibold text-[#2E3D8B]' : 'text-[#4A5565]/60'"
            >
              {{ date }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  dates: string[]
  activeIndex: number
}>()

const emit = defineEmits<{
  (event: 'select', index: number): void
  (event: 'prev'): void
  (event: 'next'): void
}>()

const timelineRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const pointRefs = ref<HTMLElement[]>([])

const progressBarWidth = ref('0px')

const isSmallScreen = ref(false)

const minWidthStyle = computed(() => {
  if (!isSmallScreen.value) return {}
  // ensure a sensible minimum width so points don't collapse on small screens
  const min = Math.max(props.dates.length * 120, 480)
  return { minWidth: `${min}px` }
})

const maxIndex = computed(() => Math.max(props.dates.length - 1, 0))

const clampedIndex = computed(() => {
  if (props.activeIndex < 0) return 0
  if (props.activeIndex > maxIndex.value) return maxIndex.value
  return props.activeIndex
})

const isAtStart = computed(() => clampedIndex.value === 0)
const isAtEnd = computed(() => clampedIndex.value === maxIndex.value)

const emitSelect = (index: number) => emit('select', index)
const emitPrev = () => !isAtStart.value && emit('prev')
const emitNext = () => !isAtEnd.value && emit('next')

/* Calcul pixel-perfect */
const updateProgressBar = async () => {
  await nextTick()

  const timeline = timelineRef.value
  const point = pointRefs.value[clampedIndex.value]

  if (!timeline || !point) return

  const timelineRect = timeline.getBoundingClientRect()
  const pointRect = point.getBoundingClientRect()

  const pointCenter = pointRect.left + pointRect.width / 2
  const start = timelineRect.left

  const width = pointCenter - start
  progressBarWidth.value = `${width}px`
  // auto-scroll container to keep active point visible on small/tablet screens
  if (isSmallScreen.value) {
    scrollToActive()
  }
}

const scrollToActive = () => {
  const container = containerRef.value || (timelineRef.value && (timelineRef.value.parentElement as HTMLElement))
  const point = pointRefs.value[clampedIndex.value]
  if (!container || !point) return

  const containerRect = container.getBoundingClientRect()
  const pointRect = point.getBoundingClientRect()

  // compute offset to center the point
  const offset = pointRect.left + pointRect.width / 2 - containerRect.left - containerRect.width / 2
  const desired = container.scrollLeft + offset

  container.scrollTo({ left: desired, behavior: 'smooth' })
}

/* Mise à jour automatique */
watch(() => clampedIndex.value, updateProgressBar, { immediate: true })
watch(() => props.dates.length, updateProgressBar)

/* Resize responsive */
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateProgressBar()

  // responsive detection: only apply minWidth on small screens
    if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(max-width: 1023px)')
    const handleMQ = (e: MediaQueryListEvent | MediaQueryList) => {
      isSmallScreen.value = 'matches' in e ? e.matches : mq.matches
      // recalc layout when breakpoint changes
      nextTick().then(updateProgressBar)
    }
    // init
    isSmallScreen.value = mq.matches
    // attach listener
    if ('addEventListener' in mq) mq.addEventListener('change', handleMQ as any)
    else mq.addListener(handleMQ as any)
    // store for cleanup
    ;(timelineRef as any).__mq = mq
    ;(timelineRef as any).__mqHandler = handleMQ
  }

  resizeObserver = new ResizeObserver(updateProgressBar)
  if (timelineRef.value) resizeObserver.observe(timelineRef.value)
})

onBeforeUnmount(() => {
  if (resizeObserver && timelineRef.value) {
    resizeObserver.unobserve(timelineRef.value)
  }
  if (typeof window !== 'undefined' && (timelineRef as any).__mq) {
    const mq = (timelineRef as any).__mq as MediaQueryList
    const handler = (timelineRef as any).__mqHandler
    if ('removeEventListener' in mq) mq.removeEventListener('change', handler as any)
    else mq.removeListener(handler as any)
  }
})
</script>
