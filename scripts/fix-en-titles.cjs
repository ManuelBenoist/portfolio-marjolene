/**
 * Fix EN content files: revert all painting titles and collection names,
 * and all scarf titles, back to their original French versions.
 */
const fs = require('fs')
const path = require('path')

// Fix peintures.json - revert collection names and painting titles to French
const enPeintures = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/content/en/peintures.json'), 'utf8'))
const frPeintures = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/content/fr/peintures.json'), 'utf8'))

// Build a slug->title map from FR
const frTitleMap = {}
for (const [collName, paintings] of Object.entries(frPeintures.collections)) {
  for (const p of paintings) {
    frTitleMap[p.slug] = p.title
  }
}

// Build collection name map from FR (ordered)
const frCollectionNames = Object.keys(frPeintures.collections)
const enCollectionNames = Object.keys(enPeintures.collections)

const newCollections = {}
for (let i = 0; i < enCollectionNames.length; i++) {
  const enCollName = enCollectionNames[i]
  const frCollName = frCollectionNames[i]
  const paintings = enPeintures.collections[enCollName].map(p => ({
    ...p,
    title: frTitleMap[p.slug] || p.title
  }))
  newCollections[frCollName] = paintings
}
enPeintures.collections = newCollections
fs.writeFileSync(
  path.join(__dirname, '../public/content/en/peintures.json'),
  JSON.stringify(enPeintures, null, 2) + '\n'
)
console.log('✓ Fixed EN peintures.json titles')

// Fix foulards.json - revert scarf titles to French
const enFoulards = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/content/en/foulards.json'), 'utf8'))
const frFoulards = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/content/fr/foulards.json'), 'utf8'))

const frFoulardTitleMap = {}
for (const f of frFoulards) {
  frFoulardTitleMap[f.slug] = f.title
}

for (const f of enFoulards) {
  if (frFoulardTitleMap[f.slug]) {
    f.title = frFoulardTitleMap[f.slug]
  }
}

fs.writeFileSync(
  path.join(__dirname, '../public/content/en/foulards.json'),
  JSON.stringify(enFoulards, null, 2) + '\n'
)
console.log('✓ Fixed EN foulards.json titles')
