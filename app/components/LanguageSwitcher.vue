<template>
  <div class="relative inline-flex items-center">
    <label for="lang" class="sr-only">{{ $t('accessibility.languageSwitcher') }}</label>
    <select
      id="lang"
      v-model="currentLocale"
      :aria-label="$t('accessibility.languageSwitcher')"
      class="appearance-none border border-[#2E3D8B] bg-white text-[#2E3D8B] font-heading font-semibold px-3 py-1 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E3D8B]/60 focus:border-[#2E3D8B] active:ring-2 active:ring-[#2E3D8B]/80 active:border-[#2E3D8B] transition-all duration-150 cursor-pointer min-w-[60px] pr-7" style="border-radius:10px;"
      @change="switchLanguage"
    >
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.code.toUpperCase() }}
      </option>
    </select>
    <svg class="absolute right-3 w-4 h-4 text-[#2E3D8B] pointer-events-none" style="top: 50%; transform: translateY(-50%);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = ref(locale.value)

const availableLocales = computed(() => locales.value)

function switchLanguage() {
  setLocale(currentLocale.value)
  navigateTo(switchLocalePath(currentLocale.value))
}

// Sync with external locale changes
watch(locale, (newLocale) => {
  currentLocale.value = newLocale
})
</script>
