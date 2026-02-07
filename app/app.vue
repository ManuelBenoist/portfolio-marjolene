<template>
  <div class="min-h-screen bg-background text-gray-text flex flex-col">
    <!-- Header: shown on all pages except landing page (layout: false) -->
    <Header v-if="showHeaderFooter" />
    
    <!-- Main content area -->
    <main class="flex-1 w-full" :class="{ 'flex flex-col': !showHeaderFooter }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    
    <!-- Footer: shown on all pages except landing page (layout: false) -->
    <Footer v-if="showHeaderFooter" />

    <!-- Cookie consent banner (RGPD) -->
    <CookieBanner />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const { siteUrl, withSiteUrl } = useSiteUrl()
const { data: common } = await useContent('common.json')

const canonicalUrl = computed(() => (siteUrl ? withSiteUrl(route.fullPath) : ''))

const sd = computed(() => common.value?.seo?.structuredData)

const structuredData = computed(() => {
  if (!siteUrl) return null

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: sd.value?.websiteName || 'Marjolene Lasne',
        url: siteUrl,
        inLanguage: sd.value?.locale || 'fr-FR',
        description: sd.value?.websiteDescription || '',
        publisher: {
          '@type': 'Person',
          name: sd.value?.personName || 'Marjolene Lasne',
          url: siteUrl,
        },
      },
      {
        '@type': 'Person',
        name: sd.value?.personName || 'Marjolene Lasne',
        jobTitle: sd.value?.jobTitle || 'Artiste peintre',
        url: siteUrl,
        image: withSiteUrl('/logo.png'),
        address: {
          '@type': 'PostalAddress',
          streetAddress: "11 place de l'Abbe Avon",
          postalCode: '84220',
          addressLocality: 'Roussillon',
          addressCountry: 'FR',
        },
        sameAs: [
          'https://www.instagram.com/unairdevacances_',
          'https://www.facebook.com/profile.php?id=100083185458797',
          'https://fr.linkedin.com/in/marjolene-lasne-075036a0',
        ],
      },
    ],
  }
})

useHead(() => {
  const canonical = canonicalUrl.value

  return {
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    meta: [
      { property: 'og:url', content: canonical || undefined },
      { property: 'og:site_name', content: sd.value?.siteName || 'Marjolene Lasne' },
      { property: 'og:locale', content: sd.value?.locale || 'fr_FR' },
    ].filter((entry) => Boolean(entry.content)),
    script: structuredData.value
      ? [{ type: 'application/ld+json', children: JSON.stringify(structuredData.value) }]
      : [],
  }
})

// Show header/footer on all pages except landing page (which uses layout: false)
const showHeaderFooter = computed(() => route.path !== '/')
</script>
