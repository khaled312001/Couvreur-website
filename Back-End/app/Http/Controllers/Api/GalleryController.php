<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function index()
    {
        $items = GalleryItem::active()->orderBy('sort_order')->get();
        return response()->json($items)
            ->header('Cache-Control', 'public, max-age=3600')
            ->header('Access-Control-Allow-Origin', '*');
    }

    public function show($id)
    {
        $item = GalleryItem::findOrFail($id);
        return response()->json($item);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image' => 'required|string',
                'category' => 'required|string',
                'sort_order' => 'integer',
                'is_active' => 'boolean'
            ]);

            $item = GalleryItem::create($request->all());
            return response()->json($item, 201);
        } catch (\Exception $e) {
            Log::error('Gallery store error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create gallery item'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $item = GalleryItem::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image' => 'required|string',
                'category' => 'required|string',
                'sort_order' => 'integer',
                'is_active' => 'boolean'
            ]);

            $item->update($request->all());
            return response()->json($item);
        } catch (\Exception $e) {
            Log::error('Gallery update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update gallery item'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $item = GalleryItem::findOrFail($id);
            $item->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Gallery destroy error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete gallery item'], 500);
        }
    }

    public function byCategory($category)
    {
        $items = GalleryItem::active()->byCategory($category)->orderBy('sort_order')->get();
        return response()->json($items);
    }
} 