<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::active()->orderBy('sort_order')->get();
        return response()->json($services);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    public function showBySlug($slug)
    {
        $service = Service::where('slug', $slug)->active()->firstOrFail();
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|string',
            'price_range' => 'required|string',
            'features' => 'required|array',
            'sub_services' => 'required|array',
            'materials' => 'required|array',
            'advantages' => 'required|array',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        $service = Service::create($data);
        
        // Create notification for new service
        Notification::createServiceNotification($service, 'created');
        
        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'required|string',
            'icon' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|string',
            'price_range' => 'required|string',
            'features' => 'required|array',
            'sub_services' => 'required|array',
            'materials' => 'required|array',
            'advantages' => 'required|array',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        $service->update($data);
        
        // Create notification for updated service
        Notification::createServiceNotification($service, 'updated');
        
        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        
        // Create notification for deleted service before deleting
        Notification::createServiceNotification($service, 'deleted');
        
        $service->delete();
        return response()->json(['success' => true]);
    }

    public function byCategory($category)
    {
        $services = Service::active()->byCategory($category)->orderBy('sort_order')->get();
        return response()->json($services);
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        $services = Service::active()
            ->where('title', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orderBy('sort_order')
            ->get();
        return response()->json($services);
    }
} 