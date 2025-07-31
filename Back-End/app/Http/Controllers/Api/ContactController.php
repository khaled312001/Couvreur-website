<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

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
        return response()->json($message, 201);
    }

    public function update(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'status' => 'required|in:unread,read,replied',
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
} 