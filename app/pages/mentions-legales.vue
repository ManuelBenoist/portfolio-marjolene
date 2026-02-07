<template>
  <div v-if="legal" class="max-w-[72rem] mx-auto px-6 py-12">
    <div class="mentions-legales">
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-3xl font-bold mb-8">{{ legal.title }}</h1>
        
        <p class="text-sm text-gray-600 mb-8">{{ legal.intro }}</p>

        <section v-for="(section, sIdx) in legal.sections" :key="sIdx" class="mb-8">
          <h2 class="text-xl font-semibold mb-4">{{ section.title }}</h2>
          
          <template v-for="(block, bIdx) in section.content" :key="bIdx">
            <!-- Paragraph -->
            <p v-if="block.type === 'paragraph'" :class="block.class || 'mb-4'" v-html="replacePlaceholders(block.text, block.link)" />

            <!-- List with label/value pairs -->
            <ul v-else-if="block.type === 'list' && block.style === 'none'" class="list-none space-y-1 ml-4">
              <li v-for="(item, iIdx) in block.items" :key="iIdx">
                <template v-if="item.label && item.link">
                  <strong>{{ item.label }} :</strong> <a :href="replacePlaceholdersText(item.value)" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-accent underline underline-offset-2">{{ replacePlaceholdersText(item.value) }}</a>
                </template>
                <template v-else-if="item.label">
                  <strong>{{ item.label }} :</strong> {{ replacePlaceholdersText(item.value) }}
                </template>
                <template v-else>
                  {{ replacePlaceholdersText(item.value) }}
                </template>
              </li>
            </ul>

            <!-- Bullet list -->
            <ul v-else-if="block.type === 'list' && block.style === 'disc'" class="list-disc ml-6 space-y-1 mb-4">
              <li v-for="(item, iIdx) in block.items" :key="iIdx">{{ item }}</li>
            </ul>

            <!-- Subsection -->
            <div v-else-if="block.type === 'subsection'">
              <h3 class="text-lg font-medium mb-2 mt-4">{{ block.title }}</h3>
              <p v-if="block.text" class="mb-4">{{ replacePlaceholdersText(block.text) }}</p>
              <template v-if="block.paragraphs">
                <p v-for="(para, pIdx) in block.paragraphs" :key="pIdx" class="mb-4">{{ para }}</p>
              </template>
              <ul v-if="block.list" class="list-disc ml-6 space-y-1 mb-4">
                <li v-for="(item, iIdx) in block.list" :key="iIdx">{{ item }}</li>
              </ul>
              <p v-if="block.footer" class="mb-4">{{ replacePlaceholdersText(block.footer) }}</p>
            </div>
          </template>
        </section>

        <!-- Privacy link -->
        <section class="mt-12 pt-8 border-t border-stroke">
          <p class="text-sm">
            {{ legal.privacyLink?.split('{link}')[0] }}<NuxtLink to="/politique-confidentialite" class="text-primary hover:text-accent underline underline-offset-2">{{ legal.privacyLinkText }}</NuxtLink>{{ legal.privacyLink?.split('{link}')[1] }}
          </p>
        </section>

        <p class="text-sm text-gray-500 mt-8">{{ legal.lastUpdated }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { data: legal } = await useContent<Record<string, any>>('legal.json')

const fullAddress = computed(() => {
  const addr = config.public.contact.address as any
  return `${addr.street}, ${addr.zip} ${addr.city}`
})

function replacePlaceholdersText(text: string): string {
  if (!text) return ''
  return text
    .replace(/\{address\}/g, fullAddress.value)
    .replace(/\{phone\}/g, config.public.contact.phone as string)
    .replace(/\{email\}/g, config.public.contact.email as string)
}

function replacePlaceholders(text: string, link?: { url: string; text: string }): string {
  let result = replacePlaceholdersText(text)
  if (link) {
    result = result.replace(
      `{cnilCookiesLink}`,
      `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-accent underline underline-offset-2">${link.text}</a>`
    )
  }
  return result
}

useHead({
  title: legal.value?.seo?.title || 'Mentions légales',
  meta: [
    {
      name: 'description',
      content: legal.value?.seo?.description || ''
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
