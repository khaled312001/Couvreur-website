<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing testimonials
        Testimonial::truncate();
        
        $testimonials = [
            [
                'name' => 'Jean-Luc Moreau',
                'location' => 'Lyon (69)',
                'content' => 'Intervention exceptionnelle ! L\'équipe a réparé notre fuite de toiture en urgence un dimanche. Travail impeccable et prix très correct. Je recommande vivement BN BÂTIMENT.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Isabelle Rousseau',
                'location' => 'Saint-Étienne (42)',
                'content' => 'Installation complète de notre nouvelle toiture. Devis respecté, délais tenus, finition parfaite. Une équipe professionnelle et à l\'écoute. Merci !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Michel Dubois',
                'location' => 'Valence (26)',
                'content' => 'Démoussage et nettoyage de notre toiture. Travail soigné, équipe ponctuelle et conseils précieux pour l\'entretien. Service de qualité !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Catherine Leroy',
                'location' => 'Grenoble (38)',
                'content' => 'Rénovation complète de notre charpente et couverture. Plus de 10 ans d\'expérience qui se ressentent ! Travail d\'artisan, résultat magnifique.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'François Petit',
                'location' => 'Chambéry (73)',
                'content' => 'Installation de gouttières en zinc. Travail de précision, matériaux de qualité. L\'équipe est disponible et réactive. Très satisfait !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 5
            ],
            [
                'name' => 'Marie-Claude Simon',
                'location' => 'Annecy (74)',
                'content' => 'Réparation d\'urgence suite à une tempête. Intervention sous 2h, diagnostic précis, réparation durable. Équipe de confiance !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 6
            ],
            [
                'name' => 'Robert Durand',
                'location' => 'Bourg-en-Bresse (01)',
                'content' => 'Isolation de nos combles perdus. Économies d\'énergie immédiates, travail propre et professionnel. Devis gratuit et respecté.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 7
            ],
            [
                'name' => 'Sylvie Martin',
                'location' => 'Vienne (38)',
                'content' => 'Remplacement de velux et fenêtres de toit. Installation parfaite, étanchéité garantie. Équipe expérimentée et consciencieuse.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 8
            ],
            [
                'name' => 'Philippe Girard',
                'location' => 'Romans-sur-Isère (26)',
                'content' => 'Entretien annuel de notre toiture. Service régulier, prévention efficace. L\'équipe connaît son métier et donne de bons conseils.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 9
            ],
            [
                'name' => 'Nathalie Fournier',
                'location' => 'Montélimar (26)',
                'content' => 'Installation d\'une nouvelle couverture en tuiles. Travail d\'artisan, respect des traditions. Résultat magnifique et durable.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 10
            ],
            [
                'name' => 'Alain Mercier',
                'location' => 'Aubenas (07)',
                'content' => 'Réparation de zinguerie et descentes d\'eau. Travail de précision, matériaux adaptés. Intervention rapide et efficace.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 11
            ],
            [
                'name' => 'Monique Blanc',
                'location' => 'Privas (07)',
                'content' => 'Désamiantage et rénovation complète. Travail délicat parfaitement réalisé. Équipe certifiée et professionnelle. Recommandé !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 12
            ]
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
} 