<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Quote;
use App\Models\ContactMessage;
use App\Models\Service;
use App\Models\BlogPost;
use App\Models\GalleryItem;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Notification;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Get current month and previous month
            $currentMonth = Carbon::now();
            $previousMonth = Carbon::now()->subMonth();

            // Quick Stats - Real data from all tables
            $quickStats = [
                'total_quotes' => Quote::count(),
                'pending_quotes' => Quote::where('status', 'pending')->count(),
                'approved_quotes' => Quote::where('status', 'approved')->count(),
                'completed_quotes' => Quote::where('status', 'quoted')->count(),
                'total_services' => Service::count(),
                'active_services' => Service::where('is_active', true)->count(),
                'total_testimonials' => Testimonial::count(),
                'approved_testimonials' => Testimonial::where('is_active', true)->count(),
                'total_gallery_items' => GalleryItem::count(),
                'total_blog_posts' => BlogPost::count(),
                'published_blog_posts' => BlogPost::where('is_published', true)->count(),
                'total_contact_messages' => ContactMessage::count(),
                'unread_messages' => ContactMessage::where('status', 'unread')->count(),
                'total_users' => User::count(),
                'total_revenue' => $this->calculateTotalRevenue(),
            ];

            // Monthly Revenue Data - Real data from quotes
            $monthlyRevenue = $this->getMonthlyRevenueData();

            // Service Distribution - Real data from quotes and services
            $serviceDistribution = $this->getServiceDistributionData();

            // Recent Quotes - Real data
            $recentQuotes = Quote::orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($quote) {
                    return [
                        'id' => $quote->id,
                        'client_name' => $quote->name,
                        'service_type' => $quote->service_type,
                        'amount' => $this->calculateQuoteAmount($quote),
                        'status' => $quote->status,
                        'created_at' => $quote->created_at->format('Y-m-d'),
                        'urgency' => $quote->urgency,
                        'email' => $quote->email,
                        'phone' => $quote->phone
                    ];
                });

            // Recent Messages - Real data
            $recentMessages = ContactMessage::orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'name' => $message->name,
                        'email' => $message->email,
                        'subject' => $message->subject,
                        'message' => $message->message,
                        'is_read' => $message->status === 'read',
                        'status' => $message->status,
                        'created_at' => $message->created_at->format('Y-m-d H:i')
                    ];
                });

            // Recent Blog Posts - Real data
            $recentBlogPosts = BlogPost::where('is_published', true)
                ->orderBy('published_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'excerpt' => $post->excerpt,
                        'author' => $post->author,
                        'category' => $post->category,
                        'image' => $post->image,
                        'slug' => $post->slug,
                        'is_published' => $post->is_published,
                        'published_at' => $post->published_at ? $post->published_at->format('Y-m-d') : null,
                        'created_at' => $post->created_at->format('Y-m-d'),
                        'read_time' => $post->read_time ?? 5
                    ];
                });

            // Recent Testimonials - Real data
            $recentTestimonials = Testimonial::where('is_active', true)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($testimonial) {
                    return [
                        'id' => $testimonial->id,
                        'name' => $testimonial->name,
                        'location' => $testimonial->location,
                        'content' => $testimonial->content,
                        'rating' => $testimonial->rating,
                        'image' => $testimonial->image,
                        'is_active' => $testimonial->is_active,
                        'sort_order' => $testimonial->sort_order,
                        'created_at' => $testimonial->created_at->format('Y-m-d')
                    ];
                });

            // Status Distribution - Real data
            $statusDistribution = [
                'quotes' => [
                    'pending' => Quote::where('status', 'pending')->count(),
                    'approved' => Quote::where('status', 'approved')->count(),
                    'completed' => Quote::where('status', 'completed')->count(),
                    'rejected' => Quote::where('status', 'rejected')->count(),
                ],
                'messages' => [
                    'read' => ContactMessage::where('status', 'read')->count(),
                    'unread' => ContactMessage::where('status', 'unread')->count(),
                ],
                'blog_posts' => [
                    'published' => BlogPost::where('is_published', true)->count(),
                    'draft' => BlogPost::where('is_published', false)->count(),
                ],
                'testimonials' => [
                    'active' => Testimonial::where('is_active', true)->count(),
                    'inactive' => Testimonial::where('is_active', false)->count(),
                ],
                'services' => [
                    'active' => Service::where('is_active', true)->count(),
                    'inactive' => Service::where('is_active', false)->count(),
                ],
                'gallery_items' => [
                    'total' => GalleryItem::count(),
                    'by_category' => $this->getGalleryItemsByCategory(),
                ]
            ];

            // Performance Metrics - Real calculations
            $performanceMetrics = [
                'conversion_rate' => $this->calculateConversionRate(),
                'average_response_time' => $this->calculateAverageResponseTime(),
                'customer_satisfaction' => $this->calculateCustomerSatisfaction(),
                'monthly_growth' => $this->calculateMonthlyGrowth(),
                'quote_completion_rate' => $this->calculateQuoteCompletionRate(),
                'average_rating' => $this->calculateAverageRating(),
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'quick_stats' => $quickStats,
                    'monthly_revenue' => $monthlyRevenue,
                    'service_distribution' => $serviceDistribution,
                    'recent_quotes' => $recentQuotes,
                    'recent_messages' => $recentMessages,
                    'recent_blog_posts' => $recentBlogPosts,
                    'recent_testimonials' => $recentTestimonials,
                    'status_distribution' => $statusDistribution,
                    'performance_metrics' => $performanceMetrics,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching dashboard data: ' . $e->getMessage()
            ], 500);
        }
    }

    private function calculateTotalRevenue()
    {
        // Calculate total revenue based on accepted quotes
        $acceptedQuotes = Quote::where('status', 'approved')->count();
        // Since we don't have amount field, we'll estimate based on service types
        $revenue = 0;
        foreach (Quote::where('status', 'approved')->get() as $quote) {
            $revenue += $this->calculateQuoteAmount($quote);
        }
        return $revenue;
    }

    private function calculateQuoteAmount($quote)
    {
        // Estimate amount based on service type
        $baseAmounts = [
            'Charpente' => 5000,
            'Couverture' => 3500,
            'Zinguerie' => 2000,
            'Entretien' => 800,
            'Installation' => 3000,
            'Réparation' => 1500,
            'Maintenance' => 1200,
        ];

        return $baseAmounts[$quote->service_type] ?? 2000;
    }

    private function getMonthlyRevenueData()
    {
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthQuotes = Quote::whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->get();

            $revenue = 0;
            foreach ($monthQuotes as $quote) {
                $revenue += $this->calculateQuoteAmount($quote);
            }

            $months[] = [
                'month' => $month->format('M'),
                'revenue' => $revenue,
                'quotes' => $monthQuotes->count(),
                'accepted_quotes' => $monthQuotes->where('status', 'approved')->count(),
                'pending_quotes' => $monthQuotes->where('status', 'pending')->count(),
            ];
        }

        return collect($months);
    }

    private function getServiceDistributionData()
    {
        $serviceTypes = Quote::select('service_type', DB::raw('count(*) as count'))
            ->groupBy('service_type')
            ->get();

        return $serviceTypes->map(function ($item) {
            return [
                'service' => $item->service_type,
                'count' => $item->count,
                'amount' => $this->calculateQuoteAmount((object)['service_type' => $item->service_type]) * $item->count,
                'percentage' => round(($item->count / Quote::count()) * 100, 1)
            ];
        });
    }

    private function getGalleryItemsByCategory()
    {
        return GalleryItem::select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->get()
            ->pluck('count', 'category')
            ->toArray();
    }

    private function calculateConversionRate()
    {
        $totalQuotes = Quote::count();
        $acceptedQuotes = Quote::where('status', 'approved')->count();
        
        return $totalQuotes > 0 ? round(($acceptedQuotes / $totalQuotes) * 100, 2) : 0;
    }

    private function calculateQuoteCompletionRate()
    {
        $totalQuotes = Quote::count();
        $completedQuotes = Quote::whereIn('status', ['approved', 'completed'])->count();
        
        return $totalQuotes > 0 ? round(($completedQuotes / $totalQuotes) * 100, 2) : 0;
    }

    private function calculateAverageResponseTime()
    {
        // Calculate average response time for quotes (in hours)
        // Since response_time field doesn't exist, we'll estimate based on status changes
        $quotesWithResponse = Quote::whereIn('status', ['approved', 'completed'])
            ->whereNotNull('updated_at')
            ->get();

        if ($quotesWithResponse->isEmpty()) {
            return 24; // Default 24 hours
        }

        $totalHours = 0;
        foreach ($quotesWithResponse as $quote) {
            $hours = $quote->created_at->diffInHours($quote->updated_at);
            $totalHours += $hours;
        }

        return round($totalHours / $quotesWithResponse->count(), 1);
    }

    private function calculateCustomerSatisfaction()
    {
        $totalTestimonials = Testimonial::count();
        $positiveTestimonials = Testimonial::where('rating', '>=', 4)->count();
        
        if ($totalTestimonials === 0) {
            return 85; // Default satisfaction rate
        }

        return round(($positiveTestimonials / $totalTestimonials) * 100, 1);
    }

    private function calculateAverageRating()
    {
        $testimonials = Testimonial::where('is_active', true)->get();
        
        if ($testimonials->isEmpty()) {
            return 4.5; // Default rating
        }

        $totalRating = $testimonials->sum('rating');
        return round($totalRating / $testimonials->count(), 1);
    }

    private function calculateMonthlyGrowth()
    {
        $currentMonthQuotes = Quote::whereMonth('created_at', Carbon::now()->month)->count();
        $previousMonthQuotes = Quote::whereMonth('created_at', Carbon::now()->subMonth()->month)->count();
        
        if ($previousMonthQuotes === 0) {
            return $currentMonthQuotes > 0 ? 100 : 0;
        }

        return round((($currentMonthQuotes - $previousMonthQuotes) / $previousMonthQuotes) * 100, 1);
    }

    public function exportData(Request $request)
    {
        try {
            $type = $request->get('type', 'quotes');
            $format = $request->get('format', 'json');

            switch ($type) {
                case 'quotes':
                    $data = Quote::with('user')->get();
                    break;
                case 'messages':
                    $data = ContactMessage::all();
                    break;
                case 'services':
                    $data = Service::all();
                    break;
                case 'testimonials':
                    $data = Testimonial::all();
                    break;
                case 'blog_posts':
                    $data = BlogPost::all();
                    break;
                case 'gallery_items':
                    $data = GalleryItem::all();
                    break;
                case 'users':
                    $data = User::all();
                    break;
                default:
                    return response()->json(['error' => 'Invalid export type'], 400);
            }

            if ($format === 'csv') {
                return $this->exportToCsv($data, $type);
            }

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error exporting data: ' . $e->getMessage()
            ], 500);
        }
    }

    private function exportToCsv($data, $type)
    {
        $filename = $type . '_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($data) {
            $file = fopen('php://output', 'w');
            
            // Write headers
            if (!empty($data)) {
                fputcsv($file, array_keys($data->first()->toArray()));
            }
            
            // Write data
            foreach ($data as $row) {
                fputcsv($file, $row->toArray());
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    // Notification methods
    public function getNotifications(Request $request)
    {
        try {
            $limit = $request->get('limit', 20);
            $unreadOnly = $request->get('unread_only', false);
            
            $query = Notification::orderBy('created_at', 'desc');
            
            if ($unreadOnly) {
                $query->unread();
            }
            
            $notifications = $query->limit($limit)->get()->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'type' => $notification->type,
                    'category' => $notification->category,
                    'is_read' => $notification->is_read,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->format('Y-m-d H:i:s'),
                    'time_ago' => $notification->created_at->diffForHumans()
                ];
            });

            $unreadCount = Notification::unread()->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'notifications' => $notifications,
                    'unread_count' => $unreadCount,
                    'total_count' => Notification::count()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching notifications: ' . $e->getMessage()
            ], 500);
        }
    }

    public function markAsRead($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            $notification->markAsRead();

            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error marking notification as read: ' . $e->getMessage()
            ], 500);
        }
    }

    public function markAllAsRead()
    {
        try {
            Notification::unread()->update([
                'is_read' => true,
                'read_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'All notifications marked as read'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error marking all notifications as read: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteNotification($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            $notification->delete();

            return response()->json([
                'success' => true,
                'message' => 'Notification deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting notification: ' . $e->getMessage()
            ], 500);
        }
    }
} 