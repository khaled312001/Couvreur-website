<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'message',
        'type',
        'category',
        'related_id',
        'related_type',
        'is_read',
        'read_at'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'read_at' => 'datetime',
    ];

    // Scopes
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Methods
    public function markAsRead()
    {
        $this->update([
            'is_read' => true,
            'read_at' => now()
        ]);
    }

    public function markAsUnread()
    {
        $this->update([
            'is_read' => false,
            'read_at' => null
        ]);
    }

    // Static methods for creating notifications
    public static function createQuoteNotification($quote)
    {
        return self::create([
            'title' => 'Nouvelle demande de devis',
            'message' => "Une nouvelle demande de devis a été reçue de {$quote->name}",
            'type' => 'info',
            'category' => 'quotes',
            'related_id' => $quote->id,
            'related_type' => 'App\Models\Quote'
        ]);
    }

    public static function createContactNotification($contact)
    {
        return self::create([
            'title' => 'Nouveau message de contact',
            'message' => "Un nouveau message a été reçu de {$contact->name} - {$contact->subject}",
            'type' => 'info',
            'category' => 'contact',
            'related_id' => $contact->id,
            'related_type' => 'App\Models\ContactMessage'
        ]);
    }

    public static function createServiceNotification($service, $action = 'created')
    {
        $actions = [
            'created' => 'Nouveau service créé',
            'updated' => 'Service mis à jour',
            'deleted' => 'Service supprimé'
        ];

        return self::create([
            'title' => $actions[$action] ?? 'Mise à jour des services',
            'message' => "{$actions[$action]}: {$service->title}",
            'type' => $action === 'deleted' ? 'warning' : 'success',
            'category' => 'services',
            'related_id' => $service->id,
            'related_type' => 'App\Models\Service'
        ]);
    }

    public static function createBlogNotification($blog, $action = 'created')
    {
        $actions = [
            'created' => 'Nouvel article publié',
            'updated' => 'Article mis à jour',
            'deleted' => 'Article supprimé'
        ];

        return self::create([
            'title' => $actions[$action] ?? 'Mise à jour du blog',
            'message' => "{$actions[$action]}: {$blog->title}",
            'type' => $action === 'deleted' ? 'warning' : 'success',
            'category' => 'blog',
            'related_id' => $blog->id,
            'related_type' => 'App\Models\BlogPost'
        ]);
    }

    public static function createGalleryNotification($gallery, $action = 'created')
    {
        $actions = [
            'created' => 'Nouvelle image ajoutée',
            'updated' => 'Image mise à jour',
            'deleted' => 'Image supprimée'
        ];

        return self::create([
            'title' => $actions[$action] ?? 'Mise à jour de la galerie',
            'message' => "{$actions[$action]}: {$gallery->title}",
            'type' => $action === 'deleted' ? 'warning' : 'success',
            'category' => 'gallery',
            'related_id' => $gallery->id,
            'related_type' => 'App\Models\GalleryItem'
        ]);
    }

    public static function createTestimonialNotification($testimonial, $action = 'created')
    {
        $actions = [
            'created' => 'Nouveau témoignage reçu',
            'updated' => 'Témoignage mis à jour',
            'deleted' => 'Témoignage supprimé'
        ];

        return self::create([
            'title' => $actions[$action] ?? 'Mise à jour des témoignages',
            'message' => "{$actions[$action]}: {$testimonial->name}",
            'type' => $action === 'deleted' ? 'warning' : 'success',
            'category' => 'testimonials',
            'related_id' => $testimonial->id,
            'related_type' => 'App\Models\Testimonial'
        ]);
    }
}
