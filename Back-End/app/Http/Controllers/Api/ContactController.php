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
    public function index(Request $request)
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        $response = response()->json($messages);
        return $this->addCorsHeaders($response, $request);
    }

    public function show(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);
        $response = response()->json($message);
        return $this->addCorsHeaders($response, $request);
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
        $response = response()->json([
            'message' => $message,
            'notification' => $notification
        ], 201);
        return $this->addCorsHeaders($response, $request);
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
        $response = response()->json($message);
        return $this->addCorsHeaders($response, $request);
    }

    public function destroy(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();
        $response = response()->json(['success' => true]);
        return $this->addCorsHeaders($response, $request);
    }

    public function byStatus(Request $request, $status)
    {
        $messages = ContactMessage::byStatus($status)->orderBy('created_at', 'desc')->get();
        $response = response()->json($messages);
        return $this->addCorsHeaders($response, $request);
    }

    public function unread(Request $request)
    {
        $messages = ContactMessage::unread()->orderBy('created_at', 'desc')->get();
        $response = response()->json($messages);
        return $this->addCorsHeaders($response, $request);
    }

    // User-specific methods
    public function userMessages(Request $request)
    {
        $user = $request->user();
        $messages = ContactMessage::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->get();
        
        $response = response()->json($messages);
        return $this->addCorsHeaders($response, $request);
    }

    public function userMessage(Request $request, $id)
    {
        $user = $request->user();
        $message = ContactMessage::where('id', $id)
            ->where('email', $user->email)
            ->firstOrFail();
        
        $response = response()->json($message);
        return $this->addCorsHeaders($response, $request);
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
        
        // Create notification for new contact message
        $notification = Notification::createContactNotification($message);
        
        // Send email notification
        $this->sendEmailNotification($message);

        $response = response()->json([
            'message' => $message,
            'notification' => $notification
        ], 201);
        return $this->addCorsHeaders($response, $request);
    }

    private function sendEmailNotification($contactMessage)
    {
        $adminEmail = 'support@bnbatiment.com';
        
        $emailData = [
            'name' => $contactMessage->name,
            'email' => $contactMessage->email,
            'userMessage' => $contactMessage->message,
            'subject' => $contactMessage->subject,
            'phone' => $contactMessage->phone,
            'admin_url' => url('/admin/contact')
        ];

        try {
            // Log before sending
            Log::info("Attempting to send email notification to $adminEmail for contact from {$contactMessage->name}");
            
            // Send email using Laravel's Mail facade
            Mail::send('emails.new_contact', $emailData, function ($mailMessage) use ($adminEmail, $contactMessage) {
                $mailMessage->to($adminEmail)
                        ->subject("Nouveau message de contact de {$contactMessage->name}")
                        ->from('support@bnbatiment.com', 'BN Bâtiment');
            });
            
            // Log success
            Log::info("✅ Email notification sent successfully to $adminEmail for contact from {$contactMessage->name}");
        } catch (\Exception $e) {
            // Log detailed error
            Log::error("❌ Failed to send email notification to $adminEmail");
            Log::error("Error Message: " . $e->getMessage());
            Log::error("Error Code: " . $e->getCode());
            Log::error("Error File: " . $e->getFile());
            Log::error("Error Line: " . $e->getLine());
            Log::error("Full Trace: " . $e->getTraceAsString());
        }
    }
} 