<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'sender_type',
        'sender_name',
        'sender_email',
        'message',
        'status',
        'read_at'
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeBySession($query, $sessionId)
    {
        return $query->where('session_id', $sessionId);
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeFromUser($query)
    {
        return $query->where('sender_type', 'user');
    }

    public function scopeFromAdmin($query)
    {
        return $query->where('sender_type', 'admin');
    }

    public function markAsRead()
    {
        $this->update(['read_at' => now(), 'status' => 'read']);
    }

    public function isFromUser()
    {
        return $this->sender_type === 'user';
    }

    public function isFromAdmin()
    {
        return $this->sender_type === 'admin';
    }
} 