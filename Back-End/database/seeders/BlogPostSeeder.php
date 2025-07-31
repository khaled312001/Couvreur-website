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
            ]
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }
    }
} 