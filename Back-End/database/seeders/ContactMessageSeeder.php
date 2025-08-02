<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactMessage;

class ContactMessageSeeder extends Seeder
{
    public function run()
    {
        $messages = [
            [
                'name' => 'Jean Dupont',
                'email' => 'jean.dupont@example.com',
                'phone' => '01 23 45 67 89',
                'subject' => 'Demande de devis pour charpente',
                'message' => 'Bonjour, je souhaite obtenir un devis pour la construction d\'une charpente traditionnelle pour ma maison. Pouvez-vous me contacter ?',
                'status' => 'unread'
            ],
            [
                'name' => 'Marie Martin',
                'email' => 'marie.martin@example.com',
                'phone' => '06 12 34 56 78',
                'subject' => 'Réparation de toiture',
                'message' => 'J\'ai besoin d\'une réparation urgente de ma toiture suite aux dernières intempéries. Merci de me rappeler rapidement.',
                'status' => 'read'
            ],
            [
                'name' => 'Pierre Durand',
                'email' => 'pierre.durand@example.com',
                'phone' => '04 56 78 90 12',
                'subject' => 'Installation de zinguerie',
                'message' => 'Je recherche un professionnel pour l\'installation de zinguerie sur ma maison. Pouvez-vous me faire un devis ?',
                'status' => 'replied'
            ],
            [
                'name' => 'Sophie Bernard',
                'email' => 'sophie.bernard@example.com',
                'phone' => '02 34 56 78 90',
                'subject' => 'Maintenance préventive',
                'message' => 'Je souhaite mettre en place un contrat de maintenance préventive pour ma toiture. Quelles sont vos prestations ?',
                'status' => 'unread'
            ],
            [
                'name' => 'Lucas Petit',
                'email' => 'lucas.petit@example.com',
                'phone' => '03 45 67 89 01',
                'subject' => 'Rénovation complète',
                'message' => 'Bonjour, j\'envisage une rénovation complète de ma toiture. Pouvez-vous me proposer un rendez-vous pour une visite ?',
                'status' => 'read'
            ]
        ];

        foreach ($messages as $message) {
            ContactMessage::create($message);
        }
    }
} 