<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'long_description',
        'slug',
        'category',
        'duration',
        'price_range',
        'features',
        'sub_services',
        'materials',
        'advantages',
        'image',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'features' => 'array',
        'sub_services' => 'array',
        'materials' => 'array',
        'advantages' => 'array',
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
} 