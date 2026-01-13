#  REFONTE SITE MARJOLÈNE LASNE  Cadrage & Spécifications

**Date :** 8 janvier 2026  
**Statut :** Cadrage finalisé - Prêt pour Phase 1 (Design & Architecture)

---

##  RÉSUMÉ EXÉCUTIF

Refonte complète du site **marjolene-lasne.com** pour transformer une vitrine Wix vieillissante en site moderne, performant et SEO-optimisé. L'objectif : présenter de manière claire et inspirante le portfolio artistique de Marjolène Lasne tout en facilitant le contact pour les commandes et acquisitions. Site statique vitrine, sans e-commerce direct.

**Stack technique :** Nuxt3 + TailwindCSS + GitHub Pages  
**Maintenance :** Rarement mise à jour (1-3x/an), structure pensée pour évolution future vers CMS

---

##  PHASE 0  AUDIT & CADRAGE

### 0.1  Audit du site actuel (Wix)

#### Pages existantes
- Accueil (menu)
- L'artiste
- Peintures
- Foulards
- Design textile
- Stages
- Contactez-nous

#### Contenus présents : Analyse détaillée

| Section | À garder | À améliorer | À supprimer |
|---------|----------|------------|-----------|
| Accueil | Multilangue | Carrousel (taille/choix images); ajouter texte intro; animations | Sommaire redondant; bug panier/cart |
| L'artiste | Photo; biographie; atelier/expos | Hiérarchiser l'info; réduire texte; lisibilité | Trop de texte petit |
| Peintures | Galeries par thème | Présentation visuelle claire (galeries); descriptifs | Pas de visuels structurés |
| Foulards | Prix indicatifs; infos | Hiérarchiser; présenter élégamment | Trop d'infos; confusion |

#### UX / Expérience utilisateur

 **Points forts :**
- Contenu riche et pertinent
- Bonne description du processus créatif
- Informations détaillées sur les foulards
- Support multilingue (FR/EN)

 **Points faibles :**
- Design vieillot
- Navigation produits confuse
- Pas d'optimisation pour recherches LLM/IA
- Footer minimaliste
- Responsive design à moderniser

#### Design & Image perçue

**Mots-clés actuels :** Coloré | Amateur | Peu structuré

**Vision souhaitée :** Professionnel | Artistique | Épuré

---

### 0.2  Objectifs du NOUVEAU site

####  Question centrale : À quoi doit servir ce site ?

**But principal :**
- Vitrine artistique : présenter la diversité et qualité du travail

**Buts secondaires :**
- Favoriser prise de contact pour acquisitions/commandes
- Apporter crédibilité artistique
- Support de communication complet

####  Cibles du site (par ordre d'importance)

1. **Touristes des gîtes** (audience principale)
   - Visitent par curiosité lors de séjours locaux
   - Découvrent les activités et œuvres
   - Potentiellement acheteurs impulsifs

2. **Amateurs d'art / Acheteurs potentiels**
   - Recherchent œuvres ou inspiration
   - Considèrent acquisition ou commande

3. **Collectionneurs / Amateurs d'art prononcés**
   - Cherchent qualité + cv de l'artiste

---

### 0.3  Contenu & Structure (CMS-ready)

#### Clarifications finalisées

