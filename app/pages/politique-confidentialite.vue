<template>
  <div v-if="privacy" class="max-w-[72rem] mx-auto px-6 py-12">
    <div class="politique-confidentialite">
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-3xl font-bold mb-8">{{ privacy.title }}</h1>

        <!-- Disclaimer for translated versions -->
        <div v-if="privacy.disclaimer" class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          <p class="italic">{{ privacy.disclaimer }}</p>
        </div>
        
        <p class="text-sm text-gray-600 mb-8">{{ privacy.lastUpdated }}</p>

        <p class="mb-8">{{ privacy.intro }}</p>

        <section v-for="(section, sIdx) in privacy.sections" :key="sIdx" class="mb-8">
          <h2 class="text-xl font-semibold mb-4">{{ section.title }}</h2>
          
          <template v-for="(block, bIdx) in section.content" :key="bIdx">
            <!-- Paragraph -->
            <p v-if="block.type === 'paragraph'" :class="block.class || 'mb-4'">
              {{ replacePlaceholdersText(block.text) }}
            </p>

            <!-- List with label/value pairs (style: none) -->
            <ul v-else-if="block.type === 'list' && block.style === 'none'" class="list-none space-y-1 ml-4">
              <li v-for="(item, iIdx) in block.items" :key="iIdx">
                <template v-if="typeof item === 'object' && item.label">
                  <strong>{{ item.label }} :</strong> {{ replacePlaceholdersText(item.value) }}
                </template>
                <template v-else-if="typeof item === 'object'">
                  {{ replacePlaceholdersText(item.value) }}
                </template>
                <template v-else>
                  {{ item }}
                </template>
              </li>
            </ul>

            <!-- Bullet list (style: disc) -->
            <ul v-else-if="block.type === 'list' && block.style === 'disc'" class="list-disc ml-6 space-y-1 mb-4">
              <li v-for="(item, iIdx) in block.items" :key="iIdx">
                <template v-if="typeof item === 'object' && item.bold">
                  <strong>{{ item.bold }}</strong>{{ item.text }}
                </template>
                <template v-else>
                  {{ typeof item === 'string' ? item : item.value }}
                </template>
              </li>
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

        <!-- Legal link -->
        <section class="mt-12 pt-8 border-t border-stroke">
          <p class="text-sm text-gray-600">
            {{ privacy.legalLink?.split('{link}')[0] }}<NuxtLink :to="localePath('/mentions-legales')" class="text-primary hover:text-accent underline underline-offset-2">{{ privacy.legalLinkText }}</NuxtLink>{{ privacy.legalLink?.split('{link}')[1] }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const config = useRuntimeConfig()
const { data: privacy } = await useContent<Record<string, any>>('privacy.json')

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

useHead({
  title: privacy.value?.seo?.title || 'Politique de confidentialité',
  meta: [
    {
      name: 'description',
      content: privacy.value?.seo?.description || ''
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>


<style scoped>
.politique-confidentialite {
  @apply min-h-screen;
  background-color: var(--color-background);
  line-height: 1.7;
}

.politique-confidentialite h1 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
}

.politique-confidentialite h2 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
  font-weight: 400;
  border-bottom: 1px solid var(--color-stroke);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.politique-confidentialite h3 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
  font-weight: 400;
  margin-top: 1.5rem;
}

.politique-confidentialite h4 {
  color: var(--color-primary);
  font-family: "Averia Serif Libre", serif;
  font-weight: 400;
}

.politique-confidentialite p,
.politique-confidentialite li {
  color: var(--color-gray-text);
}

.politique-confidentialite a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.politique-confidentialite a:hover {
  color: var(--color-accent);
}

.politique-confidentialite strong {
  color: var(--color-gray-text);
  font-weight: 600;
}

.politique-confidentialite ul {
  color: var(--color-gray-text);
}

.politique-confidentialite table {
  font-size: 0.9rem;
  border-color: var(--color-stroke);
}

.politique-confidentialite table th {
  background-color: rgba(46, 61, 139, 0.05);
  color: var(--color-primary);
  font-weight: 600;
  border-color: var(--color-stroke);
}

.politique-confidentialite table td {
  color: var(--color-gray-text);
  border-color: var(--color-stroke);
}

.politique-confidentialite .border-l-4 {
  border-color: var(--color-stroke);
}

.politique-confidentialite .bg-gray-50 {
  background-color: rgba(46, 61, 139, 0.03);
}

@media (max-width: 640px) {
  .politique-confidentialite table {
    font-size: 0.8rem;
  }
  
  .politique-confidentialite table th,
  .politique-confidentialite table td {
    padding: 0.5rem;
  }
}
</style>
