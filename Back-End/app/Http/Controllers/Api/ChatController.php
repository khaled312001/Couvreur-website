<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function getMessages($sessionId)
    {
        $messages = ChatMessage::where('session_id', $sessionId)
            ->orderBy('created_at', 'asc')
            ->get();
        
        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
            'sender_type' => 'required|in:user,admin',
            'sender_name' => 'required|string|max:255',
            'sender_email' => 'required|email',
            'message' => 'required|string'
        ]);

        $message = ChatMessage::create($request->all());

        // If this is the first user message, create a contact message
        if ($request->sender_type === 'user') {
            $existingContact = ContactMessage::where('session_id', $request->session_id)->first();
            
            if (!$existingContact) {
                ContactMessage::create([
                    'name' => $request->sender_name,
                    'email' => $request->sender_email,
                    'subject' => 'Chat Session - ' . $request->session_id,
                    'message' => $request->message,
                    'status' => 'unread',
                    'session_id' => $request->session_id
                ]);

                // Send email notification to admin
                $this->sendEmailNotification($request->sender_name, $request->sender_email, $request->message, $request->session_id);
            }
        }

        return response()->json($message, 201);
    }

    public function getSessions()
    {
        $sessions = ChatMessage::select('session_id')
            ->selectRaw('MAX(created_at) as last_message_at')
            ->selectRaw('COUNT(*) as message_count')
            ->groupBy('session_id')
            ->orderBy('last_message_at', 'desc')
            ->get();

        $sessionsWithDetails = $sessions->map(function ($session) {
            $lastMessage = ChatMessage::where('session_id', $session->session_id)
                ->orderBy('created_at', 'desc')
                ->first();

            $unreadCount = ChatMessage::where('session_id', $session->session_id)
                ->where('sender_type', 'user')
                ->whereNull('read_at')
                ->count();

            return [
                'session_id' => $session->session_id,
                'last_message_at' => $session->last_message_at,
                'message_count' => $session->message_count,
                'last_message' => $lastMessage->message,
                'sender_name' => $lastMessage->sender_name,
                'unread_count' => $unreadCount
            ];
        });

        return response()->json($sessionsWithDetails);
    }

    public function markAsRead($sessionId)
    {
        ChatMessage::where('session_id', $sessionId)
            ->where('sender_type', 'user')
            ->whereNull('read_at')
            ->update(['read_at' => now(), 'status' => 'read']);

        return response()->json(['success' => true]);
    }

    public function createSession(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'service' => 'nullable|string|max:255',
            'message' => 'required|string'
        ]);

        $sessionId = Str::uuid()->toString();

        // Create initial chat message
        ChatMessage::create([
            'session_id' => $sessionId,
            'sender_type' => 'user',
            'sender_name' => $request->name,
            'sender_email' => $request->email,
            'message' => $request->message,
            'status' => 'sent'
        ]);

        // Create contact message
        ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->service ? "Demande de devis - $request->service" : 'Nouvelle demande de contact',
            'message' => $request->message,
            'status' => 'unread',
            'session_id' => $sessionId
        ]);

        // Send email notification
        $this->sendEmailNotification($request->name, $request->email, $request->message, $sessionId);

        return response()->json([
            'session_id' => $sessionId,
            'message' => 'Session créée avec succès'
        ], 201);
    }

    private function sendEmailNotification($name, $email, $message, $sessionId)
    {
        $adminEmail = 'khaledahmedhaggay@gmail.com';
        
        $emailData = [
            'name' => $name,
            'email' => $email,
            'userMessage' => $message,
            'session_id' => $sessionId,
            'admin_url' => url('/admin/chat/' . $sessionId)
        ];

        try {
            // Send email using Laravel's Mail facade
            Mail::send('emails.new_contact', $emailData, function ($mailMessage) use ($adminEmail, $name) {
                $mailMessage->to($adminEmail)
                        ->subject("Nouveau message de contact de $name")
                        ->from('noreply@bnbatiment.com', 'BN Bâtiment');
            });
            
            // Log success
            Log::info("Email notification sent to $adminEmail for contact from $name");
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error("Failed to send email notification: " . $e->getMessage());
        }
    }
} 