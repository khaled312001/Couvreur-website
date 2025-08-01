<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Comment choisir le bon type de toiture',
                'content' => 'Guide complet pour choisir le type de toiture adapté à votre maison et votre budget. Découvrez les différents matériaux disponibles et leurs avantages respectifs.',
                'excerpt' => 'Découvrez les différents types de toitures et leurs avantages respectifs.',
                'author' => 'BN BUILDING',
                'category' => 'Conseils',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
                'slug' => 'comment-choisir-le-bon-type-de-toiture',
                'is_published' => true,
                'published_at' => now()->subDays(5)
            ],
            [
                'title' => 'L\'importance de l\'isolation thermique',
                'content' => 'L\'isolation thermique de votre toiture peut réduire significativement vos factures d\'énergie. Découvrez pourquoi c\'est essentiel pour votre confort et vos économies.',
                'excerpt' => 'Pourquoi l\'isolation thermique est essentielle pour votre confort et vos économies.',
                'author' => 'BN BUILDING',
                'category' => 'Isolation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
                'slug' => 'importance-isolation-thermique',
                'is_published' => true,
                'published_at' => now()->subDays(10)
            ],
            [
                'title' => 'Entretien préventif de votre toiture',
                'content' => 'Un entretien régulier de votre toiture prolonge sa durée de vie et évite les réparations coûteuses. Les bonnes pratiques pour maintenir votre toiture en excellent état.',
                'excerpt' => 'Les bonnes pratiques pour maintenir votre toiture en excellent état.',
                'author' => 'BN BUILDING',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
                'slug' => 'entretien-preventif-toiture',
                'is_published' => true,
                'published_at' => now()->subDays(15)
            ],
            [
                'title' => 'L\'importance de l\'entretien préventif',
                'content' => 'L\'entretien préventif de votre toiture est crucial pour éviter les problèmes coûteux. Découvrez pourquoi un entretien régulier peut vous faire économiser des milliers d\'euros à long terme.\n\nUn entretien préventif bien planifié permet de détecter les problèmes avant qu\'ils ne deviennent graves. Les inspections régulières, le nettoyage des gouttières et la vérification de l\'étanchéité sont des gestes simples qui préservent votre investissement.\n\nLes signes à surveiller incluent les tuiles cassées, les fuites d\'eau, la mousse sur le toit et les joints dégradés. Une intervention rapide peut éviter des dégâts plus importants.',
                'excerpt' => 'Découvrez pourquoi l\'entretien préventif est essentiel pour préserver votre toiture et éviter les réparations coûteuses.',
                'author' => 'BN BUILDING',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
                'slug' => 'importance-entretien-preventif',
                'is_published' => true,
                'published_at' => now()->subDays(20),
                'readTime' => '5 min'
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