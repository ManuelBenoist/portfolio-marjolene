<template>
  <footer class="bg-footer pt-12 pb-4 mt-12 text-[#ABABAB]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 pb-8 border-b" style="border-color: #ABABAB;">
        <!-- Présentation -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-xl footer-title mb-2">Marjolène Lasne</div>
          <div class="text-base leading-relaxed">{{ $t('footer.description') || 'Artiste peintre basée en Provence, spécialisée dans les paysages méditerranéens et la lumière du Sud.' }}</div>
        </div>
        <!-- Navigation -->
        <div class="flex-1 min-w-[170px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">{{ $t('footer.navigation') }}</div>
          <ul class="space-y-1">
            <li><NuxtLink :to="localePath('/artiste')" class="hover:underline">{{ $t('nav.artiste') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/peintures')" class="hover:underline">{{ $t('nav.peintures') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/foulards')" class="hover:underline">{{ $t('nav.foulards') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/autres-activites')" class="hover:underline">{{ $t('nav.autresActivites') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')" class="hover:underline">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>
        <!-- Contact -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">{{ $t('footer.contactInfo') }}</div>
          <ul class="space-y-1">
            <li class="flex items-center gap-2">
              <Icon icon="lucide:mail" class="w-5 h-5 shrink-0" />
                <span class="break-words">
                    marjolene.lasne@example.com
                </span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="lucide:phone" class="w-5 h-5 shrink-0" />
                <span class="whitespace-nowrap">
                  +33 6 12 34 56 78
                </span>
            </li>
            <li>{{ $t('footer.studioLocation') || 'Atelier en Provence' }}<br/>{{ $t('footer.visitsByAppointment') || 'Visites sur rendez-vous' }}</li>
          </ul>
        </div>
        <!-- Réseaux sociaux -->
        <div class="flex-1 min-w-[170px]">
          <div class="font-heading text-lg footer-title mb-2">{{ $t('footer.followUs') }}</div>
          <div class="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" class="hover:text-white text-footer-text text-2xl">
              <Icon icon="mdi:instagram" width="28" height="28" />
            </a>
            <a href="#" aria-label="Facebook" class="hover:text-white text-footer-text text-2xl">
              <Icon icon="mdi:facebook" width="28" height="28" />
            </a>
            <a href="#" aria-label="LinkedIn" class="hover:text-white text-footer-text text-2xl">
              <Icon icon="mdi:linkedin" width="28" height="28" />
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center pt-4 text-sm">
        <div class="mb-2 md:mb-0 footer-desc">© {{ year }} Marjolène Lasne. {{ $t('footer.allRightsReserved') }}</div>
        <div class="flex gap-6">
          <NuxtLink :to="localePath('/mentions-legales')" class="footer-link">{{ $t('footer.legalMentions') }}</NuxtLink>
          <NuxtLink :to="localePath('/politique-confidentialite')" class="footer-link">{{ $t('footer.privacyPolicy') }}</NuxtLink>
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

const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>
