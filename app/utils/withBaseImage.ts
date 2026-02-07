import { useRuntimeConfig } from '#app'

export function withBaseImage(path: string) {
  const normalizedPath = path.replace(/^\//, '')

  const fallbackBaseUrl = import.meta.env.BASE_URL || '/'

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.app.baseURL || fallbackBaseUrl
    return baseUrl + normalizedPath
  } catch {
    return fallbackBaseUrl + normalizedPath
  }
}
