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
import { withBaseImage } from '~/utils/withBaseImage'

const route = useRoute()
const { t, locale } = useI18n()
const { siteUrl, withSiteUrl } = useSiteUrl()

const canonicalUrl = computed(() => (siteUrl ? withSiteUrl(route.fullPath) : ''))

const structuredData = computed(() => {
  if (!siteUrl) return null

  const sdLocale = t('seo.structuredData.locale') || 'fr_FR'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: t('seo.structuredData.websiteName') || 'Marjolene Lasne',
        url: siteUrl,
        inLanguage: sdLocale,
        description: t('seo.structuredData.websiteDescription') || '',
        publisher: {
          '@type': 'Person',
          name: t('seo.structuredData.personName') || 'Marjolene Lasne',
          url: siteUrl,
        },
      },
      {
        '@type': 'Person',
        name: t('seo.structuredData.personName') || 'Marjolene Lasne',
        jobTitle: t('seo.structuredData.jobTitle') || 'Artiste peintre',
        url: siteUrl,
        image: withSiteUrl(withBaseImage('/logo.png')),
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
  const sdLocale = t('seo.structuredData.locale') || 'fr_FR'

  return {
    title: t('seo.global.title'),
    meta: [
      { name: 'description', content: t('seo.global.description') },
      { name: 'keywords', content: t('seo.global.keywords') },
      { property: 'og:url', content: canonical || undefined },
      { property: 'og:site_name', content: t('seo.structuredData.siteName') || 'Marjolene Lasne' },
      { property: 'og:locale', content: sdLocale },
    ].filter((entry) => Boolean(entry.content)),
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    script: structuredData.value
      ? [{ type: 'application/ld+json', children: JSON.stringify(structuredData.value) }]
      : [],
  }
})

// Show header/footer on all pages except landing page (which uses layout: false)
const localePath = useLocalePath()
const showHeaderFooter = computed(() => {
  const homePath = localePath('/')
  return route.path !== homePath && route.path !== '/'
})
</script>
