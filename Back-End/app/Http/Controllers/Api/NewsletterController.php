<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email invalide',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;

        try {
            // Check if email already exists
            $existingSubscription = NewsletterSubscription::where('email', $email)->first();

            if ($existingSubscription) {
                if ($existingSubscription->status === 'active') {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cet email est déjà inscrit à notre newsletter'
                    ], 400);
                } else {
                    // Reactivate subscription
                    $existingSubscription->update([
                        'status' => 'active',
                        'subscribed_at' => now(),
                        'unsubscribed_at' => null
                    ]);

                    return response()->json([
                        'success' => true,
                        'message' => 'Votre inscription à la newsletter a été réactivée avec succès !'
                    ]);
                }
            }

            // Create new subscription
            NewsletterSubscription::create([
                'email' => $email,
                'status' => 'active',
                'subscribed_at' => now()
            ]);

            Log::info('Newsletter subscription created', ['email' => $email]);

            return response()->json([
                'success' => true,
                'message' => 'Merci ! Vous êtes maintenant inscrit à notre newsletter'
            ], 201);

        } catch (\Exception $e) {
            Log::error('Newsletter subscription error', [
                'email' => $email,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
            ], 500);
        }
    }

    public function unsubscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email invalide',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;

        try {
            $subscription = NewsletterSubscription::where('email', $email)->first();

            if (!$subscription) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email non trouvé dans nos abonnements'
                ], 404);
            }

            $subscription->update([
                'status' => 'inactive',
                'unsubscribed_at' => now()
            ]);

            Log::info('Newsletter subscription unsubscribed', ['email' => $email]);

            return response()->json([
                'success' => true,
                'message' => 'Vous avez été désinscrit de notre newsletter avec succès'
            ]);

        } catch (\Exception $e) {
            Log::error('Newsletter unsubscription error', [
                'email' => $email,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la désinscription. Veuillez réessayer.'
            ], 500);
        }
    }

    public function index()
    {
        $subscriptions = NewsletterSubscription::orderBy('created_at', 'desc')->get();
        return response()->json($subscriptions);
    }

    public function show($id)
    {
        $subscription = NewsletterSubscription::findOrFail($id);
        return response()->json($subscription);
    }

    public function destroy($id)
    {
        $subscription = NewsletterSubscription::findOrFail($id);
        $subscription->delete();

        return response()->json([
            'success' => true,
            'message' => 'Abonnement supprimé avec succès'
        ]);
    }
} 