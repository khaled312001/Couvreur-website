# إعداد قاعدة البيانات - مشروع Couvreur

## المتطلبات الأساسية
- XAMPP مثبت ومشغل (Apache + MySQL)
- PHP 8.0 أو أحدث
- Composer مثبت
- Node.js (للتطوير الأمامي)

## الخطوات السريعة

### الطريقة الأولى: استخدام السكريبت التلقائي (موصى بها)

1. افتح PowerShell في مجلد `Back-End`
2. شغل السكريبت:
```powershell
.\setup_database.ps1
```

### الطريقة الثانية: الإعداد اليدوي

#### 1. إنشاء قاعدة البيانات
1. افتح phpMyAdmin: http://localhost/phpmyadmin
2. أنشئ قاعدة بيانات جديدة باسم `couvreur_db`
3. اختر الترميز: `utf8mb4_unicode_ci`

#### 2. إنشاء ملف .env
أنشئ ملف `.env` في مجلد `Back-End` مع المحتوى التالي:

```env
APP_NAME="Couvreur Project"
APP_ENV=local
APP_KEY=base64:your-app-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

# إعدادات قاعدة البيانات MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=couvreur_db
DB_USERNAME=root
DB_PASSWORD=

# إعدادات MySQL إضافية
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@couvreur.fr"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

#### 3. تشغيل الأوامر
```bash
# تثبيت التبعيات
composer install

# إنشاء مفتاح التطبيق
php artisan key:generate

# تشغيل الهجرات
php artisan migrate

# تشغيل البذور
php artisan db:seed

# تشغيل الخادم
php artisan serve
```

## التحقق من الإعداد

### 1. فحص قاعدة البيانات
افتح phpMyAdmin وتأكد من وجود الجداول التالية:
- `users`
- `services`
- `blog_posts`
- `gallery_items`
- `testimonials`
- `quotes`
- `contact_messages`
- `notifications`
- `migrations`
- `password_reset_tokens`
- `sessions`
- `cache`
- `jobs`

### 2. فحص البيانات التجريبية
تأكد من وجود:
- مستخدم admin: `admin@couvreur.fr` / `password`
- 7 خدمات مختلفة
- 5 مقالات في المدونة
- 6 عناصر في المعرض
- 6 شهادات
- بيانات تجريبية أخرى

### 3. اختبار الخادم
1. شغل الخادم: `php artisan serve`
2. افتح المتصفح على: http://localhost:8000
3. جرب تسجيل الدخول كـ admin

## بيانات تسجيل الدخول الافتراضية

### المستخدم الرئيسي (Admin)
- **البريد الإلكتروني:** `admin@couvreur.fr`
- **كلمة المرور:** `password`
- **الدور:** `admin`

### المستخدم العادي (اختياري)
- **البريد الإلكتروني:** `user@couvreur.fr`
- **كلمة المرور:** `password`
- **الدور:** `user`

## استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في الاتصال بقاعدة البيانات**
   - تأكد من تشغيل XAMPP
   - تحقق من إعدادات `DB_HOST` و `DB_PORT`
   - تأكد من وجود قاعدة البيانات `couvreur_db`

2. **خطأ في الهجرات**
   - احذف جميع الجداول من قاعدة البيانات
   - شغل `php artisan migrate:fresh --seed`

3. **خطأ في Composer**
   - تأكد من تثبيت Composer
   - شغل `composer update`

4. **خطأ في PHP**
   - تأكد من تثبيت PHP 8.0+
   - أضف PHP إلى PATH

### أوامر مفيدة:
```bash
# إعادة تعيين قاعدة البيانات
php artisan migrate:fresh --seed

# مسح الكاش
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# عرض حالة التطبيق
php artisan about

# فحص الاتصال بقاعدة البيانات
php artisan tinker
DB::connection()->getPdo();
```

## الدعم
إذا واجهت أي مشاكل، راجع:
1. ملف `database_setup_instructions.md`
2. ملف `env_settings.txt`
3. ملف `config_database_fr.txt` 