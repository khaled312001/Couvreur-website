<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Marie Dubois',
                'location' => 'Lyon',
                'content' => 'Excellent service ! L\'équipe a été professionnelle du début à la fin. Notre nouvelle toiture est magnifique et l\'installation s\'est déroulée parfaitement.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Pierre Martin',
                'location' => 'Marseille',
                'content' => 'Intervention rapide et efficace pour réparer une fuite urgente. Prix honnêtes et travail de qualité. Je recommande vivement !',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Sophie Bernard',
                'location' => 'Toulouse',
                'content' => 'Service d\'entretien annuel impeccable. L\'équipe est ponctuelle, professionnelle et donne de bons conseils pour maintenir notre toiture.',
                'rating' => 5,
                'image' => null,
                'is_active' => true,
                'sort_order' => 3
            ]
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
} 