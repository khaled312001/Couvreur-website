<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

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
        try {
            // Log incoming request for debugging
            Log::info('Blog store request received', [
                'request_data' => $request->all(),
                'content_length' => strlen($request->input('content', '')),
                'has_image' => $request->has('image'),
                'has_readTime' => $request->has('readTime')
            ]);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|string',
                'is_published' => 'nullable|boolean',
            'published_at' => 'nullable|date',
            'readTime' => 'nullable|string'
        ]);

        $data = $request->all();
            
            // Generate unique slug
            $baseSlug = Str::slug($request->title);
            $slug = $baseSlug;
            $counter = 1;
            while (BlogPost::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            $data['slug'] = $slug;
            
        $data['author'] = 'BN BUILDING';

            // Ensure boolean values are properly cast
            if (isset($data['is_published'])) {
                $data['is_published'] = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
            } else {
                $data['is_published'] = false;
            }

            if (isset($data['is_published']) && $data['is_published'] && (!isset($data['published_at']) || empty($data['published_at']))) {
            $data['published_at'] = now();
            } elseif (isset($data['published_at']) && is_string($data['published_at']) && empty($data['published_at'])) {
                $data['published_at'] = null;
            }

            // Ensure readTime is handled correctly (remove if empty or null)
            if (isset($data['readTime']) && !empty($data['readTime'])) {
                $data['readTime'] = (string) $data['readTime'];
            } else {
                unset($data['readTime']); // Remove if not provided or empty
            }

            // Only include fillable fields to prevent mass assignment issues
            $fillableFields = (new BlogPost())->getFillable();
            $fillableData = array_intersect_key($data, array_flip($fillableFields));
            
            // Remove null values for optional fields to avoid database issues
            $fillableData = array_filter($fillableData, function($value, $key) {
                // Keep false, 0, and empty string, but remove null
                if ($value === null) {
                    return false;
                }
                // For readTime, only include if it's not empty
                if ($key === 'readTime' && empty($value)) {
                    return false;
                }
                return true;
            }, ARRAY_FILTER_USE_BOTH);
            
            // Log the data being created for debugging
            Log::info('Creating blog post', [
                'fillable_data' => $fillableData,
                'fillable_fields' => $fillableFields,
                'slug' => $data['slug']
            ]);

            $post = BlogPost::create($fillableData);
            $response = response()->json($post, 201);
            return $this->addCorsHeaders($response, $request);
        } catch (ValidationException $e) {
            Log::error('Blog store validation error: ' . $e->getMessage(), [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
            return $this->addCorsHeaders($response, $request);
        } catch (QueryException $e) {
            Log::error('Blog store database error: ' . $e->getMessage(), [
                'sql' => $e->getSql(),
                'bindings' => $e->getBindings(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Database error',
                'message' => 'Failed to save blog post to database',
                'details' => config('app.debug') ? $e->getMessage() : 'Please check server logs'
            ], 500);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Blog store error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Failed to create blog post',
                'message' => $e->getMessage(),
                'details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ] : null
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Log incoming request for debugging
            Log::info('Blog update request received', [
                'id' => $id,
                'request_data' => $request->all(),
                'content_length' => strlen($request->input('content', '')),
                'has_image' => $request->has('image'),
                'has_readTime' => $request->has('readTime')
            ]);

            $post = BlogPost::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'required|string',
                'category' => 'required|string',
                'image' => 'nullable|string',
                'is_published' => 'nullable|boolean',
                'published_at' => 'nullable|date',
                'readTime' => 'nullable|string'
            ]);

            $data = $request->all();
            
            // Generate unique slug (check if different from current)
            $newSlug = Str::slug($request->title);
            if ($newSlug !== $post->slug) {
                $baseSlug = $newSlug;
                $slug = $baseSlug;
                $counter = 1;
                while (BlogPost::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                $data['slug'] = $slug;
            } else {
                unset($data['slug']); // Don't update slug if it's the same
            }

            // Ensure boolean values are properly cast
            if (isset($data['is_published'])) {
                $data['is_published'] = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
            }

            if (isset($data['is_published']) && $data['is_published'] && (!isset($data['published_at']) || empty($data['published_at']))) {
                $data['published_at'] = now();
            } elseif (isset($data['published_at']) && is_string($data['published_at']) && empty($data['published_at'])) {
                $data['published_at'] = null;
            }

            // Only include fillable fields to prevent mass assignment issues
            $fillableFields = (new BlogPost())->getFillable();
            $fillableData = [];
            
            // Fields that can accept null values
            $nullableFields = ['readTime', 'image', 'published_at'];
            
            foreach ($fillableFields as $field) {
                if (array_key_exists($field, $data)) {
                    $value = $data[$field];
                    
                    // Handle null values - allow null for nullable fields
                    if ($value === null) {
                        if (in_array($field, $nullableFields)) {
                            $fillableData[$field] = null;
                        }
                        // Skip null for required fields (they shouldn't be null anyway)
                        continue;
                    }
                    
                    // For readTime, trim whitespace
                    if ($field === 'readTime' && is_string($value)) {
                        $value = trim($value);
                        if ($value === '') {
                            $fillableData[$field] = null;
                        } else {
                            $fillableData[$field] = $value;
                        }
                    } else {
                        $fillableData[$field] = $value;
                    }
                }
            }
            
            // Log the data being updated for debugging
            Log::info('Updating blog post', [
                'id' => $id,
                'fillable_data' => $fillableData,
                'fillable_fields' => $fillableFields,
                'original_data_keys' => array_keys($data)
            ]);

            // Ensure required fields are present (should be validated, but double-check)
            $requiredFields = ['title', 'content', 'excerpt', 'category'];
            foreach ($requiredFields as $field) {
                if (!isset($fillableData[$field]) || empty($fillableData[$field])) {
                    if (isset($data[$field]) && !empty($data[$field])) {
                        $fillableData[$field] = $data[$field];
                    } else {
                        Log::warning('Required field missing in fillable data', [
                            'id' => $id,
                            'field' => $field,
                            'fillable_data_keys' => array_keys($fillableData)
                        ]);
                    }
                }
            }
            
            // Only update if there's data to update
            if (!empty($fillableData)) {
                try {
                    $post->update($fillableData);
                    Log::info('Blog post updated successfully', [
                        'id' => $id,
                        'updated_fields' => array_keys($fillableData)
                    ]);
                } catch (\Exception $updateException) {
                    Log::error('Error during blog post update', [
                        'id' => $id,
                        'error' => $updateException->getMessage(),
                        'error_class' => get_class($updateException),
                        'fillable_data' => $fillableData,
                        'fillable_data_types' => array_map(function($v) {
                            return gettype($v);
                        }, $fillableData),
                        'trace' => $updateException->getTraceAsString()
                    ]);
                    throw $updateException;
                }
            } else {
                Log::warning('No data to update for blog post', [
                    'id' => $id,
                    'request_data_keys' => array_keys($data),
                    'fillable_fields' => $fillableFields
                ]);
                // Even if no data, return the post
            }
            
            // Reload to get fresh data
            $post->refresh();
            
            $response = response()->json($post);
            return $this->addCorsHeaders($response, $request);
        } catch (ValidationException $e) {
            Log::error('Blog update validation error: ' . $e->getMessage(), [
                'id' => $id,
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
            return $this->addCorsHeaders($response, $request);
        } catch (QueryException $e) {
            Log::error('Blog update database error: ' . $e->getMessage(), [
                'id' => $id,
                'sql' => $e->getSql(),
                'bindings' => $e->getBindings(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Database error',
                'message' => 'Failed to update blog post in database',
                'details' => config('app.debug') ? $e->getMessage() : 'Please check server logs'
            ], 500);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            Log::error('Blog update error: ' . $e->getMessage(), [
                'id' => $id,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            $response = response()->json([
                'error' => 'Failed to update blog post',
                'message' => $e->getMessage(),
                'details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ] : null
            ], 500);
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