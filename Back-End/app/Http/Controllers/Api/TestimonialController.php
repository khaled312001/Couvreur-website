<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $testimonials = Testimonial::active()->orderBy('sort_order')->get();
        $response = response()->json($testimonials)->header('Cache-Control', 'public, max-age=3600');
        return $this->addCorsHeaders($response, $request);
    }

    public function show(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $response = response()->json($testimonial);
        return $this->addCorsHeaders($response, $request);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $testimonial = Testimonial::create($request->all());
        $response = response()->json($testimonial, 201);
        return $this->addCorsHeaders($response, $request);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $testimonial->update($request->all());
        $response = response()->json($testimonial);
        return $this->addCorsHeaders($response, $request);
    }

    public function destroy(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();
        $response = response()->json(['success' => true]);
        return $this->addCorsHeaders($response, $request);
    }
} 