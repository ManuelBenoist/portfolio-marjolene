
# Portfolio Marjolène — Projet Nuxt 3

Ce projet est un portfolio pour l'artiste Marjolène, développé avec Nuxt 3, TypeScript et TailwindCSS. Il présente ses foulards, peintures, activités et informations personnelles dans une interface moderne et responsive.

## Fonctionnalités principales

- **Présentation des œuvres** :
	- Foulards (listing, détail, filtres par couleur/matière)
	- Peintures (listing, détail, catégories)
- **Section artiste** : biographie, frise chronologique, citations
- **Autres activités** : page dédiée
- **Contact** : bouton de contact
- **Navigation multilingue** (français/anglais)
- **Lightbox pour images**
- **Design responsive**

## Structure du projet

```
app/
	components/         # Composants Vue réutilisables (cards, filtres, lightbox, etc.)
	composables/        # Fonctions utilitaires (état galerie, contenu)
	pages/              # Pages Nuxt (artiste, foulards, peintures, contact, etc.)
	plugins/            # Plugins (scroll reveal)
	assets/css/         # Feuilles de style (main.css)
public/
	content/            # Données JSON (œuvres, artiste, frise, etc.)
	foulards/, peintures/ # Images des œuvres
	fonts/              # Polices personnalisées
```

## Installation

Installez les dépendances :

```bash
npm install
# ou
pnpm install
# ou
yarn install
# ou
bun install
```

## Lancement en développement

Lancez le serveur de développement sur `http://localhost:3000` :

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
# ou
bun run dev
```

## Build et prévisualisation production

Pour builder et prévisualiser :

```bash
npm run build && npm run preview
# ou
pnpm build && pnpm preview
# ou
yarn build && yarn preview
# ou
bun run build && bun run preview
```

## Déploiement

Consultez la [documentation Nuxt](https://nuxt.com/docs/getting-started/deployment) pour les instructions de déploiement.

## Données et contenu

Les contenus (œuvres, artiste, frise, etc.) sont stockés dans `public/content/*.json` et les images dans `public/foulards/` et `public/peintures/`.

## Personnalisation

- **Styles** : modifiez `app/assets/css/main.css` et `tailwind.config.js`.
- **Composants** : ajoutez ou modifiez les composants dans `app/components/`.
- **Pages** : ajoutez/modifiez les pages dans `app/pages/`.

---

Projet réalisé avec Nuxt 3, TypeScript, TailwindCSS.
