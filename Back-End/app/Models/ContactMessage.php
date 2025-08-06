<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'admin_response',
        'session_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

    public function getStatusTextAttribute()
    {
        return [
            'unread' => 'Non lu',
            'read' => 'Lu',
            'replied' => 'Répondu',
            'archived' => 'Archivé',
        ][$this->status] ?? $this->status;
    }
} 