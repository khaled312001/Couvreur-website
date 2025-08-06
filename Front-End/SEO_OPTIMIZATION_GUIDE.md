# Guide d'Optimisation SEO pour BN BÂTIMENT

## 🎯 Objectifs SEO

### 1. Visibilité sur les Moteurs de Recherche
- **Mots-clés principaux**: couvreur Lyon, installation toiture, réparation fuites
- **Mots-clés secondaires**: entretien toiture, démoussage, nettoyage toiture
- **Mots-clés géographiques**: Saint-Étienne, Valence, Clermont-Ferrand, Grenoble

### 2. Optimisation pour les Réseaux Sociaux
- **WhatsApp**: Image de prévisualisation optimisée
- **Facebook**: Open Graph tags complets
- **Twitter**: Twitter Cards optimisées
- **LinkedIn**: Métadonnées professionnelles

## 📊 Métadonnées Optimisées

### Balises Meta Principales
```html
<title>BN BÂTIMENT - Expert Couvreur Lyon Saint-Étienne Valence | Installation Réparation Entretien Toiture 24h/24</title>
<meta name="description" content="BN BÂTIMENT, expert couvreur à Lyon, Saint-Étienne, Valence, Clermont-Ferrand, Grenoble. Installation toiture, réparation fuites, entretien toiture, démoussage, nettoyage toiture. Intervention 24h/24, devis gratuit. Plus de 200 clients satisfaits. Certifié Qualibat, assurance décennale.">
```

### Open Graph Tags (Facebook, WhatsApp)
```html
<meta property="og:title" content="BN BÂTIMENT - Expert Couvreur Lyon">
<meta property="og:description" content="Installation, réparation, entretien de toiture. Intervention 24h/24.">
<meta property="og:image" content="https://bnbatiment.com/1.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://bnbatiment.com/">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="BN BÂTIMENT - Expert Couvreur Lyon">
<meta name="twitter:description" content="Installation, réparation, entretien de toiture. Intervention 24h/24.">
<meta name="twitter:image" content="https://bnbatiment.com/1.jpg">
<meta name="twitter:site" content="@bnbatiment">
```

## 🖼️ Optimisation des Images

### Images pour Réseaux Sociaux
- **Format recommandé**: JPG ou PNG
- **Dimensions optimales**: 1200x630 pixels
- **Taille maximale**: 5MB
- **Ratio**: 1.91:1 (Facebook/WhatsApp)

### Images pour WhatsApp
- **Format**: JPG
- **Dimensions**: 300x300 pixels minimum
- **Taille**: Moins de 300KB pour un chargement rapide

### Favicons et Icônes
- **favicon.ico**: 16x16, 32x32, 48x48 pixels
- **favicon-16x16.png**: 16x16 pixels
- **favicon-32x32.png**: 32x32 pixels
- **apple-touch-icon.png**: 180x180 pixels

## 📱 Optimisation Mobile

### Web App Manifest
```json
{
  "name": "BN BÂTIMENT - Expert Couvreur Lyon",
  "short_name": "BN BÂTIMENT",
  "description": "Expert en installation, réparation et entretien de toiture",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#3b82f6",
  "theme_color": "#3b82f6"
}
```

### Meta Tags Mobile
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="BN BÂTIMENT">
```

## 🏗️ Données Structurées (Schema.org)

### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BN BÂTIMENT",
  "description": "Expert en installation, réparation et entretien de toiture",
  "url": "https://bnbatiment.com",
  "telephone": ["+33420983917", "+33780326427"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lyon",
    "addressRegion": "Rhône-Alpes",
    "addressCountry": "FR"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200"
  }
}
```

