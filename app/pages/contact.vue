<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div>
      <!-- Section Title -->
      <SectionTitle 
            :title="$t('contact.title')" 
            :subtitle="$t('contact.subtitle')"
          />
          
          <!-- Separator Line -->
          <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>

          <!-- Grille principale 2 colonnes -->
          <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            <!-- COLONNE GAUCHE : Informations -->
            <div class="space-y-10">
              
              <!-- Section Infos -->
              <div>
                <h2 class="font-heading text-2xl text-[#2E3D8B] mb-8">{{ $t('contact.infoTitle') }}</h2>
                
                <div class="space-y-6">
                  
                  <!-- Email -->
                  <div class="flex items-start gap-4 select-text">
                    <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                      <Icon icon="lucide:mail" class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="font-bold text-[#2E3D8B] mb-1">{{ $t('contact.labels.email') }}</div>
                      <div class="text-[#4A5565]">{{ config.public.contact.email }}</div>
                    </div>
                  </div>

                  <!-- Téléphone -->
                  <div class="flex items-start gap-4 select-text">
                    <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                      <Icon icon="lucide:phone" class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="font-bold text-[#2E3D8B] mb-1">{{ $t('contact.labels.phone') }}</div>
                      <div class="text-[#4A5565]">{{ config.public.contact.phone }}</div>
                    </div>
                  </div>

                  <!-- Adresse -->
                  <div class="flex items-start gap-4 select-text">
                    <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                      <Icon icon="lucide:map-pin" class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="font-bold text-[#2E3D8B] mb-1">{{ $t('contact.labels.studioAddress') }}</div>
                      <div class="text-[#4A5565] leading-relaxed">
                        {{ config.public.contact.address.street }}<br>
                        {{ config.public.contact.address.zip }} {{ config.public.contact.address.city }}<br>
                        {{ config.public.contact.address.country }}
                      </div>
                      <div class="text-sm text-[#4A5565] italic mt-2 opacity-80">{{ $t('contact.labels.visitByAppointment') }}</div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Carte Google Maps -->
              <div class="w-full h-[250px] rounded-xl overflow-hidden border border-[#D1D5DC] shadow-sm relative">
                <iframe 
                  :title="$t('contact.mapTitle')"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11394.340061962323!2d5.2758193!3d43.8997925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca010508f7f2b3%3A0x40819a5fd970330!2s84220%20Roussillon!5e0!3m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

            </div>

            <!-- COLONNE DROITE : Formulaire -->
            <div>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Honeypot anti-spam -->
                <input
                  type="text"
                  name="_gotcha"
                  class="hidden"
                  tabindex="-1"
                  autocomplete="off"
                  aria-hidden="true"
                />
                
                <!-- Ligne 1 : Nom et Prénom -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="lastName" class="block text-sm font-medium text-[#4A5565]">
                      {{ $t('contact.form.lastName') }} <span class="text-[#C94E54]">{{ $t('contact.form.required') }}</span>
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      autocomplete="family-name"
                      v-model="form.lastName" 
                      required 
                      class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] placeholder-gray-400 transition-all" 
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="firstName" class="block text-sm font-medium text-[#4A5565]">
                      {{ $t('contact.form.firstName') }} <span class="text-[#C94E54]">{{ $t('contact.form.required') }}</span>
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      autocomplete="given-name"
                      v-model="form.firstName" 
                      required 
                      class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] placeholder-gray-400 transition-all" 
                    />
                  </div>
                </div>

                <!-- Ligne 2 : Email -->
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-[#4A5565]">
                    {{ $t('contact.form.email') }} <span class="text-[#C94E54]">{{ $t('contact.form.required') }}</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    autocomplete="email"
                    v-model="form.email" 
                    required 
                    class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] placeholder-gray-400 transition-all" 
                  />
                </div>

                <!-- Ligne 3 : Sujet -->
                <div class="space-y-2">
                  <label for="subject" class="block text-sm font-medium text-[#4A5565]">
                    {{ $t('contact.form.subject') }} <span class="text-[#C94E54]">{{ $t('contact.form.required') }}</span>
                  </label>
                  <div class="relative">
                    <select 
                      id="subject" 
                      name="subject"
                      v-model="form.subject" 
                      required 
                      class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>{{ $t('contact.form.subjectPlaceholder') }}</option>
                      <option :value="$t('contact.form.subjectOptions.general')">{{ $t('contact.form.subjectOptions.general') }}</option>
                      <option :value="$t('contact.form.subjectOptions.order')">{{ $t('contact.form.subjectOptions.order') }}</option>
                      <option :value="$t('contact.form.subjectOptions.workInfo')">{{ $t('contact.form.subjectOptions.workInfo') }}</option>
                      <option :value="$t('contact.form.subjectOptions.other')">{{ $t('contact.form.subjectOptions.other') }}</option>
                    </select>
                    <!-- Chevron personnalisé -->
                    <Icon icon="lucide:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>

                <!-- Ligne 4 : Message -->
                <div class="space-y-2">
                  <label for="message" class="block text-sm font-medium text-[#4A5565]">
                    {{ $t('contact.form.message') }} <span class="text-[#C94E54]">{{ $t('contact.form.required') }}</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    v-model="form.message" 
                    required 
                    rows="5"
                    class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] placeholder-gray-400 transition-all min-h-[150px] resize-y"
                  ></textarea>
                </div>

                <!-- Bouton d'envoi -->
                <ContactButton
                  :to="'#'"
                  :label="$t('contact.form.send')"
                  :aria-label="$t('contact.form.sendAriaLabel')"
                  class="w-full mt-4"
                  :class="{ 'opacity-70 cursor-not-allowed pointer-events-none': loading }"
                  @click.prevent="!loading && handleSubmit()"
                >
                  <template #default>
                    <span v-if="loading" class="flex items-center gap-2">
                      <Icon icon="lucide:loader-2" class="w-5 h-5 animate-spin" />
                      {{ $t('contact.form.sending') }}
                    </span>
                    <span v-else>
                      {{ $t('contact.form.send') }}
                    </span>
                  </template>
                </ContactButton>

                <!-- Message de succès -->
                <div 
                  v-if="success" 
                  class="mt-4 p-4 bg-green-50 text-green-700 rounded-lg text-center flex items-center justify-center gap-2" 
                  aria-live="polite"
                >
                  <Icon icon="lucide:check-circle" class="w-5 h-5 shrink-0" />
                  <span>{{ $t('contact.success') }}</span>
                </div>
                
                <!-- Message d'erreur -->
                <div
                  v-if="errors.length"
                  class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-center flex flex-col items-center justify-center gap-2"
                  aria-live="polite"
                >
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:alert-circle" class="w-5 h-5 shrink-0" />
                    <span class="font-medium">{{ $t('contact.errors.title') }}</span>
                  </div>
                  <ul class="text-sm list-none space-y-1">
                    <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
                  </ul>
                </div>

              </form>
            </div>

          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useSiteUrl } from '~/composables/useSiteUrl'

