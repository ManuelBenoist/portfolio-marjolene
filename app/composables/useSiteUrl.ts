export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const runtimeSiteUrl = (runtimeConfig.public.siteUrl || '').replace(/\/$/, '')
  const appBaseUrl = runtimeConfig.app.baseURL || '/'
  const normalizedBaseUrl = appBaseUrl.endsWith('/') ? appBaseUrl : `${appBaseUrl}/`

  const serverOrigin = import.meta.server ? useRequestURL().origin : ''
  const clientOrigin = import.meta.client ? window.location.origin : ''

  const siteUrl = runtimeSiteUrl || serverOrigin || clientOrigin

  const withSiteUrl = (path: string) => {
    if (!siteUrl) return path

    const normalizedPath = path.startsWith('/')
      ? (normalizedBaseUrl !== '/' && !path.startsWith(normalizedBaseUrl)
          ? normalizedBaseUrl + path.replace(/^\//, '')
          : path)
      : path

    try {
      return new URL(normalizedPath, siteUrl).toString()
    } catch {
      return path
    }
  }

  return {
    siteUrl,
    withSiteUrl,
  }
}
