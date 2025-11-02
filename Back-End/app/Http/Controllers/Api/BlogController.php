<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::published()
            ->orderBy('published_at', 'desc')
            ->select('id', 'title', 'slug', 'excerpt', 'image', 'category', 'created_at', 'published_at')
            ->get();
        
        return response()->json($posts)
            ->header('Cache-Control', 'public, max-age=3600')
            ->header('Access-Control-Allow-Origin', '*');
    }

    public function show($id)
    {
        $post = BlogPost::findOrFail($id);
        return response()->json($post);
    }

    public function showBySlug($slug)
    {
        $post = BlogPost::where('slug', $slug)->published()->firstOrFail();
        return response()->json($post);
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
        
        // Get origin from request
        $origin = $request->header('Origin');
        $allowedOrigins = [
            'https://www.bnbatiment.com',
            'https://bnbatiment.com',
            'http://localhost:3000',
            'http://localhost:5173'
        ];
        
        $response = response()->json($post, 201);
        
        if ($origin && in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        } else {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        }
        
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN');
        
        return $response;
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
            return response()->json($post);
        } catch (\Exception $e) {
            Log::error('Blog update error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();
        return response()->json(['success' => true]);
    }

    public function byCategory($category)
    {
        $posts = BlogPost::published()->byCategory($category)->orderBy('published_at', 'desc')->get();
        return response()->json($posts);
    }
} 