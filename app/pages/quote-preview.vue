<template>
  <div class="min-h-screen bg-[#FBFAF6] py-16 px-6">
    <div class="max-w-5xl mx-auto space-y-24">
      <h1 class="text-4xl font-['Averia_Serif_Libre'] text-[#2E3D8B] text-center mb-16">Prévisualisation des designs de citations</h1>

      <!-- DESIGN A: Trait artistique asymétrique -->
      <section>
        <h2 class="text-sm font-montserrat uppercase tracking-widest text-[#C94E54] mb-8">Design A — Trait Artistique</h2>
        <div class="quote-design-a relative py-12 pl-8 md:pl-12">
          <!-- Trait vertical artistique -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C94E54] via-[#2E3D8B] to-transparent rounded-full"></div>
          <!-- Accent brush stroke -->
          <div class="absolute -left-2 top-8 w-6 h-16 bg-[#C94E54]/10 rounded-full blur-sm transform -rotate-12"></div>
          
          <blockquote>
            <p class="text-xl md:text-2xl lg:text-[1.7rem] font-['Averia_Serif_Libre'] text-[#2E3D8B] leading-relaxed mb-8 max-w-3xl">
              « La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons, d'illuminer paysages et personnages de sa touche alerte et vibrante. »
            </p>
            <footer class="flex items-center gap-4">
              <span class="w-12 h-[1px] bg-[#C94E54]"></span>
              <div>
                <cite class="not-italic font-montserrat font-semibold text-[#2E3D8B]">Gwénaëlle de Carné</cite>
                <span class="block text-sm text-[#4A5565]/70 font-montserrat">Critique d'Art</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      <!-- DESIGN B: Minimaliste avec grand guillemet -->
      <section>
        <h2 class="text-sm font-montserrat uppercase tracking-widest text-[#C94E54] mb-8">Design B — Grand Guillemet Minimaliste</h2>
        <div class="quote-design-b relative text-center py-16 px-8">
          <!-- Grand guillemet en fond -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 text-[12rem] md:text-[16rem] font-['Averia_Serif_Libre'] text-[#2E3D8B]/[0.06] leading-none select-none pointer-events-none">
            "
          </div>
          
          <blockquote class="relative z-10">
            <p class="text-xl md:text-2xl lg:text-[1.75rem] font-['Averia_Serif_Libre'] italic text-[#4A5565] leading-relaxed mb-10 max-w-3xl mx-auto">
              La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons.
            </p>
            <footer>
              <cite class="not-italic">
                <span class="font-montserrat text-lg font-bold text-[#C94E54] tracking-wide">Gwénaëlle de Carné</span>
                <span class="block mt-2 text-xs font-montserrat uppercase tracking-[0.25em] text-[#2E3D8B]/60">Critique d'Art</span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      <!-- DESIGN C: Carte flottante avec accent coloré -->
      <section>
        <h2 class="text-sm font-montserrat uppercase tracking-widest text-[#C94E54] mb-8">Design C — Carte Flottante</h2>
        <div class="quote-design-c relative max-w-4xl mx-auto">
          <!-- Accent coloré en arrière-plan décalé -->
          <div class="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full bg-gradient-to-br from-[#C94E54]/20 to-[#2E3D8B]/20 rounded-2xl"></div>
          
          <!-- Carte principale -->
          <div class="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#2E3D8B]/5">
            <blockquote>
              <p class="text-lg md:text-xl lg:text-2xl font-['Averia_Serif_Libre'] text-[#2E3D8B] leading-relaxed mb-8">
                « La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons, d'illuminer paysages et personnages de sa touche alerte et vibrante. »
              </p>
              <footer class="flex items-center justify-between border-t border-[#D1D5DC]/50 pt-6">
                <div>
                  <cite class="not-italic font-montserrat font-semibold text-[#4A5565]">Gwénaëlle de Carné</cite>
                  <span class="block text-sm text-[#4A5565]/60 font-montserrat mt-1">Critique d'Art</span>
                </div>
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#C94E54] to-[#2E3D8B] opacity-80"></div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <!-- DESIGN D: Coup de pinceau / Brush stroke -->
      <section>
        <h2 class="text-sm font-montserrat uppercase tracking-widest text-[#C94E54] mb-8">Design D — Coup de Pinceau</h2>
        <div class="quote-design-d relative py-16 px-6 md:px-12 overflow-hidden">
          <!-- Brush stroke SVG en fond -->
          <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-[0.04]" viewBox="0 0 800 200" fill="none">
            <path d="M50 100 Q200 20 400 100 T750 100" stroke="#C94E54" stroke-width="80" stroke-linecap="round" fill="none"/>
          </svg>
          
          <blockquote class="relative z-10 text-center max-w-4xl mx-auto">
            <!-- Guillemets stylisés -->
            <div class="flex justify-center gap-2 mb-6">
              <span class="w-2 h-2 rounded-full bg-[#C94E54]"></span>
              <span class="w-2 h-2 rounded-full bg-[#2E3D8B]"></span>
              <span class="w-2 h-2 rounded-full bg-[#C94E54]/50"></span>
            </div>
            
            <p class="text-xl md:text-2xl lg:text-[1.8rem] font-['Averia_Serif_Libre'] text-[#2E3D8B] leading-relaxed mb-8 italic">
              La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons, d'illuminer paysages et personnages de sa touche alerte et vibrante.
            </p>
            
            <!-- Ligne brush -->
            <div class="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-transparent via-[#C94E54] to-transparent rounded-full"></div>
            
            <footer>
              <cite class="not-italic">
                <span class="font-montserrat text-base font-medium text-[#C94E54]">Gwénaëlle de Carné</span>
                <span class="mx-2 text-[#D1D5DC]">·</span>
                <span class="font-montserrat text-sm text-[#4A5565]/70">Critique d'Art</span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      <!-- DESIGN E: Asymétrique moderne -->
      <section>
        <h2 class="text-sm font-montserrat uppercase tracking-widest text-[#C94E54] mb-8">Design E — Asymétrique Moderne</h2>
        <div class="quote-design-e grid md:grid-cols-[auto_1fr] gap-8 items-start max-w-4xl">
          <!-- Élément graphique vertical -->
          <div class="hidden md:flex flex-col items-center gap-3 pt-2">
            <div class="w-3 h-3 rounded-full bg-[#C94E54]"></div>
            <div class="w-[2px] h-32 bg-gradient-to-b from-[#C94E54] to-[#2E3D8B]/30"></div>
            <div class="w-2 h-2 rounded-full bg-[#2E3D8B]/40"></div>
          </div>
          
          <blockquote class="space-y-6">
            <p class="text-xl md:text-2xl font-['Averia_Serif_Libre'] text-[#2E3D8B] leading-relaxed">
              « La couleur est souveraine, les harmonies contrastées et l'exécution savoureuse ! Marjolène Lasne a le don d'exalter la musicalité des tons, d'illuminer paysages et personnages de sa touche alerte et vibrante. »
            </p>
            <footer class="flex items-center gap-6">
              <div class="flex-1 h-[1px] bg-gradient-to-r from-[#C94E54]/40 to-transparent"></div>
              <cite class="not-italic text-right">
                <span class="block font-montserrat font-bold text-[#2E3D8B]">Gwénaëlle de Carné</span>
                <span class="text-xs font-montserrat uppercase tracking-widest text-[#C94E54]">Critique d'Art</span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
// Page de prévisualisation des différents designs de citation
</script>
