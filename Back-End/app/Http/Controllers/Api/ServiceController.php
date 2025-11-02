<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = Service::active()->orderBy('sort_order')->get();
        $response = response()->json($services)->header('Cache-Control', 'public, max-age=3600');
        return $this->addCorsHeaders($response, $request);
    }

    public function adminIndex(Request $request)
    {
        $services = Service::orderBy('sort_order')->get();
        $response = response()->json($services);
        return $this->addCorsHeaders($response, $request);
    }

    public function show(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $response = response()->json($service);
        return $this->addCorsHeaders($response, $request);
    }

    public function showBySlug(Request $request, $slug)
    {
        $service = Service::where('slug', $slug)->active()->firstOrFail();
        $response = response()->json($service);
        return $this->addCorsHeaders($response, $request);
    }

    public function store(Request $request)
    {
        // Log the received data for debugging
        Log::info('Received create data:', [
            'title' => $request->input('title'),
            'image' => $request->hasFile('image') ? 'file uploaded' : 'no file',
            'has_file' => $request->hasFile('image'),
            'content_type' => $request->header('Content-Type'),
            'all_data' => $request->all()
        ]);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|string',
            'price_range' => 'required|string',
            'features' => 'nullable',
            'sub_services' => 'nullable',
            'materials' => 'nullable',
            'advantages' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'nullable',
            'sort_order' => 'nullable|integer'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        // Handle array fields that might come as JSON strings
        $arrayFields = ['features', 'sub_services', 'materials', 'advantages'];
        foreach ($arrayFields as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $data[$field] = json_decode($data[$field], true);
            }
            // Provide default empty arrays if not set
            if (!isset($data[$field]) || empty($data[$field])) {
                $data[$field] = [];
            }
        }

        // Handle boolean fields
        if (isset($data['is_active'])) {
            // Convert various boolean representations to actual boolean
            if (is_string($data['is_active'])) {
                $data['is_active'] = in_array(strtolower($data['is_active']), ['true', '1', 'yes', 'on']);
            } else {
                $data['is_active'] = (bool) $data['is_active'];
            }
        } else {
            $data['is_active'] = true; // Default value
        }

        // Handle integer fields
        if (isset($data['sort_order'])) {
            $data['sort_order'] = (int) $data['sort_order'];
        } else {
            $data['sort_order'] = 0; // Default value
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/services'), $imageName);
            $data['image'] = '/uploads/services/' . $imageName;
        }

        try {
            $service = Service::create($data);
            
            // Create notification for new service
            try {
                Notification::createServiceNotification($service, 'created');
            } catch (\Exception $e) {
                Log::error('Failed to create notification:', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]);
                // Continue without notification if it fails
            }
            
            $response = response()->json($service, 201);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Error creating service:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            $response = response()->json([
                'error' => 'Failed to create service',
                'message' => $e->getMessage(),
                'details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $service = Service::findOrFail($id);
            
            // Basic validation
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'long_description' => 'required|string',
                'category' => 'required|string',
                'duration' => 'required|string',
                'price_range' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'is_active' => 'nullable',
                'sort_order' => 'nullable|integer'
            ]);

            $data = $request->all();
            
            // Log the received data for debugging
            Log::info('Received update data:', [
                'title' => $data['title'] ?? 'not set',
                'image' => $data['image'] ?? 'not set',
                'has_file' => $request->hasFile('image'),
                'content_type' => $request->header('Content-Type'),
                'all_data' => $data
            ]);
            
            $data['slug'] = Str::slug($data['title']);

            // Handle array fields - they might come as arrays or JSON strings
            $arrayFields = ['features', 'sub_services', 'materials', 'advantages'];
            foreach ($arrayFields as $field) {
                if (isset($data[$field])) {
                    if (is_string($data[$field])) {
                        // If it's a JSON string, decode it
                        $decoded = json_decode($data[$field], true);
                        $data[$field] = $decoded !== null ? $decoded : [];
                    } elseif (is_array($data[$field])) {
                        // If it's already an array, keep it as is
                        $data[$field] = $data[$field];
                    } else {
                        // If it's neither, set to empty array
                        $data[$field] = [];
                    }
                } else {
                    // If field is not set, use empty array
                    $data[$field] = [];
                }
            }

            // Handle boolean fields
            if (isset($data['is_active'])) {
                // Convert various boolean representations to actual boolean
                if (is_string($data['is_active'])) {
                    $data['is_active'] = in_array(strtolower($data['is_active']), ['true', '1', 'yes', 'on']);
                } else {
                    $data['is_active'] = (bool) $data['is_active'];
                }
            } else {
                // Keep existing value if not provided
                unset($data['is_active']);
            }

            // Handle integer fields
            if (isset($data['sort_order'])) {
                $data['sort_order'] = (int) $data['sort_order'];
            } else {
                // Keep existing value if not provided
                unset($data['sort_order']);
            }

            // Handle image - could be a file upload or a string URL
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($service->image && file_exists(public_path($service->image))) {
                    unlink(public_path($service->image));
                }
                
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads/services'), $imageName);
                $data['image'] = '/uploads/services/' . $imageName; // Store as string path
            } elseif (isset($data['image']) && is_string($data['image']) && !empty($data['image'])) {
                // If it's a string URL, keep it as is
                $data['image'] = $data['image'];
            } else {
                // If no image is provided, keep the existing image
                unset($data['image']);
            }
            
            // Log the final image data
            Log::info('Final image data:', [
                'image' => $data['image'] ?? 'not set',
                'service_original_image' => $service->image ?? 'not set'
            ]);



            $service->update($data);
            
            $response = response()->json($service);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Error updating service:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            $response = response()->json([
                'error' => 'Failed to update service',
                'message' => $e->getMessage(),
                'details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function destroy(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        // Create notification for deleted service before deleting
        Notification::createServiceNotification($service, 'deleted');
        
        $service->delete();
        $response = response()->json(['success' => true]);
        return $this->addCorsHeaders($response, $request);
    }

    public function byCategory(Request $request, $category)
    {
        $services = Service::active()->byCategory($category)->orderBy('sort_order')->get();
        $response = response()->json($services);
        return $this->addCorsHeaders($response, $request);
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        $services = Service::active()
            ->where('title', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orderBy('sort_order')
            ->get();
        $response = response()->json($services);
        return $this->addCorsHeaders($response, $request);
    }

    public function toggleStatus(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->is_active = !$service->is_active;
        $service->save();
        
        $response = response()->json([
            'success' => true,
            'is_active' => $service->is_active,
            'message' => $service->is_active ? 'Service activated successfully' : 'Service deactivated successfully'
        ]);
        return $this->addCorsHeaders($response, $request);
    }
} 