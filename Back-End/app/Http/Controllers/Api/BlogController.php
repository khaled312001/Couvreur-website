<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::published()->orderBy('published_at', 'desc')->get();
        return response()->json($posts);
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
            'published_at' => 'nullable|date'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);
        $data['author'] = 'BN BUILDING';

        if ($request->is_published && !$request->published_at) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);
        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        if ($request->is_published && !$request->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);
        return response()->json($post);
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