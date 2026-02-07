<template>
  <footer v-if="common" class="bg-footer pt-12 pb-4 mt-12 text-[#ABABAB]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 pb-8 border-b" style="border-color: #ABABAB;">
        <!-- Présentation -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-xl footer-title mb-2">{{ common.footer.presentation.name }}</div>
          <div class="text-base leading-relaxed">{{ common.footer.presentation.bio }}</div>
        </div>
        <!-- Navigation -->
        <div class="flex-1 min-w-[170px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">{{ common.footer.navigation }}</div>
          <ul class="space-y-1">
            <li><NuxtLink to="/artiste" class="hover:underline">{{ common.nav.artist }}</NuxtLink></li>
            <li><NuxtLink to="/peintures" class="hover:underline">{{ common.nav.paintings }}</NuxtLink></li>
            <li><NuxtLink to="/foulards" class="hover:underline">{{ common.nav.scarves }}</NuxtLink></li>
            <li><NuxtLink to="/autres-activites" class="hover:underline">{{ common.nav.activities }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:underline">{{ common.nav.contact }}</NuxtLink></li>
          </ul>
        </div>
        <!-- Contact -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">{{ common.footer.contact }}</div>
          <ul class="space-y-1">
            <li class="flex items-center gap-2">
              <Icon icon="lucide:mail" class="w-5 h-5 shrink-0" />
                <span class="break-words">
                    {{ config.public.contact.email }}
                </span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="lucide:phone" class="w-5 h-5 shrink-0" />
                <span class="whitespace-nowrap">
                  {{ config.public.contact.phone }}
                </span>
            </li>
            <li v-html="common.footer.studioLocation.replace('\n', '<br>')"></li>
          </ul>
        </div>
        <!-- Réseaux sociaux -->
        <div class="flex-1 min-w-[170px]">
          <div class="font-heading text-lg footer-title mb-2">{{ common.footer.followArtist }}</div>
          <div class="flex gap-4 mt-2">
            <a href="https://www.instagram.com/unairdevacances_" :aria-label="common.aria.instagram" class="hover:text-white text-footer-text text-2xl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:instagram" width="28" height="28" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083185458797" :aria-label="common.aria.facebook" class="hover:text-white text-footer-text text-2xl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:facebook" width="28" height="28" />
            </a>
            <a href="https://fr.linkedin.com/in/marjolene-lasne-075036a0" :aria-label="common.aria.linkedin" class="hover:text-white text-footer-text text-2xl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:linkedin" width="28" height="28" />
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center pt-4 text-sm">
        <div class="mb-2 md:mb-0 footer-desc">&copy; {{ year }} {{ common.footer.presentation.name }}. {{ common.footer.copyright }}</div>
        <div class="flex gap-6">
          <NuxtLink to="/mentions-legales" class="footer-link">{{ common.footer.legalLink }}</NuxtLink>
          <NuxtLink to="/politique-confidentialite" class="footer-link">{{ common.footer.privacyLink }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
.footer-title {
  color: #C9AA70;
}
.footer-desc {
  color: #ABABAB;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 1rem;
}
.footer-link {
  color: #ABABAB;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  transition: color 0.2s;
}
.footer-link:hover, .footer-link:focus {
  color: #fff;
  text-decoration: underline;
}
</style>


<script setup>
import { Icon } from '@iconify/vue'
import { useContent } from '~/composables/useContent'

const config = useRuntimeConfig()
const year = new Date().getFullYear()
const { data: common } = await useContent('common.json')
</script>
