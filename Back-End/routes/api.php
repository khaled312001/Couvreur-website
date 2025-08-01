<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Dashboard (temporarily public for testing)
Route::get('/admin/dashboard', [DashboardController::class, 'index']);
Route::get('/admin/dashboard/export', [DashboardController::class, 'exportData']);

// Admin Contact Messages (temporarily public for testing)
Route::get('/admin/contact', [ContactController::class, 'index']);
Route::get('/admin/contact/{id}', [ContactController::class, 'show']);
Route::put('/admin/contact/{id}', [ContactController::class, 'update']);
Route::delete('/admin/contact/{id}', [ContactController::class, 'destroy']);
Route::get('/admin/contact/status/{status}', [ContactController::class, 'byStatus']);
Route::get('/admin/contact/unread', [ContactController::class, 'unread']);

// Admin Testimonials (temporarily public for testing)
Route::get('/admin/testimonials', [TestimonialController::class, 'index']);
Route::get('/admin/testimonials/{id}', [TestimonialController::class, 'show']);
Route::post('/admin/testimonials', [TestimonialController::class, 'store']);
Route::put('/admin/testimonials/{id}', [TestimonialController::class, 'update']);
Route::delete('/admin/testimonials/{id}', [TestimonialController::class, 'destroy']);

// Admin Users (temporarily public for testing)
Route::get('/admin/users', [UserController::class, 'index']);
Route::get('/admin/users/{id}', [UserController::class, 'show']);
Route::post('/admin/users', [UserController::class, 'store']);
Route::put('/admin/users/{id}', [UserController::class, 'update']);
Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
Route::get('/admin/users/role/{role}', [UserController::class, 'byRole']);
Route::put('/admin/users/{id}/toggle-status', [UserController::class, 'toggleStatus']);

// Admin Settings (temporarily public for testing)
Route::get('/admin/settings', [SettingsController::class, 'index']);
Route::put('/admin/settings/{section}', [SettingsController::class, 'update']);
Route::get('/admin/settings/export', [SettingsController::class, 'export']);
Route::post('/admin/settings/import', [SettingsController::class, 'import']);

// Admin Blog (temporarily public for testing)
Route::get('/admin/blog', [BlogController::class, 'index']);
Route::get('/admin/blog/{id}', [BlogController::class, 'show']);
Route::post('/admin/blog', [BlogController::class, 'store']);
Route::put('/admin/blog/{id}', [BlogController::class, 'update']);
Route::delete('/admin/blog/{id}', [BlogController::class, 'destroy']);
Route::get('/admin/blog/category/{category}', [BlogController::class, 'byCategory']);

// Admin Gallery (temporarily public for testing)
Route::get('/admin/gallery', [GalleryController::class, 'index']);
Route::get('/admin/gallery/{id}', [GalleryController::class, 'show']);
Route::post('/admin/gallery', [GalleryController::class, 'store']);
Route::put('/admin/gallery/{id}', [GalleryController::class, 'update']);
Route::delete('/admin/gallery/{id}', [GalleryController::class, 'destroy']);
Route::get('/admin/gallery/category/{category}', [GalleryController::class, 'byCategory']);

// Services
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::get('/services/slug/{slug}', [ServiceController::class, 'showBySlug']);
Route::get('/services/category/{category}', [ServiceController::class, 'byCategory']);
Route::get('/services/search', [ServiceController::class, 'search']);

// Blog posts
Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/{id}', [BlogController::class, 'show']);
Route::get('/blog/slug/{slug}', [BlogController::class, 'showBySlug']);
Route::get('/blog/category/{category}', [BlogController::class, 'byCategory']);

// Gallery
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/{id}', [GalleryController::class, 'show']);
Route::get('/gallery/category/{category}', [GalleryController::class, 'byCategory']);

// Testimonials
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

// Contact form
Route::post('/contact', [ContactController::class, 'store']);

// Quote requests
Route::post('/quotes', [QuoteController::class, 'store']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::put('/auth/password', [AuthController::class, 'changePassword']);

    // User Quotes
    Route::get('/user/quotes', [QuoteController::class, 'userQuotes']);
    Route::get('/user/quotes/{id}', [QuoteController::class, 'userQuote']);
    Route::post('/user/quotes', [QuoteController::class, 'storeWithUser']);

    // User Messages
    Route::get('/user/messages', [ContactController::class, 'userMessages']);
    Route::get('/user/messages/{id}', [ContactController::class, 'userMessage']);
    Route::post('/user/messages', [ContactController::class, 'storeWithUser']);

    // Admin Services
    Route::post('/admin/services', [ServiceController::class, 'store']);
    Route::put('/admin/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy']);

    // Admin Quotes
    Route::get('/admin/quotes', [QuoteController::class, 'index']);
    Route::get('/admin/quotes/{id}', [QuoteController::class, 'show']);
    Route::put('/admin/quotes/{id}', [QuoteController::class, 'update']);
    Route::delete('/admin/quotes/{id}', [QuoteController::class, 'destroy']);
    Route::get('/admin/quotes/status/{status}', [QuoteController::class, 'byStatus']);
    Route::get('/admin/quotes/urgency/{urgency}', [QuoteController::class, 'byUrgency']);

    // Admin Notifications
    Route::get('/admin/notifications', [NotificationController::class, 'index']);
    Route::get('/admin/notifications/{id}', [NotificationController::class, 'show']);
    Route::post('/admin/notifications', [NotificationController::class, 'store']);
    Route::put('/admin/notifications/{id}', [NotificationController::class, 'update']);
    Route::delete('/admin/notifications/{id}', [NotificationController::class, 'destroy']);
    Route::put('/admin/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/admin/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
}); 