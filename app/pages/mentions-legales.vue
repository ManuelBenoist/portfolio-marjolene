<template>
  <div class="max-w-[72rem] mx-auto px-6 py-12">
    <div class="mentions-legales">
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-3xl font-bold mb-8">Mentions légales</h1>
        
        <p class="text-sm text-gray-600 mb-8">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est porté à la connaissance des utilisateurs et visiteurs du site les présentes mentions légales.
        </p>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">1. Éditeur du site</h2>
          <p class="mb-2">Le présent site est édité par :</p>
          <ul class="list-none space-y-1 ml-4">
            <li><strong>Nom :</strong> Marjolène Lasne</li>
            <li><strong>Statut :</strong> Artiste peintre, micro-entrepreneur</li>
            <li><strong>Adresse :</strong> {{ config.public.contact.address.street }}, {{ config.public.contact.address.zip }} {{ config.public.contact.address.city }}</li>
            <li><strong>SIRET :</strong> 3441744300061 </li>
            <li><strong>Téléphone :</strong> {{ config.public.contact.phone }}</li>
            <li><strong>Email :</strong> {{ config.public.contact.email }}</li>
          </ul>
          <p class="mt-4 text-sm text-gray-600">
            Directeur de la publication : Marjolène Lasne
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">2. Hébergeur</h2>
          <p class="mb-2">Le site est hébergé par :</p>
          <ul class="list-none space-y-1 ml-4">
            <li><strong>Raison sociale :</strong> GitHub Inc.</li>
            <li><strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis</li>
            <li>Hébergement via Github Pages</li>
            <li><strong>Site web :</strong> <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-accent underline underline-offset-2">https://github.com</a></li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">3. Propriété intellectuelle</h2>
          <p class="mb-4">
            L'ensemble du contenu de ce site (textes, images, photographies, illustrations, œuvres artistiques, logos, icônes) est la propriété exclusive de Marjolène Lasne, sauf mention contraire.
          </p>
          <p class="mb-4">
            Les œuvres artistiques présentées sur ce site sont protégées par le droit d'auteur conformément au Code de la propriété intellectuelle (articles L.111-1 et suivants).
          </p>
          <p class="mb-4">
            Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Marjolène Lasne.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">4. Collecte de données personnelles et RGPD</h2>
          
          <h3 class="text-lg font-medium mb-2 mt-4">4.1 Formulaire de contact</h3>
          <p class="mb-4">
            Le site dispose d'un formulaire de contact permettant aux visiteurs d'envoyer des messages à l'éditeur. Les données collectées (nom, adresse email, message) sont utilisées uniquement pour répondre aux demandes des utilisateurs. Ces données sont traitées via le service Formspree (Formspree, Inc.) et ne sont pas conservées au-delà du temps nécessaire au traitement de la demande.
          </p>
          
          <h3 class="text-lg font-medium mb-2">4.2 Mesure d'audience</h3>
          <p class="mb-4">
            Ce site utilise Google Analytics 4, un service d'analyse d'audience fourni par Google LLC. Ce service utilise des cookies pour collecter des informations anonymes sur la navigation des visiteurs (pages consultées, durée des visites, origine géographique approximative). Ces données sont utilisées à des fins statistiques pour améliorer l'expérience utilisateur.
          </p>
          <p class="mb-4">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous pouvez refuser l'utilisation de ces cookies via le bandeau de consentement affiché lors de votre première visite.
          </p>
          
          <h3 class="text-lg font-medium mb-2">4.3 Vos droits</h3>
          <p class="mb-4">
            Conformément au RGPD et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul class="list-disc ml-6 space-y-1 mb-4">
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit d'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez contacter l'éditeur à l'adresse email suivante : {{ config.public.contact.email }}. En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">5. Cookies</h2>
          <p class="mb-4">
            Ce site utilise des cookies, notamment pour le fonctionnement de Google Analytics 4. Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web.
          </p>
          <p class="mb-4">
            Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est déposé. Le refus des cookies peut limiter certaines fonctionnalités du site.
          </p>
          <p>
            Pour en savoir plus sur la gestion des cookies, vous pouvez consulter le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-accent underline underline-offset-2">https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser</a>
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">6. Responsabilité</h2>
          <p class="mb-4">
            L'éditeur s'efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>
          <p class="mb-4">
            Toutes les informations présentées sur ce site sont données à titre indicatif, sont non exhaustives et sont susceptibles d'évoluer.
          </p>
          <p>
            L'éditeur ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site, résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">7. Liens externes</h2>
          <p class="mb-4">
            Le site peut contenir des liens hypertextes vers d'autres sites internet. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux pratiques de confidentialité de ces tiers.
          </p>
          <p>
            L'insertion de ces liens ne signifie pas que l'éditeur approuve les éléments contenus sur ces sites. L'utilisateur est invité à prendre connaissance des conditions d'utilisation et de la politique de confidentialité de chaque site externe visité.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">8. Contact</h2>
          <p class="mb-4">
            Pour toute question relative aux présentes mentions légales ou pour toute demande concernant le site, vous pouvez contacter l'éditeur :
          </p>
          <ul class="list-none space-y-1 ml-4">
            <li><strong>Par email :</strong> {{ config.public.contact.email }}</li>
            <li><strong>Par téléphone :</strong> {{ config.public.contact.phone }}</li>
            <li><strong>Par courrier :</strong> {{ config.public.contact.address.street }}, {{ config.public.contact.address.zip }} {{ config.public.contact.address.city }}</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold mb-4">9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <!-- Lien vers politique de confidentialité -->
        <section class="mt-12 pt-8 border-t border-stroke">
          <p class="text-sm">
            Voir également notre <NuxtLink to="/politique-confidentialite" class="text-primary hover:text-accent underline underline-offset-2">Politique de confidentialité</NuxtLink>.
          </p>
        </section>

        <p class="text-sm text-gray-500 mt-8">
          Dernière mise à jour : 31/01/2026
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
  title: 'Mentions légales',
  meta: [
    {
      name: 'description',
      content: 'Mentions légales du site portfolio de Marjolène Lasne, artiste peintre.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>

<style scoped>
.mentions-legales {
  @apply min-h-screen;
  background-color: var(--color-background);
  line-height: 1.7;
}

.mentions-legales h1 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
}

.mentions-legales h2 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
  font-weight: 400;
  border-bottom: 1px solid var(--color-stroke);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.mentions-legales h3 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
  font-weight: 400;
  margin-top: 1.5rem;
}

.mentions-legales p,
.mentions-legales li {
  color: var(--color-gray-text);
}

.mentions-legales a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.mentions-legales a:hover {
  color: var(--color-accent);
}

.mentions-legales strong {
  color: var(--color-gray-text);
  font-weight: 600;
}

.mentions-legales ul {
  color: var(--color-gray-text);
}
</style>
