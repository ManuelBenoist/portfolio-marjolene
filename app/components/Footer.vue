<template>
  <footer class="bg-footer pt-12 pb-4 mt-12 text-[#ABABAB]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 pb-8 border-b" style="border-color: #ABABAB;">
        <!-- Présentation -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-xl footer-title mb-2">Marjolène Lasne</div>
          <div class="text-base leading-relaxed">Artiste peintre basée en Provence, inspirée par les paysages colorés, les scènes de vie et la lumière du Sud.</div>
        </div>
        <!-- Navigation -->
        <div class="flex-1 min-w-[170px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">Navigation</div>
          <ul class="space-y-1">
            <li><NuxtLink to="/artiste" class="hover:underline">L'Artiste</NuxtLink></li>
            <li><NuxtLink to="/peintures" class="hover:underline">Peintures</NuxtLink></li>
            <li><NuxtLink to="/foulards" class="hover:underline">Foulards</NuxtLink></li>
            <li><NuxtLink to="/autres-activites" class="hover:underline">Autres Activités</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink></li>
          </ul>
        </div>
        <!-- Contact -->
        <div class="flex-1 min-w-[220px] mb-8 lg:mb-0">
          <div class="font-heading text-lg footer-title mb-2">Contact</div>
          <ul class="space-y-1">
            <li class="flex items-center gap-2">
              <Icon icon="lucide:mail" class="w-5 h-5 shrink-0" />
                <span class="break-words">
                    marjolenelasne@gmail.com
                </span>
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="lucide:phone" class="w-5 h-5 shrink-0" />
                <span class="whitespace-nowrap">
                  +33 6 08 77 08 24
                </span>
            </li>
            <li>Atelier à Roussillon en Provence</br> France</li>
          </ul>
        </div>
        <!-- Réseaux sociaux -->
        <div class="flex-1 min-w-[170px]">
          <div class="font-heading text-lg footer-title mb-2">Suivez l'artiste</div>
          <div class="flex gap-4 mt-2">
            <a href="https://www.instagram.com/unairdevacances_" aria-label="Instagram" class="hover:text-white text-footer-text text-2xl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:instagram" width="28" height="28" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083185458797" aria-label="Facebook" class="hover:text-white text-footer-text text-2xl">
              <Icon icon="mdi:facebook" width="28" height="28" />
            </a>
            <a href="https://www.linkedin.com/in/marjolenelasne" aria-label="LinkedIn" class="hover:text-white text-footer-text text-2xl" target="_blank" rel="noopener noreferrer">
              <Icon icon="mdi:linkedin" width="28" height="28" />
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center pt-4 text-sm">
        <div class="mb-2 md:mb-0 footer-desc">© {{ year }} Marjolène Lasne. Tous droits réservés.</div>
        <div class="flex gap-6">
          <NuxtLink to="/mentions-legales" class="footer-link">Mentions légales</NuxtLink>
          <NuxtLink to="/politique-confidentialite" class="footer-link">Politique de confidentialité</NuxtLink>
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
const year = new Date().getFullYear()
</script>
