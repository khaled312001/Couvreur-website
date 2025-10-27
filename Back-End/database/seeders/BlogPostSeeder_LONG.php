<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeederLong extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Guide Complet Installation Toiture Lyon 2024 - BN BÂTIMENT Expert Couvreur | www.bnbatiment.com',
                'content' => file_get_contents(__DIR__ . '/blog_content_article1.txt'),
                'excerpt' => 'Guide complet installation toiture Lyon avec BN BÂTIMENT expert couvreur. Services professionnels pour tous types de toitures. Devis gratuit sur www.bnbatiment.com',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'guide-complet-installation-toiture-lyon-2024-bn-batiment',
                'is_published' => true,
                'published_at' => now()->subDays(1),
                'readTime' => '25 min'
            ],
            [
                'title' => 'Réparation Fuite Toiture Urgence 24h/24 - Services BN BÂTIMENT Lyon, Saint-Étienne, Valence | www.bnbatiment.com',
                'content' => file_get_contents(__DIR__ . '/blog_content_article2.txt'),
                'excerpt' => 'Réparation fuite toiture 24h/24 avec BN BÂTIMENT. Intervention d\'urgence Lyon, Saint-Étienne, Valence. Diagnostic gratuit, réparation durable. www.bnbatiment.com',
                'author' => 'BN BÂTIMENT',
                'category' => 'Réparation',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'reparation-fuite-toiture-urgence-24h-bn-batiment',
                'is_published' => true,
                'published_at' => now()->subDays(2),
                'readTime' => '24 min'
            ],
            [
                'title' => 'Entretien Toiture Excellence - Démoussage et Traitement Hydrofuge BN BÂTIMENT | www.bnbatiment.com',
                'content' => file_get_contents(__DIR__ . '/blog_content_article3.txt'),
                'excerpt' => 'Entretien toiture professionnel avec BN BÂTIMENT. Démoussage, traitement hydrofuge, nettoyage pour Lyon, Saint-Étienne, Valence, Clermont-Ferrand. www.bnbatiment.com',
                'author' => 'BN BÂTIMENT',
                'category' => 'Entretien',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'entretien-toiture-excellence-demoussage-bn-batiment',
                'is_published' => true,
                'published_at' => now()->subDays(3),
                'readTime' => '26 min'
            ],
            [
                'title' => 'Couvreur Professionnel Lyon - Services BN BÂTIMENT Installation, Réparation, Entretien | www.bnbatiment.com',
                'content' => file_get_contents(__DIR__ . '/blog_content_article4.txt'),
                'excerpt' => 'Couvreur professionnel à Lyon avec BN BÂTIMENT. Services complets : installation, réparation, entretien toiture. Plus de 200 clients satisfaits. www.bnbatiment.com',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'couvreur-professionnel-lyon-services-bn-batiment',
                'is_published' => true,
                'published_at' => now()->subDays(4),
                'readTime' => '28 min'
            ]
        ];

        foreach ($posts as $post) {
            try {
                if (!isset($post['content']) || !file_exists(__DIR__ . '/' . basename($post['content']))) {
                    // If file doesn't exist, use default content
                    $post['content'] = 'Content not loaded from file';
                    continue;
                }
                BlogPost::create($post);
            } catch (\Exception $e) {
                continue;
            }
        }
    }
}

