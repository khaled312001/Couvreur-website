<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = BlogPost::published()
            ->orderBy('published_at', 'desc')
            ->select('id', 'title', 'slug', 'excerpt', 'image', 'category', 'created_at', 'published_at')
            ->get();
        
        $response = response()->json($posts)->header('Cache-Control', 'public, max-age=3600');
        return $this->addCorsHeaders($response, $request);
    }

    public function show(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        $response = response()->json($post);
        return $this->addCorsHeaders($response, $request);
    }

    public function showBySlug(Request $request, $slug)
    {
        $post = BlogPost::where('slug', $slug)->published()->firstOrFail();
        $response = response()->json($post);
        return $this->addCorsHeaders($response, $request);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'readTime' => 'nullable|string'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);
        $data['author'] = 'BN BUILDING';

        if ($request->is_published && !$request->published_at) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);
        $response = response()->json($post, 201);
        return $this->addCorsHeaders($response, $request);
    }

    public function update(Request $request, $id)
    {
        try {
            $post = BlogPost::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'required|string',
                'category' => 'required|string',
                'image' => 'nullable|string',
                'is_published' => 'boolean',
                'published_at' => 'nullable|date',
                'readTime' => 'nullable|string'
            ]);

            $data = $request->all();
            $data['slug'] = Str::slug($request->title);

            if ($request->is_published && !$request->published_at) {
                $data['published_at'] = now();
            }

            $post->update($data);
            $response = response()->json($post);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Blog update error: ' . $e->getMessage());
            $response = response()->json(['error' => $e->getMessage()], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function destroy(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();
        $response = response()->json(['success' => true]);
        return $this->addCorsHeaders($response, $request);
    }

    public function byCategory(Request $request, $category)
    {
        $posts = BlogPost::published()->byCategory($category)->orderBy('published_at', 'desc')->get();
        $response = response()->json($posts);
        return $this->addCorsHeaders($response, $request);
    }
} 