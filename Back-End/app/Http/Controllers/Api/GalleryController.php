<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $items = GalleryItem::active()->orderBy('sort_order')->get();
        return response()->json($items);
    }

    public function show($id)
    {
        $item = GalleryItem::findOrFail($id);
        return response()->json($item);
    }

    public function store(Request $request)
    {
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
    }

    public function update(Request $request, $id)
    {
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
    }

    public function destroy($id)
    {
        $item = GalleryItem::findOrFail($id);
        $item->delete();
        return response()->json(['success' => true]);
    }

    public function byCategory($category)
    {
        $items = GalleryItem::active()->byCategory($category)->orderBy('sort_order')->get();
        return response()->json($items);
    }
} 