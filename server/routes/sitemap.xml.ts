import { defineEventHandler } from 'h3'
import { join } from 'path'
import { readFileSync } from 'fs'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl
  const routes = [
    '',
    '/artiste',
    '/peintures',
    '/foulards',
    '/autres-activites',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite'
  ]

  // Helper to get slugs
  const getJson = (filename) => {
    try {
      const path = join(process.cwd(), 'public/content/fr', filename)
      return JSON.parse(readFileSync(path, 'utf-8'))
    } catch (e) {
      console.error(`Error reading ${filename}`, e)
      return null
    }
  }

  // Peintures
  const peinturesData = getJson('peintures.json')
  if (peinturesData && peinturesData.collections) {
    Object.values(peinturesData.collections).forEach((collection: any) => {
      collection.forEach((p: any) => {
        if (p.slug) routes.push(`/peintures/${p.slug}`)
      })
    })
  }

  // Foulards
  const foulardsData = getJson('foulards.json')
  if (Array.isArray(foulardsData)) {
    foulardsData.forEach((f: any) => {
      if (f.slug) routes.push(`/foulards/${f.slug}`)
    })
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  routes.forEach(route => {
    xml += '  <url>\n'
    xml += `    <loc>${siteUrl}${route}</loc>\n`
    xml += '    <changefreq>monthly</changefreq>\n'
    xml += '  </url>\n'
  })

  xml += '</urlset>'

  event.node.res.setHeader('Content-Type', 'text/xml')
  return xml
})
