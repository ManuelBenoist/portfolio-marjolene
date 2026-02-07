<template>
  <Transition name="cookie-banner">
    <div
      v-if="showBanner && common"
      role="dialog"
      :aria-label="common.cookie.ariaLabel"
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-[#D1D5DC] bg-white/95 backdrop-blur-sm shadow-lg"
    >
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
        <p class="text-sm leading-relaxed text-[#4A5565]">
          {{ common.cookie.message }}
          <NuxtLink
            to="/politique-confidentialite"
            class="underline underline-offset-2 transition-colors hover:text-[#2E3D8B]"
          >
            {{ common.cookie.learnMore }}
          </NuxtLink>
        </p>
        <div class="flex shrink-0 gap-3">
          <button
            @click="declineCookies"
            class="rounded-btn px-5 py-2 text-sm text-[#4A5565] transition-colors hover:bg-gray-100 hover:text-[#2E3D8B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E3D8B]"
          >
            {{ common.cookie.decline }}
          </button>
          <button
            @click="acceptCookies"
            class="rounded-btn bg-[#2E3D8B] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C94E54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E3D8B] focus-visible:ring-offset-2"
          >
            {{ common.cookie.accept }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useContent } from '~/composables/useContent'

const { data: common } = await useContent('common.json')
const COOKIE_CONSENT_KEY = 'cookie-consent'

const showBanner = ref(false)
const { gtag } = useGtag()

function grantConsent() {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  })
}

function revokeConsent() {
  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  })
}

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)

  if (consent === 'accepted') {
    grantConsent()
  } else if (consent === 'declined') {
    revokeConsent()
  } else {
    // No choice yet — show banner
    showBanner.value = true
  }
})

function acceptCookies() {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  showBanner.value = false
  grantConsent()
}

function declineCookies() {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
  showBanner.value = false
  revokeConsent()
}
</script>

<style scoped>
.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
