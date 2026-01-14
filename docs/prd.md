# REFONTE SITE MARJOLÈNE LASNE - Product Requirements Document (PRD)

**Date** : 13 janvier 2026  
**Version** : 1.0  
**Statut** : Approuvé - Prêt pour Phase de Développement  
**Timeline** : 3 semaines (Janvier-Février 2026)

---

## TABLE OF CONTENTS

1. [Goals & Background Context](#1-goals--background-context)
2. [Requirements](#2-requirements)
3. [User Interface Design Goals](#3-user-interface-design-goals)
4. [Technical Assumptions](#4-technical-assumptions)
5. [Epic List & Roadmap](#5-epic-list--roadmap)
6. [Success Criteria](#6-success-criteria)
7. [Constraints & Risks](#7-constraints--risks)
8. [Next Steps & Timeline](#8-next-steps--timeline)

---

## 1. GOALS & BACKGROUND CONTEXT

### 1.1 Goals

- ✅ Transformer une vitrine Wix vieillissante en site moderne, performant et professionnel
- ✅ Présenter de manière inspirante le portfolio artistique (peintures, foulards)
- ✅ Améliorer la crédibilité artistique et l'image de marque
- ✅ Faciliter les prises de contact pour acquisitions et commandes
- ✅ Optimiser pour SEO classique et LLM/IA
- ✅ Garantir une maintenabilité faible (mises à jour 1-3x/an)
- ✅ Préparer infrastructure pour évolution future vers CMS

### 1.2 Background Context

**Contexte actuel** :  
Le site marjolene-lasne.com fonctionne sur Wix depuis plusieurs années. Bien que le contenu soit riche (galeries, biographie, descriptions détaillées), le design vieillot et la navigation confuse donnent une impression amateur. Marjolène Lasne est peintre professionnelle avec portfolio diversifié (peintures abstraites, terrasses, marchés, foulards en soie). Les principales audiences sont touristes des gîtes locaux et amateurs d'art/collectionneurs.

**Pourquoi refonte** :  
La refonte adresse deux besoins critiques : (1) **Crédibilité** – un site moderne renforce la perception de qualité artistique, (2) **Accessibilité** – structure claire et SEO optimisée augmentent discoverabilité via moteurs et LLM.

**Contraintes clés** :
- Pas d'e-commerce (vitrine pur)
- Contenu rarement mis à jour (1-3x/an)
- Respect droits à l'image (suppression photos enfants)
- Support multilingue initial : FR/EN (autres langues post-launch)

### 1.3 Change Log

| Date | Version | Description | Auteur |
|------|---------|-------------|--------|
| 08 Jan 2026 | 1.0 | Création initiale PRD - Refonte site Marjolène Lasne | John (PM) |

---

## 2. REQUIREMENTS

### 2.1 Functional Requirements (FR)

**FR1** : Le site présente le portfolio artistique via galerie principale unique avec filtres thématiques (Paysages, Terrasses & Marchés, Scènes d'intérieur)

**FR2** : Chaque peinture/œuvre dispose d'une page détail (ou vue pop-up à définir Phase 1) avec image HD, description, dimensions, techniques utilisées et contexte

**FR3** : Section Foulards présente les designs avec page détail produit : image principale épurée + galerie photos variantes (tailles/textures) avec changement de visuels selon sélection, sans affichage de prix

**FR4** : Page "L'Artiste" contient sections scrollables : Biographie | CV/Expositions | Atelier | Collections privées

**FR5** : Navigation multilingue (FR, EN accessible sur toutes les pages) - langues supplémentaires (DE, ES, IT, NL, etc.) post-launch

**FR6** : Page Contact avec formulaire minimaliste de prise de contact et informations pour acquisitions/commandes

**FR7** : Images optimisées avec formats WebP + fallback JPEG ; lazy-loading implémenté pour améliorer performance

**FR8** : Fil d'Ariane (breadcrumb) de navigation pour situer utilisateur - approche à valider Phase 1

**FR9** : Footer enrichi avec liens réseaux sociaux, infos légales, sitemap

**FR9** : Page Accueil avec menu vertical : 
   -  Menu à gauche fixe avec image apparaissant à droite en hover

**FR11** : Données structurées (JSON-LD) pour optimisation LLM/IA et SEO

**FR12** : Restructurer et renommer URLs/pages actuelles pour clarté SEO (ex: `page2` → `peintures`) avec redirections 301 - carte transition créée fin Phase de Dev

### 2.2 Non-Functional Requirements (NFR)

**NFR1** : Core Web Vitals >= 90 (Lighthouse) - LCP < 2.5s, CLS < 0.1, FID < 100ms

**NFR2** : Temps de chargement page < 3s sur connexion 4G (mobile)

**NFR3** : Architecture statique (SSG Nuxt4) déployée sur GitHub Pages

**NFR4** : Contenu stocké en JSON statique (pas de base de données)

**NFR5** : Support responsive design pour mobile, tablette, desktop

**NFR6** : Conformité WCAG AA pour accessibilité web

**NFR7** : Compatibilité navigateurs : Chrome, Firefox, Safari, Edge (versions récentes)

**NFR8** : Processus de mise à jour de contenu simple (édition JSON + git push)

**NFR9** : Images au format WebP avec fallback JPEG pour navigateurs anciens

**NFR10** : Pas d'authentification, commentaires, panier ou backend

**NFR11** : Support SEO : meta tags, sitemap.xml, robots.txt, alt-text optimisés

**NFR12** : Respect RGPD : politique de confidentialité, gestion consentement cookies

**NFR13** : Mise à jour dépendances npm régulière (routine maintenance)

**NFR14** : Protection formulaire contact contre spam (CAPTCHA ou honeypot)

**NFR15** : Headers de sécurité standard (CSP, X-Frame-Options, etc.)

**NFR16** : Google Analytics 4 intégré avec suivi conversions (clics contact, demandes devis) - GRATUIT

**NFR17** : Dashboard analytics accessible pour monitoring post-launch (visites mensuelles, taux conversion, sources trafic)

**NFR18** : Politique de confidentialité détaillée expliquant collecte données Analytics + gestion consentement cookies

**NFR19** : Animations CSS/JS fluides mais simples – pas de complexité 3D/WebGL. Équipe dev débutante : priorité lisibilité + fluidité > complexité visuelle

**NFR20** : Gestion version + collaboration via Git/GitHub – tous changements tracés, branches feature, pull requests, historique commit clair

**NFR21** : Environnement dev local facilité (npm install, dev server) pour équipe distribuée

---

## 3. USER INTERFACE DESIGN GOALS

### 3.1 Overall UX Vision

Un site **professionnel et coloré** qui célèbre les œuvres artistiques de Marjolène sans verser dans l'amateur. Le design équilibre richesse visuelle (couleurs, imagerie) avec clarté et professionnalisme. L'expérience doit refléter l'identité d'artiste établie – pas sobre, mais structuré. Navigation fluide qui guide visitor de curiosité initiale vers prise de contact.

**Principes UX clés** :
- **Richesse visuelle équilibrée** : Couleurs des œuvres présentes mais tempérées par structure neutre
- **Professionalisme apparent** : Design moderne qui élève perception de la qualité artistique
- **Guidage clair** : Visitor sait toujours où il est et comment avancer
- **Appel à l'action explicite** : "Contactez pour acquérir" visible partout
- **Performance** : Chargement rapide = respect du temps visitor

### 3.2 Key Interaction Paradigms

1. **Menu Accueil (VERTICAL)** - inspiré Emma Fineman (https://www.emmafineman.com/work)
   - Menu vertical fixe à gauche + hover affiche image à droite (semi-écran)
   - Structure minimaliste et fluide
   - Visuels responsifs selon hover state

2. **Galerie Peintures - Filtrage thématique**
   - Galerie unique avec filtres par thème (Paysages, Terrasses & Marchés, Scènes Intérieur) et par technique
   - Grid responsive (3 colonnes desktop, 1-2 mobile)
   - Espacement suffisant entre tableaux pour respect visuel
   - Hover/click pour détail œuvre (pop-up)
   - Inspiration : Agent Pekka (filtrage centralisé)

3. **Galerie Foulards - Page détail produit**
   - Image principale épurée (carré central)
   - Galerie photos variantes (2-3 petites images sous)
   - Changement visuels selon sélection (couleur, texture, taille)
   - Inspiration : Charlot Paris (UI produit responsif)
   - Sans affichage de prix

4. **Formulaire contact minimaliste**
   - Champs essentiels (prénom, nom, email, message, type demande)
   - Validation simple, feedback clair
   - Intégration email Marjolène
   - Préremplissage intelligent selon provenance (ex: depuis page détail peinture)

5. **Multilingue sélecteur en header**
   - Sélecteur discret et accessible
   - Bascule fluide

### 3.3 Core Screens and Views (MVP - 6 pages)

**Ordre du menu** :

1. **Accueil** – Gateway avec menu vertical (Emma Fineman inspiré) : 3 approches design à évaluer
2. **L'Artiste** – Page unique avec sections scrollables : Biographie | CV/Expositions | Atelier | Collections privées
3. **Peintures** – Galerie unique avec filtres thématiques (Paysages, Terrasses & Marchés, Scènes Intérieur) + vue détail (pop-up ou page dédiée)
4. **Foulards** – Galerie avec pages détail produit : image principale + galerie photos variantes, changement visuel selon sélection, sans prix
5. **Autres activités** – Page simple listant stages, design textile, gîtes et chambres d'hotes, commandes et visites de l'atelier
6. **Contact** – Formulaire minimaliste + infos

et : 
- Mentions Légales / Politique Confidentialité
- Multilingue complet (DE, ES, IT, NL, etc.)

### 3.4 Accessibility

**Norme : WCAG AA**

- ✅ Contraste texte/fond >= 4.5:1
- ✅ Tous boutons/liens accessibles au clavier
- ✅ Alt-text descriptif pour toutes images
- ✅ Structure HTML sémantique (headings, nav, main, etc.)
- ✅ Pas de contenu flashy (animations < 3x/seconde)

### 3.5 Branding & Visual Identity

**Sites de référence identifiés** :

1. **Emma Fineman** (https://www.emmafineman.com/work)
   - Menu vertical avec visuels responsifs
   - Inspiration principale Accueil

2. **Larson Studio** (https://larsonstudio.com/)
   - Portfolio + design cohérent
   - Affichage galerie peintures intéressant

3. **Agent Pekka** (https://agentpekka.com/fr/artist/)
   - Galerie centralisée avec tri/filtrage par thème
   - Inspiration : Galerie Peintures

4. **Women Who Dared** (https://womenwhodared.com/collections/)
   - Segmentation galerie par sous-galeries

5. **Swindler & Swindler** (https://swindlerandswindler.fr/themes/illustration-animaliere)
   - Sous-pages par thème avec titre + description

6. **Galerie d'art - porte heureuse** (https://www.galerie-porteheureuse.com/fr/catalog-1/castan/evasion)
   - Inspiration pages détail œuvre : espacement tableaux, mise en scène

7. **Charlot paris** (https://www.charlot-paris.com/products/coque-burning-sand-cordon-elie-zebre)
   - Inspiration page détail Foulards : image épurée centrale + petites photos sous + changement visuels selon sélection 

**Palette de couleurs** et **Typographie** : voir fin du document (section 8.2 et 8.3)


### 3.6 Target Platforms

**Web Responsive (Desktop, Tablet, Mobile)**

Breakpoints :
- Desktop : >= 1024px
- Tablet : 768-1023px
- Mobile : < 768px

---

## 4. TECHNICAL ASSUMPTIONS

### 4.1 Repository Structure

**Monorepo** – Tout en un endroit pour simplicité équipe débutante.

```
marjolene-lasne/
├── src/
│   ├── pages/              # Pages Nuxt4
│   ├── components/         # Composants réutilisables
│   ├── layouts/            # Layouts
│   ├── assets/             # Styles, images statiques
│   └── utils/              # Fonctions utilitaires
├── content/
│   ├── peintures.json
│   ├── foulards.json
│   ├── expositions.json
│   ├── artiste.json
│   ├── contact.json
│   └── divers.json
├── public/                 # Images galeries
├── nuxt.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

### 4.2 Service Architecture

**Monolith Statique (SSG)**

- Site vitrine = pas microservices
- Nuxt4 SSG génère HTML statique pré-rendu
- GitHub Pages = pas de server backend
- Processus : Dev local → `npm run generate` → GitHub Actions → GitHub Pages automatique

### 4.3 Testing Requirements

**Unit + Integration (Basique)**

| Type | Tools | Scope |
|------|-------|-------|
| Unit Tests | Vitest + Vue Testing Library | Composants critiques |
| Integration | Manual + simple automation | Routes, JSON loading |
| Performance | Lighthouse CI | Core Web Vitals |
| Responsive | Manual testing | Desktop, tablet, mobile |
| Accessibility | axe-core (auto) + manual | WCAG AA |

### 4.4 Technical Stack

- ✅ Framework : Nuxt4 (Vue.js)
- ✅ Styling : TailwindCSS
- ✅ Hosting : GitHub Pages
- ✅ Repository : GitHub (Monorepo)
- ✅ Content : JSON statique
- ✅ Images : WebP + fallback JPEG, lazy-loading
- ✅ Analytics : Google Analytics 4 (GRATUIT) + consentement cookies
- ✅ Form handling : Formspree ou Netlify Forms
- ✅ Multilingue : vue-i18n ou nuxt-i18n
- ✅ SEO : nuxt-seo, sitemap, robots.txt, JSON-LD
- ✅ CI/CD : GitHub Actions → GitHub Pages

---

## 5. EPIC LIST & ROADMAP

### 5.1 4-Week Sprint Structure (MVP)

| Semaine | Focus | Livrables |
|---------|-------|-----------|
| **Sem 1** | Infrastructure + Design | Nuxt4 setup, CI/CD, Figma wireframes 5 pages |
| **Sem 2** | Design system + Pages skeleton | TailwindCSS tokens, components, pages structure |
| **Sem 3** | Features principales | Galeries, formulaire, contenu JSON |
| **Sem 4** | Finalisations + Launch | Optimisations, migration URLs, tests, déploiement |

### 5.2 Epic Breakdown

**Epic 1: Foundation & Infrastructure (Semaine 1)**
- Objective : Établir base projet Nuxt4, Git/CI-CD, déploiement automatisé GitHub Pages + canary page fonctionnelle
- Prerequisite : Aucun
- Duration : 3 jours
- Key Stories :
  1. Nuxt4 project setup + package.json
  2. GitHub repo configuration + branch protection
  3. GitHub Actions workflow pour build/deploy
  4. Canary page (hello world) déployée sur GitHub Pages

**Epic 2: Design System & Navigation (Semaine 1-2)**
- Objective : Créer composants réutilisables + design tokens TailwindCSS alignés palette Provence
- Prerequisite : Epic 1
- Duration : 5 jours
- Key Stories :
  1. Figma wireframes 5 pages MVP
  2. Palette couleurs finalisée (RGB/HEX)
  3. Typographie testée + validée
  4. TailwindCSS tokens setup (colors, fonts, spacing)
  5. Components Figma de base (buttons, cards, nav)
  6. Menu horizontal prototype (interactive)
  7. Header + Footer components implémentés

**Epic 3: Pages Principales - L'Artiste, Peintures, Foulards (Semaine 2-3)**
- Objective : Pages core avec galeries interactives + contenu intégré
- Prerequisite : Epic 1, 2
- Duration : 6 jours
- Key Stories :
  1. Accueil page avec menu vertical (3 approches design à valider)
  2. L'Artiste page structure (sections scrollables biographie/CV/atelier/collections)
  3. Peintures galerie unique avec filtres thématiques (Paysages/Terrasses/Scènes intérieur)
  4. Foulards page détail produit (image centrale + variantes photos, sans prix)
  5. Galerie interactions (hover, click, filtres, changement visuels)
  6. Intégration JSON contenu (peintures.json, foulards.json, artiste.json)

**Epic 4: Contact & Finalisations (Semaine 3)**
- Objective : Formulaire contact fonctionnel + pages finales
- Prerequisite : Epic 1, 2, 3
- Duration : 4 jours
- Key Stories :
  1. Contact page formulaire minimaliste
  2. Intégration Formspree/Netlify (email)
  3. Form validation + feedback UX
  4. Menu Accueil interactions validées (hover states)
  5. Navigation fluide toutes pages

**Epic 5: SEO, Performance & Analytics (Semaine 3-4)**
- Objective : Métadonnées SEO, optimisations performance, GA4 setup
- Prerequisite : Epic 3, 4
- Duration : 5 jours
- Key Stories :
  1. Meta tags (title, description, OG) toutes pages
  2. Sitemap.xml generation
  3. robots.txt + JSON-LD
  4. Image optimization (WebP, lazy-load)
  5. Google Analytics 4 integration + consentement cookies
  6. Core Web Vitals optimization
  7. Lighthouse testing + fixes

**Epic 6: Multilingue (FR/EN MVP) (Semaine 3-4)**
- Objective : Support FR/EN via i18n library
- Prerequisite : Epic 3, 4
- Duration : 3 jours
- Key Stories :
  1. vue-i18n setup + configuration
  2. Traductions FR/EN fichiers
  3. Language switcher component
  4. Routes/URLs support FR/EN
  5. Analytics support multilingue

**Epic 7: Testing, URL Migration & Launch (Semaine 4)**
- Objective : Tests finaux, migration URLs avec redirections 301, déploiement production
- Prerequisite : Epic 5, 6
- Duration : 5 jours
- Key Stories :
  1. Unit tests composants critiques
  2. Responsive testing (desktop, tablet, mobile)
  3. WCAG AA accessibility audit
  4. URL mapping document finalisé
  5. Redirections 301 implementation
  6. Production deployment + smoke tests
  7. Post-launch monitoring (GA4 setup validation)

---

## 6. SUCCESS CRITERIA

### 6.1 User Metrics

- ✅ **Taux de contact** : >= 2x augmentation clics "Contactez-nous" vs site Wix (GA4)
- ✅ **Taux rebond** : < 50% (vs ~70% estimé Wix)
- ✅ **Durée visite moyenne** : > 2 min (augmentation exploration)
- ✅ **Mobile trafic** : >= 40% (responsive validation)

### 6.2 Technical Metrics

- ✅ **Lighthouse score** : >= 90
- ✅ **Core Web Vitals** : LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ **Temps chargement** : < 3s (4G mobile)
- ✅ **Images optimisées** : 100% WebP avec fallback

### 6.3 SEO Metrics

- ✅ **URLs migrées** : Toutes avec redirections 301
- ✅ **Classement moteurs** : Maintien ou amélioration mots-clés historiques
- ✅ **Données structurées** : JSON-LD valide
- ✅ **Meta tags** : Toutes pages complètes

### 6.4 Experience Metrics

- ✅ **Portfolio présenté** : Toutes peintures/foulards visibles HD
- ✅ **Crédibilité perçue** : Design moderne élève perception qualité
- ✅ **Facilité contact** : Formulaire simple, taux remplissage > 50%
- ✅ **Maintenance simple** : Marjolène peut éditer JSON sans dev

---

## 7. CONSTRAINTS & RISKS

### 7.1 Constraints

| Contrainte | Impact | Mitigation |
|-----------|--------|-----------|
| **Timeline agressif 4 semaines** | Risque qualité | Scope MVP réduit (6 pages, FR/EN seulement) |
| **Équipe DIY design** | Risque qualité design | Templates Figma + sites ref, itérations rapides |
| **Dev débutante animations** | Animations simples uniquement | CSS only, pas WebGL/3D complexe |
| **Contenu photos non optimisé** | Perf dégradée | WebP optimization systématique dès Phase dev |
| **Feedback cycle court Marjolène** | Bloquant timeline | Validation design max 2-3 jours, scope freeze |

### 7.2 Major Risks

| Risque | Probabilité | Severité | Mitigation |
|--------|-------------|----------|-----------|
| **Design DIY dépasse timeline** | Moyenne | Haute | Start immédiat, templates prêts, buffer 2 jours |
| **Changements scope mid-project** | Moyenne | Haute | Scope lock après validation design (Sem 1 fin) |
| **Core Web Vitals non atteints** | Basse | Haute | Stratégie image optimization dès Phase 2 dev |
| **Formulaire contact dysfonctionnel** | Basse | Moyenne | Tester Formspree/Netlify tôt (Sem 2) |
| **Redirections 301 mal configurées** | Basse | Haute | Mapping URL complet avant migration, testing |

### 7.3 Key Assumptions

- ✅ Marjolène accès Figma pour validation design rapide (2-3 jours)
- ✅ Contenu photos HD disponible immédiatement
- ✅ Équipe dev fulltime 4 semaines
- ✅ Feedback cycle court possible
- ✅ Contenu JSON prêt Sem 2

---



## 8. Design specification
### 8.1 Figma Source of Truth

Design Reference:
- Figma File: [https://www.figma.com/design/pSlmKtrrUBURwj3zIH6md7/Site-Portfolio-Marjolene?t=oIMR3sLNaqgYasoV-0](https://www.figma.com/design/pSlmKtrrUBURwj3zIH6md7/Site-Portfolio-Marjolene?t=oIMR3sLNaqgYasoV-0)
- Final wireframes and design (in the project): docs\frames_figma
- main pages:
  - Home
  - L’Artiste
  - Peintures
  - Foulards
  - Autres activités
  - Contact

Breakpoints:
- Desktop: 1440px
- Tablet: 1024px
- Mobile: 390px

### 8.2 Page-by-Page Design Spec

#### 8.2.1 Home Page (Launding Page)

Desktop Figma Frame: /docs/frames_figma/Homepage.png
Desktop on hovers Figma Frames: 
- /docs/frames_figma/Homepage L'Artiste.png 
- /docs/frames_figma/Homepage Peintures.png
- /docs/frames_figma/Homepage Foulards.png
- /docs/frames_figma/Homepage Autres Activités.png
- /docs/frames_figma/Homepage Contact.png

Layout Desktop:
- page coupé en 2 verticalement
- gauche : menu horizontal centré avec 5 items (L'Artiste, Peintures, Foulards, Autres Activités, Contact) alignés à droite et logo au corner haut gauche
- droite : grande image qui change selon hover menu (5 images différentes)
- fond : #FBFAF6
- font color : #2E3D8B and #C94E54 on hover
- font family : Averia Serif Libre Light 64px for menu items

Interactions: 
- on hover menu item : change image droite avec animation élégante + change font color to #C94E54 + léger grow menu item
- on click menu item : navigate to corresponding page

Components: 
- Header component with logo and language switcher
- VerticalMenu 
- HoverImage
- LayoutFullScreen

#### 8.2.2 Page L'Artiste

Desktop Figma Frame: /docs/frames_figma/Page L'Artiste.png

Layout Desktop: 
- Header global avec logo + navigation horizontale

Titre principal centré :
- "L’Artiste"
- Sous-titre descriptif
- Ligne de séparation fine horizontale

Section 1 — Biographie

Layout :
- Titre section : `Biographie` (color : #C94E54)
- Grid 2 colonnes :
  - Colonne gauche : image portrait (Marjolène en train de peindre)
  - Colonne droite : texte biographique

Image :
- Ratio paysage
- Bordures arrondies (12px)
- Caption sous image

Texte :
- 3 paragraphes
- Alignement vertical centré

---

Section 2 — Parcours et formation (Timeline)

Layout :
- Titre section : `Parcours et formation`
- Grande année centrale (ex: 2007–2008)
- Liste d’expositions sous l’année / Salons / Prix
- Timeline horizontale interactive

Timeline :
- Points cliquables par année
- Année active mise en avant
- Flèches navigation gauche/droite

---

Section 3 — Atelier et lieu d’exposition

Layout :
- Grid 2 colonnes inversé
  - Gauche : texte
  - Droite : image atelier

Texte :
- Description atelier
- Informations pratiques
- Mention rendez-vous

Image :
- Photo atelier / galerie

---

Footer

Footer global avec :
- Présentation artiste
- Navigation
- Contact
- Réseaux sociaux
- Mentions légales



Interactions:
- Scroll fluide
- Apparition progressive des sections
- Hover léger sur images
- Timeline interactive

Components:
- PageHeader
- SectionTitle
- BiographySection
- Timeline
- TimelineItem
- AtelierSection
- ImageBlock
- TextBlock
- Footer

#### 8.2.3 Page Peintures

Desktop Figma Frame: /docs/frames_figma/Page Peintures.png

Layout Desktop:
- Header global
- Titre page : **Peintures**
- Description courte
- Filtres (collections et techniques)
- Ligne de séparation

Section Galerie Peintures
Layout :
- Grid responsive :
  - Desktop : 3 colonnes
  - Tablet : 2 colononnes
  - Mobile : 1 colonne
- Espacement suffisant entre items

Chaque carte Peinture :
- Image principale épurée 
- Titre de la peinture
- Technique de peinture
- Pas de prix affiché
- Taille de la peinture

Interactions:
- Hover carte
- Click carte :
  - Navigation vers page pop-up détail


Components:
- PaintingGrid
- PaintingCard
- FilterBar
- PageHeader
- SectionSeparator
- Page Footer

#### 8.2.4 Page PopUp Détail Peinture
Desktop Figma Frame: /docs/frames_figma/Page Pop Up detail peinture.png

Layout Desktop:
- Header global
- bouton retour navigation vers page Peintures
- Grid 2 colonnes :
  - Colonne gauche : 
   - Image principale épurée (grand format)
  - Colonne droite : Détails peinture
    - Titre
    - dimensions
    - technique
    - Description complète
    - Bouton "Contacter l'artiste" (CTA principal) avec texte "vous avez une question ?"
- navigation boutons précédent/suivant pour naviguer entre peintures avec flèches gauche/droite et titres peintures

Interactions:
- Click "Contacter l'artiste" → navigate to Contact page et pré-remplir formulaire
- Click bouton retour → navigate back to Peintures page
- Click previous/next → navigate to previous/next painting detail page

Components:
- Bouton Retour
- PaintingDetail
- ContactCTA
- PreviousNextNavigation
- ... 

#### 8.2.5 Page Foulards
Desktop Figma Frame: /docs/frames_figma/Page Foulards.png

Layout Desktop:
- Header global
- Titre page : **Foulards**
- Description courte
- Ligne de séparation

Section Galerie Foulards
Layout :
- Grid responsive :
  - Desktop : 3 colonnes
  - Tablet : 2 colononnes
  - Mobile : 1 colonne
- Espacement suffisant entre items

Chaque carte Foulard :
- Image principale épurée (carré)
- Titre du foulard
- Petite description
- Pas de prix affiché
- Couleurs : 3 à 4 pastilles (boutons intéractifs changeant l'image)
- Matière : Soie / Soie & Coton / Modal (boutons intéractifs changeant l'image)
- Tailles : 70x70 / 90x90 / 140x140 cm

Interactions:
- Hover carte
- Click carte :
  - Navigation vers page détail
- Click pastille couleur/matière :
  - Change image principale avec animation fluide

Components:
- ScarfGrid
- ScarfCard
- ColorSwatch
- MaterialBadge
- SizeList
- PageHeader
- SectionSeparator

#### 8.2.6 Page Détail Foulard
Desktop Figma Frame: /docs/frames_figma/Page détails Foulards.png

Layout Desktop:
- Header global
- bouton retour navigation vers page Foulards
- Grid 2 colonnes :
  - Colonne gauche : 
   - Image principale épurée (grand format)
   - Galerie photos variantes (2-3 petites images sous)
  - Colonne droite : Détails foulard
    - Titre
    - Description complète
    - Options couleur/matière/tailles (boutons interactifs)
    - Récapitulatif sélection (couleur, matière, taille)
    - Bouton "Contacter l'artiste" (CTA principal)
    - Léger séparateur 
    - Informations supplémentaires (entretien, inspiration)
   

Interactions:
- Click thumbnail → change image principale
- Click couleur/matière/tailles → update sélection + images
- Click "Contacter l'artiste" → navigate to Contact page et pré-remplir formulaire
- Click bouton retour → navigate back to Foulards page

Components:
- Bouton Retour
- ScarfGallery
- ThumbnailGallery
- ColorSelector
- MaterialSelector
- SizeSelector
- ContactCTA


#### 8.2.7 Page Autres Activités
Desktop Figma Frame: /docs/frames_figma/Page Autres activités.png

Layout Desktop:
TODO
Interactions:
TODO
Components:
TODO
#### 8.2.8 Page Contact
Desktop Figma Frame: /docs/frames_figma/Page Contact.png

Layout Desktop:
- Header global
- Titre page : **Contact**
- Description courte
- Ligne de séparation

- Grid 2 colonnes :
   - Colonne gauche : Informations Marjolene
     - Adresse email
     - Téléphone
     - Adresse postale
     - Plan Google Maps intégré
     - Réseaux sociaux (icônes cliquables)
   - Colonne droite : Formulaire contact
     - Champs : Nom et prénom (alignés), Email, Sujet (dropdown), Message (textarea)
     - Bouton "Envoyer" 

Interactions:
- Form validation (champs requis, email format)
- On submit → envoi formulaire via Formspree/Netlify + message de confirmation
- Clear form après envoi
- le form se pré-remplit si venant d'une page détail peinture/foulard

Components:
- ContactForm
- InputField
- TextArea
- SelectDropdown
- SubmitButton
- PageHeader
- SectionSeparator
- Footer

### 8.3 Design Tokens
#### Colors

- Background: #FBFAF6
- Primary Blue: #2E3D8B
- Accent Red: #C94E54
- Footer Blue: #2E3D8B
- Grey Text: #4A5565
- White Text: #FFFFFF
- Section background light: #C94E54 with 4% opacity
- tracé : #D1D5DC
- Footer text: #C9AA70

---

#### Typography

Heading:
- Font: Averia Serif Libre
- Weight: Light / Regular

Body:
- Font: Montserrat
- Weight: Regular

---

#### Spacing

- Base unit: 8px
- Section padding desktop: 96px
- Section padding mobile: 48px
- Grid gap: 32px

---

#### Border Radius

- Cards: 10px
- Buttons: 10px or 100px 


## 9. COMPONENT MAP

Global Components:
- AppLayout
- Header
- Footer
- LanguageSwitcher
- PageHeader
- SectionSeparator

UI Components:
- Button
- Badge
- Card
- Grid
- Modal
- Breadcrumb

Domain Components:
- VerticalMenu
- HoverImage
- ArtworkGrid
- ArtworkCard
- ArtworkModal
- Timeline
- TimelineItem
- ScarfGrid
- ScarfCard
- ScarfGallery
- ThumbnailGallery
- ColorSwatch
- MaterialBadge
- SizeSelector
- ContactForm

## 10. ROUTE MAP 
/                     → Home  
/artiste              → L’Artiste  
/peintures            → Galerie Peintures  
/peintures/:slug      → Détail peinture  
/foulards             → Galerie Foulards  
/foulards/:slug       → Détail foulard  
/autres-activites     → Autres activités  
/contact              → Contact  
/en/*                 → Routes anglaises


## SUMMARY

**Refonte site Marjolène Lasne – PRD Finalisé**

- **Scope MVP** : 5 pages, FR/EN, design DIY, 4 semaines
- **Tech** :  Nuxt4 SSG + GitHub Pages, JSON content
- **Success** : >= 90 Lighthouse, 2x contact rate, launch 09 Feb 2026
- **Team** : PM + Designer DIY + Dev (fulltime) + Marjolène feedback
- **Next** : Start Phase 1 design immediately (templates Figma + wireframes)

---

**Document approuvé** : 08 Jan 2026  
**Prêt pour Phase 1 Design & Phase 2 Dev**