<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\CloudinaryUploadController;
use App\Http\Controllers\SitemapController;
use App\Services\ImageOptimizationService;

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

// Handle preflight OPTIONS requests for CORS
Route::options('{any}', function () {
    return response()->json([], 200, [
        'Access-Control-Allow-Origin' => request()->header('Origin') ?? '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-XSRF-TOKEN',
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Max-Age' => '86400',
    ]);
})->where('any', '.*');

// CORS Test endpoint
Route::get('/cors-test', function () {
    return response()->json([
        'message' => 'CORS is working!',
        'timestamp' => now(),
        'origin' => request()->header('Origin'),
        'method' => request()->method()
    ]);
});

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});

// Simple ping endpoint for CORS testing
Route::get('/ping', function () {
    return response()->json([
        'message' => 'pong',
        'timestamp' => now(),
        'cors' => 'working'
    ]);
});

// Test CORS endpoint
Route::get('/test-cors', function () {
    return response()->json([
        'message' => 'CORS is working!',
        'timestamp' => now()
    ]);
});

// Test database connection
Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'Database connected successfully',
            'database' => DB::connection()->getDatabaseName()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'Database connection failed',
            'error' => $e->getMessage()
        ], 500);
    }
});

// Debug services endpoint
Route::get('/debug-services', function () {
    try {
        $services = \App\Models\Service::all();
        return response()->json([
            'status' => 'success',
            'count' => $services->count(),
            'services' => $services
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);
    }
});

// Serve uploaded images
Route::get('/uploads/{folder}/{filename}', [ImageController::class, 'serve']);

// Cloudinary upload routes (temporarily public for testing)
Route::post('/cloudinary/upload', [CloudinaryUploadController::class, 'upload']);
Route::delete('/cloudinary/upload', [CloudinaryUploadController::class, 'destroy']);

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

// Admin Services (temporarily public for testing)
Route::get('/admin/services', [ServiceController::class, 'adminIndex']);
Route::get('/admin/services/{id}', [ServiceController::class, 'show']);
Route::post('/admin/services', [ServiceController::class, 'store']);
Route::put('/admin/services/{id}', [ServiceController::class, 'update']);
Route::post('/admin/services/{id}', [ServiceController::class, 'update']);
Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy']);
Route::put('/admin/services/{id}/toggle-status', [ServiceController::class, 'toggleStatus']);
Route::get('/admin/services/category/{category}', [ServiceController::class, 'byCategory']);

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

// Test email endpoint
Route::get('/test-email', function() {
    try {
        $adminEmail = 'support@bnbatiment.com';
        $emailData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'userMessage' => 'This is a test email to verify email configuration.',
            'subject' => 'Test Email',
            'phone' => '+33 7 80 32 64 27',
            'admin_url' => url('/admin/contact')
        ];

        Mail::send('emails.new_contact', $emailData, function ($mailMessage) use ($adminEmail) {
            $mailMessage->to($adminEmail)
                    ->subject("Test Email - Configuration Check")
                    ->from('support@bnbatiment.com', 'BN Bâtiment Test');
        });

        return response()->json([
            'success' => true,
            'message' => 'Test email sent successfully to ' . $adminEmail,
            'config' => [
                'mail_driver' => config('mail.default'),
                'mail_host' => config('mail.mailers.smtp.host'),
                'mail_port' => config('mail.mailers.smtp.port'),
                'mail_username' => config('mail.mailers.smtp.username'),
                'mail_from' => config('mail.from.address'),
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to send test email',
            'error' => $e->getMessage(),
            'config' => [
                'mail_driver' => config('mail.default'),
                'mail_host' => config('mail.mailers.smtp.host'),
                'mail_port' => config('mail.mailers.smtp.port'),
                'mail_username' => config('mail.mailers.smtp.username'),
                'mail_from' => config('mail.from.address'),
            ]
        ], 500);
    }
});

// Chat routes
Route::post('/chat/session', [ChatController::class, 'createSession']);
Route::get('/chat/sessions', [ChatController::class, 'getSessions']);
Route::get('/chat/messages/{sessionId}', [ChatController::class, 'getMessages']);
Route::post('/chat/message', [ChatController::class, 'sendMessage']);
Route::put('/chat/mark-read/{sessionId}', [ChatController::class, 'markAsRead']);

// Admin Orders (temporarily public for testing)
Route::get('/admin/orders', [OrdersController::class, 'index']);
Route::get('/admin/orders/{id}', [OrdersController::class, 'show']);
Route::post('/admin/orders', [OrdersController::class, 'store']);
Route::put('/admin/orders/{id}', [OrdersController::class, 'update']);
Route::delete('/admin/orders/{id}', [OrdersController::class, 'destroy']);
Route::put('/admin/orders/{id}/status', [OrdersController::class, 'updateStatus']);
Route::get('/admin/orders/statistics', [OrdersController::class, 'statistics']);

// Quote requests
Route::post('/quotes', [QuoteController::class, 'store']);

// Newsletter subscriptions
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
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

    // Admin Services (moved outside middleware for testing)
    // Route::post('/admin/services', [ServiceController::class, 'store']);
    // Route::put('/admin/services/{id}', [ServiceController::class, 'update']);
    // Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy']);

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

    // Admin Newsletter
    Route::get('/admin/newsletter', [NewsletterController::class, 'index']);
    Route::get('/admin/newsletter/{id}', [NewsletterController::class, 'show']);
    Route::delete('/admin/newsletter/{id}', [NewsletterController::class, 'destroy']);
    Route::put('/admin/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/admin/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

});

// Image optimization route
Route::get('/optimize-image', function (Request $request) {
    $imageService = new ImageOptimizationService();
    return $imageService->optimizeImage($request->get('path'), $request);
})->middleware('cache.headers:public;max_age=31536000;etag;last_modified');

// Sitemap route
Route::get('/sitemap', [SitemapController::class, 'index']); 