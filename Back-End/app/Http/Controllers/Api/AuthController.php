<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => 'user', // Default role for regular users
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        $response = response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'User registered successfully'
        ], 201);
        return $this->addCorsHeaders($response, $request);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            $response = response()->json([
                'user' => $user,
                'token' => $token
            ]);
            return $this->addCorsHeaders($response, $request);
        }

        // Return error with CORS headers
        $response = response()->json([
            'message' => 'The provided credentials are incorrect.',
            'errors' => [
                'email' => ['The provided credentials are incorrect.']
            ]
        ], 422);
        return $this->addCorsHeaders($response, $request);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $response = response()->json(['success' => true]);
        return $this->addCorsHeaders($response, $request);
    }

    public function user(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                $response = response()->json(['error' => 'Unauthorized'], 401);
                return $this->addCorsHeaders($response, $request);
            }
            $response = response()->json($user);
            return $this->addCorsHeaders($response, $request);
        } catch (\Exception $e) {
            $response = response()->json(['error' => 'Unauthorized'], 401);
            return $this->addCorsHeaders($response, $request);
        }
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        $response = response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully'
        ]);
        return $this->addCorsHeaders($response, $request);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            $response = response()->json([
                'message' => 'The current password is incorrect.',
                'errors' => [
                    'current_password' => ['The current password is incorrect.']
                ]
            ], 422);
            return $this->addCorsHeaders($response, $request);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        $response = response()->json([
            'message' => 'Password changed successfully'
        ]);
        return $this->addCorsHeaders($response, $request);
    }
} 