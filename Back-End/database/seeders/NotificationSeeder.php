<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = [
            [
                'title' => 'Nouvelle demande de devis',
                'message' => 'Une nouvelle demande de devis a été reçue de Jean Dupont pour des travaux de couverture.',
                'type' => 'info',
                'category' => 'quotes',
                'is_read' => false,
                'created_at' => Carbon::now()->subMinutes(5),
            ],
            [
                'title' => 'Nouveau message de contact',
                'message' => 'Un nouveau message a été reçu de Marie Martin concernant vos services.',
                'type' => 'info',
                'category' => 'contact',
                'is_read' => false,
                'created_at' => Carbon::now()->subMinutes(15),
            ],
            [
                'title' => 'Service mis à jour',
                'message' => 'Le service "Installation de couverture" a été mis à jour avec de nouvelles informations.',
                'type' => 'success',
                'category' => 'services',
                'is_read' => true,
                'created_at' => Carbon::now()->subHours(2),
            ],
            [
                'title' => 'Nouvel article publié',
                'message' => 'Un nouvel article "Les tendances de la couverture en 2024" a été publié sur le blog.',
                'type' => 'success',
                'category' => 'blog',
                'is_read' => false,
                'created_at' => Carbon::now()->subHours(4),
            ],
            [
                'title' => 'Nouveau témoignage reçu',
                'message' => 'Un nouveau témoignage a été reçu de Pierre Durand pour vos services de zinguerie.',
                'type' => 'success',
                'category' => 'testimonials',
                'is_read' => true,
                'created_at' => Carbon::now()->subHours(6),
            ],
            [
                'title' => 'Image ajoutée à la galerie',
                'message' => 'Une nouvelle image "Travaux de charpente" a été ajoutée à la galerie.',
                'type' => 'info',
                'category' => 'gallery',
                'is_read' => false,
                'created_at' => Carbon::now()->subHours(8),
            ],
            [
                'title' => 'Maintenance du système',
                'message' => 'Le système sera en maintenance demain de 2h à 4h du matin.',
                'type' => 'warning',
                'category' => 'system',
                'is_read' => false,
                'created_at' => Carbon::now()->subHours(12),
            ],
            [
                'title' => 'Erreur de sauvegarde',
                'message' => 'Une erreur est survenue lors de la sauvegarde automatique des données.',
                'type' => 'error',
                'category' => 'system',
                'is_read' => false,
                'created_at' => Carbon::now()->subHours(24),
            ],
        ];

        foreach ($notifications as $notification) {
            Notification::create($notification);
        }
    }
}
