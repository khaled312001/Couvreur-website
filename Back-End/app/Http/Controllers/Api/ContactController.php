<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);
        return response()->json($message);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        $message = ContactMessage::create($request->all());
        
        // Create notification for new contact message
        $notification = Notification::createContactNotification($message);
        
        // Send email notification
        $this->sendEmailNotification($message);
        
        // Return both message and notification for immediate update
        return response()->json([
            'message' => $message,
            'notification' => $notification
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'sometimes|string|max:255',
            'message' => 'sometimes|string',
            'status' => 'sometimes|in:unread,read,replied,archived',
            'admin_response' => 'nullable|string'
        ]);

        $message->update($request->all());
        return response()->json($message);
    }

    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();
        return response()->json(['success' => true]);
    }

    public function byStatus($status)
    {
        $messages = ContactMessage::byStatus($status)->orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    public function unread()
    {
        $messages = ContactMessage::unread()->orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    // User-specific methods
    public function userMessages(Request $request)
    {
        $user = $request->user();
        $messages = ContactMessage::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($messages);
    }

    public function userMessage(Request $request, $id)
    {
        $user = $request->user();
        $message = ContactMessage::where('id', $id)
            ->where('email', $user->email)
            ->firstOrFail();
        
        return response()->json($message);
    }

    public function storeWithUser(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'phone' => 'nullable|string|max:20',
        ]);

        $message = ContactMessage::create([
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $request->phone ?? $user->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'status' => 'unread'
        ]);

        return response()->json($message, 201);
    }

    private function sendEmailNotification($contactMessage)
    {
        $adminEmail = 'khaledahmedhaggay@gmail.com';
        
        $emailData = [
            'name' => $contactMessage->name,
            'email' => $contactMessage->email,
            'userMessage' => $contactMessage->message,
            'subject' => $contactMessage->subject,
            'phone' => $contactMessage->phone,
            'admin_url' => url('/admin/contact')
        ];

        try {
            // Send email using Laravel's Mail facade
            Mail::send('emails.new_contact', $emailData, function ($mailMessage) use ($adminEmail, $contactMessage) {
                $mailMessage->to($adminEmail)
                        ->subject("Nouveau message de contact de {$contactMessage->name}")
                        ->from('noreply@bnbatiment.com', 'BN Bâtiment');
            });
            
            // Log success
            Log::info("Email notification sent to $adminEmail for contact from {$contactMessage->name}");
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error("Failed to send email notification: " . $e->getMessage());
        }
    }
} 