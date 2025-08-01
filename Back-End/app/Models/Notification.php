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
            'title' => 'طلب عرض سعر جديد',
            'message' => "تم استلام طلب عرض سعر جديد من {$quote->name}",
            'type' => 'info',
            'category' => 'quotes',
            'related_id' => $quote->id,
            'related_type' => 'App\Models\Quote'
        ]);
    }

    public static function createContactNotification($contact)
    {
        return self::create([
            'title' => 'رسالة جديدة',
            'message' => "تم استلام رسالة جديدة من {$contact->name}",
            'type' => 'info',
            'category' => 'contact',
            'related_id' => $contact->id,
            'related_type' => 'App\Models\ContactMessage'
        ]);
    }

    public static function createServiceNotification($service, $action = 'created')
    {
        $actions = [
            'created' => 'تم إنشاء خدمة جديدة',
            'updated' => 'تم تحديث خدمة',
            'deleted' => 'تم حذف خدمة'
        ];

        return self::create([
            'title' => $actions[$action] ?? 'تحديث في الخدمات',
            'message' => "{$actions[$action]}: {$service->title}",
            'type' => $action === 'deleted' ? 'warning' : 'success',
            'category' => 'services',
            'related_id' => $service->id,
            'related_type' => 'App\Models\Service'
        ]);
    }
}
