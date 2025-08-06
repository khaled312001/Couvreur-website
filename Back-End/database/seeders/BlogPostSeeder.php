<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing blog posts
        BlogPost::truncate();
        
        $posts = [
            [
                'title' => 'Installation de toiture Lyon : Guide complet 2024 - Couvreur professionnel Rhône-Alpes',
                'content' => 'L\'installation de toiture à Lyon et dans la région Rhône-Alpes nécessite une expertise particulière adaptée au climat local et aux spécificités architecturales de la région. Notre entreprise de couverture, spécialisée dans l\'installation de toitures à Lyon, Saint-Étienne, Valence et Clermont-Ferrand, vous accompagne dans tous vos projets de construction ou rénovation.\n\n## Pourquoi choisir un couvreur professionnel à Lyon ?\n\nLe climat lyonnais, avec ses hivers rigoureux et ses étés chauds, impose des contraintes spécifiques sur les matériaux de toiture. Notre expertise en installation de toiture à Lyon garantit une pose adaptée aux conditions météorologiques locales.\n\n### Services d\'installation de toiture disponibles :\n- **Tuiles mécaniques** : Durables et esthétiques\n- **Tuiles plates** : Style traditionnel français\n- **Ardoises naturelles** : Élégance et longévité\n- **Zinc** : Résistance et modernité\n- **Isolation thermique** : Performance énergétique optimale\n\n## Zones d\'intervention Rhône-Alpes :\n- Lyon et sa périphérie\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Avantages de notre installation de toiture :\n✅ Garantie décennale\n✅ Respect des normes françaises\n✅ Matériaux de qualité premium\n✅ Équipe certifiée et expérimentée\n✅ Devis gratuit et détaillé\n\nContactez-nous pour un devis d\'installation de toiture à Lyon et dans toute la région Rhône-Alpes.

**Pour en savoir plus sur les technologies modernes de couverture, consultez notre article détaillé sur Medium : [L\'Avenir de la Couverture Professionnelle](https://medium.com/@khaledahmedhaggagy/the-future-of-professional-roofing-how-technology-is-transforming-the-construction-industry-3a363875c365)',
                'excerpt' => 'Installation de toiture professionnelle à Lyon et Rhône-Alpes. Couvreur expert pour tous types de toitures : tuiles, ardoises, zinc. Devis gratuit.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'installation-toiture-lyon-couvreur-professionnel-rhone-alpes',
                'is_published' => true,
                'published_at' => now()->subDays(1),
                'readTime' => '12 min'
            ],
            [
                'title' => 'Réparation fuite toiture Saint-Étienne : Intervention d\'urgence 24h/24 - Couvreur Loire',
                'content' => 'Une fuite de toiture à Saint-Étienne peut causer des dégâts considérables à votre habitation. Notre équipe de couvreurs spécialisés en réparation de fuites intervient en urgence dans toute la Loire et les départements limitrophes.\n\n## Détection et diagnostic des fuites de toiture :\n\n### Causes fréquentes des fuites :\n- Tuiles cassées ou déplacées\n- Solins dégradés\n- Gouttières bouchées\n- Joints de dilatation défaillants\n- Points de pénétration mal étanchés\n\n### Techniques de diagnostic avancées :\n- **Caméra thermique** : Détection précise des points d\'infiltration\n- **Test d\'étanchéité** : Contrôle complet de la toiture\n- **Inspection par drone** : Vue d\'ensemble sans risque\n\n## Zones d\'intervention réparation fuite :\n- Saint-Étienne (42)\n- Lyon (69)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Services d\'urgence réparation fuite :\n✅ Intervention sous 24h\n✅ Diagnostic gratuit\n✅ Réparation durable\n✅ Garantie travaux\n✅ Équipe disponible 7j/7\n\n## Types de réparations réalisées :\n- Remplacement de tuiles\n- Réparation de solins\n- Étanchéité de points de pénétration\n- Réparation de gouttières\n- Traitement des infiltrations\n\nContactez-nous immédiatement pour toute fuite de toiture à Saint-Étienne et dans la Loire.

**Découvrez comment la technologie transforme la réparation de toiture dans notre article Medium : [L\'Avenir de la Couverture Professionnelle](https://medium.com/@khaledahmedhaggagy/the-future-of-professional-roofing-how-technology-is-transforming-the-construction-industry-3a363875c365)',
                'excerpt' => 'Réparation fuite toiture Saint-Étienne - Intervention d\'urgence 24h/24. Couvreur expert Loire, diagnostic gratuit, réparation durable.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Réparation',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'reparation-fuite-toiture-saint-etienne-urgence-couvreur-loire',
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'readTime' => '10 min'
            ],
            [
                'title' => 'Entretien toiture Valence : Démoussage et traitement hydrofuge Drôme - Couvreur professionnel',
                'content' => 'L\'entretien de toiture à Valence et dans la Drôme est essentiel pour préserver votre investissement immobilier. Notre expertise en entretien de toiture, démoussage et traitement hydrofuge vous garantit une protection optimale de votre toit.\n\n## Services d\'entretien de toiture complets :\n\n### Démoussage professionnel :\n- Élimination mécanique des mousses et lichens\n- Nettoyage respectueux des matériaux\n- Traitement anti-repousse\n- Protection contre les UV\n\n### Traitement hydrofuge :\n- Application de produits imperméabilisants\n- Protection contre les intempéries\n- Amélioration de l\'isolation\n- Prolongation de la durée de vie\n\n## Fréquence d\'entretien recommandée :\n- **Drôme** : Démoussage tous les 3-4 ans\n- **Zones humides** : Entretien tous les 2-3 ans\n- **Zones côtières** : Traitement tous les 2 ans\n- **Zones montagneuses** : Contrôle annuel\n\n## Zones d\'intervention entretien toiture :\n- Valence (26)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- Mirmande (26)\n- Montélimar (26)\n- Lyon (69)\n- Saint-Étienne (42)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- La Saulce (05)\n- Grenoble (38)\n\n## Avantages de l\'entretien régulier :\n✅ Prévention des fuites\n✅ Économies sur les réparations\n✅ Maintien de la valeur du bien\n✅ Amélioration de l\'isolation\n✅ Protection contre les dégâts\n\nContactez-nous pour un devis d\'entretien de toiture à Valence et dans la Drôme.

**Apprenez-en plus sur les solutions d\'entretien modernes dans notre article Medium : [L\'Avenir de la Couverture Professionnelle](https://medium.com/@khaledahmedhaggagy/the-future-of-professional-roofing-how-technology-is-transforming-the-construction-industry-3a363875c365)',
                'excerpt' => 'Entretien toiture Valence - Démoussage et traitement hydrofuge Drôme. Couvreur professionnel pour entretien toiture, devis gratuit.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'entretien-toiture-valence-demoussage-traitement-hydrofuge-drome',
                'is_published' => true,
                'published_at' => now()->subDays(3),
                'readTime' => '11 min'
            ],
            [
                'title' => 'Démoussage toiture Clermont-Ferrand : Traitement hydrofuge Puy-de-Dôme - Couvreur Auvergne',
                'content' => 'Le démoussage de toiture à Clermont-Ferrand et dans le Puy-de-Dôme est crucial pour maintenir l\'intégrité de votre toit. Notre expertise en démoussage et traitement hydrofuge vous assure une protection optimale contre les intempéries auvergnates.\n\n## Pourquoi le démoussage est essentiel en Auvergne :\n\nLe climat auvergnat, avec ses hivers rigoureux et ses étés chauds, favorise le développement de mousses et lichens sur les toitures. Ces végétaux retiennent l\'humidité et accélèrent la dégradation des matériaux.\n\n### Processus de démoussage professionnel :\n1. **Inspection préalable** : Évaluation de l\'état de la toiture\n2. **Nettoyage mécanique** : Élimination douce des mousses\n3. **Traitement anti-repousse** : Protection durable\n4. **Application hydrofuge** : Imperméabilisation complète\n5. **Contrôle qualité** : Vérification de l\'efficacité\n\n## Zones d\'intervention démoussage :\n- Clermont-Ferrand (63)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Avantages du démoussage professionnel :\n✅ Prévention des fuites\n✅ Amélioration de l\'isolation\n✅ Protection contre les dégâts\n✅ Économies à long terme\n✅ Maintien de la valeur du bien\n\nContactez-nous pour un devis de démoussage à Clermont-Ferrand.',
                'excerpt' => 'Démoussage toiture Clermont-Ferrand - Traitement hydrofuge Puy-de-Dôme. Couvreur Auvergne spécialisé démoussage, devis gratuit.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'demoussage-toiture-clermont-ferrand-traitement-hydrofuge-puy-de-dome',
                'is_published' => true,
                'published_at' => now()->subDays(4),
                'readTime' => '9 min'
            ],
            [
                'title' => 'Nettoyage toiture Francheville : Service professionnel Rhône - Couvreur expert',
                'content' => 'Le nettoyage de toiture à Francheville et dans le Rhône est un service essentiel pour maintenir l\'esthétique et la durabilité de votre toit. Notre équipe spécialisée en nettoyage de toiture vous propose des solutions adaptées à tous types de couvertures.\n\n## Services de nettoyage de toiture :\n\n### Nettoyage mécanique :\n- Élimination des débris végétaux\n- Nettoyage des gouttières\n- Désengorgement des descentes d\'eau\n- Nettoyage des tuiles\n\n### Nettoyage chimique :\n- Traitement anti-mousse\n- Nettoyage des taches\n- Décapage des salissures\n- Protection hydrofuge\n\n## Types de toitures nettoyées :\n- Tuiles mécaniques\n- Tuiles plates\n- Ardoises naturelles\n- Ardoises synthétiques\n- Zinc\n- Bac acier\n- Shingle\n\n## Zones d\'intervention nettoyage :\n- Francheville (69)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Avantages du nettoyage professionnel :\n✅ Amélioration de l\'esthétique\n✅ Prévention des dégâts\n✅ Optimisation de l\'isolation\n✅ Maintien de la valeur\n✅ Protection contre les intempéries\n\nContactez-nous pour un devis de nettoyage de toiture à Francheville.',
                'excerpt' => 'Nettoyage toiture Francheville - Service professionnel Rhône. Couvreur expert nettoyage toiture, devis gratuit, intervention rapide.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'nettoyage-toiture-francheville-service-professionnel-rhone',
                'is_published' => true,
                'published_at' => now()->subDays(5),
                'readTime' => '8 min'
            ],
            [
                'title' => 'Installation toiture Givors : Couvreur professionnel Rhône - Devis gratuit',
                'content' => 'L\'installation de toiture à Givors et dans le Rhône nécessite une expertise particulière. Notre équipe de couvreurs professionnels vous accompagne dans tous vos projets de construction ou rénovation de toiture.\n\n## Services d\'installation de toiture :\n\n### Types de couvertures installées :\n- **Tuiles mécaniques** : Durables et esthétiques\n- **Tuiles plates** : Style traditionnel français\n- **Ardoises naturelles** : Élégance et longévité\n- **Ardoises synthétiques** : Rapport qualité-prix optimal\n- **Zinc** : Modernité et résistance\n- **Bac acier** : Performance et durabilité\n\n### Services complémentaires :\n- Isolation thermique et phonique\n- Installation de gouttières\n- Pose de chéneaux\n- Installation de solins\n- Mise en place de points de pénétration\n\n## Zones d\'intervention installation :\n- Givors (69)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Garanties et assurances :\n✅ Garantie décennale\n✅ Assurance responsabilité civile\n✅ Respect des normes françaises\n✅ Matériaux de qualité premium\n✅ Équipe certifiée et expérimentée\n\nContactez-nous pour un devis gratuit d\'installation de toiture à Givors.',
                'excerpt' => 'Installation toiture Givors - Couvreur professionnel Rhône. Devis gratuit, garantie décennale, tous types de toitures.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'installation-toiture-givors-couvreur-professionnel-rhone-devis-gratuit',
                'is_published' => true,
                'published_at' => now()->subDays(6),
                'readTime' => '10 min'
            ],
            [
                'title' => 'Réparation toiture Vienne : Couvreur expert Isère - Intervention rapide',
                'content' => 'La réparation de toiture à Vienne et dans l\'Isère nécessite une intervention rapide et professionnelle. Notre équipe de couvreurs experts intervient pour tous types de réparations de toiture.\n\n## Services de réparation de toiture :\n\n### Réparations courantes :\n- Remplacement de tuiles cassées\n- Réparation de solins dégradés\n- Étanchéité de points de pénétration\n- Réparation de gouttières\n- Traitement des infiltrations\n- Réparation de chéneaux\n\n### Réparations spécialisées :\n- Réparation de fuites\n- Consolidation de charpente\n- Réparation d\'ardoises\n- Réparation de zinc\n- Réparation de bac acier\n\n## Zones d\'intervention réparation :\n- Vienne (38)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Le Pouzin (07)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Avantages de notre service :\n✅ Intervention rapide\n✅ Diagnostic gratuit\n✅ Réparation durable\n✅ Garantie travaux\n✅ Équipe disponible 7j/7\n✅ Devis détaillé\n\nContactez-nous pour toute réparation de toiture à Vienne.',
                'excerpt' => 'Réparation toiture Vienne - Couvreur expert Isère. Intervention rapide, diagnostic gratuit, réparation durable.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Réparation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'reparation-toiture-vienne-couvreur-expert-isere-intervention-rapide',
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'readTime' => '9 min'
            ],
            [
                'title' => 'Entretien toiture Le Pouzin : Démoussage Ardèche - Couvreur professionnel',
                'content' => 'L\'entretien de toiture au Pouzin et dans l\'Ardèche est essentiel pour préserver votre investissement immobilier. Notre expertise en entretien, démoussage et traitement hydrofuge vous garantit une protection optimale.\n\n## Services d\'entretien de toiture :\n\n### Démoussage professionnel :\n- Élimination mécanique des mousses\n- Nettoyage des lichens\n- Traitement anti-repousse\n- Protection contre les UV\n\n### Traitement hydrofuge :\n- Application de produits imperméabilisants\n- Protection contre les intempéries\n- Amélioration de l\'isolation\n- Prolongation de la durée de vie\n\n### Nettoyage de toiture :\n- Nettoyage des gouttières\n- Désengorgement des descentes\n- Nettoyage des tuiles\n- Élimination des débris\n\n## Zones d\'intervention entretien :\n- Le Pouzin (07)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Privas (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Fréquence d\'entretien recommandée :\n- **Ardèche** : Démoussage tous les 3-4 ans\n- **Zones humides** : Entretien tous les 2-3 ans\n- **Zones côtières** : Traitement tous les 2 ans\n- **Zones montagneuses** : Contrôle annuel\n\nContactez-nous pour un devis d\'entretien de toiture au Pouzin.',
                'excerpt' => 'Entretien toiture Le Pouzin - Démoussage Ardèche. Couvreur professionnel entretien toiture, devis gratuit.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'entretien-toiture-le-pouzin-demoussage-ardeche-couvreur-professionnel',
                'is_published' => true,
                'published_at' => now()->subDays(8),
                'readTime' => '8 min'
            ],
            [
                'title' => 'Installation toiture Privas : Couvreur expert Ardèche - Devis gratuit',
                'content' => 'L\'installation de toiture à Privas et dans l\'Ardèche nécessite une expertise adaptée au climat local. Notre équipe de couvreurs professionnels vous accompagne dans tous vos projets de construction ou rénovation.\n\n## Services d\'installation de toiture :\n\n### Types de couvertures installées :\n- **Tuiles mécaniques** : Durables et esthétiques\n- **Tuiles plates** : Style traditionnel français\n- **Ardoises naturelles** : Élégance et longévité\n- **Ardoises synthétiques** : Rapport qualité-prix optimal\n- **Zinc** : Modernité et résistance\n- **Bac acier** : Performance et durabilité\n\n### Services complémentaires :\n- Isolation thermique et phonique\n- Installation de gouttières\n- Pose de chéneaux\n- Installation de solins\n- Mise en place de points de pénétration\n\n## Zones d\'intervention installation :\n- Privas (07)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- La Voulte-sur-Rhône (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Garanties et assurances :\n✅ Garantie décennale\n✅ Assurance responsabilité civile\n✅ Respect des normes françaises\n✅ Matériaux de qualité premium\n✅ Équipe certifiée et expérimentée\n\nContactez-nous pour un devis gratuit d\'installation de toiture à Privas.',
                'excerpt' => 'Installation toiture Privas - Couvreur expert Ardèche. Devis gratuit, garantie décennale, tous types de toitures.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'installation-toiture-privas-couvreur-expert-ardeche-devis-gratuit',
                'is_published' => true,
                'published_at' => now()->subDays(9),
                'readTime' => '11 min'
            ],
            [
                'title' => 'Réparation fuite toiture La Voulte-sur-Rhône : Couvreur Ardèche - Intervention 24h',
                'content' => 'La réparation de fuite de toiture à La Voulte-sur-Rhône et dans l\'Ardèche nécessite une intervention rapide et professionnelle. Notre équipe de couvreurs experts intervient en urgence pour tous types de fuites.\n\n## Services de réparation de fuites :\n\n### Diagnostic des fuites :\n- Inspection par caméra thermique\n- Test d\'étanchéité\n- Identification précise des points d\'infiltration\n- Rapport détaillé des anomalies\n\n### Réparations réalisées :\n- Remplacement de tuiles cassées\n- Réparation de solins dégradés\n- Étanchéité de points de pénétration\n- Réparation de gouttières\n- Traitement des infiltrations\n- Réparation de chéneaux\n\n## Zones d\'intervention fuite :\n- La Voulte-sur-Rhône (07)\n- Lyon (69)\n- Saint-Étienne (42)\n- Valence (26)\n- Clermont-Ferrand (63)\n- Francheville (69)\n- Givors (69)\n- Vienne (38)\n- Le Pouzin (07)\n- Privas (07)\n- Crest (26)\n- Loriol-sur-Drôme (26)\n- Livron (26)\n- La Saulce (05)\n- Mirmande (26)\n- Montélimar (26)\n- Grenoble (38)\n\n## Avantages de notre service :\n✅ Intervention sous 24h\n✅ Diagnostic gratuit\n✅ Réparation durable\n✅ Garantie travaux\n✅ Équipe disponible 7j/7\n✅ Devis détaillé\n\nContactez-nous immédiatement pour toute fuite de toiture à La Voulte-sur-Rhône.',
                'excerpt' => 'Réparation fuite toiture La Voulte-sur-Rhône - Couvreur Ardèche. Intervention 24h, diagnostic gratuit, réparation durable.',
                'author' => 'BN BÂTIMENT',
                'category' => 'Réparation',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'reparation-fuite-toiture-la-voulte-sur-rhone-couvreur-ardeche-intervention-24h',
                'is_published' => true,
                'published_at' => now()->subDays(10),
                'readTime' => '10 min'
            ]
        ];

        foreach ($posts as $post) {
            // Check if slug already exists and add suffix if needed
            $originalSlug = $post['slug'];
            $counter = 1;
            while (BlogPost::where('slug', $post['slug'])->exists()) {
                $post['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
            BlogPost::create($post);
        }
    }
} 