<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GalleryItem;

class GalleryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleryItems = [
            [
                'title' => 'Rénovation Toiture Tuiles',
                'description' => 'Rénovation complète d\'une toiture en tuiles avec isolation thermique',
                'image' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
                'category' => 'Charpente',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Installation Zinc',
                'description' => 'Installation de zinguerie en zinc avec système d\'évacuation',
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
                'category' => 'Zinguerie',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Réparation Gouttières',
                'description' => 'Réparation et remplacement de gouttières endommagées',
                'image' => 'https://images.unsplash.com/photo-1581578731548-7f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Couverture',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Isolation Thermique',
                'description' => 'Isolation thermique de toiture avec matériaux performants',
                'image' => 'https://images.unsplash.com/photo-1581578731548-8f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Charpente',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Charpente Traditionnelle',
                'description' => 'Construction de charpente traditionnelle en bois massif',
                'image' => 'https://images.unsplash.com/photo-1581578731548-9f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Charpente',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Couverture Ardoise',
                'description' => 'Installation de couverture en ardoise naturelle',
                'image' => 'https://images.unsplash.com/photo-1581578731548-10f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Couverture',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Zinguerie Étanchéité',
                'description' => 'Travaux d\'étanchéité et zinguerie complète',
                'image' => 'https://images.unsplash.com/photo-1581578731548-11f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Zinguerie',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Rénovation Complète',
                'description' => 'Rénovation complète de toiture avec tous les travaux',
                'image' => 'https://images.unsplash.com/photo-1581578731548-12f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Couverture',
                'sort_order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Installation Velux',
                'description' => 'Installation de fenêtres de toit Velux',
                'image' => 'https://images.unsplash.com/photo-1581578731548-13f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Charpente',
                'sort_order' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Nettoyage Toiture',
                'description' => 'Nettoyage professionnel de toiture et traitement',
                'image' => 'https://images.unsplash.com/photo-1581578731548-14f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Couverture',
                'sort_order' => 10,
                'is_active' => true,
            ],
            [
                'title' => 'Réparation Fuite',
                'description' => 'Réparation urgente de fuite de toiture',
                'image' => 'https://images.unsplash.com/photo-1581578731548-15f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Couverture',
                'sort_order' => 11,
                'is_active' => true,
            ],
            [
                'title' => 'Isolation Combles',
                'description' => 'Isolation thermique des combles perdus',
                'image' => 'https://images.unsplash.com/photo-1581578731548-16f23fd1e3c6d?w=800&h=600&fit=crop',
                'category' => 'Charpente',
                'sort_order' => 12,
                'is_active' => true,
            ]
        ];

        foreach ($galleryItems as $item) {
            GalleryItem::create($item);
        }
    }
}
