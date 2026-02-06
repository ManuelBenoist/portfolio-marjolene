export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const runtimeSiteUrl = (runtimeConfig.public.siteUrl || '').replace(/\/$/, '')

  const serverOrigin = import.meta.server ? useRequestURL().origin : ''
  const clientOrigin = import.meta.client ? window.location.origin : ''

  const siteUrl = runtimeSiteUrl || serverOrigin || clientOrigin

  const withSiteUrl = (path: string) => {
    if (!siteUrl) return path
    try {
      return new URL(path, siteUrl).toString()
    } catch {
      return path
    }
  }

  return {
    siteUrl,
    withSiteUrl,
  }
}
