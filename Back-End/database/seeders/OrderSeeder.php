<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = [
            [
                'client_name' => 'Jean Dupont',
                'client_email' => 'jean.dupont@email.com',
                'client_phone' => '+33 1 23 45 67 89',
                'service' => 'Installation de Toiture',
                'description' => 'Installation complète d\'une toiture en tuiles pour maison de 120m²',
                'priority' => 'urgent',
                'status' => 'en_cours',
                'budget' => 8500.00,
                'deadline' => '2025-02-15',
                'address' => '123 Rue de la Paix, 75001 Paris',
                'estimated_duration' => '2-3 semaines',
                'notes' => 'Client très exigeant sur la qualité des matériaux'
            ],
            [
                'client_name' => 'Marie Martin',
                'client_email' => 'marie.martin@email.com',
                'client_phone' => '+33 1 23 45 67 90',
                'service' => 'Réparation de Charpente',
                'description' => 'Réparation urgente de la charpente après tempête',
                'priority' => 'urgent',
                'status' => 'en_attente',
                'budget' => 3200.00,
                'deadline' => '2025-01-25',
                'address' => '456 Avenue des Champs, 75008 Paris',
                'estimated_duration' => '1 semaine',
                'notes' => 'Dégâts importants suite à la tempête de la semaine dernière'
            ],
            [
                'client_name' => 'Pierre Durand',
                'client_email' => 'pierre.durand@email.com',
                'client_phone' => '+33 1 23 45 67 91',
                'service' => 'Maintenance Annuelle',
                'description' => 'Maintenance préventive de la toiture et nettoyage des gouttières',
                'priority' => 'normal',
                'status' => 'planifié',
                'budget' => 1200.00,
                'deadline' => '2025-02-01',
                'address' => '789 Boulevard Saint-Germain, 75006 Paris',
                'estimated_duration' => '3-4 jours',
                'notes' => 'Maintenance annuelle programmée'
            ],
            [
                'client_name' => 'Sophie Bernard',
                'client_email' => 'sophie.bernard@email.com',
                'client_phone' => '+33 1 23 45 67 92',
                'service' => 'Installation Étanchéité',
                'description' => 'Installation d\'une membrane d\'étanchéité pour terrasse',
                'priority' => 'normal',
                'status' => 'terminé',
                'budget' => 4500.00,
                'deadline' => '2025-01-20',
                'address' => '321 Rue de Rivoli, 75001 Paris',
                'estimated_duration' => '1-2 semaines',
                'notes' => 'Travaux terminés avec satisfaction du client'
            ],
            [
                'client_name' => 'Lucas Moreau',
                'client_email' => 'lucas.moreau@email.com',
                'client_phone' => '+33 1 23 45 67 93',
                'service' => 'Zinguerie',
                'description' => 'Remplacement complet de la zinguerie et descentes d\'eau',
                'priority' => 'normal',
                'status' => 'en_attente',
                'budget' => 2800.00,
                'deadline' => '2025-02-10',
                'address' => '654 Rue du Commerce, 75015 Paris',
                'estimated_duration' => '1 semaine',
                'notes' => 'Zinguerie en mauvais état, remplacement urgent'
            ],
            [
                'client_name' => 'Emma Petit',
                'client_email' => 'emma.petit@email.com',
                'client_phone' => '+33 1 23 45 67 94',
                'service' => 'Démoussage',
                'description' => 'Nettoyage professionnel de la toiture et traitement anti-mousse',
                'priority' => 'faible',
                'status' => 'planifié',
                'budget' => 800.00,
                'deadline' => '2025-02-05',
                'address' => '987 Avenue de la République, 75011 Paris',
                'estimated_duration' => '1 jour',
                'notes' => 'Traitement anti-mousse recommandé'
            ],
            [
                'client_name' => 'Antoine Rousseau',
                'client_email' => 'antoine.rousseau@email.com',
                'client_phone' => '+33 1 23 45 67 95',
                'service' => 'Installation Velux',
                'description' => 'Installation de 3 fenêtres de toit Velux',
                'priority' => 'normal',
                'status' => 'en_cours',
                'budget' => 3600.00,
                'deadline' => '2025-01-30',
                'address' => '147 Rue de la Pompe, 75016 Paris',
                'estimated_duration' => '1 semaine',
                'notes' => 'Fenêtres commandées, installation en cours'
            ],
            [
                'client_name' => 'Camille Dubois',
                'client_email' => 'camille.dubois@email.com',
                'client_phone' => '+33 1 23 45 67 96',
                'service' => 'Isolation Thermique',
                'description' => 'Isolation thermique de la toiture avec laine minérale',
                'priority' => 'normal',
                'status' => 'en_attente',
                'budget' => 5200.00,
                'deadline' => '2025-02-20',
                'address' => '258 Rue du Faubourg Saint-Honoré, 75008 Paris',
                'estimated_duration' => '1-2 semaines',
                'notes' => 'Isolation pour améliorer l\'efficacité énergétique'
            ]
        ];

        foreach ($orders as $orderData) {
            Order::create($orderData);
        }
    }
}
