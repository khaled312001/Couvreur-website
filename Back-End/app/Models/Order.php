<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'client_name',
        'client_email',
        'client_phone',
        'service',
        'description',
        'priority',
        'status',
        'budget',
        'deadline',
        'address',
        'estimated_duration',
        'notes'
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'deadline' => 'date',
    ];

    // Accessor pour formater le budget
    public function getFormattedBudgetAttribute()
    {
        return number_format($this->budget, 2, ',', ' ') . ' €';
    }

    // Accessor pour obtenir le statut en français
    public function getStatusLabelAttribute()
    {
        $statuses = [
            'en_attente' => 'En attente',
            'en_cours' => 'En cours',
            'planifié' => 'Planifié',
            'terminé' => 'Terminé',
            'annulé' => 'Annulé'
        ];
        
        return $statuses[$this->status] ?? $this->status;
    }

    // Accessor pour obtenir la priorité en français
    public function getPriorityLabelAttribute()
    {
        $priorities = [
            'faible' => 'Faible',
            'normal' => 'Normal',
            'urgent' => 'Urgent'
        ];
        
        return $priorities[$this->priority] ?? $this->priority;
    }
}
