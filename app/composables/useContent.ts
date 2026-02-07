/**
 * Composable for fetching JSON content from /public/content/{locale}/
 * Automatically resolves the current locale via @nuxtjs/i18n
 * Works correctly during both SSR/SSG prerender and client-side navigation
 */

export function useContent<T>(filename: string) {
  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value || 'fr')

  return useAsyncData<T>(
    `content-${currentLocale.value}-${filename}`,
    async () => {
      const loc = currentLocale.value

      // During prerendering, we need to read the file from the filesystem
      if (import.meta.server) {
        const { readFile } = await import('node:fs/promises')
        const { resolve } = await import('node:path')
        
        try {
          // Read from the locale-specific public directory
          const filePath = resolve(process.cwd(), 'public', 'content', loc, filename)
          const content = await readFile(filePath, 'utf-8')
          return JSON.parse(content) as T
        } catch {
          // Fallback to default locale if translation file doesn't exist
          try {
            const fallbackPath = resolve(process.cwd(), 'public', 'content', 'fr', filename)
            const content = await readFile(fallbackPath, 'utf-8')
            return JSON.parse(content) as T
          } catch {
            return $fetch<T>(`/content/fr/${filename}`)
          }
        }
      }
      
      // Client-side: try locale-specific, fallback to fr
      try {
        return await $fetch<T>(`/content/${loc}/${filename}`)
      } catch {
        return await $fetch<T>(`/content/fr/${filename}`)
      }
    },
    {
      // Re-fetch when locale changes
      watch: [currentLocale],
      // Ensure data is transferred from server to client
      transform: (data) => data,
    }
  )
}
