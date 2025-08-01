<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $notifications = Notification::orderBy('created_at', 'desc')
                ->when($request->has('limit'), function($query) use ($request) {
                    return $query->limit($request->limit);
                })
                ->get();

            $unreadCount = Notification::where('is_read', false)->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'notifications' => $notifications,
                    'unread_count' => $unreadCount
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Notification index error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch notifications'], 500);
        }
    }

    public function show($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            return response()->json($notification);
        } catch (\Exception $e) {
            Log::error('Notification show error: ' . $e->getMessage());
            return response()->json(['error' => 'Notification not found'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'message' => 'required|string',
                'type' => 'required|string|in:info,warning,error,success',
                'is_read' => 'boolean'
            ]);

            $notification = Notification::create($request->all());
            return response()->json($notification, 201);
        } catch (\Exception $e) {
            Log::error('Notification store error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create notification'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $notification = Notification::findOrFail($id);

            $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'message' => 'sometimes|required|string',
                'type' => 'sometimes|required|string|in:info,warning,error,success',
                'is_read' => 'sometimes|boolean'
            ]);

            $notification->update($request->all());
            return response()->json($notification);
        } catch (\Exception $e) {
            Log::error('Notification update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update notification'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            $notification->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Notification destroy error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete notification'], 500);
        }
    }

    public function markAsRead($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            $notification->update(['is_read' => true]);
            return response()->json($notification);
        } catch (\Exception $e) {
            Log::error('Notification mark as read error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to mark notification as read'], 500);
        }
    }

    public function markAllAsRead()
    {
        try {
            Notification::where('is_read', false)->update(['is_read' => true]);
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Notification mark all as read error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to mark all notifications as read'], 500);
        }
    }
}
