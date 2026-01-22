<template>
  <div>
    <header class="mb-8">
      <h1 class="text-4xl font-heading text-primary">UI Playground</h1>
      <p class="mt-2 text-gray-text">Zone de tests d'affichage des composants UI</p>
    </header>

    <section class="mb-12 section-demo">
      <h2 class="text-2xl font-heading mb-4">Header Preview</h2>
      <Header />
    </section>

    <section class="mb-12 section-demo">
      <h2 class="text-2xl font-heading mb-4">Footer Preview</h2>
      <Footer />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Language Switcher</h2>
      <LanguageSwitcher />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">FilterItem</h2>
      <div class="flex gap-2 flex-wrap">
        <FilterItem label="Paysages" :selected="true" @click="() => console.log('FilterItem clicked')" />
        <FilterItem label="Terrasses & Marchés" :selected="false" @click="() => console.log('FilterItem clicked')" />
        <FilterItem label="Scènes d'intérieur" :selected="false" @click="() => console.log('FilterItem clicked')" />
      </div>
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Painting Card</h2>
      <PaintingCard image="/peintures/marjo-peinture-1.avif" title="Roussillon aux fleurs sauvages"
        technique="Huile sur toile" dimensions="80cm x 120cm" />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">CardGrid</h2>
      <CardGrid :items="[
        { image: '/peintures/marjo-peinture-1.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' },
        { image: '/peintures/marjo-peinture-2.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' },
        { image: '/peintures/marjo-peinture-3.avif', title: 'Roussillon aux fleurs sauvages', technique: 'Huile sur toile', dimensions: '80cm x 120cm' }
      ]" :cardComponent="PaintingCard" />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Section Title</h2>
      <SectionTitle title="Peintures"
        subtitle="Découvrez une sélection d'œuvres originales, inspirées par les paysages méditerranéens et la lumière du Sud." />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Filter Component</h2>
      <Filter title="Collections" :items="[
        { label: 'Toutes', value: 'all' },
        { label: 'Paysages', value: 'paysages' },
        { label: 'Terrasses & Marchés', value: 'terrasses' },
      ]" v-model="filterSelected" />
      <div class="mt-2 text-sm text-gray-500">Valeur sélectionnée : {{ filterSelected }}</div>
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Title Image Content</h2>
      <TitleImageContent title="Biographie" image="/Marjolène-Lasne.png"
        caption="Marjolène Lasne , ses pinceaux et son chevalet" position="left" :paragraphs="[
          'Marjolène Lasne est une artiste peintre française basée en Provence. Son œuvre, profondément ancrée dans la lumière méditerranéenne, explore les paysages, les terrasses et les scènes d\'intérieur avec une sensibilité unique.',
          'Formée aux Beaux-Arts de Paris, elle développe rapidement un style personnel caractérisé par des compositions lumineuses et des palettes de couleurs chaudes inspirées du Sud de la France. Son travail a été exposé dans de nombreuses galeries en France et à l\'international.',
          'Elle partage désormais son temps entre la création, l\'enseignement et les résidences artistiques. Passionnée par la transmission de son art, Marjolène anime régulièrement des ateliers et accompagne des artistes émergents dans leur développement artistique.'
        ]" />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Timeline Bar</h2>
      <Timeline />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Activities Section - Image Right</h2>
      <ActivitiesSection
        title="Stages"
        description="Cours de peinture et stages d'initiation aux techniques acrylique, huile et aquarelle."
        :items="[
          'À la demande, individues ou collectifs (max 8 pers)',
          'Organisés dans l\'atelier à Roussillon',
          'Pour enfants et adultes',
          'Possibilité de peindre sur le motif (en extérieur)'
        ]"
        imageSrc="/peintures/marjo-peinture-1.avif"
        imageAlt="Atelier de peinture avec chevalet et peintures"
        position="right"
        :to="{ name: 'index' }"
      />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Activities Section - Image Left</h2>
      <ActivitiesSection
        title="Design textile"
        description="Dans le cadre de sa participation au salon Première Vision 2015 à Paris, Marjolène propose également des imprimés."
        :items="[
          'Création manuelle (aquarelle, crayon, collage) puis traitement Photoshop si nécessaire',
          'Designs variés : florales, géométriques...',
          'Commandes possibles'
        ]"
        imageSrc="/foulards/foulard-marjo-bleu.avif"
        imageAlt="Design textile avec motifs rouges et oranges"
        position="left"
        :to="{ name: 'index' }"
      />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Autres Activités Page</h2>
      <div class="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-6">
        <p class="text-sm text-gray-700">
          Full page preview with 4 activity sections in alternating layout
        </p>
      </div>
      <div class="min-h-screen bg-[#FBFAF6]">
        <div class="flex-1 px-6 sm:px-12 md:px-24">
          <div class="max-w-[72rem] mx-auto py-12">
            <SectionTitle 
              title="Autres activités" 
              subtitle="Pour aller au-delà de la peinture, Marjolène vous propose diverses activités et services"
            />
            <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>
            <div class="space-y-24">
            <ActivitiesSection
              title="Stages"
              description="Cours de peinture et stages d'initiation aux techniques acrylique, huile et aquarelle"
              :items="[
                'À la demande, individuels ou collectifs (max 8 pers)',
                'Organisés dans l\'atelier à Roussillon',
                'Pour enfants et adultes',
                'Possibilité de peindre sur le motif (en extérieur)'
              ]"
              imageSrc="/peintures/marjo-peinture-1.avif"
              imageAlt="Atelier de peinture avec stages et initiation"
              position="right"
              buttonLabel="Contacter l'artiste"
              buttonAriaLabel="Contacter l'artiste"
              to="#contact"
            />
            <ActivitiesSection
              title="Design textile"
              description="Dans le cadre de sa participation au salon Première Vision 2015 à Paris, Marjolène propose également des imprimés"
              :items="[
                'Création manuelle (aquarelle, crayon, collage) puis traitement Photoshop',
                'Designs variés : florales, géométriques',
                'Commandes possibles'
              ]"
              imageSrc="/peintures/marjo-peinture-2.avif"
              imageAlt="Design textile et imprimés de Marjolène"
              position="left"
              buttonLabel="Contacter l'artiste"
              buttonAriaLabel="Contacter l'artiste"
              to="#contact"
            />
            <ActivitiesSection
              title="Gîtes et chambres d'hôtes"
              description="Découvrez un havre de paix à Roussillon en Provence. Des gîtes et chambres d'hôtes chaleureuses pour un séjour inoubliable."
              :items="[
                'Accueil d\'hôtes à Roussillon',
                'Logements modernes et élégants avec goût',
                'Observation directe possible de la vie Provence-sud',
                'Dégustations locale pour découvrir la Provence'
              ]"
              imageSrc="/peintures/marjo-peinture-3.avif"
              imageAlt="Gîtes et chambres d'hôtes à Roussillon"
              position="right"
              buttonLabel="Découvrir les logements"
              buttonAriaLabel="Découvrir les logements"
              :to="`https://www.unairdevacances.art`"
            />
            <ActivitiesSection
              title="Commandes et visites de l'atelier"
              description="L'artiste propose des commandes d'aquarelles et de visites sur mesure. On peut, sur rendez-vous, rencontrer l'artiste dans son atelier."
              :items="[
                'Reproduction d\'image en peinture peuvent être proposées',
                'Suites au-on montrer paysages, portraits, natures-mortes',
                'Disponibilités limitées pour discuter en personne',
                'Sur la demande d\'un rendez-vous'
              ]"
              imageSrc="/peintures/marjo-peinture-4.avif"
              imageAlt="Atelier et commandes de peinture"
              position="left"
              buttonLabel="Contacter l'artiste"
              buttonAriaLabel="Contacter l'artiste"
              to="#contact"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">FoulardCard (exemple)</h2>
      <FoulardCard title="Foulard Jardin Secret"
        description="Un foulard inspiré du jardin secret, aux couleurs douces et matières nobles." :colors="[
          {
            id: 'orange',
            label: 'Orange',
            hex: '#FFA500',
            materials: {
              soie: {
                id: 'soie',
                label: 'Soie',
                images: [{ src: '/foulards/jardin-secret/orange/soie-1.avif', alt: 'Foulard orange soie' }]
              },
              'soie-coton': {
                id: 'soie-coton',
                label: 'Soie & Coton',
                images: [{ src: '/foulards/jardin-secret/orange/soie-coton-1.avif', alt: 'Foulard orange soie-coton' }]
              }
            }
          },
          {
            id: 'bleu',
            label: 'Bleu',
            hex: '#2E5EB8',
            materials: {
              soie: {
                id: 'soie',
                label: 'Soie',
                images: [{ src: '/foulards/foulard-marjo-bleu.avif', alt: 'Foulard bleu soie' }]
              }
            }
          }
        ]" :sizes="[
            { id: '70x70', label: '70x70 cm' },
            { id: '90x90', label: '90x90 cm' }
          ]" />
    </section>

    <section class="mb-8 section-demo">
      <h2 class="text-2xl font-heading mb-4">Test direct FoulardGrid (grid)</h2>
      <FoulardGrid :items="[
        {
          title: 'Foulard Azur',
          description: 'Foulard bleu azur en soie. Foulard bleu azur en soie. Foulard bleu azur en soie. Foulard bleu azur en soie. Foulard bleu azur en soie. Foulard bleu azur en soie. Foulard bleu azur en soie.',
          colors: [
            {
              id: 'azur',
              label: 'Azur',
              hex: '#2E5EB8',
              materials: {
                soie: {
                  id: 'soie',
                  label: 'Soie',
                  images: [{ src: '/foulards/foulard-marjo-bleu.avif', alt: 'Foulard azur soie' }]
                },
                modal: {
                  id: 'modal',
                  label: 'Modal',
                  images: [{ src: '/foulards/foulard-marjo-vert.avif', alt: 'Foulard azur modal' }]
                },
                'soie-coton': {
                  id: 'soie-coton',
                  label: 'Soie & Coton',
                  images: [{ src: '/foulards/foulard-marjo-orange.avif', alt: 'Foulard azur soie-coton' }]
                }
              }
            },
            {
              id: 'rouge',
              label: 'Rouge',
              hex: '#C94E54',
              materials: {
                soie: {
                  id: 'soie',
                  label: 'Soie',
                  images: [{ src: '/foulards/foulard-marjo-orange.avif', alt: 'Foulard rouge soie' }]
                }
              }
            }
          ],
          sizes: [
            { id: '70x70', label: '70x70 cm' },
            { id: '90x90', label: '90x90 cm' },
            { id: '140x140', label: '140x140 cm' }
          ]
        },
        {
          title: 'Foulard Rouge',
          description: 'Foulard rouge en soie & coton.',
          colors: [
            {
              id: 'rouge',
              label: 'Rouge',
              hex: '#C94E54',
              materials: {
                'soie-coton': {
                  id: 'soie-coton',
                  label: 'Soie & Coton',
                  images: [{ src: '/foulards/foulard-marjo-orange.avif', alt: 'Foulard rouge soie-coton' }]
                }
              }
            },
            {
              id: 'azur',
              label: 'Azur',
              hex: '#2E5EB8',
              materials: {
                soie: {
                  id: 'soie',
                  label: 'Soie',
                  images: [{ src: '/foulards/foulard-marjo-bleu.avif', alt: 'Foulard azur soie' }]
                }
              }
            }
          ],
          sizes: [
            { id: '90x90', label: '90x90 cm' }
          ]
        },
        {
          title: 'Foulard Vert',
          description: 'Foulard vert modal.',
          colors: [
            {
              id: 'vert',
              label: 'Vert',
              hex: '#2DBA6C',
              materials: {
                modal: {
                  id: 'modal',
                  label: 'Modal',
                  images: [{ src: '/foulards/foulard-marjo-vert.avif', alt: 'Foulard vert modal' }]
                }
              }
            },
            {
              id: 'azur',
              label: 'Azur',
              hex: '#2E5EB8',
              materials: {
                soie: {
                  id: 'soie',
                  label: 'Soie',
                  images: [{ src: '/foulards/foulard-marjo-bleu.avif', alt: 'Foulard azur soie' }]
                }
              }
            }
          ],
          sizes: [
            { id: '140x140', label: '140x140 cm' }
          ]
        }
      ]" />
    </section>
  </div>
</template>

<style scoped>
h2 {
  color: #C94E54;
}

.section-demo {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 2rem;
  background: #fff;
}
</style>


<script setup>
import FoulardCard from "../components/FoulardCard.vue"
import FoulardGrid from "../components/FoulardGrid.vue"
import { ref } from 'vue'
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import CardGrid from "../components/CardGrid.vue"
import PaintingCard from "../components/PaintingCard.vue"
import SectionTitle from "../components/SectionTitle.vue"
import Filter from "../components/Filter.vue"
import TitleImageContent from "../components/TitleImageContent.vue"
import FilterItem from "~/components/FilterItem.vue"
import Timeline from '~/components/timeline/Timeline.vue'
import ActivitiesSection from '~/components/ActivitiesSection.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const filterSelected = ref('all')
</script>