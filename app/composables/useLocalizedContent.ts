/**
 * Composable for fetching locale-aware content from JSON files
 * Content files should be named with locale suffix: content.fr.json, content.en.json
 */
export const useLocalizedContent = <T>(
  contentName: string,
  options?: { key?: string }
) => {
  const { locale } = useI18n()
  const key = options?.key || `${contentName}-${locale.value}`
  
  return useAsyncData<T>(
    key,
    () => $fetch<T>(`/content/${contentName}.${locale.value}.json`),
    {
      watch: [locale]
    }
  )
}
