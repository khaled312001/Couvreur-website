<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $items = GalleryItem::active()->orderBy('sort_order')->get();
        $response = response()->json($items)->header('Cache-Control', 'public, max-age=3600');
        return $this->addCorsHeaders($response, $request);
    }

    public function show(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);
        $response = response()->json($item);
        return $this->addCorsHeaders($response, $request);
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
            $response = response()->json($item, 201);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Gallery store error: ' . $e->getMessage());
            $response = response()->json(['error' => 'Failed to create gallery item'], 500);
            return $this->addCorsHeaders($response, $request);
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
            $response = response()->json($item);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Gallery update error: ' . $e->getMessage());
            $response = response()->json(['error' => 'Failed to update gallery item'], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $item = GalleryItem::findOrFail($id);
            $item->delete();
            $response = response()->json(['success' => true]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Gallery destroy error: ' . $e->getMessage());
            $response = response()->json(['error' => 'Failed to delete gallery item'], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function byCategory(Request $request, $category)
    {
        $items = GalleryItem::active()->byCategory($category)->orderBy('sort_order')->get();
        $response = response()->json($items);
        return $this->addCorsHeaders($response, $request);
    }
} 