✅ **Design Textile** : Fusionné avec Peintures (pas de section distincte)  
✅ **Stages** : Non actifs – mention légère possible en page complémentaire  
✅ **Photos avec enfants** : À supprimer (respect droits à l'image)  
⏳ **Collections privées** : À vérifier auprès de Marjolène  
⏳ **Variantes foulards** : À vérifier auprès de Marjolène

#### Recommandation : JSON dès maintenant

 **Pourquoi JSON ?**
- Flexibilité future : Migration CMS headless sans refonte
- Maintenabilité : Format lisible pour dev
- SEO optimisé : Contrôle métadonnées
- LLM-ready : Données structurées = meilleur parsing
- Gestion versioning : GitHub-friendly

#### Structure de fichiers proposée

```
/content
  /peintures.json          # Galeries par thème + designs textiles intégrés
  /foulards.json           # Designs avec variantes (prix/tailles/textures)
  /expositions.json        # Expositions personnelles, salons, prix
  /artiste.json            # Biographie, atelier, credentials
  /contact.json            # Infos contact, localisation
  /divers.json             # Mention activités passées (stages, etc.)
```

---

### 0.4  Contraintes & Règles du projet

#### Contraintes techniques

 **Architecture**
- Site statique (Nuxt3 SSG)
- Hébergement : GitHub Pages
- Framework : Nuxt3
- Styling : TailwindCSS
- Pas de backend/authentification
- Contenu : JSON statique

 **À exclure**
- Pas de panier/e-commerce
- Pas de login
- Pas de base de données
- Pas de commentaires

#### Contraintes SEO (critique)

 **Impératif :**
- Garder URLs existantes (ou redirections 301)
- Conserver domaine marjolene-lasne.com
- Améliorer Core Web Vitals
- Images HD MAIS optimisées (WebP, lazy-load)

 **Stratégie SEO spécifique :**
- **Moteurs classiques** : Bonnes pratiques
- **Recommandations LLM/IA** : Données structurées, descriptions contextualisées
- **Mots-clés cibles pour LLM :**
  - "Peintures abstraites Provence France"
  - "Artiste peintre Provence"
  - "Foulards artisanaux soie sud de la France"
  - "Aquarelles Provence"
  - "Design textile français"

---

##  PHASE 1  Architecture UX/Design

### 1.1  Structure globale du site

```
Accueil (Gateway)
 Peintures (incl. designs textiles)
    Paysages
    Terrasses & Marchés
    Scènes d'intérieur
    Designs textiles
 Foulards
 L'Artiste
    Biographie
    Atelier Galerie
    Expositions/CV
    Collections privées
 Divers (mention activités passées)
 Contact
```

### 1.2  Navigation & UX Flow

**Idée inspirée Emma Fineman**

- **Arrivée sur site :** Menu vertical en colonne avec images de fond
- Au clic sur catégorie  Page thème, menu devient horizontal
- Breadcrumb pour situer utilisateur
- Footer enrichi

**À valider :** Cet effet UX est une idée à prototyper et tester

### 1.3  Palettes de couleurs & Design

**Esthétique cible :**
- Professionnel mais artistique
- Couleurs reflets des peintures
- Respect du travail artistique au premier plan

---

##  PHASE 2  Développement & Contenu

### 2.1  Stack de développement

| Outil | Utilisation |
|-------|-----------|
| **Nuxt3** | Framework, SSG |
| **TailwindCSS** | Styling responsive |
| **GitHub Pages** | Hosting |
| **JSON** | Contenu structuré |
| **Image optimization** | WebP, Lazy-load |

---

##  Points d'attention identifiés

### Sur le site actuel

 **Clarifications confirmées :**
1. ✅ **Design Textile** : Fusionné avec Peintures (sous-section)
2. ✅ **Stages** : Inactifs – mention légère possible page "Divers"
3. ✅ **Droit à l'image** : Supprimer photos avec enfants
4. ⏳ **Collections privées** : À vérifier auprès de Marjolène
5. ⏳ **Variantes foulards** : À vérifier auprès de Marjolène

### Pour le nouveau site

 **À implémenter :**
1. CTA explicite : "Contactez pour acquérir / vérifier disponibilité"
2. Breadcrumb + indication page active
3. Galeries visuelles claires (thèmes)
4. Footer enrichi
5. Images optimisées Web + IA (alt-text descriptif)
6. Données structurées (JSON-LD)
7. Mobile design aussi
8. Performance (Lighthouse  90)

---

##  Livrables attendus

### Phase 1 (Actuelle) 
- Cadrage finalisé
- Audit du site actuel
- Clarification objectifs & audiences
- Structure CMS préconisée

### Phase 2 (Prochaine)
- Wireframes/prototypes UX
- Architecture technique détaillée
- Spécifications de conception
- Plan de migration contenu

### Phase 3 (Développement)
- Intégration Nuxt3 + TailwindCSS
- Migration contenu JSON
- Optimisation images & SEO
- Tests (performance, responsive, A11y)
- Déploiement GitHub Pages

---

##  Résumé des décisions prises

| Décision | Justification |
|----------|-------------|
| **Design Textile intégré à Peintures** | Fusion pour clarté navigation; pas de section distincte |
| **Stages non mentionnés activement** | Activité terminée; mention optionnelle page "Divers" |
| **Suppression photos enfants** | Respect droits à l'image |
| **JSON structure dès maintenant** | Préparation future CMS + SEO/LLM |
| **Site vitrine pur (pas e-commerce)** | Maintenance simplifiée, focus présentation |
| **Clarté du contact** | CTA explicite pour chaque section |
| **Hiérarchie audiences** | Touristes gîtes en priorité, puis acheteurs |
| **Inspiration Emma Fineman** | À valider UX  idée à prototyper |
| **URLs conservées** | Continuité SEO + référencement |
| **Optimisation LLM** | Données structurées + descriptions |

---

**Document validé :** 8 janvier 2026  
**Statut :**  Prêt pour Phase 2 (Design & Architecture)
