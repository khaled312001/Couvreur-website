<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Installation',
                'description' => 'Installation complète de toitures neuves',
                'long_description' => 'Installation complète de toitures pour constructions neuves. Nous prenons en charge l\'ensemble du projet, de la charpente à la couverture, en passant par la zinguerie.',
                'icon' => '🔨',
                'slug' => 'installation',
                'category' => 'Construction',
                'duration' => '3-12 semaines',
                'price_range' => 'À partir de 25 000€',
                'features' => [
                    'Installation complète de charpente',
                    'Pose de couverture',
                    'Installation de zinguerie',
                    'Isolation thermique',
                    'Fenêtres de toit',
                    'Finitions intérieures'
                ],
                'sub_services' => [
                    [
                        'name' => 'Installation Complète',
                        'description' => 'Charpente + Couverture + Zinguerie',
                        'price' => 'À partir de 25 000€',
                        'duration' => '6-12 semaines'
                    ],
                    [
                        'name' => 'Installation Partielle',
                        'description' => 'Couverture + Zinguerie',
                        'price' => 'À partir de 15 000€',
                        'duration' => '3-6 semaines'
                    ]
                ],
                'materials' => ['Bois', 'Tuiles', 'Zinc', 'Isolants', 'Accessoires'],
                'advantages' => [
                    'Installation complète',
                    'Coordination des corps d\'état',
                    'Respect des délais',
                    'Garantie décennale',
                    'Suivi de chantier',
                    'Réception des travaux'
                ],
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'title' => 'Réparation',
                'description' => 'Réparation et dépannage de toitures',
                'long_description' => 'Service de réparation et dépannage pour tous types de problèmes de toiture. Intervention rapide pour résoudre les fuites, les dégâts et les problèmes d\'étanchéité.',
                'icon' => '🔧',
                'slug' => 'reparation',
                'category' => 'Maintenance',
                'duration' => '1 jour - 1 semaine',
                'price_range' => 'À partir de 500€',
                'features' => [
                    'Réparation de fuites',
                    'Remplacement de tuiles',
                    'Réparation de gouttières',
                    'Raccordements d\'urgence',
                    'Diagnostic de problèmes',
                    'Intervention rapide'
                ],
                'sub_services' => [
                    [
                        'name' => 'Réparation d\'Urgence',
                        'description' => 'Intervention rapide pour fuites',
                        'price' => 'À partir de 500€',
                        'duration' => '1 jour'
                    ],
                    [
                        'name' => 'Réparation Standard',
                        'description' => 'Réparations programmées',
                        'price' => 'À partir de 1 000€',
                        'duration' => '2-5 jours'
                    ]
                ],
                'materials' => ['Tuiles de remplacement', 'Zinc', 'Mastics', 'Accessoires'],
                'advantages' => [
                    'Intervention d\'urgence',
                    'Diagnostic gratuit',
                    'Réparation garantie',
                    'Prix transparents',
                    'Équipe disponible',
                    'Service 7j/7'
                ],
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'Entretien',
                'description' => 'Entretien et maintenance préventive',
                'long_description' => 'Service de maintenance préventive pour prolonger la durée de vie de votre toiture. Inspections régulières, nettoyage et entretien pour éviter les problèmes futurs.',
                'icon' => '🛠️',
                'slug' => 'entretien',
                'category' => 'Entretien',
                'duration' => '1-3 jours',
                'price_range' => 'À partir de 300€',
                'features' => [
                    'Inspection annuelle',
                    'Nettoyage des gouttières',
                    'Vérification de l\'étanchéité',
                    'Entretien des accessoires',
                    'Rapport détaillé',
                    'Conseils personnalisés'
                ],
                'sub_services' => [
                    [
                        'name' => 'Entretien Annuel',
                        'description' => 'Inspection complète et nettoyage',
                        'price' => 'À partir de 300€',
                        'duration' => '1 jour'
                    ],
                    [
                        'name' => 'Entretien Bisannuel',
                        'description' => 'Entretien deux fois par an',
                        'price' => 'À partir de 500€',
                        'duration' => '2 jours'
                    ]
                ],
                'materials' => ['Produits de nettoyage', 'Accessoires de remplacement'],
                'advantages' => [
                    'Prévention des problèmes',
                    'Prolongation de la durée de vie',
                    'Économies à long terme',
                    'Tranquillité d\'esprit',
                    'Service personnalisé',
                    'Garantie de satisfaction'
                ],
                'image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'is_active' => true,
                'sort_order' => 3
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 