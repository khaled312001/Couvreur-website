<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeederSEO extends Seeder
{
    public function run(): void
    {
        BlogPost::truncate(); // Clear all posts
        
        $posts = [
            [
                'title' => 'Guide Complet Couvreur Professionnel Lyon - BN BÂTIMENT Expert Installation Réparation Entretien Toiture | www.bnbatiment.com',
                'content' => self::getMassiveContent(),
                'excerpt' => 'Guide complet couvreur professionnel Lyon avec BN BÂTIMENT. Expert installation, réparation, entretien toiture à Lyon, Saint-Étienne, Valence, Clermont-Ferrand. Devis gratuit sur www.bnbatiment.com',
                'author' => 'BN BÂTIMENT',
                'category' => 'Installation',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'slug' => 'guide-complet-couvreur-professionnel-lyon-bn-batiment-seo',
                'is_published' => true,
                'published_at' => now(),
                'readTime' => '35 min'
            ]
        ];

        foreach ($posts as $post) {
            try {
                BlogPost::create($post);
            } catch (\Exception $e) {
                continue;
            }
        }
    }
    
    private static function getMassiveContent(): string
    {
        return file_get_contents(__DIR__ . '/MASSIVE_SEO_CONTENT.txt');
    }
}

