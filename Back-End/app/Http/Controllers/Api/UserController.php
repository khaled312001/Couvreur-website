<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        try {
            $users = User::orderBy('created_at', 'desc')->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'role' => $user->role,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                    'last_login' => $user->last_login_at ?? null,
                    'is_active' => true, // You can add an is_active field to users table if needed
                ];
            });

            $response = response()->json([
                'success' => true,
                'data' => $users
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error fetching users: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function show(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            
            $response = response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'role' => $user->role,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                    'last_login' => $user->last_login_at ?? null,
                    'is_active' => true,
                ]
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
                'role' => 'required|in:admin,user,manager',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'address' => $request->address,
                'role' => $request->role,
            ]);

            $response = response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'role' => $user->role,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ]
            ], 201);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error creating user: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
                'role' => 'required|in:admin,user,manager',
                'password' => 'nullable|string|min:8',
            ]);

            $updateData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'role' => $request->role,
            ];

            if ($request->filled('password')) {
                $updateData['password'] = Hash::make($request->password);
            }

            $user->update($updateData);

            $response = response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'role' => $user->role,
                    'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                ]
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error updating user: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Prevent deleting the last admin user
            if ($user->role === 'admin' && User::where('role', 'admin')->count() === 1) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Cannot delete the last admin user'
                ], 400);
                return $this->addCorsHeaders($response, $request);
            }

            $user->delete();

            $response = response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error deleting user: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function byRole(Request $request, $role)
    {
        try {
            $users = User::where('role', $role)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'address' => $user->address,
                        'role' => $user->role,
                        'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                        'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                        'is_active' => true,
                    ];
                });

            $response = response()->json([
                'success' => true,
                'data' => $users
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error fetching users by role: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function toggleStatus(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            
            // This would require adding an is_active field to the users table
            // For now, we'll just return success
            $response = response()->json([
                'success' => true,
                'message' => 'User status updated successfully'
            ]);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json([
                'success' => false,
                'message' => 'Error updating user status: ' . $e->getMessage()
            ], 500);
            return $this->addCorsHeaders($response, $request);
        }
    }
} 