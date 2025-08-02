<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    /**
     * Afficher tous les commandes
     */
    public function index(): JsonResponse
    {
        try {
            $orders = Order::orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $orders,
                'message' => 'Commandes récupérées avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des commandes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une commande spécifique
     */
    public function show($id): JsonResponse
    {
        try {
            $order = Order::find($id);
            
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande non trouvée'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $order,
                'message' => 'Commande récupérée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la commande: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle commande
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Debug: Log the incoming request data
            Log::info('Order creation request data:', $request->all());
            
            $validator = Validator::make($request->all(), [
                'client_name' => 'required|string|max:255',
                'client_email' => 'required|email|max:255',
                'client_phone' => 'required|string|max:20',
                'service' => 'required|string|max:255',
                'description' => 'required|string',
                'priority' => 'required|in:faible,normal,urgent',
                'status' => 'required|in:en_attente,en_cours,planifié,terminé,annulé',
                'budget' => 'required|numeric|min:0',
                'deadline' => 'required|date|after:today',
                'address' => 'required|string',
                'estimated_duration' => 'nullable|string|max:255',
                'notes' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $order = Order::create($request->all());
            
            return response()->json([
                'success' => true,
                'data' => $order,
                'message' => 'Commande créée avec succès'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la commande: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une commande
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $order = Order::find($id);
            
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande non trouvée'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'client_name' => 'sometimes|required|string|max:255',
                'client_email' => 'sometimes|required|email|max:255',
                'client_phone' => 'sometimes|required|string|max:20',
                'service' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'priority' => 'sometimes|required|in:faible,normal,urgent',
                'status' => 'sometimes|required|in:en_attente,en_cours,planifié,terminé,annulé',
                'budget' => 'sometimes|required|numeric|min:0',
                'deadline' => 'sometimes|required|date|after:today',
                'address' => 'sometimes|required|string',
                'estimated_duration' => 'nullable|string|max:255',
                'notes' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $order->update($request->all());
            
            return response()->json([
                'success' => true,
                'data' => $order,
                'message' => 'Commande mise à jour avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de la commande: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une commande
     */
    public function destroy($id): JsonResponse
    {
        try {
            $order = Order::find($id);
            
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande non trouvée'
                ], 404);
            }

            $order->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Commande supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la commande: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour le statut d'une commande
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        try {
            $order = Order::find($id);
            
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Commande non trouvée'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:en_attente,en_cours,planifié,terminé,annulé'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Statut invalide',
                    'errors' => $validator->errors()
                ], 422);
            }

            $order->update(['status' => $request->status]);
            
            return response()->json([
                'success' => true,
                'data' => $order,
                'message' => 'Statut de la commande mis à jour avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du statut: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir les statistiques des commandes
     */
    public function statistics(): JsonResponse
    {
        try {
            $total = Order::count();
            $enAttente = Order::where('status', 'en_attente')->count();
            $enCours = Order::where('status', 'en_cours')->count();
            $terminees = Order::where('status', 'terminé')->count();
            $urgentes = Order::where('priority', 'urgent')->count();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total' => $total,
                    'en_attente' => $enAttente,
                    'en_cours' => $enCours,
                    'terminees' => $terminees,
                    'urgentes' => $urgentes
                ],
                'message' => 'Statistiques récupérées avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques: ' . $e->getMessage()
            ], 500);
        }
    }
}
