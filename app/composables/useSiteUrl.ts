export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  const runtimeSiteUrl = (runtimeConfig.public.siteUrl || '').replace(/\/$/, '')

  const serverOrigin = import.meta.server ? useRequestURL().origin : ''
  const clientOrigin = import.meta.client ? window.location.origin : ''

  const siteUrl = runtimeSiteUrl || serverOrigin || clientOrigin

  const withSiteUrl = (path: string) => {
    if (!siteUrl) return path
    // Safe join without external dependencies
    const base = siteUrl.replace(/\/$/, '')
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${base}${cleanPath}`
  }

  return {
    siteUrl,
    withSiteUrl,
  }
}
