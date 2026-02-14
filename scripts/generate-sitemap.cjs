// scripts/generate-sitemap.cjs
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');

const siteUrl = 'https://marjolene-lasne.com';

const routes = [
  '',
  '/artiste',
  '/peintures',
  '/foulards',
  '/autres-activites',
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite'
];

// Helper pour lire les JSON et récupérer les slugs
function getJson(filename) {
  try {
    return JSON.parse(readFileSync(join('public/content/fr', filename), 'utf-8'));
  } catch (e) {
    return null;
  }
}

// Peintures
const peinturesData = getJson('peintures.json');
if (peinturesData && peinturesData.collections) {
  Object.values(peinturesData.collections).forEach(collection => {
    collection.forEach(p => {
      if (p.slug) routes.push(`/peintures/${p.slug}`);
    });
  });
}

// Foulards
const foulardsData = getJson('foulards.json');
if (Array.isArray(foulardsData)) {
  foulardsData.forEach(f => {
    if (f.slug) routes.push(`/foulards/${f.slug}`);
  });
}

// Générer le XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

routes.forEach(route => {
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}${route}</loc>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
  xml += `  </url>\n`;
});

xml += '</urlset>';

// Écrire le fichier statique dans public/
writeFileSync('public/sitemap.xml', xml);
console.log('✅ sitemap.xml généré dans public/');