### FAQ Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels services propose BN BÂTIMENT ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Installation de toiture, réparation des fuites, entretien de toiture, démoussage et traitement hydrofuge, nettoyage de toiture."
      }
    }
  ]
}
```

## 🔍 Optimisation des Mots-clés

### Mots-clés Principaux
- couvreur Lyon
- installation toiture Lyon
- réparation fuites toiture Lyon
- entretien toiture Lyon
- démoussage toiture Lyon
- nettoyage toiture Lyon

### Mots-clés Géographiques
- couvreur Saint-Étienne
- couvreur Valence
- couvreur Clermont-Ferrand
- couvreur Grenoble
- installation toiture Saint-Étienne
- réparation fuites toiture Saint-Étienne

### Mots-clés de Service
- charpente Lyon
- zinguerie Lyon
- gouttières Lyon
- isolation toiture Lyon
- étanchéité toiture Lyon
- ventilation toiture Lyon

### Mots-clés d'Urgence
- intervention d'urgence toiture
- réparation rapide fuite toiture
- couvreur urgence Lyon
- intervention 24h 24 toiture

## 📄 Structure des URLs

### URLs Optimisées
- `/` - Page d'accueil
- `/services` - Services généraux
- `/services/installation` - Installation de toiture
- `/services/repair` - Réparation de toiture
- `/services/maintenance` - Entretien de toiture
- `/services/cleaning` - Nettoyage de toiture
- `/services/zinguerie` - Zinguerie
- `/services/charpente` - Charpente
- `/contact` - Contact
- `/about` - À propos
- `/gallery` - Galerie
- `/blog` - Blog
- `/testimonials` - Témoignages
- `/areas` - Zones d'intervention
- `/pricing` - Tarifs

## 🚀 Performance SEO

### Vitesse de Chargement
- **Objectif**: < 3 secondes
- **Optimisation images**: WebP, compression
- **Lazy loading**: Images et vidéos
- **CDN**: Distribution géographique

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 📱 Optimisation WhatsApp

### Prévisualisation WhatsApp
- **Image**: 300x300 pixels minimum
- **Titre**: Court et accrocheur
- **Description**: 2-3 lignes maximum
- **URL**: Canonique et propre

### Exemple de Partage WhatsApp
```
🏠 BN BÂTIMENT - Expert Couvreur Lyon
📞 Installation, réparation, entretien de toiture
⚡ Intervention 24h/24 - Devis gratuit
🌐 https://bnbatiment.com
```

## 🔄 Maintenance SEO

### Tâches Mensuelles
- [ ] Vérifier les performances Google Search Console
- [ ] Analyser les mots-clés en hausse
- [ ] Mettre à jour le contenu
- [ ] Vérifier les liens cassés

### Tâches Trimestrielles
- [ ] Audit SEO complet
- [ ] Mise à jour des mots-clés
- [ ] Optimisation des images
- [ ] Vérification des données structurées

### Tâches Annuelles
- [ ] Refonte SEO si nécessaire
- [ ] Mise à jour du sitemap
- [ ] Audit de sécurité
- [ ] Optimisation mobile

## 📊 Outils de Suivi

### Google Search Console
- Performance des mots-clés
- Indexation des pages
- Erreurs de crawl
- Core Web Vitals

### Google Analytics
- Trafic organique
- Comportement utilisateur
- Conversions
- Pages populaires

### Outils Externes
- **SEMrush**: Analyse concurrentielle
- **Ahrefs**: Backlinks et mots-clés
- **Screaming Frog**: Audit technique
- **PageSpeed Insights**: Performance

## 🎯 Objectifs de Performance

### Trafic Organique
- **Objectif**: +20% par mois
- **Mots-clés**: Top 3 pour "couvreur Lyon"
- **Pages**: Top 10 pour services principaux

### Engagement
- **Temps sur site**: > 2 minutes
- **Taux de rebond**: < 40%
- **Pages par session**: > 3

### Conversions
- **Devis demandés**: +15% par mois
- **Appels téléphoniques**: +10% par mois
- **Contact form**: +20% par mois

## 📞 Contact SEO

Pour toute question concernant l'optimisation SEO :
- **Email**: contact@bnbatiment.com
- **Téléphone**: 07 80 32 64 27

---

*Dernière mise à jour : Décembre 2024* 