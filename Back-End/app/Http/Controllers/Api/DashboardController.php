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

            // Quick Stats
            $quickStats = [
                'total_quotes' => Quote::count(),
                'pending_quotes' => Quote::where('status', 'pending')->count(),
                'approved_quotes' => Quote::where('status', 'accepted')->count(),
                'completed_quotes' => Quote::where('status', 'quoted')->count(),
                'total_services' => Service::count(),
                'active_services' => Service::where('is_active', true)->count(),
                'total_testimonials' => Testimonial::count(),
                'approved_testimonials' => Testimonial::where('is_active', true)->count(),
                'total_gallery_items' => GalleryItem::count(),
                'total_blog_posts' => BlogPost::count(),
                'total_contact_messages' => ContactMessage::count(),
                'unread_messages' => ContactMessage::where('status', 'unread')->count(),
                'total_users' => User::count(),
                'total_revenue' => 0, // Amount field not available in quotes table
            ];

            // Monthly Revenue Data (mock data since amount field not available)
            $monthlyRevenue = collect([
                ['month' => 'Jan', 'revenue' => 12500, 'quotes' => 8],
                ['month' => 'Fév', 'revenue' => 15800, 'quotes' => 12],
                ['month' => 'Mar', 'revenue' => 14200, 'quotes' => 10],
                ['month' => 'Avr', 'revenue' => 18900, 'quotes' => 15],
                ['month' => 'Mai', 'revenue' => 16500, 'quotes' => 13],
                ['month' => 'Juin', 'revenue' => 22100, 'quotes' => 18],
            ]);

            // Service Distribution (mock data since amount field not available)
            $serviceDistribution = collect([
                ['service' => 'Charpente', 'count' => 35, 'amount' => 45000],
                ['service' => 'Couverture', 'count' => 25, 'amount' => 32000],
                ['service' => 'Zinguerie', 'count' => 20, 'amount' => 28000],
                ['service' => 'Entretien', 'count' => 20, 'amount' => 15000],
            ]);

            // Recent Quotes
            $recentQuotes = Quote::orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($quote) {
                    return [
                        'id' => $quote->id,
                        'client_name' => $quote->name,
                        'service_type' => $quote->service_type,
                        'amount' => 0, // Amount field not available
                        'status' => $quote->status,
                        'created_at' => $quote->created_at->format('Y-m-d'),
                        'urgency' => $quote->urgency
                    ];
                });

            // Recent Messages
            $recentMessages = ContactMessage::orderBy('created_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'name' => $message->name,
                        'email' => $message->email,
                        'subject' => $message->subject,
                        'is_read' => $message->status === 'read',
                        'created_at' => $message->created_at->format('Y-m-d H:i')
                    ];
                });

            // Status Distribution
            $statusDistribution = [
                'quotes' => [
                    'pending' => Quote::where('status', 'pending')->count(),
                    'contacted' => Quote::where('status', 'contacted')->count(),
                    'quoted' => Quote::where('status', 'quoted')->count(),
                    'accepted' => Quote::where('status', 'accepted')->count(),
                    'rejected' => Quote::where('status', 'rejected')->count(),
                ],
                'messages' => [
                    'read' => ContactMessage::where('status', 'read')->count(),
                    'unread' => ContactMessage::where('status', 'unread')->count(),
                ]
            ];

            // Performance Metrics
            $performanceMetrics = [
                'conversion_rate' => $quickStats['total_quotes'] > 0 
                    ? round(($quickStats['approved_quotes'] / $quickStats['total_quotes']) * 100, 2)
                    : 0,
                'average_response_time' => $this->calculateAverageResponseTime(),
                'customer_satisfaction' => $this->calculateCustomerSatisfaction(),
                'monthly_growth' => $this->calculateMonthlyGrowth(),
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'quick_stats' => $quickStats,
                    'monthly_revenue' => $monthlyRevenue,
                    'service_distribution' => $serviceDistribution,
                    'recent_quotes' => $recentQuotes,
                    'recent_messages' => $recentMessages,
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

    private function calculateAverageResponseTime()
    {
        // Calculate average response time for quotes (in hours)
        // Since response_time field doesn't exist, return default value
        return 24; // Default 24 hours
    }

    private function calculateCustomerSatisfaction()
    {
        // Calculate based on testimonials and quote status
        $totalTestimonials = Testimonial::count();
        $positiveTestimonials = Testimonial::where('rating', '>=', 4)->count();
        
        if ($totalTestimonials === 0) {
            return 85; // Default satisfaction rate
        }

        return round(($positiveTestimonials / $totalTestimonials) * 100, 1);
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