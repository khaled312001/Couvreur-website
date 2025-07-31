<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'service_type',
        'description',
        'urgency',
        'status',
        'admin_notes'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByUrgency($query, $urgency)
    {
        return $query->where('urgency', $urgency);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

    public function getStatusTextAttribute()
    {
        return [
            'pending' => 'En attente',
            'contacted' => 'Contacté',
            'quoted' => 'Devis fourni',
            'accepted' => 'Accepté',
            'rejected' => 'Refusé',
        ][$this->status] ?? $this->status;
    }

    public function getUrgencyTextAttribute()
    {
        return [
            'urgent' => 'Urgent',
            'high' => 'Élevée',
            'normal' => 'Normale',
            'low' => 'Faible',
        ][$this->urgency] ?? $this->urgency;
    }
} 