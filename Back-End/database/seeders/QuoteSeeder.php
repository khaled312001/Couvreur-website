<?php

namespace Database\Seeders;

use App\Models\Quote;
use Illuminate\Database\Seeder;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quotes = [
            [
                'name' => 'Jean Dupont',
                'email' => 'jean.dupont@email.com',
                'phone' => '+33 780326427',
                'address' => '123 Rue de la Paix, 75001 Paris',
                'service_type' => 'Charpente',
                'description' => 'Rénovation complète de la charpente d\'une maison ancienne. Travaux de renforcement et remplacement des éléments dégradés.',
                'urgency' => 'urgent',
                'status' => 'approved',
                'admin_notes' => 'Client très satisfait du devis. Travaux prévus pour le mois prochain.'
            ],
            [
                'name' => 'Marie Martin',
                'email' => 'marie.martin@email.com',
                'phone' => '06 98 76 54 32',
                'address' => '456 Avenue des Champs, 69000 Lyon',
                'service_type' => 'Couverture',
                'description' => 'Remplacement de la toiture en tuiles. Surface de 120m². Demande de devis pour matériaux et main d\'œuvre.',
                'urgency' => 'normal',
                'status' => 'approved',
                'admin_notes' => 'Devis accepté. Début des travaux dans 2 semaines.'
            ],
            [
                'name' => 'Pierre Durand',
                'email' => 'pierre.durand@email.com',
                'phone' => '06 11 22 33 44',
                'address' => '789 Boulevard Central, 13000 Marseille',
                'service_type' => 'Zinguerie',
                'description' => 'Installation de gouttières et descentes d\'eau. Maison de plain-pied avec garage.',
                'urgency' => 'urgent',
                'status' => 'approved',
                'admin_notes' => 'Urgent - fuites importantes. Intervention prévue cette semaine.'
            ],
            [
                'name' => 'Sophie Bernard',
                'email' => 'sophie.bernard@email.com',
                'phone' => '06 55 66 77 88',
                'address' => '321 Rue du Commerce, 44000 Nantes',
                'service_type' => 'Maintenance',
                'description' => 'Entretien annuel de la toiture. Vérification des tuiles et nettoyage des gouttières.',
                'urgency' => 'normal',
                'status' => 'pending',
                'admin_notes' => 'Devis en cours de préparation.'
            ],
            [
                'name' => 'Lucas Petit',
                'email' => 'lucas.petit@email.com',
                'phone' => '06 99 88 77 66',
                'address' => '654 Chemin des Oliviers, 06000 Nice',
                'service_type' => 'Installation',
                'description' => 'Installation d\'une nouvelle charpente pour extension. Surface de 80m².',
                'urgency' => 'normal',
                'status' => 'pending',
                'admin_notes' => 'Devis envoyé, en attente de réponse client.'
            ],
            [
                'name' => 'Emma Roux',
                'email' => 'emma.roux@email.com',
                'phone' => '06 44 33 22 11',
                'address' => '987 Avenue Victor Hugo, 31000 Toulouse',
                'service_type' => 'Réparation',
                'description' => 'Réparation d\'une fuite dans la toiture. Tuiles cassées à remplacer.',
                'urgency' => 'urgent',
                'status' => 'pending',
                'admin_notes' => 'Client contacté, rendez-vous prévu.'
            ],
            [
                'name' => 'Thomas Moreau',
                'email' => 'thomas.moreau@email.com',
                'phone' => '06 77 88 99 00',
                'address' => '147 Rue de la République, 21000 Dijon',
                'service_type' => 'Charpente',
                'description' => 'Construction d\'une charpente pour nouvelle maison. Plans fournis.',
                'urgency' => 'normal',
                'status' => 'approved',
                'admin_notes' => 'Projet validé. Début des travaux en septembre.'
            ],
            [
                'name' => 'Julie Leroy',
                'email' => 'julie.leroy@email.com',
                'phone' => '06 33 44 55 66',
                'address' => '258 Place du Marché, 35000 Rennes',
                'service_type' => 'Couverture',
                'description' => 'Rénovation complète toiture. Changement de tuiles et isolation.',
                'urgency' => 'normal',
                'status' => 'rejected',
                'admin_notes' => 'Client a choisi un autre prestataire.'
            ],
            [
                'name' => 'Nicolas Girard',
                'email' => 'nicolas.girard@email.com',
                'phone' => '06 22 33 44 55',
                'address' => '369 Rue des Fleurs, 59000 Lille',
                'service_type' => 'Zinguerie',
                'description' => 'Installation de chéneaux et descentes d\'eau. Bâtiment commercial.',
                'urgency' => 'urgent',
                'status' => 'approved',
                'admin_notes' => 'Projet commercial important. Travaux en cours.'
            ],
            [
                'name' => 'Camille Dubois',
                'email' => 'camille.dubois@email.com',
                'phone' => '06 88 99 00 11',
                'address' => '741 Avenue Jean Jaurès, 67000 Strasbourg',
                'service_type' => 'Maintenance',
                'description' => 'Contrat d\'entretien annuel pour copropriété. 5 bâtiments.',
                'urgency' => 'normal',
                'status' => 'pending',
                'admin_notes' => 'Devis en cours pour contrat d\'entretien.'
            ]
        ];

        foreach ($quotes as $quote) {
            Quote::create($quote);
        }
    }
} 