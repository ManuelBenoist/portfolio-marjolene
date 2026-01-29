<template>
  <div class="min-h-screen bg-[#FBFAF6]">
    <main class="flex-1 px-6 sm:px-12 md:px-24">
      <div class="max-w-[72rem] mx-auto">
        <!-- Section Title -->
        <SectionTitle 
          title="Contact" 
          subtitle="Pour toute question ou commande, merci de remplir le formulaire ci-dessous. Marjolène Lasne vous répondra dans les meilleurs délais."
        />
        
        <!-- Separator Line -->
        <div class="border-t border-[#D1D5DC] mt-8 mb-12"></div>

        <!-- Grille principale 2 colonnes -->
        <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          <!-- COLONNE GAUCHE : Informations -->
          <div class="space-y-10">
            
            <!-- Section Infos -->
            <div>
              <h2 class="font-heading text-2xl text-[#2E3D8B] mb-8">Informations</h2>
              
              <div class="space-y-6">
                
                <!-- Email -->
                <div class="flex items-start gap-4 select-text">
                  <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                    <Icon icon="lucide:mail" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-[#2E3D8B] mb-1">Email</div>
                    <div class="text-[#4A5565]">marjolenelasne@gmail.com</div>
                  </div>
                </div>

                <!-- Téléphone -->
                <div class="flex items-start gap-4 select-text">
                  <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                    <Icon icon="lucide:phone" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-[#2E3D8B] mb-1">Téléphone</div>
                    <div class="text-[#4A5565]">+33 6 08 77 08 24</div>
                  </div>
                </div>

                <!-- Adresse -->
                <div class="flex items-start gap-4 select-text">
                  <div class="w-12 h-12 rounded-full bg-[#2E3D8B] flex items-center justify-center text-[#FBFAF6] shrink-0">
                    <Icon icon="lucide:map-pin" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-[#2E3D8B] mb-1">Adresse de l'atelier</div>
                    <div class="text-[#4A5565] leading-relaxed">
                      11 place de l'Abbé Avon<br>
                      84220 Roussillon<br>
                      France
                    </div>
                    <div class="text-sm text-[#4A5565] italic mt-2 opacity-80">(Visites sur rendez-vous uniquement)</div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Carte Google Maps -->
            <div class="w-full h-[250px] rounded-xl overflow-hidden border border-[#D1D5DC] shadow-sm relative">
              <iframe 
                title="Atelier - Galerie Marjolène LASNE à Roussillon"
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
                    Nom <span class="text-[#C94E54]">*</span>
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
                    Prénom <span class="text-[#C94E54]">*</span>
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
                  Email <span class="text-[#C94E54]">*</span>
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
                  Sujet <span class="text-[#C94E54]">*</span>
                </label>
                <div class="relative">
                  <select 
                    id="subject" 
                    name="subject"
                    v-model="form.subject" 
                    required 
                    class="w-full px-4 py-3 bg-[#FBFAF6] border border-[#D1D5DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E3D8B] focus:border-transparent text-[#4A5565] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="Question générale">Question générale</option>
                    <option value="Commande">Commande</option>
                    <option value="Informations sur une œuvre">Informations sur une œuvre</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <!-- Chevron personnalisé -->
                  <Icon icon="lucide:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                </div>
              </div>

              <!-- Ligne 4 : Message -->
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-[#4A5565]">
                  Message <span class="text-[#C94E54]">*</span>
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
                label="Envoyer le message"
                aria-label="Envoyer le message de contact"
                class="w-full mt-4"
                :class="{ 'opacity-70 cursor-not-allowed pointer-events-none': loading }"
                @click.prevent="!loading && handleSubmit()"
              >
                <template #default>
                  <span v-if="loading" class="flex items-center gap-2">
                    <Icon icon="lucide:loader-2" class="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </span>
                  <span v-else>
                    Envoyer le message
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
                <span>Merci, votre message a bien été envoyé.</span>
              </div>
              
              <!-- Message d'erreur -->
              <div
                v-if="errors.length"
                class="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-center flex flex-col items-center justify-center gap-2"
                aria-live="polite"
              >
                <div class="flex items-center gap-2">
                  <Icon icon="lucide:alert-circle" class="w-5 h-5 shrink-0" />
                  <span class="font-medium">Une erreur est survenue</span>
                </div>
                <ul class="text-sm list-none space-y-1">
                  <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
                </ul>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const route = useRoute()

// SEO Meta
useHead({
  title: 'Contact - Marjolène Lasne',
  meta: [
    { 
      name: 'description', 
      content: 'Contactez Marjolène Lasne pour toute question sur ses peintures, foulards en soie ou pour planifier une visite à l\'atelier en Provence.' 
    }
  ]
})

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
    form.value.subject = 'Informations sur une œuvre'
    form.value.message = `Bonjour,\n\nJe souhaite obtenir des informations sur l'œuvre « ${oeuvre} »${technique ? ` (${technique})` : ''}.\n\nCordialement,`
  } else if (sujet === 'foulard' && produit) {
    // Préremplissage depuis une page foulard
    form.value.subject = 'Informations sur une œuvre'
    const details = [
      couleur ? `couleur ${couleur}` : null,
      taille ? `taille ${taille}` : null,
      matiere ? `matière ${matiere}` : null
    ].filter(Boolean).join(', ')
    form.value.message = `Bonjour,\n\nJe souhaite obtenir des informations sur le foulard « ${produit} »${details ? ` (${details})` : ''}.\n\nCordialement,`
  } else if (sujet === 'activite' && activite) {
    // Préremplissage depuis la page autres activités
    form.value.subject = 'Question générale'
    form.value.message = `Bonjour,\n\nJe souhaite obtenir des informations sur l'activité « ${activite} ».\n\nCordialement,`
  } else if (sujet === 'artiste') {
    // Préremplissage depuis la page artiste
    form.value.subject = 'Question générale'
    form.value.message = message && typeof message === 'string' && message.trim().length > 0
      ? message
      : `Bonjour,\n\nJe souhaite contacter l'artiste Marjolène Lasne.\n\nCordialement,`
  }
})

// ID Formspree - REMPLACER "TON_ID" PAR L'ID RÉEL DU FORMULAIRE FORMSPREE
const FORMSPREE_ID = "mykwlepy"

/**
 * Gestion de l'envoi du formulaire via Formspree
 */
const handleSubmit = async () => {
  errors.value = [];
  success.value = false;

  // Validation côté client
  if (!form.value.lastName.trim() || !form.value.firstName.trim() || !form.value.email.trim() || !form.value.subject.trim() || !form.value.message.trim()) {
    errors.value = [
      'Veuillez remplir tous les champs du formulaire avant d\'envoyer votre message.'
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
        .map((err: { message?: string }) => err?.message || 'Erreur inconnue dans le formulaire.')
        .filter(Boolean);
    } else if (data?.error) {
      errors.value = [data.error];
    } else {
      errors.value = ['Une erreur est survenue, veuillez réessayer.'];
    }
  } catch (e) {
    console.error("Erreur d'envoi du formulaire:", e);
    errors.value = ['Une erreur de connexion est survenue. Veuillez vérifier votre réseau.'];
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
