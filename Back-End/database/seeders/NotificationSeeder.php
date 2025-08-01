<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = [
            [
                'title' => 'طلب عرض سعر جديد',
                'message' => 'تم استلام طلب عرض سعر جديد من أحمد محمد',
                'type' => 'info',
                'category' => 'quotes',
                'is_read' => false,
                'created_at' => Carbon::now()->subMinutes(5),
                'updated_at' => Carbon::now()->subMinutes(5)
            ],
            [
                'title' => 'رسالة جديدة',
                'message' => 'تم استلام رسالة جديدة من سارة أحمد',
                'type' => 'info',
                'category' => 'contact',
                'is_read' => false,
                'created_at' => Carbon::now()->subMinutes(15),
                'updated_at' => Carbon::now()->subMinutes(15)
            ],
            [
                'title' => 'تم إنشاء خدمة جديدة',
                'message' => 'تم إنشاء خدمة جديدة: صيانة الأسقف',
                'type' => 'success',
                'category' => 'services',
                'is_read' => false,
                'created_at' => Carbon::now()->subHours(1),
                'updated_at' => Carbon::now()->subHours(1)
            ],
            [
                'title' => 'طلب عرض سعر عاجل',
                'message' => 'تم استلام طلب عرض سعر عاجل من محمد علي',
                'type' => 'warning',
                'category' => 'quotes',
                'is_read' => true,
                'read_at' => Carbon::now()->subHours(2),
                'created_at' => Carbon::now()->subHours(3),
                'updated_at' => Carbon::now()->subHours(2)
            ],
            [
                'title' => 'تم تحديث خدمة',
                'message' => 'تم تحديث خدمة: تركيب الزنك',
                'type' => 'success',
                'category' => 'services',
                'is_read' => true,
                'read_at' => Carbon::now()->subHours(4),
                'created_at' => Carbon::now()->subHours(5),
                'updated_at' => Carbon::now()->subHours(4)
            ],
            [
                'title' => 'رسالة استفسار',
                'message' => 'تم استلام رسالة استفسار من فاطمة حسن',
                'type' => 'info',
                'category' => 'contact',
                'is_read' => true,
                'read_at' => Carbon::now()->subHours(6),
                'created_at' => Carbon::now()->subHours(7),
                'updated_at' => Carbon::now()->subHours(6)
            ],
            [
                'title' => 'طلب عرض سعر كبير',
                'message' => 'تم استلام طلب عرض سعر لمشروع كبير من شركة البناء الحديثة',
                'type' => 'info',
                'category' => 'quotes',
                'is_read' => true,
                'read_at' => Carbon::now()->subHours(8),
                'created_at' => Carbon::now()->subHours(9),
                'updated_at' => Carbon::now()->subHours(8)
            ],
            [
                'title' => 'تم حذف خدمة',
                'message' => 'تم حذف خدمة: تنظيف المزاريب',
                'type' => 'warning',
                'category' => 'services',
                'is_read' => true,
                'read_at' => Carbon::now()->subHours(10),
                'created_at' => Carbon::now()->subHours(11),
                'updated_at' => Carbon::now()->subHours(10)
            ]
        ];

        foreach ($notifications as $notification) {
            Notification::create($notification);
        }
    }
}
