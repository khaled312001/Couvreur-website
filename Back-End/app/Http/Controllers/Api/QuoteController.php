<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Models\Notification;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::orderBy('created_at', 'desc')->get();
        return response()->json($quotes);
    }

    public function show($id)
    {
        $quote = Quote::findOrFail($id);
        return response()->json($quote);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'service_type' => 'required|string',
            'description' => 'required|string',
            'urgency' => 'required|in:low,normal,high,urgent'
        ]);

        $quote = Quote::create($request->all());
        
        // Create notification for new quote
        Notification::createQuoteNotification($quote);
        
        return response()->json($quote, 201);
    }

    public function update(Request $request, $id)
    {
        $quote = Quote::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'service_type' => 'required|string',
            'description' => 'required|string',
            'urgency' => 'required|in:low,normal,high,urgent',
            'status' => 'required|in:pending,contacted,quoted,accepted,rejected',
            'admin_notes' => 'nullable|string'
        ]);

        $quote->update($request->all());
        return response()->json($quote);
    }

    public function destroy($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->delete();
        return response()->json(['success' => true]);
    }

    public function byStatus($status)
    {
        $quotes = Quote::byStatus($status)->orderBy('created_at', 'desc')->get();
        return response()->json($quotes);
    }

    public function byUrgency($urgency)
    {
        $quotes = Quote::byUrgency($urgency)->orderBy('created_at', 'desc')->get();
        return response()->json($quotes);
    }

    // User-specific methods
    public function userQuotes(Request $request)
    {
        $user = $request->user();
        $quotes = Quote::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($quotes);
    }

    public function userQuote(Request $request, $id)
    {
        $user = $request->user();
        $quote = Quote::where('id', $id)
            ->where('email', $user->email)
            ->firstOrFail();
        
        return response()->json($quote);
    }

    public function storeWithUser(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'service_type' => 'required|string',
            'description' => 'required|string',
            'urgency' => 'required|in:low,normal,high,urgent',
            'address' => 'required|string',
        ]);

        $quote = Quote::create([
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $request->address,
            'service_type' => $request->service_type,
            'description' => $request->description,
            'urgency' => $request->urgency,
            'status' => 'pending'
        ]);

        return response()->json($quote, 201);
    }
} 