const config = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const { siteUrl, withSiteUrl } = useSiteUrl()
const metaTitle = computed(() => t('contact.seo.title') || '')
const metaDescription = computed(() => t('contact.seo.description') || '')
const metaImage = withSiteUrl('/logo.png')

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: metaImage,
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImage,
})

const breadcrumbSchema = computed(() => {
  if (!siteUrl) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('contact.breadcrumb.home') || 'Accueil',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('contact.breadcrumb.current') || 'Contact',
        item: withSiteUrl(localePath('/contact')),
      },
    ],
  }
})

const contactPageSchema = computed(() => {
  if (!siteUrl) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: metaTitle.value,
    url: withSiteUrl(localePath('/contact')),
    description: metaDescription.value,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Marjolène Lasne',
      image: withSiteUrl('/logo.png'),
      url: siteUrl,
      telephone: config.public.contact.phone,
      email: config.public.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.public.contact.address.street,
        addressLocality: config.public.contact.address.city,
        postalCode: config.public.contact.address.zip,
        addressCountry: config.public.contact.address.country
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.8997925,
        longitude: 5.2758193
      }
    }
  }
})

useHead(() => ({
  script: [breadcrumbSchema.value, contactPageSchema.value]
    .filter(Boolean)
    .map((schema) => ({
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
}))

// États du formulaire
const loading = ref(false)
const success = ref(false)
const errors = ref<string[]>([])

// Données du formulaire
const form = ref({
  lastName: '',
  firstName: '',
  email: '',
  subject: '',
  message: ''
})

/**
 * Préremplissage du formulaire selon les query params
 * - Depuis peinture : ?oeuvre=Titre&technique=Acrylique
 * - Depuis foulard : ?sujet=foulard&produit=Nom&couleur=X&taille=Y&matiere=Z
 * - Depuis activité : ?sujet=activite&activite=Nom
 */
onMounted(() => {
  const { oeuvre, technique, sujet, produit, couleur, taille, matiere, activite, message } = route.query

  if (oeuvre) {
    // Préremplissage depuis une page peinture
    form.value.subject = t('contact.form.subjectOptions.workInfo') || 'Informations sur une œuvre'
    const techStr = technique ? ` (${technique})` : ''
    form.value.message = `${t('contact.prefill.greeting') || 'Bonjour,'}\n\nJe souhaite obtenir des informations sur l'œuvre « ${oeuvre} »${techStr}.\n\n${t('contact.prefill.closing') || 'Cordialement,'}`
  } else if (sujet === 'foulard' && produit) {
    // Préremplissage depuis une page foulard
    form.value.subject = t('contact.form.subjectOptions.workInfo') || 'Informations sur une œuvre'
    const details = [
      couleur ? `couleur ${couleur}` : null,
      taille ? `taille ${taille}` : null,
      matiere ? `matière ${matiere}` : null
    ].filter(Boolean).join(', ')
    form.value.message = `${t('contact.prefill.greeting') || 'Bonjour,'}\n\nJe souhaite obtenir des informations sur le foulard « ${produit} »${details ? ` (${details})` : ''}.\n\n${t('contact.prefill.closing') || 'Cordialement,'}`
  } else if (sujet === 'activite' && activite) {
    // Préremplissage depuis la page autres activités
    form.value.subject = t('contact.form.subjectOptions.general') || 'Question générale'
    form.value.message = `${t('contact.prefill.greeting') || 'Bonjour,'}\n\nJe souhaite obtenir des informations sur l'activité « ${activite} ».\n\n${t('contact.prefill.closing') || 'Cordialement,'}`
  } else if (sujet === 'artiste') {
    // Préremplissage depuis la page artiste
    form.value.subject = t('contact.form.subjectOptions.general') || 'Question générale'
    form.value.message = message && typeof message === 'string' && message.trim().length > 0
      ? message
      : `${t('contact.prefill.greeting') || 'Bonjour,'}\n\nJe souhaite contacter l'artiste Marjolène Lasne.\n\n${t('contact.prefill.closing') || 'Cordialement,'}`
  }
})

// ID Formspree 
const FORMSPREE_ID = "xykdgrbl"

// Initialize Google Analytics
const { gtag } = useGtag()

/**
 * Gestion de l'envoi du formulaire via Formspree
 */
const handleSubmit = async () => {
  errors.value = [];
  success.value = false;

  // Validation côté client
  if (!form.value.lastName.trim() || !form.value.firstName.trim() || !form.value.email.trim() || !form.value.subject.trim() || !form.value.message.trim()) {
    errors.value = [
      t('contact.errors.requiredFields') || 'Veuillez remplir tous les champs du formulaire avant d\'envoyer votre message.'
    ];
    return;
  }

  loading.value = true;

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: JSON.stringify({
        nom: form.value.lastName,
        prenom: form.value.firstName,
        email: form.value.email,
        sujet: form.value.subject,
        message: form.value.message,
        _subject: `Contact Marjolène Lasne : ${form.value.subject}`
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
      success.value = true;

      // GA4: track successful contact form submission
      gtag('event', 'generate_lead', {
        event_category: 'contact',
        event_label: form.value.subject,
      })

      // Reset du formulaire
      form.value = {
        lastName: '',
        firstName: '',
        email: '',
        subject: '',
        message: ''
      };
      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        success.value = false;
      }, 5000);
    } else if (data?.errors && Array.isArray(data.errors)) {
      errors.value = data.errors
        .map((err: { message?: string }) => err?.message || (t('contact.errors.unknown') || 'Erreur inconnue dans le formulaire.'))
        .filter(Boolean);
    } else if (data?.error) {
      errors.value = [data.error];
    } else {
      errors.value = [t('contact.errors.generic') || 'Une erreur est survenue, veuillez réessayer.'];
    }
  } catch (e) {
    errors.value = [t('contact.errors.network') || 'Une erreur de connexion est survenue. Veuillez vérifier votre réseau.'];
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Style pour le heading */
.font-heading {
  font-family: 'Averia Serif Libre', serif;
}
</style>
