// scripts/generate-sitemap.cjs
const { writeFileSync, readFileSync } = require('fs');
const { join } = require('path');

const siteUrl = 'https://marjolene-lasne.com';

const mainRoutes = [
  '',
  '/artiste',
  '/peintures',
  '/foulards',
  '/autres-activites',
  '/contact'
];

const legalRoutes = [
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

// Collecte des routes dynamiques
let dynamicRoutes = [];

// Peintures
const peinturesData = getJson('peintures.json');
if (peinturesData && peinturesData.collections) {
  Object.values(peinturesData.collections).forEach(collection => {
    collection.forEach(p => {
      if (p.slug) dynamicRoutes.push(`/peintures/${p.slug}`);
    });
  });
}

// Foulards
const foulardsData = getJson('foulards.json');
if (Array.isArray(foulardsData)) {
  foulardsData.forEach(f => {
    if (f.slug) dynamicRoutes.push(`/foulards/${f.slug}`);
  });
}

// Fonction pour générer une URL XML
function urlEntry(loc, priority, changefreq = 'monthly') {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}

// Générer le XML complet
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Homepage
xml += urlEntry(`${siteUrl}/`, '1.0');

// Pages principales
mainRoutes.forEach(route => {
  if (route !== '') xml += urlEntry(`${siteUrl}${route}`, '0.9');
});

// Pages légales
legalRoutes.forEach(route => {
  xml += urlEntry(`${siteUrl}${route}`, '0.5');
});

// Pages individuelles
dynamicRoutes.forEach(route => {
  xml += urlEntry(`${siteUrl}${route}`, '0.8');
});

xml += '</urlset>';

// Écrire le fichier statique dans public/
writeFileSync('public/sitemap.xml', xml);
console.log('✅ sitemap.xml généré dans public/');
